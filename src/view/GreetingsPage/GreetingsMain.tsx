// @ts-ignore
import React, { useEffect, useState } from "react";
import MainHeader from "../Common/MainHeader";
// @ts-ignore
import  "../../css/greetings/greetings-main.css"
// @ts-ignore
import greetingsBook from "../../img/greetings-book.png";
// @ts-ignore
import help_image from "../../img/question.png";

// @ts-ignore
import human from "../../img/human.png";


import CommonButton from "../Common/CommonButton";
import {useNavigate} from "react-router-dom";
import ProfileHeader from "../Common/ProfileHeader";
function GreetingsMain() {
    const navigate = useNavigate();
    const handleGoClick = () => {
        navigate("/registration");
    };
    // @ts-ignore
    return (
        <>
            <MainHeader/>
            <ProfileHeader />

            <div className="greetings-container">
                <div className="greetings-collumn">
                    <div>

                        <p>обучающая система</p>
                        <h1>Приключения<br/> Алхимика</h1>
                    </div>

                    <img className="book-image" width={190} src={greetingsBook} alt="book"/>
                    <CommonButton text={"НАЧАТЬ"} onClick={handleGoClick}/>
                </div>
                <div className="human">
                    <img src={human} width={300} alt="human"/>
                </div>

            </div>
            <div className="author">
                <p> prod. by Artem Kovalev</p>
            </div>
            <a href={"/help"} className="help">
                <img src={help_image} width={50} alt="human"/>
            </a>
        </>
    );
}

export default GreetingsMain;
