import { useState, useEffect } from "react";
import LinkInputOverlay from "../LinkInputOverlay/LinkInputOverlay";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Backdrop from "../Backdrop/Backdrop";
import Notifications from "../Notifications/Notifications";
import Modal from "../Modal/Modal";
import { IoCopy } from "react-icons/io5";
import copy from "copy-to-clipboard";
import "./LinkGenerator.css";

const LinkGenerator = () => {
  const [linkInput, setLinkInput] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [authState, setAuthState] = useState(false);
  const [showNotifxn, setShowNotifications] = useState("");
  const [notifxnsMsg, setNotifxnsMsg] = useState("");
  const [notifxnsError, setNotifxnsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const showInputLinkHandler = () => {
    if (!authState) {
      setShowNotifications(() => true);
      setNotifxnsMsg(() => "Please Login to create");
      setNotifxnsError(() => true);
      setTimeout(() => setShowNotifications(() => false), 1000);
      return;
    }
    setLinkInput((prev) => !prev);
  };

  const showLoginHandler = () => {
    setShowSignup(() => false);
    setShowLogin(() => true);
  };

  const showSignupHandler = () => {
    setShowSignup(() => true);
    setShowLogin(() => false);
  };

  const closeAuthActions = () => {
    setShowSignup(() => false);
    setShowLogin(() => false);
  };

  const logOutHandler = () => {
    setAuthState(() => false);
    localStorage.removeItem("login");
    localStorage.removeItem("userId");
    setTableData(() => []);
    setShowNotifications(() => true);
    setNotifxnsMsg(() => "Logged out successfully");
    setNotifxnsError(() => false);
    setTimeout(() => setShowNotifications(() => false), 1000);
  };

  const calculateTimeRemaining = (expirationTime) => {
    const expirationDate = new Date(expirationTime).getTime();
    const now = new Date().getTime();
    const distance = expirationDate - now;

    if (distance <= 0) {
      return "Expired!";
    } else {
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, "0")} hrs:${minutes
        .toString()
        .padStart(2, "0")} mins:${seconds.toString().padStart(2, "0")} sec`;
    }
  };

  const closeAnalyticsHandler = () => {
    setShowModal(() => false);
    setModalMsg(() => []);
  };

  useEffect(() => {
    {
      authState &&
        (async () => {
          const req = await fetch(
            `https://apricot-fossa-sock.cyclic.app/getAllLinks/${localStorage.getItem(
              "userId"
            )}`
          );
          const res = await req.json();

          if (res.msg == "error") return;
          setTableData(() => res);
        })();
    }
  }, [linkInput, authState]);

  useEffect(() => {
    if (localStorage.getItem("login") == 1) {
      setAuthState(() => true);
    } else {
      setAuthState(() => false);
    }
  }, [showLogin, showSignup, authState]);

  return (
    <div>
      <nav className="main_nav">
        <ul>
          <li>Short Link generator</li>
          <li>
            <button onClick={authState ? logOutHandler : showLoginHandler}>
              {authState ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
      <main>
        <section className="new_link___genbtn">
          <button onClick={showInputLinkHandler}>Generate new link</button>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Original Link</th>
                <th>Short url</th>
                <th>Expires at</th>
                <th>Show analytics</th>
              </tr>
            </thead>
            <tbody>
              {!tableData.length && (
                <tr style={{ width: "100%" }}>
                  <td>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginLeft: "-82px",
                      }}
                    >
                      Couldn't find anything,create a new link
                    </div>
                  </td>
                </tr>
              )}
              {tableData &&
                tableData?.map((row) => {
                  const linkRouterHandler = () => {
                    window.open(
                      `https://apricot-fossa-sock.cyclic.app/${row.shorturl}`
                    );
                  };

                  const showAnalyticsHandler = async () => {
                    const req = await fetch(
                      `https://apricot-fossa-sock.cyclic.app/getlinkanalytics/${row.shorturl}`
                    );
                    const res = await req.json();
                    setShowModal(() => true);
                    const newArray = res.map((el) => JSON.parse(el.data));
                    setModalMsg(() => newArray);
                  };

                  const remainingTime = calculateTimeRemaining(row.expiresat);

                  const copyToClipboard = () => {
                    const urlToCopy = `https://apricot-fossa-sock.cyclic.app/${row.shorturl}`;
                    copy(urlToCopy);
                    setShowNotifications(() => true);
                    setNotifxnsMsg(() => "Copied to clipboard");
                    setNotifxnsError(() => false);
                    setTimeout(() => setShowNotifications(() => false), 1000);
                  };
                  return (
                    <tr key={row.id}>
                      <td>{row.urlname}</td>
                      <td>{row.originalurl}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <span onClick={linkRouterHandler}>{row.shorturl}</span>
                        <IoCopy
                          color="green"
                          size={30}
                          onClick={copyToClipboard}
                        />
                      </td>
                      <td>{remainingTime}</td>
                      <td>
                        <button onClick={showAnalyticsHandler}>show</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      </main>
      {linkInput && <LinkInputOverlay sih={showInputLinkHandler} />}
      {showLogin && <Login ssh={showSignupHandler} caa={closeAuthActions} />}
      {showSignup && <SignUp sih={showLoginHandler} caa={closeAuthActions} />}
      {(linkInput || showLogin || showSignup || showModal) && <Backdrop />}
      <Notifications
        msg={notifxnsMsg}
        showNotifications={showNotifxn}
        error={notifxnsError}
      />
      {showModal && <Modal msg={modalMsg} ok={closeAnalyticsHandler} />}
    </div>
  );
};

export default LinkGenerator;
