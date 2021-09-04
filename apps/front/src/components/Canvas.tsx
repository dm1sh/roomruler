import { HTMLProps, useEffect, useRef, MouseEvent, useCallback } from "react";

export type DrawFT = (ctx: CanvasRenderingContext2D) => void;

export type ClickCb = (x: number, y: number) => void;

export type CanvasProps = HTMLProps<HTMLCanvasElement> & {
  draw: DrawFT;
  clickCb: ClickCb;
  width?: number;
  height?: number;
};

export const useCanvas = (
  draw: DrawFT,
  clickCb: ClickCb,
  width?: number,
  height?: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("Canvas ref not set");

    const context = canvas.getContext("2d");

    if (!context) throw new Error("Couldn't get canvas context");

    draw(context);
  }, [draw, width, height]);

  const onClick = useCallback(
    (event: MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas ref not set");
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      clickCb(x, y);
    },
    [canvasRef.current]
  );

  return { canvasRef, onClick };
};

export const Canvas = ({
  draw,
  clickCb,
  width,
  height,
  ...props
}: CanvasProps) => {
  const { canvasRef, onClick } = useCanvas(draw, clickCb, width, height);

  return (
    <canvas
      onClick={onClick}
      width={width}
      height={height}
      ref={canvasRef}
      {...props}
    />
  );
};
