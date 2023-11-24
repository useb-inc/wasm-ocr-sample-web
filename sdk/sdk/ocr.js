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
      useDebugAlert: false
    }));
    if (instance) return instance;
    instance = this;
    return instance;
  }

  /** public methods */
  preloading(onPreloaded) {
    var _this = this;
    return _asyncToGenerator(function* () {
      yield _this.__setupDomElements();
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
    preloadingUIWrap.style.display = 'flex';
  }
  hideOCRLoadingUI() {
    var {
      preloadingUIWrap
    } = detector.getOCRElements();
    preloadingUIWrap.style.display = 'none';
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
          return latencyPer100ms > _this2.__options.switchToServerThreshold;
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
    this.__options.ssaMaxRetryCount = convertTypeToNumber(this.__options.ssaMaxRetryCount);
    this.__options.useCompressImageMaxVolume = convertTypeToNumber(this.__options.useCompressImageMaxVolume);
    this.__options.useCompressImageMaxWidth = convertTypeToNumber(this.__options.useCompressImageMaxWidth);
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
    }), 1000);
  }
  __proceedCameraPermission() {
    var _this15 = this;
    return _asyncToGenerator(function* () {
      try {
        _this15.__closeCamera();
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
          _this15.__setCameraPermissionTimeoutTimer(); // 재귀 호출
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
        display: 'flex',
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
      var url = new URL(sdkSupportEnv + '.js', _this22.__options.resourceBaseUrl);
      var src = yield fetch(url.href).then(res => res.text()).then(text => {
        var regex = /(.*) = Module.cwrap/gm;
        var source = text.replace(regex, 'Module.$1 = Module.cwrap');

        // data(model)
        source = source.replace(/^\(function\(\) \{/m, 'var createModelData = async function() {\n' + ' return new Promise(async function (resolve, reject) {\n');
        source = source.replace('   console.error("package error:", error);', '   reject();\n' + '   console.error("package error:", error);');
        source = source.replace('  }, handleError)', '  resolve();\n' + '  }, handleError)');
        source = source.replace(/^\}\)\(\);/m, '\n })\n' + '};');

        // wasm
        source = source.replace(sdkSupportEnv + '.wasm', new URL(sdkSupportEnv + '.wasm', _this22.__options.resourceBaseUrl).href);
        source = source.replace(new RegExp("REMOTE_PACKAGE_BASE = ['\"]".concat(sdkSupportEnv, "\\.data[\"']"), 'gm'), "REMOTE_PACKAGE_BASE = \"".concat(new URL(sdkSupportEnv + '.data', _this22.__options.resourceBaseUrl).href, "\""));
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
          var raw = JSON.stringify({
            image_base64: imgDataUrl,
            ssa_mode: 'true',
            mask_mode: 'true',
            face_mode: 'true'
          });
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
                yield _this26.__compressImages(review_result, imgDataUrl, base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_masking_image, base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_face_image, 0.0);
                _this26.encryptResult(review_result);
                if (_this26.__options.useLegacyFormat) {
                  review_result.ocr_data = legacyFormat;
                }
                yield _this26.__onSuccessProcess(review_result);
                _this26.__closeCamera();
                resolve();
              }
            });
            return function __onClickCaptureButton() {
              return _ref16.apply(this, arguments);
            };
          }();
          _this26.__captureButton.addEventListener('click', __onClickCaptureButton);
        } catch (e) {
          var errorMessage = 'Server OCR Error';
          if (e.message) {
            errorMessage += ': ' + e.message;
          }
          void 0;
          yield _this26.__onFailureProcess('QS001', e, errorMessage); // QURAM Server OCR 에러
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhIiwiY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJzc2FSZXRyeVR5cGUiLCJzc2FSZXRyeVBpdm90Iiwic3NhTWF4UmV0cnlDb3VudCIsInVzZURlYnVnQWxlcnQiLCJwcmVsb2FkaW5nIiwib25QcmVsb2FkZWQiLCJfdGhpcyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX19zZXR1cERvbUVsZW1lbnRzIiwiaXNQcmVsb2FkZWQiLCJzaG93T0NSTG9hZGluZ1VJIiwiX19wcmVsb2FkaW5nU3RhdHVzIiwiX19sb2FkUmVzb3VyY2VzIiwiX19wcmVsb2FkZWQiLCJoaWRlT0NSTG9hZGluZ1VJIiwiaXNJbml0aWFsaXplZCIsIl9faW5pdGlhbGl6ZWQiLCJnZXRQcmVsb2FkaW5nU3RhdHVzIiwiaXNFbmNyeXB0TW9kZSIsIl9fb3B0aW9ucyIsImlzQ3JlZGl0Q2FyZCIsIl9fb2NyVHlwZSIsInByZWxvYWRpbmdVSVdyYXAiLCJnZXRPQ1JFbGVtZW50cyIsImRpc3BsYXkiLCJlbmNyeXB0UmVzdWx0IiwicmV2aWV3X3Jlc3VsdCIsIl9faXNTdXBwb3J0V2FzbSIsImluY2x1ZGVMaXN0IiwiZW5jcnlwdGVkIiwib2NyX3Jlc3VsdCIsIl8iLCJ0b1BhaXJzIiwicGljayIsInJlZHVjZSIsImFjYyIsIl9yZWYiLCJrZXkiLCJ2YWx1ZSIsIl9fZW5jcnlwdFNjYW5SZXN1bHQiLCJvY3Jfb3JpZ2luX2ltYWdlIiwiX29iamVjdFNwcmVhZCIsImV4Y2x1ZGVMaXN0Iiwib21pdCIsIl9yZWYyIiwib2NyX21hc2tpbmdfaW1hZ2UiLCJvY3JfZmFjZV9pbWFnZSIsImdldE9DUkVuZ2luZSIsIl9fT0NSRW5naW5lIiwiaW5pdCIsInNldHRpbmdzIiwibGljZW5zZUtleSIsIkVycm9yIiwiX19saWNlbnNlIiwibWVyZ2VkT3B0aW9ucyIsIm1lcmdlIiwic2V0T3B0aW9uIiwiX193aW5kb3dFdmVudEJpbmQiLCJfX2RldmljZUluZm8iLCJnZXRPc1ZlcnNpb24iLCJnZXRPcHRpb24iLCJnZXRPY3JUeXBlIiwidHlwZSIsIl9fb2NyVHlwZU51bWJlclRvU3RyaW5nIiwiZ2V0IiwiZ2V0T2NyVHlwZU51bWJlciIsInN0cmluZyIsIl9fb2NyU3RyaW5nVG9UeXBlTnVtYmVyIiwiZ2V0VUlPcmllbnRhdGlvbiIsIl9fdWlPcmllbnRhdGlvbiIsImdldFZpZGVvT3JpZW50YXRpb24iLCJfX3ZpZGVvT3JpZW50YXRpb24iLCJjaGVja1N3aXRjaFRvU2VydmVyTW9kZSIsIl90aGlzMiIsIl9faXNTd2l0Y2hUb1NlcnZlck1vZGUiLCJsYXRlbmN5UGVyMTAwbXMiLCJtZWFzdXJlUmVwb3J0IiwiX19kZWJ1ZyIsInN0YXJ0T0NSIiwib25TdWNjZXNzIiwib25GYWlsdXJlIiwiX2FyZ3VtZW50cyIsImFyZ3VtZW50cyIsIl90aGlzMyIsIm9uSW5Qcm9ncmVzc0NoYW5nZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9fc3NhTW9kZSIsImluZGV4T2YiLCJfX29uU3VjY2VzcyIsIl9fb25GYWlsdXJlIiwiX19vbkluUHJvZ3Jlc3NDaGFuZ2UiLCJfX3RvcFVJIiwidG9wVUkiLCJfX21pZGRsZVVJIiwibWlkZGxlVUkiLCJfX2JvdHRvbVVJIiwiYm90dG9tVUkiLCJfX2NoYW5nZVN0YWdlIiwiX19wcmVwcm9jZXNzIiwiX19wcmVsb2FkaW5nV2FzbSIsIl9fc3RhcnRTY2FuU2VydmVyIiwiX19zdGFydFNjYW5XYXNtIiwiZSIsInN0b3BPQ1IiLCJjbGVhbnVwIiwiX19jbG9zZUNhbWVyYSIsInNldElnbm9yZUNvbXBsZXRlIiwidmFsIiwiZW5jcnlwdCIsInBsYWluU3RyIiwicmVzdGFydE9DUiIsIm9jclR5cGUiLCJfYXJndW1lbnRzMiIsIl90aGlzNCIsImlzU3dpdGNoTW9kZSIsIl9fd2FpdFByZWxvYWRlZCIsIl90aGlzNSIsIndhaXRpbmdSZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaGVjayIsInNldFRpbWVvdXQiLCJjb252ZXJ0VHlwZVRvTnVtYmVyIiwib3B0aW9uIiwiaXNOYU4iLCJwYXJzZUludCIsIl90aGlzXyIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsInNraXBUb3VjaEFjdGlvbmZvclpvb20iLCJldiIsInRvdWNoZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwib25iZWZvcmV1bmxvYWQiLCJfX3BhZ2VFbmQiLCJoYW5kbGVSZXNpemUiLCJfcmVmNCIsIl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplIiwiX190aHJvdHRsaW5nUmVzaXplVGltZXIiLCJhcHBseSIsIl9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5IiwibXNnIiwiX19zbGVlcCIsIm1zIiwiX19ibG9iVG9CYXNlNjQiLCJibG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJfX2Jhc2U2NHRvQmxvYiIsImJhc2U2NCIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiYWIiLCJBcnJheUJ1ZmZlciIsImlhIiwiVWludDhBcnJheSIsImkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsIl9fY29tcHJlc2VCYXNlNjRJbWFnZSIsIm9wdGlvbnMiLCJjb25zdGFudE51bWJlciIsIl90aGlzNiIsImJsb2JGaWxlIiwiY29tcHJlc3NlZCIsImNvbXByZXNzSW1hZ2UiLCJjb21wcmVzc2lvblJhdGlvIiwiTWF0aCIsInJvdW5kIiwic2l6ZSIsIl9fZ2V0U3RyaW5nT25XYXNtSGVhcCIsImxlbmd0aEJ5dGVzIiwibGVuZ3RoQnl0ZXNVVEY4IiwiX19zdHJpbmdPbldhc21IZWFwIiwiX21hbGxvYyIsInN0cmluZ1RvVVRGOCIsIm9jclJlc3VsdCIsInN0cmluZ09uV2FzbUhlYXAiLCJ0b1N0cmluZyIsImpzb25TdHJpbmciLCJfZnJlZSIsIl9fc2V0VmlkZW9SZXNvbHV0aW9uIiwidmlkZW9FbGVtZW50IiwiX3RoaXM3IiwiaXNTdXBwb3J0ZWRSZXNvbHV0aW9uIiwicmVzb2x1dGlvblRleHQiLCJfX2NhbVNldENvbXBsZXRlIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwic3JjT2JqZWN0IiwiX192aWRlb1dpZHRoIiwiX192aWRlb0hlaWdodCIsIl9fZ2V0U2Nhbm5lckFkZHJlc3MiLCJfX29jclR5cGVMaXN0IiwiaW5jbHVkZXMiLCJhZGRyZXNzIiwiZGVzdHJveUNhbGxiYWNrIiwiZ2V0SURDYXJkU2Nhbm5lciIsImRlc3Ryb3lJRENhcmRTY2FubmVyIiwiZ2V0UGFzc3BvcnRTY2FubmVyIiwiZGVzdHJveVBhc3Nwb3J0U2Nhbm5lciIsImdldEFsaWVuU2Nhbm5lciIsImRlc3Ryb3lBbGllblNjYW5uZXIiLCJnZXRDcmVkaXRTY2FubmVyIiwiZGVzdHJveUNyZWRpdFNjYW5uZXIiLCJfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19yZXRyeUNvdW50R2V0QWRkcmVzcyIsIl9fZ2V0QnVmZmVyIiwiX19CdWZmZXIiLCJfX3Jlc29sdXRpb25XaWR0aCIsIl9fcmVzb2x1dGlvbkhlaWdodCIsIl9fcmVzdWx0QnVmZmVyIiwiX19tYXNrSW5mb1Jlc3VsdEJ1ZiIsIl9fZ2V0SW1hZ2VCYXNlNjQiLCJtYXNrTW9kZSIsImltZ01vZGUiLCJfYXJndW1lbnRzMyIsIl90aGlzOCIsImltZ1R5cGUiLCJlbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UiLCJlbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UiLCJqcGdTaXplIiwiZ2V0RW5jb2RlZEpwZ1NpemUiLCJqcGdQb2ludGVyIiwiZ2V0RW5jb2RlZEpwZ0J1ZmZlciIsInJlc3VsdFZpZXciLCJIRUFQOCIsImJ1ZmZlciIsImRlc3Ryb3lFbmNvZGVkSnBnIiwiX19kZXN0cm95QnVmZmVyIiwiX19kZXN0cm95UmVzdWx0QnVmZmVyIiwiX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lQcmV2SW1hZ2UiLCJfX1ByZXZJbWFnZSIsIl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAiLCJfX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcyIsIl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayIsIl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlIiwiX3RoaXM5IiwiX19nZXRSb3RhdGlvbkRlZ3JlZSIsIl9fZ2V0TWlycm9yTW9kZSIsIl9fY3JvcEltYWdlRnJvbVZpZGVvIiwiX3RoaXMxMCIsImNhbGNSZXNvbHV0aW9uX3ciLCJjYWxjUmVzb2x1dGlvbl9oIiwidmlkZW8iLCJjYW52YXMiLCJyb3RhdGlvbkNhbnZhcyIsImNhbGNDYW52YXMiLCJjYWxjVmlkZW9XaWR0aCIsImNhbGNWaWRlb0hlaWdodCIsImNhbGNWaWRlb0NsaWVudFdpZHRoIiwiY2xpZW50V2lkdGgiLCJjYWxjVmlkZW9DbGllbnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoIiwiX19jcm9wSW1hZ2VTaXplV2lkdGgiLCJjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCIsIl9fY3JvcEltYWdlU2l6ZUhlaWdodCIsImNhbGNWaWRlb09yaWVudGF0aW9uIiwiaXNBbGllbkJhY2siLCJfX2lzUm90YXRlZDkwb3IyNzAiLCJjYWxjTWF4U1dpZHRoIiwiY2FsY01heFNIZWlnaHQiLCJzeCIsInN5IiwicmF0aW8iLCJzV2lkdGgiLCJtaW4iLCJzSGVpZ2h0IiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY2FsY0NvbnRleHQiLCJnZXRDb250ZXh0Iiwid2lsbFJlYWRGcmVxdWVudGx5IiwiZHJhd0ltYWdlIiwiaW1nRGF0YSIsImltZ0RhdGFVcmwiLCJnZXRJbWFnZURhdGEiLCJ0b0RhdGFVUkwiLCJfX3JvdGF0ZSIsImRlZ3JlZSIsImltZyIsIkltYWdlIiwidGVtcENhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInRlbXBDb250ZXh0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsIm5ld0ltYWdlRGF0YSIsInJlc3RvcmUiLCJfX2lzQ2FyZGJveERldGVjdGVkIiwiX2FyZ3VtZW50czQiLCJfdGhpczExIiwiYm94VHlwZSIsInJldHJ5SW1nIiwic2V0IiwiZGF0YSIsImtvciIsImFsaWVuIiwicGFzc3BvcnQiLCJkZXRlY3RfaWRjYXJkX29wdCIsImRldGVjdF9pZGNhcmQiLCJtZXNzYWdlIiwiX19zdGFydFJlY29nbml0aW9uIiwic3NhTW9kZSIsImlzU2V0SWdub3JlQ29tcGxldGUiLCJfdGhpczEyIiwicmVzdWx0QnVmZmVyIiwicmVjb2duaXRpb24iLCJfcmVmNyIsIl9vY3JSZXN1bHQiLCJfb2NyUmVzdWx0MiIsInNjYW5JRENhcmQiLCJzY2FuUGFzc3BvcnQiLCJzY2FuQWxpZW4iLCJzY2FuQWxpZW5CYWNrIiwic2NhbkNyZWRpdCIsIl9fY3N2VG9PYmplY3QiLCJjb21wbGV0ZSIsIl9fbWFudWFsT0NSUmV0cnlDb3VudCIsIl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCIsInF1ZXVlSWR4IiwiX19kZXRlY3RlZENhcmRRdWV1ZSIsIl9fYmx1ckNhcHR1cmVCdXR0b24iLCJfX3NldFN0eWxlIiwiX3giLCJvY3JJbWFnZU1vZGUiLCJPQ1JfSU1HX01PREUiLCJvcmlnaW5JbWFnZSIsIk9DUl9JTUdfTUFTS19NT0RFIiwibWFza0ltYWdlIiwiZmFjZUltYWdlIiwiX19zdGFydFRydXRoIiwicmVqZWN0Iiwic2NhblRydXRoIiwic3RyIiwicGFpcnMiLCJvYmoiLCJwYWlyIiwiX19nZXRNYXNrSW5mbyIsIm1hc2tJbmZvUmVzdWx0QnVmIiwiZ2V0TWFza1JlY3QiLCJfX3N0YXJ0VHJ1dGhSZXRyeSIsIl90aGlzMTMiLCJfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfdGhpczE0IiwiX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIiwiX3RoaXMxNSIsImlzUGFzc3BvcnQiLCJfX3NldHVwVmlkZW8iLCJfX3N0cmVhbSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBsYXkiLCJfX2FkanVzdFN0eWxlIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJuYW1lIiwiZXJyb3JNZXNzYWdlIiwiX19vbkZhaWx1cmVQcm9jZXNzIiwic3RvcFN0cmVhbSIsImVsIiwiYXNzaWduIiwiX19jaGFuZ2VPQ1JTdGF0dXMiLCJfX29jclN0YXR1cyIsIl9hcmd1bWVudHM1IiwiX3RoaXMxNiIsImZvcmNlVXBkYXRlIiwicmVjb2duaXplZEltYWdlIiwiX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwIiwiX19pblByb2dyZXNzU3RlcCIsImd1aWRlQm94IiwibWFza0JveFdyYXAiLCJjYXB0dXJlQnV0dG9uIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJTdHlsZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiX21hc2tCb3hXcmFwJHF1ZXJ5U2VsIiwicXVlcnlTZWxlY3RvciIsIl9jYXB0dXJlQnV0dG9uJHF1ZXJ5UyIsIm9jck1vZGUiLCJjYWxsIiwiX191cGRhdGVQcmV2aWV3VUkiLCJfX2hpZGVQcmV2aWV3VUkiLCJwcmV2aWV3VUlXcmFwIiwicHJldmlld0ltYWdlIiwiaW1nU3R5bGUiLCJjb250ZXh0IiwiX19nZXRJbnB1dERldmljZXMiLCJfdGhpczE3IiwibWVkaWFEZXZpY2VzIiwiZGV2aWNlcyIsImVudW1lcmF0ZURldmljZXMiLCJjYW1lcmEiLCJkZXZpY2UiLCJraW5kIiwiSW5wdXREZXZpY2VJbmZvIiwiZ2V0Q2FwYWJpbGl0aWVzIiwiX2NhcCRmYWNpbmdNb2RlIiwiY2FwIiwiZmFjaW5nTW9kZSIsIl9fZmFjaW5nTW9kZUNvbnN0cmFpbnQiLCJfZGV2aWNlJGxhYmVsIiwiaXNVbHRyYUNhbWVyYVJlZyIsImxhYmVsIiwicHVzaCIsImRldmljZUlkIiwiUmVmZXJlbmNlRXJyb3IiLCJfZGV2aWNlJGxhYmVsMiIsImlzQmFja0NhbWVyYVJlZyIsImNvbmNhdCIsImNoZWNrVUlPcmllbnRhdGlvbiIsImN1cnJlbnQiLCJvY3IiLCJpc0NoYW5nZWQiLCJfX3ByZXZVaU9yaWVudGF0aW9uIiwiX19jbGVhckN1c3RvbVVJIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwiX3RoaXMxOCIsInZpZGVvV3JhcCIsImd1aWRlQm94V3JhcCIsInByZXZlbnRUb0ZyZWV6ZVZpZGVvIiwiY3VzdG9tVUlXcmFwIiwiY2FwdHVyZVVJV3JhcCIsImNhcHR1cmVVSSIsInByZXZpZXdVSSIsInN3aXRjaFVJV3JhcCIsInN3aXRjaFVJIiwicHJlbG9hZGluZ1VJIiwicmVtb3ZlIiwib2NyU3R5bGUiLCJ3cmFwU3R5bGUiLCJtYXJnaW4iLCJvdmVyZmxvdyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCIsImFwcGVuZENoaWxkIiwibWFza19mcmFtZSIsInZpZGVvU3R5bGUiLCJyb3RhdGVDc3MiLCJtaXJyb3JDc3MiLCJyb3RhdGVBbmRNaXJyb3JDc3MiLCJ0cmFuc2Zvcm0iLCJjYW52YXNTdHlsZSIsImxlZnQiLCJ0b3AiLCJib3JkZXIiLCJyaWdodCIsImJvdHRvbSIsImN1c3RvbVVJV3JhcFN0eWxlIiwiY2FwdHVyZVVJV3JhcFN0eWxlIiwiY3Vyc29yIiwiY2FwdHVyZUJ1dHRvblNyY1NWRyIsIl9fb25DbGlja0NhcHR1cmVCdXR0b24iLCJwcmV2aWV3VUlXcmFwU3R5bGUiLCJzd2l0Y2hVSVdyYXBTdHlsZSIsInN3aXRjaEhUTUwiLCJzd2l0Y2hDaGVja2JveCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiX19vbkNsaWNrU3dpdGNoVUkiLCJfcmVmMTAiLCJldmVudCIsInRhcmdldCIsImNoZWNrZWQiLCJfeDIiLCJvbmNlIiwicHJlbG9hZGluZ1VJV3JhcFN0eWxlIiwiX19pbml0U3R5bGUiLCJfX29jciIsIl9fY2FudmFzIiwiX19yb3RhdGlvbkNhbnZhcyIsIl9fdmlkZW8iLCJfX3ZpZGVvV3JhcCIsIl9fZ3VpZGVCb3giLCJfX2d1aWRlQm94V3JhcCIsIl9fbWFza0JveFdyYXAiLCJfX3ByZXZlbnRUb0ZyZWV6ZVZpZGVvIiwiX19jdXN0b21VSVdyYXAiLCJfX2NhcHR1cmVVSVdyYXAiLCJfX2NhcHR1cmVVSSIsIl9fY2FwdHVyZUJ1dHRvbiIsIl9fcHJldmlld1VJV3JhcCIsIl9fcHJldmlld1VJIiwiX19wcmV2aWV3SW1hZ2UiLCJfX3N3aXRjaFVJV3JhcCIsIl9fc3dpdGNoVUkiLCJfX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJfdGhpczE5IiwiY29uc3RyYWludFdpZHRoIiwiY29uc3RyYWludEhlaWdodCIsImlkZWFsIiwiY29uc3RyYWludHMiLCJhdWRpbyIsInpvb20iLCJmb2N1c01vZGUiLCJ3aGl0ZUJhbGFuY2VNb2RlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFVzZXJNZWRpYSIsInN0cmVhbSIsInN0cmVhbVNldHRpbmdzIiwiZ2V0VmlkZW9UcmFja3MiLCJnZXRTZXR0aW5ncyIsImFzcGVjdFJhdGlvIiwiX3RoaXMyMCIsImJhc2VXaWR0aCIsImJhc2VIZWlnaHQiLCJzY2FubmVyRnJhbWVSYXRpbyIsImd1aWRlQm94V2lkdGgiLCJndWlkZUJveEhlaWdodCIsImNhbGNPY3JDbGllbnRXaWR0aCIsImNhbGNPY3JDbGllbnRIZWlnaHQiLCJndWlkZUJveFJhdGlvQnlXaWR0aCIsIl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGgiLCJ2aWRlb1JhdGlvQnlIZWlnaHQiLCJfX3ZpZGVvUmF0aW9CeUhlaWdodCIsInJlZHVjZWRHdWlkZUJveFdpZHRoIiwiX19ndWlkZUJveFJlZHVjZVJhdGlvIiwicmVkdWNlZEd1aWRlQm94SGVpZ2h0IiwicGFkZGluZyIsInZpZGVvSW5uZXJHYXAiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtYXNrQm94SW5uZXIiLCJyIiwibWFza0JveElubmVyV2lkdGgiLCJtYXNrQm94SW5uZXJIZWlnaHQiLCJfdGhpczIxIiwiX19jYWxjR3VpZGVCb3hDcml0ZXJpYSIsImEiLCJiIiwibmV3VmlkZW9XaWR0aCIsIm5ld1ZpZGVvSGVpZ2h0IiwibmV3VmlkZW9SYXRpb0J5V2lkdGgiLCJuZXdWaWRlb1JhdGlvQnlIZWlnaHQiLCJjYWxjU3VtT2ZIZWlnaHRCb3R0b21VSUNoaWxkTm9kZXMiLCJfX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMiLCJjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCIsImNhcHR1cmVVSVBhZGRpbmdCb3R0b20iLCJwYWRkaW5nVG9wIiwiYmFzZWxpbmUiLCJzdW0iLCJpdGVtIiwiY2hpbGROb2RlcyIsInN0b3BTY2FuIiwiX3RoaXMyMiIsIl9fcmVzb3VyY2VzTG9hZGVkIiwiX19pc1N1cHBvcnRTaW1kIiwiZW52SW5mbyIsIm9zIiwib3NTaW1wbGUiLCJ1c2ViT0NSRW52SW5mbyIsInNka1N1cHBvcnRFbnYiLCJ1cmwiLCJmZXRjaCIsImhyZWYiLCJ0aGVuIiwicmVzIiwidGV4dCIsInJlZ2V4Iiwic291cmNlIiwicmVwbGFjZSIsIlJlZ0V4cCIsImV2YWwiLCJvblJ1bnRpbWVJbml0aWFsaXplZCIsIl9yZWYxMSIsIl94MyIsIl9fc3RhcnRTY2FuV2FzbUltcGwiLCJfdGhpczIzIiwiX19kZXRlY3RlZCIsIl9fYWRkcmVzcyIsIl9fc3NhUmV0cnlDb3VudCIsInNjYW4iLCJfcmVmMTIiLCJpc0RldGVjdGVkQ2FyZCIsInNzYVJlc3VsdCIsInNzYVJlc3VsdExpc3QiLCJtYXNrSW5mbyIsInJlc29sdXRpb25fdyIsInJlc29sdXRpb25faCIsIl9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlIiwicmV0cnlTdGFydERhdGUiLCJEYXRlIiwiRkFLRSIsIlJFQUwiLCJFTlNFTUJMRSIsImlzQ29tcGxldGVkIiwiX2xvb3AiLCJleGVjdXRlIiwiX3JlZjEzIiwiX3JldCIsInJldHJ5V29ya2luZ1RpbWUiLCJsZWdhY3lGb3JtYXQiLCJuZXdGb3JtYXQiLCJwYXJzZU9jclJlc3VsdCIsIm9jcl90eXBlIiwic3NhX21vZGUiLCJfX2NvbXByZXNzSW1hZ2VzIiwib2NyX2RhdGEiLCJfX29uU3VjY2Vzc1Byb2Nlc3MiLCJfX3JlY292ZXJlZCIsIl90aGlzMjQiLCJyZXNpemVSYXRpbyIsImRlZmF1bHRPcHRpb25zIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJjb252ZXJ0U2l6ZSIsInRhcmdldENvbXByZXNzVm9sdW1lIiwibWFza2luZ0ltYWdlT3B0aW9ucyIsInF1YWxpdHkiLCJfX3JlcXVlc3RHZXRBUElUb2tlbiIsImNyZWRlbnRpYWwiLCJhdXRoU2VydmVySW5mbyIsImJhc2VVcmwiLCJib2R5IiwibWV0aG9kIiwianNvbiIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwidG9rZW4iLCJjYXRjaCIsImVyciIsIl9fcmVxdWVzdFNlcnZlck9DUiIsIl90aGlzMjUiLCJfcmVmMTQiLCJvY3JTZXJ2ZXJCYXNlVXJsIiwiYXBpVG9rZW4iLCJteUhlYWRlcnMiLCJIZWFkZXJzIiwiYXBwZW5kIiwicmF3IiwiaW1hZ2VfYmFzZTY0IiwibWFza19tb2RlIiwiZmFjZV9tb2RlIiwicmVxdWVzdE9wdGlvbnMiLCJyZWRpcmVjdCIsIl94NCIsIl94NSIsIl9fc3RhcnRTY2FuU2VydmVySW1wbCIsIl90aGlzMjYiLCJfcmVmMTUiLCJfcmVmMTYiLCJiYXNlNjRJbWFnZVJlc3VsdCIsIl94NiIsIl94NyIsImltZ0RhdGFVUkwiLCJsaW1pdFNhdmVJbWFnZUNvdW50Iiwic2hpZnQiLCJfX2RlYnVnTW9kZSIsIl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQiLCJfdGhpczI3IiwiYXBpX3Jlc3BvbnNlIiwicmVzdWx0X2NvZGUiLCJyZXN1bHRfbWVzc2FnZSIsInJlc3VsdENvZGUiLCJfdGhpczI4IiwiZXJyb3JEZXRhaWwiLCJzdGFjayIsImVycm9yX2RldGFpbCIsIl90aGlzMjkiLCJwcmVsb2FkaW5nU3RhdHVzIiwiX3RoaXMzMCIsIl90aGlzMzEiLCJfX3JlY292ZXJ5U2NhbiIsIl90aGlzMzIiLCJjYW52YXNDb250ZXh0IiwiY2xlYXJSZWN0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkIiwic3RvcCIsInRyYWNrcyIsImdldFRyYWNrcyIsImZvckVhY2giLCJ0cmFjayIsInJlc3RvcmVJbml0aWFsaXplIiwiY2xlYXJUaW1lb3V0Il0sInNvdXJjZXMiOlsib2NyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiBnbG9iYWwtbW9kdWxlICovXG5pbXBvcnQgZGV0ZWN0b3IgZnJvbSAnLi9oZWxwZXJzL2RldGVjdG9yLmpzJztcbmltcG9ydCB1c2ViT0NSV0FTTVBhcnNlciBmcm9tICcuL2hlbHBlcnMvdXNlYi1vY3Itd2FzbS1wYXJzZXIuanMnO1xuaW1wb3J0IHVzZWJPQ1JBUElQYXJzZXIgZnJvbSAnLi9oZWxwZXJzL3VzZWItb2NyLWFwaS1wYXJzZXIuanMnO1xuaW1wb3J0IHsgaXNTdXBwb3J0V2FzbSwgbWVhc3VyZSwgc2ltZCwgdGhyZWFkcyB9IGZyb20gJy4vaGVscGVycy93YXNtLWZlYXR1cmUtZGV0ZWN0LmpzJztcbmltcG9ydCBJbWFnZVV0aWwgZnJvbSAnLi9oZWxwZXJzL2ltYWdlLXV0aWwuanMnO1xubGV0IGluc3RhbmNlO1xuY2xhc3MgVXNlQk9DUiB7XG4gIElOX1BST0dSRVNTID0ge1xuICAgIE5PTkU6ICdub25lJyxcbiAgICBOT1RfUkVBRFk6ICdub3RfcmVhZHknLFxuICAgIFJFQURZOiAncmVhZHknLFxuICAgIENBUkRfREVURUNUX1NVQ0NFU1M6ICdkZXRlY3Rfc3VjY2VzcycsXG4gICAgQ0FSRF9ERVRFQ1RfRkFJTEVEOiAnZGV0ZWN0X2ZhaWxlZCcsXG4gICAgTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUzogJ21hbnVhbF9jYXB0dXJlX3N1Y2Nlc3MnLFxuICAgIE1BTlVBTF9DQVBUVVJFX0ZBSUxFRDogJ21hbnVhbF9jYXB0dXJlX2ZhaWxlZCcsXG4gICAgT0NSX1JFQ09HTklaRUQ6ICdyZWNvZ25pemVkJyxcbiAgICBPQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTogJ3JlY29nbml6ZWRfd2l0aF9zc2EnLFxuICAgIE9DUl9TVUNDRVNTOiAnb2NyX3N1Y2Nlc3MnLFxuICAgIE9DUl9TVUNDRVNTX1dJVEhfU1NBOiAnb2NyX3N1Y2Nlc3Nfd2l0aF9zc2EnLFxuICAgIE9DUl9GQUlMRUQ6ICdvY3JfZmFpbGVkJ1xuICB9O1xuICBPQ1JfU1RBVFVTID0ge1xuICAgIE5PVF9SRUFEWTogLTEsXG4gICAgUkVBRFk6IDAsXG4gICAgT0NSX1NVQ0NFU1M6IDEsXG4gICAgRE9ORTogMlxuICB9O1xuICBQUkVMT0FESU5HX1NUQVRVUyA9IHtcbiAgICBOT1RfU1RBUlRFRDogLTEsXG4gICAgU1RBUlRFRDogMCxcbiAgICBET05FOiAxXG4gIH07XG4gIE9DUl9JTUdfTU9ERSA9IHtcbiAgICBXQVJQSU5HOiAwLFxuICAgIENST1BQSU5HOiAxLFxuICAgIE5PTkU6IDJcbiAgfTtcbiAgT0NSX0lNR19NQVNLX01PREUgPSB7XG4gICAgRkFMU0U6IDAsXG4gICAgVFJVRTogMVxuICB9O1xuXG4gIC8qKiBwdWJsaWMgcHJvcGVydGllcyAqL1xuXG4gIC8qKiBwcml2YXRlIHByb3BlcnRpZXMgKi9cbiAgX19kZWJ1Z01vZGUgPSBmYWxzZTtcbiAgX19PQ1JFbmdpbmUgPSBudWxsO1xuICBfX2lzU3VwcG9ydFdhc20gPSBmYWxzZTtcbiAgX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gIF9faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgX19wcmVsb2FkZWQgPSBmYWxzZTtcbiAgX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgX19saWNlbnNlO1xuICBfX29jclR5cGU7XG4gIF9fc3NhTW9kZSA9IGZhbHNlO1xuICBfX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gIF9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCA9IDEwO1xuICBfX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICBfX3NzYVJldHJ5Q291bnQgPSAwO1xuICBfX2RldGVjdGVkQ2FyZFF1ZXVlID0gW107XG4gIF9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQgPSBbXTtcbiAgX19vblN1Y2Nlc3MgPSBudWxsO1xuICBfX29uRmFpbHVyZSA9IG51bGw7XG4gIF9fb25JblByb2dyZXNzQ2hhbmdlID0gbnVsbDtcbiAgX19vY3JUeXBlTGlzdCA9IFsnaWRjYXJkJywgJ2RyaXZlcicsICdwYXNzcG9ydCcsICdmb3JlaWduLXBhc3Nwb3J0JywgJ2FsaWVuJywgJ2FsaWVuLWJhY2snLCAnY3JlZGl0JywgJ2lkY2FyZC1zc2EnLCAnZHJpdmVyLXNzYScsICdwYXNzcG9ydC1zc2EnLCAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnLCAnYWxpZW4tc3NhJ107XG4gIF9fb2NyVHlwZU51bWJlclRvU3RyaW5nID0gbmV3IE1hcChbWycxJywgJ2lkY2FyZCddLCBbJzInLCAnZHJpdmVyJ10sIFsnMycsICdwYXNzcG9ydCddLCBbJzQnLCAnZm9yZWlnbi1wYXNzcG9ydCddLCBbJzUnLCAnYWxpZW4nXSwgWyc1LTEnLCAnYWxpZW4nXSwgWyc1LTInLCAnYWxpZW4nXSwgWyc1LTMnLCAnYWxpZW4nXV0pO1xuICBfX29jclN0cmluZ1RvVHlwZU51bWJlciA9IG5ldyBNYXAoW1snaWRjYXJkJywgJzEnXSwgWydkcml2ZXInLCAnMiddLCBbJ3Bhc3Nwb3J0JywgJzMnXSwgWydmb3JlaWduLXBhc3Nwb3J0JywgJzQnXSwgWydhbGllbicsICc1J10sIFsnYWxpZW4nLCAnNS0xJ10sIFsnYWxpZW4nLCAnNS0yJ10sIFsnYWxpZW4nLCAnNS0zJ11dKTtcbiAgX19wYWdlRW5kID0gZmFsc2U7XG4gIF9fb2NyO1xuICBfX2NhbnZhcztcbiAgX19yb3RhdGlvbkNhbnZhcztcbiAgX192aWRlbztcbiAgX192aWRlb1dyYXA7XG4gIF9fZ3VpZGVCb3g7XG4gIF9fZ3VpZGVCb3hXcmFwO1xuICBfX21hc2tCb3hXcmFwO1xuICBfX3ByZXZlbnRUb0ZyZWV6ZVZpZGVvO1xuICBfX2N1c3RvbVVJV3JhcDtcbiAgX190b3BVSTtcbiAgX19taWRkbGVVSTtcbiAgX19ib3R0b21VSTtcbiAgX19wcmV2aWV3VUlXcmFwO1xuICBfX3ByZXZpZXdVSTtcbiAgX19wcmV2aWV3SW1hZ2U7XG4gIF9fY2FwdHVyZVVJV3JhcDtcbiAgX19jYXB0dXJlVUk7XG4gIF9fc3dpdGNoVUlXcmFwO1xuICBfX3N3aXRjaFVJO1xuICBfX2NhcHR1cmVCdXR0b247XG4gIF9fYWRkcmVzcyA9IDA7XG4gIF9fZGV0ZWN0ZWQgPSBmYWxzZTtcbiAgX19yZWNvdmVyZWQgPSBmYWxzZTtcbiAgX19CdWZmZXIgPSBudWxsO1xuICBfX3Jlc3VsdEJ1ZmZlciA9IG51bGw7XG4gIF9fbWFza0luZm9SZXN1bHRCdWYgPSBudWxsO1xuICBfX1ByZXZJbWFnZSA9IG51bGw7XG4gIF9fc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gIF9fY2FtU2V0Q29tcGxldGUgPSBmYWxzZTtcbiAgX19yZXNvbHV0aW9uV2lkdGggPSAwO1xuICBfX3Jlc29sdXRpb25IZWlnaHQgPSAwO1xuICBfX3ZpZGVvV2lkdGggPSAwO1xuICBfX3ZpZGVvSGVpZ2h0ID0gMDtcbiAgX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgX19pbnRlcnZhbFRpbWVyO1xuICBfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXI7XG4gIF9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQ7XG4gIF9fc3RyZWFtO1xuICBfX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICBfX2ZhY2luZ01vZGVDb25zdHJhaW50ID0gJ2Vudmlyb25tZW50JztcbiAgX191aU9yaWVudGF0aW9uID0gJyc7XG4gIF9fcHJldlVpT3JpZW50YXRpb24gPSAnJztcbiAgX192aWRlb09yaWVudGF0aW9uID0gJyc7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gbnVsbDtcbiAgX190aHJvdHRsaW5nUmVzaXplRGVsYXkgPSA1MDA7XG4gIF9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPSAzMDA7IC8vIOyehOyLnFxuICBfX3JldHJ5Q291bnRHZXRBZGRyZXNzID0gMDsgLy8g7J6E7IucXG4gIF9fZGV2aWNlSW5mbztcbiAgX19pc1JvdGF0ZWQ5MG9yMjcwID0gZmFsc2U7XG4gIF9faW5Qcm9ncmVzc1N0ZXAgPSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTtcbiAgX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT05FO1xuICBfX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICBfX2d1aWRlQm94UmF0aW9CeVdpZHRoID0gMS4wOyAvLyDsiJjsoJXrtojqsIBcbiAgX192aWRlb1JhdGlvQnlIZWlnaHQgPSAwLjk7IC8vIOyImOygleu2iOqwgFxuICBfX2d1aWRlQm94UmVkdWNlUmF0aW8gPSAwLjg7IC8vIOyImOygleu2iOqwgFxuICBfX2Nyb3BJbWFnZVNpemVXaWR0aCA9IDA7XG4gIF9fY3JvcEltYWdlU2l6ZUhlaWdodCA9IDA7XG4gIF9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBmYWxzZTtcblxuICAvKiogRGVmYXVsdCBvcHRpb25zICovXG4gIF9fb3B0aW9ucyA9IG5ldyBPYmplY3Qoe1xuICAgIC8vIOuUlOuyhOq5hSDsmLXshZhcbiAgICBzaG93Q2xpcEZyYW1lOiBmYWxzZSxcbiAgICAvLyBjaWxwLWZyYW1lIOuztOq4sFxuICAgIHNob3dDYW52YXNQcmV2aWV3OiBmYWxzZSxcbiAgICAvLyBjYW52YXMgcHJldmlldyDrs7TquLBcblxuICAgIC8vIOy2nOugpSDsmLXshZhcbiAgICAvLyDslZTtmLjtmZRcbiAgICB1c2VFbmNyeXB0TW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo6rCc7J246rOg7Jyg7Iud67OE67aA7Zi4IOq0gOugqCDtla3rqqkg7JWU7Zi47ZmUKVxuICAgIHVzZUVuY3J5cHRBbGxNb2RlOiBmYWxzZSxcbiAgICAvLyDslZTtmLjtmZQg7KCB7JqpICjsoITssrQg7JWU7Zi47ZmULCBlbmNyeXB0IG9iamVjdCDrs4Trj4Qg7KCc6rO1KVxuICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgLy8gdXNlUGlpRW5jcnlwdE1vZGU6IGZhbHNlLCAvLyDslZTtmLjtmZQg7KCB7JqpIChwaWkpXG4gICAgLy8gdXNlUGlpRW5jcnlwdEZhY2U6IGZhbHNlLCAvLyDsi6DrtoTspp0g7Ja86rW07IKs7KeEIOyVlO2YuO2ZlCDsoIHsmqkgKHBpaSlcbiAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICB1c2VMZWdhY3lGb3JtYXQ6IGZhbHNlLFxuICAgIC8vIExlZ2FjeSBmb3JtYXQg7KeA7JuQXG4gICAgdXNlTWFza0luZm86IHRydWUsXG4gICAgLy8g66eI7Iqk7YK5IOyijO2RnCDsp4Dsm5BcbiAgICB1c2VGYWNlSW1hZ2U6IHRydWUsXG4gICAgLy8g7Iug67aE7KadIOuCtCDslrzqtbQg7IKs7KeEXG4gICAgdXNlSW1hZ2VXYXJwaW5nOiBmYWxzZSxcbiAgICAvLyDsi6DrtoTspp0g7J2066+47KeA66W8IFdhcnBpbmco7Jmc6rOhIOuztOyglSDtlaDsp4Ag7Jes67aAKVxuICAgIHVzZUNvbXByZXNzSW1hZ2U6IGZhbHNlLFxuICAgIC8vIOyLoOu2hOymnSDsnbTrr7jsp4Drpbwg7JWV7LaV7ZWg7KeAIOyXrOu2gFxuICAgIHVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aDogMTA4MCxcbiAgICAvLyDsnbTrr7jsp4Ag66as7IKs7J207KeVIOqwgOuhnCDtlbTsg4Hrj4RcbiAgICB1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lOiAxMDI0ICogNTAsXG4gICAgLy8g7J2066+47KeAIOyVley2lSDrqqntkZwg7Jqp65+JXG5cbiAgICAvLyBVSSDshKTsoJVcbiAgICB1c2VUb3BVSTogdHJ1ZSxcbiAgICAvLyDsg4Hri6ggVUlcbiAgICB1c2VUb3BVSVRleHRNc2c6IGZhbHNlLFxuICAgIC8v7IOB64uoIFVJID4gVEVYVFxuICAgIHVzZU1pZGRsZVVJOiB0cnVlLFxuICAgIC8v7KSR64uoIFVJXG4gICAgdXNlTWlkZGxlVUlUZXh0TXNnOiB0cnVlLFxuICAgIC8vIOykkeuLqCBVSSA+IFRFWFRcbiAgICB1c2VCb3R0b21VSTogdHJ1ZSxcbiAgICAvLyDtlZjri6ggVUlcbiAgICB1c2VCb3R0b21VSVRleHRNc2c6IGZhbHNlLFxuICAgIC8vIO2VmOuLqCBVSSA+IFRFWFRcbiAgICB1c2VQcmV2aWV3VUk6IHRydWUsXG4gICAgLy8gUHJldmlldyBVSVxuICAgIHVzZUNhcHR1cmVVSTogdHJ1ZSxcbiAgICAvLyDsuqHsspjrsoTtirwgVUlcbiAgICBwcmVsb2FkaW5nVUlUZXh0TXNnOiAn7Iug67aE7Kad7J247KadIOuqqOuTiOydhCDrtojrn6zsmKTripQg7KSRIOyeheuLiOuLpDxiciAvPuyeoOyLnOunjCDquLDri6TroKTso7zshLjsmpQnLFxuICAgIC8vIOyduOyLnSDtlITroIjsnoQg7Ji17IWYXG4gICAgZnJhbWVCb3JkZXJTdHlsZToge1xuICAgICAgd2lkdGg6IDUsXG4gICAgICAvLyBib3JkZXItd2lkdGhcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICAvLyBib3JkZXItcmFkaXVzXG4gICAgICBzdHlsZTogJ3NvbGlkJyxcbiAgICAgIC8vIGJvcmRlci1zdHlsZVxuXG4gICAgICAvLyDri6jqs4Trs4Qg7J247IudIO2UhOugiOyehCBib3JkZXIg7IOJ7IOBXG4gICAgICBub3RfcmVhZHk6ICcjMDAwMDAwJyxcbiAgICAgIC8vIOyKpOy6lOykgOu5hCA6IOqygOyglVxuICAgICAgcmVhZHk6ICcjYjhiOGI4JyxcbiAgICAgIC8vIOyKpOy6lOuMgOq4sCA6IO2ajOyDiVxuICAgICAgZGV0ZWN0X3N1Y2Nlc3M6ICcjNWU4ZmZmJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDshLHqs7UgOiDtlZjriphcbiAgICAgIGRldGVjdF9mYWlsZWQ6ICcjNzI1YjY3JyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDsi6TtjKggOiDrs7TrnbxcbiAgICAgIG1hbnVhbF9jYXB0dXJlX3N1Y2Nlc3M6ICcjNWU4ZmZmJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDshLHqs7UgOiDtlZjriphcbiAgICAgIG1hbnVhbF9jYXB0dXJlX2ZhaWxlZDogJyM3MjViNjcnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyLpO2MqCA6IOuztOudvFxuICAgICAgcmVjb2duaXplZDogJyMwMDNhYzInLFxuICAgICAgLy8gT0NS7JmE66OMIDog7YyM656RXG4gICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiAnIzAwM2FjMicsXG4gICAgICAvLyDsgqzrs7jtjJDrs4TspJEo7IKs67O47YyQ67OEIE9OKSA6IO2MjOuekVxuICAgICAgb2NyX3N1Y2Nlc3M6ICcjMTRiMDBlJyxcbiAgICAgIC8vIE9DUuyZhOujjCA6IOy0iOuhnVxuICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6ICcjMTRiMDBlJyxcbiAgICAgIC8vIE9DUuyZhOujjCjsgqzrs7jtjJDrs4QgT04pIDog7LSI66GdXG4gICAgICBvY3JfZmFpbGVkOiAnI0ZBMTEzRCcgLy8gT0NS7Iuk7YyoIDog67mo6rCVXG4gICAgfSxcblxuICAgIC8vIOuniOyKpO2BrCDtlITroIjsnoQgZmlsbCDsu6zrn6wg67OA6rK9IOyCrOyaqSDsl6zrtoBcbiAgICB1c2VNYXNrRnJhbWVDb2xvckNoYW5nZTogdHJ1ZSxcbiAgICAvLyDrp4jsiqTtgawg7ZSE66CI7J6EIOyYteyFmCAo7Lm066mU6528IOu5hOuUlOyYpCDsmIHsl63sl5DshJwg7J247IudIO2UhOugiOyehOunjCDrs7TsnbTqsowg7ZWY6rOgIOuCmOuouOyngOulvCDrja7slrTsk7DripQg7ZSE66CI7J6EIOyYgeyXrSlcbiAgICBtYXNrRnJhbWVTdHlsZToge1xuICAgICAgY2xpcF9mcmFtZTogJyNmZjAwYmYnLFxuICAgICAgLy8gY2xpcC1mcmFtZSDsg4nsg4EgOiDrlKXtjbztlIwgKOyImOygleu2iOqwgClcbiAgICAgIGJhc2VfY29sb3I6ICcjMzMzMzMzJyxcbiAgICAgIC8vIG1hc2stZnJhbWUg7IOJ7IOBIDog64uk7YGs6re466CI7J20ICjtiKzrqoXrj4TripQg7IiY7KCV67aI6rCAIGZm66GcIOqzoOyglSlcblxuICAgICAgLy8g64uo6rOE67OEIOuniOyKpO2BrCDtlITroIjsnoQgZmlsbCDsg4nsg4FcbiAgICAgIG5vdF9yZWFkeTogJyMzMzMzMzMnLFxuICAgICAgLy8g7Iqk7LqU7KSA67mEXG4gICAgICByZWFkeTogJyMzMzMzMzMnLFxuICAgICAgLy8g7Iqk7LqU64yA6riwXG4gICAgICBkZXRlY3Rfc3VjY2VzczogJyMyMjIyMjInLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyEseqztVxuICAgICAgZGV0ZWN0X2ZhaWxlZDogJyMzMzMzMzMnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyLpO2MqFxuICAgICAgbWFudWFsX2NhcHR1cmVfc3VjY2VzczogJyMyMjIyMjInLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyEseqztVxuICAgICAgbWFudWFsX2NhcHR1cmVfZmFpbGVkOiAnIzMzMzMzMycsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7Iuk7YyoXG4gICAgICByZWNvZ25pemVkOiAnIzIyMjIyMicsXG4gICAgICAvLyBPQ1LsmYTro4xcbiAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOyCrOuzuO2MkOuzhOykkSjsgqzrs7jtjJDrs4QgT04pXG4gICAgICBvY3Jfc3VjY2VzczogJyMxMTExMTEnLFxuICAgICAgLy9PQ1LsmYTro4xcbiAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiAnIzExMTExMScsXG4gICAgICAvLyBPQ1LsmYTro4wo7IKs67O47YyQ67OEIE9OKVxuICAgICAgb2NyX2ZhaWxlZDogJyMxMTExMTEnIC8vIE9DUuyLpO2MqFxuICAgIH0sXG5cbiAgICAvLyDstKzsmIHsmLXshZhcbiAgICB1c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlOiBmYWxzZSxcbiAgICAvLyDsoIDsgqzslpEg64uo66eQ7JeQ7IScIOyEnOuyhE9DUuuhnCDsnpDrj5kg7KCE7ZmYIOq4sOuKpVxuICAgIHVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZTogZmFsc2UsXG4gICAgLy8g7IiY64+Z7Jy866GcIOyEnOuyhE9DUiDsoITtmZgg6riw64qlICjsiJjrj5nsnbQgdHJ1ZeydtOuptCDsnpDrj5nsnYAg66y07Iuc65CoKVxuICAgIHN3aXRjaFRvU2VydmVyVGhyZXNob2xkOiAyMC4wLFxuICAgIC8vIOyekOuPmeyghO2ZmCDquLDspIDqsJIgKOyEseuKpSDsuKHsoJXsuZggbXMpXG4gICAgdXNlRm9yY2VDb21wbGV0ZVVJOiBmYWxzZSxcbiAgICAvLyBXQVNNIOuqqOuTnOydvOuVjCDrsoTtirwg64iE66W87IucIO2VtOuLuSDsi5zsoJDsl5Ag6rCV7KCc66GcIOyZhOujjCDsgqzsmqnsl6zrtoBcblxuICAgIC8vIOyImOuPmey0rOyYgSDrsoTtirwg7Ji17IWYXG4gICAgY2FwdHVyZUJ1dHRvblN0eWxlOiB7XG4gICAgICBzdHJva2VfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIC8vIOuyhO2KvCDthYzrkZDrpqwoc3Ryb2tlKSDsg4nsg4FcbiAgICAgIGJhc2VfY29sb3I6ICcjNWU4ZmZmJyAvLyDrsoTtirwg7IOJ7IOBXG4gICAgfSxcblxuICAgIHJlc291cmNlQmFzZVVybDogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAvLyB3YXNtLCBkYXRhIO2MjOydvCDrpqzshozsiqQgYmFzZSDqsr3roZwgKENETiDsgqzsmqnsi5wg67OA6rK9KVxuICAgIGRldmljZUxhYmVsOiAnJyxcbiAgICB2aWRlb1RhcmdldElkOiAnJyxcbiAgICAvLyDsubTrqZTrnbwg7ISk7KCVXG4gICAgcm90YXRpb25EZWdyZWU6IDAsXG4gICAgLy8gcm90YXRpb24tZGVncmVlIOy5tOuplOudvOqwgCDtmozsoITrkJwg6rCB64+EICg5MCwgMTkwLCAyNzApXG4gICAgbWlycm9yTW9kZTogZmFsc2UsXG4gICAgLy8gbWlycm9yLW1vZGUg7IWA7ZS8IOy5tOuplOudvCjtgqTsmKTsiqTtgawg65OxKSDsgqzsmqnsi5wg7KKM7JqwIOuwmOyghFxuXG4gICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgIDogJ2NvbXBhdGliaWxpdHknICjtmLjtmZjshLEg7Jqw7ISgKSB8fCAnaGlnaFF1YWxpdHknICjqs6DtmZTsp4gg7Jqw7ISgKVxuICAgIC8vIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2NvbXBhdGliaWxpdHknLCAvLyDtmLjtmZjshLEg7Jqw7ISgKOq2jOyepSwg65SU7Y+07Yq4KSA6IDcyMOycvOuhnCDqs6DsoJUsIOyggOyCrOyWkSDri6jrp5DquLAg7Zi47ZmY7ISxIOyii+ydjFxuICAgIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2hpZ2hRdWFsaXR5JyxcbiAgICAvLyDqs6DtmZTsp4gg7Jqw7ISgIDogMTA4MOydtCDqsIDriqXtlZjrqbQgMTA4MCDrtojqsIDriqXtlZjrqbQgNzIwXG5cbiAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOyEpOyglSA6ICdjYW1lcmFSZXNvbHV0aW9uJyAo7Lm066mU6528IO2VtOyDgeuPhCkgfHwgJ29jclZpZXdTaXplJyAob2NyIGRpdiDtgazquLApXG4gICAgY2FsY0d1aWRlQm94Q3JpdGVyaWE6ICdjYW1lcmFSZXNvbHV0aW9uJyxcbiAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOq4sOykgCjqtozsnqUsIOuUlO2PtO2KuCkgOiA3MjB4MTI4MCDtlbTsg4Hrj4Qo7IS466Gc66qo65OcKSDsnbzrlYwgb2NyIHZpZXcgd2lkdGggc2l6ZeqwgCA3MjDrs7Tri6Qg7YGwIOqyveyasCwg6rCA7J2065OcIOuwleyKpOulvCA3MjDsl5Ag66ee7LakIChwcmV2aWV3IO2ZlOuptCDquajsp5Ag7JeG7J2MKVxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhOiAnb2NyVmlld1NpemUnLCAvLyDtmZTrqbQg7IKs7J207KaIIOq4sOykgCA6IDcyMHgxMjgwIO2VtOyDgeuPhCjshLjroZzrqqjrk5wpIOydvOuVjCBvY3IgdmlldyB3aWR0aCBzaXpl6rCAIDcyMOuztOuLpCDtgbDqsr3smrAsIOqwgOydtOuTnCDrsJXsiqTrpbwgb2NyIHZpZXcgd2lkdGgg7IKs7JeQ7KaI7JeQIOunnuy2pCAocHJldmlldyDtmZTrqbQg6rCV7KCc66GcIOuKmOumrOq4sCDrlYzrrLjsl5Ag64uk7IaMIOq5qOynkClcblxuICAgIC8vIOyCrOuzuO2MkOuzhCBSRVRSWSDshKTsoJVcbiAgICAvLyBzc2FSZXRyeVR5cGVcbiAgICAvLyAgIC0gUkVBTCAgICAgOiDrs7jsnbgoUkVBTCkg6rGw67aA7JyoIC0+IEZhbHNlIE5lZ2F0aXZlKOyLpOygnOqwkuydgCBSRUFM7J24642wIOyYiOy4oeqwkuydgCBGQUtF65287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtCxcbiAgICAvLyAgIC0gRkFLRSAgICAgOiDtg4DsnbgoRkFLRSkg7IiY65297JyoIC0+IEZhbHNlIFBvc2l0aXZlKOyLpOygnOqwkuydgCBGQUtF7J24642wIOyYiOy4oeqwkuydgCBSRUFM7J2065287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtFxuICAgIC8vICAgLSBFTlNFTUJMRSA6IO2Pieq3oCDsoIjrjIDqsJIgLT4gc3NhTWF4UmV0cnlDb3VudCDrp4ztgbwg67CY67O1IOyImO2Wie2VmOqzoCBmZF9jb25maWRlbmNlIOygiOuMgOqwkiDqsJLsnZgg7Y+J6reg7Jy866GcIO2MkOyglVxuICAgIC8vIHNzYU1heFJldHJ5Q291bnQg7ISk7KCVIOqwkuunjO2BvCDsnqzsi5zrj4TtlZjsl6wg7ZWc67KI7J20652864+EIOq4sOykgOqwkihSRUFMIOuYkOuKlCBGQUtFKeydtCDrnKjrqbQg6riw7KSA6rCSKFJFQUwg65iQ64qUIEZBS0Up66GcIO2MkOyglVxuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJyxcbiAgICBzc2FSZXRyeVBpdm90OiAwLjUsXG4gICAgLy8gUkVBTC9GQUtF66W8IO2MkOygle2VmOuKlCBmZF9jb25maWRlbmNlIOq4sOykgOqwkiAod2FzbSDrsLDtj6wg67KE7KCE7JeQIOuUsOudvCDri6TrpoQpIOKAuyDsiJjsoJXrtojqsIBcbiAgICBzc2FNYXhSZXRyeUNvdW50OiAwLFxuICAgIC8vIOy1nOuMgCBSRVRSWSDtmozsiJjshKTsoJUgMOydtOuptCDrr7jsgqzsmqlcblxuICAgIC8vIHRoaXMuX19kZWJ1Zygp66W8IO2Gte2VtCDssI3snYAg66mU7Iuc7KeA66W8IGFsZXJ07Jy866GcIOudhOyauOyngCDsl6zrtoBcbiAgICB1c2VEZWJ1Z0FsZXJ0OiBmYWxzZVxuICB9KTtcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGluc3RhbmNlKSByZXR1cm4gaW5zdGFuY2U7XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBwdWJsaWMgbWV0aG9kcyAqL1xuICBhc3luYyBwcmVsb2FkaW5nKG9uUHJlbG9hZGVkKSB7XG4gICAgYXdhaXQgdGhpcy5fX3NldHVwRG9tRWxlbWVudHMoKTtcbiAgICBpZiAodGhpcy5pc1ByZWxvYWRlZCgpKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuc2hvd09DUkxvYWRpbmdVSSgpO1xuICAgICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLlNUQVJURUQ7XG4gICAgICBhd2FpdCB0aGlzLl9fbG9hZFJlc291cmNlcygpO1xuICAgICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLkRPTkU7XG4gICAgICB0aGlzLl9fcHJlbG9hZGVkID0gdHJ1ZTtcbiAgICAgIGlmIChvblByZWxvYWRlZCkgb25QcmVsb2FkZWQoKTtcbiAgICAgIHRoaXMuaGlkZU9DUkxvYWRpbmdVSSgpO1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBpc0luaXRpYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl9faW5pdGlhbGl6ZWQ7XG4gIH1cbiAgaXNQcmVsb2FkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkZWQ7XG4gIH1cbiAgZ2V0UHJlbG9hZGluZ1N0YXR1cygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXM7XG4gIH1cbiAgaXNFbmNyeXB0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdE1vZGUgfHwgdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdEFsbE1vZGU7XG4gIH1cbiAgaXNDcmVkaXRDYXJkKCkge1xuICAgIHJldHVybiB0aGlzLl9fb2NyVHlwZSA9PT0gJ2NyZWRpdCc7XG4gIH1cbiAgc2hvd09DUkxvYWRpbmdVSSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICB9XG4gIGhpZGVPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuICBlbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpIHtcbiAgICBpZiAodGhpcy5pc0NyZWRpdENhcmQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0TW9kZSkge1xuICAgICAgICBjb25zdCBpbmNsdWRlTGlzdCA9IFsnanVtaW4nLCAnZHJpdmVyX251bWJlcicsICdwYXNzcG9ydF9udW1iZXInLCAncGVyc29uYWxfbnVtYmVyJywgJ21yejInXTtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0ge1xuICAgICAgICAgIG9jcl9yZXN1bHQ6IF8udG9QYWlycyhfLnBpY2socmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LCBpbmNsdWRlTGlzdCkpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSwge30pLFxuICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UpXG4gICAgICAgIH07XG4gICAgICAgIHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCA9IHtcbiAgICAgICAgICAuLi5yZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsXG4gICAgICAgICAgLi4uZW5jcnlwdGVkLm9jcl9yZXN1bHRcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlID0gZW5jcnlwdGVkLm9jcl9vcmlnaW5faW1hZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleGNsdWRlTGlzdCA9IFsnY29tcGxldGUnLCAncmVzdWx0X3NjYW5fdHlwZScsICdjb2xvcl9wb2ludCcsICdmb3VuZF9mYWNlJywgJ3NwZWN1bGFyX3JhdGlvJywgJ3N0YXJ0X3RpbWUnLCAnZW5kX3RpbWUnLCAnZmRfY29uZmlkZW5jZScsICdpZF90cnV0aCcsICdpZF90cnV0aF9yZXRyeV9jb3VudCddO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5lbmNyeXB0ZWQgPSB7XG4gICAgICAgICAgb2NyX3Jlc3VsdDogXy50b1BhaXJzKF8ub21pdChyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGV4Y2x1ZGVMaXN0KSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSksXG4gICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9tYXNraW5nX2ltYWdlKSxcbiAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2UpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldE9DUkVuZ2luZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZTtcbiAgfVxuICBpbml0KHNldHRpbmdzKSB7XG4gICAgaWYgKCEhIXNldHRpbmdzLmxpY2Vuc2VLZXkpIHRocm93IG5ldyBFcnJvcignTGljZW5zZSBrZXkgaXMgZW1wdHknKTtcbiAgICB0aGlzLl9fbGljZW5zZSA9IHNldHRpbmdzLmxpY2Vuc2VLZXk7XG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IF8ubWVyZ2Uoe30sIHRoaXMuX19vcHRpb25zLCBzZXR0aW5ncyk7XG4gICAgdGhpcy5zZXRPcHRpb24obWVyZ2VkT3B0aW9ucyk7XG4gICAgdm9pZCAwO1xuICAgIGlmICghdGhpcy5pc0luaXRpYWxpemVkKCkpIHtcbiAgICAgIHRoaXMuX193aW5kb3dFdmVudEJpbmQoKTtcbiAgICAgIHRoaXMuX19kZXZpY2VJbmZvID0gZGV0ZWN0b3IuZ2V0T3NWZXJzaW9uKCk7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aGlzLl9faXNTdXBwb3J0V2FzbSA9IGlzU3VwcG9ydFdhc20oKTtcbiAgICAgIGlmICghdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3Qgc3VwcG9ydGVkLiBpbiB0aGlzIGJyb3dzZXIuJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBzZXRPcHRpb24oc2V0dGluZ3MpIHtcbiAgICB0aGlzLl9fb3B0aW9ucyA9IHNldHRpbmdzO1xuICB9XG4gIGdldE9wdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnM7XG4gIH1cbiAgZ2V0T2NyVHlwZSh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vY3JUeXBlTnVtYmVyVG9TdHJpbmcuZ2V0KHR5cGUpO1xuICB9XG4gIGdldE9jclR5cGVOdW1iZXIoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIuZ2V0KHN0cmluZyk7XG4gIH1cbiAgZ2V0VUlPcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fX3VpT3JpZW50YXRpb247XG4gIH1cbiAgZ2V0VmlkZW9PcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gIH1cbiAgYXN5bmMgY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUoKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgLy8g7IiY64+Z7KCE7ZmYIG9uIOydtOuptCDsiJjrj5nsoITtmZgg7Jqw7ISgXG4gICAgICByZXR1cm4gdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDsiJjrj5nsoITtmZggb2ZmIOydtOuptCDsnpDrj5nsoITtmZgg7LK07YGsXG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgICAvLyDsnpDrj5nsoITtmZggb27snbzrlYxcbiAgICAgICAgLy8g7ISx64qlIOy4oeygleqwkuydhCDquLDspIDsnLzroZwgV0FTTSBvciBTZXJ2ZXJcbiAgICAgICAgY29uc3QgW2xhdGVuY3lQZXIxMDBtcywgbWVhc3VyZVJlcG9ydF0gPSBhd2FpdCBtZWFzdXJlKCk7XG4gICAgICAgIHRoaXMuX19kZWJ1ZyhtZWFzdXJlUmVwb3J0KTtcbiAgICAgICAgcmV0dXJuIGxhdGVuY3lQZXIxMDBtcyA+IHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g7IiY64+Z7KCE7ZmY64+EIG9mZiwg7J6Q64+Z7KCE7ZmYIG9mZlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIHN0YXJ0T0NSKHR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UgPSBudWxsKSB7XG4gICAgaWYgKCEhIXR5cGUgfHwgISEhb25TdWNjZXNzIHx8ICEhIW9uRmFpbHVyZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBhd2FpdCB0aGlzLmNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlKCk7XG4gICAgdGhpcy5fX29jclR5cGUgPSB0eXBlO1xuICAgIHRoaXMuX19zc2FNb2RlID0gdGhpcy5fX29jclR5cGUuaW5kZXhPZignLXNzYScpID4gLTE7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG9uU3VjY2VzcztcbiAgICB0aGlzLl9fb25GYWlsdXJlID0gb25GYWlsdXJlO1xuICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UgPSBvbkluUHJvZ3Jlc3NDaGFuZ2U7XG4gICAgaWYgKG9uSW5Qcm9ncmVzc0NoYW5nZSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVRvcFVJKSB7XG4gICAgICAgIHRoaXMuX190b3BVSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudG9wVUk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkpIHtcbiAgICAgICAgdGhpcy5fX21pZGRsZVVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5taWRkbGVVSTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSkge1xuICAgICAgICB0aGlzLl9fYm90dG9tVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmJvdHRvbVVJO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgIGlmICghdGhpcy5pc0luaXRpYWxpemVkKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGluaXRpYWxpemVkIScpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5fX3ByZXByb2Nlc3MoKTtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8gc2VydmVyTW9kZVxuICAgICAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fcHJlbG9hZGluZ1dhc20oKTsgLy8g7ISc67KE66qo65OcIOydtOyngOunjCDslZTtmLjtmZQg7ZWY6riw7JyE7ZW0IHdhc23snYQgcHJlbG9hZGluZyDtlahcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5TZXJ2ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdhc21Nb2RlXG4gICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zdG9wT0NSKCk7XG4gICAgfVxuICB9XG4gIHN0b3BPQ1IoKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gIH1cbiAgc2V0SWdub3JlQ29tcGxldGUodmFsKSB7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zZXRJZ25vcmVDb21wbGV0ZSh2YWwpO1xuICB9XG4gIGVuY3J5cHQocGxhaW5TdHIpIHtcbiAgICByZXR1cm4gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHBsYWluU3RyKTtcbiAgfVxuICBhc3luYyByZXN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UsIGlzU3dpdGNoTW9kZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3dpdGNoTW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdG9wT0NSKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICB9XG5cbiAgLyoqIHByaXZhdGUgbWV0aG9kcyAqL1xuICBhc3luYyBfX3dhaXRQcmVsb2FkZWQoKSB7XG4gICAgbGV0IHdhaXRpbmdSZXRyeUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YWl0aW5nUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9O1xuICAgICAgY2hlY2soKTtcbiAgICB9KTtcbiAgfVxuICBfX3ByZXByb2Nlc3MoKSB7XG4gICAgY29uc3QgY29udmVydFR5cGVUb051bWJlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZUludChvcHRpb24pKSA/IDAgOiBwYXJzZUludChvcHRpb24pO1xuICAgIH07XG4gICAgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgpO1xuICB9XG4gIF9fd2luZG93RXZlbnRCaW5kKCkge1xuICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgaWYgKC9pcGhvbmV8aXBvZHxpcGFkLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBjb25zdCBza2lwVG91Y2hBY3Rpb25mb3Jab29tID0gZXYgPT4ge1xuICAgICAgICBpZiAoZXYudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXNfLl9fcGFnZUVuZCA9IHRydWU7XG4gICAgICBfdGhpc18uY2xlYW51cCgpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEhIV90aGlzXy5fX29jclR5cGUpIHJldHVybjtcbiAgICAgIGlmICghX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplKSB7XG4gICAgICAgIF90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IHRydWU7XG4gICAgICAgIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IG51bGw7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IF90aGlzXy5yZXN0YXJ0T0NSKF90aGlzXy5fX29jclR5cGUsIF90aGlzXy5fX29uU3VjY2VzcywgX3RoaXNfLl9fb25GYWlsdXJlLCBfdGhpc18uX19vbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghISFfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIpIHtcbiAgICAgICAgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dChoYW5kbGVSZXNpemUsIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVEZWxheSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19kZWJ1Zyhtc2cpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlRGVidWdBbGVydCkge1xuICAgICAgdm9pZCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIF9fc2xlZXAobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gIH1cbiAgX19ibG9iVG9CYXNlNjQoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgXykgPT4ge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgfSk7XG4gIH1cbiAgX19iYXNlNjR0b0Jsb2IoYmFzZTY0KSB7XG4gICAgLy8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xuICAgIGNvbnN0IGJ5dGVTdHJpbmcgPSBhdG9iKGJhc2U2NC5zcGxpdCgnLCcpWzFdKTtcblxuICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBjb25zdCBtaW1lU3RyaW5nID0gYmFzZTY0LnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXJcbiAgICBjb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgY29uc3QgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHtcbiAgICAgIHR5cGU6IG1pbWVTdHJpbmdcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX2NvbXByZXNlQmFzZTY0SW1hZ2UoYmFzZTY0LCBvcHRpb25zLCBjb25zdGFudE51bWJlcikge1xuICAgIGlmIChiYXNlNjQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGJsb2JGaWxlID0gdGhpcy5fX2Jhc2U2NHRvQmxvYihiYXNlNjQpO1xuICAgIGNvbnN0IGNvbXByZXNzZWQgPSBhd2FpdCBJbWFnZVV0aWwuY29tcHJlc3NJbWFnZShibG9iRmlsZSwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgIGNvbnN0IGNvbXByZXNzaW9uUmF0aW8gPSBNYXRoLnJvdW5kKCgxIC0gY29tcHJlc3NlZC5zaXplIC8gYmxvYkZpbGUuc2l6ZSkgKiAxMDAwMCkgLyAxMDA7XG4gICAgdm9pZCAwO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9fYmxvYlRvQmFzZTY0KGNvbXByZXNzZWQpO1xuICB9XG5cbiAgLyoqIOudvOydtOyEvOyKpCDtgqTrpbwgaGVhcCDsl5AgYWxsb2NhdGlvbiAqL1xuICBfX2dldFN0cmluZ09uV2FzbUhlYXAoKSB7XG4gICAgaWYgKCEhIXRoaXMuX19saWNlbnNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpY2Vuc2UgS2V5IGlzIGVtcHR5Jyk7XG4gICAgfVxuICAgIGNvbnN0IGxlbmd0aEJ5dGVzID0gdGhpcy5fX09DUkVuZ2luZS5sZW5ndGhCeXRlc1VURjgodGhpcy5fX2xpY2Vuc2UpICsgMTtcbiAgICB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyhsZW5ndGhCeXRlcyk7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zdHJpbmdUb1VURjgodGhpcy5fX2xpY2Vuc2UsIHRoaXMuX19zdHJpbmdPbldhc21IZWFwLCBsZW5ndGhCeXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuX19zdHJpbmdPbldhc21IZWFwO1xuICB9XG4gIF9fZW5jcnlwdFNjYW5SZXN1bHQob2NyUmVzdWx0KSB7XG4gICAgbGV0IHN0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIG9jclJlc3VsdCA9PT0gJ251bWJlcicpIG9jclJlc3VsdCA9IG9jclJlc3VsdC50b1N0cmluZygpO1xuICAgICAgaWYgKG9jclJlc3VsdCA9PT0gJycpIHJldHVybiAnJztcbiAgICAgIGlmICh0eXBlb2Ygb2NyUmVzdWx0ICE9PSAnc3RyaW5nJyAmJiAhISFvY3JSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvY3JSZXN1bHQgaXMgZW1wdHknKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBvY3JSZXN1bHQ7XG4gICAgICBjb25zdCBsZW5ndGhCeXRlcyA9IHRoaXMuX19PQ1JFbmdpbmUubGVuZ3RoQnl0ZXNVVEY4KGpzb25TdHJpbmcpICsgMTtcbiAgICAgIHN0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MobGVuZ3RoQnl0ZXMpO1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5zdHJpbmdUb1VURjgoanNvblN0cmluZywgc3RyaW5nT25XYXNtSGVhcCwgbGVuZ3RoQnl0ZXMpO1xuICAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdFJlc3VsdChzdHJpbmdPbldhc21IZWFwKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHN0cmluZ09uV2FzbUhlYXApIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZShzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fc2V0VmlkZW9SZXNvbHV0aW9uKHZpZGVvRWxlbWVudCkge1xuICAgIGxldCBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSBmYWxzZTtcbiAgICBsZXQgcmVzb2x1dGlvblRleHQgPSAnbm90IHJlYWR5JztcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgICByZXNvbHV0aW9uVGV4dFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMCkge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgICAgcmVzb2x1dGlvblRleHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJlc29sdXRpb25UZXh0ID0gdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggKyAneCcgKyB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XG4gICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxMDgwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTkyMCB8fCB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTkyMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDEwODApIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTI4MCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDcyMCB8fCB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gNzIwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTI4MCkge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW9FbGVtZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fX3ZpZGVvV2lkdGggPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aDtcbiAgICB0aGlzLl9fdmlkZW9IZWlnaHQgPSB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgfTtcbiAgfVxuICBfX2dldFNjYW5uZXJBZGRyZXNzKG9jclR5cGUpIHtcbiAgICBpZiAoIXRoaXMuX19vY3JUeXBlTGlzdC5pbmNsdWRlcyhvY3JUeXBlKSkgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgIHRyeSB7XG4gICAgICBsZXQgYWRkcmVzcyA9IDA7XG4gICAgICBsZXQgZGVzdHJveUNhbGxiYWNrID0gbnVsbDtcbiAgICAgIGNvbnN0IHN0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fZ2V0U3RyaW5nT25XYXNtSGVhcCgpO1xuICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgIC8vIE9DUlxuICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0SURDYXJkU2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lJRENhcmRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0UGFzc3BvcnRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveVBhc3Nwb3J0U2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRBbGllblNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95QWxpZW5TY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldENyZWRpdFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95Q3JlZGl0U2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjYW5uZXIgZG9lcyBub3QgZXhpc3RzJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgaWYgKGFkZHJlc3MgPT09IDApIHtcbiAgICAgICAgaWYgKHRoaXMuX19tYXhSZXRyeUNvdW50R2V0QWRkcmVzcyA9PT0gdGhpcy5fX3JldHJ5Q291bnRHZXRBZGRyZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBMaWNlbnNlIEtleScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19yZXRyeUNvdW50R2V0QWRkcmVzcysrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFthZGRyZXNzLCBkZXN0cm95Q2FsbGJhY2tdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRPRE8gOiBMaWNlbnNlIElzc3Vl7J24IOqyveyasCDsl5Drn6wg6rCS7J2EIOuwm+yVhOyEnCBlcnJvciDroZzqt7jrpbwg7LCN7J2EIOyImCDsnojqsowg7JqU7LKt7ZWE7JqUICjsnoTsi5wgTuuyiCDsnbTsg4EgYWRkcmVzc+ulvCDrqrvrsJvsnLzrqbQg6rCV7KCcIOyXkOufrClcbiAgICAgIHZvaWQgMDtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIF9fZ2V0QnVmZmVyKCkge1xuICAgIGlmICghdGhpcy5fX0J1ZmZlcikge1xuICAgICAgdGhpcy5fX0J1ZmZlciA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyh0aGlzLl9fcmVzb2x1dGlvbldpZHRoICogdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQgKiA0KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9fcmVzdWx0QnVmZmVyKSB7XG4gICAgICB0aGlzLl9fcmVzdWx0QnVmZmVyID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKDQwOTYpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0luZm8pIHtcbiAgICAgIGlmICghdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmKSB7XG4gICAgICAgIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyg0MDk2KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFt0aGlzLl9fQnVmZmVyLCB0aGlzLl9fcmVzdWx0QnVmZmVyLCB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWZdO1xuICB9XG4gIGFzeW5jIF9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbWFza01vZGUsIGltZ01vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGltZ1R5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLmVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZShhZGRyZXNzLCBtYXNrTW9kZSwgaW1nTW9kZSk7XG4gICAgICB9IGVsc2UgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLmVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZShhZGRyZXNzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fT0NSRW5naW5lLmdldEVuY29kZWRKcGdTaXplKCk7XG4gICAgICBjb25zdCBqcGdQb2ludGVyID0gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNvZGVkSnBnQnVmZmVyKCk7XG4gICAgICBjb25zdCByZXN1bHRWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fX09DUkVuZ2luZS5IRUFQOC5idWZmZXIsIGpwZ1BvaW50ZXIsIGpwZ1NpemUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkocmVzdWx0Vmlldyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdF0sIHtcbiAgICAgICAgdHlwZTogJ2ltYWdlL2pwZWcnXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9fYmxvYlRvQmFzZTY0KGJsb2IpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUVuY29kZWRKcGcoKTtcbiAgICB9XG4gIH1cblxuICAvKiogRnJlZSBidWZmZXIgKi9cbiAgX19kZXN0cm95QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fQnVmZmVyKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19CdWZmZXIpO1xuICAgICAgdGhpcy5fX0J1ZmZlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX19kZXN0cm95UmVzdWx0QnVmZmVyKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpO1xuICB9XG4gIF9fZGVzdHJveVJlc3VsdEJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX3Jlc3VsdEJ1ZmZlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fcmVzdWx0QnVmZmVyKTtcbiAgICAgIHRoaXMuX19yZXN1bHRCdWZmZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuICBfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zik7XG4gICAgICB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGcmVlIFByZXZJbWFnZSBidWZmZXIgKi9cbiAgX19kZXN0cm95UHJldkltYWdlKCkge1xuICAgIGlmICh0aGlzLl9fUHJldkltYWdlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19QcmV2SW1hZ2UpO1xuICAgICAgdGhpcy5fX1ByZXZJbWFnZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIGZyZWUgc3RyaW5nIGhlYXAgYnVmZmVyICovXG4gIF9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAoKSB7XG4gICAgaWYgKHRoaXMuX19zdHJpbmdPbldhc21IZWFwKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19zdHJpbmdPbldhc21IZWFwKTtcbiAgICAgIHRoaXMuX19zdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogZnJlZSBzY2FubmVyIGFkZHJlc3MgKi9cbiAgX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKSB7XG4gICAgaWYgKHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjaygpO1xuICAgICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2lzVmlkZW9SZXNvbHV0aW9uQ29tcGF0aWJsZSh2aWRlb0VsZW1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICByZXNvbHV0aW9uVGV4dFxuICAgIH0gPSBhd2FpdCB0aGlzLl9fc2V0VmlkZW9SZXNvbHV0aW9uKHZpZGVvRWxlbWVudCk7XG4gICAgaWYgKCFpc1N1cHBvcnRlZFJlc29sdXRpb24pIHtcbiAgICAgIGlmIChyZXNvbHV0aW9uVGV4dCAhPT0gJ25vdCByZWFkeScpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNTdXBwb3J0ZWRSZXNvbHV0aW9uO1xuICB9XG4gIF9fZ2V0Um90YXRpb25EZWdyZWUoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9fb3B0aW9ucy5yb3RhdGlvbkRlZ3JlZSAlIDM2MCArIDM2MCkgJSAzNjA7XG4gIH1cbiAgX19nZXRNaXJyb3JNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucy5taXJyb3JNb2RlO1xuICB9XG4gIGFzeW5jIF9fY3JvcEltYWdlRnJvbVZpZGVvKCkge1xuICAgIGlmICghdGhpcy5fX2NhbVNldENvbXBsZXRlKSByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgIGxldCBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcblxuICAgIC8vIHNvdXJjZSBpbWFnZSAob3IgdmlkZW8pXG4gICAgLy8g4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTXG4gICAgLy8g4pSDICAgICDilIogc3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilIPilIjilIjilIjilIgg4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTIOKUiiAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyBzeCAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiBzSGVpZ2h0ICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uIGNhbnZhc1xuICAgIC8vIOKUgyAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbIOKUiiAgICAgICAgICAgICAgIOKUg+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUk1xuICAgIC8vIOKUgyAgICAg4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSIICAgICAgICAgICAgICAgICDilIMgICAg4pSKICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICAgICAgICBzV2lkdGggICAgICAgICAgICAgICAgICAgICAg4pSDICAgIOKUiiBkeSAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyAgICDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSD4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICBkeCAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiBkSGVpZ2h0IOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSIICAgICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgICAgICAgIGRXaWR0aCAgICAgICAgICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJtcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIGR4LCBkeSlcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQvZHJhd0ltYWdlXG5cbiAgICBsZXQgY2FsY0NhbnZhcyA9IGNhbnZhcztcbiAgICBsZXQgY2FsY1ZpZGVvV2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9IZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPSB2aWRlby5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID0gdmlkZW8uY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aDtcbiAgICBsZXQgY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQgPSB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgICBjb25zdCBpc0FsaWVuQmFjayA9IHRoaXMuX19vY3JUeXBlID09PSAnYWxpZW4tYmFjayc7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCwgY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHRdID0gW2NhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0LCBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoXTtcbiAgICAgIFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFtjYWxjUmVzb2x1dGlvbl9oLCBjYWxjUmVzb2x1dGlvbl93XTtcbiAgICAgIGNhbGNDYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICAgIGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCc7XG4gICAgfVxuICAgIGxldCBjYWxjTWF4U1dpZHRoID0gOTk5OTk7XG4gICAgbGV0IGNhbGNNYXhTSGVpZ2h0ID0gOTk5OTk7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOyEuOuhnCBVSSAvIOyEuOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNXaWR0aCA9IGNhbGNWaWRlb1dpZHRoO1xuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOyEuOuhnCBVSSAvIOqwgOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g6rCA66GcIFVJIC8g6rCA66GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAvIOyEuOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNXaWR0aCA9IGNhbGNWaWRlb1dpZHRoO1xuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN4LCBzeTtcbiAgICBjb25zdCByYXRpbyA9IGNhbGNWaWRlb1dpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgY29uc3Qgc1dpZHRoID0gTWF0aC5taW4oTWF0aC5yb3VuZChjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoICogcmF0aW8pLCBjYWxjTWF4U1dpZHRoKTtcbiAgICBjb25zdCBzSGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5yb3VuZChjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCAqIHJhdGlvKSwgY2FsY01heFNIZWlnaHQpO1xuICAgIHN4ID0gTWF0aC5tYXgoTWF0aC5yb3VuZCgoY2FsY1ZpZGVvQ2xpZW50V2lkdGggLSBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoKSAvIDIgKiByYXRpbyksIDApO1xuICAgIHN5ID0gTWF0aC5tYXgoTWF0aC5yb3VuZCgoY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0IC0gY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQpIC8gMiAqIHJhdGlvKSwgMCk7XG4gICAgaWYgKGlzQWxpZW5CYWNrKSB7XG4gICAgICBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbY2FsY1Jlc29sdXRpb25faCwgY2FsY1Jlc29sdXRpb25fd107XG4gICAgfVxuICAgIGNhbGNDYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGNhbGNSZXNvbHV0aW9uX3cpO1xuICAgIGNhbGNDYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBjb25zdCBjYWxjQ29udGV4dCA9IGNhbGNDYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7XG4gICAgICB3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWVcbiAgICB9KTtcbiAgICBjYWxjQ29udGV4dC5kcmF3SW1hZ2UodmlkZW8sIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBsZXQgaW1nRGF0YSwgaW1nRGF0YVVybDtcbiAgICBpbWdEYXRhID0gY2FsY0NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGltZ0RhdGFVcmwgPSBjYWxjQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xuICAgIGlmIChpc0FsaWVuQmFjaykge1xuICAgICAgW2ltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCAyNzApO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtpbWdEYXRhLCBpbWdEYXRhVXJsXTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgZGVncmVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKGRlZ3JlZSA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKFtpbWdEYXRhLCBpbWdEYXRhVXJsXSk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGNvbnN0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGltZy5zcmMgPSBpbWdEYXRhVXJsO1xuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIGNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgICAgICBjb25zdCB0ZW1wQ29udGV4dCA9IHRlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGVtcENhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGlmIChbOTAsIDI3MF0uaW5jbHVkZXMoZGVncmVlKSkge1xuICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaW1nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKFswLCAxODBdLmluY2x1ZGVzKGRlZ3JlZSkpIHtcbiAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVncmVlID09PSA5MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKGltZy5oZWlnaHQsIDApO2Vsc2UgaWYgKGRlZ3JlZSA9PT0gMTgwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtlbHNlIGlmIChkZWdyZWUgPT09IDI3MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKDAsIGltZy53aWR0aCk7XG4gICAgICAgIHRlbXBDb250ZXh0LnJvdGF0ZShkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGVtcENvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIGNvbnN0IG5ld0ltYWdlRGF0YSA9IFs5MCwgMjcwXS5pbmNsdWRlcyhkZWdyZWUpID8gdGVtcENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZy5oZWlnaHQsIGltZy53aWR0aCkgOiB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcbiAgICAgICAgcmVzb2x2ZShbbmV3SW1hZ2VEYXRhLCB0ZW1wQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpXSk7XG4gICAgICAgIHRlbXBDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgYm94VHlwZSA9IDAsIHJldHJ5SW1nID0gbnVsbCkge1xuICAgIGlmICghYWRkcmVzcyB8fCBhZGRyZXNzIDwgMCkge1xuICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgaW1nRGF0YTtcbiAgICAgIGxldCBpbWdEYXRhVXJsID0gbnVsbDtcbiAgICAgIGNvbnN0IFtidWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgaWYgKHJldHJ5SW1nICE9PSBudWxsKSB7XG4gICAgICAgIGltZ0RhdGEgPSByZXRyeUltZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19jcm9wSW1hZ2VGcm9tVmlkZW8oKTtcbiAgICAgIH1cbiAgICAgIGlmICghISFpbWdEYXRhKSB7XG4gICAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgICAgfVxuICAgICAgdGhpcy5fX09DUkVuZ2luZS5IRUFQOC5zZXQoaW1nRGF0YS5kYXRhLCBidWZmZXIpO1xuICAgICAgbGV0IGtvciA9IGZhbHNlLFxuICAgICAgICBhbGllbiA9IGZhbHNlLFxuICAgICAgICBwYXNzcG9ydCA9IGZhbHNlO1xuICAgICAgc3dpdGNoICh0aGlzLl9fb2NyVHlwZSkge1xuICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAga29yID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIHBhc3Nwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICBhbGllbiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgLy8gbm90aGluZ1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgaWYgKGtvciB8fCBwYXNzcG9ydCB8fCBhbGllbikge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmRldGVjdF9pZGNhcmRfb3B0KGJ1ZmZlciwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIGFkZHJlc3MsIGtvciwgYWxpZW4sIHBhc3Nwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZGV0ZWN0X2lkY2FyZChidWZmZXIsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCBhZGRyZXNzLCBib3hUeXBlKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coJ2lzQ2FyZGJveERldGVjdGVkIHJlc3VsdCAtPS0tLS0tJywgcmVzdWx0KVxuICAgICAgcmV0dXJuIFshIXJlc3VsdCwgaW1nRGF0YSwgaW1nRGF0YVVybF07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdDYXJkIGRldGVjdGlvbiBlcnJvciA6ICcgKyBlO1xuICAgICAgaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnbWVtb3J5JykpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBfX3N0YXJ0UmVjb2duaXRpb24oYWRkcmVzcywgb2NyVHlwZSwgc3NhTW9kZSwgaXNTZXRJZ25vcmVDb21wbGV0ZSwgaW1nRGF0YSwgaW1nRGF0YVVybCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoYWRkcmVzcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2UgaWYgKGFkZHJlc3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnY2hlY2tWYWxpZGF0aW9uIEZhaWwnO1xuICAgICAgfVxuICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGw7XG4gICAgICBpZiAoIXRoaXMuX19vY3JUeXBlTGlzdC5pbmNsdWRlcyhvY3JUeXBlKSkgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgICAgY29uc3QgWywgcmVzdWx0QnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGNvbnN0IHJlY29nbml0aW9uID0gYXN5bmMgaXNTZXRJZ25vcmVDb21wbGV0ZSA9PiB7XG4gICAgICAgIGlmIChpc1NldElnbm9yZUNvbXBsZXRlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIDAsIGltZ0RhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbklEQ2FyZChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuUGFzc3BvcnQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQWxpZW4oYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQWxpZW5CYWNrKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQ3JlZGl0KGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2FubmVyIGRvZXMgbm90IGV4aXN0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzog7Iug7Jqp7Lm065Oc64qUIOyVhOyngSBrZXk6dmFsdWUg7ZiV7YOc66GcIOuzgO2ZmCDslYjrkJjslrQg7J6I7J2MXG4gICAgICAgIGlmIChvY3JUeXBlID09PSAnY3JlZGl0Jykge1xuICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IG51bGwgfHwgb2NyUmVzdWx0ID09PSAnJyB8fCBvY3JSZXN1bHQgPT09ICdmYWxzZScgfHwgb2NyUmVzdWx0WzBdID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fY3N2VG9PYmplY3Qob2NyUmVzdWx0KTtcbiAgICAgICAgaWYgKG9jclJlc3VsdD8uY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIG9jclJlc3VsdD8uY29tcGxldGUgPT09ICd0cnVlJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc1NldElnbm9yZUNvbXBsZXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCkge1xuICAgICAgICAgICAgICAvLyBkZXRlY3RlZENhcmRRdWV1ZeyXkOyEnCDtlZzsnqXsnYQg6rq864K07IScIOqwseyLoO2VnOuLpC5cbiAgICAgICAgICAgICAgLy8g7KCA7J6l65CY7Ja07J6I64qUIOydtOuvuOyngOydmCDsiKvsnpDqsIAgcmV0cnkg67O064ukIOyekeydgOqyveyasCDrjIDruYTtlZjsl6wgJeulvCDsgqzsmqntlahcbiAgICAgICAgICAgICAgY29uc3QgcXVldWVJZHggPSB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCAlIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGltZ0RhdGEgPSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVbcXVldWVJZHhdO1xuICAgICAgICAgICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVjb2duaXRpb24oaXNTZXRJZ25vcmVDb21wbGV0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDsgqzsp4Qg7ZWc7J6l7Jy866GcIE9DUiDsi6TtjKggKHBvcHVwIOuCtOumrOqzoCBzZXRJZ25vcmVDb21wbGV0ZShmYWxzZSkg7LKY66asP1xuICAgICAgICAgICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpO1xuICAgICAgICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTsgLy8g7Yyd7JeF7J20IOuCtOugpOqwiOuVjCDsspjrpqzrkJjsp4Drp4wg66+466asIOyymOumrFxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gZW5kIG9mIGZ1bmN0aW9uIHJlY29nbml0aW9uKClcblxuICAgICAgaWYgKGF3YWl0IHJlY29nbml0aW9uKGlzU2V0SWdub3JlQ29tcGxldGUpKSB7XG4gICAgICAgIGNvbnN0IGlzQ3JlZGl0Q2FyZCA9IG9jclR5cGUgPT09ICdjcmVkaXQnO1xuICAgICAgICBsZXQgb2NySW1hZ2VNb2RlO1xuICAgICAgICBpZiAoaXNDcmVkaXRDYXJkKSB7XG4gICAgICAgICAgb2NySW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuQ1JPUFBJTkc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fX29wdGlvbnMudXNlSW1hZ2VXYXJwaW5nKSB7XG4gICAgICAgICAgb2NySW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuV0FSUElORztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvY3JJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5OT05FO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcmlnaW5JbWFnZSA9IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLkZBTFNFLCBvY3JJbWFnZU1vZGUpO1xuICAgICAgICBsZXQgbWFza0ltYWdlID0gbnVsbDtcbiAgICAgICAgbGV0IGZhY2VJbWFnZSA9IG51bGw7XG4gICAgICAgIGlmICghaXNDcmVkaXRDYXJkKSB7XG4gICAgICAgICAgbWFza0ltYWdlID0gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIHRoaXMuT0NSX0lNR19NQVNLX01PREUuVFJVRSwgdGhpcy5PQ1JfSU1HX01PREUuV0FSUElORyk7XG4gICAgICAgICAgbWFza0ltYWdlID0gbWFza0ltYWdlID09PSAnZGF0YTonID8gbnVsbCA6IG1hc2tJbWFnZTtcbiAgICAgICAgICBmYWNlSW1hZ2UgPSB0aGlzLl9fb3B0aW9ucy51c2VGYWNlSW1hZ2UgPyBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbnVsbCwgb2NySW1hZ2VNb2RlLCAnZmFjZScpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3NhTW9kZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBLCBmYWxzZSwgbWFza0ltYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAvLyBpZiAoIWlzQ3JlZGl0Q2FyZCAmJiB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSkge1xuICAgICAgICAvLyAgIG9yaWdpbkltYWdlID0gdGhpcy5fX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChcbiAgICAgICAgLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vICAgICB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLkZBTFNFLFxuICAgICAgICAvLyAgICAgb2NySW1hZ2VNb2RlXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZW5jcnlwdCBiYXNlNjQgaW1hZ2UnLCB7IG9yaWdpbkltYWdlIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmIChmYWNlSW1hZ2UgJiYgdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdEZhY2UpIHtcbiAgICAgICAgLy8gICBmYWNlSW1hZ2UgPSB0aGlzLl9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KFxuICAgICAgICAvLyAgICAgYWRkcmVzcyxcbiAgICAgICAgLy8gICAgIG51bGwsXG4gICAgICAgIC8vICAgICBvY3JJbWFnZU1vZGUsXG4gICAgICAgIC8vICAgICAnZmFjZSdcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdlbmNyeXB0IGJhc2U2NCBmYWNlIGltYWdlJywgeyBmYWNlSW1hZ2UgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG5cbiAgICAgICAgcmV0dXJuIFtvY3JSZXN1bHQsIG9yaWdpbkltYWdlLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsLCBudWxsLCBudWxsXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBfX3N0YXJ0VHJ1dGgob2NyVHlwZSwgYWRkcmVzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBbLCByZXN1bHRCdWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgaWYgKG9jclR5cGUuaW5kZXhPZignLXNzYScpID4gLTEpIHtcbiAgICAgICAgLy8gVE9ETzogd29ya2Vy66W8IOyCrOyaqe2VmOyXrCDrqZTsnbgoVUkg656c642U66eBKSDsiqTroIjrk5zqsIAg66mI7LaU7KeAIOyViuuPhOuhnSDsspjrpqwg7ZWE7JqUICjtmITsnqwgbG9hZGluZyBVSSDrnYTsmrDrqbQg7JWg64uI66mU7J207IWYIOupiOy2pClcbiAgICAgICAgLy8gVE9ETzogc2V0VGltZW91dCDsnLzroZwg64KY64iE642U652864+EIO2aqOqzvCDsl4bsnYwgc2V0VGltZW91dCDsp4DsmrDqs6AsIHdvcmtlcuuhnCDrs4Dqsr0g7ZWE7JqUXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5fX09DUkVuZ2luZS5zY2FuVHJ1dGgoYWRkcmVzcywgcmVzdWx0QnVmZmVyKSk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdTU0EgTW9kZSBpcyB0cnVlLiBidXQsIG9jclR5cGUgaXMgaW52YWxpZCA6ICcgKyBvY3JUeXBlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19jc3ZUb09iamVjdChzdHIpIHtcbiAgICBsZXQgcGFpcnMgPSBzdHIuc3BsaXQoJzsnKTtcbiAgICBsZXQgb2JqID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnOicpO1xuICAgICAgaWYgKHBhaXIubGVuZ3RoID09PSAyKSBvYmpbcGFpclswXV0gPSBwYWlyWzFdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIF9fZ2V0TWFza0luZm8oYWRkcmVzcykge1xuICAgIGlmIChhZGRyZXNzID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGFkZHJlc3MgPT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2NoZWNrVmFsaWRhdGlvbiBGYWlsJztcbiAgICB9XG4gICAgY29uc3QgWywsIG1hc2tJbmZvUmVzdWx0QnVmXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmdldE1hc2tSZWN0KGFkZHJlc3MsIG1hc2tJbmZvUmVzdWx0QnVmKTtcbiAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0ID09PSAnJykge1xuICAgICAgdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKTtcblxuICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgPyBudWxsIDogdGhpcy5fX2NzdlRvT2JqZWN0KHJlc3VsdCk7XG4gIH1cbiAgYXN5bmMgX19zdGFydFRydXRoUmV0cnkob2NyVHlwZSwgYWRkcmVzcywgaW1nRGF0YSkge1xuICAgIGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCAwLCBpbWdEYXRhKTtcbiAgICAvLyBhd2FpdCB0aGlzLl9fc3RhcnRSZWNvZ25pdGlvbihhZGRyZXNzLCBvY3JUeXBlLCB0cnVlKTsgICAgICAvLyBmb3Ig7ISx64ql7J2EIOychO2VtCDsp4TtlokgWFxuICAgIHJldHVybiBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aChvY3JUeXBlLCBhZGRyZXNzKTtcbiAgfVxuICBfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAvLyAx7LSIIGRlbGF5IO2bhCDsi6TtlolcbiAgICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIH0sIDEwMDApO1xuICB9XG4gIGFzeW5jIF9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgY29uc3QgaXNQYXNzcG9ydCA9IHRoaXMuX19vY3JUeXBlLmluY2x1ZGVzKCdwYXNzcG9ydCcpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwVmlkZW8oaXNQYXNzcG9ydCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHZpZGVvXG4gICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAvLyBjb25zdCBbdHJhY2tdID0gdGhpcy5fX3N0cmVhbS5nZXRWaWRlb1RyYWNrcygpO1xuICAgICAgICAvLyBjb25zdCBjYXBhYmlsaXR5ID0gdHJhY2suZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ0NhcmRTY2FuX19pbml0aWFsaXplIGNhcGFiaWxpdHknLCBjYXBhYmlsaXR5KTtcbiAgICAgICAgaWYgKCdzcmNPYmplY3QnIGluIHZpZGVvKSB7XG4gICAgICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gdGhpcy5fX3N0cmVhbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBBdm9pZCB1c2luZyB0aGlzIGluIG5ldyBicm93c2VycywgYXMgaXQgaXMgZ29pbmcgYXdheS5cbiAgICAgICAgICB2aWRlby5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLl9fc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsICgpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmRlYnVnKCdwcm9jZWVkQ2FtZXJhUGVybWlzc2lvbiAtIG9ubG9hZGVkbWV0YWRhdGEnKTtcbiAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHZvaWQgMDtcblxuICAgICAgICAgIC8vIHZpZGVvIGVsZW1lbnQgc3R5bGUg7ISk7KCVXG4gICAgICAgICAgdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPSB2aWRlby52aWRlb1dpZHRoIC8gdmlkZW8udmlkZW9IZWlnaHQgPCAxID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHRoaXMuX19jYW1TZXRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2FkanVzdFN0eWxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5SRUFEWSk7XG4gICAgICAgIHZpZGVvLndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAoZS5uYW1lID09PSAnTm90QWxsb3dlZEVycm9yJykge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIEFjY2VzcyBQZXJtaXNzaW9uIGlzIG5vdCBhbGxvd2VkJztcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDAzJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5uYW1lID09PSAnTm90UmVhZGFibGVFcnJvcicpIHtcbiAgICAgICAgLy8g64uk66W46rOz7JeQ7IScIOy5tOuplOudvCDsnpDsm5DsnYQg7IKs7Jqp7KSRXG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICAgICAgICB0aGlzLl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpOyAvLyDsnqzqt4Ag7Zi47LacXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX19zZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgICBpZiAoZWwgJiYgc3R5bGUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgX19jaGFuZ2VPQ1JTdGF0dXModmFsKSB7XG4gICAgc3dpdGNoICh2YWwpIHtcbiAgICAgIC8vIE9DUlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLlJFQURZOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLlJFQURZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRDpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1M6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0E6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRDpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5ET05FO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19jaGFuZ2VTdGFnZSh2YWwsIGZvcmNlVXBkYXRlID0gZmFsc2UsIHJlY29nbml6ZWRJbWFnZSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5fX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPT09IHZhbCAmJiBmb3JjZVVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2NoYW5nZU9DUlN0YXR1cyh2YWwpO1xuICAgIHRoaXMuX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdmFsO1xuICAgIHRoaXMuX19pblByb2dyZXNzU3RlcCA9IHZhbDtcbiAgICBjb25zdCB7XG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgYm9yZGVyV2lkdGg6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGggKyAncHgnLFxuICAgICAgYm9yZGVyU3R5bGU6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUuc3R5bGUsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlckNvbG9yOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlW3ZhbF1cbiAgICB9O1xuICAgIGlmIChndWlkZUJveCkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCBzdHlsZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSkge1xuICAgICAgaWYgKCEhdGhpcy5fX29wdGlvbnMuc2hvd0NsaXBGcmFtZSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXNrQm94V3JhcD8ucXVlcnlTZWxlY3RvcignI21hc2tCb3hPdXRlcicpPy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZVt2YWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgY2FwdHVyZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcignI2NhcHR1cmVCdXR0b24nKT8uc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fX29wdGlvbnMuY2FwdHVyZUJ1dHRvblN0eWxlWydiYXNlX2NvbG9yJ10pO1xuICAgIH1cbiAgICBjb25zdCBvY3JNb2RlID0gdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID8gJ3NlcnZlcicgOiAnd2FzbSc7XG4gICAgaWYgKHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VUb3BVSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX190b3BVSSwgJ3RvcCcsIHRoaXMuX19vcHRpb25zLnVzZVRvcFVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fbWlkZGxlVUksICdtaWRkbGUnLCB0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJIHx8IHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX2JvdHRvbVVJLCAnYm90dG9tJywgdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTIHx8IHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpO1xuXG4gICAgICAgIC8vIEZBSUzsnbgg6rK97JqwIDXstIjtm4Qg7J6Q64+Z7J2EIOywveuLq+ydjFxuICAgICAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCkge1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5fX2hpZGVQcmV2aWV3VUksIDMwMDAsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0EpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9faGlkZVByZXZpZXdVSSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMSk7IC8vIGZvciBVSSB1cGRhdGVcbiAgfVxuXG4gIF9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVjb2duaXplZEltYWdlO1xuICAgIGNvbnN0IGltZ1N0eWxlID0ge1xuICAgICAgJ21heC13aWR0aCc6ICc3MCUnLFxuICAgICAgJ21heC1oZWlnaHQnOiAnNjAlJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdJbWFnZSwgaW1nU3R5bGUpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCB7XG4gICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICB9KTtcbiAgfVxuICBfX2hpZGVQcmV2aWV3VUkoY29udGV4dCkge1xuICAgIGxldCBfdGhpc18gPSB0aGlzO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBfdGhpc18gPSBjb250ZXh0O1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBfdGhpc18uX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0pO1xuICAgIF90aGlzXy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSAnJztcbiAgfVxuICBhc3luYyBfX2dldElucHV0RGV2aWNlcygpIHtcbiAgICAvLyB0aHJvdyBlcnJvciBpZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICBsZXQgY2FtZXJhID0gW107XG4gICAgZm9yIChjb25zdCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgaWYgKGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoZGV2aWNlIGluc3RhbmNlb2YgSW5wdXREZXZpY2VJbmZvKSB7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmdldENhcGFiaWxpdGllcykge1xuICAgICAgICAgICAgICBjb25zdCBjYXAgPSBkZXZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgICAgICAgIGlmIChjYXA/LmZhY2luZ01vZGU/LmluY2x1ZGVzKHRoaXMuX19mYWNpbmdNb2RlQ29uc3RyYWludCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1VsdHJhQ2FtZXJhUmVnID0gL3VsdHJhfOyauO2KuOudvC9naTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbHRyYUNhbWVyYVJlZy50ZXN0KGRldmljZS5sYWJlbD8udG9Mb3dlckNhc2UoKSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhbWVyYS5wdXNoKGNhcC5kZXZpY2VJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpT1MgMTcg66+466eM7J2YIGNocm9tZSwgc2FmYXJpIOyXkOyEnOuKlFxuICAgICAgICAgIC8vIElucHV0RGV2aWNlSW5mbyDqsJ3ssrTqsIAg7JeG7Ja07IScIGdldENhcGFiaWxpdGllc+ulvCDtmZXsnbjtlaAg7IiYIOyXhuq4sCDrlYzrrLjsl5BcbiAgICAgICAgICAvLyBkZXZpY2UgbGFiZWzrp4wg67O06rOgIO2bhOuptCDsubTrqZTrnbzroZwg7IKs7JqpXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgaXNCYWNrQ2FtZXJhUmVnID0gL2JhY2t87ZuE66m0L2c7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmxhYmVsPy5sZW5ndGggJiYgaXNCYWNrQ2FtZXJhUmVnLnRlc3QoZGV2aWNlLmxhYmVsKSkge1xuICAgICAgICAgICAgICBjYW1lcmEucHVzaChkZXZpY2UuZGV2aWNlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fZGVidWcoYGNhbWVyYSA9ICR7Y2FtZXJhfSwgY2FtZXJhLmxlbmd0aCA9ICR7Y2FtZXJhLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG4gIGNoZWNrVUlPcmllbnRhdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGV0ZWN0b3IuZ2V0VUlPcmllbnRhdGlvbihkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm9jcik7XG4gICAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50ICE9PSB0aGlzLl9fcHJldlVpT3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX191aU9yaWVudGF0aW9uID0gY3VycmVudDtcbiAgICAgIHRoaXMuX19wcmV2VWlPcmllbnRhdGlvbiA9IGN1cnJlbnQ7XG4gICAgICBpc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudCxcbiAgICAgIGlzQ2hhbmdlZFxuICAgIH07XG4gIH1cbiAgX19jbGVhckN1c3RvbVVJKG9iaikge1xuICAgIG9iai5pbm5lckhUTUwgPSAnJztcbiAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKG9iaiwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19zZXR1cERvbUVsZW1lbnRzKCkge1xuICAgIGxldCB7XG4gICAgICBvY3IsXG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveFdyYXAsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLFxuICAgICAgY3VzdG9tVUlXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b24sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld1VJLFxuICAgICAgcHJldmlld0ltYWdlLFxuICAgICAgc3dpdGNoVUlXcmFwLFxuICAgICAgc3dpdGNoVUksXG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLFxuICAgICAgcHJlbG9hZGluZ1VJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKCFvY3IpIHRocm93IG5ldyBFcnJvcignb2NyIGRpdiBlbGVtZW50IGlzIG5vdCBleGlzdCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHZpZGVvV3JhcC5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3hXcmFwKSBndWlkZUJveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHZpZGVvKSB2aWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY2FudmFzKSBjYW52YXMucmVtb3ZlKCk7XG4gICAgaWYgKHJvdGF0aW9uQ2FudmFzKSByb3RhdGlvbkNhbnZhcy5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3gpIGd1aWRlQm94LnJlbW92ZSgpO1xuICAgIGlmIChtYXNrQm94V3JhcCkgbWFza0JveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKSBwcmV2ZW50VG9GcmVlemVWaWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY3VzdG9tVUlXcmFwKSBjdXN0b21VSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8g6rCBIHRvcCwgbWlkZGxlLCBib3R0b20gVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmICh0b3BVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHRvcFVJKTtcbiAgICBpZiAobWlkZGxlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShtaWRkbGVVSSk7XG4gICAgaWYgKGJvdHRvbVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoYm90dG9tVUkpO1xuICAgIGlmIChjYXB0dXJlVUlXcmFwKSBjYXB0dXJlVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIGNhcHR1cmUgVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChjYXB0dXJlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoY2FwdHVyZVVJKTtcbiAgICBpZiAocHJldmlld1VJV3JhcCkgcHJldmlld1VJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBwcmV2aWV3IFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAocHJldmlld1VJICYmICF0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHByZXZpZXdVSSk7XG4gICAgaWYgKHN3aXRjaFVJV3JhcCkgc3dpdGNoVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIHN3aXRjaCBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHN3aXRjaFVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHRoaXMuX19jbGVhckN1c3RvbVVJKHN3aXRjaFVJKTtcbiAgICBpZiAocHJlbG9hZGluZ1VJV3JhcCkgcHJlbG9hZGluZ1VJV3JhcC5yZW1vdmUoKTtcbiAgICBjb25zdCByb3RhdGlvbkRlZ3JlZSA9IHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpO1xuICAgIHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID0gWzkwLCAyNzBdLmluY2x1ZGVzKHJvdGF0aW9uRGVncmVlKTtcbiAgICBsZXQgb2NyU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIG9jclN0eWxlKTtcbiAgICBjb25zdCB3cmFwU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIC8vIHZlcnRpY2FsIGFsaWduIG1pZGRsZVxuICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgfTtcbiAgICB2aWRlb1dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2aWRlb1dyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvV3JhcCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHtcbiAgICAgIHdoaWxlICh2aWRlb1dyYXAuZmlyc3RDaGlsZCkge1xuICAgICAgICB2aWRlb1dyYXAucmVtb3ZlQ2hpbGQodmlkZW9XcmFwLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW9XcmFwLCB3cmFwU3R5bGUpO1xuICAgIH1cbiAgICBvY3IuYXBwZW5kQ2hpbGQodmlkZW9XcmFwKTtcbiAgICBtYXNrQm94V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdtYXNrQm94V3JhcCcpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShtYXNrQm94V3JhcCwgd3JhcFN0eWxlKTtcbiAgICBsZXQgbWFza19mcmFtZSA9IHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlLmJhc2VfY29sb3IgKyAnZmYnO1xuICAgIGlmICghIXRoaXMuX19vcHRpb25zLnNob3dDbGlwRnJhbWUpIHtcbiAgICAgIG1hc2tfZnJhbWUgPSB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZS5jbGlwX2ZyYW1lICsgJzU1JztcbiAgICB9XG4gICAgbWFza0JveFdyYXAuaW5uZXJIVE1MID0gJycgKyBcIiAgPHN2ZyBpZD0nbWFza0JveENvbnRhaW5lcicgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cXG5cIiArIFwiICAgIDxtYXNrIGlkPSdtYXNrLXJlY3QnPlxcblwiICsgXCIgICAgICA8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxcblwiICsgXCIgICAgICA8c3ZnIHg9JzUwJScgeT0nNTAlJyBvdmVyZmxvdz0ndmlzaWJsZSc+XFxuXCIgKyBcIiAgICAgICAgICA8cmVjdCBpZD0nbWFza0JveElubmVyJ1xcblwiICsgXCIgICAgICAgICAgICB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI2MCdcXG5cIiArIFwiICAgICAgICAgICAgeD0nLTIwMCcgeT0nLTEzMCdcXG5cIiArIFwiICAgICAgICAgICAgcng9JzEwJyByeT0nMTAnXFxuXCIgKyBcIiAgICAgICAgICAgIGZpbGw9J2JsYWNrJyBzdHJva2U9J2JsYWNrJz48L3JlY3Q+XFxuXCIgKyAnICAgICAgPC9zdmc+XFxuJyArICcgICAgPC9tYXNrPlxcbicgKyBcIiAgICA8cmVjdCBpZD0nbWFza0JveE91dGVyJ1xcblwiICsgXCIgICAgICAgICAgeD0nMCcgeT0nMCcgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJSdcXG5cIiArIFwiICAgICAgICAgIGZpbGw9J1wiICsgbWFza19mcmFtZSArIFwiJyBtYXNrPSd1cmwoI21hc2stcmVjdCknPjwvcmVjdD5cXG5cIiArICcgIDwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKG1hc2tCb3hXcmFwKTtcbiAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdtdXRlZCcsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgbGV0IHZpZGVvU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICB9O1xuICAgIGNvbnN0IHJvdGF0ZUNzcyA9ICdyb3RhdGUoJyArIHJvdGF0aW9uRGVncmVlICsgJ2RlZyknO1xuICAgIGNvbnN0IG1pcnJvckNzcyA9ICdyb3RhdGVZKDE4MGRlZyknO1xuICAgIGNvbnN0IHJvdGF0ZUFuZE1pcnJvckNzcyA9IG1pcnJvckNzcyArICcgJyArIHJvdGF0ZUNzcztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIGlmICh0aGlzLl9fZ2V0TWlycm9yTW9kZSgpKSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVBbmRNaXJyb3JDc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVDc3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX19nZXRNaXJyb3JNb2RlKCkpIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IG1pcnJvckNzc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHZpZGVvU3R5bGUpO1xuICAgIHZpZGVvV3JhcC5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgZ3VpZGVCb3hXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3VpZGVCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdndWlkZUJveFdyYXAnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3hXcmFwLCB3cmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChndWlkZUJveFdyYXApO1xuICAgIGd1aWRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2d1aWRlQm94Jyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSk7XG4gICAgZ3VpZGVCb3hXcmFwLmFwcGVuZENoaWxkKGd1aWRlQm94KTtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdub25lJyA6ICdkaXNwbGF5JyA6ICdub25lJyxcbiAgICAgIHdpZHRoOiAnMjUlJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgbGVmdDogJzBweCcsXG4gICAgICB0b3A6ICczMHB4JyxcbiAgICAgIGJvcmRlcjogJ2dyZWVuIDJweCBzb2xpZCdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYW52YXMsIGNhbnZhc1N0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICByb3RhdGlvbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHJvdGF0aW9uQ2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdyb3RhdGlvbkNhbnZhcycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShyb3RhdGlvbkNhbnZhcywge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdkaXNwbGF5JyA6ICdub25lJyA6ICdub25lJyxcbiAgICAgIGhlaWdodDogJzI1JScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgIHRvcDogJzMwcHgnLFxuICAgICAgYm9yZGVyOiAnYmx1ZSAycHggc29saWQnXG4gICAgfSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKHJvdGF0aW9uQ2FudmFzKTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2ZW50VG9GcmVlemVWaWRlbycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2ZW50VG9GcmVlemVWaWRlbywge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206ICcxMCcsXG4gICAgICByaWdodDogJzEwJ1xuICAgIH0pO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLmlubmVySFRNTCA9ICcnICsgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKTtcbiAgICBjdXN0b21VSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjdXN0b21VSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2N1c3RvbVVJV3JhcCcpO1xuICAgIGNvbnN0IGN1c3RvbVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjdXN0b21VSVdyYXAsIGN1c3RvbVVJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY3VzdG9tVUlXcmFwKTtcblxuICAgIC8vIOqwgSB0b3AsIG1pZGRsZSwgYm90dG9tIFVJIOyCrOyaqSh1c2Up7Jes67aA7JmAIOq0gOqzhOyXhuydtCDsmIHsl63snYQg7J6h6riwIOychO2VtCwgZGl26rCAIOyXhuycvOuptCDsg53shLFcbiAgICAvLyBhZGp1c3RTdHlsZSgpIOyXkOyEnCDshLjrtoDsoIHsnbgg7IKs7J207KaI7JmAIOychOy5mOqwkiDrj5nsoIHsnLzroZwg7ISk7KCV65CoLlxuICAgIGlmICghdG9wVUkpIHtcbiAgICAgIHRvcFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndG9wVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKHRvcFVJKTtcbiAgICBpZiAoIW1pZGRsZVVJKSB7XG4gICAgICBtaWRkbGVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbWlkZGxlVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ21pZGRsZVVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZChtaWRkbGVVSSk7XG4gICAgaWYgKCFib3R0b21VSSkge1xuICAgICAgYm90dG9tVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJvdHRvbVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdib3R0b21VSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQoYm90dG9tVUkpO1xuICAgIGNhcHR1cmVVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjYXB0dXJlVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlVUlXcmFwJyk7XG4gICAgY29uc3QgY2FwdHVyZVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NlbnRlcidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCBjYXB0dXJlVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjYXB0dXJlVUlXcmFwKTtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICBpZiAodGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUZvcmNlQ29tcGxldGVVSSkge1xuICAgICAgICBpZiAoIWNhcHR1cmVVSSkge1xuICAgICAgICAgIGNhcHR1cmVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNhcHR1cmVVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZVVJJyk7XG4gICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhcHR1cmVCdXR0b24pIHtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZUJ1dHRvbicpO1xuICAgICAgICAgIGxldCBjYXB0dXJlQnV0dG9uU3JjU1ZHID0gYGA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPHN2ZyB3aWR0aD0nODAnIGhlaWdodD0nODAnIHZpZXdCb3g9JzAgMCA4MCA4MCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYCAgPGNpcmNsZSBpZD0nY2FwdHVyZUJ1dHRvbicgY3g9JzQwJyBjeT0nNDAnIHI9JzM4JyBmaWxsPScjNTU1NTU1JyBzdHJva2U9JyNmZmZmZmYnIHN0cm9rZS13aWR0aD0nNCcvPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPC9zdmc+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uLmlubmVySFRNTCA9IGNhcHR1cmVCdXR0b25TcmNTVkc7XG4gICAgICAgICAgY2FwdHVyZVVJLmFwcGVuZENoaWxkKGNhcHR1cmVCdXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmVVSVdyYXAuYXBwZW5kQ2hpbGQoY2FwdHVyZVVJKTtcbiAgICAgICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICAgICAgY29uc3QgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjYXB0dXJlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgIHByZXZpZXdVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZXZpZXdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdVSVdyYXAnKTtcbiAgICAgIGNvbnN0IHByZXZpZXdVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwMDAwYWEnXG4gICAgICB9O1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHByZXZpZXdVSVdyYXBTdHlsZSk7XG4gICAgICBvY3IuYXBwZW5kQ2hpbGQocHJldmlld1VJV3JhcCk7XG4gICAgICBpZiAoIXByZXZpZXdVSSkge1xuICAgICAgICBwcmV2aWV3VUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJldmlld1VJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3VUknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUksIHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICAnbWF4LXdpZHRoJzogJzkwJScsXG4gICAgICAgICdtYXgtaGVpZ2h0JzogJzkwJSdcbiAgICAgIH0pO1xuICAgICAgcHJldmlld1VJV3JhcC5hcHBlbmRDaGlsZChwcmV2aWV3VUkpO1xuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2UpIHtcbiAgICAgICAgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld0ltYWdlJyk7XG4gICAgICAgIHByZXZpZXdVSS5hcHBlbmRDaGlsZChwcmV2aWV3SW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICBzd2l0Y2hVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHN3aXRjaFVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUlXcmFwJyk7XG4gICAgICBjb25zdCBzd2l0Y2hVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICcnLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSVdyYXAsIHN3aXRjaFVJV3JhcFN0eWxlKTtcbiAgICAgIG9jci5hcHBlbmRDaGlsZChzd2l0Y2hVSVdyYXApO1xuICAgICAgaWYgKCFzd2l0Y2hVSSkge1xuICAgICAgICBzd2l0Y2hVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzd2l0Y2hVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUknKTtcbiAgICAgICAgbGV0IHN3aXRjaEhUTUwgPSBgYDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPGRpdiBjbGFzcz0nY3VzdG9tLS1sYWJlbCBmbGV4IGp1c3RpZnktY2VudGVyIGFsaWduLWNlbnRlciBnYXAxMCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94Jz5XQVNNPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBjbGFzcz0nc3dpdGNoJz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgICAgPGlucHV0IGlkPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICAgIDxzcGFuIGNsYXNzPSdzbGlkZXIgcm91bmQnPjwvc3Bhbj5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdwcmlvcml0eS1maW5hbmNlLWNvaHRtbEZvcmxpc3QtY2hlY2tib3gnPlNlcnZlcjwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPC9kaXY+YDtcbiAgICAgICAgc3dpdGNoVUkuaW5uZXJIVE1MID0gc3dpdGNoSFRNTDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSSwge1xuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH0pO1xuICAgICAgc3dpdGNoVUlXcmFwLmFwcGVuZENoaWxkKHN3aXRjaFVJKTtcbiAgICAgIGNvbnN0IHN3aXRjaENoZWNrYm94ID0gc3dpdGNoVUkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF07XG4gICAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgICAgY29uc3QgX19vbkNsaWNrU3dpdGNoVUkgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgYXdhaXQgX3RoaXNfLnJlc3RhcnRPQ1IoX3RoaXNfLl9fb2NyVHlwZSwgX3RoaXNfLl9fb25TdWNjZXNzLCBfdGhpc18uX19vbkZhaWx1cmUsIF90aGlzXy5fX29uSW5Qcm9ncmVzc0NoYW5nZSwgdHJ1ZSk7XG4gICAgICB9O1xuICAgICAgc3dpdGNoQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tTd2l0Y2hVSSwge1xuICAgICAgICBvbmNlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgcHJlbG9hZGluZ1VJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSVdyYXAnKTtcbiAgICBjb25zdCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAwMDBmZidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUlXcmFwLCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUlXcmFwKTtcbiAgICBpZiAoIXByZWxvYWRpbmdVSSkge1xuICAgICAgcHJlbG9hZGluZ1VJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcmVsb2FkaW5nVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSScpO1xuICAgICAgcHJlbG9hZGluZ1VJLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGV4dC1pbmZvJyk7XG4gICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MID0gJycgKyAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZyA9PT0gJycgfHwgdGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZykge1xuICAgICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MICs9IHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2c7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUksIHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfSk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUkpO1xuXG4gICAgLy8gbG9hZGluZyBVSSDsnITsuZgg7J6Q66as7J6h6rKMIO2VmOq4sCDsnITtlbRcbiAgICBhd2FpdCB0aGlzLl9faW5pdFN0eWxlKCk7XG5cbiAgICAvLyDtmZTrqbTqs7zrj4Qg7ZiE7IOBIO2VtOqysFxuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIHtcbiAgICAgIGRpc3BsYXk6ICcnXG4gICAgfSk7XG4gICAgdGhpcy5fX29jciA9IG9jcjtcbiAgICB0aGlzLl9fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuX19yb3RhdGlvbkNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgIHRoaXMuX192aWRlbyA9IHZpZGVvO1xuICAgIHRoaXMuX192aWRlb1dyYXAgPSB2aWRlb1dyYXA7XG4gICAgdGhpcy5fX2d1aWRlQm94ID0gZ3VpZGVCb3g7XG4gICAgdGhpcy5fX2d1aWRlQm94V3JhcCA9IGd1aWRlQm94V3JhcDtcbiAgICB0aGlzLl9fbWFza0JveFdyYXAgPSBtYXNrQm94V3JhcDtcbiAgICB0aGlzLl9fcHJldmVudFRvRnJlZXplVmlkZW8gPSBwcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgICB0aGlzLl9fY3VzdG9tVUlXcmFwID0gY3VzdG9tVUlXcmFwO1xuICAgIHRoaXMuX190b3BVSSA9IHRvcFVJO1xuICAgIHRoaXMuX19taWRkbGVVSSA9IG1pZGRsZVVJO1xuICAgIHRoaXMuX19ib3R0b21VSSA9IGJvdHRvbVVJO1xuICAgIHRoaXMuX19jYXB0dXJlVUlXcmFwID0gY2FwdHVyZVVJV3JhcDtcbiAgICB0aGlzLl9fY2FwdHVyZVVJID0gY2FwdHVyZVVJO1xuICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uID0gY2FwdHVyZUJ1dHRvbjtcbiAgICB0aGlzLl9fcHJldmlld1VJV3JhcCA9IHByZXZpZXdVSVdyYXA7XG4gICAgdGhpcy5fX3ByZXZpZXdVSSA9IHByZXZpZXdVSTtcbiAgICB0aGlzLl9fcHJldmlld0ltYWdlID0gcHJldmlld0ltYWdlO1xuICAgIHRoaXMuX19zd2l0Y2hVSVdyYXAgPSBzd2l0Y2hVSVdyYXA7XG4gICAgdGhpcy5fX3N3aXRjaFVJID0gc3dpdGNoVUk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9jcixcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgdmlkZW8sXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveCxcbiAgICAgIGd1aWRlQm94V3JhcCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgcHJldmVudFRvRnJlZXplVmlkZW8sXG4gICAgICBjdXN0b21VSVdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvbixcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3VUksXG4gICAgICBwcmV2aWV3SW1hZ2UsXG4gICAgICBzd2l0Y2hVSVdyYXAsXG4gICAgICBzd2l0Y2hVSVxuICAgIH07XG4gIH1cbiAgX19ibHVyQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgZGlzcGxheTogJydcbiAgICB9KTtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhcHR1cmVCdXR0b24pIHtcbiAgICAgIGNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIF9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcmV0dXJuIGNhcHR1cmVCdXR0b24gPyBjYXB0dXJlQnV0dG9uLmdldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcpID09PSAndHJ1ZScgOiBmYWxzZTtcbiAgfVxuICBhc3luYyBfX3NldHVwVmlkZW8oaXNQYXNzcG9ydCkge1xuICAgIC8vIHdhc20g7J247Iud7ISx64qlIOy1nOygge2ZlOuQnCDtlbTsg4Hrj4RcbiAgICB0aGlzLl9fcmVzb2x1dGlvbldpZHRoID0gMTA4MDtcbiAgICB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCA9IDcyMDtcbiAgICB0aGlzLl9fY2FtU2V0Q29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgbGV0IGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAvLyBjb25zb2xlLmxvZygndmlkZW9EZXZpY2VzIDo6ICcsIGNhbWVyYSlcblxuICAgIHRoaXMuY2hlY2tVSU9yaWVudGF0aW9uKCk7XG4gICAgbGV0IGNvbnN0cmFpbnRXaWR0aCwgY29uc3RyYWludEhlaWdodDtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhID09PSAnaGlnaFF1YWxpdHknKSB7XG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2ZlOyniCDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDqsIDriqXtlZzqsr3smrAg7IKs7JqpIOyVhOuLiOuptCAxMjgweDcyMCDsgqzsmqlcbiAgICAgIGNvbnN0cmFpbnRXaWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDE5MjAsXG4gICAgICAgIG1pbjogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiAxMDgwLFxuICAgICAgICBtaW46IDcyMFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gJ2NvbXBhdGliaWxpdHknXG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2YuO2ZmOyEsSDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDsgqzsmqkg6rCA64ql7ZWY642U652864+EIDEyODB4NzIw7J2EIOyCrOyaqe2VmOuPhOuhnSDqs6DsoJVcbiAgICAgIC8vIOyCrOycoCA6IOqwpOufreyLnCBlbnRyeSDrqqjrjbgoQeyLnOumrOymiCAvIFdpZGUg66qo6424IOuTsSnsl5DshJwgMTkyMCB4IDEwODAg7LKY66as7IucIOu5hOycqOydtCDsnbTsg4HtlbTsp5Ao7ZmA7K2J7J2065CoKVxuICAgICAgLy8g7ZWt7IOBIDEyODAgeCA3MjDsnYQg7IKs7Jqp7ZWY64+E66GdIOuzgOqyvVxuICAgICAgY29uc3RyYWludFdpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbnN0cmFpbnRzID0ge1xuICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgdmlkZW86IHtcbiAgICAgICAgem9vbToge1xuICAgICAgICAgIGlkZWFsOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGZhY2luZ01vZGU6IHtcbiAgICAgICAgICBpZGVhbDogdGhpcy5fX2ZhY2luZ01vZGVDb25zdHJhaW50XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgd2hpdGVCYWxhbmNlTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlSWQ6IGNhbWVyYS5sZW5ndGggPyB7XG4gICAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgICAgfSA6IG51bGwsXG4gICAgICAgIHdpZHRoOiBjb25zdHJhaW50V2lkdGgsXG4gICAgICAgIGhlaWdodDogY29uc3RyYWludEhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDstZzstIgg7KeE7J6FIOydtOyWtOyEnCB2aWRlb0RlaXZjZSDrpqzsiqTtirjrpbwg6rCA7KC47JisIOyImCDsl4bsnLzrqbQsXG4gICAgLy8gZ2V0VXNlck1lZGlh66W8IOyehOydmCDtmLjstpztlZjsl6wg6raM7ZWc7J2EIOuwm+ydgOuSpCDri6Tsi5wg6rCA7KC47Ji0XG4gICAgaWYgKGNhbWVyYS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX19kZWJ1ZygnY2Fubm90IHRvIGdldCBjYW1lcmEgZGV2aWNlcy4gc28sIHRyeSB0byBnZXQgY2FtZXJhIGRldmljZXMgYWdhaW4nKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIHRoaXMuX19zdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgICAgIGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gY2FtZXJhLmxlbmd0aCA/IHtcbiAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgIH0gOiBudWxsO1xuICAgIH1cblxuICAgIC8vIOqwpOufreyLnCB3aWRlIOuTsSDsoIDsgqzslpEg6riw6riw7JeQ7IScIEZIRCDtlbTsg4Hrj4Qg7Lm066mU6528IOyCrOyaqeyLnCDtmYDsrYnsnbTrkJjripQg7ZiE7IOBIOuwqeyngFxuICAgIC8vIOyggOyCrOyWkSDquLDquLAg7YyQ64uo6riw7KSAIDog7ZuE66m07Lm066mU65287J2YIOqwnOyImOqwgCAx6rCc652864qUIOqwgOyglVxuICAgIGlmIChjYW1lcmEubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9fZGVidWcoJ21heWJlIGRldmljZSBpcyBlbnRyeSBtb2RlbCBzdWNoIGFzIGdhbGF4eSB3aWRlJyk7XG4gICAgICBjb25zdHJhaW50cy52aWRlby53aWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cy52aWRlby5oZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCBkdW1wdHJhY2sgPSAoW2EsIGJdLCB0cmFjaykgPT5cbiAgICAgIC8vICAgYCR7YX0ke3RyYWNrLmtpbmQgPT0gJ3ZpZGVvJyA/ICdDYW1lcmEnIDogJ01pY3JvcGhvbmUnfSAoJHt0cmFjay5yZWFkeVN0YXRlfSk6ICR7dHJhY2subGFiZWx9JHtifWA7XG5cbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1ZygndmlkZW9UcmFja3MgOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkpO1xuICAgICAgY29uc3Qgc3RyZWFtU2V0dGluZ3MgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRTZXR0aW5ncygpO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKFxuICAgICAgLy8gICAnc3RyZWFtQ2FwYWJpbGl0aWVzIDo6ICcsXG4gICAgICAvLyAgIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldENhcGFiaWxpdGllcygpXG4gICAgICAvLyApO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCdzdHJlYW0gOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0Q29uc3RyYWludHMoKSk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3N0cmVhbVNldHRpbmdzIDo6ICcsIHN0cmVhbVNldHRpbmdzKTtcbiAgICAgIHRoaXMuX19kZWJ1Zyhgc3RyZWFtIHdpZHRoICogaGVpZ2h0IDo6ICR7c3RyZWFtU2V0dGluZ3Mud2lkdGh9ICogJHtzdHJlYW1TZXR0aW5ncy5oZWlnaHR9YCk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSB3aWR0aCAvIGhlaWdodCA6OiAnICsgc3RyZWFtU2V0dGluZ3Mud2lkdGggLyBzdHJlYW1TZXR0aW5ncy5oZWlnaHQpO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gYXNwZWN0UmF0aW8gOjogJyArIHN0cmVhbVNldHRpbmdzLmFzcGVjdFJhdGlvKTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIGZhY2luZ01vZGUgOjogJyArIHN0cmVhbVNldHRpbmdzLmZhY2luZ01vZGUpO1xuICAgICAgW2NhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICAgIFtyb3RhdGlvbkNhbnZhcy53aWR0aCwgcm90YXRpb25DYW52YXMuaGVpZ2h0XSA9IFt0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aF07XG4gICAgICB9XG4gICAgICB2aWRlby5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICB0aGlzLl9fc3RyZWFtID0gc3RyZWFtO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9faW5pdFN0eWxlKCkge1xuICAgIHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICBvY3IsXG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG5cbiAgICAvLyDquLDspIDsoJXrs7RcbiAgICBjb25zdCBiYXNlV2lkdGggPSA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IDI2MDtcbiAgICBjb25zdCBzY2FubmVyRnJhbWVSYXRpbyA9IGJhc2VIZWlnaHQgLyBiYXNlV2lkdGg7IC8vIOyLoOu2hOymnSDruYTsnKhcblxuICAgIGxldCBndWlkZUJveFdpZHRoLCBndWlkZUJveEhlaWdodDtcbiAgICBsZXQgY2FsY09jckNsaWVudFdpZHRoID0gb2NyLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjT2NyQ2xpZW50SGVpZ2h0ID0gb2NyLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGg7XG4gICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXM7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7Jik66GcIOqwhOyjvFxuICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG4gICAgICBndWlkZUJveFdpZHRoID0gY2FsY09jckNsaWVudFdpZHRoICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6rCA66GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKTroZwg6rCE7KO8XG4gICAgICAvLyDruYTrlJTsmKTrpbwg6rCA66GcIFVJ7J2YIGhlaWdodCDquLDspIDsnLzroZwg7KSE7J206rOgXG4gICAgICAvLyDqsIDroZwgVUkgaGVpZ2h0IOq4sOykgOycvOuhnCDruYTrlJTsmKTsnZggd2lkdGgg6rOE7IKwXG4gICAgICBndWlkZUJveEhlaWdodCA9IGNhbGNPY3JDbGllbnRIZWlnaHQgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgIH1cbiAgICBndWlkZUJveFdpZHRoICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBndWlkZUJveEhlaWdodCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94V2lkdGggPSBndWlkZUJveFdpZHRoICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQgKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBpZiAodG9wVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh0b3BVSSwge1xuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUobWlkZGxlVUksIHtcbiAgICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChib3R0b21VSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGJvdHRvbVVJLCB7XG4gICAgICAgICdwYWRkaW5nLXRvcCc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmlkZW9Jbm5lckdhcCA9IDI7IC8vIOuvuOyEuO2VmOqyjCBtYXNrQm94SW5uZXLrs7Tri6QgZ3VpZGVCb3jqsIAg7J6R7J2A6rKDIOuztOyglVxuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgfSk7XG4gICAgY29uc3QgbWFza0JveElubmVyID0gbWFza0JveFdyYXAucXVlcnlTZWxlY3RvcignI21hc2tCb3hJbm5lcicpO1xuICAgIGxldCByID0gYm9yZGVyUmFkaXVzIC0gYm9yZGVyV2lkdGggKiAyO1xuICAgIHIgPSByIDwgMCA/IDAgOiByO1xuICAgIGlmICghaXNOYU4ocmVkdWNlZEd1aWRlQm94V2lkdGgpICYmICFpc05hTihyZWR1Y2VkR3VpZGVCb3hIZWlnaHQpICYmICFpc05hTihib3JkZXJSYWRpdXMpICYmICFpc05hTihib3JkZXJXaWR0aCkpIHtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lcldpZHRoID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lckhlaWdodCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBtYXNrQm94SW5uZXJXaWR0aCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hc2tCb3hJbm5lckhlaWdodCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3gnLCBtYXNrQm94SW5uZXJXaWR0aCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3knLCBtYXNrQm94SW5uZXJIZWlnaHQgLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeCcsIHIgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeScsIHIgKyAnJyk7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fYWRqdXN0U3R5bGUoKSB7XG4gICAgY29uc3QgX19jYWxjR3VpZGVCb3hDcml0ZXJpYSA9IChhLCBiKSA9PiB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdjYW1lcmFSZXNvbHV0aW9uJykge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oYSwgYik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChhLCBiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTsgLy8gZGVmYXVsdCA6IGNhbWVyYVJlc29sdXRpb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHtcbiAgICAgIG9jcixcbiAgICAgIHZpZGVvLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuXG4gICAgLy8g6riw7KSA7KCV67O0XG4gICAgY29uc3QgYmFzZVdpZHRoID0gaXNBbGllbkJhY2sgPyAyNjAgOiA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IGlzQWxpZW5CYWNrID8gNDAwIDogMjYwO1xuICAgIGNvbnN0IHNjYW5uZXJGcmFtZVJhdGlvID0gYmFzZUhlaWdodCAvIGJhc2VXaWR0aDsgLy8g7Iug67aE7KadIOu5hOycqFxuXG4gICAgbGV0IGd1aWRlQm94V2lkdGgsIGd1aWRlQm94SGVpZ2h0O1xuICAgIGxldCBjYWxjT2NyQ2xpZW50V2lkdGggPSBvY3IuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRIZWlnaHQgPSBvY3IuY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9IHZpZGVvLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPSB2aWRlby5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgaWYgKGNhbGNWaWRlb1dpZHRoID09PSAwIHx8IGNhbGNWaWRlb0hlaWdodCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoO1xuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNWaWRlb1dpZHRoLCBjYWxjVmlkZW9IZWlnaHRdID0gW2NhbGNWaWRlb0hlaWdodCwgY2FsY1ZpZGVvV2lkdGhdO1xuICAgICAgW2NhbGNWaWRlb0NsaWVudFdpZHRoLCBjYWxjVmlkZW9DbGllbnRIZWlnaHRdID0gW2NhbGNWaWRlb0NsaWVudEhlaWdodCwgY2FsY1ZpZGVvQ2xpZW50V2lkdGhdO1xuICAgICAgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICB9XG4gICAgbGV0IG5ld1ZpZGVvV2lkdGggPSBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBsZXQgbmV3VmlkZW9IZWlnaHQgPSBjYWxjVmlkZW9DbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBjb25zdCBuZXdWaWRlb1JhdGlvQnlXaWR0aCA9IGNhbGNWaWRlb0NsaWVudEhlaWdodCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IG5ld1ZpZGVvUmF0aW9CeUhlaWdodCA9IGNhbGNWaWRlb0NsaWVudFdpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgLy8g7IS466GcIFVJXG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCdcbiAgICAgIH0pO1xuICAgICAgLy8gdmlkZW8g6rCA66GcIOq4sOykgCAxMDAlIOycoOyngCAo67OA6rK97JeG7J2MKVxuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDsubTrqZTrnbzrj4Qg7IS466GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIO2ZleuMgFxuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsubTrqZTrnbzripQg6rCA66GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqTrpbwg67mE65SU7JikIOyEuOuhnCDquLjsnbTsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjVmlkZW9DbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCk7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOqwgOuhnCBVSVxuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdlbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJ1xuICAgICAgfSk7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOu5hOuUlOyYpOulvCDqsIDroZwgVUnsnZggaGVpZ2h0IOq4sOykgOycvOuhnCDspITsnbTqs6BcbiAgICAgICAgLy8g6rCA66GcIFVJIGhlaWdodCDquLDspIDsnLzroZwg67mE65SU7Jik7J2YIHdpZHRoIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOuKlCDshLjroZwg6riw7KSA7Jy866GcIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcblxuICAgICAgICAvLyDruYTrlJTsmKTrpbwg7IS466GcIOq4sOykgOycvOuhnCDri6Tsi5wg66ee7LakXG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBuZXdWaWRlb0hlaWdodCAqIG5ld1ZpZGVvUmF0aW9CeUhlaWdodDtcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZgg6rCA66GcIO2BrOq4sOqwgCDqsIDroZwgVUkgd2lkdGggKiByYXRpbyDqsJLrs7Tri6Qg7YGs66m0LFxuICAgICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aCkge1xuICAgICAgICAgIC8vIOqzhOyCsCDrsKnsi53snYQg67CU6r6864ukICjsgqzsnKAgOiDqsbDsnZgg7KCV7IKs6rCB7ZiV7JeQIOqwgOq5jOyatCDqsr3smrAg6rCA7J2065OcIOuwleyKpCDqsIDroZzqsIAg6r2J7LCo6rKMIOuQqC4pXG4gICAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7ZmV64yAXG4gICAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCBoZWlnaHQg7YGs6riw66W8IFVJ7J2YIGhlaWdodCDquLDspIDsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCDqsIDroZwg7YGs6riw6rCAIOqwgOuhnCBVSSB3aWR0aCAqIHJhdGlvIOqwkuuztOuLpCDtgazrqbQsXG4gICAgICAgIGlmIChndWlkZUJveFdpZHRoID4gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoKSB7XG4gICAgICAgICAgLy8g6rOE7IKwIOuwqeyLneydhCDrsJTqvrzri6QgKOyCrOycoCA6IOqxsOydmCDsoJXsgqzqsIHtmJXsl5Ag6rCA6rmM7Jq0IOqyveyasCDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnOqwgCDqvYnssKjqsowg65CoLilcbiAgICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDstpXshoxcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhKOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIOq4sOykgCnqsIAgb2NyVmlld1NpemUo7ZmU66m0IO2BrOq4sCkg6riw7KSA7J2865WMXG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAvLyBndWlkZUJveEhlaWdodCDsnbQgY2FsY09jckNsaWVudEhlaWdodCDrs7Tri6Qg7YGw6rK97JqwKOqwgOydtOuTnOuwleyKpOqwgCDtmZTrqbTsnYQg64SY7Ja06rCA64qUIOqyveyasCkg64uk7IucIOqzhOyCsFxuICAgICAgaWYgKGd1aWRlQm94SGVpZ2h0ID4gY2FsY09jckNsaWVudEhlaWdodCkge1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IE1hdGgubWluKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cblxuICAgICAgLy8gZ3VpZGVCb3hIZWlnaHQg7J20IGNhbGNPY3JDbGllbnRIZWlnaHQg67O064ukIO2BsOqyveyasCjqsIDsnbTrk5zrsJXsiqTqsIAg7ZmU66m07J2EIOuEmOyWtOqwgOuKlCDqsr3smrApIOuLpOyLnCDqs4TsgrBcbiAgICAgIGlmIChndWlkZUJveFdpZHRoID4gY2FsY09jckNsaWVudFdpZHRoKSB7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBNYXRoLm1pbihjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoID0gTWF0aC5taW4oZ3VpZGVCb3hXaWR0aCwgbmV3VmlkZW9XaWR0aCk7XG4gICAgdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSBNYXRoLm1pbihndWlkZUJveEhlaWdodCwgbmV3VmlkZW9IZWlnaHQpO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW25ld1ZpZGVvV2lkdGgsIG5ld1ZpZGVvSGVpZ2h0XSA9IFtuZXdWaWRlb0hlaWdodCwgbmV3VmlkZW9XaWR0aF07XG4gICAgfVxuICAgIGd1aWRlQm94V2lkdGggKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGd1aWRlQm94SGVpZ2h0ICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94V2lkdGggKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveEhlaWdodCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGlmICh0b3BVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHRvcFVJLCB7XG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWlkZGxlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShtaWRkbGVVSSwge1xuICAgICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJvdHRvbVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoYm90dG9tVUksIHtcbiAgICAgICAgJ3BhZGRpbmctdG9wJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIHdpZHRoOiBuZXdWaWRlb1dpZHRoICsgJ3B4J1xuICAgIH0pO1xuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgaGVpZ2h0OiBuZXdWaWRlb0hlaWdodCArICdweCdcbiAgICB9KTtcbiAgICBjb25zdCB2aWRlb0lubmVyR2FwID0gMjsgLy8g66+47IS47ZWY6rKMIG1hc2tCb3hJbm5lcuuztOuLpCBndWlkZUJveOqwgCDsnpHsnYDqsoMg67O07KCVXG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICB9KTtcbiAgICBjb25zdCBtYXNrQm94SW5uZXIgPSBtYXNrQm94V3JhcC5xdWVyeVNlbGVjdG9yKCcjbWFza0JveElubmVyJyk7XG4gICAgbGV0IHIgPSBib3JkZXJSYWRpdXMgLSBib3JkZXJXaWR0aCAqIDI7XG4gICAgciA9IHIgPCAwID8gMCA6IHI7XG4gICAgaWYgKCFpc05hTihyZWR1Y2VkR3VpZGVCb3hXaWR0aCkgJiYgIWlzTmFOKHJlZHVjZWRHdWlkZUJveEhlaWdodCkgJiYgIWlzTmFOKGJvcmRlclJhZGl1cykgJiYgIWlzTmFOKGJvcmRlcldpZHRoKSkge1xuICAgICAgY29uc3QgbWFza0JveElubmVyV2lkdGggPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgY29uc3QgbWFza0JveElubmVySGVpZ2h0ID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG1hc2tCb3hJbm5lcldpZHRoICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFza0JveElubmVySGVpZ2h0ICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneCcsIG1hc2tCb3hJbm5lcldpZHRoIC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneScsIG1hc2tCb3hJbm5lckhlaWdodCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J4JywgciArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J5JywgciArICcnKTtcbiAgICB9XG5cbiAgICAvLyDsiJjrj5kg7LSs7JiBIFVJIOyCrOyaqVxuICAgIC8vIGZpcnN0Q2FsbGVk7J24IOqyveyasCDslYTsp4EgY2FwdHVyZVVJ6rCAIOq3uOugpOyngOyngCDslYrslYQg66y07J2Y66+4XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgJiYgYm90dG9tVUkgJiYgY2FwdHVyZVVJKSB7XG4gICAgICAgIGNvbnN0IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyA9IHRoaXMuX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzKGJvdHRvbVVJKTtcbiAgICAgICAgbGV0IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID0gY2FwdHVyZUJ1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgICAgICBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID09PSAwID8gODAgOiBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgbGV0IGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPSBib3R0b21VSS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gaXNOYU4ocGFyc2VJbnQoYm90dG9tVUkuc3R5bGUucGFkZGluZ1RvcCkpID8gMCA6IHBhcnNlSW50KGJvdHRvbVVJLnN0eWxlLnBhZGRpbmdUb3ApO1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcztcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgY29uc3QgYmFzZWxpbmUgPSBjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gKGNhbGNPY3JDbGllbnRIZWlnaHQgLyAyICsgZ3VpZGVCb3hIZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPiAwICYmIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPCBiYXNlbGluZSkge1xuICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJycsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiBjYXB0dXJlVUlQYWRkaW5nQm90dG9tICsgJ3B4J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAnMTBweCcsXG4gICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJydcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRydWUpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMob2JqKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaj8uY2hpbGROb2Rlcykge1xuICAgICAgc3VtICs9IGl0ZW0uY2xpZW50SGVpZ2h0ID8gaXRlbS5jbGllbnRIZWlnaHQgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9XG4gIF9fY2xvc2VDYW1lcmEoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgfVxuICBhc3luYyBfX2xvYWRSZXNvdXJjZXMoKSB7XG4gICAgdm9pZCAwO1xuICAgIGlmICh0aGlzLl9fcmVzb3VyY2VzTG9hZGVkKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gYXdhaXQgc2ltZCgpO1xuICAgIGxldCBlbnZJbmZvID0gJyc7XG4gICAgZW52SW5mbyArPSBgb3MgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zfVxcbmA7XG4gICAgZW52SW5mbyArPSBgb3NTaW1wbGUgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlfVxcbmA7XG4gICAgZW52SW5mbyArPSBgaXNTdXBwb3J0V2FzbTogJHt0aGlzLl9faXNTdXBwb3J0V2FzbX1cXG5gO1xuICAgIGVudkluZm8gKz0gYHNpbWQod2FzbS1mZWF0dXJlLWRldGVjdCkgOiAke3RoaXMuX19pc1N1cHBvcnRTaW1kfVxcbmA7XG4gICAgaWYgKHRoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlID09PSAnSU9TJyB8fCB0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZSA9PT0gJ01BQycpIHtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gICAgfVxuICAgIGVudkluZm8gKz0gYGlzU3VwcG9ydFNpbWQoZmluYWwpIDogJHt0aGlzLl9faXNTdXBwb3J0U2ltZH1cXG5gO1xuICAgIGVudkluZm8gKz0gYFVzZXJBZ2VudCA6ICR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cXG5gO1xuICAgIHZvaWQgMDtcbiAgICB0aGlzLl9fZGVidWcoZW52SW5mbyk7XG4gICAgd2luZG93LnVzZWJPQ1JFbnZJbmZvID0gZW52SW5mbztcbiAgICBsZXQgc2RrU3VwcG9ydEVudiA9ICdxdXJhbSc7XG4gICAgaWYgKHRoaXMuX19pc1N1cHBvcnRTaW1kKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBzZGtTdXBwb3J0RW52ICs9ICdfc2ltZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gICAgdm9pZCAwO1xuICAgIHdpbmRvdy51c2ViT0NSRW52SW5mbyA9IGVudkluZm87XG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoc2RrU3VwcG9ydEVudiArICcuanMnLCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpO1xuICAgIGxldCBzcmMgPSBhd2FpdCBmZXRjaCh1cmwuaHJlZikudGhlbihyZXMgPT4gcmVzLnRleHQoKSkudGhlbih0ZXh0ID0+IHtcbiAgICAgIGxldCByZWdleCA9IC8oLiopID0gTW9kdWxlLmN3cmFwL2dtO1xuICAgICAgbGV0IHNvdXJjZSA9IHRleHQucmVwbGFjZShyZWdleCwgJ01vZHVsZS4kMSA9IE1vZHVsZS5jd3JhcCcpO1xuXG4gICAgICAvLyBkYXRhKG1vZGVsKVxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoL15cXChmdW5jdGlvblxcKFxcKSBcXHsvbSwgJ3ZhciBjcmVhdGVNb2RlbERhdGEgPSBhc3luYyBmdW5jdGlvbigpIHtcXG4nICsgJyByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xcbicpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJyAgIGNvbnNvbGUuZXJyb3IoXCJwYWNrYWdlIGVycm9yOlwiLCBlcnJvcik7JywgJyAgIHJlamVjdCgpO1xcbicgKyAnICAgY29uc29sZS5lcnJvcihcInBhY2thZ2UgZXJyb3I6XCIsIGVycm9yKTsnKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCcgIH0sIGhhbmRsZUVycm9yKScsICcgIHJlc29sdmUoKTtcXG4nICsgJyAgfSwgaGFuZGxlRXJyb3IpJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgvXlxcfVxcKVxcKFxcKTsvbSwgJ1xcbiB9KVxcbicgKyAnfTsnKTtcblxuICAgICAgLy8gd2FzbVxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2Uoc2RrU3VwcG9ydEVudiArICcud2FzbScsIG5ldyBVUkwoc2RrU3VwcG9ydEVudiArICcud2FzbScsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZik7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKGBSRU1PVEVfUEFDS0FHRV9CQVNFID0gWydcIl0ke3Nka1N1cHBvcnRFbnZ9XFxcXC5kYXRhW1wiJ11gLCAnZ20nKSwgYFJFTU9URV9QQUNLQUdFX0JBU0UgPSBcIiR7bmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy5kYXRhJywgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKS5ocmVmfVwiYCk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnZnVuY3Rpb24gY3JlYXRlV2FzbScsICdhc3luYyBmdW5jdGlvbiBjcmVhdGVXYXNtJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnaW5zdGFudGlhdGVBc3luYygpOycsICdhd2FpdCBpbnN0YW50aWF0ZUFzeW5jKCk7Jyk7XG5cbiAgICAgIC8vIHdhc20gYW5kIGRhdGEobW9kZWwpIGZpbGUg67OR66Cs66GcIGZldGNoIO2VmOq4sCDsnITtlbRcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCd2YXIgYXNtID0gY3JlYXRlV2FzbSgpOycsICdjb25zb2xlLmxvZyhcImNyZWF0ZSB3YXNtIGFuZCBkYXRhIC0gc3RhcnRcIilcXG4nICsgJ2F3YWl0IChhc3luYyBmdW5jdGlvbigpIHtcXG4nICsgJyAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcXG4nICsgJyAgICB2YXIgaXNDcmVhdGVkV2FzbSA9IGZhbHNlO1xcbicgKyAnICAgIHZhciBpc0NyZWF0ZWREYXRhID0gZmFsc2U7XFxuJyArICcgICAgY3JlYXRlV2FzbSgpLnRoZW4oKCkgPT4ge1xcbicgKyAnICAgICAgaXNDcmVhdGVkV2FzbSA9IHRydWU7XFxuJyArICcgICAgICBpZiAoaXNDcmVhdGVkRGF0YSkgeyByZXNvbHZlKCk7IH1cXG4nICsgJyAgICB9KTtcXG4nICsgJyAgICBjcmVhdGVNb2RlbERhdGEoKS50aGVuKCgpID0+IHtcXG4nICsgJyAgICAgIGlzQ3JlYXRlZERhdGEgPSB0cnVlO1xcbicgKyAnICAgICAgaWYgKGlzQ3JlYXRlZFdhc20pIHsgcmVzb2x2ZSgpOyB9XFxuJyArICcgICAgfSlcXG4nICsgJyAgfSk7XFxuJyArICd9KSgpO1xcbicgKyAnY29uc29sZS5sb2coXCJjcmVhdGUgd2FzbSBhbmQgZGF0YSAtIGVuZFwiKScpO1xuICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9KTtcbiAgICBzcmMgPSBgXG4gICAgKGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgJHtzcmN9XG4gICAgICBNb2R1bGUubGVuZ3RoQnl0ZXNVVEY4ID0gbGVuZ3RoQnl0ZXNVVEY4XG4gICAgICBNb2R1bGUuc3RyaW5nVG9VVEY4ID0gc3RyaW5nVG9VVEY4XG4gICAgICByZXR1cm4gTW9kdWxlXG4gICAgfSkoKVxuICAgICAgICBgO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUgPSBhd2FpdCBldmFsKHNyYyk7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5vblJ1bnRpbWVJbml0aWFsaXplZCA9IGFzeW5jIF8gPT4ge1xuICAgICAgdm9pZCAwO1xuICAgIH07XG4gICAgYXdhaXQgdGhpcy5fX09DUkVuZ2luZS5vblJ1bnRpbWVJbml0aWFsaXplZCgpO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSB0cnVlO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX3N0YXJ0U2Nhbldhc21JbXBsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpO1xuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgIHRoaXMuX19hZGRyZXNzID0gMDtcbiAgICAgIHRoaXMuX19wYWdlRW5kID0gZmFsc2U7XG4gICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gICAgICB0aGlzLl9fc3NhUmV0cnlDb3VudCA9IDA7XG4gICAgICBjb25zdCBzY2FuID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgaXNEZXRlY3RlZENhcmQgPSBudWxsLFxuICAgICAgICAgICAgaW1nRGF0YSA9IG51bGwsXG4gICAgICAgICAgICBpbWdEYXRhVXJsID0gbnVsbCxcbiAgICAgICAgICAgIG1hc2tJbWFnZSA9IG51bGwsXG4gICAgICAgICAgICBmYWNlSW1hZ2UgPSBudWxsLFxuICAgICAgICAgICAgc3NhUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIHNzYVJlc3VsdExpc3QgPSBbXSxcbiAgICAgICAgICAgIG1hc2tJbmZvID0gbnVsbDtcblxuICAgICAgICAgIC8vIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZShJTl9QUk9HUkVTUy5SRUFEWSk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9fT0NSRW5naW5lWydhc20nXSkgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gVE9ETyA6IOyEpOygle2VoOyImCDsnojqsowg67OA6rK9ICBkZWZhdWx0IOqwkuuPhCDsoJzqs7VcbiAgICAgICAgICBjb25zdCBbcmVzb2x1dGlvbl93LCByZXNvbHV0aW9uX2hdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2aWRlb1xuICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgIGlmIChyZXNvbHV0aW9uX3cgPT09IDAgfHwgcmVzb2x1dGlvbl9oID09PSAwKSByZXR1cm47XG4gICAgICAgICAgaWYgKHRoaXMuX19kZXRlY3RlZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZGRyZXNzIGJlZm9yZSAtLS0tLS0tLS0nLCBhZGRyZXNzKTtcbiAgICAgICAgICBpZiAodGhpcy5fX2FkZHJlc3MgPT09IDAgJiYgIXRoaXMuX19wYWdlRW5kICYmIChhd2FpdCB0aGlzLl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlKHZpZGVvKSkpIHtcbiAgICAgICAgICAgIFt0aGlzLl9fYWRkcmVzcywgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2tdID0gdGhpcy5fX2dldFNjYW5uZXJBZGRyZXNzKHRoaXMuX19vY3JUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9fYWRkcmVzcyB8fCB0aGlzLl9fcGFnZUVuZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZGRyZXNzIGFmdGVyIC0tLS0tLS0tLScsIGFkZHJlc3MpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19vY3JTdGF0dXMgPCB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIC8vIE9DUiDsmYTro4wg7J207KCEIOyDge2DnFxuXG4gICAgICAgICAgICAvLyBjYXJkIG5vdCBkZXRlY3RlZFxuICAgICAgICAgICAgW2lzRGV0ZWN0ZWRDYXJkLCBpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZCh0aGlzLl9fYWRkcmVzcywgMCk7XG4gICAgICAgICAgICBpZiAoIWlzRGV0ZWN0ZWRDYXJkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAgIT09IHRoaXMuSU5fUFJPR1JFU1MuUkVBRFkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5DQVJEX0RFVEVDVF9GQUlMRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVELCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7IC8vIO2VhOyalO2VnOqwgD9cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FyZCBpcyBkZXRlY3RlZFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuQ0FSRF9ERVRFQ1RfU1VDQ0VTUyk7XG5cbiAgICAgICAgICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICAgICAgICAgIHRoaXMuX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKHRydWUpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTLCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBbb2NyUmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZV0gPSBhd2FpdCB0aGlzLl9fc3RhcnRSZWNvZ25pdGlvbih0aGlzLl9fYWRkcmVzcywgdGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCB0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpLCBpbWdEYXRhLCBpbWdEYXRhVXJsKTtcblxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgICAgICAvLyAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpOyAgICAgICAgLy8g7ZWE7JqU7ZWc6rCAP1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fb2NyU3RhdHVzID49IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUykge1xuICAgICAgICAgICAgLy8gb2NyIOyZhOujjCDsnbTtm4Qg7IOB7YOcXG5cbiAgICAgICAgICAgIC8vIGZhaWx1cmUgY2FzZVxuICAgICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQ1IgU3RhdHVzIGlzICR7dGhpcy5fX29jclN0YXR1c30sIGJ1dCBvY3JSZXN1bHQgaXMgZmFsc2VgKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FzZVxuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICBpZiAodGhpcy5fX3NzYU1vZGUpIHtcbiAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICAvLyDstZzstIgg7Iuc64+EXG4gICAgICAgICAgICAgIHNzYVJlc3VsdCA9IGF3YWl0IHRoaXMuX19zdGFydFRydXRoKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fYWRkcmVzcyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ1tFUlJdIFNTQSBNT0RFIGlzIHRydWUuIGJ1dCwgc3NhUmVzdWx0IGlzIG51bGwnKTsgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgICAgICAgc3NhUmVzdWx0TGlzdC5wdXNoKHNzYVJlc3VsdCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXRyeVN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgRkFLRSA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ0ZBS0UnO1xuICAgICAgICAgICAgICAgIGNvbnN0IFJFQUwgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdSRUFMJztcbiAgICAgICAgICAgICAgICBjb25zdCBFTlNFTUJMRSA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ0VOU0VNQkxFJztcbiAgICAgICAgICAgICAgICBsZXQgaXNDb21wbGV0ZWQgPSBmYWxzZTsgLy8g67mE64+Z6riwIGZvciDrrLgg65WM66y47JeQIGJyZWFr6rCAIOyViOqxuOumrOuKlCDsnbTsiojroZwg64Sj7J2MXG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc3NhUmV0cnlDb3VudCA9PT0gdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgZXhlY3V0ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NzYVJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgc3NhUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGhSZXRyeSh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2FkZHJlc3MsIGl0ZW0pOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdbRVJSXSBTU0EgTU9ERSBpcyB0cnVlLiBidXQsIHNzYVJlc3VsdCBpcyBudWxsJyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgICAgICAgICAgICAgIHNzYVJlc3VsdExpc3QucHVzaChzc2FSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChGQUtFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQuaW5kZXhPZignUkVBTCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoUkVBTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0LmluZGV4T2YoJ0ZBS0UnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKEVOU0VNQkxFKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0cnlXb3JraW5nVGltZSA9IG5ldyBEYXRlKCkgLSByZXRyeVN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tJbmZvKSB7XG4gICAgICAgICAgICAgIG1hc2tJbmZvID0gdGhpcy5fX2dldE1hc2tJbmZvKHRoaXMuX19hZGRyZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgICAgICAgICBuZXdGb3JtYXRcbiAgICAgICAgICAgIH0gPSB1c2ViT0NSV0FTTVBhcnNlci5wYXJzZU9jclJlc3VsdCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIG9jclJlc3VsdCwgc3NhUmVzdWx0LCB0aGlzLl9fc3NhUmV0cnlDb3VudCwgc3NhUmVzdWx0TGlzdCwgdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlLCB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVBpdm90XG4gICAgICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAgICAgLy8gdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGVcbiAgICAgICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IHJldmlld19yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgICAgICAgb2NyX3Jlc3VsdDogbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiBpbWdEYXRhVXJsLFxuICAgICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogbWFza0ltYWdlLFxuICAgICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogZmFjZUltYWdlLFxuICAgICAgICAgICAgICBtYXNrSW5mbzogbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZSk7XG4gICAgICAgICAgICB0aGlzLmVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTGVnYWN5Rm9ybWF0KSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2RhdGEgPSBsZWdhY3lGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ0NhcmQgZGV0ZWN0aW9uIGVycm9yJztcbiAgICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJzogJyArIGUubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdm9pZCAwO1xuXG4gICAgICAgICAgLy8gaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnbWVtb3J5JykpIHtcbiAgICAgICAgICAvLyAgIGF3YWl0IHRoaXMuX19yZWNvdmVyeVNjYW4oKTtcbiAgICAgICAgICAvLyAgIHRoaXMuX19yZWNvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ1dBMDAxJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAodGhpcy5fX3JlY292ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5fX3JlY292ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuX19kZXRlY3RlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChzY2FuLCAxKTsgLy8g7J6s6reAXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZXRUaW1lb3V0KHNjYW4sIDEpOyAvLyBVSSDrnpzrjZTrp4EgYmxvY2tpbmcg67Cp7KeAIChzZXRUaW1lb3V0KVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZSwgY29uc3RhbnROdW1iZXIpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZSkge1xuICAgICAgY29uc3QgcmVzaXplUmF0aW8gPSB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodCAvIHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGg7XG4gICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgbWF4V2lkdGg6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCxcbiAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggKiByZXNpemVSYXRpbyxcbiAgICAgICAgY29udmVydFNpemU6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUsXG4gICAgICAgIHRhcmdldENvbXByZXNzVm9sdW1lOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIC8vIGN1c3RvbSBvcHRpb25cbiAgICAgIH07XG5cbiAgICAgIHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSA9IGF3YWl0IHRoaXMuX19jb21wcmVzZUJhc2U2NEltYWdlKGltZ0RhdGFVcmwsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG5cbiAgICAgIC8vIG1hc2tpbmcg7J2066+47KeA64qUIHJlc2l6ZSDtlZjrqbQsIG1hc2sg7KKM7ZGc6rCAIOyWtOq4i+uCmOuvgOuhnCDrpqzsgqzsnbTspogg7JWI7ZWY6rOgIOyVley2leunjCDsp4TtlolcbiAgICAgIGNvbnN0IG1hc2tpbmdJbWFnZU9wdGlvbnMgPSB7XG4gICAgICAgIHF1YWxpdHk6IGRlZmF1bHRPcHRpb25zLnF1YWxpdHksXG4gICAgICAgIHRhcmdldENvbXByZXNzVm9sdW1lOiBkZWZhdWx0T3B0aW9ucy50YXJnZXRDb21wcmVzc1ZvbHVtZVxuICAgICAgfTtcbiAgICAgIHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShtYXNrSW1hZ2UsIG1hc2tpbmdJbWFnZU9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICAgIHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShmYWNlSW1hZ2UsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgfVxuICB9XG4gIF9fcmVxdWVzdEdldEFQSVRva2VuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uY3JlZGVudGlhbDtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLl9fb3B0aW9ucy5hdXRoU2VydmVySW5mby5iYXNlVXJsO1xuICAgICAgZmV0Y2goYCR7YmFzZVVybH0vc2lnbi1pbmAsIHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbCksXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgICAgIC8vIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgLy8gY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBmZXRjaChgJHtiYXNlVXJsfS91c2ViL3Rva2VuYCwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtyZXN1bHQudG9rZW59YFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShqc29uLnRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9fcmVxdWVzdFNlcnZlck9DUihvY3JUeXBlLCBzc2FNb2RlLCBpbWdEYXRhVXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMub2NyU2VydmVyQmFzZVVybDtcbiAgICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9pZGNhcmQtZHJpdmVyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvcGFzc3BvcnQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuLWJhY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NyZWRpdCBjYXJkIGlzIG5vdCBVbnN1cHBvcnRlZCBTZXJ2ZXIgT0NSJyk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT0NSIHR5cGU6ICR7b2NyVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcGlUb2tlbiA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0R2V0QVBJVG9rZW4oKTtcbiAgICAgICAgY29uc3QgbXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgbXlIZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthcGlUb2tlbn1gKTtcbiAgICAgICAgY29uc3QgcmF3ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGltYWdlX2Jhc2U2NDogaW1nRGF0YVVybCxcbiAgICAgICAgICBzc2FfbW9kZTogJ3RydWUnLFxuICAgICAgICAgIG1hc2tfbW9kZTogJ3RydWUnLFxuICAgICAgICAgIGZhY2VfbW9kZTogJ3RydWUnXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiBteUhlYWRlcnMsXG4gICAgICAgICAgYm9keTogcmF3LFxuICAgICAgICAgIHJlZGlyZWN0OiAnZm9sbG93J1xuICAgICAgICB9O1xuICAgICAgICBmZXRjaChiYXNlVXJsLCByZXF1ZXN0T3B0aW9ucykudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19zdGFydFNjYW5TZXJ2ZXJJbXBsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAvLyB0aGlzLl9fc2V0UGlpRW5jcnlwdE1vZGUodGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpOyAvLyBvY3IgcmVzdWx0IGVuY3J5cHRcbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICBsZXQgb2NyUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICBzc2FSZXN1bHQgPSBudWxsLFxuICAgICAgICAgIHNzYVJlc3VsdExpc3QgPSBbXTtcbiAgICAgICAgY29uc3QgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAvLyDsupTrsoTsiqTsl5DshJwg7J2066+47KeA66W8IOqwgOyguOyYtFxuICAgICAgICAgIGNvbnN0IFssIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX2Nyb3BJbWFnZUZyb21WaWRlbygpO1xuICAgICAgICAgIGlmICgxID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBzZXJ2ZXIgb2NyIOyLpO2MqCAo67Cc7IOdIOqwgOuKpeyEsSDsl4bsnYwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNlcnZlciBvY3Ig7ISx6rO1XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTLCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBvY3JSZXN1bHQgPSBhd2FpdCB0aGlzLl9fcmVxdWVzdFNlcnZlck9DUih0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIGltZ0RhdGFVcmwpO1xuXG4gICAgICAgICAgICAgIC8vIGZhaWx1cmUgY2FzZVxuICAgICAgICAgICAgICBpZiAob2NyUmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIE9DUiBpcyBmYWlsZWRgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc3NhIOyLnOuPhD9cblxuICAgICAgICAgICAgLy8gc3VjY2VzcyBjYXNlXG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIHZpZGVvXG4gICAgICAgICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pOyAvLyBPQ1Ig7JmE66OMIOyLnOygkOyXkCBjYW1lcmEgcHJldmlldyBvZmZcblxuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICBsZWdhY3lGb3JtYXQsXG4gICAgICAgICAgICAgIG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgYmFzZTY0SW1hZ2VSZXN1bHQsXG4gICAgICAgICAgICAgIG1hc2tJbmZvXG4gICAgICAgICAgICB9ID0gdXNlYk9DUkFQSVBhcnNlci5wYXJzZU9jclJlc3VsdCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIG9jclJlc3VsdCk7XG4gICAgICAgICAgICBsZXQgcmV2aWV3X3Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgb2NyX3R5cGU6IHRoaXMuX19vY3JUeXBlLFxuICAgICAgICAgICAgICBvY3JfcmVzdWx0OiBuZXdGb3JtYXQsXG4gICAgICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IGltZ0RhdGFVcmwsXG4gICAgICAgICAgICAgIG9jcl9tYXNraW5nX2ltYWdlOiBiYXNlNjRJbWFnZVJlc3VsdD8ub2NyX21hc2tpbmdfaW1hZ2UsXG4gICAgICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiBiYXNlNjRJbWFnZVJlc3VsdD8ub2NyX2ZhY2VfaW1hZ2UsXG4gICAgICAgICAgICAgIG1hc2tJbmZvLFxuICAgICAgICAgICAgICBzc2FfbW9kZTogdGhpcy5fX3NzYU1vZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9tYXNraW5nX2ltYWdlLCBiYXNlNjRJbWFnZVJlc3VsdD8ub2NyX2ZhY2VfaW1hZ2UsIDAuMCk7XG4gICAgICAgICAgICB0aGlzLmVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTGVnYWN5Rm9ybWF0KSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2RhdGEgPSBsZWdhY3lGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fX2NhcHR1cmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICdTZXJ2ZXIgT0NSIEVycm9yJztcbiAgICAgICAgaWYgKGUubWVzc2FnZSkge1xuICAgICAgICAgIGVycm9yTWVzc2FnZSArPSAnOiAnICsgZS5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgYXdhaXQgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ1FTMDAxJywgZSwgZXJyb3JNZXNzYWdlKTsgLy8gUVVSQU0gU2VydmVyIE9DUiDsl5Drn6xcbiAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlKGltZ0RhdGEsIGltZ0RhdGFVUkwpIHtcbiAgICAvLyBzc2EgcmV0cnkg7ISk7KCV7J20IOuQmOyWtCDsnojsnLzqsbDrgpgsIOyImOuPmey0rOyYgVVJ66W8IOyCrOyaqe2VmOuKlCDqsr3smrAsIGNhcmQgZGV0ZWN0IOyEseqzteyLnCDsnbTrr7jsp4Ag7KCA7J6lXG4gICAgaWYgKHRoaXMuX19zc2FNb2RlICYmIHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQgPiAwIHx8IHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSAmJiB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCA+IDApIHtcbiAgICAgIGxldCBsaW1pdFNhdmVJbWFnZUNvdW50ID0gTWF0aC5tYXgodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCwgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQpO1xuICAgICAgaWYgKHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5sZW5ndGggPT09IGxpbWl0U2F2ZUltYWdlQ291bnQpIHtcbiAgICAgICAgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQuc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5wdXNoKGltZ0RhdGEpO1xuICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHtcbiAgICAgICAgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0LnB1c2goaW1nRGF0YVVSTCk7XG4gICAgICAgIHZvaWQgMDsgLy8gc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgIH1cblxuICAgICAgdm9pZCAwOyAvLyBzaG91bGQgYmUgcmVtb3ZlZFxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIF9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KSB7XG4gICAgLy8g7J247IudIOyEseqztSDsiqTsupQg66Oo7ZSEIOyiheujjFxuICAgIGlmIChyZXZpZXdfcmVzdWx0LnNzYV9tb2RlKSB7XG4gICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgYXBpX3Jlc3BvbnNlOiB7XG4gICAgICAgIHJlc3VsdF9jb2RlOiAnTjEwMCcsXG4gICAgICAgIHJlc3VsdF9tZXNzYWdlOiAnT0suJ1xuICAgICAgfSxcbiAgICAgIHJlc3VsdDogJ3N1Y2Nlc3MnLFxuICAgICAgcmV2aWV3X3Jlc3VsdDogcmV2aWV3X3Jlc3VsdFxuICAgIH07XG4gICAgaWYgKHRoaXMuX19vblN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuX19vblN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgIHRoaXMuX19vblN1Y2Nlc3MgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fb25GYWlsdXJlUHJvY2VzcyhyZXN1bHRDb2RlLCBlLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfRkFJTEVEKTtcbiAgICBsZXQgZXJyb3JEZXRhaWwgPSAnJztcbiAgICBpZiAoZT8udG9TdHJpbmcoKSkgZXJyb3JEZXRhaWwgKz0gZS50b1N0cmluZygpO1xuICAgIGlmIChlPy5zdGFjaykgZXJyb3JEZXRhaWwgKz0gZS5zdGFjaztcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBhcGlfcmVzcG9uc2U6IHtcbiAgICAgICAgcmVzdWx0X2NvZGU6IHJlc3VsdENvZGUsXG4gICAgICAgIHJlc3VsdF9tZXNzYWdlOiBlcnJvck1lc3NhZ2VcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6ICdmYWlsZWQnLFxuICAgICAgcmV2aWV3X3Jlc3VsdDoge1xuICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgIGVycm9yX2RldGFpbDogZXJyb3JEZXRhaWxcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICh0aGlzLl9fb25GYWlsdXJlKSB7XG4gICAgICB0aGlzLl9fb25GYWlsdXJlKHJlc3VsdCk7XG4gICAgICB0aGlzLl9fb25GYWlsdXJlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX3ByZWxvYWRpbmdXYXNtKCkge1xuICAgIGNvbnN0IHByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLmdldFByZWxvYWRpbmdTdGF0dXMoKTtcbiAgICBpZiAoIXRoaXMuaXNQcmVsb2FkZWQoKSAmJiBwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBhd2FpdCB0aGlzLnByZWxvYWRpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByZWxvYWRpbmdTdGF0dXMgPT09IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuU1RBUlRFRCkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIGF3YWl0IHRoaXMuX193YWl0UHJlbG9hZGVkKCk7XG4gICAgICB9IGVsc2UgaWYgKHByZWxvYWRpbmdTdGF0dXMgPT09IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuRE9ORSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFibm9ybWFsbHkgcHJlbG9hZGluZyBzdGF0dXMsIHByZWxvYWRlZDogJHt0aGlzLmlzUHJlbG9hZGVkKCl9IC8gcHJlbG9hZGluZ1N0YXR1czogJHt0aGlzLmdldFByZWxvYWRpbmdTdGF0dXMoKX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAvLyBfX3NldFBpaUVuY3J5cHRNb2RlKHBpaUVuY3J5cHRNb2RlKSB7XG4gIC8vICAgdGhpcy5fX09DUkVuZ2luZS5zZXRQaWlFbmNyeXB0KHBpaUVuY3J5cHRNb2RlKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2VuY3J5cHREZXRlY3RlZEJhc2U2NChhZGRyZXNzLCBtYXNrLCBvY3JfbW9kZSwgaW1nVHlwZSA9ICdjYXJkJykge1xuICAvLyAgIGlmIChpbWdUeXBlID09PSAnZmFjZScpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRCYXNlNjRqcGdEZXRlY3RlZFBob3RvQmFzZTY0KGFkZHJlc3MpO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5lbmNyeXB0QmFzZTY0anBnRGV0ZWN0ZWRGcmFtZUJhc2U2NChcbiAgLy8gICAgIGFkZHJlc3MsXG4gIC8vICAgICBtYXNrLFxuICAvLyAgICAgb2NyX21vZGVcbiAgLy8gICApO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0RW5jcnlwdGVkU2l6ZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNyeXB0ZWRKcGdTaXplKCk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19nZXRFbmNyeXB0ZWRCdWZmZXIoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jcnlwdGVkSnBnQnVmZmVyKCk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19nZXRQaWlFbmNyeXB0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbWFzaywgaW1nTW9kZSwgaW1nVHlwZSA9ICdjYXJkJykge1xuICAvLyAgIGNvbnN0IGVuY3J5cHREZXRlY3RlZEJhc2U2NCA9IHRoaXMuX19lbmNyeXB0RGV0ZWN0ZWRCYXNlNjQoXG4gIC8vICAgICBhZGRyZXNzLFxuICAvLyAgICAgbWFzayxcbiAgLy8gICAgIGltZ01vZGUsXG4gIC8vICAgICBpbWdUeXBlXG4gIC8vICAgKTtcbiAgLy8gICBpZiAoZW5jcnlwdERldGVjdGVkQmFzZTY0ID09PSAxKSB7XG4gIC8vICAgICBjb25zdCBqcGdTaXplID0gdGhpcy5fX2dldEVuY3J5cHRlZFNpemUoKTtcbiAgLy8gICAgIGNvbnN0IGpwZ1BvaW50ZXIgPSB0aGlzLl9fZ2V0RW5jcnlwdGVkQnVmZmVyKCk7XG4gIC8vXG4gIC8vICAgICBjb25zdCBlbmNyeXB0ZWQgPSBuZXcgVWludDhBcnJheShcbiAgLy8gICAgICAgdGhpcy5fX09DUkVuZ2luZS5IRUFQOC5idWZmZXIsXG4gIC8vICAgICAgIGpwZ1BvaW50ZXIsXG4gIC8vICAgICAgIGpwZ1NpemVcbiAgLy8gICAgICk7XG4gIC8vICAgICBjb25zdCB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcbiAgLy8gICAgIGNvbnN0IGRlY29kZWRTdHJpbmcgPSB0ZXh0RGVjb2Rlci5kZWNvZGUoZW5jcnlwdGVkKTtcbiAgLy9cbiAgLy8gICAgIHJldHVybiBkZWNvZGVkU3RyaW5nO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gJyc7XG4gIC8vIH1cbiAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG5cbiAgYXN5bmMgX19zdGFydFNjYW5XYXNtKCkge1xuICAgIHRoaXMuX19kZWJ1Zygnd2FzbV9tb2RlJyk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2Nhbldhc21JbXBsKCk7XG4gICAgdm9pZCAwO1xuICB9XG4gIGFzeW5jIF9fc3RhcnRTY2FuU2VydmVyKCkge1xuICAgIHRoaXMuX19kZWJ1Zygnc2VydmVyX21vZGUnKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkgPSB0cnVlO1xuICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5TZXJ2ZXJJbXBsKCk7XG4gICAgdm9pZCAwO1xuICB9XG4gIGFzeW5jIF9fcmVjb3ZlcnlTY2FuKCkge1xuICAgIHZvaWQgMDtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdG9wU2NhbigpO1xuICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5XYXNtKCk7XG4gIH1cbiAgc3RvcFNjYW4oKSB7XG4gICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTsgLy8gc3dpdGNoIHRvIHNlcnZlcuydvOuVjCDquLDsobQgV0FTTSBsb29wIOqwleygnOyiheujjFxuICAgIGNvbnN0IHtcbiAgICAgIGNhbnZhc1xuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChjYW52YXMpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0NvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7XG4gICAgICAgIHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBjYW52YXNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxuICBzdG9wU3RyZWFtKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX19yZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgaWYgKHRoaXMuX19zdHJlYW0pIHtcbiAgICAgIHRoaXMuX19zdHJlYW0uc3RvcCAmJiB0aGlzLl9fc3RyZWFtLnN0b3AoKTtcbiAgICAgIGxldCB0cmFja3MgPSB0aGlzLl9fc3RyZWFtLmdldFRyYWNrcyAmJiB0aGlzLl9fc3RyZWFtLmdldFRyYWNrcygpO1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKHRyYWNrcyAmJiB0cmFja3MubGVuZ3RoKSB7XG4gICAgICAgIHRyYWNrcy5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc3RyZWFtID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiog66mU66qo66asIGFsbG9jYXRpb24gZnJlZSDtlajsiJggKi9cbiAgY2xlYW51cCgpIHtcbiAgICB0aGlzLl9fZGVzdHJveVNjYW5uZXJBZGRyZXNzKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lCdWZmZXIoKTtcbiAgICB0aGlzLl9fZGVzdHJveVByZXZJbWFnZSgpO1xuICAgIHRoaXMuX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCgpO1xuICB9XG4gIHJlc3RvcmVJbml0aWFsaXplKCkge1xuICAgIHRoaXMuX19pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIHRoaXMuX19wcmVsb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9fcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQ7XG4gICAgdGhpcy5fX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICB9XG4gIF9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCkge1xuICAgIGlmICh0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKTtcbiAgICAgIHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVzZUJPQ1I7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBLE9BQU9BLFFBQVEsTUFBTSx1QkFBdUI7QUFDNUMsT0FBT0MsaUJBQWlCLE1BQU0sbUNBQW1DO0FBQ2pFLE9BQU9DLGdCQUFnQixNQUFNLGtDQUFrQztBQUMvRCxTQUFTQyxhQUFhLEVBQUVDLE9BQU8sRUFBRUMsSUFBSSxFQUFFQyxPQUFPLFFBQVEsa0NBQWtDO0FBQ3hGLE9BQU9DLFNBQVMsTUFBTSx5QkFBeUI7QUFDL0MsSUFBSUMsUUFBUTtBQUNaLE1BQU1DLE9BQU8sQ0FBQztFQW9DWjs7RUFFQTs7RUFzRWlDO0VBQ0w7O0VBTUU7RUFDRjtFQUNDOztFQUs3Qjs7RUEwS0E7RUFDQUMsV0FBV0EsQ0FBQSxFQUFHO0lBQUFDLGVBQUEsc0JBcFNBO01BQ1pDLElBQUksRUFBRSxNQUFNO01BQ1pDLFNBQVMsRUFBRSxXQUFXO01BQ3RCQyxLQUFLLEVBQUUsT0FBTztNQUNkQyxtQkFBbUIsRUFBRSxnQkFBZ0I7TUFDckNDLGtCQUFrQixFQUFFLGVBQWU7TUFDbkNDLHNCQUFzQixFQUFFLHdCQUF3QjtNQUNoREMscUJBQXFCLEVBQUUsdUJBQXVCO01BQzlDQyxjQUFjLEVBQUUsWUFBWTtNQUM1QkMsdUJBQXVCLEVBQUUscUJBQXFCO01BQzlDQyxXQUFXLEVBQUUsYUFBYTtNQUMxQkMsb0JBQW9CLEVBQUUsc0JBQXNCO01BQzVDQyxVQUFVLEVBQUU7SUFDZCxDQUFDO0lBQUFaLGVBQUEscUJBQ1k7TUFDWEUsU0FBUyxFQUFFLENBQUMsQ0FBQztN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
