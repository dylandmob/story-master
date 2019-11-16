import React, { useContext, useEffect } from 'react';
import CardContext from '../../context/cards';
import { Link, useRouteMatch } from 'react-router-dom';
import { Container, Image, Button } from 'semantic-ui-react';

const CardPage = () => {
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

  console.log('Private Description', privateDescription);
  // let result = privateDescription.replace(/\n/g, '<br>');
  // console.log('Result', result);

  return (
    <Container className="mt-5">
      <Image
        src={imageUrl}
        centered
        style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
      <div style={{ textAlign: 'center' }}>
        <h1>{name}</h1>
        <Link to={`/campaign/${params.id}/card/${params.cardId}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          marginBottom: 100
        }}
      >
        <h3>Description</h3>
        <p>{description}</p>
        <h3>Private Description</h3>
        <p>{privateDescription}</p>
      </div>
    </Container>
  );
};

export default CardPage;
