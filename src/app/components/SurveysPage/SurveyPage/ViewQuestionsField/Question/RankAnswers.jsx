import React, {useState} from 'react'

const RankAnswer = ({ questionId, answers, index, item, updateRankAnswer, updatedRankAnswers, questionText }) => {
    const currentAnswer = answers.answersOnQuestions.find(a => a.questionId === questionId && a.optionId === index)?.value || '';
  
    return (
        <div className='rankItem__inner'>
        <div className='rankItem__field rank--prototype'>
            <input type="number" value={currentAnswer} onChange={(e)=>updateRankAnswer(questionId, e.target.value, index, questionText, item.text)}/>
        </div>
        <p>
            {item.text}
        </p>
    </div>
    );
};

export default RankAnswer;