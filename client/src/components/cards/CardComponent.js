import React from 'react';
import { Card, CardTitle, CardImg, CardBody } from 'shards-react';

const CardComponent = ({ data }) => {
  const { id, name, photoUrl, description } = data;

  return (
    <Card
      key={id}
      style={{
        minWidth: '300px',
        maxWidth: '300px',
        margin: 20,
        overflow: 'hidden',
        cursor: 'pointer'
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
  );
};

export default CardComponent;
