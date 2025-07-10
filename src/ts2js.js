const fn = Deno.args[0];

let s = await Deno.readTextFile(fn);
const types = [
  "void",
  "string", "number", "boolean", "any",
  "Array<string>", "Array<number>", "Array<boolean>", "Array<any>",
];
for (const type of types) {
  s = s.replace(new RegExp("\\??: " + type, "g"), "");
}
await Deno.writeTextFile(fn, s);


