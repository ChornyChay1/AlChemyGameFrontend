import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainHeader from "../Common/MainHeader";
import ProfileHeader from "../Common/ProfileHeader";
import { AdventureModel, UserAdventureModel } from "../../interfaces/adventures";
import "../../css/adventure/adventure.css";

// @ts-ignore
import question_image from "../../img/question.png"
import CommonButton from "../Common/CommonButton";

const AdventurePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [adventures, setAdventures] = useState<AdventureModel[]>([]);
    const [selectedAdventure, setSelectedAdventure] = useState<AdventureModel | null>(null);
    const [userAdventure, setUserAdventure] = useState<UserAdventureModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Получаем adventureId из query-параметров
    const adventureId = new URLSearchParams(location.search).get("adventureId");
    const [overlayActive, setOverlayActive] = useState(false);

    useEffect(() => {
        const fetchUserAdventure = async () => {
            if (!adventureId) return; // Проверяем, что adventureId присутствует
            try {
                const response = await fetch(`http://localhost:8000/change_adventure/${adventureId}`, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                    },
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data: UserAdventureModel = await response.json();
                if (data.current_topic_index === 0) {
                    navigate(`/adventure/done`);
                }
                setUserAdventure(data);
            } catch (err) {
                setError("Failed to load user adventure.");
            }
        };

        const fetchAdventures = async () => {
            try {
                const response = await fetch("http://localhost:8000/adventures/");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data: AdventureModel[] = await response.json();
                setAdventures(data);
                const selected = data.find(adventure => adventure.id === parseInt(adventureId || ""));
                console.log(selected);
                setSelectedAdventure(selected || null);
            } catch (err) {
                setError("Failed to load adventures.");
            }
        };

        fetchUserAdventure();
        fetchAdventures();
    }, [adventureId]);

    const renderTopicImage = () => {
        if (selectedAdventure && userAdventure) {
             const filteredTopics = selectedAdventure.topics.filter(topic => topic.id === userAdventure.current_topic_index);
            const currentTopic = filteredTopics[0];

            if (currentTopic) {
                return (
                    <img
                        src={question_image}
                        alt={currentTopic.topic_name}
                        className="pulsing-image"
                        onClick={()=>{
                            handleImageClick(currentTopic.id);
                        }}
                        style={{
                            position: "absolute",
                            left: `${currentTopic.x}px`,
                            top: `${currentTopic.y}px`,
                            width: 30,
                            height: 30
                        }}
                    />
                );
            }
        }
        return null;
    };
    const handleImageClick = (topicId: number) => {
        // Включаем анимацию затемнения
        setOverlayActive(true);

        setTimeout(() => {
            navigate(`/adventure/topic/?adventure_id=${adventureId}&topic_id=${topicId}`);
        }, 1000);
    };
    return (
        <>
            <MainHeader />
            <ProfileHeader />
            <div className={`overlay-dark-large ${overlayActive ? "active" : ""}`}></div> {/* Активация затемнения */}
            <div className="overlay-dark-large"></div>
            <div className="map">
                {renderTopicImage()}
            </div>



        </>
    );
};

export default AdventurePage;
