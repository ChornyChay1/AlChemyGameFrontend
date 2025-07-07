import React, {useEffect, useState} from "react";
import MainHeader from "../Common/MainHeader";
import "../../css/profile/profile.css";
// @ts-ignore
import robert_image from "../../img/robert.png";
import { useNavigate } from "react-router-dom";
import BookButton from "../Common/BookButton";
// @ts-ignore
import character_image from "../../img/human.png";
// @ts-ignore
import bluebottle from "../../img/blue_bottle.png"
// @ts-ignore
import redbottle from "../../img/red_bottle.png"

import UserGet from "../../interfaces/userGet";
import ImageText from "./StatisticRow";
import ProfileHeader from "../Common/ProfileHeader";
const Profile = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserGet | null>(null);


    useEffect(() => {
        fetch("http://localhost:8000/me", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Не удалось загрузить данные пользователя");
                }
                return response.json();
            })
            .then((data: UserGet) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setError("Не удалось загрузить данные пользователя");
            });
    }, []);


    return (
        <>
            <MainHeader />
            <ProfileHeader />

            <div className="profile-container">
                <div className="left-side">
                    <div className="rating-collumn">
                        <p>{userData?.username}</p>
                        <p>{"Рейтинг" + userData?.rating}</p>
                    </div>

                    <img src={character_image} width={250} alt="robert" />
                </div>
                <div className="right-side">
                <div className="bottle-container">
                        <ImageText imageSrc={bluebottle} text={"Приключений завершено:" + userData?.completed_adventures_count}/>
                        <ImageText imageSrc={bluebottle} text={"Всего приключений:" + userData?.total_adventures}/>
                        <ImageText imageSrc={bluebottle} text={"Процент прохождения:" + userData?.progress_percentage}/>
                        <ImageText imageSrc={redbottle} text={"Рейтинг:" + userData?.rating}/>


                    </div>

                </div>
            </div>
        </>
    );
};

export default Profile;
