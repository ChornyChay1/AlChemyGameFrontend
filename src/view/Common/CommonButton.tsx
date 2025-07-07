import React from "react";
import "../../css/common/common-button.css";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    isGreen?: boolean;
};

const CommonButton: React.FC<ButtonProps> = ({ text, onClick, isGreen }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className={`button ${isGreen ? "green" : ""}`} // Добавляем класс для зеленой кнопки, если isGreen true
            onClick={handleClick}
        >
            {text}
        </div>
    );
};

export default CommonButton;
