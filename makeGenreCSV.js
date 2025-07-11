import { CSV } from "https://js.sabae.cc/CSV.js";
import { GENRES } from "./src/ID3v1TagReader.js";

const data = GENRES.map((i, idx) => ({no: idx, genre: i }));
await Deno.writeTextFile("genre-id3v1.csv", CSV.stringify(data));
