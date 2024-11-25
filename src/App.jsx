import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

import {useState} from "react";
import Log from "./components/Log.jsx";

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if(gameTurns.length>0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}


function App() {
    /* Стан збереження активного символу гравця під час ходу */
    // const [activePlayer, setActivePlayer] = useState("X")
    /* Стан збереження черги */
    const [gameTurns, setGameTurns] = useState([])

    const activePlayer =  deriveActivePlayer(gameTurns)
    /* Функція handleSelectSquare викликається для внесення змін в обрану клітинку */
    /* та приймає в себе два аргумента, які є координатами клітинки */
    function handleSelectSquare(rowIndex, colIndex) {
        // Змінення поточного стану активного символу
        // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X")

        setGameTurns(prevState => {
            const currentPlayer = deriveActivePlayer(prevState);
            const updatedTurns = [{
                square: {
                    row: rowIndex,
                    col: colIndex
                },
                player: currentPlayer,
            } ,...prevState];
            return updatedTurns;
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
