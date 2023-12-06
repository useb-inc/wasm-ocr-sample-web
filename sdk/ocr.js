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
                  ssa_mode: _this26.__ssaMode,
                  ocr_api_response: ocrResult
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
          (_this26$__captureButt = _this26.__captureButton) === null || _this26$__captureButt === void 0 ? void 0 : _this26$__captureButt.addEventListener('click', __onClickCaptureButton);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNzYVJldHJ5VHlwZSIsInNzYVJldHJ5UGl2b3QiLCJzc2FNYXhSZXRyeUNvdW50IiwidXNlRGVidWdBbGVydCIsInByZWxvYWRpbmciLCJvblByZWxvYWRlZCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJpc1ByZWxvYWRlZCIsInNob3dPQ1JMb2FkaW5nVUkiLCJfX3ByZWxvYWRpbmdTdGF0dXMiLCJfX2xvYWRSZXNvdXJjZXMiLCJfX3ByZWxvYWRlZCIsImhpZGVPQ1JMb2FkaW5nVUkiLCJpc0luaXRpYWxpemVkIiwiX19pbml0aWFsaXplZCIsImdldFByZWxvYWRpbmdTdGF0dXMiLCJpc0VuY3J5cHRNb2RlIiwiX19vcHRpb25zIiwiaXNDcmVkaXRDYXJkIiwiX19vY3JUeXBlIiwicHJlbG9hZGluZ1VJV3JhcCIsImdldE9DUkVsZW1lbnRzIiwiZGlzcGxheSIsImVuY3J5cHRSZXN1bHQiLCJyZXZpZXdfcmVzdWx0IiwiX19pc1N1cHBvcnRXYXNtIiwiaW5jbHVkZUxpc3QiLCJlbmNyeXB0ZWQiLCJvY3JfcmVzdWx0IiwiXyIsInRvUGFpcnMiLCJwaWNrIiwicmVkdWNlIiwiYWNjIiwiX3JlZiIsImtleSIsInZhbHVlIiwiX19lbmNyeXB0U2NhblJlc3VsdCIsIm9jcl9vcmlnaW5faW1hZ2UiLCJfb2JqZWN0U3ByZWFkIiwiZXhjbHVkZUxpc3QiLCJvbWl0IiwiX3JlZjIiLCJvY3JfbWFza2luZ19pbWFnZSIsIm9jcl9mYWNlX2ltYWdlIiwiZ2V0T0NSRW5naW5lIiwiX19PQ1JFbmdpbmUiLCJpbml0Iiwic2V0dGluZ3MiLCJsaWNlbnNlS2V5IiwiRXJyb3IiLCJfX2xpY2Vuc2UiLCJtZXJnZWRPcHRpb25zIiwibWVyZ2UiLCJzZXRPcHRpb24iLCJfX3dpbmRvd0V2ZW50QmluZCIsIl9fZGV2aWNlSW5mbyIsImdldE9zVmVyc2lvbiIsImdldE9wdGlvbiIsImdldE9jclR5cGUiLCJ0eXBlIiwiX19vY3JUeXBlTnVtYmVyVG9TdHJpbmciLCJnZXQiLCJnZXRPY3JUeXBlTnVtYmVyIiwic3RyaW5nIiwiX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIiLCJnZXRVSU9yaWVudGF0aW9uIiwiX191aU9yaWVudGF0aW9uIiwiZ2V0VmlkZW9PcmllbnRhdGlvbiIsIl9fdmlkZW9PcmllbnRhdGlvbiIsImNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlIiwiX3RoaXMyIiwiX19pc1N3aXRjaFRvU2VydmVyTW9kZSIsImxhdGVuY3lQZXIxMDBtcyIsIm1lYXN1cmVSZXBvcnQiLCJfX2RlYnVnIiwic3RhcnRPQ1IiLCJvblN1Y2Nlc3MiLCJvbkZhaWx1cmUiLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwiX3RoaXMzIiwib25JblByb2dyZXNzQ2hhbmdlIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX19zc2FNb2RlIiwiaW5kZXhPZiIsIl9fb25TdWNjZXNzIiwiX19vbkZhaWx1cmUiLCJfX29uSW5Qcm9ncmVzc0NoYW5nZSIsIl9fdG9wVUkiLCJ0b3BVSSIsIl9fbWlkZGxlVUkiLCJtaWRkbGVVSSIsIl9fYm90dG9tVUkiLCJib3R0b21VSSIsIl9fY2hhbmdlU3RhZ2UiLCJfX3ByZXByb2Nlc3MiLCJfX3NldHVwRG9tRWxlbWVudHMiLCJfX3ByZWxvYWRpbmdXYXNtIiwiX19zdGFydFNjYW5TZXJ2ZXIiLCJfX3N0YXJ0U2Nhbldhc20iLCJlIiwic3RvcE9DUiIsImNsZWFudXAiLCJfX2Nsb3NlQ2FtZXJhIiwic2V0SWdub3JlQ29tcGxldGUiLCJ2YWwiLCJlbmNyeXB0IiwicGxhaW5TdHIiLCJyZXN0YXJ0T0NSIiwib2NyVHlwZSIsIl9hcmd1bWVudHMyIiwiX3RoaXM0IiwiaXNTd2l0Y2hNb2RlIiwiX193YWl0UHJlbG9hZGVkIiwiX3RoaXM1Iiwid2FpdGluZ1JldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNoZWNrIiwic2V0VGltZW91dCIsImNvbnZlcnRUeXBlVG9OdW1iZXIiLCJvcHRpb24iLCJpc05hTiIsInBhcnNlSW50IiwiX3RoaXNfIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwic2tpcFRvdWNoQWN0aW9uZm9yWm9vbSIsImV2IiwidG91Y2hlcyIsInByZXZlbnREZWZhdWx0Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJvbmJlZm9yZXVubG9hZCIsIl9fcGFnZUVuZCIsImhhbmRsZVJlc2l6ZSIsIl9yZWY0IiwiX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUiLCJfX3Rocm90dGxpbmdSZXNpemVUaW1lciIsImFwcGx5IiwiX190aHJvdHRsaW5nUmVzaXplRGVsYXkiLCJtc2ciLCJfX3NsZWVwIiwibXMiLCJfX2Jsb2JUb0Jhc2U2NCIsImJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsIl9fYmFzZTY0dG9CbG9iIiwiYmFzZTY0IiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsIm1pbWVTdHJpbmciLCJhYiIsIkFycmF5QnVmZmVyIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwiX19jb21wcmVzZUJhc2U2NEltYWdlIiwib3B0aW9ucyIsImNvbnN0YW50TnVtYmVyIiwiX3RoaXM2IiwiYmxvYkZpbGUiLCJjb21wcmVzc2VkIiwiY29tcHJlc3NJbWFnZSIsImNvbXByZXNzaW9uUmF0aW8iLCJNYXRoIiwicm91bmQiLCJzaXplIiwiX19nZXRTdHJpbmdPbldhc21IZWFwIiwibGVuZ3RoQnl0ZXMiLCJsZW5ndGhCeXRlc1VURjgiLCJfX3N0cmluZ09uV2FzbUhlYXAiLCJfbWFsbG9jIiwic3RyaW5nVG9VVEY4Iiwib2NyUmVzdWx0Iiwic3RyaW5nT25XYXNtSGVhcCIsInRvU3RyaW5nIiwianNvblN0cmluZyIsIl9mcmVlIiwiX19zZXRWaWRlb1Jlc29sdXRpb24iLCJ2aWRlb0VsZW1lbnQiLCJfdGhpczciLCJpc1N1cHBvcnRlZFJlc29sdXRpb24iLCJyZXNvbHV0aW9uVGV4dCIsIl9fY2FtU2V0Q29tcGxldGUiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJzcmNPYmplY3QiLCJfX3ZpZGVvV2lkdGgiLCJfX3ZpZGVvSGVpZ2h0IiwiX19nZXRTY2FubmVyQWRkcmVzcyIsIl9fb2NyVHlwZUxpc3QiLCJpbmNsdWRlcyIsImFkZHJlc3MiLCJkZXN0cm95Q2FsbGJhY2siLCJnZXRJRENhcmRTY2FubmVyIiwiZGVzdHJveUlEQ2FyZFNjYW5uZXIiLCJnZXRQYXNzcG9ydFNjYW5uZXIiLCJkZXN0cm95UGFzc3BvcnRTY2FubmVyIiwiZ2V0QWxpZW5TY2FubmVyIiwiZGVzdHJveUFsaWVuU2Nhbm5lciIsImdldENyZWRpdFNjYW5uZXIiLCJkZXN0cm95Q3JlZGl0U2Nhbm5lciIsIl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MiLCJfX3JldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19nZXRCdWZmZXIiLCJfX0J1ZmZlciIsIl9fcmVzb2x1dGlvbldpZHRoIiwiX19yZXNvbHV0aW9uSGVpZ2h0IiwiX19yZXN1bHRCdWZmZXIiLCJfX21hc2tJbmZvUmVzdWx0QnVmIiwiX19nZXRJbWFnZUJhc2U2NCIsIm1hc2tNb2RlIiwiaW1nTW9kZSIsIl9hcmd1bWVudHMzIiwiX3RoaXM4IiwiaW1nVHlwZSIsImVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZSIsImVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZSIsImpwZ1NpemUiLCJnZXRFbmNvZGVkSnBnU2l6ZSIsImpwZ1BvaW50ZXIiLCJnZXRFbmNvZGVkSnBnQnVmZmVyIiwicmVzdWx0VmlldyIsIkhFQVA4IiwiYnVmZmVyIiwiZGVzdHJveUVuY29kZWRKcGciLCJfX2Rlc3Ryb3lCdWZmZXIiLCJfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlciIsIl9fZGVzdHJveVByZXZJbWFnZSIsIl9fUHJldkltYWdlIiwiX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCIsIl9fZGVzdHJveVNjYW5uZXJBZGRyZXNzIiwiX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrIiwiX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUiLCJfdGhpczkiLCJfX2dldFJvdGF0aW9uRGVncmVlIiwiX19nZXRNaXJyb3JNb2RlIiwiX19jcm9wSW1hZ2VGcm9tVmlkZW8iLCJfdGhpczEwIiwiY2FsY1Jlc29sdXRpb25fdyIsImNhbGNSZXNvbHV0aW9uX2giLCJ2aWRlbyIsImNhbnZhcyIsInJvdGF0aW9uQ2FudmFzIiwiY2FsY0NhbnZhcyIsImNhbGNWaWRlb1dpZHRoIiwiY2FsY1ZpZGVvSGVpZ2h0IiwiY2FsY1ZpZGVvQ2xpZW50V2lkdGgiLCJjbGllbnRXaWR0aCIsImNhbGNWaWRlb0NsaWVudEhlaWdodCIsImNsaWVudEhlaWdodCIsImNhbGNDcm9wSW1hZ2VTaXplV2lkdGgiLCJfX2Nyb3BJbWFnZVNpemVXaWR0aCIsImNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0IiwiX19jcm9wSW1hZ2VTaXplSGVpZ2h0IiwiY2FsY1ZpZGVvT3JpZW50YXRpb24iLCJpc0FsaWVuQmFjayIsIl9faXNSb3RhdGVkOTBvcjI3MCIsImNhbGNNYXhTV2lkdGgiLCJjYWxjTWF4U0hlaWdodCIsInN4Iiwic3kiLCJyYXRpbyIsInNXaWR0aCIsIm1pbiIsInNIZWlnaHQiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjYWxjQ29udGV4dCIsImdldENvbnRleHQiLCJ3aWxsUmVhZEZyZXF1ZW50bHkiLCJkcmF3SW1hZ2UiLCJpbWdEYXRhIiwiaW1nRGF0YVVybCIsImdldEltYWdlRGF0YSIsInRvRGF0YVVSTCIsIl9fcm90YXRlIiwiZGVncmVlIiwiaW1nIiwiSW1hZ2UiLCJ0ZW1wQ2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwidGVtcENvbnRleHQiLCJwb3NpdGlvbiIsImhlaWdodCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsIlBJIiwibmV3SW1hZ2VEYXRhIiwicmVzdG9yZSIsIl9faXNDYXJkYm94RGV0ZWN0ZWQiLCJfYXJndW1lbnRzNCIsIl90aGlzMTEiLCJib3hUeXBlIiwicmV0cnlJbWciLCJzZXQiLCJkYXRhIiwia29yIiwiYWxpZW4iLCJwYXNzcG9ydCIsImRldGVjdF9pZGNhcmRfb3B0IiwiZGV0ZWN0X2lkY2FyZCIsIm1lc3NhZ2UiLCJfX3N0YXJ0UmVjb2duaXRpb24iLCJzc2FNb2RlIiwiaXNTZXRJZ25vcmVDb21wbGV0ZSIsIl90aGlzMTIiLCJyZXN1bHRCdWZmZXIiLCJyZWNvZ25pdGlvbiIsIl9yZWY3IiwiX29jclJlc3VsdCIsIl9vY3JSZXN1bHQyIiwic2NhbklEQ2FyZCIsInNjYW5QYXNzcG9ydCIsInNjYW5BbGllbiIsInNjYW5BbGllbkJhY2siLCJzY2FuQ3JlZGl0IiwiX19jc3ZUb09iamVjdCIsImNvbXBsZXRlIiwiX19tYW51YWxPQ1JSZXRyeUNvdW50IiwiX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50IiwicXVldWVJZHgiLCJfX2RldGVjdGVkQ2FyZFF1ZXVlIiwiX19ibHVyQ2FwdHVyZUJ1dHRvbiIsIl9fc2V0U3R5bGUiLCJfeCIsIm9jckltYWdlTW9kZSIsIk9DUl9JTUdfTU9ERSIsIm9yaWdpbkltYWdlIiwiT0NSX0lNR19NQVNLX01PREUiLCJtYXNrSW1hZ2UiLCJmYWNlSW1hZ2UiLCJfX3N0YXJ0VHJ1dGgiLCJyZWplY3QiLCJzY2FuVHJ1dGgiLCJzdHIiLCJwYWlycyIsIm9iaiIsInBhaXIiLCJfX2dldE1hc2tJbmZvIiwibWFza0luZm9SZXN1bHRCdWYiLCJnZXRNYXNrUmVjdCIsIl9fc3RhcnRUcnV0aFJldHJ5IiwiX3RoaXMxMyIsIl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciIsIl90aGlzMTQiLCJfX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciIsIl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciIsIl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24iLCJfdGhpczE1IiwiaXNQYXNzcG9ydCIsIl9fc2V0dXBWaWRlbyIsIl9fc3RyZWFtIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwicGxheSIsIl9fYWRqdXN0U3R5bGUiLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsIm5hbWUiLCJlcnJvck1lc3NhZ2UiLCJfX29uRmFpbHVyZVByb2Nlc3MiLCJzdG9wU3RyZWFtIiwiX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQiLCJlbCIsImFzc2lnbiIsIl9fY2hhbmdlT0NSU3RhdHVzIiwiX19vY3JTdGF0dXMiLCJfYXJndW1lbnRzNSIsIl90aGlzMTYiLCJmb3JjZVVwZGF0ZSIsInJlY29nbml6ZWRJbWFnZSIsIl9fcHJldmlvdXNJblByb2dyZXNzU3RlcCIsIl9faW5Qcm9ncmVzc1N0ZXAiLCJndWlkZUJveCIsIm1hc2tCb3hXcmFwIiwiY2FwdHVyZUJ1dHRvbiIsImJvcmRlcldpZHRoIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJDb2xvciIsIl9tYXNrQm94V3JhcCRxdWVyeVNlbCIsInF1ZXJ5U2VsZWN0b3IiLCJfY2FwdHVyZUJ1dHRvbiRxdWVyeVMiLCJvY3JNb2RlIiwiY2FsbCIsIl9fdXBkYXRlUHJldmlld1VJIiwiX19oaWRlUHJldmlld1VJIiwicHJldmlld1VJV3JhcCIsInByZXZpZXdJbWFnZSIsImltZ1N0eWxlIiwiY29udGV4dCIsIl9fZ2V0SW5wdXREZXZpY2VzIiwiX3RoaXMxNyIsIm1lZGlhRGV2aWNlcyIsImRldmljZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiY2FtZXJhIiwiZGV2aWNlIiwia2luZCIsIklucHV0RGV2aWNlSW5mbyIsImdldENhcGFiaWxpdGllcyIsIl9jYXAkZmFjaW5nTW9kZSIsImNhcCIsImZhY2luZ01vZGUiLCJfX2ZhY2luZ01vZGVDb25zdHJhaW50IiwiX2RldmljZSRsYWJlbCIsImlzVWx0cmFDYW1lcmFSZWciLCJsYWJlbCIsInB1c2giLCJkZXZpY2VJZCIsIlJlZmVyZW5jZUVycm9yIiwiX2RldmljZSRsYWJlbDIiLCJpc0JhY2tDYW1lcmFSZWciLCJjb25jYXQiLCJjaGVja1VJT3JpZW50YXRpb24iLCJjdXJyZW50Iiwib2NyIiwiaXNDaGFuZ2VkIiwiX19wcmV2VWlPcmllbnRhdGlvbiIsIl9fY2xlYXJDdXN0b21VSSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsIl90aGlzMTgiLCJ2aWRlb1dyYXAiLCJndWlkZUJveFdyYXAiLCJwcmV2ZW50VG9GcmVlemVWaWRlbyIsImN1c3RvbVVJV3JhcCIsImNhcHR1cmVVSVdyYXAiLCJjYXB0dXJlVUkiLCJwcmV2aWV3VUkiLCJzd2l0Y2hVSVdyYXAiLCJzd2l0Y2hVSSIsInByZWxvYWRpbmdVSSIsInJlbW92ZSIsIm9jclN0eWxlIiwid3JhcFN0eWxlIiwibWFyZ2luIiwib3ZlcmZsb3ciLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsIm1hc2tfZnJhbWUiLCJ2aWRlb1N0eWxlIiwicm90YXRlQ3NzIiwibWlycm9yQ3NzIiwicm90YXRlQW5kTWlycm9yQ3NzIiwidHJhbnNmb3JtIiwiY2FudmFzU3R5bGUiLCJsZWZ0IiwidG9wIiwiYm9yZGVyIiwicmlnaHQiLCJib3R0b20iLCJjdXN0b21VSVdyYXBTdHlsZSIsImNhcHR1cmVVSVdyYXBTdHlsZSIsImN1cnNvciIsImNhcHR1cmVCdXR0b25TcmNTVkciLCJfX29uQ2xpY2tDYXB0dXJlQnV0dG9uIiwicHJldmlld1VJV3JhcFN0eWxlIiwic3dpdGNoVUlXcmFwU3R5bGUiLCJzd2l0Y2hIVE1MIiwic3dpdGNoQ2hlY2tib3giLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9fb25DbGlja1N3aXRjaFVJIiwiX3JlZjEwIiwiZXZlbnQiLCJ0YXJnZXQiLCJjaGVja2VkIiwiX3gyIiwib25jZSIsInByZWxvYWRpbmdVSVdyYXBTdHlsZSIsIl9faW5pdFN0eWxlIiwiX19vY3IiLCJfX2NhbnZhcyIsIl9fcm90YXRpb25DYW52YXMiLCJfX3ZpZGVvIiwiX192aWRlb1dyYXAiLCJfX2d1aWRlQm94IiwiX19ndWlkZUJveFdyYXAiLCJfX21hc2tCb3hXcmFwIiwiX19wcmV2ZW50VG9GcmVlemVWaWRlbyIsIl9fY3VzdG9tVUlXcmFwIiwiX19jYXB0dXJlVUlXcmFwIiwiX19jYXB0dXJlVUkiLCJfX2NhcHR1cmVCdXR0b24iLCJfX3ByZXZpZXdVSVdyYXAiLCJfX3ByZXZpZXdVSSIsIl9fcHJldmlld0ltYWdlIiwiX19zd2l0Y2hVSVdyYXAiLCJfX3N3aXRjaFVJIiwiX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uIiwiZ2V0QXR0cmlidXRlIiwiX3RoaXMxOSIsImNvbnN0cmFpbnRXaWR0aCIsImNvbnN0cmFpbnRIZWlnaHQiLCJpZGVhbCIsImNvbnN0cmFpbnRzIiwiYXVkaW8iLCJ6b29tIiwiZm9jdXNNb2RlIiwid2hpdGVCYWxhbmNlTW9kZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRVc2VyTWVkaWEiLCJzdHJlYW0iLCJzdHJlYW1TZXR0aW5ncyIsImdldFZpZGVvVHJhY2tzIiwiZ2V0U2V0dGluZ3MiLCJhc3BlY3RSYXRpbyIsIl90aGlzMjAiLCJiYXNlV2lkdGgiLCJiYXNlSGVpZ2h0Iiwic2Nhbm5lckZyYW1lUmF0aW8iLCJndWlkZUJveFdpZHRoIiwiZ3VpZGVCb3hIZWlnaHQiLCJjYWxjT2NyQ2xpZW50V2lkdGgiLCJjYWxjT2NyQ2xpZW50SGVpZ2h0IiwiZ3VpZGVCb3hSYXRpb0J5V2lkdGgiLCJfX2d1aWRlQm94UmF0aW9CeVdpZHRoIiwidmlkZW9SYXRpb0J5SGVpZ2h0IiwiX192aWRlb1JhdGlvQnlIZWlnaHQiLCJyZWR1Y2VkR3VpZGVCb3hXaWR0aCIsIl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbyIsInJlZHVjZWRHdWlkZUJveEhlaWdodCIsInBhZGRpbmciLCJ2aWRlb0lubmVyR2FwIiwiYmFja2dyb3VuZENvbG9yIiwibWFza0JveElubmVyIiwiciIsIm1hc2tCb3hJbm5lcldpZHRoIiwibWFza0JveElubmVySGVpZ2h0IiwiX3RoaXMyMSIsIl9fY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJhIiwiYiIsIm5ld1ZpZGVvV2lkdGgiLCJuZXdWaWRlb0hlaWdodCIsIm5ld1ZpZGVvUmF0aW9CeVdpZHRoIiwibmV3VmlkZW9SYXRpb0J5SGVpZ2h0IiwiY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzIiwiX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzIiwiY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQiLCJjYXB0dXJlVUlQYWRkaW5nQm90dG9tIiwicGFkZGluZ1RvcCIsImJhc2VsaW5lIiwic3VtIiwiaXRlbSIsImNoaWxkTm9kZXMiLCJzdG9wU2NhbiIsIl90aGlzMjIiLCJfX3Jlc291cmNlc0xvYWRlZCIsIl9faXNTdXBwb3J0U2ltZCIsImVudkluZm8iLCJvcyIsIm9zU2ltcGxlIiwidXNlYk9DUkVudkluZm8iLCJzZGtTdXBwb3J0RW52IiwidXJsIiwiZmV0Y2giLCJocmVmIiwidGhlbiIsInJlcyIsInRleHQiLCJyZWdleCIsInNvdXJjZSIsInJlcGxhY2UiLCJSZWdFeHAiLCJldmFsIiwib25SdW50aW1lSW5pdGlhbGl6ZWQiLCJfcmVmMTEiLCJfeDMiLCJfX3N0YXJ0U2Nhbldhc21JbXBsIiwiX3RoaXMyMyIsIl9fZGV0ZWN0ZWQiLCJfX2FkZHJlc3MiLCJfX3NzYVJldHJ5Q291bnQiLCJzY2FuIiwiX3JlZjEyIiwiaXNEZXRlY3RlZENhcmQiLCJzc2FSZXN1bHQiLCJzc2FSZXN1bHRMaXN0IiwibWFza0luZm8iLCJyZXNvbHV0aW9uX3ciLCJyZXNvbHV0aW9uX2giLCJfX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZSIsInJldHJ5U3RhcnREYXRlIiwiRGF0ZSIsIkZBS0UiLCJSRUFMIiwiRU5TRU1CTEUiLCJpc0NvbXBsZXRlZCIsIl9sb29wIiwiZXhlY3V0ZSIsIl9yZWYxMyIsIl9yZXQiLCJyZXRyeVdvcmtpbmdUaW1lIiwibGVnYWN5Rm9ybWF0IiwibmV3Rm9ybWF0IiwicGFyc2VPY3JSZXN1bHQiLCJvY3JfdHlwZSIsInNzYV9tb2RlIiwiX19jb21wcmVzc0ltYWdlcyIsIm9jcl9kYXRhIiwiX19vblN1Y2Nlc3NQcm9jZXNzIiwiX19yZWNvdmVyZWQiLCJfdGhpczI0IiwicmVzaXplUmF0aW8iLCJkZWZhdWx0T3B0aW9ucyIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiY29udmVydFNpemUiLCJ0YXJnZXRDb21wcmVzc1ZvbHVtZSIsIm1hc2tpbmdJbWFnZU9wdGlvbnMiLCJxdWFsaXR5IiwiX19yZXF1ZXN0R2V0QVBJVG9rZW4iLCJjcmVkZW50aWFsIiwiYXV0aFNlcnZlckluZm8iLCJiYXNlVXJsIiwiYm9keSIsIm1ldGhvZCIsImpzb24iLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInRva2VuIiwiY2F0Y2giLCJlcnIiLCJfX3JlcXVlc3RTZXJ2ZXJPQ1IiLCJfdGhpczI1IiwiX3JlZjE0Iiwib2NyU2VydmVyQmFzZVVybCIsImFwaVRva2VuIiwibXlIZWFkZXJzIiwiSGVhZGVycyIsImFwcGVuZCIsInJhdyIsImltYWdlX2Jhc2U2NCIsIm1hc2tfbW9kZSIsImZhY2VfbW9kZSIsInJlcXVlc3RPcHRpb25zIiwicmVkaXJlY3QiLCJfeDQiLCJfeDUiLCJfX3N0YXJ0U2NhblNlcnZlckltcGwiLCJfdGhpczI2IiwiX3JlZjE1IiwiX3RoaXMyNiRfX2NhcHR1cmVCdXR0IiwiX3JlZjE2IiwiYmFzZTY0SW1hZ2VSZXN1bHQiLCJvY3JfYXBpX3Jlc3BvbnNlIiwiX3g2IiwiX3g3IiwiaW1nRGF0YVVSTCIsImxpbWl0U2F2ZUltYWdlQ291bnQiLCJzaGlmdCIsIl9fZGVidWdNb2RlIiwiX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NCIsIl90aGlzMjciLCJhcGlfcmVzcG9uc2UiLCJyZXN1bHRfY29kZSIsInJlc3VsdF9tZXNzYWdlIiwicmVzdWx0Q29kZSIsIl90aGlzMjgiLCJlcnJvckRldGFpbCIsInN0YWNrIiwiZXJyb3JfZGV0YWlsIiwiX3RoaXMyOSIsInByZWxvYWRpbmdTdGF0dXMiLCJfdGhpczMwIiwiX3RoaXMzMSIsIl9fcmVjb3ZlcnlTY2FuIiwiX3RoaXMzMiIsImNhbnZhc0NvbnRleHQiLCJjbGVhclJlY3QiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIl9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQiLCJzdG9wIiwidHJhY2tzIiwiZ2V0VHJhY2tzIiwiZm9yRWFjaCIsInRyYWNrIiwicmVzdG9yZUluaXRpYWxpemUiLCJjbGVhclRpbWVvdXQiXSwic291cmNlcyI6WyJvY3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGdsb2JhbC1tb2R1bGUgKi9cbmltcG9ydCBkZXRlY3RvciBmcm9tICcuL2hlbHBlcnMvZGV0ZWN0b3IuanMnO1xuaW1wb3J0IHVzZWJPQ1JXQVNNUGFyc2VyIGZyb20gJy4vaGVscGVycy91c2ViLW9jci13YXNtLXBhcnNlci5qcyc7XG5pbXBvcnQgdXNlYk9DUkFQSVBhcnNlciBmcm9tICcuL2hlbHBlcnMvdXNlYi1vY3ItYXBpLXBhcnNlci5qcyc7XG5pbXBvcnQgeyBpc1N1cHBvcnRXYXNtLCBtZWFzdXJlLCBzaW1kLCB0aHJlYWRzIH0gZnJvbSAnLi9oZWxwZXJzL3dhc20tZmVhdHVyZS1kZXRlY3QuanMnO1xuaW1wb3J0IEltYWdlVXRpbCBmcm9tICcuL2hlbHBlcnMvaW1hZ2UtdXRpbC5qcyc7XG5sZXQgaW5zdGFuY2U7XG5jbGFzcyBVc2VCT0NSIHtcbiAgSU5fUFJPR1JFU1MgPSB7XG4gICAgTk9ORTogJ25vbmUnLFxuICAgIE5PVF9SRUFEWTogJ25vdF9yZWFkeScsXG4gICAgUkVBRFk6ICdyZWFkeScsXG4gICAgQ0FSRF9ERVRFQ1RfU1VDQ0VTUzogJ2RldGVjdF9zdWNjZXNzJyxcbiAgICBDQVJEX0RFVEVDVF9GQUlMRUQ6ICdkZXRlY3RfZmFpbGVkJyxcbiAgICBNQU5VQUxfQ0FQVFVSRV9TVUNDRVNTOiAnbWFudWFsX2NhcHR1cmVfc3VjY2VzcycsXG4gICAgTUFOVUFMX0NBUFRVUkVfRkFJTEVEOiAnbWFudWFsX2NhcHR1cmVfZmFpbGVkJyxcbiAgICBPQ1JfUkVDT0dOSVpFRDogJ3JlY29nbml6ZWQnLFxuICAgIE9DUl9SRUNPR05JWkVEX1dJVEhfU1NBOiAncmVjb2duaXplZF93aXRoX3NzYScsXG4gICAgT0NSX1NVQ0NFU1M6ICdvY3Jfc3VjY2VzcycsXG4gICAgT0NSX1NVQ0NFU1NfV0lUSF9TU0E6ICdvY3Jfc3VjY2Vzc193aXRoX3NzYScsXG4gICAgT0NSX0ZBSUxFRDogJ29jcl9mYWlsZWQnXG4gIH07XG4gIE9DUl9TVEFUVVMgPSB7XG4gICAgTk9UX1JFQURZOiAtMSxcbiAgICBSRUFEWTogMCxcbiAgICBPQ1JfU1VDQ0VTUzogMSxcbiAgICBET05FOiAyXG4gIH07XG4gIFBSRUxPQURJTkdfU1RBVFVTID0ge1xuICAgIE5PVF9TVEFSVEVEOiAtMSxcbiAgICBTVEFSVEVEOiAwLFxuICAgIERPTkU6IDFcbiAgfTtcbiAgT0NSX0lNR19NT0RFID0ge1xuICAgIFdBUlBJTkc6IDAsXG4gICAgQ1JPUFBJTkc6IDEsXG4gICAgTk9ORTogMlxuICB9O1xuICBPQ1JfSU1HX01BU0tfTU9ERSA9IHtcbiAgICBGQUxTRTogMCxcbiAgICBUUlVFOiAxXG4gIH07XG5cbiAgLyoqIHB1YmxpYyBwcm9wZXJ0aWVzICovXG5cbiAgLyoqIHByaXZhdGUgcHJvcGVydGllcyAqL1xuICBfX2RlYnVnTW9kZSA9IGZhbHNlO1xuICBfX09DUkVuZ2luZSA9IG51bGw7XG4gIF9faXNTdXBwb3J0V2FzbSA9IGZhbHNlO1xuICBfX2lzU3VwcG9ydFNpbWQgPSBmYWxzZTtcbiAgX19pbml0aWFsaXplZCA9IGZhbHNlO1xuICBfX3ByZWxvYWRlZCA9IGZhbHNlO1xuICBfX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEO1xuICBfX2xpY2Vuc2U7XG4gIF9fb2NyVHlwZTtcbiAgX19zc2FNb2RlID0gZmFsc2U7XG4gIF9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk5PVF9SRUFEWTtcbiAgX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID0gMTA7XG4gIF9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gIF9fc3NhUmV0cnlDb3VudCA9IDA7XG4gIF9fZGV0ZWN0ZWRDYXJkUXVldWUgPSBbXTtcbiAgX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NCA9IFtdO1xuICBfX29uU3VjY2VzcyA9IG51bGw7XG4gIF9fb25GYWlsdXJlID0gbnVsbDtcbiAgX19vbkluUHJvZ3Jlc3NDaGFuZ2UgPSBudWxsO1xuICBfX29jclR5cGVMaXN0ID0gWydpZGNhcmQnLCAnZHJpdmVyJywgJ3Bhc3Nwb3J0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnYWxpZW4nLCAnYWxpZW4tYmFjaycsICdjcmVkaXQnLCAnaWRjYXJkLXNzYScsICdkcml2ZXItc3NhJywgJ3Bhc3Nwb3J0LXNzYScsICdmb3JlaWduLXBhc3Nwb3J0LXNzYScsICdhbGllbi1zc2EnXTtcbiAgX19vY3JUeXBlTnVtYmVyVG9TdHJpbmcgPSBuZXcgTWFwKFtbJzEnLCAnaWRjYXJkJ10sIFsnMicsICdkcml2ZXInXSwgWyczJywgJ3Bhc3Nwb3J0J10sIFsnNCcsICdmb3JlaWduLXBhc3Nwb3J0J10sIFsnNScsICdhbGllbiddLCBbJzUtMScsICdhbGllbiddLCBbJzUtMicsICdhbGllbiddLCBbJzUtMycsICdhbGllbiddXSk7XG4gIF9fb2NyU3RyaW5nVG9UeXBlTnVtYmVyID0gbmV3IE1hcChbWydpZGNhcmQnLCAnMSddLCBbJ2RyaXZlcicsICcyJ10sIFsncGFzc3BvcnQnLCAnMyddLCBbJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnNCddLCBbJ2FsaWVuJywgJzUnXSwgWydhbGllbicsICc1LTEnXSwgWydhbGllbicsICc1LTInXSwgWydhbGllbicsICc1LTMnXV0pO1xuICBfX3BhZ2VFbmQgPSBmYWxzZTtcbiAgX19vY3I7XG4gIF9fY2FudmFzO1xuICBfX3JvdGF0aW9uQ2FudmFzO1xuICBfX3ZpZGVvO1xuICBfX3ZpZGVvV3JhcDtcbiAgX19ndWlkZUJveDtcbiAgX19ndWlkZUJveFdyYXA7XG4gIF9fbWFza0JveFdyYXA7XG4gIF9fcHJldmVudFRvRnJlZXplVmlkZW87XG4gIF9fY3VzdG9tVUlXcmFwO1xuICBfX3RvcFVJO1xuICBfX21pZGRsZVVJO1xuICBfX2JvdHRvbVVJO1xuICBfX3ByZXZpZXdVSVdyYXA7XG4gIF9fcHJldmlld1VJO1xuICBfX3ByZXZpZXdJbWFnZTtcbiAgX19jYXB0dXJlVUlXcmFwO1xuICBfX2NhcHR1cmVVSTtcbiAgX19zd2l0Y2hVSVdyYXA7XG4gIF9fc3dpdGNoVUk7XG4gIF9fY2FwdHVyZUJ1dHRvbjtcbiAgX19hZGRyZXNzID0gMDtcbiAgX19kZXRlY3RlZCA9IGZhbHNlO1xuICBfX3JlY292ZXJlZCA9IGZhbHNlO1xuICBfX0J1ZmZlciA9IG51bGw7XG4gIF9fcmVzdWx0QnVmZmVyID0gbnVsbDtcbiAgX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IG51bGw7XG4gIF9fUHJldkltYWdlID0gbnVsbDtcbiAgX19zdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgX19jYW1TZXRDb21wbGV0ZSA9IGZhbHNlO1xuICBfX3Jlc29sdXRpb25XaWR0aCA9IDA7XG4gIF9fcmVzb2x1dGlvbkhlaWdodCA9IDA7XG4gIF9fdmlkZW9XaWR0aCA9IDA7XG4gIF9fdmlkZW9IZWlnaHQgPSAwO1xuICBfX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICBfX2ludGVydmFsVGltZXI7XG4gIF9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcjtcbiAgX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgPSAwO1xuICBfX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkO1xuICBfX3N0cmVhbTtcbiAgX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrID0gbnVsbDtcbiAgX19mYWNpbmdNb2RlQ29uc3RyYWludCA9ICdlbnZpcm9ubWVudCc7XG4gIF9fdWlPcmllbnRhdGlvbiA9ICcnO1xuICBfX3ByZXZVaU9yaWVudGF0aW9uID0gJyc7XG4gIF9fdmlkZW9PcmllbnRhdGlvbiA9ICcnO1xuICBfX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IG51bGw7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5ID0gNTAwO1xuICBfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzID0gMzAwOyAvLyDsnoTsi5xcbiAgX19yZXRyeUNvdW50R2V0QWRkcmVzcyA9IDA7IC8vIOyehOyLnFxuICBfX2RldmljZUluZm87XG4gIF9faXNSb3RhdGVkOTBvcjI3MCA9IGZhbHNlO1xuICBfX2luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFk7XG4gIF9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9IHRoaXMuSU5fUFJPR1JFU1MuTk9ORTtcbiAgX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSBmYWxzZTtcbiAgX19ndWlkZUJveFJhdGlvQnlXaWR0aCA9IDEuMDsgLy8g7IiY7KCV67aI6rCAXG4gIF9fdmlkZW9SYXRpb0J5SGVpZ2h0ID0gMC45OyAvLyDsiJjsoJXrtojqsIBcbiAgX19ndWlkZUJveFJlZHVjZVJhdGlvID0gMC44OyAvLyDsiJjsoJXrtojqsIBcbiAgX19jcm9wSW1hZ2VTaXplV2lkdGggPSAwO1xuICBfX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSAwO1xuICBfX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZmFsc2U7XG5cbiAgLyoqIERlZmF1bHQgb3B0aW9ucyAqL1xuICBfX29wdGlvbnMgPSBuZXcgT2JqZWN0KHtcbiAgICAvLyDrlJTrsoTquYUg7Ji17IWYXG4gICAgc2hvd0NsaXBGcmFtZTogZmFsc2UsXG4gICAgLy8gY2lscC1mcmFtZSDrs7TquLBcbiAgICBzaG93Q2FudmFzUHJldmlldzogZmFsc2UsXG4gICAgLy8gY2FudmFzIHByZXZpZXcg67O06riwXG5cbiAgICAvLyDstpzroKUg7Ji17IWYXG4gICAgLy8g7JWU7Zi47ZmUXG4gICAgdXNlRW5jcnlwdE1vZGU6IGZhbHNlLFxuICAgIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKOqwnOyduOqzoOycoOyLneuzhOu2gO2YuCDqtIDroKgg7ZWt66qpIOyVlO2YuO2ZlClcbiAgICB1c2VFbmNyeXB0QWxsTW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo7KCE7LK0IOyVlO2YuO2ZlCwgZW5jcnlwdCBvYmplY3Qg67OE64+EIOygnOqztSlcbiAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgIC8vIHVzZVBpaUVuY3J5cHRNb2RlOiBmYWxzZSwgLy8g7JWU7Zi47ZmUIOyggeyaqSAocGlpKVxuICAgIC8vIHVzZVBpaUVuY3J5cHRGYWNlOiBmYWxzZSwgLy8g7Iug67aE7KadIOyWvOq1tOyCrOynhCDslZTtmLjtmZQg7KCB7JqpIChwaWkpXG4gICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgdXNlTGVnYWN5Rm9ybWF0OiBmYWxzZSxcbiAgICAvLyBMZWdhY3kgZm9ybWF0IOyngOybkFxuICAgIHVzZU1hc2tJbmZvOiB0cnVlLFxuICAgIC8vIOuniOyKpO2CuSDsooztkZwg7KeA7JuQXG4gICAgdXNlRmFjZUltYWdlOiB0cnVlLFxuICAgIC8vIOyLoOu2hOymnSDrgrQg7Ja86rW0IOyCrOynhFxuICAgIHVzZUltYWdlV2FycGluZzogZmFsc2UsXG4gICAgLy8g7Iug67aE7KadIOydtOuvuOyngOulvCBXYXJwaW5nKOyZnOqzoSDrs7TsoJUg7ZWg7KeAIOyXrOu2gClcbiAgICB1c2VDb21wcmVzc0ltYWdlOiBmYWxzZSxcbiAgICAvLyDsi6DrtoTspp0g7J2066+47KeA66W8IOyVley2le2VoOyngCDsl6zrtoBcbiAgICB1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGg6IDEwODAsXG4gICAgLy8g7J2066+47KeAIOumrOyCrOydtOynlSDqsIDroZwg7ZW07IOB64+EXG4gICAgdXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZTogMTAyNCAqIDUwLFxuICAgIC8vIOydtOuvuOyngCDslZXstpUg66qp7ZGcIOyaqeufiVxuXG4gICAgLy8gVUkg7ISk7KCVXG4gICAgdXNlVG9wVUk6IHRydWUsXG4gICAgLy8g7IOB64uoIFVJXG4gICAgdXNlVG9wVUlUZXh0TXNnOiBmYWxzZSxcbiAgICAvL+yDgeuLqCBVSSA+IFRFWFRcbiAgICB1c2VNaWRkbGVVSTogdHJ1ZSxcbiAgICAvL+ykkeuLqCBVSVxuICAgIHVzZU1pZGRsZVVJVGV4dE1zZzogdHJ1ZSxcbiAgICAvLyDspJHri6ggVUkgPiBURVhUXG4gICAgdXNlQm90dG9tVUk6IHRydWUsXG4gICAgLy8g7ZWY64uoIFVJXG4gICAgdXNlQm90dG9tVUlUZXh0TXNnOiBmYWxzZSxcbiAgICAvLyDtlZjri6ggVUkgPiBURVhUXG4gICAgdXNlUHJldmlld1VJOiB0cnVlLFxuICAgIC8vIFByZXZpZXcgVUlcbiAgICB1c2VDYXB0dXJlVUk6IHRydWUsXG4gICAgLy8g7Lqh7LKY67KE7Yq8IFVJXG4gICAgcHJlbG9hZGluZ1VJVGV4dE1zZzogJ+yLoOu2hOymneyduOymnSDrqqjrk4jsnYQg67aI65+s7Jik64qUIOykkSDsnoXri4jri6Q8YnIgLz7snqDsi5zrp4wg6riw64uk66Ck7KO87IS47JqUJyxcbiAgICAvLyDsnbjsi50g7ZSE66CI7J6EIOyYteyFmFxuICAgIGZyYW1lQm9yZGVyU3R5bGU6IHtcbiAgICAgIHdpZHRoOiA1LFxuICAgICAgLy8gYm9yZGVyLXdpZHRoXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgLy8gYm9yZGVyLXJhZGl1c1xuICAgICAgc3R5bGU6ICdzb2xpZCcsXG4gICAgICAvLyBib3JkZXItc3R5bGVcblxuICAgICAgLy8g64uo6rOE67OEIOyduOyLnSDtlITroIjsnoQgYm9yZGVyIOyDieyDgVxuICAgICAgbm90X3JlYWR5OiAnIzAwMDAwMCcsXG4gICAgICAvLyDsiqTsupTspIDruYQgOiDqsoDsoJVcbiAgICAgIHJlYWR5OiAnI2I4YjhiOCcsXG4gICAgICAvLyDsiqTsupTrjIDquLAgOiDtmozsg4lcbiAgICAgIGRldGVjdF9zdWNjZXNzOiAnIzVlOGZmZicsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7ISx6rO1IDog7ZWY64qYXG4gICAgICBkZXRlY3RfZmFpbGVkOiAnIzcyNWI2NycsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7Iuk7YyoIDog67O06528XG4gICAgICBtYW51YWxfY2FwdHVyZV9zdWNjZXNzOiAnIzVlOGZmZicsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7ISx6rO1IDog7ZWY64qYXG4gICAgICBtYW51YWxfY2FwdHVyZV9mYWlsZWQ6ICcjNzI1YjY3JyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDsi6TtjKggOiDrs7TrnbxcbiAgICAgIHJlY29nbml6ZWQ6ICcjMDAzYWMyJyxcbiAgICAgIC8vIE9DUuyZhOujjCA6IO2MjOuekVxuICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogJyMwMDNhYzInLFxuICAgICAgLy8g7IKs67O47YyQ67OE7KSRKOyCrOuzuO2MkOuzhCBPTikgOiDtjIzrnpFcbiAgICAgIG9jcl9zdWNjZXNzOiAnIzE0YjAwZScsXG4gICAgICAvLyBPQ1LsmYTro4wgOiDstIjroZ1cbiAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiAnIzE0YjAwZScsXG4gICAgICAvLyBPQ1LsmYTro4wo7IKs67O47YyQ67OEIE9OKSA6IOy0iOuhnVxuICAgICAgb2NyX2ZhaWxlZDogJyNGQTExM0QnIC8vIE9DUuyLpO2MqCA6IOu5qOqwlVxuICAgIH0sXG5cbiAgICAvLyDrp4jsiqTtgawg7ZSE66CI7J6EIGZpbGwg7Lus65+sIOuzgOqyvSDsgqzsmqkg7Jes67aAXG4gICAgdXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2U6IHRydWUsXG4gICAgLy8g66eI7Iqk7YGsIO2UhOugiOyehCDsmLXshZggKOy5tOuplOudvCDruYTrlJTsmKQg7JiB7Jet7JeQ7IScIOyduOyLnSDtlITroIjsnoTrp4wg67O07J206rKMIO2VmOqzoCDrgpjrqLjsp4Drpbwg642u7Ja07JOw64qUIO2UhOugiOyehCDsmIHsl60pXG4gICAgbWFza0ZyYW1lU3R5bGU6IHtcbiAgICAgIGNsaXBfZnJhbWU6ICcjZmYwMGJmJyxcbiAgICAgIC8vIGNsaXAtZnJhbWUg7IOJ7IOBIDog65Sl7Y287ZSMICjsiJjsoJXrtojqsIApXG4gICAgICBiYXNlX2NvbG9yOiAnIzMzMzMzMycsXG4gICAgICAvLyBtYXNrLWZyYW1lIOyDieyDgSA6IOuLpO2BrOq3uOugiOydtCAo7Yis66qF64+E64qUIOyImOygleu2iOqwgCBmZuuhnCDqs6DsoJUpXG5cbiAgICAgIC8vIOuLqOqzhOuzhCDrp4jsiqTtgawg7ZSE66CI7J6EIGZpbGwg7IOJ7IOBXG4gICAgICBub3RfcmVhZHk6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyKpOy6lOykgOu5hFxuICAgICAgcmVhZHk6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyKpOy6lOuMgOq4sFxuICAgICAgZGV0ZWN0X3N1Y2Nlc3M6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDshLHqs7VcbiAgICAgIGRldGVjdF9mYWlsZWQ6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDsi6TtjKhcbiAgICAgIG1hbnVhbF9jYXB0dXJlX3N1Y2Nlc3M6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDshLHqs7VcbiAgICAgIG1hbnVhbF9jYXB0dXJlX2ZhaWxlZDogJyMzMzMzMzMnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyLpO2MqFxuICAgICAgcmVjb2duaXplZDogJyMyMjIyMjInLFxuICAgICAgLy8gT0NS7JmE66OMXG4gICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiAnIzIyMjIyMicsXG4gICAgICAvLyDsgqzrs7jtjJDrs4TspJEo7IKs67O47YyQ67OEIE9OKVxuICAgICAgb2NyX3N1Y2Nlc3M6ICcjMTExMTExJyxcbiAgICAgIC8vT0NS7JmE66OMXG4gICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogJyMxMTExMTEnLFxuICAgICAgLy8gT0NS7JmE66OMKOyCrOuzuO2MkOuzhCBPTilcbiAgICAgIG9jcl9mYWlsZWQ6ICcjMTExMTExJyAvLyBPQ1Lsi6TtjKhcbiAgICB9LFxuXG4gICAgLy8g7LSs7JiB7Ji17IWYXG4gICAgdXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZTogZmFsc2UsXG4gICAgLy8g7KCA7IKs7JaRIOuLqOunkOyXkOyEnCDshJzrsoRPQ1LroZwg7J6Q64+ZIOyghO2ZmCDquLDriqVcbiAgICB1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGU6IGZhbHNlLFxuICAgIC8vIOyImOuPmeycvOuhnCDshJzrsoRPQ1Ig7KCE7ZmYIOq4sOuKpSAo7IiY64+Z7J20IHRydWXsnbTrqbQg7J6Q64+Z7J2AIOustOyLnOuQqClcbiAgICBzd2l0Y2hUb1NlcnZlclRocmVzaG9sZDogMjAuMCxcbiAgICAvLyDsnpDrj5nsoITtmZgg6riw7KSA6rCSICjshLHriqUg7Lih7KCV7LmYIG1zKVxuICAgIHVzZUZvcmNlQ29tcGxldGVVSTogZmFsc2UsXG4gICAgLy8gV0FTTSDrqqjrk5zsnbzrlYwg67KE7Yq8IOuIhOulvOyLnCDtlbTri7kg7Iuc7KCQ7JeQIOqwleygnOuhnCDsmYTro4wg7IKs7Jqp7Jes67aAXG5cbiAgICAvLyDsiJjrj5nstKzsmIEg67KE7Yq8IOyYteyFmFxuICAgIGNhcHR1cmVCdXR0b25TdHlsZToge1xuICAgICAgc3Ryb2tlX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAvLyDrsoTtirwg7YWM65GQ66asKHN0cm9rZSkg7IOJ7IOBXG4gICAgICBiYXNlX2NvbG9yOiAnIzVlOGZmZicgLy8g67KE7Yq8IOyDieyDgVxuICAgIH0sXG5cbiAgICByZXNvdXJjZUJhc2VVcmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgLy8gd2FzbSwgZGF0YSDtjIzsnbwg66as7IaM7IqkIGJhc2Ug6rK966GcIChDRE4g7IKs7Jqp7IucIOuzgOqyvSlcbiAgICBkZXZpY2VMYWJlbDogJycsXG4gICAgdmlkZW9UYXJnZXRJZDogJycsXG4gICAgLy8g7Lm066mU6528IOyEpOyglVxuICAgIHJvdGF0aW9uRGVncmVlOiAwLFxuICAgIC8vIHJvdGF0aW9uLWRlZ3JlZSDsubTrqZTrnbzqsIAg7ZqM7KCE65CcIOqwgeuPhCAoOTAsIDE5MCwgMjcwKVxuICAgIG1pcnJvck1vZGU6IGZhbHNlLFxuICAgIC8vIG1pcnJvci1tb2RlIOyFgO2UvCDsubTrqZTrnbwo7YKk7Jik7Iqk7YGsIOuTsSkg7IKs7Jqp7IucIOyijOyasCDrsJjsoIRcbiAgICBjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsOiAxMDAwLFxuICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIOqwhOqyqShtcylcbiAgICBjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0OiAtMSxcbiAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDstZzrjIAg7Zqf7IiYLCAtMeydtOuptCDrrLTtlZwg7J6s7JqU7LKtLlxuXG4gICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgIDogJ2NvbXBhdGliaWxpdHknICjtmLjtmZjshLEg7Jqw7ISgKSB8fCAnaGlnaFF1YWxpdHknICjqs6DtmZTsp4gg7Jqw7ISgKVxuICAgIC8vIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2NvbXBhdGliaWxpdHknLCAvLyDtmLjtmZjshLEg7Jqw7ISgKOq2jOyepSwg65SU7Y+07Yq4KSA6IDcyMOycvOuhnCDqs6DsoJUsIOyggOyCrOyWkSDri6jrp5DquLAg7Zi47ZmY7ISxIOyii+ydjFxuICAgIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2hpZ2hRdWFsaXR5JyxcbiAgICAvLyDqs6DtmZTsp4gg7Jqw7ISgIDogMTA4MOydtCDqsIDriqXtlZjrqbQgMTA4MCDrtojqsIDriqXtlZjrqbQgNzIwXG5cbiAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOyEpOyglSA6ICdjYW1lcmFSZXNvbHV0aW9uJyAo7Lm066mU6528IO2VtOyDgeuPhCkgfHwgJ29jclZpZXdTaXplJyAob2NyIGRpdiDtgazquLApXG4gICAgY2FsY0d1aWRlQm94Q3JpdGVyaWE6ICdjYW1lcmFSZXNvbHV0aW9uJyxcbiAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOq4sOykgCjqtozsnqUsIOuUlO2PtO2KuCkgOiA3MjB4MTI4MCDtlbTsg4Hrj4Qo7IS466Gc66qo65OcKSDsnbzrlYwgb2NyIHZpZXcgd2lkdGggc2l6ZeqwgCA3MjDrs7Tri6Qg7YGwIOqyveyasCwg6rCA7J2065OcIOuwleyKpOulvCA3MjDsl5Ag66ee7LakIChwcmV2aWV3IO2ZlOuptCDquajsp5Ag7JeG7J2MKVxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhOiAnb2NyVmlld1NpemUnLCAvLyDtmZTrqbQg7IKs7J207KaIIOq4sOykgCA6IDcyMHgxMjgwIO2VtOyDgeuPhCjshLjroZzrqqjrk5wpIOydvOuVjCBvY3IgdmlldyB3aWR0aCBzaXpl6rCAIDcyMOuztOuLpCDtgbDqsr3smrAsIOqwgOydtOuTnCDrsJXsiqTrpbwgb2NyIHZpZXcgd2lkdGgg7IKs7JeQ7KaI7JeQIOunnuy2pCAocHJldmlldyDtmZTrqbQg6rCV7KCc66GcIOuKmOumrOq4sCDrlYzrrLjsl5Ag64uk7IaMIOq5qOynkClcblxuICAgIC8vIOyCrOuzuO2MkOuzhCBSRVRSWSDshKTsoJVcbiAgICAvLyBzc2FSZXRyeVR5cGVcbiAgICAvLyAgIC0gUkVBTCAgICAgOiDrs7jsnbgoUkVBTCkg6rGw67aA7JyoIC0+IEZhbHNlIE5lZ2F0aXZlKOyLpOygnOqwkuydgCBSRUFM7J24642wIOyYiOy4oeqwkuydgCBGQUtF65287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtCxcbiAgICAvLyAgIC0gRkFLRSAgICAgOiDtg4DsnbgoRkFLRSkg7IiY65297JyoIC0+IEZhbHNlIFBvc2l0aXZlKOyLpOygnOqwkuydgCBGQUtF7J24642wIOyYiOy4oeqwkuydgCBSRUFM7J2065287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtFxuICAgIC8vICAgLSBFTlNFTUJMRSA6IO2Pieq3oCDsoIjrjIDqsJIgLT4gc3NhTWF4UmV0cnlDb3VudCDrp4ztgbwg67CY67O1IOyImO2Wie2VmOqzoCBmZF9jb25maWRlbmNlIOygiOuMgOqwkiDqsJLsnZgg7Y+J6reg7Jy866GcIO2MkOyglVxuICAgIC8vIHNzYU1heFJldHJ5Q291bnQg7ISk7KCVIOqwkuunjO2BvCDsnqzsi5zrj4TtlZjsl6wg7ZWc67KI7J20652864+EIOq4sOykgOqwkihSRUFMIOuYkOuKlCBGQUtFKeydtCDrnKjrqbQg6riw7KSA6rCSKFJFQUwg65iQ64qUIEZBS0Up66GcIO2MkOyglVxuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJyxcbiAgICBzc2FSZXRyeVBpdm90OiAwLjUsXG4gICAgLy8gUkVBTC9GQUtF66W8IO2MkOygle2VmOuKlCBmZF9jb25maWRlbmNlIOq4sOykgOqwkiAod2FzbSDrsLDtj6wg67KE7KCE7JeQIOuUsOudvCDri6TrpoQpIOKAuyDsiJjsoJXrtojqsIBcbiAgICBzc2FNYXhSZXRyeUNvdW50OiAwLFxuICAgIC8vIOy1nOuMgCBSRVRSWSDtmozsiJjshKTsoJUgMOydtOuptCDrr7jsgqzsmqlcblxuICAgIC8vIHRoaXMuX19kZWJ1Zygp66W8IO2Gte2VtCDssI3snYAg66mU7Iuc7KeA66W8IGFsZXJ07Jy866GcIOudhOyauOyngCDsl6zrtoBcbiAgICB1c2VEZWJ1Z0FsZXJ0OiBmYWxzZVxuICB9KTtcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGluc3RhbmNlKSByZXR1cm4gaW5zdGFuY2U7XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBwdWJsaWMgbWV0aG9kcyAqL1xuICBhc3luYyBwcmVsb2FkaW5nKG9uUHJlbG9hZGVkKSB7XG4gICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKG9uUHJlbG9hZGVkKSBvblByZWxvYWRlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aGlzLnNob3dPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEO1xuICAgICAgYXdhaXQgdGhpcy5fX2xvYWRSZXNvdXJjZXMoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FO1xuICAgICAgdGhpcy5fX3ByZWxvYWRlZCA9IHRydWU7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgICB0aGlzLmhpZGVPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgaXNJbml0aWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2luaXRpYWxpemVkO1xuICB9XG4gIGlzUHJlbG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9fcHJlbG9hZGVkO1xuICB9XG4gIGdldFByZWxvYWRpbmdTdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzO1xuICB9XG4gIGlzRW5jcnlwdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRBbGxNb2RlO1xuICB9XG4gIGlzQ3JlZGl0Q2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGUgPT09ICdjcmVkaXQnO1xuICB9XG4gIHNob3dPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfVxuICB9XG4gIGhpZGVPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9XG4gIGVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCkge1xuICAgIGlmICh0aGlzLmlzQ3JlZGl0Q2FyZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRW5jcnlwdE1vZGUoKSAmJiB0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGluY2x1ZGVMaXN0ID0gWydqdW1pbicsICdkcml2ZXJfbnVtYmVyJywgJ3Bhc3Nwb3J0X251bWJlcicsICdwZXJzb25hbF9udW1iZXInLCAnbXJ6MiddO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSB7XG4gICAgICAgICAgb2NyX3Jlc3VsdDogXy50b1BhaXJzKF8ucGljayhyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGluY2x1ZGVMaXN0KSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0ID0ge1xuICAgICAgICAgIC4uLnJldmlld19yZXN1bHQub2NyX3Jlc3VsdCxcbiAgICAgICAgICAuLi5lbmNyeXB0ZWQub2NyX3Jlc3VsdFxuICAgICAgICB9O1xuICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBlbmNyeXB0ZWQub2NyX29yaWdpbl9pbWFnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gWydjb21wbGV0ZScsICdyZXN1bHRfc2Nhbl90eXBlJywgJ2NvbG9yX3BvaW50JywgJ2ZvdW5kX2ZhY2UnLCAnc3BlY3VsYXJfcmF0aW8nLCAnc3RhcnRfdGltZScsICdlbmRfdGltZScsICdmZF9jb25maWRlbmNlJywgJ2lkX3RydXRoJywgJ2lkX3RydXRoX3JldHJ5X2NvdW50J107XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICByZXZpZXdfcmVzdWx0LmVuY3J5cHRlZCA9IHtcbiAgICAgICAgICBvY3JfcmVzdWx0OiBfLnRvUGFpcnMoXy5vbWl0KHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgZXhjbHVkZUxpc3QpKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlKSxcbiAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UpLFxuICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfZmFjZV9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0T0NSRW5naW5lKCkge1xuICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lO1xuICB9XG4gIGluaXQoc2V0dGluZ3MpIHtcbiAgICBpZiAoISEhc2V0dGluZ3MubGljZW5zZUtleSkgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIGtleSBpcyBlbXB0eScpO1xuICAgIHRoaXMuX19saWNlbnNlID0gc2V0dGluZ3MubGljZW5zZUtleTtcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zID0gXy5tZXJnZSh7fSwgdGhpcy5fX29wdGlvbnMsIHNldHRpbmdzKTtcbiAgICB0aGlzLnNldE9wdGlvbihtZXJnZWRPcHRpb25zKTtcbiAgICB2b2lkIDA7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhpcy5fX3dpbmRvd0V2ZW50QmluZCgpO1xuICAgICAgdGhpcy5fX2RldmljZUluZm8gPSBkZXRlY3Rvci5nZXRPc1ZlcnNpb24oKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRXYXNtID0gaXNTdXBwb3J0V2FzbSgpO1xuICAgICAgaWYgKCF0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBzdXBwb3J0ZWQuIGluIHRoaXMgYnJvd3Nlci4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHNldE9wdGlvbihzZXR0aW5ncykge1xuICAgIHRoaXMuX19vcHRpb25zID0gc2V0dGluZ3M7XG4gIH1cbiAgZ2V0T3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucztcbiAgfVxuICBnZXRPY3JUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGVOdW1iZXJUb1N0cmluZy5nZXQodHlwZSk7XG4gIH1cbiAgZ2V0T2NyVHlwZU51bWJlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclN0cmluZ1RvVHlwZU51bWJlci5nZXQoc3RyaW5nKTtcbiAgfVxuICBnZXRVSU9yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdWlPcmllbnRhdGlvbjtcbiAgfVxuICBnZXRWaWRlb09yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgfVxuICBhc3luYyBjaGVja1N3aXRjaFRvU2VydmVyTW9kZSgpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAvLyDsiJjrj5nsoITtmZggb24g7J2066m0IOyImOuPmeyghO2ZmCDsmrDshKBcbiAgICAgIHJldHVybiB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOyImOuPmeyghO2ZmCBvZmYg7J2066m0IOyekOuPmeyghO2ZmCDssrTtgaxcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgIC8vIOyekOuPmeyghO2ZmCBvbuydvOuVjFxuICAgICAgICAvLyDshLHriqUg7Lih7KCV6rCS7J2EIOq4sOykgOycvOuhnCBXQVNNIG9yIFNlcnZlclxuICAgICAgICBjb25zdCBbbGF0ZW5jeVBlcjEwMG1zLCBtZWFzdXJlUmVwb3J0XSA9IGF3YWl0IG1lYXN1cmUoKTtcbiAgICAgICAgdGhpcy5fX2RlYnVnKG1lYXN1cmVSZXBvcnQpO1xuICAgICAgICByZXR1cm4gbGF0ZW5jeVBlcjEwMG1zID4gdGhpcy5fX29wdGlvbnMuc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsiJjrj5nsoITtmZjrj4Qgb2ZmLCDsnpDrj5nsoITtmZggb2ZmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgc3RhcnRPQ1IodHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSA9IG51bGwpIHtcbiAgICBpZiAoISEhdHlwZSB8fCAhISFvblN1Y2Nlc3MgfHwgISEhb25GYWlsdXJlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGF3YWl0IHRoaXMuY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUoKTtcbiAgICB0aGlzLl9fb2NyVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fX3NzYU1vZGUgPSB0aGlzLl9fb2NyVHlwZS5pbmRleE9mKCctc3NhJykgPiAtMTtcbiAgICB0aGlzLl9fb25TdWNjZXNzID0gb25TdWNjZXNzO1xuICAgIHRoaXMuX19vbkZhaWx1cmUgPSBvbkZhaWx1cmU7XG4gICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZSA9IG9uSW5Qcm9ncmVzc0NoYW5nZTtcbiAgICBpZiAob25JblByb2dyZXNzQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHtcbiAgICAgICAgdGhpcy5fX3RvcFVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS50b3BVSTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSkge1xuICAgICAgICB0aGlzLl9fbWlkZGxlVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm1pZGRsZVVJO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJKSB7XG4gICAgICAgIHRoaXMuX19ib3R0b21VSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuYm90dG9tVUk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW5pdGlhbGl6ZWQhJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fcHJlcHJvY2VzcygpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwRG9tRWxlbWVudHMoKTtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8gc2VydmVyTW9kZVxuICAgICAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fcHJlbG9hZGluZ1dhc20oKTsgLy8g7ISc67KE66qo65OcIOydtOyngOunjCDslZTtmLjtmZQg7ZWY6riw7JyE7ZW0IHdhc23snYQgcHJlbG9hZGluZyDtlahcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5TZXJ2ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdhc21Nb2RlXG4gICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zdG9wT0NSKCk7XG4gICAgfVxuICB9XG4gIHN0b3BPQ1IoKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gIH1cbiAgc2V0SWdub3JlQ29tcGxldGUodmFsKSB7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zZXRJZ25vcmVDb21wbGV0ZSh2YWwpO1xuICB9XG4gIGVuY3J5cHQocGxhaW5TdHIpIHtcbiAgICByZXR1cm4gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHBsYWluU3RyKTtcbiAgfVxuICBhc3luYyByZXN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UsIGlzU3dpdGNoTW9kZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3dpdGNoTW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdG9wT0NSKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICB9XG5cbiAgLyoqIHByaXZhdGUgbWV0aG9kcyAqL1xuICBhc3luYyBfX3dhaXRQcmVsb2FkZWQoKSB7XG4gICAgbGV0IHdhaXRpbmdSZXRyeUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YWl0aW5nUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9O1xuICAgICAgY2hlY2soKTtcbiAgICB9KTtcbiAgfVxuICBfX3ByZXByb2Nlc3MoKSB7XG4gICAgY29uc3QgY29udmVydFR5cGVUb051bWJlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZUludChvcHRpb24pKSA/IDAgOiBwYXJzZUludChvcHRpb24pO1xuICAgIH07XG4gICAgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgpO1xuICB9XG4gIF9fd2luZG93RXZlbnRCaW5kKCkge1xuICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgaWYgKC9pcGhvbmV8aXBvZHxpcGFkLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBjb25zdCBza2lwVG91Y2hBY3Rpb25mb3Jab29tID0gZXYgPT4ge1xuICAgICAgICBpZiAoZXYudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXNfLl9fcGFnZUVuZCA9IHRydWU7XG4gICAgICBfdGhpc18uY2xlYW51cCgpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEhIV90aGlzXy5fX29jclR5cGUpIHJldHVybjtcbiAgICAgIGlmICghX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplKSB7XG4gICAgICAgIF90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IHRydWU7XG4gICAgICAgIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IG51bGw7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IF90aGlzXy5yZXN0YXJ0T0NSKF90aGlzXy5fX29jclR5cGUsIF90aGlzXy5fX29uU3VjY2VzcywgX3RoaXNfLl9fb25GYWlsdXJlLCBfdGhpc18uX19vbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghISFfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIpIHtcbiAgICAgICAgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dChoYW5kbGVSZXNpemUsIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVEZWxheSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19kZWJ1Zyhtc2cpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlRGVidWdBbGVydCkge1xuICAgICAgdm9pZCAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIF9fc2xlZXAobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gIH1cbiAgX19ibG9iVG9CYXNlNjQoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgXykgPT4ge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgfSk7XG4gIH1cbiAgX19iYXNlNjR0b0Jsb2IoYmFzZTY0KSB7XG4gICAgLy8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xuICAgIGNvbnN0IGJ5dGVTdHJpbmcgPSBhdG9iKGJhc2U2NC5zcGxpdCgnLCcpWzFdKTtcblxuICAgIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgICBjb25zdCBtaW1lU3RyaW5nID0gYmFzZTY0LnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuXG4gICAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXJcbiAgICBjb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgY29uc3QgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHtcbiAgICAgIHR5cGU6IG1pbWVTdHJpbmdcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX2NvbXByZXNlQmFzZTY0SW1hZ2UoYmFzZTY0LCBvcHRpb25zLCBjb25zdGFudE51bWJlcikge1xuICAgIGlmIChiYXNlNjQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGJsb2JGaWxlID0gdGhpcy5fX2Jhc2U2NHRvQmxvYihiYXNlNjQpO1xuICAgIGNvbnN0IGNvbXByZXNzZWQgPSBhd2FpdCBJbWFnZVV0aWwuY29tcHJlc3NJbWFnZShibG9iRmlsZSwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgIGNvbnN0IGNvbXByZXNzaW9uUmF0aW8gPSBNYXRoLnJvdW5kKCgxIC0gY29tcHJlc3NlZC5zaXplIC8gYmxvYkZpbGUuc2l6ZSkgKiAxMDAwMCkgLyAxMDA7XG4gICAgdm9pZCAwO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9fYmxvYlRvQmFzZTY0KGNvbXByZXNzZWQpO1xuICB9XG5cbiAgLyoqIOudvOydtOyEvOyKpCDtgqTrpbwgaGVhcCDsl5AgYWxsb2NhdGlvbiAqL1xuICBfX2dldFN0cmluZ09uV2FzbUhlYXAoKSB7XG4gICAgaWYgKCEhIXRoaXMuX19saWNlbnNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpY2Vuc2UgS2V5IGlzIGVtcHR5Jyk7XG4gICAgfVxuICAgIGNvbnN0IGxlbmd0aEJ5dGVzID0gdGhpcy5fX09DUkVuZ2luZS5sZW5ndGhCeXRlc1VURjgodGhpcy5fX2xpY2Vuc2UpICsgMTtcbiAgICB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyhsZW5ndGhCeXRlcyk7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zdHJpbmdUb1VURjgodGhpcy5fX2xpY2Vuc2UsIHRoaXMuX19zdHJpbmdPbldhc21IZWFwLCBsZW5ndGhCeXRlcyk7XG4gICAgcmV0dXJuIHRoaXMuX19zdHJpbmdPbldhc21IZWFwO1xuICB9XG4gIF9fZW5jcnlwdFNjYW5SZXN1bHQob2NyUmVzdWx0KSB7XG4gICAgbGV0IHN0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIG9jclJlc3VsdCA9PT0gJ251bWJlcicpIG9jclJlc3VsdCA9IG9jclJlc3VsdC50b1N0cmluZygpO1xuICAgICAgaWYgKG9jclJlc3VsdCA9PT0gJycpIHJldHVybiAnJztcbiAgICAgIGlmICh0eXBlb2Ygb2NyUmVzdWx0ICE9PSAnc3RyaW5nJyAmJiAhISFvY3JSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvY3JSZXN1bHQgaXMgZW1wdHknKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBvY3JSZXN1bHQ7XG4gICAgICBjb25zdCBsZW5ndGhCeXRlcyA9IHRoaXMuX19PQ1JFbmdpbmUubGVuZ3RoQnl0ZXNVVEY4KGpzb25TdHJpbmcpICsgMTtcbiAgICAgIHN0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MobGVuZ3RoQnl0ZXMpO1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5zdHJpbmdUb1VURjgoanNvblN0cmluZywgc3RyaW5nT25XYXNtSGVhcCwgbGVuZ3RoQnl0ZXMpO1xuICAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdFJlc3VsdChzdHJpbmdPbldhc21IZWFwKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHN0cmluZ09uV2FzbUhlYXApIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZShzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fc2V0VmlkZW9SZXNvbHV0aW9uKHZpZGVvRWxlbWVudCkge1xuICAgIGxldCBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSBmYWxzZTtcbiAgICBsZXQgcmVzb2x1dGlvblRleHQgPSAnbm90IHJlYWR5JztcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgICByZXNvbHV0aW9uVGV4dFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMCkge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgICAgcmVzb2x1dGlvblRleHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJlc29sdXRpb25UZXh0ID0gdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggKyAneCcgKyB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XG4gICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxMDgwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTkyMCB8fCB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTkyMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDEwODApIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTI4MCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDcyMCB8fCB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gNzIwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTI4MCkge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW9FbGVtZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fX3ZpZGVvV2lkdGggPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aDtcbiAgICB0aGlzLl9fdmlkZW9IZWlnaHQgPSB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgfTtcbiAgfVxuICBfX2dldFNjYW5uZXJBZGRyZXNzKG9jclR5cGUpIHtcbiAgICBpZiAoIXRoaXMuX19vY3JUeXBlTGlzdC5pbmNsdWRlcyhvY3JUeXBlKSkgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgIHRyeSB7XG4gICAgICBsZXQgYWRkcmVzcyA9IDA7XG4gICAgICBsZXQgZGVzdHJveUNhbGxiYWNrID0gbnVsbDtcbiAgICAgIGNvbnN0IHN0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fZ2V0U3RyaW5nT25XYXNtSGVhcCgpO1xuICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgIC8vIE9DUlxuICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0SURDYXJkU2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lJRENhcmRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0UGFzc3BvcnRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveVBhc3Nwb3J0U2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRBbGllblNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95QWxpZW5TY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldENyZWRpdFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95Q3JlZGl0U2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjYW5uZXIgZG9lcyBub3QgZXhpc3RzJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgaWYgKGFkZHJlc3MgPT09IDApIHtcbiAgICAgICAgaWYgKHRoaXMuX19tYXhSZXRyeUNvdW50R2V0QWRkcmVzcyA9PT0gdGhpcy5fX3JldHJ5Q291bnRHZXRBZGRyZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBMaWNlbnNlIEtleScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19yZXRyeUNvdW50R2V0QWRkcmVzcysrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFthZGRyZXNzLCBkZXN0cm95Q2FsbGJhY2tdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRPRE8gOiBMaWNlbnNlIElzc3Vl7J24IOqyveyasCDsl5Drn6wg6rCS7J2EIOuwm+yVhOyEnCBlcnJvciDroZzqt7jrpbwg7LCN7J2EIOyImCDsnojqsowg7JqU7LKt7ZWE7JqUICjsnoTsi5wgTuuyiCDsnbTsg4EgYWRkcmVzc+ulvCDrqrvrsJvsnLzrqbQg6rCV7KCcIOyXkOufrClcbiAgICAgIHZvaWQgMDtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIF9fZ2V0QnVmZmVyKCkge1xuICAgIGlmICghdGhpcy5fX0J1ZmZlcikge1xuICAgICAgdGhpcy5fX0J1ZmZlciA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyh0aGlzLl9fcmVzb2x1dGlvbldpZHRoICogdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQgKiA0KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9fcmVzdWx0QnVmZmVyKSB7XG4gICAgICB0aGlzLl9fcmVzdWx0QnVmZmVyID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKDQwOTYpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0luZm8pIHtcbiAgICAgIGlmICghdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmKSB7XG4gICAgICAgIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyg0MDk2KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFt0aGlzLl9fQnVmZmVyLCB0aGlzLl9fcmVzdWx0QnVmZmVyLCB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWZdO1xuICB9XG4gIGFzeW5jIF9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbWFza01vZGUsIGltZ01vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGltZ1R5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLmVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZShhZGRyZXNzLCBtYXNrTW9kZSwgaW1nTW9kZSk7XG4gICAgICB9IGVsc2UgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLmVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZShhZGRyZXNzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fT0NSRW5naW5lLmdldEVuY29kZWRKcGdTaXplKCk7XG4gICAgICBjb25zdCBqcGdQb2ludGVyID0gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNvZGVkSnBnQnVmZmVyKCk7XG4gICAgICBjb25zdCByZXN1bHRWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fX09DUkVuZ2luZS5IRUFQOC5idWZmZXIsIGpwZ1BvaW50ZXIsIGpwZ1NpemUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkocmVzdWx0Vmlldyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdF0sIHtcbiAgICAgICAgdHlwZTogJ2ltYWdlL2pwZWcnXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9fYmxvYlRvQmFzZTY0KGJsb2IpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUVuY29kZWRKcGcoKTtcbiAgICB9XG4gIH1cblxuICAvKiogRnJlZSBidWZmZXIgKi9cbiAgX19kZXN0cm95QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fQnVmZmVyKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19CdWZmZXIpO1xuICAgICAgdGhpcy5fX0J1ZmZlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX19kZXN0cm95UmVzdWx0QnVmZmVyKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpO1xuICB9XG4gIF9fZGVzdHJveVJlc3VsdEJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX3Jlc3VsdEJ1ZmZlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fcmVzdWx0QnVmZmVyKTtcbiAgICAgIHRoaXMuX19yZXN1bHRCdWZmZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuICBfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zik7XG4gICAgICB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGcmVlIFByZXZJbWFnZSBidWZmZXIgKi9cbiAgX19kZXN0cm95UHJldkltYWdlKCkge1xuICAgIGlmICh0aGlzLl9fUHJldkltYWdlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19QcmV2SW1hZ2UpO1xuICAgICAgdGhpcy5fX1ByZXZJbWFnZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIGZyZWUgc3RyaW5nIGhlYXAgYnVmZmVyICovXG4gIF9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAoKSB7XG4gICAgaWYgKHRoaXMuX19zdHJpbmdPbldhc21IZWFwKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19zdHJpbmdPbldhc21IZWFwKTtcbiAgICAgIHRoaXMuX19zdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogZnJlZSBzY2FubmVyIGFkZHJlc3MgKi9cbiAgX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKSB7XG4gICAgaWYgKHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjaygpO1xuICAgICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2lzVmlkZW9SZXNvbHV0aW9uQ29tcGF0aWJsZSh2aWRlb0VsZW1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICByZXNvbHV0aW9uVGV4dFxuICAgIH0gPSBhd2FpdCB0aGlzLl9fc2V0VmlkZW9SZXNvbHV0aW9uKHZpZGVvRWxlbWVudCk7XG4gICAgaWYgKCFpc1N1cHBvcnRlZFJlc29sdXRpb24pIHtcbiAgICAgIGlmIChyZXNvbHV0aW9uVGV4dCAhPT0gJ25vdCByZWFkeScpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNTdXBwb3J0ZWRSZXNvbHV0aW9uO1xuICB9XG4gIF9fZ2V0Um90YXRpb25EZWdyZWUoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9fb3B0aW9ucy5yb3RhdGlvbkRlZ3JlZSAlIDM2MCArIDM2MCkgJSAzNjA7XG4gIH1cbiAgX19nZXRNaXJyb3JNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucy5taXJyb3JNb2RlO1xuICB9XG4gIGFzeW5jIF9fY3JvcEltYWdlRnJvbVZpZGVvKCkge1xuICAgIGlmICghdGhpcy5fX2NhbVNldENvbXBsZXRlKSByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgIGxldCBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcblxuICAgIC8vIHNvdXJjZSBpbWFnZSAob3IgdmlkZW8pXG4gICAgLy8g4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTXG4gICAgLy8g4pSDICAgICDilIogc3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilIPilIjilIjilIjilIgg4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTIOKUiiAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyBzeCAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiBzSGVpZ2h0ICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uIGNhbnZhc1xuICAgIC8vIOKUgyAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbIOKUiiAgICAgICAgICAgICAgIOKUg+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUk1xuICAgIC8vIOKUgyAgICAg4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSIICAgICAgICAgICAgICAgICDilIMgICAg4pSKICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICAgICAgICBzV2lkdGggICAgICAgICAgICAgICAgICAgICAg4pSDICAgIOKUiiBkeSAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyAgICDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSD4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICBkeCAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiBkSGVpZ2h0IOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSDICAgICAgICAgICAgICAg4pSDIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAg4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSIICAgICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgICAgICAgIGRXaWR0aCAgICAgICAgICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJtcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIGR4LCBkeSlcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQvZHJhd0ltYWdlXG5cbiAgICBsZXQgY2FsY0NhbnZhcyA9IGNhbnZhcztcbiAgICBsZXQgY2FsY1ZpZGVvV2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9IZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50V2lkdGggPSB2aWRlby5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0ID0gdmlkZW8uY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aDtcbiAgICBsZXQgY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQgPSB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgICBjb25zdCBpc0FsaWVuQmFjayA9IHRoaXMuX19vY3JUeXBlID09PSAnYWxpZW4tYmFjayc7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCwgY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHRdID0gW2NhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0LCBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoXTtcbiAgICAgIFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFtjYWxjUmVzb2x1dGlvbl9oLCBjYWxjUmVzb2x1dGlvbl93XTtcbiAgICAgIGNhbGNDYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICAgIGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCc7XG4gICAgfVxuICAgIGxldCBjYWxjTWF4U1dpZHRoID0gOTk5OTk7XG4gICAgbGV0IGNhbGNNYXhTSGVpZ2h0ID0gOTk5OTk7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOyEuOuhnCBVSSAvIOyEuOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNXaWR0aCA9IGNhbGNWaWRlb1dpZHRoO1xuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOyEuOuhnCBVSSAvIOqwgOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g6rCA66GcIFVJIC8g6rCA66GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAvIOyEuOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNXaWR0aCA9IGNhbGNWaWRlb1dpZHRoO1xuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN4LCBzeTtcbiAgICBjb25zdCByYXRpbyA9IGNhbGNWaWRlb1dpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgY29uc3Qgc1dpZHRoID0gTWF0aC5taW4oTWF0aC5yb3VuZChjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoICogcmF0aW8pLCBjYWxjTWF4U1dpZHRoKTtcbiAgICBjb25zdCBzSGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5yb3VuZChjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCAqIHJhdGlvKSwgY2FsY01heFNIZWlnaHQpO1xuICAgIHN4ID0gTWF0aC5tYXgoTWF0aC5yb3VuZCgoY2FsY1ZpZGVvQ2xpZW50V2lkdGggLSBjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoKSAvIDIgKiByYXRpbyksIDApO1xuICAgIHN5ID0gTWF0aC5tYXgoTWF0aC5yb3VuZCgoY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0IC0gY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQpIC8gMiAqIHJhdGlvKSwgMCk7XG4gICAgaWYgKGlzQWxpZW5CYWNrKSB7XG4gICAgICBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbY2FsY1Jlc29sdXRpb25faCwgY2FsY1Jlc29sdXRpb25fd107XG4gICAgfVxuICAgIGNhbGNDYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGNhbGNSZXNvbHV0aW9uX3cpO1xuICAgIGNhbGNDYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBjb25zdCBjYWxjQ29udGV4dCA9IGNhbGNDYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7XG4gICAgICB3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWVcbiAgICB9KTtcbiAgICBjYWxjQ29udGV4dC5kcmF3SW1hZ2UodmlkZW8sIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBsZXQgaW1nRGF0YSwgaW1nRGF0YVVybDtcbiAgICBpbWdEYXRhID0gY2FsY0NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGltZ0RhdGFVcmwgPSBjYWxjQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xuICAgIGlmIChpc0FsaWVuQmFjaykge1xuICAgICAgW2ltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCAyNzApO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtpbWdEYXRhLCBpbWdEYXRhVXJsXTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgZGVncmVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKGRlZ3JlZSA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKFtpbWdEYXRhLCBpbWdEYXRhVXJsXSk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGNvbnN0IHRlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGltZy5zcmMgPSBpbWdEYXRhVXJsO1xuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIGNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgICAgICBjb25zdCB0ZW1wQ29udGV4dCA9IHRlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGVtcENhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGlmIChbOTAsIDI3MF0uaW5jbHVkZXMoZGVncmVlKSkge1xuICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaW1nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKFswLCAxODBdLmluY2x1ZGVzKGRlZ3JlZSkpIHtcbiAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVncmVlID09PSA5MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKGltZy5oZWlnaHQsIDApO2Vsc2UgaWYgKGRlZ3JlZSA9PT0gMTgwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtlbHNlIGlmIChkZWdyZWUgPT09IDI3MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKDAsIGltZy53aWR0aCk7XG4gICAgICAgIHRlbXBDb250ZXh0LnJvdGF0ZShkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGVtcENvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIGNvbnN0IG5ld0ltYWdlRGF0YSA9IFs5MCwgMjcwXS5pbmNsdWRlcyhkZWdyZWUpID8gdGVtcENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZy5oZWlnaHQsIGltZy53aWR0aCkgOiB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcbiAgICAgICAgcmVzb2x2ZShbbmV3SW1hZ2VEYXRhLCB0ZW1wQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpXSk7XG4gICAgICAgIHRlbXBDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgYm94VHlwZSA9IDAsIHJldHJ5SW1nID0gbnVsbCkge1xuICAgIGlmICghYWRkcmVzcyB8fCBhZGRyZXNzIDwgMCkge1xuICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgaW1nRGF0YTtcbiAgICAgIGxldCBpbWdEYXRhVXJsID0gbnVsbDtcbiAgICAgIGNvbnN0IFtidWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgaWYgKHJldHJ5SW1nICE9PSBudWxsKSB7XG4gICAgICAgIGltZ0RhdGEgPSByZXRyeUltZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19jcm9wSW1hZ2VGcm9tVmlkZW8oKTtcbiAgICAgIH1cbiAgICAgIGlmICghISFpbWdEYXRhKSB7XG4gICAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgICAgfVxuICAgICAgdGhpcy5fX09DUkVuZ2luZS5IRUFQOC5zZXQoaW1nRGF0YS5kYXRhLCBidWZmZXIpO1xuICAgICAgbGV0IGtvciA9IGZhbHNlLFxuICAgICAgICBhbGllbiA9IGZhbHNlLFxuICAgICAgICBwYXNzcG9ydCA9IGZhbHNlO1xuICAgICAgc3dpdGNoICh0aGlzLl9fb2NyVHlwZSkge1xuICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAga29yID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIHBhc3Nwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICBhbGllbiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgLy8gbm90aGluZ1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgaWYgKGtvciB8fCBwYXNzcG9ydCB8fCBhbGllbikge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmRldGVjdF9pZGNhcmRfb3B0KGJ1ZmZlciwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIGFkZHJlc3MsIGtvciwgYWxpZW4sIHBhc3Nwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZGV0ZWN0X2lkY2FyZChidWZmZXIsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCBhZGRyZXNzLCBib3hUeXBlKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coJ2lzQ2FyZGJveERldGVjdGVkIHJlc3VsdCAtPS0tLS0tJywgcmVzdWx0KVxuICAgICAgcmV0dXJuIFshIXJlc3VsdCwgaW1nRGF0YSwgaW1nRGF0YVVybF07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdDYXJkIGRldGVjdGlvbiBlcnJvciA6ICcgKyBlO1xuICAgICAgaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnbWVtb3J5JykpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBfX3N0YXJ0UmVjb2duaXRpb24oYWRkcmVzcywgb2NyVHlwZSwgc3NhTW9kZSwgaXNTZXRJZ25vcmVDb21wbGV0ZSwgaW1nRGF0YSwgaW1nRGF0YVVybCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoYWRkcmVzcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2UgaWYgKGFkZHJlc3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnY2hlY2tWYWxpZGF0aW9uIEZhaWwnO1xuICAgICAgfVxuICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGw7XG4gICAgICBpZiAoIXRoaXMuX19vY3JUeXBlTGlzdC5pbmNsdWRlcyhvY3JUeXBlKSkgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgICAgY29uc3QgWywgcmVzdWx0QnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGNvbnN0IHJlY29nbml0aW9uID0gYXN5bmMgaXNTZXRJZ25vcmVDb21wbGV0ZSA9PiB7XG4gICAgICAgIGlmIChpc1NldElnbm9yZUNvbXBsZXRlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIDAsIGltZ0RhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbklEQ2FyZChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuUGFzc3BvcnQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQWxpZW4oYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQWxpZW5CYWNrKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuQ3JlZGl0KGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2FubmVyIGRvZXMgbm90IGV4aXN0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzog7Iug7Jqp7Lm065Oc64qUIOyVhOyngSBrZXk6dmFsdWUg7ZiV7YOc66GcIOuzgO2ZmCDslYjrkJjslrQg7J6I7J2MXG4gICAgICAgIGlmIChvY3JUeXBlID09PSAnY3JlZGl0Jykge1xuICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IG51bGwgfHwgb2NyUmVzdWx0ID09PSAnJyB8fCBvY3JSZXN1bHQgPT09ICdmYWxzZScgfHwgb2NyUmVzdWx0WzBdID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fY3N2VG9PYmplY3Qob2NyUmVzdWx0KTtcbiAgICAgICAgaWYgKG9jclJlc3VsdD8uY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIG9jclJlc3VsdD8uY29tcGxldGUgPT09ICd0cnVlJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc1NldElnbm9yZUNvbXBsZXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCkge1xuICAgICAgICAgICAgICAvLyBkZXRlY3RlZENhcmRRdWV1ZeyXkOyEnCDtlZzsnqXsnYQg6rq864K07IScIOqwseyLoO2VnOuLpC5cbiAgICAgICAgICAgICAgLy8g7KCA7J6l65CY7Ja07J6I64qUIOydtOuvuOyngOydmCDsiKvsnpDqsIAgcmV0cnkg67O064ukIOyekeydgOqyveyasCDrjIDruYTtlZjsl6wgJeulvCDsgqzsmqntlahcbiAgICAgICAgICAgICAgY29uc3QgcXVldWVJZHggPSB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCAlIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGltZ0RhdGEgPSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVbcXVldWVJZHhdO1xuICAgICAgICAgICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVjb2duaXRpb24oaXNTZXRJZ25vcmVDb21wbGV0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDsgqzsp4Qg7ZWc7J6l7Jy866GcIE9DUiDsi6TtjKggKHBvcHVwIOuCtOumrOqzoCBzZXRJZ25vcmVDb21wbGV0ZShmYWxzZSkg7LKY66asP1xuICAgICAgICAgICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpO1xuICAgICAgICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTsgLy8g7Yyd7JeF7J20IOuCtOugpOqwiOuVjCDsspjrpqzrkJjsp4Drp4wg66+466asIOyymOumrFxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudmlkZW8sIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gZW5kIG9mIGZ1bmN0aW9uIHJlY29nbml0aW9uKClcblxuICAgICAgaWYgKGF3YWl0IHJlY29nbml0aW9uKGlzU2V0SWdub3JlQ29tcGxldGUpKSB7XG4gICAgICAgIGNvbnN0IGlzQ3JlZGl0Q2FyZCA9IG9jclR5cGUgPT09ICdjcmVkaXQnO1xuICAgICAgICBsZXQgb2NySW1hZ2VNb2RlO1xuICAgICAgICBpZiAoaXNDcmVkaXRDYXJkKSB7XG4gICAgICAgICAgb2NySW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuQ1JPUFBJTkc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fX29wdGlvbnMudXNlSW1hZ2VXYXJwaW5nKSB7XG4gICAgICAgICAgb2NySW1hZ2VNb2RlID0gdGhpcy5PQ1JfSU1HX01PREUuV0FSUElORztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvY3JJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5OT05FO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcmlnaW5JbWFnZSA9IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLkZBTFNFLCBvY3JJbWFnZU1vZGUpO1xuICAgICAgICBsZXQgbWFza0ltYWdlID0gbnVsbDtcbiAgICAgICAgbGV0IGZhY2VJbWFnZSA9IG51bGw7XG4gICAgICAgIGlmICghaXNDcmVkaXRDYXJkKSB7XG4gICAgICAgICAgbWFza0ltYWdlID0gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIHRoaXMuT0NSX0lNR19NQVNLX01PREUuVFJVRSwgdGhpcy5PQ1JfSU1HX01PREUuV0FSUElORyk7XG4gICAgICAgICAgbWFza0ltYWdlID0gbWFza0ltYWdlID09PSAnZGF0YTonID8gbnVsbCA6IG1hc2tJbWFnZTtcbiAgICAgICAgICBmYWNlSW1hZ2UgPSB0aGlzLl9fb3B0aW9ucy51c2VGYWNlSW1hZ2UgPyBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgbnVsbCwgb2NySW1hZ2VNb2RlLCAnZmFjZScpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3NhTW9kZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBLCBmYWxzZSwgbWFza0ltYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAvLyBpZiAoIWlzQ3JlZGl0Q2FyZCAmJiB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSkge1xuICAgICAgICAvLyAgIG9yaWdpbkltYWdlID0gdGhpcy5fX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChcbiAgICAgICAgLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vICAgICB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLkZBTFNFLFxuICAgICAgICAvLyAgICAgb2NySW1hZ2VNb2RlXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZW5jcnlwdCBiYXNlNjQgaW1hZ2UnLCB7IG9yaWdpbkltYWdlIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmIChmYWNlSW1hZ2UgJiYgdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdEZhY2UpIHtcbiAgICAgICAgLy8gICBmYWNlSW1hZ2UgPSB0aGlzLl9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KFxuICAgICAgICAvLyAgICAgYWRkcmVzcyxcbiAgICAgICAgLy8gICAgIG51bGwsXG4gICAgICAgIC8vICAgICBvY3JJbWFnZU1vZGUsXG4gICAgICAgIC8vICAgICAnZmFjZSdcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdlbmNyeXB0IGJhc2U2NCBmYWNlIGltYWdlJywgeyBmYWNlSW1hZ2UgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG5cbiAgICAgICAgcmV0dXJuIFtvY3JSZXN1bHQsIG9yaWdpbkltYWdlLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsLCBudWxsLCBudWxsXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBfX3N0YXJ0VHJ1dGgob2NyVHlwZSwgYWRkcmVzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBbLCByZXN1bHRCdWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgaWYgKG9jclR5cGUuaW5kZXhPZignLXNzYScpID4gLTEpIHtcbiAgICAgICAgLy8gVE9ETzogd29ya2Vy66W8IOyCrOyaqe2VmOyXrCDrqZTsnbgoVUkg656c642U66eBKSDsiqTroIjrk5zqsIAg66mI7LaU7KeAIOyViuuPhOuhnSDsspjrpqwg7ZWE7JqUICjtmITsnqwgbG9hZGluZyBVSSDrnYTsmrDrqbQg7JWg64uI66mU7J207IWYIOupiOy2pClcbiAgICAgICAgLy8gVE9ETzogc2V0VGltZW91dCDsnLzroZwg64KY64iE642U652864+EIO2aqOqzvCDsl4bsnYwgc2V0VGltZW91dCDsp4DsmrDqs6AsIHdvcmtlcuuhnCDrs4Dqsr0g7ZWE7JqUXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5fX09DUkVuZ2luZS5zY2FuVHJ1dGgoYWRkcmVzcywgcmVzdWx0QnVmZmVyKSk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdTU0EgTW9kZSBpcyB0cnVlLiBidXQsIG9jclR5cGUgaXMgaW52YWxpZCA6ICcgKyBvY3JUeXBlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19jc3ZUb09iamVjdChzdHIpIHtcbiAgICBsZXQgcGFpcnMgPSBzdHIuc3BsaXQoJzsnKTtcbiAgICBsZXQgb2JqID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnOicpO1xuICAgICAgaWYgKHBhaXIubGVuZ3RoID09PSAyKSBvYmpbcGFpclswXV0gPSBwYWlyWzFdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIF9fZ2V0TWFza0luZm8oYWRkcmVzcykge1xuICAgIGlmIChhZGRyZXNzID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGFkZHJlc3MgPT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2NoZWNrVmFsaWRhdGlvbiBGYWlsJztcbiAgICB9XG4gICAgY29uc3QgWywsIG1hc2tJbmZvUmVzdWx0QnVmXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmdldE1hc2tSZWN0KGFkZHJlc3MsIG1hc2tJbmZvUmVzdWx0QnVmKTtcbiAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0ID09PSAnJykge1xuICAgICAgdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKTtcblxuICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgPyBudWxsIDogdGhpcy5fX2NzdlRvT2JqZWN0KHJlc3VsdCk7XG4gIH1cbiAgYXN5bmMgX19zdGFydFRydXRoUmV0cnkob2NyVHlwZSwgYWRkcmVzcywgaW1nRGF0YSkge1xuICAgIGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCAwLCBpbWdEYXRhKTtcbiAgICAvLyBhd2FpdCB0aGlzLl9fc3RhcnRSZWNvZ25pdGlvbihhZGRyZXNzLCBvY3JUeXBlLCB0cnVlKTsgICAgICAvLyBmb3Ig7ISx64ql7J2EIOychO2VtCDsp4TtlokgWFxuICAgIHJldHVybiBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aChvY3JUeXBlLCBhZGRyZXNzKTtcbiAgfVxuICBfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAvLyAx7LSIIGRlbGF5IO2bhCDsi6TtlolcbiAgICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIH0sIHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwpO1xuICB9XG4gIGFzeW5jIF9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICAgIGNvbnN0IGlzUGFzc3BvcnQgPSB0aGlzLl9fb2NyVHlwZS5pbmNsdWRlcygncGFzc3BvcnQnKTtcbiAgICAgIGF3YWl0IHRoaXMuX19zZXR1cFZpZGVvKGlzUGFzc3BvcnQpO1xuICAgICAgY29uc3Qge1xuICAgICAgICB2aWRlb1xuICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICBpZiAodmlkZW8pIHtcbiAgICAgICAgLy8gY29uc3QgW3RyYWNrXSA9IHRoaXMuX19zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKTtcbiAgICAgICAgLy8gY29uc3QgY2FwYWJpbGl0eSA9IHRyYWNrLmdldENhcGFiaWxpdGllcygpO1xuICAgICAgICAvLyBjb25zb2xlLmRlYnVnKCdDYXJkU2Nhbl9faW5pdGlhbGl6ZSBjYXBhYmlsaXR5JywgY2FwYWJpbGl0eSk7XG4gICAgICAgIGlmICgnc3JjT2JqZWN0JyBpbiB2aWRlbykge1xuICAgICAgICAgIHZpZGVvLnNyY09iamVjdCA9IHRoaXMuX19zdHJlYW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQXZvaWQgdXNpbmcgdGhpcyBpbiBuZXcgYnJvd3NlcnMsIGFzIGl0IGlzIGdvaW5nIGF3YXkuXG4gICAgICAgICAgdmlkZW8uc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5fX3N0cmVhbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZygncHJvY2VlZENhbWVyYVBlcm1pc3Npb24gLSBvbmxvYWRlZG1ldGFkYXRhJyk7XG4gICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICB2b2lkIDA7XG5cbiAgICAgICAgICAvLyB2aWRlbyBlbGVtZW50IHN0eWxlIOyEpOyglVxuICAgICAgICAgIHRoaXMuX192aWRlb09yaWVudGF0aW9uID0gdmlkZW8udmlkZW9XaWR0aCAvIHZpZGVvLnZpZGVvSGVpZ2h0IDwgMSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB0aGlzLl9fY2FtU2V0Q29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19hZGp1c3RTdHlsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuUkVBRFkpO1xuICAgICAgICB2aWRlby53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEFsbG93ZWRFcnJvcicpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ0NhbWVyYSBBY2Nlc3MgUGVybWlzc2lvbiBpcyBub3QgYWxsb3dlZCc7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnRTQwMycsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICB9IGVsc2UgaWYgKGUubmFtZSA9PT0gJ05vdFJlYWRhYmxlRXJyb3InKSB7XG4gICAgICAgIC8vIOuLpOuluOqzs+yXkOyEnCDsubTrqZTrnbwg7J6Q7JuQ7J2EIOyCrOyaqeykkVxuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQgPCAwKSB7XG4gICAgICAgICAgLy8g7Lm066mU6528IOumrOyGjOyKpCDsnqzsmpTssq0g7Zqf7IiY7KCc7ZWcIOyXhuydjFxuICAgICAgICAgIHRoaXMuX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgKz0gMTtcbiAgICAgICAgICB0aGlzLl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpOyAvLyDsnqzqt4Ag7Zi47LacXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQgPiB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50ICs9IDE7XG4gICAgICAgICAgICB0aGlzLl9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpOyAvLyDsnqzqt4Ag7Zi47LacXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdDYW1lcmEgcGVybWlzc2lvbnMgd2VyZSBncmFudGVkLCBidXQgRmFpbGVkIHRvIGFjcXVpcmUgQ2FtZXJhIHJlc291cmNlcy4nO1xuICAgICAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U0MDMnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBfX3NldFN0eWxlKGVsLCBzdHlsZSkge1xuICAgIGlmIChlbCAmJiBzdHlsZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihlbC5zdHlsZSwgc3R5bGUpO1xuICAgIH1cbiAgfVxuICBfX2NoYW5nZU9DUlN0YXR1cyh2YWwpIHtcbiAgICBzd2l0Y2ggKHZhbCkge1xuICAgICAgLy8gT0NSXG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk5PVF9SRUFEWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuUkVBRFk6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuUkVBRFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEOlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTUzpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQTpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfRkFJTEVEOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLkRPTkU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2NoYW5nZVN0YWdlKHZhbCwgZm9yY2VVcGRhdGUgPSBmYWxzZSwgcmVjb2duaXplZEltYWdlID0gbnVsbCkge1xuICAgIGlmICh0aGlzLl9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9PT0gdmFsICYmIGZvcmNlVXBkYXRlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9fY2hhbmdlT0NSU3RhdHVzKHZhbCk7XG4gICAgdGhpcy5fX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPSB2YWw7XG4gICAgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwID0gdmFsO1xuICAgIGNvbnN0IHtcbiAgICAgIGd1aWRlQm94LFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBib3JkZXJXaWR0aDogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS53aWR0aCArICdweCcsXG4gICAgICBib3JkZXJTdHlsZTogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5zdHlsZSxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXMgKyAncHgnLFxuICAgICAgYm9yZGVyQ29sb3I6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGVbdmFsXVxuICAgIH07XG4gICAgaWYgKGd1aWRlQm94KSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHN0eWxlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlKSB7XG4gICAgICBpZiAoISF0aGlzLl9fb3B0aW9ucy5zaG93Q2xpcEZyYW1lKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hc2tCb3hXcmFwPy5xdWVyeVNlbGVjdG9yKCcjbWFza0JveE91dGVyJyk/LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlW3ZhbF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICBjYXB0dXJlQnV0dG9uPy5xdWVyeVNlbGVjdG9yKCcjY2FwdHVyZUJ1dHRvbicpPy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9fb3B0aW9ucy5jYXB0dXJlQnV0dG9uU3R5bGVbJ2Jhc2VfY29sb3InXSk7XG4gICAgfVxuICAgIGNvbnN0IG9jck1vZGUgPSB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPyAnc2VydmVyJyA6ICd3YXNtJztcbiAgICBpZiAodGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVRvcFVJIHx8IHRoaXMuX19vcHRpb25zLnVzZVRvcFVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX3RvcFVJLCAndG9wJywgdGhpcy5fX29wdGlvbnMudXNlVG9wVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX19taWRkbGVVSSwgJ21pZGRsZScsIHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fYm90dG9tVUksICdib3R0b20nLCB0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MgfHwgdmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSk7XG5cbiAgICAgICAgLy8gRkFJTOyduCDqsr3smrAgNey0iO2bhCDsnpDrj5nsnYQg7LC964ur7J2MXG4gICAgICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVEKSB7XG4gICAgICAgICAgc2V0VGltZW91dCh0aGlzLl9faGlkZVByZXZpZXdVSSwgMzAwMCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICB2aWRlb1xuICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX19oaWRlUHJldmlld1VJKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxKTsgLy8gZm9yIFVJIHVwZGF0ZVxuICB9XG5cbiAgX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdJbWFnZVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSByZWNvZ25pemVkSW1hZ2U7XG4gICAgY29uc3QgaW1nU3R5bGUgPSB7XG4gICAgICAnbWF4LXdpZHRoJzogJzcwJScsXG4gICAgICAnbWF4LWhlaWdodCc6ICc2MCUnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld0ltYWdlLCBpbWdTdHlsZSk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4J1xuICAgIH0pO1xuICB9XG4gIF9faGlkZVByZXZpZXdVSShjb250ZXh0KSB7XG4gICAgbGV0IF90aGlzXyA9IHRoaXM7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIF90aGlzXyA9IGNvbnRleHQ7XG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdJbWFnZVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIF90aGlzXy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgfSk7XG4gICAgX3RoaXNfLl9fc2V0U3R5bGUocHJldmlld1VJV3JhcCwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gICAgcHJldmlld0ltYWdlLnNyYyA9ICcnO1xuICB9XG4gIGFzeW5jIF9fZ2V0SW5wdXREZXZpY2VzKCkge1xuICAgIC8vIHRocm93IGVycm9yIGlmIG5hdmlnYXRvci5tZWRpYURldmljZXMgaXMgbm90IHN1cHBvcnRlZFxuICAgIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCduYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgZGV2aWNlcyA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGxldCBjYW1lcmEgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGRldmljZSBvZiBkZXZpY2VzKSB7XG4gICAgICBpZiAoZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0Jykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChkZXZpY2UgaW5zdGFuY2VvZiBJbnB1dERldmljZUluZm8pIHtcbiAgICAgICAgICAgIGlmIChkZXZpY2UuZ2V0Q2FwYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhcCA9IGRldmljZS5nZXRDYXBhYmlsaXRpZXMoKTtcbiAgICAgICAgICAgICAgaWYgKGNhcD8uZmFjaW5nTW9kZT8uaW5jbHVkZXModGhpcy5fX2ZhY2luZ01vZGVDb25zdHJhaW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzVWx0cmFDYW1lcmFSZWcgPSAvdWx0cmF87Jq47Yq46528L2dpO1xuICAgICAgICAgICAgICAgIGlmIChpc1VsdHJhQ2FtZXJhUmVnLnRlc3QoZGV2aWNlLmxhYmVsPy50b0xvd2VyQ2FzZSgpKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FtZXJhLnB1c2goY2FwLmRldmljZUlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlPUyAxNyDrr7jrp4zsnZggY2hyb21lLCBzYWZhcmkg7JeQ7ISc64qUXG4gICAgICAgICAgLy8gSW5wdXREZXZpY2VJbmZvIOqwneyytOqwgCDsl4bslrTshJwgZ2V0Q2FwYWJpbGl0aWVz66W8IO2ZleyduO2VoCDsiJgg7JeG6riwIOuVjOusuOyXkFxuICAgICAgICAgIC8vIGRldmljZSBsYWJlbOunjCDrs7Tqs6Ag7ZuE66m0IOy5tOuplOudvOuhnCDsgqzsmqlcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBpc0JhY2tDYW1lcmFSZWcgPSAvYmFja3ztm4TrqbQvZztcbiAgICAgICAgICAgIGlmIChkZXZpY2UubGFiZWw/Lmxlbmd0aCAmJiBpc0JhY2tDYW1lcmFSZWcudGVzdChkZXZpY2UubGFiZWwpKSB7XG4gICAgICAgICAgICAgIGNhbWVyYS5wdXNoKGRldmljZS5kZXZpY2VJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19kZWJ1ZyhgY2FtZXJhID0gJHtjYW1lcmF9LCBjYW1lcmEubGVuZ3RoID0gJHtjYW1lcmEubGVuZ3RofWApO1xuICAgIHJldHVybiBjYW1lcmE7XG4gIH1cbiAgY2hlY2tVSU9yaWVudGF0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBkZXRlY3Rvci5nZXRVSU9yaWVudGF0aW9uKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkub2NyKTtcbiAgICBsZXQgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnQgIT09IHRoaXMuX19wcmV2VWlPcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fX3VpT3JpZW50YXRpb24gPSBjdXJyZW50O1xuICAgICAgdGhpcy5fX3ByZXZVaU9yaWVudGF0aW9uID0gY3VycmVudDtcbiAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50LFxuICAgICAgaXNDaGFuZ2VkXG4gICAgfTtcbiAgfVxuICBfX2NsZWFyQ3VzdG9tVUkob2JqKSB7XG4gICAgb2JqLmlubmVySFRNTCA9ICcnO1xuICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgb2JqLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUob2JqLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX3NldHVwRG9tRWxlbWVudHMoKSB7XG4gICAgbGV0IHtcbiAgICAgIG9jcixcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXMsXG4gICAgICBndWlkZUJveCxcbiAgICAgIHZpZGVvV3JhcCxcbiAgICAgIGd1aWRlQm94V3JhcCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgcHJldmVudFRvRnJlZXplVmlkZW8sXG4gICAgICBjdXN0b21VSVdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvbixcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3VUksXG4gICAgICBwcmV2aWV3SW1hZ2UsXG4gICAgICBzd2l0Y2hVSVdyYXAsXG4gICAgICBzd2l0Y2hVSSxcbiAgICAgIHByZWxvYWRpbmdVSVdyYXAsXG4gICAgICBwcmVsb2FkaW5nVUlcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoIW9jcikgdGhyb3cgbmV3IEVycm9yKCdvY3IgZGl2IGVsZW1lbnQgaXMgbm90IGV4aXN0Jyk7XG4gICAgaWYgKHZpZGVvV3JhcCkgdmlkZW9XcmFwLnJlbW92ZSgpO1xuICAgIGlmIChndWlkZUJveFdyYXApIGd1aWRlQm94V3JhcC5yZW1vdmUoKTtcbiAgICBpZiAodmlkZW8pIHZpZGVvLnJlbW92ZSgpO1xuICAgIGlmIChjYW52YXMpIGNhbnZhcy5yZW1vdmUoKTtcbiAgICBpZiAocm90YXRpb25DYW52YXMpIHJvdGF0aW9uQ2FudmFzLnJlbW92ZSgpO1xuICAgIGlmIChndWlkZUJveCkgZ3VpZGVCb3gucmVtb3ZlKCk7XG4gICAgaWYgKG1hc2tCb3hXcmFwKSBtYXNrQm94V3JhcC5yZW1vdmUoKTtcbiAgICBpZiAocHJldmVudFRvRnJlZXplVmlkZW8pIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLnJlbW92ZSgpO1xuICAgIGlmIChjdXN0b21VSVdyYXApIGN1c3RvbVVJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyDqsIEgdG9wLCBtaWRkbGUsIGJvdHRvbSBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHRvcFVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkodG9wVUkpO1xuICAgIGlmIChtaWRkbGVVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKG1pZGRsZVVJKTtcbiAgICBpZiAoYm90dG9tVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShib3R0b21VSSk7XG4gICAgaWYgKGNhcHR1cmVVSVdyYXApIGNhcHR1cmVVSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8gY2FwdHVyZSBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKGNhcHR1cmVVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShjYXB0dXJlVUkpO1xuICAgIGlmIChwcmV2aWV3VUlXcmFwKSBwcmV2aWV3VUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIHByZXZpZXcgVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChwcmV2aWV3VUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkocHJldmlld1VJKTtcbiAgICBpZiAoc3dpdGNoVUlXcmFwKSBzd2l0Y2hVSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8gc3dpdGNoIFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAoc3dpdGNoVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoc3dpdGNoVUkpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSBwcmVsb2FkaW5nVUlXcmFwLnJlbW92ZSgpO1xuICAgIGNvbnN0IHJvdGF0aW9uRGVncmVlID0gdGhpcy5fX2dldFJvdGF0aW9uRGVncmVlKCk7XG4gICAgdGhpcy5fX2lzUm90YXRlZDkwb3IyNzAgPSBbOTAsIDI3MF0uaW5jbHVkZXMocm90YXRpb25EZWdyZWUpO1xuICAgIGxldCBvY3JTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKG9jciwgb2NyU3R5bGUpO1xuICAgIGNvbnN0IHdyYXBTdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgLy8gdmVydGljYWwgYWxpZ24gbWlkZGxlXG4gICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG1hcmdpbjogJzAgYXV0bycsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICB9O1xuICAgIHZpZGVvV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZpZGVvV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndmlkZW9XcmFwJyk7XG4gICAgaWYgKHZpZGVvV3JhcCkge1xuICAgICAgd2hpbGUgKHZpZGVvV3JhcC5maXJzdENoaWxkKSB7XG4gICAgICAgIHZpZGVvV3JhcC5yZW1vdmVDaGlsZCh2aWRlb1dyYXAubGFzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlb1dyYXAsIHdyYXBTdHlsZSk7XG4gICAgfVxuICAgIG9jci5hcHBlbmRDaGlsZCh2aWRlb1dyYXApO1xuICAgIG1hc2tCb3hXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ21hc2tCb3hXcmFwJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICBtYXNrQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKG1hc2tCb3hXcmFwLCB3cmFwU3R5bGUpO1xuICAgIGxldCBtYXNrX2ZyYW1lID0gdGhpcy5fX29wdGlvbnMubWFza0ZyYW1lU3R5bGUuYmFzZV9jb2xvciArICdmZic7XG4gICAgaWYgKCEhdGhpcy5fX29wdGlvbnMuc2hvd0NsaXBGcmFtZSkge1xuICAgICAgbWFza19mcmFtZSA9IHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlLmNsaXBfZnJhbWUgKyAnNTUnO1xuICAgIH1cbiAgICBtYXNrQm94V3JhcC5pbm5lckhUTUwgPSAnJyArIFwiICA8c3ZnIGlkPSdtYXNrQm94Q29udGFpbmVyJyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxcblwiICsgXCIgICAgPG1hc2sgaWQ9J21hc2stcmVjdCc+XFxuXCIgKyBcIiAgICAgIDxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J3doaXRlJz48L3JlY3Q+XFxuXCIgKyBcIiAgICAgIDxzdmcgeD0nNTAlJyB5PSc1MCUnIG92ZXJmbG93PSd2aXNpYmxlJz5cXG5cIiArIFwiICAgICAgICAgIDxyZWN0IGlkPSdtYXNrQm94SW5uZXInXFxuXCIgKyBcIiAgICAgICAgICAgIHdpZHRoPSc0MDAnIGhlaWdodD0nMjYwJ1xcblwiICsgXCIgICAgICAgICAgICB4PSctMjAwJyB5PSctMTMwJ1xcblwiICsgXCIgICAgICAgICAgICByeD0nMTAnIHJ5PScxMCdcXG5cIiArIFwiICAgICAgICAgICAgZmlsbD0nYmxhY2snIHN0cm9rZT0nYmxhY2snPjwvcmVjdD5cXG5cIiArICcgICAgICA8L3N2Zz5cXG4nICsgJyAgICA8L21hc2s+XFxuJyArIFwiICAgIDxyZWN0IGlkPSdtYXNrQm94T3V0ZXInXFxuXCIgKyBcIiAgICAgICAgICB4PScwJyB5PScwJyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJ1xcblwiICsgXCIgICAgICAgICAgZmlsbD0nXCIgKyBtYXNrX2ZyYW1lICsgXCInIG1hc2s9J3VybCgjbWFzay1yZWN0KSc+PC9yZWN0PlxcblwiICsgJyAgPC9zdmc+JztcbiAgICBvY3IuYXBwZW5kQ2hpbGQobWFza0JveFdyYXApO1xuICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndmlkZW8nKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJ3RydWUnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJ3RydWUnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcbiAgICBsZXQgdmlkZW9TdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH07XG4gICAgY29uc3Qgcm90YXRlQ3NzID0gJ3JvdGF0ZSgnICsgcm90YXRpb25EZWdyZWUgKyAnZGVnKSc7XG4gICAgY29uc3QgbWlycm9yQ3NzID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XG4gICAgY29uc3Qgcm90YXRlQW5kTWlycm9yQ3NzID0gbWlycm9yQ3NzICsgJyAnICsgcm90YXRlQ3NzO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgaWYgKHRoaXMuX19nZXRNaXJyb3JNb2RlKCkpIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZUFuZE1pcnJvckNzc1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZUNzc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fX2dldE1pcnJvck1vZGUoKSkge1xuICAgICAgICB2aWRlb1N0eWxlID0ge1xuICAgICAgICAgIC4uLnZpZGVvU3R5bGUsXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgIHRyYW5zZm9ybTogbWlycm9yQ3NzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywgdmlkZW9TdHlsZSk7XG4gICAgdmlkZW9XcmFwLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBndWlkZUJveFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBndWlkZUJveFdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2d1aWRlQm94V3JhcCcpO1xuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveFdyYXAsIHdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGd1aWRlQm94V3JhcCk7XG4gICAgZ3VpZGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnZ3VpZGVCb3gnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIGd1aWRlQm94LnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICB9KTtcbiAgICBndWlkZUJveFdyYXAuYXBwZW5kQ2hpbGQoZ3VpZGVCb3gpO1xuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FudmFzJyk7XG4gICAgY29uc3QgY2FudmFzU3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLl9fb3B0aW9ucy5zaG93Q2FudmFzUHJldmlldyA/IHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID8gJ25vbmUnIDogJ2Rpc3BsYXknIDogJ25vbmUnLFxuICAgICAgd2lkdGg6ICcyNSUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgIHRvcDogJzMwcHgnLFxuICAgICAgYm9yZGVyOiAnZ3JlZW4gMnB4IHNvbGlkJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhbnZhcywgY2FudmFzU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIHJvdGF0aW9uQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgcm90YXRpb25DYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3JvdGF0aW9uQ2FudmFzJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHJvdGF0aW9uQ2FudmFzLCB7XG4gICAgICBkaXNwbGF5OiB0aGlzLl9fb3B0aW9ucy5zaG93Q2FudmFzUHJldmlldyA/IHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID8gJ2Rpc3BsYXknIDogJ25vbmUnIDogJ25vbmUnLFxuICAgICAgaGVpZ2h0OiAnMjUlJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgdG9wOiAnMzBweCcsXG4gICAgICBib3JkZXI6ICdibHVlIDJweCBzb2xpZCdcbiAgICB9KTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQocm90YXRpb25DYW52YXMpO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJldmVudFRvRnJlZXplVmlkZW8uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZlbnRUb0ZyZWV6ZVZpZGVvJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZlbnRUb0ZyZWV6ZVZpZGVvLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGJvdHRvbTogJzEwJyxcbiAgICAgIHJpZ2h0OiAnMTAnXG4gICAgfSk7XG4gICAgcHJldmVudFRvRnJlZXplVmlkZW8uaW5uZXJIVE1MID0gJycgKyAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJtYXJnaW46IGF1dG87IGJhY2tncm91bmQ6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87XCIgd2lkdGg9XCIzMnB4XCIgaGVpZ2h0PVwiMzJweFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiPlxcbicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMC41NTU1NTU1NTU1NTU1NTU2c1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzFcIiB2YWx1ZXM9XCIxMDswXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiZmlsbFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cImRpc2NyZXRlXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIiM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDBcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnPC9zdmc+JztcbiAgICBvY3IuYXBwZW5kQ2hpbGQocHJldmVudFRvRnJlZXplVmlkZW8pO1xuICAgIGN1c3RvbVVJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGN1c3RvbVVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY3VzdG9tVUlXcmFwJyk7XG4gICAgY29uc3QgY3VzdG9tVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKGN1c3RvbVVJV3JhcCwgY3VzdG9tVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjdXN0b21VSVdyYXApO1xuXG4gICAgLy8g6rCBIHRvcCwgbWlkZGxlLCBib3R0b20gVUkg7IKs7JqpKHVzZSnsl6zrtoDsmYAg6rSA6rOE7JeG7J20IOyYgeyXreydhCDsnqHquLAg7JyE7ZW0LCBkaXbqsIAg7JeG7Jy866m0IOyDneyEsVxuICAgIC8vIGFkanVzdFN0eWxlKCkg7JeQ7IScIOyEuOu2gOyggeyduCDsgqzsnbTspojsmYAg7JyE7LmY6rCSIOuPmeyggeycvOuhnCDshKTsoJXrkKguXG4gICAgaWYgKCF0b3BVSSkge1xuICAgICAgdG9wVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvcFVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICd0b3BVSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQodG9wVUkpO1xuICAgIGlmICghbWlkZGxlVUkpIHtcbiAgICAgIG1pZGRsZVVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtaWRkbGVVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnbWlkZGxlVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKG1pZGRsZVVJKTtcbiAgICBpZiAoIWJvdHRvbVVJKSB7XG4gICAgICBib3R0b21VSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYm90dG9tVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2JvdHRvbVVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZChib3R0b21VSSk7XG4gICAgY2FwdHVyZVVJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNhcHR1cmVVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhcHR1cmVVSVdyYXAnKTtcbiAgICBjb25zdCBjYXB0dXJlVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY2VudGVyJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIGNhcHR1cmVVSVdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGNhcHR1cmVVSVdyYXApO1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgfHwgdGhpcy5fX29wdGlvbnMudXNlRm9yY2VDb21wbGV0ZVVJKSB7XG4gICAgICAgIGlmICghY2FwdHVyZVVJKSB7XG4gICAgICAgICAgY2FwdHVyZVVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2FwdHVyZVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlVUknKTtcbiAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FwdHVyZUJ1dHRvbikge1xuICAgICAgICAgIGNhcHR1cmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlQnV0dG9uJyk7XG4gICAgICAgICAgbGV0IGNhcHR1cmVCdXR0b25TcmNTVkcgPSBgYDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uU3JjU1ZHICs9IGA8c3ZnIHdpZHRoPSc4MCcgaGVpZ2h0PSc4MCcgdmlld0JveD0nMCAwIDgwIDgwJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgICA8Y2lyY2xlIGlkPSdjYXB0dXJlQnV0dG9uJyBjeD0nNDAnIGN5PSc0MCcgcj0nMzgnIGZpbGw9JyM1NTU1NTUnIHN0cm9rZT0nI2ZmZmZmZicgc3Ryb2tlLXdpZHRoPSc0Jy8+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uU3JjU1ZHICs9IGA8L3N2Zz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b24uaW5uZXJIVE1MID0gY2FwdHVyZUJ1dHRvblNyY1NWRztcbiAgICAgICAgICBjYXB0dXJlVUkuYXBwZW5kQ2hpbGQoY2FwdHVyZUJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2FwdHVyZVVJV3JhcC5hcHBlbmRDaGlsZChjYXB0dXJlVUkpO1xuICAgICAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgICAgICBjb25zdCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpc18uX19pc1N3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgICAgICAgZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICBfdGhpc18uX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICBfdGhpc18uX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpc18uX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNhcHR1cmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgcHJldmlld1VJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJldmlld1VJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld1VJV3JhcCcpO1xuICAgICAgY29uc3QgcHJldmlld1VJV3JhcFN0eWxlID0ge1xuICAgICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nLFxuICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAwMDBhYSdcbiAgICAgIH07XG4gICAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld1VJV3JhcCwgcHJldmlld1VJV3JhcFN0eWxlKTtcbiAgICAgIG9jci5hcHBlbmRDaGlsZChwcmV2aWV3VUlXcmFwKTtcbiAgICAgIGlmICghcHJldmlld1VJKSB7XG4gICAgICAgIHByZXZpZXdVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcmV2aWV3VUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdVSScpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSSwge1xuICAgICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIGhlaWdodDogJycsXG4gICAgICAgICdtYXgtd2lkdGgnOiAnOTAlJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiAnOTAlJ1xuICAgICAgfSk7XG4gICAgICBwcmV2aWV3VUlXcmFwLmFwcGVuZENoaWxkKHByZXZpZXdVSSk7XG4gICAgICBpZiAoIXByZXZpZXdJbWFnZSkge1xuICAgICAgICBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3SW1hZ2UnKTtcbiAgICAgICAgcHJldmlld1VJLmFwcGVuZENoaWxkKHByZXZpZXdJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgIHN3aXRjaFVJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3dpdGNoVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdzd2l0Y2hVSVdyYXAnKTtcbiAgICAgIGNvbnN0IHN3aXRjaFVJV3JhcFN0eWxlID0ge1xuICAgICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICcnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJycsXG4gICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgb3ZlcmZsb3c6ICcnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9O1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHN3aXRjaFVJV3JhcCwgc3dpdGNoVUlXcmFwU3R5bGUpO1xuICAgICAgb2NyLmFwcGVuZENoaWxkKHN3aXRjaFVJV3JhcCk7XG4gICAgICBpZiAoIXN3aXRjaFVJKSB7XG4gICAgICAgIHN3aXRjaFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN3aXRjaFVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdzd2l0Y2hVSScpO1xuICAgICAgICBsZXQgc3dpdGNoSFRNTCA9IGBgO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGA8ZGl2IGNsYXNzPSdjdXN0b20tLWxhYmVsIGZsZXgganVzdGlmeS1jZW50ZXIgYWxpZ24tY2VudGVyIGdhcDEwJz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBmb3I9J21hbnVhbC1zd2l0Y2gtd2FzbS10by1zZXJ2ZXItY2hlY2tib3gnPldBU008L2xhYmVsPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPGxhYmVsIGNsYXNzPSdzd2l0Y2gnPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgICA8aW5wdXQgaWQ9J21hbnVhbC1zd2l0Y2gtd2FzbS10by1zZXJ2ZXItY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgICAgPHNwYW4gY2xhc3M9J3NsaWRlciByb3VuZCc+PC9zcGFuPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBmb3I9J3ByaW9yaXR5LWZpbmFuY2UtY29odG1sRm9ybGlzdC1jaGVja2JveCc+U2VydmVyPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGA8L2Rpdj5gO1xuICAgICAgICBzd2l0Y2hVSS5pbm5lckhUTUwgPSBzd2l0Y2hIVE1MO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NldFN0eWxlKHN3aXRjaFVJLCB7XG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgfSk7XG4gICAgICBzd2l0Y2hVSVdyYXAuYXBwZW5kQ2hpbGQoc3dpdGNoVUkpO1xuICAgICAgY29uc3Qgc3dpdGNoQ2hlY2tib3ggPSBzd2l0Y2hVSS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXTtcbiAgICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgICBjb25zdCBfX29uQ2xpY2tTd2l0Y2hVSSA9IGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfdGhpc18uX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICBhd2FpdCBfdGhpc18ucmVzdGFydE9DUihfdGhpc18uX19vY3JUeXBlLCBfdGhpc18uX19vblN1Y2Nlc3MsIF90aGlzXy5fX29uRmFpbHVyZSwgX3RoaXNfLl9fb25JblByb2dyZXNzQ2hhbmdlLCB0cnVlKTtcbiAgICAgIH07XG4gICAgICBzd2l0Y2hDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja1N3aXRjaFVJLCB7XG4gICAgICAgIG9uY2U6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBwcmVsb2FkaW5nVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJlbG9hZGluZ1VJV3JhcCcpO1xuICAgIGNvbnN0IHByZWxvYWRpbmdVSVdyYXBTdHlsZSA9IHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzAwMDAwMGZmJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZWxvYWRpbmdVSVdyYXAsIHByZWxvYWRpbmdVSVdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKHByZWxvYWRpbmdVSVdyYXApO1xuICAgIGlmICghcHJlbG9hZGluZ1VJKSB7XG4gICAgICBwcmVsb2FkaW5nVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZWxvYWRpbmdVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJlbG9hZGluZ1VJJyk7XG4gICAgICBwcmVsb2FkaW5nVUkuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0ZXh0LWluZm8nKTtcbiAgICAgIHByZWxvYWRpbmdVSS5pbm5lckhUTUwgPSAnJyArICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImJhY2tncm91bmQ6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87XCIgd2lkdGg9XCIzMnB4XCIgaGVpZ2h0PVwiMzJweFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiPlxcbicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMC41NTU1NTU1NTU1NTU1NTU2c1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzFcIiB2YWx1ZXM9XCIxMDswXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiZmlsbFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cImRpc2NyZXRlXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIiM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDBcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnPC9zdmc+JztcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5wcmVsb2FkaW5nVUlUZXh0TXNnID09PSAnJyB8fCB0aGlzLl9fb3B0aW9ucy5wcmVsb2FkaW5nVUlUZXh0TXNnKSB7XG4gICAgICAgIHByZWxvYWRpbmdVSS5pbm5lckhUTUwgKz0gdGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZWxvYWRpbmdVSSwge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICB9KTtcbiAgICBwcmVsb2FkaW5nVUlXcmFwLmFwcGVuZENoaWxkKHByZWxvYWRpbmdVSSk7XG5cbiAgICAvLyBsb2FkaW5nIFVJIOychOy5mCDsnpDrpqzsnqHqsowg7ZWY6riwIOychO2VtFxuICAgIGF3YWl0IHRoaXMuX19pbml0U3R5bGUoKTtcblxuICAgIC8vIO2ZlOuptOqzvOuPhCDtmITsg4Eg7ZW06rKwXG4gICAgdGhpcy5fX3NldFN0eWxlKG9jciwge1xuICAgICAgZGlzcGxheTogJydcbiAgICB9KTtcbiAgICB0aGlzLl9fb2NyID0gb2NyO1xuICAgIHRoaXMuX19jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5fX3JvdGF0aW9uQ2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgdGhpcy5fX3ZpZGVvID0gdmlkZW87XG4gICAgdGhpcy5fX3ZpZGVvV3JhcCA9IHZpZGVvV3JhcDtcbiAgICB0aGlzLl9fZ3VpZGVCb3ggPSBndWlkZUJveDtcbiAgICB0aGlzLl9fZ3VpZGVCb3hXcmFwID0gZ3VpZGVCb3hXcmFwO1xuICAgIHRoaXMuX19tYXNrQm94V3JhcCA9IG1hc2tCb3hXcmFwO1xuICAgIHRoaXMuX19wcmV2ZW50VG9GcmVlemVWaWRlbyA9IHByZXZlbnRUb0ZyZWV6ZVZpZGVvO1xuICAgIHRoaXMuX19jdXN0b21VSVdyYXAgPSBjdXN0b21VSVdyYXA7XG4gICAgdGhpcy5fX3RvcFVJID0gdG9wVUk7XG4gICAgdGhpcy5fX21pZGRsZVVJID0gbWlkZGxlVUk7XG4gICAgdGhpcy5fX2JvdHRvbVVJID0gYm90dG9tVUk7XG4gICAgdGhpcy5fX2NhcHR1cmVVSVdyYXAgPSBjYXB0dXJlVUlXcmFwO1xuICAgIHRoaXMuX19jYXB0dXJlVUkgPSBjYXB0dXJlVUk7XG4gICAgdGhpcy5fX2NhcHR1cmVCdXR0b24gPSBjYXB0dXJlQnV0dG9uO1xuICAgIHRoaXMuX19wcmV2aWV3VUlXcmFwID0gcHJldmlld1VJV3JhcDtcbiAgICB0aGlzLl9fcHJldmlld1VJID0gcHJldmlld1VJO1xuICAgIHRoaXMuX19wcmV2aWV3SW1hZ2UgPSBwcmV2aWV3SW1hZ2U7XG4gICAgdGhpcy5fX3N3aXRjaFVJV3JhcCA9IHN3aXRjaFVJV3JhcDtcbiAgICB0aGlzLl9fc3dpdGNoVUkgPSBzd2l0Y2hVSTtcbiAgICByZXR1cm4ge1xuICAgICAgb2NyLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXMsXG4gICAgICB2aWRlbyxcbiAgICAgIHZpZGVvV3JhcCxcbiAgICAgIGd1aWRlQm94LFxuICAgICAgZ3VpZGVCb3hXcmFwLFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyxcbiAgICAgIGN1c3RvbVVJV3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uLFxuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdVSSxcbiAgICAgIHByZXZpZXdJbWFnZSxcbiAgICAgIHN3aXRjaFVJV3JhcCxcbiAgICAgIHN3aXRjaFVJXG4gICAgfTtcbiAgfVxuICBfX2JsdXJDYXB0dXJlQnV0dG9uKCkge1xuICAgIHRoaXMuX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICBkaXNwbGF5OiAnJ1xuICAgIH0pO1xuICAgIGNvbnN0IHtcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoY2FwdHVyZUJ1dHRvbikge1xuICAgICAgY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAnZmFsc2UnKTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgIGRpc3BsYXk6ICcnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICByZXR1cm4gY2FwdHVyZUJ1dHRvbiA/IGNhcHR1cmVCdXR0b24uZ2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJykgPT09ICd0cnVlJyA6IGZhbHNlO1xuICB9XG4gIGFzeW5jIF9fc2V0dXBWaWRlbyhpc1Bhc3Nwb3J0KSB7XG4gICAgLy8gd2FzbSDsnbjsi53shLHriqUg7LWc7KCB7ZmU65CcIO2VtOyDgeuPhFxuICAgIHRoaXMuX19yZXNvbHV0aW9uV2lkdGggPSAxMDgwO1xuICAgIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0ID0gNzIwO1xuICAgIHRoaXMuX19jYW1TZXRDb21wbGV0ZSA9IGZhbHNlO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBsZXQgY2FtZXJhID0gYXdhaXQgdGhpcy5fX2dldElucHV0RGV2aWNlcygpO1xuICAgIC8vIGNvbnNvbGUubG9nKCd2aWRlb0RldmljZXMgOjogJywgY2FtZXJhKVxuXG4gICAgdGhpcy5jaGVja1VJT3JpZW50YXRpb24oKTtcbiAgICBsZXQgY29uc3RyYWludFdpZHRoLCBjb25zdHJhaW50SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEgPT09ICdoaWdoUXVhbGl0eScpIHtcbiAgICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIDog7ZmU7KeIIOyasOyEoFxuICAgICAgLy8gMTkyMHgxMDgw7J20IOqwgOuKpe2VnOqyveyasCDsgqzsmqkg7JWE64uI66m0IDEyODB4NzIwIOyCrOyaqVxuICAgICAgY29uc3RyYWludFdpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTkyMCxcbiAgICAgICAgbWluOiAxMjgwXG4gICAgICB9O1xuICAgICAgY29uc3RyYWludEhlaWdodCA9IHtcbiAgICAgICAgaWRlYWw6IDEwODAsXG4gICAgICAgIG1pbjogNzIwXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyAnY29tcGF0aWJpbGl0eSdcbiAgICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIDog7Zi47ZmY7ISxIOyasOyEoFxuICAgICAgLy8gMTkyMHgxMDgw7J20IOyCrOyaqSDqsIDriqXtlZjrjZTrnbzrj4QgMTI4MHg3MjDsnYQg7IKs7Jqp7ZWY64+E66GdIOqzoOyglVxuICAgICAgLy8g7IKs7JygIDog6rCk65+t7IucIGVudHJ5IOuqqOuNuChB7Iuc66as7KaIIC8gV2lkZSDrqqjrjbgg65OxKeyXkOyEnCAxOTIwIHggMTA4MCDsspjrpqzsi5wg67mE7Jyo7J20IOydtOyDge2VtOynkCjtmYDsrYnsnbTrkKgpXG4gICAgICAvLyDtla3sg4EgMTI4MCB4IDcyMOydhCDsgqzsmqntlZjrj4TroZ0g67OA6rK9XG4gICAgICBjb25zdHJhaW50V2lkdGggPSB7XG4gICAgICAgIGlkZWFsOiAxMjgwXG4gICAgICB9O1xuICAgICAgY29uc3RyYWludEhlaWdodCA9IHtcbiAgICAgICAgaWRlYWw6IDcyMFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgY29uc3RyYWludHMgPSB7XG4gICAgICBhdWRpbzogZmFsc2UsXG4gICAgICB2aWRlbzoge1xuICAgICAgICB6b29tOiB7XG4gICAgICAgICAgaWRlYWw6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZmFjaW5nTW9kZToge1xuICAgICAgICAgIGlkZWFsOiB0aGlzLl9fZmFjaW5nTW9kZUNvbnN0cmFpbnRcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNNb2RlOiB7XG4gICAgICAgICAgaWRlYWw6ICdjb250aW51b3VzJ1xuICAgICAgICB9LFxuICAgICAgICB3aGl0ZUJhbGFuY2VNb2RlOiB7XG4gICAgICAgICAgaWRlYWw6ICdjb250aW51b3VzJ1xuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VJZDogY2FtZXJhLmxlbmd0aCA/IHtcbiAgICAgICAgICBpZGVhbDogY2FtZXJhW2NhbWVyYS5sZW5ndGggLSAxXVxuICAgICAgICB9IDogbnVsbCxcbiAgICAgICAgd2lkdGg6IGNvbnN0cmFpbnRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb25zdHJhaW50SGVpZ2h0XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIOy1nOy0iCDsp4TsnoUg7J207Ja07IScIHZpZGVvRGVpdmNlIOumrOyKpO2KuOulvCDqsIDsoLjsmKwg7IiYIOyXhuycvOuptCxcbiAgICAvLyBnZXRVc2VyTWVkaWHrpbwg7J6E7J2YIO2YuOy2nO2VmOyXrCDqtoztlZzsnYQg67Cb7J2A65KkIOuLpOyLnCDqsIDsoLjsmLRcbiAgICBpZiAoY2FtZXJhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fX2RlYnVnKCdjYW5ub3QgdG8gZ2V0IGNhbWVyYSBkZXZpY2VzLiBzbywgdHJ5IHRvIGdldCBjYW1lcmEgZGV2aWNlcyBhZ2FpbicpO1xuICAgICAgdGhpcy5fX2RlYnVnKGBjb25zdHJhaW50cyA6ICR7SlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpfWApO1xuICAgICAgdGhpcy5fX3N0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbiAgICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICAgICAgY2FtZXJhID0gYXdhaXQgdGhpcy5fX2dldElucHV0RGV2aWNlcygpO1xuICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBjYW1lcmEubGVuZ3RoID8ge1xuICAgICAgICBpZGVhbDogY2FtZXJhW2NhbWVyYS5sZW5ndGggLSAxXVxuICAgICAgfSA6IG51bGw7XG4gICAgfVxuXG4gICAgLy8g6rCk65+t7IucIHdpZGUg65OxIOyggOyCrOyWkSDquLDquLDsl5DshJwgRkhEIO2VtOyDgeuPhCDsubTrqZTrnbwg7IKs7Jqp7IucIO2ZgOytieydtOuQmOuKlCDtmITsg4Eg67Cp7KeAXG4gICAgLy8g7KCA7IKs7JaRIOq4sOq4sCDtjJDri6jquLDspIAgOiDtm4TrqbTsubTrqZTrnbzsnZgg6rCc7IiY6rCAIDHqsJzrnbzripQg6rCA7KCVXG4gICAgaWYgKGNhbWVyYS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX19kZWJ1ZygnbWF5YmUgZGV2aWNlIGlzIGVudHJ5IG1vZGVsIHN1Y2ggYXMgZ2FsYXh5IHdpZGUnKTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLndpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmhlaWdodCA9IHtcbiAgICAgICAgaWRlYWw6IDcyMFxuICAgICAgfTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0IGR1bXB0cmFjayA9IChbYSwgYl0sIHRyYWNrKSA9PlxuICAgICAgLy8gICBgJHthfSR7dHJhY2sua2luZCA9PSAndmlkZW8nID8gJ0NhbWVyYScgOiAnTWljcm9waG9uZSd9ICgke3RyYWNrLnJlYWR5U3RhdGV9KTogJHt0cmFjay5sYWJlbH0ke2J9YDtcblxuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgICAgdGhpcy5fX2RlYnVnKGBjb25zdHJhaW50cyA6ICR7SlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpfWApO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCd2aWRlb1RyYWNrcyA6OiAnLCBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKSk7XG4gICAgICBjb25zdCBzdHJlYW1TZXR0aW5ncyA9IHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoXG4gICAgICAvLyAgICdzdHJlYW1DYXBhYmlsaXRpZXMgOjogJyxcbiAgICAgIC8vICAgc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0Q2FwYWJpbGl0aWVzKClcbiAgICAgIC8vICk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3N0cmVhbSA6OiAnLCBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRDb25zdHJhaW50cygpKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1Zygnc3RyZWFtU2V0dGluZ3MgOjogJywgc3RyZWFtU2V0dGluZ3MpO1xuICAgICAgdGhpcy5fX2RlYnVnKGBzdHJlYW0gd2lkdGggKiBoZWlnaHQgOjogJHtzdHJlYW1TZXR0aW5ncy53aWR0aH0gKiAke3N0cmVhbVNldHRpbmdzLmhlaWdodH1gKTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIHdpZHRoIC8gaGVpZ2h0IDo6ICcgKyBzdHJlYW1TZXR0aW5ncy53aWR0aCAvIHN0cmVhbVNldHRpbmdzLmhlaWdodCk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSBhc3BlY3RSYXRpbyA6OiAnICsgc3RyZWFtU2V0dGluZ3MuYXNwZWN0UmF0aW8pO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gZmFjaW5nTW9kZSA6OiAnICsgc3RyZWFtU2V0dGluZ3MuZmFjaW5nTW9kZSk7XG4gICAgICBbY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgICAgW3JvdGF0aW9uQ2FudmFzLndpZHRoLCByb3RhdGlvbkNhbnZhcy5oZWlnaHRdID0gW3RoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoXTtcbiAgICAgIH1cbiAgICAgIHZpZGVvLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgIHRoaXMuX19zdHJlYW0gPSBzdHJlYW07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19pbml0U3R5bGUoKSB7XG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHtcbiAgICAgIG9jcixcbiAgICAgIGd1aWRlQm94LFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcblxuICAgIC8vIOq4sOykgOygleuztFxuICAgIGNvbnN0IGJhc2VXaWR0aCA9IDQwMDtcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gMjYwO1xuICAgIGNvbnN0IHNjYW5uZXJGcmFtZVJhdGlvID0gYmFzZUhlaWdodCAvIGJhc2VXaWR0aDsgLy8g7Iug67aE7KadIOu5hOycqFxuXG4gICAgbGV0IGd1aWRlQm94V2lkdGgsIGd1aWRlQm94SGVpZ2h0O1xuICAgIGxldCBjYWxjT2NyQ2xpZW50V2lkdGggPSBvY3IuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRIZWlnaHQgPSBvY3IuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGJvcmRlcldpZHRoID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS53aWR0aDtcbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnJhZGl1cztcbiAgICBjb25zdCBndWlkZUJveFJhdGlvQnlXaWR0aCA9IHRoaXMuX19ndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICBjb25zdCB2aWRlb1JhdGlvQnlIZWlnaHQgPSB0aGlzLl9fdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgLy8g7IS466GcIFVJICYmIOyEuOuhnCDruYTrlJTsmKTroZwg6rCE7KO8XG4gICAgICAvLyDqsIDroZwg6riw7KSA7Jy866GcIOqwgOydtOuTnOuwleyKpCDqs4TsgrBcbiAgICAgIGd1aWRlQm94V2lkdGggPSBjYWxjT2NyQ2xpZW50V2lkdGggKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDqsIDroZwgVUkgJiYg6rCA66GcIOu5hOuUlOyYpOuhnCDqsITso7xcbiAgICAgIC8vIOu5hOuUlOyYpOulvCDqsIDroZwgVUnsnZggaGVpZ2h0IOq4sOykgOycvOuhnCDspITsnbTqs6BcbiAgICAgIC8vIOqwgOuhnCBVSSBoZWlnaHQg6riw7KSA7Jy866GcIOu5hOuUlOyYpOydmCB3aWR0aCDqs4TsgrBcbiAgICAgIGd1aWRlQm94SGVpZ2h0ID0gY2FsY09jckNsaWVudEhlaWdodCAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgfVxuICAgIGd1aWRlQm94V2lkdGggKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGd1aWRlQm94SGVpZ2h0ICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94V2lkdGggKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveEhlaWdodCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGlmICh0b3BVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHRvcFVJLCB7XG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWlkZGxlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShtaWRkbGVVSSwge1xuICAgICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJvdHRvbVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoYm90dG9tVUksIHtcbiAgICAgICAgJ3BhZGRpbmctdG9wJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB2aWRlb0lubmVyR2FwID0gMjsgLy8g66+47IS47ZWY6rKMIG1hc2tCb3hJbm5lcuuztOuLpCBndWlkZUJveOqwgCDsnpHsnYDqsoMg67O07KCVXG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICB9KTtcbiAgICBjb25zdCBtYXNrQm94SW5uZXIgPSBtYXNrQm94V3JhcC5xdWVyeVNlbGVjdG9yKCcjbWFza0JveElubmVyJyk7XG4gICAgbGV0IHIgPSBib3JkZXJSYWRpdXMgLSBib3JkZXJXaWR0aCAqIDI7XG4gICAgciA9IHIgPCAwID8gMCA6IHI7XG4gICAgaWYgKCFpc05hTihyZWR1Y2VkR3VpZGVCb3hXaWR0aCkgJiYgIWlzTmFOKHJlZHVjZWRHdWlkZUJveEhlaWdodCkgJiYgIWlzTmFOKGJvcmRlclJhZGl1cykgJiYgIWlzTmFOKGJvcmRlcldpZHRoKSkge1xuICAgICAgY29uc3QgbWFza0JveElubmVyV2lkdGggPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgY29uc3QgbWFza0JveElubmVySGVpZ2h0ID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG1hc2tCb3hJbm5lcldpZHRoICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFza0JveElubmVySGVpZ2h0ICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneCcsIG1hc2tCb3hJbm5lcldpZHRoIC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneScsIG1hc2tCb3hJbm5lckhlaWdodCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J4JywgciArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J5JywgciArICcnKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19hZGp1c3RTdHlsZSgpIHtcbiAgICBjb25zdCBfX2NhbGNHdWlkZUJveENyaXRlcmlhID0gKGEsIGIpID0+IHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9PT0gJ2NhbWVyYVJlc29sdXRpb24nKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdvY3JWaWV3U2l6ZScpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGEsIGIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGEsIGIpOyAvLyBkZWZhdWx0IDogY2FtZXJhUmVzb2x1dGlvblxuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIDA7XG4gICAgY29uc3Qge1xuICAgICAgb2NyLFxuICAgICAgdmlkZW8sXG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcbiAgICBjb25zdCBpc0FsaWVuQmFjayA9IHRoaXMuX19vY3JUeXBlID09PSAnYWxpZW4tYmFjayc7XG5cbiAgICAvLyDquLDspIDsoJXrs7RcbiAgICBjb25zdCBiYXNlV2lkdGggPSBpc0FsaWVuQmFjayA/IDI2MCA6IDQwMDtcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gaXNBbGllbkJhY2sgPyA0MDAgOiAyNjA7XG4gICAgY29uc3Qgc2Nhbm5lckZyYW1lUmF0aW8gPSBiYXNlSGVpZ2h0IC8gYmFzZVdpZHRoOyAvLyDsi6DrtoTspp0g67mE7JyoXG5cbiAgICBsZXQgZ3VpZGVCb3hXaWR0aCwgZ3VpZGVCb3hIZWlnaHQ7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRXaWR0aCA9IG9jci5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY09jckNsaWVudEhlaWdodCA9IG9jci5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvSGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudFdpZHRoID0gdmlkZW8uY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9IHZpZGVvLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgICBpZiAoY2FsY1ZpZGVvV2lkdGggPT09IDAgfHwgY2FsY1ZpZGVvSGVpZ2h0ID09PSAwIHx8IGNhbGNWaWRlb0NsaWVudFdpZHRoID09PSAwIHx8IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGg7XG4gICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXM7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbY2FsY1ZpZGVvV2lkdGgsIGNhbGNWaWRlb0hlaWdodF0gPSBbY2FsY1ZpZGVvSGVpZ2h0LCBjYWxjVmlkZW9XaWR0aF07XG4gICAgICBbY2FsY1ZpZGVvQ2xpZW50V2lkdGgsIGNhbGNWaWRlb0NsaWVudEhlaWdodF0gPSBbY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9DbGllbnRXaWR0aF07XG4gICAgICBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uID09PSAncG9ydHJhaXQnID8gJ2xhbmRzY2FwZScgOiAncG9ydHJhaXQnO1xuICAgIH1cbiAgICBsZXQgbmV3VmlkZW9XaWR0aCA9IGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGxldCBuZXdWaWRlb0hlaWdodCA9IGNhbGNWaWRlb0NsaWVudEhlaWdodDtcbiAgICBjb25zdCBndWlkZUJveFJhdGlvQnlXaWR0aCA9IHRoaXMuX19ndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICBjb25zdCB2aWRlb1JhdGlvQnlIZWlnaHQgPSB0aGlzLl9fdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgIGNvbnN0IG5ld1ZpZGVvUmF0aW9CeVdpZHRoID0gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0IC8gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgY29uc3QgbmV3VmlkZW9SYXRpb0J5SGVpZ2h0ID0gY2FsY1ZpZGVvQ2xpZW50V2lkdGggLyBjYWxjVmlkZW9DbGllbnRIZWlnaHQ7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICAvLyDshLjroZwgVUlcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJ1xuICAgICAgfSk7XG4gICAgICAvLyB2aWRlbyDqsIDroZwg6riw7KSAIDEwMCUg7Jyg7KeAICjrs4Dqsr3sl4bsnYwpXG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOy5tOuplOudvOuPhCDshLjroZxcbiAgICAgICAgLy8g7IS466GcIFVJICYmIOyEuOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7ZmV64yAXG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOy5tOuplOudvOuKlCDqsIDroZxcbiAgICAgICAgLy8g7IS466GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpOulvCDruYTrlJTsmKQg7IS466GcIOq4uOydtOyXkCDrp57stqRcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNWaWRlb0NsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KTtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6rCA66GcIFVJXG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2VuZCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInXG4gICAgICB9KTtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g6rCA66GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g67mE65SU7Jik66W8IOqwgOuhnCBVSeydmCBoZWlnaHQg6riw7KSA7Jy866GcIOykhOydtOqzoFxuICAgICAgICAvLyDqsIDroZwgVUkgaGVpZ2h0IOq4sOykgOycvOuhnCDruYTrlJTsmKTsnZggd2lkdGgg6rOE7IKwXG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk64qUIOyEuOuhnCDquLDspIDsnLzroZwg66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuXG4gICAgICAgIC8vIOu5hOuUlOyYpOulvCDshLjroZwg6riw7KSA7Jy866GcIOuLpOyLnCDrp57stqRcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBndWlkZUJveEhlaWdodDtcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IG5ld1ZpZGVvSGVpZ2h0ICogbmV3VmlkZW9SYXRpb0J5SGVpZ2h0O1xuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCDqsIDroZwg7YGs6riw6rCAIOqwgOuhnCBVSSB3aWR0aCAqIHJhdGlvIOqwkuuztOuLpCDtgazrqbQsXG4gICAgICAgIGlmIChndWlkZUJveFdpZHRoID4gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoKSB7XG4gICAgICAgICAgLy8g6rOE7IKwIOuwqeyLneydhCDrsJTqvrzri6QgKOyCrOycoCA6IOqxsOydmCDsoJXsgqzqsIHtmJXsl5Ag6rCA6rmM7Jq0IOqyveyasCDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnOqwgCDqvYnssKjqsowg65CoLilcbiAgICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuXG4gICAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDtmZXrjIBcbiAgICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g6rCA66GcIFVJICYmIOyEuOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk7J2YIGhlaWdodCDtgazquLDrpbwgVUnsnZggaGVpZ2h0IOq4sOykgOyXkCDrp57stqRcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk7J2YIOqwgOuhnCDtgazquLDqsIAg6rCA66GcIFVJIHdpZHRoICogcmF0aW8g6rCS67O064ukIO2BrOuptCxcbiAgICAgICAgaWYgKGd1aWRlQm94V2lkdGggPiBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGgpIHtcbiAgICAgICAgICAvLyDqs4TsgrAg67Cp7Iud7J2EIOuwlOq+vOuLpCAo7IKs7JygIDog6rGw7J2YIOygleyCrOqwge2YleyXkCDqsIDquYzsmrQg6rK97JqwIOqwgOydtOuTnCDrsJXsiqQg6rCA66Gc6rCAIOq9ieywqOqyjCDrkKguKVxuICAgICAgICAgIGd1aWRlQm94V2lkdGggPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIOy2leyGjFxuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsY0d1aWRlQm94Q3JpdGVyaWEo7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUg6riw7KSAKeqwgCBvY3JWaWV3U2l6ZSjtmZTrqbQg7YGs6riwKSDquLDspIDsnbzrlYxcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdvY3JWaWV3U2l6ZScpIHtcbiAgICAgIC8vIGd1aWRlQm94SGVpZ2h0IOydtCBjYWxjT2NyQ2xpZW50SGVpZ2h0IOuztOuLpCDtgbDqsr3smrAo6rCA7J2065Oc67CV7Iqk6rCAIO2ZlOuptOydhCDrhJjslrTqsIDripQg6rK97JqwKSDri6Tsi5wg6rOE7IKwXG4gICAgICBpZiAoZ3VpZGVCb3hIZWlnaHQgPiBjYWxjT2NyQ2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gTWF0aC5taW4oY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuXG4gICAgICAvLyBndWlkZUJveEhlaWdodCDsnbQgY2FsY09jckNsaWVudEhlaWdodCDrs7Tri6Qg7YGw6rK97JqwKOqwgOydtOuTnOuwleyKpOqwgCDtmZTrqbTsnYQg64SY7Ja06rCA64qUIOqyveyasCkg64uk7IucIOqzhOyCsFxuICAgICAgaWYgKGd1aWRlQm94V2lkdGggPiBjYWxjT2NyQ2xpZW50V2lkdGgpIHtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IE1hdGgubWluKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGggPSBNYXRoLm1pbihndWlkZUJveFdpZHRoLCBuZXdWaWRlb1dpZHRoKTtcbiAgICB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodCA9IE1hdGgubWluKGd1aWRlQm94SGVpZ2h0LCBuZXdWaWRlb0hlaWdodCk7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbbmV3VmlkZW9XaWR0aCwgbmV3VmlkZW9IZWlnaHRdID0gW25ld1ZpZGVvSGVpZ2h0LCBuZXdWaWRlb1dpZHRoXTtcbiAgICB9XG4gICAgZ3VpZGVCb3hXaWR0aCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgZ3VpZGVCb3hIZWlnaHQgKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveFdpZHRoID0gZ3VpZGVCb3hXaWR0aCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveEhlaWdodCA9IGd1aWRlQm94SGVpZ2h0ICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgaWYgKHRvcFVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodG9wVUksIHtcbiAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtaWRkbGVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKG1pZGRsZVVJLCB7XG4gICAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICBwYWRkaW5nOiAnMTBweCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYm90dG9tVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShib3R0b21VSSwge1xuICAgICAgICAncGFkZGluZy10b3AnOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgd2lkdGg6IG5ld1ZpZGVvV2lkdGggKyAncHgnXG4gICAgfSk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICBoZWlnaHQ6IG5ld1ZpZGVvSGVpZ2h0ICsgJ3B4J1xuICAgIH0pO1xuICAgIGNvbnN0IHZpZGVvSW5uZXJHYXAgPSAyOyAvLyDrr7jshLjtlZjqsowgbWFza0JveElubmVy67O064ukIGd1aWRlQm946rCAIOyekeydgOqygyDrs7TsoJVcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHtcbiAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgIH0pO1xuICAgIGNvbnN0IG1hc2tCb3hJbm5lciA9IG1hc2tCb3hXcmFwLnF1ZXJ5U2VsZWN0b3IoJyNtYXNrQm94SW5uZXInKTtcbiAgICBsZXQgciA9IGJvcmRlclJhZGl1cyAtIGJvcmRlcldpZHRoICogMjtcbiAgICByID0gciA8IDAgPyAwIDogcjtcbiAgICBpZiAoIWlzTmFOKHJlZHVjZWRHdWlkZUJveFdpZHRoKSAmJiAhaXNOYU4ocmVkdWNlZEd1aWRlQm94SGVpZ2h0KSAmJiAhaXNOYU4oYm9yZGVyUmFkaXVzKSAmJiAhaXNOYU4oYm9yZGVyV2lkdGgpKSB7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJXaWR0aCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJIZWlnaHQgPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgbWFza0JveElubmVyV2lkdGggKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBtYXNrQm94SW5uZXJIZWlnaHQgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd4JywgbWFza0JveElubmVyV2lkdGggLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd5JywgbWFza0JveElubmVySGVpZ2h0IC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncngnLCByICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncnknLCByICsgJycpO1xuICAgIH1cblxuICAgIC8vIOyImOuPmSDstKzsmIEgVUkg7IKs7JqpXG4gICAgLy8gZmlyc3RDYWxsZWTsnbgg6rK97JqwIOyVhOyngSBjYXB0dXJlVUnqsIAg6re466Ck7KeA7KeAIOyViuyVhCDrrLTsnZjrr7hcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgIGRpc3BsYXk6ICcnXG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyAmJiBib3R0b21VSSAmJiBjYXB0dXJlVUkpIHtcbiAgICAgICAgY29uc3QgY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzID0gdGhpcy5fX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMoYm90dG9tVUkpO1xuICAgICAgICBsZXQgY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQgPSBjYXB0dXJlQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpLmdldEF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XG4gICAgICAgIGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID0gY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQgPT09IDAgPyA4MCA6IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0O1xuICAgICAgICBsZXQgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSA9IGJvdHRvbVVJLmNsaWVudEhlaWdodDtcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBpc05hTihwYXJzZUludChib3R0b21VSS5zdHlsZS5wYWRkaW5nVG9wKSkgPyAwIDogcGFyc2VJbnQoYm90dG9tVUkuc3R5bGUucGFkZGluZ1RvcCk7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzO1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0O1xuICAgICAgICBjb25zdCBiYXNlbGluZSA9IGNhbGNPY3JDbGllbnRIZWlnaHQgLSAoY2FsY09jckNsaWVudEhlaWdodCAvIDIgKyBndWlkZUJveEhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSA+IDAgJiYgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSA8IGJhc2VsaW5lKSB7XG4gICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAnJyxcbiAgICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6IGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gKyAncHgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAncGFkZGluZy1yaWdodCc6ICcxMHB4JyxcbiAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuX19pblByb2dyZXNzU3RlcCwgdHJ1ZSk7XG4gICAgdm9pZCAwO1xuICB9XG4gIF9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2RlcyhvYmopIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqPy5jaGlsZE5vZGVzKSB7XG4gICAgICBzdW0gKz0gaXRlbS5jbGllbnRIZWlnaHQgPyBpdGVtLmNsaWVudEhlaWdodCA6IDA7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH1cbiAgX19jbG9zZUNhbWVyYSgpIHtcbiAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgdGhpcy5zdG9wU2NhbigpO1xuICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICB9XG4gIGFzeW5jIF9fbG9hZFJlc291cmNlcygpIHtcbiAgICB2b2lkIDA7XG4gICAgaWYgKHRoaXMuX19yZXNvdXJjZXNMb2FkZWQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2lzU3VwcG9ydFNpbWQgPSBhd2FpdCBzaW1kKCk7XG4gICAgbGV0IGVudkluZm8gPSAnJztcbiAgICBlbnZJbmZvICs9IGBvcyA6ICR7dGhpcy5fX2RldmljZUluZm8ub3N9XFxuYDtcbiAgICBlbnZJbmZvICs9IGBvc1NpbXBsZSA6ICR7dGhpcy5fX2RldmljZUluZm8ub3NTaW1wbGV9XFxuYDtcbiAgICBlbnZJbmZvICs9IGBpc1N1cHBvcnRXYXNtOiAke3RoaXMuX19pc1N1cHBvcnRXYXNtfVxcbmA7XG4gICAgZW52SW5mbyArPSBgc2ltZCh3YXNtLWZlYXR1cmUtZGV0ZWN0KSA6ICR7dGhpcy5fX2lzU3VwcG9ydFNpbWR9XFxuYDtcbiAgICBpZiAodGhpcy5fX2RldmljZUluZm8ub3NTaW1wbGUgPT09ICdJT1MnIHx8IHRoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlID09PSAnTUFDJykge1xuICAgICAgdGhpcy5fX2lzU3VwcG9ydFNpbWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZW52SW5mbyArPSBgaXNTdXBwb3J0U2ltZChmaW5hbCkgOiAke3RoaXMuX19pc1N1cHBvcnRTaW1kfVxcbmA7XG4gICAgZW52SW5mbyArPSBgVXNlckFnZW50IDogJHtuYXZpZ2F0b3IudXNlckFnZW50fVxcbmA7XG4gICAgdm9pZCAwO1xuICAgIHRoaXMuX19kZWJ1ZyhlbnZJbmZvKTtcbiAgICB3aW5kb3cudXNlYk9DUkVudkluZm8gPSBlbnZJbmZvO1xuICAgIGxldCBzZGtTdXBwb3J0RW52ID0gJ3F1cmFtJztcbiAgICBpZiAodGhpcy5fX2lzU3VwcG9ydFNpbWQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHNka1N1cHBvcnRFbnYgKz0gJ19zaW1kJztcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgICB2b2lkIDA7XG4gICAgd2luZG93LnVzZWJPQ1JFbnZJbmZvID0gZW52SW5mbztcbiAgICB2b2lkIDA7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy5qcycsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCk7XG4gICAgbGV0IHNyYyA9IGF3YWl0IGZldGNoKHVybC5ocmVmKS50aGVuKHJlcyA9PiByZXMudGV4dCgpKS50aGVuKHRleHQgPT4ge1xuICAgICAgbGV0IHJlZ2V4ID0gLyguKikgPSBNb2R1bGUuY3dyYXAvZ207XG4gICAgICBsZXQgc291cmNlID0gdGV4dC5yZXBsYWNlKHJlZ2V4LCAnTW9kdWxlLiQxID0gTW9kdWxlLmN3cmFwJyk7XG5cbiAgICAgIC8vIGRhdGEobW9kZWwpXG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgvXlxcKGZ1bmN0aW9uXFwoXFwpIFxcey9tLCAndmFyIGNyZWF0ZU1vZGVsRGF0YSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xcbicgKyAnIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XFxuJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnICAgY29uc29sZS5lcnJvcihcInBhY2thZ2UgZXJyb3I6XCIsIGVycm9yKTsnLCAnICAgcmVqZWN0KCk7XFxuJyArICcgICBjb25zb2xlLmVycm9yKFwicGFja2FnZSBlcnJvcjpcIiwgZXJyb3IpOycpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJyAgfSwgaGFuZGxlRXJyb3IpJywgJyAgcmVzb2x2ZSgpO1xcbicgKyAnICB9LCBoYW5kbGVFcnJvciknKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKC9eXFx9XFwpXFwoXFwpOy9tLCAnXFxuIH0pXFxuJyArICd9OycpO1xuXG4gICAgICAvLyB3YXNtXG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShzZGtTdXBwb3J0RW52ICsgJy53YXNtJywgbmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy53YXNtJywgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKS5ocmVmKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKG5ldyBSZWdFeHAoYFJFTU9URV9QQUNLQUdFX0JBU0UgPSBbJ1wiXSR7c2RrU3VwcG9ydEVudn1cXFxcLmRhdGFbXCInXWAsICdnbScpLCBgUkVNT1RFX1BBQ0tBR0VfQkFTRSA9IFwiJHtuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLmRhdGEnLCB0aGlzLl9fb3B0aW9ucy5yZXNvdXJjZUJhc2VVcmwpLmhyZWZ9XCJgKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCdmdW5jdGlvbiBjcmVhdGVXYXNtJywgJ2FzeW5jIGZ1bmN0aW9uIGNyZWF0ZVdhc20nKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCdpbnN0YW50aWF0ZUFzeW5jKCk7JywgJ2F3YWl0IGluc3RhbnRpYXRlQXN5bmMoKTsnKTtcblxuICAgICAgLy8gd2FzbSBhbmQgZGF0YShtb2RlbCkgZmlsZSDrs5HroKzroZwgZmV0Y2gg7ZWY6riwIOychO2VtFxuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ3ZhciBhc20gPSBjcmVhdGVXYXNtKCk7JywgJ2NvbnNvbGUubG9nKFwiY3JlYXRlIHdhc20gYW5kIGRhdGEgLSBzdGFydFwiKVxcbicgKyAnYXdhaXQgKGFzeW5jIGZ1bmN0aW9uKCkge1xcbicgKyAnICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xcbicgKyAnICAgIHZhciBpc0NyZWF0ZWRXYXNtID0gZmFsc2U7XFxuJyArICcgICAgdmFyIGlzQ3JlYXRlZERhdGEgPSBmYWxzZTtcXG4nICsgJyAgICBjcmVhdGVXYXNtKCkudGhlbigoKSA9PiB7XFxuJyArICcgICAgICBpc0NyZWF0ZWRXYXNtID0gdHJ1ZTtcXG4nICsgJyAgICAgIGlmIChpc0NyZWF0ZWREYXRhKSB7IHJlc29sdmUoKTsgfVxcbicgKyAnICAgIH0pO1xcbicgKyAnICAgIGNyZWF0ZU1vZGVsRGF0YSgpLnRoZW4oKCkgPT4ge1xcbicgKyAnICAgICAgaXNDcmVhdGVkRGF0YSA9IHRydWU7XFxuJyArICcgICAgICBpZiAoaXNDcmVhdGVkV2FzbSkgeyByZXNvbHZlKCk7IH1cXG4nICsgJyAgICB9KVxcbicgKyAnICB9KTtcXG4nICsgJ30pKCk7XFxuJyArICdjb25zb2xlLmxvZyhcImNyZWF0ZSB3YXNtIGFuZCBkYXRhIC0gZW5kXCIpJyk7XG4gICAgICByZXR1cm4gc291cmNlO1xuICAgIH0pO1xuICAgIHNyYyA9IGBcbiAgICAoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAke3NyY31cbiAgICAgIE1vZHVsZS5sZW5ndGhCeXRlc1VURjggPSBsZW5ndGhCeXRlc1VURjhcbiAgICAgIE1vZHVsZS5zdHJpbmdUb1VURjggPSBzdHJpbmdUb1VURjhcbiAgICAgIHJldHVybiBNb2R1bGVcbiAgICB9KSgpXG4gICAgICAgIGA7XG4gICAgdGhpcy5fX09DUkVuZ2luZSA9IGF3YWl0IGV2YWwoc3JjKTtcbiAgICB0aGlzLl9fT0NSRW5naW5lLm9uUnVudGltZUluaXRpYWxpemVkID0gYXN5bmMgXyA9PiB7XG4gICAgICB2b2lkIDA7XG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLl9fT0NSRW5naW5lLm9uUnVudGltZUluaXRpYWxpemVkKCk7XG4gICAgdGhpcy5fX3Jlc291cmNlc0xvYWRlZCA9IHRydWU7XG4gICAgdm9pZCAwO1xuICB9XG4gIF9fc3RhcnRTY2FuV2FzbUltcGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX19kZXRlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgLy8gdGhpcy5fX3NldFBpaUVuY3J5cHRNb2RlKHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKTsgLy8gb2NyIHJlc3VsdCBlbmNyeXB0XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgdGhpcy5fX2FkZHJlc3MgPSAwO1xuICAgICAgdGhpcy5fX3BhZ2VFbmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50ID0gMDtcbiAgICAgIHRoaXMuX19zc2FSZXRyeUNvdW50ID0gMDtcbiAgICAgIGNvbnN0IHNjYW4gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICBpc0RldGVjdGVkQ2FyZCA9IG51bGwsXG4gICAgICAgICAgICBpbWdEYXRhID0gbnVsbCxcbiAgICAgICAgICAgIGltZ0RhdGFVcmwgPSBudWxsLFxuICAgICAgICAgICAgbWFza0ltYWdlID0gbnVsbCxcbiAgICAgICAgICAgIGZhY2VJbWFnZSA9IG51bGwsXG4gICAgICAgICAgICBzc2FSZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgc3NhUmVzdWx0TGlzdCA9IFtdLFxuICAgICAgICAgICAgbWFza0luZm8gPSBudWxsO1xuXG4gICAgICAgICAgLy8gYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKElOX1BST0dSRVNTLlJFQURZKTtcbiAgICAgICAgICBpZiAoIXRoaXMuX19PQ1JFbmdpbmVbJ2FzbSddKSByZXR1cm47XG5cbiAgICAgICAgICAvLyBUT0RPIDog7ISk7KCV7ZWg7IiYIOyeiOqyjCDrs4Dqsr0gIGRlZmF1bHQg6rCS64+EIOygnOqztVxuICAgICAgICAgIGNvbnN0IFtyZXNvbHV0aW9uX3csIHJlc29sdXRpb25faF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHZpZGVvXG4gICAgICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICAgICAgaWYgKHJlc29sdXRpb25fdyA9PT0gMCB8fCByZXNvbHV0aW9uX2ggPT09IDApIHJldHVybjtcbiAgICAgICAgICBpZiAodGhpcy5fX2RldGVjdGVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMTAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FkZHJlc3MgYmVmb3JlIC0tLS0tLS0tLScsIGFkZHJlc3MpO1xuICAgICAgICAgIGlmICh0aGlzLl9fYWRkcmVzcyA9PT0gMCAmJiAhdGhpcy5fX3BhZ2VFbmQgJiYgKGF3YWl0IHRoaXMuX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUodmlkZW8pKSkge1xuICAgICAgICAgICAgW3RoaXMuX19hZGRyZXNzLCB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFja10gPSB0aGlzLl9fZ2V0U2Nhbm5lckFkZHJlc3ModGhpcy5fX29jclR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuX19hZGRyZXNzIHx8IHRoaXMuX19wYWdlRW5kKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMTAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FkZHJlc3MgYWZ0ZXIgLS0tLS0tLS0tJywgYWRkcmVzcyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5fX29jclN0YXR1cyA8IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUykge1xuICAgICAgICAgICAgLy8gT0NSIOyZhOujjCDsnbTsoIQg7IOB7YOcXG5cbiAgICAgICAgICAgIC8vIGNhcmQgbm90IGRldGVjdGVkXG4gICAgICAgICAgICBbaXNEZXRlY3RlZENhcmQsIGltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKHRoaXMuX19hZGRyZXNzLCAwKTtcbiAgICAgICAgICAgIGlmICghaXNEZXRlY3RlZENhcmQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19pblByb2dyZXNzU3RlcCAhPT0gdGhpcy5JTl9QUk9HUkVTUy5SRUFEWSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLkNBUkRfREVURUNUX0ZBSUxFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTsgLy8g7ZWE7JqU7ZWc6rCAP1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYXJkIGlzIGRldGVjdGVkXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5DQVJEX0RFVEVDVF9TVUNDRVNTKTtcblxuICAgICAgICAgICAgLy8gc3NhIHJldHJ5IOyEpOygleydtCDrkJjslrQg7J6I7Jy86rGw64KYLCDsiJjrj5nstKzsmIFVSeulvCDsgqzsmqntlZjripQg6rK97JqwLCBjYXJkIGRldGVjdCDshLHqs7Xsi5wg7J2066+47KeAIOyggOyepVxuICAgICAgICAgICAgdGhpcy5fX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZShpbWdEYXRhLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUodHJ1ZSk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFtvY3JSZXN1bHQsIGltZ0RhdGFVcmwsIG1hc2tJbWFnZSwgZmFjZUltYWdlXSA9IGF3YWl0IHRoaXMuX19zdGFydFJlY29nbml0aW9uKHRoaXMuX19hZGRyZXNzLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCksIGltZ0RhdGEsIGltZ0RhdGFVcmwpO1xuXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgLy8gICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgICAgIC8vICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7ICAgICAgICAvLyDtlYTsmpTtlZzqsIA/XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX19vY3JTdGF0dXMgPj0gdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTKSB7XG4gICAgICAgICAgICAvLyBvY3Ig7JmE66OMIOydtO2bhCDsg4Htg5xcblxuICAgICAgICAgICAgLy8gZmFpbHVyZSBjYXNlXG4gICAgICAgICAgICBpZiAob2NyUmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9DUiBTdGF0dXMgaXMgJHt0aGlzLl9fb2NyU3RhdHVzfSwgYnV0IG9jclJlc3VsdCBpcyBmYWxzZWApOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc3VjY2VzcyBjYXNlXG4gICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTsgLy8gT0NSIOyZhOujjCDsi5zsoJDsl5AgY2FtZXJhIHByZXZpZXcgb2ZmXG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9fc3NhTW9kZSkge1xuICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgIC8vIOy1nOy0iCDsi5zrj4RcbiAgICAgICAgICAgICAgc3NhUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGgodGhpcy5fX29jclR5cGUsIHRoaXMuX19hZGRyZXNzKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignW0VSUl0gU1NBIE1PREUgaXMgdHJ1ZS4gYnV0LCBzc2FSZXN1bHQgaXMgbnVsbCcpOyAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICAgICAgICBzc2FSZXN1bHRMaXN0LnB1c2goc3NhUmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJldHJ5U3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBGQUtFID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnRkFLRSc7XG4gICAgICAgICAgICAgICAgY29uc3QgUkVBTCA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ1JFQUwnO1xuICAgICAgICAgICAgICAgIGNvbnN0IEVOU0VNQkxFID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnRU5TRU1CTEUnO1xuICAgICAgICAgICAgICAgIGxldCBpc0NvbXBsZXRlZCA9IGZhbHNlOyAvLyDruYTrj5nquLAgZm9yIOusuCDrlYzrrLjsl5AgYnJlYWvqsIAg7JWI6rG466as64qUIOydtOyKiOuhnCDrhKPsnYxcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19zc2FSZXRyeUNvdW50ID09PSB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zdCBleGVjdXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3NhUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBzc2FSZXN1bHQgPSBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aFJldHJ5KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fYWRkcmVzcywgaXRlbSk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ1tFUlJdIFNTQSBNT0RFIGlzIHRydWUuIGJ1dCwgc3NhUmVzdWx0IGlzIG51bGwnKTsgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgICAgICAgICAgICAgc3NhUmVzdWx0TGlzdC5wdXNoKHNzYVJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaWYgKEZBS0UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdC5pbmRleE9mKCdSRUFMJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChSRUFMKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQuaW5kZXhPZignRkFLRScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoRU5TRU1CTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXRyeVdvcmtpbmdUaW1lID0gbmV3IERhdGUoKSAtIHJldHJ5U3RhcnREYXRlO1xuICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFza0luZm8pIHtcbiAgICAgICAgICAgICAgbWFza0luZm8gPSB0aGlzLl9fZ2V0TWFza0luZm8odGhpcy5fX2FkZHJlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICBsZWdhY3lGb3JtYXQsXG4gICAgICAgICAgICAgIG5ld0Zvcm1hdFxuICAgICAgICAgICAgfSA9IHVzZWJPQ1JXQVNNUGFyc2VyLnBhcnNlT2NyUmVzdWx0KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgb2NyUmVzdWx0LCBzc2FSZXN1bHQsIHRoaXMuX19zc2FSZXRyeUNvdW50LCBzc2FSZXN1bHRMaXN0LCB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUsIHRoaXMuX19vcHRpb25zLnNzYVJldHJ5UGl2b3RcbiAgICAgICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgICAgICAvLyB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZVxuICAgICAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgcmV2aWV3X3Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgb2NyX3R5cGU6IHRoaXMuX19vY3JUeXBlLFxuICAgICAgICAgICAgICBvY3JfcmVzdWx0OiBuZXdGb3JtYXQsXG4gICAgICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IGltZ0RhdGFVcmwsXG4gICAgICAgICAgICAgIG9jcl9tYXNraW5nX2ltYWdlOiBtYXNrSW1hZ2UsXG4gICAgICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiBmYWNlSW1hZ2UsXG4gICAgICAgICAgICAgIG1hc2tJbmZvOiBtYXNrSW5mbyxcbiAgICAgICAgICAgICAgc3NhX21vZGU6IHRoaXMuX19zc2FNb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIG1hc2tJbWFnZSwgZmFjZUltYWdlKTtcbiAgICAgICAgICAgIHRoaXMuZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VMZWdhY3lGb3JtYXQpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfZGF0YSA9IGxlZ2FjeUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19vblN1Y2Nlc3NQcm9jZXNzKHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnQ2FyZCBkZXRlY3Rpb24gZXJyb3InO1xuICAgICAgICAgIGlmIChlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSAnOiAnICsgZS5tZXNzYWdlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBpZiAoZS50b1N0cmluZygpLmluY2x1ZGVzKCdtZW1vcnknKSkge1xuICAgICAgICAgIC8vICAgYXdhaXQgdGhpcy5fX3JlY292ZXJ5U2NhbigpO1xuICAgICAgICAgIC8vICAgdGhpcy5fX3JlY292ZXJlZCA9IHRydWU7XG4gICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnV0EwMDEnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmICh0aGlzLl9fcmVjb3ZlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9fcmVjb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGhpcy5fX2RldGVjdGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNjYW4sIDEpOyAvLyDsnqzqt4BcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHNldFRpbWVvdXQoc2NhbiwgMSk7IC8vIFVJIOuenOuNlOungSBibG9ja2luZyDrsKnsp4AgKHNldFRpbWVvdXQpXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBfX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIG1hc2tJbWFnZSwgZmFjZUltYWdlLCBjb25zdGFudE51bWJlcikge1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlKSB7XG4gICAgICBjb25zdCByZXNpemVSYXRpbyA9IHRoaXMuX19jcm9wSW1hZ2VTaXplSGVpZ2h0IC8gdGhpcy5fX2Nyb3BJbWFnZVNpemVXaWR0aDtcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBtYXhXaWR0aDogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoLFxuICAgICAgICBtYXhIZWlnaHQ6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCAqIHJlc2l6ZVJhdGlvLFxuICAgICAgICBjb252ZXJ0U2l6ZTogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSxcbiAgICAgICAgdGFyZ2V0Q29tcHJlc3NWb2x1bWU6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUgLy8gY3VzdG9tIG9wdGlvblxuICAgICAgfTtcblxuICAgICAgcmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UoaW1nRGF0YVVybCwgZGVmYXVsdE9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcblxuICAgICAgLy8gbWFza2luZyDsnbTrr7jsp4DripQgcmVzaXplIO2VmOuptCwgbWFzayDsooztkZzqsIAg7Ja06riL64KY66+A66GcIOumrOyCrOydtOymiCDslYjtlZjqs6Ag7JWV7LaV66eMIOynhO2WiVxuICAgICAgY29uc3QgbWFza2luZ0ltYWdlT3B0aW9ucyA9IHtcbiAgICAgICAgcXVhbGl0eTogZGVmYXVsdE9wdGlvbnMucXVhbGl0eSxcbiAgICAgICAgdGFyZ2V0Q29tcHJlc3NWb2x1bWU6IGRlZmF1bHRPcHRpb25zLnRhcmdldENvbXByZXNzVm9sdW1lXG4gICAgICB9O1xuICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfbWFza2luZ19pbWFnZSA9IGF3YWl0IHRoaXMuX19jb21wcmVzZUJhc2U2NEltYWdlKG1hc2tJbWFnZSwgbWFza2luZ0ltYWdlT3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfZmFjZV9pbWFnZSA9IGF3YWl0IHRoaXMuX19jb21wcmVzZUJhc2U2NEltYWdlKGZhY2VJbWFnZSwgZGVmYXVsdE9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICB9XG4gIH1cbiAgX19yZXF1ZXN0R2V0QVBJVG9rZW4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNyZWRlbnRpYWwgPSB0aGlzLl9fb3B0aW9ucy5hdXRoU2VydmVySW5mby5jcmVkZW50aWFsO1xuICAgICAgY29uc3QgYmFzZVVybCA9IHRoaXMuX19vcHRpb25zLmF1dGhTZXJ2ZXJJbmZvLmJhc2VVcmw7XG4gICAgICBmZXRjaChgJHtiYXNlVXJsfS9zaWduLWluYCwge1xuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjcmVkZW50aWFsKSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCdcbiAgICAgICAgLy8gbW9kZTogJ2NvcnMnLFxuICAgICAgICAvLyBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIGZldGNoKGAke2Jhc2VVcmx9L3VzZWIvdG9rZW5gLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Jlc3VsdC50b2tlbn1gXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiBudWxsLFxuICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihqc29uID0+IHtcbiAgICAgICAgICByZXNvbHZlKGpzb24udG9rZW4pO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX19yZXF1ZXN0U2VydmVyT0NSKG9jclR5cGUsIHNzYU1vZGUsIGltZ0RhdGFVcmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGJhc2VVcmwgPSB0aGlzLl9fb3B0aW9ucy5vY3JTZXJ2ZXJCYXNlVXJsO1xuICAgICAgICBzd2l0Y2ggKG9jclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2lkY2FyZC1kcml2ZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9wYXNzcG9ydCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvYWxpZW4tYmFjayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvYWxpZW4nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ3JlZGl0IGNhcmQgaXMgbm90IFVuc3VwcG9ydGVkIFNlcnZlciBPQ1InKTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBPQ1IgdHlwZTogJHtvY3JUeXBlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFwaVRva2VuID0gYXdhaXQgdGhpcy5fX3JlcXVlc3RHZXRBUElUb2tlbigpO1xuICAgICAgICBjb25zdCBteUhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBteUhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke2FwaVRva2VufWApO1xuICAgICAgICBjb25zdCByYXcgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW1hZ2VfYmFzZTY0OiBpbWdEYXRhVXJsLFxuICAgICAgICAgIHNzYV9tb2RlOiAndHJ1ZScsXG4gICAgICAgICAgbWFza19tb2RlOiAndHJ1ZScsXG4gICAgICAgICAgZmFjZV9tb2RlOiAndHJ1ZSdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcbiAgICAgICAgICBib2R5OiByYXcsXG4gICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnXG4gICAgICAgIH07XG4gICAgICAgIGZldGNoKGJhc2VVcmwsIHJlcXVlc3RPcHRpb25zKS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX3N0YXJ0U2NhblNlcnZlckltcGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0TGlzdCA9IFtdO1xuICAgICAgICBjb25zdCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIOy6lOuyhOyKpOyXkOyEnCDsnbTrr7jsp4Drpbwg6rCA7KC47Ji0XG4gICAgICAgICAgY29uc3QgWywgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICAgICAgaWYgKDEgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNlcnZlciBvY3Ig7Iuk7YyoICjrsJzsg50g6rCA64ql7ISxIOyXhuydjClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDshLHqs7VcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9jclJlc3VsdCA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0U2VydmVyT0NSKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgICAgLy8gZmFpbHVyZSBjYXNlXG4gICAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgT0NSIGlzIGZhaWxlZGApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzc2Eg7Iuc64+EP1xuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBiYXNlNjRJbWFnZVJlc3VsdCxcbiAgICAgICAgICAgICAgbWFza0luZm9cbiAgICAgICAgICAgIH0gPSB1c2ViT0NSQVBJUGFyc2VyLnBhcnNlT2NyUmVzdWx0KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgb2NyUmVzdWx0KTtcbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZSxcbiAgICAgICAgICAgICAgb2NyX2FwaV9yZXNwb25zZTogb2NyUmVzdWx0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSwgYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLCAwLjApO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja0NhcHR1cmVCdXR0b24pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ1NlcnZlciBPQ1IgRXJyb3InO1xuICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnUVMwMDEnLCBlLCBlcnJvck1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVSTCkge1xuICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICBpZiAodGhpcy5fX3NzYU1vZGUgJiYgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDAgfHwgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJICYmIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgbGV0IGxpbWl0U2F2ZUltYWdlQ291bnQgPSBNYXRoLm1heCh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50LCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCk7XG4gICAgICBpZiAodGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLmxlbmd0aCA9PT0gbGltaXRTYXZlSW1hZ2VDb3VudCkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLnB1c2goaW1nRGF0YSk7XG4gICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQucHVzaChpbWdEYXRhVVJMKTtcbiAgICAgICAgdm9pZCAwOyAvLyBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgfVxuXG4gICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX19vblN1Y2Nlc3NQcm9jZXNzKHJldmlld19yZXN1bHQpIHtcbiAgICAvLyDsnbjsi50g7ISx6rO1IOyKpOy6lCDro6jtlIQg7KKF66OMXG4gICAgaWYgKHJldmlld19yZXN1bHQuc3NhX21vZGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1MpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBhcGlfcmVzcG9uc2U6IHtcbiAgICAgICAgcmVzdWx0X2NvZGU6ICdOMTAwJyxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6ICdPSy4nXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnc3VjY2VzcycsXG4gICAgICByZXZpZXdfcmVzdWx0OiByZXZpZXdfcmVzdWx0XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uU3VjY2Vzcykge1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIGUsIGVycm9yTWVzc2FnZSkge1xuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQpO1xuICAgIGxldCBlcnJvckRldGFpbCA9ICcnO1xuICAgIGlmIChlPy50b1N0cmluZygpKSBlcnJvckRldGFpbCArPSBlLnRvU3RyaW5nKCk7XG4gICAgaWYgKGU/LnN0YWNrKSBlcnJvckRldGFpbCArPSBlLnN0YWNrO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogcmVzdWx0Q29kZSxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgfSxcbiAgICAgIHJlc3VsdDogJ2ZhaWxlZCcsXG4gICAgICByZXZpZXdfcmVzdWx0OiB7XG4gICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgZXJyb3JfZGV0YWlsOiBlcnJvckRldGFpbFxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHRoaXMuX19vbkZhaWx1cmUpIHtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUocmVzdWx0KTtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcHJlbG9hZGluZ1dhc20oKSB7XG4gICAgY29uc3QgcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpO1xuICAgIGlmICghdGhpcy5pc1ByZWxvYWRlZCgpICYmIHByZWxvYWRpbmdTdGF0dXMgPT09IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGF3YWl0IHRoaXMucHJlbG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgYXdhaXQgdGhpcy5fX3dhaXRQcmVsb2FkZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgYWJub3JtYWxseSBwcmVsb2FkaW5nIHN0YXR1cywgcHJlbG9hZGVkOiAke3RoaXMuaXNQcmVsb2FkZWQoKX0gLyBwcmVsb2FkaW5nU3RhdHVzOiAke3RoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gIC8vIF9fc2V0UGlpRW5jcnlwdE1vZGUocGlpRW5jcnlwdE1vZGUpIHtcbiAgLy8gICB0aGlzLl9fT0NSRW5naW5lLnNldFBpaUVuY3J5cHQocGlpRW5jcnlwdE1vZGUpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZW5jcnlwdERldGVjdGVkQmFzZTY0KGFkZHJlc3MsIG1hc2ssIG9jcl9tb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkUGhvdG9CYXNlNjQoYWRkcmVzcyk7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRCYXNlNjRqcGdEZXRlY3RlZEZyYW1lQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBvY3JfbW9kZVxuICAvLyAgICk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19nZXRFbmNyeXB0ZWRTaXplKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ1NpemUoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZEJ1ZmZlcigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNyeXB0ZWRKcGdCdWZmZXIoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChhZGRyZXNzLCBtYXNrLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgY29uc3QgZW5jcnlwdERldGVjdGVkQmFzZTY0ID0gdGhpcy5fX2VuY3J5cHREZXRlY3RlZEJhc2U2NChcbiAgLy8gICAgIGFkZHJlc3MsXG4gIC8vICAgICBtYXNrLFxuICAvLyAgICAgaW1nTW9kZSxcbiAgLy8gICAgIGltZ1R5cGVcbiAgLy8gICApO1xuICAvLyAgIGlmIChlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPT09IDEpIHtcbiAgLy8gICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fZ2V0RW5jcnlwdGVkU2l6ZSgpO1xuICAvLyAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19nZXRFbmNyeXB0ZWRCdWZmZXIoKTtcbiAgLy9cbiAgLy8gICAgIGNvbnN0IGVuY3J5cHRlZCA9IG5ldyBVaW50OEFycmF5KFxuICAvLyAgICAgICB0aGlzLl9fT0NSRW5naW5lLkhFQVA4LmJ1ZmZlcixcbiAgLy8gICAgICAganBnUG9pbnRlcixcbiAgLy8gICAgICAganBnU2l6ZVxuICAvLyAgICAgKTtcbiAgLy8gICAgIGNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuICAvLyAgICAgY29uc3QgZGVjb2RlZFN0cmluZyA9IHRleHREZWNvZGVyLmRlY29kZShlbmNyeXB0ZWQpO1xuICAvL1xuICAvLyAgICAgcmV0dXJuIGRlY29kZWRTdHJpbmc7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiAnJztcbiAgLy8gfVxuICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICBhc3luYyBfX3N0YXJ0U2Nhbldhc20oKSB7XG4gICAgdGhpcy5fX2RlYnVnKCd3YXNtX21vZGUnKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbUltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19zdGFydFNjYW5TZXJ2ZXIoKSB7XG4gICAgdGhpcy5fX2RlYnVnKCdzZXJ2ZXJfbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSA9IHRydWU7XG4gICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2NhblNlcnZlckltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19yZWNvdmVyeVNjYW4oKSB7XG4gICAgdm9pZCAwO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3BTY2FuKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2Nhbldhc20oKTtcbiAgfVxuICBzdG9wU2NhbigpIHtcbiAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlOyAvLyBzd2l0Y2ggdG8gc2VydmVy7J2865WMIOq4sOyhtCBXQVNNIGxvb3Ag6rCV7KCc7KKF66OMXG4gICAgY29uc3Qge1xuICAgICAgY2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhbnZhcykge1xuICAgICAgY29uc3QgY2FudmFzQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuICB9XG4gIHN0b3BTdHJlYW0oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkKTtcbiAgICBpZiAodGhpcy5fX3N0cmVhbSkge1xuICAgICAgdGhpcy5fX3N0cmVhbS5zdG9wICYmIHRoaXMuX19zdHJlYW0uc3RvcCgpO1xuICAgICAgbGV0IHRyYWNrcyA9IHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzICYmIHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAodHJhY2tzICYmIHRyYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgdHJhY2tzLmZvckVhY2godHJhY2sgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zdHJlYW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDrqZTrqqjrpqwgYWxsb2NhdGlvbiBmcmVlIO2VqOyImCAqL1xuICBjbGVhbnVwKCkge1xuICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKTtcbiAgICB0aGlzLl9fZGVzdHJveUJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95UHJldkltYWdlKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCk7XG4gIH1cbiAgcmVzdG9yZUluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIH1cbiAgX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgaWYgKHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpO1xuICAgICAgdGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVXNlQk9DUjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBT0EsUUFBUSxNQUFNLHVCQUF1QjtBQUM1QyxPQUFPQyxpQkFBaUIsTUFBTSxtQ0FBbUM7QUFDakUsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBQy9ELFNBQVNDLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBUSxrQ0FBa0M7QUFDeEYsT0FBT0MsU0FBUyxNQUFNLHlCQUF5QjtBQUMvQyxJQUFJQyxRQUFRO0FBQ1osTUFBTUMsT0FBTyxDQUFDO0VBb0NaOztFQUVBOztFQXVFaUM7RUFDTDs7RUFNRTtFQUNGO0VBQ0M7O0VBSzdCOztFQThLQTtFQUNBQyxXQUFXQSxDQUFBLEVBQUc7SUFBQUMsZUFBQSxzQkF6U0E7TUFDWkMsSUFBSSxFQUFFLE1BQU07TUFDWkMsU0FBUyxFQUFFLFdBQVc7TUFDdEJDLEtBQUssRUFBRSxPQUFPO01BQ2RDLG1CQUFtQixFQUFFLGdCQUFnQjtNQUNyQ0Msa0JBQWtCLEVBQUUsZUFBZTtNQUNuQ0Msc0JBQXNCLEVBQUUsd0JBQXdCO01BQ2hEQyxxQkFBcUIsRUFBRSx1QkFBdUI7TUFDOUNDLGNBQWMsRUFBRSxZQUFZO01BQzVCQyx1QkFBdUIsRUFBRSxxQkFBcUI7TUFDOUNDLFdBQVcsRUFBRSxhQUFhO01BQzFCQyxvQkFBb0IsRUFBRSxzQkFBc0I7TUFDNUNDLFVBQVUsRUFBRTtJQUNkLENBQUM7SUFBQVosZUFBQSxxQkFDWTtNQUNYRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO01BQ2JDLEtBQUssRUFBRSxDQUFDO01BQ1JPLFdBQVcsRUFBRSxDQUFDO01BQ2RHLElBQUksRUFBRTtJQUNSLENBQUM7SUFBQWIsZUFBQSw0QkFDbUI7TUFDbEJjLFdBQVcsRUFBRSxDQUFDLENBQUM7TUFDZkMsT0FBTyxFQUFFLENBQUM7TUFDVkYsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUFBYixlQUFBLHVCQUNjO01BQ2JnQixPQUFPLEVBQUUsQ0FBQztNQUNWQyxRQUFRLEVBQUUsQ0FBQztNQUNYaEIsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUFBRCxlQUFBLDRCQUNtQjtNQUNsQmtCLEtBQUssRUFBRSxDQUFDO01BQ1JDLElBQUksRUFBRTtJQUNSLENBQUM7SUFBQW5CLGVBQUEsc0JBS2EsS0FBSztJQUFBQSxlQUFBLHNCQUNMLElBQUk7SUFBQUEsZUFBQSwwQkFDQSxLQUFLO0lBQUFBLGVBQUEsMEJBQ0wsS0FBSztJQUFBQSxlQUFBLHdCQUNQLEtBQUs7SUFBQUEsZUFBQSxzQkFDUCxLQUFLO0lBQUFBLGVBQUEsNkJBQ0UsSUFBSSxDQUFDb0IsaUJBQWlCLENBQUNOLFdBQVc7SUFBQWQsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUEsb0JBRzNDLEtBQUs7SUFBQUEsZUFBQSxzQkFDSCxJQUFJLENBQUNxQixVQUFVLENBQUNuQixTQUFTO0lBQUFGLGVBQUEsbUNBQ1osRUFBRTtJQUFBQSxlQUFBLGdDQUNMLENBQUM7SUFBQUEsZUFBQSwwQkFDUCxDQUFDO0lBQUFBLGVBQUEsOEJBQ0csRUFBRTtJQUFBQSxlQUFBLG9DQUNJLEVBQUU7SUFBQUEsZUFBQSxzQkFDaEIsSUFBSTtJQUFBQSxlQUFBLHNCQUNKLElBQUk7SUFBQUEsZUFBQSwrQkFDSyxJQUFJO0lBQUFBLGVBQUEsd0JBQ1gsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLENBQUM7SUFBQUEsZUFBQSxrQ0FDNUosSUFBSXNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFBdEIsZUFBQSxrQ0FDL0osSUFBSXNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUFBdEIsZUFBQSxvQkFDN0ssS0FBSztJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLG9CQXNCTCxDQUFDO0lBQUFBLGVBQUEscUJBQ0EsS0FBSztJQUFBQSxlQUFBLHNCQUNKLEtBQUs7SUFBQUEsZUFBQSxtQkFDUixJQUFJO0lBQUFBLGVBQUEseUJBQ0UsSUFBSTtJQUFBQSxlQUFBLDhCQUNDLElBQUk7SUFBQUEsZUFBQSxzQkFDWixJQUFJO0lBQUFBLGVBQUEsNkJBQ0csSUFBSTtJQUFBQSxlQUFBLDJCQUNOLEtBQUs7SUFBQUEsZUFBQSw0QkFDSixDQUFDO0lBQUFBLGVBQUEsNkJBQ0EsQ0FBQztJQUFBQSxlQUFBLHVCQUNQLENBQUM7SUFBQUEsZUFBQSx3QkFDQSxDQUFDO0lBQUFBLGVBQUEsNEJBQ0csS0FBSztJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQSxxQ0FHSSxDQUFDO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLG1DQUdILElBQUk7SUFBQUEsZUFBQSxpQ0FDTixhQUFhO0lBQUFBLGVBQUEsMEJBQ3BCLEVBQUU7SUFBQUEsZUFBQSw4QkFDRSxFQUFFO0lBQUFBLGVBQUEsNkJBQ0gsRUFBRTtJQUFBQSxlQUFBLGtDQUNHLElBQUk7SUFBQUEsZUFBQSxrQ0FDSixHQUFHO0lBQUFBLGVBQUEsb0NBQ0QsR0FBRztJQUFBQSxlQUFBLGlDQUNOLENBQUM7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLDZCQUVMLEtBQUs7SUFBQUEsZUFBQSwyQkFDUCxJQUFJLENBQUN1QixXQUFXLENBQUNyQixTQUFTO0lBQUFGLGVBQUEsbUNBQ2xCLElBQUksQ0FBQ3VCLFdBQVcsQ0FBQ3RCLElBQUk7SUFBQUQsZUFBQSxxQ0FDbkIsS0FBSztJQUFBQSxlQUFBLGlDQUNULEdBQUc7SUFBQUEsZUFBQSwrQkFDTCxHQUFHO0lBQUFBLGVBQUEsZ0NBQ0YsR0FBRztJQUFBQSxlQUFBLCtCQUNKLENBQUM7SUFBQUEsZUFBQSxnQ0FDQSxDQUFDO0lBQUFBLGVBQUEsaUNBQ0EsS0FBSztJQUFBQSxlQUFBLG9CQUdsQixJQUFJd0IsTUFBTSxDQUFDO01BQ3JCO01BQ0FDLGFBQWEsRUFBRSxLQUFLO01BQ3BCO01BQ0FDLGlCQUFpQixFQUFFLEtBQUs7TUFDeEI7O01BRUE7TUFDQTtNQUNBQyxjQUFjLEVBQUUsS0FBSztNQUNyQjtNQUNBQyxpQkFBaUIsRUFBRSxLQUFLO01BQ3hCO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsV0FBVyxFQUFFLElBQUk7TUFDakI7TUFDQUMsWUFBWSxFQUFFLElBQUk7TUFDbEI7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsZ0JBQWdCLEVBQUUsS0FBSztNQUN2QjtNQUNBQyx3QkFBd0IsRUFBRSxJQUFJO01BQzlCO01BQ0FDLHlCQUF5QixFQUFFLElBQUksR0FBRyxFQUFFO01BQ3BDOztNQUVBO01BQ0FDLFFBQVEsRUFBRSxJQUFJO01BQ2Q7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsV0FBVyxFQUFFLElBQUk7TUFDakI7TUFDQUMsa0JBQWtCLEVBQUUsSUFBSTtNQUN4QjtNQUNBQyxXQUFXLEVBQUUsSUFBSTtNQUNqQjtNQUNBQyxrQkFBa0IsRUFBRSxLQUFLO01BQ3pCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLG1CQUFtQixFQUFFLHNDQUFzQztNQUMzRDtNQUNBQyxnQkFBZ0IsRUFBRTtRQUNoQkMsS0FBSyxFQUFFLENBQUM7UUFDUjtRQUNBQyxNQUFNLEVBQUUsRUFBRTtRQUNWO1FBQ0FDLEtBQUssRUFBRSxPQUFPO1FBQ2Q7O1FBRUE7UUFDQUMsU0FBUyxFQUFFLFNBQVM7UUFDcEI7UUFDQUMsS0FBSyxFQUFFLFNBQVM7UUFDaEI7UUFDQUMsY0FBYyxFQUFFLFNBQVM7UUFDekI7UUFDQUMsYUFBYSxFQUFFLFNBQVM7UUFDeEI7UUFDQUMsc0JBQXNCLEVBQUUsU0FBUztRQUNqQztRQUNBQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDO1FBQ0FDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCO1FBQ0FDLG1CQUFtQixFQUFFLFNBQVM7UUFDOUI7UUFDQUMsV0FBVyxFQUFFLFNBQVM7UUFDdEI7UUFDQUMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQjtRQUNBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO01BQ3hCLENBQUM7O01BRUQ7TUFDQUMsdUJBQXVCLEVBQUUsSUFBSTtNQUM3QjtNQUNBQyxjQUFjLEVBQUU7UUFDZEMsVUFBVSxFQUFFLFNBQVM7UUFDckI7UUFDQUMsVUFBVSxFQUFFLFNBQVM7UUFDckI7O1FBRUE7UUFDQWQsU0FBUyxFQUFFLFNBQVM7UUFDcEI7UUFDQUMsS0FBSyxFQUFFLFNBQVM7UUFDaEI7UUFDQUMsY0FBYyxFQUFFLFNBQVM7UUFDekI7UUFDQUMsYUFBYSxFQUFFLFNBQVM7UUFDeEI7UUFDQUMsc0JBQXNCLEVBQUUsU0FBUztRQUNqQztRQUNBQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDO1FBQ0FDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCO1FBQ0FDLG1CQUFtQixFQUFFLFNBQVM7UUFDOUI7UUFDQUMsV0FBVyxFQUFFLFNBQVM7UUFDdEI7UUFDQUMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQjtRQUNBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO01BQ3hCLENBQUM7O01BRUQ7TUFDQUsseUJBQXlCLEVBQUUsS0FBSztNQUNoQztNQUNBQywyQkFBMkIsRUFBRSxLQUFLO01BQ2xDO01BQ0FDLHVCQUF1QixFQUFFLElBQUk7TUFDN0I7TUFDQUMsa0JBQWtCLEVBQUUsS0FBSztNQUN6Qjs7TUFFQTtNQUNBQyxrQkFBa0IsRUFBRTtRQUNsQkMsWUFBWSxFQUFFLFNBQVM7UUFDdkI7UUFDQU4sVUFBVSxFQUFFLFNBQVMsQ0FBQztNQUN4QixDQUFDOztNQUVETyxlQUFlLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNO01BQ3ZDO01BQ0FDLFdBQVcsRUFBRSxFQUFFO01BQ2ZDLGFBQWEsRUFBRSxFQUFFO01BQ2pCO01BQ0FDLGNBQWMsRUFBRSxDQUFDO01BQ2pCO01BQ0FDLFVBQVUsRUFBRSxLQUFLO01BQ2pCO01BQ0FDLGtDQUFrQyxFQUFFLElBQUk7TUFDeEM7TUFDQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDO01BQ25DOztNQUVBO01BQ0E7TUFDQUMsd0JBQXdCLEVBQUUsYUFBYTtNQUN2Qzs7TUFFQTtNQUNBQyxvQkFBb0IsRUFBRSxrQkFBa0I7TUFDeEM7TUFDQTs7TUFFQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQUMsWUFBWSxFQUFFLFVBQVU7TUFDeEJDLGFBQWEsRUFBRSxHQUFHO01BQ2xCO01BQ0FDLGdCQUFnQixFQUFFLENBQUM7TUFDbkI7O01BRUE7TUFDQUMsYUFBYSxFQUFFO0lBQ2pCLENBQUMsQ0FBQztJQUlBLElBQUl4RixRQUFRLEVBQUUsT0FBT0EsUUFBUTtJQUM3QkEsUUFBUSxHQUFHLElBQUk7SUFDZixPQUFPQSxRQUFRO0VBQ2pCOztFQUVBO0VBQ015RixVQUFVQSxDQUFDQyxXQUFXLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQUEsT0FBQUMsaUJBQUE7TUFDNUIsSUFBSUQsS0FBSSxDQUFDRSxXQUFXLEVBQUUsRUFBRTtRQUN0QixLQUFLLENBQUM7UUFDTixJQUFJSCxXQUFXLEVBQUVBLFdBQVcsRUFBRTtNQUNoQyxDQUFDLE1BQU07UUFDTCxLQUFLLENBQUM7UUFDTkMsS0FBSSxDQUFDRyxnQkFBZ0IsRUFBRTtRQUN2QkgsS0FBSSxDQUFDSSxrQkFBa0IsR0FBR0osS0FBSSxDQUFDcEUsaUJBQWlCLENBQUNMLE9BQU87UUFDeEQsTUFBTXlFLEtBQUksQ0FBQ0ssZUFBZSxFQUFFO1FBQzVCTCxLQUFJLENBQUNJLGtCQUFrQixHQUFHSixLQUFJLENBQUNwRSxpQkFBaUIsQ0FBQ1AsSUFBSTtRQUNyRDJFLEtBQUksQ0FBQ00sV0FBVyxHQUFHLElBQUk7UUFDdkIsSUFBSVAsV0FBVyxFQUFFQSxXQUFXLEVBQUU7UUFDOUJDLEtBQUksQ0FBQ08sZ0JBQWdCLEVBQUU7UUFDdkIsS0FBSyxDQUFDO01BQ1I7SUFBQztFQUNIO0VBQ0FDLGFBQWFBLENBQUEsRUFBRztJQUNkLE9BQU8sSUFBSSxDQUFDQyxhQUFhO0VBQzNCO0VBQ0FQLFdBQVdBLENBQUEsRUFBRztJQUNaLE9BQU8sSUFBSSxDQUFDSSxXQUFXO0VBQ3pCO0VBQ0FJLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU8sSUFBSSxDQUFDTixrQkFBa0I7RUFDaEM7RUFDQU8sYUFBYUEsQ0FBQSxFQUFHO0lBQ2QsT0FBTyxJQUFJLENBQUNDLFNBQVMsQ0FBQ3pFLGNBQWMsSUFBSSxJQUFJLENBQUN5RSxTQUFTLENBQUN4RSxpQkFBaUI7RUFDMUU7RUFDQXlFLFlBQVlBLENBQUEsRUFBRztJQUNiLE9BQU8sSUFBSSxDQUFDQyxTQUFTLEtBQUssUUFBUTtFQUNwQztFQUNBWCxnQkFBZ0JBLENBQUEsRUFBRztJQUNqQixJQUFNO01BQ0pZO0lBQ0YsQ0FBQyxHQUFHbEgsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCLElBQUlELGdCQUFnQixFQUFFO01BQ3BCQSxnQkFBZ0IsQ0FBQ3ZELEtBQUssQ0FBQ3lELE9BQU8sR0FBRyxNQUFNO0lBQ3pDO0VBQ0Y7RUFDQVYsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsSUFBTTtNQUNKUTtJQUNGLENBQUMsR0FBR2xILFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtJQUM3QixJQUFJRCxnQkFBZ0IsRUFBRTtNQUNwQkEsZ0JBQWdCLENBQUN2RCxLQUFLLENBQUN5RCxPQUFPLEdBQUcsTUFBTTtJQUN6QztFQUNGO0VBQ0FDLGFBQWFBLENBQUNDLGFBQWEsRUFBRTtJQUMzQixJQUFJLElBQUksQ0FBQ04sWUFBWSxFQUFFLEVBQUU7TUFDdkI7SUFDRjtJQUNBLElBQUksSUFBSSxDQUFDRixhQUFhLEVBQUUsSUFBSSxJQUFJLENBQUNTLGVBQWUsRUFBRTtNQUNoRCxJQUFJLElBQUksQ0FBQ1IsU0FBUyxDQUFDekUsY0FBYyxFQUFFO1FBQ2pDLElBQU1rRixXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztRQUM1Rjs7UUFFQSxJQUFNQyxTQUFTLEdBQUc7VUFDaEJDLFVBQVUsRUFBRUMsQ0FBQyxDQUFDQyxPQUFPLENBQUNELENBQUMsQ0FBQ0UsSUFBSSxDQUFDUCxhQUFhLENBQUNJLFVBQVUsRUFBRUYsV0FBVyxDQUFDLENBQUMsQ0FBQ00sTUFBTSxDQUFDLENBQUNDLEdBQUcsRUFBQUMsSUFBQSxLQUFtQjtZQUFBLElBQWpCLENBQUNDLEdBQUcsRUFBRUMsS0FBSyxDQUFDLEdBQUFGLElBQUE7WUFDNUZELEdBQUcsQ0FBQ0UsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDRSxtQkFBbUIsQ0FBQ0QsS0FBSyxDQUFDO1lBQzFDLE9BQU9ILEdBQUc7VUFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDTkssZ0JBQWdCLEVBQUUsSUFBSSxDQUFDRCxtQkFBbUIsQ0FBQ2IsYUFBYSxDQUFDYyxnQkFBZ0I7UUFDM0UsQ0FBQztRQUNEZCxhQUFhLENBQUNJLFVBQVUsR0FBQVcsYUFBQSxDQUFBQSxhQUFBLEtBQ25CZixhQUFhLENBQUNJLFVBQVUsR0FDeEJELFNBQVMsQ0FBQ0MsVUFBVSxDQUN4QjtRQUNESixhQUFhLENBQUNjLGdCQUFnQixHQUFHWCxTQUFTLENBQUNXLGdCQUFnQjtNQUM3RCxDQUFDLE1BQU07UUFDTCxJQUFNRSxXQUFXLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLENBQUM7UUFDbEw7UUFDQWhCLGFBQWEsQ0FBQ0csU0FBUyxHQUFHO1VBQ3hCQyxVQUFVLEVBQUVDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDRCxDQUFDLENBQUNZLElBQUksQ0FBQ2pCLGFBQWEsQ0FBQ0ksVUFBVSxFQUFFWSxXQUFXLENBQUMsQ0FBQyxDQUFDUixNQUFNLENBQUMsQ0FBQ0MsR0FBRyxFQUFBUyxLQUFBLEtBQW1CO1lBQUEsSUFBakIsQ0FBQ1AsR0FBRyxFQUFFQyxLQUFLLENBQUMsR0FBQU0sS0FBQTtZQUM1RlQsR0FBRyxDQUFDRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUNFLG1CQUFtQixDQUFDRCxLQUFLLENBQUM7WUFDMUMsT0FBT0gsR0FBRztVQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUNOSyxnQkFBZ0IsRUFBRSxJQUFJLENBQUNELG1CQUFtQixDQUFDYixhQUFhLENBQUNjLGdCQUFnQixDQUFDO1VBQzFFSyxpQkFBaUIsRUFBRSxJQUFJLENBQUNOLG1CQUFtQixDQUFDYixhQUFhLENBQUNtQixpQkFBaUIsQ0FBQztVQUM1RUMsY0FBYyxFQUFFLElBQUksQ0FBQ1AsbUJBQW1CLENBQUNiLGFBQWEsQ0FBQ29CLGNBQWM7UUFDdkUsQ0FBQztNQUNIO0lBQ0Y7RUFDRjtFQUNBQyxZQUFZQSxDQUFBLEVBQUc7SUFDYixPQUFPLElBQUksQ0FBQ0MsV0FBVztFQUN6QjtFQUNBQyxJQUFJQSxDQUFDQyxRQUFRLEVBQUU7SUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDQSxRQUFRLENBQUNDLFVBQVUsRUFBRSxNQUFNLElBQUlDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUNuRSxJQUFJLENBQUNDLFNBQVMsR0FBR0gsUUFBUSxDQUFDQyxVQUFVO0lBQ3BDLElBQU1HLGFBQWEsR0FBR3ZCLENBQUMsQ0FBQ3dCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNwQyxTQUFTLEVBQUUrQixRQUFRLENBQUM7SUFDM0QsSUFBSSxDQUFDTSxTQUFTLENBQUNGLGFBQWEsQ0FBQztJQUM3QixLQUFLLENBQUM7SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDdkMsYUFBYSxFQUFFLEVBQUU7TUFDekIsSUFBSSxDQUFDMEMsaUJBQWlCLEVBQUU7TUFDeEIsSUFBSSxDQUFDQyxZQUFZLEdBQUd0SixRQUFRLENBQUN1SixZQUFZLEVBQUU7TUFDM0MsS0FBSyxDQUFDO01BQ04sSUFBSSxDQUFDaEMsZUFBZSxHQUFHcEgsYUFBYSxFQUFFO01BQ3RDLElBQUksQ0FBQyxJQUFJLENBQUNvSCxlQUFlLEVBQUU7UUFDekIsTUFBTSxJQUFJeUIsS0FBSyxDQUFDLGdEQUFnRCxDQUFDO01BQ25FO01BQ0EsSUFBSSxDQUFDcEMsYUFBYSxHQUFHLElBQUk7SUFDM0I7RUFDRjtFQUNBd0MsU0FBU0EsQ0FBQ04sUUFBUSxFQUFFO0lBQ2xCLElBQUksQ0FBQy9CLFNBQVMsR0FBRytCLFFBQVE7RUFDM0I7RUFDQVUsU0FBU0EsQ0FBQSxFQUFHO0lBQ1YsT0FBTyxJQUFJLENBQUN6QyxTQUFTO0VBQ3ZCO0VBQ0EwQyxVQUFVQSxDQUFDQyxJQUFJLEVBQUU7SUFDZixPQUFPLElBQUksQ0FBQ0MsdUJBQXVCLENBQUNDLEdBQUcsQ0FBQ0YsSUFBSSxDQUFDO0VBQy9DO0VBQ0FHLGdCQUFnQkEsQ0FBQ0MsTUFBTSxFQUFFO0lBQ3ZCLE9BQU8sSUFBSSxDQUFDQyx1QkFBdUIsQ0FBQ0gsR0FBRyxDQUFDRSxNQUFNLENBQUM7RUFDakQ7RUFDQUUsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDakIsT0FBTyxJQUFJLENBQUNDLGVBQWU7RUFDN0I7RUFDQUMsbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsT0FBTyxJQUFJLENBQUNDLGtCQUFrQjtFQUNoQztFQUNNQyx1QkFBdUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE1BQUE7SUFBQSxPQUFBakUsaUJBQUE7TUFDOUIsSUFBSWlFLE1BQUksQ0FBQ3RELFNBQVMsQ0FBQ25DLDJCQUEyQixFQUFFO1FBQzlDO1FBQ0EsT0FBT3lGLE1BQUksQ0FBQ0Msc0JBQXNCO01BQ3BDLENBQUMsTUFBTTtRQUNMO1FBQ0EsSUFBSUQsTUFBSSxDQUFDdEQsU0FBUyxDQUFDcEMseUJBQXlCLEVBQUU7VUFDNUM7VUFDQTtVQUNBLElBQU0sQ0FBQzRGLGVBQWUsRUFBRUMsYUFBYSxDQUFDLFNBQVNwSyxPQUFPLEVBQUU7VUFDeERpSyxNQUFJLENBQUNJLE9BQU8sQ0FBQ0QsYUFBYSxDQUFDO1VBQzNCLE9BQU9ELGVBQWUsR0FBR0YsTUFBSSxDQUFDdEQsU0FBUyxDQUFDbEMsdUJBQXVCO1FBQ2pFLENBQUMsTUFBTTtVQUNMO1VBQ0EsT0FBTyxLQUFLO1FBQ2Q7TUFDRjtJQUFDO0VBQ0g7RUFDTTZGLFFBQVFBLENBQUNoQixJQUFJLEVBQUVpQixTQUFTLEVBQUVDLFNBQVMsRUFBNkI7SUFBQSxJQUFBQyxVQUFBLEdBQUFDLFNBQUE7TUFBQUMsTUFBQTtJQUFBLE9BQUEzRSxpQkFBQTtNQUFBLElBQTNCNEUsa0JBQWtCLEdBQUFILFVBQUEsQ0FBQUksTUFBQSxRQUFBSixVQUFBLFFBQUFLLFNBQUEsR0FBQUwsVUFBQSxNQUFHLElBQUk7TUFDbEUsSUFBSSxDQUFDLENBQUMsQ0FBQ25CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQ2lCLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsU0FBUyxFQUFFO1FBQzNDLEtBQUssQ0FBQztRQUNOO01BQ0Y7TUFDQUcsTUFBSSxDQUFDVCxzQkFBc0IsU0FBU1MsTUFBSSxDQUFDWCx1QkFBdUIsRUFBRTtNQUNsRVcsTUFBSSxDQUFDOUQsU0FBUyxHQUFHeUMsSUFBSTtNQUNyQnFCLE1BQUksQ0FBQ0ksU0FBUyxHQUFHSixNQUFJLENBQUM5RCxTQUFTLENBQUNtRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3BETCxNQUFJLENBQUNNLFdBQVcsR0FBR1YsU0FBUztNQUM1QkksTUFBSSxDQUFDTyxXQUFXLEdBQUdWLFNBQVM7TUFDNUJHLE1BQUksQ0FBQ1Esb0JBQW9CLEdBQUdQLGtCQUFrQjtNQUM5QyxJQUFJQSxrQkFBa0IsRUFBRTtRQUN0QixJQUFJRCxNQUFJLENBQUNoRSxTQUFTLENBQUNoRSxRQUFRLEVBQUU7VUFDM0JnSSxNQUFJLENBQUNTLE9BQU8sR0FBR3hMLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDc0UsS0FBSztRQUNoRDtRQUNBLElBQUlWLE1BQUksQ0FBQ2hFLFNBQVMsQ0FBQzlELFdBQVcsRUFBRTtVQUM5QjhILE1BQUksQ0FBQ1csVUFBVSxHQUFHMUwsUUFBUSxDQUFDbUgsY0FBYyxFQUFFLENBQUN3RSxRQUFRO1FBQ3REO1FBQ0EsSUFBSVosTUFBSSxDQUFDaEUsU0FBUyxDQUFDNUQsV0FBVyxFQUFFO1VBQzlCNEgsTUFBSSxDQUFDYSxVQUFVLEdBQUc1TCxRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBFLFFBQVE7UUFDdEQ7TUFDRjtNQUNBLE1BQU1kLE1BQUksQ0FBQ2UsYUFBYSxDQUFDZixNQUFJLENBQUM3SSxXQUFXLENBQUNyQixTQUFTLENBQUM7TUFDcEQsSUFBSSxDQUFDa0ssTUFBSSxDQUFDcEUsYUFBYSxFQUFFLEVBQUU7UUFDekIsTUFBTSxJQUFJcUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO01BQ3JDO01BQ0EsSUFBSTtRQUNGK0IsTUFBSSxDQUFDZ0IsWUFBWSxFQUFFO1FBQ25CLE1BQU1oQixNQUFJLENBQUNpQixrQkFBa0IsRUFBRTtRQUMvQixJQUFJakIsTUFBSSxDQUFDVCxzQkFBc0IsRUFBRTtVQUMvQjtVQUNBLElBQUlTLE1BQUksQ0FBQ2pFLGFBQWEsRUFBRSxJQUFJaUUsTUFBSSxDQUFDeEQsZUFBZSxFQUFFO1lBQ2hELE1BQU13RCxNQUFJLENBQUNrQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7VUFDakM7O1VBRUEsTUFBTWxCLE1BQUksQ0FBQ21CLGlCQUFpQixFQUFFO1FBQ2hDLENBQUMsTUFBTTtVQUNMO1VBQ0EsTUFBTW5CLE1BQUksQ0FBQ2tCLGdCQUFnQixFQUFFO1VBQzdCLE1BQU1sQixNQUFJLENBQUNvQixlQUFlLEVBQUU7UUFDOUI7TUFDRixDQUFDLENBQUMsT0FBT0MsQ0FBQyxFQUFFO1FBQ1YsS0FBSyxDQUFDO01BQ1IsQ0FBQyxTQUFTO1FBQ1JyQixNQUFJLENBQUNzQixPQUFPLEVBQUU7TUFDaEI7SUFBQztFQUNIO0VBQ0FBLE9BQU9BLENBQUEsRUFBRztJQUNSLElBQUksQ0FBQ0MsT0FBTyxFQUFFO0lBQ2QsSUFBSSxDQUFDQyxhQUFhLEVBQUU7SUFDcEIsSUFBSSxDQUFDbEIsV0FBVyxHQUFHLElBQUk7SUFDdkIsSUFBSSxDQUFDQyxXQUFXLEdBQUcsSUFBSTtFQUN6QjtFQUNBa0IsaUJBQWlCQSxDQUFDQyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDN0QsV0FBVyxDQUFDNEQsaUJBQWlCLENBQUNDLEdBQUcsQ0FBQztFQUN6QztFQUNBQyxPQUFPQSxDQUFDQyxRQUFRLEVBQUU7SUFDaEIsT0FBTyxJQUFJLENBQUN4RSxtQkFBbUIsQ0FBQ3dFLFFBQVEsQ0FBQztFQUMzQztFQUNNQyxVQUFVQSxDQUFDQyxPQUFPLEVBQUVsQyxTQUFTLEVBQUVDLFNBQVMsRUFBRUksa0JBQWtCLEVBQXdCO0lBQUEsSUFBQThCLFdBQUEsR0FBQWhDLFNBQUE7TUFBQWlDLE1BQUE7SUFBQSxPQUFBM0csaUJBQUE7TUFBQSxJQUF0QjRHLFlBQVksR0FBQUYsV0FBQSxDQUFBN0IsTUFBQSxRQUFBNkIsV0FBQSxRQUFBNUIsU0FBQSxHQUFBNEIsV0FBQSxNQUFHLEtBQUs7TUFDdEYsSUFBSUUsWUFBWSxFQUFFO1FBQ2hCLE1BQU1ELE1BQUksQ0FBQ1YsT0FBTyxFQUFFO01BQ3RCLENBQUMsTUFBTTtRQUNMVSxNQUFJLENBQUNSLGFBQWEsRUFBRTtNQUN0QjtNQUNBLE1BQU1RLE1BQUksQ0FBQ3JDLFFBQVEsQ0FBQ21DLE9BQU8sRUFBRWxDLFNBQVMsRUFBRUMsU0FBUyxFQUFFSSxrQkFBa0IsQ0FBQztJQUFDO0VBQ3pFOztFQUVBO0VBQ01pQyxlQUFlQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxNQUFBO0lBQUEsT0FBQTlHLGlCQUFBO01BQ3RCLElBQUkrRyxpQkFBaUIsR0FBRyxDQUFDO01BQ3pCLE9BQU8sSUFBSUMsT0FBTyxDQUFDQyxPQUFPLElBQUk7UUFDNUIsSUFBTUMsS0FBSyxHQUFHQSxDQUFBLEtBQU07VUFDbEJDLFVBQVUsZUFBQW5ILGlCQUFBLENBQUMsYUFBWTtZQUNyQixJQUFJOEcsTUFBSSxDQUFDN0csV0FBVyxFQUFFLEVBQUU7Y0FDdEJnSCxPQUFPLEVBQUU7WUFDWCxDQUFDLE1BQU07Y0FDTEYsaUJBQWlCLEVBQUU7Y0FDbkIsS0FBSyxDQUFDO2NBQ05HLEtBQUssRUFBRTtZQUNUO1VBQ0YsQ0FBQyxHQUFFLEdBQUcsQ0FBQztRQUNULENBQUM7UUFDREEsS0FBSyxFQUFFO01BQ1QsQ0FBQyxDQUFDO0lBQUM7RUFDTDtFQUNBdkIsWUFBWUEsQ0FBQSxFQUFHO0lBQ2IsSUFBTXlCLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUJBLENBQWFDLE1BQU0sRUFBRTtNQUM1QyxPQUFPQyxLQUFLLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUdFLFFBQVEsQ0FBQ0YsTUFBTSxDQUFDO0lBQ3ZELENBQUM7SUFDRCxJQUFJLENBQUMxRyxTQUFTLENBQUNoQixnQkFBZ0IsR0FBR3lILG1CQUFtQixDQUFDLElBQUksQ0FBQ3pHLFNBQVMsQ0FBQ2hCLGdCQUFnQixDQUFDO0lBQ3RGLElBQUksQ0FBQ2dCLFNBQVMsQ0FBQ2pFLHlCQUF5QixHQUFHMEssbUJBQW1CLENBQUMsSUFBSSxDQUFDekcsU0FBUyxDQUFDakUseUJBQXlCLENBQUM7SUFDeEcsSUFBSSxDQUFDaUUsU0FBUyxDQUFDbEUsd0JBQXdCLEdBQUcySyxtQkFBbUIsQ0FBQyxJQUFJLENBQUN6RyxTQUFTLENBQUNsRSx3QkFBd0IsQ0FBQztFQUN4RztFQUNBd0csaUJBQWlCQSxDQUFBLEVBQUc7SUFDbEIsSUFBTXVFLE1BQU0sR0FBRyxJQUFJO0lBQ25CLElBQUksa0JBQWtCLENBQUNDLElBQUksQ0FBQzNJLE1BQU0sQ0FBQzRJLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO01BQ3JFLElBQU1DLHNCQUFzQixHQUFHQyxFQUFFLElBQUk7UUFDbkMsSUFBSUEsRUFBRSxDQUFDQyxPQUFPLENBQUNsRCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQ3pCaUQsRUFBRSxDQUFDRSxjQUFjLEVBQUU7VUFDbkJGLEVBQUUsQ0FBQ0csd0JBQXdCLEVBQUU7UUFDL0I7TUFDRixDQUFDO01BQ0RuSixNQUFNLENBQUNvSixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUVMLHNCQUFzQixFQUFFO1FBQzVETSxPQUFPLEVBQUU7TUFDWCxDQUFDLENBQUM7TUFDRnJKLE1BQU0sQ0FBQ29KLGdCQUFnQixDQUFDLFdBQVcsRUFBRUwsc0JBQXNCLEVBQUU7UUFDM0RNLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztNQUNGckosTUFBTSxDQUFDb0osZ0JBQWdCLENBQUMsVUFBVSxFQUFFTCxzQkFBc0IsRUFBRTtRQUMxRE0sT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO0lBQ0o7SUFDQXJKLE1BQU0sQ0FBQ3NKLGNBQWMsR0FBRyxZQUFZO01BQ2xDWixNQUFNLENBQUNhLFNBQVMsR0FBRyxJQUFJO01BQ3ZCYixNQUFNLENBQUN0QixPQUFPLEVBQUU7SUFDbEIsQ0FBQztJQUNELElBQU1vQyxZQUFZO01BQUEsSUFBQUMsS0FBQSxHQUFBdkksaUJBQUEsQ0FBRyxhQUFZO1FBQy9CLElBQUksQ0FBQyxDQUFDLENBQUN3SCxNQUFNLENBQUMzRyxTQUFTLEVBQUU7UUFDekIsSUFBSSxDQUFDMkcsTUFBTSxDQUFDZ0IsMEJBQTBCLEVBQUU7VUFDdENoQixNQUFNLENBQUNnQiwwQkFBMEIsR0FBRyxJQUFJO1VBQ3hDaEIsTUFBTSxDQUFDaUIsdUJBQXVCLEdBQUcsSUFBSTtVQUNyQyxLQUFLLENBQUM7VUFDTmpCLE1BQU0sQ0FBQ2dCLDBCQUEwQixHQUFHLEtBQUs7VUFDekMsTUFBTWhCLE1BQU0sQ0FBQ2hCLFVBQVUsQ0FBQ2dCLE1BQU0sQ0FBQzNHLFNBQVMsRUFBRTJHLE1BQU0sQ0FBQ3ZDLFdBQVcsRUFBRXVDLE1BQU0sQ0FBQ3RDLFdBQVcsRUFBRXNDLE1BQU0sQ0FBQ3JDLG9CQUFvQixDQUFDO1FBQ2hILENBQUMsTUFBTTtVQUNMLEtBQUssQ0FBQztRQUNSO01BQ0YsQ0FBQztNQUFBLGdCQVhLbUQsWUFBWUEsQ0FBQTtRQUFBLE9BQUFDLEtBQUEsQ0FBQUcsS0FBQSxPQUFBaEUsU0FBQTtNQUFBO0lBQUEsR0FXakI7SUFDRDVGLE1BQU0sQ0FBQ29KLGdCQUFnQixDQUFDLFFBQVEsZUFBQWxJLGlCQUFBLENBQUUsYUFBWTtNQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDd0gsTUFBTSxDQUFDaUIsdUJBQXVCLEVBQUU7UUFDckNqQixNQUFNLENBQUNpQix1QkFBdUIsR0FBR3RCLFVBQVUsQ0FBQ21CLFlBQVksRUFBRWQsTUFBTSxDQUFDbUIsdUJBQXVCLENBQUM7TUFDM0Y7SUFDRixDQUFDLEVBQUM7RUFDSjtFQUNBdEUsT0FBT0EsQ0FBQ3VFLEdBQUcsRUFBRTtJQUNYLElBQUksSUFBSSxDQUFDakksU0FBUyxDQUFDZixhQUFhLEVBQUU7TUFDaEMsS0FBSyxDQUFDO0lBQ1IsQ0FBQyxNQUFNO01BQ0wsS0FBSyxDQUFDO0lBQ1I7RUFDRjtFQUNBaUosT0FBT0EsQ0FBQ0MsRUFBRSxFQUFFO0lBQ1YsT0FBTyxJQUFJOUIsT0FBTyxDQUFDQyxPQUFPLElBQUlFLFVBQVUsQ0FBQ0YsT0FBTyxFQUFFNkIsRUFBRSxDQUFDLENBQUM7RUFDeEQ7RUFDQUMsY0FBY0EsQ0FBQ0MsSUFBSSxFQUFFO0lBQ25CLE9BQU8sSUFBSWhDLE9BQU8sQ0FBQyxDQUFDQyxPQUFPLEVBQUUxRixDQUFDLEtBQUs7TUFDakMsSUFBTTBILE1BQU0sR0FBRyxJQUFJQyxVQUFVLEVBQUU7TUFDL0JELE1BQU0sQ0FBQ0UsU0FBUyxHQUFHLE1BQU1sQyxPQUFPLENBQUNnQyxNQUFNLENBQUNHLE1BQU0sQ0FBQztNQUMvQ0gsTUFBTSxDQUFDSSxhQUFhLENBQUNMLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUM7RUFDSjtFQUNBTSxjQUFjQSxDQUFDQyxNQUFNLEVBQUU7SUFDckI7SUFDQTtJQUNBLElBQU1DLFVBQVUsR0FBR0MsSUFBSSxDQUFDRixNQUFNLENBQUNHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFN0M7SUFDQSxJQUFNQyxVQUFVLEdBQUdKLE1BQU0sQ0FBQ0csS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRW5FO0lBQ0EsSUFBTUUsRUFBRSxHQUFHLElBQUlDLFdBQVcsQ0FBQ0wsVUFBVSxDQUFDM0UsTUFBTSxDQUFDO0lBQzdDLElBQU1pRixFQUFFLEdBQUcsSUFBSUMsVUFBVSxDQUFDSCxFQUFFLENBQUM7SUFDN0IsS0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdSLFVBQVUsQ0FBQzNFLE1BQU0sRUFBRW1GLENBQUMsRUFBRSxFQUFFO01BQzFDRixFQUFFLENBQUNFLENBQUMsQ0FBQyxHQUFHUixVQUFVLENBQUNTLFVBQVUsQ0FBQ0QsQ0FBQyxDQUFDO0lBQ2xDO0lBQ0EsT0FBTyxJQUFJRSxJQUFJLENBQUMsQ0FBQ04sRUFBRSxDQUFDLEVBQUU7TUFDcEJ0RyxJQUFJLEVBQUVxRztJQUNSLENBQUMsQ0FBQztFQUNKO0VBQ01RLHFCQUFxQkEsQ0FBQ1osTUFBTSxFQUFFYSxPQUFPLEVBQUVDLGNBQWMsRUFBRTtJQUFBLElBQUFDLE1BQUE7SUFBQSxPQUFBdEssaUJBQUE7TUFDM0QsSUFBSXVKLE1BQU0sS0FBSyxJQUFJLEVBQUUsT0FBTyxJQUFJO01BQ2hDLElBQU1nQixRQUFRLEdBQUdELE1BQUksQ0FBQ2hCLGNBQWMsQ0FBQ0MsTUFBTSxDQUFDO01BQzVDLElBQU1pQixVQUFVLFNBQVNyUSxTQUFTLENBQUNzUSxhQUFhLENBQUNGLFFBQVEsRUFBRUgsT0FBTyxFQUFFQyxjQUFjLENBQUM7TUFDbkYsSUFBTUssZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHSixVQUFVLENBQUNLLElBQUksR0FBR04sUUFBUSxDQUFDTSxJQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRztNQUN4RixLQUFLLENBQUM7TUFDTixhQUFhUCxNQUFJLENBQUN2QixjQUFjLENBQUN5QixVQUFVLENBQUM7SUFBQztFQUMvQzs7RUFFQTtFQUNBTSxxQkFBcUJBLENBQUEsRUFBRztJQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQ2pJLFNBQVMsRUFBRTtNQUNyQixNQUFNLElBQUlELEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUN6QztJQUNBLElBQU1tSSxXQUFXLEdBQUcsSUFBSSxDQUFDdkksV0FBVyxDQUFDd0ksZUFBZSxDQUFDLElBQUksQ0FBQ25JLFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDeEUsSUFBSSxDQUFDb0ksa0JBQWtCLEdBQUcsSUFBSSxDQUFDekksV0FBVyxDQUFDMEksT0FBTyxDQUFDSCxXQUFXLENBQUM7SUFDL0QsSUFBSSxDQUFDdkksV0FBVyxDQUFDMkksWUFBWSxDQUFDLElBQUksQ0FBQ3RJLFNBQVMsRUFBRSxJQUFJLENBQUNvSSxrQkFBa0IsRUFBRUYsV0FBVyxDQUFDO0lBQ25GLE9BQU8sSUFBSSxDQUFDRSxrQkFBa0I7RUFDaEM7RUFDQWxKLG1CQUFtQkEsQ0FBQ3FKLFNBQVMsRUFBRTtJQUM3QixJQUFJQyxnQkFBZ0IsR0FBRyxJQUFJO0lBQzNCLElBQUk7TUFDRixJQUFJLE9BQU9ELFNBQVMsS0FBSyxRQUFRLEVBQUVBLFNBQVMsR0FBR0EsU0FBUyxDQUFDRSxRQUFRLEVBQUU7TUFDbkUsSUFBSUYsU0FBUyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUU7TUFDL0IsSUFBSSxPQUFPQSxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDQSxTQUFTLEVBQUU7UUFDakQsTUFBTSxJQUFJeEksS0FBSyxDQUFDLG9CQUFvQixDQUFDO01BQ3ZDO01BQ0EsSUFBTTJJLFVBQVUsR0FBR0gsU0FBUztNQUM1QixJQUFNTCxXQUFXLEdBQUcsSUFBSSxDQUFDdkksV0FBVyxDQUFDd0ksZUFBZSxDQUFDTyxVQUFVLENBQUMsR0FBRyxDQUFDO01BQ3BFRixnQkFBZ0IsR0FBRyxJQUFJLENBQUM3SSxXQUFXLENBQUMwSSxPQUFPLENBQUNILFdBQVcsQ0FBQztNQUN4RCxJQUFJLENBQUN2SSxXQUFXLENBQUMySSxZQUFZLENBQUNJLFVBQVUsRUFBRUYsZ0JBQWdCLEVBQUVOLFdBQVcsQ0FBQztNQUN4RSxPQUFPLElBQUksQ0FBQ3ZJLFdBQVcsQ0FBQ3ZCLGFBQWEsQ0FBQ29LLGdCQUFnQixDQUFDO0lBQ3pELENBQUMsU0FBUztNQUNSLElBQUlBLGdCQUFnQixFQUFFO1FBQ3BCLElBQUksQ0FBQzdJLFdBQVcsQ0FBQ2dKLEtBQUssQ0FBQ0gsZ0JBQWdCLENBQUM7UUFDeENBLGdCQUFnQixHQUFHLElBQUk7TUFDekI7SUFDRjtFQUNGO0VBQ01JLG9CQUFvQkEsQ0FBQ0MsWUFBWSxFQUFFO0lBQUEsSUFBQUMsTUFBQTtJQUFBLE9BQUEzTCxpQkFBQTtNQUN2QyxJQUFJNEwscUJBQXFCLEdBQUcsS0FBSztNQUNqQyxJQUFJQyxjQUFjLEdBQUcsV0FBVztNQUNoQyxJQUFJLENBQUNGLE1BQUksQ0FBQ0csZ0JBQWdCLEVBQUU7UUFDMUIsT0FBTztVQUNMRixxQkFBcUI7VUFDckJDO1FBQ0YsQ0FBQztNQUNIO01BQ0EsSUFBSUgsWUFBWSxDQUFDSyxVQUFVLEtBQUssQ0FBQyxJQUFJTCxZQUFZLENBQUNNLFdBQVcsS0FBSyxDQUFDLEVBQUU7UUFDbkUsTUFBTUwsTUFBSSxDQUFDakcsYUFBYSxDQUFDaUcsTUFBSSxDQUFDN1AsV0FBVyxDQUFDckIsU0FBUyxDQUFDO1FBQ3BELE9BQU87VUFDTG1SLHFCQUFxQjtVQUNyQkM7UUFDRixDQUFDO01BQ0g7TUFDQUEsY0FBYyxHQUFHSCxZQUFZLENBQUNLLFVBQVUsR0FBRyxHQUFHLEdBQUdMLFlBQVksQ0FBQ00sV0FBVztNQUN6RSxJQUFJTixZQUFZLENBQUNLLFVBQVUsS0FBSyxJQUFJLElBQUlMLFlBQVksQ0FBQ00sV0FBVyxLQUFLLElBQUksSUFBSU4sWUFBWSxDQUFDSyxVQUFVLEtBQUssSUFBSSxJQUFJTCxZQUFZLENBQUNNLFdBQVcsS0FBSyxJQUFJLEVBQUU7UUFDbEpKLHFCQUFxQixHQUFHLElBQUk7TUFDOUIsQ0FBQyxNQUFNLElBQUlGLFlBQVksQ0FBQ0ssVUFBVSxLQUFLLElBQUksSUFBSUwsWUFBWSxDQUFDTSxXQUFXLEtBQUssR0FBRyxJQUFJTixZQUFZLENBQUNLLFVBQVUsS0FBSyxHQUFHLElBQUlMLFlBQVksQ0FBQ00sV0FBVyxLQUFLLElBQUksRUFBRTtRQUN2SkoscUJBQXFCLEdBQUcsSUFBSTtNQUM5QixDQUFDLE1BQU07UUFDTEYsWUFBWSxDQUFDTyxTQUFTLEdBQUcsSUFBSTtRQUM3QkwscUJBQXFCLEdBQUcsS0FBSztNQUMvQjtNQUNBRCxNQUFJLENBQUNPLFlBQVksR0FBR1IsWUFBWSxDQUFDSyxVQUFVO01BQzNDSixNQUFJLENBQUNRLGFBQWEsR0FBR1QsWUFBWSxDQUFDTSxXQUFXO01BQzdDLE9BQU87UUFDTEoscUJBQXFCO1FBQ3JCQztNQUNGLENBQUM7SUFBQztFQUNKO0VBQ0FPLG1CQUFtQkEsQ0FBQzNGLE9BQU8sRUFBRTtJQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDNEYsYUFBYSxDQUFDQyxRQUFRLENBQUM3RixPQUFPLENBQUMsRUFBRSxNQUFNLElBQUk3RCxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDbEYsSUFBSTtNQUNGLElBQUkySixPQUFPLEdBQUcsQ0FBQztNQUNmLElBQUlDLGVBQWUsR0FBRyxJQUFJO01BQzFCLElBQU1uQixnQkFBZ0IsR0FBRyxJQUFJLENBQUNQLHFCQUFxQixFQUFFO01BQ3JELFFBQVFyRSxPQUFPO1FBQ2I7UUFDQSxLQUFLLFFBQVE7UUFDYixLQUFLLFFBQVE7UUFDYixLQUFLLFlBQVk7UUFDakIsS0FBSyxZQUFZO1VBQ2Y4RixPQUFPLEdBQUcsSUFBSSxDQUFDL0osV0FBVyxDQUFDaUssZ0JBQWdCLENBQUNwQixnQkFBZ0IsQ0FBQztVQUM3RG1CLGVBQWUsR0FBR0EsQ0FBQSxLQUFNLElBQUksQ0FBQ2hLLFdBQVcsQ0FBQ2tLLG9CQUFvQixDQUFDSCxPQUFPLENBQUM7VUFDdEU7UUFDRixLQUFLLFVBQVU7UUFDZixLQUFLLGtCQUFrQjtRQUN2QixLQUFLLGNBQWM7UUFDbkIsS0FBSyxzQkFBc0I7VUFDekJBLE9BQU8sR0FBRyxJQUFJLENBQUMvSixXQUFXLENBQUNtSyxrQkFBa0IsQ0FBQ3RCLGdCQUFnQixDQUFDO1VBQy9EbUIsZUFBZSxHQUFHQSxDQUFBLEtBQU0sSUFBSSxDQUFDaEssV0FBVyxDQUFDb0ssc0JBQXNCLENBQUNMLE9BQU8sQ0FBQztVQUN4RTtRQUNGLEtBQUssT0FBTztRQUNaLEtBQUssWUFBWTtRQUNqQixLQUFLLFdBQVc7VUFDZEEsT0FBTyxHQUFHLElBQUksQ0FBQy9KLFdBQVcsQ0FBQ3FLLGVBQWUsQ0FBQ3hCLGdCQUFnQixDQUFDO1VBQzVEbUIsZUFBZSxHQUFHQSxDQUFBLEtBQU0sSUFBSSxDQUFDaEssV0FBVyxDQUFDc0ssbUJBQW1CLENBQUNQLE9BQU8sQ0FBQztVQUNyRTtRQUNGLEtBQUssUUFBUTtVQUNYQSxPQUFPLEdBQUcsSUFBSSxDQUFDL0osV0FBVyxDQUFDdUssZ0JBQWdCLENBQUMxQixnQkFBZ0IsQ0FBQztVQUM3RG1CLGVBQWUsR0FBR0EsQ0FBQSxLQUFNLElBQUksQ0FBQ2hLLFdBQVcsQ0FBQ3dLLG9CQUFvQixDQUFDVCxPQUFPLENBQUM7VUFDdEU7UUFDRjtVQUNFLE1BQU0sSUFBSTNKLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQztNQUFDO01BRS9DLElBQUksQ0FBQ0osV0FBVyxDQUFDZ0osS0FBSyxDQUFDSCxnQkFBZ0IsQ0FBQztNQUN4QyxJQUFJa0IsT0FBTyxLQUFLLENBQUMsRUFBRTtRQUNqQixJQUFJLElBQUksQ0FBQ1UseUJBQXlCLEtBQUssSUFBSSxDQUFDQyxzQkFBc0IsRUFBRTtVQUNsRSxNQUFNLElBQUl0SyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDdEM7UUFDQSxJQUFJLENBQUNzSyxzQkFBc0IsRUFBRTtNQUMvQjtNQUNBLE9BQU8sQ0FBQ1gsT0FBTyxFQUFFQyxlQUFlLENBQUM7SUFDbkMsQ0FBQyxDQUFDLE9BQU94RyxDQUFDLEVBQUU7TUFDVjtNQUNBLEtBQUssQ0FBQztNQUNOLEtBQUssQ0FBQztNQUNOLE1BQU1BLENBQUM7SUFDVDtFQUNGO0VBQ0FtSCxXQUFXQSxDQUFBLEVBQUc7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDQyxRQUFRLEVBQUU7TUFDbEIsSUFBSSxDQUFDQSxRQUFRLEdBQUcsSUFBSSxDQUFDNUssV0FBVyxDQUFDMEksT0FBTyxDQUFDLElBQUksQ0FBQ21DLGlCQUFpQixHQUFHLElBQUksQ0FBQ0Msa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQ2hHO0lBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQ0MsY0FBYyxFQUFFO01BQ3hCLElBQUksQ0FBQ0EsY0FBYyxHQUFHLElBQUksQ0FBQy9LLFdBQVcsQ0FBQzBJLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDdEQ7SUFDQSxJQUFJLElBQUksQ0FBQ3ZLLFNBQVMsQ0FBQ3RFLFdBQVcsRUFBRTtNQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDbVIsbUJBQW1CLEVBQUU7UUFDN0IsSUFBSSxDQUFDQSxtQkFBbUIsR0FBRyxJQUFJLENBQUNoTCxXQUFXLENBQUMwSSxPQUFPLENBQUMsSUFBSSxDQUFDO01BQzNEO0lBQ0Y7SUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDa0MsUUFBUSxFQUFFLElBQUksQ0FBQ0csY0FBYyxFQUFFLElBQUksQ0FBQ0MsbUJBQW1CLENBQUM7RUFDdkU7RUFDTUMsZ0JBQWdCQSxDQUFDbEIsT0FBTyxFQUFFbUIsUUFBUSxFQUFFQyxPQUFPLEVBQW9CO0lBQUEsSUFBQUMsV0FBQSxHQUFBbEosU0FBQTtNQUFBbUosTUFBQTtJQUFBLE9BQUE3TixpQkFBQTtNQUFBLElBQWxCOE4sT0FBTyxHQUFBRixXQUFBLENBQUEvSSxNQUFBLFFBQUErSSxXQUFBLFFBQUE5SSxTQUFBLEdBQUE4SSxXQUFBLE1BQUcsTUFBTTtNQUNqRSxJQUFJO1FBQ0YsSUFBSUUsT0FBTyxLQUFLLE1BQU0sRUFBRTtVQUN0QkQsTUFBSSxDQUFDckwsV0FBVyxDQUFDdUwsMkJBQTJCLENBQUN4QixPQUFPLEVBQUVtQixRQUFRLEVBQUVDLE9BQU8sQ0FBQztRQUMxRSxDQUFDLE1BQU0sSUFBSUcsT0FBTyxLQUFLLE1BQU0sRUFBRTtVQUM3QkQsTUFBSSxDQUFDckwsV0FBVyxDQUFDd0wsMkJBQTJCLENBQUN6QixPQUFPLENBQUM7UUFDdkQ7UUFDQSxJQUFNMEIsT0FBTyxHQUFHSixNQUFJLENBQUNyTCxXQUFXLENBQUMwTCxpQkFBaUIsRUFBRTtRQUNwRCxJQUFNQyxVQUFVLEdBQUdOLE1BQUksQ0FBQ3JMLFdBQVcsQ0FBQzRMLG1CQUFtQixFQUFFO1FBQ3pELElBQU1DLFVBQVUsR0FBRyxJQUFJdEUsVUFBVSxDQUFDOEQsTUFBSSxDQUFDckwsV0FBVyxDQUFDOEwsS0FBSyxDQUFDQyxNQUFNLEVBQUVKLFVBQVUsRUFBRUYsT0FBTyxDQUFDO1FBQ3JGLElBQU03RSxNQUFNLEdBQUcsSUFBSVcsVUFBVSxDQUFDc0UsVUFBVSxDQUFDO1FBQ3pDLElBQU1yRixJQUFJLEdBQUcsSUFBSWtCLElBQUksQ0FBQyxDQUFDZCxNQUFNLENBQUMsRUFBRTtVQUM5QjlGLElBQUksRUFBRTtRQUNSLENBQUMsQ0FBQztRQUNGLGFBQWF1SyxNQUFJLENBQUM5RSxjQUFjLENBQUNDLElBQUksQ0FBQztNQUN4QyxDQUFDLENBQUMsT0FBT2hELENBQUMsRUFBRTtRQUNWLEtBQUssQ0FBQztRQUNOLE1BQU1BLENBQUM7TUFDVCxDQUFDLFNBQVM7UUFDUjZILE1BQUksQ0FBQ3JMLFdBQVcsQ0FBQ2dNLGlCQUFpQixFQUFFO01BQ3RDO0lBQUM7RUFDSDs7RUFFQTtFQUNBQyxlQUFlQSxDQUFBLEVBQUc7SUFDaEIsSUFBSSxJQUFJLENBQUNyQixRQUFRLEVBQUU7TUFDakIsSUFBSSxDQUFDNUssV0FBVyxDQUFDZ0osS0FBSyxDQUFDLElBQUksQ0FBQzRCLFFBQVEsQ0FBQztNQUNyQyxJQUFJLENBQUNBLFFBQVEsR0FBRyxJQUFJO0lBQ3RCO0lBQ0EsSUFBSSxDQUFDc0IscUJBQXFCLEVBQUU7SUFDNUIsSUFBSSxDQUFDQyw2QkFBNkIsRUFBRTtFQUN0QztFQUNBRCxxQkFBcUJBLENBQUEsRUFBRztJQUN0QixJQUFJLElBQUksQ0FBQ25CLGNBQWMsS0FBSyxJQUFJLEVBQUU7TUFDaEMsSUFBSSxDQUFDL0ssV0FBVyxDQUFDZ0osS0FBSyxDQUFDLElBQUksQ0FBQytCLGNBQWMsQ0FBQztNQUMzQyxJQUFJLENBQUNBLGNBQWMsR0FBRyxJQUFJO0lBQzVCO0VBQ0Y7RUFDQW9CLDZCQUE2QkEsQ0FBQSxFQUFHO0lBQzlCLElBQUksSUFBSSxDQUFDbkIsbUJBQW1CLEtBQUssSUFBSSxFQUFFO01BQ3JDLElBQUksQ0FBQ2hMLFdBQVcsQ0FBQ2dKLEtBQUssQ0FBQyxJQUFJLENBQUNnQyxtQkFBbUIsQ0FBQztNQUNoRCxJQUFJLENBQUNBLG1CQUFtQixHQUFHLElBQUk7SUFDakM7RUFDRjs7RUFFQTtFQUNBb0Isa0JBQWtCQSxDQUFBLEVBQUc7SUFDbkIsSUFBSSxJQUFJLENBQUNDLFdBQVcsS0FBSyxJQUFJLEVBQUU7TUFDN0IsSUFBSSxDQUFDck0sV0FBVyxDQUFDZ0osS0FBSyxDQUFDLElBQUksQ0FBQ3FELFdBQVcsQ0FBQztNQUN4QyxJQUFJLENBQUNBLFdBQVcsR0FBRyxJQUFJO0lBQ3pCO0VBQ0Y7O0VBRUE7RUFDQUMseUJBQXlCQSxDQUFBLEVBQUc7SUFDMUIsSUFBSSxJQUFJLENBQUM3RCxrQkFBa0IsRUFBRTtNQUMzQixJQUFJLENBQUN6SSxXQUFXLENBQUNnSixLQUFLLENBQUMsSUFBSSxDQUFDUCxrQkFBa0IsQ0FBQztNQUMvQyxJQUFJLENBQUNBLGtCQUFrQixHQUFHLElBQUk7SUFDaEM7RUFDRjs7RUFFQTtFQUNBOEQsdUJBQXVCQSxDQUFBLEVBQUc7SUFDeEIsSUFBSSxJQUFJLENBQUNDLHdCQUF3QixFQUFFO01BQ2pDLElBQUksQ0FBQ0Esd0JBQXdCLEVBQUU7TUFDL0IsSUFBSSxDQUFDQSx3QkFBd0IsR0FBRyxJQUFJO0lBQ3RDO0VBQ0Y7RUFDTUMsNkJBQTZCQSxDQUFDdkQsWUFBWSxFQUFFO0lBQUEsSUFBQXdELE1BQUE7SUFBQSxPQUFBbFAsaUJBQUE7TUFDaEQsSUFBTTtRQUNKNEwscUJBQXFCO1FBQ3JCQztNQUNGLENBQUMsU0FBU3FELE1BQUksQ0FBQ3pELG9CQUFvQixDQUFDQyxZQUFZLENBQUM7TUFDakQsSUFBSSxDQUFDRSxxQkFBcUIsRUFBRTtRQUMxQixJQUFJQyxjQUFjLEtBQUssV0FBVyxFQUFFO1VBQ2xDLEtBQUssQ0FBQztRQUNSO01BQ0Y7TUFDQSxPQUFPRCxxQkFBcUI7SUFBQztFQUMvQjtFQUNBdUQsbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQ3hPLFNBQVMsQ0FBQ3hCLGNBQWMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUc7RUFDMUQ7RUFDQWlRLGVBQWVBLENBQUEsRUFBRztJQUNoQixPQUFPLElBQUksQ0FBQ3pPLFNBQVMsQ0FBQ3ZCLFVBQVU7RUFDbEM7RUFDTWlRLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQUMsT0FBQTtJQUFBLE9BQUF0UCxpQkFBQTtNQUMzQixJQUFJLENBQUNzUCxPQUFJLENBQUN4RCxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7TUFDckQsSUFBSSxDQUFDeUQsZ0JBQWdCLEVBQUVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQ0YsT0FBSSxDQUFDakMsaUJBQWlCLEVBQUVpQyxPQUFJLENBQUNoQyxrQkFBa0IsQ0FBQztNQUM1RixJQUFNO1FBQ0ptQyxLQUFLO1FBQ0xDLE1BQU07UUFDTkM7TUFDRixDQUFDLEdBQUcvVixRQUFRLENBQUNtSCxjQUFjLEVBQUU7O01BRTdCO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBOztNQUVBLElBQUk2TyxVQUFVLEdBQUdGLE1BQU07TUFDdkIsSUFBSUcsY0FBYyxHQUFHSixLQUFLLENBQUMxRCxVQUFVO01BQ3JDLElBQUkrRCxlQUFlLEdBQUdMLEtBQUssQ0FBQ3pELFdBQVc7TUFDdkMsSUFBSStELG9CQUFvQixHQUFHTixLQUFLLENBQUNPLFdBQVc7TUFDNUMsSUFBSUMscUJBQXFCLEdBQUdSLEtBQUssQ0FBQ1MsWUFBWTtNQUM5QyxJQUFJQyxzQkFBc0IsR0FBR2IsT0FBSSxDQUFDYyxvQkFBb0I7TUFDdEQsSUFBSUMsdUJBQXVCLEdBQUdmLE9BQUksQ0FBQ2dCLHFCQUFxQjtNQUN4RCxJQUFJQyxvQkFBb0IsR0FBR2pCLE9BQUksQ0FBQ3ZMLGtCQUFrQjtNQUNsRCxJQUFNeU0sV0FBVyxHQUFHbEIsT0FBSSxDQUFDek8sU0FBUyxLQUFLLFlBQVk7TUFDbkQsSUFBSXlPLE9BQUksQ0FBQ21CLGtCQUFrQixFQUFFO1FBQzNCLENBQUNOLHNCQUFzQixFQUFFRSx1QkFBdUIsQ0FBQyxHQUFHLENBQUNBLHVCQUF1QixFQUFFRixzQkFBc0IsQ0FBQztRQUNyRyxDQUFDWixnQkFBZ0IsRUFBRUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDQSxnQkFBZ0IsRUFBRUQsZ0JBQWdCLENBQUM7UUFDM0VLLFVBQVUsR0FBR0QsY0FBYztRQUMzQlksb0JBQW9CLEdBQUdqQixPQUFJLENBQUN2TCxrQkFBa0IsS0FBSyxVQUFVLEdBQUcsV0FBVyxHQUFHLFVBQVU7TUFDMUY7TUFDQSxJQUFJMk0sYUFBYSxHQUFHLEtBQUs7TUFDekIsSUFBSUMsY0FBYyxHQUFHLEtBQUs7TUFDMUIsSUFBSXJCLE9BQUksQ0FBQ3pMLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDdkMsSUFBSTBNLG9CQUFvQixLQUFLakIsT0FBSSxDQUFDekwsZUFBZSxFQUFFO1VBQ2pEO1VBQ0E2TSxhQUFhLEdBQUdiLGNBQWM7VUFDOUJjLGNBQWMsR0FBR2IsZUFBZTtRQUNsQyxDQUFDLE1BQU07VUFDTDtVQUNBYSxjQUFjLEdBQUdiLGVBQWU7UUFDbEM7TUFDRixDQUFDLE1BQU07UUFDTCxJQUFJUyxvQkFBb0IsS0FBS2pCLE9BQUksQ0FBQ3pMLGVBQWUsRUFBRTtVQUNqRDtVQUNBOE0sY0FBYyxHQUFHYixlQUFlO1FBQ2xDLENBQUMsTUFBTTtVQUNMO1VBQ0FZLGFBQWEsR0FBR2IsY0FBYztVQUM5QmMsY0FBYyxHQUFHYixlQUFlO1FBQ2xDO01BQ0Y7TUFDQSxJQUFJYyxFQUFFLEVBQUVDLEVBQUU7TUFDVixJQUFNQyxLQUFLLEdBQUdqQixjQUFjLEdBQUdFLG9CQUFvQjtNQUNuRCxJQUFNZ0IsTUFBTSxHQUFHcEcsSUFBSSxDQUFDcUcsR0FBRyxDQUFDckcsSUFBSSxDQUFDQyxLQUFLLENBQUN1RixzQkFBc0IsR0FBR1csS0FBSyxDQUFDLEVBQUVKLGFBQWEsQ0FBQztNQUNsRixJQUFNTyxPQUFPLEdBQUd0RyxJQUFJLENBQUNxRyxHQUFHLENBQUNyRyxJQUFJLENBQUNDLEtBQUssQ0FBQ3lGLHVCQUF1QixHQUFHUyxLQUFLLENBQUMsRUFBRUgsY0FBYyxDQUFDO01BQ3JGQyxFQUFFLEdBQUdqRyxJQUFJLENBQUN1RyxHQUFHLENBQUN2RyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDbUYsb0JBQW9CLEdBQUdJLHNCQUFzQixJQUFJLENBQUMsR0FBR1csS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ3pGRCxFQUFFLEdBQUdsRyxJQUFJLENBQUN1RyxHQUFHLENBQUN2RyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDcUYscUJBQXFCLEdBQUdJLHVCQUF1QixJQUFJLENBQUMsR0FBR1MsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQzNGLElBQUlOLFdBQVcsRUFBRTtRQUNmLENBQUNqQixnQkFBZ0IsRUFBRUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDQSxnQkFBZ0IsRUFBRUQsZ0JBQWdCLENBQUM7TUFDN0U7TUFDQUssVUFBVSxDQUFDdUIsWUFBWSxDQUFDLE9BQU8sRUFBRTVCLGdCQUFnQixDQUFDO01BQ2xESyxVQUFVLENBQUN1QixZQUFZLENBQUMsUUFBUSxFQUFFM0IsZ0JBQWdCLENBQUM7TUFDbkQsSUFBTTRCLFdBQVcsR0FBR3hCLFVBQVUsQ0FBQ3lCLFVBQVUsQ0FBQyxJQUFJLEVBQUU7UUFDOUNDLGtCQUFrQixFQUFFO01BQ3RCLENBQUMsQ0FBQztNQUNGRixXQUFXLENBQUNHLFNBQVMsQ0FBQzlCLEtBQUssRUFBRW1CLEVBQUUsRUFBRUMsRUFBRSxFQUFFRSxNQUFNLEVBQUVFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFMUIsZ0JBQWdCLEVBQUVDLGdCQUFnQixDQUFDO01BQy9GLElBQUlnQyxPQUFPLEVBQUVDLFVBQVU7TUFDdkJELE9BQU8sR0FBR0osV0FBVyxDQUFDTSxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRW5DLGdCQUFnQixFQUFFQyxnQkFBZ0IsQ0FBQztNQUM1RWlDLFVBQVUsR0FBRzdCLFVBQVUsQ0FBQytCLFNBQVMsQ0FBQyxZQUFZLENBQUM7TUFDL0MsSUFBSW5CLFdBQVcsRUFBRTtRQUNmLENBQUNnQixPQUFPLEVBQUVDLFVBQVUsQ0FBQyxTQUFTbkMsT0FBSSxDQUFDc0MsUUFBUSxDQUFDSixPQUFPLEVBQUVDLFVBQVUsRUFBRSxHQUFHLENBQUM7TUFDdkU7TUFDQSxJQUFJbkMsT0FBSSxDQUFDbUIsa0JBQWtCLEVBQUU7UUFDM0IsYUFBYW5CLE9BQUksQ0FBQ3NDLFFBQVEsQ0FBQ0osT0FBTyxFQUFFQyxVQUFVLEVBQUVuQyxPQUFJLENBQUNILG1CQUFtQixFQUFFLENBQUM7TUFDN0UsQ0FBQyxNQUFNO1FBQ0wsT0FBTyxDQUFDcUMsT0FBTyxFQUFFQyxVQUFVLENBQUM7TUFDOUI7SUFBQztFQUNIO0VBQ01HLFFBQVFBLENBQUNKLE9BQU8sRUFBRUMsVUFBVSxFQUFFSSxNQUFNLEVBQUU7SUFBQSxPQUFBN1IsaUJBQUE7TUFDMUMsT0FBTyxJQUFJZ0gsT0FBTyxDQUFDQyxPQUFPLElBQUk7UUFDNUIsSUFBSTRLLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDaEI1SyxPQUFPLENBQUMsQ0FBQ3VLLE9BQU8sRUFBRUMsVUFBVSxDQUFDLENBQUM7UUFDaEM7UUFDQSxJQUFNSyxHQUFHLEdBQUcsSUFBSUMsS0FBSyxFQUFFO1FBQ3ZCLElBQU1DLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ25ESixHQUFHLENBQUNLLEdBQUcsR0FBR1YsVUFBVTtRQUNwQkssR0FBRyxDQUFDNUosZ0JBQWdCLENBQUMsTUFBTSxlQUFBbEksaUJBQUEsQ0FBRSxhQUFZO1VBQ3ZDO1VBQ0EsSUFBTW9TLFdBQVcsR0FBR0osVUFBVSxDQUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDO1VBQy9DVyxVQUFVLENBQUN6VSxLQUFLLENBQUM4VSxRQUFRLEdBQUcsVUFBVTtVQUN0QyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDL0YsUUFBUSxDQUFDdUYsTUFBTSxDQUFDLEVBQUU7WUFDOUJHLFVBQVUsQ0FBQzNVLEtBQUssR0FBR3lVLEdBQUcsQ0FBQ1EsTUFBTTtZQUM3Qk4sVUFBVSxDQUFDTSxNQUFNLEdBQUdSLEdBQUcsQ0FBQ3pVLEtBQUs7VUFDL0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUNpUCxRQUFRLENBQUN1RixNQUFNLENBQUMsRUFBRTtZQUNwQ0csVUFBVSxDQUFDM1UsS0FBSyxHQUFHeVUsR0FBRyxDQUFDelUsS0FBSztZQUM1QjJVLFVBQVUsQ0FBQ00sTUFBTSxHQUFHUixHQUFHLENBQUNRLE1BQU07VUFDaEM7VUFDQSxJQUFJVCxNQUFNLEtBQUssRUFBRSxFQUFFTyxXQUFXLENBQUNHLFNBQVMsQ0FBQ1QsR0FBRyxDQUFDUSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJVCxNQUFNLEtBQUssR0FBRyxFQUFFTyxXQUFXLENBQUNHLFNBQVMsQ0FBQ1QsR0FBRyxDQUFDelUsS0FBSyxFQUFFeVUsR0FBRyxDQUFDUSxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUlULE1BQU0sS0FBSyxHQUFHLEVBQUVPLFdBQVcsQ0FBQ0csU0FBUyxDQUFDLENBQUMsRUFBRVQsR0FBRyxDQUFDelUsS0FBSyxDQUFDO1VBQzFMK1UsV0FBVyxDQUFDSSxNQUFNLENBQUNYLE1BQU0sR0FBR2xILElBQUksQ0FBQzhILEVBQUUsR0FBRyxHQUFHLENBQUM7VUFDMUNMLFdBQVcsQ0FBQ2IsU0FBUyxDQUFDTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUNoQyxJQUFNWSxZQUFZLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUNwRyxRQUFRLENBQUN1RixNQUFNLENBQUMsR0FBR08sV0FBVyxDQUFDVixZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRUksR0FBRyxDQUFDUSxNQUFNLEVBQUVSLEdBQUcsQ0FBQ3pVLEtBQUssQ0FBQyxHQUFHK1UsV0FBVyxDQUFDVixZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRUksR0FBRyxDQUFDelUsS0FBSyxFQUFFeVUsR0FBRyxDQUFDUSxNQUFNLENBQUM7VUFDL0pyTCxPQUFPLENBQUMsQ0FBQ3lMLFlBQVksRUFBRVYsVUFBVSxDQUFDTCxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztVQUMzRFMsV0FBVyxDQUFDTyxPQUFPLEVBQUU7UUFDdkIsQ0FBQyxFQUFDO01BQ0osQ0FBQyxDQUFDO0lBQUM7RUFDTDtFQUNNQyxtQkFBbUJBLENBQUNyRyxPQUFPLEVBQWdDO0lBQUEsSUFBQXNHLFdBQUEsR0FBQW5PLFNBQUE7TUFBQW9PLE9BQUE7SUFBQSxPQUFBOVMsaUJBQUE7TUFBQSxJQUE5QitTLE9BQU8sR0FBQUYsV0FBQSxDQUFBaE8sTUFBQSxRQUFBZ08sV0FBQSxRQUFBL04sU0FBQSxHQUFBK04sV0FBQSxNQUFHLENBQUM7TUFBQSxJQUFFRyxRQUFRLEdBQUFILFdBQUEsQ0FBQWhPLE1BQUEsUUFBQWdPLFdBQUEsUUFBQS9OLFNBQUEsR0FBQStOLFdBQUEsTUFBRyxJQUFJO01BQzdELElBQUksQ0FBQ3RHLE9BQU8sSUFBSUEsT0FBTyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztNQUN0QjtNQUNBLElBQUk7UUFDRixJQUFJaUYsT0FBTztRQUNYLElBQUlDLFVBQVUsR0FBRyxJQUFJO1FBQ3JCLElBQU0sQ0FBQ2xELE1BQU0sQ0FBQyxHQUFHdUUsT0FBSSxDQUFDM0YsV0FBVyxFQUFFO1FBQ25DLElBQUk2RixRQUFRLEtBQUssSUFBSSxFQUFFO1VBQ3JCeEIsT0FBTyxHQUFHd0IsUUFBUTtRQUNwQixDQUFDLE1BQU07VUFDTCxDQUFDeEIsT0FBTyxFQUFFQyxVQUFVLENBQUMsU0FBU3FCLE9BQUksQ0FBQ3pELG9CQUFvQixFQUFFO1FBQzNEO1FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQ21DLE9BQU8sRUFBRTtVQUNkLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBQ3RCO1FBQ0FzQixPQUFJLENBQUN0USxXQUFXLENBQUM4TCxLQUFLLENBQUMyRSxHQUFHLENBQUN6QixPQUFPLENBQUMwQixJQUFJLEVBQUUzRSxNQUFNLENBQUM7UUFDaEQsSUFBSTRFLEdBQUcsR0FBRyxLQUFLO1VBQ2JDLEtBQUssR0FBRyxLQUFLO1VBQ2JDLFFBQVEsR0FBRyxLQUFLO1FBQ2xCLFFBQVFQLE9BQUksQ0FBQ2pTLFNBQVM7VUFDcEIsS0FBSyxRQUFRO1VBQ2IsS0FBSyxRQUFRO1VBQ2IsS0FBSyxZQUFZO1VBQ2pCLEtBQUssWUFBWTtZQUNmc1MsR0FBRyxHQUFHLElBQUk7WUFDVjtVQUNGLEtBQUssVUFBVTtVQUNmLEtBQUssY0FBYztVQUNuQixLQUFLLGtCQUFrQjtVQUN2QixLQUFLLHNCQUFzQjtZQUN6QkUsUUFBUSxHQUFHLElBQUk7WUFDZjtVQUNGLEtBQUssT0FBTztVQUNaLEtBQUssWUFBWTtVQUNqQixLQUFLLFdBQVc7WUFDZEQsS0FBSyxHQUFHLElBQUk7WUFDWjtVQUNGLEtBQUssUUFBUTtZQUNYO1lBQ0E7VUFDRjtZQUNFLE1BQU0sSUFBSXhRLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUFDO1FBRTVDLElBQUl3RyxNQUFNLEdBQUcsSUFBSTtRQUNqQixJQUFJK0osR0FBRyxJQUFJRSxRQUFRLElBQUlELEtBQUssRUFBRTtVQUM1QmhLLE1BQU0sR0FBRzBKLE9BQUksQ0FBQ3RRLFdBQVcsQ0FBQzhRLGlCQUFpQixDQUFDL0UsTUFBTSxFQUFFdUUsT0FBSSxDQUFDekYsaUJBQWlCLEVBQUV5RixPQUFJLENBQUN4RixrQkFBa0IsRUFBRWYsT0FBTyxFQUFFNEcsR0FBRyxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQztRQUNySSxDQUFDLE1BQU07VUFDTGpLLE1BQU0sR0FBRzBKLE9BQUksQ0FBQ3RRLFdBQVcsQ0FBQytRLGFBQWEsQ0FBQ2hGLE1BQU0sRUFBRXVFLE9BQUksQ0FBQ3pGLGlCQUFpQixFQUFFeUYsT0FBSSxDQUFDeEYsa0JBQWtCLEVBQUVmLE9BQU8sRUFBRXdHLE9BQU8sQ0FBQztRQUNwSDs7UUFFQTtRQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUMzSixNQUFNLEVBQUVvSSxPQUFPLEVBQUVDLFVBQVUsQ0FBQztNQUN4QyxDQUFDLENBQUMsT0FBT3pMLENBQUMsRUFBRTtRQUNWLElBQU13TixPQUFPLEdBQUcseUJBQXlCLEdBQUd4TixDQUFDO1FBQzdDLElBQUlBLENBQUMsQ0FBQ3NGLFFBQVEsRUFBRSxDQUFDZ0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1VBQ25DLEtBQUssQ0FBQztRQUNSLENBQUMsTUFBTTtVQUNMLEtBQUssQ0FBQztVQUNOLE1BQU10RyxDQUFDO1FBQ1Q7TUFDRjtJQUFDO0VBQ0g7RUFDTXlOLGtCQUFrQkEsQ0FBQ2xILE9BQU8sRUFBRTlGLE9BQU8sRUFBRWlOLE9BQU8sRUFBRUMsbUJBQW1CLEVBQUVuQyxPQUFPLEVBQUVDLFVBQVUsRUFBRTtJQUFBLElBQUFtQyxPQUFBO0lBQUEsT0FBQTVULGlCQUFBO01BQzVGLElBQUk7UUFDRixJQUFJdU0sT0FBTyxLQUFLLElBQUksRUFBRTtVQUNwQixPQUFPLEVBQUU7UUFDWCxDQUFDLE1BQU0sSUFBSUEsT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFO1VBQ3pCLE9BQU8sc0JBQXNCO1FBQy9CO1FBQ0EsSUFBSW5CLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQ3dJLE9BQUksQ0FBQ3ZILGFBQWEsQ0FBQ0MsUUFBUSxDQUFDN0YsT0FBTyxDQUFDLEVBQUUsTUFBTSxJQUFJN0QsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQ2xGLElBQU0sR0FBR2lSLFlBQVksQ0FBQyxHQUFHRCxPQUFJLENBQUN6RyxXQUFXLEVBQUU7UUFDM0MsSUFBTTJHLFdBQVc7VUFBQSxJQUFBQyxLQUFBLEdBQUEvVCxpQkFBQSxDQUFHLFdBQU0yVCxtQkFBbUIsRUFBSTtZQUFBLElBQUFLLFVBQUEsRUFBQUMsV0FBQTtZQUMvQyxJQUFJTixtQkFBbUIsRUFBRTtjQUN2QixNQUFNQyxPQUFJLENBQUNoQixtQkFBbUIsQ0FBQ3JHLE9BQU8sRUFBRSxDQUFDLEVBQUVpRixPQUFPLENBQUM7WUFDckQ7WUFDQSxRQUFRL0ssT0FBTztjQUNiLEtBQUssUUFBUTtjQUNiLEtBQUssUUFBUTtjQUNiLEtBQUssWUFBWTtjQUNqQixLQUFLLFlBQVk7Z0JBQ2YyRSxTQUFTLEdBQUd3SSxPQUFJLENBQUNwUixXQUFXLENBQUMwUixVQUFVLENBQUMzSCxPQUFPLEVBQUVzSCxZQUFZLENBQUM7Z0JBQzlEO2NBQ0YsS0FBSyxVQUFVO2NBQ2YsS0FBSyxrQkFBa0I7Y0FDdkIsS0FBSyxjQUFjO2NBQ25CLEtBQUssc0JBQXNCO2dCQUN6QnpJLFNBQVMsR0FBR3dJLE9BQUksQ0FBQ3BSLFdBQVcsQ0FBQzJSLFlBQVksQ0FBQzVILE9BQU8sRUFBRXNILFlBQVksQ0FBQztnQkFDaEU7Y0FDRixLQUFLLE9BQU87Y0FDWixLQUFLLFdBQVc7Z0JBQ2R6SSxTQUFTLEdBQUd3SSxPQUFJLENBQUNwUixXQUFXLENBQUM0UixTQUFTLENBQUM3SCxPQUFPLEVBQUVzSCxZQUFZLENBQUM7Z0JBQzdEO2NBQ0YsS0FBSyxZQUFZO2dCQUNmekksU0FBUyxHQUFHd0ksT0FBSSxDQUFDcFIsV0FBVyxDQUFDNlIsYUFBYSxDQUFDOUgsT0FBTyxFQUFFc0gsWUFBWSxDQUFDO2dCQUNqRTtjQUNGLEtBQUssUUFBUTtnQkFDWHpJLFNBQVMsR0FBR3dJLE9BQUksQ0FBQ3BSLFdBQVcsQ0FBQzhSLFVBQVUsQ0FBQy9ILE9BQU8sRUFBRXNILFlBQVksQ0FBQztnQkFDOUQ7Y0FDRjtnQkFDRSxNQUFNLElBQUlqUixLQUFLLENBQUMseUJBQXlCLENBQUM7WUFBQzs7WUFHL0M7WUFDQSxJQUFJNkQsT0FBTyxLQUFLLFFBQVEsRUFBRTtjQUN4QixJQUFJMkUsU0FBUyxLQUFLLElBQUksSUFBSUEsU0FBUyxLQUFLLEVBQUUsSUFBSUEsU0FBUyxLQUFLLE9BQU8sSUFBSUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDL0YsT0FBTyxLQUFLO2NBQ2QsQ0FBQyxNQUFNO2dCQUNMLE9BQU8sSUFBSTtjQUNiO1lBQ0Y7WUFDQUEsU0FBUyxHQUFHd0ksT0FBSSxDQUFDVyxhQUFhLENBQUNuSixTQUFTLENBQUM7WUFDekMsSUFBSSxFQUFBNEksVUFBQSxHQUFBNUksU0FBUyxjQUFBNEksVUFBQSx1QkFBVEEsVUFBQSxDQUFXUSxRQUFRLE1BQUssV0FBVyxJQUFJLEVBQUFQLFdBQUEsR0FBQTdJLFNBQVMsY0FBQTZJLFdBQUEsdUJBQVRBLFdBQUEsQ0FBV08sUUFBUSxNQUFLLE1BQU0sRUFBRTtjQUN6RSxPQUFPLElBQUk7WUFDYixDQUFDLE1BQU07Y0FDTCxJQUFJYixtQkFBbUIsRUFBRTtnQkFDdkIsSUFBSUMsT0FBSSxDQUFDYSxxQkFBcUIsR0FBR2IsT0FBSSxDQUFDYyx3QkFBd0IsRUFBRTtrQkFDOUQ7a0JBQ0E7a0JBQ0EsSUFBTUMsUUFBUSxHQUFHZixPQUFJLENBQUNhLHFCQUFxQixHQUFHYixPQUFJLENBQUNnQixtQkFBbUIsQ0FBQy9QLE1BQU07a0JBQzdFMk0sT0FBTyxHQUFHb0MsT0FBSSxDQUFDZ0IsbUJBQW1CLENBQUNELFFBQVEsQ0FBQztrQkFDNUNmLE9BQUksQ0FBQ2EscUJBQXFCLEVBQUU7a0JBQzVCLGFBQWFYLFdBQVcsQ0FBQ0gsbUJBQW1CLENBQUM7Z0JBQy9DLENBQUMsTUFBTTtrQkFDTDtrQkFDQUMsT0FBSSxDQUFDYSxxQkFBcUIsR0FBRyxDQUFDO2tCQUM5QmIsT0FBSSxDQUFDeE4saUJBQWlCLENBQUMsS0FBSyxDQUFDO2tCQUM3QndOLE9BQUksQ0FBQ2lCLG1CQUFtQixFQUFFLENBQUMsQ0FBQztrQkFDNUIsTUFBTWpCLE9BQUksQ0FBQ2xPLGFBQWEsQ0FBQ2tPLE9BQUksQ0FBQzlYLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFLEtBQUssRUFBRTJXLFVBQVUsQ0FBQztrQkFDbkZtQyxPQUFJLENBQUNrQixVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBPLEtBQUssRUFBRTtvQkFDL0N6TyxPQUFPLEVBQUU7a0JBQ1gsQ0FBQyxDQUFDO2tCQUNGLE9BQU8sS0FBSztnQkFDZDtjQUNGLENBQUMsTUFBTTtnQkFDTCxPQUFPLEtBQUs7Y0FDZDtZQUNGO1VBQ0YsQ0FBQztVQUFBLGdCQWxFSzhTLFdBQVdBLENBQUFpQixFQUFBO1lBQUEsT0FBQWhCLEtBQUEsQ0FBQXJMLEtBQUEsT0FBQWhFLFNBQUE7VUFBQTtRQUFBLEdBa0VoQjtRQUNEOztRQUVBLFVBQVVvUCxXQUFXLENBQUNILG1CQUFtQixDQUFDLEVBQUU7VUFDMUMsSUFBTS9TLFlBQVksR0FBRzZGLE9BQU8sS0FBSyxRQUFRO1VBQ3pDLElBQUl1TyxZQUFZO1VBQ2hCLElBQUlwVSxZQUFZLEVBQUU7WUFDaEJvVSxZQUFZLEdBQUdwQixPQUFJLENBQUNxQixZQUFZLENBQUN6WixRQUFRO1VBQzNDLENBQUMsTUFBTSxJQUFJb1ksT0FBSSxDQUFDalQsU0FBUyxDQUFDcEUsZUFBZSxFQUFFO1lBQ3pDeVksWUFBWSxHQUFHcEIsT0FBSSxDQUFDcUIsWUFBWSxDQUFDMVosT0FBTztVQUMxQyxDQUFDLE1BQU07WUFDTHlaLFlBQVksR0FBR3BCLE9BQUksQ0FBQ3FCLFlBQVksQ0FBQ3phLElBQUk7VUFDdkM7VUFDQSxJQUFJMGEsV0FBVyxTQUFTdEIsT0FBSSxDQUFDbkcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUVxSCxPQUFJLENBQUN1QixpQkFBaUIsQ0FBQzFaLEtBQUssRUFBRXVaLFlBQVksQ0FBQztVQUNsRyxJQUFJSSxTQUFTLEdBQUcsSUFBSTtVQUNwQixJQUFJQyxTQUFTLEdBQUcsSUFBSTtVQUNwQixJQUFJLENBQUN6VSxZQUFZLEVBQUU7WUFDakJ3VSxTQUFTLFNBQVN4QixPQUFJLENBQUNuRyxnQkFBZ0IsQ0FBQ2xCLE9BQU8sRUFBRXFILE9BQUksQ0FBQ3VCLGlCQUFpQixDQUFDelosSUFBSSxFQUFFa1ksT0FBSSxDQUFDcUIsWUFBWSxDQUFDMVosT0FBTyxDQUFDO1lBQ3hHNlosU0FBUyxHQUFHQSxTQUFTLEtBQUssT0FBTyxHQUFHLElBQUksR0FBR0EsU0FBUztZQUNwREMsU0FBUyxHQUFHekIsT0FBSSxDQUFDalQsU0FBUyxDQUFDckUsWUFBWSxTQUFTc1gsT0FBSSxDQUFDbkcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUUsSUFBSSxFQUFFeUksWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUk7VUFDbkg7VUFDQSxJQUFJdEIsT0FBTyxFQUFFO1lBQ1gsTUFBTUUsT0FBSSxDQUFDbE8sYUFBYSxDQUFDa08sT0FBSSxDQUFDOVgsV0FBVyxDQUFDZCx1QkFBdUIsRUFBRSxLQUFLLEVBQUVvYSxTQUFTLENBQUM7VUFDdEYsQ0FBQyxNQUFNO1lBQ0wsTUFBTXhCLE9BQUksQ0FBQ2xPLGFBQWEsQ0FBQ2tPLE9BQUksQ0FBQzlYLFdBQVcsQ0FBQ2YsY0FBYyxDQUFDO1VBQzNEOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQSxPQUFPLENBQUNxUSxTQUFTLEVBQUU4SixXQUFXLEVBQUVFLFNBQVMsRUFBRUMsU0FBUyxDQUFDO1FBQ3ZELENBQUMsTUFBTTtVQUNMLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDbEM7TUFDRixDQUFDLENBQUMsT0FBT3JQLENBQUMsRUFBRTtRQUNWLEtBQUssQ0FBQztRQUNOLE1BQU1BLENBQUM7TUFDVDtJQUFDO0VBQ0g7RUFDQXNQLFlBQVlBLENBQUM3TyxPQUFPLEVBQUU4RixPQUFPLEVBQUU7SUFDN0IsT0FBTyxJQUFJdkYsT0FBTyxDQUFDLENBQUNDLE9BQU8sRUFBRXNPLE1BQU0sS0FBSztNQUN0QyxJQUFNLEdBQUcxQixZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMxRyxXQUFXLEVBQUU7TUFDM0MsSUFBSTFHLE9BQU8sQ0FBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNoQztRQUNBO1FBQ0FtQyxVQUFVLENBQUMsTUFBTTtVQUNmRixPQUFPLENBQUMsSUFBSSxDQUFDekUsV0FBVyxDQUFDZ1QsU0FBUyxDQUFDakosT0FBTyxFQUFFc0gsWUFBWSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNULENBQUMsTUFBTTtRQUNMMEIsTUFBTSxDQUFDLElBQUkzUyxLQUFLLENBQUMsOENBQThDLEdBQUc2RCxPQUFPLENBQUMsQ0FBQztNQUM3RTtJQUNGLENBQUMsQ0FBQztFQUNKO0VBQ0E4TixhQUFhQSxDQUFDa0IsR0FBRyxFQUFFO0lBQ2pCLElBQUlDLEtBQUssR0FBR0QsR0FBRyxDQUFDL0wsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMxQixJQUFJaU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLEtBQUssSUFBSTNMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzBMLEtBQUssQ0FBQzdRLE1BQU0sRUFBRW1GLENBQUMsRUFBRSxFQUFFO01BQ3JDLElBQUk0TCxJQUFJLEdBQUdGLEtBQUssQ0FBQzFMLENBQUMsQ0FBQyxDQUFDTixLQUFLLENBQUMsR0FBRyxDQUFDO01BQzlCLElBQUlrTSxJQUFJLENBQUMvUSxNQUFNLEtBQUssQ0FBQyxFQUFFOFEsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0EsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQztJQUNBLE9BQU9ELEdBQUc7RUFDWjtFQUNBRSxhQUFhQSxDQUFDdEosT0FBTyxFQUFFO0lBQ3JCLElBQUlBLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxFQUFFO0lBQ1gsQ0FBQyxNQUFNLElBQUlBLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtNQUN6QixPQUFPLHNCQUFzQjtJQUMvQjtJQUNBLElBQU0sSUFBSXVKLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDM0ksV0FBVyxFQUFFO0lBQ2pELElBQUkvRCxNQUFNLEdBQUcsSUFBSTtJQUNqQkEsTUFBTSxHQUFHLElBQUksQ0FBQzVHLFdBQVcsQ0FBQ3VULFdBQVcsQ0FBQ3hKLE9BQU8sRUFBRXVKLGlCQUFpQixDQUFDO0lBQ2pFLElBQUkxTSxNQUFNLElBQUksSUFBSSxJQUFJQSxNQUFNLEtBQUssRUFBRSxFQUFFO01BQ25DLEtBQUssQ0FBQztJQUNSOztJQUVBOztJQUVBLE9BQU9BLE1BQU0sS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQ21MLGFBQWEsQ0FBQ25MLE1BQU0sQ0FBQztFQUM1RDtFQUNNNE0saUJBQWlCQSxDQUFDdlAsT0FBTyxFQUFFOEYsT0FBTyxFQUFFaUYsT0FBTyxFQUFFO0lBQUEsSUFBQXlFLE9BQUE7SUFBQSxPQUFBalcsaUJBQUE7TUFDakQsTUFBTWlXLE9BQUksQ0FBQ3JELG1CQUFtQixDQUFDckcsT0FBTyxFQUFFLENBQUMsRUFBRWlGLE9BQU8sQ0FBQztNQUNuRDtNQUNBLGFBQWF5RSxPQUFJLENBQUNYLFlBQVksQ0FBQzdPLE9BQU8sRUFBRThGLE9BQU8sQ0FBQztJQUFDO0VBQ25EO0VBQ0EySixpQ0FBaUNBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFDbEMsSUFBSSxDQUFDQyxtQ0FBbUMsRUFBRTtJQUMxQyxJQUFJLENBQUNDLDhCQUE4QixHQUFHbFAsVUFBVSxlQUFBbkgsaUJBQUEsQ0FBQyxhQUFZO01BQzNEO01BQ0EsTUFBTW1XLE9BQUksQ0FBQ0cseUJBQXlCLEVBQUU7SUFDeEMsQ0FBQyxHQUFFLElBQUksQ0FBQzNWLFNBQVMsQ0FBQ3RCLGtDQUFrQyxDQUFDO0VBQ3ZEO0VBQ01pWCx5QkFBeUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFBQSxPQUFBdlcsaUJBQUE7TUFDaEMsSUFBSTtRQUNGdVcsT0FBSSxDQUFDSCxtQ0FBbUMsRUFBRTtRQUMxQyxJQUFNSSxVQUFVLEdBQUdELE9BQUksQ0FBQzFWLFNBQVMsQ0FBQ3lMLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdEQsTUFBTWlLLE9BQUksQ0FBQ0UsWUFBWSxDQUFDRCxVQUFVLENBQUM7UUFDbkMsSUFBTTtVQUNKL0c7UUFDRixDQUFDLEdBQUc3VixRQUFRLENBQUNtSCxjQUFjLEVBQUU7UUFDN0IsSUFBSTBPLEtBQUssRUFBRTtVQUNUO1VBQ0E7VUFDQTtVQUNBLElBQUksV0FBVyxJQUFJQSxLQUFLLEVBQUU7WUFDeEJBLEtBQUssQ0FBQ3hELFNBQVMsR0FBR3NLLE9BQUksQ0FBQ0csUUFBUTtVQUNqQyxDQUFDLE1BQU07WUFDTDtZQUNBakgsS0FBSyxDQUFDMEMsR0FBRyxHQUFHclQsTUFBTSxDQUFDNlgsR0FBRyxDQUFDQyxlQUFlLENBQUNMLE9BQUksQ0FBQ0csUUFBUSxDQUFDO1VBQ3ZEO1VBQ0FqSCxLQUFLLENBQUN2SCxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNO1lBQzdDO1lBQ0F1SCxLQUFLLENBQUNvSCxJQUFJLEVBQUU7VUFDZCxDQUFDLENBQUM7VUFDRnBILEtBQUssQ0FBQ3ZILGdCQUFnQixDQUFDLFNBQVMsZUFBQWxJLGlCQUFBLENBQUUsYUFBWTtZQUM1QyxLQUFLLENBQUM7O1lBRU47WUFDQXVXLE9BQUksQ0FBQ3hTLGtCQUFrQixHQUFHMEwsS0FBSyxDQUFDMUQsVUFBVSxHQUFHMEQsS0FBSyxDQUFDekQsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsV0FBVztZQUM3RixLQUFLLENBQUM7WUFDTixLQUFLLENBQUM7WUFDTixLQUFLLENBQUM7WUFDTnVLLE9BQUksQ0FBQ3pLLGdCQUFnQixHQUFHLElBQUk7WUFDNUIsTUFBTXlLLE9BQUksQ0FBQ08sYUFBYSxFQUFFO1VBQzVCLENBQUMsRUFBQztVQUNGLE1BQU1QLE9BQUksQ0FBQzdRLGFBQWEsQ0FBQzZRLE9BQUksQ0FBQ3phLFdBQVcsQ0FBQ3BCLEtBQUssQ0FBQztVQUNoRCtVLEtBQUssQ0FBQ3NILG9CQUFvQixFQUFFO1FBQzlCLENBQUMsTUFBTTtVQUNMLE1BQU1SLE9BQUksQ0FBQzdRLGFBQWEsQ0FBQzZRLE9BQUksQ0FBQ3phLFdBQVcsQ0FBQ3JCLFNBQVMsQ0FBQztVQUNwRDhiLE9BQUksQ0FBQ3BRLGFBQWEsRUFBRTtRQUN0QjtNQUNGLENBQUMsQ0FBQyxPQUFPSCxDQUFDLEVBQUU7UUFDVixLQUFLLENBQUM7UUFDTixJQUFJQSxDQUFDLENBQUNnUixJQUFJLEtBQUssaUJBQWlCLEVBQUU7VUFDaEMsSUFBTUMsWUFBWSxHQUFHLHlDQUF5QztVQUM5RCxLQUFLLENBQUM7VUFDTixLQUFLLENBQUM7VUFDTlYsT0FBSSxDQUFDVyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUVsUixDQUFDLEVBQUVpUixZQUFZLENBQUM7UUFDbEQsQ0FBQyxNQUFNLElBQUlqUixDQUFDLENBQUNnUixJQUFJLEtBQUssa0JBQWtCLEVBQUU7VUFDeEM7VUFDQSxNQUFNVCxPQUFJLENBQUM3USxhQUFhLENBQUM2USxPQUFJLENBQUN6YSxXQUFXLENBQUNyQixTQUFTLENBQUM7VUFDcEQ4YixPQUFJLENBQUNZLFVBQVUsRUFBRTtVQUNqQixJQUFJWixPQUFJLENBQUM1VixTQUFTLENBQUNyQiwrQkFBK0IsR0FBRyxDQUFDLEVBQUU7WUFDdEQ7WUFDQWlYLE9BQUksQ0FBQ2EsMEJBQTBCLElBQUksQ0FBQztZQUNwQ2IsT0FBSSxDQUFDTCxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7VUFDNUMsQ0FBQyxNQUFNO1lBQ0wsSUFBSUssT0FBSSxDQUFDNVYsU0FBUyxDQUFDckIsK0JBQStCLEdBQUdpWCxPQUFJLENBQUNhLDBCQUEwQixFQUFFO2NBQ3BGYixPQUFJLENBQUNhLDBCQUEwQixJQUFJLENBQUM7Y0FDcENiLE9BQUksQ0FBQ0wsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsTUFBTTtjQUNMLElBQU1lLGFBQVksR0FBRywwRUFBMEU7Y0FDL0ZWLE9BQUksQ0FBQ1csa0JBQWtCLENBQUMsTUFBTSxFQUFFbFIsQ0FBQyxFQUFFaVIsYUFBWSxDQUFDO1lBQ2xEO1VBQ0Y7UUFDRjtNQUNGO0lBQUM7RUFDSDtFQUNBbkMsVUFBVUEsQ0FBQ3VDLEVBQUUsRUFBRTlaLEtBQUssRUFBRTtJQUNwQixJQUFJOFosRUFBRSxJQUFJOVosS0FBSyxFQUFFO01BQ2Z4QixNQUFNLENBQUN1YixNQUFNLENBQUNELEVBQUUsQ0FBQzlaLEtBQUssRUFBRUEsS0FBSyxDQUFDO0lBQ2hDO0VBQ0Y7RUFDQWdhLGlCQUFpQkEsQ0FBQ2xSLEdBQUcsRUFBRTtJQUNyQixRQUFRQSxHQUFHO01BQ1Q7TUFDQSxLQUFLLElBQUksQ0FBQ3ZLLFdBQVcsQ0FBQ3JCLFNBQVM7UUFDN0IsSUFBSSxDQUFDK2MsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ25CLFNBQVM7UUFDNUM7TUFDRixLQUFLLElBQUksQ0FBQ3FCLFdBQVcsQ0FBQ3BCLEtBQUs7UUFDekIsSUFBSSxDQUFDOGMsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ2xCLEtBQUs7UUFDeEM7TUFDRixLQUFLLElBQUksQ0FBQ29CLFdBQVcsQ0FBQ2YsY0FBYztNQUNwQyxLQUFLLElBQUksQ0FBQ2UsV0FBVyxDQUFDZCx1QkFBdUI7UUFDM0MsSUFBSSxDQUFDd2MsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ1gsV0FBVztRQUM5QztNQUNGLEtBQUssSUFBSSxDQUFDYSxXQUFXLENBQUNiLFdBQVc7TUFDakMsS0FBSyxJQUFJLENBQUNhLFdBQVcsQ0FBQ1osb0JBQW9CO01BQzFDLEtBQUssSUFBSSxDQUFDWSxXQUFXLENBQUNYLFVBQVU7UUFDOUIsSUFBSSxDQUFDcWMsV0FBVyxHQUFHLElBQUksQ0FBQzViLFVBQVUsQ0FBQ1IsSUFBSTtRQUN2QztJQUFNO0VBRVo7RUFDTXNLLGFBQWFBLENBQUNXLEdBQUcsRUFBK0M7SUFBQSxJQUFBb1IsV0FBQSxHQUFBL1MsU0FBQTtNQUFBZ1QsT0FBQTtJQUFBLE9BQUExWCxpQkFBQTtNQUFBLElBQTdDMlgsV0FBVyxHQUFBRixXQUFBLENBQUE1UyxNQUFBLFFBQUE0UyxXQUFBLFFBQUEzUyxTQUFBLEdBQUEyUyxXQUFBLE1BQUcsS0FBSztNQUFBLElBQUVHLGVBQWUsR0FBQUgsV0FBQSxDQUFBNVMsTUFBQSxRQUFBNFMsV0FBQSxRQUFBM1MsU0FBQSxHQUFBMlMsV0FBQSxNQUFHLElBQUk7TUFDbEUsSUFBSUMsT0FBSSxDQUFDRyx3QkFBd0IsS0FBS3hSLEdBQUcsSUFBSXNSLFdBQVcsS0FBSyxLQUFLLEVBQUU7UUFDbEU7TUFDRjtNQUNBRCxPQUFJLENBQUNILGlCQUFpQixDQUFDbFIsR0FBRyxDQUFDO01BQzNCcVIsT0FBSSxDQUFDRyx3QkFBd0IsR0FBR3hSLEdBQUc7TUFDbkNxUixPQUFJLENBQUNJLGdCQUFnQixHQUFHelIsR0FBRztNQUMzQixJQUFNO1FBQ0owUixRQUFRO1FBQ1JDLFdBQVc7UUFDWEM7TUFDRixDQUFDLEdBQUdyZSxRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IsSUFBTXhELEtBQUssR0FBRztRQUNaMmEsV0FBVyxFQUFFUixPQUFJLENBQUMvVyxTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0MsS0FBSyxHQUFHLElBQUk7UUFDekQ4YSxXQUFXLEVBQUVULE9BQUksQ0FBQy9XLFNBQVMsQ0FBQ3ZELGdCQUFnQixDQUFDRyxLQUFLO1FBQ2xENmEsWUFBWSxFQUFFVixPQUFJLENBQUMvVyxTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0UsTUFBTSxHQUFHLElBQUk7UUFDM0QrYSxXQUFXLEVBQUVYLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQ3ZELGdCQUFnQixDQUFDaUosR0FBRztNQUNsRCxDQUFDO01BQ0QsSUFBSTBSLFFBQVEsRUFBRTtRQUNaTCxPQUFJLENBQUM1QyxVQUFVLENBQUNpRCxRQUFRLEVBQUV4YSxLQUFLLENBQUM7TUFDbEM7TUFDQSxJQUFJbWEsT0FBSSxDQUFDL1csU0FBUyxDQUFDeEMsdUJBQXVCLEVBQUU7UUFDMUMsSUFBSSxDQUFDLENBQUN1WixPQUFJLENBQUMvVyxTQUFTLENBQUMzRSxhQUFhLEVBQUU7VUFDbEMsS0FBSyxDQUFDO1FBQ1IsQ0FBQyxNQUFNO1VBQUEsSUFBQXNjLHFCQUFBO1VBQ0xOLFdBQVcsYUFBWEEsV0FBVyx3QkFBQU0scUJBQUEsR0FBWE4sV0FBVyxDQUFFTyxhQUFhLENBQUMsZUFBZSxDQUFDLGNBQUFELHFCQUFBLHVCQUEzQ0EscUJBQUEsQ0FBNkNuSCxZQUFZLENBQUMsTUFBTSxFQUFFdUcsT0FBSSxDQUFDL1csU0FBUyxDQUFDdkMsY0FBYyxDQUFDaUksR0FBRyxDQUFDLENBQUM7UUFDdkc7TUFDRjtNQUNBLElBQUlxUixPQUFJLENBQUMvVyxTQUFTLENBQUN6RCxZQUFZLEVBQUU7UUFBQSxJQUFBc2IscUJBQUE7UUFDL0JQLGFBQWEsYUFBYkEsYUFBYSx3QkFBQU8scUJBQUEsR0FBYlAsYUFBYSxDQUFFTSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsY0FBQUMscUJBQUEsdUJBQTlDQSxxQkFBQSxDQUFnRHJILFlBQVksQ0FBQyxNQUFNLEVBQUV1RyxPQUFJLENBQUMvVyxTQUFTLENBQUNoQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztNQUN2SDtNQUNBLElBQU04WixPQUFPLEdBQUdmLE9BQUksQ0FBQ3hULHNCQUFzQixHQUFHLFFBQVEsR0FBRyxNQUFNO01BQy9ELElBQUl3VCxPQUFJLENBQUN2UyxvQkFBb0IsRUFBRTtRQUM3QixJQUFJdVMsT0FBSSxDQUFDL1csU0FBUyxDQUFDaEUsUUFBUSxJQUFJK2EsT0FBSSxDQUFDL1csU0FBUyxDQUFDL0QsZUFBZSxFQUFFO1VBQzdEOGEsT0FBSSxDQUFDdlMsb0JBQW9CLENBQUN1VCxJQUFJLENBQUNoQixPQUFJLEVBQUVlLE9BQU8sRUFBRWYsT0FBSSxDQUFDN1csU0FBUyxFQUFFNlcsT0FBSSxDQUFDSSxnQkFBZ0IsRUFBRUosT0FBSSxDQUFDdFMsT0FBTyxFQUFFLEtBQUssRUFBRXNTLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQy9ELGVBQWUsRUFBRThhLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQ3pELFlBQVksRUFBRXdhLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzFELFlBQVksRUFBRTJhLGVBQWUsQ0FBQztRQUN0TjtRQUNBLElBQUlGLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzlELFdBQVcsSUFBSTZhLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzdELGtCQUFrQixFQUFFO1VBQ25FNGEsT0FBSSxDQUFDdlMsb0JBQW9CLENBQUN1VCxJQUFJLENBQUNoQixPQUFJLEVBQUVlLE9BQU8sRUFBRWYsT0FBSSxDQUFDN1csU0FBUyxFQUFFNlcsT0FBSSxDQUFDSSxnQkFBZ0IsRUFBRUosT0FBSSxDQUFDcFMsVUFBVSxFQUFFLFFBQVEsRUFBRW9TLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzdELGtCQUFrQixFQUFFNGEsT0FBSSxDQUFDL1csU0FBUyxDQUFDekQsWUFBWSxFQUFFd2EsT0FBSSxDQUFDL1csU0FBUyxDQUFDMUQsWUFBWSxFQUFFMmEsZUFBZSxDQUFDO1FBQy9OO1FBQ0EsSUFBSUYsT0FBSSxDQUFDL1csU0FBUyxDQUFDNUQsV0FBVyxJQUFJMmEsT0FBSSxDQUFDL1csU0FBUyxDQUFDM0Qsa0JBQWtCLEVBQUU7VUFDbkUwYSxPQUFJLENBQUN2UyxvQkFBb0IsQ0FBQ3VULElBQUksQ0FBQ2hCLE9BQUksRUFBRWUsT0FBTyxFQUFFZixPQUFJLENBQUM3VyxTQUFTLEVBQUU2VyxPQUFJLENBQUNJLGdCQUFnQixFQUFFSixPQUFJLENBQUNsUyxVQUFVLEVBQUUsUUFBUSxFQUFFa1MsT0FBSSxDQUFDL1csU0FBUyxDQUFDM0Qsa0JBQWtCLEVBQUUwYSxPQUFJLENBQUMvVyxTQUFTLENBQUN6RCxZQUFZLEVBQUV3YSxPQUFJLENBQUMvVyxTQUFTLENBQUMxRCxZQUFZLEVBQUUyYSxlQUFlLENBQUM7UUFDL047TUFDRjtNQUNBLElBQUl2UixHQUFHLEtBQUtxUixPQUFJLENBQUM1YixXQUFXLENBQUNqQixzQkFBc0IsSUFBSXdMLEdBQUcsS0FBS3FSLE9BQUksQ0FBQzViLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFO1FBQ3JHLElBQUk0YyxPQUFJLENBQUMvVyxTQUFTLENBQUMxRCxZQUFZLEVBQUU7VUFDL0J5YSxPQUFJLENBQUNpQixpQkFBaUIsQ0FBQ2YsZUFBZSxDQUFDOztVQUV2QztVQUNBLElBQUl2UixHQUFHLEtBQUtxUixPQUFJLENBQUM1YixXQUFXLENBQUNoQixxQkFBcUIsRUFBRTtZQUNsRHFNLFVBQVUsQ0FBQ3VRLE9BQUksQ0FBQ2tCLGVBQWUsRUFBRSxJQUFJLEVBQUVsQixPQUFJLENBQUM7VUFDOUM7UUFDRjtNQUNGO01BQ0EsSUFBSXJSLEdBQUcsS0FBS3FSLE9BQUksQ0FBQzViLFdBQVcsQ0FBQ2QsdUJBQXVCLEVBQUU7UUFDcEQsSUFBTTtVQUNKeVU7UUFDRixDQUFDLEdBQUc3VixRQUFRLENBQUNtSCxjQUFjLEVBQUU7UUFDN0IyVyxPQUFJLENBQUM1QyxVQUFVLENBQUNyRixLQUFLLEVBQUU7VUFDckJ6TyxPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJMFcsT0FBSSxDQUFDL1csU0FBUyxDQUFDMUQsWUFBWSxFQUFFO1VBQy9CeWEsT0FBSSxDQUFDaUIsaUJBQWlCLENBQUNmLGVBQWUsQ0FBQztRQUN6QztNQUNGO01BQ0EsSUFBSXZSLEdBQUcsS0FBS3FSLE9BQUksQ0FBQzViLFdBQVcsQ0FBQ1osb0JBQW9CLEVBQUU7UUFDakQsSUFBSXdjLE9BQUksQ0FBQy9XLFNBQVMsQ0FBQzFELFlBQVksRUFBRTtVQUMvQnlhLE9BQUksQ0FBQ2tCLGVBQWUsRUFBRTtRQUN4QjtNQUNGO01BQ0EsTUFBTWxCLE9BQUksQ0FBQzdPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUE7RUFDekI7O0VBRUE4UCxpQkFBaUJBLENBQUNmLGVBQWUsRUFBRTtJQUNqQyxJQUFNO01BQ0ppQixhQUFhO01BQ2JDO0lBQ0YsQ0FBQyxHQUFHbGYsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCK1gsWUFBWSxDQUFDM0csR0FBRyxHQUFHeUYsZUFBZTtJQUNsQyxJQUFNbUIsUUFBUSxHQUFHO01BQ2YsV0FBVyxFQUFFLEtBQUs7TUFDbEIsWUFBWSxFQUFFO0lBQ2hCLENBQUM7SUFDRCxJQUFJLENBQUNqRSxVQUFVLENBQUNnRSxZQUFZLEVBQUVDLFFBQVEsQ0FBQztJQUN2QyxJQUFJLENBQUNqRSxVQUFVLENBQUMrRCxhQUFhLEVBQUU7TUFDN0I3WCxPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7RUFDSjtFQUNBNFgsZUFBZUEsQ0FBQ0ksT0FBTyxFQUFFO0lBQ3ZCLElBQUl4UixNQUFNLEdBQUcsSUFBSTtJQUNqQixJQUFJd1IsT0FBTyxFQUFFO01BQ1h4UixNQUFNLEdBQUd3UixPQUFPO0lBQ2xCO0lBQ0EsSUFBTTtNQUNKdkosS0FBSztNQUNMb0osYUFBYTtNQUNiQztJQUNGLENBQUMsR0FBR2xmLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtJQUM3QnlHLE1BQU0sQ0FBQ3NOLFVBQVUsQ0FBQ3JGLEtBQUssRUFBRTtNQUN2QnpPLE9BQU8sRUFBRTtJQUNYLENBQUMsQ0FBQztJQUNGd0csTUFBTSxDQUFDc04sVUFBVSxDQUFDK0QsYUFBYSxFQUFFO01BQy9CN1gsT0FBTyxFQUFFO0lBQ1gsQ0FBQyxDQUFDO0lBQ0Y4WCxZQUFZLENBQUMzRyxHQUFHLEdBQUcsRUFBRTtFQUN2QjtFQUNNOEcsaUJBQWlCQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQUEsT0FBQWxaLGlCQUFBO01BQ3hCO01BQ0EsSUFBSSxDQUFDMEgsU0FBUyxDQUFDeVIsWUFBWSxFQUFFO1FBQzNCLE1BQU0sSUFBSXZXLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQztNQUM1RDtNQUNBLElBQU13VyxPQUFPLFNBQVMxUixTQUFTLENBQUN5UixZQUFZLENBQUNFLGdCQUFnQixFQUFFO01BQy9ELElBQUlDLE1BQU0sR0FBRyxFQUFFO01BQ2YsS0FBSyxJQUFNQyxNQUFNLElBQUlILE9BQU8sRUFBRTtRQUM1QixJQUFJRyxNQUFNLENBQUNDLElBQUksS0FBSyxZQUFZLEVBQUU7VUFDaEMsSUFBSTtZQUNGLElBQUlELE1BQU0sWUFBWUUsZUFBZSxFQUFFO2NBQ3JDLElBQUlGLE1BQU0sQ0FBQ0csZUFBZSxFQUFFO2dCQUFBLElBQUFDLGVBQUE7Z0JBQzFCLElBQU1DLEdBQUcsR0FBR0wsTUFBTSxDQUFDRyxlQUFlLEVBQUU7Z0JBQ3BDLElBQUlFLEdBQUcsYUFBSEEsR0FBRyxnQkFBQUQsZUFBQSxHQUFIQyxHQUFHLENBQUVDLFVBQVUsY0FBQUYsZUFBQSxlQUFmQSxlQUFBLENBQWlCck4sUUFBUSxDQUFDNE0sT0FBSSxDQUFDWSxzQkFBc0IsQ0FBQyxFQUFFO2tCQUFBLElBQUFDLGFBQUE7a0JBQzFELElBQU1DLGdCQUFnQixHQUFHLGFBQWE7a0JBQ3RDLElBQUlBLGdCQUFnQixDQUFDdlMsSUFBSSxFQUFBc1MsYUFBQSxHQUFDUixNQUFNLENBQUNVLEtBQUssY0FBQUYsYUFBQSx1QkFBWkEsYUFBQSxDQUFjblMsV0FBVyxFQUFFLENBQUMsRUFBRTtrQkFDeEQwUixNQUFNLENBQUNZLElBQUksQ0FBQ04sR0FBRyxDQUFDTyxRQUFRLENBQUM7Z0JBQzNCO2NBQ0Y7WUFDRjtVQUNGLENBQUMsQ0FBQyxPQUFPblUsQ0FBQyxFQUFFO1lBQ1Y7WUFDQTtZQUNBO1lBQ0EsSUFBSUEsQ0FBQyxZQUFZb1UsY0FBYyxFQUFFO2NBQUEsSUFBQUMsY0FBQTtjQUMvQixJQUFNQyxlQUFlLEdBQUcsVUFBVTtjQUNsQyxJQUFJLENBQUFELGNBQUEsR0FBQWQsTUFBTSxDQUFDVSxLQUFLLGNBQUFJLGNBQUEsZUFBWkEsY0FBQSxDQUFjeFYsTUFBTSxJQUFJeVYsZUFBZSxDQUFDN1MsSUFBSSxDQUFDOFIsTUFBTSxDQUFDVSxLQUFLLENBQUMsRUFBRTtnQkFDOURYLE1BQU0sQ0FBQ1ksSUFBSSxDQUFDWCxNQUFNLENBQUNZLFFBQVEsQ0FBQztjQUM5QjtZQUNGO1VBQ0Y7UUFDRjtNQUNGO01BQ0FqQixPQUFJLENBQUM3VSxPQUFPLGFBQUFrVyxNQUFBLENBQWFqQixNQUFNLHdCQUFBaUIsTUFBQSxDQUFxQmpCLE1BQU0sQ0FBQ3pVLE1BQU0sRUFBRztNQUNwRSxPQUFPeVUsTUFBTTtJQUFDO0VBQ2hCO0VBQ0FrQixrQkFBa0JBLENBQUEsRUFBRztJQUNuQixJQUFNQyxPQUFPLEdBQUc3Z0IsUUFBUSxDQUFDZ0ssZ0JBQWdCLENBQUNoSyxRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzJaLEdBQUcsQ0FBQztJQUN4RSxJQUFJQyxTQUFTLEdBQUcsS0FBSztJQUNyQixJQUFJRixPQUFPLEtBQUssSUFBSSxDQUFDRyxtQkFBbUIsRUFBRTtNQUN4QyxJQUFJLENBQUMvVyxlQUFlLEdBQUc0VyxPQUFPO01BQzlCLElBQUksQ0FBQ0csbUJBQW1CLEdBQUdILE9BQU87TUFDbENFLFNBQVMsR0FBRyxJQUFJO0lBQ2xCO0lBQ0EsT0FBTztNQUNMRixPQUFPO01BQ1BFO0lBQ0YsQ0FBQztFQUNIO0VBQ0FFLGVBQWVBLENBQUNsRixHQUFHLEVBQUU7SUFDbkJBLEdBQUcsQ0FBQ21GLFNBQVMsR0FBRyxFQUFFO0lBQ2xCbkYsR0FBRyxDQUFDb0YsZUFBZSxDQUFDLE9BQU8sQ0FBQztJQUM1QnBGLEdBQUcsQ0FBQ29GLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDNUIsSUFBSSxDQUFDakcsVUFBVSxDQUFDYSxHQUFHLEVBQUU7TUFDbkIzVSxPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7RUFDSjtFQUNNNEUsa0JBQWtCQSxDQUFBLEVBQUc7SUFBQSxJQUFBb1YsT0FBQTtJQUFBLE9BQUFoYixpQkFBQTtNQUN6QixJQUFJO1FBQ0YwYSxHQUFHO1FBQ0hqTCxLQUFLO1FBQ0xDLE1BQU07UUFDTkMsY0FBYztRQUNkb0ksUUFBUTtRQUNSa0QsU0FBUztRQUNUQyxZQUFZO1FBQ1psRCxXQUFXO1FBQ1htRCxvQkFBb0I7UUFDcEJDLFlBQVk7UUFDWi9WLEtBQUs7UUFDTEUsUUFBUTtRQUNSRSxRQUFRO1FBQ1I0VixhQUFhO1FBQ2JDLFNBQVM7UUFDVHJELGFBQWE7UUFDYlksYUFBYTtRQUNiMEMsU0FBUztRQUNUekMsWUFBWTtRQUNaMEMsWUFBWTtRQUNaQyxRQUFRO1FBQ1IzYSxnQkFBZ0I7UUFDaEI0YTtNQUNGLENBQUMsR0FBRzloQixRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IsSUFBSSxDQUFDMlosR0FBRyxFQUFFLE1BQU0sSUFBSTlYLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztNQUN6RCxJQUFJcVksU0FBUyxFQUFFQSxTQUFTLENBQUNVLE1BQU0sRUFBRTtNQUNqQyxJQUFJVCxZQUFZLEVBQUVBLFlBQVksQ0FBQ1MsTUFBTSxFQUFFO01BQ3ZDLElBQUlsTSxLQUFLLEVBQUVBLEtBQUssQ0FBQ2tNLE1BQU0sRUFBRTtNQUN6QixJQUFJak0sTUFBTSxFQUFFQSxNQUFNLENBQUNpTSxNQUFNLEVBQUU7TUFDM0IsSUFBSWhNLGNBQWMsRUFBRUEsY0FBYyxDQUFDZ00sTUFBTSxFQUFFO01BQzNDLElBQUk1RCxRQUFRLEVBQUVBLFFBQVEsQ0FBQzRELE1BQU0sRUFBRTtNQUMvQixJQUFJM0QsV0FBVyxFQUFFQSxXQUFXLENBQUMyRCxNQUFNLEVBQUU7TUFDckMsSUFBSVIsb0JBQW9CLEVBQUVBLG9CQUFvQixDQUFDUSxNQUFNLEVBQUU7TUFDdkQsSUFBSVAsWUFBWSxFQUFFQSxZQUFZLENBQUNPLE1BQU0sRUFBRTtNQUN2QztNQUNBLElBQUl0VyxLQUFLLElBQUksQ0FBQzJWLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQ2hFLFFBQVEsRUFBRXFlLE9BQUksQ0FBQ0gsZUFBZSxDQUFDeFYsS0FBSyxDQUFDO01BQ2xFLElBQUlFLFFBQVEsSUFBSSxDQUFDeVYsT0FBSSxDQUFDcmEsU0FBUyxDQUFDOUQsV0FBVyxFQUFFbWUsT0FBSSxDQUFDSCxlQUFlLENBQUN0VixRQUFRLENBQUM7TUFDM0UsSUFBSUUsUUFBUSxJQUFJLENBQUN1VixPQUFJLENBQUNyYSxTQUFTLENBQUM1RCxXQUFXLEVBQUVpZSxPQUFJLENBQUNILGVBQWUsQ0FBQ3BWLFFBQVEsQ0FBQztNQUMzRSxJQUFJNFYsYUFBYSxFQUFFQSxhQUFhLENBQUNNLE1BQU0sRUFBRTtNQUN6QztNQUNBLElBQUlMLFNBQVMsSUFBSSxDQUFDTixPQUFJLENBQUNyYSxTQUFTLENBQUN6RCxZQUFZLEVBQUU4ZCxPQUFJLENBQUNILGVBQWUsQ0FBQ1MsU0FBUyxDQUFDO01BQzlFLElBQUl6QyxhQUFhLEVBQUVBLGFBQWEsQ0FBQzhDLE1BQU0sRUFBRTtNQUN6QztNQUNBLElBQUlKLFNBQVMsSUFBSSxDQUFDUCxPQUFJLENBQUNyYSxTQUFTLENBQUMxRCxZQUFZLEVBQUUrZCxPQUFJLENBQUNILGVBQWUsQ0FBQ1UsU0FBUyxDQUFDO01BQzlFLElBQUlDLFlBQVksRUFBRUEsWUFBWSxDQUFDRyxNQUFNLEVBQUU7TUFDdkM7TUFDQSxJQUFJRixRQUFRLElBQUksQ0FBQ1QsT0FBSSxDQUFDcmEsU0FBUyxDQUFDbkMsMkJBQTJCLEVBQUV3YyxPQUFJLENBQUNILGVBQWUsQ0FBQ1ksUUFBUSxDQUFDO01BQzNGLElBQUkzYSxnQkFBZ0IsRUFBRUEsZ0JBQWdCLENBQUM2YSxNQUFNLEVBQUU7TUFDL0MsSUFBTXhjLGNBQWMsR0FBRzZiLE9BQUksQ0FBQzdMLG1CQUFtQixFQUFFO01BQ2pENkwsT0FBSSxDQUFDdkssa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUNuRSxRQUFRLENBQUNuTixjQUFjLENBQUM7TUFDNUQsSUFBSXljLFFBQVEsR0FBRztRQUNidmUsS0FBSyxFQUFFLE1BQU07UUFDYmlWLE1BQU0sRUFBRTtNQUNWLENBQUM7TUFDRDBJLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQzRGLEdBQUcsRUFBRWtCLFFBQVEsQ0FBQztNQUM5QixJQUFNQyxTQUFTLEdBQUc7UUFDaEJ4SixRQUFRLEVBQUUsVUFBVTtRQUNwQnJSLE9BQU8sRUFBRSxNQUFNO1FBQ2Y7UUFDQSxhQUFhLEVBQUUsUUFBUTtRQUN2QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCM0QsS0FBSyxFQUFFLE1BQU07UUFDYmlWLE1BQU0sRUFBRSxNQUFNO1FBQ2R3SixNQUFNLEVBQUUsUUFBUTtRQUNoQkMsUUFBUSxFQUFFO01BQ1osQ0FBQztNQUNEZCxTQUFTLEdBQUdoSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDekMrSSxTQUFTLENBQUM5SixZQUFZLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQztNQUNwRCxJQUFJOEosU0FBUyxFQUFFO1FBQ2IsT0FBT0EsU0FBUyxDQUFDZSxVQUFVLEVBQUU7VUFDM0JmLFNBQVMsQ0FBQ2dCLFdBQVcsQ0FBQ2hCLFNBQVMsQ0FBQ2lCLFNBQVMsQ0FBQztRQUM1QztRQUNBbEIsT0FBSSxDQUFDbEcsVUFBVSxDQUFDbUcsU0FBUyxFQUFFWSxTQUFTLENBQUM7TUFDdkM7TUFDQW5CLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ2xCLFNBQVMsQ0FBQztNQUMxQmpELFdBQVcsR0FBRy9GLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMzQzhGLFdBQVcsQ0FBQzdHLFlBQVksQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDO01BQ3hENkcsV0FBVyxDQUFDN0csWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7TUFDeEM2RyxXQUFXLENBQUM3RyxZQUFZLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDO01BQy9ENkosT0FBSSxDQUFDbEcsVUFBVSxDQUFDa0QsV0FBVyxFQUFFNkQsU0FBUyxDQUFDO01BQ3ZDLElBQUlPLFVBQVUsR0FBR3BCLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQ3ZDLGNBQWMsQ0FBQ0UsVUFBVSxHQUFHLElBQUk7TUFDaEUsSUFBSSxDQUFDLENBQUMwYyxPQUFJLENBQUNyYSxTQUFTLENBQUMzRSxhQUFhLEVBQUU7UUFDbENvZ0IsVUFBVSxHQUFHcEIsT0FBSSxDQUFDcmEsU0FBUyxDQUFDdkMsY0FBYyxDQUFDQyxVQUFVLEdBQUcsSUFBSTtNQUM5RDtNQUNBMlosV0FBVyxDQUFDOEMsU0FBUyxHQUFHLEVBQUUsR0FBRywyR0FBMkcsR0FBRyw2QkFBNkIsR0FBRywrREFBK0QsR0FBRyxrREFBa0QsR0FBRyxxQ0FBcUMsR0FBRyx3Q0FBd0MsR0FBRyxpQ0FBaUMsR0FBRywrQkFBK0IsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLEdBQUcsK0JBQStCLEdBQUcsb0RBQW9ELEdBQUcsa0JBQWtCLEdBQUdzQixVQUFVLEdBQUcsb0NBQW9DLEdBQUcsVUFBVTtNQUNsc0IxQixHQUFHLENBQUN5QixXQUFXLENBQUNuRSxXQUFXLENBQUM7TUFDNUJ2SSxLQUFLLEdBQUd3QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUM7TUFDdkN6QyxLQUFLLENBQUMwQixZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUM1QzFCLEtBQUssQ0FBQzBCLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO01BQ3RDMUIsS0FBSyxDQUFDMEIsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7TUFDbkMxQixLQUFLLENBQUMwQixZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQztNQUN6QyxJQUFJa0wsVUFBVSxHQUFHO1FBQ2ZoSyxRQUFRLEVBQUUsVUFBVTtRQUNwQmhWLEtBQUssRUFBRTtNQUNULENBQUM7TUFDRCxJQUFNaWYsU0FBUyxHQUFHLFNBQVMsR0FBR25kLGNBQWMsR0FBRyxNQUFNO01BQ3JELElBQU1vZCxTQUFTLEdBQUcsaUJBQWlCO01BQ25DLElBQU1DLGtCQUFrQixHQUFHRCxTQUFTLEdBQUcsR0FBRyxHQUFHRCxTQUFTO01BQ3RELElBQUl0QixPQUFJLENBQUN2SyxrQkFBa0IsRUFBRTtRQUMzQixJQUFJdUssT0FBSSxDQUFDNUwsZUFBZSxFQUFFLEVBQUU7VUFDMUJpTixVQUFVLEdBQUFwYSxhQUFBLENBQUFBLGFBQUEsS0FDTG9hLFVBQVU7WUFDYixtQkFBbUIsRUFBRUcsa0JBQWtCO1lBQ3ZDLGdCQUFnQixFQUFFQSxrQkFBa0I7WUFDcEMsY0FBYyxFQUFFQSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFQSxrQkFBa0I7WUFDbkNDLFNBQVMsRUFBRUQ7VUFBa0IsRUFDOUI7UUFDSCxDQUFDLE1BQU07VUFDTEgsVUFBVSxHQUFBcGEsYUFBQSxDQUFBQSxhQUFBLEtBQ0xvYSxVQUFVO1lBQ2IsbUJBQW1CLEVBQUVDLFNBQVM7WUFDOUIsZ0JBQWdCLEVBQUVBLFNBQVM7WUFDM0IsY0FBYyxFQUFFQSxTQUFTO1lBQ3pCLGVBQWUsRUFBRUEsU0FBUztZQUMxQkcsU0FBUyxFQUFFSDtVQUFTLEVBQ3JCO1FBQ0g7TUFDRixDQUFDLE1BQU07UUFDTCxJQUFJdEIsT0FBSSxDQUFDNUwsZUFBZSxFQUFFLEVBQUU7VUFDMUJpTixVQUFVLEdBQUFwYSxhQUFBLENBQUFBLGFBQUEsS0FDTG9hLFVBQVU7WUFDYixtQkFBbUIsRUFBRUUsU0FBUztZQUM5QixnQkFBZ0IsRUFBRUEsU0FBUztZQUMzQixjQUFjLEVBQUVBLFNBQVM7WUFDekIsZUFBZSxFQUFFQSxTQUFTO1lBQzFCRSxTQUFTLEVBQUVGO1VBQVMsRUFDckI7UUFDSDtNQUNGO01BQ0F2QixPQUFJLENBQUNsRyxVQUFVLENBQUNyRixLQUFLLEVBQUU0TSxVQUFVLENBQUM7TUFDbENwQixTQUFTLENBQUNrQixXQUFXLENBQUMxTSxLQUFLLENBQUM7TUFDNUJ5TCxZQUFZLEdBQUdqSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDNUNnSixZQUFZLENBQUMvSixZQUFZLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQztNQUMxRDZKLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ29HLFlBQVksRUFBRVcsU0FBUyxDQUFDO01BQ3hDbkIsR0FBRyxDQUFDeUIsV0FBVyxDQUFDakIsWUFBWSxDQUFDO01BQzdCbkQsUUFBUSxHQUFHOUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3hDNkYsUUFBUSxDQUFDNUcsWUFBWSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7TUFDbEQ0RyxRQUFRLENBQUM1RyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztNQUNyQzRHLFFBQVEsQ0FBQzVHLFlBQVksQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUM7TUFDNUQ2SixPQUFJLENBQUNsRyxVQUFVLENBQUNpRCxRQUFRLEVBQUU7UUFDeEIxYSxLQUFLLEVBQUUsTUFBTTtRQUNieWUsTUFBTSxFQUFFLFFBQVE7UUFDaEJ6SixRQUFRLEVBQUU7TUFDWixDQUFDLENBQUM7TUFDRjZJLFlBQVksQ0FBQ2lCLFdBQVcsQ0FBQ3BFLFFBQVEsQ0FBQztNQUNsQ3JJLE1BQU0sR0FBR3VDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUN6Q3hDLE1BQU0sQ0FBQ3lCLFlBQVksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDO01BQzlDLElBQU11TCxXQUFXLEdBQUc7UUFDbEIxYixPQUFPLEVBQUVnYSxPQUFJLENBQUNyYSxTQUFTLENBQUMxRSxpQkFBaUIsR0FBRytlLE9BQUksQ0FBQ3ZLLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsTUFBTTtRQUNqR3BULEtBQUssRUFBRSxLQUFLO1FBQ1pnVixRQUFRLEVBQUUsVUFBVTtRQUNwQnNLLElBQUksRUFBRSxLQUFLO1FBQ1hDLEdBQUcsRUFBRSxNQUFNO1FBQ1hDLE1BQU0sRUFBRTtNQUNWLENBQUM7TUFDRDdCLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ3BGLE1BQU0sRUFBRWdOLFdBQVcsQ0FBQztNQUNwQ2hDLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ3pNLE1BQU0sQ0FBQztNQUN2QkMsY0FBYyxHQUFHc0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO01BQ2pEdkMsY0FBYyxDQUFDd0IsWUFBWSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztNQUM5RDZKLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ25GLGNBQWMsRUFBRTtRQUM5QjNPLE9BQU8sRUFBRWdhLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQzFFLGlCQUFpQixHQUFHK2UsT0FBSSxDQUFDdkssa0JBQWtCLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxNQUFNO1FBQ2pHNkIsTUFBTSxFQUFFLEtBQUs7UUFDYkQsUUFBUSxFQUFFLFVBQVU7UUFDcEJ5SyxLQUFLLEVBQUUsS0FBSztRQUNaRixHQUFHLEVBQUUsTUFBTTtRQUNYQyxNQUFNLEVBQUU7TUFDVixDQUFDLENBQUM7TUFDRm5DLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ3hNLGNBQWMsQ0FBQztNQUMvQndMLG9CQUFvQixHQUFHbEosUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3BEaUosb0JBQW9CLENBQUNoSyxZQUFZLENBQUMsZUFBZSxFQUFFLHNCQUFzQixDQUFDO01BQzFFNkosT0FBSSxDQUFDbEcsVUFBVSxDQUFDcUcsb0JBQW9CLEVBQUU7UUFDcEM5SSxRQUFRLEVBQUUsVUFBVTtRQUNwQjBLLE1BQU0sRUFBRSxJQUFJO1FBQ1pELEtBQUssRUFBRTtNQUNULENBQUMsQ0FBQztNQUNGM0Isb0JBQW9CLENBQUNMLFNBQVMsR0FBRyxFQUFFLEdBQUcsc1BBQXNQLEdBQUcsc0RBQXNELEdBQUcsbUxBQW1MLEdBQUcsME5BQTBOLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLDZPQUE2TyxHQUFHLGdQQUFnUCxHQUFHLGFBQWEsR0FBRyxzREFBc0QsR0FBRywrUEFBK1AsR0FBRyxrUUFBa1EsR0FBRyxhQUFhLEdBQUcsc0RBQXNELEdBQUcsK1BBQStQLEdBQUcsa1FBQWtRLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLCtQQUErUCxHQUFHLGtRQUFrUSxHQUFHLGFBQWEsR0FBRyxRQUFRO01BQy9oR0osR0FBRyxDQUFDeUIsV0FBVyxDQUFDaEIsb0JBQW9CLENBQUM7TUFDckNDLFlBQVksR0FBR25KLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM1Q2tKLFlBQVksQ0FBQ2pLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO01BQzFELElBQU02TCxpQkFBaUIsR0FBQS9hLGFBQUEsQ0FBQUEsYUFBQSxLQUNsQjRaLFNBQVM7UUFDWixnQkFBZ0IsRUFBRTtNQUFRLEVBQzNCO01BQ0RiLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ3NHLFlBQVksRUFBRTRCLGlCQUFpQixDQUFDO01BQ2hEdEMsR0FBRyxDQUFDeUIsV0FBVyxDQUFDZixZQUFZLENBQUM7O01BRTdCO01BQ0E7TUFDQSxJQUFJLENBQUMvVixLQUFLLEVBQUU7UUFDVkEsS0FBSyxHQUFHNE0sUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3JDN00sS0FBSyxDQUFDOEwsWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7TUFDOUM7TUFDQWlLLFlBQVksQ0FBQ2UsV0FBVyxDQUFDOVcsS0FBSyxDQUFDO01BQy9CLElBQUksQ0FBQ0UsUUFBUSxFQUFFO1FBQ2JBLFFBQVEsR0FBRzBNLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN4QzNNLFFBQVEsQ0FBQzRMLFlBQVksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO01BQ3BEO01BQ0FpSyxZQUFZLENBQUNlLFdBQVcsQ0FBQzVXLFFBQVEsQ0FBQztNQUNsQyxJQUFJLENBQUNFLFFBQVEsRUFBRTtRQUNiQSxRQUFRLEdBQUd3TSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDeEN6TSxRQUFRLENBQUMwTCxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztNQUNwRDtNQUNBaUssWUFBWSxDQUFDZSxXQUFXLENBQUMxVyxRQUFRLENBQUM7TUFDbEM0VixhQUFhLEdBQUdwSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDN0NtSixhQUFhLENBQUNsSyxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztNQUM1RCxJQUFNOEwsa0JBQWtCLEdBQUFoYixhQUFBLENBQUFBLGFBQUEsS0FDbkI0WixTQUFTO1FBQ1osZ0JBQWdCLEVBQUU7TUFBUSxFQUMzQjtNQUNEYixPQUFJLENBQUNsRyxVQUFVLENBQUN1RyxhQUFhLEVBQUU0QixrQkFBa0IsQ0FBQztNQUNsRHZDLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ2QsYUFBYSxDQUFDO01BQzlCLElBQUlMLE9BQUksQ0FBQ3JhLFNBQVMsQ0FBQ3pELFlBQVksRUFBRTtRQUMvQixJQUFJOGQsT0FBSSxDQUFDOVcsc0JBQXNCLElBQUk4VyxPQUFJLENBQUNyYSxTQUFTLENBQUNqQyxrQkFBa0IsRUFBRTtVQUNwRSxJQUFJLENBQUM0YyxTQUFTLEVBQUU7WUFDZEEsU0FBUyxHQUFHckosUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQ3pDb0osU0FBUyxDQUFDbkssWUFBWSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUM7WUFDcEQ2SixPQUFJLENBQUNsRyxVQUFVLENBQUN3RyxTQUFTLEVBQUU7Y0FDekJ0YSxPQUFPLEVBQUUsTUFBTTtjQUNma2MsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDO1VBQ0o7VUFDQSxJQUFJLENBQUNqRixhQUFhLEVBQUU7WUFDbEJBLGFBQWEsR0FBR2hHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUM3QytGLGFBQWEsQ0FBQzlHLFlBQVksQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO1lBQzVELElBQUlnTSxtQkFBbUIsS0FBSztZQUM1QkEsbUJBQW1CLHFHQUFxRztZQUN4SEEsbUJBQW1CLDRHQUE0RztZQUMvSEEsbUJBQW1CLFlBQVk7WUFDL0JsRixhQUFhLENBQUM2QyxTQUFTLEdBQUdxQyxtQkFBbUI7WUFDN0M3QixTQUFTLENBQUNhLFdBQVcsQ0FBQ2xFLGFBQWEsQ0FBQztVQUN0QztVQUNBb0QsYUFBYSxDQUFDYyxXQUFXLENBQUNiLFNBQVMsQ0FBQztVQUNwQyxJQUFNOVQsTUFBTSxHQUFHd1QsT0FBSTtVQUNuQixJQUFNb0Msc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBQSxFQUFlO1lBQ3pDLElBQUk1VixNQUFNLENBQUN0RCxzQkFBc0IsRUFBRTtjQUNqQ3RLLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDa1gsYUFBYSxDQUFDOUcsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7Y0FDMUUzSixNQUFNLENBQUNzTixVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQ2tYLGFBQWEsRUFBRTtnQkFDekRqWCxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUM7WUFDSixDQUFDLE1BQU07Y0FDTHBILFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDa1gsYUFBYSxDQUFDOUcsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7Y0FDMUUzSixNQUFNLENBQUNzTixVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBPLEtBQUssRUFBRTtnQkFDakR6TyxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUM7Y0FDRndHLE1BQU0sQ0FBQ3NOLFVBQVUsQ0FBQ2xiLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRSxDQUFDa1gsYUFBYSxFQUFFO2dCQUN6RGpYLE9BQU8sRUFBRTtjQUNYLENBQUMsQ0FBQztZQUNKO1VBQ0YsQ0FBQztVQUNEaVgsYUFBYSxDQUFDL1AsZ0JBQWdCLENBQUMsT0FBTyxFQUFFa1Ysc0JBQXNCLENBQUM7UUFDakU7TUFDRjtNQUNBLElBQUlwQyxPQUFJLENBQUNyYSxTQUFTLENBQUMxRCxZQUFZLEVBQUU7UUFDL0I0YixhQUFhLEdBQUc1RyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDN0MyRyxhQUFhLENBQUMxSCxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztRQUM1RCxJQUFNa00sa0JBQWtCLEdBQUFwYixhQUFBLENBQUFBLGFBQUEsS0FDbkI0WixTQUFTO1VBQ1osZ0JBQWdCLEVBQUUsUUFBUTtVQUMxQjdhLE9BQU8sRUFBRSxNQUFNO1VBQ2Ysa0JBQWtCLEVBQUU7UUFBVyxFQUNoQztRQUNEZ2EsT0FBSSxDQUFDbEcsVUFBVSxDQUFDK0QsYUFBYSxFQUFFd0Usa0JBQWtCLENBQUM7UUFDbEQzQyxHQUFHLENBQUN5QixXQUFXLENBQUN0RCxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDMEMsU0FBUyxFQUFFO1VBQ2RBLFNBQVMsR0FBR3RKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUN6Q3FKLFNBQVMsQ0FBQ3BLLFlBQVksQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDO1FBQ3REO1FBQ0E2SixPQUFJLENBQUNsRyxVQUFVLENBQUN5RyxTQUFTLEVBQUF0WixhQUFBLENBQUFBLGFBQUEsS0FDcEI0WixTQUFTO1VBQ1osZ0JBQWdCLEVBQUUsUUFBUTtVQUMxQnhlLEtBQUssRUFBRSxFQUFFO1VBQ1RpVixNQUFNLEVBQUUsRUFBRTtVQUNWLFdBQVcsRUFBRSxLQUFLO1VBQ2xCLFlBQVksRUFBRTtRQUFLLEdBQ25CO1FBQ0Z1RyxhQUFhLENBQUNzRCxXQUFXLENBQUNaLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUN6QyxZQUFZLEVBQUU7VUFDakJBLFlBQVksR0FBRzdHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUM1QzRHLFlBQVksQ0FBQzNILFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1VBQzFEb0ssU0FBUyxDQUFDWSxXQUFXLENBQUNyRCxZQUFZLENBQUM7UUFDckM7TUFDRjtNQUNBLElBQUlrQyxPQUFJLENBQUNyYSxTQUFTLENBQUNuQywyQkFBMkIsRUFBRTtRQUM5Q2dkLFlBQVksR0FBR3ZKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q3NKLFlBQVksQ0FBQ3JLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1FBQzFELElBQU1tTSxpQkFBaUIsR0FBQXJiLGFBQUEsQ0FBQUEsYUFBQSxLQUNsQjRaLFNBQVM7VUFDWixhQUFhLEVBQUUsRUFBRTtVQUNqQixpQkFBaUIsRUFBRSxFQUFFO1VBQ3JCeGUsS0FBSyxFQUFFLEVBQUU7VUFDVDBlLFFBQVEsRUFBRSxFQUFFO1VBQ1osZ0JBQWdCLEVBQUU7UUFBZ0IsRUFDbkM7UUFDRGYsT0FBSSxDQUFDbEcsVUFBVSxDQUFDMEcsWUFBWSxFQUFFOEIsaUJBQWlCLENBQUM7UUFDaEQ1QyxHQUFHLENBQUN5QixXQUFXLENBQUNYLFlBQVksQ0FBQztRQUM3QixJQUFJLENBQUNDLFFBQVEsRUFBRTtVQUNiQSxRQUFRLEdBQUd4SixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7VUFDeEN1SixRQUFRLENBQUN0SyxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztVQUNsRCxJQUFJb00sVUFBVSxLQUFLO1VBQ25CQSxVQUFVLHdFQUF3RTtVQUNsRkEsVUFBVSx1RUFBdUU7VUFDakZBLFVBQVUsOEJBQThCO1VBQ3hDQSxVQUFVLDRFQUE0RTtVQUN0RkEsVUFBVSw0Q0FBNEM7VUFDdERBLFVBQVUsZ0JBQWdCO1VBQzFCQSxVQUFVLDJFQUEyRTtVQUNyRkEsVUFBVSxZQUFZO1VBQ3RCOUIsUUFBUSxDQUFDWCxTQUFTLEdBQUd5QyxVQUFVO1FBQ2pDO1FBQ0F2QyxPQUFJLENBQUNsRyxVQUFVLENBQUMyRyxRQUFRLEVBQUU7VUFDeEJNLFFBQVEsRUFBRTtRQUNaLENBQUMsQ0FBQztRQUNGUCxZQUFZLENBQUNXLFdBQVcsQ0FBQ1YsUUFBUSxDQUFDO1FBQ2xDLElBQU0rQixjQUFjLEdBQUcvQixRQUFRLENBQUNnQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBTWpXLE9BQU0sR0FBR3dULE9BQUk7UUFDbkIsSUFBTTBDLGlCQUFpQjtVQUFBLElBQUFDLE1BQUEsR0FBQTNkLGlCQUFBLENBQUcsV0FBZ0I0ZCxLQUFLLEVBQUU7WUFDL0NwVyxPQUFNLENBQUN0RCxzQkFBc0IsR0FBRzBaLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxPQUFPO1lBQ3BELE1BQU10VyxPQUFNLENBQUNoQixVQUFVLENBQUNnQixPQUFNLENBQUMzRyxTQUFTLEVBQUUyRyxPQUFNLENBQUN2QyxXQUFXLEVBQUV1QyxPQUFNLENBQUN0QyxXQUFXLEVBQUVzQyxPQUFNLENBQUNyQyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7VUFDdEgsQ0FBQztVQUFBLGdCQUhLdVksaUJBQWlCQSxDQUFBSyxHQUFBO1lBQUEsT0FBQUosTUFBQSxDQUFBalYsS0FBQSxPQUFBaEUsU0FBQTtVQUFBO1FBQUEsR0FHdEI7UUFDRDhZLGNBQWMsQ0FBQ3RWLGdCQUFnQixDQUFDLE9BQU8sRUFBRXdWLGlCQUFpQixFQUFFO1VBQzFETSxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7TUFDSjtNQUNBbGQsZ0JBQWdCLEdBQUdtUixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDaERwUixnQkFBZ0IsQ0FBQ3FRLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUM7TUFDbEUsSUFBTThNLHFCQUFxQixHQUFBaGMsYUFBQSxDQUFBQSxhQUFBLEtBQ3RCNFosU0FBUztRQUNaLGdCQUFnQixFQUFFLFFBQVE7UUFDMUI3YSxPQUFPLEVBQUUsTUFBTTtRQUNmLGtCQUFrQixFQUFFO01BQVcsRUFDaEM7TUFDRGdhLE9BQUksQ0FBQ2xHLFVBQVUsQ0FBQ2hVLGdCQUFnQixFQUFFbWQscUJBQXFCLENBQUM7TUFDeER2RCxHQUFHLENBQUN5QixXQUFXLENBQUNyYixnQkFBZ0IsQ0FBQztNQUNqQyxJQUFJLENBQUM0YSxZQUFZLEVBQUU7UUFDakJBLFlBQVksR0FBR3pKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q3dKLFlBQVksQ0FBQ3ZLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1FBQzFEdUssWUFBWSxDQUFDdkssWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7UUFDL0N1SyxZQUFZLENBQUNaLFNBQVMsR0FBRyxFQUFFLEdBQUcsd09BQXdPLEdBQUcsc0RBQXNELEdBQUcsbUxBQW1MLEdBQUcsME5BQTBOLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLDZPQUE2TyxHQUFHLGdQQUFnUCxHQUFHLGFBQWEsR0FBRyxzREFBc0QsR0FBRywrUEFBK1AsR0FBRyxrUUFBa1EsR0FBRyxhQUFhLEdBQUcsc0RBQXNELEdBQUcsK1BBQStQLEdBQUcsa1FBQWtRLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLCtQQUErUCxHQUFHLGtRQUFrUSxHQUFHLGFBQWEsR0FBRyxRQUFRO1FBQ3pnRyxJQUFJRSxPQUFJLENBQUNyYSxTQUFTLENBQUN4RCxtQkFBbUIsS0FBSyxFQUFFLElBQUk2ZCxPQUFJLENBQUNyYSxTQUFTLENBQUN4RCxtQkFBbUIsRUFBRTtVQUNuRnVlLFlBQVksQ0FBQ1osU0FBUyxJQUFJRSxPQUFJLENBQUNyYSxTQUFTLENBQUN4RCxtQkFBbUI7UUFDOUQ7TUFDRjtNQUNBNmQsT0FBSSxDQUFDbEcsVUFBVSxDQUFDNEcsWUFBWSxFQUFBelosYUFBQSxDQUFBQSxhQUFBLEtBQ3ZCNFosU0FBUztRQUNaLGdCQUFnQixFQUFFO01BQVEsR0FDMUI7TUFDRi9hLGdCQUFnQixDQUFDcWIsV0FBVyxDQUFDVCxZQUFZLENBQUM7O01BRTFDO01BQ0EsTUFBTVYsT0FBSSxDQUFDa0QsV0FBVyxFQUFFOztNQUV4QjtNQUNBbEQsT0FBSSxDQUFDbEcsVUFBVSxDQUFDNEYsR0FBRyxFQUFFO1FBQ25CMVosT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO01BQ0ZnYSxPQUFJLENBQUNtRCxLQUFLLEdBQUd6RCxHQUFHO01BQ2hCTSxPQUFJLENBQUNvRCxRQUFRLEdBQUcxTyxNQUFNO01BQ3RCc0wsT0FBSSxDQUFDcUQsZ0JBQWdCLEdBQUcxTyxjQUFjO01BQ3RDcUwsT0FBSSxDQUFDc0QsT0FBTyxHQUFHN08sS0FBSztNQUNwQnVMLE9BQUksQ0FBQ3VELFdBQVcsR0FBR3RELFNBQVM7TUFDNUJELE9BQUksQ0FBQ3dELFVBQVUsR0FBR3pHLFFBQVE7TUFDMUJpRCxPQUFJLENBQUN5RCxjQUFjLEdBQUd2RCxZQUFZO01BQ2xDRixPQUFJLENBQUMwRCxhQUFhLEdBQUcxRyxXQUFXO01BQ2hDZ0QsT0FBSSxDQUFDMkQsc0JBQXNCLEdBQUd4RCxvQkFBb0I7TUFDbERILE9BQUksQ0FBQzRELGNBQWMsR0FBR3hELFlBQVk7TUFDbENKLE9BQUksQ0FBQzVWLE9BQU8sR0FBR0MsS0FBSztNQUNwQjJWLE9BQUksQ0FBQzFWLFVBQVUsR0FBR0MsUUFBUTtNQUMxQnlWLE9BQUksQ0FBQ3hWLFVBQVUsR0FBR0MsUUFBUTtNQUMxQnVWLE9BQUksQ0FBQzZELGVBQWUsR0FBR3hELGFBQWE7TUFDcENMLE9BQUksQ0FBQzhELFdBQVcsR0FBR3hELFNBQVM7TUFDNUJOLE9BQUksQ0FBQytELGVBQWUsR0FBRzlHLGFBQWE7TUFDcEMrQyxPQUFJLENBQUNnRSxlQUFlLEdBQUduRyxhQUFhO01BQ3BDbUMsT0FBSSxDQUFDaUUsV0FBVyxHQUFHMUQsU0FBUztNQUM1QlAsT0FBSSxDQUFDa0UsY0FBYyxHQUFHcEcsWUFBWTtNQUNsQ2tDLE9BQUksQ0FBQ21FLGNBQWMsR0FBRzNELFlBQVk7TUFDbENSLE9BQUksQ0FBQ29FLFVBQVUsR0FBRzNELFFBQVE7TUFDMUIsT0FBTztRQUNMZixHQUFHO1FBQ0hoTCxNQUFNO1FBQ05DLGNBQWM7UUFDZEYsS0FBSztRQUNMd0wsU0FBUztRQUNUbEQsUUFBUTtRQUNSbUQsWUFBWTtRQUNabEQsV0FBVztRQUNYbUQsb0JBQW9CO1FBQ3BCQyxZQUFZO1FBQ1ovVixLQUFLO1FBQ0xFLFFBQVE7UUFDUkUsUUFBUTtRQUNSNFYsYUFBYTtRQUNiQyxTQUFTO1FBQ1RyRCxhQUFhO1FBQ2JZLGFBQWE7UUFDYjBDLFNBQVM7UUFDVHpDLFlBQVk7UUFDWjBDLFlBQVk7UUFDWkM7TUFDRixDQUFDO0lBQUM7RUFDSjtFQUNBNUcsbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsSUFBSSxDQUFDQyxVQUFVLENBQUNsYixRQUFRLENBQUNtSCxjQUFjLEVBQUUsQ0FBQzBPLEtBQUssRUFBRTtNQUMvQ3pPLE9BQU8sRUFBRTtJQUNYLENBQUMsQ0FBQztJQUNGLElBQU07TUFDSmlYO0lBQ0YsQ0FBQyxHQUFHcmUsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCLElBQUlrWCxhQUFhLEVBQUU7TUFDakJBLGFBQWEsQ0FBQzlHLFlBQVksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO01BQ2pELElBQUksQ0FBQzJELFVBQVUsQ0FBQ21ELGFBQWEsRUFBRTtRQUM3QmpYLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztJQUNKO0VBQ0Y7RUFDQXFlLHdCQUF3QkEsQ0FBQSxFQUFHO0lBQ3pCLElBQU07TUFDSnBIO0lBQ0YsQ0FBQyxHQUFHcmUsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO0lBQzdCLE9BQU9rWCxhQUFhLEdBQUdBLGFBQWEsQ0FBQ3FILFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxNQUFNLEdBQUcsS0FBSztFQUNwRjtFQUNNN0ksWUFBWUEsQ0FBQ0QsVUFBVSxFQUFFO0lBQUEsSUFBQStJLE9BQUE7SUFBQSxPQUFBdmYsaUJBQUE7TUFDN0I7TUFDQXVmLE9BQUksQ0FBQ2xTLGlCQUFpQixHQUFHLElBQUk7TUFDN0JrUyxPQUFJLENBQUNqUyxrQkFBa0IsR0FBRyxHQUFHO01BQzdCaVMsT0FBSSxDQUFDelQsZ0JBQWdCLEdBQUcsS0FBSztNQUM3QixJQUFNO1FBQ0oyRCxLQUFLO1FBQ0xDLE1BQU07UUFDTkM7TUFDRixDQUFDLEdBQUcvVixRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IsSUFBSXVZLE1BQU0sU0FBU2lHLE9BQUksQ0FBQ3RHLGlCQUFpQixFQUFFO01BQzNDOztNQUVBc0csT0FBSSxDQUFDL0Usa0JBQWtCLEVBQUU7TUFDekIsSUFBSWdGLGVBQWUsRUFBRUMsZ0JBQWdCO01BQ3JDLElBQUlGLE9BQUksQ0FBQzVlLFNBQVMsQ0FBQ3BCLHdCQUF3QixLQUFLLGFBQWEsRUFBRTtRQUM3RDtRQUNBO1FBQ0FpZ0IsZUFBZSxHQUFHO1VBQ2hCRSxLQUFLLEVBQUUsSUFBSTtVQUNYMU8sR0FBRyxFQUFFO1FBQ1AsQ0FBQztRQUNEeU8sZ0JBQWdCLEdBQUc7VUFDakJDLEtBQUssRUFBRSxJQUFJO1VBQ1gxTyxHQUFHLEVBQUU7UUFDUCxDQUFDO01BQ0gsQ0FBQyxNQUFNO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBd08sZUFBZSxHQUFHO1VBQ2hCRSxLQUFLLEVBQUU7UUFDVCxDQUFDO1FBQ0RELGdCQUFnQixHQUFHO1VBQ2pCQyxLQUFLLEVBQUU7UUFDVCxDQUFDO01BQ0g7TUFDQSxJQUFNQyxXQUFXLEdBQUc7UUFDbEJDLEtBQUssRUFBRSxLQUFLO1FBQ1puUSxLQUFLLEVBQUU7VUFDTG9RLElBQUksRUFBRTtZQUNKSCxLQUFLLEVBQUU7VUFDVCxDQUFDO1VBQ0Q3RixVQUFVLEVBQUU7WUFDVjZGLEtBQUssRUFBRUgsT0FBSSxDQUFDekY7VUFDZCxDQUFDO1VBQ0RnRyxTQUFTLEVBQUU7WUFDVEosS0FBSyxFQUFFO1VBQ1QsQ0FBQztVQUNESyxnQkFBZ0IsRUFBRTtZQUNoQkwsS0FBSyxFQUFFO1VBQ1QsQ0FBQztVQUNEdkYsUUFBUSxFQUFFYixNQUFNLENBQUN6VSxNQUFNLEdBQUc7WUFDeEI2YSxLQUFLLEVBQUVwRyxNQUFNLENBQUNBLE1BQU0sQ0FBQ3pVLE1BQU0sR0FBRyxDQUFDO1VBQ2pDLENBQUMsR0FBRyxJQUFJO1VBQ1J4SCxLQUFLLEVBQUVtaUIsZUFBZTtVQUN0QmxOLE1BQU0sRUFBRW1OO1FBQ1Y7TUFDRixDQUFDOztNQUVEO01BQ0E7TUFDQSxJQUFJbkcsTUFBTSxDQUFDelUsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN2QjBhLE9BQUksQ0FBQ2xiLE9BQU8sQ0FBQyxtRUFBbUUsQ0FBQztRQUNqRmtiLE9BQUksQ0FBQ2xiLE9BQU8sa0JBQUFrVyxNQUFBLENBQWtCeUYsSUFBSSxDQUFDQyxTQUFTLENBQUNOLFdBQVcsQ0FBQyxFQUFHO1FBQzVESixPQUFJLENBQUM3SSxRQUFRLFNBQVNoUCxTQUFTLENBQUN5UixZQUFZLENBQUMrRyxZQUFZLENBQUNQLFdBQVcsQ0FBQztRQUN0RUosT0FBSSxDQUFDcEksVUFBVSxFQUFFO1FBQ2pCbUMsTUFBTSxTQUFTaUcsT0FBSSxDQUFDdEcsaUJBQWlCLEVBQUU7UUFDdkMwRyxXQUFXLENBQUNsUSxLQUFLLENBQUMwSyxRQUFRLEdBQUdiLE1BQU0sQ0FBQ3pVLE1BQU0sR0FBRztVQUMzQzZhLEtBQUssRUFBRXBHLE1BQU0sQ0FBQ0EsTUFBTSxDQUFDelUsTUFBTSxHQUFHLENBQUM7UUFDakMsQ0FBQyxHQUFHLElBQUk7TUFDVjs7TUFFQTtNQUNBO01BQ0EsSUFBSXlVLE1BQU0sQ0FBQ3pVLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkIwYSxPQUFJLENBQUNsYixPQUFPLENBQUMsaURBQWlELENBQUM7UUFDL0RzYixXQUFXLENBQUNsUSxLQUFLLENBQUNwUyxLQUFLLEdBQUc7VUFDeEJxaUIsS0FBSyxFQUFFO1FBQ1QsQ0FBQztRQUNEQyxXQUFXLENBQUNsUSxLQUFLLENBQUM2QyxNQUFNLEdBQUc7VUFDekJvTixLQUFLLEVBQUU7UUFDVCxDQUFDO01BQ0g7TUFDQSxJQUFJO1FBQ0Y7UUFDQTs7UUFFQSxJQUFNUyxNQUFNLFNBQVN6WSxTQUFTLENBQUN5UixZQUFZLENBQUMrRyxZQUFZLENBQUNQLFdBQVcsQ0FBQztRQUNyRUosT0FBSSxDQUFDbGIsT0FBTyxrQkFBQWtXLE1BQUEsQ0FBa0J5RixJQUFJLENBQUNDLFNBQVMsQ0FBQ04sV0FBVyxDQUFDLEVBQUc7UUFDNUQ7UUFDQSxJQUFNUyxjQUFjLEdBQUdELE1BQU0sQ0FBQ0UsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRTtRQUMvRDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQWYsT0FBSSxDQUFDbGIsT0FBTyw2QkFBQWtXLE1BQUEsQ0FBNkI2RixjQUFjLENBQUMvaUIsS0FBSyxTQUFBa2QsTUFBQSxDQUFNNkYsY0FBYyxDQUFDOU4sTUFBTSxFQUFHO1FBQzNGaU4sT0FBSSxDQUFDbGIsT0FBTyxDQUFDLDJCQUEyQixHQUFHK2IsY0FBYyxDQUFDL2lCLEtBQUssR0FBRytpQixjQUFjLENBQUM5TixNQUFNLENBQUM7UUFDeEZpTixPQUFJLENBQUNsYixPQUFPLENBQUMsd0JBQXdCLEdBQUcrYixjQUFjLENBQUNHLFdBQVcsQ0FBQztRQUNuRWhCLE9BQUksQ0FBQ2xiLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRytiLGNBQWMsQ0FBQ3ZHLFVBQVUsQ0FBQztRQUNqRSxDQUFDbkssTUFBTSxDQUFDclMsS0FBSyxFQUFFcVMsTUFBTSxDQUFDNEMsTUFBTSxDQUFDLEdBQUcsQ0FBQ2lOLE9BQUksQ0FBQ2xTLGlCQUFpQixFQUFFa1MsT0FBSSxDQUFDalMsa0JBQWtCLENBQUM7UUFDakYsSUFBSWlTLE9BQUksQ0FBQzlPLGtCQUFrQixFQUFFO1VBQzNCLENBQUNkLGNBQWMsQ0FBQ3RTLEtBQUssRUFBRXNTLGNBQWMsQ0FBQzJDLE1BQU0sQ0FBQyxHQUFHLENBQUNpTixPQUFJLENBQUNqUyxrQkFBa0IsRUFBRWlTLE9BQUksQ0FBQ2xTLGlCQUFpQixDQUFDO1FBQ25HO1FBQ0FvQyxLQUFLLENBQUN4RCxTQUFTLEdBQUdrVSxNQUFNO1FBQ3hCWixPQUFJLENBQUM3SSxRQUFRLEdBQUd5SixNQUFNO01BQ3hCLENBQUMsQ0FBQyxPQUFPbmEsQ0FBQyxFQUFFO1FBQ1YsS0FBSyxDQUFDO1FBQ04sTUFBTUEsQ0FBQztNQUNUO0lBQUM7RUFDSDtFQUNNa1ksV0FBV0EsQ0FBQSxFQUFHO0lBQUEsSUFBQXNDLE9BQUE7SUFBQSxPQUFBeGdCLGlCQUFBO01BQ2xCLEtBQUssQ0FBQztNQUNOLElBQU07UUFDSjBhLEdBQUc7UUFDSDNDLFFBQVE7UUFDUkMsV0FBVztRQUNYM1MsS0FBSztRQUNMRSxRQUFRO1FBQ1JFLFFBQVE7UUFDUjZWO01BQ0YsQ0FBQyxHQUFHMWhCLFFBQVEsQ0FBQ21ILGNBQWMsRUFBRTtNQUM3QnlmLE9BQUksQ0FBQzFMLFVBQVUsQ0FBQ3dHLFNBQVMsRUFBRTtRQUN6QnRhLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQzs7TUFFRjtNQUNBLElBQU15ZixTQUFTLEdBQUcsR0FBRztNQUNyQixJQUFNQyxVQUFVLEdBQUcsR0FBRztNQUN0QixJQUFNQyxpQkFBaUIsR0FBR0QsVUFBVSxHQUFHRCxTQUFTLENBQUMsQ0FBQzs7TUFFbEQsSUFBSUcsYUFBYSxFQUFFQyxjQUFjO01BQ2pDLElBQUlDLGtCQUFrQixHQUFHcEcsR0FBRyxDQUFDMUssV0FBVztNQUN4QyxJQUFJK1EsbUJBQW1CLEdBQUdyRyxHQUFHLENBQUN4SyxZQUFZO01BQzFDLElBQU1nSSxXQUFXLEdBQUdzSSxPQUFJLENBQUM3ZixTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0MsS0FBSztNQUN6RCxJQUFNK2EsWUFBWSxHQUFHb0ksT0FBSSxDQUFDN2YsU0FBUyxDQUFDdkQsZ0JBQWdCLENBQUNFLE1BQU07TUFDM0QsSUFBTTBqQixvQkFBb0IsR0FBR1IsT0FBSSxDQUFDUyxzQkFBc0I7TUFDeEQsSUFBTUMsa0JBQWtCLEdBQUdWLE9BQUksQ0FBQ1csb0JBQW9CO01BQ3BELElBQUlYLE9BQUksQ0FBQzNjLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDdkM7UUFDQTtRQUNBK2MsYUFBYSxHQUFHRSxrQkFBa0IsR0FBR0Usb0JBQW9CO1FBQ3pESCxjQUFjLEdBQUdELGFBQWEsR0FBR0QsaUJBQWlCO01BQ3BELENBQUMsTUFBTTtRQUNMO1FBQ0E7UUFDQTtRQUNBRSxjQUFjLEdBQUdFLG1CQUFtQixHQUFHRyxrQkFBa0I7UUFDekROLGFBQWEsR0FBR0MsY0FBYyxHQUFHSixTQUFTLEdBQUdDLFVBQVU7TUFDekQ7TUFDQUUsYUFBYSxJQUFJMUksV0FBVyxHQUFHLENBQUM7TUFDaEMySSxjQUFjLElBQUkzSSxXQUFXLEdBQUcsQ0FBQztNQUNqQyxJQUFNa0osb0JBQW9CLEdBQUdSLGFBQWEsR0FBR0osT0FBSSxDQUFDYSxxQkFBcUI7TUFDdkUsSUFBTUMscUJBQXFCLEdBQUdULGNBQWMsR0FBR0wsT0FBSSxDQUFDYSxxQkFBcUI7TUFDekUsSUFBSWhjLEtBQUssRUFBRTtRQUNUbWIsT0FBSSxDQUFDMUwsVUFBVSxDQUFDelAsS0FBSyxFQUFFO1VBQ3JCLGdCQUFnQixFQUFFLE1BQU07VUFDeEJpTixNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBSXVFLFFBQVEsRUFBRTtRQUNaaWIsT0FBSSxDQUFDMUwsVUFBVSxDQUFDdlAsUUFBUSxFQUFFO1VBQ3hCbEksS0FBSyxFQUFFK2pCLG9CQUFvQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJO1VBQ3BENUYsTUFBTSxFQUFFZ1AscUJBQXFCLEdBQUdwSixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7VUFDdERsWCxPQUFPLEVBQUUsTUFBTTtVQUNmLGFBQWEsRUFBRSxRQUFRO1VBQ3ZCLGlCQUFpQixFQUFFLFFBQVE7VUFDM0J1Z0IsT0FBTyxFQUFFO1FBQ1gsQ0FBQyxDQUFDO01BQ0o7TUFDQSxJQUFJOWIsUUFBUSxFQUFFO1FBQ1orYSxPQUFJLENBQUMxTCxVQUFVLENBQUNyUCxRQUFRLEVBQUU7VUFDeEIsYUFBYSxFQUFFLE1BQU07VUFDckI2TSxNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBTXdnQixhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDekJoQixPQUFJLENBQUMxTCxVQUFVLENBQUNpRCxRQUFRLEVBQUU7UUFDeEIxYSxLQUFLLEVBQUUrakIsb0JBQW9CLEdBQUdJLGFBQWEsR0FBRyxJQUFJO1FBQ2xEbFAsTUFBTSxFQUFFZ1AscUJBQXFCLEdBQUdFLGFBQWEsR0FBRyxJQUFJO1FBQ3BEQyxlQUFlLEVBQUU7TUFDbkIsQ0FBQyxDQUFDO01BQ0YsSUFBTUMsWUFBWSxHQUFHMUosV0FBVyxDQUFDTyxhQUFhLENBQUMsZUFBZSxDQUFDO01BQy9ELElBQUlvSixDQUFDLEdBQUd2SixZQUFZLEdBQUdGLFdBQVcsR0FBRyxDQUFDO01BQ3RDeUosQ0FBQyxHQUFHQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBR0EsQ0FBQztNQUNqQixJQUFJLENBQUNyYSxLQUFLLENBQUM4WixvQkFBb0IsQ0FBQyxJQUFJLENBQUM5WixLQUFLLENBQUNnYSxxQkFBcUIsQ0FBQyxJQUFJLENBQUNoYSxLQUFLLENBQUM4USxZQUFZLENBQUMsSUFBSSxDQUFDOVEsS0FBSyxDQUFDNFEsV0FBVyxDQUFDLEVBQUU7UUFDaEgsSUFBTTBKLGlCQUFpQixHQUFHalgsSUFBSSxDQUFDdUcsR0FBRyxDQUFDa1Esb0JBQW9CLEdBQUdsSixXQUFXLEdBQUcsQ0FBQyxHQUFHc0osYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM3RixJQUFNSyxrQkFBa0IsR0FBR2xYLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQ29RLHFCQUFxQixHQUFHcEosV0FBVyxHQUFHLENBQUMsR0FBR3NKLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDL0ZFLFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxPQUFPLEVBQUV5USxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDMURGLFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxRQUFRLEVBQUUwUSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDNURILFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxHQUFHLEVBQUV5USxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9ERixZQUFZLENBQUN2USxZQUFZLENBQUMsR0FBRyxFQUFFMFEsa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRUgsWUFBWSxDQUFDdlEsWUFBWSxDQUFDLElBQUksRUFBRXdRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkNELFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxJQUFJLEVBQUV3USxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQ3pDO0lBQUM7RUFDSDtFQUNNN0ssYUFBYUEsQ0FBQSxFQUFHO0lBQUEsSUFBQWdMLE9BQUE7SUFBQSxPQUFBOWhCLGlCQUFBO01BQ3BCLElBQU0raEIsc0JBQXNCLEdBQUdBLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxLQUFLO1FBQ3ZDLElBQUlILE9BQUksQ0FBQ25oQixTQUFTLENBQUNuQixvQkFBb0IsS0FBSyxrQkFBa0IsRUFBRTtVQUM5RCxPQUFPbUwsSUFBSSxDQUFDcUcsR0FBRyxDQUFDZ1IsQ0FBQyxFQUFFQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxNQUFNLElBQUlILE9BQUksQ0FBQ25oQixTQUFTLENBQUNuQixvQkFBb0IsS0FBSyxhQUFhLEVBQUU7VUFDaEUsT0FBT21MLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQzhRLENBQUMsRUFBRUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsTUFBTTtVQUNMLE9BQU90WCxJQUFJLENBQUNxRyxHQUFHLENBQUNnUixDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekI7TUFDRixDQUFDOztNQUVELEtBQUssQ0FBQztNQUNOLElBQU07UUFDSnZILEdBQUc7UUFDSGpMLEtBQUs7UUFDTHNJLFFBQVE7UUFDUkMsV0FBVztRQUNYM1MsS0FBSztRQUNMRSxRQUFRO1FBQ1JFLFFBQVE7UUFDUjRWLGFBQWE7UUFDYkMsU0FBUztRQUNUckQ7TUFDRixDQUFDLEdBQUdyZSxRQUFRLENBQUNtSCxjQUFjLEVBQUU7TUFDN0IrZ0IsT0FBSSxDQUFDaE4sVUFBVSxDQUFDd0csU0FBUyxFQUFFO1FBQ3pCdGEsT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO01BQ0YsSUFBTXdQLFdBQVcsR0FBR3NSLE9BQUksQ0FBQ2poQixTQUFTLEtBQUssWUFBWTs7TUFFbkQ7TUFDQSxJQUFNNGYsU0FBUyxHQUFHalEsV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHO01BQ3pDLElBQU1rUSxVQUFVLEdBQUdsUSxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUc7TUFDMUMsSUFBTW1RLGlCQUFpQixHQUFHRCxVQUFVLEdBQUdELFNBQVMsQ0FBQyxDQUFDOztNQUVsRCxJQUFJRyxhQUFhLEVBQUVDLGNBQWM7TUFDakMsSUFBSUMsa0JBQWtCLEdBQUdwRyxHQUFHLENBQUMxSyxXQUFXO01BQ3hDLElBQUkrUSxtQkFBbUIsR0FBR3JHLEdBQUcsQ0FBQ3hLLFlBQVk7TUFDMUMsSUFBSUwsY0FBYyxHQUFHSixLQUFLLENBQUMxRCxVQUFVO01BQ3JDLElBQUkrRCxlQUFlLEdBQUdMLEtBQUssQ0FBQ3pELFdBQVc7TUFDdkMsSUFBSStELG9CQUFvQixHQUFHTixLQUFLLENBQUNPLFdBQVc7TUFDNUMsSUFBSUMscUJBQXFCLEdBQUdSLEtBQUssQ0FBQ1MsWUFBWTtNQUM5QyxJQUFJSyxvQkFBb0IsR0FBR3VSLE9BQUksQ0FBQy9kLGtCQUFrQjtNQUNsRCxJQUFJOEwsY0FBYyxLQUFLLENBQUMsSUFBSUMsZUFBZSxLQUFLLENBQUMsSUFBSUMsb0JBQW9CLEtBQUssQ0FBQyxJQUFJRSxxQkFBcUIsS0FBSyxDQUFDLEVBQUU7UUFDOUc7TUFDRjtNQUNBLElBQU1pSSxXQUFXLEdBQUc0SixPQUFJLENBQUNuaEIsU0FBUyxDQUFDdkQsZ0JBQWdCLENBQUNDLEtBQUs7TUFDekQsSUFBTSthLFlBQVksR0FBRzBKLE9BQUksQ0FBQ25oQixTQUFTLENBQUN2RCxnQkFBZ0IsQ0FBQ0UsTUFBTTtNQUMzRCxJQUFJd2tCLE9BQUksQ0FBQ3JSLGtCQUFrQixFQUFFO1FBQzNCLENBQUNaLGNBQWMsRUFBRUMsZUFBZSxDQUFDLEdBQUcsQ0FBQ0EsZUFBZSxFQUFFRCxjQUFjLENBQUM7UUFDckUsQ0FBQ0Usb0JBQW9CLEVBQUVFLHFCQUFxQixDQUFDLEdBQUcsQ0FBQ0EscUJBQXFCLEVBQUVGLG9CQUFvQixDQUFDO1FBQzdGUSxvQkFBb0IsR0FBR3VSLE9BQUksQ0FBQy9kLGtCQUFrQixLQUFLLFVBQVUsR0FBRyxXQUFXLEdBQUcsVUFBVTtNQUMxRjtNQUNBLElBQUltZSxhQUFhLEdBQUduUyxvQkFBb0I7TUFDeEMsSUFBSW9TLGNBQWMsR0FBR2xTLHFCQUFxQjtNQUMxQyxJQUFNK1Esb0JBQW9CLEdBQUdjLE9BQUksQ0FBQ2Isc0JBQXNCO01BQ3hELElBQU1DLGtCQUFrQixHQUFHWSxPQUFJLENBQUNYLG9CQUFvQjtNQUNwRCxJQUFNaUIsb0JBQW9CLEdBQUduUyxxQkFBcUIsR0FBR0Ysb0JBQW9CO01BQ3pFLElBQU1zUyxxQkFBcUIsR0FBR3RTLG9CQUFvQixHQUFHRSxxQkFBcUI7TUFDMUUsSUFBSTZSLE9BQUksQ0FBQ2plLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDdkM7UUFDQWllLE9BQUksQ0FBQ2hOLFVBQVUsQ0FBQ3VHLGFBQWEsRUFBRTtVQUM3QixpQkFBaUIsRUFBRSxRQUFRO1VBQzNCLGFBQWEsRUFBRTtRQUNqQixDQUFDLENBQUM7UUFDRjtRQUNBLElBQUk5SyxvQkFBb0IsS0FBS3VSLE9BQUksQ0FBQ2plLGVBQWUsRUFBRTtVQUNqRDtVQUNBO1VBQ0E7VUFDQStjLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQjtVQUNqR0gsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjs7VUFFbEQ7VUFDQXVCLGFBQWEsR0FBR3RCLGFBQWE7VUFDN0J1QixjQUFjLEdBQUdELGFBQWEsR0FBR0Usb0JBQW9CO1FBQ3ZELENBQUMsTUFBTTtVQUNMO1VBQ0E7VUFDQTtVQUNBdkIsY0FBYyxHQUFHa0Isc0JBQXNCLENBQUM5UixxQkFBcUIsRUFBRUgsZUFBZSxDQUFDO1VBQy9FOFEsYUFBYSxHQUFHQyxjQUFjLEdBQUdKLFNBQVMsR0FBR0MsVUFBVTtRQUN6RDtNQUNGLENBQUMsTUFBTTtRQUNMO1FBQ0FvQixPQUFJLENBQUNoTixVQUFVLENBQUN1RyxhQUFhLEVBQUU7VUFDN0IsaUJBQWlCLEVBQUUsS0FBSztVQUN4QixhQUFhLEVBQUU7UUFDakIsQ0FBQyxDQUFDO1FBQ0YsSUFBSTlLLG9CQUFvQixLQUFLdVIsT0FBSSxDQUFDamUsZUFBZSxFQUFFO1VBQ2pEO1VBQ0E7VUFDQTs7VUFFQTtVQUNBZ2QsY0FBYyxHQUFHa0Isc0JBQXNCLENBQUNoQixtQkFBbUIsRUFBRWpSLGVBQWUsQ0FBQyxHQUFHb1Isa0JBQWtCO1VBQ2xHTixhQUFhLEdBQUdDLGNBQWMsR0FBR0osU0FBUyxHQUFHQyxVQUFVOztVQUV2RDtVQUNBeUIsY0FBYyxHQUFHdEIsY0FBYztVQUMvQnFCLGFBQWEsR0FBR0MsY0FBYyxHQUFHRSxxQkFBcUI7O1VBRXREO1VBQ0EsSUFBSXpCLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQixFQUFFO1lBQ3JHO1lBQ0FKLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQjtZQUNqR0gsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjs7WUFFbEQ7WUFDQXVCLGFBQWEsR0FBR3RCLGFBQWE7WUFDN0J1QixjQUFjLEdBQUdELGFBQWEsR0FBR0Usb0JBQW9CO1VBQ3ZEO1FBQ0YsQ0FBQyxNQUFNO1VBQ0w7VUFDQTs7VUFFQTtVQUNBdkIsY0FBYyxHQUFHa0Isc0JBQXNCLENBQUNoQixtQkFBbUIsRUFBRWpSLGVBQWUsQ0FBQyxHQUFHb1Isa0JBQWtCO1VBQ2xHTixhQUFhLEdBQUdDLGNBQWMsR0FBR0osU0FBUyxHQUFHQyxVQUFVOztVQUV2RDtVQUNBLElBQUlFLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQixFQUFFO1lBQ3JHO1lBQ0FKLGFBQWEsR0FBR21CLHNCQUFzQixDQUFDakIsa0JBQWtCLEVBQUVqUixjQUFjLENBQUMsR0FBR21SLG9CQUFvQjtZQUNqR0gsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjtVQUNwRDs7VUFFQTtVQUNBdUIsYUFBYSxHQUFHdEIsYUFBYTtVQUM3QnVCLGNBQWMsR0FBR0QsYUFBYSxHQUFHRSxvQkFBb0I7UUFDdkQ7TUFDRjs7TUFFQTtNQUNBLElBQUlOLE9BQUksQ0FBQ25oQixTQUFTLENBQUNuQixvQkFBb0IsS0FBSyxhQUFhLEVBQUU7UUFDekQ7UUFDQSxJQUFJcWhCLGNBQWMsR0FBR0UsbUJBQW1CLEVBQUU7VUFDeENGLGNBQWMsR0FBR2xXLElBQUksQ0FBQ3FHLEdBQUcsQ0FBQytQLG1CQUFtQixFQUFFalIsZUFBZSxDQUFDLEdBQUdvUixrQkFBa0I7VUFDcEZOLGFBQWEsR0FBR0MsY0FBYyxHQUFHSixTQUFTLEdBQUdDLFVBQVU7VUFDdkR3QixhQUFhLEdBQUd0QixhQUFhO1VBQzdCdUIsY0FBYyxHQUFHRCxhQUFhLEdBQUdFLG9CQUFvQjtRQUN2RDs7UUFFQTtRQUNBLElBQUl4QixhQUFhLEdBQUdFLGtCQUFrQixFQUFFO1VBQ3RDRixhQUFhLEdBQUdqVyxJQUFJLENBQUNxRyxHQUFHLENBQUM4UCxrQkFBa0IsRUFBRWpSLGNBQWMsQ0FBQyxHQUFHbVIsb0JBQW9CO1VBQ25GSCxjQUFjLEdBQUdELGFBQWEsR0FBR0QsaUJBQWlCO1VBQ2xEdUIsYUFBYSxHQUFHdEIsYUFBYTtVQUM3QnVCLGNBQWMsR0FBR0QsYUFBYSxHQUFHRSxvQkFBb0I7UUFDdkQ7TUFDRjtNQUNBTixPQUFJLENBQUMxUixvQkFBb0IsR0FBR3pGLElBQUksQ0FBQ3FHLEdBQUcsQ0FBQzRQLGFBQWEsRUFBRXNCLGFBQWEsQ0FBQztNQUNsRUosT0FBSSxDQUFDeFIscUJBQXFCLEdBQUczRixJQUFJLENBQUNxRyxHQUFHLENBQUM2UCxjQUFjLEVBQUVzQixjQUFjLENBQUM7TUFDckUsSUFBSUwsT0FBSSxDQUFDclIsa0JBQWtCLEVBQUU7UUFDM0IsQ0FBQ3lSLGFBQWEsRUFBRUMsY0FBYyxDQUFDLEdBQUcsQ0FBQ0EsY0FBYyxFQUFFRCxhQUFhLENBQUM7TUFDbkU7TUFDQXRCLGFBQWEsSUFBSTFJLFdBQVcsR0FBRyxDQUFDO01BQ2hDMkksY0FBYyxJQUFJM0ksV0FBVyxHQUFHLENBQUM7TUFDakMsSUFBTWtKLG9CQUFvQixHQUFHUixhQUFhLEdBQUdrQixPQUFJLENBQUNULHFCQUFxQjtNQUN2RSxJQUFNQyxxQkFBcUIsR0FBR1QsY0FBYyxHQUFHaUIsT0FBSSxDQUFDVCxxQkFBcUI7TUFDekUsSUFBSWhjLEtBQUssRUFBRTtRQUNUeWMsT0FBSSxDQUFDaE4sVUFBVSxDQUFDelAsS0FBSyxFQUFFO1VBQ3JCLGdCQUFnQixFQUFFLE1BQU07VUFDeEJpTixNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBSXVFLFFBQVEsRUFBRTtRQUNadWMsT0FBSSxDQUFDaE4sVUFBVSxDQUFDdlAsUUFBUSxFQUFFO1VBQ3hCbEksS0FBSyxFQUFFK2pCLG9CQUFvQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJO1VBQ3BENUYsTUFBTSxFQUFFZ1AscUJBQXFCLEdBQUdwSixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7VUFDdERsWCxPQUFPLEVBQUUsTUFBTTtVQUNmLGFBQWEsRUFBRSxRQUFRO1VBQ3ZCLGlCQUFpQixFQUFFLFFBQVE7VUFDM0J1Z0IsT0FBTyxFQUFFO1FBQ1gsQ0FBQyxDQUFDO01BQ0o7TUFDQSxJQUFJOWIsUUFBUSxFQUFFO1FBQ1pxYyxPQUFJLENBQUNoTixVQUFVLENBQUNyUCxRQUFRLEVBQUU7VUFDeEIsYUFBYSxFQUFFLE1BQU07VUFDckI2TSxNQUFNLEVBQUUsQ0FBQ3lPLG1CQUFtQixHQUFHRixjQUFjLElBQUksQ0FBQyxHQUFHLElBQUk7VUFDekQ3ZixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0E4Z0IsT0FBSSxDQUFDaE4sVUFBVSxDQUFDckYsS0FBSyxFQUFFO1FBQ3JCcFMsS0FBSyxFQUFFNmtCLGFBQWEsR0FBRztNQUN6QixDQUFDLENBQUM7TUFDRkosT0FBSSxDQUFDaE4sVUFBVSxDQUFDckYsS0FBSyxFQUFFO1FBQ3JCNkMsTUFBTSxFQUFFNlAsY0FBYyxHQUFHO01BQzNCLENBQUMsQ0FBQztNQUNGLElBQU1YLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUN6Qk0sT0FBSSxDQUFDaE4sVUFBVSxDQUFDaUQsUUFBUSxFQUFFO1FBQ3hCMWEsS0FBSyxFQUFFK2pCLG9CQUFvQixHQUFHSSxhQUFhLEdBQUcsSUFBSTtRQUNsRGxQLE1BQU0sRUFBRWdQLHFCQUFxQixHQUFHRSxhQUFhLEdBQUcsSUFBSTtRQUNwREMsZUFBZSxFQUFFO01BQ25CLENBQUMsQ0FBQztNQUNGLElBQU1DLFlBQVksR0FBRzFKLFdBQVcsQ0FBQ08sYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUMvRCxJQUFJb0osQ0FBQyxHQUFHdkosWUFBWSxHQUFHRixXQUFXLEdBQUcsQ0FBQztNQUN0Q3lKLENBQUMsR0FBR0EsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUdBLENBQUM7TUFDakIsSUFBSSxDQUFDcmEsS0FBSyxDQUFDOFosb0JBQW9CLENBQUMsSUFBSSxDQUFDOVosS0FBSyxDQUFDZ2EscUJBQXFCLENBQUMsSUFBSSxDQUFDaGEsS0FBSyxDQUFDOFEsWUFBWSxDQUFDLElBQUksQ0FBQzlRLEtBQUssQ0FBQzRRLFdBQVcsQ0FBQyxFQUFFO1FBQ2hILElBQU0wSixpQkFBaUIsR0FBR2pYLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQ2tRLG9CQUFvQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBR3NKLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDN0YsSUFBTUssa0JBQWtCLEdBQUdsWCxJQUFJLENBQUN1RyxHQUFHLENBQUNvUSxxQkFBcUIsR0FBR3BKLFdBQVcsR0FBRyxDQUFDLEdBQUdzSixhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQy9GRSxZQUFZLENBQUN2USxZQUFZLENBQUMsT0FBTyxFQUFFeVEsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzFERixZQUFZLENBQUN2USxZQUFZLENBQUMsUUFBUSxFQUFFMFEsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzVESCxZQUFZLENBQUN2USxZQUFZLENBQUMsR0FBRyxFQUFFeVEsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvREYsWUFBWSxDQUFDdlEsWUFBWSxDQUFDLEdBQUcsRUFBRTBRLGtCQUFrQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEVILFlBQVksQ0FBQ3ZRLFlBQVksQ0FBQyxJQUFJLEVBQUV3USxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDRCxZQUFZLENBQUN2USxZQUFZLENBQUMsSUFBSSxFQUFFd1EsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUN6Qzs7TUFFQTtNQUNBO01BQ0EsSUFBSUcsT0FBSSxDQUFDbmhCLFNBQVMsQ0FBQ3pELFlBQVksRUFBRTtRQUMvQjRrQixPQUFJLENBQUNoTixVQUFVLENBQUN3RyxTQUFTLEVBQUU7VUFDekJ0YSxPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJOGdCLE9BQUksQ0FBQ2plLGVBQWUsS0FBSyxVQUFVLElBQUk0QixRQUFRLElBQUk2VixTQUFTLEVBQUU7VUFDaEUsSUFBTWdILGlDQUFpQyxHQUFHUixPQUFJLENBQUNTLDJCQUEyQixDQUFDOWMsUUFBUSxDQUFDO1VBQ3BGLElBQUkrYyx1QkFBdUIsR0FBR3ZLLGFBQWEsQ0FBQ00sYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDK0csWUFBWSxDQUFDLFFBQVEsQ0FBQztVQUN2RmtELHVCQUF1QixHQUFHQSx1QkFBdUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHQSx1QkFBdUI7VUFDdEYsSUFBSUMsc0JBQXNCLEdBQUdoZCxRQUFRLENBQUN5SyxZQUFZO1VBQ2xEdVMsc0JBQXNCLElBQUluYixLQUFLLENBQUNDLFFBQVEsQ0FBQzlCLFFBQVEsQ0FBQ2xJLEtBQUssQ0FBQ21sQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBR25iLFFBQVEsQ0FBQzlCLFFBQVEsQ0FBQ2xJLEtBQUssQ0FBQ21sQixVQUFVLENBQUM7VUFDOUdELHNCQUFzQixJQUFJSCxpQ0FBaUM7VUFDM0RHLHNCQUFzQixJQUFJRCx1QkFBdUI7VUFDakQsSUFBTUcsUUFBUSxHQUFHNUIsbUJBQW1CLElBQUlBLG1CQUFtQixHQUFHLENBQUMsR0FBR0YsY0FBYyxHQUFHLENBQUMsQ0FBQztVQUNyRixJQUFJNEIsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJQSxzQkFBc0IsR0FBR0UsUUFBUSxFQUFFO1lBQ25FYixPQUFJLENBQUNoTixVQUFVLENBQUN3RyxTQUFTLEVBQUU7Y0FDekIsZUFBZSxFQUFFLEVBQUU7Y0FDbkIsZ0JBQWdCLEVBQUVtSCxzQkFBc0IsR0FBRztZQUM3QyxDQUFDLENBQUM7VUFDSjtRQUNGLENBQUMsTUFBTTtVQUNMWCxPQUFJLENBQUNoTixVQUFVLENBQUN3RyxTQUFTLEVBQUU7WUFDekIsZUFBZSxFQUFFLE1BQU07WUFDdkIsZ0JBQWdCLEVBQUU7VUFDcEIsQ0FBQyxDQUFDO1FBQ0o7TUFDRjtNQUNBLE1BQU13RyxPQUFJLENBQUNwYyxhQUFhLENBQUNvYyxPQUFJLENBQUNoSyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7TUFDckQsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNBeUssMkJBQTJCQSxDQUFDNU0sR0FBRyxFQUFFO0lBQy9CLElBQUlpTixHQUFHLEdBQUcsQ0FBQztJQUNYLEtBQUssSUFBTUMsSUFBSSxJQUFJbE4sR0FBRyxhQUFIQSxHQUFHLHVCQUFIQSxHQUFHLENBQUVtTixVQUFVLEVBQUU7TUFDbENGLEdBQUcsSUFBSUMsSUFBSSxDQUFDM1MsWUFBWSxHQUFHMlMsSUFBSSxDQUFDM1MsWUFBWSxHQUFHLENBQUM7SUFDbEQ7SUFDQSxPQUFPMFMsR0FBRztFQUNaO0VBQ0F6YyxhQUFhQSxDQUFBLEVBQUc7SUFDZCxJQUFJLENBQUNpUSxtQ0FBbUMsRUFBRTtJQUMxQyxJQUFJLENBQUMyTSxRQUFRLEVBQUU7SUFDZixJQUFJLENBQUM1TCxVQUFVLEVBQUU7RUFDbkI7RUFDTS9XLGVBQWVBLENBQUEsRUFBRztJQUFBLElBQUE0aUIsT0FBQTtJQUFBLE9BQUFoakIsaUJBQUE7TUFDdEIsS0FBSyxDQUFDO01BQ04sSUFBSWdqQixPQUFJLENBQUNDLGlCQUFpQixFQUFFO1FBQzFCLEtBQUssQ0FBQztRQUNOO01BQ0Y7TUFDQUQsT0FBSSxDQUFDRSxlQUFlLFNBQVNqcEIsSUFBSSxFQUFFO01BQ25DLElBQUlrcEIsT0FBTyxHQUFHLEVBQUU7TUFDaEJBLE9BQU8sWUFBQTVJLE1BQUEsQ0FBWXlJLE9BQUksQ0FBQzlmLFlBQVksQ0FBQ2tnQixFQUFFLE9BQUk7TUFDM0NELE9BQU8sa0JBQUE1SSxNQUFBLENBQWtCeUksT0FBSSxDQUFDOWYsWUFBWSxDQUFDbWdCLFFBQVEsT0FBSTtNQUN2REYsT0FBTyxzQkFBQTVJLE1BQUEsQ0FBc0J5SSxPQUFJLENBQUM3aEIsZUFBZSxPQUFJO01BQ3JEZ2lCLE9BQU8sbUNBQUE1SSxNQUFBLENBQW1DeUksT0FBSSxDQUFDRSxlQUFlLE9BQUk7TUFDbEUsSUFBSUYsT0FBSSxDQUFDOWYsWUFBWSxDQUFDbWdCLFFBQVEsS0FBSyxLQUFLLElBQUlMLE9BQUksQ0FBQzlmLFlBQVksQ0FBQ21nQixRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ2hGTCxPQUFJLENBQUNFLGVBQWUsR0FBRyxLQUFLO01BQzlCO01BQ0FDLE9BQU8sOEJBQUE1SSxNQUFBLENBQThCeUksT0FBSSxDQUFDRSxlQUFlLE9BQUk7TUFDN0RDLE9BQU8sbUJBQUE1SSxNQUFBLENBQW1CN1MsU0FBUyxDQUFDQyxTQUFTLE9BQUk7TUFDakQsS0FBSyxDQUFDO01BQ05xYixPQUFJLENBQUMzZSxPQUFPLENBQUM4ZSxPQUFPLENBQUM7TUFDckJya0IsTUFBTSxDQUFDd2tCLGNBQWMsR0FBR0gsT0FBTztNQUMvQixJQUFJSSxhQUFhLEdBQUcsT0FBTztNQUMzQixJQUFJUCxPQUFJLENBQUNFLGVBQWUsRUFBRTtRQUN4QixLQUFLLENBQUM7UUFDTkssYUFBYSxJQUFJLE9BQU87TUFDMUIsQ0FBQyxNQUFNO1FBQ0wsS0FBSyxDQUFDO01BQ1I7TUFDQSxLQUFLLENBQUM7TUFDTnprQixNQUFNLENBQUN3a0IsY0FBYyxHQUFHSCxPQUFPO01BQy9CLEtBQUssQ0FBQztNQUNOLElBQU1LLEdBQUcsR0FBRyxJQUFJN00sR0FBRyxDQUFDNE0sYUFBYSxHQUFHLEtBQUssRUFBRVAsT0FBSSxDQUFDcmlCLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQztNQUMxRSxJQUFJc1QsR0FBRyxTQUFTc1IsS0FBSyxDQUFDRCxHQUFHLENBQUNFLElBQUksQ0FBQyxDQUFDQyxJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxJQUFJLEVBQUUsQ0FBQyxDQUFDRixJQUFJLENBQUNFLElBQUksSUFBSTtRQUNuRSxJQUFJQyxLQUFLLEdBQUcsdUJBQXVCO1FBQ25DLElBQUlDLE1BQU0sR0FBR0YsSUFBSSxDQUFDRyxPQUFPLENBQUNGLEtBQUssRUFBRSwwQkFBMEIsQ0FBQzs7UUFFNUQ7UUFDQUMsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSw0Q0FBNEMsR0FBRywwREFBMEQsQ0FBQztRQUN6SkQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyw0Q0FBNEMsRUFBRSxnQkFBZ0IsR0FBRyw0Q0FBNEMsQ0FBQztRQUN0SUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztRQUNwRkQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQzs7UUFFeEQ7UUFDQUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ1QsYUFBYSxHQUFHLE9BQU8sRUFBRSxJQUFJNU0sR0FBRyxDQUFDNE0sYUFBYSxHQUFHLE9BQU8sRUFBRVAsT0FBSSxDQUFDcmlCLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQyxDQUFDNmtCLElBQUksQ0FBQztRQUN2SEssTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxJQUFJQyxNQUFNLCtCQUFBMUosTUFBQSxDQUE4QmdKLGFBQWEsbUJBQWUsSUFBSSxDQUFDLDZCQUFBaEosTUFBQSxDQUE0QixJQUFJNUQsR0FBRyxDQUFDNE0sYUFBYSxHQUFHLE9BQU8sRUFBRVAsT0FBSSxDQUFDcmlCLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQyxDQUFDNmtCLElBQUksUUFBSTtRQUN0TUssTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSwyQkFBMkIsQ0FBQztRQUMzRUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSwyQkFBMkIsQ0FBQzs7UUFFM0U7UUFDQUQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSwrQ0FBK0MsR0FBRyw2QkFBNkIsR0FBRyw0Q0FBNEMsR0FBRyxrQ0FBa0MsR0FBRyxrQ0FBa0MsR0FBRyxpQ0FBaUMsR0FBRywrQkFBK0IsR0FBRywyQ0FBMkMsR0FBRyxXQUFXLEdBQUcsc0NBQXNDLEdBQUcsK0JBQStCLEdBQUcsMkNBQTJDLEdBQUcsVUFBVSxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsMkNBQTJDLENBQUM7UUFDMWtCLE9BQU9ELE1BQU07TUFDZixDQUFDLENBQUM7TUFDRjVSLEdBQUcsdUNBQUFvSSxNQUFBLENBRUNwSSxHQUFHLHdJQUtGO01BQ0w2USxPQUFJLENBQUN4Z0IsV0FBVyxTQUFTMGhCLElBQUksQ0FBQy9SLEdBQUcsQ0FBQztNQUNsQzZRLE9BQUksQ0FBQ3hnQixXQUFXLENBQUMyaEIsb0JBQW9CO1FBQUEsSUFBQUMsTUFBQSxHQUFBcGtCLGlCQUFBLENBQUcsV0FBTXVCLENBQUMsRUFBSTtVQUNqRCxLQUFLLENBQUM7UUFDUixDQUFDO1FBQUEsaUJBQUE4aUIsR0FBQTtVQUFBLE9BQUFELE1BQUEsQ0FBQTFiLEtBQUEsT0FBQWhFLFNBQUE7UUFBQTtNQUFBO01BQ0QsTUFBTXNlLE9BQUksQ0FBQ3hnQixXQUFXLENBQUMyaEIsb0JBQW9CLEVBQUU7TUFDN0NuQixPQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7TUFDN0IsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNBcUIsbUJBQW1CQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQ3BCLE9BQU8sSUFBSXZkLE9BQU8sQ0FBQyxDQUFDQyxPQUFPLEVBQUVzTyxNQUFNLEtBQUs7TUFDdEMsSUFBSSxDQUFDaVAsVUFBVSxHQUFHLEtBQUs7TUFDdkIsSUFBSSxDQUFDcGUsaUJBQWlCLENBQUMsS0FBSyxDQUFDO01BQzdCO01BQ0E7TUFDQTtNQUNBLElBQUksQ0FBQ3lPLG1CQUFtQixFQUFFO01BQzFCLElBQUksQ0FBQzRQLFNBQVMsR0FBRyxDQUFDO01BQ2xCLElBQUksQ0FBQ3BjLFNBQVMsR0FBRyxLQUFLO01BQ3RCLElBQUksQ0FBQ29NLHFCQUFxQixHQUFHLENBQUM7TUFDOUIsSUFBSSxDQUFDaVEsZUFBZSxHQUFHLENBQUM7TUFDeEIsSUFBTUMsSUFBSTtRQUFBLElBQUFDLE1BQUEsR0FBQTVrQixpQkFBQSxDQUFHLGFBQVk7VUFDdkIsSUFBSTtZQUNGLElBQUlvTCxTQUFTLEdBQUcsSUFBSTtjQUNsQnlaLGNBQWMsR0FBRyxJQUFJO2NBQ3JCclQsT0FBTyxHQUFHLElBQUk7Y0FDZEMsVUFBVSxHQUFHLElBQUk7Y0FDakIyRCxTQUFTLEdBQUcsSUFBSTtjQUNoQkMsU0FBUyxHQUFHLElBQUk7Y0FDaEJ5UCxTQUFTLEdBQUcsSUFBSTtjQUNoQkMsYUFBYSxHQUFHLEVBQUU7Y0FDbEJDLFFBQVEsR0FBRyxJQUFJOztZQUVqQjtZQUNBLElBQUksQ0FBQ1QsT0FBSSxDQUFDL2hCLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7WUFFOUI7WUFDQSxJQUFNLENBQUN5aUIsWUFBWSxFQUFFQyxZQUFZLENBQUMsR0FBRyxDQUFDWCxPQUFJLENBQUNsWCxpQkFBaUIsRUFBRWtYLE9BQUksQ0FBQ2pYLGtCQUFrQixDQUFDO1lBQ3RGLElBQU07Y0FDSm1DO1lBQ0YsQ0FBQyxHQUFHN1YsUUFBUSxDQUFDbUgsY0FBYyxFQUFFO1lBQzdCLElBQUlra0IsWUFBWSxLQUFLLENBQUMsSUFBSUMsWUFBWSxLQUFLLENBQUMsRUFBRTtZQUM5QyxJQUFJWCxPQUFJLENBQUNDLFVBQVUsRUFBRTtjQUNuQixNQUFNRCxPQUFJLENBQUMxYixPQUFPLENBQUMsR0FBRyxDQUFDO2NBQ3ZCO1lBQ0Y7WUFDQTtZQUNBLElBQUkwYixPQUFJLENBQUNFLFNBQVMsS0FBSyxDQUFDLElBQUksQ0FBQ0YsT0FBSSxDQUFDbGMsU0FBUyxXQUFXa2MsT0FBSSxDQUFDdFYsNkJBQTZCLENBQUNRLEtBQUssQ0FBQyxDQUFDLEVBQUU7Y0FDaEcsQ0FBQzhVLE9BQUksQ0FBQ0UsU0FBUyxFQUFFRixPQUFJLENBQUN2Vix3QkFBd0IsQ0FBQyxHQUFHdVYsT0FBSSxDQUFDblksbUJBQW1CLENBQUNtWSxPQUFJLENBQUMxakIsU0FBUyxDQUFDO1lBQzVGO1lBQ0EsSUFBSSxDQUFDMGpCLE9BQUksQ0FBQ0UsU0FBUyxJQUFJRixPQUFJLENBQUNsYyxTQUFTLEVBQUU7Y0FDckMsTUFBTWtjLE9BQUksQ0FBQzFiLE9BQU8sQ0FBQyxHQUFHLENBQUM7Y0FDdkI7WUFDRjtZQUNBOztZQUVBLElBQUkwYixPQUFJLENBQUMvTSxXQUFXLEdBQUcrTSxPQUFJLENBQUMzb0IsVUFBVSxDQUFDWCxXQUFXLEVBQUU7Y0FDbEQ7O2NBRUE7Y0FDQSxDQUFDNHBCLGNBQWMsRUFBRXJULE9BQU8sRUFBRUMsVUFBVSxDQUFDLFNBQVM4UyxPQUFJLENBQUMzUixtQkFBbUIsQ0FBQzJSLE9BQUksQ0FBQ0UsU0FBUyxFQUFFLENBQUMsQ0FBQztjQUN6RixJQUFJLENBQUNJLGNBQWMsRUFBRTtnQkFDbkIsSUFBSU4sT0FBSSxDQUFDek0sZ0JBQWdCLEtBQUt5TSxPQUFJLENBQUN6b0IsV0FBVyxDQUFDcEIsS0FBSyxFQUFFO2tCQUNwRCxNQUFNNnBCLE9BQUksQ0FBQzdlLGFBQWEsQ0FBQzZlLE9BQUksQ0FBQ3pvQixXQUFXLENBQUNsQixrQkFBa0IsQ0FBQztnQkFDL0Q7Z0JBQ0EsSUFBSTJwQixPQUFJLENBQUNsRix3QkFBd0IsRUFBRSxFQUFFO2tCQUNuQyxNQUFNa0YsT0FBSSxDQUFDN2UsYUFBYSxDQUFDNmUsT0FBSSxDQUFDem9CLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFLEtBQUssRUFBRTJXLFVBQVUsQ0FBQztrQkFDbkY4UyxPQUFJLENBQUMxUCxtQkFBbUIsRUFBRTtrQkFDMUIwUCxPQUFJLENBQUNuZSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQzs7Z0JBRUE7Y0FDRjs7Y0FFQTtjQUNBLE1BQU1tZSxPQUFJLENBQUM3ZSxhQUFhLENBQUM2ZSxPQUFJLENBQUN6b0IsV0FBVyxDQUFDbkIsbUJBQW1CLENBQUM7O2NBRTlEO2NBQ0E0cEIsT0FBSSxDQUFDWSwwQkFBMEIsQ0FBQzNULE9BQU8sRUFBRUMsVUFBVSxDQUFDO2NBQ3BELElBQUk4UyxPQUFJLENBQUNsRix3QkFBd0IsRUFBRSxFQUFFO2dCQUNuQ2tGLE9BQUksQ0FBQ25lLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDNUIsTUFBTW1lLE9BQUksQ0FBQzdlLGFBQWEsQ0FBQzZlLE9BQUksQ0FBQ3pvQixXQUFXLENBQUNqQixzQkFBc0IsRUFBRSxLQUFLLEVBQUU0VyxVQUFVLENBQUM7Y0FDdEY7Y0FDQSxDQUFDckcsU0FBUyxFQUFFcUcsVUFBVSxFQUFFMkQsU0FBUyxFQUFFQyxTQUFTLENBQUMsU0FBU2tQLE9BQUksQ0FBQzlRLGtCQUFrQixDQUFDOFEsT0FBSSxDQUFDRSxTQUFTLEVBQUVGLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDeGYsU0FBUyxFQUFFd2YsT0FBSSxDQUFDbEYsd0JBQXdCLEVBQUUsRUFBRTdOLE9BQU8sRUFBRUMsVUFBVSxDQUFDOztjQUVuTDtjQUNBO2NBQ0E7Y0FDQTtZQUNGOztZQUVBLElBQUk4UyxPQUFJLENBQUMvTSxXQUFXLElBQUkrTSxPQUFJLENBQUMzb0IsVUFBVSxDQUFDWCxXQUFXLEVBQUU7Y0FDbkQ7O2NBRUE7Y0FDQSxJQUFJbVEsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDdkIsTUFBTSxJQUFJeEksS0FBSyxrQkFBQTJYLE1BQUEsQ0FBa0JnSyxPQUFJLENBQUMvTSxXQUFXLDhCQUEyQixDQUFDLENBQUM7Y0FDaEY7O2NBRUE7Y0FDQStNLE9BQUksQ0FBQ3pQLFVBQVUsQ0FBQ3JGLEtBQUssRUFBRTtnQkFDckJ6TyxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUVKLElBQUl1akIsT0FBSSxDQUFDeGYsU0FBUyxFQUFFO2dCQUNsQixLQUFLLENBQUM7Z0JBQ047Z0JBQ0ErZixTQUFTLFNBQVNQLE9BQUksQ0FBQ2pQLFlBQVksQ0FBQ2lQLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJSyxTQUFTLEtBQUssSUFBSSxFQUFFLE1BQU0sSUFBSWxpQixLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQyxDQUFDOztnQkFFM0ZtaUIsYUFBYSxDQUFDN0ssSUFBSSxDQUFDNEssU0FBUyxDQUFDO2dCQUM3QixJQUFJUCxPQUFJLENBQUM1akIsU0FBUyxDQUFDaEIsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO2tCQUN2QyxJQUFJeWxCLGNBQWMsR0FBRyxJQUFJQyxJQUFJLEVBQUU7a0JBQy9CLElBQU1DLElBQUksR0FBR2YsT0FBSSxDQUFDNWpCLFNBQVMsQ0FBQ2xCLFlBQVksS0FBSyxNQUFNO2tCQUNuRCxJQUFNOGxCLElBQUksR0FBR2hCLE9BQUksQ0FBQzVqQixTQUFTLENBQUNsQixZQUFZLEtBQUssTUFBTTtrQkFDbkQsSUFBTStsQixRQUFRLEdBQUdqQixPQUFJLENBQUM1akIsU0FBUyxDQUFDbEIsWUFBWSxLQUFLLFVBQVU7a0JBQzNELElBQUlnbUIsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO2tCQUFBLElBQUFDLEtBQUEsYUFBQUEsTUFBQTdDLElBQUEsRUFFb0I7b0JBQzNDLElBQUk0QyxXQUFXLEVBQUU7c0JBQ2YsS0FBSyxDQUFDLENBQUMsQ0FBQztzQkFBQTtvQkFFVjtvQkFDQTtvQkFDQSxJQUFJbEIsT0FBSSxDQUFDRyxlQUFlLEtBQUtILE9BQUksQ0FBQzVqQixTQUFTLENBQUNoQixnQkFBZ0IsRUFBRTtzQkFDNUQsS0FBSyxDQUFDO3NCQUFDO29CQUVUO29CQUNBLElBQU1nbUIsT0FBTztzQkFBQSxJQUFBQyxNQUFBLEdBQUE1bEIsaUJBQUEsQ0FBRyxhQUFZO3dCQUMxQnVrQixPQUFJLENBQUNHLGVBQWUsRUFBRTt3QkFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDUkksU0FBUyxTQUFTUCxPQUFJLENBQUN2TyxpQkFBaUIsQ0FBQ3VPLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDRSxTQUFTLEVBQUU1QixJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoRixJQUFJaUMsU0FBUyxLQUFLLElBQUksRUFBRSxNQUFNLElBQUlsaUIsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsQ0FBQzs7d0JBRTNGbWlCLGFBQWEsQ0FBQzdLLElBQUksQ0FBQzRLLFNBQVMsQ0FBQztzQkFDL0IsQ0FBQztzQkFBQSxnQkFQS2EsT0FBT0EsQ0FBQTt3QkFBQSxPQUFBQyxNQUFBLENBQUFsZCxLQUFBLE9BQUFoRSxTQUFBO3NCQUFBO29CQUFBLEdBT1o7b0JBQ0QsSUFBSTRnQixJQUFJLEVBQUU7c0JBQ1IsSUFBSVIsU0FBUyxDQUFDOWYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUNsQyxNQUFNMmdCLE9BQU8sRUFBRTtzQkFDakIsQ0FBQyxNQUFNO3dCQUNMRixXQUFXLEdBQUcsSUFBSTtzQkFDcEI7b0JBQ0Y7b0JBQ0EsSUFBSUYsSUFBSSxFQUFFO3NCQUNSLElBQUlULFNBQVMsQ0FBQzlmLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDbEMsTUFBTTJnQixPQUFPLEVBQUU7c0JBQ2pCLENBQUMsTUFBTTt3QkFDTEYsV0FBVyxHQUFHLElBQUk7c0JBQ3BCO29CQUNGO29CQUNBLElBQUlELFFBQVEsRUFBRTtzQkFDWixNQUFNRyxPQUFPLEVBQUU7b0JBQ2pCO2tCQUNGLENBQUM7a0JBbkNELEtBQUssSUFBTTlDLElBQUksSUFBSTBCLE9BQUksQ0FBQzNQLG1CQUFtQjtvQkFBQSxJQUFBaVIsSUFBQSxVQUFBSCxLQUFBLENBQUE3QyxJQUFBO29CQUFBLElBQUFnRCxJQUFBLGNBR3ZDO2tCQUFNO2tCQWlDVixJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJVCxJQUFJLEVBQUUsR0FBR0QsY0FBYztrQkFDcEQsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixDQUFDLE1BQU07a0JBQ0wsS0FBSyxDQUFDO2dCQUNSO2NBQ0Y7Y0FDQSxJQUFJYixPQUFJLENBQUM1akIsU0FBUyxDQUFDdEUsV0FBVyxFQUFFO2dCQUM5QjJvQixRQUFRLEdBQUdULE9BQUksQ0FBQzFPLGFBQWEsQ0FBQzBPLE9BQUksQ0FBQ0UsU0FBUyxDQUFDO2NBQy9DO2NBQ0EsS0FBSyxDQUFDO2NBQ04sSUFBTTtnQkFDSnNCLFlBQVk7Z0JBQ1pDO2NBQ0YsQ0FBQyxHQUFHbnNCLGlCQUFpQixDQUFDb3NCLGNBQWMsQ0FBQzFCLE9BQUksQ0FBQzFqQixTQUFTLEVBQUUwakIsT0FBSSxDQUFDeGYsU0FBUyxFQUFFcUcsU0FBUyxFQUFFMFosU0FBUyxFQUFFUCxPQUFJLENBQUNHLGVBQWUsRUFBRUssYUFBYSxFQUFFUixPQUFJLENBQUM1akIsU0FBUyxDQUFDbEIsWUFBWSxFQUFFOGtCLE9BQUksQ0FBQzVqQixTQUFTLENBQUNqQjtjQUM1SztjQUNBO2NBQ0E7Y0FBQSxDQUNDOztjQUVELElBQUl3QixhQUFhLEdBQUc7Z0JBQ2xCZ2xCLFFBQVEsRUFBRTNCLE9BQUksQ0FBQzFqQixTQUFTO2dCQUN4QlMsVUFBVSxFQUFFMGtCLFNBQVM7Z0JBQ3JCaGtCLGdCQUFnQixFQUFFeVAsVUFBVTtnQkFDNUJwUCxpQkFBaUIsRUFBRStTLFNBQVM7Z0JBQzVCOVMsY0FBYyxFQUFFK1MsU0FBUztnQkFDekIyUCxRQUFRLEVBQUVBLFFBQVE7Z0JBQ2xCbUIsUUFBUSxFQUFFNUIsT0FBSSxDQUFDeGY7Y0FDakIsQ0FBQztjQUNELE1BQU13ZixPQUFJLENBQUM2QixnQkFBZ0IsQ0FBQ2xsQixhQUFhLEVBQUV1USxVQUFVLEVBQUUyRCxTQUFTLEVBQUVDLFNBQVMsQ0FBQztjQUM1RWtQLE9BQUksQ0FBQ3RqQixhQUFhLENBQUNDLGFBQWEsQ0FBQztjQUNqQyxJQUFJcWpCLE9BQUksQ0FBQzVqQixTQUFTLENBQUN2RSxlQUFlLEVBQUU7Z0JBQ2xDOEUsYUFBYSxDQUFDbWxCLFFBQVEsR0FBR04sWUFBWTtjQUN2QztjQUNBLE1BQU14QixPQUFJLENBQUMrQixrQkFBa0IsQ0FBQ3BsQixhQUFhLENBQUM7Y0FDNUNxakIsT0FBSSxDQUFDcGUsYUFBYSxFQUFFO2NBQ3BCb2UsT0FBSSxDQUFDQyxVQUFVLEdBQUcsSUFBSTtjQUN0QnZkLE9BQU8sRUFBRTtZQUNYO1VBQ0YsQ0FBQyxDQUFDLE9BQU9qQixDQUFDLEVBQUU7WUFDVixJQUFJaVIsWUFBWSxHQUFHLHNCQUFzQjtZQUN6QyxJQUFJalIsQ0FBQyxDQUFDd04sT0FBTyxFQUFFO2NBQ2J5RCxZQUFZLElBQUksSUFBSSxHQUFHalIsQ0FBQyxDQUFDd04sT0FBTztZQUNsQztZQUNBLEtBQUssQ0FBQzs7WUFFTjtZQUNBO1lBQ0E7WUFDQTtZQUNBLE1BQU0rUSxPQUFJLENBQUNyTixrQkFBa0IsQ0FBQyxPQUFPLEVBQUVsUixDQUFDLEVBQUVpUixZQUFZLENBQUM7WUFDdkRzTixPQUFJLENBQUNwZSxhQUFhLEVBQUU7WUFDcEJvZSxPQUFJLENBQUNDLFVBQVUsR0FBRyxJQUFJO1lBQ3RCalAsTUFBTSxFQUFFO1lBQ1I7VUFDRixDQUFDLFNBQVM7WUFDUixJQUFJZ1AsT0FBSSxDQUFDZ0MsV0FBVyxFQUFFO2NBQ3BCaEMsT0FBSSxDQUFDZ0MsV0FBVyxHQUFHLEtBQUs7Y0FDeEI7WUFDRjtZQUNBLElBQUksQ0FBQ2hDLE9BQUksQ0FBQ0MsVUFBVSxFQUFFO2NBQ3BCcmQsVUFBVSxDQUFDd2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkI7VUFDRjtRQUNGLENBQUM7UUFBQSxnQkFwTUtBLElBQUlBLENBQUE7VUFBQSxPQUFBQyxNQUFBLENBQUFsYyxLQUFBLE9BQUFoRSxTQUFBO1FBQUE7TUFBQSxHQW9NVDtNQUVEeUMsVUFBVSxDQUFDd2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0VBQ0o7O0VBRU15QixnQkFBZ0JBLENBQUNsbEIsYUFBYSxFQUFFdVEsVUFBVSxFQUFFMkQsU0FBUyxFQUFFQyxTQUFTLEVBQUVoTCxjQUFjLEVBQUU7SUFBQSxJQUFBbWMsT0FBQTtJQUFBLE9BQUF4bUIsaUJBQUE7TUFDdEYsSUFBSXdtQixPQUFJLENBQUM3bEIsU0FBUyxDQUFDbkUsZ0JBQWdCLEVBQUU7UUFDbkMsSUFBTWlxQixXQUFXLEdBQUdELE9BQUksQ0FBQ2xXLHFCQUFxQixHQUFHa1csT0FBSSxDQUFDcFcsb0JBQW9CO1FBQzFFLElBQU1zVyxjQUFjLEdBQUc7VUFDckJDLFFBQVEsRUFBRUgsT0FBSSxDQUFDN2xCLFNBQVMsQ0FBQ2xFLHdCQUF3QjtVQUNqRG1xQixTQUFTLEVBQUVKLE9BQUksQ0FBQzdsQixTQUFTLENBQUNsRSx3QkFBd0IsR0FBR2dxQixXQUFXO1VBQ2hFSSxXQUFXLEVBQUVMLE9BQUksQ0FBQzdsQixTQUFTLENBQUNqRSx5QkFBeUI7VUFDckRvcUIsb0JBQW9CLEVBQUVOLE9BQUksQ0FBQzdsQixTQUFTLENBQUNqRSx5QkFBeUIsQ0FBQztRQUNqRSxDQUFDOztRQUVEd0UsYUFBYSxDQUFDYyxnQkFBZ0IsU0FBU3drQixPQUFJLENBQUNyYyxxQkFBcUIsQ0FBQ3NILFVBQVUsRUFBRWlWLGNBQWMsRUFBRXJjLGNBQWMsQ0FBQzs7UUFFN0c7UUFDQSxJQUFNMGMsbUJBQW1CLEdBQUc7VUFDMUJDLE9BQU8sRUFBRU4sY0FBYyxDQUFDTSxPQUFPO1VBQy9CRixvQkFBb0IsRUFBRUosY0FBYyxDQUFDSTtRQUN2QyxDQUFDO1FBQ0Q1bEIsYUFBYSxDQUFDbUIsaUJBQWlCLFNBQVNta0IsT0FBSSxDQUFDcmMscUJBQXFCLENBQUNpTCxTQUFTLEVBQUUyUixtQkFBbUIsRUFBRTFjLGNBQWMsQ0FBQztRQUNsSG5KLGFBQWEsQ0FBQ29CLGNBQWMsU0FBU2trQixPQUFJLENBQUNyYyxxQkFBcUIsQ0FBQ2tMLFNBQVMsRUFBRXFSLGNBQWMsRUFBRXJjLGNBQWMsQ0FBQztNQUM1RztJQUFDO0VBQ0g7RUFDQTRjLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLE9BQU8sSUFBSWpnQixPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFc08sTUFBTSxLQUFLO01BQ3RDLElBQU0yUixVQUFVLEdBQUcsSUFBSSxDQUFDdm1CLFNBQVMsQ0FBQ3dtQixjQUFjLENBQUNELFVBQVU7TUFDM0QsSUFBTUUsT0FBTyxHQUFHLElBQUksQ0FBQ3ptQixTQUFTLENBQUN3bUIsY0FBYyxDQUFDQyxPQUFPO01BQ3JEM0QsS0FBSyxJQUFBbEosTUFBQSxDQUFJNk0sT0FBTyxlQUFZO1FBQzFCQyxJQUFJLEVBQUVySCxJQUFJLENBQUNDLFNBQVMsQ0FBQ2lILFVBQVUsQ0FBQztRQUNoQ0ksTUFBTSxFQUFFO1FBQ1I7UUFDQTtNQUNGLENBQUMsQ0FBQyxDQUFDM0QsSUFBSSxDQUFDQyxHQUFHLElBQUlBLEdBQUcsQ0FBQzJELElBQUksRUFBRSxDQUFDLENBQUM1RCxJQUFJLENBQUN2YSxNQUFNLElBQUk7UUFDeEMsS0FBSyxDQUFDO1FBQ05xYSxLQUFLLElBQUFsSixNQUFBLENBQUk2TSxPQUFPLGtCQUFlO1VBQzdCSSxPQUFPLEVBQUU7WUFDUEMsYUFBYSxZQUFBbE4sTUFBQSxDQUFZblIsTUFBTSxDQUFDc2UsS0FBSztVQUN2QyxDQUFDO1VBQ0RMLElBQUksRUFBRSxJQUFJO1VBQ1ZDLE1BQU0sRUFBRTtRQUNWLENBQUMsQ0FBQyxDQUFDM0QsSUFBSSxDQUFDQyxHQUFHLElBQUlBLEdBQUcsQ0FBQzJELElBQUksRUFBRSxDQUFDLENBQUM1RCxJQUFJLENBQUM0RCxJQUFJLElBQUk7VUFDdEN0Z0IsT0FBTyxDQUFDc2dCLElBQUksQ0FBQ0csS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUNDLEdBQUcsSUFBSTtRQUNkclMsTUFBTSxDQUFDcVMsR0FBRyxDQUFDO01BQ2IsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0o7RUFDQUMsa0JBQWtCQSxDQUFDcGhCLE9BQU8sRUFBRWlOLE9BQU8sRUFBRWpDLFVBQVUsRUFBRTtJQUFBLElBQUFxVyxPQUFBO0lBQy9DLE9BQU8sSUFBSTlnQixPQUFPO01BQUEsSUFBQStnQixNQUFBLEdBQUEvbkIsaUJBQUEsQ0FBQyxXQUFPaUgsT0FBTyxFQUFFc08sTUFBTSxFQUFLO1FBQzVDLElBQUk7VUFDRixJQUFJNlIsT0FBTyxHQUFHVSxPQUFJLENBQUNubkIsU0FBUyxDQUFDcW5CLGdCQUFnQjtVQUM3QyxRQUFRdmhCLE9BQU87WUFDYixLQUFLLFFBQVE7WUFDYixLQUFLLFFBQVE7WUFDYixLQUFLLFlBQVk7WUFDakIsS0FBSyxZQUFZO2NBQ2YyZ0IsT0FBTyxJQUFJLG9CQUFvQjtjQUMvQjtZQUNGLEtBQUssVUFBVTtZQUNmLEtBQUssY0FBYztZQUNuQixLQUFLLGtCQUFrQjtZQUN2QixLQUFLLHNCQUFzQjtjQUN6QkEsT0FBTyxJQUFJLGVBQWU7Y0FDMUI7WUFDRixLQUFLLFlBQVk7Y0FDZkEsT0FBTyxJQUFJLGlCQUFpQjtjQUM1QjtZQUNGLEtBQUssT0FBTztZQUNaLEtBQUssV0FBVztjQUNkQSxPQUFPLElBQUksWUFBWTtjQUN2QjtZQUNGLEtBQUssUUFBUTtjQUNYLE1BQU0sSUFBSXhrQixLQUFLLENBQUMsMkNBQTJDLENBQUM7WUFDOUQ7Y0FDRSxNQUFNLElBQUlBLEtBQUssMEJBQUEyWCxNQUFBLENBQTBCOVQsT0FBTyxFQUFHO1VBQUM7VUFFeEQsSUFBTXdoQixRQUFRLFNBQVNILE9BQUksQ0FBQ2Isb0JBQW9CLEVBQUU7VUFDbEQsSUFBTWlCLFNBQVMsR0FBRyxJQUFJQyxPQUFPLEVBQUU7VUFDL0JELFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLGVBQWUsWUFBQTdOLE1BQUEsQ0FBWTBOLFFBQVEsRUFBRztVQUN2RCxJQUFNSSxHQUFHLEdBQUdySSxJQUFJLENBQUNDLFNBQVMsQ0FBQztZQUN6QnFJLFlBQVksRUFBRTdXLFVBQVU7WUFDeEIwVSxRQUFRLEVBQUUsTUFBTTtZQUNoQm9DLFNBQVMsRUFBRSxNQUFNO1lBQ2pCQyxTQUFTLEVBQUU7VUFDYixDQUFDLENBQUM7VUFDRixJQUFNQyxjQUFjLEdBQUc7WUFDckJuQixNQUFNLEVBQUUsTUFBTTtZQUNkRSxPQUFPLEVBQUVVLFNBQVM7WUFDbEJiLElBQUksRUFBRWdCLEdBQUc7WUFDVEssUUFBUSxFQUFFO1VBQ1osQ0FBQztVQUNEakYsS0FBSyxDQUFDMkQsT0FBTyxFQUFFcUIsY0FBYyxDQUFDLENBQUM5RSxJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDMkQsSUFBSSxFQUFFLENBQUMsQ0FBQzVELElBQUksQ0FBQ3ZhLE1BQU0sSUFBSTtZQUNwRSxLQUFLLENBQUM7WUFDTm5DLE9BQU8sQ0FBQ21DLE1BQU0sQ0FBQztVQUNqQixDQUFDLENBQUMsQ0FBQ3VlLEtBQUssQ0FBQzNoQixDQUFDLElBQUk7WUFDWixNQUFNQSxDQUFDO1VBQ1QsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLE9BQU80aEIsR0FBRyxFQUFFO1VBQ1osS0FBSyxDQUFDO1VBQ05yUyxNQUFNLENBQUNxUyxHQUFHLENBQUM7UUFDYjtNQUNGLENBQUM7TUFBQSxpQkFBQWUsR0FBQSxFQUFBQyxHQUFBO1FBQUEsT0FBQWIsTUFBQSxDQUFBcmYsS0FBQSxPQUFBaEUsU0FBQTtNQUFBO0lBQUEsSUFBQztFQUNKO0VBQ0Fta0IscUJBQXFCQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQ3RCLE9BQU8sSUFBSTloQixPQUFPO01BQUEsSUFBQStoQixNQUFBLEdBQUEvb0IsaUJBQUEsQ0FBQyxXQUFPaUgsT0FBTyxFQUFFc08sTUFBTSxFQUFLO1FBQzVDLElBQUk7VUFBQSxJQUFBeVQscUJBQUE7VUFDRjtVQUNBO1VBQ0E7VUFDQUYsT0FBSSxDQUFDalUsbUJBQW1CLEVBQUU7VUFDMUIsSUFBSXpKLFNBQVMsR0FBRyxJQUFJO1lBQ2xCMFosU0FBUyxHQUFHLElBQUk7WUFDaEJDLGFBQWEsR0FBRyxFQUFFO1VBQ3BCLElBQU0zSCxzQkFBc0I7WUFBQSxJQUFBNkwsTUFBQSxHQUFBanBCLGlCQUFBLENBQUcsYUFBWTtjQUN6QztjQUNBLElBQU0sR0FBR3lSLFVBQVUsQ0FBQyxTQUFTcVgsT0FBSSxDQUFDelosb0JBQW9CLEVBQUU7Y0FDeEQsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNkO2NBQUEsQ0FDRCxNQUFNO2dCQUNMO2dCQUNBLE1BQU15WixPQUFJLENBQUNwakIsYUFBYSxDQUFDb2pCLE9BQUksQ0FBQ2h0QixXQUFXLENBQUNqQixzQkFBc0IsRUFBRSxLQUFLLEVBQUU0VyxVQUFVLENBQUM7Z0JBQ3BGLElBQUk7a0JBQ0ZyRyxTQUFTLFNBQVMwZCxPQUFJLENBQUNqQixrQkFBa0IsQ0FBQ2lCLE9BQUksQ0FBQ2pvQixTQUFTLEVBQUVpb0IsT0FBSSxDQUFDL2pCLFNBQVMsRUFBRTBNLFVBQVUsQ0FBQzs7a0JBRXJGO2tCQUNBLElBQUlyRyxTQUFTLEtBQUssS0FBSyxFQUFFO29CQUN2QixNQUFNMGQsT0FBSSxDQUFDcGpCLGFBQWEsQ0FBQ29qQixPQUFJLENBQUNodEIsV0FBVyxDQUFDWCxVQUFVLENBQUM7a0JBQ3ZEO2dCQUNGLENBQUMsQ0FBQyxPQUFPNkssQ0FBQyxFQUFFO2tCQUNWLE1BQU0sSUFBSXBELEtBQUssd0JBQXdCO2dCQUN6Qzs7Z0JBRUE7O2dCQUVBO2dCQUNBLElBQU07a0JBQ0o2TTtnQkFDRixDQUFDLEdBQUc3VixRQUFRLENBQUNtSCxjQUFjLEVBQUU7Z0JBQzdCK25CLE9BQUksQ0FBQ2hVLFVBQVUsQ0FBQ3JGLEtBQUssRUFBRTtrQkFDckJ6TyxPQUFPLEVBQUU7Z0JBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRUosS0FBSyxDQUFDO2dCQUNOLElBQU07a0JBQ0ora0IsWUFBWTtrQkFDWkMsU0FBUztrQkFDVGtELGlCQUFpQjtrQkFDakJsRTtnQkFDRixDQUFDLEdBQUdsckIsZ0JBQWdCLENBQUNtc0IsY0FBYyxDQUFDNkMsT0FBSSxDQUFDam9CLFNBQVMsRUFBRWlvQixPQUFJLENBQUMvakIsU0FBUyxFQUFFcUcsU0FBUyxDQUFDO2dCQUM5RSxJQUFJbEssYUFBYSxHQUFHO2tCQUNsQmdsQixRQUFRLEVBQUU0QyxPQUFJLENBQUNqb0IsU0FBUztrQkFDeEJTLFVBQVUsRUFBRTBrQixTQUFTO2tCQUNyQmhrQixnQkFBZ0IsRUFBRXlQLFVBQVU7a0JBQzVCcFAsaUJBQWlCLEVBQUU2bUIsaUJBQWlCLGFBQWpCQSxpQkFBaUIsdUJBQWpCQSxpQkFBaUIsQ0FBRTdtQixpQkFBaUI7a0JBQ3ZEQyxjQUFjLEVBQUU0bUIsaUJBQWlCLGFBQWpCQSxpQkFBaUIsdUJBQWpCQSxpQkFBaUIsQ0FBRTVtQixjQUFjO2tCQUNqRDBpQixRQUFRO2tCQUNSbUIsUUFBUSxFQUFFMkMsT0FBSSxDQUFDL2pCLFNBQVM7a0JBQ3hCb2tCLGdCQUFnQixFQUFFL2Q7Z0JBQ3BCLENBQUM7Z0JBQ0QsTUFBTTBkLE9BQUksQ0FBQzFDLGdCQUFnQixDQUFDbGxCLGFBQWEsRUFBRXVRLFVBQVUsRUFBRXlYLGlCQUFpQixhQUFqQkEsaUJBQWlCLHVCQUFqQkEsaUJBQWlCLENBQUU3bUIsaUJBQWlCLEVBQUU2bUIsaUJBQWlCLGFBQWpCQSxpQkFBaUIsdUJBQWpCQSxpQkFBaUIsQ0FBRTVtQixjQUFjLEVBQUUsR0FBRyxDQUFDO2dCQUNwSXdtQixPQUFJLENBQUM3bkIsYUFBYSxDQUFDQyxhQUFhLENBQUM7Z0JBQ2pDLElBQUk0bkIsT0FBSSxDQUFDbm9CLFNBQVMsQ0FBQ3ZFLGVBQWUsRUFBRTtrQkFDbEM4RSxhQUFhLENBQUNtbEIsUUFBUSxHQUFHTixZQUFZO2dCQUN2QztnQkFDQSxNQUFNK0MsT0FBSSxDQUFDeEMsa0JBQWtCLENBQUNwbEIsYUFBYSxDQUFDO2dCQUM1QzRuQixPQUFJLENBQUMzaUIsYUFBYSxFQUFFO2dCQUNwQmMsT0FBTyxFQUFFO2NBQ1g7WUFDRixDQUFDO1lBQUEsZ0JBdkRLbVcsc0JBQXNCQSxDQUFBO2NBQUEsT0FBQTZMLE1BQUEsQ0FBQXZnQixLQUFBLE9BQUFoRSxTQUFBO1lBQUE7VUFBQSxHQXVEM0I7VUFDRCxDQUFBc2tCLHFCQUFBLEdBQUFGLE9BQUksQ0FBQy9KLGVBQWUsY0FBQWlLLHFCQUFBLHVCQUFwQkEscUJBQUEsQ0FBc0I5Z0IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFa1Ysc0JBQXNCLENBQUM7UUFDekUsQ0FBQyxDQUFDLE9BQU9wWCxDQUFDLEVBQUU7VUFDVixJQUFJaVIsWUFBWSxHQUFHLGtCQUFrQjtVQUNyQyxJQUFJalIsQ0FBQyxDQUFDd04sT0FBTyxFQUFFO1lBQ2J5RCxZQUFZLElBQUksSUFBSSxHQUFHalIsQ0FBQyxDQUFDd04sT0FBTztVQUNsQztVQUNBLEtBQUssQ0FBQztVQUNOLE1BQU1zVixPQUFJLENBQUM1UixrQkFBa0IsQ0FBQyxPQUFPLEVBQUVsUixDQUFDLEVBQUVpUixZQUFZLENBQUMsQ0FBQyxDQUFDO1VBQ3pENlIsT0FBSSxDQUFDM2lCLGFBQWEsRUFBRTtVQUNwQm9QLE1BQU0sRUFBRTtRQUNWO01BQ0YsQ0FBQztNQUFBLGlCQUFBNlQsR0FBQSxFQUFBQyxHQUFBO1FBQUEsT0FBQU4sTUFBQSxDQUFBcmdCLEtBQUEsT0FBQWhFLFNBQUE7TUFBQTtJQUFBLElBQUM7RUFDSjtFQUNBeWdCLDBCQUEwQkEsQ0FBQzNULE9BQU8sRUFBRThYLFVBQVUsRUFBRTtJQUM5QztJQUNBLElBQUksSUFBSSxDQUFDdmtCLFNBQVMsSUFBSSxJQUFJLENBQUNwRSxTQUFTLENBQUNoQixnQkFBZ0IsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDZ0IsU0FBUyxDQUFDekQsWUFBWSxJQUFJLElBQUksQ0FBQ3dYLHdCQUF3QixHQUFHLENBQUMsRUFBRTtNQUM3SCxJQUFJNlUsbUJBQW1CLEdBQUc1ZSxJQUFJLENBQUN1RyxHQUFHLENBQUMsSUFBSSxDQUFDdlEsU0FBUyxDQUFDaEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDK1Usd0JBQXdCLENBQUM7TUFDbEcsSUFBSSxJQUFJLENBQUNFLG1CQUFtQixDQUFDL1AsTUFBTSxLQUFLMGtCLG1CQUFtQixFQUFFO1FBQzNELElBQUksQ0FBQzNVLG1CQUFtQixDQUFDNFUsS0FBSyxFQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDQyxXQUFXLEVBQUUsSUFBSSxDQUFDQyx5QkFBeUIsQ0FBQ0YsS0FBSyxFQUFFO01BQzlEO01BQ0EsSUFBSSxDQUFDNVUsbUJBQW1CLENBQUNzRixJQUFJLENBQUMxSSxPQUFPLENBQUM7TUFDdEMsSUFBSSxJQUFJLENBQUNpWSxXQUFXLEVBQUU7UUFDcEIsSUFBSSxDQUFDQyx5QkFBeUIsQ0FBQ3hQLElBQUksQ0FBQ29QLFVBQVUsQ0FBQztRQUMvQyxLQUFLLENBQUMsQ0FBQyxDQUFDO01BQ1Y7O01BRUEsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNWO0VBQ0Y7O0VBRU1oRCxrQkFBa0JBLENBQUNwbEIsYUFBYSxFQUFFO0lBQUEsSUFBQXlvQixPQUFBO0lBQUEsT0FBQTNwQixpQkFBQTtNQUN0QztNQUNBLElBQUlrQixhQUFhLENBQUNpbEIsUUFBUSxFQUFFO1FBQzFCLE1BQU13RCxPQUFJLENBQUNqa0IsYUFBYSxDQUFDaWtCLE9BQUksQ0FBQzd0QixXQUFXLENBQUNaLG9CQUFvQixDQUFDO01BQ2pFLENBQUMsTUFBTTtRQUNMLE1BQU15dUIsT0FBSSxDQUFDamtCLGFBQWEsQ0FBQ2lrQixPQUFJLENBQUM3dEIsV0FBVyxDQUFDYixXQUFXLENBQUM7TUFDeEQ7TUFDQSxJQUFNbU8sTUFBTSxHQUFHO1FBQ2J3Z0IsWUFBWSxFQUFFO1VBQ1pDLFdBQVcsRUFBRSxNQUFNO1VBQ25CQyxjQUFjLEVBQUU7UUFDbEIsQ0FBQztRQUNEMWdCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCbEksYUFBYSxFQUFFQTtNQUNqQixDQUFDO01BQ0QsSUFBSXlvQixPQUFJLENBQUMxa0IsV0FBVyxFQUFFO1FBQ3BCMGtCLE9BQUksQ0FBQzFrQixXQUFXLENBQUNtRSxNQUFNLENBQUM7UUFDeEJ1Z0IsT0FBSSxDQUFDMWtCLFdBQVcsR0FBRyxJQUFJO01BQ3pCLENBQUMsTUFBTTtRQUNMLEtBQUssQ0FBQztNQUNSO0lBQUM7RUFDSDtFQUNNaVMsa0JBQWtCQSxDQUFDNlMsVUFBVSxFQUFFL2pCLENBQUMsRUFBRWlSLFlBQVksRUFBRTtJQUFBLElBQUErUyxPQUFBO0lBQUEsT0FBQWhxQixpQkFBQTtNQUNwRCxNQUFNZ3FCLE9BQUksQ0FBQ3RrQixhQUFhLENBQUNza0IsT0FBSSxDQUFDbHVCLFdBQVcsQ0FBQ1gsVUFBVSxDQUFDO01BQ3JELElBQUk4dUIsV0FBVyxHQUFHLEVBQUU7TUFDcEIsSUFBSWprQixDQUFDLGFBQURBLENBQUMsZUFBREEsQ0FBQyxDQUFFc0YsUUFBUSxFQUFFLEVBQUUyZSxXQUFXLElBQUlqa0IsQ0FBQyxDQUFDc0YsUUFBUSxFQUFFO01BQzlDLElBQUl0RixDQUFDLGFBQURBLENBQUMsZUFBREEsQ0FBQyxDQUFFa2tCLEtBQUssRUFBRUQsV0FBVyxJQUFJamtCLENBQUMsQ0FBQ2trQixLQUFLO01BQ3BDLElBQU05Z0IsTUFBTSxHQUFHO1FBQ2J3Z0IsWUFBWSxFQUFFO1VBQ1pDLFdBQVcsRUFBRUUsVUFBVTtVQUN2QkQsY0FBYyxFQUFFN1M7UUFDbEIsQ0FBQztRQUNEN04sTUFBTSxFQUFFLFFBQVE7UUFDaEJsSSxhQUFhLEVBQUU7VUFDYmdsQixRQUFRLEVBQUU4RCxPQUFJLENBQUNucEIsU0FBUztVQUN4QnNwQixZQUFZLEVBQUVGO1FBQ2hCO01BQ0YsQ0FBQztNQUNELElBQUlELE9BQUksQ0FBQzlrQixXQUFXLEVBQUU7UUFDcEI4a0IsT0FBSSxDQUFDOWtCLFdBQVcsQ0FBQ2tFLE1BQU0sQ0FBQztRQUN4QjRnQixPQUFJLENBQUM5a0IsV0FBVyxHQUFHLElBQUk7TUFDekIsQ0FBQyxNQUFNO1FBQ0wsS0FBSyxDQUFDO01BQ1I7SUFBQztFQUNIO0VBQ01XLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQXVrQixPQUFBO0lBQUEsT0FBQXBxQixpQkFBQTtNQUN2QixJQUFNcXFCLGdCQUFnQixHQUFHRCxPQUFJLENBQUMzcEIsbUJBQW1CLEVBQUU7TUFDbkQsSUFBSSxDQUFDMnBCLE9BQUksQ0FBQ25xQixXQUFXLEVBQUUsSUFBSW9xQixnQkFBZ0IsS0FBS0QsT0FBSSxDQUFDenVCLGlCQUFpQixDQUFDTixXQUFXLEVBQUU7UUFDbEYsS0FBSyxDQUFDO1FBQ04sTUFBTSt1QixPQUFJLENBQUN2cUIsVUFBVSxFQUFFO01BQ3pCLENBQUMsTUFBTTtRQUNMLElBQUl3cUIsZ0JBQWdCLEtBQUtELE9BQUksQ0FBQ3p1QixpQkFBaUIsQ0FBQ0wsT0FBTyxFQUFFO1VBQ3ZELEtBQUssQ0FBQztVQUNOLE1BQU04dUIsT0FBSSxDQUFDdmpCLGVBQWUsRUFBRTtRQUM5QixDQUFDLE1BQU0sSUFBSXdqQixnQkFBZ0IsS0FBS0QsT0FBSSxDQUFDenVCLGlCQUFpQixDQUFDUCxJQUFJLEVBQUU7VUFDM0QsS0FBSyxDQUFDO1FBQ1IsQ0FBQyxNQUFNO1VBQ0wsTUFBTSxJQUFJd0gsS0FBSyw2Q0FBQTJYLE1BQUEsQ0FBNkM2UCxPQUFJLENBQUNucUIsV0FBVyxFQUFFLDJCQUFBc2EsTUFBQSxDQUF3QjZQLE9BQUksQ0FBQzNwQixtQkFBbUIsRUFBRSxFQUFHO1FBQ3JJO01BQ0Y7SUFBQztFQUNIOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFTXNGLGVBQWVBLENBQUEsRUFBRztJQUFBLElBQUF1a0IsT0FBQTtJQUFBLE9BQUF0cUIsaUJBQUE7TUFDdEJzcUIsT0FBSSxDQUFDam1CLE9BQU8sQ0FBQyxXQUFXLENBQUM7TUFDekJpbUIsT0FBSSxDQUFDcGtCLE9BQU8sRUFBRTtNQUNkLE1BQU1va0IsT0FBSSxDQUFDaFUseUJBQXlCLEVBQUU7TUFDdEMsTUFBTWdVLE9BQUksQ0FBQ2hHLG1CQUFtQixFQUFFO01BQ2hDLEtBQUssQ0FBQztJQUFDO0VBQ1Q7RUFDTXhlLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQXlrQixPQUFBO0lBQUEsT0FBQXZxQixpQkFBQTtNQUN4QnVxQixPQUFJLENBQUNsbUIsT0FBTyxDQUFDLGFBQWEsQ0FBQztNQUMzQmttQixPQUFJLENBQUNya0IsT0FBTyxFQUFFO01BQ2Rxa0IsT0FBSSxDQUFDNXBCLFNBQVMsQ0FBQ3pELFlBQVksR0FBRyxJQUFJO01BQ2xDLE1BQU1xdEIsT0FBSSxDQUFDalUseUJBQXlCLEVBQUU7TUFDdEMsTUFBTWlVLE9BQUksQ0FBQzFCLHFCQUFxQixFQUFFO01BQ2xDLEtBQUssQ0FBQztJQUFDO0VBQ1Q7RUFDTTJCLGNBQWNBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFBQSxPQUFBenFCLGlCQUFBO01BQ3JCLEtBQUssQ0FBQztNQUNOeXFCLE9BQUksQ0FBQ3hILGlCQUFpQixHQUFHLEtBQUs7TUFDOUJ3SCxPQUFJLENBQUMxSCxRQUFRLEVBQUU7TUFDZixNQUFNMEgsT0FBSSxDQUFDMWtCLGVBQWUsRUFBRTtJQUFDO0VBQy9CO0VBQ0FnZCxRQUFRQSxDQUFBLEVBQUc7SUFDVCxJQUFJLENBQUN5QixVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBTTtNQUNKOVU7SUFDRixDQUFDLEdBQUc5VixRQUFRLENBQUNtSCxjQUFjLEVBQUU7SUFDN0IsSUFBSTJPLE1BQU0sRUFBRTtNQUNWLElBQU1nYixhQUFhLEdBQUdoYixNQUFNLENBQUMyQixVQUFVLENBQUMsSUFBSSxFQUFFO1FBQzVDQyxrQkFBa0IsRUFBRTtNQUN0QixDQUFDLENBQUM7TUFDRm9aLGFBQWEsQ0FBQ0MsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUVqYixNQUFNLENBQUNyUyxLQUFLLEVBQUVxUyxNQUFNLENBQUM0QyxNQUFNLENBQUM7SUFDNUQ7RUFDRjtFQUNBNkUsVUFBVUEsQ0FBQSxFQUFHO0lBQ1h5VCxvQkFBb0IsQ0FBQyxJQUFJLENBQUNDLHlCQUF5QixDQUFDO0lBQ3BELElBQUksSUFBSSxDQUFDblUsUUFBUSxFQUFFO01BQ2pCLElBQUksQ0FBQ0EsUUFBUSxDQUFDb1UsSUFBSSxJQUFJLElBQUksQ0FBQ3BVLFFBQVEsQ0FBQ29VLElBQUksRUFBRTtNQUMxQyxJQUFJQyxNQUFNLEdBQUcsSUFBSSxDQUFDclUsUUFBUSxDQUFDc1UsU0FBUyxJQUFJLElBQUksQ0FBQ3RVLFFBQVEsQ0FBQ3NVLFNBQVMsRUFBRTtNQUNqRSxLQUFLLENBQUM7TUFDTixJQUFJRCxNQUFNLElBQUlBLE1BQU0sQ0FBQ2xtQixNQUFNLEVBQUU7UUFDM0JrbUIsTUFBTSxDQUFDRSxPQUFPLENBQUNDLEtBQUssSUFBSUEsS0FBSyxDQUFDSixJQUFJLEVBQUUsQ0FBQztNQUN2QztNQUNBLElBQUksQ0FBQ3BVLFFBQVEsR0FBRyxJQUFJO0lBQ3RCO0VBQ0Y7O0VBRUE7RUFDQXhRLE9BQU9BLENBQUEsRUFBRztJQUNSLElBQUksQ0FBQzZJLHVCQUF1QixFQUFFO0lBQzlCLElBQUksQ0FBQ04sZUFBZSxFQUFFO0lBQ3RCLElBQUksQ0FBQ0csa0JBQWtCLEVBQUU7SUFDekIsSUFBSSxDQUFDRSx5QkFBeUIsRUFBRTtFQUNsQztFQUNBcWMsaUJBQWlCQSxDQUFBLEVBQUc7SUFDbEIsSUFBSSxDQUFDM3FCLGFBQWEsR0FBRyxLQUFLO0lBQzFCLElBQUksQ0FBQ0gsV0FBVyxHQUFHLEtBQUs7SUFDeEIsSUFBSSxDQUFDRixrQkFBa0IsR0FBRyxJQUFJLENBQUN4RSxpQkFBaUIsQ0FBQ04sV0FBVztJQUM1RCxJQUFJLENBQUM0bkIsaUJBQWlCLEdBQUcsS0FBSztFQUNoQztFQUNBN00sbUNBQW1DQSxDQUFBLEVBQUc7SUFDcEMsSUFBSSxJQUFJLENBQUNDLDhCQUE4QixFQUFFO01BQ3ZDK1UsWUFBWSxDQUFDLElBQUksQ0FBQy9VLDhCQUE4QixDQUFDO01BQ2pELElBQUksQ0FBQ0EsOEJBQThCLEdBQUcsSUFBSTtJQUM1QztFQUNGO0FBQ0Y7QUFDQSxlQUFlaGMsT0FBTyJ9
