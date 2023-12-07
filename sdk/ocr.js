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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNzYVJldHJ5VHlwZSIsInNzYVJldHJ5UGl2b3QiLCJzc2FNYXhSZXRyeUNvdW50IiwidXNlRGVidWdBbGVydCIsInByZWxvYWRpbmciLCJvblByZWxvYWRlZCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJpc1ByZWxvYWRlZCIsInNob3dPQ1JMb2FkaW5nVUkiLCJfX3ByZWxvYWRpbmdTdGF0dXMiLCJfX2xvYWRSZXNvdXJjZXMiLCJfX3ByZWxvYWRlZCIsImhpZGVPQ1JMb2FkaW5nVUkiLCJpc0luaXRpYWxpemVkIiwiX19pbml0aWFsaXplZCIsImdldFByZWxvYWRpbmdTdGF0dXMiLCJpc0VuY3J5cHRNb2RlIiwiX19vcHRpb25zIiwiaXNDcmVkaXRDYXJkIiwiX19vY3JUeXBlIiwicHJlbG9hZGluZ1VJV3JhcCIsImdldE9DUkVsZW1lbnRzIiwiZGlzcGxheSIsImVuY3J5cHRSZXN1bHQiLCJyZXZpZXdfcmVzdWx0IiwiX19pc1N1cHBvcnRXYXNtIiwiaW5jbHVkZUxpc3QiLCJlbmNyeXB0ZWQiLCJvY3JfcmVzdWx0IiwiXyIsInRvUGFpcnMiLCJwaWNrIiwicmVkdWNlIiwiYWNjIiwiX3JlZiIsImtleSIsInZhbHVlIiwiX19lbmNyeXB0U2NhblJlc3VsdCIsIm9jcl9vcmlnaW5faW1hZ2UiLCJfb2JqZWN0U3ByZWFkIiwiZXhjbHVkZUxpc3QiLCJvbWl0IiwiX3JlZjIiLCJvY3JfbWFza2luZ19pbWFnZSIsIm9jcl9mYWNlX2ltYWdlIiwiZ2V0T0NSRW5naW5lIiwiX19PQ1JFbmdpbmUiLCJpbml0Iiwic2V0dGluZ3MiLCJsaWNlbnNlS2V5IiwiRXJyb3IiLCJfX2xpY2Vuc2UiLCJtZXJnZWRPcHRpb25zIiwibWVyZ2UiLCJzZXRPcHRpb24iLCJfX3dpbmRvd0V2ZW50QmluZCIsIl9fZGV2aWNlSW5mbyIsImdldE9zVmVyc2lvbiIsImdldE9wdGlvbiIsImdldE9jclR5cGUiLCJ0eXBlIiwiX19vY3JUeXBlTnVtYmVyVG9TdHJpbmciLCJnZXQiLCJnZXRPY3JUeXBlTnVtYmVyIiwic3RyaW5nIiwiX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIiLCJnZXRVSU9yaWVudGF0aW9uIiwiX191aU9yaWVudGF0aW9uIiwiZ2V0VmlkZW9PcmllbnRhdGlvbiIsIl9fdmlkZW9PcmllbnRhdGlvbiIsImNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlIiwiX3RoaXMyIiwiX19pc1N3aXRjaFRvU2VydmVyTW9kZSIsImxhdGVuY3lQZXIxMDBtcyIsIm1lYXN1cmVSZXBvcnQiLCJfX2RlYnVnIiwic3RhcnRPQ1IiLCJvblN1Y2Nlc3MiLCJvbkZhaWx1cmUiLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwiX3RoaXMzIiwib25JblByb2dyZXNzQ2hhbmdlIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX19zc2FNb2RlIiwiaW5kZXhPZiIsIl9fb25TdWNjZXNzIiwiX19vbkZhaWx1cmUiLCJfX29uSW5Qcm9ncmVzc0NoYW5nZSIsIl9fdG9wVUkiLCJ0b3BVSSIsIl9fbWlkZGxlVUkiLCJtaWRkbGVVSSIsIl9fYm90dG9tVUkiLCJib3R0b21VSSIsIl9fY2hhbmdlU3RhZ2UiLCJfX3ByZXByb2Nlc3MiLCJfX3NldHVwRG9tRWxlbWVudHMiLCJfX3ByZWxvYWRpbmdXYXNtIiwiX19zdGFydFNjYW5TZXJ2ZXIiLCJfX3N0YXJ0U2Nhbldhc20iLCJlIiwic3RvcE9DUiIsImNsZWFudXAiLCJfX2Nsb3NlQ2FtZXJhIiwic2V0SWdub3JlQ29tcGxldGUiLCJ2YWwiLCJlbmNyeXB0IiwicGxhaW5TdHIiLCJyZXN0YXJ0T0NSIiwib2NyVHlwZSIsIl9hcmd1bWVudHMyIiwiX3RoaXM0IiwiaXNTd2l0Y2hNb2RlIiwiX193YWl0UHJlbG9hZGVkIiwiX3RoaXM1Iiwid2FpdGluZ1JldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNoZWNrIiwic2V0VGltZW91dCIsImNvbnZlcnRUeXBlVG9OdW1iZXIiLCJvcHRpb24iLCJpc05hTiIsInBhcnNlSW50IiwiX3RoaXNfIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwic2tpcFRvdWNoQWN0aW9uZm9yWm9vbSIsImV2IiwidG91Y2hlcyIsInByZXZlbnREZWZhdWx0Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJvbmJlZm9yZXVubG9hZCIsIl9fcGFnZUVuZCIsImhhbmRsZVJlc2l6ZSIsIl9yZWY0IiwiX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUiLCJfX3Rocm90dGxpbmdSZXNpemVUaW1lciIsImFwcGx5IiwiX190aHJvdHRsaW5nUmVzaXplRGVsYXkiLCJtc2ciLCJfX3NsZWVwIiwibXMiLCJfX2Jsb2JUb0Jhc2U2NCIsImJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsIl9fYmFzZTY0dG9CbG9iIiwiYmFzZTY0IiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsIm1pbWVTdHJpbmciLCJhYiIsIkFycmF5QnVmZmVyIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwiX19jb21wcmVzZUJhc2U2NEltYWdlIiwib3B0aW9ucyIsImNvbnN0YW50TnVtYmVyIiwiX3RoaXM2IiwiYmxvYkZpbGUiLCJjb21wcmVzc2VkIiwiY29tcHJlc3NJbWFnZSIsImNvbXByZXNzaW9uUmF0aW8iLCJNYXRoIiwicm91bmQiLCJzaXplIiwiX19nZXRTdHJpbmdPbldhc21IZWFwIiwibGVuZ3RoQnl0ZXMiLCJsZW5ndGhCeXRlc1VURjgiLCJfX3N0cmluZ09uV2FzbUhlYXAiLCJfbWFsbG9jIiwic3RyaW5nVG9VVEY4Iiwib2NyUmVzdWx0Iiwic3RyaW5nT25XYXNtSGVhcCIsInRvU3RyaW5nIiwianNvblN0cmluZyIsIl9mcmVlIiwiX19zZXRWaWRlb1Jlc29sdXRpb24iLCJ2aWRlb0VsZW1lbnQiLCJfdGhpczciLCJpc1N1cHBvcnRlZFJlc29sdXRpb24iLCJyZXNvbHV0aW9uVGV4dCIsIl9fY2FtU2V0Q29tcGxldGUiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJzcmNPYmplY3QiLCJfX3ZpZGVvV2lkdGgiLCJfX3ZpZGVvSGVpZ2h0IiwiX19nZXRTY2FubmVyQWRkcmVzcyIsIl9fb2NyVHlwZUxpc3QiLCJpbmNsdWRlcyIsImFkZHJlc3MiLCJkZXN0cm95Q2FsbGJhY2siLCJnZXRJRENhcmRTY2FubmVyIiwiZGVzdHJveUlEQ2FyZFNjYW5uZXIiLCJnZXRQYXNzcG9ydFNjYW5uZXIiLCJkZXN0cm95UGFzc3BvcnRTY2FubmVyIiwiZ2V0QWxpZW5TY2FubmVyIiwiZGVzdHJveUFsaWVuU2Nhbm5lciIsImdldENyZWRpdFNjYW5uZXIiLCJkZXN0cm95Q3JlZGl0U2Nhbm5lciIsIl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MiLCJfX3JldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19nZXRCdWZmZXIiLCJfX0J1ZmZlciIsIl9fcmVzb2x1dGlvbldpZHRoIiwiX19yZXNvbHV0aW9uSGVpZ2h0IiwiX19yZXN1bHRCdWZmZXIiLCJfX21hc2tJbmZvUmVzdWx0QnVmIiwiX19nZXRJbWFnZUJhc2U2NCIsIm1hc2tNb2RlIiwiaW1nTW9kZSIsIl9hcmd1bWVudHMzIiwiX3RoaXM4IiwiaW1nVHlwZSIsImVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZSIsImVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZSIsImpwZ1NpemUiLCJnZXRFbmNvZGVkSnBnU2l6ZSIsImpwZ1BvaW50ZXIiLCJnZXRFbmNvZGVkSnBnQnVmZmVyIiwicmVzdWx0VmlldyIsIkhFQVA4IiwiYnVmZmVyIiwiZGVzdHJveUVuY29kZWRKcGciLCJfX2Rlc3Ryb3lCdWZmZXIiLCJfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlciIsIl9fZGVzdHJveVByZXZJbWFnZSIsIl9fUHJldkltYWdlIiwiX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCIsIl9fZGVzdHJveVNjYW5uZXJBZGRyZXNzIiwiX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrIiwiX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUiLCJfdGhpczkiLCJfX2dldFJvdGF0aW9uRGVncmVlIiwiX19nZXRNaXJyb3JNb2RlIiwiX19jcm9wSW1hZ2VGcm9tVmlkZW8iLCJfdGhpczEwIiwiY2FsY1Jlc29sdXRpb25fdyIsImNhbGNSZXNvbHV0aW9uX2giLCJ2aWRlbyIsImNhbnZhcyIsInJvdGF0aW9uQ2FudmFzIiwiY2FsY0NhbnZhcyIsImNhbGNWaWRlb1dpZHRoIiwiY2FsY1ZpZGVvSGVpZ2h0IiwiY2FsY1ZpZGVvQ2xpZW50V2lkdGgiLCJjbGllbnRXaWR0aCIsImNhbGNWaWRlb0NsaWVudEhlaWdodCIsImNsaWVudEhlaWdodCIsImNhbGNDcm9wSW1hZ2VTaXplV2lkdGgiLCJfX2Nyb3BJbWFnZVNpemVXaWR0aCIsImNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0IiwiX19jcm9wSW1hZ2VTaXplSGVpZ2h0IiwiY2FsY1ZpZGVvT3JpZW50YXRpb24iLCJpc0FsaWVuQmFjayIsIl9faXNSb3RhdGVkOTBvcjI3MCIsImNhbGNNYXhTV2lkdGgiLCJjYWxjTWF4U0hlaWdodCIsInN4Iiwic3kiLCJyYXRpbyIsInNXaWR0aCIsIm1pbiIsInNIZWlnaHQiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjYWxjQ29udGV4dCIsImdldENvbnRleHQiLCJ3aWxsUmVhZEZyZXF1ZW50bHkiLCJkcmF3SW1hZ2UiLCJpbWdEYXRhIiwiaW1nRGF0YVVybCIsImdldEltYWdlRGF0YSIsInRvRGF0YVVSTCIsIl9fcm90YXRlIiwiZGVncmVlIiwiaW1nIiwiSW1hZ2UiLCJ0ZW1wQ2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwidGVtcENvbnRleHQiLCJwb3NpdGlvbiIsImhlaWdodCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsIlBJIiwibmV3SW1hZ2VEYXRhIiwicmVzdG9yZSIsIl9faXNDYXJkYm94RGV0ZWN0ZWQiLCJfYXJndW1lbnRzNCIsIl90aGlzMTEiLCJib3hUeXBlIiwicmV0cnlJbWciLCJzZXQiLCJkYXRhIiwia29yIiwiYWxpZW4iLCJwYXNzcG9ydCIsImRldGVjdF9pZGNhcmRfb3B0IiwiZGV0ZWN0X2lkY2FyZCIsIm1lc3NhZ2UiLCJfX3N0YXJ0UmVjb2duaXRpb24iLCJzc2FNb2RlIiwiaXNTZXRJZ25vcmVDb21wbGV0ZSIsIl90aGlzMTIiLCJyZXN1bHRCdWZmZXIiLCJyZWNvZ25pdGlvbiIsIl9yZWY3IiwiX29jclJlc3VsdCIsIl9vY3JSZXN1bHQyIiwic2NhbklEQ2FyZCIsInNjYW5QYXNzcG9ydCIsInNjYW5BbGllbiIsInNjYW5BbGllbkJhY2siLCJzY2FuQ3JlZGl0IiwiX19jc3ZUb09iamVjdCIsImNvbXBsZXRlIiwiX19tYW51YWxPQ1JSZXRyeUNvdW50IiwiX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50IiwicXVldWVJZHgiLCJfX2RldGVjdGVkQ2FyZFF1ZXVlIiwiX19ibHVyQ2FwdHVyZUJ1dHRvbiIsIl9fc2V0U3R5bGUiLCJfeCIsIm9jckltYWdlTW9kZSIsIk9DUl9JTUdfTU9ERSIsIm9yaWdpbkltYWdlIiwiT0NSX0lNR19NQVNLX01PREUiLCJtYXNrSW1hZ2UiLCJmYWNlSW1hZ2UiLCJfX3N0YXJ0VHJ1dGgiLCJyZWplY3QiLCJzY2FuVHJ1dGgiLCJzdHIiLCJwYWlycyIsIm9iaiIsInBhaXIiLCJfX2dldE1hc2tJbmZvIiwibWFza0luZm9SZXN1bHRCdWYiLCJnZXRNYXNrUmVjdCIsIl9fc3RhcnRUcnV0aFJldHJ5IiwiX3RoaXMxMyIsIl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciIsIl90aGlzMTQiLCJfX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciIsIl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciIsIl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24iLCJfdGhpczE1IiwiaXNQYXNzcG9ydCIsIl9fc2V0dXBWaWRlbyIsIl9fc3RyZWFtIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwicGxheSIsIl9fYWRqdXN0U3R5bGUiLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsIm5hbWUiLCJlcnJvck1lc3NhZ2UiLCJfX29uRmFpbHVyZVByb2Nlc3MiLCJzdG9wU3RyZWFtIiwiX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQiLCJlbCIsImFzc2lnbiIsIl9fY2hhbmdlT0NSU3RhdHVzIiwiX19vY3JTdGF0dXMiLCJfYXJndW1lbnRzNSIsIl90aGlzMTYiLCJmb3JjZVVwZGF0ZSIsInJlY29nbml6ZWRJbWFnZSIsIl9fcHJldmlvdXNJblByb2dyZXNzU3RlcCIsIl9faW5Qcm9ncmVzc1N0ZXAiLCJndWlkZUJveCIsIm1hc2tCb3hXcmFwIiwiY2FwdHVyZUJ1dHRvbiIsImJvcmRlcldpZHRoIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJDb2xvciIsIl9tYXNrQm94V3JhcCRxdWVyeVNlbCIsInF1ZXJ5U2VsZWN0b3IiLCJfY2FwdHVyZUJ1dHRvbiRxdWVyeVMiLCJvY3JNb2RlIiwiY2FsbCIsIl9fdXBkYXRlUHJldmlld1VJIiwiX19oaWRlUHJldmlld1VJIiwicHJldmlld1VJV3JhcCIsInByZXZpZXdJbWFnZSIsImltZ1N0eWxlIiwiY29udGV4dCIsIl9fZ2V0SW5wdXREZXZpY2VzIiwiX3RoaXMxNyIsIm1lZGlhRGV2aWNlcyIsImRldmljZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiY2FtZXJhIiwiZGV2aWNlIiwia2luZCIsIklucHV0RGV2aWNlSW5mbyIsImdldENhcGFiaWxpdGllcyIsIl9jYXAkZmFjaW5nTW9kZSIsImNhcCIsImZhY2luZ01vZGUiLCJfX2ZhY2luZ01vZGVDb25zdHJhaW50IiwiX2RldmljZSRsYWJlbCIsImlzVWx0cmFDYW1lcmFSZWciLCJsYWJlbCIsInB1c2giLCJkZXZpY2VJZCIsIlJlZmVyZW5jZUVycm9yIiwiX2RldmljZSRsYWJlbDIiLCJpc0JhY2tDYW1lcmFSZWciLCJjb25jYXQiLCJjaGVja1VJT3JpZW50YXRpb24iLCJjdXJyZW50Iiwib2NyIiwiaXNDaGFuZ2VkIiwiX19wcmV2VWlPcmllbnRhdGlvbiIsIl9fY2xlYXJDdXN0b21VSSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsIl90aGlzMTgiLCJ2aWRlb1dyYXAiLCJndWlkZUJveFdyYXAiLCJwcmV2ZW50VG9GcmVlemVWaWRlbyIsImN1c3RvbVVJV3JhcCIsImNhcHR1cmVVSVdyYXAiLCJjYXB0dXJlVUkiLCJwcmV2aWV3VUkiLCJzd2l0Y2hVSVdyYXAiLCJzd2l0Y2hVSSIsInByZWxvYWRpbmdVSSIsInJlbW92ZSIsIm9jclN0eWxlIiwid3JhcFN0eWxlIiwibWFyZ2luIiwib3ZlcmZsb3ciLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsIm1hc2tfZnJhbWUiLCJ2aWRlb1N0eWxlIiwicm90YXRlQ3NzIiwibWlycm9yQ3NzIiwicm90YXRlQW5kTWlycm9yQ3NzIiwidHJhbnNmb3JtIiwiY2FudmFzU3R5bGUiLCJsZWZ0IiwidG9wIiwiYm9yZGVyIiwicmlnaHQiLCJib3R0b20iLCJjdXN0b21VSVdyYXBTdHlsZSIsImNhcHR1cmVVSVdyYXBTdHlsZSIsImN1cnNvciIsImNhcHR1cmVCdXR0b25TcmNTVkciLCJfX29uQ2xpY2tDYXB0dXJlQnV0dG9uIiwicHJldmlld1VJV3JhcFN0eWxlIiwic3dpdGNoVUlXcmFwU3R5bGUiLCJzd2l0Y2hIVE1MIiwic3dpdGNoQ2hlY2tib3giLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9fb25DbGlja1N3aXRjaFVJIiwiX3JlZjEwIiwiZXZlbnQiLCJ0YXJnZXQiLCJjaGVja2VkIiwiX3gyIiwib25jZSIsInByZWxvYWRpbmdVSVdyYXBTdHlsZSIsIl9faW5pdFN0eWxlIiwiX19vY3IiLCJfX2NhbnZhcyIsIl9fcm90YXRpb25DYW52YXMiLCJfX3ZpZGVvIiwiX192aWRlb1dyYXAiLCJfX2d1aWRlQm94IiwiX19ndWlkZUJveFdyYXAiLCJfX21hc2tCb3hXcmFwIiwiX19wcmV2ZW50VG9GcmVlemVWaWRlbyIsIl9fY3VzdG9tVUlXcmFwIiwiX19jYXB0dXJlVUlXcmFwIiwiX19jYXB0dXJlVUkiLCJfX2NhcHR1cmVCdXR0b24iLCJfX3ByZXZpZXdVSVdyYXAiLCJfX3ByZXZpZXdVSSIsIl9fcHJldmlld0ltYWdlIiwiX19zd2l0Y2hVSVdyYXAiLCJfX3N3aXRjaFVJIiwiX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uIiwiZ2V0QXR0cmlidXRlIiwiX3RoaXMxOSIsImNvbnN0cmFpbnRXaWR0aCIsImNvbnN0cmFpbnRIZWlnaHQiLCJpZGVhbCIsImNvbnN0cmFpbnRzIiwiYXVkaW8iLCJ6b29tIiwiZm9jdXNNb2RlIiwid2hpdGVCYWxhbmNlTW9kZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRVc2VyTWVkaWEiLCJzdHJlYW0iLCJzdHJlYW1TZXR0aW5ncyIsImdldFZpZGVvVHJhY2tzIiwiZ2V0U2V0dGluZ3MiLCJhc3BlY3RSYXRpbyIsIl90aGlzMjAiLCJiYXNlV2lkdGgiLCJiYXNlSGVpZ2h0Iiwic2Nhbm5lckZyYW1lUmF0aW8iLCJndWlkZUJveFdpZHRoIiwiZ3VpZGVCb3hIZWlnaHQiLCJjYWxjT2NyQ2xpZW50V2lkdGgiLCJjYWxjT2NyQ2xpZW50SGVpZ2h0IiwiZ3VpZGVCb3hSYXRpb0J5V2lkdGgiLCJfX2d1aWRlQm94UmF0aW9CeVdpZHRoIiwidmlkZW9SYXRpb0J5SGVpZ2h0IiwiX192aWRlb1JhdGlvQnlIZWlnaHQiLCJyZWR1Y2VkR3VpZGVCb3hXaWR0aCIsIl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbyIsInJlZHVjZWRHdWlkZUJveEhlaWdodCIsInBhZGRpbmciLCJ2aWRlb0lubmVyR2FwIiwiYmFja2dyb3VuZENvbG9yIiwibWFza0JveElubmVyIiwiciIsIm1hc2tCb3hJbm5lcldpZHRoIiwibWFza0JveElubmVySGVpZ2h0IiwiX3RoaXMyMSIsIl9fY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJhIiwiYiIsIm5ld1ZpZGVvV2lkdGgiLCJuZXdWaWRlb0hlaWdodCIsIm5ld1ZpZGVvUmF0aW9CeVdpZHRoIiwibmV3VmlkZW9SYXRpb0J5SGVpZ2h0IiwiY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzIiwiX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzIiwiY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQiLCJjYXB0dXJlVUlQYWRkaW5nQm90dG9tIiwicGFkZGluZ1RvcCIsImJhc2VsaW5lIiwic3VtIiwiaXRlbSIsImNoaWxkTm9kZXMiLCJzdG9wU2NhbiIsIl90aGlzMjIiLCJfX3Jlc291cmNlc0xvYWRlZCIsIl9faXNTdXBwb3J0U2ltZCIsImVudkluZm8iLCJvcyIsIm9zU2ltcGxlIiwidXNlYk9DUkVudkluZm8iLCJzZGtTdXBwb3J0RW52IiwidXJsIiwiZmV0Y2giLCJocmVmIiwidGhlbiIsInJlcyIsInRleHQiLCJyZWdleCIsInNvdXJjZSIsInJlcGxhY2UiLCJSZWdFeHAiLCJldmFsIiwib25SdW50aW1lSW5pdGlhbGl6ZWQiLCJfcmVmMTEiLCJfeDMiLCJfX3N0YXJ0U2Nhbldhc21JbXBsIiwiX3RoaXMyMyIsIl9fZGV0ZWN0ZWQiLCJfX2FkZHJlc3MiLCJfX3NzYVJldHJ5Q291bnQiLCJzY2FuIiwiX3JlZjEyIiwiaXNEZXRlY3RlZENhcmQiLCJzc2FSZXN1bHQiLCJzc2FSZXN1bHRMaXN0IiwibWFza0luZm8iLCJyZXNvbHV0aW9uX3ciLCJyZXNvbHV0aW9uX2giLCJfX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZSIsInJldHJ5U3RhcnREYXRlIiwiRGF0ZSIsIkZBS0UiLCJSRUFMIiwiRU5TRU1CTEUiLCJpc0NvbXBsZXRlZCIsIl9sb29wIiwiZXhlY3V0ZSIsIl9yZWYxMyIsIl9yZXQiLCJyZXRyeVdvcmtpbmdUaW1lIiwibGVnYWN5Rm9ybWF0IiwibmV3Rm9ybWF0IiwicGFyc2VPY3JSZXN1bHQiLCJvY3JfdHlwZSIsInNzYV9tb2RlIiwiX19jb21wcmVzc0ltYWdlcyIsIm9jcl9kYXRhIiwiX19vblN1Y2Nlc3NQcm9jZXNzIiwiX19yZWNvdmVyZWQiLCJfdGhpczI0IiwicmVzaXplUmF0aW8iLCJkZWZhdWx0T3B0aW9ucyIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiY29udmVydFNpemUiLCJ0YXJnZXRDb21wcmVzc1ZvbHVtZSIsIm1hc2tpbmdJbWFnZU9wdGlvbnMiLCJxdWFsaXR5IiwiX19yZXF1ZXN0R2V0QVBJVG9rZW4iLCJjcmVkZW50aWFsIiwiYXV0aFNlcnZlckluZm8iLCJiYXNlVXJsIiwiYm9keSIsIm1ldGhvZCIsImpzb24iLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInRva2VuIiwiY2F0Y2giLCJlcnIiLCJfX3JlcXVlc3RTZXJ2ZXJPQ1IiLCJfdGhpczI1IiwiX3JlZjE0Iiwib2NyU2VydmVyQmFzZVVybCIsImFwaVRva2VuIiwibXlIZWFkZXJzIiwiSGVhZGVycyIsImFwcGVuZCIsInBhcmFtIiwiaW1hZ2VfYmFzZTY0IiwibWFza19tb2RlIiwiZmFjZV9tb2RlIiwicmF3IiwicmVxdWVzdE9wdGlvbnMiLCJyZWRpcmVjdCIsIl94NCIsIl94NSIsIl9fc3RhcnRTY2FuU2VydmVySW1wbCIsIl90aGlzMjYiLCJfcmVmMTUiLCJfdGhpczI2JF9fY2FwdHVyZUJ1dHQiLCJfcmVmMTYiLCJiYXNlNjRJbWFnZVJlc3VsdCIsIl9fZGVidWdNb2RlIiwib2NyX2FwaV9yZXNwb25zZSIsIl9vY3JSZXN1bHQzIiwicmVzdWx0Q29kZSIsInJlc3VsdE1lc3NhZ2UiLCJzY2FubmVyX3R5cGUiLCJyZXN1bHRfY29kZSIsInJlc3VsdERldGFpbCIsIl94NiIsIl94NyIsImltZ0RhdGFVUkwiLCJsaW1pdFNhdmVJbWFnZUNvdW50Iiwic2hpZnQiLCJfX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0IiwiX3RoaXMyNyIsImFwaV9yZXNwb25zZSIsInJlc3VsdF9tZXNzYWdlIiwiX3RoaXMyOCIsImVycm9yRGV0YWlsIiwic3RhY2siLCJlcnJvcl9kZXRhaWwiLCJfdGhpczI5IiwicHJlbG9hZGluZ1N0YXR1cyIsIl90aGlzMzAiLCJfdGhpczMxIiwiX19yZWNvdmVyeVNjYW4iLCJfdGhpczMyIiwiY2FudmFzQ29udGV4dCIsImNsZWFyUmVjdCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiX19yZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCIsInN0b3AiLCJ0cmFja3MiLCJnZXRUcmFja3MiLCJmb3JFYWNoIiwidHJhY2siLCJyZXN0b3JlSW5pdGlhbGl6ZSIsImNsZWFyVGltZW91dCJdLCJzb3VyY2VzIjpbIm9jci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyogZ2xvYmFsLW1vZHVsZSAqL1xuaW1wb3J0IGRldGVjdG9yIGZyb20gJy4vaGVscGVycy9kZXRlY3Rvci5qcyc7XG5pbXBvcnQgdXNlYk9DUldBU01QYXJzZXIgZnJvbSAnLi9oZWxwZXJzL3VzZWItb2NyLXdhc20tcGFyc2VyLmpzJztcbmltcG9ydCB1c2ViT0NSQVBJUGFyc2VyIGZyb20gJy4vaGVscGVycy91c2ViLW9jci1hcGktcGFyc2VyLmpzJztcbmltcG9ydCB7IGlzU3VwcG9ydFdhc20sIG1lYXN1cmUsIHNpbWQsIHRocmVhZHMgfSBmcm9tICcuL2hlbHBlcnMvd2FzbS1mZWF0dXJlLWRldGVjdC5qcyc7XG5pbXBvcnQgSW1hZ2VVdGlsIGZyb20gJy4vaGVscGVycy9pbWFnZS11dGlsLmpzJztcbmxldCBpbnN0YW5jZTtcbmNsYXNzIFVzZUJPQ1Ige1xuICBJTl9QUk9HUkVTUyA9IHtcbiAgICBOT05FOiAnbm9uZScsXG4gICAgTk9UX1JFQURZOiAnbm90X3JlYWR5JyxcbiAgICBSRUFEWTogJ3JlYWR5JyxcbiAgICBDQVJEX0RFVEVDVF9TVUNDRVNTOiAnZGV0ZWN0X3N1Y2Nlc3MnLFxuICAgIENBUkRfREVURUNUX0ZBSUxFRDogJ2RldGVjdF9mYWlsZWQnLFxuICAgIE1BTlVBTF9DQVBUVVJFX1NVQ0NFU1M6ICdtYW51YWxfY2FwdHVyZV9zdWNjZXNzJyxcbiAgICBNQU5VQUxfQ0FQVFVSRV9GQUlMRUQ6ICdtYW51YWxfY2FwdHVyZV9mYWlsZWQnLFxuICAgIE9DUl9SRUNPR05JWkVEOiAncmVjb2duaXplZCcsXG4gICAgT0NSX1JFQ09HTklaRURfV0lUSF9TU0E6ICdyZWNvZ25pemVkX3dpdGhfc3NhJyxcbiAgICBPQ1JfU1VDQ0VTUzogJ29jcl9zdWNjZXNzJyxcbiAgICBPQ1JfU1VDQ0VTU19XSVRIX1NTQTogJ29jcl9zdWNjZXNzX3dpdGhfc3NhJyxcbiAgICBPQ1JfRkFJTEVEOiAnb2NyX2ZhaWxlZCdcbiAgfTtcbiAgT0NSX1NUQVRVUyA9IHtcbiAgICBOT1RfUkVBRFk6IC0xLFxuICAgIFJFQURZOiAwLFxuICAgIE9DUl9TVUNDRVNTOiAxLFxuICAgIERPTkU6IDJcbiAgfTtcbiAgUFJFTE9BRElOR19TVEFUVVMgPSB7XG4gICAgTk9UX1NUQVJURUQ6IC0xLFxuICAgIFNUQVJURUQ6IDAsXG4gICAgRE9ORTogMVxuICB9O1xuICBPQ1JfSU1HX01PREUgPSB7XG4gICAgV0FSUElORzogMCxcbiAgICBDUk9QUElORzogMSxcbiAgICBOT05FOiAyXG4gIH07XG4gIE9DUl9JTUdfTUFTS19NT0RFID0ge1xuICAgIEZBTFNFOiAwLFxuICAgIFRSVUU6IDFcbiAgfTtcblxuICAvKiogcHVibGljIHByb3BlcnRpZXMgKi9cblxuICAvKiogcHJpdmF0ZSBwcm9wZXJ0aWVzICovXG4gIF9fZGVidWdNb2RlID0gZmFsc2U7XG4gIF9fT0NSRW5naW5lID0gbnVsbDtcbiAgX19pc1N1cHBvcnRXYXNtID0gZmFsc2U7XG4gIF9faXNTdXBwb3J0U2ltZCA9IGZhbHNlO1xuICBfX2luaXRpYWxpemVkID0gZmFsc2U7XG4gIF9fcHJlbG9hZGVkID0gZmFsc2U7XG4gIF9fcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQ7XG4gIF9fbGljZW5zZTtcbiAgX19vY3JUeXBlO1xuICBfX3NzYU1vZGUgPSBmYWxzZTtcbiAgX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuTk9UX1JFQURZO1xuICBfX21hbnVhbE9DUk1heFJldHJ5Q291bnQgPSAxMDtcbiAgX19tYW51YWxPQ1JSZXRyeUNvdW50ID0gMDtcbiAgX19zc2FSZXRyeUNvdW50ID0gMDtcbiAgX19kZXRlY3RlZENhcmRRdWV1ZSA9IFtdO1xuICBfX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0ID0gW107XG4gIF9fb25TdWNjZXNzID0gbnVsbDtcbiAgX19vbkZhaWx1cmUgPSBudWxsO1xuICBfX29uSW5Qcm9ncmVzc0NoYW5nZSA9IG51bGw7XG4gIF9fb2NyVHlwZUxpc3QgPSBbJ2lkY2FyZCcsICdkcml2ZXInLCAncGFzc3BvcnQnLCAnZm9yZWlnbi1wYXNzcG9ydCcsICdhbGllbicsICdhbGllbi1iYWNrJywgJ2NyZWRpdCcsICdpZGNhcmQtc3NhJywgJ2RyaXZlci1zc2EnLCAncGFzc3BvcnQtc3NhJywgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJywgJ2FsaWVuLXNzYSddO1xuICBfX29jclR5cGVOdW1iZXJUb1N0cmluZyA9IG5ldyBNYXAoW1snMScsICdpZGNhcmQnXSwgWycyJywgJ2RyaXZlciddLCBbJzMnLCAncGFzc3BvcnQnXSwgWyc0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnXSwgWyc1JywgJ2FsaWVuJ10sIFsnNS0xJywgJ2FsaWVuJ10sIFsnNS0yJywgJ2FsaWVuJ10sIFsnNS0zJywgJ2FsaWVuJ11dKTtcbiAgX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIgPSBuZXcgTWFwKFtbJ2lkY2FyZCcsICcxJ10sIFsnZHJpdmVyJywgJzInXSwgWydwYXNzcG9ydCcsICczJ10sIFsnZm9yZWlnbi1wYXNzcG9ydCcsICc0J10sIFsnYWxpZW4nLCAnNSddLCBbJ2FsaWVuJywgJzUtMSddLCBbJ2FsaWVuJywgJzUtMiddLCBbJ2FsaWVuJywgJzUtMyddXSk7XG4gIF9fcGFnZUVuZCA9IGZhbHNlO1xuICBfX29jcjtcbiAgX19jYW52YXM7XG4gIF9fcm90YXRpb25DYW52YXM7XG4gIF9fdmlkZW87XG4gIF9fdmlkZW9XcmFwO1xuICBfX2d1aWRlQm94O1xuICBfX2d1aWRlQm94V3JhcDtcbiAgX19tYXNrQm94V3JhcDtcbiAgX19wcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgX19jdXN0b21VSVdyYXA7XG4gIF9fdG9wVUk7XG4gIF9fbWlkZGxlVUk7XG4gIF9fYm90dG9tVUk7XG4gIF9fcHJldmlld1VJV3JhcDtcbiAgX19wcmV2aWV3VUk7XG4gIF9fcHJldmlld0ltYWdlO1xuICBfX2NhcHR1cmVVSVdyYXA7XG4gIF9fY2FwdHVyZVVJO1xuICBfX3N3aXRjaFVJV3JhcDtcbiAgX19zd2l0Y2hVSTtcbiAgX19jYXB0dXJlQnV0dG9uO1xuICBfX2FkZHJlc3MgPSAwO1xuICBfX2RldGVjdGVkID0gZmFsc2U7XG4gIF9fcmVjb3ZlcmVkID0gZmFsc2U7XG4gIF9fQnVmZmVyID0gbnVsbDtcbiAgX19yZXN1bHRCdWZmZXIgPSBudWxsO1xuICBfX21hc2tJbmZvUmVzdWx0QnVmID0gbnVsbDtcbiAgX19QcmV2SW1hZ2UgPSBudWxsO1xuICBfX3N0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICBfX2NhbVNldENvbXBsZXRlID0gZmFsc2U7XG4gIF9fcmVzb2x1dGlvbldpZHRoID0gMDtcbiAgX19yZXNvbHV0aW9uSGVpZ2h0ID0gMDtcbiAgX192aWRlb1dpZHRoID0gMDtcbiAgX192aWRlb0hlaWdodCA9IDA7XG4gIF9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIF9faW50ZXJ2YWxUaW1lcjtcbiAgX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyO1xuICBfX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCA9IDA7XG4gIF9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQ7XG4gIF9fc3RyZWFtO1xuICBfX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICBfX2ZhY2luZ01vZGVDb25zdHJhaW50ID0gJ2Vudmlyb25tZW50JztcbiAgX191aU9yaWVudGF0aW9uID0gJyc7XG4gIF9fcHJldlVpT3JpZW50YXRpb24gPSAnJztcbiAgX192aWRlb09yaWVudGF0aW9uID0gJyc7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gbnVsbDtcbiAgX190aHJvdHRsaW5nUmVzaXplRGVsYXkgPSA1MDA7XG4gIF9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPSAzMDA7IC8vIOyehOyLnFxuICBfX3JldHJ5Q291bnRHZXRBZGRyZXNzID0gMDsgLy8g7J6E7IucXG4gIF9fZGV2aWNlSW5mbztcbiAgX19pc1JvdGF0ZWQ5MG9yMjcwID0gZmFsc2U7XG4gIF9faW5Qcm9ncmVzc1N0ZXAgPSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTtcbiAgX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT05FO1xuICBfX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICBfX2d1aWRlQm94UmF0aW9CeVdpZHRoID0gMS4wOyAvLyDsiJjsoJXrtojqsIBcbiAgX192aWRlb1JhdGlvQnlIZWlnaHQgPSAwLjk7IC8vIOyImOygleu2iOqwgFxuICBfX2d1aWRlQm94UmVkdWNlUmF0aW8gPSAwLjg7IC8vIOyImOygleu2iOqwgFxuICBfX2Nyb3BJbWFnZVNpemVXaWR0aCA9IDA7XG4gIF9fY3JvcEltYWdlU2l6ZUhlaWdodCA9IDA7XG4gIF9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBmYWxzZTtcblxuICAvKiogRGVmYXVsdCBvcHRpb25zICovXG4gIF9fb3B0aW9ucyA9IG5ldyBPYmplY3Qoe1xuICAgIC8vIOuUlOuyhOq5hSDsmLXshZhcbiAgICBzaG93Q2xpcEZyYW1lOiBmYWxzZSxcbiAgICAvLyBjaWxwLWZyYW1lIOuztOq4sFxuICAgIHNob3dDYW52YXNQcmV2aWV3OiBmYWxzZSxcbiAgICAvLyBjYW52YXMgcHJldmlldyDrs7TquLBcblxuICAgIC8vIOy2nOugpSDsmLXshZhcbiAgICAvLyDslZTtmLjtmZRcbiAgICB1c2VFbmNyeXB0TW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo6rCc7J246rOg7Jyg7Iud67OE67aA7Zi4IOq0gOugqCDtla3rqqkg7JWU7Zi47ZmUKVxuICAgIHVzZUVuY3J5cHRBbGxNb2RlOiBmYWxzZSxcbiAgICAvLyDslZTtmLjtmZQg7KCB7JqpICjsoITssrQg7JWU7Zi47ZmULCBlbmNyeXB0IG9iamVjdCDrs4Trj4Qg7KCc6rO1KVxuICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgLy8gdXNlUGlpRW5jcnlwdE1vZGU6IGZhbHNlLCAvLyDslZTtmLjtmZQg7KCB7JqpIChwaWkpXG4gICAgLy8gdXNlUGlpRW5jcnlwdEZhY2U6IGZhbHNlLCAvLyDsi6DrtoTspp0g7Ja86rW07IKs7KeEIOyVlO2YuO2ZlCDsoIHsmqkgKHBpaSlcbiAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICB1c2VMZWdhY3lGb3JtYXQ6IGZhbHNlLFxuICAgIC8vIExlZ2FjeSBmb3JtYXQg7KeA7JuQXG4gICAgdXNlTWFza0luZm86IHRydWUsXG4gICAgLy8g66eI7Iqk7YK5IOyijO2RnCDsp4Dsm5BcbiAgICB1c2VGYWNlSW1hZ2U6IHRydWUsXG4gICAgLy8g7Iug67aE7KadIOuCtCDslrzqtbQg7IKs7KeEXG4gICAgdXNlSW1hZ2VXYXJwaW5nOiBmYWxzZSxcbiAgICAvLyDsi6DrtoTspp0g7J2066+47KeA66W8IFdhcnBpbmco7Jmc6rOhIOuztOyglSDtlaDsp4Ag7Jes67aAKVxuICAgIHVzZUNvbXByZXNzSW1hZ2U6IGZhbHNlLFxuICAgIC8vIOyLoOu2hOymnSDsnbTrr7jsp4Drpbwg7JWV7LaV7ZWg7KeAIOyXrOu2gFxuICAgIHVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aDogMTA4MCxcbiAgICAvLyDsnbTrr7jsp4Ag66as7IKs7J207KeVIOqwgOuhnCDtlbTsg4Hrj4RcbiAgICB1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lOiAxMDI0ICogNTAsXG4gICAgLy8g7J2066+47KeAIOyVley2lSDrqqntkZwg7Jqp65+JXG5cbiAgICAvLyBVSSDshKTsoJVcbiAgICB1c2VUb3BVSTogdHJ1ZSxcbiAgICAvLyDsg4Hri6ggVUlcbiAgICB1c2VUb3BVSVRleHRNc2c6IGZhbHNlLFxuICAgIC8v7IOB64uoIFVJID4gVEVYVFxuICAgIHVzZU1pZGRsZVVJOiB0cnVlLFxuICAgIC8v7KSR64uoIFVJXG4gICAgdXNlTWlkZGxlVUlUZXh0TXNnOiB0cnVlLFxuICAgIC8vIOykkeuLqCBVSSA+IFRFWFRcbiAgICB1c2VCb3R0b21VSTogdHJ1ZSxcbiAgICAvLyDtlZjri6ggVUlcbiAgICB1c2VCb3R0b21VSVRleHRNc2c6IGZhbHNlLFxuICAgIC8vIO2VmOuLqCBVSSA+IFRFWFRcbiAgICB1c2VQcmV2aWV3VUk6IHRydWUsXG4gICAgLy8gUHJldmlldyBVSVxuICAgIHVzZUNhcHR1cmVVSTogdHJ1ZSxcbiAgICAvLyDsuqHsspjrsoTtirwgVUlcbiAgICBwcmVsb2FkaW5nVUlUZXh0TXNnOiAn7Iug67aE7Kad7J247KadIOuqqOuTiOydhCDrtojrn6zsmKTripQg7KSRIOyeheuLiOuLpDxiciAvPuyeoOyLnOunjCDquLDri6TroKTso7zshLjsmpQnLFxuICAgIC8vIOyduOyLnSDtlITroIjsnoQg7Ji17IWYXG4gICAgZnJhbWVCb3JkZXJTdHlsZToge1xuICAgICAgd2lkdGg6IDUsXG4gICAgICAvLyBib3JkZXItd2lkdGhcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICAvLyBib3JkZXItcmFkaXVzXG4gICAgICBzdHlsZTogJ3NvbGlkJyxcbiAgICAgIC8vIGJvcmRlci1zdHlsZVxuXG4gICAgICAvLyDri6jqs4Trs4Qg7J247IudIO2UhOugiOyehCBib3JkZXIg7IOJ7IOBXG4gICAgICBub3RfcmVhZHk6ICcjMDAwMDAwJyxcbiAgICAgIC8vIOyKpOy6lOykgOu5hCA6IOqygOyglVxuICAgICAgcmVhZHk6ICcjYjhiOGI4JyxcbiAgICAgIC8vIOyKpOy6lOuMgOq4sCA6IO2ajOyDiVxuICAgICAgZGV0ZWN0X3N1Y2Nlc3M6ICcjNWU4ZmZmJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDshLHqs7UgOiDtlZjriphcbiAgICAgIGRldGVjdF9mYWlsZWQ6ICcjNzI1YjY3JyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDsi6TtjKggOiDrs7TrnbxcbiAgICAgIG1hbnVhbF9jYXB0dXJlX3N1Y2Nlc3M6ICcjNWU4ZmZmJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDshLHqs7UgOiDtlZjriphcbiAgICAgIG1hbnVhbF9jYXB0dXJlX2ZhaWxlZDogJyM3MjViNjcnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyLpO2MqCA6IOuztOudvFxuICAgICAgcmVjb2duaXplZDogJyMwMDNhYzInLFxuICAgICAgLy8gT0NS7JmE66OMIDog7YyM656RXG4gICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiAnIzAwM2FjMicsXG4gICAgICAvLyDsgqzrs7jtjJDrs4TspJEo7IKs67O47YyQ67OEIE9OKSA6IO2MjOuekVxuICAgICAgb2NyX3N1Y2Nlc3M6ICcjMTRiMDBlJyxcbiAgICAgIC8vIE9DUuyZhOujjCA6IOy0iOuhnVxuICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6ICcjMTRiMDBlJyxcbiAgICAgIC8vIE9DUuyZhOujjCjsgqzrs7jtjJDrs4QgT04pIDog7LSI66GdXG4gICAgICBvY3JfZmFpbGVkOiAnI0ZBMTEzRCcgLy8gT0NS7Iuk7YyoIDog67mo6rCVXG4gICAgfSxcblxuICAgIC8vIOuniOyKpO2BrCDtlITroIjsnoQgZmlsbCDsu6zrn6wg67OA6rK9IOyCrOyaqSDsl6zrtoBcbiAgICB1c2VNYXNrRnJhbWVDb2xvckNoYW5nZTogdHJ1ZSxcbiAgICAvLyDrp4jsiqTtgawg7ZSE66CI7J6EIOyYteyFmCAo7Lm066mU6528IOu5hOuUlOyYpCDsmIHsl63sl5DshJwg7J247IudIO2UhOugiOyehOunjCDrs7TsnbTqsowg7ZWY6rOgIOuCmOuouOyngOulvCDrja7slrTsk7DripQg7ZSE66CI7J6EIOyYgeyXrSlcbiAgICBtYXNrRnJhbWVTdHlsZToge1xuICAgICAgY2xpcF9mcmFtZTogJyNmZjAwYmYnLFxuICAgICAgLy8gY2xpcC1mcmFtZSDsg4nsg4EgOiDrlKXtjbztlIwgKOyImOygleu2iOqwgClcbiAgICAgIGJhc2VfY29sb3I6ICcjMzMzMzMzJyxcbiAgICAgIC8vIG1hc2stZnJhbWUg7IOJ7IOBIDog64uk7YGs6re466CI7J20ICjtiKzrqoXrj4TripQg7IiY7KCV67aI6rCAIGZm66GcIOqzoOyglSlcblxuICAgICAgLy8g64uo6rOE67OEIOuniOyKpO2BrCDtlITroIjsnoQgZmlsbCDsg4nsg4FcbiAgICAgIG5vdF9yZWFkeTogJyMzMzMzMzMnLFxuICAgICAgLy8g7Iqk7LqU7KSA67mEXG4gICAgICByZWFkeTogJyMzMzMzMzMnLFxuICAgICAgLy8g7Iqk7LqU64yA6riwXG4gICAgICBkZXRlY3Rfc3VjY2VzczogJyMyMjIyMjInLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyEseqztVxuICAgICAgZGV0ZWN0X2ZhaWxlZDogJyMzMzMzMzMnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyLpO2MqFxuICAgICAgbWFudWFsX2NhcHR1cmVfc3VjY2VzczogJyMyMjIyMjInLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyEseqztVxuICAgICAgbWFudWFsX2NhcHR1cmVfZmFpbGVkOiAnIzMzMzMzMycsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7Iuk7YyoXG4gICAgICByZWNvZ25pemVkOiAnIzIyMjIyMicsXG4gICAgICAvLyBPQ1LsmYTro4xcbiAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOyCrOuzuO2MkOuzhOykkSjsgqzrs7jtjJDrs4QgT04pXG4gICAgICBvY3Jfc3VjY2VzczogJyMxMTExMTEnLFxuICAgICAgLy9PQ1LsmYTro4xcbiAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiAnIzExMTExMScsXG4gICAgICAvLyBPQ1LsmYTro4wo7IKs67O47YyQ67OEIE9OKVxuICAgICAgb2NyX2ZhaWxlZDogJyMxMTExMTEnIC8vIE9DUuyLpO2MqFxuICAgIH0sXG5cbiAgICAvLyDstKzsmIHsmLXshZhcbiAgICB1c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlOiBmYWxzZSxcbiAgICAvLyDsoIDsgqzslpEg64uo66eQ7JeQ7IScIOyEnOuyhE9DUuuhnCDsnpDrj5kg7KCE7ZmYIOq4sOuKpVxuICAgIHVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZTogZmFsc2UsXG4gICAgLy8g7IiY64+Z7Jy866GcIOyEnOuyhE9DUiDsoITtmZgg6riw64qlICjsiJjrj5nsnbQgdHJ1ZeydtOuptCDsnpDrj5nsnYAg66y07Iuc65CoKVxuICAgIHN3aXRjaFRvU2VydmVyVGhyZXNob2xkOiAyMC4wLFxuICAgIC8vIOyekOuPmeyghO2ZmCDquLDspIDqsJIgKOyEseuKpSDsuKHsoJXsuZggbXMpXG4gICAgdXNlRm9yY2VDb21wbGV0ZVVJOiBmYWxzZSxcbiAgICAvLyBXQVNNIOuqqOuTnOydvOuVjCDrsoTtirwg64iE66W87IucIO2VtOuLuSDsi5zsoJDsl5Ag6rCV7KCc66GcIOyZhOujjCDsgqzsmqnsl6zrtoBcblxuICAgIC8vIOyImOuPmey0rOyYgSDrsoTtirwg7Ji17IWYXG4gICAgY2FwdHVyZUJ1dHRvblN0eWxlOiB7XG4gICAgICBzdHJva2VfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIC8vIOuyhO2KvCDthYzrkZDrpqwoc3Ryb2tlKSDsg4nsg4FcbiAgICAgIGJhc2VfY29sb3I6ICcjNWU4ZmZmJyAvLyDrsoTtirwg7IOJ7IOBXG4gICAgfSxcblxuICAgIHJlc291cmNlQmFzZVVybDogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAvLyB3YXNtLCBkYXRhIO2MjOydvCDrpqzshozsiqQgYmFzZSDqsr3roZwgKENETiDsgqzsmqnsi5wg67OA6rK9KVxuICAgIGRldmljZUxhYmVsOiAnJyxcbiAgICB2aWRlb1RhcmdldElkOiAnJyxcbiAgICAvLyDsubTrqZTrnbwg7ISk7KCVXG4gICAgcm90YXRpb25EZWdyZWU6IDAsXG4gICAgLy8gcm90YXRpb24tZGVncmVlIOy5tOuplOudvOqwgCDtmozsoITrkJwg6rCB64+EICg5MCwgMTkwLCAyNzApXG4gICAgbWlycm9yTW9kZTogZmFsc2UsXG4gICAgLy8gbWlycm9yLW1vZGUg7IWA7ZS8IOy5tOuplOudvCjtgqTsmKTsiqTtgawg65OxKSDsgqzsmqnsi5wg7KKM7JqwIOuwmOyghFxuICAgIGNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWw6IDEwMDAsXG4gICAgLy8g7Lm066mU6528IOumrOyGjOyKpCDsnqzsmpTssq0g6rCE6rKpKG1zKVxuICAgIGNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQ6IC0xLFxuICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIOy1nOuMgCDtmp/siJgsIC0x7J2066m0IOustO2VnCDsnqzsmpTssq0uXG5cbiAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSAgOiAnY29tcGF0aWJpbGl0eScgKO2YuO2ZmOyEsSDsmrDshKApIHx8ICdoaWdoUXVhbGl0eScgKOqzoO2ZlOyniCDsmrDshKApXG4gICAgLy8gY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhOiAnY29tcGF0aWJpbGl0eScsIC8vIO2YuO2ZmOyEsSDsmrDshKAo6raM7J6lLCDrlJTtj7TtirgpIDogNzIw7Jy866GcIOqzoOyglSwg7KCA7IKs7JaRIOuLqOunkOq4sCDtmLjtmZjshLEg7KKL7J2MXG4gICAgY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhOiAnaGlnaFF1YWxpdHknLFxuICAgIC8vIOqzoO2ZlOyniCDsmrDshKAgOiAxMDgw7J20IOqwgOuKpe2VmOuptCAxMDgwIOu2iOqwgOuKpe2VmOuptCA3MjBcblxuICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg7ISk7KCVIDogJ2NhbWVyYVJlc29sdXRpb24nICjsubTrqZTrnbwg7ZW07IOB64+EKSB8fCAnb2NyVmlld1NpemUnIChvY3IgZGl2IO2BrOq4sClcbiAgICBjYWxjR3VpZGVCb3hDcml0ZXJpYTogJ2NhbWVyYVJlc29sdXRpb24nLFxuICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg6riw7KSAKOq2jOyepSwg65SU7Y+07Yq4KSA6IDcyMHgxMjgwIO2VtOyDgeuPhCjshLjroZzrqqjrk5wpIOydvOuVjCBvY3IgdmlldyB3aWR0aCBzaXpl6rCAIDcyMOuztOuLpCDtgbAg6rK97JqwLCDqsIDsnbTrk5wg67CV7Iqk66W8IDcyMOyXkCDrp57stqQgKHByZXZpZXcg7ZmU66m0IOq5qOynkCDsl4bsnYwpXG4gICAgLy8gY2FsY0d1aWRlQm94Q3JpdGVyaWE6ICdvY3JWaWV3U2l6ZScsIC8vIO2ZlOuptCDsgqzsnbTspogg6riw7KSAIDogNzIweDEyODAg7ZW07IOB64+EKOyEuOuhnOuqqOuTnCkg7J2865WMIG9jciB2aWV3IHdpZHRoIHNpemXqsIAgNzIw67O064ukIO2BsOqyveyasCwg6rCA7J2065OcIOuwleyKpOulvCBvY3IgdmlldyB3aWR0aCDsgqzsl5Dspojsl5Ag66ee7LakIChwcmV2aWV3IO2ZlOuptCDqsJXsoJzroZwg64qY66as6riwIOuVjOusuOyXkCDri6Tshowg6rmo7KeQKVxuXG4gICAgLy8g7IKs67O47YyQ67OEIFJFVFJZIOyEpOyglVxuICAgIC8vIHNzYVJldHJ5VHlwZVxuICAgIC8vICAgLSBSRUFMICAgICA6IOuzuOyduChSRUFMKSDqsbDrtoDsnKggLT4gRmFsc2UgTmVnYXRpdmUo7Iuk7KCc6rCS7J2AIFJFQUzsnbjrjbAg7JiI7Lih6rCS7J2AIEZBS0XrnbzshJwg7YuA66aw6rK97JqwKeulvCDrgq7stpTquLAg7JyE7ZW0LFxuICAgIC8vICAgLSBGQUtFICAgICA6IO2DgOyduChGQUtFKSDsiJjrnb3snKggLT4gRmFsc2UgUG9zaXRpdmUo7Iuk7KCc6rCS7J2AIEZBS0XsnbjrjbAg7JiI7Lih6rCS7J2AIFJFQUzsnbTrnbzshJwg7YuA66aw6rK97JqwKeulvCDrgq7stpTquLAg7JyE7ZW0XG4gICAgLy8gICAtIEVOU0VNQkxFIDog7Y+J6regIOygiOuMgOqwkiAtPiBzc2FNYXhSZXRyeUNvdW50IOunjO2BvCDrsJjrs7Ug7IiY7ZaJ7ZWY6rOgIGZkX2NvbmZpZGVuY2Ug7KCI64yA6rCSIOqwkuydmCDtj4nqt6DsnLzroZwg7YyQ7KCVXG4gICAgLy8gc3NhTWF4UmV0cnlDb3VudCDshKTsoJUg6rCS66eM7YG8IOyerOyLnOuPhO2VmOyXrCDtlZzrsojsnbTrnbzrj4Qg6riw7KSA6rCSKFJFQUwg65iQ64qUIEZBS0Up7J20IOucqOuptCDquLDspIDqsJIoUkVBTCDrmJDripQgRkFLRSnroZwg7YyQ7KCVXG4gICAgc3NhUmV0cnlUeXBlOiAnRU5TRU1CTEUnLFxuICAgIHNzYVJldHJ5UGl2b3Q6IDAuNSxcbiAgICAvLyBSRUFML0ZBS0Xrpbwg7YyQ7KCV7ZWY64qUIGZkX2NvbmZpZGVuY2Ug6riw7KSA6rCSICh3YXNtIOuwsO2PrCDrsoTsoITsl5Ag65Sw6528IOuLpOumhCkg4oC7IOyImOygleu2iOqwgFxuICAgIHNzYU1heFJldHJ5Q291bnQ6IDAsXG4gICAgLy8g7LWc64yAIFJFVFJZIO2ajOyImOyEpOyglSAw7J2066m0IOuvuOyCrOyaqVxuXG4gICAgLy8gdGhpcy5fX2RlYnVnKCnrpbwg7Ya17ZW0IOywjeydgCDrqZTsi5zsp4DrpbwgYWxlcnTsnLzroZwg652E7Jq47KeAIOyXrOu2gFxuICAgIHVzZURlYnVnQWxlcnQ6IGZhbHNlXG4gIH0pO1xuXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoaW5zdGFuY2UpIHJldHVybiBpbnN0YW5jZTtcbiAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgLyoqIHB1YmxpYyBtZXRob2RzICovXG4gIGFzeW5jIHByZWxvYWRpbmcob25QcmVsb2FkZWQpIHtcbiAgICBpZiAodGhpcy5pc1ByZWxvYWRlZCgpKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuc2hvd09DUkxvYWRpbmdVSSgpO1xuICAgICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLlNUQVJURUQ7XG4gICAgICBhd2FpdCB0aGlzLl9fbG9hZFJlc291cmNlcygpO1xuICAgICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLkRPTkU7XG4gICAgICB0aGlzLl9fcHJlbG9hZGVkID0gdHJ1ZTtcbiAgICAgIGlmIChvblByZWxvYWRlZCkgb25QcmVsb2FkZWQoKTtcbiAgICAgIHRoaXMuaGlkZU9DUkxvYWRpbmdVSSgpO1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBpc0luaXRpYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl9faW5pdGlhbGl6ZWQ7XG4gIH1cbiAgaXNQcmVsb2FkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkZWQ7XG4gIH1cbiAgZ2V0UHJlbG9hZGluZ1N0YXR1cygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXM7XG4gIH1cbiAgaXNFbmNyeXB0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdE1vZGUgfHwgdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdEFsbE1vZGU7XG4gIH1cbiAgaXNDcmVkaXRDYXJkKCkge1xuICAgIHJldHVybiB0aGlzLl9fb2NyVHlwZSA9PT0gJ2NyZWRpdCc7XG4gIH1cbiAgc2hvd09DUkxvYWRpbmdVSSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKHByZWxvYWRpbmdVSVdyYXApIHtcbiAgICAgIHByZWxvYWRpbmdVSVdyYXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9XG4gIH1cbiAgaGlkZU9DUkxvYWRpbmdVSSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKHByZWxvYWRpbmdVSVdyYXApIHtcbiAgICAgIHByZWxvYWRpbmdVSVdyYXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH1cbiAgZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KSB7XG4gICAgaWYgKHRoaXMuaXNDcmVkaXRDYXJkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFbmNyeXB0TW9kZSgpICYmIHRoaXMuX19pc1N1cHBvcnRXYXNtKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdE1vZGUpIHtcbiAgICAgICAgY29uc3QgaW5jbHVkZUxpc3QgPSBbJ2p1bWluJywgJ2RyaXZlcl9udW1iZXInLCAncGFzc3BvcnRfbnVtYmVyJywgJ3BlcnNvbmFsX251bWJlcicsICdtcnoyJ107XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZCA9IHtcbiAgICAgICAgICBvY3JfcmVzdWx0OiBfLnRvUGFpcnMoXy5waWNrKHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgaW5jbHVkZUxpc3QpKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlKVxuICAgICAgICB9O1xuICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQgPSB7XG4gICAgICAgICAgLi4ucmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LFxuICAgICAgICAgIC4uLmVuY3J5cHRlZC5vY3JfcmVzdWx0XG4gICAgICAgIH07XG4gICAgICAgIHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSA9IGVuY3J5cHRlZC5vY3Jfb3JpZ2luX2ltYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXhjbHVkZUxpc3QgPSBbJ2NvbXBsZXRlJywgJ3Jlc3VsdF9zY2FuX3R5cGUnLCAnY29sb3JfcG9pbnQnLCAnZm91bmRfZmFjZScsICdzcGVjdWxhcl9yYXRpbycsICdzdGFydF90aW1lJywgJ2VuZF90aW1lJywgJ2ZkX2NvbmZpZGVuY2UnLCAnaWRfdHJ1dGgnLCAnaWRfdHJ1dGhfcmV0cnlfY291bnQnXTtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIHJldmlld19yZXN1bHQuZW5jcnlwdGVkID0ge1xuICAgICAgICAgIG9jcl9yZXN1bHQ6IF8udG9QYWlycyhfLm9taXQocmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LCBleGNsdWRlTGlzdCkpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSwge30pLFxuICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UpLFxuICAgICAgICAgIG9jcl9tYXNraW5nX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfbWFza2luZ19pbWFnZSksXG4gICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9mYWNlX2ltYWdlKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRPQ1JFbmdpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmU7XG4gIH1cbiAgaW5pdChzZXR0aW5ncykge1xuICAgIGlmICghISFzZXR0aW5ncy5saWNlbnNlS2V5KSB0aHJvdyBuZXcgRXJyb3IoJ0xpY2Vuc2Uga2V5IGlzIGVtcHR5Jyk7XG4gICAgdGhpcy5fX2xpY2Vuc2UgPSBzZXR0aW5ncy5saWNlbnNlS2V5O1xuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSBfLm1lcmdlKHt9LCB0aGlzLl9fb3B0aW9ucywgc2V0dGluZ3MpO1xuICAgIHRoaXMuc2V0T3B0aW9uKG1lcmdlZE9wdGlvbnMpO1xuICAgIHZvaWQgMDtcbiAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZCgpKSB7XG4gICAgICB0aGlzLl9fd2luZG93RXZlbnRCaW5kKCk7XG4gICAgICB0aGlzLl9fZGV2aWNlSW5mbyA9IGRldGVjdG9yLmdldE9zVmVyc2lvbigpO1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhpcy5fX2lzU3VwcG9ydFdhc20gPSBpc1N1cHBvcnRXYXNtKCk7XG4gICAgICBpZiAoIXRoaXMuX19pc1N1cHBvcnRXYXNtKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgaXMgbm90IHN1cHBvcnRlZC4gaW4gdGhpcyBicm93c2VyLicpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgc2V0T3B0aW9uKHNldHRpbmdzKSB7XG4gICAgdGhpcy5fX29wdGlvbnMgPSBzZXR0aW5ncztcbiAgfVxuICBnZXRPcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zO1xuICB9XG4gIGdldE9jclR5cGUodHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9fb2NyVHlwZU51bWJlclRvU3RyaW5nLmdldCh0eXBlKTtcbiAgfVxuICBnZXRPY3JUeXBlTnVtYmVyKHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9fb2NyU3RyaW5nVG9UeXBlTnVtYmVyLmdldChzdHJpbmcpO1xuICB9XG4gIGdldFVJT3JpZW50YXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX191aU9yaWVudGF0aW9uO1xuICB9XG4gIGdldFZpZGVvT3JpZW50YXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX192aWRlb09yaWVudGF0aW9uO1xuICB9XG4gIGFzeW5jIGNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlKCkge1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgIC8vIOyImOuPmeyghO2ZmCBvbiDsnbTrqbQg7IiY64+Z7KCE7ZmYIOyasOyEoFxuICAgICAgcmV0dXJuIHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g7IiY64+Z7KCE7ZmYIG9mZiDsnbTrqbQg7J6Q64+Z7KCE7ZmYIOyytO2BrFxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8g7J6Q64+Z7KCE7ZmYIG9u7J2865WMXG4gICAgICAgIC8vIOyEseuKpSDsuKHsoJXqsJLsnYQg6riw7KSA7Jy866GcIFdBU00gb3IgU2VydmVyXG4gICAgICAgIGNvbnN0IFtsYXRlbmN5UGVyMTAwbXMsIG1lYXN1cmVSZXBvcnRdID0gYXdhaXQgbWVhc3VyZSgpO1xuICAgICAgICB0aGlzLl9fZGVidWcobWVhc3VyZVJlcG9ydCk7XG4gICAgICAgIHJldHVybiBsYXRlbmN5UGVyMTAwbXMgPiB0aGlzLl9fb3B0aW9ucy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOyImOuPmeyghO2ZmOuPhCBvZmYsIOyekOuPmeyghO2ZmCBvZmZcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBzdGFydE9DUih0eXBlLCBvblN1Y2Nlc3MsIG9uRmFpbHVyZSwgb25JblByb2dyZXNzQ2hhbmdlID0gbnVsbCkge1xuICAgIGlmICghISF0eXBlIHx8ICEhIW9uU3VjY2VzcyB8fCAhISFvbkZhaWx1cmUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gYXdhaXQgdGhpcy5jaGVja1N3aXRjaFRvU2VydmVyTW9kZSgpO1xuICAgIHRoaXMuX19vY3JUeXBlID0gdHlwZTtcbiAgICB0aGlzLl9fc3NhTW9kZSA9IHRoaXMuX19vY3JUeXBlLmluZGV4T2YoJy1zc2EnKSA+IC0xO1xuICAgIHRoaXMuX19vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG9uRmFpbHVyZTtcbiAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlID0gb25JblByb2dyZXNzQ2hhbmdlO1xuICAgIGlmIChvbkluUHJvZ3Jlc3NDaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSkge1xuICAgICAgICB0aGlzLl9fdG9wVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnRvcFVJO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJKSB7XG4gICAgICAgIHRoaXMuX19taWRkbGVVSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkubWlkZGxlVUk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUkpIHtcbiAgICAgICAgdGhpcy5fX2JvdHRvbVVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5ib3R0b21VSTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbml0aWFsaXplZCEnKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX19wcmVwcm9jZXNzKCk7XG4gICAgICBhd2FpdCB0aGlzLl9fc2V0dXBEb21FbGVtZW50cygpO1xuICAgICAgaWYgKHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgICAvLyBzZXJ2ZXJNb2RlXG4gICAgICAgIGlmICh0aGlzLmlzRW5jcnlwdE1vZGUoKSAmJiB0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpOyAvLyDshJzrsoTrqqjrk5wg7J207KeA66eMIOyVlO2YuO2ZlCDtlZjquLDsnITtlbQgd2FzbeydhCBwcmVsb2FkaW5nIO2VqFxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2NhblNlcnZlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2FzbU1vZGVcbiAgICAgICAgYXdhaXQgdGhpcy5fX3ByZWxvYWRpbmdXYXNtKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5XYXNtKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnN0b3BPQ1IoKTtcbiAgICB9XG4gIH1cbiAgc3RvcE9DUigpIHtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICB0aGlzLl9fb25TdWNjZXNzID0gbnVsbDtcbiAgICB0aGlzLl9fb25GYWlsdXJlID0gbnVsbDtcbiAgfVxuICBzZXRJZ25vcmVDb21wbGV0ZSh2YWwpIHtcbiAgICB0aGlzLl9fT0NSRW5naW5lLnNldElnbm9yZUNvbXBsZXRlKHZhbCk7XG4gIH1cbiAgZW5jcnlwdChwbGFpblN0cikge1xuICAgIHJldHVybiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocGxhaW5TdHIpO1xuICB9XG4gIGFzeW5jIHJlc3RhcnRPQ1Iob2NyVHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSwgaXNTd2l0Y2hNb2RlID0gZmFsc2UpIHtcbiAgICBpZiAoaXNTd2l0Y2hNb2RlKSB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3BPQ1IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuc3RhcnRPQ1Iob2NyVHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSk7XG4gIH1cblxuICAvKiogcHJpdmF0ZSBtZXRob2RzICovXG4gIGFzeW5jIF9fd2FpdFByZWxvYWRlZCgpIHtcbiAgICBsZXQgd2FpdGluZ1JldHJ5Q291bnQgPSAwO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGNoZWNrID0gKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc1ByZWxvYWRlZCgpKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhaXRpbmdSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjaGVjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH07XG4gICAgICBjaGVjaygpO1xuICAgIH0pO1xuICB9XG4gIF9fcHJlcHJvY2VzcygpIHtcbiAgICBjb25zdCBjb252ZXJ0VHlwZVRvTnVtYmVyID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlSW50KG9wdGlvbikpID8gMCA6IHBhcnNlSW50KG9wdGlvbik7XG4gICAgfTtcbiAgICB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50KTtcbiAgICB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lKTtcbiAgICB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggPSBjb252ZXJ0VHlwZVRvTnVtYmVyKHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCk7XG4gIH1cbiAgX193aW5kb3dFdmVudEJpbmQoKSB7XG4gICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICBpZiAoL2lwaG9uZXxpcG9kfGlwYWQvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIGNvbnN0IHNraXBUb3VjaEFjdGlvbmZvclpvb20gPSBldiA9PiB7XG4gICAgICAgIGlmIChldi50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpc18uX19wYWdlRW5kID0gdHJ1ZTtcbiAgICAgIF90aGlzXy5jbGVhbnVwKCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISEhX3RoaXNfLl9fb2NyVHlwZSkgcmV0dXJuO1xuICAgICAgaWYgKCFfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUpIHtcbiAgICAgICAgX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplID0gdHJ1ZTtcbiAgICAgICAgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gbnVsbDtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgX3RoaXNfLnJlc3RhcnRPQ1IoX3RoaXNfLl9fb2NyVHlwZSwgX3RoaXNfLl9fb25TdWNjZXNzLCBfdGhpc18uX19vbkZhaWx1cmUsIF90aGlzXy5fX29uSW5Qcm9ncmVzc0NoYW5nZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEhIV90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lcikge1xuICAgICAgICBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGhhbmRsZVJlc2l6ZSwgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2RlYnVnKG1zZykge1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VEZWJ1Z0FsZXJ0KSB7XG4gICAgICB2b2lkIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgX19zbGVlcChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgfVxuICBfX2Jsb2JUb0Jhc2U2NChibG9iKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfKSA9PiB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICB9KTtcbiAgfVxuICBfX2Jhc2U2NHRvQmxvYihiYXNlNjQpIHtcbiAgICAvLyBjb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgIC8vIGRvZXNuJ3QgaGFuZGxlIFVSTEVuY29kZWQgRGF0YVVSSXMgLSBzZWUgU08gYW5zd2VyICM2ODUwMjc2IGZvciBjb2RlIHRoYXQgZG9lcyB0aGlzXG4gICAgY29uc3QgYnl0ZVN0cmluZyA9IGF0b2IoYmFzZTY0LnNwbGl0KCcsJylbMV0pO1xuXG4gICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIGNvbnN0IG1pbWVTdHJpbmcgPSBiYXNlNjQuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlclxuICAgIGNvbnN0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICBjb25zdCBpYSA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEJsb2IoW2FiXSwge1xuICAgICAgdHlwZTogbWltZVN0cmluZ1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9fY29tcHJlc2VCYXNlNjRJbWFnZShiYXNlNjQsIG9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKSB7XG4gICAgaWYgKGJhc2U2NCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgYmxvYkZpbGUgPSB0aGlzLl9fYmFzZTY0dG9CbG9iKGJhc2U2NCk7XG4gICAgY29uc3QgY29tcHJlc3NlZCA9IGF3YWl0IEltYWdlVXRpbC5jb21wcmVzc0ltYWdlKGJsb2JGaWxlLCBvcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgY29uc3QgY29tcHJlc3Npb25SYXRpbyA9IE1hdGgucm91bmQoKDEgLSBjb21wcmVzc2VkLnNpemUgLyBibG9iRmlsZS5zaXplKSAqIDEwMDAwKSAvIDEwMDtcbiAgICB2b2lkIDA7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX19ibG9iVG9CYXNlNjQoY29tcHJlc3NlZCk7XG4gIH1cblxuICAvKiog65287J207IS87IqkIO2CpOulvCBoZWFwIOyXkCBhbGxvY2F0aW9uICovXG4gIF9fZ2V0U3RyaW5nT25XYXNtSGVhcCgpIHtcbiAgICBpZiAoISEhdGhpcy5fX2xpY2Vuc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGljZW5zZSBLZXkgaXMgZW1wdHknKTtcbiAgICB9XG4gICAgY29uc3QgbGVuZ3RoQnl0ZXMgPSB0aGlzLl9fT0NSRW5naW5lLmxlbmd0aEJ5dGVzVVRGOCh0aGlzLl9fbGljZW5zZSkgKyAxO1xuICAgIHRoaXMuX19zdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKGxlbmd0aEJ5dGVzKTtcbiAgICB0aGlzLl9fT0NSRW5naW5lLnN0cmluZ1RvVVRGOCh0aGlzLl9fbGljZW5zZSwgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAsIGxlbmd0aEJ5dGVzKTtcbiAgICByZXR1cm4gdGhpcy5fX3N0cmluZ09uV2FzbUhlYXA7XG4gIH1cbiAgX19lbmNyeXB0U2NhblJlc3VsdChvY3JSZXN1bHQpIHtcbiAgICBsZXQgc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2Ygb2NyUmVzdWx0ID09PSAnbnVtYmVyJykgb2NyUmVzdWx0ID0gb2NyUmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICBpZiAob2NyUmVzdWx0ID09PSAnJykgcmV0dXJuICcnO1xuICAgICAgaWYgKHR5cGVvZiBvY3JSZXN1bHQgIT09ICdzdHJpbmcnICYmICEhIW9jclJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29jclJlc3VsdCBpcyBlbXB0eScpO1xuICAgICAgfVxuICAgICAgY29uc3QganNvblN0cmluZyA9IG9jclJlc3VsdDtcbiAgICAgIGNvbnN0IGxlbmd0aEJ5dGVzID0gdGhpcy5fX09DUkVuZ2luZS5sZW5ndGhCeXRlc1VURjgoanNvblN0cmluZykgKyAxO1xuICAgICAgc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyhsZW5ndGhCeXRlcyk7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLnN0cmluZ1RvVVRGOChqc29uU3RyaW5nLCBzdHJpbmdPbldhc21IZWFwLCBsZW5ndGhCeXRlcyk7XG4gICAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5lbmNyeXB0UmVzdWx0KHN0cmluZ09uV2FzbUhlYXApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoc3RyaW5nT25XYXNtSGVhcCkge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICBzdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgX19zZXRWaWRlb1Jlc29sdXRpb24odmlkZW9FbGVtZW50KSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgIGxldCByZXNvbHV0aW9uVGV4dCA9ICdub3QgcmVhZHknO1xuICAgIGlmICghdGhpcy5fX2NhbVNldENvbXBsZXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAwKSB7XG4gICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgICByZXNvbHV0aW9uVGV4dFxuICAgICAgfTtcbiAgICB9XG4gICAgcmVzb2x1dGlvblRleHQgPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCArICd4JyArIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodDtcbiAgICBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDEwODAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxOTIwIHx8IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxOTIwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTA4MCkge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxMjgwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gNzIwIHx8IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSA3MjAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxMjgwKSB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aWRlb0VsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9fdmlkZW9XaWR0aCA9IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoO1xuICAgIHRoaXMuX192aWRlb0hlaWdodCA9IHZpZGVvRWxlbWVudC52aWRlb0hlaWdodDtcbiAgICByZXR1cm4ge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgcmVzb2x1dGlvblRleHRcbiAgICB9O1xuICB9XG4gIF9fZ2V0U2Nhbm5lckFkZHJlc3Mob2NyVHlwZSkge1xuICAgIGlmICghdGhpcy5fX29jclR5cGVMaXN0LmluY2x1ZGVzKG9jclR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBhZGRyZXNzID0gMDtcbiAgICAgIGxldCBkZXN0cm95Q2FsbGJhY2sgPSBudWxsO1xuICAgICAgY29uc3Qgc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19nZXRTdHJpbmdPbldhc21IZWFwKCk7XG4gICAgICBzd2l0Y2ggKG9jclR5cGUpIHtcbiAgICAgICAgLy8gT0NSXG4gICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRJRENhcmRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUlEQ2FyZFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRQYXNzcG9ydFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95UGFzc3BvcnRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldEFsaWVuU2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lBbGllblNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0Q3JlZGl0U2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lDcmVkaXRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkb2VzIG5vdCBleGlzdHMnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICBpZiAoYWRkcmVzcyA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5fX21heFJldHJ5Q291bnRHZXRBZGRyZXNzID09PSB0aGlzLl9fcmV0cnlDb3VudEdldEFkZHJlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIExpY2Vuc2UgS2V5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3JldHJ5Q291bnRHZXRBZGRyZXNzKys7XG4gICAgICB9XG4gICAgICByZXR1cm4gW2FkZHJlc3MsIGRlc3Ryb3lDYWxsYmFja107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVE9ETyA6IExpY2Vuc2UgSXNzdWXsnbgg6rK97JqwIOyXkOufrCDqsJLsnYQg67Cb7JWE7IScIGVycm9yIOuhnOq3uOulvCDssI3snYQg7IiYIOyeiOqyjCDsmpTssq3tlYTsmpQgKOyehOyLnCBO67KIIOydtOyDgSBhZGRyZXNz66W8IOuqu+uwm+ycvOuptCDqsJXsoJwg7JeQ65+sKVxuICAgICAgdm9pZCAwO1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgX19nZXRCdWZmZXIoKSB7XG4gICAgaWYgKCF0aGlzLl9fQnVmZmVyKSB7XG4gICAgICB0aGlzLl9fQnVmZmVyID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKHRoaXMuX19yZXNvbHV0aW9uV2lkdGggKiB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCAqIDQpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX19yZXN1bHRCdWZmZXIpIHtcbiAgICAgIHRoaXMuX19yZXN1bHRCdWZmZXIgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MoNDA5Nik7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrSW5mbykge1xuICAgICAgaWYgKCF0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYpIHtcbiAgICAgICAgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKDQwOTYpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3RoaXMuX19CdWZmZXIsIHRoaXMuX19yZXN1bHRCdWZmZXIsIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zl07XG4gIH1cbiAgYXN5bmMgX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCBtYXNrTW9kZSwgaW1nTW9kZSwgaW1nVHlwZSA9ICdjYXJkJykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoaW1nVHlwZSA9PT0gJ2NhcmQnKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZW5jb2RlSnBnRGV0ZWN0ZWRGcmFtZUltYWdlKGFkZHJlc3MsIG1hc2tNb2RlLCBpbWdNb2RlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW1nVHlwZSA9PT0gJ2ZhY2UnKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZW5jb2RlSnBnRGV0ZWN0ZWRQaG90b0ltYWdlKGFkZHJlc3MpO1xuICAgICAgfVxuICAgICAgY29uc3QganBnU2l6ZSA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jb2RlZEpwZ1NpemUoKTtcbiAgICAgIGNvbnN0IGpwZ1BvaW50ZXIgPSB0aGlzLl9fT0NSRW5naW5lLmdldEVuY29kZWRKcGdCdWZmZXIoKTtcbiAgICAgIGNvbnN0IHJlc3VsdFZpZXcgPSBuZXcgVWludDhBcnJheSh0aGlzLl9fT0NSRW5naW5lLkhFQVA4LmJ1ZmZlciwganBnUG9pbnRlciwganBnU2l6ZSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBuZXcgVWludDhBcnJheShyZXN1bHRWaWV3KTtcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbcmVzdWx0XSwge1xuICAgICAgICB0eXBlOiAnaW1hZ2UvanBlZydcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX19ibG9iVG9CYXNlNjQoYmxvYik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95RW5jb2RlZEpwZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGcmVlIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19CdWZmZXIpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX0J1ZmZlcik7XG4gICAgICB0aGlzLl9fQnVmZmVyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fX2Rlc3Ryb3lSZXN1bHRCdWZmZXIoKTtcbiAgICB0aGlzLl9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCk7XG4gIH1cbiAgX19kZXN0cm95UmVzdWx0QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fcmVzdWx0QnVmZmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19yZXN1bHRCdWZmZXIpO1xuICAgICAgdGhpcy5fX3Jlc3VsdEJ1ZmZlciA9IG51bGw7XG4gICAgfVxuICB9XG4gIF9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmKTtcbiAgICAgIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZyZWUgUHJldkltYWdlIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lQcmV2SW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuX19QcmV2SW1hZ2UgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX1ByZXZJbWFnZSk7XG4gICAgICB0aGlzLl9fUHJldkltYWdlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogZnJlZSBzdHJpbmcgaGVhcCBidWZmZXIgKi9cbiAgX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCgpIHtcbiAgICBpZiAodGhpcy5fX3N0cmluZ09uV2FzbUhlYXApIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX3N0cmluZ09uV2FzbUhlYXApO1xuICAgICAgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBmcmVlIHNjYW5uZXIgYWRkcmVzcyAqL1xuICBfX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcygpIHtcbiAgICBpZiAodGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrKCk7XG4gICAgICB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlKHZpZGVvRWxlbWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgfSA9IGF3YWl0IHRoaXMuX19zZXRWaWRlb1Jlc29sdXRpb24odmlkZW9FbGVtZW50KTtcbiAgICBpZiAoIWlzU3VwcG9ydGVkUmVzb2x1dGlvbikge1xuICAgICAgaWYgKHJlc29sdXRpb25UZXh0ICE9PSAnbm90IHJlYWR5Jykge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc1N1cHBvcnRlZFJlc29sdXRpb247XG4gIH1cbiAgX19nZXRSb3RhdGlvbkRlZ3JlZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuX19vcHRpb25zLnJvdGF0aW9uRGVncmVlICUgMzYwICsgMzYwKSAlIDM2MDtcbiAgfVxuICBfX2dldE1pcnJvck1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zLm1pcnJvck1vZGU7XG4gIH1cbiAgYXN5bmMgX19jcm9wSW1hZ2VGcm9tVmlkZW8oKSB7XG4gICAgaWYgKCF0aGlzLl9fY2FtU2V0Q29tcGxldGUpIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgbGV0IFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgY29uc3Qge1xuICAgICAgdmlkZW8sXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhc1xuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuXG4gICAgLy8gc291cmNlIGltYWdlIChvciB2aWRlbylcbiAgICAvLyDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJNcbiAgICAvLyDilIMgICAgIOKUiiBzeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUg+KUiOKUiOKUiOKUiCDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJMg4pSKICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDIHN4ICDilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKIHNIZWlnaHQgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAgICAgICAg4pSDICAgICAgICAgICAgICAgZGVzdGluYXRpb24gY2FudmFzXG4gICAgLy8g4pSDICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsg4pSKICAgICAgICAgICAgICAg4pSD4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTXG4gICAgLy8g4pSDICAgICDilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIggICAgICAgICAgICAgICAgIOKUgyAgICDilIogICAgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgICAgICAgICAgIHNXaWR0aCAgICAgICAgICAgICAgICAgICAgICDilIMgICAg4pSKIGR5ICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbICAgIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUkyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIPilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgIGR4ICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKIGRIZWlnaHQg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICDilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIggICAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgICAgZFdpZHRoICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUm1xuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgZHgsIGR5KVxuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC9kcmF3SW1hZ2VcblxuICAgIGxldCBjYWxjQ2FudmFzID0gY2FudmFzO1xuICAgIGxldCBjYWxjVmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9IHZpZGVvLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPSB2aWRlby5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNDcm9wSW1hZ2VTaXplV2lkdGggPSB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoO1xuICAgIGxldCBjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCA9IHRoaXMuX19jcm9wSW1hZ2VTaXplSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uO1xuICAgIGNvbnN0IGlzQWxpZW5CYWNrID0gdGhpcy5fX29jclR5cGUgPT09ICdhbGllbi1iYWNrJztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIFtjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoLCBjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodF0gPSBbY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQsIGNhbGNDcm9wSW1hZ2VTaXplV2lkdGhdO1xuICAgICAgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW2NhbGNSZXNvbHV0aW9uX2gsIGNhbGNSZXNvbHV0aW9uX3ddO1xuICAgICAgY2FsY0NhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgICAgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICB9XG4gICAgbGV0IGNhbGNNYXhTV2lkdGggPSA5OTk5OTtcbiAgICBsZXQgY2FsY01heFNIZWlnaHQgPSA5OTk5OTtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g7IS466GcIFVJIC8g7IS466GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U1dpZHRoID0gY2FsY1ZpZGVvV2lkdGg7XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g7IS466GcIFVJIC8g6rCA66GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDqsIDroZwgVUkgLyDqsIDroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g6rCA66GcIFVJIC8g7IS466GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U1dpZHRoID0gY2FsY1ZpZGVvV2lkdGg7XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3gsIHN5O1xuICAgIGNvbnN0IHJhdGlvID0gY2FsY1ZpZGVvV2lkdGggLyBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBjb25zdCBzV2lkdGggPSBNYXRoLm1pbihNYXRoLnJvdW5kKGNhbGNDcm9wSW1hZ2VTaXplV2lkdGggKiByYXRpbyksIGNhbGNNYXhTV2lkdGgpO1xuICAgIGNvbnN0IHNIZWlnaHQgPSBNYXRoLm1pbihNYXRoLnJvdW5kKGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0ICogcmF0aW8pLCBjYWxjTWF4U0hlaWdodCk7XG4gICAgc3ggPSBNYXRoLm1heChNYXRoLnJvdW5kKChjYWxjVmlkZW9DbGllbnRXaWR0aCAtIGNhbGNDcm9wSW1hZ2VTaXplV2lkdGgpIC8gMiAqIHJhdGlvKSwgMCk7XG4gICAgc3kgPSBNYXRoLm1heChNYXRoLnJvdW5kKChjYWxjVmlkZW9DbGllbnRIZWlnaHQgLSBjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCkgLyAyICogcmF0aW8pLCAwKTtcbiAgICBpZiAoaXNBbGllbkJhY2spIHtcbiAgICAgIFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFtjYWxjUmVzb2x1dGlvbl9oLCBjYWxjUmVzb2x1dGlvbl93XTtcbiAgICB9XG4gICAgY2FsY0NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgY2FsY1Jlc29sdXRpb25fdyk7XG4gICAgY2FsY0NhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGNvbnN0IGNhbGNDb250ZXh0ID0gY2FsY0NhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgIHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZVxuICAgIH0pO1xuICAgIGNhbGNDb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIDAsIDAsIGNhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGxldCBpbWdEYXRhLCBpbWdEYXRhVXJsO1xuICAgIGltZ0RhdGEgPSBjYWxjQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgaW1nRGF0YVVybCA9IGNhbGNDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XG4gICAgaWYgKGlzQWxpZW5CYWNrKSB7XG4gICAgICBbaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIDI3MCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgdGhpcy5fX2dldFJvdGF0aW9uRGVncmVlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW2ltZ0RhdGEsIGltZ0RhdGFVcmxdO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCBkZWdyZWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoZGVncmVlID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoW2ltZ0RhdGEsIGltZ0RhdGFVcmxdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgaW1nLnNyYyA9IGltZ0RhdGFVcmw7XG4gICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gY2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgICAgIGNvbnN0IHRlbXBDb250ZXh0ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0ZW1wQ2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgaWYgKFs5MCwgMjcwXS5pbmNsdWRlcyhkZWdyZWUpKSB7XG4gICAgICAgICAgdGVtcENhbnZhcy53aWR0aCA9IGltZy5oZWlnaHQ7XG4gICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBpbWcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoWzAsIDE4MF0uaW5jbHVkZXMoZGVncmVlKSkge1xuICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWdyZWUgPT09IDkwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoaW1nLmhlaWdodCwgMCk7ZWxzZSBpZiAoZGVncmVlID09PSAxODApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZShpbWcud2lkdGgsIGltZy5oZWlnaHQpO2Vsc2UgaWYgKGRlZ3JlZSA9PT0gMjcwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoMCwgaW1nLndpZHRoKTtcbiAgICAgICAgdGVtcENvbnRleHQucm90YXRlKGRlZ3JlZSAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICB0ZW1wQ29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VEYXRhID0gWzkwLCAyNzBdLmluY2x1ZGVzKGRlZ3JlZSkgPyB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nLmhlaWdodCwgaW1nLndpZHRoKSA6IHRlbXBDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuICAgICAgICByZXNvbHZlKFtuZXdJbWFnZURhdGEsIHRlbXBDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyldKTtcbiAgICAgICAgdGVtcENvbnRleHQucmVzdG9yZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCBib3hUeXBlID0gMCwgcmV0cnlJbWcgPSBudWxsKSB7XG4gICAgaWYgKCFhZGRyZXNzIHx8IGFkZHJlc3MgPCAwKSB7XG4gICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpbWdEYXRhO1xuICAgICAgbGV0IGltZ0RhdGFVcmwgPSBudWxsO1xuICAgICAgY29uc3QgW2J1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBpZiAocmV0cnlJbWcgIT09IG51bGwpIHtcbiAgICAgICAgaW1nRGF0YSA9IHJldHJ5SW1nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW2ltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX2Nyb3BJbWFnZUZyb21WaWRlbygpO1xuICAgICAgfVxuICAgICAgaWYgKCEhIWltZ0RhdGEpIHtcbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgICB9XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLkhFQVA4LnNldChpbWdEYXRhLmRhdGEsIGJ1ZmZlcik7XG4gICAgICBsZXQga29yID0gZmFsc2UsXG4gICAgICAgIGFsaWVuID0gZmFsc2UsXG4gICAgICAgIHBhc3Nwb3J0ID0gZmFsc2U7XG4gICAgICBzd2l0Y2ggKHRoaXMuX19vY3JUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICBrb3IgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgcGFzc3BvcnQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgIGFsaWVuID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgICAgfVxuICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICBpZiAoa29yIHx8IHBhc3Nwb3J0IHx8IGFsaWVuKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZGV0ZWN0X2lkY2FyZF9vcHQoYnVmZmVyLCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgYWRkcmVzcywga29yLCBhbGllbiwgcGFzc3BvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5kZXRlY3RfaWRjYXJkKGJ1ZmZlciwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIGFkZHJlc3MsIGJveFR5cGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBjb25zb2xlLmxvZygnaXNDYXJkYm94RGV0ZWN0ZWQgcmVzdWx0IC09LS0tLS0nLCByZXN1bHQpXG4gICAgICByZXR1cm4gWyEhcmVzdWx0LCBpbWdEYXRhLCBpbWdEYXRhVXJsXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gJ0NhcmQgZGV0ZWN0aW9uIGVycm9yIDogJyArIGU7XG4gICAgICBpZiAoZS50b1N0cmluZygpLmluY2x1ZGVzKCdtZW1vcnknKSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fc3RhcnRSZWNvZ25pdGlvbihhZGRyZXNzLCBvY3JUeXBlLCBzc2FNb2RlLCBpc1NldElnbm9yZUNvbXBsZXRlLCBpbWdEYXRhLCBpbWdEYXRhVXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChhZGRyZXNzID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAoYWRkcmVzcyA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICdjaGVja1ZhbGlkYXRpb24gRmFpbCc7XG4gICAgICB9XG4gICAgICBsZXQgb2NyUmVzdWx0ID0gbnVsbDtcbiAgICAgIGlmICghdGhpcy5fX29jclR5cGVMaXN0LmluY2x1ZGVzKG9jclR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgICBjb25zdCBbLCByZXN1bHRCdWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgY29uc3QgcmVjb2duaXRpb24gPSBhc3luYyBpc1NldElnbm9yZUNvbXBsZXRlID0+IHtcbiAgICAgICAgaWYgKGlzU2V0SWdub3JlQ29tcGxldGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgMCwgaW1nRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuSURDYXJkKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5QYXNzcG9ydChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5BbGllbihhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5BbGllbkJhY2soYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5DcmVkaXQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjYW5uZXIgZG9lcyBub3QgZXhpc3RzJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiDsi6DsmqnsubTrk5zripQg7JWE7KeBIGtleTp2YWx1ZSDtmJXtg5zroZwg67OA7ZmYIOyViOuQmOyWtCDsnojsnYxcbiAgICAgICAgaWYgKG9jclR5cGUgPT09ICdjcmVkaXQnKSB7XG4gICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gbnVsbCB8fCBvY3JSZXN1bHQgPT09ICcnIHx8IG9jclJlc3VsdCA9PT0gJ2ZhbHNlJyB8fCBvY3JSZXN1bHRbMF0gPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19jc3ZUb09iamVjdChvY3JSZXN1bHQpO1xuICAgICAgICBpZiAob2NyUmVzdWx0Py5jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgb2NyUmVzdWx0Py5jb21wbGV0ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzU2V0SWdub3JlQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA8IHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50KSB7XG4gICAgICAgICAgICAgIC8vIGRldGVjdGVkQ2FyZFF1ZXVl7JeQ7IScIO2VnOyepeydhCDqurzrgrTshJwg6rCx7Iug7ZWc64ukLlxuICAgICAgICAgICAgICAvLyDsoIDsnqXrkJjslrTsnojripQg7J2066+47KeA7J2YIOyIq+yekOqwgCByZXRyeSDrs7Tri6Qg7J6R7J2A6rK97JqwIOuMgOu5hO2VmOyXrCAl66W8IOyCrOyaqe2VqFxuICAgICAgICAgICAgICBjb25zdCBxdWV1ZUlkeCA9IHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50ICUgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgaW1nRGF0YSA9IHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZVtxdWV1ZUlkeF07XG4gICAgICAgICAgICAgIHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCByZWNvZ25pdGlvbihpc1NldElnbm9yZUNvbXBsZXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIOyCrOynhCDtlZzsnqXsnLzroZwgT0NSIOyLpO2MqCAocG9wdXAg64K066as6rOgIHNldElnbm9yZUNvbXBsZXRlKGZhbHNlKSDsspjrpqw/XG4gICAgICAgICAgICAgIHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpOyAvLyDtjJ3sl4XsnbQg64K066Ck6rCI65WMIOyymOumrOuQmOyngOunjCDrr7jrpqwg7LKY66asXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCwgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICAvLyBlbmQgb2YgZnVuY3Rpb24gcmVjb2duaXRpb24oKVxuXG4gICAgICBpZiAoYXdhaXQgcmVjb2duaXRpb24oaXNTZXRJZ25vcmVDb21wbGV0ZSkpIHtcbiAgICAgICAgY29uc3QgaXNDcmVkaXRDYXJkID0gb2NyVHlwZSA9PT0gJ2NyZWRpdCc7XG4gICAgICAgIGxldCBvY3JJbWFnZU1vZGU7XG4gICAgICAgIGlmIChpc0NyZWRpdENhcmQpIHtcbiAgICAgICAgICBvY3JJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5DUk9QUElORztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fb3B0aW9ucy51c2VJbWFnZVdhcnBpbmcpIHtcbiAgICAgICAgICBvY3JJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5XQVJQSU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9jckltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLk5PTkU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yaWdpbkltYWdlID0gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIHRoaXMuT0NSX0lNR19NQVNLX01PREUuRkFMU0UsIG9jckltYWdlTW9kZSk7XG4gICAgICAgIGxldCBtYXNrSW1hZ2UgPSBudWxsO1xuICAgICAgICBsZXQgZmFjZUltYWdlID0gbnVsbDtcbiAgICAgICAgaWYgKCFpc0NyZWRpdENhcmQpIHtcbiAgICAgICAgICBtYXNrSW1hZ2UgPSBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5UUlVFLCB0aGlzLk9DUl9JTUdfTU9ERS5XQVJQSU5HKTtcbiAgICAgICAgICBtYXNrSW1hZ2UgPSBtYXNrSW1hZ2UgPT09ICdkYXRhOicgPyBudWxsIDogbWFza0ltYWdlO1xuICAgICAgICAgIGZhY2VJbWFnZSA9IHRoaXMuX19vcHRpb25zLnVzZUZhY2VJbWFnZSA/IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCBudWxsLCBvY3JJbWFnZU1vZGUsICdmYWNlJykgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzc2FNb2RlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0EsIGZhbHNlLCBtYXNrSW1hZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgIC8vIGlmICghaXNDcmVkaXRDYXJkICYmIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKSB7XG4gICAgICAgIC8vICAgb3JpZ2luSW1hZ2UgPSB0aGlzLl9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KFxuICAgICAgICAvLyAgICAgYWRkcmVzcyxcbiAgICAgICAgLy8gICAgIHRoaXMuT0NSX0lNR19NQVNLX01PREUuRkFMU0UsXG4gICAgICAgIC8vICAgICBvY3JJbWFnZU1vZGVcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdlbmNyeXB0IGJhc2U2NCBpbWFnZScsIHsgb3JpZ2luSW1hZ2UgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaWYgKGZhY2VJbWFnZSAmJiB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0RmFjZSkge1xuICAgICAgICAvLyAgIGZhY2VJbWFnZSA9IHRoaXMuX19nZXRQaWlFbmNyeXB0SW1hZ2VCYXNlNjQoXG4gICAgICAgIC8vICAgICBhZGRyZXNzLFxuICAgICAgICAvLyAgICAgbnVsbCxcbiAgICAgICAgLy8gICAgIG9jckltYWdlTW9kZSxcbiAgICAgICAgLy8gICAgICdmYWNlJ1xuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2VuY3J5cHQgYmFzZTY0IGZhY2UgaW1hZ2UnLCB7IGZhY2VJbWFnZSB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICAgICAgICByZXR1cm4gW29jclJlc3VsdCwgb3JpZ2luSW1hZ2UsIG1hc2tJbWFnZSwgZmFjZUltYWdlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbZmFsc2UsIG51bGwsIG51bGwsIG51bGxdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIF9fc3RhcnRUcnV0aChvY3JUeXBlLCBhZGRyZXNzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IFssIHJlc3VsdEJ1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBpZiAob2NyVHlwZS5pbmRleE9mKCctc3NhJykgPiAtMSkge1xuICAgICAgICAvLyBUT0RPOiB3b3JrZXLrpbwg7IKs7Jqp7ZWY7JesIOuplOyduChVSSDrnpzrjZTrp4EpIOyKpOugiOuTnOqwgCDrqYjstpTsp4Ag7JWK64+E66GdIOyymOumrCDtlYTsmpQgKO2YhOyerCBsb2FkaW5nIFVJIOudhOyasOuptCDslaDri4jrqZTsnbTshZgg66mI7LakKVxuICAgICAgICAvLyBUT0RPOiBzZXRUaW1lb3V0IOycvOuhnCDrgpjriITrjZTrnbzrj4Qg7Zqo6rO8IOyXhuydjCBzZXRUaW1lb3V0IOyngOyasOqzoCwgd29ya2Vy66GcIOuzgOqyvSDtlYTsmpRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLl9fT0NSRW5naW5lLnNjYW5UcnV0aChhZGRyZXNzLCByZXN1bHRCdWZmZXIpKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1NTQSBNb2RlIGlzIHRydWUuIGJ1dCwgb2NyVHlwZSBpcyBpbnZhbGlkIDogJyArIG9jclR5cGUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2NzdlRvT2JqZWN0KHN0cikge1xuICAgIGxldCBwYWlycyA9IHN0ci5zcGxpdCgnOycpO1xuICAgIGxldCBvYmogPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc6Jyk7XG4gICAgICBpZiAocGFpci5sZW5ndGggPT09IDIpIG9ialtwYWlyWzBdXSA9IHBhaXJbMV07XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgX19nZXRNYXNrSW5mbyhhZGRyZXNzKSB7XG4gICAgaWYgKGFkZHJlc3MgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoYWRkcmVzcyA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAnY2hlY2tWYWxpZGF0aW9uIEZhaWwnO1xuICAgIH1cbiAgICBjb25zdCBbLCwgbWFza0luZm9SZXN1bHRCdWZdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0TWFza1JlY3QoYWRkcmVzcywgbWFza0luZm9SZXN1bHRCdWYpO1xuICAgIGlmIChyZXN1bHQgPT0gbnVsbCB8fCByZXN1bHQgPT09ICcnKSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5fX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpO1xuXG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLl9fY3N2VG9PYmplY3QocmVzdWx0KTtcbiAgfVxuICBhc3luYyBfX3N0YXJ0VHJ1dGhSZXRyeShvY3JUeXBlLCBhZGRyZXNzLCBpbWdEYXRhKSB7XG4gICAgYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIDAsIGltZ0RhdGEpO1xuICAgIC8vIGF3YWl0IHRoaXMuX19zdGFydFJlY29nbml0aW9uKGFkZHJlc3MsIG9jclR5cGUsIHRydWUpOyAgICAgIC8vIGZvciDshLHriqXsnYQg7JyE7ZW0IOynhO2WiSBYXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX19zdGFydFRydXRoKG9jclR5cGUsIGFkZHJlc3MpO1xuICB9XG4gIF9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpIHtcbiAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgdGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIC8vIDHstIggZGVsYXkg7ZuEIOyLpO2WiVxuICAgICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgfSwgdGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCk7XG4gIH1cbiAgYXN5bmMgX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgICAgY29uc3QgaXNQYXNzcG9ydCA9IHRoaXMuX19vY3JUeXBlLmluY2x1ZGVzKCdwYXNzcG9ydCcpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwVmlkZW8oaXNQYXNzcG9ydCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHZpZGVvXG4gICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAvLyBjb25zdCBbdHJhY2tdID0gdGhpcy5fX3N0cmVhbS5nZXRWaWRlb1RyYWNrcygpO1xuICAgICAgICAvLyBjb25zdCBjYXBhYmlsaXR5ID0gdHJhY2suZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ0NhcmRTY2FuX19pbml0aWFsaXplIGNhcGFiaWxpdHknLCBjYXBhYmlsaXR5KTtcbiAgICAgICAgaWYgKCdzcmNPYmplY3QnIGluIHZpZGVvKSB7XG4gICAgICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gdGhpcy5fX3N0cmVhbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBBdm9pZCB1c2luZyB0aGlzIGluIG5ldyBicm93c2VycywgYXMgaXQgaXMgZ29pbmcgYXdheS5cbiAgICAgICAgICB2aWRlby5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLl9fc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsICgpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmRlYnVnKCdwcm9jZWVkQ2FtZXJhUGVybWlzc2lvbiAtIG9ubG9hZGVkbWV0YWRhdGEnKTtcbiAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHZvaWQgMDtcblxuICAgICAgICAgIC8vIHZpZGVvIGVsZW1lbnQgc3R5bGUg7ISk7KCVXG4gICAgICAgICAgdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPSB2aWRlby52aWRlb1dpZHRoIC8gdmlkZW8udmlkZW9IZWlnaHQgPCAxID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHRoaXMuX19jYW1TZXRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2FkanVzdFN0eWxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5SRUFEWSk7XG4gICAgICAgIHZpZGVvLndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAoZS5uYW1lID09PSAnTm90QWxsb3dlZEVycm9yJykge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIEFjY2VzcyBQZXJtaXNzaW9uIGlzIG5vdCBhbGxvd2VkJztcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDAzJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5uYW1lID09PSAnTm90UmVhZGFibGVFcnJvcicpIHtcbiAgICAgICAgLy8g64uk66W46rOz7JeQ7IScIOy5tOuplOudvCDsnpDsm5DsnYQg7IKs7Jqp7KSRXG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCA8IDApIHtcbiAgICAgICAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDtmp/siJjsoJztlZwg7JeG7J2MXG4gICAgICAgICAgdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCArPSAxO1xuICAgICAgICAgIHRoaXMuX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7IC8vIOyerOq3gCDtmLjstpxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCA+IHRoaXMuX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7IC8vIOyerOq3gCDtmLjstpxcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ0NhbWVyYSBwZXJtaXNzaW9ucyB3ZXJlIGdyYW50ZWQsIGJ1dCBGYWlsZWQgdG8gYWNxdWlyZSBDYW1lcmEgcmVzb3VyY2VzLic7XG4gICAgICAgICAgICB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnRTQwMycsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9fc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gICAgaWYgKGVsICYmIHN0eWxlKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICB9XG4gIF9fY2hhbmdlT0NSU3RhdHVzKHZhbCkge1xuICAgIHN3aXRjaCAodmFsKSB7XG4gICAgICAvLyBPQ1JcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFk6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuTk9UX1JFQURZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5SRUFEWTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5SRUFEWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRUQ6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0E6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTOlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBOlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQ6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuRE9ORTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fY2hhbmdlU3RhZ2UodmFsLCBmb3JjZVVwZGF0ZSA9IGZhbHNlLCByZWNvZ25pemVkSW1hZ2UgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID09PSB2YWwgJiYgZm9yY2VVcGRhdGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19jaGFuZ2VPQ1JTdGF0dXModmFsKTtcbiAgICB0aGlzLl9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9IHZhbDtcbiAgICB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAgPSB2YWw7XG4gICAgY29uc3Qge1xuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGJvcmRlcldpZHRoOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoICsgJ3B4JyxcbiAgICAgIGJvcmRlclN0eWxlOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnN0eWxlLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXJDb2xvcjogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZVt2YWxdXG4gICAgfTtcbiAgICBpZiAoZ3VpZGVCb3gpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwgc3R5bGUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2UpIHtcbiAgICAgIGlmICghIXRoaXMuX19vcHRpb25zLnNob3dDbGlwRnJhbWUpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFza0JveFdyYXA/LnF1ZXJ5U2VsZWN0b3IoJyNtYXNrQm94T3V0ZXInKT8uc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fX29wdGlvbnMubWFza0ZyYW1lU3R5bGVbdmFsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHtcbiAgICAgIGNhcHR1cmVCdXR0b24/LnF1ZXJ5U2VsZWN0b3IoJyNjYXB0dXJlQnV0dG9uJyk/LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX19vcHRpb25zLmNhcHR1cmVCdXR0b25TdHlsZVsnYmFzZV9jb2xvciddKTtcbiAgICB9XG4gICAgY29uc3Qgb2NyTW9kZSA9IHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSA/ICdzZXJ2ZXInIDogJ3dhc20nO1xuICAgIGlmICh0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlVG9wVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlVG9wVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fdG9wVUksICd0b3AnLCB0aGlzLl9fb3B0aW9ucy51c2VUb3BVSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJIHx8IHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX21pZGRsZVVJLCAnbWlkZGxlJywgdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX19ib3R0b21VSSwgJ2JvdHRvbScsIHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyB8fCB2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVEKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKTtcblxuICAgICAgICAvLyBGQUlM7J24IOqyveyasCA17LSI7ZuEIOyekOuPmeydhCDssL3ri6vsnYxcbiAgICAgICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuX19oaWRlUHJldmlld1VJLCAzMDAwLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHZpZGVvXG4gICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0EpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX2hpZGVQcmV2aWV3VUkoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEpOyAvLyBmb3IgVUkgdXBkYXRlXG4gIH1cblxuICBfX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld0ltYWdlXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcHJldmlld0ltYWdlLnNyYyA9IHJlY29nbml6ZWRJbWFnZTtcbiAgICBjb25zdCBpbWdTdHlsZSA9IHtcbiAgICAgICdtYXgtd2lkdGgnOiAnNzAlJyxcbiAgICAgICdtYXgtaGVpZ2h0JzogJzYwJSdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3SW1hZ2UsIGltZ1N0eWxlKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld1VJV3JhcCwge1xuICAgICAgZGlzcGxheTogJ2ZsZXgnXG4gICAgfSk7XG4gIH1cbiAgX19oaWRlUHJldmlld1VJKGNvbnRleHQpIHtcbiAgICBsZXQgX3RoaXNfID0gdGhpcztcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgX3RoaXNfID0gY29udGV4dDtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgdmlkZW8sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld0ltYWdlXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgX3RoaXNfLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICB9KTtcbiAgICBfdGhpc18uX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gJyc7XG4gIH1cbiAgYXN5bmMgX19nZXRJbnB1dERldmljZXMoKSB7XG4gICAgLy8gdGhyb3cgZXJyb3IgaWYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBpcyBub3Qgc3VwcG9ydGVkXG4gICAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25hdmlnYXRvci5tZWRpYURldmljZXMgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICBjb25zdCBkZXZpY2VzID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgbGV0IGNhbWVyYSA9IFtdO1xuICAgIGZvciAoY29uc3QgZGV2aWNlIG9mIGRldmljZXMpIHtcbiAgICAgIGlmIChkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGRldmljZSBpbnN0YW5jZW9mIElucHV0RGV2aWNlSW5mbykge1xuICAgICAgICAgICAgaWYgKGRldmljZS5nZXRDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FwID0gZGV2aWNlLmdldENhcGFiaWxpdGllcygpO1xuICAgICAgICAgICAgICBpZiAoY2FwPy5mYWNpbmdNb2RlPy5pbmNsdWRlcyh0aGlzLl9fZmFjaW5nTW9kZUNvbnN0cmFpbnQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNVbHRyYUNhbWVyYVJlZyA9IC91bHRyYXzsmrjtirjrnbwvZ2k7XG4gICAgICAgICAgICAgICAgaWYgKGlzVWx0cmFDYW1lcmFSZWcudGVzdChkZXZpY2UubGFiZWw/LnRvTG93ZXJDYXNlKCkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYW1lcmEucHVzaChjYXAuZGV2aWNlSWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaU9TIDE3IOuvuOunjOydmCBjaHJvbWUsIHNhZmFyaSDsl5DshJzripRcbiAgICAgICAgICAvLyBJbnB1dERldmljZUluZm8g6rCd7LK06rCAIOyXhuyWtOyEnCBnZXRDYXBhYmlsaXRpZXPrpbwg7ZmV7J247ZWgIOyImCDsl4bquLAg65WM66y47JeQXG4gICAgICAgICAgLy8gZGV2aWNlIGxhYmVs66eMIOuztOqzoCDtm4TrqbQg7Lm066mU652866GcIOyCrOyaqVxuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQmFja0NhbWVyYVJlZyA9IC9iYWNrfO2bhOuptC9nO1xuICAgICAgICAgICAgaWYgKGRldmljZS5sYWJlbD8ubGVuZ3RoICYmIGlzQmFja0NhbWVyYVJlZy50ZXN0KGRldmljZS5sYWJlbCkpIHtcbiAgICAgICAgICAgICAgY2FtZXJhLnB1c2goZGV2aWNlLmRldmljZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX2RlYnVnKGBjYW1lcmEgPSAke2NhbWVyYX0sIGNhbWVyYS5sZW5ndGggPSAke2NhbWVyYS5sZW5ndGh9YCk7XG4gICAgcmV0dXJuIGNhbWVyYTtcbiAgfVxuICBjaGVja1VJT3JpZW50YXRpb24oKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRldGVjdG9yLmdldFVJT3JpZW50YXRpb24oZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5vY3IpO1xuICAgIGxldCBpc0NoYW5nZWQgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudCAhPT0gdGhpcy5fX3ByZXZVaU9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9fdWlPcmllbnRhdGlvbiA9IGN1cnJlbnQ7XG4gICAgICB0aGlzLl9fcHJldlVpT3JpZW50YXRpb24gPSBjdXJyZW50O1xuICAgICAgaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBpc0NoYW5nZWRcbiAgICB9O1xuICB9XG4gIF9fY2xlYXJDdXN0b21VSShvYmopIHtcbiAgICBvYmouaW5uZXJIVE1MID0gJyc7XG4gICAgb2JqLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShvYmosIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9fc2V0dXBEb21FbGVtZW50cygpIHtcbiAgICBsZXQge1xuICAgICAgb2NyLFxuICAgICAgdmlkZW8sXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhcyxcbiAgICAgIGd1aWRlQm94LFxuICAgICAgdmlkZW9XcmFwLFxuICAgICAgZ3VpZGVCb3hXcmFwLFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyxcbiAgICAgIGN1c3RvbVVJV3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uLFxuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdVSSxcbiAgICAgIHByZXZpZXdJbWFnZSxcbiAgICAgIHN3aXRjaFVJV3JhcCxcbiAgICAgIHN3aXRjaFVJLFxuICAgICAgcHJlbG9hZGluZ1VJV3JhcCxcbiAgICAgIHByZWxvYWRpbmdVSVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmICghb2NyKSB0aHJvdyBuZXcgRXJyb3IoJ29jciBkaXYgZWxlbWVudCBpcyBub3QgZXhpc3QnKTtcbiAgICBpZiAodmlkZW9XcmFwKSB2aWRlb1dyYXAucmVtb3ZlKCk7XG4gICAgaWYgKGd1aWRlQm94V3JhcCkgZ3VpZGVCb3hXcmFwLnJlbW92ZSgpO1xuICAgIGlmICh2aWRlbykgdmlkZW8ucmVtb3ZlKCk7XG4gICAgaWYgKGNhbnZhcykgY2FudmFzLnJlbW92ZSgpO1xuICAgIGlmIChyb3RhdGlvbkNhbnZhcykgcm90YXRpb25DYW52YXMucmVtb3ZlKCk7XG4gICAgaWYgKGd1aWRlQm94KSBndWlkZUJveC5yZW1vdmUoKTtcbiAgICBpZiAobWFza0JveFdyYXApIG1hc2tCb3hXcmFwLnJlbW92ZSgpO1xuICAgIGlmIChwcmV2ZW50VG9GcmVlemVWaWRlbykgcHJldmVudFRvRnJlZXplVmlkZW8ucmVtb3ZlKCk7XG4gICAgaWYgKGN1c3RvbVVJV3JhcCkgY3VzdG9tVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIOqwgSB0b3AsIG1pZGRsZSwgYm90dG9tIFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAodG9wVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZVRvcFVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSSh0b3BVSSk7XG4gICAgaWYgKG1pZGRsZVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkobWlkZGxlVUkpO1xuICAgIGlmIChib3R0b21VSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKGJvdHRvbVVJKTtcbiAgICBpZiAoY2FwdHVyZVVJV3JhcCkgY2FwdHVyZVVJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBjYXB0dXJlIFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAoY2FwdHVyZVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKGNhcHR1cmVVSSk7XG4gICAgaWYgKHByZXZpZXdVSVdyYXApIHByZXZpZXdVSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8gcHJldmlldyBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHByZXZpZXdVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShwcmV2aWV3VUkpO1xuICAgIGlmIChzd2l0Y2hVSVdyYXApIHN3aXRjaFVJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBzd2l0Y2ggVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChzd2l0Y2hVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB0aGlzLl9fY2xlYXJDdXN0b21VSShzd2l0Y2hVSSk7XG4gICAgaWYgKHByZWxvYWRpbmdVSVdyYXApIHByZWxvYWRpbmdVSVdyYXAucmVtb3ZlKCk7XG4gICAgY29uc3Qgcm90YXRpb25EZWdyZWUgPSB0aGlzLl9fZ2V0Um90YXRpb25EZWdyZWUoKTtcbiAgICB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA9IFs5MCwgMjcwXS5pbmNsdWRlcyhyb3RhdGlvbkRlZ3JlZSk7XG4gICAgbGV0IG9jclN0eWxlID0ge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUob2NyLCBvY3JTdHlsZSk7XG4gICAgY29uc3Qgd3JhcFN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAvLyB2ZXJ0aWNhbCBhbGlnbiBtaWRkbGVcbiAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgIH07XG4gICAgdmlkZW9XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmlkZW9XcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICd2aWRlb1dyYXAnKTtcbiAgICBpZiAodmlkZW9XcmFwKSB7XG4gICAgICB3aGlsZSAodmlkZW9XcmFwLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgdmlkZW9XcmFwLnJlbW92ZUNoaWxkKHZpZGVvV3JhcC5sYXN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvV3JhcCwgd3JhcFN0eWxlKTtcbiAgICB9XG4gICAgb2NyLmFwcGVuZENoaWxkKHZpZGVvV3JhcCk7XG4gICAgbWFza0JveFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBtYXNrQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnbWFza0JveFdyYXAnKTtcbiAgICBtYXNrQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUobWFza0JveFdyYXAsIHdyYXBTdHlsZSk7XG4gICAgbGV0IG1hc2tfZnJhbWUgPSB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZS5iYXNlX2NvbG9yICsgJ2ZmJztcbiAgICBpZiAoISF0aGlzLl9fb3B0aW9ucy5zaG93Q2xpcEZyYW1lKSB7XG4gICAgICBtYXNrX2ZyYW1lID0gdGhpcy5fX29wdGlvbnMubWFza0ZyYW1lU3R5bGUuY2xpcF9mcmFtZSArICc1NSc7XG4gICAgfVxuICAgIG1hc2tCb3hXcmFwLmlubmVySFRNTCA9ICcnICsgXCIgIDxzdmcgaWQ9J21hc2tCb3hDb250YWluZXInIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+XFxuXCIgKyBcIiAgICA8bWFzayBpZD0nbWFzay1yZWN0Jz5cXG5cIiArIFwiICAgICAgPHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nd2hpdGUnPjwvcmVjdD5cXG5cIiArIFwiICAgICAgPHN2ZyB4PSc1MCUnIHk9JzUwJScgb3ZlcmZsb3c9J3Zpc2libGUnPlxcblwiICsgXCIgICAgICAgICAgPHJlY3QgaWQ9J21hc2tCb3hJbm5lcidcXG5cIiArIFwiICAgICAgICAgICAgd2lkdGg9JzQwMCcgaGVpZ2h0PScyNjAnXFxuXCIgKyBcIiAgICAgICAgICAgIHg9Jy0yMDAnIHk9Jy0xMzAnXFxuXCIgKyBcIiAgICAgICAgICAgIHJ4PScxMCcgcnk9JzEwJ1xcblwiICsgXCIgICAgICAgICAgICBmaWxsPSdibGFjaycgc3Ryb2tlPSdibGFjayc+PC9yZWN0PlxcblwiICsgJyAgICAgIDwvc3ZnPlxcbicgKyAnICAgIDwvbWFzaz5cXG4nICsgXCIgICAgPHJlY3QgaWQ9J21hc2tCb3hPdXRlcidcXG5cIiArIFwiICAgICAgICAgIHg9JzAnIHk9JzAnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnXFxuXCIgKyBcIiAgICAgICAgICBmaWxsPSdcIiArIG1hc2tfZnJhbWUgKyBcIicgbWFzaz0ndXJsKCNtYXNrLXJlY3QpJz48L3JlY3Q+XFxuXCIgKyAnICA8L3N2Zz4nO1xuICAgIG9jci5hcHBlbmRDaGlsZChtYXNrQm94V3JhcCk7XG4gICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICd2aWRlbycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAndHJ1ZScpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAndHJ1ZScpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgIGxldCB2aWRlb1N0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICB3aWR0aDogJzEwMCUnXG4gICAgfTtcbiAgICBjb25zdCByb3RhdGVDc3MgPSAncm90YXRlKCcgKyByb3RhdGlvbkRlZ3JlZSArICdkZWcpJztcbiAgICBjb25zdCBtaXJyb3JDc3MgPSAncm90YXRlWSgxODBkZWcpJztcbiAgICBjb25zdCByb3RhdGVBbmRNaXJyb3JDc3MgPSBtaXJyb3JDc3MgKyAnICcgKyByb3RhdGVDc3M7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBpZiAodGhpcy5fX2dldE1pcnJvck1vZGUoKSkge1xuICAgICAgICB2aWRlb1N0eWxlID0ge1xuICAgICAgICAgIC4uLnZpZGVvU3R5bGUsXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlQW5kTWlycm9yQ3NzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aWRlb1N0eWxlID0ge1xuICAgICAgICAgIC4uLnZpZGVvU3R5bGUsXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlQ3NzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9fZ2V0TWlycm9yTW9kZSgpKSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiBtaXJyb3JDc3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB2aWRlb1N0eWxlKTtcbiAgICB2aWRlb1dyYXAuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgIGd1aWRlQm94V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGd1aWRlQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnZ3VpZGVCb3hXcmFwJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94V3JhcCwgd3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoZ3VpZGVCb3hXcmFwKTtcbiAgICBndWlkZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIGd1aWRlQm94LnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdndWlkZUJveCcpO1xuICAgIGd1aWRlQm94LnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIG1hcmdpbjogJzAgYXV0bycsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0pO1xuICAgIGd1aWRlQm94V3JhcC5hcHBlbmRDaGlsZChndWlkZUJveCk7XG4gICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYW52YXMnKTtcbiAgICBjb25zdCBjYW52YXNTdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IHRoaXMuX19vcHRpb25zLnNob3dDYW52YXNQcmV2aWV3ID8gdGhpcy5fX2lzUm90YXRlZDkwb3IyNzAgPyAnbm9uZScgOiAnZGlzcGxheScgOiAnbm9uZScsXG4gICAgICB3aWR0aDogJzI1JScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgdG9wOiAnMzBweCcsXG4gICAgICBib3JkZXI6ICdncmVlbiAycHggc29saWQnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FudmFzLCBjYW52YXNTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgcm90YXRpb25DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICByb3RhdGlvbkNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncm90YXRpb25DYW52YXMnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocm90YXRpb25DYW52YXMsIHtcbiAgICAgIGRpc3BsYXk6IHRoaXMuX19vcHRpb25zLnNob3dDYW52YXNQcmV2aWV3ID8gdGhpcy5fX2lzUm90YXRlZDkwb3IyNzAgPyAnZGlzcGxheScgOiAnbm9uZScgOiAnbm9uZScsXG4gICAgICBoZWlnaHQ6ICcyNSUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICByaWdodDogJzBweCcsXG4gICAgICB0b3A6ICczMHB4JyxcbiAgICAgIGJvcmRlcjogJ2JsdWUgMnB4IHNvbGlkJ1xuICAgIH0pO1xuICAgIG9jci5hcHBlbmRDaGlsZChyb3RhdGlvbkNhbnZhcyk7XG4gICAgcHJldmVudFRvRnJlZXplVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlby5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmVudFRvRnJlZXplVmlkZW8nKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJldmVudFRvRnJlZXplVmlkZW8sIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgYm90dG9tOiAnMTAnLFxuICAgICAgcmlnaHQ6ICcxMCdcbiAgICB9KTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlby5pbm5lckhUTUwgPSAnJyArICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cIm1hcmdpbjogYXV0bzsgYmFja2dyb3VuZDogbm9uZTsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bztcIiB3aWR0aD1cIjMycHhcIiBoZWlnaHQ9XCIzMnB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkXCI+XFxuJyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIwLjU1NTU1NTU1NTU1NTU1NTZzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MVwiIHZhbHVlcz1cIjEwOzBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJmaWxsXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwiZGlzY3JldGVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiIzg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMFwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICc8L3N2Zz4nO1xuICAgIG9jci5hcHBlbmRDaGlsZChwcmV2ZW50VG9GcmVlemVWaWRlbyk7XG4gICAgY3VzdG9tVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY3VzdG9tVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjdXN0b21VSVdyYXAnKTtcbiAgICBjb25zdCBjdXN0b21VSVdyYXBTdHlsZSA9IHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY3VzdG9tVUlXcmFwLCBjdXN0b21VSVdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGN1c3RvbVVJV3JhcCk7XG5cbiAgICAvLyDqsIEgdG9wLCBtaWRkbGUsIGJvdHRvbSBVSSDsgqzsmqkodXNlKeyXrOu2gOyZgCDqtIDqs4Tsl4bsnbQg7JiB7Jet7J2EIOyeoeq4sCDsnITtlbQsIGRpduqwgCDsl4bsnLzrqbQg7IOd7ISxXG4gICAgLy8gYWRqdXN0U3R5bGUoKSDsl5DshJwg7IS467aA7KCB7J24IOyCrOydtOymiOyZgCDsnITsuZjqsJIg64+Z7KCB7Jy866GcIOyEpOygleuQqC5cbiAgICBpZiAoIXRvcFVJKSB7XG4gICAgICB0b3BVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9wVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3RvcFVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZCh0b3BVSSk7XG4gICAgaWYgKCFtaWRkbGVVSSkge1xuICAgICAgbWlkZGxlVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG1pZGRsZVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdtaWRkbGVVSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQobWlkZGxlVUkpO1xuICAgIGlmICghYm90dG9tVUkpIHtcbiAgICAgIGJvdHRvbVVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBib3R0b21VSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnYm90dG9tVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKGJvdHRvbVVJKTtcbiAgICBjYXB0dXJlVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2FwdHVyZVVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZVVJV3JhcCcpO1xuICAgIGNvbnN0IGNhcHR1cmVVSVdyYXBTdHlsZSA9IHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjZW50ZXInXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwgY2FwdHVyZVVJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY2FwdHVyZVVJV3JhcCk7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgaWYgKHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSB8fCB0aGlzLl9fb3B0aW9ucy51c2VGb3JjZUNvbXBsZXRlVUkpIHtcbiAgICAgICAgaWYgKCFjYXB0dXJlVUkpIHtcbiAgICAgICAgICBjYXB0dXJlVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjYXB0dXJlVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhcHR1cmVVSScpO1xuICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYXB0dXJlQnV0dG9uKSB7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhcHR1cmVCdXR0b24nKTtcbiAgICAgICAgICBsZXQgY2FwdHVyZUJ1dHRvblNyY1NWRyA9IGBgO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYDxzdmcgd2lkdGg9JzgwJyBoZWlnaHQ9JzgwJyB2aWV3Qm94PScwIDAgODAgODAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uU3JjU1ZHICs9IGAgIDxjaXJjbGUgaWQ9J2NhcHR1cmVCdXR0b24nIGN4PSc0MCcgY3k9JzQwJyByPSczOCcgZmlsbD0nIzU1NTU1NScgc3Ryb2tlPScjZmZmZmZmJyBzdHJva2Utd2lkdGg9JzQnLz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYDwvc3ZnPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbi5pbm5lckhUTUwgPSBjYXB0dXJlQnV0dG9uU3JjU1ZHO1xuICAgICAgICAgIGNhcHR1cmVVSS5hcHBlbmRDaGlsZChjYXB0dXJlQnV0dG9uKTtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlVUlXcmFwLmFwcGVuZENoaWxkKGNhcHR1cmVVSSk7XG4gICAgICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IF9fb25DbGlja0NhcHR1cmVCdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzXy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgICAgICBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ3RydWUnKTtcbiAgICAgICAgICAgIF90aGlzXy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ3RydWUnKTtcbiAgICAgICAgICAgIF90aGlzXy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzXy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2FwdHVyZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja0NhcHR1cmVCdXR0b24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICBwcmV2aWV3VUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcmV2aWV3VUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3VUlXcmFwJyk7XG4gICAgICBjb25zdCBwcmV2aWV3VUlXcmFwU3R5bGUgPSB7XG4gICAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsXG4gICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzAwMDAwMGFhJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCBwcmV2aWV3VUlXcmFwU3R5bGUpO1xuICAgICAgb2NyLmFwcGVuZENoaWxkKHByZXZpZXdVSVdyYXApO1xuICAgICAgaWYgKCFwcmV2aWV3VUkpIHtcbiAgICAgICAgcHJldmlld1VJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByZXZpZXdVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld1VJJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld1VJLCB7XG4gICAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsXG4gICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgaGVpZ2h0OiAnJyxcbiAgICAgICAgJ21heC13aWR0aCc6ICc5MCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6ICc5MCUnXG4gICAgICB9KTtcbiAgICAgIHByZXZpZXdVSVdyYXAuYXBwZW5kQ2hpbGQocHJldmlld1VJKTtcbiAgICAgIGlmICghcHJldmlld0ltYWdlKSB7XG4gICAgICAgIHByZXZpZXdJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBwcmV2aWV3SW1hZ2Uuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdJbWFnZScpO1xuICAgICAgICBwcmV2aWV3VUkuYXBwZW5kQ2hpbGQocHJldmlld0ltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgc3dpdGNoVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzd2l0Y2hVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3N3aXRjaFVJV3JhcCcpO1xuICAgICAgY29uc3Qgc3dpdGNoVUlXcmFwU3R5bGUgPSB7XG4gICAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJycsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBvdmVyZmxvdzogJycsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH07XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoc3dpdGNoVUlXcmFwLCBzd2l0Y2hVSVdyYXBTdHlsZSk7XG4gICAgICBvY3IuYXBwZW5kQ2hpbGQoc3dpdGNoVUlXcmFwKTtcbiAgICAgIGlmICghc3dpdGNoVUkpIHtcbiAgICAgICAgc3dpdGNoVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3dpdGNoVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3N3aXRjaFVJJyk7XG4gICAgICAgIGxldCBzd2l0Y2hIVE1MID0gYGA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYDxkaXYgY2xhc3M9J2N1c3RvbS0tbGFiZWwgZmxleCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1jZW50ZXIgZ2FwMTAnPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPGxhYmVsIGZvcj0nbWFudWFsLXN3aXRjaC13YXNtLXRvLXNlcnZlci1jaGVja2JveCc+V0FTTTwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgY2xhc3M9J3N3aXRjaCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICAgIDxpbnB1dCBpZD0nbWFudWFsLXN3aXRjaC13YXNtLXRvLXNlcnZlci1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgICA8c3BhbiBjbGFzcz0nc2xpZGVyIHJvdW5kJz48L3NwYW4+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8L2xhYmVsPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPGxhYmVsIGZvcj0ncHJpb3JpdHktZmluYW5jZS1jb2h0bWxGb3JsaXN0LWNoZWNrYm94Jz5TZXJ2ZXI8L2xhYmVsPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYDwvZGl2PmA7XG4gICAgICAgIHN3aXRjaFVJLmlubmVySFRNTCA9IHN3aXRjaEhUTUw7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoc3dpdGNoVUksIHtcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICB9KTtcbiAgICAgIHN3aXRjaFVJV3JhcC5hcHBlbmRDaGlsZChzd2l0Y2hVSSk7XG4gICAgICBjb25zdCBzd2l0Y2hDaGVja2JveCA9IHN3aXRjaFVJLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdO1xuICAgICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICAgIGNvbnN0IF9fb25DbGlja1N3aXRjaFVJID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzXy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGF3YWl0IF90aGlzXy5yZXN0YXJ0T0NSKF90aGlzXy5fX29jclR5cGUsIF90aGlzXy5fX29uU3VjY2VzcywgX3RoaXNfLl9fb25GYWlsdXJlLCBfdGhpc18uX19vbkluUHJvZ3Jlc3NDaGFuZ2UsIHRydWUpO1xuICAgICAgfTtcbiAgICAgIHN3aXRjaENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrU3dpdGNoVUksIHtcbiAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHByZWxvYWRpbmdVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmVsb2FkaW5nVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmVsb2FkaW5nVUlXcmFwJyk7XG4gICAgY29uc3QgcHJlbG9hZGluZ1VJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwMDAwZmYnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJlbG9hZGluZ1VJV3JhcCwgcHJlbG9hZGluZ1VJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQocHJlbG9hZGluZ1VJV3JhcCk7XG4gICAgaWYgKCFwcmVsb2FkaW5nVUkpIHtcbiAgICAgIHByZWxvYWRpbmdVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJlbG9hZGluZ1VJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmVsb2FkaW5nVUknKTtcbiAgICAgIHByZWxvYWRpbmdVSS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RleHQtaW5mbycpO1xuICAgICAgcHJlbG9hZGluZ1VJLmlubmVySFRNTCA9ICcnICsgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiYmFja2dyb3VuZDogbm9uZTsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bztcIiB3aWR0aD1cIjMycHhcIiBoZWlnaHQ9XCIzMnB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkXCI+XFxuJyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIwLjU1NTU1NTU1NTU1NTU1NTZzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MVwiIHZhbHVlcz1cIjEwOzBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJmaWxsXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwiZGlzY3JldGVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiIzg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMFwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiMTZcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICc8L3N2Zz4nO1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2cgPT09ICcnIHx8IHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2cpIHtcbiAgICAgICAgcHJlbG9hZGluZ1VJLmlubmVySFRNTCArPSB0aGlzLl9fb3B0aW9ucy5wcmVsb2FkaW5nVUlUZXh0TXNnO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUocHJlbG9hZGluZ1VJLCB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgIH0pO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuYXBwZW5kQ2hpbGQocHJlbG9hZGluZ1VJKTtcblxuICAgIC8vIGxvYWRpbmcgVUkg7JyE7LmYIOyekOumrOyeoeqyjCDtlZjquLAg7JyE7ZW0XG4gICAgYXdhaXQgdGhpcy5fX2luaXRTdHlsZSgpO1xuXG4gICAgLy8g7ZmU66m06rO864+EIO2YhOyDgSDtlbTqsrBcbiAgICB0aGlzLl9fc2V0U3R5bGUob2NyLCB7XG4gICAgICBkaXNwbGF5OiAnJ1xuICAgIH0pO1xuICAgIHRoaXMuX19vY3IgPSBvY3I7XG4gICAgdGhpcy5fX2NhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLl9fcm90YXRpb25DYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICB0aGlzLl9fdmlkZW8gPSB2aWRlbztcbiAgICB0aGlzLl9fdmlkZW9XcmFwID0gdmlkZW9XcmFwO1xuICAgIHRoaXMuX19ndWlkZUJveCA9IGd1aWRlQm94O1xuICAgIHRoaXMuX19ndWlkZUJveFdyYXAgPSBndWlkZUJveFdyYXA7XG4gICAgdGhpcy5fX21hc2tCb3hXcmFwID0gbWFza0JveFdyYXA7XG4gICAgdGhpcy5fX3ByZXZlbnRUb0ZyZWV6ZVZpZGVvID0gcHJldmVudFRvRnJlZXplVmlkZW87XG4gICAgdGhpcy5fX2N1c3RvbVVJV3JhcCA9IGN1c3RvbVVJV3JhcDtcbiAgICB0aGlzLl9fdG9wVUkgPSB0b3BVSTtcbiAgICB0aGlzLl9fbWlkZGxlVUkgPSBtaWRkbGVVSTtcbiAgICB0aGlzLl9fYm90dG9tVUkgPSBib3R0b21VSTtcbiAgICB0aGlzLl9fY2FwdHVyZVVJV3JhcCA9IGNhcHR1cmVVSVdyYXA7XG4gICAgdGhpcy5fX2NhcHR1cmVVSSA9IGNhcHR1cmVVSTtcbiAgICB0aGlzLl9fY2FwdHVyZUJ1dHRvbiA9IGNhcHR1cmVCdXR0b247XG4gICAgdGhpcy5fX3ByZXZpZXdVSVdyYXAgPSBwcmV2aWV3VUlXcmFwO1xuICAgIHRoaXMuX19wcmV2aWV3VUkgPSBwcmV2aWV3VUk7XG4gICAgdGhpcy5fX3ByZXZpZXdJbWFnZSA9IHByZXZpZXdJbWFnZTtcbiAgICB0aGlzLl9fc3dpdGNoVUlXcmFwID0gc3dpdGNoVUlXcmFwO1xuICAgIHRoaXMuX19zd2l0Y2hVSSA9IHN3aXRjaFVJO1xuICAgIHJldHVybiB7XG4gICAgICBvY3IsXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhcyxcbiAgICAgIHZpZGVvLFxuICAgICAgdmlkZW9XcmFwLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBndWlkZUJveFdyYXAsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLFxuICAgICAgY3VzdG9tVUlXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b24sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld1VJLFxuICAgICAgcHJldmlld0ltYWdlLFxuICAgICAgc3dpdGNoVUlXcmFwLFxuICAgICAgc3dpdGNoVUlcbiAgICB9O1xuICB9XG4gIF9fYmx1ckNhcHR1cmVCdXR0b24oKSB7XG4gICAgdGhpcy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgIGRpc3BsYXk6ICcnXG4gICAgfSk7XG4gICAgY29uc3Qge1xuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChjYXB0dXJlQnV0dG9uKSB7XG4gICAgICBjYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcsICdmYWxzZScpO1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVCdXR0b24sIHtcbiAgICAgICAgZGlzcGxheTogJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBfX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHJldHVybiBjYXB0dXJlQnV0dG9uID8gY2FwdHVyZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnKSA9PT0gJ3RydWUnIDogZmFsc2U7XG4gIH1cbiAgYXN5bmMgX19zZXR1cFZpZGVvKGlzUGFzc3BvcnQpIHtcbiAgICAvLyB3YXNtIOyduOyLneyEseuKpSDstZzsoIHtmZTrkJwg7ZW07IOB64+EXG4gICAgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCA9IDEwODA7XG4gICAgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQgPSA3MjA7XG4gICAgdGhpcy5fX2NhbVNldENvbXBsZXRlID0gZmFsc2U7XG4gICAgY29uc3Qge1xuICAgICAgdmlkZW8sXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhc1xuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGxldCBjYW1lcmEgPSBhd2FpdCB0aGlzLl9fZ2V0SW5wdXREZXZpY2VzKCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3ZpZGVvRGV2aWNlcyA6OiAnLCBjYW1lcmEpXG5cbiAgICB0aGlzLmNoZWNrVUlPcmllbnRhdGlvbigpO1xuICAgIGxldCBjb25zdHJhaW50V2lkdGgsIGNvbnN0cmFpbnRIZWlnaHQ7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSA9PT0gJ2hpZ2hRdWFsaXR5Jykge1xuICAgICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgOiDtmZTsp4gg7Jqw7ISgXG4gICAgICAvLyAxOTIweDEwODDsnbQg6rCA64ql7ZWc6rK97JqwIOyCrOyaqSDslYTri4jrqbQgMTI4MHg3MjAg7IKs7JqpXG4gICAgICBjb25zdHJhaW50V2lkdGggPSB7XG4gICAgICAgIGlkZWFsOiAxOTIwLFxuICAgICAgICBtaW46IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50SGVpZ2h0ID0ge1xuICAgICAgICBpZGVhbDogMTA4MCxcbiAgICAgICAgbWluOiA3MjBcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vICdjb21wYXRpYmlsaXR5J1xuICAgICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgOiDtmLjtmZjshLEg7Jqw7ISgXG4gICAgICAvLyAxOTIweDEwODDsnbQg7IKs7JqpIOqwgOuKpe2VmOuNlOudvOuPhCAxMjgweDcyMOydhCDsgqzsmqntlZjrj4TroZ0g6rOg7KCVXG4gICAgICAvLyDsgqzsnKAgOiDqsKTrn63si5wgZW50cnkg66qo6424KEHsi5zrpqzspoggLyBXaWRlIOuqqOuNuCDrk7Ep7JeQ7IScIDE5MjAgeCAxMDgwIOyymOumrOyLnCDruYTsnKjsnbQg7J207IOB7ZW07KeQKO2ZgOytieydtOuQqClcbiAgICAgIC8vIO2VreyDgSAxMjgwIHggNzIw7J2EIOyCrOyaqe2VmOuPhOuhnSDrs4Dqsr1cbiAgICAgIGNvbnN0cmFpbnRXaWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50SGVpZ2h0ID0ge1xuICAgICAgICBpZGVhbDogNzIwXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBjb25zdHJhaW50cyA9IHtcbiAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgIHZpZGVvOiB7XG4gICAgICAgIHpvb206IHtcbiAgICAgICAgICBpZGVhbDogMVxuICAgICAgICB9LFxuICAgICAgICBmYWNpbmdNb2RlOiB7XG4gICAgICAgICAgaWRlYWw6IHRoaXMuX19mYWNpbmdNb2RlQ29uc3RyYWludFxuICAgICAgICB9LFxuICAgICAgICBmb2N1c01vZGU6IHtcbiAgICAgICAgICBpZGVhbDogJ2NvbnRpbnVvdXMnXG4gICAgICAgIH0sXG4gICAgICAgIHdoaXRlQmFsYW5jZU1vZGU6IHtcbiAgICAgICAgICBpZGVhbDogJ2NvbnRpbnVvdXMnXG4gICAgICAgIH0sXG4gICAgICAgIGRldmljZUlkOiBjYW1lcmEubGVuZ3RoID8ge1xuICAgICAgICAgIGlkZWFsOiBjYW1lcmFbY2FtZXJhLmxlbmd0aCAtIDFdXG4gICAgICAgIH0gOiBudWxsLFxuICAgICAgICB3aWR0aDogY29uc3RyYWludFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvbnN0cmFpbnRIZWlnaHRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8g7LWc7LSIIOynhOyehSDsnbTslrTshJwgdmlkZW9EZWl2Y2Ug66as7Iqk7Yq466W8IOqwgOyguOyYrCDsiJgg7JeG7Jy866m0LFxuICAgIC8vIGdldFVzZXJNZWRpYeulvCDsnoTsnZgg7Zi47Lac7ZWY7JesIOq2jO2VnOydhCDrsJvsnYDrkqQg64uk7IucIOqwgOyguOyYtFxuICAgIGlmIChjYW1lcmEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9fZGVidWcoJ2Nhbm5vdCB0byBnZXQgY2FtZXJhIGRldmljZXMuIHNvLCB0cnkgdG8gZ2V0IGNhbWVyYSBkZXZpY2VzIGFnYWluJyk7XG4gICAgICB0aGlzLl9fZGVidWcoYGNvbnN0cmFpbnRzIDogJHtKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cyl9YCk7XG4gICAgICB0aGlzLl9fc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gICAgICBjYW1lcmEgPSBhd2FpdCB0aGlzLl9fZ2V0SW5wdXREZXZpY2VzKCk7XG4gICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGNhbWVyYS5sZW5ndGggPyB7XG4gICAgICAgIGlkZWFsOiBjYW1lcmFbY2FtZXJhLmxlbmd0aCAtIDFdXG4gICAgICB9IDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyDqsKTrn63si5wgd2lkZSDrk7Eg7KCA7IKs7JaRIOq4sOq4sOyXkOyEnCBGSEQg7ZW07IOB64+EIOy5tOuplOudvCDsgqzsmqnsi5wg7ZmA7K2J7J2065CY64qUIO2YhOyDgSDrsKnsp4BcbiAgICAvLyDsoIDsgqzslpEg6riw6riwIO2MkOuLqOq4sOykgCA6IO2bhOuptOy5tOuplOudvOydmCDqsJzsiJjqsIAgMeqwnOudvOuKlCDqsIDsoJVcbiAgICBpZiAoY2FtZXJhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5fX2RlYnVnKCdtYXliZSBkZXZpY2UgaXMgZW50cnkgbW9kZWwgc3VjaCBhcyBnYWxheHkgd2lkZScpO1xuICAgICAgY29uc3RyYWludHMudmlkZW8ud2lkdGggPSB7XG4gICAgICAgIGlkZWFsOiAxMjgwXG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMudmlkZW8uaGVpZ2h0ID0ge1xuICAgICAgICBpZGVhbDogNzIwXG4gICAgICB9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gY29uc3QgZHVtcHRyYWNrID0gKFthLCBiXSwgdHJhY2spID0+XG4gICAgICAvLyAgIGAke2F9JHt0cmFjay5raW5kID09ICd2aWRlbycgPyAnQ2FtZXJhJyA6ICdNaWNyb3Bob25lJ30gKCR7dHJhY2sucmVhZHlTdGF0ZX0pOiAke3RyYWNrLmxhYmVsfSR7Yn1gO1xuXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICB0aGlzLl9fZGVidWcoYGNvbnN0cmFpbnRzIDogJHtKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cyl9YCk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3ZpZGVvVHJhY2tzIDo6ICcsIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpKTtcbiAgICAgIGNvbnN0IHN0cmVhbVNldHRpbmdzID0gc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1ZyhcbiAgICAgIC8vICAgJ3N0cmVhbUNhcGFiaWxpdGllcyA6OiAnLFxuICAgICAgLy8gICBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRDYXBhYmlsaXRpZXMoKVxuICAgICAgLy8gKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1Zygnc3RyZWFtIDo6ICcsIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldENvbnN0cmFpbnRzKCkpO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCdzdHJlYW1TZXR0aW5ncyA6OiAnLCBzdHJlYW1TZXR0aW5ncyk7XG4gICAgICB0aGlzLl9fZGVidWcoYHN0cmVhbSB3aWR0aCAqIGhlaWdodCA6OiAke3N0cmVhbVNldHRpbmdzLndpZHRofSAqICR7c3RyZWFtU2V0dGluZ3MuaGVpZ2h0fWApO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gd2lkdGggLyBoZWlnaHQgOjogJyArIHN0cmVhbVNldHRpbmdzLndpZHRoIC8gc3RyZWFtU2V0dGluZ3MuaGVpZ2h0KTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIGFzcGVjdFJhdGlvIDo6ICcgKyBzdHJlYW1TZXR0aW5ncy5hc3BlY3RSYXRpbyk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSBmYWNpbmdNb2RlIDo6ICcgKyBzdHJlYW1TZXR0aW5ncy5mYWNpbmdNb2RlKTtcbiAgICAgIFtjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgICBbcm90YXRpb25DYW52YXMud2lkdGgsIHJvdGF0aW9uQ2FudmFzLmhlaWdodF0gPSBbdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGhdO1xuICAgICAgfVxuICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgdGhpcy5fX3N0cmVhbSA9IHN0cmVhbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2luaXRTdHlsZSgpIHtcbiAgICB2b2lkIDA7XG4gICAgY29uc3Qge1xuICAgICAgb2NyLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuXG4gICAgLy8g6riw7KSA7KCV67O0XG4gICAgY29uc3QgYmFzZVdpZHRoID0gNDAwO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSAyNjA7XG4gICAgY29uc3Qgc2Nhbm5lckZyYW1lUmF0aW8gPSBiYXNlSGVpZ2h0IC8gYmFzZVdpZHRoOyAvLyDsi6DrtoTspp0g67mE7JyoXG5cbiAgICBsZXQgZ3VpZGVCb3hXaWR0aCwgZ3VpZGVCb3hIZWlnaHQ7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRXaWR0aCA9IG9jci5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY09jckNsaWVudEhlaWdodCA9IG9jci5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoO1xuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzO1xuICAgIGNvbnN0IGd1aWRlQm94UmF0aW9CeVdpZHRoID0gdGhpcy5fX2d1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgIGNvbnN0IHZpZGVvUmF0aW9CeUhlaWdodCA9IHRoaXMuX192aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICAvLyDshLjroZwgVUkgJiYg7IS466GcIOu5hOuUlOyYpOuhnCDqsITso7xcbiAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuICAgICAgZ3VpZGVCb3hXaWR0aCA9IGNhbGNPY3JDbGllbnRXaWR0aCAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOqwgOuhnCBVSSAmJiDqsIDroZwg67mE65SU7Jik66GcIOqwhOyjvFxuICAgICAgLy8g67mE65SU7Jik66W8IOqwgOuhnCBVSeydmCBoZWlnaHQg6riw7KSA7Jy866GcIOykhOydtOqzoFxuICAgICAgLy8g6rCA66GcIFVJIGhlaWdodCDquLDspIDsnLzroZwg67mE65SU7Jik7J2YIHdpZHRoIOqzhOyCsFxuICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBjYWxjT2NyQ2xpZW50SGVpZ2h0ICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcbiAgICB9XG4gICAgZ3VpZGVCb3hXaWR0aCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgZ3VpZGVCb3hIZWlnaHQgKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveFdpZHRoID0gZ3VpZGVCb3hXaWR0aCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveEhlaWdodCA9IGd1aWRlQm94SGVpZ2h0ICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgaWYgKHRvcFVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodG9wVUksIHtcbiAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtaWRkbGVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKG1pZGRsZVVJLCB7XG4gICAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICBwYWRkaW5nOiAnMTBweCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYm90dG9tVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShib3R0b21VSSwge1xuICAgICAgICAncGFkZGluZy10b3AnOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHZpZGVvSW5uZXJHYXAgPSAyOyAvLyDrr7jshLjtlZjqsowgbWFza0JveElubmVy67O064ukIGd1aWRlQm946rCAIOyekeydgOqygyDrs7TsoJVcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHtcbiAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgIH0pO1xuICAgIGNvbnN0IG1hc2tCb3hJbm5lciA9IG1hc2tCb3hXcmFwLnF1ZXJ5U2VsZWN0b3IoJyNtYXNrQm94SW5uZXInKTtcbiAgICBsZXQgciA9IGJvcmRlclJhZGl1cyAtIGJvcmRlcldpZHRoICogMjtcbiAgICByID0gciA8IDAgPyAwIDogcjtcbiAgICBpZiAoIWlzTmFOKHJlZHVjZWRHdWlkZUJveFdpZHRoKSAmJiAhaXNOYU4ocmVkdWNlZEd1aWRlQm94SGVpZ2h0KSAmJiAhaXNOYU4oYm9yZGVyUmFkaXVzKSAmJiAhaXNOYU4oYm9yZGVyV2lkdGgpKSB7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJXaWR0aCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJIZWlnaHQgPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgbWFza0JveElubmVyV2lkdGggKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBtYXNrQm94SW5uZXJIZWlnaHQgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd4JywgbWFza0JveElubmVyV2lkdGggLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd5JywgbWFza0JveElubmVySGVpZ2h0IC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncngnLCByICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncnknLCByICsgJycpO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2FkanVzdFN0eWxlKCkge1xuICAgIGNvbnN0IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEgPSAoYSwgYikgPT4ge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnY2FtZXJhUmVzb2x1dGlvbicpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGEsIGIpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9fb3B0aW9ucy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9PT0gJ29jclZpZXdTaXplJykge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoYSwgYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oYSwgYik7IC8vIGRlZmF1bHQgOiBjYW1lcmFSZXNvbHV0aW9uXG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICBvY3IsXG4gICAgICB2aWRlbyxcbiAgICAgIGd1aWRlQm94LFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICAgIGNvbnN0IGlzQWxpZW5CYWNrID0gdGhpcy5fX29jclR5cGUgPT09ICdhbGllbi1iYWNrJztcblxuICAgIC8vIOq4sOykgOygleuztFxuICAgIGNvbnN0IGJhc2VXaWR0aCA9IGlzQWxpZW5CYWNrID8gMjYwIDogNDAwO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSBpc0FsaWVuQmFjayA/IDQwMCA6IDI2MDtcbiAgICBjb25zdCBzY2FubmVyRnJhbWVSYXRpbyA9IGJhc2VIZWlnaHQgLyBiYXNlV2lkdGg7IC8vIOyLoOu2hOymnSDruYTsnKhcblxuICAgIGxldCBndWlkZUJveFdpZHRoLCBndWlkZUJveEhlaWdodDtcbiAgICBsZXQgY2FsY09jckNsaWVudFdpZHRoID0gb2NyLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjT2NyQ2xpZW50SGVpZ2h0ID0gb2NyLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvV2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9IZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPSB2aWRlby5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID0gdmlkZW8uY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uO1xuICAgIGlmIChjYWxjVmlkZW9XaWR0aCA9PT0gMCB8fCBjYWxjVmlkZW9IZWlnaHQgPT09IDAgfHwgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPT09IDAgfHwgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJvcmRlcldpZHRoID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS53aWR0aDtcbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnJhZGl1cztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIFtjYWxjVmlkZW9XaWR0aCwgY2FsY1ZpZGVvSGVpZ2h0XSA9IFtjYWxjVmlkZW9IZWlnaHQsIGNhbGNWaWRlb1dpZHRoXTtcbiAgICAgIFtjYWxjVmlkZW9DbGllbnRXaWR0aCwgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0XSA9IFtjYWxjVmlkZW9DbGllbnRIZWlnaHQsIGNhbGNWaWRlb0NsaWVudFdpZHRoXTtcbiAgICAgIGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCc7XG4gICAgfVxuICAgIGxldCBuZXdWaWRlb1dpZHRoID0gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgbGV0IG5ld1ZpZGVvSGVpZ2h0ID0gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGd1aWRlQm94UmF0aW9CeVdpZHRoID0gdGhpcy5fX2d1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgIGNvbnN0IHZpZGVvUmF0aW9CeUhlaWdodCA9IHRoaXMuX192aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgY29uc3QgbmV3VmlkZW9SYXRpb0J5V2lkdGggPSBjYWxjVmlkZW9DbGllbnRIZWlnaHQgLyBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBjb25zdCBuZXdWaWRlb1JhdGlvQnlIZWlnaHQgPSBjYWxjVmlkZW9DbGllbnRXaWR0aCAvIGNhbGNWaWRlb0NsaWVudEhlaWdodDtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIC8vIOyEuOuhnCBVSVxuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnXG4gICAgICB9KTtcbiAgICAgIC8vIHZpZGVvIOqwgOuhnCDquLDspIAgMTAwJSDsnKDsp4AgKOuzgOqyveyXhuydjClcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g7Lm066mU652864+EIOyEuOuhnFxuICAgICAgICAvLyDshLjroZwgVUkgJiYg7IS466GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDqsIDroZwg6riw7KSA7Jy866GcIOqwgOydtOuTnOuwleyKpCDqs4TsgrBcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG5cbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDtmZXrjIBcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g7Lm066mU652864qUIOqwgOuhnFxuICAgICAgICAvLyDshLjroZwgVUkgJiYg6rCA66GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7Iqk66W8IOu5hOuUlOyYpCDshLjroZwg6ri47J207JeQIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpO1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDqsIDroZwgVUlcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZW5kJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcidcbiAgICAgIH0pO1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDqsIDroZwgVUkgJiYg6rCA66GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDruYTrlJTsmKTrpbwg6rCA66GcIFVJ7J2YIGhlaWdodCDquLDspIDsnLzroZwg7KSE7J206rOgXG4gICAgICAgIC8vIOqwgOuhnCBVSSBoZWlnaHQg6riw7KSA7Jy866GcIOu5hOuUlOyYpOydmCB3aWR0aCDqs4TsgrBcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTripQg7IS466GcIOq4sOykgOycvOuhnCDrp57stqRcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG5cbiAgICAgICAgLy8g67mE65SU7Jik66W8IOyEuOuhnCDquLDspIDsnLzroZwg64uk7IucIOunnuy2pFxuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IGd1aWRlQm94SGVpZ2h0O1xuICAgICAgICBuZXdWaWRlb1dpZHRoID0gbmV3VmlkZW9IZWlnaHQgKiBuZXdWaWRlb1JhdGlvQnlIZWlnaHQ7XG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk7J2YIOqwgOuhnCDtgazquLDqsIAg6rCA66GcIFVJIHdpZHRoICogcmF0aW8g6rCS67O064ukIO2BrOuptCxcbiAgICAgICAgaWYgKGd1aWRlQm94V2lkdGggPiBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGgpIHtcbiAgICAgICAgICAvLyDqs4TsgrAg67Cp7Iud7J2EIOuwlOq+vOuLpCAo7IKs7JygIDog6rGw7J2YIOygleyCrOqwge2YleyXkCDqsIDquYzsmrQg6rK97JqwIOqwgOydtOuTnCDrsJXsiqQg6rCA66Gc6rCAIOq9ieywqOqyjCDrkKguKVxuICAgICAgICAgIGd1aWRlQm94V2lkdGggPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG5cbiAgICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIO2ZleuMgFxuICAgICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDqsIDroZwgVUkgJiYg7IS466GcIOu5hOuUlOyYpFxuICAgICAgICAvLyDqsIDroZwg6riw7KSA7Jy866GcIOqwgOydtOuTnOuwleyKpCDqs4TsgrBcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZggaGVpZ2h0IO2BrOq4sOulvCBVSeydmCBoZWlnaHQg6riw7KSA7JeQIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZgg6rCA66GcIO2BrOq4sOqwgCDqsIDroZwgVUkgd2lkdGggKiByYXRpbyDqsJLrs7Tri6Qg7YGs66m0LFxuICAgICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aCkge1xuICAgICAgICAgIC8vIOqzhOyCsCDrsKnsi53snYQg67CU6r6864ukICjsgqzsnKAgOiDqsbDsnZgg7KCV7IKs6rCB7ZiV7JeQIOqwgOq5jOyatCDqsr3smrAg6rCA7J2065OcIOuwleyKpCDqsIDroZzqsIAg6r2J7LCo6rKMIOuQqC4pXG4gICAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7LaV7IaMXG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjYWxjR3VpZGVCb3hDcml0ZXJpYSjsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSDquLDspIAp6rCAIG9jclZpZXdTaXplKO2ZlOuptCDtgazquLApIOq4sOykgOydvOuVjFxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9PT0gJ29jclZpZXdTaXplJykge1xuICAgICAgLy8gZ3VpZGVCb3hIZWlnaHQg7J20IGNhbGNPY3JDbGllbnRIZWlnaHQg67O064ukIO2BsOqyveyasCjqsIDsnbTrk5zrsJXsiqTqsIAg7ZmU66m07J2EIOuEmOyWtOqwgOuKlCDqsr3smrApIOuLpOyLnCDqs4TsgrBcbiAgICAgIGlmIChndWlkZUJveEhlaWdodCA+IGNhbGNPY3JDbGllbnRIZWlnaHQpIHtcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBNYXRoLm1pbihjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIC8vIGd1aWRlQm94SGVpZ2h0IOydtCBjYWxjT2NyQ2xpZW50SGVpZ2h0IOuztOuLpCDtgbDqsr3smrAo6rCA7J2065Oc67CV7Iqk6rCAIO2ZlOuptOydhCDrhJjslrTqsIDripQg6rK97JqwKSDri6Tsi5wg6rOE7IKwXG4gICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IGNhbGNPY3JDbGllbnRXaWR0aCkge1xuICAgICAgICBndWlkZUJveFdpZHRoID0gTWF0aC5taW4oY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aCA9IE1hdGgubWluKGd1aWRlQm94V2lkdGgsIG5ld1ZpZGVvV2lkdGgpO1xuICAgIHRoaXMuX19jcm9wSW1hZ2VTaXplSGVpZ2h0ID0gTWF0aC5taW4oZ3VpZGVCb3hIZWlnaHQsIG5ld1ZpZGVvSGVpZ2h0KTtcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIFtuZXdWaWRlb1dpZHRoLCBuZXdWaWRlb0hlaWdodF0gPSBbbmV3VmlkZW9IZWlnaHQsIG5ld1ZpZGVvV2lkdGhdO1xuICAgIH1cbiAgICBndWlkZUJveFdpZHRoICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBndWlkZUJveEhlaWdodCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94V2lkdGggPSBndWlkZUJveFdpZHRoICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQgKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBpZiAodG9wVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh0b3BVSSwge1xuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUobWlkZGxlVUksIHtcbiAgICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChib3R0b21VSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGJvdHRvbVVJLCB7XG4gICAgICAgICdwYWRkaW5nLXRvcCc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICB3aWR0aDogbmV3VmlkZW9XaWR0aCArICdweCdcbiAgICB9KTtcbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIGhlaWdodDogbmV3VmlkZW9IZWlnaHQgKyAncHgnXG4gICAgfSk7XG4gICAgY29uc3QgdmlkZW9Jbm5lckdhcCA9IDI7IC8vIOuvuOyEuO2VmOqyjCBtYXNrQm94SW5uZXLrs7Tri6QgZ3VpZGVCb3jqsIAg7J6R7J2A6rKDIOuztOyglVxuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgfSk7XG4gICAgY29uc3QgbWFza0JveElubmVyID0gbWFza0JveFdyYXAucXVlcnlTZWxlY3RvcignI21hc2tCb3hJbm5lcicpO1xuICAgIGxldCByID0gYm9yZGVyUmFkaXVzIC0gYm9yZGVyV2lkdGggKiAyO1xuICAgIHIgPSByIDwgMCA/IDAgOiByO1xuICAgIGlmICghaXNOYU4ocmVkdWNlZEd1aWRlQm94V2lkdGgpICYmICFpc05hTihyZWR1Y2VkR3VpZGVCb3hIZWlnaHQpICYmICFpc05hTihib3JkZXJSYWRpdXMpICYmICFpc05hTihib3JkZXJXaWR0aCkpIHtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lcldpZHRoID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lckhlaWdodCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBtYXNrQm94SW5uZXJXaWR0aCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hc2tCb3hJbm5lckhlaWdodCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3gnLCBtYXNrQm94SW5uZXJXaWR0aCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3knLCBtYXNrQm94SW5uZXJIZWlnaHQgLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeCcsIHIgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeScsIHIgKyAnJyk7XG4gICAgfVxuXG4gICAgLy8g7IiY64+ZIOy0rOyYgSBVSSDsgqzsmqlcbiAgICAvLyBmaXJzdENhbGxlZOyduCDqsr3smrAg7JWE7KeBIGNhcHR1cmVVSeqwgCDqt7jroKTsp4Dsp4Ag7JWK7JWEIOustOydmOuvuFxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgZGlzcGxheTogJydcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnICYmIGJvdHRvbVVJICYmIGNhcHR1cmVVSSkge1xuICAgICAgICBjb25zdCBjYWxjU3VtT2ZIZWlnaHRCb3R0b21VSUNoaWxkTm9kZXMgPSB0aGlzLl9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2Rlcyhib3R0b21VSSk7XG4gICAgICAgIGxldCBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9IGNhcHR1cmVCdXR0b24ucXVlcnlTZWxlY3Rvcignc3ZnJykuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICAgICAgY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQgPSBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9PT0gMCA/IDgwIDogY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQ7XG4gICAgICAgIGxldCBjYXB0dXJlVUlQYWRkaW5nQm90dG9tID0gYm90dG9tVUkuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGlzTmFOKHBhcnNlSW50KGJvdHRvbVVJLnN0eWxlLnBhZGRpbmdUb3ApKSA/IDAgOiBwYXJzZUludChib3R0b21VSS5zdHlsZS5wYWRkaW5nVG9wKTtcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBjYWxjU3VtT2ZIZWlnaHRCb3R0b21VSUNoaWxkTm9kZXM7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJhc2VsaW5lID0gY2FsY09jckNsaWVudEhlaWdodCAtIChjYWxjT2NyQ2xpZW50SGVpZ2h0IC8gMiArIGd1aWRlQm94SGVpZ2h0IC8gMik7XG4gICAgICAgIGlmIChjYXB0dXJlVUlQYWRkaW5nQm90dG9tID4gMCAmJiBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIDwgYmFzZWxpbmUpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6ICcnLFxuICAgICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSArICdweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJzEwcHgnLFxuICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0cnVlKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzKG9iaikge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmo/LmNoaWxkTm9kZXMpIHtcbiAgICAgIHN1bSArPSBpdGVtLmNsaWVudEhlaWdodCA/IGl0ZW0uY2xpZW50SGVpZ2h0IDogMDtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbiAgfVxuICBfX2Nsb3NlQ2FtZXJhKCkge1xuICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICB0aGlzLnN0b3BTY2FuKCk7XG4gICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gIH1cbiAgYXN5bmMgX19sb2FkUmVzb3VyY2VzKCkge1xuICAgIHZvaWQgMDtcbiAgICBpZiAodGhpcy5fX3Jlc291cmNlc0xvYWRlZCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9faXNTdXBwb3J0U2ltZCA9IGF3YWl0IHNpbWQoKTtcbiAgICBsZXQgZW52SW5mbyA9ICcnO1xuICAgIGVudkluZm8gKz0gYG9zIDogJHt0aGlzLl9fZGV2aWNlSW5mby5vc31cXG5gO1xuICAgIGVudkluZm8gKz0gYG9zU2ltcGxlIDogJHt0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZX1cXG5gO1xuICAgIGVudkluZm8gKz0gYGlzU3VwcG9ydFdhc206ICR7dGhpcy5fX2lzU3VwcG9ydFdhc219XFxuYDtcbiAgICBlbnZJbmZvICs9IGBzaW1kKHdhc20tZmVhdHVyZS1kZXRlY3QpIDogJHt0aGlzLl9faXNTdXBwb3J0U2ltZH1cXG5gO1xuICAgIGlmICh0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZSA9PT0gJ0lPUycgfHwgdGhpcy5fX2RldmljZUluZm8ub3NTaW1wbGUgPT09ICdNQUMnKSB7XG4gICAgICB0aGlzLl9faXNTdXBwb3J0U2ltZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbnZJbmZvICs9IGBpc1N1cHBvcnRTaW1kKGZpbmFsKSA6ICR7dGhpcy5fX2lzU3VwcG9ydFNpbWR9XFxuYDtcbiAgICBlbnZJbmZvICs9IGBVc2VyQWdlbnQgOiAke25hdmlnYXRvci51c2VyQWdlbnR9XFxuYDtcbiAgICB2b2lkIDA7XG4gICAgdGhpcy5fX2RlYnVnKGVudkluZm8pO1xuICAgIHdpbmRvdy51c2ViT0NSRW52SW5mbyA9IGVudkluZm87XG4gICAgbGV0IHNka1N1cHBvcnRFbnYgPSAncXVyYW0nO1xuICAgIGlmICh0aGlzLl9faXNTdXBwb3J0U2ltZCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgc2RrU3VwcG9ydEVudiArPSAnX3NpbWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICAgIHZvaWQgMDtcbiAgICB3aW5kb3cudXNlYk9DUkVudkluZm8gPSBlbnZJbmZvO1xuICAgIHZvaWQgMDtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLmpzJywgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKTtcbiAgICBsZXQgc3JjID0gYXdhaXQgZmV0Y2godXJsLmhyZWYpLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpLnRoZW4odGV4dCA9PiB7XG4gICAgICBsZXQgcmVnZXggPSAvKC4qKSA9IE1vZHVsZS5jd3JhcC9nbTtcbiAgICAgIGxldCBzb3VyY2UgPSB0ZXh0LnJlcGxhY2UocmVnZXgsICdNb2R1bGUuJDEgPSBNb2R1bGUuY3dyYXAnKTtcblxuICAgICAgLy8gZGF0YShtb2RlbClcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKC9eXFwoZnVuY3Rpb25cXChcXCkgXFx7L20sICd2YXIgY3JlYXRlTW9kZWxEYXRhID0gYXN5bmMgZnVuY3Rpb24oKSB7XFxuJyArICcgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcXG4nKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCcgICBjb25zb2xlLmVycm9yKFwicGFja2FnZSBlcnJvcjpcIiwgZXJyb3IpOycsICcgICByZWplY3QoKTtcXG4nICsgJyAgIGNvbnNvbGUuZXJyb3IoXCJwYWNrYWdlIGVycm9yOlwiLCBlcnJvcik7Jyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnICB9LCBoYW5kbGVFcnJvciknLCAnICByZXNvbHZlKCk7XFxuJyArICcgIH0sIGhhbmRsZUVycm9yKScpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoL15cXH1cXClcXChcXCk7L20sICdcXG4gfSlcXG4nICsgJ307Jyk7XG5cbiAgICAgIC8vIHdhc21cbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKHNka1N1cHBvcnRFbnYgKyAnLndhc20nLCBuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLndhc20nLCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpLmhyZWYpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UobmV3IFJlZ0V4cChgUkVNT1RFX1BBQ0tBR0VfQkFTRSA9IFsnXCJdJHtzZGtTdXBwb3J0RW52fVxcXFwuZGF0YVtcIiddYCwgJ2dtJyksIGBSRU1PVEVfUEFDS0FHRV9CQVNFID0gXCIke25ldyBVUkwoc2RrU3VwcG9ydEVudiArICcuZGF0YScsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZn1cImApO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ2Z1bmN0aW9uIGNyZWF0ZVdhc20nLCAnYXN5bmMgZnVuY3Rpb24gY3JlYXRlV2FzbScpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ2luc3RhbnRpYXRlQXN5bmMoKTsnLCAnYXdhaXQgaW5zdGFudGlhdGVBc3luYygpOycpO1xuXG4gICAgICAvLyB3YXNtIGFuZCBkYXRhKG1vZGVsKSBmaWxlIOuzkeugrOuhnCBmZXRjaCDtlZjquLAg7JyE7ZW0XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgndmFyIGFzbSA9IGNyZWF0ZVdhc20oKTsnLCAnY29uc29sZS5sb2coXCJjcmVhdGUgd2FzbSBhbmQgZGF0YSAtIHN0YXJ0XCIpXFxuJyArICdhd2FpdCAoYXN5bmMgZnVuY3Rpb24oKSB7XFxuJyArICcgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XFxuJyArICcgICAgdmFyIGlzQ3JlYXRlZFdhc20gPSBmYWxzZTtcXG4nICsgJyAgICB2YXIgaXNDcmVhdGVkRGF0YSA9IGZhbHNlO1xcbicgKyAnICAgIGNyZWF0ZVdhc20oKS50aGVuKCgpID0+IHtcXG4nICsgJyAgICAgIGlzQ3JlYXRlZFdhc20gPSB0cnVlO1xcbicgKyAnICAgICAgaWYgKGlzQ3JlYXRlZERhdGEpIHsgcmVzb2x2ZSgpOyB9XFxuJyArICcgICAgfSk7XFxuJyArICcgICAgY3JlYXRlTW9kZWxEYXRhKCkudGhlbigoKSA9PiB7XFxuJyArICcgICAgICBpc0NyZWF0ZWREYXRhID0gdHJ1ZTtcXG4nICsgJyAgICAgIGlmIChpc0NyZWF0ZWRXYXNtKSB7IHJlc29sdmUoKTsgfVxcbicgKyAnICAgIH0pXFxuJyArICcgIH0pO1xcbicgKyAnfSkoKTtcXG4nICsgJ2NvbnNvbGUubG9nKFwiY3JlYXRlIHdhc20gYW5kIGRhdGEgLSBlbmRcIiknKTtcbiAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfSk7XG4gICAgc3JjID0gYFxuICAgIChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICR7c3JjfVxuICAgICAgTW9kdWxlLmxlbmd0aEJ5dGVzVVRGOCA9IGxlbmd0aEJ5dGVzVVRGOFxuICAgICAgTW9kdWxlLnN0cmluZ1RvVVRGOCA9IHN0cmluZ1RvVVRGOFxuICAgICAgcmV0dXJuIE1vZHVsZVxuICAgIH0pKClcbiAgICAgICAgYDtcbiAgICB0aGlzLl9fT0NSRW5naW5lID0gYXdhaXQgZXZhbChzcmMpO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUub25SdW50aW1lSW5pdGlhbGl6ZWQgPSBhc3luYyBfID0+IHtcbiAgICAgIHZvaWQgMDtcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuX19PQ1JFbmdpbmUub25SdW50aW1lSW5pdGlhbGl6ZWQoKTtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gdHJ1ZTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgX19zdGFydFNjYW5XYXNtSW1wbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fX2RldGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTtcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAvLyB0aGlzLl9fc2V0UGlpRW5jcnlwdE1vZGUodGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpOyAvLyBvY3IgcmVzdWx0IGVuY3J5cHRcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICB0aGlzLl9fYWRkcmVzcyA9IDA7XG4gICAgICB0aGlzLl9fcGFnZUVuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICAgICAgdGhpcy5fX3NzYVJldHJ5Q291bnQgPSAwO1xuICAgICAgY29uc3Qgc2NhbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgb2NyUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIGlzRGV0ZWN0ZWRDYXJkID0gbnVsbCxcbiAgICAgICAgICAgIGltZ0RhdGEgPSBudWxsLFxuICAgICAgICAgICAgaW1nRGF0YVVybCA9IG51bGwsXG4gICAgICAgICAgICBtYXNrSW1hZ2UgPSBudWxsLFxuICAgICAgICAgICAgZmFjZUltYWdlID0gbnVsbCxcbiAgICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICBzc2FSZXN1bHRMaXN0ID0gW10sXG4gICAgICAgICAgICBtYXNrSW5mbyA9IG51bGw7XG5cbiAgICAgICAgICAvLyBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UoSU5fUFJPR1JFU1MuUkVBRFkpO1xuICAgICAgICAgIGlmICghdGhpcy5fX09DUkVuZ2luZVsnYXNtJ10pIHJldHVybjtcblxuICAgICAgICAgIC8vIFRPRE8gOiDshKTsoJXtlaDsiJgg7J6I6rKMIOuzgOqyvSAgZGVmYXVsdCDqsJLrj4Qg7KCc6rO1XG4gICAgICAgICAgY29uc3QgW3Jlc29sdXRpb25fdywgcmVzb2x1dGlvbl9oXSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgICAgICBpZiAocmVzb2x1dGlvbl93ID09PSAwIHx8IHJlc29sdXRpb25faCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgIGlmICh0aGlzLl9fZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkcmVzcyBiZWZvcmUgLS0tLS0tLS0tJywgYWRkcmVzcyk7XG4gICAgICAgICAgaWYgKHRoaXMuX19hZGRyZXNzID09PSAwICYmICF0aGlzLl9fcGFnZUVuZCAmJiAoYXdhaXQgdGhpcy5fX2lzVmlkZW9SZXNvbHV0aW9uQ29tcGF0aWJsZSh2aWRlbykpKSB7XG4gICAgICAgICAgICBbdGhpcy5fX2FkZHJlc3MsIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrXSA9IHRoaXMuX19nZXRTY2FubmVyQWRkcmVzcyh0aGlzLl9fb2NyVHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGhpcy5fX2FkZHJlc3MgfHwgdGhpcy5fX3BhZ2VFbmQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkcmVzcyBhZnRlciAtLS0tLS0tLS0nLCBhZGRyZXNzKTtcblxuICAgICAgICAgIGlmICh0aGlzLl9fb2NyU3RhdHVzIDwgdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTKSB7XG4gICAgICAgICAgICAvLyBPQ1Ig7JmE66OMIOydtOyghCDsg4Htg5xcblxuICAgICAgICAgICAgLy8gY2FyZCBub3QgZGV0ZWN0ZWRcbiAgICAgICAgICAgIFtpc0RldGVjdGVkQ2FyZCwgaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQodGhpcy5fX2FkZHJlc3MsIDApO1xuICAgICAgICAgICAgaWYgKCFpc0RldGVjdGVkQ2FyZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fX2luUHJvZ3Jlc3NTdGVwICE9PSB0aGlzLklOX1BST0dSRVNTLlJFQURZKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuQ0FSRF9ERVRFQ1RfRkFJTEVEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCwgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpOyAvLyDtlYTsmpTtlZzqsIA/XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhcmQgaXMgZGV0ZWN0ZWRcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLkNBUkRfREVURUNUX1NVQ0NFU1MpO1xuXG4gICAgICAgICAgICAvLyBzc2EgcmV0cnkg7ISk7KCV7J20IOuQmOyWtCDsnojsnLzqsbDrgpgsIOyImOuPmey0rOyYgVVJ66W8IOyCrOyaqe2VmOuKlCDqsr3smrAsIGNhcmQgZGV0ZWN0IOyEseqzteyLnCDsnbTrr7jsp4Ag7KCA7J6lXG4gICAgICAgICAgICB0aGlzLl9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlKGltZ0RhdGEsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUywgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgW29jclJlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2VdID0gYXdhaXQgdGhpcy5fX3N0YXJ0UmVjb2duaXRpb24odGhpcy5fX2FkZHJlc3MsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgdGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSwgaW1nRGF0YSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAvLyAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICAgICAgLy8gICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTsgICAgICAgIC8vIO2VhOyalO2VnOqwgD9cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fX29jclN0YXR1cyA+PSB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIC8vIG9jciDsmYTro4wg7J207ZuEIOyDge2DnFxuXG4gICAgICAgICAgICAvLyBmYWlsdXJlIGNhc2VcbiAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT0NSIFN0YXR1cyBpcyAke3RoaXMuX19vY3JTdGF0dXN9LCBidXQgb2NyUmVzdWx0IGlzIGZhbHNlYCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pOyAvLyBPQ1Ig7JmE66OMIOyLnOygkOyXkCBjYW1lcmEgcHJldmlldyBvZmZcblxuICAgICAgICAgICAgaWYgKHRoaXMuX19zc2FNb2RlKSB7XG4gICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgLy8g7LWc7LSIIOyLnOuPhFxuICAgICAgICAgICAgICBzc2FSZXN1bHQgPSBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2FkZHJlc3MpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdbRVJSXSBTU0EgTU9ERSBpcyB0cnVlLiBidXQsIHNzYVJlc3VsdCBpcyBudWxsJyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgICAgICAgIHNzYVJlc3VsdExpc3QucHVzaChzc2FSZXN1bHQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmV0cnlTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IEZBS0UgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdGQUtFJztcbiAgICAgICAgICAgICAgICBjb25zdCBSRUFMID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnUkVBTCc7XG4gICAgICAgICAgICAgICAgY29uc3QgRU5TRU1CTEUgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdFTlNFTUJMRSc7XG4gICAgICAgICAgICAgICAgbGV0IGlzQ29tcGxldGVkID0gZmFsc2U7IC8vIOu5hOuPmeq4sCBmb3Ig66y4IOuVjOusuOyXkCBicmVha+qwgCDslYjqsbjrpqzripQg7J207IqI66GcIOuEo+ydjFxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3NzYVJldHJ5Q291bnQgPT09IHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zc2FSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHNzYVJlc3VsdCA9IGF3YWl0IHRoaXMuX19zdGFydFRydXRoUmV0cnkodGhpcy5fX29jclR5cGUsIHRoaXMuX19hZGRyZXNzLCBpdGVtKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignW0VSUl0gU1NBIE1PREUgaXMgdHJ1ZS4gYnV0LCBzc2FSZXN1bHQgaXMgbnVsbCcpOyAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICAgICAgICAgICAgICBzc2FSZXN1bHRMaXN0LnB1c2goc3NhUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBpZiAoRkFLRSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0LmluZGV4T2YoJ1JFQUwnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKFJFQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdC5pbmRleE9mKCdGQUtFJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChFTlNFTUJMRSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHJ5V29ya2luZ1RpbWUgPSBuZXcgRGF0ZSgpIC0gcmV0cnlTdGFydERhdGU7XG4gICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrSW5mbykge1xuICAgICAgICAgICAgICBtYXNrSW5mbyA9IHRoaXMuX19nZXRNYXNrSW5mbyh0aGlzLl9fYWRkcmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0XG4gICAgICAgICAgICB9ID0gdXNlYk9DUldBU01QYXJzZXIucGFyc2VPY3JSZXN1bHQodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBvY3JSZXN1bHQsIHNzYVJlc3VsdCwgdGhpcy5fX3NzYVJldHJ5Q291bnQsIHNzYVJlc3VsdExpc3QsIHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSwgdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlQaXZvdFxuICAgICAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgICAgIC8vIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlXG4gICAgICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IG1hc2tJbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGZhY2VJbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm86IG1hc2tJbmZvLFxuICAgICAgICAgICAgICBzc2FfbW9kZTogdGhpcy5fX3NzYU1vZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICdDYXJkIGRldGVjdGlvbiBlcnJvcic7XG4gICAgICAgICAgaWYgKGUubWVzc2FnZSkge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZvaWQgMDtcblxuICAgICAgICAgIC8vIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ21lbW9yeScpKSB7XG4gICAgICAgICAgLy8gICBhd2FpdCB0aGlzLl9fcmVjb3ZlcnlTY2FuKCk7XG4gICAgICAgICAgLy8gICB0aGlzLl9fcmVjb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdXQTAwMScsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19yZWNvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX19yZWNvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9fZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2NhbiwgMSk7IC8vIOyerOq3gFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2V0VGltZW91dChzY2FuLCAxKTsgLy8gVUkg656c642U66eBIGJsb2NraW5nIOuwqeyngCAoc2V0VGltZW91dClcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIF9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2UsIGNvbnN0YW50TnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2UpIHtcbiAgICAgIGNvbnN0IHJlc2l6ZVJhdGlvID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgLyB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoO1xuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIG1heFdpZHRoOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgsXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoICogcmVzaXplUmF0aW8sXG4gICAgICAgIGNvbnZlcnRTaXplOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lLFxuICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSAvLyBjdXN0b20gb3B0aW9uXG4gICAgICB9O1xuXG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShpbWdEYXRhVXJsLCBkZWZhdWx0T3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuXG4gICAgICAvLyBtYXNraW5nIOydtOuvuOyngOuKlCByZXNpemUg7ZWY66m0LCBtYXNrIOyijO2RnOqwgCDslrTquIvrgpjrr4DroZwg66as7IKs7J207KaIIOyViO2VmOqzoCDslZXstpXrp4wg7KeE7ZaJXG4gICAgICBjb25zdCBtYXNraW5nSW1hZ2VPcHRpb25zID0ge1xuICAgICAgICBxdWFsaXR5OiBkZWZhdWx0T3B0aW9ucy5xdWFsaXR5LFxuICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogZGVmYXVsdE9wdGlvbnMudGFyZ2V0Q29tcHJlc3NWb2x1bWVcbiAgICAgIH07XG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9tYXNraW5nX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UobWFza0ltYWdlLCBtYXNraW5nSW1hZ2VPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9mYWNlX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UoZmFjZUltYWdlLCBkZWZhdWx0T3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgIH1cbiAgfVxuICBfX3JlcXVlc3RHZXRBUElUb2tlbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY3JlZGVudGlhbCA9IHRoaXMuX19vcHRpb25zLmF1dGhTZXJ2ZXJJbmZvLmNyZWRlbnRpYWw7XG4gICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uYmFzZVVybDtcbiAgICAgIGZldGNoKGAke2Jhc2VVcmx9L3NpZ24taW5gLCB7XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWwpLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgICAgICAvLyBtb2RlOiAnY29ycycsXG4gICAgICAgIC8vIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vdXNlYi90b2tlbmAsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiBgQmVhcmVyICR7cmVzdWx0LnRva2VufWBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIHJlc29sdmUoanNvbi50b2tlbik7XG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfX3JlcXVlc3RTZXJ2ZXJPQ1Iob2NyVHlwZSwgc3NhTW9kZSwgaW1nRGF0YVVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgYmFzZVVybCA9IHRoaXMuX19vcHRpb25zLm9jclNlcnZlckJhc2VVcmw7XG4gICAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvaWRjYXJkLWRyaXZlcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL3Bhc3Nwb3J0JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9hbGllbi1iYWNrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9hbGllbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDcmVkaXQgY2FyZCBpcyBub3QgVW5zdXBwb3J0ZWQgU2VydmVyIE9DUicpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIE9DUiB0eXBlOiAke29jclR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXBpVG9rZW4gPSBhd2FpdCB0aGlzLl9fcmVxdWVzdEdldEFQSVRva2VuKCk7XG4gICAgICAgIGNvbnN0IG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIG15SGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7YXBpVG9rZW59YCk7XG4gICAgICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgICAgIGltYWdlX2Jhc2U2NDogaW1nRGF0YVVybCxcbiAgICAgICAgICBtYXNrX21vZGU6ICd0cnVlJyxcbiAgICAgICAgICBmYWNlX21vZGU6ICd0cnVlJ1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fX3NzYU1vZGUpIHtcbiAgICAgICAgICBwYXJhbS5zc2FfbW9kZSA9ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYXcgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcbiAgICAgICAgICBib2R5OiByYXcsXG4gICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnXG4gICAgICAgIH07XG4gICAgICAgIGZldGNoKGJhc2VVcmwsIHJlcXVlc3RPcHRpb25zKS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX3N0YXJ0U2NhblNlcnZlckltcGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0TGlzdCA9IFtdO1xuICAgICAgICBjb25zdCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIOy6lOuyhOyKpOyXkOyEnCDsnbTrr7jsp4Drpbwg6rCA7KC47Ji0XG4gICAgICAgICAgY29uc3QgWywgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICAgICAgaWYgKDEgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNlcnZlciBvY3Ig7Iuk7YyoICjrsJzsg50g6rCA64ql7ISxIOyXhuydjClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDshLHqs7VcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9jclJlc3VsdCA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0U2VydmVyT0NSKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgICAgLy8gZmFpbHVyZSBjYXNlXG4gICAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgT0NSIGlzIGZhaWxlZGApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzc2Eg7Iuc64+EP1xuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBiYXNlNjRJbWFnZVJlc3VsdCxcbiAgICAgICAgICAgICAgbWFza0luZm9cbiAgICAgICAgICAgIH0gPSB1c2ViT0NSQVBJUGFyc2VyLnBhcnNlT2NyUmVzdWx0KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgb2NyUmVzdWx0KTtcbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2FwaV9yZXNwb25zZSA9IG9jclJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBiYXNlNjRJbWFnZVJlc3VsdD8ub2NyX21hc2tpbmdfaW1hZ2UsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSwgMC4wKTtcbiAgICAgICAgICAgIHRoaXMuZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VMZWdhY3lGb3JtYXQpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfZGF0YSA9IGxlZ2FjeUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvY3JSZXN1bHQuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHRDb2RlID0gJ1NGMDAxJztcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0TWVzc2FnZSA9IGAke29jclJlc3VsdC5zY2FubmVyX3R5cGV9OiR7b2NyUmVzdWx0Py5yZXN1bHRfY29kZX1gO1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHREZXRhaWwgPSBKU09OLnN0cmluZ2lmeShvY3JSZXN1bHQpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcyhyZXN1bHRDb2RlLCByZXN1bHREZXRhaWwsIHJlc3VsdE1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuXG4gICAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja0NhcHR1cmVCdXR0b24pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ1NlcnZlciBPQ1IgRXJyb3InO1xuICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnU0UwMDEnLCBlLCBlcnJvck1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVSTCkge1xuICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICBpZiAodGhpcy5fX3NzYU1vZGUgJiYgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDAgfHwgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJICYmIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgbGV0IGxpbWl0U2F2ZUltYWdlQ291bnQgPSBNYXRoLm1heCh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50LCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCk7XG4gICAgICBpZiAodGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLmxlbmd0aCA9PT0gbGltaXRTYXZlSW1hZ2VDb3VudCkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLnB1c2goaW1nRGF0YSk7XG4gICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQucHVzaChpbWdEYXRhVVJMKTtcbiAgICAgICAgdm9pZCAwOyAvLyBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgfVxuXG4gICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX19vblN1Y2Nlc3NQcm9jZXNzKHJldmlld19yZXN1bHQpIHtcbiAgICAvLyDsnbjsi50g7ISx6rO1IOyKpOy6lCDro6jtlIQg7KKF66OMXG4gICAgaWYgKHJldmlld19yZXN1bHQuc3NhX21vZGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1MpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBhcGlfcmVzcG9uc2U6IHtcbiAgICAgICAgcmVzdWx0X2NvZGU6ICdOMTAwJyxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6ICdPSy4nXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnc3VjY2VzcycsXG4gICAgICByZXZpZXdfcmVzdWx0OiByZXZpZXdfcmVzdWx0XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uU3VjY2Vzcykge1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIGUsIGVycm9yTWVzc2FnZSkge1xuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQpO1xuICAgIGxldCBlcnJvckRldGFpbCA9ICcnO1xuICAgIGlmIChlPy50b1N0cmluZygpKSBlcnJvckRldGFpbCArPSBlLnRvU3RyaW5nKCk7XG4gICAgaWYgKGU/LnN0YWNrKSBlcnJvckRldGFpbCArPSBlLnN0YWNrO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogcmVzdWx0Q29kZSxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgfSxcbiAgICAgIHJlc3VsdDogJ2ZhaWxlZCcsXG4gICAgICByZXZpZXdfcmVzdWx0OiB7XG4gICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgZXJyb3JfZGV0YWlsOiBlcnJvckRldGFpbFxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHRoaXMuX19vbkZhaWx1cmUpIHtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUocmVzdWx0KTtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcHJlbG9hZGluZ1dhc20oKSB7XG4gICAgY29uc3QgcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpO1xuICAgIGlmICghdGhpcy5pc1ByZWxvYWRlZCgpICYmIHByZWxvYWRpbmdTdGF0dXMgPT09IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGF3YWl0IHRoaXMucHJlbG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgYXdhaXQgdGhpcy5fX3dhaXRQcmVsb2FkZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgYWJub3JtYWxseSBwcmVsb2FkaW5nIHN0YXR1cywgcHJlbG9hZGVkOiAke3RoaXMuaXNQcmVsb2FkZWQoKX0gLyBwcmVsb2FkaW5nU3RhdHVzOiAke3RoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gIC8vIF9fc2V0UGlpRW5jcnlwdE1vZGUocGlpRW5jcnlwdE1vZGUpIHtcbiAgLy8gICB0aGlzLl9fT0NSRW5naW5lLnNldFBpaUVuY3J5cHQocGlpRW5jcnlwdE1vZGUpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZW5jcnlwdERldGVjdGVkQmFzZTY0KGFkZHJlc3MsIG1hc2ssIG9jcl9tb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkUGhvdG9CYXNlNjQoYWRkcmVzcyk7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRCYXNlNjRqcGdEZXRlY3RlZEZyYW1lQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBvY3JfbW9kZVxuICAvLyAgICk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19nZXRFbmNyeXB0ZWRTaXplKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ1NpemUoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZEJ1ZmZlcigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNyeXB0ZWRKcGdCdWZmZXIoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChhZGRyZXNzLCBtYXNrLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgY29uc3QgZW5jcnlwdERldGVjdGVkQmFzZTY0ID0gdGhpcy5fX2VuY3J5cHREZXRlY3RlZEJhc2U2NChcbiAgLy8gICAgIGFkZHJlc3MsXG4gIC8vICAgICBtYXNrLFxuICAvLyAgICAgaW1nTW9kZSxcbiAgLy8gICAgIGltZ1R5cGVcbiAgLy8gICApO1xuICAvLyAgIGlmIChlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPT09IDEpIHtcbiAgLy8gICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fZ2V0RW5jcnlwdGVkU2l6ZSgpO1xuICAvLyAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19nZXRFbmNyeXB0ZWRCdWZmZXIoKTtcbiAgLy9cbiAgLy8gICAgIGNvbnN0IGVuY3J5cHRlZCA9IG5ldyBVaW50OEFycmF5KFxuICAvLyAgICAgICB0aGlzLl9fT0NSRW5naW5lLkhFQVA4LmJ1ZmZlcixcbiAgLy8gICAgICAganBnUG9pbnRlcixcbiAgLy8gICAgICAganBnU2l6ZVxuICAvLyAgICAgKTtcbiAgLy8gICAgIGNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuICAvLyAgICAgY29uc3QgZGVjb2RlZFN0cmluZyA9IHRleHREZWNvZGVyLmRlY29kZShlbmNyeXB0ZWQpO1xuICAvL1xuICAvLyAgICAgcmV0dXJuIGRlY29kZWRTdHJpbmc7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiAnJztcbiAgLy8gfVxuICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICBhc3luYyBfX3N0YXJ0U2Nhbldhc20oKSB7XG4gICAgdGhpcy5fX2RlYnVnKCd3YXNtX21vZGUnKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbUltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19zdGFydFNjYW5TZXJ2ZXIoKSB7XG4gICAgdGhpcy5fX2RlYnVnKCdzZXJ2ZXJfbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSA9IHRydWU7XG4gICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2NhblNlcnZlckltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19yZWNvdmVyeVNjYW4oKSB7XG4gICAgdm9pZCAwO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3BTY2FuKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2Nhbldhc20oKTtcbiAgfVxuICBzdG9wU2NhbigpIHtcbiAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlOyAvLyBzd2l0Y2ggdG8gc2VydmVy7J2865WMIOq4sOyhtCBXQVNNIGxvb3Ag6rCV7KCc7KKF66OMXG4gICAgY29uc3Qge1xuICAgICAgY2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhbnZhcykge1xuICAgICAgY29uc3QgY2FudmFzQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuICB9XG4gIHN0b3BTdHJlYW0oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkKTtcbiAgICBpZiAodGhpcy5fX3N0cmVhbSkge1xuICAgICAgdGhpcy5fX3N0cmVhbS5zdG9wICYmIHRoaXMuX19zdHJlYW0uc3RvcCgpO1xuICAgICAgbGV0IHRyYWNrcyA9IHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzICYmIHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAodHJhY2tzICYmIHRyYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgdHJhY2tzLmZvckVhY2godHJhY2sgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zdHJlYW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDrqZTrqqjrpqwgYWxsb2NhdGlvbiBmcmVlIO2VqOyImCAqL1xuICBjbGVhbnVwKCkge1xuICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKTtcbiAgICB0aGlzLl9fZGVzdHJveUJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95UHJldkltYWdlKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCk7XG4gIH1cbiAgcmVzdG9yZUluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIH1cbiAgX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgaWYgKHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpO1xuICAgICAgdGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVXNlQk9DUjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBT0EsUUFBUSxNQUFNLHVCQUF1QjtBQUM1QyxPQUFPQyxpQkFBaUIsTUFBTSxtQ0FBbUM7QUFDakUsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBQy9ELFNBQVNDLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBUSxrQ0FBa0M7QUFDeEYsT0FBT0MsU0FBUyxNQUFNLHlCQUF5QjtBQUMvQyxJQUFJQyxRQUFRO0FBQ1osTUFBTUMsT0FBTyxDQUFDO0VBb0NaOztFQUVBOztFQXVFaUM7RUFDTDs7RUFNRTtFQUNGO0VBQ0M7O0VBSzdCOztFQThLQTtFQUNBQyxXQUFXQSxDQUFBLEVBQUc7SUFBQUMsZUFBQSxzQkF6U0E7TUFDWkMsSUFBSSxFQUFFLE1BQU07TUFDWkMsU0FBUyxFQUFFLFdBQVc7TUFDdEJDLEtBQUssRUFBRSxPQUFPO01BQ2RDLG1CQUFtQixFQUFFLGdCQUFnQjtNQUNyQ0Msa0JBQWtCLEVBQUUsZUFBZTtNQUNuQ0Msc0JBQXNCLEVBQUUsd0JBQXdCO01BQ2hEQyxxQkFBcUIsRUFBRSx1QkFBdUI7TUFDOUNDLGNBQWMsRUFBRSxZQUFZO01BQzVCQyx1QkFBdUIsRUFBRSxxQkFBcUI7TUFDOUNDLFdBQVcsRUFBRSxhQUFhO01BQzFCQyxvQkFBb0IsRUFBRSxzQkFBc0I7TUFDNUNDLFVBQVUsRUFBRTtJQUNkLENBQUM7SUFBQVosZUFBQSxxQkFDWTtNQUNYRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO01BQ2JDLEtBQUssRUFBRSxDQUFDO01BQ1JPLFdBQVcsRUFBRSxDQUFDO01BQ2RHLElBQUksRUFBRTtJQUNSLENBQUM7SUFBQWIsZUFBQSw0QkFDbUI7TUFDbEJjLFdBQVcsRUFBRSxDQUFDLENBQUM7TUFDZkMsT0FBTyxFQUFFLENBQUM7TUFDVkYsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUFBYixlQUFBLHVCQUNjO01BQ2JnQixPQUFPLEVBQUUsQ0FBQztNQUNWQyxRQUFRLEVBQUUsQ0FBQztNQUNYaEIsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUFBRCxlQUFBLDRCQUNtQjtNQUNsQmtCLEtBQUssRUFBRSxDQUFDO01BQ1JDLElBQUksRUFBRTtJQUNSLENBQUM7SUFBQW5CLGVBQUEsc0JBS2EsS0FBSztJQUFBQSxlQUFBLHNCQUNMLElBQUk7SUFBQUEsZUFBQSwwQkFDQSxLQUFLO0lBQUFBLGVBQUEsMEJBQ0wsS0FBSztJQUFBQSxlQUFBLHdCQUNQLEtBQUs7SUFBQUEsZUFBQSxzQkFDUCxLQUFLO0lBQUFBLGVBQUEsNkJBQ0UsSUFBSSxDQUFDb0IsaUJBQWlCLENBQUNOLFdBQVc7SUFBQWQsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUEsb0JBRzNDLEtBQUs7SUFBQUEsZUFBQSxzQkFDSCxJQUFJLENBQUNxQixVQUFVLENBQUNuQixTQUFTO0lBQUFGLGVBQUEsbUNBQ1osRUFBRTtJQUFBQSxlQUFBLGdDQUNMLENBQUM7SUFBQUEsZUFBQSwwQkFDUCxDQUFDO0lBQUFBLGVBQUEsOEJBQ0csRUFBRTtJQUFBQSxlQUFBLG9DQUNJLEVBQUU7SUFBQUEsZUFBQSxzQkFDaEIsSUFBSTtJQUFBQSxlQUFBLHNCQUNKLElBQUk7SUFBQUEsZUFBQSwrQkFDSyxJQUFJO0lBQUFBLGVBQUEsd0JBQ1gsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLENBQUM7SUFBQUEsZUFBQSxrQ0FDNUosSUFBSXNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFBdEIsZUFBQSxrQ0FDL0osSUFBSXNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUFBdEIsZUFBQSxvQkFDN0ssS0FBSztJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLG9CQXNCTCxDQUFDO0lBQUFBLGVBQUEscUJBQ0EsS0FBSztJQUFBQSxlQUFBLHNCQUNKLEtBQUs7SUFBQUEsZUFBQSxtQkFDUixJQUFJO0lBQUFBLGVBQUEseUJBQ0UsSUFBSTtJQUFBQSxlQUFBLDhCQUNDLElBQUk7SUFBQUEsZUFBQSxzQkFDWixJQUFJO0lBQUFBLGVBQUEsNkJBQ0csSUFBSTtJQUFBQSxlQUFBLDJCQUNOLEtBQUs7SUFBQUEsZUFBQSw0QkFDSixDQUFDO0lBQUFBLGVBQUEsNkJBQ0EsQ0FBQztJQUFBQSxlQUFBLHVCQUNQLENBQUM7SUFBQUEsZUFBQSx3QkFDQSxDQUFDO0lBQUFBLGVBQUEsNEJBQ0csS0FBSztJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQSxxQ0FHSSxDQUFDO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLG1DQUdILElBQUk7SUFBQUEsZUFBQSxpQ0FDTixhQUFhO0lBQUFBLGVBQUEsMEJBQ3BCLEVBQUU7SUFBQUEsZUFBQSw4QkFDRSxFQUFFO0lBQUFBLGVBQUEsNkJBQ0gsRUFBRTtJQUFBQSxlQUFBLGtDQUNHLElBQUk7SUFBQUEsZUFBQSxrQ0FDSixHQUFHO0lBQUFBLGVBQUEsb0NBQ0QsR0FBRztJQUFBQSxlQUFBLGlDQUNOLENBQUM7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLDZCQUVMLEtBQUs7SUFBQUEsZUFBQSwyQkFDUCxJQUFJLENBQUN1QixXQUFXLENBQUNyQixTQUFTO0lBQUFGLGVBQUEsbUNBQ2xCLElBQUksQ0FBQ3VCLFdBQVcsQ0FBQ3RCLElBQUk7SUFBQUQsZUFBQSxxQ0FDbkIsS0FBSztJQUFBQSxlQUFBLGlDQUNULEdBQUc7SUFBQUEsZUFBQSwrQkFDTCxHQUFHO0lBQUFBLGVBQUEsZ0NBQ0YsR0FBRztJQUFBQSxlQUFBLCtCQUNKLENBQUM7SUFBQUEsZUFBQSxnQ0FDQSxDQUFDO0lBQUFBLGVBQUEsaUNBQ0EsS0FBSztJQUFBQSxlQUFBLG9CQUdsQixJQUFJd0IsTUFBTSxDQUFDO01BQ3JCO01BQ0FDLGFBQWEsRUFBRSxLQUFLO01BQ3BCO01BQ0FDLGlCQUFpQixFQUFFLEtBQUs7TUFDeEI7O01BRUE7TUFDQTtNQUNBQyxjQUFjLEVBQUUsS0FBSztNQUNyQjtNQUNBQyxpQkFBaUIsRUFBRSxLQUFLO01BQ3hCO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsV0FBVyxFQUFFLElBQUk7TUFDakI7TUFDQUMsWUFBWSxFQUFFLElBQUk7TUFDbEI7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsZ0JBQWdCLEVBQUUsS0FBSztNQUN2QjtNQUNBQyx3QkFBd0IsRUFBRSxJQUFJO01BQzlCO01BQ0FDLHlCQUF5QixFQUFFLElBQUksR0FBRyxFQUFFO01BQ3BDOztNQUVBO01BQ0FDLFFBQVEsRUFBRSxJQUFJO01BQ2Q7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsV0FBVyxFQUFFLElBQUk7TUFDakI7TUFDQUMsa0JBQWtCLEVBQUUsSUFBSTtNQUN4QjtNQUNBQyxXQUFXLEVBQUUsSUFBSTtNQUNqQjtNQUNBQyxrQkFBa0IsRUFBRSxLQUFLO01BQ3pCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLG1CQUFtQixFQUFFLHNDQUFzQztNQUMzRDtNQUNBQyxnQkFBZ0IsRUFBRTtRQUNoQkMsS0FBSyxFQUFFLENBQUM7UUFDUjtRQUNBQyxNQUFNLEVBQUUsRUFBRTtRQUNWO1FBQ0FDLEtBQUssRUFBRSxPQUFPO1FBQ2Q7O1FBRUE7UUFDQUMsU0FBUyxFQUFFLFNBQVM7UUFDcEI7UUFDQUMsS0FBSyxFQUFFLFNBQVM7UUFDaEI7UUFDQUMsY0FBYyxFQUFFLFNBQVM7UUFDekI7UUFDQUMsYUFBYSxFQUFFLFNBQVM7UUFDeEI7UUFDQUMsc0JBQXNCLEVBQUUsU0FBUztRQUNqQztRQUNBQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDO1FBQ0FDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCO1FBQ0FDLG1CQUFtQixFQUFFLFNBQVM7UUFDOUI7UUFDQUMsV0FBVyxFQUFFLFNBQVM7UUFDdEI7UUFDQUMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQjtRQUNBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO01BQ3hCLENBQUM7O01BRUQ7TUFDQUMsdUJBQXVCLEVBQUUsSUFBSTtNQUM3QjtNQUNBQyxjQUFjLEVBQUU7UUFDZEMsVUFBVSxFQUFFLFNBQVM7UUFDckI7UUFDQUMsVUFBVSxFQUFFLFNBQVM7UUFDckI7O1FBRUE7UUFDQWQsU0FBUyxFQUFFLFNBQVM7UUFDcEI7UUFDQUMsS0FBSyxFQUFFLFNBQVM7UUFDaEI7UUFDQUMsY0FBYyxFQUFFLFNBQVM7UUFDekI7UUFDQUMsYUFBYSxFQUFFLFNBQVM7UUFDeEI7UUFDQUMsc0JBQXNCLEVBQUUsU0FBUztRQUNqQztRQUNBQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDO1FBQ0FDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCO1FBQ0FDLG1CQUFtQixFQUFFLFNBQVM7UUFDOUI7UUFDQUMsV0FBVyxFQUFFLFNBQVM7UUFDdEI7UUFDQUMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQjtRQUNBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO01BQ3hCLENBQUM7O01BRUQ7TUFDQUsseUJBQXlCLEVBQUUsS0FBSztNQUNoQztNQUNBQywyQkFBMkIsRUFBRSxLQUFLO01BQ2xDO01BQ0FDLHVCQUF1QixFQUFFLElBQUk7TUFDN0I7TUFDQUMsa0JBQWtCLEVBQUUsS0FBSztNQUN6Qjs7TUFFQTtNQUNBQyxrQkFBa0IsRUFBRTtRQUNsQkMsWUFBWSxFQUFFLFNBQVM7UUFDdkI7UUFDQU4sVUFBVSxFQUFFLFNBQVMsQ0FBQztNQUN4QixDQUFDOztNQUVETyxlQUFlLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNO01BQ3ZDO01BQ0FDLFdBQVcsRUFBRSxFQUFFO01BQ2ZDLGFBQWEsRUFBRSxFQUFFO01BQ2pCO01BQ0FDLGNBQWMsRUFBRSxDQUFDO01BQ2pCO01BQ0FDLFVBQVUsRUFBRSxLQUFLO01BQ2pCO01BQ0FDLGtDQUFrQyxFQUFFLElBQUk7TUFDeEM7TUFDQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDO01BQ25DOztNQUVBO01BQ0E7TUFDQUMsd0JBQXdCLEVBQUUsYUFBYTtNQUN2Qzs7TUFFQTtNQUNBQyxvQkFBb0IsRUFBRSxrQkFBa0I7TUFDeEM7TUFDQTs7TUFFQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQUMsWUFBWSxFQUFFLFVBQVU7TUFDeEJDLGFBQWEsRUFBRSxHQUFHO01BQ2xCO01BQ0FDLGdCQUFnQixFQUFFLENBQUM7TUFDbkI7O01BRUE7TUFDQUMsYUFBYSxFQUFFO0lBQ2pCLENBQUMsQ0FBQztJQUlBLElBQUl4RixRQUFRLEVBQUUsT0FBT0EsUUFBUTtJQUM3QkEsUUFBUSxHQUFHLElBQUk7SUFDZixPQUFPQSxRQUFRO0VBQ2pCOztFQUVBO0VBQ015RixVQUFVQSxDQUFDQyxXQUFXLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQUEsT0FBQUMsaUJBQUE7TUFDNUIsSUFBSUQsS0FBSSxDQUFDRSxXQUFXLEVBQUUsRUFBRTtRQUN0QixLQUFLLENBQUM7UUFDTixJQUFJSCxXQUFXLEVBQUVBLFdBQVcsRUFBRTtNQUNoQyxDQUFDLE1BQU07UUFDTCxLQUFLLENBQUM7UUFDTkMsS0FBSSxDQUFDRyxnQkFBZ0IsRUFBRTtRQUN2QkgsS0FBSSxDQUFDSSxrQkFBa0IsR0FBR0osS0FBSSxDQUFDcEUsaUJBQWlCLENBQUNMLE9BQU87UUFDeEQsTUFBTXlFLEtBQUksQ0FBQ0ssZUFBZSxFQUFFO1FBQzVCTCxLQUFJLENBQUNJLGtCQUFrQixHQUFHSixLQUFJLENBQUNwRSxpQkFBaUIsQ0FBQ1AsSUFBSTtRQUNyRDJFLEtBQUksQ0FBQ00sV0FBVyxHQUFHLElBQUk7UUFDdkIsSUFBSVAsV0FBVyxFQUFFQSxXQUFXLEVBQUU7UUFDOUJDLEtBQUksQ0FBQ08sZ0JBQWdCLEVBQUU7UUFDdkIsS0FBSyxDQUFDO01BQ1I7SUFBQztFQUNIO0VBQ0FDLGFBQWFBLENBQUEsRUFBRztJQUNkLE9BQU8sSUFBSSxDQUFDQyxhQUFhO0VBQzNCO0VBQ0FQLFdBQVdBLENBQUEsRUFBRztJQUNaLE9BQU8sSUFBSSxDQUFDSSxXQUFXO0VBQ3pCO0VBQ0FJLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU8sSUFBSSxDQUFDTixrQkFBa0I7RUFDaEM7RUFDQU8sYUFBYUEsQ0FBQSxFQUFHO0lBQ2QsT0FBTyxJQUFJLENBQUNDLFNBQVMsQ0FBQ3pFLGNBQWMsSUFBSSxJQUFJLENBQUN5RSxTQUFTLENBQUN4RSxpQkFBaUI7RUFDMUU7RUFDQXlFLFlBQVlBLENBQUEsRUFBRztJQUNiLE9BQU8sSUFBSSxDQUFDQyxTQUFTLEtBQUssUUFBUTtFQUNwQztFQUNBWCxnQkFBZ0JBLENBQUEsRUFBRztJQUNqQixJQUFNO01BQ0pZO0lBQ0YsQ0FBQyxHQUFHbEgsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCLElBQUlELGdCQUFnQixFQUFFO01BQ3BCQSxnQkFBZ0IsQ0FBQ3ZELEtBQUssQ0FBQ3lELE9BQU8sR0FBRyxNQUFNO0lBQ3pDO0VBQ0Y7RUFDQVYsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsSUFBTTtNQUNKUTtJQUNGLENBQUMsR0FBR2xILFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtJQUM3QixJQUFJRCxnQkFBZ0IsRUFBRTtNQUNwQkEsZ0JBQWdCLENBQUN2RCxLQUFLLENBQUN5RCxPQUFPLEdBQUcsTUFBTTtJQUN6QztFQUNGO0VBQ0FDLGFBQWFBLENBQUNDLGFBQWEsRUFBRTtJQUMzQixJQUFJLElBQUksQ0FBQ04sWUFBWSxFQUFFLEVBQUU7TUFDdkI7SUFDRjtJQUNBLElBQUksSUFBSSxDQUFDRixhQUFhLEVBQUUsSUFBSSxJQUFJLENBQUNTLGVBQWUsRUFBRTtNQUNoRCxJQUFJLElBQUksQ0FBQ1IsU0FBUyxDQUFDekUsY0FBYyxFQUFFO1FBQ2pDLElBQU1rRixXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztRQUM1Rjs7UUFFQSxJQUFNQyxTQUFTLEdBQUc7VUFDaEJDLFVBQVUsRUFBRUMsQ0FBQyxDQUFDQyxPQUFPLENBQUNELENBQUMsQ0FBQ0UsSUFBSSxDQUFDUCxhQUFhLENBQUNJLFVBQVUsRUFBRUYsV0FBVyxDQUFDLENBQUMsQ0FBQ00sTUFBTSxDQUFDLENBQUNDLEdBQUcsRUFBQUMsSUFBQSxLQUFtQjtZQUFBLElBQWpCLENBQUNDLEdBQUcsRUFBRUMsS0FBSyxDQUFDLEdBQUFGLElBQUE7WUFDNUZELEdBQUcsQ0FBQ0UsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDRSxtQkFBbUIsQ0FBQ0QsS0FBSyxDQUFDO1lBQzFDLE9BQU9ILEdBQUc7VUFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDTkssZ0JBQWdCLEVBQUUsSUFBSSxDQUFDRCxtQkFBbUIsQ0FBQ2IsYUFBYSxDQUFDYyxnQkFBZ0I7UUFDM0UsQ0FBQztRQUNEZCxhQUFhLENBQUNJLFVBQVUsR0FBQVcsYUFBQSxDQUFBQSxhQUFBLEtBQ25CZixhQUFhLENBQUNJLFVBQVUsR0FDeEJELFNBQVMsQ0FBQ0MsVUFBVSxDQUN4QjtRQUNESixhQUFhLENBQUNjLGdCQUFnQixHQUFHWCxTQUFTLENBQUNXLGdCQUFnQjtNQUM3RCxDQUFDLE1BQU07UUFDTCxJQUFNRSxXQUFXLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLENBQUM7UUFDbEw7UUFDQWhCLGFBQWEsQ0FBQ0csU0FBUyxHQUFHO1VBQ3hCQyxVQUFVLEVBQUVDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDRCxDQUFDLENBQUNZLElBQUksQ0FBQ2pCLGFBQWEsQ0FBQ0ksVUFBVSxFQUFFWSxXQUFXLENBQUMsQ0FBQyxDQUFDUixNQUFNLENBQUMsQ0FBQ0MsR0FBRyxFQUFBUyxLQUFBLEtBQW1CO1lBQUEsSUFBakIsQ0FBQ1AsR0FBRyxFQUFFQyxLQUFLLENBQUMsR0FBQU0sS0FBQTtZQUM1RlQsR0FBRyxDQUFDRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUNFLG1CQUFtQixDQUFDRCxLQUFLLENBQUM7WUFDMUMsT0FBT0gsR0FBRztVQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUNOSyxnQkFBZ0IsRUFBRSxJQUFJLENBQUNELG1CQUFtQixDQUFDYixhQUFhLENBQUNjLGdCQUFnQixDQUFDO1VBQzFFSyxpQkFBaUIsRUFBRSxJQUFJLENBQUNOLG1CQUFtQixDQUFDYixhQUFhLENBQUNtQixpQkFBaUIsQ0FBQztVQUM1RUMsY0FBYyxFQUFFLElBQUksQ0FBQ1AsbUJBQW1CLENBQUNiLGFBQWEsQ0FBQ29CLGNBQWM7UUFDdkUsQ0FBQztNQUNIO0lBQ0Y7RUFDRjtFQUNBQyxZQUFZQSxDQUFBLEVBQUc7SUFDYixPQUFPLElBQUksQ0FBQ0MsV0FBVztFQUN6QjtFQUNBQyxJQUFJQSxDQUFDQyxRQUFRLEVBQUU7SUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDQSxRQUFRLENBQUNDLFVBQVUsRUFBRSxNQUFNLElBQUlDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUNuRSxJQUFJLENBQUNDLFNBQVMsR0FBR0gsUUFBUSxDQUFDQyxVQUFVO0lBQ3BDLElBQU1HLGFBQWEsR0FBR3ZCLENBQUMsQ0FBQ3dCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNwQyxTQUFTLEVBQUUrQixRQUFRLENBQUM7SUFDM0QsSUFBSSxDQUFDTSxTQUFTLENBQUNGLGFBQWEsQ0FBQztJQUM3QixLQUFLLENBQUM7SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDdkMsYUFBYSxFQUFFLEVBQUU7TUFDekIsSUFBSSxDQUFDMEMsaUJBQWlCLEVBQUU7TUFDeEIsSUFBSSxDQUFDQyxZQUFZLEdBQUd0SixRQUFRLENBQUN1SixZQUFZLEVBQUU7TUFDM0MsS0FBSyxDQUFDO01BQ04sSUFBSSxDQUFDaEMsZUFBZSxHQUFHcEgsYUFBYSxFQUFFO01BQ3RDLElBQUksQ0FBQyxJQUFJLENBQUNvSCxlQUFlLEVBQUU7UUFDekIsTUFBTSxJQUFJeUIsS0FBSyxDQUFDLGdEQUFnRCxDQUFDO01BQ25FO01BQ0EsSUFBSSxDQUFDcEMsYUFBYSxHQUFHLElBQUk7SUFDM0I7RUFDRjtFQUNBd0MsU0FBU0EsQ0FBQ04sUUFBUSxFQUFFO0lBQ2xCLElBQUksQ0FBQy9CLFNBQVMsR0FBRytCLFFBQVE7RUFDM0I7RUFDQVUsU0FBU0EsQ0FBQSxFQUFHO0lBQ1YsT0FBTyxJQUFJLENBQUN6QyxTQUFTO0VBQ3ZCO0VBQ0EwQyxVQUFVQSxDQUFDQyxJQUFJLEVBQUU7SUFDZixPQUFPLElBQUksQ0FBQ0MsdUJBQXVCLENBQUNDLEdBQUcsQ0FBQ0YsSUFBSSxDQUFDO0VBQy9DO0VBQ0FHLGdCQUFnQkEsQ0FBQ0MsTUFBTSxFQUFFO0lBQ3ZCLE9BQU8sSUFBSSxDQUFDQyx1QkFBdUIsQ0FBQ0gsR0FBRyxDQUFDRSxNQUFNLENBQUM7RUFDakQ7RUFDQUUsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsT0FBTyxJQUFJLENBQUNDLGVBQWU7RUFDN0I7RUFDQUMsbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsT0FBTyxJQUFJLENBQUNDLGtCQUFrQjtFQUNoQztFQUNNQyx1QkFBdUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE1BQUE7SUFBQSxPQUFBakUsaUJBQUE7TUFDOUIsSUFBSWlFLE1BQUksQ0FBQ3RELFNBQVMsQ0FBQ25DLDJCQUEyQixFQUFFO1FBQzlDO1FBQ0EsT0FBT3lGLE1BQUksQ0FBQ0Msc0JBQXNCO01BQ3BDLENBQUMsTUFBTTtRQUNMO1FBQ0EsSUFBSUQsTUFBSSxDQUFDdEQsU0FBUyxDQUFDcEMseUJBQXlCLEVBQUU7VUFDNUM7VUFDQTtVQUNBLElBQU0sQ0FBQzRGLGVBQWUsRUFBRUMsYUFBYSxDQUFDLFNBQVNwSyxPQUFPLEVBQUU7VUFDeERpSyxNQUFJLENBQUNJLE9BQU8sQ0FBQ0QsYUFBYSxDQUFDO1VBQzNCLE9BQU9ELGVBQWUsR0FBR0YsTUFBSSxDQUFDdEQsU0FBUyxDQUFDbEMsdUJBQXVCO1FBQ2pFLENBQUMsTUFBTTtVQUNMO1VBQ0EsT0FBTyxLQUFLO1FBQ2Q7TUFDRjtJQUFDO0VBQ0g7RUFDTTZGLFFBQVFBLENBQUNoQixJQUFJLEVBQUVpQixTQUFTLEVBQUVDLFNBQVMsRUFBNkI7SUFBQSxJQUFBQyxVQUFBLEdBQUFDLFNBQUE7TUFBQUMsTUFBQTtJQUFBLE9BQUEzRSxpQkFBQTtNQUFBLElBQTNCNEUsa0JBQWtCLEdBQUFILFVBQUEsQ0FBQUksTUFBQSxRQUFBSixVQUFBLFFBQUFLLFNBQUEsR0FBQUwsVUFBQSxNQUFHLElBQUk7TUFDbEUsSUFBSSxDQUFDLENBQUMsQ0FBQ25CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQ2lCLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsU0FBUyxFQUFFO1FBQzNDLEtBQUssQ0FBQztRQUNOO01BQ0Y7TUFDQUcsTUFBSSxDQUFDVCxzQkFBc0IsU0FBU1MsTUFBSSxDQUFDWCx1QkFBdUIsRUFBRTtNQUNsRVcsTUFBSSxDQUFDOUQsU0FBUyxHQUFHeUMsSUFBSTtNQUNyQnFCLE1BQUksQ0FBQ0ksU0FBUyxHQUFHSixNQUFJLENBQUM5RCxTQUFTLENBQUNtRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3BETCxNQUFJLENBQUNNLFdBQVcsR0FBR1YsU0FBUztNQUM1QkksTUFBSSxDQUFDTyxXQUFXLEdBQUdWLFNBQVM7TUFDNUJHLE1BQUksQ0FBQ1Esb0JBQW9CLEdBQUdQLGtCQUFrQjtNQUM5QyxJQUFJQSxrQkFBa0IsRUFBRTtRQUN0QixJQUFJRCxNQUFJLENBQUNoRSxTQUFTLENBQUNoRSxRQUFRLEVBQUU7VUFDM0JnSSxNQUFJLENBQUNTLE9BQU8sR0FBR3hMLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDc0UsS0FBSztRQUNoRDtRQUNBLElBQUlWLE1BQUksQ0FBQ2hFLFNBQVMsQ0FBQzlELFdBQVcsRUFBRTtVQUM5QjhILE1BQUksQ0FBQ1csVUFBVSxHQUFHMUwsUUFBUSxDQUFDbUgsY0FBYyxFQUFFLENBQUN3RSxRQUFRO1FBQ3REO1FBQ0EsSUFBSVosTUFBSSxDQUFDaEUsU0FBUyxDQUFDNUQsV0FBVyxFQUFFO1VBQzlCNEgsTUFBSSxDQUFDYSxVQUFVLEdBQUc1TCxRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBFLFFBQVE7UUFDdEQ7TUFDRjtNQUNBLE1BQU1kLE1BQUksQ0FBQ2UsYUFBYSxDQUFDZixNQUFJLENBQUM3SSxXQUFXLENBQUNyQixTQUFTLENBQUM7TUFDcEQsSUFBSSxDQUFDa0ssTUFBSSxDQUFDcEUsYUFBYSxFQUFFLEVBQUU7UUFDekIsTUFBTSxJQUFJcUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO01BQ3JDO01BQ0EsSUFBSTtRQUNGK0IsTUFBSSxDQUFDZ0IsWUFBWSxFQUFFO1FBQ25CLE1BQU1oQixNQUFJLENBQUNpQixrQkFBa0IsRUFBRTtRQUMvQixJQUFJakIsTUFBSSxDQUFDVCxzQkFBc0IsRUFBRTtVQUMvQjtVQUNBLElBQUlTLE1BQUksQ0FBQ2pFLGFBQWEsRUFBRSxJQUFJaUUsTUFBSSxDQUFDeEQsZUFBZSxFQUFFO1lBQ2hELE1BQU13RCxNQUFJLENBQUNrQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7VUFDakM7O1VBRUEsTUFBTWxCLE1BQUksQ0FBQ21CLGlCQUFpQixFQUFFO1FBQ2hDLENBQUMsTUFBTTtVQUNMO1VBQ0EsTUFBTW5CLE1BQUksQ0FBQ2tCLGdCQUFnQixFQUFFO1VBQzdCLE1BQU1sQixNQUFJLENBQUNvQixlQUFlLEVBQUU7UUFDOUI7TUFDRixDQUFDLENBQUMsT0FBT0MsQ0FBQyxFQUFFO1FBQ1YsS0FBSyxDQUFDO01BQ1IsQ0FBQyxTQUFTO1FBQ1JyQixNQUFJLENBQUNzQixPQUFPLEVBQUU7TUFDaEI7SUFBQztFQUNIO0VBQ0FBLE9BQU9BLENBQUEsRUFBRztJQUNSLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0lBQ2QsSUFBSSxDQUFDQyxhQUFhLEVBQUU7SUFDcEIsSUFBSSxDQUFDbEIsV0FBVyxHQUFHLElBQUk7SUFDdkIsSUFBSSxDQUFDQyxXQUFXLEdBQUcsSUFBSTtFQUN6QjtFQUNBa0IsaUJBQWlCQSxDQUFDQyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDN0QsV0FBVyxDQUFDNEQsaUJBQWlCLENBQUNDLEdBQUcsQ0FBQztFQUN6QztFQUNBQyxPQUFPQSxDQUFDQyxRQUFRLEVBQUU7SUFDaEIsT0FBTyxJQUFJLENBQUN4RSxtQkFBbUIsQ0FBQ3dFLFFBQVEsQ0FBQztFQUMzQztFQUNNQyxVQUFVQSxDQUFDQyxPQUFPLEVBQUVsQyxTQUFTLEVBQUVDLFNBQVMsRUFBRUksa0JBQWtCLEVBQXdCO0lBQUEsSUFBQThCLFdBQUEsR0FBQWhDLFNBQUE7TUFBQWlDLE1BQUE7SUFBQSxPQUFBM0csaUJBQUE7TUFBQSxJQUF0QjRHLFlBQVksR0FBQUYsV0FBQSxDQUFBN0IsTUFBQSxRQUFBNkIsV0FBQSxRQUFBNUIsU0FBQSxHQUFBNEIsV0FBQSxNQUFHLEtBQUs7TUFDdEYsSUFBSUUsWUFBWSxFQUFFO1FBQ2hCLE1BQU1ELE1BQUksQ0FBQ1YsT0FBTyxFQUFFO01BQ3RCLENBQUMsTUFBTTtRQUNMVSxNQUFJLENBQUNSLGFBQWEsRUFBRTtNQUN0QjtNQUNBLE1BQU1RLE1BQUksQ0FBQ3JDLFFBQVEsQ0FBQ21DLE9BQU8sRUFBRWxDLFNBQVMsRUFBRUMsU0FBUyxFQUFFSSxrQkFBa0IsQ0FBQztJQUFDO0VBQ3pFOztFQUVBO0VBQ01pQyxlQUFlQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxNQUFBO0lBQUEsT0FBQTlHLGlCQUFBO01BQ3RCLElBQUkrRyxpQkFBaUIsR0FBRyxDQUFDO01BQ3pCLE9BQU8sSUFBSUMsT0FBTyxDQUFDQyxPQUFPLElBQUk7UUFDNUIsSUFBTUMsS0FBSyxHQUFHQSxDQUFBLEtBQU07VUFDbEJDLFVBQVUsZUFBQW5ILGlCQUFBLENBQUMsYUFBWTtZQUNyQixJQUFJOEcsTUFBSSxDQUFDN0csV0FBVyxFQUFFLEVBQUU7Y0FDdEJnSCxPQUFPLEVBQUU7WUFDWCxDQUFDLE1BQU07Y0FDTEYsaUJBQWlCLEVBQUU7Y0FDbkIsS0FBSyxDQUFDO2NBQ05HLEtBQUssRUFBRTtZQUNUO1VBQ0YsQ0FBQyxHQUFFLEdBQUcsQ0FBQztRQUNULENBQUM7UUFDREEsS0FBSyxFQUFFO01BQ1QsQ0FBQyxDQUFDO0lBQUM7RUFDTDtFQUNBdkIsWUFBWUEsQ0FBQSxFQUFHO0lBQ2IsSUFBTXlCLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUJBLENBQWFDLE1BQU0sRUFBRTtNQUM1QyxPQUFPQyxLQUFLLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUdFLFFBQVEsQ0FBQ0YsTUFBTSxDQUFDO0lBQ3ZELENBQUM7SUFDRCxJQUFJLENBQUMxRyxTQUFTLENBQUNoQixnQkFBZ0IsR0FBR3lILG1CQUFtQixDQUFDLElBQUksQ0FBQ3pHLFNBQVMsQ0FBQ2hCLGdCQUFnQixDQUFDO0lBQ3RGLElBQUksQ0FBQ2dCLFNBQVMsQ0FBQ2pFLHlCQUF5QixHQUFHMEssbUJBQW1CLENBQUMsSUFBSSxDQUFDekcsU0FBUyxDQUFDakUseUJBQXlCLENBQUM7SUFDeEcsSUFBSSxDQUFDaUUsU0FBUyxDQUFDbEUsd0JBQXdCLEdBQUcySyxtQkFBbUIsQ0FBQyxJQUFJLENBQUN6RyxTQUFTLENBQUNsRSx3QkFBd0IsQ0FBQztFQUN4RztFQUNBd0csaUJBQWlCQSxDQUFBLEVBQUc7SUFDbEIsSUFBTXVFLE1BQU0sR0FBRyxJQUFJO0lBQ25CLElBQUksa0JBQWtCLENBQUNDLElBQUksQ0FBQzNJLE1BQU0sQ0FBQzRJLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO01BQ3JFLElBQU1DLHNCQUFzQixHQUFHQyxFQUFFLElBQUk7UUFDbkMsSUFBSUEsRUFBRSxDQUFDQyxPQUFPLENBQUNsRCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQ3pCaUQsRUFBRSxDQUFDRSxjQUFjLEVBQUU7VUFDbkJGLEVBQUUsQ0FBQ0csd0JBQXdCLEVBQUU7UUFDL0I7TUFDRixDQUFDO01BQ0RuSixNQUFNLENBQUNvSixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUVMLHNCQUFzQixFQUFFO1FBQzVETSxPQUFPLEVBQUU7TUFDWCxDQUFDLENBQUM7TUFDRnJKLE1BQU0sQ0FBQ29KLGdCQUFnQixDQUFDLFdBQVcsRUFBRUwsc0JBQXNCLEVBQUU7UUFDM0RNLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztNQUNGckosTUFBTSxDQUFDb0osZ0JBQWdCLENBQUMsVUFBVSxFQUFFTCxzQkFBc0IsRUFBRTtRQUMxRE0sT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO0lBQ0o7SUFDQXJKLE1BQU0sQ0FBQ3NKLGNBQWMsR0FBRyxZQUFZO01BQ2xDWixNQUFNLENBQUNhLFNBQVMsR0FBRyxJQUFJO01BQ3ZCYixNQUFNLENBQUN0QixPQUFPLEVBQUU7SUFDbEIsQ0FBQztJQUNELElBQU1vQyxZQUFZO01BQUEsSUFBQUMsS0FBQSxHQUFBdkksaUJBQUEsQ0FBRyxhQUFZO1FBQy9CLElBQUksQ0FBQyxDQUFDLENBQUN3SCxNQUFNLENBQUMzRyxTQUFTLEVBQUU7UUFDekIsSUFBSSxDQUFDMkcsTUFBTSxDQUFDZ0IsMEJBQTBCLEVBQUU7VUFDdENoQixNQUFNLENBQUNnQiwwQkFBMEIsR0FBRyxJQUFJO1VBQ3hDaEIsTUFBTSxDQUFDaUIsdUJBQXVCLEdBQUcsSUFBSTtVQUNyQyxLQUFLLENBQUM7VUFDTmpCLE1BQU0sQ0FBQ2dCLDBCQUEwQixHQUFHLEtBQUs7VUFDekMsTUFBTWhCLE1BQU0sQ0FBQ2hCLFVBQVUsQ0FBQ2dCLE1BQU0sQ0FBQzNHLFNBQVMsRUFBRTJHLE1BQU0sQ0FBQ3ZDLFdBQVcsRUFBRXVDLE1BQU0sQ0FBQ3RDLFdBQVcsRUFBRXNDLE1BQU0sQ0FBQ3JDLG9CQUFvQixDQUFDO1FBQ2hILENBQUMsTUFBTTtVQUNMLEtBQUssQ0FBQztRQUNSO01BQ0YsQ0FBQztNQUFBLGdCQVhLbUQsWUFBWUEsQ0FBQTtRQUFBLE9BQUFDLEtBQUEsQ0FBQUcsS0FBQSxPQUFBaEUsU0FBQTtNQUFBO0lBQUEsR0FXakI7SUFDRDVGLE1BQU0sQ0FBQ29KLGdCQUFnQixDQUFDLFFBQVEsZUFBQWxJLGlCQUFBLENBQUUsYUFBWTtNQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDd0gsTUFBTSxDQUFDaUIsdUJBQXVCLEVBQUU7UUFDckNqQixNQUFNLENBQUNpQix1QkFBdUIsR0FBR3RCLFVBQVUsQ0FBQ21CLFlBQVksRUFBRWQsTUFBTSxDQUFDbUIsdUJBQXVCLENBQUM7TUFDM0Y7SUFDRixDQUFDLEVBQUM7RUFDSjtFQUNBdEUsT0FBT0EsQ0FBQ3VFLEdBQUcsRUFBRTtJQUNYLElBQUksSUFBSSxDQUFDakksU0FBUyxDQUFDZixhQUFhLEVBQUU7TUFDaEMsS0FBSyxDQUFDO0lBQ1IsQ0FBQyxNQUFNO01BQ0wsS0FBSyxDQUFDO0lBQ1I7RUFDRjtFQUNBaUosT0FBT0EsQ0FBQ0MsRUFBRSxFQUFFO0lBQ1YsT0FBTyxJQUFJOUIsT0FBTyxDQUFDQyxPQUFPLElBQUlFLFVBQVUsQ0FBQ0YsT0FBTyxFQUFFNkIsRUFBRSxDQUFDLENBQUM7RUFDeEQ7RUFDQUMsY0FBY0EsQ0FBQ0MsSUFBSSxFQUFFO0lBQ25CLE9BQU8sSUFBSWhDLE9BQU8sQ0FBQyxDQUFDQyxPQUFPLEVBQUUxRixDQUFDLEtBQUs7TUFDakMsSUFBTTBILE1BQU0sR0FBRyxJQUFJQyxVQUFVLEVBQUU7TUFDL0JELE1BQU0sQ0FBQ0UsU0FBUyxHQUFHLE1BQU1sQyxPQUFPLENBQUNnQyxNQUFNLENBQUNHLE1BQU0sQ0FBQztNQUMvQ0gsTUFBTSxDQUFDSSxhQUFhLENBQUNMLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUM7RUFDSjtFQUNBTSxjQUFjQSxDQUFDQyxNQUFNLEVBQUU7SUFDckI7SUFDQTtJQUNBLElBQU1DLFVBQVUsR0FBR0MsSUFBSSxDQUFDRixNQUFNLENBQUNHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFN0M7SUFDQSxJQUFNQyxVQUFVLEdBQUdKLE1BQU0sQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRW5FO0lBQ0EsSUFBTUUsRUFBRSxHQUFHLElBQUlDLFdBQVcsQ0FBQ0wsVUFBVSxDQUFDM0UsTUFBTSxDQUFDO0lBQzdDLElBQU1pRixFQUFFLEdBQUcsSUFBSUMsVUFBVSxDQUFDSCxFQUFFLENBQUM7SUFDN0IsS0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdSLFVBQVUsQ0FBQzNFLE1BQU0sRUFBRW1GLENBQUMsRUFBRSxFQUFFO01BQzFDRixFQUFFLENBQUNFLENBQUMsQ0FBQyxHQUFHUixVQUFVLENBQUNTLFVBQVUsQ0FBQ0QsQ0FBQyxDQUFDO0lBQ2xDO0lBQ0EsT0FBTyxJQUFJRSxJQUFJLENBQUMsQ0FBQ04sRUFBRSxDQUFDLEVBQUU7TUFDcEJ0RyxJQUFJLEVBQUVxRztJQUNSLENBQUMsQ0FBQztFQUNKO0VBQ01RLHFCQUFxQkEsQ0FBQ1osTUFBTSxFQUFFYSxPQUFPLEVBQUVDLGNBQWMsRUFBRTtJQUFBLElBQUFDLE1BQUE7SUFBQSxPQUFBdEssaUJBQUE7TUFDM0QsSUFBSXVKLE1BQU0sS0FBSyxJQUFJLEVBQUUsT0FBTyxJQUFJO01BQ2hDLElBQU1nQixRQUFRLEdBQUdELE1BQUksQ0FBQ2hCLGNBQWMsQ0FBQ0MsTUFBTSxDQUFDO01BQzVDLElBQU1pQixVQUFVLFNBQVNyUSxTQUFTLENBQUNzUSxhQUFhLENBQUNGLFFBQVEsRUFBRUgsT0FBTyxFQUFFQyxjQUFjLENBQUM7TUFDbkYsSUFBTUssZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHSixVQUFVLENBQUNLLElBQUksR0FBR04sUUFBUSxDQUFDTSxJQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRztNQUN4RixLQUFLLENBQUM7TUFDTixhQUFhUCxNQUFJLENBQUN2QixjQUFjLENBQUN5QixVQUFVLENBQUM7SUFBQztFQUMvQzs7RUFFQTtFQUNBTSxxQkFBcUJBLENBQUEsRUFBRztJQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQ2pJLFNBQVMsRUFBRTtNQUNyQixNQUFNLElBQUlELEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUN6QztJQUNBLElBQU1tSSxXQUFXLEdBQUcsSUFBSSxDQUFDdkksV0FBVyxDQUFDd0ksZUFBZSxDQUFDLElBQUksQ0FBQ25JLFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDeEUsSUFBSSxDQUFDb0ksa0JBQWtCLEdBQUcsSUFBSSxDQUFDekksV0FBVyxDQUFDMEksT0FBTyxDQUFDSCxXQUFXLENBQUM7SUFDL0QsSUFBSSxDQUFDdkksV0FBVyxDQUFDMkksWUFBWSxDQUFDLElBQUksQ0FBQ3RJLFNBQVMsRUFBRSxJQUFJLENBQUNvSSxrQkFBa0IsRUFBRUYsV0FBVyxDQUFDO0lBQ25GLE9BQU8sSUFBSSxDQUFDRSxrQkFBa0I7RUFDaEM7RUFDQWxKLG1CQUFtQkEsQ0FBQ3FKLFNBQVMsRUFBRTtJQUM3QixJQUFJQyxnQkFBZ0IsR0FBRyxJQUFJO0lBQzNCLElBQUk7TUFDRixJQUFJLE9BQU9ELFNBQVMsS0FBSyxRQUFRLEVBQUVBLFNBQVMsR0FBR0EsU0FBUyxDQUFDRSxRQUFRLEVBQUU7TUFDbkUsSUFBSUYsU0FBUyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUU7TUFDL0IsSUFBSSxPQUFPQSxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDQSxTQUFTLEVBQUU7UUFDakQsTUFBTSxJQUFJeEksS0FBSyxDQUFDLG9CQUFvQixDQUFDO01BQ3ZDO01BQ0EsSUFBTTJJLFVBQVUsR0FBR0gsU0FBUztNQUM1QixJQUFNTCxXQUFXLEdBQUcsSUFBSSxDQUFDdkksV0FBVyxDQUFDd0ksZUFBZSxDQUFDTyxVQUFVLENBQUMsR0FBRyxDQUFDO01BQ3BFRixnQkFBZ0IsR0FBRyxJQUFJLENBQUM3SSxXQUFXLENBQUMwSSxPQUFPLENBQUNILFdBQVcsQ0FBQztNQUN4RCxJQUFJLENBQUN2SSxXQUFXLENBQUMySSxZQUFZLENBQUNJLFVBQVUsRUFBRUYsZ0JBQWdCLEVBQUVOLFdBQVcsQ0FBQztNQUN4RSxPQUFPLElBQUksQ0FBQ3ZJLFdBQVcsQ0FBQ3ZCLGFBQWEsQ0FBQ29LLGdCQUFnQixDQUFDO0lBQ3pELENBQUMsU0FBUztNQUNSLElBQUlBLGdCQUFnQixFQUFFO1FBQ3BCLElBQUksQ0FBQzdJLFdBQVcsQ0FBQ2dKLEtBQUssQ0FBQ0gsZ0JBQWdCLENBQUM7UUFDeENBLGdCQUFnQixHQUFHLElBQUk7TUFDekI7SUFDRjtFQUNGO0VBQ01JLG9CQUFvQkEsQ0FBQ0MsWUFBWSxFQUFFO0lBQUEsSUFBQUMsTUFBQTtJQUFBLE9BQUEzTCxpQkFBQTtNQUN2QyxJQUFJNEwscUJBQXFCLEdBQUcsS0FBSztNQUNqQyxJQUFJQyxjQUFjLEdBQUcsV0FBVztNQUNoQyxJQUFJLENBQUNGLE1BQUksQ0FBQ0csZ0JBQWdCLEVBQUU7UUFDMUIsT0FBTztVQUNMRixxQkFBcUI7VUFDckJDO1FBQ0YsQ0FBQztNQUNIO01BQ0EsSUFBSUgsWUFBWSxDQUFDSyxVQUFVLEtBQUssQ0FBQyxJQUFJTCxZQUFZLENBQUNNLFdBQVcsS0FBSyxDQUFDLEVBQUU7UUFDbkUsTUFBTUwsTUFBSSxDQUFDakcsYUFBYSxDQUFDaUcsTUFBSSxDQUFDN1AsV0FBVyxDQUFDckIsU0FBUyxDQUFDO1FBQ3BELE9BQU87VUFDTG1SLHFCQUFxQjtVQUNyQkM7UUFDRixDQUFDO01BQ0g7TUFDQUEsY0FBYyxHQUFHSCxZQUFZLENBQUNLLFVBQVUsR0FBRyxHQUFHLEdBQUdMLFlBQVksQ0FBQ00sV0FBVztNQUN6RSxJQUFJTixZQUFZLENBQUNLLFVBQVUsS0FBSyxJQUFJLElBQUlMLFlBQVksQ0FBQ00sV0FBVyxLQUFLLElBQUksSUFBSU4sWUFBWSxDQUFDSyxVQUFVLEtBQUssSUFBSSxJQUFJTCxZQUFZLENBQUNNLFdBQVcsS0FBSyxJQUFJLEVBQUU7UUFDbEpKLHFCQUFxQixHQUFHLElBQUk7TUFDOUIsQ0FBQyxNQUFNLElBQUlGLFlBQVksQ0FBQ0ssVUFBVSxLQUFLLElBQUksSUFBSUwsWUFBWSxDQUFDTSxXQUFXLEtBQUssR0FBRyxJQUFJTixZQUFZLENBQUNLLFVBQVUsS0FBSyxHQUFHLElBQUlMLFlBQVksQ0FBQ00sV0FBVyxLQUFLLElBQUksRUFBRTtRQUN2SkoscUJBQXFCLEdBQUcsSUFBSTtNQUM5QixDQUFDLE1BQU07UUFDTEYsWUFBWSxDQUFDTyxTQUFTLEdBQUcsSUFBSTtRQUM3QkwscUJBQXFCLEdBQUcsS0FBSztNQUMvQjtNQUNBRCxNQUFJLENBQUNPLFlBQVksR0FBR1IsWUFBWSxDQUFDSyxVQUFVO01BQzNDSixNQUFJLENBQUNRLGFBQWEsR0FBR1QsWUFBWSxDQUFDTSxXQUFXO01BQzdDLE9BQU87UUFDTEoscUJBQXFCO1FBQ3JCQztNQUNGLENBQUM7SUFBQztFQUNKO0VBQ0FPLG1CQUFtQkEsQ0FBQzNGLE9BQU8sRUFBRTtJQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDNEYsYUFBYSxDQUFDQyxRQUFRLENBQUM3RixPQUFPLENBQUMsRUFBRSxNQUFNLElBQUk3RCxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDbEYsSUFBSTtNQUNGLElBQUkySixPQUFPLEdBQUcsQ0FBQztNQUNmLElBQUlDLGVBQWUsR0FBRyxJQUFJO01BQzFCLElBQU1uQixnQkFBZ0IsR0FBRyxJQUFJLENBQUNQLHFCQUFxQixFQUFFO01BQ3JELFFBQVFyRSxPQUFPO1FBQ2I7UUFDQSxLQUFLLFFBQVE7UUFDYixLQUFLLFFBQVE7UUFDYixLQUFLLFlBQVk7UUFDakIsS0FBSyxZQUFZO1VBQ2Y4RixPQUFPLEdBQUcsSUFBSSxDQUFDL0osV0FBVyxDQUFDaUssZ0JBQWdCLENBQUNwQixnQkFBZ0IsQ0FBQztVQUM3RG1CLGVBQWUsR0FBR0EsQ0FBQSxLQUFNLElBQUksQ0FBQ2hLLFdBQVcsQ0FBQ2tLLG9CQUFvQixDQUFDSCxPQUFPLENBQUM7VUFDdEU7UUFDRixLQUFLLFVBQVU7UUFDZixLQUFLLGtCQUFrQjtRQUN2QixLQUFLLGNBQWM7UUFDbkIsS0FBSyxzQkFBc0I7VUFDekJBLE9BQU8sR0FBRyxJQUFJLENBQUMvSixXQUFXLENBQUNtSyxrQkFBa0IsQ0FBQ3RCLGdCQUFnQixDQUFDO1VBQy9EbUIsZUFBZSxHQUFHQSxDQUFBLEtBQU0sSUFBSSxDQUFDaEssV0FBVyxDQUFDb0ssc0JBQXNCLENBQUNMLE9BQU8sQ0FBQztVQUN4RTtRQUNGLEtBQUssT0FBTztRQUNaLEtBQUssWUFBWTtRQUNqQixLQUFLLFdBQVc7VUFDZEEsT0FBTyxHQUFHLElBQUksQ0FBQy9KLFdBQVcsQ0FBQ3FLLGVBQWUsQ0FBQ3hCLGdCQUFnQixDQUFDO1VBQzVEbUIsZUFBZSxHQUFHQSxDQUFBLEtBQU0sSUFBSSxDQUFDaEssV0FBVyxDQUFDc0ssbUJBQW1CLENBQUNQLE9BQU8sQ0FBQztVQUNyRTtRQUNGLEtBQUssUUFBUTtVQUNYQSxPQUFPLEdBQUcsSUFBSSxDQUFDL0osV0FBVyxDQUFDdUssZ0JBQWdCLENBQUMxQixnQkFBZ0IsQ0FBQztVQUM3RG1CLGVBQWUsR0FBR0EsQ0FBQSxLQUFNLElBQUksQ0FBQ2hLLFdBQVcsQ0FBQ3dLLG9CQUFvQixDQUFDVCxPQUFPLENBQUM7VUFDdEU7UUFDRjtVQUNFLE1BQU0sSUFBSTNKLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQztNQUFDO01BRS9DLElBQUksQ0FBQ0osV0FBVyxDQUFDZ0osS0FBSyxDQUFDSCxnQkFBZ0IsQ0FBQztNQUN4QyxJQUFJa0IsT0FBTyxLQUFLLENBQUMsRUFBRTtRQUNqQixJQUFJLElBQUksQ0FBQ1UseUJBQXlCLEtBQUssSUFBSSxDQUFDQyxzQkFBc0IsRUFBRTtVQUNsRSxNQUFNLElBQUl0SyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDdEM7UUFDQSxJQUFJLENBQUNzSyxzQkFBc0IsRUFBRTtNQUMvQjtNQUNBLE9BQU8sQ0FBQ1gsT0FBTyxFQUFFQyxlQUFlLENBQUM7SUFDbkMsQ0FBQyxDQUFDLE9BQU94RyxDQUFDLEVBQUU7TUFDVjtNQUNBLEtBQUssQ0FBQztNQUNOLEtBQUssQ0FBQztNQUNOLE1BQU1BLENBQUM7SUFDVDtFQUNGO0VBQ0FtSCxXQUFXQSxDQUFBLEVBQUc7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDQyxRQUFRLEVBQUU7TUFDbEIsSUFBSSxDQUFDQSxRQUFRLEdBQUcsSUFBSSxDQUFDNUssV0FBVyxDQUFDMEksT0FBTyxDQUFDLElBQUksQ0FBQ21DLGlCQUFpQixHQUFHLElBQUksQ0FBQ0Msa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQ2hHO0lBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQ0MsY0FBYyxFQUFFO01BQ3hCLElBQUksQ0FBQ0EsY0FBYyxHQUFHLElBQUksQ0FBQy9LLFdBQVcsQ0FBQzBJLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDdEQ7SUFDQSxJQUFJLElBQUksQ0FBQ3ZLLFNBQVMsQ0FBQ3RFLFdBQVcsRUFBRTtNQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDbVIsbUJBQW1CLEVBQUU7UUFDN0IsSUFBSSxDQUFDQSxtQkFBbUIsR0FBRyxJQUFJLENBQUNoTCxXQUFXLENBQUMwSSxPQUFPLENBQUMsSUFBSSxDQUFDO01BQzNEO0lBQ0Y7SUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDa0MsUUFBUSxFQUFFLElBQUksQ0FBQ0csY0FBYyxFQUFFLElBQUksQ0FBQ0MsbUJBQW1CLENBQUM7RUFDdkU7RUFDTUMsZ0JBQWdCQSxDQUFDbEIsT0FBTyxFQUFFbUIsUUFBUSxFQUFFQyxPQUFPLEVBQW9CO0lBQUEsSUFBQUMsV0FBQSxHQUFBbEosU0FBQTtNQUFBbUosTUFBQTtJQUFBLE9BQUE3TixpQkFBQTtNQUFBLElBQWxCOE4sT0FBTyxHQUFBRixXQUFBLENBQUEvSSxNQUFBLFFBQUErSSxXQUFBLFFBQUE5SSxTQUFBLEdBQUE4SSxXQUFBLE1BQUcsTUFBTTtNQUNqRSxJQUFJO1FBQ0YsSUFBSUUsT0FBTyxLQUFLLE1BQU0sRUFBRTtVQUN0QkQsTUFBSSxDQUFDckwsV0FBVyxDQUFDdUwsMkJBQTJCLENBQUN4QixPQUFPLEVBQUVtQixRQUFRLEVBQUVDLE9BQU8sQ0FBQztRQUMxRSxDQUFDLE1BQU0sSUFBSUcsT0FBTyxLQUFLLE1BQU0sRUFBRTtVQUM3QkQsTUFBSSxDQUFDckwsV0FBVyxDQUFDd0wsMkJBQTJCLENBQUN6QixPQUFPLENBQUM7UUFDdkQ7UUFDQSxJQUFNMEIsT0FBTyxHQUFHSixNQUFJLENBQUNyTCxXQUFXLENBQUMwTCxpQkFBaUIsRUFBRTtRQUNwRCxJQUFNQyxVQUFVLEdBQUdOLE1BQUksQ0FBQ3JMLFdBQVcsQ0FBQzRMLG1CQUFtQixFQUFFO1FBQ3pELElBQU1DLFVBQVUsR0FBRyxJQUFJdEUsVUFBVSxDQUFDOEQsTUFBSSxDQUFDckwsV0FBVyxDQUFDOEwsS0FBSyxDQUFDQyxNQUFNLEVBQUVKLFVBQVUsRUFBRUYsT0FBTyxDQUFDO1FBQ3JGLElBQU03RSxNQUFNLEdBQUcsSUFBSVcsVUFBVSxDQUFDc0UsVUFBVSxDQUFDO1FBQ3pDLElBQU1yRixJQUFJLEdBQUcsSUFBSWtCLElBQUksQ0FBQyxDQUFDZCxNQUFNLENBQUMsRUFBRTtVQUM5QjlGLElBQUksRUFBRTtRQUNSLENBQUMsQ0FBQztRQUNGLGFBQWF1SyxNQUFJLENBQUM5RSxjQUFjLENBQUNDLElBQUksQ0FBQztNQUN4QyxDQUFDLENBQUMsT0FBT2hELENBQUMsRUFBRTtRQUNWLEtBQUssQ0FBQztRQUNOLE1BQU1BLENBQUM7TUFDVCxDQUFDLFNBQVM7UUFDUjZILE1BQUksQ0FBQ3JMLFdBQVcsQ0FBQ2dNLGlCQUFpQixFQUFFO01BQ3RDO0lBQUM7RUFDSDs7RUFFQTtFQUNBQyxlQUFlQSxDQUFBLEVBQUc7SUFDaEIsSUFBSSxJQUFJLENBQUNyQixRQUFRLEVBQUU7TUFDakIsSUFBSSxDQUFDNUssV0FBVyxDQUFDZ0osS0FBSyxDQUFDLElBQUksQ0FBQzRCLFFBQVEsQ0FBQztNQUNyQyxJQUFJLENBQUNBLFFBQVEsR0FBRyxJQUFJO0lBQ3RCO0lBQ0EsSUFBSSxDQUFDc0IscUJBQXFCLEVBQUU7SUFDNUIsSUFBSSxDQUFDQyw2QkFBNkIsRUFBRTtFQUN0QztFQUNBRCxxQkFBcUJBLENBQUEsRUFBRztJQUN0QixJQUFJLElBQUksQ0FBQ25CLGNBQWMsS0FBSyxJQUFJLEVBQUU7TUFDaEMsSUFBSSxDQUFDL0ssV0FBVyxDQUFDZ0osS0FBSyxDQUFDLElBQUksQ0FBQytCLGNBQWMsQ0FBQztNQUMzQyxJQUFJLENBQUNBLGNBQWMsR0FBRyxJQUFJO0lBQzVCO0VBQ0Y7RUFDQW9CLDZCQUE2QkEsQ0FBQSxFQUFHO0lBQzlCLElBQUksSUFBSSxDQUFDbkIsbUJBQW1CLEtBQUssSUFBSSxFQUFFO01BQ3JDLElBQUksQ0FBQ2hMLFdBQVcsQ0FBQ2dKLEtBQUssQ0FBQyxJQUFJLENBQUNnQyxtQkFBbUIsQ0FBQztNQUNoRCxJQUFJLENBQUNBLG1CQUFtQixHQUFHLElBQUk7SUFDakM7RUFDRjs7RUFFQTtFQUNBb0Isa0JBQWtCQSxDQUFBLEVBQUc7SUFDbkIsSUFBSSxJQUFJLENBQUNDLFdBQVcsS0FBSyxJQUFJLEVBQUU7TUFDN0IsSUFBSSxDQUFDck0sV0FBVyxDQUFDZ0osS0FBSyxDQUFDLElBQUksQ0FBQ3FELFdBQVcsQ0FBQztNQUN4QyxJQUFJLENBQUNBLFdBQVcsR0FBRyxJQUFJO0lBQ3pCO0VBQ0Y7O0VBRUE7RUFDQUMseUJBQXlCQSxDQUFBLEVBQUc7SUFDMUIsSUFBSSxJQUFJLENBQUM3RCxrQkFBa0IsRUFBRTtNQUMzQixJQUFJLENBQUN6SSxXQUFXLENBQUNnSixLQUFLLENBQUMsSUFBSSxDQUFDUCxrQkFBa0IsQ0FBQztNQUMvQyxJQUFJLENBQUNBLGtCQUFrQixHQUFHLElBQUk7SUFDaEM7RUFDRjs7RUFFQTtFQUNBOEQsdUJBQXVCQSxDQUFBLEVBQUc7SUFDeEIsSUFBSSxJQUFJLENBQUNDLHdCQUF3QixFQUFFO01BQ2pDLElBQUksQ0FBQ0Esd0JBQXdCLEVBQUU7TUFDL0IsSUFBSSxDQUFDQSx3QkFBd0IsR0FBRyxJQUFJO0lBQ3RDO0VBQ0Y7RUFDTUMsNkJBQTZCQSxDQUFDdkQsWUFBWSxFQUFFO0lBQUEsSUFBQXdELE1BQUE7SUFBQSxPQUFBbFAsaUJBQUE7TUFDaEQsSUFBTTtRQUNKNEwscUJBQXFCO1FBQ3JCQztNQUNGLENBQUMsU0FBU3FELE1BQUksQ0FBQ3pELG9CQUFvQixDQUFDQyxZQUFZLENBQUM7TUFDakQsSUFBSSxDQUFDRSxxQkFBcUIsRUFBRTtRQUMxQixJQUFJQyxjQUFjLEtBQUssV0FBVyxFQUFFO1VBQ2xDLEtBQUssQ0FBQztRQUNSO01BQ0Y7TUFDQSxPQUFPRCxxQkFBcUI7SUFBQztFQUMvQjtFQUNBdUQsbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQ3hPLFNBQVMsQ0FBQ3hCLGNBQWMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUc7RUFDMUQ7RUFDQWlRLGVBQWVBLENBQUEsRUFBRztJQUNoQixPQUFPLElBQUksQ0FBQ3pPLFNBQVMsQ0FBQ3ZCLFVBQVU7RUFDbEM7RUFDTWlRLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQUMsT0FBQTtJQUFBLE9BQUF0UCxpQkFBQTtNQUMzQixJQUFJLENBQUNzUCxPQUFJLENBQUN4RCxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7TUFDckQsSUFBSSxDQUFDeUQsZ0JBQWdCLEVBQUVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQ0YsT0FBSSxDQUFDakMsaUJBQWlCLEVBQUVpQyxPQUFJLENBQUNoQyxrQkFBa0IsQ0FBQztNQUM1RixJQUFNO1FBQ0ptQyxLQUFLO1FBQ0xDLE1BQU07UUFDTkM7TUFDRixDQUFDLEdBQUcvVixRQUFRLENBQUNtSCxjQUFjLEVBQUU7O01BRTdCO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBOztNQUVBLElBQUk2TyxVQUFVLEdBQUdGLE1BQU07TUFDdkIsSUFBSUcsY0FBYyxHQUFHSixLQUFLLENBQUMxRCxVQUFVO01BQ3JDLElBQUkrRCxlQUFlLEdBQUdMLEtBQUssQ0FBQ3pELFdBQVc7TUFDdkMsSUFBSStELG9CQUFvQixHQUFHTixLQUFLLENBQUNPLFdBQVc7TUFDNUMsSUFBSUMscUJBQXFCLEdBQUdSLEtBQUssQ0FBQ1MsWUFBWTtNQUM5QyxJQUFJQyxzQkFBc0IsR0FBR2IsT0FBSSxDQUFDYyxvQkFBb0I7TUFDdEQsSUFBSUMsdUJBQXVCLEdBQUdmLE9BQUksQ0FBQ2dCLHFCQUFxQjtNQUN4RCxJQUFJQyxvQkFBb0IsR0FBR2pCLE9BQUksQ0FBQ3ZMLGtCQUFrQjtNQUNsRCxJQUFNeU0sV0FBVyxHQUFHbEIsT0FBSSxDQUFDek8sU0FBUyxLQUFLLFlBQVk7TUFDbkQsSUFBSXlPLE9BQUksQ0FBQ21CLGtCQUFrQixFQUFFO1FBQzNCLENBQUNOLHNCQUFzQixFQUFFRSx1QkFBdUIsQ0FBQyxHQUFHLENBQUNBLHVCQUF1QixFQUFFRixzQkFBc0IsQ0FBQztRQUNyRyxDQUFDWixnQkFBZ0IsRUFBRUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDQSxnQkFBZ0IsRUFBRUQsZ0JBQWdCLENBQUM7UUFDM0VLLFVBQVUsR0FBR0QsY0FBYztRQUMzQlksb0JBQW9CLEdBQUdqQixPQUFJLENBQUN2TCxrQkFBa0IsS0FBSyxVQUFVLEdBQUcsV0FBVyxHQUFHLFVBQVU7TUFDMUY7TUFDQSxJQUFJMk0sYUFBYSxHQUFHLEtBQUs7TUFDekIsSUFBSUMsY0FBYyxHQUFHLEtBQUs7TUFDMUIsSUFBSXJCLE9BQUksQ0FBQ3pMLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDdkMsSUFBSTBNLG9CQUFvQixLQUFLakIsT0FBSSxDQUFDekwsZUFBZSxFQUFFO1VBQ2pEO1VBQ0E2TSxhQUFhLEdBQUdiLGNBQWM7VUFDOUJjLGNBQWMsR0FBR2IsZUFBZTtRQUNsQyxDQUFDLE1BQU07VUFDTDtVQUNBYSxjQUFjLEdBQUdiLGVBQWU7UUFDbEM7TUFDRixDQUFDLE1BQU07UUFDTCxJQUFJUyxvQkFBb0IsS0FBS2pCLE9BQUksQ0FBQ3pMLGVBQWUsRUFBRTtVQUNqRDtVQUNBOE0sY0FBYyxHQUFHYixlQUFlO1FBQ2xDLENBQUMsTUFBTTtVQUNMO1VBQ0FZLGFBQWEsR0FBR2IsY0FBYztVQUM5QmMsY0FBYyxHQUFHYixlQUFlO1FBQ2xDO01BQ0Y7TUFDQSxJQUFJYyxFQUFFLEVBQUVDLEVBQUU7TUFDVixJQUFNQyxLQUFLLEdBQUdqQixjQUFjLEdBQUdFLG9CQUFvQjtNQUNuRCxJQUFNZ0IsTUFBTSxHQUFHcEcsSUFBSSxDQUFDcUcsR0FBRyxDQUFDckcsSUFBSSxDQUFDQyxLQUFLLENBQUN1RixzQkFBc0IsR0FBR1csS0FBSyxDQUFDLEVBQUVKLGFBQWEsQ0FBQztNQUNsRixJQUFNTyxPQUFPLEdBQUd0RyxJQUFJLENBQUNxRyxHQUFHLENBQUNyRyxJQUFJLENBQUNDLEtBQUssQ0FBQ3lGLHVCQUF1QixHQUFHUyxLQUFLLENBQUMsRUFBRUgsY0FBYyxDQUFDO01BQ3JGQyxFQUFFLEdBQUdqRyxJQUFJLENBQUN1RyxHQUFHLENBQUN2RyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDbUYsb0JBQW9CLEdBQUdJLHNCQUFzQixJQUFJLENBQUMsR0FBR1csS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ3pGRCxFQUFFLEdBQUdsRyxJQUFJLENBQUN1RyxHQUFHLENBQUN2RyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDcUYscUJBQXFCLEdBQUdJLHVCQUF1QixJQUFJLENBQUMsR0FBR1MsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQzNGLElBQUlOLFdBQVcsRUFBRTtRQUNmLENBQUNqQixnQkFBZ0IsRUFBRUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDQSxnQkFBZ0IsRUFBRUQsZ0JBQWdCLENBQUM7TUFDN0U7TUFDQUssVUFBVSxDQUFDdUIsWUFBWSxDQUFDLE9BQU8sRUFBRTVCLGdCQUFnQixDQUFDO01BQ2xESyxVQUFVLENBQUN1QixZQUFZLENBQUMsUUFBUSxFQUFFM0IsZ0JBQWdCLENBQUM7TUFDbkQsSUFBTTRCLFdBQVcsR0FBR3hCLFVBQVUsQ0FBQ3lCLFVBQVUsQ0FBQyxJQUFJLEVBQUU7UUFDOUNDLGtCQUFrQixFQUFFO01BQ3RCLENBQUMsQ0FBQztNQUNGRixXQUFXLENBQUNHLFNBQVMsQ0FBQzlCLEtBQUssRUFBRW1CLEVBQUUsRUFBRUMsRUFBRSxFQUFFRSxNQUFNLEVBQUVFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFMUIsZ0JBQWdCLEVBQUVDLGdCQUFnQixDQUFDO01BQy9GLElBQUlnQyxPQUFPLEVBQUVDLFVBQVU7TUFDdkJELE9BQU8sR0FBR0osV0FBVyxDQUFDTSxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRW5DLGdCQUFnQixFQUFFQyxnQkFBZ0IsQ0FBQztNQUM1RWlDLFVBQVUsR0FBRzdCLFVBQVUsQ0FBQytCLFNBQVMsQ0FBQyxZQUFZLENBQUM7TUFDL0MsSUFBSW5CLFdBQVcsRUFBRTtRQUNmLENBQUNnQixPQUFPLEVBQUVDLFVBQVUsQ0FBQyxTQUFTbkMsT0FBSSxDQUFDc0MsUUFBUSxDQUFDSixPQUFPLEVBQUVDLFVBQVUsRUFBRSxHQUFHLENBQUM7TUFDdkU7TUFDQSxJQUFJbkMsT0FBSSxDQUFDbUIsa0JBQWtCLEVBQUU7UUFDM0IsYUFBYW5CLE9BQUksQ0FBQ3NDLFFBQVEsQ0FBQ0osT0FBTyxFQUFFQyxVQUFVLEVBQUVuQyxPQUFJLENBQUNILG1CQUFtQixFQUFFLENBQUM7TUFDN0UsQ0FBQyxNQUFNO1FBQ0wsT0FBTyxDQUFDcUMsT0FBTyxFQUFFQyxVQUFVLENBQUM7TUFDOUI7SUFBQztFQUNIO0VBQ01HLFFBQVFBLENBQUNKLE9BQU8sRUFBRUMsVUFBVSxFQUFFSSxNQUFNLEVBQUU7SUFBQSxPQUFBN1IsaUJBQUE7TUFDMUMsT0FBTyxJQUFJZ0gsT0FBTyxDQUFDQyxPQUFPLElBQUk7UUFDNUIsSUFBSTRLLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDaEI1SyxPQUFPLENBQUMsQ0FBQ3VLLE9BQU8sRUFBRUMsVUFBVSxDQUFDLENBQUM7UUFDaEM7UUFDQSxJQUFNSyxHQUFHLEdBQUcsSUFBSUMsS0FBSyxFQUFFO1FBQ3ZCLElBQU1DLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ25ESixHQUFHLENBQUNLLEdBQUcsR0FBR1YsVUFBVTtRQUNwQkssR0FBRyxDQUFDNUosZ0JBQWdCLENBQUMsTUFBTSxlQUFBbEksaUJBQUEsQ0FBRSxhQUFZO1VBQ3ZDO1VBQ0EsSUFBTW9TLFdBQVcsR0FBR0osVUFBVSxDQUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDO1VBQy9DVyxVQUFVLENBQUN6VSxLQUFLLENBQUM4VSxRQUFRLEdBQUcsVUFBVTtVQUN0QyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDL0YsUUFBUSxDQUFDdUYsTUFBTSxDQUFDLEVBQUU7WUFDOUJHLFVBQVUsQ0FBQzNVLEtBQUssR0FBR3lVLEdBQUcsQ0FBQ1EsTUFBTTtZQUM3Qk4sVUFBVSxDQUFDTSxNQUFNLEdBQUdSLEdBQUcsQ0FBQ3pVLEtBQUs7VUFDL0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUNpUCxRQUFRLENBQUN1RixNQUFNLENBQUMsRUFBRTtZQUNwQ0csVUFBVSxDQUFDM1UsS0FBSyxHQUFHeVUsR0FBRyxDQUFDelUsS0FBSztZQUM1QjJVLFVBQVUsQ0FBQ00sTUFBTSxHQUFHUixHQUFHLENBQUNRLE1BQU07VUFDaEM7VUFDQSxJQUFJVCxNQUFNLEtBQUssRUFBRSxFQUFFTyxXQUFXLENBQUNHLFNBQVMsQ0FBQ1QsR0FBRyxDQUFDUSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJVCxNQUFNLEtBQUssR0FBRyxFQUFFTyxXQUFXLENBQUNHLFNBQVMsQ0FBQ1QsR0FBRyxDQUFDelUsS0FBSyxFQUFFeVUsR0FBRyxDQUFDUSxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUlULE1BQU0sS0FBSyxHQUFHLEVBQUVPLFdBQVcsQ0FBQ0csU0FBUyxDQUFDLENBQUMsRUFBRVQsR0FBRyxDQUFDelUsS0FBSyxDQUFDO1VBQzFMK1UsV0FBVyxDQUFDSSxNQUFNLENBQUNYLE1BQU0sR0FBR2xILElBQUksQ0FBQzhILEVBQUUsR0FBRyxHQUFHLENBQUM7VUFDMUNMLFdBQVcsQ0FBQ2IsU0FBUyxDQUFDTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUNoQyxJQUFNWSxZQUFZLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUNwRyxRQUFRLENBQUN1RixNQUFNLENBQUMsR0FBR08sV0FBVyxDQUFDVixZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRUksR0FBRyxDQUFDUSxNQUFNLEVBQUVSLEdBQUcsQ0FBQ3pVLEtBQUssQ0FBQyxHQUFHK1UsV0FBVyxDQUFDVixZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRUksR0FBRyxDQUFDelUsS0FBSyxFQUFFeVUsR0FBRyxDQUFDUSxNQUFNLENBQUM7VUFDL0pyTCxPQUFPLENBQUMsQ0FBQ3lMLFlBQVksRUFBRVYsVUFBVSxDQUFDTCxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztVQUMzRFMsV0FBVyxDQUFDTyxPQUFPLEVBQUU7UUFDdkIsQ0FBQyxFQUFDO01BQ0osQ0FBQyxDQUFDO0lBQUM7RUFDTDtFQUNNQyxtQkFBbUJBLENBQUNyRyxPQUFPLEVBQWdDO0lBQUEsSUFBQXNHLFdBQUEsR0FBQW5PLFNBQUE7TUFBQW9PLE9BQUE7SUFBQSxPQUFBOVMsaUJBQUE7TUFBQSxJQUE5QitTLE9BQU8sR0FBQUYsV0FBQSxDQUFBaE8sTUFBQSxRQUFBZ08sV0FBQSxRQUFBL04sU0FBQSxHQUFBK04sV0FBQSxNQUFHLENBQUM7TUFBQSxJQUFFRyxRQUFRLEdBQUFILFdBQUEsQ0FBQWhPLE1BQUEsUUFBQWdPLFdBQUEsUUFBQS9OLFNBQUEsR0FBQStOLFdBQUEsTUFBRyxJQUFJO01BQzdELElBQUksQ0FBQ3RHLE9BQU8sSUFBSUEsT0FBTyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztNQUN0QjtNQUNBLElBQUk7UUFDRixJQUFJaUYsT0FBTztRQUNYLElBQUlDLFVBQVUsR0FBRyxJQUFJO1FBQ3JCLElBQU0sQ0FBQ2xELE1BQU0sQ0FBQyxHQUFHdUUsT0FBSSxDQUFDM0YsV0FBVyxFQUFFO1FBQ25DLElBQUk2RixRQUFRLEtBQUssSUFBSSxFQUFFO1VBQ3JCeEIsT0FBTyxHQUFHd0IsUUFBUTtRQUNwQixDQUFDLE1BQU07VUFDTCxDQUFDeEIsT0FBTyxFQUFFQyxVQUFVLENBQUMsU0FBU3FCLE9BQUksQ0FBQ3pELG9CQUFvQixFQUFFO1FBQzNEO1FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQ21DLE9BQU8sRUFBRTtVQUNkLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBQ3RCO1FBQ0FzQixPQUFJLENBQUN0USxXQUFXLENBQUM4TCxLQUFLLENBQUMyRSxHQUFHLENBQUN6QixPQUFPLENBQUMwQixJQUFJLEVBQUUzRSxNQUFNLENBQUM7UUFDaEQsSUFBSTRFLEdBQUcsR0FBRyxLQUFLO1VBQ2JDLEtBQUssR0FBRyxLQUFLO1VBQ2JDLFFBQVEsR0FBRyxLQUFLO1FBQ2xCLFFBQVFQLE9BQUksQ0FBQ2pTLFNBQVM7VUFDcEIsS0FBSyxRQUFRO1VBQ2IsS0FBSyxRQUFRO1VBQ2IsS0FBSyxZQUFZO1VBQ2pCLEtBQUssWUFBWTtZQUNmc1MsR0FBRyxHQUFHLElBQUk7WUFDVjtVQUNGLEtBQUssVUFBVTtVQUNmLEtBQUssY0FBYztVQUNuQixLQUFLLGtCQUFrQjtVQUN2QixLQUFLLHNCQUFzQjtZQUN6QkUsUUFBUSxHQUFHLElBQUk7WUFDZjtVQUNGLEtBQUssT0FBTztVQUNaLEtBQUssWUFBWTtVQUNqQixLQUFLLFdBQVc7WUFDZEQsS0FBSyxHQUFHLElBQUk7WUFDWjtVQUNGLEtBQUssUUFBUTtZQUNYO1lBQ0E7VUFDRjtZQUNFLE1BQU0sSUFBSXhRLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUFDO1FBRTVDLElBQUl3RyxNQUFNLEdBQUcsSUFBSTtRQUNqQixJQUFJK0osR0FBRyxJQUFJRSxRQUFRLElBQUlELEtBQUssRUFBRTtVQUM1QmhLLE1BQU0sR0FBRzBKLE9BQUksQ0FBQ3RRLFdBQVcsQ0FBQzhRLGlCQUFpQixDQUFDL0UsTUFBTSxFQUFFdUUsT0FBSSxDQUFDekYsaUJBQWlCLEVBQUV5RixPQUFJLENBQUN4RixrQkFBa0IsRUFBRWYsT0FBTyxFQUFFNEcsR0FBRyxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQztRQUNySSxDQUFDLE1BQU07VUFDTGpLLE1BQU0sR0FBRzBKLE9BQUksQ0FBQ3RRLFdBQVcsQ0FBQytRLGFBQWEsQ0FBQ2hGLE1BQU0sRUFBRXVFLE9BQUksQ0FBQ3pGLGlCQUFpQixFQUFFeUYsT0FBSSxDQUFDeEYsa0JBQWtCLEVBQUVmLE9BQU8sRUFBRXdHLE9BQU8sQ0FBQztRQUNwSDs7UUFFQTtRQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUMzSixNQUFNLEVBQUVvSSxPQUFPLEVBQUVDLFVBQVUsQ0FBQztNQUN4QyxDQUFDLENBQUMsT0FBT3pMLENBQUMsRUFBRTtRQUNWLElBQU13TixPQUFPLEdBQUcseUJBQXlCLEdBQUd4TixDQUFDO1FBQzdDLElBQUlBLENBQUMsQ0FBQ3NGLFFBQVEsRUFBRSxDQUFDZ0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1VBQ25DLEtBQUssQ0FBQztRQUNSLENBQUMsTUFBTTtVQUNMLEtBQUssQ0FBQztVQUNOLE1BQU10RyxDQUFDO1FBQ1Q7TUFDRjtJQUFDO0VBQ0g7RUFDTXlOLGtCQUFrQkEsQ0FBQ2xILE9BQU8sRUFBRTlGLE9BQU8sRUFBRWlOLE9BQU8sRUFBRUMsbUJBQW1CLEVBQUVuQyxPQUFPLEVBQUVDLFVBQVUsRUFBRTtJQUFBLElBQUFtQyxPQUFBO0lBQUEsT0FBQTVULGlCQUFBO01BQzVGLElBQUk7UUFDRixJQUFJdU0sT0FBTyxLQUFLLElBQUksRUFBRTtVQUNwQixPQUFPLEVBQUU7UUFDWCxDQUFDLE1BQU0sSUFBSUEsT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFO1VBQ3pCLE9BQU8sc0JBQXNCO1FBQy9CO1FBQ0EsSUFBSW5CLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQ3dJLE9BQUksQ0FBQ3ZILGFBQWEsQ0FBQ0MsUUFBUSxDQUFDN0YsT0FBTyxDQUFDLEVBQUUsTUFBTSxJQUFJN0QsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQ2xGLElBQU0sR0FBR2lSLFlBQVksQ0FBQyxHQUFHRCxPQUFJLENBQUN6RyxXQUFXLEVBQUU7UUFDM0MsSUFBTTJHLFdBQVc7VUFBQSxJQUFBQyxLQUFBLEdBQUEvVCxpQkFBQSxDQUFHLFdBQU0yVCxtQkFBbUIsRUFBSTtZQUFBLElBQUFLLFVBQUEsRUFBQUMsV0FBQTtZQUMvQyxJQUFJTixtQkFBbUIsRUFBRTtjQUN2QixNQUFNQyxPQUFJLENBQUNoQixtQkFBbUIsQ0FBQ3JHLE9BQU8sRUFBRSxDQUFDLEVBQUVpRixPQUFPLENBQUM7WUFDckQ7WUFDQSxRQUFRL0ssT0FBTztjQUNiLEtBQUssUUFBUTtjQUNiLEtBQUssUUFBUTtjQUNiLEtBQUssWUFBWTtjQUNqQixLQUFLLFlBQVk7Z0JBQ2YyRSxTQUFTLEdBQUd3SSxPQUFJLENBQUNwUixXQUFXLENBQUMwUixVQUFVLENBQUMzSCxPQUFPLEVBQUVzSCxZQUFZLENBQUM7Z0JBQzlEO2NBQ0YsS0FBSyxVQUFVO2NBQ2YsS0FBSyxrQkFBa0I7Y0FDdkIsS0FBSyxjQUFjO2NBQ25CLEtBQUssc0JBQXNCO2dCQUN6QnpJLFNBQVMsR0FBR3dJLE9BQUksQ0FBQ3BSLFdBQVcsQ0FBQzJSLFlBQVksQ0FBQzVILE9BQU8sRUFBRXNILFlBQVksQ0FBQztnQkFDaEU7Y0FDRixLQUFLLE9BQU87Y0FDWixLQUFLLFdBQVc7Z0JBQ2R6SSxTQUFTLEdBQUd3SSxPQUFJLENBQUNwUixXQUFXLENBQUM0UixTQUFTLENBQUM3SCxPQUFPLEVBQUVzSCxZQUFZLENBQUM7Z0JBQzdEO2NBQ0YsS0FBSyxZQUFZO2dCQUNmekksU0FBUyxHQUFHd0ksT0FBSSxDQUFDcFIsV0FBVyxDQUFDNlIsYUFBYSxDQUFDOUgsT0FBTyxFQUFFc0gsWUFBWSxDQUFDO2dCQUNqRTtjQUNGLEtBQUssUUFBUTtnQkFDWHpJLFNBQVMsR0FBR3dJLE9BQUksQ0FBQ3BSLFdBQVcsQ0FBQzhSLFVBQVUsQ0FBQy9ILE9BQU8sRUFBRXNILFlBQVksQ0FBQztnQkFDOUQ7Y0FDRjtnQkFDRSxNQUFNLElBQUlqUixLQUFLLENBQUMseUJBQXlCLENBQUM7WUFBQzs7WUFHL0M7WUFDQSxJQUFJNkQsT0FBTyxLQUFLLFFBQVEsRUFBRTtjQUN4QixJQUFJMkUsU0FBUyxLQUFLLElBQUksSUFBSUEsU0FBUyxLQUFLLEVBQUUsSUFBSUEsU0FBUyxLQUFLLE9BQU8sSUFBSUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDL0YsT0FBTyxLQUFLO2NBQ2QsQ0FBQyxNQUFNO2dCQUNMLE9BQU8sSUFBSTtjQUNiO1lBQ0Y7WUFDQUEsU0FBUyxHQUFHd0ksT0FBSSxDQUFDVyxhQUFhLENBQUNuSixTQUFTLENBQUM7WUFDekMsSUFBSSxFQUFBNEksVUFBQSxHQUFBNUksU0FBUyxjQUFBNEksVUFBQSx1QkFBVEEsVUFBQSxDQUFXUSxRQUFRLE1BQUssV0FBVyxJQUFJLEVBQUFQLFdBQUEsR0FBQTdJLFNBQVMsY0FBQTZJLFdBQUEsdUJBQVRBLFdBQUEsQ0FBV08sUUFBUSxNQUFLLE1BQU0sRUFBRTtjQUN6RSxPQUFPLElBQUk7WUFDYixDQUFDLE1BQU07Y0FDTCxJQUFJYixtQkFBbUIsRUFBRTtnQkFDdkIsSUFBSUMsT0FBSSxDQUFDYSxxQkFBcUIsR0FBR2IsT0FBSSxDQUFDYyx3QkFBd0IsRUFBRTtrQkFDOUQ7a0JBQ0E7a0JBQ0EsSUFBTUMsUUFBUSxHQUFHZixPQUFJLENBQUNhLHFCQUFxQixHQUFHYixPQUFJLENBQUNnQixtQkFBbUIsQ0FBQy9QLE1BQU07a0JBQzdFMk0sT0FBTyxHQUFHb0MsT0FBSSxDQUFDZ0IsbUJBQW1CLENBQUNELFFBQVEsQ0FBQztrQkFDNUNmLE9BQUksQ0FBQ2EscUJBQXFCLEVBQUU7a0JBQzVCLGFBQWFYLFdBQVcsQ0FBQ0gsbUJBQW1CLENBQUM7Z0JBQy9DLENBQUMsTUFBTTtrQkFDTDtrQkFDQUMsT0FBSSxDQUFDYSxxQkFBcUIsR0FBRyxDQUFDO2tCQUM5QmIsT0FBSSxDQUFDeE4saUJBQWlCLENBQUMsS0FBSyxDQUFDO2tCQUM3QndOLE9BQUksQ0FBQ2lCLG1CQUFtQixFQUFFLENBQUMsQ0FBQztrQkFDNUIsTUFBTWpCLE9BQUksQ0FBQ2xPLGFBQWEsQ0FBQ2tPLE9BQUksQ0FBQzlYLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFLEtBQUssRUFBRTJXLFVBQVUsQ0FBQztrQkFDbkZtQyxPQUFJLENBQUNrQixVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBPLEtBQUssRUFBRTtvQkFDL0N6TyxPQUFPLEVBQUU7a0JBQ1gsQ0FBQyxDQUFDO2tCQUNGLE9BQU8sS0FBSztnQkFDZDtjQUNGLENBQUMsTUFBTTtnQkFDTCxPQUFPLEtBQUs7Y0FDZDtZQUNGO1VBQ0YsQ0FBQztVQUFBLGdCQWxFSzhTLFdBQVdBLENBQUFpQixFQUFBO1lBQUEsT0FBQWhCLEtBQUEsQ0FBQXJMLEtBQUEsT0FBQWhFLFNBQUE7VUFBQTtRQUFBLEdBa0VoQjtRQUNEOztRQUVBLFVBQVVvUCxXQUFXLENBQUNILG1CQUFtQixDQUFDLEVBQUU7VUFDMUMsSUFBTS9TLFlBQVksR0FBRzZGLE9BQU8sS0FBSyxRQUFRO1VBQ3pDLElBQUl1TyxZQUFZO1VBQ2hCLElBQUlwVSxZQUFZLEVBQUU7WUFDaEJvVSxZQUFZLEdBQUdwQixPQUFJLENBQUNxQixZQUFZLENBQUN6WixRQUFRO1VBQzNDLENBQUMsTUFBTSxJQUFJb1ksT0FBSSxDQUFDalQsU0FBUyxDQUFDcEUsZUFBZSxFQUFFO1lBQ3pDeVksWUFBWSxHQUFHcEIsT0FBSSxDQUFDcUIsWUFBWSxDQUFDMVosT0FBTztVQUMxQyxDQUFDLE1BQU07WUFDTHlaLFlBQVksR0FBR3BCLE9BQUksQ0FBQ3FCLFlBQVksQ0FBQ3phLElBQUk7VUFDdkM7VUFDQSxJQUFJMGEsV0FBVyxTQUFTdEIsT0FBSSxDQUFDbkcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUVxSCxPQUFJLENBQUN1QixpQkFBaUIsQ0FBQzFaLEtBQUssRUFBRXVaLFlBQVksQ0FBQztVQUNsRyxJQUFJSSxTQUFTLEdBQUcsSUFBSTtVQUNwQixJQUFJQyxTQUFTLEdBQUcsSUFBSTtVQUNwQixJQUFJLENBQUN6VSxZQUFZLEVBQUU7WUFDakJ3VSxTQUFTLFNBQVN4QixPQUFJLENBQUNuRyxnQkFBZ0IsQ0FBQ2xCLE9BQU8sRUFBRXFILE9BQUksQ0FBQ3VCLGlCQUFpQixDQUFDelosSUFBSSxFQUFFa1ksT0FBSSxDQUFDcUIsWUFBWSxDQUFDMVosT0FBTyxDQUFDO1lBQ3hHNlosU0FBUyxHQUFHQSxTQUFTLEtBQUssT0FBTyxHQUFHLElBQUksR0FBR0EsU0FBUztZQUNwREMsU0FBUyxHQUFHekIsT0FBSSxDQUFDalQsU0FBUyxDQUFDckUsWUFBWSxTQUFTc1gsT0FBSSxDQUFDbkcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUUsSUFBSSxFQUFFeUksWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUk7VUFDbkg7VUFDQSxJQUFJdEIsT0FBTyxFQUFFO1lBQ1gsTUFBTUUsT0FBSSxDQUFDbE8sYUFBYSxDQUFDa08sT0FBSSxDQUFDOVgsV0FBVyxDQUFDZCx1QkFBdUIsRUFBRSxLQUFLLEVBQUVvYSxTQUFTLENBQUM7VUFDdEYsQ0FBQyxNQUFNO1lBQ0wsTUFBTXhCLE9BQUksQ0FBQ2xPLGFBQWEsQ0FBQ2tPLE9BQUksQ0FBQzlYLFdBQVcsQ0FBQ2YsY0FBYyxDQUFDO1VBQzNEOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQSxPQUFPLENBQUNxUSxTQUFTLEVBQUU4SixXQUFXLEVBQUVFLFNBQVMsRUFBRUMsU0FBUyxDQUFDO1FBQ3ZELENBQUMsTUFBTTtVQUNMLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDbEM7TUFDRixDQUFDLENBQUMsT0FBT3JQLENBQUMsRUFBRTtRQUNWLEtBQUssQ0FBQztRQUNOLE1BQU1BLENBQUM7TUFDVDtJQUFDO0VBQ0g7RUFDQXNQLFlBQVlBLENBQUM3TyxPQUFPLEVBQUU4RixPQUFPLEVBQUU7SUFDN0IsT0FBTyxJQUFJdkYsT0FBTyxDQUFDLENBQUNDLE9BQU8sRUFBRXNPLE1BQU0sS0FBSztNQUN0QyxJQUFNLEdBQUcxQixZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMxRyxXQUFXLEVBQUU7TUFDM0MsSUFBSTFHLE9BQU8sQ0FBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNoQztRQUNBO1FBQ0FtQyxVQUFVLENBQUMsTUFBTTtVQUNmRixPQUFPLENBQUMsSUFBSSxDQUFDekUsV0FBVyxDQUFDZ1QsU0FBUyxDQUFDakosT0FBTyxFQUFFc0gsWUFBWSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNULENBQUMsTUFBTTtRQUNMMEIsTUFBTSxDQUFDLElBQUkzUyxLQUFLLENBQUMsOENBQThDLEdBQUc2RCxPQUFPLENBQUMsQ0FBQztNQUM3RTtJQUNGLENBQUMsQ0FBQztFQUNKO0VBQ0E4TixhQUFhQSxDQUFDa0IsR0FBRyxFQUFFO0lBQ2pCLElBQUlDLEtBQUssR0FBR0QsR0FBRyxDQUFDL0wsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMxQixJQUFJaU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLEtBQUssSUFBSTNMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzBMLEtBQUssQ0FBQzdRLE1BQU0sRUFBRW1GLENBQUMsRUFBRSxFQUFFO01BQ3JDLElBQUk0TCxJQUFJLEdBQUdGLEtBQUssQ0FBQzFMLENBQUMsQ0FBQyxDQUFDTixLQUFLLENBQUMsR0FBRyxDQUFDO01BQzlCLElBQUlrTSxJQUFJLENBQUMvUSxNQUFNLEtBQUssQ0FBQyxFQUFFOFEsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0EsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQztJQUNBLE9BQU9ELEdBQUc7RUFDWjtFQUNBRSxhQUFhQSxDQUFDdEosT0FBTyxFQUFFO0lBQ3JCLElBQUlBLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxFQUFFO0lBQ1gsQ0FBQyxNQUFNLElBQUlBLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtNQUN6QixPQUFPLHNCQUFzQjtJQUMvQjtJQUNBLElBQU0sSUFBSXVKLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDM0ksV0FBVyxFQUFFO0lBQ2pELElBQUkvRCxNQUFNLEdBQUcsSUFBSTtJQUNqQkEsTUFBTSxHQUFHLElBQUksQ0FBQzVHLFdBQVcsQ0FBQ3VULFdBQVcsQ0FBQ3hKLE9BQU8sRUFBRXVKLGlCQUFpQixDQUFDO0lBQ2pFLElBQUkxTSxNQUFNLElBQUksSUFBSSxJQUFJQSxNQUFNLEtBQUssRUFBRSxFQUFFO01BQ25DLEtBQUssQ0FBQztJQUNSOztJQUVBOztJQUVBLE9BQU9BLE1BQU0sS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQ21MLGFBQWEsQ0FBQ25MLE1BQU0sQ0FBQztFQUM1RDtFQUNNNE0saUJBQWlCQSxDQUFDdlAsT0FBTyxFQUFFOEYsT0FBTyxFQUFFaUYsT0FBTyxFQUFFO0lBQUEsSUFBQXlFLE9BQUE7SUFBQSxPQUFBalcsaUJBQUE7TUFDakQsTUFBTWlXLE9BQUksQ0FBQ3JELG1CQUFtQixDQUFDckcsT0FBTyxFQUFFLENBQUMsRUFBRWlGLE9BQU8sQ0FBQztNQUNuRDtNQUNBLGFBQWF5RSxPQUFJLENBQUNYLFlBQVksQ0FBQzdPLE9BQU8sRUFBRThGLE9BQU8sQ0FBQztJQUFDO0VBQ25EO0VBQ0EySixpQ0FBaUNBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFDbEMsSUFBSSxDQUFDQyxtQ0FBbUMsRUFBRTtJQUMxQyxJQUFJLENBQUNDLDhCQUE4QixHQUFHbFAsVUFBVSxlQUFBbkgsaUJBQUEsQ0FBQyxhQUFZO01BQzNEO01BQ0EsTUFBTW1XLE9BQUksQ0FBQ0cseUJBQXlCLEVBQUU7SUFDeEMsQ0FBQyxHQUFFLElBQUksQ0FBQzNWLFNBQVMsQ0FBQ3RCLGtDQUFrQyxDQUFDO0VBQ3ZEO0VBQ01pWCx5QkFBeUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFBQSxPQUFBdlcsaUJBQUE7TUFDaEMsSUFBSTtRQUNGdVcsT0FBSSxDQUFDSCxtQ0FBbUMsRUFBRTtRQUMxQyxJQUFNSSxVQUFVLEdBQUdELE9BQUksQ0FBQzFWLFNBQVMsQ0FBQ3lMLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdEQsTUFBTWlLLE9BQUksQ0FBQ0UsWUFBWSxDQUFDRCxVQUFVLENBQUM7UUFDbkMsSUFBTTtVQUNKL0c7UUFDRixDQUFDLEdBQUc3VixRQUFRLENBQUNtSCxjQUFjLEVBQUU7UUFDN0IsSUFBSTBPLEtBQUssRUFBRTtVQUNUO1VBQ0E7VUFDQTtVQUNBLElBQUksV0FBVyxJQUFJQSxLQUFLLEVBQUU7WUFDeEJBLEtBQUssQ0FBQ3hELFNBQVMsR0FBR3NLLE9BQUksQ0FBQ0csUUFBUTtVQUNqQyxDQUFDLE1BQU07WUFDTDtZQUNBakgsS0FBSyxDQUFDMEMsR0FBRyxHQUFHclQsTUFBTSxDQUFDNlgsR0FBRyxDQUFDQyxlQUFlLENBQUNMLE9BQUksQ0FBQ0csUUFBUSxDQUFDO1VBQ3ZEO1VBQ0FqSCxLQUFLLENBQUN2SCxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNO1lBQzdDO1lBQ0F1SCxLQUFLLENBQUNvSCxJQUFJLEVBQUU7VUFDZCxDQUFDLENBQUM7VUFDRnBILEtBQUssQ0FBQ3ZILGdCQUFnQixDQUFDLFNBQVMsZUFBQWxJLGlCQUFBLENBQUUsYUFBWTtZQUM1QyxLQUFLLENBQUM7O1lBRU47WUFDQXVXLE9BQUksQ0FBQ3hTLGtCQUFrQixHQUFHMEwsS0FBSyxDQUFDMUQsVUFBVSxHQUFHMEQsS0FBSyxDQUFDekQsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsV0FBVztZQUM3RixLQUFLLENBQUM7WUFDTixLQUFLLENBQUM7WUFDTixLQUFLLENBQUM7WUFDTnVLLE9BQUksQ0FBQ3pLLGdCQUFnQixHQUFHLElBQUk7WUFDNUIsTUFBTXlLLE9BQUksQ0FBQ08sYUFBYSxFQUFFO1VBQzVCLENBQUMsRUFBQztVQUNGLE1BQU1QLE9BQUksQ0FBQzdRLGFBQWEsQ0FBQzZRLE9BQUksQ0FBQ3phLFdBQVcsQ0FBQ3BCLEtBQUssQ0FBQztVQUNoRCtVLEtBQUssQ0FBQ3NILG9CQUFvQixFQUFFO1FBQzlCLENBQUMsTUFBTTtVQUNMLE1BQU1SLE9BQUksQ0FBQzdRLGFBQWEsQ0FBQzZRLE9BQUksQ0FBQ3phLFdBQVcsQ0FBQ3JCLFNBQVMsQ0FBQztVQUNwRDhiLE9BQUksQ0FBQ3BRLGFBQWEsRUFBRTtRQUN0QjtNQUNGLENBQUMsQ0FBQyxPQUFPSCxDQUFDLEVBQUU7UUFDVixLQUFLLENBQUM7UUFDTixJQUFJQSxDQUFDLENBQUNnUixJQUFJLEtBQUssaUJBQWlCLEVBQUU7VUFDaEMsSUFBTUMsWUFBWSxHQUFHLHlDQUF5QztVQUM5RCxLQUFLLENBQUM7VUFDTixLQUFLLENBQUM7VUFDTlYsT0FBSSxDQUFDVyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUVsUixDQUFDLEVBQUVpUixZQUFZLENBQUM7UUFDbEQsQ0FBQyxNQUFNLElBQUlqUixDQUFDLENBQUNnUixJQUFJLEtBQUssa0JBQWtCLEVBQUU7VUFDeEM7VUFDQSxNQUFNVCxPQUFJLENBQUM3USxhQUFhLENBQUM2USxPQUFJLENBQUN6YSxXQUFXLENBQUNyQixTQUFTLENBQUM7VUFDcEQ4YixPQUFJLENBQUNZLFVBQVUsRUFBRTtVQUNqQixJQUFJWixPQUFJLENBQUM1VixTQUFTLENBQUNyQiwrQkFBK0IsR0FBRyxDQUFDLEVBQUU7WUFDdEQ7WUFDQWlYLE9BQUksQ0FBQ2EsMEJBQTBCLElBQUksQ0FBQztZQUNwQ2IsT0FBSSxDQUFDTCxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7VUFDNUMsQ0FBQyxNQUFNO1lBQ0wsSUFBSUssT0FBSSxDQUFDNVYsU0FBUyxDQUFDckIsK0JBQStCLEdBQUdpWCxPQUFJLENBQUNhLDBCQUEwQixFQUFFO2NBQ3BGYixPQUFJLENBQUNhLDBCQUEwQixJQUFJLENBQUM7Y0FDcENiLE9BQUksQ0FBQ0wsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsTUFBTTtjQUNMLElBQU1lLGFBQVksR0FBRywwRUFBMEU7Y0FDL0ZWLE9BQUksQ0FBQ1csa0JBQWtCLENBQUMsTUFBTSxFQUFFbFIsQ0FBQyxFQUFFaVIsYUFBWSxDQUFDO1lBQ2xEO1VBQ0Y7UUFDRjtNQUNGO0lBQUM7RUFDSDtFQUNBbkMsVUFBVUEsQ0FBQ3VDLEVBQUUsRUFBRTlaLEtBQUssRUFBRTtJQUNwQixJQUFJOFosRUFBRSxJQUFJOVosS0FBSyxFQUFFO01BQ2Z4QixNQUFNLENBQUN1YixNQUFNLENBQUNELEVBQUUsQ0FBQzlaLEtBQUssRUFBRUEsS0FBSyxDQUFDO0lBQ2hDO0VBQ0Y7RUFDQWdhLGlCQUFpQkEsQ0FBQ2xSLEdBQUcsRUFBRTtJQUNyQixRQUFRQSxHQUFHO01BQ1Q7TUFDQSxLQUFLLElBQUksQ0FBQ3ZLLFdBQVcsQ0FBQ3JCLFNBQVM7UUFDN0IsSUFBSSxDQUFDK2MsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ25CLFNBQVM7UUFDNUM7TUFDRixLQUFLLElBQUksQ0FBQ3FCLFdBQVcsQ0FBQ3BCLEtBQUs7UUFDekIsSUFBSSxDQUFDOGMsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ2xCLEtBQUs7UUFDeEM7TUFDRixLQUFLLElBQUksQ0FBQ29CLFdBQVcsQ0FBQ2YsY0FBYztNQUNwQyxLQUFLLElBQUksQ0FBQ2UsV0FBVyxDQUFDZCx1QkFBdUI7UUFDM0MsSUFBSSxDQUFDd2MsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ1gsV0FBVztRQUM5QztNQUNGLEtBQUssSUFBSSxDQUFDYSxXQUFXLENBQUNiLFdBQVc7TUFDakMsS0FBSyxJQUFJLENBQUNhLFdBQVcsQ0FBQ1osb0JBQW9CO01BQzFDLEtBQUssSUFBSSxDQUFDWSxXQUFXLENBQUNYLFVBQVU7UUFDOUIsSUFBSSxDQUFDcWMsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ1IsSUFBSTtRQUN2QztJQUFNO0VBRVo7RUFDTXNLLGFBQWFBLENBQUNXLEdBQUcsRUFBK0M7SUFBQSxJQUFBb1IsV0FBQSxHQUFBL1MsU0FBQTtNQUFBZ1QsT0FBQTtJQUFBLE9BQUExWCxpQkFBQTtNQUFBLElBQTdDMlgsV0FBVyxHQUFBRixXQUFBLENBQUE1UyxNQUFBLFFBQUE0UyxXQUFBLFFBQUEzUyxTQUFBLEdBQUEyUyxXQUFBLE1BQUcsS0FBSztNQUFBLElBQUVHLGVBQWUsR0FBQUgsV0FBQSxDQUFBNVMsTUFBQSxRQUFBNFMsV0FBQSxRQUFBM1MsU0FBQSxHQUFBMlMsV0FBQSxNQUFHLElBQUk7TUFDbEUsSUFBSUMsT0FBSSxDQUFDRyx3QkFBd0IsS0FBS3hSLEdBQUcsSUFBSXNSLFdBQVcsS0FBSyxLQUFLLEVBQUU7UUFDbEU7TUFDRjtNQUNBRCxPQUFJLENBQUNILGlCQUFpQixDQUFDbFIsR0FBRyxDQUFDO01BQzNCcVIsT0FBSSxDQUFDRyx3QkFBd0IsR0FBR3hSLEdBQUc7TUFDbkNxUixPQUFJLENBQUNJLGdCQUFnQixHQUFHelIsR0FBRztNQUMzQixJQUFNO1FBQ0owUixRQUFRO1FBQ1JDLFdBQVc7UUFDWEM7TUFDRixDQUFDLEdBQUdyZSxRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IsSUFBTXhELEtBQUssR0FBRztRQUNaMmEsV0FBVyxFQUFFUixPQUFJLENBQUMvVyxTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0MsS0FBSyxHQUFHLElBQUk7UUFDekQ4YSxXQUFXLEVBQUVULE9BQUksQ0FBQy9XLFNBQVMsQ0FBQ3ZELGdCQUFnQixDQUFDRyxLQUFLO1FBQ2xENmEsWUFBWSxFQUFFVixPQUFJLENBQUMvVyxTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0UsTUFBTSxHQUFHLElBQUk7UUFDM0QrYSxXQUFXLEVBQUVYLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQ3ZELGdCQUFnQixDQUFDaUosR0FBRztNQUNsRCxDQUFDO01BQ0QsSUFBSTBSLFFBQVEsRUFBRTtRQUNaTCxPQUFJLENBQUM1QyxVQUFVLENBQUNpRCxRQUFRLEVBQUV4YSxLQUFLLENBQUM7TUFDbEM7TUFDQSxJQUFJbWEsT0FBSSxDQUFDL1csU0FBUyxDQUFDeEMsdUJBQXVCLEVBQUU7UUFDMUMsSUFBSSxDQUFDLENBQUN1WixPQUFJLENBQUMvVyxTQUFTLENBQUMzRSxhQUFhLEVBQUU7VUFDbEMsS0FBSyxDQUFDO1FBQ1IsQ0FBQyxNQUFNO1VBQUEsSUFBQXNjLHFCQUFBO1VBQ0xOLFdBQVcsYUFBWEEsV0FBVyx3QkFBQU0scUJBQUEsR0FBWE4sV0FBVyxDQUFFTyxhQUFhLENBQUMsZUFBZSxDQUFDLGNBQUFELHFCQUFBLHVCQUEzQ0EscUJBQUEsQ0FBNkNuSCxZQUFZLENBQUMsTUFBTSxFQUFFdUcsT0FBSSxDQUFDL1csU0FBUyxDQUFDdkMsY0FBYyxDQUFDaUksR0FBRyxDQUFDLENBQUM7UUFDdkc7TUFDRjtNQUNBLElBQUlxUixPQUFJLENBQUMvVyxTQUFTLENBQUN6RCxZQUFZLEVBQUU7UUFBQSxJQUFBc2IscUJBQUE7UUFDL0JQLGFBQWEsYUFBYkEsYUFBYSx3QkFBQU8scUJBQUEsR0FBYlAsYUFBYSxDQUFFTSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsY0FBQUMscUJBQUEsdUJBQTlDQSxxQkFBQSxDQUFnRHJILFlBQVksQ0FBQyxNQUFNLEVBQUV1RyxPQUFJLENBQUMvVyxTQUFTLENBQUNoQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztNQUN2SDtNQUNBLElBQU04WixPQUFPLEdBQUdmLE9BQUksQ0FBQ3hULHNCQUFzQixHQUFHLFFBQVEsR0FBRyxNQUFNO01BQy9ELElBQUl3VCxPQUFJLENBQUN2UyxvQkFBb0IsRUFBRTtRQUM3QixJQUFJdVMsT0FBSSxDQUFDL1csU0FBUyxDQUFDaEUsUUFBUSxJQUFJK2EsT0FBSSxDQUFDL1csU0FBUyxDQUFDL0QsZUFBZSxFQUFFO1VBQzdEOGEsT0FBSSxDQUFDdlMsb0JBQW9CLENBQUN1VCxJQUFJLENBQUNoQixPQUFJLEVBQUVlLE9BQU8sRUFBRWYsT0FBSSxDQUFDN1csU0FBUyxFQUFFNlcsT0FBSSxDQUFDSSxnQkFBZ0IsRUFBRUosT0FBSSxDQUFDdFMsT0FBTyxFQUFFLEtBQUssRUFBRXNTLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQy9ELGVBQWUsRUFBRThhLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQ3pELFlBQVksRUFBRXdhLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzFELFlBQVksRUFBRTJhLGVBQWUsQ0FBQztRQUN0TjtRQUNBLElBQUlGLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzlELFdBQVcsSUFBSTZhLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzdELGtCQUFrQixFQUFFO1VBQ25FNGEsT0FBSSxDQUFDdlMsb0JBQW9CLENBQUN1VCxJQUFJLENBQUNoQixPQUFJLEVBQUVlLE9BQU8sRUFBRWYsT0FBSSxDQUFDN1csU0FBUyxFQUFFNlcsT0FBSSxDQUFDSSxnQkFBZ0IsRUFBRUosT0FBSSxDQUFDcFMsVUFBVSxFQUFFLFFBQVEsRUFBRW9TLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzdELGtCQUFrQixFQUFFNGEsT0FBSSxDQUFDL1csU0FBUyxDQUFDekQsWUFBWSxFQUFFd2EsT0FBSSxDQUFDL1csU0FBUyxDQUFDMUQsWUFBWSxFQUFFMmEsZUFBZSxDQUFDO1FBQy9OO1FBQ0EsSUFBSUYsT0FBSSxDQUFDL1csU0FBUyxDQUFDNUQsV0FBVyxJQUFJMmEsT0FBSSxDQUFDL1csU0FBUyxDQUFDM0Qsa0JBQWtCLEVBQUU7VUFDbkUwYSxPQUFJLENBQUN2UyxvQkFBb0IsQ0FBQ3VULElBQUksQ0FBQ2hCLE9BQUksRUFBRWUsT0FBTyxFQUFFZixPQUFJLENBQUM3VyxTQUFTLEVBQUU2VyxPQUFJLENBQUNJLGdCQUFnQixFQUFFSixPQUFJLENBQUNsUyxVQUFVLEVBQUUsUUFBUSxFQUFFa1MsT0FBSSxDQUFDL1csU0FBUyxDQUFDM0Qsa0JBQWtCLEVBQUUwYSxPQUFJLENBQUMvVyxTQUFTLENBQUN6RCxZQUFZLEVBQUV3YSxPQUFJLENBQUMvVyxTQUFTLENBQUMxRCxZQUFZLEVBQUUyYSxlQUFlLENBQUM7UUFDL047TUFDRjtNQUNBLElBQUl2UixHQUFHLEtBQUtxUixPQUFJLENBQUM1YixXQUFXLENBQUNqQixzQkFBc0IsSUFBSXdMLEdBQUcsS0FBS3FSLE9BQUksQ0FBQzViLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFO1FBQ3JHLElBQUk0YyxPQUFJLENBQUMvVyxTQUFTLENBQUMxRCxZQUFZLEVBQUU7VUFDL0J5YSxPQUFJLENBQUNpQixpQkFBaUIsQ0FBQ2YsZUFBZSxDQUFDOztVQUV2QztVQUNBLElBQUl2UixHQUFHLEtBQUtxUixPQUFJLENBQUM1YixXQUFXLENBQUNoQixxQkFBcUIsRUFBRTtZQUNsRHFNLFVBQVUsQ0FBQ3VRLE9BQUksQ0FBQ2tCLGVBQWUsRUFBRSxJQUFJLEVBQUVsQixPQUFJLENBQUM7VUFDOUM7UUFDRjtNQUNGO01BQ0EsSUFBSXJSLEdBQUcsS0FBS3FSLE9BQUksQ0FBQzViLFdBQVcsQ0FBQ2QsdUJBQXVCLEVBQUU7UUFDcEQsSUFBTTtVQUNKeVU7UUFDRixDQUFDLEdBQUc3VixRQUFRLENBQUNtSCxjQUFjLEVBQUU7UUFDN0IyVyxPQUFJLENBQUM1QyxVQUFVLENBQUNyRixLQUFLLEVBQUU7VUFDckJ6TyxPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJMFcsT0FBSSxDQUFDL1csU0FBUyxDQUFDMUQsWUFBWSxFQUFFO1VBQy9CeWEsT0FBSSxDQUFDaUIsaUJBQWlCLENBQUNmLGVBQWUsQ0FBQztRQUN6QztNQUNGO01BQ0EsSUFBSXZSLEdBQUcsS0FBS3FSLE9BQUksQ0FBQzViLFdBQVcsQ0FBQ1osb0JBQW9CLEVBQUU7UUFDakQsSUFBSXdjLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzFELFlBQVksRUFBRTtVQUMvQnlhLE9BQUksQ0FBQ2tCLGVBQWUsRUFBRTtRQUN4QjtNQUNGO01BQ0EsTUFBTWxCLE9BQUksQ0FBQzdPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUE7RUFDekI7O0VBRUE4UCxpQkFBaUJBLENBQUNmLGVBQWUsRUFBRTtJQUNqQyxJQUFNO01BQ0ppQixhQUFhO01BQ2JDO0lBQ0YsQ0FBQyxHQUFHbGYsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCK1gsWUFBWSxDQUFDM0csR0FBRyxHQUFHeUYsZUFBZTtJQUNsQyxJQUFNbUIsUUFBUSxHQUFHO01BQ2YsV0FBVyxFQUFFLEtBQUs7TUFDbEIsWUFBWSxFQUFFO0lBQ2hCLENBQUM7SUFDRCxJQUFJLENBQUNqRSxVQUFVLENBQUNnRSxZQUFZLEVBQUVDLFFBQVEsQ0FBQztJQUN2QyxJQUFJLENBQUNqRSxVQUFVLENBQUMrRCxhQUFhLEVBQUU7TUFDN0I3WCxPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7RUFDSjtFQUNBNFgsZUFBZUEsQ0FBQ0ksT0FBTyxFQUFFO0lBQ3ZCLElBQUl4UixNQUFNLEdBQUcsSUFBSTtJQUNqQixJQUFJd1IsT0FBTyxFQUFFO01BQ1h4UixNQUFNLEdBQUd3UixPQUFPO0lBQ2xCO0lBQ0EsSUFBTTtNQUNKdkosS0FBSztNQUNMb0osYUFBYTtNQUNiQztJQUNGLENBQUMsR0FBR2xmLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtJQUM3QnlHLE1BQU0sQ0FBQ3NOLFVBQVUsQ0FBQ3JGLEtBQUssRUFBRTtNQUN2QnpPLE9BQU8sRUFBRTtJQUNYLENBQUMsQ0FBQztJQUNGd0csTUFBTSxDQUFDc04sVUFBVSxDQUFDK0QsYUFBYSxFQUFFO01BQy9CN1gsT0FBTyxFQUFFO0lBQ1gsQ0FBQyxDQUFDO0lBQ0Y4WCxZQUFZLENBQUMzRyxHQUFHLEdBQUcsRUFBRTtFQUN2QjtFQUNNOEcsaUJBQWlCQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQUEsT0FBQWxaLGlCQUFBO01BQ3hCO01BQ0EsSUFBSSxDQUFDMEgsU0FBUyxDQUFDeVIsWUFBWSxFQUFFO1FBQzNCLE1BQU0sSUFBSXZXLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQztNQUM1RDtNQUNBLElBQU13VyxPQUFPLFNBQVMxUixTQUFTLENBQUN5UixZQUFZLENBQUNFLGdCQUFnQixFQUFFO01BQy9ELElBQUlDLE1BQU0sR0FBRyxFQUFFO01BQ2YsS0FBSyxJQUFNQyxNQUFNLElBQUlILE9BQU8sRUFBRTtRQUM1QixJQUFJRyxNQUFNLENBQUNDLElBQUksS0FBSyxZQUFZLEVBQUU7VUFDaEMsSUFBSTtZQUNGLElBQUlELE1BQU0sWUFBWUUsZUFBZSxFQUFFO2NBQ3JDLElBQUlGLE1BQU0sQ0FBQ0csZUFBZSxFQUFFO2dCQUFBLElBQUFDLGVBQUE7Z0JBQzFCLElBQU1DLEdBQUcsR0FBR0wsTUFBTSxDQUFDRyxlQUFlLEVBQUU7Z0JBQ3BDLElBQUlFLEdBQUcsYUFBSEEsR0FBRyxnQkFBQUQsZUFBQSxHQUFIQyxHQUFHLENBQUVDLFVBQVUsY0FBQUYsZUFBQSxlQUFmQSxlQUFBLENBQWlCck4sUUFBUSxDQUFDNE0sT0FBSSxDQUFDWSxzQkFBc0IsQ0FBQyxFQUFFO2tCQUFBLElBQUFDLGFBQUE7a0JBQzFELElBQU1DLGdCQUFnQixHQUFHLGFBQWE7a0JBQ3RDLElBQUlBLGdCQUFnQixDQUFDdlMsSUFBSSxFQUFBc1MsYUFBQSxHQUFDUixNQUFNLENBQUNVLEtBQUssY0FBQUYsYUFBQSx1QkFBWkEsYUFBQSxDQUFjblMsV0FBVyxFQUFFLENBQUMsRUFBRTtrQkFDeEQwUixNQUFNLENBQUNZLElBQUksQ0FBQ04sR0FBRyxDQUFDTyxRQUFRLENBQUM7Z0JBQzNCO2NBQ0Y7WUFDRjtVQUNGLENBQUMsQ0FBQyxPQUFPblUsQ0FBQyxFQUFFO1lBQ1Y7WUFDQTtZQUNBO1lBQ0EsSUFBSUEsQ0FBQyxZQUFZb1UsY0FBYyxFQUFFO2NBQUEsSUFBQUMsY0FBQTtjQUMvQixJQUFNQyxlQUFlLEdBQUcsVUFBVTtjQUNsQyxJQUFJLENBQUFELGNBQUEsR0FBQWQsTUFBTSxDQUFDVSxLQUFLLGNBQUFJLGNBQUEsZUFBWkEsY0FBQSxDQUFjeFYsTUFBTSxJQUFJeVYsZUFBZSxDQUFDN1MsSUFBSSxDQUFDOFIsTUFBTSxDQUFDVSxLQUFLLENBQUMsRUFBRTtnQkFDOURYLE1BQU0sQ0FBQ1ksSUFBSSxDQUFDWCxNQUFNLENBQUNZLFFBQVEsQ0FBQztjQUM5QjtZQUNGO1VBQ0Y7UUFDRjtNQUNGO01BQ0FqQixPQUFJLENBQUM3VSxPQUFPLGFBQUFrVyxNQUFBLENBQWFqQixNQUFNLHdCQUFBaUIsTUFBQSxDQUFxQmpCLE1BQU0sQ0FBQ3pVLE1BQU0sRUFBRztNQUNwRSxPQUFPeVUsTUFBTTtJQUFDO0VBQ2hCO0VBQ0FrQixrQkFBa0JBLENBQUEsRUFBRztJQUNuQixJQUFNQyxPQUFPLEdBQUc3Z0IsUUFBUSxDQUFDZ0ssZ0JBQWdCLENBQUNoSyxRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzJaLEdBQUcsQ0FBQztJQUN4RSxJQUFJQyxTQUFTLEdBQUcsS0FBSztJQUNyQixJQUFJRixPQUFPLEtBQUssSUFBSSxDQUFDRyxtQkFBbUIsRUFBRTtNQUN4QyxJQUFJLENBQUMvVyxlQUFlLEdBQUc0VyxPQUFPO01BQzlCLElBQUksQ0FBQ0csbUJBQW1CLEdBQUdILE9BQU87TUFDbENFLFNBQVMsR0FBRyxJQUFJO0lBQ2xCO0lBQ0EsT0FBTztNQUNMRixPQUFPO01BQ1BFO0lBQ0YsQ0FBQztFQUNIO0VBQ0FFLGVBQWVBLENBQUNsRixHQUFHLEVBQUU7SUFDbkJBLEdBQUcsQ0FBQ21GLFNBQVMsR0FBRyxFQUFFO0lBQ2xCbkYsR0FBRyxDQUFDb0YsZUFBZSxDQUFDLE9BQU8sQ0FBQztJQUM1QnBGLEdBQUcsQ0FBQ29GLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDNUIsSUFBSSxDQUFDakcsVUFBVSxDQUFDYSxHQUFHLEVBQUU7TUFDbkIzVSxPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7RUFDSjtFQUNNNEUsa0JBQWtCQSxDQUFBLEVBQUc7SUFBQSxJQUFBb1YsT0FBQTtJQUFBLE9BQUFoYixpQkFBQTtNQUN6QixJQUFJO1FBQ0YwYSxHQUFHO1FBQ0hqTCxLQUFLO1FBQ0xDLE1BQU07UUFDTkMsY0FBYztRQUNkb0ksUUFBUTtRQUNSa0QsU0FBUztRQUNUQyxZQUFZO1FBQ1psRCxXQUFXO1FBQ1htRCxvQkFBb0I7UUFDcEJDLFlBQVk7UUFDWi9WLEtBQUs7UUFDTEUsUUFBUTtRQUNSRSxRQUFRO1FBQ1I0VixhQUFhO1FBQ2JDLFNBQVM7UUFDVHJELGFBQWE7UUFDYlksYUFBYTtRQUNiMEMsU0FBUztRQUNUekMsWUFBWTtRQUNaMEMsWUFBWTtRQUNaQyxRQUFRO1FBQ1IzYSxnQkFBZ0I7UUFDaEI0YTtNQUNGLENBQUMsR0FBRzloQixRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IsSUFBSSxDQUFDMlosR0FBRyxFQUFFLE1BQU0sSUFBSTlYLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztNQUN6RCxJQUFJcVksU0FBUyxFQUFFQSxTQUFTLENBQUNVLE1BQU0sRUFBRTtNQUNqQyxJQUFJVCxZQUFZLEVBQUVBLFlBQVksQ0FBQ1MsTUFBTSxFQUFFO01BQ3ZDLElBQUlsTSxLQUFLLEVBQUVBLEtBQUssQ0FBQ2tNLE1BQU0sRUFBRTtNQUN6QixJQUFJak0sTUFBTSxFQUFFQSxNQUFNLENBQUNpTSxNQUFNLEVBQUU7TUFDM0IsSUFBSWhNLGNBQWMsRUFBRUEsY0FBYyxDQUFDZ00sTUFBTSxFQUFFO01BQzNDLElBQUk1RCxRQUFRLEVBQUVBLFFBQVEsQ0FBQzRELE1BQU0sRUFBRTtNQUMvQixJQUFJM0QsV0FBVyxFQUFFQSxXQUFXLENBQUMyRCxNQUFNLEVBQUU7TUFDckMsSUFBSVIsb0JBQW9CLEVBQUVBLG9CQUFvQixDQUFDUSxNQUFNLEVBQUU7TUFDdkQsSUFBSVAsWUFBWSxFQUFFQSxZQUFZLENBQUNPLE1BQU0sRUFBRTtNQUN2QztNQUNBLElBQUl0VyxLQUFLLElBQUksQ0FBQzJWLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQ2hFLFFBQVEsRUFBRXFlLE9BQUksQ0FBQ0gsZUFBZSxDQUFDeFYsS0FBSyxDQUFDO01BQ2xFLElBQUlFLFFBQVEsSUFBSSxDQUFDeVYsT0FBSSxDQUFDcmEsU0FBUyxDQUFDOUQsV0FBVyxFQUFFbWUsT0FBSSxDQUFDSCxlQUFlLENBQUN0VixRQUFRLENBQUM7TUFDM0UsSUFBSUUsUUFBUSxJQUFJLENBQUN1VixPQUFJLENBQUNyYSxTQUFTLENBQUM1RCxXQUFXLEVBQUVpZSxPQUFJLENBQUNILGVBQWUsQ0FBQ3BWLFFBQVEsQ0FBQztNQUMzRSxJQUFJNFYsYUFBYSxFQUFFQSxhQUFhLENBQUNNLE1BQU0sRUFBRTtNQUN6QztNQUNBLElBQUlMLFNBQVMsSUFBSSxDQUFDTixPQUFJLENBQUNyYSxTQUFTLENBQUN6RCxZQUFZLEVBQUU4ZCxPQUFJLENBQUNILGVBQWUsQ0FBQ1MsU0FBUyxDQUFDO01BQzlFLElBQUl6QyxhQUFhLEVBQUVBLGFBQWEsQ0FBQzhDLE1BQU0sRUFBRTtNQUN6QztNQUNBLElBQUlKLFNBQVMsSUFBSSxDQUFDUCxPQUFJLENBQUNyYSxTQUFTLENBQUMxRCxZQUFZLEVBQUUrZCxPQUFJLENBQUNILGVBQWUsQ0FBQ1UsU0FBUyxDQUFDO01BQzlFLElBQUlDLFlBQVksRUFBRUEsWUFBWSxDQUFDRyxNQUFNLEVBQUU7TUFDdkM7TUFDQSxJQUFJRixRQUFRLElBQUksQ0FBQ1QsT0FBSSxDQUFDcmEsU0FBUyxDQUFDbkMsMkJBQTJCLEVBQUV3YyxPQUFJLENBQUNILGVBQWUsQ0FBQ1ksUUFBUSxDQUFDO01BQzNGLElBQUkzYSxnQkFBZ0IsRUFBRUEsZ0JBQWdCLENBQUM2YSxNQUFNLEVBQUU7TUFDL0MsSUFBTXhjLGNBQWMsR0FBRzZiLE9BQUksQ0FBQzdMLG1CQUFtQixFQUFFO01BQ2pENkwsT0FBSSxDQUFDdkssa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUNuRSxRQUFRLENBQUNuTixjQUFjLENBQUM7TUFDNUQsSUFBSXljLFFBQVEsR0FBRztRQUNidmUsS0FBSyxFQUFFLE1BQU07UUFDYmlWLE1BQU0sRUFBRTtNQUNWLENBQUM7TUFDRDBJLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQzRGLEdBQUcsRUFBRWtCLFFBQVEsQ0FBQztNQUM5QixJQUFNQyxTQUFTLEdBQUc7UUFDaEJ4SixRQUFRLEVBQUUsVUFBVTtRQUNwQnJSLE9BQU8sRUFBRSxNQUFNO1FBQ2Y7UUFDQSxhQUFhLEVBQUUsUUFBUTtRQUN2QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCM0QsS0FBSyxFQUFFLE1BQU07UUFDYmlWLE1BQU0sRUFBRSxNQUFNO1FBQ2R3SixNQUFNLEVBQUUsUUFBUTtRQUNoQkMsUUFBUSxFQUFFO01BQ1osQ0FBQztNQUNEZCxTQUFTLEdBQUdoSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDekMrSSxTQUFTLENBQUM5SixZQUFZLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQztNQUNwRCxJQUFJOEosU0FBUyxFQUFFO1FBQ2IsT0FBT0EsU0FBUyxDQUFDZSxVQUFVLEVBQUU7VUFDM0JmLFNBQVMsQ0FBQ2dCLFdBQVcsQ0FBQ2hCLFNBQVMsQ0FBQ2lCLFNBQVMsQ0FBQztRQUM1QztRQUNBbEIsT0FBSSxDQUFDbEcsVUFBVSxDQUFDbUcsU0FBUyxFQUFFWSxTQUFTLENBQUM7TUFDdkM7TUFDQW5CLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ2xCLFNBQVMsQ0FBQztNQUMxQmpELFdBQVcsR0FBRy9GLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMzQzhGLFdBQVcsQ0FBQzdHLFlBQVksQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDO01BQ3hENkcsV0FBVyxDQUFDN0csWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7TUFDeEM2RyxXQUFXLENBQUM3RyxZQUFZLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDO01BQy9ENkosT0FBSSxDQUFDbEcsVUFBVSxDQUFDa0QsV0FBVyxFQUFFNkQsU0FBUyxDQUFDO01BQ3ZDLElBQUlPLFVBQVUsR0FBR3BCLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQ3ZDLGNBQWMsQ0FBQ0UsVUFBVSxHQUFHLElBQUk7TUFDaEUsSUFBSSxDQUFDLENBQUMwYyxPQUFJLENBQUNyYSxTQUFTLENBQUMzRSxhQUFhLEVBQUU7UUFDbENvZ0IsVUFBVSxHQUFHcEIsT0FBSSxDQUFDcmEsU0FBUyxDQUFDdkMsY0FBYyxDQUFDQyxVQUFVLEdBQUcsSUFBSTtNQUM5RDtNQUNBMlosV0FBVyxDQUFDOEMsU0FBUyxHQUFHLEVBQUUsR0FBRywyR0FBMkcsR0FBRyw2QkFBNkIsR0FBRywrREFBK0QsR0FBRyxrREFBa0QsR0FBRyxxQ0FBcUMsR0FBRyx3Q0FBd0MsR0FBRyxpQ0FBaUMsR0FBRywrQkFBK0IsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLEdBQUcsK0JBQStCLEdBQUcsb0RBQW9ELEdBQUcsa0JBQWtCLEdBQUdzQixVQUFVLEdBQUcsb0NBQW9DLEdBQUcsVUFBVTtNQUNsc0IxQixHQUFHLENBQUN5QixXQUFXLENBQUNuRSxXQUFXLENBQUM7TUFDNUJ2SSxLQUFLLEdBQUd3QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUM7TUFDdkN6QyxLQUFLLENBQUMwQixZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUM1QzFCLEtBQUssQ0FBQzBCLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO01BQ3RDMUIsS0FBSyxDQUFDMEIsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7TUFDbkMxQixLQUFLLENBQUMwQixZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQztNQUN6QyxJQUFJa0wsVUFBVSxHQUFHO1FBQ2ZoSyxRQUFRLEVBQUUsVUFBVTtRQUNwQmhWLEtBQUssRUFBRTtNQUNULENBQUM7TUFDRCxJQUFNaWYsU0FBUyxHQUFHLFNBQVMsR0FBR25kLGNBQWMsR0FBRyxNQUFNO01BQ3JELElBQU1vZCxTQUFTLEdBQUcsaUJBQWlCO01BQ25DLElBQU1DLGtCQUFrQixHQUFHRCxTQUFTLEdBQUcsR0FBRyxHQUFHRCxTQUFTO01BQ3RELElBQUl0QixPQUFJLENBQUN2SyxrQkFBa0IsRUFBRTtRQUMzQixJQUFJdUssT0FBSSxDQUFDNUwsZUFBZSxFQUFFLEVBQUU7VUFDMUJpTixVQUFVLEdBQUFwYSxhQUFBLENBQUFBLGFBQUEsS0FDTG9hLFVBQVU7WUFDYixtQkFBbUIsRUFBRUcsa0JBQWtCO1lBQ3ZDLGdCQUFnQixFQUFFQSxrQkFBa0I7WUFDcEMsY0FBYyxFQUFFQSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFQSxrQkFBa0I7WUFDbkNDLFNBQVMsRUFBRUQ7VUFBa0IsRUFDOUI7UUFDSCxDQUFDLE1BQU07VUFDTEgsVUFBVSxHQUFBcGEsYUFBQSxDQUFBQSxhQUFBLEtBQ0xvYSxVQUFVO1lBQ2IsbUJBQW1CLEVBQUVDLFNBQVM7WUFDOUIsZ0JBQWdCLEVBQUVBLFNBQVM7WUFDM0IsY0FBYyxFQUFFQSxTQUFTO1lBQ3pCLGVBQWUsRUFBRUEsU0FBUztZQUMxQkcsU0FBUyxFQUFFSDtVQUFTLEVBQ3JCO1FBQ0g7TUFDRixDQUFDLE1BQU07UUFDTCxJQUFJdEIsT0FBSSxDQUFDNUwsZUFBZSxFQUFFLEVBQUU7VUFDMUJpTixVQUFVLEdBQUFwYSxhQUFBLENBQUFBLGFBQUEsS0FDTG9hLFVBQVU7WUFDYixtQkFBbUIsRUFBRUUsU0FBUztZQUM5QixnQkFBZ0IsRUFBRUEsU0FBUztZQUMzQixjQUFjLEVBQUVBLFNBQVM7WUFDekIsZUFBZSxFQUFFQSxTQUFTO1lBQzFCRSxTQUFTLEVBQUVGO1VBQVMsRUFDckI7UUFDSDtNQUNGO01BQ0F2QixPQUFJLENBQUNsRyxVQUFVLENBQUNyRixLQUFLLEVBQUU0TSxVQUFVLENBQUM7TUFDbENwQixTQUFTLENBQUNrQixXQUFXLENBQUMxTSxLQUFLLENBQUM7TUFDNUJ5TCxZQUFZLEdBQUdqSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDNUNnSixZQUFZLENBQUMvSixZQUFZLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQztNQUMxRDZKLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ29HLFlBQVksRUFBRVcsU0FBUyxDQUFDO01BQ3hDbkIsR0FBRyxDQUFDeUIsV0FBVyxDQUFDakIsWUFBWSxDQUFDO01BQzdCbkQsUUFBUSxHQUFHOUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3hDNkYsUUFBUSxDQUFDNUcsWUFBWSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7TUFDbEQ0RyxRQUFRLENBQUM1RyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztNQUNyQzRHLFFBQVEsQ0FBQzVHLFlBQVksQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUM7TUFDNUQ2SixPQUFJLENBQUNsRyxVQUFVLENBQUNpRCxRQUFRLEVBQUU7UUFDeEIxYSxLQUFLLEVBQUUsTUFBTTtRQUNieWUsTUFBTSxFQUFFLFFBQVE7UUFDaEJ6SixRQUFRLEVBQUU7TUFDWixDQUFDLENBQUM7TUFDRjZJLFlBQVksQ0FBQ2lCLFdBQVcsQ0FBQ3BFLFFBQVEsQ0FBQztNQUNsQ3JJLE1BQU0sR0FBR3VDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUN6Q3hDLE1BQU0sQ0FBQ3lCLFlBQVksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDO01BQzlDLElBQU11TCxXQUFXLEdBQUc7UUFDbEIxYixPQUFPLEVBQUVnYSxPQUFJLENBQUNyYSxTQUFTLENBQUMxRSxpQkFBaUIsR0FBRytlLE9BQUksQ0FBQ3ZLLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsTUFBTTtRQUNqR3BULEtBQUssRUFBRSxLQUFLO1FBQ1pnVixRQUFRLEVBQUUsVUFBVTtRQUNwQnNLLElBQUksRUFBRSxLQUFLO1FBQ1hDLEdBQUcsRUFBRSxNQUFNO1FBQ1hDLE1BQU0sRUFBRTtNQUNWLENBQUM7TUFDRDdCLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ3BGLE1BQU0sRUFBRWdOLFdBQVcsQ0FBQztNQUNwQ2hDLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ3pNLE1BQU0sQ0FBQztNQUN2QkMsY0FBYyxHQUFHc0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO01BQ2pEdkMsY0FBYyxDQUFDd0IsWUFBWSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztNQUM5RDZKLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ25GLGNBQWMsRUFBRTtRQUM5QjNPLE9BQU8sRUFBRWdhLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQzFFLGlCQUFpQixHQUFHK2UsT0FBSSxDQUFDdkssa0JBQWtCLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxNQUFNO1FBQ2pHNkIsTUFBTSxFQUFFLEtBQUs7UUFDYkQsUUFBUSxFQUFFLFVBQVU7UUFDcEJ5SyxLQUFLLEVBQUUsS0FBSztRQUNaRixHQUFHLEVBQUUsTUFBTTtRQUNYQyxNQUFNLEVBQUU7TUFDVixDQUFDLENBQUM7TUFDRm5DLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ3hNLGNBQWMsQ0FBQztNQUMvQndMLG9CQUFvQixHQUFHbEosUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3BEaUosb0JBQW9CLENBQUNoSyxZQUFZLENBQUMsZUFBZSxFQUFFLHNCQUFzQixDQUFDO01BQzFFNkosT0FBSSxDQUFDbEcsVUFBVSxDQUFDcUcsb0JBQW9CLEVBQUU7UUFDcEM5SSxRQUFRLEVBQUUsVUFBVTtRQUNwQjBLLE1BQU0sRUFBRSxJQUFJO1FBQ1pELEtBQUssRUFBRTtNQUNULENBQUMsQ0FBQztNQUNGM0Isb0JBQW9CLENBQUNMLFNBQVMsR0FBRyxFQUFFLEdBQUcsc1BBQXNQLEdBQUcsc0RBQXNELEdBQUcsbUxBQW1MLEdBQUcsME5BQTBOLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLDZPQUE2TyxHQUFHLGdQQUFnUCxHQUFHLGFBQWEsR0FBRyxzREFBc0QsR0FBRywrUEFBK1AsR0FBRyxrUUFBa1EsR0FBRyxhQUFhLEdBQUcsc0RBQXNELEdBQUcsK1BBQStQLEdBQUcsa1FBQWtRLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLCtQQUErUCxHQUFHLGtRQUFrUSxHQUFHLGFBQWEsR0FBRyxRQUFRO01BQy9oR0osR0FBRyxDQUFDeUIsV0FBVyxDQUFDaEIsb0JBQW9CLENBQUM7TUFDckNDLFlBQVksR0FBR25KLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM1Q2tKLFlBQVksQ0FBQ2pLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO01BQzFELElBQU02TCxpQkFBaUIsR0FBQS9hLGFBQUEsQ0FBQUEsYUFBQSxLQUNsQjRaLFNBQVM7UUFDWixnQkFBZ0IsRUFBRTtNQUFRLEVBQzNCO01BQ0RiLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ3NHLFlBQVksRUFBRTRCLGlCQUFpQixDQUFDO01BQ2hEdEMsR0FBRyxDQUFDeUIsV0FBVyxDQUFDZixZQUFZLENBQUM7O01BRTdCO01BQ0E7TUFDQSxJQUFJLENBQUMvVixLQUFLLEVBQUU7UUFDVkEsS0FBSyxHQUFHNE0sUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3JDN00sS0FBSyxDQUFDOEwsWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7TUFDOUM7TUFDQWlLLFlBQVksQ0FBQ2UsV0FBVyxDQUFDOVcsS0FBSyxDQUFDO01BQy9CLElBQUksQ0FBQ0UsUUFBUSxFQUFFO1FBQ2JBLFFBQVEsR0FBRzBNLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN4QzNNLFFBQVEsQ0FBQzRMLFlBQVksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO01BQ3BEO01BQ0FpSyxZQUFZLENBQUNlLFdBQVcsQ0FBQzVXLFFBQVEsQ0FBQztNQUNsQyxJQUFJLENBQUNFLFFBQVEsRUFBRTtRQUNiQSxRQUFRLEdBQUd3TSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDeEN6TSxRQUFRLENBQUMwTCxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztNQUNwRDtNQUNBaUssWUFBWSxDQUFDZSxXQUFXLENBQUMxVyxRQUFRLENBQUM7TUFDbEM0VixhQUFhLEdBQUdwSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDN0NtSixhQUFhLENBQUNsSyxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztNQUM1RCxJQUFNOEwsa0JBQWtCLEdBQUFoYixhQUFBLENBQUFBLGFBQUEsS0FDbkI0WixTQUFTO1FBQ1osZ0JBQWdCLEVBQUU7TUFBUSxFQUMzQjtNQUNEYixPQUFJLENBQUNsRyxVQUFVLENBQUN1RyxhQUFhLEVBQUU0QixrQkFBa0IsQ0FBQztNQUNsRHZDLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ2QsYUFBYSxDQUFDO01BQzlCLElBQUlMLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQ3pELFlBQVksRUFBRTtRQUMvQixJQUFJOGQsT0FBSSxDQUFDOVcsc0JBQXNCLElBQUk4VyxPQUFJLENBQUNyYSxTQUFTLENBQUNqQyxrQkFBa0IsRUFBRTtVQUNwRSxJQUFJLENBQUM0YyxTQUFTLEVBQUU7WUFDZEEsU0FBUyxHQUFHckosUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQ3pDb0osU0FBUyxDQUFDbkssWUFBWSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUM7WUFDcEQ2SixPQUFJLENBQUNsRyxVQUFVLENBQUN3RyxTQUFTLEVBQUU7Y0FDekJ0YSxPQUFPLEVBQUUsTUFBTTtjQUNma2MsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDO1VBQ0o7VUFDQSxJQUFJLENBQUNqRixhQUFhLEVBQUU7WUFDbEJBLGFBQWEsR0FBR2hHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUM3QytGLGFBQWEsQ0FBQzlHLFlBQVksQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO1lBQzVELElBQUlnTSxtQkFBbUIsS0FBSztZQUM1QkEsbUJBQW1CLHFHQUFxRztZQUN4SEEsbUJBQW1CLDRHQUE0RztZQUMvSEEsbUJBQW1CLFlBQVk7WUFDL0JsRixhQUFhLENBQUM2QyxTQUFTLEdBQUdxQyxtQkFBbUI7WUFDN0M3QixTQUFTLENBQUNhLFdBQVcsQ0FBQ2xFLGFBQWEsQ0FBQztVQUN0QztVQUNBb0QsYUFBYSxDQUFDYyxXQUFXLENBQUNiLFNBQVMsQ0FBQztVQUNwQyxJQUFNOVQsTUFBTSxHQUFHd1QsT0FBSTtVQUNuQixJQUFNb0Msc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBQSxFQUFlO1lBQ3pDLElBQUk1VixNQUFNLENBQUN0RCxzQkFBc0IsRUFBRTtjQUNqQ3RLLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDa1gsYUFBYSxDQUFDOUcsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7Y0FDMUUzSixNQUFNLENBQUNzTixVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQ2tYLGFBQWEsRUFBRTtnQkFDekRqWCxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUM7WUFDSixDQUFDLE1BQU07Y0FDTHBILFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDa1gsYUFBYSxDQUFDOUcsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7Y0FDMUUzSixNQUFNLENBQUNzTixVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBPLEtBQUssRUFBRTtnQkFDakR6TyxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUM7Y0FDRndHLE1BQU0sQ0FBQ3NOLFVBQVUsQ0FBQ2xiLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDa1gsYUFBYSxFQUFFO2dCQUN6RGpYLE9BQU8sRUFBRTtjQUNYLENBQUMsQ0FBQztZQUNKO1VBQ0YsQ0FBQztVQUNEaVgsYUFBYSxDQUFDL1AsZ0JBQWdCLENBQUMsT0FBTyxFQUFFa1Ysc0JBQXNCLENBQUM7UUFDakU7TUFDRjtNQUNBLElBQUlwQyxPQUFJLENBQUNyYSxTQUFTLENBQUMxRCxZQUFZLEVBQUU7UUFDL0I0YixhQUFhLEdBQUc1RyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDN0MyRyxhQUFhLENBQUMxSCxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztRQUM1RCxJQUFNa00sa0JBQWtCLEdBQUFwYixhQUFBLENBQUFBLGFBQUEsS0FDbkI0WixTQUFTO1VBQ1osZ0JBQWdCLEVBQUUsUUFBUTtVQUMxQjdhLE9BQU8sRUFBRSxNQUFNO1VBQ2Ysa0JBQWtCLEVBQUU7UUFBVyxFQUNoQztRQUNEZ2EsT0FBSSxDQUFDbEcsVUFBVSxDQUFDK0QsYUFBYSxFQUFFd0Usa0JBQWtCLENBQUM7UUFDbEQzQyxHQUFHLENBQUN5QixXQUFXLENBQUN0RCxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDMEMsU0FBUyxFQUFFO1VBQ2RBLFNBQVMsR0FBR3RKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUN6Q3FKLFNBQVMsQ0FBQ3BLLFlBQVksQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDO1FBQ3REO1FBQ0E2SixPQUFJLENBQUNsRyxVQUFVLENBQUN5RyxTQUFTLEVBQUF0WixhQUFBLENBQUFBLGFBQUEsS0FDcEI0WixTQUFTO1VBQ1osZ0JBQWdCLEVBQUUsUUFBUTtVQUMxQnhlLEtBQUssRUFBRSxFQUFFO1VBQ1RpVixNQUFNLEVBQUUsRUFBRTtVQUNWLFdBQVcsRUFBRSxLQUFLO1VBQ2xCLFlBQVksRUFBRTtRQUFLLEdBQ25CO1FBQ0Z1RyxhQUFhLENBQUNzRCxXQUFXLENBQUNaLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUN6QyxZQUFZLEVBQUU7VUFDakJBLFlBQVksR0FBRzdHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUM1QzRHLFlBQVksQ0FBQzNILFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1VBQzFEb0ssU0FBUyxDQUFDWSxXQUFXLENBQUNyRCxZQUFZLENBQUM7UUFDckM7TUFDRjtNQUNBLElBQUlrQyxPQUFJLENBQUNyYSxTQUFTLENBQUNuQywyQkFBMkIsRUFBRTtRQUM5Q2dkLFlBQVksR0FBR3ZKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q3NKLFlBQVksQ0FBQ3JLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1FBQzFELElBQU1tTSxpQkFBaUIsR0FBQXJiLGFBQUEsQ0FBQUEsYUFBQSxLQUNsQjRaLFNBQVM7VUFDWixhQUFhLEVBQUUsRUFBRTtVQUNqQixpQkFBaUIsRUFBRSxFQUFFO1VBQ3JCeGUsS0FBSyxFQUFFLEVBQUU7VUFDVDBlLFFBQVEsRUFBRSxFQUFFO1VBQ1osZ0JBQWdCLEVBQUU7UUFBZ0IsRUFDbkM7UUFDRGYsT0FBSSxDQUFDbEcsVUFBVSxDQUFDMEcsWUFBWSxFQUFFOEIsaUJBQWlCLENBQUM7UUFDaEQ1QyxHQUFHLENBQUN5QixXQUFXLENBQUNYLFlBQVksQ0FBQztRQUM3QixJQUFJLENBQUNDLFFBQVEsRUFBRTtVQUNiQSxRQUFRLEdBQUd4SixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7VUFDeEN1SixRQUFRLENBQUN0SyxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztVQUNsRCxJQUFJb00sVUFBVSxLQUFLO1VBQ25CQSxVQUFVLHdFQUF3RTtVQUNsRkEsVUFBVSx1RUFBdUU7VUFDakZBLFVBQVUsOEJBQThCO1VBQ3hDQSxVQUFVLDRFQUE0RTtVQUN0RkEsVUFBVSw0Q0FBNEM7VUFDdERBLFVBQVUsZ0JBQWdCO1VBQzFCQSxVQUFVLDJFQUEyRTtVQUNyRkEsVUFBVSxZQUFZO1VBQ3RCOUIsUUFBUSxDQUFDWCxTQUFTLEdBQUd5QyxVQUFVO1FBQ2pDO1FBQ0F2QyxPQUFJLENBQUNsRyxVQUFVLENBQUMyRyxRQUFRLEVBQUU7VUFDeEJNLFFBQVEsRUFBRTtRQUNaLENBQUMsQ0FBQztRQUNGUCxZQUFZLENBQUNXLFdBQVcsQ0FBQ1YsUUFBUSxDQUFDO1FBQ2xDLElBQU0rQixjQUFjLEdBQUcvQixRQUFRLENBQUNnQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBTWpXLE9BQU0sR0FBR3dULE9BQUk7UUFDbkIsSUFBTTBDLGlCQUFpQjtVQUFBLElBQUFDLE1BQUEsR0FBQTNkLGlCQUFBLENBQUcsV0FBZ0I0ZCxLQUFLLEVBQUU7WUFDL0NwVyxPQUFNLENBQUN0RCxzQkFBc0IsR0FBRzBaLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxPQUFPO1lBQ3BELE1BQU10VyxPQUFNLENBQUNoQixVQUFVLENBQUNnQixPQUFNLENBQUMzRyxTQUFTLEVBQUUyRyxPQUFNLENBQUN2QyxXQUFXLEVBQUV1QyxPQUFNLENBQUN0QyxXQUFXLEVBQUVzQyxPQUFNLENBQUNyQyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7VUFDdEgsQ0FBQztVQUFBLGdCQUhLdVksaUJBQWlCQSxDQUFBSyxHQUFBO1lBQUEsT0FBQUosTUFBQSxDQUFBalYsS0FBQSxPQUFBaEUsU0FBQTtVQUFBO1FBQUEsR0FHdEI7UUFDRDhZLGNBQWMsQ0FBQ3RWLGdCQUFnQixDQUFDLE9BQU8sRUFBRXdWLGlCQUFpQixFQUFFO1VBQzFETSxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7TUFDSjtNQUNBbGQsZ0JBQWdCLEdBQUdtUixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDaERwUixnQkFBZ0IsQ0FBQ3FRLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUM7TUFDbEUsSUFBTThNLHFCQUFxQixHQUFBaGMsYUFBQSxDQUFBQSxhQUFBLEtBQ3RCNFosU0FBUztRQUNaLGdCQUFnQixFQUFFLFFBQVE7UUFDMUI3YSxPQUFPLEVBQUUsTUFBTTtRQUNmLGtCQUFrQixFQUFFO01BQVcsRUFDaEM7TUFDRGdhLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ2hVLGdCQUFnQixFQUFFbWQscUJBQXFCLENBQUM7TUFDeER2RCxHQUFHLENBQUN5QixXQUFXLENBQUNyYixnQkFBZ0IsQ0FBQztNQUNqQyxJQUFJLENBQUM0YSxZQUFZLEVBQUU7UUFDakJBLFlBQVksR0FBR3pKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q3dKLFlBQVksQ0FBQ3ZLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1FBQzFEdUssWUFBWSxDQUFDdkssWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7UUFDL0N1SyxZQUFZLENBQUNaLFNBQVMsR0FBRyxFQUFFLEdBQUcsd09BQXdPLEdBQUcsc0RBQXNELEdBQUcsbUxBQW1MLEdBQUcsME5BQTBOLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLDZPQUE2TyxHQUFHLGdQQUFnUCxHQUFHLGFBQWEsR0FBRyxzREFBc0QsR0FBRywrUEFBK1AsR0FBRyxrUUFBa1EsR0FBRyxhQUFhLEdBQUcsc0RBQXNELEdBQUcsK1BBQStQLEdBQUcsa1FBQWtRLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLCtQQUErUCxHQUFHLGtRQUFrUSxHQUFHLGFBQWEsR0FBRyxRQUFRO1FBQ3pnRyxJQUFJRSxPQUFJLENBQUNyYSxTQUFTLENBQUN4RCxtQkFBbUIsS0FBSyxFQUFFLElBQUk2ZCxPQUFJLENBQUNyYSxTQUFTLENBQUN4RCxtQkFBbUIsRUFBRTtVQUNuRnVlLFlBQVksQ0FBQ1osU0FBUyxJQUFJRSxPQUFJLENBQUNyYSxTQUFTLENBQUN4RCxtQkFBbUI7UUFDOUQ7TUFDRjtNQUNBNmQsT0FBSSxDQUFDbEcsVUFBVSxDQUFDNEcsWUFBWSxFQUFBelosYUFBQSxDQUFBQSxhQUFBLEtBQ3ZCNFosU0FBUztRQUNaLGdCQUFnQixFQUFFO01BQVEsR0FDMUI7TUFDRi9hLGdCQUFnQixDQUFDcWIsV0FBVyxDQUFDVCxZQUFZLENBQUM7O01BRTFDO01BQ0EsTUFBTVYsT0FBSSxDQUFDa0QsV0FBVyxFQUFFOztNQUV4QjtNQUNBbEQsT0FBSSxDQUFDbEcsVUFBVSxDQUFDNEYsR0FBRyxFQUFFO1FBQ25CMVosT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO01BQ0ZnYSxPQUFJLENBQUNtRCxLQUFLLEdBQUd6RCxHQUFHO01BQ2hCTSxPQUFJLENBQUNvRCxRQUFRLEdBQUcxTyxNQUFNO01BQ3RCc0wsT0FBSSxDQUFDcUQsZ0JBQWdCLEdBQUcxTyxjQUFjO01BQ3RDcUwsT0FBSSxDQUFDc0QsT0FBTyxHQUFHN08sS0FBSztNQUNwQnVMLE9BQUksQ0FBQ3VELFdBQVcsR0FBR3RELFNBQVM7TUFDNUJELE9BQUksQ0FBQ3dELFVBQVUsR0FBR3pHLFFBQVE7TUFDMUJpRCxPQUFJLENBQUN5RCxjQUFjLEdBQUd2RCxZQUFZO01BQ2xDRixPQUFJLENBQUMwRCxhQUFhLEdBQUcxRyxXQUFXO01BQ2hDZ0QsT0FBSSxDQUFDMkQsc0JBQXNCLEdBQUd4RCxvQkFBb0I7TUFDbERILE9BQUksQ0FBQzRELGNBQWMsR0FBR3hELFlBQVk7TUFDbENKLE9BQUksQ0FBQzVWLE9BQU8sR0FBR0MsS0FBSztNQUNwQjJWLE9BQUksQ0FBQzFWLFVBQVUsR0FBR0MsUUFBUTtNQUMxQnlWLE9BQUksQ0FBQ3hWLFVBQVUsR0FBR0MsUUFBUTtNQUMxQnVWLE9BQUksQ0FBQzZELGVBQWUsR0FBR3hELGFBQWE7TUFDcENMLE9BQUksQ0FBQzhELFdBQVcsR0FBR3hELFNBQVM7TUFDNUJOLE9BQUksQ0FBQytELGVBQWUsR0FBRzlHLGFBQWE7TUFDcEMrQyxPQUFJLENBQUNnRSxlQUFlLEdBQUduRyxhQUFhO01BQ3BDbUMsT0FBSSxDQUFDaUUsV0FBVyxHQUFHMUQsU0FBUztNQUM1QlAsT0FBSSxDQUFDa0UsY0FBYyxHQUFHcEcsWUFBWTtNQUNsQ2tDLE9BQUksQ0FBQ21FLGNBQWMsR0FBRzNELFlBQVk7TUFDbENSLE9BQUksQ0FBQ29FLFVBQVUsR0FBRzNELFFBQVE7TUFDMUIsT0FBTztRQUNMZixHQUFHO1FBQ0hoTCxNQUFNO1FBQ05DLGNBQWM7UUFDZEYsS0FBSztRQUNMd0wsU0FBUztRQUNUbEQsUUFBUTtRQUNSbUQsWUFBWTtRQUNabEQsV0FBVztRQUNYbUQsb0JBQW9CO1FBQ3BCQyxZQUFZO1FBQ1ovVixLQUFLO1FBQ0xFLFFBQVE7UUFDUkUsUUFBUTtRQUNSNFYsYUFBYTtRQUNiQyxTQUFTO1FBQ1RyRCxhQUFhO1FBQ2JZLGFBQWE7UUFDYjBDLFNBQVM7UUFDVHpDLFlBQVk7UUFDWjBDLFlBQVk7UUFDWkM7TUFDRixDQUFDO0lBQUM7RUFDSjtFQUNBNUcsbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsSUFBSSxDQUFDQyxVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBPLEtBQUssRUFBRTtNQUMvQ3pPLE9BQU8sRUFBRTtJQUNYLENBQUMsQ0FBQztJQUNGLElBQU07TUFDSmlYO0lBQ0YsQ0FBQyxHQUFHcmUsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCLElBQUlrWCxhQUFhLEVBQUU7TUFDakJBLGFBQWEsQ0FBQzlHLFlBQVksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO01BQ2pELElBQUksQ0FBQzJELFVBQVUsQ0FBQ21ELGFBQWEsRUFBRTtRQUM3QmpYLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztJQUNKO0VBQ0Y7RUFDQXFlLHdCQUF3QkEsQ0FBQSxFQUFHO0lBQ3pCLElBQU07TUFDSnBIO0lBQ0YsQ0FBQyxHQUFHcmUsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCLE9BQU9rWCxhQUFhLEdBQUdBLGFBQWEsQ0FBQ3FILFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxNQUFNLEdBQUcsS0FBSztFQUNwRjtFQUNNN0ksWUFBWUEsQ0FBQ0QsVUFBVSxFQUFFO0lBQUEsSUFBQStJLE9BQUE7SUFBQSxPQUFBdmYsaUJBQUE7TUFDN0I7TUFDQXVmLE9BQUksQ0FBQ2xTLGlCQUFpQixHQUFHLElBQUk7TUFDN0JrUyxPQUFJLENBQUNqUyxrQkFBa0IsR0FBRyxHQUFHO01BQzdCaVMsT0FBSSxDQUFDelQsZ0JBQWdCLEdBQUcsS0FBSztNQUM3QixJQUFNO1FBQ0oyRCxLQUFLO1FBQ0xDLE1BQU07UUFDTkM7TUFDRixDQUFDLEdBQUcvVixRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IsSUFBSXVZLE1BQU0sU0FBU2lHLE9BQUksQ0FBQ3RHLGlCQUFpQixFQUFFO01BQzNDOztNQUVBc0csT0FBSSxDQUFDL0Usa0JBQWtCLEVBQUU7TUFDekIsSUFBSWdGLGVBQWUsRUFBRUMsZ0JBQWdCO01BQ3JDLElBQUlGLE9BQUksQ0FBQzVlLFNBQVMsQ0FBQ3BCLHdCQUF3QixLQUFLLGFBQWEsRUFBRTtRQUM3RDtRQUNBO1FBQ0FpZ0IsZUFBZSxHQUFHO1VBQ2hCRSxLQUFLLEVBQUUsSUFBSTtVQUNYMU8sR0FBRyxFQUFFO1FBQ1AsQ0FBQztRQUNEeU8sZ0JBQWdCLEdBQUc7VUFDakJDLEtBQUssRUFBRSxJQUFJO1VBQ1gxTyxHQUFHLEVBQUU7UUFDUCxDQUFDO01BQ0gsQ0FBQyxNQUFNO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBd08sZUFBZSxHQUFHO1VBQ2hCRSxLQUFLLEVBQUU7UUFDVCxDQUFDO1FBQ0RELGdCQUFnQixHQUFHO1VBQ2pCQyxLQUFLLEVBQUU7UUFDVCxDQUFDO01BQ0g7TUFDQSxJQUFNQyxXQUFXLEdBQUc7UUFDbEJDLEtBQUssRUFBRSxLQUFLO1FBQ1puUSxLQUFLLEVBQUU7VUFDTG9RLElBQUksRUFBRTtZQUNKSCxLQUFLLEVBQUU7VUFDVCxDQUFDO1VBQ0Q3RixVQUFVLEVBQUU7WUFDVjZGLEtBQUssRUFBRUgsT0FBSSxDQUFDekY7VUFDZCxDQUFDO1VBQ0RnRyxTQUFTLEVBQUU7WUFDVEosS0FBSyxFQUFFO1VBQ1QsQ0FBQztVQUNESyxnQkFBZ0IsRUFBRTtZQUNoQkwsS0FBSyxFQUFFO1VBQ1QsQ0FBQztVQUNEdkYsUUFBUSxFQUFFYixNQUFNLENBQUN6VSxNQUFNLEdBQUc7WUFDeEI2YSxLQUFLLEVBQUVwRyxNQUFNLENBQUNBLE1BQU0sQ0FBQ3pVLE1BQU0sR0FBRyxDQUFDO1VBQ2pDLENBQUMsR0FBRyxJQUFJO1VBQ1J4SCxLQUFLLEVBQUVtaUIsZUFBZTtVQUN0QmxOLE1BQU0sRUFBRW1OO1FBQ1Y7TUFDRixDQUFDOztNQUVEO01BQ0E7TUFDQSxJQUFJbkcsTUFBTSxDQUFDelUsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN2QjBhLE9BQUksQ0FBQ2xiLE9BQU8sQ0FBQyxtRUFBbUUsQ0FBQztRQUNqRmtiLE9BQUksQ0FBQ2xiLE9BQU8sa0JBQUFrVyxNQUFBLENBQWtCeUYsSUFBSSxDQUFDQyxTQUFTLENBQUNOLFdBQVcsQ0FBQyxFQUFHO1FBQzVESixPQUFJLENBQUM3SSxRQUFRLFNBQVNoUCxTQUFTLENBQUN5UixZQUFZLENBQUMrRyxZQUFZLENBQUNQLFdBQVcsQ0FBQztRQUN0RUosT0FBSSxDQUFDcEksVUFBVSxFQUFFO1FBQ2pCbUMsTUFBTSxTQUFTaUcsT0FBSSxDQUFDdEcsaUJBQWlCLEVBQUU7UUFDdkMwRyxXQUFXLENBQUNsUSxLQUFLLENBQUMwSyxRQUFRLEdBQUdiLE1BQU0sQ0FBQ3pVLE1BQU0sR0FBRztVQUMzQzZhLEtBQUssRUFBRXBHLE1BQU0sQ0FBQ0EsTUFBTSxDQUFDelUsTUFBTSxHQUFHLENBQUM7UUFDakMsQ0FBQyxHQUFHLElBQUk7TUFDVjs7TUFFQTtNQUNBO01BQ0EsSUFBSXlVLE1BQU0sQ0FBQ3pVLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkIwYSxPQUFJLENBQUNsYixPQUFPLENBQUMsaURBQWlELENBQUM7UUFDL0RzYixXQUFXLENBQUNsUSxLQUFLLENBQUNwUyxLQUFLLEdBQUc7VUFDeEJxaUIsS0FBSyxFQUFFO1FBQ1QsQ0FBQztRQUNEQyxXQUFXLENBQUNsUSxLQUFLLENBQUM2QyxNQUFNLEdBQUc7VUFDekJvTixLQUFLLEVBQUU7UUFDVCxDQUFDO01BQ0g7TUFDQSxJQUFJO1FBQ0Y7UUFDQTs7UUFFQSxJQUFNUyxNQUFNLFNBQVN6WSxTQUFTLENBQUN5UixZQUFZLENBQUMrRyxZQUFZLENBQUNQLFdBQVcsQ0FBQztRQUNyRUosT0FBSSxDQUFDbGIsT0FBTyxrQkFBQWtXLE1BQUEsQ0FBa0J5RixJQUFJLENBQUNDLFNBQVMsQ0FBQ04sV0FBVyxDQUFDLEVBQUc7UUFDNUQ7UUFDQSxJQUFNUyxjQUFjLEdBQUdELE1BQU0sQ0FBQ0UsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRTtRQUMvRDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQWYsT0FBSSxDQUFDbGIsT0FBTyw2QkFBQWtXLE1BQUEsQ0FBNkI2RixjQUFjLENBQUMvaUIsS0FBSyxTQUFBa2QsTUFBQSxDQUFNNkYsY0FBYyxDQUFDOU4sTUFBTSxFQUFHO1FBQzNGaU4sT0FBSSxDQUFDbGIsT0FBTyxDQUFDLDJCQUEyQixHQUFHK2IsY0FBYyxDQUFDL2lCLEtBQUssR0FBRytpQixjQUFjLENBQUM5TixNQUFNLENBQUM7UUFDeEZpTixPQUFJLENBQUNsYixPQUFPLENBQUMsd0JBQXdCLEdBQUcrYixjQUFjLENBQUNHLFdBQVcsQ0FBQztRQUNuRWhCLE9BQUksQ0FBQ2xiLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRytiLGNBQWMsQ0FBQ3ZHLFVBQVUsQ0FBQztRQUNqRSxDQUFDbkssTUFBTSxDQUFDclMsS0FBSyxFQUFFcVMsTUFBTSxDQUFDNEMsTUFBTSxDQUFDLEdBQUcsQ0FBQ2lOLE9BQUksQ0FBQ2xTLGlCQUFpQixFQUFFa1MsT0FBSSxDQUFDalMsa0JBQWtCLENBQUM7UUFDakYsSUFBSWlTLE9BQUksQ0FBQzlPLGtCQUFrQixFQUFFO1VBQzNCLENBQUNkLGNBQWMsQ0FBQ3RTLEtBQUssRUFBRXNTLGNBQWMsQ0FBQzJDLE1BQU0sQ0FBQyxHQUFHLENBQUNpTixPQUFJLENBQUNqUyxrQkFBa0IsRUFBRWlTLE9BQUksQ0FBQ2xTLGlCQUFpQixDQUFDO1FBQ25HO1FBQ0FvQyxLQUFLLENBQUN4RCxTQUFTLEdBQUdrVSxNQUFNO1FBQ3hCWixPQUFJLENBQUM3SSxRQUFRLEdBQUd5SixNQUFNO01BQ3hCLENBQUMsQ0FBQyxPQUFPbmEsQ0FBQyxFQUFFO1FBQ1YsS0FBSyxDQUFDO1FBQ04sTUFBTUEsQ0FBQztNQUNUO0lBQUM7RUFDSDtFQUNNa1ksV0FBV0EsQ0FBQSxFQUFHO0lBQUEsSUFBQXNDLE9BQUE7SUFBQSxPQUFBeGdCLGlCQUFBO01BQ2xCLEtBQUssQ0FBQztNQUNOLElBQU07UUFDSjBhLEdBQUc7UUFDSDNDLFFBQVE7UUFDUkMsV0FBVztRQUNYM1MsS0FBSztRQUNMRSxRQUFRO1FBQ1JFLFFBQVE7UUFDUjZWO01BQ0YsQ0FBQyxHQUFHMWhCLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtNQUM3QnlmLE9BQUksQ0FBQzFMLFVBQVUsQ0FBQ3dHLFNBQVMsRUFBRTtRQUN6QnRhLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQzs7TUFFRjtNQUNBLElBQU15ZixTQUFTLEdBQUcsR0FBRztNQUNyQixJQUFNQyxVQUFVLEdBQUcsR0FBRztNQUN0QixJQUFNQyxpQkFBaUIsR0FBR0QsVUFBVSxHQUFHRCxTQUFTLENBQUMsQ0FBQzs7TUFFbEQsSUFBSUcsYUFBYSxFQUFFQyxjQUFjO01BQ2pDLElBQUlDLGtCQUFrQixHQUFHcEcsR0FBRyxDQUFDMUssV0FBVztNQUN4QyxJQUFJK1EsbUJBQW1CLEdBQUdyRyxHQUFHLENBQUN4SyxZQUFZO01BQzFDLElBQU1nSSxXQUFXLEdBQUdzSSxPQUFJLENBQUM3ZixTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0MsS0FBSztNQUN6RCxJQUFNK2EsWUFBWSxHQUFHb0ksT0FBSSxDQUFDN2YsU0FBUyxDQUFDdkQsZ0JBQWdCLENBQUNFLE1BQU07TUFDM0QsSUFBTTBqQixvQkFBb0IsR0FBR1IsT0FBSSxDQUFDUyxzQkFBc0I7TUFDeEQsSUFBTUMsa0JBQWtCLEdBQUdWLE9BQUksQ0FBQ1csb0JBQW9CO01BQ3BELElBQUlYLE9BQUksQ0FBQzNjLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDdkM7UUFDQTtRQUNBK2MsYUFBYSxHQUFHRSxrQkFBa0IsR0FBR0Usb0JBQW9CO1FBQ3pESCxjQUFjLEdBQUdELGFBQWEsR0FBR0QsaUJBQWlCO01BQ3BELENBQUMsTUFBTTtRQUNMO1FBQ0E7UUFDQTtRQUNBRSxjQUFjLEdBQUdFLG1CQUFtQixHQUFHRyxrQkFBa0I7UUFDekROLGFBQWEsR0FBR0MsY0FBYyxHQUFHSixTQUFTLEdBQUdDLFVBQVU7TUFDekQ7TUFDQUUsYUFBYSxJQUFJMUksV0FBVyxHQUFHLENBQUM7TUFDaEMySSxjQUFjLElBQUkzSSxXQUFXLEdBQUcsQ0FBQztNQUNqQyxJQUFNa0osb0JBQW9CLEdBQUdSLGFBQWEsR0FBR0osT0FBSSxDQUFDYSxxQkFBcUI7TUFDdkUsSUFBTUMscUJBQXFCLEdBQUdULGNBQWMsR0FBR0wsT0FBSSxDQUFDYSxxQkFBcUI7TUFDekUsSUFBSWhjLEtBQUssRUFBRTtRQUNUbWIsT0FBSSxDQUFDMUwsVUFBVSxDQUFDelAsS0FBSyxFQUFFO1VBQ3JCLGdCQUFnQixFQUFFLE1BQU07VUFDeEJpTixNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBSXVFLFFBQVEsRUFBRTtRQUNaaWIsT0FBSSxDQUFDMUwsVUFBVSxDQUFDdlAsUUFBUSxFQUFFO1VBQ3hCbEksS0FBSyxFQUFFK2pCLG9CQUFvQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJO1VBQ3BENUYsTUFBTSxFQUFFZ1AscUJBQXFCLEdBQUdwSixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7VUFDdERsWCxPQUFPLEVBQUUsTUFBTTtVQUNmLGFBQWEsRUFBRSxRQUFRO1VBQ3ZCLGlCQUFpQixFQUFFLFFBQVE7VUFDM0J1Z0IsT0FBTyxFQUFFO1FBQ1gsQ0FBQyxDQUFDO01BQ0o7TUFDQSxJQUFJOWIsUUFBUSxFQUFFO1FBQ1orYSxPQUFJLENBQUMxTCxVQUFVLENBQUNyUCxRQUFRLEVBQUU7VUFDeEIsYUFBYSxFQUFFLE1BQU07VUFDckI2TSxNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBTXdnQixhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDekJoQixPQUFJLENBQUMxTCxVQUFVLENBQUNpRCxRQUFRLEVBQUU7UUFDeEIxYSxLQUFLLEVBQUUrakIsb0JBQW9CLEdBQUdJLGFBQWEsR0FBRyxJQUFJO1FBQ2xEbFAsTUFBTSxFQUFFZ1AscUJBQXFCLEdBQUdFLGFBQWEsR0FBRyxJQUFJO1FBQ3BEQyxlQUFlLEVBQUU7TUFDbkIsQ0FBQyxDQUFDO01BQ0YsSUFBTUMsWUFBWSxHQUFHMUosV0FBVyxDQUFDTyxhQUFhLENBQUMsZUFBZSxDQUFDO01BQy9ELElBQUlvSixDQUFDLEdBQUd2SixZQUFZLEdBQUdGLFdBQVcsR0FBRyxDQUFDO01BQ3RDeUosQ0FBQyxHQUFHQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBR0EsQ0FBQztNQUNqQixJQUFJLENBQUNyYSxLQUFLLENBQUM4WixvQkFBb0IsQ0FBQyxJQUFJLENBQUM5WixLQUFLLENBQUNnYSxxQkFBcUIsQ0FBQyxJQUFJLENBQUNoYSxLQUFLLENBQUM4USxZQUFZLENBQUMsSUFBSSxDQUFDOVEsS0FBSyxDQUFDNFEsV0FBVyxDQUFDLEVBQUU7UUFDaEgsSUFBTTBKLGlCQUFpQixHQUFHalgsSUFBSSxDQUFDdUcsR0FBRyxDQUFDa1Esb0JBQW9CLEdBQUdsSixXQUFXLEdBQUcsQ0FBQyxHQUFHc0osYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM3RixJQUFNSyxrQkFBa0IsR0FBR2xYLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQ29RLHFCQUFxQixHQUFHcEosV0FBVyxHQUFHLENBQUMsR0FBR3NKLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDL0ZFLFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxPQUFPLEVBQUV5USxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDMURGLFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxRQUFRLEVBQUUwUSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDNURILFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxHQUFHLEVBQUV5USxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9ERixZQUFZLENBQUN2USxZQUFZLENBQUMsR0FBRyxFQUFFMFEsa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRUgsWUFBWSxDQUFDdlEsWUFBWSxDQUFDLElBQUksRUFBRXdRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkNELFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxJQUFJLEVBQUV3USxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQ3pDO0lBQUM7RUFDSDtFQUNNN0ssYUFBYUEsQ0FBQSxFQUFHO0lBQUEsSUFBQWdMLE9BQUE7SUFBQSxPQUFBOWhCLGlCQUFBO01BQ3BCLElBQU0raEIsc0JBQXNCLEdBQUdBLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxLQUFLO1FBQ3ZDLElBQUlILE9BQUksQ0FBQ25oQixTQUFTLENBQUNuQixvQkFBb0IsS0FBSyxrQkFBa0IsRUFBRTtVQUM5RCxPQUFPbUwsSUFBSSxDQUFDcUcsR0FBRyxDQUFDZ1IsQ0FBQyxFQUFFQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxNQUFNLElBQUlILE9BQUksQ0FBQ25oQixTQUFTLENBQUNuQixvQkFBb0IsS0FBSyxhQUFhLEVBQUU7VUFDaEUsT0FBT21MLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQzhRLENBQUMsRUFBRUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsTUFBTTtVQUNMLE9BQU90WCxJQUFJLENBQUNxRyxHQUFHLENBQUNnUixDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekI7TUFDRixDQUFDOztNQUVELEtBQUssQ0FBQztNQUNOLElBQU07UUFDSnZILEdBQUc7UUFDSGpMLEtBQUs7UUFDTHNJLFFBQVE7UUFDUkMsV0FBVztRQUNYM1MsS0FBSztRQUNMRSxRQUFRO1FBQ1JFLFFBQVE7UUFDUjRWLGFBQWE7UUFDYkMsU0FBUztRQUNUckQ7TUFDRixDQUFDLEdBQUdyZSxRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IrZ0IsT0FBSSxDQUFDaE4sVUFBVSxDQUFDd0csU0FBUyxFQUFFO1FBQ3pCdGEsT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO01BQ0YsSUFBTXdQLFdBQVcsR0FBR3NSLE9BQUksQ0FBQ2poQixTQUFTLEtBQUssWUFBWTs7TUFFbkQ7TUFDQSxJQUFNNGYsU0FBUyxHQUFHalEsV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHO01BQ3pDLElBQU1rUSxVQUFVLEdBQUdsUSxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUc7TUFDMUMsSUFBTW1RLGlCQUFpQixHQUFHRCxVQUFVLEdBQUdELFNBQVMsQ0FBQyxDQUFDOztNQUVsRCxJQUFJRyxhQUFhLEVBQUVDLGNBQWM7TUFDakMsSUFBSUMsa0JBQWtCLEdBQUdwRyxHQUFHLENBQUMxSyxXQUFXO01BQ3hDLElBQUkrUSxtQkFBbUIsR0FBR3JHLEdBQUcsQ0FBQ3hLLFlBQVk7TUFDMUMsSUFBSUwsY0FBYyxHQUFHSixLQUFLLENBQUMxRCxVQUFVO01BQ3JDLElBQUkrRCxlQUFlLEdBQUdMLEtBQUssQ0FBQ3pELFdBQVc7TUFDdkMsSUFBSStELG9CQUFvQixHQUFHTixLQUFLLENBQUNPLFdBQVc7TUFDNUMsSUFBSUMscUJBQXFCLEdBQUdSLEtBQUssQ0FBQ1MsWUFBWTtNQUM5QyxJQUFJSyxvQkFBb0IsR0FBR3VSLE9BQUksQ0FBQy9kLGtCQUFrQjtNQUNsRCxJQUFJOEwsY0FBYyxLQUFLLENBQUMsSUFBSUMsZUFBZSxLQUFLLENBQUMsSUFBSUMsb0JBQW9CLEtBQUssQ0FBQyxJQUFJRSxxQkFBcUIsS0FBSyxDQUFDLEVBQUU7UUFDOUc7TUFDRjtNQUNBLElBQU1pSSxXQUFXLEdBQUc0SixPQUFJLENBQUNuaEIsU0FBUyxDQUFDdkQsZ0JBQWdCLENBQUNDLEtBQUs7TUFDekQsSUFBTSthLFlBQVksR0FBRzBKLE9BQUksQ0FBQ25oQixTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0UsTUFBTTtNQUMzRCxJQUFJd2tCLE9BQUksQ0FBQ3JSLGtCQUFrQixFQUFFO1FBQzNCLENBQUNaLGNBQWMsRUFBRUMsZUFBZSxDQUFDLEdBQUcsQ0FBQ0EsZUFBZSxFQUFFRCxjQUFjLENBQUM7UUFDckUsQ0FBQ0Usb0JBQW9CLEVBQUVFLHFCQUFxQixDQUFDLEdBQUcsQ0FBQ0EscUJBQXFCLEVBQUVGLG9CQUFvQixDQUFDO1FBQzdGUSxvQkFBb0IsR0FBR3VSLE9BQUksQ0FBQy9kLGtCQUFrQixLQUFLLFVBQVUsR0FBRyxXQUFXLEdBQUcsVUFBVTtNQUMxRjtNQUNBLElBQUltZSxhQUFhLEdBQUduUyxvQkFBb0I7TUFDeEMsSUFBSW9TLGNBQWMsR0FBR2xTLHFCQUFxQjtNQUMxQyxJQUFNK1Esb0JBQW9CLEdBQUdjLE9BQUksQ0FBQ2Isc0JBQXNCO01BQ3hELElBQU1DLGtCQUFrQixHQUFHWSxPQUFJLENBQUNYLG9CQUFvQjtNQUNwRCxJQUFNaUIsb0JBQW9CLEdBQUduUyxxQkFBcUIsR0FBR0Ysb0JBQW9CO01BQ3pFLElBQU1zUyxxQkFBcUIsR0FBR3RTLG9CQUFvQixHQUFHRSxxQkFBcUI7TUFDMUUsSUFBSTZSLE9BQUksQ0FBQ2plLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDdkM7UUFDQWllLE9BQUksQ0FBQ2hOLFVBQVUsQ0FBQ3VHLGFBQWEsRUFBRTtVQUM3QixpQkFBaUIsRUFBRSxRQUFRO1VBQzNCLGFBQWEsRUFBRTtRQUNqQixDQUFDLENBQUM7UUFDRjtRQUNBLElBQUk5SyxvQkFBb0IsS0FBS3VSLE9BQUksQ0FBQ2plLGVBQWUsRUFBRTtVQUNqRDtVQUNBO1VBQ0E7VUFDQStjLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQjtVQUNqR0gsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjs7VUFFbEQ7VUFDQXVCLGFBQWEsR0FBR3RCLGFBQWE7VUFDN0J1QixjQUFjLEdBQUdELGFBQWEsR0FBR0Usb0JBQW9CO1FBQ3ZELENBQUMsTUFBTTtVQUNMO1VBQ0E7VUFDQTtVQUNBdkIsY0FBYyxHQUFHa0Isc0JBQXNCLENBQUM5UixxQkFBcUIsRUFBRUgsZUFBZSxDQUFDO1VBQy9FOFEsYUFBYSxHQUFHQyxjQUFjLEdBQUdKLFNBQVMsR0FBR0MsVUFBVTtRQUN6RDtNQUNGLENBQUMsTUFBTTtRQUNMO1FBQ0FvQixPQUFJLENBQUNoTixVQUFVLENBQUN1RyxhQUFhLEVBQUU7VUFDN0IsaUJBQWlCLEVBQUUsS0FBSztVQUN4QixhQUFhLEVBQUU7UUFDakIsQ0FBQyxDQUFDO1FBQ0YsSUFBSTlLLG9CQUFvQixLQUFLdVIsT0FBSSxDQUFDamUsZUFBZSxFQUFFO1VBQ2pEO1VBQ0E7VUFDQTs7VUFFQTtVQUNBZ2QsY0FBYyxHQUFHa0Isc0JBQXNCLENBQUNoQixtQkFBbUIsRUFBRWpSLGVBQWUsQ0FBQyxHQUFHb1Isa0JBQWtCO1VBQ2xHTixhQUFhLEdBQUdDLGNBQWMsR0FBR0osU0FBUyxHQUFHQyxVQUFVOztVQUV2RDtVQUNBeUIsY0FBYyxHQUFHdEIsY0FBYztVQUMvQnFCLGFBQWEsR0FBR0MsY0FBYyxHQUFHRSxxQkFBcUI7O1VBRXREO1VBQ0EsSUFBSXpCLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQixFQUFFO1lBQ3JHO1lBQ0FKLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQjtZQUNqR0gsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjs7WUFFbEQ7WUFDQXVCLGFBQWEsR0FBR3RCLGFBQWE7WUFDN0J1QixjQUFjLEdBQUdELGFBQWEsR0FBR0Usb0JBQW9CO1VBQ3ZEO1FBQ0YsQ0FBQyxNQUFNO1VBQ0w7VUFDQTs7VUFFQTtVQUNBdkIsY0FBYyxHQUFHa0Isc0JBQXNCLENBQUNoQixtQkFBbUIsRUFBRWpSLGVBQWUsQ0FBQyxHQUFHb1Isa0JBQWtCO1VBQ2xHTixhQUFhLEdBQUdDLGNBQWMsR0FBR0osU0FBUyxHQUFHQyxVQUFVOztVQUV2RDtVQUNBLElBQUlFLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQixFQUFFO1lBQ3JHO1lBQ0FKLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQjtZQUNqR0gsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjtVQUNwRDs7VUFFQTtVQUNBdUIsYUFBYSxHQUFHdEIsYUFBYTtVQUM3QnVCLGNBQWMsR0FBR0QsYUFBYSxHQUFHRSxvQkFBb0I7UUFDdkQ7TUFDRjs7TUFFQTtNQUNBLElBQUlOLE9BQUksQ0FBQ25oQixTQUFTLENBQUNuQixvQkFBb0IsS0FBSyxhQUFhLEVBQUU7UUFDekQ7UUFDQSxJQUFJcWhCLGNBQWMsR0FBR0UsbUJBQW1CLEVBQUU7VUFDeENGLGNBQWMsR0FBR2xXLElBQUksQ0FBQ3FHLEdBQUcsQ0FBQytQLG1CQUFtQixFQUFFalIsZUFBZSxDQUFDLEdBQUdvUixrQkFBa0I7VUFDcEZOLGFBQWEsR0FBR0MsY0FBYyxHQUFHSixTQUFTLEdBQUdDLFVBQVU7VUFDdkR3QixhQUFhLEdBQUd0QixhQUFhO1VBQzdCdUIsY0FBYyxHQUFHRCxhQUFhLEdBQUdFLG9CQUFvQjtRQUN2RDs7UUFFQTtRQUNBLElBQUl4QixhQUFhLEdBQUdFLGtCQUFrQixFQUFFO1VBQ3RDRixhQUFhLEdBQUdqVyxJQUFJLENBQUNxRyxHQUFHLENBQUM4UCxrQkFBa0IsRUFBRWpSLGNBQWMsQ0FBQyxHQUFHbVIsb0JBQW9CO1VBQ25GSCxjQUFjLEdBQUdELGFBQWEsR0FBR0QsaUJBQWlCO1VBQ2xEdUIsYUFBYSxHQUFHdEIsYUFBYTtVQUM3QnVCLGNBQWMsR0FBR0QsYUFBYSxHQUFHRSxvQkFBb0I7UUFDdkQ7TUFDRjtNQUNBTixPQUFJLENBQUMxUixvQkFBb0IsR0FBR3pGLElBQUksQ0FBQ3FHLEdBQUcsQ0FBQzRQLGFBQWEsRUFBRXNCLGFBQWEsQ0FBQztNQUNsRUosT0FBSSxDQUFDeFIscUJBQXFCLEdBQUczRixJQUFJLENBQUNxRyxHQUFHLENBQUM2UCxjQUFjLEVBQUVzQixjQUFjLENBQUM7TUFDckUsSUFBSUwsT0FBSSxDQUFDclIsa0JBQWtCLEVBQUU7UUFDM0IsQ0FBQ3lSLGFBQWEsRUFBRUMsY0FBYyxDQUFDLEdBQUcsQ0FBQ0EsY0FBYyxFQUFFRCxhQUFhLENBQUM7TUFDbkU7TUFDQXRCLGFBQWEsSUFBSTFJLFdBQVcsR0FBRyxDQUFDO01BQ2hDMkksY0FBYyxJQUFJM0ksV0FBVyxHQUFHLENBQUM7TUFDakMsSUFBTWtKLG9CQUFvQixHQUFHUixhQUFhLEdBQUdrQixPQUFJLENBQUNULHFCQUFxQjtNQUN2RSxJQUFNQyxxQkFBcUIsR0FBR1QsY0FBYyxHQUFHaUIsT0FBSSxDQUFDVCxxQkFBcUI7TUFDekUsSUFBSWhjLEtBQUssRUFBRTtRQUNUeWMsT0FBSSxDQUFDaE4sVUFBVSxDQUFDelAsS0FBSyxFQUFFO1VBQ3JCLGdCQUFnQixFQUFFLE1BQU07VUFDeEJpTixNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBSXVFLFFBQVEsRUFBRTtRQUNadWMsT0FBSSxDQUFDaE4sVUFBVSxDQUFDdlAsUUFBUSxFQUFFO1VBQ3hCbEksS0FBSyxFQUFFK2pCLG9CQUFvQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJO1VBQ3BENUYsTUFBTSxFQUFFZ1AscUJBQXFCLEdBQUdwSixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7VUFDdERsWCxPQUFPLEVBQUUsTUFBTTtVQUNmLGFBQWEsRUFBRSxRQUFRO1VBQ3ZCLGlCQUFpQixFQUFFLFFBQVE7VUFDM0J1Z0IsT0FBTyxFQUFFO1FBQ1gsQ0FBQyxDQUFDO01BQ0o7TUFDQSxJQUFJOWIsUUFBUSxFQUFFO1FBQ1pxYyxPQUFJLENBQUNoTixVQUFVLENBQUNyUCxRQUFRLEVBQUU7VUFDeEIsYUFBYSxFQUFFLE1BQU07VUFDckI2TSxNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0E4Z0IsT0FBSSxDQUFDaE4sVUFBVSxDQUFDckYsS0FBSyxFQUFFO1FBQ3JCcFMsS0FBSyxFQUFFNmtCLGFBQWEsR0FBRztNQUN6QixDQUFDLENBQUM7TUFDRkosT0FBSSxDQUFDaE4sVUFBVSxDQUFDckYsS0FBSyxFQUFFO1FBQ3JCNkMsTUFBTSxFQUFFNlAsY0FBYyxHQUFHO01BQzNCLENBQUMsQ0FBQztNQUNGLElBQU1YLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUN6Qk0sT0FBSSxDQUFDaE4sVUFBVSxDQUFDaUQsUUFBUSxFQUFFO1FBQ3hCMWEsS0FBSyxFQUFFK2pCLG9CQUFvQixHQUFHSSxhQUFhLEdBQUcsSUFBSTtRQUNsRGxQLE1BQU0sRUFBRWdQLHFCQUFxQixHQUFHRSxhQUFhLEdBQUcsSUFBSTtRQUNwREMsZUFBZSxFQUFFO01BQ25CLENBQUMsQ0FBQztNQUNGLElBQU1DLFlBQVksR0FBRzFKLFdBQVcsQ0FBQ08sYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUMvRCxJQUFJb0osQ0FBQyxHQUFHdkosWUFBWSxHQUFHRixXQUFXLEdBQUcsQ0FBQztNQUN0Q3lKLENBQUMsR0FBR0EsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUdBLENBQUM7TUFDakIsSUFBSSxDQUFDcmEsS0FBSyxDQUFDOFosb0JBQW9CLENBQUMsSUFBSSxDQUFDOVosS0FBSyxDQUFDZ2EscUJBQXFCLENBQUMsSUFBSSxDQUFDaGEsS0FBSyxDQUFDOFEsWUFBWSxDQUFDLElBQUksQ0FBQzlRLEtBQUssQ0FBQzRRLFdBQVcsQ0FBQyxFQUFFO1FBQ2hILElBQU0wSixpQkFBaUIsR0FBR2pYLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQ2tRLG9CQUFvQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBR3NKLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDN0YsSUFBTUssa0JBQWtCLEdBQUdsWCxJQUFJLENBQUN1RyxHQUFHLENBQUNvUSxxQkFBcUIsR0FBR3BKLFdBQVcsR0FBRyxDQUFDLEdBQUdzSixhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQy9GRSxZQUFZLENBQUN2USxZQUFZLENBQUMsT0FBTyxFQUFFeVEsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzFERixZQUFZLENBQUN2USxZQUFZLENBQUMsUUFBUSxFQUFFMFEsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzVESCxZQUFZLENBQUN2USxZQUFZLENBQUMsR0FBRyxFQUFFeVEsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvREYsWUFBWSxDQUFDdlEsWUFBWSxDQUFDLEdBQUcsRUFBRTBRLGtCQUFrQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEVILFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxJQUFJLEVBQUV3USxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDRCxZQUFZLENBQUN2USxZQUFZLENBQUMsSUFBSSxFQUFFd1EsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUN6Qzs7TUFFQTtNQUNBO01BQ0EsSUFBSUcsT0FBSSxDQUFDbmhCLFNBQVMsQ0FBQ3pELFlBQVksRUFBRTtRQUMvQjRrQixPQUFJLENBQUNoTixVQUFVLENBQUN3RyxTQUFTLEVBQUU7VUFDekJ0YSxPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJOGdCLE9BQUksQ0FBQ2plLGVBQWUsS0FBSyxVQUFVLElBQUk0QixRQUFRLElBQUk2VixTQUFTLEVBQUU7VUFDaEUsSUFBTWdILGlDQUFpQyxHQUFHUixPQUFJLENBQUNTLDJCQUEyQixDQUFDOWMsUUFBUSxDQUFDO1VBQ3BGLElBQUkrYyx1QkFBdUIsR0FBR3ZLLGFBQWEsQ0FBQ00sYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDK0csWUFBWSxDQUFDLFFBQVEsQ0FBQztVQUN2RmtELHVCQUF1QixHQUFHQSx1QkFBdUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHQSx1QkFBdUI7VUFDdEYsSUFBSUMsc0JBQXNCLEdBQUdoZCxRQUFRLENBQUN5SyxZQUFZO1VBQ2xEdVMsc0JBQXNCLElBQUluYixLQUFLLENBQUNDLFFBQVEsQ0FBQzlCLFFBQVEsQ0FBQ2xJLEtBQUssQ0FBQ21sQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBR25iLFFBQVEsQ0FBQzlCLFFBQVEsQ0FBQ2xJLEtBQUssQ0FBQ21sQixVQUFVLENBQUM7VUFDOUdELHNCQUFzQixJQUFJSCxpQ0FBaUM7VUFDM0RHLHNCQUFzQixJQUFJRCx1QkFBdUI7VUFDakQsSUFBTUcsUUFBUSxHQUFHNUIsbUJBQW1CLElBQUlBLG1CQUFtQixHQUFHLENBQUMsR0FBR0YsY0FBYyxHQUFHLENBQUMsQ0FBQztVQUNyRixJQUFJNEIsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJQSxzQkFBc0IsR0FBR0UsUUFBUSxFQUFFO1lBQ25FYixPQUFJLENBQUNoTixVQUFVLENBQUN3RyxTQUFTLEVBQUU7Y0FDekIsZUFBZSxFQUFFLEVBQUU7Y0FDbkIsZ0JBQWdCLEVBQUVtSCxzQkFBc0IsR0FBRztZQUM3QyxDQUFDLENBQUM7VUFDSjtRQUNGLENBQUMsTUFBTTtVQUNMWCxPQUFJLENBQUNoTixVQUFVLENBQUN3RyxTQUFTLEVBQUU7WUFDekIsZUFBZSxFQUFFLE1BQU07WUFDdkIsZ0JBQWdCLEVBQUU7VUFDcEIsQ0FBQyxDQUFDO1FBQ0o7TUFDRjtNQUNBLE1BQU13RyxPQUFJLENBQUNwYyxhQUFhLENBQUNvYyxPQUFJLENBQUNoSyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7TUFDckQsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNBeUssMkJBQTJCQSxDQUFDNU0sR0FBRyxFQUFFO0lBQy9CLElBQUlpTixHQUFHLEdBQUcsQ0FBQztJQUNYLEtBQUssSUFBTUMsSUFBSSxJQUFJbE4sR0FBRyxhQUFIQSxHQUFHLHVCQUFIQSxHQUFHLENBQUVtTixVQUFVLEVBQUU7TUFDbENGLEdBQUcsSUFBSUMsSUFBSSxDQUFDM1MsWUFBWSxHQUFHMlMsSUFBSSxDQUFDM1MsWUFBWSxHQUFHLENBQUM7SUFDbEQ7SUFDQSxPQUFPMFMsR0FBRztFQUNaO0VBQ0F6YyxhQUFhQSxDQUFBLEVBQUc7SUFDZCxJQUFJLENBQUNpUSxtQ0FBbUMsRUFBRTtJQUMxQyxJQUFJLENBQUMyTSxRQUFRLEVBQUU7SUFDZixJQUFJLENBQUM1TCxVQUFVLEVBQUU7RUFDbkI7RUFDTS9XLGVBQWVBLENBQUEsRUFBRztJQUFBLElBQUE0aUIsT0FBQTtJQUFBLE9BQUFoakIsaUJBQUE7TUFDdEIsS0FBSyxDQUFDO01BQ04sSUFBSWdqQixPQUFJLENBQUNDLGlCQUFpQixFQUFFO1FBQzFCLEtBQUssQ0FBQztRQUNOO01BQ0Y7TUFDQUQsT0FBSSxDQUFDRSxlQUFlLFNBQVNqcEIsSUFBSSxFQUFFO01BQ25DLElBQUlrcEIsT0FBTyxHQUFHLEVBQUU7TUFDaEJBLE9BQU8sWUFBQTVJLE1BQUEsQ0FBWXlJLE9BQUksQ0FBQzlmLFlBQVksQ0FBQ2tnQixFQUFFLE9BQUk7TUFDM0NELE9BQU8sa0JBQUE1SSxNQUFBLENBQWtCeUksT0FBSSxDQUFDOWYsWUFBWSxDQUFDbWdCLFFBQVEsT0FBSTtNQUN2REYsT0FBTyxzQkFBQTVJLE1BQUEsQ0FBc0J5SSxPQUFJLENBQUM3aEIsZUFBZSxPQUFJO01BQ3JEZ2lCLE9BQU8sbUNBQUE1SSxNQUFBLENBQW1DeUksT0FBSSxDQUFDRSxlQUFlLE9BQUk7TUFDbEUsSUFBSUYsT0FBSSxDQUFDOWYsWUFBWSxDQUFDbWdCLFFBQVEsS0FBSyxLQUFLLElBQUlMLE9BQUksQ0FBQzlmLFlBQVksQ0FBQ21nQixRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ2hGTCxPQUFJLENBQUNFLGVBQWUsR0FBRyxLQUFLO01BQzlCO01BQ0FDLE9BQU8sOEJBQUE1SSxNQUFBLENBQThCeUksT0FBSSxDQUFDRSxlQUFlLE9BQUk7TUFDN0RDLE9BQU8sbUJBQUE1SSxNQUFBLENBQW1CN1MsU0FBUyxDQUFDQyxTQUFTLE9BQUk7TUFDakQsS0FBSyxDQUFDO01BQ05xYixPQUFJLENBQUMzZSxPQUFPLENBQUM4ZSxPQUFPLENBQUM7TUFDckJya0IsTUFBTSxDQUFDd2tCLGNBQWMsR0FBR0gsT0FBTztNQUMvQixJQUFJSSxhQUFhLEdBQUcsT0FBTztNQUMzQixJQUFJUCxPQUFJLENBQUNFLGVBQWUsRUFBRTtRQUN4QixLQUFLLENBQUM7UUFDTkssYUFBYSxJQUFJLE9BQU87TUFDMUIsQ0FBQyxNQUFNO1FBQ0wsS0FBSyxDQUFDO01BQ1I7TUFDQSxLQUFLLENBQUM7TUFDTnprQixNQUFNLENBQUN3a0IsY0FBYyxHQUFHSCxPQUFPO01BQy9CLEtBQUssQ0FBQztNQUNOLElBQU1LLEdBQUcsR0FBRyxJQUFJN00sR0FBRyxDQUFDNE0sYUFBYSxHQUFHLEtBQUssRUFBRVAsT0FBSSxDQUFDcmlCLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQztNQUMxRSxJQUFJc1QsR0FBRyxTQUFTc1IsS0FBSyxDQUFDRCxHQUFHLENBQUNFLElBQUksQ0FBQyxDQUFDQyxJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxJQUFJLEVBQUUsQ0FBQyxDQUFDRixJQUFJLENBQUNFLElBQUksSUFBSTtRQUNuRSxJQUFJQyxLQUFLLEdBQUcsdUJBQXVCO1FBQ25DLElBQUlDLE1BQU0sR0FBR0YsSUFBSSxDQUFDRyxPQUFPLENBQUNGLEtBQUssRUFBRSwwQkFBMEIsQ0FBQzs7UUFFNUQ7UUFDQUMsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSw0Q0FBNEMsR0FBRywwREFBMEQsQ0FBQztRQUN6SkQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyw0Q0FBNEMsRUFBRSxnQkFBZ0IsR0FBRyw0Q0FBNEMsQ0FBQztRQUN0SUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztRQUNwRkQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQzs7UUFFeEQ7UUFDQUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ1QsYUFBYSxHQUFHLE9BQU8sRUFBRSxJQUFJNU0sR0FBRyxDQUFDNE0sYUFBYSxHQUFHLE9BQU8sRUFBRVAsT0FBSSxDQUFDcmlCLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQyxDQUFDNmtCLElBQUksQ0FBQztRQUN2SEssTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxJQUFJQyxNQUFNLCtCQUFBMUosTUFBQSxDQUE4QmdKLGFBQWEsbUJBQWUsSUFBSSxDQUFDLDZCQUFBaEosTUFBQSxDQUE0QixJQUFJNUQsR0FBRyxDQUFDNE0sYUFBYSxHQUFHLE9BQU8sRUFBRVAsT0FBSSxDQUFDcmlCLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQyxDQUFDNmtCLElBQUksUUFBSTtRQUN0TUssTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSwyQkFBMkIsQ0FBQztRQUMzRUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSwyQkFBMkIsQ0FBQzs7UUFFM0U7UUFDQUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSwrQ0FBK0MsR0FBRyw2QkFBNkIsR0FBRyw0Q0FBNEMsR0FBRyxrQ0FBa0MsR0FBRyxrQ0FBa0MsR0FBRyxpQ0FBaUMsR0FBRywrQkFBK0IsR0FBRywyQ0FBMkMsR0FBRyxXQUFXLEdBQUcsc0NBQXNDLEdBQUcsK0JBQStCLEdBQUcsMkNBQTJDLEdBQUcsVUFBVSxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsMkNBQTJDLENBQUM7UUFDMWtCLE9BQU9ELE1BQU07TUFDZixDQUFDLENBQUM7TUFDRjVSLEdBQUcsdUNBQUFvSSxNQUFBLENBRUNwSSxHQUFHLHdJQUtGO01BQ0w2USxPQUFJLENBQUN4Z0IsV0FBVyxTQUFTMGhCLElBQUksQ0FBQy9SLEdBQUcsQ0FBQztNQUNsQzZRLE9BQUksQ0FBQ3hnQixXQUFXLENBQUMyaEIsb0JBQW9CO1FBQUEsSUFBQUMsTUFBQSxHQUFBcGtCLGlCQUFBLENBQUcsV0FBTXVCLENBQUMsRUFBSTtVQUNqRCxLQUFLLENBQUM7UUFDUixDQUFDO1FBQUEsaUJBQUE4aUIsR0FBQTtVQUFBLE9BQUFELE1BQUEsQ0FBQTFiLEtBQUEsT0FBQWhFLFNBQUE7UUFBQTtNQUFBO01BQ0QsTUFBTXNlLE9BQUksQ0FBQ3hnQixXQUFXLENBQUMyaEIsb0JBQW9CLEVBQUU7TUFDN0NuQixPQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7TUFDN0IsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNBcUIsbUJBQW1CQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQ3BCLE9BQU8sSUFBSXZkLE9BQU8sQ0FBQyxDQUFDQyxPQUFPLEVBQUVzTyxNQUFNLEtBQUs7TUFDdEMsSUFBSSxDQUFDaVAsVUFBVSxHQUFHLEtBQUs7TUFDdkIsSUFBSSxDQUFDcGUsaUJBQWlCLENBQUMsS0FBSyxDQUFDO01BQzdCO01BQ0E7TUFDQTtNQUNBLElBQUksQ0FBQ3lPLG1CQUFtQixFQUFFO01BQzFCLElBQUksQ0FBQzRQLFNBQVMsR0FBRyxDQUFDO01BQ2xCLElBQUksQ0FBQ3BjLFNBQVMsR0FBRyxLQUFLO01BQ3RCLElBQUksQ0FBQ29NLHFCQUFxQixHQUFHLENBQUM7TUFDOUIsSUFBSSxDQUFDaVEsZUFBZSxHQUFHLENBQUM7TUFDeEIsSUFBTUMsSUFBSTtRQUFBLElBQUFDLE1BQUEsR0FBQTVrQixpQkFBQSxDQUFHLGFBQVk7VUFDdkIsSUFBSTtZQUNGLElBQUlvTCxTQUFTLEdBQUcsSUFBSTtjQUNsQnlaLGNBQWMsR0FBRyxJQUFJO2NBQ3JCclQsT0FBTyxHQUFHLElBQUk7Y0FDZEMsVUFBVSxHQUFHLElBQUk7Y0FDakIyRCxTQUFTLEdBQUcsSUFBSTtjQUNoQkMsU0FBUyxHQUFHLElBQUk7Y0FDaEJ5UCxTQUFTLEdBQUcsSUFBSTtjQUNoQkMsYUFBYSxHQUFHLEVBQUU7Y0FDbEJDLFFBQVEsR0FBRyxJQUFJOztZQUVqQjtZQUNBLElBQUksQ0FBQ1QsT0FBSSxDQUFDL2hCLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7WUFFOUI7WUFDQSxJQUFNLENBQUN5aUIsWUFBWSxFQUFFQyxZQUFZLENBQUMsR0FBRyxDQUFDWCxPQUFJLENBQUNsWCxpQkFBaUIsRUFBRWtYLE9BQUksQ0FBQ2pYLGtCQUFrQixDQUFDO1lBQ3RGLElBQU07Y0FDSm1DO1lBQ0YsQ0FBQyxHQUFHN1YsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO1lBQzdCLElBQUlra0IsWUFBWSxLQUFLLENBQUMsSUFBSUMsWUFBWSxLQUFLLENBQUMsRUFBRTtZQUM5QyxJQUFJWCxPQUFJLENBQUNDLFVBQVUsRUFBRTtjQUNuQixNQUFNRCxPQUFJLENBQUMxYixPQUFPLENBQUMsR0FBRyxDQUFDO2NBQ3ZCO1lBQ0Y7WUFDQTtZQUNBLElBQUkwYixPQUFJLENBQUNFLFNBQVMsS0FBSyxDQUFDLElBQUksQ0FBQ0YsT0FBSSxDQUFDbGMsU0FBUyxXQUFXa2MsT0FBSSxDQUFDdFYsNkJBQTZCLENBQUNRLEtBQUssQ0FBQyxDQUFDLEVBQUU7Y0FDaEcsQ0FBQzhVLE9BQUksQ0FBQ0UsU0FBUyxFQUFFRixPQUFJLENBQUN2Vix3QkFBd0IsQ0FBQyxHQUFHdVYsT0FBSSxDQUFDblksbUJBQW1CLENBQUNtWSxPQUFJLENBQUMxakIsU0FBUyxDQUFDO1lBQzVGO1lBQ0EsSUFBSSxDQUFDMGpCLE9BQUksQ0FBQ0UsU0FBUyxJQUFJRixPQUFJLENBQUNsYyxTQUFTLEVBQUU7Y0FDckMsTUFBTWtjLE9BQUksQ0FBQzFiLE9BQU8sQ0FBQyxHQUFHLENBQUM7Y0FDdkI7WUFDRjtZQUNBOztZQUVBLElBQUkwYixPQUFJLENBQUMvTSxXQUFXLEdBQUcrTSxPQUFJLENBQUMzb0IsVUFBVSxDQUFDWCxXQUFXLEVBQUU7Y0FDbEQ7O2NBRUE7Y0FDQSxDQUFDNHBCLGNBQWMsRUFBRXJULE9BQU8sRUFBRUMsVUFBVSxDQUFDLFNBQVM4UyxPQUFJLENBQUMzUixtQkFBbUIsQ0FBQzJSLE9BQUksQ0FBQ0UsU0FBUyxFQUFFLENBQUMsQ0FBQztjQUN6RixJQUFJLENBQUNJLGNBQWMsRUFBRTtnQkFDbkIsSUFBSU4sT0FBSSxDQUFDek0sZ0JBQWdCLEtBQUt5TSxPQUFJLENBQUN6b0IsV0FBVyxDQUFDcEIsS0FBSyxFQUFFO2tCQUNwRCxNQUFNNnBCLE9BQUksQ0FBQzdlLGFBQWEsQ0FBQzZlLE9BQUksQ0FBQ3pvQixXQUFXLENBQUNsQixrQkFBa0IsQ0FBQztnQkFDL0Q7Z0JBQ0EsSUFBSTJwQixPQUFJLENBQUNsRix3QkFBd0IsRUFBRSxFQUFFO2tCQUNuQyxNQUFNa0YsT0FBSSxDQUFDN2UsYUFBYSxDQUFDNmUsT0FBSSxDQUFDem9CLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFLEtBQUssRUFBRTJXLFVBQVUsQ0FBQztrQkFDbkY4UyxPQUFJLENBQUMxUCxtQkFBbUIsRUFBRTtrQkFDMUIwUCxPQUFJLENBQUNuZSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQzs7Z0JBRUE7Y0FDRjs7Y0FFQTtjQUNBLE1BQU1tZSxPQUFJLENBQUM3ZSxhQUFhLENBQUM2ZSxPQUFJLENBQUN6b0IsV0FBVyxDQUFDbkIsbUJBQW1CLENBQUM7O2NBRTlEO2NBQ0E0cEIsT0FBSSxDQUFDWSwwQkFBMEIsQ0FBQzNULE9BQU8sRUFBRUMsVUFBVSxDQUFDO2NBQ3BELElBQUk4UyxPQUFJLENBQUNsRix3QkFBd0IsRUFBRSxFQUFFO2dCQUNuQ2tGLE9BQUksQ0FBQ25lLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDNUIsTUFBTW1lLE9BQUksQ0FBQzdlLGFBQWEsQ0FBQzZlLE9BQUksQ0FBQ3pvQixXQUFXLENBQUNqQixzQkFBc0IsRUFBRSxLQUFLLEVBQUU0VyxVQUFVLENBQUM7Y0FDdEY7Y0FDQSxDQUFDckcsU0FBUyxFQUFFcUcsVUFBVSxFQUFFMkQsU0FBUyxFQUFFQyxTQUFTLENBQUMsU0FBU2tQLE9BQUksQ0FBQzlRLGtCQUFrQixDQUFDOFEsT0FBSSxDQUFDRSxTQUFTLEVBQUVGLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDeGYsU0FBUyxFQUFFd2YsT0FBSSxDQUFDbEYsd0JBQXdCLEVBQUUsRUFBRTdOLE9BQU8sRUFBRUMsVUFBVSxDQUFDOztjQUVuTDtjQUNBO2NBQ0E7Y0FDQTtZQUNGOztZQUVBLElBQUk4UyxPQUFJLENBQUMvTSxXQUFXLElBQUkrTSxPQUFJLENBQUMzb0IsVUFBVSxDQUFDWCxXQUFXLEVBQUU7Y0FDbkQ7O2NBRUE7Y0FDQSxJQUFJbVEsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDdkIsTUFBTSxJQUFJeEksS0FBSyxrQkFBQTJYLE1BQUEsQ0FBa0JnSyxPQUFJLENBQUMvTSxXQUFXLDhCQUEyQixDQUFDLENBQUM7Y0FDaEY7O2NBRUE7Y0FDQStNLE9BQUksQ0FBQ3pQLFVBQVUsQ0FBQ3JGLEtBQUssRUFBRTtnQkFDckJ6TyxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUVKLElBQUl1akIsT0FBSSxDQUFDeGYsU0FBUyxFQUFFO2dCQUNsQixLQUFLLENBQUM7Z0JBQ047Z0JBQ0ErZixTQUFTLFNBQVNQLE9BQUksQ0FBQ2pQLFlBQVksQ0FBQ2lQLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJSyxTQUFTLEtBQUssSUFBSSxFQUFFLE1BQU0sSUFBSWxpQixLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQyxDQUFDOztnQkFFM0ZtaUIsYUFBYSxDQUFDN0ssSUFBSSxDQUFDNEssU0FBUyxDQUFDO2dCQUM3QixJQUFJUCxPQUFJLENBQUM1akIsU0FBUyxDQUFDaEIsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO2tCQUN2QyxJQUFJeWxCLGNBQWMsR0FBRyxJQUFJQyxJQUFJLEVBQUU7a0JBQy9CLElBQU1DLElBQUksR0FBR2YsT0FBSSxDQUFDNWpCLFNBQVMsQ0FBQ2xCLFlBQVksS0FBSyxNQUFNO2tCQUNuRCxJQUFNOGxCLElBQUksR0FBR2hCLE9BQUksQ0FBQzVqQixTQUFTLENBQUNsQixZQUFZLEtBQUssTUFBTTtrQkFDbkQsSUFBTStsQixRQUFRLEdBQUdqQixPQUFJLENBQUM1akIsU0FBUyxDQUFDbEIsWUFBWSxLQUFLLFVBQVU7a0JBQzNELElBQUlnbUIsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO2tCQUFBLElBQUFDLEtBQUEsYUFBQUEsTUFBQTdDLElBQUEsRUFFb0I7b0JBQzNDLElBQUk0QyxXQUFXLEVBQUU7c0JBQ2YsS0FBSyxDQUFDLENBQUMsQ0FBQztzQkFBQTtvQkFFVjtvQkFDQTtvQkFDQSxJQUFJbEIsT0FBSSxDQUFDRyxlQUFlLEtBQUtILE9BQUksQ0FBQzVqQixTQUFTLENBQUNoQixnQkFBZ0IsRUFBRTtzQkFDNUQsS0FBSyxDQUFDO3NCQUFDO29CQUVUO29CQUNBLElBQU1nbUIsT0FBTztzQkFBQSxJQUFBQyxNQUFBLEdBQUE1bEIsaUJBQUEsQ0FBRyxhQUFZO3dCQUMxQnVrQixPQUFJLENBQUNHLGVBQWUsRUFBRTt3QkFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDUkksU0FBUyxTQUFTUCxPQUFJLENBQUN2TyxpQkFBaUIsQ0FBQ3VPLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDRSxTQUFTLEVBQUU1QixJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoRixJQUFJaUMsU0FBUyxLQUFLLElBQUksRUFBRSxNQUFNLElBQUlsaUIsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsQ0FBQzs7d0JBRTNGbWlCLGFBQWEsQ0FBQzdLLElBQUksQ0FBQzRLLFNBQVMsQ0FBQztzQkFDL0IsQ0FBQztzQkFBQSxnQkFQS2EsT0FBT0EsQ0FBQTt3QkFBQSxPQUFBQyxNQUFBLENBQUFsZCxLQUFBLE9BQUFoRSxTQUFBO3NCQUFBO29CQUFBLEdBT1o7b0JBQ0QsSUFBSTRnQixJQUFJLEVBQUU7c0JBQ1IsSUFBSVIsU0FBUyxDQUFDOWYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUNsQyxNQUFNMmdCLE9BQU8sRUFBRTtzQkFDakIsQ0FBQyxNQUFNO3dCQUNMRixXQUFXLEdBQUcsSUFBSTtzQkFDcEI7b0JBQ0Y7b0JBQ0EsSUFBSUYsSUFBSSxFQUFFO3NCQUNSLElBQUlULFNBQVMsQ0FBQzlmLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDbEMsTUFBTTJnQixPQUFPLEVBQUU7c0JBQ2pCLENBQUMsTUFBTTt3QkFDTEYsV0FBVyxHQUFHLElBQUk7c0JBQ3BCO29CQUNGO29CQUNBLElBQUlELFFBQVEsRUFBRTtzQkFDWixNQUFNRyxPQUFPLEVBQUU7b0JBQ2pCO2tCQUNGLENBQUM7a0JBbkNELEtBQUssSUFBTTlDLElBQUksSUFBSTBCLE9BQUksQ0FBQzNQLG1CQUFtQjtvQkFBQSxJQUFBaVIsSUFBQSxVQUFBSCxLQUFBLENBQUE3QyxJQUFBO29CQUFBLElBQUFnRCxJQUFBLGNBR3ZDO2tCQUFNO2tCQWlDVixJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJVCxJQUFJLEVBQUUsR0FBR0QsY0FBYztrQkFDcEQsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixDQUFDLE1BQU07a0JBQ0wsS0FBSyxDQUFDO2dCQUNSO2NBQ0Y7Y0FDQSxJQUFJYixPQUFJLENBQUM1akIsU0FBUyxDQUFDdEUsV0FBVyxFQUFFO2dCQUM5QjJvQixRQUFRLEdBQUdULE9BQUksQ0FBQzFPLGFBQWEsQ0FBQzBPLE9BQUksQ0FBQ0UsU0FBUyxDQUFDO2NBQy9DO2NBQ0EsS0FBSyxDQUFDO2NBQ04sSUFBTTtnQkFDSnNCLFlBQVk7Z0JBQ1pDO2NBQ0YsQ0FBQyxHQUFHbnNCLGlCQUFpQixDQUFDb3NCLGNBQWMsQ0FBQzFCLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDeGYsU0FBUyxFQUFFcUcsU0FBUyxFQUFFMFosU0FBUyxFQUFFUCxPQUFJLENBQUNHLGVBQWUsRUFBRUssYUFBYSxFQUFFUixPQUFJLENBQUM1akIsU0FBUyxDQUFDbEIsWUFBWSxFQUFFOGtCLE9BQUksQ0FBQzVqQixTQUFTLENBQUNqQjtjQUM1SztjQUNBO2NBQ0E7Y0FBQSxDQUNDOztjQUVELElBQUl3QixhQUFhLEdBQUc7Z0JBQ2xCZ2xCLFFBQVEsRUFBRTNCLE9BQUksQ0FBQzFqQixTQUFTO2dCQUN4QlMsVUFBVSxFQUFFMGtCLFNBQVM7Z0JBQ3JCaGtCLGdCQUFnQixFQUFFeVAsVUFBVTtnQkFDNUJwUCxpQkFBaUIsRUFBRStTLFNBQVM7Z0JBQzVCOVMsY0FBYyxFQUFFK1MsU0FBUztnQkFDekIyUCxRQUFRLEVBQUVBLFFBQVE7Z0JBQ2xCbUIsUUFBUSxFQUFFNUIsT0FBSSxDQUFDeGY7Y0FDakIsQ0FBQztjQUNELE1BQU13ZixPQUFJLENBQUM2QixnQkFBZ0IsQ0FBQ2xsQixhQUFhLEVBQUV1USxVQUFVLEVBQUUyRCxTQUFTLEVBQUVDLFNBQVMsQ0FBQztjQUM1RWtQLE9BQUksQ0FBQ3RqQixhQUFhLENBQUNDLGFBQWEsQ0FBQztjQUNqQyxJQUFJcWpCLE9BQUksQ0FBQzVqQixTQUFTLENBQUN2RSxlQUFlLEVBQUU7Z0JBQ2xDOEUsYUFBYSxDQUFDbWxCLFFBQVEsR0FBR04sWUFBWTtjQUN2QztjQUNBLE1BQU14QixPQUFJLENBQUMrQixrQkFBa0IsQ0FBQ3BsQixhQUFhLENBQUM7Y0FDNUNxakIsT0FBSSxDQUFDcGUsYUFBYSxFQUFFO2NBQ3BCb2UsT0FBSSxDQUFDQyxVQUFVLEdBQUcsSUFBSTtjQUN0QnZkLE9BQU8sRUFBRTtZQUNYO1VBQ0YsQ0FBQyxDQUFDLE9BQU9qQixDQUFDLEVBQUU7WUFDVixJQUFJaVIsWUFBWSxHQUFHLHNCQUFzQjtZQUN6QyxJQUFJalIsQ0FBQyxDQUFDd04sT0FBTyxFQUFFO2NBQ2J5RCxZQUFZLElBQUksSUFBSSxHQUFHalIsQ0FBQyxDQUFDd04sT0FBTztZQUNsQztZQUNBLEtBQUssQ0FBQzs7WUFFTjtZQUNBO1lBQ0E7WUFDQTtZQUNBLE1BQU0rUSxPQUFJLENBQUNyTixrQkFBa0IsQ0FBQyxPQUFPLEVBQUVsUixDQUFDLEVBQUVpUixZQUFZLENBQUM7WUFDdkRzTixPQUFJLENBQUNwZSxhQUFhLEVBQUU7WUFDcEJvZSxPQUFJLENBQUNDLFVBQVUsR0FBRyxJQUFJO1lBQ3RCalAsTUFBTSxFQUFFO1lBQ1I7VUFDRixDQUFDLFNBQVM7WUFDUixJQUFJZ1AsT0FBSSxDQUFDZ0MsV0FBVyxFQUFFO2NBQ3BCaEMsT0FBSSxDQUFDZ0MsV0FBVyxHQUFHLEtBQUs7Y0FDeEI7WUFDRjtZQUNBLElBQUksQ0FBQ2hDLE9BQUksQ0FBQ0MsVUFBVSxFQUFFO2NBQ3BCcmQsVUFBVSxDQUFDd2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkI7VUFDRjtRQUNGLENBQUM7UUFBQSxnQkFwTUtBLElBQUlBLENBQUE7VUFBQSxPQUFBQyxNQUFBLENBQUFsYyxLQUFBLE9BQUFoRSxTQUFBO1FBQUE7TUFBQSxHQW9NVDtNQUVEeUMsVUFBVSxDQUFDd2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0VBQ0o7O0VBRU15QixnQkFBZ0JBLENBQUNsbEIsYUFBYSxFQUFFdVEsVUFBVSxFQUFFMkQsU0FBUyxFQUFFQyxTQUFTLEVBQUVoTCxjQUFjLEVBQUU7SUFBQSxJQUFBbWMsT0FBQTtJQUFBLE9BQUF4bUIsaUJBQUE7TUFDdEYsSUFBSXdtQixPQUFJLENBQUM3bEIsU0FBUyxDQUFDbkUsZ0JBQWdCLEVBQUU7UUFDbkMsSUFBTWlxQixXQUFXLEdBQUdELE9BQUksQ0FBQ2xXLHFCQUFxQixHQUFHa1csT0FBSSxDQUFDcFcsb0JBQW9CO1FBQzFFLElBQU1zVyxjQUFjLEdBQUc7VUFDckJDLFFBQVEsRUFBRUgsT0FBSSxDQUFDN2xCLFNBQVMsQ0FBQ2xFLHdCQUF3QjtVQUNqRG1xQixTQUFTLEVBQUVKLE9BQUksQ0FBQzdsQixTQUFTLENBQUNsRSx3QkFBd0IsR0FBR2dxQixXQUFXO1VBQ2hFSSxXQUFXLEVBQUVMLE9BQUksQ0FBQzdsQixTQUFTLENBQUNqRSx5QkFBeUI7VUFDckRvcUIsb0JBQW9CLEVBQUVOLE9BQUksQ0FBQzdsQixTQUFTLENBQUNqRSx5QkFBeUIsQ0FBQztRQUNqRSxDQUFDOztRQUVEd0UsYUFBYSxDQUFDYyxnQkFBZ0IsU0FBU3drQixPQUFJLENBQUNyYyxxQkFBcUIsQ0FBQ3NILFVBQVUsRUFBRWlWLGNBQWMsRUFBRXJjLGNBQWMsQ0FBQzs7UUFFN0c7UUFDQSxJQUFNMGMsbUJBQW1CLEdBQUc7VUFDMUJDLE9BQU8sRUFBRU4sY0FBYyxDQUFDTSxPQUFPO1VBQy9CRixvQkFBb0IsRUFBRUosY0FBYyxDQUFDSTtRQUN2QyxDQUFDO1FBQ0Q1bEIsYUFBYSxDQUFDbUIsaUJBQWlCLFNBQVNta0IsT0FBSSxDQUFDcmMscUJBQXFCLENBQUNpTCxTQUFTLEVBQUUyUixtQkFBbUIsRUFBRTFjLGNBQWMsQ0FBQztRQUNsSG5KLGFBQWEsQ0FBQ29CLGNBQWMsU0FBU2trQixPQUFJLENBQUNyYyxxQkFBcUIsQ0FBQ2tMLFNBQVMsRUFBRXFSLGNBQWMsRUFBRXJjLGNBQWMsQ0FBQztNQUM1RztJQUFDO0VBQ0g7RUFDQTRjLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLE9BQU8sSUFBSWpnQixPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFc08sTUFBTSxLQUFLO01BQ3RDLElBQU0yUixVQUFVLEdBQUcsSUFBSSxDQUFDdm1CLFNBQVMsQ0FBQ3dtQixjQUFjLENBQUNELFVBQVU7TUFDM0QsSUFBTUUsT0FBTyxHQUFHLElBQUksQ0FBQ3ptQixTQUFTLENBQUN3bUIsY0FBYyxDQUFDQyxPQUFPO01BQ3JEM0QsS0FBSyxJQUFBbEosTUFBQSxDQUFJNk0sT0FBTyxlQUFZO1FBQzFCQyxJQUFJLEVBQUVySCxJQUFJLENBQUNDLFNBQVMsQ0FBQ2lILFVBQVUsQ0FBQztRQUNoQ0ksTUFBTSxFQUFFO1FBQ1I7UUFDQTtNQUNGLENBQUMsQ0FBQyxDQUFDM0QsSUFBSSxDQUFDQyxHQUFHLElBQUlBLEdBQUcsQ0FBQzJELElBQUksRUFBRSxDQUFDLENBQUM1RCxJQUFJLENBQUN2YSxNQUFNLElBQUk7UUFDeEMsS0FBSyxDQUFDO1FBQ05xYSxLQUFLLElBQUFsSixNQUFBLENBQUk2TSxPQUFPLGtCQUFlO1VBQzdCSSxPQUFPLEVBQUU7WUFDUEMsYUFBYSxZQUFBbE4sTUFBQSxDQUFZblIsTUFBTSxDQUFDc2UsS0FBSztVQUN2QyxDQUFDO1VBQ0RMLElBQUksRUFBRSxJQUFJO1VBQ1ZDLE1BQU0sRUFBRTtRQUNWLENBQUMsQ0FBQyxDQUFDM0QsSUFBSSxDQUFDQyxHQUFHLElBQUlBLEdBQUcsQ0FBQzJELElBQUksRUFBRSxDQUFDLENBQUM1RCxJQUFJLENBQUM0RCxJQUFJLElBQUk7VUFDdEN0Z0IsT0FBTyxDQUFDc2dCLElBQUksQ0FBQ0csS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUNDLEdBQUcsSUFBSTtRQUNkclMsTUFBTSxDQUFDcVMsR0FBRyxDQUFDO01BQ2IsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0o7RUFDQUMsa0JBQWtCQSxDQUFDcGhCLE9BQU8sRUFBRWlOLE9BQU8sRUFBRWpDLFVBQVUsRUFBRTtJQUFBLElBQUFxVyxPQUFBO0lBQy9DLE9BQU8sSUFBSTlnQixPQUFPO01BQUEsSUFBQStnQixNQUFBLEdBQUEvbkIsaUJBQUEsQ0FBQyxXQUFPaUgsT0FBTyxFQUFFc08sTUFBTSxFQUFLO1FBQzVDLElBQUk7VUFDRixJQUFJNlIsT0FBTyxHQUFHVSxPQUFJLENBQUNubkIsU0FBUyxDQUFDcW5CLGdCQUFnQjtVQUM3QyxRQUFRdmhCLE9BQU87WUFDYixLQUFLLFFBQVE7WUFDYixLQUFLLFFBQVE7WUFDYixLQUFLLFlBQVk7WUFDakIsS0FBSyxZQUFZO2NBQ2YyZ0IsT0FBTyxJQUFJLG9CQUFvQjtjQUMvQjtZQUNGLEtBQUssVUFBVTtZQUNmLEtBQUssY0FBYztZQUNuQixLQUFLLGtCQUFrQjtZQUN2QixLQUFLLHNCQUFzQjtjQUN6QkEsT0FBTyxJQUFJLGVBQWU7Y0FDMUI7WUFDRixLQUFLLFlBQVk7Y0FDZkEsT0FBTyxJQUFJLGlCQUFpQjtjQUM1QjtZQUNGLEtBQUssT0FBTztZQUNaLEtBQUssV0FBVztjQUNkQSxPQUFPLElBQUksWUFBWTtjQUN2QjtZQUNGLEtBQUssUUFBUTtjQUNYLE1BQU0sSUFBSXhrQixLQUFLLENBQUMsMkNBQTJDLENBQUM7WUFDOUQ7Y0FDRSxNQUFNLElBQUlBLEtBQUssMEJBQUEyWCxNQUFBLENBQTBCOVQsT0FBTyxFQUFHO1VBQUM7VUFFeEQsSUFBTXdoQixRQUFRLFNBQVNILE9BQUksQ0FBQ2Isb0JBQW9CLEVBQUU7VUFDbEQsSUFBTWlCLFNBQVMsR0FBRyxJQUFJQyxPQUFPLEVBQUU7VUFDL0JELFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLGVBQWUsWUFBQTdOLE1BQUEsQ0FBWTBOLFFBQVEsRUFBRztVQUN2RCxJQUFNSSxLQUFLLEdBQUc7WUFDWkMsWUFBWSxFQUFFN1csVUFBVTtZQUN4QjhXLFNBQVMsRUFBRSxNQUFNO1lBQ2pCQyxTQUFTLEVBQUU7VUFDYixDQUFDO1VBQ0QsSUFBSVYsT0FBSSxDQUFDL2lCLFNBQVMsRUFBRTtZQUNsQnNqQixLQUFLLENBQUNsQyxRQUFRLEdBQUcsTUFBTTtVQUN6QjtVQUNBLElBQU1zQyxHQUFHLEdBQUd6SSxJQUFJLENBQUNDLFNBQVMsQ0FBQ29JLEtBQUssQ0FBQztVQUNqQyxJQUFNSyxjQUFjLEdBQUc7WUFDckJwQixNQUFNLEVBQUUsTUFBTTtZQUNkRSxPQUFPLEVBQUVVLFNBQVM7WUFDbEJiLElBQUksRUFBRW9CLEdBQUc7WUFDVEUsUUFBUSxFQUFFO1VBQ1osQ0FBQztVQUNEbEYsS0FBSyxDQUFDMkQsT0FBTyxFQUFFc0IsY0FBYyxDQUFDLENBQUMvRSxJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDMkQsSUFBSSxFQUFFLENBQUMsQ0FBQzVELElBQUksQ0FBQ3ZhLE1BQU0sSUFBSTtZQUNwRSxLQUFLLENBQUM7WUFDTm5DLE9BQU8sQ0FBQ21DLE1BQU0sQ0FBQztVQUNqQixDQUFDLENBQUMsQ0FBQ3VlLEtBQUssQ0FBQzNoQixDQUFDLElBQUk7WUFDWixNQUFNQSxDQUFDO1VBQ1QsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLE9BQU80aEIsR0FBRyxFQUFFO1VBQ1osS0FBSyxDQUFDO1VBQ05yUyxNQUFNLENBQUNxUyxHQUFHLENBQUM7UUFDYjtNQUNGLENBQUM7TUFBQSxpQkFBQWdCLEdBQUEsRUFBQUMsR0FBQTtRQUFBLE9BQUFkLE1BQUEsQ0FBQXJmLEtBQUEsT0FBQWhFLFNBQUE7TUFBQTtJQUFBLElBQUM7RUFDSjtFQUNBb2tCLHFCQUFxQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQUMsT0FBQTtJQUN0QixPQUFPLElBQUkvaEIsT0FBTztNQUFBLElBQUFnaUIsTUFBQSxHQUFBaHBCLGlCQUFBLENBQUMsV0FBT2lILE9BQU8sRUFBRXNPLE1BQU0sRUFBSztRQUM1QyxJQUFJO1VBQUEsSUFBQTBULHFCQUFBO1VBQ0Y7VUFDQTtVQUNBO1VBQ0FGLE9BQUksQ0FBQ2xVLG1CQUFtQixFQUFFO1VBQzFCLElBQUl6SixTQUFTLEdBQUcsSUFBSTtZQUNsQjBaLFNBQVMsR0FBRyxJQUFJO1lBQ2hCQyxhQUFhLEdBQUcsRUFBRTtVQUNwQixJQUFNM0gsc0JBQXNCO1lBQUEsSUFBQThMLE1BQUEsR0FBQWxwQixpQkFBQSxDQUFHLGFBQVk7Y0FDekM7Y0FDQSxJQUFNLEdBQUd5UixVQUFVLENBQUMsU0FBU3NYLE9BQUksQ0FBQzFaLG9CQUFvQixFQUFFO2NBQ3hELElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDZDtjQUFBLENBQ0QsTUFBTTtnQkFDTDtnQkFDQSxNQUFNMFosT0FBSSxDQUFDcmpCLGFBQWEsQ0FBQ3FqQixPQUFJLENBQUNqdEIsV0FBVyxDQUFDakIsc0JBQXNCLEVBQUUsS0FBSyxFQUFFNFcsVUFBVSxDQUFDO2dCQUNwRixJQUFJO2tCQUNGckcsU0FBUyxTQUFTMmQsT0FBSSxDQUFDbEIsa0JBQWtCLENBQUNrQixPQUFJLENBQUNsb0IsU0FBUyxFQUFFa29CLE9BQUksQ0FBQ2hrQixTQUFTLEVBQUUwTSxVQUFVLENBQUM7O2tCQUVyRjtrQkFDQSxJQUFJckcsU0FBUyxLQUFLLEtBQUssRUFBRTtvQkFDdkIsTUFBTTJkLE9BQUksQ0FBQ3JqQixhQUFhLENBQUNxakIsT0FBSSxDQUFDanRCLFdBQVcsQ0FBQ1gsVUFBVSxDQUFDO2tCQUN2RDtnQkFDRixDQUFDLENBQUMsT0FBTzZLLENBQUMsRUFBRTtrQkFDVixNQUFNLElBQUlwRCxLQUFLLHdCQUF3QjtnQkFDekM7O2dCQUVBOztnQkFFQTtnQkFDQSxJQUFNO2tCQUNKNk07Z0JBQ0YsQ0FBQyxHQUFHN1YsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO2dCQUM3QmdvQixPQUFJLENBQUNqVSxVQUFVLENBQUNyRixLQUFLLEVBQUU7a0JBQ3JCek8sT0FBTyxFQUFFO2dCQUNYLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUVKLEtBQUssQ0FBQztnQkFDTixJQUFNO2tCQUNKK2tCLFlBQVk7a0JBQ1pDLFNBQVM7a0JBQ1RtRCxpQkFBaUI7a0JBQ2pCbkU7Z0JBQ0YsQ0FBQyxHQUFHbHJCLGdCQUFnQixDQUFDbXNCLGNBQWMsQ0FBQzhDLE9BQUksQ0FBQ2xvQixTQUFTLEVBQUVrb0IsT0FBSSxDQUFDaGtCLFNBQVMsRUFBRXFHLFNBQVMsQ0FBQztnQkFDOUUsSUFBSWxLLGFBQWEsR0FBRztrQkFDbEJnbEIsUUFBUSxFQUFFNkMsT0FBSSxDQUFDbG9CLFNBQVM7a0JBQ3hCUyxVQUFVLEVBQUUwa0IsU0FBUztrQkFDckJoa0IsZ0JBQWdCLEVBQUV5UCxVQUFVO2tCQUM1QnBQLGlCQUFpQixFQUFFOG1CLGlCQUFpQixhQUFqQkEsaUJBQWlCLHVCQUFqQkEsaUJBQWlCLENBQUU5bUIsaUJBQWlCO2tCQUN2REMsY0FBYyxFQUFFNm1CLGlCQUFpQixhQUFqQkEsaUJBQWlCLHVCQUFqQkEsaUJBQWlCLENBQUU3bUIsY0FBYztrQkFDakQwaUIsUUFBUTtrQkFDUm1CLFFBQVEsRUFBRTRDLE9BQUksQ0FBQ2hrQjtnQkFDakIsQ0FBQztnQkFDRCxJQUFJZ2tCLE9BQUksQ0FBQ0ssV0FBVyxFQUFFO2tCQUNwQmxvQixhQUFhLENBQUNtb0IsZ0JBQWdCLEdBQUdqZSxTQUFTO2dCQUM1QztnQkFDQSxNQUFNMmQsT0FBSSxDQUFDM0MsZ0JBQWdCLENBQUNsbEIsYUFBYSxFQUFFdVEsVUFBVSxFQUFFMFgsaUJBQWlCLGFBQWpCQSxpQkFBaUIsdUJBQWpCQSxpQkFBaUIsQ0FBRTltQixpQkFBaUIsRUFBRThtQixpQkFBaUIsYUFBakJBLGlCQUFpQix1QkFBakJBLGlCQUFpQixDQUFFN21CLGNBQWMsRUFBRSxHQUFHLENBQUM7Z0JBQ3BJeW1CLE9BQUksQ0FBQzluQixhQUFhLENBQUNDLGFBQWEsQ0FBQztnQkFDakMsSUFBSTZuQixPQUFJLENBQUNwb0IsU0FBUyxDQUFDdkUsZUFBZSxFQUFFO2tCQUNsQzhFLGFBQWEsQ0FBQ21sQixRQUFRLEdBQUdOLFlBQVk7Z0JBQ3ZDO2dCQUNBLElBQUkzYSxTQUFTLENBQUNvSixRQUFRLEtBQUssSUFBSSxFQUFFO2tCQUMvQixNQUFNdVUsT0FBSSxDQUFDekMsa0JBQWtCLENBQUNwbEIsYUFBYSxDQUFDO2tCQUM1QzZuQixPQUFJLENBQUM1aUIsYUFBYSxFQUFFO2tCQUNwQmMsT0FBTyxFQUFFO2dCQUNYLENBQUMsTUFBTTtrQkFBQSxJQUFBcWlCLFdBQUE7a0JBQ0wsSUFBTUMsVUFBVSxHQUFHLE9BQU87a0JBQzFCLElBQU1DLGFBQWEsTUFBQWpQLE1BQUEsQ0FBTW5QLFNBQVMsQ0FBQ3FlLFlBQVksT0FBQWxQLE1BQUEsRUFBQStPLFdBQUEsR0FBSWxlLFNBQVMsY0FBQWtlLFdBQUEsdUJBQVRBLFdBQUEsQ0FBV0ksV0FBVyxDQUFFO2tCQUMzRSxJQUFNQyxZQUFZLEdBQUczSixJQUFJLENBQUNDLFNBQVMsQ0FBQzdVLFNBQVMsQ0FBQztrQkFDOUMsTUFBTTJkLE9BQUksQ0FBQzdSLGtCQUFrQixDQUFDcVMsVUFBVSxFQUFFSSxZQUFZLEVBQUVILGFBQWEsQ0FBQyxDQUFDLENBQUM7O2tCQUV4RVQsT0FBSSxDQUFDNWlCLGFBQWEsRUFBRTtrQkFDcEJvUCxNQUFNLEVBQUU7Z0JBQ1Y7Y0FDRjtZQUNGLENBQUM7WUFBQSxnQkFuRUs2SCxzQkFBc0JBLENBQUE7Y0FBQSxPQUFBOEwsTUFBQSxDQUFBeGdCLEtBQUEsT0FBQWhFLFNBQUE7WUFBQTtVQUFBLEdBbUUzQjtVQUNELENBQUF1a0IscUJBQUEsR0FBQUYsT0FBSSxDQUFDaEssZUFBZSxjQUFBa0sscUJBQUEsdUJBQXBCQSxxQkFBQSxDQUFzQi9nQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVrVixzQkFBc0IsQ0FBQztRQUN6RSxDQUFDLENBQUMsT0FBT3BYLENBQUMsRUFBRTtVQUNWLElBQUlpUixZQUFZLEdBQUcsa0JBQWtCO1VBQ3JDLElBQUlqUixDQUFDLENBQUN3TixPQUFPLEVBQUU7WUFDYnlELFlBQVksSUFBSSxJQUFJLEdBQUdqUixDQUFDLENBQUN3TixPQUFPO1VBQ2xDO1VBQ0EsS0FBSyxDQUFDO1VBQ04sTUFBTXVWLE9BQUksQ0FBQzdSLGtCQUFrQixDQUFDLE9BQU8sRUFBRWxSLENBQUMsRUFBRWlSLFlBQVksQ0FBQyxDQUFDLENBQUM7VUFDekQ4UixPQUFJLENBQUM1aUIsYUFBYSxFQUFFO1VBQ3BCb1AsTUFBTSxFQUFFO1FBQ1Y7TUFDRixDQUFDO01BQUEsaUJBQUFxVSxHQUFBLEVBQUFDLEdBQUE7UUFBQSxPQUFBYixNQUFBLENBQUF0Z0IsS0FBQSxPQUFBaEUsU0FBQTtNQUFBO0lBQUEsSUFBQztFQUNKO0VBQ0F5Z0IsMEJBQTBCQSxDQUFDM1QsT0FBTyxFQUFFc1ksVUFBVSxFQUFFO0lBQzlDO0lBQ0EsSUFBSSxJQUFJLENBQUMva0IsU0FBUyxJQUFJLElBQUksQ0FBQ3BFLFNBQVMsQ0FBQ2hCLGdCQUFnQixHQUFHLENBQUMsSUFBSSxJQUFJLENBQUNnQixTQUFTLENBQUN6RCxZQUFZLElBQUksSUFBSSxDQUFDd1gsd0JBQXdCLEdBQUcsQ0FBQyxFQUFFO01BQzdILElBQUlxVixtQkFBbUIsR0FBR3BmLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQyxJQUFJLENBQUN2USxTQUFTLENBQUNoQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMrVSx3QkFBd0IsQ0FBQztNQUNsRyxJQUFJLElBQUksQ0FBQ0UsbUJBQW1CLENBQUMvUCxNQUFNLEtBQUtrbEIsbUJBQW1CLEVBQUU7UUFDM0QsSUFBSSxDQUFDblYsbUJBQW1CLENBQUNvVixLQUFLLEVBQUU7UUFDaEMsSUFBSSxJQUFJLENBQUNaLFdBQVcsRUFBRSxJQUFJLENBQUNhLHlCQUF5QixDQUFDRCxLQUFLLEVBQUU7TUFDOUQ7TUFDQSxJQUFJLENBQUNwVixtQkFBbUIsQ0FBQ3NGLElBQUksQ0FBQzFJLE9BQU8sQ0FBQztNQUN0QyxJQUFJLElBQUksQ0FBQzRYLFdBQVcsRUFBRTtRQUNwQixJQUFJLENBQUNhLHlCQUF5QixDQUFDL1AsSUFBSSxDQUFDNFAsVUFBVSxDQUFDO1FBQy9DLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDVjs7TUFFQSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ1Y7RUFDRjs7RUFFTXhELGtCQUFrQkEsQ0FBQ3BsQixhQUFhLEVBQUU7SUFBQSxJQUFBZ3BCLE9BQUE7SUFBQSxPQUFBbHFCLGlCQUFBO01BQ3RDO01BQ0EsSUFBSWtCLGFBQWEsQ0FBQ2lsQixRQUFRLEVBQUU7UUFDMUIsTUFBTStELE9BQUksQ0FBQ3hrQixhQUFhLENBQUN3a0IsT0FBSSxDQUFDcHVCLFdBQVcsQ0FBQ1osb0JBQW9CLENBQUM7TUFDakUsQ0FBQyxNQUFNO1FBQ0wsTUFBTWd2QixPQUFJLENBQUN4a0IsYUFBYSxDQUFDd2tCLE9BQUksQ0FBQ3B1QixXQUFXLENBQUNiLFdBQVcsQ0FBQztNQUN4RDtNQUNBLElBQU1tTyxNQUFNLEdBQUc7UUFDYitnQixZQUFZLEVBQUU7VUFDWlQsV0FBVyxFQUFFLE1BQU07VUFDbkJVLGNBQWMsRUFBRTtRQUNsQixDQUFDO1FBQ0RoaEIsTUFBTSxFQUFFLFNBQVM7UUFDakJsSSxhQUFhLEVBQUVBO01BQ2pCLENBQUM7TUFDRCxJQUFJZ3BCLE9BQUksQ0FBQ2psQixXQUFXLEVBQUU7UUFDcEJpbEIsT0FBSSxDQUFDamxCLFdBQVcsQ0FBQ21FLE1BQU0sQ0FBQztRQUN4QjhnQixPQUFJLENBQUNqbEIsV0FBVyxHQUFHLElBQUk7TUFDekIsQ0FBQyxNQUFNO1FBQ0wsS0FBSyxDQUFDO01BQ1I7SUFBQztFQUNIO0VBQ01pUyxrQkFBa0JBLENBQUNxUyxVQUFVLEVBQUV2akIsQ0FBQyxFQUFFaVIsWUFBWSxFQUFFO0lBQUEsSUFBQW9ULE9BQUE7SUFBQSxPQUFBcnFCLGlCQUFBO01BQ3BELE1BQU1xcUIsT0FBSSxDQUFDM2tCLGFBQWEsQ0FBQzJrQixPQUFJLENBQUN2dUIsV0FBVyxDQUFDWCxVQUFVLENBQUM7TUFDckQsSUFBSW12QixXQUFXLEdBQUcsRUFBRTtNQUNwQixJQUFJdGtCLENBQUMsYUFBREEsQ0FBQyxlQUFEQSxDQUFDLENBQUVzRixRQUFRLEVBQUUsRUFBRWdmLFdBQVcsSUFBSXRrQixDQUFDLENBQUNzRixRQUFRLEVBQUU7TUFDOUMsSUFBSXRGLENBQUMsYUFBREEsQ0FBQyxlQUFEQSxDQUFDLENBQUV1a0IsS0FBSyxFQUFFRCxXQUFXLElBQUl0a0IsQ0FBQyxDQUFDdWtCLEtBQUs7TUFDcEMsSUFBTW5oQixNQUFNLEdBQUc7UUFDYitnQixZQUFZLEVBQUU7VUFDWlQsV0FBVyxFQUFFSCxVQUFVO1VBQ3ZCYSxjQUFjLEVBQUVuVDtRQUNsQixDQUFDO1FBQ0Q3TixNQUFNLEVBQUUsUUFBUTtRQUNoQmxJLGFBQWEsRUFBRTtVQUNiZ2xCLFFBQVEsRUFBRW1FLE9BQUksQ0FBQ3hwQixTQUFTO1VBQ3hCMnBCLFlBQVksRUFBRUY7UUFDaEI7TUFDRixDQUFDO01BQ0QsSUFBSUQsT0FBSSxDQUFDbmxCLFdBQVcsRUFBRTtRQUNwQm1sQixPQUFJLENBQUNubEIsV0FBVyxDQUFDa0UsTUFBTSxDQUFDO1FBQ3hCaWhCLE9BQUksQ0FBQ25sQixXQUFXLEdBQUcsSUFBSTtNQUN6QixDQUFDLE1BQU07UUFDTCxLQUFLLENBQUM7TUFDUjtJQUFDO0VBQ0g7RUFDTVcsZ0JBQWdCQSxDQUFBLEVBQUc7SUFBQSxJQUFBNGtCLE9BQUE7SUFBQSxPQUFBenFCLGlCQUFBO01BQ3ZCLElBQU0wcUIsZ0JBQWdCLEdBQUdELE9BQUksQ0FBQ2hxQixtQkFBbUIsRUFBRTtNQUNuRCxJQUFJLENBQUNncUIsT0FBSSxDQUFDeHFCLFdBQVcsRUFBRSxJQUFJeXFCLGdCQUFnQixLQUFLRCxPQUFJLENBQUM5dUIsaUJBQWlCLENBQUNOLFdBQVcsRUFBRTtRQUNsRixLQUFLLENBQUM7UUFDTixNQUFNb3ZCLE9BQUksQ0FBQzVxQixVQUFVLEVBQUU7TUFDekIsQ0FBQyxNQUFNO1FBQ0wsSUFBSTZxQixnQkFBZ0IsS0FBS0QsT0FBSSxDQUFDOXVCLGlCQUFpQixDQUFDTCxPQUFPLEVBQUU7VUFDdkQsS0FBSyxDQUFDO1VBQ04sTUFBTW12QixPQUFJLENBQUM1akIsZUFBZSxFQUFFO1FBQzlCLENBQUMsTUFBTSxJQUFJNmpCLGdCQUFnQixLQUFLRCxPQUFJLENBQUM5dUIsaUJBQWlCLENBQUNQLElBQUksRUFBRTtVQUMzRCxLQUFLLENBQUM7UUFDUixDQUFDLE1BQU07VUFDTCxNQUFNLElBQUl3SCxLQUFLLDZDQUFBMlgsTUFBQSxDQUE2Q2tRLE9BQUksQ0FBQ3hxQixXQUFXLEVBQUUsMkJBQUFzYSxNQUFBLENBQXdCa1EsT0FBSSxDQUFDaHFCLG1CQUFtQixFQUFFLEVBQUc7UUFDckk7TUFDRjtJQUFDO0VBQ0g7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVNc0YsZUFBZUEsQ0FBQSxFQUFHO0lBQUEsSUFBQTRrQixPQUFBO0lBQUEsT0FBQTNxQixpQkFBQTtNQUN0QjJxQixPQUFJLENBQUN0bUIsT0FBTyxDQUFDLFdBQVcsQ0FBQztNQUN6QnNtQixPQUFJLENBQUN6a0IsT0FBTyxFQUFFO01BQ2QsTUFBTXlrQixPQUFJLENBQUNyVSx5QkFBeUIsRUFBRTtNQUN0QyxNQUFNcVUsT0FBSSxDQUFDckcsbUJBQW1CLEVBQUU7TUFDaEMsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNNeGUsaUJBQWlCQSxDQUFBLEVBQUc7SUFBQSxJQUFBOGtCLE9BQUE7SUFBQSxPQUFBNXFCLGlCQUFBO01BQ3hCNHFCLE9BQUksQ0FBQ3ZtQixPQUFPLENBQUMsYUFBYSxDQUFDO01BQzNCdW1CLE9BQUksQ0FBQzFrQixPQUFPLEVBQUU7TUFDZDBrQixPQUFJLENBQUNqcUIsU0FBUyxDQUFDekQsWUFBWSxHQUFHLElBQUk7TUFDbEMsTUFBTTB0QixPQUFJLENBQUN0VSx5QkFBeUIsRUFBRTtNQUN0QyxNQUFNc1UsT0FBSSxDQUFDOUIscUJBQXFCLEVBQUU7TUFDbEMsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNNK0IsY0FBY0EsQ0FBQSxFQUFHO0lBQUEsSUFBQUMsT0FBQTtJQUFBLE9BQUE5cUIsaUJBQUE7TUFDckIsS0FBSyxDQUFDO01BQ044cUIsT0FBSSxDQUFDN0gsaUJBQWlCLEdBQUcsS0FBSztNQUM5QjZILE9BQUksQ0FBQy9ILFFBQVEsRUFBRTtNQUNmLE1BQU0rSCxPQUFJLENBQUMva0IsZUFBZSxFQUFFO0lBQUM7RUFDL0I7RUFDQWdkLFFBQVFBLENBQUEsRUFBRztJQUNULElBQUksQ0FBQ3lCLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN4QixJQUFNO01BQ0o5VTtJQUNGLENBQUMsR0FBRzlWLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtJQUM3QixJQUFJMk8sTUFBTSxFQUFFO01BQ1YsSUFBTXFiLGFBQWEsR0FBR3JiLE1BQU0sQ0FBQzJCLFVBQVUsQ0FBQyxJQUFJLEVBQUU7UUFDNUNDLGtCQUFrQixFQUFFO01BQ3RCLENBQUMsQ0FBQztNQUNGeVosYUFBYSxDQUFDQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRXRiLE1BQU0sQ0FBQ3JTLEtBQUssRUFBRXFTLE1BQU0sQ0FBQzRDLE1BQU0sQ0FBQztJQUM1RDtFQUNGO0VBQ0E2RSxVQUFVQSxDQUFBLEVBQUc7SUFDWDhULG9CQUFvQixDQUFDLElBQUksQ0FBQ0MseUJBQXlCLENBQUM7SUFDcEQsSUFBSSxJQUFJLENBQUN4VSxRQUFRLEVBQUU7TUFDakIsSUFBSSxDQUFDQSxRQUFRLENBQUN5VSxJQUFJLElBQUksSUFBSSxDQUFDelUsUUFBUSxDQUFDeVUsSUFBSSxFQUFFO01BQzFDLElBQUlDLE1BQU0sR0FBRyxJQUFJLENBQUMxVSxRQUFRLENBQUMyVSxTQUFTLElBQUksSUFBSSxDQUFDM1UsUUFBUSxDQUFDMlUsU0FBUyxFQUFFO01BQ2pFLEtBQUssQ0FBQztNQUNOLElBQUlELE1BQU0sSUFBSUEsTUFBTSxDQUFDdm1CLE1BQU0sRUFBRTtRQUMzQnVtQixNQUFNLENBQUNFLE9BQU8sQ0FBQ0MsS0FBSyxJQUFJQSxLQUFLLENBQUNKLElBQUksRUFBRSxDQUFDO01BQ3ZDO01BQ0EsSUFBSSxDQUFDelUsUUFBUSxHQUFHLElBQUk7SUFDdEI7RUFDRjs7RUFFQTtFQUNBeFEsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsSUFBSSxDQUFDNkksdUJBQXVCLEVBQUU7SUFDOUIsSUFBSSxDQUFDTixlQUFlLEVBQUU7SUFDdEIsSUFBSSxDQUFDRyxrQkFBa0IsRUFBRTtJQUN6QixJQUFJLENBQUNFLHlCQUF5QixFQUFFO0VBQ2xDO0VBQ0EwYyxpQkFBaUJBLENBQUEsRUFBRztJQUNsQixJQUFJLENBQUNockIsYUFBYSxHQUFHLEtBQUs7SUFDMUIsSUFBSSxDQUFDSCxXQUFXLEdBQUcsS0FBSztJQUN4QixJQUFJLENBQUNGLGtCQUFrQixHQUFHLElBQUksQ0FBQ3hFLGlCQUFpQixDQUFDTixXQUFXO0lBQzVELElBQUksQ0FBQzRuQixpQkFBaUIsR0FBRyxLQUFLO0VBQ2hDO0VBQ0E3TSxtQ0FBbUNBLENBQUEsRUFBRztJQUNwQyxJQUFJLElBQUksQ0FBQ0MsOEJBQThCLEVBQUU7TUFDdkNvVixZQUFZLENBQUMsSUFBSSxDQUFDcFYsOEJBQThCLENBQUM7TUFDakQsSUFBSSxDQUFDQSw4QkFBOEIsR0FBRyxJQUFJO0lBQzVDO0VBQ0Y7QUFDRjtBQUNBLGVBQWVoYyxPQUFPIn0=
