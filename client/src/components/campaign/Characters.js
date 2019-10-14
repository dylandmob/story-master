import React from 'react';
import { Container } from 'shards-react';
import CardComponent from '../cards/CardComponent';

const Characters = ({ characters }) => {
  return (
    <Container>
      <h1 className='text-center mt-5'>Characters</h1>
      <Container
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {characters.map(character => (
          <CardComponent data={character} />
        ))}
      </Container>
    </Container>
  );
};

export default Characters;
