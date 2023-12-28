import React from 'react';
import './Balsam.css';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

function Balsam({ balsam, onDelete, onCheckboxChange }) {
    const bearbeiteCheckbox = (event) => {
        onCheckboxChange(balsam.balsamId, event.target.checked);
    };

    return (
        <div className="balsam">
            <label className="balsamBezeichnung">
                {balsam.bezeichnung}
                <input className="checkbox"
                    type="checkbox"
                    checked={balsam.checked}
                    onChange={bearbeiteCheckbox}
                />
            </label>
            <button className="balsamLoeschen" onClick={() => onDelete(balsam.balsamId)}>🗑️</button>
        </div>
    );
}
export default Balsam;
