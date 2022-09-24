import React from "react";
import img from "./assets/postImg/2.jpg";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="message-top">
          <img src={img} alt="" />
          <p>{message.text}</p>
        </div>
        <span>{format(message.createdAt)}</span>
      </div>
    </>
  );
}

export default Message;
