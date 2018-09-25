import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Table, Button } from 'reactstrap';

import Header from '../components/Header';
import NavbarAdm from '../components/NavbarAdm';
import Footer from '../components/Footer';
import AutoSuggestClient from './AutoSuggestClient';
import { filterClient, resetClient, initDataClients, selectClient } from '../actions/client.actions';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.changeClient = this.changeClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
  }

  componentDidMount() {
    this.props.initDataClients();
  }
  changeClient(clientEntered) {
    this.props.filterClient(clientEntered);
  }

  deleteClient(id) {
    if (id) {
      axios.put('/api/clients', { client_id: id })
        .then(res => {
          if (res.status === 200) {
            return (
              alert("Le client a été supprimé")
            )
          }
        })
        .then(this.props.initDataClients)
    }
  }

  render() {
    const { clients, searchClient, resetClient, selectClient } = this.props;

    return (
      <div className="gestionClients">
        <Container fluid className="pageContent py-4">
          <Container fluid className="py-2">
            <Header />
            <NavbarAdm />
          </Container>

          <Container className="clientsList">
            <Row className="py-2">
              <Col>
                <h1 className="title">Gestion de clients</h1>
              </Col>
            </Row>
            <Row className="py-5">
              <Col>
                <AutoSuggestClient clients={clients} changeClient={this.changeClient} />
              </Col>
              <Col>
                <Button onClick={() => resetClient(clients)}>Reset</Button>
              </Col>
              <Col>
                <Button tag={Link} to="/clients/add">Ajouter un client</Button>
              </Col>
              <Col></Col>
            </Row>
            <Table striped className="py-2">
              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>ADRESSE</th>
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  searchClient.map(client => {
                    return (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{`${client.street_num} ${client.street_name} ${client.postal_code} ${client.city}`}</td>
                        <td className="text-center">
                          <Button tag={Link} to="/clients/modify" onClick={() => selectClient(client)}>Modifier</Button>{' '}
                          <Button onClick={() => this.deleteClient(client.id)}>Supprimer</Button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </Container>
        </Container>
        <Container fluid>
          <Footer />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients,
    searchClient: state.searchClient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ filterClient, resetClient, initDataClients, selectClient }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);