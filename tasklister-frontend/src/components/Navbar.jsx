
import { useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      fetch("https://task-manager-4iiq.onrender.com/logout", {
        method: "DELETE",
        credentials: "include"
      })
      .then(() => {
        setCurrentUser(null);
        navigate("/");
      });
    };
    
    return (
      <nav className="flex justify-around items-center bg-blue-600 text-white p-4">
        <a href="/tasks" className="text-xl font-bold">Task Manager</a>
        <div>
          {currentUser ? (
            <>
              <button onClick={handleLogout} className="ml-4 bg-red-500 px-2 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <a className="mx-2 hover:underline" href="/">Login</a>
              <a className="mx-2 hover:underline" href="/signup">Signup</a>
            </>
          )}
        </div>
      </nav>
    );
  }

export default Navbar;
