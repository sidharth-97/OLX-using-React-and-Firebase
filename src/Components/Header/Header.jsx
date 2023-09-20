import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../Context/Context";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {

        console.log("signpit");
        setUser("");
      })
      .catch((error) => {
        // An error happened.
      });

    navigate("/login");
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link>
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
        </Link>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user ? user.displayName : <Link to="/login">Log In</Link>}
          </span>

          <hr />
        </div>
        {user && <span onClick={logOut}>Logout</span>}


        <div
          className="sellMenu"
          onClick={() => (user ? navigate("/create") : navigate("/login"))}
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
    
      </div>
    </div>
  );
}

export default Header;
