import React from 'react';
import { useRouteMatch, Link, NavLink } from 'react-router-dom';
import { createStyles, Text, Group } from '@mantine/core';
import { ListBulletIcon } from '@radix-ui/react-icons';

const useStyles = createStyles((theme) => ({
  menuContainer: {
    borderLeft: `1px solid ${theme.colors.menuBorderColor}`,
  },
  navLink: {
    borderLeft: '1px solid transparent',
    marginLeft: -1,
  },
  activeNavLink: {
    color: theme.colors.activeLinkTextColor,
    backgroundColor: theme.colors.activeLinkBackgroundColor,
    borderLeftColor: theme.colors.activeLinkBorderColor,
  },
}));

interface WikiNavProps {
  campaign: Campaign;
}

export const WikiNav = ({ campaign }: WikiNavProps) => {
  let { url } = useRouteMatch();
  const { classes } = useStyles();
  return (
    <div>
      <Group style={{ marginBottom: '16px' }}>
        <ListBulletIcon />
        <Link to={`${url}`}>
          <Text>Home</Text>
        </Link>
      </Group>
      <div className={classes.menuContainer}>
        {campaign.wiki &&
          campaign.wiki.map((tag) => (
            <NavLink
              key={tag._id}
              className={`nav-item nav-link ${classes.navLink}`}
              activeClassName={classes.activeNavLink}
              to={`${url}/tag/${tag._id}`}
            >
              <Text size="sm">{tag.name}</Text>
            </NavLink>
          ))}
      </div>
    </div>
  );
};
