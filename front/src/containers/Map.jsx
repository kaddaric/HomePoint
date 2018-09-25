import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import MarkerPeople from './MarkerPeople';
import MarkerClient from '../components/MarkerClient';
import axios from 'axios';
import config from '../config';

import { Col } from 'reactstrap';

import { selectPeople } from '../actions/select.actions';

import { bindActionCreators } from 'redux';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientLat: 0,
      clientLng: 0,
      showBox: false,
    }
    this.makeIcon = this.makeIcon.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { clientAddress } = this.props;
    if ((prevProps.clientAddress !== clientAddress) && (clientAddress !== "")) {
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${clientAddress}&key=${config.gmap.key}`)
        .then(response => {
          
          this.setState({
            clientLat: response.data.results[0].geometry.location.lat,
            clientLng: response.data.results[0].geometry.location.lng
          });
        })
        .catch(err => console.log(err));
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

  render() {
    let date = new Date();
    const { searchCollab, selectPeople, selectedId, selectedCollab } = this.props;

    return (
      <Col xs="9">
      <GoogleMapReact google={this.props.google}
        bootstrapURLKeys={{ key: config.gmap.key }}
        center={selectedCollab.length > 0 ? {
          lng: selectedCollab[0].longitude,
          lat: selectedCollab[0].latitude,
        } : config.coords}
        zoom={11}>
        {
          (this.state.clientLat !== 0)
            ? <MarkerClient
                lat={this.state.clientLat}
                lng={this.state.clientLng}
            />
            : null
        }

        {
          searchCollab.map(
            p => {
              return (
                <MarkerPeople key={p.id}
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                  click={() => {
                    selectPeople(p);
                    document.getElementById(p.id).scrollIntoView();
                  }}
                  active={p.id === selectedId}
                  icon={this.makeIcon(p.transport)}
                  color={date > new Date(p.end_of_mission) ? 'isSuccess' :
                  (new Date(p.end_of_mission) - date) > 2590000000*2 ? 'isDanger' : 'isWarning'}
                  // Positionnement approximatif du marqueur collaborateur
                  lat={p.latitude + (Math.floor(Math.random()* 10)) / 2000}
                  lng={p.longitude + (Math.floor(Math.random()* 10)) / 2000}
                  p={p}>
                </MarkerPeople>
              );
            })
        }
      </GoogleMapReact>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchCollab: state.searchCollab,
    selectedCollab: state.selectedCollab,
    clientAddress: state.clientAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPeople }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);