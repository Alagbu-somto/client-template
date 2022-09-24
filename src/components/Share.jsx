// import profilePics from "./assets/person/1.jpg";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("file", file, filename);
      newPost.image = filename;
      try {
        await axios.post("http://localhost:5000/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("http://localhost:5000/posts/", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(file);
  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            className=""
            src={user.profilePicture || PF + "/person/1.jpg"}
            alt=""
          />
          <input
            placeholder={"What's on your mind " + user.username + "?"}
            ref={desc}
          />
        </div>
        <hr />
        {file && (
          <div className="share-img-container">
            <img src={URL.createObjectURL(file)} alt="" />
            <Cancel className="share-cancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="share-bottom" onSubmit={handleSubmit}>
          <label htmlFor="file" className="share-options">
            <PermMedia htmlColor="tomato" />
            <span>Photo or Video</span>
            <input
              style={{ display: "none" }}
              id="file"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className="share-options">
            <Label htmlColor="blue" />
            <span>Tag</span>
          </div>
          <div className="share-options">
            <Room htmlColor="green" />
            <span>Location</span>
          </div>
          <div className="share-options">
            <EmojiEmotions htmlColor="gold" />
            <span>Feelings</span>
          </div>
          <button type="submit" className="share-btn">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
