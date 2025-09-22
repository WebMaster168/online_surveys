import React from 'react';
import '../question.scss';
import OptionSeveralField from './optionSeveralField';

const SeveralField = ({options,exist,handleRemoveOption, handleChangeQuestionOption, optionsLength, questionIndex}) => {
    

    return (
        
            <div className='question__optionsField'>
                {options.map((option, index)=>(
                    <OptionSeveralField optionsLength={optionsLength} 
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

export default SeveralField;
