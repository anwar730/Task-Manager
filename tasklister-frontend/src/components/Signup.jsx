import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ setCurrentUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordconfirmation, setPasswordconfirmation] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password, password_confirmation: passwordconfirmation }),
    });

    if (response.ok) {
      // After signup, fetch the current user
      const meResponse = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (meResponse.ok) {
        const userData = await meResponse.json();
        setCurrentUser(userData); // <-- Set current user globally
        navigate("/tasks");
      }
    } else {
      response.json().then((err) => setErrors(err.errors));
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {errors.map((err) => (
          <h3 key={err} className="text-red-600 my-4">{err}</h3>
        ))}
        <input
          type="text"
          placeholder="Name"
          className="input mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          className="input mb-4"
          value={passwordconfirmation}
          onChange={(e) => setPasswordconfirmation(e.target.value)}
          required
        />
        <button className="btn w-full" type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
