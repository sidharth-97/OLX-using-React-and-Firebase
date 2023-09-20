import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import "./View.css";
import { PostContext } from "../../Context/PostContext";
import { firebase } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!postDetails) {
      Navigate("/");
      return;
    }
    const fetchUserDetails = async () => {
      try {
        const id = postDetails.userId;
        console.log(id);
        const db = getFirestore(firebase);
        const q = query(collection(db, "users"), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data(), "user data");
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <div className="viewParentDiv">
      {postDetails ? (
        <>
          <div className="imageShowDiv">
            <img src={postDetails.image} alt="image" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails.price} </p>
              <span> {postDetails.name} </span>
              <p>{postDetails.category}</p>
              <span> {postDetails.date} </span>
            </div>
            <div className="contactDetails">
              <p>Seller details</p>
              <p>Name: {userDetails?.displayName}</p>
              <p>Phone: {userDetails?.phone}</p>
            </div>
          </div>
        </>
      ) : (
        Navigate("/")
      )}
    </div>
  );
}
export default View;
