import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({setCurrentUser}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    console.log("Sending login data:", { name, password });

    const response = await fetch("https://task-manager-4iiq.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, password }),
    });
  
    if (response.ok) {
      const userData = await response.json();
      setCurrentUser(userData);
      navigate("/tasks");
    } else {
      try {
        const err = await response.json(); // safer
        setErrors(err.errors || ["Login failed."]);
      } catch (e) {
        // Server didn't return JSON (or returned nothing)
        setErrors(["Unexpected error. Please try again."]);
      }
    }
  }
  

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          type="password"
          placeholder="Password"
          className="input mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn w-full" type="submit">Login</button>
        <p className="text-center mt-4">
          No account? <a className="text-blue-500" href="/signup">Signup</a>
        </p>
      </form>
      
    </div>
  );
}

export default Login;
