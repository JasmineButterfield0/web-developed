import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!title.trim() && !body.trim()) return;

    if (editingId) {
      setNotes(prev =>
        prev.map(n =>
          n.id === editingId
            ? { ...n, title: title.trim(), body: body.trim(), updatedAt: new Date().toISOString() }
            : n
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: generateId(),
        title: title.trim(),
        body: body.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes(prev => [newNote, ...prev]);
    }

    setTitle('');
    setBody('');
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setBody('');
    }
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setBody(note.body);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setBody('');
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const filtered = notes.filter(n => {
    const q = search.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notes</h1>
        <span className="note-count">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
      </header>

      <div className="editor-section">
        <h2 className="editor-title">{editingId ? 'Edit Note' : 'New Note'}</h2>
        <input
          className="input-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && document.querySelector('.editor-highlighted textarea').focus()}
        />
        <div className="editor-highlighted">
          <Editor
            value={body}
            onValueChange={setBody}
            highlight={code => Prism.highlight(code, Prism.languages.markdown, 'markdown')}
            padding={10}
            placeholder="Write your note in Markdown..."
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.6',
              minHeight: '120px',
            }}
          />
        </div>
        <div className="editor-actions">
          <button
            className="btn btn-primary"
            onClick={saveNote}
            disabled={!title.trim() && !body.trim()}
          >
            {editingId ? 'Save Changes' : 'Add Note'}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {notes.length > 0 && (
        <div className="search-section">
          <input
            className="input-search"
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      <div className="notes-list">
        {filtered.length === 0 && search && (
          <p className="empty-state">No notes match "{search}"</p>
        )}
        {filtered.length === 0 && !search && (
          <p className="empty-state">No notes yet. Create your first one above!</p>
        )}
        {filtered.map(note => (
          <div key={note.id} className={`note-card${editingId === note.id ? ' editing' : ''}`}>
            {note.title && <h3 className="note-title">{note.title}</h3>}
            {note.body && <p className="note-body">{note.body}</p>}
            <div className="note-footer">
              <span className="note-date">{formatDate(note.updatedAt)}</span>
              <div className="note-actions">
                <button className="btn-icon btn-edit" onClick={() => startEdit(note)} title="Edit">
                  Edit
                </button>
                <button className="btn-icon btn-delete" onClick={() => deleteNote(note.id)} title="Delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
