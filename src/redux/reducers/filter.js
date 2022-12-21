import { FILTER_STATUS } from '../actions/types';

const initialState = { initialFilterStatus: 'week' };

const filterReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FILTER_STATUS:
            return { initialFilterStatus: payload };
        default:
            return state;
    }
};

export default filterReducer;
