import React from "react";
import logo from "./logo.jpg"; // импортируем логотип
import "./Header.css"; // импортируем файл стилей
import SearchBar from "../search/SearchBar";

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <a href="/">
                    <img src={logo} alt="Auto.ru" className="header__logo" />
                </a>
                {/*<div className="header__search">*/}
                {/*    <SearchBar/>*/}
                {/*</div>*/}
                {/*<div className="header__links">*/}
                {/*    <a href="/" className="header__link">Help</a>*/}
                {/*    <a href="/" className="header__link">Sign in</a>*/}
                {/*</div>*/}
            </div>
        </header>
    );
}

export default Header;
