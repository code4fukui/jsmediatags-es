import { MediaTags } from "./MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = { title: "new_title", artist: "new_artist", album: "new_album" };
const bin2 = await MediaTags.encode(bin, tags);
await Deno.writeFile("./music-file_dst.mp3", bin2);
