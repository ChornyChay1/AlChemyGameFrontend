// @ts-ignore
import React, { useEffect, useState } from "react";
import MainHeader from "../Common/MainHeader";
// @ts-ignore
import  "../../css/help/help-main.css"
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
                    <p className="himera-letter"> Мой ученик,<br/><br/>
                        Ты успешно прошёл мой экзамен.
                        Я надеюсь что тяга к химии в тебе не угаснет и ты стенешь великим магом
                        Не забывай, заходить ко мне, быть может у меня будет для тебя ещё приключения!
                        <br/><br/>
                        Мастер Химера

                    </p>
                </div>
                <CommonButton text={"УРА!"} onClick={handleGoClick}/>
            </div>

        </>
    );
}

export default HelpPage;
