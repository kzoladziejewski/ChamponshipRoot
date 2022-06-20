import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

function MapButton(props) {
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
    props.addMaps();
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
        autoHideDuration={1}
        onClose={() => setIsOpen(false)}
        message={'Wybrano mape ' + props.name}
      />
    </>
  );
}

export default MapButton;
