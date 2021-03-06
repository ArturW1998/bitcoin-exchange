import { createReducer } from '@reduxjs/toolkit';

import SORT_DIRECTIONS from '../../../constants/sortDirections';
import tickersActions from './actions';

import { ITickersState } from '../../../types/slices';
import { IQuoteTicker, IQuoteTickerSymbol } from '../../../types/features';

export const initialTickersState: ITickersState = {
  data: [],
  previousData: {},
  symbols: {},
  onLimit50: true,
  sortType: {
    field: 'last',
    type: SORT_DIRECTIONS.DOWN,
  },
  isDarkTheme: false,
  error: null,
};

const { tickers, symbols, toggleDarkTheme, setSortType, toggleLimit, setError } = tickersActions;

const reducer = createReducer(initialTickersState, builder => {
  builder
    .addCase(tickers.set, ({ data }, { payload: tickersCache }) => {
      tickersCache.forEach((ticker: IQuoteTicker) => {
        data.push(ticker);
      });
    })
    .addCase(tickers.update, ({ data, previousData }, { payload: tickersCache }) => {
      Object.keys(previousData).forEach(id => delete previousData[id]);

      tickersCache.forEach(ticker => {
        const existIndex: number = data.findIndex(({ symbol }) => symbol === ticker.symbol);

        if (existIndex !== -1) {
          previousData[ticker.symbol] = { ...data[existIndex] };
          data[existIndex] = ticker;
        } else {
          data.push(ticker);
        }
      });
    })
    .addCase(symbols.set, ({ symbols }, { payload }) => {
      payload.forEach((symbol: IQuoteTickerSymbol) => {
        symbols[symbol.id] = symbol;
      });
    })
    .addCase(toggleDarkTheme, state => {
      state.isDarkTheme = !state.isDarkTheme;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(toggleLimit, state => {
      state.onLimit50 = !state.onLimit50;
    })
    .addCase(setError, (state, { payload }) => {
      state.error = payload;
    });
});

export default reducer;
