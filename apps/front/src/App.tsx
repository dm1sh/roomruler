import { useEffect, useRef, useState } from "react";
import { makeStyles, Grid, useTheme } from "@material-ui/core";

import { RoomContextProvider } from "./context";
import { BuildingPlan } from "./components/BuildingPlan";
import { RoomList } from "./components/RoomList";
import { AppTheme } from "./theme";
import { Header } from "./components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 2, 2, 2),
    height: "100vh",
    overflow: "hidden",
    "& > div": {
      height: "100%",
    },
    "& > div > *": {
      height: "100%",
    },
  },
}));

export const App = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  const planContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (planContainer.current)
      setCanvasSize({
        w: planContainer.current.clientWidth - theme.spacing(2),
        h: planContainer.current.clientHeight - theme.spacing(1),
      });
  }, [planContainer.current]);

  return (
    <AppTheme>
      <RoomContextProvider>
        <Header />
        <Grid className={classes.root} container>
          <Grid ref={planContainer} item xs={9}>
            <BuildingPlan width={canvasSize.w} height={canvasSize.h} />
          </Grid>
          <Grid item xs={3}>
            <RoomList />
          </Grid>
        </Grid>
      </RoomContextProvider>
    </AppTheme>
  );
};
