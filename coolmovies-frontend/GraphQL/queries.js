import { gql } from "@apollo/client";

export const getMoviesQuery = gql`
query  {
  allMovies {
    edges {
      node {
        id
        imgUrl
        title
      }
    }
  }
}
`;



export const reviewsQuery = gql`
query {
    allMovieReviews {
      edges {
        node {  
          id
          body
          movieId
          rating
          userReviewerId
          title
          userByUserReviewerId {
            name
          }
          movieByMovieId {
            imgUrl
            id
            title
          }
        }
      }
    }
  }
`;

export const currentUserQuery = gql`
query {
  currentUser {
    id
    name
  }
  }
`;



export const reviewsUpdateMutation = gql`
mutation MyMutation($input: UpdateMovieReviewByIdInput!) {
    updateMovieReviewById(input: $input) {
      clientMutationId
    }
  }
`;


export const reviewsAddMutation = gql`
mutation CreateMovieReview($input: CreateMovieReviewInput!) {
  createMovieReview(input: $input) {
    clientMutationId
  }
}
`;
