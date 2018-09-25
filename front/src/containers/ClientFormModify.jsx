import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';

class ClientForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataForm:
      {
        name: '',
        street_num: '',
        street_name: '',
        postal_code: '',
        city: '',
      },
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { selectedClient } = this.props;
    if (selectedClient.length > 0) {
      this.setState({
        dataForm: {
          client_id: selectedClient[0].id,
          name: selectedClient[0].name,
          street_num: selectedClient[0].street_num,
          street_name: selectedClient[0].street_name,
          postal_code: selectedClient[0].postal_code,
          city: selectedClient[0].city,
        },
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.put('/api/clients/modify', { dataForm: this.state.dataForm })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/clients";
          return (
            alert("Le client a été modifié")
          )
        }
      });
  }

  handleInputChange(event) {
    this.setState(
      {
        dataForm:
        {
          ...this.state.dataForm,
          [event.target.name]: event.target.value
        }
      }
    )
  }

  render() {

    return (
      <div>
        <Container fluid className="pageContent py-4">
          <Header />
          <NavbarAdm />
          <Container>
            <h1 className="title">modifier un client</h1>

            <Form method="PUT" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Nom</Label>
                <Input required type="text" name="name" placeholder="Nom client" value={this.state.dataForm.name} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Numéro</Label>
                <Input type="text" name="street_num" placeholder="Numéro" value={this.state.dataForm.street_num} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Adresse</Label>
                <Input required type="text" name="street_name" placeholder="Adresse" value={this.state.dataForm.street_name} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Code postal</Label>
                <Input type="text" name="postal_code" placeholder="Code postal" value={this.state.dataForm.postal_code} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Ville</Label>
                <Input required type="text" name="city" placeholder="Ville" value={this.state.dataForm.city} onChange={this.handleInputChange} />
              </FormGroup>

              <Button type="submit">Modifier un client</Button>
            </Form>
          </Container>
        </Container>
        <Container fluid>
          <Footer />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedClient: state.selectedClient,
  }
};

export default connect(mapStateToProps)(ClientForm);