const processInput = function(inputType, inputValue, state, operatorLookup, roundToMaxDigits) {
  console.log("Entering Input Function....");
  console.log(state);
  switch (inputType) {
    case "number":
      if (inputValue === "0" && state.display === "") {
        // A zero cannot be entered before a digit 1 - 9.
        break;
      }
      if (inputValue === ".") {
        if (state.awaitingInput) {
          // Entering a dot before any other digits will automatically prepend a zero so that it makes sense.
          inputValue = "0" + inputValue;
        }
        if (state.decimalUsed) {
          // If input is a dot and a dot has already been used then break.
          break;
        }
        // If input is decimal, display is valid, and loop is still running after decimal check...then set it to true.
        state.decimalUsed = true;
      }

      if (state.equalsIsActive) {
        state.history = "";
        state.accumulator = 0;
        state.display = inputValue;
        state.equalsIsActive = false;
      } else if (state.awaitingInput) {
        state.display = inputValue;
        state.awaitingInput = false;
      } else {
        state.display += inputValue;
        console.log(state);
      }
      break;
    case "operator":
      // Update the total sum using the previous operator to get the correct function.
      // Passing in the accumulator and the number on the display.

      // An operator should not be pressed before any other inputs.
      if (state.display === "" || state.display === "0" || state.display === "0.") {
        break;
      }

      if (!state.equalsIsActive) {
        state.accumulator = operatorLookup[state.activeOperator](state.accumulator, parseFloat(state.display));
        // Add the previous display to the history string
        state.history += state.display;
      } else {
        // Equals is no longer active as a new operator has been pressed.
        state.equalsIsActive = false;
      }
      // Update the display to show the operator.
      state.display = inputValue;
      // Set the activeOperator for the next calculation.
      state.activeOperator = inputValue;
      // Add the operator to the history string
      state.history += inputValue;
      // The customer will next be entering more numbers.
      state.awaitingInput = true;
      // You are now allowed to enter a decimal again for the next input.
      state.decimalUsed = false;
      break;
    case "ac": // Clear everything.
      state.display = "0";
      state.history = "";
      state.accumulator = 0;
      state.awaitingInput = true;
      state.decimalUsed = false;
      break;
    case "ce": // Clear entry. Just clear the current screen.
      state.display = "0";
      state.awaitingInput = true;
      state.decimalUsed = false;
      break;
    case "equals": // Just updates accumulator with the last operator and the live numbers on the display.
      // Then displays the total on the screen.
      state.equalsIsActive = true;
      if (state.awaitingInput) {
        // This means the user has inputted an operator but not used it. Just discard it and return the current total.
        state.display = roundToMaxDigits(state.accumulator);
      } else {
        state.accumulator = operatorLookup[state.activeOperator](state.accumulator, parseFloat(state.display));
        state.history += state.display;
        state.display = roundToMaxDigits(state.accumulator);
        state.awaitingInput = true;
      }

      // You are now allowed to enter a decimal again for the next input.
      state.decimalUsed = false;
      break;
  }
}

export default processInput;
