import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../../lib/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  // This component consolidates logging in and creating an account into one
  // component. It should use a state variable to render the two different
  // forms.
  const [isLogin, setIsLogin] = useState(false);

  // Handle submission of the form. If a user is logging in, then this function
  // should call the `signInWithEmailAndPassword` function to log the user in.
  // Otherwise, it should call the `createUserWithEmailAndPassword` function to
  // create an account for the user. Regardless of which function was called,
  // redirect the user to the home page afterwards.
  function handleSubmit(e) {
    e.preventDefault(); 
    console.log(e);
    if (isLogin){
      console.log("Logging In");
      // Q: make sure password is similar to confirm-password?
      signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((userCredential) =>{
        navigate("/");
        console.log("logged in");
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else{
      console.log(" signing up");
      createUserWithEmailAndPassword(auth, userInput.email, userInput.password)
        .then((userCredential) =>{
          navigate("/");
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }

  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal when user clicks "Log In"
  const openModal = () => {
    setModalVisible(true);
    console.log(modalVisible);
  }

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  }

  // JSX for the login form
  return (
    <div className="login-container">
      <button id="login-btn" onClick={openModal} style={{ width: 'auto' }}>Log in</button>

      {modalVisible && (
        <div id="id01" className="modal">
          <form className="modal-content animate" onSubmit={handleSubmit} method="post">
            
            <div className="imgcontainer">
              <button onClick={closeModal} id="close" title="Close Modal">&times;</button>
            </div>
            
            <div className="section-container"><h1>Login</h1></div>
            <div className="section-container">
              
              <label htmlFor="email"><b>Email</b></label>
              <input type="email" placeholder="Enter Email" name="email" 
                value={userInput.email}  onChange={handleChange}
                required />

              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="password"
                value={userInput.password} onChange={handleChange} 
                required />

              <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userInput.confirmPassword}
                  onChange={handleChange}
                  required
                />
              {/* TODO: forgot/change password
               <span className="psw">Forgot <a href="#">password?</a></span> */}
            </div>

            <div className="section-container" style={{ backgroundColor: '#f1f1f1' }}>
              <button type="submit" onClick={() => setIsLogin(true)}>Login</button>
            </div>
            
            <div className="section-container" style={{ backgroundColor: '#f1f1f1' }}>
              <button type="submit" onClick={() => setIsLogin(false)}>Create Account</button>
            </div>
          </form>
        </div>
      )}

      {/* TODO: JavaScript-like behavior to close the modal when clicking outside
      {modalVisible && ( 
        <div onClick={closeModal} className="modal" style={{ backgroundColor: '#f1f1f1'}}></div>
      )}  */}
    </div>
  );
}


export default Login;
