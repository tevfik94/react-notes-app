import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginPage.scss";

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ubade.pythonanywhere.com/api/login",
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

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        navigate("/notes");
      } else {
        throw new Error("Login faild");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Notes App</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
