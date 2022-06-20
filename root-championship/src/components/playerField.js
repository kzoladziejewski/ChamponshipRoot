import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import TIMEOUT_DELAY from '../config/config_const';

function PlayerField(props) {
  const [buttonColor, setButtonColor] = React.useState('primary');

  const [isOpen, setIsOpen] = React.useState(false);

  const [text, setText] = React.useState('');

  function onClickProvider() {
    setIsOpen(true);
    console.log(text);
    props.addPlayer(text);
    setText('');
  }

  function onChange(event) {
    setText(event.target.value);
  }

  return (
    <>
      <TextField
        id="standard-basic"
        label="Nazwa"
        variant="standard"
        onChange={onChange}
        value={text}
      />
      <Button
        variant="contained"
        color={buttonColor}
        onClick={() => onClickProvider()}
      >
        {'Dodaj gracza'}
      </Button>

      <Snackbar
        open={isOpen}
        autoHideDuration={TIMEOUT_DELAY}
        onClose={() => setIsOpen(false)}
        message={'Dodano gracza ' + props.name}
      />
    </>
  );
}

export default PlayerField;
