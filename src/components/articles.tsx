import React from 'react';

interface IArticlesProps {
  articles: any[];
  limit: number;
}

export const Articles = (props: IArticlesProps): JSX.Element => {
  const { articles, limit } = props;
  // Possible TODO: Pagination?
  return (
    <div>
      { articles.map((article, rank) => {
        if (rank < limit) {
          return (
            <div key={rank}>
              <h2>{article.article}</h2>
              <p>views: {article.views}</p>
            </div>
          )
        }
        return null;
      })}
    </div>
  );
}
