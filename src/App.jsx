import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {WINNING_COMBINATIONS} from "./components/WinningCombinations.js";
import {useState} from "react";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if(gameTurns.length>0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol)
        {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App() {
    /* Стан збереження активного символу гравця під час ходу */
    // const [activePlayer, setActivePlayer] = useState("X")
    /* Стан збереження черги */
    const [gameTurns, setGameTurns] = useState([])
    const [players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2',
    })
    // const [hasWinner, setHasWinner] = useState()
    const activePlayer =  deriveActivePlayer(gameTurns)
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    /* Функція handleSelectSquare викликається для внесення змін в обрану клітинку */
    /* та приймає в себе два аргумента, які є координатами клітинки */
    function handleSelectSquare(rowIndex, colIndex) {
        // Змінення поточного стану активного символу
        // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X")

        setGameTurns(prevState => {
            const currentPlayer = deriveActivePlayer(prevState);
            // const updatedTurns =
            return [{
                square: {
                    row: rowIndex,
                    col: colIndex
                },
                player: currentPlayer,
            } ,...prevState];
        })
    }

    function handleRematch(){
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevState => {
            return {
                ...prevState,
                [symbol]: newName
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
