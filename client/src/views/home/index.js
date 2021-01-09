import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { Pagination } from "@material-ui/lab";
import TelegramIcon from "@material-ui/icons/Telegram";
import ChatIcon from "@material-ui/icons/Chat";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import PostCard from "./PostCard";
import data from "./data";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
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
  demo: {
    backgroundColor: theme.palette.background.default,
    position: "-webkit-sticky",
    position: "sticky",
    top: theme.spacing(3),
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    margin: theme.spacing(0, 1, 2),
  },
}));

function generate(element) {
  return [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
        <Avatar>
          <TelegramIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`# Trending ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const PostList = () => {
  const classes = useStyles();
  const [posts] = useState(data);

  return (
    <Page className={classes.root} title='Home'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item spacing={1} lg={9} md={12} xs={12} container>
              {posts.map((post) => (
                <Grid item key={post.id} md={12} xs={12}>
                  <PostCard className={classes.PostCard} post={post} />
                </Grid>
              ))}
            </Grid>
            <Hidden mdDown>
              <Grid item lg={3} md={0} xs={0} container>
                <Grid item md={12} xs={12}>
                  <div className={classes.demo}>
                    <Typography variant='h6' className={classes.title}>
                      Trendings
                    </Typography>
                    <Divider />
                    <FixedSizeList
                      height={550}
                      width={310}
                      itemSize={45}
                      itemCount={200}
                    >
                      {renderRow}
                    </FixedSizeList>
                  </div>
                </Grid>
              </Grid>
            </Hidden>
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
