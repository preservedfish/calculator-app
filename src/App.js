import React, { useState, useEffect } from 'react';
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
      <form onSubmit={addCalculation}>
        <input
          value={newCalculation}
          onChange={(event) => setNewCalculation(event.target.value)}
        />
        <button type="submit">calculate</button>
      </form>
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
