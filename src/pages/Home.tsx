import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../assets/img/logo.png';
// @ts-ignore
import backgroundImage from '../assets/img/background.jpg';
import '../assets/css/home.css';

const Home = () => {
    document.title = "Pokédex - Accueil";

    return (
        <>
            <div className="relative">
                <img src={backgroundImage} alt="Background" className="brightness absolute inset-0 object-cover w-full h-full bg-center bg-no-repeat"/>

                <div className="relative mx-auto px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-10">
                        <img src={logo} alt="Logo Pokemon" className="w-16 h-16"/>
                    </div>
                    <div className="flex flex-col items-center mx-auto">
                        <Link to="/pokemon" className="button-theme text-dark text-center hover:bg-gray-100 font-bold py-2 px-4 rounded w-64 mb-4">
                            Tous les Pokémons
                        </Link>
                        <Link to="/generation" className="bg-red-600 text-white text-center hover:bg-red-800 font-bold py-2 px-4 rounded w-64">
                            Générations
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
