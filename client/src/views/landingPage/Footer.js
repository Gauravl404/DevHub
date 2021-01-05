import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  withStyles,
  Grid,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant='h6' color='textSecondary'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        DevHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "26vh",
  },

  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[200],
  },
  copyright: {
    margin: "auto",
    maxwidth: "20",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Box justifyContent='space-around' display='flex'>
          <Container maxWidth='xs'>
            <Copyright />
          </Container>
        </Box>
      </footer>
    </div>
  );
};

export default Footer;
