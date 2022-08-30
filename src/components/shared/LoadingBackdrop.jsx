import React from 'react'

export default function LoadingBackdrop() {
  return (
    <div className='absolute w-full h-full flex items-center justify-center bg-white opacity-75 z-20'>
      <h1 className='text-3xl font-bold'>لطفا صبر کنید...</h1>
    </div>
  )
}
