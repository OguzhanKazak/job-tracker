import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import './TextChangerPopup.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TextChangerPopup({ open, onClose, onEnterPress, maxLength = 250 }) {
  const [textValue, setTextValue] = useState('');
  const [dateValue, setDateValue] = useState(dayjs());

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (onEnterPress) {
        onEnterPress(textValue, dayjs(dateValue).format('DD/MM/YYYY'));
      }
    }
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value.slice(0, maxLength));
  };

  return open ? (
    <div className="overlay">
      <div className="popup">
        <div className='date-picker'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DatePicker
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
            />
          </LocalizationProvider>
        </div>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="container">
          <label className="label">Task definition:</label>
          <textarea
            className="textarea"
            value={textValue}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="footer">
            <SaveIcon className="save-icon" />
            <span className="character-count">{`${textValue.length}/${maxLength}`}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}