import React, { Component } from 'react';
import axios from 'axios';

import { Container, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';

class UserFormAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataForm:
      {
        firstname: '',
        lastname: '',
        phone: '',
        mail: '',
        administrator: '',
        password: '',
      },
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({
      dataForm: {
        ...this.state.dataForm,
        administrator: rSelected,
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/users/add', { dataForm: this.state.dataForm })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/users";
          return (
            alert("L'utilisateur a été ajouté")
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
      <div className="UserFormAdd">
        <Container fluid className="pageContent py-4">
          <Header />
          <NavbarAdm />
          <Container>
            <h1 className="title">Ajouter un utilisateur</h1>
            <Form method="POST" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Prénom</Label>
                <Input type="text" name="firstname" placeholder="Prénom" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Nom</Label>
                <Input type="text" name="lastname" placeholder="Nom" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Téléphone</Label>
                <Input type="text" name="phone" placeholder="Téléphone" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Mail</Label>
                <Input type="text" name="mail" placeholder="Mail" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Fonction</Label>
                <CustomInput type="radio" id="admin" name="users" label="Administrateur" onClick={() => this.onRadioBtnClick(1)} />
                <CustomInput type="radio" id="user" name="users" label="utilisateur" onClick={() => this.onRadioBtnClick(0)} />
              </FormGroup>
              <FormGroup>
                <Label>Mot de passe</Label>
                <Input type="text" name="password" placeholder="Mot de passe" onChange={this.handleInputChange} />
              </FormGroup>
              <Button type="submit">Ajouter</Button>
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

export default UserFormAdd;