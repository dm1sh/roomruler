import { HTMLProps, useEffect, useRef } from "react";

export type DrawFT = (ctx: CanvasRenderingContext2D) => void;

export type CanvasProps = HTMLProps<HTMLCanvasElement> & { draw: DrawFT };

export const useCanvas = (draw: DrawFT) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("Canvas ref not set");

    const context = canvas.getContext("2d");

    if (!context) throw new Error("Couldn't get canvas context");

    draw(context);
  }, [draw]);

  return canvasRef;
};

export const Canvas = ({ draw, ...props }: CanvasProps) => {
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...props} />;
};
