import React, { useContext } from 'react';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
import { Link } from 'react-router-dom';
import {
  Title,
  useMantineTheme,
  Group,
  ActionIcon,
  Tooltip,
  Kbd,
  createStyles,
} from '@mantine/core';
// import { createStyles } from 'react-jss';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import ColorContext from '../../context/color';

const useStyles = createStyles((theme) => ({
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
}));

const NavbarComp = () => {
  const authContext = useContext(AuthContext);
  const colorContext = useContext(ColorContext);
  const { authStatus } = authContext;
  const dark = colorContext.colorScheme === 'dark';
  const { classes } = useStyles();

  return (
    <div className={classes.navbar}>
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
        <Tooltip
          label={
            <>
              Toggle Color Scheme: <Kbd>⌘</Kbd>/<Kbd>Ctrl</Kbd> + <Kbd>J</Kbd>
            </>
          }
          position="left"
        >
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'dark'}
            onClick={() => colorContext.onChange(dark ? 'light' : 'dark')}
            title="Toggle color scheme"
          >
            {dark ? (
              <SunIcon style={{ width: 18, height: 18 }} />
            ) : (
              <MoonIcon style={{ width: 18, height: 18 }} />
            )}
          </ActionIcon>
        </Tooltip>
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
