# jsmediatags-es

- [jsmediatags-es](https://code4fukui.github.io/jsmediatags-es/) is a JavaScript (ESmodules) version of the ID3 tags reader [jsmediatags](https://github.com/aadsm/jsmediatags).
- It can read ID3v1, ID3v2 and AAC tags from MP3 and MP4 (not yet) files.
- It can also write MediaTags with [browser-id3-writer](https://github.com/code4fukui/browser-id3-writer).

## How to use

### decode

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = await MediaTags.decode(bin);
console.log(tags);
```

### encode

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = { title: "new_title", artist: "new_artist", album: "new_album", genre: "Rock" };
const bin2 = await MediaTags.encode(bin, tags);
await Deno.writeFile("./music-file_dst.mp3", bin2);
```

- genre: [genre-id3v1.csv](genre-id3v1.csv)

## Donations

A few people have asked me about donations. I would prefer you to consider making a donation to the ["Girls Who Code" NPO](https://www.classy.org/checkout/donation?eid=77372). If you do please send me a message so I can add you as a contributor.

## [Contributors](https://github.com/aadsm/jsmediatags/blob/master/CONTRIBUTORS.md)

## [Contributing](https://github.com/aadsm/jsmediatags/blob/master/CONTRIBUTING.md)

## Current Support

* File Readers
  * Uint8Array
* Tag Readers
  * ID3v1
  * ID3v2 (with unsynchronisation support!)
  * MP4
  * FLAC

## Documentation

### The Output
This is an example of the object returned from the `MediaTags.decode`.

#### ID3v2
```javascript
{
  type: "ID3",
  version: "2.4.0",
  major: 4,
  revision: 0,
  tags: {
    artist: "Sam, The Kid",
    album: "Pratica(mente)",
    track: "12",
    TPE1: {
      id: "TPE1",
      size: 14,
      description: "Lead performer(s)/Soloist(s)",
      data: "Sam, The Kid"
    },
    TALB: {
      id: "TALB",
      size: 16,
      description: "Album/Movie/Show title",
      data: "Pratica(mente)"
    },
    TRCK: {
      id: "TRCK",
      size: 3,
      description: "Track number/Position in set",
      data: "12",
    }
  },
  size: 34423,
  flags: {
    unsynchronisation: false,
    extended_header: false,
    experimental_indicator: false,
    footer_present: false
  }
}
```

#### MP4 (not supported yet)
```javascript
{
  type: "MP4",
  ftyp: "M4A",
  version: 0,
  tags: {
    "©too": {
      id: "©too",
      size: 35,
      description: 'Encoding Tool',
      data: 'Lavf53.24.2'
    }
  }
}
```

#### FLAC (not supported yet)
```javascript
{
  type: "FLAC",
  version: "1",
  tags: {
    title: "16/12/95",
    artist: "Sam, The Kid",
    album: "Pratica(mente)",
    track: "12",
    picture: ...
  }
}
```

### Shortcuts

These are the supported shortcuts.

* `title`
* `artist`
* `album`
* `year`
* `comment`
* `track`
* `genre`
* `picture`
* `lyrics`