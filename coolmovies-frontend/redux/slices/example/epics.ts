import { from, gql, useMutation } from "@apollo/client";
import { Epic, StateObservable, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { filter, map, switchMap, catchError } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";
import { reviewsQuery, reviewsUpdateMutation } from "../../../GraphQL/queries";

export const exampleEpic: Epic = (
  action$: Observable<SliceAction["increment"]>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    filter(actions.increment.match),
    filter(() => Boolean(state$.value.example.value % 2)),
    map(() => actions.epicSideEffect())
  );

export const exampleAsyncEpic: Epic = (
  action$: Observable<SliceAction["fetch"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: reviewsQuery,
          fetchPolicy: "network-only",
        });
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const listUpdateMutationEpic: Epic = (
  action$: Observable<SliceAction["changeData"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.changeData.match),
    switchMap((action) =>
      client.mutate({
        mutation: reviewsUpdateMutation,
        variables: action.payload,
      })
    ),
    switchMap((result) => {
      return of(actions.fetch());
    }),
    catchError((error) => {
      // Handle errors from the mutation and dispatch an error action
      return of(actions.loadError());
    })
  );
