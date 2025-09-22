import React, { useState} from 'react';
import './question.scss';
import Option from './TypesQuestion/option';
import SelectType from './selectType';
import OneFromField from './TypesQuestion/OneFromField';
import OpenQuestion from './TypesQuestion/OpenQuestion';
import QuantitativeField from './TypesQuestion/QuantitativeField';
import SeveralField from './TypesQuestion/SeveralField';
import RankField from './TypesQuestion/RankField';

const Question = ({loading, updateCheckboxRequired, chooseType, exist, typeQuestion, quantityQuestions, questionTitle, options, deletingQuestion, handleAddOption, handleRemoveOption, handleChangeQuestionTitle, questionIndex, handleChangeQuestionOption}) => {
    let optionsLength = options.length
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        updateCheckboxRequired(questionIndex, checked); // передаём индекс и значение
    };
    return (
        <div className='question'>
            <div className='question__inputTitle'>
                <div className='question__inputTitleWrapper'>
                    <li className='question__inputTitle-index'>{questionIndex+1}.</li>
                    <li className={`question__inputTitle-field ${quantityQuestions === 1 ? 'question__inputTitle-field--width67':''}`}><input type="text" placeholder={questionTitle} onChange={(e) => handleChangeQuestionTitle(questionIndex, e.target.value)}/></li>
                </div>
                {quantityQuestions !== 1 ? <button onClick={()=>deletingQuestion(questionIndex)} className='question__deleteBTN'>Удалить вопрос</button> : null}
                <SelectType exist={exist} typeQuestion={typeQuestion} chooseType={chooseType} questionIndex={questionIndex}/>     
                
            </div>
            
            <div className='question__optionsField'>
                
                
                {
                    typeQuestion === 'short_answer' && <OpenQuestion/> 
                }
                {
                    typeQuestion === 'quantitative_field' && <QuantitativeField/> 
                }
                {
                    typeQuestion === 'one_from_the_list' && <OneFromField
                        options={options}
                        handleRemoveOption = {handleRemoveOption}
                        handleChangeQuestionOption={handleChangeQuestionOption}
                        optionsLength={optionsLength}
                        questionIndex={questionIndex}
                        exist={exist}
                    /> 
                }
                {
                    typeQuestion === 'several_from_the_list' && <SeveralField
                        options={options}
                        handleRemoveOption = {handleRemoveOption}
                        handleChangeQuestionOption={handleChangeQuestionOption}
                        optionsLength={optionsLength}
                        questionIndex={questionIndex}
                        exist={exist}
                    /> 
                }
                {
                    typeQuestion === 'rank_list' && <RankField
                        options={options}
                        handleRemoveOption = {handleRemoveOption}
                        handleChangeQuestionOption={handleChangeQuestionOption}
                        optionsLength={optionsLength}
                        questionIndex={questionIndex}
                        exist={exist}
                    /> 
                }
                
            </div>
            {
                typeQuestion != 'short_answer' && typeQuestion != 'quantitative_field' &&
                
                <button type="button" className='question__button' onClick={() => handleAddOption()}>
                    Добавить вариант ответа
                </button>
            }
            <div className="checkbox-option question__required" key={questionIndex}>
                <input
                    type="checkbox"
                    className="checkbox"
                    id={questionIndex}
                    
                    //value={item.text.text}
                    checked={isChecked}
                    onChange={(e)=>handleCheckboxChange(e)}
                    
                />
                <label for={questionIndex} className='required__text'>Обязательный вопрос</label>
            </div>
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