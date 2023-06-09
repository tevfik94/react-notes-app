import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/notespage.scss";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then(() => {
        // remove the deleted note from the state
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://ubade.pythonanywhere.com/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        throw new Error("Logout faild");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (id) => {
    navigate(`/notes/edit/${id}`);
  };

  return (
    <div className="notes-page">
      <div className="header">
        <h1>Notes Page</h1>
        <div className="nav">
          <Link to="/notes/add">
            <button>Create New Note</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>

          <button onClick={() => handleDelete(note.id)}>Delete</button>
          <button onClick={() => handleEdit(note.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default NotesPage;
