import React from 'react'
import { ClipLoader } from 'react-spinners'

function InitialLoader() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <ClipLoader />
    </div>
  )
}

export default InitialLoader