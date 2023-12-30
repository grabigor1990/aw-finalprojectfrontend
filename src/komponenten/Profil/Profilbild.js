import React from 'react';


function Profilbild(props) {

    return (
        <div className="profilbildContainer">
            <img className="aktuellesProfilbild" src={props.avatarBezeichnung} alt=""/>
        </div>
    );
}

export default Profilbild;