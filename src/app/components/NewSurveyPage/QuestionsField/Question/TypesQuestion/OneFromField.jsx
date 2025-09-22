import React from 'react';
import '../question.scss';
import Option from './option';

const OneFromField = ({options,exist,handleRemoveOption, handleChangeQuestionOption, optionsLength, questionIndex}) => {
    

    return (
        
            <div className='question__optionsField'>
                {options.map((option, index)=>(
                    <Option optionsLength={optionsLength} 
                            key={option.id} 
                            optionTitle={exist ? option.text.text : option.text} 
                            questionIndex={questionIndex}
                            optionIndex={index}
                            handleRemoveOption = {()=>handleRemoveOption(index)}
                            handleChangeQuestionOption={handleChangeQuestionOption}
                            />
                ))}
            </div>
        
        )
}

export default OneFromField;
