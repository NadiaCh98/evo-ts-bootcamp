import { Command, InvalidArgumentError, Option } from "commander";
import { existsSync } from "fs";

const parseNumberArgument = (value: string): number => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError(`${value} is not a number`);
  }
  return parsedValue;
};

const checkFilePath = (path: string): string => {
  if (!existsSync(path)) {
    throw new InvalidArgumentError("File does not exists");
  }
  return path;
};

const program = new Command();

program.version("1.0.0", "--version", "Show version number");

program
  .addOption(
    new Option(
      "-a, --action <action>",
      "Specify what action you want to perform"
    )
      .choices(["encode", "decode"])
      .makeOptionMandatory(true)
  )
  .requiredOption("-s, --shift <number>", "Set the shift for decode/encode data", parseNumberArgument)
  .option(
    "-i, --input <file>",
    "Specify the file where to get the data from",
    checkFilePath
  )
  .option(
    "-o, --output <file>",
    "Specify the file to save the data to",
    checkFilePath
  );

program.parse();

export const options = program.opts();
