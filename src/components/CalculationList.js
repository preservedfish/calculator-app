import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

const CalculationList = ({ calculations }) => (
  <Card style={{ width: '18rem' }}>
    <ListGroup variant="flush">
      {calculations.map((object) =>
        calculations.indexOf(object) === 0 ? (
          // First calculation is active, making it blue
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
);

CalculationList.propTypes = {
  calculations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      calculation: PropTypes.string,
      result: PropTypes.number,
    })
  ).isRequired,
};

export default CalculationList;
