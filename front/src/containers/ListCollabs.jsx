import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col } from 'reactstrap';

import PeopleCard from './PeopleCard';

import { bindActionCreators } from 'redux';
import { selectPeople } from '../actions/select.actions';
import { updateDuration } from '../actions/people.actions';

class ListCollabs extends Component {

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    const { searchCollab, selectPeople } = this.props;
    return (
      <Col xs="3" style={{
        maxHeight: this.state.height - 196,
        minHeight: this.state.height - 196,
        overflow: 'scroll',
        overflowX: 'hidden',
      }}>
        {
          searchCollab.length > 0 ?
            searchCollab.map(p => 
              (<PeopleCard selectPeople={() => selectPeople(p)}
                  key={p.id}
                  people={p} />),
              ) : <h1>0 people</h1>
        }
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collaborators: state.collaborators,
    selectedCollab: state.selectedCollab,
    clientAddress: state.clientAddress,
    searchCollab: state.searchCollab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPeople, updateDuration }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(ListCollabs);