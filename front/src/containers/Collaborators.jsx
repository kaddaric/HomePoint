import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';
import AutoSuggestCollab from './AutoSuggestCollab';
import CollaboratorsList from './CollaboratorsList';
import CollaboratorsDetails from './CollaboratorsDetails';
import { resetSearch } from '../actions/search.actions';
import { fetchAllCollaboratorsData } from '../actions/people.actions';
import { initDataSkills } from '../actions/skill.actions';

class Collaborators extends Component {

  componentWillMount() {
    this.props.resetSearch(this.props.collaborators);
    this.props.fetchAllCollaboratorsData()
    this.props.initDataSkills();
  }

  render() {

    const { collaborators, resetSearch } = this.props;

    return (
      <div className="Collaborators">
        <Container fluid className="pageContent py-4">
          <Container fluid className="py-2">
            <Header />
            <NavbarAdm />
          </Container>

          <h1 className="title py-2">Gestion des collaborateurs</h1>
          <Row className="my-2 py-5">
            <Col xs="3">
              <AutoSuggestCollab />
            </Col>
            <Col xs="1">
              <Button onClick={() => resetSearch(collaborators)}>Reset</Button>
            </Col>
            <Col xs="6">
              <Button tag={Link} to="/collaborators/add">Ajouter un collaborateur</Button>{' '}
              <Button tag={Link} to="/skills">Gérer les compétences</Button>
            </Col>
          </Row>
          <Row >
            <Col>
              <CollaboratorsList />
            </Col>
            <Col className="text-center">
              <CollaboratorsDetails />
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

const mapStateToProps = state => {
  return {
    collaborators: state.collaborators,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ resetSearch, fetchAllCollaboratorsData, initDataSkills }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Collaborators);
