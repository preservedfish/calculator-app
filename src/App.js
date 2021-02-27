import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Card, ListGroup } from 'react-bootstrap';

import firebaseService from './services/firebase';
import Notification from './components/Notification';

const App = () => {
  const [calculations, setCalculations] = useState([]);
  const [newCalculation, setNewCalculation] = useState('');
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    try {
      firebaseService.getCalculations(setCalculations);
    } catch (error) {
      setAlert(error.message);
    }
  }, []);

  const addCalculation = (event) => {
    event.preventDefault();
    try {
      firebaseService.createCalculation(newCalculation);
      setNewCalculation('');
      setShow(false);
    } catch (error) {
      setAlert(error.message);
      setShow(true);
    }
  };

  return (
    <div className="container">
      <h1>Calculator</h1>
      {show && <Notification setShow={setShow} alert={alert} />}
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
          You can use operators such as +, -, *, **, /, %. Parentheses and
          decimals work too.
        </Form.Text>
      </Form>
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          {calculations.map((object) =>
            calculations.indexOf(object) === 0 ? (
              <ListGroup.Item active key={object.id}>
                {object.calculation} = {object.result}
              </ListGroup.Item>
            ) : (
              <ListGroup.Item key={object.id}>
                {object.calculation} = {object.result}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default App;
