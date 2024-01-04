import React, {useEffect, useState} from 'react';
import Kryptonit from "./Kryptonit";
import axios from "axios"

/*Das ist die KryptonitListe!*/
function Kryptonitkomponente(props) {

    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';

    const [kryptonite, setKryptonite] = useState([]);
    const [neuesKryptonit, setNeuesKryptonit] = useState("");
    const [fehlerMeldung, setFehlerMeldung] = useState("");



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
        setFehlerMeldung("");
        if (event.target.value.length > 20) {
            setFehlerMeldung("Maximal 20 Zeichen");
        } else {
            setNeuesKryptonit(event.target.value)
        }
    }

    function erstelleKryptonit() {
        if (neuesKryptonit.trim() !== "") {
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
                    setFehlerMeldung(error.response.data.join(". "))
                });
            setNeuesKryptonit("");
            setFehlerMeldung("");
        } else {
            setFehlerMeldung("Textfeld darf nicht leer sein!");
        }
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
                    {kryptonite && kryptonite.length > 0 ? (
                    kryptonite.map((kryptonit, index) => (
                        <Kryptonit key={index} kryptonitId={kryptonit.kryptonitId} bezeichnung={kryptonit.bezeichnung}
                                   haeufigkeit={kryptonit.taeglicheEintraege[kryptonit.taeglicheEintraege.length - 1]?.haeufigkeit ?? 0}
                                   loeschFunktion={loescheKryptonit}/>
                    ))) : <p>Du trackst aktuell noch keine schlechten Angewohnheiten.</p>}
                </div>
                <div className="kryptonitErstellen">
                    <input className="kryptonitInput" type="text"
                           onChange={handleChange}
                           onKeyDown={bearbeiteKryptonitHinzufuegenDurchEntertaste}
                           value={neuesKryptonit}
                           placeholder="Füge eine neue schlechte Angewohnheit hinzu..."
                           required/>
                    <button className="kryptonitButton" onClick={erstelleKryptonit}></button>
                </div>
                <div className="fehlerMeldung">{fehlerMeldung && <span>🛑 {fehlerMeldung}</span>}</div>
            </div>
        </div>
    );
}

export default Kryptonitkomponente;