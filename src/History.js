import React, { Component } from 'react';
import styled from 'styled-components';

const HistoryHolder = styled.div`
  font-size: 12px;
  color: #5c5c5c;
`
class History extends Component {
  render() {
    return (
      <HistoryHolder>
        {this.props.data || 0}
      </HistoryHolder>
    )
  }
}

export default History;
