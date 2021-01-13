import React, { useState, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { userContext } from "src/App";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    mail_id: "",
    team_id: "",
    image: "",
    type: "",
    status: "",
    handle_url: "",
  });

  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      const {
        id,
        full_name,
        mail_id,
        team_id,
        image,
        type,
        status,
        handle_url,
      } = parseData;
      setUser({
        id: id,
        full_name: full_name,
        mail_id: mail_id,
        team_id: team_id,
        image: image,
        type: type,
        status: status,
        handle_url: handle_url,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        onIsAuthenticated={setIsAuthenticated}
      />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        user={user}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
