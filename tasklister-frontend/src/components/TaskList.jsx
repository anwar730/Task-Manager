import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";


function TaskList({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // For search input
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function isDueToday(dateString) {
    const today = new Date();
    const dueDate = new Date(dateString);
    return (
      dueDate.getFullYear() === today.getFullYear() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getDate() === today.getDate()
    );
  }
  function handleDelete(taskId) {
    const token = localStorage.getItem("token");
    fetch(`https://task-manager-4iiq.onrender.com/users/${currentUser.id}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
      });
  }
  

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    fetch(`https://task-manager-4iiq.onrender.com/users/${currentUser.id}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(r => r.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, [currentUser, navigate]);
  

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!currentUser) return null;
  if (loading) return <div className="text-center p-8">Loading tasks...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}</h2>
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 w-full border rounded"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-center p-8 mb-8 bg-white rounded shadow">
          No tasks found. <a href="/createtasks" className="text-blue-500">Create one!</a>
        </p>
      ) : (
        <ul className="space-y-4 mb-8">
          {filteredTasks.map((task) => {
            const isPast = new Date(task.due_date) < new Date();
            const isToday = isDueToday(task.due_date);
            const color = isPast
              ? "bg-red-100 border-red-500"
              : isToday
              ? "bg-yellow-100 border-yellow-500"
              : "bg-gray-100 border-gray-500";

            return (
              <li key={task.id} className={`p-4 rounded shadow border ${color}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <p className="text-gray-700 mt-2">{task.description}</p>
                    <p className="text-gray-700 mt-2">
                      {format(new Date(task.due_date), "dd MMMM yyyy")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                    aria-label="Delete Task"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <a className="bg-blue-600 text-center px-4 py-2 rounded" href="/createtasks">
        Add Task
      </a>
    </div>
  );
}

export default TaskList;
