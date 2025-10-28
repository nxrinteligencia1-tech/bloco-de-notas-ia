
import React, { useState, useEffect } from 'react';
import { Note } from './types';
import AddNoteForm from './components/AddNoteForm';
import NoteCard from './components/NoteCard';
import { Header } from './components/Header';
import { NoNotes } from './components/NoNotes';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Erro ao carregar notas do localStorage:", error);
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    try {
      setNotes(newNotes);
      localStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error("Erro ao salvar notas no localStorage:", error);
    }
  };

  const handleAddNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    saveNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };
  
  const handleEditNote = (id: number, newTitle: string, newContent: string) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    );
    saveNotes(updatedNotes);
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
