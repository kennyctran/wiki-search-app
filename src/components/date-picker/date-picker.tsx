import React from 'react';
import { getYesterday } from '../../helpers/date';

interface IDatePickerProps {
  handleDateChange: (e: any) => void;
  children?: never;
}

export const DatePicker = React.memo((props: IDatePickerProps): JSX.Element => {
  const { handleDateChange } = props;

  return (
    <div>
      <label htmlFor="date-picker">Select Date: </label>
      <input type="date" id="date-picker" name="date-picker" defaultValue={getYesterday('yyyy-MM-dd')} onChange={handleDateChange}></input>
    </div>
  )
});
