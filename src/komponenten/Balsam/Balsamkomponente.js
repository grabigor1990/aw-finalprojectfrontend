import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Balsam from './Balsam';

function Balsamkomponente() {
    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';

    const [balsamListe, setBalsamListe] = useState([]);
    const [neuerBalsam, setNeuerBalsam] = useState('');

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
        setNeuerBalsam(event.target.value);
    }

    function erstelleBalsam() {
        axios.post("http://localhost:8080/balsam", {
            bezeichnung: neuerBalsam
        })
            .then(() => {
                aktualisiereBalsamListe();
            })
            .catch(error => {
                console.error(error);
            });
        setNeuerBalsam("");
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
                        />
                    )) : <p>Trage hier deine Balsame ein, die Du tracken möchtest</p>}
                </div>
                <div className="balsamErstellen">
                    <input className="balsamInput"
                           type="text"
                           onChange={handleChange}
                           value={neuerBalsam}
                           placeholder="Füge eine neue gute Angewohnheit hinzu..."
                           required
                    />
                    <button className="balsamButton" onClick={erstelleBalsam}></button>
                </div>

            </div>
        </div>
    );
}
export default Balsamkomponente;
