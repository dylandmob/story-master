import React, { useContext, useEffect, useState } from 'react';
import CardContext from '../../context/cards';
import { Link, useRouteMatch } from 'react-router-dom';
import { Container, Button } from 'shards-react';
import { Icon } from 'semantic-ui-react';
import CardComponent from '../cards/CardComponent';

const Tag = ({ campaign, readOnly }) => {
  const cardContext = useContext(CardContext);
  const { cards, getCardsForTag } = cardContext;

  const [tag, setTag] = useState({ name: '' });

  const { params } = useRouteMatch();

  useEffect(() => {
    if (campaign._id && campaign.tags) {
      let foundTag = campaign.tags.find((t) => t._id === params.tagId);
      if (foundTag) {
        setTag(foundTag);
        getCardsForTag(campaign._id, foundTag._id);
      }
    } else if (campaign._id && campaign.wiki) {
      let foundTag = campaign.wiki.find((t) => t === params.tagId);
      if (foundTag) {
        setTag(foundTag);
        getCardsForTag(campaign._id, foundTag._id);
      }
    }
    // eslint-disable-next-line
  }, [params]);

  return (
    <Container>
      <div className="my-3 text-center">
        <h1>
          {tag.name}
          {campaign.isAdmin && (
            <Link to={`/campaign/${campaign._id}/edit/tag/${tag._id}/edit`}>
              <Icon
                name="pencil"
                color="blue"
                link
                style={{ marginLeft: 15 }}
              />
            </Link>
          )}
        </h1>
        {campaign.isAdmin && (
          <Link to={`/campaign/${campaign._id}/edit/card/new`}>
            <Button className="mt-3" outline>
              Add a card
            </Button>
          </Link>
        )}
      </div>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <p style={{ width: '70%' }}>{tag.description}</p>
      </div>
      <Container
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <CardComponent
              key={card._id}
              data={card}
              path={
                readOnly
                  ? `/campaign/${campaign._id}/card/${card._id}`
                  : `/campaign/${campaign._id}/edit/card/${card._id}`
              }
            />
          ))
        ) : (
          <h4 className="text-center mt-5" style={{ color: 'gray' }}>
            {readOnly ? 'no cards here!' : "it's kinda empty in here..."}
          </h4>
        )}
      </Container>
    </Container>
  );
};

export default Tag;
