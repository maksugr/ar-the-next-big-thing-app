import { Action, Reducer, combineReducers } from 'redux';

import { IRootState } from '../interfaces/root-state.interface';

type IAction = Action;

export const rootReducer: Reducer<IRootState, IAction> = combineReducers({});
