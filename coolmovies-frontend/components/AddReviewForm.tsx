import React, { FC, useEffect, useState } from "react";
import { css } from "@emotion/react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector, useAppDispatch, exampleActions } from "../redux";

interface Props {
  modalClose: () => void;
}

const AddReviewForm: FC<Props> = ({ modalClose }) => {
  const moviesList = useAppSelector((state) => state.example.moviesList);
  const currentUser = useAppSelector((state) => state.example.currentUser);
  const dispatch = useAppDispatch();


  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [movie, setMovie] = useState("");

  const handleChangeMovie = (event: SelectChangeEvent) => {
    setMovie(event.target.value as string);
  };

  const handleChangeRating = (event: SelectChangeEvent) => {
    setRating(event.target.value as string);
  };
  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value as string);
  };
  const handleChangeBody = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBody(event.target.value as string);
  };

  const variables = {
    input: {
      movieReview: {
        title: title,
        movieId: movie,
        userReviewerId: currentUser.id,
        body: body,
        rating: parseInt(rating),
      },
    },
  };

  return (
    <>
      <Typography id="user-call-to-action" variant="h6" component="h2">
        What are your thoughts {currentUser.name}?
      </Typography>
      <div css={styles.editFields}>
        <FormControl fullWidth css={styles.dataInput}>
          <InputLabel id="movie-label">Movie</InputLabel>
          <Select
            labelId="movie-label"
            id="movie"
            label="movie"
            onChange={handleChangeMovie}
          >
            {moviesList &&
              moviesList.allMovies.edges.map((element: any) => {
                return (
                  <MenuItem key={element.node.id} value={element.node.id}>
                    {element.node.title}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <TextField
          css={styles.dataInput}
          multiline
          fullWidth
          label={"Edit the review title"}
          onChange={handleChangeTitle}
        />

        <FormControl fullWidth css={styles.dataInput}>
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating"
            label="Rating"
            onChange={handleChangeRating}
          >
            <MenuItem value={1}>1 Star</MenuItem>
            <MenuItem value={2}>2 Stars</MenuItem>
            <MenuItem value={3}>3 Stars</MenuItem>
            <MenuItem value={4}>4 Stars</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
        </FormControl>
        <TextField
          css={styles.dataInput}
          multiline
          fullWidth
          label={"Edit the review body"}
          onChange={handleChangeBody}
        />
        <Button
          variant={"contained"}
          onClick={() => {

            dispatch(exampleActions.addReviewData(variables));
            modalClose();
          }}
        >
          Publish Review
        </Button>
      </div>
    </>
  );
};

const styles = {
  dataInput: css({
    alignSelf: "stretch",
    margin: "15px 0",
    padding: "10px",
  }),
  editFields: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "2em 0;",
  }),
};

export default AddReviewForm;
