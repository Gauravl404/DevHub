import React, { useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import { userSetContext } from "src/App";
import { userContext } from "src/App";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  paper: {
    marginBlockStart: theme.spacing(4),
    marginInline: "auto",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterIndividual = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const { getProfile } = useContext(userSetContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home", { replace: false });
    }
  }, [isAuthenticated]);

  return (
    <Page className={classes.root} title='Register'>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'
      >
        <Paper elevation={10} className={classes.paper}>
          <Container maxWidth='sm'>
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                website: "",
                lastName: "",
                password: "",
                address: "",
                type: "",
                dob: "",
                policy: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                firstName: Yup.string()
                  .max(255)
                  .required("company name is required"),
                lastName: Yup.string()
                  .max(255)
                  .required("manager name is required"),
                password: Yup.string()
                  .max(255)
                  .required("password is required"),
                website: Yup.string().max(255),
                policy: Yup.boolean().oneOf(
                  [true],
                  "This field must be checked"
                ),
              })}
              onSubmit={async (values) => {
                const {
                  email,
                  firstName,
                  website,
                  lastName,
                  password,
                  address,
                  dob,
                } = values;
                const handle = website;

                const type = "org";
                const gender = "O";

                try {
                  const body = {
                    firstName,
                    lastName,
                    email,
                    password,
                    type,
                    gender,
                    address,
                    dob,
                    handle,
                  };
                  console.log(body);
                  const response = await fetch(
                    "http://localhost:5000/auth/register",
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
                    getProfile();

                    navigate("/app/home", { replace: true });
                    //toast.success("Register Successfully");
                  } else {
                    setIsAuthenticated(false);
                    //toast.error(parseRes);
                  }
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
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color='textPrimary' variant='h2'>
                      Create new account
                    </Typography>
                    <Typography
                      color='textSecondary'
                      gutterBottom
                      variant='body2'
                    >
                      Use your email to create new account
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label='Organisation Name'
                    margin='normal'
                    name='firstName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant='outlined'
                  />
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label='Representer Name'
                    margin='normal'
                    name='lastName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant='outlined'
                  />
                  <TextField
                    error={Boolean(touched.github && errors.lastgithubName)}
                    fullWidth
                    helperText={touched.github && errors.github}
                    label='Organisation website'
                    margin='normal'
                    name='website'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.website}
                    variant='outlined'
                  />
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label='address'
                    margin='normal'
                    name='address'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant='outlined'
                  />
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
                  <TextField
                    id='datetime-local'
                    label='since'
                    type='date'
                    name='dob'
                    onChange={handleChange}
                    value={values.dob}
                    defaultValue='2017-05-24'
                    className={classes.dob}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Box alignItems='center' display='flex' ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name='policy'
                      onChange={handleChange}
                    />
                    <Typography color='textSecondary' variant='body1'>
                      I have read the{" "}
                      <Link
                        color='primary'
                        component={RouterLink}
                        to='#'
                        underline='always'
                        variant='h6'
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color='primary'
                      disabled={isSubmitting}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      Sign up now
                    </Button>
                  </Box>
                  <Typography color='textSecondary' variant='body1'>
                    Have an account?{" "}
                    <Link component={RouterLink} to='/auth/login' variant='h6'>
                      Sign in
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

export default RegisterIndividual;
