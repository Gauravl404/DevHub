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

  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  // const setAuth = (boolean) => {
  //   setIsAuthenticated(boolean);
  // };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: false });
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* // <userSetContext.Provider value={setAuth}> */}
      <userContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {routing}
      </userContext.Provider>
      {/* </userSetContext.Provider> */}
    </ThemeProvider>
  );
};

export default App;
