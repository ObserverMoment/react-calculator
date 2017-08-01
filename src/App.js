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
    // Process the input with the input function module processInputFn().
    if (inputType === "number") {
      this.processNumber(inputValue);
    }
    if (inputType === "operator") {
      this.processOperator(inputValue);
    }
    if (inputType === "ac") {
      this.processAC();
    }
    if (inputType === "ce") {
      this.processCE();
    }
    if (inputType === "equals") {
      this.processEquals();
    }
    console.log(this.state);
  }

  processNumber(inputValue){
    if (inputValue === "0" && this.state.display === "") {
      // A zero cannot be entered before a digit 1 - 9.
      return;
    }
    if (inputValue === ".") {
      if (this.state.decimalUsed) {
        // If input is a dot and a dot has already been used then break.
        return;
      }
      if (this.state.awaitingInput) {
        // Entering a dot before any other digits will automatically prepend a zero so that it makes sense.
        inputValue = "0" + inputValue;
      }

      // If input is decimal, display is valid, and function is still running after decimal check...then set it to true.
      this.setState({
        decimalUsed: true
      });
    }

    if (this.state.equalsIsActive) {
      this.setState({
        history: "",
        accumulator: 0,
        display: inputValue,
        equalsIsActive: false
      })

    } else if (this.state.awaitingInput) {
      this.setState({
        display: inputValue,
        awaitingInput: false
      })

    } else {
      this.setState({
        display: this.state.display + inputValue,
      })
    }
  }

  processOperator(inputValue){
    // An operator should not be pressed before any other inputs.
    if (this.state.display === "" || this.state.display === "0" || this.state.display === "0.") {
      return;
    }

    if (!this.state.equalsIsActive) {
      // Update the accumulator using the previous operator. So the users screen will show the most recent sum total.
      // Add any value entered by the user before the pressed the operator to the history string.
      this.setState({
        accumulator: this.operatorLookup[this.state.activeOperator](this.state.accumulator, parseFloat(this.state.display)),
        history: this.state.history + this.state.display
      })
    } else if (this.state.equalsIsActive) {
      // However, now equals is no longer active as a new operator has been pressed.
      this.setState({
        equalsIsActive: false
      })
    }
    // Update the display to show the operator.
    // Set the activeOperator for the next calculation.
    // Add the operator to the history string
    // The customer will next be entering more numbers.
    // You are now allowed to enter a decimal again for the next input.
    this.setState({
      display: inputValue,
      activeOperator: inputValue,
      history: this.state.history + inputValue,
      awaitingInput: true,
      decimalUsed: false
    })
  }

  processAC(){}

  processCE(){}

  processEquals(){}

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
