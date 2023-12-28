import React, {useEffect, useState} from 'react';
import Diagramm from "./Diagramm";
import axios from "axios";

function Diagrammkomponente(props) {


    //TODO Zeiten der Stimmungen etc importieren und in vernünftiges Format wandeln, Mo, Di etc... und Kryptonite überlegen

    const [stimmungen, setStimmungen] = useState([])
    const [xAchse, setXAchse] = useState([])
    const [yAchse, setYAchse] = useState([])

    useEffect(() => {
        aktualisiereInformationen()
    }, []);

    function aktualisiereInformationen() {
        let aktualisierteXAchse = xAchse.slice();
        let aktualisierteYAchse = yAchse.slice();
    axios({
            method: "get",
            url: "http://localhost:8080/stimmungen",
        })
            .then(response => {
                response.data.daten.map(stimmung => {
                    aktualisierteXAchse.push(stimmung.erstellungszeitalsString)
                    aktualisierteYAchse.push(stimmung.rating);
                })
                setXAchse(aktualisierteXAchse)
                setYAchse(aktualisierteYAchse)
                console.log(aktualisierteXAchse)
                console.log(aktualisierteYAchse)

            })
            .catch(error => {
                console.error(error.response.data[0]);
            })
    }

    return (
        <div className="Diagrammkomponente Komponente">
            <div className="diagramHeader"></div>
            <div className="diagrammBody">
                <Diagramm zeitstempel={xAchse} ratings={yAchse}/>
            </div>
        </div>
    );
}

export default Diagrammkomponente;