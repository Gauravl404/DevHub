import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  description: {
    marginBlockEnd: 10,
  },
  button: {
    marginInlineStart: 10,
    marginBlockEnd: 10,
  },
}));

const TeamCard = ({ className, team, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Team'
          height='240'
          image={team.teamImage}
          title={team.teamName}
        />
        <CardContent>
          <Typography gutterBottom variant='h2' component='h2'>
            {team.teamName}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.description}
          >
            {team.description}
          </Typography>
          <Typography gutterBottom variant='h5' component='h4'>
            Status : {team.status}
          </Typography>

          <Typography gutterBottom variant='h5' component='h4'>
            Total Members : {team.teamSize}
          </Typography>
          <Typography gutterBottom variant='h5' component='h4'>
            Total Projects : {team.totalProjects}
          </Typography>
          <Box display='flex' alignContent='center'>
            <Typography gutterBottom variant='h5' component='legend'>
              Ratings :{" "}
            </Typography>
            <Rating name='team-rating' value={team.teamRatings} readOnly />
          </Box>

          <Typography gutterBottom variant='h5' component='h4'>
            Require : {team.Requirements}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          className={classes.button}
        >
          Request Add
        </Button>
      </CardActions>
    </Card>
  );
};

TeamCard.propTypes = {
  className: PropTypes.string,
  team: PropTypes.object.isRequired,
};

export default TeamCard;
