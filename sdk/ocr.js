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
      useImageWarping: false,
      // 신분증 이미지를 Warping(왜곡 보정 할지 여부)
      useCompressImage: false,
      // 신분증 이미지를 압축할지 여부
      useCompressImageMaxWidth: 1080,
      // 이미지 리사이징 가로 해상도
      useCompressImageMaxVolume: 1024 * 50,
      // 이미지 압축 목표 용량

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
    return this.__options.useEncryptMode || this.__options.useEncryptAllMode;
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
        var excludeList = ['complete', 'result_scan_type', 'color_point', 'found_face', 'specular_ratio', 'start_time', 'end_time', 'fd_confidence', 'id_truth', 'id_truth_retry_count'];
        // prettier-ignore
        review_result.encrypted = {
          ocr_result: _.toPairs(_.omit(review_result.ocr_result, excludeList)).reduce((acc, _ref2) => {
            var [key, value] = _ref2;
            acc[key] = this.__encryptScanResult(value);
            return acc;
          }, {}),
          ocr_origin_image: this.__encryptScanResult(review_result.ocr_origin_image),
          ocr_masking_image: this.__encryptScanResult(review_result.ocr_masking_image),
          ocr_face_image: this.__encryptScanResult(review_result.ocr_face_image)
        };
      }
    }
  }
  getOCREngine() {
    return this.__OCREngine;
  }
  init(settings) {
    if (!!!settings.licenseKey) throw new Error('License key is empty');
    this.__license = settings.licenseKey;
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
          var ocrImageMode;
          if (isCreditCard) {
            ocrImageMode = _this12.OCR_IMG_MODE.CROPPING;
          } else if (_this12.__options.useImageWarping) {
            ocrImageMode = _this12.OCR_IMG_MODE.WARPING;
          } else {
            ocrImageMode = _this12.OCR_IMG_MODE.NONE;
          }
          var originImage = yield _this12.__getImageBase64(address, _this12.OCR_IMG_MASK_MODE.FALSE, ocrImageMode);
          var maskImage = null;
          var faceImage = null;
          if (!isCreditCard) {
            maskImage = yield _this12.__getImageBase64(address, _this12.OCR_IMG_MASK_MODE.TRUE, _this12.OCR_IMG_MODE.WARPING);
            maskImage = maskImage === 'data:' ? null : maskImage;
            faceImage = _this12.__options.useFaceImage ? yield _this12.__getImageBase64(address, null, ocrImageMode, 'face') : null;
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

        review_result.ocr_origin_image = yield _this24.__compreseBase64Image(imgDataUrl, defaultOptions, constantNumber);

        // masking 이미지는 resize 하면, mask 좌표가 어긋나므로 리사이즈 안하고 압축만 진행
        var maskingImageOptions = {
          quality: defaultOptions.quality,
          targetCompressVolume: defaultOptions.targetCompressVolume
        };
        review_result.ocr_masking_image = yield _this24.__compreseBase64Image(maskImage, maskingImageOptions, constantNumber);
        review_result.ocr_face_image = yield _this24.__compreseBase64Image(faceImage, defaultOptions, constantNumber);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNzYVJldHJ5VHlwZSIsInNzYVJldHJ5UGl2b3QiLCJzc2FNYXhSZXRyeUNvdW50IiwidXNlRGVidWdBbGVydCIsImZvcmNlX3dhc21fcmVsb2FkIiwiZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZyIsInByZWxvYWRpbmciLCJvblByZWxvYWRlZCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJpc1ByZWxvYWRlZCIsInNob3dPQ1JMb2FkaW5nVUkiLCJfX3ByZWxvYWRpbmdTdGF0dXMiLCJfX2xvYWRSZXNvdXJjZXMiLCJfX3ByZWxvYWRlZCIsImhpZGVPQ1JMb2FkaW5nVUkiLCJpc0luaXRpYWxpemVkIiwiX19pbml0aWFsaXplZCIsImdldFByZWxvYWRpbmdTdGF0dXMiLCJpc0VuY3J5cHRNb2RlIiwiX19vcHRpb25zIiwiaXNDcmVkaXRDYXJkIiwiX19vY3JUeXBlIiwicHJlbG9hZGluZ1VJV3JhcCIsImdldE9DUkVsZW1lbnRzIiwiZGlzcGxheSIsImVuY3J5cHRSZXN1bHQiLCJyZXZpZXdfcmVzdWx0IiwiX19pc1N1cHBvcnRXYXNtIiwiaW5jbHVkZUxpc3QiLCJlbmNyeXB0ZWQiLCJvY3JfcmVzdWx0IiwiXyIsInRvUGFpcnMiLCJwaWNrIiwicmVkdWNlIiwiYWNjIiwiX3JlZiIsImtleSIsInZhbHVlIiwiX19lbmNyeXB0U2NhblJlc3VsdCIsIm9jcl9vcmlnaW5faW1hZ2UiLCJfb2JqZWN0U3ByZWFkIiwiZXhjbHVkZUxpc3QiLCJvbWl0IiwiX3JlZjIiLCJvY3JfbWFza2luZ19pbWFnZSIsIm9jcl9mYWNlX2ltYWdlIiwiZ2V0T0NSRW5naW5lIiwiX19PQ1JFbmdpbmUiLCJpbml0Iiwic2V0dGluZ3MiLCJsaWNlbnNlS2V5IiwiRXJyb3IiLCJfX2xpY2Vuc2UiLCJtZXJnZWRPcHRpb25zIiwibWVyZ2UiLCJzZXRPcHRpb24iLCJfX3dpbmRvd0V2ZW50QmluZCIsIl9fZGV2aWNlSW5mbyIsImdldE9zVmVyc2lvbiIsImdldE9wdGlvbiIsImdldE9jclR5cGUiLCJ0eXBlIiwiX19vY3JUeXBlTnVtYmVyVG9TdHJpbmciLCJnZXQiLCJnZXRPY3JUeXBlTnVtYmVyIiwic3RyaW5nIiwiX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIiLCJnZXRVSU9yaWVudGF0aW9uIiwiX191aU9yaWVudGF0aW9uIiwiZ2V0VmlkZW9PcmllbnRhdGlvbiIsIl9fdmlkZW9PcmllbnRhdGlvbiIsImNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlIiwiX3RoaXMyIiwiX19pc1N3aXRjaFRvU2VydmVyTW9kZSIsImxhdGVuY3lQZXIxMDBtcyIsIm1lYXN1cmVSZXBvcnQiLCJfX2RlYnVnIiwicGFyc2VGbG9hdCIsInN0YXJ0T0NSIiwib25TdWNjZXNzIiwib25GYWlsdXJlIiwiX2FyZ3VtZW50cyIsImFyZ3VtZW50cyIsIl90aGlzMyIsIm9uSW5Qcm9ncmVzc0NoYW5nZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9fc3NhTW9kZSIsImluZGV4T2YiLCJfX29uU3VjY2VzcyIsIl9fb25GYWlsdXJlIiwiX19vbkluUHJvZ3Jlc3NDaGFuZ2UiLCJfX3RvcFVJIiwidG9wVUkiLCJfX21pZGRsZVVJIiwibWlkZGxlVUkiLCJfX2JvdHRvbVVJIiwiYm90dG9tVUkiLCJfX2NoYW5nZVN0YWdlIiwiX19wcmVwcm9jZXNzIiwiX19zZXR1cERvbUVsZW1lbnRzIiwiX19wcmVsb2FkaW5nV2FzbSIsIl9fc3RhcnRTY2FuU2VydmVyIiwiX19zdGFydFNjYW5XYXNtIiwiZSIsInN0b3BPQ1IiLCJjbGVhbnVwIiwiX19jbG9zZUNhbWVyYSIsInNldElnbm9yZUNvbXBsZXRlIiwidmFsIiwiZW5jcnlwdCIsInBsYWluU3RyIiwicmVzdGFydE9DUiIsIm9jclR5cGUiLCJfYXJndW1lbnRzMiIsIl90aGlzNCIsImlzU3dpdGNoTW9kZSIsIl9fd2FpdFByZWxvYWRlZCIsIl90aGlzNSIsIndhaXRpbmdSZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaGVjayIsInNldFRpbWVvdXQiLCJjb252ZXJ0VHlwZVRvTnVtYmVyIiwib3B0aW9uIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbnZlcnRUeXBlVG9GbG9hdCIsIl90aGlzXyIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsInNraXBUb3VjaEFjdGlvbmZvclpvb20iLCJldiIsInRvdWNoZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwib25iZWZvcmV1bmxvYWQiLCJfX3BhZ2VFbmQiLCJoYW5kbGVSZXNpemUiLCJfcmVmNCIsIl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplIiwiX190aHJvdHRsaW5nUmVzaXplVGltZXIiLCJhcHBseSIsIl9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5IiwibXNnIiwiX19zbGVlcCIsIm1zIiwiX19ibG9iVG9CYXNlNjQiLCJibG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJfX2Jhc2U2NHRvQmxvYiIsImJhc2U2NCIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiYWIiLCJBcnJheUJ1ZmZlciIsImlhIiwiVWludDhBcnJheSIsImkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsIl9fY29tcHJlc2VCYXNlNjRJbWFnZSIsIm9wdGlvbnMiLCJjb25zdGFudE51bWJlciIsIl90aGlzNiIsImJsb2JGaWxlIiwiY29tcHJlc3NlZCIsImNvbXByZXNzSW1hZ2UiLCJjb21wcmVzc2lvblJhdGlvIiwiTWF0aCIsInJvdW5kIiwic2l6ZSIsIl9fZ2V0U3RyaW5nT25XYXNtSGVhcCIsImxlbmd0aEJ5dGVzIiwibGVuZ3RoQnl0ZXNVVEY4IiwiX19zdHJpbmdPbldhc21IZWFwIiwiX21hbGxvYyIsInN0cmluZ1RvVVRGOCIsIm9jclJlc3VsdCIsInN0cmluZ09uV2FzbUhlYXAiLCJ0b1N0cmluZyIsImpzb25TdHJpbmciLCJfZnJlZSIsIl9fc2V0VmlkZW9SZXNvbHV0aW9uIiwidmlkZW9FbGVtZW50IiwiX3RoaXM3IiwiaXNTdXBwb3J0ZWRSZXNvbHV0aW9uIiwicmVzb2x1dGlvblRleHQiLCJfX2NhbVNldENvbXBsZXRlIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwic3JjT2JqZWN0IiwiX192aWRlb1dpZHRoIiwiX192aWRlb0hlaWdodCIsIl9fZ2V0U2Nhbm5lckFkZHJlc3MiLCJfX29jclR5cGVMaXN0IiwiaW5jbHVkZXMiLCJhZGRyZXNzIiwiZGVzdHJveUNhbGxiYWNrIiwiZ2V0SURDYXJkU2Nhbm5lciIsImRlc3Ryb3lJRENhcmRTY2FubmVyIiwiZ2V0UGFzc3BvcnRTY2FubmVyIiwiZGVzdHJveVBhc3Nwb3J0U2Nhbm5lciIsImdldEFsaWVuU2Nhbm5lciIsImRlc3Ryb3lBbGllblNjYW5uZXIiLCJnZXRDcmVkaXRTY2FubmVyIiwiZGVzdHJveUNyZWRpdFNjYW5uZXIiLCJfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19yZXRyeUNvdW50R2V0QWRkcmVzcyIsIl9fZ2V0QnVmZmVyIiwiX19CdWZmZXIiLCJfX3Jlc29sdXRpb25XaWR0aCIsIl9fcmVzb2x1dGlvbkhlaWdodCIsIl9fcmVzdWx0QnVmZmVyIiwiX19tYXNrSW5mb1Jlc3VsdEJ1ZiIsIl9fZ2V0SW1hZ2VCYXNlNjQiLCJtYXNrTW9kZSIsImltZ01vZGUiLCJfYXJndW1lbnRzMyIsIl90aGlzOCIsImltZ1R5cGUiLCJlbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UiLCJlbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UiLCJqcGdTaXplIiwiZ2V0RW5jb2RlZEpwZ1NpemUiLCJqcGdQb2ludGVyIiwiZ2V0RW5jb2RlZEpwZ0J1ZmZlciIsInJlc3VsdFZpZXciLCJIRUFQOCIsImJ1ZmZlciIsImRlc3Ryb3lFbmNvZGVkSnBnIiwiX19kZXN0cm95QnVmZmVyIiwiX19kZXN0cm95UmVzdWx0QnVmZmVyIiwiX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lQcmV2SW1hZ2UiLCJfX1ByZXZJbWFnZSIsIl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAiLCJfX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcyIsIl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayIsIl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlIiwiX3RoaXM5IiwiX19nZXRSb3RhdGlvbkRlZ3JlZSIsIl9fZ2V0TWlycm9yTW9kZSIsIl9fY3JvcEltYWdlRnJvbVZpZGVvIiwiX3RoaXMxMCIsImNhbGNSZXNvbHV0aW9uX3ciLCJjYWxjUmVzb2x1dGlvbl9oIiwidmlkZW8iLCJjYW52YXMiLCJyb3RhdGlvbkNhbnZhcyIsImNhbGNDYW52YXMiLCJjYWxjVmlkZW9XaWR0aCIsImNhbGNWaWRlb0hlaWdodCIsImNhbGNWaWRlb0NsaWVudFdpZHRoIiwiY2xpZW50V2lkdGgiLCJjYWxjVmlkZW9DbGllbnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoIiwiX19jcm9wSW1hZ2VTaXplV2lkdGgiLCJjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCIsIl9fY3JvcEltYWdlU2l6ZUhlaWdodCIsImNhbGNWaWRlb09yaWVudGF0aW9uIiwiaXNBbGllbkJhY2siLCJfX2lzUm90YXRlZDkwb3IyNzAiLCJjYWxjTWF4U1dpZHRoIiwiY2FsY01heFNIZWlnaHQiLCJzeCIsInN5IiwicmF0aW8iLCJzV2lkdGgiLCJtaW4iLCJzSGVpZ2h0IiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY2FsY0NvbnRleHQiLCJnZXRDb250ZXh0Iiwid2lsbFJlYWRGcmVxdWVudGx5IiwiZHJhd0ltYWdlIiwiaW1nRGF0YSIsImltZ0RhdGFVcmwiLCJnZXRJbWFnZURhdGEiLCJ0b0RhdGFVUkwiLCJfX3JvdGF0ZSIsImRlZ3JlZSIsImltZyIsIkltYWdlIiwidGVtcENhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInRlbXBDb250ZXh0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsIm5ld0ltYWdlRGF0YSIsInJlc3RvcmUiLCJfX2lzQ2FyZGJveERldGVjdGVkIiwiX2FyZ3VtZW50czQiLCJfdGhpczExIiwiYm94VHlwZSIsInJldHJ5SW1nIiwic2V0IiwiZGF0YSIsImtvciIsImFsaWVuIiwicGFzc3BvcnQiLCJkZXRlY3RfaWRjYXJkX29wdCIsImRldGVjdF9pZGNhcmQiLCJtZXNzYWdlIiwiX19zdGFydFJlY29nbml0aW9uIiwic3NhTW9kZSIsImlzU2V0SWdub3JlQ29tcGxldGUiLCJfdGhpczEyIiwicmVzdWx0QnVmZmVyIiwicmVjb2duaXRpb24iLCJfcmVmNyIsIl9vY3JSZXN1bHQiLCJfb2NyUmVzdWx0MiIsInNjYW5JRENhcmQiLCJzY2FuUGFzc3BvcnQiLCJzY2FuQWxpZW4iLCJzY2FuQWxpZW5CYWNrIiwic2NhbkNyZWRpdCIsIl9fY3N2VG9PYmplY3QiLCJjb21wbGV0ZSIsIl9fbWFudWFsT0NSUmV0cnlDb3VudCIsIl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCIsInF1ZXVlSWR4IiwiX19kZXRlY3RlZENhcmRRdWV1ZSIsIl9fYmx1ckNhcHR1cmVCdXR0b24iLCJfX3NldFN0eWxlIiwiX3giLCJvY3JJbWFnZU1vZGUiLCJPQ1JfSU1HX01PREUiLCJvcmlnaW5JbWFnZSIsIk9DUl9JTUdfTUFTS19NT0RFIiwibWFza0ltYWdlIiwiZmFjZUltYWdlIiwiX19zdGFydFRydXRoIiwicmVqZWN0Iiwic2NhblRydXRoIiwic3RyIiwicGFpcnMiLCJvYmoiLCJwYWlyIiwiX19nZXRNYXNrSW5mbyIsIm1hc2tJbmZvUmVzdWx0QnVmIiwiZ2V0TWFza1JlY3QiLCJfX3N0YXJ0VHJ1dGhSZXRyeSIsIl90aGlzMTMiLCJfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfdGhpczE0IiwiX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIiwiX3RoaXMxNSIsImlzUGFzc3BvcnQiLCJfX3NldHVwVmlkZW8iLCJfX3N0cmVhbSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBsYXkiLCJfX2FkanVzdFN0eWxlIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJuYW1lIiwiZXJyb3JNZXNzYWdlIiwiX19vbkZhaWx1cmVQcm9jZXNzIiwic3RvcFN0cmVhbSIsIl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50IiwiZWwiLCJhc3NpZ24iLCJfX2NoYW5nZU9DUlN0YXR1cyIsIl9fb2NyU3RhdHVzIiwiX2FyZ3VtZW50czUiLCJfdGhpczE2IiwiZm9yY2VVcGRhdGUiLCJyZWNvZ25pemVkSW1hZ2UiLCJfX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAiLCJfX2luUHJvZ3Jlc3NTdGVwIiwiZ3VpZGVCb3giLCJtYXNrQm94V3JhcCIsImNhcHR1cmVCdXR0b24iLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJfbWFza0JveFdyYXAkcXVlcnlTZWwiLCJxdWVyeVNlbGVjdG9yIiwiX2NhcHR1cmVCdXR0b24kcXVlcnlTIiwib2NyTW9kZSIsImNhbGwiLCJfX3VwZGF0ZVByZXZpZXdVSSIsIl9faGlkZVByZXZpZXdVSSIsInByZXZpZXdVSVdyYXAiLCJwcmV2aWV3SW1hZ2UiLCJpbWdTdHlsZSIsImNvbnRleHQiLCJfX2dldElucHV0RGV2aWNlcyIsIl90aGlzMTciLCJtZWRpYURldmljZXMiLCJkZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNhbWVyYSIsImRldmljZSIsImtpbmQiLCJJbnB1dERldmljZUluZm8iLCJnZXRDYXBhYmlsaXRpZXMiLCJfY2FwJGZhY2luZ01vZGUiLCJjYXAiLCJmYWNpbmdNb2RlIiwiX19mYWNpbmdNb2RlQ29uc3RyYWludCIsIl9kZXZpY2UkbGFiZWwiLCJpc1VsdHJhQ2FtZXJhUmVnIiwibGFiZWwiLCJwdXNoIiwiZGV2aWNlSWQiLCJSZWZlcmVuY2VFcnJvciIsIl9kZXZpY2UkbGFiZWwyIiwiaXNCYWNrQ2FtZXJhUmVnIiwiY29uY2F0IiwiY2hlY2tVSU9yaWVudGF0aW9uIiwiY3VycmVudCIsIm9jciIsImlzQ2hhbmdlZCIsIl9fcHJldlVpT3JpZW50YXRpb24iLCJfX2NsZWFyQ3VzdG9tVUkiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfdGhpczE4IiwidmlkZW9XcmFwIiwiZ3VpZGVCb3hXcmFwIiwicHJldmVudFRvRnJlZXplVmlkZW8iLCJjdXN0b21VSVdyYXAiLCJjYXB0dXJlVUlXcmFwIiwiY2FwdHVyZVVJIiwicHJldmlld1VJIiwic3dpdGNoVUlXcmFwIiwic3dpdGNoVUkiLCJwcmVsb2FkaW5nVUkiLCJyZW1vdmUiLCJvY3JTdHlsZSIsIndyYXBTdHlsZSIsIm1hcmdpbiIsIm92ZXJmbG93IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJtYXNrX2ZyYW1lIiwidmlkZW9TdHlsZSIsInJvdGF0ZUNzcyIsIm1pcnJvckNzcyIsInJvdGF0ZUFuZE1pcnJvckNzcyIsInRyYW5zZm9ybSIsImNhbnZhc1N0eWxlIiwibGVmdCIsInRvcCIsImJvcmRlciIsInJpZ2h0IiwiYm90dG9tIiwiY3VzdG9tVUlXcmFwU3R5bGUiLCJjYXB0dXJlVUlXcmFwU3R5bGUiLCJjdXJzb3IiLCJjYXB0dXJlQnV0dG9uU3JjU1ZHIiwiX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiIsInByZXZpZXdVSVdyYXBTdHlsZSIsInN3aXRjaFVJV3JhcFN0eWxlIiwic3dpdGNoSFRNTCIsInN3aXRjaENoZWNrYm94IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJfX29uQ2xpY2tTd2l0Y2hVSSIsIl9yZWYxMCIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsIl94MiIsIm9uY2UiLCJwcmVsb2FkaW5nVUlXcmFwU3R5bGUiLCJfX2luaXRTdHlsZSIsIl9fb2NyIiwiX19jYW52YXMiLCJfX3JvdGF0aW9uQ2FudmFzIiwiX192aWRlbyIsIl9fdmlkZW9XcmFwIiwiX19ndWlkZUJveCIsIl9fZ3VpZGVCb3hXcmFwIiwiX19tYXNrQm94V3JhcCIsIl9fcHJldmVudFRvRnJlZXplVmlkZW8iLCJfX2N1c3RvbVVJV3JhcCIsIl9fY2FwdHVyZVVJV3JhcCIsIl9fY2FwdHVyZVVJIiwiX19jYXB0dXJlQnV0dG9uIiwiX19wcmV2aWV3VUlXcmFwIiwiX19wcmV2aWV3VUkiLCJfX3ByZXZpZXdJbWFnZSIsIl9fc3dpdGNoVUlXcmFwIiwiX19zd2l0Y2hVSSIsIl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsIl90aGlzMTkiLCJjb25zdHJhaW50V2lkdGgiLCJjb25zdHJhaW50SGVpZ2h0IiwiaWRlYWwiLCJjb25zdHJhaW50cyIsImF1ZGlvIiwiem9vbSIsImZvY3VzTW9kZSIsIndoaXRlQmFsYW5jZU1vZGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VXNlck1lZGlhIiwic3RyZWFtIiwic3RyZWFtU2V0dGluZ3MiLCJnZXRWaWRlb1RyYWNrcyIsImdldFNldHRpbmdzIiwiYXNwZWN0UmF0aW8iLCJfdGhpczIwIiwiYmFzZVdpZHRoIiwiYmFzZUhlaWdodCIsInNjYW5uZXJGcmFtZVJhdGlvIiwiZ3VpZGVCb3hXaWR0aCIsImd1aWRlQm94SGVpZ2h0IiwiY2FsY09jckNsaWVudFdpZHRoIiwiY2FsY09jckNsaWVudEhlaWdodCIsImd1aWRlQm94UmF0aW9CeVdpZHRoIiwiX19ndWlkZUJveFJhdGlvQnlXaWR0aCIsInZpZGVvUmF0aW9CeUhlaWdodCIsIl9fdmlkZW9SYXRpb0J5SGVpZ2h0IiwicmVkdWNlZEd1aWRlQm94V2lkdGgiLCJfX2d1aWRlQm94UmVkdWNlUmF0aW8iLCJyZWR1Y2VkR3VpZGVCb3hIZWlnaHQiLCJwYWRkaW5nIiwidmlkZW9Jbm5lckdhcCIsImJhY2tncm91bmRDb2xvciIsIm1hc2tCb3hJbm5lciIsInIiLCJtYXNrQm94SW5uZXJXaWR0aCIsIm1hc2tCb3hJbm5lckhlaWdodCIsIl90aGlzMjEiLCJfX2NhbGNHdWlkZUJveENyaXRlcmlhIiwiYSIsImIiLCJuZXdWaWRlb1dpZHRoIiwibmV3VmlkZW9IZWlnaHQiLCJuZXdWaWRlb1JhdGlvQnlXaWR0aCIsIm5ld1ZpZGVvUmF0aW9CeUhlaWdodCIsImNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyIsIl9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2RlcyIsImNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0IiwiY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSIsInBhZGRpbmdUb3AiLCJiYXNlbGluZSIsInN1bSIsIml0ZW0iLCJjaGlsZE5vZGVzIiwic3RvcFNjYW4iLCJfdGhpczIyIiwiX19yZXNvdXJjZXNMb2FkZWQiLCJfX2lzU3VwcG9ydFNpbWQiLCJlbnZJbmZvIiwib3MiLCJvc1NpbXBsZSIsInVzZWJPQ1JFbnZJbmZvIiwic2RrU3VwcG9ydEVudiIsInBvc3RmaXgiLCJ1cmwiLCJmZXRjaCIsImhyZWYiLCJ0aGVuIiwicmVzIiwidGV4dCIsInJlZ2V4Iiwic291cmNlIiwicmVwbGFjZSIsIlJlZ0V4cCIsImV2YWwiLCJvblJ1bnRpbWVJbml0aWFsaXplZCIsIl9yZWYxMSIsIl94MyIsIl9fc3RhcnRTY2FuV2FzbUltcGwiLCJfdGhpczIzIiwiX19kZXRlY3RlZCIsIl9fYWRkcmVzcyIsIl9fc3NhUmV0cnlDb3VudCIsInNjYW4iLCJfcmVmMTIiLCJpc0RldGVjdGVkQ2FyZCIsInNzYVJlc3VsdCIsInNzYVJlc3VsdExpc3QiLCJtYXNrSW5mbyIsInJlc29sdXRpb25fdyIsInJlc29sdXRpb25faCIsIl9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlIiwicmV0cnlTdGFydERhdGUiLCJEYXRlIiwiRkFLRSIsIlJFQUwiLCJFTlNFTUJMRSIsImlzQ29tcGxldGVkIiwiX2xvb3AiLCJleGVjdXRlIiwiX3JlZjEzIiwiX3JldCIsInJldHJ5V29ya2luZ1RpbWUiLCJsZWdhY3lGb3JtYXQiLCJuZXdGb3JtYXQiLCJwYXJzZU9jclJlc3VsdCIsIm9jcl90eXBlIiwic3NhX21vZGUiLCJfX2NvbXByZXNzSW1hZ2VzIiwib2NyX2RhdGEiLCJfX29uU3VjY2Vzc1Byb2Nlc3MiLCJfX3JlY292ZXJlZCIsIl90aGlzMjQiLCJyZXNpemVSYXRpbyIsImRlZmF1bHRPcHRpb25zIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJjb252ZXJ0U2l6ZSIsInRhcmdldENvbXByZXNzVm9sdW1lIiwibWFza2luZ0ltYWdlT3B0aW9ucyIsInF1YWxpdHkiLCJfX3JlcXVlc3RHZXRBUElUb2tlbiIsImNyZWRlbnRpYWwiLCJhdXRoU2VydmVySW5mbyIsImJhc2VVcmwiLCJib2R5IiwibWV0aG9kIiwianNvbiIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwidG9rZW4iLCJjYXRjaCIsImVyciIsIl9fcmVxdWVzdFNlcnZlck9DUiIsIl90aGlzMjUiLCJfcmVmMTQiLCJvY3JTZXJ2ZXJCYXNlVXJsIiwiYXBpVG9rZW4iLCJteUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwicGFyYW0iLCJpbWFnZV9iYXNlNjQiLCJtYXNrX21vZGUiLCJmYWNlX21vZGUiLCJyYXciLCJyZXF1ZXN0T3B0aW9ucyIsInJlZGlyZWN0IiwiX3g0IiwiX3g1IiwiX19zdGFydFNjYW5TZXJ2ZXJJbXBsIiwiX3RoaXMyNiIsIl9yZWYxNSIsIl90aGlzMjYkX19jYXB0dXJlQnV0dCIsIl9yZWYxNiIsImJhc2U2NEltYWdlUmVzdWx0IiwiX19kZWJ1Z01vZGUiLCJvY3JfYXBpX3Jlc3BvbnNlIiwiX29jclJlc3VsdDMiLCJyZXN1bHRDb2RlIiwicmVzdWx0TWVzc2FnZSIsInNjYW5uZXJfdHlwZSIsInJlc3VsdF9jb2RlIiwicmVzdWx0RGV0YWlsIiwiX3g2IiwiX3g3IiwiaW1nRGF0YVVSTCIsImxpbWl0U2F2ZUltYWdlQ291bnQiLCJzaGlmdCIsIl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQiLCJfdGhpczI3IiwiYXBpX3Jlc3BvbnNlIiwicmVzdWx0X21lc3NhZ2UiLCJfdGhpczI4IiwiZXJyb3JEZXRhaWwiLCJzdGFjayIsImVycm9yX2RldGFpbCIsIl90aGlzMjkiLCJwcmVsb2FkaW5nU3RhdHVzIiwiX3RoaXMzMCIsIl90aGlzMzEiLCJfX3JlY292ZXJ5U2NhbiIsIl90aGlzMzIiLCJjYW52YXNDb250ZXh0IiwiY2xlYXJSZWN0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkIiwic3RvcCIsInRyYWNrcyIsImdldFRyYWNrcyIsImZvckVhY2giLCJ0cmFjayIsInJlc3RvcmVJbml0aWFsaXplIiwiY2xlYXJUaW1lb3V0Il0sInNvdXJjZXMiOlsib2NyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiBnbG9iYWwtbW9kdWxlICovXG5pbXBvcnQgZGV0ZWN0b3IgZnJvbSAnLi9oZWxwZXJzL2RldGVjdG9yLmpzJztcbmltcG9ydCB1c2ViT0NSV0FTTVBhcnNlciBmcm9tICcuL2hlbHBlcnMvdXNlYi1vY3Itd2FzbS1wYXJzZXIuanMnO1xuaW1wb3J0IHVzZWJPQ1JBUElQYXJzZXIgZnJvbSAnLi9oZWxwZXJzL3VzZWItb2NyLWFwaS1wYXJzZXIuanMnO1xuaW1wb3J0IHsgaXNTdXBwb3J0V2FzbSwgbWVhc3VyZSwgc2ltZCwgdGhyZWFkcyB9IGZyb20gJy4vaGVscGVycy93YXNtLWZlYXR1cmUtZGV0ZWN0LmpzJztcbmltcG9ydCBJbWFnZVV0aWwgZnJvbSAnLi9oZWxwZXJzL2ltYWdlLXV0aWwuanMnO1xubGV0IGluc3RhbmNlO1xuY2xhc3MgVXNlQk9DUiB7XG4gIElOX1BST0dSRVNTID0ge1xuICAgIE5PTkU6ICdub25lJyxcbiAgICBOT1RfUkVBRFk6ICdub3RfcmVhZHknLFxuICAgIFJFQURZOiAncmVhZHknLFxuICAgIENBUkRfREVURUNUX1NVQ0NFU1M6ICdkZXRlY3Rfc3VjY2VzcycsXG4gICAgQ0FSRF9ERVRFQ1RfRkFJTEVEOiAnZGV0ZWN0X2ZhaWxlZCcsXG4gICAgTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUzogJ21hbnVhbF9jYXB0dXJlX3N1Y2Nlc3MnLFxuICAgIE1BTlVBTF9DQVBUVVJFX0ZBSUxFRDogJ21hbnVhbF9jYXB0dXJlX2ZhaWxlZCcsXG4gICAgT0NSX1JFQ09HTklaRUQ6ICdyZWNvZ25pemVkJyxcbiAgICBPQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTogJ3JlY29nbml6ZWRfd2l0aF9zc2EnLFxuICAgIE9DUl9TVUNDRVNTOiAnb2NyX3N1Y2Nlc3MnLFxuICAgIE9DUl9TVUNDRVNTX1dJVEhfU1NBOiAnb2NyX3N1Y2Nlc3Nfd2l0aF9zc2EnLFxuICAgIE9DUl9GQUlMRUQ6ICdvY3JfZmFpbGVkJ1xuICB9O1xuICBPQ1JfU1RBVFVTID0ge1xuICAgIE5PVF9SRUFEWTogLTEsXG4gICAgUkVBRFk6IDAsXG4gICAgT0NSX1NVQ0NFU1M6IDEsXG4gICAgRE9ORTogMlxuICB9O1xuICBQUkVMT0FESU5HX1NUQVRVUyA9IHtcbiAgICBOT1RfU1RBUlRFRDogLTEsXG4gICAgU1RBUlRFRDogMCxcbiAgICBET05FOiAxXG4gIH07XG4gIE9DUl9JTUdfTU9ERSA9IHtcbiAgICBXQVJQSU5HOiAwLFxuICAgIENST1BQSU5HOiAxLFxuICAgIE5PTkU6IDJcbiAgfTtcbiAgT0NSX0lNR19NQVNLX01PREUgPSB7XG4gICAgRkFMU0U6IDAsXG4gICAgVFJVRTogMVxuICB9O1xuXG4gIC8qKiBwdWJsaWMgcHJvcGVydGllcyAqL1xuXG4gIC8qKiBwcml2YXRlIHByb3BlcnRpZXMgKi9cbiAgX19kZWJ1Z01vZGUgPSBmYWxzZTtcbiAgX19PQ1JFbmdpbmUgPSBudWxsO1xuICBfX2lzU3VwcG9ydFdhc20gPSBmYWxzZTtcbiAgX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gIF9faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgX19wcmVsb2FkZWQgPSBmYWxzZTtcbiAgX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgX19saWNlbnNlO1xuICBfX29jclR5cGU7XG4gIF9fc3NhTW9kZSA9IGZhbHNlO1xuICBfX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gIF9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCA9IDEwO1xuICBfX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICBfX3NzYVJldHJ5Q291bnQgPSAwO1xuICBfX2RldGVjdGVkQ2FyZFF1ZXVlID0gW107XG4gIF9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQgPSBbXTtcbiAgX19vblN1Y2Nlc3MgPSBudWxsO1xuICBfX29uRmFpbHVyZSA9IG51bGw7XG4gIF9fb25JblByb2dyZXNzQ2hhbmdlID0gbnVsbDtcbiAgX19vY3JUeXBlTGlzdCA9IFsnaWRjYXJkJywgJ2RyaXZlcicsICdwYXNzcG9ydCcsICdmb3JlaWduLXBhc3Nwb3J0JywgJ2FsaWVuJywgJ2FsaWVuLWJhY2snLCAnY3JlZGl0JywgJ2lkY2FyZC1zc2EnLCAnZHJpdmVyLXNzYScsICdwYXNzcG9ydC1zc2EnLCAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnLCAnYWxpZW4tc3NhJ107XG4gIF9fb2NyVHlwZU51bWJlclRvU3RyaW5nID0gbmV3IE1hcChbWycxJywgJ2lkY2FyZCddLCBbJzInLCAnZHJpdmVyJ10sIFsnMycsICdwYXNzcG9ydCddLCBbJzQnLCAnZm9yZWlnbi1wYXNzcG9ydCddLCBbJzUnLCAnYWxpZW4nXSwgWyc1LTEnLCAnYWxpZW4nXSwgWyc1LTInLCAnYWxpZW4nXSwgWyc1LTMnLCAnYWxpZW4nXV0pO1xuICBfX29jclN0cmluZ1RvVHlwZU51bWJlciA9IG5ldyBNYXAoW1snaWRjYXJkJywgJzEnXSwgWydkcml2ZXInLCAnMiddLCBbJ3Bhc3Nwb3J0JywgJzMnXSwgWydmb3JlaWduLXBhc3Nwb3J0JywgJzQnXSwgWydhbGllbicsICc1J10sIFsnYWxpZW4nLCAnNS0xJ10sIFsnYWxpZW4nLCAnNS0yJ10sIFsnYWxpZW4nLCAnNS0zJ11dKTtcbiAgX19wYWdlRW5kID0gZmFsc2U7XG4gIF9fb2NyO1xuICBfX2NhbnZhcztcbiAgX19yb3RhdGlvbkNhbnZhcztcbiAgX192aWRlbztcbiAgX192aWRlb1dyYXA7XG4gIF9fZ3VpZGVCb3g7XG4gIF9fZ3VpZGVCb3hXcmFwO1xuICBfX21hc2tCb3hXcmFwO1xuICBfX3ByZXZlbnRUb0ZyZWV6ZVZpZGVvO1xuICBfX2N1c3RvbVVJV3JhcDtcbiAgX190b3BVSTtcbiAgX19taWRkbGVVSTtcbiAgX19ib3R0b21VSTtcbiAgX19wcmV2aWV3VUlXcmFwO1xuICBfX3ByZXZpZXdVSTtcbiAgX19wcmV2aWV3SW1hZ2U7XG4gIF9fY2FwdHVyZVVJV3JhcDtcbiAgX19jYXB0dXJlVUk7XG4gIF9fc3dpdGNoVUlXcmFwO1xuICBfX3N3aXRjaFVJO1xuICBfX2NhcHR1cmVCdXR0b247XG4gIF9fYWRkcmVzcyA9IDA7XG4gIF9fZGV0ZWN0ZWQgPSBmYWxzZTtcbiAgX19yZWNvdmVyZWQgPSBmYWxzZTtcbiAgX19CdWZmZXIgPSBudWxsO1xuICBfX3Jlc3VsdEJ1ZmZlciA9IG51bGw7XG4gIF9fbWFza0luZm9SZXN1bHRCdWYgPSBudWxsO1xuICBfX1ByZXZJbWFnZSA9IG51bGw7XG4gIF9fc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gIF9fY2FtU2V0Q29tcGxldGUgPSBmYWxzZTtcbiAgX19yZXNvbHV0aW9uV2lkdGggPSAwO1xuICBfX3Jlc29sdXRpb25IZWlnaHQgPSAwO1xuICBfX3ZpZGVvV2lkdGggPSAwO1xuICBfX3ZpZGVvSGVpZ2h0ID0gMDtcbiAgX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgX19pbnRlcnZhbFRpbWVyO1xuICBfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXI7XG4gIF9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50ID0gMDtcbiAgX19yZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZDtcbiAgX19zdHJlYW07XG4gIF9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayA9IG51bGw7XG4gIF9fZmFjaW5nTW9kZUNvbnN0cmFpbnQgPSAnZW52aXJvbm1lbnQnO1xuICBfX3VpT3JpZW50YXRpb24gPSAnJztcbiAgX19wcmV2VWlPcmllbnRhdGlvbiA9ICcnO1xuICBfX3ZpZGVvT3JpZW50YXRpb24gPSAnJztcbiAgX190aHJvdHRsaW5nUmVzaXplVGltZXIgPSBudWxsO1xuICBfX3Rocm90dGxpbmdSZXNpemVEZWxheSA9IDUwMDtcbiAgX19tYXhSZXRyeUNvdW50R2V0QWRkcmVzcyA9IDMwMDsgLy8g7J6E7IucXG4gIF9fcmV0cnlDb3VudEdldEFkZHJlc3MgPSAwOyAvLyDsnoTsi5xcbiAgX19kZXZpY2VJbmZvO1xuICBfX2lzUm90YXRlZDkwb3IyNzAgPSBmYWxzZTtcbiAgX19pblByb2dyZXNzU3RlcCA9IHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZO1xuICBfX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPSB0aGlzLklOX1BST0dSRVNTLk5PTkU7XG4gIF9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplID0gZmFsc2U7XG4gIF9fZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSAxLjA7IC8vIOyImOygleu2iOqwgFxuICBfX3ZpZGVvUmF0aW9CeUhlaWdodCA9IDAuOTsgLy8g7IiY7KCV67aI6rCAXG4gIF9fZ3VpZGVCb3hSZWR1Y2VSYXRpbyA9IDAuODsgLy8g7IiY7KCV67aI6rCAXG4gIF9fY3JvcEltYWdlU2l6ZVdpZHRoID0gMDtcbiAgX19jcm9wSW1hZ2VTaXplSGVpZ2h0ID0gMDtcbiAgX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGZhbHNlO1xuXG4gIC8qKiBEZWZhdWx0IG9wdGlvbnMgKi9cbiAgX19vcHRpb25zID0gbmV3IE9iamVjdCh7XG4gICAgLy8g65SU67KE6rmFIOyYteyFmFxuICAgIHNob3dDbGlwRnJhbWU6IGZhbHNlLFxuICAgIC8vIGNpbHAtZnJhbWUg67O06riwXG4gICAgc2hvd0NhbnZhc1ByZXZpZXc6IGZhbHNlLFxuICAgIC8vIGNhbnZhcyBwcmV2aWV3IOuztOq4sFxuXG4gICAgLy8g7Lac66ClIOyYteyFmFxuICAgIC8vIOyVlO2YuO2ZlFxuICAgIHVzZUVuY3J5cHRNb2RlOiBmYWxzZSxcbiAgICAvLyDslZTtmLjtmZQg7KCB7JqpICjqsJzsnbjqs6DsnKDsi53rs4TrtoDtmLgg6rSA66CoIO2VreuqqSDslZTtmLjtmZQpXG4gICAgdXNlRW5jcnlwdEFsbE1vZGU6IGZhbHNlLFxuICAgIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKOyghOyytCDslZTtmLjtmZQsIGVuY3J5cHQgb2JqZWN0IOuzhOuPhCDsoJzqs7UpXG4gICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAvLyB1c2VQaWlFbmNyeXB0TW9kZTogZmFsc2UsIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKHBpaSlcbiAgICAvLyB1c2VQaWlFbmNyeXB0RmFjZTogZmFsc2UsIC8vIOyLoOu2hOymnSDslrzqtbTsgqzsp4Qg7JWU7Zi47ZmUIOyggeyaqSAocGlpKVxuICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgIHVzZUxlZ2FjeUZvcm1hdDogZmFsc2UsXG4gICAgLy8gTGVnYWN5IGZvcm1hdCDsp4Dsm5BcbiAgICB1c2VNYXNrSW5mbzogdHJ1ZSxcbiAgICAvLyDrp4jsiqTtgrkg7KKM7ZGcIOyngOybkFxuICAgIHVzZUZhY2VJbWFnZTogdHJ1ZSxcbiAgICAvLyDsi6DrtoTspp0g64K0IOyWvOq1tCDsgqzsp4RcbiAgICB1c2VJbWFnZVdhcnBpbmc6IGZhbHNlLFxuICAgIC8vIOyLoOu2hOymnSDsnbTrr7jsp4DrpbwgV2FycGluZyjsmZzqs6Eg67O07KCVIO2VoOyngCDsl6zrtoApXG4gICAgdXNlQ29tcHJlc3NJbWFnZTogZmFsc2UsXG4gICAgLy8g7Iug67aE7KadIOydtOuvuOyngOulvCDslZXstpXtlaDsp4Ag7Jes67aAXG4gICAgdXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoOiAxMDgwLFxuICAgIC8vIOydtOuvuOyngCDrpqzsgqzsnbTsp5Ug6rCA66GcIO2VtOyDgeuPhFxuICAgIHVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWU6IDEwMjQgKiA1MCxcbiAgICAvLyDsnbTrr7jsp4Ag7JWV7LaVIOuqqe2RnCDsmqnrn4lcblxuICAgIC8vIFVJIOyEpOyglVxuICAgIHVzZVRvcFVJOiB0cnVlLFxuICAgIC8vIOyDgeuLqCBVSVxuICAgIHVzZVRvcFVJVGV4dE1zZzogZmFsc2UsXG4gICAgLy/sg4Hri6ggVUkgPiBURVhUXG4gICAgdXNlTWlkZGxlVUk6IHRydWUsXG4gICAgLy/spJHri6ggVUlcbiAgICB1c2VNaWRkbGVVSVRleHRNc2c6IHRydWUsXG4gICAgLy8g7KSR64uoIFVJID4gVEVYVFxuICAgIHVzZUJvdHRvbVVJOiB0cnVlLFxuICAgIC8vIO2VmOuLqCBVSVxuICAgIHVzZUJvdHRvbVVJVGV4dE1zZzogZmFsc2UsXG4gICAgLy8g7ZWY64uoIFVJID4gVEVYVFxuICAgIHVzZVByZXZpZXdVSTogdHJ1ZSxcbiAgICAvLyBQcmV2aWV3IFVJXG4gICAgdXNlQ2FwdHVyZVVJOiB0cnVlLFxuICAgIC8vIOy6oeyymOuyhO2KvCBVSVxuICAgIHByZWxvYWRpbmdVSVRleHRNc2c6ICfsi6DrtoTspp3snbjspp0g66qo65OI7J2EIOu2iOufrOyYpOuKlCDspJEg7J6F64uI64ukPGJyIC8+7J6g7Iuc66eMIOq4sOuLpOugpOyjvOyEuOyalCcsXG4gICAgLy8g7J247IudIO2UhOugiOyehCDsmLXshZhcbiAgICBmcmFtZUJvcmRlclN0eWxlOiB7XG4gICAgICB3aWR0aDogNSxcbiAgICAgIC8vIGJvcmRlci13aWR0aFxuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIC8vIGJvcmRlci1yYWRpdXNcbiAgICAgIHN0eWxlOiAnc29saWQnLFxuICAgICAgLy8gYm9yZGVyLXN0eWxlXG5cbiAgICAgIC8vIOuLqOqzhOuzhCDsnbjsi50g7ZSE66CI7J6EIGJvcmRlciDsg4nsg4FcbiAgICAgIG5vdF9yZWFkeTogJyMwMDAwMDAnLFxuICAgICAgLy8g7Iqk7LqU7KSA67mEIDog6rKA7KCVXG4gICAgICByZWFkeTogJyNiOGI4YjgnLFxuICAgICAgLy8g7Iqk7LqU64yA6riwIDog7ZqM7IOJXG4gICAgICBkZXRlY3Rfc3VjY2VzczogJyM1ZThmZmYnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyEseqztSA6IO2VmOuKmFxuICAgICAgZGV0ZWN0X2ZhaWxlZDogJyM3MjViNjcnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyLpO2MqCA6IOuztOudvFxuICAgICAgbWFudWFsX2NhcHR1cmVfc3VjY2VzczogJyM1ZThmZmYnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyEseqztSA6IO2VmOuKmFxuICAgICAgbWFudWFsX2NhcHR1cmVfZmFpbGVkOiAnIzcyNWI2NycsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7Iuk7YyoIDog67O06528XG4gICAgICByZWNvZ25pemVkOiAnIzAwM2FjMicsXG4gICAgICAvLyBPQ1LsmYTro4wgOiDtjIzrnpFcbiAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6ICcjMDAzYWMyJyxcbiAgICAgIC8vIOyCrOuzuO2MkOuzhOykkSjsgqzrs7jtjJDrs4QgT04pIDog7YyM656RXG4gICAgICBvY3Jfc3VjY2VzczogJyMxNGIwMGUnLFxuICAgICAgLy8gT0NS7JmE66OMIDog7LSI66GdXG4gICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogJyMxNGIwMGUnLFxuICAgICAgLy8gT0NS7JmE66OMKOyCrOuzuO2MkOuzhCBPTikgOiDstIjroZ1cbiAgICAgIG9jcl9mYWlsZWQ6ICcjRkExMTNEJyAvLyBPQ1Lsi6TtjKggOiDruajqsJVcbiAgICB9LFxuXG4gICAgLy8g66eI7Iqk7YGsIO2UhOugiOyehCBmaWxsIOy7rOufrCDrs4Dqsr0g7IKs7JqpIOyXrOu2gFxuICAgIHVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlOiB0cnVlLFxuICAgIC8vIOuniOyKpO2BrCDtlITroIjsnoQg7Ji17IWYICjsubTrqZTrnbwg67mE65SU7JikIOyYgeyXreyXkOyEnCDsnbjsi50g7ZSE66CI7J6E66eMIOuztOydtOqyjCDtlZjqs6Ag64KY66i47KeA66W8IOuNruyWtOyTsOuKlCDtlITroIjsnoQg7JiB7JetKVxuICAgIG1hc2tGcmFtZVN0eWxlOiB7XG4gICAgICBjbGlwX2ZyYW1lOiAnI2ZmMDBiZicsXG4gICAgICAvLyBjbGlwLWZyYW1lIOyDieyDgSA6IOuUpe2NvO2UjCAo7IiY7KCV67aI6rCAKVxuICAgICAgYmFzZV9jb2xvcjogJyMzMzMzMzMnLFxuICAgICAgLy8gbWFzay1mcmFtZSDsg4nsg4EgOiDri6Ttgazqt7jroIjsnbQgKO2IrOuqheuPhOuKlCDsiJjsoJXrtojqsIAgZmbroZwg6rOg7KCVKVxuXG4gICAgICAvLyDri6jqs4Trs4Qg66eI7Iqk7YGsIO2UhOugiOyehCBmaWxsIOyDieyDgVxuICAgICAgbm90X3JlYWR5OiAnIzMzMzMzMycsXG4gICAgICAvLyDsiqTsupTspIDruYRcbiAgICAgIHJlYWR5OiAnIzMzMzMzMycsXG4gICAgICAvLyDsiqTsupTrjIDquLBcbiAgICAgIGRldGVjdF9zdWNjZXNzOiAnIzIyMjIyMicsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7ISx6rO1XG4gICAgICBkZXRlY3RfZmFpbGVkOiAnIzMzMzMzMycsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7Iuk7YyoXG4gICAgICBtYW51YWxfY2FwdHVyZV9zdWNjZXNzOiAnIzIyMjIyMicsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7ISx6rO1XG4gICAgICBtYW51YWxfY2FwdHVyZV9mYWlsZWQ6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDsi6TtjKhcbiAgICAgIHJlY29nbml6ZWQ6ICcjMjIyMjIyJyxcbiAgICAgIC8vIE9DUuyZhOujjFxuICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogJyMyMjIyMjInLFxuICAgICAgLy8g7IKs67O47YyQ67OE7KSRKOyCrOuzuO2MkOuzhCBPTilcbiAgICAgIG9jcl9zdWNjZXNzOiAnIzExMTExMScsXG4gICAgICAvL09DUuyZhOujjFxuICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6ICcjMTExMTExJyxcbiAgICAgIC8vIE9DUuyZhOujjCjsgqzrs7jtjJDrs4QgT04pXG4gICAgICBvY3JfZmFpbGVkOiAnIzExMTExMScgLy8gT0NS7Iuk7YyoXG4gICAgfSxcblxuICAgIC8vIOy0rOyYgeyYteyFmFxuICAgIHVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGU6IGZhbHNlLFxuICAgIC8vIOyggOyCrOyWkSDri6jrp5Dsl5DshJwg7ISc67KET0NS66GcIOyekOuPmSDsoITtmZgg6riw64qlXG4gICAgdXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlOiBmYWxzZSxcbiAgICAvLyDsiJjrj5nsnLzroZwg7ISc67KET0NSIOyghO2ZmCDquLDriqUgKOyImOuPmeydtCB0cnVl7J2066m0IOyekOuPmeydgCDrrLTsi5zrkKgpXG4gICAgc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQ6IDIwLjAsXG4gICAgLy8g7J6Q64+Z7KCE7ZmYIOq4sOykgOqwkiAo7ISx64qlIOy4oeygley5mCBtcylcbiAgICB1c2VGb3JjZUNvbXBsZXRlVUk6IGZhbHNlLFxuICAgIC8vIFdBU00g66qo65Oc7J2865WMIOuyhO2KvCDriITrpbzsi5wg7ZW064u5IOyLnOygkOyXkCDqsJXsoJzroZwg7JmE66OMIOyCrOyaqeyXrOu2gFxuXG4gICAgLy8g7IiY64+Z7LSs7JiBIOuyhO2KvCDsmLXshZhcbiAgICBjYXB0dXJlQnV0dG9uU3R5bGU6IHtcbiAgICAgIHN0cm9rZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgLy8g67KE7Yq8IO2FjOuRkOumrChzdHJva2UpIOyDieyDgVxuICAgICAgYmFzZV9jb2xvcjogJyM1ZThmZmYnIC8vIOuyhO2KvCDsg4nsg4FcbiAgICB9LFxuXG4gICAgcmVzb3VyY2VCYXNlVXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgIC8vIHdhc20sIGRhdGEg7YyM7J28IOumrOyGjOyKpCBiYXNlIOqyveuhnCAoQ0ROIOyCrOyaqeyLnCDrs4Dqsr0pXG4gICAgZGV2aWNlTGFiZWw6ICcnLFxuICAgIHZpZGVvVGFyZ2V0SWQ6ICcnLFxuICAgIC8vIOy5tOuplOudvCDshKTsoJVcbiAgICByb3RhdGlvbkRlZ3JlZTogMCxcbiAgICAvLyByb3RhdGlvbi1kZWdyZWUg7Lm066mU65286rCAIO2ajOyghOuQnCDqsIHrj4QgKDkwLCAxOTAsIDI3MClcbiAgICBtaXJyb3JNb2RlOiBmYWxzZSxcbiAgICAvLyBtaXJyb3ItbW9kZSDshYDtlLwg7Lm066mU6528KO2CpOyYpOyKpO2BrCDrk7EpIOyCrOyaqeyLnCDsoozsmrAg67CY7KCEXG4gICAgY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbDogMTAwMCxcbiAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDqsITqsqkobXMpXG4gICAgY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdDogLTEsXG4gICAgLy8g7Lm066mU6528IOumrOyGjOyKpCDsnqzsmpTssq0g7LWc64yAIO2an+yImCwgLTHsnbTrqbQg66y07ZWcIOyerOyalOyyrS5cblxuICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVICA6ICdjb21wYXRpYmlsaXR5JyAo7Zi47ZmY7ISxIOyasOyEoCkgfHwgJ2hpZ2hRdWFsaXR5JyAo6rOg7ZmU7KeIIOyasOyEoClcbiAgICAvLyBjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWE6ICdjb21wYXRpYmlsaXR5JywgLy8g7Zi47ZmY7ISxIOyasOyEoCjqtozsnqUsIOuUlO2PtO2KuCkgOiA3MjDsnLzroZwg6rOg7KCVLCDsoIDsgqzslpEg64uo66eQ6riwIO2YuO2ZmOyEsSDsoovsnYxcbiAgICBjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWE6ICdoaWdoUXVhbGl0eScsXG4gICAgLy8g6rOg7ZmU7KeIIOyasOyEoCA6IDEwODDsnbQg6rCA64ql7ZWY66m0IDEwODAg67aI6rCA64ql7ZWY66m0IDcyMFxuXG4gICAgLy8g6rCA7J2065OcIOuwleyKpCDshKTsoJUgOiAnY2FtZXJhUmVzb2x1dGlvbicgKOy5tOuplOudvCDtlbTsg4Hrj4QpIHx8ICdvY3JWaWV3U2l6ZScgKG9jciBkaXYg7YGs6riwKVxuICAgIGNhbGNHdWlkZUJveENyaXRlcmlhOiAnY2FtZXJhUmVzb2x1dGlvbicsXG4gICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDquLDspIAo6raM7J6lLCDrlJTtj7TtirgpIDogNzIweDEyODAg7ZW07IOB64+EKOyEuOuhnOuqqOuTnCkg7J2865WMIG9jciB2aWV3IHdpZHRoIHNpemXqsIAgNzIw67O064ukIO2BsCDqsr3smrAsIOqwgOydtOuTnCDrsJXsiqTrpbwgNzIw7JeQIOunnuy2pCAocHJldmlldyDtmZTrqbQg6rmo7KeQIOyXhuydjClcbiAgICAvLyBjYWxjR3VpZGVCb3hDcml0ZXJpYTogJ29jclZpZXdTaXplJywgLy8g7ZmU66m0IOyCrOydtOymiCDquLDspIAgOiA3MjB4MTI4MCDtlbTsg4Hrj4Qo7IS466Gc66qo65OcKSDsnbzrlYwgb2NyIHZpZXcgd2lkdGggc2l6ZeqwgCA3MjDrs7Tri6Qg7YGw6rK97JqwLCDqsIDsnbTrk5wg67CV7Iqk66W8IG9jciB2aWV3IHdpZHRoIOyCrOyXkOymiOyXkCDrp57stqQgKHByZXZpZXcg7ZmU66m0IOqwleygnOuhnCDripjrpqzquLAg65WM66y47JeQIOuLpOyGjCDquajsp5ApXG5cbiAgICAvLyDsgqzrs7jtjJDrs4QgUkVUUlkg7ISk7KCVXG4gICAgLy8gc3NhUmV0cnlUeXBlXG4gICAgLy8gICAtIFJFQUwgICAgIDog67O47J24KFJFQUwpIOqxsOu2gOycqCAtPiBGYWxzZSBOZWdhdGl2ZSjsi6TsoJzqsJLsnYAgUkVBTOyduOuNsCDsmIjsuKHqsJLsnYAgRkFLReudvOyEnCDti4DrprDqsr3smrAp66W8IOuCruy2lOq4sCDsnITtlbQsXG4gICAgLy8gICAtIEZBS0UgICAgIDog7YOA7J24KEZBS0UpIOyImOudveycqCAtPiBGYWxzZSBQb3NpdGl2ZSjsi6TsoJzqsJLsnYAgRkFLReyduOuNsCDsmIjsuKHqsJLsnYAgUkVBTOydtOudvOyEnCDti4DrprDqsr3smrAp66W8IOuCruy2lOq4sCDsnITtlbRcbiAgICAvLyAgIC0gRU5TRU1CTEUgOiDtj4nqt6Ag7KCI64yA6rCSIC0+IHNzYU1heFJldHJ5Q291bnQg66eM7YG8IOuwmOuztSDsiJjtlontlZjqs6AgZmRfY29uZmlkZW5jZSDsoIjrjIDqsJIg6rCS7J2YIO2Pieq3oOycvOuhnCDtjJDsoJVcbiAgICAvLyBzc2FNYXhSZXRyeUNvdW50IOyEpOyglSDqsJLrp4ztgbwg7J6s7Iuc64+E7ZWY7JesIO2VnOuyiOydtOudvOuPhCDquLDspIDqsJIoUkVBTCDrmJDripQgRkFLRSnsnbQg65yo66m0IOq4sOykgOqwkihSRUFMIOuYkOuKlCBGQUtFKeuhnCDtjJDsoJVcbiAgICBzc2FSZXRyeVR5cGU6ICdFTlNFTUJMRScsXG4gICAgc3NhUmV0cnlQaXZvdDogMC41LFxuICAgIC8vIFJFQUwvRkFLReulvCDtjJDsoJXtlZjripQgZmRfY29uZmlkZW5jZSDquLDspIDqsJIgKHdhc20g67Cw7Y+sIOuyhOyghOyXkCDrlLDrnbwg64uk66aEKSDigLsg7IiY7KCV67aI6rCAXG4gICAgc3NhTWF4UmV0cnlDb3VudDogMCxcbiAgICAvLyDstZzrjIAgUkVUUlkg7ZqM7IiY7ISk7KCVIDDsnbTrqbQg66+47IKs7JqpXG5cbiAgICAvLyB0aGlzLl9fZGVidWcoKeulvCDthrXtlbQg7LCN7J2AIOuplOyLnOyngOulvCBhbGVydOycvOuhnCDrnYTsmrjsp4Ag7Jes67aAXG4gICAgdXNlRGVidWdBbGVydDogZmFsc2UsXG4gICAgLy8gV0FTTSDrpqzshozsiqQg6rCx7IugIOyXrOu2gFxuICAgIGZvcmNlX3dhc21fcmVsb2FkOiBmYWxzZSxcbiAgICBmb3JjZV93YXNtX3JlbG9hZF9mbGFnOiAnJ1xuICB9KTtcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGluc3RhbmNlKSByZXR1cm4gaW5zdGFuY2U7XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBwdWJsaWMgbWV0aG9kcyAqL1xuICBhc3luYyBwcmVsb2FkaW5nKG9uUHJlbG9hZGVkKSB7XG4gICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKG9uUHJlbG9hZGVkKSBvblByZWxvYWRlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aGlzLnNob3dPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEO1xuICAgICAgYXdhaXQgdGhpcy5fX2xvYWRSZXNvdXJjZXMoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FO1xuICAgICAgdGhpcy5fX3ByZWxvYWRlZCA9IHRydWU7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgICB0aGlzLmhpZGVPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgaXNJbml0aWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2luaXRpYWxpemVkO1xuICB9XG4gIGlzUHJlbG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9fcHJlbG9hZGVkO1xuICB9XG4gIGdldFByZWxvYWRpbmdTdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzO1xuICB9XG4gIGlzRW5jcnlwdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRBbGxNb2RlO1xuICB9XG4gIGlzQ3JlZGl0Q2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGUgPT09ICdjcmVkaXQnO1xuICB9XG4gIHNob3dPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfVxuICB9XG4gIGhpZGVPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9XG4gIGVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCkge1xuICAgIGlmICh0aGlzLmlzQ3JlZGl0Q2FyZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRW5jcnlwdE1vZGUoKSAmJiB0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGluY2x1ZGVMaXN0ID0gWydqdW1pbicsICdkcml2ZXJfbnVtYmVyJywgJ3Bhc3Nwb3J0X251bWJlcicsICdwZXJzb25hbF9udW1iZXInLCAnbXJ6MiddO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSB7XG4gICAgICAgICAgb2NyX3Jlc3VsdDogXy50b1BhaXJzKF8ucGljayhyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGluY2x1ZGVMaXN0KSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0ID0ge1xuICAgICAgICAgIC4uLnJldmlld19yZXN1bHQub2NyX3Jlc3VsdCxcbiAgICAgICAgICAuLi5lbmNyeXB0ZWQub2NyX3Jlc3VsdFxuICAgICAgICB9O1xuICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBlbmNyeXB0ZWQub2NyX29yaWdpbl9pbWFnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gWydjb21wbGV0ZScsICdyZXN1bHRfc2Nhbl90eXBlJywgJ2NvbG9yX3BvaW50JywgJ2ZvdW5kX2ZhY2UnLCAnc3BlY3VsYXJfcmF0aW8nLCAnc3RhcnRfdGltZScsICdlbmRfdGltZScsICdmZF9jb25maWRlbmNlJywgJ2lkX3RydXRoJywgJ2lkX3RydXRoX3JldHJ5X2NvdW50J107XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICByZXZpZXdfcmVzdWx0LmVuY3J5cHRlZCA9IHtcbiAgICAgICAgICBvY3JfcmVzdWx0OiBfLnRvUGFpcnMoXy5vbWl0KHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgZXhjbHVkZUxpc3QpKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlKSxcbiAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UpLFxuICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfZmFjZV9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0T0NSRW5naW5lKCkge1xuICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lO1xuICB9XG4gIGluaXQoc2V0dGluZ3MpIHtcbiAgICBpZiAoISEhc2V0dGluZ3MubGljZW5zZUtleSkgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIGtleSBpcyBlbXB0eScpO1xuICAgIHRoaXMuX19saWNlbnNlID0gc2V0dGluZ3MubGljZW5zZUtleTtcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zID0gXy5tZXJnZSh7fSwgdGhpcy5fX29wdGlvbnMsIHNldHRpbmdzKTtcbiAgICB0aGlzLnNldE9wdGlvbihtZXJnZWRPcHRpb25zKTtcbiAgICB2b2lkIDA7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhpcy5fX3dpbmRvd0V2ZW50QmluZCgpO1xuICAgICAgdGhpcy5fX2RldmljZUluZm8gPSBkZXRlY3Rvci5nZXRPc1ZlcnNpb24oKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRXYXNtID0gaXNTdXBwb3J0V2FzbSgpO1xuICAgICAgaWYgKCF0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBzdXBwb3J0ZWQuIGluIHRoaXMgYnJvd3Nlci4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHNldE9wdGlvbihzZXR0aW5ncykge1xuICAgIHRoaXMuX19vcHRpb25zID0gc2V0dGluZ3M7XG4gIH1cbiAgZ2V0T3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucztcbiAgfVxuICBnZXRPY3JUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGVOdW1iZXJUb1N0cmluZy5nZXQodHlwZSk7XG4gIH1cbiAgZ2V0T2NyVHlwZU51bWJlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclN0cmluZ1RvVHlwZU51bWJlci5nZXQoc3RyaW5nKTtcbiAgfVxuICBnZXRVSU9yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdWlPcmllbnRhdGlvbjtcbiAgfVxuICBnZXRWaWRlb09yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgfVxuICBhc3luYyBjaGVja1N3aXRjaFRvU2VydmVyTW9kZSgpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAvLyDsiJjrj5nsoITtmZggb24g7J2066m0IOyImOuPmeyghO2ZmCDsmrDshKBcbiAgICAgIHJldHVybiB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOyImOuPmeyghO2ZmCBvZmYg7J2066m0IOyekOuPmeyghO2ZmCDssrTtgaxcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgIC8vIOyekOuPmeyghO2ZmCBvbuydvOuVjFxuICAgICAgICAvLyDshLHriqUg7Lih7KCV6rCS7J2EIOq4sOykgOycvOuhnCBXQVNNIG9yIFNlcnZlclxuICAgICAgICBjb25zdCBbbGF0ZW5jeVBlcjEwMG1zLCBtZWFzdXJlUmVwb3J0XSA9IGF3YWl0IG1lYXN1cmUoKTtcbiAgICAgICAgdGhpcy5fX2RlYnVnKG1lYXN1cmVSZXBvcnQpO1xuICAgICAgICByZXR1cm4gbGF0ZW5jeVBlcjEwMG1zID4gcGFyc2VGbG9hdCh0aGlzLl9fb3B0aW9ucy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsiJjrj5nsoITtmZjrj4Qgb2ZmLCDsnpDrj5nsoITtmZggb2ZmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgc3RhcnRPQ1IodHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSA9IG51bGwpIHtcbiAgICBpZiAoISEhdHlwZSB8fCAhISFvblN1Y2Nlc3MgfHwgISEhb25GYWlsdXJlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGF3YWl0IHRoaXMuY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUoKTtcbiAgICB0aGlzLl9fb2NyVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fX3NzYU1vZGUgPSB0aGlzLl9fb2NyVHlwZS5pbmRleE9mKCctc3NhJykgPiAtMTtcbiAgICB0aGlzLl9fb25TdWNjZXNzID0gb25TdWNjZXNzO1xuICAgIHRoaXMuX19vbkZhaWx1cmUgPSBvbkZhaWx1cmU7XG4gICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZSA9IG9uSW5Qcm9ncmVzc0NoYW5nZTtcbiAgICBpZiAob25JblByb2dyZXNzQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHtcbiAgICAgICAgdGhpcy5fX3RvcFVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS50b3BVSTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSkge1xuICAgICAgICB0aGlzLl9fbWlkZGxlVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm1pZGRsZVVJO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJKSB7XG4gICAgICAgIHRoaXMuX19ib3R0b21VSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuYm90dG9tVUk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW5pdGlhbGl6ZWQhJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fcHJlcHJvY2VzcygpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwRG9tRWxlbWVudHMoKTtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8gc2VydmVyTW9kZVxuICAgICAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fcHJlbG9hZGluZ1dhc20oKTsgLy8g7ISc67KE66qo65OcIOydtOyngOunjCDslZTtmLjtmZQg7ZWY6riw7JyE7ZW0IHdhc23snYQgcHJlbG9hZGluZyDtlahcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5TZXJ2ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdhc21Nb2RlXG4gICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zdG9wT0NSKCk7XG4gICAgfVxuICB9XG4gIHN0b3BPQ1IoKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gIH1cbiAgc2V0SWdub3JlQ29tcGxldGUodmFsKSB7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zZXRJZ25vcmVDb21wbGV0ZSh2YWwpO1xuICB9XG4gIGVuY3J5cHQocGxhaW5TdHIpIHtcbiAgICByZXR1cm4gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHBsYWluU3RyKTtcbiAgfVxuICBhc3luYyByZXN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UsIGlzU3dpdGNoTW9kZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3dpdGNoTW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdG9wT0NSKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICB9XG5cbiAgLyoqIHByaXZhdGUgbWV0aG9kcyAqL1xuICBhc3luYyBfX3dhaXRQcmVsb2FkZWQoKSB7XG4gICAgbGV0IHdhaXRpbmdSZXRyeUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YWl0aW5nUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9O1xuICAgICAgY2hlY2soKTtcbiAgICB9KTtcbiAgfVxuICBfX3ByZXByb2Nlc3MoKSB7XG4gICAgY29uc3QgY29udmVydFR5cGVUb051bWJlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZUludChvcHRpb24pKSA/IDAgOiBwYXJzZUludChvcHRpb24pO1xuICAgIH07XG4gICAgY29uc3QgY29udmVydFR5cGVUb0Zsb2F0ID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlRmxvYXQob3B0aW9uKSkgPyAyMC4wIDogcGFyc2VGbG9hdChvcHRpb24pO1xuICAgIH07XG4gICAgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgpO1xuICAgIHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkID0gY29udmVydFR5cGVUb0Zsb2F0KHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkKTtcbiAgfVxuICBfX3dpbmRvd0V2ZW50QmluZCgpIHtcbiAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgIGlmICgvaXBob25lfGlwb2R8aXBhZC8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgY29uc3Qgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSA9IGV2ID0+IHtcbiAgICAgICAgaWYgKGV2LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXYuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzXy5fX3BhZ2VFbmQgPSB0cnVlO1xuICAgICAgX3RoaXNfLmNsZWFudXAoKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghISFfdGhpc18uX19vY3JUeXBlKSByZXR1cm47XG4gICAgICBpZiAoIV90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSkge1xuICAgICAgICBfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSB0cnVlO1xuICAgICAgICBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIgPSBudWxsO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIF90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBfdGhpc18ucmVzdGFydE9DUihfdGhpc18uX19vY3JUeXBlLCBfdGhpc18uX19vblN1Y2Nlc3MsIF90aGlzXy5fX29uRmFpbHVyZSwgX3RoaXNfLl9fb25JblByb2dyZXNzQ2hhbmdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISEhX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyKSB7XG4gICAgICAgIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoaGFuZGxlUmVzaXplLCBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplRGVsYXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fZGVidWcobXNnKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZURlYnVnQWxlcnQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBfX3NsZWVwKG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICB9XG4gIF9fYmxvYlRvQmFzZTY0KGJsb2IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF8pID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgIH0pO1xuICB9XG4gIF9fYmFzZTY0dG9CbG9iKGJhc2U2NCkge1xuICAgIC8vIGNvbnZlcnQgYmFzZTY0IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgLy8gZG9lc24ndCBoYW5kbGUgVVJMRW5jb2RlZCBEYXRhVVJJcyAtIHNlZSBTTyBhbnN3ZXIgIzY4NTAyNzYgZm9yIGNvZGUgdGhhdCBkb2VzIHRoaXNcbiAgICBjb25zdCBieXRlU3RyaW5nID0gYXRvYihiYXNlNjQuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgY29uc3QgbWltZVN0cmluZyA9IGJhc2U2NC5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgY29uc3QgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgIGNvbnN0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmxvYihbYWJdLCB7XG4gICAgICB0eXBlOiBtaW1lU3RyaW5nXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19jb21wcmVzZUJhc2U2NEltYWdlKGJhc2U2NCwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIpIHtcbiAgICBpZiAoYmFzZTY0ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBibG9iRmlsZSA9IHRoaXMuX19iYXNlNjR0b0Jsb2IoYmFzZTY0KTtcbiAgICBjb25zdCBjb21wcmVzc2VkID0gYXdhaXQgSW1hZ2VVdGlsLmNvbXByZXNzSW1hZ2UoYmxvYkZpbGUsIG9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICBjb25zdCBjb21wcmVzc2lvblJhdGlvID0gTWF0aC5yb3VuZCgoMSAtIGNvbXByZXNzZWQuc2l6ZSAvIGJsb2JGaWxlLnNpemUpICogMTAwMDApIC8gMTAwO1xuICAgIHZvaWQgMDtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fX2Jsb2JUb0Jhc2U2NChjb21wcmVzc2VkKTtcbiAgfVxuXG4gIC8qKiDrnbzsnbTshLzsiqQg7YKk66W8IGhlYXAg7JeQIGFsbG9jYXRpb24gKi9cbiAgX19nZXRTdHJpbmdPbldhc21IZWFwKCkge1xuICAgIGlmICghISF0aGlzLl9fbGljZW5zZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIEtleSBpcyBlbXB0eScpO1xuICAgIH1cbiAgICBjb25zdCBsZW5ndGhCeXRlcyA9IHRoaXMuX19PQ1JFbmdpbmUubGVuZ3RoQnl0ZXNVVEY4KHRoaXMuX19saWNlbnNlKSArIDE7XG4gICAgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MobGVuZ3RoQnl0ZXMpO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUuc3RyaW5nVG9VVEY4KHRoaXMuX19saWNlbnNlLCB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCwgbGVuZ3RoQnl0ZXMpO1xuICAgIHJldHVybiB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcDtcbiAgfVxuICBfX2VuY3J5cHRTY2FuUmVzdWx0KG9jclJlc3VsdCkge1xuICAgIGxldCBzdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBvY3JSZXN1bHQgPT09ICdudW1iZXInKSBvY3JSZXN1bHQgPSBvY3JSZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgIGlmIChvY3JSZXN1bHQgPT09ICcnKSByZXR1cm4gJyc7XG4gICAgICBpZiAodHlwZW9mIG9jclJlc3VsdCAhPT0gJ3N0cmluZycgJiYgISEhb2NyUmVzdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb2NyUmVzdWx0IGlzIGVtcHR5Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gb2NyUmVzdWx0O1xuICAgICAgY29uc3QgbGVuZ3RoQnl0ZXMgPSB0aGlzLl9fT0NSRW5naW5lLmxlbmd0aEJ5dGVzVVRGOChqc29uU3RyaW5nKSArIDE7XG4gICAgICBzdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKGxlbmd0aEJ5dGVzKTtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuc3RyaW5nVG9VVEY4KGpzb25TdHJpbmcsIHN0cmluZ09uV2FzbUhlYXAsIGxlbmd0aEJ5dGVzKTtcbiAgICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRSZXN1bHQoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChzdHJpbmdPbldhc21IZWFwKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgIHN0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBfX3NldFZpZGVvUmVzb2x1dGlvbih2aWRlb0VsZW1lbnQpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgbGV0IHJlc29sdXRpb25UZXh0ID0gJ25vdCByZWFkeSc7XG4gICAgaWYgKCF0aGlzLl9fY2FtU2V0Q29tcGxldGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgICAgcmVzb2x1dGlvblRleHRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDApIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXNvbHV0aW9uVGV4dCA9IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoICsgJ3gnICsgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTA4MCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDE5MjAgfHwgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDE5MjAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxMDgwKSB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDEyODAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSA3MjAgfHwgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDcyMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDEyODApIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZGVvRWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX192aWRlb1dpZHRoID0gdmlkZW9FbGVtZW50LnZpZGVvV2lkdGg7XG4gICAgdGhpcy5fX3ZpZGVvSGVpZ2h0ID0gdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgIHJldHVybiB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICByZXNvbHV0aW9uVGV4dFxuICAgIH07XG4gIH1cbiAgX19nZXRTY2FubmVyQWRkcmVzcyhvY3JUeXBlKSB7XG4gICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGFkZHJlc3MgPSAwO1xuICAgICAgbGV0IGRlc3Ryb3lDYWxsYmFjayA9IG51bGw7XG4gICAgICBjb25zdCBzdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX2dldFN0cmluZ09uV2FzbUhlYXAoKTtcbiAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAvLyBPQ1JcbiAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldElEQ2FyZFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95SURDYXJkU2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldFBhc3Nwb3J0U2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lQYXNzcG9ydFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0QWxpZW5TY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUFsaWVuU2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRDcmVkaXRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUNyZWRpdFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2FubmVyIGRvZXMgbm90IGV4aXN0cycpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZShzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgIGlmIChhZGRyZXNzID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPT09IHRoaXMuX19yZXRyeUNvdW50R2V0QWRkcmVzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgTGljZW5zZSBLZXknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fcmV0cnlDb3VudEdldEFkZHJlc3MrKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBbYWRkcmVzcywgZGVzdHJveUNhbGxiYWNrXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPIDogTGljZW5zZSBJc3N1ZeyduCDqsr3smrAg7JeQ65+sIOqwkuydhCDrsJvslYTshJwgZXJyb3Ig66Gc6re466W8IOywjeydhCDsiJgg7J6I6rKMIOyalOyyre2VhOyalCAo7J6E7IucIE7rsogg7J207IOBIGFkZHJlc3Prpbwg66q767Cb7Jy866m0IOqwleygnCDsl5Drn6wpXG4gICAgICB2b2lkIDA7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBfX2dldEJ1ZmZlcigpIHtcbiAgICBpZiAoIXRoaXMuX19CdWZmZXIpIHtcbiAgICAgIHRoaXMuX19CdWZmZXIgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2ModGhpcy5fX3Jlc29sdXRpb25XaWR0aCAqIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0ICogNCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fX3Jlc3VsdEJ1ZmZlcikge1xuICAgICAgdGhpcy5fX3Jlc3VsdEJ1ZmZlciA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyg0MDk2KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tJbmZvKSB7XG4gICAgICBpZiAoIXRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zikge1xuICAgICAgICB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MoNDA5Nik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbdGhpcy5fX0J1ZmZlciwgdGhpcy5fX3Jlc3VsdEJ1ZmZlciwgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmXTtcbiAgfVxuICBhc3luYyBfX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIG1hc2tNb2RlLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChpbWdUeXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5lbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UoYWRkcmVzcywgbWFza01vZGUsIGltZ01vZGUpO1xuICAgICAgfSBlbHNlIGlmIChpbWdUeXBlID09PSAnZmFjZScpIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5lbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UoYWRkcmVzcyk7XG4gICAgICB9XG4gICAgICBjb25zdCBqcGdTaXplID0gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNvZGVkSnBnU2l6ZSgpO1xuICAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jb2RlZEpwZ0J1ZmZlcigpO1xuICAgICAgY29uc3QgcmVzdWx0VmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguYnVmZmVyLCBqcGdQb2ludGVyLCBqcGdTaXplKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHJlc3VsdFZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXN1bHRdLCB7XG4gICAgICAgIHR5cGU6ICdpbWFnZS9qcGVnJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fX2Jsb2JUb0Jhc2U2NChibG9iKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lFbmNvZGVkSnBnKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZyZWUgYnVmZmVyICovXG4gIF9fZGVzdHJveUJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX0J1ZmZlcikge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fQnVmZmVyKTtcbiAgICAgIHRoaXMuX19CdWZmZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9fZGVzdHJveVJlc3VsdEJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKTtcbiAgfVxuICBfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19yZXN1bHRCdWZmZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX3Jlc3VsdEJ1ZmZlcik7XG4gICAgICB0aGlzLl9fcmVzdWx0QnVmZmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYpO1xuICAgICAgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogRnJlZSBQcmV2SW1hZ2UgYnVmZmVyICovXG4gIF9fZGVzdHJveVByZXZJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5fX1ByZXZJbWFnZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fUHJldkltYWdlKTtcbiAgICAgIHRoaXMuX19QcmV2SW1hZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBmcmVlIHN0cmluZyBoZWFwIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCkge1xuICAgIGlmICh0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIGZyZWUgc2Nhbm5lciBhZGRyZXNzICovXG4gIF9fZGVzdHJveVNjYW5uZXJBZGRyZXNzKCkge1xuICAgIGlmICh0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjaykge1xuICAgICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2soKTtcbiAgICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUodmlkZW9FbGVtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgcmVzb2x1dGlvblRleHRcbiAgICB9ID0gYXdhaXQgdGhpcy5fX3NldFZpZGVvUmVzb2x1dGlvbih2aWRlb0VsZW1lbnQpO1xuICAgIGlmICghaXNTdXBwb3J0ZWRSZXNvbHV0aW9uKSB7XG4gICAgICBpZiAocmVzb2x1dGlvblRleHQgIT09ICdub3QgcmVhZHknKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzU3VwcG9ydGVkUmVzb2x1dGlvbjtcbiAgfVxuICBfX2dldFJvdGF0aW9uRGVncmVlKCkge1xuICAgIHJldHVybiAodGhpcy5fX29wdGlvbnMucm90YXRpb25EZWdyZWUgJSAzNjAgKyAzNjApICUgMzYwO1xuICB9XG4gIF9fZ2V0TWlycm9yTW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnMubWlycm9yTW9kZTtcbiAgfVxuICBhc3luYyBfX2Nyb3BJbWFnZUZyb21WaWRlbygpIHtcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICBsZXQgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG5cbiAgICAvLyBzb3VyY2UgaW1hZ2UgKG9yIHZpZGVvKVxuICAgIC8vIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUk1xuICAgIC8vIOKUgyAgICAg4pSKIHN5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSD4pSI4pSI4pSI4pSIIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUkyDilIogICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgc3ggIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogc0hlaWdodCAgICAgICDilINcbiAgICAvLyDilIMgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICAgICAgICDilIMgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiBjYW52YXNcbiAgICAvLyDilIMgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyDilIogICAgICAgICAgICAgICDilIPilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJNcbiAgICAvLyDilIMgICAgIOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiCAgICAgICAgICAgICAgICAg4pSDICAgIOKUiiAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAgICAgICAgc1dpZHRoICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICDilIogZHkgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsgICAg4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg+KUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgZHggICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogZEhlaWdodCDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiCAgICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICAgICAgICBkV2lkdGggICAgICAgICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBkeCwgZHkpXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodClcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodClcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEL2RyYXdJbWFnZVxuXG4gICAgbGV0IGNhbGNDYW52YXMgPSBjYW52YXM7XG4gICAgbGV0IGNhbGNWaWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvSGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudFdpZHRoID0gdmlkZW8uY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9IHZpZGVvLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCA9IHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGg7XG4gICAgbGV0IGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0ID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNDcm9wSW1hZ2VTaXplV2lkdGgsIGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0XSA9IFtjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCwgY2FsY0Nyb3BJbWFnZVNpemVXaWR0aF07XG4gICAgICBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbY2FsY1Jlc29sdXRpb25faCwgY2FsY1Jlc29sdXRpb25fd107XG4gICAgICBjYWxjQ2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgICBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uID09PSAncG9ydHJhaXQnID8gJ2xhbmRzY2FwZScgOiAncG9ydHJhaXQnO1xuICAgIH1cbiAgICBsZXQgY2FsY01heFNXaWR0aCA9IDk5OTk5O1xuICAgIGxldCBjYWxjTWF4U0hlaWdodCA9IDk5OTk5O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDshLjroZwgVUkgLyDshLjroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTV2lkdGggPSBjYWxjVmlkZW9XaWR0aDtcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDshLjroZwgVUkgLyDqsIDroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAvIOqwgOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDqsIDroZwgVUkgLyDshLjroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTV2lkdGggPSBjYWxjVmlkZW9XaWR0aDtcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzeCwgc3k7XG4gICAgY29uc3QgcmF0aW8gPSBjYWxjVmlkZW9XaWR0aCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IHNXaWR0aCA9IE1hdGgubWluKE1hdGgucm91bmQoY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCAqIHJhdGlvKSwgY2FsY01heFNXaWR0aCk7XG4gICAgY29uc3Qgc0hlaWdodCA9IE1hdGgubWluKE1hdGgucm91bmQoY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQgKiByYXRpbyksIGNhbGNNYXhTSGVpZ2h0KTtcbiAgICBzeCA9IE1hdGgubWF4KE1hdGgucm91bmQoKGNhbGNWaWRlb0NsaWVudFdpZHRoIC0gY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCkgLyAyICogcmF0aW8pLCAwKTtcbiAgICBzeSA9IE1hdGgubWF4KE1hdGgucm91bmQoKGNhbGNWaWRlb0NsaWVudEhlaWdodCAtIGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0KSAvIDIgKiByYXRpbyksIDApO1xuICAgIGlmIChpc0FsaWVuQmFjaykge1xuICAgICAgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW2NhbGNSZXNvbHV0aW9uX2gsIGNhbGNSZXNvbHV0aW9uX3ddO1xuICAgIH1cbiAgICBjYWxjQ2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjYWxjUmVzb2x1dGlvbl93KTtcbiAgICBjYWxjQ2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgY29uc3QgY2FsY0NvbnRleHQgPSBjYWxjQ2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgfSk7XG4gICAgY2FsY0NvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgbGV0IGltZ0RhdGEsIGltZ0RhdGFVcmw7XG4gICAgaW1nRGF0YSA9IGNhbGNDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBpbWdEYXRhVXJsID0gY2FsY0NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgICBpZiAoaXNBbGllbkJhY2spIHtcbiAgICAgIFtpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgMjcwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCB0aGlzLl9fZ2V0Um90YXRpb25EZWdyZWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbaW1nRGF0YSwgaW1nRGF0YVVybF07XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIGRlZ3JlZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChkZWdyZWUgPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZShbaW1nRGF0YSwgaW1nRGF0YVVybF0pO1xuICAgICAgfVxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBpbWcuc3JjID0gaW1nRGF0YVVybDtcbiAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBjYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICAgICAgY29uc3QgdGVtcENvbnRleHQgPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRlbXBDYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBpZiAoWzkwLCAyNzBdLmluY2x1ZGVzKGRlZ3JlZSkpIHtcbiAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gaW1nLmhlaWdodDtcbiAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGltZy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChbMCwgMTgwXS5pbmNsdWRlcyhkZWdyZWUpKSB7XG4gICAgICAgICAgdGVtcENhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZ3JlZSA9PT0gOTApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZShpbWcuaGVpZ2h0LCAwKTtlbHNlIGlmIChkZWdyZWUgPT09IDE4MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKGltZy53aWR0aCwgaW1nLmhlaWdodCk7ZWxzZSBpZiAoZGVncmVlID09PSAyNzApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZSgwLCBpbWcud2lkdGgpO1xuICAgICAgICB0ZW1wQ29udGV4dC5yb3RhdGUoZGVncmVlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRlbXBDb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgICBjb25zdCBuZXdJbWFnZURhdGEgPSBbOTAsIDI3MF0uaW5jbHVkZXMoZGVncmVlKSA/IHRlbXBDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBpbWcuaGVpZ2h0LCBpbWcud2lkdGgpIDogdGVtcENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgIHJlc29sdmUoW25ld0ltYWdlRGF0YSwgdGVtcENhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKV0pO1xuICAgICAgICB0ZW1wQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIGJveFR5cGUgPSAwLCByZXRyeUltZyA9IG51bGwpIHtcbiAgICBpZiAoIWFkZHJlc3MgfHwgYWRkcmVzcyA8IDApIHtcbiAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbGV0IGltZ0RhdGE7XG4gICAgICBsZXQgaW1nRGF0YVVybCA9IG51bGw7XG4gICAgICBjb25zdCBbYnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGlmIChyZXRyeUltZyAhPT0gbnVsbCkge1xuICAgICAgICBpbWdEYXRhID0gcmV0cnlJbWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICB9XG4gICAgICBpZiAoISEhaW1nRGF0YSkge1xuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguc2V0KGltZ0RhdGEuZGF0YSwgYnVmZmVyKTtcbiAgICAgIGxldCBrb3IgPSBmYWxzZSxcbiAgICAgICAgYWxpZW4gPSBmYWxzZSxcbiAgICAgICAgcGFzc3BvcnQgPSBmYWxzZTtcbiAgICAgIHN3aXRjaCAodGhpcy5fX29jclR5cGUpIHtcbiAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgIGtvciA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBwYXNzcG9ydCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgYWxpZW4gPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgIC8vIG5vdGhpbmdcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgICB9XG4gICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgIGlmIChrb3IgfHwgcGFzc3BvcnQgfHwgYWxpZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5kZXRlY3RfaWRjYXJkX29wdChidWZmZXIsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCBhZGRyZXNzLCBrb3IsIGFsaWVuLCBwYXNzcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmRldGVjdF9pZGNhcmQoYnVmZmVyLCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgYWRkcmVzcywgYm94VHlwZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdpc0NhcmRib3hEZXRlY3RlZCByZXN1bHQgLT0tLS0tLScsIHJlc3VsdClcbiAgICAgIHJldHVybiBbISFyZXN1bHQsIGltZ0RhdGEsIGltZ0RhdGFVcmxdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnQ2FyZCBkZXRlY3Rpb24gZXJyb3IgOiAnICsgZTtcbiAgICAgIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ21lbW9yeScpKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgX19zdGFydFJlY29nbml0aW9uKGFkZHJlc3MsIG9jclR5cGUsIHNzYU1vZGUsIGlzU2V0SWdub3JlQ29tcGxldGUsIGltZ0RhdGEsIGltZ0RhdGFVcmwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGFkZHJlc3MgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChhZGRyZXNzID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJ2NoZWNrVmFsaWRhdGlvbiBGYWlsJztcbiAgICAgIH1cbiAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsO1xuICAgICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICAgIGNvbnN0IFssIHJlc3VsdEJ1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBjb25zdCByZWNvZ25pdGlvbiA9IGFzeW5jIGlzU2V0SWdub3JlQ29tcGxldGUgPT4ge1xuICAgICAgICBpZiAoaXNTZXRJZ25vcmVDb21wbGV0ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCAwLCBpbWdEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9jclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5JRENhcmQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhblBhc3Nwb3J0KGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkFsaWVuKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkFsaWVuQmFjayhhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkNyZWRpdChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkb2VzIG5vdCBleGlzdHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IOyLoOyaqey5tOuTnOuKlCDslYTsp4Ega2V5OnZhbHVlIO2Yle2DnOuhnCDrs4DtmZgg7JWI65CY7Ja0IOyeiOydjFxuICAgICAgICBpZiAob2NyVHlwZSA9PT0gJ2NyZWRpdCcpIHtcbiAgICAgICAgICBpZiAob2NyUmVzdWx0ID09PSBudWxsIHx8IG9jclJlc3VsdCA9PT0gJycgfHwgb2NyUmVzdWx0ID09PSAnZmFsc2UnIHx8IG9jclJlc3VsdFswXSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX2NzdlRvT2JqZWN0KG9jclJlc3VsdCk7XG4gICAgICAgIGlmIChvY3JSZXN1bHQ/LmNvbXBsZXRlICE9PSAndW5kZWZpbmVkJyAmJiBvY3JSZXN1bHQ/LmNvbXBsZXRlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNTZXRJZ25vcmVDb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50IDwgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgICAgLy8gZGV0ZWN0ZWRDYXJkUXVldWXsl5DshJwg7ZWc7J6l7J2EIOq6vOuCtOyEnCDqsLHsi6DtlZzri6QuXG4gICAgICAgICAgICAgIC8vIOyggOyepeuQmOyWtOyeiOuKlCDsnbTrr7jsp4DsnZgg7Iir7J6Q6rCAIHJldHJ5IOuztOuLpCDsnpHsnYDqsr3smrAg64yA67mE7ZWY7JesICXrpbwg7IKs7Jqp7ZWoXG4gICAgICAgICAgICAgIGNvbnN0IHF1ZXVlSWR4ID0gdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgJSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICBpbWdEYXRhID0gdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlW3F1ZXVlSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlY29nbml0aW9uKGlzU2V0SWdub3JlQ29tcGxldGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8g7IKs7KeEIO2VnOyepeycvOuhnCBPQ1Ig7Iuk7YyoIChwb3B1cCDrgrTrpqzqs6Agc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpIOyymOumrD9cbiAgICAgICAgICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7IC8vIO2MneyXheydtCDrgrTroKTqsIjrlYwg7LKY66as65CY7KeA66eMIOuvuOumrCDsspjrpqxcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVELCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIGVuZCBvZiBmdW5jdGlvbiByZWNvZ25pdGlvbigpXG5cbiAgICAgIGlmIChhd2FpdCByZWNvZ25pdGlvbihpc1NldElnbm9yZUNvbXBsZXRlKSkge1xuICAgICAgICBjb25zdCBpc0NyZWRpdENhcmQgPSBvY3JUeXBlID09PSAnY3JlZGl0JztcbiAgICAgICAgbGV0IG9jckltYWdlTW9kZTtcbiAgICAgICAgaWYgKGlzQ3JlZGl0Q2FyZCkge1xuICAgICAgICAgIG9jckltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLkNST1BQSU5HO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLnVzZUltYWdlV2FycGluZykge1xuICAgICAgICAgIG9jckltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLldBUlBJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2NySW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuTk9ORTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3JpZ2luSW1hZ2UgPSBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5GQUxTRSwgb2NySW1hZ2VNb2RlKTtcbiAgICAgICAgbGV0IG1hc2tJbWFnZSA9IG51bGw7XG4gICAgICAgIGxldCBmYWNlSW1hZ2UgPSBudWxsO1xuICAgICAgICBpZiAoIWlzQ3JlZGl0Q2FyZCkge1xuICAgICAgICAgIG1hc2tJbWFnZSA9IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLlRSVUUsIHRoaXMuT0NSX0lNR19NT0RFLldBUlBJTkcpO1xuICAgICAgICAgIG1hc2tJbWFnZSA9IG1hc2tJbWFnZSA9PT0gJ2RhdGE6JyA/IG51bGwgOiBtYXNrSW1hZ2U7XG4gICAgICAgICAgZmFjZUltYWdlID0gdGhpcy5fX29wdGlvbnMudXNlRmFjZUltYWdlID8gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIG51bGwsIG9jckltYWdlTW9kZSwgJ2ZhY2UnKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNzYU1vZGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQSwgZmFsc2UsIG1hc2tJbWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgLy8gaWYgKCFpc0NyZWRpdENhcmQgJiYgdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpIHtcbiAgICAgICAgLy8gICBvcmlnaW5JbWFnZSA9IHRoaXMuX19nZXRQaWlFbmNyeXB0SW1hZ2VCYXNlNjQoXG4gICAgICAgIC8vICAgICBhZGRyZXNzLFxuICAgICAgICAvLyAgICAgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5GQUxTRSxcbiAgICAgICAgLy8gICAgIG9jckltYWdlTW9kZVxuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2VuY3J5cHQgYmFzZTY0IGltYWdlJywgeyBvcmlnaW5JbWFnZSB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBpZiAoZmFjZUltYWdlICYmIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRGYWNlKSB7XG4gICAgICAgIC8vICAgZmFjZUltYWdlID0gdGhpcy5fX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChcbiAgICAgICAgLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vICAgICBudWxsLFxuICAgICAgICAvLyAgICAgb2NySW1hZ2VNb2RlLFxuICAgICAgICAvLyAgICAgJ2ZhY2UnXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZW5jcnlwdCBiYXNlNjQgZmFjZSBpbWFnZScsIHsgZmFjZUltYWdlIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gICAgICAgIHJldHVybiBbb2NyUmVzdWx0LCBvcmlnaW5JbWFnZSwgbWFza0ltYWdlLCBmYWNlSW1hZ2VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgX19zdGFydFRydXRoKG9jclR5cGUsIGFkZHJlc3MpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgWywgcmVzdWx0QnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGlmIChvY3JUeXBlLmluZGV4T2YoJy1zc2EnKSA+IC0xKSB7XG4gICAgICAgIC8vIFRPRE86IHdvcmtlcuulvCDsgqzsmqntlZjsl6wg66mU7J24KFVJIOuenOuNlOungSkg7Iqk66CI65Oc6rCAIOupiOy2lOyngCDslYrrj4TroZ0g7LKY66asIO2VhOyalCAo7ZiE7J6sIGxvYWRpbmcgVUkg652E7Jqw66m0IOyVoOuLiOuplOydtOyFmCDrqYjstqQpXG4gICAgICAgIC8vIFRPRE86IHNldFRpbWVvdXQg7Jy866GcIOuCmOuIhOuNlOudvOuPhCDtmqjqs7wg7JeG7J2MIHNldFRpbWVvdXQg7KeA7Jqw6rOgLCB3b3JrZXLroZwg67OA6rK9IO2VhOyalFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuX19PQ1JFbmdpbmUuc2NhblRydXRoKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcikpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU1NBIE1vZGUgaXMgdHJ1ZS4gYnV0LCBvY3JUeXBlIGlzIGludmFsaWQgOiAnICsgb2NyVHlwZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fY3N2VG9PYmplY3Qoc3RyKSB7XG4gICAgbGV0IHBhaXJzID0gc3RyLnNwbGl0KCc7Jyk7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJzonKTtcbiAgICAgIGlmIChwYWlyLmxlbmd0aCA9PT0gMikgb2JqW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBfX2dldE1hc2tJbmZvKGFkZHJlc3MpIHtcbiAgICBpZiAoYWRkcmVzcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChhZGRyZXNzID09PSAtMSkge1xuICAgICAgcmV0dXJuICdjaGVja1ZhbGlkYXRpb24gRmFpbCc7XG4gICAgfVxuICAgIGNvbnN0IFssLCBtYXNrSW5mb1Jlc3VsdEJ1Zl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5nZXRNYXNrUmVjdChhZGRyZXNzLCBtYXNrSW5mb1Jlc3VsdEJ1Zik7XG4gICAgaWYgKHJlc3VsdCA9PSBudWxsIHx8IHJlc3VsdCA9PT0gJycpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyB0aGlzLl9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCk7XG5cbiAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsID8gbnVsbCA6IHRoaXMuX19jc3ZUb09iamVjdChyZXN1bHQpO1xuICB9XG4gIGFzeW5jIF9fc3RhcnRUcnV0aFJldHJ5KG9jclR5cGUsIGFkZHJlc3MsIGltZ0RhdGEpIHtcbiAgICBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgMCwgaW1nRGF0YSk7XG4gICAgLy8gYXdhaXQgdGhpcy5fX3N0YXJ0UmVjb2duaXRpb24oYWRkcmVzcywgb2NyVHlwZSwgdHJ1ZSk7ICAgICAgLy8gZm9yIOyEseuKpeydhCDsnITtlbQg7KeE7ZaJIFhcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGgob2NyVHlwZSwgYWRkcmVzcyk7XG4gIH1cbiAgX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCkge1xuICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICB0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gMey0iCBkZWxheSDtm4Qg7Iuk7ZaJXG4gICAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICB9LCB0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsKTtcbiAgfVxuICBhc3luYyBfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgICBjb25zdCBpc1Bhc3Nwb3J0ID0gdGhpcy5fX29jclR5cGUuaW5jbHVkZXMoJ3Bhc3Nwb3J0Jyk7XG4gICAgICBhd2FpdCB0aGlzLl9fc2V0dXBWaWRlbyhpc1Bhc3Nwb3J0KTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgaWYgKHZpZGVvKSB7XG4gICAgICAgIC8vIGNvbnN0IFt0cmFja10gPSB0aGlzLl9fc3RyZWFtLmdldFZpZGVvVHJhY2tzKCk7XG4gICAgICAgIC8vIGNvbnN0IGNhcGFiaWxpdHkgPSB0cmFjay5nZXRDYXBhYmlsaXRpZXMoKTtcbiAgICAgICAgLy8gY29uc29sZS5kZWJ1ZygnQ2FyZFNjYW5fX2luaXRpYWxpemUgY2FwYWJpbGl0eScsIGNhcGFiaWxpdHkpO1xuICAgICAgICBpZiAoJ3NyY09iamVjdCcgaW4gdmlkZW8pIHtcbiAgICAgICAgICB2aWRlby5zcmNPYmplY3QgPSB0aGlzLl9fc3RyZWFtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEF2b2lkIHVzaW5nIHRoaXMgaW4gbmV3IGJyb3dzZXJzLCBhcyBpdCBpcyBnb2luZyBhd2F5LlxuICAgICAgICAgIHZpZGVvLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuX19zdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgKCkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIC0gb25sb2FkZWRtZXRhZGF0YScpO1xuICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuXG4gICAgICAgICAgLy8gdmlkZW8gZWxlbWVudCBzdHlsZSDshKTsoJVcbiAgICAgICAgICB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9IHZpZGVvLnZpZGVvV2lkdGggLyB2aWRlby52aWRlb0hlaWdodCA8IDEgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdGhpcy5fX2NhbVNldENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fYWRqdXN0U3R5bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLlJFQURZKTtcbiAgICAgICAgdmlkZW8ud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RBbGxvd2VkRXJyb3InKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdDYW1lcmEgQWNjZXNzIFBlcm1pc3Npb24gaXMgbm90IGFsbG93ZWQnO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U0MDMnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChlLm5hbWUgPT09ICdOb3RSZWFkYWJsZUVycm9yJykge1xuICAgICAgICAvLyDri6Trpbjqs7Psl5DshJwg7Lm066mU6528IOyekOybkOydhCDsgqzsmqnspJFcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0IDwgMCkge1xuICAgICAgICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIO2an+yImOygnO2VnCDsl4bsnYxcbiAgICAgICAgICB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50ICs9IDE7XG4gICAgICAgICAgdGhpcy5fX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTsgLy8g7J6s6reAIO2YuOy2nFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0ID4gdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCArPSAxO1xuICAgICAgICAgICAgdGhpcy5fX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTsgLy8g7J6s6reAIO2YuOy2nFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIHBlcm1pc3Npb25zIHdlcmUgZ3JhbnRlZCwgYnV0IEZhaWxlZCB0byBhY3F1aXJlIENhbWVyYSByZXNvdXJjZXMuJztcbiAgICAgICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDAzJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgX19zZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgICBpZiAoZWwgJiYgc3R5bGUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgX19jaGFuZ2VPQ1JTdGF0dXModmFsKSB7XG4gICAgc3dpdGNoICh2YWwpIHtcbiAgICAgIC8vIE9DUlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLlJFQURZOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLlJFQURZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRDpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1M6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0E6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRDpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5ET05FO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19jaGFuZ2VTdGFnZSh2YWwsIGZvcmNlVXBkYXRlID0gZmFsc2UsIHJlY29nbml6ZWRJbWFnZSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5fX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPT09IHZhbCAmJiBmb3JjZVVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2NoYW5nZU9DUlN0YXR1cyh2YWwpO1xuICAgIHRoaXMuX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdmFsO1xuICAgIHRoaXMuX19pblByb2dyZXNzU3RlcCA9IHZhbDtcbiAgICBjb25zdCB7XG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgYm9yZGVyV2lkdGg6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGggKyAncHgnLFxuICAgICAgYm9yZGVyU3R5bGU6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUuc3R5bGUsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlckNvbG9yOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlW3ZhbF1cbiAgICB9O1xuICAgIGlmIChndWlkZUJveCkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCBzdHlsZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSkge1xuICAgICAgaWYgKCEhdGhpcy5fX29wdGlvbnMuc2hvd0NsaXBGcmFtZSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXNrQm94V3JhcD8ucXVlcnlTZWxlY3RvcignI21hc2tCb3hPdXRlcicpPy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZVt2YWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgY2FwdHVyZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcignI2NhcHR1cmVCdXR0b24nKT8uc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fX29wdGlvbnMuY2FwdHVyZUJ1dHRvblN0eWxlWydiYXNlX2NvbG9yJ10pO1xuICAgIH1cbiAgICBjb25zdCBvY3JNb2RlID0gdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID8gJ3NlcnZlcicgOiAnd2FzbSc7XG4gICAgaWYgKHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VUb3BVSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX190b3BVSSwgJ3RvcCcsIHRoaXMuX19vcHRpb25zLnVzZVRvcFVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fbWlkZGxlVUksICdtaWRkbGUnLCB0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJIHx8IHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX2JvdHRvbVVJLCAnYm90dG9tJywgdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTIHx8IHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpO1xuXG4gICAgICAgIC8vIEZBSUzsnbgg6rK97JqwIDXstIjtm4Qg7J6Q64+Z7J2EIOywveuLq+ydjFxuICAgICAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCkge1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5fX2hpZGVQcmV2aWV3VUksIDMwMDAsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0EpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9faGlkZVByZXZpZXdVSSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMSk7IC8vIGZvciBVSSB1cGRhdGVcbiAgfVxuXG4gIF9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVjb2duaXplZEltYWdlO1xuICAgIGNvbnN0IGltZ1N0eWxlID0ge1xuICAgICAgJ21heC13aWR0aCc6ICc3MCUnLFxuICAgICAgJ21heC1oZWlnaHQnOiAnNjAlJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdJbWFnZSwgaW1nU3R5bGUpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCB7XG4gICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICB9KTtcbiAgfVxuICBfX2hpZGVQcmV2aWV3VUkoY29udGV4dCkge1xuICAgIGxldCBfdGhpc18gPSB0aGlzO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBfdGhpc18gPSBjb250ZXh0O1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBfdGhpc18uX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0pO1xuICAgIF90aGlzXy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSAnJztcbiAgfVxuICBhc3luYyBfX2dldElucHV0RGV2aWNlcygpIHtcbiAgICAvLyB0aHJvdyBlcnJvciBpZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICBsZXQgY2FtZXJhID0gW107XG4gICAgZm9yIChjb25zdCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgaWYgKGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoZGV2aWNlIGluc3RhbmNlb2YgSW5wdXREZXZpY2VJbmZvKSB7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmdldENhcGFiaWxpdGllcykge1xuICAgICAgICAgICAgICBjb25zdCBjYXAgPSBkZXZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgICAgICAgIGlmIChjYXA/LmZhY2luZ01vZGU/LmluY2x1ZGVzKHRoaXMuX19mYWNpbmdNb2RlQ29uc3RyYWludCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1VsdHJhQ2FtZXJhUmVnID0gL3VsdHJhfOyauO2KuOudvC9naTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbHRyYUNhbWVyYVJlZy50ZXN0KGRldmljZS5sYWJlbD8udG9Mb3dlckNhc2UoKSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhbWVyYS5wdXNoKGNhcC5kZXZpY2VJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpT1MgMTcg66+466eM7J2YIGNocm9tZSwgc2FmYXJpIOyXkOyEnOuKlFxuICAgICAgICAgIC8vIElucHV0RGV2aWNlSW5mbyDqsJ3ssrTqsIAg7JeG7Ja07IScIGdldENhcGFiaWxpdGllc+ulvCDtmZXsnbjtlaAg7IiYIOyXhuq4sCDrlYzrrLjsl5BcbiAgICAgICAgICAvLyBkZXZpY2UgbGFiZWzrp4wg67O06rOgIO2bhOuptCDsubTrqZTrnbzroZwg7IKs7JqpXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgaXNCYWNrQ2FtZXJhUmVnID0gL2JhY2t87ZuE66m0L2c7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmxhYmVsPy5sZW5ndGggJiYgaXNCYWNrQ2FtZXJhUmVnLnRlc3QoZGV2aWNlLmxhYmVsKSkge1xuICAgICAgICAgICAgICBjYW1lcmEucHVzaChkZXZpY2UuZGV2aWNlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fZGVidWcoYGNhbWVyYSA9ICR7Y2FtZXJhfSwgY2FtZXJhLmxlbmd0aCA9ICR7Y2FtZXJhLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG4gIGNoZWNrVUlPcmllbnRhdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGV0ZWN0b3IuZ2V0VUlPcmllbnRhdGlvbihkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm9jcik7XG4gICAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50ICE9PSB0aGlzLl9fcHJldlVpT3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX191aU9yaWVudGF0aW9uID0gY3VycmVudDtcbiAgICAgIHRoaXMuX19wcmV2VWlPcmllbnRhdGlvbiA9IGN1cnJlbnQ7XG4gICAgICBpc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudCxcbiAgICAgIGlzQ2hhbmdlZFxuICAgIH07XG4gIH1cbiAgX19jbGVhckN1c3RvbVVJKG9iaikge1xuICAgIG9iai5pbm5lckhUTUwgPSAnJztcbiAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKG9iaiwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19zZXR1cERvbUVsZW1lbnRzKCkge1xuICAgIGxldCB7XG4gICAgICBvY3IsXG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveFdyYXAsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLFxuICAgICAgY3VzdG9tVUlXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b24sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld1VJLFxuICAgICAgcHJldmlld0ltYWdlLFxuICAgICAgc3dpdGNoVUlXcmFwLFxuICAgICAgc3dpdGNoVUksXG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLFxuICAgICAgcHJlbG9hZGluZ1VJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKCFvY3IpIHRocm93IG5ldyBFcnJvcignb2NyIGRpdiBlbGVtZW50IGlzIG5vdCBleGlzdCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHZpZGVvV3JhcC5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3hXcmFwKSBndWlkZUJveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHZpZGVvKSB2aWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY2FudmFzKSBjYW52YXMucmVtb3ZlKCk7XG4gICAgaWYgKHJvdGF0aW9uQ2FudmFzKSByb3RhdGlvbkNhbnZhcy5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3gpIGd1aWRlQm94LnJlbW92ZSgpO1xuICAgIGlmIChtYXNrQm94V3JhcCkgbWFza0JveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKSBwcmV2ZW50VG9GcmVlemVWaWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY3VzdG9tVUlXcmFwKSBjdXN0b21VSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8g6rCBIHRvcCwgbWlkZGxlLCBib3R0b20gVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmICh0b3BVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHRvcFVJKTtcbiAgICBpZiAobWlkZGxlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShtaWRkbGVVSSk7XG4gICAgaWYgKGJvdHRvbVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoYm90dG9tVUkpO1xuICAgIGlmIChjYXB0dXJlVUlXcmFwKSBjYXB0dXJlVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIGNhcHR1cmUgVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChjYXB0dXJlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoY2FwdHVyZVVJKTtcbiAgICBpZiAocHJldmlld1VJV3JhcCkgcHJldmlld1VJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBwcmV2aWV3IFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAocHJldmlld1VJICYmICF0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHByZXZpZXdVSSk7XG4gICAgaWYgKHN3aXRjaFVJV3JhcCkgc3dpdGNoVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIHN3aXRjaCBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHN3aXRjaFVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHRoaXMuX19jbGVhckN1c3RvbVVJKHN3aXRjaFVJKTtcbiAgICBpZiAocHJlbG9hZGluZ1VJV3JhcCkgcHJlbG9hZGluZ1VJV3JhcC5yZW1vdmUoKTtcbiAgICBjb25zdCByb3RhdGlvbkRlZ3JlZSA9IHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpO1xuICAgIHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID0gWzkwLCAyNzBdLmluY2x1ZGVzKHJvdGF0aW9uRGVncmVlKTtcbiAgICBsZXQgb2NyU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIG9jclN0eWxlKTtcbiAgICBjb25zdCB3cmFwU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIC8vIHZlcnRpY2FsIGFsaWduIG1pZGRsZVxuICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgfTtcbiAgICB2aWRlb1dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2aWRlb1dyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvV3JhcCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHtcbiAgICAgIHdoaWxlICh2aWRlb1dyYXAuZmlyc3RDaGlsZCkge1xuICAgICAgICB2aWRlb1dyYXAucmVtb3ZlQ2hpbGQodmlkZW9XcmFwLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW9XcmFwLCB3cmFwU3R5bGUpO1xuICAgIH1cbiAgICBvY3IuYXBwZW5kQ2hpbGQodmlkZW9XcmFwKTtcbiAgICBtYXNrQm94V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdtYXNrQm94V3JhcCcpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShtYXNrQm94V3JhcCwgd3JhcFN0eWxlKTtcbiAgICBsZXQgbWFza19mcmFtZSA9IHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlLmJhc2VfY29sb3IgKyAnZmYnO1xuICAgIGlmICghIXRoaXMuX19vcHRpb25zLnNob3dDbGlwRnJhbWUpIHtcbiAgICAgIG1hc2tfZnJhbWUgPSB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZS5jbGlwX2ZyYW1lICsgJzU1JztcbiAgICB9XG4gICAgbWFza0JveFdyYXAuaW5uZXJIVE1MID0gJycgKyBcIiAgPHN2ZyBpZD0nbWFza0JveENvbnRhaW5lcicgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cXG5cIiArIFwiICAgIDxtYXNrIGlkPSdtYXNrLXJlY3QnPlxcblwiICsgXCIgICAgICA8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxcblwiICsgXCIgICAgICA8c3ZnIHg9JzUwJScgeT0nNTAlJyBvdmVyZmxvdz0ndmlzaWJsZSc+XFxuXCIgKyBcIiAgICAgICAgICA8cmVjdCBpZD0nbWFza0JveElubmVyJ1xcblwiICsgXCIgICAgICAgICAgICB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI2MCdcXG5cIiArIFwiICAgICAgICAgICAgeD0nLTIwMCcgeT0nLTEzMCdcXG5cIiArIFwiICAgICAgICAgICAgcng9JzEwJyByeT0nMTAnXFxuXCIgKyBcIiAgICAgICAgICAgIGZpbGw9J2JsYWNrJyBzdHJva2U9J2JsYWNrJz48L3JlY3Q+XFxuXCIgKyAnICAgICAgPC9zdmc+XFxuJyArICcgICAgPC9tYXNrPlxcbicgKyBcIiAgICA8cmVjdCBpZD0nbWFza0JveE91dGVyJ1xcblwiICsgXCIgICAgICAgICAgeD0nMCcgeT0nMCcgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJSdcXG5cIiArIFwiICAgICAgICAgIGZpbGw9J1wiICsgbWFza19mcmFtZSArIFwiJyBtYXNrPSd1cmwoI21hc2stcmVjdCknPjwvcmVjdD5cXG5cIiArICcgIDwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKG1hc2tCb3hXcmFwKTtcbiAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdtdXRlZCcsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgbGV0IHZpZGVvU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICB9O1xuICAgIGNvbnN0IHJvdGF0ZUNzcyA9ICdyb3RhdGUoJyArIHJvdGF0aW9uRGVncmVlICsgJ2RlZyknO1xuICAgIGNvbnN0IG1pcnJvckNzcyA9ICdyb3RhdGVZKDE4MGRlZyknO1xuICAgIGNvbnN0IHJvdGF0ZUFuZE1pcnJvckNzcyA9IG1pcnJvckNzcyArICcgJyArIHJvdGF0ZUNzcztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIGlmICh0aGlzLl9fZ2V0TWlycm9yTW9kZSgpKSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVBbmRNaXJyb3JDc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVDc3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX19nZXRNaXJyb3JNb2RlKCkpIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IG1pcnJvckNzc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHZpZGVvU3R5bGUpO1xuICAgIHZpZGVvV3JhcC5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgZ3VpZGVCb3hXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3VpZGVCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdndWlkZUJveFdyYXAnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3hXcmFwLCB3cmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChndWlkZUJveFdyYXApO1xuICAgIGd1aWRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2d1aWRlQm94Jyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSk7XG4gICAgZ3VpZGVCb3hXcmFwLmFwcGVuZENoaWxkKGd1aWRlQm94KTtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdub25lJyA6ICdkaXNwbGF5JyA6ICdub25lJyxcbiAgICAgIHdpZHRoOiAnMjUlJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgbGVmdDogJzBweCcsXG4gICAgICB0b3A6ICczMHB4JyxcbiAgICAgIGJvcmRlcjogJ2dyZWVuIDJweCBzb2xpZCdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYW52YXMsIGNhbnZhc1N0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICByb3RhdGlvbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHJvdGF0aW9uQ2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdyb3RhdGlvbkNhbnZhcycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShyb3RhdGlvbkNhbnZhcywge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdkaXNwbGF5JyA6ICdub25lJyA6ICdub25lJyxcbiAgICAgIGhlaWdodDogJzI1JScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgIHRvcDogJzMwcHgnLFxuICAgICAgYm9yZGVyOiAnYmx1ZSAycHggc29saWQnXG4gICAgfSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKHJvdGF0aW9uQ2FudmFzKTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2ZW50VG9GcmVlemVWaWRlbycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2ZW50VG9GcmVlemVWaWRlbywge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206ICcxMCcsXG4gICAgICByaWdodDogJzEwJ1xuICAgIH0pO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLmlubmVySFRNTCA9ICcnICsgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKTtcbiAgICBjdXN0b21VSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjdXN0b21VSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2N1c3RvbVVJV3JhcCcpO1xuICAgIGNvbnN0IGN1c3RvbVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjdXN0b21VSVdyYXAsIGN1c3RvbVVJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY3VzdG9tVUlXcmFwKTtcblxuICAgIC8vIOqwgSB0b3AsIG1pZGRsZSwgYm90dG9tIFVJIOyCrOyaqSh1c2Up7Jes67aA7JmAIOq0gOqzhOyXhuydtCDsmIHsl63snYQg7J6h6riwIOychO2VtCwgZGl26rCAIOyXhuycvOuptCDsg53shLFcbiAgICAvLyBhZGp1c3RTdHlsZSgpIOyXkOyEnCDshLjrtoDsoIHsnbgg7IKs7J207KaI7JmAIOychOy5mOqwkiDrj5nsoIHsnLzroZwg7ISk7KCV65CoLlxuICAgIGlmICghdG9wVUkpIHtcbiAgICAgIHRvcFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndG9wVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKHRvcFVJKTtcbiAgICBpZiAoIW1pZGRsZVVJKSB7XG4gICAgICBtaWRkbGVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbWlkZGxlVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ21pZGRsZVVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZChtaWRkbGVVSSk7XG4gICAgaWYgKCFib3R0b21VSSkge1xuICAgICAgYm90dG9tVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJvdHRvbVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdib3R0b21VSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQoYm90dG9tVUkpO1xuICAgIGNhcHR1cmVVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjYXB0dXJlVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlVUlXcmFwJyk7XG4gICAgY29uc3QgY2FwdHVyZVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NlbnRlcidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCBjYXB0dXJlVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjYXB0dXJlVUlXcmFwKTtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICBpZiAodGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUZvcmNlQ29tcGxldGVVSSkge1xuICAgICAgICBpZiAoIWNhcHR1cmVVSSkge1xuICAgICAgICAgIGNhcHR1cmVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNhcHR1cmVVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZVVJJyk7XG4gICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhcHR1cmVCdXR0b24pIHtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZUJ1dHRvbicpO1xuICAgICAgICAgIGxldCBjYXB0dXJlQnV0dG9uU3JjU1ZHID0gYGA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPHN2ZyB3aWR0aD0nODAnIGhlaWdodD0nODAnIHZpZXdCb3g9JzAgMCA4MCA4MCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYCAgPGNpcmNsZSBpZD0nY2FwdHVyZUJ1dHRvbicgY3g9JzQwJyBjeT0nNDAnIHI9JzM4JyBmaWxsPScjNTU1NTU1JyBzdHJva2U9JyNmZmZmZmYnIHN0cm9rZS13aWR0aD0nNCcvPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPC9zdmc+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uLmlubmVySFRNTCA9IGNhcHR1cmVCdXR0b25TcmNTVkc7XG4gICAgICAgICAgY2FwdHVyZVVJLmFwcGVuZENoaWxkKGNhcHR1cmVCdXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmVVSVdyYXAuYXBwZW5kQ2hpbGQoY2FwdHVyZVVJKTtcbiAgICAgICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICAgICAgY29uc3QgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjYXB0dXJlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgIHByZXZpZXdVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZXZpZXdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdVSVdyYXAnKTtcbiAgICAgIGNvbnN0IHByZXZpZXdVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwMDAwYWEnXG4gICAgICB9O1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHByZXZpZXdVSVdyYXBTdHlsZSk7XG4gICAgICBvY3IuYXBwZW5kQ2hpbGQocHJldmlld1VJV3JhcCk7XG4gICAgICBpZiAoIXByZXZpZXdVSSkge1xuICAgICAgICBwcmV2aWV3VUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJldmlld1VJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3VUknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUksIHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICAnbWF4LXdpZHRoJzogJzkwJScsXG4gICAgICAgICdtYXgtaGVpZ2h0JzogJzkwJSdcbiAgICAgIH0pO1xuICAgICAgcHJldmlld1VJV3JhcC5hcHBlbmRDaGlsZChwcmV2aWV3VUkpO1xuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2UpIHtcbiAgICAgICAgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld0ltYWdlJyk7XG4gICAgICAgIHByZXZpZXdVSS5hcHBlbmRDaGlsZChwcmV2aWV3SW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICBzd2l0Y2hVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHN3aXRjaFVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUlXcmFwJyk7XG4gICAgICBjb25zdCBzd2l0Y2hVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICcnLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSVdyYXAsIHN3aXRjaFVJV3JhcFN0eWxlKTtcbiAgICAgIG9jci5hcHBlbmRDaGlsZChzd2l0Y2hVSVdyYXApO1xuICAgICAgaWYgKCFzd2l0Y2hVSSkge1xuICAgICAgICBzd2l0Y2hVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzd2l0Y2hVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUknKTtcbiAgICAgICAgbGV0IHN3aXRjaEhUTUwgPSBgYDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPGRpdiBjbGFzcz0nY3VzdG9tLS1sYWJlbCBmbGV4IGp1c3RpZnktY2VudGVyIGFsaWduLWNlbnRlciBnYXAxMCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94Jz5XQVNNPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBjbGFzcz0nc3dpdGNoJz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgICAgPGlucHV0IGlkPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICAgIDxzcGFuIGNsYXNzPSdzbGlkZXIgcm91bmQnPjwvc3Bhbj5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdwcmlvcml0eS1maW5hbmNlLWNvaHRtbEZvcmxpc3QtY2hlY2tib3gnPlNlcnZlcjwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPC9kaXY+YDtcbiAgICAgICAgc3dpdGNoVUkuaW5uZXJIVE1MID0gc3dpdGNoSFRNTDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSSwge1xuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH0pO1xuICAgICAgc3dpdGNoVUlXcmFwLmFwcGVuZENoaWxkKHN3aXRjaFVJKTtcbiAgICAgIGNvbnN0IHN3aXRjaENoZWNrYm94ID0gc3dpdGNoVUkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF07XG4gICAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgICAgY29uc3QgX19vbkNsaWNrU3dpdGNoVUkgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgYXdhaXQgX3RoaXNfLnJlc3RhcnRPQ1IoX3RoaXNfLl9fb2NyVHlwZSwgX3RoaXNfLl9fb25TdWNjZXNzLCBfdGhpc18uX19vbkZhaWx1cmUsIF90aGlzXy5fX29uSW5Qcm9ncmVzc0NoYW5nZSwgdHJ1ZSk7XG4gICAgICB9O1xuICAgICAgc3dpdGNoQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tTd2l0Y2hVSSwge1xuICAgICAgICBvbmNlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgcHJlbG9hZGluZ1VJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSVdyYXAnKTtcbiAgICBjb25zdCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAwMDBmZidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUlXcmFwLCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUlXcmFwKTtcbiAgICBpZiAoIXByZWxvYWRpbmdVSSkge1xuICAgICAgcHJlbG9hZGluZ1VJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcmVsb2FkaW5nVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSScpO1xuICAgICAgcHJlbG9hZGluZ1VJLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGV4dC1pbmZvJyk7XG4gICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MID0gJycgKyAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZyA9PT0gJycgfHwgdGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZykge1xuICAgICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MICs9IHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2c7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUksIHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfSk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUkpO1xuXG4gICAgLy8gbG9hZGluZyBVSSDsnITsuZgg7J6Q66as7J6h6rKMIO2VmOq4sCDsnITtlbRcbiAgICBhd2FpdCB0aGlzLl9faW5pdFN0eWxlKCk7XG5cbiAgICAvLyDtmZTrqbTqs7zrj4Qg7ZiE7IOBIO2VtOqysFxuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIHtcbiAgICAgIGRpc3BsYXk6ICcnXG4gICAgfSk7XG4gICAgdGhpcy5fX29jciA9IG9jcjtcbiAgICB0aGlzLl9fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuX19yb3RhdGlvbkNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgIHRoaXMuX192aWRlbyA9IHZpZGVvO1xuICAgIHRoaXMuX192aWRlb1dyYXAgPSB2aWRlb1dyYXA7XG4gICAgdGhpcy5fX2d1aWRlQm94ID0gZ3VpZGVCb3g7XG4gICAgdGhpcy5fX2d1aWRlQm94V3JhcCA9IGd1aWRlQm94V3JhcDtcbiAgICB0aGlzLl9fbWFza0JveFdyYXAgPSBtYXNrQm94V3JhcDtcbiAgICB0aGlzLl9fcHJldmVudFRvRnJlZXplVmlkZW8gPSBwcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgICB0aGlzLl9fY3VzdG9tVUlXcmFwID0gY3VzdG9tVUlXcmFwO1xuICAgIHRoaXMuX190b3BVSSA9IHRvcFVJO1xuICAgIHRoaXMuX19taWRkbGVVSSA9IG1pZGRsZVVJO1xuICAgIHRoaXMuX19ib3R0b21VSSA9IGJvdHRvbVVJO1xuICAgIHRoaXMuX19jYXB0dXJlVUlXcmFwID0gY2FwdHVyZVVJV3JhcDtcbiAgICB0aGlzLl9fY2FwdHVyZVVJID0gY2FwdHVyZVVJO1xuICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uID0gY2FwdHVyZUJ1dHRvbjtcbiAgICB0aGlzLl9fcHJldmlld1VJV3JhcCA9IHByZXZpZXdVSVdyYXA7XG4gICAgdGhpcy5fX3ByZXZpZXdVSSA9IHByZXZpZXdVSTtcbiAgICB0aGlzLl9fcHJldmlld0ltYWdlID0gcHJldmlld0ltYWdlO1xuICAgIHRoaXMuX19zd2l0Y2hVSVdyYXAgPSBzd2l0Y2hVSVdyYXA7XG4gICAgdGhpcy5fX3N3aXRjaFVJID0gc3dpdGNoVUk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9jcixcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgdmlkZW8sXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveCxcbiAgICAgIGd1aWRlQm94V3JhcCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgcHJldmVudFRvRnJlZXplVmlkZW8sXG4gICAgICBjdXN0b21VSVdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvbixcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3VUksXG4gICAgICBwcmV2aWV3SW1hZ2UsXG4gICAgICBzd2l0Y2hVSVdyYXAsXG4gICAgICBzd2l0Y2hVSVxuICAgIH07XG4gIH1cbiAgX19ibHVyQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgZGlzcGxheTogJydcbiAgICB9KTtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhcHR1cmVCdXR0b24pIHtcbiAgICAgIGNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIF9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcmV0dXJuIGNhcHR1cmVCdXR0b24gPyBjYXB0dXJlQnV0dG9uLmdldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcpID09PSAndHJ1ZScgOiBmYWxzZTtcbiAgfVxuICBhc3luYyBfX3NldHVwVmlkZW8oaXNQYXNzcG9ydCkge1xuICAgIC8vIHdhc20g7J247Iud7ISx64qlIOy1nOygge2ZlOuQnCDtlbTsg4Hrj4RcbiAgICB0aGlzLl9fcmVzb2x1dGlvbldpZHRoID0gMTA4MDtcbiAgICB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCA9IDcyMDtcbiAgICB0aGlzLl9fY2FtU2V0Q29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgbGV0IGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAvLyBjb25zb2xlLmxvZygndmlkZW9EZXZpY2VzIDo6ICcsIGNhbWVyYSlcblxuICAgIHRoaXMuY2hlY2tVSU9yaWVudGF0aW9uKCk7XG4gICAgbGV0IGNvbnN0cmFpbnRXaWR0aCwgY29uc3RyYWludEhlaWdodDtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhID09PSAnaGlnaFF1YWxpdHknKSB7XG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2ZlOyniCDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDqsIDriqXtlZzqsr3smrAg7IKs7JqpIOyVhOuLiOuptCAxMjgweDcyMCDsgqzsmqlcbiAgICAgIGNvbnN0cmFpbnRXaWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDE5MjAsXG4gICAgICAgIG1pbjogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiAxMDgwLFxuICAgICAgICBtaW46IDcyMFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gJ2NvbXBhdGliaWxpdHknXG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2YuO2ZmOyEsSDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDsgqzsmqkg6rCA64ql7ZWY642U652864+EIDEyODB4NzIw7J2EIOyCrOyaqe2VmOuPhOuhnSDqs6DsoJVcbiAgICAgIC8vIOyCrOycoCA6IOqwpOufreyLnCBlbnRyeSDrqqjrjbgoQeyLnOumrOymiCAvIFdpZGUg66qo6424IOuTsSnsl5DshJwgMTkyMCB4IDEwODAg7LKY66as7IucIOu5hOycqOydtCDsnbTsg4HtlbTsp5Ao7ZmA7K2J7J2065CoKVxuICAgICAgLy8g7ZWt7IOBIDEyODAgeCA3MjDsnYQg7IKs7Jqp7ZWY64+E66GdIOuzgOqyvVxuICAgICAgY29uc3RyYWludFdpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbnN0cmFpbnRzID0ge1xuICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgdmlkZW86IHtcbiAgICAgICAgem9vbToge1xuICAgICAgICAgIGlkZWFsOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGZhY2luZ01vZGU6IHtcbiAgICAgICAgICBpZGVhbDogdGhpcy5fX2ZhY2luZ01vZGVDb25zdHJhaW50XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgd2hpdGVCYWxhbmNlTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlSWQ6IGNhbWVyYS5sZW5ndGggPyB7XG4gICAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgICAgfSA6IG51bGwsXG4gICAgICAgIHdpZHRoOiBjb25zdHJhaW50V2lkdGgsXG4gICAgICAgIGhlaWdodDogY29uc3RyYWludEhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDstZzstIgg7KeE7J6FIOydtOyWtOyEnCB2aWRlb0RlaXZjZSDrpqzsiqTtirjrpbwg6rCA7KC47JisIOyImCDsl4bsnLzrqbQsXG4gICAgLy8gZ2V0VXNlck1lZGlh66W8IOyehOydmCDtmLjstpztlZjsl6wg6raM7ZWc7J2EIOuwm+ydgOuSpCDri6Tsi5wg6rCA7KC47Ji0XG4gICAgaWYgKGNhbWVyYS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX19kZWJ1ZygnY2Fubm90IHRvIGdldCBjYW1lcmEgZGV2aWNlcy4gc28sIHRyeSB0byBnZXQgY2FtZXJhIGRldmljZXMgYWdhaW4nKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIHRoaXMuX19zdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgICAgIGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gY2FtZXJhLmxlbmd0aCA/IHtcbiAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgIH0gOiBudWxsO1xuICAgIH1cblxuICAgIC8vIOqwpOufreyLnCB3aWRlIOuTsSDsoIDsgqzslpEg6riw6riw7JeQ7IScIEZIRCDtlbTsg4Hrj4Qg7Lm066mU6528IOyCrOyaqeyLnCDtmYDsrYnsnbTrkJjripQg7ZiE7IOBIOuwqeyngFxuICAgIC8vIOyggOyCrOyWkSDquLDquLAg7YyQ64uo6riw7KSAIDog7ZuE66m07Lm066mU65287J2YIOqwnOyImOqwgCAx6rCc652864qUIOqwgOyglVxuICAgIGlmIChjYW1lcmEubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9fZGVidWcoJ21heWJlIGRldmljZSBpcyBlbnRyeSBtb2RlbCBzdWNoIGFzIGdhbGF4eSB3aWRlJyk7XG4gICAgICBjb25zdHJhaW50cy52aWRlby53aWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cy52aWRlby5oZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCBkdW1wdHJhY2sgPSAoW2EsIGJdLCB0cmFjaykgPT5cbiAgICAgIC8vICAgYCR7YX0ke3RyYWNrLmtpbmQgPT0gJ3ZpZGVvJyA/ICdDYW1lcmEnIDogJ01pY3JvcGhvbmUnfSAoJHt0cmFjay5yZWFkeVN0YXRlfSk6ICR7dHJhY2subGFiZWx9JHtifWA7XG5cbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1ZygndmlkZW9UcmFja3MgOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkpO1xuICAgICAgY29uc3Qgc3RyZWFtU2V0dGluZ3MgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRTZXR0aW5ncygpO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKFxuICAgICAgLy8gICAnc3RyZWFtQ2FwYWJpbGl0aWVzIDo6ICcsXG4gICAgICAvLyAgIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldENhcGFiaWxpdGllcygpXG4gICAgICAvLyApO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCdzdHJlYW0gOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0Q29uc3RyYWludHMoKSk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3N0cmVhbVNldHRpbmdzIDo6ICcsIHN0cmVhbVNldHRpbmdzKTtcbiAgICAgIHRoaXMuX19kZWJ1Zyhgc3RyZWFtIHdpZHRoICogaGVpZ2h0IDo6ICR7c3RyZWFtU2V0dGluZ3Mud2lkdGh9ICogJHtzdHJlYW1TZXR0aW5ncy5oZWlnaHR9YCk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSB3aWR0aCAvIGhlaWdodCA6OiAnICsgc3RyZWFtU2V0dGluZ3Mud2lkdGggLyBzdHJlYW1TZXR0aW5ncy5oZWlnaHQpO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gYXNwZWN0UmF0aW8gOjogJyArIHN0cmVhbVNldHRpbmdzLmFzcGVjdFJhdGlvKTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIGZhY2luZ01vZGUgOjogJyArIHN0cmVhbVNldHRpbmdzLmZhY2luZ01vZGUpO1xuICAgICAgW2NhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICAgIFtyb3RhdGlvbkNhbnZhcy53aWR0aCwgcm90YXRpb25DYW52YXMuaGVpZ2h0XSA9IFt0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aF07XG4gICAgICB9XG4gICAgICB2aWRlby5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICB0aGlzLl9fc3RyZWFtID0gc3RyZWFtO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9faW5pdFN0eWxlKCkge1xuICAgIHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICBvY3IsXG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG5cbiAgICAvLyDquLDspIDsoJXrs7RcbiAgICBjb25zdCBiYXNlV2lkdGggPSA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IDI2MDtcbiAgICBjb25zdCBzY2FubmVyRnJhbWVSYXRpbyA9IGJhc2VIZWlnaHQgLyBiYXNlV2lkdGg7IC8vIOyLoOu2hOymnSDruYTsnKhcblxuICAgIGxldCBndWlkZUJveFdpZHRoLCBndWlkZUJveEhlaWdodDtcbiAgICBsZXQgY2FsY09jckNsaWVudFdpZHRoID0gb2NyLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjT2NyQ2xpZW50SGVpZ2h0ID0gb2NyLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGg7XG4gICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXM7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7Jik66GcIOqwhOyjvFxuICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG4gICAgICBndWlkZUJveFdpZHRoID0gY2FsY09jckNsaWVudFdpZHRoICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6rCA66GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKTroZwg6rCE7KO8XG4gICAgICAvLyDruYTrlJTsmKTrpbwg6rCA66GcIFVJ7J2YIGhlaWdodCDquLDspIDsnLzroZwg7KSE7J206rOgXG4gICAgICAvLyDqsIDroZwgVUkgaGVpZ2h0IOq4sOykgOycvOuhnCDruYTrlJTsmKTsnZggd2lkdGgg6rOE7IKwXG4gICAgICBndWlkZUJveEhlaWdodCA9IGNhbGNPY3JDbGllbnRIZWlnaHQgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgIH1cbiAgICBndWlkZUJveFdpZHRoICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBndWlkZUJveEhlaWdodCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94V2lkdGggPSBndWlkZUJveFdpZHRoICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQgKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBpZiAodG9wVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh0b3BVSSwge1xuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUobWlkZGxlVUksIHtcbiAgICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChib3R0b21VSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGJvdHRvbVVJLCB7XG4gICAgICAgICdwYWRkaW5nLXRvcCc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmlkZW9Jbm5lckdhcCA9IDI7IC8vIOuvuOyEuO2VmOqyjCBtYXNrQm94SW5uZXLrs7Tri6QgZ3VpZGVCb3jqsIAg7J6R7J2A6rKDIOuztOyglVxuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgfSk7XG4gICAgY29uc3QgbWFza0JveElubmVyID0gbWFza0JveFdyYXAucXVlcnlTZWxlY3RvcignI21hc2tCb3hJbm5lcicpO1xuICAgIGxldCByID0gYm9yZGVyUmFkaXVzIC0gYm9yZGVyV2lkdGggKiAyO1xuICAgIHIgPSByIDwgMCA/IDAgOiByO1xuICAgIGlmICghaXNOYU4ocmVkdWNlZEd1aWRlQm94V2lkdGgpICYmICFpc05hTihyZWR1Y2VkR3VpZGVCb3hIZWlnaHQpICYmICFpc05hTihib3JkZXJSYWRpdXMpICYmICFpc05hTihib3JkZXJXaWR0aCkpIHtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lcldpZHRoID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lckhlaWdodCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBtYXNrQm94SW5uZXJXaWR0aCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hc2tCb3hJbm5lckhlaWdodCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3gnLCBtYXNrQm94SW5uZXJXaWR0aCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3knLCBtYXNrQm94SW5uZXJIZWlnaHQgLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeCcsIHIgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeScsIHIgKyAnJyk7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fYWRqdXN0U3R5bGUoKSB7XG4gICAgY29uc3QgX19jYWxjR3VpZGVCb3hDcml0ZXJpYSA9IChhLCBiKSA9PiB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdjYW1lcmFSZXNvbHV0aW9uJykge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oYSwgYik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChhLCBiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTsgLy8gZGVmYXVsdCA6IGNhbWVyYVJlc29sdXRpb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHtcbiAgICAgIG9jcixcbiAgICAgIHZpZGVvLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuXG4gICAgLy8g6riw7KSA7KCV67O0XG4gICAgY29uc3QgYmFzZVdpZHRoID0gaXNBbGllbkJhY2sgPyAyNjAgOiA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IGlzQWxpZW5CYWNrID8gNDAwIDogMjYwO1xuICAgIGNvbnN0IHNjYW5uZXJGcmFtZVJhdGlvID0gYmFzZUhlaWdodCAvIGJhc2VXaWR0aDsgLy8g7Iug67aE7KadIOu5hOycqFxuXG4gICAgbGV0IGd1aWRlQm94V2lkdGgsIGd1aWRlQm94SGVpZ2h0O1xuICAgIGxldCBjYWxjT2NyQ2xpZW50V2lkdGggPSBvY3IuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRIZWlnaHQgPSBvY3IuY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9IHZpZGVvLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPSB2aWRlby5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgaWYgKGNhbGNWaWRlb1dpZHRoID09PSAwIHx8IGNhbGNWaWRlb0hlaWdodCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoO1xuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNWaWRlb1dpZHRoLCBjYWxjVmlkZW9IZWlnaHRdID0gW2NhbGNWaWRlb0hlaWdodCwgY2FsY1ZpZGVvV2lkdGhdO1xuICAgICAgW2NhbGNWaWRlb0NsaWVudFdpZHRoLCBjYWxjVmlkZW9DbGllbnRIZWlnaHRdID0gW2NhbGNWaWRlb0NsaWVudEhlaWdodCwgY2FsY1ZpZGVvQ2xpZW50V2lkdGhdO1xuICAgICAgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICB9XG4gICAgbGV0IG5ld1ZpZGVvV2lkdGggPSBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBsZXQgbmV3VmlkZW9IZWlnaHQgPSBjYWxjVmlkZW9DbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBjb25zdCBuZXdWaWRlb1JhdGlvQnlXaWR0aCA9IGNhbGNWaWRlb0NsaWVudEhlaWdodCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IG5ld1ZpZGVvUmF0aW9CeUhlaWdodCA9IGNhbGNWaWRlb0NsaWVudFdpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgLy8g7IS466GcIFVJXG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCdcbiAgICAgIH0pO1xuICAgICAgLy8gdmlkZW8g6rCA66GcIOq4sOykgCAxMDAlIOycoOyngCAo67OA6rK97JeG7J2MKVxuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDsubTrqZTrnbzrj4Qg7IS466GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIO2ZleuMgFxuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsubTrqZTrnbzripQg6rCA66GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqTrpbwg67mE65SU7JikIOyEuOuhnCDquLjsnbTsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjVmlkZW9DbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCk7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOqwgOuhnCBVSVxuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdlbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJ1xuICAgICAgfSk7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOu5hOuUlOyYpOulvCDqsIDroZwgVUnsnZggaGVpZ2h0IOq4sOykgOycvOuhnCDspITsnbTqs6BcbiAgICAgICAgLy8g6rCA66GcIFVJIGhlaWdodCDquLDspIDsnLzroZwg67mE65SU7Jik7J2YIHdpZHRoIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOuKlCDshLjroZwg6riw7KSA7Jy866GcIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcblxuICAgICAgICAvLyDruYTrlJTsmKTrpbwg7IS466GcIOq4sOykgOycvOuhnCDri6Tsi5wg66ee7LakXG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBuZXdWaWRlb0hlaWdodCAqIG5ld1ZpZGVvUmF0aW9CeUhlaWdodDtcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZgg6rCA66GcIO2BrOq4sOqwgCDqsIDroZwgVUkgd2lkdGggKiByYXRpbyDqsJLrs7Tri6Qg7YGs66m0LFxuICAgICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aCkge1xuICAgICAgICAgIC8vIOqzhOyCsCDrsKnsi53snYQg67CU6r6864ukICjsgqzsnKAgOiDqsbDsnZgg7KCV7IKs6rCB7ZiV7JeQIOqwgOq5jOyatCDqsr3smrAg6rCA7J2065OcIOuwleyKpCDqsIDroZzqsIAg6r2J7LCo6rKMIOuQqC4pXG4gICAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7ZmV64yAXG4gICAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCBoZWlnaHQg7YGs6riw66W8IFVJ7J2YIGhlaWdodCDquLDspIDsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCDqsIDroZwg7YGs6riw6rCAIOqwgOuhnCBVSSB3aWR0aCAqIHJhdGlvIOqwkuuztOuLpCDtgazrqbQsXG4gICAgICAgIGlmIChndWlkZUJveFdpZHRoID4gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoKSB7XG4gICAgICAgICAgLy8g6rOE7IKwIOuwqeyLneydhCDrsJTqvrzri6QgKOyCrOycoCA6IOqxsOydmCDsoJXsgqzqsIHtmJXsl5Ag6rCA6rmM7Jq0IOqyveyasCDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnOqwgCDqvYnssKjqsowg65CoLilcbiAgICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDstpXshoxcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhKOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIOq4sOykgCnqsIAgb2NyVmlld1NpemUo7ZmU66m0IO2BrOq4sCkg6riw7KSA7J2865WMXG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAvLyBndWlkZUJveEhlaWdodCDsnbQgY2FsY09jckNsaWVudEhlaWdodCDrs7Tri6Qg7YGw6rK97JqwKOqwgOydtOuTnOuwleyKpOqwgCDtmZTrqbTsnYQg64SY7Ja06rCA64qUIOqyveyasCkg64uk7IucIOqzhOyCsFxuICAgICAgaWYgKGd1aWRlQm94SGVpZ2h0ID4gY2FsY09jckNsaWVudEhlaWdodCkge1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IE1hdGgubWluKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cblxuICAgICAgLy8gZ3VpZGVCb3hIZWlnaHQg7J20IGNhbGNPY3JDbGllbnRIZWlnaHQg67O064ukIO2BsOqyveyasCjqsIDsnbTrk5zrsJXsiqTqsIAg7ZmU66m07J2EIOuEmOyWtOqwgOuKlCDqsr3smrApIOuLpOyLnCDqs4TsgrBcbiAgICAgIGlmIChndWlkZUJveFdpZHRoID4gY2FsY09jckNsaWVudFdpZHRoKSB7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBNYXRoLm1pbihjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoID0gTWF0aC5taW4oZ3VpZGVCb3hXaWR0aCwgbmV3VmlkZW9XaWR0aCk7XG4gICAgdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSBNYXRoLm1pbihndWlkZUJveEhlaWdodCwgbmV3VmlkZW9IZWlnaHQpO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW25ld1ZpZGVvV2lkdGgsIG5ld1ZpZGVvSGVpZ2h0XSA9IFtuZXdWaWRlb0hlaWdodCwgbmV3VmlkZW9XaWR0aF07XG4gICAgfVxuICAgIGd1aWRlQm94V2lkdGggKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGd1aWRlQm94SGVpZ2h0ICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94V2lkdGggKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveEhlaWdodCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGlmICh0b3BVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHRvcFVJLCB7XG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWlkZGxlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShtaWRkbGVVSSwge1xuICAgICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJvdHRvbVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoYm90dG9tVUksIHtcbiAgICAgICAgJ3BhZGRpbmctdG9wJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIHdpZHRoOiBuZXdWaWRlb1dpZHRoICsgJ3B4J1xuICAgIH0pO1xuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgaGVpZ2h0OiBuZXdWaWRlb0hlaWdodCArICdweCdcbiAgICB9KTtcbiAgICBjb25zdCB2aWRlb0lubmVyR2FwID0gMjsgLy8g66+47IS47ZWY6rKMIG1hc2tCb3hJbm5lcuuztOuLpCBndWlkZUJveOqwgCDsnpHsnYDqsoMg67O07KCVXG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICB9KTtcbiAgICBjb25zdCBtYXNrQm94SW5uZXIgPSBtYXNrQm94V3JhcC5xdWVyeVNlbGVjdG9yKCcjbWFza0JveElubmVyJyk7XG4gICAgbGV0IHIgPSBib3JkZXJSYWRpdXMgLSBib3JkZXJXaWR0aCAqIDI7XG4gICAgciA9IHIgPCAwID8gMCA6IHI7XG4gICAgaWYgKCFpc05hTihyZWR1Y2VkR3VpZGVCb3hXaWR0aCkgJiYgIWlzTmFOKHJlZHVjZWRHdWlkZUJveEhlaWdodCkgJiYgIWlzTmFOKGJvcmRlclJhZGl1cykgJiYgIWlzTmFOKGJvcmRlcldpZHRoKSkge1xuICAgICAgY29uc3QgbWFza0JveElubmVyV2lkdGggPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgY29uc3QgbWFza0JveElubmVySGVpZ2h0ID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG1hc2tCb3hJbm5lcldpZHRoICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFza0JveElubmVySGVpZ2h0ICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneCcsIG1hc2tCb3hJbm5lcldpZHRoIC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneScsIG1hc2tCb3hJbm5lckhlaWdodCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J4JywgciArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J5JywgciArICcnKTtcbiAgICB9XG5cbiAgICAvLyDsiJjrj5kg7LSs7JiBIFVJIOyCrOyaqVxuICAgIC8vIGZpcnN0Q2FsbGVk7J24IOqyveyasCDslYTsp4EgY2FwdHVyZVVJ6rCAIOq3uOugpOyngOyngCDslYrslYQg66y07J2Y66+4XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgJiYgYm90dG9tVUkgJiYgY2FwdHVyZVVJKSB7XG4gICAgICAgIGNvbnN0IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyA9IHRoaXMuX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzKGJvdHRvbVVJKTtcbiAgICAgICAgbGV0IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID0gY2FwdHVyZUJ1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgICAgICBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID09PSAwID8gODAgOiBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgbGV0IGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPSBib3R0b21VSS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gaXNOYU4ocGFyc2VJbnQoYm90dG9tVUkuc3R5bGUucGFkZGluZ1RvcCkpID8gMCA6IHBhcnNlSW50KGJvdHRvbVVJLnN0eWxlLnBhZGRpbmdUb3ApO1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcztcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgY29uc3QgYmFzZWxpbmUgPSBjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gKGNhbGNPY3JDbGllbnRIZWlnaHQgLyAyICsgZ3VpZGVCb3hIZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPiAwICYmIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPCBiYXNlbGluZSkge1xuICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJycsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiBjYXB0dXJlVUlQYWRkaW5nQm90dG9tICsgJ3B4J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAnMTBweCcsXG4gICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJydcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRydWUpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMob2JqKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaj8uY2hpbGROb2Rlcykge1xuICAgICAgc3VtICs9IGl0ZW0uY2xpZW50SGVpZ2h0ID8gaXRlbS5jbGllbnRIZWlnaHQgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9XG4gIF9fY2xvc2VDYW1lcmEoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgfVxuICBhc3luYyBfX2xvYWRSZXNvdXJjZXMoKSB7XG4gICAgdm9pZCAwO1xuICAgIGlmICh0aGlzLl9fcmVzb3VyY2VzTG9hZGVkKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gYXdhaXQgc2ltZCgpO1xuICAgIGxldCBlbnZJbmZvID0gJyc7XG4gICAgZW52SW5mbyArPSBgb3MgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zfVxcbmA7XG4gICAgZW52SW5mbyArPSBgb3NTaW1wbGUgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlfVxcbmA7XG4gICAgZW52SW5mbyArPSBgaXNTdXBwb3J0V2FzbTogJHt0aGlzLl9faXNTdXBwb3J0V2FzbX1cXG5gO1xuICAgIGVudkluZm8gKz0gYHNpbWQod2FzbS1mZWF0dXJlLWRldGVjdCkgOiAke3RoaXMuX19pc1N1cHBvcnRTaW1kfVxcbmA7XG4gICAgaWYgKHRoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlID09PSAnSU9TJyB8fCB0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZSA9PT0gJ01BQycpIHtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gICAgfVxuICAgIGVudkluZm8gKz0gYGlzU3VwcG9ydFNpbWQoZmluYWwpIDogJHt0aGlzLl9faXNTdXBwb3J0U2ltZH1cXG5gO1xuICAgIGVudkluZm8gKz0gYFVzZXJBZ2VudCA6ICR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cXG5gO1xuICAgIHZvaWQgMDtcbiAgICB0aGlzLl9fZGVidWcoZW52SW5mbyk7XG4gICAgd2luZG93LnVzZWJPQ1JFbnZJbmZvID0gZW52SW5mbztcbiAgICBsZXQgc2RrU3VwcG9ydEVudiA9ICdxdXJhbSc7XG4gICAgaWYgKHRoaXMuX19pc1N1cHBvcnRTaW1kKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBzZGtTdXBwb3J0RW52ICs9ICdfc2ltZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gICAgdm9pZCAwO1xuICAgIHdpbmRvdy51c2ViT0NSRW52SW5mbyA9IGVudkluZm87XG4gICAgdm9pZCAwO1xuICAgIGxldCBwb3N0Zml4ID0gJyc7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmZvcmNlX3dhc21fcmVsb2FkKSB7XG4gICAgICAvLyDsmLXshZjsnbQg7Zmc7ISx7ZmUIOuQmOuptCDsg4jroZzsmrQgV0FTTSDrpqzshozsiqTrpbwg7JqU7LKt7ZWoLlxuICAgICAgcG9zdGZpeCA9ICc/dmVyPScgKyB0aGlzLl9fb3B0aW9ucy5mb3JjZV93YXNtX3JlbG9hZF9mbGFnO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLmpzJyArIHBvc3RmaXgsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCk7XG4gICAgbGV0IHNyYyA9IGF3YWl0IGZldGNoKHVybC5ocmVmKS50aGVuKHJlcyA9PiByZXMudGV4dCgpKS50aGVuKHRleHQgPT4ge1xuICAgICAgbGV0IHJlZ2V4ID0gLyguKikgPSBNb2R1bGUuY3dyYXAvZ207XG4gICAgICBsZXQgc291cmNlID0gdGV4dC5yZXBsYWNlKHJlZ2V4LCAnTW9kdWxlLiQxID0gTW9kdWxlLmN3cmFwJyk7XG5cbiAgICAgIC8vIGRhdGEobW9kZWwpXG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgvXlxcKGZ1bmN0aW9uXFwoXFwpIFxcey9tLCAndmFyIGNyZWF0ZU1vZGVsRGF0YSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xcbicgKyAnIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XFxuJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnICAgY29uc29sZS5lcnJvcihcInBhY2thZ2UgZXJyb3I6XCIsIGVycm9yKTsnLCAnICAgcmVqZWN0KCk7XFxuJyArICcgICBjb25zb2xlLmVycm9yKFwicGFja2FnZSBlcnJvcjpcIiwgZXJyb3IpOycpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJyAgfSwgaGFuZGxlRXJyb3IpJywgJyAgcmVzb2x2ZSgpO1xcbicgKyAnICB9LCBoYW5kbGVFcnJvciknKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKC9eXFx9XFwpXFwoXFwpOy9tLCAnXFxuIH0pXFxuJyArICd9OycpO1xuXG4gICAgICAvLyB3YXNtXG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShzZGtTdXBwb3J0RW52ICsgJy53YXNtJywgbmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy53YXNtJyArIHBvc3RmaXgsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZik7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKGBSRU1PVEVfUEFDS0FHRV9CQVNFID0gWydcIl0ke3Nka1N1cHBvcnRFbnZ9XFxcXC5kYXRhW1wiJ11gLCAnZ20nKSwgYFJFTU9URV9QQUNLQUdFX0JBU0UgPSBcIiR7bmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy5kYXRhJyArIHBvc3RmaXgsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZn1cImApO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ2Z1bmN0aW9uIGNyZWF0ZVdhc20nLCAnYXN5bmMgZnVuY3Rpb24gY3JlYXRlV2FzbScpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ2luc3RhbnRpYXRlQXN5bmMoKTsnLCAnYXdhaXQgaW5zdGFudGlhdGVBc3luYygpOycpO1xuXG4gICAgICAvLyB3YXNtIGFuZCBkYXRhKG1vZGVsKSBmaWxlIOuzkeugrOuhnCBmZXRjaCDtlZjquLAg7JyE7ZW0XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgndmFyIGFzbSA9IGNyZWF0ZVdhc20oKTsnLCAnY29uc29sZS5sb2coXCJjcmVhdGUgd2FzbSBhbmQgZGF0YSAtIHN0YXJ0XCIpXFxuJyArICdhd2FpdCAoYXN5bmMgZnVuY3Rpb24oKSB7XFxuJyArICcgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XFxuJyArICcgICAgdmFyIGlzQ3JlYXRlZFdhc20gPSBmYWxzZTtcXG4nICsgJyAgICB2YXIgaXNDcmVhdGVkRGF0YSA9IGZhbHNlO1xcbicgKyAnICAgIGNyZWF0ZVdhc20oKS50aGVuKCgpID0+IHtcXG4nICsgJyAgICAgIGlzQ3JlYXRlZFdhc20gPSB0cnVlO1xcbicgKyAnICAgICAgaWYgKGlzQ3JlYXRlZERhdGEpIHsgcmVzb2x2ZSgpOyB9XFxuJyArICcgICAgfSk7XFxuJyArICcgICAgY3JlYXRlTW9kZWxEYXRhKCkudGhlbigoKSA9PiB7XFxuJyArICcgICAgICBpc0NyZWF0ZWREYXRhID0gdHJ1ZTtcXG4nICsgJyAgICAgIGlmIChpc0NyZWF0ZWRXYXNtKSB7IHJlc29sdmUoKTsgfVxcbicgKyAnICAgIH0pXFxuJyArICcgIH0pO1xcbicgKyAnfSkoKTtcXG4nICsgJ2NvbnNvbGUubG9nKFwiY3JlYXRlIHdhc20gYW5kIGRhdGEgLSBlbmRcIiknKTtcbiAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfSk7XG4gICAgc3JjID0gYFxuICAgIChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICR7c3JjfVxuICAgICAgTW9kdWxlLmxlbmd0aEJ5dGVzVVRGOCA9IGxlbmd0aEJ5dGVzVVRGOFxuICAgICAgTW9kdWxlLnN0cmluZ1RvVVRGOCA9IHN0cmluZ1RvVVRGOFxuICAgICAgcmV0dXJuIE1vZHVsZVxuICAgIH0pKClcbiAgICAgICAgYDtcbiAgICB0aGlzLl9fT0NSRW5naW5lID0gYXdhaXQgZXZhbChzcmMpO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUub25SdW50aW1lSW5pdGlhbGl6ZWQgPSBhc3luYyBfID0+IHtcbiAgICAgIHZvaWQgMDtcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuX19PQ1JFbmdpbmUub25SdW50aW1lSW5pdGlhbGl6ZWQoKTtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gdHJ1ZTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgX19zdGFydFNjYW5XYXNtSW1wbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fX2RldGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTtcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAvLyB0aGlzLl9fc2V0UGlpRW5jcnlwdE1vZGUodGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpOyAvLyBvY3IgcmVzdWx0IGVuY3J5cHRcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICB0aGlzLl9fYWRkcmVzcyA9IDA7XG4gICAgICB0aGlzLl9fcGFnZUVuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICAgICAgdGhpcy5fX3NzYVJldHJ5Q291bnQgPSAwO1xuICAgICAgY29uc3Qgc2NhbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgb2NyUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIGlzRGV0ZWN0ZWRDYXJkID0gbnVsbCxcbiAgICAgICAgICAgIGltZ0RhdGEgPSBudWxsLFxuICAgICAgICAgICAgaW1nRGF0YVVybCA9IG51bGwsXG4gICAgICAgICAgICBtYXNrSW1hZ2UgPSBudWxsLFxuICAgICAgICAgICAgZmFjZUltYWdlID0gbnVsbCxcbiAgICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICBzc2FSZXN1bHRMaXN0ID0gW10sXG4gICAgICAgICAgICBtYXNrSW5mbyA9IG51bGw7XG5cbiAgICAgICAgICAvLyBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UoSU5fUFJPR1JFU1MuUkVBRFkpO1xuICAgICAgICAgIGlmICghdGhpcy5fX09DUkVuZ2luZVsnYXNtJ10pIHJldHVybjtcblxuICAgICAgICAgIC8vIFRPRE8gOiDshKTsoJXtlaDsiJgg7J6I6rKMIOuzgOqyvSAgZGVmYXVsdCDqsJLrj4Qg7KCc6rO1XG4gICAgICAgICAgY29uc3QgW3Jlc29sdXRpb25fdywgcmVzb2x1dGlvbl9oXSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgICAgICBpZiAocmVzb2x1dGlvbl93ID09PSAwIHx8IHJlc29sdXRpb25faCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgIGlmICh0aGlzLl9fZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkcmVzcyBiZWZvcmUgLS0tLS0tLS0tJywgYWRkcmVzcyk7XG4gICAgICAgICAgaWYgKHRoaXMuX19hZGRyZXNzID09PSAwICYmICF0aGlzLl9fcGFnZUVuZCAmJiAoYXdhaXQgdGhpcy5fX2lzVmlkZW9SZXNvbHV0aW9uQ29tcGF0aWJsZSh2aWRlbykpKSB7XG4gICAgICAgICAgICBbdGhpcy5fX2FkZHJlc3MsIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrXSA9IHRoaXMuX19nZXRTY2FubmVyQWRkcmVzcyh0aGlzLl9fb2NyVHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGhpcy5fX2FkZHJlc3MgfHwgdGhpcy5fX3BhZ2VFbmQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkcmVzcyBhZnRlciAtLS0tLS0tLS0nLCBhZGRyZXNzKTtcblxuICAgICAgICAgIGlmICh0aGlzLl9fb2NyU3RhdHVzIDwgdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTKSB7XG4gICAgICAgICAgICAvLyBPQ1Ig7JmE66OMIOydtOyghCDsg4Htg5xcblxuICAgICAgICAgICAgLy8gY2FyZCBub3QgZGV0ZWN0ZWRcbiAgICAgICAgICAgIFtpc0RldGVjdGVkQ2FyZCwgaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQodGhpcy5fX2FkZHJlc3MsIDApO1xuICAgICAgICAgICAgaWYgKCFpc0RldGVjdGVkQ2FyZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fX2luUHJvZ3Jlc3NTdGVwICE9PSB0aGlzLklOX1BST0dSRVNTLlJFQURZKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuQ0FSRF9ERVRFQ1RfRkFJTEVEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCwgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpOyAvLyDtlYTsmpTtlZzqsIA/XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhcmQgaXMgZGV0ZWN0ZWRcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLkNBUkRfREVURUNUX1NVQ0NFU1MpO1xuXG4gICAgICAgICAgICAvLyBzc2EgcmV0cnkg7ISk7KCV7J20IOuQmOyWtCDsnojsnLzqsbDrgpgsIOyImOuPmey0rOyYgVVJ66W8IOyCrOyaqe2VmOuKlCDqsr3smrAsIGNhcmQgZGV0ZWN0IOyEseqzteyLnCDsnbTrr7jsp4Ag7KCA7J6lXG4gICAgICAgICAgICB0aGlzLl9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlKGltZ0RhdGEsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUywgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgW29jclJlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2VdID0gYXdhaXQgdGhpcy5fX3N0YXJ0UmVjb2duaXRpb24odGhpcy5fX2FkZHJlc3MsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgdGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSwgaW1nRGF0YSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAvLyAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICAgICAgLy8gICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTsgICAgICAgIC8vIO2VhOyalO2VnOqwgD9cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fX29jclN0YXR1cyA+PSB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIC8vIG9jciDsmYTro4wg7J207ZuEIOyDge2DnFxuXG4gICAgICAgICAgICAvLyBmYWlsdXJlIGNhc2VcbiAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT0NSIFN0YXR1cyBpcyAke3RoaXMuX19vY3JTdGF0dXN9LCBidXQgb2NyUmVzdWx0IGlzIGZhbHNlYCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pOyAvLyBPQ1Ig7JmE66OMIOyLnOygkOyXkCBjYW1lcmEgcHJldmlldyBvZmZcblxuICAgICAgICAgICAgaWYgKHRoaXMuX19zc2FNb2RlKSB7XG4gICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgLy8g7LWc7LSIIOyLnOuPhFxuICAgICAgICAgICAgICBzc2FSZXN1bHQgPSBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2FkZHJlc3MpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdbRVJSXSBTU0EgTU9ERSBpcyB0cnVlLiBidXQsIHNzYVJlc3VsdCBpcyBudWxsJyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgICAgICAgIHNzYVJlc3VsdExpc3QucHVzaChzc2FSZXN1bHQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmV0cnlTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IEZBS0UgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdGQUtFJztcbiAgICAgICAgICAgICAgICBjb25zdCBSRUFMID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnUkVBTCc7XG4gICAgICAgICAgICAgICAgY29uc3QgRU5TRU1CTEUgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdFTlNFTUJMRSc7XG4gICAgICAgICAgICAgICAgbGV0IGlzQ29tcGxldGVkID0gZmFsc2U7IC8vIOu5hOuPmeq4sCBmb3Ig66y4IOuVjOusuOyXkCBicmVha+qwgCDslYjqsbjrpqzripQg7J207IqI66GcIOuEo+ydjFxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3NzYVJldHJ5Q291bnQgPT09IHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zc2FSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHNzYVJlc3VsdCA9IGF3YWl0IHRoaXMuX19zdGFydFRydXRoUmV0cnkodGhpcy5fX29jclR5cGUsIHRoaXMuX19hZGRyZXNzLCBpdGVtKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignW0VSUl0gU1NBIE1PREUgaXMgdHJ1ZS4gYnV0LCBzc2FSZXN1bHQgaXMgbnVsbCcpOyAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICAgICAgICAgICAgICBzc2FSZXN1bHRMaXN0LnB1c2goc3NhUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBpZiAoRkFLRSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0LmluZGV4T2YoJ1JFQUwnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKFJFQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdC5pbmRleE9mKCdGQUtFJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChFTlNFTUJMRSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHJ5V29ya2luZ1RpbWUgPSBuZXcgRGF0ZSgpIC0gcmV0cnlTdGFydERhdGU7XG4gICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrSW5mbykge1xuICAgICAgICAgICAgICBtYXNrSW5mbyA9IHRoaXMuX19nZXRNYXNrSW5mbyh0aGlzLl9fYWRkcmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0XG4gICAgICAgICAgICB9ID0gdXNlYk9DUldBU01QYXJzZXIucGFyc2VPY3JSZXN1bHQodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBvY3JSZXN1bHQsIHNzYVJlc3VsdCwgdGhpcy5fX3NzYVJldHJ5Q291bnQsIHNzYVJlc3VsdExpc3QsIHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSwgdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlQaXZvdFxuICAgICAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgICAgIC8vIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlXG4gICAgICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IG1hc2tJbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGZhY2VJbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm86IG1hc2tJbmZvLFxuICAgICAgICAgICAgICBzc2FfbW9kZTogdGhpcy5fX3NzYU1vZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICdDYXJkIGRldGVjdGlvbiBlcnJvcic7XG4gICAgICAgICAgaWYgKGUubWVzc2FnZSkge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZvaWQgMDtcblxuICAgICAgICAgIC8vIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ21lbW9yeScpKSB7XG4gICAgICAgICAgLy8gICBhd2FpdCB0aGlzLl9fcmVjb3ZlcnlTY2FuKCk7XG4gICAgICAgICAgLy8gICB0aGlzLl9fcmVjb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdXQTAwMScsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19yZWNvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX19yZWNvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9fZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2NhbiwgMSk7IC8vIOyerOq3gFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2V0VGltZW91dChzY2FuLCAxKTsgLy8gVUkg656c642U66eBIGJsb2NraW5nIOuwqeyngCAoc2V0VGltZW91dClcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIF9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2UsIGNvbnN0YW50TnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2UpIHtcbiAgICAgIGNvbnN0IHJlc2l6ZVJhdGlvID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgLyB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoO1xuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIG1heFdpZHRoOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgsXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoICogcmVzaXplUmF0aW8sXG4gICAgICAgIGNvbnZlcnRTaXplOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lLFxuICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSAvLyBjdXN0b20gb3B0aW9uXG4gICAgICB9O1xuXG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShpbWdEYXRhVXJsLCBkZWZhdWx0T3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuXG4gICAgICAvLyBtYXNraW5nIOydtOuvuOyngOuKlCByZXNpemUg7ZWY66m0LCBtYXNrIOyijO2RnOqwgCDslrTquIvrgpjrr4DroZwg66as7IKs7J207KaIIOyViO2VmOqzoCDslZXstpXrp4wg7KeE7ZaJXG4gICAgICBjb25zdCBtYXNraW5nSW1hZ2VPcHRpb25zID0ge1xuICAgICAgICBxdWFsaXR5OiBkZWZhdWx0T3B0aW9ucy5xdWFsaXR5LFxuICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogZGVmYXVsdE9wdGlvbnMudGFyZ2V0Q29tcHJlc3NWb2x1bWVcbiAgICAgIH07XG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9tYXNraW5nX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UobWFza0ltYWdlLCBtYXNraW5nSW1hZ2VPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9mYWNlX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UoZmFjZUltYWdlLCBkZWZhdWx0T3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgIH1cbiAgfVxuICBfX3JlcXVlc3RHZXRBUElUb2tlbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY3JlZGVudGlhbCA9IHRoaXMuX19vcHRpb25zLmF1dGhTZXJ2ZXJJbmZvLmNyZWRlbnRpYWw7XG4gICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uYmFzZVVybDtcbiAgICAgIGZldGNoKGAke2Jhc2VVcmx9L3NpZ24taW5gLCB7XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWwpLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgICAgICAvLyBtb2RlOiAnY29ycycsXG4gICAgICAgIC8vIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vdXNlYi90b2tlbmAsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiBgQmVhcmVyICR7cmVzdWx0LnRva2VufWBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIHJlc29sdmUoanNvbi50b2tlbik7XG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfX3JlcXVlc3RTZXJ2ZXJPQ1Iob2NyVHlwZSwgc3NhTW9kZSwgaW1nRGF0YVVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgYmFzZVVybCA9IHRoaXMuX19vcHRpb25zLm9jclNlcnZlckJhc2VVcmw7XG4gICAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvaWRjYXJkLWRyaXZlcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL3Bhc3Nwb3J0JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9hbGllbi1iYWNrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9hbGllbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDcmVkaXQgY2FyZCBpcyBub3QgVW5zdXBwb3J0ZWQgU2VydmVyIE9DUicpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIE9DUiB0eXBlOiAke29jclR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXBpVG9rZW4gPSBhd2FpdCB0aGlzLl9fcmVxdWVzdEdldEFQSVRva2VuKCk7XG4gICAgICAgIGNvbnN0IG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIG15SGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7YXBpVG9rZW59YCk7XG4gICAgICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgICAgIGltYWdlX2Jhc2U2NDogaW1nRGF0YVVybCxcbiAgICAgICAgICBtYXNrX21vZGU6ICd0cnVlJyxcbiAgICAgICAgICBmYWNlX21vZGU6ICd0cnVlJ1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fX3NzYU1vZGUpIHtcbiAgICAgICAgICBwYXJhbS5zc2FfbW9kZSA9ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYXcgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcbiAgICAgICAgICBib2R5OiByYXcsXG4gICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnXG4gICAgICAgIH07XG4gICAgICAgIGZldGNoKGJhc2VVcmwsIHJlcXVlc3RPcHRpb25zKS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX3N0YXJ0U2NhblNlcnZlckltcGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0TGlzdCA9IFtdO1xuICAgICAgICBjb25zdCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIOy6lOuyhOyKpOyXkOyEnCDsnbTrr7jsp4Drpbwg6rCA7KC47Ji0XG4gICAgICAgICAgY29uc3QgWywgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICAgICAgaWYgKDEgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNlcnZlciBvY3Ig7Iuk7YyoICjrsJzsg50g6rCA64ql7ISxIOyXhuydjClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDshLHqs7VcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9jclJlc3VsdCA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0U2VydmVyT0NSKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgICAgLy8gZmFpbHVyZSBjYXNlXG4gICAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgT0NSIGlzIGZhaWxlZGApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzc2Eg7Iuc64+EP1xuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBiYXNlNjRJbWFnZVJlc3VsdCxcbiAgICAgICAgICAgICAgbWFza0luZm9cbiAgICAgICAgICAgIH0gPSB1c2ViT0NSQVBJUGFyc2VyLnBhcnNlT2NyUmVzdWx0KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgb2NyUmVzdWx0KTtcbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2FwaV9yZXNwb25zZSA9IG9jclJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBiYXNlNjRJbWFnZVJlc3VsdD8ub2NyX21hc2tpbmdfaW1hZ2UsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSwgMC4wKTtcbiAgICAgICAgICAgIHRoaXMuZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VMZWdhY3lGb3JtYXQpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfZGF0YSA9IGxlZ2FjeUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvY3JSZXN1bHQuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHRDb2RlID0gJ1NGMDAxJztcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0TWVzc2FnZSA9IGAke29jclJlc3VsdC5zY2FubmVyX3R5cGV9OiR7b2NyUmVzdWx0Py5yZXN1bHRfY29kZX1gO1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHREZXRhaWwgPSBKU09OLnN0cmluZ2lmeShvY3JSZXN1bHQpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcyhyZXN1bHRDb2RlLCByZXN1bHREZXRhaWwsIHJlc3VsdE1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuXG4gICAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja0NhcHR1cmVCdXR0b24pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ1NlcnZlciBPQ1IgRXJyb3InO1xuICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnU0UwMDEnLCBlLCBlcnJvck1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVSTCkge1xuICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICBpZiAodGhpcy5fX3NzYU1vZGUgJiYgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDAgfHwgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJICYmIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgbGV0IGxpbWl0U2F2ZUltYWdlQ291bnQgPSBNYXRoLm1heCh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50LCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCk7XG4gICAgICBpZiAodGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLmxlbmd0aCA9PT0gbGltaXRTYXZlSW1hZ2VDb3VudCkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLnB1c2goaW1nRGF0YSk7XG4gICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQucHVzaChpbWdEYXRhVVJMKTtcbiAgICAgICAgdm9pZCAwOyAvLyBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgfVxuXG4gICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX19vblN1Y2Nlc3NQcm9jZXNzKHJldmlld19yZXN1bHQpIHtcbiAgICAvLyDsnbjsi50g7ISx6rO1IOyKpOy6lCDro6jtlIQg7KKF66OMXG4gICAgaWYgKHJldmlld19yZXN1bHQuc3NhX21vZGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1MpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBhcGlfcmVzcG9uc2U6IHtcbiAgICAgICAgcmVzdWx0X2NvZGU6ICdOMTAwJyxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6ICdPSy4nXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnc3VjY2VzcycsXG4gICAgICByZXZpZXdfcmVzdWx0OiByZXZpZXdfcmVzdWx0XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uU3VjY2Vzcykge1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIGUsIGVycm9yTWVzc2FnZSkge1xuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQpO1xuICAgIGxldCBlcnJvckRldGFpbCA9ICcnO1xuICAgIGlmIChlPy50b1N0cmluZygpKSBlcnJvckRldGFpbCArPSBlLnRvU3RyaW5nKCk7XG4gICAgaWYgKGU/LnN0YWNrKSBlcnJvckRldGFpbCArPSBlLnN0YWNrO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogcmVzdWx0Q29kZSxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgfSxcbiAgICAgIHJlc3VsdDogJ2ZhaWxlZCcsXG4gICAgICByZXZpZXdfcmVzdWx0OiB7XG4gICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgZXJyb3JfZGV0YWlsOiBlcnJvckRldGFpbFxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHRoaXMuX19vbkZhaWx1cmUpIHtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUocmVzdWx0KTtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcHJlbG9hZGluZ1dhc20oKSB7XG4gICAgY29uc3QgcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpO1xuICAgIGlmICghdGhpcy5pc1ByZWxvYWRlZCgpICYmIHByZWxvYWRpbmdTdGF0dXMgPT09IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGF3YWl0IHRoaXMucHJlbG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgYXdhaXQgdGhpcy5fX3dhaXRQcmVsb2FkZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgYWJub3JtYWxseSBwcmVsb2FkaW5nIHN0YXR1cywgcHJlbG9hZGVkOiAke3RoaXMuaXNQcmVsb2FkZWQoKX0gLyBwcmVsb2FkaW5nU3RhdHVzOiAke3RoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gIC8vIF9fc2V0UGlpRW5jcnlwdE1vZGUocGlpRW5jcnlwdE1vZGUpIHtcbiAgLy8gICB0aGlzLl9fT0NSRW5naW5lLnNldFBpaUVuY3J5cHQocGlpRW5jcnlwdE1vZGUpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZW5jcnlwdERldGVjdGVkQmFzZTY0KGFkZHJlc3MsIG1hc2ssIG9jcl9tb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkUGhvdG9CYXNlNjQoYWRkcmVzcyk7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRCYXNlNjRqcGdEZXRlY3RlZEZyYW1lQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBvY3JfbW9kZVxuICAvLyAgICk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19nZXRFbmNyeXB0ZWRTaXplKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ1NpemUoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZEJ1ZmZlcigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNyeXB0ZWRKcGdCdWZmZXIoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChhZGRyZXNzLCBtYXNrLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgY29uc3QgZW5jcnlwdERldGVjdGVkQmFzZTY0ID0gdGhpcy5fX2VuY3J5cHREZXRlY3RlZEJhc2U2NChcbiAgLy8gICAgIGFkZHJlc3MsXG4gIC8vICAgICBtYXNrLFxuICAvLyAgICAgaW1nTW9kZSxcbiAgLy8gICAgIGltZ1R5cGVcbiAgLy8gICApO1xuICAvLyAgIGlmIChlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPT09IDEpIHtcbiAgLy8gICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fZ2V0RW5jcnlwdGVkU2l6ZSgpO1xuICAvLyAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19nZXRFbmNyeXB0ZWRCdWZmZXIoKTtcbiAgLy9cbiAgLy8gICAgIGNvbnN0IGVuY3J5cHRlZCA9IG5ldyBVaW50OEFycmF5KFxuICAvLyAgICAgICB0aGlzLl9fT0NSRW5naW5lLkhFQVA4LmJ1ZmZlcixcbiAgLy8gICAgICAganBnUG9pbnRlcixcbiAgLy8gICAgICAganBnU2l6ZVxuICAvLyAgICAgKTtcbiAgLy8gICAgIGNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuICAvLyAgICAgY29uc3QgZGVjb2RlZFN0cmluZyA9IHRleHREZWNvZGVyLmRlY29kZShlbmNyeXB0ZWQpO1xuICAvL1xuICAvLyAgICAgcmV0dXJuIGRlY29kZWRTdHJpbmc7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiAnJztcbiAgLy8gfVxuICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICBhc3luYyBfX3N0YXJ0U2Nhbldhc20oKSB7XG4gICAgdGhpcy5fX2RlYnVnKCd3YXNtX21vZGUnKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbUltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19zdGFydFNjYW5TZXJ2ZXIoKSB7XG4gICAgdGhpcy5fX2RlYnVnKCdzZXJ2ZXJfbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSA9IHRydWU7XG4gICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2NhblNlcnZlckltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19yZWNvdmVyeVNjYW4oKSB7XG4gICAgdm9pZCAwO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3BTY2FuKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2Nhbldhc20oKTtcbiAgfVxuICBzdG9wU2NhbigpIHtcbiAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlOyAvLyBzd2l0Y2ggdG8gc2VydmVy7J2865WMIOq4sOyhtCBXQVNNIGxvb3Ag6rCV7KCc7KKF66OMXG4gICAgY29uc3Qge1xuICAgICAgY2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhbnZhcykge1xuICAgICAgY29uc3QgY2FudmFzQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuICB9XG4gIHN0b3BTdHJlYW0oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkKTtcbiAgICBpZiAodGhpcy5fX3N0cmVhbSkge1xuICAgICAgdGhpcy5fX3N0cmVhbS5zdG9wICYmIHRoaXMuX19zdHJlYW0uc3RvcCgpO1xuICAgICAgbGV0IHRyYWNrcyA9IHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzICYmIHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAodHJhY2tzICYmIHRyYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgdHJhY2tzLmZvckVhY2godHJhY2sgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zdHJlYW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDrqZTrqqjrpqwgYWxsb2NhdGlvbiBmcmVlIO2VqOyImCAqL1xuICBjbGVhbnVwKCkge1xuICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKTtcbiAgICB0aGlzLl9fZGVzdHJveUJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95UHJldkltYWdlKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCk7XG4gIH1cbiAgcmVzdG9yZUluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIH1cbiAgX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgaWYgKHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpO1xuICAgICAgdGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVXNlQk9DUjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBT0EsUUFBUSxNQUFNLHVCQUF1QjtBQUM1QyxPQUFPQyxpQkFBaUIsTUFBTSxtQ0FBbUM7QUFDakUsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBQy9ELFNBQVNDLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBUSxrQ0FBa0M7QUFDeEYsT0FBT0MsU0FBUyxNQUFNLHlCQUF5QjtBQUMvQyxJQUFJQyxRQUFRO0FBQ1osTUFBTUMsT0FBTyxDQUFDO0VBb0NaOztFQUVBOztFQXVFaUM7RUFDTDs7RUFNRTtFQUNGO0VBQ0M7O0VBSzdCOztFQWlMQTtFQUNBQyxXQUFXQSxDQUFBLEVBQUc7SUFBQUMsZUFBQSxzQkE1U0E7TUFDWkMsSUFBSSxFQUFFLE1BQU07TUFDWkMsU0FBUyxFQUFFLFdBQVc7TUFDdEJDLEtBQUssRUFBRSxPQUFPO01BQ2RDLG1CQUFtQixFQUFFLGdCQUFnQjtNQUNyQ0Msa0JBQWtCLEVBQUUsZUFBZTtNQUNuQ0Msc0JBQXNCLEVBQUUsd0JBQXdCO01BQ2hEQyxxQkFBcUIsRUFBRSx1QkFBdUI7TUFDOUNDLGNBQWMsRUFBRSxZQUFZO01BQzVCQyx1QkFBdUIsRUFBRSxxQkFBcUI7TUFDOUNDLFdBQVcsRUFBRSxhQUFhO01BQzFCQyxvQkFBb0IsRUFBRSxzQkFBc0I7TUFDNUNDLFVBQVUsRUFBRTtJQUNkLENBQUM7SUFBQVosZUFBQSxxQkFDWTtNQUNYRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO01BQ2JDLEtBQUssRUFBRSxDQUFDO01BQ1JPLFdBQVcsRUFBRSxDQUFDO01BQ2RHLElBQUksRUFBRTtJQUNSLENBQUM7SUFBQWIsZUFBQSw0QkFDbUI7TUFDbEJjLFdBQVcsRUFBRSxDQUFDLENBQUM7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
