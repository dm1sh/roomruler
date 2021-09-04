import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { useRoomContext } from "../context";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100%",
    minHeight: "100%",
    padding: theme.spacing(2),
  },
  indicatorContainer: {
    minWidth: theme.spacing(3),
  },
  indicator: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: "100%",
  },
  free: {
    background: theme.palette.success.main,
  },
  busy: {
    background: theme.palette.grey[500],
  },
}));

export const RoomList = () => {
  const classes = useStyles();

  const { state } = useRoomContext();

  return (
    <Paper className={classes.drawer}>
      <Typography variant="h6">Class room avaliability status</Typography>
      <List>
        {state.map.map(({ title }, index) => (
          <ListItem disableGutters>
            <ListItemIcon className={classes.indicatorContainer}>
              <div
                className={`${classes.indicator} ${
                  state.char[index].free ? classes.free : classes.busy
                }`}
              />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
