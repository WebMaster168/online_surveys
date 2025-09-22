import React from 'react';

const RadioOption = ({ item, selectedOption, questionId, handleChange, optionId, index, addInStateOfNumber, handleRadioChange }) => (
    
    
    <div className="radio" key={item.id}>
        <input
            id={item.id}
            type="radio"
            value={`${parseInt(index)+1}. ${item.text}`}
            checked={selectedOption === `${parseInt(index)+1}. ${item.text}`}
            onChange={(e)=>handleChange(e, questionId, optionId, item.text) }
        />
        <label for={item.id} className='radio__text'>{item.text}</label>
    </div>
);

export default RadioOption;