import prettyjson = require("prettyjson");

export const csvToJson = (content: string): string => prettyjson.render(content);