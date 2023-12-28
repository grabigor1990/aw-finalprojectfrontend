import React, {useEffect, useState} from 'react';
import './Kryptonit.css';
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';


/*Das ist ein einzelnes Kryptonit!*/

function Kryptonit(props) {

    const [haeufigkeitsWort, setHaeufigkeitsWort] = useState("");
    const [haeufigkeit, setHaeufigkeit] = useState(props.haeufigkeit || "0");

    useEffect(() => {
        zahlZuWort(props.haeufigkeit.toString())
    }, []);

    function zahlZuWort(zahl) {
        switch (zahl) {
            case "0":
                setHaeufigkeitsWort("gar nicht")
                break;
            case "1":
                setHaeufigkeitsWort("sehr wenig")
                break;
            case "2":
                setHaeufigkeitsWort("ein bisschen")
                break;
            case "3":
                setHaeufigkeitsWort("normal")
                break;
            case "4":
                setHaeufigkeitsWort("eher viel")
                break;

            case "5":
                setHaeufigkeitsWort("viel")
                break;
            case "6":
                setHaeufigkeitsWort("sehr viel")
                break;
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

    return (
        <div className="kryptonit">
            <p className="kryptonitBezeichnung">{props.bezeichnung}: </p>
            <input className="kryptonitSlideBar" onChange={handleChange} type="range" min="0" max="6" step="1"
                   value={haeufigkeit}/>
            <span className="kryptonitStatustext">{haeufigkeitsWort}</span>
            <button className="kryptonitLöschen" onClick={() => {
                props.loeschFunktion(props.kryptonitId)
            }}>🗑️
            </button>
        </div>
    );
}

export default Kryptonit;