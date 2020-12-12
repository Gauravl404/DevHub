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
import { Search as SearchIcon } from "react-feather";

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

const Toolbar = ({ className, onSubmit, ...rest }) => {
  const classes = useStyles();
  const [user, setUser] = useState(1);
  const [searchTerm, setSearchTerm] = useState();

  const handleChange = (event) => setSearchTerm(event.target.value);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(searchTerm);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display='flex' justifyContent='flex-end'>
        {user === 0 && (
          <Button color='primary' variant='contained'>
            Create your Own Team
          </Button>
        )}
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
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={onKeyPress}
                placeholder='Search your favorite videos'
                variant='outlined'
              />
              <Button
                color='primary'
                variant='contained'
                className={classes.searchButton}
                onClick={(e) => onSubmit(searchTerm)}
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
