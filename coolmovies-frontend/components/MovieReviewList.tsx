import React, { FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {useAppSelector } from "../redux";
import MovieReviewCard from "./MovieReviewCard";


const MovieReviewList: FC = () => {
  const movieReviews = useAppSelector((state) => state.example.fetchData);
  const result = movieReviews?.allMovieReviews?.edges ?? [];
  
  return (
    <>

      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {result.length > 0? result.map((item:any)=>{
return (
   <MovieReviewCard data={item} key={item.node.id}/>
)
}) : null}
      </Grid>
    </>
  );
};


export default MovieReviewList;
