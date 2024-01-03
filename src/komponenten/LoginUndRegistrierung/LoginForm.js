import React, {useState} from 'react';
import axios from 'axios';
import './login-register.css';
import Modal from './RegistrForm';

const LoginForm = () => {
    const [benutzerName, setBenutzerName] = useState('');
    const [passwort, setPasswort] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openRegisterModal = () => {
        setRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setRegisterModalOpen(false);
    };

    const bearbeiteBenutzerNamenAenderung = (e) => {
        setBenutzerName(e.target.value);
    };

    const bearbeitePasswortAenderung = (e) => {
        setPasswort(e.target.value);
    };

    const bearbeiteLoginBefehl = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const requestBody = {
                benutzerName: benutzerName,
                passwort: passwort
            };

            console.log('Request body:', requestBody)

            const antwort = await axios.post('http://localhost:8080/einloggen', requestBody);

            console.log('Login successful!', antwort.data);
            setTimeout(() => {
                loginRedirect();
                setLoading(false);
            },500)
        } catch (error) {
            console.error('Fehler während des Logins: ', error);
            setLoading(false)
        }
    };

    const loginRedirect = () => {
        setIsLoggedIn(true);
        window.location.href = '../Layout.js';
    };

    return (
        <div className="container">
            <div className={"title"}>
                <img className={"image"} src= 'https://raw.githubusercontent.com/moritzrose/StimmungImages/main/MoodTracker_Logo.png' alt="Mood"/>
                <h4 className={"text"}>Verfolge deine Stimmung</h4>
            </div>
            <form onSubmit={bearbeiteLoginBefehl} className={"login-container"}>
                <input
                    className="inputLogin"
                    type="text"
                    name="benutzerName"
                    placeholder="Benutzername"
                    value={benutzerName}
                    onChange={bearbeiteBenutzerNamenAenderung}
                />
                <input
                    className="inputLogin"
                    type="password"
                    id={"passwort"}
                    name={"passwort"}
                    placeholder={"Passwort"}
                    value={passwort}
                    onChange={bearbeitePasswortAenderung}
                />
                <button
                    className={"login-button"}
                    type={"submit"}
                    onClick={bearbeiteLoginBefehl}
                    disabled={loading}
                >
                    {loading ? 'Laden...' : 'Einloggen'}
                </button>
                <hr className={"line"}/>
            </form>
            <div>
                <button className={'myBtn'} onClick={openRegisterModal}>Neues Konto erstellen</button>
                <Modal
                    isOpen={isRegisterModalOpen}
                    onRequestClose={closeRegisterModal}
                />
            </div>
        </div>
    );
};

export default LoginForm;
