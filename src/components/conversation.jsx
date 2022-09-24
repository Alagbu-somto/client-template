import axios from "axios";
import React, { useEffect, useState } from "react";

function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState("");

  useEffect(() => {
    const friendsId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/users?userId=" + friendsId
        );
        setUser(res.data.others);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation.members, currentUser._id]);
  return (
    <div className="conversation">
      <img
        src={
          user.profilePicture
            ? PF + "/person" + user.profilePicture
            : PF + "/person/no-avater.png"
        }
        alt=""
      />
      <span>{user.username}</span>
    </div>
  );
}

export default Conversation;
