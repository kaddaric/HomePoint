import React, { Component } from 'react';

import axios from 'axios';
import config from '../config';

import * as moment from 'moment';
import 'moment-duration-format';

import 'moment/locale/fr';

import { Icon, Media, MediaContent, MediaLeft, Subtitle, Tag } from 're-bulma';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDuration } from '../actions/people.actions';

class PeopleCard extends Component {

  constructor(props) {
    super(props);
    this.makeIcon = this.makeIcon.bind(this);
    this.requestDurations = this.requestDurations.bind(this);
  }

  componentDidMount() {
    const { clientAddress, people } = this.props;
    if (clientAddress !== "") {
      this.requestDurations(people, clientAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { clientAddress, people } = this.props;
    if ((prevProps.clientAddress !== clientAddress) && (clientAddress !== "")) {
      this.requestDurations(people, clientAddress);
    }
  }

  makeIcon(transport) {
    let mode = "";
    switch (transport) {
      case "driving":
        mode = "car";
        break;
      case "motorbiking":
        mode = "motorcycle";
        break;
      case "bicycling":
        mode = "bicycle";
        break;
      case "walking":
        mode = "male"
        break;
      case "transit":
        mode = "subway"
        break;
      default:
        mode = "car"
    }
    return mode
  }

  requestDurations(people, clientAddress) {
    // calcul du temps de trajet avec prise en compte du traffic (mode pessimiste) pour les automobiliste.
    let origin = `${people.latitude},${people.longitude}`;
    axios
      .get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${clientAddress}&region=FR&mode=${people.transport}&departure_time=now&traffic_model=pessimistic&key=${config.gmap.key}`)
      .then(response => {


        let duration = 0;
        people.transport === 'driving'
          ? duration = response.data.rows[0].elements[0].duration_in_traffic.value
          : duration = response.data.rows[0].elements[0].duration.value;

        this.props.updateDuration(people.id, duration);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { people, selectPeople, active } = this.props;
    let date = new Date();
    let end_of_mission = new Date(people.end_of_mission);
    let availableSoon = end_of_mission - date;

    return (
      <div id={people.id} style={{
        cursor: 'pointer',
      }}>
        <Media style={{ paddingTop: '5px', paddingLeft: '5px' }} onClick={selectPeople}>
          <MediaLeft>
            <Icon style={{
              color: date > end_of_mission ? '#c9edbb' :
                availableSoon > 2590000000 * 2 ? '#ed6c63' : '#ff8800'
            }} icon={`fa fa-${this.makeIcon(people.transport)}`} size="isMedium" />
          </MediaLeft>
          <MediaContent>
            <strong style={{
              color: active ? '#ed6c63' : null,
            }}>{`${people.firstname} ${people.lastname}`}</strong>
            <Subtitle>
              {
                people.skills.map((skill, i) => (
                  <Tag key={i}
                    style={{
                      marginTop: '5px',
                      marginBottom: '5px',
                      marginRight: '5px',
                    }}>
                    {skill}
                  </Tag>))
              }
            </Subtitle>
            <Subtitle size="is6">
              {
                people.duration ?
                  <span>Temps de trajet : <strong>{moment.duration({ s: people.duration }).format("h [hrs], m [min]")}</strong></span>
                  : ''
              }
            </Subtitle>
          </MediaContent>
        </Media>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientAddress: state.clientAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDuration }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleCard)