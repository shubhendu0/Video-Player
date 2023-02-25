import './local.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeUrl } from '../redux/action';


const Local = () => {
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();
    const handleChange = (e) =>{
        setUrl(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(()=>{
        console.log(url)
        dispatch(changeUrl(url));
    },[url])
    return (
        <div className='select-files'>
            <div className='local-wrapper'>
                <input className='file' id='file' type="file" onChange={handleChange}/>
                <label for='file'>Select Video To Play</label>
            </div>           
        </div>
    )
}
export default Local;