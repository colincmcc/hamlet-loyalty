import React from 'react';
import styled from 'styled-components';

const ErrorComponent = props => (
  <ErrorWrapper {...props}>
    <Error {...props}>
    </Error>
  </ErrorWrapper>
);

export default ErrorComponent;
const ErrorWrapper = styled.div`
  height: ${props => (props.large ? '100vh' : '100%')};
  width: 100%;
  background-color: transparent;
  margin: auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: auto;
  color: ${props => props.theme.colors.warning};
`;