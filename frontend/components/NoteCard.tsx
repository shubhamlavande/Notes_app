import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-date">
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </div>
      <div className="note-actions">
        <button onClick={() => onEdit(note)} className="btn edit-btn">Edit</button>
        <button onClick={() => onDelete(note._id)} className="btn delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;