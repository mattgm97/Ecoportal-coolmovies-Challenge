import React, { FC, useState } from "react";
import { css } from "@emotion/react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Zoom,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "./EditIcon";
import { exampleActions, useAppDispatch} from "../redux";


interface Props {
  data: Record<string, any>;
}

const MovieReviewCard: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [rating, setRating] = useState(`${data.node.rating}`);
  const [title, setTitle] = useState(data.node.title);
  const [body, setBody] = useState(data.node.body);

  const handleChangeRating = (event: SelectChangeEvent) => {
    setRating(event.target.value as string);
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(event.target.value as string);
  };
  const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBody(event.target.value as string);
  };

  const editHandler = () => {
    setEdit((prev) => !prev);
  };

  const variables = {
    input: {
      movieReviewPatch: {
        body: body,
        rating: rating,
        title: title,
      },
      id: data.node.id,
    },
  };

  return (
    <Grid
      xs={12}
      md={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: "90%"}}>
        <CardMedia
          sx={{ height: 740 }}
          image={data.node.movieByMovieId.imgUrl}
          title={data.node.movieByMovieId.title}
        />
        <CardContent>
          <div css={styles.cardTitle}>
            <Typography gutterBottom variant="h5" component="div">
              {data.node.title} - {data.node.rating}/5
            </Typography>
            <CardActions>
              <IconButton aria-label="edit" onClick={editHandler}>
                <EditIcon />
              </IconButton>
            </CardActions>
          </div>

          <Typography variant="body2" color="text.secondary">
            {data.node.body}
          </Typography>
        </CardContent>

        <Zoom in={edit} unmountOnExit mountOnEnter>
          <div css={styles.editFields}>
            <TextField
              css={styles.dataInput}
              multiline
              fullWidth
              label={"Edit the review title"}
              defaultValue={data.node.title}
              onChange={handleChangeTitle}
            />

            <FormControl fullWidth css={styles.dataInput}>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                id="rating"
                value={rating}
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
              defaultValue={data.node.body}
              onChange={handleChangeBody}
            />
            <Button
             
              variant={"contained"}
              onClick={() =>{
                dispatch(
                  exampleActions.changeData(variables)
                );
                setEdit(false)
                dispatch(
                  exampleActions.fetch()
                );
              }}
            >
              Save 
            </Button>
          </div>
        </Zoom>
      </Card>
    </Grid>
  );
};

const styles = {
  cardTitle: css({
    width: "100%",
    display: "flex",
    alignItems: "center",
  }),
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
    margin: "2em 0;"
  }),
};

export default MovieReviewCard;
