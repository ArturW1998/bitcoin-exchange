import { WebSocketApp } from '../types/utils';
import { IQuoteTickerSymbol, IQuoteTicker } from '../types/features';
import REQUEST_IDS from '../constants/requestIds';

interface ITickerSubscribeResponse {
  id: REQUEST_IDS.SUBSCRIBE_TICKER;
  result: boolean;
}

interface ITickerResponse {
  method: 'ticker';
  params: IQuoteTicker;
}

type SocketData = ITickerResponse | ITickerSubscribeResponse;

function tickerGuard(msg: ITickerResponse): boolean {
  return msg.method === 'ticker';
}

export default function getInitialTickers(
  ws: WebSocketApp,
  totalTickers: IQuoteTickerSymbol[],
): Promise<Map<string, IQuoteTicker>> {
  return new Promise(resolve => {
    const tickerCache = new Map<string, IQuoteTicker>();
    const handleInitTickers = ({ data }: MessageEvent): void => {
      const msg = JSON.parse(data) as SocketData;

      if (tickerGuard(msg)) {
        const ticker = msg.params;

        tickerCache.set(ticker.symbol, ticker);

        if (tickerCache.size === totalTickers.length) {
          resolve(tickerCache);
          ws.removeEventListener('message', handleInitTickers);
        }
      }
    };

    ws.addEventListener('message', handleInitTickers);

    totalTickers.forEach(symbolData =>
      ws.send(
        JSON.stringify({
          id: REQUEST_IDS.SUBSCRIBE_TICKER,
          method: REQUEST_IDS.SUBSCRIBE_TICKER,
          params: {
            symbol: symbolData.id,
          },
        }),
      ),
    );
  });
}
