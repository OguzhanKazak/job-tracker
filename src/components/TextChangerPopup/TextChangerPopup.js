import React, { useState } from 'react';
import { styled } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save'; // Import Material UI icon

export default function TextChangerPopup({ open, onClose, onEnterPress, maxLength = 250 }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent newline
      if (onEnterPress) {
        onEnterPress(value);
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value.slice(0, maxLength)); // Limit input to maxLength
  };

  return open ? (
    <Overlay>
      <StyledPopup>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <StyledContainer>
          <Label>Task definition:</Label>
          <StyledTextarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Footer>
            <SaveIcon sx={{ fontSize: '20px', color: '#666', marginRight: '8px' }} />
            <CharacterCount>{`${value.length}/${maxLength}`}</CharacterCount>
          </Footer>
        </StyledContainer>
      </StyledPopup>
    </Overlay>
  ) : null;
}

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000,
});

const StyledPopup = styled('div')({
  position: 'relative',
  width: '90%',
  maxWidth: '400px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  border: '2px solid #A3D977', // Green border
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledContainer = styled('div')({
  width: '90%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Label = styled('label')({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: '12px',
  textAlign: 'left',
  width: '100%',
});

const StyledTextarea = styled('textarea')({
  width: '100%',
  height: '80px',
  padding: '8px',
  fontSize: '1rem',
  color: '#333',
  backgroundColor: '#f7f7f7',
  border: '1px solid #ddd',
  borderRadius: '8px',
  outline: 'none',
  resize: 'none',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  '&:focus': {
    borderColor: '#A3D977',
    boxShadow: '0 0 0 3px rgba(163, 217, 119, 0.3)',
    backgroundColor: '#fff',
  },
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  marginTop: '12px',
});

const CharacterCount = styled('span')({
  fontSize: '0.9rem',
  color: '#666',
});

const CloseButton = styled('button')({
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '32px',
  height: '32px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#999',
  cursor: 'pointer',
  outline: 'none',
  transition: 'color 0.2s',

  '&:hover': {
    color: '#A3D977',
  },
});
