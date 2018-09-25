import React from 'react';

import { Row, Col } from 'reactstrap';


const Header = () => {
    return (

<Row className="blockHeader py-2" >
  <Col xs="10" className="text-center">Bonjour Jenny! Vous êtes connecté en tant qu'administrateur</Col>
  <Col xs="2"><a href="">Déconnexion</a></Col>
</Row>
    )
}
export default Header;