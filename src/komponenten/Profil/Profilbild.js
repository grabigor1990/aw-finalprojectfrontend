import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Profilbild.css"

function Profilbild(props) {

    const [modalAnzeigen, setmodalAnzeigen] = useState(false);
    const [avatarBezeichnung, setAvatarBezeichnung] = useState(null)

    useEffect(() => {
        aktualisiereAvatar()
    }, []);

    const avatarNamen = [
        "anonym", "tiger", "wildschwein", "pinguin", "pferd", "loewe", "krokodil", "koala", "hase", "elch"
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

    function toggleModal() {
        setmodalAnzeigen(!modalAnzeigen)
    }

    function neuerAvatar(avatarBezeichnung) {
        toggleModal()
        axios({
            method: "put",
            url: "http://localhost:8080/avatar",
            data: {
                "avatarBezeichnung": avatarBezeichnung
            },
        })
            .then((response) => {
                wortzuBild(response.data.tierWort)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            {modalAnzeigen && (
                <div className="Modalfenster">
                    {avatarLinks.map((avatar, index) => (
                        <img className="AvatarAuswahlbild" src={avatar} key={index}
                             onClick={() => neuerAvatar(avatarNamen[index])} alt=""/>
                    ))}
                </div>
            )}
            <img className="Avatar" src={avatarBezeichnung} onClick={() => {
                toggleModal()
            }} alt="Profilbild"/>
        </div>
    );
}

export default Profilbild;