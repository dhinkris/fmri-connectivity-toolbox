import React, {useState} from 'react';
import props from 'react';
import {createContext} from 'react';

const Button = ({text}) => {
}

/*const Button = ({text}) => {
    const hiddenFileInput = React.useRef(null);
    const onClick = () => {
        console.log('click')
        hiddenFileInput.current.click();
    };
    const handleChange = event =>{
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
        console.log()
    };
    return (
    <>
    <button onClick={onClick} className='btn'>{text}</button>
    
    <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display:'none'}}
        ></input>
    </>
    )
}*/

export default Button
