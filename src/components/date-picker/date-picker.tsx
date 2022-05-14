import React from 'react';
import { getYesterday } from '../../helpers/date';
import './date-picker.css';

interface IDatePickerProps {
  handleDateChange: (e: any) => void;
  children?: never;
}

export const DatePicker = React.memo((props: IDatePickerProps): JSX.Element => {
  const { handleDateChange } = props;

  return (
    <div className="date-picker-container">
      <label htmlFor="date-picker">Select date: </label>
      <input type="date" id="date-picker" name="date-picker" defaultValue={getYesterday('yyyy-MM-dd')} onChange={handleDateChange} data-testid="date-selector"></input>
    </div>
  )
});
