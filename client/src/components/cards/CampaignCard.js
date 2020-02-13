import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody } from 'shards-react';

const CampaignCard = ({ campaign }) => {
  const { _id, name, imageUrl, description } = campaign;

  return (
    <Link to={`/campaign/${_id}`}>
      <Card
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
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        <CardBody>
          <CardTitle>{name}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CampaignCard;
