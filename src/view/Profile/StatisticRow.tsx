import React from "react";

interface ImageTextProps {
    imageSrc: string;
    text: string;
}

const ImageText: React.FC<ImageTextProps> = ({ imageSrc, text }) => {
    return (
        <div className="statistic-row">
            <img src={imageSrc} alt="icon" height={30} width={25} style={{ marginRight: "10px" }} />
            <span>{text}</span>
        </div>
    );
};

export default ImageText;
