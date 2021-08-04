import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Nav, Collapse } from 'shards-react';
import { Affix, Container, Title, theming } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  (theme) => ({
    navbar: {
      position: 'relative',
      overflow: 'hidden',
      top: 0,
      width: '100%',
      height: 68,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.colors.navBackgroundColor,
    },
  }),
  { theming }
);

const NavbarComp = () => {
  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;
  const styles = useStyles();

  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleNavbar = () => setCollapseOpen(!collapseOpen);

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <Title
          color="white"
          style={{
            textAlign: 'center',
            marginLeft: 10,
            fontFamily: 'Dosis, sans-serif',
          }}
        >
          Story Master
        </Title>
      </Link>
      {authStatus === SIGNED_IN && (
        <Link className="nav-item nav-link" to="/" style={{ color: 'white' }}>
          My Campaigns
        </Link>
      )}
      <Link
        className="nav-item nav-link"
        to={authStatus === SIGNED_IN ? '/profile' : '/sign-in'}
        style={{ color: 'white' }}
      >
        {authStatus === SIGNED_IN ? 'Profile' : 'Sign In'}
      </Link>
    </div>
  );
};

export default NavbarComp;
