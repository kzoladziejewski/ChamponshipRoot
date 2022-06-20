import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TIMEOUT_DELAY from '../config/config_const';

function FractionButton(props) {
  const [buttonColor, setButtonColor] = React.useState('primary');
  const [isOpen, setIsOpen] = React.useState(false);
  function onClickProvider() {
    let colorButton = null;
    if (buttonColor == 'success') {
      colorButton = 'primary';
    } else {
      colorButton = 'success';
    }
    setButtonColor(colorButton);
    setIsOpen(true);
    props.addFractions();
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
        message={'Dodano frakcje ' + props.name}
      />
    </>
  );
}

export default FractionButton;
