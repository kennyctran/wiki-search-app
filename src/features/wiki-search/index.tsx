import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker } from '../../components/date-picker/date-picker';
import { format } from 'date-fns';
import { ResultLimiter } from '../../components/result-limiter/result-limiter';
import { getArticles } from '../../api/wiki-service';
import { Articles } from '../../components/articles/articles';
import { IArticle } from '../../components/article/article';
import { getYesterday } from '../../helpers/date';
import { usePinnedArticles } from '../../hooks/use-pinned-articles';

export enum LocalStorageKeys {
  PinnedArticles = 'pinned-articles'
}

export const WikiSearch = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    // One time init of yyyy-MM-dd instead of yyyy/MM/dd to correctly set default on native Date picker
    return getYesterday('yyyy/MM/dd');
  });
  const [selectedResultLimit, setSelectedResultLimit] = useState<number>(100);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const { pinnedArticles, pinArticle, unpinArticle } = usePinnedArticles();

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
      <Articles articles={pinnedArticles} handleRemove={unpinArticle} />
      <br />
      <br />
      <DatePicker handleDateChange={handleDateChange} />
      <ResultLimiter resultLimit={selectedResultLimit} changeResultLimit={handleResultLimitChange}/>
      { loading ? <h1>Loading...</h1> : <Articles articles={articles} limit={selectedResultLimit} handleSave={pinArticle}/> }
    </div>
  );
}
