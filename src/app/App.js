import { Routes, Route, Navigate } from 'react-router-dom';
import SurveysPage from './components/SurveysPage/surveysPage';
import NewSurveyPage from './components/NewSurveyPage/newSurveyPage';
import SurveyPage from './components/SurveysPage/SurveyPage/SurveyPage';
import EditSurveyPage from './components/EditSurveyPage'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" exact element={<Navigate to="/surveys" />} />
          <Route path="/surveys" exact element={<SurveysPage />} />
          <Route path="/surveys/createNewSurvey" element={<NewSurveyPage />} />
          <Route path="/surveys/:id" exact element={<SurveyPage />} />
          <Route path="/surveys/editSurvey/:id" element={<EditSurveyPage />} />
          
      </Routes>
    </div>
  );
}

export default App;
