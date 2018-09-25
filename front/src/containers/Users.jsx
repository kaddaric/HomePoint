import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { initDataUsers } from '../actions/user';
import { resetUser } from '../actions/user';
import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';
import UsersList from '../containers/UsersList';
import UserDetails from '../containers/UserDetails';
import AutoSuggestUser from './AutoSuggestUser';

class Users extends Component {

  componentDidMount() {
    this.props.initDataUsers();
  }

  render() {
    const { users, resetUser } = this.props;
    return (
      <div>
        <Container fluid className="pageContent py-4">
          <Container fluid className="py-2">
            <Header />
            <NavbarAdm />
          </Container>

          <h1 className="title">Gestion des utilisateurs</h1>
          <Row className="my-2 py-5">
            <Col xs="3">
              <AutoSuggestUser />
            </Col>
            <Col xs="1">
              <Button onClick={() => resetUser(users)}>Reset</Button>
            </Col>
            <Col xs="3">
              <Button tag={Link} to="/users/add">Ajouter un utilisateur</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <UsersList />
            </Col>
            <Col className="text-center">
              <UserDetails />
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Footer />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initDataUsers, resetUser }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
