import React, { Component } from 'react';
import styled from 'styled-components';

const DisplayHolder = styled.div`
  font-size: 32px;
`

class Display extends Component {
  render() {
    return (
      <DisplayHolder>
        {this.props.data || 0}
      </DisplayHolder>
    )
  }
}

export default Display;
