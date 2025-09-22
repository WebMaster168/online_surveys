import React from 'react';
import '../question.scss';
import OptionRankField from './optionRankField';

const RankField = ({options, exist, handleRemoveOption, handleChangeQuestionOption, optionsLength, questionIndex}) => {
    

    return (
        
            <div className='question__optionsField'>
                {options.map((option, index)=>(
                    <OptionRankField optionsLength={optionsLength} 
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

export default RankField;
