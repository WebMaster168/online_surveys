import React from 'react';
import check from '../../../../assets/images/check.png';
import edit from '../../../../assets/images/edit.png';
import './descriptionField.css'

const DescriptionField = ({survey, descriptionEdit, textareaValue, handleChange, handleSubmit, height, handleScroll}) => {
    
    return (
        <form className="description__title" onSubmit={(e)=>handleSubmit(e)}>
            {
                descriptionEdit
                ? 
                <textarea
                    style={{ height, transition: 'height 0.4s ease' }}
                
                    className="description__input" 
                    value={textareaValue} 
                    onChange={(e)=>handleChange(e)}
                    onScroll={(e)=>handleScroll(e)}
                />
                : 
                <div className='description__label'>
                    {survey.description}
                </div>
            }
            
            <button className="description__setValueTitle" type='submit'>
                {
                    descriptionEdit ? <img src={check} alt='check'/> : <img src={edit} alt='edit'/>
                }

            </button>
            
        </form>
        
    )
   
}

export default DescriptionField