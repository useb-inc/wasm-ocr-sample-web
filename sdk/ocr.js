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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNzYVJldHJ5VHlwZSIsInNzYVJldHJ5UGl2b3QiLCJzc2FNYXhSZXRyeUNvdW50IiwidXNlRGVidWdBbGVydCIsInByZWxvYWRpbmciLCJvblByZWxvYWRlZCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJpc1ByZWxvYWRlZCIsInNob3dPQ1JMb2FkaW5nVUkiLCJfX3ByZWxvYWRpbmdTdGF0dXMiLCJfX2xvYWRSZXNvdXJjZXMiLCJfX3ByZWxvYWRlZCIsImhpZGVPQ1JMb2FkaW5nVUkiLCJpc0luaXRpYWxpemVkIiwiX19pbml0aWFsaXplZCIsImdldFByZWxvYWRpbmdTdGF0dXMiLCJpc0VuY3J5cHRNb2RlIiwiX19vcHRpb25zIiwiaXNDcmVkaXRDYXJkIiwiX19vY3JUeXBlIiwicHJlbG9hZGluZ1VJV3JhcCIsImdldE9DUkVsZW1lbnRzIiwiZGlzcGxheSIsImVuY3J5cHRSZXN1bHQiLCJyZXZpZXdfcmVzdWx0IiwiX19pc1N1cHBvcnRXYXNtIiwiaW5jbHVkZUxpc3QiLCJlbmNyeXB0ZWQiLCJvY3JfcmVzdWx0IiwiXyIsInRvUGFpcnMiLCJwaWNrIiwicmVkdWNlIiwiYWNjIiwiX3JlZiIsImtleSIsInZhbHVlIiwiX19lbmNyeXB0U2NhblJlc3VsdCIsIm9jcl9vcmlnaW5faW1hZ2UiLCJfb2JqZWN0U3ByZWFkIiwiZXhjbHVkZUxpc3QiLCJvbWl0IiwiX3JlZjIiLCJvY3JfbWFza2luZ19pbWFnZSIsIm9jcl9mYWNlX2ltYWdlIiwiZ2V0T0NSRW5naW5lIiwiX19PQ1JFbmdpbmUiLCJpbml0Iiwic2V0dGluZ3MiLCJsaWNlbnNlS2V5IiwiRXJyb3IiLCJfX2xpY2Vuc2UiLCJtZXJnZWRPcHRpb25zIiwibWVyZ2UiLCJzZXRPcHRpb24iLCJfX3dpbmRvd0V2ZW50QmluZCIsIl9fZGV2aWNlSW5mbyIsImdldE9zVmVyc2lvbiIsImdldE9wdGlvbiIsImdldE9jclR5cGUiLCJ0eXBlIiwiX19vY3JUeXBlTnVtYmVyVG9TdHJpbmciLCJnZXQiLCJnZXRPY3JUeXBlTnVtYmVyIiwic3RyaW5nIiwiX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIiLCJnZXRVSU9yaWVudGF0aW9uIiwiX191aU9yaWVudGF0aW9uIiwiZ2V0VmlkZW9PcmllbnRhdGlvbiIsIl9fdmlkZW9PcmllbnRhdGlvbiIsImNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlIiwiX3RoaXMyIiwiX19pc1N3aXRjaFRvU2VydmVyTW9kZSIsImxhdGVuY3lQZXIxMDBtcyIsIm1lYXN1cmVSZXBvcnQiLCJfX2RlYnVnIiwicGFyc2VGbG9hdCIsInN0YXJ0T0NSIiwib25TdWNjZXNzIiwib25GYWlsdXJlIiwiX2FyZ3VtZW50cyIsImFyZ3VtZW50cyIsIl90aGlzMyIsIm9uSW5Qcm9ncmVzc0NoYW5nZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9fc3NhTW9kZSIsImluZGV4T2YiLCJfX29uU3VjY2VzcyIsIl9fb25GYWlsdXJlIiwiX19vbkluUHJvZ3Jlc3NDaGFuZ2UiLCJfX3RvcFVJIiwidG9wVUkiLCJfX21pZGRsZVVJIiwibWlkZGxlVUkiLCJfX2JvdHRvbVVJIiwiYm90dG9tVUkiLCJfX2NoYW5nZVN0YWdlIiwiX19wcmVwcm9jZXNzIiwiX19zZXR1cERvbUVsZW1lbnRzIiwiX19wcmVsb2FkaW5nV2FzbSIsIl9fc3RhcnRTY2FuU2VydmVyIiwiX19zdGFydFNjYW5XYXNtIiwiZSIsInN0b3BPQ1IiLCJjbGVhbnVwIiwiX19jbG9zZUNhbWVyYSIsInNldElnbm9yZUNvbXBsZXRlIiwidmFsIiwiZW5jcnlwdCIsInBsYWluU3RyIiwicmVzdGFydE9DUiIsIm9jclR5cGUiLCJfYXJndW1lbnRzMiIsIl90aGlzNCIsImlzU3dpdGNoTW9kZSIsIl9fd2FpdFByZWxvYWRlZCIsIl90aGlzNSIsIndhaXRpbmdSZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaGVjayIsInNldFRpbWVvdXQiLCJjb252ZXJ0VHlwZVRvTnVtYmVyIiwib3B0aW9uIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbnZlcnRUeXBlVG9GbG9hdCIsIl90aGlzXyIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsInNraXBUb3VjaEFjdGlvbmZvclpvb20iLCJldiIsInRvdWNoZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwib25iZWZvcmV1bmxvYWQiLCJfX3BhZ2VFbmQiLCJoYW5kbGVSZXNpemUiLCJfcmVmNCIsIl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplIiwiX190aHJvdHRsaW5nUmVzaXplVGltZXIiLCJhcHBseSIsIl9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5IiwibXNnIiwiX19zbGVlcCIsIm1zIiwiX19ibG9iVG9CYXNlNjQiLCJibG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJfX2Jhc2U2NHRvQmxvYiIsImJhc2U2NCIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiYWIiLCJBcnJheUJ1ZmZlciIsImlhIiwiVWludDhBcnJheSIsImkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsIl9fY29tcHJlc2VCYXNlNjRJbWFnZSIsIm9wdGlvbnMiLCJjb25zdGFudE51bWJlciIsIl90aGlzNiIsImJsb2JGaWxlIiwiY29tcHJlc3NlZCIsImNvbXByZXNzSW1hZ2UiLCJjb21wcmVzc2lvblJhdGlvIiwiTWF0aCIsInJvdW5kIiwic2l6ZSIsIl9fZ2V0U3RyaW5nT25XYXNtSGVhcCIsImxlbmd0aEJ5dGVzIiwibGVuZ3RoQnl0ZXNVVEY4IiwiX19zdHJpbmdPbldhc21IZWFwIiwiX21hbGxvYyIsInN0cmluZ1RvVVRGOCIsIm9jclJlc3VsdCIsInN0cmluZ09uV2FzbUhlYXAiLCJ0b1N0cmluZyIsImpzb25TdHJpbmciLCJfZnJlZSIsIl9fc2V0VmlkZW9SZXNvbHV0aW9uIiwidmlkZW9FbGVtZW50IiwiX3RoaXM3IiwiaXNTdXBwb3J0ZWRSZXNvbHV0aW9uIiwicmVzb2x1dGlvblRleHQiLCJfX2NhbVNldENvbXBsZXRlIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwic3JjT2JqZWN0IiwiX192aWRlb1dpZHRoIiwiX192aWRlb0hlaWdodCIsIl9fZ2V0U2Nhbm5lckFkZHJlc3MiLCJfX29jclR5cGVMaXN0IiwiaW5jbHVkZXMiLCJhZGRyZXNzIiwiZGVzdHJveUNhbGxiYWNrIiwiZ2V0SURDYXJkU2Nhbm5lciIsImRlc3Ryb3lJRENhcmRTY2FubmVyIiwiZ2V0UGFzc3BvcnRTY2FubmVyIiwiZGVzdHJveVBhc3Nwb3J0U2Nhbm5lciIsImdldEFsaWVuU2Nhbm5lciIsImRlc3Ryb3lBbGllblNjYW5uZXIiLCJnZXRDcmVkaXRTY2FubmVyIiwiZGVzdHJveUNyZWRpdFNjYW5uZXIiLCJfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19yZXRyeUNvdW50R2V0QWRkcmVzcyIsIl9fZ2V0QnVmZmVyIiwiX19CdWZmZXIiLCJfX3Jlc29sdXRpb25XaWR0aCIsIl9fcmVzb2x1dGlvbkhlaWdodCIsIl9fcmVzdWx0QnVmZmVyIiwiX19tYXNrSW5mb1Jlc3VsdEJ1ZiIsIl9fZ2V0SW1hZ2VCYXNlNjQiLCJtYXNrTW9kZSIsImltZ01vZGUiLCJfYXJndW1lbnRzMyIsIl90aGlzOCIsImltZ1R5cGUiLCJlbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UiLCJlbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UiLCJqcGdTaXplIiwiZ2V0RW5jb2RlZEpwZ1NpemUiLCJqcGdQb2ludGVyIiwiZ2V0RW5jb2RlZEpwZ0J1ZmZlciIsInJlc3VsdFZpZXciLCJIRUFQOCIsImJ1ZmZlciIsImRlc3Ryb3lFbmNvZGVkSnBnIiwiX19kZXN0cm95QnVmZmVyIiwiX19kZXN0cm95UmVzdWx0QnVmZmVyIiwiX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lQcmV2SW1hZ2UiLCJfX1ByZXZJbWFnZSIsIl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAiLCJfX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcyIsIl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayIsIl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlIiwiX3RoaXM5IiwiX19nZXRSb3RhdGlvbkRlZ3JlZSIsIl9fZ2V0TWlycm9yTW9kZSIsIl9fY3JvcEltYWdlRnJvbVZpZGVvIiwiX3RoaXMxMCIsImNhbGNSZXNvbHV0aW9uX3ciLCJjYWxjUmVzb2x1dGlvbl9oIiwidmlkZW8iLCJjYW52YXMiLCJyb3RhdGlvbkNhbnZhcyIsImNhbGNDYW52YXMiLCJjYWxjVmlkZW9XaWR0aCIsImNhbGNWaWRlb0hlaWdodCIsImNhbGNWaWRlb0NsaWVudFdpZHRoIiwiY2xpZW50V2lkdGgiLCJjYWxjVmlkZW9DbGllbnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoIiwiX19jcm9wSW1hZ2VTaXplV2lkdGgiLCJjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCIsIl9fY3JvcEltYWdlU2l6ZUhlaWdodCIsImNhbGNWaWRlb09yaWVudGF0aW9uIiwiaXNBbGllbkJhY2siLCJfX2lzUm90YXRlZDkwb3IyNzAiLCJjYWxjTWF4U1dpZHRoIiwiY2FsY01heFNIZWlnaHQiLCJzeCIsInN5IiwicmF0aW8iLCJzV2lkdGgiLCJtaW4iLCJzSGVpZ2h0IiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY2FsY0NvbnRleHQiLCJnZXRDb250ZXh0Iiwid2lsbFJlYWRGcmVxdWVudGx5IiwiZHJhd0ltYWdlIiwiaW1nRGF0YSIsImltZ0RhdGFVcmwiLCJnZXRJbWFnZURhdGEiLCJ0b0RhdGFVUkwiLCJfX3JvdGF0ZSIsImRlZ3JlZSIsImltZyIsIkltYWdlIiwidGVtcENhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInRlbXBDb250ZXh0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsIm5ld0ltYWdlRGF0YSIsInJlc3RvcmUiLCJfX2lzQ2FyZGJveERldGVjdGVkIiwiX2FyZ3VtZW50czQiLCJfdGhpczExIiwiYm94VHlwZSIsInJldHJ5SW1nIiwic2V0IiwiZGF0YSIsImtvciIsImFsaWVuIiwicGFzc3BvcnQiLCJkZXRlY3RfaWRjYXJkX29wdCIsImRldGVjdF9pZGNhcmQiLCJtZXNzYWdlIiwiX19zdGFydFJlY29nbml0aW9uIiwic3NhTW9kZSIsImlzU2V0SWdub3JlQ29tcGxldGUiLCJfdGhpczEyIiwicmVzdWx0QnVmZmVyIiwicmVjb2duaXRpb24iLCJfcmVmNyIsIl9vY3JSZXN1bHQiLCJfb2NyUmVzdWx0MiIsInNjYW5JRENhcmQiLCJzY2FuUGFzc3BvcnQiLCJzY2FuQWxpZW4iLCJzY2FuQWxpZW5CYWNrIiwic2NhbkNyZWRpdCIsIl9fY3N2VG9PYmplY3QiLCJjb21wbGV0ZSIsIl9fbWFudWFsT0NSUmV0cnlDb3VudCIsIl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCIsInF1ZXVlSWR4IiwiX19kZXRlY3RlZENhcmRRdWV1ZSIsIl9fYmx1ckNhcHR1cmVCdXR0b24iLCJfX3NldFN0eWxlIiwiX3giLCJvY3JJbWFnZU1vZGUiLCJPQ1JfSU1HX01PREUiLCJvcmlnaW5JbWFnZSIsIk9DUl9JTUdfTUFTS19NT0RFIiwibWFza0ltYWdlIiwiZmFjZUltYWdlIiwiX19zdGFydFRydXRoIiwicmVqZWN0Iiwic2NhblRydXRoIiwic3RyIiwicGFpcnMiLCJvYmoiLCJwYWlyIiwiX19nZXRNYXNrSW5mbyIsIm1hc2tJbmZvUmVzdWx0QnVmIiwiZ2V0TWFza1JlY3QiLCJfX3N0YXJ0VHJ1dGhSZXRyeSIsIl90aGlzMTMiLCJfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfdGhpczE0IiwiX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIiwiX3RoaXMxNSIsImlzUGFzc3BvcnQiLCJfX3NldHVwVmlkZW8iLCJfX3N0cmVhbSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBsYXkiLCJfX2FkanVzdFN0eWxlIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJuYW1lIiwiZXJyb3JNZXNzYWdlIiwiX19vbkZhaWx1cmVQcm9jZXNzIiwic3RvcFN0cmVhbSIsIl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50IiwiZWwiLCJhc3NpZ24iLCJfX2NoYW5nZU9DUlN0YXR1cyIsIl9fb2NyU3RhdHVzIiwiX2FyZ3VtZW50czUiLCJfdGhpczE2IiwiZm9yY2VVcGRhdGUiLCJyZWNvZ25pemVkSW1hZ2UiLCJfX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAiLCJfX2luUHJvZ3Jlc3NTdGVwIiwiZ3VpZGVCb3giLCJtYXNrQm94V3JhcCIsImNhcHR1cmVCdXR0b24iLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJfbWFza0JveFdyYXAkcXVlcnlTZWwiLCJxdWVyeVNlbGVjdG9yIiwiX2NhcHR1cmVCdXR0b24kcXVlcnlTIiwib2NyTW9kZSIsImNhbGwiLCJfX3VwZGF0ZVByZXZpZXdVSSIsIl9faGlkZVByZXZpZXdVSSIsInByZXZpZXdVSVdyYXAiLCJwcmV2aWV3SW1hZ2UiLCJpbWdTdHlsZSIsImNvbnRleHQiLCJfX2dldElucHV0RGV2aWNlcyIsIl90aGlzMTciLCJtZWRpYURldmljZXMiLCJkZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNhbWVyYSIsImRldmljZSIsImtpbmQiLCJJbnB1dERldmljZUluZm8iLCJnZXRDYXBhYmlsaXRpZXMiLCJfY2FwJGZhY2luZ01vZGUiLCJjYXAiLCJmYWNpbmdNb2RlIiwiX19mYWNpbmdNb2RlQ29uc3RyYWludCIsIl9kZXZpY2UkbGFiZWwiLCJpc1VsdHJhQ2FtZXJhUmVnIiwibGFiZWwiLCJwdXNoIiwiZGV2aWNlSWQiLCJSZWZlcmVuY2VFcnJvciIsIl9kZXZpY2UkbGFiZWwyIiwiaXNCYWNrQ2FtZXJhUmVnIiwiY29uY2F0IiwiY2hlY2tVSU9yaWVudGF0aW9uIiwiY3VycmVudCIsIm9jciIsImlzQ2hhbmdlZCIsIl9fcHJldlVpT3JpZW50YXRpb24iLCJfX2NsZWFyQ3VzdG9tVUkiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfdGhpczE4IiwidmlkZW9XcmFwIiwiZ3VpZGVCb3hXcmFwIiwicHJldmVudFRvRnJlZXplVmlkZW8iLCJjdXN0b21VSVdyYXAiLCJjYXB0dXJlVUlXcmFwIiwiY2FwdHVyZVVJIiwicHJldmlld1VJIiwic3dpdGNoVUlXcmFwIiwic3dpdGNoVUkiLCJwcmVsb2FkaW5nVUkiLCJyZW1vdmUiLCJvY3JTdHlsZSIsIndyYXBTdHlsZSIsIm1hcmdpbiIsIm92ZXJmbG93IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJtYXNrX2ZyYW1lIiwidmlkZW9TdHlsZSIsInJvdGF0ZUNzcyIsIm1pcnJvckNzcyIsInJvdGF0ZUFuZE1pcnJvckNzcyIsInRyYW5zZm9ybSIsImNhbnZhc1N0eWxlIiwibGVmdCIsInRvcCIsImJvcmRlciIsInJpZ2h0IiwiYm90dG9tIiwiY3VzdG9tVUlXcmFwU3R5bGUiLCJjYXB0dXJlVUlXcmFwU3R5bGUiLCJjdXJzb3IiLCJjYXB0dXJlQnV0dG9uU3JjU1ZHIiwiX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiIsInByZXZpZXdVSVdyYXBTdHlsZSIsInN3aXRjaFVJV3JhcFN0eWxlIiwic3dpdGNoSFRNTCIsInN3aXRjaENoZWNrYm94IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJfX29uQ2xpY2tTd2l0Y2hVSSIsIl9yZWYxMCIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsIl94MiIsIm9uY2UiLCJwcmVsb2FkaW5nVUlXcmFwU3R5bGUiLCJfX2luaXRTdHlsZSIsIl9fb2NyIiwiX19jYW52YXMiLCJfX3JvdGF0aW9uQ2FudmFzIiwiX192aWRlbyIsIl9fdmlkZW9XcmFwIiwiX19ndWlkZUJveCIsIl9fZ3VpZGVCb3hXcmFwIiwiX19tYXNrQm94V3JhcCIsIl9fcHJldmVudFRvRnJlZXplVmlkZW8iLCJfX2N1c3RvbVVJV3JhcCIsIl9fY2FwdHVyZVVJV3JhcCIsIl9fY2FwdHVyZVVJIiwiX19jYXB0dXJlQnV0dG9uIiwiX19wcmV2aWV3VUlXcmFwIiwiX19wcmV2aWV3VUkiLCJfX3ByZXZpZXdJbWFnZSIsIl9fc3dpdGNoVUlXcmFwIiwiX19zd2l0Y2hVSSIsIl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsIl90aGlzMTkiLCJjb25zdHJhaW50V2lkdGgiLCJjb25zdHJhaW50SGVpZ2h0IiwiaWRlYWwiLCJjb25zdHJhaW50cyIsImF1ZGlvIiwiem9vbSIsImZvY3VzTW9kZSIsIndoaXRlQmFsYW5jZU1vZGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VXNlck1lZGlhIiwic3RyZWFtIiwic3RyZWFtU2V0dGluZ3MiLCJnZXRWaWRlb1RyYWNrcyIsImdldFNldHRpbmdzIiwiYXNwZWN0UmF0aW8iLCJfdGhpczIwIiwiYmFzZVdpZHRoIiwiYmFzZUhlaWdodCIsInNjYW5uZXJGcmFtZVJhdGlvIiwiZ3VpZGVCb3hXaWR0aCIsImd1aWRlQm94SGVpZ2h0IiwiY2FsY09jckNsaWVudFdpZHRoIiwiY2FsY09jckNsaWVudEhlaWdodCIsImd1aWRlQm94UmF0aW9CeVdpZHRoIiwiX19ndWlkZUJveFJhdGlvQnlXaWR0aCIsInZpZGVvUmF0aW9CeUhlaWdodCIsIl9fdmlkZW9SYXRpb0J5SGVpZ2h0IiwicmVkdWNlZEd1aWRlQm94V2lkdGgiLCJfX2d1aWRlQm94UmVkdWNlUmF0aW8iLCJyZWR1Y2VkR3VpZGVCb3hIZWlnaHQiLCJwYWRkaW5nIiwidmlkZW9Jbm5lckdhcCIsImJhY2tncm91bmRDb2xvciIsIm1hc2tCb3hJbm5lciIsInIiLCJtYXNrQm94SW5uZXJXaWR0aCIsIm1hc2tCb3hJbm5lckhlaWdodCIsIl90aGlzMjEiLCJfX2NhbGNHdWlkZUJveENyaXRlcmlhIiwiYSIsImIiLCJuZXdWaWRlb1dpZHRoIiwibmV3VmlkZW9IZWlnaHQiLCJuZXdWaWRlb1JhdGlvQnlXaWR0aCIsIm5ld1ZpZGVvUmF0aW9CeUhlaWdodCIsImNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyIsIl9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2RlcyIsImNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0IiwiY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSIsInBhZGRpbmdUb3AiLCJiYXNlbGluZSIsInN1bSIsIml0ZW0iLCJjaGlsZE5vZGVzIiwic3RvcFNjYW4iLCJfdGhpczIyIiwiX19yZXNvdXJjZXNMb2FkZWQiLCJfX2lzU3VwcG9ydFNpbWQiLCJlbnZJbmZvIiwib3MiLCJvc1NpbXBsZSIsInVzZWJPQ1JFbnZJbmZvIiwic2RrU3VwcG9ydEVudiIsInVybCIsImZldGNoIiwiaHJlZiIsInRoZW4iLCJyZXMiLCJ0ZXh0IiwicmVnZXgiLCJzb3VyY2UiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZXZhbCIsIm9uUnVudGltZUluaXRpYWxpemVkIiwiX3JlZjExIiwiX3gzIiwiX19zdGFydFNjYW5XYXNtSW1wbCIsIl90aGlzMjMiLCJfX2RldGVjdGVkIiwiX19hZGRyZXNzIiwiX19zc2FSZXRyeUNvdW50Iiwic2NhbiIsIl9yZWYxMiIsImlzRGV0ZWN0ZWRDYXJkIiwic3NhUmVzdWx0Iiwic3NhUmVzdWx0TGlzdCIsIm1hc2tJbmZvIiwicmVzb2x1dGlvbl93IiwicmVzb2x1dGlvbl9oIiwiX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUiLCJyZXRyeVN0YXJ0RGF0ZSIsIkRhdGUiLCJGQUtFIiwiUkVBTCIsIkVOU0VNQkxFIiwiaXNDb21wbGV0ZWQiLCJfbG9vcCIsImV4ZWN1dGUiLCJfcmVmMTMiLCJfcmV0IiwicmV0cnlXb3JraW5nVGltZSIsImxlZ2FjeUZvcm1hdCIsIm5ld0Zvcm1hdCIsInBhcnNlT2NyUmVzdWx0Iiwib2NyX3R5cGUiLCJzc2FfbW9kZSIsIl9fY29tcHJlc3NJbWFnZXMiLCJvY3JfZGF0YSIsIl9fb25TdWNjZXNzUHJvY2VzcyIsIl9fcmVjb3ZlcmVkIiwiX3RoaXMyNCIsInJlc2l6ZVJhdGlvIiwiZGVmYXVsdE9wdGlvbnMiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsImNvbnZlcnRTaXplIiwidGFyZ2V0Q29tcHJlc3NWb2x1bWUiLCJtYXNraW5nSW1hZ2VPcHRpb25zIiwicXVhbGl0eSIsIl9fcmVxdWVzdEdldEFQSVRva2VuIiwiY3JlZGVudGlhbCIsImF1dGhTZXJ2ZXJJbmZvIiwiYmFzZVVybCIsImJvZHkiLCJtZXRob2QiLCJqc29uIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJ0b2tlbiIsImNhdGNoIiwiZXJyIiwiX19yZXF1ZXN0U2VydmVyT0NSIiwiX3RoaXMyNSIsIl9yZWYxNCIsIm9jclNlcnZlckJhc2VVcmwiLCJhcGlUb2tlbiIsIm15SGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJwYXJhbSIsImltYWdlX2Jhc2U2NCIsIm1hc2tfbW9kZSIsImZhY2VfbW9kZSIsInJhdyIsInJlcXVlc3RPcHRpb25zIiwicmVkaXJlY3QiLCJfeDQiLCJfeDUiLCJfX3N0YXJ0U2NhblNlcnZlckltcGwiLCJfdGhpczI2IiwiX3JlZjE1IiwiX3RoaXMyNiRfX2NhcHR1cmVCdXR0IiwiX3JlZjE2IiwiYmFzZTY0SW1hZ2VSZXN1bHQiLCJfX2RlYnVnTW9kZSIsIm9jcl9hcGlfcmVzcG9uc2UiLCJfb2NyUmVzdWx0MyIsInJlc3VsdENvZGUiLCJyZXN1bHRNZXNzYWdlIiwic2Nhbm5lcl90eXBlIiwicmVzdWx0X2NvZGUiLCJyZXN1bHREZXRhaWwiLCJfeDYiLCJfeDciLCJpbWdEYXRhVVJMIiwibGltaXRTYXZlSW1hZ2VDb3VudCIsInNoaWZ0IiwiX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NCIsIl90aGlzMjciLCJhcGlfcmVzcG9uc2UiLCJyZXN1bHRfbWVzc2FnZSIsIl90aGlzMjgiLCJlcnJvckRldGFpbCIsInN0YWNrIiwiZXJyb3JfZGV0YWlsIiwiX3RoaXMyOSIsInByZWxvYWRpbmdTdGF0dXMiLCJfdGhpczMwIiwiX3RoaXMzMSIsIl9fcmVjb3ZlcnlTY2FuIiwiX3RoaXMzMiIsImNhbnZhc0NvbnRleHQiLCJjbGVhclJlY3QiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIl9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQiLCJzdG9wIiwidHJhY2tzIiwiZ2V0VHJhY2tzIiwiZm9yRWFjaCIsInRyYWNrIiwicmVzdG9yZUluaXRpYWxpemUiLCJjbGVhclRpbWVvdXQiXSwic291cmNlcyI6WyJvY3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGdsb2JhbC1tb2R1bGUgKi9cbmltcG9ydCBkZXRlY3RvciBmcm9tICcuL2hlbHBlcnMvZGV0ZWN0b3IuanMnO1xuaW1wb3J0IHVzZWJPQ1JXQVNNUGFyc2VyIGZyb20gJy4vaGVscGVycy91c2ViLW9jci13YXNtLXBhcnNlci5qcyc7XG5pbXBvcnQgdXNlYk9DUkFQSVBhcnNlciBmcm9tICcuL2hlbHBlcnMvdXNlYi1vY3ItYXBpLXBhcnNlci5qcyc7XG5pbXBvcnQgeyBpc1N1cHBvcnRXYXNtLCBtZWFzdXJlLCBzaW1kLCB0aHJlYWRzIH0gZnJvbSAnLi9oZWxwZXJzL3dhc20tZmVhdHVyZS1kZXRlY3QuanMnO1xuaW1wb3J0IEltYWdlVXRpbCBmcm9tICcuL2hlbHBlcnMvaW1hZ2UtdXRpbC5qcyc7XG5sZXQgaW5zdGFuY2U7XG5jbGFzcyBVc2VCT0NSIHtcbiAgSU5fUFJPR1JFU1MgPSB7XG4gICAgTk9ORTogJ25vbmUnLFxuICAgIE5PVF9SRUFEWTogJ25vdF9yZWFkeScsXG4gICAgUkVBRFk6ICdyZWFkeScsXG4gICAgQ0FSRF9ERVRFQ1RfU1VDQ0VTUzogJ2RldGVjdF9zdWNjZXNzJyxcbiAgICBDQVJEX0RFVEVDVF9GQUlMRUQ6ICdkZXRlY3RfZmFpbGVkJyxcbiAgICBNQU5VQUxfQ0FQVFVSRV9TVUNDRVNTOiAnbWFudWFsX2NhcHR1cmVfc3VjY2VzcycsXG4gICAgTUFOVUFMX0NBUFRVUkVfRkFJTEVEOiAnbWFudWFsX2NhcHR1cmVfZmFpbGVkJyxcbiAgICBPQ1JfUkVDT0dOSVpFRDogJ3JlY29nbml6ZWQnLFxuICAgIE9DUl9SRUNPR05JWkVEX1dJVEhfU1NBOiAncmVjb2duaXplZF93aXRoX3NzYScsXG4gICAgT0NSX1NVQ0NFU1M6ICdvY3Jfc3VjY2VzcycsXG4gICAgT0NSX1NVQ0NFU1NfV0lUSF9TU0E6ICdvY3Jfc3VjY2Vzc193aXRoX3NzYScsXG4gICAgT0NSX0ZBSUxFRDogJ29jcl9mYWlsZWQnXG4gIH07XG4gIE9DUl9TVEFUVVMgPSB7XG4gICAgTk9UX1JFQURZOiAtMSxcbiAgICBSRUFEWTogMCxcbiAgICBPQ1JfU1VDQ0VTUzogMSxcbiAgICBET05FOiAyXG4gIH07XG4gIFBSRUxPQURJTkdfU1RBVFVTID0ge1xuICAgIE5PVF9TVEFSVEVEOiAtMSxcbiAgICBTVEFSVEVEOiAwLFxuICAgIERPTkU6IDFcbiAgfTtcbiAgT0NSX0lNR19NT0RFID0ge1xuICAgIFdBUlBJTkc6IDAsXG4gICAgQ1JPUFBJTkc6IDEsXG4gICAgTk9ORTogMlxuICB9O1xuICBPQ1JfSU1HX01BU0tfTU9ERSA9IHtcbiAgICBGQUxTRTogMCxcbiAgICBUUlVFOiAxXG4gIH07XG5cbiAgLyoqIHB1YmxpYyBwcm9wZXJ0aWVzICovXG5cbiAgLyoqIHByaXZhdGUgcHJvcGVydGllcyAqL1xuICBfX2RlYnVnTW9kZSA9IGZhbHNlO1xuICBfX09DUkVuZ2luZSA9IG51bGw7XG4gIF9faXNTdXBwb3J0V2FzbSA9IGZhbHNlO1xuICBfX2lzU3VwcG9ydFNpbWQgPSBmYWxzZTtcbiAgX19pbml0aWFsaXplZCA9IGZhbHNlO1xuICBfX3ByZWxvYWRlZCA9IGZhbHNlO1xuICBfX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEO1xuICBfX2xpY2Vuc2U7XG4gIF9fb2NyVHlwZTtcbiAgX19zc2FNb2RlID0gZmFsc2U7XG4gIF9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk5PVF9SRUFEWTtcbiAgX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID0gMTA7XG4gIF9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gIF9fc3NhUmV0cnlDb3VudCA9IDA7XG4gIF9fZGV0ZWN0ZWRDYXJkUXVldWUgPSBbXTtcbiAgX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NCA9IFtdO1xuICBfX29uU3VjY2VzcyA9IG51bGw7XG4gIF9fb25GYWlsdXJlID0gbnVsbDtcbiAgX19vbkluUHJvZ3Jlc3NDaGFuZ2UgPSBudWxsO1xuICBfX29jclR5cGVMaXN0ID0gWydpZGNhcmQnLCAnZHJpdmVyJywgJ3Bhc3Nwb3J0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnYWxpZW4nLCAnYWxpZW4tYmFjaycsICdjcmVkaXQnLCAnaWRjYXJkLXNzYScsICdkcml2ZXItc3NhJywgJ3Bhc3Nwb3J0LXNzYScsICdmb3JlaWduLXBhc3Nwb3J0LXNzYScsICdhbGllbi1zc2EnXTtcbiAgX19vY3JUeXBlTnVtYmVyVG9TdHJpbmcgPSBuZXcgTWFwKFtbJzEnLCAnaWRjYXJkJ10sIFsnMicsICdkcml2ZXInXSwgWyczJywgJ3Bhc3Nwb3J0J10sIFsnNCcsICdmb3JlaWduLXBhc3Nwb3J0J10sIFsnNScsICdhbGllbiddLCBbJzUtMScsICdhbGllbiddLCBbJzUtMicsICdhbGllbiddLCBbJzUtMycsICdhbGllbiddXSk7XG4gIF9fb2NyU3RyaW5nVG9UeXBlTnVtYmVyID0gbmV3IE1hcChbWydpZGNhcmQnLCAnMSddLCBbJ2RyaXZlcicsICcyJ10sIFsncGFzc3BvcnQnLCAnMyddLCBbJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnNCddLCBbJ2FsaWVuJywgJzUnXSwgWydhbGllbicsICc1LTEnXSwgWydhbGllbicsICc1LTInXSwgWydhbGllbicsICc1LTMnXV0pO1xuICBfX3BhZ2VFbmQgPSBmYWxzZTtcbiAgX19vY3I7XG4gIF9fY2FudmFzO1xuICBfX3JvdGF0aW9uQ2FudmFzO1xuICBfX3ZpZGVvO1xuICBfX3ZpZGVvV3JhcDtcbiAgX19ndWlkZUJveDtcbiAgX19ndWlkZUJveFdyYXA7XG4gIF9fbWFza0JveFdyYXA7XG4gIF9fcHJldmVudFRvRnJlZXplVmlkZW87XG4gIF9fY3VzdG9tVUlXcmFwO1xuICBfX3RvcFVJO1xuICBfX21pZGRsZVVJO1xuICBfX2JvdHRvbVVJO1xuICBfX3ByZXZpZXdVSVdyYXA7XG4gIF9fcHJldmlld1VJO1xuICBfX3ByZXZpZXdJbWFnZTtcbiAgX19jYXB0dXJlVUlXcmFwO1xuICBfX2NhcHR1cmVVSTtcbiAgX19zd2l0Y2hVSVdyYXA7XG4gIF9fc3dpdGNoVUk7XG4gIF9fY2FwdHVyZUJ1dHRvbjtcbiAgX19hZGRyZXNzID0gMDtcbiAgX19kZXRlY3RlZCA9IGZhbHNlO1xuICBfX3JlY292ZXJlZCA9IGZhbHNlO1xuICBfX0J1ZmZlciA9IG51bGw7XG4gIF9fcmVzdWx0QnVmZmVyID0gbnVsbDtcbiAgX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IG51bGw7XG4gIF9fUHJldkltYWdlID0gbnVsbDtcbiAgX19zdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgX19jYW1TZXRDb21wbGV0ZSA9IGZhbHNlO1xuICBfX3Jlc29sdXRpb25XaWR0aCA9IDA7XG4gIF9fcmVzb2x1dGlvbkhlaWdodCA9IDA7XG4gIF9fdmlkZW9XaWR0aCA9IDA7XG4gIF9fdmlkZW9IZWlnaHQgPSAwO1xuICBfX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICBfX2ludGVydmFsVGltZXI7XG4gIF9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcjtcbiAgX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgPSAwO1xuICBfX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkO1xuICBfX3N0cmVhbTtcbiAgX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrID0gbnVsbDtcbiAgX19mYWNpbmdNb2RlQ29uc3RyYWludCA9ICdlbnZpcm9ubWVudCc7XG4gIF9fdWlPcmllbnRhdGlvbiA9ICcnO1xuICBfX3ByZXZVaU9yaWVudGF0aW9uID0gJyc7XG4gIF9fdmlkZW9PcmllbnRhdGlvbiA9ICcnO1xuICBfX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IG51bGw7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5ID0gNTAwO1xuICBfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzID0gMzAwOyAvLyDsnoTsi5xcbiAgX19yZXRyeUNvdW50R2V0QWRkcmVzcyA9IDA7IC8vIOyehOyLnFxuICBfX2RldmljZUluZm87XG4gIF9faXNSb3RhdGVkOTBvcjI3MCA9IGZhbHNlO1xuICBfX2luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFk7XG4gIF9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9IHRoaXMuSU5fUFJPR1JFU1MuTk9ORTtcbiAgX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSBmYWxzZTtcbiAgX19ndWlkZUJveFJhdGlvQnlXaWR0aCA9IDEuMDsgLy8g7IiY7KCV67aI6rCAXG4gIF9fdmlkZW9SYXRpb0J5SGVpZ2h0ID0gMC45OyAvLyDsiJjsoJXrtojqsIBcbiAgX19ndWlkZUJveFJlZHVjZVJhdGlvID0gMC44OyAvLyDsiJjsoJXrtojqsIBcbiAgX19jcm9wSW1hZ2VTaXplV2lkdGggPSAwO1xuICBfX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSAwO1xuICBfX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZmFsc2U7XG5cbiAgLyoqIERlZmF1bHQgb3B0aW9ucyAqL1xuICBfX29wdGlvbnMgPSBuZXcgT2JqZWN0KHtcbiAgICAvLyDrlJTrsoTquYUg7Ji17IWYXG4gICAgc2hvd0NsaXBGcmFtZTogZmFsc2UsXG4gICAgLy8gY2lscC1mcmFtZSDrs7TquLBcbiAgICBzaG93Q2FudmFzUHJldmlldzogZmFsc2UsXG4gICAgLy8gY2FudmFzIHByZXZpZXcg67O06riwXG5cbiAgICAvLyDstpzroKUg7Ji17IWYXG4gICAgLy8g7JWU7Zi47ZmUXG4gICAgdXNlRW5jcnlwdE1vZGU6IGZhbHNlLFxuICAgIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKOqwnOyduOqzoOycoOyLneuzhOu2gO2YuCDqtIDroKgg7ZWt66qpIOyVlO2YuO2ZlClcbiAgICB1c2VFbmNyeXB0QWxsTW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo7KCE7LK0IOyVlO2YuO2ZlCwgZW5jcnlwdCBvYmplY3Qg67OE64+EIOygnOqztSlcbiAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgIC8vIHVzZVBpaUVuY3J5cHRNb2RlOiBmYWxzZSwgLy8g7JWU7Zi47ZmUIOyggeyaqSAocGlpKVxuICAgIC8vIHVzZVBpaUVuY3J5cHRGYWNlOiBmYWxzZSwgLy8g7Iug67aE7KadIOyWvOq1tOyCrOynhCDslZTtmLjtmZQg7KCB7JqpIChwaWkpXG4gICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgdXNlTGVnYWN5Rm9ybWF0OiBmYWxzZSxcbiAgICAvLyBMZWdhY3kgZm9ybWF0IOyngOybkFxuICAgIHVzZU1hc2tJbmZvOiB0cnVlLFxuICAgIC8vIOuniOyKpO2CuSDsooztkZwg7KeA7JuQXG4gICAgdXNlRmFjZUltYWdlOiB0cnVlLFxuICAgIC8vIOyLoOu2hOymnSDrgrQg7Ja86rW0IOyCrOynhFxuICAgIHVzZUltYWdlV2FycGluZzogZmFsc2UsXG4gICAgLy8g7Iug67aE7KadIOydtOuvuOyngOulvCBXYXJwaW5nKOyZnOqzoSDrs7TsoJUg7ZWg7KeAIOyXrOu2gClcbiAgICB1c2VDb21wcmVzc0ltYWdlOiBmYWxzZSxcbiAgICAvLyDsi6DrtoTspp0g7J2066+47KeA66W8IOyVley2le2VoOyngCDsl6zrtoBcbiAgICB1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGg6IDEwODAsXG4gICAgLy8g7J2066+47KeAIOumrOyCrOydtOynlSDqsIDroZwg7ZW07IOB64+EXG4gICAgdXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZTogMTAyNCAqIDUwLFxuICAgIC8vIOydtOuvuOyngCDslZXstpUg66qp7ZGcIOyaqeufiVxuXG4gICAgLy8gVUkg7ISk7KCVXG4gICAgdXNlVG9wVUk6IHRydWUsXG4gICAgLy8g7IOB64uoIFVJXG4gICAgdXNlVG9wVUlUZXh0TXNnOiBmYWxzZSxcbiAgICAvL+yDgeuLqCBVSSA+IFRFWFRcbiAgICB1c2VNaWRkbGVVSTogdHJ1ZSxcbiAgICAvL+ykkeuLqCBVSVxuICAgIHVzZU1pZGRsZVVJVGV4dE1zZzogdHJ1ZSxcbiAgICAvLyDspJHri6ggVUkgPiBURVhUXG4gICAgdXNlQm90dG9tVUk6IHRydWUsXG4gICAgLy8g7ZWY64uoIFVJXG4gICAgdXNlQm90dG9tVUlUZXh0TXNnOiBmYWxzZSxcbiAgICAvLyDtlZjri6ggVUkgPiBURVhUXG4gICAgdXNlUHJldmlld1VJOiB0cnVlLFxuICAgIC8vIFByZXZpZXcgVUlcbiAgICB1c2VDYXB0dXJlVUk6IHRydWUsXG4gICAgLy8g7Lqh7LKY67KE7Yq8IFVJXG4gICAgcHJlbG9hZGluZ1VJVGV4dE1zZzogJ+yLoOu2hOymneyduOymnSDrqqjrk4jsnYQg67aI65+s7Jik64qUIOykkSDsnoXri4jri6Q8YnIgLz7snqDsi5zrp4wg6riw64uk66Ck7KO87IS47JqUJyxcbiAgICAvLyDsnbjsi50g7ZSE66CI7J6EIOyYteyFmFxuICAgIGZyYW1lQm9yZGVyU3R5bGU6IHtcbiAgICAgIHdpZHRoOiA1LFxuICAgICAgLy8gYm9yZGVyLXdpZHRoXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgLy8gYm9yZGVyLXJhZGl1c1xuICAgICAgc3R5bGU6ICdzb2xpZCcsXG4gICAgICAvLyBib3JkZXItc3R5bGVcblxuICAgICAgLy8g64uo6rOE67OEIOyduOyLnSDtlITroIjsnoQgYm9yZGVyIOyDieyDgVxuICAgICAgbm90X3JlYWR5OiAnIzAwMDAwMCcsXG4gICAgICAvLyDsiqTsupTspIDruYQgOiDqsoDsoJVcbiAgICAgIHJlYWR5OiAnI2I4YjhiOCcsXG4gICAgICAvLyDsiqTsupTrjIDquLAgOiDtmozsg4lcbiAgICAgIGRldGVjdF9zdWNjZXNzOiAnIzVlOGZmZicsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7ISx6rO1IDog7ZWY64qYXG4gICAgICBkZXRlY3RfZmFpbGVkOiAnIzcyNWI2NycsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7Iuk7YyoIDog67O06528XG4gICAgICBtYW51YWxfY2FwdHVyZV9zdWNjZXNzOiAnIzVlOGZmZicsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7ISx6rO1IDog7ZWY64qYXG4gICAgICBtYW51YWxfY2FwdHVyZV9mYWlsZWQ6ICcjNzI1YjY3JyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDsi6TtjKggOiDrs7TrnbxcbiAgICAgIHJlY29nbml6ZWQ6ICcjMDAzYWMyJyxcbiAgICAgIC8vIE9DUuyZhOujjCA6IO2MjOuekVxuICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogJyMwMDNhYzInLFxuICAgICAgLy8g7IKs67O47YyQ67OE7KSRKOyCrOuzuO2MkOuzhCBPTikgOiDtjIzrnpFcbiAgICAgIG9jcl9zdWNjZXNzOiAnIzE0YjAwZScsXG4gICAgICAvLyBPQ1LsmYTro4wgOiDstIjroZ1cbiAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiAnIzE0YjAwZScsXG4gICAgICAvLyBPQ1LsmYTro4wo7IKs67O47YyQ67OEIE9OKSA6IOy0iOuhnVxuICAgICAgb2NyX2ZhaWxlZDogJyNGQTExM0QnIC8vIE9DUuyLpO2MqCA6IOu5qOqwlVxuICAgIH0sXG5cbiAgICAvLyDrp4jsiqTtgawg7ZSE66CI7J6EIGZpbGwg7Lus65+sIOuzgOqyvSDsgqzsmqkg7Jes67aAXG4gICAgdXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2U6IHRydWUsXG4gICAgLy8g66eI7Iqk7YGsIO2UhOugiOyehCDsmLXshZggKOy5tOuplOudvCDruYTrlJTsmKQg7JiB7Jet7JeQ7IScIOyduOyLnSDtlITroIjsnoTrp4wg67O07J206rKMIO2VmOqzoCDrgpjrqLjsp4Drpbwg642u7Ja07JOw64qUIO2UhOugiOyehCDsmIHsl60pXG4gICAgbWFza0ZyYW1lU3R5bGU6IHtcbiAgICAgIGNsaXBfZnJhbWU6ICcjZmYwMGJmJyxcbiAgICAgIC8vIGNsaXAtZnJhbWUg7IOJ7IOBIDog65Sl7Y287ZSMICjsiJjsoJXrtojqsIApXG4gICAgICBiYXNlX2NvbG9yOiAnIzMzMzMzMycsXG4gICAgICAvLyBtYXNrLWZyYW1lIOyDieyDgSA6IOuLpO2BrOq3uOugiOydtCAo7Yis66qF64+E64qUIOyImOygleu2iOqwgCBmZuuhnCDqs6DsoJUpXG5cbiAgICAgIC8vIOuLqOqzhOuzhCDrp4jsiqTtgawg7ZSE66CI7J6EIGZpbGwg7IOJ7IOBXG4gICAgICBub3RfcmVhZHk6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyKpOy6lOykgOu5hFxuICAgICAgcmVhZHk6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyKpOy6lOuMgOq4sFxuICAgICAgZGV0ZWN0X3N1Y2Nlc3M6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDshLHqs7VcbiAgICAgIGRldGVjdF9mYWlsZWQ6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDsi6TtjKhcbiAgICAgIG1hbnVhbF9jYXB0dXJlX3N1Y2Nlc3M6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDshLHqs7VcbiAgICAgIG1hbnVhbF9jYXB0dXJlX2ZhaWxlZDogJyMzMzMzMzMnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyLpO2MqFxuICAgICAgcmVjb2duaXplZDogJyMyMjIyMjInLFxuICAgICAgLy8gT0NS7JmE66OMXG4gICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiAnIzIyMjIyMicsXG4gICAgICAvLyDsgqzrs7jtjJDrs4TspJEo7IKs67O47YyQ67OEIE9OKVxuICAgICAgb2NyX3N1Y2Nlc3M6ICcjMTExMTExJyxcbiAgICAgIC8vT0NS7JmE66OMXG4gICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogJyMxMTExMTEnLFxuICAgICAgLy8gT0NS7JmE66OMKOyCrOuzuO2MkOuzhCBPTilcbiAgICAgIG9jcl9mYWlsZWQ6ICcjMTExMTExJyAvLyBPQ1Lsi6TtjKhcbiAgICB9LFxuXG4gICAgLy8g7LSs7JiB7Ji17IWYXG4gICAgdXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZTogZmFsc2UsXG4gICAgLy8g7KCA7IKs7JaRIOuLqOunkOyXkOyEnCDshJzrsoRPQ1LroZwg7J6Q64+ZIOyghO2ZmCDquLDriqVcbiAgICB1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGU6IGZhbHNlLFxuICAgIC8vIOyImOuPmeycvOuhnCDshJzrsoRPQ1Ig7KCE7ZmYIOq4sOuKpSAo7IiY64+Z7J20IHRydWXsnbTrqbQg7J6Q64+Z7J2AIOustOyLnOuQqClcbiAgICBzd2l0Y2hUb1NlcnZlclRocmVzaG9sZDogMjAuMCxcbiAgICAvLyDsnpDrj5nsoITtmZgg6riw7KSA6rCSICjshLHriqUg7Lih7KCV7LmYIG1zKVxuICAgIHVzZUZvcmNlQ29tcGxldGVVSTogZmFsc2UsXG4gICAgLy8gV0FTTSDrqqjrk5zsnbzrlYwg67KE7Yq8IOuIhOulvOyLnCDtlbTri7kg7Iuc7KCQ7JeQIOqwleygnOuhnCDsmYTro4wg7IKs7Jqp7Jes67aAXG5cbiAgICAvLyDsiJjrj5nstKzsmIEg67KE7Yq8IOyYteyFmFxuICAgIGNhcHR1cmVCdXR0b25TdHlsZToge1xuICAgICAgc3Ryb2tlX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAvLyDrsoTtirwg7YWM65GQ66asKHN0cm9rZSkg7IOJ7IOBXG4gICAgICBiYXNlX2NvbG9yOiAnIzVlOGZmZicgLy8g67KE7Yq8IOyDieyDgVxuICAgIH0sXG5cbiAgICByZXNvdXJjZUJhc2VVcmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgLy8gd2FzbSwgZGF0YSDtjIzsnbwg66as7IaM7IqkIGJhc2Ug6rK966GcIChDRE4g7IKs7Jqp7IucIOuzgOqyvSlcbiAgICBkZXZpY2VMYWJlbDogJycsXG4gICAgdmlkZW9UYXJnZXRJZDogJycsXG4gICAgLy8g7Lm066mU6528IOyEpOyglVxuICAgIHJvdGF0aW9uRGVncmVlOiAwLFxuICAgIC8vIHJvdGF0aW9uLWRlZ3JlZSDsubTrqZTrnbzqsIAg7ZqM7KCE65CcIOqwgeuPhCAoOTAsIDE5MCwgMjcwKVxuICAgIG1pcnJvck1vZGU6IGZhbHNlLFxuICAgIC8vIG1pcnJvci1tb2RlIOyFgO2UvCDsubTrqZTrnbwo7YKk7Jik7Iqk7YGsIOuTsSkg7IKs7Jqp7IucIOyijOyasCDrsJjsoIRcbiAgICBjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsOiAxMDAwLFxuICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIOqwhOqyqShtcylcbiAgICBjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0OiAtMSxcbiAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDstZzrjIAg7Zqf7IiYLCAtMeydtOuptCDrrLTtlZwg7J6s7JqU7LKtLlxuXG4gICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgIDogJ2NvbXBhdGliaWxpdHknICjtmLjtmZjshLEg7Jqw7ISgKSB8fCAnaGlnaFF1YWxpdHknICjqs6DtmZTsp4gg7Jqw7ISgKVxuICAgIC8vIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2NvbXBhdGliaWxpdHknLCAvLyDtmLjtmZjshLEg7Jqw7ISgKOq2jOyepSwg65SU7Y+07Yq4KSA6IDcyMOycvOuhnCDqs6DsoJUsIOyggOyCrOyWkSDri6jrp5DquLAg7Zi47ZmY7ISxIOyii+ydjFxuICAgIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2hpZ2hRdWFsaXR5JyxcbiAgICAvLyDqs6DtmZTsp4gg7Jqw7ISgIDogMTA4MOydtCDqsIDriqXtlZjrqbQgMTA4MCDrtojqsIDriqXtlZjrqbQgNzIwXG5cbiAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOyEpOyglSA6ICdjYW1lcmFSZXNvbHV0aW9uJyAo7Lm066mU6528IO2VtOyDgeuPhCkgfHwgJ29jclZpZXdTaXplJyAob2NyIGRpdiDtgazquLApXG4gICAgY2FsY0d1aWRlQm94Q3JpdGVyaWE6ICdjYW1lcmFSZXNvbHV0aW9uJyxcbiAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOq4sOykgCjqtozsnqUsIOuUlO2PtO2KuCkgOiA3MjB4MTI4MCDtlbTsg4Hrj4Qo7IS466Gc66qo65OcKSDsnbzrlYwgb2NyIHZpZXcgd2lkdGggc2l6ZeqwgCA3MjDrs7Tri6Qg7YGwIOqyveyasCwg6rCA7J2065OcIOuwleyKpOulvCA3MjDsl5Ag66ee7LakIChwcmV2aWV3IO2ZlOuptCDquajsp5Ag7JeG7J2MKVxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhOiAnb2NyVmlld1NpemUnLCAvLyDtmZTrqbQg7IKs7J207KaIIOq4sOykgCA6IDcyMHgxMjgwIO2VtOyDgeuPhCjshLjroZzrqqjrk5wpIOydvOuVjCBvY3IgdmlldyB3aWR0aCBzaXpl6rCAIDcyMOuztOuLpCDtgbDqsr3smrAsIOqwgOydtOuTnCDrsJXsiqTrpbwgb2NyIHZpZXcgd2lkdGgg7IKs7JeQ7KaI7JeQIOunnuy2pCAocHJldmlldyDtmZTrqbQg6rCV7KCc66GcIOuKmOumrOq4sCDrlYzrrLjsl5Ag64uk7IaMIOq5qOynkClcblxuICAgIC8vIOyCrOuzuO2MkOuzhCBSRVRSWSDshKTsoJVcbiAgICAvLyBzc2FSZXRyeVR5cGVcbiAgICAvLyAgIC0gUkVBTCAgICAgOiDrs7jsnbgoUkVBTCkg6rGw67aA7JyoIC0+IEZhbHNlIE5lZ2F0aXZlKOyLpOygnOqwkuydgCBSRUFM7J24642wIOyYiOy4oeqwkuydgCBGQUtF65287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtCxcbiAgICAvLyAgIC0gRkFLRSAgICAgOiDtg4DsnbgoRkFLRSkg7IiY65297JyoIC0+IEZhbHNlIFBvc2l0aXZlKOyLpOygnOqwkuydgCBGQUtF7J24642wIOyYiOy4oeqwkuydgCBSRUFM7J2065287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtFxuICAgIC8vICAgLSBFTlNFTUJMRSA6IO2Pieq3oCDsoIjrjIDqsJIgLT4gc3NhTWF4UmV0cnlDb3VudCDrp4ztgbwg67CY67O1IOyImO2Wie2VmOqzoCBmZF9jb25maWRlbmNlIOygiOuMgOqwkiDqsJLsnZgg7Y+J6reg7Jy866GcIO2MkOyglVxuICAgIC8vIHNzYU1heFJldHJ5Q291bnQg7ISk7KCVIOqwkuunjO2BvCDsnqzsi5zrj4TtlZjsl6wg7ZWc67KI7J20652864+EIOq4sOykgOqwkihSRUFMIOuYkOuKlCBGQUtFKeydtCDrnKjrqbQg6riw7KSA6rCSKFJFQUwg65iQ64qUIEZBS0Up66GcIO2MkOyglVxuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJyxcbiAgICBzc2FSZXRyeVBpdm90OiAwLjUsXG4gICAgLy8gUkVBTC9GQUtF66W8IO2MkOygle2VmOuKlCBmZF9jb25maWRlbmNlIOq4sOykgOqwkiAod2FzbSDrsLDtj6wg67KE7KCE7JeQIOuUsOudvCDri6TrpoQpIOKAuyDsiJjsoJXrtojqsIBcbiAgICBzc2FNYXhSZXRyeUNvdW50OiAwLFxuICAgIC8vIOy1nOuMgCBSRVRSWSDtmozsiJjshKTsoJUgMOydtOuptCDrr7jsgqzsmqlcblxuICAgIC8vIHRoaXMuX19kZWJ1Zygp66W8IO2Gte2VtCDssI3snYAg66mU7Iuc7KeA66W8IGFsZXJ07Jy866GcIOudhOyauOyngCDsl6zrtoBcbiAgICB1c2VEZWJ1Z0FsZXJ0OiBmYWxzZVxuICB9KTtcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGluc3RhbmNlKSByZXR1cm4gaW5zdGFuY2U7XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBwdWJsaWMgbWV0aG9kcyAqL1xuICBhc3luYyBwcmVsb2FkaW5nKG9uUHJlbG9hZGVkKSB7XG4gICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKG9uUHJlbG9hZGVkKSBvblByZWxvYWRlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aGlzLnNob3dPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEO1xuICAgICAgYXdhaXQgdGhpcy5fX2xvYWRSZXNvdXJjZXMoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FO1xuICAgICAgdGhpcy5fX3ByZWxvYWRlZCA9IHRydWU7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgICB0aGlzLmhpZGVPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgaXNJbml0aWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2luaXRpYWxpemVkO1xuICB9XG4gIGlzUHJlbG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9fcHJlbG9hZGVkO1xuICB9XG4gIGdldFByZWxvYWRpbmdTdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzO1xuICB9XG4gIGlzRW5jcnlwdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRBbGxNb2RlO1xuICB9XG4gIGlzQ3JlZGl0Q2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGUgPT09ICdjcmVkaXQnO1xuICB9XG4gIHNob3dPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfVxuICB9XG4gIGhpZGVPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9XG4gIGVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCkge1xuICAgIGlmICh0aGlzLmlzQ3JlZGl0Q2FyZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRW5jcnlwdE1vZGUoKSAmJiB0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGluY2x1ZGVMaXN0ID0gWydqdW1pbicsICdkcml2ZXJfbnVtYmVyJywgJ3Bhc3Nwb3J0X251bWJlcicsICdwZXJzb25hbF9udW1iZXInLCAnbXJ6MiddO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSB7XG4gICAgICAgICAgb2NyX3Jlc3VsdDogXy50b1BhaXJzKF8ucGljayhyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGluY2x1ZGVMaXN0KSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0ID0ge1xuICAgICAgICAgIC4uLnJldmlld19yZXN1bHQub2NyX3Jlc3VsdCxcbiAgICAgICAgICAuLi5lbmNyeXB0ZWQub2NyX3Jlc3VsdFxuICAgICAgICB9O1xuICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBlbmNyeXB0ZWQub2NyX29yaWdpbl9pbWFnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gWydjb21wbGV0ZScsICdyZXN1bHRfc2Nhbl90eXBlJywgJ2NvbG9yX3BvaW50JywgJ2ZvdW5kX2ZhY2UnLCAnc3BlY3VsYXJfcmF0aW8nLCAnc3RhcnRfdGltZScsICdlbmRfdGltZScsICdmZF9jb25maWRlbmNlJywgJ2lkX3RydXRoJywgJ2lkX3RydXRoX3JldHJ5X2NvdW50J107XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICByZXZpZXdfcmVzdWx0LmVuY3J5cHRlZCA9IHtcbiAgICAgICAgICBvY3JfcmVzdWx0OiBfLnRvUGFpcnMoXy5vbWl0KHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgZXhjbHVkZUxpc3QpKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlKSxcbiAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UpLFxuICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfZmFjZV9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0T0NSRW5naW5lKCkge1xuICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lO1xuICB9XG4gIGluaXQoc2V0dGluZ3MpIHtcbiAgICBpZiAoISEhc2V0dGluZ3MubGljZW5zZUtleSkgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIGtleSBpcyBlbXB0eScpO1xuICAgIHRoaXMuX19saWNlbnNlID0gc2V0dGluZ3MubGljZW5zZUtleTtcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zID0gXy5tZXJnZSh7fSwgdGhpcy5fX29wdGlvbnMsIHNldHRpbmdzKTtcbiAgICB0aGlzLnNldE9wdGlvbihtZXJnZWRPcHRpb25zKTtcbiAgICB2b2lkIDA7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhpcy5fX3dpbmRvd0V2ZW50QmluZCgpO1xuICAgICAgdGhpcy5fX2RldmljZUluZm8gPSBkZXRlY3Rvci5nZXRPc1ZlcnNpb24oKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRXYXNtID0gaXNTdXBwb3J0V2FzbSgpO1xuICAgICAgaWYgKCF0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBzdXBwb3J0ZWQuIGluIHRoaXMgYnJvd3Nlci4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHNldE9wdGlvbihzZXR0aW5ncykge1xuICAgIHRoaXMuX19vcHRpb25zID0gc2V0dGluZ3M7XG4gIH1cbiAgZ2V0T3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucztcbiAgfVxuICBnZXRPY3JUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGVOdW1iZXJUb1N0cmluZy5nZXQodHlwZSk7XG4gIH1cbiAgZ2V0T2NyVHlwZU51bWJlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclN0cmluZ1RvVHlwZU51bWJlci5nZXQoc3RyaW5nKTtcbiAgfVxuICBnZXRVSU9yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdWlPcmllbnRhdGlvbjtcbiAgfVxuICBnZXRWaWRlb09yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgfVxuICBhc3luYyBjaGVja1N3aXRjaFRvU2VydmVyTW9kZSgpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAvLyDsiJjrj5nsoITtmZggb24g7J2066m0IOyImOuPmeyghO2ZmCDsmrDshKBcbiAgICAgIHJldHVybiB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOyImOuPmeyghO2ZmCBvZmYg7J2066m0IOyekOuPmeyghO2ZmCDssrTtgaxcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgIC8vIOyekOuPmeyghO2ZmCBvbuydvOuVjFxuICAgICAgICAvLyDshLHriqUg7Lih7KCV6rCS7J2EIOq4sOykgOycvOuhnCBXQVNNIG9yIFNlcnZlclxuICAgICAgICBjb25zdCBbbGF0ZW5jeVBlcjEwMG1zLCBtZWFzdXJlUmVwb3J0XSA9IGF3YWl0IG1lYXN1cmUoKTtcbiAgICAgICAgdGhpcy5fX2RlYnVnKG1lYXN1cmVSZXBvcnQpO1xuICAgICAgICByZXR1cm4gbGF0ZW5jeVBlcjEwMG1zID4gcGFyc2VGbG9hdCh0aGlzLl9fb3B0aW9ucy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsiJjrj5nsoITtmZjrj4Qgb2ZmLCDsnpDrj5nsoITtmZggb2ZmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgc3RhcnRPQ1IodHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSA9IG51bGwpIHtcbiAgICBpZiAoISEhdHlwZSB8fCAhISFvblN1Y2Nlc3MgfHwgISEhb25GYWlsdXJlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGF3YWl0IHRoaXMuY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUoKTtcbiAgICB0aGlzLl9fb2NyVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fX3NzYU1vZGUgPSB0aGlzLl9fb2NyVHlwZS5pbmRleE9mKCctc3NhJykgPiAtMTtcbiAgICB0aGlzLl9fb25TdWNjZXNzID0gb25TdWNjZXNzO1xuICAgIHRoaXMuX19vbkZhaWx1cmUgPSBvbkZhaWx1cmU7XG4gICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZSA9IG9uSW5Qcm9ncmVzc0NoYW5nZTtcbiAgICBpZiAob25JblByb2dyZXNzQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHtcbiAgICAgICAgdGhpcy5fX3RvcFVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS50b3BVSTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSkge1xuICAgICAgICB0aGlzLl9fbWlkZGxlVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm1pZGRsZVVJO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJKSB7XG4gICAgICAgIHRoaXMuX19ib3R0b21VSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuYm90dG9tVUk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW5pdGlhbGl6ZWQhJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fcHJlcHJvY2VzcygpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwRG9tRWxlbWVudHMoKTtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8gc2VydmVyTW9kZVxuICAgICAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fcHJlbG9hZGluZ1dhc20oKTsgLy8g7ISc67KE66qo65OcIOydtOyngOunjCDslZTtmLjtmZQg7ZWY6riw7JyE7ZW0IHdhc23snYQgcHJlbG9hZGluZyDtlahcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5TZXJ2ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdhc21Nb2RlXG4gICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zdG9wT0NSKCk7XG4gICAgfVxuICB9XG4gIHN0b3BPQ1IoKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gIH1cbiAgc2V0SWdub3JlQ29tcGxldGUodmFsKSB7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zZXRJZ25vcmVDb21wbGV0ZSh2YWwpO1xuICB9XG4gIGVuY3J5cHQocGxhaW5TdHIpIHtcbiAgICByZXR1cm4gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHBsYWluU3RyKTtcbiAgfVxuICBhc3luYyByZXN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UsIGlzU3dpdGNoTW9kZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3dpdGNoTW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdG9wT0NSKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICB9XG5cbiAgLyoqIHByaXZhdGUgbWV0aG9kcyAqL1xuICBhc3luYyBfX3dhaXRQcmVsb2FkZWQoKSB7XG4gICAgbGV0IHdhaXRpbmdSZXRyeUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YWl0aW5nUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9O1xuICAgICAgY2hlY2soKTtcbiAgICB9KTtcbiAgfVxuICBfX3ByZXByb2Nlc3MoKSB7XG4gICAgY29uc3QgY29udmVydFR5cGVUb051bWJlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZUludChvcHRpb24pKSA/IDAgOiBwYXJzZUludChvcHRpb24pO1xuICAgIH07XG4gICAgY29uc3QgY29udmVydFR5cGVUb0Zsb2F0ID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlRmxvYXQob3B0aW9uKSkgPyAyMC4wIDogcGFyc2VGbG9hdChvcHRpb24pO1xuICAgIH07XG4gICAgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgpO1xuICAgIHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkID0gY29udmVydFR5cGVUb0Zsb2F0KHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkKTtcbiAgfVxuICBfX3dpbmRvd0V2ZW50QmluZCgpIHtcbiAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgIGlmICgvaXBob25lfGlwb2R8aXBhZC8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgY29uc3Qgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSA9IGV2ID0+IHtcbiAgICAgICAgaWYgKGV2LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXYuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzXy5fX3BhZ2VFbmQgPSB0cnVlO1xuICAgICAgX3RoaXNfLmNsZWFudXAoKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghISFfdGhpc18uX19vY3JUeXBlKSByZXR1cm47XG4gICAgICBpZiAoIV90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSkge1xuICAgICAgICBfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSB0cnVlO1xuICAgICAgICBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIgPSBudWxsO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIF90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBfdGhpc18ucmVzdGFydE9DUihfdGhpc18uX19vY3JUeXBlLCBfdGhpc18uX19vblN1Y2Nlc3MsIF90aGlzXy5fX29uRmFpbHVyZSwgX3RoaXNfLl9fb25JblByb2dyZXNzQ2hhbmdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISEhX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyKSB7XG4gICAgICAgIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoaGFuZGxlUmVzaXplLCBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplRGVsYXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fZGVidWcobXNnKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZURlYnVnQWxlcnQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBfX3NsZWVwKG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICB9XG4gIF9fYmxvYlRvQmFzZTY0KGJsb2IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF8pID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgIH0pO1xuICB9XG4gIF9fYmFzZTY0dG9CbG9iKGJhc2U2NCkge1xuICAgIC8vIGNvbnZlcnQgYmFzZTY0IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgLy8gZG9lc24ndCBoYW5kbGUgVVJMRW5jb2RlZCBEYXRhVVJJcyAtIHNlZSBTTyBhbnN3ZXIgIzY4NTAyNzYgZm9yIGNvZGUgdGhhdCBkb2VzIHRoaXNcbiAgICBjb25zdCBieXRlU3RyaW5nID0gYXRvYihiYXNlNjQuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgY29uc3QgbWltZVN0cmluZyA9IGJhc2U2NC5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgY29uc3QgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgIGNvbnN0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmxvYihbYWJdLCB7XG4gICAgICB0eXBlOiBtaW1lU3RyaW5nXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19jb21wcmVzZUJhc2U2NEltYWdlKGJhc2U2NCwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIpIHtcbiAgICBpZiAoYmFzZTY0ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBibG9iRmlsZSA9IHRoaXMuX19iYXNlNjR0b0Jsb2IoYmFzZTY0KTtcbiAgICBjb25zdCBjb21wcmVzc2VkID0gYXdhaXQgSW1hZ2VVdGlsLmNvbXByZXNzSW1hZ2UoYmxvYkZpbGUsIG9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICBjb25zdCBjb21wcmVzc2lvblJhdGlvID0gTWF0aC5yb3VuZCgoMSAtIGNvbXByZXNzZWQuc2l6ZSAvIGJsb2JGaWxlLnNpemUpICogMTAwMDApIC8gMTAwO1xuICAgIHZvaWQgMDtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fX2Jsb2JUb0Jhc2U2NChjb21wcmVzc2VkKTtcbiAgfVxuXG4gIC8qKiDrnbzsnbTshLzsiqQg7YKk66W8IGhlYXAg7JeQIGFsbG9jYXRpb24gKi9cbiAgX19nZXRTdHJpbmdPbldhc21IZWFwKCkge1xuICAgIGlmICghISF0aGlzLl9fbGljZW5zZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIEtleSBpcyBlbXB0eScpO1xuICAgIH1cbiAgICBjb25zdCBsZW5ndGhCeXRlcyA9IHRoaXMuX19PQ1JFbmdpbmUubGVuZ3RoQnl0ZXNVVEY4KHRoaXMuX19saWNlbnNlKSArIDE7XG4gICAgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MobGVuZ3RoQnl0ZXMpO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUuc3RyaW5nVG9VVEY4KHRoaXMuX19saWNlbnNlLCB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCwgbGVuZ3RoQnl0ZXMpO1xuICAgIHJldHVybiB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcDtcbiAgfVxuICBfX2VuY3J5cHRTY2FuUmVzdWx0KG9jclJlc3VsdCkge1xuICAgIGxldCBzdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBvY3JSZXN1bHQgPT09ICdudW1iZXInKSBvY3JSZXN1bHQgPSBvY3JSZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgIGlmIChvY3JSZXN1bHQgPT09ICcnKSByZXR1cm4gJyc7XG4gICAgICBpZiAodHlwZW9mIG9jclJlc3VsdCAhPT0gJ3N0cmluZycgJiYgISEhb2NyUmVzdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb2NyUmVzdWx0IGlzIGVtcHR5Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gb2NyUmVzdWx0O1xuICAgICAgY29uc3QgbGVuZ3RoQnl0ZXMgPSB0aGlzLl9fT0NSRW5naW5lLmxlbmd0aEJ5dGVzVVRGOChqc29uU3RyaW5nKSArIDE7XG4gICAgICBzdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKGxlbmd0aEJ5dGVzKTtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuc3RyaW5nVG9VVEY4KGpzb25TdHJpbmcsIHN0cmluZ09uV2FzbUhlYXAsIGxlbmd0aEJ5dGVzKTtcbiAgICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRSZXN1bHQoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChzdHJpbmdPbldhc21IZWFwKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgIHN0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBfX3NldFZpZGVvUmVzb2x1dGlvbih2aWRlb0VsZW1lbnQpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgbGV0IHJlc29sdXRpb25UZXh0ID0gJ25vdCByZWFkeSc7XG4gICAgaWYgKCF0aGlzLl9fY2FtU2V0Q29tcGxldGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgICAgcmVzb2x1dGlvblRleHRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDApIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXNvbHV0aW9uVGV4dCA9IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoICsgJ3gnICsgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTA4MCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDE5MjAgfHwgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDE5MjAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxMDgwKSB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDEyODAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSA3MjAgfHwgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDcyMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDEyODApIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZGVvRWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX192aWRlb1dpZHRoID0gdmlkZW9FbGVtZW50LnZpZGVvV2lkdGg7XG4gICAgdGhpcy5fX3ZpZGVvSGVpZ2h0ID0gdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgIHJldHVybiB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICByZXNvbHV0aW9uVGV4dFxuICAgIH07XG4gIH1cbiAgX19nZXRTY2FubmVyQWRkcmVzcyhvY3JUeXBlKSB7XG4gICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGFkZHJlc3MgPSAwO1xuICAgICAgbGV0IGRlc3Ryb3lDYWxsYmFjayA9IG51bGw7XG4gICAgICBjb25zdCBzdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX2dldFN0cmluZ09uV2FzbUhlYXAoKTtcbiAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAvLyBPQ1JcbiAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldElEQ2FyZFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95SURDYXJkU2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldFBhc3Nwb3J0U2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lQYXNzcG9ydFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0QWxpZW5TY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUFsaWVuU2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRDcmVkaXRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUNyZWRpdFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2FubmVyIGRvZXMgbm90IGV4aXN0cycpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZShzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgIGlmIChhZGRyZXNzID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPT09IHRoaXMuX19yZXRyeUNvdW50R2V0QWRkcmVzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgTGljZW5zZSBLZXknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fcmV0cnlDb3VudEdldEFkZHJlc3MrKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBbYWRkcmVzcywgZGVzdHJveUNhbGxiYWNrXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPIDogTGljZW5zZSBJc3N1ZeyduCDqsr3smrAg7JeQ65+sIOqwkuydhCDrsJvslYTshJwgZXJyb3Ig66Gc6re466W8IOywjeydhCDsiJgg7J6I6rKMIOyalOyyre2VhOyalCAo7J6E7IucIE7rsogg7J207IOBIGFkZHJlc3Prpbwg66q767Cb7Jy866m0IOqwleygnCDsl5Drn6wpXG4gICAgICB2b2lkIDA7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBfX2dldEJ1ZmZlcigpIHtcbiAgICBpZiAoIXRoaXMuX19CdWZmZXIpIHtcbiAgICAgIHRoaXMuX19CdWZmZXIgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2ModGhpcy5fX3Jlc29sdXRpb25XaWR0aCAqIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0ICogNCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fX3Jlc3VsdEJ1ZmZlcikge1xuICAgICAgdGhpcy5fX3Jlc3VsdEJ1ZmZlciA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyg0MDk2KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tJbmZvKSB7XG4gICAgICBpZiAoIXRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zikge1xuICAgICAgICB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MoNDA5Nik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbdGhpcy5fX0J1ZmZlciwgdGhpcy5fX3Jlc3VsdEJ1ZmZlciwgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmXTtcbiAgfVxuICBhc3luYyBfX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIG1hc2tNb2RlLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChpbWdUeXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5lbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UoYWRkcmVzcywgbWFza01vZGUsIGltZ01vZGUpO1xuICAgICAgfSBlbHNlIGlmIChpbWdUeXBlID09PSAnZmFjZScpIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5lbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UoYWRkcmVzcyk7XG4gICAgICB9XG4gICAgICBjb25zdCBqcGdTaXplID0gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNvZGVkSnBnU2l6ZSgpO1xuICAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jb2RlZEpwZ0J1ZmZlcigpO1xuICAgICAgY29uc3QgcmVzdWx0VmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguYnVmZmVyLCBqcGdQb2ludGVyLCBqcGdTaXplKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHJlc3VsdFZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXN1bHRdLCB7XG4gICAgICAgIHR5cGU6ICdpbWFnZS9qcGVnJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fX2Jsb2JUb0Jhc2U2NChibG9iKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lFbmNvZGVkSnBnKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZyZWUgYnVmZmVyICovXG4gIF9fZGVzdHJveUJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX0J1ZmZlcikge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fQnVmZmVyKTtcbiAgICAgIHRoaXMuX19CdWZmZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9fZGVzdHJveVJlc3VsdEJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKTtcbiAgfVxuICBfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19yZXN1bHRCdWZmZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX3Jlc3VsdEJ1ZmZlcik7XG4gICAgICB0aGlzLl9fcmVzdWx0QnVmZmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYpO1xuICAgICAgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogRnJlZSBQcmV2SW1hZ2UgYnVmZmVyICovXG4gIF9fZGVzdHJveVByZXZJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5fX1ByZXZJbWFnZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fUHJldkltYWdlKTtcbiAgICAgIHRoaXMuX19QcmV2SW1hZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBmcmVlIHN0cmluZyBoZWFwIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCkge1xuICAgIGlmICh0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIGZyZWUgc2Nhbm5lciBhZGRyZXNzICovXG4gIF9fZGVzdHJveVNjYW5uZXJBZGRyZXNzKCkge1xuICAgIGlmICh0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjaykge1xuICAgICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2soKTtcbiAgICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUodmlkZW9FbGVtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgcmVzb2x1dGlvblRleHRcbiAgICB9ID0gYXdhaXQgdGhpcy5fX3NldFZpZGVvUmVzb2x1dGlvbih2aWRlb0VsZW1lbnQpO1xuICAgIGlmICghaXNTdXBwb3J0ZWRSZXNvbHV0aW9uKSB7XG4gICAgICBpZiAocmVzb2x1dGlvblRleHQgIT09ICdub3QgcmVhZHknKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzU3VwcG9ydGVkUmVzb2x1dGlvbjtcbiAgfVxuICBfX2dldFJvdGF0aW9uRGVncmVlKCkge1xuICAgIHJldHVybiAodGhpcy5fX29wdGlvbnMucm90YXRpb25EZWdyZWUgJSAzNjAgKyAzNjApICUgMzYwO1xuICB9XG4gIF9fZ2V0TWlycm9yTW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnMubWlycm9yTW9kZTtcbiAgfVxuICBhc3luYyBfX2Nyb3BJbWFnZUZyb21WaWRlbygpIHtcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICBsZXQgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG5cbiAgICAvLyBzb3VyY2UgaW1hZ2UgKG9yIHZpZGVvKVxuICAgIC8vIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUk1xuICAgIC8vIOKUgyAgICAg4pSKIHN5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSD4pSI4pSI4pSI4pSIIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUkyDilIogICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgc3ggIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogc0hlaWdodCAgICAgICDilINcbiAgICAvLyDilIMgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICAgICAgICDilIMgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiBjYW52YXNcbiAgICAvLyDilIMgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyDilIogICAgICAgICAgICAgICDilIPilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJNcbiAgICAvLyDilIMgICAgIOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiCAgICAgICAgICAgICAgICAg4pSDICAgIOKUiiAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAgICAgICAgc1dpZHRoICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICDilIogZHkgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsgICAg4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg+KUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgZHggICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogZEhlaWdodCDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiCAgICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICAgICAgICBkV2lkdGggICAgICAgICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBkeCwgZHkpXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodClcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodClcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEL2RyYXdJbWFnZVxuXG4gICAgbGV0IGNhbGNDYW52YXMgPSBjYW52YXM7XG4gICAgbGV0IGNhbGNWaWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvSGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudFdpZHRoID0gdmlkZW8uY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9IHZpZGVvLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCA9IHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGg7XG4gICAgbGV0IGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0ID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNDcm9wSW1hZ2VTaXplV2lkdGgsIGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0XSA9IFtjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCwgY2FsY0Nyb3BJbWFnZVNpemVXaWR0aF07XG4gICAgICBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbY2FsY1Jlc29sdXRpb25faCwgY2FsY1Jlc29sdXRpb25fd107XG4gICAgICBjYWxjQ2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgICBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uID09PSAncG9ydHJhaXQnID8gJ2xhbmRzY2FwZScgOiAncG9ydHJhaXQnO1xuICAgIH1cbiAgICBsZXQgY2FsY01heFNXaWR0aCA9IDk5OTk5O1xuICAgIGxldCBjYWxjTWF4U0hlaWdodCA9IDk5OTk5O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDshLjroZwgVUkgLyDshLjroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTV2lkdGggPSBjYWxjVmlkZW9XaWR0aDtcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDshLjroZwgVUkgLyDqsIDroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAvIOqwgOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDqsIDroZwgVUkgLyDshLjroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTV2lkdGggPSBjYWxjVmlkZW9XaWR0aDtcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzeCwgc3k7XG4gICAgY29uc3QgcmF0aW8gPSBjYWxjVmlkZW9XaWR0aCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IHNXaWR0aCA9IE1hdGgubWluKE1hdGgucm91bmQoY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCAqIHJhdGlvKSwgY2FsY01heFNXaWR0aCk7XG4gICAgY29uc3Qgc0hlaWdodCA9IE1hdGgubWluKE1hdGgucm91bmQoY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQgKiByYXRpbyksIGNhbGNNYXhTSGVpZ2h0KTtcbiAgICBzeCA9IE1hdGgubWF4KE1hdGgucm91bmQoKGNhbGNWaWRlb0NsaWVudFdpZHRoIC0gY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCkgLyAyICogcmF0aW8pLCAwKTtcbiAgICBzeSA9IE1hdGgubWF4KE1hdGgucm91bmQoKGNhbGNWaWRlb0NsaWVudEhlaWdodCAtIGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0KSAvIDIgKiByYXRpbyksIDApO1xuICAgIGlmIChpc0FsaWVuQmFjaykge1xuICAgICAgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW2NhbGNSZXNvbHV0aW9uX2gsIGNhbGNSZXNvbHV0aW9uX3ddO1xuICAgIH1cbiAgICBjYWxjQ2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjYWxjUmVzb2x1dGlvbl93KTtcbiAgICBjYWxjQ2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgY29uc3QgY2FsY0NvbnRleHQgPSBjYWxjQ2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgfSk7XG4gICAgY2FsY0NvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgbGV0IGltZ0RhdGEsIGltZ0RhdGFVcmw7XG4gICAgaW1nRGF0YSA9IGNhbGNDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBpbWdEYXRhVXJsID0gY2FsY0NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgICBpZiAoaXNBbGllbkJhY2spIHtcbiAgICAgIFtpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgMjcwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCB0aGlzLl9fZ2V0Um90YXRpb25EZWdyZWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbaW1nRGF0YSwgaW1nRGF0YVVybF07XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIGRlZ3JlZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChkZWdyZWUgPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZShbaW1nRGF0YSwgaW1nRGF0YVVybF0pO1xuICAgICAgfVxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBpbWcuc3JjID0gaW1nRGF0YVVybDtcbiAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBjYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICAgICAgY29uc3QgdGVtcENvbnRleHQgPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRlbXBDYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBpZiAoWzkwLCAyNzBdLmluY2x1ZGVzKGRlZ3JlZSkpIHtcbiAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gaW1nLmhlaWdodDtcbiAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGltZy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChbMCwgMTgwXS5pbmNsdWRlcyhkZWdyZWUpKSB7XG4gICAgICAgICAgdGVtcENhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZ3JlZSA9PT0gOTApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZShpbWcuaGVpZ2h0LCAwKTtlbHNlIGlmIChkZWdyZWUgPT09IDE4MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKGltZy53aWR0aCwgaW1nLmhlaWdodCk7ZWxzZSBpZiAoZGVncmVlID09PSAyNzApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZSgwLCBpbWcud2lkdGgpO1xuICAgICAgICB0ZW1wQ29udGV4dC5yb3RhdGUoZGVncmVlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRlbXBDb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgICBjb25zdCBuZXdJbWFnZURhdGEgPSBbOTAsIDI3MF0uaW5jbHVkZXMoZGVncmVlKSA/IHRlbXBDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBpbWcuaGVpZ2h0LCBpbWcud2lkdGgpIDogdGVtcENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgIHJlc29sdmUoW25ld0ltYWdlRGF0YSwgdGVtcENhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKV0pO1xuICAgICAgICB0ZW1wQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIGJveFR5cGUgPSAwLCByZXRyeUltZyA9IG51bGwpIHtcbiAgICBpZiAoIWFkZHJlc3MgfHwgYWRkcmVzcyA8IDApIHtcbiAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbGV0IGltZ0RhdGE7XG4gICAgICBsZXQgaW1nRGF0YVVybCA9IG51bGw7XG4gICAgICBjb25zdCBbYnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGlmIChyZXRyeUltZyAhPT0gbnVsbCkge1xuICAgICAgICBpbWdEYXRhID0gcmV0cnlJbWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICB9XG4gICAgICBpZiAoISEhaW1nRGF0YSkge1xuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguc2V0KGltZ0RhdGEuZGF0YSwgYnVmZmVyKTtcbiAgICAgIGxldCBrb3IgPSBmYWxzZSxcbiAgICAgICAgYWxpZW4gPSBmYWxzZSxcbiAgICAgICAgcGFzc3BvcnQgPSBmYWxzZTtcbiAgICAgIHN3aXRjaCAodGhpcy5fX29jclR5cGUpIHtcbiAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgIGtvciA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBwYXNzcG9ydCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgYWxpZW4gPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgIC8vIG5vdGhpbmdcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgICB9XG4gICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgIGlmIChrb3IgfHwgcGFzc3BvcnQgfHwgYWxpZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5kZXRlY3RfaWRjYXJkX29wdChidWZmZXIsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCBhZGRyZXNzLCBrb3IsIGFsaWVuLCBwYXNzcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmRldGVjdF9pZGNhcmQoYnVmZmVyLCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgYWRkcmVzcywgYm94VHlwZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdpc0NhcmRib3hEZXRlY3RlZCByZXN1bHQgLT0tLS0tLScsIHJlc3VsdClcbiAgICAgIHJldHVybiBbISFyZXN1bHQsIGltZ0RhdGEsIGltZ0RhdGFVcmxdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnQ2FyZCBkZXRlY3Rpb24gZXJyb3IgOiAnICsgZTtcbiAgICAgIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ21lbW9yeScpKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgX19zdGFydFJlY29nbml0aW9uKGFkZHJlc3MsIG9jclR5cGUsIHNzYU1vZGUsIGlzU2V0SWdub3JlQ29tcGxldGUsIGltZ0RhdGEsIGltZ0RhdGFVcmwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGFkZHJlc3MgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChhZGRyZXNzID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJ2NoZWNrVmFsaWRhdGlvbiBGYWlsJztcbiAgICAgIH1cbiAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsO1xuICAgICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICAgIGNvbnN0IFssIHJlc3VsdEJ1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBjb25zdCByZWNvZ25pdGlvbiA9IGFzeW5jIGlzU2V0SWdub3JlQ29tcGxldGUgPT4ge1xuICAgICAgICBpZiAoaXNTZXRJZ25vcmVDb21wbGV0ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCAwLCBpbWdEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9jclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5JRENhcmQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhblBhc3Nwb3J0KGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkFsaWVuKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkFsaWVuQmFjayhhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkNyZWRpdChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkb2VzIG5vdCBleGlzdHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IOyLoOyaqey5tOuTnOuKlCDslYTsp4Ega2V5OnZhbHVlIO2Yle2DnOuhnCDrs4DtmZgg7JWI65CY7Ja0IOyeiOydjFxuICAgICAgICBpZiAob2NyVHlwZSA9PT0gJ2NyZWRpdCcpIHtcbiAgICAgICAgICBpZiAob2NyUmVzdWx0ID09PSBudWxsIHx8IG9jclJlc3VsdCA9PT0gJycgfHwgb2NyUmVzdWx0ID09PSAnZmFsc2UnIHx8IG9jclJlc3VsdFswXSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX2NzdlRvT2JqZWN0KG9jclJlc3VsdCk7XG4gICAgICAgIGlmIChvY3JSZXN1bHQ/LmNvbXBsZXRlICE9PSAndW5kZWZpbmVkJyAmJiBvY3JSZXN1bHQ/LmNvbXBsZXRlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNTZXRJZ25vcmVDb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50IDwgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgICAgLy8gZGV0ZWN0ZWRDYXJkUXVldWXsl5DshJwg7ZWc7J6l7J2EIOq6vOuCtOyEnCDqsLHsi6DtlZzri6QuXG4gICAgICAgICAgICAgIC8vIOyggOyepeuQmOyWtOyeiOuKlCDsnbTrr7jsp4DsnZgg7Iir7J6Q6rCAIHJldHJ5IOuztOuLpCDsnpHsnYDqsr3smrAg64yA67mE7ZWY7JesICXrpbwg7IKs7Jqp7ZWoXG4gICAgICAgICAgICAgIGNvbnN0IHF1ZXVlSWR4ID0gdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgJSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICBpbWdEYXRhID0gdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlW3F1ZXVlSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlY29nbml0aW9uKGlzU2V0SWdub3JlQ29tcGxldGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8g7IKs7KeEIO2VnOyepeycvOuhnCBPQ1Ig7Iuk7YyoIChwb3B1cCDrgrTrpqzqs6Agc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpIOyymOumrD9cbiAgICAgICAgICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7IC8vIO2MneyXheydtCDrgrTroKTqsIjrlYwg7LKY66as65CY7KeA66eMIOuvuOumrCDsspjrpqxcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVELCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIGVuZCBvZiBmdW5jdGlvbiByZWNvZ25pdGlvbigpXG5cbiAgICAgIGlmIChhd2FpdCByZWNvZ25pdGlvbihpc1NldElnbm9yZUNvbXBsZXRlKSkge1xuICAgICAgICBjb25zdCBpc0NyZWRpdENhcmQgPSBvY3JUeXBlID09PSAnY3JlZGl0JztcbiAgICAgICAgbGV0IG9jckltYWdlTW9kZTtcbiAgICAgICAgaWYgKGlzQ3JlZGl0Q2FyZCkge1xuICAgICAgICAgIG9jckltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLkNST1BQSU5HO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLnVzZUltYWdlV2FycGluZykge1xuICAgICAgICAgIG9jckltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLldBUlBJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2NySW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuTk9ORTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3JpZ2luSW1hZ2UgPSBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5GQUxTRSwgb2NySW1hZ2VNb2RlKTtcbiAgICAgICAgbGV0IG1hc2tJbWFnZSA9IG51bGw7XG4gICAgICAgIGxldCBmYWNlSW1hZ2UgPSBudWxsO1xuICAgICAgICBpZiAoIWlzQ3JlZGl0Q2FyZCkge1xuICAgICAgICAgIG1hc2tJbWFnZSA9IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLlRSVUUsIHRoaXMuT0NSX0lNR19NT0RFLldBUlBJTkcpO1xuICAgICAgICAgIG1hc2tJbWFnZSA9IG1hc2tJbWFnZSA9PT0gJ2RhdGE6JyA/IG51bGwgOiBtYXNrSW1hZ2U7XG4gICAgICAgICAgZmFjZUltYWdlID0gdGhpcy5fX29wdGlvbnMudXNlRmFjZUltYWdlID8gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIG51bGwsIG9jckltYWdlTW9kZSwgJ2ZhY2UnKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNzYU1vZGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQSwgZmFsc2UsIG1hc2tJbWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgLy8gaWYgKCFpc0NyZWRpdENhcmQgJiYgdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpIHtcbiAgICAgICAgLy8gICBvcmlnaW5JbWFnZSA9IHRoaXMuX19nZXRQaWlFbmNyeXB0SW1hZ2VCYXNlNjQoXG4gICAgICAgIC8vICAgICBhZGRyZXNzLFxuICAgICAgICAvLyAgICAgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5GQUxTRSxcbiAgICAgICAgLy8gICAgIG9jckltYWdlTW9kZVxuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2VuY3J5cHQgYmFzZTY0IGltYWdlJywgeyBvcmlnaW5JbWFnZSB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBpZiAoZmFjZUltYWdlICYmIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRGYWNlKSB7XG4gICAgICAgIC8vICAgZmFjZUltYWdlID0gdGhpcy5fX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChcbiAgICAgICAgLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vICAgICBudWxsLFxuICAgICAgICAvLyAgICAgb2NySW1hZ2VNb2RlLFxuICAgICAgICAvLyAgICAgJ2ZhY2UnXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZW5jcnlwdCBiYXNlNjQgZmFjZSBpbWFnZScsIHsgZmFjZUltYWdlIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gICAgICAgIHJldHVybiBbb2NyUmVzdWx0LCBvcmlnaW5JbWFnZSwgbWFza0ltYWdlLCBmYWNlSW1hZ2VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgX19zdGFydFRydXRoKG9jclR5cGUsIGFkZHJlc3MpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgWywgcmVzdWx0QnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGlmIChvY3JUeXBlLmluZGV4T2YoJy1zc2EnKSA+IC0xKSB7XG4gICAgICAgIC8vIFRPRE86IHdvcmtlcuulvCDsgqzsmqntlZjsl6wg66mU7J24KFVJIOuenOuNlOungSkg7Iqk66CI65Oc6rCAIOupiOy2lOyngCDslYrrj4TroZ0g7LKY66asIO2VhOyalCAo7ZiE7J6sIGxvYWRpbmcgVUkg652E7Jqw66m0IOyVoOuLiOuplOydtOyFmCDrqYjstqQpXG4gICAgICAgIC8vIFRPRE86IHNldFRpbWVvdXQg7Jy866GcIOuCmOuIhOuNlOudvOuPhCDtmqjqs7wg7JeG7J2MIHNldFRpbWVvdXQg7KeA7Jqw6rOgLCB3b3JrZXLroZwg67OA6rK9IO2VhOyalFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuX19PQ1JFbmdpbmUuc2NhblRydXRoKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcikpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU1NBIE1vZGUgaXMgdHJ1ZS4gYnV0LCBvY3JUeXBlIGlzIGludmFsaWQgOiAnICsgb2NyVHlwZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fY3N2VG9PYmplY3Qoc3RyKSB7XG4gICAgbGV0IHBhaXJzID0gc3RyLnNwbGl0KCc7Jyk7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJzonKTtcbiAgICAgIGlmIChwYWlyLmxlbmd0aCA9PT0gMikgb2JqW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBfX2dldE1hc2tJbmZvKGFkZHJlc3MpIHtcbiAgICBpZiAoYWRkcmVzcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChhZGRyZXNzID09PSAtMSkge1xuICAgICAgcmV0dXJuICdjaGVja1ZhbGlkYXRpb24gRmFpbCc7XG4gICAgfVxuICAgIGNvbnN0IFssLCBtYXNrSW5mb1Jlc3VsdEJ1Zl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5nZXRNYXNrUmVjdChhZGRyZXNzLCBtYXNrSW5mb1Jlc3VsdEJ1Zik7XG4gICAgaWYgKHJlc3VsdCA9PSBudWxsIHx8IHJlc3VsdCA9PT0gJycpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyB0aGlzLl9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCk7XG5cbiAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsID8gbnVsbCA6IHRoaXMuX19jc3ZUb09iamVjdChyZXN1bHQpO1xuICB9XG4gIGFzeW5jIF9fc3RhcnRUcnV0aFJldHJ5KG9jclR5cGUsIGFkZHJlc3MsIGltZ0RhdGEpIHtcbiAgICBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgMCwgaW1nRGF0YSk7XG4gICAgLy8gYXdhaXQgdGhpcy5fX3N0YXJ0UmVjb2duaXRpb24oYWRkcmVzcywgb2NyVHlwZSwgdHJ1ZSk7ICAgICAgLy8gZm9yIOyEseuKpeydhCDsnITtlbQg7KeE7ZaJIFhcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGgob2NyVHlwZSwgYWRkcmVzcyk7XG4gIH1cbiAgX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCkge1xuICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICB0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gMey0iCBkZWxheSDtm4Qg7Iuk7ZaJXG4gICAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICB9LCB0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsKTtcbiAgfVxuICBhc3luYyBfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgICBjb25zdCBpc1Bhc3Nwb3J0ID0gdGhpcy5fX29jclR5cGUuaW5jbHVkZXMoJ3Bhc3Nwb3J0Jyk7XG4gICAgICBhd2FpdCB0aGlzLl9fc2V0dXBWaWRlbyhpc1Bhc3Nwb3J0KTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgaWYgKHZpZGVvKSB7XG4gICAgICAgIC8vIGNvbnN0IFt0cmFja10gPSB0aGlzLl9fc3RyZWFtLmdldFZpZGVvVHJhY2tzKCk7XG4gICAgICAgIC8vIGNvbnN0IGNhcGFiaWxpdHkgPSB0cmFjay5nZXRDYXBhYmlsaXRpZXMoKTtcbiAgICAgICAgLy8gY29uc29sZS5kZWJ1ZygnQ2FyZFNjYW5fX2luaXRpYWxpemUgY2FwYWJpbGl0eScsIGNhcGFiaWxpdHkpO1xuICAgICAgICBpZiAoJ3NyY09iamVjdCcgaW4gdmlkZW8pIHtcbiAgICAgICAgICB2aWRlby5zcmNPYmplY3QgPSB0aGlzLl9fc3RyZWFtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEF2b2lkIHVzaW5nIHRoaXMgaW4gbmV3IGJyb3dzZXJzLCBhcyBpdCBpcyBnb2luZyBhd2F5LlxuICAgICAgICAgIHZpZGVvLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuX19zdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgKCkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIC0gb25sb2FkZWRtZXRhZGF0YScpO1xuICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuXG4gICAgICAgICAgLy8gdmlkZW8gZWxlbWVudCBzdHlsZSDshKTsoJVcbiAgICAgICAgICB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9IHZpZGVvLnZpZGVvV2lkdGggLyB2aWRlby52aWRlb0hlaWdodCA8IDEgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdGhpcy5fX2NhbVNldENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fYWRqdXN0U3R5bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLlJFQURZKTtcbiAgICAgICAgdmlkZW8ud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RBbGxvd2VkRXJyb3InKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdDYW1lcmEgQWNjZXNzIFBlcm1pc3Npb24gaXMgbm90IGFsbG93ZWQnO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U0MDMnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChlLm5hbWUgPT09ICdOb3RSZWFkYWJsZUVycm9yJykge1xuICAgICAgICAvLyDri6Trpbjqs7Psl5DshJwg7Lm066mU6528IOyekOybkOydhCDsgqzsmqnspJFcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0IDwgMCkge1xuICAgICAgICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIO2an+yImOygnO2VnCDsl4bsnYxcbiAgICAgICAgICB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50ICs9IDE7XG4gICAgICAgICAgdGhpcy5fX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTsgLy8g7J6s6reAIO2YuOy2nFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0ID4gdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCArPSAxO1xuICAgICAgICAgICAgdGhpcy5fX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTsgLy8g7J6s6reAIO2YuOy2nFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIHBlcm1pc3Npb25zIHdlcmUgZ3JhbnRlZCwgYnV0IEZhaWxlZCB0byBhY3F1aXJlIENhbWVyYSByZXNvdXJjZXMuJztcbiAgICAgICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDAzJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgX19zZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgICBpZiAoZWwgJiYgc3R5bGUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgX19jaGFuZ2VPQ1JTdGF0dXModmFsKSB7XG4gICAgc3dpdGNoICh2YWwpIHtcbiAgICAgIC8vIE9DUlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLlJFQURZOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLlJFQURZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRDpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1M6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0E6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRDpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5ET05FO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19jaGFuZ2VTdGFnZSh2YWwsIGZvcmNlVXBkYXRlID0gZmFsc2UsIHJlY29nbml6ZWRJbWFnZSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5fX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPT09IHZhbCAmJiBmb3JjZVVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2NoYW5nZU9DUlN0YXR1cyh2YWwpO1xuICAgIHRoaXMuX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdmFsO1xuICAgIHRoaXMuX19pblByb2dyZXNzU3RlcCA9IHZhbDtcbiAgICBjb25zdCB7XG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgYm9yZGVyV2lkdGg6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGggKyAncHgnLFxuICAgICAgYm9yZGVyU3R5bGU6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUuc3R5bGUsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlckNvbG9yOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlW3ZhbF1cbiAgICB9O1xuICAgIGlmIChndWlkZUJveCkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCBzdHlsZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSkge1xuICAgICAgaWYgKCEhdGhpcy5fX29wdGlvbnMuc2hvd0NsaXBGcmFtZSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXNrQm94V3JhcD8ucXVlcnlTZWxlY3RvcignI21hc2tCb3hPdXRlcicpPy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZVt2YWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgY2FwdHVyZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcignI2NhcHR1cmVCdXR0b24nKT8uc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fX29wdGlvbnMuY2FwdHVyZUJ1dHRvblN0eWxlWydiYXNlX2NvbG9yJ10pO1xuICAgIH1cbiAgICBjb25zdCBvY3JNb2RlID0gdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID8gJ3NlcnZlcicgOiAnd2FzbSc7XG4gICAgaWYgKHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VUb3BVSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX190b3BVSSwgJ3RvcCcsIHRoaXMuX19vcHRpb25zLnVzZVRvcFVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fbWlkZGxlVUksICdtaWRkbGUnLCB0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJIHx8IHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX2JvdHRvbVVJLCAnYm90dG9tJywgdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTIHx8IHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpO1xuXG4gICAgICAgIC8vIEZBSUzsnbgg6rK97JqwIDXstIjtm4Qg7J6Q64+Z7J2EIOywveuLq+ydjFxuICAgICAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCkge1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5fX2hpZGVQcmV2aWV3VUksIDMwMDAsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0EpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9faGlkZVByZXZpZXdVSSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMSk7IC8vIGZvciBVSSB1cGRhdGVcbiAgfVxuXG4gIF9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVjb2duaXplZEltYWdlO1xuICAgIGNvbnN0IGltZ1N0eWxlID0ge1xuICAgICAgJ21heC13aWR0aCc6ICc3MCUnLFxuICAgICAgJ21heC1oZWlnaHQnOiAnNjAlJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdJbWFnZSwgaW1nU3R5bGUpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCB7XG4gICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICB9KTtcbiAgfVxuICBfX2hpZGVQcmV2aWV3VUkoY29udGV4dCkge1xuICAgIGxldCBfdGhpc18gPSB0aGlzO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBfdGhpc18gPSBjb250ZXh0O1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBfdGhpc18uX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0pO1xuICAgIF90aGlzXy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSAnJztcbiAgfVxuICBhc3luYyBfX2dldElucHV0RGV2aWNlcygpIHtcbiAgICAvLyB0aHJvdyBlcnJvciBpZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICBsZXQgY2FtZXJhID0gW107XG4gICAgZm9yIChjb25zdCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgaWYgKGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoZGV2aWNlIGluc3RhbmNlb2YgSW5wdXREZXZpY2VJbmZvKSB7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmdldENhcGFiaWxpdGllcykge1xuICAgICAgICAgICAgICBjb25zdCBjYXAgPSBkZXZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgICAgICAgIGlmIChjYXA/LmZhY2luZ01vZGU/LmluY2x1ZGVzKHRoaXMuX19mYWNpbmdNb2RlQ29uc3RyYWludCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1VsdHJhQ2FtZXJhUmVnID0gL3VsdHJhfOyauO2KuOudvC9naTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbHRyYUNhbWVyYVJlZy50ZXN0KGRldmljZS5sYWJlbD8udG9Mb3dlckNhc2UoKSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhbWVyYS5wdXNoKGNhcC5kZXZpY2VJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpT1MgMTcg66+466eM7J2YIGNocm9tZSwgc2FmYXJpIOyXkOyEnOuKlFxuICAgICAgICAgIC8vIElucHV0RGV2aWNlSW5mbyDqsJ3ssrTqsIAg7JeG7Ja07IScIGdldENhcGFiaWxpdGllc+ulvCDtmZXsnbjtlaAg7IiYIOyXhuq4sCDrlYzrrLjsl5BcbiAgICAgICAgICAvLyBkZXZpY2UgbGFiZWzrp4wg67O06rOgIO2bhOuptCDsubTrqZTrnbzroZwg7IKs7JqpXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgaXNCYWNrQ2FtZXJhUmVnID0gL2JhY2t87ZuE66m0L2c7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmxhYmVsPy5sZW5ndGggJiYgaXNCYWNrQ2FtZXJhUmVnLnRlc3QoZGV2aWNlLmxhYmVsKSkge1xuICAgICAgICAgICAgICBjYW1lcmEucHVzaChkZXZpY2UuZGV2aWNlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fZGVidWcoYGNhbWVyYSA9ICR7Y2FtZXJhfSwgY2FtZXJhLmxlbmd0aCA9ICR7Y2FtZXJhLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG4gIGNoZWNrVUlPcmllbnRhdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGV0ZWN0b3IuZ2V0VUlPcmllbnRhdGlvbihkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm9jcik7XG4gICAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50ICE9PSB0aGlzLl9fcHJldlVpT3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX191aU9yaWVudGF0aW9uID0gY3VycmVudDtcbiAgICAgIHRoaXMuX19wcmV2VWlPcmllbnRhdGlvbiA9IGN1cnJlbnQ7XG4gICAgICBpc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudCxcbiAgICAgIGlzQ2hhbmdlZFxuICAgIH07XG4gIH1cbiAgX19jbGVhckN1c3RvbVVJKG9iaikge1xuICAgIG9iai5pbm5lckhUTUwgPSAnJztcbiAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKG9iaiwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19zZXR1cERvbUVsZW1lbnRzKCkge1xuICAgIGxldCB7XG4gICAgICBvY3IsXG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveFdyYXAsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLFxuICAgICAgY3VzdG9tVUlXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b24sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld1VJLFxuICAgICAgcHJldmlld0ltYWdlLFxuICAgICAgc3dpdGNoVUlXcmFwLFxuICAgICAgc3dpdGNoVUksXG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLFxuICAgICAgcHJlbG9hZGluZ1VJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKCFvY3IpIHRocm93IG5ldyBFcnJvcignb2NyIGRpdiBlbGVtZW50IGlzIG5vdCBleGlzdCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHZpZGVvV3JhcC5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3hXcmFwKSBndWlkZUJveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHZpZGVvKSB2aWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY2FudmFzKSBjYW52YXMucmVtb3ZlKCk7XG4gICAgaWYgKHJvdGF0aW9uQ2FudmFzKSByb3RhdGlvbkNhbnZhcy5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3gpIGd1aWRlQm94LnJlbW92ZSgpO1xuICAgIGlmIChtYXNrQm94V3JhcCkgbWFza0JveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKSBwcmV2ZW50VG9GcmVlemVWaWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY3VzdG9tVUlXcmFwKSBjdXN0b21VSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8g6rCBIHRvcCwgbWlkZGxlLCBib3R0b20gVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmICh0b3BVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHRvcFVJKTtcbiAgICBpZiAobWlkZGxlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShtaWRkbGVVSSk7XG4gICAgaWYgKGJvdHRvbVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoYm90dG9tVUkpO1xuICAgIGlmIChjYXB0dXJlVUlXcmFwKSBjYXB0dXJlVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIGNhcHR1cmUgVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChjYXB0dXJlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoY2FwdHVyZVVJKTtcbiAgICBpZiAocHJldmlld1VJV3JhcCkgcHJldmlld1VJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBwcmV2aWV3IFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAocHJldmlld1VJICYmICF0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHByZXZpZXdVSSk7XG4gICAgaWYgKHN3aXRjaFVJV3JhcCkgc3dpdGNoVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIHN3aXRjaCBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHN3aXRjaFVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHRoaXMuX19jbGVhckN1c3RvbVVJKHN3aXRjaFVJKTtcbiAgICBpZiAocHJlbG9hZGluZ1VJV3JhcCkgcHJlbG9hZGluZ1VJV3JhcC5yZW1vdmUoKTtcbiAgICBjb25zdCByb3RhdGlvbkRlZ3JlZSA9IHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpO1xuICAgIHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID0gWzkwLCAyNzBdLmluY2x1ZGVzKHJvdGF0aW9uRGVncmVlKTtcbiAgICBsZXQgb2NyU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIG9jclN0eWxlKTtcbiAgICBjb25zdCB3cmFwU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIC8vIHZlcnRpY2FsIGFsaWduIG1pZGRsZVxuICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgfTtcbiAgICB2aWRlb1dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2aWRlb1dyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvV3JhcCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHtcbiAgICAgIHdoaWxlICh2aWRlb1dyYXAuZmlyc3RDaGlsZCkge1xuICAgICAgICB2aWRlb1dyYXAucmVtb3ZlQ2hpbGQodmlkZW9XcmFwLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW9XcmFwLCB3cmFwU3R5bGUpO1xuICAgIH1cbiAgICBvY3IuYXBwZW5kQ2hpbGQodmlkZW9XcmFwKTtcbiAgICBtYXNrQm94V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdtYXNrQm94V3JhcCcpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShtYXNrQm94V3JhcCwgd3JhcFN0eWxlKTtcbiAgICBsZXQgbWFza19mcmFtZSA9IHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlLmJhc2VfY29sb3IgKyAnZmYnO1xuICAgIGlmICghIXRoaXMuX19vcHRpb25zLnNob3dDbGlwRnJhbWUpIHtcbiAgICAgIG1hc2tfZnJhbWUgPSB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZS5jbGlwX2ZyYW1lICsgJzU1JztcbiAgICB9XG4gICAgbWFza0JveFdyYXAuaW5uZXJIVE1MID0gJycgKyBcIiAgPHN2ZyBpZD0nbWFza0JveENvbnRhaW5lcicgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cXG5cIiArIFwiICAgIDxtYXNrIGlkPSdtYXNrLXJlY3QnPlxcblwiICsgXCIgICAgICA8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxcblwiICsgXCIgICAgICA8c3ZnIHg9JzUwJScgeT0nNTAlJyBvdmVyZmxvdz0ndmlzaWJsZSc+XFxuXCIgKyBcIiAgICAgICAgICA8cmVjdCBpZD0nbWFza0JveElubmVyJ1xcblwiICsgXCIgICAgICAgICAgICB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI2MCdcXG5cIiArIFwiICAgICAgICAgICAgeD0nLTIwMCcgeT0nLTEzMCdcXG5cIiArIFwiICAgICAgICAgICAgcng9JzEwJyByeT0nMTAnXFxuXCIgKyBcIiAgICAgICAgICAgIGZpbGw9J2JsYWNrJyBzdHJva2U9J2JsYWNrJz48L3JlY3Q+XFxuXCIgKyAnICAgICAgPC9zdmc+XFxuJyArICcgICAgPC9tYXNrPlxcbicgKyBcIiAgICA8cmVjdCBpZD0nbWFza0JveE91dGVyJ1xcblwiICsgXCIgICAgICAgICAgeD0nMCcgeT0nMCcgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJSdcXG5cIiArIFwiICAgICAgICAgIGZpbGw9J1wiICsgbWFza19mcmFtZSArIFwiJyBtYXNrPSd1cmwoI21hc2stcmVjdCknPjwvcmVjdD5cXG5cIiArICcgIDwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKG1hc2tCb3hXcmFwKTtcbiAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdtdXRlZCcsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgbGV0IHZpZGVvU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICB9O1xuICAgIGNvbnN0IHJvdGF0ZUNzcyA9ICdyb3RhdGUoJyArIHJvdGF0aW9uRGVncmVlICsgJ2RlZyknO1xuICAgIGNvbnN0IG1pcnJvckNzcyA9ICdyb3RhdGVZKDE4MGRlZyknO1xuICAgIGNvbnN0IHJvdGF0ZUFuZE1pcnJvckNzcyA9IG1pcnJvckNzcyArICcgJyArIHJvdGF0ZUNzcztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIGlmICh0aGlzLl9fZ2V0TWlycm9yTW9kZSgpKSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVBbmRNaXJyb3JDc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVDc3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX19nZXRNaXJyb3JNb2RlKCkpIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IG1pcnJvckNzc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHZpZGVvU3R5bGUpO1xuICAgIHZpZGVvV3JhcC5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgZ3VpZGVCb3hXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3VpZGVCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdndWlkZUJveFdyYXAnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3hXcmFwLCB3cmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChndWlkZUJveFdyYXApO1xuICAgIGd1aWRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2d1aWRlQm94Jyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSk7XG4gICAgZ3VpZGVCb3hXcmFwLmFwcGVuZENoaWxkKGd1aWRlQm94KTtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdub25lJyA6ICdkaXNwbGF5JyA6ICdub25lJyxcbiAgICAgIHdpZHRoOiAnMjUlJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgbGVmdDogJzBweCcsXG4gICAgICB0b3A6ICczMHB4JyxcbiAgICAgIGJvcmRlcjogJ2dyZWVuIDJweCBzb2xpZCdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYW52YXMsIGNhbnZhc1N0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICByb3RhdGlvbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHJvdGF0aW9uQ2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdyb3RhdGlvbkNhbnZhcycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShyb3RhdGlvbkNhbnZhcywge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdkaXNwbGF5JyA6ICdub25lJyA6ICdub25lJyxcbiAgICAgIGhlaWdodDogJzI1JScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgIHRvcDogJzMwcHgnLFxuICAgICAgYm9yZGVyOiAnYmx1ZSAycHggc29saWQnXG4gICAgfSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKHJvdGF0aW9uQ2FudmFzKTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2ZW50VG9GcmVlemVWaWRlbycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2ZW50VG9GcmVlemVWaWRlbywge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206ICcxMCcsXG4gICAgICByaWdodDogJzEwJ1xuICAgIH0pO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLmlubmVySFRNTCA9ICcnICsgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKTtcbiAgICBjdXN0b21VSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjdXN0b21VSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2N1c3RvbVVJV3JhcCcpO1xuICAgIGNvbnN0IGN1c3RvbVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjdXN0b21VSVdyYXAsIGN1c3RvbVVJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY3VzdG9tVUlXcmFwKTtcblxuICAgIC8vIOqwgSB0b3AsIG1pZGRsZSwgYm90dG9tIFVJIOyCrOyaqSh1c2Up7Jes67aA7JmAIOq0gOqzhOyXhuydtCDsmIHsl63snYQg7J6h6riwIOychO2VtCwgZGl26rCAIOyXhuycvOuptCDsg53shLFcbiAgICAvLyBhZGp1c3RTdHlsZSgpIOyXkOyEnCDshLjrtoDsoIHsnbgg7IKs7J207KaI7JmAIOychOy5mOqwkiDrj5nsoIHsnLzroZwg7ISk7KCV65CoLlxuICAgIGlmICghdG9wVUkpIHtcbiAgICAgIHRvcFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndG9wVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKHRvcFVJKTtcbiAgICBpZiAoIW1pZGRsZVVJKSB7XG4gICAgICBtaWRkbGVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbWlkZGxlVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ21pZGRsZVVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZChtaWRkbGVVSSk7XG4gICAgaWYgKCFib3R0b21VSSkge1xuICAgICAgYm90dG9tVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJvdHRvbVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdib3R0b21VSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQoYm90dG9tVUkpO1xuICAgIGNhcHR1cmVVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjYXB0dXJlVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlVUlXcmFwJyk7XG4gICAgY29uc3QgY2FwdHVyZVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NlbnRlcidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCBjYXB0dXJlVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjYXB0dXJlVUlXcmFwKTtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICBpZiAodGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUZvcmNlQ29tcGxldGVVSSkge1xuICAgICAgICBpZiAoIWNhcHR1cmVVSSkge1xuICAgICAgICAgIGNhcHR1cmVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNhcHR1cmVVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZVVJJyk7XG4gICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhcHR1cmVCdXR0b24pIHtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZUJ1dHRvbicpO1xuICAgICAgICAgIGxldCBjYXB0dXJlQnV0dG9uU3JjU1ZHID0gYGA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPHN2ZyB3aWR0aD0nODAnIGhlaWdodD0nODAnIHZpZXdCb3g9JzAgMCA4MCA4MCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYCAgPGNpcmNsZSBpZD0nY2FwdHVyZUJ1dHRvbicgY3g9JzQwJyBjeT0nNDAnIHI9JzM4JyBmaWxsPScjNTU1NTU1JyBzdHJva2U9JyNmZmZmZmYnIHN0cm9rZS13aWR0aD0nNCcvPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPC9zdmc+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uLmlubmVySFRNTCA9IGNhcHR1cmVCdXR0b25TcmNTVkc7XG4gICAgICAgICAgY2FwdHVyZVVJLmFwcGVuZENoaWxkKGNhcHR1cmVCdXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmVVSVdyYXAuYXBwZW5kQ2hpbGQoY2FwdHVyZVVJKTtcbiAgICAgICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICAgICAgY29uc3QgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjYXB0dXJlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgIHByZXZpZXdVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZXZpZXdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdVSVdyYXAnKTtcbiAgICAgIGNvbnN0IHByZXZpZXdVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwMDAwYWEnXG4gICAgICB9O1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHByZXZpZXdVSVdyYXBTdHlsZSk7XG4gICAgICBvY3IuYXBwZW5kQ2hpbGQocHJldmlld1VJV3JhcCk7XG4gICAgICBpZiAoIXByZXZpZXdVSSkge1xuICAgICAgICBwcmV2aWV3VUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJldmlld1VJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3VUknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUksIHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICAnbWF4LXdpZHRoJzogJzkwJScsXG4gICAgICAgICdtYXgtaGVpZ2h0JzogJzkwJSdcbiAgICAgIH0pO1xuICAgICAgcHJldmlld1VJV3JhcC5hcHBlbmRDaGlsZChwcmV2aWV3VUkpO1xuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2UpIHtcbiAgICAgICAgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld0ltYWdlJyk7XG4gICAgICAgIHByZXZpZXdVSS5hcHBlbmRDaGlsZChwcmV2aWV3SW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICBzd2l0Y2hVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHN3aXRjaFVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUlXcmFwJyk7XG4gICAgICBjb25zdCBzd2l0Y2hVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICcnLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSVdyYXAsIHN3aXRjaFVJV3JhcFN0eWxlKTtcbiAgICAgIG9jci5hcHBlbmRDaGlsZChzd2l0Y2hVSVdyYXApO1xuICAgICAgaWYgKCFzd2l0Y2hVSSkge1xuICAgICAgICBzd2l0Y2hVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzd2l0Y2hVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUknKTtcbiAgICAgICAgbGV0IHN3aXRjaEhUTUwgPSBgYDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPGRpdiBjbGFzcz0nY3VzdG9tLS1sYWJlbCBmbGV4IGp1c3RpZnktY2VudGVyIGFsaWduLWNlbnRlciBnYXAxMCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94Jz5XQVNNPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBjbGFzcz0nc3dpdGNoJz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgICAgPGlucHV0IGlkPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICAgIDxzcGFuIGNsYXNzPSdzbGlkZXIgcm91bmQnPjwvc3Bhbj5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdwcmlvcml0eS1maW5hbmNlLWNvaHRtbEZvcmxpc3QtY2hlY2tib3gnPlNlcnZlcjwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPC9kaXY+YDtcbiAgICAgICAgc3dpdGNoVUkuaW5uZXJIVE1MID0gc3dpdGNoSFRNTDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSSwge1xuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH0pO1xuICAgICAgc3dpdGNoVUlXcmFwLmFwcGVuZENoaWxkKHN3aXRjaFVJKTtcbiAgICAgIGNvbnN0IHN3aXRjaENoZWNrYm94ID0gc3dpdGNoVUkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF07XG4gICAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgICAgY29uc3QgX19vbkNsaWNrU3dpdGNoVUkgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgYXdhaXQgX3RoaXNfLnJlc3RhcnRPQ1IoX3RoaXNfLl9fb2NyVHlwZSwgX3RoaXNfLl9fb25TdWNjZXNzLCBfdGhpc18uX19vbkZhaWx1cmUsIF90aGlzXy5fX29uSW5Qcm9ncmVzc0NoYW5nZSwgdHJ1ZSk7XG4gICAgICB9O1xuICAgICAgc3dpdGNoQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tTd2l0Y2hVSSwge1xuICAgICAgICBvbmNlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgcHJlbG9hZGluZ1VJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSVdyYXAnKTtcbiAgICBjb25zdCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAwMDBmZidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUlXcmFwLCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUlXcmFwKTtcbiAgICBpZiAoIXByZWxvYWRpbmdVSSkge1xuICAgICAgcHJlbG9hZGluZ1VJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcmVsb2FkaW5nVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSScpO1xuICAgICAgcHJlbG9hZGluZ1VJLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGV4dC1pbmZvJyk7XG4gICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MID0gJycgKyAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZyA9PT0gJycgfHwgdGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZykge1xuICAgICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MICs9IHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2c7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUksIHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfSk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUkpO1xuXG4gICAgLy8gbG9hZGluZyBVSSDsnITsuZgg7J6Q66as7J6h6rKMIO2VmOq4sCDsnITtlbRcbiAgICBhd2FpdCB0aGlzLl9faW5pdFN0eWxlKCk7XG5cbiAgICAvLyDtmZTrqbTqs7zrj4Qg7ZiE7IOBIO2VtOqysFxuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIHtcbiAgICAgIGRpc3BsYXk6ICcnXG4gICAgfSk7XG4gICAgdGhpcy5fX29jciA9IG9jcjtcbiAgICB0aGlzLl9fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuX19yb3RhdGlvbkNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgIHRoaXMuX192aWRlbyA9IHZpZGVvO1xuICAgIHRoaXMuX192aWRlb1dyYXAgPSB2aWRlb1dyYXA7XG4gICAgdGhpcy5fX2d1aWRlQm94ID0gZ3VpZGVCb3g7XG4gICAgdGhpcy5fX2d1aWRlQm94V3JhcCA9IGd1aWRlQm94V3JhcDtcbiAgICB0aGlzLl9fbWFza0JveFdyYXAgPSBtYXNrQm94V3JhcDtcbiAgICB0aGlzLl9fcHJldmVudFRvRnJlZXplVmlkZW8gPSBwcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgICB0aGlzLl9fY3VzdG9tVUlXcmFwID0gY3VzdG9tVUlXcmFwO1xuICAgIHRoaXMuX190b3BVSSA9IHRvcFVJO1xuICAgIHRoaXMuX19taWRkbGVVSSA9IG1pZGRsZVVJO1xuICAgIHRoaXMuX19ib3R0b21VSSA9IGJvdHRvbVVJO1xuICAgIHRoaXMuX19jYXB0dXJlVUlXcmFwID0gY2FwdHVyZVVJV3JhcDtcbiAgICB0aGlzLl9fY2FwdHVyZVVJID0gY2FwdHVyZVVJO1xuICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uID0gY2FwdHVyZUJ1dHRvbjtcbiAgICB0aGlzLl9fcHJldmlld1VJV3JhcCA9IHByZXZpZXdVSVdyYXA7XG4gICAgdGhpcy5fX3ByZXZpZXdVSSA9IHByZXZpZXdVSTtcbiAgICB0aGlzLl9fcHJldmlld0ltYWdlID0gcHJldmlld0ltYWdlO1xuICAgIHRoaXMuX19zd2l0Y2hVSVdyYXAgPSBzd2l0Y2hVSVdyYXA7XG4gICAgdGhpcy5fX3N3aXRjaFVJID0gc3dpdGNoVUk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9jcixcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgdmlkZW8sXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveCxcbiAgICAgIGd1aWRlQm94V3JhcCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgcHJldmVudFRvRnJlZXplVmlkZW8sXG4gICAgICBjdXN0b21VSVdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvbixcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3VUksXG4gICAgICBwcmV2aWV3SW1hZ2UsXG4gICAgICBzd2l0Y2hVSVdyYXAsXG4gICAgICBzd2l0Y2hVSVxuICAgIH07XG4gIH1cbiAgX19ibHVyQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgZGlzcGxheTogJydcbiAgICB9KTtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhcHR1cmVCdXR0b24pIHtcbiAgICAgIGNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIF9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcmV0dXJuIGNhcHR1cmVCdXR0b24gPyBjYXB0dXJlQnV0dG9uLmdldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcpID09PSAndHJ1ZScgOiBmYWxzZTtcbiAgfVxuICBhc3luYyBfX3NldHVwVmlkZW8oaXNQYXNzcG9ydCkge1xuICAgIC8vIHdhc20g7J247Iud7ISx64qlIOy1nOygge2ZlOuQnCDtlbTsg4Hrj4RcbiAgICB0aGlzLl9fcmVzb2x1dGlvbldpZHRoID0gMTA4MDtcbiAgICB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCA9IDcyMDtcbiAgICB0aGlzLl9fY2FtU2V0Q29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgbGV0IGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAvLyBjb25zb2xlLmxvZygndmlkZW9EZXZpY2VzIDo6ICcsIGNhbWVyYSlcblxuICAgIHRoaXMuY2hlY2tVSU9yaWVudGF0aW9uKCk7XG4gICAgbGV0IGNvbnN0cmFpbnRXaWR0aCwgY29uc3RyYWludEhlaWdodDtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhID09PSAnaGlnaFF1YWxpdHknKSB7XG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2ZlOyniCDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDqsIDriqXtlZzqsr3smrAg7IKs7JqpIOyVhOuLiOuptCAxMjgweDcyMCDsgqzsmqlcbiAgICAgIGNvbnN0cmFpbnRXaWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDE5MjAsXG4gICAgICAgIG1pbjogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiAxMDgwLFxuICAgICAgICBtaW46IDcyMFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gJ2NvbXBhdGliaWxpdHknXG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2YuO2ZmOyEsSDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDsgqzsmqkg6rCA64ql7ZWY642U652864+EIDEyODB4NzIw7J2EIOyCrOyaqe2VmOuPhOuhnSDqs6DsoJVcbiAgICAgIC8vIOyCrOycoCA6IOqwpOufreyLnCBlbnRyeSDrqqjrjbgoQeyLnOumrOymiCAvIFdpZGUg66qo6424IOuTsSnsl5DshJwgMTkyMCB4IDEwODAg7LKY66as7IucIOu5hOycqOydtCDsnbTsg4HtlbTsp5Ao7ZmA7K2J7J2065CoKVxuICAgICAgLy8g7ZWt7IOBIDEyODAgeCA3MjDsnYQg7IKs7Jqp7ZWY64+E66GdIOuzgOqyvVxuICAgICAgY29uc3RyYWludFdpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbnN0cmFpbnRzID0ge1xuICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgdmlkZW86IHtcbiAgICAgICAgem9vbToge1xuICAgICAgICAgIGlkZWFsOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGZhY2luZ01vZGU6IHtcbiAgICAgICAgICBpZGVhbDogdGhpcy5fX2ZhY2luZ01vZGVDb25zdHJhaW50XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgd2hpdGVCYWxhbmNlTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlSWQ6IGNhbWVyYS5sZW5ndGggPyB7XG4gICAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgICAgfSA6IG51bGwsXG4gICAgICAgIHdpZHRoOiBjb25zdHJhaW50V2lkdGgsXG4gICAgICAgIGhlaWdodDogY29uc3RyYWludEhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDstZzstIgg7KeE7J6FIOydtOyWtOyEnCB2aWRlb0RlaXZjZSDrpqzsiqTtirjrpbwg6rCA7KC47JisIOyImCDsl4bsnLzrqbQsXG4gICAgLy8gZ2V0VXNlck1lZGlh66W8IOyehOydmCDtmLjstpztlZjsl6wg6raM7ZWc7J2EIOuwm+ydgOuSpCDri6Tsi5wg6rCA7KC47Ji0XG4gICAgaWYgKGNhbWVyYS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX19kZWJ1ZygnY2Fubm90IHRvIGdldCBjYW1lcmEgZGV2aWNlcy4gc28sIHRyeSB0byBnZXQgY2FtZXJhIGRldmljZXMgYWdhaW4nKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIHRoaXMuX19zdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgICAgIGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gY2FtZXJhLmxlbmd0aCA/IHtcbiAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgIH0gOiBudWxsO1xuICAgIH1cblxuICAgIC8vIOqwpOufreyLnCB3aWRlIOuTsSDsoIDsgqzslpEg6riw6riw7JeQ7IScIEZIRCDtlbTsg4Hrj4Qg7Lm066mU6528IOyCrOyaqeyLnCDtmYDsrYnsnbTrkJjripQg7ZiE7IOBIOuwqeyngFxuICAgIC8vIOyggOyCrOyWkSDquLDquLAg7YyQ64uo6riw7KSAIDog7ZuE66m07Lm066mU65287J2YIOqwnOyImOqwgCAx6rCc652864qUIOqwgOyglVxuICAgIGlmIChjYW1lcmEubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9fZGVidWcoJ21heWJlIGRldmljZSBpcyBlbnRyeSBtb2RlbCBzdWNoIGFzIGdhbGF4eSB3aWRlJyk7XG4gICAgICBjb25zdHJhaW50cy52aWRlby53aWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cy52aWRlby5oZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCBkdW1wdHJhY2sgPSAoW2EsIGJdLCB0cmFjaykgPT5cbiAgICAgIC8vICAgYCR7YX0ke3RyYWNrLmtpbmQgPT0gJ3ZpZGVvJyA/ICdDYW1lcmEnIDogJ01pY3JvcGhvbmUnfSAoJHt0cmFjay5yZWFkeVN0YXRlfSk6ICR7dHJhY2subGFiZWx9JHtifWA7XG5cbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1ZygndmlkZW9UcmFja3MgOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkpO1xuICAgICAgY29uc3Qgc3RyZWFtU2V0dGluZ3MgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRTZXR0aW5ncygpO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKFxuICAgICAgLy8gICAnc3RyZWFtQ2FwYWJpbGl0aWVzIDo6ICcsXG4gICAgICAvLyAgIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldENhcGFiaWxpdGllcygpXG4gICAgICAvLyApO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCdzdHJlYW0gOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0Q29uc3RyYWludHMoKSk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3N0cmVhbVNldHRpbmdzIDo6ICcsIHN0cmVhbVNldHRpbmdzKTtcbiAgICAgIHRoaXMuX19kZWJ1Zyhgc3RyZWFtIHdpZHRoICogaGVpZ2h0IDo6ICR7c3RyZWFtU2V0dGluZ3Mud2lkdGh9ICogJHtzdHJlYW1TZXR0aW5ncy5oZWlnaHR9YCk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSB3aWR0aCAvIGhlaWdodCA6OiAnICsgc3RyZWFtU2V0dGluZ3Mud2lkdGggLyBzdHJlYW1TZXR0aW5ncy5oZWlnaHQpO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gYXNwZWN0UmF0aW8gOjogJyArIHN0cmVhbVNldHRpbmdzLmFzcGVjdFJhdGlvKTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIGZhY2luZ01vZGUgOjogJyArIHN0cmVhbVNldHRpbmdzLmZhY2luZ01vZGUpO1xuICAgICAgW2NhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICAgIFtyb3RhdGlvbkNhbnZhcy53aWR0aCwgcm90YXRpb25DYW52YXMuaGVpZ2h0XSA9IFt0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aF07XG4gICAgICB9XG4gICAgICB2aWRlby5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICB0aGlzLl9fc3RyZWFtID0gc3RyZWFtO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9faW5pdFN0eWxlKCkge1xuICAgIHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICBvY3IsXG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG5cbiAgICAvLyDquLDspIDsoJXrs7RcbiAgICBjb25zdCBiYXNlV2lkdGggPSA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IDI2MDtcbiAgICBjb25zdCBzY2FubmVyRnJhbWVSYXRpbyA9IGJhc2VIZWlnaHQgLyBiYXNlV2lkdGg7IC8vIOyLoOu2hOymnSDruYTsnKhcblxuICAgIGxldCBndWlkZUJveFdpZHRoLCBndWlkZUJveEhlaWdodDtcbiAgICBsZXQgY2FsY09jckNsaWVudFdpZHRoID0gb2NyLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjT2NyQ2xpZW50SGVpZ2h0ID0gb2NyLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGg7XG4gICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXM7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7Jik66GcIOqwhOyjvFxuICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG4gICAgICBndWlkZUJveFdpZHRoID0gY2FsY09jckNsaWVudFdpZHRoICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6rCA66GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKTroZwg6rCE7KO8XG4gICAgICAvLyDruYTrlJTsmKTrpbwg6rCA66GcIFVJ7J2YIGhlaWdodCDquLDspIDsnLzroZwg7KSE7J206rOgXG4gICAgICAvLyDqsIDroZwgVUkgaGVpZ2h0IOq4sOykgOycvOuhnCDruYTrlJTsmKTsnZggd2lkdGgg6rOE7IKwXG4gICAgICBndWlkZUJveEhlaWdodCA9IGNhbGNPY3JDbGllbnRIZWlnaHQgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgIH1cbiAgICBndWlkZUJveFdpZHRoICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBndWlkZUJveEhlaWdodCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94V2lkdGggPSBndWlkZUJveFdpZHRoICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQgKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBpZiAodG9wVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh0b3BVSSwge1xuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUobWlkZGxlVUksIHtcbiAgICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChib3R0b21VSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGJvdHRvbVVJLCB7XG4gICAgICAgICdwYWRkaW5nLXRvcCc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmlkZW9Jbm5lckdhcCA9IDI7IC8vIOuvuOyEuO2VmOqyjCBtYXNrQm94SW5uZXLrs7Tri6QgZ3VpZGVCb3jqsIAg7J6R7J2A6rKDIOuztOyglVxuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgfSk7XG4gICAgY29uc3QgbWFza0JveElubmVyID0gbWFza0JveFdyYXAucXVlcnlTZWxlY3RvcignI21hc2tCb3hJbm5lcicpO1xuICAgIGxldCByID0gYm9yZGVyUmFkaXVzIC0gYm9yZGVyV2lkdGggKiAyO1xuICAgIHIgPSByIDwgMCA/IDAgOiByO1xuICAgIGlmICghaXNOYU4ocmVkdWNlZEd1aWRlQm94V2lkdGgpICYmICFpc05hTihyZWR1Y2VkR3VpZGVCb3hIZWlnaHQpICYmICFpc05hTihib3JkZXJSYWRpdXMpICYmICFpc05hTihib3JkZXJXaWR0aCkpIHtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lcldpZHRoID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lckhlaWdodCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBtYXNrQm94SW5uZXJXaWR0aCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hc2tCb3hJbm5lckhlaWdodCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3gnLCBtYXNrQm94SW5uZXJXaWR0aCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3knLCBtYXNrQm94SW5uZXJIZWlnaHQgLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeCcsIHIgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeScsIHIgKyAnJyk7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fYWRqdXN0U3R5bGUoKSB7XG4gICAgY29uc3QgX19jYWxjR3VpZGVCb3hDcml0ZXJpYSA9IChhLCBiKSA9PiB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdjYW1lcmFSZXNvbHV0aW9uJykge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oYSwgYik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChhLCBiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTsgLy8gZGVmYXVsdCA6IGNhbWVyYVJlc29sdXRpb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHtcbiAgICAgIG9jcixcbiAgICAgIHZpZGVvLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuXG4gICAgLy8g6riw7KSA7KCV67O0XG4gICAgY29uc3QgYmFzZVdpZHRoID0gaXNBbGllbkJhY2sgPyAyNjAgOiA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IGlzQWxpZW5CYWNrID8gNDAwIDogMjYwO1xuICAgIGNvbnN0IHNjYW5uZXJGcmFtZVJhdGlvID0gYmFzZUhlaWdodCAvIGJhc2VXaWR0aDsgLy8g7Iug67aE7KadIOu5hOycqFxuXG4gICAgbGV0IGd1aWRlQm94V2lkdGgsIGd1aWRlQm94SGVpZ2h0O1xuICAgIGxldCBjYWxjT2NyQ2xpZW50V2lkdGggPSBvY3IuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRIZWlnaHQgPSBvY3IuY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9IHZpZGVvLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPSB2aWRlby5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgaWYgKGNhbGNWaWRlb1dpZHRoID09PSAwIHx8IGNhbGNWaWRlb0hlaWdodCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoO1xuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNWaWRlb1dpZHRoLCBjYWxjVmlkZW9IZWlnaHRdID0gW2NhbGNWaWRlb0hlaWdodCwgY2FsY1ZpZGVvV2lkdGhdO1xuICAgICAgW2NhbGNWaWRlb0NsaWVudFdpZHRoLCBjYWxjVmlkZW9DbGllbnRIZWlnaHRdID0gW2NhbGNWaWRlb0NsaWVudEhlaWdodCwgY2FsY1ZpZGVvQ2xpZW50V2lkdGhdO1xuICAgICAgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICB9XG4gICAgbGV0IG5ld1ZpZGVvV2lkdGggPSBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBsZXQgbmV3VmlkZW9IZWlnaHQgPSBjYWxjVmlkZW9DbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBjb25zdCBuZXdWaWRlb1JhdGlvQnlXaWR0aCA9IGNhbGNWaWRlb0NsaWVudEhlaWdodCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IG5ld1ZpZGVvUmF0aW9CeUhlaWdodCA9IGNhbGNWaWRlb0NsaWVudFdpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgLy8g7IS466GcIFVJXG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCdcbiAgICAgIH0pO1xuICAgICAgLy8gdmlkZW8g6rCA66GcIOq4sOykgCAxMDAlIOycoOyngCAo67OA6rK97JeG7J2MKVxuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDsubTrqZTrnbzrj4Qg7IS466GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIO2ZleuMgFxuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsubTrqZTrnbzripQg6rCA66GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqTrpbwg67mE65SU7JikIOyEuOuhnCDquLjsnbTsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjVmlkZW9DbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCk7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOqwgOuhnCBVSVxuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdlbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJ1xuICAgICAgfSk7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOu5hOuUlOyYpOulvCDqsIDroZwgVUnsnZggaGVpZ2h0IOq4sOykgOycvOuhnCDspITsnbTqs6BcbiAgICAgICAgLy8g6rCA66GcIFVJIGhlaWdodCDquLDspIDsnLzroZwg67mE65SU7Jik7J2YIHdpZHRoIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOuKlCDshLjroZwg6riw7KSA7Jy866GcIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcblxuICAgICAgICAvLyDruYTrlJTsmKTrpbwg7IS466GcIOq4sOykgOycvOuhnCDri6Tsi5wg66ee7LakXG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBuZXdWaWRlb0hlaWdodCAqIG5ld1ZpZGVvUmF0aW9CeUhlaWdodDtcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZgg6rCA66GcIO2BrOq4sOqwgCDqsIDroZwgVUkgd2lkdGggKiByYXRpbyDqsJLrs7Tri6Qg7YGs66m0LFxuICAgICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aCkge1xuICAgICAgICAgIC8vIOqzhOyCsCDrsKnsi53snYQg67CU6r6864ukICjsgqzsnKAgOiDqsbDsnZgg7KCV7IKs6rCB7ZiV7JeQIOqwgOq5jOyatCDqsr3smrAg6rCA7J2065OcIOuwleyKpCDqsIDroZzqsIAg6r2J7LCo6rKMIOuQqC4pXG4gICAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7ZmV64yAXG4gICAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCBoZWlnaHQg7YGs6riw66W8IFVJ7J2YIGhlaWdodCDquLDspIDsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCDqsIDroZwg7YGs6riw6rCAIOqwgOuhnCBVSSB3aWR0aCAqIHJhdGlvIOqwkuuztOuLpCDtgazrqbQsXG4gICAgICAgIGlmIChndWlkZUJveFdpZHRoID4gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoKSB7XG4gICAgICAgICAgLy8g6rOE7IKwIOuwqeyLneydhCDrsJTqvrzri6QgKOyCrOycoCA6IOqxsOydmCDsoJXsgqzqsIHtmJXsl5Ag6rCA6rmM7Jq0IOqyveyasCDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnOqwgCDqvYnssKjqsowg65CoLilcbiAgICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDstpXshoxcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhKOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIOq4sOykgCnqsIAgb2NyVmlld1NpemUo7ZmU66m0IO2BrOq4sCkg6riw7KSA7J2865WMXG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAvLyBndWlkZUJveEhlaWdodCDsnbQgY2FsY09jckNsaWVudEhlaWdodCDrs7Tri6Qg7YGw6rK97JqwKOqwgOydtOuTnOuwleyKpOqwgCDtmZTrqbTsnYQg64SY7Ja06rCA64qUIOqyveyasCkg64uk7IucIOqzhOyCsFxuICAgICAgaWYgKGd1aWRlQm94SGVpZ2h0ID4gY2FsY09jckNsaWVudEhlaWdodCkge1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IE1hdGgubWluKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cblxuICAgICAgLy8gZ3VpZGVCb3hIZWlnaHQg7J20IGNhbGNPY3JDbGllbnRIZWlnaHQg67O064ukIO2BsOqyveyasCjqsIDsnbTrk5zrsJXsiqTqsIAg7ZmU66m07J2EIOuEmOyWtOqwgOuKlCDqsr3smrApIOuLpOyLnCDqs4TsgrBcbiAgICAgIGlmIChndWlkZUJveFdpZHRoID4gY2FsY09jckNsaWVudFdpZHRoKSB7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBNYXRoLm1pbihjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoID0gTWF0aC5taW4oZ3VpZGVCb3hXaWR0aCwgbmV3VmlkZW9XaWR0aCk7XG4gICAgdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSBNYXRoLm1pbihndWlkZUJveEhlaWdodCwgbmV3VmlkZW9IZWlnaHQpO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW25ld1ZpZGVvV2lkdGgsIG5ld1ZpZGVvSGVpZ2h0XSA9IFtuZXdWaWRlb0hlaWdodCwgbmV3VmlkZW9XaWR0aF07XG4gICAgfVxuICAgIGd1aWRlQm94V2lkdGggKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGd1aWRlQm94SGVpZ2h0ICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94V2lkdGggKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveEhlaWdodCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGlmICh0b3BVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHRvcFVJLCB7XG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWlkZGxlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShtaWRkbGVVSSwge1xuICAgICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJvdHRvbVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoYm90dG9tVUksIHtcbiAgICAgICAgJ3BhZGRpbmctdG9wJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIHdpZHRoOiBuZXdWaWRlb1dpZHRoICsgJ3B4J1xuICAgIH0pO1xuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgaGVpZ2h0OiBuZXdWaWRlb0hlaWdodCArICdweCdcbiAgICB9KTtcbiAgICBjb25zdCB2aWRlb0lubmVyR2FwID0gMjsgLy8g66+47IS47ZWY6rKMIG1hc2tCb3hJbm5lcuuztOuLpCBndWlkZUJveOqwgCDsnpHsnYDqsoMg67O07KCVXG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICB9KTtcbiAgICBjb25zdCBtYXNrQm94SW5uZXIgPSBtYXNrQm94V3JhcC5xdWVyeVNlbGVjdG9yKCcjbWFza0JveElubmVyJyk7XG4gICAgbGV0IHIgPSBib3JkZXJSYWRpdXMgLSBib3JkZXJXaWR0aCAqIDI7XG4gICAgciA9IHIgPCAwID8gMCA6IHI7XG4gICAgaWYgKCFpc05hTihyZWR1Y2VkR3VpZGVCb3hXaWR0aCkgJiYgIWlzTmFOKHJlZHVjZWRHdWlkZUJveEhlaWdodCkgJiYgIWlzTmFOKGJvcmRlclJhZGl1cykgJiYgIWlzTmFOKGJvcmRlcldpZHRoKSkge1xuICAgICAgY29uc3QgbWFza0JveElubmVyV2lkdGggPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgY29uc3QgbWFza0JveElubmVySGVpZ2h0ID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG1hc2tCb3hJbm5lcldpZHRoICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFza0JveElubmVySGVpZ2h0ICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneCcsIG1hc2tCb3hJbm5lcldpZHRoIC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneScsIG1hc2tCb3hJbm5lckhlaWdodCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J4JywgciArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J5JywgciArICcnKTtcbiAgICB9XG5cbiAgICAvLyDsiJjrj5kg7LSs7JiBIFVJIOyCrOyaqVxuICAgIC8vIGZpcnN0Q2FsbGVk7J24IOqyveyasCDslYTsp4EgY2FwdHVyZVVJ6rCAIOq3uOugpOyngOyngCDslYrslYQg66y07J2Y66+4XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgJiYgYm90dG9tVUkgJiYgY2FwdHVyZVVJKSB7XG4gICAgICAgIGNvbnN0IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyA9IHRoaXMuX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzKGJvdHRvbVVJKTtcbiAgICAgICAgbGV0IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID0gY2FwdHVyZUJ1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgICAgICBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID09PSAwID8gODAgOiBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgbGV0IGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPSBib3R0b21VSS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gaXNOYU4ocGFyc2VJbnQoYm90dG9tVUkuc3R5bGUucGFkZGluZ1RvcCkpID8gMCA6IHBhcnNlSW50KGJvdHRvbVVJLnN0eWxlLnBhZGRpbmdUb3ApO1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcztcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgY29uc3QgYmFzZWxpbmUgPSBjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gKGNhbGNPY3JDbGllbnRIZWlnaHQgLyAyICsgZ3VpZGVCb3hIZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPiAwICYmIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPCBiYXNlbGluZSkge1xuICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJycsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiBjYXB0dXJlVUlQYWRkaW5nQm90dG9tICsgJ3B4J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAnMTBweCcsXG4gICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJydcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRydWUpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMob2JqKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaj8uY2hpbGROb2Rlcykge1xuICAgICAgc3VtICs9IGl0ZW0uY2xpZW50SGVpZ2h0ID8gaXRlbS5jbGllbnRIZWlnaHQgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9XG4gIF9fY2xvc2VDYW1lcmEoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgfVxuICBhc3luYyBfX2xvYWRSZXNvdXJjZXMoKSB7XG4gICAgdm9pZCAwO1xuICAgIGlmICh0aGlzLl9fcmVzb3VyY2VzTG9hZGVkKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gYXdhaXQgc2ltZCgpO1xuICAgIGxldCBlbnZJbmZvID0gJyc7XG4gICAgZW52SW5mbyArPSBgb3MgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zfVxcbmA7XG4gICAgZW52SW5mbyArPSBgb3NTaW1wbGUgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlfVxcbmA7XG4gICAgZW52SW5mbyArPSBgaXNTdXBwb3J0V2FzbTogJHt0aGlzLl9faXNTdXBwb3J0V2FzbX1cXG5gO1xuICAgIGVudkluZm8gKz0gYHNpbWQod2FzbS1mZWF0dXJlLWRldGVjdCkgOiAke3RoaXMuX19pc1N1cHBvcnRTaW1kfVxcbmA7XG4gICAgaWYgKHRoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlID09PSAnSU9TJyB8fCB0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZSA9PT0gJ01BQycpIHtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gICAgfVxuICAgIGVudkluZm8gKz0gYGlzU3VwcG9ydFNpbWQoZmluYWwpIDogJHt0aGlzLl9faXNTdXBwb3J0U2ltZH1cXG5gO1xuICAgIGVudkluZm8gKz0gYFVzZXJBZ2VudCA6ICR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cXG5gO1xuICAgIHZvaWQgMDtcbiAgICB0aGlzLl9fZGVidWcoZW52SW5mbyk7XG4gICAgd2luZG93LnVzZWJPQ1JFbnZJbmZvID0gZW52SW5mbztcbiAgICBsZXQgc2RrU3VwcG9ydEVudiA9ICdxdXJhbSc7XG4gICAgaWYgKHRoaXMuX19pc1N1cHBvcnRTaW1kKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBzZGtTdXBwb3J0RW52ICs9ICdfc2ltZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gICAgdm9pZCAwO1xuICAgIHdpbmRvdy51c2ViT0NSRW52SW5mbyA9IGVudkluZm87XG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoc2RrU3VwcG9ydEVudiArICcuanMnLCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpO1xuICAgIGxldCBzcmMgPSBhd2FpdCBmZXRjaCh1cmwuaHJlZikudGhlbihyZXMgPT4gcmVzLnRleHQoKSkudGhlbih0ZXh0ID0+IHtcbiAgICAgIGxldCByZWdleCA9IC8oLiopID0gTW9kdWxlLmN3cmFwL2dtO1xuICAgICAgbGV0IHNvdXJjZSA9IHRleHQucmVwbGFjZShyZWdleCwgJ01vZHVsZS4kMSA9IE1vZHVsZS5jd3JhcCcpO1xuXG4gICAgICAvLyBkYXRhKG1vZGVsKVxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoL15cXChmdW5jdGlvblxcKFxcKSBcXHsvbSwgJ3ZhciBjcmVhdGVNb2RlbERhdGEgPSBhc3luYyBmdW5jdGlvbigpIHtcXG4nICsgJyByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xcbicpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJyAgIGNvbnNvbGUuZXJyb3IoXCJwYWNrYWdlIGVycm9yOlwiLCBlcnJvcik7JywgJyAgIHJlamVjdCgpO1xcbicgKyAnICAgY29uc29sZS5lcnJvcihcInBhY2thZ2UgZXJyb3I6XCIsIGVycm9yKTsnKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCcgIH0sIGhhbmRsZUVycm9yKScsICcgIHJlc29sdmUoKTtcXG4nICsgJyAgfSwgaGFuZGxlRXJyb3IpJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgvXlxcfVxcKVxcKFxcKTsvbSwgJ1xcbiB9KVxcbicgKyAnfTsnKTtcblxuICAgICAgLy8gd2FzbVxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2Uoc2RrU3VwcG9ydEVudiArICcud2FzbScsIG5ldyBVUkwoc2RrU3VwcG9ydEVudiArICcud2FzbScsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZik7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKGBSRU1PVEVfUEFDS0FHRV9CQVNFID0gWydcIl0ke3Nka1N1cHBvcnRFbnZ9XFxcXC5kYXRhW1wiJ11gLCAnZ20nKSwgYFJFTU9URV9QQUNLQUdFX0JBU0UgPSBcIiR7bmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy5kYXRhJywgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKS5ocmVmfVwiYCk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnZnVuY3Rpb24gY3JlYXRlV2FzbScsICdhc3luYyBmdW5jdGlvbiBjcmVhdGVXYXNtJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnaW5zdGFudGlhdGVBc3luYygpOycsICdhd2FpdCBpbnN0YW50aWF0ZUFzeW5jKCk7Jyk7XG5cbiAgICAgIC8vIHdhc20gYW5kIGRhdGEobW9kZWwpIGZpbGUg67OR66Cs66GcIGZldGNoIO2VmOq4sCDsnITtlbRcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCd2YXIgYXNtID0gY3JlYXRlV2FzbSgpOycsICdjb25zb2xlLmxvZyhcImNyZWF0ZSB3YXNtIGFuZCBkYXRhIC0gc3RhcnRcIilcXG4nICsgJ2F3YWl0IChhc3luYyBmdW5jdGlvbigpIHtcXG4nICsgJyAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcXG4nICsgJyAgICB2YXIgaXNDcmVhdGVkV2FzbSA9IGZhbHNlO1xcbicgKyAnICAgIHZhciBpc0NyZWF0ZWREYXRhID0gZmFsc2U7XFxuJyArICcgICAgY3JlYXRlV2FzbSgpLnRoZW4oKCkgPT4ge1xcbicgKyAnICAgICAgaXNDcmVhdGVkV2FzbSA9IHRydWU7XFxuJyArICcgICAgICBpZiAoaXNDcmVhdGVkRGF0YSkgeyByZXNvbHZlKCk7IH1cXG4nICsgJyAgICB9KTtcXG4nICsgJyAgICBjcmVhdGVNb2RlbERhdGEoKS50aGVuKCgpID0+IHtcXG4nICsgJyAgICAgIGlzQ3JlYXRlZERhdGEgPSB0cnVlO1xcbicgKyAnICAgICAgaWYgKGlzQ3JlYXRlZFdhc20pIHsgcmVzb2x2ZSgpOyB9XFxuJyArICcgICAgfSlcXG4nICsgJyAgfSk7XFxuJyArICd9KSgpO1xcbicgKyAnY29uc29sZS5sb2coXCJjcmVhdGUgd2FzbSBhbmQgZGF0YSAtIGVuZFwiKScpO1xuICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9KTtcbiAgICBzcmMgPSBgXG4gICAgKGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgJHtzcmN9XG4gICAgICBNb2R1bGUubGVuZ3RoQnl0ZXNVVEY4ID0gbGVuZ3RoQnl0ZXNVVEY4XG4gICAgICBNb2R1bGUuc3RyaW5nVG9VVEY4ID0gc3RyaW5nVG9VVEY4XG4gICAgICByZXR1cm4gTW9kdWxlXG4gICAgfSkoKVxuICAgICAgICBgO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUgPSBhd2FpdCBldmFsKHNyYyk7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5vblJ1bnRpbWVJbml0aWFsaXplZCA9IGFzeW5jIF8gPT4ge1xuICAgICAgdm9pZCAwO1xuICAgIH07XG4gICAgYXdhaXQgdGhpcy5fX09DUkVuZ2luZS5vblJ1bnRpbWVJbml0aWFsaXplZCgpO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSB0cnVlO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX3N0YXJ0U2Nhbldhc21JbXBsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpO1xuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgIHRoaXMuX19hZGRyZXNzID0gMDtcbiAgICAgIHRoaXMuX19wYWdlRW5kID0gZmFsc2U7XG4gICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gICAgICB0aGlzLl9fc3NhUmV0cnlDb3VudCA9IDA7XG4gICAgICBjb25zdCBzY2FuID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgaXNEZXRlY3RlZENhcmQgPSBudWxsLFxuICAgICAgICAgICAgaW1nRGF0YSA9IG51bGwsXG4gICAgICAgICAgICBpbWdEYXRhVXJsID0gbnVsbCxcbiAgICAgICAgICAgIG1hc2tJbWFnZSA9IG51bGwsXG4gICAgICAgICAgICBmYWNlSW1hZ2UgPSBudWxsLFxuICAgICAgICAgICAgc3NhUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIHNzYVJlc3VsdExpc3QgPSBbXSxcbiAgICAgICAgICAgIG1hc2tJbmZvID0gbnVsbDtcblxuICAgICAgICAgIC8vIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZShJTl9QUk9HUkVTUy5SRUFEWSk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9fT0NSRW5naW5lWydhc20nXSkgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gVE9ETyA6IOyEpOygle2VoOyImCDsnojqsowg67OA6rK9ICBkZWZhdWx0IOqwkuuPhCDsoJzqs7VcbiAgICAgICAgICBjb25zdCBbcmVzb2x1dGlvbl93LCByZXNvbHV0aW9uX2hdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2aWRlb1xuICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgIGlmIChyZXNvbHV0aW9uX3cgPT09IDAgfHwgcmVzb2x1dGlvbl9oID09PSAwKSByZXR1cm47XG4gICAgICAgICAgaWYgKHRoaXMuX19kZXRlY3RlZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZGRyZXNzIGJlZm9yZSAtLS0tLS0tLS0nLCBhZGRyZXNzKTtcbiAgICAgICAgICBpZiAodGhpcy5fX2FkZHJlc3MgPT09IDAgJiYgIXRoaXMuX19wYWdlRW5kICYmIChhd2FpdCB0aGlzLl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlKHZpZGVvKSkpIHtcbiAgICAgICAgICAgIFt0aGlzLl9fYWRkcmVzcywgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2tdID0gdGhpcy5fX2dldFNjYW5uZXJBZGRyZXNzKHRoaXMuX19vY3JUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9fYWRkcmVzcyB8fCB0aGlzLl9fcGFnZUVuZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZGRyZXNzIGFmdGVyIC0tLS0tLS0tLScsIGFkZHJlc3MpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19vY3JTdGF0dXMgPCB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIC8vIE9DUiDsmYTro4wg7J207KCEIOyDge2DnFxuXG4gICAgICAgICAgICAvLyBjYXJkIG5vdCBkZXRlY3RlZFxuICAgICAgICAgICAgW2lzRGV0ZWN0ZWRDYXJkLCBpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZCh0aGlzLl9fYWRkcmVzcywgMCk7XG4gICAgICAgICAgICBpZiAoIWlzRGV0ZWN0ZWRDYXJkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAgIT09IHRoaXMuSU5fUFJPR1JFU1MuUkVBRFkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5DQVJEX0RFVEVDVF9GQUlMRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVELCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7IC8vIO2VhOyalO2VnOqwgD9cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FyZCBpcyBkZXRlY3RlZFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuQ0FSRF9ERVRFQ1RfU1VDQ0VTUyk7XG5cbiAgICAgICAgICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICAgICAgICAgIHRoaXMuX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKHRydWUpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTLCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBbb2NyUmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZV0gPSBhd2FpdCB0aGlzLl9fc3RhcnRSZWNvZ25pdGlvbih0aGlzLl9fYWRkcmVzcywgdGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCB0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpLCBpbWdEYXRhLCBpbWdEYXRhVXJsKTtcblxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgICAgICAvLyAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpOyAgICAgICAgLy8g7ZWE7JqU7ZWc6rCAP1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fb2NyU3RhdHVzID49IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUykge1xuICAgICAgICAgICAgLy8gb2NyIOyZhOujjCDsnbTtm4Qg7IOB7YOcXG5cbiAgICAgICAgICAgIC8vIGZhaWx1cmUgY2FzZVxuICAgICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQ1IgU3RhdHVzIGlzICR7dGhpcy5fX29jclN0YXR1c30sIGJ1dCBvY3JSZXN1bHQgaXMgZmFsc2VgKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FzZVxuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICBpZiAodGhpcy5fX3NzYU1vZGUpIHtcbiAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICAvLyDstZzstIgg7Iuc64+EXG4gICAgICAgICAgICAgIHNzYVJlc3VsdCA9IGF3YWl0IHRoaXMuX19zdGFydFRydXRoKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fYWRkcmVzcyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ1tFUlJdIFNTQSBNT0RFIGlzIHRydWUuIGJ1dCwgc3NhUmVzdWx0IGlzIG51bGwnKTsgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgICAgICAgc3NhUmVzdWx0TGlzdC5wdXNoKHNzYVJlc3VsdCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXRyeVN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgRkFLRSA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ0ZBS0UnO1xuICAgICAgICAgICAgICAgIGNvbnN0IFJFQUwgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdSRUFMJztcbiAgICAgICAgICAgICAgICBjb25zdCBFTlNFTUJMRSA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ0VOU0VNQkxFJztcbiAgICAgICAgICAgICAgICBsZXQgaXNDb21wbGV0ZWQgPSBmYWxzZTsgLy8g67mE64+Z6riwIGZvciDrrLgg65WM66y47JeQIGJyZWFr6rCAIOyViOqxuOumrOuKlCDsnbTsiojroZwg64Sj7J2MXG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc3NhUmV0cnlDb3VudCA9PT0gdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgZXhlY3V0ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NzYVJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgc3NhUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGhSZXRyeSh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2FkZHJlc3MsIGl0ZW0pOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdbRVJSXSBTU0EgTU9ERSBpcyB0cnVlLiBidXQsIHNzYVJlc3VsdCBpcyBudWxsJyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgICAgICAgICAgICAgIHNzYVJlc3VsdExpc3QucHVzaChzc2FSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChGQUtFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQuaW5kZXhPZignUkVBTCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoUkVBTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0LmluZGV4T2YoJ0ZBS0UnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKEVOU0VNQkxFKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0cnlXb3JraW5nVGltZSA9IG5ldyBEYXRlKCkgLSByZXRyeVN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tJbmZvKSB7XG4gICAgICAgICAgICAgIG1hc2tJbmZvID0gdGhpcy5fX2dldE1hc2tJbmZvKHRoaXMuX19hZGRyZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgICAgICAgICBuZXdGb3JtYXRcbiAgICAgICAgICAgIH0gPSB1c2ViT0NSV0FTTVBhcnNlci5wYXJzZU9jclJlc3VsdCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIG9jclJlc3VsdCwgc3NhUmVzdWx0LCB0aGlzLl9fc3NhUmV0cnlDb3VudCwgc3NhUmVzdWx0TGlzdCwgdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlLCB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVBpdm90XG4gICAgICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAgICAgLy8gdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGVcbiAgICAgICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IHJldmlld19yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgICAgICAgb2NyX3Jlc3VsdDogbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiBpbWdEYXRhVXJsLFxuICAgICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogbWFza0ltYWdlLFxuICAgICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogZmFjZUltYWdlLFxuICAgICAgICAgICAgICBtYXNrSW5mbzogbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZSk7XG4gICAgICAgICAgICB0aGlzLmVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTGVnYWN5Rm9ybWF0KSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2RhdGEgPSBsZWdhY3lGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ0NhcmQgZGV0ZWN0aW9uIGVycm9yJztcbiAgICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJzogJyArIGUubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdm9pZCAwO1xuXG4gICAgICAgICAgLy8gaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnbWVtb3J5JykpIHtcbiAgICAgICAgICAvLyAgIGF3YWl0IHRoaXMuX19yZWNvdmVyeVNjYW4oKTtcbiAgICAgICAgICAvLyAgIHRoaXMuX19yZWNvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ1dBMDAxJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAodGhpcy5fX3JlY292ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5fX3JlY292ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuX19kZXRlY3RlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChzY2FuLCAxKTsgLy8g7J6s6reAXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZXRUaW1lb3V0KHNjYW4sIDEpOyAvLyBVSSDrnpzrjZTrp4EgYmxvY2tpbmcg67Cp7KeAIChzZXRUaW1lb3V0KVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZSwgY29uc3RhbnROdW1iZXIpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZSkge1xuICAgICAgY29uc3QgcmVzaXplUmF0aW8gPSB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodCAvIHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGg7XG4gICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgbWF4V2lkdGg6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCxcbiAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggKiByZXNpemVSYXRpbyxcbiAgICAgICAgY29udmVydFNpemU6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUsXG4gICAgICAgIHRhcmdldENvbXByZXNzVm9sdW1lOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIC8vIGN1c3RvbSBvcHRpb25cbiAgICAgIH07XG5cbiAgICAgIHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSA9IGF3YWl0IHRoaXMuX19jb21wcmVzZUJhc2U2NEltYWdlKGltZ0RhdGFVcmwsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG5cbiAgICAgIC8vIG1hc2tpbmcg7J2066+47KeA64qUIHJlc2l6ZSDtlZjrqbQsIG1hc2sg7KKM7ZGc6rCAIOyWtOq4i+uCmOuvgOuhnCDrpqzsgqzsnbTspogg7JWI7ZWY6rOgIOyVley2leunjCDsp4TtlolcbiAgICAgIGNvbnN0IG1hc2tpbmdJbWFnZU9wdGlvbnMgPSB7XG4gICAgICAgIHF1YWxpdHk6IGRlZmF1bHRPcHRpb25zLnF1YWxpdHksXG4gICAgICAgIHRhcmdldENvbXByZXNzVm9sdW1lOiBkZWZhdWx0T3B0aW9ucy50YXJnZXRDb21wcmVzc1ZvbHVtZVxuICAgICAgfTtcbiAgICAgIHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShtYXNrSW1hZ2UsIG1hc2tpbmdJbWFnZU9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICAgIHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShmYWNlSW1hZ2UsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgfVxuICB9XG4gIF9fcmVxdWVzdEdldEFQSVRva2VuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uY3JlZGVudGlhbDtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLl9fb3B0aW9ucy5hdXRoU2VydmVySW5mby5iYXNlVXJsO1xuICAgICAgZmV0Y2goYCR7YmFzZVVybH0vc2lnbi1pbmAsIHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbCksXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgICAgIC8vIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgLy8gY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBmZXRjaChgJHtiYXNlVXJsfS91c2ViL3Rva2VuYCwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtyZXN1bHQudG9rZW59YFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShqc29uLnRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9fcmVxdWVzdFNlcnZlck9DUihvY3JUeXBlLCBzc2FNb2RlLCBpbWdEYXRhVXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMub2NyU2VydmVyQmFzZVVybDtcbiAgICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9pZGNhcmQtZHJpdmVyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvcGFzc3BvcnQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuLWJhY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NyZWRpdCBjYXJkIGlzIG5vdCBVbnN1cHBvcnRlZCBTZXJ2ZXIgT0NSJyk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT0NSIHR5cGU6ICR7b2NyVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcGlUb2tlbiA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0R2V0QVBJVG9rZW4oKTtcbiAgICAgICAgY29uc3QgbXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgbXlIZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthcGlUb2tlbn1gKTtcbiAgICAgICAgY29uc3QgcGFyYW0gPSB7XG4gICAgICAgICAgaW1hZ2VfYmFzZTY0OiBpbWdEYXRhVXJsLFxuICAgICAgICAgIG1hc2tfbW9kZTogJ3RydWUnLFxuICAgICAgICAgIGZhY2VfbW9kZTogJ3RydWUnXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9fc3NhTW9kZSkge1xuICAgICAgICAgIHBhcmFtLnNzYV9tb2RlID0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhdyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczogbXlIZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IHJhdyxcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdydcbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2goYmFzZVVybCwgcmVxdWVzdE9wdGlvbnMpLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fc3RhcnRTY2FuU2VydmVySW1wbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgLy8gdGhpcy5fX3NldFBpaUVuY3J5cHRNb2RlKHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKTsgLy8gb2NyIHJlc3VsdCBlbmNyeXB0XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICBzc2FSZXN1bHRMaXN0ID0gW107XG4gICAgICAgIGNvbnN0IF9fb25DbGlja0NhcHR1cmVCdXR0b24gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgLy8g7LqU67KE7Iqk7JeQ7IScIOydtOuvuOyngOulvCDqsIDsoLjsmLRcbiAgICAgICAgICBjb25zdCBbLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19jcm9wSW1hZ2VGcm9tVmlkZW8oKTtcbiAgICAgICAgICBpZiAoMSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDsi6TtjKggKOuwnOyDnSDqsIDriqXshLEg7JeG7J2MKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXJ2ZXIgb2NyIOyEseqztVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUywgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgb2NyUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3JlcXVlc3RTZXJ2ZXJPQ1IodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBpbWdEYXRhVXJsKTtcblxuICAgICAgICAgICAgICAvLyBmYWlsdXJlIGNhc2VcbiAgICAgICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfRkFJTEVEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlciBPQ1IgaXMgZmFpbGVkYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNzYSDsi5zrj4Q/XG5cbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FzZVxuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICB2aWRlb1xuICAgICAgICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTsgLy8gT0NSIOyZhOujjCDsi5zsoJDsl5AgY2FtZXJhIHByZXZpZXcgb2ZmXG5cbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgICAgICAgICBuZXdGb3JtYXQsXG4gICAgICAgICAgICAgIGJhc2U2NEltYWdlUmVzdWx0LFxuICAgICAgICAgICAgICBtYXNrSW5mb1xuICAgICAgICAgICAgfSA9IHVzZWJPQ1JBUElQYXJzZXIucGFyc2VPY3JSZXN1bHQodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBvY3JSZXN1bHQpO1xuICAgICAgICAgICAgbGV0IHJldmlld19yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgICAgICAgb2NyX3Jlc3VsdDogbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiBpbWdEYXRhVXJsLFxuICAgICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9tYXNraW5nX2ltYWdlLFxuICAgICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLFxuICAgICAgICAgICAgICBtYXNrSW5mbyxcbiAgICAgICAgICAgICAgc3NhX21vZGU6IHRoaXMuX19zc2FNb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfYXBpX3Jlc3BvbnNlID0gb2NyUmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSwgYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLCAwLjApO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9jclJlc3VsdC5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdENvZGUgPSAnU0YwMDEnO1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHRNZXNzYWdlID0gYCR7b2NyUmVzdWx0LnNjYW5uZXJfdHlwZX06JHtvY3JSZXN1bHQ/LnJlc3VsdF9jb2RlfWA7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdERldGFpbCA9IEpTT04uc3RyaW5naWZ5KG9jclJlc3VsdCk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIHJlc3VsdERldGFpbCwgcmVzdWx0TWVzc2FnZSk7IC8vIFFVUkFNIFNlcnZlciBPQ1Ig7JeQ65+sXG5cbiAgICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fX2NhcHR1cmVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnU2VydmVyIE9DUiBFcnJvcic7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UpIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJzogJyArIGUubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICB2b2lkIDA7XG4gICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdTRTAwMScsIGUsIGVycm9yTWVzc2FnZSk7IC8vIFFVUkFNIFNlcnZlciBPQ1Ig7JeQ65+sXG4gICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZShpbWdEYXRhLCBpbWdEYXRhVVJMKSB7XG4gICAgLy8gc3NhIHJldHJ5IOyEpOygleydtCDrkJjslrQg7J6I7Jy86rGw64KYLCDsiJjrj5nstKzsmIFVSeulvCDsgqzsmqntlZjripQg6rK97JqwLCBjYXJkIGRldGVjdCDshLHqs7Xsi5wg7J2066+47KeAIOyggOyepVxuICAgIGlmICh0aGlzLl9fc3NhTW9kZSAmJiB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID4gMCB8fCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkgJiYgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQgPiAwKSB7XG4gICAgICBsZXQgbGltaXRTYXZlSW1hZ2VDb3VudCA9IE1hdGgubWF4KHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQsIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50KTtcbiAgICAgIGlmICh0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUubGVuZ3RoID09PSBsaW1pdFNhdmVJbWFnZUNvdW50KSB7XG4gICAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUucHVzaChpbWdEYXRhKTtcbiAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB7XG4gICAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5wdXNoKGltZ0RhdGFVUkwpO1xuICAgICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgICB9XG5cbiAgICAgIHZvaWQgMDsgLy8gc2hvdWxkIGJlIHJlbW92ZWRcbiAgICB9XG4gIH1cblxuICBhc3luYyBfX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCkge1xuICAgIC8vIOyduOyLnSDshLHqs7Ug7Iqk7LqUIOujqO2UhCDsooXro4xcbiAgICBpZiAocmV2aWV3X3Jlc3VsdC5zc2FfbW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0EpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTUyk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogJ04xMDAnLFxuICAgICAgICByZXN1bHRfbWVzc2FnZTogJ09LLidcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6ICdzdWNjZXNzJyxcbiAgICAgIHJldmlld19yZXN1bHQ6IHJldmlld19yZXN1bHRcbiAgICB9O1xuICAgIGlmICh0aGlzLl9fb25TdWNjZXNzKSB7XG4gICAgICB0aGlzLl9fb25TdWNjZXNzKHJlc3VsdCk7XG4gICAgICB0aGlzLl9fb25TdWNjZXNzID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX29uRmFpbHVyZVByb2Nlc3MocmVzdWx0Q29kZSwgZSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgbGV0IGVycm9yRGV0YWlsID0gJyc7XG4gICAgaWYgKGU/LnRvU3RyaW5nKCkpIGVycm9yRGV0YWlsICs9IGUudG9TdHJpbmcoKTtcbiAgICBpZiAoZT8uc3RhY2spIGVycm9yRGV0YWlsICs9IGUuc3RhY2s7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgYXBpX3Jlc3BvbnNlOiB7XG4gICAgICAgIHJlc3VsdF9jb2RlOiByZXN1bHRDb2RlLFxuICAgICAgICByZXN1bHRfbWVzc2FnZTogZXJyb3JNZXNzYWdlXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnZmFpbGVkJyxcbiAgICAgIHJldmlld19yZXN1bHQ6IHtcbiAgICAgICAgb2NyX3R5cGU6IHRoaXMuX19vY3JUeXBlLFxuICAgICAgICBlcnJvcl9kZXRhaWw6IGVycm9yRGV0YWlsXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uRmFpbHVyZSkge1xuICAgICAgdGhpcy5fX29uRmFpbHVyZShyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19wcmVsb2FkaW5nV2FzbSgpIHtcbiAgICBjb25zdCBwcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5nZXRQcmVsb2FkaW5nU3RhdHVzKCk7XG4gICAgaWYgKCF0aGlzLmlzUHJlbG9hZGVkKCkgJiYgcHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgYXdhaXQgdGhpcy5wcmVsb2FkaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLlNUQVJURUQpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fd2FpdFByZWxvYWRlZCgpO1xuICAgICAgfSBlbHNlIGlmIChwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLkRPTkUpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhYm5vcm1hbGx5IHByZWxvYWRpbmcgc3RhdHVzLCBwcmVsb2FkZWQ6ICR7dGhpcy5pc1ByZWxvYWRlZCgpfSAvIHByZWxvYWRpbmdTdGF0dXM6ICR7dGhpcy5nZXRQcmVsb2FkaW5nU3RhdHVzKCl9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgLy8gX19zZXRQaWlFbmNyeXB0TW9kZShwaWlFbmNyeXB0TW9kZSkge1xuICAvLyAgIHRoaXMuX19PQ1JFbmdpbmUuc2V0UGlpRW5jcnlwdChwaWlFbmNyeXB0TW9kZSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19lbmNyeXB0RGV0ZWN0ZWRCYXNlNjQoYWRkcmVzcywgbWFzaywgb2NyX21vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgLy8gICBpZiAoaW1nVHlwZSA9PT0gJ2ZhY2UnKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5lbmNyeXB0QmFzZTY0anBnRGV0ZWN0ZWRQaG90b0Jhc2U2NChhZGRyZXNzKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkRnJhbWVCYXNlNjQoXG4gIC8vICAgICBhZGRyZXNzLFxuICAvLyAgICAgbWFzayxcbiAgLy8gICAgIG9jcl9tb2RlXG4gIC8vICAgKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZFNpemUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jcnlwdGVkSnBnU2l6ZSgpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0RW5jcnlwdGVkQnVmZmVyKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ0J1ZmZlcigpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KGFkZHJlc3MsIG1hc2ssIGltZ01vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgLy8gICBjb25zdCBlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPSB0aGlzLl9fZW5jcnlwdERldGVjdGVkQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBpbWdNb2RlLFxuICAvLyAgICAgaW1nVHlwZVxuICAvLyAgICk7XG4gIC8vICAgaWYgKGVuY3J5cHREZXRlY3RlZEJhc2U2NCA9PT0gMSkge1xuICAvLyAgICAgY29uc3QganBnU2l6ZSA9IHRoaXMuX19nZXRFbmNyeXB0ZWRTaXplKCk7XG4gIC8vICAgICBjb25zdCBqcGdQb2ludGVyID0gdGhpcy5fX2dldEVuY3J5cHRlZEJ1ZmZlcigpO1xuICAvL1xuICAvLyAgICAgY29uc3QgZW5jcnlwdGVkID0gbmV3IFVpbnQ4QXJyYXkoXG4gIC8vICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguYnVmZmVyLFxuICAvLyAgICAgICBqcGdQb2ludGVyLFxuICAvLyAgICAgICBqcGdTaXplXG4gIC8vICAgICApO1xuICAvLyAgICAgY29uc3QgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG4gIC8vICAgICBjb25zdCBkZWNvZGVkU3RyaW5nID0gdGV4dERlY29kZXIuZGVjb2RlKGVuY3J5cHRlZCk7XG4gIC8vXG4gIC8vICAgICByZXR1cm4gZGVjb2RlZFN0cmluZztcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuICcnO1xuICAvLyB9XG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gIGFzeW5jIF9fc3RhcnRTY2FuV2FzbSgpIHtcbiAgICB0aGlzLl9fZGVidWcoJ3dhc21fbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5XYXNtSW1wbCgpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBhc3luYyBfX3N0YXJ0U2NhblNlcnZlcigpIHtcbiAgICB0aGlzLl9fZGVidWcoJ3NlcnZlcl9tb2RlJyk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJID0gdHJ1ZTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuU2VydmVySW1wbCgpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBhc3luYyBfX3JlY292ZXJ5U2NhbigpIHtcbiAgICB2b2lkIDA7XG4gICAgdGhpcy5fX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICB9XG4gIHN0b3BTY2FuKCkge1xuICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7IC8vIHN3aXRjaCB0byBzZXJ2ZXLsnbzrlYwg6riw7KG0IFdBU00gbG9vcCDqsJXsoJzsooXro4xcbiAgICBjb25zdCB7XG4gICAgICBjYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoY2FudmFzKSB7XG4gICAgICBjb25zdCBjYW52YXNDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgICB3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWVcbiAgICAgIH0pO1xuICAgICAgY2FudmFzQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cbiAgc3RvcFN0cmVhbSgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQpO1xuICAgIGlmICh0aGlzLl9fc3RyZWFtKSB7XG4gICAgICB0aGlzLl9fc3RyZWFtLnN0b3AgJiYgdGhpcy5fX3N0cmVhbS5zdG9wKCk7XG4gICAgICBsZXQgdHJhY2tzID0gdGhpcy5fX3N0cmVhbS5nZXRUcmFja3MgJiYgdGhpcy5fX3N0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmICh0cmFja3MgJiYgdHJhY2tzLmxlbmd0aCkge1xuICAgICAgICB0cmFja3MuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3N0cmVhbSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIOuplOuqqOumrCBhbGxvY2F0aW9uIGZyZWUg7ZWo7IiYICovXG4gIGNsZWFudXAoKSB7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcygpO1xuICAgIHRoaXMuX19kZXN0cm95QnVmZmVyKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lQcmV2SW1hZ2UoKTtcbiAgICB0aGlzLl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAoKTtcbiAgfVxuICByZXN0b3JlSW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9fcHJlbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgfVxuICBfX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpIHtcbiAgICBpZiAodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcik7XG4gICAgICB0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBVc2VCT0NSOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxPQUFPQSxRQUFRLE1BQU0sdUJBQXVCO0FBQzVDLE9BQU9DLGlCQUFpQixNQUFNLG1DQUFtQztBQUNqRSxPQUFPQyxnQkFBZ0IsTUFBTSxrQ0FBa0M7QUFDL0QsU0FBU0MsYUFBYSxFQUFFQyxPQUFPLEVBQUVDLElBQUksRUFBRUMsT0FBTyxRQUFRLGtDQUFrQztBQUN4RixPQUFPQyxTQUFTLE1BQU0seUJBQXlCO0FBQy9DLElBQUlDLFFBQVE7QUFDWixNQUFNQyxPQUFPLENBQUM7RUFvQ1o7O0VBRUE7O0VBdUVpQztFQUNMOztFQU1FO0VBQ0Y7RUFDQzs7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
