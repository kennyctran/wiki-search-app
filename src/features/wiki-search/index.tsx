import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker } from '../../components/date-picker';
import { format } from 'date-fns';
import { ResultLimiter } from '../../components/result-limiter';
import { getArticles } from '../../api/wiki-service';
import { Articles } from '../../components/articles';

export const WikiSearch = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    // One time init of yyyy-MM-dd instead of yyyy/MM/dd to correctly set default on native Date picker
    return format(date, 'yyyy-MM-dd');
  });
  const [selectedResultLimit, setSelectedResultLimit] = useState(100);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  // TODO: Add init of state that reads from localStorage pinned searches
    // on selection of new search, update state, add to localStorage

  const handleDateChange = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    // should be formatted yyyy/MM/dd
    // TODO: Add error handling from receiving non valid date?
    setSelectedDate(format(new Date(e.currentTarget.value), 'yyyy/MM/dd'));
  }, []);

  const handleResultLimitChange = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setSelectedResultLimit(Number(e.currentTarget.value));
  }, []);

  useEffect(() => {
    (async (): Promise<void> => {
      setLoading(true);
      const wikiArticleResults = await getArticles(selectedDate);
      setArticles(wikiArticleResults);
      setLoading(false);
    })();
  }, [selectedDate]);

  return (
    <div id="wiki-search-feature">
      <DatePicker handleDateChange={handleDateChange} selectedDate={selectedDate}/>
      <ResultLimiter resultLimit={selectedResultLimit} changeResultLimit={handleResultLimitChange}/>
      { loading ? <h1>Loading...</h1> : <Articles articles={articles} limit={selectedResultLimit}/> }
    </div>
  );
}
