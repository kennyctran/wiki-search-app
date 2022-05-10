import React from 'react';

interface IDatePickerProps {
  selectedDate: string;
  handleDateChange: (e: any) => void;
  children?: never;
}

export const DatePicker = React.memo((props: IDatePickerProps): JSX.Element => {
  const { handleDateChange, selectedDate } = props;

  return (
    <div>
      <label htmlFor="date-picker">Select Date: </label>
      <input type="date" id="date-picker" name="date-picker" defaultValue={selectedDate} onChange={handleDateChange}></input>
    </div>
  )
});
