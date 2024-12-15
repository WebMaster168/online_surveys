import React from 'react';

import './newSurveyPage.css'
import DescriptionField from './DescriptionField/DescriptionField';
import TitleInput from './TitleField/TitleField';
import QuestionsField from './QuestionsField/questionsField';

const NewSurveyPage = () => {
    
    const [survey, setSurvey] = React.useState({
        id:1,
        name: "Новая анкета",
        description: `Описание`,
        questions: [
            {
                id: 1,
                type: "short_answer",
                text: "Введите название вопроса",
                options: [
                    {
                        id: 1,
                        text: "Введите вариант ответа"
                    }
                    
                ]
            }
          
        ],
      });

    
    /** Хранение состояния названия анкеты **/
    const [nameSurvey, setNameSurvey] = React.useState(survey.name) 
    
    /** Хранение состояния редактирования названия анкеты **/
    const [nameEdit, setNameEdit] = React.useState(false)


    /** Хранение состояния описания анкеты **/
    const [textareaValue, setTextareaValue] = React.useState(survey.description)

    /** Хранение состояния редактирования описания анкеты **/
    const [descriptionEdit, setDescriptionEdit] = React.useState(false)
    
    /** Вызов функции handleNameChange считывает значение, введенное в поле "Названия анкеты" 
      * и меняет состояние названия анкеты  
    **/

    const handleNameChange = (e) => {
        setNameSurvey(e.target.value);
    }

    /** Функция handleSetNameState вызывается при нажатии на кнопку "Изменить название"
     * или "Установить название" 
     * если поле названия находится в состоянии редактирования доступна кнопка "Установить название"
     * если название анкеты уже установлено, то доступна кнопка "Изменить название"
     * **/
    const handleSetNameState = () => {
        
        /** если переменная nameEdit true, значит поле
         * находится в состоянии редактирования и при вызове этой функции
         * значение данной переменной меняется на противоложное и установливает новое название
         * анкеты, меняя состояние названия
         * **/
        
        if(nameEdit){
            setNameEdit(!nameEdit)
            setSurvey({...survey, name: nameSurvey})
            return
        } else{
            setNameEdit(!nameEdit)
            return
        }
        
        
    }

    

    const [height, setHeight] = React.useState("26px");
    
    /** Вызов функции handleChange считывает значение, введенное в поле "Описание анкеты" 
      * и меняет состояние описания анкеты  
    **/
    const handleChange = (e) => {
        setTextareaValue(e.target.value)
    }

    /** Функция handleSubmit работает аналогичным способом, что и handleSetNameState
     * т.е вызывается при нажатии на кнопку "Изменить описание" или "Установить описание" 
     * если поле описания находится в состоянии редактирования доступна кнопка "Установить описание"
     * если название анкеты уже установлено, то доступна кнопка "Изменить описание"
     * **/
    const handleSubmit = (e) => {
        e.preventDefault()

        /** если переменная descriptionEdit true, значит поле
         * находится в состоянии редактирования и при вызове этой функции
         * значение данной переменной меняется на противоложное и установливает новое описание
         * анкеты, меняя состояние описания
         * **/
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
      

      const handleChangeQuestionTitle = (questionIndex, newTitle) => {
        const updatedQuestions = survey.questions.map((question, index) => {
            if (index === questionIndex) {
                return { ...question, text: newTitle }; // Обновляем текст вопроса
            }
            return question;
        });

        setSurvey({ ...survey, questions: updatedQuestions });
    };
      
        const handleChangeQuestionOption = (questionIndex, optInd, optionNewText) => {
            const updatedQuestions = survey.questions.map((question, index) => {
                if (index === questionIndex) {
                    // Если это нужный вопрос, обновляем его опции
                    const updatedQuestionOptions = question.options.map((option, optionIndex)=>{
                        if(optInd === optionIndex){
                            return {...option, text:optionNewText};// Обновляем текст опции
                        }
                        
                        return option;// Возвращаем неизмененные опции
                    })

                    // Возвращаем обновленный вопрос с новыми опциями
                    return { ...question, options: updatedQuestionOptions };
                }
                
                return question;
            });
    
            setSurvey({ ...survey, questions: updatedQuestions });
        }


      const handleAddOption = (questionIndex) => {
        const newQuestions = survey.questions.map((question, i) => {
          if (i === questionIndex) {
            return {
              ...question,
              options: [...question.options, {text:"Введите вариант ответа"}],
            };
          }
    
          return question;
        });
    
        setSurvey({
          ...survey,
          questions: newQuestions,
        });
      };
     
      const handleRemoveOption = (questionIndex, optionIndex) => {
        const newQuestions = survey.questions.map((question, i) => {
            if (i === questionIndex) {
                const newOptions = question.options.filter((_, j) => j !== optionIndex);
                return {
                    ...question,
                    options: newOptions,
                };
            }
            return question;
        });
    
        setSurvey({
            ...survey,
            questions: newQuestions,
        });
    };
    
    

    return ( 
      <div className='container'>
        <div className='container__content'>
            <div className='borderTop'></div>
            <div className="createSurvey__descriptionBlock">
               <div className='borderLeft'></div>
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
        <div className='container__content'>
            <QuestionsField 
                questions={survey.questions} 
                handleAddOption={handleAddOption} 
                handleRemoveOption={handleRemoveOption} 
                handleChangeQuestionTitle={handleChangeQuestionTitle}
                handleChangeQuestionOption={handleChangeQuestionOption} 
            />
        </div>
        
      </div>
    );
}

export default NewSurveyPage;
