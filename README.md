# jsmediatags-es

[
![deno module](https://shield.deno.dev/x/jsmediatags_es)
](https://deno.land/x/jsmediatags_es)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

`jsmediatags-es` is an **ES Module version** of the popular [jsmediatags](https://github.com/aadsm/jsmediatags) library, optimized for modern environments like **Deno** and **browsers**. It provides a simple API to **read and write ID3v1/ID3v2 tags** in MP3 files by integrating the writing capabilities of [browser-id3-writer](https://github.com/code4fukui/browser-id3-writer).

---

## Demo

Try the live demo to see it in action: **[jsmediatags-es Demo](https://code4fukui.github.io/jsmediatags-es/)**

---

## Features

-   ✅ **Read & Write ID3 Tags**: Decode existing ID3v1/ID3v2 tags and encode new or modified tags back to the file.
-   🚀 **ES Module Native**: Use directly in Deno or modern browsers with `import`—no build step required.
-   ✨ **Simple API**: A clean, promise-based API with two primary methods: `MediaTags.decode()` and `MediaTags.encode()`.
-   📦 **Pure JavaScript**: No server-side dependencies needed. Works entirely on the client-side.
-   🏷️ **Shortcut Support**: Easily access and modify common tags like `title`, `artist`, `album`, `picture`, and `lyrics`.

---

## Usage

The library is designed to work with `Uint8Array` data, making it compatible with file reading APIs in both Deno and the browser.

### Deno

#### Read (Decode) Tags

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = await MediaTags.decode(bin);

console.log(tags);
// {
//   type: "ID3",
//   version: "2.3.0",
//   tags: {
//     title: "Song Title",
//     artist: "Artist Name",
//     album: "Album Name",
//     ...
//   }
// }
```

#### Write (Encode) Tags

This example writes new values for several common tags.

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const newTags = {
  title: "New Title",
  artist: "New Artist",
  album: "New Album",
  genre: "Rock", // See genre-id3v1.csv for available genres
};

const updatedBin = await MediaTags.encode(bin, newTags);
await Deno.writeFile("./music-file_updated.mp3", updatedBin);
```

#### Read, Modify, and Write

A complete example showing how to read existing tags, modify them (including cover art and lyrics), and save the result.

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

// 1. Read the original MP3 file
const bin = await Deno.readFile("./music-file.mp3");

// 2. Decode the tags
const tags = await MediaTags.decode(bin);

// 3. Modify the tags object
tags.tags.title = "A New Song Title";
tags.tags.artist = "The ES Coders";
tags.tags.album = "Module Magic";
tags.tags.year = 2024;

// Update the cover art (must be a Uint8Array)
tags.tags.picture = {
  description: "Cover",
  data: await Deno.readFile("./cover.jpg"),
};

// Update the lyrics
tags.tags.lyrics = {
  language: "eng",
  description: "Lyrics",
  lyrics: "La la la, code is fun...",
};

// 4. Encode the modified tags back into a new binary
const updatedBin = await MediaTags.encode(bin, tags);

// 5. Write the new MP3 file
await Deno.writeFile("./music-file_retouched.mp3", updatedBin);

console.log("Tags updated successfully!");
```

### Browser

You can use `jsmediatags-es` directly in the browser with an `<input type="file">`.

#### Read Tags from a File Input

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Read MP3 Tags</h1>
  <input type="file" id="file-input" accept=".mp3" />
  <pre id="output"></pre>

  <script type="module">
    import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

    const fileInput = document.getElementById('file-input');
    const output = document.getElementById('output');

    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const buffer = await file.arrayBuffer();
        const bin = new Uint8Array(buffer);
        const tags = await MediaTags.decode(bin);
        output.textContent = JSON.stringify(tags, null, 2);
      } catch (err) {
        output.textContent = "Error reading tags: " + err.message;
      }
    });
  </script>
</body>
</html>
```

---

## API Reference

### `MediaTags.decode(data)`

Asynchronously decodes ID3 tags from an MP3 file's binary data.

-   **`data`** (`Uint8Array`): The binary content of the MP3 file.
-   **Returns**: `Promise<object>` A promise that resolves to the tag object.

### `MediaTags.encode(data, tags)`

Asynchronously encodes new or modified tags into an MP3 file's binary data.

-   **`data`** (`Uint8Array`): The original binary content of the MP3 file.
-   **`tags`** (`object`): An object containing the tags to write. This can be the full object returned by `decode` or a simple object with shortcut keys (`title`, `artist`, etc.).
-   **Returns**: `Promise<Uint8Array>` A promise that resolves to the new binary content with the updated tags.

### Tag Structure

The `tags` object for both decoding and encoding uses simple key-value pairs for common frames.

**Simple object for encoding:**

```javascript
const simpleTags = {
  title: "My Song",
  artist: "An Artist",
  album: "Greatest Hits",
  year: 2024,
  comment: "A comment",
  track: 5,
  genre: "Pop",
  picture: { // Optional
    description: "album cover",
    data: imageUint8Array, // The image data as a Uint8Array
  },
  lyrics: { // Optional
    language: "eng",
    description: "song lyrics",
    lyrics: "Never gonna give you up...",
  }
};
```

---

## Acknowledgements

This library is a modern ESM wrapper that combines the power of two great projects:

-   **Tag Reading**: [jsmediatags](https://github.com/aadsm/jsmediatags) by António Afonso, Jacob Seidelin, and contributors.
-   **Tag Writing**: [browser-id3-writer](https://github.com/code4fukui/browser-id3-writer) by code4fukui.

## License

This project is available under the BSD-3-Clause license. See the original `package.json` for full license details.