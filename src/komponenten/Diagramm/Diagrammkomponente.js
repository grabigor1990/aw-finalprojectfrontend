import React, {useEffect, useState} from 'react';
import Diagramm from "./Diagramm";
import axios from "axios";

function Diagrammkomponente(props) {


    //TODO Zeiten der Stimmungen etc importieren und in vernünftiges Format wandeln, Mo, Di etc... und Kryptonite überlegen

    const [stimmungen, setStimmungen] = useState([])
    const [xAchseStimmungen, setXAchseStimmungen] = useState([])
    const [yAchseStimmungen, setYAchseStimmungen] = useState([])

    const [kryptonite, setKryptonite] = useState([])
    const [kryptonitEintraege, setKryptonitEintraege] = useState([{}])

    const [balsame, setBalsame] = useState([])
    const [balsamEintraege, setBalsamEintraege] = useState([{}])


    const [loadingStimmungen, setLoadingStimmungen] = useState(true); // Neuer Ladezustand
    const [loadingKryptonite, setLoadingKryptonite] = useState(true); // Neuer Ladezustand
    const [loadingBalsame, setLoadingBalsame] = useState(true); // Neuer Ladezustand


    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/stimmungen",
        })
            .then(response => {
                aktualisiereStimmungen(response.data.daten)
            })
            .catch(error => {
                console.log(error)
            })
        axios({
            method: "get",
            url: "http://localhost:8080/kryptonite",
        })
            .then(response => {
                aktualisiereKryptonite(response.data.daten)
            })
            .catch(error => {
                console.log(error)
            })
        axios({
            method: "get",
            url: "http://localhost:8080/balsame",
        })
            .then(response => {
                aktualisiereBalsame(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    function aktualisiereStimmungen(stimmungen) {
        const aktualisierteXAchse = []
        const aktualisierteYAchse = []

        stimmungen.map(stimmung => {
            aktualisierteXAchse.push(stimmung.erstellungszeitalsString)
            aktualisierteYAchse.push(stimmung.rating);
            setXAchseStimmungen(aktualisierteXAchse)
            setYAchseStimmungen(aktualisierteYAchse)
        })
        setTimeout(() => setLoadingStimmungen(false), 10)
    }

    function aktualisiereKryptonite(kryptonite) {
        const aktualisierteEintraege = []

        kryptonite.map(kryptonit => {
            const temporaereEintraegeX = []
            const temporaereEintraegeY = []
            kryptonit.taeglicheEintraege.map(taeglicherEintrag => {
                temporaereEintraegeX.push(taeglicherEintrag.erstellungszeitalsString)
                temporaereEintraegeY.push(taeglicherEintrag.haeufigkeit)
            })
            aktualisierteEintraege.push(
                {
                    bezeichnung: kryptonit.bezeichnung,
                    taeglicheEintraeX: temporaereEintraegeX,
                    taeglicheEintraeY: temporaereEintraegeY
                }
            )
        })
        setKryptonitEintraege(aktualisierteEintraege)
        setTimeout(() => setLoadingKryptonite(false), 10)
        //das TimeOut hier ist notwendig, um diesen kurzen asynchronen Moment des "set..." Befehls zu überbrücken
        //und wirklich erst danach die loading Variable auf false zu setzen, sonst sind die Daten noch nicht angekommen.
    }

    function aktualisiereBalsame(balsame) {
        const aktualisierteEintraege = []

        balsame.map(balsam => {
            const temporaereEintraegeX = []
            const temporaereEintraegeY = []
            balsam.taeglicheEintraege.map(taeglicherEintrag => {
                temporaereEintraegeX.push(taeglicherEintrag.erstellungszeitalsString)
                temporaereEintraegeY.push(taeglicherEintrag.aktiv)
            })
            aktualisierteEintraege.push(
                {
                    bezeichnung: balsam.bezeichnung,
                    taeglicheEintraeX: temporaereEintraegeX,
                    taeglicheEintraeY: temporaereEintraegeY
                }
            )
        })
        setBalsamEintraege(aktualisierteEintraege)
        setTimeout(() => setLoadingBalsame(false), 10)
    }


    if (loadingStimmungen) {
        // Solange die Daten nicht in den useState geladen wurden...
        return <div>Lade ... </div>;
    }

    return (
        <div className="Diagrammkomponente Komponente">
            <div className="diagramHeader"></div>
            <div className="diagrammBody">
                    <Diagramm zeitstempel={xAchseStimmungen} stimmungen={yAchseStimmungen}
                              kryptonitDaten={kryptonitEintraege} balsamDaten={balsamEintraege}/>
            </div>
        </div>
    );
}

export default Diagrammkomponente;