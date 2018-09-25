import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Container, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';

class UserFormModify extends Component {

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


  componentWillMount() {
    const { activeUser } = this.props;
    if (activeUser.id) {
      this.setState({
        dataForm: {
          user_id: activeUser.id,
          firstname: activeUser.firstname,
          lastname: activeUser.lastname,
          phone: activeUser.phone,
          mail: activeUser.mail,
          administrator: activeUser.administrator,
          password: activeUser.password
        },
      });
    }
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
    axios.put('/api/users/modify', { dataForm: this.state.dataForm })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/users";
          return (
            alert("L'utilisateur a été modifié")
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
            <h1 className="title">Modifier un utilisateur</h1>
            <Form method="PUT" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Prénom</Label>
                <Input type="text" name="firstname" placeholder="Prénom" value={this.state.dataForm.firstname} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Nom</Label>
                <Input type="text" name="lastname" placeholder="Nom" value={this.state.dataForm.lastname} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Téléphone</Label>
                <Input type="text" name="phone" placeholder="Téléphone" value={this.state.dataForm.phone} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Mail</Label>
                <Input type="text" name="mail" placeholder="Mail" value={this.state.dataForm.mail} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Fonction</Label>
                <CustomInput type="radio" id="admin" name="users" label="Administrateur" checked={this.state.dataForm.administrator===1} onClick={() => this.onRadioBtnClick(1)} />
                <CustomInput type="radio" id="user" name="users" label="utilisateur" checked={this.state.dataForm.administrator===0} onClick={() => this.onRadioBtnClick(0)} />
              </FormGroup>
              <FormGroup>
                <Label>Mot de passe</Label>
                <Input type="text" name="password" placeholder="Mot de passe" value={this.state.dataForm.password} onChange={this.handleInputChange} />
              </FormGroup>
              <Button type="submit">Modifier</Button>
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
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
  };
};
export default connect(mapStateToProps)(UserFormModify);