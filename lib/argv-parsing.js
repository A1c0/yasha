/**
 * Execute a Regex until no result will found
 *
 * @param regex {RegExp} The matching regex
 * @param string {string} The
 * @return {(RegExpExecArray|null)[]}
 */
const regexMultiExec = (regex, string) => {
  const result = [];
  let z;
  while (null != (z = regex.exec(string))) {
    result.push(z);
  }
  return result;
};

/**
 * Parses the arguments
 *
 * @param argv {string[]} - the arguments
 * @returns {*} - the parsed arguments
 */
export const parsedArgs = (argv) => {
  const textCmd = argv.join(" ");
  const cmd = /^\S+/.exec(textCmd)[0];
  const params = textCmd.match(/(?<= )((?<!.*--.*)([^\s-]+))/g) ?? undefined;
  const options = regexMultiExec(
    /(?<= --?)(?<key>[^\s=-]+(-[^\s=-]+)?)([ =](?<value>[^\s-]+))?/g,
    textCmd,
  )
    .map((x) => x?.groups)
    .reduce((acc, curr) => {
      acc[curr.key] = curr.value ?? true;
      return acc;
    }, {});
  return JSON.parse(
    JSON.stringify({
      cmd,
      params,
      options: Object.keys(options).length === 0 ? undefined : options,
    }),
  );
};
