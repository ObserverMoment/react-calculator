import React, { Component } from 'react';
import styled from 'styled-components';
import constants from './constants.js';

const ButtonHolder = styled.section`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
`

const Button = styled.button`
  border-style: none;
  box-sizing: content-box;
  padding: 10px 0;
  margin: 5px;
  flex: 1 0 18%;
  background: ${
    (props) => (props.ac || props.ce) ? constants.CLEAR_BUTTON : constants.NUMBER_BUTTON
  };
  box-shadow: 0 4px 4px -1px rgb(42, 42, 42);
  color: rgba(244, 242, 241, 0.9);
  :active {
    box-shadow: 0 1px 2px -1px rgb(42, 42, 42);
    background: ${
      (props) => (props.ac || props.ce) ? constants.CLEAR_BUTTON : constants.NUMBER_BUTTON
    };
  }
  :focus {
    background: ${
      (props) => (props.ac || props.ce) ? constants.CLEAR_BUTTON : constants.NUMBER_BUTTON
    };
  }
`

class ButtonContainer extends Component {

  render() {
    return (
      <ButtonHolder>
        <Button onClick={this.props.passInputs} value="ac" type="ac" ac>AC</Button>
        <Button onClick={this.props.passInputs} value="ac" type="ce" ce>CE</Button>
        <Button onClick={this.props.passInputs} value="/" type="operator" operator>/</Button>
        <Button onClick={this.props.passInputs} value="*" type="operator" operator>*</Button>
        <Button onClick={this.props.passInputs} value="7" type="number" number>7</Button>
        <Button onClick={this.props.passInputs} value="8" type="number" number>8</Button>
        <Button onClick={this.props.passInputs} value="9" type="number" number>9</Button>
        <Button onClick={this.props.passInputs} value="-" type="operator" operator>-</Button>
        <Button onClick={this.props.passInputs} value="4" type="number" number>4</Button>
        <Button onClick={this.props.passInputs} value="5" type="number" number>5</Button>
        <Button onClick={this.props.passInputs} value="6" type="number" number>6</Button>
        <Button onClick={this.props.passInputs} value="+" type="operator" operator>+</Button>
        <Button onClick={this.props.passInputs} value="1" type="number" number>1</Button>
        <Button onClick={this.props.passInputs} value="2" type="number" number>2</Button>
        <Button onClick={this.props.passInputs} value="3" type="number" number>3</Button>
        <Button onClick={this.props.passInputs} value="." type="operator" operator>.</Button>
        <Button onClick={this.props.passInputs} value="0" type="number" number>0</Button>
        <Button onClick={this.props.passInputs} value="=" type="equals" equals>=</Button>
      </ButtonHolder>
    )
  }
}

export default ButtonContainer;
