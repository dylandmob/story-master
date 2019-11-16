import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody } from 'shards-react';

const CardComponent = ({ data }) => {
  const { _id, name, imageUrl, description, tags } = data;

  let { params } = useRouteMatch();

  return (
    <Link to={`/campaign/${params.id}/card/${_id}`}>
      <Card
        key={_id}
        style={{
          minWidth: '200px',
          maxWidth: '200px',
          margin: 20,
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <CardImg
          src={imageUrl}
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
        <CardBody>
          <CardTitle>{name}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardComponent;
