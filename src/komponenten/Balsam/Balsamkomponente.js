import React, {useId, useState} from 'react';

function Balsamkomponente() {
    const [balsamListe, setBalsamListe] = useState([]);
    const [aktuellerBalsam, setAktuellerBalsam] = useState('');

    const eingebenDesBalsams = (e) => {
        setAktuellerBalsam(e.target.value);
    };

    const bestaetigenDerEingabe = (e) => {
        if(e.key === 'Enter' && aktuellerBalsam.trim() !== ''){
            setBalsamListe([...balsamListe, {name: aktuellerBalsam, checked: true}]);
            setAktuellerBalsam('');
        }
    }

    const umschaltenDerCheckbox = (index) => {
        const aktualisierteBalsamListe = [...balsamListe];
        aktualisierteBalsamListe[index].checked = !aktualisierteBalsamListe[index].checked;
        setBalsamListe(aktualisierteBalsamListe);
    }

    const loescheBalsam = (index) => {
        const aktualisierteBalsamListe = [...balsamListe];
        aktualisierteBalsamListe.splice(index,1);
        setBalsamListe(aktualisierteBalsamListe);
    }

    return (
        <div className="Balsamkomponente Komponente">
            <div>
                <h3>Balsamkomponente</h3>
                <input type="text"
                value={aktuellerBalsam}
                onChange={eingebenDesBalsams}
                onKeyPress={bestaetigenDerEingabe}
                placeholder="Balsam eingeben und Enter drücken"
                />
                <ul>
                    {balsamListe.map((balsam, index) => (
                        <li key={index}>
                            {balsam.name}
                            <input type="checkbox"
                            checked={balsam.checked}
                            onChange={() => umschaltenDerCheckbox(index)}
                            />
                            <button onClick ={() => loescheBalsam(index)}>🗑</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Balsamkomponente;