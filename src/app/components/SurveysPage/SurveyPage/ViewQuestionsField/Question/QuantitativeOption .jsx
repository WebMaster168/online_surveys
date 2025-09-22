import React, {useState} from 'react'

const QuantitativeOption = ({ questionId, answers, updateAnswer, questionText }) => {
    const currentAnswer = answers.answersOnQuestions.find(a => a.questionId === questionId)?.value || '';
  
    return (
      <div className='question__option-field'>
        <input
          type="number"
          
          value={currentAnswer}
          onChange={(e) => updateAnswer(questionId, e.target.value, questionText)}
          placeholder="Введите число"
        />
      </div>
    );
};

export default QuantitativeOption;