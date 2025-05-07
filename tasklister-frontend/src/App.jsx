import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token on load:", token);
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://task-manager-4iiq.onrender.com/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((user) => {
            console.log(user)
            setCurrentUser(user);
            setLoading(false);
          });
        } else {
          localStorage.removeItem("token");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      
      <Routes>
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
        <Route path="/tasks" element={<TaskList currentUser={currentUser} />} />
        <Route path="/createtasks" element={<TaskForm currentUser={currentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
