import { Point } from "./point";
import { GameCanvas } from "./canvas";
import "./index.css";
import {
  getRandomInteger,
  getWindowsPositions,
  isNeighbours,
} from "./calculations";
import { fromEvent, interval, of } from "rxjs";
import {
  concatMap,
  filter,
  map,
  scan,
  startWith,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { GOAL_PICTURE, MAX, MIN } from "./constant";

const scoreRender = (
  score: number = 0,
  scoreElement: HTMLElement | null
): void => {
  if (!!scoreElement) {
    scoreElement.innerHTML = score.toString();
  }
};

const main = () => {
  const windowsCount = getRandomInteger(MIN, MAX);
  const positions = getWindowsPositions(windowsCount);
  const gameCanvas = new GameCanvas(positions, GOAL_PICTURE);
  const scoreEl = document.getElementById("score");
  const defaultPosition = positions[0];
  gameCanvas.drawGameField();

  const player$ = fromEvent(gameCanvas.canvas, "click").pipe(
    map<MouseEvent, Point>((event) => ({ x: event.clientX, y: event.clientY }))
  );

  const goalPosition$ = interval(1000).pipe(
    startWith(defaultPosition),
    map(() => {
      const positionIndex = getRandomInteger(1, windowsCount);
      return positions[positionIndex];
    }),
    scan(
      (acc, position) => {
        const oldPosition = acc[acc.length - 1];
        if (oldPosition === position) {
          position =
            oldPosition !== defaultPosition ? defaultPosition : positions[1];
        }
        return [...acc, position];
      },
      [defaultPosition]
    ),
    concatMap((positions) => {
      const lastIndex = positions.length - 1;
      const currentPosition = positions[lastIndex];
      const previousPosition = positions[lastIndex - 1];
      
      return of([previousPosition, currentPosition]).pipe(
        tap(([previous, current]) => {
          gameCanvas.clearImage(previous);
          gameCanvas.drawImage(current);
        }),
        map(([_, current]) => current)
      );
    })
  );

  const game$ = player$.pipe(
    withLatestFrom(goalPosition$),
    filter(
      ([mousePosition, goalPosition]: [Point, Point]) =>
        isNeighbours(mousePosition, goalPosition, "x") &&
        isNeighbours(mousePosition, goalPosition, "y")
    ),
    scan((acc, _) => acc + 1, 0),
    tap((score) => scoreRender(score, scoreEl))
  );

  game$.subscribe();
};

main();
