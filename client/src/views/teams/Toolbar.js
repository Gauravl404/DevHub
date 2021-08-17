import React, { useState } from "react";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Search as SearchIcon } from "react-feather";
//import { Link } from "react-router-dom";
import CreateTeam from "./CreateTeam";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchButton: {
    width: 500,
    marginInline: theme.spacing(2),
  },
}));

const Toolbar = ({ className, user, setrefresh, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display='flex' justifyContent='flex-end'>
        <div>
          <Button color='primary' variant='contained' onClick={handleClickOpen}>
            {" "}
            Create your Own Team
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
          >
            <DialogTitle id='form-dialog-title'>Create Team</DialogTitle>
            <DialogContent>
              <CreateTeam
                user={user}
                setrefresh={setrefresh}
                handleClose={handleClose}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display='flex' justifyContent='flex-end'>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SvgIcon fontSize='small' color='action'>
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder='Search your favorite Teams'
                variant='outlined'
              />
              <Button
                color='primary'
                variant='contained'
                className={classes.searchButton}
              >
                Search
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
