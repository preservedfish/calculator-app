import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CalculationForm from './CalculationForm';

describe('<CalculationForm />', () => {
  let addCalculation;
  let setNewCalculation;
  let component;

  beforeEach(() => {
    addCalculation = jest.fn();
    setNewCalculation = jest.fn();
    component = render(
      <CalculationForm
        addCalculation={addCalculation}
        newCalculation=""
        setNewCalculation={setNewCalculation}
      />
    );
  });

  test('calls onSubmit when form is submitted', () => {
    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: '1+1' },
    });
    fireEvent.submit(form);

    expect(addCalculation.mock.calls).toHaveLength(1);
  });
});
