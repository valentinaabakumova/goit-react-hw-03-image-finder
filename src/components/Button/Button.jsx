import React from 'react';
import styled from 'styled-components';

const Button = ({ loadMore }) => (
  <MyButton type="button" onClick={loadMore}>
    load more
  </MyButton>
);
const MyButton = styled.button`
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: rgba(39, 37, 37, 0.652);

  text-align: center;
  display: block;
  color: white;
  cursor: pointer;
  border: 0;
  font-family: monospace;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  width: 200px;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: rgba(39, 37, 37, 0.752);
  }
`;

export default Button;
