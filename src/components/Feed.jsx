import Share from "./Share";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
export default function Feed({ username }) {
  const [post, setPost] = useState([]);
  // Get Login User
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("http://localhost:5000/posts/profile/" + username)
        : await axios.get(`http://localhost:5000/posts/timeline/${user._id}`);
      setPost(
        res.data.allPost.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user]);
  return (
    <div className="feed">
      <div className="feed-wrapper">
        {(!username || username === user.username) && <Share />}
        {post.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </div>
  );
}
