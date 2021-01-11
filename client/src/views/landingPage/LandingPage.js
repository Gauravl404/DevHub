import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  withStyles,
  Grid,
} from "@material-ui/core";
import Page from "src/components/Page";
import Image from "src/static/images/bg.jpg";
import TeamProfile from "./TeamProfile";
import Footer from "./Footer";
import data from "./data";
import Particles from "./Particles";
import { replace } from "lodash";
import { AutorenewRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    // backgroundImage: `url(${Image})`,
    backgroundColor: "black",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    margin: theme.spacing(10),
  },
  TeamProfile: {
    margin: "auto",
    height: "100%",
    width: "100%",
  },
  teamheading: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
    margin: "auto",
  },
  Button: {
    zIndex: 10,
    marginTop: 40,
    marginInlineStart: 0,
    marginInlineEnd: 20,
  },
  body: {
    maxWidth: 500,
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const clickHandleIndividual = (e) => {
    e.preventDefault();
    navigate("auth/registerIndividual", { replace: true });
  };

  const clickHandleOrg = (e) => {
    e.preventDefault();
    navigate("auth/registerOrg", { replace: true });
  };
  const [teams] = useState(data);

  return (
    <Page className={classes.root} title='Devhub'>
      <NavBar />
      <Particles>
        <Box
          display='flex'
          flexDirection='column'
          height='680px'
          maxWidth='60%'
          justifyContent='center'
        >
          <Container className={classes.container}>
            <WhiteTextTypography variant='h1'>
              Welcome to DevHub
            </WhiteTextTypography>
            <div className={classes.body}>
              <WhiteTextTypography variant='body1'>
                A single Socio-freelancing platform , where you can find your
                dream team and dream projects from worlds best organisation,
              </WhiteTextTypography>
            </div>
            <Button
              variant='contained'
              color='primary'
              className={classes.Button}
              onClick={(e) => clickHandleIndividual(e)}
            >
              Register As developer
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.Button}
              onClick={(e) => clickHandleOrg(e)}
            >
              Register As organisation
            </Button>
          </Container>
        </Box>
      </Particles>
      <Box
        mt={10}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        height='120px'
      >
        <Typography
          className={classes.teamheading}
          variant='h1'
          component='h2'
          gutterBottom
        >
          Our Team
        </Typography>
      </Box>

      <Box justifyContent='center' display='flex'>
        <Grid
          container
          spacing={10}
          direction='row'
          justify='center'
          alignItems='flex-start'
        >
          {teams.map((team) => (
            <Grid item key={team.id} lg={4} md={6} xs={12}>
              <TeamProfile className={classes.TeamProfile} team={team} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer></Footer>
    </Page>
  );
};

export default LandingPage;
