import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure this import is present


function TaskForm({ currentUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());

  const navigate = useNavigate(); // This line is critical - it initializes the navigate function
  
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
  
    if (!currentUser) {
      alert("You must be logged in to create tasks");
      navigate("/");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      navigate("/");
      return;
    }
  
    try {
      const response = await fetch(`https://task-manager-4iiq.onrender.com/users/${currentUser.id}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          due_date: dueDate,
        }),
      });
  
      if (response.ok) {
        setTitle("");
        setDescription("");
        setDueDate("");
        navigate("/tasks");
      } else {
        const err = await response.json();
        setErrors(err.errors || ["Failed to create task."]);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  }
  
  
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        {errors.map((err) => (
          <h3 key={err} className="text-red-600 my-4">{err}</h3>
        ))}
        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          className="w-full border p-2 mb-4 h-24 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="block text-sm font-medium text-gray-700 mb-3">Due Date</label>
        <input
  type="date"
  className="input mb-4"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  min={new Date().toISOString().split("T")[0]}
  required
/> 


        <button 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" 
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;