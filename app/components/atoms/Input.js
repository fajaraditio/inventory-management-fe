import React from "react";

const Input = ({ type, ...props }) => {
    return <input type={type} name={props.name} placeholder={props.placeholder}
        value={props.value}
        className={`px-3 py-2 border border-gray-300 rounded ` + props.className}
        onChange={props.onChange} />;
}

export default Input;