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
  csvToObject(str) {
    var pairs = str.split(';');
    var obj = {};
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split(':');
      if (pair.length === 2) obj[pair[0]] = pair[1];
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy9vYmplY3QtdXRpbC5qcyIsIm5hbWVzIjpbIk9iamVjdFV0aWwiLCJjb25zdHJ1Y3RvciIsIl9kZWZpbmVQcm9wZXJ0eSIsInRhcmdldCIsInNvdXJjZSIsImtleSIsIk9iamVjdCIsImtleXMiLCJhc3NpZ24iLCJvYmplY3REZWVwTWVyZ2UiLCJjc3ZUb09iamVjdCIsInN0ciIsInBhaXJzIiwic3BsaXQiLCJvYmoiLCJpIiwibGVuZ3RoIiwicGFpciIsImdldE9iamVjdFZhbHVlV2l0aERvdCIsInRtcEtleSIsInRtcEtleTIiLCJzbGljZSIsIm1ha2VPYmplY3RXaXRoRG90IiwidmFsdWUiLCJtYWluS2V5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIl0sInNvdXJjZXMiOlsiaGVscGVycy9vYmplY3QtdXRpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vKiBnbG9iYWwtbW9kdWxlICovXG5jbGFzcyBPYmplY3RVdGlsIHtcbiAgY3N2VG9PYmplY3Qoc3RyKSB7XG4gICAgbGV0IHBhaXJzID0gc3RyLnNwbGl0KCc7Jyk7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJzonKTtcbiAgICAgIGlmIChwYWlyLmxlbmd0aCA9PT0gMikgb2JqW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBnZXRPYmplY3RWYWx1ZVdpdGhEb3Qob2JqLCBrZXkpIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBpZiAoa2V5LnNwbGl0KCcuJykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRtcEtleSA9IGtleS5zcGxpdCgnLicpWzBdO1xuICAgICAgY29uc3QgdG1wS2V5MiA9IGtleS5zbGljZSh0bXBLZXkubGVuZ3RoICsgMSwga2V5Lmxlbmd0aCk7XG4gICAgICByZXR1cm4gdGhpcy5nZXRPYmplY3RWYWx1ZVdpdGhEb3Qob2JqW3RtcEtleV0sIHRtcEtleTIpOyAvLyDsnqzqt4BcbiAgICB9XG4gIH1cblxuICBtYWtlT2JqZWN0V2l0aERvdChvYmosIGtleSwgdmFsdWUsIG1haW5LZXkgPSBudWxsKSB7XG4gICAgY29uc3QgdG1wS2V5ID0ga2V5LnNwbGl0KCcuJylbMF07XG4gICAgaWYgKGtleS5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiBtYWluS2V5ID09PSBudWxsID8gdG1wS2V5IDogbWFpbktleTtcbiAgICB9XG4gICAgY29uc3QgdG1wS2V5MiA9IGtleS5zbGljZSh0bXBLZXkubGVuZ3RoICsgMSwga2V5Lmxlbmd0aCk7XG5cbiAgICAvLyBtYWtlIG9iamVjdCBmb3Iga2V5XG4gICAgb2JqW3RtcEtleV0gPSB7fTtcbiAgICByZXR1cm4gdGhpcy5tYWtlT2JqZWN0V2l0aERvdChvYmpbdG1wS2V5XSwgdG1wS2V5MiwgdmFsdWUsIHRtcEtleSk7IC8vIOyerOq3gFxuICB9XG5cbiAgb2JqZWN0RGVlcE1lcmdlID0gKHRhcmdldCwgc291cmNlKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcbiAgICAgIGlmIChzb3VyY2Vba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkgT2JqZWN0LmFzc2lnbihzb3VyY2Vba2V5XSwgdGhpcy5vYmplY3REZWVwTWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKSAvLyDsnqzqt4BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQgfHwge30sIHNvdXJjZSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBPYmplY3RVdGlsKCk7Il0sIm1hcHBpbmdz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
