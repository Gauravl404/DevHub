import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Notifications from "./Notifications";
import Password from "./Password";
import ProfileSettings from "./ProfileSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='Settings'>
      <Container maxWidth='lg'>
        <Notifications />
        <Box mt={3}>
          <ProfileSettings />
        </Box>
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </Page>
  );
};

export default Settings;
