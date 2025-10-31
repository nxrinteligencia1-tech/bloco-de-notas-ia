import React from 'react';
import { auth, GoogleAuthProvider, signInWithRedirect } from '../firebaseConfig';

const Login: React.FC = () => {

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    try {
      // Usar signInWithRedirect em vez de signInWithPopup
      signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  return (
    <div className="text-center mt-20 p-8 flex flex-col items-center">
       <div className="inline-block bg-gray-200 dark:bg-gray-700 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Bem-vindo ao Bloco.AI</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Faça login para salvar suas notas na nuvem e acessá-las de qualquer dispositivo, a qualquer momento.
      </p>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
      >
        <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M24 9.5c3.2 0 6.1 1.1 8.4 3.2l6.3-6.3C34.9 2.5 29.8 0 24 0 14.9 0 7.2 5.4 3.7 13.2l7.7 6C13.2 13.5 18.2 9.5 24 9.5z"/>
          <path fill="#34A853" d="M46.2 25.4c0-1.7-.2-3.4-.5-5H24v9.3h12.5c-.5 3-2.1 5.6-4.6 7.3l7.4 5.7c4.3-4 6.9-10 6.9-17.3z"/>
          <path fill="#FBBC05" d="M11.4 28.2c-.4-1.2-.6-2.5-.6-3.8s.2-2.6.6-3.8l-7.7-6C1.3 18.1 0 21 0 24.4c0 3.4 1.3 6.3 3.7 8.8l7.7-5z"/>
          <path fill="#EA4335" d="M24 48c5.8 0 10.9-1.9 14.5-5.2l-7.4-5.7c-1.9 1.3-4.3 2-7.1 2-5.9 0-11-4-12.8-9.5l-7.7 6C7.2 42.6 14.9 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Entrar com o Google
      </button>
    </div>
  );
};

export default Login;