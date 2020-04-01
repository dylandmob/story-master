import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import EditWikiColumn from './EditWikiColumn';

const EditWikiTabs = () => {
  const [tags, setTags] = useState({
    'tag-1': { id: 'tag-1', content: 'Gods' },
    'tag-2': { id: 'tag-2', content: 'Champions' },
    'tag-3': { id: 'tag-3', content: 'Places' },
    'tag-4': { id: 'tag-4', content: 'Guilds' }
  });
  const [columns, setColumns] = useState({
    tagsColumn: {
      id: 'tagsColumn',
      title: 'Tags',
      tagIds: ['tag-1', 'tag-2', 'tag-3', 'tag-4']
    }
  });

  const [columnOrder, setColumnOrder] = useState(['tagsColumn']);

  const onDragEnd = result => {
    console.log('Result', result);

    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = columns[source.droppableId];
    const newTagIds = Array.from(column.tagIds);
    newTagIds.splice(source.index, 1);
    newTagIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      tagIds: newTagIds
    };

    setColumns({ ...columns, [newColumn.id]: newColumn });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnOrder.map(columnId => {
        const column = columns[columnId];
        const columnTags = column.tagIds.map(tagId => tags[tagId]);
        return (
          <EditWikiColumn key={columnId} column={column} tags={columnTags} />
        );
      })}
    </DragDropContext>
  );
};

export default EditWikiTabs;
