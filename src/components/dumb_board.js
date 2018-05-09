import React from 'react';
import Spot from './spot';

import '../stylesheets/board.css'

class DumbBoard extends React.Component {



  render(){

    // pass to spot
    const currentPlayer = this.props.current
    const board = this.props.board;
    const playTurn = this.props.playTurn;

    return(
      <div className="rows">
        { board.map((row, y)=> {
          return(
            <div className="cols">
              {row.map((col, x) => {
                return(
                  <Spot
                    key={x}
                    x={x}
                    y={y}
                    currentPlayer={currentPlayer}
                    playTurn={playTurn}
                    mark={board[y][x]}
                  />
                )
              })
            }</div>
          )
        })

        }
      </div>
    )
  }

}

export default DumbBoard;
