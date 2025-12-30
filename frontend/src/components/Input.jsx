import { useId } from "react"
import React from 'react'

function Input({
    className = "",
    label,
    type = "text",
    ...props
}, ref) {
    const Id = useId();
  return (
    <div>
        {label && (
            <label
            htmlFor={Id}
            className={className}
            >
            {label}
            </label>
        )}
        <input 
        className={`${className} w-full `}
        type={type}
        id={Id}
        ref={ref}
        {...props}  
        ></input>
      
    </div>
  )
}

export default React.forwardRef(Input)
