import {useEffect, useState} from "react";
import './Profilkomponente.css'


const Begruessung = () => {
    const [eingeloggteBenutzer, setEingeloggteBenutzer] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/benutzer',{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setEingeloggteBenutzer(data))
            .catch(error => console.error('Fehler beim Abrufen',error));
    }, []);

    if(!eingeloggteBenutzer){
        return <div>Benutzer nicht Eingeloggt</div>
    }
    const {vorname, nachname} = eingeloggteBenutzer;

    return (
        <div className={'begrussung-text'}>
            <p>Hallo, <span id={'namen'}>{vorname} !</span></p>
        </div>
    );
};

export default Begruessung;