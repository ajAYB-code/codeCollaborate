import PropTypes from 'prop-types';

const Button = ({ type, onClick, children, className }) => {
    
    const typeStyles = {
      primary: 'bg-primary text-white px-4 py-2 rounded hover:bg-primary-light',
      secondary: 'text-white px-4 py-2 rounded border border-white border-2 hover:bg-primary hover:border-primary',
    };
  
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${typeStyles[type]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };
  
  Button.defaultProps = {
    type: 'primary',
    onClick: null,
    className: '',
  };
  
  export default Button;