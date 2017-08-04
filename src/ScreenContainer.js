import React, { Component } from 'react';
import styled from 'styled-components';

const ScreenHolder = styled.div`
  margin: 0 auto;
  font-family: 'Orbitron', sans-serif;
  width: 280px;
  height: 100px;
  background-color: #ececec;
  padding: 4px;
  box-shadow: inset 0px 1px 2px 1px rgba(0,0,0,0.6);
  text-align: right;
  padding: 8px 8px;
`;

const Display = styled.div`
  font-size: 32px;
`

const History = styled.div`
  font-size: 12px;
  color: #5c5c5c;
`

// Notes on data.
/*
  The screen container will pass only visual data to Display and History. Via state properties state.display and state.history.
*/

class ScreenContainer extends Component {
  render() {
    const { display, history } = this.props;
    return (
      <ScreenHolder>
        <Display>{display || 0}</Display>
        <History>{history || 0}</History>
      </ScreenHolder>
    )
  }
}

export default ScreenContainer;
