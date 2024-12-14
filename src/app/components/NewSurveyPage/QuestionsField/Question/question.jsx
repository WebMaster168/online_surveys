import React from 'react';
import './question.scss';
import Option from './option';

const Question = ({questionTitle, options, handleAddOption, handleRemoveOption, handleChangeQuestionTitle, questionIndex, handleChangeQuestionOption}) => {
    let optionsLength = options.length

    return (
        <div className='question'>
            <div className='question__inputTitle'>
                <li className='question__inputTitle-index'>{questionIndex+1}.</li>
                <li className='question__inputTitle-field'><input type="text" placeholder={questionTitle} onChange={(e) => handleChangeQuestionTitle(questionIndex, e.target.value)}/></li>
            </div>
            <div className='question__optionsField'>
                {options.map((option, index)=>(
                    <Option optionsLength={optionsLength} 
                            key={option.id} 
                            optionTitle={option.text} 
                            questionIndex={questionIndex}
                            optionIndex={index}
                            handleRemoveOption = {()=>handleRemoveOption(index)}
                            handleChangeQuestionOption={handleChangeQuestionOption}
                            />
                ))}
                
                
                
                
            </div>
            <button type="button" className='question__button' onClick={() => handleAddOption()}>
                Добавить вариант ответа
            </button>
        </div>
    )
}

export default Question;