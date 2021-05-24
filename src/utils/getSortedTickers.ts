import { getSortByField } from './index';

import { ITickersState } from '../types/slices';
import { IQuoteTicker, ISortParams, SortByField } from '../types/features';

const getSortedTickers = (tickersState: ITickersState, sortParams: ISortParams): IQuoteTicker[] => {
  const sortByLastDown: SortByField = getSortByField('last', 'down');

  let data: IQuoteTicker[] = [...tickersState.data];

  data = data.sort(sortByLastDown);

  if (tickersState.onLimit50) data = data.slice(0, 49);

  data = data.sort(getSortByField(sortParams.field, sortParams.type));

  return data;
};

export default getSortedTickers;