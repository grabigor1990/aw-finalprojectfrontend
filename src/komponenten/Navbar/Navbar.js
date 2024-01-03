import React, {useState} from 'react';
import axios from 'axios';
import "./navbar.css";
import Modal from "./ProfilBearbeiten";

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const [isBearbeitungOffen, setBearbeitungOffen] = useState(false);

    const offenBearbeitung = () => {
        setBearbeitungOffen(true);
    }

    const schlossBearbeitung = () => {
        setBearbeitungOffen(false);
    }

    const handleLogout = async () => {
        try {
            setLoading(true);

            await axios.post('http://localhost:8080/ausloggen');
            console.log("ausgeloggt");
            setTimeout(() =>{
                window.location.href = '../LoginUndRegistrierung/LoginForm.js';
            },500);
        } catch (error) {
            console.error('Fehler beim Ausloggen:', error);
            setLoading(false);
        }
    };

    return (
        <div className="navbar">
            <button className={'myBtn'} onClick={offenBearbeitung}>Profil bearbeiten</button>
            <Modal
            isOpen={isBearbeitungOffen}
            onRequestClose={schlossBearbeitung}
            />
            <img src= 'https://raw.githubusercontent.com/moritzrose/StimmungImages/main/MoodTracker_Logo.png' alt="Logo"/>
            <button
                onClick={handleLogout}
                disabled={loading}
            >
                {loading ? 'Laden...' : 'Ausloggen'}</button>
        </div>
    );
};
export default Navbar;
