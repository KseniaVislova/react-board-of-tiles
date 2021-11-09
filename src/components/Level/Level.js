import Button from "../Button/Button";
import classnames from "classnames";
import styles from "./Level.module.css";

function Level({levels, chooseLevel, onClick}) {

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Выбрать уровень:</h3>
        <ul className={styles.list}>
          {levels.map((level) => (
            <li 
            key={level.identifier}
            onClick={() => chooseLevel(level.identifier)}>
              <div className={classnames([styles.item], {[styles.active]: level.active})}> {level.name}</div>
            </li>
          ))}
        </ul>
        <Button className={styles.button} onClick={onClick} inner={"Начать игру"}/>
    </div>  
  );
}

export default Level;