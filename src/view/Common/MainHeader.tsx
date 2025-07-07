import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Cookies from 'js-cookie';

// @ts-ignore
import logo_image from "../../img/logo.svg";
import "../../css/common/common-header.css"; 

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

    const handleLogout = () => {
        Cookies.remove('access_token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLoginClick = () => {
        navigate('/enter');
    };

    const renderNavigationItems = () => (
        <>
            <div className="navigation-row">
                <img src={logo_image} alt="logo" onClick={() => handleImageClick('/')} />
                <a href={'/'}>История</a>
                <a href={'/theory'}>Теория</a>
            </div>
            <div className="navigation-exit">

                {isLoggedIn ? (
                    <button onClick={handleLogout}>Выйти</button>
                ) : (
                    <button onClick={handleLoginClick}>Войти</button>
                )}
            </div>
        </>
    );

    return (
        <div ref={navigationRef} className="navigation">
            {renderNavigationItems()}
        </div>
    );
}

export default MainHeader;
