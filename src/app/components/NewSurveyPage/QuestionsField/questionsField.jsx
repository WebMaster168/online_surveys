import React from 'react';
import './questionsField.css';
import Question from './Question/question';

const QuestionsField = ({questions, updateCheckboxRequired, exist, chooseType, deletingQuestion, handleAddOption, handleRemoveOption, handleChangeQuestionTitle, handleChangeQuestionOption}) => {
    const quantityQuestions = questions.length;
    return (
        <div className='questionsField'>
            <div className='borderTop borderTop--orange'></div>
            <h1 className='questionsField__title'>Вопросы данной анкеты</h1>
            <div className='questionsField__main'>
            {
                questions.map((questionItem,questionIndex)=>(
                    <Question 
                        updateCheckboxRequired={updateCheckboxRequired}
                        key={questionItem.id} 
                        questionTitle={questionItem.text} 
                        options={questionItem.options} 
                        handleAddOption={()=>handleAddOption(questionIndex)} 
                        handleRemoveOption={(optionIndex)=>handleRemoveOption(questionIndex, optionIndex)}
                        handleChangeQuestionTitle={handleChangeQuestionTitle}
                        handleChangeQuestionOption={handleChangeQuestionOption}
                        questionIndex={questionIndex}
                        deletingQuestion={deletingQuestion}
                        quantityQuestions={quantityQuestions}
                        chooseType={chooseType}
                        typeQuestion={questionItem.type}
                        exist={exist}
                        />
                ))
            }
            </div>
        </div>
    )
}

export default QuestionsField;