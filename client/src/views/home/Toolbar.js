import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
import SendIcon from "@material-ui/icons/Send";
import { PenTool as PenToolIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    width: 200,
    margin: theme.spacing(1),
    maxHeight: 30,
  },
  input: {
    display: "none",
  },
  preview: {
    maxHeight: 10,
    maxWidth: 10,
  },
}));

const Toolbar = ({ className, setref, ...rest }) => {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [images, setImage] = useState();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const selectimage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images) return;

    const reader = new FileReader();
    reader.readAsDataURL(images);
    reader.onloadend = () => {
      uploadImage(reader.result, message);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      //setErrMsg('something went wrong!');
    };

    const uploadImage = async (base64EncodedImage, message) => {
      try {
        await fetch("http://localhost:5000/dashboard/postfeed", {
          method: "POST",
          body: JSON.stringify({ data: base64EncodedImage, message: message }),
          headers: {
            jwt_token: localStorage.token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        setImage();
        setPreview();
        setMessage("");
        setref(true);
      } catch (err) {
        console.error(err);
        // setErrMsg('Something went wrong!');
      }
    };
    // const body = { message, images };

    // const responce = await fetch("http://localhost:5000/dashboard/postfeed", {
    //   method: "POST",
    //   headers: { jwt_token: localStorage.token },
    //   body: body,
    // });

    // const parsedata = responce.json();

    // if (parsedata) {
    //   setPreview([]);
    //   setImage([]);
    //   setMessage("");
    // }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={1}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Box>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <PenToolIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Share something'
                  variant='outlined'
                  value={message}
                  onChange={handleChange}
                />
              </Box>
              <Box display='flex' justifyContent='flex-end'>
                {preview && (
                  <Box
                    display='flex'
                    justifyContent='flex-start'
                    marginTop='20px'
                    flex='75%'
                  >
                    <img width='100' height='100' src={preview} alt='' />
                  </Box>
                )}
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  textAlign='center'
                  flex='25%'
                >
                  <label htmlFor='contained-button-file'>
                    <input
                      accept='image/*'
                      className={classes.input}
                      id='contained-button-file'
                      multiple
                      type='file'
                      onChange={(e) => selectimage(e)}
                    />

                    <Button
                      variant='contained'
                      color='primary'
                      className={classes.button}
                      startIcon={<AttachmentIcon />}
                      component='span'
                    >
                      Add media
                    </Button>
                  </label>

                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    endIcon={<SendIcon />}
                    type='submit'
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
