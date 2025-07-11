import * as jsmediatags from "./src/jsmediatags.js";
import { ID3Writer } from "https://code4fukui.github.io/browser-id3-writer/src/ID3Writer.mjs";
import { ID3v2TagReader } from "./src/ID3v2TagReader.js";

export class MediaTags {
  static async decode(bin) {
    return new Promise((resolve, reject) => {
      jsmediatags.read(bin, {
        onSuccess: tag => resolve(tag),
        onError: err => reject(err),
      });
    });
  }
  static prejob(tags) {
    const shortcuts = new ID3v2TagReader().getShortcuts();
    for (const shortcut in shortcuts) {
      if (tags[shortcut]) {
        const name = shortcuts[shortcut][0];
        if (!tags[name]) tags[name] = {};
        tags[name].data = tags[shortcut];
        delete tags[shortcut];
      }
    }
  }
  static async encode(mp3, tags) {
    if (tags.tags) tags = tags.tags;
    MediaTags.prejob(tags);

    const writer = new ID3Writer(mp3);
    for (const name in tags) {
      const value = tags[name].data;
      if (name == "APIC") {
        writer.setFrame(name, {
          type: 3, // cover
          description: value.description,
          data: value.data instanceof Uint8Array ? value.data : new Uint8Array(value.data),
        });
      } else if (name == "TPE1") {
        if (typeof value == "string") {
          writer.setFrame(name, [value]);
        } else {
          writer.setFrame(name, value);
        }
      } else if (typeof value == "string") {
        writer.setFrame(name, value);
      } else {
        //throw new Error("not supported");
        //console.log(name, value)
        writer.setFrame(name, value);
      }
    }
    writer.addTag();
    return new Uint8Array(writer.arrayBuffer);
  }
}
