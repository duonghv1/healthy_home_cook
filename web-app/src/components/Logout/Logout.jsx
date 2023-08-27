import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../lib/firebase";
function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO:
    // When clicking the logout link at the top, the `signOut` function should
    // be called to sign the user out. The user should then be redirected to the
    // home page.
    signOut(auth).then(()=>{
      navigate("/");
    })
  });
  return <></>;
}

export default Logout;
