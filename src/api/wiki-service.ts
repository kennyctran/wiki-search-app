import { get } from "./http-client";
import { format } from 'date-fns';
import { IArticle } from "../components/article/article";

export const getArticles = async (date: string): Promise<IArticle[]> => {
  try {
    const formattedDate = format(new Date(date), 'yyyy/MM/dd');
    const response = await get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`);
    const [ items ] = response.items;
    return items.articles.slice(0, 200);
  } catch (err) {
    console.error('Could not fetch wiki articles: ', err);
    return [];
  }
}