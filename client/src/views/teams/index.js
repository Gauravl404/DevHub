import React, { useState, useContext, useEffect } from "react";

import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import TeamCard from "./TeamCard";
//import data from "./data";

import { userSetContext } from "src/App";
//import { userContext } from "src/App";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  teamCard: {
    height: "100%",
  },
}));

const Teams = () => {
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const getData = () => {
    fetch("http://localhost:5000/dashboard/team", {
      method: "GET",
      headers: {
        jwt_token: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .then(setrefresh(false));
  };
  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    try {
      getData();
    } catch (err) {
      console.error(err.message);
      alert("Something went wrong , please try again !");
    }
  }, []);

  const { user } = useContext(userSetContext);

  return (
    <Page className={classes.root} title='Teams'>
      <Container maxWidth={false}>
        <Toolbar user={user} setrefresh={setrefresh} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {teams.map((team) => (
              <Grid item key={team.team_id} xl={3} lg={4} md={6} xs={12}>
                <TeamCard className={classes.teamCard} team={team} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination color='primary' count={3} size='small' />
        </Box>
      </Container>
    </Page>
  );
};

export default Teams;
