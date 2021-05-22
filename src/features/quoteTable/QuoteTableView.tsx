import React from 'react';
import { IQuoteTicker, IQuoteTickerSymbol, ISortParams } from './interfaces';
import QuoteTableRow from './QuoteTableRow';
import quoteTableClasses from './quoteTableClasse';
import QuoteTableHead from './QuoteTableHead';
import { AppDispatch } from '../../state/store';
import styles from './styles.module.scss';

export interface IQuoteTableViewProps {
  data: IQuoteTicker[];
  previousData: {
    [symbolId: string]: IQuoteTicker;
  };
  themeDark?: boolean;
  symbolsMap: {
    [id: string]: IQuoteTickerSymbol;
  };
  sortParams: ISortParams;
  dispatch: AppDispatch;
}

const QuoteTableView: React.FC<IQuoteTableViewProps> = ({
  data,
  previousData,
  themeDark,
  symbolsMap,
  sortParams,
  dispatch,
}) => {
  return (
    <table
      className={`table table-striped ${styles.quoteTable} ${
        themeDark ? quoteTableClasses.dark.table : ''
      }`}
    >
      <QuoteTableHead dispatch={dispatch} sortParams={sortParams} />
      <tbody>
        {data.map(ticker => {
          const previousTicker = previousData[ticker.symbol] || null;
          const symbol = symbolsMap[ticker.symbol];

          return (
            <QuoteTableRow
              key={ticker.symbol}
              previousTicker={previousTicker}
              symbol={symbol}
              ticker={ticker}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default QuoteTableView;
