import React from 'react';
import './question.css';
import Option from './option';

const Question = ({questionTitle, options, handleAddOption, handleRemoveOption, handleChangeQuestionTitle, questionIndex, handleChangeQuestionOption}) => {
    let optionsLength = options.length

    return (
        <div className='question'>
            <div className='question__inputTitle'>
                <input type="text" placeholder={questionTitle} onChange={(e) => handleChangeQuestionTitle(questionIndex, e.target.value)}/>
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
                
                
                <button type="button" className='question__button' onClick={() => handleAddOption()}>
                    Добавить вариант ответа
                </button>
                
            </div>
        </div>
    )
}

export default Question;