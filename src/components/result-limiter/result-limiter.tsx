import React from 'react';
import './results-limiter.css';

interface IResultLimiterProps {
  resultLimit: number;
  changeResultLimit: (e: any) => void;
}

export const ResultLimiter = React.memo((props: IResultLimiterProps): JSX.Element => {
  const { resultLimit, changeResultLimit } = props;
  return (
    <div className="results-limiter-container">
      <label htmlFor="result-limiter">Number of Results: </label>
      <select name="results" id="result-limiter" defaultValue={resultLimit} onChange={changeResultLimit} data-testid="result-limit-selector">
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
    </div>
  );
});
