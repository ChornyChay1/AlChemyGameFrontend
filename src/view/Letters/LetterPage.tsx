// @ts-ignore
import React, { useEffect, useState } from "react";
import MainHeader from "../Common/MainHeader";
// @ts-ignore
import  "../../css/help/help-main.css"
// @ts-ignore
import greetingsBook from "../../img/greetings-book.png";
// @ts-ignore
import help_image from "../../img/question.png";

// @ts-ignore
import human from "../../img/human.png";


import CommonButton from "../Common/CommonButton";
import {useNavigate} from "react-router-dom";
function HelpPage() {

    const navigate = useNavigate();
    const handleGoClick = () => {
        navigate("/profile");
    };
    return (
        < >
            <MainHeader/>
            <div className="help-container">
                <div className="letter">
                    <p className="himera-letter"> Юнец!<br/><br/>
                        я вижу в тебе талант, достойный великой алхимии.
                        Приглашаю тебя в Академию, где ты откроешь секреты элементов и научишься искусству превращений.
                        Отныне твоя судьба — в твоих руках.
                        Присоединишься ли ты к нам?<br/><br/>
                        Мастер Химера

                    </p>
                </div>
                <CommonButton text={"УРА!"} onClick={handleGoClick}/>
            </div>

        </>
    );
}

export default HelpPage;
