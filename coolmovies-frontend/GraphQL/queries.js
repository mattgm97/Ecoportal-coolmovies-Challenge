import {gql} from "@apollo/client";

export const exampleQuery = gql`
query AllMovies {
  allMovies {
    nodes {
      id
      imgUrl
      movieDirectorId
      userCreatorId
      title
      releaseDate
      nodeId
      userByUserCreatorId {
        id
        name
        nodeId
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


export const reviewsUpdateMutation = gql`
mutation MyMutation($input: UpdateMovieReviewByIdInput!) {
    updateMovieReviewById(input: $input) {
      clientMutationId
    }
  }
`;

