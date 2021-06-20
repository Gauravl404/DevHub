import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const user = {
  avatar: "/static/images/avatars/avatar_3.png",
  city: "New Delhi",
  country: "India",
  jobTitle: "Senior Developer",
  name: "Gaurav Jaiswal",
  age: 22,
  dob: "4th may 1998",
  gender: "male",
  works: "DevHub",
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const About = ({ className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display='flex' flexDirection='column'>
          <Typography color='textPrimary' gutterBottom variant='h3'>
            About
          </Typography>
          <Divider />
          <Typography color='textPrimary' gutterBottom variant='body1'>
            Lives in : {user.address}
          </Typography>
          <Typography color='textPrimary' gutterBottom variant='body1'>
            Country : {"India"}
          </Typography>
          <Typography color='textPrimary' gutterBottom variant='body1'>
            Gender : {user.gender === "M" ? "male" : "female"}
          </Typography>
          <Typography color='textPrimary' gutterBottom variant='body1'>
            Age : {"22"}
          </Typography>
          <Typography color='textPrimary' gutterBottom variant='body1'>
            Date of birth : {"10th feb 2000"}
          </Typography>
          <Typography color='textPrimary' gutterBottom variant='body1'>
            Portfolio : {user.handle_url}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

About.propTypes = {
  className: PropTypes.string,
};

export default About;
