import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import './SearchBar.css'; // импортируем файл со стилями

function SearchBar() {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const clearInput = () => {
        setSearchText('');
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-search-icon" >
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleInputChange}
                className="search-bar-input"
            />
            {searchText.length > 0 && (
                <button onClick={clearInput} className="search-bar-clear-button">
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            )}
        </div>
    );
}

export default SearchBar;
