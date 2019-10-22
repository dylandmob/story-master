import React from 'react';
import { Container, Card, CardTitle, CardImg, CardBody } from 'shards-react';

const CardPage = ({ data }) => {
  const { id, name, photoUrl, description } = data;

  return (
    <Container>
      <Card
        key={id}
        style={{
          minWidth: '300px',
          maxWidth: '300px',
          margin: 20,
          overflow: 'hidden'
        }}
      >
        <CardImg
          src={photoUrl}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <p>{description}</p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CardPage;
