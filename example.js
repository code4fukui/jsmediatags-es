import * as jsmediatags from "./src/jsmediatags.js";

const bin = await Deno.readFile("./music-file.mp3");

jsmediatags.read(bin, {
  onSuccess: (tag) => {
    console.log(tag);
  },
  onError: (error) => {
    console.log(error);
  }
});
