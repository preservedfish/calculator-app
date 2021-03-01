import React, { useState, useEffect } from 'react';

import firebaseService from './services/firebase';
import CalculationForm from './components/CalculationForm';
import CalculationList from './components/CalculationList';
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
      setShow(true);
    }
  }, [newCalculation]);

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
      <CalculationForm
        addCalculation={addCalculation}
        newCalculation={newCalculation}
        setNewCalculation={setNewCalculation}
      />
      <CalculationList calculations={calculations} />
    </div>
  );
};

export default App;
