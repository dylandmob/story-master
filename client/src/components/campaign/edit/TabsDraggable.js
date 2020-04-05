import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TabsDraggable = ({ item, index }) => {
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {item.name}
        </div>
      )}
    </Draggable>
  );
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  color: isDragging ? 'white' : 'black',
  userSelect: 'none',
  padding: 16,
  margin: `0 0 8px 0`,
  background: isDragging ? 'blue' : 'white',
  borderRadius: 5,

  // styles we need to apply on draggables
  ...draggableStyle
});

export default TabsDraggable;
