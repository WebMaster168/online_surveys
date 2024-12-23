import React from 'react';
import './surveysPage.css'
import { useNavigate } from "react-router-dom";

const SurveysPage= () => {
    const navigate = useNavigate() 
    const createSurvey = () => {
        navigate("/surveys/createNewSurvey")
    }
    return ( 
        <div className='container'>
            <div className="surveys__inner">
                <div className="surveys__text">
                    <h1>Ваш список анкет</h1>
                </div>
                <div className="surveys__block">
                    <button onClick={()=>createSurvey()} className='surveys__add'>
                        <svg id="Layer_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m368.475 238.87-80.34-.004c-8.285 0-15-6.716-15-15v-80.33c0-9.447-7.687-17.133-17.135-17.133-4.576 0-8.877 1.782-12.113 5.018-3.234 3.235-5.017 7.536-5.016 12.109l-.001 80.34c0 8.284-6.716 15-15 15h-80.335c-4.577 0-8.88 1.782-12.115 5.018-3.236 3.235-5.018 7.537-5.017 12.112-.001 4.58 1.78 8.881 5.016 12.116s7.536 5.018 12.11 5.018h80.341c3.979 0 7.794 1.58 10.606 4.394 2.813 2.813 4.394 6.629 4.394 10.607l-.003 80.336c0 9.444 7.684 17.129 17.125 17.129h.016c9.443 0 17.127-7.685 17.127-17.13v-80.336c0-8.284 6.716-15 15-15h80.332c9.447 0 17.133-7.687 17.133-17.134 0-9.445-7.683-17.13-17.125-17.13z"/><path d="m437.02 74.983c-48.354-48.353-112.641-74.983-181.02-74.983-68.382.002-132.67 26.631-181.021 74.982s-74.979 112.64-74.979 181.021c0 68.38 26.628 132.666 74.979 181.018 48.351 48.351 112.638 74.979 181.018 74.979 68.381 0 132.669-26.628 181.021-74.979s74.982-112.638 74.982-181.018c0-68.379-26.629-132.667-74.98-181.02zm-68.553 228.151h-65.332v65.336c0 25.987-21.141 47.13-47.127 47.13-.002 0-.01 0-.012 0-25.986 0-47.127-21.142-47.129-47.129l.002-65.337h-65.334c-12.594 0-24.43-4.903-33.33-13.806-8.902-8.902-13.804-20.738-13.802-33.328-.002-12.586 4.899-24.423 13.804-33.326 8.902-8.901 20.738-13.804 33.328-13.804h65.335l.001-65.337c-.002-12.586 4.899-24.422 13.803-33.324 8.901-8.903 20.737-13.806 33.326-13.806 25.99 0 47.135 21.144 47.135 47.133v65.331l65.332.003c25.992 0 47.133 21.143 47.133 47.13 0 25.989-21.144 47.134-47.133 47.134z"/></g></svg>
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default SurveysPage;