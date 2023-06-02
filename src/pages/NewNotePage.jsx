import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/newNotePage.scss";

function NewNotePage() {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    body: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "body" && value.length > 400) {
      return;
    }
    if (name === "title" && value.length > 100) {
      return;
    }
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/notes");
      })
      .catch((error) => {
        console.log(error);
        // handle error if needed
      });
  }
  const handleCancel = () => {
    navigate("/notes");
  };
  const characterCount = note.body.length;
  const titleCount = note.title.length;

  return (
    <div className="new-note">
      <div className="note-card">
        <h1>New Note</h1>
        <form onSubmit={handleSubmit}>
          <div className="note-title">
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Title"
              maxLength={100}
            />
            <small className="character-count">{titleCount}/100 </small>
          </div>
          <div className="note-body">
            <textarea
              name="body"
              value={note.body}
              onChange={handleChange}
              placeholder="Your Note"
              maxLength={400}
            />
            <small className="character-count">{characterCount}/400 </small>
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewNotePage;
