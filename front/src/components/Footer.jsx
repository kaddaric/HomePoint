import React from 'react';

import logoWhite from '../logo-white.png';

import { Row, Col } from 'reactstrap';


const Footer = () => {
  return (
    <Row className="footer py-2" >
      <Col xs="4" className="text-center py-2">
        <img src={logoWhite} width="150" height="45" alt="logo" />
      </Col>
      <Col xs="4" className="text-center py-3">onepoint. © 2018</Col>
      <Col xs="4" className="ext-center py-3">Marina, Cedric, Kandane, Aniya</Col>
    </Row>
  )
}
export default Footer;