import React from 'react';

import '../stylesheets/spot.css'

class Spot extends React.Component{

  constructor(props){
    super(props)
    this.state = { filled: false }
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    if(this.state.filled) { return; }
    this.setState({ filled: true })
    const x = this.props.x;
    const y = this.props.y;
    const coordinates = { x, y }
    this.props.playTurn(coordinates);
  }


  render(){
    const currentPlayer = this.props.currentPlayer;
    const x = this.props.x;
    const y = this.props.y;
    return(
      <div className="spot" onClick={this.handleOnClick}>
        {this.props.mark}
      </div>
    )

  }

}

export default Spot
