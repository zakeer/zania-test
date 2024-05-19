import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Document from './Document'
import DraggableItem from './DraggableItem';
import useDocuments from '../hooks/useDocuments';

function DocumentsGrid() {
  const { documents, moveDocument } = useDocuments();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-3 gap-2'>
        {documents.map((item, index) => (
          <DraggableItem key={index} index={index} moveItem={moveDocument}>
            <Document
              id={item.id}
              type={item.type}
              title={item.title}
              position={index}
            />
          </DraggableItem>
        ))}
      </div>
    </DndProvider>

  )
}

export default DocumentsGrid