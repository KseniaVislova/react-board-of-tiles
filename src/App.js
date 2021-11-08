import React, { useState, useEffect, useReducer } from "react";
import Board from "./components/Board/Board";
import Level from "./components/Level/Level";
import styles from "./App.module.css";

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
    name: "Простой",
    active: true,
  },
  {
    identifier: 4,
    name: "Средний",
    active: false,
  },
  {
    identifier: 6,
    name: "Сложный",
    active: false,
  },
  {
    identifier: 8,
    name: "Очень сложный",
    active: false,
  }, 
];

const initialState = {
  items: [], 
  rounds: 0, 
  disabled: false, 
  ready: false, 
  completed: false,
}

function init(state) {
  return {...state }
}

function reducer(state, action) {
  switch (action.type) {
    case 'round': 
      return {
        ...state,
        rounds: state.rounds + 1,
        disabled: false
      }

    case 'items': return {...state, ready: true, completed: false, rounds: 0}

    case 'update': return {...state}

    case 'disabled': 
      return {
        ...state,
        disabled: true
      }
    
    case 'not-ready': 
      return {...state, ready: false}

    case 'completed': 
      return {...state, completed: true}
  
    default:
      return state;
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState, init)
  const [selectOne, setSelectOne] = useState(null);
  const [selectTwo, setSelectTwo] = useState(null);
  const [level, setLevel] = useState(2);

  const shuffleTiles = () => {
    const tiles = tilesImage.slice(0, level);

    const shuffledTiles = [...tiles, ...tiles]
      .sort(() => Math.random() - 0.5)
      .map((tile) => ({ ...tile, id: new Date().getTime() + (Math.random() * 10)}));
    
    data.items = shuffledTiles;

    setSelectOne(null);
    setSelectTwo(null);
    dispatch({ type: "items" })
  };

  const chooseLevel = (level) => {
    levels.map((l) => {
      if(level === l.identifier) {
        return l.active = true;
      } else {
        return l.active = false;
      }});
    setLevel(level);
  };

  const handleSelect = (item) => {
    selectOne ? setSelectTwo(item) : setSelectOne(item);
  };

  const resetRound = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setTimeout(() => dispatch({ type: "round" }), 1000);
  };

  const getNewGame = () => {
    shuffleTiles();
    dispatch({ type: "not-ready" })
  };

//прописать функцию для проверки выбора

  useEffect(() => {
    if (selectOne && selectTwo) {
      dispatch({ type: "disabled" })
      if (selectOne.src === selectTwo.src) {
        console.log(data.items)
        data.items.map((item) => {
          if (item.src === selectOne.src) {
            console.log(item.src)
            console.log(selectOne.src)
            return item.matched = true;
          } else {
            return item;
          }
        })
        setTimeout(() => checkMatched(), 1000);
        resetRound();
      } else {
        setTimeout(() => resetRound(), 1000);
      }
    }
  }, [selectOne, selectTwo]);

  const checkMatched = () => {
    let count = 0;
    data.items.forEach((item) => {
      if(item.matched === true) {
        count ++;
      }
    });
    if(count === data.items.length && count !== 0) {
      dispatch({ type: "completed" })
    }
    dispatch({ type: "update" })
  };

  if (!data.ready) {
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
    );
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
            items={data.items}
            handleSelect={handleSelect}
            getNewGame={getNewGame}
            selectOne={selectOne}
            selectTwo={selectTwo}
            disabled={data.disabled}
            onClick={shuffleTiles}
            completed={data.completed}
            rounds={data.rounds}
          />
      </div>
    );
  }
};

export default App;
