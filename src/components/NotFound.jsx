import React from 'react'

const NotFound = ({text}) => {
  return (
    <div className='flex flex-col items-center gap-2'>
        <h2 className='text-8xl text-primary'>404</h2>
        <p className='text-lg text-default'>{text}</p>
    </div>
  )
}

export default NotFound