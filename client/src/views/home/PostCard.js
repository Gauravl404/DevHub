import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import { CardActionArea } from "@material-ui/core";

//import Image from "src/static/images/products/product_1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    maxHeight: 800,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
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
            G
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.username}
        subheader={post.createdAt}
      />
      <Divider />
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          alt={post.username}
          image={post.media}
          title={post.username}
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
          <Typography paragraph>COMMENTS</Typography>
          <Typography paragraph>nice one</Typography>
          <Typography paragraph>well done !</Typography>
          <Typography paragraph>good work</Typography>
          <Typography>awesome</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
