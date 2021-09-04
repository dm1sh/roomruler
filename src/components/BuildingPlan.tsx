import { useCallback, useEffect, useState } from "react";
import { useRoomContext } from "../context";
import { Canvas } from "./Canvas";

export type BuildingPlanProps = { width: number; height: number };

export const BuildingPlan = ({ width, height }: BuildingPlanProps) => {
  const { state, setState } = useRoomContext();

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      state.map.map(({ coordinates, size }, index) => {
        const { free } = state.char[index];
        ctx.fillStyle = free ? "green" : "gray";
        ctx.fillRect(coordinates.x, coordinates.y, size.w, size.h);
      });
    },
    [state.char, state.map]
  );

  useEffect(() => {
    setTimeout(
      () =>
        setState((p) => ({
          ...p,
          char: [
            { free: false },
            { free: false },
            { free: false },
            { free: false },
          ],
        })),
      1000
    );
  }, []);

  return (
    <>
      <Canvas height={height} width={width} draw={draw} />
    </>
  );
};
