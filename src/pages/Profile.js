import Topnav from "../components/Topnav";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  // Get Ptofile User
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/users?username=${username}`
      );
      setUser(res.data.others);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topnav />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                src={
                  user.coverPicture
                    ? PF + "/person/" + user.coverPicture
                    : PF + "/person/1.jpg"
                }
                alt=""
                className="cover-img"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + "/person/" + user.profilePicture
                    : PF + "/person/3.jpg"
                }
                alt=""
                className="user-img"
              />
            </div>
            <div className="profile-info">
              <h4>{user.username}</h4>
              <p>{user.desc}</p>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
