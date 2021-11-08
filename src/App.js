import React, { useState, useEffect } from "react";
import Board from './components/Board/Board';
import Level from "./components/Level/Level";
import styles from './App.module.css';

const tilesImage = [
  { src: "/img/cat-1.png", matched: false },
  { src: "/img/cat-2.png", matched: false },
  { src: "/img/cat-3.png", matched: false },
  { src: "/img/cat-4.png", matched: false },
  { src: "/img/cat-5.png", matched: false },
  { src: "/img/cat-6.png", matched: false },
  { src: "/img/cat-7.png", matched: false },
  { src: "/img/cat-8.png", matched: false },
];

const levels = [
  {
    identifier: 2,
    name: 'Простой',
    active: true,
  },
  {
    identifier: 4,
    name: 'Средний',
    active: false,
  },
  {
    identifier: 6,
    name: 'Сложный',
    active: false,
  },
  {
    identifier: 8,
    name: 'Очень сложный',
    active: false,
  },
  
];

const App = () => {
  const [items, setItems] = useState([]);
  const [rounds, setRounds] = useState(0);
  const [selectOne, setSelectOne] = useState(null);
  const [selectTwo, setSelectTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [level, setLevel] = useState(2);
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);

  const shuffleTiles = () => {
    const tiles = [];
    for(let i = 0; i < level; i++) {
      tiles.push(tilesImage[i]);
    }

    const shuffledTiles = [...tiles, ...tiles]
      .sort(() => Math.random() - 0.5) //перемешиваем массив
      .map((tile) => ({ ...tile, id: new Date().getTime() + Math.random() })); //задаем уникальный id для каждого будущего item

    setSelectOne(null);
    setSelectTwo(null);
    setItems(shuffledTiles);
    setRounds(0);
    setReady(true);
    setCompleted(false)
  };

  const chooseLevel = (level) => {
    levels.map((l) => {
      if(level === l.identifier) {
        return l.active = true;
      } else {
        return l.active = false
      }});
    setLevel(level);
  };

  const handleSelect = (item) => {
    selectOne ? setSelectTwo(item) : setSelectOne(item);
  };

  

  const getNewGame = () => {
    shuffleTiles();
    setReady(false);
  }

  useEffect(() => {
    if (selectOne && selectTwo) {
      setDisabled(true);
      if (selectOne.src === selectTwo.src) {
        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item.src === selectOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });

        resetRound();
      } else {
        setTimeout(() => resetRound(), 1000);
      }
    }
  }, [selectOne, selectTwo]);

  const resetRound = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setTimeout(() => setRounds((prevRounds) => prevRounds + 1), 1000)
    setDisabled(false);
  };

  const checkMatched = () => {
    let count = 0;
    items.forEach((item) => {
      if(item.matched === true) {
        count ++;
      }
    })
    if(count === items.length && count !== 0) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }

  useEffect(() => {
      setTimeout(() => checkMatched(), 1000);
  })


  if (!ready) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.decoration}></div>
        <div className={styles.decoration}></div>
        <div className={styles.decoration}></div>
        <div className={styles.decoration}></div>
        <div className={styles.round}></div>
        <div className={styles.ellipse}></div>
          <h1 className={styles.title}>Найди пару</h1>
          <Level 
          levels={levels} 
          chooseLevel={chooseLevel}
          onClick={shuffleTiles}
          />
      </div>
    )
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.decoration}></div>
        <div className={styles.decoration}></div>
        <div className={styles.decoration}></div>
        <div className={styles.decoration}></div>
        <div className={styles.round}></div>
        <div className={styles.ellipse}></div>
          <Board
            items={items}
            handleSelect={handleSelect}
            getNewGame={getNewGame}
            selectOne={selectOne}
            selectTwo={selectTwo}
            disabled={disabled}
            onClick={shuffleTiles}
            completed={completed}
            rounds={rounds}
          />
      </div>
    )
  }
}

export default App;
