import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Balsam from './Balsam';

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

function Balsamkomponente() {
    const [balsamListe, setBalsamListe] = useState([]);
    const [neuerBalsam, setNeuerBalsam] = useState('');

    useEffect(() => {
        fetchBalsamListe();
    }, []);

    const fetchBalsamListe = async () => {
        try {
            const response = await axios.get('http://localhost:8080/balsame');
            setBalsamListe(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Balsamliste: ', error);
        }
    };

    const bearbeiteBalsamHinzufuegen = async () => {
        try {
            await axios.post('http://localhost:8080/balsam', {bezeichnung: neuerBalsam});
            setNeuerBalsam('');
            fetchBalsamListe();
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Balsams: ', error);
        }
    };

    //Funktion, dass auch beim Drücken der Entertaste der Balsam hinzugefügt wird
    const bearbeiteBalsamHinzufuegenDurchEntertaste = (e) => {
        if (e.key === 'Enter') {
            bearbeiteBalsamHinzufuegen();
        }
    };

    const bearbeiteBalsamLoeschen = async (balsamId) => {
        try {
            await axios.delete(`http://localhost:8080/balsam/${balsamId}`);
            fetchBalsamListe();
        } catch (error) {
            console.error('Fehler beim Löschen des Balsams: ', error);
        }
    };

    const bearbeiteCheckboxAenderung = async (balsamId, checked) => {
        try {
            await axios.post(`http://localhost:8080/balsamEintrag/${balsamId}`, {aktiv: checked});
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Balsams:', error);
        }
    };

    return (
        <div className="Balsamkomponente Komponente">
            <h2 className="balsamHeader">Dein Balsam für die Seele</h2>
            <div className="balsamContainer">
                <div className="balsamListe">
                    {balsamListe.map((balsam) => (
                        <div key={balsam.balsamId}>
                            {balsam.name} {/* Hier renderst du den Balsam als Fließtext */}
                            <Balsam
                                balsam={balsam}
                                onDelete={bearbeiteBalsamLoeschen}
                                onCheckboxChange={bearbeiteCheckboxAenderung}
                            />
                        </div>
                    ))}
                </div>

                <input className="balsamErstellen"
                       type="text"
                       value={neuerBalsam}
                       onChange={(e) => setNeuerBalsam(e.target.value)}
                       onKeyDown={bearbeiteBalsamHinzufuegenDurchEntertaste}
                       placeholder="Neuen Balsam eingeben"
                />
                <button className="balsamErstellen" onClick={bearbeiteBalsamHinzufuegen}>Hinzufügen</button>
            </div>
        </div>
    );
}

export default Balsamkomponente;