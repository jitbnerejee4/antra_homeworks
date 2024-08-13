import React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function SearchBar({ handleSubmit, handleInputChange, input }) {
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputData, setInputData] = useState('');
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const focusedSuggestionRef = useRef(null);

    useEffect(() => {
        setSuggestions([
            "Don Quixote",
            "Alice's Adventures in Wonderland",
            "The Adventures of Huckleberry Finn",
            "The Adventures of Tom Sawyer",
            "Treasure Island",
            "Pride and Prejudice",
            "Wuthering Heights",
            "Jane Eyre",
            "Moby Dick",
            "The Scarlet Letter",
            "Gulliver's Travels",
            "The Pilgrim's Progress",
            "A Christmas Carol",
            "David Copperfield",
            "A Tale of Two Cities",
            "Little Women",
            "Great Expectations",
            "The Hobbit, or, There and Back Again",
            "Frankenstein, or, the Modern Prometheus",
            "Oliver Twist",
            "Uncle Tom's Cabin",
            "Crime and Punishment",
            "Madame Bovary: Patterns of Provincial life",
            "The Return of the King",
            "Dracula",
            "The Three Musketeers",
            "Brave New World",
            "War and Peace",
            "To Kill a Mockingbird",
            "The Wizard of Oz",
            "Les Misérables",
            "The Secret Garden",
            "Animal Farm",
            "The Great Gatsby",
            "The Little Prince",
            "The Call of the Wild",
            "20,000 Leagues Under the Sea",
            "Anna Karenina",
            "The Wind in the Willows",
            "The Picture of Dorian Gray",
            "The Grapes of Wrath",
            "Sense and Sensibility",
            "The Last of the Mohicans",
            "Tess of the d'Urbervilles",
            "Harry Potter and the Sorcerer's Stone",
            "Heidi",
            "Ulysses",
            "The Complete Sherlock Holmes",
            "The Count of Monte Cristo",
            "The Old Man and the Sea"
        ]);
    }, []);

    useEffect(() => {
        if (inputData.length > 0) {
            const filtered = suggestions.filter((suggestion) => {
                return suggestion.toLowerCase().includes(inputData.toLowerCase());
            });
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [inputData, suggestions]);

    const handleSuggestionClick = (suggestion) => {
        handleInputChange({ target: { value: suggestion } });
        setShowSuggestions(false);
        setFilteredSuggestions([]);
        setInputData('');
        setFocusedSuggestionIndex(-1);
    };

    const handleChange = (event) => {
        handleInputChange(event);
        setInputData(event.target.value);
        setFocusedSuggestionIndex(-1);
    };

    const handleKeyDown = (event) => {
        if (showSuggestions) {
            if (event.key === 'ArrowDown') {
                setFocusedSuggestionIndex((prevIndex) =>
                    prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
                );
            } else if (event.key === 'ArrowUp') {
                setFocusedSuggestionIndex((prevIndex) =>
                    prevIndex <= 0 ? filteredSuggestions.length - 1 : prevIndex - 1
                );
            } else if (event.key === 'Enter' && focusedSuggestionIndex >= 0) {
                handleSuggestionClick(filteredSuggestions[focusedSuggestionIndex]);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setFilteredSuggestions([]);
                setInputData('');
                setFocusedSuggestionIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (focusedSuggestionRef.current) {
            focusedSuggestionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [focusedSuggestionIndex]);

    return (
        <div>
            <div ref={wrapperRef} className="max-w-md mx-auto">
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={input}
                            placeholder="Search Book..."
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul className="suggestions-list bg-white border border-gray-300 rounded-lg max-w-md mx-auto mt-2 p-4 max-h-48 overflow-y-auto shadow-lg">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                ref={index === focusedSuggestionIndex ? focusedSuggestionRef : null}
                                className={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${index === focusedSuggestionIndex ? 'bg-blue-100' : ''}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
