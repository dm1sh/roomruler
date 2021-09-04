import { RoomT } from "../types/room";
import { Canvas } from "./Canvas";

export type BuildingPlanProps = { width: number; height: number };

export const BuildingPlan = ({ width, height }: BuildingPlanProps) => {
  const room: RoomT = {
    coordinates: { x: 100, y: 200 },
    free: true,
    size: { h: 100, w: 200 },
  };

  return (
    <Canvas
      height={height}
      width={width}
      draw={(ctx) => {
        ctx.fillStyle = room.free ? "green" : "gray";
        ctx.fillRect(
          room.coordinates.x,
          room.coordinates.y,
          room.size.w,
          room.size.h
        );
      }}
    />
  );
};
