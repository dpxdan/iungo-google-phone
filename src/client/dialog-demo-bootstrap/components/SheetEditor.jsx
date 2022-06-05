import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Button, ListGroup } from 'react-bootstrap';
import FormInput from './FormInput.tsx';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    serverFunctions
      .getSheetsData()
      .then(setNames)
      .catch(alert);
  }, []);

  const deleteSheet = sheetIndex => {
    serverFunctions
      .deleteSheet(sheetIndex)
      .then(setNames)
      .catch(alert);
  };

  const setActiveSheet = sheetName => {
    serverFunctions
      .setActiveSheet(sheetName)
      .then(setNames)
      .catch(alert);
  };

  const submitNewSheet = async newSheetName => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
  
    </div>
  );
};

export default SheetEditor;
