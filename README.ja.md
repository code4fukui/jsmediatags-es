# jsmediatags-es

[
![deno module](https://shield.deno.dev/x/jsmediatags_es)
](https://deno.land/x/jsmediatags_es)

`jsmediatags-es`は、人気のある[jsmediatags](https://github.com/aadsm/jsmediatags)ライブラリの**ES Module版**で、**Deno**や**モダンブラウザ**などの環境に最適化されています。[browser-id3-writer](https://github.com/code4fukui/browser-id3-writer)の書き込み機能を統合し、MP3ファイルの**ID3v1/ID3v2タグの読み書き**を行うためのシンプルなAPIを提供します。

---

## デモ

実際の動作はライブデモでお試しください: **[jsmediatags-es Demo](https://code4fukui.github.io/jsmediatags-es/)**

---

## 機能

-   ✅ **ID3タグの読み書き**: 既存のID3v1/ID3v2タグをデコードし、新しいタグまたは変更されたタグをファイルにエンコードして書き戻します。
-   🚀 **ES Moduleネイティブ**: `import`を使用してDenoやモダンブラウザで直接利用可能。ビルドステップは不要です。
-   ✨ **シンプルなAPI**: `MediaTags.decode()`と`MediaTags.encode()`の2つの主要メソッドを持つ、クリーンなPromiseベースのAPI。
-   📦 **純粋なJavaScript**: サーバーサイドの依存関係は不要です。完全にクライアントサイドで動作します。
-   🏷️ **ショートカットサポート**: `title`、`artist`、`album`、`picture`、`lyrics`などの一般的なタグに簡単にアクセスして変更可能。

---

## 使い方

このライブラリは`Uint8Array`データで動作するように設計されており、Denoとブラウザの両方のファイル読み込みAPIと互換性があります。

### Deno

#### タグの読み込み（デコード）

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

#### タグの書き込み（エンコード）

この例では、いくつかの一般的なタグに新しい値を書き込みます。

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

#### 読み込み・変更・書き込み

既存のタグを読み込み、変更（カバーアートや歌詞を含む）を加えて、結果を保存する完全な例です。

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

### ブラウザ

`<input type="file">`を使用して、ブラウザで直接`jsmediatags-es`を利用できます。

#### ファイル入力からタグを読み込み

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

## APIリファレンス

### `MediaTags.decode(data)`

MP3ファイルのバイナリデータからID3タグを非同期にデコードします。

-   **`data`** (`Uint8Array`): MP3ファイルのバイナリコンテンツ。
-   **戻り値**: `Promise<object>` タグオブジェクトを解決（resolve）するPromise。

### `MediaTags.encode(data, tags)`

MP3ファイルのバイナリデータに、新しいタグまたは変更されたタグを非同期にエンコードします。

-   **`data`** (`Uint8Array`): 元のMP3ファイルのバイナリコンテンツ。
-   **`tags`** (`object`): 書き込むタグを含むオブジェクト。`decode`で返された完全なオブジェクト、またはショートカットキー（`title`、`artist`など）を持つシンプルなオブジェクトのいずれかを指定できます。
-   **戻り値**: `Promise<Uint8Array>` 更新されたタグを含む新しいバイナリコンテンツを解決（resolve）するPromise。

### タグ構造

デコードとエンコードの両方において、`tags`オブジェクトは一般的なフレームに対してシンプルなキーと値のペアを使用します。

**エンコード用のシンプルなオブジェクト:**

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

## 謝辞

このライブラリは、以下の2つの素晴らしいプロジェクトの力を組み合わせたモダンなESMラッパーです:

-   **タグの読み込み**: António Afonso、Jacob Seidelin、および貢献者による[jsmediatags](https://github.com/aadsm/jsmediatags)。
-   **タグの書き込み**: code4fukuiによる[browser-id3-writer](https://github.com/code4fukui/browser-id3-writer)。

## ライセンス

このプロジェクトはBSD-3-Clauseライセンスの下で提供されています。詳細なライセンス情報はオリジナルの`package.json`を参照してください。
