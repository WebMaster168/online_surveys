import React from 'react';
import './question.scss';


const Option = ({optionTitle, handleRemoveOption, optionsLength, handleChangeQuestionOption, questionIndex,optionIndex}) => {
    return (
        
        <div className='question__option'>
            <li className='question__option-index'>{optionIndex + 1}).</li>
            <li className='question__option-field'><input type="text" placeholder={optionTitle} onChange={(e)=>handleChangeQuestionOption(questionIndex,optionIndex, e.target.value)}/></li>
            <li><span className='question__option-close' onClick={optionsLength > 1 ? handleRemoveOption : null} 
            style={{ cursor: optionsLength > 1 ? 'pointer' : 'not-allowed' }}>+</span></li>
        </div>
        
    )
}

export default Option;