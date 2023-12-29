import {useEffect, useState} from "react";
import './Balsam.css';

function Balsam({ balsam, toggleAktivitaet, loescheBalsam }) {
    const [isClicked, setIsClicked] = useState(false);
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
        setIsClicked(true);
        setIsActive(!isActive);
    };

    const behandeleLoeschen = () => {
        loescheBalsam(balsam.balsamId);
    };

    return (
        <div>
            <button
                onClick={behandeleToggle}
                style={{
                    backgroundColor: isActive ? 'green' : 'darkred',
                    color: isActive ? 'white' : 'lightgray',
                    filter: isClicked ? 'none' : 'grayscale(100%)'
                }}
            >
                {balsam.bezeichnung}
            </button>
            <button onClick={behandeleLoeschen}>🗑️</button>
        </div>
    );
}
export default Balsam;
