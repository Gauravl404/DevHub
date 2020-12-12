import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const clickHandle = (e) => {
    e.preventDefault();
    navigate("auth/login", { replace: true });
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h2' className={classes.title}>
            Devhub
          </Typography>
          <Button color='inherit' onClick={(e) => clickHandle(e)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
