function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */
import Compressor from '../lib/compressor.esm.js';

/* global-module */
class ImageUtil {
  constructor() {
    _defineProperty(this, "__imageCompressor", (source, options) => {
      return new Promise((resolve, reject) => {
        var opt = {
          maxWidth: options.maxWidth,
          maxHeight: options.maxHeight,
          convertSize: options.convertSize,
          // 이 용량을 초과하는 이미지는 JPEG 확장자로 변환되며 용량이 90% 수준으로 압축됨.
          quality: options.quality,
          success: function success(compressedImage) {
            resolve(compressedImage);
          },
          error: function error(err) {
            void 0;
            reject(err);
          }
        };
        new Compressor(source, opt);
      });
    });
  }
  compressImage(blobFile, options) {
    var _arguments = arguments,
      _this = this;
    return _asyncToGenerator(function* () {
      var constantNumber = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : 0.12;
      if (blobFile.size <= options.targetCompressVolume) {
        void 0;
        return blobFile;
      }
      var stopped = false;
      var count = 0;
      var compressedImage;
      var targetCompressionRatio = Math.round(options.targetCompressVolume / blobFile.size * 100) / 100;
      var startQuality = targetCompressionRatio + constantNumber; // 상수값을 더해주는 이유: 과도하게 압축되는 것을 보정하는 수치. (클수록 압축률 떨어지고 이미지 품질은 좋아짐.)
      startQuality = startQuality > 0.8 ? 0.8 : startQuality;
      options.quality = startQuality;
      void 0;
      void 0;
      while (!stopped) {
        count++;
        compressedImage = yield _this.__imageCompressor(blobFile, options);
        void 0;
        var compressionRatio = Math.round((1 - compressedImage.size / blobFile.size) * 10000) / 100;
        void 0;
        if (compressedImage.size < options.targetCompressVolume) {
          stopped = true;
        } else {
          options.quality = Math.round((options.quality - 0.1) * 100) / 100;
        }
      }
      return compressedImage;
    })();
  }
}
export default new ImageUtil();