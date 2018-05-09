import React from 'react';
import smartBoard from './smart_board';
import DumbBoard from './dumb_board';

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = { turns: 1, board: smartBoard(), currentPlayer: 'X' }
    this.getLines = this.getLines.bind(this)
    this.winnerIs = this.winnerIs.bind(this)
    this.isOver = this.isOver.bind(this)
    this.playTurn = this.playTurn.bind(this)
    this.switchPlayers = this.switchPlayers.bind(this)

  }

  playTurn(coordinates){
    const { x, y } = coordinates;
    this.setState(prevState => {
      let board = prevState.board;
      board[y][x] = prevState.currentPlayer;
      return {board: board}
    }, () => this.isOver())
  }

  switchPlayers(){
    this.setState((prevState) => {
      return { currentPlayer: prevState.currentPlayer === 'X' ? 'O' : "X", turns: prevState.turns + 1 }
    })

  }

  isOver() {
    if(this.state.turns >= 9) {
      console.log('its a tie!');
      return;
    }
    const winner = this.winnerIs();
    if(winner !== "") {
      console.log(`the winner is ${winner}`);
    } else {
      this.switchPlayers()
    }
  }

  winnerIs(){
    let winner = ''
    const lines = this.getLines();
    lines.forEach(line => {
      if(line.join('') === "XXX") {
        winner = "X"
      }
      if(line.join('') === "OOO") {
        winner = "O"
      }
    })
    return winner;
  }

  getLines(){
    let matrix = this.state.board;
    // make lines a let not const because need to mutate later!
    let lines = [...matrix]; //horizontal combo
    lines = lines.concat(this.transpose(matrix))
    // make sure to push not concat
    lines.push(this.getDiagonal(matrix))
    let reverseDiagonal = this.transpose(matrix).reverse();
    lines.push(this.getDiagonal(reverseDiagonal))
    return lines
  }

  getDiagonal(matrix){
    let line = [];
    let i = 0;
    while(i < matrix.length) {
      line.push(matrix[i][i])
      i ++;
    }
    return line
  }


  transpose(matrix) {
    let transposed = [[], [], []];
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        transposed[j][i] = matrix[i][j]
      }
    }
    return transposed
  }



  render(){
    return(
      <DumbBoard
        currentPlayer={this.state.currentPlayer}
        board={this.state.board}
        playTurn={this.playTurn}
      />
    )
  }



}

export default Game;
