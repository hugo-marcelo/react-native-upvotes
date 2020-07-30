import React from 'react';
import { render } from 'react-native-testing-library';

import api from '../../services/api';

import CreateMessage from '../../pages/CreateMessage';

describe('New message Page', () => {
  it('should contains message inputs', async () => {
    const { getByPlaceholder } = render(<CreateMessage />);

    expect(getByPlaceholder('Mensagem')).toBeTruthy();
  });

  it('should create a new message', async () => {
    const user = 'hugomarcelo';
    const password = '123123123';

    const userToSend = {
      username: `${user}`,
      password: `${password}`,
    };

    const responseLogin = await api.post('sign-in', userToSend);

    api.defaults.headers.Authorization = `Bearer ${responseLogin.data}`;

    const messageToSend = {
      content: 'Teste de mensagem',
    };

    const response = await api.post('feed', messageToSend);

    expect(response.status).toEqual(201);
  });
});
