import { useCallback, useEffect, useState } from "react";
import { useRoomContext } from "../context";
import { Canvas } from "./Canvas";

export type BuildingPlanProps = { width: number; height: number };

export const BuildingPlan = ({ width, height }: BuildingPlanProps) => {
  const { state, setState } = useRoomContext();

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // Text styles
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      state.map.map(({ coordinates, size, title }, index) => {
        // Draw room rectangle
        const { free } = state.char[index];
        ctx.fillStyle = free ? "green" : "gray";
        ctx.fillRect(coordinates.x, coordinates.y, size.w, size.h);

        // Draw its number
        ctx.fillStyle = "black";
        ctx.fillText(
          `${title}`,
          coordinates.x + size.w / 2,
          coordinates.y + size.h / 2
        );
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
      <Canvas
        clickCb={(x, y) => {
          console.log(`x: ${x}, y: ${y}`);
        }}
        height={height}
        width={width}
        draw={draw}
      />
    </>
  );
};
