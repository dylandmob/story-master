import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Button } from 'shards-react';

export const WikiNav = ({ campaign }) => {
  let history = useHistory();

  let { url } = useRouteMatch();
  return (
    <Nav
      vertical
      tabs
      style={{
        paddingTop: '20px'
      }}
    >
      <NavItem>
        <NavLink
          active
          onClick={() => history.push(`/campaign/${campaign._id}`)}
        >
          <b>Home</b>
        </NavLink>
      </NavItem>
      {campaign.wiki &&
        campaign.wiki.map(tag => (
          <Link
            key={tag._id}
            className="nav-item nav-link"
            to={`${url}/tag/${tag._id}`}
          >
            {tag.name}
          </Link>
        ))}
    </Nav>
  );
};
