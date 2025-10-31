import React, { useState, useEffect } from 'react';
import { Note } from './types';
import AddNoteModal from './components/AddNoteForm'; // Renomeado para clareza
import NoteCard from './components/NoteCard';
import { Header } from './components/Header';
import { NoNotes } from './components/NoNotes';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Carregar notas do localStorage na montagem inicial
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      // Ordena as notas pela data de criação, da mais recente para a mais antiga
      if (savedNotes) {
        const parsedNotes: Note[] = JSON.parse(savedNotes);
        parsedNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error("Erro ao carregar notas do localStorage:", error);
      setNotes([]);
    }
  }, []);

  // Salvar notas no localStorage sempre que o estado 'notes' mudar
  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error)      {
      console.error("Erro ao salvar notas no localStorage:", error);
    }
  }, [notes]);

  const handleAddNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    // Adiciona a nova nota no início da lista
    setNotes([newNote, ...notes]);
    setIsAddModalOpen(false); // Fecha o modal após adicionar
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  const handleEditNote = (id: string, newTitle: string, newContent: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
          <main className="mt-8">
            {notes.length === 0 ? (
              <NoNotes />
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {notes.map(note => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote}/>
                ))}
              </div>
            )}
          </main>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        aria-label="Adicionar nova nota"
        title="Adicionar nova nota"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Add Note Modal */}
      {isAddModalOpen && (
        <AddNoteModal 
          onAddNote={handleAddNote} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
