
import React, { useState } from 'react';

interface AddNoteFormProps {
  onAddNote: (title: string, content: string) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onAddNote(title.trim() || "Nota sem título", content.trim());
      setTitle('');
      setContent('');
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300">
            {isExpanded && (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                    className="w-full p-2 mb-3 bg-transparent focus:outline-none text-lg font-medium text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
            )}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleFocus}
                placeholder="Criar uma nota..."
                className="w-full p-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                rows={isExpanded ? 3 : 1}
            />
            {isExpanded && (
                <div className="flex justify-end mt-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                        Adicionar
                    </button>
                </div>
            )}
        </form>
    </div>
  );
};

export default AddNoteForm;
