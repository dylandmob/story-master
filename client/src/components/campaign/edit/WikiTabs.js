import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Icon, Button, Loader } from 'semantic-ui-react';

const WikiTabs = ({ tags, onSetTabs }) => {
  const [tabs, setTabs] = useState([]);
  return (
    <div>
      <h4>Wiki Tabs</h4>
      <DndProvider backend={Backend}>
        <TabsList passedTags={tags} onSetTags={onSetTabs} />
      </DndProvider>
      <h4>All tags</h4>
      <TagsList
        tags={tags}
        onAddTag={tag => setTabs(tabs.concat(tag))}
      ></TagsList>
    </div>
  );
};

const TagsList = ({ tags, onAddTag }) => {
  if (!tags) {
    return <Loader>Loading...</Loader>;
  }
  return tags.map(tag => (
    <div
      key={tags._id}
      style={{
        border: '1px solid gray',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white'
      }}
    >
      {tag.name}
      <Button
        animated="vertical"
        color="green"
        size="mini"
        floated="right"
        onClick={() => onAddTag(tag)}
        type="button"
      >
        <Button.Content hidden>Add</Button.Content>
        <Button.Content visible>
          <Icon name="plus" />
        </Button.Content>
      </Button>
    </div>
  ));
};

const TabsList = ({ passedTags, onSetTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(passedTags);
  }, []);

  useEffect(() => {
    onSetTags(tags);
  }, [tags]);

  const moveCard = useCallback(
    async (dragIndex, hoverIndex) => {
      const dragCard = tags[dragIndex];
      setTags(
        update(tags, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [tags]
  );
  const renderCard = (tag, index) => {
    return (
      <Card
        key={tag._id}
        index={index}
        id={tag._id}
        text={tag.name}
        moveCard={moveCard}
      />
    );
  };
  if (!tags) {
    return <Loader>Loading...</Loader>;
  }
  return (
    <>
      <div style={{ width: 400 }}>
        {tags.map((tag, i) => renderCard(tag, i))}
      </div>
    </>
  );
};

const style = {
  border: '1px solid gray',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};
const ItemTypes = {
  CARD: 'card'
};
const Card = ({ id, text, index, moveCard }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text}
    </div>
  );
};

export default WikiTabs;
