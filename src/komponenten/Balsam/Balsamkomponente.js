import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Balsam from './Balsam';

function Balsamkomponente() {
    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';

    const [balsamListe, setBalsamListe] = useState([]);
    const [neuerBalsam, setNeuerBalsam] = useState('');
    const [zeigePapierkorb, setZeigePapierkorb] = useState(false);
    const [fehlerMeldung, setFehlerMeldung] = useState("");

    useEffect(() => {
        aktualisiereBalsamListe();
    }, []);

    function aktualisiereBalsamListe() {
        axios.get("http://localhost:8080/balsame")
            .then(response => {
                setBalsamListe(response.data);
            })
            .catch(error => {
                console.error(error.response.data[0]);
            });
    }

    function handleChange(event) {
        setFehlerMeldung("");
        if (event.target.value.length > 40) {
            setFehlerMeldung("Maximal 40 Zeichen");
        } else {
            setNeuerBalsam(event.target.value);
        }
    }

    function erstelleBalsam() {
        if (neuerBalsam.trim() !== '') {
            axios.post("http://localhost:8080/balsam", {
                bezeichnung: neuerBalsam
            })
                .then(() => {
                    aktualisiereBalsamListe();
                })
                .catch(error => {
                    setFehlerMeldung(error.response.data.join(". "));
                });
            setNeuerBalsam("");
            setFehlerMeldung("");
        } else {
            setFehlerMeldung("Text darf nicht leer sein.");
        }
    }

    function hinzufuegenDesNeuenBalsamsDurchEntertastenklick(event) {
        if (event.key === 'Enter') {
            erstelleBalsam();
        }
    }

    function loescheBalsam(balsamId) {
        axios.delete(`http://localhost:8080/balsam/${balsamId}`)
            .then(() => {
                aktualisiereBalsamListe();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function aktivierePapierkorbButton() {
        setZeigePapierkorb(!zeigePapierkorb);
    }

    function toggleAktivitaet(balsamId) {
        axios.post(`http://localhost:8080/balsamEintrag/${balsamId}`)
            .then(() => {
                aktualisiereBalsamListe();
            })
            .catch(error => {
                console.error("Fehler beim Aktualisieren des Balsams: ", error);
            });
    }

    return (
        <div className="Balsamkomponente Komponente">
            <h2 className="balsamHeader">Dein Balsam für die Seele</h2>
            <div className="balsamContainer">
                <div className="balsamListe">
                    {balsamListe ? balsamListe.map((balsam, index) => (
                        <Balsam
                            key={index}
                            balsam={balsam}
                            toggleAktivitaet={toggleAktivitaet}
                            loescheBalsam={loescheBalsam}
                            zeigePapierkorb={zeigePapierkorb}
                            style={{backgroundColor: balsam.farbe}}
                        />
                    )) : <p>Trage hier deine Balsame ein, die Du tracken möchtest</p>}
                </div>
                <div className="balsamEintrag">
                    <div className="balsamErstellen">
                        <input className="balsamInput"
                               type="text"
                               onChange={handleChange}
                               onKeyDown={hinzufuegenDesNeuenBalsamsDurchEntertastenklick}
                               value={neuerBalsam}
                               placeholder="Füge eine neue gute Angewohnheit hinzu..."
                               required
                        />
                        <button className="balsamButton" onClick={erstelleBalsam}></button>
                        <button className="balsamButton korb" onClick={aktivierePapierkorbButton}>🗑️</button>
                    </div>
                    <div className="fehlerMeldung">{fehlerMeldung && <span>{fehlerMeldung}</span>}</div>
                </div>
            </div>
        </div>
    );
}

export default Balsamkomponente;
