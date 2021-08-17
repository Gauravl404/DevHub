import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  // AlertCircle as AlertCircleIcon,

  Home as HomeIcon,
  Briefcase as BriefcaseIcon,
  BookOpen as BookOpenIcon,
  // Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  // UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";

// const user = {
//   avatar: "/static/images/avatars/avatar_3.png",
//   jobTitle: "Senior Developer",
//   name: "Gaurav Jaiswal",
// };

const items = [
  {
    href: "/app/home",
    icon: HomeIcon,
    title: "Home",
  },
  {
    href: "/app/teams",
    icon: UsersIcon,
    title: "Teams",
  },
  {
    href: "/app/projects",
    icon: ShoppingBagIcon,
    title: "Projects",
  },
  {
    href: "/app/workspace",
    icon: BriefcaseIcon,
    title: "workspace",
  },
  {
    href: "/app/learn",
    icon: BookOpenIcon,
    title: "Learn",
  },
  {
    href: "/app/profile",
    icon: UserIcon,
    title: "Profile",
  },
  {
    href: "/app/recruiterprofile",
    icon: UserIcon,
    title: "Recruiter Profile",
  },
  {
    href: "/app/recruiterproject",
    icon: UserIcon,
    title: "Recruiter Project",
  },
  {
    href: "/app/Settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile, user }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box alignItems='center' display='flex' flexDirection='column' p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user?.image}
          to='/app/profile'
        />
        <Typography className={classes.name} color='textPrimary' variant='h5'>
          {`${user?.first_name} ${user?.last_name}`}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {user?.type === "dev" ? "developer" : "Recruiter"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor='left'
          classes={{ paper: classes.desktopDrawer }}
          open
          variant='persistent'
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  user: PropTypes.object,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
  user: null,
};

export default NavBar;
