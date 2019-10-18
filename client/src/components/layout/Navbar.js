import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
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
  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

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
            <NavLink
              active
              tag={Link}
              to={authStatus === SIGNED_IN ? '/profile' : '/sign-in'}
            >
              {authStatus === SIGNED_IN ? 'Profile' : 'Sign In'}
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
