import
    React, {useEffect, useState} from 'react';
import axios from 'axios';

function Balsamkomponente() {
    const [balsamListe, setBalsamListe] = useState([]);
    const [aktuellerBalsam, setAktuellerBalsam] = useState('');


    //Funktion zum Abrufen der Balsamliste beim Laden der Komponente
    const fetchBalsamListe = async () => {
        try {
            const antwort = await axios.get('http://localhost:8080/balsame');
            setBalsamListe(antwort.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Balsamliste: ', error);
        }
    };

    useEffect(() => {
        fetchBalsamListe();
    }, []);

    const bearbeiteBalsamHinzufuegen = async () => {
        if (aktuellerBalsam.trim() !== '') {
            try {
                await axios.post('http://localhost:8080/balsam', {bezeichnung: aktuellerBalsam});
                setAktuellerBalsam('');
                await fetchBalsamListe();
            } catch (error) {
                console.error('Fehler beim Hinzufügen des Balsams: ', error);
            }
        }
    };
    const umschaltenDerCheckbox = (index) => {
        const aktualisierteBalsamListe = [...balsamListe];
        aktualisierteBalsamListe[index].checked = !aktualisierteBalsamListe[index].checked;
        setBalsamListe(aktualisierteBalsamListe);
    }

    const loescheBalsam = (index) => {
        const aktualisierteBalsamListe = [...balsamListe];
        aktualisierteBalsamListe.splice(index, 1);
        setBalsamListe(aktualisierteBalsamListe);
    }

    return (
        <div className="Balsamkomponente Komponente">
            <div>
                <h3>Balsamkomponente</h3>
                <input type="text"
                       value={aktuellerBalsam}
                       onChange={(e) => setAktuellerBalsam(e.target.value)}
                       placeholder="Balsam eingeben und Enter drücken"
                />
                <button onClick={bearbeiteBalsamHinzufuegen}>Hinzufügen</button>
                <ul>
                    {balsamListe.map((balsam, index) => (
                        <li key={index}>
                            {balsam.name}
                            <input type="checkbox"
                                   checked={balsam.checked}
                                   onChange={() => umschaltenDerCheckbox(index)}
                            />
                            <button onClick={() => loescheBalsam(index)}>🗑</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Balsamkomponente;