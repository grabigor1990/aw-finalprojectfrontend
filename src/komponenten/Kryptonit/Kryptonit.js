import React, {useEffect, useState} from 'react';
import './Kryptonit.css';
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';


/*Das ist ein einzelnes Kryptonit!*/

function Kryptonit(props) {

    const [haeufigkeitsWort, setHaeufigkeitsWort] = useState(zahlZuWort(props.haeufigkeit));
    const [haeufigkeit, setHaeufigkeit] = useState(props.haeufigkeit||'0');


    function zahlZuWort(zahl){
        switch (zahl) {
            case "0":
                setHaeufigkeitsWort("gar nicht")
                return "gar nicht"
            case "1":
                setHaeufigkeitsWort("sehr wenig")
                return "sehr wenig"
            case "2":
                setHaeufigkeitsWort("ein bisschen")
                return "ein bisschen"
            case "3":
                setHaeufigkeitsWort("normal")
                return "normal"
            case "4":
                setHaeufigkeitsWort("eher viel")
                return "eher viel"
            case "5":
                setHaeufigkeitsWort("viel")
                return "viel"
            case "6":
                setHaeufigkeitsWort("sehr viel")
                return "sehr viel"
        }
    }

    function handleChange(event) {

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

        setHaeufigkeit(event.target.value)
        zahlZuWort(event.target.value)
    }

    function handleClick(event){
        axios({
            method: "delete",
            url: "http://localhost:8080/kryptonit/" + props.kryptonitId,
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
            <p className="kryptonitBezeichnung">{props.bezeichnung}: </p>
            <input className="kryptonitSlideBar" onChange={handleChange} type="range" min="0" max="6" step="1" value={haeufigkeit}/>
            <span className="kryptonitStatustext">{haeufigkeitsWort}</span>
            <button className="kryptonitLöschen" onClick={handleClick}>🗑️</button>
        </div>
    );
}

export default Kryptonit;