import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import GroupSharpIcon from "@material-ui/icons/GroupSharp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";
//import { Navigate } from "react-router";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inheri1t' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateTeam({ setrefresh, handleClose }) {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupSharpIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create TEAM
        </Typography>
        <Formik
          initialValues={{
            name: "",
            description: "",

            policy: false,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required(" name is required"),
            description: Yup.string()
              .max(255)
              .required("desc name is required"),

            policy: Yup.boolean().oneOf([true], "This field must be checked"),
          })}
          onSubmit={async (values) => {
            const { name, description } = values;

            try {
              const body = {
                name,
                description,
              };
              console.log(body);
              const response = await fetch(
                "http://localhost:5000/dashboard/team",
                {
                  method: "POST",
                  headers: {
                    jwt_token: localStorage.token,
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(body),
                }
              );

              const parseRes = await response.json();
              console.log(parseRes);
              //alert("Team Created");
              setrefresh(true);

              handleClose();
            } catch (err) {
              console.error(err.message);
              alert("Something went wrong , please try again !");
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            handleClose,
            touched,
            values,
          }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='name'
                    name='name'
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    value={values.name}
                    onChange={handleChange}
                    label='Team Name'
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='description'
                    label='Team Description'
                    type='description'
                    value={values.description}
                    id='aboutteam'
                    onChange={handleChange}
                    autoComplete='Team Description'
                  />
                </Grid>
                {/* <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='mrequirements'
                label='Member Requirement '
                type='mrequirements'
                id='mrequirements'
                autoComplete='Member Requirement'
              />
            </Grid> */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.policy}
                        name='policy'
                        onChange={handleChange}
                      />
                    }
                    label='I want to receive team joining requests and updates via email.'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={isSubmitting}
                className={classes.submit}
              >
                CREATE
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
