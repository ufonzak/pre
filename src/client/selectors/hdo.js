import { createSelector } from 'reselect';

import { getHdo as getState } from './rootSelectors';

export const getHdo = createSelector(getState, state => state);
