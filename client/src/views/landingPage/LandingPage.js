import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import Image from "src/static/images/daniel-olahh.jpg";
import { replace } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    margin: theme.spacing(10),
  },
  Button: {
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

  return (
    <Page className={classes.root} title='Devhub'>
      <NavBar />
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
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
    </Page>
  );
};

export default LandingPage;
