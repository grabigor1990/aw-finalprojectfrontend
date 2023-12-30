import React from 'react';
import SpotifyAPI from "./SpotifyAPI";
import Neuigkeiten from "./Neuigkeiten";
import './profilcomponente.css'
import Profilbild from "./Profilbild";


function Profilkomponente(props) {
    return (
        <div className="Profilkomponente Komponente">
            <div className="Profilbild">
                <Profilbild/>
            </div>
            <div className="Neuigkeiten">
                <Neuigkeiten/>
            </div>
            <div className="SpotifyAPI1">
                <SpotifyAPI/>
            </div> <div className="SpotifyAPI2">
                <SpotifyAPI/>
            </div> <div className="SpotifyAPI3">
                <SpotifyAPI/>
            </div>
        </div>
    );
}

export default Profilkomponente;