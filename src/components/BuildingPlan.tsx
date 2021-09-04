import { useTheme } from "@material-ui/core";
import { useCallback } from "react";

import { useRoomContext } from "../context";
import { RoomDisplay } from "../types/room";
import { Canvas } from "./Canvas";

export type BuildingPlanProps = { width?: number; height?: number };

const getRoomByCoord = (x: number, y: number, map: RoomDisplay[]) => {
  for (let i = 0; i < map.length; i++) {
    const { coordinates, size } = map[i];
    if (
      x >= coordinates.x &&
      x <= coordinates.x + size.w &&
      y >= coordinates.y &&
      y <= coordinates.y + size.h
    )
      return i;
  }

  return -1;
};

export const BuildingPlan = ({ width, height }: BuildingPlanProps) => {
  const { state, toggleFree } = useRoomContext();

  const theme = useTheme();

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // Text styles
      ctx.font = `${theme.typography.h6.fontSize} ${theme.typography.h6.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      state.map.map(({ coordinates, size, title }, index) => {
        // Draw room rectangle
        const { free } = state.char[index];
        ctx.fillStyle = free
          ? theme.palette.success.main
          : theme.palette.grey[500];
        ctx.fillRect(coordinates.x, coordinates.y, size.w, size.h);

        // Draw its number
        ctx.fillStyle = free
          ? theme.palette.success.contrastText
          : theme.palette.getContrastText(theme.palette.grey[500]);
        ctx.fillText(
          `${title}`,
          coordinates.x + size.w / 2,
          coordinates.y + size.h / 2
        );
      });
    },
    [state.char, state.map]
  );

  const clickCb = (x: number, y: number) => {
    const index = getRoomByCoord(x, y, state.map);
    if (index >= 0) toggleFree(index);
  };

  return (
    <>
      <Canvas clickCb={clickCb} height={height} width={width} draw={draw} />
    </>
  );
};
