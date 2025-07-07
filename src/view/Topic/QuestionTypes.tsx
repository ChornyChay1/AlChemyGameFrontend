import React, {useEffect, useState} from "react";

const CloseQuestionComponent = ({
                                    question,
                                    onAnswerChange,
                                }: {
    question: any;
    onAnswerChange: (answer: string) => void;
}) => {
    return (
        <div className="question">
            <p>{question.question_text}</p>
            <input
                type="text"
                placeholder="Ответ"
                onChange={(e) => onAnswerChange(e.target.value)}
            />
        </div>
    );
};



const TestQuestionComponent = ({
                                   question,
                                   onAnswerChange,
                               }: {
    question: { question_text: string; answers: string[] | undefined };
    onAnswerChange: (answerIndex: string) => void; // Обновлено на строку
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleAnswerChange = (index: number) => {
        const indexAsString = index.toString(); // Преобразуем индекс в строку
        setSelectedAnswer(index);
        onAnswerChange(indexAsString); // Передача индекса как строки
    };

    return (
        <div className="question">
            <p>{question.question_text}</p>
            <div className="answers">
                {/* Проверка на наличие массива answers */}
                {question.answers && question.answers.length > 0 ? (
                    question.answers.map((answer, index) => (
                        <div key={index} className="answer-option">
                            <input
                                type="radio"
                                id={`answer-${index}`}
                                name="test-question"
                                value={index}
                                checked={selectedAnswer === index}
                                onChange={() => handleAnswerChange(index)}
                            />
                            <label htmlFor={`answer-${index}`}>{answer}</label>
                        </div>
                    ))
                ) : (
                    <p>Нет доступных вариантов ответа</p>
                )}
            </div>
        </div>
    );
};
const ImageQuestionComponent = ({
                                    question,
                                    onAnswerChange,
                                }: {
    question: any;
    onAnswerChange: (answer: string) => void;
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        // Выполняем запрос только если formula_id задан
        if (question.formula_id) {
            const fetchImage = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/files/${question.formula_id}`);
                    if (!response.ok) {
                        throw new Error("Ошибка при загрузке изображения");
                    }
                    const blob = await response.blob(); // Получаем бинарные данные
                    const imageUrl = URL.createObjectURL(blob); // Создаем объектный URL
                    setImageSrc(imageUrl); // Устанавливаем URL изображения                    setImageSrc(data); // Устанавливаем URL изображения
                } catch (error) {
                    console.error("Ошибка загрузки изображения:", error);
                }
            };
            fetchImage();
        }
    }, [question.formula_id]);

    return (
        <div className="question">
            <p>{question.question_text}</p>
            {imageSrc && <img src={imageSrc} height={150} alt="Изображение вопроса" />} {/* Отображаем изображение */}
            <input
                type="text"
                placeholder="Ответ"
                onChange={(e) => onAnswerChange(e.target.value)}
            />
        </div>
    );
};




export { CloseQuestionComponent, TestQuestionComponent,ImageQuestionComponent };
