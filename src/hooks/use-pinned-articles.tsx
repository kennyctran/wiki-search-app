import { useCallback, useState } from "react";
import { IArticle } from "../components/article/article";
import { LocalStorageKeys } from "../features/wiki-search";

export const usePinnedArticles = () => {
  const [articles, setArticles] = useState<IArticle[]>(() => {
    const storedArticles = localStorage.getItem(LocalStorageKeys.PinnedArticles);
    return storedArticles ? JSON.parse(storedArticles) : [];
  });

  const pinArticle = useCallback((article: IArticle) => {
    const savedArticles = [ ...articles, article ];
    setArticles(savedArticles);
    localStorage.setItem(LocalStorageKeys.PinnedArticles, JSON.stringify(savedArticles));
  }, []);

  const unpinArticle = useCallback((article: IArticle) => {
    // FIXME: This is not removing individual and keeps same title articles around
    const savedArticles = articles.filter((item: typeof article) => (item.article !== article.article && item.views !== article.views));
    setArticles(savedArticles);
    localStorage.setItem(LocalStorageKeys.PinnedArticles, JSON.stringify(savedArticles));
  }, []);

  return { pinnedArticles: articles, pinArticle, unpinArticle };
}