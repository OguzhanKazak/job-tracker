import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save'; // Import Material UI icon
import './TextChangerPopup.css'; // Import the CSS file

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
    <div className="overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="container">
          <label className="label">Task definition:</label>
          <textarea
            className="textarea"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="footer">
            <SaveIcon className="save-icon" />
            <span className="character-count">{`${value.length}/${maxLength}`}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}