import React, { Component } from 'react';

import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initDataSkills } from '../actions/skill.actions';

import { Form, FormGroup, Label, Input, Container, Button, Row, Col } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillToAdd: '',
      skillToDelete: '',
    }
  }

  componentDidMount() {
    const { skills, initDataSkills } = this.props;
    if (skills.length === 0) initDataSkills()
  }

  handleSubmitAdd(e) {
    if (this.state.skillToAdd !== '') {
      axios.post('/api/skills', { skill: this.state.skillToAdd })
        .then(res => {
          if (res.status === 200) {
            return (
              alert("La compétence a été ajoutée")
            )
          }
        })
    }
  }

  handleSubmitDelete() {
    if (this.state.skillToDelete !== '') {
      axios.put('/api/skills', { skill_id: this.state.skillToDelete })
        .then(res => {
          if (res.status === 200) {
            return (
              alert("la compétence a été supprimée")
            )
          }
        })
    }
  }

  handleChange(event) {
    this.setState({
      skillToDelete: event.target.value,
    })
  }

  render() {
    const { skills } = this.props;
    return (
      <div className="Skills">
        <Container fluid className="pageContent">
          <Header />
          <NavbarAdm />
          <Container>
            <h1 className="title">Gestion des compétences des collaborateurs</h1>
            {/* Add a skill */}
            <Form className="py-4" onSubmit={() => this.handleSubmitAdd()}>
              <FormGroup>
                <Label>Entrer une compétence à ajouter</Label>
                <Row>
                  <Col xs="9">
                    <Input required name="skill" onChange={event => this.setState({ skillToAdd: event.target.value })}></Input>
                  </Col>
                  <Col xs="3" className="text-center">
                    <Button type="submit">Ajouter</Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
            {/* Delete a skill */}
            <Form className="py-4" onSubmit={() => this.handleSubmitDelete()}>
              <FormGroup>
                <Label>Sélectionner une compétence à supprimer </Label>
                <Row>
                  <Col xs="9">
                    <Input required type="select" name="skill" onChange={(event) => this.handleChange(event)}>
                      {
                        skills.map(skill => <option key={skill.id} value={skill.id}>{skill.skill}</option>)
                      }
                    </Input>
                  </Col>
                  <Col xs="3" className="text-center">
                    <Button type="submit">Supprimer</Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Container>
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
    skills: state.skills
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ initDataSkills }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);