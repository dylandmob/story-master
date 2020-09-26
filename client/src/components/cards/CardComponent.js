import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { Card, CardTitle, CardImg, CardBody, Tooltip } from 'shards-react';

const CardComponent = ({ data, path }) => {
  const { _id, name, imageUrl, hidden } = data;

  return (
    <Link to={path}>
      <Card
        key={_id}
        style={{
          minWidth: '175px',
          maxWidth: '175px',
          margin: 20,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <CardImg
          src={imageUrl}
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        {hidden && (
          <>
            <div
              id="hoverable"
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: 0,
                left: 0,
                width: 175,
                height: 200,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <Icon name="eye slash" size="huge" color="black" />
            </div>
            <Tooltip target="#hoverable">😁 Woo! I am a tooltip!</Tooltip>
          </>
        )}
        <CardBody>
          <CardTitle>{name}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardComponent;
