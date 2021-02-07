import React from 'react'
import "./form-input.styles.css"

function FormInput({Label, ...otherProps}) {
    return (
        <div>
            <p>{Label}</p>
            <input {...otherProps} className="bg-tertiary form-input"/>
        </div>
    )
}

export default FormInput
