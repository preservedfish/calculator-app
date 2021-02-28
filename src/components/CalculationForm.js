import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button } from 'react-bootstrap';

const CalculationForm = ({
  addCalculation,
  newCalculation,
  setNewCalculation,
}) => (
  <Form className="w-50 mb-3" onSubmit={addCalculation}>
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="E.g. 2+2"
        value={newCalculation}
        onChange={(event) => setNewCalculation(event.target.value)}
      />
      <InputGroup.Append>
        <Button type="submit" variant="outline-primary">
          Calculate
        </Button>
      </InputGroup.Append>
    </InputGroup>
    <Form.Text>
      You can use operators such as +, -, *, **, /, %. Parentheses and decimals
      work too.
    </Form.Text>
    <Form.Text>
      <i>
        Past calculations are hidden to first-time visitors unless they enter a
        calculation or refresh the page.
      </i>
    </Form.Text>
  </Form>
);

CalculationForm.propTypes = {
  addCalculation: PropTypes.func.isRequired,
  newCalculation: PropTypes.string.isRequired,
  setNewCalculation: PropTypes.func.isRequired,
};

export default CalculationForm;
