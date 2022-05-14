import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker } from '../../components/date-picker/date-picker';
import { format } from 'date-fns';
import { ResultLimiter } from '../../components/result-limiter/result-limiter';
import { getArticles } from '../../api/wiki-service';
import { Articles } from '../../components/articles/articles';
import { IArticle } from '../../components/article/article';
import { getYesterday } from '../../helpers/date';
import { usePinnedArticles } from '../../hooks/use-pinned-articles';
import './wiki-search.css';
import { Placeholder } from '../../components/placeholder/placeholder';

export enum LocalStorageKeys {
  PinnedArticles = 'pinned-articles'
}

export const WikiSearch = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    return getYesterday('yyyy/MM/dd');
  });
  const [selectedResultLimit, setSelectedResultLimit] = useState<number>(100);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const { pinnedArticles, pinArticle, unpinArticle } = usePinnedArticles();

  const handleDateChange = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setSelectedDate(format(new Date(e.currentTarget.value), 'yyyy/MM/dd'));
  }, [selectedDate]);

  const handleResultLimitChange = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setSelectedResultLimit(Number(e.currentTarget.value));
  }, [selectedResultLimit]);

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

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
      <h1 className="app-title">Most Popular Pages Search</h1>
      <aside className="pinned-articles-container">
          <h2>Pinned Pages: </h2>
          { pinnedArticles.length
          ? <Articles articles={pinnedArticles} handleRemove={unpinArticle} />
          : <Placeholder text={'no pinned pages...yet'} />
          }
        </aside>
      <br />
      <section className="search-selectors-container">
        <DatePicker handleDateChange={handleDateChange} />
        <ResultLimiter resultLimit={selectedResultLimit}
        changeResultLimit={handleResultLimitChange}/>
      </section>
      <section className="searched-articles-container">
        { loading
        ? <Placeholder text={'Loading...'} />
        : !articles.length
        ? <Placeholder text={'Unable to find page views, please try a different date...'} />
        : <Articles articles={articles} limit={selectedResultLimit} handleSave={pinArticle}/> }
      </section>
      { !loading && articles.length
        ? <aside className="back-to-top">
            <button onClick={backToTop}>back to top</button>
          </aside>
        : null
      }
    </div>
  );
}
