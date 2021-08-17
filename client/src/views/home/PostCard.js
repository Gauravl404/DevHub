import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { CardActionArea } from "@material-ui/core";

//import Image from "src/static/images/products/product_1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    maxHeight: 600,
  },
  expand: {
    transform: "rotate(0deg)",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  comment: {
    marginLeft: "auto",
  },
  commentSection: {
    width: "100%",

    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
}));

const PostCard = ({ className, post, ...rest }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [likes, setLikes] = React.useState(post.likes);
  const [liked, setliked] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLiked = (e) => {
    e.preventDefault();
    !liked ? setLikes(likes + 1) : setLikes(likes - 1);
    setliked(!liked);
  };

  return (
    <Card className={clsx(className, classes.root)}>
      <CardHeader
        avatar={
          <Avatar aria-label='user' className={classes.avatar}>
            {post.title.substr(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={post.created_at}
      />
      <Divider />
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          alt={post.title}
          image={post.media}
          title={post.title}
        />
      </CardActionArea>
      <Divider />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant='h4'>{likes}</Typography>
        <IconButton
          aria-label='add to favorites'
          onClick={(e) => handleLiked(e)}
        >
          <FavoriteIcon color={liked ? "secondary" : "default"} />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <Typography className={classes.comment}>Comments</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Divider />
          <List className={classes.commentSection}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt='Remy Sharp'
                  src='https://res.cloudinary.com/devhubimg/image/upload/v1609787709/gj.jpg'
                />
              </ListItemAvatar>
              <ListItemText
                primary='Brunch this weekend?'
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt='Travis Howard'
                  src='https://res.cloudinary.com/devhubimg/image/upload/v1609787709/vt.jpg'
                />
              </ListItemAvatar>
              <ListItemText
                primary='Summer BBQ'
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt='Cindy Baker'
                  src='https://res.cloudinary.com/devhubimg/image/upload/v1609787709/rv.jpg'
                />
              </ListItemAvatar>
              <ListItemText
                primary='Oui Oui'
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
