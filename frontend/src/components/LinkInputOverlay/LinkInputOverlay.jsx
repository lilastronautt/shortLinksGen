import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";
import "./LinkInputOverlay.css";

const LinkInputOverlay = ({ sih }) => {
  const [formData, setFormData] = useState({
    url: "",
    urlName: "",
    userId: localStorage.getItem("userId"),
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifxnsMsg, setNotifxnsMsg] = useState("");
  const [notifxnsError, setNotifxnsError] = useState(false);

  const urlChangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, url: e.target.value };
    });
  };

  const urlNameChangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, urlName: e.target.value };
    });
  };

  const linkGenFormgandler = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const req = await fetch(
          "https://apricot-fossa-sock.cyclic.app/linkgen",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const res = await req.json();
        if (res.msg == "ok") {
          setShowNotifications(() => true);
          setNotifxnsMsg(() => "Link created successfull!!");
          setNotifxnsError(() => false);
          setTimeout(() => {
            setShowNotifications(() => false);
            sih();
          }, 2000);
        } else {
          setShowNotifications(() => true);
          setNotifxnsMsg(() => "Something went wrong");
          setNotifxnsError(() => true);
          setTimeout(() => {
            setShowNotifications(() => false);
          }, 1000);
        }
      } catch (e) {
        setShowNotifications(() => true);
        setNotifxnsMsg(() => "Something went wrong");
        setNotifxnsError(() => true);
        setTimeout(() => {
          setShowNotifications(() => false);
        }, 1000);
      }
    })();
  };

  useEffect(() => {
    document.querySelector(".link_overlay__cont")?.classList.add("moveAbove");
    setTimeout(() => {
      document
        .querySelector(".link_overlay__cont")
        ?.classList.remove("moveAbove");
    }, 1500);
  }, []);

  return (
    <div className="link_overlay__cont">
      <form onSubmit={linkGenFormgandler}>
        <div>
          <label>Url</label>
          <input
            type="text"
            placeholder="Enter your link here"
            onChange={urlChangeHandler}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name for url here"
            onChange={urlNameChangeHandler}
            required
          />
        </div>
        <button onClick={() => sih()}>cancel</button>
        <button type="submit">generate</button>
      </form>
      <Notifications
        msg={notifxnsMsg}
        showNotifications={showNotifications}
        error={notifxnsError}
      />
    </div>
  );
};

export default LinkInputOverlay;
