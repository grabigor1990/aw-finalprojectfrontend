import React, {useEffect, useState} from 'react';
import './Kryptonit.css';
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';


/*Das ist ein einzelnes Kryptonit!*/

function Kryptonit(props) {

    const [haeufigkeit, setHaeufigkeit] = useState("");

    function handleChange(event) {
        //console.log(haeufigkeit)

        axios({
            method: "post",
            url: "http://localhost:8080/kryptonitEintrag/" + props.kryptonitId,
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
        switch (event.target.value) {
            case "0":
                setHaeufigkeit("gar nicht")
                break;
            case "1":
                setHaeufigkeit("sehr wenig")
                break;
            case "2":
                setHaeufigkeit("ein bisschen")
                break;
            case "3":
                setHaeufigkeit("normal")
                break;
            case "4":
                setHaeufigkeit("eher viel")
                break;
            case "5":
                setHaeufigkeit("viel")
                break;
            case "6":
                setHaeufigkeit("sehr viel")
                break;
        }
    }

    function handleClick(){

    }

    return (
        <div className="kryptonit">
            <p className="kryptonitBezeichnung">{props.bezeichnung}: </p>
            <input className="slideBar" onChange={handleChange} type="range" min="0" max="6" step="1"/>
            <span className="kryptonitStatustext">{haeufigkeit}</span>

        </div>
    );
}

export default Kryptonit;