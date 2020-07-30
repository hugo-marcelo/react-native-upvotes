import React from 'react';
import { render } from 'react-native-testing-library';

import api from '../../services/api';

import SignIn from '../../pages/SignIn';

describe('SignIn page', () => {
  it('should contains user/password inputs', async () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('Usuário')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });

  it('should login on app with the credentials', async () => {
    const user = 'hugomarcelo';
    const password = '123123123';

    const userToSend = {
      username: `${user}`,
      password: `${password}`,
    };

    const response = await api.post('sign-in', userToSend);

    expect(response.status).toEqual(200);
  });
});
