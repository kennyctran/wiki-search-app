import { HandleRemoveType, HandleSaveType } from "../articles/articles";
import './article.css';

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
  const titleWithSpaces = article.article.replace(/\_/g, ' ');
  return (
    <div key={article.rank} className="article-container">
      <h3 className="article-title"><span>{article.rank}.{' '}</span>{titleWithSpaces}</h3>
      <div className="article-views-container"><span>views:</span> <span>{article.views}</span></div>
      <div className="button-container">
        { handleSave && <button data-testid="save-button" onClick={() => handleSave(article)}><span>save</span></button> }
        { handleRemove && <button data-testid="remove-button" onClick={() => handleRemove(article)}><span>remove</span></button>}
      </div>
    </div>

  )
}