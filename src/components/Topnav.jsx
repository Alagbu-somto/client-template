// import profilePicture from "./assets/person/1.jpg";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Topnav() {
  const { user } = useContext(AuthContext);
  return (
    <div className="topbar-container">
      <div className="topbar-logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>logo</span>
        </Link>
      </div>
      <div className="topbar-search">
        <Search className="search-icon" />
        <input
          name="search-bar"
          className="search-bar"
          placeholder="search for friends,text or videos"
        />
      </div>
      <div className="menu">
        <ul>
          <li>Homepage</li>
          <Link to="/messenger">
            <li>Timeline</li>
          </Link>
        </ul>
        <div className="icon">
          <Person />
          <span className="icon-badge">1</span>
        </div>
        <div className="icon">
          <Chat />
          <span className="icon-badge">1</span>
        </div>
        <div className="icon">
          <Notifications />
          <span className="icon-badge">1</span>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture || PF + "/person/1.jpg"} alt="" />
        </Link>
      </div>
    </div>
  );
}
