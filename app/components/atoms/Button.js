import React from "react";

const Button = ({type, children}) => {
    const colorType = {
        'primary': 'bg-blue-500 hover:bg-blue-700 text-white',
        'info': 'bg-blue-700 hover:bg-blue-900 text-white',
        'danger': 'bg-red-500 hover:bg-red-700 text-white',
        'warning': 'bg-yellow-500 hover:bg-yellow-700 text-dark',
    }

    return (
        <button className={`px-3 py-2 rounded ` + colorType[type]}>
            {children}
        </button>
    )
}

export default Button