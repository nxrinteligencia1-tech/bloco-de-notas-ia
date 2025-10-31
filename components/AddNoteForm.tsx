import React, { useState } from 'react';

interface AddNoteModalProps {
  onAddNote: (title: string, content: string) => void;
  onClose: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ onAddNote, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onAddNote(title.trim() || "Nota sem título", content.trim());
      // O modal será fechado pelo componente pai
    }
  };

  // Permite fechar o modal clicando fora da caixa de diálogo
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Nova Nota</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="w-full p-3 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Criar uma nota..."
            className="w-full p-3 mb-6 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
            rows={6}
          />
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
