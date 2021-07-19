import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { Text, Group } from '@mantine/core';
import { ListBulletIcon } from '@radix-ui/react-icons';

export const WikiNav = ({ campaign }) => {
  let history = useHistory();

  let { url } = useRouteMatch();
  return (
    <div>
      <Group style={{ marginBottom: '16px' }}>
        <ListBulletIcon />
        <Link to={`${url}`}>
          <Text>
            Home
          </Text>
        </Link>
      </Group>
      <div style={{ borderLeft: '1px solid #dee2e6' }}>
        {campaign.wiki &&
          campaign.wiki.map(tag => (
            <Link
              key={tag._id}
              className="nav-item nav-link"
              to={`${url}/tag/${tag._id}`}
            >
              <Text size='sm'>
                {tag.name}
              </Text>
            </Link>
          ))}
      </div>
    </div>
  );
};
