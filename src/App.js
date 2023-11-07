import React from 'react';
import './global.css'; // Importa el archivo global.css
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <h1 className='game-over text-3xl text-red-600 display-4 text-info mb-4'>Snake Game</h1>
      <Game />
    </div>
  );
}

export default App;
