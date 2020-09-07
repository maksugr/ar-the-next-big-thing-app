/* eslint-disable no-underscore-dangle */

import { createStore } from 'redux';

import { rootReducer } from './reducers/root-reducer';

import { IRootState } from './interfaces/root-state.interface';

export const configureStore = (initialState?: IRootState) => {
    const store = createStore(
        rootReducer,
        { ...initialState },
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
