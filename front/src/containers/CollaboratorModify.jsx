import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';

import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';

import 'react-select-plus/dist/react-select-plus.css';

import config from '../config';

let listSkills = [];

class CollaboratorModify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [],
      dataForm:
      {
        collaborateur_id: '',
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
    const { selectedCollab, skills } = this.props;
    listSkills = skills.map(skill => {
      return {
        value: skill.id,
        label: skill.skill,
      }
    })
    const currentSkills = [];
    for (let i = 0; i < selectedCollab[0].skills.length; i++) {
      for (let j = 0; j < skills.length; j++) {
        if (skills[j].skill === selectedCollab[0].skills[i]) {
          currentSkills.push({ value: skills[j].id, label: selectedCollab[0].skills[i] })
        }
      }
    }
    this.setState(
      {
        dataForm:
        {
          ...this.state.dataForm,
          collaborateur_id: selectedCollab[0].id,
          firstname: selectedCollab[0].firstname,
          lastname: selectedCollab[0].lastname,
          phone: selectedCollab[0].phone,
          mail: selectedCollab[0].mail,
          end_of_mission: moment(selectedCollab[0].end_of_mission).format("YYYY-MM-DD"),
          street_num: selectedCollab[0].street_num,
          street_name: selectedCollab[0].street_name,
          postal_code: selectedCollab[0].postal_code,
          city: selectedCollab[0].city,
          latitude: selectedCollab[0].latitude,
          longitude: selectedCollab[0].latitude,
          transport: selectedCollab[0].transport,
        },
        selectedOption: currentSkills,
      }
    )
  }

  handleChange = (selectedOption) => {
    let skillIds = selectedOption.map(skill => skill.value);
    this.setState({
      selectedOption,
      skills: skillIds
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleChange(this.state.selectedOption);
    const collabAddress = `${this.state.dataForm.street_num}+${this.state.dataForm.street_name}+${this.state.dataForm.postal_code}+${this.state.dataForm.city}`;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${collabAddress}&key=${config.gmap.key}`)
      .then(response => {
        this.setState(
          {
            dataForm:
            {
              ...this.state.dataForm,
              latitude: response.data.results[0].geometry.location.lat,
              longitude: response.data.results[0].geometry.location.lng,
            }
          }
        )
      })
      .then(() => {
        axios.put('/api/collaborators/modify', { dataForm: this.state.dataForm })
      })
      .then(() => {
        axios.put('/api/collaborators/deletecurrentskills', { collaborateur_id: this.state.dataForm.collaborateur_id })
          .then(() => {
            for (let i = 0; i < this.state.skills.length; i++) {
              axios.post('/api/collaborators/addnewskills', { skillInput: { skill: this.state.skills[i], collaborateur_id: this.state.dataForm.collaborateur_id } })
            }
          })
          .then(() => {
            alert("Le collaborateur a été modifié");
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
      <div className="CollaboratorModify">
        <Container fluid>
          <Header />
          <NavbarAdm />
        </Container>
        <Container>
          <h1 className="title">Modifier un collaborateur</h1>

          <Form method="POST" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Nom</Label>
              <Input required type="text" placeholder="Nom" name="lastname" value={this.state.dataForm.lastname} onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label>Prénom</Label>
              <Input required type="text" placeholder="Prénom" name="firstname" value={this.state.dataForm.firstname} onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label>Adresse</Label>
              <Row>
                <Col md="1"><Input type="text" placeholder="N°" name="street_num" value={this.state.dataForm.street_num} onChange={this.handleInputChange} /></Col>
                <Col md="5"><Input required type="text" placeholder="Nom de la rue" name="street_name" value={this.state.dataForm.street_name} onChange={this.handleInputChange} /></Col>
                <Col md="2"><Input type="text" placeholder="Code postal" name="postal_code" value={this.state.dataForm.postal_code} onChange={this.handleInputChange} /></Col>
                <Col md="4"><Input required type="text" placeholder="Ville" name="city" value={this.state.dataForm.city} onChange={this.handleInputChange} /></Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Label>Téléphone</Label>
              <Input type="text" placeholder="Téléphone" name="phone" value={this.state.dataForm.phone} onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" placeholder="Email" name="mail" value={this.state.dataForm.mail} onChange={this.handleInputChange} />
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
              <Input required type="text" placeholder="AAAA-MM-JJ" name="end_of_mission" value={this.state.dataForm.end_of_mission} onChange={this.handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="selectTransport">Mode de transport</Label>
              <Input required type="select" name="transport" id="selectTransport" value={this.state.dataForm.transport} onChange={this.handleInputChange}>
                <option value="empty">---</option>
                <option value="driving">Voiture</option>
                <option value="motorbiking">Moto</option>
                <option value="bicycling">Vélo</option>
                <option value="transit">Transport en commun</option>
              </Input>
            </FormGroup>

            <Button type="submit">Valider</Button>
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
    selectedCollab: state.selectedCollab,
  };
}

export default connect(mapStateToProps)(CollaboratorModify);