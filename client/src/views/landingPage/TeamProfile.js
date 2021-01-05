import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

const TeamProfile = ({ className, team, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(className, classes.root)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={team.media}
          title={team.username}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {team.username}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {team.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton>
          <GitHubIcon style={{ color: blue[500] }}></GitHubIcon>
        </IconButton>
        <IconButton>
          <LinkedInIcon style={{ color: blue[500] }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TeamProfile;
