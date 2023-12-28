import React, {useEffect, useState} from 'react';
import './Balsam.css';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

function Balsam({balsam, onDelete, onCheckboxChange }) {
    console.log("Props " + balsam, onDelete, onCheckboxChange)

    const[istAktiv, setIstAktiv] = useState(balsam && balsam.checked !== undefined ? balsam.checked : false);

    useEffect(() => {
        if(balsam && balsam.checked !== undefined){
            setIstAktiv(balsam.checked);
        }
    }, [balsam]);

    const bearbeiteCheckbox = () => {
        const aktualisierterStatus = !istAktiv;
        setIstAktiv(aktualisierterStatus);
        onCheckboxChange(balsam.balsamId, aktualisierterStatus);
    };

    return (
        <div className="balsam">
            {balsam && (<label className="balsamBezeichnung">
                {balsam.bezeichnung}
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={istAktiv}
                    onChange={bearbeiteCheckbox}
                />
            </label>)}
            <button className="balsamLoeschen" onClick={() => onDelete(balsam.balsamId)}>🗑️</button>
        </div>
    );
}
export default Balsam;