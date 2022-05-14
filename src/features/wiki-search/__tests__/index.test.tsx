import { render, waitFor, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { WikiSearch } from '../index';
import * as UsePinnedHook from '../../../hooks/use-pinned-articles';
import { IArticle } from '../../../components/article/article';
import * as http from '../../../api/wiki-service';
import { getYesterday } from '../../../helpers/date';
import { createArticleFixtures } from '../__fixtures__/articles.fixtures';

describe('Wiki Search App', () => {
  let articles: IArticle[] = createArticleFixtures(200);
  let pinArticleSpy: jest.Mock;
  let unpinArticleSpy: jest.Mock;
  let getArticlesSpy: jest.SpyInstance;

  const mockPinnedArticles = (articles: IArticle[]): void => {
    jest.spyOn(UsePinnedHook, 'usePinnedArticles').mockReturnValue({
      pinnedArticles: articles,
      pinArticle: pinArticleSpy,
      unpinArticle: unpinArticleSpy
    });
  }

  beforeEach(() => {
    pinArticleSpy = jest.fn();
    unpinArticleSpy = jest.fn();

    mockPinnedArticles([]);

    getArticlesSpy = jest.spyOn(http, 'getArticles').mockResolvedValue(articles);
  });

  it('should match snapshot with no articles', () => {
    const { container } = render(<WikiSearch />);
    jest.spyOn(http, 'getArticles').mockResolvedValue([]);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with articles', () => {
    mockPinnedArticles(createArticleFixtures(3));
    const { container } = render(<WikiSearch />);
    expect(container).toMatchSnapshot();
  });

  it('should always have a page title', async () => {
    const { queryByText, getByText } =  render(<WikiSearch />);

    expect(getByText('Most Popular Pages Search')).toBeInTheDocument();
    await waitFor(() => {
      expect(getArticlesSpy).toHaveBeenCalled();
    });
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
  });

  it('should fetch from Wiki API on init and display the default number of articles', async () => {
    const { queryByText, container } = render(<WikiSearch />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(getArticlesSpy).toHaveBeenCalledWith(getYesterday('yyyy/MM/dd'));
      expect(getArticlesSpy).toHaveBeenCalledTimes(1);
    });
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
    expect(container.getElementsByClassName('article-container')).toHaveLength(100);
  });


  it('should show a placeholder if there are no pages after fetching', async () => {
    getArticlesSpy = jest.spyOn(http, 'getArticles').mockResolvedValue([]);

    const { queryByText } = render(<WikiSearch />);

    await waitForElementToBeRemoved(() => queryByText('Loading...'));

    expect(queryByText('Unable to find page views, please try a different date...')).toBeInTheDocument();
  });

  it('should add a pinned page if user saves it', async () => {
    const { queryByText, queryAllByTestId } = render(<WikiSearch />);

    expect(queryByText('Pinned Pages:')).toBeInTheDocument();
    expect(queryByText('no pinned pages...yet')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByText('Loading...'));

    const saveButton = queryAllByTestId('save-button')[0];
    saveButton.click();

    expect(pinArticleSpy).toHaveBeenCalledTimes(1);
  });


  it('should show pinned pages if saved', async () => {
    mockPinnedArticles(createArticleFixtures(2));

    const { queryByText, queryAllByTestId } = render(<WikiSearch />);
    await waitFor(() => expect(queryAllByTestId('remove-button')).toHaveLength(2));
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
  });

  it('should display as many articles as possible if not reaching result limit', async () => {
    jest.spyOn(http, 'getArticles').mockResolvedValue(createArticleFixtures(9));

    const { queryByText, queryAllByTestId } = render(<WikiSearch />);
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
    await waitFor(() => expect(queryAllByTestId('save-button')).toHaveLength(9));
  });

  it('should not display back to top button if no articles', async () => {
    jest.spyOn(http, 'getArticles').mockResolvedValue([]);
    const { queryByText } = render(<WikiSearch />);
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
    expect(queryByText('back to top')).not.toBeInTheDocument();
  });

  it('should display back to top button if there are articles', async () => {
    const { queryByText } = render(<WikiSearch />);
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
    expect(queryByText('back to top')).toBeInTheDocument();
  });


  it('should display date selector and result limiter regardless of articles', async () => {
    const { container, queryByText } = render(<WikiSearch />);

    expect(container.getElementsByClassName('date-picker-container')).toHaveLength(1);
    expect(container.getElementsByClassName('results-limiter-container')).toHaveLength(1);

    await waitForElementToBeRemoved(() => queryByText('Loading...'));

    expect(container.getElementsByClassName('date-picker-container')).toHaveLength(1);
    expect(container.getElementsByClassName('results-limiter-container')).toHaveLength(1);
  });

  it('should display the amount of articles selected by the user', async () => {
    const { container, queryByText, getByTestId } = render(<WikiSearch />);

    const changeLimitAndCheck = async (numOfArticles: number): Promise<void> => {
      fireEvent.change(getByTestId('result-limit-selector'), { target: { value: numOfArticles }});

      await waitFor(() => {
        expect(container.getElementsByClassName('article-container')).toHaveLength(numOfArticles);
      });
      expect(queryByText('no pinned pages...yet')).toBeInTheDocument();
    }

    await waitForElementToBeRemoved(() => queryByText('Loading...'));

    expect(container.getElementsByClassName('article-container')).toHaveLength(100);
    expect(queryByText('no pinned pages...yet')).toBeInTheDocument();

    await changeLimitAndCheck(25);
    await changeLimitAndCheck(200);
    await changeLimitAndCheck(50);
    await changeLimitAndCheck(75);
  });

  it('should attempt to update articles if date is changed', async () => {
    const { queryByText, getByTestId } = render(<WikiSearch />);
    await waitForElementToBeRemoved(() => queryByText('Loading...'));

    expect(getArticlesSpy).toHaveBeenCalledTimes(1);

    fireEvent.change(getByTestId('date-selector'), { target: { value: '2015-01-21' }});

    await waitFor(() => {
      expect(getArticlesSpy).toHaveBeenCalledTimes(2);
    });
  });
});