import React from 'react';
import './question.css';


const Option = ({optionTitle, handleRemoveOption, optionsLength, handleChangeQuestionOption, questionIndex,optionIndex}) => {
    return (
        
        <div className='question__option'>
            <input type="text" placeholder={optionTitle} onChange={(e)=>handleChangeQuestionOption(questionIndex,optionIndex, e.target.value)}/>
            <span className='question__option-close' onClick={optionsLength > 1 ? handleRemoveOption : null} 
            style={{ cursor: optionsLength > 1 ? 'pointer' : 'not-allowed' }}>+</span>
        </div>
        
    )
}

export default Option;