import { useContext, useEffect, useRef, useState } from "react";
import Topnav from "../components/Topnav";
import Conversation from "../components/conversation";
import Message from "../components/Message";
import Chatonline from "../components/Chatonline";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { useResolvedPath } from "react-router-dom";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();

  // connect socket server
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        sender: data.userId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // check and update messages
  useEffect(() => {
    incomingMessage &&
      currentChat?.members.includes(incomingMessage.sender) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, currentChat]);

  // Send and get users socket id to server
  useEffect(() => {
    socket.current.emit("sendUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  // Get conversation
  useEffect(() => {
    const getConvesation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/coversation/" + user._id
        );
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConvesation();
  }, [user]);

  // Get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/messages/" + currentChat._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // Save new messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      userId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:5000/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topnav />
      <div className="messenger">
        <div className="chat-menu">
          <div className="chatwrapper-menu">
            <input
              name=""
              placeholder="search for friends"
              className="chat-menu-input"
            />
            {conversation.map((c) => {
              return (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-box">
          <div className="chatwrapper-box">
            {currentChat ? (
              <>
                <div className="chatbox-top">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          key={m._id}
                          message={m}
                          own={m.sender === user._id}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatbox-bottom">
                  <textarea
                    placeholder="write something...."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button onClick={handleSubmit}>send</button>
                </div>
              </>
            ) : (
              <span className="noCoversation">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chat-online">
          <div className="chatwrapper-online">
            <Chatonline
              onlineUsers={onlineUsers}
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
