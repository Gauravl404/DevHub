import React, { useState, useEffect } from "react";

import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import ProjectCard from "./ProjectCard";
import data from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  projectCard: {
    height: "100%",
  },
}));

const Projects = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/dashboard/projects", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => setProjects(data));
    } catch (err) {
      console.error(err.message);
      alert("Something went wrong , please try again !");
    }
  }, []);

  return (
    <Page className={classes.root} title='Projects'>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item key={project.id} xl={3} lg={4} md={6} xs={12}>
                <ProjectCard
                  className={classes.projectCard}
                  project={project}
                />
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

export default Projects;
