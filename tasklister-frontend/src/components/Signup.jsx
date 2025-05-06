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
  
    try {
      const response = await fetch("https://task-manager-4iiq.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordconfirmation,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const { token, user } = data;
  
        // Store the JWT token
        localStorage.setItem("token", token);
  
        // Set current user
        setCurrentUser(user);
        navigate("/tasks");
      } else {
        setErrors(data.errors || ["Signup failed"]);
      }
    } catch (err) {
      setErrors(["Network error. Please try again later."]);
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
