import React from 'react';
import axios from 'axios';
import "./navbar.css";

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

            <button onClick={() => window.location.href = 'profil-bearbeiten.html'}>Profil bearbeiten</button>
            <img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-mood_90670.png" alt="Logo" />
            <button onClick={handleLogout}>Ausloggen</button>
        </div>
    );
};

document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 0) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }
});



export default Navbar;
