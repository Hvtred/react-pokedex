import React from 'react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../App';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../assets/img/logo.png';

export default function Footer() {
    const [darkMode] = useAtom(darkModeAtom);

    return (
        <>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/"
                       className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Pokedex Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pokedex</span>
                    </a>
                    <span className="block text-sm sm:text-center dark:text-gray-400">
                        Thème actuel : {darkMode ? "Mode Sombre" : "Mode Clair"}
                    </span>
                    <ul className="flex flex-wrap items-center mb-6 gap-4 text-sm font-medium sm:mb-0 dark:text-gray-400">
                        <Link to="/pokemon">
                            <li>
                                <p className="hover:underline me-4 md:me-6">Tous les pokémons</p>
                            </li>
                        </Link>
                        <Link to="/generation">
                            <li>
                                <p className="hover:underline me-4 md:me-6">Générations</p>
                            </li>
                        </Link>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                <span className="block text-sm sm:text-center dark:text-gray-400">© 2024 <a href="/"
                                                                                                          className="hover:underline">Pokedex</a>. Tous droits réservés.</span>
            </div>
        </>
    );
}