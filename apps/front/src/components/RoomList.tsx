import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  InputLabel,
  Select,
  Box,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";

import { useRoomContext } from "../context";
import { FilterState } from "../types/ui";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100%",
    height: `calc(100% - ${theme.spacing(1)}px)`,
    padding: theme.spacing(2),
  },
  filterBox: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
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

  const [filter, setFilter] = useState(FilterState.ALL);

  const handleFilterChange = (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (event.target && typeof event.target.value === "string")
      setFilter(Number.parseInt(event.target.value));
  };

  return (
    <Paper className={classes.drawer}>
      <Typography variant="h6">Class room avaliability status</Typography>
      <Box className={classes.filterBox}>
        <InputLabel htmlFor="filter">Filter</InputLabel>

        <Select
          native
          value={filter}
          onChange={handleFilterChange}
          inputProps={{
            name: "filter",
            id: "filter",
          }}
        >
          <option value={FilterState.ALL}>All</option>
          <option value={FilterState.FREE}>Free</option>
          <option value={FilterState.BUSY}>Busy</option>
        </Select>
      </Box>
      <List>
        {state.map.map(({ title }, index) => {
          if (filter === FilterState.FREE && !state.char[index].free) return "";
          else if (filter === FilterState.BUSY && state.char[index].free)
            return "";
          else
            return (
              <ListItem key={title} disableGutters>
                <ListItemIcon className={classes.indicatorContainer}>
                  <div
                    className={`${classes.indicator} ${
                      state.char[index].free ? classes.free : classes.busy
                    }`}
                  />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            );
        })}
      </List>
    </Paper>
  );
};
