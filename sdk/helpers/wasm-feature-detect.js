function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* eslint-disable */
export var bigInt = () => function () {
    var _ref = _asyncToGenerator(function* (e) {
      try {
        return (yield WebAssembly.instantiate(e)).instance.exports.b(BigInt(0)) === BigInt(0);
      } catch (e) {
        return !1;
      }
    });
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 126, 1, 126, 3, 2, 1, 0, 7, 5, 1, 1, 98, 0, 0, 10, 6, 1, 4, 0, 32, 0, 11])),
  bulkMemory = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11]));
    });
    return function bulkMemory() {
      return _ref2.apply(this, arguments);
    };
  }(),
  exceptions = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 6, 64, 25, 11, 11]));
    });
    return function exceptions() {
      return _ref3.apply(this, arguments);
    };
  }(),
  multiValue = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 0, 2, 127, 127, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 65, 0, 11]));
    });
    return function multiValue() {
      return _ref4.apply(this, arguments);
    };
  }(),
  mutableGlobals = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1]));
    });
    return function mutableGlobals() {
      return _ref5.apply(this, arguments);
    };
  }(),
  referenceTypes = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11]));
    });
    return function referenceTypes() {
      return _ref6.apply(this, arguments);
    };
  }(),
  saturatedFloatToInt = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11]));
    });
    return function saturatedFloatToInt() {
      return _ref7.apply(this, arguments);
    };
  }(),
  signExtensions = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11]));
    });
    return function signExtensions() {
      return _ref8.apply(this, arguments);
    };
  }(),
  simd = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
    });
    return function simd() {
      return _ref9.apply(this, arguments);
    };
  }(),
  tailCall = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(function* () {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 6, 1, 4, 0, 18, 0, 11]));
    });
    return function tailCall() {
      return _ref10.apply(this, arguments);
    };
  }(),
  threads = () => function () {
    var _ref11 = _asyncToGenerator(function* (e) {
      try {
        return 'undefined' != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
      } catch (e) {
        return !1;
      }
    });
    return function (_x2) {
      return _ref11.apply(this, arguments);
    };
  }()(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11])),
  isSupportWasm = () => {
    try {
      if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
        var module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
        if (module instanceof WebAssembly.Module) return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
      }
    } catch (e) {
      return false;
    }
    return false;
  },
  measure = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(function* () {
      var TRY_COUNT = 5;
      var SLEEP = 100;
      var durationSum = 0;
      var durationList = [];
      var performanceSum = 0;
      var performanceList = [];
      var measureReport = '';
      var latencyPer100ms = -1;
      var durationAvg = -1;
      var latency = -1;
      try {
        var __sleep = ms => {
          return new Promise(resolve => setTimeout(resolve, ms));
        };
        for (var i = 0; i < TRY_COUNT; i++) {
          var t1 = performance.now();
          for (var j = 0; j < 1000000; j++) {
            var jj = Math.sqrt(j);
          }
          yield __sleep(SLEEP);
          var t2 = performance.now();
          var duration = t2 - t1;
          performanceList.push(t2);
          durationList.push(duration);
          durationSum += duration;
          performanceSum += t2;
        }
        latency = performanceList[0] - SLEEP;
        durationAvg = durationSum / TRY_COUNT;
        latencyPer100ms = parseFloat((durationAvg - 100).toFixed(5));
        measureReport += "==============================\n";
        measureReport += "- latency : ".concat(latency, "\n");
        measureReport += "- latencyPer100ms: ".concat(latencyPer100ms, "\n");
        measureReport += "------------------------------\n";
        measureReport += "- duration avg: ".concat(durationAvg, "\n");
        measureReport += "- duration sum: ".concat(durationSum, "\n");
        measureReport += "- performance sum: ".concat(performanceSum, "\n");
        measureReport += "------------------------------\n";
        var durationDetail = '';
        var performanceDetail = '';
        for (var idx in durationList) {
          var num = Number(idx) + 1;
          durationDetail += "- duration ".concat(num, " : ").concat(durationList[idx], "\n");
          performanceDetail += "- performance ".concat(num, " : ").concat(performanceList[idx], "\n");
        }
        measureReport += durationDetail;
        measureReport += "------------------------------\n";
        measureReport += performanceDetail;
        measureReport += "==============================\n";
      } catch (e) {
        measureReport = "error : ".concat(e === null || e === void 0 ? void 0 : e.toString());
      }
      return [latencyPer100ms, measureReport];
    });
    return function measure() {
      return _ref12.apply(this, arguments);
    };
  }();