import React from 'react';

import QuoteTable from './features/quoteTable/QuoteTableContainer';
import QuoteTickersControls from './features/quoteTable/controls/QuoteTickersControls';

import './App.css';

type Row = { id: string; component: React.FC };

const App: React.FC = () => {
  const rows: Row[] = [
    { id: 'quoteTickersControls', component: QuoteTickersControls },
    { id: 'quoteTable', component: QuoteTable },
  ];

  return (
    <div className="container-lg">
      {rows.map(({ id, component: Component }: Row) => (
        <div key={id} className="row pt-3">
          <div className="col">
            <Component />
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
