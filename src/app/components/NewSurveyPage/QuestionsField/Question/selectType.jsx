import React, { useState } from 'react';
import './selectType.scss'; // Импортируйте ваш CSS файл
import match_word from '../../../../../assets/images/match_word.svg';
import arrow_drop_down from '../../../../../assets/images/arrow_drop_down.svg';
import checklist from '../../../../../assets/images/checklist.svg';
import keyboard_arrow_down from '../../../../../assets/images/keyboard_arrow_down.svg';
import radio_button_checked from '../../../../../assets/images/radio_button_checked.svg';

const SelectType = () => {
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    

    const questionTypes = [
        { id: 'short_answer', title: 'Текст', iconSource: match_word},
        { id: 'one_from_the_list', title: 'Один из списка', iconSource: radio_button_checked},
        { id: 'several_from_the_list', title: 'Несколько из списка', iconSource: checklist},
        { id: 'drop_down_list', title: 'Раскрывающийся список', iconSource: arrow_drop_down},
    ];
    const [currentType, setCurrentType] = useState(questionTypes[3].id);
    const handleTypeSelect = (typeTitle, typeId) => {
        setSelectedQuestionType(typeTitle);
        setCurrentType(typeId);
        setIsOpen(false); // Закрываем попап после выбора
    };

    const togglePopup = () => {
        setIsOpen(prev => !prev); // Переключаем попап
    };

    const currentTypeFunction = (currentType) =>{
        const sourceIcon = questionTypes.find(type => currentType === type.id);
        return sourceIcon ? sourceIcon.iconSource : null; // Возвращаем иконку, если тип найден, иначе null
    }

    return (
        <div className="selectType">
            <div className="selectType__current" onClick={togglePopup}>
                <span className='selectType__current-icon'>
                    <img src={currentTypeFunction(currentType)} alt="icon-select"/>
                </span>
                <p className='selectType__current-text'>{selectedQuestionType || 'Раскрывающийся список (по умолчанию)'}</p>
            </div>
            
                <ul className={`selectType__popup ${isOpen ? 'active' : ''}`}>
                    {questionTypes.map(type => (
                        <li className='selectType__item'
                            key={type.id}
                            data-type={type.title}
                            id={type.id}
                            onClick={() => handleTypeSelect(type.title, type.id)}
                        >
                            <span className='selectType__item-icon'><img src={type.iconSource} alt="icon-select-popup" /></span>
                            <p>{type.title}</p>
                            
                        </li>
                    ))}
                </ul>
            
            
        </div>
    );
};

export default SelectType;
