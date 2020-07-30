import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import api from '../../services/api';

import {
  Container,
  Content,
  Card,
  CardMessage,
  Message,
  MessageInter,
  MessageContent,
  MessageAuthor,
  Opcoes,
  Icons,
  LikeButton,
  LikeText,
} from './styles';

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    const response = await api.get('feeds');
    setMessages(response.data);
    setLoading(false);
  }

  async function voteLikes(id) {
    const message = {
      feedId: `${id}`,
      like: true,
    };
    const response = await api.post('reaction', message);

    if (response.status === 200) {
      loadMessages();
      Alert.alert('Voto Recebido com sucesso!');
    } else {
      Alert.alert('Houve um erro ao votar!');
    }
  }

  async function voteLoves(id) {
    const message = {
      feedId: `${id}`,
      love: true,
    };
    const response = await api.post('reaction', message);

    if (response.status === 200) {
      loadMessages();
      Alert.alert('Voto Recebido com sucesso!');
    } else {
      Alert.alert('Houve um erro ao votar!');
    }
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <Content>
        {loading ? (
          <ActivityIndicator size={40} color="#ff9000" />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            data={messages}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CardMessage>
                <Card>
                  <Message>
                    <MessageInter>
                      <MessageContent>{item.content}</MessageContent>
                    </MessageInter>
                    <MessageAuthor>{`Por: ${item.author.username}`}</MessageAuthor>
                  </Message>
                  <Opcoes>
                    <Icons>
                      <LikeButton onPress={() => voteLikes(item.id)}>
                        <AntDesign
                          name="like1"
                          size={24}
                          color={item.likes > 0 ? '#ff9000' : '#666360'}
                        />
                        <LikeText>{item.likes}</LikeText>
                      </LikeButton>
                    </Icons>

                    <Icons>
                      <LikeButton onPress={() => voteLoves(item.id)}>
                        <MaterialCommunityIcons
                          name="heart"
                          size={24}
                          color={item.loves > 0 ? '#ff9000' : '#666360'}
                        />
                        <LikeText>{item.loves}</LikeText>
                      </LikeButton>
                    </Icons>
                  </Opcoes>
                </Card>
              </CardMessage>
            )}
          />
        )}
      </Content>
    </Container>
  );
}
