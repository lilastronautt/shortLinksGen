import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Notifications from "../Notifications/Notifications";
import "./Login.css";

const Login = ({ ssh, caa }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifxnsMsg, setNotifxnsMsg] = useState("");
  const [notifxnsError, setNotifxnsError] = useState(false);

  const emailHandler = (e) => {
    setLoginData((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const passwordHandler = (e) => {
    setLoginData((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const loginFormHanlder = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const req = await fetch("https://apricot-fossa-sock.cyclic.app/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        const res = await req.json();
        if (res.msg == "yes") {
          localStorage.setItem("login", 1);
          localStorage.setItem("userId", res.userId);
          setShowNotifications(() => true);
          setNotifxnsMsg(() => "Login successfull!!");
          setNotifxnsError(() => false);
          setTimeout(() => {
            caa();
            setShowNotifications(() => false);
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

  const showSignupHandler = () => {
    document.querySelector(".user_action_form").classList.add("moveRight");
    document.querySelector(".user_action_div2").classList.add("moveLeft");
    setTimeout(() => {
      document.querySelector(".user_action_form").classList.remove("moveRight");
      document.querySelector(".user_action_div2").classList.remove("moveLeft");
      ssh();
    }, 1000);
  };

  useEffect(() => {
    document.querySelector(".user_action_form").classList.add("smoveRight");
    document.querySelector(".user_action_div2").classList.add("smoveLeft");
    setTimeout(() => {
      document
        .querySelector(".user_action_form")
        .classList.remove("smoveRight");
      document.querySelector(".user_action_div2").classList.remove("smoveLeft");
    }, 1000);
  }, []);

  return (
    <section className="user_action_parent">
      <div className="user_action__cont">
        <form className="user_action_form" onSubmit={loginFormHanlder}>
          <h1>Sign in</h1>
          <div>
            <input
              placeholder="Email"
              type="email"
              required
              onChange={emailHandler}
            />
            <input
              placeholder="Password"
              type="password"
              required
              onChange={passwordHandler}
            />
          </div>

          <button type="submit">SIGN IN</button>
        </form>
        <div className="user_action_div2">
          <h1>Hello friend</h1>
          <h4>Enter your personal detail and start your journey with us</h4>
          <button onClick={showSignupHandler}>SIGN UP</button>
        </div>
        <div className="close">
          <IoMdClose color="white" size={48} onClick={() => caa()} />
        </div>
      </div>
      <Notifications
        msg={notifxnsMsg}
        showNotifications={showNotifications}
        error={notifxnsError}
      />
    </section>
  );
};

export default Login;
