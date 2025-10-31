import React, { useState } from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newContent: string) => void;
}

const EditModal: React.FC<{
  note: Note;
  onSave: (id: string, newTitle: string, newContent: string) => void;
  onClose: () => void;
}> = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave(note.id, title, content);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Editar Nota</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
          rows={6}
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const formattedDate = new Date(note.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });


    const handleExport = () => {
        const fileContent = `${note.title}\n\n${note.content}`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fileName = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'nota'}.txt`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col transition-shadow hover:shadow-xl h-full break-inside-avoid-column">
        <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 break-words">{note.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{note.content}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</span>
            <div className="flex space-x-2">
                 <button onClick={() => setIsEditing(true)} aria-label="Editar nota" title="Editar nota" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                </button>
                <button onClick={handleExport} aria-label="Exportar nota para TXT" title="Exportar para TXT" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
                <button onClick={() => onDelete(note.id)} aria-label="Excluir nota" title="Excluir nota" className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
      {isEditing && (
        <EditModal 
            note={note} 
            onSave={onEdit} 
            onClose={() => setIsEditing(false)} 
        />
      )}
    </>
  );
};

export default NoteCard;
