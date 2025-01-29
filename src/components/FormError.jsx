import React from 'react'

const FormError = ({error}) => {
  return (
    <p className='block w-full bg-red-400 text-lg py-2 px-3 mb-4 rounded-md border-1 border-red-800 text-red-800'>{error}</p>
  )
}

export default FormError