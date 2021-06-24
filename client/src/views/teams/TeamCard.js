import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
//import AccessTimeIcon from "@material-ui/icons/AccessTime";
//import GetAppIcon from "@material-ui/icons/GetApp";

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
          image={"https://source.unsplash.com/random"}
          title={team.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h2' component='h2'>
            {team.name}
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
            Total Members : {team.total}
          </Typography>
          <Typography gutterBottom variant='h5' component='h4'>
            Total Projects : {0}
          </Typography>
          <Box display='flex' alignContent='center'>
            <Typography gutterBottom variant='h5' component='legend'>
              Ratings :{" "}
            </Typography>
            <Rating name='team-rating' value={1} readOnly />
          </Box>

          <Typography gutterBottom variant='h5' component='h4'>
            Require : {"none"}
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
