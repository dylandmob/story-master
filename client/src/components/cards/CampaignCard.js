import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody } from 'shards-react';

const CampaignCard = ({ campaign }) => {
  const { id, name, photoUrl, description } = campaign;

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
      tag={Link}
      to={`/campaign/${id}`}
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

export default CampaignCard;
