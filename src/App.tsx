import { useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  useMediaQuery,
  CssBaseline,
} from "@material-ui/core";

import { RoomContextProvider } from "./context";
import { BuildingPlan } from "./components/BuildingPlan";

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <RoomContextProvider>
        <CssBaseline />
        <BuildingPlan height={window.innerHeight} width={window.innerWidth} />
      </RoomContextProvider>
    </ThemeProvider>
  );
};
