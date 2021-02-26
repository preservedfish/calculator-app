import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import firebaseService from './services/firebase';

const App = () => {
  const [calculations, setCalculations] = useState([]);
  const [newCalculation, setNewCalculation] = useState('');

  useEffect(() => {
    firebaseService.getCalculations(setCalculations);
  }, []);

  const addCalculation = (event) => {
    event.preventDefault();
    firebaseService.createCalculation(newCalculation);
    setNewCalculation('');
  };

  return (
    <div className="container">
      <h1>Calculator</h1>
      <Form className="w-50" onSubmit={addCalculation}>
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
          You can use operators such as +, -, *, **, /, %. Parentheses and
          decimals work too.
        </Form.Text>
      </Form>
      <ul>
        {calculations.map((object) => (
          <li key={object.id}>
            {object.calculation} = {object.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
