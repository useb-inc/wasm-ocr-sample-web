function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */

/* global-module */
import objectUtil from './object-util.js';
import { OCRError } from '../ocr.js';
class OcrResultParser {
  constructor() {
    _defineProperty(this, "__ocrTypeList", ['idcard', 'driver', 'passport', 'foreign-passport', 'alien', 'alien-back', 'veteran', 'credit', 'idcard-ssa', 'driver-ssa', 'passport-ssa', 'foreign-passport-ssa', 'alien-ssa', 'veteran-ssa', 'credit-ssa', 'barcode']);
  }
  parseOcrResult(ocrType, ssaMode, ocrResult, ssaResult, ssaRetryCount, ssaResultList, ssaRetryType, ssaRetryPivot) {
    if (!this.__ocrTypeList.includes(ocrType)) throw new OCRError('ResultParser :: Unsupported OCR type', 'WA003');
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
        this.__parseIdDriver(ocrResult.ocr_result, legacyFormat);
        break;
      case 'passport':
      case 'passport-ssa':
      case 'foreign-passport':
      case 'foreign-passport-ssa':
        this.__parsePassport(ocrResult.ocr_result, legacyFormat);
        break;
      case 'alien':
      case 'alien-ssa':
        this.__parseAlien(ocrResult.ocr_result, legacyFormat);
        break;
      case 'alien-back':
        this.__parseAlienBack(ocrResult.ocr_result, legacyFormat);
        break;
      case 'veteran':
      case 'veteran-ssa':
        this.__parseVeteran(ocrResult.ocr_result, legacyFormat);
        break;
      case 'credit':
        [legacyFormat, newFormat] = this.__parseCredit(ocrResult.ocr_result, legacyFormat);
        ocrResult.ocr_result = newFormat;
        break;
      case 'barcode':
        [legacyFormat, newFormat] = this.__parseBarcode(ocrResult.ocr_result, legacyFormat);
        ocrResult.ocr_result = newFormat;
        break;
      default:
        throw new OCRError('ResultParser :: Unsupported OCR type', 'WA003');
    }
    return {
      legacyFormat,
      newFormat: ocrResult
    };
  }

  // prettier-ignore
  __parseSsaResult(ssaRetryType, ssaRetryPivot, ssaResult, ssaRetryCount, ssaResultList, ocrResult, legacyFormat) {
    function __parseSSARawData(ssaRawData) {
      var _ssaRawData$ssa_resul, _ssaRawData$ssa_resul2;
      // const result = {
      //   fd_confidence: ssaRawData?.ssa_result?.fd_confidence || ssaRawData?.fd_confidence,
      //   id_truth: ssaRawData?.ssa_result?.id_truth || ssaRawData?.id_truth
      // }
      // TODO : PII 일때 truth 로 오는 오류 id_truth 고쳐진 뒤 수정 필요.
      var result = {
        fd_confidence: (ssaRawData === null || ssaRawData === void 0 ? void 0 : (_ssaRawData$ssa_resul = ssaRawData.ssa_result) === null || _ssaRawData$ssa_resul === void 0 ? void 0 : _ssaRawData$ssa_resul.fd_confidence) || (ssaRawData === null || ssaRawData === void 0 ? void 0 : ssaRawData.fd_confidence) || (ssaRawData === null || ssaRawData === void 0 ? void 0 : ssaRawData.conf),
        id_truth: (ssaRawData === null || ssaRawData === void 0 ? void 0 : (_ssaRawData$ssa_resul2 = ssaRawData.ssa_result) === null || _ssaRawData$ssa_resul2 === void 0 ? void 0 : _ssaRawData$ssa_resul2.id_truth) || (ssaRawData === null || ssaRawData === void 0 ? void 0 : ssaRawData.id_truth) || (ssaRawData === null || ssaRawData === void 0 ? void 0 : ssaRawData.truth)
      };
      if (ssaRawData !== null && ssaRawData !== void 0 && ssaRawData.encrypted) {
        result.encrypted = ssaRawData === null || ssaRawData === void 0 ? void 0 : ssaRawData.encrypted;
      }
      if (ssaRawData !== null && ssaRawData !== void 0 && ssaRawData.encrypted_overall) {
        result.encrypted_overall = ssaRawData === null || ssaRawData === void 0 ? void 0 : ssaRawData.encrypted_overall;
      }
      return result;
    }

    // SSA 관련 처리
    var ssaResultObj = objectUtil.stringToJson(ssaResult);
    var parseSSAResultObj = __parseSSARawData(ssaResultObj);

    // 하위호환성을 위해 평문일때는 ocr_result 내부에도 넣어줌
    ocrResult.ocr_result.fd_confidence = parseSSAResultObj.fd_confidence;
    ocrResult.ocr_result.id_truth = parseSSAResultObj.id_truth;

    // ssa_result 값 추가
    ocrResult.ssa_result = {};
    ocrResult.ssa_result.fd_confidence = parseSSAResultObj.fd_confidence;
    ocrResult.ssa_result.id_truth = parseSSAResultObj.id_truth;
    if (parseSSAResultObj.encrypted) {
      ocrResult.encrypted.ssa_result = parseSSAResultObj.encrypted;
      ocrResult.encrypted.ocr_result.fd_confidence = parseSSAResultObj.encrypted.fd_confidence;
      ocrResult.encrypted.ocr_result.id_truth = parseSSAResultObj.encrypted.id_truth;
    } else if (parseSSAResultObj.encrypted_overall) {
      ocrResult.ssa_encrypted_overall = parseSSAResultObj.encrypted_overall;
    } else {
      // value encrypt 또는 overall encrypt 일 때는 id_truth_retry_count 전달하지 않음
      ocrResult.ocr_result.id_truth_retry_count = ssaRetryCount;
      ocrResult.ssa_result.id_truth_retry_count = ssaRetryCount;
    }

    // SSA Retry 관련 처리
    if (ssaResultList && ssaRetryCount > 0) {
      var truthResultDetail = [];
      for (var item of ssaResultList) {
        var tmpObj = objectUtil.stringToJson(item);
        var truthResult = __parseSSARawData(tmpObj); // prettier-ignore
        truthResultDetail.push(truthResult);
      }
      ocrResult.ocr_result.id_truth_result_detail = truthResultDetail;
      ocrResult.ssa_result.id_truth_result_detail = truthResultDetail;
      if (ssaRetryType === 'ENSEMBLE') {
        var average = list => {
          var sum = list.map(el => Math.abs(ssaRetryPivot - el.fd_confidence)).reduce((acc, cur) => cur + acc, 0);
          if (isNaN(sum / list.length)) return Number.MAX_SAFE_INTEGER;
          return sum / list.length;
        };
        var fakeList = [];
        var realList = [];
        ocrResult.ocr_result.id_truth_result_detail.forEach(el => {
          if (el.id_truth === "FAKE") fakeList.push(el);
          if (el.id_truth === "REAL") realList.push(el);
        });
        var f_avg = average(fakeList); // fake 평균값
        var r_avg = average(realList); // real 평균값

        var f_abs = Math.abs(ssaRetryPivot - f_avg);
        var r_abs = Math.abs(ssaRetryPivot - r_avg);

        // real 에 더 근접함
        if (r_abs - f_abs < 0) {
          ocrResult.ocr_result.id_truth = "REAL";
          ocrResult.ssa_result.id_truth = "REAL";
        }
        // fake 에 더 근접하거나 같다면 FAKE
        if (f_abs - r_abs < 0 || r_abs - f_abs === 0) {
          ocrResult.ocr_result.id_truth = "FAKE";
          ocrResult.ssa_result.id_truth = "FAKE";
        }
      }
    }
    var keyMapSsaResult = {
      truth: 'id_truth',
      truthConfidence: 'fd_confidence',
      truthRetryCount: 'id_truth_retry_count',
      truthResultDetail: 'id_truth_result_detail'
    };
    this.__convertLegacyFormat(ocrResult.ocr_result, legacyFormat, keyMapSsaResult);
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
  __convertLegacyFormat(obj, legacyFormat, map) {
    for (var key in map) {
      legacyFormat[key] = typeof obj[map[key]] === 'object' ? _objectSpread({}, obj[map[key]]) : obj[map[key]];
    }
    return legacyFormat;
  }
  __reformatJumin(ocrResult) {
    // 주민번호 형식 리턴값 형식 변경
    if (ocrResult.masked_jumin) {
      // 암호화 된 경우 대응
      if (ocrResult.masked_jumin !== undefined && ocrResult.masked_jumin.length === 13) {
        ocrResult.masked_jumin = ocrResult.masked_jumin.slice(0, 6) + '-' + ocrResult.masked_jumin.slice(6, 13);
      } else {
        ocrResult.masked_jumin = '';
      }
    } else {
      if (ocrResult.jumin !== undefined && ocrResult.jumin.length === 13) {
        ocrResult.jumin = ocrResult.jumin.slice(0, 6) + '-' + ocrResult.jumin.slice(6, 13);
      } else {
        ocrResult.jumin = '';
      }
    }
  }
  __addBirth(ocrResult) {
    if (ocrResult.birthday) {
      // 여권
      ocrResult.birth = ocrResult.birthday;
    } else {
      var toBirth = ocrResult.masked_jumin /* 암호화 */ || ocrResult.jumin; /* 일반(평문) */
      ocrResult.birth = toBirth.slice(0, 6); // 생년월일
    }
  }

  __addIsOldFormatDriverNumber(ocrResult) {
    if (ocrResult.masked_jumin) {
      // 암호화 된 경우 대응
      // 구형 면허증 포멧 판정 (ex: 제주 13-001234-12 -> true)
      var regex = /[가-힣]/g;
      ocrResult.is_old_format_driver_number = !!ocrResult.masked_driver_number.match(regex);

      // TODO : 암호화 된값에서는 처리할 수 없고, 마스킹된 운전면허번호에 ' '가 없어 처리 할 수 없음.
      // if (ocrResult.is_old_format_driver_number) {
      //   // useb api 포멧에 맞게 변경 (to: 제주-13-001234-12)
      //   ocrResult.masked_driver_number = ocrResult.masked_driver_number.replace(' ', '-');
      // }
    } else {
      // 일반(평문) 시나리오
      // 구형 면허증 포멧 판정 (ex: 제주 13-001234-12 -> true)
      var _regex = /[가-힣]/g;
      ocrResult.is_old_format_driver_number = !!ocrResult.driver_number.match(_regex);
      if (ocrResult.is_old_format_driver_number) {
        // useb api 포멧에 맞게 변경 (to: 제주-13-001234-12)
        ocrResult.driver_number = ocrResult.driver_number.replace(' ', '-');
      }
    }
  }
  __parseIdDriver(ocrResult, legacyFormat) {
    // 주민번호 형식 리턴값 형식 변경
    this.__reformatJumin(ocrResult);
    this.__addBirth(ocrResult);
    if (ocrResult.result_scan_type === '2') this.__addIsOldFormatDriverNumber(ocrResult);
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
    this.__reformatJumin(ocrResult);
    this.__addBirth(ocrResult);
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
    this.__reformatJumin(ocrResult);
    this.__addBirth(ocrResult);
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
  __parseAlienBack(ocrResult, legacyFormat) {
    var keyMapAlienBack = {
      Completed: 'complete',
      serial: 'serial',
      confirmation: 'confirmation',
      permission_date: 'permission_date',
      expiry_date: 'expiry_date'
    };
    this.__convertLegacyFormat(ocrResult, legacyFormat, keyMapAlienBack);
    var filterEmptyString = str => str.split(',').filter(Boolean);
    ocrResult.confirmation = filterEmptyString(ocrResult.confirmation).join(',');
    ocrResult.expiry_date = filterEmptyString(ocrResult.expiry_date).join(',');
    ocrResult.permission_date = filterEmptyString(ocrResult.permission_date).join(',');
  }
  __parseVeteran(ocrResult, legacyFormat) {
    this.__reformatJumin(ocrResult);
    this.__addBirth(ocrResult);
    var keyMapAlien = {
      Completed: 'complete',
      name: 'name',
      number: 'jumin',
      Date: 'issued_date',
      veterans_number: 'veterans_number',
      masked_veterans_number: 'masked_veterans_number',
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
  __parseBarcode(ocrResult, legacyFormat) {
    return [legacyFormat, ocrResult];
  }
}
export default new OcrResultParser();