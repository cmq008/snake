import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Food from './Food';

const Game = () => {
  const [snakeDots, setSnakeDots] = useState([[0, 0]]);
  const [foodDot, setFoodDot] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(100); // Velocidad inicial

  const restartGame = () => {
    // Restablece los estados para reiniciar el juego
    setSnakeDots([[0, 0]]);
    setFoodDot(generateFoodPosition());
    setDirection('RIGHT');
    setGameOver(false);
    setGameSpeed(100); // Velocidad inicial
  };

  const generateFoodPosition = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 40) * 10;
      y = Math.floor(Math.random() * 40) * 10;
    } while (isFoodOnSnake(x, y));
    return [x, y];
  };

  const isFoodOnSnake = (x, y) => {
    for (const dot of snakeDots) {
      if (dot[0] === x && dot[1] === y) {
        return true;
      }
    }
    return false;
  };

  const checkFood = () => {
    let head = snakeDots[snakeDots.length - 1];
    let foodX = foodDot[0];
    let foodY = foodDot[1];

    if (
      (head[0] - foodX >= -10 && head[0] - foodX <= 10) &&
      (head[1] - foodY >= -10 && head[1] - foodY <= 10)
    ) {
      // La serpiente se acerca a la comida, por lo que la consideramos comida
      // Incrementa el tamaño de la serpiente
      let newSnake = [...snakeDots];
      newSnake.unshift([]);
      setSnakeDots(newSnake);

      // Genera una nueva posición para la comida
      setFoodDot(generateFoodPosition());

      // Aumenta la velocidad del juego (hazlo más rápido)
      setGameSpeed(gameSpeed - 10); // Puedes ajustar el valor según tu preferencia
    }
  };

  useEffect(() => {
    const handleGameLogic = () => {
      if (gameOver) return;

      moveSnake();
      checkCollision();
      checkFood();
    };

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    const moveSnake = () => {
      if (gameOver) return;
      let dots = [...snakeDots];
      let head = [...dots[dots.length - 1]];

      switch (direction) {
        case 'UP':
          head[1] -= 10;
          break;
        case 'DOWN':
          head[1] += 10;
          break;
        case 'LEFT':
          head[0] -= 10;
          break;
        case 'RIGHT':
          head[0] += 10;
          break;
        default:
          break;
      }

      dots.push(head);
      if (dots.length > snakeDots.length) {
        dots.shift();
      }
      setSnakeDots(dots);
    };

    const checkCollision = () => {
      let head = snakeDots[snakeDots.length - 1];
      if (head[0] >= 400 || head[0] < 0 || head[1] >= 400 || head[1] < 0) {
        setGameOver(true);
      }
      for (let i = 0; i < snakeDots.length - 1; i++) {
        let dot = snakeDots[i];
        if (dot[0] === head[0] && dot[1] === head[1]) {
          setGameOver(true);
          return;
        }
      }
    };

    const gameInterval = setInterval(handleGameLogic, gameSpeed);

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameInterval);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [snakeDots, direction, foodDot, gameOver, gameSpeed]);

  return (
    <div className="game-board bg-gray-200 flex items-center justify-center h-screen">
      {gameOver ? (
        <div className="game-over text-3xl text-red-600 display-4 text-danger mb-4">
          Game Over
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 btn btn-primary"
            onClick={restartGame}
          >
            Reiniciar
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Snake snakeDots={snakeDots} />
          <Food foodDot={foodDot} />
        </div>
      )}
    </div>
  );
};

export default Game;
