function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */
/* global-module */
import detector from './helpers/detector.js';
import usebOCRWASMParser from './helpers/useb-ocr-wasm-parser.js';
import usebOCRAPIParser from './helpers/useb-ocr-api-parser.js';
import { isSupportWasm, measure, simd, threads } from './helpers/wasm-feature-detect.js';
import ImageUtil from './helpers/image-util.js';
var instance;
class UseBOCR {
  /** public properties */

  /** private properties */

  // 임시
  // 임시

  // 수정불가
  // 수정불가
  // 수정불가

  /** Default options */

  /** constructor */
  constructor() {
    _defineProperty(this, "IN_PROGRESS", {
      NONE: 'none',
      NOT_READY: 'not_ready',
      READY: 'ready',
      CARD_DETECT_SUCCESS: 'detect_success',
      CARD_DETECT_FAILED: 'detect_failed',
      MANUAL_CAPTURE_SUCCESS: 'manual_capture_success',
      MANUAL_CAPTURE_FAILED: 'manual_capture_failed',
      OCR_RECOGNIZED: 'recognized',
      OCR_RECOGNIZED_WITH_SSA: 'recognized_with_ssa',
      OCR_SUCCESS: 'ocr_success',
      OCR_SUCCESS_WITH_SSA: 'ocr_success_with_ssa',
      OCR_FAILED: 'ocr_failed'
    });
    _defineProperty(this, "OCR_STATUS", {
      NOT_READY: -1,
      READY: 0,
      OCR_SUCCESS: 1,
      DONE: 2
    });
    _defineProperty(this, "PRELOADING_STATUS", {
      NOT_STARTED: -1,
      STARTED: 0,
      DONE: 1
    });
    _defineProperty(this, "OCR_IMG_MODE", {
      WARPING: 0,
      CROPPING: 1,
      NONE: 2
    });
    _defineProperty(this, "OCR_IMG_MASK_MODE", {
      FALSE: 0,
      TRUE: 1
    });
    _defineProperty(this, "__debugMode", false);
    _defineProperty(this, "__OCREngine", null);
    _defineProperty(this, "__isSupportWasm", false);
    _defineProperty(this, "__isSupportSimd", false);
    _defineProperty(this, "__initialized", false);
    _defineProperty(this, "__preloaded", false);
    _defineProperty(this, "__preloadingStatus", this.PRELOADING_STATUS.NOT_STARTED);
    _defineProperty(this, "__license", void 0);
    _defineProperty(this, "__ocrType", void 0);
    _defineProperty(this, "__ssaMode", false);
    _defineProperty(this, "__ocrStatus", this.OCR_STATUS.NOT_READY);
    _defineProperty(this, "__manualOCRMaxRetryCount", 10);
    _defineProperty(this, "__manualOCRRetryCount", 0);
    _defineProperty(this, "__ssaRetryCount", 0);
    _defineProperty(this, "__detectedCardQueue", []);
    _defineProperty(this, "__detectedCardQueueBase64", []);
    _defineProperty(this, "__onSuccess", null);
    _defineProperty(this, "__onFailure", null);
    _defineProperty(this, "__onInProgressChange", null);
    _defineProperty(this, "__ocrTypeList", ['idcard', 'driver', 'passport', 'foreign-passport', 'alien', 'alien-back', 'credit', 'idcard-ssa', 'driver-ssa', 'passport-ssa', 'foreign-passport-ssa', 'alien-ssa']);
    _defineProperty(this, "__ocrTypeNumberToString", new Map([['1', 'idcard'], ['2', 'driver'], ['3', 'passport'], ['4', 'foreign-passport'], ['5', 'alien'], ['5-1', 'alien'], ['5-2', 'alien'], ['5-3', 'alien']]));
    _defineProperty(this, "__ocrStringToTypeNumber", new Map([['idcard', '1'], ['driver', '2'], ['passport', '3'], ['foreign-passport', '4'], ['alien', '5'], ['alien', '5-1'], ['alien', '5-2'], ['alien', '5-3']]));
    _defineProperty(this, "__ocrResultKeySet", new Set(['all', 'result_scan_type', 'name', 'jumin', 'issued_date', 'region', 'color_point', 'found_face', 'found_eye', 'start_time', 'end_time', 'birth', 'overseas_resident', 'driver_number', 'driver_serial', 'driver_type', 'aptitude_test_date_start', 'aptitude_test_date_end', 'sur_name', 'given_name', 'passport_type', 'issuing_country', 'passport_number', 'nationality', 'sex', 'expiry_date', 'personal_number', 'name_kor', 'mrz1', 'mrz2', 'visa_type', 'id_truth', 'fd_confidence', 'id_truth_retry_count', 'specular_ratio']));
    _defineProperty(this, "__ocrImageKeySet", new Set(['all', 'ocr_origin_image', 'ocr_masking_image', 'ocr_face_image']));
    _defineProperty(this, "__pageEnd", false);
    _defineProperty(this, "__ocr", void 0);
    _defineProperty(this, "__canvas", void 0);
    _defineProperty(this, "__rotationCanvas", void 0);
    _defineProperty(this, "__video", void 0);
    _defineProperty(this, "__videoWrap", void 0);
    _defineProperty(this, "__guideBox", void 0);
    _defineProperty(this, "__guideBoxWrap", void 0);
    _defineProperty(this, "__maskBoxWrap", void 0);
    _defineProperty(this, "__preventToFreezeVideo", void 0);
    _defineProperty(this, "__customUIWrap", void 0);
    _defineProperty(this, "__topUI", void 0);
    _defineProperty(this, "__middleUI", void 0);
    _defineProperty(this, "__bottomUI", void 0);
    _defineProperty(this, "__previewUIWrap", void 0);
    _defineProperty(this, "__previewUI", void 0);
    _defineProperty(this, "__previewImage", void 0);
    _defineProperty(this, "__captureUIWrap", void 0);
    _defineProperty(this, "__captureUI", void 0);
    _defineProperty(this, "__switchUIWrap", void 0);
    _defineProperty(this, "__switchUI", void 0);
    _defineProperty(this, "__captureButton", void 0);
    _defineProperty(this, "__address", 0);
    _defineProperty(this, "__detected", false);
    _defineProperty(this, "__recovered", false);
    _defineProperty(this, "__Buffer", null);
    _defineProperty(this, "__resultBuffer", null);
    _defineProperty(this, "__maskInfoResultBuf", null);
    _defineProperty(this, "__PrevImage", null);
    _defineProperty(this, "__stringOnWasmHeap", null);
    _defineProperty(this, "__camSetComplete", false);
    _defineProperty(this, "__resolutionWidth", 0);
    _defineProperty(this, "__resolutionHeight", 0);
    _defineProperty(this, "__videoWidth", 0);
    _defineProperty(this, "__videoHeight", 0);
    _defineProperty(this, "__resourcesLoaded", false);
    _defineProperty(this, "__intervalTimer", void 0);
    _defineProperty(this, "__cameraPermissionTimeoutTimer", void 0);
    _defineProperty(this, "__cameraResourceRetryCount", 0);
    _defineProperty(this, "__requestAnimationFrameId", void 0);
    _defineProperty(this, "__stream", void 0);
    _defineProperty(this, "__destroyScannerCallback", null);
    _defineProperty(this, "__facingModeConstraint", 'environment');
    _defineProperty(this, "__uiOrientation", '');
    _defineProperty(this, "__prevUiOrientation", '');
    _defineProperty(this, "__videoOrientation", '');
    _defineProperty(this, "__throttlingResizeTimer", null);
    _defineProperty(this, "__throttlingResizeDelay", 500);
    _defineProperty(this, "__maxRetryCountGetAddress", 300);
    _defineProperty(this, "__retryCountGetAddress", 0);
    _defineProperty(this, "__deviceInfo", void 0);
    _defineProperty(this, "__isRotated90or270", false);
    _defineProperty(this, "__inProgressStep", this.IN_PROGRESS.NOT_READY);
    _defineProperty(this, "__previousInProgressStep", this.IN_PROGRESS.NONE);
    _defineProperty(this, "__isInProgressHandleResize", false);
    _defineProperty(this, "__guideBoxRatioByWidth", 1.0);
    _defineProperty(this, "__videoRatioByHeight", 0.9);
    _defineProperty(this, "__guideBoxReduceRatio", 0.8);
    _defineProperty(this, "__cropImageSizeWidth", 0);
    _defineProperty(this, "__cropImageSizeHeight", 0);
    _defineProperty(this, "__isSwitchToServerMode", false);
    _defineProperty(this, "__options", new Object({
      // 디버깅 옵션
      showClipFrame: false,
      // cilp-frame 보기
      showCanvasPreview: false,
      // canvas preview 보기

      // 출력 옵션
      // 암호화
      useEncryptMode: false,
      // 암호화 적용 (개인고유식별부호 관련 항목 암호화)
      useEncryptAllMode: false,
      // 암호화 적용 (전체 암호화, encrypt object 별도 제공)
      useEncryptOverallMode: false,
      // 암호화 적용 (ocr 이미지, 마스킹 이미지, 얼굴이미지 포함)
      // 추후 위에 주석 풀어야함 - START
      // usePiiEncryptMode: false, // 암호화 적용 (pii)
      // usePiiEncryptFace: false, // 신분증 얼굴사진 암호화 적용 (pii)
      // 추후 위에 주석 풀어야함 - END
      useLegacyFormat: false,
      // Legacy format 지원
      useMaskInfo: true,
      // 마스킹 좌표 지원
      useFaceImage: true,
      // 신분증 내 얼굴 사진
      useImageCropping: false,
      // 신분증 이미지를 Cropping(크롭 보정 할지 여부)
      useImageWarping: false,
      // 신분증 이미지를 Warping(왜곡 보정 할지 여부)
      useCompressImage: false,
      // 신분증 이미지를 압축할지 여부
      useCompressImageMaxWidth: 1080,
      // 이미지 리사이징 가로 해상도
      useCompressImageMaxVolume: 1024 * 50,
      // 이미지 압축 목표 용량
      ocrResultExcludeKeylist: [],
      // OCR 평문결과에서 제외할 키 목록
      encryptOcrResultExcludeKeylist: [],
      // OCR 암호화값에서 제외할 키 목록
      ocrImageExcludeKeylist: [],
      // OCR 평문결과에서 제외할 이미지 ex) ['ocr_origin_image', 'ocr_masking_image', 'ocr_face_image']
      encryptOcrImageExcludeKeylist: [],
      // OCR 암호화값에서 제외할 이미지 ex) ['ocr_origin_image', 'ocr_masking_image', 'ocr_face_image']

      // UI 설정
      useTopUI: true,
      // 상단 UI
      useTopUITextMsg: false,
      //상단 UI > TEXT
      useMiddleUI: true,
      //중단 UI
      useMiddleUITextMsg: true,
      // 중단 UI > TEXT
      useBottomUI: true,
      // 하단 UI
      useBottomUITextMsg: false,
      // 하단 UI > TEXT
      usePreviewUI: true,
      // Preview UI
      useCaptureUI: true,
      // 캡처버튼 UI
      preloadingUITextMsg: '신분증인증 모듈을 불러오는 중 입니다<br />잠시만 기다려주세요',
      // 인식 프레임 옵션
      frameBorderStyle: {
        width: 5,
        // border-width
        radius: 20,
        // border-radius
        style: 'solid',
        // border-style

        // 단계별 인식 프레임 border 색상
        not_ready: '#000000',
        // 스캔준비 : 검정
        ready: '#b8b8b8',
        // 스캔대기 : 회색
        detect_success: '#5e8fff',
        // 카드검출 성공 : 하늘
        detect_failed: '#725b67',
        // 카드검출 실패 : 보라
        manual_capture_success: '#5e8fff',
        // 수동촬영 성공 : 하늘
        manual_capture_failed: '#725b67',
        // 수동촬영 실패 : 보라
        recognized: '#003ac2',
        // OCR완료 : 파랑
        recognized_with_ssa: '#003ac2',
        // 사본판별중(사본판별 ON) : 파랑
        ocr_success: '#14b00e',
        // OCR완료 : 초록
        ocr_success_with_ssa: '#14b00e',
        // OCR완료(사본판별 ON) : 초록
        ocr_failed: '#FA113D' // OCR실패 : 빨강
      },

      // 마스크 프레임 fill 컬러 변경 사용 여부
      useMaskFrameColorChange: true,
      // 마스크 프레임 옵션 (카메라 비디오 영역에서 인식 프레임만 보이게 하고 나머지를 덮어쓰는 프레임 영역)
      maskFrameStyle: {
        clip_frame: '#ff00bf',
        // clip-frame 색상 : 딥퍼플 (수정불가)
        base_color: '#333333',
        // mask-frame 색상 : 다크그레이 (투명도는 수정불가 ff로 고정)

        // 단계별 마스크 프레임 fill 색상
        not_ready: '#333333',
        // 스캔준비
        ready: '#333333',
        // 스캔대기
        detect_success: '#222222',
        // 카드검출 성공
        detect_failed: '#333333',
        // 카드검출 실패
        manual_capture_success: '#222222',
        // 수동촬영 성공
        manual_capture_failed: '#333333',
        // 수동촬영 실패
        recognized: '#222222',
        // OCR완료
        recognized_with_ssa: '#222222',
        // 사본판별중(사본판별 ON)
        ocr_success: '#111111',
        //OCR완료
        ocr_success_with_ssa: '#111111',
        // OCR완료(사본판별 ON)
        ocr_failed: '#111111' // OCR실패
      },

      // 촬영옵션
      useAutoSwitchToServerMode: false,
      // 저사양 단말에서 서버OCR로 자동 전환 기능
      useManualSwitchToServerMode: false,
      // 수동으로 서버OCR 전환 기능 (수동이 true이면 자동은 무시됨)
      switchToServerThreshold: 20.0,
      // 자동전환 기준값 (성능 측정치 ms)
      useForceCompleteUI: false,
      // WASM 모드일때 버튼 누를시 해당 시점에 강제로 완료 사용여부

      // 수동촬영 버튼 옵션
      captureButtonStyle: {
        stroke_color: '#ffffff',
        // 버튼 테두리(stroke) 색상
        base_color: '#5e8fff' // 버튼 색상
      },

      resourceBaseUrl: window.location.origin,
      // wasm, data 파일 리소스 base 경로 (CDN 사용시 변경)
      deviceLabel: '',
      videoTargetId: '',
      // 카메라 설정
      rotationDegree: 0,
      // rotation-degree 카메라가 회전된 각도 (90, 190, 270)
      mirrorMode: false,
      // mirror-mode 셀피 카메라(키오스크 등) 사용시 좌우 반전
      cameraResourceRequestRetryInterval: 1000,
      // 카메라 리소스 재요청 간격(ms)
      cameraResourceRequestRetryLimit: -1,
      // 카메라 리소스 재요청 최대 횟수, -1이면 무한 재요청.

      // 카메라 해상도 설정  : 'compatibility' (호환성 우선) || 'highQuality' (고화질 우선)
      // cameraResolutionCriteria: 'compatibility', // 호환성 우선(권장, 디폴트) : 720으로 고정, 저사양 단말기 호환성 좋음
      cameraResolutionCriteria: 'highQuality',
      // 고화질 우선 : 1080이 가능하면 1080 불가능하면 720

      // 가이드 박스 설정 : 'cameraResolution' (카메라 해상도) || 'ocrViewSize' (ocr div 크기)
      calcGuideBoxCriteria: 'cameraResolution',
      // 카메라 해상도 기준(권장, 디폴트) : 720x1280 해상도(세로모드) 일때 ocr view width size가 720보다 큰 경우, 가이드 박스를 720에 맞춤 (preview 화면 깨짐 없음)
      // calcGuideBoxCriteria: 'ocrViewSize', // 화면 사이즈 기준 : 720x1280 해상도(세로모드) 일때 ocr view width size가 720보다 큰경우, 가이드 박스를 ocr view width 사에즈에 맞춤 (preview 화면 강제로 늘리기 때문에 다소 깨짐)

      // 사본판별 RETRY 설정
      // ssaRetryType
      //   - REAL     : 본인(REAL) 거부율 -> False Negative(실제값은 REAL인데 예측값은 FAKE라서 틀린경우)를 낮추기 위해,
      //   - FAKE     : 타인(FAKE) 수락율 -> False Positive(실제값은 FAKE인데 예측값은 REAL이라서 틀린경우)를 낮추기 위해
      //   - ENSEMBLE : 평균 절대값 -> ssaMaxRetryCount 만큼 반복 수행하고 fd_confidence 절대값 값의 평균으로 판정
      // ssaMaxRetryCount 설정 값만큼 재시도하여 한번이라도 기준값(REAL 또는 FAKE)이 뜨면 기준값(REAL 또는 FAKE)로 판정
      ssaRetryType: 'ENSEMBLE',
      ssaRetryPivot: 0.5,
      // REAL/FAKE를 판정하는 fd_confidence 기준값 (wasm 배포 버전에 따라 다름) ※ 수정불가
      ssaMaxRetryCount: 0,
      // 최대 RETRY 회수설정 0이면 미사용

      // this.__debug()를 통해 찍은 메시지를 alert으로 띄울지 여부
      useDebugAlert: false,
      // WASM 리소스 갱신 여부
      force_wasm_reload: false,
      force_wasm_reload_flag: ''
    }));
    if (instance) return instance;
    instance = this;
    return instance;
  }

  /** public methods */
  preloading(onPreloaded) {
    var _this = this;
    return _asyncToGenerator(function* () {
      if (_this.isPreloaded()) {
        void 0;
        if (onPreloaded) onPreloaded();
      } else {
        void 0;
        _this.showOCRLoadingUI();
        _this.__preloadingStatus = _this.PRELOADING_STATUS.STARTED;
        yield _this.__loadResources();
        _this.__preloadingStatus = _this.PRELOADING_STATUS.DONE;
        _this.__preloaded = true;
        if (onPreloaded) onPreloaded();
        _this.hideOCRLoadingUI();
        void 0;
      }
    })();
  }
  isInitialized() {
    return this.__initialized;
  }
  isPreloaded() {
    return this.__preloaded;
  }
  getPreloadingStatus() {
    return this.__preloadingStatus;
  }
  isEncryptMode() {
    return this.__options.useEncryptMode || this.__options.useEncryptAllMode || this.__options.useEncryptOverallMode;
  }
  isCreditCard() {
    return this.__ocrType === 'credit';
  }
  showOCRLoadingUI() {
    var {
      preloadingUIWrap
    } = detector.getOCRElements();
    if (preloadingUIWrap) {
      preloadingUIWrap.style.display = 'flex';
    }
  }
  hideOCRLoadingUI() {
    var {
      preloadingUIWrap
    } = detector.getOCRElements();
    if (preloadingUIWrap) {
      preloadingUIWrap.style.display = 'none';
    }
  }
  encryptResult(review_result) {
    if (this.isCreditCard()) {
      return;
    }
    if (this.isEncryptMode() && this.__isSupportWasm) {
      if (this.__options.useEncryptMode) {
        var includeList = ['jumin', 'driver_number', 'passport_number', 'personal_number', 'mrz2'];
        // prettier-ignore

        var encrypted = {
          ocr_result: _.toPairs(_.pick(review_result.ocr_result, includeList)).reduce((acc, _ref) => {
            var [key, value] = _ref;
            acc[key] = this.__encryptScanResult(value);
            return acc;
          }, {}),
          ocr_origin_image: this.__encryptScanResult(review_result.ocr_origin_image)
        };
        review_result.ocr_result = _objectSpread(_objectSpread({}, review_result.ocr_result), encrypted.ocr_result);
        review_result.ocr_origin_image = encrypted.ocr_origin_image;
      } else {
        // prettier-ignore
        if (this.__options.useEncryptAllMode) {
          var excludeList = ['complete', 'result_scan_type', 'color_point', 'found_face', 'specular_ratio', 'start_time', 'end_time', 'fd_confidence', 'id_truth', 'id_truth_retry_count'];
          var _encrypted = {
            ocr_result: _.toPairs(_.omit(review_result.ocr_result, excludeList)).reduce((acc, _ref2) => {
              var [key, value] = _ref2;
              acc[key] = this.__encryptScanResult(value);
              return acc;
            }, {}),
            ocr_origin_image: this.__encryptScanResult(review_result.ocr_origin_image),
            ocr_masking_image: this.__encryptScanResult(review_result.ocr_masking_image),
            ocr_face_image: this.__encryptScanResult(review_result.ocr_face_image)
          };
          review_result.encrypted = _encrypted;
        } else {
          var excludeOcrResult = this.__options.encryptOcrResultExcludeKeylist.includes("all") ? {} : _.omit(review_result.ocr_result, this.__options.encryptOcrResultExcludeKeylist);
          var excludeOcrImage = this.__options.encryptOcrImageExcludeKeylist.includes("all") ? _.omit(review_result, [...this.__ocrImageKeySet]) : _.omit(review_result, this.__options.encryptOcrImageExcludeKeylist);
          var _encrypted2 = _objectSpread({
            ocr_result: excludeOcrResult
          }, excludeOcrImage);
          review_result.timestamp = Date.now();
          review_result.encrypted_overall = this.__encryptScanResult(JSON.stringify(_encrypted2));
        }
      }
    }
  }
  excludeOcrResult(ocr_result, excludeKeylist) {
    return _.omit(ocr_result, excludeKeylist);
  }
  excludeOcrImage(review_result, excludeKeylist) {
    return _.omit(review_result, excludeKeylist);
  }
  getOCREngine() {
    return this.__OCREngine;
  }
  init(settings) {
    if (!!!settings.licenseKey) throw new Error('License key is empty');
    this.__license = settings.licenseKey;
    if (!!settings.ocrResultExcludeKeylist || !!settings.ocrImageExcludeKeylist || !!settings.encryptOcrResultExcludeKeylist || !!settings.encryptOcrImageExcludeKeylist) {
      var ocrExcludeKeyStringToIter = (str, keyIter) => str.toLowerCase().replace(/\s/g, '').split(',').filter(k => keyIter.has(k));
      settings.ocrResultExcludeKeylist = ocrExcludeKeyStringToIter(settings.ocrResultExcludeKeylist, this.__ocrResultKeySet); // prettier-ignore
      settings.ocrImageExcludeKeylist = ocrExcludeKeyStringToIter(settings.ocrImageExcludeKeylist, this.__ocrImageKeySet); // prettier-ignore
      settings.encryptOcrResultExcludeKeylist = ocrExcludeKeyStringToIter(settings.encryptOcrResultExcludeKeylist, this.__ocrResultKeySet); // prettier-ignore
      settings.encryptOcrImageExcludeKeylist = ocrExcludeKeyStringToIter(settings.encryptOcrImageExcludeKeylist, this.__ocrImageKeySet); // prettier-ignore
    }

    var mergedOptions = _.merge({}, this.__options, settings);
    this.setOption(mergedOptions);
    void 0;
    if (!this.isInitialized()) {
      this.__windowEventBind();
      this.__deviceInfo = detector.getOsVersion();
      void 0;
      this.__isSupportWasm = isSupportWasm();
      if (!this.__isSupportWasm) {
        throw new Error('WebAssembly is not supported. in this browser.');
      }
      this.__initialized = true;
    }
  }
  setOption(settings) {
    this.__options = settings;
  }
  getOption() {
    return this.__options;
  }
  getOcrType(type) {
    return this.__ocrTypeNumberToString.get(type);
  }
  getOcrTypeNumber(string) {
    return this.__ocrStringToTypeNumber.get(string);
  }
  getUIOrientation() {
    return this.__uiOrientation;
  }
  getVideoOrientation() {
    return this.__videoOrientation;
  }
  checkSwitchToServerMode() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      if (_this2.__options.useManualSwitchToServerMode) {
        // 수동전환 on 이면 수동전환 우선
        return _this2.__isSwitchToServerMode;
      } else {
        // 수동전환 off 이면 자동전환 체크
        if (_this2.__options.useAutoSwitchToServerMode) {
          // 자동전환 on일때
          // 성능 측정값을 기준으로 WASM or Server
          var [latencyPer100ms, measureReport] = yield measure();
          _this2.__debug(measureReport);
          return latencyPer100ms > parseFloat(_this2.__options.switchToServerThreshold);
        } else {
          // 수동전환도 off, 자동전환 off
          return false;
        }
      }
    })();
  }
  startOCR(type, onSuccess, onFailure) {
    var _arguments = arguments,
      _this3 = this;
    return _asyncToGenerator(function* () {
      var onInProgressChange = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : null;
      if (!!!type || !!!onSuccess || !!!onFailure) {
        void 0;
        return;
      }
      _this3.__isSwitchToServerMode = yield _this3.checkSwitchToServerMode();
      _this3.__ocrType = type;
      _this3.__ssaMode = _this3.__ocrType.indexOf('-ssa') > -1;
      _this3.__onSuccess = onSuccess;
      _this3.__onFailure = onFailure;
      _this3.__onInProgressChange = onInProgressChange;
      if (onInProgressChange) {
        if (_this3.__options.useTopUI) {
          _this3.__topUI = detector.getOCRElements().topUI;
        }
        if (_this3.__options.useMiddleUI) {
          _this3.__middleUI = detector.getOCRElements().middleUI;
        }
        if (_this3.__options.useBottomUI) {
          _this3.__bottomUI = detector.getOCRElements().bottomUI;
        }
      }
      yield _this3.__changeStage(_this3.IN_PROGRESS.NOT_READY);
      if (!_this3.isInitialized()) {
        throw new Error('Not initialized!');
      }
      try {
        _this3.__preprocess();
        yield _this3.__setupDomElements();
        if (_this3.__isSwitchToServerMode) {
          // serverMode
          if (_this3.isEncryptMode() && _this3.__isSupportWasm) {
            yield _this3.__preloadingWasm(); // 서버모드 이지만 암호화 하기위해 wasm을 preloading 함
          }

          yield _this3.__startScanServer();
        } else {
          // wasmMode
          yield _this3.__preloadingWasm();
          yield _this3.__startScanWasm();
        }
      } catch (e) {
        void 0;
      } finally {
        _this3.stopOCR();
      }
    })();
  }
  stopOCR() {
    this.cleanup();
    this.__closeCamera();
    this.__onSuccess = null;
    this.__onFailure = null;
  }
  setIgnoreComplete(val) {
    this.__OCREngine.setIgnoreComplete(val);
  }
  encrypt(plainStr) {
    return this.__encryptScanResult(plainStr);
  }
  restartOCR(ocrType, onSuccess, onFailure, onInProgressChange) {
    var _arguments2 = arguments,
      _this4 = this;
    return _asyncToGenerator(function* () {
      var isSwitchMode = _arguments2.length > 4 && _arguments2[4] !== undefined ? _arguments2[4] : false;
      if (!_this4.__camSetComplete) {
        void 0;
        return;
      }
      if (isSwitchMode) {
        yield _this4.stopOCR();
      } else {
        _this4.__closeCamera();
      }
      yield _this4.startOCR(ocrType, onSuccess, onFailure, onInProgressChange);
    })();
  }

  /** private methods */
  __waitPreloaded() {
    var _this5 = this;
    return _asyncToGenerator(function* () {
      var waitingRetryCount = 0;
      return new Promise(resolve => {
        var check = () => {
          setTimeout( /*#__PURE__*/_asyncToGenerator(function* () {
            if (_this5.isPreloaded()) {
              resolve();
            } else {
              waitingRetryCount++;
              void 0;
              check();
            }
          }), 500);
        };
        check();
      });
    })();
  }
  __preprocess() {
    var convertTypeToNumber = function convertTypeToNumber(option) {
      return isNaN(parseInt(option)) ? 0 : parseInt(option);
    };
    var convertTypeToFloat = function convertTypeToFloat(option) {
      return isNaN(parseFloat(option)) ? 20.0 : parseFloat(option);
    };
    this.__options.ssaMaxRetryCount = convertTypeToNumber(this.__options.ssaMaxRetryCount);
    this.__options.useCompressImageMaxVolume = convertTypeToNumber(this.__options.useCompressImageMaxVolume);
    this.__options.useCompressImageMaxWidth = convertTypeToNumber(this.__options.useCompressImageMaxWidth);
    this.__options.switchToServerThreshold = convertTypeToFloat(this.__options.switchToServerThreshold);
  }
  __windowEventBind() {
    var _this_ = this;
    if (/iphone|ipod|ipad/.test(window.navigator.userAgent.toLowerCase())) {
      var skipTouchActionforZoom = ev => {
        if (ev.touches.length > 1) {
          ev.preventDefault();
          ev.stopImmediatePropagation();
        }
      };
      window.addEventListener('touchstart', skipTouchActionforZoom, {
        passive: false
      });
      window.addEventListener('touchmove', skipTouchActionforZoom, {
        passive: false
      });
      window.addEventListener('touchend', skipTouchActionforZoom, {
        passive: false
      });
    }
    window.onbeforeunload = function () {
      _this_.__pageEnd = true;
      _this_.cleanup();
    };
    var handleResize = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* () {
        if (!!!_this_.__ocrType) return;
        if (!_this_.__isInProgressHandleResize) {
          _this_.__isInProgressHandleResize = true;
          _this_.__throttlingResizeTimer = null;
          void 0;
          _this_.__isInProgressHandleResize = false;
          yield _this_.restartOCR(_this_.__ocrType, _this_.__onSuccess, _this_.__onFailure, _this_.__onInProgressChange);
        } else {
          void 0;
        }
      });
      return function handleResize() {
        return _ref4.apply(this, arguments);
      };
    }();
    window.addEventListener('resize', /*#__PURE__*/_asyncToGenerator(function* () {
      if (!!!_this_.__throttlingResizeTimer) {
        _this_.__throttlingResizeTimer = setTimeout(handleResize, _this_.__throttlingResizeDelay);
      }
    }));
  }
  __debug(msg) {
    if (this.__options.useDebugAlert) {
      void 0;
    } else {
      void 0;
    }
  }
  __sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  __blobToBase64(blob) {
    return new Promise((resolve, _) => {
      var reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  __base64toBlob(base64) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(base64.split(',')[1]);

    // separate out the mime component
    var mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mimeString
    });
  }
  __compreseBase64Image(base64, options, constantNumber) {
    var _this6 = this;
    return _asyncToGenerator(function* () {
      if (base64 === null) return null;
      var blobFile = _this6.__base64toBlob(base64);
      var compressed = yield ImageUtil.compressImage(blobFile, options, constantNumber);
      var compressionRatio = Math.round((1 - compressed.size / blobFile.size) * 10000) / 100;
      void 0;
      return yield _this6.__blobToBase64(compressed);
    })();
  }

  /** 라이센스 키를 heap 에 allocation */
  __getStringOnWasmHeap() {
    if (!!!this.__license) {
      throw new Error('License Key is empty');
    }
    var lengthBytes = this.__OCREngine.lengthBytesUTF8(this.__license) + 1;
    this.__stringOnWasmHeap = this.__OCREngine._malloc(lengthBytes);
    this.__OCREngine.stringToUTF8(this.__license, this.__stringOnWasmHeap, lengthBytes);
    return this.__stringOnWasmHeap;
  }
  __encryptScanResult(ocrResult) {
    var stringOnWasmHeap = null;
    try {
      if (typeof ocrResult === 'number') ocrResult = ocrResult.toString();
      if (ocrResult === '') return '';
      if (typeof ocrResult !== 'string' && !!!ocrResult) {
        throw new Error('ocrResult is empty');
      }
      var jsonString = ocrResult;
      var lengthBytes = this.__OCREngine.lengthBytesUTF8(jsonString) + 1;
      stringOnWasmHeap = this.__OCREngine._malloc(lengthBytes);
      this.__OCREngine.stringToUTF8(jsonString, stringOnWasmHeap, lengthBytes);
      return this.__OCREngine.encryptResult(stringOnWasmHeap);
    } finally {
      if (stringOnWasmHeap) {
        this.__OCREngine._free(stringOnWasmHeap);
        stringOnWasmHeap = null;
      }
    }
  }
  __setVideoResolution(videoElement) {
    var _this7 = this;
    return _asyncToGenerator(function* () {
      var isSupportedResolution = false;
      var resolutionText = 'not ready';
      if (!_this7.__camSetComplete) {
        return {
          isSupportedResolution,
          resolutionText
        };
      }
      if (videoElement.videoWidth === 0 && videoElement.videoHeight === 0) {
        yield _this7.__changeStage(_this7.IN_PROGRESS.NOT_READY);
        return {
          isSupportedResolution,
          resolutionText
        };
      }
      resolutionText = videoElement.videoWidth + 'x' + videoElement.videoHeight;
      if (videoElement.videoWidth === 1080 && videoElement.videoHeight === 1920 || videoElement.videoWidth === 1920 && videoElement.videoHeight === 1080) {
        isSupportedResolution = true;
      } else if (videoElement.videoWidth === 1280 && videoElement.videoHeight === 720 || videoElement.videoWidth === 720 && videoElement.videoHeight === 1280) {
        isSupportedResolution = true;
      } else {
        videoElement.srcObject = null;
        isSupportedResolution = false;
      }
      _this7.__videoWidth = videoElement.videoWidth;
      _this7.__videoHeight = videoElement.videoHeight;
      return {
        isSupportedResolution,
        resolutionText
      };
    })();
  }
  __getScannerAddress(ocrType) {
    if (!this.__ocrTypeList.includes(ocrType)) throw new Error('Unsupported OCR type');
    try {
      var address = 0;
      var destroyCallback = null;
      var stringOnWasmHeap = this.__getStringOnWasmHeap();
      switch (ocrType) {
        // OCR
        case 'idcard':
        case 'driver':
        case 'idcard-ssa':
        case 'driver-ssa':
          address = this.__OCREngine.getIDCardScanner(stringOnWasmHeap);
          destroyCallback = () => this.__OCREngine.destroyIDCardScanner(address);
          break;
        case 'passport':
        case 'foreign-passport':
        case 'passport-ssa':
        case 'foreign-passport-ssa':
          address = this.__OCREngine.getPassportScanner(stringOnWasmHeap);
          destroyCallback = () => this.__OCREngine.destroyPassportScanner(address);
          break;
        case 'alien':
        case 'alien-back':
        case 'alien-ssa':
          address = this.__OCREngine.getAlienScanner(stringOnWasmHeap);
          destroyCallback = () => this.__OCREngine.destroyAlienScanner(address);
          break;
        case 'credit':
          address = this.__OCREngine.getCreditScanner(stringOnWasmHeap);
          destroyCallback = () => this.__OCREngine.destroyCreditScanner(address);
          break;
        default:
          throw new Error('Scanner does not exists');
      }
      this.__OCREngine._free(stringOnWasmHeap);
      if (address === 0) {
        if (this.__maxRetryCountGetAddress === this.__retryCountGetAddress) {
          throw new Error('Wrong License Key');
        }
        this.__retryCountGetAddress++;
      }
      return [address, destroyCallback];
    } catch (e) {
      // TODO : License Issue인 경우 에러 값을 받아서 error 로그를 찍을 수 있게 요청필요 (임시 N번 이상 address를 못받으면 강제 에러)
      void 0;
      void 0;
      throw e;
    }
  }
  __getBuffer() {
    if (!this.__Buffer) {
      this.__Buffer = this.__OCREngine._malloc(this.__resolutionWidth * this.__resolutionHeight * 4);
    }
    if (!this.__resultBuffer) {
      this.__resultBuffer = this.__OCREngine._malloc(4096);
    }
    if (this.__options.useMaskInfo) {
      if (!this.__maskInfoResultBuf) {
        this.__maskInfoResultBuf = this.__OCREngine._malloc(4096);
      }
    }
    return [this.__Buffer, this.__resultBuffer, this.__maskInfoResultBuf];
  }
  __getImageBase64(address, maskMode, imgMode) {
    var _arguments3 = arguments,
      _this8 = this;
    return _asyncToGenerator(function* () {
      var imgType = _arguments3.length > 3 && _arguments3[3] !== undefined ? _arguments3[3] : 'card';
      try {
        if (imgType === 'card') {
          _this8.__OCREngine.encodeJpgDetectedFrameImage(address, maskMode, imgMode);
        } else if (imgType === 'face') {
          _this8.__OCREngine.encodeJpgDetectedPhotoImage(address);
        }
        var jpgSize = _this8.__OCREngine.getEncodedJpgSize();
        var jpgPointer = _this8.__OCREngine.getEncodedJpgBuffer();
        var resultView = new Uint8Array(_this8.__OCREngine.HEAP8.buffer, jpgPointer, jpgSize);
        var result = new Uint8Array(resultView);
        var blob = new Blob([result], {
          type: 'image/jpeg'
        });
        return yield _this8.__blobToBase64(blob);
      } catch (e) {
        void 0;
        throw e;
      } finally {
        _this8.__OCREngine.destroyEncodedJpg();
      }
    })();
  }

  /** Free buffer */
  __destroyBuffer() {
    if (this.__Buffer) {
      this.__OCREngine._free(this.__Buffer);
      this.__Buffer = null;
    }
    this.__destroyResultBuffer();
    this.__destroyMaskInfoResultBuffer();
  }
  __destroyResultBuffer() {
    if (this.__resultBuffer !== null) {
      this.__OCREngine._free(this.__resultBuffer);
      this.__resultBuffer = null;
    }
  }
  __destroyMaskInfoResultBuffer() {
    if (this.__maskInfoResultBuf !== null) {
      this.__OCREngine._free(this.__maskInfoResultBuf);
      this.__maskInfoResultBuf = null;
    }
  }

  /** Free PrevImage buffer */
  __destroyPrevImage() {
    if (this.__PrevImage !== null) {
      this.__OCREngine._free(this.__PrevImage);
      this.__PrevImage = null;
    }
  }

  /** free string heap buffer */
  __destroyStringOnWasmHeap() {
    if (this.__stringOnWasmHeap) {
      this.__OCREngine._free(this.__stringOnWasmHeap);
      this.__stringOnWasmHeap = null;
    }
  }

  /** free scanner address */
  __destroyScannerAddress() {
    if (this.__destroyScannerCallback) {
      this.__destroyScannerCallback();
      this.__destroyScannerCallback = null;
    }
  }
  __isVideoResolutionCompatible(videoElement) {
    var _this9 = this;
    return _asyncToGenerator(function* () {
      var {
        isSupportedResolution,
        resolutionText
      } = yield _this9.__setVideoResolution(videoElement);
      if (!isSupportedResolution) {
        if (resolutionText !== 'not ready') {
          void 0;
        }
      }
      return isSupportedResolution;
    })();
  }
  __getRotationDegree() {
    return (this.__options.rotationDegree % 360 + 360) % 360;
  }
  __getMirrorMode() {
    return this.__options.mirrorMode;
  }
  __cropImageFromVideo() {
    var _this10 = this;
    return _asyncToGenerator(function* () {
      if (!_this10.__camSetComplete) return [null, null, null];
      var [calcResolution_w, calcResolution_h] = [_this10.__resolutionWidth, _this10.__resolutionHeight];
      var {
        video,
        canvas,
        rotationCanvas
      } = detector.getOCRElements();

      // source image (or video)
      // ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      // ┃     ┊ sy                              ┃
      // ┃┈┈┈┈ ┏━━━━━━━━━━━━━━━┓ ┊               ┃
      // ┃ sx  ┃               ┃ ┊               ┃
      // ┃     ┃               ┃ ┊ sHeight       ┃
      // ┃     ┃               ┃ ┊               ┃               destination canvas
      // ┃     ┗━━━━━━━━━━━━━━━┛ ┊               ┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      // ┃     ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈                 ┃    ┊                           ┃
      // ┃           sWidth                      ┃    ┊ dy                        ┃
      // ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┏━━━━━━━━━━━━━━━┓ ┊         ┃
      //                                  ┃┈┈┈┈┈┈┈┈┈┈┈┃               ┃ ┊         ┃
      //                                  ┃    dx     ┃               ┃ ┊ dHeight ┃
      //                                  ┃           ┃               ┃ ┊         ┃
      //                                  ┃           ┗━━━━━━━━━━━━━━━┛ ┊         ┃
      //                                  ┃           ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈           ┃
      //                                  ┃                 dWidth                ┃
      //                                  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
      // drawImage(image, dx, dy)
      // drawImage(image, dx, dy, dWidth, dHeight)
      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

      var calcCanvas = canvas;
      var calcVideoWidth = video.videoWidth;
      var calcVideoHeight = video.videoHeight;
      var calcVideoClientWidth = video.clientWidth;
      var calcVideoClientHeight = video.clientHeight;
      var calcCropImageSizeWidth = _this10.__cropImageSizeWidth;
      var calcCropImageSizeHeight = _this10.__cropImageSizeHeight;
      var calcVideoOrientation = _this10.__videoOrientation;
      var isAlienBack = _this10.__ocrType === 'alien-back';
      if (_this10.__isRotated90or270) {
        [calcCropImageSizeWidth, calcCropImageSizeHeight] = [calcCropImageSizeHeight, calcCropImageSizeWidth];
        [calcResolution_w, calcResolution_h] = [calcResolution_h, calcResolution_w];
        calcCanvas = rotationCanvas;
        calcVideoOrientation = _this10.__videoOrientation === 'portrait' ? 'landscape' : 'portrait';
      }
      var calcMaxSWidth = 99999;
      var calcMaxSHeight = 99999;
      if (_this10.__uiOrientation === 'portrait') {
        if (calcVideoOrientation === _this10.__uiOrientation) {
          // 세로 UI / 세로 카메라
          calcMaxSWidth = calcVideoWidth;
          calcMaxSHeight = calcVideoHeight;
        } else {
          // 세로 UI / 가로 카메라
          calcMaxSHeight = calcVideoHeight;
        }
      } else {
        if (calcVideoOrientation === _this10.__uiOrientation) {
          // 가로 UI / 가로 카메라
          calcMaxSHeight = calcVideoHeight;
        } else {
          // 가로 UI / 세로 카메라
          calcMaxSWidth = calcVideoWidth;
          calcMaxSHeight = calcVideoHeight;
        }
      }
      var sx, sy;
      var ratio = calcVideoWidth / calcVideoClientWidth;
      var sWidth = Math.min(Math.round(calcCropImageSizeWidth * ratio), calcMaxSWidth);
      var sHeight = Math.min(Math.round(calcCropImageSizeHeight * ratio), calcMaxSHeight);
      sx = Math.max(Math.round((calcVideoClientWidth - calcCropImageSizeWidth) / 2 * ratio), 0);
      sy = Math.max(Math.round((calcVideoClientHeight - calcCropImageSizeHeight) / 2 * ratio), 0);
      if (isAlienBack) {
        [calcResolution_w, calcResolution_h] = [calcResolution_h, calcResolution_w];
      }
      calcCanvas.setAttribute('width', calcResolution_w);
      calcCanvas.setAttribute('height', calcResolution_h);
      var calcContext = calcCanvas.getContext('2d', {
        willReadFrequently: true
      });
      calcContext.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, calcResolution_w, calcResolution_h);
      var imgData, imgDataUrl;
      imgData = calcContext.getImageData(0, 0, calcResolution_w, calcResolution_h);
      imgDataUrl = calcCanvas.toDataURL('image/jpeg');
      if (isAlienBack) {
        [imgData, imgDataUrl] = yield _this10.__rotate(imgData, imgDataUrl, 270);
      }
      if (_this10.__isRotated90or270) {
        return yield _this10.__rotate(imgData, imgDataUrl, _this10.__getRotationDegree());
      } else {
        return [imgData, imgDataUrl];
      }
    })();
  }
  __rotate(imgData, imgDataUrl, degree) {
    return _asyncToGenerator(function* () {
      return new Promise(resolve => {
        if (degree === 0) {
          resolve([imgData, imgDataUrl]);
        }
        var img = new Image();
        var tempCanvas = document.createElement('canvas');
        img.src = imgDataUrl;
        img.addEventListener('load', /*#__PURE__*/_asyncToGenerator(function* () {
          // canvas = rotationCanvas;
          var tempContext = tempCanvas.getContext('2d');
          tempCanvas.style.position = 'absolute';
          if ([90, 270].includes(degree)) {
            tempCanvas.width = img.height;
            tempCanvas.height = img.width;
          } else if ([0, 180].includes(degree)) {
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
          }
          if (degree === 90) tempContext.translate(img.height, 0);else if (degree === 180) tempContext.translate(img.width, img.height);else if (degree === 270) tempContext.translate(0, img.width);
          tempContext.rotate(degree * Math.PI / 180);
          tempContext.drawImage(img, 0, 0);
          var newImageData = [90, 270].includes(degree) ? tempContext.getImageData(0, 0, img.height, img.width) : tempContext.getImageData(0, 0, img.width, img.height);
          resolve([newImageData, tempCanvas.toDataURL('image/jpeg')]);
          tempContext.restore();
        }));
      });
    })();
  }
  __isCardboxDetected(address) {
    var _arguments4 = arguments,
      _this11 = this;
    return _asyncToGenerator(function* () {
      var boxType = _arguments4.length > 1 && _arguments4[1] !== undefined ? _arguments4[1] : 0;
      var retryImg = _arguments4.length > 2 && _arguments4[2] !== undefined ? _arguments4[2] : null;
      if (!address || address < 0) {
        return [false, null];
      }
      try {
        var imgData;
        var imgDataUrl = null;
        var [buffer] = _this11.__getBuffer();
        if (retryImg !== null) {
          imgData = retryImg;
        } else {
          [imgData, imgDataUrl] = yield _this11.__cropImageFromVideo();
        }
        if (!!!imgData) {
          return [false, null];
        }
        _this11.__OCREngine.HEAP8.set(imgData.data, buffer);
        var kor = false,
          alien = false,
          passport = false;
        switch (_this11.__ocrType) {
          case 'idcard':
          case 'driver':
          case 'idcard-ssa':
          case 'driver-ssa':
            kor = true;
            break;
          case 'passport':
          case 'passport-ssa':
          case 'foreign-passport':
          case 'foreign-passport-ssa':
            passport = true;
            break;
          case 'alien':
          case 'alien-back':
          case 'alien-ssa':
            alien = true;
            break;
          case 'credit':
            // nothing
            break;
          default:
            throw new Error('Unsupported OCR type');
        }
        var result = null;
        if (kor || passport || alien) {
          result = _this11.__OCREngine.detect_idcard_opt(buffer, _this11.__resolutionWidth, _this11.__resolutionHeight, address, kor, alien, passport);
        } else {
          result = _this11.__OCREngine.detect_idcard(buffer, _this11.__resolutionWidth, _this11.__resolutionHeight, address, boxType);
        }

        // console.log('isCardboxDetected result -=-----', result)
        return [!!result, imgData, imgDataUrl];
      } catch (e) {
        var message = 'Card detection error : ' + e;
        if (e.toString().includes('memory')) {
          void 0;
        } else {
          void 0;
          throw e;
        }
      }
    })();
  }
  __startRecognition(address, ocrType, ssaMode, isSetIgnoreComplete, imgData, imgDataUrl) {
    var _this12 = this;
    return _asyncToGenerator(function* () {
      try {
        if (address === null) {
          return '';
        } else if (address === -1) {
          return 'checkValidation Fail';
        }
        var ocrResult = null;
        if (!_this12.__ocrTypeList.includes(ocrType)) throw new Error('Unsupported OCR type');
        var [, resultBuffer] = _this12.__getBuffer();
        var recognition = /*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(function* (isSetIgnoreComplete) {
            var _ocrResult, _ocrResult2;
            if (isSetIgnoreComplete) {
              yield _this12.__isCardboxDetected(address, 0, imgData);
            }
            switch (ocrType) {
              case 'idcard':
              case 'driver':
              case 'idcard-ssa':
              case 'driver-ssa':
                ocrResult = _this12.__OCREngine.scanIDCard(address, resultBuffer);
                break;
              case 'passport':
              case 'foreign-passport':
              case 'passport-ssa':
              case 'foreign-passport-ssa':
                ocrResult = _this12.__OCREngine.scanPassport(address, resultBuffer);
                break;
              case 'alien':
              case 'alien-ssa':
                ocrResult = _this12.__OCREngine.scanAlien(address, resultBuffer);
                break;
              case 'alien-back':
                ocrResult = _this12.__OCREngine.scanAlienBack(address, resultBuffer);
                break;
              case 'credit':
                ocrResult = _this12.__OCREngine.scanCredit(address, resultBuffer);
                break;
              default:
                throw new Error('Scanner does not exists');
            }

            // TODO: 신용카드는 아직 key:value 형태로 변환 안되어 있음
            if (ocrType === 'credit') {
              if (ocrResult === null || ocrResult === '' || ocrResult === 'false' || ocrResult[0] === 'false') {
                return false;
              } else {
                return true;
              }
            }
            ocrResult = _this12.__csvToObject(ocrResult);
            if (((_ocrResult = ocrResult) === null || _ocrResult === void 0 ? void 0 : _ocrResult.complete) !== 'undefined' && ((_ocrResult2 = ocrResult) === null || _ocrResult2 === void 0 ? void 0 : _ocrResult2.complete) === 'true') {
              return true;
            } else {
              if (isSetIgnoreComplete) {
                if (_this12.__manualOCRRetryCount < _this12.__manualOCRMaxRetryCount) {
                  // detectedCardQueue에서 한장을 꺼내서 갱신한다.
                  // 저장되어있는 이미지의 숫자가 retry 보다 작은경우 대비하여 %를 사용함
                  var queueIdx = _this12.__manualOCRRetryCount % _this12.__detectedCardQueue.length;
                  imgData = _this12.__detectedCardQueue[queueIdx];
                  _this12.__manualOCRRetryCount++;
                  return yield recognition(isSetIgnoreComplete);
                } else {
                  // 사진 한장으로 OCR 실패 (popup 내리고 setIgnoreComplete(false) 처리?
                  _this12.__manualOCRRetryCount = 0;
                  _this12.setIgnoreComplete(false);
                  _this12.__blurCaptureButton(); // 팝업이 내려갈때 처리되지만 미리 처리
                  yield _this12.__changeStage(_this12.IN_PROGRESS.MANUAL_CAPTURE_FAILED, false, imgDataUrl);
                  _this12.__setStyle(detector.getOCRElements().video, {
                    display: ''
                  });
                  return false;
                }
              } else {
                return false;
              }
            }
          });
          return function recognition(_x) {
            return _ref7.apply(this, arguments);
          };
        }();
        // end of function recognition()

        if (yield recognition(isSetIgnoreComplete)) {
          var isCreditCard = ocrType === 'credit';
          var originImageMode;
          if (isCreditCard) {
            originImageMode = _this12.OCR_IMG_MODE.CROPPING;
          } else if (_this12.__options.useImageCropping) {
            originImageMode = _this12.OCR_IMG_MODE.CROPPING;
          } else if (_this12.__options.useImageWarping) {
            originImageMode = _this12.OCR_IMG_MODE.WARPING;
          } else {
            originImageMode = _this12.OCR_IMG_MODE.NONE;
          }
          var originImage = yield _this12.__getImageBase64(address, _this12.OCR_IMG_MASK_MODE.FALSE, originImageMode);
          var maskImage = null;
          var faceImage = null;
          var maskImageMode;
          if (!isCreditCard) {
            if (_this12.__options.useImageCropping) {
              maskImageMode = _this12.OCR_IMG_MODE.CROPPING;
            } else {
              maskImageMode = _this12.OCR_IMG_MODE.WARPING;
            }
            maskImage = yield _this12.__getImageBase64(address, _this12.OCR_IMG_MASK_MODE.TRUE, maskImageMode);
            maskImage = maskImage === 'data:' ? null : maskImage;
            faceImage = _this12.__options.useFaceImage ? yield _this12.__getImageBase64(address, null, originImageMode, 'face') : null;
          }
          if (ssaMode) {
            yield _this12.__changeStage(_this12.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA, false, maskImage);
          } else {
            yield _this12.__changeStage(_this12.IN_PROGRESS.OCR_RECOGNIZED);
          }

          // 추후 위에 주석 풀어야함 - START
          // if (!isCreditCard && this.__options.usePiiEncryptMode) {
          //   originImage = this.__getPiiEncryptImageBase64(
          //     address,
          //     this.OCR_IMG_MASK_MODE.FALSE,
          //     ocrImageMode
          //   );
          //
          //   console.log('encrypt base64 image', { originImage });
          // }
          //
          // if (faceImage && this.__options.usePiiEncryptFace) {
          //   faceImage = this.__getPiiEncryptImageBase64(
          //     address,
          //     null,
          //     ocrImageMode,
          //     'face'
          //   );
          //   console.log('encrypt base64 face image', { faceImage });
          // }
          // 추후 위에 주석 풀어야함 - END

          return [ocrResult, originImage, maskImage, faceImage];
        } else {
          return [false, null, null, null];
        }
      } catch (e) {
        void 0;
        throw e;
      }
    })();
  }
  __startTruth(ocrType, address) {
    return new Promise((resolve, reject) => {
      var [, resultBuffer] = this.__getBuffer();
      if (ocrType.indexOf('-ssa') > -1) {
        // TODO: worker를 사용하여 메인(UI 랜더링) 스레드가 멈추지 않도록 처리 필요 (현재 loading UI 띄우면 애니메이션 멈춤)
        // TODO: setTimeout 으로 나누더라도 효과 없음 setTimeout 지우고, worker로 변경 필요
        setTimeout(() => {
          resolve(this.__OCREngine.scanTruth(address, resultBuffer));
        }, 500);
      } else {
        reject(new Error('SSA Mode is true. but, ocrType is invalid : ' + ocrType));
      }
    });
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
  __getMaskInfo(address) {
    if (address == null) {
      return '';
    } else if (address === -1) {
      return 'checkValidation Fail';
    }
    var [,, maskInfoResultBuf] = this.__getBuffer();
    var result = null;
    result = this.__OCREngine.getMaskRect(address, maskInfoResultBuf);
    if (result == null || result === '') {
      void 0;
    }

    // this.__destroyMaskInfoResultBuffer();

    return result === null ? null : this.__csvToObject(result);
  }
  __startTruthRetry(ocrType, address, imgData) {
    var _this13 = this;
    return _asyncToGenerator(function* () {
      yield _this13.__isCardboxDetected(address, 0, imgData);
      // await this.__startRecognition(address, ocrType, true);      // for 성능을 위해 진행 X
      return yield _this13.__startTruth(ocrType, address);
    })();
  }
  __setCameraPermissionTimeoutTimer() {
    var _this14 = this;
    this.__clearCameraPermissionTimeoutTimer();
    this.__cameraPermissionTimeoutTimer = setTimeout( /*#__PURE__*/_asyncToGenerator(function* () {
      // 1초 delay 후 실행
      yield _this14.__proceedCameraPermission();
    }), this.__options.cameraResourceRequestRetryInterval);
  }
  __proceedCameraPermission() {
    var _this15 = this;
    return _asyncToGenerator(function* () {
      try {
        _this15.__clearCameraPermissionTimeoutTimer();
        var isPassport = _this15.__ocrType.includes('passport');
        yield _this15.__setupVideo(isPassport);
        var {
          video
        } = detector.getOCRElements();
        if (video) {
          // const [track] = this.__stream.getVideoTracks();
          // const capability = track.getCapabilities();
          // console.debug('CardScan__initialize capability', capability);
          if ('srcObject' in video) {
            video.srcObject = _this15.__stream;
          } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = window.URL.createObjectURL(_this15.__stream);
          }
          video.addEventListener('loadedmetadata', () => {
            // console.debug('proceedCameraPermission - onloadedmetadata');
            video.play();
          });
          video.addEventListener('canplay', /*#__PURE__*/_asyncToGenerator(function* () {
            void 0;

            // video element style 설정
            _this15.__videoOrientation = video.videoWidth / video.videoHeight < 1 ? 'portrait' : 'landscape';
            void 0;
            void 0;
            void 0;
            _this15.__camSetComplete = true;
            yield _this15.__adjustStyle();
          }));
          yield _this15.__changeStage(_this15.IN_PROGRESS.READY);
          video.webkitExitFullscreen();
        } else {
          yield _this15.__changeStage(_this15.IN_PROGRESS.NOT_READY);
          _this15.__closeCamera();
        }
      } catch (e) {
        void 0;
        if (e.name === 'NotAllowedError') {
          var errorMessage = 'Camera Access Permission is not allowed';
          void 0;
          void 0;
          _this15.__onFailureProcess('E403', e, errorMessage);
        } else if (e.name === 'NotReadableError') {
          // 다른곳에서 카메라 자원을 사용중
          yield _this15.__changeStage(_this15.IN_PROGRESS.NOT_READY);
          _this15.stopStream();
          if (_this15.__options.cameraResourceRequestRetryLimit < 0) {
            // 카메라 리소스 재요청 횟수제한 없음
            _this15.__cameraResourceRetryCount += 1;
            _this15.__setCameraPermissionTimeoutTimer(); // 재귀 호출
          } else {
            if (_this15.__options.cameraResourceRequestRetryLimit > _this15.__cameraResourceRetryCount) {
              _this15.__cameraResourceRetryCount += 1;
              _this15.__setCameraPermissionTimeoutTimer(); // 재귀 호출
            } else {
              var _errorMessage = 'Camera permissions were granted, but Failed to acquire Camera resources.';
              _this15.__onFailureProcess('E403', e, _errorMessage);
            }
          }
        } else if (e.name === 'NotFoundError') {
          // 기기에 연결된 카메라가 없음
          var _errorMessage2 = 'Camera Not Found';
          void 0;
          void 0;
          _this15.__onFailureProcess('E404', e, _errorMessage2);
        } else {
          var _errorMessage3 = 'Unknown Error Occured';
          void 0;
          void 0;
          _this15.__onFailureProcess('E999', e, _errorMessage3);
        }
      }
    })();
  }
  __setStyle(el, style) {
    if (el && style) {
      Object.assign(el.style, style);
    }
  }
  __changeOCRStatus(val) {
    switch (val) {
      // OCR
      case this.IN_PROGRESS.NOT_READY:
        this.__ocrStatus = this.OCR_STATUS.NOT_READY;
        break;
      case this.IN_PROGRESS.READY:
        this.__ocrStatus = this.OCR_STATUS.READY;
        break;
      case this.IN_PROGRESS.OCR_RECOGNIZED:
      case this.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA:
        this.__ocrStatus = this.OCR_STATUS.OCR_SUCCESS;
        break;
      case this.IN_PROGRESS.OCR_SUCCESS:
      case this.IN_PROGRESS.OCR_SUCCESS_WITH_SSA:
      case this.IN_PROGRESS.OCR_FAILED:
        this.__ocrStatus = this.OCR_STATUS.DONE;
        break;
    }
  }
  __changeStage(val) {
    var _arguments5 = arguments,
      _this16 = this;
    return _asyncToGenerator(function* () {
      var forceUpdate = _arguments5.length > 1 && _arguments5[1] !== undefined ? _arguments5[1] : false;
      var recognizedImage = _arguments5.length > 2 && _arguments5[2] !== undefined ? _arguments5[2] : null;
      if (_this16.__previousInProgressStep === val && forceUpdate === false) {
        return;
      }
      _this16.__changeOCRStatus(val);
      _this16.__previousInProgressStep = val;
      _this16.__inProgressStep = val;
      var {
        guideBox,
        maskBoxWrap,
        captureButton
      } = detector.getOCRElements();
      var style = {
        borderWidth: _this16.__options.frameBorderStyle.width + 'px',
        borderStyle: _this16.__options.frameBorderStyle.style,
        borderRadius: _this16.__options.frameBorderStyle.radius + 'px',
        borderColor: _this16.__options.frameBorderStyle[val]
      };
      if (guideBox) {
        _this16.__setStyle(guideBox, style);
      }
      if (_this16.__options.useMaskFrameColorChange) {
        if (!!_this16.__options.showClipFrame) {
          void 0;
        } else {
          var _maskBoxWrap$querySel;
          maskBoxWrap === null || maskBoxWrap === void 0 ? void 0 : (_maskBoxWrap$querySel = maskBoxWrap.querySelector('#maskBoxOuter')) === null || _maskBoxWrap$querySel === void 0 ? void 0 : _maskBoxWrap$querySel.setAttribute('fill', _this16.__options.maskFrameStyle[val]);
        }
      }
      if (_this16.__options.useCaptureUI) {
        var _captureButton$queryS;
        captureButton === null || captureButton === void 0 ? void 0 : (_captureButton$queryS = captureButton.querySelector('#captureButton')) === null || _captureButton$queryS === void 0 ? void 0 : _captureButton$queryS.setAttribute('fill', _this16.__options.captureButtonStyle['base_color']);
      }
      var ocrMode = _this16.__isSwitchToServerMode ? 'server' : 'wasm';
      if (_this16.__onInProgressChange) {
        if (_this16.__options.useTopUI || _this16.__options.useTopUITextMsg) {
          _this16.__onInProgressChange.call(_this16, ocrMode, _this16.__ocrType, _this16.__inProgressStep, _this16.__topUI, 'top', _this16.__options.useTopUITextMsg, _this16.__options.useCaptureUI, _this16.__options.usePreviewUI, recognizedImage);
        }
        if (_this16.__options.useMiddleUI || _this16.__options.useMiddleUITextMsg) {
          _this16.__onInProgressChange.call(_this16, ocrMode, _this16.__ocrType, _this16.__inProgressStep, _this16.__middleUI, 'middle', _this16.__options.useMiddleUITextMsg, _this16.__options.useCaptureUI, _this16.__options.usePreviewUI, recognizedImage);
        }
        if (_this16.__options.useBottomUI || _this16.__options.useBottomUITextMsg) {
          _this16.__onInProgressChange.call(_this16, ocrMode, _this16.__ocrType, _this16.__inProgressStep, _this16.__bottomUI, 'bottom', _this16.__options.useBottomUITextMsg, _this16.__options.useCaptureUI, _this16.__options.usePreviewUI, recognizedImage);
        }
      }
      if (val === _this16.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS || val === _this16.IN_PROGRESS.MANUAL_CAPTURE_FAILED) {
        if (_this16.__options.usePreviewUI) {
          _this16.__updatePreviewUI(recognizedImage);

          // FAIL인 경우 5초후 자동을 창닫음
          if (val === _this16.IN_PROGRESS.MANUAL_CAPTURE_FAILED) {
            setTimeout(_this16.__hidePreviewUI, 3000, _this16);
          }
        }
      }
      if (val === _this16.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA) {
        var {
          video
        } = detector.getOCRElements();
        _this16.__setStyle(video, {
          display: 'none'
        });
        if (_this16.__options.usePreviewUI) {
          _this16.__updatePreviewUI(recognizedImage);
        }
      }
      if (val === _this16.IN_PROGRESS.OCR_SUCCESS_WITH_SSA) {
        if (_this16.__options.usePreviewUI) {
          _this16.__hidePreviewUI();
        }
      }
      yield _this16.__sleep(1); // for UI update
    })();
  }

  __updatePreviewUI(recognizedImage) {
    var {
      previewUIWrap,
      previewImage
    } = detector.getOCRElements();
    previewImage.src = recognizedImage;
    var imgStyle = {
      'max-width': '70%',
      'max-height': '60%'
    };
    this.__setStyle(previewImage, imgStyle);
    this.__setStyle(previewUIWrap, {
      display: 'flex'
    });
  }
  __hidePreviewUI(context) {
    var _this_ = this;
    if (context) {
      _this_ = context;
    }
    var {
      video,
      previewUIWrap,
      previewImage
    } = detector.getOCRElements();
    _this_.__setStyle(video, {
      display: 'block'
    });
    _this_.__setStyle(previewUIWrap, {
      display: 'none'
    });
    previewImage.src = '';
  }
  __getInputDevices() {
    var _this17 = this;
    return _asyncToGenerator(function* () {
      // throw error if navigator.mediaDevices is not supported
      if (!navigator.mediaDevices) {
        throw new Error('navigator.mediaDevices is not supported');
      }
      var devices = yield navigator.mediaDevices.enumerateDevices();
      var camera = [];
      for (var device of devices) {
        if (device.kind === 'videoinput') {
          try {
            if (device instanceof InputDeviceInfo) {
              if (device.getCapabilities) {
                var _cap$facingMode;
                var cap = device.getCapabilities();
                if (cap !== null && cap !== void 0 && (_cap$facingMode = cap.facingMode) !== null && _cap$facingMode !== void 0 && _cap$facingMode.includes(_this17.__facingModeConstraint)) {
                  var _device$label;
                  var isUltraCameraReg = /ultra|울트라/gi;
                  if (isUltraCameraReg.test((_device$label = device.label) === null || _device$label === void 0 ? void 0 : _device$label.toLowerCase())) continue;
                  camera.push(cap.deviceId);
                }
              }
            }
          } catch (e) {
            // iOS 17 미만의 chrome, safari 에서는
            // InputDeviceInfo 객체가 없어서 getCapabilities를 확인할 수 없기 때문에
            // device label만 보고 후면 카메라로 사용
            if (e instanceof ReferenceError) {
              var _device$label2;
              var isBackCameraReg = /back|후면/g;
              if ((_device$label2 = device.label) !== null && _device$label2 !== void 0 && _device$label2.length && isBackCameraReg.test(device.label)) {
                camera.push(device.deviceId);
              }
            }
          }
        }
      }
      _this17.__debug("camera = ".concat(camera, ", camera.length = ").concat(camera.length));
      return camera;
    })();
  }
  checkUIOrientation() {
    var current = detector.getUIOrientation(detector.getOCRElements().ocr);
    var isChanged = false;
    if (current !== this.__prevUiOrientation) {
      this.__uiOrientation = current;
      this.__prevUiOrientation = current;
      isChanged = true;
    }
    return {
      current,
      isChanged
    };
  }
  __clearCustomUI(obj) {
    obj.innerHTML = '';
    obj.removeAttribute('style');
    obj.removeAttribute('class');
    this.__setStyle(obj, {
      display: 'none'
    });
  }
  __setupDomElements() {
    var _this18 = this;
    return _asyncToGenerator(function* () {
      var {
        ocr,
        video,
        canvas,
        rotationCanvas,
        guideBox,
        videoWrap,
        guideBoxWrap,
        maskBoxWrap,
        preventToFreezeVideo,
        customUIWrap,
        topUI,
        middleUI,
        bottomUI,
        captureUIWrap,
        captureUI,
        captureButton,
        previewUIWrap,
        previewUI,
        previewImage,
        switchUIWrap,
        switchUI,
        preloadingUIWrap,
        preloadingUI
      } = detector.getOCRElements();
      if (!ocr) throw new Error('ocr div element is not exist');
      if (videoWrap) videoWrap.remove();
      if (guideBoxWrap) guideBoxWrap.remove();
      if (video) video.remove();
      if (canvas) canvas.remove();
      if (rotationCanvas) rotationCanvas.remove();
      if (guideBox) guideBox.remove();
      if (maskBoxWrap) maskBoxWrap.remove();
      if (preventToFreezeVideo) preventToFreezeVideo.remove();
      if (customUIWrap) customUIWrap.remove();
      // 각 top, middle, bottom UI를 미사용일 경우 안의 내용을 삭제
      if (topUI && !_this18.__options.useTopUI) _this18.__clearCustomUI(topUI);
      if (middleUI && !_this18.__options.useMiddleUI) _this18.__clearCustomUI(middleUI);
      if (bottomUI && !_this18.__options.useBottomUI) _this18.__clearCustomUI(bottomUI);
      if (captureUIWrap) captureUIWrap.remove();
      // capture UI를 미사용일 경우 안의 내용을 삭제
      if (captureUI && !_this18.__options.useCaptureUI) _this18.__clearCustomUI(captureUI);
      if (previewUIWrap) previewUIWrap.remove();
      // preview UI를 미사용일 경우 안의 내용을 삭제
      if (previewUI && !_this18.__options.usePreviewUI) _this18.__clearCustomUI(previewUI);
      if (switchUIWrap) switchUIWrap.remove();
      // switch UI를 미사용일 경우 안의 내용을 삭제
      if (switchUI && !_this18.__options.useManualSwitchToServerMode) _this18.__clearCustomUI(switchUI);
      if (preloadingUIWrap) preloadingUIWrap.remove();
      var rotationDegree = _this18.__getRotationDegree();
      _this18.__isRotated90or270 = [90, 270].includes(rotationDegree);
      var ocrStyle = {
        width: '100%',
        height: '100%'
      };
      _this18.__setStyle(ocr, ocrStyle);
      var wrapStyle = {
        position: 'absolute',
        display: 'flex',
        // vertical align middle
        'align-items': 'center',
        'justify-content': 'center',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        overflow: 'hidden'
      };
      videoWrap = document.createElement('div');
      videoWrap.setAttribute('data-useb-ocr', 'videoWrap');
      if (videoWrap) {
        while (videoWrap.firstChild) {
          videoWrap.removeChild(videoWrap.lastChild);
        }
        _this18.__setStyle(videoWrap, wrapStyle);
      }
      ocr.appendChild(videoWrap);
      maskBoxWrap = document.createElement('svg');
      maskBoxWrap.setAttribute('data-useb-ocr', 'maskBoxWrap');
      maskBoxWrap.setAttribute('fill', 'none');
      maskBoxWrap.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      _this18.__setStyle(maskBoxWrap, wrapStyle);
      var mask_frame = _this18.__options.maskFrameStyle.base_color + 'ff';
      if (!!_this18.__options.showClipFrame) {
        mask_frame = _this18.__options.maskFrameStyle.clip_frame + '55';
      }
      maskBoxWrap.innerHTML = '' + "  <svg id='maskBoxContainer' width='100%' height='100%' fill='none' xmlns='http://www.w3.org/2000/svg'>\n" + "    <mask id='mask-rect'>\n" + "      <rect width='100%' height='100%' fill='white'></rect>\n" + "      <svg x='50%' y='50%' overflow='visible'>\n" + "          <rect id='maskBoxInner'\n" + "            width='400' height='260'\n" + "            x='-200' y='-130'\n" + "            rx='10' ry='10'\n" + "            fill='black' stroke='black'></rect>\n" + '      </svg>\n' + '    </mask>\n' + "    <rect id='maskBoxOuter'\n" + "          x='0' y='0' width='100%' height='100%'\n" + "          fill='" + mask_frame + "' mask='url(#mask-rect)'></rect>\n" + '  </svg>';
      ocr.appendChild(maskBoxWrap);
      video = document.createElement('video');
      video.setAttribute('data-useb-ocr', 'video');
      video.setAttribute('autoplay', 'true');
      video.setAttribute('muted', 'true');
      video.setAttribute('playsinline', 'true');
      var videoStyle = {
        position: 'relative',
        width: '100%'
      };
      var rotateCss = 'rotate(' + rotationDegree + 'deg)';
      var mirrorCss = 'rotateY(180deg)';
      var rotateAndMirrorCss = mirrorCss + ' ' + rotateCss;
      if (_this18.__isRotated90or270) {
        if (_this18.__getMirrorMode()) {
          videoStyle = _objectSpread(_objectSpread({}, videoStyle), {}, {
            '-webkit-transform': rotateAndMirrorCss,
            '-moz-transform': rotateAndMirrorCss,
            '-o-transform': rotateAndMirrorCss,
            '-ms-transform': rotateAndMirrorCss,
            transform: rotateAndMirrorCss
          });
        } else {
          videoStyle = _objectSpread(_objectSpread({}, videoStyle), {}, {
            '-webkit-transform': rotateCss,
            '-moz-transform': rotateCss,
            '-o-transform': rotateCss,
            '-ms-transform': rotateCss,
            transform: rotateCss
          });
        }
      } else {
        if (_this18.__getMirrorMode()) {
          videoStyle = _objectSpread(_objectSpread({}, videoStyle), {}, {
            '-webkit-transform': mirrorCss,
            '-moz-transform': mirrorCss,
            '-o-transform': mirrorCss,
            '-ms-transform': mirrorCss,
            transform: mirrorCss
          });
        }
      }
      _this18.__setStyle(video, videoStyle);
      videoWrap.appendChild(video);
      guideBoxWrap = document.createElement('div');
      guideBoxWrap.setAttribute('data-useb-ocr', 'guideBoxWrap');
      _this18.__setStyle(guideBoxWrap, wrapStyle);
      ocr.appendChild(guideBoxWrap);
      guideBox = document.createElement('svg');
      guideBox.setAttribute('data-useb-ocr', 'guideBox');
      guideBox.setAttribute('fill', 'none');
      guideBox.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      _this18.__setStyle(guideBox, {
        width: '100%',
        margin: '0 auto',
        position: 'absolute'
      });
      guideBoxWrap.appendChild(guideBox);
      canvas = document.createElement('canvas');
      canvas.setAttribute('data-useb-ocr', 'canvas');
      var canvasStyle = {
        display: _this18.__options.showCanvasPreview ? _this18.__isRotated90or270 ? 'none' : 'display' : 'none',
        width: '25%',
        position: 'absolute',
        left: '0px',
        top: '30px',
        border: 'green 2px solid'
      };
      _this18.__setStyle(canvas, canvasStyle);
      ocr.appendChild(canvas);
      rotationCanvas = document.createElement('canvas');
      rotationCanvas.setAttribute('data-useb-ocr', 'rotationCanvas');
      _this18.__setStyle(rotationCanvas, {
        display: _this18.__options.showCanvasPreview ? _this18.__isRotated90or270 ? 'display' : 'none' : 'none',
        height: '25%',
        position: 'absolute',
        right: '0px',
        top: '30px',
        border: 'blue 2px solid'
      });
      ocr.appendChild(rotationCanvas);
      preventToFreezeVideo = document.createElement('div');
      preventToFreezeVideo.setAttribute('data-useb-ocr', 'preventToFreezeVideo');
      _this18.__setStyle(preventToFreezeVideo, {
        position: 'absolute',
        bottom: '10',
        right: '10'
      });
      preventToFreezeVideo.innerHTML = '' + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n' + '  <circle cx="84" cy="50" r="10" fill="#86868600">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="0.5555555555555556s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>\n' + '    <animate attributeName="fill" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#86868600;#86868600;#86868600;#86868600;#86868600" begin="0s"></animate>\n' + '  </circle>' + '  <circle cx="16" cy="50" r="10" fill="#86868600">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>\n' + '  </circle>' + '  <circle cx="50" cy="50" r="10" fill="#86868600">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5555555555555556s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5555555555555556s"></animate>\n' + '  </circle>' + '  <circle cx="84" cy="50" r="10" fill="#86868600">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.1111111111111112s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.1111111111111112s"></animate>\n' + '  </circle>' + '  <circle cx="16" cy="50" r="10" fill="#86868600">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.6666666666666665s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.6666666666666665s"></animate>\n' + '  </circle>' + '</svg>';
      ocr.appendChild(preventToFreezeVideo);
      customUIWrap = document.createElement('div');
      customUIWrap.setAttribute('data-useb-ocr', 'customUIWrap');
      var customUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
        'flex-direction': 'column'
      });
      _this18.__setStyle(customUIWrap, customUIWrapStyle);
      ocr.appendChild(customUIWrap);

      // 각 top, middle, bottom UI 사용(use)여부와 관계없이 영역을 잡기 위해, div가 없으면 생성
      // adjustStyle() 에서 세부적인 사이즈와 위치값 동적으로 설정됨.
      if (!topUI) {
        topUI = document.createElement('div');
        topUI.setAttribute('data-useb-ocr', 'topUI');
      }
      customUIWrap.appendChild(topUI);
      if (!middleUI) {
        middleUI = document.createElement('div');
        middleUI.setAttribute('data-useb-ocr', 'middleUI');
      }
      customUIWrap.appendChild(middleUI);
      if (!bottomUI) {
        bottomUI = document.createElement('div');
        bottomUI.setAttribute('data-useb-ocr', 'bottomUI');
      }
      customUIWrap.appendChild(bottomUI);
      captureUIWrap = document.createElement('div');
      captureUIWrap.setAttribute('data-useb-ocr', 'captureUIWrap');
      var captureUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
        'flex-direction': 'center'
      });
      _this18.__setStyle(captureUIWrap, captureUIWrapStyle);
      ocr.appendChild(captureUIWrap);
      if (_this18.__options.useCaptureUI) {
        if (_this18.__isSwitchToServerMode || _this18.__options.useForceCompleteUI) {
          if (!captureUI) {
            captureUI = document.createElement('div');
            captureUI.setAttribute('data-useb-ocr', 'captureUI');
            _this18.__setStyle(captureUI, {
              display: 'none',
              cursor: 'pointer'
            });
          }
          if (!captureButton) {
            captureButton = document.createElement('div');
            captureButton.setAttribute('data-useb-ocr', 'captureButton');
            var captureButtonSrcSVG = "";
            captureButtonSrcSVG += "<svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>";
            captureButtonSrcSVG += "  <circle id='captureButton' cx='40' cy='40' r='38' fill='#555555' stroke='#ffffff' stroke-width='4'/>";
            captureButtonSrcSVG += "</svg>";
            captureButton.innerHTML = captureButtonSrcSVG;
            captureUI.appendChild(captureButton);
          }
          captureUIWrap.appendChild(captureUI);
          var _this_ = _this18;
          var __onClickCaptureButton = function __onClickCaptureButton() {
            if (_this_.__isSwitchToServerMode) {
              detector.getOCRElements().captureButton.setAttribute('is-clicked', 'true');
              _this_.__setStyle(detector.getOCRElements().captureButton, {
                display: 'none'
              });
            } else {
              detector.getOCRElements().captureButton.setAttribute('is-clicked', 'true');
              _this_.__setStyle(detector.getOCRElements().video, {
                display: 'none'
              });
              _this_.__setStyle(detector.getOCRElements().captureButton, {
                display: 'none'
              });
            }
          };
          captureButton.addEventListener('click', __onClickCaptureButton);
        }
      }
      if (_this18.__options.usePreviewUI) {
        previewUIWrap = document.createElement('div');
        previewUIWrap.setAttribute('data-useb-ocr', 'previewUIWrap');
        var previewUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
          'flex-direction': 'column',
          display: 'none',
          'background-color': '#000000aa'
        });
        _this18.__setStyle(previewUIWrap, previewUIWrapStyle);
        ocr.appendChild(previewUIWrap);
        if (!previewUI) {
          previewUI = document.createElement('div');
          previewUI.setAttribute('data-useb-ocr', 'previewUI');
        }
        _this18.__setStyle(previewUI, _objectSpread(_objectSpread({}, wrapStyle), {}, {
          'flex-direction': 'column',
          width: '',
          height: '',
          'max-width': '90%',
          'max-height': '90%'
        }));
        previewUIWrap.appendChild(previewUI);
        if (!previewImage) {
          previewImage = document.createElement('img');
          previewImage.setAttribute('data-useb-ocr', 'previewImage');
          previewUI.appendChild(previewImage);
        }
      }
      if (_this18.__options.useManualSwitchToServerMode) {
        switchUIWrap = document.createElement('div');
        switchUIWrap.setAttribute('data-useb-ocr', 'switchUIWrap');
        var switchUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
          'align-items': '',
          'justify-content': '',
          width: '',
          overflow: '',
          'flex-direction': 'column-reverse'
        });
        _this18.__setStyle(switchUIWrap, switchUIWrapStyle);
        ocr.appendChild(switchUIWrap);
        if (!switchUI) {
          switchUI = document.createElement('div');
          switchUI.setAttribute('data-useb-ocr', 'switchUI');
          var switchHTML = "";
          switchHTML += "<div class='custom--label flex justify-center align-center gap10'>";
          switchHTML += "  <label for='manual-switch-wasm-to-server-checkbox'>WASM</label>";
          switchHTML += "  <label class='switch'>";
          switchHTML += "    <input id='manual-switch-wasm-to-server-checkbox' type='checkbox'>";
          switchHTML += "    <span class='slider round'></span>";
          switchHTML += "  </label>";
          switchHTML += "  <label for='priority-finance-cohtmlForlist-checkbox'>Server</label>";
          switchHTML += "</div>";
          switchUI.innerHTML = switchHTML;
        }
        _this18.__setStyle(switchUI, {
          overflow: 'hidden'
        });
        switchUIWrap.appendChild(switchUI);
        var switchCheckbox = switchUI.getElementsByTagName('input')[0];
        var _this_2 = _this18;
        var __onClickSwitchUI = /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator(function* (event) {
            _this_2.__isSwitchToServerMode = event.target.checked;
            yield _this_2.restartOCR(_this_2.__ocrType, _this_2.__onSuccess, _this_2.__onFailure, _this_2.__onInProgressChange, true);
          });
          return function __onClickSwitchUI(_x2) {
            return _ref10.apply(this, arguments);
          };
        }();
        switchCheckbox.addEventListener('click', __onClickSwitchUI, {
          once: true
        });
      }
      preloadingUIWrap = document.createElement('div');
      preloadingUIWrap.setAttribute('data-useb-ocr', 'preloadingUIWrap');
      var preloadingUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
        'flex-direction': 'column',
        display: 'none',
        'background-color': '#000000ff'
      });
      _this18.__setStyle(preloadingUIWrap, preloadingUIWrapStyle);
      ocr.appendChild(preloadingUIWrap);
      if (!preloadingUI) {
        preloadingUI = document.createElement('div');
        preloadingUI.setAttribute('data-useb-ocr', 'preloadingUI');
        preloadingUI.setAttribute('class', 'text-info');
        preloadingUI.innerHTML = '' + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n' + '  <circle cx="84" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="0.5555555555555556s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>\n' + '    <animate attributeName="fill" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#86868600;#86868600;#86868600;#86868600;#86868600" begin="0s"></animate>\n' + '  </circle>' + '  <circle cx="16" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>\n' + '  </circle>' + '  <circle cx="50" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5555555555555556s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5555555555555556s"></animate>\n' + '  </circle>' + '  <circle cx="84" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.1111111111111112s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.1111111111111112s"></animate>\n' + '  </circle>' + '  <circle cx="16" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.6666666666666665s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.6666666666666665s"></animate>\n' + '  </circle>' + '</svg>';
        if (_this18.__options.preloadingUITextMsg === '' || _this18.__options.preloadingUITextMsg) {
          preloadingUI.innerHTML += _this18.__options.preloadingUITextMsg;
        }
      }
      _this18.__setStyle(preloadingUI, _objectSpread(_objectSpread({}, wrapStyle), {}, {
        'flex-direction': 'column'
      }));
      preloadingUIWrap.appendChild(preloadingUI);

      // loading UI 위치 자리잡게 하기 위해
      yield _this18.__initStyle();

      // 화면과도 현상 해결
      _this18.__setStyle(ocr, {
        display: ''
      });
      _this18.__ocr = ocr;
      _this18.__canvas = canvas;
      _this18.__rotationCanvas = rotationCanvas;
      _this18.__video = video;
      _this18.__videoWrap = videoWrap;
      _this18.__guideBox = guideBox;
      _this18.__guideBoxWrap = guideBoxWrap;
      _this18.__maskBoxWrap = maskBoxWrap;
      _this18.__preventToFreezeVideo = preventToFreezeVideo;
      _this18.__customUIWrap = customUIWrap;
      _this18.__topUI = topUI;
      _this18.__middleUI = middleUI;
      _this18.__bottomUI = bottomUI;
      _this18.__captureUIWrap = captureUIWrap;
      _this18.__captureUI = captureUI;
      _this18.__captureButton = captureButton;
      _this18.__previewUIWrap = previewUIWrap;
      _this18.__previewUI = previewUI;
      _this18.__previewImage = previewImage;
      _this18.__switchUIWrap = switchUIWrap;
      _this18.__switchUI = switchUI;
      return {
        ocr,
        canvas,
        rotationCanvas,
        video,
        videoWrap,
        guideBox,
        guideBoxWrap,
        maskBoxWrap,
        preventToFreezeVideo,
        customUIWrap,
        topUI,
        middleUI,
        bottomUI,
        captureUIWrap,
        captureUI,
        captureButton,
        previewUIWrap,
        previewUI,
        previewImage,
        switchUIWrap,
        switchUI
      };
    })();
  }
  __blurCaptureButton() {
    this.__setStyle(detector.getOCRElements().video, {
      display: ''
    });
    var {
      captureButton
    } = detector.getOCRElements();
    if (captureButton) {
      captureButton.setAttribute('is-clicked', 'false');
      this.__setStyle(captureButton, {
        display: ''
      });
    }
  }
  __isClickedCaptureButton() {
    var {
      captureButton
    } = detector.getOCRElements();
    return captureButton ? captureButton.getAttribute('is-clicked') === 'true' : false;
  }
  __setupVideo(isPassport) {
    var _this19 = this;
    return _asyncToGenerator(function* () {
      // wasm 인식성능 최적화된 해상도
      _this19.__resolutionWidth = 1080;
      _this19.__resolutionHeight = 720;
      _this19.__camSetComplete = false;
      var {
        video,
        canvas,
        rotationCanvas
      } = detector.getOCRElements();
      var camera = yield _this19.__getInputDevices();
      // console.log('videoDevices :: ', camera)

      _this19.checkUIOrientation();
      var constraintWidth, constraintHeight;
      if (_this19.__options.cameraResolutionCriteria === 'highQuality') {
        // 카메라 해상도 설정 : 화질 우선
        // 1920x1080이 가능한경우 사용 아니면 1280x720 사용
        constraintWidth = {
          ideal: 1920,
          min: 1280
        };
        constraintHeight = {
          ideal: 1080,
          min: 720
        };
      } else {
        // 'compatibility'
        // 카메라 해상도 설정 : 호환성 우선
        // 1920x1080이 사용 가능하더라도 1280x720을 사용하도록 고정
        // 사유 : 갤럭시 entry 모델(A시리즈 / Wide 모델 등)에서 1920 x 1080 처리시 비율이 이상해짐(홀쭉이됨)
        // 항상 1280 x 720을 사용하도록 변경
        constraintWidth = {
          ideal: 1280
        };
        constraintHeight = {
          ideal: 720
        };
      }
      var constraints = {
        audio: false,
        video: {
          zoom: {
            ideal: 1
          },
          facingMode: {
            ideal: _this19.__facingModeConstraint
          },
          focusMode: {
            ideal: 'continuous'
          },
          whiteBalanceMode: {
            ideal: 'continuous'
          },
          deviceId: camera.length ? {
            ideal: camera[camera.length - 1]
          } : null,
          width: constraintWidth,
          height: constraintHeight
        }
      };

      // 최초 진입 이어서 videoDeivce 리스트를 가져올 수 없으면,
      // getUserMedia를 임의 호출하여 권한을 받은뒤 다시 가져옴
      if (camera.length === 0) {
        _this19.__debug('cannot to get camera devices. so, try to get camera devices again');
        _this19.__debug("constraints : ".concat(JSON.stringify(constraints)));
        _this19.__stream = yield navigator.mediaDevices.getUserMedia(constraints);
        _this19.stopStream();
        camera = yield _this19.__getInputDevices();
        constraints.video.deviceId = camera.length ? {
          ideal: camera[camera.length - 1]
        } : null;
      }

      // 갤럭시 wide 등 저사양 기기에서 FHD 해상도 카메라 사용시 홀쭉이되는 현상 방지
      // 저사양 기기 판단기준 : 후면카메라의 개수가 1개라는 가정
      if (camera.length === 1) {
        _this19.__debug('maybe device is entry model such as galaxy wide');
        constraints.video.width = {
          ideal: 1280
        };
        constraints.video.height = {
          ideal: 720
        };
      }
      try {
        // const dumptrack = ([a, b], track) =>
        //   `${a}${track.kind == 'video' ? 'Camera' : 'Microphone'} (${track.readyState}): ${track.label}${b}`;

        var stream = yield navigator.mediaDevices.getUserMedia(constraints);
        _this19.__debug("constraints : ".concat(JSON.stringify(constraints)));
        // this.__debug('videoTracks :: ', stream.getVideoTracks());
        var streamSettings = stream.getVideoTracks()[0].getSettings();
        // this.__debug(
        //   'streamCapabilities :: ',
        //   stream.getVideoTracks()[0].getCapabilities()
        // );
        // this.__debug('stream :: ', stream.getVideoTracks()[0].getConstraints());
        // this.__debug('streamSettings :: ', streamSettings);
        _this19.__debug("stream width * height :: ".concat(streamSettings.width, " * ").concat(streamSettings.height));
        _this19.__debug('stream width / height :: ' + streamSettings.width / streamSettings.height);
        _this19.__debug('stream aspectRatio :: ' + streamSettings.aspectRatio);
        _this19.__debug('stream facingMode :: ' + streamSettings.facingMode);
        [canvas.width, canvas.height] = [_this19.__resolutionWidth, _this19.__resolutionHeight];
        if (_this19.__isRotated90or270) {
          [rotationCanvas.width, rotationCanvas.height] = [_this19.__resolutionHeight, _this19.__resolutionWidth];
        }
        video.srcObject = stream;
        _this19.__stream = stream;
      } catch (e) {
        void 0;
        throw e;
      }
    })();
  }
  __initStyle() {
    var _this20 = this;
    return _asyncToGenerator(function* () {
      void 0;
      var {
        ocr,
        guideBox,
        maskBoxWrap,
        topUI,
        middleUI,
        bottomUI,
        captureUI
      } = detector.getOCRElements();
      _this20.__setStyle(captureUI, {
        display: 'none'
      });

      // 기준정보
      var baseWidth = 400;
      var baseHeight = 260;
      var scannerFrameRatio = baseHeight / baseWidth; // 신분증 비율

      var guideBoxWidth, guideBoxHeight;
      var calcOcrClientWidth = ocr.clientWidth;
      var calcOcrClientHeight = ocr.clientHeight;
      var borderWidth = _this20.__options.frameBorderStyle.width;
      var borderRadius = _this20.__options.frameBorderStyle.radius;
      var guideBoxRatioByWidth = _this20.__guideBoxRatioByWidth;
      var videoRatioByHeight = _this20.__videoRatioByHeight;
      if (_this20.__uiOrientation === 'portrait') {
        // 세로 UI && 세로 비디오로 간주
        // 가로 기준으로 가이드박스 계산
        guideBoxWidth = calcOcrClientWidth * guideBoxRatioByWidth;
        guideBoxHeight = guideBoxWidth * scannerFrameRatio;
      } else {
        // 가로 UI && 가로 비디오로 간주
        // 비디오를 가로 UI의 height 기준으로 줄이고
        // 가로 UI height 기준으로 비디오의 width 계산
        guideBoxHeight = calcOcrClientHeight * videoRatioByHeight;
        guideBoxWidth = guideBoxHeight * baseWidth / baseHeight;
      }
      guideBoxWidth += borderWidth * 2;
      guideBoxHeight += borderWidth * 2;
      var reducedGuideBoxWidth = guideBoxWidth * _this20.__guideBoxReduceRatio;
      var reducedGuideBoxHeight = guideBoxHeight * _this20.__guideBoxReduceRatio;
      if (topUI) {
        _this20.__setStyle(topUI, {
          'padding-bottom': '10px',
          height: (calcOcrClientHeight - guideBoxHeight) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column-reverse'
        });
      }
      if (middleUI) {
        _this20.__setStyle(middleUI, {
          width: reducedGuideBoxWidth - borderWidth * 2 + 'px',
          height: reducedGuideBoxHeight - borderWidth * 2 + 'px',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '10px'
        });
      }
      if (bottomUI) {
        _this20.__setStyle(bottomUI, {
          'padding-top': '10px',
          height: (calcOcrClientHeight - guideBoxHeight) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column'
        });
      }
      var videoInnerGap = 2; // 미세하게 maskBoxInner보다 guideBox가 작은것 보정
      _this20.__setStyle(guideBox, {
        width: reducedGuideBoxWidth - videoInnerGap + 'px',
        height: reducedGuideBoxHeight - videoInnerGap + 'px',
        backgroundColor: 'transparent'
      });
      var maskBoxInner = maskBoxWrap.querySelector('#maskBoxInner');
      var r = borderRadius - borderWidth * 2;
      r = r < 0 ? 0 : r;
      if (!isNaN(reducedGuideBoxWidth) && !isNaN(reducedGuideBoxHeight) && !isNaN(borderRadius) && !isNaN(borderWidth)) {
        var maskBoxInnerWidth = Math.max(reducedGuideBoxWidth - borderWidth * 2 - videoInnerGap, 0);
        var maskBoxInnerHeight = Math.max(reducedGuideBoxHeight - borderWidth * 2 - videoInnerGap, 0);
        maskBoxInner.setAttribute('width', maskBoxInnerWidth + '');
        maskBoxInner.setAttribute('height', maskBoxInnerHeight + '');
        maskBoxInner.setAttribute('x', maskBoxInnerWidth / 2 * -1 + '');
        maskBoxInner.setAttribute('y', maskBoxInnerHeight / 2 * -1 + '');
        maskBoxInner.setAttribute('rx', r + '');
        maskBoxInner.setAttribute('ry', r + '');
      }
    })();
  }
  __adjustStyle() {
    var _this21 = this;
    return _asyncToGenerator(function* () {
      var __calcGuideBoxCriteria = (a, b) => {
        if (_this21.__options.calcGuideBoxCriteria === 'cameraResolution') {
          return Math.min(a, b);
        } else if (_this21.__options.calcGuideBoxCriteria === 'ocrViewSize') {
          return Math.max(a, b);
        } else {
          return Math.min(a, b); // default : cameraResolution
        }
      };

      void 0;
      var {
        ocr,
        video,
        guideBox,
        maskBoxWrap,
        topUI,
        middleUI,
        bottomUI,
        captureUIWrap,
        captureUI,
        captureButton
      } = detector.getOCRElements();
      _this21.__setStyle(captureUI, {
        display: 'none'
      });
      var isAlienBack = _this21.__ocrType === 'alien-back';

      // 기준정보
      var baseWidth = isAlienBack ? 260 : 400;
      var baseHeight = isAlienBack ? 400 : 260;
      var scannerFrameRatio = baseHeight / baseWidth; // 신분증 비율

      var guideBoxWidth, guideBoxHeight;
      var calcOcrClientWidth = ocr.clientWidth;
      var calcOcrClientHeight = ocr.clientHeight;
      var calcVideoWidth = video.videoWidth;
      var calcVideoHeight = video.videoHeight;
      var calcVideoClientWidth = video.clientWidth;
      var calcVideoClientHeight = video.clientHeight;
      var calcVideoOrientation = _this21.__videoOrientation;
      if (calcVideoWidth === 0 || calcVideoHeight === 0 || calcVideoClientWidth === 0 || calcVideoClientHeight === 0) {
        return;
      }
      var borderWidth = _this21.__options.frameBorderStyle.width;
      var borderRadius = _this21.__options.frameBorderStyle.radius;
      if (_this21.__isRotated90or270) {
        [calcVideoWidth, calcVideoHeight] = [calcVideoHeight, calcVideoWidth];
        [calcVideoClientWidth, calcVideoClientHeight] = [calcVideoClientHeight, calcVideoClientWidth];
        calcVideoOrientation = _this21.__videoOrientation === 'portrait' ? 'landscape' : 'portrait';
      }
      var newVideoWidth = calcVideoClientWidth;
      var newVideoHeight = calcVideoClientHeight;
      var guideBoxRatioByWidth = _this21.__guideBoxRatioByWidth;
      var videoRatioByHeight = _this21.__videoRatioByHeight;
      var newVideoRatioByWidth = calcVideoClientHeight / calcVideoClientWidth;
      var newVideoRatioByHeight = calcVideoClientWidth / calcVideoClientHeight;
      if (_this21.__uiOrientation === 'portrait') {
        // 세로 UI
        _this21.__setStyle(captureUIWrap, {
          'justify-content': 'center',
          'align-items': 'flex-end'
        });
        // video 가로 기준 100% 유지 (변경없음)
        if (calcVideoOrientation === _this21.__uiOrientation) {
          // 카메라도 세로
          // 세로 UI && 세로 비디오
          // 가로 기준으로 가이드박스 계산
          guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth;
          guideBoxHeight = guideBoxWidth * scannerFrameRatio;

          // 가이드 박스 가로 기준으로 비디오 확대
          newVideoWidth = guideBoxWidth;
          newVideoHeight = newVideoWidth * newVideoRatioByWidth;
        } else {
          // 카메라는 가로
          // 세로 UI && 가로 비디오
          // 가이드 박스를 비디오 세로 길이에 맞춤
          guideBoxHeight = __calcGuideBoxCriteria(calcVideoClientHeight, calcVideoHeight);
          guideBoxWidth = guideBoxHeight * baseWidth / baseHeight;
        }
      } else {
        // 가로 UI
        _this21.__setStyle(captureUIWrap, {
          'justify-content': 'end',
          'align-items': 'center'
        });
        if (calcVideoOrientation === _this21.__uiOrientation) {
          // 가로 UI && 가로 비디오
          // 비디오를 가로 UI의 height 기준으로 줄이고
          // 가로 UI height 기준으로 비디오의 width 계산

          // 가이드박스는 세로 기준으로 맞춤
          guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
          guideBoxWidth = guideBoxHeight * baseWidth / baseHeight;

          // 비디오를 세로 기준으로 다시 맞춤
          newVideoHeight = guideBoxHeight;
          newVideoWidth = newVideoHeight * newVideoRatioByHeight;

          // 가이드박스의 가로 크기가 가로 UI width * ratio 값보다 크면,
          if (guideBoxWidth > __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth) {
            // 계산 방식을 바꾼다 (사유 : 거의 정사각형에 가까운 경우 가이드 박스 가로가 꽉차게 됨.)
            guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth;
            guideBoxHeight = guideBoxWidth * scannerFrameRatio;

            // 가이드 박스 가로 기준으로 비디오 확대
            newVideoWidth = guideBoxWidth;
            newVideoHeight = newVideoWidth * newVideoRatioByWidth;
          }
        } else {
          // 가로 UI && 세로 비디오
          // 가로 기준으로 가이드박스 계산

          // 가이드박스의 height 크기를 UI의 height 기준에 맞춤
          guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
          guideBoxWidth = guideBoxHeight * baseWidth / baseHeight;

          // 가이드박스의 가로 크기가 가로 UI width * ratio 값보다 크면,
          if (guideBoxWidth > __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth) {
            // 계산 방식을 바꾼다 (사유 : 거의 정사각형에 가까운 경우 가이드 박스 가로가 꽉차게 됨.)
            guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth;
            guideBoxHeight = guideBoxWidth * scannerFrameRatio;
          }

          // 가이드 박스 가로 기준으로 비디오 축소
          newVideoWidth = guideBoxWidth;
          newVideoHeight = newVideoWidth * newVideoRatioByWidth;
        }
      }

      // calcGuideBoxCriteria(카메라 해상도 설정 기준)가 ocrViewSize(화면 크기) 기준일때
      if (_this21.__options.calcGuideBoxCriteria === 'ocrViewSize') {
        // guideBoxHeight 이 calcOcrClientHeight 보다 큰경우(가이드박스가 화면을 넘어가는 경우) 다시 계산
        if (guideBoxHeight > calcOcrClientHeight) {
          guideBoxHeight = Math.min(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
          guideBoxWidth = guideBoxHeight * baseWidth / baseHeight;
          newVideoWidth = guideBoxWidth;
          newVideoHeight = newVideoWidth * newVideoRatioByWidth;
        }

        // guideBoxHeight 이 calcOcrClientHeight 보다 큰경우(가이드박스가 화면을 넘어가는 경우) 다시 계산
        if (guideBoxWidth > calcOcrClientWidth) {
          guideBoxWidth = Math.min(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth;
          guideBoxHeight = guideBoxWidth * scannerFrameRatio;
          newVideoWidth = guideBoxWidth;
          newVideoHeight = newVideoWidth * newVideoRatioByWidth;
        }
      }
      _this21.__cropImageSizeWidth = Math.min(guideBoxWidth, newVideoWidth);
      _this21.__cropImageSizeHeight = Math.min(guideBoxHeight, newVideoHeight);
      if (_this21.__isRotated90or270) {
        [newVideoWidth, newVideoHeight] = [newVideoHeight, newVideoWidth];
      }
      guideBoxWidth += borderWidth * 2;
      guideBoxHeight += borderWidth * 2;
      var reducedGuideBoxWidth = guideBoxWidth * _this21.__guideBoxReduceRatio;
      var reducedGuideBoxHeight = guideBoxHeight * _this21.__guideBoxReduceRatio;
      if (topUI) {
        _this21.__setStyle(topUI, {
          'padding-bottom': '10px',
          height: (calcOcrClientHeight - guideBoxHeight) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column-reverse'
        });
      }
      if (middleUI) {
        _this21.__setStyle(middleUI, {
          width: reducedGuideBoxWidth - borderWidth * 2 + 'px',
          height: reducedGuideBoxHeight - borderWidth * 2 + 'px',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '10px'
        });
      }
      if (bottomUI) {
        _this21.__setStyle(bottomUI, {
          'padding-top': '10px',
          height: (calcOcrClientHeight - guideBoxHeight) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column'
        });
      }
      _this21.__setStyle(video, {
        width: newVideoWidth + 'px'
      });
      _this21.__setStyle(video, {
        height: newVideoHeight + 'px'
      });
      var videoInnerGap = 2; // 미세하게 maskBoxInner보다 guideBox가 작은것 보정
      _this21.__setStyle(guideBox, {
        width: reducedGuideBoxWidth - videoInnerGap + 'px',
        height: reducedGuideBoxHeight - videoInnerGap + 'px',
        backgroundColor: 'transparent'
      });
      var maskBoxInner = maskBoxWrap.querySelector('#maskBoxInner');
      var r = borderRadius - borderWidth * 2;
      r = r < 0 ? 0 : r;
      if (!isNaN(reducedGuideBoxWidth) && !isNaN(reducedGuideBoxHeight) && !isNaN(borderRadius) && !isNaN(borderWidth)) {
        var maskBoxInnerWidth = Math.max(reducedGuideBoxWidth - borderWidth * 2 - videoInnerGap, 0);
        var maskBoxInnerHeight = Math.max(reducedGuideBoxHeight - borderWidth * 2 - videoInnerGap, 0);
        maskBoxInner.setAttribute('width', maskBoxInnerWidth + '');
        maskBoxInner.setAttribute('height', maskBoxInnerHeight + '');
        maskBoxInner.setAttribute('x', maskBoxInnerWidth / 2 * -1 + '');
        maskBoxInner.setAttribute('y', maskBoxInnerHeight / 2 * -1 + '');
        maskBoxInner.setAttribute('rx', r + '');
        maskBoxInner.setAttribute('ry', r + '');
      }

      // 수동 촬영 UI 사용
      // firstCalled인 경우 아직 captureUI가 그려지지 않아 무의미
      if (_this21.__options.useCaptureUI) {
        _this21.__setStyle(captureUI, {
          display: ''
        });
        if (_this21.__uiOrientation === 'portrait' && bottomUI && captureUI) {
          var calcSumOfHeightBottomUIChildNodes = _this21.__calcSumOfHeightChildNodes(bottomUI);
          var calcCaptureButtonHeight = captureButton.querySelector('svg').getAttribute('height');
          calcCaptureButtonHeight = calcCaptureButtonHeight === 0 ? 80 : calcCaptureButtonHeight;
          var captureUIPaddingBottom = bottomUI.clientHeight;
          captureUIPaddingBottom -= isNaN(parseInt(bottomUI.style.paddingTop)) ? 0 : parseInt(bottomUI.style.paddingTop);
          captureUIPaddingBottom -= calcSumOfHeightBottomUIChildNodes;
          captureUIPaddingBottom -= calcCaptureButtonHeight;
          var baseline = calcOcrClientHeight - (calcOcrClientHeight / 2 + guideBoxHeight / 2);
          if (captureUIPaddingBottom > 0 && captureUIPaddingBottom < baseline) {
            _this21.__setStyle(captureUI, {
              'padding-right': '',
              'padding-bottom': captureUIPaddingBottom + 'px'
            });
          }
        } else {
          _this21.__setStyle(captureUI, {
            'padding-right': '10px',
            'padding-bottom': ''
          });
        }
      }
      yield _this21.__changeStage(_this21.__inProgressStep, true);
      void 0;
    })();
  }
  __calcSumOfHeightChildNodes(obj) {
    var sum = 0;
    for (var item of obj === null || obj === void 0 ? void 0 : obj.childNodes) {
      sum += item.clientHeight ? item.clientHeight : 0;
    }
    return sum;
  }
  __closeCamera() {
    this.__clearCameraPermissionTimeoutTimer();
    this.stopScan();
    this.stopStream();
  }
  __loadResources() {
    var _this22 = this;
    return _asyncToGenerator(function* () {
      void 0;
      if (_this22.__resourcesLoaded) {
        void 0;
        return;
      }
      _this22.__isSupportSimd = yield simd();
      var envInfo = '';
      envInfo += "os : ".concat(_this22.__deviceInfo.os, "\n");
      envInfo += "osSimple : ".concat(_this22.__deviceInfo.osSimple, "\n");
      envInfo += "isSupportWasm: ".concat(_this22.__isSupportWasm, "\n");
      envInfo += "simd(wasm-feature-detect) : ".concat(_this22.__isSupportSimd, "\n");
      if (_this22.__deviceInfo.osSimple === 'IOS' || _this22.__deviceInfo.osSimple === 'MAC') {
        _this22.__isSupportSimd = false;
      }
      envInfo += "isSupportSimd(final) : ".concat(_this22.__isSupportSimd, "\n");
      envInfo += "UserAgent : ".concat(navigator.userAgent, "\n");
      void 0;
      _this22.__debug(envInfo);
      window.usebOCREnvInfo = envInfo;
      var sdkSupportEnv = 'quram';
      if (_this22.__isSupportSimd) {
        void 0;
        sdkSupportEnv += '_simd';
      } else {
        void 0;
      }
      void 0;
      window.usebOCREnvInfo = envInfo;
      void 0;
      var postfix = '';
      if (_this22.__options.force_wasm_reload) {
        // 옵션이 활성화 되면 새로운 WASM 리소스를 요청함.
        postfix = '?ver=' + _this22.__options.force_wasm_reload_flag;
      }
      var url = new URL(sdkSupportEnv + '.js' + postfix, _this22.__options.resourceBaseUrl);
      var src = yield fetch(url.href).then(res => res.text()).then(text => {
        var regex = /(.*) = Module.cwrap/gm;
        var source = text.replace(regex, 'Module.$1 = Module.cwrap');

        // data(model)
        source = source.replace(/^\(function\(\) \{/m, 'var createModelData = async function() {\n' + ' return new Promise(async function (resolve, reject) {\n');
        source = source.replace('   console.error("package error:", error);', '   reject();\n' + '   console.error("package error:", error);');
        source = source.replace('  }, handleError)', '  resolve();\n' + '  }, handleError)');
        source = source.replace(/^\}\)\(\);/m, '\n })\n' + '};');

        // wasm
        source = source.replace(sdkSupportEnv + '.wasm', new URL(sdkSupportEnv + '.wasm' + postfix, _this22.__options.resourceBaseUrl).href);
        source = source.replace(new RegExp("REMOTE_PACKAGE_BASE = ['\"]".concat(sdkSupportEnv, "\\.data[\"']"), 'gm'), "REMOTE_PACKAGE_BASE = \"".concat(new URL(sdkSupportEnv + '.data' + postfix, _this22.__options.resourceBaseUrl).href, "\""));
        source = source.replace('function createWasm', 'async function createWasm');
        source = source.replace('instantiateAsync();', 'await instantiateAsync();');

        // wasm and data(model) file 병렬로 fetch 하기 위해
        source = source.replace('var asm = createWasm();', 'console.log("create wasm and data - start")\n' + 'await (async function() {\n' + '  return new Promise(function(resolve) {\n' + '    var isCreatedWasm = false;\n' + '    var isCreatedData = false;\n' + '    createWasm().then(() => {\n' + '      isCreatedWasm = true;\n' + '      if (isCreatedData) { resolve(); }\n' + '    });\n' + '    createModelData().then(() => {\n' + '      isCreatedData = true;\n' + '      if (isCreatedWasm) { resolve(); }\n' + '    })\n' + '  });\n' + '})();\n' + 'console.log("create wasm and data - end")');
        return source;
      });
      src = "\n    (async function() {\n      ".concat(src, "\n      Module.lengthBytesUTF8 = lengthBytesUTF8\n      Module.stringToUTF8 = stringToUTF8\n      return Module\n    })()\n        ");
      _this22.__OCREngine = yield eval(src);
      _this22.__OCREngine.onRuntimeInitialized = /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(function* (_) {
          void 0;
        });
        return function (_x3) {
          return _ref11.apply(this, arguments);
        };
      }();
      yield _this22.__OCREngine.onRuntimeInitialized();
      _this22.__resourcesLoaded = true;
      void 0;
    })();
  }
  __startScanWasmImpl() {
    var _this23 = this;
    return new Promise((resolve, reject) => {
      this.__detected = false;
      this.setIgnoreComplete(false);
      // 추후 위에 주석 풀어야함 - START
      // this.__setPiiEncryptMode(this.__options.usePiiEncryptMode); // ocr result encrypt
      // 추후 위에 주석 풀어야함 - END
      this.__blurCaptureButton();
      this.__address = 0;
      this.__pageEnd = false;
      this.__manualOCRRetryCount = 0;
      this.__ssaRetryCount = 0;
      var scan = /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator(function* () {
          try {
            var ocrResult = null,
              isDetectedCard = null,
              imgData = null,
              imgDataUrl = null,
              maskImage = null,
              faceImage = null,
              ssaResult = null,
              ssaResultList = [],
              maskInfo = null;

            // await this.__changeStage(IN_PROGRESS.READY);
            if (!_this23.__OCREngine['asm']) return;

            // TODO : 설정할수 있게 변경  default 값도 제공
            var [resolution_w, resolution_h] = [_this23.__resolutionWidth, _this23.__resolutionHeight];
            var {
              video
            } = detector.getOCRElements();
            if (resolution_w === 0 || resolution_h === 0) return;
            if (_this23.__detected) {
              yield _this23.__sleep(100);
              return;
            }
            // console.log('address before ---------', address);
            if (_this23.__address === 0 && !_this23.__pageEnd && (yield _this23.__isVideoResolutionCompatible(video))) {
              [_this23.__address, _this23.__destroyScannerCallback] = _this23.__getScannerAddress(_this23.__ocrType);
            }
            if (!_this23.__address || _this23.__pageEnd) {
              yield _this23.__sleep(100);
              return;
            }
            // console.log('address after ---------', address);

            if (_this23.__ocrStatus < _this23.OCR_STATUS.OCR_SUCCESS) {
              // OCR 완료 이전 상태

              // card not detected
              [isDetectedCard, imgData, imgDataUrl] = yield _this23.__isCardboxDetected(_this23.__address, 0);
              if (!isDetectedCard) {
                if (_this23.__inProgressStep !== _this23.IN_PROGRESS.READY) {
                  yield _this23.__changeStage(_this23.IN_PROGRESS.CARD_DETECT_FAILED);
                }
                if (_this23.__isClickedCaptureButton()) {
                  yield _this23.__changeStage(_this23.IN_PROGRESS.MANUAL_CAPTURE_FAILED, false, imgDataUrl);
                  _this23.__blurCaptureButton();
                  _this23.setIgnoreComplete(false); // 필요한가?
                }

                return;
              }

              // card is detected
              yield _this23.__changeStage(_this23.IN_PROGRESS.CARD_DETECT_SUCCESS);

              // ssa retry 설정이 되어 있으거나, 수동촬영UI를 사용하는 경우, card detect 성공시 이미지 저장
              _this23.__enqueueDetectedCardQueue(imgData, imgDataUrl);
              if (_this23.__isClickedCaptureButton()) {
                _this23.setIgnoreComplete(true);
                yield _this23.__changeStage(_this23.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS, false, imgDataUrl);
              }
              [ocrResult, imgDataUrl, maskImage, faceImage] = yield _this23.__startRecognition(_this23.__address, _this23.__ocrType, _this23.__ssaMode, _this23.__isClickedCaptureButton(), imgData, imgDataUrl);

              // if (this.__isClickedCaptureButton()) {
              //   this.__blurCaptureButton();
              //   this.setIgnoreComplete(false);        // 필요한가?
              // }
            }

            if (_this23.__ocrStatus >= _this23.OCR_STATUS.OCR_SUCCESS) {
              // ocr 완료 이후 상태

              // failure case
              if (ocrResult === false) {
                throw new Error("OCR Status is ".concat(_this23.__ocrStatus, ", but ocrResult is false")); // prettier-ignore
              }

              // success case
              _this23.__setStyle(video, {
                display: 'none'
              }); // OCR 완료 시점에 camera preview off

              if (_this23.__ssaMode) {
                void 0;
                // 최초 시도
                ssaResult = yield _this23.__startTruth(_this23.__ocrType, _this23.__address); // prettier-ignore
                if (ssaResult === null) throw new Error('[ERR] SSA MODE is true. but, ssaResult is null'); // prettier-ignore

                ssaResultList.push(ssaResult);
                if (_this23.__options.ssaMaxRetryCount > 0) {
                  var retryStartDate = new Date();
                  var FAKE = _this23.__options.ssaRetryType === 'FAKE';
                  var REAL = _this23.__options.ssaRetryType === 'REAL';
                  var ENSEMBLE = _this23.__options.ssaRetryType === 'ENSEMBLE';
                  var isCompleted = false; // 비동기 for 문 때문에 break가 안걸리는 이슈로 넣음
                  var _loop = function* _loop(item) {
                    if (isCompleted) {
                      void 0; // prettier-ignore
                      return "break";
                    }
                    // prettier-ignore
                    if (_this23.__ssaRetryCount === _this23.__options.ssaMaxRetryCount) {
                      void 0;
                      return "break";
                    }
                    var execute = /*#__PURE__*/function () {
                      var _ref13 = _asyncToGenerator(function* () {
                        _this23.__ssaRetryCount++;
                        void 0; // prettier-ignore
                        ssaResult = yield _this23.__startTruthRetry(_this23.__ocrType, _this23.__address, item); // prettier-ignore
                        if (ssaResult === null) throw new Error('[ERR] SSA MODE is true. but, ssaResult is null'); // prettier-ignore

                        ssaResultList.push(ssaResult);
                      });
                      return function execute() {
                        return _ref13.apply(this, arguments);
                      };
                    }();
                    if (FAKE) {
                      if (ssaResult.indexOf('REAL') > -1) {
                        yield execute();
                      } else {
                        isCompleted = true;
                      }
                    }
                    if (REAL) {
                      if (ssaResult.indexOf('FAKE') > -1) {
                        yield execute();
                      } else {
                        isCompleted = true;
                      }
                    }
                    if (ENSEMBLE) {
                      yield execute();
                    }
                  };
                  for (var item of _this23.__detectedCardQueue) {
                    var _ret = yield* _loop(item);
                    if (_ret === "break") break;
                  }
                  var retryWorkingTime = new Date() - retryStartDate;
                  void 0; // prettier-ignore
                } else {
                  void 0;
                }
              }
              if (_this23.__options.useMaskInfo) {
                maskInfo = _this23.__getMaskInfo(_this23.__address);
              }
              void 0;
              var {
                legacyFormat,
                newFormat
              } = usebOCRWASMParser.parseOcrResult(_this23.__ocrType, _this23.__ssaMode, ocrResult, ssaResult, _this23.__ssaRetryCount, ssaResultList, _this23.__options.ssaRetryType, _this23.__options.ssaRetryPivot
              // 추후 위에 주석 풀어야함 - START
              // this.__options.usePiiEncryptMode
              // 추후 위에 주석 풀어야함 - END
              );

              var review_result = {
                ocr_type: _this23.__ocrType,
                ocr_result: newFormat,
                ocr_origin_image: imgDataUrl,
                ocr_masking_image: maskImage,
                ocr_face_image: faceImage,
                maskInfo: maskInfo,
                ssa_mode: _this23.__ssaMode
              };
              yield _this23.__compressImages(review_result, imgDataUrl, maskImage, faceImage);
              _this23.encryptResult(review_result);
              review_result.ocr_result = _this23.__options.ocrResultExcludeKeylist.includes('all') ? _this23.excludeOcrResult(review_result.ocr_result, [..._this23.__ocrResultKeySet]) : _this23.excludeOcrResult(review_result.ocr_result, _this23.__options.ocrResultExcludeKeylist);
              review_result = _this23.__options.ocrImageExcludeKeylist.includes('all') ? _this23.excludeOcrImage(review_result, [..._this23.__ocrImageKeySet]) : _this23.excludeOcrImage(review_result, _this23.__options.ocrImageExcludeKeylist);
              if (_this23.__options.useLegacyFormat) {
                review_result.ocr_data = legacyFormat;
              }
              yield _this23.__onSuccessProcess(review_result);
              _this23.__closeCamera();
              _this23.__detected = true;
              resolve();
            }
          } catch (e) {
            var errorMessage = 'Card detection error';
            if (e.message) {
              errorMessage += ': ' + e.message;
            }
            void 0;

            // if (e.toString().includes('memory')) {
            //   await this.__recoveryScan();
            //   this.__recovered = true;
            // } else {
            yield _this23.__onFailureProcess('WA001', e, errorMessage);
            _this23.__closeCamera();
            _this23.__detected = true;
            reject();
            // }
          } finally {
            if (_this23.__recovered) {
              _this23.__recovered = false;
              return;
            }
            if (!_this23.__detected) {
              setTimeout(scan, 1); // 재귀
            }
          }
        });
        return function scan() {
          return _ref12.apply(this, arguments);
        };
      }();
      setTimeout(scan, 1); // UI 랜더링 blocking 방지 (setTimeout)
    });
  }

  __compressImages(review_result, imgDataUrl, maskImage, faceImage, constantNumber) {
    var _this24 = this;
    return _asyncToGenerator(function* () {
      if (_this24.__options.useCompressImage) {
        var resizeRatio = _this24.__cropImageSizeHeight / _this24.__cropImageSizeWidth;
        var defaultOptions = {
          maxWidth: _this24.__options.useCompressImageMaxWidth,
          maxHeight: _this24.__options.useCompressImageMaxWidth * resizeRatio,
          convertSize: _this24.__options.useCompressImageMaxVolume,
          targetCompressVolume: _this24.__options.useCompressImageMaxVolume // custom option
        };

        if (!_this24.__options.ocrImageExcludeKeylist.includes('ocr_origin_image')) {
          review_result.ocr_origin_image = yield _this24.__compreseBase64Image(imgDataUrl, defaultOptions, constantNumber);
        }
        if (!_this24.__options.ocrImageExcludeKeylist.includes('ocr_masking_image')) {
          // masking 이미지는 resize 하면, mask 좌표가 어긋나므로 리사이즈 안하고 압축만 진행
          var maskingImageOptions = {
            quality: defaultOptions.quality,
            targetCompressVolume: defaultOptions.targetCompressVolume
          };
          review_result.ocr_masking_image = yield _this24.__compreseBase64Image(maskImage, maskingImageOptions, constantNumber);
        }
        if (!_this24.__options.ocrImageExcludeKeylist.includes('ocr_face_image')) {
          review_result.ocr_face_image = yield _this24.__compreseBase64Image(faceImage, defaultOptions, constantNumber);
        }
      }
    })();
  }
  __requestGetAPIToken() {
    return new Promise((resolve, reject) => {
      var credential = this.__options.authServerInfo.credential;
      var baseUrl = this.__options.authServerInfo.baseUrl;
      fetch("".concat(baseUrl, "/sign-in"), {
        body: JSON.stringify(credential),
        method: 'POST'
        // mode: 'cors',
        // credentials: 'include',
      }).then(res => res.json()).then(result => {
        void 0;
        fetch("".concat(baseUrl, "/useb/token"), {
          headers: {
            authorization: "Bearer ".concat(result.token)
          },
          body: null,
          method: 'GET'
        }).then(res => res.json()).then(json => {
          resolve(json.token);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }
  __requestServerOCR(ocrType, ssaMode, imgDataUrl) {
    var _this25 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref14 = _asyncToGenerator(function* (resolve, reject) {
        try {
          var baseUrl = _this25.__options.ocrServerBaseUrl;
          switch (ocrType) {
            case 'idcard':
            case 'driver':
            case 'idcard-ssa':
            case 'driver-ssa':
              baseUrl += '/ocr/idcard-driver';
              break;
            case 'passport':
            case 'passport-ssa':
            case 'foreign-passport':
            case 'foreign-passport-ssa':
              baseUrl += '/ocr/passport';
              break;
            case 'alien-back':
              baseUrl += '/ocr/alien-back';
              break;
            case 'alien':
            case 'alien-ssa':
              baseUrl += '/ocr/alien';
              break;
            case 'credit':
              throw new Error('Credit card is not Unsupported Server OCR');
            default:
              throw new Error("Unsupported OCR type: ".concat(ocrType));
          }
          var apiToken = yield _this25.__requestGetAPIToken();
          var myHeaders = new Headers();
          myHeaders.append('Authorization', "Bearer ".concat(apiToken));
          var param = {
            image_base64: imgDataUrl,
            mask_mode: 'true',
            face_mode: 'true'
          };
          if (_this25.__ssaMode) {
            param.ssa_mode = 'true';
          }
          var raw = JSON.stringify(param);
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch(baseUrl, requestOptions).then(res => res.json()).then(result => {
            void 0;
            resolve(result);
          }).catch(e => {
            throw e;
          });
        } catch (err) {
          void 0;
          reject(err);
        }
      });
      return function (_x4, _x5) {
        return _ref14.apply(this, arguments);
      };
    }());
  }
  __startScanServerImpl() {
    var _this26 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref15 = _asyncToGenerator(function* (resolve, reject) {
        try {
          var _this26$__captureButt;
          // 추후 위에 주석 풀어야함 - START
          // this.__setPiiEncryptMode(this.__options.usePiiEncryptMode); // ocr result encrypt
          // 추후 위에 주석 풀어야함 - END
          _this26.__blurCaptureButton();
          var ocrResult = null,
            ssaResult = null,
            ssaResultList = [];
          var __onClickCaptureButton = /*#__PURE__*/function () {
            var _ref16 = _asyncToGenerator(function* () {
              // 캔버스에서 이미지를 가져옴
              var [, imgDataUrl] = yield _this26.__cropImageFromVideo();
              if (1 === true) {
                // server ocr 실패 (발생 가능성 없음)
              } else {
                // server ocr 성공
                yield _this26.__changeStage(_this26.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS, false, imgDataUrl);
                try {
                  ocrResult = yield _this26.__requestServerOCR(_this26.__ocrType, _this26.__ssaMode, imgDataUrl);

                  // failure case
                  if (ocrResult === false) {
                    yield _this26.__changeStage(_this26.IN_PROGRESS.OCR_FAILED);
                  }
                } catch (e) {
                  throw new Error("Server OCR is failed");
                }

                // ssa 시도?

                // success case
                var {
                  video
                } = detector.getOCRElements();
                _this26.__setStyle(video, {
                  display: 'none'
                }); // OCR 완료 시점에 camera preview off

                void 0;
                var {
                  legacyFormat,
                  newFormat,
                  base64ImageResult,
                  maskInfo
                } = usebOCRAPIParser.parseOcrResult(_this26.__ocrType, _this26.__ssaMode, ocrResult);
                var review_result = {
                  ocr_type: _this26.__ocrType,
                  ocr_result: newFormat,
                  ocr_origin_image: imgDataUrl,
                  ocr_masking_image: base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_masking_image,
                  ocr_face_image: base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_face_image,
                  maskInfo,
                  ssa_mode: _this26.__ssaMode
                };
                if (_this26.__debugMode) {
                  review_result.ocr_api_response = ocrResult;
                }
                yield _this26.__compressImages(review_result, imgDataUrl, base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_masking_image, base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_face_image, 0.0);
                _this26.encryptResult(review_result);
                if (_this26.__options.useLegacyFormat) {
                  review_result.ocr_data = legacyFormat;
                }
                if (ocrResult.complete === true) {
                  yield _this26.__onSuccessProcess(review_result);
                  _this26.__closeCamera();
                  resolve();
                } else {
                  var _ocrResult3;
                  var resultCode = 'SF001';
                  var resultMessage = "".concat(ocrResult.scanner_type, ":").concat((_ocrResult3 = ocrResult) === null || _ocrResult3 === void 0 ? void 0 : _ocrResult3.result_code);
                  var resultDetail = JSON.stringify(ocrResult);
                  yield _this26.__onFailureProcess(resultCode, resultDetail, resultMessage); // QURAM Server OCR 에러

                  _this26.__closeCamera();
                  reject();
                }
              }
            });
            return function __onClickCaptureButton() {
              return _ref16.apply(this, arguments);
            };
          }();
          (_this26$__captureButt = _this26.__captureButton) === null || _this26$__captureButt === void 0 ? void 0 : _this26$__captureButt.addEventListener('click', __onClickCaptureButton);
        } catch (e) {
          var errorMessage = 'Server OCR Error';
          if (e.message) {
            errorMessage += ': ' + e.message;
          }
          void 0;
          yield _this26.__onFailureProcess('SE001', e, errorMessage); // QURAM Server OCR 에러
          _this26.__closeCamera();
          reject();
        }
      });
      return function (_x6, _x7) {
        return _ref15.apply(this, arguments);
      };
    }());
  }
  __enqueueDetectedCardQueue(imgData, imgDataURL) {
    // ssa retry 설정이 되어 있으거나, 수동촬영UI를 사용하는 경우, card detect 성공시 이미지 저장
    if (this.__ssaMode && this.__options.ssaMaxRetryCount > 0 || this.__options.useCaptureUI && this.__manualOCRMaxRetryCount > 0) {
      var limitSaveImageCount = Math.max(this.__options.ssaMaxRetryCount, this.__manualOCRMaxRetryCount);
      if (this.__detectedCardQueue.length === limitSaveImageCount) {
        this.__detectedCardQueue.shift();
        if (this.__debugMode) this.__detectedCardQueueBase64.shift();
      }
      this.__detectedCardQueue.push(imgData);
      if (this.__debugMode) {
        this.__detectedCardQueueBase64.push(imgDataURL);
        void 0; // should be removed
      }

      void 0; // should be removed
    }
  }

  __onSuccessProcess(review_result) {
    var _this27 = this;
    return _asyncToGenerator(function* () {
      // 인식 성공 스캔 루프 종료
      if (review_result.ssa_mode) {
        yield _this27.__changeStage(_this27.IN_PROGRESS.OCR_SUCCESS_WITH_SSA);
      } else {
        yield _this27.__changeStage(_this27.IN_PROGRESS.OCR_SUCCESS);
      }
      var result = {
        api_response: {
          result_code: 'N100',
          result_message: 'OK.'
        },
        result: 'success',
        review_result: review_result
      };
      if (_this27.__onSuccess) {
        _this27.__onSuccess(result);
        _this27.__onSuccess = null;
      } else {
        void 0;
      }
    })();
  }
  __onFailureProcess(resultCode, e, errorMessage) {
    var _this28 = this;
    return _asyncToGenerator(function* () {
      yield _this28.__changeStage(_this28.IN_PROGRESS.OCR_FAILED);
      var errorDetail = '';
      if (e !== null && e !== void 0 && e.toString()) errorDetail += e.toString();
      if (e !== null && e !== void 0 && e.stack) errorDetail += e.stack;
      var result = {
        api_response: {
          result_code: resultCode,
          result_message: errorMessage
        },
        result: 'failed',
        review_result: {
          ocr_type: _this28.__ocrType,
          error_detail: errorDetail
        }
      };
      if (_this28.__onFailure) {
        _this28.__onFailure(result);
        _this28.__onFailure = null;
      } else {
        void 0;
      }
    })();
  }
  __preloadingWasm() {
    var _this29 = this;
    return _asyncToGenerator(function* () {
      var preloadingStatus = _this29.getPreloadingStatus();
      if (!_this29.isPreloaded() && preloadingStatus === _this29.PRELOADING_STATUS.NOT_STARTED) {
        void 0;
        yield _this29.preloading();
      } else {
        if (preloadingStatus === _this29.PRELOADING_STATUS.STARTED) {
          void 0;
          yield _this29.__waitPreloaded();
        } else if (preloadingStatus === _this29.PRELOADING_STATUS.DONE) {
          void 0;
        } else {
          throw new Error("abnormally preloading status, preloaded: ".concat(_this29.isPreloaded(), " / preloadingStatus: ").concat(_this29.getPreloadingStatus()));
        }
      }
    })();
  }

  // 추후 위에 주석 풀어야함 - START
  // __setPiiEncryptMode(piiEncryptMode) {
  //   this.__OCREngine.setPiiEncrypt(piiEncryptMode);
  // }
  //
  // __encryptDetectedBase64(address, mask, ocr_mode, imgType = 'card') {
  //   if (imgType === 'face') {
  //     return this.__OCREngine.encryptBase64jpgDetectedPhotoBase64(address);
  //   }
  //   return this.__OCREngine.encryptBase64jpgDetectedFrameBase64(
  //     address,
  //     mask,
  //     ocr_mode
  //   );
  // }
  //
  // __getEncryptedSize() {
  //   return this.__OCREngine.getEncryptedJpgSize();
  // }
  //
  // __getEncryptedBuffer() {
  //   return this.__OCREngine.getEncryptedJpgBuffer();
  // }
  //
  // __getPiiEncryptImageBase64(address, mask, imgMode, imgType = 'card') {
  //   const encryptDetectedBase64 = this.__encryptDetectedBase64(
  //     address,
  //     mask,
  //     imgMode,
  //     imgType
  //   );
  //   if (encryptDetectedBase64 === 1) {
  //     const jpgSize = this.__getEncryptedSize();
  //     const jpgPointer = this.__getEncryptedBuffer();
  //
  //     const encrypted = new Uint8Array(
  //       this.__OCREngine.HEAP8.buffer,
  //       jpgPointer,
  //       jpgSize
  //     );
  //     const textDecoder = new TextDecoder('utf-8');
  //     const decodedString = textDecoder.decode(encrypted);
  //
  //     return decodedString;
  //   }
  //   return '';
  // }
  // 추후 위에 주석 풀어야함 - END

  __startScanWasm() {
    var _this30 = this;
    return _asyncToGenerator(function* () {
      _this30.__debug('wasm_mode');
      _this30.cleanup();
      yield _this30.__proceedCameraPermission();
      yield _this30.__startScanWasmImpl();
      void 0;
    })();
  }
  __startScanServer() {
    var _this31 = this;
    return _asyncToGenerator(function* () {
      _this31.__debug('server_mode');
      _this31.cleanup();
      _this31.__options.useCaptureUI = true;
      yield _this31.__proceedCameraPermission();
      yield _this31.__startScanServerImpl();
      void 0;
    })();
  }
  __recoveryScan() {
    var _this32 = this;
    return _asyncToGenerator(function* () {
      void 0;
      _this32.__resourcesLoaded = false;
      _this32.stopScan();
      yield _this32.__startScanWasm();
    })();
  }
  stopScan() {
    this.__detected = true; // switch to server일때 기존 WASM loop 강제종료
    var {
      canvas
    } = detector.getOCRElements();
    if (canvas) {
      var canvasContext = canvas.getContext('2d', {
        willReadFrequently: true
      });
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  stopStream() {
    cancelAnimationFrame(this.__requestAnimationFrameId);
    if (this.__stream) {
      this.__stream.stop && this.__stream.stop();
      var tracks = this.__stream.getTracks && this.__stream.getTracks();
      void 0;
      if (tracks && tracks.length) {
        tracks.forEach(track => track.stop());
      }
      this.__stream = null;
    }
  }

  /** 메모리 allocation free 함수 */
  cleanup() {
    this.__destroyScannerAddress();
    this.__destroyBuffer();
    this.__destroyPrevImage();
    this.__destroyStringOnWasmHeap();
  }
  restoreInitialize() {
    this.__initialized = false;
    this.__preloaded = false;
    this.__preloadingStatus = this.PRELOADING_STATUS.NOT_STARTED;
    this.__resourcesLoaded = false;
  }
  __clearCameraPermissionTimeoutTimer() {
    if (this.__cameraPermissionTimeoutTimer) {
      clearTimeout(this.__cameraPermissionTimeoutTimer);
      this.__cameraPermissionTimeoutTimer = null;
    }
  }
}
export default UseBOCR;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJTZXQiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VFbmNyeXB0T3ZlcmFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlQ3JvcHBpbmciLCJ1c2VJbWFnZVdhcnBpbmciLCJ1c2VDb21wcmVzc0ltYWdlIiwidXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoIiwidXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSIsIm9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0IiwiZW5jcnlwdE9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0Iiwib2NySW1hZ2VFeGNsdWRlS2V5bGlzdCIsImVuY3J5cHRPY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0IiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNzYVJldHJ5VHlwZSIsInNzYVJldHJ5UGl2b3QiLCJzc2FNYXhSZXRyeUNvdW50IiwidXNlRGVidWdBbGVydCIsImZvcmNlX3dhc21fcmVsb2FkIiwiZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZyIsInByZWxvYWRpbmciLCJvblByZWxvYWRlZCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJpc1ByZWxvYWRlZCIsInNob3dPQ1JMb2FkaW5nVUkiLCJfX3ByZWxvYWRpbmdTdGF0dXMiLCJfX2xvYWRSZXNvdXJjZXMiLCJfX3ByZWxvYWRlZCIsImhpZGVPQ1JMb2FkaW5nVUkiLCJpc0luaXRpYWxpemVkIiwiX19pbml0aWFsaXplZCIsImdldFByZWxvYWRpbmdTdGF0dXMiLCJpc0VuY3J5cHRNb2RlIiwiX19vcHRpb25zIiwiaXNDcmVkaXRDYXJkIiwiX19vY3JUeXBlIiwicHJlbG9hZGluZ1VJV3JhcCIsImdldE9DUkVsZW1lbnRzIiwiZGlzcGxheSIsImVuY3J5cHRSZXN1bHQiLCJyZXZpZXdfcmVzdWx0IiwiX19pc1N1cHBvcnRXYXNtIiwiaW5jbHVkZUxpc3QiLCJlbmNyeXB0ZWQiLCJvY3JfcmVzdWx0IiwiXyIsInRvUGFpcnMiLCJwaWNrIiwicmVkdWNlIiwiYWNjIiwiX3JlZiIsImtleSIsInZhbHVlIiwiX19lbmNyeXB0U2NhblJlc3VsdCIsIm9jcl9vcmlnaW5faW1hZ2UiLCJfb2JqZWN0U3ByZWFkIiwiZXhjbHVkZUxpc3QiLCJvbWl0IiwiX3JlZjIiLCJvY3JfbWFza2luZ19pbWFnZSIsIm9jcl9mYWNlX2ltYWdlIiwiZXhjbHVkZU9jclJlc3VsdCIsImluY2x1ZGVzIiwiZXhjbHVkZU9jckltYWdlIiwiX19vY3JJbWFnZUtleVNldCIsInRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJlbmNyeXB0ZWRfb3ZlcmFsbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJleGNsdWRlS2V5bGlzdCIsImdldE9DUkVuZ2luZSIsIl9fT0NSRW5naW5lIiwiaW5pdCIsInNldHRpbmdzIiwibGljZW5zZUtleSIsIkVycm9yIiwiX19saWNlbnNlIiwib2NyRXhjbHVkZUtleVN0cmluZ1RvSXRlciIsInN0ciIsImtleUl0ZXIiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJzcGxpdCIsImZpbHRlciIsImsiLCJoYXMiLCJfX29jclJlc3VsdEtleVNldCIsIm1lcmdlZE9wdGlvbnMiLCJtZXJnZSIsInNldE9wdGlvbiIsIl9fd2luZG93RXZlbnRCaW5kIiwiX19kZXZpY2VJbmZvIiwiZ2V0T3NWZXJzaW9uIiwiZ2V0T3B0aW9uIiwiZ2V0T2NyVHlwZSIsInR5cGUiLCJfX29jclR5cGVOdW1iZXJUb1N0cmluZyIsImdldCIsImdldE9jclR5cGVOdW1iZXIiLCJzdHJpbmciLCJfX29jclN0cmluZ1RvVHlwZU51bWJlciIsImdldFVJT3JpZW50YXRpb24iLCJfX3VpT3JpZW50YXRpb24iLCJnZXRWaWRlb09yaWVudGF0aW9uIiwiX192aWRlb09yaWVudGF0aW9uIiwiY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUiLCJfdGhpczIiLCJfX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlIiwibGF0ZW5jeVBlcjEwMG1zIiwibWVhc3VyZVJlcG9ydCIsIl9fZGVidWciLCJwYXJzZUZsb2F0Iiwic3RhcnRPQ1IiLCJvblN1Y2Nlc3MiLCJvbkZhaWx1cmUiLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwiX3RoaXMzIiwib25JblByb2dyZXNzQ2hhbmdlIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX19zc2FNb2RlIiwiaW5kZXhPZiIsIl9fb25TdWNjZXNzIiwiX19vbkZhaWx1cmUiLCJfX29uSW5Qcm9ncmVzc0NoYW5nZSIsIl9fdG9wVUkiLCJ0b3BVSSIsIl9fbWlkZGxlVUkiLCJtaWRkbGVVSSIsIl9fYm90dG9tVUkiLCJib3R0b21VSSIsIl9fY2hhbmdlU3RhZ2UiLCJfX3ByZXByb2Nlc3MiLCJfX3NldHVwRG9tRWxlbWVudHMiLCJfX3ByZWxvYWRpbmdXYXNtIiwiX19zdGFydFNjYW5TZXJ2ZXIiLCJfX3N0YXJ0U2Nhbldhc20iLCJlIiwic3RvcE9DUiIsImNsZWFudXAiLCJfX2Nsb3NlQ2FtZXJhIiwic2V0SWdub3JlQ29tcGxldGUiLCJ2YWwiLCJlbmNyeXB0IiwicGxhaW5TdHIiLCJyZXN0YXJ0T0NSIiwib2NyVHlwZSIsIl9hcmd1bWVudHMyIiwiX3RoaXM0IiwiaXNTd2l0Y2hNb2RlIiwiX19jYW1TZXRDb21wbGV0ZSIsIl9fd2FpdFByZWxvYWRlZCIsIl90aGlzNSIsIndhaXRpbmdSZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaGVjayIsInNldFRpbWVvdXQiLCJjb252ZXJ0VHlwZVRvTnVtYmVyIiwib3B0aW9uIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbnZlcnRUeXBlVG9GbG9hdCIsIl90aGlzXyIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJza2lwVG91Y2hBY3Rpb25mb3Jab29tIiwiZXYiLCJ0b3VjaGVzIiwicHJldmVudERlZmF1bHQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsIm9uYmVmb3JldW5sb2FkIiwiX19wYWdlRW5kIiwiaGFuZGxlUmVzaXplIiwiX3JlZjQiLCJfX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSIsIl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyIiwiYXBwbHkiLCJfX3Rocm90dGxpbmdSZXNpemVEZWxheSIsIm1zZyIsIl9fc2xlZXAiLCJtcyIsIl9fYmxvYlRvQmFzZTY0IiwiYmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwiX19iYXNlNjR0b0Jsb2IiLCJiYXNlNjQiLCJieXRlU3RyaW5nIiwiYXRvYiIsIm1pbWVTdHJpbmciLCJhYiIsIkFycmF5QnVmZmVyIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwiX19jb21wcmVzZUJhc2U2NEltYWdlIiwib3B0aW9ucyIsImNvbnN0YW50TnVtYmVyIiwiX3RoaXM2IiwiYmxvYkZpbGUiLCJjb21wcmVzc2VkIiwiY29tcHJlc3NJbWFnZSIsImNvbXByZXNzaW9uUmF0aW8iLCJNYXRoIiwicm91bmQiLCJzaXplIiwiX19nZXRTdHJpbmdPbldhc21IZWFwIiwibGVuZ3RoQnl0ZXMiLCJsZW5ndGhCeXRlc1VURjgiLCJfX3N0cmluZ09uV2FzbUhlYXAiLCJfbWFsbG9jIiwic3RyaW5nVG9VVEY4Iiwib2NyUmVzdWx0Iiwic3RyaW5nT25XYXNtSGVhcCIsInRvU3RyaW5nIiwianNvblN0cmluZyIsIl9mcmVlIiwiX19zZXRWaWRlb1Jlc29sdXRpb24iLCJ2aWRlb0VsZW1lbnQiLCJfdGhpczciLCJpc1N1cHBvcnRlZFJlc29sdXRpb24iLCJyZXNvbHV0aW9uVGV4dCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsInNyY09iamVjdCIsIl9fdmlkZW9XaWR0aCIsIl9fdmlkZW9IZWlnaHQiLCJfX2dldFNjYW5uZXJBZGRyZXNzIiwiX19vY3JUeXBlTGlzdCIsImFkZHJlc3MiLCJkZXN0cm95Q2FsbGJhY2siLCJnZXRJRENhcmRTY2FubmVyIiwiZGVzdHJveUlEQ2FyZFNjYW5uZXIiLCJnZXRQYXNzcG9ydFNjYW5uZXIiLCJkZXN0cm95UGFzc3BvcnRTY2FubmVyIiwiZ2V0QWxpZW5TY2FubmVyIiwiZGVzdHJveUFsaWVuU2Nhbm5lciIsImdldENyZWRpdFNjYW5uZXIiLCJkZXN0cm95Q3JlZGl0U2Nhbm5lciIsIl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MiLCJfX3JldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19nZXRCdWZmZXIiLCJfX0J1ZmZlciIsIl9fcmVzb2x1dGlvbldpZHRoIiwiX19yZXNvbHV0aW9uSGVpZ2h0IiwiX19yZXN1bHRCdWZmZXIiLCJfX21hc2tJbmZvUmVzdWx0QnVmIiwiX19nZXRJbWFnZUJhc2U2NCIsIm1hc2tNb2RlIiwiaW1nTW9kZSIsIl9hcmd1bWVudHMzIiwiX3RoaXM4IiwiaW1nVHlwZSIsImVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZSIsImVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZSIsImpwZ1NpemUiLCJnZXRFbmNvZGVkSnBnU2l6ZSIsImpwZ1BvaW50ZXIiLCJnZXRFbmNvZGVkSnBnQnVmZmVyIiwicmVzdWx0VmlldyIsIkhFQVA4IiwiYnVmZmVyIiwiZGVzdHJveUVuY29kZWRKcGciLCJfX2Rlc3Ryb3lCdWZmZXIiLCJfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlciIsIl9fZGVzdHJveVByZXZJbWFnZSIsIl9fUHJldkltYWdlIiwiX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCIsIl9fZGVzdHJveVNjYW5uZXJBZGRyZXNzIiwiX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrIiwiX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUiLCJfdGhpczkiLCJfX2dldFJvdGF0aW9uRGVncmVlIiwiX19nZXRNaXJyb3JNb2RlIiwiX19jcm9wSW1hZ2VGcm9tVmlkZW8iLCJfdGhpczEwIiwiY2FsY1Jlc29sdXRpb25fdyIsImNhbGNSZXNvbHV0aW9uX2giLCJ2aWRlbyIsImNhbnZhcyIsInJvdGF0aW9uQ2FudmFzIiwiY2FsY0NhbnZhcyIsImNhbGNWaWRlb1dpZHRoIiwiY2FsY1ZpZGVvSGVpZ2h0IiwiY2FsY1ZpZGVvQ2xpZW50V2lkdGgiLCJjbGllbnRXaWR0aCIsImNhbGNWaWRlb0NsaWVudEhlaWdodCIsImNsaWVudEhlaWdodCIsImNhbGNDcm9wSW1hZ2VTaXplV2lkdGgiLCJfX2Nyb3BJbWFnZVNpemVXaWR0aCIsImNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0IiwiX19jcm9wSW1hZ2VTaXplSGVpZ2h0IiwiY2FsY1ZpZGVvT3JpZW50YXRpb24iLCJpc0FsaWVuQmFjayIsIl9faXNSb3RhdGVkOTBvcjI3MCIsImNhbGNNYXhTV2lkdGgiLCJjYWxjTWF4U0hlaWdodCIsInN4Iiwic3kiLCJyYXRpbyIsInNXaWR0aCIsIm1pbiIsInNIZWlnaHQiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjYWxjQ29udGV4dCIsImdldENvbnRleHQiLCJ3aWxsUmVhZEZyZXF1ZW50bHkiLCJkcmF3SW1hZ2UiLCJpbWdEYXRhIiwiaW1nRGF0YVVybCIsImdldEltYWdlRGF0YSIsInRvRGF0YVVSTCIsIl9fcm90YXRlIiwiZGVncmVlIiwiaW1nIiwiSW1hZ2UiLCJ0ZW1wQ2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwidGVtcENvbnRleHQiLCJwb3NpdGlvbiIsImhlaWdodCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsIlBJIiwibmV3SW1hZ2VEYXRhIiwicmVzdG9yZSIsIl9faXNDYXJkYm94RGV0ZWN0ZWQiLCJfYXJndW1lbnRzNCIsIl90aGlzMTEiLCJib3hUeXBlIiwicmV0cnlJbWciLCJzZXQiLCJkYXRhIiwia29yIiwiYWxpZW4iLCJwYXNzcG9ydCIsImRldGVjdF9pZGNhcmRfb3B0IiwiZGV0ZWN0X2lkY2FyZCIsIm1lc3NhZ2UiLCJfX3N0YXJ0UmVjb2duaXRpb24iLCJzc2FNb2RlIiwiaXNTZXRJZ25vcmVDb21wbGV0ZSIsIl90aGlzMTIiLCJyZXN1bHRCdWZmZXIiLCJyZWNvZ25pdGlvbiIsIl9yZWY3IiwiX29jclJlc3VsdCIsIl9vY3JSZXN1bHQyIiwic2NhbklEQ2FyZCIsInNjYW5QYXNzcG9ydCIsInNjYW5BbGllbiIsInNjYW5BbGllbkJhY2siLCJzY2FuQ3JlZGl0IiwiX19jc3ZUb09iamVjdCIsImNvbXBsZXRlIiwiX19tYW51YWxPQ1JSZXRyeUNvdW50IiwiX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50IiwicXVldWVJZHgiLCJfX2RldGVjdGVkQ2FyZFF1ZXVlIiwiX19ibHVyQ2FwdHVyZUJ1dHRvbiIsIl9fc2V0U3R5bGUiLCJfeCIsIm9yaWdpbkltYWdlTW9kZSIsIk9DUl9JTUdfTU9ERSIsIm9yaWdpbkltYWdlIiwiT0NSX0lNR19NQVNLX01PREUiLCJtYXNrSW1hZ2UiLCJmYWNlSW1hZ2UiLCJtYXNrSW1hZ2VNb2RlIiwiX19zdGFydFRydXRoIiwicmVqZWN0Iiwic2NhblRydXRoIiwicGFpcnMiLCJvYmoiLCJwYWlyIiwiX19nZXRNYXNrSW5mbyIsIm1hc2tJbmZvUmVzdWx0QnVmIiwiZ2V0TWFza1JlY3QiLCJfX3N0YXJ0VHJ1dGhSZXRyeSIsIl90aGlzMTMiLCJfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfdGhpczE0IiwiX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIiwiX3RoaXMxNSIsImlzUGFzc3BvcnQiLCJfX3NldHVwVmlkZW8iLCJfX3N0cmVhbSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBsYXkiLCJfX2FkanVzdFN0eWxlIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJuYW1lIiwiZXJyb3JNZXNzYWdlIiwiX19vbkZhaWx1cmVQcm9jZXNzIiwic3RvcFN0cmVhbSIsIl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50IiwiZWwiLCJhc3NpZ24iLCJfX2NoYW5nZU9DUlN0YXR1cyIsIl9fb2NyU3RhdHVzIiwiX2FyZ3VtZW50czUiLCJfdGhpczE2IiwiZm9yY2VVcGRhdGUiLCJyZWNvZ25pemVkSW1hZ2UiLCJfX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAiLCJfX2luUHJvZ3Jlc3NTdGVwIiwiZ3VpZGVCb3giLCJtYXNrQm94V3JhcCIsImNhcHR1cmVCdXR0b24iLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJfbWFza0JveFdyYXAkcXVlcnlTZWwiLCJxdWVyeVNlbGVjdG9yIiwiX2NhcHR1cmVCdXR0b24kcXVlcnlTIiwib2NyTW9kZSIsImNhbGwiLCJfX3VwZGF0ZVByZXZpZXdVSSIsIl9faGlkZVByZXZpZXdVSSIsInByZXZpZXdVSVdyYXAiLCJwcmV2aWV3SW1hZ2UiLCJpbWdTdHlsZSIsImNvbnRleHQiLCJfX2dldElucHV0RGV2aWNlcyIsIl90aGlzMTciLCJtZWRpYURldmljZXMiLCJkZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNhbWVyYSIsImRldmljZSIsImtpbmQiLCJJbnB1dERldmljZUluZm8iLCJnZXRDYXBhYmlsaXRpZXMiLCJfY2FwJGZhY2luZ01vZGUiLCJjYXAiLCJmYWNpbmdNb2RlIiwiX19mYWNpbmdNb2RlQ29uc3RyYWludCIsIl9kZXZpY2UkbGFiZWwiLCJpc1VsdHJhQ2FtZXJhUmVnIiwibGFiZWwiLCJwdXNoIiwiZGV2aWNlSWQiLCJSZWZlcmVuY2VFcnJvciIsIl9kZXZpY2UkbGFiZWwyIiwiaXNCYWNrQ2FtZXJhUmVnIiwiY29uY2F0IiwiY2hlY2tVSU9yaWVudGF0aW9uIiwiY3VycmVudCIsIm9jciIsImlzQ2hhbmdlZCIsIl9fcHJldlVpT3JpZW50YXRpb24iLCJfX2NsZWFyQ3VzdG9tVUkiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfdGhpczE4IiwidmlkZW9XcmFwIiwiZ3VpZGVCb3hXcmFwIiwicHJldmVudFRvRnJlZXplVmlkZW8iLCJjdXN0b21VSVdyYXAiLCJjYXB0dXJlVUlXcmFwIiwiY2FwdHVyZVVJIiwicHJldmlld1VJIiwic3dpdGNoVUlXcmFwIiwic3dpdGNoVUkiLCJwcmVsb2FkaW5nVUkiLCJyZW1vdmUiLCJvY3JTdHlsZSIsIndyYXBTdHlsZSIsIm1hcmdpbiIsIm92ZXJmbG93IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJtYXNrX2ZyYW1lIiwidmlkZW9TdHlsZSIsInJvdGF0ZUNzcyIsIm1pcnJvckNzcyIsInJvdGF0ZUFuZE1pcnJvckNzcyIsInRyYW5zZm9ybSIsImNhbnZhc1N0eWxlIiwibGVmdCIsInRvcCIsImJvcmRlciIsInJpZ2h0IiwiYm90dG9tIiwiY3VzdG9tVUlXcmFwU3R5bGUiLCJjYXB0dXJlVUlXcmFwU3R5bGUiLCJjdXJzb3IiLCJjYXB0dXJlQnV0dG9uU3JjU1ZHIiwiX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiIsInByZXZpZXdVSVdyYXBTdHlsZSIsInN3aXRjaFVJV3JhcFN0eWxlIiwic3dpdGNoSFRNTCIsInN3aXRjaENoZWNrYm94IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJfX29uQ2xpY2tTd2l0Y2hVSSIsIl9yZWYxMCIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsIl94MiIsIm9uY2UiLCJwcmVsb2FkaW5nVUlXcmFwU3R5bGUiLCJfX2luaXRTdHlsZSIsIl9fb2NyIiwiX19jYW52YXMiLCJfX3JvdGF0aW9uQ2FudmFzIiwiX192aWRlbyIsIl9fdmlkZW9XcmFwIiwiX19ndWlkZUJveCIsIl9fZ3VpZGVCb3hXcmFwIiwiX19tYXNrQm94V3JhcCIsIl9fcHJldmVudFRvRnJlZXplVmlkZW8iLCJfX2N1c3RvbVVJV3JhcCIsIl9fY2FwdHVyZVVJV3JhcCIsIl9fY2FwdHVyZVVJIiwiX19jYXB0dXJlQnV0dG9uIiwiX19wcmV2aWV3VUlXcmFwIiwiX19wcmV2aWV3VUkiLCJfX3ByZXZpZXdJbWFnZSIsIl9fc3dpdGNoVUlXcmFwIiwiX19zd2l0Y2hVSSIsIl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsIl90aGlzMTkiLCJjb25zdHJhaW50V2lkdGgiLCJjb25zdHJhaW50SGVpZ2h0IiwiaWRlYWwiLCJjb25zdHJhaW50cyIsImF1ZGlvIiwiem9vbSIsImZvY3VzTW9kZSIsIndoaXRlQmFsYW5jZU1vZGUiLCJnZXRVc2VyTWVkaWEiLCJzdHJlYW0iLCJzdHJlYW1TZXR0aW5ncyIsImdldFZpZGVvVHJhY2tzIiwiZ2V0U2V0dGluZ3MiLCJhc3BlY3RSYXRpbyIsIl90aGlzMjAiLCJiYXNlV2lkdGgiLCJiYXNlSGVpZ2h0Iiwic2Nhbm5lckZyYW1lUmF0aW8iLCJndWlkZUJveFdpZHRoIiwiZ3VpZGVCb3hIZWlnaHQiLCJjYWxjT2NyQ2xpZW50V2lkdGgiLCJjYWxjT2NyQ2xpZW50SGVpZ2h0IiwiZ3VpZGVCb3hSYXRpb0J5V2lkdGgiLCJfX2d1aWRlQm94UmF0aW9CeVdpZHRoIiwidmlkZW9SYXRpb0J5SGVpZ2h0IiwiX192aWRlb1JhdGlvQnlIZWlnaHQiLCJyZWR1Y2VkR3VpZGVCb3hXaWR0aCIsIl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbyIsInJlZHVjZWRHdWlkZUJveEhlaWdodCIsInBhZGRpbmciLCJ2aWRlb0lubmVyR2FwIiwiYmFja2dyb3VuZENvbG9yIiwibWFza0JveElubmVyIiwiciIsIm1hc2tCb3hJbm5lcldpZHRoIiwibWFza0JveElubmVySGVpZ2h0IiwiX3RoaXMyMSIsIl9fY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJhIiwiYiIsIm5ld1ZpZGVvV2lkdGgiLCJuZXdWaWRlb0hlaWdodCIsIm5ld1ZpZGVvUmF0aW9CeVdpZHRoIiwibmV3VmlkZW9SYXRpb0J5SGVpZ2h0IiwiY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzIiwiX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzIiwiY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQiLCJjYXB0dXJlVUlQYWRkaW5nQm90dG9tIiwicGFkZGluZ1RvcCIsImJhc2VsaW5lIiwic3VtIiwiaXRlbSIsImNoaWxkTm9kZXMiLCJzdG9wU2NhbiIsIl90aGlzMjIiLCJfX3Jlc291cmNlc0xvYWRlZCIsIl9faXNTdXBwb3J0U2ltZCIsImVudkluZm8iLCJvcyIsIm9zU2ltcGxlIiwidXNlYk9DUkVudkluZm8iLCJzZGtTdXBwb3J0RW52IiwicG9zdGZpeCIsInVybCIsImZldGNoIiwiaHJlZiIsInRoZW4iLCJyZXMiLCJ0ZXh0IiwicmVnZXgiLCJzb3VyY2UiLCJSZWdFeHAiLCJldmFsIiwib25SdW50aW1lSW5pdGlhbGl6ZWQiLCJfcmVmMTEiLCJfeDMiLCJfX3N0YXJ0U2Nhbldhc21JbXBsIiwiX3RoaXMyMyIsIl9fZGV0ZWN0ZWQiLCJfX2FkZHJlc3MiLCJfX3NzYVJldHJ5Q291bnQiLCJzY2FuIiwiX3JlZjEyIiwiaXNEZXRlY3RlZENhcmQiLCJzc2FSZXN1bHQiLCJzc2FSZXN1bHRMaXN0IiwibWFza0luZm8iLCJyZXNvbHV0aW9uX3ciLCJyZXNvbHV0aW9uX2giLCJfX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZSIsInJldHJ5U3RhcnREYXRlIiwiRkFLRSIsIlJFQUwiLCJFTlNFTUJMRSIsImlzQ29tcGxldGVkIiwiX2xvb3AiLCJleGVjdXRlIiwiX3JlZjEzIiwiX3JldCIsInJldHJ5V29ya2luZ1RpbWUiLCJsZWdhY3lGb3JtYXQiLCJuZXdGb3JtYXQiLCJwYXJzZU9jclJlc3VsdCIsIm9jcl90eXBlIiwic3NhX21vZGUiLCJfX2NvbXByZXNzSW1hZ2VzIiwib2NyX2RhdGEiLCJfX29uU3VjY2Vzc1Byb2Nlc3MiLCJfX3JlY292ZXJlZCIsIl90aGlzMjQiLCJyZXNpemVSYXRpbyIsImRlZmF1bHRPcHRpb25zIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJjb252ZXJ0U2l6ZSIsInRhcmdldENvbXByZXNzVm9sdW1lIiwibWFza2luZ0ltYWdlT3B0aW9ucyIsInF1YWxpdHkiLCJfX3JlcXVlc3RHZXRBUElUb2tlbiIsImNyZWRlbnRpYWwiLCJhdXRoU2VydmVySW5mbyIsImJhc2VVcmwiLCJib2R5IiwibWV0aG9kIiwianNvbiIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwidG9rZW4iLCJjYXRjaCIsImVyciIsIl9fcmVxdWVzdFNlcnZlck9DUiIsIl90aGlzMjUiLCJfcmVmMTQiLCJvY3JTZXJ2ZXJCYXNlVXJsIiwiYXBpVG9rZW4iLCJteUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwicGFyYW0iLCJpbWFnZV9iYXNlNjQiLCJtYXNrX21vZGUiLCJmYWNlX21vZGUiLCJyYXciLCJyZXF1ZXN0T3B0aW9ucyIsInJlZGlyZWN0IiwiX3g0IiwiX3g1IiwiX19zdGFydFNjYW5TZXJ2ZXJJbXBsIiwiX3RoaXMyNiIsIl9yZWYxNSIsIl90aGlzMjYkX19jYXB0dXJlQnV0dCIsIl9yZWYxNiIsImJhc2U2NEltYWdlUmVzdWx0IiwiX19kZWJ1Z01vZGUiLCJvY3JfYXBpX3Jlc3BvbnNlIiwiX29jclJlc3VsdDMiLCJyZXN1bHRDb2RlIiwicmVzdWx0TWVzc2FnZSIsInNjYW5uZXJfdHlwZSIsInJlc3VsdF9jb2RlIiwicmVzdWx0RGV0YWlsIiwiX3g2IiwiX3g3IiwiaW1nRGF0YVVSTCIsImxpbWl0U2F2ZUltYWdlQ291bnQiLCJzaGlmdCIsIl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQiLCJfdGhpczI3IiwiYXBpX3Jlc3BvbnNlIiwicmVzdWx0X21lc3NhZ2UiLCJfdGhpczI4IiwiZXJyb3JEZXRhaWwiLCJzdGFjayIsImVycm9yX2RldGFpbCIsIl90aGlzMjkiLCJwcmVsb2FkaW5nU3RhdHVzIiwiX3RoaXMzMCIsIl90aGlzMzEiLCJfX3JlY292ZXJ5U2NhbiIsIl90aGlzMzIiLCJjYW52YXNDb250ZXh0IiwiY2xlYXJSZWN0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkIiwic3RvcCIsInRyYWNrcyIsImdldFRyYWNrcyIsImZvckVhY2giLCJ0cmFjayIsInJlc3RvcmVJbml0aWFsaXplIiwiY2xlYXJUaW1lb3V0Il0sInNvdXJjZXMiOlsib2NyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiBnbG9iYWwtbW9kdWxlICovXG5pbXBvcnQgZGV0ZWN0b3IgZnJvbSAnLi9oZWxwZXJzL2RldGVjdG9yLmpzJztcbmltcG9ydCB1c2ViT0NSV0FTTVBhcnNlciBmcm9tICcuL2hlbHBlcnMvdXNlYi1vY3Itd2FzbS1wYXJzZXIuanMnO1xuaW1wb3J0IHVzZWJPQ1JBUElQYXJzZXIgZnJvbSAnLi9oZWxwZXJzL3VzZWItb2NyLWFwaS1wYXJzZXIuanMnO1xuaW1wb3J0IHsgaXNTdXBwb3J0V2FzbSwgbWVhc3VyZSwgc2ltZCwgdGhyZWFkcyB9IGZyb20gJy4vaGVscGVycy93YXNtLWZlYXR1cmUtZGV0ZWN0LmpzJztcbmltcG9ydCBJbWFnZVV0aWwgZnJvbSAnLi9oZWxwZXJzL2ltYWdlLXV0aWwuanMnO1xubGV0IGluc3RhbmNlO1xuY2xhc3MgVXNlQk9DUiB7XG4gIElOX1BST0dSRVNTID0ge1xuICAgIE5PTkU6ICdub25lJyxcbiAgICBOT1RfUkVBRFk6ICdub3RfcmVhZHknLFxuICAgIFJFQURZOiAncmVhZHknLFxuICAgIENBUkRfREVURUNUX1NVQ0NFU1M6ICdkZXRlY3Rfc3VjY2VzcycsXG4gICAgQ0FSRF9ERVRFQ1RfRkFJTEVEOiAnZGV0ZWN0X2ZhaWxlZCcsXG4gICAgTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUzogJ21hbnVhbF9jYXB0dXJlX3N1Y2Nlc3MnLFxuICAgIE1BTlVBTF9DQVBUVVJFX0ZBSUxFRDogJ21hbnVhbF9jYXB0dXJlX2ZhaWxlZCcsXG4gICAgT0NSX1JFQ09HTklaRUQ6ICdyZWNvZ25pemVkJyxcbiAgICBPQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTogJ3JlY29nbml6ZWRfd2l0aF9zc2EnLFxuICAgIE9DUl9TVUNDRVNTOiAnb2NyX3N1Y2Nlc3MnLFxuICAgIE9DUl9TVUNDRVNTX1dJVEhfU1NBOiAnb2NyX3N1Y2Nlc3Nfd2l0aF9zc2EnLFxuICAgIE9DUl9GQUlMRUQ6ICdvY3JfZmFpbGVkJ1xuICB9O1xuICBPQ1JfU1RBVFVTID0ge1xuICAgIE5PVF9SRUFEWTogLTEsXG4gICAgUkVBRFk6IDAsXG4gICAgT0NSX1NVQ0NFU1M6IDEsXG4gICAgRE9ORTogMlxuICB9O1xuICBQUkVMT0FESU5HX1NUQVRVUyA9IHtcbiAgICBOT1RfU1RBUlRFRDogLTEsXG4gICAgU1RBUlRFRDogMCxcbiAgICBET05FOiAxXG4gIH07XG4gIE9DUl9JTUdfTU9ERSA9IHtcbiAgICBXQVJQSU5HOiAwLFxuICAgIENST1BQSU5HOiAxLFxuICAgIE5PTkU6IDJcbiAgfTtcbiAgT0NSX0lNR19NQVNLX01PREUgPSB7XG4gICAgRkFMU0U6IDAsXG4gICAgVFJVRTogMVxuICB9O1xuXG4gIC8qKiBwdWJsaWMgcHJvcGVydGllcyAqL1xuXG4gIC8qKiBwcml2YXRlIHByb3BlcnRpZXMgKi9cbiAgX19kZWJ1Z01vZGUgPSBmYWxzZTtcbiAgX19PQ1JFbmdpbmUgPSBudWxsO1xuICBfX2lzU3VwcG9ydFdhc20gPSBmYWxzZTtcbiAgX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gIF9faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgX19wcmVsb2FkZWQgPSBmYWxzZTtcbiAgX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgX19saWNlbnNlO1xuICBfX29jclR5cGU7XG4gIF9fc3NhTW9kZSA9IGZhbHNlO1xuICBfX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gIF9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCA9IDEwO1xuICBfX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICBfX3NzYVJldHJ5Q291bnQgPSAwO1xuICBfX2RldGVjdGVkQ2FyZFF1ZXVlID0gW107XG4gIF9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQgPSBbXTtcbiAgX19vblN1Y2Nlc3MgPSBudWxsO1xuICBfX29uRmFpbHVyZSA9IG51bGw7XG4gIF9fb25JblByb2dyZXNzQ2hhbmdlID0gbnVsbDtcbiAgX19vY3JUeXBlTGlzdCA9IFsnaWRjYXJkJywgJ2RyaXZlcicsICdwYXNzcG9ydCcsICdmb3JlaWduLXBhc3Nwb3J0JywgJ2FsaWVuJywgJ2FsaWVuLWJhY2snLCAnY3JlZGl0JywgJ2lkY2FyZC1zc2EnLCAnZHJpdmVyLXNzYScsICdwYXNzcG9ydC1zc2EnLCAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnLCAnYWxpZW4tc3NhJ107XG4gIF9fb2NyVHlwZU51bWJlclRvU3RyaW5nID0gbmV3IE1hcChbWycxJywgJ2lkY2FyZCddLCBbJzInLCAnZHJpdmVyJ10sIFsnMycsICdwYXNzcG9ydCddLCBbJzQnLCAnZm9yZWlnbi1wYXNzcG9ydCddLCBbJzUnLCAnYWxpZW4nXSwgWyc1LTEnLCAnYWxpZW4nXSwgWyc1LTInLCAnYWxpZW4nXSwgWyc1LTMnLCAnYWxpZW4nXV0pO1xuICBfX29jclN0cmluZ1RvVHlwZU51bWJlciA9IG5ldyBNYXAoW1snaWRjYXJkJywgJzEnXSwgWydkcml2ZXInLCAnMiddLCBbJ3Bhc3Nwb3J0JywgJzMnXSwgWydmb3JlaWduLXBhc3Nwb3J0JywgJzQnXSwgWydhbGllbicsICc1J10sIFsnYWxpZW4nLCAnNS0xJ10sIFsnYWxpZW4nLCAnNS0yJ10sIFsnYWxpZW4nLCAnNS0zJ11dKTtcbiAgX19vY3JSZXN1bHRLZXlTZXQgPSBuZXcgU2V0KFsnYWxsJywgJ3Jlc3VsdF9zY2FuX3R5cGUnLCAnbmFtZScsICdqdW1pbicsICdpc3N1ZWRfZGF0ZScsICdyZWdpb24nLCAnY29sb3JfcG9pbnQnLCAnZm91bmRfZmFjZScsICdmb3VuZF9leWUnLCAnc3RhcnRfdGltZScsICdlbmRfdGltZScsICdiaXJ0aCcsICdvdmVyc2Vhc19yZXNpZGVudCcsICdkcml2ZXJfbnVtYmVyJywgJ2RyaXZlcl9zZXJpYWwnLCAnZHJpdmVyX3R5cGUnLCAnYXB0aXR1ZGVfdGVzdF9kYXRlX3N0YXJ0JywgJ2FwdGl0dWRlX3Rlc3RfZGF0ZV9lbmQnLCAnc3VyX25hbWUnLCAnZ2l2ZW5fbmFtZScsICdwYXNzcG9ydF90eXBlJywgJ2lzc3VpbmdfY291bnRyeScsICdwYXNzcG9ydF9udW1iZXInLCAnbmF0aW9uYWxpdHknLCAnc2V4JywgJ2V4cGlyeV9kYXRlJywgJ3BlcnNvbmFsX251bWJlcicsICduYW1lX2tvcicsICdtcnoxJywgJ21yejInLCAndmlzYV90eXBlJywgJ2lkX3RydXRoJywgJ2ZkX2NvbmZpZGVuY2UnLCAnaWRfdHJ1dGhfcmV0cnlfY291bnQnLCAnc3BlY3VsYXJfcmF0aW8nXSk7XG4gIF9fb2NySW1hZ2VLZXlTZXQgPSBuZXcgU2V0KFsnYWxsJywgJ29jcl9vcmlnaW5faW1hZ2UnLCAnb2NyX21hc2tpbmdfaW1hZ2UnLCAnb2NyX2ZhY2VfaW1hZ2UnXSk7XG4gIF9fcGFnZUVuZCA9IGZhbHNlO1xuICBfX29jcjtcbiAgX19jYW52YXM7XG4gIF9fcm90YXRpb25DYW52YXM7XG4gIF9fdmlkZW87XG4gIF9fdmlkZW9XcmFwO1xuICBfX2d1aWRlQm94O1xuICBfX2d1aWRlQm94V3JhcDtcbiAgX19tYXNrQm94V3JhcDtcbiAgX19wcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgX19jdXN0b21VSVdyYXA7XG4gIF9fdG9wVUk7XG4gIF9fbWlkZGxlVUk7XG4gIF9fYm90dG9tVUk7XG4gIF9fcHJldmlld1VJV3JhcDtcbiAgX19wcmV2aWV3VUk7XG4gIF9fcHJldmlld0ltYWdlO1xuICBfX2NhcHR1cmVVSVdyYXA7XG4gIF9fY2FwdHVyZVVJO1xuICBfX3N3aXRjaFVJV3JhcDtcbiAgX19zd2l0Y2hVSTtcbiAgX19jYXB0dXJlQnV0dG9uO1xuICBfX2FkZHJlc3MgPSAwO1xuICBfX2RldGVjdGVkID0gZmFsc2U7XG4gIF9fcmVjb3ZlcmVkID0gZmFsc2U7XG4gIF9fQnVmZmVyID0gbnVsbDtcbiAgX19yZXN1bHRCdWZmZXIgPSBudWxsO1xuICBfX21hc2tJbmZvUmVzdWx0QnVmID0gbnVsbDtcbiAgX19QcmV2SW1hZ2UgPSBudWxsO1xuICBfX3N0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICBfX2NhbVNldENvbXBsZXRlID0gZmFsc2U7XG4gIF9fcmVzb2x1dGlvbldpZHRoID0gMDtcbiAgX19yZXNvbHV0aW9uSGVpZ2h0ID0gMDtcbiAgX192aWRlb1dpZHRoID0gMDtcbiAgX192aWRlb0hlaWdodCA9IDA7XG4gIF9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIF9faW50ZXJ2YWxUaW1lcjtcbiAgX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyO1xuICBfX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCA9IDA7XG4gIF9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQ7XG4gIF9fc3RyZWFtO1xuICBfX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICBfX2ZhY2luZ01vZGVDb25zdHJhaW50ID0gJ2Vudmlyb25tZW50JztcbiAgX191aU9yaWVudGF0aW9uID0gJyc7XG4gIF9fcHJldlVpT3JpZW50YXRpb24gPSAnJztcbiAgX192aWRlb09yaWVudGF0aW9uID0gJyc7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gbnVsbDtcbiAgX190aHJvdHRsaW5nUmVzaXplRGVsYXkgPSA1MDA7XG4gIF9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPSAzMDA7IC8vIOyehOyLnFxuICBfX3JldHJ5Q291bnRHZXRBZGRyZXNzID0gMDsgLy8g7J6E7IucXG4gIF9fZGV2aWNlSW5mbztcbiAgX19pc1JvdGF0ZWQ5MG9yMjcwID0gZmFsc2U7XG4gIF9faW5Qcm9ncmVzc1N0ZXAgPSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTtcbiAgX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT05FO1xuICBfX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICBfX2d1aWRlQm94UmF0aW9CeVdpZHRoID0gMS4wOyAvLyDsiJjsoJXrtojqsIBcbiAgX192aWRlb1JhdGlvQnlIZWlnaHQgPSAwLjk7IC8vIOyImOygleu2iOqwgFxuICBfX2d1aWRlQm94UmVkdWNlUmF0aW8gPSAwLjg7IC8vIOyImOygleu2iOqwgFxuICBfX2Nyb3BJbWFnZVNpemVXaWR0aCA9IDA7XG4gIF9fY3JvcEltYWdlU2l6ZUhlaWdodCA9IDA7XG4gIF9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBmYWxzZTtcblxuICAvKiogRGVmYXVsdCBvcHRpb25zICovXG4gIF9fb3B0aW9ucyA9IG5ldyBPYmplY3Qoe1xuICAgIC8vIOuUlOuyhOq5hSDsmLXshZhcbiAgICBzaG93Q2xpcEZyYW1lOiBmYWxzZSxcbiAgICAvLyBjaWxwLWZyYW1lIOuztOq4sFxuICAgIHNob3dDYW52YXNQcmV2aWV3OiBmYWxzZSxcbiAgICAvLyBjYW52YXMgcHJldmlldyDrs7TquLBcblxuICAgIC8vIOy2nOugpSDsmLXshZhcbiAgICAvLyDslZTtmLjtmZRcbiAgICB1c2VFbmNyeXB0TW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo6rCc7J246rOg7Jyg7Iud67OE67aA7Zi4IOq0gOugqCDtla3rqqkg7JWU7Zi47ZmUKVxuICAgIHVzZUVuY3J5cHRBbGxNb2RlOiBmYWxzZSxcbiAgICAvLyDslZTtmLjtmZQg7KCB7JqpICjsoITssrQg7JWU7Zi47ZmULCBlbmNyeXB0IG9iamVjdCDrs4Trj4Qg7KCc6rO1KVxuICAgIHVzZUVuY3J5cHRPdmVyYWxsTW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAob2NyIOydtOuvuOyngCwg66eI7Iqk7YK5IOydtOuvuOyngCwg7Ja86rW07J2066+47KeAIO2PrO2VqClcbiAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgIC8vIHVzZVBpaUVuY3J5cHRNb2RlOiBmYWxzZSwgLy8g7JWU7Zi47ZmUIOyggeyaqSAocGlpKVxuICAgIC8vIHVzZVBpaUVuY3J5cHRGYWNlOiBmYWxzZSwgLy8g7Iug67aE7KadIOyWvOq1tOyCrOynhCDslZTtmLjtmZQg7KCB7JqpIChwaWkpXG4gICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgdXNlTGVnYWN5Rm9ybWF0OiBmYWxzZSxcbiAgICAvLyBMZWdhY3kgZm9ybWF0IOyngOybkFxuICAgIHVzZU1hc2tJbmZvOiB0cnVlLFxuICAgIC8vIOuniOyKpO2CuSDsooztkZwg7KeA7JuQXG4gICAgdXNlRmFjZUltYWdlOiB0cnVlLFxuICAgIC8vIOyLoOu2hOymnSDrgrQg7Ja86rW0IOyCrOynhFxuICAgIHVzZUltYWdlQ3JvcHBpbmc6IGZhbHNlLFxuICAgIC8vIOyLoOu2hOymnSDsnbTrr7jsp4DrpbwgQ3JvcHBpbmco7YGs66GtIOuztOyglSDtlaDsp4Ag7Jes67aAKVxuICAgIHVzZUltYWdlV2FycGluZzogZmFsc2UsXG4gICAgLy8g7Iug67aE7KadIOydtOuvuOyngOulvCBXYXJwaW5nKOyZnOqzoSDrs7TsoJUg7ZWg7KeAIOyXrOu2gClcbiAgICB1c2VDb21wcmVzc0ltYWdlOiBmYWxzZSxcbiAgICAvLyDsi6DrtoTspp0g7J2066+47KeA66W8IOyVley2le2VoOyngCDsl6zrtoBcbiAgICB1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGg6IDEwODAsXG4gICAgLy8g7J2066+47KeAIOumrOyCrOydtOynlSDqsIDroZwg7ZW07IOB64+EXG4gICAgdXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZTogMTAyNCAqIDUwLFxuICAgIC8vIOydtOuvuOyngCDslZXstpUg66qp7ZGcIOyaqeufiVxuICAgIG9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0OiBbXSxcbiAgICAvLyBPQ1Ig7Y+J66y46rKw6rO87JeQ7IScIOygnOyZuO2VoCDtgqQg66qp66GdXG4gICAgZW5jcnlwdE9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0OiBbXSxcbiAgICAvLyBPQ1Ig7JWU7Zi47ZmU6rCS7JeQ7IScIOygnOyZuO2VoCDtgqQg66qp66GdXG4gICAgb2NySW1hZ2VFeGNsdWRlS2V5bGlzdDogW10sXG4gICAgLy8gT0NSIO2PieusuOqysOqzvOyXkOyEnCDsoJzsmbjtlaAg7J2066+47KeAIGV4KSBbJ29jcl9vcmlnaW5faW1hZ2UnLCAnb2NyX21hc2tpbmdfaW1hZ2UnLCAnb2NyX2ZhY2VfaW1hZ2UnXVxuICAgIGVuY3J5cHRPY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0OiBbXSxcbiAgICAvLyBPQ1Ig7JWU7Zi47ZmU6rCS7JeQ7IScIOygnOyZuO2VoCDsnbTrr7jsp4AgZXgpIFsnb2NyX29yaWdpbl9pbWFnZScsICdvY3JfbWFza2luZ19pbWFnZScsICdvY3JfZmFjZV9pbWFnZSddXG5cbiAgICAvLyBVSSDshKTsoJVcbiAgICB1c2VUb3BVSTogdHJ1ZSxcbiAgICAvLyDsg4Hri6ggVUlcbiAgICB1c2VUb3BVSVRleHRNc2c6IGZhbHNlLFxuICAgIC8v7IOB64uoIFVJID4gVEVYVFxuICAgIHVzZU1pZGRsZVVJOiB0cnVlLFxuICAgIC8v7KSR64uoIFVJXG4gICAgdXNlTWlkZGxlVUlUZXh0TXNnOiB0cnVlLFxuICAgIC8vIOykkeuLqCBVSSA+IFRFWFRcbiAgICB1c2VCb3R0b21VSTogdHJ1ZSxcbiAgICAvLyDtlZjri6ggVUlcbiAgICB1c2VCb3R0b21VSVRleHRNc2c6IGZhbHNlLFxuICAgIC8vIO2VmOuLqCBVSSA+IFRFWFRcbiAgICB1c2VQcmV2aWV3VUk6IHRydWUsXG4gICAgLy8gUHJldmlldyBVSVxuICAgIHVzZUNhcHR1cmVVSTogdHJ1ZSxcbiAgICAvLyDsuqHsspjrsoTtirwgVUlcbiAgICBwcmVsb2FkaW5nVUlUZXh0TXNnOiAn7Iug67aE7Kad7J247KadIOuqqOuTiOydhCDrtojrn6zsmKTripQg7KSRIOyeheuLiOuLpDxiciAvPuyeoOyLnOunjCDquLDri6TroKTso7zshLjsmpQnLFxuICAgIC8vIOyduOyLnSDtlITroIjsnoQg7Ji17IWYXG4gICAgZnJhbWVCb3JkZXJTdHlsZToge1xuICAgICAgd2lkdGg6IDUsXG4gICAgICAvLyBib3JkZXItd2lkdGhcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICAvLyBib3JkZXItcmFkaXVzXG4gICAgICBzdHlsZTogJ3NvbGlkJyxcbiAgICAgIC8vIGJvcmRlci1zdHlsZVxuXG4gICAgICAvLyDri6jqs4Trs4Qg7J247IudIO2UhOugiOyehCBib3JkZXIg7IOJ7IOBXG4gICAgICBub3RfcmVhZHk6ICcjMDAwMDAwJyxcbiAgICAgIC8vIOyKpOy6lOykgOu5hCA6IOqygOyglVxuICAgICAgcmVhZHk6ICcjYjhiOGI4JyxcbiAgICAgIC8vIOyKpOy6lOuMgOq4sCA6IO2ajOyDiVxuICAgICAgZGV0ZWN0X3N1Y2Nlc3M6ICcjNWU4ZmZmJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDshLHqs7UgOiDtlZjriphcbiAgICAgIGRldGVjdF9mYWlsZWQ6ICcjNzI1YjY3JyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDsi6TtjKggOiDrs7TrnbxcbiAgICAgIG1hbnVhbF9jYXB0dXJlX3N1Y2Nlc3M6ICcjNWU4ZmZmJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDshLHqs7UgOiDtlZjriphcbiAgICAgIG1hbnVhbF9jYXB0dXJlX2ZhaWxlZDogJyM3MjViNjcnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyLpO2MqCA6IOuztOudvFxuICAgICAgcmVjb2duaXplZDogJyMwMDNhYzInLFxuICAgICAgLy8gT0NS7JmE66OMIDog7YyM656RXG4gICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiAnIzAwM2FjMicsXG4gICAgICAvLyDsgqzrs7jtjJDrs4TspJEo7IKs67O47YyQ67OEIE9OKSA6IO2MjOuekVxuICAgICAgb2NyX3N1Y2Nlc3M6ICcjMTRiMDBlJyxcbiAgICAgIC8vIE9DUuyZhOujjCA6IOy0iOuhnVxuICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6ICcjMTRiMDBlJyxcbiAgICAgIC8vIE9DUuyZhOujjCjsgqzrs7jtjJDrs4QgT04pIDog7LSI66GdXG4gICAgICBvY3JfZmFpbGVkOiAnI0ZBMTEzRCcgLy8gT0NS7Iuk7YyoIDog67mo6rCVXG4gICAgfSxcblxuICAgIC8vIOuniOyKpO2BrCDtlITroIjsnoQgZmlsbCDsu6zrn6wg67OA6rK9IOyCrOyaqSDsl6zrtoBcbiAgICB1c2VNYXNrRnJhbWVDb2xvckNoYW5nZTogdHJ1ZSxcbiAgICAvLyDrp4jsiqTtgawg7ZSE66CI7J6EIOyYteyFmCAo7Lm066mU6528IOu5hOuUlOyYpCDsmIHsl63sl5DshJwg7J247IudIO2UhOugiOyehOunjCDrs7TsnbTqsowg7ZWY6rOgIOuCmOuouOyngOulvCDrja7slrTsk7DripQg7ZSE66CI7J6EIOyYgeyXrSlcbiAgICBtYXNrRnJhbWVTdHlsZToge1xuICAgICAgY2xpcF9mcmFtZTogJyNmZjAwYmYnLFxuICAgICAgLy8gY2xpcC1mcmFtZSDsg4nsg4EgOiDrlKXtjbztlIwgKOyImOygleu2iOqwgClcbiAgICAgIGJhc2VfY29sb3I6ICcjMzMzMzMzJyxcbiAgICAgIC8vIG1hc2stZnJhbWUg7IOJ7IOBIDog64uk7YGs6re466CI7J20ICjtiKzrqoXrj4TripQg7IiY7KCV67aI6rCAIGZm66GcIOqzoOyglSlcblxuICAgICAgLy8g64uo6rOE67OEIOuniOyKpO2BrCDtlITroIjsnoQgZmlsbCDsg4nsg4FcbiAgICAgIG5vdF9yZWFkeTogJyMzMzMzMzMnLFxuICAgICAgLy8g7Iqk7LqU7KSA67mEXG4gICAgICByZWFkeTogJyMzMzMzMzMnLFxuICAgICAgLy8g7Iqk7LqU64yA6riwXG4gICAgICBkZXRlY3Rfc3VjY2VzczogJyMyMjIyMjInLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyEseqztVxuICAgICAgZGV0ZWN0X2ZhaWxlZDogJyMzMzMzMzMnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyLpO2MqFxuICAgICAgbWFudWFsX2NhcHR1cmVfc3VjY2VzczogJyMyMjIyMjInLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyEseqztVxuICAgICAgbWFudWFsX2NhcHR1cmVfZmFpbGVkOiAnIzMzMzMzMycsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7Iuk7YyoXG4gICAgICByZWNvZ25pemVkOiAnIzIyMjIyMicsXG4gICAgICAvLyBPQ1LsmYTro4xcbiAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOyCrOuzuO2MkOuzhOykkSjsgqzrs7jtjJDrs4QgT04pXG4gICAgICBvY3Jfc3VjY2VzczogJyMxMTExMTEnLFxuICAgICAgLy9PQ1LsmYTro4xcbiAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiAnIzExMTExMScsXG4gICAgICAvLyBPQ1LsmYTro4wo7IKs67O47YyQ67OEIE9OKVxuICAgICAgb2NyX2ZhaWxlZDogJyMxMTExMTEnIC8vIE9DUuyLpO2MqFxuICAgIH0sXG5cbiAgICAvLyDstKzsmIHsmLXshZhcbiAgICB1c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlOiBmYWxzZSxcbiAgICAvLyDsoIDsgqzslpEg64uo66eQ7JeQ7IScIOyEnOuyhE9DUuuhnCDsnpDrj5kg7KCE7ZmYIOq4sOuKpVxuICAgIHVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZTogZmFsc2UsXG4gICAgLy8g7IiY64+Z7Jy866GcIOyEnOuyhE9DUiDsoITtmZgg6riw64qlICjsiJjrj5nsnbQgdHJ1ZeydtOuptCDsnpDrj5nsnYAg66y07Iuc65CoKVxuICAgIHN3aXRjaFRvU2VydmVyVGhyZXNob2xkOiAyMC4wLFxuICAgIC8vIOyekOuPmeyghO2ZmCDquLDspIDqsJIgKOyEseuKpSDsuKHsoJXsuZggbXMpXG4gICAgdXNlRm9yY2VDb21wbGV0ZVVJOiBmYWxzZSxcbiAgICAvLyBXQVNNIOuqqOuTnOydvOuVjCDrsoTtirwg64iE66W87IucIO2VtOuLuSDsi5zsoJDsl5Ag6rCV7KCc66GcIOyZhOujjCDsgqzsmqnsl6zrtoBcblxuICAgIC8vIOyImOuPmey0rOyYgSDrsoTtirwg7Ji17IWYXG4gICAgY2FwdHVyZUJ1dHRvblN0eWxlOiB7XG4gICAgICBzdHJva2VfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIC8vIOuyhO2KvCDthYzrkZDrpqwoc3Ryb2tlKSDsg4nsg4FcbiAgICAgIGJhc2VfY29sb3I6ICcjNWU4ZmZmJyAvLyDrsoTtirwg7IOJ7IOBXG4gICAgfSxcblxuICAgIHJlc291cmNlQmFzZVVybDogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAvLyB3YXNtLCBkYXRhIO2MjOydvCDrpqzshozsiqQgYmFzZSDqsr3roZwgKENETiDsgqzsmqnsi5wg67OA6rK9KVxuICAgIGRldmljZUxhYmVsOiAnJyxcbiAgICB2aWRlb1RhcmdldElkOiAnJyxcbiAgICAvLyDsubTrqZTrnbwg7ISk7KCVXG4gICAgcm90YXRpb25EZWdyZWU6IDAsXG4gICAgLy8gcm90YXRpb24tZGVncmVlIOy5tOuplOudvOqwgCDtmozsoITrkJwg6rCB64+EICg5MCwgMTkwLCAyNzApXG4gICAgbWlycm9yTW9kZTogZmFsc2UsXG4gICAgLy8gbWlycm9yLW1vZGUg7IWA7ZS8IOy5tOuplOudvCjtgqTsmKTsiqTtgawg65OxKSDsgqzsmqnsi5wg7KKM7JqwIOuwmOyghFxuICAgIGNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWw6IDEwMDAsXG4gICAgLy8g7Lm066mU6528IOumrOyGjOyKpCDsnqzsmpTssq0g6rCE6rKpKG1zKVxuICAgIGNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQ6IC0xLFxuICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIOy1nOuMgCDtmp/siJgsIC0x7J2066m0IOustO2VnCDsnqzsmpTssq0uXG5cbiAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSAgOiAnY29tcGF0aWJpbGl0eScgKO2YuO2ZmOyEsSDsmrDshKApIHx8ICdoaWdoUXVhbGl0eScgKOqzoO2ZlOyniCDsmrDshKApXG4gICAgLy8gY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhOiAnY29tcGF0aWJpbGl0eScsIC8vIO2YuO2ZmOyEsSDsmrDshKAo6raM7J6lLCDrlJTtj7TtirgpIDogNzIw7Jy866GcIOqzoOyglSwg7KCA7IKs7JaRIOuLqOunkOq4sCDtmLjtmZjshLEg7KKL7J2MXG4gICAgY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhOiAnaGlnaFF1YWxpdHknLFxuICAgIC8vIOqzoO2ZlOyniCDsmrDshKAgOiAxMDgw7J20IOqwgOuKpe2VmOuptCAxMDgwIOu2iOqwgOuKpe2VmOuptCA3MjBcblxuICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg7ISk7KCVIDogJ2NhbWVyYVJlc29sdXRpb24nICjsubTrqZTrnbwg7ZW07IOB64+EKSB8fCAnb2NyVmlld1NpemUnIChvY3IgZGl2IO2BrOq4sClcbiAgICBjYWxjR3VpZGVCb3hDcml0ZXJpYTogJ2NhbWVyYVJlc29sdXRpb24nLFxuICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg6riw7KSAKOq2jOyepSwg65SU7Y+07Yq4KSA6IDcyMHgxMjgwIO2VtOyDgeuPhCjshLjroZzrqqjrk5wpIOydvOuVjCBvY3IgdmlldyB3aWR0aCBzaXpl6rCAIDcyMOuztOuLpCDtgbAg6rK97JqwLCDqsIDsnbTrk5wg67CV7Iqk66W8IDcyMOyXkCDrp57stqQgKHByZXZpZXcg7ZmU66m0IOq5qOynkCDsl4bsnYwpXG4gICAgLy8gY2FsY0d1aWRlQm94Q3JpdGVyaWE6ICdvY3JWaWV3U2l6ZScsIC8vIO2ZlOuptCDsgqzsnbTspogg6riw7KSAIDogNzIweDEyODAg7ZW07IOB64+EKOyEuOuhnOuqqOuTnCkg7J2865WMIG9jciB2aWV3IHdpZHRoIHNpemXqsIAgNzIw67O064ukIO2BsOqyveyasCwg6rCA7J2065OcIOuwleyKpOulvCBvY3IgdmlldyB3aWR0aCDsgqzsl5Dspojsl5Ag66ee7LakIChwcmV2aWV3IO2ZlOuptCDqsJXsoJzroZwg64qY66as6riwIOuVjOusuOyXkCDri6Tshowg6rmo7KeQKVxuXG4gICAgLy8g7IKs67O47YyQ67OEIFJFVFJZIOyEpOyglVxuICAgIC8vIHNzYVJldHJ5VHlwZVxuICAgIC8vICAgLSBSRUFMICAgICA6IOuzuOyduChSRUFMKSDqsbDrtoDsnKggLT4gRmFsc2UgTmVnYXRpdmUo7Iuk7KCc6rCS7J2AIFJFQUzsnbjrjbAg7JiI7Lih6rCS7J2AIEZBS0XrnbzshJwg7YuA66aw6rK97JqwKeulvCDrgq7stpTquLAg7JyE7ZW0LFxuICAgIC8vICAgLSBGQUtFICAgICA6IO2DgOyduChGQUtFKSDsiJjrnb3snKggLT4gRmFsc2UgUG9zaXRpdmUo7Iuk7KCc6rCS7J2AIEZBS0XsnbjrjbAg7JiI7Lih6rCS7J2AIFJFQUzsnbTrnbzshJwg7YuA66aw6rK97JqwKeulvCDrgq7stpTquLAg7JyE7ZW0XG4gICAgLy8gICAtIEVOU0VNQkxFIDog7Y+J6regIOygiOuMgOqwkiAtPiBzc2FNYXhSZXRyeUNvdW50IOunjO2BvCDrsJjrs7Ug7IiY7ZaJ7ZWY6rOgIGZkX2NvbmZpZGVuY2Ug7KCI64yA6rCSIOqwkuydmCDtj4nqt6DsnLzroZwg7YyQ7KCVXG4gICAgLy8gc3NhTWF4UmV0cnlDb3VudCDshKTsoJUg6rCS66eM7YG8IOyerOyLnOuPhO2VmOyXrCDtlZzrsojsnbTrnbzrj4Qg6riw7KSA6rCSKFJFQUwg65iQ64qUIEZBS0Up7J20IOucqOuptCDquLDspIDqsJIoUkVBTCDrmJDripQgRkFLRSnroZwg7YyQ7KCVXG4gICAgc3NhUmV0cnlUeXBlOiAnRU5TRU1CTEUnLFxuICAgIHNzYVJldHJ5UGl2b3Q6IDAuNSxcbiAgICAvLyBSRUFML0ZBS0Xrpbwg7YyQ7KCV7ZWY64qUIGZkX2NvbmZpZGVuY2Ug6riw7KSA6rCSICh3YXNtIOuwsO2PrCDrsoTsoITsl5Ag65Sw6528IOuLpOumhCkg4oC7IOyImOygleu2iOqwgFxuICAgIHNzYU1heFJldHJ5Q291bnQ6IDAsXG4gICAgLy8g7LWc64yAIFJFVFJZIO2ajOyImOyEpOyglSAw7J2066m0IOuvuOyCrOyaqVxuXG4gICAgLy8gdGhpcy5fX2RlYnVnKCnrpbwg7Ya17ZW0IOywjeydgCDrqZTsi5zsp4DrpbwgYWxlcnTsnLzroZwg652E7Jq47KeAIOyXrOu2gFxuICAgIHVzZURlYnVnQWxlcnQ6IGZhbHNlLFxuICAgIC8vIFdBU00g66as7IaM7IqkIOqwseyLoCDsl6zrtoBcbiAgICBmb3JjZV93YXNtX3JlbG9hZDogZmFsc2UsXG4gICAgZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZzogJydcbiAgfSk7XG5cbiAgLyoqIGNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChpbnN0YW5jZSkgcmV0dXJuIGluc3RhbmNlO1xuICAgIGluc3RhbmNlID0gdGhpcztcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICAvKiogcHVibGljIG1ldGhvZHMgKi9cbiAgYXN5bmMgcHJlbG9hZGluZyhvblByZWxvYWRlZCkge1xuICAgIGlmICh0aGlzLmlzUHJlbG9hZGVkKCkpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmIChvblByZWxvYWRlZCkgb25QcmVsb2FkZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhpcy5zaG93T0NSTG9hZGluZ1VJKCk7XG4gICAgICB0aGlzLl9fcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuU1RBUlRFRDtcbiAgICAgIGF3YWl0IHRoaXMuX19sb2FkUmVzb3VyY2VzKCk7XG4gICAgICB0aGlzLl9fcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuRE9ORTtcbiAgICAgIHRoaXMuX19wcmVsb2FkZWQgPSB0cnVlO1xuICAgICAgaWYgKG9uUHJlbG9hZGVkKSBvblByZWxvYWRlZCgpO1xuICAgICAgdGhpcy5oaWRlT0NSTG9hZGluZ1VJKCk7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIGlzSW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19pbml0aWFsaXplZDtcbiAgfVxuICBpc1ByZWxvYWRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3ByZWxvYWRlZDtcbiAgfVxuICBnZXRQcmVsb2FkaW5nU3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLl9fcHJlbG9hZGluZ1N0YXR1cztcbiAgfVxuICBpc0VuY3J5cHRNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0TW9kZSB8fCB0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0QWxsTW9kZSB8fCB0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0T3ZlcmFsbE1vZGU7XG4gIH1cbiAgaXNDcmVkaXRDYXJkKCkge1xuICAgIHJldHVybiB0aGlzLl9fb2NyVHlwZSA9PT0gJ2NyZWRpdCc7XG4gIH1cbiAgc2hvd09DUkxvYWRpbmdVSSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKHByZWxvYWRpbmdVSVdyYXApIHtcbiAgICAgIHByZWxvYWRpbmdVSVdyYXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9XG4gIH1cbiAgaGlkZU9DUkxvYWRpbmdVSSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKHByZWxvYWRpbmdVSVdyYXApIHtcbiAgICAgIHByZWxvYWRpbmdVSVdyYXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH1cbiAgZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KSB7XG4gICAgaWYgKHRoaXMuaXNDcmVkaXRDYXJkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFbmNyeXB0TW9kZSgpICYmIHRoaXMuX19pc1N1cHBvcnRXYXNtKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdE1vZGUpIHtcbiAgICAgICAgY29uc3QgaW5jbHVkZUxpc3QgPSBbJ2p1bWluJywgJ2RyaXZlcl9udW1iZXInLCAncGFzc3BvcnRfbnVtYmVyJywgJ3BlcnNvbmFsX251bWJlcicsICdtcnoyJ107XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZCA9IHtcbiAgICAgICAgICBvY3JfcmVzdWx0OiBfLnRvUGFpcnMoXy5waWNrKHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgaW5jbHVkZUxpc3QpKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlKVxuICAgICAgICB9O1xuICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQgPSB7XG4gICAgICAgICAgLi4ucmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LFxuICAgICAgICAgIC4uLmVuY3J5cHRlZC5vY3JfcmVzdWx0XG4gICAgICAgIH07XG4gICAgICAgIHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSA9IGVuY3J5cHRlZC5vY3Jfb3JpZ2luX2ltYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0QWxsTW9kZSkge1xuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gWydjb21wbGV0ZScsICdyZXN1bHRfc2Nhbl90eXBlJywgJ2NvbG9yX3BvaW50JywgJ2ZvdW5kX2ZhY2UnLCAnc3BlY3VsYXJfcmF0aW8nLCAnc3RhcnRfdGltZScsICdlbmRfdGltZScsICdmZF9jb25maWRlbmNlJywgJ2lkX3RydXRoJywgJ2lkX3RydXRoX3JldHJ5X2NvdW50J107XG4gICAgICAgICAgY29uc3QgZW5jcnlwdGVkID0ge1xuICAgICAgICAgICAgb2NyX3Jlc3VsdDogXy50b1BhaXJzKF8ub21pdChyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGV4Y2x1ZGVMaXN0KSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICBhY2Nba2V5XSA9IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdCh2YWx1ZSk7XG4gICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlKSxcbiAgICAgICAgICAgIG9jcl9tYXNraW5nX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfbWFza2luZ19pbWFnZSksXG4gICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2UpXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXZpZXdfcmVzdWx0LmVuY3J5cHRlZCA9IGVuY3J5cHRlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBleGNsdWRlT2NyUmVzdWx0ID0gdGhpcy5fX29wdGlvbnMuZW5jcnlwdE9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0LmluY2x1ZGVzKFwiYWxsXCIpID8ge30gOiBfLm9taXQocmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LCB0aGlzLl9fb3B0aW9ucy5lbmNyeXB0T2NyUmVzdWx0RXhjbHVkZUtleWxpc3QpO1xuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVPY3JJbWFnZSA9IHRoaXMuX19vcHRpb25zLmVuY3J5cHRPY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0LmluY2x1ZGVzKFwiYWxsXCIpID8gXy5vbWl0KHJldmlld19yZXN1bHQsIFsuLi50aGlzLl9fb2NySW1hZ2VLZXlTZXRdKSA6IF8ub21pdChyZXZpZXdfcmVzdWx0LCB0aGlzLl9fb3B0aW9ucy5lbmNyeXB0T2NySW1hZ2VFeGNsdWRlS2V5bGlzdCk7XG4gICAgICAgICAgY29uc3QgZW5jcnlwdGVkID0ge1xuICAgICAgICAgICAgb2NyX3Jlc3VsdDogZXhjbHVkZU9jclJlc3VsdCxcbiAgICAgICAgICAgIC4uLmV4Y2x1ZGVPY3JJbWFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV2aWV3X3Jlc3VsdC50aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICAgIHJldmlld19yZXN1bHQuZW5jcnlwdGVkX292ZXJhbGwgPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQoSlNPTi5zdHJpbmdpZnkoZW5jcnlwdGVkKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXhjbHVkZU9jclJlc3VsdChvY3JfcmVzdWx0LCBleGNsdWRlS2V5bGlzdCkge1xuICAgIHJldHVybiBfLm9taXQob2NyX3Jlc3VsdCwgZXhjbHVkZUtleWxpc3QpO1xuICB9XG4gIGV4Y2x1ZGVPY3JJbWFnZShyZXZpZXdfcmVzdWx0LCBleGNsdWRlS2V5bGlzdCkge1xuICAgIHJldHVybiBfLm9taXQocmV2aWV3X3Jlc3VsdCwgZXhjbHVkZUtleWxpc3QpO1xuICB9XG4gIGdldE9DUkVuZ2luZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZTtcbiAgfVxuICBpbml0KHNldHRpbmdzKSB7XG4gICAgaWYgKCEhIXNldHRpbmdzLmxpY2Vuc2VLZXkpIHRocm93IG5ldyBFcnJvcignTGljZW5zZSBrZXkgaXMgZW1wdHknKTtcbiAgICB0aGlzLl9fbGljZW5zZSA9IHNldHRpbmdzLmxpY2Vuc2VLZXk7XG4gICAgaWYgKCEhc2V0dGluZ3Mub2NyUmVzdWx0RXhjbHVkZUtleWxpc3QgfHwgISFzZXR0aW5ncy5vY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0IHx8ICEhc2V0dGluZ3MuZW5jcnlwdE9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0IHx8ICEhc2V0dGluZ3MuZW5jcnlwdE9jckltYWdlRXhjbHVkZUtleWxpc3QpIHtcbiAgICAgIGNvbnN0IG9jckV4Y2x1ZGVLZXlTdHJpbmdUb0l0ZXIgPSAoc3RyLCBrZXlJdGVyKSA9PiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJycpLnNwbGl0KCcsJykuZmlsdGVyKGsgPT4ga2V5SXRlci5oYXMoaykpO1xuICAgICAgc2V0dGluZ3Mub2NyUmVzdWx0RXhjbHVkZUtleWxpc3QgPSBvY3JFeGNsdWRlS2V5U3RyaW5nVG9JdGVyKHNldHRpbmdzLm9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0LCB0aGlzLl9fb2NyUmVzdWx0S2V5U2V0KTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICBzZXR0aW5ncy5vY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0ID0gb2NyRXhjbHVkZUtleVN0cmluZ1RvSXRlcihzZXR0aW5ncy5vY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0LCB0aGlzLl9fb2NySW1hZ2VLZXlTZXQpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIHNldHRpbmdzLmVuY3J5cHRPY3JSZXN1bHRFeGNsdWRlS2V5bGlzdCA9IG9jckV4Y2x1ZGVLZXlTdHJpbmdUb0l0ZXIoc2V0dGluZ3MuZW5jcnlwdE9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0LCB0aGlzLl9fb2NyUmVzdWx0S2V5U2V0KTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICBzZXR0aW5ncy5lbmNyeXB0T2NySW1hZ2VFeGNsdWRlS2V5bGlzdCA9IG9jckV4Y2x1ZGVLZXlTdHJpbmdUb0l0ZXIoc2V0dGluZ3MuZW5jcnlwdE9jckltYWdlRXhjbHVkZUtleWxpc3QsIHRoaXMuX19vY3JJbWFnZUtleVNldCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIH1cblxuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBfLm1lcmdlKHt9LCB0aGlzLl9fb3B0aW9ucywgc2V0dGluZ3MpO1xuICAgIHRoaXMuc2V0T3B0aW9uKG1lcmdlZE9wdGlvbnMpO1xuICAgIHZvaWQgMDtcbiAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZCgpKSB7XG4gICAgICB0aGlzLl9fd2luZG93RXZlbnRCaW5kKCk7XG4gICAgICB0aGlzLl9fZGV2aWNlSW5mbyA9IGRldGVjdG9yLmdldE9zVmVyc2lvbigpO1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhpcy5fX2lzU3VwcG9ydFdhc20gPSBpc1N1cHBvcnRXYXNtKCk7XG4gICAgICBpZiAoIXRoaXMuX19pc1N1cHBvcnRXYXNtKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgaXMgbm90IHN1cHBvcnRlZC4gaW4gdGhpcyBicm93c2VyLicpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgc2V0T3B0aW9uKHNldHRpbmdzKSB7XG4gICAgdGhpcy5fX29wdGlvbnMgPSBzZXR0aW5ncztcbiAgfVxuICBnZXRPcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zO1xuICB9XG4gIGdldE9jclR5cGUodHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9fb2NyVHlwZU51bWJlclRvU3RyaW5nLmdldCh0eXBlKTtcbiAgfVxuICBnZXRPY3JUeXBlTnVtYmVyKHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9fb2NyU3RyaW5nVG9UeXBlTnVtYmVyLmdldChzdHJpbmcpO1xuICB9XG4gIGdldFVJT3JpZW50YXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX191aU9yaWVudGF0aW9uO1xuICB9XG4gIGdldFZpZGVvT3JpZW50YXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX192aWRlb09yaWVudGF0aW9uO1xuICB9XG4gIGFzeW5jIGNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlKCkge1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgIC8vIOyImOuPmeyghO2ZmCBvbiDsnbTrqbQg7IiY64+Z7KCE7ZmYIOyasOyEoFxuICAgICAgcmV0dXJuIHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g7IiY64+Z7KCE7ZmYIG9mZiDsnbTrqbQg7J6Q64+Z7KCE7ZmYIOyytO2BrFxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8g7J6Q64+Z7KCE7ZmYIG9u7J2865WMXG4gICAgICAgIC8vIOyEseuKpSDsuKHsoJXqsJLsnYQg6riw7KSA7Jy866GcIFdBU00gb3IgU2VydmVyXG4gICAgICAgIGNvbnN0IFtsYXRlbmN5UGVyMTAwbXMsIG1lYXN1cmVSZXBvcnRdID0gYXdhaXQgbWVhc3VyZSgpO1xuICAgICAgICB0aGlzLl9fZGVidWcobWVhc3VyZVJlcG9ydCk7XG4gICAgICAgIHJldHVybiBsYXRlbmN5UGVyMTAwbXMgPiBwYXJzZUZsb2F0KHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOyImOuPmeyghO2ZmOuPhCBvZmYsIOyekOuPmeyghO2ZmCBvZmZcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBzdGFydE9DUih0eXBlLCBvblN1Y2Nlc3MsIG9uRmFpbHVyZSwgb25JblByb2dyZXNzQ2hhbmdlID0gbnVsbCkge1xuICAgIGlmICghISF0eXBlIHx8ICEhIW9uU3VjY2VzcyB8fCAhISFvbkZhaWx1cmUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gYXdhaXQgdGhpcy5jaGVja1N3aXRjaFRvU2VydmVyTW9kZSgpO1xuICAgIHRoaXMuX19vY3JUeXBlID0gdHlwZTtcbiAgICB0aGlzLl9fc3NhTW9kZSA9IHRoaXMuX19vY3JUeXBlLmluZGV4T2YoJy1zc2EnKSA+IC0xO1xuICAgIHRoaXMuX19vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG9uRmFpbHVyZTtcbiAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlID0gb25JblByb2dyZXNzQ2hhbmdlO1xuICAgIGlmIChvbkluUHJvZ3Jlc3NDaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSkge1xuICAgICAgICB0aGlzLl9fdG9wVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnRvcFVJO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJKSB7XG4gICAgICAgIHRoaXMuX19taWRkbGVVSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkubWlkZGxlVUk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUkpIHtcbiAgICAgICAgdGhpcy5fX2JvdHRvbVVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5ib3R0b21VSTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbml0aWFsaXplZCEnKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX19wcmVwcm9jZXNzKCk7XG4gICAgICBhd2FpdCB0aGlzLl9fc2V0dXBEb21FbGVtZW50cygpO1xuICAgICAgaWYgKHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgICAvLyBzZXJ2ZXJNb2RlXG4gICAgICAgIGlmICh0aGlzLmlzRW5jcnlwdE1vZGUoKSAmJiB0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpOyAvLyDshJzrsoTrqqjrk5wg7J207KeA66eMIOyVlO2YuO2ZlCDtlZjquLDsnITtlbQgd2FzbeydhCBwcmVsb2FkaW5nIO2VqFxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2NhblNlcnZlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2FzbU1vZGVcbiAgICAgICAgYXdhaXQgdGhpcy5fX3ByZWxvYWRpbmdXYXNtKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5XYXNtKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnN0b3BPQ1IoKTtcbiAgICB9XG4gIH1cbiAgc3RvcE9DUigpIHtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICB0aGlzLl9fb25TdWNjZXNzID0gbnVsbDtcbiAgICB0aGlzLl9fb25GYWlsdXJlID0gbnVsbDtcbiAgfVxuICBzZXRJZ25vcmVDb21wbGV0ZSh2YWwpIHtcbiAgICB0aGlzLl9fT0NSRW5naW5lLnNldElnbm9yZUNvbXBsZXRlKHZhbCk7XG4gIH1cbiAgZW5jcnlwdChwbGFpblN0cikge1xuICAgIHJldHVybiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocGxhaW5TdHIpO1xuICB9XG4gIGFzeW5jIHJlc3RhcnRPQ1Iob2NyVHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSwgaXNTd2l0Y2hNb2RlID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNTd2l0Y2hNb2RlKSB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3BPQ1IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuc3RhcnRPQ1Iob2NyVHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSk7XG4gIH1cblxuICAvKiogcHJpdmF0ZSBtZXRob2RzICovXG4gIGFzeW5jIF9fd2FpdFByZWxvYWRlZCgpIHtcbiAgICBsZXQgd2FpdGluZ1JldHJ5Q291bnQgPSAwO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGNoZWNrID0gKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc1ByZWxvYWRlZCgpKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhaXRpbmdSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjaGVjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH07XG4gICAgICBjaGVjaygpO1xuICAgIH0pO1xuICB9XG4gIF9fcHJlcHJvY2VzcygpIHtcbiAgICBjb25zdCBjb252ZXJ0VHlwZVRvTnVtYmVyID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlSW50KG9wdGlvbikpID8gMCA6IHBhcnNlSW50KG9wdGlvbik7XG4gICAgfTtcbiAgICBjb25zdCBjb252ZXJ0VHlwZVRvRmxvYXQgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICByZXR1cm4gaXNOYU4ocGFyc2VGbG9hdChvcHRpb24pKSA/IDIwLjAgOiBwYXJzZUZsb2F0KG9wdGlvbik7XG4gICAgfTtcbiAgICB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50KTtcbiAgICB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lKTtcbiAgICB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggPSBjb252ZXJ0VHlwZVRvTnVtYmVyKHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCk7XG4gICAgdGhpcy5fX29wdGlvbnMuc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQgPSBjb252ZXJ0VHlwZVRvRmxvYXQodGhpcy5fX29wdGlvbnMuc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQpO1xuICB9XG4gIF9fd2luZG93RXZlbnRCaW5kKCkge1xuICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgaWYgKC9pcGhvbmV8aXBvZHxpcGFkLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBjb25zdCBza2lwVG91Y2hBY3Rpb25mb3Jab29tID0gZXYgPT4ge1xuICAgICAgICBpZiAoZXYudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXNfLl9fcGFnZUVuZCA9IHRydWU7XG4gICAgICBfdGhpc18uY2xlYW51cCgpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEhIV90aGlzXy5fX29jclR5cGUpIHJldHVybjtcbiAgICAgIGlmICghX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplKSB7XG4gICAgICAgIF90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IHRydWU7XG4gICAgICAgIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IG51bGw7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IF90aGlzXy5yZXN0YXJ0T0NSKF90aGlzXy5fX29jclR5cGUsIF90aGlzXy5fX29uU3VjY2VzcywgX3RoaXNfLl9fb25GYWlsdXJlLCBfdGhpc18uX19vbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghISFfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIpIHtcbiAgICAgICAgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dChoYW5kbGVSZXNpemUsIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVEZWxheSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19kZWJ1Zyhtc2cpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlRGVidWdBbGVydCkge1xuICAgICAgdm9pZCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIF9fc2xlZXAobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gIH1cbiAgX19ibG9iVG9CYXNlNjQoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgXykgPT4ge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgfSk7XG4gIH1cbiAgX19iYXNlNjR0b0Jsb2IoYmFzZTY0KSB7XG4gICAgLy8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xuICAgIGNvbnN0IGJ5dGVTdHJpbmcgPSBhdG9iKGJhc2U2NC5zcGxpdCgnLCcpWzFdKTtcblxuICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBjb25zdCBtaW1lU3RyaW5nID0gYmFzZTY0LnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXJcbiAgICBjb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgY29uc3QgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHtcbiAgICAgIHR5cGU6IG1pbWVTdHJpbmdcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX2NvbXByZXNlQmFzZTY0SW1hZ2UoYmFzZTY0LCBvcHRpb25zLCBjb25zdGFudE51bWJlcikge1xuICAgIGlmIChiYXNlNjQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGJsb2JGaWxlID0gdGhpcy5fX2Jhc2U2NHRvQmxvYihiYXNlNjQpO1xuICAgIGNvbnN0IGNvbXByZXNzZWQgPSBhd2FpdCBJbWFnZVV0aWwuY29tcHJlc3NJbWFnZShibG9iRmlsZSwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgIGNvbnN0IGNvbXByZXNzaW9uUmF0aW8gPSBNYXRoLnJvdW5kKCgxIC0gY29tcHJlc3NlZC5zaXplIC8gYmxvYkZpbGUuc2l6ZSkgKiAxMDAwMCkgLyAxMDA7XG4gICAgdm9pZCAwO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9fYmxvYlRvQmFzZTY0KGNvbXByZXNzZWQpO1xuICB9XG5cbiAgLyoqIOudvOydtOyEvOyKpCDtgqTrpbwgaGVhcCDsl5AgYWxsb2NhdGlvbiAqL1xuICBfX2dldFN0cmluZ09uV2FzbUhlYXAoKSB7XG4gICAgaWYgKCEhIXRoaXMuX19saWNlbnNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpY2Vuc2UgS2V5IGlzIGVtcHR5Jyk7XG4gICAgfVxuICAgIGNvbnN0IGxlbmd0aEJ5dGVzID0gdGhpcy5fX09DUkVuZ2luZS5sZW5ndGhCeXRlc1VURjgodGhpcy5fX2xpY2Vuc2UpICsgMTtcbiAgICB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyhsZW5ndGhCeXRlcyk7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zdHJpbmdUb1VURjgodGhpcy5fX2xpY2Vuc2UsIHRoaXMuX19zdHJpbmdPbldhc21IZWFwLCBsZW5ndGhCeXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuX19zdHJpbmdPbldhc21IZWFwO1xuICB9XG4gIF9fZW5jcnlwdFNjYW5SZXN1bHQob2NyUmVzdWx0KSB7XG4gICAgbGV0IHN0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIG9jclJlc3VsdCA9PT0gJ251bWJlcicpIG9jclJlc3VsdCA9IG9jclJlc3VsdC50b1N0cmluZygpO1xuICAgICAgaWYgKG9jclJlc3VsdCA9PT0gJycpIHJldHVybiAnJztcbiAgICAgIGlmICh0eXBlb2Ygb2NyUmVzdWx0ICE9PSAnc3RyaW5nJyAmJiAhISFvY3JSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvY3JSZXN1bHQgaXMgZW1wdHknKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBvY3JSZXN1bHQ7XG4gICAgICBjb25zdCBsZW5ndGhCeXRlcyA9IHRoaXMuX19PQ1JFbmdpbmUubGVuZ3RoQnl0ZXNVVEY4KGpzb25TdHJpbmcpICsgMTtcbiAgICAgIHN0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MobGVuZ3RoQnl0ZXMpO1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5zdHJpbmdUb1VURjgoanNvblN0cmluZywgc3RyaW5nT25XYXNtSGVhcCwgbGVuZ3RoQnl0ZXMpO1xuICAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdFJlc3VsdChzdHJpbmdPbldhc21IZWFwKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHN0cmluZ09uV2FzbUhlYXApIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZShzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fc2V0VmlkZW9SZXNvbHV0aW9uKHZpZGVvRWxlbWVudCkge1xuICAgIGxldCBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSBmYWxzZTtcbiAgICBsZXQgcmVzb2x1dGlvblRleHQgPSAnbm90IHJlYWR5JztcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgICByZXNvbHV0aW9uVGV4dFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMCkge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgICAgcmVzb2x1dGlvblRleHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJlc29sdXRpb25UZXh0ID0gdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggKyAneCcgKyB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XG4gICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxMDgwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTkyMCB8fCB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTkyMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDEwODApIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTI4MCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDcyMCB8fCB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gNzIwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTI4MCkge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW9FbGVtZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fX3ZpZGVvV2lkdGggPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aDtcbiAgICB0aGlzLl9fdmlkZW9IZWlnaHQgPSB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgfTtcbiAgfVxuICBfX2dldFNjYW5uZXJBZGRyZXNzKG9jclR5cGUpIHtcbiAgICBpZiAoIXRoaXMuX19vY3JUeXBlTGlzdC5pbmNsdWRlcyhvY3JUeXBlKSkgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgIHRyeSB7XG4gICAgICBsZXQgYWRkcmVzcyA9IDA7XG4gICAgICBsZXQgZGVzdHJveUNhbGxiYWNrID0gbnVsbDtcbiAgICAgIGNvbnN0IHN0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fZ2V0U3RyaW5nT25XYXNtSGVhcCgpO1xuICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgIC8vIE9DUlxuICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0SURDYXJkU2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lJRENhcmRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0UGFzc3BvcnRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveVBhc3Nwb3J0U2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRBbGllblNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95QWxpZW5TY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldENyZWRpdFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95Q3JlZGl0U2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjYW5uZXIgZG9lcyBub3QgZXhpc3RzJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgaWYgKGFkZHJlc3MgPT09IDApIHtcbiAgICAgICAgaWYgKHRoaXMuX19tYXhSZXRyeUNvdW50R2V0QWRkcmVzcyA9PT0gdGhpcy5fX3JldHJ5Q291bnRHZXRBZGRyZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBMaWNlbnNlIEtleScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19yZXRyeUNvdW50R2V0QWRkcmVzcysrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFthZGRyZXNzLCBkZXN0cm95Q2FsbGJhY2tdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRPRE8gOiBMaWNlbnNlIElzc3Vl7J24IOqyveyasCDsl5Drn6wg6rCS7J2EIOuwm+yVhOyEnCBlcnJvciDroZzqt7jrpbwg7LCN7J2EIOyImCDsnojqsowg7JqU7LKt7ZWE7JqUICjsnoTsi5wgTuuyiCDsnbTsg4EgYWRkcmVzc+ulvCDrqrvrsJvsnLzrqbQg6rCV7KCcIOyXkOufrClcbiAgICAgIHZvaWQgMDtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIF9fZ2V0QnVmZmVyKCkge1xuICAgIGlmICghdGhpcy5fX0J1ZmZlcikge1xuICAgICAgdGhpcy5fX0J1ZmZlciA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyh0aGlzLl9fcmVzb2x1dGlvbldpZHRoICogdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQgKiA0KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9fcmVzdWx0QnVmZmVyKSB7XG4gICAgICB0aGlzLl9fcmVzdWx0QnVmZmVyID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKDQwOTYpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0luZm8pIHtcbiAgICAgIGlmICghdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmKSB7XG4gICAgICAgIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyg0MDk2KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFt0aGlzLl9fQnVmZmVyLCB0aGlzLl9fcmVzdWx0QnVmZmVyLCB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWZdO1xuICB9XG4gIGFzeW5jIF9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbWFza01vZGUsIGltZ01vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGltZ1R5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLmVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZShhZGRyZXNzLCBtYXNrTW9kZSwgaW1nTW9kZSk7XG4gICAgICB9IGVsc2UgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLmVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZShhZGRyZXNzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fT0NSRW5naW5lLmdldEVuY29kZWRKcGdTaXplKCk7XG4gICAgICBjb25zdCBqcGdQb2ludGVyID0gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNvZGVkSnBnQnVmZmVyKCk7XG4gICAgICBjb25zdCByZXN1bHRWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fX09DUkVuZ2luZS5IRUFQOC5idWZmZXIsIGpwZ1BvaW50ZXIsIGpwZ1NpemUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkocmVzdWx0Vmlldyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdF0sIHtcbiAgICAgICAgdHlwZTogJ2ltYWdlL2pwZWcnXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9fYmxvYlRvQmFzZTY0KGJsb2IpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUVuY29kZWRKcGcoKTtcbiAgICB9XG4gIH1cblxuICAvKiogRnJlZSBidWZmZXIgKi9cbiAgX19kZXN0cm95QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fQnVmZmVyKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19CdWZmZXIpO1xuICAgICAgdGhpcy5fX0J1ZmZlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX19kZXN0cm95UmVzdWx0QnVmZmVyKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpO1xuICB9XG4gIF9fZGVzdHJveVJlc3VsdEJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX3Jlc3VsdEJ1ZmZlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fcmVzdWx0QnVmZmVyKTtcbiAgICAgIHRoaXMuX19yZXN1bHRCdWZmZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuICBfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zik7XG4gICAgICB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGcmVlIFByZXZJbWFnZSBidWZmZXIgKi9cbiAgX19kZXN0cm95UHJldkltYWdlKCkge1xuICAgIGlmICh0aGlzLl9fUHJldkltYWdlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19QcmV2SW1hZ2UpO1xuICAgICAgdGhpcy5fX1ByZXZJbWFnZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIGZyZWUgc3RyaW5nIGhlYXAgYnVmZmVyICovXG4gIF9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAoKSB7XG4gICAgaWYgKHRoaXMuX19zdHJpbmdPbldhc21IZWFwKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19zdHJpbmdPbldhc21IZWFwKTtcbiAgICAgIHRoaXMuX19zdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogZnJlZSBzY2FubmVyIGFkZHJlc3MgKi9cbiAgX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKSB7XG4gICAgaWYgKHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjaygpO1xuICAgICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2lzVmlkZW9SZXNvbHV0aW9uQ29tcGF0aWJsZSh2aWRlb0VsZW1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICByZXNvbHV0aW9uVGV4dFxuICAgIH0gPSBhd2FpdCB0aGlzLl9fc2V0VmlkZW9SZXNvbHV0aW9uKHZpZGVvRWxlbWVudCk7XG4gICAgaWYgKCFpc1N1cHBvcnRlZFJlc29sdXRpb24pIHtcbiAgICAgIGlmIChyZXNvbHV0aW9uVGV4dCAhPT0gJ25vdCByZWFkeScpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNTdXBwb3J0ZWRSZXNvbHV0aW9uO1xuICB9XG4gIF9fZ2V0Um90YXRpb25EZWdyZWUoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9fb3B0aW9ucy5yb3RhdGlvbkRlZ3JlZSAlIDM2MCArIDM2MCkgJSAzNjA7XG4gIH1cbiAgX19nZXRNaXJyb3JNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucy5taXJyb3JNb2RlO1xuICB9XG4gIGFzeW5jIF9fY3JvcEltYWdlRnJvbVZpZGVvKCkge1xuICAgIGlmICghdGhpcy5fX2NhbVNldENvbXBsZXRlKSByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgIGxldCBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcblxuICAgIC8vIHNvdXJjZSBpbWFnZSAob3IgdmlkZW8pXG4gICAgLy8g4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTXG4gICAgLy8g4pSDICAgICDilIogc3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilIPilIjilIjilIjilIgg4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTIOKUiiAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyBzeCAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiBzSGVpZ2h0ICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uIGNhbnZhc1xuICAgIC8vIOKUgyAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbIOKUiiAgICAgICAgICAgICAgIOKUg+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUk1xuICAgIC8vIOKUgyAgICAg4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSIICAgICAgICAgICAgICAgICDilIMgICAg4pSKICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICAgICAgICBzV2lkdGggICAgICAgICAgICAgICAgICAgICAg4pSDICAgIOKUiiBkeSAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyAgICDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSD4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICBkeCAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiBkSGVpZ2h0IOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSIICAgICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgICAgICAgIGRXaWR0aCAgICAgICAgICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJtcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIGR4LCBkeSlcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQvZHJhd0ltYWdlXG5cbiAgICBsZXQgY2FsY0NhbnZhcyA9IGNhbnZhcztcbiAgICBsZXQgY2FsY1ZpZGVvV2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9IZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPSB2aWRlby5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID0gdmlkZW8uY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aDtcbiAgICBsZXQgY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQgPSB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgICBjb25zdCBpc0FsaWVuQmFjayA9IHRoaXMuX19vY3JUeXBlID09PSAnYWxpZW4tYmFjayc7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCwgY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHRdID0gW2NhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0LCBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoXTtcbiAgICAgIFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFtjYWxjUmVzb2x1dGlvbl9oLCBjYWxjUmVzb2x1dGlvbl93XTtcbiAgICAgIGNhbGNDYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICAgIGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCc7XG4gICAgfVxuICAgIGxldCBjYWxjTWF4U1dpZHRoID0gOTk5OTk7XG4gICAgbGV0IGNhbGNNYXhTSGVpZ2h0ID0gOTk5OTk7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOyEuOuhnCBVSSAvIOyEuOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNXaWR0aCA9IGNhbGNWaWRlb1dpZHRoO1xuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOyEuOuhnCBVSSAvIOqwgOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g6rCA66GcIFVJIC8g6rCA66GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAvIOyEuOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNXaWR0aCA9IGNhbGNWaWRlb1dpZHRoO1xuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN4LCBzeTtcbiAgICBjb25zdCByYXRpbyA9IGNhbGNWaWRlb1dpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgY29uc3Qgc1dpZHRoID0gTWF0aC5taW4oTWF0aC5yb3VuZChjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoICogcmF0aW8pLCBjYWxjTWF4U1dpZHRoKTtcbiAgICBjb25zdCBzSGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5yb3VuZChjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCAqIHJhdGlvKSwgY2FsY01heFNIZWlnaHQpO1xuICAgIHN4ID0gTWF0aC5tYXgoTWF0aC5yb3VuZCgoY2FsY1ZpZGVvQ2xpZW50V2lkdGggLSBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoKSAvIDIgKiByYXRpbyksIDApO1xuICAgIHN5ID0gTWF0aC5tYXgoTWF0aC5yb3VuZCgoY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0IC0gY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQpIC8gMiAqIHJhdGlvKSwgMCk7XG4gICAgaWYgKGlzQWxpZW5CYWNrKSB7XG4gICAgICBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbY2FsY1Jlc29sdXRpb25faCwgY2FsY1Jlc29sdXRpb25fd107XG4gICAgfVxuICAgIGNhbGNDYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGNhbGNSZXNvbHV0aW9uX3cpO1xuICAgIGNhbGNDYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBjb25zdCBjYWxjQ29udGV4dCA9IGNhbGNDYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7XG4gICAgICB3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWVcbiAgICB9KTtcbiAgICBjYWxjQ29udGV4dC5kcmF3SW1hZ2UodmlkZW8sIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBsZXQgaW1nRGF0YSwgaW1nRGF0YVVybDtcbiAgICBpbWdEYXRhID0gY2FsY0NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGltZ0RhdGFVcmwgPSBjYWxjQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xuICAgIGlmIChpc0FsaWVuQmFjaykge1xuICAgICAgW2ltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCAyNzApO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtpbWdEYXRhLCBpbWdEYXRhVXJsXTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgZGVncmVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKGRlZ3JlZSA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKFtpbWdEYXRhLCBpbWdEYXRhVXJsXSk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGNvbnN0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGltZy5zcmMgPSBpbWdEYXRhVXJsO1xuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIGNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgICAgICBjb25zdCB0ZW1wQ29udGV4dCA9IHRlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGVtcENhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGlmIChbOTAsIDI3MF0uaW5jbHVkZXMoZGVncmVlKSkge1xuICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaW1nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKFswLCAxODBdLmluY2x1ZGVzKGRlZ3JlZSkpIHtcbiAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVncmVlID09PSA5MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKGltZy5oZWlnaHQsIDApO2Vsc2UgaWYgKGRlZ3JlZSA9PT0gMTgwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtlbHNlIGlmIChkZWdyZWUgPT09IDI3MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKDAsIGltZy53aWR0aCk7XG4gICAgICAgIHRlbXBDb250ZXh0LnJvdGF0ZShkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGVtcENvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIGNvbnN0IG5ld0ltYWdlRGF0YSA9IFs5MCwgMjcwXS5pbmNsdWRlcyhkZWdyZWUpID8gdGVtcENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZy5oZWlnaHQsIGltZy53aWR0aCkgOiB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcbiAgICAgICAgcmVzb2x2ZShbbmV3SW1hZ2VEYXRhLCB0ZW1wQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpXSk7XG4gICAgICAgIHRlbXBDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgYm94VHlwZSA9IDAsIHJldHJ5SW1nID0gbnVsbCkge1xuICAgIGlmICghYWRkcmVzcyB8fCBhZGRyZXNzIDwgMCkge1xuICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgaW1nRGF0YTtcbiAgICAgIGxldCBpbWdEYXRhVXJsID0gbnVsbDtcbiAgICAgIGNvbnN0IFtidWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgaWYgKHJldHJ5SW1nICE9PSBudWxsKSB7XG4gICAgICAgIGltZ0RhdGEgPSByZXRyeUltZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19jcm9wSW1hZ2VGcm9tVmlkZW8oKTtcbiAgICAgIH1cbiAgICAgIGlmICghISFpbWdEYXRhKSB7XG4gICAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgICAgfVxuICAgICAgdGhpcy5fX09DUkVuZ2luZS5IRUFQOC5zZXQoaW1nRGF0YS5kYXRhLCBidWZmZXIpO1xuICAgICAgbGV0IGtvciA9IGZhbHNlLFxuICAgICAgICBhbGllbiA9IGZhbHNlLFxuICAgICAgICBwYXNzcG9ydCA9IGZhbHNlO1xuICAgICAgc3dpdGNoICh0aGlzLl9fb2NyVHlwZSkge1xuICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAga29yID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIHBhc3Nwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICBhbGllbiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgLy8gbm90aGluZ1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgaWYgKGtvciB8fCBwYXNzcG9ydCB8fCBhbGllbikge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmRldGVjdF9pZGNhcmRfb3B0KGJ1ZmZlciwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIGFkZHJlc3MsIGtvciwgYWxpZW4sIHBhc3Nwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZGV0ZWN0X2lkY2FyZChidWZmZXIsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCBhZGRyZXNzLCBib3hUeXBlKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coJ2lzQ2FyZGJveERldGVjdGVkIHJlc3VsdCAtPS0tLS0tJywgcmVzdWx0KVxuICAgICAgcmV0dXJuIFshIXJlc3VsdCwgaW1nRGF0YSwgaW1nRGF0YVVybF07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdDYXJkIGRldGVjdGlvbiBlcnJvciA6ICcgKyBlO1xuICAgICAgaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnbWVtb3J5JykpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBfX3N0YXJ0UmVjb2duaXRpb24oYWRkcmVzcywgb2NyVHlwZSwgc3NhTW9kZSwgaXNTZXRJZ25vcmVDb21wbGV0ZSwgaW1nRGF0YSwgaW1nRGF0YVVybCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoYWRkcmVzcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2UgaWYgKGFkZHJlc3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnY2hlY2tWYWxpZGF0aW9uIEZhaWwnO1xuICAgICAgfVxuICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGw7XG4gICAgICBpZiAoIXRoaXMuX19vY3JUeXBlTGlzdC5pbmNsdWRlcyhvY3JUeXBlKSkgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgICAgY29uc3QgWywgcmVzdWx0QnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGNvbnN0IHJlY29nbml0aW9uID0gYXN5bmMgaXNTZXRJZ25vcmVDb21wbGV0ZSA9PiB7XG4gICAgICAgIGlmIChpc1NldElnbm9yZUNvbXBsZXRlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIDAsIGltZ0RhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbklEQ2FyZChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuUGFzc3BvcnQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQWxpZW4oYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQWxpZW5CYWNrKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQ3JlZGl0KGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2FubmVyIGRvZXMgbm90IGV4aXN0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzog7Iug7Jqp7Lm065Oc64qUIOyVhOyngSBrZXk6dmFsdWUg7ZiV7YOc66GcIOuzgO2ZmCDslYjrkJjslrQg7J6I7J2MXG4gICAgICAgIGlmIChvY3JUeXBlID09PSAnY3JlZGl0Jykge1xuICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IG51bGwgfHwgb2NyUmVzdWx0ID09PSAnJyB8fCBvY3JSZXN1bHQgPT09ICdmYWxzZScgfHwgb2NyUmVzdWx0WzBdID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fY3N2VG9PYmplY3Qob2NyUmVzdWx0KTtcbiAgICAgICAgaWYgKG9jclJlc3VsdD8uY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIG9jclJlc3VsdD8uY29tcGxldGUgPT09ICd0cnVlJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc1NldElnbm9yZUNvbXBsZXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCkge1xuICAgICAgICAgICAgICAvLyBkZXRlY3RlZENhcmRRdWV1ZeyXkOyEnCDtlZzsnqXsnYQg6rq864K07IScIOqwseyLoO2VnOuLpC5cbiAgICAgICAgICAgICAgLy8g7KCA7J6l65CY7Ja07J6I64qUIOydtOuvuOyngOydmCDsiKvsnpDqsIAgcmV0cnkg67O064ukIOyekeydgOqyveyasCDrjIDruYTtlZjsl6wgJeulvCDsgqzsmqntlahcbiAgICAgICAgICAgICAgY29uc3QgcXVldWVJZHggPSB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCAlIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGltZ0RhdGEgPSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVbcXVldWVJZHhdO1xuICAgICAgICAgICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVjb2duaXRpb24oaXNTZXRJZ25vcmVDb21wbGV0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDsgqzsp4Qg7ZWc7J6l7Jy866GcIE9DUiDsi6TtjKggKHBvcHVwIOuCtOumrOqzoCBzZXRJZ25vcmVDb21wbGV0ZShmYWxzZSkg7LKY66asP1xuICAgICAgICAgICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpO1xuICAgICAgICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTsgLy8g7Yyd7JeF7J20IOuCtOugpOqwiOuVjCDsspjrpqzrkJjsp4Drp4wg66+466asIOyymOumrFxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gZW5kIG9mIGZ1bmN0aW9uIHJlY29nbml0aW9uKClcblxuICAgICAgaWYgKGF3YWl0IHJlY29nbml0aW9uKGlzU2V0SWdub3JlQ29tcGxldGUpKSB7XG4gICAgICAgIGNvbnN0IGlzQ3JlZGl0Q2FyZCA9IG9jclR5cGUgPT09ICdjcmVkaXQnO1xuICAgICAgICBsZXQgb3JpZ2luSW1hZ2VNb2RlO1xuICAgICAgICBpZiAoaXNDcmVkaXRDYXJkKSB7XG4gICAgICAgICAgb3JpZ2luSW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuQ1JPUFBJTkc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fX29wdGlvbnMudXNlSW1hZ2VDcm9wcGluZykge1xuICAgICAgICAgIG9yaWdpbkltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLkNST1BQSU5HO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLnVzZUltYWdlV2FycGluZykge1xuICAgICAgICAgIG9yaWdpbkltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLldBUlBJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3JpZ2luSW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuTk9ORTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3JpZ2luSW1hZ2UgPSBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5GQUxTRSwgb3JpZ2luSW1hZ2VNb2RlKTtcbiAgICAgICAgbGV0IG1hc2tJbWFnZSA9IG51bGw7XG4gICAgICAgIGxldCBmYWNlSW1hZ2UgPSBudWxsO1xuICAgICAgICBsZXQgbWFza0ltYWdlTW9kZTtcbiAgICAgICAgaWYgKCFpc0NyZWRpdENhcmQpIHtcbiAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlSW1hZ2VDcm9wcGluZykge1xuICAgICAgICAgICAgbWFza0ltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLkNST1BQSU5HO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXNrSW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuV0FSUElORztcbiAgICAgICAgICB9XG4gICAgICAgICAgbWFza0ltYWdlID0gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIHRoaXMuT0NSX0lNR19NQVNLX01PREUuVFJVRSwgbWFza0ltYWdlTW9kZSk7XG4gICAgICAgICAgbWFza0ltYWdlID0gbWFza0ltYWdlID09PSAnZGF0YTonID8gbnVsbCA6IG1hc2tJbWFnZTtcbiAgICAgICAgICBmYWNlSW1hZ2UgPSB0aGlzLl9fb3B0aW9ucy51c2VGYWNlSW1hZ2UgPyBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbnVsbCwgb3JpZ2luSW1hZ2VNb2RlLCAnZmFjZScpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3NhTW9kZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBLCBmYWxzZSwgbWFza0ltYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAvLyBpZiAoIWlzQ3JlZGl0Q2FyZCAmJiB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSkge1xuICAgICAgICAvLyAgIG9yaWdpbkltYWdlID0gdGhpcy5fX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChcbiAgICAgICAgLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vICAgICB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLkZBTFNFLFxuICAgICAgICAvLyAgICAgb2NySW1hZ2VNb2RlXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZW5jcnlwdCBiYXNlNjQgaW1hZ2UnLCB7IG9yaWdpbkltYWdlIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmIChmYWNlSW1hZ2UgJiYgdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdEZhY2UpIHtcbiAgICAgICAgLy8gICBmYWNlSW1hZ2UgPSB0aGlzLl9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KFxuICAgICAgICAvLyAgICAgYWRkcmVzcyxcbiAgICAgICAgLy8gICAgIG51bGwsXG4gICAgICAgIC8vICAgICBvY3JJbWFnZU1vZGUsXG4gICAgICAgIC8vICAgICAnZmFjZSdcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdlbmNyeXB0IGJhc2U2NCBmYWNlIGltYWdlJywgeyBmYWNlSW1hZ2UgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG5cbiAgICAgICAgcmV0dXJuIFtvY3JSZXN1bHQsIG9yaWdpbkltYWdlLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsLCBudWxsLCBudWxsXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBfX3N0YXJ0VHJ1dGgob2NyVHlwZSwgYWRkcmVzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBbLCByZXN1bHRCdWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgaWYgKG9jclR5cGUuaW5kZXhPZignLXNzYScpID4gLTEpIHtcbiAgICAgICAgLy8gVE9ETzogd29ya2Vy66W8IOyCrOyaqe2VmOyXrCDrqZTsnbgoVUkg656c642U66eBKSDsiqTroIjrk5zqsIAg66mI7LaU7KeAIOyViuuPhOuhnSDsspjrpqwg7ZWE7JqUICjtmITsnqwgbG9hZGluZyBVSSDrnYTsmrDrqbQg7JWg64uI66mU7J207IWYIOupiOy2pClcbiAgICAgICAgLy8gVE9ETzogc2V0VGltZW91dCDsnLzroZwg64KY64iE642U652864+EIO2aqOqzvCDsl4bsnYwgc2V0VGltZW91dCDsp4DsmrDqs6AsIHdvcmtlcuuhnCDrs4Dqsr0g7ZWE7JqUXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5fX09DUkVuZ2luZS5zY2FuVHJ1dGgoYWRkcmVzcywgcmVzdWx0QnVmZmVyKSk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdTU0EgTW9kZSBpcyB0cnVlLiBidXQsIG9jclR5cGUgaXMgaW52YWxpZCA6ICcgKyBvY3JUeXBlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19jc3ZUb09iamVjdChzdHIpIHtcbiAgICBsZXQgcGFpcnMgPSBzdHIuc3BsaXQoJzsnKTtcbiAgICBsZXQgb2JqID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnOicpO1xuICAgICAgaWYgKHBhaXIubGVuZ3RoID09PSAyKSBvYmpbcGFpclswXV0gPSBwYWlyWzFdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIF9fZ2V0TWFza0luZm8oYWRkcmVzcykge1xuICAgIGlmIChhZGRyZXNzID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGFkZHJlc3MgPT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2NoZWNrVmFsaWRhdGlvbiBGYWlsJztcbiAgICB9XG4gICAgY29uc3QgWywsIG1hc2tJbmZvUmVzdWx0QnVmXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmdldE1hc2tSZWN0KGFkZHJlc3MsIG1hc2tJbmZvUmVzdWx0QnVmKTtcbiAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0ID09PSAnJykge1xuICAgICAgdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKTtcblxuICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgPyBudWxsIDogdGhpcy5fX2NzdlRvT2JqZWN0KHJlc3VsdCk7XG4gIH1cbiAgYXN5bmMgX19zdGFydFRydXRoUmV0cnkob2NyVHlwZSwgYWRkcmVzcywgaW1nRGF0YSkge1xuICAgIGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCAwLCBpbWdEYXRhKTtcbiAgICAvLyBhd2FpdCB0aGlzLl9fc3RhcnRSZWNvZ25pdGlvbihhZGRyZXNzLCBvY3JUeXBlLCB0cnVlKTsgICAgICAvLyBmb3Ig7ISx64ql7J2EIOychO2VtCDsp4TtlokgWFxuICAgIHJldHVybiBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aChvY3JUeXBlLCBhZGRyZXNzKTtcbiAgfVxuICBfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAvLyAx7LSIIGRlbGF5IO2bhCDsi6TtlolcbiAgICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIH0sIHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwpO1xuICB9XG4gIGFzeW5jIF9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICAgIGNvbnN0IGlzUGFzc3BvcnQgPSB0aGlzLl9fb2NyVHlwZS5pbmNsdWRlcygncGFzc3BvcnQnKTtcbiAgICAgIGF3YWl0IHRoaXMuX19zZXR1cFZpZGVvKGlzUGFzc3BvcnQpO1xuICAgICAgY29uc3Qge1xuICAgICAgICB2aWRlb1xuICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICBpZiAodmlkZW8pIHtcbiAgICAgICAgLy8gY29uc3QgW3RyYWNrXSA9IHRoaXMuX19zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgLy8gY29uc3QgY2FwYWJpbGl0eSA9IHRyYWNrLmdldENhcGFiaWxpdGllcygpO1xuICAgICAgICAvLyBjb25zb2xlLmRlYnVnKCdDYXJkU2Nhbl9faW5pdGlhbGl6ZSBjYXBhYmlsaXR5JywgY2FwYWJpbGl0eSk7XG4gICAgICAgIGlmICgnc3JjT2JqZWN0JyBpbiB2aWRlbykge1xuICAgICAgICAgIHZpZGVvLnNyY09iamVjdCA9IHRoaXMuX19zdHJlYW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQXZvaWQgdXNpbmcgdGhpcyBpbiBuZXcgYnJvd3NlcnMsIGFzIGl0IGlzIGdvaW5nIGF3YXkuXG4gICAgICAgICAgdmlkZW8uc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5fX3N0cmVhbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZygncHJvY2VlZENhbWVyYVBlcm1pc3Npb24gLSBvbmxvYWRlZG1ldGFkYXRhJyk7XG4gICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICB2b2lkIDA7XG5cbiAgICAgICAgICAvLyB2aWRlbyBlbGVtZW50IHN0eWxlIOyEpOyglVxuICAgICAgICAgIHRoaXMuX192aWRlb09yaWVudGF0aW9uID0gdmlkZW8udmlkZW9XaWR0aCAvIHZpZGVvLnZpZGVvSGVpZ2h0IDwgMSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB0aGlzLl9fY2FtU2V0Q29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19hZGp1c3RTdHlsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuUkVBRFkpO1xuICAgICAgICB2aWRlby53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEFsbG93ZWRFcnJvcicpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ0NhbWVyYSBBY2Nlc3MgUGVybWlzc2lvbiBpcyBub3QgYWxsb3dlZCc7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnRTQwMycsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICB9IGVsc2UgaWYgKGUubmFtZSA9PT0gJ05vdFJlYWRhYmxlRXJyb3InKSB7XG4gICAgICAgIC8vIOuLpOuluOqzs+yXkOyEnCDsubTrqZTrnbwg7J6Q7JuQ7J2EIOyCrOyaqeykkVxuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQgPCAwKSB7XG4gICAgICAgICAgLy8g7Lm066mU6528IOumrOyGjOyKpCDsnqzsmpTssq0g7Zqf7IiY7KCc7ZWcIOyXhuydjFxuICAgICAgICAgIHRoaXMuX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgKz0gMTtcbiAgICAgICAgICB0aGlzLl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpOyAvLyDsnqzqt4Ag7Zi47LacXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQgPiB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50ICs9IDE7XG4gICAgICAgICAgICB0aGlzLl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpOyAvLyDsnqzqt4Ag7Zi47LacXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdDYW1lcmEgcGVybWlzc2lvbnMgd2VyZSBncmFudGVkLCBidXQgRmFpbGVkIHRvIGFjcXVpcmUgQ2FtZXJhIHJlc291cmNlcy4nO1xuICAgICAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U0MDMnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJykge1xuICAgICAgICAvLyDquLDquLDsl5Ag7Jew6rKw65CcIOy5tOuplOudvOqwgCDsl4bsnYxcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ0NhbWVyYSBOb3QgRm91bmQnO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U0MDQnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3IgT2NjdXJlZCc7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnRTk5OScsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9fc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gICAgaWYgKGVsICYmIHN0eWxlKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICB9XG4gIF9fY2hhbmdlT0NSU3RhdHVzKHZhbCkge1xuICAgIHN3aXRjaCAodmFsKSB7XG4gICAgICAvLyBPQ1JcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFk6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuTk9UX1JFQURZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5SRUFEWTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5SRUFEWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRUQ6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0E6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTOlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBOlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQ6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuRE9ORTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fY2hhbmdlU3RhZ2UodmFsLCBmb3JjZVVwZGF0ZSA9IGZhbHNlLCByZWNvZ25pemVkSW1hZ2UgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID09PSB2YWwgJiYgZm9yY2VVcGRhdGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19jaGFuZ2VPQ1JTdGF0dXModmFsKTtcbiAgICB0aGlzLl9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9IHZhbDtcbiAgICB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAgPSB2YWw7XG4gICAgY29uc3Qge1xuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGJvcmRlcldpZHRoOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoICsgJ3B4JyxcbiAgICAgIGJvcmRlclN0eWxlOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnN0eWxlLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXJDb2xvcjogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZVt2YWxdXG4gICAgfTtcbiAgICBpZiAoZ3VpZGVCb3gpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwgc3R5bGUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2UpIHtcbiAgICAgIGlmICghIXRoaXMuX19vcHRpb25zLnNob3dDbGlwRnJhbWUpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFza0JveFdyYXA/LnF1ZXJ5U2VsZWN0b3IoJyNtYXNrQm94T3V0ZXInKT8uc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fX29wdGlvbnMubWFza0ZyYW1lU3R5bGVbdmFsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHtcbiAgICAgIGNhcHR1cmVCdXR0b24/LnF1ZXJ5U2VsZWN0b3IoJyNjYXB0dXJlQnV0dG9uJyk/LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX19vcHRpb25zLmNhcHR1cmVCdXR0b25TdHlsZVsnYmFzZV9jb2xvciddKTtcbiAgICB9XG4gICAgY29uc3Qgb2NyTW9kZSA9IHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSA/ICdzZXJ2ZXInIDogJ3dhc20nO1xuICAgIGlmICh0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlVG9wVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlVG9wVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fdG9wVUksICd0b3AnLCB0aGlzLl9fb3B0aW9ucy51c2VUb3BVSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJIHx8IHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX21pZGRsZVVJLCAnbWlkZGxlJywgdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX19ib3R0b21VSSwgJ2JvdHRvbScsIHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyB8fCB2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVEKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKTtcblxuICAgICAgICAvLyBGQUlM7J24IOqyveyasCA17LSI7ZuEIOyekOuPmeydhCDssL3ri6vsnYxcbiAgICAgICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuX19oaWRlUHJldmlld1VJLCAzMDAwLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHZpZGVvXG4gICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0EpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX2hpZGVQcmV2aWV3VUkoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEpOyAvLyBmb3IgVUkgdXBkYXRlXG4gIH1cblxuICBfX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld0ltYWdlXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcHJldmlld0ltYWdlLnNyYyA9IHJlY29nbml6ZWRJbWFnZTtcbiAgICBjb25zdCBpbWdTdHlsZSA9IHtcbiAgICAgICdtYXgtd2lkdGgnOiAnNzAlJyxcbiAgICAgICdtYXgtaGVpZ2h0JzogJzYwJSdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3SW1hZ2UsIGltZ1N0eWxlKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld1VJV3JhcCwge1xuICAgICAgZGlzcGxheTogJ2ZsZXgnXG4gICAgfSk7XG4gIH1cbiAgX19oaWRlUHJldmlld1VJKGNvbnRleHQpIHtcbiAgICBsZXQgX3RoaXNfID0gdGhpcztcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgX3RoaXNfID0gY29udGV4dDtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgdmlkZW8sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld0ltYWdlXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgX3RoaXNfLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICB9KTtcbiAgICBfdGhpc18uX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gJyc7XG4gIH1cbiAgYXN5bmMgX19nZXRJbnB1dERldmljZXMoKSB7XG4gICAgLy8gdGhyb3cgZXJyb3IgaWYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBpcyBub3Qgc3VwcG9ydGVkXG4gICAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25hdmlnYXRvci5tZWRpYURldmljZXMgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICBjb25zdCBkZXZpY2VzID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgbGV0IGNhbWVyYSA9IFtdO1xuICAgIGZvciAoY29uc3QgZGV2aWNlIG9mIGRldmljZXMpIHtcbiAgICAgIGlmIChkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGRldmljZSBpbnN0YW5jZW9mIElucHV0RGV2aWNlSW5mbykge1xuICAgICAgICAgICAgaWYgKGRldmljZS5nZXRDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FwID0gZGV2aWNlLmdldENhcGFiaWxpdGllcygpO1xuICAgICAgICAgICAgICBpZiAoY2FwPy5mYWNpbmdNb2RlPy5pbmNsdWRlcyh0aGlzLl9fZmFjaW5nTW9kZUNvbnN0cmFpbnQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNVbHRyYUNhbWVyYVJlZyA9IC91bHRyYXzsmrjtirjrnbwvZ2k7XG4gICAgICAgICAgICAgICAgaWYgKGlzVWx0cmFDYW1lcmFSZWcudGVzdChkZXZpY2UubGFiZWw/LnRvTG93ZXJDYXNlKCkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYW1lcmEucHVzaChjYXAuZGV2aWNlSWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaU9TIDE3IOuvuOunjOydmCBjaHJvbWUsIHNhZmFyaSDsl5DshJzripRcbiAgICAgICAgICAvLyBJbnB1dERldmljZUluZm8g6rCd7LK06rCAIOyXhuyWtOyEnCBnZXRDYXBhYmlsaXRpZXPrpbwg7ZmV7J247ZWgIOyImCDsl4bquLAg65WM66y47JeQXG4gICAgICAgICAgLy8gZGV2aWNlIGxhYmVs66eMIOuztOqzoCDtm4TrqbQg7Lm066mU652866GcIOyCrOyaqVxuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQmFja0NhbWVyYVJlZyA9IC9iYWNrfO2bhOuptC9nO1xuICAgICAgICAgICAgaWYgKGRldmljZS5sYWJlbD8ubGVuZ3RoICYmIGlzQmFja0NhbWVyYVJlZy50ZXN0KGRldmljZS5sYWJlbCkpIHtcbiAgICAgICAgICAgICAgY2FtZXJhLnB1c2goZGV2aWNlLmRldmljZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX2RlYnVnKGBjYW1lcmEgPSAke2NhbWVyYX0sIGNhbWVyYS5sZW5ndGggPSAke2NhbWVyYS5sZW5ndGh9YCk7XG4gICAgcmV0dXJuIGNhbWVyYTtcbiAgfVxuICBjaGVja1VJT3JpZW50YXRpb24oKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRldGVjdG9yLmdldFVJT3JpZW50YXRpb24oZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5vY3IpO1xuICAgIGxldCBpc0NoYW5nZWQgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudCAhPT0gdGhpcy5fX3ByZXZVaU9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9fdWlPcmllbnRhdGlvbiA9IGN1cnJlbnQ7XG4gICAgICB0aGlzLl9fcHJldlVpT3JpZW50YXRpb24gPSBjdXJyZW50O1xuICAgICAgaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBpc0NoYW5nZWRcbiAgICB9O1xuICB9XG4gIF9fY2xlYXJDdXN0b21VSShvYmopIHtcbiAgICBvYmouaW5uZXJIVE1MID0gJyc7XG4gICAgb2JqLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShvYmosIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9fc2V0dXBEb21FbGVtZW50cygpIHtcbiAgICBsZXQge1xuICAgICAgb2NyLFxuICAgICAgdmlkZW8sXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhcyxcbiAgICAgIGd1aWRlQm94LFxuICAgICAgdmlkZW9XcmFwLFxuICAgICAgZ3VpZGVCb3hXcmFwLFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyxcbiAgICAgIGN1c3RvbVVJV3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uLFxuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdVSSxcbiAgICAgIHByZXZpZXdJbWFnZSxcbiAgICAgIHN3aXRjaFVJV3JhcCxcbiAgICAgIHN3aXRjaFVJLFxuICAgICAgcHJlbG9hZGluZ1VJV3JhcCxcbiAgICAgIHByZWxvYWRpbmdVSVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmICghb2NyKSB0aHJvdyBuZXcgRXJyb3IoJ29jciBkaXYgZWxlbWVudCBpcyBub3QgZXhpc3QnKTtcbiAgICBpZiAodmlkZW9XcmFwKSB2aWRlb1dyYXAucmVtb3ZlKCk7XG4gICAgaWYgKGd1aWRlQm94V3JhcCkgZ3VpZGVCb3hXcmFwLnJlbW92ZSgpO1xuICAgIGlmICh2aWRlbykgdmlkZW8ucmVtb3ZlKCk7XG4gICAgaWYgKGNhbnZhcykgY2FudmFzLnJlbW92ZSgpO1xuICAgIGlmIChyb3RhdGlvbkNhbnZhcykgcm90YXRpb25DYW52YXMucmVtb3ZlKCk7XG4gICAgaWYgKGd1aWRlQm94KSBndWlkZUJveC5yZW1vdmUoKTtcbiAgICBpZiAobWFza0JveFdyYXApIG1hc2tCb3hXcmFwLnJlbW92ZSgpO1xuICAgIGlmIChwcmV2ZW50VG9GcmVlemVWaWRlbykgcHJldmVudFRvRnJlZXplVmlkZW8ucmVtb3ZlKCk7XG4gICAgaWYgKGN1c3RvbVVJV3JhcCkgY3VzdG9tVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIOqwgSB0b3AsIG1pZGRsZSwgYm90dG9tIFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAodG9wVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZVRvcFVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSSh0b3BVSSk7XG4gICAgaWYgKG1pZGRsZVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkobWlkZGxlVUkpO1xuICAgIGlmIChib3R0b21VSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKGJvdHRvbVVJKTtcbiAgICBpZiAoY2FwdHVyZVVJV3JhcCkgY2FwdHVyZVVJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBjYXB0dXJlIFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAoY2FwdHVyZVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKGNhcHR1cmVVSSk7XG4gICAgaWYgKHByZXZpZXdVSVdyYXApIHByZXZpZXdVSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8gcHJldmlldyBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHByZXZpZXdVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShwcmV2aWV3VUkpO1xuICAgIGlmIChzd2l0Y2hVSVdyYXApIHN3aXRjaFVJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBzd2l0Y2ggVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChzd2l0Y2hVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB0aGlzLl9fY2xlYXJDdXN0b21VSShzd2l0Y2hVSSk7XG4gICAgaWYgKHByZWxvYWRpbmdVSVdyYXApIHByZWxvYWRpbmdVSVdyYXAucmVtb3ZlKCk7XG4gICAgY29uc3Qgcm90YXRpb25EZWdyZWUgPSB0aGlzLl9fZ2V0Um90YXRpb25EZWdyZWUoKTtcbiAgICB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA9IFs5MCwgMjcwXS5pbmNsdWRlcyhyb3RhdGlvbkRlZ3JlZSk7XG4gICAgbGV0IG9jclN0eWxlID0ge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUob2NyLCBvY3JTdHlsZSk7XG4gICAgY29uc3Qgd3JhcFN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAvLyB2ZXJ0aWNhbCBhbGlnbiBtaWRkbGVcbiAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgIH07XG4gICAgdmlkZW9XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmlkZW9XcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICd2aWRlb1dyYXAnKTtcbiAgICBpZiAodmlkZW9XcmFwKSB7XG4gICAgICB3aGlsZSAodmlkZW9XcmFwLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgdmlkZW9XcmFwLnJlbW92ZUNoaWxkKHZpZGVvV3JhcC5sYXN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvV3JhcCwgd3JhcFN0eWxlKTtcbiAgICB9XG4gICAgb2NyLmFwcGVuZENoaWxkKHZpZGVvV3JhcCk7XG4gICAgbWFza0JveFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBtYXNrQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnbWFza0JveFdyYXAnKTtcbiAgICBtYXNrQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUobWFza0JveFdyYXAsIHdyYXBTdHlsZSk7XG4gICAgbGV0IG1hc2tfZnJhbWUgPSB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZS5iYXNlX2NvbG9yICsgJ2ZmJztcbiAgICBpZiAoISF0aGlzLl9fb3B0aW9ucy5zaG93Q2xpcEZyYW1lKSB7XG4gICAgICBtYXNrX2ZyYW1lID0gdGhpcy5fX29wdGlvbnMubWFza0ZyYW1lU3R5bGUuY2xpcF9mcmFtZSArICc1NSc7XG4gICAgfVxuICAgIG1hc2tCb3hXcmFwLmlubmVySFRNTCA9ICcnICsgXCIgIDxzdmcgaWQ9J21hc2tCb3hDb250YWluZXInIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+XFxuXCIgKyBcIiAgICA8bWFzayBpZD0nbWFzay1yZWN0Jz5cXG5cIiArIFwiICAgICAgPHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nd2hpdGUnPjwvcmVjdD5cXG5cIiArIFwiICAgICAgPHN2ZyB4PSc1MCUnIHk9JzUwJScgb3ZlcmZsb3c9J3Zpc2libGUnPlxcblwiICsgXCIgICAgICAgICAgPHJlY3QgaWQ9J21hc2tCb3hJbm5lcidcXG5cIiArIFwiICAgICAgICAgICAgd2lkdGg9JzQwMCcgaGVpZ2h0PScyNjAnXFxuXCIgKyBcIiAgICAgICAgICAgIHg9Jy0yMDAnIHk9Jy0xMzAnXFxuXCIgKyBcIiAgICAgICAgICAgIHJ4PScxMCcgcnk9JzEwJ1xcblwiICsgXCIgICAgICAgICAgICBmaWxsPSdibGFjaycgc3Ryb2tlPSdibGFjayc+PC9yZWN0PlxcblwiICsgJyAgICAgIDwvc3ZnPlxcbicgKyAnICAgIDwvbWFzaz5cXG4nICsgXCIgICAgPHJlY3QgaWQ9J21hc2tCb3hPdXRlcidcXG5cIiArIFwiICAgICAgICAgIHg9JzAnIHk9JzAnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnXFxuXCIgKyBcIiAgICAgICAgICBmaWxsPSdcIiArIG1hc2tfZnJhbWUgKyBcIicgbWFzaz0ndXJsKCNtYXNrLXJlY3QpJz48L3JlY3Q+XFxuXCIgKyAnICA8L3N2Zz4nO1xuICAgIG9jci5hcHBlbmRDaGlsZChtYXNrQm94V3JhcCk7XG4gICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICd2aWRlbycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAndHJ1ZScpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAndHJ1ZScpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgIGxldCB2aWRlb1N0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICB3aWR0aDogJzEwMCUnXG4gICAgfTtcbiAgICBjb25zdCByb3RhdGVDc3MgPSAncm90YXRlKCcgKyByb3RhdGlvbkRlZ3JlZSArICdkZWcpJztcbiAgICBjb25zdCBtaXJyb3JDc3MgPSAncm90YXRlWSgxODBkZWcpJztcbiAgICBjb25zdCByb3RhdGVBbmRNaXJyb3JDc3MgPSBtaXJyb3JDc3MgKyAnICcgKyByb3RhdGVDc3M7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBpZiAodGhpcy5fX2dldE1pcnJvck1vZGUoKSkge1xuICAgICAgICB2aWRlb1N0eWxlID0ge1xuICAgICAgICAgIC4uLnZpZGVvU3R5bGUsXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlQW5kTWlycm9yQ3NzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aWRlb1N0eWxlID0ge1xuICAgICAgICAgIC4uLnZpZGVvU3R5bGUsXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlQ3NzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9fZ2V0TWlycm9yTW9kZSgpKSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiBtaXJyb3JDc3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB2aWRlb1N0eWxlKTtcbiAgICB2aWRlb1dyYXAuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgIGd1aWRlQm94V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGd1aWRlQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnZ3VpZGVCb3hXcmFwJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94V3JhcCwgd3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoZ3VpZGVCb3hXcmFwKTtcbiAgICBndWlkZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIGd1aWRlQm94LnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdndWlkZUJveCcpO1xuICAgIGd1aWRlQm94LnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIG1hcmdpbjogJzAgYXV0bycsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0pO1xuICAgIGd1aWRlQm94V3JhcC5hcHBlbmRDaGlsZChndWlkZUJveCk7XG4gICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYW52YXMnKTtcbiAgICBjb25zdCBjYW52YXNTdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IHRoaXMuX19vcHRpb25zLnNob3dDYW52YXNQcmV2aWV3ID8gdGhpcy5fX2lzUm90YXRlZDkwb3IyNzAgPyAnbm9uZScgOiAnZGlzcGxheScgOiAnbm9uZScsXG4gICAgICB3aWR0aDogJzI1JScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgdG9wOiAnMzBweCcsXG4gICAgICBib3JkZXI6ICdncmVlbiAycHggc29saWQnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FudmFzLCBjYW52YXNTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgcm90YXRpb25DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICByb3RhdGlvbkNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncm90YXRpb25DYW52YXMnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocm90YXRpb25DYW52YXMsIHtcbiAgICAgIGRpc3BsYXk6IHRoaXMuX19vcHRpb25zLnNob3dDYW52YXNQcmV2aWV3ID8gdGhpcy5fX2lzUm90YXRlZDkwb3IyNzAgPyAnZGlzcGxheScgOiAnbm9uZScgOiAnbm9uZScsXG4gICAgICBoZWlnaHQ6ICcyNSUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICByaWdodDogJzBweCcsXG4gICAgICB0b3A6ICczMHB4JyxcbiAgICAgIGJvcmRlcjogJ2JsdWUgMnB4IHNvbGlkJ1xuICAgIH0pO1xuICAgIG9jci5hcHBlbmRDaGlsZChyb3RhdGlvbkNhbnZhcyk7XG4gICAgcHJldmVudFRvRnJlZXplVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlby5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmVudFRvRnJlZXplVmlkZW8nKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJldmVudFRvRnJlZXplVmlkZW8sIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgYm90dG9tOiAnMTAnLFxuICAgICAgcmlnaHQ6ICcxMCdcbiAgICB9KTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlby5pbm5lckhUTUwgPSAnJyArICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cIm1hcmdpbjogYXV0bzsgYmFja2dyb3VuZDogbm9uZTsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bztcIiB3aWR0aD1cIjMycHhcIiBoZWlnaHQ9XCIzMnB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkXCI+XFxuJyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIwLjU1NTU1NTU1NTU1NTU1NTZzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MVwiIHZhbHVlcz1cIjEwOzBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJmaWxsXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwiZGlzY3JldGVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiIzg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMFwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICc8L3N2Zz4nO1xuICAgIG9jci5hcHBlbmRDaGlsZChwcmV2ZW50VG9GcmVlemVWaWRlbyk7XG4gICAgY3VzdG9tVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY3VzdG9tVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjdXN0b21VSVdyYXAnKTtcbiAgICBjb25zdCBjdXN0b21VSVdyYXBTdHlsZSA9IHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY3VzdG9tVUlXcmFwLCBjdXN0b21VSVdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGN1c3RvbVVJV3JhcCk7XG5cbiAgICAvLyDqsIEgdG9wLCBtaWRkbGUsIGJvdHRvbSBVSSDsgqzsmqkodXNlKeyXrOu2gOyZgCDqtIDqs4Tsl4bsnbQg7JiB7Jet7J2EIOyeoeq4sCDsnITtlbQsIGRpduqwgCDsl4bsnLzrqbQg7IOd7ISxXG4gICAgLy8gYWRqdXN0U3R5bGUoKSDsl5DshJwg7IS467aA7KCB7J24IOyCrOydtOymiOyZgCDsnITsuZjqsJIg64+Z7KCB7Jy866GcIOyEpOygleuQqC5cbiAgICBpZiAoIXRvcFVJKSB7XG4gICAgICB0b3BVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9wVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3RvcFVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZCh0b3BVSSk7XG4gICAgaWYgKCFtaWRkbGVVSSkge1xuICAgICAgbWlkZGxlVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG1pZGRsZVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdtaWRkbGVVSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQobWlkZGxlVUkpO1xuICAgIGlmICghYm90dG9tVUkpIHtcbiAgICAgIGJvdHRvbVVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBib3R0b21VSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnYm90dG9tVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKGJvdHRvbVVJKTtcbiAgICBjYXB0dXJlVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2FwdHVyZVVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZVVJV3JhcCcpO1xuICAgIGNvbnN0IGNhcHR1cmVVSVdyYXBTdHlsZSA9IHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjZW50ZXInXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwgY2FwdHVyZVVJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY2FwdHVyZVVJV3JhcCk7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgaWYgKHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSB8fCB0aGlzLl9fb3B0aW9ucy51c2VGb3JjZUNvbXBsZXRlVUkpIHtcbiAgICAgICAgaWYgKCFjYXB0dXJlVUkpIHtcbiAgICAgICAgICBjYXB0dXJlVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjYXB0dXJlVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhcHR1cmVVSScpO1xuICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYXB0dXJlQnV0dG9uKSB7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhcHR1cmVCdXR0b24nKTtcbiAgICAgICAgICBsZXQgY2FwdHVyZUJ1dHRvblNyY1NWRyA9IGBgO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYDxzdmcgd2lkdGg9JzgwJyBoZWlnaHQ9JzgwJyB2aWV3Qm94PScwIDAgODAgODAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uU3JjU1ZHICs9IGAgIDxjaXJjbGUgaWQ9J2NhcHR1cmVCdXR0b24nIGN4PSc0MCcgY3k9JzQwJyByPSczOCcgZmlsbD0nIzU1NTU1NScgc3Ryb2tlPScjZmZmZmZmJyBzdHJva2Utd2lkdGg9JzQnLz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYDwvc3ZnPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbi5pbm5lckhUTUwgPSBjYXB0dXJlQnV0dG9uU3JjU1ZHO1xuICAgICAgICAgIGNhcHR1cmVVSS5hcHBlbmRDaGlsZChjYXB0dXJlQnV0dG9uKTtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlVUlXcmFwLmFwcGVuZENoaWxkKGNhcHR1cmVVSSk7XG4gICAgICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IF9fb25DbGlja0NhcHR1cmVCdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzXy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgICAgICBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ3RydWUnKTtcbiAgICAgICAgICAgIF90aGlzXy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ3RydWUnKTtcbiAgICAgICAgICAgIF90aGlzXy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzXy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2FwdHVyZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja0NhcHR1cmVCdXR0b24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICBwcmV2aWV3VUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcmV2aWV3VUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3VUlXcmFwJyk7XG4gICAgICBjb25zdCBwcmV2aWV3VUlXcmFwU3R5bGUgPSB7XG4gICAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsXG4gICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzAwMDAwMGFhJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCBwcmV2aWV3VUlXcmFwU3R5bGUpO1xuICAgICAgb2NyLmFwcGVuZENoaWxkKHByZXZpZXdVSVdyYXApO1xuICAgICAgaWYgKCFwcmV2aWV3VUkpIHtcbiAgICAgICAgcHJldmlld1VJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByZXZpZXdVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld1VJJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld1VJLCB7XG4gICAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsXG4gICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgaGVpZ2h0OiAnJyxcbiAgICAgICAgJ21heC13aWR0aCc6ICc5MCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6ICc5MCUnXG4gICAgICB9KTtcbiAgICAgIHByZXZpZXdVSVdyYXAuYXBwZW5kQ2hpbGQocHJldmlld1VJKTtcbiAgICAgIGlmICghcHJldmlld0ltYWdlKSB7XG4gICAgICAgIHByZXZpZXdJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBwcmV2aWV3SW1hZ2Uuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdJbWFnZScpO1xuICAgICAgICBwcmV2aWV3VUkuYXBwZW5kQ2hpbGQocHJldmlld0ltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgc3dpdGNoVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzd2l0Y2hVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3N3aXRjaFVJV3JhcCcpO1xuICAgICAgY29uc3Qgc3dpdGNoVUlXcmFwU3R5bGUgPSB7XG4gICAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJycsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBvdmVyZmxvdzogJycsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH07XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoc3dpdGNoVUlXcmFwLCBzd2l0Y2hVSVdyYXBTdHlsZSk7XG4gICAgICBvY3IuYXBwZW5kQ2hpbGQoc3dpdGNoVUlXcmFwKTtcbiAgICAgIGlmICghc3dpdGNoVUkpIHtcbiAgICAgICAgc3dpdGNoVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3dpdGNoVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3N3aXRjaFVJJyk7XG4gICAgICAgIGxldCBzd2l0Y2hIVE1MID0gYGA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYDxkaXYgY2xhc3M9J2N1c3RvbS0tbGFiZWwgZmxleCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1jZW50ZXIgZ2FwMTAnPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPGxhYmVsIGZvcj0nbWFudWFsLXN3aXRjaC13YXNtLXRvLXNlcnZlci1jaGVja2JveCc+V0FTTTwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgY2xhc3M9J3N3aXRjaCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICAgIDxpbnB1dCBpZD0nbWFudWFsLXN3aXRjaC13YXNtLXRvLXNlcnZlci1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgICA8c3BhbiBjbGFzcz0nc2xpZGVyIHJvdW5kJz48L3NwYW4+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8L2xhYmVsPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPGxhYmVsIGZvcj0ncHJpb3JpdHktZmluYW5jZS1jb2h0bWxGb3JsaXN0LWNoZWNrYm94Jz5TZXJ2ZXI8L2xhYmVsPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYDwvZGl2PmA7XG4gICAgICAgIHN3aXRjaFVJLmlubmVySFRNTCA9IHN3aXRjaEhUTUw7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoc3dpdGNoVUksIHtcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICB9KTtcbiAgICAgIHN3aXRjaFVJV3JhcC5hcHBlbmRDaGlsZChzd2l0Y2hVSSk7XG4gICAgICBjb25zdCBzd2l0Y2hDaGVja2JveCA9IHN3aXRjaFVJLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdO1xuICAgICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICAgIGNvbnN0IF9fb25DbGlja1N3aXRjaFVJID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzXy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGF3YWl0IF90aGlzXy5yZXN0YXJ0T0NSKF90aGlzXy5fX29jclR5cGUsIF90aGlzXy5fX29uU3VjY2VzcywgX3RoaXNfLl9fb25GYWlsdXJlLCBfdGhpc18uX19vbkluUHJvZ3Jlc3NDaGFuZ2UsIHRydWUpO1xuICAgICAgfTtcbiAgICAgIHN3aXRjaENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrU3dpdGNoVUksIHtcbiAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHByZWxvYWRpbmdVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmVsb2FkaW5nVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmVsb2FkaW5nVUlXcmFwJyk7XG4gICAgY29uc3QgcHJlbG9hZGluZ1VJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwMDAwZmYnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJlbG9hZGluZ1VJV3JhcCwgcHJlbG9hZGluZ1VJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQocHJlbG9hZGluZ1VJV3JhcCk7XG4gICAgaWYgKCFwcmVsb2FkaW5nVUkpIHtcbiAgICAgIHByZWxvYWRpbmdVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJlbG9hZGluZ1VJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmVsb2FkaW5nVUknKTtcbiAgICAgIHByZWxvYWRpbmdVSS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RleHQtaW5mbycpO1xuICAgICAgcHJlbG9hZGluZ1VJLmlubmVySFRNTCA9ICcnICsgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiYmFja2dyb3VuZDogbm9uZTsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bztcIiB3aWR0aD1cIjMycHhcIiBoZWlnaHQ9XCIzMnB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkXCI+XFxuJyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIwLjU1NTU1NTU1NTU1NTU1NTZzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MVwiIHZhbHVlcz1cIjEwOzBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJmaWxsXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwiZGlzY3JldGVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiIzg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMFwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICc8L3N2Zz4nO1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2cgPT09ICcnIHx8IHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2cpIHtcbiAgICAgICAgcHJlbG9hZGluZ1VJLmlubmVySFRNTCArPSB0aGlzLl9fb3B0aW9ucy5wcmVsb2FkaW5nVUlUZXh0TXNnO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUocHJlbG9hZGluZ1VJLCB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgIH0pO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuYXBwZW5kQ2hpbGQocHJlbG9hZGluZ1VJKTtcblxuICAgIC8vIGxvYWRpbmcgVUkg7JyE7LmYIOyekOumrOyeoeqyjCDtlZjquLAg7JyE7ZW0XG4gICAgYXdhaXQgdGhpcy5fX2luaXRTdHlsZSgpO1xuXG4gICAgLy8g7ZmU66m06rO864+EIO2YhOyDgSDtlbTqsrBcbiAgICB0aGlzLl9fc2V0U3R5bGUob2NyLCB7XG4gICAgICBkaXNwbGF5OiAnJ1xuICAgIH0pO1xuICAgIHRoaXMuX19vY3IgPSBvY3I7XG4gICAgdGhpcy5fX2NhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLl9fcm90YXRpb25DYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICB0aGlzLl9fdmlkZW8gPSB2aWRlbztcbiAgICB0aGlzLl9fdmlkZW9XcmFwID0gdmlkZW9XcmFwO1xuICAgIHRoaXMuX19ndWlkZUJveCA9IGd1aWRlQm94O1xuICAgIHRoaXMuX19ndWlkZUJveFdyYXAgPSBndWlkZUJveFdyYXA7XG4gICAgdGhpcy5fX21hc2tCb3hXcmFwID0gbWFza0JveFdyYXA7XG4gICAgdGhpcy5fX3ByZXZlbnRUb0ZyZWV6ZVZpZGVvID0gcHJldmVudFRvRnJlZXplVmlkZW87XG4gICAgdGhpcy5fX2N1c3RvbVVJV3JhcCA9IGN1c3RvbVVJV3JhcDtcbiAgICB0aGlzLl9fdG9wVUkgPSB0b3BVSTtcbiAgICB0aGlzLl9fbWlkZGxlVUkgPSBtaWRkbGVVSTtcbiAgICB0aGlzLl9fYm90dG9tVUkgPSBib3R0b21VSTtcbiAgICB0aGlzLl9fY2FwdHVyZVVJV3JhcCA9IGNhcHR1cmVVSVdyYXA7XG4gICAgdGhpcy5fX2NhcHR1cmVVSSA9IGNhcHR1cmVVSTtcbiAgICB0aGlzLl9fY2FwdHVyZUJ1dHRvbiA9IGNhcHR1cmVCdXR0b247XG4gICAgdGhpcy5fX3ByZXZpZXdVSVdyYXAgPSBwcmV2aWV3VUlXcmFwO1xuICAgIHRoaXMuX19wcmV2aWV3VUkgPSBwcmV2aWV3VUk7XG4gICAgdGhpcy5fX3ByZXZpZXdJbWFnZSA9IHByZXZpZXdJbWFnZTtcbiAgICB0aGlzLl9fc3dpdGNoVUlXcmFwID0gc3dpdGNoVUlXcmFwO1xuICAgIHRoaXMuX19zd2l0Y2hVSSA9IHN3aXRjaFVJO1xuICAgIHJldHVybiB7XG4gICAgICBvY3IsXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhcyxcbiAgICAgIHZpZGVvLFxuICAgICAgdmlkZW9XcmFwLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBndWlkZUJveFdyYXAsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLFxuICAgICAgY3VzdG9tVUlXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b24sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld1VJLFxuICAgICAgcHJldmlld0ltYWdlLFxuICAgICAgc3dpdGNoVUlXcmFwLFxuICAgICAgc3dpdGNoVUlcbiAgICB9O1xuICB9XG4gIF9fYmx1ckNhcHR1cmVCdXR0b24oKSB7XG4gICAgdGhpcy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgIGRpc3BsYXk6ICcnXG4gICAgfSk7XG4gICAgY29uc3Qge1xuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChjYXB0dXJlQnV0dG9uKSB7XG4gICAgICBjYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcsICdmYWxzZScpO1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVCdXR0b24sIHtcbiAgICAgICAgZGlzcGxheTogJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBfX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHJldHVybiBjYXB0dXJlQnV0dG9uID8gY2FwdHVyZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnKSA9PT0gJ3RydWUnIDogZmFsc2U7XG4gIH1cbiAgYXN5bmMgX19zZXR1cFZpZGVvKGlzUGFzc3BvcnQpIHtcbiAgICAvLyB3YXNtIOyduOyLneyEseuKpSDstZzsoIHtmZTrkJwg7ZW07IOB64+EXG4gICAgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCA9IDEwODA7XG4gICAgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQgPSA3MjA7XG4gICAgdGhpcy5fX2NhbVNldENvbXBsZXRlID0gZmFsc2U7XG4gICAgY29uc3Qge1xuICAgICAgdmlkZW8sXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhc1xuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGxldCBjYW1lcmEgPSBhd2FpdCB0aGlzLl9fZ2V0SW5wdXREZXZpY2VzKCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3ZpZGVvRGV2aWNlcyA6OiAnLCBjYW1lcmEpXG5cbiAgICB0aGlzLmNoZWNrVUlPcmllbnRhdGlvbigpO1xuICAgIGxldCBjb25zdHJhaW50V2lkdGgsIGNvbnN0cmFpbnRIZWlnaHQ7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSA9PT0gJ2hpZ2hRdWFsaXR5Jykge1xuICAgICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgOiDtmZTsp4gg7Jqw7ISgXG4gICAgICAvLyAxOTIweDEwODDsnbQg6rCA64ql7ZWc6rK97JqwIOyCrOyaqSDslYTri4jrqbQgMTI4MHg3MjAg7IKs7JqpXG4gICAgICBjb25zdHJhaW50V2lkdGggPSB7XG4gICAgICAgIGlkZWFsOiAxOTIwLFxuICAgICAgICBtaW46IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50SGVpZ2h0ID0ge1xuICAgICAgICBpZGVhbDogMTA4MCxcbiAgICAgICAgbWluOiA3MjBcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vICdjb21wYXRpYmlsaXR5J1xuICAgICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgOiDtmLjtmZjshLEg7Jqw7ISgXG4gICAgICAvLyAxOTIweDEwODDsnbQg7IKs7JqpIOqwgOuKpe2VmOuNlOudvOuPhCAxMjgweDcyMOydhCDsgqzsmqntlZjrj4TroZ0g6rOg7KCVXG4gICAgICAvLyDsgqzsnKAgOiDqsKTrn63si5wgZW50cnkg66qo6424KEHsi5zrpqzspoggLyBXaWRlIOuqqOuNuCDrk7Ep7JeQ7IScIDE5MjAgeCAxMDgwIOyymOumrOyLnCDruYTsnKjsnbQg7J207IOB7ZW07KeQKO2ZgOytieydtOuQqClcbiAgICAgIC8vIO2VreyDgSAxMjgwIHggNzIw7J2EIOyCrOyaqe2VmOuPhOuhnSDrs4Dqsr1cbiAgICAgIGNvbnN0cmFpbnRXaWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50SGVpZ2h0ID0ge1xuICAgICAgICBpZGVhbDogNzIwXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBjb25zdHJhaW50cyA9IHtcbiAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgIHZpZGVvOiB7XG4gICAgICAgIHpvb206IHtcbiAgICAgICAgICBpZGVhbDogMVxuICAgICAgICB9LFxuICAgICAgICBmYWNpbmdNb2RlOiB7XG4gICAgICAgICAgaWRlYWw6IHRoaXMuX19mYWNpbmdNb2RlQ29uc3RyYWludFxuICAgICAgICB9LFxuICAgICAgICBmb2N1c01vZGU6IHtcbiAgICAgICAgICBpZGVhbDogJ2NvbnRpbnVvdXMnXG4gICAgICAgIH0sXG4gICAgICAgIHdoaXRlQmFsYW5jZU1vZGU6IHtcbiAgICAgICAgICBpZGVhbDogJ2NvbnRpbnVvdXMnXG4gICAgICAgIH0sXG4gICAgICAgIGRldmljZUlkOiBjYW1lcmEubGVuZ3RoID8ge1xuICAgICAgICAgIGlkZWFsOiBjYW1lcmFbY2FtZXJhLmxlbmd0aCAtIDFdXG4gICAgICAgIH0gOiBudWxsLFxuICAgICAgICB3aWR0aDogY29uc3RyYWludFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvbnN0cmFpbnRIZWlnaHRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8g7LWc7LSIIOynhOyehSDsnbTslrTshJwgdmlkZW9EZWl2Y2Ug66as7Iqk7Yq466W8IOqwgOyguOyYrCDsiJgg7JeG7Jy866m0LFxuICAgIC8vIGdldFVzZXJNZWRpYeulvCDsnoTsnZgg7Zi47Lac7ZWY7JesIOq2jO2VnOydhCDrsJvsnYDrkqQg64uk7IucIOqwgOyguOyYtFxuICAgIGlmIChjYW1lcmEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9fZGVidWcoJ2Nhbm5vdCB0byBnZXQgY2FtZXJhIGRldmljZXMuIHNvLCB0cnkgdG8gZ2V0IGNhbWVyYSBkZXZpY2VzIGFnYWluJyk7XG4gICAgICB0aGlzLl9fZGVidWcoYGNvbnN0cmFpbnRzIDogJHtKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cyl9YCk7XG4gICAgICB0aGlzLl9fc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gICAgICBjYW1lcmEgPSBhd2FpdCB0aGlzLl9fZ2V0SW5wdXREZXZpY2VzKCk7XG4gICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGNhbWVyYS5sZW5ndGggPyB7XG4gICAgICAgIGlkZWFsOiBjYW1lcmFbY2FtZXJhLmxlbmd0aCAtIDFdXG4gICAgICB9IDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyDqsKTrn63si5wgd2lkZSDrk7Eg7KCA7IKs7JaRIOq4sOq4sOyXkOyEnCBGSEQg7ZW07IOB64+EIOy5tOuplOudvCDsgqzsmqnsi5wg7ZmA7K2J7J2065CY64qUIO2YhOyDgSDrsKnsp4BcbiAgICAvLyDsoIDsgqzslpEg6riw6riwIO2MkOuLqOq4sOykgCA6IO2bhOuptOy5tOuplOudvOydmCDqsJzsiJjqsIAgMeqwnOudvOuKlCDqsIDsoJVcbiAgICBpZiAoY2FtZXJhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5fX2RlYnVnKCdtYXliZSBkZXZpY2UgaXMgZW50cnkgbW9kZWwgc3VjaCBhcyBnYWxheHkgd2lkZScpO1xuICAgICAgY29uc3RyYWludHMudmlkZW8ud2lkdGggPSB7XG4gICAgICAgIGlkZWFsOiAxMjgwXG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMudmlkZW8uaGVpZ2h0ID0ge1xuICAgICAgICBpZGVhbDogNzIwXG4gICAgICB9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gY29uc3QgZHVtcHRyYWNrID0gKFthLCBiXSwgdHJhY2spID0+XG4gICAgICAvLyAgIGAke2F9JHt0cmFjay5raW5kID09ICd2aWRlbycgPyAnQ2FtZXJhJyA6ICdNaWNyb3Bob25lJ30gKCR7dHJhY2sucmVhZHlTdGF0ZX0pOiAke3RyYWNrLmxhYmVsfSR7Yn1gO1xuXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICB0aGlzLl9fZGVidWcoYGNvbnN0cmFpbnRzIDogJHtKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cyl9YCk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3ZpZGVvVHJhY2tzIDo6ICcsIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpKTtcbiAgICAgIGNvbnN0IHN0cmVhbVNldHRpbmdzID0gc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1ZyhcbiAgICAgIC8vICAgJ3N0cmVhbUNhcGFiaWxpdGllcyA6OiAnLFxuICAgICAgLy8gICBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRDYXBhYmlsaXRpZXMoKVxuICAgICAgLy8gKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1Zygnc3RyZWFtIDo6ICcsIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldENvbnN0cmFpbnRzKCkpO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCdzdHJlYW1TZXR0aW5ncyA6OiAnLCBzdHJlYW1TZXR0aW5ncyk7XG4gICAgICB0aGlzLl9fZGVidWcoYHN0cmVhbSB3aWR0aCAqIGhlaWdodCA6OiAke3N0cmVhbVNldHRpbmdzLndpZHRofSAqICR7c3RyZWFtU2V0dGluZ3MuaGVpZ2h0fWApO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gd2lkdGggLyBoZWlnaHQgOjogJyArIHN0cmVhbVNldHRpbmdzLndpZHRoIC8gc3RyZWFtU2V0dGluZ3MuaGVpZ2h0KTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIGFzcGVjdFJhdGlvIDo6ICcgKyBzdHJlYW1TZXR0aW5ncy5hc3BlY3RSYXRpbyk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSBmYWNpbmdNb2RlIDo6ICcgKyBzdHJlYW1TZXR0aW5ncy5mYWNpbmdNb2RlKTtcbiAgICAgIFtjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgICBbcm90YXRpb25DYW52YXMud2lkdGgsIHJvdGF0aW9uQ2FudmFzLmhlaWdodF0gPSBbdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGhdO1xuICAgICAgfVxuICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgdGhpcy5fX3N0cmVhbSA9IHN0cmVhbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2luaXRTdHlsZSgpIHtcbiAgICB2b2lkIDA7XG4gICAgY29uc3Qge1xuICAgICAgb2NyLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuXG4gICAgLy8g6riw7KSA7KCV67O0XG4gICAgY29uc3QgYmFzZVdpZHRoID0gNDAwO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSAyNjA7XG4gICAgY29uc3Qgc2Nhbm5lckZyYW1lUmF0aW8gPSBiYXNlSGVpZ2h0IC8gYmFzZVdpZHRoOyAvLyDsi6DrtoTspp0g67mE7JyoXG5cbiAgICBsZXQgZ3VpZGVCb3hXaWR0aCwgZ3VpZGVCb3hIZWlnaHQ7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRXaWR0aCA9IG9jci5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY09jckNsaWVudEhlaWdodCA9IG9jci5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoO1xuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzO1xuICAgIGNvbnN0IGd1aWRlQm94UmF0aW9CeVdpZHRoID0gdGhpcy5fX2d1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgIGNvbnN0IHZpZGVvUmF0aW9CeUhlaWdodCA9IHRoaXMuX192aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICAvLyDshLjroZwgVUkgJiYg7IS466GcIOu5hOuUlOyYpOuhnCDqsITso7xcbiAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuICAgICAgZ3VpZGVCb3hXaWR0aCA9IGNhbGNPY3JDbGllbnRXaWR0aCAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOqwgOuhnCBVSSAmJiDqsIDroZwg67mE65SU7Jik66GcIOqwhOyjvFxuICAgICAgLy8g67mE65SU7Jik66W8IOqwgOuhnCBVSeydmCBoZWlnaHQg6riw7KSA7Jy866GcIOykhOydtOqzoFxuICAgICAgLy8g6rCA66GcIFVJIGhlaWdodCDquLDspIDsnLzroZwg67mE65SU7Jik7J2YIHdpZHRoIOqzhOyCsFxuICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBjYWxjT2NyQ2xpZW50SGVpZ2h0ICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcbiAgICB9XG4gICAgZ3VpZGVCb3hXaWR0aCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgZ3VpZGVCb3hIZWlnaHQgKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveFdpZHRoID0gZ3VpZGVCb3hXaWR0aCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveEhlaWdodCA9IGd1aWRlQm94SGVpZ2h0ICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgaWYgKHRvcFVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodG9wVUksIHtcbiAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtaWRkbGVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKG1pZGRsZVVJLCB7XG4gICAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICBwYWRkaW5nOiAnMTBweCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYm90dG9tVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShib3R0b21VSSwge1xuICAgICAgICAncGFkZGluZy10b3AnOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHZpZGVvSW5uZXJHYXAgPSAyOyAvLyDrr7jshLjtlZjqsowgbWFza0JveElubmVy67O064ukIGd1aWRlQm946rCAIOyekeydgOqygyDrs7TsoJVcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHtcbiAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgIH0pO1xuICAgIGNvbnN0IG1hc2tCb3hJbm5lciA9IG1hc2tCb3hXcmFwLnF1ZXJ5U2VsZWN0b3IoJyNtYXNrQm94SW5uZXInKTtcbiAgICBsZXQgciA9IGJvcmRlclJhZGl1cyAtIGJvcmRlcldpZHRoICogMjtcbiAgICByID0gciA8IDAgPyAwIDogcjtcbiAgICBpZiAoIWlzTmFOKHJlZHVjZWRHdWlkZUJveFdpZHRoKSAmJiAhaXNOYU4ocmVkdWNlZEd1aWRlQm94SGVpZ2h0KSAmJiAhaXNOYU4oYm9yZGVyUmFkaXVzKSAmJiAhaXNOYU4oYm9yZGVyV2lkdGgpKSB7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJXaWR0aCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJIZWlnaHQgPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgbWFza0JveElubmVyV2lkdGggKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBtYXNrQm94SW5uZXJIZWlnaHQgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd4JywgbWFza0JveElubmVyV2lkdGggLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd5JywgbWFza0JveElubmVySGVpZ2h0IC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncngnLCByICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncnknLCByICsgJycpO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2FkanVzdFN0eWxlKCkge1xuICAgIGNvbnN0IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEgPSAoYSwgYikgPT4ge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnY2FtZXJhUmVzb2x1dGlvbicpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGEsIGIpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9fb3B0aW9ucy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9PT0gJ29jclZpZXdTaXplJykge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoYSwgYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oYSwgYik7IC8vIGRlZmF1bHQgOiBjYW1lcmFSZXNvbHV0aW9uXG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICBvY3IsXG4gICAgICB2aWRlbyxcbiAgICAgIGd1aWRlQm94LFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICAgIGNvbnN0IGlzQWxpZW5CYWNrID0gdGhpcy5fX29jclR5cGUgPT09ICdhbGllbi1iYWNrJztcblxuICAgIC8vIOq4sOykgOygleuztFxuICAgIGNvbnN0IGJhc2VXaWR0aCA9IGlzQWxpZW5CYWNrID8gMjYwIDogNDAwO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSBpc0FsaWVuQmFjayA/IDQwMCA6IDI2MDtcbiAgICBjb25zdCBzY2FubmVyRnJhbWVSYXRpbyA9IGJhc2VIZWlnaHQgLyBiYXNlV2lkdGg7IC8vIOyLoOu2hOymnSDruYTsnKhcblxuICAgIGxldCBndWlkZUJveFdpZHRoLCBndWlkZUJveEhlaWdodDtcbiAgICBsZXQgY2FsY09jckNsaWVudFdpZHRoID0gb2NyLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjT2NyQ2xpZW50SGVpZ2h0ID0gb2NyLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvV2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9IZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPSB2aWRlby5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID0gdmlkZW8uY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uO1xuICAgIGlmIChjYWxjVmlkZW9XaWR0aCA9PT0gMCB8fCBjYWxjVmlkZW9IZWlnaHQgPT09IDAgfHwgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPT09IDAgfHwgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJvcmRlcldpZHRoID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS53aWR0aDtcbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnJhZGl1cztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIFtjYWxjVmlkZW9XaWR0aCwgY2FsY1ZpZGVvSGVpZ2h0XSA9IFtjYWxjVmlkZW9IZWlnaHQsIGNhbGNWaWRlb1dpZHRoXTtcbiAgICAgIFtjYWxjVmlkZW9DbGllbnRXaWR0aCwgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0XSA9IFtjYWxjVmlkZW9DbGllbnRIZWlnaHQsIGNhbGNWaWRlb0NsaWVudFdpZHRoXTtcbiAgICAgIGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCc7XG4gICAgfVxuICAgIGxldCBuZXdWaWRlb1dpZHRoID0gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgbGV0IG5ld1ZpZGVvSGVpZ2h0ID0gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGd1aWRlQm94UmF0aW9CeVdpZHRoID0gdGhpcy5fX2d1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgIGNvbnN0IHZpZGVvUmF0aW9CeUhlaWdodCA9IHRoaXMuX192aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgY29uc3QgbmV3VmlkZW9SYXRpb0J5V2lkdGggPSBjYWxjVmlkZW9DbGllbnRIZWlnaHQgLyBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBjb25zdCBuZXdWaWRlb1JhdGlvQnlIZWlnaHQgPSBjYWxjVmlkZW9DbGllbnRXaWR0aCAvIGNhbGNWaWRlb0NsaWVudEhlaWdodDtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIC8vIOyEuOuhnCBVSVxuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnXG4gICAgICB9KTtcbiAgICAgIC8vIHZpZGVvIOqwgOuhnCDquLDspIAgMTAwJSDsnKDsp4AgKOuzgOqyveyXhuydjClcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g7Lm066mU652864+EIOyEuOuhnFxuICAgICAgICAvLyDshLjroZwgVUkgJiYg7IS466GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDqsIDroZwg6riw7KSA7Jy866GcIOqwgOydtOuTnOuwleyKpCDqs4TsgrBcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG5cbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDtmZXrjIBcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g7Lm066mU652864qUIOqwgOuhnFxuICAgICAgICAvLyDshLjroZwgVUkgJiYg6rCA66GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7Iqk66W8IOu5hOuUlOyYpCDshLjroZwg6ri47J207JeQIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpO1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDqsIDroZwgVUlcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZW5kJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcidcbiAgICAgIH0pO1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDqsIDroZwgVUkgJiYg6rCA66GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDruYTrlJTsmKTrpbwg6rCA66GcIFVJ7J2YIGhlaWdodCDquLDspIDsnLzroZwg7KSE7J206rOgXG4gICAgICAgIC8vIOqwgOuhnCBVSSBoZWlnaHQg6riw7KSA7Jy866GcIOu5hOuUlOyYpOydmCB3aWR0aCDqs4TsgrBcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTripQg7IS466GcIOq4sOykgOycvOuhnCDrp57stqRcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG5cbiAgICAgICAgLy8g67mE65SU7Jik66W8IOyEuOuhnCDquLDspIDsnLzroZwg64uk7IucIOunnuy2pFxuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IGd1aWRlQm94SGVpZ2h0O1xuICAgICAgICBuZXdWaWRlb1dpZHRoID0gbmV3VmlkZW9IZWlnaHQgKiBuZXdWaWRlb1JhdGlvQnlIZWlnaHQ7XG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk7J2YIOqwgOuhnCDtgazquLDqsIAg6rCA66GcIFVJIHdpZHRoICogcmF0aW8g6rCS67O064ukIO2BrOuptCxcbiAgICAgICAgaWYgKGd1aWRlQm94V2lkdGggPiBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGgpIHtcbiAgICAgICAgICAvLyDqs4TsgrAg67Cp7Iud7J2EIOuwlOq+vOuLpCAo7IKs7JygIDog6rGw7J2YIOygleyCrOqwge2YleyXkCDqsIDquYzsmrQg6rK97JqwIOqwgOydtOuTnCDrsJXsiqQg6rCA66Gc6rCAIOq9ieywqOqyjCDrkKguKVxuICAgICAgICAgIGd1aWRlQm94V2lkdGggPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG5cbiAgICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIO2ZleuMgFxuICAgICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDqsIDroZwgVUkgJiYg7IS466GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDqsIDroZwg6riw7KSA7Jy866GcIOqwgOydtOuTnOuwleyKpCDqs4TsgrBcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZggaGVpZ2h0IO2BrOq4sOulvCBVSeydmCBoZWlnaHQg6riw7KSA7JeQIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZgg6rCA66GcIO2BrOq4sOqwgCDqsIDroZwgVUkgd2lkdGggKiByYXRpbyDqsJLrs7Tri6Qg7YGs66m0LFxuICAgICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aCkge1xuICAgICAgICAgIC8vIOqzhOyCsCDrsKnsi53snYQg67CU6r6864ukICjsgqzsnKAgOiDqsbDsnZgg7KCV7IKs6rCB7ZiV7JeQIOqwgOq5jOyatCDqsr3smrAg6rCA7J2065OcIOuwleyKpCDqsIDroZzqsIAg6r2J7LCo6rKMIOuQqC4pXG4gICAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7LaV7IaMXG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjYWxjR3VpZGVCb3hDcml0ZXJpYSjsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSDquLDspIAp6rCAIG9jclZpZXdTaXplKO2ZlOuptCDtgazquLApIOq4sOykgOydvOuVjFxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9PT0gJ29jclZpZXdTaXplJykge1xuICAgICAgLy8gZ3VpZGVCb3hIZWlnaHQg7J20IGNhbGNPY3JDbGllbnRIZWlnaHQg67O064ukIO2BsOqyveyasCjqsIDsnbTrk5zrsJXsiqTqsIAg7ZmU66m07J2EIOuEmOyWtOqwgOuKlCDqsr3smrApIOuLpOyLnCDqs4TsgrBcbiAgICAgIGlmIChndWlkZUJveEhlaWdodCA+IGNhbGNPY3JDbGllbnRIZWlnaHQpIHtcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBNYXRoLm1pbihjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIC8vIGd1aWRlQm94SGVpZ2h0IOydtCBjYWxjT2NyQ2xpZW50SGVpZ2h0IOuztOuLpCDtgbDqsr3smrAo6rCA7J2065Oc67CV7Iqk6rCAIO2ZlOuptOydhCDrhJjslrTqsIDripQg6rK97JqwKSDri6Tsi5wg6rOE7IKwXG4gICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IGNhbGNPY3JDbGllbnRXaWR0aCkge1xuICAgICAgICBndWlkZUJveFdpZHRoID0gTWF0aC5taW4oY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aCA9IE1hdGgubWluKGd1aWRlQm94V2lkdGgsIG5ld1ZpZGVvV2lkdGgpO1xuICAgIHRoaXMuX19jcm9wSW1hZ2VTaXplSGVpZ2h0ID0gTWF0aC5taW4oZ3VpZGVCb3hIZWlnaHQsIG5ld1ZpZGVvSGVpZ2h0KTtcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIFtuZXdWaWRlb1dpZHRoLCBuZXdWaWRlb0hlaWdodF0gPSBbbmV3VmlkZW9IZWlnaHQsIG5ld1ZpZGVvV2lkdGhdO1xuICAgIH1cbiAgICBndWlkZUJveFdpZHRoICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBndWlkZUJveEhlaWdodCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94V2lkdGggPSBndWlkZUJveFdpZHRoICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQgKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBpZiAodG9wVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh0b3BVSSwge1xuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUobWlkZGxlVUksIHtcbiAgICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChib3R0b21VSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGJvdHRvbVVJLCB7XG4gICAgICAgICdwYWRkaW5nLXRvcCc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICB3aWR0aDogbmV3VmlkZW9XaWR0aCArICdweCdcbiAgICB9KTtcbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIGhlaWdodDogbmV3VmlkZW9IZWlnaHQgKyAncHgnXG4gICAgfSk7XG4gICAgY29uc3QgdmlkZW9Jbm5lckdhcCA9IDI7IC8vIOuvuOyEuO2VmOqyjCBtYXNrQm94SW5uZXLrs7Tri6QgZ3VpZGVCb3jqsIAg7J6R7J2A6rKDIOuztOyglVxuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgfSk7XG4gICAgY29uc3QgbWFza0JveElubmVyID0gbWFza0JveFdyYXAucXVlcnlTZWxlY3RvcignI21hc2tCb3hJbm5lcicpO1xuICAgIGxldCByID0gYm9yZGVyUmFkaXVzIC0gYm9yZGVyV2lkdGggKiAyO1xuICAgIHIgPSByIDwgMCA/IDAgOiByO1xuICAgIGlmICghaXNOYU4ocmVkdWNlZEd1aWRlQm94V2lkdGgpICYmICFpc05hTihyZWR1Y2VkR3VpZGVCb3hIZWlnaHQpICYmICFpc05hTihib3JkZXJSYWRpdXMpICYmICFpc05hTihib3JkZXJXaWR0aCkpIHtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lcldpZHRoID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lckhlaWdodCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBtYXNrQm94SW5uZXJXaWR0aCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hc2tCb3hJbm5lckhlaWdodCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3gnLCBtYXNrQm94SW5uZXJXaWR0aCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3knLCBtYXNrQm94SW5uZXJIZWlnaHQgLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeCcsIHIgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeScsIHIgKyAnJyk7XG4gICAgfVxuXG4gICAgLy8g7IiY64+ZIOy0rOyYgSBVSSDsgqzsmqlcbiAgICAvLyBmaXJzdENhbGxlZOyduCDqsr3smrAg7JWE7KeBIGNhcHR1cmVVSeqwgCDqt7jroKTsp4Dsp4Ag7JWK7JWEIOustOydmOuvuFxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgZGlzcGxheTogJydcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnICYmIGJvdHRvbVVJICYmIGNhcHR1cmVVSSkge1xuICAgICAgICBjb25zdCBjYWxjU3VtT2ZIZWlnaHRCb3R0b21VSUNoaWxkTm9kZXMgPSB0aGlzLl9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2Rlcyhib3R0b21VSSk7XG4gICAgICAgIGxldCBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9IGNhcHR1cmVCdXR0b24ucXVlcnlTZWxlY3Rvcignc3ZnJykuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICAgICAgY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQgPSBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9PT0gMCA/IDgwIDogY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQ7XG4gICAgICAgIGxldCBjYXB0dXJlVUlQYWRkaW5nQm90dG9tID0gYm90dG9tVUkuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGlzTmFOKHBhcnNlSW50KGJvdHRvbVVJLnN0eWxlLnBhZGRpbmdUb3ApKSA/IDAgOiBwYXJzZUludChib3R0b21VSS5zdHlsZS5wYWRkaW5nVG9wKTtcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBjYWxjU3VtT2ZIZWlnaHRCb3R0b21VSUNoaWxkTm9kZXM7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJhc2VsaW5lID0gY2FsY09jckNsaWVudEhlaWdodCAtIChjYWxjT2NyQ2xpZW50SGVpZ2h0IC8gMiArIGd1aWRlQm94SGVpZ2h0IC8gMik7XG4gICAgICAgIGlmIChjYXB0dXJlVUlQYWRkaW5nQm90dG9tID4gMCAmJiBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIDwgYmFzZWxpbmUpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6ICcnLFxuICAgICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSArICdweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJzEwcHgnLFxuICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0cnVlKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzKG9iaikge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmo/LmNoaWxkTm9kZXMpIHtcbiAgICAgIHN1bSArPSBpdGVtLmNsaWVudEhlaWdodCA/IGl0ZW0uY2xpZW50SGVpZ2h0IDogMDtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbiAgfVxuICBfX2Nsb3NlQ2FtZXJhKCkge1xuICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICB0aGlzLnN0b3BTY2FuKCk7XG4gICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gIH1cbiAgYXN5bmMgX19sb2FkUmVzb3VyY2VzKCkge1xuICAgIHZvaWQgMDtcbiAgICBpZiAodGhpcy5fX3Jlc291cmNlc0xvYWRlZCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9faXNTdXBwb3J0U2ltZCA9IGF3YWl0IHNpbWQoKTtcbiAgICBsZXQgZW52SW5mbyA9ICcnO1xuICAgIGVudkluZm8gKz0gYG9zIDogJHt0aGlzLl9fZGV2aWNlSW5mby5vc31cXG5gO1xuICAgIGVudkluZm8gKz0gYG9zU2ltcGxlIDogJHt0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZX1cXG5gO1xuICAgIGVudkluZm8gKz0gYGlzU3VwcG9ydFdhc206ICR7dGhpcy5fX2lzU3VwcG9ydFdhc219XFxuYDtcbiAgICBlbnZJbmZvICs9IGBzaW1kKHdhc20tZmVhdHVyZS1kZXRlY3QpIDogJHt0aGlzLl9faXNTdXBwb3J0U2ltZH1cXG5gO1xuICAgIGlmICh0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZSA9PT0gJ0lPUycgfHwgdGhpcy5fX2RldmljZUluZm8ub3NTaW1wbGUgPT09ICdNQUMnKSB7XG4gICAgICB0aGlzLl9faXNTdXBwb3J0U2ltZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbnZJbmZvICs9IGBpc1N1cHBvcnRTaW1kKGZpbmFsKSA6ICR7dGhpcy5fX2lzU3VwcG9ydFNpbWR9XFxuYDtcbiAgICBlbnZJbmZvICs9IGBVc2VyQWdlbnQgOiAke25hdmlnYXRvci51c2VyQWdlbnR9XFxuYDtcbiAgICB2b2lkIDA7XG4gICAgdGhpcy5fX2RlYnVnKGVudkluZm8pO1xuICAgIHdpbmRvdy51c2ViT0NSRW52SW5mbyA9IGVudkluZm87XG4gICAgbGV0IHNka1N1cHBvcnRFbnYgPSAncXVyYW0nO1xuICAgIGlmICh0aGlzLl9faXNTdXBwb3J0U2ltZCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgc2RrU3VwcG9ydEVudiArPSAnX3NpbWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICAgIHZvaWQgMDtcbiAgICB3aW5kb3cudXNlYk9DUkVudkluZm8gPSBlbnZJbmZvO1xuICAgIHZvaWQgMDtcbiAgICBsZXQgcG9zdGZpeCA9ICcnO1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy5mb3JjZV93YXNtX3JlbG9hZCkge1xuICAgICAgLy8g7Ji17IWY7J20IO2ZnOyEse2ZlCDrkJjrqbQg7IOI66Gc7Jq0IFdBU00g66as7IaM7Iqk66W8IOyalOyyre2VqC5cbiAgICAgIHBvc3RmaXggPSAnP3Zlcj0nICsgdGhpcy5fX29wdGlvbnMuZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZztcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy5qcycgKyBwb3N0Zml4LCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpO1xuICAgIGxldCBzcmMgPSBhd2FpdCBmZXRjaCh1cmwuaHJlZikudGhlbihyZXMgPT4gcmVzLnRleHQoKSkudGhlbih0ZXh0ID0+IHtcbiAgICAgIGxldCByZWdleCA9IC8oLiopID0gTW9kdWxlLmN3cmFwL2dtO1xuICAgICAgbGV0IHNvdXJjZSA9IHRleHQucmVwbGFjZShyZWdleCwgJ01vZHVsZS4kMSA9IE1vZHVsZS5jd3JhcCcpO1xuXG4gICAgICAvLyBkYXRhKG1vZGVsKVxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoL15cXChmdW5jdGlvblxcKFxcKSBcXHsvbSwgJ3ZhciBjcmVhdGVNb2RlbERhdGEgPSBhc3luYyBmdW5jdGlvbigpIHtcXG4nICsgJyByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xcbicpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJyAgIGNvbnNvbGUuZXJyb3IoXCJwYWNrYWdlIGVycm9yOlwiLCBlcnJvcik7JywgJyAgIHJlamVjdCgpO1xcbicgKyAnICAgY29uc29sZS5lcnJvcihcInBhY2thZ2UgZXJyb3I6XCIsIGVycm9yKTsnKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCcgIH0sIGhhbmRsZUVycm9yKScsICcgIHJlc29sdmUoKTtcXG4nICsgJyAgfSwgaGFuZGxlRXJyb3IpJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgvXlxcfVxcKVxcKFxcKTsvbSwgJ1xcbiB9KVxcbicgKyAnfTsnKTtcblxuICAgICAgLy8gd2FzbVxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2Uoc2RrU3VwcG9ydEVudiArICcud2FzbScsIG5ldyBVUkwoc2RrU3VwcG9ydEVudiArICcud2FzbScgKyBwb3N0Zml4LCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpLmhyZWYpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UobmV3IFJlZ0V4cChgUkVNT1RFX1BBQ0tBR0VfQkFTRSA9IFsnXCJdJHtzZGtTdXBwb3J0RW52fVxcXFwuZGF0YVtcIiddYCwgJ2dtJyksIGBSRU1PVEVfUEFDS0FHRV9CQVNFID0gXCIke25ldyBVUkwoc2RrU3VwcG9ydEVudiArICcuZGF0YScgKyBwb3N0Zml4LCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpLmhyZWZ9XCJgKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCdmdW5jdGlvbiBjcmVhdGVXYXNtJywgJ2FzeW5jIGZ1bmN0aW9uIGNyZWF0ZVdhc20nKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCdpbnN0YW50aWF0ZUFzeW5jKCk7JywgJ2F3YWl0IGluc3RhbnRpYXRlQXN5bmMoKTsnKTtcblxuICAgICAgLy8gd2FzbSBhbmQgZGF0YShtb2RlbCkgZmlsZSDrs5HroKzroZwgZmV0Y2gg7ZWY6riwIOychO2VtFxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ3ZhciBhc20gPSBjcmVhdGVXYXNtKCk7JywgJ2NvbnNvbGUubG9nKFwiY3JlYXRlIHdhc20gYW5kIGRhdGEgLSBzdGFydFwiKVxcbicgKyAnYXdhaXQgKGFzeW5jIGZ1bmN0aW9uKCkge1xcbicgKyAnICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xcbicgKyAnICAgIHZhciBpc0NyZWF0ZWRXYXNtID0gZmFsc2U7XFxuJyArICcgICAgdmFyIGlzQ3JlYXRlZERhdGEgPSBmYWxzZTtcXG4nICsgJyAgICBjcmVhdGVXYXNtKCkudGhlbigoKSA9PiB7XFxuJyArICcgICAgICBpc0NyZWF0ZWRXYXNtID0gdHJ1ZTtcXG4nICsgJyAgICAgIGlmIChpc0NyZWF0ZWREYXRhKSB7IHJlc29sdmUoKTsgfVxcbicgKyAnICAgIH0pO1xcbicgKyAnICAgIGNyZWF0ZU1vZGVsRGF0YSgpLnRoZW4oKCkgPT4ge1xcbicgKyAnICAgICAgaXNDcmVhdGVkRGF0YSA9IHRydWU7XFxuJyArICcgICAgICBpZiAoaXNDcmVhdGVkV2FzbSkgeyByZXNvbHZlKCk7IH1cXG4nICsgJyAgICB9KVxcbicgKyAnICB9KTtcXG4nICsgJ30pKCk7XFxuJyArICdjb25zb2xlLmxvZyhcImNyZWF0ZSB3YXNtIGFuZCBkYXRhIC0gZW5kXCIpJyk7XG4gICAgICByZXR1cm4gc291cmNlO1xuICAgIH0pO1xuICAgIHNyYyA9IGBcbiAgICAoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAke3NyY31cbiAgICAgIE1vZHVsZS5sZW5ndGhCeXRlc1VURjggPSBsZW5ndGhCeXRlc1VURjhcbiAgICAgIE1vZHVsZS5zdHJpbmdUb1VURjggPSBzdHJpbmdUb1VURjhcbiAgICAgIHJldHVybiBNb2R1bGVcbiAgICB9KSgpXG4gICAgICAgIGA7XG4gICAgdGhpcy5fX09DUkVuZ2luZSA9IGF3YWl0IGV2YWwoc3JjKTtcbiAgICB0aGlzLl9fT0NSRW5naW5lLm9uUnVudGltZUluaXRpYWxpemVkID0gYXN5bmMgXyA9PiB7XG4gICAgICB2b2lkIDA7XG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLl9fT0NSRW5naW5lLm9uUnVudGltZUluaXRpYWxpemVkKCk7XG4gICAgdGhpcy5fX3Jlc291cmNlc0xvYWRlZCA9IHRydWU7XG4gICAgdm9pZCAwO1xuICB9XG4gIF9fc3RhcnRTY2FuV2FzbUltcGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX19kZXRlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgLy8gdGhpcy5fX3NldFBpaUVuY3J5cHRNb2RlKHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKTsgLy8gb2NyIHJlc3VsdCBlbmNyeXB0XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgdGhpcy5fX2FkZHJlc3MgPSAwO1xuICAgICAgdGhpcy5fX3BhZ2VFbmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50ID0gMDtcbiAgICAgIHRoaXMuX19zc2FSZXRyeUNvdW50ID0gMDtcbiAgICAgIGNvbnN0IHNjYW4gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICBpc0RldGVjdGVkQ2FyZCA9IG51bGwsXG4gICAgICAgICAgICBpbWdEYXRhID0gbnVsbCxcbiAgICAgICAgICAgIGltZ0RhdGFVcmwgPSBudWxsLFxuICAgICAgICAgICAgbWFza0ltYWdlID0gbnVsbCxcbiAgICAgICAgICAgIGZhY2VJbWFnZSA9IG51bGwsXG4gICAgICAgICAgICBzc2FSZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgc3NhUmVzdWx0TGlzdCA9IFtdLFxuICAgICAgICAgICAgbWFza0luZm8gPSBudWxsO1xuXG4gICAgICAgICAgLy8gYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKElOX1BST0dSRVNTLlJFQURZKTtcbiAgICAgICAgICBpZiAoIXRoaXMuX19PQ1JFbmdpbmVbJ2FzbSddKSByZXR1cm47XG5cbiAgICAgICAgICAvLyBUT0RPIDog7ISk7KCV7ZWg7IiYIOyeiOqyjCDrs4Dqsr0gIGRlZmF1bHQg6rCS64+EIOygnOqztVxuICAgICAgICAgIGNvbnN0IFtyZXNvbHV0aW9uX3csIHJlc29sdXRpb25faF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHZpZGVvXG4gICAgICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICAgICAgaWYgKHJlc29sdXRpb25fdyA9PT0gMCB8fCByZXNvbHV0aW9uX2ggPT09IDApIHJldHVybjtcbiAgICAgICAgICBpZiAodGhpcy5fX2RldGVjdGVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMTAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FkZHJlc3MgYmVmb3JlIC0tLS0tLS0tLScsIGFkZHJlc3MpO1xuICAgICAgICAgIGlmICh0aGlzLl9fYWRkcmVzcyA9PT0gMCAmJiAhdGhpcy5fX3BhZ2VFbmQgJiYgKGF3YWl0IHRoaXMuX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUodmlkZW8pKSkge1xuICAgICAgICAgICAgW3RoaXMuX19hZGRyZXNzLCB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFja10gPSB0aGlzLl9fZ2V0U2Nhbm5lckFkZHJlc3ModGhpcy5fX29jclR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuX19hZGRyZXNzIHx8IHRoaXMuX19wYWdlRW5kKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMTAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FkZHJlc3MgYWZ0ZXIgLS0tLS0tLS0tJywgYWRkcmVzcyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5fX29jclN0YXR1cyA8IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUykge1xuICAgICAgICAgICAgLy8gT0NSIOyZhOujjCDsnbTsoIQg7IOB7YOcXG5cbiAgICAgICAgICAgIC8vIGNhcmQgbm90IGRldGVjdGVkXG4gICAgICAgICAgICBbaXNEZXRlY3RlZENhcmQsIGltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKHRoaXMuX19hZGRyZXNzLCAwKTtcbiAgICAgICAgICAgIGlmICghaXNEZXRlY3RlZENhcmQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19pblByb2dyZXNzU3RlcCAhPT0gdGhpcy5JTl9QUk9HUkVTUy5SRUFEWSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLkNBUkRfREVURUNUX0ZBSUxFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTsgLy8g7ZWE7JqU7ZWc6rCAP1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYXJkIGlzIGRldGVjdGVkXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5DQVJEX0RFVEVDVF9TVUNDRVNTKTtcblxuICAgICAgICAgICAgLy8gc3NhIHJldHJ5IOyEpOygleydtCDrkJjslrQg7J6I7Jy86rGw64KYLCDsiJjrj5nstKzsmIFVSeulvCDsgqzsmqntlZjripQg6rK97JqwLCBjYXJkIGRldGVjdCDshLHqs7Xsi5wg7J2066+47KeAIOyggOyepVxuICAgICAgICAgICAgdGhpcy5fX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZShpbWdEYXRhLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUodHJ1ZSk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFtvY3JSZXN1bHQsIGltZ0RhdGFVcmwsIG1hc2tJbWFnZSwgZmFjZUltYWdlXSA9IGF3YWl0IHRoaXMuX19zdGFydFJlY29nbml0aW9uKHRoaXMuX19hZGRyZXNzLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCksIGltZ0RhdGEsIGltZ0RhdGFVcmwpO1xuXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgLy8gICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgICAgIC8vICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7ICAgICAgICAvLyDtlYTsmpTtlZzqsIA/XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX19vY3JTdGF0dXMgPj0gdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTKSB7XG4gICAgICAgICAgICAvLyBvY3Ig7JmE66OMIOydtO2bhCDsg4Htg5xcblxuICAgICAgICAgICAgLy8gZmFpbHVyZSBjYXNlXG4gICAgICAgICAgICBpZiAob2NyUmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9DUiBTdGF0dXMgaXMgJHt0aGlzLl9fb2NyU3RhdHVzfSwgYnV0IG9jclJlc3VsdCBpcyBmYWxzZWApOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc3VjY2VzcyBjYXNlXG4gICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTsgLy8gT0NSIOyZhOujjCDsi5zsoJDsl5AgY2FtZXJhIHByZXZpZXcgb2ZmXG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9fc3NhTW9kZSkge1xuICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgIC8vIOy1nOy0iCDsi5zrj4RcbiAgICAgICAgICAgICAgc3NhUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGgodGhpcy5fX29jclR5cGUsIHRoaXMuX19hZGRyZXNzKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignW0VSUl0gU1NBIE1PREUgaXMgdHJ1ZS4gYnV0LCBzc2FSZXN1bHQgaXMgbnVsbCcpOyAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICAgICAgICBzc2FSZXN1bHRMaXN0LnB1c2goc3NhUmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJldHJ5U3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBGQUtFID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnRkFLRSc7XG4gICAgICAgICAgICAgICAgY29uc3QgUkVBTCA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ1JFQUwnO1xuICAgICAgICAgICAgICAgIGNvbnN0IEVOU0VNQkxFID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnRU5TRU1CTEUnO1xuICAgICAgICAgICAgICAgIGxldCBpc0NvbXBsZXRlZCA9IGZhbHNlOyAvLyDruYTrj5nquLAgZm9yIOusuCDrlYzrrLjsl5AgYnJlYWvqsIAg7JWI6rG466as64qUIOydtOyKiOuhnCDrhKPsnYxcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19zc2FSZXRyeUNvdW50ID09PSB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zdCBleGVjdXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3NhUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBzc2FSZXN1bHQgPSBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aFJldHJ5KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fYWRkcmVzcywgaXRlbSk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ1tFUlJdIFNTQSBNT0RFIGlzIHRydWUuIGJ1dCwgc3NhUmVzdWx0IGlzIG51bGwnKTsgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgICAgICAgICAgICAgc3NhUmVzdWx0TGlzdC5wdXNoKHNzYVJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaWYgKEZBS0UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdC5pbmRleE9mKCdSRUFMJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChSRUFMKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQuaW5kZXhPZignRkFLRScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoRU5TRU1CTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXRyeVdvcmtpbmdUaW1lID0gbmV3IERhdGUoKSAtIHJldHJ5U3RhcnREYXRlO1xuICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0luZm8pIHtcbiAgICAgICAgICAgICAgbWFza0luZm8gPSB0aGlzLl9fZ2V0TWFza0luZm8odGhpcy5fX2FkZHJlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICBsZWdhY3lGb3JtYXQsXG4gICAgICAgICAgICAgIG5ld0Zvcm1hdFxuICAgICAgICAgICAgfSA9IHVzZWJPQ1JXQVNNUGFyc2VyLnBhcnNlT2NyUmVzdWx0KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgb2NyUmVzdWx0LCBzc2FSZXN1bHQsIHRoaXMuX19zc2FSZXRyeUNvdW50LCBzc2FSZXN1bHRMaXN0LCB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUsIHRoaXMuX19vcHRpb25zLnNzYVJldHJ5UGl2b3RcbiAgICAgICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgICAgICAvLyB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZVxuICAgICAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgcmV2aWV3X3Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgb2NyX3R5cGU6IHRoaXMuX19vY3JUeXBlLFxuICAgICAgICAgICAgICBvY3JfcmVzdWx0OiBuZXdGb3JtYXQsXG4gICAgICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IGltZ0RhdGFVcmwsXG4gICAgICAgICAgICAgIG9jcl9tYXNraW5nX2ltYWdlOiBtYXNrSW1hZ2UsXG4gICAgICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiBmYWNlSW1hZ2UsXG4gICAgICAgICAgICAgIG1hc2tJbmZvOiBtYXNrSW5mbyxcbiAgICAgICAgICAgICAgc3NhX21vZGU6IHRoaXMuX19zc2FNb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIG1hc2tJbWFnZSwgZmFjZUltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCA9IHRoaXMuX19vcHRpb25zLm9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0LmluY2x1ZGVzKCdhbGwnKSA/IHRoaXMuZXhjbHVkZU9jclJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIFsuLi50aGlzLl9fb2NyUmVzdWx0S2V5U2V0XSkgOiB0aGlzLmV4Y2x1ZGVPY3JSZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LCB0aGlzLl9fb3B0aW9ucy5vY3JSZXN1bHRFeGNsdWRlS2V5bGlzdCk7XG4gICAgICAgICAgICByZXZpZXdfcmVzdWx0ID0gdGhpcy5fX29wdGlvbnMub2NySW1hZ2VFeGNsdWRlS2V5bGlzdC5pbmNsdWRlcygnYWxsJykgPyB0aGlzLmV4Y2x1ZGVPY3JJbWFnZShyZXZpZXdfcmVzdWx0LCBbLi4udGhpcy5fX29jckltYWdlS2V5U2V0XSkgOiB0aGlzLmV4Y2x1ZGVPY3JJbWFnZShyZXZpZXdfcmVzdWx0LCB0aGlzLl9fb3B0aW9ucy5vY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VMZWdhY3lGb3JtYXQpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfZGF0YSA9IGxlZ2FjeUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19vblN1Y2Nlc3NQcm9jZXNzKHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnQ2FyZCBkZXRlY3Rpb24gZXJyb3InO1xuICAgICAgICAgIGlmIChlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSAnOiAnICsgZS5tZXNzYWdlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBpZiAoZS50b1N0cmluZygpLmluY2x1ZGVzKCdtZW1vcnknKSkge1xuICAgICAgICAgIC8vICAgYXdhaXQgdGhpcy5fX3JlY292ZXJ5U2NhbigpO1xuICAgICAgICAgIC8vICAgdGhpcy5fX3JlY292ZXJlZCA9IHRydWU7XG4gICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnV0EwMDEnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmICh0aGlzLl9fcmVjb3ZlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9fcmVjb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGhpcy5fX2RldGVjdGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNjYW4sIDEpOyAvLyDsnqzqt4BcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHNldFRpbWVvdXQoc2NhbiwgMSk7IC8vIFVJIOuenOuNlOungSBibG9ja2luZyDrsKnsp4AgKHNldFRpbWVvdXQpXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBfX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIG1hc2tJbWFnZSwgZmFjZUltYWdlLCBjb25zdGFudE51bWJlcikge1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlKSB7XG4gICAgICBjb25zdCByZXNpemVSYXRpbyA9IHRoaXMuX19jcm9wSW1hZ2VTaXplSGVpZ2h0IC8gdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aDtcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBtYXhXaWR0aDogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoLFxuICAgICAgICBtYXhIZWlnaHQ6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCAqIHJlc2l6ZVJhdGlvLFxuICAgICAgICBjb252ZXJ0U2l6ZTogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSxcbiAgICAgICAgdGFyZ2V0Q29tcHJlc3NWb2x1bWU6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUgLy8gY3VzdG9tIG9wdGlvblxuICAgICAgfTtcblxuICAgICAgaWYgKCF0aGlzLl9fb3B0aW9ucy5vY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0LmluY2x1ZGVzKCdvY3Jfb3JpZ2luX2ltYWdlJykpIHtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UoaW1nRGF0YVVybCwgZGVmYXVsdE9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fX29wdGlvbnMub2NySW1hZ2VFeGNsdWRlS2V5bGlzdC5pbmNsdWRlcygnb2NyX21hc2tpbmdfaW1hZ2UnKSkge1xuICAgICAgICAvLyBtYXNraW5nIOydtOuvuOyngOuKlCByZXNpemUg7ZWY66m0LCBtYXNrIOyijO2RnOqwgCDslrTquIvrgpjrr4DroZwg66as7IKs7J207KaIIOyViO2VmOqzoCDslZXstpXrp4wg7KeE7ZaJXG4gICAgICAgIGNvbnN0IG1hc2tpbmdJbWFnZU9wdGlvbnMgPSB7XG4gICAgICAgICAgcXVhbGl0eTogZGVmYXVsdE9wdGlvbnMucXVhbGl0eSxcbiAgICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogZGVmYXVsdE9wdGlvbnMudGFyZ2V0Q29tcHJlc3NWb2x1bWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfbWFza2luZ19pbWFnZSA9IGF3YWl0IHRoaXMuX19jb21wcmVzZUJhc2U2NEltYWdlKG1hc2tJbWFnZSwgbWFza2luZ0ltYWdlT3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9fb3B0aW9ucy5vY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0LmluY2x1ZGVzKCdvY3JfZmFjZV9pbWFnZScpKSB7XG4gICAgICAgIHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShmYWNlSW1hZ2UsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9fcmVxdWVzdEdldEFQSVRva2VuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uY3JlZGVudGlhbDtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLl9fb3B0aW9ucy5hdXRoU2VydmVySW5mby5iYXNlVXJsO1xuICAgICAgZmV0Y2goYCR7YmFzZVVybH0vc2lnbi1pbmAsIHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbCksXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgICAgIC8vIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgLy8gY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBmZXRjaChgJHtiYXNlVXJsfS91c2ViL3Rva2VuYCwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtyZXN1bHQudG9rZW59YFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShqc29uLnRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9fcmVxdWVzdFNlcnZlck9DUihvY3JUeXBlLCBzc2FNb2RlLCBpbWdEYXRhVXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMub2NyU2VydmVyQmFzZVVybDtcbiAgICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9pZGNhcmQtZHJpdmVyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvcGFzc3BvcnQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuLWJhY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NyZWRpdCBjYXJkIGlzIG5vdCBVbnN1cHBvcnRlZCBTZXJ2ZXIgT0NSJyk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT0NSIHR5cGU6ICR7b2NyVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcGlUb2tlbiA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0R2V0QVBJVG9rZW4oKTtcbiAgICAgICAgY29uc3QgbXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgbXlIZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthcGlUb2tlbn1gKTtcbiAgICAgICAgY29uc3QgcGFyYW0gPSB7XG4gICAgICAgICAgaW1hZ2VfYmFzZTY0OiBpbWdEYXRhVXJsLFxuICAgICAgICAgIG1hc2tfbW9kZTogJ3RydWUnLFxuICAgICAgICAgIGZhY2VfbW9kZTogJ3RydWUnXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9fc3NhTW9kZSkge1xuICAgICAgICAgIHBhcmFtLnNzYV9tb2RlID0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhdyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczogbXlIZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IHJhdyxcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdydcbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2goYmFzZVVybCwgcmVxdWVzdE9wdGlvbnMpLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fc3RhcnRTY2FuU2VydmVySW1wbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgLy8gdGhpcy5fX3NldFBpaUVuY3J5cHRNb2RlKHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKTsgLy8gb2NyIHJlc3VsdCBlbmNyeXB0XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICBzc2FSZXN1bHRMaXN0ID0gW107XG4gICAgICAgIGNvbnN0IF9fb25DbGlja0NhcHR1cmVCdXR0b24gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgLy8g7LqU67KE7Iqk7JeQ7IScIOydtOuvuOyngOulvCDqsIDsoLjsmLRcbiAgICAgICAgICBjb25zdCBbLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19jcm9wSW1hZ2VGcm9tVmlkZW8oKTtcbiAgICAgICAgICBpZiAoMSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDsi6TtjKggKOuwnOyDnSDqsIDriqXshLEg7JeG7J2MKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXJ2ZXIgb2NyIOyEseqztVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUywgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgb2NyUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3JlcXVlc3RTZXJ2ZXJPQ1IodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBpbWdEYXRhVXJsKTtcblxuICAgICAgICAgICAgICAvLyBmYWlsdXJlIGNhc2VcbiAgICAgICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfRkFJTEVEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlciBPQ1IgaXMgZmFpbGVkYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNzYSDsi5zrj4Q/XG5cbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FzZVxuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICB2aWRlb1xuICAgICAgICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTsgLy8gT0NSIOyZhOujjCDsi5zsoJDsl5AgY2FtZXJhIHByZXZpZXcgb2ZmXG5cbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgICAgICAgICBuZXdGb3JtYXQsXG4gICAgICAgICAgICAgIGJhc2U2NEltYWdlUmVzdWx0LFxuICAgICAgICAgICAgICBtYXNrSW5mb1xuICAgICAgICAgICAgfSA9IHVzZWJPQ1JBUElQYXJzZXIucGFyc2VPY3JSZXN1bHQodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBvY3JSZXN1bHQpO1xuICAgICAgICAgICAgbGV0IHJldmlld19yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgICAgICAgb2NyX3Jlc3VsdDogbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiBpbWdEYXRhVXJsLFxuICAgICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9tYXNraW5nX2ltYWdlLFxuICAgICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLFxuICAgICAgICAgICAgICBtYXNrSW5mbyxcbiAgICAgICAgICAgICAgc3NhX21vZGU6IHRoaXMuX19zc2FNb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfYXBpX3Jlc3BvbnNlID0gb2NyUmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSwgYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLCAwLjApO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9jclJlc3VsdC5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdENvZGUgPSAnU0YwMDEnO1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHRNZXNzYWdlID0gYCR7b2NyUmVzdWx0LnNjYW5uZXJfdHlwZX06JHtvY3JSZXN1bHQ/LnJlc3VsdF9jb2RlfWA7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdERldGFpbCA9IEpTT04uc3RyaW5naWZ5KG9jclJlc3VsdCk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIHJlc3VsdERldGFpbCwgcmVzdWx0TWVzc2FnZSk7IC8vIFFVUkFNIFNlcnZlciBPQ1Ig7JeQ65+sXG5cbiAgICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fX2NhcHR1cmVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnU2VydmVyIE9DUiBFcnJvcic7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UpIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJzogJyArIGUubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICB2b2lkIDA7XG4gICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdTRTAwMScsIGUsIGVycm9yTWVzc2FnZSk7IC8vIFFVUkFNIFNlcnZlciBPQ1Ig7JeQ65+sXG4gICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZShpbWdEYXRhLCBpbWdEYXRhVVJMKSB7XG4gICAgLy8gc3NhIHJldHJ5IOyEpOygleydtCDrkJjslrQg7J6I7Jy86rGw64KYLCDsiJjrj5nstKzsmIFVSeulvCDsgqzsmqntlZjripQg6rK97JqwLCBjYXJkIGRldGVjdCDshLHqs7Xsi5wg7J2066+47KeAIOyggOyepVxuICAgIGlmICh0aGlzLl9fc3NhTW9kZSAmJiB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID4gMCB8fCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkgJiYgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQgPiAwKSB7XG4gICAgICBsZXQgbGltaXRTYXZlSW1hZ2VDb3VudCA9IE1hdGgubWF4KHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQsIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50KTtcbiAgICAgIGlmICh0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUubGVuZ3RoID09PSBsaW1pdFNhdmVJbWFnZUNvdW50KSB7XG4gICAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUucHVzaChpbWdEYXRhKTtcbiAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB7XG4gICAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5wdXNoKGltZ0RhdGFVUkwpO1xuICAgICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgICB9XG5cbiAgICAgIHZvaWQgMDsgLy8gc2hvdWxkIGJlIHJlbW92ZWRcbiAgICB9XG4gIH1cblxuICBhc3luYyBfX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCkge1xuICAgIC8vIOyduOyLnSDshLHqs7Ug7Iqk7LqUIOujqO2UhCDsooXro4xcbiAgICBpZiAocmV2aWV3X3Jlc3VsdC5zc2FfbW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0EpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTUyk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogJ04xMDAnLFxuICAgICAgICByZXN1bHRfbWVzc2FnZTogJ09LLidcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6ICdzdWNjZXNzJyxcbiAgICAgIHJldmlld19yZXN1bHQ6IHJldmlld19yZXN1bHRcbiAgICB9O1xuICAgIGlmICh0aGlzLl9fb25TdWNjZXNzKSB7XG4gICAgICB0aGlzLl9fb25TdWNjZXNzKHJlc3VsdCk7XG4gICAgICB0aGlzLl9fb25TdWNjZXNzID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX29uRmFpbHVyZVByb2Nlc3MocmVzdWx0Q29kZSwgZSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgbGV0IGVycm9yRGV0YWlsID0gJyc7XG4gICAgaWYgKGU/LnRvU3RyaW5nKCkpIGVycm9yRGV0YWlsICs9IGUudG9TdHJpbmcoKTtcbiAgICBpZiAoZT8uc3RhY2spIGVycm9yRGV0YWlsICs9IGUuc3RhY2s7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgYXBpX3Jlc3BvbnNlOiB7XG4gICAgICAgIHJlc3VsdF9jb2RlOiByZXN1bHRDb2RlLFxuICAgICAgICByZXN1bHRfbWVzc2FnZTogZXJyb3JNZXNzYWdlXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnZmFpbGVkJyxcbiAgICAgIHJldmlld19yZXN1bHQ6IHtcbiAgICAgICAgb2NyX3R5cGU6IHRoaXMuX19vY3JUeXBlLFxuICAgICAgICBlcnJvcl9kZXRhaWw6IGVycm9yRGV0YWlsXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uRmFpbHVyZSkge1xuICAgICAgdGhpcy5fX29uRmFpbHVyZShyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19wcmVsb2FkaW5nV2FzbSgpIHtcbiAgICBjb25zdCBwcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5nZXRQcmVsb2FkaW5nU3RhdHVzKCk7XG4gICAgaWYgKCF0aGlzLmlzUHJlbG9hZGVkKCkgJiYgcHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgYXdhaXQgdGhpcy5wcmVsb2FkaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLlNUQVJURUQpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fd2FpdFByZWxvYWRlZCgpO1xuICAgICAgfSBlbHNlIGlmIChwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLkRPTkUpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhYm5vcm1hbGx5IHByZWxvYWRpbmcgc3RhdHVzLCBwcmVsb2FkZWQ6ICR7dGhpcy5pc1ByZWxvYWRlZCgpfSAvIHByZWxvYWRpbmdTdGF0dXM6ICR7dGhpcy5nZXRQcmVsb2FkaW5nU3RhdHVzKCl9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgLy8gX19zZXRQaWlFbmNyeXB0TW9kZShwaWlFbmNyeXB0TW9kZSkge1xuICAvLyAgIHRoaXMuX19PQ1JFbmdpbmUuc2V0UGlpRW5jcnlwdChwaWlFbmNyeXB0TW9kZSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19lbmNyeXB0RGV0ZWN0ZWRCYXNlNjQoYWRkcmVzcywgbWFzaywgb2NyX21vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgLy8gICBpZiAoaW1nVHlwZSA9PT0gJ2ZhY2UnKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5lbmNyeXB0QmFzZTY0anBnRGV0ZWN0ZWRQaG90b0Jhc2U2NChhZGRyZXNzKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkRnJhbWVCYXNlNjQoXG4gIC8vICAgICBhZGRyZXNzLFxuICAvLyAgICAgbWFzayxcbiAgLy8gICAgIG9jcl9tb2RlXG4gIC8vICAgKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZFNpemUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jcnlwdGVkSnBnU2l6ZSgpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0RW5jcnlwdGVkQnVmZmVyKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ0J1ZmZlcigpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KGFkZHJlc3MsIG1hc2ssIGltZ01vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgLy8gICBjb25zdCBlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPSB0aGlzLl9fZW5jcnlwdERldGVjdGVkQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBpbWdNb2RlLFxuICAvLyAgICAgaW1nVHlwZVxuICAvLyAgICk7XG4gIC8vICAgaWYgKGVuY3J5cHREZXRlY3RlZEJhc2U2NCA9PT0gMSkge1xuICAvLyAgICAgY29uc3QganBnU2l6ZSA9IHRoaXMuX19nZXRFbmNyeXB0ZWRTaXplKCk7XG4gIC8vICAgICBjb25zdCBqcGdQb2ludGVyID0gdGhpcy5fX2dldEVuY3J5cHRlZEJ1ZmZlcigpO1xuICAvL1xuICAvLyAgICAgY29uc3QgZW5jcnlwdGVkID0gbmV3IFVpbnQ4QXJyYXkoXG4gIC8vICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguYnVmZmVyLFxuICAvLyAgICAgICBqcGdQb2ludGVyLFxuICAvLyAgICAgICBqcGdTaXplXG4gIC8vICAgICApO1xuICAvLyAgICAgY29uc3QgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG4gIC8vICAgICBjb25zdCBkZWNvZGVkU3RyaW5nID0gdGV4dERlY29kZXIuZGVjb2RlKGVuY3J5cHRlZCk7XG4gIC8vXG4gIC8vICAgICByZXR1cm4gZGVjb2RlZFN0cmluZztcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuICcnO1xuICAvLyB9XG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gIGFzeW5jIF9fc3RhcnRTY2FuV2FzbSgpIHtcbiAgICB0aGlzLl9fZGVidWcoJ3dhc21fbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5XYXNtSW1wbCgpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBhc3luYyBfX3N0YXJ0U2NhblNlcnZlcigpIHtcbiAgICB0aGlzLl9fZGVidWcoJ3NlcnZlcl9tb2RlJyk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJID0gdHJ1ZTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuU2VydmVySW1wbCgpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBhc3luYyBfX3JlY292ZXJ5U2NhbigpIHtcbiAgICB2b2lkIDA7XG4gICAgdGhpcy5fX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICB9XG4gIHN0b3BTY2FuKCkge1xuICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7IC8vIHN3aXRjaCB0byBzZXJ2ZXLsnbzrlYwg6riw7KG0IFdBU00gbG9vcCDqsJXsoJzsooXro4xcbiAgICBjb25zdCB7XG4gICAgICBjYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoY2FudmFzKSB7XG4gICAgICBjb25zdCBjYW52YXNDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgICB3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWVcbiAgICAgIH0pO1xuICAgICAgY2FudmFzQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cbiAgc3RvcFN0cmVhbSgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQpO1xuICAgIGlmICh0aGlzLl9fc3RyZWFtKSB7XG4gICAgICB0aGlzLl9fc3RyZWFtLnN0b3AgJiYgdGhpcy5fX3N0cmVhbS5zdG9wKCk7XG4gICAgICBsZXQgdHJhY2tzID0gdGhpcy5fX3N0cmVhbS5nZXRUcmFja3MgJiYgdGhpcy5fX3N0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmICh0cmFja3MgJiYgdHJhY2tzLmxlbmd0aCkge1xuICAgICAgICB0cmFja3MuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3N0cmVhbSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIOuplOuqqOumrCBhbGxvY2F0aW9uIGZyZWUg7ZWo7IiYICovXG4gIGNsZWFudXAoKSB7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcygpO1xuICAgIHRoaXMuX19kZXN0cm95QnVmZmVyKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lQcmV2SW1hZ2UoKTtcbiAgICB0aGlzLl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAoKTtcbiAgfVxuICByZXN0b3JlSW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9fcHJlbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgfVxuICBfX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpIHtcbiAgICBpZiAodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcik7XG4gICAgICB0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgfVxuICB9XG59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
