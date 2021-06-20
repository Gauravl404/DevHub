import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useState, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
//import 'src/mixins/chartjs';
import theme from "src/theme";
import routes from "src/routes";

export const userContext = React.createContext();
export const userSetContext = React.createContext();
const App = () => {
  const routing = useRoutes(routes);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      setIsAuthenticated(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkAuthenticated();
    } else {
      navigate("/", { replace: false });
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      const getProfile = async () => {
        try {
          const res = await fetch("http://localhost:5000/dashboard/", {
            method: "POST",
            headers: { jwt_token: localStorage.token },
          });

          const parseData = await res.json();

          console.log(parseData);
          setUser(parseData);
          navigate("/app/home", { replace: false });
        } catch (err) {
          console.error(err.message);
        }
      };
      getProfile();
    } else {
      navigate("/", { replace: false });
    }
  }, [isAuthenticated]);

  // const setAuth = (boolean) => {
  //   setIsAuthenticated(boolean);
  // };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/", { replace: false });
  //   }
  // }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <userSetContext.Provider value={{ user, setUser }}>
        <userContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {routing}
        </userContext.Provider>
      </userSetContext.Provider>
    </ThemeProvider>
  );
};

export default App;
