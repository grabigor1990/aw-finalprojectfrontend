import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Balsam from './Balsam';

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
            // Hier sendest du eine Anfrage an das Backend, um den Aktivitätsstatus zu aktualisieren
            await axios.post(`/balsamEintrag/${balsamId}`, { aktiv: checked });
            // Hier könntest du etwas tun, nachdem die Anfrage erfolgreich abgeschlossen wurde
        } catch (error) {
            // Hier könntest du mit einem Fehler umgehen, falls die Anfrage fehlschlägt
            console.error('Fehler beim Aktualisieren des Balsams:', error);
        }
    };

    return (
        <div className="Balsamkomponente">
            <h2>Dein Balsam für die Seele</h2>
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
                    placeholder="Neuen Balsam eingeben"
                />
                <button className="balsamErstellen" onClick={bearbeiteBalsamHinzufuegen}>Hinzufügen</button>
            </div>
        </div>
    );
}
export default Balsamkomponente;