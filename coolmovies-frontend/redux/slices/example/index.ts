export { actions as exampleActions } from './slice';
export { default as exampleReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { exampleAsyncEpic,listUpdateMutationEpic, queryCurrentUserEpic, queryMoviesEpic, reviewAddMutationEpic } from './epics';

export const exampleEpics = combineEpics(exampleAsyncEpic, queryMoviesEpic, queryCurrentUserEpic, listUpdateMutationEpic, reviewAddMutationEpic);
