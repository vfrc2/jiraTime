import moment from "moment";

function parseAttrs(string, params = {}) {
  return {
    isContinue: /^\s*!continue\s*$/gi.test(string),
    isStar: /\s*\**$/g.test(string)
  };
}

const DATE_W_TIME_FORMAT = "YYYY-MM-DD HH:mm";
const TIME_FORMAT = "HH:mm";

function parseDate(string, params = { day: null }) {
  let date = moment(string, DATE_W_TIME_FORMAT, true);
  if (date.isValid()) {
    return date;
  }
  // try time only format
  if (params.day && params.day.isValid()) {
    const time = moment(string, TIME_FORMAT, true);
    if (!time.isValid())
      throw new Error(`Bad time format ${string} expected ${TIME_FORMAT}`);

    date = params.day.startOf("day");
    console.log(date, time.hours(), time.minutes());
    date.add(time.hours(), "h");
    date.add(time.minutes(), "m");
    return date;
  }
  throw new Error(
    `Bad date ${string} expected ${DATE_W_TIME_FORMAT} or ${TIME_FORMAT}`
  );
}

function parseLine(string, params = {}) {
  const rows = string.split("  ");

  const [dateStr, description] = rows;

  const attrs = parseAttrs(description);

  return {
    end: parseDate(dateStr),
    description,
    ...attrs
  };
}

export default function createReportFromString(fileContent) {
  return fileContent
    .split("\n")
    .filter(line => !(!line.trim() || line.trim().startsWith("#")))
    .reduce((report, current) => {
      const last = report.slice(-1)[0];

      const record = parseLine(
        current,
        last || { end: moment(), description: "initl" }
      );
      report.push(record);
      return report;
    }, []);
}

export { parseAttrs, parseDate, parseLine };
