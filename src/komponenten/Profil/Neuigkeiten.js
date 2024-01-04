import React, {useEffect, useState} from "react";
import NeuigkeitenList from "./NeugkeitenData";
import './Profilkomponente.css';

const Neuigkeiten = () => {
    const [news, setNews] = useState("");
    const getRandom = () => Math.floor(Math.random() * NeuigkeitenList.length);

    useEffect(() => {
        selectNews();
    }, []);

    const selectNews = () => {
        const randomIndex = getRandom();
        setNews(NeuigkeitenList[randomIndex]);
    };
    return (

        <div className={'news-container'}>
            <h2 className={'zitate'}> <em>Zitat:</em></h2> <br/>
            <div className={'news'}>
                <p className={'news-text'}><em>{news}</em></p>
            </div>
        </div>
    )
};

export default Neuigkeiten;