import styles from "./Button.module.css";

function Button({inner, onClick}) {
  return (
    <div>
      <button className={styles.button} onClick={onClick}>{inner}</button>
    </div>
  );
}

export default Button;