import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Table } from 'reactstrap';

import { bindActionCreators } from 'redux';
import { selectPeople } from '../actions/select.actions';
import { fetchAllCollaboratorsData } from '../actions/people.actions';
import { reset } from '../actions/select.actions';

class CollaboratorsList extends Component {

  render() {
    const { searchCollab, selectPeople } = this.props;
    const todayDate = new Date();
    return (
      <div className="CollaboratorsList">
        <Table striped hover>
          <thead>
            <tr>
              <th>NOM</th>
              <th>PRENOM</th>
              <th>DISPONIBILITE</th>
            </tr>
          </thead>
          <tbody>
            {
              searchCollab.map(collaborator => (
                <tr key={collaborator.id} onClick={() => selectPeople(collaborator)}>
                  <td>{collaborator.lastname}</td>
                  <td>{collaborator.firstname}</td>
                  <td>{todayDate > new Date(collaborator.end_of_mission) ?
                    <p style={{ color: 'green', margin: 0 }}>Disponible</p>
                    : (new Date(collaborator.end_of_mission) - todayDate) > 2590000000 * 2 ?
                      <p style={{ color: 'red', margin: 0 }}>Non disponible</p>
                      : <p style={{ color: 'orange', margin: 0 }}>Bientôt disponible</p>}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchCollab: state.searchCollab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPeople, fetchAllCollaboratorsData, reset }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorsList);