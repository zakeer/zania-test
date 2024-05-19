import React from 'react'

function OverlayImage({ src, alt }) {
  return (
    <div className='w-full h-screen fixed top-0 left-0 flex items-center justify-center md:p-24 p-8 backdrop-blur-xl bg-white/30'>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export default OverlayImage