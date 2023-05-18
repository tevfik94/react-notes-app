import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <>
      <h1>Login Page</h1>
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
      <br></br>
      <span>Do you have an account?</span>
      <Link to="/register">
        <button>register</button>
      </Link>
    </>
  );
}

export default LoginPage;
