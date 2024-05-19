import React, { useCallback } from 'react'
import Image from './Image'
import useDocuments from '../hooks/useDocuments'

function Document({
  id,
  title,
}) {
  const { setSelectedImage } = useDocuments();
  const onImageClick = useCallback((e) => {
    setSelectedImage(e.target.src);
  }, [setSelectedImage])
  return (
    <div className='w-100 bg-slate-50 border p-4 hover:shadow-lg hover:rounded-lg flex flex-col justify-center items-center'>
      <h3 className='text-xl text-center mb-4'>{title}</h3>
      <Image onClick={onImageClick} alt={title} className="w-full" src={`https://cataas.com/cat?height=600&width=600&${id}`} />
    </div>
  )
}

export default Document