import { FILTER_STATUS } from './types';

export const updateFilterStatus = status => ({
    type: FILTER_STATUS,
    payload: status,
});