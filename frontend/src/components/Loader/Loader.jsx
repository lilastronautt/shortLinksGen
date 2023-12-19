import "./Loader.css";

const Loader = ({ dimension, className }) => {
  return (
    <div
      style={{
        height: `${dimension + 1}rem`,
        width: `${dimension + 1}rem`,
      }}
      className={`loader_cont ` + className}
    >
      <div
        className="loader"
        style={{ height: `${dimension}rem`, width: `${dimension}rem` }}
      ></div>
    </div>
  );
};

export default Loader;
