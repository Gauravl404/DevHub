import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { Divider, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
    paddingTop: "0%", // 16:9
  },
  margin: {
    marginInlineStart: 10,
  },
  marginTop: {
    marginBlockStart: 10,
  },
  button: {
    marginBlockStart: 10,
  },
  description: {
    marginBlockEnd: 10,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  box: {
    alignItems: "center",
  },
  text: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 0,
    padding: 0,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ProjectCard = ({ className, project, ...rest }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = React.useState({
    amount: "",
    summary: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {project.title.substr(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={project.title}
        subheader={project.created_at}
      />
      <CardMedia
        className={classes.media}
        image={"https://source.unsplash.com/random"}
        title={project.title}
      />
      <CardContent>
        <Typography variant='h2' component='h2'>
          {project.title}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          className={classes.description}
        >
          {project.description}
        </Typography>
        <Typography variant='h5' component='h5'>
          Amount Offer : {project.amount}
        </Typography>
        <Typography variant='h5' component='h5'>
          Time Duration : {project.duration}
        </Typography>
        <Typography variant='h5' component='h5'>
          Status : {project.status}
        </Typography>
        <Divider className={classes.marginTop} />
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant='h5' className={classes.margin}>
          Intrested? Place your bid
        </Typography>
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
          <FormControl fullWidth variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              type='number'
              value={values.amount}
              onChange={handleChange("amount")}
              startAdornment={
                <InputAdornment position='start'>₹</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <TextField
            id={project.id}
            label='Summary'
            placeholder='Wanna say something ?'
            fullWidth
            multiline
            rowsMax={4}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            value={values.summary}
            variant='outlined'
            onChange={handleChange("summary")}
          />
          <Box className={classes.box}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
            >
              Place Bid
            </Button>
            <Typography variant='h5' component='h5' className={classes.text}>
              Total Biddings : {"1"}
            </Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  team: PropTypes.object.isRequired,
};

export default ProjectCard;
