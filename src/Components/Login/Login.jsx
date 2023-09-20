import React, { useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // ...
        setError(null);
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  if (user) {
    navigate("/");
    return;
  }

  return (
    <div>
      {!user ? (
        <div className="loginParentDiv">
          <img width="200px" height="200px" src={Logo}></img>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="fname"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              defaultValue="John"
            />

            <br />
            <span style={{ color: "red" }}>
              {email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                "Enter a valid email"}
            </span>
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="lname"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              defaultValue="Doe"
            />
            <br />
            <span style={{ color: "red" }}>
              {error ? "Invalid login credentials" : ""}
            </span>
            <br />
            <button>Login</button>
          </form>
          <Link to={"/sign-up"}>Signup</Link>
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          Already logged in !! Redirecting to home
        </div>
      )}
    </div>
  );
}

export default Login;
