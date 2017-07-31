import React, { Component } from 'react';
import styled from 'styled-components';
import constants from './constants.js';
import ScreenContainer from "./ScreenContainer.js";
import ButtonContainer from "./ButtonContainer.js";
import processInputFn from "./processInputFn.js";

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
    this.operatorLookup = {
      "+": function(x,y) { return x + y; },
      "-": function(x,y) { return x - y; },
      "*": function(x,y) { return x * y; },
      "/": function(x,y) { return x / y; }
    }
  }

  roundToMaxDigits = (floatInput) => {
    return Number(Math.round(floatInput+'e'+'10')+'e-'+'10');
  }

  processInput = (event) => {
    // Deal with the input and update the state accordingly.
    var inputType = event.target.getAttribute('type');
    var inputValue = event.target.value;
    var currentState = this.state;
    var roundFunction = this.roundToMaxDigits;
    // Process the input with the input function module processInputFn().
    processInputFn(inputType, inputValue, currentState, this.operatorLookup, roundFunction)
    console.log(this.state, "After Processing");
  }

  render() {
    return (
      <AppHolder className="z-depth-2" >
        <Calculator className="z-depth-3">
          <Logo>JS CALC</Logo>
          <ScreenContainer display={this.state.display} history={this.state.history}/>
          <ButtonContainer passInputs={this.processInput}/>
        </Calculator>
      </AppHolder>
    );
  }
}

export default App;
