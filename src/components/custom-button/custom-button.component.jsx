import React from 'react'
import "./custom-button.styles.css"

function CustomButton({children, ...otherProps}) {
    return (
        <div>
            <button {...otherProps} className="btn bg-secondary">
                {children}
            </button>
        </div>
    )
}

export default CustomButton
