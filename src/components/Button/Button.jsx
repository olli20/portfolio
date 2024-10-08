import css from './Button.module.css';

export const Button = ({ onClick, children, disabled }) => {
  return (
    <button 
      className={`${css.button} ${disabled ? css.disabled : ''}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};
