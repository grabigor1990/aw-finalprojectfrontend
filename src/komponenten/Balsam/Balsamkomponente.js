import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Balsam from './Balsam';
import './Balsam.css';

function Balsamkomponente() {
    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';

    const [balsamListe, setBalsamListe] = useState([]);
    const [neuerBalsam, setNeuerBalsam] = useState('');

    console.log(balsamListe);

    const aktualisiereBalsamListe = () => {
        axios.get('http://localhost:8080/balsame')
            .then(response => {
                console.log(response.data)
                setBalsamListe(response.data);
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Balsamliste: ', error);
            });
    };

    useEffect(() => {
        aktualisiereBalsamListe();
    }, []);

    const aktualisiereBalsamListeDurchEntertaste = (e) => {
        if (e.key === 'Enter' && neuerBalsam !== '') {
            erstelleBalsam();
        }
    };

    const erstelleBalsam = () => {
        axios.post('http://localhost:8080/balsam', { bezeichnung: neuerBalsam })
            .then(() => {
                console.log(balsamListe);
                aktualisiereBalsamListe();
            })
            .catch(error => {
                console.error('Fehler beim Hinzufügen des Balsams: ', error);
            });
    };

    const loescheBalsam = (balsamId) => {
        axios.delete(`http://localhost:8080/balsam/${balsamId}`)
            .then(() => {
                aktualisiereBalsamListe();
            })
            .catch(error => {
                console.error('Fehler beim Löschen des Balsams: ', error);
            });
    };

    return (
        <div className="Balsamkomponente Komponente">
            <h2 className="balsamHeader">Dein Balsam für die Seele</h2>
            <div className="balsamContainer">
                <div className="balsamListe">
                    {balsamListe && balsamListe.length > 0 ? (balsamListe.map((balsam, index) => (
                        <Balsam key={index}
                                balsamId={balsam.balsamId}
                                bezeichnung={balsam.bezeichnung}
                                haeufigkeit={balsam.taeglicheEintraege[balsam.taeglicheEintraege.length - 1]?.haeufigkeit ?? 0}
                                loeschFunktion={loescheBalsam} />
                    ))) : (<p>Trage hier die Angewohnheiten ein, die du tracken möchtest.</p>)}
                </div>
                <input className="balsamErstellen"
                       type="text"
                       value={neuerBalsam}
                       onChange={(e) => setNeuerBalsam(e.target.value)}
                       onKeyDown={aktualisiereBalsamListeDurchEntertaste}
                       placeholder="Neuen Balsam eingeben"
                />
                <button className="balsamErstellen" onClick={erstelleBalsam}>Hinzufügen</button>
            </div>
        </div>
    );
}

export default Balsamkomponente;