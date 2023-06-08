/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

function Theme() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const applyTheme = (theme) => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
    };

    useEffect(() => {
        applyTheme(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none"
        >
            {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
    );
}

export default Theme;
