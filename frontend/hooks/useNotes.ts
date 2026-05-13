/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { Note } from '../types';

export  const useNotes = (isLoggedIn: boolean) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchNotes = async () => {
    if (!isLoggedIn) return;
    
    setLoading(true);
    try {
      const response = await apiService.getNotes();
      if (response.success) {
        setNotes(response.data || []);
      }
    } catch (err: any) {
      setError('Failed to fetch notes');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotes();
    }
  }, [isLoggedIn]);

  const createNote = async (title: string, content: string) => {
    try {
      const response = await apiService.createNote(title, content);
      if (response.success) {
        setNotes([response.data, ...notes]);
        setSuccess('Note created successfully!');
        setTimeout(() => setSuccess(''), 3000);
        return true;
      }
    } catch (err) {
      setError('Failed to create note');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return false;
  };

  const updateNote = async (id: string, title: string, content: string) => {
    try {
      const response = await apiService.updateNote(id, title, content);
      if (response.success) {
        setNotes(notes.map(note => note._id === id ? response.data : note));
        setSuccess('Note updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
        return true;
      }
    
    } catch (err: any) {
      setError('Failed to update note');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return false;
  };

  const deleteNote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return false;

    try {
      const response = await apiService.deleteNote(id);
      if (response.success) {
        setNotes(notes.filter(note => note._id !== id));
        setSuccess('Note deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
        return true;
      }
    } catch (err: any) {
      setError('Failed to delete note');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return false;
  };

  return {
    notes,
    loading,
    error,
    success,
    createNote,
    updateNote,
    deleteNote,
    refetchNotes: fetchNotes,
  };
};