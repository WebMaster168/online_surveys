import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewQuestionField from "./ViewQuestionsField/ViewQuestionField";
import './SurveyPage.scss'

const SurveyPage= () => {
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false); // ✅ новый стейт
    const { id } = useParams();
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        
    });

    const handleSubmit = async () => {
 
      if (!survey?.questions) return;
   
      const errors = [];
   
      survey.questions.forEach((question, questionIndex) => {
   
          const ans =
              answers.answersOnQuestions.filter(
                  answer =>
                      answer.questionId === questionIndex + 1
              );
   
          // Проверка обязательных вопросов
          if (question.required) {
   
              switch (question.type) {
   
                  case "short_answer":
                  case "quantitative_field":
   
                      if (
                          ans.length === 0 ||
                          ans.some(
                              a =>
                                  !a.value ||
                                  a.value.toString().trim() === ""
                          )
                      ) {
   
                          errors.push(
                              `Не заполнен обязательный вопрос "${question.text}"`
                          );
   
                      }
   
                      break;
   
                  case "one_from_the_list":
   
                      if (
                          ans.length === 0 ||
                          ans.every(
                              a =>
                                  !a.options ||
                                  a.options.length === 0
                          )
                      ) {
   
                          errors.push(
                              `Не заполнен обязательный вопрос "${question.text}"`
                          );
   
                      }
   
                      break;
   
                  case "several_from_the_list":
   
                      if (
                          ans.length === 0 ||
                          ans.every(
                              a =>
                                  !a.options ||
                                  a.options.length === 0
                          )
                      ) {
   
                          errors.push(
                              `Не заполнен обязательный вопрос "${question.text}"`
                          );
   
                      }
   
                      break;
   
                      case "rank_list": {
 
                        const ranks = ans.map(a =>
                            String(a.value ?? "").trim()
                        );
                     
                        const isAnswered =
                            ans.length === question.options.length &&
                            !ranks.some(rank => rank === "");
                     
                        if (question.required && !isAnswered) {
                     
                            errors.push(
                                `Не заполнен обязательный вопрос "${question.text}"`
                            );
                     
                            break;
                        }
                     
                        const uniqueRanks = new Set(ranks);
                     
                        if (uniqueRanks.size !== ranks.length) {
                     
                            errors.push(
                                `В вопросе "${question.text}" используются одинаковые ранги`
                            );
                     
                        }
                     
                        break;
                    }
   
                  default:
                      break;
              }
          }
   
          // Дополнительная проверка rank_list
          if (question.type === "rank_list") {
   
              const ranks =
                  ans
                      .map(a => String(a.value).trim())
                      .filter(rank => rank !== "");
   
              const uniqueRanks =
                  new Set(ranks);
   
              if (
                  uniqueRanks.size !== ranks.length
              ) {
   
                  errors.push(
                      `В вопросе "${question.text}" используются одинаковые ранги`
                  );
   
              }
          }
   
      });
   
      if (errors.length > 0) {
   
          alert(errors.join("\n"));
   
          return;
      }
   
      try {
   
          const response = await fetch(
              "http://localhost:5000/saveAnswers",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(answers)
              }
          );
   
          const data = await response.json();
   
          console.log(
              "Ответ сервера:",
              data
          );
   
          setSubmitted(true);
   
      } catch (error) {
   
          console.error(
              "Ошибка при сохранении ответов:",
              error
          );
   
      }
   
  };
    
    const next = () => {
        // ✅ редирект на эту же страницу
        navigate(`/surveys/${id}`, { replace: true });
        window.location.reload(); // чтобы перезагрузить state
    }

    const handleRadioChange = (questionId, optionId, text, questionText) => {
      setAnswers(prevState => {
          const existingAnswerIndex = prevState.answersOnQuestions.findIndex(
              a => a.questionId === questionId
          );
  
          let updatedAnswers;
          if (existingAnswerIndex !== -1) {
              // Если вопрос уже есть, обновляем его
              updatedAnswers = prevState.answersOnQuestions.map(a => {
                  if (a.questionId === questionId) {
                      // Обновляем выбранный вариант
                      return {
                          ...a,
                          options: [{ id: optionId, text }] // Сохраняем только выбранный вариант
                      };
                  }
                  return a;
              });
          } else {
              // Если вопроса нет, создаем новый объект с выбранным вариантом
              updatedAnswers = [
                  ...prevState.answersOnQuestions,
                  { questionId, questionText, options: [{ id: optionId, text }] }
              ];
          }
  
          return {
              ...prevState,
              answersOnQuestions: updatedAnswers
          };
      });
  };
  

    useEffect(() => {
        fetch(`http://localhost:5000/getSurvey/${id}`)
            .then(res => res.json())
            .then(data => {
                setSurvey(data)
                setLoading(false)
                setAnswers({
                    id: data.id, 
                    title: data.name,
                    description: data.description,
                    answersOnQuestions: []
                })
            })
            .catch(err => console.error("Ошибка загрузки анкет:", err));
    }, []);

    

    const updateAnswer = (questionId, value, questionText) => {
        setAnswers((prevState) => {
          const existingAnswerIndex = prevState.answersOnQuestions.findIndex(a => a.questionId === questionId);
      
          let updatedAnswers;
          if (existingAnswerIndex !== -1) {
            // Если ответ уже есть, обновляем его
            updatedAnswers = prevState.answersOnQuestions.map(a =>
              a.questionId === questionId ? { ...a, value } : a
            );
          } else {
            // Если ответа нет, добавляем новый
            updatedAnswers = [...prevState.answersOnQuestions, { questionId, questionText, value }];
          }
      
          return {
            ...prevState,
            answersOnQuestions: updatedAnswers,
          };
        });
    }

    const updateRankAnswer = (
      questionId,
      value,
      optionId,
      questionText,
      optionText
  ) => {
   
      setAnswers(prevState => {
   
          const existingIndex =
              prevState.answersOnQuestions.findIndex(
                  answer =>
                      answer.questionId === questionId &&
                      answer.optionId === optionId
              );
   
          let updatedAnswers;
   
          if (existingIndex !== -1) {
   
              updatedAnswers =
                  prevState.answersOnQuestions.map(answer =>
   
                      answer.questionId === questionId &&
                      answer.optionId === optionId
   
                          ? {
                              ...answer,
                              value: value
                          }
   
                          : answer
                  );
   
          } else {
   
              updatedAnswers = [
                  ...prevState.answersOnQuestions,
                  {
                      questionId,
                      questionText,
                      optionId,
                      optionText,
                      value
                  }
              ];
   
          }
   
          return {
              ...prevState,
              answersOnQuestions: updatedAnswers
          };
   
      });
   
  };

  


    const updateCheckboxAnswer = (questionId, optionId, text, isChecked, questionText ) => {
      

      setAnswers(prevState => {
          const existingAnswerIndex = prevState.answersOnQuestions.findIndex(
              a => a.questionId === questionId
          );
  
          let updatedAnswers;
          if (existingAnswerIndex !== -1) {
              // Если вопрос уже есть, обновляем его
              updatedAnswers = prevState.answersOnQuestions.map(a => {
                  if (a.questionId === questionId) {
                      let updatedOptions = isChecked
                          ? [...a.options, { id: optionId, text }]
                          : a.options.filter(opt => opt.id !== optionId); // Убираем, если чекбокс сняли
  
                      return { ...a, options: updatedOptions };
                  }
                  return a;
              });
          } else {
              // Если вопроса нет, создаем новый объект с массивом чекбоксов
              updatedAnswers = [
                  ...prevState.answersOnQuestions,
                  { questionId, questionText, options: [{ id: optionId, text }] }
              ];
          }
  
          return {
              ...prevState,
              answersOnQuestions: updatedAnswers
          };
      });
  };

     return (
    <div className='viewSurvey'>
      <div className='container__content'>
        <div className='borderTop'></div>
        <div className="viewSurvey__descriptionBlock">
          <div className='borderLeft'></div>
          <h1 className="viewSurvey__title">{survey.name}</h1>
          <p className="viewSurvey__description">{survey.description}</p>
        </div>
      </div>

      <div className='container__content'>
        {!submitted ? (
          <>
            <ViewQuestionField
              handleRadioChange={handleRadioChange}
              updateCheckboxAnswer={updateCheckboxAnswer}
              answers={answers}
              updateAnswer={updateAnswer}
              updateRankAnswer={updateRankAnswer}
              questions={survey.questions}
              loading={loading}
            />

            <button onClick={handleSubmit} className="submitButton">
              Отправить
            </button>
          </>
        ) : (
          <div className="thankYouMessage">
            <h2>Спасибо за участие!</h2>
            <p>Ваши ответы успешно сохранены.</p>
            <button onClick={next} className="next">Далее</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SurveyPage;