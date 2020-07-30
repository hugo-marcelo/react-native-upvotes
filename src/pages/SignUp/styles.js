import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: rgb(59, 64, 78);
  align-items: center;
  justify-content: center;
`;

export const Login = styled.View`
  margin-bottom: 50px;
`;

export const LoginTitle = styled.Text`
  color: #fff;
  font-size: 35px;
  font-weight: bold;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`;
