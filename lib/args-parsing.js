/**
 * Parses the arguments
 *
 * @param argv {string[]} - the arguments
 * @returns {*} - the parsed arguments
 */
export const parsedArgs = (argv) => {
  const textCmd = argv.join(" ");
  return Object.assign(
    {},
    /(?<cmd>[^ ]+) (?<params>[^\-\s]+)*/.exec(textCmd).groups,
  );
};
