import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 330px;
  height: 60px;
  padding: 10px 15px;
  background: #232129;
  border-radius: 6px;
  border-color: #232129;
  border-width: 2px;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `};

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `};

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  color: #fff;
  font-size: 15px;
  margin-left: 10px;
`;
