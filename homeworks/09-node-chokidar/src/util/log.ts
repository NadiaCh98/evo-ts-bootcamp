import { EventStatus } from "../../config/config";

export const log = (
  filepath: string,
  status: EventStatus,
  fileContent?: string
): void => {
  console.log(
    `File: ${filepath}, Status: ${status} ${fileContent ? `, Content: \n${fileContent}` : ''}`
  );
};
