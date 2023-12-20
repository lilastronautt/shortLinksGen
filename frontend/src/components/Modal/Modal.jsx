import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ msg, ok, cancel }) => {
  const okHandler = () => {
    ok();
  };

  useEffect(() => {
    document.querySelector(".modal_main")?.classList.add("moveAbove");
    setTimeout(() => {
      document.querySelector(".modal_main")?.classList.remove("moveAbove");
    }, 1500);
  }, []);

  return (
    <div className="modal_main">
      <div className="modal_cont">
        <pre>
          {!msg.length ? "No Analytics to show" : JSON.stringify(msg, null, 2)}
        </pre>

        <div className="modal_button_cont">
          <button onClick={okHandler}>ok</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
