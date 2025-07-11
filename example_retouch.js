import { MediaTags } from "./MediaTags.js";
import { ID3v2TagReader } from "./src/ID3v2TagReader.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = await MediaTags.decode(bin);
console.log(tags);

console.log(Object.keys(new ID3v2TagReader().getShortcuts()));
/*
  "title", "artist", "picture",
  "album",
  "year",
  "lyrics"
  "comment",
  "track",
  "genre",   ,
*/

tags.tags.album = "プログラミングおじいちゃん";
tags.tags.title = "プログラミングおじいちゃん";
tags.tags.artist = "taisukef";
tags.tags.picture.data = await Deno.readFile("./cover.jpg");
tags.tags.lyrics = {
  language: "jpn",
  lyrics: await Deno.readTextFile("./lyric.txt"),
  description: "taisukef",
};
tags.tags.year = 2025;

const bin2 = await MediaTags.encode(bin, tags);
await Deno.writeFile("./music-file_dst.mp3", bin2);

const tags2 = await MediaTags.decode(bin2);
console.log(tags2);
