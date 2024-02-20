function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */

/* global-module */
class ObjectUtil {
  constructor() {
    _defineProperty(this, "objectDeepMerge", (target, source) => {
      for (var key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], this.objectDeepMerge(target[key], source[key]) // 재귀
        );
      }

      Object.assign(target || {}, source);
      return target;
    });
  }
  stringToJson(str) {
    var obj = {};
    var keyValuePairs = str.match(/\w+:(?:\([^)]*\)|[^;]+)/g);
    if (keyValuePairs) {
      for (var i = 0; i < keyValuePairs.length; i++) {
        var pair = keyValuePairs[i].split(':');
        var key = pair[0].trim();
        var value = pair.slice(1).join(':').trim();
        if (value.startsWith('(') && value.endsWith(')')) {
          var subStr = value.substring(1, value.length - 1); // 서브 문자열 추출
          var subObj = this.stringToJson(subStr); // 재귀적으로 서브 오브젝트 변환
          obj[key] = subObj;
        } else {
          obj[key] = value;
        }
      }
    }
    return obj;
  }
  getObjectValueWithDot(obj, key) {
    if (obj) {
      if (key.split('.').length === 1) {
        return obj[key];
      }
      var tmpKey = key.split('.')[0];
      var tmpKey2 = key.slice(tmpKey.length + 1, key.length);
      return this.getObjectValueWithDot(obj[tmpKey], tmpKey2); // 재귀
    }
  }

  makeObjectWithDot(obj, key, value) {
    var mainKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var tmpKey = key.split('.')[0];
    if (key.split('.').length === 1) {
      obj[key] = value;
      return mainKey === null ? tmpKey : mainKey;
    }
    var tmpKey2 = key.slice(tmpKey.length + 1, key.length);

    // make object for key
    obj[tmpKey] = {};
    return this.makeObjectWithDot(obj[tmpKey], tmpKey2, value, tmpKey); // 재귀
  }
}

export default new ObjectUtil();