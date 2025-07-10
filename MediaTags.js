import * as jsmediatags from "./src/jsmediatags.js";

export class MediaTags {
  static async decode(bin) {
    return new Promise((resolve, reject) => {
      jsmediatags.read(bin, {
        onSuccess: tag => resolve(tag),
        onError: err => reject(err),
      });
    });
  }
}
