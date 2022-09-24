import {
  RssFeed,
  WorkOutline,
  HelpOutline,
  Event,
  School,
  Bookmark,
  Group,
  Message,
  PlayCircleFilledOutlined,
} from "@material-ui/icons";
import friend from "./assets/person/2.jpg";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <ul>
          <li>
            <RssFeed className="sidebar-icon" />
            Feed
          </li>
          <li>
            <Message className="sidebar-icon" />
            Chat
          </li>
          <li>
            <PlayCircleFilledOutlined className="sidebar-icon" />
            Video
          </li>
          <li>
            <Group className="sidebar-icon" />
            Group
          </li>
          <li>
            <Bookmark className="sidebar-icon" />
            Bookmark
          </li>
          <li>
            <HelpOutline className="sidebar-icon" />
            Questions
          </li>
          <li>
            <WorkOutline className="sidebar-icon" />
            Jobs
          </li>
          <li>
            <Event className="sidebar-icon" />
            Event
          </li>
          <li>
            <School className="sidebar-icon" />
            Courses
          </li>
        </ul>
        <button className="sidebar-btn">show more</button>
        <hr />
        <ul>
          <li>
            <img className="sidebar-friend-img" src={friend} alt="" />
            <span className="sidebar-friend-name">Jane doll</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
