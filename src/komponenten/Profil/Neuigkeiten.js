import React, {useEffect, useState} from "react";
import axios from "axios";

const Neuigkeiten = () => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        axios
            .get("https://newsapi.org/v2/top-headlines?country=de&language=de&apiKey=8993772d15934072bd1c868652c1a191",{
                withCredentials:false,
            })
            .then((response) => {
                const mischen = shuffleArray(response.data.articles);
                if(mischen.length > 0) {
                    setNews(mischen[0]);
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return(
        <div>
            {news &&(
                <div>
                <p>{news.title}</p>
                <p>{news.description}</p>
            </div>
            )}
        </div>
    );
};

export default Neuigkeiten;