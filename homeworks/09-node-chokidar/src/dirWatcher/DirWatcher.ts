import { EVENT_LISTENER, EventStatus } from "./../../config/config";
import EventEmitter = require("events");
import fs = require("fs");
import path = require("path");
import { EventEmmitParams } from "../models/EventEmitterParams";

interface WatchParams {
  readonly dirpath: string;
  readonly delay?: number;
}

export class DirWatcher {
  private files = new Map<string, string>();

  constructor(private eventEmmiter: EventEmitter) {}

  public watch({ dirpath, delay }: WatchParams) {
    let count = 0;
    const intervalId = setInterval(async () => {
      const files = await this.readDirectoryFiles(dirpath);
      !!count && this.checkForRemovedFiles(files);
      files.forEach(async (file) => {
        await this.processFile(file, !!count);
      });
      count++;
    }, delay);
    return intervalId;
  }

  private readDirectoryFiles(dirpath: string): Promise<string[]> {
    return fs.promises
      .readdir(dirpath)
      .then((files) =>
        files
          .filter((file) => path.extname(file) === ".csv")
          .map((file) => path.join(dirpath, file))
      );
  }

  private processFile(filepath: string, isCheckable: boolean): Promise<void> {
    return fs.promises.readFile(filepath).then((buffer) => {
      const content = buffer.toString();
      isCheckable && this.checkFile(filepath, content);
      this.files.set(filepath, content);
    });
  }

  private checkFile(filepath: string, content: string): void {
    if (!this.files?.has(filepath)) {
      this.eventEmit(EVENT_LISTENER, { status: EventStatus.Added, filepath });
      return;
    } else if (this.files.get(filepath) !== content) {
      this.eventEmit(EVENT_LISTENER, { status: EventStatus.Changed, filepath });
      return;
    }
  }

  private getRemovedFiles(files: string[]): string[] {
    return !!this.files
      ? Array.from(this.files.keys()).filter((file) => !files.includes(file))
      : [];
  }

  private checkForRemovedFiles(newFiles: string[]): void {
    const removedFiles = this.getRemovedFiles(newFiles);
    removedFiles.forEach((filepath) => {
      this.eventEmit(EVENT_LISTENER, {
        status: EventStatus.Removed,
        filepath,
      });
      this.files.delete(filepath);
    });
  }

  private eventEmit(eventListener: string, params: EventEmmitParams): void {
    this.eventEmmiter.emit(eventListener, params);
  }
}
