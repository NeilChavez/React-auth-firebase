import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
export default function LogIn() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logIn, resetPasswordWithMail } = useAuthContext();

  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await logIn(form.email, form.password);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  const handleForgottenPassword = async (email) => {
    try {
      await resetPasswordWithMail(email);
      setError(
        "Ti abbiamo mandato una email con link per ristabilire la password"
      );
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
  };
  return (
    <div>
      <h2>Log in </h2>
      {/* {error && <p>{error}</p>} */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          value={form.email}
          id="email"
          type="email"
          name="email"
          placeholder="LogIn with your email..."
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          value={form.password}
          id="password"
          type="password"
          name="password"
          placeholder="insert your password..."
        />
        <br />
        <button>LogIn</button>
      </form>
      <button onClick={() => handleForgottenPassword(form.email)}>
        Forgotten password?
      </button>
    </div>
  );
}
