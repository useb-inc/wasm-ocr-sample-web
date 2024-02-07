function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */

/* global-module */
import objectUtil from './object-util.js';
class OcrResultParser {
  constructor() {
    _defineProperty(this, "__ocrTypeList", ['idcard', 'driver', 'passport', 'foreign-passport', 'alien', 'alien-back', 'credit', 'idcard-ssa', 'driver-ssa', 'passport-ssa', 'foreign-passport-ssa', 'alien-ssa', 'credit-ssa']);
  }
  parseOcrResult(ocrType, ssaMode, ocrResult, ssaResult, ssaRetryCount, ssaResultList, ssaRetryType, ssaRetryPivot) {
    if (!this.__ocrTypeList.includes(ocrType)) throw new Error('ResultParser :: Unsupported OCR type');
    var legacyFormat = {};
    var newFormat = {};

    // SSA 처리
    if (ssaMode && !!ssaResult) {
      this.__parseSsaResult(ssaRetryType, ssaRetryPivot, ssaResult, ssaRetryCount, ssaResultList, ocrResult, legacyFormat);
    }
    switch (ocrType) {
      case 'idcard':
      case 'driver':
      case 'idcard-ssa':
      case 'driver-ssa':
        this.__parseIdDriver(ocrResult, legacyFormat);
        break;
      case 'passport':
      case 'passport-ssa':
      case 'foreign-passport':
      case 'foreign-passport-ssa':
        this.__parsePassport(ocrResult, legacyFormat);
        break;
      case 'alien':
      case 'alien-ssa':
        this.__parseAlien(ocrResult, legacyFormat);
        break;
      case 'alien-back':
        legacyFormat = _objectSpread({}, ocrResult);
        break;
      case 'credit':
        [legacyFormat, ocrResult] = this.__parseCredit(ocrResult, legacyFormat);
        break;
      default:
        throw new Error('Unsupported OCR type');
    }
    return {
      legacyFormat,
      newFormat: ocrResult
    };
  }

  // prettier-ignore
  __parseSsaResult(ssaRetryType, ssaRetryPivot, ssaResult, ssaRetryCount, ssaResultList, ocrResult, legacyFormat) {
    var ssaResultObj = objectUtil.csvToObject(ssaResult);
    ocrResult.fd_confidence = ssaResultObj.conf;
    ocrResult.id_truth = ssaResultObj.truth;
    ocrResult.id_truth_retry_count = ssaRetryCount;
    if (ssaResultList && ssaRetryCount > 0) {
      var truthResultDetail = [];
      for (var item of ssaResultList) {
        var tmpObj = objectUtil.csvToObject(item);
        var truthResult = {
          id_truth: tmpObj.truth,
          fd_confidence: tmpObj.conf
        }; // prettier-ignore
        truthResultDetail.push(truthResult);
      }
      ocrResult.id_truth_result_detail = truthResultDetail;
      if (ssaRetryType === 'ENSEMBLE') {
        var average = list => {
          var sum = list.map(el => Math.abs(ssaRetryPivot - el.fd_confidence)).reduce((acc, cur) => cur + acc, 0);
          if (isNaN(sum / list.length)) return Number.MAX_SAFE_INTEGER;
          return sum / list.length;
        };
        var fakeList = [];
        var realList = [];
        ocrResult.id_truth_result_detail.forEach(el => {
          if (el.id_truth === "FAKE") fakeList.push(el);
          if (el.id_truth === "REAL") realList.push(el);
        });
        var f_avg = average(fakeList); // fake 평균값
        var r_avg = average(realList); // real 평균값

        var f_abs = Math.abs(ssaRetryPivot - f_avg);
        var r_abs = Math.abs(ssaRetryPivot - r_avg);

        // real 에 더 근접함
        if (r_abs - f_abs < 0) ocrResult.id_truth = "REAL";
        // fake 에 더 근접하거나 같다면 FAKE
        if (f_abs - r_abs < 0 || r_abs - f_abs === 0) ocrResult.id_truth = "FAKE";
      }
    }
    var keyMapSsaResult = {
      truth: 'id_truth',
      truthConfidence: 'fd_confidence',
      truthRetryCount: 'id_truth_retry_count',
      truthResultDetail: 'id_truth_result_detail'
    };
    this.__convertLegacyFormat(ocrResult, legacyFormat, keyMapSsaResult);
    if (ssaResultList && ssaRetryCount > 0) {
      var tmpResultDetail = [];
      for (var idx in legacyFormat.truthResultDetail) {
        var keyMapSsaResultDetail = {
          truth: 'id_truth',
          truthConfidence: 'fd_confidence'
        };
        var detailLegacyFormat = {};
        this.__convertLegacyFormat(legacyFormat.truthResultDetail[idx], detailLegacyFormat, keyMapSsaResultDetail);
        tmpResultDetail.push(detailLegacyFormat);
      }
      legacyFormat.truthResultDetail = tmpResultDetail;
    }
  }
  __csvToObject(str) {
    var pairs = str.split(';');
    var obj = {};
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split(':');
      if (pair.length === 2) obj[pair[0]] = pair[1];
    }
    return obj;
  }
  __convertLegacyFormat(obj, legacyFormat, map) {
    for (var key in map) {
      legacyFormat[key] = typeof obj[map[key]] === 'object' ? _objectSpread({}, obj[map[key]]) : obj[map[key]];
    }
    return legacyFormat;
  }
  __getObjectValueWithDot(obj, key) {
    if (obj) {
      if (key.split('.').length === 1) {
        return obj[key];
      }
      var tmpKey = key.split('.')[0];
      var tmpKey2 = key.slice(tmpKey.length + 1, key.length);
      return this.__getObjectValueWithDot(obj[tmpKey], tmpKey2);
    }
  }
  __parseIdDriver(ocrResult, legacyFormat) {
    // 주민번호 형식 리턴값 형식 변경
    // birth 추가
    if (ocrResult.masked_jumin) {
      // 암호화 된 경우 대응
      ocrResult.birth = ocrResult.masked_jumin.slice(0, 6);
      if (ocrResult.masked_jumin !== undefined && ocrResult.masked_jumin.length === 13) {
        ocrResult.masked_jumin = ocrResult.masked_jumin.slice(0, 6) + '-' + ocrResult.masked_jumin.slice(6, 13);
      } else {
        ocrResult.masked_jumin = '';
      }
      if (ocrResult.result_scan_type === '2') {
        // 구형 면허증 포멧 판정 (ex: 제주 13-001234-12 -> true)
        var regex = /[가-힣]/g;
        ocrResult.is_old_format_driver_number = !!ocrResult.masked_driver_number.match(regex);

        // TODO : 암호화 된값에서는 처리할 수 없고, 마스킹된 운전면허번호에 ' '가 없어 처리 할 수 없음.
        // if (ocrResult.is_old_format_driver_number) {
        //   // useb api 포멧에 맞게 변경 (to: 제주-13-001234-12)
        //   ocrResult.masked_driver_number = ocrResult.masked_driver_number.replace(' ', '-');
        // }
      }
    } else {
      // 일반(평문) 시나리오
      ocrResult.birth = ocrResult.jumin.slice(0, 6);
      if (ocrResult.jumin !== undefined && ocrResult.jumin.length === 13) {
        ocrResult.jumin = ocrResult.jumin.slice(0, 6) + '-' + ocrResult.jumin.slice(6, 13);
      } else {
        ocrResult.jumin = '';
      }
      if (ocrResult.result_scan_type === '2') {
        // 구형 면허증 포멧 판정 (ex: 제주 13-001234-12 -> true)
        var _regex = /[가-힣]/g;
        ocrResult.is_old_format_driver_number = !!ocrResult.driver_number.match(_regex);
        if (ocrResult.is_old_format_driver_number) {
          // useb api 포멧에 맞게 변경 (to: 제주-13-001234-12)
          ocrResult.driver_number = ocrResult.driver_number.replace(' ', '-');
        }
      }
    }
    var keyMapIdDriver = {
      Completed: 'complete',
      type: 'result_scan_type',
      name: 'name',
      number: 'jumin',
      Date: 'issued_date',
      region: 'region',
      licenseNumber: 'driver_number',
      isOldFormatLicenseNumber: 'is_old_format_driver_number',
      serial: 'driver_serial',
      licenseType: 'driver_type',
      color_point: 'color_point',
      face_score: 'found_face',
      specular: 'specular_ratio',
      start_t: 'start_time',
      end_t: 'end_time',
      id_type: 'result_scan_type'
    };
    this.__convertLegacyFormat(ocrResult, legacyFormat, keyMapIdDriver);
  }
  __parsePassport(ocrResult, legacyFormat) {
    // 주민번호 형식 리턴값 형식 변경
    if (ocrResult.jumin !== undefined && ocrResult.jumin.length === 13) {
      ocrResult.jumin = ocrResult.jumin.slice(0, 6) + '-' + ocrResult.jumin.slice(6, 13);
    } else {
      ocrResult.jumin = '';
    }
    var keyMapPassport = {
      Completed: 'complete',
      name: 'name',
      surName: 'sur_name',
      givenName: 'given_name',
      type: 'passport_type',
      issuing_country: 'issuing_country',
      passport_no: 'passport_number',
      nationality: 'nationality',
      date_of_issue: 'issued_date',
      sex: 'sex',
      date_of_expiry: 'expiry_date',
      personal_no: 'personal_number',
      number: 'jumin',
      date_of_birth: 'birthday',
      name_kor: 'name_kor',
      mrz1: 'mrz1',
      mrz2: 'mrz2',
      color_point: 'color_point',
      face_score: 'found_face',
      specular: 'specular_ratio',
      start_t: 'start_time',
      end_t: 'end_time',
      id_type: 'result_scan_type'
    };
    this.__convertLegacyFormat(ocrResult, legacyFormat, keyMapPassport);
  }
  __parseAlien(ocrResult, legacyFormat) {
    // 주민번호 형식 리턴값 형식 변경
    if (ocrResult.jumin !== undefined && ocrResult.jumin.length === 13) {
      ocrResult.jumin = ocrResult.jumin.slice(0, 6) + '-' + ocrResult.jumin.slice(6, 13);
    } else {
      ocrResult.jumin = '';
    }
    var keyMapAlien = {
      Completed: 'complete',
      name: 'name',
      number: 'jumin',
      Date: 'issued_date',
      nationality: 'nationality',
      visaType: 'visa_type',
      name_kor: 'name_kor',
      color_point: 'color_point',
      face_score: 'found_face',
      specular: 'specular_ratio',
      start_t: 'start_time',
      end_t: 'end_time',
      id_type: 'result_scan_type'
    };
    this.__convertLegacyFormat(ocrResult, legacyFormat, keyMapAlien);
  }
  __parseCredit(ocrResult, legacyFormat) {
    var resultSplit = ocrResult.split(',');
    var resultIndex = 0;
    if (resultIndex < resultSplit.length) legacyFormat.Completed = resultSplit[resultIndex], resultIndex++;
    if (resultIndex < resultSplit.length) legacyFormat.number = resultSplit[resultIndex], resultIndex++;
    if (resultIndex < resultSplit.length) legacyFormat.exp_date = resultSplit[resultIndex], resultIndex++;
    return [legacyFormat, legacyFormat];
  }
}
export default new OcrResultParser();