import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initDataUsers } from '../actions/user';

class UserCard extends Component {

  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }
  deleteUser(id) {
    if (id) {
      axios.put('/api/users', { user_id: id })
        .then(res => {
          if (res.status === 200) {
            return (
              alert("L'utilisateur a été supprimé")
            )
          }
        })
        .then(this.props.initDataUsers)
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="UserDetails">
        {!user.id ? <p>Veuillez sélectionner un utilisateur</p>
          : (
            <div id={user.id}>
              <h3>{user.lastname} {user.firstname}</h3>
              <div className="my-2">
                <span className="font-weight-bold">Téléphone : </span>
                {user.phone}
              </div>
              <div className="my-2">
                <span className="font-weight-bold">Email : </span>
                {user.mail}
              </div>
              <div className="my-2">
                <span className="font-weight-bold">Statut : </span>
                {user.administrator === 1 ? <span>administrateur</span> : <span>utilisateur</span>}
              </div>
              <Button tag={Link} to="/users/modify">Modifier</Button>{' '}
              <Button onClick={() => this.deleteUser(user.id)}>Supprimer</Button>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.activeUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initDataUsers }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)