import React from 'react';
import './newSurveyPage.css'
import DescriptionField from './DescriptionField/DescriptionField';
import TitleInput from './TitleField/TitleField';
import QuestionsField from './QuestionsField/questionsField';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const NewSurveyPage = ({loading}) => {
    let exist =false;
    const navigate = useNavigate()     
    const [survey, setSurvey] = React.useState({
        id:Date.now() + Math.floor(Math.random() * 1000),
        name: "Новая анкета",
        description: `Описание`,
        questions: [
            {
                id: 1,
                type: "one_from_the_list",
                text: "Введите название вопроса",
                required: false,
                options: [
                    {
                        text: "Введите вариант ответа"
                    }
                    
                ]
            }
          
        ],
      });
      
      
       
      const saveSurvey = async () => {
        try {
            
            const response = await axios.post("http://localhost:5000/saveSurvey", survey);
            alert(response.data.message);
            navigate("/surveys")
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            const message = error.response?.data?.message || `Не удалось сохранить анкету. \nПроверьте подключение к серверу`
            alert(message)
        }
    };
    const updateCheckboxRequired = (questionIndex, checked) => {
        setSurvey((prevSurvey) => {
            const updatedQuestions = [...prevSurvey.questions];
            updatedQuestions[questionIndex] = {
                ...updatedQuestions[questionIndex],
                required: checked, // обновляем флаг обязательности
            };
            return { ...prevSurvey, questions: updatedQuestions };
        });
    };

    const addNewQuestion = () => {
        const newQuestion = {
            id: 1,
            type: "one_from_the_list",
            text: "Введите название вопроса",
            required: false,
            options: [
                {
                    
                    text: "Введите вариант ответа"
                }
                
            ]
        }
        survey.questions.push(newQuestion)
        setSurvey({...survey})
        
      }
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
    
    

    return ( 
      <div className='createSurvey'>
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
                deletingQuestion={removeQuestion}
                chooseType={chooseType}
                loading={loading}
                exist={exist}
                updateCheckboxRequired={updateCheckboxRequired}
            />

            <button className='addQuestion' onClick={()=>addNewQuestion()}>Добавить новый вопрос</button>
            <div className='saving'>
                <button onClick={saveSurvey}>Сохранить анкету</button>
            </div>
        </div>
        
      </div>
    );
}
//export {addNewQuestion, removeQuestion, chooseType, height, setHeight, handleScroll, handleChangeQuestionTitle, handleChangeQuestionOption, handleAddOption, handleRemoveOption};
export default NewSurveyPage;
