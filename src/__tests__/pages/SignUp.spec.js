import React from 'react';
import { render } from 'react-native-testing-library';
import { first } from 'random-name';

import api from '../../services/api';

import SignUp from '../../pages/SignUp';

describe('SignUp page', () => {
  it('should contains user/password inputs', async () => {
    const { getByPlaceholder } = render(<SignUp />);

    expect(getByPlaceholder('Usuário')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });

  it('should create a user', async () => {
    const user = first();
    const password = '123123123';

    const userToSend = {
      username: `${user}`,
      password: `${password}`,
    };

    const response = await api.post('sign-up', userToSend);

    expect(response.status).toEqual(200);
  });
});
