import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Loader from "../Loader/Loader";
import Notifications from "../Notifications/Notifications";
import "./SignUp.css";

const SignUp = ({ sih, caa }) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [emailExists, setEmailExists] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifxnsMsg, setNotifxnsMsg] = useState("");
  const [notifxnsError, setNotifxnsError] = useState(false);

  const nameHandler = (e) => {
    setSignUpData((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const emailHandler = (e) => {
    setSignUpData((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const passwordHandler = (e) => {
    setSignUpData((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const confirmPsswordHandler = (e) => {
    setSignUpData((prev) => {
      return { ...prev, cPassword: e.target.value };
    });
  };

  const signUpFormHanlder = (e) => {
    e.preventDefault();
    if (!(signUpData.email.includes("@") && signUpData.email.includes("."))) {
      setShowNotifications(() => true);
      setNotifxnsMsg(() => "Please enter a valid email");
      setNotifxnsError(() => true);
      setTimeout(() => setShowNotifications(() => false), 1000);
      return;
    }

    if (signUpData.password != signUpData.cPassword) {
      setShowNotifications(() => true);
      setNotifxnsMsg(() => "Password donot match");
      setNotifxnsError(() => true);
      setTimeout(() => setShowNotifications(() => false), 1000);
      return;
    }

    if (emailExists) {
      return;
    }

    (async () => {
      try {
        const req = await fetch("https://apricot-fossa-sock.cyclic.app/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        });
        const res = await req.json();
        if (res.msg == "ok") {
          setShowNotifications(() => true);
          setNotifxnsMsg(() => "Signup sucessfull,please login!!");
          setNotifxnsError(() => false);
          setTimeout(() => {
            sih();
            setShowNotifications(() => false);
          }, 2000);
        }
      } catch (e) {
        setShowNotifications(() => true);
        setNotifxnsMsg(() => "Something went wrong,check your connection");
        setNotifxnsError(() => true);
        setTimeout(() => setShowNotifications(() => false), 1000);
      }
    })();
  };

  const showLoginHandler = () => {
    document.querySelector(".user_action_form").classList.add("moveLeft");
    document.querySelector(".user_action_div2").classList.add("moveRight");
    setTimeout(() => {
      document.querySelector(".user_action_form").classList.remove("moveLeft");
      document.querySelector(".user_action_div2").classList.remove("moveRight");
      sih();
    }, 1000);
  };

  useEffect(() => {
    document.querySelector(".user_action_form").classList.add("smoveLeft");
    document.querySelector(".user_action_div2").classList.add("smoveRight");
    setTimeout(() => {
      document.querySelector(".user_action_form").classList.remove("smoveLeft");
      document
        .querySelector(".user_action_div2")
        .classList.remove("smoveRight");
    }, 1000);
  }, []);

  useEffect(() => {
    setShowLoader(() => true);
    setEmailExists(() => false);
    let timer = setTimeout(() => {
      (async () => {
        const req = await fetch("https://apricot-fossa-sock.cyclic.app/getallemails");
        const res = await req.json();
        res.forEach((el) => {
          if (el.email == signUpData.email) {
            setEmailExists(() => true);
          }
        });
        setShowLoader(() => false);
      })();
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [signUpData.email]);

  return (
    <section className="user_action_parent">
      <div className="user_action__cont">
        <form
          className="user_action_form form_signup__fix"
          onSubmit={signUpFormHanlder}
        >
          <h1>Create account</h1>
          <div>
            <div style={{ position: "relative" }}>
              {emailExists && (
                <p
                  style={{
                    margin: 0,
                    color: "red",
                    position: "absolute",
                    marginTop: "-7%",
                    marginLeft: "35%",
                  }}
                >
                  email already exists
                </p>
              )}
              <input
                placeholder="Email"
                type="email"
                required
                onChange={emailHandler}
              />
              {showLoader && (
                <Loader dimension={1.3} className="loader_register" />
              )}
            </div>
            <input
              placeholder="Name"
              type="text"
              required
              onChange={nameHandler}
            />
            <input
              placeholder="Password"
              type="password"
              required
              onChange={passwordHandler}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              required
              onChange={confirmPsswordHandler}
            />
          </div>
          <button type="submit">CREATE ACCOUNT</button>
        </form>
        <div className="user_action_div2 signup_div2__fix">
          <h1>Welcome back</h1>
          <h4>To keep connected with us please login in with your info</h4>
          <button onClick={showLoginHandler}>SIGN IN</button>
        </div>
        <div className="close">
          <IoMdClose color="rgb(251, 75, 40)" size={48} onClick={() => caa()} />
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

export default SignUp;
