import React, { useState } from "react";
import "../../css/common/common-button.css";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    isGreen?: boolean;
    isActive?: boolean;
};

const CommonButton: React.FC<ButtonProps> = ({ text, onClick, isGreen, isActive }) => {



    // Формируем класс для кнопки с учетом всех состояний
    const buttonClass = `book-button ${isGreen ? "green" : ""} ${isActive ? "active" : ""}`;

    return (
        <div className={buttonClass} onClick={onClick}>
            {text}
        </div>
    );
};

export default CommonButton;
