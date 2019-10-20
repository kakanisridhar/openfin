import { createStore, combineReducers } from 'redux';

import * as AppState from './AppState';

import * as Persistance from './Persistance';

const rootReducer = combineReducers({
  appState: AppState.Reducer
});

const store = createStore(rootReducer, Persistance.LoadState());

store.subscribe(() => {
  Persistance.SaveState(store.getState());
});

export default store;
export type GlobalState = ReturnType<typeof rootReducer>;
