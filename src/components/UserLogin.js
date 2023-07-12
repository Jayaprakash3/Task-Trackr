import React,{Fragment,useState} from 'react';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const clientId = process.env.REACT_APP_CLIENT_ID;

const UserLogin = () => {
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [userInfo,setUserInfo] = useState([]);
    const handleLogin = (credentialResponse) => {
        const decodedToken = jwtDecode(credentialResponse.credential);
        const userInfo = {
            email: decodedToken.email,
            name: decodedToken.name,
        };
        setUserInfo(userInfo);
        setauthenticated(true);
        localStorage.setItem("authenticated", true);
        navigate("/task" , {state: {userInfo:userInfo}});
        // navigate("/profile" , {state: {userInfo:userInfo}});
    }
    const handleFailure = (error) => {
        console.log(error);
    }
    return (
       <>
        <ul className="flex justify-center">
            <li className="mr-6">
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={handleLogin}
                        onError={handleFailure}
                        buttonText="Sign in with Google"
                    />
                </GoogleOAuthProvider>
            </li>
        </ul>
        
        </>
    );
}
export default UserLogin;

