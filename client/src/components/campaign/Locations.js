import React from 'react';
import { Container } from 'shards-react';
import CardComponent from '../cards/CardComponent';

const Locations = ({ locations }) => {
  return (
    <Container>
      <h1 className='text-center mt-5'>Locations</h1>
      <Container
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {locations.map(location => (
          <CardComponent data={location} />
        ))}
      </Container>
    </Container>
  );
};

export default Locations;
