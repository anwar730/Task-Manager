import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("https://task-manager-4iiq.onrender.com/me", { credentials: "include" })
      .then((r) => {
        if (r.ok) {
          r.json().then(user => {
            setCurrentUser(user);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Error checking authentication:", err);
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
