import { CANVAS_HEIGHT, CANVAS_WIDTH, WINDOW_SIZE } from "./constant";
import { Point } from "./point";

export const getRandomInteger = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomWindowPostion = (
  width: number,
  height: number,
  windowWidth: number
): Point => {
  const x = getRandomInteger(0, width - windowWidth);
  const y = getRandomInteger(0, height - windowWidth);
  return {
    x,
    y,
  };
};

export const isNeighbours = (
  position1: Point,
  position2: Point,
  character: keyof Point,
  compareValue: number = WINDOW_SIZE
): boolean => {
  return Math.abs(position1[character] - position2[character]) <= compareValue;
};

const isValidPosition = (currentPosition: Point, positions: Point[]): boolean => {
  return positions.some(
    (position) =>
      isNeighbours(position, currentPosition, "x") &&
      isNeighbours(position, currentPosition, "y")
  );
}

export const getWindowsPositions = (windowsCount: number): Point[] => {
  const positions: Point[] = [];
  for (let i = 0; i < windowsCount; i++) {
    let isInvalid = true;
    while (isInvalid) {
      const currentPosition = getRandomWindowPostion(
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        WINDOW_SIZE
      );
      const hasNeighbour = isValidPosition(currentPosition, positions);
      if (!hasNeighbour) {
        positions.push(currentPosition);
        isInvalid = false;
      }
    }
  }
  return positions;
};
