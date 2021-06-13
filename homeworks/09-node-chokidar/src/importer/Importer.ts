import { csvToJson } from "./../util/cvsToJson";
import { EventStatus, EVENT_LISTENER } from "./../../config/config";
import EventEmitter = require("events");
import { EventEmmitParams } from "../models/EventEmitterParams";
import fs = require("fs");
import { log } from "../util/log";

export class Importer {
  constructor(private eventEmmiter: EventEmitter) {}

  public listen(): void {
    this.eventEmmiter.on(
      EVENT_LISTENER,
      async ({ filepath, status }: EventEmmitParams) => {
        if (status !== EventStatus.Removed) {
          let content = await this.import(filepath);
          content = csvToJson(content);
          log(filepath, status, content);
        } else {
          log(filepath, status);
        }
      }
    );
  }

  private import(filepath: string): Promise<string> {
    return fs.promises.readFile(filepath, "utf-8");
  }

  private importSync(filepath: string): string {
    return fs.readFileSync(filepath, "utf-8");
  }
}
