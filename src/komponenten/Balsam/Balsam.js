import {useEffect, useState} from "react";
import './Balsam.css';

function Balsam({ balsam, toggleAktivitaet, loescheBalsam, zeigePapierkorb }) {
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        if (balsam.taeglicheEintraege && balsam.taeglicheEintraege.length > 0) {
            setIsActive(balsam.taeglicheEintraege[balsam.taeglicheEintraege.length - 1].aktiv);
        } else {
            setIsActive(false);
        }
    }, [balsam]);

    const behandeleToggle = () => {
        toggleAktivitaet(balsam.balsamId);
        setIsActive(!isActive);
    };

    const behandeleLoeschen = () => {
        loescheBalsam(balsam.balsamId);
    };

    return (
        <div className="balsamElement">
            <button className="balsam"
                    onClick={behandeleToggle}
                    style={{
                        backgroundColor: balsam.farbe,
                        color: balsam.farbe === 'green' ? 'white' : 'black',
                    }}
            >
                <span className="balsamText">{balsam.bezeichnung}</span>
                {zeigePapierkorb &&(
                    <button className="papierkorb" onClick={behandeleLoeschen}>🗑️</button>)}
            </button>
        </div>
    );
}

export default Balsam;