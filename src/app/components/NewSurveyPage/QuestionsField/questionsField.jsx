import React from 'react';
import './questionsField.css';
import Question from './Question/question';

const QuestionsField = ({questions, handleAddOption, handleRemoveOption, handleChangeQuestionTitle, handleChangeQuestionOption}) => {
    return (
        <div className='questionsField'>
            <div className='borderTop'></div>
            <h1 className='questionsField__title'>Вопросы данной анкеты</h1>
            <div className='questionsField__main'>
            {
                questions.map((questionItem,questionIndex)=>(
                    <Question 
                        key={questionItem.id} 
                        questionTitle={questionItem.text} 
                        options={questionItem.options} 
                        handleAddOption={()=>handleAddOption(questionIndex)} 
                        handleRemoveOption={(optionIndex)=>handleRemoveOption(questionIndex, optionIndex)}
                        handleChangeQuestionTitle={handleChangeQuestionTitle}
                        handleChangeQuestionOption={handleChangeQuestionOption}
                        questionIndex={questionIndex}/>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionsField;