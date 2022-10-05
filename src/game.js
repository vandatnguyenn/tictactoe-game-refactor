import { useState } from "react";
import Board from "./board";

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [moves, setMoves] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [playsHistory, setPlaysHistory] = useState([
    {
      squares: Array(25).fill(null),
      xIsNext: true,
      latestPosition: null
    }
  ]);

  const determineWinner = (squares) => {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c, d, e] = lines[i];
        if( squares[a]&& squares[a] === squares[b] && squares[a] === squares[c] 
          && squares[a] === squares[d] && squares[a] === squares[e])
        {
            return{
              winner: squares[a],
              line: lines[i],
            };
        }
    }
    return {
      winner: null,
    };
  };

  const handleClick = (i) => {
    const tempHistory = playsHistory.slice(0, moves+1);
    const current = tempHistory[tempHistory.length-1];
    const squares = current.squares.slice();

    if (determineWinner(squares).winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);

    let iHistory=[{squares: squares, latestPosition: i, xIsNext: !xIsNext,}]
    
    let newHistory;
    newHistory=tempHistory.concat(iHistory);
    setPlaysHistory(newHistory);

    console.log(current);
    setMoves((prevMoves) => prevMoves + 1);
    console.log(playsHistory);
  };

  const jumpTo = (step) => {
    setMoves(step);
    setXIsNext((step % 2) === 0);
  }

  const handleSortToggle = () => {
    setIsAscending(!isAscending);
  }

  const current = playsHistory[moves].squares;

  let movements = playsHistory.map((step, move) => {

    const latestMoveSquare = step.latestPosition;
    const col = latestMoveSquare % 5 + 1;
    const row = Math.floor(latestMoveSquare / 5) + 1;

    const desc = move ?
      "Go to move #" + move + ", location: (" + row + ", " + col + ")":
      "Go to start";
    return (
      <li key= {move}>
        <button
          className={move === moves ? 'move-list-item-selected' : ''}
          onClick={() => jumpTo(move)}>{desc}
        </button>
      </li>
    );  
  });

  if (!isAscending) {
    movements.reverse();
  } 
  let winInfo = determineWinner(current);
  let winner = winInfo.winner;
  let status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;
  if (!winner && moves === 25) status = "Draw";

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} 
        onClick={(i) => handleClick(i)} 
        winLine={winInfo.line}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => handleSortToggle()}>
          {!isAscending ? 'descending' : 'ascending' }  
        </button>
        <ol>{movements}</ol>
      </div>
    </div>
  );
}

export default Game;
