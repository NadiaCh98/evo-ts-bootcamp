import {
  BRIKE_HEIGHT,
  GAP,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  WINDOW_SIZE,
} from "./constant";
import { Point } from "./point";

export class GameCanvas {
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private image = new Image();
  private _canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private windowsPostitions: Point[], private gamePicture: string) {
    this.image = new Image();
    this.image.src = this.gamePicture;
    this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Context is not initialized");
    }
    this.context = context;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
  }

  public drawGameField(): void {
    this.drawBrikes();
    this.drawWindows();
  }

  public drawImage(position: Point): void {
    this.context.rect(position.x, position.y, WINDOW_SIZE, WINDOW_SIZE);
    this.context.drawImage(
      this.image,
      position.x,
      position.y,
      WINDOW_SIZE,
      WINDOW_SIZE
    );
  }

  public clearImage(position: Point): void {
    this.context.clearRect(position.x, position.y, WINDOW_SIZE, WINDOW_SIZE);
    this.context.stroke();
  }

  private drawBrikes(): void {
    this.context.save();
    this.context.fillStyle = "#fd7e14";
    const brikeWidth = 20;
    for (let line = 0; line * BRIKE_HEIGHT < CANVAS_HEIGHT; line++) {
      let brikeLineWidth = 0;
      const top = line * (BRIKE_HEIGHT + GAP);
      while (brikeLineWidth < CANVAS_WIDTH) {
        const currentBrikeWidth =
          brikeLineWidth === 0 && line % 2 === 0 ? brikeWidth / 2 : brikeWidth;
        this.context.fillRect(
          brikeLineWidth,
          top,
          currentBrikeWidth,
          BRIKE_HEIGHT
        );
        brikeLineWidth += currentBrikeWidth + GAP;
      }
    }
    this.context.stroke();
    this.context.restore();
  }

  private drawWindows(): void {
    this.context.fillStyle = "white";
    this.context.strokeStyle = "black";
    this.windowsPostitions.forEach((position) => {
      this.context.rect(position.x, position.y, WINDOW_SIZE, WINDOW_SIZE);
    });
    this.context.fill();
    this.context.stroke();
  }
}
