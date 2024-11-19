import React from 'react';
import check from '../../../../assets/images/check.png';
import edit from '../../../../assets/images/edit.png';
import './titleField.css'

const TitleInput = ({nameEdit, nameSurvey, handleNameChange, handleSetNameState, survey}) => {
    
    return (
        <div className='createSurvey__title'>
            {
                nameEdit 
                ? <input className="surveyTitle__input" type="text" value={nameSurvey} onChange={handleNameChange}/>
                : <h2 className='surveyTitle__text'>{survey.name}</h2>
            }
            
            <button className='survey__setValueTitle' onClick={()=>handleSetNameState()}>
                {
                    nameEdit ? <img src={check} alt='check'/> : <img src={edit} alt='edit'/>
                }
                
            </button>
        </div>
    )
}

export default TitleInput