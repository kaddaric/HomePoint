import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { fetchAllCollaboratorsData } from '../actions/people.actions';
import { Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMale, faBicycle, faMotorcycle, faSubway } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';

class CollaboratorsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.makeIcon = this.makeIcon.bind(this);
  }

  makeIcon(transport) {
    let mode = "";
    switch (transport) {
      case "driving":
        mode = faCar;
        break;
      case "motorbiking":
        mode = faMotorcycle;
        break;
      case "bicycling":
        mode = faBicycle;
        break;
      case "walking":
        mode = faMale;
        break;
      case "transit":
        mode = faSubway;
        break;
      default:
        mode = faCar;
    }
    return mode
  }

  deleteCollab(id) {
    axios.put('/api/collaborators/delete', { collaborateur_id: id })
      .then(res => {
        if (res.status === 200) {
          alert("le collaborateur a été supprimé")
        }
      })
      .then(
        this.props.fetchAllCollaboratorsData
      )
  }

  render() {
    const { selectedCollab } = this.props;
    const todayDate = new Date();
    return (
      <div className="CollaboratorsDetails">
        {
          selectedCollab.length === 1 ?
            (
              <div className="details">
                <h3>{selectedCollab[0].lastname} {selectedCollab[0].firstname}</h3>
                <br />
                <div className="my-2">
                  <span className="font-weight-bold">Adresse : </span>
                  <span>
                    {selectedCollab[0].street_num}{' '}
                    {selectedCollab[0].street_name}{' '}
                    {selectedCollab[0].postal_code}{' '}
                    {selectedCollab[0].city}
                  </span>
                </div>
                <div className="my-2">
                  <span className="font-weight-bold">Téléphone : </span>
                  <span>
                    {selectedCollab[0].phone}
                  </span>
                </div>
                <div className="my-2">
                  <span className="font-weight-bold">Email : </span>
                  <span>
                    {selectedCollab[0].mail}
                  </span>
                </div>
                <div className="my-2">
                  <span className="font-weight-bold">Compétences : </span>
                  <span className="skill-badges">
                    {
                      selectedCollab[0].skills.map((skill, i) => (
                        <span key={i}>
                          <Badge color="info">{skill}</Badge>{' '}
                        </span>
                      ))
                    }
                  </span>
                </div>
                <div className="my-2">
                  <span className="font-weight-bold">Moyen de transport : </span>
                  <span>
                    <FontAwesomeIcon icon={this.makeIcon(selectedCollab[0].transport)} size="lg" />
                  </span>
                </div>
                <div className="my-2">
                  <span className="font-weight-bold">Disponibilité : </span>
                  {todayDate > new Date(selectedCollab[0].end_of_mission) ?
                    <span style={{ color: 'green', margin: 0 }}>Disponible</span>
                    : (new Date(selectedCollab[0].end_of_mission) - todayDate) > 2590000000 * 2 ?
                      <span style={{ color: 'red', margin: 0 }}>Non disponible</span>
                      : <span style={{ color: 'orange', margin: 0 }}>Bientôt disponible</span>}
                </div>
                <div className="my-2">
                  <span className="font-weight-bold">Date de fin de mission : </span>
                  <span>{moment(selectedCollab[0].end_of_mission).format('YYYY-MM-DD')}</span>
                </div>
                <Button tag={Link} to="/collaborators/modify">Modifier</Button>{' '}
                <Button onClick={() => this.deleteCollab(selectedCollab[0].id)}>Supprimer</Button>
              </div>
            )
            : <div className="my-2">
              <p>Sélectionnez un collaborateur pour accéder à sa fiche.</p>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCollab: state.selectedCollab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllCollaboratorsData }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorsDetails);