import React, { useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Nav, NavItem, NavLink, Collapse, Button } from 'shards-react';
import { Icon } from 'semantic-ui-react';

const CampaignNavbar = ({ campaign }) => {
  const [activeChapter, setActiveChapter] = useState('');
  const [showChapters, setShowChapters] = useState(true);
  const [showActs, setShowActs] = useState(true);
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
          onClick={() => history.push(`/campaign/${campaign._id}`)}
        >
          <b>{campaign.name}</b>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active onClick={() => setShowChapters(!showChapters)}>
          Chapters
          <Icon
            className='pull-right'
            name='plus'
            color='blue'
            link
            onClick={() =>
              history.push(`/campaign/${campaign._id}/chapter/new`)
            }
            style={{ float: 'right' }}
          />
        </NavLink>
      </NavItem>
      <Collapse open={showChapters}>
        {campaign.chapters.map(chapter => (
          <React.Fragment>
            <NavItem className='ml-3'>
              <NavLink onClick={() => setShowActs(!showActs)}>
                - {chapter.name}
              </NavLink>
            </NavItem>
            <Collapse open={showActs}>
              {chapter.acts.map(act => (
                <NavItem className='ml-4'>
                  <NavLink
                    tag={Link}
                    to={`${url}/chapters/${chapter.id}/act/${act.id}`}
                  >
                    # {act.name}
                  </NavLink>
                </NavItem>
              ))}
            </Collapse>
          </React.Fragment>
        ))}
      </Collapse>
      {campaign.tags.map(tag => (
        <Link
          key={tag._id}
          className='nav-item nav-link'
          to={`${url}/tag/${tag._id}`}
        >
          {tag.name}
        </Link>
      ))}
      <div className='text-center mt-2'>
        <Button
          size='sm'
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
