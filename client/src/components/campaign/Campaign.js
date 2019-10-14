import React, { useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink,
  Container,
  Collapse,
  Button
} from 'shards-react';
import Act from './Act';
import Cards from './Cards';

const Campaign = () => {
  const [showChapters, setShowChapters] = useState(true);
  const [showActs, setShowActs] = useState(true);

  const campaign = {
    id: 0,
    name: 'Infinity: Origins',
    description: 'A really cool campaign that I love',
    photoUrl: 'https://place-hold.it/300x200',
    types: [
      { id: 0, name: 'characters' },
      { id: 1, name: 'locations' },
      { id: 2, name: 'gods' }
    ],
    chapters: [
      {
        id: 0,
        name: 'Chapter 1',
        acts: [
          { id: 0, name: 'Act 1', cards: [] },
          { id: 1, name: 'Act 2', cards: [] }
        ]
      },
      { id: 1, name: 'Finale', acts: [] }
    ],
    characters: [
      {
        id: 0,
        name: 'Takaya the Brave',
        photoUrl: 'https://imgur.com/WYYJISQ.jpg',
        description: 'The champion of Tempus'
      },
      {
        id: 1,
        name: 'Kelemvor',
        photoUrl: 'https://i.imgur.com/16azVhm.jpg',
        description: 'The God of Death'
      },
      {
        id: 2,
        name: 'Bane',
        photoUrl: 'https://i.imgur.com/skk0MdT.jpg',
        description: 'The God of Hatred'
      }
    ],
    locations: [
      {
        id: 0,
        name: 'Eternia',
        photoUrl: 'https://i.imgur.com/mfAUhYt.jpg',
        description: 'The land of elves'
      },
      {
        id: 1,
        name: 'Ike',
        photoUrl: 'https://i.imgur.com/SNoNPni.jpg',
        description: 'The land of tinkerers'
      }
    ]
  };

  let { path, url } = useRouteMatch();

  return (
    <React.Fragment>
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
          <NavLink active onClick={() => setShowChapters(!showChapters)}>
            Chapters
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
        {campaign.types.map(type => (
          <NavItem>
            <NavLink tag={Link} to={`${url}/${type.name}`}>
              {type.name}
            </NavLink>
          </NavItem>
        ))}
        <div className='text-center mt-2'>
          <Button size='sm' outline style={{ width: '80%' }}>
            add a type
          </Button>
        </div>
      </Nav>
      <Container
        style={{
          marginLeft: '160px',
          padding: '0px 10px'
        }}
      >
        <Switch>
          <Route
            exact
            path={`${path}/chapters/:chapterId/act/:actId`}
            component={Act}
          >
            <Act act={campaign.chapters[0].acts[0]} />
          </Route>
          {campaign.types.map(type => (
            <Route path={`${path}/${type.name}`}>
              <Cards type={type} cards={campaign[type.name]} />
            </Route>
          ))}
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default Campaign;
