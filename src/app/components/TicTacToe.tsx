"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isInteractive, setIsInteractive] = useState(true);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);

  // Memoize winningCombos to prevent unnecessary re-renders
  const winningCombos = useMemo(() => [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ], []);

  // Check for win/draw
  const checkResult = useCallback((newBoard: string[]) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a] === "X" ? "lose" : "win";
      }
    }
    if (newBoard.every((cell) => cell !== "")) return "draw";
    return null;
  }, [winningCombos]);

  // Minimax AI
  const minimax = useCallback((newBoard: string[], isMaximizing: boolean): number => {
    const gameResult = checkResult(newBoard);
    if (gameResult === "win") return 10;
    if (gameResult === "lose") return -10;
    if (gameResult === "draw") return 0;

    const scores: number[] = [];
    newBoard.forEach((cell, index) => {
      if (!cell) {
        newBoard[index] = isMaximizing ? "O" : "X";
        scores.push(minimax(newBoard, !isMaximizing));
        newBoard[index] = "";
      }
    });
    return isMaximizing ? Math.max(...scores) : Math.min(...scores);
  }, [checkResult]);

  // Computer's move logic (wrapped in useCallback)
  const computerMove = useCallback(() => {
    const moves: { index: number; score: number }[] = [];
    board.forEach((cell, index) => {
      if (!cell) {
        const newBoard = [...board];
        newBoard[index] = "O";
        moves.push({ index, score: minimax(newBoard, false) });
      }
    });
    const bestMove = moves.reduce((a, b) => (a.score > b.score ? a : b));
    board[bestMove.index] = "O";
    setBoard([...board]);
    const gameResult = checkResult([...board]);
    if (gameResult) {
      setResult(gameResult);
    } else {
      setIsPlayerTurn(true); // Switch back to the player's turn
    }
    setIsInteractive(true); // Re-enable interaction after computer move
  }, [board, minimax, checkResult]);

  // Player's move logic
  const handleCellClick = (index: number) => {
    if (!isInteractive || board[index] || result) return; // Disable if not interactive
    setIsInteractive(false); // Disable interaction while the computer responds
    board[index] = "X";
    setBoard([...board]);
    const gameResult = checkResult([...board]);
    if (gameResult) {
      setResult(gameResult);
      setIsInteractive(true); // Allow interaction again for restart button
    } else {
      setIsPlayerTurn(false); // Switch to the computer's turn
    }
  };

  // Trigger computer's move if it's the computer's turn
  useEffect(() => {
    if (!isPlayerTurn && !result) {
      setTimeout(computerMove, 500); // Delay to simulate thinking time
    }
  }, [isPlayerTurn, result, computerMove]);

  // Restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setResult(null);
    setIsPlayerTurn(true);
    setIsInteractive(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <motion.h1
        className="text-3xl font-bold text-[#42315b]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Tic-Tac-Toe
      </motion.h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            onClick={() => handleCellClick(index)}
            className={`w-20 h-20 flex items-center justify-center border border-gray-300 cursor-pointer bg-white rounded-lg shadow-lg`}
            whileHover={isInteractive ? { scale: 1.1, backgroundColor: "blueviolet" } : {}}
            whileTap={isInteractive ? { scale: 0.9 } : {}}
          >
            {cell === "X" && <FaTimes className="text-red-500 text-4xl" />}
            {cell === "O" && <FaRegCircle className="text-green-500 text-4xl" />}
          </motion.div>
        ))}
      </div>
      {result && (
        <motion.div
          className="mt-4 text-xl font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {result === "win" && "You Lose! 😔"}
          {result === "lose" && "You Win! 🎉"}
          {result === "draw" && "It's a Draw! 🤝"}
        </motion.div>
      )}
      <motion.button
        onClick={restartGame}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Restart
      </motion.button>
    </div>
  );
};

export default TicTacToe;