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
    var data = ocrResult.data;
    if (data.image_base64_mask && !data.image_base64_mask.startsWith('data:image')) {
      data.image_base64_mask = 'data:image/jpeg;base64,' + data.image_base64_mask;
    }
    if (data.image_base64_face && !data.image_base64_face.startsWith('data:image')) {
      data.image_base64_face = 'data:image/jpeg;base64,' + data.image_base64_face;
    }
    var newFormatKeyMapBase64Image = {
      image_base64_mask: 'ocr_masking_image',
      image_base64_face: 'ocr_face_image'
    };
    this.__convertServerToWasmFormat(ocrResult.data, base64ImageResult, newFormatKeyMapBase64Image);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy91c2ViLW9jci1hcGktcGFyc2VyLmpzIiwibmFtZXMiOlsib2JqZWN0VXRpbCIsIk9jclJlc3VsdFBhcnNlciIsImNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnR5IiwiUkVTSURFTlRfUkVHSVNUUkFUSU9OIiwiRFJJVkVSX0xJQ0VOU0UiLCJQQVNTUE9SVCIsIlBBU1NQT1JUX09WRVJTRUEiLCJBTElFTl9SRUdJU1RSQVRJT04iLCJBTElFTl9SRUdJU1RSQVRJT05fMSIsIkFMSUVOX1JFR0lTVFJBVElPTl8yIiwiQUxJRU5fUkVHSVNUUkFUSU9OXzMiLCJwYXJzZU9jclJlc3VsdCIsIm9jclR5cGUiLCJzc2FNb2RlIiwib2NyUmVzdWx0IiwiX19vY3JUeXBlTGlzdCIsImluY2x1ZGVzIiwiRXJyb3IiLCJsZWdhY3lGb3JtYXQiLCJuZXdGb3JtYXQiLCJtYXNrSW5mbyIsImJhc2U2NEltYWdlUmVzdWx0IiwiX19wYXJzZUJhc2U2NEltYWdlUmVzdWx0IiwicmVzdWx0IiwiX19wYXJzZUlkRHJpdmVyIiwiXyIsImFzc2lnbiIsInBhc3Nwb3J0X3Jlc3VsdCIsIl9fcGFyc2VQYXNzcG9ydCIsImFsaWVuX3Jlc3VsdCIsIl9fcGFyc2VBbGllbiIsIl9fcGFyc2VDcmVkaXQiLCJ0cnV0aCIsInRydXRoQ29uZmlkZW5jZSIsInRydXRoUmV0cnlDb3VudCIsImlkX3RydXRoIiwiZmRfY29uZmlkZW5jZSIsImlkX3RydXRoX3JldHJ5X2NvdW50IiwiZGF0YSIsImltYWdlX2Jhc2U2NF9tYXNrIiwic3RhcnRzV2l0aCIsImltYWdlX2Jhc2U2NF9mYWNlIiwibmV3Rm9ybWF0S2V5TWFwQmFzZTY0SW1hZ2UiLCJfX2NvbnZlcnRTZXJ2ZXJUb1dhc21Gb3JtYXQiLCJfX2NvbnZlcnRMZWdhY3lGb3JtYXQiLCJvYmoiLCJtYXAiLCJrZXkiLCJfb2JqZWN0U3ByZWFkIiwid2FzbUZvcm1hdCIsInRhcmdldFZhbHVlIiwiZ2V0T2JqZWN0VmFsdWVXaXRoRG90IiwidGFyZ2V0T2JqIiwibWFrZU9iamVjdFdpdGhEb3QiLCJvYmplY3REZWVwTWVyZ2UiLCJfcmVmIiwiX2ZsYXQkZmRfY29uZmlkZW5jZSIsImlkVHlwZSIsInJlc3VsdF9zY2FuX3R5cGUiLCJSRVNVTFRfU0NBTl9UWVBFX01BUCIsImZsYXQiLCJmbGF0T2JqIiwianVtaW4iLCJnZXRJZE51bWJlckZvcm1hdCIsIm5ld0Zvcm1hdEtleXMiLCJwaWNrIiwiY29tcGxldGUiLCJ0b0ZpeGVkIiwiZm91bmRfZmFjZSIsInNwZWN1bGFyX3JhdGlvIiwib3ZlcnNlYXNfcmVzaWRlbnQiLCJiaXJ0aCIsImxlbmd0aCIsInNsaWNlIiwidmFsdWUiLCJnZXREcml2ZXJMaWNlbnNlIiwiZHJpdmVyX251bWJlciIsImRyaXZlcl9zZXJpYWwiLCJkcml2ZXJfdHlwZSIsIkNvbXBsZXRlZCIsInR5cGUiLCJuYW1lIiwibnVtYmVyIiwiRGF0ZSIsImlzc3VlZF9kYXRlIiwicmVnaW9uIiwiZmFjZV9zY29yZSIsInNwZWN1bGFyIiwiaWRfdHlwZSIsImxpY2Vuc2VOdW1iZXIiLCJzZXJpYWwiLCJsaWNlbnNlVHlwZSIsImdldE1hc2tJbmZvIiwiX3JlZjIiLCJfZmxhdCRmZF9jb25maWRlbmNlMiIsInN1ck5hbWUiLCJzdXJfbmFtZSIsImdpdmVuTmFtZSIsImdpdmVuX25hbWUiLCJwYXNzcG9ydF90eXBlIiwiaXNzdWluZ19jb3VudHJ5IiwicGFzc3BvcnRfbm8iLCJwYXNzcG9ydF9udW1iZXIiLCJuYXRpb25hbGl0eSIsImRhdGVfb2ZfaXNzdWUiLCJzZXgiLCJkYXRlX29mX2V4cGlyeSIsImV4cGlyeV9kYXRlIiwicGVyc29uYWxfbm8iLCJwZXJzb25hbF9udW1iZXIiLCJkYXRlX29mX2JpcnRoIiwiYmlydGhkYXkiLCJuYW1lX2tvciIsIm1yejEiLCJtcnoyIiwiX3JlZjMiLCJfZmxhdCRmZF9jb25maWRlbmNlMyIsIl9mbGF0JG5hdGlvbmFsaXR5IiwiX2ZsYXQkdmlzYV90eXBlIiwiX2ZsYXQkbmFtZV9rb3IiLCJkZWZhdWx0T2JqIiwidmlzYV90eXBlIiwidmlzYVR5cGUiLCJ0YXJnZXQiLCJyZXN1bHRTcGxpdCIsInNwbGl0IiwicmVzdWx0SW5kZXgiLCJleHBfZGF0ZSIsIlJFU1VMVF9NQVNLSU5HX1RZUEVfTUFQIiwiTUFTS19JTkZPIiwiZm9yRWFjaCIsImVsIiwiaGFzIiwiX3ZhbHVlIiwicmVnZXgiLCJpc09sZEZvcm1hdCIsIm1hdGNoIiwicmVwbGFjZSIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImlubmVyUmVzdWx0Il0sInNvdXJjZXMiOlsiaGVscGVycy91c2ViLW9jci1hcGktcGFyc2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCBvYmplY3RVdGlsIGZyb20gJy4vb2JqZWN0LXV0aWwuanMnO1xuXG4vKiBnbG9iYWwtbW9kdWxlICovXG5jbGFzcyBPY3JSZXN1bHRQYXJzZXIge1xuICBfX29jclR5cGVMaXN0ID0gWydpZGNhcmQnLCAnZHJpdmVyJywgJ3Bhc3Nwb3J0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnYWxpZW4nLCAnY3JlZGl0JywgJ2lkY2FyZC1zc2EnLCAnZHJpdmVyLXNzYScsICdwYXNzcG9ydC1zc2EnLCAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnLCAnYWxpZW4tc3NhJywgJ2NyZWRpdC1zc2EnXTtcbiAgTUFTS19JTkZPID0gWydyZWN0X2lkX2lzc3VlX2RhdGUnLCAncmVjdF9pZF9udW1iZXInLCAncmVjdF9rb3JfcGVyc29uYWxfbnVtYmVyJywgJ3JlY3RfbGljZW5zZV9udW1iZXInLCAncmVjdF9vdmVyc2Vhc19yZXNpZGVudHMnLCAncmVjdF9wYXNzcG9ydF9qdW1pbl9udW1iZXInLCAncmVjdF9wYXNzcG9ydF9udW1iZXInLCAncmVjdF9wYXNzcG9ydF9udW1iZXJfbXJ6J107XG4gIFJFU1VMVF9TQ0FOX1RZUEVfTUFQID0ge1xuICAgIFJFU0lERU5UX1JFR0lTVFJBVElPTjogJzEnLFxuICAgIERSSVZFUl9MSUNFTlNFOiAnMicsXG4gICAgUEFTU1BPUlQ6ICczJyxcbiAgICBQQVNTUE9SVF9PVkVSU0VBOiAnNCcsXG4gICAgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgICBBTElFTl9SRUdJU1RSQVRJT046ICc1JyxcbiAgICBBTElFTl9SRUdJU1RSQVRJT05fMTogJzUtMScsXG4gICAgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgICBBTElFTl9SRUdJU1RSQVRJT05fMjogJzUtMicsXG4gICAgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgICBBTElFTl9SRUdJU1RSQVRJT05fMzogJzUtMycgLy8gVE9ETyDtmITsnqwgU0VSVkVSIFNESyDqtazrtoTslYjtlahcbiAgfTtcblxuICBSRVNVTFRfTUFTS0lOR19UWVBFX01BUCA9IHtcbiAgICAxOiAna29yJyxcbiAgICAyOiAnZHJpdmVyJyxcbiAgICAzOiAncGFzc3BvcnQnLFxuICAgIDQ6ICdwYXNzcG9ydC1vdmVyc2VhJyxcbiAgICAvLyBUT0RPIO2YhOyerCBTRVJWRVIgU0RLIOq1rOu2hOyViO2VqFxuICAgIDU6ICdhbGllbidcbiAgfTtcbiAgcGFyc2VPY3JSZXN1bHQob2NyVHlwZSwgc3NhTW9kZSwgb2NyUmVzdWx0KSB7XG4gICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignUmVzdWx0UGFyc2VyIDo6IFVuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgY29uc3QgbGVnYWN5Rm9ybWF0ID0ge30sXG4gICAgICBuZXdGb3JtYXQgPSB7fSxcbiAgICAgIG1hc2tJbmZvID0ge30sXG4gICAgICBiYXNlNjRJbWFnZVJlc3VsdCA9IHt9O1xuXG4gICAgLy8gYmFzZTY0IOyymOumrFxuICAgIHRoaXMuX19wYXJzZUJhc2U2NEltYWdlUmVzdWx0KG9jclJlc3VsdCwgYmFzZTY0SW1hZ2VSZXN1bHQpO1xuICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9fcGFyc2VJZERyaXZlcihvY3JSZXN1bHQpO1xuICAgICAgICBfLmFzc2lnbihuZXdGb3JtYXQsIHJlc3VsdC5uZXdGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihsZWdhY3lGb3JtYXQsIHJlc3VsdC5sZWdhY3lGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihtYXNrSW5mbywgcmVzdWx0Lm1hc2tJbmZvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgIGNvbnN0IHBhc3Nwb3J0X3Jlc3VsdCA9IHRoaXMuX19wYXJzZVBhc3Nwb3J0KG9jclJlc3VsdCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBfLmFzc2lnbihuZXdGb3JtYXQsIHBhc3Nwb3J0X3Jlc3VsdC5uZXdGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihsZWdhY3lGb3JtYXQsIHBhc3Nwb3J0X3Jlc3VsdC5sZWdhY3lGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihtYXNrSW5mbywgcGFzc3BvcnRfcmVzdWx0Lm1hc2tJbmZvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhbGllbic6XG4gICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgIGNvbnN0IGFsaWVuX3Jlc3VsdCA9IHRoaXMuX19wYXJzZUFsaWVuKG9jclJlc3VsdCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBfLmFzc2lnbihuZXdGb3JtYXQsIGFsaWVuX3Jlc3VsdC5uZXdGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihsZWdhY3lGb3JtYXQsIGFsaWVuX3Jlc3VsdC5sZWdhY3lGb3JtYXQpO1xuICAgICAgICBfLmFzc2lnbihtYXNrSW5mbywgYWxpZW5fcmVzdWx0Lm1hc2tJbmZvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgY2FzZSAnY3JlZGl0LXNzYSc6XG4gICAgICAgIHRoaXMuX19wYXJzZUNyZWRpdChvY3JSZXN1bHQsIGxlZ2FjeUZvcm1hdCwgbmV3Rm9ybWF0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgfVxuXG4gICAgLy8gU1NBIOyymOumrFxuICAgIGlmICghc3NhTW9kZSkge1xuICAgICAgZGVsZXRlIGxlZ2FjeUZvcm1hdC50cnV0aDtcbiAgICAgIGRlbGV0ZSBsZWdhY3lGb3JtYXQudHJ1dGhDb25maWRlbmNlO1xuICAgICAgZGVsZXRlIGxlZ2FjeUZvcm1hdC50cnV0aFJldHJ5Q291bnQ7XG4gICAgICBkZWxldGUgbmV3Rm9ybWF0LmlkX3RydXRoO1xuICAgICAgZGVsZXRlIG5ld0Zvcm1hdC5mZF9jb25maWRlbmNlO1xuICAgICAgZGVsZXRlIG5ld0Zvcm1hdC5pZF90cnV0aF9yZXRyeV9jb3VudDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgIG5ld0Zvcm1hdCxcbiAgICAgIGJhc2U2NEltYWdlUmVzdWx0LFxuICAgICAgbWFza0luZm9cbiAgICB9O1xuICB9XG4gIF9fcGFyc2VCYXNlNjRJbWFnZVJlc3VsdChvY3JSZXN1bHQsIGJhc2U2NEltYWdlUmVzdWx0KSB7XG4gICAgY29uc3QgZGF0YSA9IG9jclJlc3VsdC5kYXRhO1xuICAgIGlmIChkYXRhLmltYWdlX2Jhc2U2NF9tYXNrICYmICFkYXRhLmltYWdlX2Jhc2U2NF9tYXNrLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UnKSkge1xuICAgICAgZGF0YS5pbWFnZV9iYXNlNjRfbWFzayA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBkYXRhLmltYWdlX2Jhc2U2NF9tYXNrO1xuICAgIH1cbiAgICBpZiAoZGF0YS5pbWFnZV9iYXNlNjRfZmFjZSAmJiAhZGF0YS5pbWFnZV9iYXNlNjRfZmFjZS5zdGFydHNXaXRoKCdkYXRhOmltYWdlJykpIHtcbiAgICAgIGRhdGEuaW1hZ2VfYmFzZTY0X2ZhY2UgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgZGF0YS5pbWFnZV9iYXNlNjRfZmFjZTtcbiAgICB9XG4gICAgY29uc3QgbmV3Rm9ybWF0S2V5TWFwQmFzZTY0SW1hZ2UgPSB7XG4gICAgICBpbWFnZV9iYXNlNjRfbWFzazogJ29jcl9tYXNraW5nX2ltYWdlJyxcbiAgICAgIGltYWdlX2Jhc2U2NF9mYWNlOiAnb2NyX2ZhY2VfaW1hZ2UnXG4gICAgfTtcbiAgICB0aGlzLl9fY29udmVydFNlcnZlclRvV2FzbUZvcm1hdChvY3JSZXN1bHQuZGF0YSwgYmFzZTY0SW1hZ2VSZXN1bHQsIG5ld0Zvcm1hdEtleU1hcEJhc2U2NEltYWdlKTtcbiAgfVxuICBfX2NvbnZlcnRMZWdhY3lGb3JtYXQob2JqLCBsZWdhY3lGb3JtYXQsIG1hcCkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG1hcCkge1xuICAgICAgbGVnYWN5Rm9ybWF0W2tleV0gPSB0eXBlb2Ygb2JqW21hcFtrZXldXSA9PT0gJ29iamVjdCcgPyB7XG4gICAgICAgIC4uLm9ialttYXBba2V5XV1cbiAgICAgIH0gOiBvYmpbbWFwW2tleV1dO1xuICAgIH1cbiAgICByZXR1cm4gbGVnYWN5Rm9ybWF0O1xuICB9XG4gIF9fY29udmVydFNlcnZlclRvV2FzbUZvcm1hdChvYmosIHdhc21Gb3JtYXQsIG1hcCkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG1hcCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmFsdWUgPSBvYmplY3RVdGlsLmdldE9iamVjdFZhbHVlV2l0aERvdChvYmosIGtleSk7XG4gICAgICBjb25zdCB0YXJnZXRPYmogPSB7fTtcbiAgICAgIG9iamVjdFV0aWwubWFrZU9iamVjdFdpdGhEb3QodGFyZ2V0T2JqLCBtYXBba2V5XSwgdGFyZ2V0VmFsdWUpO1xuICAgICAgb2JqZWN0VXRpbC5vYmplY3REZWVwTWVyZ2Uod2FzbUZvcm1hdCwgdGFyZ2V0T2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIHdhc21Gb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBvY3JSZXN1bHRcbiAgICogQHJldHVybiB7IG5ld0Zvcm1hdCwgbGVnYWN5Rm9ybWF0LCBtYXNrSW5mbyB9XG4gICAqL1xuICBfX3BhcnNlSWREcml2ZXIob2NyUmVzdWx0KSB7XG4gICAgLy8gVE9ETyB3YXNt7JeQ7IScIOyngOybkO2VtOyjvOuKlCBpZFR5cGUg6rCS7J20IOyXhuyWtCDsnoTsnZgg66ek7ZWRICjtlbTsmbgg7Jes6raM7J20656RIOyZuOq1reyduOuTseuhneymnSDqtazrtoTslYjrkJjripQg66y47KCcIOyeiOydjClcbiAgICBjb25zdCBpZFR5cGUgPSBvY3JSZXN1bHQucmVzdWx0X3NjYW5fdHlwZSA/IHRoaXMuUkVTVUxUX1NDQU5fVFlQRV9NQVBbb2NyUmVzdWx0LnJlc3VsdF9zY2FuX3R5cGVdIDogb2NyUmVzdWx0LmRhdGEuaWRUeXBlO1xuICAgIGNvbnN0IGZsYXQgPSB0aGlzLmZsYXRPYmoob2NyUmVzdWx0KTtcblxuICAgIC8vIOyjvOuvvOuyiO2YuCDtmJXsi50gMDAwMDAwLTAwMDAwMDBcbiAgICBjb25zdCBqdW1pbiA9IHRoaXMuZ2V0SWROdW1iZXJGb3JtYXQoZmxhdC5qdW1pbik7XG5cbiAgICAvLyBuZXcgZm9ybWF0ICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gaWQg6rCd7LK07JeQ7IScIGZsYXQg7ZWY6rKMIOunjOuTpCDrjIDsg4Hrk6RcbiAgICBjb25zdCBuZXdGb3JtYXRLZXlzID0gWydjb21wbGV0ZScsICduYW1lJywgJ2p1bWluJywgJ2lzc3VlZF9kYXRlJywgJ3JlZ2lvbicsICdmb3VuZF9mYWNlJywgJ3NwZWN1bGFyX3JhdGlvJywgJ2lkX3RydXRoJywgJ2ZkX2NvbmZpZGVuY2UnXTtcbiAgICBjb25zdCBuZXdGb3JtYXQgPSBfLnBpY2soZmxhdCwgbmV3Rm9ybWF0S2V5cyk7XG4gICAgbmV3Rm9ybWF0LmNvbXBsZXRlID0gbmV3Rm9ybWF0LmNvbXBsZXRlICsgJyc7XG4gICAgbmV3Rm9ybWF0Lmp1bWluID0ganVtaW47XG4gICAgbmV3Rm9ybWF0LmlkX3RydXRoX3JldHJ5X2NvdW50ID0gMDtcbiAgICBuZXdGb3JtYXQucmVzdWx0X3NjYW5fdHlwZSA9IGlkVHlwZTtcbiAgICBuZXdGb3JtYXQuZmRfY29uZmlkZW5jZSA9IGZsYXQuZmRfY29uZmlkZW5jZT8udG9GaXhlZCgzKSArICcnID8/ICcnO1xuICAgIG5ld0Zvcm1hdC5mb3VuZF9mYWNlID0gZmxhdC5mb3VuZF9mYWNlICsgJyc7XG4gICAgbmV3Rm9ybWF0LnNwZWN1bGFyX3JhdGlvID0gZmxhdC5zcGVjdWxhcl9yYXRpbyArICcnO1xuXG4gICAgLy8g7KO866+865Ox66Gd7KadIOy2lOqwgCDsoJXrs7Qg7KO87J6FXG4gICAgaWYgKGlkVHlwZSA9PT0gJzEnKSBuZXdGb3JtYXQub3ZlcnNlYXNfcmVzaWRlbnQgPSAnZmFsc2UnO1xuXG4gICAgLy8g7KO866+867KI7Zi4IO2YleyLnSDrpqzthLTqsJIg7ZiV7IudIOuzgOqyvSAtIGJpcnRoIOy2lOqwgCAvLyBUT0RPIDog7Jes6raM7J2AIGJpcnRoZGF5P1xuICAgIG5ld0Zvcm1hdC5iaXJ0aCA9IGp1bWluLmxlbmd0aCA+PSA2ID8ganVtaW4uc2xpY2UoMCwgNikgOiAnJztcblxuICAgIC8vIOyatOyghOuptO2XiOymneydvOuVjCDstpTqsIAg7KCV67O0IOyjvOyehVxuICAgIGlmIChpZFR5cGUgPT09ICcyJykge1xuICAgICAgY29uc3Qge1xuICAgICAgICB2YWx1ZVxuICAgICAgfSA9IHRoaXMuZ2V0RHJpdmVyTGljZW5zZShmbGF0LmRyaXZlcl9udW1iZXIpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIC8vIG5ld0Zvcm1hdC5pc19vbGRfZm9ybWF0X2RyaXZlcl9udW1iZXIgPSBpc09sZEZvcm1hdDtcbiAgICAgIG5ld0Zvcm1hdC5kcml2ZXJfbnVtYmVyID0gdmFsdWU7XG4gICAgICBuZXdGb3JtYXQuZHJpdmVyX3NlcmlhbCA9IGZsYXQuZHJpdmVyX3NlcmlhbDtcbiAgICAgIG5ld0Zvcm1hdC5kcml2ZXJfdHlwZSA9IGZsYXQuZHJpdmVyX3R5cGU7XG4gICAgfVxuXG4gICAgLy8gbGVnYWN5IGZvcm1hdCAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIGNvbnN0IGxlZ2FjeUZvcm1hdCA9IHtcbiAgICAgIENvbXBsZXRlZDogbmV3Rm9ybWF0LmNvbXBsZXRlLFxuICAgICAgdHlwZTogaWRUeXBlLFxuICAgICAgbmFtZTogZmxhdC5uYW1lLFxuICAgICAgbnVtYmVyOiBqdW1pbixcbiAgICAgIERhdGU6IGZsYXQuaXNzdWVkX2RhdGUsXG4gICAgICByZWdpb246IGZsYXQucmVnaW9uLFxuICAgICAgdHJ1dGg6IGZsYXQuaWRfdHJ1dGgsXG4gICAgICB0cnV0aENvbmZpZGVuY2U6IG5ld0Zvcm1hdC5mZF9jb25maWRlbmNlLFxuICAgICAgdHJ1dGhSZXRyeUNvdW50OiAwLFxuICAgICAgZmFjZV9zY29yZTogbmV3Rm9ybWF0LmZvdW5kX2ZhY2UsXG4gICAgICBzcGVjdWxhcjogbmV3Rm9ybWF0LnNwZWN1bGFyX3JhdGlvLFxuICAgICAgaWRfdHlwZTogaWRUeXBlXG4gICAgfTtcblxuICAgIC8vIOyatOyghOuptO2XiOymneydvOuVjCDstpTqsIAg7KCV67O0IOyjvOyehVxuICAgIGxlZ2FjeUZvcm1hdC5saWNlbnNlTnVtYmVyID0gbmV3Rm9ybWF0LmRyaXZlcl9udW1iZXI7XG4gICAgbGVnYWN5Rm9ybWF0LnNlcmlhbCA9IG5ld0Zvcm1hdC5kcml2ZXJfc2VyaWFsO1xuICAgIGxlZ2FjeUZvcm1hdC5saWNlbnNlVHlwZSA9IG5ld0Zvcm1hdC5kcml2ZXJfdHlwZTtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3Rm9ybWF0LFxuICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgbWFza0luZm86IHRoaXMuZ2V0TWFza0luZm8oZmxhdCwgaWRUeXBlKVxuICAgIH07XG4gIH1cbiAgX19wYXJzZVBhc3Nwb3J0KG9jclJlc3VsdCkge1xuICAgIC8vIFRPRE8gd2FzbeyXkOyEnCDsp4Dsm5DtlbTso7zripQgaWRUeXBlIOqwkuydtCDsl4bslrQg7J6E7J2YIOunpO2VkSAo7ZW07Jm4IOyXrOq2jOydtOuekSDsmbjqta3snbjrk7HroZ3spp0g6rWs67aE7JWI65CY64qUIOusuOygnCDsnojsnYwpXG4gICAgY29uc3QgaWRUeXBlID0gdGhpcy5SRVNVTFRfU0NBTl9UWVBFX01BUFtvY3JSZXN1bHQucmVzdWx0X3NjYW5fdHlwZV07XG4gICAgY29uc3QgZmxhdCA9IHRoaXMuZmxhdE9iaihvY3JSZXN1bHQpO1xuXG4gICAgLy8g7KO866+867KI7Zi4IO2YleyLnSAwMDAwMDAtMDAwMDAwMFxuICAgIGNvbnN0IGp1bWluID0gdGhpcy5nZXRJZE51bWJlckZvcm1hdChmbGF0Lmp1bWluKTtcblxuICAgIC8vIG5ldyBmb3JtYXQgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyBpZCDqsJ3ssrTsl5DshJwgZmxhdCDtlZjqsowg66eM65OkIOuMgOyDgeuTpFxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IG5ld0Zvcm1hdEtleXMgPSBbJ2NvbXBsZXRlJywgJ25hbWUnLCAnc3VyX25hbWUnLCAnZ2l2ZW5fbmFtZScsICdwYXNzcG9ydF90eXBlJywgJ2lzc3VpbmdfY291bnRyeScsICdwYXNzcG9ydF9udW1iZXInLCAnbmF0aW9uYWxpdHknLCAnaXNzdWVkX2RhdGUnLCAnc2V4JywgJ2V4cGlyeV9kYXRlJywgJ3BlcnNvbmFsX251bWJlcicsICdqdW1pbicsICdiaXJ0aGRheScsICduYW1lX2tvcicsICdjb2xvcl9wb2ludCcsICdmb3VuZF9mYWNlJywgJ3NwZWN1bGFyX3JhdGlvJywgJ21yejEnLCAnbXJ6MicsICdpZF90cnV0aCcsICdmZF9jb25maWRlbmNlJ107XG4gICAgY29uc3QgbmV3Rm9ybWF0ID0gXy5waWNrKGZsYXQsIG5ld0Zvcm1hdEtleXMpO1xuICAgIG5ld0Zvcm1hdC5jb21wbGV0ZSA9IG5ld0Zvcm1hdC5jb21wbGV0ZSArICcnO1xuICAgIG5ld0Zvcm1hdC5qdW1pbiA9IGp1bWluO1xuICAgIG5ld0Zvcm1hdC5pZF90cnV0aF9yZXRyeV9jb3VudCA9IDA7XG4gICAgbmV3Rm9ybWF0LnJlc3VsdF9zY2FuX3R5cGUgPSBpZFR5cGU7XG4gICAgbmV3Rm9ybWF0LmZkX2NvbmZpZGVuY2UgPSBmbGF0LmZkX2NvbmZpZGVuY2U/LnRvRml4ZWQoMykgKyAnJyA/PyAnJztcbiAgICBuZXdGb3JtYXQuZm91bmRfZmFjZSA9IGZsYXQuZm91bmRfZmFjZSArICcnO1xuICAgIG5ld0Zvcm1hdC5zcGVjdWxhcl9yYXRpbyA9IGZsYXQuc3BlY3VsYXJfcmF0aW8gKyAnJztcblxuICAgIC8vIGxlZ2FjeSBmb3JtYXQgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBjb25zdCBsZWdhY3lGb3JtYXQgPSB7XG4gICAgICBDb21wbGV0ZWQ6IG5ld0Zvcm1hdC5jb21wbGV0ZSxcbiAgICAgIG5hbWU6IGZsYXQubmFtZSxcbiAgICAgIHN1ck5hbWU6IGZsYXQuc3VyX25hbWUsXG4gICAgICBnaXZlbk5hbWU6IGZsYXQuZ2l2ZW5fbmFtZSxcbiAgICAgIHR5cGU6IGZsYXQucGFzc3BvcnRfdHlwZSxcbiAgICAgIGlzc3VpbmdfY291bnRyeTogZmxhdC5pc3N1aW5nX2NvdW50cnksXG4gICAgICBwYXNzcG9ydF9ubzogZmxhdC5wYXNzcG9ydF9udW1iZXIsXG4gICAgICBuYXRpb25hbGl0eTogZmxhdC5uYXRpb25hbGl0eSxcbiAgICAgIGRhdGVfb2ZfaXNzdWU6IGZsYXQuaXNzdWVkX2RhdGUsXG4gICAgICBzZXg6IGZsYXQuc2V4LFxuICAgICAgZGF0ZV9vZl9leHBpcnk6IGZsYXQuZXhwaXJ5X2RhdGUsXG4gICAgICBwZXJzb25hbF9ubzogZmxhdC5wZXJzb25hbF9udW1iZXIsXG4gICAgICBudW1iZXI6IGp1bWluLFxuICAgICAgZGF0ZV9vZl9iaXJ0aDogZmxhdC5iaXJ0aGRheSxcbiAgICAgIG5hbWVfa29yOiBmbGF0Lm5hbWVfa29yLFxuICAgICAgbXJ6MTogZmxhdC5tcnoxLFxuICAgICAgbXJ6MjogZmxhdC5tcnoyLFxuICAgICAgZmFjZV9zY29yZTogbmV3Rm9ybWF0LmZvdW5kX2ZhY2UsXG4gICAgICBzcGVjdWxhcjogbmV3Rm9ybWF0LnNwZWN1bGFyX3JhdGlvLFxuICAgICAgaWRfdHlwZTogaWRUeXBlLFxuICAgICAgdHJ1dGg6IGZsYXQuaWRfdHJ1dGgsXG4gICAgICB0cnV0aENvbmZpZGVuY2U6IG5ld0Zvcm1hdC5mZF9jb25maWRlbmNlLFxuICAgICAgdHJ1dGhSZXRyeUNvdW50OiAwXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3Rm9ybWF0LFxuICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgbWFza0luZm86IHRoaXMuZ2V0TWFza0luZm8oZmxhdCwgaWRUeXBlKVxuICAgIH07XG4gIH1cbiAgX19wYXJzZUFsaWVuKG9jclJlc3VsdCkge1xuICAgIC8vIFRPRE8gd2FzbeyXkOyEnCDsp4Dsm5DtlbTso7zripQgaWRUeXBlIOqwkuydtCDsl4bslrQg7J6E7J2YIOunpO2VkSAo7ZW07Jm4IOyXrOq2jOydtOuekSDsmbjqta3snbjrk7HroZ3spp0g6rWs67aE7JWI65CY64qUIOusuOygnCDsnojsnYwpXG4gICAgY29uc3QgaWRUeXBlID0gdGhpcy5SRVNVTFRfU0NBTl9UWVBFX01BUFtvY3JSZXN1bHQucmVzdWx0X3NjYW5fdHlwZV07XG4gICAgY29uc3QgZGVmYXVsdE9iaiA9IHtcbiAgICAgIG5hdGlvbmFsaXR5OiAnJyxcbiAgICAgIHZpc2FfdHlwZTogJycsXG4gICAgICBuYW1lX2tvcjogJydcbiAgICB9O1xuICAgIGNvbnN0IGZsYXQgPSBfLmFzc2lnbihkZWZhdWx0T2JqLCB0aGlzLmZsYXRPYmoob2NyUmVzdWx0KSk7XG5cbiAgICAvLyDso7zrr7zrsojtmLgg7ZiV7IudIDAwMDAwMC0wMDAwMDAwXG4gICAgY29uc3QganVtaW4gPSB0aGlzLmdldElkTnVtYmVyRm9ybWF0KGZsYXQuanVtaW4pO1xuXG4gICAgLy8gbmV3IGZvcm1hdCAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vIGlkIOqwneyytOyXkOyEnCBmbGF0IO2VmOqyjCDrp4zrk6Qg64yA7IOB65OkXG4gICAgY29uc3QgbmV3Rm9ybWF0S2V5cyA9IFsnY29tcGxldGUnLCAnbmFtZScsICdqdW1pbicsICdpc3N1ZWRfZGF0ZScsICduYXRpb25hbGl0eScsICd2aXNhX3R5cGUnLCAnbmFtZV9rb3InLCAnZm91bmRfZmFjZScsICdzcGVjdWxhcl9yYXRpbycsICdpZF90cnV0aCcsICdmZF9jb25maWRlbmNlJ107XG4gICAgY29uc3QgbmV3Rm9ybWF0ID0gXy5waWNrKGZsYXQsIG5ld0Zvcm1hdEtleXMpO1xuICAgIG5ld0Zvcm1hdC5jb21wbGV0ZSA9IG5ld0Zvcm1hdC5jb21wbGV0ZSArICcnO1xuICAgIG5ld0Zvcm1hdC5qdW1pbiA9IGp1bWluO1xuICAgIG5ld0Zvcm1hdC5pZF90cnV0aF9yZXRyeV9jb3VudCA9IDA7XG4gICAgbmV3Rm9ybWF0LnJlc3VsdF9zY2FuX3R5cGUgPSBpZFR5cGU7XG4gICAgbmV3Rm9ybWF0LmZkX2NvbmZpZGVuY2UgPSBmbGF0LmZkX2NvbmZpZGVuY2U/LnRvRml4ZWQoMykgKyAnJyA/PyAnJztcbiAgICBuZXdGb3JtYXQuZm91bmRfZmFjZSA9IGZsYXQuZm91bmRfZmFjZSArICcnO1xuICAgIG5ld0Zvcm1hdC5zcGVjdWxhcl9yYXRpbyA9IGZsYXQuc3BlY3VsYXJfcmF0aW8gKyAnJztcbiAgICBjb25zdCBsZWdhY3lGb3JtYXQgPSB7XG4gICAgICBDb21wbGV0ZWQ6IG5ld0Zvcm1hdC5jb21wbGV0ZSxcbiAgICAgIG5hbWU6IGZsYXQubmFtZSxcbiAgICAgIG51bWJlcjoganVtaW4sXG4gICAgICBEYXRlOiBmbGF0Lmlzc3VlZF9kYXRlLFxuICAgICAgbmF0aW9uYWxpdHk6IGZsYXQubmF0aW9uYWxpdHkgPz8gJycsXG4gICAgICB2aXNhVHlwZTogZmxhdC52aXNhX3R5cGUgPz8gJycsXG4gICAgICBuYW1lX2tvcjogZmxhdC5uYW1lX2tvciA/PyAnJyxcbiAgICAgIGZhY2Vfc2NvcmU6IG5ld0Zvcm1hdC5mb3VuZF9mYWNlLFxuICAgICAgc3BlY3VsYXI6IG5ld0Zvcm1hdC5zcGVjdWxhcl9yYXRpbyxcbiAgICAgIGlkX3R5cGU6IGlkVHlwZSxcbiAgICAgIHRydXRoOiBmbGF0LmlkX3RydXRoLFxuICAgICAgdHJ1dGhDb25maWRlbmNlOiBuZXdGb3JtYXQuZmRfY29uZmlkZW5jZSxcbiAgICAgIHRydXRoUmV0cnlDb3VudDogMFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ld0Zvcm1hdCxcbiAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgIG1hc2tJbmZvOiB0aGlzLmdldE1hc2tJbmZvKGZsYXQsIGlkVHlwZSlcbiAgICB9O1xuICB9XG4gIF9fcGFyc2VDcmVkaXQob2NyUmVzdWx0KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgY29uc3QgcmVzdWx0U3BsaXQgPSBvY3JSZXN1bHQuc3BsaXQoJywnKTtcbiAgICBsZXQgcmVzdWx0SW5kZXggPSAwO1xuICAgIGlmIChyZXN1bHRJbmRleCA8IHJlc3VsdFNwbGl0Lmxlbmd0aCkgdGFyZ2V0LkNvbXBsZXRlZCA9IHJlc3VsdFNwbGl0W3Jlc3VsdEluZGV4XSwgcmVzdWx0SW5kZXgrKztcbiAgICBpZiAocmVzdWx0SW5kZXggPCByZXN1bHRTcGxpdC5sZW5ndGgpIHRhcmdldC5udW1iZXIgPSByZXN1bHRTcGxpdFtyZXN1bHRJbmRleF0sIHJlc3VsdEluZGV4Kys7XG4gICAgaWYgKHJlc3VsdEluZGV4IDwgcmVzdWx0U3BsaXQubGVuZ3RoKSB0YXJnZXQuZXhwX2RhdGUgPSByZXN1bHRTcGxpdFtyZXN1bHRJbmRleF0sIHJlc3VsdEluZGV4Kys7XG4gICAgcmV0dXJuIFt0YXJnZXQsIHRhcmdldF07XG4gIH1cbiAgZ2V0TWFza0luZm8ob2JqLCBpZFR5cGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICB0eXBlOiB0aGlzLlJFU1VMVF9NQVNLSU5HX1RZUEVfTUFQW2lkVHlwZSArICcnXVxuICAgIH07XG4gICAgdGhpcy5NQVNLX0lORk8uZm9yRWFjaChlbCA9PiB7XG4gICAgICBpZiAoXy5oYXMob2JqLCBlbCkgJiYgb2JqW2VsXSAhPT0gJzAsMCwwLDAnKSB7XG4gICAgICAgIHJlc3VsdFtlbF0gPSBvYmpbZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZ2V0RHJpdmVyTGljZW5zZSh2YWx1ZSkge1xuICAgIC8vIOq1rO2YlSDrqbTtl4jspp0g7Y+s66mnIO2MkOyglSAoZXg6IOygnOyjvCAxMy0wMDEyMzQtMTIgLT4gdHJ1ZSlcbiAgICBjb25zdCByZWdleCA9IC9b6rCALe2eo10vZztcbiAgICBjb25zdCBpc09sZEZvcm1hdCA9IHZhbHVlPy5tYXRjaChyZWdleCk7XG4gICAgaWYgKGlzT2xkRm9ybWF0KSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIHJldHVybiB7XG4gICAgICBpc09sZEZvcm1hdCxcbiAgICAgIHZhbHVlXG4gICAgfTtcbiAgfVxuXG4gIC8vIOyjvOuvvOuyiO2YuCDtmJXsi50g66as7YS06rCSIO2YleyLnSDrs4Dqsr1cbiAgZ2V0SWROdW1iZXJGb3JtYXQodmFsdWUpIHtcbiAgICBpZiAodmFsdWU/Lmxlbmd0aCA9PT0gMTQpIHJldHVybiB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU/Lmxlbmd0aCA9PT0gMTMgPyB2YWx1ZS5zbGljZSgwLCA2KSArICctJyArIHZhbHVlLnNsaWNlKDYsIDEzKSA6ICcnO1xuICB9XG4gIGZsYXRPYmoob2JqKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBpbm5lclJlc3VsdCA9IHRoaXMuZmxhdE9iaih2YWx1ZSk7XG4gICAgICAgIF8uYXNzaWduKHJlc3VsdCwgaW5uZXJSZXN1bHQpO1xuICAgICAgfSBlbHNlIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBPY3JSZXN1bHRQYXJzZXIoKTsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsVUFBVSxNQUFNLGtCQUFrQjs7QUFFekM7QUFDQSxNQUFNQyxlQUFlLENBQUM7RUFBQUMsWUFBQTtJQUFBQyxlQUFBLHdCQUNKLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDO0lBQUFBLGVBQUEsb0JBQzFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsMEJBQTBCLEVBQUUscUJBQXFCLEVBQUUseUJBQXlCLEVBQUUsNEJBQTRCLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUM7SUFBQUEsZUFBQSwrQkFDN0w7TUFDckJDLHFCQUFxQixFQUFFLEdBQUc7TUFDMUJDLGNBQWMsRUFBRSxHQUFHO01BQ25CQyxRQUFRLEVBQUUsR0FBRztNQUNiQyxnQkFBZ0Is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
