import { from, gql, useMutation } from "@apollo/client";
import { Epic, StateObservable, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { filter, map, switchMap, catchError } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";
import { getMoviesQuery, reviewsQuery, currentUserQuery, reviewsUpdateMutation, reviewsAddMutation } from "../../../GraphQL/queries";


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



  export const queryCurrentUserEpic: Epic = (
    action$: Observable<SliceAction["fetchCurrentUser"]>,
    state$: StateObservable<RootState>,
    { client }: EpicDependencies
  ) =>
    action$.pipe(
      filter(actions.fetchCurrentUser.match),
      switchMap(async () => {
        try {
          const result = await client.query({
            query: currentUserQuery
          });
          return actions.loadedUser({ data: result.data.currentUser });
        } catch (err) {
          return actions.loadError();
        }
      })
    );


  export const queryMoviesEpic: Epic = (
    action$: Observable<SliceAction["fetchMovies"]>,
    state$: StateObservable<RootState>,
    { client }: EpicDependencies
  ) =>
    action$.pipe(
      filter(actions.fetchMovies.match),
      switchMap(async () => {
        try {
          const result = await client.query({
            query: getMoviesQuery,
            fetchPolicy: "network-only",
          });
          return actions.loadedMovies({ data: result.data });
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


  export const reviewAddMutationEpic: Epic = (
    action$: Observable<SliceAction["addReviewData"]>,
    state$: StateObservable<RootState>,
    { client }: EpicDependencies
  ) =>
    action$.pipe(
      filter(actions.addReviewData.match),
      switchMap((action) =>
        client.mutate({
          mutation: reviewsAddMutation,
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
