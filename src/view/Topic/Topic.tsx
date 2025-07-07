import React, {useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainHeader from "../Common/MainHeader";
import ProfileHeader from "../Common/ProfileHeader";
import { AdventureModel, TopicModel } from "../../interfaces/adventures";
import "../../css/topic/topic.css";

// @ts-ignore
import question_image from "../../img/question.png";
import CommonButton from "../Common/CommonButton";
import BookButton from "../Common/BookButton";
import {CloseQuestionComponent, ImageQuestionComponent} from "./QuestionTypes";
import {TestQuestionComponent} from "./QuestionTypes";
const AdventurePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [adventures, setAdventures] = useState<AdventureModel[]>([]);
    const [selectedAdventure, setSelectedAdventure] = useState<AdventureModel | null>(null);
    const [selectedTopicName, setSelectedTopicName] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<TopicModel | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [overlayActive, setOverlayActive] = useState(false);
    const [leftContent, setLeftContent] = useState<JSX.Element | null>(null);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [answers, setAnswers] = useState<string[]>([]); // Массив для ответов
    const answersRef = useRef(answers);

    const queryParams = new URLSearchParams(location.search);
    const adventureId = queryParams.get("adventure_id");
    const topicId = queryParams.get("topic_id");

    const handleAnswerChange = (index: number, answer: string) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = answer;
            answersRef.current = updatedAnswers;  // Update the ref
            console.log("Updated answers inside setAnswers:", updatedAnswers);
            return updatedAnswers;
        });
    };
    const handleSubmit = () => {
        if (!adventureId || !topicId || !selectedAdventure) return;


        console.log(answersRef.current); // Use ref for the latest answers

        const answerData = { answers: answersRef.current }; // Массив ответов

        fetch(`http://localhost:8000/adventures/${adventureId}/finish`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Отправка куков
            body: JSON.stringify(answerData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.total_score !== undefined) {
                    alert(`Тема завершена! Баллы: ${data.total_score}, Новый рейтинг: ${data.new_rating}`);
                    navigate(-1);
                } else {
                    alert("Ошибка при получении данных о результате.");
                }
            })
            .catch(error => {
                console.error('Ошибка отправки данных:', error);
                alert("Ошибка при отправке данных");
            });
    };

    useEffect(() => {
        if (selectedAdventure) {
            const currentTopic = selectedAdventure.topics.find(
                (topic: TopicModel) => topic.id === Number(topicId)
            );
            if (currentTopic) {
                const questions = currentTopic.questions;
                // Инициализация answers пустыми строками
                setAnswers(new Array(questions.length).fill(''));
                answersRef.current = new Array(questions.length).fill('');  // Update the ref

            }
        }
    }, [selectedAdventure, topicId])
    useEffect(() => {
        if (adventureId && topicId) {
            fetch('http://localhost:8000/adventures/')
                .then(response => response.json())
                .then((data: AdventureModel[]) => {
                    setAdventures(data);
                    const foundAdventure = data.find(adventure => adventure.id === Number(adventureId));
                    if (foundAdventure) {
                        setSelectedAdventure(foundAdventure);
                        const foundTopic = foundAdventure.topics.find((topic: TopicModel) => topic.id === Number(topicId));
                        if (foundTopic) {
                            setSelectedTopicName(foundTopic.topic_name);
                            setSelectedTopic(foundTopic);
                        }
                    }
                })
                .catch(error => {
                    setError("Ошибка загрузки приключений");
                    console.error('Error fetching adventures:', error);
                });
        }
    }, [adventureId, topicId]);
    useEffect(() => {
        console.log("Updated answers:", answers);
    }, [answers]);

    useEffect(() => {
        if (selectedAdventure) {
            const currentTopic = selectedAdventure.topics.find(
                (topic: TopicModel) => topic.id === Number(topicId)
            );
            if (currentTopic) {
                const questions = currentTopic.questions;
                // Инициализация answers пустыми строками
                setAnswers(new Array(questions.length).fill(''));
            }
        }
    }, [selectedAdventure, topicId]);

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
        switch (buttonType) {
            case "История":
                if (selectedAdventure) {
                    setLeftContent(<p className={"adventure-text"}>{selectedTopic?.topic_text}</p>); // Замените на нужный текст истории
                }
                break;
            case "Теория":
                if (selectedAdventure) {

                    const theoryId = selectedAdventure.topics.find((topic: TopicModel) => topic.id === Number(topicId))?.theory_id;

                    // eslint-disable-next-line eqeqeq
                    if (theoryId!=undefined) {
                        console.log(theoryId);

                        fetch(`http://localhost:8000/api/files/pdf/${theoryId}`)
                            .then(response => {
                                const contentDisposition = response.headers.get('Content-Disposition');
                                let filename = "default.pdf"; // Имя по умолчанию


                                if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
                                    const matches = /filename="([^"]*)"/.exec(contentDisposition);
                                    if (matches && matches[1]) {
                                        filename = matches[1];
                                    }
                                }

                                // Загружаем файл как blob
                                return response.blob().then(blob => ({ filename, blob }));
                            })
                            .then(({ filename, blob }) => {
                                const url = URL.createObjectURL(blob);
                                setLeftContent(
                                    <div className="pdf-container">
                                        <embed src={url} type="application/pdf" width="100%" height="500px" />

                                    </div>
                                );
                            })
                            .catch(error => {
                                console.error('Ошибка загрузки PDF:', error);
                                setLeftContent(<div>Ошибка загрузки PDF.</div>);
                            });
                    }
                }
                break;
            case "Видео":
                if (selectedAdventure) {
                    const videoId = selectedAdventure.topics.find((topic: TopicModel) => topic.id === Number(topicId))?.video_id;
                    if (videoId) {
                        const videoUrl = `http://localhost:8000/api/files/stream/${videoId}`;

                        // Fetch the video normally (you may need to adjust for range requests based on your use case)
                        fetch(videoUrl)

                        setLeftContent(
                            <video className="video-content" width="100%" height="500" controls>
                                <source src={videoUrl} type="video/mp4" />
                                Ваш браузер не поддерживает видео.
                            </video>
                        );


                    }
                }
                break;

            case "Тест":
                if (selectedAdventure) {
                    const currentTopic = selectedAdventure.topics.find(
                        (topic: TopicModel) => topic.id === Number(topicId)
                    );
                    if (currentTopic) {
                        const questions = currentTopic.questions;
                        setLeftContent(
                            <div className="questions-container">
                                {questions.map((question, index) => {
                                    switch (question.question_type) {
                                        case "CloseQuestion":
                                            return (
                                                <CloseQuestionComponent
                                                    key={question.question_text}
                                                    question={question}
                                                    onAnswerChange={(answer: string) => handleAnswerChange(index, answer)}
                                                />
                                            );
                                        case "TestQuestion":
                                            return (
                                                <TestQuestionComponent
                                                    key={question.question_text}
                                                    question={question}
                                                    onAnswerChange={(answer: string) => handleAnswerChange(index, answer)}
                                                />
                                            );
                                        case "RatioQuestion":
                                            return (
                                                <ImageQuestionComponent
                                                    key={question.question_text}
                                                    question={question}
                                                    onAnswerChange={(answer: string) => handleAnswerChange(index, answer)}
                                                />
                                            );

                                        default:
                                            return (
                                                <div key={question.question_text}>
                                                    <p>Неизвестный тип вопроса: {question.question_type}</p>
                                                </div>
                                            );
                                    }
                                })}
                                <div className="finish-button">
                                    <BookButton text="Сдать" isGreen={true} onClick={handleSubmit} />
                                </div>
                            </div>
                        );
                    }
                }
                break;
            default:
                break;
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!selectedAdventure || !selectedTopicName) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <MainHeader />
            <ProfileHeader />
            <div className={`overlay-dark-large ${overlayActive ? "active" : ""}`}></div>
            <div className="topic-book">
                <div className="left-page-book">
                    {leftContent}
                </div>
                <div className={"right-page-book"}>
                    <h2>{selectedTopicName}</h2>
                    <BookButton text="История" isActive={activeButton === "История"} onClick={() => handleButtonClick("История")} />
                    <BookButton text="Теория" isActive={activeButton === "Теория"} onClick={() => handleButtonClick("Теория")} />
                    <BookButton text="Видео" isActive={activeButton === "Видео"} onClick={() => handleButtonClick("Видео")} />
                    <BookButton text="Тест" isActive={activeButton === "Тест"} onClick={() => handleButtonClick("Тест")} />
                    <div className="back-button">
                        <BookButton text="Назад" isActive={true} onClick={() => navigate(-1)} />
                    </div>
                </div>
            </div>
        </>
    );
};


export default AdventurePage;
