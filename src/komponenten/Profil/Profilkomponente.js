import React, {useEffect, useState} from 'react';
/*import SpotifyAPI from "./SpotifyAPI";*/
import Neuigkeiten from "./Neuigkeiten";
import './Profilkomponente.css'
import Profilbild from "./Profilbild";
import axios from "axios";


function Profilkomponente() {

    const [modalAnzeigen, setmodalAnzeigen] = useState(false);
    const [avatarBezeichnung, setAvatarBezeichnung] = useState(null)

    useEffect(() => {
        aktualisiereAvatar()
    }, []);

    const avatar = [
        "anonym", "tiger", "wildschein", "pinguin", "pferd", "loewe", "krokodil", "koala", "hase", "elch"
    ]

    const avatarLinks = [
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/anonym.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/tiger.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/wildschwein.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/pinguin.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/pferd.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/loewe.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/krokodil.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/koala.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/hase.png",
        "https://raw.githubusercontent.com/moritzrose/StimmungImages/main/elch.png"
    ]

    function wortzuBild(avatarBezeichnung) {
        switch (avatarBezeichnung) {
            case null:
                setAvatarBezeichnung(avatarLinks[0])
                break;
            case "anonym":
                setAvatarBezeichnung(avatarLinks[0])
                break;
            case "tiger":
                setAvatarBezeichnung(avatarLinks[1])
                break;
            case "wildschwein":
                setAvatarBezeichnung(avatarLinks[2])
                break;
            case "pinguin":
                setAvatarBezeichnung(avatarLinks[3])
                break;
            case "pferd":
                setAvatarBezeichnung(avatarLinks[4])
                break;
            case "loewe":
                setAvatarBezeichnung(avatarLinks[5])
                break;
            case "krokodil":
                setAvatarBezeichnung(avatarLinks[6])
                break;
            case "koala":
                setAvatarBezeichnung(avatarLinks[7])
                break;
            case "hase":
                setAvatarBezeichnung(avatarLinks[8])
                break;
            case "elch":
                setAvatarBezeichnung(avatarLinks[9])
                break;
        }
    }

    function openModal() {
        setmodalAnzeigen(true);
    }

    function closeModal() {
        setmodalAnzeigen(false);
    }

    function aktualisiereAvatar() {
        axios({
            method: "get",
            url: "http://localhost:8080/benutzer",
        })
            .then(response => {
                wortzuBild(response.data.animalWord)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function neuerAvatar() {
        aktualisiereAvatar()
        wortzuBild()
        closeModal()
    }

    return (
        <div className="Profilkomponente Komponente">
            <div className="Modalfenster">
                {avatarLinks.map((avatar, index) => (
                    <img className="Avatar" src={avatar} key={index} onClick={() => neuerAvatar(avatar[index])}  alt=""/>
                ))}
            </div>
            <div className="Profilbild">
                <Profilbild avatarBezeichnung={avatarBezeichnung}/>
            </div>
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
        </div>
    );
}

export default Profilkomponente;