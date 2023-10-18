import React, { useState } from "react";
import GameContext from "./GameContext";
import { useNavigate } from "react-router-dom";

const GameProvider = (props) => {
  const [state, setState] = useState({
    playerName: "",
    targetNumber: 0,
    noOfGuesses: 0,
    minimumGuess: 1,
    maximumGuess: 100,
    message: ""
  });
  
  const navigate = useNavigate();

  const startGame = (name) => {
    if (!name) {
      setState((state) => ({
        ...state,
        message: "Please enter your name"
      }));
      return;
    }
    const target = Math.floor(Math.random() * 100) + 1;
    const message = "Hello " + name + ". Guess the number between " + state.minimumGuess + " and " + state.maximumGuess;
    setState((state) => ({
      ...state,
      playerName: name,
      targetNumber: target,
      message: message
    }));
    navigate("/game");
  }
  
  const guess = (userGuess) => {
    if (state.targetNumber === 0) {
      // Handle the case when the targetNumber is not set
    } else {
      const { targetNumber, noOfGuesses } = state;
      const parsedGuess = parseInt(userGuess, 10);
      
      if (isNaN(parsedGuess)) {
        // Handle the case when the input is not a valid number
        return;
      }
      
      if (parsedGuess === targetNumber) {
        // Handle the case when the guess is correct
      } else if (parsedGuess < targetNumber) {
        // Handle the case when the guess is too low
      } else {
        // Handle the case when the guess is too high
      }

      // Update the number of guesses
      setState((state) => ({
        ...state,
        noOfGuesses: noOfGuesses + 1
      }));
    }
  }

  return (
    <GameContext.Provider value={{ state, startGame, guess }}>
      {props.children}
    </GameContext.Provider>
  );
}

export default GameProvider;
