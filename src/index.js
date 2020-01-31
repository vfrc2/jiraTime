import fs from "fs";
import moment from "moment";

import createReportFromString from "./reportParser";

const TIME_SHEET_FILE = "./test/report-file.txt";

const parts = ["w", "d", "h", "m"];
function formatDuration(duration) {
  return parts
    .reduce((result, part) => {
      const v = duration.get(part);
      // eslint-disable-next-line no-param-reassign
      if (v) result += `${v}${part} `;
      return result;
    }, "")
    .trim();
}

createReportFromString(
  fs.readFileSync(TIME_SHEET_FILE, { encoding: "utf8" })
).foreach(record => {
  const { start, end, description } = record;
  const duration = moment.duration(end.diff(start));

  console.log(
    `${start.format("HH:mm")} - ${end.format("HH:mm")} (${formatDuration(
      duration
    )}) ${description}`
  );
});
