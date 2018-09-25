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

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/clients/add', { dataForm: this.state.dataForm })
      .then(res => {
        if(res.status === 200){
          window.location.href = "/clients";
          return (
            alert("Le client a été ajouté")
          )
        }
      })
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
            <h1 className="title">Ajouter un client</h1>

            <Form method="POST" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Nom</Label>
                <Input required type="text" name="name" placeholder="Nom client" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Numéro</Label>
                <Input type="text" name="street_num" placeholder="Numéro" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Adresse</Label>
                <Input required type="text" name="street_name" placeholder="Adresse" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Code postal</Label>
                <Input type="text" name="postal_code" placeholder="Code postal" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Ville</Label>
                <Input required type="text" name="city" placeholder="Ville" onChange={this.handleInputChange} />
              </FormGroup>

              <Button type="submit">Ajouter un client</Button>
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