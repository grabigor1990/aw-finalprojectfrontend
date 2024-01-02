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
    const [message, setMessage] = useState("")
    const [loadingStimmungen, setLoadingStimmungen] = useState(true); // Neuer Ladezustand
    const [kommentar, setKommentar] = useState();
    const [neuerKommentar, setNeuerKommentar] = useState("")

    useEffect(() => {
        aktualisiereStimmungen()
    }, []);

    useEffect(() => {
        //setKommentar()
    }, [stimmungen]);

    function aktualisiereStimmungen() {
        axios({
            method: "get",
            url: "http://localhost:8080/stimmungen",
        })
            .then(response => {
                setStimmungen(response.data.daten)
                setKommentar(response.data.daten[response.data.daten.length-1].kommentar)
                setLoadingStimmungen(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function messageEmpfangen(message) {
        setMessage(message)
        setTimeout(() => {
            setMessage("")
        }, 4000)

    }


    function erstelleKommentar() {
        axios({
            method: "put",
            url: "http://localhost:8080/stimmung/" + stimmungen[stimmungen.length - 1].stimmungId,
            data: {
                kommentar: neuerKommentar
            },
        })
            .then(response => {
                aktualisiereStimmungen()
            })
            .catch(error => {
                console.log(error)
            })
        setNeuerKommentar("")

    }

    function zeigeWort(rating) {
        let displayText = "";
        switch(rating){
            case 0: return "Alles totaler Mist!"
            case 1: return "Weiß gerade nicht weiter..."
            case 2: return "Irgendwie blöd..."
            case 3: return "Normal"
            case 4: return "Läuft!"
            case 5: return "Einfach gut druff!"
            case 6: return "Glücklich!"
        }
    }

    const erstelleKommentarHinzufuegenDurchEntertaste = (e) => {
        if (e.key === 'Enter') {
            erstelleKommentar();
        }
    }

    function aktualisiereKommentarfeld(event) {
        setNeuerKommentar(event.target.value)
    }

    if (loadingStimmungen) {
        // Zeige eine Ladeanimation oder Nachricht an, während die Daten geladen werden
        return <div>Lade ... </div>;
    }

    return (
        <div className="Stimmungskomponente Komponente">
            <div className="stimmungsBodyContainer">
            <p><strong>Aktuelle Stimmung ({stimmungen[stimmungen.length - 1].erstellungszeitalsString}):</strong></p>
            <div className="stimmungsBody">
                <div className="aktuellerSmileyContainer">
                    <img className="aktuellerSmiley" src={stimmungImages[stimmungen[stimmungen.length - 1].rating]}
                         alt=""/>
                    <p className="aktuellesStimmungsWort">{zeigeWort(stimmungen[stimmungen.length - 1].rating)}</p>
                </div>
                <div className="stimmungsDetails">
                    <p className="erstellungsZeit"></p>
                    <p className="aktuellerKommentar">{stimmungen[stimmungen.length - 1].kommentar ? '"' + stimmungen[stimmungen.length - 1].kommentar + '"' : '"Hier könnte dein Kommentar zur aktuellen Stimmung stehen..."'}</p>
                </div>
            </div>
            </div>
            <div className="stimmungFooter">
                <p className="StimmungErstellenStatus">{message}</p>
                <div className="smileyContainer">
                    <Smiley rating="0" url={stimmungImages[0]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                    <Smiley rating="1" url={stimmungImages[1]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                    <Smiley rating="2" url={stimmungImages[2]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                    <Smiley rating="3" url={stimmungImages[3]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                    <Smiley rating="4" url={stimmungImages[4]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                    <Smiley rating="5" url={stimmungImages[5]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                    <Smiley rating="6" url={stimmungImages[6]} aktualisieren={aktualisiereStimmungen}
                            messageEmpfangen={messageEmpfangen}/>
                </div>
                <div className="kommentarErstellen">
                    <input className="kommentarInput" type="text"
                           onChange={aktualisiereKommentarfeld}
                           onKeyDown={erstelleKommentarHinzufuegenDurchEntertaste}
                           value={neuerKommentar}
                           placeholder="Neuen Kommentar eingeben"/>
                    <button className="kommentarButton"
                            onClick={erstelleKommentar}></button>
                </div>
            </div>
        </div>
    );
}

export default Stimmungskomponente;