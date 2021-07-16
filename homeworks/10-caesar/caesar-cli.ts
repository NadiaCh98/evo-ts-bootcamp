import { options } from "./src/commander";
import { createInterface } from "readline";
import { readFile, writeFile } from "fs";
import { caesar } from "./src/caesar";

const caesar_cli = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const input = new Promise((resolve: (value: string) => void, reject) => {
    if (options.input) {
      readFile(options.input, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data);
      })
    }
    else {
      caesar_cli.question(
        `You haven't specified an input file, please enter data you want to ${options.action}:`,
        (data) => {
          resolve(data);
          caesar_cli.close();
        }
      );
    }
});

const output = (encodedData: string) =>
  new Promise((resolve, reject) => {
    if (!!options.output) {
      writeFile(options.output, encodedData, (err) => reject(err));
    } else {
      caesar_cli.write(
        `You haven't specified an output file, leaving output here:\n ${encodedData}`
      );
    }
    resolve(encodedData);
    caesar_cli.close();
  });

const excute = (inputData: string) =>
  Promise.resolve(
    caesar(inputData, options.shift, options.action === "encode" ? 1 : -1)
  );

input.then(excute).then(output).catch(err => console.error('Something went wrong:', err));
