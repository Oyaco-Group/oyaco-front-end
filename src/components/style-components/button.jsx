import PropTypes from "prop-types";

const Button = ({ children, onClick, className, size = "md" }) => {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

Button.defaultProps = {
  onClick: null,
  className: "",
};

export default Button;
