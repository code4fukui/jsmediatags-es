/**
 * @flow
 */

import { MediaFileReader } from './MediaFileReader.js';

/*
import type {
  Byte,
  ByteArray,
  LoadCallbackType
} from './FlowTypes';
*/

export class ArrayFileReader extends MediaFileReader {
  _array;
  _size;

  constructor(array) {
    super();
    this._array = array;
    this._size = array.length;
    this._isInitialized = true;
  }

  static canReadFile(file) { // -> boolean
    return (
      Array.isArray(file) ||
      //(typeof Buffer === 'function' && Buffer.isBuffer(file))
      file instanceof Uint8Array
    );
  }

  init(callbacks) { // : LoadCallbackType
    setTimeout(callbacks.onSuccess, 0);
  }

  loadRange(range, callbacks) { // : [number, number], LoadCallbackType
    setTimeout(callbacks.onSuccess, 0);
  }

  getByteAt(offset) { // number -> Byte
    if (offset >= this._array.length) {
      throw new Error("Offset " + offset + " hasn't been loaded yet.");
    }
    return this._array[offset];
  }
}
