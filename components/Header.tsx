import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-center items-center mb-8 md:mb-12">
             <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
                Bloco<span className="text-blue-600">.AI</span>
            </h1>
        </header>
    );
};
