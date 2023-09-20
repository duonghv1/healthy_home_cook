import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth
} from "../../lib/firebase";
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

  // TODO:
  // This component consolidates logging in and creating an account into one
  // component. It should use a state variable to render the two different
  // forms.

  const [isLogin, setIsLogin] = useState(true);

  // TODO:
  // Handle submission of the form. If a user is logging in, then this function
  // should call the `signInWithEmailAndPassword` function to log the user in.
  // Otherwise, it should call the `createUserWithEmailAndPassword` function to
  // create an account for the user. Regardless of which function was called,
  // redirect the user to the home page afterwards.
  function handleSubmit(e) {
    e.preventDefault(); 
    if (isLogin){
      signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((userCredential) =>{
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, userInput.email, userInput.password)
        .then((userCredential) =>{
          navigate("/");
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }

  return (
    <form className="login-form" method="post" onSubmit={handleSubmit}>
      {isLogin ? (
        <>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="f-email">Email</label>
            <input
              type="email"
              id="f-email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="f-password">Password</label>
            <input
              type="password"
              id="f-password"
              name="password"
              value={userInput.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="convert"
              onClick={() => setIsLogin(!isLogin)}
            >
              Create Account
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Create Account</h1>
          <div className="form-group">
            <label htmlFor="f-email">Email</label>
            <input
              type="text"
              id="f-email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="f-password">Password</label>
            <input
              type="password"
              id="f-password"
              name="password"
              value={userInput.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="f-confirm-password">Confirm Password</label>
            <input
              type="password"
              id="f-confirm-password"
              name="confirmPassword"
              value={userInput.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="convert"
              onClick={() => setIsLogin(!isLogin)}
            >
              Have an account? Log in.
            </button>
          </div>
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
