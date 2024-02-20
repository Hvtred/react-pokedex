import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Search from './pages/Search';
import List from './pages/Pokemon/List';
import Detail from './pages/Pokemon/Detail';
import GenList from './pages/Generation/GenList';
import GenDetail from './pages/Generation/GenDetail';
import Error from './pages/Error';

import './assets/css/index.css';

import { atom, useAtom } from 'jotai';
import {IoIosSunny, IoMdMoon} from "react-icons/io";
import Button from "./components/Button";

export const darkModeAtom = atom(false);

const App = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`App ${darkMode ? 'dark' : ''}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <main className="App-main">
                                <Home />
                            </main>
                        </>
                    } />

                    <Route path="/recherche" element={
                        <>
                            <header className="App-header">
                                <Header toggleDarkMode={toggleDarkMode} darkModeAtom={darkModeAtom}/>
                            </header>
                            <main className="App-main">
                                <Search/>
                            </main>
                            <footer className="App-footer">
                                <Footer/>
                            </footer>
                        </>
                    }/>

                    <Route path="/generation/" element={
                        <>
                            <header className="App-header">
                                <Header toggleDarkMode={toggleDarkMode} darkModeAtom={darkModeAtom}/>
                            </header>
                            <main className="App-main">
                                <GenList/>
                            </main>
                            <footer className="App-footer">
                                <Footer />
                            </footer>
                        </>
                    } />

                    <Route path="/generation/:id" element={
                        <>
                            <header className="App-header">
                                <Header toggleDarkMode={toggleDarkMode} darkModeAtom={darkModeAtom}/>
                            </header>
                            <main className="App-main">
                                <GenDetail/>
                            </main>
                            <footer className="App-footer">
                                <Footer/>
                            </footer>
                        </>
                    }/>

                    <Route path="/pokemon/*" element={
                        <>
                            <header className="App-header">
                                <Header toggleDarkMode={toggleDarkMode} darkModeAtom={darkModeAtom}/>
                            </header>
                            <main className="App-main">
                                <List/>
                            </main>
                            <footer className="App-footer">
                                <Footer/>
                            </footer>
                        </>
                    }/>
                    <Route path="/pokemon/:id" element={
                        <>
                            <header className="App-header">
                                <Header toggleDarkMode={toggleDarkMode} darkModeAtom={darkModeAtom}/>
                            </header>
                            <main className="App-main">
                                <Detail/>
                            </main>
                            <footer className="App-footer">
                                <Footer/>
                            </footer>
                        </>
                    }/>
                    <Route path="*" element={
                        <>
                            <header className="App-header">
                                <Header toggleDarkMode={toggleDarkMode} darkModeAtom={darkModeAtom}/>
                            </header>
                            <main className="App-main">
                                <Error/>
                            </main>
                            <footer className="App-footer">
                                <Footer/>
                            </footer>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>

            <Button onClick={toggleDarkMode} darkMode={darkMode} label={darkMode ? <IoIosSunny/> : <IoMdMoon/>}/>
        </div>
    );
};

export default App;