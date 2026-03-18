import { useState } from 'react';

function Square({ value, onSquareClick }) {
  const className = `cell ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      <span>{value}</span>
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status = winner ? `SISTEMA: Ganador ${winner}` : `TURNO: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game-container">
      <div className="status-text">{status}</div>
      <div className="board-container">
        <div className="board">
          {squares.map((square, i) => (
            <Square key={i} value={square} onSquareClick={() => {
              if (winner || squares[i]) return;
              const nextSquares = squares.slice();
              nextSquares[i] = xIsNext ? 'X' : 'O';
              onPlay(nextSquares);
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div id="root">
      <h1>GAME TIC-TAC-TOE</h1>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        
        <div className="game-info">
          <button className="reset-button" onClick={() => jumpTo(0)}>
            REINICIAR JUEGO
          </button>
          
          <ul className="history-list">
            {history.map((_, move) => (
              <li key={move}>
                <button className="history-button" onClick={() => jumpTo(move)}>
                  {move === 0 ? '> INICIO_JUEGO' : `> MOVIMIENTO #${move}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}