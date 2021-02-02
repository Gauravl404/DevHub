import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
//import AccountView from "src/views/account/AccountView";
//import CustomerListView from "src/views/customer/CustomerListView";
//import DashboardView from "src/views/reports/DashboardView";
import Login from "src/views/auth/LogIn";
import NotFoundView from "src/views/errors/NotFoundView";
import Home from "src/views/home";
import Teams from "src/views/teams";
import Projects from "src/views/projects";
import Settings from "src/views/settings";
import Learn from "src/views/learn";
import Workspace from "src/views/workspace";
import RegisterIndividual from "src/views/auth/RegisterIndividual";
import RegisterOrg from "src/views/auth/RegisterOrg";
import LandingPage from "src/views/landingPage/LandingPage";
import Acount from "src/views/profile";
//import SettingsView from "src/views/settings/SettingsView";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      //   { path: "account", element: <AccountView /> },
      //   { path: "customers", element: <CustomerListView /> },
      //   { path: "dashboard", element: <DashboardView /> },
      { path: "home", element: <Home /> },
      { path: "teams", element: <Teams /> },
      { path: "projects", element: <Projects /> },
      { path: "workspace", element: <Workspace /> },
      { path: "learn", element: <Learn /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Acount /> },
      { path: "/", element: <Navigate to='/home' /> },
      { path: "*", element: <Navigate to='/404' /> },
    ],
  },
  {
    path: "auth",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "registerIndividual", element: <RegisterIndividual /> },
      { path: "registerOrg", element: <RegisterOrg /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to='/login' /> },
      { path: "*", element: <Navigate to='/404' /> },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
];

export default routes;
