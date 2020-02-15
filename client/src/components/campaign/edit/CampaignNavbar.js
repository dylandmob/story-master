import React, { useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Nav, NavItem, NavLink, Button } from 'shards-react';

const CampaignNavbar = ({ campaign }) => {
  let history = useHistory();

  let { url } = useRouteMatch();

  return (
    <Nav
      vertical
      tabs
      style={{
        height: '100%',
        width: '160px',
        position: 'fixed',
        zIndex: 1,
        top: 60,
        left: 0,
        overflowX: 'hidden',
        paddingTop: '20px'
      }}
    >
      <NavItem>
        <NavLink
          active
          onClick={() => history.push(`/campaign/${campaign._id}/edit`)}
        >
          <b>{campaign.name}</b>
        </NavLink>
      </NavItem>
      <Link className="nav-item nav-link" to={`/campaign/${campaign._id}`}>
        View Wiki
      </Link>
      <h6 style={{ marginLeft: '70px' }}>Tags</h6>
      {campaign.tags &&
        campaign.tags.map(tag => (
          <Link
            key={tag._id}
            className="nav-item nav-link"
            to={`${url}/tag/${tag._id}`}
          >
            {tag.name}
          </Link>
        ))}
      <div className="text-center mt-2">
        <Button
          size="sm"
          outline
          style={{ width: '80%' }}
          onClick={() => history.push(`/campaign/${campaign._id}/tag/new`)}
        >
          add a tag
        </Button>
      </div>
    </Nav>
  );
};

export default CampaignNavbar;
