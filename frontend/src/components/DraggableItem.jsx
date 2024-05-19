import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'DraggableItem';

const DraggableItem = ({ children, index, moveItem }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${isDragging ? 'opacity-50' : 'opacity-100'} cursor-move`}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
