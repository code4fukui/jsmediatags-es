import { MediaTags } from "./MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = await MediaTags.decode(bin);
console.log(tags);
