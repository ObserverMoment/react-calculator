import React, { Component } from 'react';
import styled from 'styled-components';
import constants from './constants.js';

const ButtonHolder = styled.section`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
`

const Button = styled.button`
  border-style: none;
  box-sizing: content-box;
  padding: 10px 0;
  margin: 5px;
  flex: 1 0 18%;
  border-radius: 8px;
  background: ${
    (props) => props.ac ? constants.CLEAR_BUTTON : constants.NUMBER_BUTTON
  };
  box-shadow: 0 4px 4px -1px rgb(42, 42, 42);
  color: 'snow';
`

class ButtonContainer extends Component {

  render() {
    return (
      <ButtonHolder>
        <Button ac>AC</Button>
        <Button ac>CE</Button>
        <Button operator>/</Button>
        <Button operator>*</Button>
        <Button number>7</Button>
        <Button number>8</Button>
        <Button number>9</Button>
        <Button operator>-</Button>
        <Button number>4</Button>
        <Button number>5</Button>
        <Button number>6</Button>
        <Button operator>+</Button>
        <Button number>1</Button>
        <Button number>2</Button>
        <Button number>3</Button>
        <Button operator>.</Button>
        <Button number>0</Button>
        <Button equals>=</Button>
      </ButtonHolder>
    )
  }
}

export default ButtonContainer;
