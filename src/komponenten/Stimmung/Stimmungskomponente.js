import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Stimmung.css';
import Smiley from "./Smiley";

function Stimmungskomponente() {

    const stimmungImages = [
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/0.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/1.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/2.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/3.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/4.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/5.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/6.png",
    ]

    const [stimmungen, setStimmungen] = useState([])
    const [loading, setLoading] = useState(true); // Neuer Ladezustand

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/stimmungen",
        })
            .then(response => {
                setStimmungen(response.data.daten)
                console.log(response.data.daten)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    function handleChange(){}

    if (loading) {
        // Zeige eine Ladeanimation oder Nachricht an, während die Daten geladen werden
        return <div>Lade ... </div>;
    }

    return (
        <div className="Stimmungskomponente Komponente">
            <div className="stimmungBody">
                <img className="aktuellerSmiley" src={stimmungImages[stimmungen[stimmungen.length - 1].rating]} alt=""/>
                <div className="stimmungsDetails">
                    <p className="erstellungsZeit">{stimmungen[stimmungen.length - 1].erstellungszeitalsString}</p>
                    <p className="kommentar">{stimmungen[stimmungen.length - 1].kommentar}</p>
                </div>

            </div>
            <div className="stimmungFooter">
                <p className="verbleibendeZeit">Aktuell kannst du nur deinen letzten Eintrag bearbeiten - warte bis {stimmungen[stimmungen.length - 1].erstellungszeitalsString
                } um eine neuen Stimmungseintrag hinzuzufügen.</p>
                <div className="smileyContainer">
                    <Smiley rating="0" url={stimmungImages[0]}/>
                    <Smiley rating="1" url={stimmungImages[1]}/>
                    <Smiley rating="2" url={stimmungImages[2]}/>
                    <Smiley rating="3" url={stimmungImages[3]}/>
                    <Smiley rating="4" url={stimmungImages[4]}/>
                    <Smiley rating="5" url={stimmungImages[5]}/>
                    <Smiley rating="6" url={stimmungImages[6]}/>
                </div>
                <input className="kommentarErstellen" type="text" onChange={handleChange} placeholder="Neuen Kommentar eingeben"/>
            </div>
        </div>
    );
}

export default Stimmungskomponente;