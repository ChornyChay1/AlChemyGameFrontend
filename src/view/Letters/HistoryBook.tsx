import React, { useState } from "react";
import MainHeader from "../Common/MainHeader";
import "../../css/registration-enter/registration-enter.css";
// @ts-ignore
import image_left from "../../img/himera.png";
import { useNavigate } from "react-router-dom";
import BookButton from "../Common/BookButton";

const HistoryBook = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null); // Для отображения ошибки

    const handleGoClick = async () => {
            navigate("/letter");
    };



    return (
        <>
            <MainHeader />
            <div className="overlay-dark"></div>
            <div className="book-container">
                <div className="left-page">
                    <p className="characterName">МАСТЕР ХИМЕРА</p>
                    <img width={300} className="himera-image" src={image_left} alt="robert"/>
                </div>
                <div className="right-page">
                    <div className="label">
                        <p>ВЕЛИКИЙ АЛХИМИК</p>
                        <p>Мастер Химера — легендарный алхимик, чьи открытия изменили жизни многих.
                            Он создал эликсиры, исцеляющие редкие болезни, и формулы, увеличивающие урожайность полей,
                            что спасло целые деревни от голода. Его знание элементов и искусство трансформации сделали
                            его величайшим мастером своего времени.
                            Его имя — символ алхимической мудрости и силы.</p>
                    </div>

                    {error && <div className="error-message">{error}</div>} {/* Отображаем ошибку */}
                    <div className="buttons-row">
                        <div></div>
                        <BookButton text={"Круто!"} onClick={handleGoClick}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryBook;
