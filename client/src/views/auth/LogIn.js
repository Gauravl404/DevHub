import React, { useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import FacebookIcon from "src/icons/Facebook";
import GoogleIcon from "src/icons/Google";
import Page from "src/components/Page";
import { userContext } from "src/App";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  paper: {
    margin: "20px auto",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LogIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home", { replace: false });
    }
  }, [isAuthenticated]);

  return (
    <Page className={classes.root} title='Login'>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'
      >
        <Paper elevation={10} className={classes.paper}>
          <Container>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              onSubmit={async (values) => {
                try {
                  const body = values;
                  console.log(JSON.stringify(body));

                  const response = await fetch(
                    "http://localhost:5000/auth/login",
                    {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify(body),
                    }
                  );

                  const parseRes = await response.json();

                  if (parseRes.jwtToken) {
                    localStorage.setItem("token", parseRes.jwtToken);
                    setIsAuthenticated(true);
                    navigate("/app/home", { replace: true });
                    // toast.success("Logged in Successfully");
                  } else {
                    setIsAuthenticated(false);
                    // toast.error(parseRes);
                  }
                } catch (err) {
                  console.error(err.message);
                  alert("Something went wrong , please try again !");
                }
                //navigate("/app/home", { replace: true });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color='textPrimary' variant='h2'>
                      Sign in
                    </Typography>
                    <Typography
                      color='textSecondary'
                      gutterBottom
                      variant='body2'
                    >
                      Sign in on the internal platform with
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Button
                        color='primary'
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size='large'
                        variant='contained'
                      >
                        Facebook
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size='large'
                        variant='contained'
                      >
                        Google
                      </Button>
                    </Grid>
                  </Grid>
                  <Box mt={3} mb={1}>
                    <Typography
                      align='center'
                      color='textSecondary'
                      variant='body1'
                    >
                      or login with email address
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label='Email Address'
                    margin='normal'
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='email'
                    value={values.email}
                    variant='outlined'
                  />

                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label='Password'
                    margin='normal'
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='password'
                    value={values.password}
                    variant='outlined'
                  />
                  <Box my={2}>
                    <Button
                      color='primary'
                      disabled={isSubmitting}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      Sign in now
                    </Button>
                  </Box>
                  <Typography color='textSecondary' variant='body1'>
                    Don&apos;t have an account?{" "}
                    <Link
                      component={RouterLink}
                      to='/auth/registerIndividual'
                      variant='h6'
                    >
                      Sign up as individual Developer
                    </Link>
                  </Typography>
                  <Typography color='textSecondary' variant='body1'>
                    Or{" "}
                    <Link
                      component={RouterLink}
                      to='/auth/registerOrg'
                      variant='h6'
                    >
                      Sign up as Organisation
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Paper>
      </Box>
    </Page>
  );
};

export default LogIn;
