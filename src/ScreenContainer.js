import React, { Component } from 'react';
import styled from 'styled-components';
import Display from "./Display";
import History from "./History";

const ScreenHolder = styled.div`
  margin: 0 auto;
  font-family: 'Orbitron', sans-serif;
  width: 280px;
  height: 100px;
  background-color: #ececec;
  border-radius: 10px;
  padding: 4px;
  box-shadow: inset 0px 1px 2px 1px rgba(0,0,0,0.6);
  text-align: right;
  padding: 8px 8px;
`;

// Notes on data.
/*
  The screen container will pass only visual data to Display and History. Via state properties state.display and state.history.
*/

class ScreenContainer extends Component {
  render() {
    console.log(this.props.display);
    return (
      <ScreenHolder>
        <Display data={this.props.display}/>
        <History data={this.props.history}/>
      </ScreenHolder>
    )
  }
}

export default ScreenContainer;
