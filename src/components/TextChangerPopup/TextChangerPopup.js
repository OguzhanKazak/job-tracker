import React from 'react';
import { Unstable_Popup as Popup } from '@mui/base';
import { styled } from '@mui/system';

export default function TextChangerPopup({ open, anchor, onEnterPress }) {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents a newline from being added
      if (onEnterPress) {
        onEnterPress(event.target.value);
      }
    }
  };
  
  return (
    <Popup
      id={open ? 'simple-popper' : undefined}
      open={open}
      anchor={anchor}
      disablePortal
    >
      <StyledContainer>
        <StyledTextarea autoFocus onKeyDown={handleKeyDown} />
      </StyledContainer>
    </Popup>
  );
}

const StyledContainer = styled('div')({
  marginTop: '8px',
  padding: '16px',
  backgroundColor: '#fff',
  border: '3px solid #4A90E2',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledTextarea = styled('textarea')({
  width: '100%',
  height: '30px',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  textAlign: 'center',
  resize: 'none',
});
