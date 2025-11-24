declare module "@georgedoescode/spline" {
  export function spline(
    points: Array<{ x: number; y: number }> | Array<[number, number]>,
    tension?: number,
    close?: boolean,
    cb?: (type: "MOVE" | "CURVE", points: number[]) => void
  ): string;
}
