import React, { useContext } from 'react';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
import { Link } from 'react-router-dom';
import { Title, theming, Group, ActionIcon } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { createUseStyles } from 'react-jss';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

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
      justifyContent: 'space-between',
      backgroundColor: theme.colors.navBackgroundColor,
      borderBottom: '1px solid',
      borderBottomColor: theme.colors.navBorderColor,
      paddingLeft: 16,
      paddingRight: 16,
      color: 'white',
    },
  }),
  { theming }
);

const NavbarComp = () => {
  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;
  const styles = useStyles();

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <Title
          color="white"
          style={{
            color: 'white',
            textAlign: 'center',
            marginLeft: 10,
            fontFamily: 'Dosis, sans-serif',
          }}
        >
          Story Master
        </Title>
      </Link>
      <Group>
        <ActionIcon
          variant="outline"
          color={colorScheme === 'dark' ? 'yellow' : 'white'}
          onClick={toggleColorScheme}
          title="Toggle color scheme"
        >
          {colorScheme === 'dark' ? (
            <SunIcon style={{ width: 18, height: 18 }} />
          ) : (
            <MoonIcon style={{ width: 18, height: 18 }} />
          )}
        </ActionIcon>
        {authStatus === SIGNED_IN && (
          <Link className="nav-item nav-link" to="/" style={{ color: 'white' }}>
            <Title order={4} style={{ color: 'white' }}>
              My Campaigns
            </Title>
          </Link>
        )}
        <Link
          className="nav-item nav-link"
          to={authStatus === SIGNED_IN ? '/profile' : '/sign-in'}
        >
          <Title order={4} style={{ color: 'white' }}>
            {authStatus === SIGNED_IN ? 'Profile' : 'Sign In'}
          </Title>
        </Link>
      </Group>
    </div>
  );
};

export default NavbarComp;
