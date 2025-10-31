import React, { useState, useEffect } from 'react';
import { Note } from './types';
import AddNoteForm from './components/AddNoteForm';
import NoteCard from './components/NoteCard';
import { Header } from './components/Header';
import { NoNotes } from './components/NoNotes';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

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
          <main>
            <AddNoteForm onAddNote={handleAddNote} />
            {notes.length === 0 ? (
              <NoNotes />
            ) : (
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.map(note => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote}/>
                ))}
              </div>
            )}
          </main>
      </div>
    </div>
  );
};

export default App;
