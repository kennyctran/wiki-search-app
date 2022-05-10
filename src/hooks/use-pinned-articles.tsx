import React, { useCallback, useState } from "react";
import { LocalStorageKeys } from "../features/wiki-search";

export const usePinnedArticles = () => {
  const [articles, setArticles] = useState(() => {
    const storedArticles = localStorage.getItem(LocalStorageKeys.PinnedArticles);
    return storedArticles ? JSON.parse(storedArticles) : [];
  });

  const pinArticle = useCallback((article: any) => {
    const savedArticles = [ ...articles, article ];
    setArticles(savedArticles);
    localStorage.setItem(LocalStorageKeys.PinnedArticles, JSON.stringify(savedArticles));
  }, []);

  const unpinArticle = useCallback((article: any) => {
    const savedArticles = articles.filter((item: typeof article) => item.title !== article.title);
    setArticles(savedArticles);
    localStorage.setItem(LocalStorageKeys.PinnedArticles, savedArticles);
  }, []);

  return { pinnedArticles: articles, pinArticle, unpinArticle };
}