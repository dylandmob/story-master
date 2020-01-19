import React from 'react';
import { Button } from 'shards-react';
import CardComponent from '../cards/CardComponent';

const Act = ({ act }) => {
  const { name, cards } = act;
  return (
    <div className="p-3 mt-2 border rounded">
      <div className="my-3 text-center">
        <h1>{name}</h1>
        <Button outline>Add a card</Button>
      </div>
      {cards.length > 0 ? (
        cards.map(data => <CardComponent data={data} />)
      ) : (
        <h4 className="text-center" style={{ color: 'gray' }}>
          No cards yet! Add some
        </h4>
      )}
      {cards.map(data => (
        <CardComponent data={data} />
      ))}
    </div>
  );
};

export default Act;
