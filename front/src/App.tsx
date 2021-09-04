import { useEffect, useMemo, useRef, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  useMediaQuery,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";

import { RoomContextProvider, useRoomContext } from "./context";
import { BuildingPlan } from "./components/BuildingPlan";
import { RoomList } from "./components/RoomList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 2, 2, 2),
    height: "100vh",
    "& > div > *": {
      height: "100%",
    },
  },
}));

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

  const planContainer = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (planContainer.current)
      setCanvasSize({
        w: planContainer.current.clientWidth - theme.spacing(2),
        h: planContainer.current.clientHeight - theme.spacing(1),
      });
  }, [planContainer.current]);

  return (
    <ThemeProvider theme={theme}>
      <RoomContextProvider>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="h6">roomruler</Typography>
          </Toolbar>
        </AppBar>
        <Grid className={classes.root} container>
          <Grid ref={planContainer} item xs={9}>
            <BuildingPlan width={canvasSize.w} height={canvasSize.h} />
          </Grid>
          <Grid item xs={3}>
            <RoomList />
          </Grid>
        </Grid>
      </RoomContextProvider>
    </ThemeProvider>
  );
};
