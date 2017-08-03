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
  border: 1px solid #bdbdbd;
  margin: auto;
`;

const Logo = styled.div`
  font-family: sans-serif;
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
    const { display, history, decimalUsed, awaitingInput, equalsIsActive } = this.state;

    // Deal with "." input.
    if (inputValue === ".") {
      // If input is a dot and a dot has already been used then break.
      if (decimalUsed) { return; }
      // Entering a dot before any other digits will automatically prepend a zero so that it makes sense.
      if (awaitingInput) { inputValue = "0."; }
      // If function is still running after decimal check...then set decimalUsed to true.
      this.setState({
        decimalUsed: true,
        display: inputValue,
        history: history + inputValue
      });
      return;
    }

    // After an equals input you just reset everything and add the input to the display. Then set equalsIsActive to false.
    if (equalsIsActive) {
      this.setState({
        history: "",
        accumulator: 0,
        display: inputValue,
        equalsIsActive: false
      })
    } else if (awaitingInput) {
    // This is the first input after an operator so you can set the display to the new input.
      this.setState({
        awaitingInput: false,
        display: inputValue,
        history: history + inputValue
      });
    } else {
      // Append the input value to the display and history for processing later.
      this.setState({
        display: display + inputValue,
        history: history + inputValue
      });
    }
  }

  processOperator(inputValue){
    const { display, equalsIsActive, activeOperator, accumulator, history, awaitingInput } = this.state;

    // An operator should not be pressed before any other inputs.
    if (display === "" || display === "0" || display === "0.") { return; }

    // If an operator has already been pressed then you need to replace it with the new one.
    if (awaitingInput) {
      // TODO 
    };

    if (!equalsIsActive) {
      // Update the accumulator using the previous operator. So the users screen will show the most recent sum total.
      // Add any value entered by the user before the pressed the operator to the history string.
      this.setState({
        accumulator: this.operatorLookup[activeOperator](accumulator, parseFloat(display))
      })
    } else if (equalsIsActive) {
      // However, now equals is no longer active as a new operator has been pressed.
      this.setState({ equalsIsActive: false });
    }
    // Update the display to show the operator.
    // Set the activeOperator for the next calculation.
    // Add the operator to the history string
    // The customer will next be entering more numbers.
    // You are now allowed to enter a decimal again for the next input.
    this.setState({
      activeOperator: inputValue,
      history: history + inputValue,
      awaitingInput: true,
      decimalUsed: false
    })
  }

  processAC(){
    // All clear
    this.setState({
      display: "0",
      history: "",
      accumulator: 0,
      awaitingInput: true,
      decimalUsed: false
    })
  }

  processCE(){
    // Clear entry
    this.setState({
      display: "0",
      awaitingInput: true,
      decimalUsed: false
    })
  }

  processEquals(){
    const { awaitingInput, accumulator, history, display, activeOperator } = this.state;
    // Pressing equals twice should do nothing.
    // if (equalsIsActive) { return; }

    // Update accumulator with the last operator and the live numbers on the display.
    // Then displays the total on the screen.
    this.setState({ equalsIsActive: true });
    if (awaitingInput) {
      // This means the user has previously inputted an operator but not used it. Just discard it and return the current total.
      this.setState({ display: this.roundToMaxDigits(accumulator) });
    } else {
      // Add up the previous calcs. Update the history. Display the accumulated total. Set awaiting input to true.
      let updatedAccumulator = this.operatorLookup[activeOperator](accumulator, parseFloat(display));

      this.setState({
        accumulator: updatedAccumulator,
        display: this.roundToMaxDigits(updatedAccumulator),
        awaitingInput: true,
        decimalUsed: false
      });
    }
  }

  render() {
    const { display, history } = this.state;
    return (
      <AppHolder className="z-depth-2" >
        <Calculator className="z-depth-3">
          <Logo>JS CALC</Logo>
          <ScreenContainer display={display} history={history}/>
          <ButtonContainer passInputs={this.processInput}/>
        </Calculator>
      </AppHolder>
    );
  }
}

export default App;
