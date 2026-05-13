import React, { useState, useEffect } from 'react';
import { Note } from '../types';

interface EditModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, title: string, content: string) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ note, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    if (note && title.trim() && content.trim()) {
      await onSave(note._id, title, content);
      onClose();
    }
  };

  if (!isOpen || !note) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Note</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSave} className="btn">Save</button>
          <button onClick={onClose} className="btn cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;