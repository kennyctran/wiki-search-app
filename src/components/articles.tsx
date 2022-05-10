import React from 'react';

interface IArticlesProps {
  articles: any[];
  limit?: number;
  handleSave?: (article: any) => void;
  handleRemove?: (article: any) => void;
}

export const Articles = (props: IArticlesProps): JSX.Element => {
  const { articles, limit, handleSave, handleRemove } = props;
  // Possible TODO: Pagination?
  return (
    <div>
      { articles.map((article, rank) => {
        if (!limit || rank < limit) {
          return (
            <div key={rank}>
              <h2>{article.article}</h2>
              <p>views: {article.views}</p>
              { handleSave && <button onClick={() => handleSave(article)}>save</button> }
              { handleRemove && <button onClick={() => handleRemove(article)}>remove</button>}
            </div>
          )
        }
        return null;
      })}
    </div>
  );
}
