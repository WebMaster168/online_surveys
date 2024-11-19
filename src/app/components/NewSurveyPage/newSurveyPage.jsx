import React from 'react';

import './newSurveyPage.css'
import DescriptionField from './DescriptionField/DescriptionField';
import TitleInput from './TitleField/TitleField';

const NewSurveyPage = () => {
    
    const [survey, setSurvey] = React.useState({
        id:1,
        name: "Новая анкета",
        description: `Описание`,
        questions: [],
      });
    const [nameEdit, setNameEdit] = React.useState(false)
    const [nameSurvey, setNameSurvey] = React.useState(survey.name)

    const handleNameChange = (e) => {
        setNameSurvey(e.target.value);
    }
    const handleSetNameState = () => {
        if(nameEdit){
            setNameEdit(!nameEdit)
            setSurvey({...survey, name: nameSurvey})
            return
        } else{
            setNameEdit(!nameEdit)
            return
        }
        
        
    }

    const [descriptionEdit, setDescriptionEdit] = React.useState(false)
    const [textareaValue, setTextareaValue] = React.useState(survey.description)

    const [height, setHeight] = React.useState("26px");
    
    const handleChange = (e) => {
        setTextareaValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if(descriptionEdit){
            setDescriptionEdit(!descriptionEdit)
            setSurvey({...survey, description: textareaValue})
            return
        } else{
            setDescriptionEdit(!descriptionEdit)
            return
        }
        
    }

    const handleScroll = (e) => {
        
        const { scrollHeight, clientHeight } = e.target;
        if (scrollHeight > clientHeight) {
            
                setHeight(`${scrollHeight}px`);
            
        }
      };
    
      
    return ( 
      <div className='container'>
        <div className='createSurvey__inner'>
            <div className='createSurvey__borderTop'></div>
            <div className="createSurvey__descriptionBlock">
               <div className='createSurvey__borderLeft'></div>
                <TitleInput 
                    nameEdit={nameEdit}
                    nameSurvey={nameSurvey}
                    handleNameChange={handleNameChange}
                    handleSetNameState={handleSetNameState}
                    survey={survey}
                />
                
                <DescriptionField
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit}
                    textareaValue={textareaValue}
                    height={ height }
                    handleScroll={handleScroll}
                    descriptionEdit={descriptionEdit}
                    survey={survey}
                />
            </div>
            
        </div>
      </div>
    );
}

export default NewSurveyPage;
/*
<DescriptionField
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit}
                    textareaValue={textareaValue}
                    height={ height }
                    handleScroll={handleScroll}
                    descriptionEdit={descriptionEdit}
                    survey={survey}
                />
<TitleInput 
                    nameEdit={nameEdit}
                    nameSurvey={nameSurvey}
                    handleNameChange={handleNameChange}
                    handleSetNameState={handleSetNameState}
                    survey={survey}
                />

                */