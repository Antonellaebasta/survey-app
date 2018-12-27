import React from 'react';
import styled from 'styled-components';
import { COLOURS } from '../constants';

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid ${COLOURS.DEFAULT};
  border-top: 2px solid ${COLOURS.SECONDARY}
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const Loader = () => <Spinner/>;

export default Loader;