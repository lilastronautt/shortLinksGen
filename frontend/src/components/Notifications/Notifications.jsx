import "./Notifications.css";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const Notifications = ({ msg, showNotifications, error }) => {
  return (
    <div className={showNotifications ? "msg show" : "msg"}>
      {error ? <RxCross2 className="error" /> : <TiTick className="add" />}
      {msg}
    </div>
  );
};

export default Notifications;
