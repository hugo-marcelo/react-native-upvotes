import React from 'react';
import { render } from 'react-native-testing-library';

import api from '../../services/api';

import Main from '../../pages/Main';

describe('Main page', () => {
  it('should contains loading indicator', async () => {
    const { UNSAFE_getAllByType } = render(<Main />);

    expect(UNSAFE_getAllByType('ActivityIndicator')).toBeTruthy();
  });

  it('should list the feed', async () => {
    const user = 'hugomarcelo';
    const password = '123123123';

    const userToSend = {
      username: `${user}`,
      password: `${password}`,
    };

    const responseLogin = await api.post('sign-in', userToSend);

    api.defaults.headers.Authorization = `Bearer ${responseLogin.data}`;

    const response = await api.get('feeds');

    expect(response.status).toEqual(200);
  });
});
