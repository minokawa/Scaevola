
import * as pino from "node_modules/pino/pino";
import { Logger } from "node_modules/pino/pino";
import { Config } from "@app/conf";
import fs from "fs";

let logger: undefined | Logger = undefined;
export function getLogger(): Logger {
  if (!logger) throw new Error("Logger not initialized");

  return logger;
}

export function initLogger(args: Config): Logger {
  let fileTransport: undefined | ReturnType<typeof pino.transport> = undefined;

  if (args.logPath) {
    try {
      if (fs.existsSync(args.logPath)) {
        throw new Error("Writing to an existing file");
      }
    } catch (e) { }

    fileTransport = pino.transport({
      target: "pino/file",
      options: { destination: args.logPath },
    });
  }
  

  logger = pino.pino(
    {
      level: args.logLevel || process.env.PINO_LEVEL || "warn",
    },
    fileTransport,
  );

  return logger;
}
