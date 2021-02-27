import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import CalculationList from './CalculationList';

describe('<CalculationList />', () => {
  let calculations;
  let component;

  beforeEach(() => {
    calculations = [
      { calculation: '1+1', id: '1' },
      { calculation: '(2+2)*3', id: '2' },
    ];
    component = render(<CalculationList calculations={calculations} />);
  });

  test('renders calculations', () => {
    expect(component.container).toHaveTextContent('1+1' && '(2+2)*3');
  });
});
