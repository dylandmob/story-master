import React from 'react';
import { Card, CardTitle, CardImg, CardBody, Badge } from 'shards-react';

const CardComponent = ({ data }) => {
  const themes = [
    'primary',
    'secondary',
    'success',
    'info',
    'dark',
    'primary',
    'secondary',
    'success',
    'info',
    'dark'
  ];
  const { id, name, imageUrl, description, tags } = data;

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
        src={imageUrl}
        style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <p>{description}</p>
        {/* {tags.map((tag, index) => (
          <Badge key={tag} theme={themes[index]}>
            {tag}
          </Badge>
        ))} */}
      </CardBody>
    </Card>
  );
};

export default CardComponent;
