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
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

export default function SignUp({ navigation }) {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loading] = useState(false);

  const handleSignUp = useCallback(async data => {
    try {
      formRef.current.setErrors({});

      const schema = object().shape({
        username: string().required('O nome é obrigatório'),
        password: string().required('A senha é obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('sign-up', data);

      Alert.alert('Cadastro realizado', 'Usuário cadastrado com sucesso!');

      navigation.goBack();
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);

        return;
      }

      Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro!');
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
              <LoginTitle>Crie sua conta</LoginTitle>
            </Login>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                name="username"
                placeholder="Usuário"
                icon="account"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                name="password"
                icon="onepassword"
                placeholder="Senha"
                textContentType="newPassword"
              />

              <Button
                loading={loading}
                onPress={() => formRef.current.submitForm()}
              >
                Cadastrar
              </Button>
            </Form>
          </Content>
        </ScrollView>
      </Container>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
}
