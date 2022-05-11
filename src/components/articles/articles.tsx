import React from 'react';
import { Article, IArticle } from '../article/article';
import  './articles.css';

interface IArticlesProps {
  articles: any[];
  limit?: number;
  handleSave?: HandleSaveType;
  handleRemove?: HandleRemoveType;
}

export type HandleSaveType = (article: IArticle) => void;
export type HandleRemoveType = (article: IArticle) => void;

export const Articles = React.memo((props: IArticlesProps): JSX.Element => {
  const { articles, limit, handleSave, handleRemove } = props;
  return (
    <article className='articles-container'>
      { articles.map((article: IArticle, rank: number) => {
        return (!limit || rank < limit)
          ? <Article article={article} handleSave={handleSave} handleRemove={handleRemove}/>
          : null
      })}
    </article>
  );
});
