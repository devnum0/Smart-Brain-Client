import React from 'react'

export default function Field({type,name,placeholder, method, containerClass}) {
    const newName = type === 'text' ? name: type;
    const container = containerClass ? containerClass : '';
    const nameCapitalized = newName.charAt(0).toUpperCase() + newName.slice(1);
    return (
        <div className={container === ''? 'mt3': container}>
            <label className="db fw6 lh-copy f6" htmlFor={name}>{nameCapitalized}</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={method} />
        </div>
    )
}
