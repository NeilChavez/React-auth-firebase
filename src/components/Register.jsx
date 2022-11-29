import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
export default function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuthContext();

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
      await signUp(form.email, form.password);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  const handleClickWithGoogle = async (e) => {
    e.preventDefault();
    await signInWithGoogle();
    navigate("/")
  };
  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          value={form.email}
          id="email"
          type="email"
          name="email"
          placeholder="Register with your email..."
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
        <input type="submit" value="Registrate" />
      </form>
      <button onClick={handleClickWithGoogle}>Entra con Google</button>
    </div>
  );
}
