import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useState, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
//import 'src/mixins/chartjs';
import theme from "src/theme";
import routes from "src/routes";

const App = () => {
  const routing = useRoutes(routes);
  // const [authenticated, setauthenticated] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authenticated) {
  //     navigate("/", { replace: false });
  //   }
  // }, [authenticated]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
