import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Notification = ({ setShow, alert }) => (
  <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    <b>Error:</b> Something went wrong. Check that your calculation is valid.{' '}
    <i>({alert})</i>
  </Alert>
);

Notification.propTypes = {
  setShow: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
};

export default Notification;
