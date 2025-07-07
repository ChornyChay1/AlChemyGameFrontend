import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Cookies from 'js-cookie';

// @ts-ignore
import logo_image from "../../img/logo.svg";
import "../../css/common/common-profile-header.css";
import CommonButton from "./CommonButton";
import ProfileButton from "./ProfileButton";

function MainHeader() {
    const navigate = useNavigate();
    const navigationRef = useRef<HTMLDivElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleImageClick = (route: string) => {
        navigate(route);
    };

    const handleProfileClick = () => {
          navigate('/profile');
    };
    const handleHistoryClick = () => {
        navigate('/progress');
    };
    const handleProgressClick = () => {
        navigate('/rating');
    };


    const renderNavigationItems = () => (
        <div className="navigation-profile-row">
            <ProfileButton text={"Профиль"} onClick={handleProfileClick} />
            <ProfileButton text={"Прогресс"} onClick={handleHistoryClick} />
            <ProfileButton text={"Рейтинг"} onClick={handleProgressClick} />
        </div>
    );

    return (
        <div ref={navigationRef} className="navigation">
            {isLoggedIn ? renderNavigationItems() : (
                <div className="navigation-login">

                </div>
            )}
        </div>
    );
}

export default MainHeader;
