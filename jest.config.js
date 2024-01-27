module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  // Ostale Jest konfiguracije...
  // import React from 'react';
  // import { render, screen } from '@testing-library/react';
  // import App from './App';

  // test('renders learn react link', () => {
  //   render(<App />);
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
};
