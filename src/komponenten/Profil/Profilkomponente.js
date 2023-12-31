import React, {useEffect, useState} from 'react';
/*import SpotifyAPI from "./SpotifyAPI";*/
import Neuigkeiten from "./Neuigkeiten";
import './Profilkomponente.css'
import axios from "axios";
import Profilbild from "./Profilbild";


function Profilkomponente() {


    return (<div className="Profilkomponente Komponente">
            <Profilbild/>
            <div className="Neuigkeiten">
                <Neuigkeiten/>
            </div>
            {/*           <div className="SpotifyAPI1">
                <SpotifyAPI/>
            </div> <div className="SpotifyAPI2">
                <SpotifyAPI/>
            </div> <div className="SpotifyAPI3">
                <SpotifyAPI/>
            </div>*/}
        </div>);
}

export default Profilkomponente;