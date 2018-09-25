import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';

import Select from 'react-select';
import axios from 'axios';

import 'react-select-plus/dist/react-select-plus.css';

import config from '../config';

let listSkills = [];

class CollaboratorAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      dataForm:
      {
        firstname: '',
        lastname: '',
        phone: '',
        mail: '',
        end_of_mission: '',
        street_num: '',
        street_name: '',
        postal_code: '',
        city: '',
        latitude: '',
        longitude: '',
        transport: '',
      },
      skills: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    listSkills = this.props.skills.map(skill => {
      return {
        value: skill.id,
        label: skill.skill,
      }
    })
  }

  handleChange = (selectedOption) => {
    let skillId = selectedOption.map(skill => skill.value);
    this.setState({
      selectedOption,
      skills: skillId
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const collabAddress = `${this.state.dataForm.street_num}+${this.state.dataForm.street_name}+${this.state.dataForm.postal_code}+${this.state.dataForm.city}`;
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${collabAddress}&key=${config.gmap.key}`)
      .then(response => {
        this.setState(
          {
            dataForm:
            {
              ...this.state.dataForm,
              latitude: response.data.results[0].geometry.location.lat,
              longitude: response.data.results[0].geometry.location.lng
            }
          }
        )
        axios.post('/api/collaborators/add', { dataForm: this.state.dataForm })
          .then(() => {
            for (let i = 0; i < this.state.skills.length; i++) {
              axios.post('/api/collaborators/addskills', { skill: this.state.skills[i] })
            }
          })
          .then(() => {
            alert("Le collaborateur a été ajouté");
            window.location.href = "/collaborators";
          })  
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
    const { selectedOption } = this.state;

    return (
      <div className="CollaboratorAdd">
        <Container fluid>
          <Header />
          <NavbarAdm />
        </Container>
        <Container className="py-4">
          <h1 className="title">Ajouter un collaborateur</h1>

          <Form method="POST" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Nom</Label>
              <Input required type="text" placeholder="Nom" name="lastname" onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label>Prénom</Label>
              <Input required type="text" placeholder="Prénom" name="firstname" onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label>Adresse</Label>
              <Row>
                <Col md="1"><Input type="text" placeholder="N°" name="street_num" onChange={this.handleInputChange} /></Col>
                <Col md="5"><Input required type="text" placeholder="Nom de la rue" name="street_name" onChange={this.handleInputChange} /></Col>
                <Col md="2"><Input type="text" placeholder="Code postal" name="postal_code" onChange={this.handleInputChange} /></Col>
                <Col md="4"><Input required type="text" placeholder="Ville" name="city" onChange={this.handleInputChange} /></Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Label>Téléphone</Label>
              <Input required type="text" placeholder="Téléphone" name="phone" onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input required type="email" placeholder="Email" name="mail" onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label>Compétences</Label>
              <Select 
                isMulti
                value={selectedOption}
                onChange={this.handleChange}
                options={listSkills}
              />
            </FormGroup>

            <FormGroup>
              <Label>Date fin de mission (format : AAAA-MM-JJ)</Label>
              <Input required type="text" placeholder="AAAA-MM-JJ" name="end_of_mission" onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="selectTransport">Mode de transport</Label>
              <Input required type="select" name="transport" id="selectTransport" onChange={this.handleInputChange}>
                <option value="empty">---</option>
                <option value="driving">Voiture</option>
                <option value="motorbiking">Moto</option>
                <option value="bicycling">Vélo</option>
                <option value="transit">Transport en commun</option>
              </Input>
            </FormGroup>

            <Button type="submit">Ajouter un collaborateur</Button>
          </Form>

        </Container>
        <Container fluid>
          <Footer />
        </Container>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    skills: state.skills,
  };
}

export default connect(mapStateToProps)(CollaboratorAdd);
