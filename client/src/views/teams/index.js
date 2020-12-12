import React, { useState } from "react";

import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import TeamCard from "./TeamCard";
import data from "./data";

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
  const [teams] = useState(data);

  return (
    <Page className={classes.root} title='Teams'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {teams.map((team) => (
              <Grid item key={team.id} xl={3} lg={4} md={6} xs={12}>
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
