import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditNotePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [updatedNote, setUpdatedNote] = useState({ title: "", body: "" });

  useEffect(() => {
    fetch(`https://ubade.pythonanywhere.com/api/notes?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setNote(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setUpdatedNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const updateNote = () => {
    const { title, body } = updatedNote;

    fetch(`https://ubade.pythonanywhere.com/api/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: parseInt(id),
        title: title || note[0].title,
        body: body || note[0].body,
        color: "string",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Note updated successfully");
        navigate("/notes");
      })
      .catch((error) => console.error(error));
  };
  const handleCancel = () => {
    navigate("/notes");
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {note.map((note) => (
        <div key={note.id}>
          <textarea
            name="title"
            value={updatedNote.title || note.title}
            onChange={handleNoteChange}
          />
          <textarea
            name="body"
            value={updatedNote.body || note.body}
            onChange={handleNoteChange}
          />
        </div>
      ))}
      <button onClick={updateNote}>Update Note</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EditNotePage;
