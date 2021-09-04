import { useRoomContext } from "../context";
import { Canvas } from "./Canvas";

export type BuildingPlanProps = { width: number; height: number };

export const BuildingPlan = ({ width, height }: BuildingPlanProps) => {
  const { state } = useRoomContext();

  return (
    <Canvas
      height={height}
      width={width}
      draw={(ctx) => {
        state.map.map(({ coordinates, size }, index) => {
          const { free } = state.char[index];
          ctx.fillStyle = free ? "green" : "gray";
          ctx.fillRect(coordinates.x, coordinates.y, size.w, size.h);
        });
      }}
    />
  );
};
