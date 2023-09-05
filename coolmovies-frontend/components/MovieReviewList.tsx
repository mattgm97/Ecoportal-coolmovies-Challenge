import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {useAppDispatch, useAppSelector } from "../redux";
import MovieReviewCard from "./MovieReviewCard";


const MovieReviewList: FC = () => {
    
  const dispatch = useAppDispatch();
  const movieReviews = useAppSelector((state) => state.example);

  useEffect(() => {
   
    if(movieReviews.fetchData){
        console.log(movieReviews.fetchData.allMovieReviews.edges)
    }
  }, [movieReviews]);

  const result = movieReviews?.fetchData?.allMovieReviews.edges ?? [];
  
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
