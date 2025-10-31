import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

import { Note } from './types';
import AddNoteForm from './components/AddNoteForm';
import NoteCard from './components/NoteCard';
import { Header } from './components/Header';
import { NoNotes } from './components/NoNotes';
import Login from './components/Login';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'notes'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        setNotes(notesData);
      });
      
      return () => unsubscribe();
    } else {
      setNotes([]);
    }
  }, [user]);

  const handleAddNote = async (title: string, content: string) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'notes'), {
        title,
        content,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao adicionar nota:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
    }
  };
  
  const handleEditNote = async (id: string, newTitle: string, newContent: string) => {
    try {
      await updateDoc(doc(db, 'notes', id), {
        title: newTitle,
        content: newContent,
      });
    } catch (error) {
      console.error("Erro ao editar nota:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header user={user} />
        {!user ? (
          <Login />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default App;
