import React from "react";
import "../../css/common/common-button.css";

type ButtonProps = {
    text: string;
    onClick?: () => void;
};

const ProfileButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="profile-button" onClick={handleClick}>
            {text}
        </div>
    );
}

export default ProfileButton;
