import React, {useEffect, useState} from 'react';
/*import SpotifyAPI from "./SpotifyAPI";*/
import Neuigkeiten from "./Neuigkeiten";
import './Profilkomponente.css'
import axios from "axios";
import Profilbild from "./Profilbild";
import Begruessung from "./Begruessung";


function Profilkomponente() {


    return (<div className="Profilkomponente Komponente">

        <div className={'Profilbild-Begruessung'}>
            <Profilbild/>
            <Begruessung/>
        </div>
        <div className="Neuigkeiten">
            <Neuigkeiten/>
        </div>
    </div>);
}

export default Profilkomponente;