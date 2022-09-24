import gift from "./assets/postImg/gift-box.png";
import ad from "./assets/postImg/ad.jpg";
import profileImg from "./assets/person/4.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { Follow, Unfollow } from "../context/authAction";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  // Get Login User
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [follow, setFollow] = useState(false);

  // Get Ptofile User Friends
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:5000/users/friends/" + user._id
        );
        setFriends(friendList.data);
        setFollow(currentUser.followings.includes(user?._id));
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, currentUser]);
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthday-container">
          <img src={gift} alt="" />
          <p>
            <b>Jude Emeka</b>and <b>3 other friends</b> has a birthday today.
          </p>
        </div>
        <img className="ad-img" src={ad} alt="" />
        <h4>Online Friends</h4>
        <ul className="rightbar-friend-list">
          <li>
            <div className="rightbar-img-container">
              <img src={profileImg} alt="" />
              <span className="rightbar-online"></span>
            </div>
            <h4>John carter</h4>
          </li>
          <li>
            <div className="rightbar-img-container">
              <img src={profileImg} alt="" />
              <span className="rightbar-online"></span>
            </div>
            <h4>John carter</h4>
          </li>
          <li>
            <div className="rightbar-img-container">
              <img src={profileImg} alt="" />
              <span className="rightbar-online"></span>
            </div>
            <h4>John carter</h4>
          </li>
          <li>
            <div className="rightbar-img-container">
              <img src={profileImg} alt="" />
              <span className="rightbar-online"></span>
            </div>
            <h4>John carter</h4>
          </li>
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    const handleClick = async () => {
      try {
        if (follow) {
          await axios.put(
            "http://localhost:5000/users/" + user._id + "/unfollow",
            { userId: currentUser._id }
          );
          dispatch(Follow(user._id));
        } else {
          await axios.put(
            "http://localhost:5000/users/" + user._id + "/follow",
            { userId: currentUser._id }
          );
          dispatch(Unfollow(user._id));
        }
        setFollow(!follow);
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="btn-follow" onClick={handleClick}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbar-title">User information</h4>
        <div className="rightbar-info">
          <p>
            <b>City:</b>
            {user.city}
          </p>
          <p>
            <b>From:</b>
            {user.from}
          </p>
          <p>
            <b>Relationship:</b> {user.relationship}
          </p>
        </div>
        <h4 className="rightbar-title">User Friends</h4>
        <div className="right-bar-followings">
          {friends.map((friend) => {
            return (
              <Link to={"/profile/" + friend.username}>
                <div className="right-bar-following">
                  <img
                    src={
                      friend.profilepicture
                        ? PF + "/person/" + friend.profilepicture
                        : PF + "/person/1.jpg"
                    }
                    alt=""
                  />
                  <span>{friend.username}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      {user ? <ProfileRightBar /> : <HomeRightBar />}
    </div>
  );
}
