import React, { useState, useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import PostCard from "./PostCard";
import data from "./data";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  PostCard: {
    height: "100%",
    width: "100%",
  },
}));

const PostList = () => {
  const classes = useStyles();
  const [posts] = useState(data);

  return (
    <Page className={classes.root} title='Home'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item key={post.id} lg={9} md={12} xs={12}>
                <PostCard className={classes.PostCard} post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={3} size='small' />
        </Box>
      </Container>
    </Page>
  );
};

export default PostList;
