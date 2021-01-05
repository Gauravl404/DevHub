import React, { useState, useEffect } from "react";

import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import Youtube from "./data";
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  box: {
    height: "100%",
    marginBlockStart: theme.spacing(1),
  },
  player: {
    height: 1000,
  },
  margin: {
    marginBlockStart: theme.spacing(1),
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const Learn = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  async function handleSubmit(searchTerm) {
    const {
      data: { items: videos },
    } = await Youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyC8UuCm0yOg4tM7unKFbaRBuAjD99JqC04",
        q: searchTerm,
      },
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
  useEffect(() => {
    handleSubmit("Github");
  }, []);

  return (
    <Page className={classes.root} title='Learn'>
      <Container maxWidth={false}>
        <Toolbar onSubmit={handleSubmit} />
        <Box className={classes.box}>
          <Grid container spacing={3} className={classes.container}>
            <Grid item lg={9} xs={12} className={classes.margin}>
              <VideoPlayer video={selectedVideo} />
            </Grid>
            <Grid item lg={3} xs={12}>
              <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={3} size='small' />
        </Box>
      </Container>
    </Page>
  );
};

export default Learn;
