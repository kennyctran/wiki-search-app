import { IArticle } from "../../../components/article/article";

export const createArticleFixtures = (numOfArticles: number): IArticle[] => {
  let uniqueKey = 0;
  const articles: IArticle[] = Array(numOfArticles).fill({});
  return articles.map(_ => {
    const key = uniqueKey++;
    return {
      article: `test_title_${key}`,
      rank: uniqueKey,
      views: Math.ceil(Math.random())
    }
  });
}