import React from 'react';
import { useDispatch } from 'react-redux';
import tickersSlice from '../../../state/ducks/quoteTable/tickersSlice';

const QuoteTickersControls: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div aria-label="Quote Tickers controls">
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(tickersSlice.actions.toggleLimit());
        }}
        type="button"
      >
        On / Off Limit tickers
      </button>
      &nbsp;
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(tickersSlice.actions.toggleDarkTheme());
        }}
        type="button"
      >
        On / Off Dark Theme
      </button>
    </div>
  );
};

export default QuoteTickersControls;