import React, { useEffect, useState } from "react";
import MainHeader from "../Common/MainHeader";
import "../../css/rating/rating.css";
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
import ImageText from "../Profile/StatisticRow";
import ProfileHeader from "../Common/ProfileHeader";
import CharacterRow from "./CharacterRow";


interface Player {
    username: string;
    rating: number;
    characterImage: string;
}

const Rating = () => {
    const [error, setError] = useState<string | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);

    // Получаем список игроков с /rating
    useEffect(() => {
        fetch("http://localhost:8000/rating", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Не удалось загрузить список игроков");
                }

                return response.json();
            })
            .then((data: UserGet[]) => {
                // Отбираем только 10 лучших игроков
                console.log(data);
                const topPlayers = data.slice(0, 5).map((user) => ({
                    username: user.username,
                    rating: user.rating,
                    characterImage: character_image,
                }));
                // @ts-ignore
                setPlayers(topPlayers);
            })
            .catch((error) => {
                console.error("Error fetching players:", error);
                setError("Не удалось загрузить список игроков");
            });
    }, []);

    return (
        <>
            <MainHeader />
            <ProfileHeader />

            <div className="profile-container">
                <div className="left-side-rating">
                    <CharacterRow username={players[0]?.username || "1"} rating={players[0]?.rating || 0} characterImage={character_image} />
                    <CharacterRow username={players[1]?.username || "1"} rating={players[1]?.rating || 0} characterImage={character_image} />
                    <CharacterRow username={players[2]?.username || "1"} rating={players[2]?.rating || 0} characterImage={character_image} />

                </div>
                <div className="right-side-rating">
                    <div className="top-container">
                        <p>ТОП 5</p>

                        {players.map((player, index) => (
                            <div key={index} className="character-row">
                                <div className="rating-collumn-right">
                                    <p>{player.username} : </p>
                                    <p>{ player.rating}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rating;
