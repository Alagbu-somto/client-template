import postProfilePics from "./assets/person/3.jpg";
import postPics from "./assets/postImg/2.jpg";
import like from "./assets/postImg/like.png";
import heart from "./assets/postImg/heart.png";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Post({ post }) {
  const [likeCounter, setLikeCounter] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/users?userId=${post.userId}`
      );
      setUser(res.data.others);
    };
    fetchUser();
  }, [post]);
  const likeHandler = async () => {
    await axios.put(`http://localhost:5000/posts/${post._id}/like`, {
      userId: currentUser._id,
    });
    setLikeCounter(isLiked ? likeCounter - 1 : likeCounter + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="post-top">
        <div className="post-top-left">
          <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture || postProfilePics} alt="" />
          </Link>
          <h5>{user.username}</h5>
          <span>{format(post.createdAt)}</span>
        </div>
        <div className="post-top-right">
          <MoreVert />
        </div>
      </div>
      <div className="post-middle">
        <p>{post.desc}</p>
        <img src={PF + "/postImg/" + post.image} alt="" />
      </div>
      <div className="post-bottom">
        <div className="post-bottom-left">
          <img src={like} onClick={likeHandler} alt="" />
          <img src={heart} alt="" onClick={likeHandler} />
          <span>{likeCounter}people like this</span>
        </div>

        <span>9 comments</span>
      </div>
    </div>
  );
}
