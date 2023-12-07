function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */

import objectUtil from './object-util.js';

/* global-module */
class OcrResultParser {
  constructor() {
    _defineProperty(this, "__ocrTypeList", ['idcard', 'driver', 'passport', 'foreign-passport', 'alien', 'credit', 'idcard-ssa', 'driver-ssa', 'passport-ssa', 'foreign-passport-ssa', 'alien-ssa', 'credit-ssa']);
    _defineProperty(this, "MASK_INFO", ['rect_id_issue_date', 'rect_id_number', 'rect_kor_personal_number', 'rect_license_number', 'rect_overseas_residents', 'rect_passport_jumin_number', 'rect_passport_number', 'rect_passport_number_mrz']);
    _defineProperty(this, "RESULT_SCAN_TYPE_MAP", {
      RESIDENT_REGISTRATION: '1',
      DRIVER_LICENSE: '2',
      PASSPORT: '3',
      PASSPORT_OVERSEA: '4',
      // TODO 현재 SERVER SDK 구분안함
      ALIEN_REGISTRATION: '5',
      ALIEN_REGISTRATION_1: '5-1',
      // TODO 현재 SERVER SDK 구분안함
      ALIEN_REGISTRATION_2: '5-2',
      // TODO 현재 SERVER SDK 구분안함
      ALIEN_REGISTRATION_3: '5-3' // TODO 현재 SERVER SDK 구분안함
    });
    _defineProperty(this, "RESULT_MASKING_TYPE_MAP", {
      1: 'kor',
      2: 'driver',
      3: 'passport',
      4: 'passport-oversea',
      // TODO 현재 SERVER SDK 구분안함
      5: 'alien'
    });
  }
  parseOcrResult(ocrType, ssaMode, ocrResult) {
    if (!this.__ocrTypeList.includes(ocrType)) throw new Error('ResultParser :: Unsupported OCR type');
    var legacyFormat = {},
      newFormat = {},
      maskInfo = {},
      base64ImageResult = {};

    // base64 처리
    this.__parseBase64ImageResult(ocrResult, base64ImageResult);
    switch (ocrType) {
      case 'idcard':
      case 'driver':
      case 'idcard-ssa':
      case 'driver-ssa':
        var result = this.__parseIdDriver(ocrResult);
        _.assign(newFormat, result.newFormat);
        _.assign(legacyFormat, result.legacyFormat);
        _.assign(maskInfo, result.maskInfo);
        break;
      case 'passport':
      case 'passport-ssa':
      case 'foreign-passport':
      case 'foreign-passport-ssa':
        var passport_result = this.__parsePassport(ocrResult); // prettier-ignore
        _.assign(newFormat, passport_result.newFormat);
        _.assign(legacyFormat, passport_result.legacyFormat);
        _.assign(maskInfo, passport_result.maskInfo);
        break;
      case 'alien':
      case 'alien-back':
      case 'alien-ssa':
        var alien_result = this.__parseAlien(ocrResult); // prettier-ignore
        _.assign(newFormat, alien_result.newFormat);
        _.assign(legacyFormat, alien_result.legacyFormat);
        _.assign(maskInfo, alien_result.maskInfo);
        break;
      case 'credit':
      case 'credit-ssa':
        this.__parseCredit(ocrResult, legacyFormat, newFormat);
        break;
      default:
        throw new Error('Unsupported OCR type');
    }

    // SSA 처리
    if (!ssaMode) {
      delete legacyFormat.truth;
      delete legacyFormat.truthConfidence;
      delete legacyFormat.truthRetryCount;
      delete newFormat.id_truth;
      delete newFormat.fd_confidence;
      delete newFormat.id_truth_retry_count;
    }
    return {
      legacyFormat,
      newFormat,
      base64ImageResult,
      maskInfo
    };
  }
  __parseBase64ImageResult(ocrResult, base64ImageResult) {
    if (ocrResult.image_base64_mask && !ocrResult.image_base64_mask.startsWith('data:image')) {
      ocrResult.image_base64_mask = 'data:image/jpeg;base64,' + ocrResult.image_base64_mask;
    }
    if (ocrResult.image_base64_face && !ocrResult.image_base64_face.startsWith('data:image')) {
      ocrResult.image_base64_face = 'data:image/jpeg;base64,' + ocrResult.image_base64_face;
    }
    var newFormatKeyMapBase64Image = {
      image_base64_mask: 'ocr_masking_image',
      image_base64_face: 'ocr_face_image'
    };
    this.__convertServerToWasmFormat(ocrResult, base64ImageResult, newFormatKeyMapBase64Image);
  }
  __convertLegacyFormat(obj, legacyFormat, map) {
    for (var key in map) {
      legacyFormat[key] = typeof obj[map[key]] === 'object' ? _objectSpread({}, obj[map[key]]) : obj[map[key]];
    }
    return legacyFormat;
  }
  __convertServerToWasmFormat(obj, wasmFormat, map) {
    for (var key in map) {
      var targetValue = objectUtil.getObjectValueWithDot(obj, key);
      var targetObj = {};
      objectUtil.makeObjectWithDot(targetObj, map[key], targetValue);
      objectUtil.objectDeepMerge(wasmFormat, targetObj);
    }
    return wasmFormat;
  }

  /**
   * @param {*} ocrResult
   * @return { newFormat, legacyFormat, maskInfo }
   */
  __parseIdDriver(ocrResult) {
    var _ref, _flat$fd_confidence;
    // TODO wasm에서 지원해주는 idType 값이 없어 임의 매핑 (해외 여권이랑 외국인등록증 구분안되는 문제 있음)
    var idType = ocrResult.result_scan_type ? this.RESULT_SCAN_TYPE_MAP[ocrResult.result_scan_type] : ocrResult.data.idType;
    var flat = this.flatObj(ocrResult);

    // 주민번호 형식 000000-0000000
    var jumin = this.getIdNumberFormat(flat.jumin);

    // new format ##########################
    // id 객체에서 flat 하게 만들 대상들
    var newFormatKeys = ['complete', 'name', 'jumin', 'issued_date', 'region', 'found_face', 'specular_ratio', 'id_truth', 'fd_confidence'];
    var newFormat = _.pick(flat, newFormatKeys);
    newFormat.complete = newFormat.complete + '';
    newFormat.jumin = jumin;
    newFormat.id_truth_retry_count = 0;
    newFormat.result_scan_type = idType;
    newFormat.fd_confidence = (_ref = ((_flat$fd_confidence = flat.fd_confidence) === null || _flat$fd_confidence === void 0 ? void 0 : _flat$fd_confidence.toFixed(3)) + '') !== null && _ref !== void 0 ? _ref : '';
    newFormat.found_face = flat.found_face + '';
    newFormat.specular_ratio = flat.specular_ratio + '';

    // 주민등록증 추가 정보 주입
    if (idType === '1') newFormat.overseas_resident = 'false';

    // 주민번호 형식 리턴값 형식 변경 - birth 추가 // TODO : 여권은 birthday?
    newFormat.birth = jumin.length >= 6 ? jumin.slice(0, 6) : '';

    // 운전면허증일때 추가 정보 주입
    if (idType === '2') {
      var {
        value
      } = this.getDriverLicense(flat.driver_number); // prettier-ignore
      // newFormat.is_old_format_driver_number = isOldFormat;
      newFormat.driver_number = value;
      newFormat.driver_serial = flat.driver_serial;
      newFormat.driver_type = flat.driver_type;
    }

    // legacy format ##########################
    var legacyFormat = {
      Completed: newFormat.complete,
      type: idType,
      name: flat.name,
      number: jumin,
      Date: flat.issued_date,
      region: flat.region,
      truth: flat.id_truth,
      truthConfidence: newFormat.fd_confidence,
      truthRetryCount: 0,
      face_score: newFormat.found_face,
      specular: newFormat.specular_ratio,
      id_type: idType
    };

    // 운전면허증일때 추가 정보 주입
    legacyFormat.licenseNumber = newFormat.driver_number;
    legacyFormat.serial = newFormat.driver_serial;
    legacyFormat.licenseType = newFormat.driver_type;
    return {
      newFormat,
      legacyFormat,
      maskInfo: this.getMaskInfo(flat, idType)
    };
  }
  __parsePassport(ocrResult) {
    var _ref2, _flat$fd_confidence2;
    // TODO wasm에서 지원해주는 idType 값이 없어 임의 매핑 (해외 여권이랑 외국인등록증 구분안되는 문제 있음)
    var idType = this.RESULT_SCAN_TYPE_MAP[ocrResult.result_scan_type];
    var flat = this.flatObj(ocrResult);

    // 주민번호 형식 000000-0000000
    var jumin = this.getIdNumberFormat(flat.jumin);

    // new format ##########################
    // id 객체에서 flat 하게 만들 대상들
    // prettier-ignore
    var newFormatKeys = ['complete', 'name', 'sur_name', 'given_name', 'passport_type', 'issuing_country', 'passport_number', 'nationality', 'issued_date', 'sex', 'expiry_date', 'personal_number', 'jumin', 'birthday', 'name_kor', 'color_point', 'found_face', 'specular_ratio', 'mrz1', 'mrz2', 'id_truth', 'fd_confidence'];
    var newFormat = _.pick(flat, newFormatKeys);
    newFormat.complete = newFormat.complete + '';
    newFormat.jumin = jumin;
    newFormat.id_truth_retry_count = 0;
    newFormat.result_scan_type = idType;
    newFormat.fd_confidence = (_ref2 = ((_flat$fd_confidence2 = flat.fd_confidence) === null || _flat$fd_confidence2 === void 0 ? void 0 : _flat$fd_confidence2.toFixed(3)) + '') !== null && _ref2 !== void 0 ? _ref2 : '';
    newFormat.found_face = flat.found_face + '';
    newFormat.specular_ratio = flat.specular_ratio + '';

    // legacy format ##########################
    var legacyFormat = {
      Completed: newFormat.complete,
      name: flat.name,
      surName: flat.sur_name,
      givenName: flat.given_name,
      type: flat.passport_type,
      issuing_country: flat.issuing_country,
      passport_no: flat.passport_number,
      nationality: flat.nationality,
      date_of_issue: flat.issued_date,
      sex: flat.sex,
      date_of_expiry: flat.expiry_date,
      personal_no: flat.personal_number,
      number: jumin,
      date_of_birth: flat.birthday,
      name_kor: flat.name_kor,
      mrz1: flat.mrz1,
      mrz2: flat.mrz2,
      face_score: newFormat.found_face,
      specular: newFormat.specular_ratio,
      id_type: idType,
      truth: flat.id_truth,
      truthConfidence: newFormat.fd_confidence,
      truthRetryCount: 0
    };
    return {
      newFormat,
      legacyFormat,
      maskInfo: this.getMaskInfo(flat, idType)
    };
  }
  __parseAlien(ocrResult) {
    var _ref3, _flat$fd_confidence3, _flat$nationality, _flat$visa_type, _flat$name_kor;
    // TODO wasm에서 지원해주는 idType 값이 없어 임의 매핑 (해외 여권이랑 외국인등록증 구분안되는 문제 있음)
    var idType = this.RESULT_SCAN_TYPE_MAP[ocrResult.result_scan_type];
    var defaultObj = {
      nationality: '',
      visa_type: '',
      name_kor: ''
    };
    var flat = _.assign(defaultObj, this.flatObj(ocrResult));

    // 주민번호 형식 000000-0000000
    var jumin = this.getIdNumberFormat(flat.jumin);

    // new format ##########################
    // id 객체에서 flat 하게 만들 대상들
    var newFormatKeys = ['complete', 'name', 'jumin', 'issued_date', 'nationality', 'visa_type', 'name_kor', 'found_face', 'specular_ratio', 'id_truth', 'fd_confidence'];
    var newFormat = _.pick(flat, newFormatKeys);
    newFormat.complete = newFormat.complete + '';
    newFormat.jumin = jumin;
    newFormat.id_truth_retry_count = 0;
    newFormat.result_scan_type = idType;
    newFormat.fd_confidence = (_ref3 = ((_flat$fd_confidence3 = flat.fd_confidence) === null || _flat$fd_confidence3 === void 0 ? void 0 : _flat$fd_confidence3.toFixed(3)) + '') !== null && _ref3 !== void 0 ? _ref3 : '';
    newFormat.found_face = flat.found_face + '';
    newFormat.specular_ratio = flat.specular_ratio + '';
    var legacyFormat = {
      Completed: newFormat.complete,
      name: flat.name,
      number: jumin,
      Date: flat.issued_date,
      nationality: (_flat$nationality = flat.nationality) !== null && _flat$nationality !== void 0 ? _flat$nationality : '',
      visaType: (_flat$visa_type = flat.visa_type) !== null && _flat$visa_type !== void 0 ? _flat$visa_type : '',
      name_kor: (_flat$name_kor = flat.name_kor) !== null && _flat$name_kor !== void 0 ? _flat$name_kor : '',
      face_score: newFormat.found_face,
      specular: newFormat.specular_ratio,
      id_type: idType,
      truth: flat.id_truth,
      truthConfidence: newFormat.fd_confidence,
      truthRetryCount: 0
    };
    return {
      newFormat,
      legacyFormat,
      maskInfo: this.getMaskInfo(flat, idType)
    };
  }
  __parseCredit(ocrResult) {
    var target = {};
    var resultSplit = ocrResult.split(',');
    var resultIndex = 0;
    if (resultIndex < resultSplit.length) target.Completed = resultSplit[resultIndex], resultIndex++;
    if (resultIndex < resultSplit.length) target.number = resultSplit[resultIndex], resultIndex++;
    if (resultIndex < resultSplit.length) target.exp_date = resultSplit[resultIndex], resultIndex++;
    return [target, target];
  }
  getMaskInfo(obj, idType) {
    var result = {
      type: this.RESULT_MASKING_TYPE_MAP[idType + '']
    };
    this.MASK_INFO.forEach(el => {
      if (_.has(obj, el) && obj[el] !== '0,0,0,0') {
        result[el] = obj[el];
      }
    });
    return result;
  }
  getDriverLicense(value) {
    var _value;
    // 구형 면허증 포멧 판정 (ex: 제주 13-001234-12 -> true)
    var regex = /[가-힣]/g;
    var isOldFormat = (_value = value) === null || _value === void 0 ? void 0 : _value.match(regex);
    if (isOldFormat) value = value.replace(' ', '-');
    return {
      isOldFormat,
      value
    };
  }

  // 주민번호 형식 리턴값 형식 변경
  getIdNumberFormat(value) {
    if ((value === null || value === void 0 ? void 0 : value.length) === 14) return value;
    return (value === null || value === void 0 ? void 0 : value.length) === 13 ? value.slice(0, 6) + '-' + value.slice(6, 13) : '';
  }
  flatObj(obj) {
    var result = {};
    for (var key in obj) {
      var value = obj[key];
      if (value instanceof Object && !Array.isArray(value)) {
        var innerResult = this.flatObj(value);
        _.assign(result, innerResult);
      } else result[key] = value;
    }
    return result;
  }
}
export default new OcrResultParser();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy91c2ViLW9jci1hcGktcGFyc2VyLmpzIiwibmFtZXMiOlsib2JqZWN0VXRpbCIsIk9jclJlc3VsdFBhcnNlciIsImNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnR5IiwiUkVTSURFTlRfUkVHSVNUUkFUSU9OIiwiRFJJVkVSX0xJQ0VOU0UiLCJQQVNTUE9SVCIsIlBBU1NQT1JUX09WRVJTRUEiLCJBTElFTl9SRUdJU1RSQVRJT04iLCJBTElFTl9SRUdJU1RSQVRJT05fMSIsIkFMSUVOX1JFR0lTVFJBVElPTl8yIiwiQUxJRU5fUkVHSVNUUkFUSU9OXzMiLCJwYXJzZU9jclJlc3VsdCIsIm9jclR5cGUiLCJzc2FNb2RlIiwib2NyUmVzdWx0IiwiX19vY3JUeXBlTGlzdCIsImluY2x1ZGVzIiwiRXJyb3IiLCJsZWdhY3lGb3JtYXQiLCJuZXdGb3JtYXQiLCJtYXNrSW5mbyIsImJhc2U2NEltYWdlUmVzdWx0IiwiX19wYXJzZUJhc2U2NEltYWdlUmVzdWx0IiwicmVzdWx0IiwiX19wYXJzZUlkRHJpdmVyIiwiXyIsImFzc2lnbiIsInBhc3Nwb3J0X3Jlc3VsdCIsIl9fcGFyc2VQYXNzcG9ydCIsImFsaWVuX3Jlc3VsdCIsIl9fcGFyc2VBbGllbiIsIl9fcGFyc2VDcmVkaXQiLCJ0cnV0aCIsInRydXRoQ29uZmlkZW5jZSIsInRydXRoUmV0cnlDb3VudCIsImlkX3RydXRoIiwiZmRfY29uZmlkZW5jZSIsImlkX3RydXRoX3JldHJ5X2NvdW50IiwiaW1hZ2VfYmFzZTY0X21hc2siLCJzdGFydHNXaXRoIiwiaW1hZ2VfYmFzZTY0X2ZhY2UiLCJuZXdGb3JtYXRLZXlNYXBCYXNlNjRJbWFnZSIsIl9fY29udmVydFNlcnZlclRvV2FzbUZvcm1hdCIsIl9fY29udmVydExlZ2FjeUZvcm1hdCIsIm9iaiIsIm1hcCIsImtleSIsIl9vYmplY3RTcHJlYWQiLCJ3YXNtRm9ybWF0IiwidGFyZ2V0VmFsdWUiLCJnZXRPYmplY3RWYWx1ZVdpdGhEb3QiLCJ0YXJnZXRPYmoiLCJtYWtlT2JqZWN0V2l0aERvdCIsIm9iamVjdERlZXBNZXJnZSIsIl9yZWYiLCJfZmxhdCRmZF9jb25maWRlbmNlIiwiaWRUeXBlIiwicmVzdWx0X3NjYW5fdHlwZSIsIlJFU1VMVF9TQ0FOX1RZUEVfTUFQIiwiZGF0YSIsImZsYXQiLCJmbGF0T2JqIiwianVtaW4iLCJnZXRJZE51bWJlckZvcm1hdCIsIm5ld0Zvcm1hdEtleXMiLCJwaWNrIiwiY29tcGxldGUiLCJ0b0ZpeGVkIiwiZm91bmRfZmFjZSIsInNwZWN1bGFyX3JhdGlvIiwib3ZlcnNlYXNfcmVzaWRlbnQiLCJiaXJ0aCIsImxlbmd0aCIsInNsaWNlIiwidmFsdWUiLCJnZXREcml2ZXJMaWNlbnNlIiwiZHJpdmVyX251bWJlciIsImRyaXZlcl9zZXJpYWwiLCJkcml2ZXJfdHlwZSIsIkNvbXBsZXRlZCIsInR5cGUiLCJuYW1lIiwibnVtYmVyIiwiRGF0ZSIsImlzc3VlZF9kYXRlIiwicmVnaW9uIiwiZmFjZV9zY29yZSIsInNwZWN1bGFyIiwiaWRfdHlwZSIsImxpY2Vuc2VOdW1iZXIiLCJzZXJpYWwiLCJsaWNlbnNlVHlwZSIsImdldE1hc2tJbmZvIiwiX3JlZjIiLCJfZmxhdCRmZF9jb25maWRlbmNlMiIsInN1ck5hbWUiLCJzdXJfbmFtZSIsImdpdmVuTmFtZSIsImdpdmVuX25hbWUiLCJwYXNzcG9ydF90eXBlIiwiaXNzdWluZ19jb3VudHJ5IiwicGFzc3BvcnRfbm8iLCJwYXNzcG9ydF9udW1iZXIiLCJuYXRpb25hbGl0eSIsImRhdGVfb2ZfaXNzdWUiLCJzZXgiLCJkYXRlX29mX2V4cGlyeSIsImV4cGlyeV9kYXRlIiwicGVyc29uYWxfbm8iLCJwZXJzb25hbF9udW1iZXIiLCJkYXRlX29mX2JpcnRoIiwiYmlydGhkYXkiLCJuYW1lX2tvciIsIm1yejEiLCJtcnoyIiwiX3JlZjMiLCJfZmxhdCRmZF9jb25maWRlbmNlMyIsIl9mbGF0JG5hdGlvbmFsaXR5IiwiX2ZsYXQkdmlzYV90eXBlIiwiX2ZsYXQkbmFtZV9rb3IiLCJkZWZhdWx0T2JqIiwidmlzYV90eXBlIiwidmlzYVR5cGUiLCJ0YXJnZXQiLCJyZXN1bHRTcGxpdCIsInNwbGl0IiwicmVzdWx0SW5kZXgiLCJleHBfZGF0ZSIsIlJFU1VMVF9NQVNLSU5HX1RZUEVfTUFQIiwiTUFTS19JTkZPIiwiZm9yRWFjaCIsImVsIiwiaGFzIiwiX3ZhbHVlIiwicmVnZXgiLCJpc09sZEZvcm1hdCIsIm1hdGNoIiwicmVwbGFjZSIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImlubmVyUmVzdWx0Il0sInNvdXJjZXMiOlsiaGVscGVycy91c2ViLW9jci1hcGktcGFyc2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCBvYmplY3RVdGlsIGZyb20gJy4vb2JqZWN0LXV0aWwuanMnO1xuXG4vKiBnbG9iYWwtbW9kdWxlICovXG5jbGFzcyBPY3JSZXN1bHRQYXJzZXIge1xuICBfX29jclR5cGVMaXN0ID0gWydpZGNhcmQnLCAnZHJpdmVyJywgJ3Bhc3Nwb3J0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnYWxpZW4nLCAnY3JlZGl0JywgJ2lkY2FyZC1zc2EnLCAnZHJpdmVyLXNzYScsICdwYXNzcG9ydC1zc2EnLCAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnLCAnYWxpZW4tc3NhJywgJ2NyZWRpdC1zc2EnXTtcbiAgTUFTS19JTkZPID0gWydyZWN0X2lkX2lzc3VlX2RhdGUnLCAncmVjdF9pZF9udW1iZXInLCAncmVjdF9rb3JfcGVyc29uYWxfbnVtYmVyJywgJ3JlY3RfbGljZW5zZV9udW1iZXInLCAncmVjdF9vdmVyc2Vhc19yZXNpZGVudHMnLCAncmVjdF9wYXNzcG9ydF9qdW1pbl9udW1iZXInLCAncmVjdF9wYXNzcG9ydF9udW1iZXInLCAncmVjdF9wYXNzcG9ydF9udW1iZXJfbXJ6J107XG4gIFJFU1VMVF9TQ0FOX1RZUEVfTUFQID0ge1xuICAgIFJFU0lERU5UX1JFR0lTVFJBVElPTjogJzEnLFxuICAgIERSSVZFUl9MSUNFTlNFOiAnMicsXG4gICAgUEFTU1BPUlQ6ICczJyxcbiAgICBQQVNTUE9SVF9PVkVSU0VBOiAnNCcsXG4gICAgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgICBBTElFTl9SRUdJU1RSQVRJT046ICc1JyxcbiAgICBBTElFTl9SRUdJU1RSQVRJT05fMTogJzUtMScsXG4gICAgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgICBBTElFTl9SRUdJU1RSQVRJT05fMjogJzUtMicsXG4gICAgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgICBBTElFTl9SRUdJU1RSQVRJT05fMzogJzUtMycgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgfTtcblxuICBSRVNVTFRfTUFTS0lOR19UWVBFX01BUCA9IHtcbiAgICAxOiAna29yJyxcbiAgICAyOiAnZHJpdmVyJyxcbiAgICAzOiAncGFzc3BvcnQnLFxuICAgIDQ6ICdwYXNzcG9ydC1vdmVyc2VhJyxcbiAgICAvLyBUT0RPIO2YhOyerCBTRVJWRVIgU0RLIOq1rOu2hOyViO2VqFxuICAgIDU6ICdhbGllbidcbiAgfTtcbiAgcGFyc2VPY3JSZXN1bHQob2NyVHlwZSwgc3NhTW9kZSwgb2NyUmVzdWx0KSB7XG4gICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignUmVzdWx0UGFyc2VyIDo6IFVuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgY29uc3QgbGVnYWN5Rm9ybWF0ID0ge30sXG4gICAgICBuZXdGb3JtYXQgPSB7fSxcbiAgICAgIG1hc2tJbmZvID0ge30sXG4gICAgICBiYXNlNjRJbWFnZVJlc3VsdCA9IHt9O1xuXG4gICAgLy8gYmFzZTY0IOyymOumrFxuICAgIHRoaXMuX19wYXJzZUJhc2U2NEltYWdlUmVzdWx0KG9jclJlc3VsdCwgYmFzZTY0SW1hZ2VSZXN1bHQpO1xuICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9fcGFyc2VJZERyaXZlcihvY3JSZXN1bHQpO1xuICAgICAgICBfLmFzc2lnbihuZXdGb3JtYXQsIHJlc3VsdC5uZXdGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihsZWdhY3lGb3JtYXQsIHJlc3VsdC5sZWdhY3lGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihtYXNrSW5mbywgcmVzdWx0Lm1hc2tJbmZvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgIGNvbnN0IHBhc3Nwb3J0X3Jlc3VsdCA9IHRoaXMuX19wYXJzZVBhc3Nwb3J0KG9jclJlc3VsdCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBfLmFzc2lnbihuZXdGb3JtYXQsIHBhc3Nwb3J0X3Jlc3VsdC5uZXdGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihsZWdhY3lGb3JtYXQsIHBhc3Nwb3J0X3Jlc3VsdC5sZWdhY3lGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihtYXNrSW5mbywgcGFzc3BvcnRfcmVzdWx0Lm1hc2tJbmZvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhbGllbic6XG4gICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgIGNvbnN0IGFsaWVuX3Jlc3VsdCA9IHRoaXMuX19wYXJzZUFsaWVuKG9jclJlc3VsdCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBfLmFzc2lnbihuZXdGb3JtYXQsIGFsaWVuX3Jlc3VsdC5uZXdGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihsZWdhY3lGb3JtYXQsIGFsaWVuX3Jlc3VsdC5sZWdhY3lGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihtYXNrSW5mbywgYWxpZW5fcmVzdWx0Lm1hc2tJbmZvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgY2FzZSAnY3JlZGl0LXNzYSc6XG4gICAgICAgIHRoaXMuX19wYXJzZUNyZWRpdChvY3JSZXN1bHQsIGxlZ2FjeUZvcm1hdCwgbmV3Rm9ybWF0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgfVxuXG4gICAgLy8gU1NBIOyymOumrFxuICAgIGlmICghc3NhTW9kZSkge1xuICAgICAgZGVsZXRlIGxlZ2FjeUZvcm1hdC50cnV0aDtcbiAgICAgIGRlbGV0ZSBsZWdhY3lGb3JtYXQudHJ1dGhDb25maWRlbmNlO1xuICAgICAgZGVsZXRlIGxlZ2FjeUZvcm1hdC50cnV0aFJldHJ5Q291bnQ7XG4gICAgICBkZWxldGUgbmV3Rm9ybWF0LmlkX3RydXRoO1xuICAgICAgZGVsZXRlIG5ld0Zvcm1hdC5mZF9jb25maWRlbmNlO1xuICAgICAgZGVsZXRlIG5ld0Zvcm1hdC5pZF90cnV0aF9yZXRyeV9jb3VudDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgIG5ld0Zvcm1hdCxcbiAgICAgIGJhc2U2NEltYWdlUmVzdWx0LFxuICAgICAgbWFza0luZm9cbiAgICB9O1xuICB9XG4gIF9fcGFyc2VCYXNlNjRJbWFnZVJlc3VsdChvY3JSZXN1bHQsIGJhc2U2NEltYWdlUmVzdWx0KSB7XG4gICAgaWYgKG9jclJlc3VsdC5pbWFnZV9iYXNlNjRfbWFzayAmJiAhb2NyUmVzdWx0LmltYWdlX2Jhc2U2NF9tYXNrLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UnKSkge1xuICAgICAgb2NyUmVzdWx0LmltYWdlX2Jhc2U2NF9tYXNrID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIG9jclJlc3VsdC5pbWFnZV9iYXNlNjRfbWFzaztcbiAgICB9XG4gICAgaWYgKG9jclJlc3VsdC5pbWFnZV9iYXNlNjRfZmFjZSAmJiAhb2NyUmVzdWx0LmltYWdlX2Jhc2U2NF9mYWNlLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UnKSkge1xuICAgICAgb2NyUmVzdWx0LmltYWdlX2Jhc2U2NF9mYWNlID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIG9jclJlc3VsdC5pbWFnZV9iYXNlNjRfZmFjZTtcbiAgICB9XG4gICAgY29uc3QgbmV3Rm9ybWF0S2V5TWFwQmFzZTY0SW1hZ2UgPSB7XG4gICAgICBpbWFnZV9iYXNlNjRfbWFzazogJ29jcl9tYXNraW5nX2ltYWdlJyxcbiAgICAgIGltYWdlX2Jhc2U2NF9mYWNlOiAnb2NyX2ZhY2VfaW1hZ2UnXG4gICAgfTtcbiAgICB0aGlzLl9fY29udmVydFNlcnZlclRvV2FzbUZvcm1hdChvY3JSZXN1bHQsIGJhc2U2NEltYWdlUmVzdWx0LCBuZXdGb3JtYXRLZXlNYXBCYXNlNjRJbWFnZSk7XG4gIH1cbiAgX19jb252ZXJ0TGVnYWN5Rm9ybWF0KG9iaiwgbGVnYWN5Rm9ybWF0LCBtYXApIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtYXApIHtcbiAgICAgIGxlZ2FjeUZvcm1hdFtrZXldID0gdHlwZW9mIG9ialttYXBba2V5XV0gPT09ICdvYmplY3QnID8ge1xuICAgICAgICAuLi5vYmpbbWFwW2tleV1dXG4gICAgICB9IDogb2JqW21hcFtrZXldXTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2FjeUZvcm1hdDtcbiAgfVxuICBfX2NvbnZlcnRTZXJ2ZXJUb1dhc21Gb3JtYXQob2JqLCB3YXNtRm9ybWF0LCBtYXApIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBtYXApIHtcbiAgICAgIGNvbnN0IHRhcmdldFZhbHVlID0gb2JqZWN0VXRpbC5nZXRPYmplY3RWYWx1ZVdpdGhEb3Qob2JqLCBrZXkpO1xuICAgICAgY29uc3QgdGFyZ2V0T2JqID0ge307XG4gICAgICBvYmplY3RVdGlsLm1ha2VPYmplY3RXaXRoRG90KHRhcmdldE9iaiwgbWFwW2tleV0sIHRhcmdldFZhbHVlKTtcbiAgICAgIG9iamVjdFV0aWwub2JqZWN0RGVlcE1lcmdlKHdhc21Gb3JtYXQsIHRhcmdldE9iaik7XG4gICAgfVxuICAgIHJldHVybiB3YXNtRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gb2NyUmVzdWx0XG4gICAqIEByZXR1cm4geyBuZXdGb3JtYXQsIGxlZ2FjeUZvcm1hdCwgbWFza0luZm8gfVxuICAgKi9cbiAgX19wYXJzZUlkRHJpdmVyKG9jclJlc3VsdCkge1xuICAgIC8vIFRPRE8gd2FzbeyXkOyEnCDsp4Dsm5DtlbTso7zripQgaWRUeXBlIOqwkuydtCDsl4bslrQg7J6E7J2YIOunpO2VkSAo7ZW07Jm4IOyXrOq2jOydtOuekSDsmbjqta3snbjrk7HroZ3spp0g6rWs67aE7JWI65CY64qUIOusuOygnCDsnojsnYwpXG4gICAgY29uc3QgaWRUeXBlID0gb2NyUmVzdWx0LnJlc3VsdF9zY2FuX3R5cGUgPyB0aGlzLlJFU1VMVF9TQ0FOX1RZUEVfTUFQW29jclJlc3VsdC5yZXN1bHRfc2Nhbl90eXBlXSA6IG9jclJlc3VsdC5kYXRhLmlkVHlwZTtcbiAgICBjb25zdCBmbGF0ID0gdGhpcy5mbGF0T2JqKG9jclJlc3VsdCk7XG5cbiAgICAvLyDso7zrr7zrsojtmLgg7ZiV7IudIDAwMDAwMC0wMDAwMDAwXG4gICAgY29uc3QganVtaW4gPSB0aGlzLmdldElkTnVtYmVyRm9ybWF0KGZsYXQuanVtaW4pO1xuXG4gICAgLy8gbmV3IGZvcm1hdCAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vIGlkIOqwneyytOyXkOyEnCBmbGF0IO2VmOqyjCDrp4zrk6Qg64yA7IOB65OkXG4gICAgY29uc3QgbmV3Rm9ybWF0S2V5cyA9IFsnY29tcGxldGUnLCAnbmFtZScsICdqdW1pbicsICdpc3N1ZWRfZGF0ZScsICdyZWdpb24nLCAnZm91bmRfZmFjZScsICdzcGVjdWxhcl9yYXRpbycsICdpZF90cnV0aCcsICdmZF9jb25maWRlbmNlJ107XG4gICAgY29uc3QgbmV3Rm9ybWF0ID0gXy5waWNrKGZsYXQsIG5ld0Zvcm1hdEtleXMpO1xuICAgIG5ld0Zvcm1hdC5jb21wbGV0ZSA9IG5ld0Zvcm1hdC5jb21wbGV0ZSArICcnO1xuICAgIG5ld0Zvcm1hdC5qdW1pbiA9IGp1bWluO1xuICAgIG5ld0Zvcm1hdC5pZF90cnV0aF9yZXRyeV9jb3VudCA9IDA7XG4gICAgbmV3Rm9ybWF0LnJlc3VsdF9zY2FuX3R5cGUgPSBpZFR5cGU7XG4gICAgbmV3Rm9ybWF0LmZkX2NvbmZpZGVuY2UgPSBmbGF0LmZkX2NvbmZpZGVuY2U/LnRvRml4ZWQoMykgKyAnJyA/PyAnJztcbiAgICBuZXdGb3JtYXQuZm91bmRfZmFjZSA9IGZsYXQuZm91bmRfZmFjZSArICcnO1xuICAgIG5ld0Zvcm1hdC5zcGVjdWxhcl9yYXRpbyA9IGZsYXQuc3BlY3VsYXJfcmF0aW8gKyAnJztcblxuICAgIC8vIOyjvOuvvOuTseuhneymnSDstpTqsIAg7KCV67O0IOyjvOyehVxuICAgIGlmIChpZFR5cGUgPT09ICcxJykgbmV3Rm9ybWF0Lm92ZXJzZWFzX3Jlc2lkZW50ID0gJ2ZhbHNlJztcblxuICAgIC8vIOyjvOuvvOuyiO2YuCDtmJXsi50g66as7YS06rCSIO2YleyLnSDrs4Dqsr0gLSBiaXJ0aCDstpTqsIAgLy8gVE9ETyA6IOyXrOq2jOydgCBiaXJ0aGRheT9cbiAgICBuZXdGb3JtYXQuYmlydGggPSBqdW1pbi5sZW5ndGggPj0gNiA/IGp1bWluLnNsaWNlKDAsIDYpIDogJyc7XG5cbiAgICAvLyDsmrTsoITrqbTtl4jspp3snbzrlYwg7LaU6rCAIOygleuztCDso7zsnoVcbiAgICBpZiAoaWRUeXBlID09PSAnMicpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmFsdWVcbiAgICAgIH0gPSB0aGlzLmdldERyaXZlckxpY2Vuc2UoZmxhdC5kcml2ZXJfbnVtYmVyKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAvLyBuZXdGb3JtYXQuaXNfb2xkX2Zvcm1hdF9kcml2ZXJfbnVtYmVyID0gaXNPbGRGb3JtYXQ7XG4gICAgICBuZXdGb3JtYXQuZHJpdmVyX251bWJlciA9IHZhbHVlO1xuICAgICAgbmV3Rm9ybWF0LmRyaXZlcl9zZXJpYWwgPSBmbGF0LmRyaXZlcl9zZXJpYWw7XG4gICAgICBuZXdGb3JtYXQuZHJpdmVyX3R5cGUgPSBmbGF0LmRyaXZlcl90eXBlO1xuICAgIH1cblxuICAgIC8vIGxlZ2FjeSBmb3JtYXQgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBjb25zdCBsZWdhY3lGb3JtYXQgPSB7XG4gICAgICBDb21wbGV0ZWQ6IG5ld0Zvcm1hdC5jb21wbGV0ZSxcbiAgICAgIHR5cGU6IGlkVHlwZSxcbiAgICAgIG5hbWU6IGZsYXQubmFtZSxcbiAgICAgIG51bWJlcjoganVtaW4sXG4gICAgICBEYXRlOiBmbGF0Lmlzc3VlZF9kYXRlLFxuICAgICAgcmVnaW9uOiBmbGF0LnJlZ2lvbixcbiAgICAgIHRydXRoOiBmbGF0LmlkX3RydXRoLFxuICAgICAgdHJ1dGhDb25maWRlbmNlOiBuZXdGb3JtYXQuZmRfY29uZmlkZW5jZSxcbiAgICAgIHRydXRoUmV0cnlDb3VudDogMCxcbiAgICAgIGZhY2Vfc2NvcmU6IG5ld0Zvcm1hdC5mb3VuZF9mYWNlLFxuICAgICAgc3BlY3VsYXI6IG5ld0Zvcm1hdC5zcGVjdWxhcl9yYXRpbyxcbiAgICAgIGlkX3R5cGU6IGlkVHlwZVxuICAgIH07XG5cbiAgICAvLyDsmrTsoITrqbTtl4jspp3snbzrlYwg7LaU6rCAIOygleuztCDso7zsnoVcbiAgICBsZWdhY3lGb3JtYXQubGljZW5zZU51bWJlciA9IG5ld0Zvcm1hdC5kcml2ZXJfbnVtYmVyO1xuICAgIGxlZ2FjeUZvcm1hdC5zZXJpYWwgPSBuZXdGb3JtYXQuZHJpdmVyX3NlcmlhbDtcbiAgICBsZWdhY3lGb3JtYXQubGljZW5zZVR5cGUgPSBuZXdGb3JtYXQuZHJpdmVyX3R5cGU7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ld0Zvcm1hdCxcbiAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgIG1hc2tJbmZvOiB0aGlzLmdldE1hc2tJbmZvKGZsYXQsIGlkVHlwZSlcbiAgICB9O1xuICB9XG4gIF9fcGFyc2VQYXNzcG9ydChvY3JSZXN1bHQpIHtcbiAgICAvLyBUT0RPIHdhc23sl5DshJwg7KeA7JuQ7ZW07KO864qUIGlkVHlwZSDqsJLsnbQg7JeG7Ja0IOyehOydmCDrp6TtlZEgKO2VtOyZuCDsl6zqtozsnbTrnpEg7Jm46rWt7J2465Ox66Gd7KadIOq1rOu2hOyViOuQmOuKlCDrrLjsoJwg7J6I7J2MKVxuICAgIGNvbnN0IGlkVHlwZSA9IHRoaXMuUkVTVUxUX1NDQU5fVFlQRV9NQVBbb2NyUmVzdWx0LnJlc3VsdF9zY2FuX3R5cGVdO1xuICAgIGNvbnN0IGZsYXQgPSB0aGlzLmZsYXRPYmoob2NyUmVzdWx0KTtcblxuICAgIC8vIOyjvOuvvOuyiO2YuCDtmJXsi50gMDAwMDAwLTAwMDAwMDBcbiAgICBjb25zdCBqdW1pbiA9IHRoaXMuZ2V0SWROdW1iZXJGb3JtYXQoZmxhdC5qdW1pbik7XG5cbiAgICAvLyBuZXcgZm9ybWF0ICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gaWQg6rCd7LK07JeQ7IScIGZsYXQg7ZWY6rKMIOunjOuTpCDrjIDsg4Hrk6RcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBuZXdGb3JtYXRLZXlzID0gWydjb21wbGV0ZScsICduYW1lJywgJ3N1cl9uYW1lJywgJ2dpdmVuX25hbWUnLCAncGFzc3BvcnRfdHlwZScsICdpc3N1aW5nX2NvdW50cnknLCAncGFzc3BvcnRfbnVtYmVyJywgJ25hdGlvbmFsaXR5JywgJ2lzc3VlZF9kYXRlJywgJ3NleCcsICdleHBpcnlfZGF0ZScsICdwZXJzb25hbF9udW1iZXInLCAnanVtaW4nLCAnYmlydGhkYXknLCAnbmFtZV9rb3InLCAnY29sb3JfcG9pbnQnLCAnZm91bmRfZmFjZScsICdzcGVjdWxhcl9yYXRpbycsICdtcnoxJywgJ21yejInLCAnaWRfdHJ1dGgnLCAnZmRfY29uZmlkZW5jZSddO1xuICAgIGNvbnN0IG5ld0Zvcm1hdCA9IF8ucGljayhmbGF0LCBuZXdGb3JtYXRLZXlzKTtcbiAgICBuZXdGb3JtYXQuY29tcGxldGUgPSBuZXdGb3JtYXQuY29tcGxldGUgKyAnJztcbiAgICBuZXdGb3JtYXQuanVtaW4gPSBqdW1pbjtcbiAgICBuZXdGb3JtYXQuaWRfdHJ1dGhfcmV0cnlfY291bnQgPSAwO1xuICAgIG5ld0Zvcm1hdC5yZXN1bHRfc2Nhbl90eXBlID0gaWRUeXBlO1xuICAgIG5ld0Zvcm1hdC5mZF9jb25maWRlbmNlID0gZmxhdC5mZF9jb25maWRlbmNlPy50b0ZpeGVkKDMpICsgJycgPz8gJyc7XG4gICAgbmV3Rm9ybWF0LmZvdW5kX2ZhY2UgPSBmbGF0LmZvdW5kX2ZhY2UgKyAnJztcbiAgICBuZXdGb3JtYXQuc3BlY3VsYXJfcmF0aW8gPSBmbGF0LnNwZWN1bGFyX3JhdGlvICsgJyc7XG5cbiAgICAvLyBsZWdhY3kgZm9ybWF0ICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgY29uc3QgbGVnYWN5Rm9ybWF0ID0ge1xuICAgICAgQ29tcGxldGVkOiBuZXdGb3JtYXQuY29tcGxldGUsXG4gICAgICBuYW1lOiBmbGF0Lm5hbWUsXG4gICAgICBzdXJOYW1lOiBmbGF0LnN1cl9uYW1lLFxuICAgICAgZ2l2ZW5OYW1lOiBmbGF0LmdpdmVuX25hbWUsXG4gICAgICB0eXBlOiBmbGF0LnBhc3Nwb3J0X3R5cGUsXG4gICAgICBpc3N1aW5nX2NvdW50cnk6IGZsYXQuaXNzdWluZ19jb3VudHJ5LFxuICAgICAgcGFzc3BvcnRfbm86IGZsYXQucGFzc3BvcnRfbnVtYmVyLFxuICAgICAgbmF0aW9uYWxpdHk6IGZsYXQubmF0aW9uYWxpdHksXG4gICAgICBkYXRlX29mX2lzc3VlOiBmbGF0Lmlzc3VlZF9kYXRlLFxuICAgICAgc2V4OiBmbGF0LnNleCxcbiAgICAgIGRhdGVfb2ZfZXhwaXJ5OiBmbGF0LmV4cGlyeV9kYXRlLFxuICAgICAgcGVyc29uYWxfbm86IGZsYXQucGVyc29uYWxfbnVtYmVyLFxuICAgICAgbnVtYmVyOiBqdW1pbixcbiAgICAgIGRhdGVfb2ZfYmlydGg6IGZsYXQuYmlydGhkYXksXG4gICAgICBuYW1lX2tvcjogZmxhdC5uYW1lX2tvcixcbiAgICAgIG1yejE6IGZsYXQubXJ6MSxcbiAgICAgIG1yejI6IGZsYXQubXJ6MixcbiAgICAgIGZhY2Vfc2NvcmU6IG5ld0Zvcm1hdC5mb3VuZF9mYWNlLFxuICAgICAgc3BlY3VsYXI6IG5ld0Zvcm1hdC5zcGVjdWxhcl9yYXRpbyxcbiAgICAgIGlkX3R5cGU6IGlkVHlwZSxcbiAgICAgIHRydXRoOiBmbGF0LmlkX3RydXRoLFxuICAgICAgdHJ1dGhDb25maWRlbmNlOiBuZXdGb3JtYXQuZmRfY29uZmlkZW5jZSxcbiAgICAgIHRydXRoUmV0cnlDb3VudDogMFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ld0Zvcm1hdCxcbiAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgIG1hc2tJbmZvOiB0aGlzLmdldE1hc2tJbmZvKGZsYXQsIGlkVHlwZSlcbiAgICB9O1xuICB9XG4gIF9fcGFyc2VBbGllbihvY3JSZXN1bHQpIHtcbiAgICAvLyBUT0RPIHdhc23sl5DshJwg7KeA7JuQ7ZW07KO864qUIGlkVHlwZSDqsJLsnbQg7JeG7Ja0IOyehOydmCDrp6TtlZEgKO2VtOyZuCDsl6zqtozsnbTrnpEg7Jm46rWt7J2465Ox66Gd7KadIOq1rOu2hOyViOuQmOuKlCDrrLjsoJwg7J6I7J2MKVxuICAgIGNvbnN0IGlkVHlwZSA9IHRoaXMuUkVTVUxUX1NDQU5fVFlQRV9NQVBbb2NyUmVzdWx0LnJlc3VsdF9zY2FuX3R5cGVdO1xuICAgIGNvbnN0IGRlZmF1bHRPYmogPSB7XG4gICAgICBuYXRpb25hbGl0eTogJycsXG4gICAgICB2aXNhX3R5cGU6ICcnLFxuICAgICAgbmFtZV9rb3I6ICcnXG4gICAgfTtcbiAgICBjb25zdCBmbGF0ID0gXy5hc3NpZ24oZGVmYXVsdE9iaiwgdGhpcy5mbGF0T2JqKG9jclJlc3VsdCkpO1xuXG4gICAgLy8g7KO866+867KI7Zi4IO2YleyLnSAwMDAwMDAtMDAwMDAwMFxuICAgIGNvbnN0IGp1bWluID0gdGhpcy5nZXRJZE51bWJlckZvcm1hdChmbGF0Lmp1bWluKTtcblxuICAgIC8vIG5ldyBmb3JtYXQgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyBpZCDqsJ3ssrTsl5DshJwgZmxhdCDtlZjqsowg66eM65OkIOuMgOyDgeuTpFxuICAgIGNvbnN0IG5ld0Zvcm1hdEtleXMgPSBbJ2NvbXBsZXRlJywgJ25hbWUnLCAnanVtaW4nLCAnaXNzdWVkX2RhdGUnLCAnbmF0aW9uYWxpdHknLCAndmlzYV90eXBlJywgJ25hbWVfa29yJywgJ2ZvdW5kX2ZhY2UnLCAnc3BlY3VsYXJfcmF0aW8nLCAnaWRfdHJ1dGgnLCAnZmRfY29uZmlkZW5jZSddO1xuICAgIGNvbnN0IG5ld0Zvcm1hdCA9IF8ucGljayhmbGF0LCBuZXdGb3JtYXRLZXlzKTtcbiAgICBuZXdGb3JtYXQuY29tcGxldGUgPSBuZXdGb3JtYXQuY29tcGxldGUgKyAnJztcbiAgICBuZXdGb3JtYXQuanVtaW4gPSBqdW1pbjtcbiAgICBuZXdGb3JtYXQuaWRfdHJ1dGhfcmV0cnlfY291bnQgPSAwO1xuICAgIG5ld0Zvcm1hdC5yZXN1bHRfc2Nhbl90eXBlID0gaWRUeXBlO1xuICAgIG5ld0Zvcm1hdC5mZF9jb25maWRlbmNlID0gZmxhdC5mZF9jb25maWRlbmNlPy50b0ZpeGVkKDMpICsgJycgPz8gJyc7XG4gICAgbmV3Rm9ybWF0LmZvdW5kX2ZhY2UgPSBmbGF0LmZvdW5kX2ZhY2UgKyAnJztcbiAgICBuZXdGb3JtYXQuc3BlY3VsYXJfcmF0aW8gPSBmbGF0LnNwZWN1bGFyX3JhdGlvICsgJyc7XG4gICAgY29uc3QgbGVnYWN5Rm9ybWF0ID0ge1xuICAgICAgQ29tcGxldGVkOiBuZXdGb3JtYXQuY29tcGxldGUsXG4gICAgICBuYW1lOiBmbGF0Lm5hbWUsXG4gICAgICBudW1iZXI6IGp1bWluLFxuICAgICAgRGF0ZTogZmxhdC5pc3N1ZWRfZGF0ZSxcbiAgICAgIG5hdGlvbmFsaXR5OiBmbGF0Lm5hdGlvbmFsaXR5ID8/ICcnLFxuICAgICAgdmlzYVR5cGU6IGZsYXQudmlzYV90eXBlID8/ICcnLFxuICAgICAgbmFtZV9rb3I6IGZsYXQubmFtZV9rb3IgPz8gJycsXG4gICAgICBmYWNlX3Njb3JlOiBuZXdGb3JtYXQuZm91bmRfZmFjZSxcbiAgICAgIHNwZWN1bGFyOiBuZXdGb3JtYXQuc3BlY3VsYXJfcmF0aW8sXG4gICAgICBpZF90eXBlOiBpZFR5cGUsXG4gICAgICB0cnV0aDogZmxhdC5pZF90cnV0aCxcbiAgICAgIHRydXRoQ29uZmlkZW5jZTogbmV3Rm9ybWF0LmZkX2NvbmZpZGVuY2UsXG4gICAgICB0cnV0aFJldHJ5Q291bnQ6IDBcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBuZXdGb3JtYXQsXG4gICAgICBsZWdhY3lGb3JtYXQsXG4gICAgICBtYXNrSW5mbzogdGhpcy5nZXRNYXNrSW5mbyhmbGF0LCBpZFR5cGUpXG4gICAgfTtcbiAgfVxuICBfX3BhcnNlQ3JlZGl0KG9jclJlc3VsdCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHt9O1xuICAgIGNvbnN0IHJlc3VsdFNwbGl0ID0gb2NyUmVzdWx0LnNwbGl0KCcsJyk7XG4gICAgbGV0IHJlc3VsdEluZGV4ID0gMDtcbiAgICBpZiAocmVzdWx0SW5kZXggPCByZXN1bHRTcGxpdC5sZW5ndGgpIHRhcmdldC5Db21wbGV0ZWQgPSByZXN1bHRTcGxpdFtyZXN1bHRJbmRleF0sIHJlc3VsdEluZGV4Kys7XG4gICAgaWYgKHJlc3VsdEluZGV4IDwgcmVzdWx0U3BsaXQubGVuZ3RoKSB0YXJnZXQubnVtYmVyID0gcmVzdWx0U3BsaXRbcmVzdWx0SW5kZXhdLCByZXN1bHRJbmRleCsrO1xuICAgIGlmIChyZXN1bHRJbmRleCA8IHJlc3VsdFNwbGl0Lmxlbmd0aCkgdGFyZ2V0LmV4cF9kYXRlID0gcmVzdWx0U3BsaXRbcmVzdWx0SW5kZXhdLCByZXN1bHRJbmRleCsrO1xuICAgIHJldHVybiBbdGFyZ2V0LCB0YXJnZXRdO1xuICB9XG4gIGdldE1hc2tJbmZvKG9iaiwgaWRUeXBlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgdHlwZTogdGhpcy5SRVNVTFRfTUFTS0lOR19UWVBFX01BUFtpZFR5cGUgKyAnJ11cbiAgICB9O1xuICAgIHRoaXMuTUFTS19JTkZPLmZvckVhY2goZWwgPT4ge1xuICAgICAgaWYgKF8uaGFzKG9iaiwgZWwpICYmIG9ialtlbF0gIT09ICcwLDAsMCwwJykge1xuICAgICAgICByZXN1bHRbZWxdID0gb2JqW2VsXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGdldERyaXZlckxpY2Vuc2UodmFsdWUpIHtcbiAgICAvLyDqtaztmJUg66m07ZeI7KadIO2PrOuppyDtjJDsoJUgKGV4OiDsoJzso7wgMTMtMDAxMjM0LTEyIC0+IHRydWUpXG4gICAgY29uc3QgcmVnZXggPSAvW+qwgC3tnqNdL2c7XG4gICAgY29uc3QgaXNPbGRGb3JtYXQgPSB2YWx1ZT8ubWF0Y2gocmVnZXgpO1xuICAgIGlmIChpc09sZEZvcm1hdCkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNPbGRGb3JtYXQsXG4gICAgICB2YWx1ZVxuICAgIH07XG4gIH1cblxuICAvLyDso7zrr7zrsojtmLgg7ZiV7IudIOumrO2EtOqwkiDtmJXsi50g67OA6rK9XG4gIGdldElkTnVtYmVyRm9ybWF0KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlPy5sZW5ndGggPT09IDE0KSByZXR1cm4gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlPy5sZW5ndGggPT09IDEzID8gdmFsdWUuc2xpY2UoMCwgNikgKyAnLScgKyB2YWx1ZS5zbGljZSg2LCAxMykgOiAnJztcbiAgfVxuICBmbGF0T2JqKG9iaikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgaW5uZXJSZXN1bHQgPSB0aGlzLmZsYXRPYmoodmFsdWUpO1xuICAgICAgICBfLmFzc2lnbihyZXN1bHQsIGlubmVyUmVzdWx0KTtcbiAgICAgIH0gZWxzZSByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgT2NyUmVzdWx0UGFyc2VyKCk7Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLE9BQU9BLFVBQVUsTUFBTSxrQkFBa0I7O0FBRXpDO0FBQ0EsTUFBTUMsZUFBZSxDQUFDO0VBQUFDLFlBQUE7SUFBQUMsZUFBQSx3QkFDSixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztJQUFBQSxlQUFBLG9CQUMxSyxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLDBCQUEwQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFLDRCQUE0QixFQUFFLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDO0lBQUFBLGVBQUEsK0JBQzdMO01BQ3JCQyxxQkFBcUIsRUFBRSxHQUFHO01BQzFCQyxjQUFjLEVBQUUsR0FBRztNQUNuQkMsUUFBUSxFQUFFLEdBQUc7TUFDYkMsZ0JBQWdC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
