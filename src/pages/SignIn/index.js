import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { object, string, ValidationError } from 'yup';

import { Form } from '@unform/mobile';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {
  Container,
  Content,
  Login,
  LoginTitle,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

export default function SignIn({ navigation }) {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loading] = useState(false);

  const handleSignIn = useCallback(async data => {
    try {
      formRef.current.setErrors({});

      const schema = object().shape({
        username: string().required('O nome é obrigatório'),
        password: string().required('A senha é obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.post('sign-in', data);

      api.defaults.headers.Authorization = `Bearer ${response.data}`;

      navigation.navigate('Main');
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);

        return;
      }

      Alert.alert('Erro na atutenticação', 'Ocorreu um erro ao fazer login!');
    }
  }, []);

  return (
    <>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <StatusBar barStyle="light-content" backgroundColor="#888" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Content>
            <Login>
              <LoginTitle>Faça seu logon</LoginTitle>
            </Login>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                name="username"
                placeholder="Usuário"
                icon="account"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="onepassword"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current.submitForm();
                }}
              />

              <Button
                loading={loading}
                onPress={() => formRef.current.submitForm()}
              >
                Entrar
              </Button>
            </Form>
          </Content>
        </ScrollView>
      </Container>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}
