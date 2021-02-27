import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Notification from './Notification';

describe('<Notification />', () => {
  let setShow;
  let alert;
  let component;

  beforeEach(() => {
    setShow = jest.fn();
    alert = 'Testing alert';
    component = render(<Notification alert={alert} setShow={setShow} />);
  });

  test('renders alert', () => {
    expect(component.container).toHaveTextContent('Testing alert');
  });

  test('calls onClick when dismiss button is clicked', () => {
    const dismissButton = component.container.querySelector('button');

    fireEvent.click(dismissButton);

    expect(setShow.mock.calls).toHaveLength(1);
  });
});
