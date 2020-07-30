import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { object, string, ValidationError } from 'yup';

import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container, Content } from './styles';

export default function Login({ navigation }) {
  const formRef = useRef(null);
  const [loading] = useState(false);

  const postMessage = useCallback(async data => {
    try {
      formRef.current.setErrors({});

      const schema = object().shape({
        content: string().required('A mensagem é obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.post('feed', data);

      Alert.alert('Mensagem postada com sucesso!');
      navigation.navigate('Main');
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);

        return;
      }

      Alert.alert('Erro no envio', 'Ocorreu um erro ao enviar a mensagem!');
    }
  }, []);

  return (
    <Container>
      <StatusBar style="auto" />
      {loading ? (
        <ActivityIndicator size={50} />
      ) : (
        <Content>
          <Form ref={formRef} onSubmit={postMessage}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="content"
              placeholder="Mensagem"
              icon="android-messages"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current.submitForm();
              }}
            />

            <Button
              loading={loading}
              onPress={() => formRef.current.submitForm()}
            >
              Enviar
            </Button>
          </Form>
        </Content>
      )}
    </Container>
  );
}
