import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TabsDraggable from './TabsDraggable';

const TabsDroppable = ({ id, title, items }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <h5>{title}</h5>
          {items.map((item, index) => (
            <TabsDraggable key={item._id} item={item} index={index} />
          ))}
          {items.length === 0 && (
            <p>
              {title === 'All Tags' ? (
                <span>
                  Go create some tags! You can do that by hitting the{' '}
                  <b>add a tag</b> button on the left sidebar.
                </span>
              ) : (
                'Drag some tags in here from the right!'
              )}
            </p>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'skyblue' : '#ebecf0',
  padding: 8,
  width: 250,
  borderRadius: 5,
  margin: 5,
});

export default TabsDroppable;
