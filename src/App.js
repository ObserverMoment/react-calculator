import React, { Component } from 'react';
import styled from 'styled-components';
import constants from './constants.js';
import ScreenContainer from "./ScreenContainer.js";
import ButtonContainer from "./ButtonContainer.js";

const AppHolder = styled.section`
  margin: 0 auto;
  width: 500px;
  padding: 10px;
  background-color: white;
  font-family: sans-serif;
`;

const Calculator = styled.div`
  width: 300px;
  background: ${constants.CALC_BODY};
  border-radius: 15px;
  border: 1px solid #bdbdbd;
  margin: auto;
`;

const Logo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 15px;
  padding: 3px;
  color: black;
  text-align: center;
`;

/*
  The App will be the only part of the app that has state. Data will need to be:
  1. Passed up from the Button components on cllick events. Just the value of the clicked button.
  2. Data in the state will be updated accordingly in this App container.
  3. This updated state will be passed to the ScreenContainer, which will then pass props to Display and Update to redraw visuals.
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "",
      history: "",
      accumulator: 0,
      activeOperator: "+",
      awaitingInput: true,
      equalsIsActive: false, // Operation is different when the equals has been pressed.
      // If a number is entered then history etc is wiped and the user starts again. But operators continue with that history.
      decimalUsed: false // You can only enter a decimal once.
    }
  }

  processInput = (input) => {
    // Deal with the input and update the state accordingly.
    console.log(input);
  }

  render() {
    return (
      <AppHolder className="z-depth-2" >
        <Calculator className="z-depth-3">
          <Logo>JS CALC</Logo>
          <ScreenContainer />
          <ButtonContainer passInputs={this.processInput}/>
        </Calculator>
      </AppHolder>
    );
  }
}

export default App;
