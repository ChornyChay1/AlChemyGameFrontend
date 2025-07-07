import React, { useState } from "react";
import MainHeader from "../Common/MainHeader";
import "../../css/registration-enter/registration-enter.css";
// @ts-ignore
import robert_image from "../../img/robert.png";
import { useNavigate } from "react-router-dom";
import BookButton from "../Common/BookButton";

const Registration = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleGoClick = async () => {

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            // Запрос на регистрацию
            const registerResponse = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
                credentials: "include",

            });

            if (!registerResponse.ok) {
                const errorData = await registerResponse.json();
                setError(errorData.detail || "Произошла ошибка при регистрации");
                return;
            }


            const loginResponse = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
                credentials: "include",

            });

            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                setError(errorData.detail || "Ошибка при входе");
                return;
            }


            const cookies = document.cookie.split(';');
            const isTokenPresent = cookies.some(cookie => cookie.trim().startsWith('access_token='));
            if (isTokenPresent) {
                console.log("access_token найден в cookies");
                console.log(document.cookie);

                navigate("/history");
            } else {
                console.error("Токен не установлен в cookies");
            }
        } catch (error) {
            setError("Произошла ошибка при подключении к серверу");
        }
    };



    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.length <= 12) {
            setUsername(input);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.length <= 12) {
            setPassword(input);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.length <= 12) {
            setConfirmPassword(input);
        }
    };

    return (
        <>
            <MainHeader />
            <div className="overlay-dark"></div>
            <div className="book-container">
                <div className="left-page">
                    <p className="characterName">{username || "ИМЯ"}</p>
                    <img width={300} className="robert-image" src={robert_image} alt="robert"/>
                </div>
                <div className="right-page">
                    <div className="label">
                        <p>РЕГИСТРАЦИЯ</p>
                        <p>Ваш путь в химии начинается здесь</p>
                    </div>
                    <form autoComplete={"off"} className="registration-form">
                        <label>
                            Ваше имя
                            <input
                                autoComplete={"off"}
                                type="text"
                                name="username"
                                placeholder="Введите ваше имя"
                                value={username}
                                onChange={handleUsernameChange}
                                maxLength={20}
                                required
                            />
                        </label>
                        <label>
                            Пароль
                            <input
                                autoComplete={"off"}
                                type="password"
                                name="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={handlePasswordChange}
                                maxLength={20}
                                required
                            />
                        </label>
                        <label>
                            Повторите пароль
                            <input
                                autoComplete={""}

                                type="password"
                                name="confirmPassword"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                maxLength={20}
                                required
                            />
                        </label>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                    <div className="buttons-row">
                        <a href={"/enter"}>Вход</a>
                        <BookButton text={"Далее"} onClick={handleGoClick}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
