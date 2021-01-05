import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
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
  },
  input: {
    display: "none",
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={1}>
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
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <input
          accept='image/*'
          className={classes.input}
          id='contained-button-file'
          multiple
          type='file'
        />
        <label htmlFor='contained-button-file'>
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
        >
          Post
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
