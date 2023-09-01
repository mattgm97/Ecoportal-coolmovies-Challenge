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
import { exampleActions, useAppDispatch, useAppSelector } from "../redux";

interface Props {
  data: Record<string, any>;
}

const MovieReviewCard: FC<Props> = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [age, setAge] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const editHandler = () => {
    setEdit((prev) => !prev);
  };

  return (
    <Grid
      xs={12}
      md={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ maxWidth: 500 }}>
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
          <div>
            <TextField
              css={styles.dataInput}
              multiline
              fullWidth
              label={"Edit the review title"}
              defaultValue={data.node.title}
            />

            <FormControl fullWidth css={styles.dataInput}>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                id="rating"
                value={age}
                label="Rating"
                onChange={handleChange}
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
            />
            <Button
              variant={"outlined"}
              onClick={() =>
                dispatch(
                  exampleState.fetchData
                    ? exampleActions.clearData()
                    : exampleActions.fetch()
                )
              }
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
};

export default MovieReviewCard;
