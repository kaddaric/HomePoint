import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { selectUser } from '../actions/user';

import { Table } from 'reactstrap';

class UsersList extends Component {

  render() {
    const { searchUser, selectUser } = this.props;

    return (
      <div className="ListUsers">
        <Table striped hover>
          <thead>
            <tr>
              <th>NOM</th>
              <th>PRENOM</th>
              <th>STATUT</th>
            </tr>
          </thead>
          <tbody>
            {searchUser.map(user =>
              <tr key={user.id} onClick={() => selectUser(user)}>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.administrator === 1 ? <p>administrateur</p> : <p>utilisateur</p>}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchUser: state.searchUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectUser }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersList);