# jsmediatags-es

- [jsmediatags-es](https://code4fukui.github.io/jsmediatags-es/) は、MP3、MP4(未対応)、FLAC(未対応)ファイルのID3タグ(ID3v1、ID3v2、AAC)を読み書きするためのJavaScriptライブラリです。
- [jsmediatags](https://github.com/aadsm/jsmediatags)のJavaScript/ESモジュールバージョンです。
- [browser-id3-writer](https://github.com/code4fukui/browser-id3-writer)を使ってMediaTagsの書き込みが可能です。

## 使い方

### 読み取り

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = await MediaTags.decode(bin);
console.log(tags);
```

### 書き込み

```javascript
import { MediaTags } from "https://code4fukui.github.io/jsmediatags-es/MediaTags.js";

const bin = await Deno.readFile("./music-file.mp3");
const tags = { title: "new_title", artist: "new_artist", album: "new_album", genre: "Rock" };
const bin2 = await MediaTags.encode(bin, tags);
await Deno.writeFile("./music-file_dst.mp3", bin2);
```
- ジャンル: [genre-id3v1.csv](genre-id3v1.csv)

## 寄付

寄付については、"Girls Who Code" NPOに寄付することを検討してください。寄付した場合はメッセージを送ってくださると、contributorとして追加させていただきます。

## [貢献者](https://github.com/aadsm/jsmediatags/blob/master/CONTRIBUTORS.md)

## [貢献方法](https://github.com/aadsm/jsmediatags/blob/master/CONTRIBUTING.md)

## 現在のサポート

* ファイルリーダー
  * Uint8Array
* タグリーダー
  * ID3v1
  * ID3v2 (非同期化サポート付き!)
  * MP4
  * FLAC