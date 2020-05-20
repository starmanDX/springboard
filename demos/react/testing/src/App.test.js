import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

//SMOKETEST
test('it renders without crashing', () => {
  render(<App />)
})
