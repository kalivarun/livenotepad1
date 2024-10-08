// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [notepads, setNotepads] = useState([]);
  const [currentNotepad, setCurrentNotepad] = useState(null);
  const [content, setContent] = useState("");

  const addNotepad = () => {
    const filename = prompt("Enter the notepad name:");
    if (filename) {
      setNotepads([...notepads, { id: Date.now(), filename, content: "" }]);
    }
  };

  const selectNotepad = (id) => {
    const selectedNotepad = notepads.find(notepad => notepad.id === id);
    setCurrentNotepad(selectedNotepad);
    setContent(selectedNotepad.content);
  };

  const saveContent = () => {
    setNotepads(
      notepads.map(notepad =>
        notepad.id === currentNotepad.id ? { ...notepad, content } : notepad
      )
    );
    alert("Notepad content saved!");
  };

  const deleteNotepad = (id) => {
    setNotepads(notepads.filter(notepad => notepad.id !== id));
    setCurrentNotepad(null);
    setContent("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hacking Book</h1>
      <button onClick={addNotepad} style={{ marginBottom: "20px", padding: "10px 20px" }}>+ Add Notepad</button>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {notepads.map(notepad => (
          <div key={notepad.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <h3>{notepad.filename}</h3>
            <button onClick={() => selectNotepad(notepad.id)} style={{ marginRight: "10px" }}>Open</button>
            <button onClick={() => deleteNotepad(notepad.id)} style={{ background: "red", color: "white" }}>Delete</button>
          </div>
        ))}
      </div>

      {currentNotepad && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
          <h2>{currentNotepad.filename}</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <button onClick={saveContent} style={{ padding: "10px 20px" }}>Save</button>
        </div>
      )}
    </div>
  );
}
