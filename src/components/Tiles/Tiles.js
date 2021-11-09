import classnames from "classnames";
import styles from "./Tiles.module.css";

function Tiles({item, handleSelect, flipped, disabled}) {
  const handleClick = () => {
    if (!disabled) {
      handleSelect(item);
    }
  };

  return (
    <li className={styles.item}>
      <span 
      className={classnames(
        [styles.front],
        {[styles.flipped_front]: flipped})}
        onClick={handleClick}
        >
          <span className={styles.decoration}></span>
          <span className={styles.decoration}></span>
          <span className={styles.decoration}></span>
          <span className={styles.decoration}></span>
          <span className={styles.decoration}></span>
        </span>
      <span className={classnames(
        [styles.back],
        {[styles.flipped_back]: flipped})}>
        <img src={item.src} alt="item" />
      </span>
    </li>
  );
}

export default Tiles;