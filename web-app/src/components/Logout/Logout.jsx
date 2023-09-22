import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // When clicking the logout link at the top, the `signOut` function should
  //   // be called to sign the user out. The user should then be redirected to the
  //   // home page.
    
  // });
  return (
    <div className="login-container">
      <button id="logout-btn" style={{ width: 'auto' }} onClick={()=>{
        signOut(auth).then(()=>{
          navigate("/");
        })
      }}>Log out</button>
    </div>
  );
}

export default Logout;
