// @ts-ignore
import React, { useEffect, useState } from "react";
import MainHeader from "../Common/MainHeader";
// @ts-ignore
import  "../../css/help/help-main.css"


import CommonButton from "../Common/CommonButton";
import {useNavigate} from "react-router-dom";
import ProfileHeader from "../Common/ProfileHeader";
function HelpPage() {

    const navigate = useNavigate();
    const handleGoClick = () => {
        navigate("/");
    };
    return (
        < >
            <MainHeader/>
            <ProfileHeader />

            <div className="help-container">
                <div className="letter">
                    <p> Пользователь!<br/><br/>

                        Эта площадка создана для обучения химии в игровой форме.<br/><br/>

                        Набирайте рейтинг и станьте самым искусстным алхимиком в этом краю!<br/><br/>
                        <br/><br/>


                    </p>
                </div>
                <CommonButton text={"ВПЕРЁД!"} onClick={handleGoClick}/>
            </div>

        </>
    );
}

export default HelpPage;
