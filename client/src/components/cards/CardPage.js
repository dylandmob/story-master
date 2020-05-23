import React, { useContext, useEffect } from 'react';
import CardContext from '../../context/cards';
import { Link, useRouteMatch } from 'react-router-dom';
import { Container, Image, Button } from 'semantic-ui-react';

const CardPage = ({ campaign }) => {
  const cardContext = useContext(CardContext);
  const { card, getCardForId } = cardContext;

  let { params } = useRouteMatch();

  useEffect(() => {
    if (params.cardId) {
      getCardForId(params.id, params.cardId);
    }
    // eslint-disable-next-line
  }, []);

  if (!card) return <Container>Loading...</Container>;

  const { name, imageUrl, description, privateDescription } = card;

  return (
    <Container className="mt-5">
      <Image
        src={imageUrl}
        centered
        style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
      <div style={{ textAlign: 'center', marginTop: 25 }}>
        <h1>{name}</h1>
        {campaign.isAdmin && (
          <Link to={`/campaign/${params.id}/edit/card/${params.cardId}`}>
            <Button>Edit</Button>
          </Link>
        )}
      </div>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          marginBottom: 100,
          marginTop: 25,
        }}
      >
        <p>{description}</p>
        {campaign.isAdmin && card.privateDescription && (
          <>
            <h5>Private Notes</h5>
            <p>{privateDescription}</p>
          </>
        )}
      </div>
    </Container>
  );
};

export default CardPage;
