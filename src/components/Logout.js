import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState([]);
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const handleLogout = () => {
    localStorage.setItem('authenticated', false);
    setUserInfo(null);
    navigate('/');
    console.log('User logged out');
  };

  return (
    <div>
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          LogOut
      </button>
    </div>
  );
};

export default Logout;