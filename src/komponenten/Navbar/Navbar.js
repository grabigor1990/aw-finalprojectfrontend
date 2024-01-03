import React, {useState} from 'react';
import axios from 'axios';
import "./navbar.css";

const Navbar = () => {
    const [loading, setLoading] = useState(false);

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

            <button onClick={() => window.location.href = 'profil-bearbeiten.html'}>Profil bearbeiten</button>
            {/*<img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-mood_90670.png" alt="Logo" />*/}
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
