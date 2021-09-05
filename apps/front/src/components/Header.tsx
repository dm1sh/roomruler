import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  SvgIcon,
} from "@material-ui/core";

import { ReactComponent as LogoIcon } from "./logo.svg";

export const Header = () => (
  <AppBar>
    <Toolbar>
      <IconButton edge="start" aria-label="logotype">
        <SvgIcon>
          <LogoIcon />
        </SvgIcon>
      </IconButton>
      <Typography variant="h6">
        roomruler
      </Typography>
    </Toolbar>
  </AppBar>
);
