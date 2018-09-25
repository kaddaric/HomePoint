import React, { Component } from 'react';
import {
  Col,
  Row,
  InputGroup,
  Input,
  Button,
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateClientAddress } from '../actions/clientaddress.actions';
import { initData, filterBySkill } from '../actions/people.actions';
import { resetSearch } from '../actions/search.actions';
//Autosuggest
import AutoSuggestSkill from './AutoSuggestSkill.jsx';

import { bindActionCreators } from 'redux';
import AutoSuggestClient from './AutoSuggestClient';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.changeSkill = this.changeSkill.bind(this);
    this.changeClient = this.changeClient.bind(this);
    this.changeClientAddress = this.changeClientAddress.bind(this);

    this.state = {
      skill: "",
      clientAddress: "",
      dropdownOpen: false,
      splitButtonOpen: false,
      client: "",
    };
  }

  resetAll() {
    this.setState({
      skill: "",
      clientAddress: "",
      client: ""
    })
  }
  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  changeSkill(skillEntered) {
    this.setState({
      skill: skillEntered,
    })    
  }

  changeClient(clientEntered) {
    const client = this.props.clients.filter(client => client.name === clientEntered);    
    this.setState({
      clientAddress: `${client[0].street_num} ${client[0].street_name} ${client[0].postal_code} ${client[0].city}`,
    })     
  }

  changeClientAddress(event) {
    this.setState({
      clientAddress: event.target.value
    });    
  }

  render() {
    const { resetSearch, filterBySkill, updateClientAddress, collaborators, clients, skills } = this.props;
    return (
      <Row className="py-3" >
          <Col xs="12" className="py-2">
          <h3>Rechercher vos collaborateurs</h3>
          </Col>
          
        <Col xs="12" className="py-3">
          <InputGroup>
            <Col xs="2">
              <AutoSuggestClient clients={clients} changeClient={this.changeClient}/>
            </Col>
            <Col xs="1" className="text-center">
              <p className="py-2 pl-2">OU</p>
            </Col>
            <Col xs="3">
              <Input
                className="input"
                type="text"
                placeholder="Adresse client"
                onChange={this.changeClientAddress}
              />
            </Col>
            <Col xs="3">
              <AutoSuggestSkill skills={skills} changeSkill={this.changeSkill} />
            </Col>
            <Col xs="3">
              <Button onClick={() => {
                updateClientAddress(this.state.clientAddress);
                filterBySkill(this.state.skill);
                }
              }>
                Rechercher
              </Button>{" "}
              <Button onClick={() => {
                this.resetAll();
                resetSearch(collaborators);
                }
              }>
                Réinitialiser
              </Button>
            </Col>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    collaborators: state.collaborators,
    clientAddress: state.clientAddress,
    clients: state.clients,
    skills: state.skills,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateClientAddress, initData, filterBySkill, resetSearch }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);