function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import AES256 from './alchera_aes256.js';
export class AlcheraAES256 {
  constructor(resourceURL) {
    var _this = this;
    _defineProperty(this, "sdk", null);
    _defineProperty(this, "loaded", false);
    _defineProperty(this, "isLoaded", () => {
      return this.loaded;
    });
    _defineProperty(this, "encrypt", function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!_this.sdk) throw new Error('encrypt sdk is not exist');
      return _this.sdk.encrypt(value);
    });
    _defineProperty(this, "decrypt", function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!_this.sdk) throw new Error('encrypt sdk is not exist');
      return _this.sdk.decrypt(value);
    });
    this.init(resourceURL);
  }
  init(resourceURL) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      void 0;
      try {
        // @ts-ignore
        var module = yield AES256({
          locateFile: function locateFile(path) {
            //sample implementation
            var baseURL = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            var isDefault = typeof resourceURL === 'undefined' || !resourceURL;
            var defaultPath = baseURL + '/' + path;
            if (isDefault) return defaultPath;
            if (!resourceURL.endsWith('/')) {
              resourceURL = resourceURL + '/';
            }
            return resourceURL + path;
          }
        });
        _this2.sdk = module.AES256.getInstance();
        _this2.loaded = true;
        void 0;
      } catch (error) {
        void 0;
      }
    })();
  }
  release() {
    if (!this.sdk) throw new Error('encrypt sdk is not exist');
    this.sdk.releaseInstance();
  }
  get version() {
    return 'v1.0.4';
  }
}