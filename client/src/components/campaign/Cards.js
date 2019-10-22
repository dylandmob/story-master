import React from 'react';
import { Container, Button } from 'shards-react';
import CardComponent from '../cards/CardComponent';

const Characters = ({ tag, cards }) => {
  return (
    <Container>
      <div className='my-3 text-center'>
        <h1>{tag.name}</h1>
        <Button className='mt-3' outline>
          Add a card
        </Button>
      </div>
      <Container
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {cards && cards.length > 0 ? (
          cards.map(card => <CardComponent data={card} />)
        ) : (
          <h4 className='text-center mt-5' style={{ color: 'gray' }}>
            it's kinda empty in here...
          </h4>
        )}
      </Container>
    </Container>
  );
};

export default Characters;
