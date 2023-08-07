import test from "oletus";
import { parsedArgs } from "../lib/argv-parsing.js";

test("could parse command with one params", (t) => {
  t.deepEqual(parsedArgs(["foo", "bar"]), { cmd: "foo", params: ["bar"] });
});

test("could parse command with multiple params", (t) => {
  t.deepEqual(parsedArgs(["foo", "bar", "baz"]), {
    cmd: "foo",
    params: ["bar", "baz"],
  });

  t.deepEqual(parsedArgs(["foo", "bar", "baz", "qux"]), {
    cmd: "foo",
    params: ["bar", "baz", "qux"],
  });
});

test("could parse command with params and options", (t) => {
  t.deepEqual(parsedArgs(["foo", "bar", "--baz", "bab"]), {
    cmd: "foo",
    params: ["bar"],
    options: { baz: "bab" },
  });

  t.deepEqual(parsedArgs(["foo", "bar", "--baz", "bab", "--qux", "quux"]), {
    cmd: "foo",
    params: ["bar"],
    options: { baz: "bab", qux: "quux" },
  });

  t.deepEqual(parsedArgs(["foo", "bar", "--baz", "bab", "--qux=quux"]), {
    cmd: "foo",
    params: ["bar"],
    options: { baz: "bab", qux: "quux" },
  });
});

test("could parse command with params and boolean options", (t) => {
  t.deepEqual(parsedArgs(["foo", "--help"]), {
    cmd: "foo",
    options: { help: true },
  });

  t.deepEqual(
    parsedArgs(["foo", "bar", "--baz", "bab", "--joe", "--qux", "quux"]),
    {
      cmd: "foo",
      params: ["bar"],
      options: { baz: "bab", qux: "quux", joe: true },
    },
  );

  t.deepEqual(parsedArgs(["foo", "bar", "--baz", "bab", "--qux=quux"]), {
    cmd: "foo",
    params: ["bar"],
    options: { baz: "bab", qux: "quux" },
  });
});

test("could parse command with only options", (t) => {
  t.deepEqual(parsedArgs(["--help"]), { options: { help: true } });
  t.deepEqual(parsedArgs(["--help", "--foo=2"]), {
    options: { help: true, foo: "2" },
  });
});
