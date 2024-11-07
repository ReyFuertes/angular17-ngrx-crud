import { Action } from '@ngrx/store';
import { createReducer } from '@ngrx/store';

export interface InitAppState { }
export const initialState: InitAppState = {};

const appReducer = createReducer(
  initialState,
);
export function AppReducer(state: InitAppState, action: Action) {
  return appReducer(state, action);
}

