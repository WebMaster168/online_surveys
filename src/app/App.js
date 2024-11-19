import { Routes, Route, Navigate } from 'react-router-dom';
import SurveysPage from './components/SurveysPage/surveysPage';
import NewSurveyPage from './components/NewSurveyPage/newSurveyPage';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" exact element={<Navigate to="/surveys" />} />
          <Route path="/surveys" exact element={<SurveysPage />} />
          <Route path="/surveys/createNewSurvey" exact element={<NewSurveyPage />} />
      </Routes>
    </div>
  );
}

export default App;
