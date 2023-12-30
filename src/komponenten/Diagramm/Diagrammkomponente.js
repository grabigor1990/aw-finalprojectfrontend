import React, {useEffect, useState} from 'react';
import Diagramm from "./Diagramm";
import axios from "axios";

function Diagrammkomponente(props) {


    //TODO Zeiten der Stimmungen etc importieren und in vernünftiges Format wandeln, Mo, Di etc... und Kryptonite überlegen

    const [stimmungen, setStimmungen] = useState([])
    const [xAchseStimmungen, setXAchseStimmungen] = useState([])
    const [yAchseStimmungen, setYAchseStimmungen] = useState([])

    const [kryptonite, setKryptonite] = useState([])
    const [xAchseKryptonitEintraege, setXAchseKryptonitEintraege] = useState([])
    const [yAchseKryptonitEintraege, setYAchseKryptonitEintraege] = useState([])

    const [balsame, setBalsame] = useState([])
    const [xAchseBalsamEintraege, setXAchseBalsamEintraege] = useState([])
    const [yAchseBalsamEintraege, setYAchseBalsamEintraege] = useState([])

    const [loading, setLoading] = useState(true); // Neuer Ladezustand


    let firstTime = true;

    useEffect(() => {
            axios({
                method: "get",
                url: "http://localhost:8080/stimmungen",
            })
                .then(response => {
                    setStimmungen(response.data.daten)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                })
    }, []);


    useEffect(() => {
        if (!loading) {
            aktualisiereInformationen();// aktualisierteStimmungen direkt verarbeiten, wenn sich was ändert.
        }
    }, [stimmungen])

    function aktualisiereInformationen() {
        const aktualisierteXAchseStimmungen = []
        const aktualisierteYAchseStimmungen = []

        //Stimmungen aktualisieren
            stimmungen.map(stimmung => {
                    aktualisierteXAchseStimmungen.push(stimmung.erstellungszeitalsString)
                    aktualisierteYAchseStimmungen.push(stimmung.rating);
                    setXAchseStimmungen(aktualisierteXAchseStimmungen)
                    setYAchseStimmungen(aktualisierteYAchseStimmungen)
                })
        /*//KryptonitEintraege aktualisieren

        const aktualisierteXAchseKryptonitEintraege = []
        const aktualisierteYAchseKryptonitEintraege = []

        axios({
            method: "get",
            url: "http://localhost:8080/kryptonite",
        })
            .then(response => {
                response.data.daten.map(kryptonit => {

                    aktualisierteXAchseKryptonitEintraege.push(kryptonit.taeglicheEintraege)
                })
                setKryptonite(aktualisierteXAchseKryptonitEintraege)
                console.log(aktualisierteXAchseKryptonitEintraege)

            })
            .catch(error => {
                console.error(error.response.data[0]);
            })
*/
        //BalsamEintraege aktualisieren

        const aktualisierteXAchseBalsamEintraege = []
        const aktualisierteYAchseBalsamEintraege = []
      /*  axios({
            method: "get",
            url: "http://localhost:8080/balsame",
        })
            .then(response => {
                response.data.map(balsam => {
                    aktualisierteXAchseBalsamEintraege.push(balsam.taeglicheEintraege)

                })
                setXAchseStimmungen(aktualisierteXAchseBalsamEintraege)
                console.log(aktualisierteXAchseBalsamEintraege)


            })
            .catch(error => {
                console.error(error.response.data[0]);
            })*/
    }

    if (loading) {
        // Zeige eine Ladeanimation oder Nachricht an, während die Daten geladen werden
        return <div>Lade ... </div>;
    }
    return (
        <div className="Diagrammkomponente Komponente">
            <div className="diagramHeader"></div>
            <div className="diagrammBody">
                <Diagramm zeitstempel={xAchseStimmungen} ratings={yAchseStimmungen}/>
            </div>
        </div>
    );
}

export default Diagrammkomponente;