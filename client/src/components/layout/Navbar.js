import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from 'shards-react';

const NavbarComp = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleNavbar = () => setCollapseOpen(!collapseOpen);

  return (
    <Navbar sticky='top' type='dark' theme='primary' expand='md'>
      <NavbarBrand tag={Link} to='/'>
        Story Master
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse open={collapseOpen} navbar>
        <Nav navbar className='ml-auto'>
          <NavItem>
            <NavLink active tag={Link} to='/sign-in'>
              Sign In
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
