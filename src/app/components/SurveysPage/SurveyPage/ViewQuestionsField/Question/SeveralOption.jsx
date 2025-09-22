import React, { useState, useEffect } from 'react';

const SeveralOptions = ({ item, questionId, updateCheckboxAnswer, index, answers, questionText }) => {
    const [isChecked, setIsChecked] = useState(false);
    const number = Math.random();

    // Проверяем, отмечен ли чекбокс при монтировании
    useEffect(() => {
        const existingAnswer = answers.answersOnQuestions
            .find(a => a.questionId === questionId)?.options
            ?.some(opt => opt.id === item.id);

        if (existingAnswer) {
            setIsChecked(true);
        }
    }, [answers, questionId, item.id]);

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        updateCheckboxAnswer(questionId, index, item.text, checked, questionText);
    };

    return (
        <div className="checkbox-option">
            <input
                type="checkbox"
                className="checkbox"
                id={`${index}-${item.text}`}
                name="happy"
                value={item.text}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={`${index}-${item.text}`}>{item.text}</label>
        </div>
    );
};

export default SeveralOptions;