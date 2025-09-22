import React from 'react'
import Question from './Question/Question'

export default function ViewQuestionField({questions, handleRadioChange, updateRankAnswer, answers, updateAnswer, addInStateOfNumber, numberChange, enterNumber, updateCheckboxAnswer, loading}) {
    
    return (
    <div className='questionsField'>
        <div className='borderTop borderTop--orange'></div>
        <h1 className='questionsField__title'>Вопросы данной анкеты</h1>
        <div className='questionsField__main'>
        {
            !loading &&
            questions.map((item, i)=>(
                
                <Question questionId={i+1} required={item.required} handleRadioChange={handleRadioChange} enterNumber={enterNumber} updateRankAnswer={updateRankAnswer} updateCheckboxAnswer={updateCheckboxAnswer} answers={answers} updateAnswer={updateAnswer} addInStateOfNumber={addInStateOfNumber} numberChange={numberChange} questionText={item.text} questionIndex={i} options={item.options} questionType={item.type}/>
                //<Question />
            ))
        }
        </div>
    </div>
  )
}

//required={item.required}

  