import "./Modal.css";

const Modal = ({ msg, ok, cancel }) => {
  const okHandler = () => {
    ok();
  };

  return (
    <div className="modal_main">
      <div className="modal_cont">
        <pre>
          {msg == "[]" ? "No Analytics to show" : JSON.stringify(msg, null, 2)}
        </pre>

        <div className="modal_button_cont">
          <button onClick={okHandler}>ok</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
