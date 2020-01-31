import moment from "moment";
import { parseAttrs, parseDate, parseLine } from "../src/reportParser";

describe("Test parser", () => {
  describe("Test attribute parser", () => {
    describe("isContinue", () => {
      const testPairs = [
        ["!continue", true],
        ["        !continue", true],
        ["!continue             ", true],
        ["                !continue             ", true],
        ["Am not !continue", false]
      ];
      testPairs.forEach(([tCase, isContinue], index) =>
        it(`test ${index} - '${tCase}'`, () =>
          expect(parseAttrs(tCase)).toMatchObject({ isContinue }))
      );
    });
    describe("isHello", () => {
      const testPairs = [
        ["!hello", true],
        ["        !hello", true],
        ["!hello             ", true],
        ["                !hello             ", true],
        ["Am not !hello", false]
      ];
      testPairs.forEach(([tCase, isHello], index) =>
        it(`test ${index} - '${tCase}'`, () =>
          expect(parseAttrs(tCase)).toMatchObject({ isHello }))
      );
    });
  });
  describe("Test date parser", () => {
    const testPairs = [
      // [
      //   "2020-01-29 10:15",
      //   undefined,
      //   moment("2020-01-29T10:15:00").toISOString()
      // ],
      [
        "11:32",
        { day: moment("2020-01-29") },
        moment("2020-01-29T11:32:00").toISOString()
      ]
    ];

    testPairs.forEach(([tCase, params, expectedValue], index) =>
      it(`test ${index} - '${tCase}' ${JSON.stringify(params)}`, () =>
        expect(
          parseDate(tCase, params)
            .local(true)
            .toISOString()
        ).toEqual(expectedValue))
    );
  });
});
