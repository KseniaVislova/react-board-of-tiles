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

const initialState = {
  items: [], 
  rounds: 0, 
  disabled: false, 
  ready: false, 
  completed: false,
  level: 2,
  levels: [
    {
      case: "easy",
      identifier: 2,
      name: "Простой",
      active: true,
    },
    {
      case: "middle",
      identifier: 4,
      name: "Средний",
      active: false,
    },
    {
      case: "hard",
      identifier: 6,
      name: "Сложный",
      active: false,
    },
    {
      case: "very-hard",
      identifier: 8,
      name: "Очень сложный",
      active: false,
    }
  ]
};

function init(state) {
  return {...state };
}

function reducer(state, action) {
  switch (action.type) {
    case "round": 
      return {
        ...state,
        rounds: state.rounds + 1,
        disabled: false
      };

    case "items": return {...state, ready: true, completed: false, rounds: 0};

    case "disabled": 
      return {
        ...state,
        disabled: true
      };
    
    case "not-ready": 
      return {...state, ready: false};

    case "completed": 
      return {...state, completed: true};

    case "level": 
      let l;
      state.levels.forEach((level) => {
        if (action.payload === level.identifier) {
          level.active = true;
          l = level.identifier;
        } else {
          level.active = false;
        }
      });
      return {...state, level: l};
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialState, init);
  const [selectOne, setSelectOne] = useState(null);
  const [selectTwo, setSelectTwo] = useState(null);

  const shuffleTiles = () => {
    const tiles = tilesImage.slice(0, data.level);

    const shuffledTiles = [...tiles, ...tiles]
      .sort(() => Math.random() - 0.5)
      .map((tile) => ({ ...tile, id: new Date().getTime() + (Math.random() * 10)}));
    
    data.items = shuffledTiles;

    setSelectOne(null);
    setSelectTwo(null);
    dispatch({ type: "items" });
  };

  const chooseLevel = (level) => {
    dispatch({ type: "level", payload: level });
  };

  const handleSelect = (item) => {
    selectOne ? setSelectTwo(item) : setSelectOne(item);
  };

  const checkMatched = () => {
    let count = 0;
    data.items.forEach((item) => {
      if(item.matched === true) {
        count ++;
      }
    });
    if(count === data.items.length && count !== 0) {
      dispatch({ type: "completed" });
    }
  };

  const resetRound = () => {
    setTimeout(() => checkMatched(), 1000);
    setSelectOne(null);
    setSelectTwo(null);
    setTimeout(() => dispatch({ type: "round" }), 1000);
  };

  const getNewGame = () => {
    shuffleTiles();
    dispatch({ type: "not-ready" });
  };

  useEffect(() => {
    if (selectOne && selectTwo) {
      dispatch({ type: "disabled" });
      if (selectOne.src === selectTwo.src) {
        data.items.map((item) => {
          if (item.src === selectOne.src) {
            return item.matched = true;
          } else {
            return item;
          }
        });
        resetRound();
      } else {
        setTimeout(() => resetRound(), 1000);
      }
    }
  }, [selectOne, selectTwo]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.decoration}></div>
      <div className={styles.decoration}></div>
      <div className={styles.decoration}></div>
      <div className={styles.decoration}></div>
      <div className={styles.round}></div>
      <div className={styles.ellipse}></div>
      {!data.ready ? 
      (<div>
        <h1 className={styles.title}>Найди пару</h1>
        <Level 
          levels={data.levels} 
          chooseLevel={chooseLevel}
          onClick={shuffleTiles}
        />
      </div>) : 
      (<Board
        items={data.items}
        handleSelect={handleSelect}
        getNewGame={getNewGame}
        selectOne={selectOne}
        selectTwo={selectTwo}
        disabled={data.disabled}
        onClick={shuffleTiles}
        completed={data.completed}
        rounds={data.rounds}
      />)
      } 
    </div>
  );
};

export default App;
