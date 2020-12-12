import React, { Fragment, useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MailIcon from "@material-ui/icons/MailOutlineOutlined";
import Logo from "src/components/Logo";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  title: { marginLeft: 40 },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [mails] = useState([]);
  const [anchorEl, setAnchorEl] = useState();
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    //handleMobileMenuClose();
  };
  const logout = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    navigate("/", { replace: false });

    //handleMobileMenuClose();
  };

  const menuId = "account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={(e) => logout(e)}>Log out</MenuItem>
    </Menu>
  );
  return (
    <Fragment>
      <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
        <Toolbar>
          <RouterLink to='/app/home'>
            <Logo />
          </RouterLink>
          <Typography variant='h2' className={classes.title}>
            DEVHUB
          </Typography>
          <Box flexGrow={1} />
          <Hidden mdDown>
            <IconButton color='inherit'>
              <Badge
                badgeContent={notifications.length}
                color='primary'
                variant='dot'
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color='inherit'>
              <Badge badgeContent={mails.length} color='primary' variant='dot'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton color='inherit' onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Fragment>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
export default TopBar;
