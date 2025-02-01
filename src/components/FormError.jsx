import React from 'react'

const FormError = ({error, className}) => {
  return (
    <p className={className + " text-red-500/100 mt-[-4px] text-sm"}>{error}</p>
  )
}

export default FormError