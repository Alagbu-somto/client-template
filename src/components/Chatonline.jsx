import axios from "axios";
import { useEffect, useState } from "react";
// import img from "./assets/postImg/2.jpg";
function Chatonline({ onlineUsers, currentUserId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setfriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getfriends = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/users/friends/" + currentUserId
        );
        setfriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getfriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/coversation/find/${currentUserId}/${user._id}`
      );
      console.log("working");
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatonline">
      {onlineFriends.map((friend) => {
        return (
          <div
            className="chatonline-friend"
            onClick={() => handleClick(friend)}
          >
            <div className="chatonline-container">
              <img
                src={
                  friend.profilepicture
                    ? PF + "/person/" + friend.profilepicture
                    : PF + "/person/1.jpg"
                }
                alt=""
              />
              <div className="chatonline-badge"></div>
            </div>
            <span>{friend.username}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Chatonline;
