import { HandleRemoveType, HandleSaveType } from "../articles/articles";

export interface IArticle {
  article: string;
  rank: number;
  views: number;
}

export interface IArticleProps {
  article: IArticle;
  handleSave?: HandleSaveType;
  handleRemove?: HandleRemoveType;
}

export const Article = (props: IArticleProps): JSX.Element => {
  const { article, handleSave, handleRemove } = props;
  return (
    <div key={article.rank}>
      <h3>{article.article}</h3>
      <p>views: {article.views}</p>
      { handleSave && <button onClick={() => handleSave(article)}>save</button> }
      { handleRemove && <button onClick={() => handleRemove(article)}>remove</button>}
    </div>

  )
}