import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
                Bloco de Notas<span className="text-blue-600">.ia</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Suas anotações, com um toque de inteligência.
            </p>
        </header>
    );
};