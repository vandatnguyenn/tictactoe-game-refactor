import Square from "./square";

export default function Board(props){
    const renderSquare = (i) => {
      const winLine = props.winLine;
      return( 
        <Square 
          key = {i}
          value = {props.squares[i]} 
          onClick = {() => props.onClick(i)}
          highlight = {winLine && winLine.includes(i)}
        />
      );
    }

    let boardSquares = [];
    for(let row = 0; row < 5; row++){
      let boardRow = [];
      for(let col = 0; col < 5; col++){
        boardRow.push(<span key={(row * 5) + col}>{renderSquare((row * 5) + col)}</span>);
      }
      boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
    }

    return (
        <div>
          {boardSquares}
        </div>
    );
}