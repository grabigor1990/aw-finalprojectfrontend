import React, {useEffect, useState} from 'react';
import Kryptonit from "./Kryptonit";
import axios from "axios"

/*Das ist die KryptonitListe!*/
function Kryptonitkomponente(props) {

    axios.defaults.withCredentials = true;
    axios.defaults.headers['Content-Type'] = 'application/json';

    const [kryptonite, setKryptonite] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/kryptonite")
            .then(response => {
                setKryptonite(response.data.daten)
            })
            .catch(error => {
                console.error(error.response.data[0]);
            });
    },[]);

    return (
        <div className="Kryptonitkomponente Komponente">
            <div>
            {kryptonite ? kryptonite.map((kryptonit, index) => (
                <Kryptonit key={index} kryptonitId={kryptonit.kryptonitId} bezeichnung={kryptonit.bezeichnung} />
            )) : <p>Trage hier die Angewohnheiten ein, die du tracken möchtest.</p>}
            </div>
        </div>
    );
}

export default Kryptonitkomponente;