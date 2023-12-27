import React, {useEffect, useState} from 'react';
import './Kryptonit.css';
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';



/*Das ist ein einzelnes Kryptonit!*/

function Kryptonit(props) {

    function handleChange(event) {
        //console.log(haeufigkeit)
        axios({
            method: "post",
            url: "http://localhost:8080/kryptonitEintrag/"+props.kryptonitId,
            data: {
                haeufigkeit: event.target.value
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="kryptonit">
            <p>{props.bezeichnung}</p>
            <div className="slider">
                <input onChange={handleChange} type="range" min="0" max="6" step="1"/>
                <span></span>
            </div>
        </div>
    );
}

export default Kryptonit;