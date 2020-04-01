import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableTag from './DraggableTag';

const containerStyle = {
  margin: '8px',
  border: '1px solid lightgrey',
  borderRadius: '2px'
};
const titleStyle = {
  padding: '8px'
};
const tagListStyle = {
  padding: '8px'
};

const EditWikiColumn = ({ column, tags }) => {
  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={tagListStyle}
          >
            {tags.map((tag, index) => (
              <DraggableTag key={tag.id} tag={tag} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default EditWikiColumn;
