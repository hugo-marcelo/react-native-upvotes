import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: #eee;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

export const CardMessage = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const Card = styled.View`
  border-radius: 10px;
  background-color: #fff;
`;

export const Message = styled.View`
  height: 150px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #ff9000;
  padding: 10px;
`;

export const MessageInter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MessageContent = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export const MessageAuthor = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const Opcoes = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Icons = styled.View`
  flex: 1;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LikeButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LikeText = styled.Text`
  margin-left: 10px;
`;
