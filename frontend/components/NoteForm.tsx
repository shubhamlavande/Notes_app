import React, { useState } from 'react';

interface NoteFormProps {
  onCreateNote: (title: string, content: string) => Promise<void>;
}

const NoteForm: React.FC<NoteFormProps> = ({ onCreateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }
    await onCreateNote(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div className="add-note-form">
      <h3>Create New Note</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;