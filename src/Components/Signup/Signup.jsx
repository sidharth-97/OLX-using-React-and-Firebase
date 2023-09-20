import React, { useState } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FirebaseContext } from "../../Context/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: userName,
      });
      console.log(userCredential);
      const user = userCredential.user;
      userCredential.user.displayName = userName;
      const db = getFirestore();
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: userName,
        phone: phone,
      });
      setError(null);
      navigate("/login");
    } catch (error) {
      const errorCode = error.code.substring(5);
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      setError(errorCode);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
            defaultValue="John"
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {userName &&
              !/^[a-zA-Z]{3,}$/.test(userName) &&
              "Must have at least 3 letters"}
          </span>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname2"
            name="email"
            defaultValue="John"
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              "Enter a valid email"}
          </span>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {phone &&
              !/^[0-9]{10}$/.test(phone) &&
              "Enter a valid mobile number (10 digits)"}
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
            required
          />
          <br />
          <span style={{ color: "red" }}>
            {password &&
              !/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password) &&
              "Need at least 6 characters and contain at least one number"}
          </span>
          <br />
          <span style={{ color: "red" }}>{error && error}</span>
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
