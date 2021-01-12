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
    fontWeight: 600,
    fontFamily: "Cursive",
    color: "#039dfc",
    cursor: "pointer",
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
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <Typography variant='h2' className={classes.title}>
            DevHub
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => clickHandle(e)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
