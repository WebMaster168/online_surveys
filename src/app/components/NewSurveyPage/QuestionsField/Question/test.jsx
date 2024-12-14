import React, { useState } from 'react';
import './test.scss'; // Импортируйте ваш CSS файл

const Test = () => {
    const [selectedBook, setSelectedBook] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    

    const books = [
        { id: 'value1', title: 'Текст' },
        { id: 'value2', title: 'Один из списка' },
        { id: 'value3', title: 'Несколько из списка' },
        { id: 'value4', title: 'Раскрывающийся список' },
    ];

    const handleBookSelect = (bookTitle) => {
        setSelectedBook(bookTitle);
        setIsOpen(false); // Закрываем попап после выбора
    };

    const togglePopup = () => {
        setIsOpen(prev => !prev); // Переключаем попап
    };

    

    return (
        <div className="think__form">
            <div className="think__form-select" onClick={togglePopup}>
                {selectedBook || 'Раскрывающийся список (по умолчанию)'}
            </div>
            
                <ul className={`think__form-popup ${isOpen ? 'active' : ''}`}>
                    {books.map(book => (
                        <li 
                            key={book.id}
                            data-book={book.title}
                            id={book.id}
                            onClick={() => handleBookSelect(book.title)}
                        >
                            {book.title}
                        </li>
                    ))}
                </ul>
            
            
        </div>
    );
};

export default Test;
