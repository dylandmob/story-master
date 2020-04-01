import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const containerStyle = {
  border: '1px solid lightgrey',
  borderRadius: '2px',
  padding: '8px',
  marginBottom: '8px'
};

const DraggableTag = ({ tag, index }) => {
  return (
    <Draggable draggableId={tag.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={containerStyle}
        >
          {tag.content}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTag;
