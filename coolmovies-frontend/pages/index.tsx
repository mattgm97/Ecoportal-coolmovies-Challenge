import { css } from "@emotion/react";
import {
  Button,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import type { NextPage } from "next";
import { exampleActions, useAppDispatch, useAppSelector } from "../redux";
import MovieReviewList from "../components/MovieReviewList";

const primary = "#1976d2";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const exampleState = useAppSelector((state) => state.example);
  return (
    <div css={styles.root}>
      <Paper elevation={3} css={styles.navBar}>
        <Typography>{"EcoPortal"}</Typography>
      </Paper>

      <div css={styles.body}>
        
      

        <Typography variant={"h1"} css={styles.heading}>
          {"EcoPortal Coolmovies Test"}
        </Typography>

        <div css={styles.mainControls}>
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
            Fetch movie reviews
          </Button>
        </div>

        <MovieReviewList/>

        <Zoom in={Boolean(exampleState.fetchData)} unmountOnExit mountOnEnter>
        <TextField
            css={styles.dataInput}
            multiline
            label={'Some Data'}
            defaultValue={JSON.stringify(exampleState.fetchData)}
          />
        </Zoom>
      </div>
    </div>
  );
};

const styles = {
  root: css({
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  navBar: css({
    background: primary,
    height: 50,
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    padding: 16,
    borderRadius: 0,
    p: {
      color: "white",
    },
  }),
  body: css({
    alignSelf: "stretch",
    padding: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  heading: css({ marginTop: 16, fontSize: "2.75rem", textAlign: "center" }),
  subtitle: css({
    fontWeight: 300,
    textAlign: "center",
    maxWidth: 600,
    margin: "24px 0",
    color: "rgba(0, 0, 0, 0.6)",
  }),
  mainControls: css({
    display: "flex",
    alignItems: "center",
    margin: "3em 0",
    button: { marginRight: 16 },
  }),
  dataInput: css({
    alignSelf: "stretch",
    margin: "32px 0",
  }),
};

export default Home;
