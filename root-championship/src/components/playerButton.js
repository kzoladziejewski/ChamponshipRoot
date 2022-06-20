import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import TIMEOUT_DELAY from '../config/config_const';

function PlayerButton(props) {
  const [buttonColor, setButtonColor] = React.useState('primary');

  const [isOpen, setIsOpen] = React.useState(false);

  function onClickProvider() {
    setIsOpen(true);
    props.addPlayer();
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
        message={'Usunieto gracza ' + props.name}
      />
    </>
  );
}

export default PlayerButton;
