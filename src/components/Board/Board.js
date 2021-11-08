import Tiles from '../Tiles/Tiles';
import Button from '../Button/Button';
import styles from './Board.module.css';

function Board({items, handleSelect, disabled, selectOne, selectTwo, onClick, getNewGame, rounds, completed}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.btns}>
        <Button onClick={onClick} inner={'Новая игра'}/>
        <Button onClick={getNewGame} inner={'Изменить уровень'}/>
      </div>
      {completed ? 
      (<div>
        <h2 className={styles.title}>Победа!</h2>
        <p className={styles.text__win}>Вы одержали победу в  раунде <span>{rounds}</span></p>
      </div>
      ):('')}
      {!completed ? (<p className={styles.text}><span>{rounds + 1}</span> раунд </p>) : ('')}
      <ul className={styles.list}>
        {items.map((item) => (
          <Tiles
          key={item.id}
          item={item}
          handleSelect={handleSelect}
          flipped={item === selectOne || item === selectTwo || item.matched}
          disabled={disabled}
          />
        ))}
      </ul>
    </div>
  );
}

export default Board;