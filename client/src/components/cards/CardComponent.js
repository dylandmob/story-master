import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody } from 'shards-react';

const CardComponent = ({ data, path }) => {
  const { _id, name, imageUrl } = data;

  return (
    <Link to={path}>
      <Card
        key={_id}
        style={{
          minWidth: '150px',
          maxWidth: '150px',
          margin: 20,
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <CardImg
          src={imageUrl}
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        <CardBody>
          <CardTitle>{name}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardComponent;
