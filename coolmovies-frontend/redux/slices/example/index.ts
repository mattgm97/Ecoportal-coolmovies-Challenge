export { actions as exampleActions } from './slice';
export { default as exampleReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { exampleEpic, exampleAsyncEpic,listUpdateMutationEpic } from './epics';

export const exampleEpics = combineEpics(exampleEpic, exampleAsyncEpic,listUpdateMutationEpic);
