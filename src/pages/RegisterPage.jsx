import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registerPage.scss";
function RegisterPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputs.password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(inputs.password)) {
      setError("Password should contain at least one uppercase letter.");
      return;
    }

    const response = await fetch(
      "https://ubade.pythonanywhere.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }),
      }
    );

    const { token } = await response.json();

    // Store token in local storage
    localStorage.setItem("token", token);
    navigate("/notes");
  }

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Notes App</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <span>Do you have an account?</span>
          <Link to="/">
            <button>Login</button>
          </Link>
        </div>
        <div className="left">
          <h1>Register</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
