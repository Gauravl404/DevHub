import React, { useContext } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Profile from "./Profile";
import Activity from "./Activity";
import About from "./About";
import Earning from "./Earning";
import { userContext, userSetContext } from "src/App";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  marginTop: {
    marginBlockStart: theme.spacing(2),
  },
}));

const Account = () => {
  const classes = useStyles();
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const { user, setUser } = useContext(userSetContext);

  return (
    <Page className={classes.root} title='Account'>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3} direction='column' lg={4} md={6} xs={12}>
          <Grid item>
            <Profile user={user} />
          </Grid>
          <Grid item>
            <About user={user} />
          </Grid>
        </Grid>
        <Grid container spacing={3} lg={8} md={6} xs={12}>
          <Grid item lg={12} md={12} xs={12}>
            <Activity />
          </Grid>
        </Grid>
        <Grid
          className={classes.marginTop}
          container
          spacing={3}
          lg={12}
          md={12}
          xs={12}
        >
          {/* <Grid item lg={3} md={4} xs={12}>
            <Earning />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <Earning />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <Earning />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <Earning />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
