import React, {useEffect, useState} from 'react';
import Kryptonit from "./Kryptonit";
import axios from "axios"

/*Das ist die KryptonitListe!*/
function Kryptonitkomponente(props) {

    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';

    const [kryptonite, setKryptonite] = useState([]);
    const [neuesKryptonit, setNeuesKryptonit] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8080/kryptonite")
            .then(response => {
                setKryptonite(response.data.daten)
            })
            .catch(error => {
                console.error(error.response.data[0]);
            });
    }, []);

    function handleChange(event) {
        setNeuesKryptonit(event.target.value)
    }

    function handleClick(){
        axios({
            method: "post",
            url: "http://localhost:8080/kryptonit",
            data: {
                bezeichnung: neuesKryptonit
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setNeuesKryptonit("");
    }

    return (
        <div className="Kryptonitkomponente Komponente">
            <h2>Schlechte Angewohnheiten</h2>
            <div className="kryptonitContainer">
                <div className="kryptonitenListe">
                    {kryptonite ? kryptonite.map((kryptonit, index) => (
                        <Kryptonit key={index} kryptonitId={kryptonit.kryptonitId} bezeichnung={kryptonit.bezeichnung} haeufigkeit={kryptonit.taeglicheEintraege[kryptonit.taeglicheEintraege.length-1]?.haeufigkeit ?? 0}/>
                    )) : <p>Trage hier die Angewohnheiten ein, die du tracken möchtest.</p>}
                </div>
                <input className="kryptonitErstellen" type="text" onChange={handleChange} value={neuesKryptonit}/>
                <button className="kryptonitErstellen" onClick={handleClick}>Neues Kryptonit hinzufügen</button>
            </div>
        </div>
    );
}

export default Kryptonitkomponente;