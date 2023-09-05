import { css } from "@emotion/react";
import {
  Button,
  Paper,
  Typography,
  Backdrop,
  Fade,
  Box,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { NextPage } from "next";
import { exampleActions, useAppDispatch, useAppSelector } from "../redux";
import MovieReviewList from "../components/MovieReviewList";
import { useEffect, useState } from "react";
import AddReviewForm from "../components/AddReviewForm";


const primary = "#156B39";

const theme = createTheme({
  palette: {
    primary: {
      main: '#156B39',
    },
    secondary: lightGreen,
  },
});

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const exampleState = useAppSelector((state) => state.example);
  const [modalOpen, setModalOpen] = useState(false);
  const themeHook = useTheme();
  const matches = useMediaQuery(themeHook.breakpoints.up('md'));

  const handleModal = () => {
    setModalOpen((prev) => !prev);
    
  };

  useEffect(()=>{
    dispatch( exampleActions.fetchMovies());
    dispatch( exampleActions.fetchCurrentUser())
  },[dispatch])

  return (
    <ThemeProvider theme={theme}>
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

          <Button variant={"outlined"} onClick={handleModal}>
            Add movie review
          </Button>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modalOpen}>
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: !matches? "90%": 500,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
              >
                Add your movie review
              </Typography>


              <AddReviewForm  modalClose={handleModal}/>
            </Box>
          </Fade>
        </Modal>

        <MovieReviewList />
      </div>
    </div>
  </ThemeProvider>
    
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
