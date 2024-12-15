import React from 'react';
import './question.scss';
import Option from './option';
import SelectType from './selectType';

const Question = ({questionTitle, options, handleAddOption, handleRemoveOption, handleChangeQuestionTitle, questionIndex, handleChangeQuestionOption}) => {
    let optionsLength = options.length

    return (
        <div className='question'>
            <div className='question__inputTitle'>
                <div className='question__inputTitleWrapper'>
                    <li className='question__inputTitle-index'>{questionIndex+1}.</li>
                    <li className='question__inputTitle-field'><input type="text" placeholder={questionTitle} onChange={(e) => handleChangeQuestionTitle(questionIndex, e.target.value)}/></li>
                </div>
                
                <SelectType />     
                
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

/** 
 * <p className='question__select'>Раскрывающийся список(по умолчанию)</p>
    <ul className='question__select-popup'>
        <li><button id='value1' data-type="Текст">Текст</button></li>
        <li><button id='value2' data-type="Один из списка">Один из списка</button></li>
        <li><button id='value3' data-type="Несколько из списка">Несколько из списка</button></li>
        <li><button id='value4' data-type="Раскрывающийся список">Раскрывающийся список</button></li>
    </ul>
 * **/