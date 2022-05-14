import { useCallback, useState } from "react";
import { IArticle } from "../components/article/article";
import { LocalStorageKeys } from "../features/wiki-search";

interface IUsePinnedArticlesReturn {
  pinnedArticles: IArticle[];
  pinArticle: (article: IArticle) => void;
  unpinArticle: (article: IArticle) => void;
}

export const usePinnedArticles = (): IUsePinnedArticlesReturn => {
  const [articles, setArticles] = useState<IArticle[]>(() => {
    const storedArticles = localStorage.getItem(LocalStorageKeys.PinnedArticles);
    return storedArticles ? JSON.parse(storedArticles) : [];
  });

  const pinArticle = useCallback((article: IArticle) => {
    const savedArticles = [ ...articles, article ];
    setArticles(savedArticles);
    localStorage.setItem(LocalStorageKeys.PinnedArticles, JSON.stringify(savedArticles));
  }, [articles]);

  const unpinArticle = useCallback((article: IArticle) => {
    const savedArticles = articles.filter((item: IArticle) => item.article !== article.article);
    setArticles(savedArticles);
    localStorage.setItem(LocalStorageKeys.PinnedArticles, JSON.stringify(savedArticles));
  }, [articles]);

  return { pinnedArticles: articles, pinArticle, unpinArticle };
}