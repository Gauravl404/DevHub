import React from "react";
import { Grid } from "@material-ui/core";
import VideoItem from "./VideoItem";

const VideoList = ({ classname, videos, onVideoSelect, ...rest }) => {
  const listOfVideos = videos.map((video) => (
    <VideoItem
      onVideoSelect={onVideoSelect}
      key={video.id.videoId}
      video={video}
    />
  ));
  return <Grid container>{listOfVideos}</Grid>;
};

export default VideoList;
