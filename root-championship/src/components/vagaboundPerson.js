import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TIMEOUT_DELAY from '../config/config_const';

function VagaboundPerson(props) {
  const [buttonColor, setButtonColor] = React.useState('primary');
  const [isOpen, setIsOpen] = React.useState(false);
  function onClickProvider() {
    let colorButton = null;
    if (buttonColor == 'error') {
      colorButton = 'primary';
    } else {
      colorButton = 'error';
    }
    setButtonColor(colorButton);
    setIsOpen(true);
    props.setVagabound();
  }

  return (
    <>
      <Button
        variant="contained"
        color={buttonColor}
        onClick={() => onClickProvider()}
      >
        {' '}
        {props.name}
      </Button>
      <Snackbar
        open={isOpen}
        autoHideDuration={TIMEOUT_DELAY}
        onClose={() => setIsOpen(false)}
        message={'Wykluczono postać: ' + props.name}
      />
    </>
  );
}

export default VagaboundPerson;
