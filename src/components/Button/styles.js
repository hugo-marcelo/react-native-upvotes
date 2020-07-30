import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 330px;
  height: 60px;
  background: #ff9000;
  border-radius: 40px;
  margin-top: 20px;

  justify-content: center;
  align-items: center;
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;
