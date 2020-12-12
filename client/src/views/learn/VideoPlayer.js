import React from "react";
import {
  Paper,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VideoPlayer = ({ className, video, ...rest }) => {
  const classes = useStyles();
  if (!video) return <div>Loading...</div>;
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(videoSrc);

  return (
    <div>
      <ReactPlayer width='100%' height='600px' controls url={videoSrc} />
    </div>
  );
};

export default VideoPlayer;
