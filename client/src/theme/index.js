import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#f0f0f0",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.indigo[500],
    },
    secondary: {
      main: colors.red[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      white: colors.common.white,
    },
  },
  shadows,
  typography,
});

export default theme;
