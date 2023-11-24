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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy9pbWFnZS11dGlsLmpzIiwibmFtZXMiOlsiQ29tcHJlc3NvciIsIkltYWdlVXRpbCIsImNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnR5Iiwic291cmNlIiwib3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib3B0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJjb252ZXJ0U2l6ZSIsInF1YWxpdHkiLCJzdWNjZXNzIiwiY29tcHJlc3NlZEltYWdlIiwiZXJyb3IiLCJlcnIiLCJjb21wcmVzc0ltYWdlIiwiYmxvYkZpbGUiLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwiX3RoaXMiLCJfYXN5bmNUb0dlbmVyYXRvciIsImNvbnN0YW50TnVtYmVyIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic2l6ZSIsInRhcmdldENvbXByZXNzVm9sdW1lIiwic3RvcHBlZCIsImNvdW50IiwidGFyZ2V0Q29tcHJlc3Npb25SYXRpbyIsIk1hdGgiLCJyb3VuZCIsInN0YXJ0UXVhbGl0eSIsIl9faW1hZ2VDb21wcmVzc29yIiwiY29tcHJlc3Npb25SYXRpbyJdLCJzb3VyY2VzIjpbImhlbHBlcnMvaW1hZ2UtdXRpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IENvbXByZXNzb3IgZnJvbSAnLi4vbGliL2NvbXByZXNzb3IuZXNtLmpzJztcblxuLyogZ2xvYmFsLW1vZHVsZSAqL1xuY2xhc3MgSW1hZ2VVdGlsIHtcbiAgYXN5bmMgY29tcHJlc3NJbWFnZShibG9iRmlsZSwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIgPSAwLjEyKSB7XG4gICAgaWYgKGJsb2JGaWxlLnNpemUgPD0gb3B0aW9ucy50YXJnZXRDb21wcmVzc1ZvbHVtZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgcmV0dXJuIGJsb2JGaWxlO1xuICAgIH1cbiAgICBsZXQgc3RvcHBlZCA9IGZhbHNlO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgbGV0IGNvbXByZXNzZWRJbWFnZTtcbiAgICBjb25zdCB0YXJnZXRDb21wcmVzc2lvblJhdGlvID0gTWF0aC5yb3VuZChvcHRpb25zLnRhcmdldENvbXByZXNzVm9sdW1lIC8gYmxvYkZpbGUuc2l6ZSAqIDEwMCkgLyAxMDA7XG4gICAgbGV0IHN0YXJ0UXVhbGl0eSA9IHRhcmdldENvbXByZXNzaW9uUmF0aW8gKyBjb25zdGFudE51bWJlcjsgLy8g7IOB7IiY6rCS7J2EIOuNlO2VtOyjvOuKlCDsnbTsnKA6IOqzvOuPhO2VmOqyjCDslZXstpXrkJjripQg6rKD7J2EIOuztOygle2VmOuKlCDsiJjsuZguICjtgbTsiJjroZ0g7JWV7LaV66WgIOuWqOyWtOyngOqzoCDsnbTrr7jsp4Ag7ZKI7KeI7J2AIOyii+yVhOynkC4pXG4gICAgc3RhcnRRdWFsaXR5ID0gc3RhcnRRdWFsaXR5ID4gMC44ID8gMC44IDogc3RhcnRRdWFsaXR5O1xuICAgIG9wdGlvbnMucXVhbGl0eSA9IHN0YXJ0UXVhbGl0eTtcbiAgICB2b2lkIDA7XG4gICAgdm9pZCAwO1xuICAgIHdoaWxlICghc3RvcHBlZCkge1xuICAgICAgY291bnQrKztcbiAgICAgIGNvbXByZXNzZWRJbWFnZSA9IGF3YWl0IHRoaXMuX19pbWFnZUNvbXByZXNzb3IoYmxvYkZpbGUsIG9wdGlvbnMpO1xuICAgICAgdm9pZCAwO1xuICAgICAgY29uc3QgY29tcHJlc3Npb25SYXRpbyA9IE1hdGgucm91bmQoKDEgLSBjb21wcmVzc2VkSW1hZ2Uuc2l6ZSAvIGJsb2JGaWxlLnNpemUpICogMTAwMDApIC8gMTAwO1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKGNvbXByZXNzZWRJbWFnZS5zaXplIDwgb3B0aW9ucy50YXJnZXRDb21wcmVzc1ZvbHVtZSkge1xuICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMucXVhbGl0eSA9IE1hdGgucm91bmQoKG9wdGlvbnMucXVhbGl0eSAtIDAuMSkgKiAxMDApIC8gMTAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcHJlc3NlZEltYWdlO1xuICB9XG4gIF9faW1hZ2VDb21wcmVzc29yID0gKHNvdXJjZSwgb3B0aW9ucykgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHQgPSB7XG4gICAgICAgIG1heFdpZHRoOiBvcHRpb25zLm1heFdpZHRoLFxuICAgICAgICBtYXhIZWlnaHQ6IG9wdGlvbnMubWF4SGVpZ2h0LFxuICAgICAgICBjb252ZXJ0U2l6ZTogb3B0aW9ucy5jb252ZXJ0U2l6ZSxcbiAgICAgICAgLy8g7J20IOyaqeufieydhCDstIjqs7ztlZjripQg7J2066+47KeA64qUIEpQRUcg7ZmV7J6l7J6Q66GcIOuzgO2ZmOuQmOupsCDsmqnrn4nsnbQgOTAlIOyImOykgOycvOuhnCDslZXstpXrkKguXG4gICAgICAgIHF1YWxpdHk6IG9wdGlvbnMucXVhbGl0eSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGNvbXByZXNzZWRJbWFnZSkge1xuICAgICAgICAgIHJlc29sdmUoY29tcHJlc3NlZEltYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBuZXcgQ29tcHJlc3Nvcihzb3VyY2UsIG9wdCk7XG4gICAgfSk7XG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgSW1hZ2VVdGlsKCk7Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsT0FBT0EsVUFBVSxNQUFNLDBCQUEwQjs7QUFFakQ7QUFDQSxNQUFNQyxTQUFTLENBQUM7RUFBQUMsWUFBQTtJQUFBQyxlQUFBLDRCQTZCTSxDQUFDQyxNQUFNLEVBQUVDLE9BQU8sS0FBSztNQUN2QyxPQUFPLElBQUlDLE9BQU8sQ0FBQyxDQUFDQyxPQUFP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
