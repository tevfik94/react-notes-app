import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewNotePage() {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    body: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
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

  return (
    <div>
      <h1>New Note</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea name="body" value={note.body} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewNotePage;
