import React, { useState, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// @ts-ignore
import logo from '../assets/img/logo.png';
import { BsSearch } from 'react-icons/bs'
import { useAtom, Atom } from 'jotai';

interface HeaderProps {
    toggleDarkMode: () => void;
    darkModeAtom: Atom<boolean>;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, darkModeAtom }) => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleSearchSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <nav className={`mt-5 mb-5 ${darkMode ? 'dark' : ''}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Copay Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-dark">Pokedex</span>
                </Link>
                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600" onClick={toggleMenu} aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                    <span className="sr-only">Ouvrir le menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={classNames("w-full md:w-auto md:flex md:items-center md:space-x-8 rtl:space-x-reverse", {
                    'justify-center': isMenuOpen,
                    'hidden': !isMenuOpen
                })} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link to="/pokemon" className="text-center block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0" onClick={toggleMenu}>
                                Tous les Pokemons
                            </Link>
                        </li>
                        <li>
                            <Link to="/generation"
                                  className="text-center block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0"
                                  onClick={toggleMenu}>
                                Générations
                            </Link>
                        </li>
                    </ul>

                    <div className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
                        <form className="flex items-center" onSubmit={handleSearchSubmit}>
                            <label htmlFor="search" className="sr-only">Rechercher un Pokémon</label>
                            <input type="text" placeholder="bulbasaur..."
                                   className="input-theme p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                   value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
                            </input>

                            <button type="submit"
                                    className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-md ml-2">
                                <BsSearch/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;