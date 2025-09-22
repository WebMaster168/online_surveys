import React, {useState} from 'react'

const OpenAnswer = ({ questionId, answers, updateAnswer, questionText }) => {
    const currentAnswer = answers.answersOnQuestions.find(a => a.questionId === questionId)?.value || '';
  
    return (
        <div className='question__option-field'>
            <input 
                type="text" 
                placeholder='Введите ответ'
                value={currentAnswer}
                onChange={(e) => updateAnswer(questionId, e.target.value, questionText)}
            />
        </div>
    );
};

export default OpenAnswer;