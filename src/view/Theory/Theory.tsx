import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../Common/MainHeader";
import ProfileHeader from "../Common/ProfileHeader";
import { AdventureModel, TopicModel } from "../../interfaces/adventures"; // Импорт интерфейсов
import "../../css/theory/theory.css";
import BookButton from "../Common/BookButton";

const AdventurePage = () => {
    const navigate = useNavigate();
    const [adventures, setAdventures] = useState<AdventureModel[]>([]);
    const [selectedAdventure, setSelectedAdventure] = useState<AdventureModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const response = await fetch("http://localhost:8000/adventures/");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data: AdventureModel[] = await response.json();
                setAdventures(data);
            } catch (err) {
                setError("Failed to load adventures.");
            }
        };

        fetchAdventures();
    }, []);
    // Функция для скачивания файла по его ID
    const handleDownloadClick = async (fileId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/api/files/${fileId}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to download file with status ${response.status}`);
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `file_${fileId}.pdf`; // Измените расширение, если нужно
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Download failed", error);
        }
    };
    const handleAdventureClick = (adventure: AdventureModel) => {
        setSelectedAdventure(adventure);
    };

    return (
        <>
            <MainHeader />
            <ProfileHeader />
            <div className="overlay-dark"></div>
            <div className="book-container-theory">
                <div className="left-page-theory">
                    <h2>Adventures</h2>
                    <div className="topic-items">
                    {error ? (
                        <div>{error}</div>

                    ) : (
                        adventures.map((adventure) => (
                            <div
                                key={adventure.id}
                                className="adventure-item"
                                onClick={() => handleAdventureClick(adventure)}
                                style={{ color: selectedAdventure?.id === adventure.id ? "white" : "var(--accent-color)" }}
                            >
                                <h4>{adventure.name}</h4>
                            </div>
                        ))
                    )}
                    </div>
                </div>
                <div className="right-page-theory">
                    {selectedAdventure ? (
                        <div className="adventure-detail">
                            <h2>{selectedAdventure.name}</h2>
                            <div className="topic-items">
                            {selectedAdventure.topics.map((topic: TopicModel) => (
                                <div key={topic.id} className="topic-item">
                                    <h4>{topic.topic_name}</h4>
                                    <BookButton
                                        text={"Скачать"}
                                        onClick={() => handleDownloadClick(topic.theory_id)} // Передаем file_id темы
                                    />
                                </div>

                            ))}
                            </div>
                        </div>
                    ) : (
                        <p>Select an adventure to view its topics.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdventurePage;
