import React, { useState } from 'react';
import './Question.scss'
import SeveralOption from './SeveralOption';
import QuantitativeOption from './QuantitativeOption ';
import OpenAnswer from './OpenAnswer';
import RankAnswers from './RankAnswers'
import RadioOption from './RadioOption';

/*
<label className='checkbox' key={item.id}>
    <input type="checkbox" />
    <p className='checkbox__text'>{item.text.text}</p>
</label>
*/
// Компонент для радиокнопки


// Компонент для числового поля

const CheckboxList = ({ options }) => {
    
}


export default function Question({ numberChange,questionId, required, item, handleRadioChange, updateCheckboxAnswer, enterNumber, answers, updateAnswer, questionText, updateRankAnswer, questionIndex, addInStateOfNumber, questionType, options }) {
    const [selectedOption, setSelectedOption] = useState('');

    console.log(item)
    if(questionType === 'quantitative_field' || questionType === 'short_answer'){
        options = []
        options.push("fieldOnes")
    }
    const handleChange = (e, questionId, optionId, value) => {
        setSelectedOption(e.target.value);
        handleRadioChange(questionId, optionId, value, questionText)
    };
    
    return (
        <div className='question'>
            <div className='question__inputTitle'>
                <div className='question__inputTitleWrapper'>
                    <h2>
                        <span className='question__inputTitle-index'>{questionIndex + 1}.</span>
                        {questionText}
                    </h2>
                </div>
            </div>
            
            <div className='question__optionsField question__optionsField--fdColumn'>
                {options.map((item, i) => {
                    if (questionType === 'one_from_the_list') {
                        console.log(i)
                        return <RadioOption questionId={questionId} optionId={i+1} handleRadioChange={handleRadioChange} item={item} selectedOption={selectedOption} handleChange={handleChange} index={i} />;
                    } else if (questionType === 'several_from_the_list') {
                        return <SeveralOption item={item} key={i} index={i+1} questionText = {questionText} answers={answers} questionId={questionId} optionId={i+1} updateCheckboxAnswer={updateCheckboxAnswer}/>;
                    } else if (questionType === 'quantitative_field') {
                      
                        return <QuantitativeOption questionId={questionId} questionText = {questionText} answers={answers} updateAnswer={updateAnswer} numberChange={numberChange} enterNumber={enterNumber}/>;

                    } else if(questionType === 'short_answer'){
                        return <OpenAnswer questionId={questionId} questionText = {questionText} answers={answers} updateAnswer={updateAnswer} numberChange={numberChange}/>
                    } else if(questionType === 'rank_list'){
                        return <RankAnswers item={item} index={i+1} questionText = {questionText} questionId={questionId} answers={answers} updateRankAnswer={updateRankAnswer}/>
                    } else{
                        return null;
                    } // Возврат null, если тип вопроса не совпадает
                })
                
                        
                    
                        
                
                }
                    
            </div>
            
            <div className='required-answer'>
                {required ? `Обязательный вопрос` : ''}
            </div>
        </div>
    );
}

