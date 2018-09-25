import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import Map from '../containers/Map';
import SearchBar from '../containers/SearchBar';
import ListCollabs from '../containers/ListCollabs.jsx';
import { initData } from '../actions/people.actions';
import { initDataClients } from '../actions/client.actions';
import { initDataSkills } from '../actions/skill.actions';

import { reset } from '../actions/select.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header';
import NavbarAdm from './NavbarAdm';
import Footer from './Footer';

class Home extends Component {

  componentDidMount() {
    this.props.initData();
    this.props.initDataClients();
    this.props.initDataSkills();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Header />
          <NavbarAdm />
          <SearchBar />
          <Row className="py-2">
            <ListCollabs />
            <Map />
          </Row>
        </Container>
        <Container fluid>
          <Footer />
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initData, initDataClients, initDataSkills, reset }, dispatch)
};

export default connect(null, mapDispatchToProps)(Home);
