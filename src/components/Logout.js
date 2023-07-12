import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState([]);
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const handleLogout = () => {
    localStorage.setItem('authenticated', false);
    setUserInfo(null);
    console.log('User logged out');
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout} className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">
          LogOut
      </button>
    </div>
  );
};

export default Logout;