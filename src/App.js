import React, { useContext, useEffect } from "react";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { AuthContext } from "./Context/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./Context/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        const uid = user.uid;
      } else {
        // User is signed out
      }
    });
  });
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
