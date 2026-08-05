import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO 3: on page load, fetch all notes from GET /api/notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // TODO 4: send a POST request with { title, content }, then update the list
  const handleAddNote = async () => {
    if (!title.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const newNote = await response.json();

      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>MicroNotes</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ marginRight: "10px" }}
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddNote} disabled={!title.trim()}>
          Add Note
        </button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}:</strong> {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;