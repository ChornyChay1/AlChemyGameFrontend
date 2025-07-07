import React from "react";

interface CharacterRowProps {
    username: string;
    rating: number;
    characterImage: string;
}

const CharacterRow: React.FC<CharacterRowProps> = ({ username, rating, characterImage }) => {
    return (
        <div className="character-collumn">
            <div className="rating-collumn">
                <p>{username}</p>
                <p>{"Рейтинг:" + rating}</p>
            </div>

            <img src={characterImage} className="character-image" alt="character" />
        </div>
    );
};

export default CharacterRow;
