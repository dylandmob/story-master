import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TabsDroppable from './TabsDroppable';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const WikiTabs = () => {
  const [tabs, setTabs] = useState(getItems(5, 10));
  const [tags, setTags] = useState(getItems(10));

  const getList = id => (id === 'droppable' ? tabs : tags);

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      source.droppableId === 'droppable2' ? setTags(items) : setTabs(items);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setTabs(result.droppable);
      setTags(result.droppable2);
    }
  };

  return (
    <div style={{ marginTop: 25 }}>
      <h2>Edit Tabs</h2>
      <p style={{ marginBottom: 5 }}>
        You can add and order tags to display as tabs on your wiki!
      </p>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <TabsDroppable id="droppable" title="Tabs on Wiki" items={tabs} />
          <TabsDroppable id="droppable2" title="All Tags" items={tags} />
        </DragDropContext>
      </div>
    </div>
  );
};

export default WikiTabs;
