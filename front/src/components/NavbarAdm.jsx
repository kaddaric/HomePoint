import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class NavbarAdm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar light expand="md" className="py-3 borderHeader">
          <NavbarBrand href="/">
          <img src={logo} width="150" height="45" alt="logo"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Accueil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/collaborators">Gérer les collaborateurs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/clients">Gérer les clients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users">Gérer les utilisateurs</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}
export default NavbarAdm;