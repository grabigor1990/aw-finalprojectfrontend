import React, {useState} from 'react';
import axios from "axios";

function Smiley(props) {

    function handleClick() {
        axios({
            method: "post",
            url: "http://localhost:8080/stimmung",
            data: {
                rating: props.rating
            },
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <img onClick={() => {handleClick()}} className="smileyIcon" src={props.url} alt=""/>
        </div>
    );
}

export default Smiley;