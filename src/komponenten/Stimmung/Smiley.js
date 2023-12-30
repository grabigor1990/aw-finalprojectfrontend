import React, {useState} from 'react';
import axios from "axios";
import './Smiley.css';

function Smiley(props) {

    const [displayText, setDisplayText] = useState(""); // Zustand für den angezeigten Text


    function handleClick() {
        axios({
            method: "post",
            url: "http://localhost:8080/stimmung",
            data: {
                rating: props.rating
            },
        })
            .then(response => {
                props.aktualisieren()
                props.messageEmpfangen(response.data.benachrichtigung)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function zeigeWort() {
        setDisplayText("Dein individueller Text"); // Setze den gewünschten Text hier
    }

    function versteckeWort() {
        setDisplayText(""); // Leeren Text, wenn die Maus den Bereich verlässt
    }

    return (
        <div className="smiley">
            <img onMouseOver={() => zeigeWort()} onMouseLeave={() => versteckeWort()} onClick={() => {handleClick()}} className="smileyIcon" src={props.url} alt=""/>
            <span className="smileyWort">Wort</span>
        </div>
    );
}

export default Smiley;