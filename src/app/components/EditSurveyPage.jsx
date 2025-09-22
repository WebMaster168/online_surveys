import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import ViewQuestionField from "./ViewQuestionsField/ViewQuestionField";
import './NewSurveyPage/newSurveyPage.css'
import TitleInput from "./NewSurveyPage/TitleField/TitleField";
import DescriptionField from "./NewSurveyPage/DescriptionField/DescriptionField";
import QuestionsField from "./NewSurveyPage/QuestionsField/questionsField";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditSurveyPage= () => {
    const [survey, setSurvey] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate()
    /** Хранение состояния названия анкеты **/
    const [nameSurvey, setNameSurvey] = React.useState(survey.name) 
    
    /** Хранение состояния редактирования названия анкеты **/
    const [nameEdit, setNameEdit] = React.useState(false)

    let exist = true;

    /** Хранение состояния описания анкеты **/
    const [textareaValue, setTextareaValue] = React.useState(survey.description)

    /** Хранение состояния редактирования описания анкеты **/
    const [descriptionEdit, setDescriptionEdit] = React.useState(false)
    
    const addNewQuestion = () => {
        const newQuestion = {
            id: 1,
            type: "one_from_the_list",
            text: "Введите название вопроса",
            options: [
                {
                    
                    text: "Введите вариант ответа"
                }
                
            ]
        }
        survey.questions.push(newQuestion)
        setSurvey({...survey})
        
      }
    
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

    

    const [height, setHeight] = React.useState("99px");

    useEffect(() => {
        fetch(`http://localhost:5000/getSurvey/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setSurvey(data)
                setNameSurvey(data.name)
                setTextareaValue(data.description)

                
                
            })
            .catch(err => console.error("Ошибка загрузки анкет:", err));
            
            setSurvey(prev => ({...prev, questions: survey.questions }))
        }, []);

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
     
      function removeQuestion(removingIndexQuestion){
        const updatedQuestions = survey.questions.filter((item,index) => index !== removingIndexQuestion)
        setSurvey({...survey, questions: updatedQuestions});
    }

    const chooseType = (questionIndex, currentType) => {
        const updatedQuestions = survey.questions.map((item, index)=>{
            if(index === questionIndex){
                item.type = currentType
                if(currentType === 'short_answer'){
                    item.options = {
                        id: 0,
                        text: "Введите ответ"
                    }
                }else if(currentType === 'quantitative_field'){
                    item.options = {
                        id: 0,
                        text: "Введите число"
                    }
                }else{
                    item.options = [
                        {
                            id: 1,
                            text: "Введите вариант ответа"
                        }
                        
                    ]
                }    
            }
            
            
            return item

        })

        setSurvey({...survey, questions: updatedQuestions})
    }

      const handleRemoveOption = (questionIndex, optionIndex) => {
        const newQuestions = survey.questions.map((question, i) => {
            if (i === questionIndex) {
                const newOptions = question.options.filter((option, j) => j !== optionIndex);
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
    
    const editSurvey = async () => {
        try {
            
            const response = await axios.post("http://localhost:5000/updateSurvey", survey);
            alert(response.data.message);
            navigate("/surveys")
        } catch (error) {
            console.error("Ошибка сохранения:", error);
        }
    };
      
    return(
        <div className='viewSurvey'>
            <div className='container__content'>
                <div className='borderTop'></div>
                <div className="viewSurvey__descriptionBlock">
                    <div className='borderLeft'></div>
                    {!loading &&
                    <TitleInput 
                        nameEdit={nameEdit}
                        nameSurvey={nameSurvey}
                        handleNameChange={handleNameChange}
                        handleSetNameState={handleSetNameState}
                        survey={survey}
                    />
                    }
                    {!loading &&
                    <DescriptionField
                        handleChange={handleChange} 
                        handleSubmit={handleSubmit}
                        textareaValue={textareaValue}
                        height={ height }
                        handleScroll={handleScroll}
                        descriptionEdit={descriptionEdit}
                        survey={survey}
                    />
                    }
                    
                </div>
                <div className='container__content'>
                    {!loading &&
                    <QuestionsField 
                        questions={survey.questions} 
                        handleAddOption={handleAddOption} 
                        handleRemoveOption={handleRemoveOption} 
                        handleChangeQuestionTitle={handleChangeQuestionTitle}
                        handleChangeQuestionOption={handleChangeQuestionOption} 
                        deletingQuestion={removeQuestion}
                        chooseType={chooseType}
                        loading={loading}
                        exist={exist}
                    />
                    }    
                    <button className='addQuestion' onClick={()=>addNewQuestion()}>Добавить новый вопрос</button>
                    <div className='saving'>
                        <button>Изменить анкету</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default EditSurveyPage;