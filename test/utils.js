export function doCases(description, casese, test) {
  casese.forEach(testCase => {
    const { only, skip, ...data } = testCase;

    let testIt = it;

    if (only) {
      testIt = it.only.bind(it);
    } else if (skip) {
      testIt = it.skip.bind(it);
    }

    testIt(`${description} ${JSON.stringify(data)}`, () => test(data));
  });
}
