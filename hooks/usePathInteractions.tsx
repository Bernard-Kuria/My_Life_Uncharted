import { useEffect, useState } from "react";
import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";

export function usePathInteractions(
  path: React.RefObject<SVGPathElement | null>
) {
  const [points, setPoints] = useState<
    {
      x: number;
      y: number;
      originX: number;
      originY: number;
      noiseOffsetX: number;
      noiseOffsetY: number;
    }[]
  >([]);

  const noise2D = createNoise2D();
  const noiseStep = 0.002;

  useEffect(() => {
    function createPoints() {
      const points = [];
      const numPoints = 6;
      const angleStep = (Math.PI * 2) / numPoints;
      const radX = 150;
      const radY = 150;

      for (let i = 1; i <= numPoints; i++) {
        const theta = i * angleStep;
        const x = 150 + Math.cos(theta) * radX;
        const y = 150 + Math.sin(theta) * radY;

        points.push({
          x: x,
          y: y,
          originX: x,
          originY: y,
          noiseOffsetX: Math.random() * 100,
          noiseOffsetY: Math.random() * 100,
        });
      }

      return points;
    }

    setPoints(createPoints());
  }, []);

  function map(
    n: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }

  function noise(x: number, y: number) {
    return noise2D(x, y);
  }

  useEffect(() => {
    if (points.length === 0) return;

    function animate() {
      if (path.current) path.current.setAttribute("d", spline(points, 1, true));

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
        const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
        const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

        point.x = x;
        point.y = y;

        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, [points, path]);
}
