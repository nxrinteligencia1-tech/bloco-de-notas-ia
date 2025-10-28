
import React from 'react';

export const NoNotes: React.FC = () => {
  return (
    <div className="text-center mt-20 p-8">
      <div className="inline-block bg-gray-200 dark:bg-gray-700 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Nenhuma nota encontrada</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Parece que está um pouco vazio por aqui. Crie sua primeira nota!
      </p>
    </div>
  );
};
