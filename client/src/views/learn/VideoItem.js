import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  box: {
    height: "100%",
    marginBlockStart: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    height: 240,
    width: 300,
  },
  margin: {
    marginBlock: 10,
  },
  image: {
    height: 120,
    width: 300,
  },
}));

export default ({ video, onVideoSelect }) => {
  const classes = useStyles();
  console.log(video);
  return (
    <Grid item xs={12} className={classes.margin}>
      <Paper onClick={() => onVideoSelect(video)} className={classes.paper}>
        <img
          alt='thumbnail'
          src={video.snippet.thumbnails.medium.url}
          className={classes.image}
        />
        <Typography variant='subtitle1'>
          <b>{video.snippet.title}</b>
        </Typography>
      </Paper>
    </Grid>
  );
};
