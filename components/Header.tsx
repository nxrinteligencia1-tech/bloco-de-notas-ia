import React from 'react';
import { User } from 'firebase/auth';
import { auth, signOut } from '../firebaseConfig';

interface HeaderProps {
    user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <header className="flex justify-between items-center mb-8 md:mb-12">
            <div className="text-center flex-grow">
                 <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
                    Bloco<span className="text-blue-600">.AI</span>
                </h1>
            </div>
            {user && (
                <div className="flex items-center space-x-4">
                    <img
                        src={user.photoURL || undefined}
                        alt={user.displayName || 'Avatar do usuário'}
                        className="w-10 h-10 rounded-full"
                    />
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                        Sair
                    </button>
                </div>
            )}
        </header>
    );
};
