
import { useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      localStorage.removeItem("token");     // Remove the JWT
      setCurrentUser(null);                 // Clear user state
      navigate("/");                        // Redirect to login
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
              
              <a className="mx-2 hover:underline" href="/signup">Signup</a>
            </>
          )}
        </div>
      </nav>
    );
  }

export default Navbar;
