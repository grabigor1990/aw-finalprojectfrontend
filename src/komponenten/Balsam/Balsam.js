import React from 'react';
import './Balsam.css';

function Balsam({ balsam, onDelete, onCheckboxChange }) {
    const bearbeiteCheckbox = (event) => {
        onCheckboxChange(balsam.balsamId, event.target.checked);
    };

    return (
        <div className="balsam">
            <label>
                {balsam.bezeichnung}
                <input
                    type="checkbox"
                    checked={balsam.checked}
                    onChange={bearbeiteCheckbox}
                />
            </label>
            <button onClick={() => onDelete(balsam.balsamId)}>🗑️</button>
        </div>
    );
}
export default Balsam;
