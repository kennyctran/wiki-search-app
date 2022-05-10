import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker } from '../../components/date-picker';
import { format } from 'date-fns';
import { ResultLimiter } from 'src/components/result-limiter';

export const WikiSearch = () => {
    // TODO: set this default string by calculating date
  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [selectedResultLimit, setSelectedResultLimit] = useState(100);
  // TODO: Add init of state that reads from localStorage pinned searches
    // on selection of new search, update state, add to localStorage

  const handleDateChange = useCallback((e) => {
    // should be formatted yyyy-MM-dd
    setSelectedDate(e.target.value);
  }, []);

  const handleResultLimitChange = useCallback((e): void => {
    setSelectedResultLimit(Number(e.target.value));
  }, []);

  // add useEffect to send off api request whenever result limit changes or if date changes
  useEffect(() => {
    //TODO: Add an api call here
  }, [selectedDate, selectedResultLimit]);

  return (
    <div id="wiki-search-feature">
      <DatePicker handleDateChange={handleDateChange} selectedDate={selectedDate}/>
      <ResultLimiter resultLimit={selectedResultLimit} changeResultLimit={handleResultLimitChange}/>
    </div>
  )
}

