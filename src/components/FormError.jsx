import React from 'react'

const FormError = ({error, className, children}) => {
  return (
    <p className={className + " text-red-500/100 mt-[-4px] text-sm"}>{error}{children}</p>
  )
}

export default FormError