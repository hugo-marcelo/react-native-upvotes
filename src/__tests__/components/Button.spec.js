import React from 'react';
import { render } from 'react-native-testing-library';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render a button', () => {
    const { getByText } = render(<Button loading={false}>Enviar</Button>);

    expect(getByText('Enviar')).toBeTruthy();
  });
});
