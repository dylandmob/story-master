import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Nav, Collapse } from 'shards-react';

const NavbarComp = () => {
  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleNavbar = () => setCollapseOpen(!collapseOpen);

  return (
    <Navbar sticky='top' type='dark' theme='primary' expand='md'>
      <Link className='navbar-brand' to='/' style={{ color: 'white' }}>
        Story Master
      </Link>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse open={collapseOpen} navbar>
        <Nav navbar className='ml-auto'>
          {authStatus === SIGNED_IN && (
            <Link
              className='nav-item nav-link'
              to='/'
              style={{ color: 'white' }}
            >
              My Campaigns
            </Link>
          )}
          <Link
            className='nav-item nav-link'
            to={authStatus === SIGNED_IN ? '/profile' : '/sign-in'}
            style={{ color: 'white' }}
          >
            {authStatus === SIGNED_IN ? 'Profile' : 'Sign In'}
          </Link>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
