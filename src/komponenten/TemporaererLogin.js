import React, {useState} from 'react';
import axios from "axios";

function TemporaererLogin(props) {
    const [benutzerName, setBenutzerName] = useState('');
    const [passwort, setPasswort] = useState('');

    const bearbeiteBenutzerNamenAenderung = (e) => {
        setBenutzerName(e.target.value);
    };

    const bearbeitePasswortAenderung = (e) => {
        setPasswort(e.target.value);
    };

    const bearbeiteLoginBefehl = async (e) => {
        e.preventDefault();

        try{
            const requestBody = {
                benutzerName: benutzerName,
                passwort:passwort
            };

            console.log('Request body:' , requestBody)

            const antwort = await axios.post('http://localhost:8080/einloggen',requestBody);

            console.log('Login successful!', antwort.data);
        }catch (error){
            console.error('Fehler während des Logins: ', error);
        }
    };

    return (
        <>
            <form onSubmit={bearbeiteLoginBefehl}>
                <input
                    type="text"
                    name="benutzerName"
                    placeholder="Benutzername"
                    value={benutzerName}
                    onChange={bearbeiteBenutzerNamenAenderung}
                />
                <input
                    type="passwort"
                    name="passwort"
                    placeholder="Passwort"
                    value={passwort}
                    onChange={bearbeitePasswortAenderung}
                />
                <button type="submit">Einloggen</button>
            </form>
        </>
    );
}
export default TemporaererLogin;