import "./navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src="admin.svg" alt="" />
        <span>Admin DashBoard</span>
      </div>
      <div className="icons">
        <img src="./search.svg" alt=""/>
        <img src="/app.svg" alt=""/>
        <img src="/expand.svg" alt=""/>
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
        <img src="/settings.svg" alt=""/>
      </div>
    </div>
  );
};

export default Navbar;
