import React from 'react';
import axios from 'axios';
import "./navbar.css"; // Stellen Sie sicher, dass Ihre CSS-Datei korrekt importiert ist.

const Navbar = () => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/ausloggen');
            console.log("ausgeloggt");
        } catch (error) {
            console.error('Fehler beim Ausloggen:', error);
        }
    };

    return (
        <div className="navbar">

            <button onClick={() => window.location.href = '/profil-bearbeiten'}>Profil bearbeiten</button>
            <img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-mood_90670.png" alt="Logo" />


            <button onClick={handleLogout}>Ausloggen</button>
        </div>
    );
};

export default Navbar;
