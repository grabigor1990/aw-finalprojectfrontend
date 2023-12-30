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
        aktualisiereKryptonite();
    }, []);

    function aktualisiereKryptonite() {
        axios({
            method: "get",
            url: "http://localhost:8080/kryptonite",
        })
            .then(response => {
                setKryptonite(response.data.daten);
            })
            .catch(error => {
                console.error(error.response.data[0]);
            })
    }

    function handleChange(event) {
        setNeuesKryptonit(event.target.value)
    }

    function erstelleKryptonit() {
        axios({
            method: "post",
            url: "http://localhost:8080/kryptonit",
            data: {
                bezeichnung: neuesKryptonit
            },
        })
            .then(() => {
                aktualisiereKryptonite()
            })
            .catch(error => {
                console.error(error);
            });
        setNeuesKryptonit("");
    }

    function loescheKryptonit(kryptonitId) {
        axios({
            method: "delete",
            url: "http://localhost:8080/kryptonit/" + kryptonitId,
        })
            .then(response => {
                aktualisiereKryptonite()
            })
            .catch(error => {
                console.error(error);
            });
    }

    const bearbeiteKryptonitHinzufuegenDurchEntertaste = (e) => {
        if (e.key === 'Enter') {
            erstelleKryptonit();
        }
    };

    return (
        <div className="Kryptonitkomponente Komponente">
            <h2 className="kryptonitHeader">Schlechte Angewohnheiten</h2>
            <div className="kryptonitBody">
                <div className="kryptonitenListe">
                    {kryptonite ? kryptonite.map((kryptonit, index) => (
                        <Kryptonit key={index} kryptonitId={kryptonit.kryptonitId} bezeichnung={kryptonit.bezeichnung}
                                   haeufigkeit={kryptonit.taeglicheEintraege[kryptonit.taeglicheEintraege.length - 1]?.haeufigkeit ?? 0} loeschFunktion={loescheKryptonit}/>
                    )) : <p>Trage hier die Angewohnheiten ein, die du tracken möchtest.</p>}
                </div>
                <input className="kryptonitErstellen" type="text" onChange={handleChange} onKeyDown={bearbeiteKryptonitHinzufuegenDurchEntertaste} value={neuesKryptonit} placeholder="Füge eine neue schlechte Angewohnheit hinzu, die du tracken möchtest"/>
            </div>
        </div>
    );
}

export default Kryptonitkomponente;