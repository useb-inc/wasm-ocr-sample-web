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
        var excludeList = ['complete', 'result_scan_type', 'color_point', 'found_face', 'specular_ratio', 'start_time', 'end_time', 'fd_confidence', 'id_truth', 'id_truth_retry_count'];

        // prettier-ignore
        if (this.__options.useEncryptAllMode) {
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
          var _encrypted2 = {
            ocr_result: _.omit(review_result.ocr_result, excludeList),
            ocr_origin_image: review_result.ocr_origin_image,
            ocr_masking_image: review_result.ocr_masking_image,
            ocr_face_image: review_result.ocr_face_image
          };
          review_result.encrypted_overall = {
            data: this.__encryptScanResult(JSON.stringify(_encrypted2)),
            timestamp: Date.now()
          };
        }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VFbmNyeXB0T3ZlcmFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlQ3JvcHBpbmciLCJ1c2VJbWFnZVdhcnBpbmciLCJ1c2VDb21wcmVzc0ltYWdlIiwidXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoIiwidXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSIsInVzZVRvcFVJIiwidXNlVG9wVUlUZXh0TXNnIiwidXNlTWlkZGxlVUkiLCJ1c2VNaWRkbGVVSVRleHRNc2ciLCJ1c2VCb3R0b21VSSIsInVzZUJvdHRvbVVJVGV4dE1zZyIsInVzZVByZXZpZXdVSSIsInVzZUNhcHR1cmVVSSIsInByZWxvYWRpbmdVSVRleHRNc2ciLCJmcmFtZUJvcmRlclN0eWxlIiwid2lkdGgiLCJyYWRpdXMiLCJzdHlsZSIsIm5vdF9yZWFkeSIsInJlYWR5IiwiZGV0ZWN0X3N1Y2Nlc3MiLCJkZXRlY3RfZmFpbGVkIiwibWFudWFsX2NhcHR1cmVfc3VjY2VzcyIsIm1hbnVhbF9jYXB0dXJlX2ZhaWxlZCIsInJlY29nbml6ZWQiLCJyZWNvZ25pemVkX3dpdGhfc3NhIiwib2NyX3N1Y2Nlc3MiLCJvY3Jfc3VjY2Vzc193aXRoX3NzYSIsIm9jcl9mYWlsZWQiLCJ1c2VNYXNrRnJhbWVDb2xvckNoYW5nZSIsIm1hc2tGcmFtZVN0eWxlIiwiY2xpcF9mcmFtZSIsImJhc2VfY29sb3IiLCJ1c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlIiwidXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlIiwic3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQiLCJ1c2VGb3JjZUNvbXBsZXRlVUkiLCJjYXB0dXJlQnV0dG9uU3R5bGUiLCJzdHJva2VfY29sb3IiLCJyZXNvdXJjZUJhc2VVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsImRldmljZUxhYmVsIiwidmlkZW9UYXJnZXRJZCIsInJvdGF0aW9uRGVncmVlIiwibWlycm9yTW9kZSIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwiLCJjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0IiwiY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhIiwiY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJzc2FSZXRyeVR5cGUiLCJzc2FSZXRyeVBpdm90Iiwic3NhTWF4UmV0cnlDb3VudCIsInVzZURlYnVnQWxlcnQiLCJmb3JjZV93YXNtX3JlbG9hZCIsImZvcmNlX3dhc21fcmVsb2FkX2ZsYWciLCJwcmVsb2FkaW5nIiwib25QcmVsb2FkZWQiLCJfdGhpcyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiaXNQcmVsb2FkZWQiLCJzaG93T0NSTG9hZGluZ1VJIiwiX19wcmVsb2FkaW5nU3RhdHVzIiwiX19sb2FkUmVzb3VyY2VzIiwiX19wcmVsb2FkZWQiLCJoaWRlT0NSTG9hZGluZ1VJIiwiaXNJbml0aWFsaXplZCIsIl9faW5pdGlhbGl6ZWQiLCJnZXRQcmVsb2FkaW5nU3RhdHVzIiwiaXNFbmNyeXB0TW9kZSIsIl9fb3B0aW9ucyIsImlzQ3JlZGl0Q2FyZCIsIl9fb2NyVHlwZSIsInByZWxvYWRpbmdVSVdyYXAiLCJnZXRPQ1JFbGVtZW50cyIsImRpc3BsYXkiLCJlbmNyeXB0UmVzdWx0IiwicmV2aWV3X3Jlc3VsdCIsIl9faXNTdXBwb3J0V2FzbSIsImluY2x1ZGVMaXN0IiwiZW5jcnlwdGVkIiwib2NyX3Jlc3VsdCIsIl8iLCJ0b1BhaXJzIiwicGljayIsInJlZHVjZSIsImFjYyIsIl9yZWYiLCJrZXkiLCJ2YWx1ZSIsIl9fZW5jcnlwdFNjYW5SZXN1bHQiLCJvY3Jfb3JpZ2luX2ltYWdlIiwiX29iamVjdFNwcmVhZCIsImV4Y2x1ZGVMaXN0Iiwib21pdCIsIl9yZWYyIiwib2NyX21hc2tpbmdfaW1hZ2UiLCJvY3JfZmFjZV9pbWFnZSIsImVuY3J5cHRlZF9vdmVyYWxsIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibm93IiwiZ2V0T0NSRW5naW5lIiwiX19PQ1JFbmdpbmUiLCJpbml0Iiwic2V0dGluZ3MiLCJsaWNlbnNlS2V5IiwiRXJyb3IiLCJfX2xpY2Vuc2UiLCJtZXJnZWRPcHRpb25zIiwibWVyZ2UiLCJzZXRPcHRpb24iLCJfX3dpbmRvd0V2ZW50QmluZCIsIl9fZGV2aWNlSW5mbyIsImdldE9zVmVyc2lvbiIsImdldE9wdGlvbiIsImdldE9jclR5cGUiLCJ0eXBlIiwiX19vY3JUeXBlTnVtYmVyVG9TdHJpbmciLCJnZXQiLCJnZXRPY3JUeXBlTnVtYmVyIiwic3RyaW5nIiwiX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIiLCJnZXRVSU9yaWVudGF0aW9uIiwiX191aU9yaWVudGF0aW9uIiwiZ2V0VmlkZW9PcmllbnRhdGlvbiIsIl9fdmlkZW9PcmllbnRhdGlvbiIsImNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlIiwiX3RoaXMyIiwiX19pc1N3aXRjaFRvU2VydmVyTW9kZSIsImxhdGVuY3lQZXIxMDBtcyIsIm1lYXN1cmVSZXBvcnQiLCJfX2RlYnVnIiwicGFyc2VGbG9hdCIsInN0YXJ0T0NSIiwib25TdWNjZXNzIiwib25GYWlsdXJlIiwiX2FyZ3VtZW50cyIsImFyZ3VtZW50cyIsIl90aGlzMyIsIm9uSW5Qcm9ncmVzc0NoYW5nZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9fc3NhTW9kZSIsImluZGV4T2YiLCJfX29uU3VjY2VzcyIsIl9fb25GYWlsdXJlIiwiX19vbkluUHJvZ3Jlc3NDaGFuZ2UiLCJfX3RvcFVJIiwidG9wVUkiLCJfX21pZGRsZVVJIiwibWlkZGxlVUkiLCJfX2JvdHRvbVVJIiwiYm90dG9tVUkiLCJfX2NoYW5nZVN0YWdlIiwiX19wcmVwcm9jZXNzIiwiX19zZXR1cERvbUVsZW1lbnRzIiwiX19wcmVsb2FkaW5nV2FzbSIsIl9fc3RhcnRTY2FuU2VydmVyIiwiX19zdGFydFNjYW5XYXNtIiwiZSIsInN0b3BPQ1IiLCJjbGVhbnVwIiwiX19jbG9zZUNhbWVyYSIsInNldElnbm9yZUNvbXBsZXRlIiwidmFsIiwiZW5jcnlwdCIsInBsYWluU3RyIiwicmVzdGFydE9DUiIsIm9jclR5cGUiLCJfYXJndW1lbnRzMiIsIl90aGlzNCIsImlzU3dpdGNoTW9kZSIsIl9fd2FpdFByZWxvYWRlZCIsIl90aGlzNSIsIndhaXRpbmdSZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjaGVjayIsInNldFRpbWVvdXQiLCJjb252ZXJ0VHlwZVRvTnVtYmVyIiwib3B0aW9uIiwiaXNOYU4iLCJwYXJzZUludCIsImNvbnZlcnRUeXBlVG9GbG9hdCIsIl90aGlzXyIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsInNraXBUb3VjaEFjdGlvbmZvclpvb20iLCJldiIsInRvdWNoZXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwib25iZWZvcmV1bmxvYWQiLCJfX3BhZ2VFbmQiLCJoYW5kbGVSZXNpemUiLCJfcmVmNCIsIl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplIiwiX190aHJvdHRsaW5nUmVzaXplVGltZXIiLCJhcHBseSIsIl9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5IiwibXNnIiwiX19zbGVlcCIsIm1zIiwiX19ibG9iVG9CYXNlNjQiLCJibG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJfX2Jhc2U2NHRvQmxvYiIsImJhc2U2NCIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiYWIiLCJBcnJheUJ1ZmZlciIsImlhIiwiVWludDhBcnJheSIsImkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsIl9fY29tcHJlc2VCYXNlNjRJbWFnZSIsIm9wdGlvbnMiLCJjb25zdGFudE51bWJlciIsIl90aGlzNiIsImJsb2JGaWxlIiwiY29tcHJlc3NlZCIsImNvbXByZXNzSW1hZ2UiLCJjb21wcmVzc2lvblJhdGlvIiwiTWF0aCIsInJvdW5kIiwic2l6ZSIsIl9fZ2V0U3RyaW5nT25XYXNtSGVhcCIsImxlbmd0aEJ5dGVzIiwibGVuZ3RoQnl0ZXNVVEY4IiwiX19zdHJpbmdPbldhc21IZWFwIiwiX21hbGxvYyIsInN0cmluZ1RvVVRGOCIsIm9jclJlc3VsdCIsInN0cmluZ09uV2FzbUhlYXAiLCJ0b1N0cmluZyIsImpzb25TdHJpbmciLCJfZnJlZSIsIl9fc2V0VmlkZW9SZXNvbHV0aW9uIiwidmlkZW9FbGVtZW50IiwiX3RoaXM3IiwiaXNTdXBwb3J0ZWRSZXNvbHV0aW9uIiwicmVzb2x1dGlvblRleHQiLCJfX2NhbVNldENvbXBsZXRlIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwic3JjT2JqZWN0IiwiX192aWRlb1dpZHRoIiwiX192aWRlb0hlaWdodCIsIl9fZ2V0U2Nhbm5lckFkZHJlc3MiLCJfX29jclR5cGVMaXN0IiwiaW5jbHVkZXMiLCJhZGRyZXNzIiwiZGVzdHJveUNhbGxiYWNrIiwiZ2V0SURDYXJkU2Nhbm5lciIsImRlc3Ryb3lJRENhcmRTY2FubmVyIiwiZ2V0UGFzc3BvcnRTY2FubmVyIiwiZGVzdHJveVBhc3Nwb3J0U2Nhbm5lciIsImdldEFsaWVuU2Nhbm5lciIsImRlc3Ryb3lBbGllblNjYW5uZXIiLCJnZXRDcmVkaXRTY2FubmVyIiwiZGVzdHJveUNyZWRpdFNjYW5uZXIiLCJfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19yZXRyeUNvdW50R2V0QWRkcmVzcyIsIl9fZ2V0QnVmZmVyIiwiX19CdWZmZXIiLCJfX3Jlc29sdXRpb25XaWR0aCIsIl9fcmVzb2x1dGlvbkhlaWdodCIsIl9fcmVzdWx0QnVmZmVyIiwiX19tYXNrSW5mb1Jlc3VsdEJ1ZiIsIl9fZ2V0SW1hZ2VCYXNlNjQiLCJtYXNrTW9kZSIsImltZ01vZGUiLCJfYXJndW1lbnRzMyIsIl90aGlzOCIsImltZ1R5cGUiLCJlbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UiLCJlbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UiLCJqcGdTaXplIiwiZ2V0RW5jb2RlZEpwZ1NpemUiLCJqcGdQb2ludGVyIiwiZ2V0RW5jb2RlZEpwZ0J1ZmZlciIsInJlc3VsdFZpZXciLCJIRUFQOCIsImJ1ZmZlciIsImRlc3Ryb3lFbmNvZGVkSnBnIiwiX19kZXN0cm95QnVmZmVyIiwiX19kZXN0cm95UmVzdWx0QnVmZmVyIiwiX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lQcmV2SW1hZ2UiLCJfX1ByZXZJbWFnZSIsIl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAiLCJfX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcyIsIl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayIsIl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlIiwiX3RoaXM5IiwiX19nZXRSb3RhdGlvbkRlZ3JlZSIsIl9fZ2V0TWlycm9yTW9kZSIsIl9fY3JvcEltYWdlRnJvbVZpZGVvIiwiX3RoaXMxMCIsImNhbGNSZXNvbHV0aW9uX3ciLCJjYWxjUmVzb2x1dGlvbl9oIiwidmlkZW8iLCJjYW52YXMiLCJyb3RhdGlvbkNhbnZhcyIsImNhbGNDYW52YXMiLCJjYWxjVmlkZW9XaWR0aCIsImNhbGNWaWRlb0hlaWdodCIsImNhbGNWaWRlb0NsaWVudFdpZHRoIiwiY2xpZW50V2lkdGgiLCJjYWxjVmlkZW9DbGllbnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoIiwiX19jcm9wSW1hZ2VTaXplV2lkdGgiLCJjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCIsIl9fY3JvcEltYWdlU2l6ZUhlaWdodCIsImNhbGNWaWRlb09yaWVudGF0aW9uIiwiaXNBbGllbkJhY2siLCJfX2lzUm90YXRlZDkwb3IyNzAiLCJjYWxjTWF4U1dpZHRoIiwiY2FsY01heFNIZWlnaHQiLCJzeCIsInN5IiwicmF0aW8iLCJzV2lkdGgiLCJtaW4iLCJzSGVpZ2h0IiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY2FsY0NvbnRleHQiLCJnZXRDb250ZXh0Iiwid2lsbFJlYWRGcmVxdWVudGx5IiwiZHJhd0ltYWdlIiwiaW1nRGF0YSIsImltZ0RhdGFVcmwiLCJnZXRJbWFnZURhdGEiLCJ0b0RhdGFVUkwiLCJfX3JvdGF0ZSIsImRlZ3JlZSIsImltZyIsIkltYWdlIiwidGVtcENhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInRlbXBDb250ZXh0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsIm5ld0ltYWdlRGF0YSIsInJlc3RvcmUiLCJfX2lzQ2FyZGJveERldGVjdGVkIiwiX2FyZ3VtZW50czQiLCJfdGhpczExIiwiYm94VHlwZSIsInJldHJ5SW1nIiwic2V0Iiwia29yIiwiYWxpZW4iLCJwYXNzcG9ydCIsImRldGVjdF9pZGNhcmRfb3B0IiwiZGV0ZWN0X2lkY2FyZCIsIm1lc3NhZ2UiLCJfX3N0YXJ0UmVjb2duaXRpb24iLCJzc2FNb2RlIiwiaXNTZXRJZ25vcmVDb21wbGV0ZSIsIl90aGlzMTIiLCJyZXN1bHRCdWZmZXIiLCJyZWNvZ25pdGlvbiIsIl9yZWY3IiwiX29jclJlc3VsdCIsIl9vY3JSZXN1bHQyIiwic2NhbklEQ2FyZCIsInNjYW5QYXNzcG9ydCIsInNjYW5BbGllbiIsInNjYW5BbGllbkJhY2siLCJzY2FuQ3JlZGl0IiwiX19jc3ZUb09iamVjdCIsImNvbXBsZXRlIiwiX19tYW51YWxPQ1JSZXRyeUNvdW50IiwiX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50IiwicXVldWVJZHgiLCJfX2RldGVjdGVkQ2FyZFF1ZXVlIiwiX19ibHVyQ2FwdHVyZUJ1dHRvbiIsIl9fc2V0U3R5bGUiLCJfeCIsIm9yaWdpbkltYWdlTW9kZSIsIk9DUl9JTUdfTU9ERSIsIm9yaWdpbkltYWdlIiwiT0NSX0lNR19NQVNLX01PREUiLCJtYXNrSW1hZ2UiLCJmYWNlSW1hZ2UiLCJtYXNrSW1hZ2VNb2RlIiwiX19zdGFydFRydXRoIiwicmVqZWN0Iiwic2NhblRydXRoIiwic3RyIiwicGFpcnMiLCJvYmoiLCJwYWlyIiwiX19nZXRNYXNrSW5mbyIsIm1hc2tJbmZvUmVzdWx0QnVmIiwiZ2V0TWFza1JlY3QiLCJfX3N0YXJ0VHJ1dGhSZXRyeSIsIl90aGlzMTMiLCJfX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfdGhpczE0IiwiX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIiLCJfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIiwiX3RoaXMxNSIsImlzUGFzc3BvcnQiLCJfX3NldHVwVmlkZW8iLCJfX3N0cmVhbSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBsYXkiLCJfX2FkanVzdFN0eWxlIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJuYW1lIiwiZXJyb3JNZXNzYWdlIiwiX19vbkZhaWx1cmVQcm9jZXNzIiwic3RvcFN0cmVhbSIsIl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50IiwiZWwiLCJhc3NpZ24iLCJfX2NoYW5nZU9DUlN0YXR1cyIsIl9fb2NyU3RhdHVzIiwiX2FyZ3VtZW50czUiLCJfdGhpczE2IiwiZm9yY2VVcGRhdGUiLCJyZWNvZ25pemVkSW1hZ2UiLCJfX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAiLCJfX2luUHJvZ3Jlc3NTdGVwIiwiZ3VpZGVCb3giLCJtYXNrQm94V3JhcCIsImNhcHR1cmVCdXR0b24iLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJfbWFza0JveFdyYXAkcXVlcnlTZWwiLCJxdWVyeVNlbGVjdG9yIiwiX2NhcHR1cmVCdXR0b24kcXVlcnlTIiwib2NyTW9kZSIsImNhbGwiLCJfX3VwZGF0ZVByZXZpZXdVSSIsIl9faGlkZVByZXZpZXdVSSIsInByZXZpZXdVSVdyYXAiLCJwcmV2aWV3SW1hZ2UiLCJpbWdTdHlsZSIsImNvbnRleHQiLCJfX2dldElucHV0RGV2aWNlcyIsIl90aGlzMTciLCJtZWRpYURldmljZXMiLCJkZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNhbWVyYSIsImRldmljZSIsImtpbmQiLCJJbnB1dERldmljZUluZm8iLCJnZXRDYXBhYmlsaXRpZXMiLCJfY2FwJGZhY2luZ01vZGUiLCJjYXAiLCJmYWNpbmdNb2RlIiwiX19mYWNpbmdNb2RlQ29uc3RyYWludCIsIl9kZXZpY2UkbGFiZWwiLCJpc1VsdHJhQ2FtZXJhUmVnIiwibGFiZWwiLCJwdXNoIiwiZGV2aWNlSWQiLCJSZWZlcmVuY2VFcnJvciIsIl9kZXZpY2UkbGFiZWwyIiwiaXNCYWNrQ2FtZXJhUmVnIiwiY29uY2F0IiwiY2hlY2tVSU9yaWVudGF0aW9uIiwiY3VycmVudCIsIm9jciIsImlzQ2hhbmdlZCIsIl9fcHJldlVpT3JpZW50YXRpb24iLCJfX2NsZWFyQ3VzdG9tVUkiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfdGhpczE4IiwidmlkZW9XcmFwIiwiZ3VpZGVCb3hXcmFwIiwicHJldmVudFRvRnJlZXplVmlkZW8iLCJjdXN0b21VSVdyYXAiLCJjYXB0dXJlVUlXcmFwIiwiY2FwdHVyZVVJIiwicHJldmlld1VJIiwic3dpdGNoVUlXcmFwIiwic3dpdGNoVUkiLCJwcmVsb2FkaW5nVUkiLCJyZW1vdmUiLCJvY3JTdHlsZSIsIndyYXBTdHlsZSIsIm1hcmdpbiIsIm92ZXJmbG93IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJtYXNrX2ZyYW1lIiwidmlkZW9TdHlsZSIsInJvdGF0ZUNzcyIsIm1pcnJvckNzcyIsInJvdGF0ZUFuZE1pcnJvckNzcyIsInRyYW5zZm9ybSIsImNhbnZhc1N0eWxlIiwibGVmdCIsInRvcCIsImJvcmRlciIsInJpZ2h0IiwiYm90dG9tIiwiY3VzdG9tVUlXcmFwU3R5bGUiLCJjYXB0dXJlVUlXcmFwU3R5bGUiLCJjdXJzb3IiLCJjYXB0dXJlQnV0dG9uU3JjU1ZHIiwiX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiIsInByZXZpZXdVSVdyYXBTdHlsZSIsInN3aXRjaFVJV3JhcFN0eWxlIiwic3dpdGNoSFRNTCIsInN3aXRjaENoZWNrYm94IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJfX29uQ2xpY2tTd2l0Y2hVSSIsIl9yZWYxMCIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsIl94MiIsIm9uY2UiLCJwcmVsb2FkaW5nVUlXcmFwU3R5bGUiLCJfX2luaXRTdHlsZSIsIl9fb2NyIiwiX19jYW52YXMiLCJfX3JvdGF0aW9uQ2FudmFzIiwiX192aWRlbyIsIl9fdmlkZW9XcmFwIiwiX19ndWlkZUJveCIsIl9fZ3VpZGVCb3hXcmFwIiwiX19tYXNrQm94V3JhcCIsIl9fcHJldmVudFRvRnJlZXplVmlkZW8iLCJfX2N1c3RvbVVJV3JhcCIsIl9fY2FwdHVyZVVJV3JhcCIsIl9fY2FwdHVyZVVJIiwiX19jYXB0dXJlQnV0dG9uIiwiX19wcmV2aWV3VUlXcmFwIiwiX19wcmV2aWV3VUkiLCJfX3ByZXZpZXdJbWFnZSIsIl9fc3dpdGNoVUlXcmFwIiwiX19zd2l0Y2hVSSIsIl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsIl90aGlzMTkiLCJjb25zdHJhaW50V2lkdGgiLCJjb25zdHJhaW50SGVpZ2h0IiwiaWRlYWwiLCJjb25zdHJhaW50cyIsImF1ZGlvIiwiem9vbSIsImZvY3VzTW9kZSIsIndoaXRlQmFsYW5jZU1vZGUiLCJnZXRVc2VyTWVkaWEiLCJzdHJlYW0iLCJzdHJlYW1TZXR0aW5ncyIsImdldFZpZGVvVHJhY2tzIiwiZ2V0U2V0dGluZ3MiLCJhc3BlY3RSYXRpbyIsIl90aGlzMjAiLCJiYXNlV2lkdGgiLCJiYXNlSGVpZ2h0Iiwic2Nhbm5lckZyYW1lUmF0aW8iLCJndWlkZUJveFdpZHRoIiwiZ3VpZGVCb3hIZWlnaHQiLCJjYWxjT2NyQ2xpZW50V2lkdGgiLCJjYWxjT2NyQ2xpZW50SGVpZ2h0IiwiZ3VpZGVCb3hSYXRpb0J5V2lkdGgiLCJfX2d1aWRlQm94UmF0aW9CeVdpZHRoIiwidmlkZW9SYXRpb0J5SGVpZ2h0IiwiX192aWRlb1JhdGlvQnlIZWlnaHQiLCJyZWR1Y2VkR3VpZGVCb3hXaWR0aCIsIl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbyIsInJlZHVjZWRHdWlkZUJveEhlaWdodCIsInBhZGRpbmciLCJ2aWRlb0lubmVyR2FwIiwiYmFja2dyb3VuZENvbG9yIiwibWFza0JveElubmVyIiwiciIsIm1hc2tCb3hJbm5lcldpZHRoIiwibWFza0JveElubmVySGVpZ2h0IiwiX3RoaXMyMSIsIl9fY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJhIiwiYiIsIm5ld1ZpZGVvV2lkdGgiLCJuZXdWaWRlb0hlaWdodCIsIm5ld1ZpZGVvUmF0aW9CeVdpZHRoIiwibmV3VmlkZW9SYXRpb0J5SGVpZ2h0IiwiY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzIiwiX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzIiwiY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQiLCJjYXB0dXJlVUlQYWRkaW5nQm90dG9tIiwicGFkZGluZ1RvcCIsImJhc2VsaW5lIiwic3VtIiwiaXRlbSIsImNoaWxkTm9kZXMiLCJzdG9wU2NhbiIsIl90aGlzMjIiLCJfX3Jlc291cmNlc0xvYWRlZCIsIl9faXNTdXBwb3J0U2ltZCIsImVudkluZm8iLCJvcyIsIm9zU2ltcGxlIiwidXNlYk9DUkVudkluZm8iLCJzZGtTdXBwb3J0RW52IiwicG9zdGZpeCIsInVybCIsImZldGNoIiwiaHJlZiIsInRoZW4iLCJyZXMiLCJ0ZXh0IiwicmVnZXgiLCJzb3VyY2UiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZXZhbCIsIm9uUnVudGltZUluaXRpYWxpemVkIiwiX3JlZjExIiwiX3gzIiwiX19zdGFydFNjYW5XYXNtSW1wbCIsIl90aGlzMjMiLCJfX2RldGVjdGVkIiwiX19hZGRyZXNzIiwiX19zc2FSZXRyeUNvdW50Iiwic2NhbiIsIl9yZWYxMiIsImlzRGV0ZWN0ZWRDYXJkIiwic3NhUmVzdWx0Iiwic3NhUmVzdWx0TGlzdCIsIm1hc2tJbmZvIiwicmVzb2x1dGlvbl93IiwicmVzb2x1dGlvbl9oIiwiX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUiLCJyZXRyeVN0YXJ0RGF0ZSIsIkZBS0UiLCJSRUFMIiwiRU5TRU1CTEUiLCJpc0NvbXBsZXRlZCIsIl9sb29wIiwiZXhlY3V0ZSIsIl9yZWYxMyIsIl9yZXQiLCJyZXRyeVdvcmtpbmdUaW1lIiwibGVnYWN5Rm9ybWF0IiwibmV3Rm9ybWF0IiwicGFyc2VPY3JSZXN1bHQiLCJvY3JfdHlwZSIsInNzYV9tb2RlIiwiX19jb21wcmVzc0ltYWdlcyIsIm9jcl9kYXRhIiwiX19vblN1Y2Nlc3NQcm9jZXNzIiwiX19yZWNvdmVyZWQiLCJfdGhpczI0IiwicmVzaXplUmF0aW8iLCJkZWZhdWx0T3B0aW9ucyIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiY29udmVydFNpemUiLCJ0YXJnZXRDb21wcmVzc1ZvbHVtZSIsIm1hc2tpbmdJbWFnZU9wdGlvbnMiLCJxdWFsaXR5IiwiX19yZXF1ZXN0R2V0QVBJVG9rZW4iLCJjcmVkZW50aWFsIiwiYXV0aFNlcnZlckluZm8iLCJiYXNlVXJsIiwiYm9keSIsIm1ldGhvZCIsImpzb24iLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInRva2VuIiwiY2F0Y2giLCJlcnIiLCJfX3JlcXVlc3RTZXJ2ZXJPQ1IiLCJfdGhpczI1IiwiX3JlZjE0Iiwib2NyU2VydmVyQmFzZVVybCIsImFwaVRva2VuIiwibXlIZWFkZXJzIiwiSGVhZGVycyIsImFwcGVuZCIsInBhcmFtIiwiaW1hZ2VfYmFzZTY0IiwibWFza19tb2RlIiwiZmFjZV9tb2RlIiwicmF3IiwicmVxdWVzdE9wdGlvbnMiLCJyZWRpcmVjdCIsIl94NCIsIl94NSIsIl9fc3RhcnRTY2FuU2VydmVySW1wbCIsIl90aGlzMjYiLCJfcmVmMTUiLCJfdGhpczI2JF9fY2FwdHVyZUJ1dHQiLCJfcmVmMTYiLCJiYXNlNjRJbWFnZVJlc3VsdCIsIl9fZGVidWdNb2RlIiwib2NyX2FwaV9yZXNwb25zZSIsIl9vY3JSZXN1bHQzIiwicmVzdWx0Q29kZSIsInJlc3VsdE1lc3NhZ2UiLCJzY2FubmVyX3R5cGUiLCJyZXN1bHRfY29kZSIsInJlc3VsdERldGFpbCIsIl94NiIsIl94NyIsImltZ0RhdGFVUkwiLCJsaW1pdFNhdmVJbWFnZUNvdW50Iiwic2hpZnQiLCJfX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0IiwiX3RoaXMyNyIsImFwaV9yZXNwb25zZSIsInJlc3VsdF9tZXNzYWdlIiwiX3RoaXMyOCIsImVycm9yRGV0YWlsIiwic3RhY2siLCJlcnJvcl9kZXRhaWwiLCJfdGhpczI5IiwicHJlbG9hZGluZ1N0YXR1cyIsIl90aGlzMzAiLCJfdGhpczMxIiwiX19yZWNvdmVyeVNjYW4iLCJfdGhpczMyIiwiY2FudmFzQ29udGV4dCIsImNsZWFyUmVjdCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiX19yZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCIsInN0b3AiLCJ0cmFja3MiLCJnZXRUcmFja3MiLCJmb3JFYWNoIiwidHJhY2siLCJyZXN0b3JlSW5pdGlhbGl6ZSIsImNsZWFyVGltZW91dCJdLCJzb3VyY2VzIjpbIm9jci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyogZ2xvYmFsLW1vZHVsZSAqL1xuaW1wb3J0IGRldGVjdG9yIGZyb20gJy4vaGVscGVycy9kZXRlY3Rvci5qcyc7XG5pbXBvcnQgdXNlYk9DUldBU01QYXJzZXIgZnJvbSAnLi9oZWxwZXJzL3VzZWItb2NyLXdhc20tcGFyc2VyLmpzJztcbmltcG9ydCB1c2ViT0NSQVBJUGFyc2VyIGZyb20gJy4vaGVscGVycy91c2ViLW9jci1hcGktcGFyc2VyLmpzJztcbmltcG9ydCB7IGlzU3VwcG9ydFdhc20sIG1lYXN1cmUsIHNpbWQsIHRocmVhZHMgfSBmcm9tICcuL2hlbHBlcnMvd2FzbS1mZWF0dXJlLWRldGVjdC5qcyc7XG5pbXBvcnQgSW1hZ2VVdGlsIGZyb20gJy4vaGVscGVycy9pbWFnZS11dGlsLmpzJztcbmxldCBpbnN0YW5jZTtcbmNsYXNzIFVzZUJPQ1Ige1xuICBJTl9QUk9HUkVTUyA9IHtcbiAgICBOT05FOiAnbm9uZScsXG4gICAgTk9UX1JFQURZOiAnbm90X3JlYWR5JyxcbiAgICBSRUFEWTogJ3JlYWR5JyxcbiAgICBDQVJEX0RFVEVDVF9TVUNDRVNTOiAnZGV0ZWN0X3N1Y2Nlc3MnLFxuICAgIENBUkRfREVURUNUX0ZBSUxFRDogJ2RldGVjdF9mYWlsZWQnLFxuICAgIE1BTlVBTF9DQVBUVVJFX1NVQ0NFU1M6ICdtYW51YWxfY2FwdHVyZV9zdWNjZXNzJyxcbiAgICBNQU5VQUxfQ0FQVFVSRV9GQUlMRUQ6ICdtYW51YWxfY2FwdHVyZV9mYWlsZWQnLFxuICAgIE9DUl9SRUNPR05JWkVEOiAncmVjb2duaXplZCcsXG4gICAgT0NSX1JFQ09HTklaRURfV0lUSF9TU0E6ICdyZWNvZ25pemVkX3dpdGhfc3NhJyxcbiAgICBPQ1JfU1VDQ0VTUzogJ29jcl9zdWNjZXNzJyxcbiAgICBPQ1JfU1VDQ0VTU19XSVRIX1NTQTogJ29jcl9zdWNjZXNzX3dpdGhfc3NhJyxcbiAgICBPQ1JfRkFJTEVEOiAnb2NyX2ZhaWxlZCdcbiAgfTtcbiAgT0NSX1NUQVRVUyA9IHtcbiAgICBOT1RfUkVBRFk6IC0xLFxuICAgIFJFQURZOiAwLFxuICAgIE9DUl9TVUNDRVNTOiAxLFxuICAgIERPTkU6IDJcbiAgfTtcbiAgUFJFTE9BRElOR19TVEFUVVMgPSB7XG4gICAgTk9UX1NUQVJURUQ6IC0xLFxuICAgIFNUQVJURUQ6IDAsXG4gICAgRE9ORTogMVxuICB9O1xuICBPQ1JfSU1HX01PREUgPSB7XG4gICAgV0FSUElORzogMCxcbiAgICBDUk9QUElORzogMSxcbiAgICBOT05FOiAyXG4gIH07XG4gIE9DUl9JTUdfTUFTS19NT0RFID0ge1xuICAgIEZBTFNFOiAwLFxuICAgIFRSVUU6IDFcbiAgfTtcblxuICAvKiogcHVibGljIHByb3BlcnRpZXMgKi9cblxuICAvKiogcHJpdmF0ZSBwcm9wZXJ0aWVzICovXG4gIF9fZGVidWdNb2RlID0gZmFsc2U7XG4gIF9fT0NSRW5naW5lID0gbnVsbDtcbiAgX19pc1N1cHBvcnRXYXNtID0gZmFsc2U7XG4gIF9faXNTdXBwb3J0U2ltZCA9IGZhbHNlO1xuICBfX2luaXRpYWxpemVkID0gZmFsc2U7XG4gIF9fcHJlbG9hZGVkID0gZmFsc2U7XG4gIF9fcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQ7XG4gIF9fbGljZW5zZTtcbiAgX19vY3JUeXBlO1xuICBfX3NzYU1vZGUgPSBmYWxzZTtcbiAgX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuTk9UX1JFQURZO1xuICBfX21hbnVhbE9DUk1heFJldHJ5Q291bnQgPSAxMDtcbiAgX19tYW51YWxPQ1JSZXRyeUNvdW50ID0gMDtcbiAgX19zc2FSZXRyeUNvdW50ID0gMDtcbiAgX19kZXRlY3RlZENhcmRRdWV1ZSA9IFtdO1xuICBfX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0ID0gW107XG4gIF9fb25TdWNjZXNzID0gbnVsbDtcbiAgX19vbkZhaWx1cmUgPSBudWxsO1xuICBfX29uSW5Qcm9ncmVzc0NoYW5nZSA9IG51bGw7XG4gIF9fb2NyVHlwZUxpc3QgPSBbJ2lkY2FyZCcsICdkcml2ZXInLCAncGFzc3BvcnQnLCAnZm9yZWlnbi1wYXNzcG9ydCcsICdhbGllbicsICdhbGllbi1iYWNrJywgJ2NyZWRpdCcsICdpZGNhcmQtc3NhJywgJ2RyaXZlci1zc2EnLCAncGFzc3BvcnQtc3NhJywgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJywgJ2FsaWVuLXNzYSddO1xuICBfX29jclR5cGVOdW1iZXJUb1N0cmluZyA9IG5ldyBNYXAoW1snMScsICdpZGNhcmQnXSwgWycyJywgJ2RyaXZlciddLCBbJzMnLCAncGFzc3BvcnQnXSwgWyc0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnXSwgWyc1JywgJ2FsaWVuJ10sIFsnNS0xJywgJ2FsaWVuJ10sIFsnNS0yJywgJ2FsaWVuJ10sIFsnNS0zJywgJ2FsaWVuJ11dKTtcbiAgX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIgPSBuZXcgTWFwKFtbJ2lkY2FyZCcsICcxJ10sIFsnZHJpdmVyJywgJzInXSwgWydwYXNzcG9ydCcsICczJ10sIFsnZm9yZWlnbi1wYXNzcG9ydCcsICc0J10sIFsnYWxpZW4nLCAnNSddLCBbJ2FsaWVuJywgJzUtMSddLCBbJ2FsaWVuJywgJzUtMiddLCBbJ2FsaWVuJywgJzUtMyddXSk7XG4gIF9fcGFnZUVuZCA9IGZhbHNlO1xuICBfX29jcjtcbiAgX19jYW52YXM7XG4gIF9fcm90YXRpb25DYW52YXM7XG4gIF9fdmlkZW87XG4gIF9fdmlkZW9XcmFwO1xuICBfX2d1aWRlQm94O1xuICBfX2d1aWRlQm94V3JhcDtcbiAgX19tYXNrQm94V3JhcDtcbiAgX19wcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgX19jdXN0b21VSVdyYXA7XG4gIF9fdG9wVUk7XG4gIF9fbWlkZGxlVUk7XG4gIF9fYm90dG9tVUk7XG4gIF9fcHJldmlld1VJV3JhcDtcbiAgX19wcmV2aWV3VUk7XG4gIF9fcHJldmlld0ltYWdlO1xuICBfX2NhcHR1cmVVSVdyYXA7XG4gIF9fY2FwdHVyZVVJO1xuICBfX3N3aXRjaFVJV3JhcDtcbiAgX19zd2l0Y2hVSTtcbiAgX19jYXB0dXJlQnV0dG9uO1xuICBfX2FkZHJlc3MgPSAwO1xuICBfX2RldGVjdGVkID0gZmFsc2U7XG4gIF9fcmVjb3ZlcmVkID0gZmFsc2U7XG4gIF9fQnVmZmVyID0gbnVsbDtcbiAgX19yZXN1bHRCdWZmZXIgPSBudWxsO1xuICBfX21hc2tJbmZvUmVzdWx0QnVmID0gbnVsbDtcbiAgX19QcmV2SW1hZ2UgPSBudWxsO1xuICBfX3N0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICBfX2NhbVNldENvbXBsZXRlID0gZmFsc2U7XG4gIF9fcmVzb2x1dGlvbldpZHRoID0gMDtcbiAgX19yZXNvbHV0aW9uSGVpZ2h0ID0gMDtcbiAgX192aWRlb1dpZHRoID0gMDtcbiAgX192aWRlb0hlaWdodCA9IDA7XG4gIF9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIF9faW50ZXJ2YWxUaW1lcjtcbiAgX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyO1xuICBfX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCA9IDA7XG4gIF9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQ7XG4gIF9fc3RyZWFtO1xuICBfX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2sgPSBudWxsO1xuICBfX2ZhY2luZ01vZGVDb25zdHJhaW50ID0gJ2Vudmlyb25tZW50JztcbiAgX191aU9yaWVudGF0aW9uID0gJyc7XG4gIF9fcHJldlVpT3JpZW50YXRpb24gPSAnJztcbiAgX192aWRlb09yaWVudGF0aW9uID0gJyc7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gbnVsbDtcbiAgX190aHJvdHRsaW5nUmVzaXplRGVsYXkgPSA1MDA7XG4gIF9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPSAzMDA7IC8vIOyehOyLnFxuICBfX3JldHJ5Q291bnRHZXRBZGRyZXNzID0gMDsgLy8g7J6E7IucXG4gIF9fZGV2aWNlSW5mbztcbiAgX19pc1JvdGF0ZWQ5MG9yMjcwID0gZmFsc2U7XG4gIF9faW5Qcm9ncmVzc1N0ZXAgPSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTtcbiAgX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT05FO1xuICBfX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICBfX2d1aWRlQm94UmF0aW9CeVdpZHRoID0gMS4wOyAvLyDsiJjsoJXrtojqsIBcbiAgX192aWRlb1JhdGlvQnlIZWlnaHQgPSAwLjk7IC8vIOyImOygleu2iOqwgFxuICBfX2d1aWRlQm94UmVkdWNlUmF0aW8gPSAwLjg7IC8vIOyImOygleu2iOqwgFxuICBfX2Nyb3BJbWFnZVNpemVXaWR0aCA9IDA7XG4gIF9fY3JvcEltYWdlU2l6ZUhlaWdodCA9IDA7XG4gIF9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBmYWxzZTtcblxuICAvKiogRGVmYXVsdCBvcHRpb25zICovXG4gIF9fb3B0aW9ucyA9IG5ldyBPYmplY3Qoe1xuICAgIC8vIOuUlOuyhOq5hSDsmLXshZhcbiAgICBzaG93Q2xpcEZyYW1lOiBmYWxzZSxcbiAgICAvLyBjaWxwLWZyYW1lIOuztOq4sFxuICAgIHNob3dDYW52YXNQcmV2aWV3OiBmYWxzZSxcbiAgICAvLyBjYW52YXMgcHJldmlldyDrs7TquLBcblxuICAgIC8vIOy2nOugpSDsmLXshZhcbiAgICAvLyDslZTtmLjtmZRcbiAgICB1c2VFbmNyeXB0TW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo6rCc7J246rOg7Jyg7Iud67OE67aA7Zi4IOq0gOugqCDtla3rqqkg7JWU7Zi47ZmUKVxuICAgIHVzZUVuY3J5cHRBbGxNb2RlOiBmYWxzZSxcbiAgICAvLyDslZTtmLjtmZQg7KCB7JqpICjsoITssrQg7JWU7Zi47ZmULCBlbmNyeXB0IG9iamVjdCDrs4Trj4Qg7KCc6rO1KVxuICAgIHVzZUVuY3J5cHRPdmVyYWxsTW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAob2NyIOydtOuvuOyngCwg66eI7Iqk7YK5IOydtOuvuOyngCwg7Ja86rW07J2066+47KeAIO2PrO2VqClcbiAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgIC8vIHVzZVBpaUVuY3J5cHRNb2RlOiBmYWxzZSwgLy8g7JWU7Zi47ZmUIOyggeyaqSAocGlpKVxuICAgIC8vIHVzZVBpaUVuY3J5cHRGYWNlOiBmYWxzZSwgLy8g7Iug67aE7KadIOyWvOq1tOyCrOynhCDslZTtmLjtmZQg7KCB7JqpIChwaWkpXG4gICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgdXNlTGVnYWN5Rm9ybWF0OiBmYWxzZSxcbiAgICAvLyBMZWdhY3kgZm9ybWF0IOyngOybkFxuICAgIHVzZU1hc2tJbmZvOiB0cnVlLFxuICAgIC8vIOuniOyKpO2CuSDsooztkZwg7KeA7JuQXG4gICAgdXNlRmFjZUltYWdlOiB0cnVlLFxuICAgIC8vIOyLoOu2hOymnSDrgrQg7Ja86rW0IOyCrOynhFxuICAgIHVzZUltYWdlQ3JvcHBpbmc6IGZhbHNlLFxuICAgIC8vIOyLoOu2hOymnSDsnbTrr7jsp4DrpbwgQ3JvcHBpbmco7YGs66GtIOuztOyglSDtlaDsp4Ag7Jes67aAKVxuICAgIHVzZUltYWdlV2FycGluZzogZmFsc2UsXG4gICAgLy8g7Iug67aE7KadIOydtOuvuOyngOulvCBXYXJwaW5nKOyZnOqzoSDrs7TsoJUg7ZWg7KeAIOyXrOu2gClcbiAgICB1c2VDb21wcmVzc0ltYWdlOiBmYWxzZSxcbiAgICAvLyDsi6DrtoTspp0g7J2066+47KeA66W8IOyVley2le2VoOyngCDsl6zrtoBcbiAgICB1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGg6IDEwODAsXG4gICAgLy8g7J2066+47KeAIOumrOyCrOydtOynlSDqsIDroZwg7ZW07IOB64+EXG4gICAgdXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZTogMTAyNCAqIDUwLFxuICAgIC8vIOydtOuvuOyngCDslZXstpUg66qp7ZGcIOyaqeufiVxuXG4gICAgLy8gVUkg7ISk7KCVXG4gICAgdXNlVG9wVUk6IHRydWUsXG4gICAgLy8g7IOB64uoIFVJXG4gICAgdXNlVG9wVUlUZXh0TXNnOiBmYWxzZSxcbiAgICAvL+yDgeuLqCBVSSA+IFRFWFRcbiAgICB1c2VNaWRkbGVVSTogdHJ1ZSxcbiAgICAvL+ykkeuLqCBVSVxuICAgIHVzZU1pZGRsZVVJVGV4dE1zZzogdHJ1ZSxcbiAgICAvLyDspJHri6ggVUkgPiBURVhUXG4gICAgdXNlQm90dG9tVUk6IHRydWUsXG4gICAgLy8g7ZWY64uoIFVJXG4gICAgdXNlQm90dG9tVUlUZXh0TXNnOiBmYWxzZSxcbiAgICAvLyDtlZjri6ggVUkgPiBURVhUXG4gICAgdXNlUHJldmlld1VJOiB0cnVlLFxuICAgIC8vIFByZXZpZXcgVUlcbiAgICB1c2VDYXB0dXJlVUk6IHRydWUsXG4gICAgLy8g7Lqh7LKY67KE7Yq8IFVJXG4gICAgcHJlbG9hZGluZ1VJVGV4dE1zZzogJ+yLoOu2hOymneyduOymnSDrqqjrk4jsnYQg67aI65+s7Jik64qUIOykkSDsnoXri4jri6Q8YnIgLz7snqDsi5zrp4wg6riw64uk66Ck7KO87IS47JqUJyxcbiAgICAvLyDsnbjsi50g7ZSE66CI7J6EIOyYteyFmFxuICAgIGZyYW1lQm9yZGVyU3R5bGU6IHtcbiAgICAgIHdpZHRoOiA1LFxuICAgICAgLy8gYm9yZGVyLXdpZHRoXG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgLy8gYm9yZGVyLXJhZGl1c1xuICAgICAgc3R5bGU6ICdzb2xpZCcsXG4gICAgICAvLyBib3JkZXItc3R5bGVcblxuICAgICAgLy8g64uo6rOE67OEIOyduOyLnSDtlITroIjsnoQgYm9yZGVyIOyDieyDgVxuICAgICAgbm90X3JlYWR5OiAnIzAwMDAwMCcsXG4gICAgICAvLyDsiqTsupTspIDruYQgOiDqsoDsoJVcbiAgICAgIHJlYWR5OiAnI2I4YjhiOCcsXG4gICAgICAvLyDsiqTsupTrjIDquLAgOiDtmozsg4lcbiAgICAgIGRldGVjdF9zdWNjZXNzOiAnIzVlOGZmZicsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7ISx6rO1IDog7ZWY64qYXG4gICAgICBkZXRlY3RfZmFpbGVkOiAnIzcyNWI2NycsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7Iuk7YyoIDog67O06528XG4gICAgICBtYW51YWxfY2FwdHVyZV9zdWNjZXNzOiAnIzVlOGZmZicsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7ISx6rO1IDog7ZWY64qYXG4gICAgICBtYW51YWxfY2FwdHVyZV9mYWlsZWQ6ICcjNzI1YjY3JyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDsi6TtjKggOiDrs7TrnbxcbiAgICAgIHJlY29nbml6ZWQ6ICcjMDAzYWMyJyxcbiAgICAgIC8vIE9DUuyZhOujjCA6IO2MjOuekVxuICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogJyMwMDNhYzInLFxuICAgICAgLy8g7IKs67O47YyQ67OE7KSRKOyCrOuzuO2MkOuzhCBPTikgOiDtjIzrnpFcbiAgICAgIG9jcl9zdWNjZXNzOiAnIzE0YjAwZScsXG4gICAgICAvLyBPQ1LsmYTro4wgOiDstIjroZ1cbiAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiAnIzE0YjAwZScsXG4gICAgICAvLyBPQ1LsmYTro4wo7IKs67O47YyQ67OEIE9OKSA6IOy0iOuhnVxuICAgICAgb2NyX2ZhaWxlZDogJyNGQTExM0QnIC8vIE9DUuyLpO2MqCA6IOu5qOqwlVxuICAgIH0sXG5cbiAgICAvLyDrp4jsiqTtgawg7ZSE66CI7J6EIGZpbGwg7Lus65+sIOuzgOqyvSDsgqzsmqkg7Jes67aAXG4gICAgdXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2U6IHRydWUsXG4gICAgLy8g66eI7Iqk7YGsIO2UhOugiOyehCDsmLXshZggKOy5tOuplOudvCDruYTrlJTsmKQg7JiB7Jet7JeQ7IScIOyduOyLnSDtlITroIjsnoTrp4wg67O07J206rKMIO2VmOqzoCDrgpjrqLjsp4Drpbwg642u7Ja07JOw64qUIO2UhOugiOyehCDsmIHsl60pXG4gICAgbWFza0ZyYW1lU3R5bGU6IHtcbiAgICAgIGNsaXBfZnJhbWU6ICcjZmYwMGJmJyxcbiAgICAgIC8vIGNsaXAtZnJhbWUg7IOJ7IOBIDog65Sl7Y287ZSMICjsiJjsoJXrtojqsIApXG4gICAgICBiYXNlX2NvbG9yOiAnIzMzMzMzMycsXG4gICAgICAvLyBtYXNrLWZyYW1lIOyDieyDgSA6IOuLpO2BrOq3uOugiOydtCAo7Yis66qF64+E64qUIOyImOygleu2iOqwgCBmZuuhnCDqs6DsoJUpXG5cbiAgICAgIC8vIOuLqOqzhOuzhCDrp4jsiqTtgawg7ZSE66CI7J6EIGZpbGwg7IOJ7IOBXG4gICAgICBub3RfcmVhZHk6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyKpOy6lOykgOu5hFxuICAgICAgcmVhZHk6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyKpOy6lOuMgOq4sFxuICAgICAgZGV0ZWN0X3N1Y2Nlc3M6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDshLHqs7VcbiAgICAgIGRldGVjdF9mYWlsZWQ6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOy5tOuTnOqygOy2nCDsi6TtjKhcbiAgICAgIG1hbnVhbF9jYXB0dXJlX3N1Y2Nlc3M6ICcjMjIyMjIyJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDshLHqs7VcbiAgICAgIG1hbnVhbF9jYXB0dXJlX2ZhaWxlZDogJyMzMzMzMzMnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyLpO2MqFxuICAgICAgcmVjb2duaXplZDogJyMyMjIyMjInLFxuICAgICAgLy8gT0NS7JmE66OMXG4gICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiAnIzIyMjIyMicsXG4gICAgICAvLyDsgqzrs7jtjJDrs4TspJEo7IKs67O47YyQ67OEIE9OKVxuICAgICAgb2NyX3N1Y2Nlc3M6ICcjMTExMTExJyxcbiAgICAgIC8vT0NS7JmE66OMXG4gICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogJyMxMTExMTEnLFxuICAgICAgLy8gT0NS7JmE66OMKOyCrOuzuO2MkOuzhCBPTilcbiAgICAgIG9jcl9mYWlsZWQ6ICcjMTExMTExJyAvLyBPQ1Lsi6TtjKhcbiAgICB9LFxuXG4gICAgLy8g7LSs7JiB7Ji17IWYXG4gICAgdXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZTogZmFsc2UsXG4gICAgLy8g7KCA7IKs7JaRIOuLqOunkOyXkOyEnCDshJzrsoRPQ1LroZwg7J6Q64+ZIOyghO2ZmCDquLDriqVcbiAgICB1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGU6IGZhbHNlLFxuICAgIC8vIOyImOuPmeycvOuhnCDshJzrsoRPQ1Ig7KCE7ZmYIOq4sOuKpSAo7IiY64+Z7J20IHRydWXsnbTrqbQg7J6Q64+Z7J2AIOustOyLnOuQqClcbiAgICBzd2l0Y2hUb1NlcnZlclRocmVzaG9sZDogMjAuMCxcbiAgICAvLyDsnpDrj5nsoITtmZgg6riw7KSA6rCSICjshLHriqUg7Lih7KCV7LmYIG1zKVxuICAgIHVzZUZvcmNlQ29tcGxldGVVSTogZmFsc2UsXG4gICAgLy8gV0FTTSDrqqjrk5zsnbzrlYwg67KE7Yq8IOuIhOulvOyLnCDtlbTri7kg7Iuc7KCQ7JeQIOqwleygnOuhnCDsmYTro4wg7IKs7Jqp7Jes67aAXG5cbiAgICAvLyDsiJjrj5nstKzsmIEg67KE7Yq8IOyYteyFmFxuICAgIGNhcHR1cmVCdXR0b25TdHlsZToge1xuICAgICAgc3Ryb2tlX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAvLyDrsoTtirwg7YWM65GQ66asKHN0cm9rZSkg7IOJ7IOBXG4gICAgICBiYXNlX2NvbG9yOiAnIzVlOGZmZicgLy8g67KE7Yq8IOyDieyDgVxuICAgIH0sXG5cbiAgICByZXNvdXJjZUJhc2VVcmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgLy8gd2FzbSwgZGF0YSDtjIzsnbwg66as7IaM7IqkIGJhc2Ug6rK966GcIChDRE4g7IKs7Jqp7IucIOuzgOqyvSlcbiAgICBkZXZpY2VMYWJlbDogJycsXG4gICAgdmlkZW9UYXJnZXRJZDogJycsXG4gICAgLy8g7Lm066mU6528IOyEpOyglVxuICAgIHJvdGF0aW9uRGVncmVlOiAwLFxuICAgIC8vIHJvdGF0aW9uLWRlZ3JlZSDsubTrqZTrnbzqsIAg7ZqM7KCE65CcIOqwgeuPhCAoOTAsIDE5MCwgMjcwKVxuICAgIG1pcnJvck1vZGU6IGZhbHNlLFxuICAgIC8vIG1pcnJvci1tb2RlIOyFgO2UvCDsubTrqZTrnbwo7YKk7Jik7Iqk7YGsIOuTsSkg7IKs7Jqp7IucIOyijOyasCDrsJjsoIRcbiAgICBjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsOiAxMDAwLFxuICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIOqwhOqyqShtcylcbiAgICBjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0OiAtMSxcbiAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDstZzrjIAg7Zqf7IiYLCAtMeydtOuptCDrrLTtlZwg7J6s7JqU7LKtLlxuXG4gICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUgIDogJ2NvbXBhdGliaWxpdHknICjtmLjtmZjshLEg7Jqw7ISgKSB8fCAnaGlnaFF1YWxpdHknICjqs6DtmZTsp4gg7Jqw7ISgKVxuICAgIC8vIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2NvbXBhdGliaWxpdHknLCAvLyDtmLjtmZjshLEg7Jqw7ISgKOq2jOyepSwg65SU7Y+07Yq4KSA6IDcyMOycvOuhnCDqs6DsoJUsIOyggOyCrOyWkSDri6jrp5DquLAg7Zi47ZmY7ISxIOyii+ydjFxuICAgIGNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYTogJ2hpZ2hRdWFsaXR5JyxcbiAgICAvLyDqs6DtmZTsp4gg7Jqw7ISgIDogMTA4MOydtCDqsIDriqXtlZjrqbQgMTA4MCDrtojqsIDriqXtlZjrqbQgNzIwXG5cbiAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOyEpOyglSA6ICdjYW1lcmFSZXNvbHV0aW9uJyAo7Lm066mU6528IO2VtOyDgeuPhCkgfHwgJ29jclZpZXdTaXplJyAob2NyIGRpdiDtgazquLApXG4gICAgY2FsY0d1aWRlQm94Q3JpdGVyaWE6ICdjYW1lcmFSZXNvbHV0aW9uJyxcbiAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOq4sOykgCjqtozsnqUsIOuUlO2PtO2KuCkgOiA3MjB4MTI4MCDtlbTsg4Hrj4Qo7IS466Gc66qo65OcKSDsnbzrlYwgb2NyIHZpZXcgd2lkdGggc2l6ZeqwgCA3MjDrs7Tri6Qg7YGwIOqyveyasCwg6rCA7J2065OcIOuwleyKpOulvCA3MjDsl5Ag66ee7LakIChwcmV2aWV3IO2ZlOuptCDquajsp5Ag7JeG7J2MKVxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhOiAnb2NyVmlld1NpemUnLCAvLyDtmZTrqbQg7IKs7J207KaIIOq4sOykgCA6IDcyMHgxMjgwIO2VtOyDgeuPhCjshLjroZzrqqjrk5wpIOydvOuVjCBvY3IgdmlldyB3aWR0aCBzaXpl6rCAIDcyMOuztOuLpCDtgbDqsr3smrAsIOqwgOydtOuTnCDrsJXsiqTrpbwgb2NyIHZpZXcgd2lkdGgg7IKs7JeQ7KaI7JeQIOunnuy2pCAocHJldmlldyDtmZTrqbQg6rCV7KCc66GcIOuKmOumrOq4sCDrlYzrrLjsl5Ag64uk7IaMIOq5qOynkClcblxuICAgIC8vIOyCrOuzuO2MkOuzhCBSRVRSWSDshKTsoJVcbiAgICAvLyBzc2FSZXRyeVR5cGVcbiAgICAvLyAgIC0gUkVBTCAgICAgOiDrs7jsnbgoUkVBTCkg6rGw67aA7JyoIC0+IEZhbHNlIE5lZ2F0aXZlKOyLpOygnOqwkuydgCBSRUFM7J24642wIOyYiOy4oeqwkuydgCBGQUtF65287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtCxcbiAgICAvLyAgIC0gRkFLRSAgICAgOiDtg4DsnbgoRkFLRSkg7IiY65297JyoIC0+IEZhbHNlIFBvc2l0aXZlKOyLpOygnOqwkuydgCBGQUtF7J24642wIOyYiOy4oeqwkuydgCBSRUFM7J2065287IScIO2LgOumsOqyveyasCnrpbwg64Ku7LaU6riwIOychO2VtFxuICAgIC8vICAgLSBFTlNFTUJMRSA6IO2Pieq3oCDsoIjrjIDqsJIgLT4gc3NhTWF4UmV0cnlDb3VudCDrp4ztgbwg67CY67O1IOyImO2Wie2VmOqzoCBmZF9jb25maWRlbmNlIOygiOuMgOqwkiDqsJLsnZgg7Y+J6reg7Jy866GcIO2MkOyglVxuICAgIC8vIHNzYU1heFJldHJ5Q291bnQg7ISk7KCVIOqwkuunjO2BvCDsnqzsi5zrj4TtlZjsl6wg7ZWc67KI7J20652864+EIOq4sOykgOqwkihSRUFMIOuYkOuKlCBGQUtFKeydtCDrnKjrqbQg6riw7KSA6rCSKFJFQUwg65iQ64qUIEZBS0Up66GcIO2MkOyglVxuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJyxcbiAgICBzc2FSZXRyeVBpdm90OiAwLjUsXG4gICAgLy8gUkVBTC9GQUtF66W8IO2MkOygle2VmOuKlCBmZF9jb25maWRlbmNlIOq4sOykgOqwkiAod2FzbSDrsLDtj6wg67KE7KCE7JeQIOuUsOudvCDri6TrpoQpIOKAuyDsiJjsoJXrtojqsIBcbiAgICBzc2FNYXhSZXRyeUNvdW50OiAwLFxuICAgIC8vIOy1nOuMgCBSRVRSWSDtmozsiJjshKTsoJUgMOydtOuptCDrr7jsgqzsmqlcblxuICAgIC8vIHRoaXMuX19kZWJ1Zygp66W8IO2Gte2VtCDssI3snYAg66mU7Iuc7KeA66W8IGFsZXJ07Jy866GcIOudhOyauOyngCDsl6zrtoBcbiAgICB1c2VEZWJ1Z0FsZXJ0OiBmYWxzZSxcbiAgICAvLyBXQVNNIOumrOyGjOyKpCDqsLHsi6Ag7Jes67aAXG4gICAgZm9yY2Vfd2FzbV9yZWxvYWQ6IGZhbHNlLFxuICAgIGZvcmNlX3dhc21fcmVsb2FkX2ZsYWc6ICcnXG4gIH0pO1xuXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoaW5zdGFuY2UpIHJldHVybiBpbnN0YW5jZTtcbiAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgLyoqIHB1YmxpYyBtZXRob2RzICovXG4gIGFzeW5jIHByZWxvYWRpbmcob25QcmVsb2FkZWQpIHtcbiAgICBpZiAodGhpcy5pc1ByZWxvYWRlZCgpKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuc2hvd09DUkxvYWRpbmdVSSgpO1xuICAgICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLlNUQVJURUQ7XG4gICAgICBhd2FpdCB0aGlzLl9fbG9hZFJlc291cmNlcygpO1xuICAgICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLkRPTkU7XG4gICAgICB0aGlzLl9fcHJlbG9hZGVkID0gdHJ1ZTtcbiAgICAgIGlmIChvblByZWxvYWRlZCkgb25QcmVsb2FkZWQoKTtcbiAgICAgIHRoaXMuaGlkZU9DUkxvYWRpbmdVSSgpO1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBpc0luaXRpYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl9faW5pdGlhbGl6ZWQ7XG4gIH1cbiAgaXNQcmVsb2FkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkZWQ7XG4gIH1cbiAgZ2V0UHJlbG9hZGluZ1N0YXR1cygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXM7XG4gIH1cbiAgaXNFbmNyeXB0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdE1vZGUgfHwgdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdEFsbE1vZGUgfHwgdGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdE92ZXJhbGxNb2RlO1xuICB9XG4gIGlzQ3JlZGl0Q2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGUgPT09ICdjcmVkaXQnO1xuICB9XG4gIHNob3dPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfVxuICB9XG4gIGhpZGVPQ1JMb2FkaW5nVUkoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcFxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSB7XG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9XG4gIGVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCkge1xuICAgIGlmICh0aGlzLmlzQ3JlZGl0Q2FyZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRW5jcnlwdE1vZGUoKSAmJiB0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGluY2x1ZGVMaXN0ID0gWydqdW1pbicsICdkcml2ZXJfbnVtYmVyJywgJ3Bhc3Nwb3J0X251bWJlcicsICdwZXJzb25hbF9udW1iZXInLCAnbXJ6MiddO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSB7XG4gICAgICAgICAgb2NyX3Jlc3VsdDogXy50b1BhaXJzKF8ucGljayhyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGluY2x1ZGVMaXN0KSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0ID0ge1xuICAgICAgICAgIC4uLnJldmlld19yZXN1bHQub2NyX3Jlc3VsdCxcbiAgICAgICAgICAuLi5lbmNyeXB0ZWQub2NyX3Jlc3VsdFxuICAgICAgICB9O1xuICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBlbmNyeXB0ZWQub2NyX29yaWdpbl9pbWFnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVMaXN0ID0gWydjb21wbGV0ZScsICdyZXN1bHRfc2Nhbl90eXBlJywgJ2NvbG9yX3BvaW50JywgJ2ZvdW5kX2ZhY2UnLCAnc3BlY3VsYXJfcmF0aW8nLCAnc3RhcnRfdGltZScsICdlbmRfdGltZScsICdmZF9jb25maWRlbmNlJywgJ2lkX3RydXRoJywgJ2lkX3RydXRoX3JldHJ5X2NvdW50J107XG5cbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0QWxsTW9kZSkge1xuICAgICAgICAgIGNvbnN0IGVuY3J5cHRlZCA9IHtcbiAgICAgICAgICAgIG9jcl9yZXN1bHQ6IF8udG9QYWlycyhfLm9taXQocmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LCBleGNsdWRlTGlzdCkpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgYWNjW2tleV0gPSB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQodmFsdWUpO1xuICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwge30pLFxuICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSksXG4gICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UpLFxuICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9mYWNlX2ltYWdlKVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV2aWV3X3Jlc3VsdC5lbmNyeXB0ZWQgPSBlbmNyeXB0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZW5jcnlwdGVkID0ge1xuICAgICAgICAgICAgb2NyX3Jlc3VsdDogXy5vbWl0KHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgZXhjbHVkZUxpc3QpLFxuICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogcmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlLFxuICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UsXG4gICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogcmV2aWV3X3Jlc3VsdC5vY3JfZmFjZV9pbWFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV2aWV3X3Jlc3VsdC5lbmNyeXB0ZWRfb3ZlcmFsbCA9IHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChKU09OLnN0cmluZ2lmeShlbmNyeXB0ZWQpKSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0T0NSRW5naW5lKCkge1xuICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lO1xuICB9XG4gIGluaXQoc2V0dGluZ3MpIHtcbiAgICBpZiAoISEhc2V0dGluZ3MubGljZW5zZUtleSkgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIGtleSBpcyBlbXB0eScpO1xuICAgIHRoaXMuX19saWNlbnNlID0gc2V0dGluZ3MubGljZW5zZUtleTtcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zID0gXy5tZXJnZSh7fSwgdGhpcy5fX29wdGlvbnMsIHNldHRpbmdzKTtcbiAgICB0aGlzLnNldE9wdGlvbihtZXJnZWRPcHRpb25zKTtcbiAgICB2b2lkIDA7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhpcy5fX3dpbmRvd0V2ZW50QmluZCgpO1xuICAgICAgdGhpcy5fX2RldmljZUluZm8gPSBkZXRlY3Rvci5nZXRPc1ZlcnNpb24oKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRXYXNtID0gaXNTdXBwb3J0V2FzbSgpO1xuICAgICAgaWYgKCF0aGlzLl9faXNTdXBwb3J0V2FzbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBzdXBwb3J0ZWQuIGluIHRoaXMgYnJvd3Nlci4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHNldE9wdGlvbihzZXR0aW5ncykge1xuICAgIHRoaXMuX19vcHRpb25zID0gc2V0dGluZ3M7XG4gIH1cbiAgZ2V0T3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fb3B0aW9ucztcbiAgfVxuICBnZXRPY3JUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclR5cGVOdW1iZXJUb1N0cmluZy5nZXQodHlwZSk7XG4gIH1cbiAgZ2V0T2NyVHlwZU51bWJlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fX29jclN0cmluZ1RvVHlwZU51bWJlci5nZXQoc3RyaW5nKTtcbiAgfVxuICBnZXRVSU9yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdWlPcmllbnRhdGlvbjtcbiAgfVxuICBnZXRWaWRlb09yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgfVxuICBhc3luYyBjaGVja1N3aXRjaFRvU2VydmVyTW9kZSgpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAvLyDsiJjrj5nsoITtmZggb24g7J2066m0IOyImOuPmeyghO2ZmCDsmrDshKBcbiAgICAgIHJldHVybiB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOyImOuPmeyghO2ZmCBvZmYg7J2066m0IOyekOuPmeyghO2ZmCDssrTtgaxcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgIC8vIOyekOuPmeyghO2ZmCBvbuydvOuVjFxuICAgICAgICAvLyDshLHriqUg7Lih7KCV6rCS7J2EIOq4sOykgOycvOuhnCBXQVNNIG9yIFNlcnZlclxuICAgICAgICBjb25zdCBbbGF0ZW5jeVBlcjEwMG1zLCBtZWFzdXJlUmVwb3J0XSA9IGF3YWl0IG1lYXN1cmUoKTtcbiAgICAgICAgdGhpcy5fX2RlYnVnKG1lYXN1cmVSZXBvcnQpO1xuICAgICAgICByZXR1cm4gbGF0ZW5jeVBlcjEwMG1zID4gcGFyc2VGbG9hdCh0aGlzLl9fb3B0aW9ucy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsiJjrj5nsoITtmZjrj4Qgb2ZmLCDsnpDrj5nsoITtmZggb2ZmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgc3RhcnRPQ1IodHlwZSwgb25TdWNjZXNzLCBvbkZhaWx1cmUsIG9uSW5Qcm9ncmVzc0NoYW5nZSA9IG51bGwpIHtcbiAgICBpZiAoISEhdHlwZSB8fCAhISFvblN1Y2Nlc3MgfHwgISEhb25GYWlsdXJlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGF3YWl0IHRoaXMuY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUoKTtcbiAgICB0aGlzLl9fb2NyVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fX3NzYU1vZGUgPSB0aGlzLl9fb2NyVHlwZS5pbmRleE9mKCctc3NhJykgPiAtMTtcbiAgICB0aGlzLl9fb25TdWNjZXNzID0gb25TdWNjZXNzO1xuICAgIHRoaXMuX19vbkZhaWx1cmUgPSBvbkZhaWx1cmU7XG4gICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZSA9IG9uSW5Qcm9ncmVzc0NoYW5nZTtcbiAgICBpZiAob25JblByb2dyZXNzQ2hhbmdlKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHtcbiAgICAgICAgdGhpcy5fX3RvcFVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS50b3BVSTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSkge1xuICAgICAgICB0aGlzLl9fbWlkZGxlVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm1pZGRsZVVJO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJKSB7XG4gICAgICAgIHRoaXMuX19ib3R0b21VSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuYm90dG9tVUk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW5pdGlhbGl6ZWQhJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fcHJlcHJvY2VzcygpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwRG9tRWxlbWVudHMoKTtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgLy8gc2VydmVyTW9kZVxuICAgICAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fcHJlbG9hZGluZ1dhc20oKTsgLy8g7ISc67KE66qo65OcIOydtOyngOunjCDslZTtmLjtmZQg7ZWY6riw7JyE7ZW0IHdhc23snYQgcHJlbG9hZGluZyDtlahcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5TZXJ2ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdhc21Nb2RlXG4gICAgICAgIGF3YWl0IHRoaXMuX19wcmVsb2FkaW5nV2FzbSgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zdG9wT0NSKCk7XG4gICAgfVxuICB9XG4gIHN0b3BPQ1IoKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gIH1cbiAgc2V0SWdub3JlQ29tcGxldGUodmFsKSB7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5zZXRJZ25vcmVDb21wbGV0ZSh2YWwpO1xuICB9XG4gIGVuY3J5cHQocGxhaW5TdHIpIHtcbiAgICByZXR1cm4gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHBsYWluU3RyKTtcbiAgfVxuICBhc3luYyByZXN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UsIGlzU3dpdGNoTW9kZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3dpdGNoTW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdG9wT0NSKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnN0YXJ0T0NSKG9jclR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UpO1xuICB9XG5cbiAgLyoqIHByaXZhdGUgbWV0aG9kcyAqL1xuICBhc3luYyBfX3dhaXRQcmVsb2FkZWQoKSB7XG4gICAgbGV0IHdhaXRpbmdSZXRyeUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YWl0aW5nUmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9O1xuICAgICAgY2hlY2soKTtcbiAgICB9KTtcbiAgfVxuICBfX3ByZXByb2Nlc3MoKSB7XG4gICAgY29uc3QgY29udmVydFR5cGVUb051bWJlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZUludChvcHRpb24pKSA/IDAgOiBwYXJzZUludChvcHRpb24pO1xuICAgIH07XG4gICAgY29uc3QgY29udmVydFR5cGVUb0Zsb2F0ID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlRmxvYXQob3B0aW9uKSkgPyAyMC4wIDogcGFyc2VGbG9hdChvcHRpb24pO1xuICAgIH07XG4gICAgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gY29udmVydFR5cGVUb051bWJlcih0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgpO1xuICAgIHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkID0gY29udmVydFR5cGVUb0Zsb2F0KHRoaXMuX19vcHRpb25zLnN3aXRjaFRvU2VydmVyVGhyZXNob2xkKTtcbiAgfVxuICBfX3dpbmRvd0V2ZW50QmluZCgpIHtcbiAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgIGlmICgvaXBob25lfGlwb2R8aXBhZC8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgY29uc3Qgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSA9IGV2ID0+IHtcbiAgICAgICAgaWYgKGV2LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXYuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc2tpcFRvdWNoQWN0aW9uZm9yWm9vbSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzXy5fX3BhZ2VFbmQgPSB0cnVlO1xuICAgICAgX3RoaXNfLmNsZWFudXAoKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghISFfdGhpc18uX19vY3JUeXBlKSByZXR1cm47XG4gICAgICBpZiAoIV90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSkge1xuICAgICAgICBfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSB0cnVlO1xuICAgICAgICBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIgPSBudWxsO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIF90aGlzXy5fX2lzSW5Qcm9ncmVzc0hhbmRsZVJlc2l6ZSA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBfdGhpc18ucmVzdGFydE9DUihfdGhpc18uX19vY3JUeXBlLCBfdGhpc18uX19vblN1Y2Nlc3MsIF90aGlzXy5fX29uRmFpbHVyZSwgX3RoaXNfLl9fb25JblByb2dyZXNzQ2hhbmdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISEhX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyKSB7XG4gICAgICAgIF90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoaGFuZGxlUmVzaXplLCBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplRGVsYXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fZGVidWcobXNnKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZURlYnVnQWxlcnQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBfX3NsZWVwKG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICB9XG4gIF9fYmxvYlRvQmFzZTY0KGJsb2IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF8pID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgIH0pO1xuICB9XG4gIF9fYmFzZTY0dG9CbG9iKGJhc2U2NCkge1xuICAgIC8vIGNvbnZlcnQgYmFzZTY0IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gICAgLy8gZG9lc24ndCBoYW5kbGUgVVJMRW5jb2RlZCBEYXRhVVJJcyAtIHNlZSBTTyBhbnN3ZXIgIzY4NTAyNzYgZm9yIGNvZGUgdGhhdCBkb2VzIHRoaXNcbiAgICBjb25zdCBieXRlU3RyaW5nID0gYXRvYihiYXNlNjQuc3BsaXQoJywnKVsxXSk7XG5cbiAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgY29uc3QgbWltZVN0cmluZyA9IGJhc2U2NC5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcblxuICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgY29uc3QgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgIGNvbnN0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmxvYihbYWJdLCB7XG4gICAgICB0eXBlOiBtaW1lU3RyaW5nXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19jb21wcmVzZUJhc2U2NEltYWdlKGJhc2U2NCwgb3B0aW9ucywgY29uc3RhbnROdW1iZXIpIHtcbiAgICBpZiAoYmFzZTY0ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBibG9iRmlsZSA9IHRoaXMuX19iYXNlNjR0b0Jsb2IoYmFzZTY0KTtcbiAgICBjb25zdCBjb21wcmVzc2VkID0gYXdhaXQgSW1hZ2VVdGlsLmNvbXByZXNzSW1hZ2UoYmxvYkZpbGUsIG9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICBjb25zdCBjb21wcmVzc2lvblJhdGlvID0gTWF0aC5yb3VuZCgoMSAtIGNvbXByZXNzZWQuc2l6ZSAvIGJsb2JGaWxlLnNpemUpICogMTAwMDApIC8gMTAwO1xuICAgIHZvaWQgMDtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fX2Jsb2JUb0Jhc2U2NChjb21wcmVzc2VkKTtcbiAgfVxuXG4gIC8qKiDrnbzsnbTshLzsiqQg7YKk66W8IGhlYXAg7JeQIGFsbG9jYXRpb24gKi9cbiAgX19nZXRTdHJpbmdPbldhc21IZWFwKCkge1xuICAgIGlmICghISF0aGlzLl9fbGljZW5zZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaWNlbnNlIEtleSBpcyBlbXB0eScpO1xuICAgIH1cbiAgICBjb25zdCBsZW5ndGhCeXRlcyA9IHRoaXMuX19PQ1JFbmdpbmUubGVuZ3RoQnl0ZXNVVEY4KHRoaXMuX19saWNlbnNlKSArIDE7XG4gICAgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MobGVuZ3RoQnl0ZXMpO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUuc3RyaW5nVG9VVEY4KHRoaXMuX19saWNlbnNlLCB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCwgbGVuZ3RoQnl0ZXMpO1xuICAgIHJldHVybiB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcDtcbiAgfVxuICBfX2VuY3J5cHRTY2FuUmVzdWx0KG9jclJlc3VsdCkge1xuICAgIGxldCBzdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBvY3JSZXN1bHQgPT09ICdudW1iZXInKSBvY3JSZXN1bHQgPSBvY3JSZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgIGlmIChvY3JSZXN1bHQgPT09ICcnKSByZXR1cm4gJyc7XG4gICAgICBpZiAodHlwZW9mIG9jclJlc3VsdCAhPT0gJ3N0cmluZycgJiYgISEhb2NyUmVzdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb2NyUmVzdWx0IGlzIGVtcHR5Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gb2NyUmVzdWx0O1xuICAgICAgY29uc3QgbGVuZ3RoQnl0ZXMgPSB0aGlzLl9fT0NSRW5naW5lLmxlbmd0aEJ5dGVzVVRGOChqc29uU3RyaW5nKSArIDE7XG4gICAgICBzdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKGxlbmd0aEJ5dGVzKTtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuc3RyaW5nVG9VVEY4KGpzb25TdHJpbmcsIHN0cmluZ09uV2FzbUhlYXAsIGxlbmd0aEJ5dGVzKTtcbiAgICAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRSZXN1bHQoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChzdHJpbmdPbldhc21IZWFwKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgIHN0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBfX3NldFZpZGVvUmVzb2x1dGlvbih2aWRlb0VsZW1lbnQpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgbGV0IHJlc29sdXRpb25UZXh0ID0gJ25vdCByZWFkeSc7XG4gICAgaWYgKCF0aGlzLl9fY2FtU2V0Q29tcGxldGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgICAgcmVzb2x1dGlvblRleHRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDApIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXNvbHV0aW9uVGV4dCA9IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoICsgJ3gnICsgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgIGlmICh2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCA9PT0gMTA4MCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDE5MjAgfHwgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDE5MjAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxMDgwKSB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDEyODAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSA3MjAgfHwgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDcyMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPT09IDEyODApIHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZGVvRWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX192aWRlb1dpZHRoID0gdmlkZW9FbGVtZW50LnZpZGVvV2lkdGg7XG4gICAgdGhpcy5fX3ZpZGVvSGVpZ2h0ID0gdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xuICAgIHJldHVybiB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICByZXNvbHV0aW9uVGV4dFxuICAgIH07XG4gIH1cbiAgX19nZXRTY2FubmVyQWRkcmVzcyhvY3JUeXBlKSB7XG4gICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICB0cnkge1xuICAgICAgbGV0IGFkZHJlc3MgPSAwO1xuICAgICAgbGV0IGRlc3Ryb3lDYWxsYmFjayA9IG51bGw7XG4gICAgICBjb25zdCBzdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX2dldFN0cmluZ09uV2FzbUhlYXAoKTtcbiAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAvLyBPQ1JcbiAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldElEQ2FyZFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95SURDYXJkU2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldFBhc3Nwb3J0U2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lQYXNzcG9ydFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0QWxpZW5TY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUFsaWVuU2Nhbm5lcihhZGRyZXNzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRDcmVkaXRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUNyZWRpdFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2FubmVyIGRvZXMgbm90IGV4aXN0cycpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZShzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgIGlmIChhZGRyZXNzID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MgPT09IHRoaXMuX19yZXRyeUNvdW50R2V0QWRkcmVzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgTGljZW5zZSBLZXknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fcmV0cnlDb3VudEdldEFkZHJlc3MrKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBbYWRkcmVzcywgZGVzdHJveUNhbGxiYWNrXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPIDogTGljZW5zZSBJc3N1ZeyduCDqsr3smrAg7JeQ65+sIOqwkuydhCDrsJvslYTshJwgZXJyb3Ig66Gc6re466W8IOywjeydhCDsiJgg7J6I6rKMIOyalOyyre2VhOyalCAo7J6E7IucIE7rsogg7J207IOBIGFkZHJlc3Prpbwg66q767Cb7Jy866m0IOqwleygnCDsl5Drn6wpXG4gICAgICB2b2lkIDA7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICBfX2dldEJ1ZmZlcigpIHtcbiAgICBpZiAoIXRoaXMuX19CdWZmZXIpIHtcbiAgICAgIHRoaXMuX19CdWZmZXIgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2ModGhpcy5fX3Jlc29sdXRpb25XaWR0aCAqIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0ICogNCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fX3Jlc3VsdEJ1ZmZlcikge1xuICAgICAgdGhpcy5fX3Jlc3VsdEJ1ZmZlciA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyg0MDk2KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tJbmZvKSB7XG4gICAgICBpZiAoIXRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zikge1xuICAgICAgICB0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MoNDA5Nik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbdGhpcy5fX0J1ZmZlciwgdGhpcy5fX3Jlc3VsdEJ1ZmZlciwgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmXTtcbiAgfVxuICBhc3luYyBfX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIG1hc2tNb2RlLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChpbWdUeXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5lbmNvZGVKcGdEZXRlY3RlZEZyYW1lSW1hZ2UoYWRkcmVzcywgbWFza01vZGUsIGltZ01vZGUpO1xuICAgICAgfSBlbHNlIGlmIChpbWdUeXBlID09PSAnZmFjZScpIHtcbiAgICAgICAgdGhpcy5fX09DUkVuZ2luZS5lbmNvZGVKcGdEZXRlY3RlZFBob3RvSW1hZ2UoYWRkcmVzcyk7XG4gICAgICB9XG4gICAgICBjb25zdCBqcGdTaXplID0gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNvZGVkSnBnU2l6ZSgpO1xuICAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jb2RlZEpwZ0J1ZmZlcigpO1xuICAgICAgY29uc3QgcmVzdWx0VmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguYnVmZmVyLCBqcGdQb2ludGVyLCBqcGdTaXplKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHJlc3VsdFZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXN1bHRdLCB7XG4gICAgICAgIHR5cGU6ICdpbWFnZS9qcGVnJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fX2Jsb2JUb0Jhc2U2NChibG9iKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lFbmNvZGVkSnBnKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZyZWUgYnVmZmVyICovXG4gIF9fZGVzdHJveUJ1ZmZlcigpIHtcbiAgICBpZiAodGhpcy5fX0J1ZmZlcikge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fQnVmZmVyKTtcbiAgICAgIHRoaXMuX19CdWZmZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9fZGVzdHJveVJlc3VsdEJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKTtcbiAgfVxuICBfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19yZXN1bHRCdWZmZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX3Jlc3VsdEJ1ZmZlcik7XG4gICAgICB0aGlzLl9fcmVzdWx0QnVmZmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgX19kZXN0cm95TWFza0luZm9SZXN1bHRCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYpO1xuICAgICAgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogRnJlZSBQcmV2SW1hZ2UgYnVmZmVyICovXG4gIF9fZGVzdHJveVByZXZJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5fX1ByZXZJbWFnZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fUHJldkltYWdlKTtcbiAgICAgIHRoaXMuX19QcmV2SW1hZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBmcmVlIHN0cmluZyBoZWFwIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCkge1xuICAgIGlmICh0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5fZnJlZSh0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICB0aGlzLl9fc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIGZyZWUgc2Nhbm5lciBhZGRyZXNzICovXG4gIF9fZGVzdHJveVNjYW5uZXJBZGRyZXNzKCkge1xuICAgIGlmICh0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjaykge1xuICAgICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2soKTtcbiAgICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUodmlkZW9FbGVtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgcmVzb2x1dGlvblRleHRcbiAgICB9ID0gYXdhaXQgdGhpcy5fX3NldFZpZGVvUmVzb2x1dGlvbih2aWRlb0VsZW1lbnQpO1xuICAgIGlmICghaXNTdXBwb3J0ZWRSZXNvbHV0aW9uKSB7XG4gICAgICBpZiAocmVzb2x1dGlvblRleHQgIT09ICdub3QgcmVhZHknKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzU3VwcG9ydGVkUmVzb2x1dGlvbjtcbiAgfVxuICBfX2dldFJvdGF0aW9uRGVncmVlKCkge1xuICAgIHJldHVybiAodGhpcy5fX29wdGlvbnMucm90YXRpb25EZWdyZWUgJSAzNjAgKyAzNjApICUgMzYwO1xuICB9XG4gIF9fZ2V0TWlycm9yTW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnMubWlycm9yTW9kZTtcbiAgfVxuICBhc3luYyBfX2Nyb3BJbWFnZUZyb21WaWRlbygpIHtcbiAgICBpZiAoIXRoaXMuX19jYW1TZXRDb21wbGV0ZSkgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICBsZXQgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG5cbiAgICAvLyBzb3VyY2UgaW1hZ2UgKG9yIHZpZGVvKVxuICAgIC8vIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUk1xuICAgIC8vIOKUgyAgICAg4pSKIHN5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSD4pSI4pSI4pSI4pSIIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUkyDilIogICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgc3ggIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogc0hlaWdodCAgICAgICDilINcbiAgICAvLyDilIMgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICAgICAgICDilIMgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiBjYW52YXNcbiAgICAvLyDilIMgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyDilIogICAgICAgICAgICAgICDilIPilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJNcbiAgICAvLyDilIMgICAgIOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiCAgICAgICAgICAgICAgICAg4pSDICAgIOKUiiAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUgyAgICAgICAgICAgc1dpZHRoICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICDilIogZHkgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsgICAg4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTIOKUiiAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg+KUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgZHggICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogZEhlaWdodCDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgIOKUgyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUmyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIMgICAgICAgICAgIOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiCAgICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICAgICAgICBkV2lkdGggICAgICAgICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBkeCwgZHkpXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodClcbiAgICAvLyBkcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodClcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEL2RyYXdJbWFnZVxuXG4gICAgbGV0IGNhbGNDYW52YXMgPSBjYW52YXM7XG4gICAgbGV0IGNhbGNWaWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvSGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudFdpZHRoID0gdmlkZW8uY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9IHZpZGVvLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCA9IHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGg7XG4gICAgbGV0IGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0ID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNDcm9wSW1hZ2VTaXplV2lkdGgsIGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0XSA9IFtjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCwgY2FsY0Nyb3BJbWFnZVNpemVXaWR0aF07XG4gICAgICBbY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faF0gPSBbY2FsY1Jlc29sdXRpb25faCwgY2FsY1Jlc29sdXRpb25fd107XG4gICAgICBjYWxjQ2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgICBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uID09PSAncG9ydHJhaXQnID8gJ2xhbmRzY2FwZScgOiAncG9ydHJhaXQnO1xuICAgIH1cbiAgICBsZXQgY2FsY01heFNXaWR0aCA9IDk5OTk5O1xuICAgIGxldCBjYWxjTWF4U0hlaWdodCA9IDk5OTk5O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDshLjroZwgVUkgLyDshLjroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTV2lkdGggPSBjYWxjVmlkZW9XaWR0aDtcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDshLjroZwgVUkgLyDqsIDroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAvIOqwgOuhnCDsubTrqZTrnbxcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDqsIDroZwgVUkgLyDshLjroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTV2lkdGggPSBjYWxjVmlkZW9XaWR0aDtcbiAgICAgICAgY2FsY01heFNIZWlnaHQgPSBjYWxjVmlkZW9IZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzeCwgc3k7XG4gICAgY29uc3QgcmF0aW8gPSBjYWxjVmlkZW9XaWR0aCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IHNXaWR0aCA9IE1hdGgubWluKE1hdGgucm91bmQoY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCAqIHJhdGlvKSwgY2FsY01heFNXaWR0aCk7XG4gICAgY29uc3Qgc0hlaWdodCA9IE1hdGgubWluKE1hdGgucm91bmQoY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQgKiByYXRpbyksIGNhbGNNYXhTSGVpZ2h0KTtcbiAgICBzeCA9IE1hdGgubWF4KE1hdGgucm91bmQoKGNhbGNWaWRlb0NsaWVudFdpZHRoIC0gY2FsY0Nyb3BJbWFnZVNpemVXaWR0aCkgLyAyICogcmF0aW8pLCAwKTtcbiAgICBzeSA9IE1hdGgubWF4KE1hdGgucm91bmQoKGNhbGNWaWRlb0NsaWVudEhlaWdodCAtIGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0KSAvIDIgKiByYXRpbyksIDApO1xuICAgIGlmIChpc0FsaWVuQmFjaykge1xuICAgICAgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW2NhbGNSZXNvbHV0aW9uX2gsIGNhbGNSZXNvbHV0aW9uX3ddO1xuICAgIH1cbiAgICBjYWxjQ2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjYWxjUmVzb2x1dGlvbl93KTtcbiAgICBjYWxjQ2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgY29uc3QgY2FsY0NvbnRleHQgPSBjYWxjQ2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgfSk7XG4gICAgY2FsY0NvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgbGV0IGltZ0RhdGEsIGltZ0RhdGFVcmw7XG4gICAgaW1nRGF0YSA9IGNhbGNDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oKTtcbiAgICBpbWdEYXRhVXJsID0gY2FsY0NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgICBpZiAoaXNBbGllbkJhY2spIHtcbiAgICAgIFtpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgMjcwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCB0aGlzLl9fZ2V0Um90YXRpb25EZWdyZWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbaW1nRGF0YSwgaW1nRGF0YVVybF07XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIGRlZ3JlZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChkZWdyZWUgPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZShbaW1nRGF0YSwgaW1nRGF0YVVybF0pO1xuICAgICAgfVxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBpbWcuc3JjID0gaW1nRGF0YVVybDtcbiAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBjYW52YXMgPSByb3RhdGlvbkNhbnZhcztcbiAgICAgICAgY29uc3QgdGVtcENvbnRleHQgPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRlbXBDYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBpZiAoWzkwLCAyNzBdLmluY2x1ZGVzKGRlZ3JlZSkpIHtcbiAgICAgICAgICB0ZW1wQ2FudmFzLndpZHRoID0gaW1nLmhlaWdodDtcbiAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGltZy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChbMCwgMTgwXS5pbmNsdWRlcyhkZWdyZWUpKSB7XG4gICAgICAgICAgdGVtcENhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZ3JlZSA9PT0gOTApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZShpbWcuaGVpZ2h0LCAwKTtlbHNlIGlmIChkZWdyZWUgPT09IDE4MCkgdGVtcENvbnRleHQudHJhbnNsYXRlKGltZy53aWR0aCwgaW1nLmhlaWdodCk7ZWxzZSBpZiAoZGVncmVlID09PSAyNzApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZSgwLCBpbWcud2lkdGgpO1xuICAgICAgICB0ZW1wQ29udGV4dC5yb3RhdGUoZGVncmVlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRlbXBDb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgICBjb25zdCBuZXdJbWFnZURhdGEgPSBbOTAsIDI3MF0uaW5jbHVkZXMoZGVncmVlKSA/IHRlbXBDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBpbWcuaGVpZ2h0LCBpbWcud2lkdGgpIDogdGVtcENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgIHJlc29sdmUoW25ld0ltYWdlRGF0YSwgdGVtcENhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKV0pO1xuICAgICAgICB0ZW1wQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIGJveFR5cGUgPSAwLCByZXRyeUltZyA9IG51bGwpIHtcbiAgICBpZiAoIWFkZHJlc3MgfHwgYWRkcmVzcyA8IDApIHtcbiAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbGV0IGltZ0RhdGE7XG4gICAgICBsZXQgaW1nRGF0YVVybCA9IG51bGw7XG4gICAgICBjb25zdCBbYnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGlmIChyZXRyeUltZyAhPT0gbnVsbCkge1xuICAgICAgICBpbWdEYXRhID0gcmV0cnlJbWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICB9XG4gICAgICBpZiAoISEhaW1nRGF0YSkge1xuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguc2V0KGltZ0RhdGEuZGF0YSwgYnVmZmVyKTtcbiAgICAgIGxldCBrb3IgPSBmYWxzZSxcbiAgICAgICAgYWxpZW4gPSBmYWxzZSxcbiAgICAgICAgcGFzc3BvcnQgPSBmYWxzZTtcbiAgICAgIHN3aXRjaCAodGhpcy5fX29jclR5cGUpIHtcbiAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgIGtvciA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBwYXNzcG9ydCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgYWxpZW4gPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgIC8vIG5vdGhpbmdcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgICB9XG4gICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgIGlmIChrb3IgfHwgcGFzc3BvcnQgfHwgYWxpZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5kZXRlY3RfaWRjYXJkX29wdChidWZmZXIsIHRoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCBhZGRyZXNzLCBrb3IsIGFsaWVuLCBwYXNzcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLmRldGVjdF9pZGNhcmQoYnVmZmVyLCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgYWRkcmVzcywgYm94VHlwZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdpc0NhcmRib3hEZXRlY3RlZCByZXN1bHQgLT0tLS0tLScsIHJlc3VsdClcbiAgICAgIHJldHVybiBbISFyZXN1bHQsIGltZ0RhdGEsIGltZ0RhdGFVcmxdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnQ2FyZCBkZXRlY3Rpb24gZXJyb3IgOiAnICsgZTtcbiAgICAgIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ21lbW9yeScpKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgX19zdGFydFJlY29nbml0aW9uKGFkZHJlc3MsIG9jclR5cGUsIHNzYU1vZGUsIGlzU2V0SWdub3JlQ29tcGxldGUsIGltZ0RhdGEsIGltZ0RhdGFVcmwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGFkZHJlc3MgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChhZGRyZXNzID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJ2NoZWNrVmFsaWRhdGlvbiBGYWlsJztcbiAgICAgIH1cbiAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsO1xuICAgICAgaWYgKCF0aGlzLl9fb2NyVHlwZUxpc3QuaW5jbHVkZXMob2NyVHlwZSkpIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT0NSIHR5cGUnKTtcbiAgICAgIGNvbnN0IFssIHJlc3VsdEJ1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBjb25zdCByZWNvZ25pdGlvbiA9IGFzeW5jIGlzU2V0SWdub3JlQ29tcGxldGUgPT4ge1xuICAgICAgICBpZiAoaXNTZXRJZ25vcmVDb21wbGV0ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCAwLCBpbWdEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9jclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdpZGNhcmQnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgICAgY2FzZSAnaWRjYXJkLXNzYSc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyLXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5JRENhcmQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhblBhc3Nwb3J0KGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgICAgY2FzZSAnYWxpZW4tc3NhJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkFsaWVuKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhbGllbi1iYWNrJzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkFsaWVuQmFjayhhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuc2NhbkNyZWRpdChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkb2VzIG5vdCBleGlzdHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IOyLoOyaqey5tOuTnOuKlCDslYTsp4Ega2V5OnZhbHVlIO2Yle2DnOuhnCDrs4DtmZgg7JWI65CY7Ja0IOyeiOydjFxuICAgICAgICBpZiAob2NyVHlwZSA9PT0gJ2NyZWRpdCcpIHtcbiAgICAgICAgICBpZiAob2NyUmVzdWx0ID09PSBudWxsIHx8IG9jclJlc3VsdCA9PT0gJycgfHwgb2NyUmVzdWx0ID09PSAnZmFsc2UnIHx8IG9jclJlc3VsdFswXSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX2NzdlRvT2JqZWN0KG9jclJlc3VsdCk7XG4gICAgICAgIGlmIChvY3JSZXN1bHQ/LmNvbXBsZXRlICE9PSAndW5kZWZpbmVkJyAmJiBvY3JSZXN1bHQ/LmNvbXBsZXRlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNTZXRJZ25vcmVDb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50IDwgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgICAgLy8gZGV0ZWN0ZWRDYXJkUXVldWXsl5DshJwg7ZWc7J6l7J2EIOq6vOuCtOyEnCDqsLHsi6DtlZzri6QuXG4gICAgICAgICAgICAgIC8vIOyggOyepeuQmOyWtOyeiOuKlCDsnbTrr7jsp4DsnZgg7Iir7J6Q6rCAIHJldHJ5IOuztOuLpCDsnpHsnYDqsr3smrAg64yA67mE7ZWY7JesICXrpbwg7IKs7Jqp7ZWoXG4gICAgICAgICAgICAgIGNvbnN0IHF1ZXVlSWR4ID0gdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgJSB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICBpbWdEYXRhID0gdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlW3F1ZXVlSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlY29nbml0aW9uKGlzU2V0SWdub3JlQ29tcGxldGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8g7IKs7KeEIO2VnOyepeycvOuhnCBPQ1Ig7Iuk7YyoIChwb3B1cCDrgrTrpqzqs6Agc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpIOyymOumrD9cbiAgICAgICAgICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7IC8vIO2MneyXheydtCDrgrTroKTqsIjrlYwg7LKY66as65CY7KeA66eMIOuvuOumrCDsspjrpqxcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVELCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIGVuZCBvZiBmdW5jdGlvbiByZWNvZ25pdGlvbigpXG5cbiAgICAgIGlmIChhd2FpdCByZWNvZ25pdGlvbihpc1NldElnbm9yZUNvbXBsZXRlKSkge1xuICAgICAgICBjb25zdCBpc0NyZWRpdENhcmQgPSBvY3JUeXBlID09PSAnY3JlZGl0JztcbiAgICAgICAgbGV0IG9yaWdpbkltYWdlTW9kZTtcbiAgICAgICAgaWYgKGlzQ3JlZGl0Q2FyZCkge1xuICAgICAgICAgIG9yaWdpbkltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLkNST1BQSU5HO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLnVzZUltYWdlQ3JvcHBpbmcpIHtcbiAgICAgICAgICBvcmlnaW5JbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5DUk9QUElORztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fb3B0aW9ucy51c2VJbWFnZVdhcnBpbmcpIHtcbiAgICAgICAgICBvcmlnaW5JbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5XQVJQSU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWdpbkltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLk5PTkU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yaWdpbkltYWdlID0gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIHRoaXMuT0NSX0lNR19NQVNLX01PREUuRkFMU0UsIG9yaWdpbkltYWdlTW9kZSk7XG4gICAgICAgIGxldCBtYXNrSW1hZ2UgPSBudWxsO1xuICAgICAgICBsZXQgZmFjZUltYWdlID0gbnVsbDtcbiAgICAgICAgbGV0IG1hc2tJbWFnZU1vZGU7XG4gICAgICAgIGlmICghaXNDcmVkaXRDYXJkKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUltYWdlQ3JvcHBpbmcpIHtcbiAgICAgICAgICAgIG1hc2tJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5DUk9QUElORztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFza0ltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLldBUlBJTkc7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1hc2tJbWFnZSA9IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCB0aGlzLk9DUl9JTUdfTUFTS19NT0RFLlRSVUUsIG1hc2tJbWFnZU1vZGUpO1xuICAgICAgICAgIG1hc2tJbWFnZSA9IG1hc2tJbWFnZSA9PT0gJ2RhdGE6JyA/IG51bGwgOiBtYXNrSW1hZ2U7XG4gICAgICAgICAgZmFjZUltYWdlID0gdGhpcy5fX29wdGlvbnMudXNlRmFjZUltYWdlID8gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIG51bGwsIG9yaWdpbkltYWdlTW9kZSwgJ2ZhY2UnKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNzYU1vZGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQSwgZmFsc2UsIG1hc2tJbWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgLy8gaWYgKCFpc0NyZWRpdENhcmQgJiYgdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpIHtcbiAgICAgICAgLy8gICBvcmlnaW5JbWFnZSA9IHRoaXMuX19nZXRQaWlFbmNyeXB0SW1hZ2VCYXNlNjQoXG4gICAgICAgIC8vICAgICBhZGRyZXNzLFxuICAgICAgICAvLyAgICAgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5GQUxTRSxcbiAgICAgICAgLy8gICAgIG9jckltYWdlTW9kZVxuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2VuY3J5cHQgYmFzZTY0IGltYWdlJywgeyBvcmlnaW5JbWFnZSB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBpZiAoZmFjZUltYWdlICYmIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRGYWNlKSB7XG4gICAgICAgIC8vICAgZmFjZUltYWdlID0gdGhpcy5fX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChcbiAgICAgICAgLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vICAgICBudWxsLFxuICAgICAgICAvLyAgICAgb2NySW1hZ2VNb2RlLFxuICAgICAgICAvLyAgICAgJ2ZhY2UnXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZW5jcnlwdCBiYXNlNjQgZmFjZSBpbWFnZScsIHsgZmFjZUltYWdlIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gICAgICAgIHJldHVybiBbb2NyUmVzdWx0LCBvcmlnaW5JbWFnZSwgbWFza0ltYWdlLCBmYWNlSW1hZ2VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgX19zdGFydFRydXRoKG9jclR5cGUsIGFkZHJlc3MpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgWywgcmVzdWx0QnVmZmVyXSA9IHRoaXMuX19nZXRCdWZmZXIoKTtcbiAgICAgIGlmIChvY3JUeXBlLmluZGV4T2YoJy1zc2EnKSA+IC0xKSB7XG4gICAgICAgIC8vIFRPRE86IHdvcmtlcuulvCDsgqzsmqntlZjsl6wg66mU7J24KFVJIOuenOuNlOungSkg7Iqk66CI65Oc6rCAIOupiOy2lOyngCDslYrrj4TroZ0g7LKY66asIO2VhOyalCAo7ZiE7J6sIGxvYWRpbmcgVUkg652E7Jqw66m0IOyVoOuLiOuplOydtOyFmCDrqYjstqQpXG4gICAgICAgIC8vIFRPRE86IHNldFRpbWVvdXQg7Jy866GcIOuCmOuIhOuNlOudvOuPhCDtmqjqs7wg7JeG7J2MIHNldFRpbWVvdXQg7KeA7Jqw6rOgLCB3b3JrZXLroZwg67OA6rK9IO2VhOyalFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuX19PQ1JFbmdpbmUuc2NhblRydXRoKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcikpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU1NBIE1vZGUgaXMgdHJ1ZS4gYnV0LCBvY3JUeXBlIGlzIGludmFsaWQgOiAnICsgb2NyVHlwZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fY3N2VG9PYmplY3Qoc3RyKSB7XG4gICAgbGV0IHBhaXJzID0gc3RyLnNwbGl0KCc7Jyk7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJzonKTtcbiAgICAgIGlmIChwYWlyLmxlbmd0aCA9PT0gMikgb2JqW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBfX2dldE1hc2tJbmZvKGFkZHJlc3MpIHtcbiAgICBpZiAoYWRkcmVzcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChhZGRyZXNzID09PSAtMSkge1xuICAgICAgcmV0dXJuICdjaGVja1ZhbGlkYXRpb24gRmFpbCc7XG4gICAgfVxuICAgIGNvbnN0IFssLCBtYXNrSW5mb1Jlc3VsdEJ1Zl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5nZXRNYXNrUmVjdChhZGRyZXNzLCBtYXNrSW5mb1Jlc3VsdEJ1Zik7XG4gICAgaWYgKHJlc3VsdCA9PSBudWxsIHx8IHJlc3VsdCA9PT0gJycpIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyB0aGlzLl9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCk7XG5cbiAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsID8gbnVsbCA6IHRoaXMuX19jc3ZUb09iamVjdChyZXN1bHQpO1xuICB9XG4gIGFzeW5jIF9fc3RhcnRUcnV0aFJldHJ5KG9jclR5cGUsIGFkZHJlc3MsIGltZ0RhdGEpIHtcbiAgICBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgMCwgaW1nRGF0YSk7XG4gICAgLy8gYXdhaXQgdGhpcy5fX3N0YXJ0UmVjb2duaXRpb24oYWRkcmVzcywgb2NyVHlwZSwgdHJ1ZSk7ICAgICAgLy8gZm9yIOyEseuKpeydhCDsnITtlbQg7KeE7ZaJIFhcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGgob2NyVHlwZSwgYWRkcmVzcyk7XG4gIH1cbiAgX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCkge1xuICAgIHRoaXMuX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTtcbiAgICB0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gMey0iCBkZWxheSDtm4Qg7Iuk7ZaJXG4gICAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICB9LCB0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsKTtcbiAgfVxuICBhc3luYyBfX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgICBjb25zdCBpc1Bhc3Nwb3J0ID0gdGhpcy5fX29jclR5cGUuaW5jbHVkZXMoJ3Bhc3Nwb3J0Jyk7XG4gICAgICBhd2FpdCB0aGlzLl9fc2V0dXBWaWRlbyhpc1Bhc3Nwb3J0KTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgaWYgKHZpZGVvKSB7XG4gICAgICAgIC8vIGNvbnN0IFt0cmFja10gPSB0aGlzLl9fc3RyZWFtLmdldFZpZGVvVHJhY2tzKCk7XG4gICAgICAgIC8vIGNvbnN0IGNhcGFiaWxpdHkgPSB0cmFjay5nZXRDYXBhYmlsaXRpZXMoKTtcbiAgICAgICAgLy8gY29uc29sZS5kZWJ1ZygnQ2FyZFNjYW5fX2luaXRpYWxpemUgY2FwYWJpbGl0eScsIGNhcGFiaWxpdHkpO1xuICAgICAgICBpZiAoJ3NyY09iamVjdCcgaW4gdmlkZW8pIHtcbiAgICAgICAgICB2aWRlby5zcmNPYmplY3QgPSB0aGlzLl9fc3RyZWFtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEF2b2lkIHVzaW5nIHRoaXMgaW4gbmV3IGJyb3dzZXJzLCBhcyBpdCBpcyBnb2luZyBhd2F5LlxuICAgICAgICAgIHZpZGVvLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuX19zdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgKCkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uIC0gb25sb2FkZWRtZXRhZGF0YScpO1xuICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuXG4gICAgICAgICAgLy8gdmlkZW8gZWxlbWVudCBzdHlsZSDshKTsoJVcbiAgICAgICAgICB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9IHZpZGVvLnZpZGVvV2lkdGggLyB2aWRlby52aWRlb0hlaWdodCA8IDEgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdGhpcy5fX2NhbVNldENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9fYWRqdXN0U3R5bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLlJFQURZKTtcbiAgICAgICAgdmlkZW8ud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RBbGxvd2VkRXJyb3InKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdDYW1lcmEgQWNjZXNzIFBlcm1pc3Npb24gaXMgbm90IGFsbG93ZWQnO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U0MDMnLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChlLm5hbWUgPT09ICdOb3RSZWFkYWJsZUVycm9yJykge1xuICAgICAgICAvLyDri6Trpbjqs7Psl5DshJwg7Lm066mU6528IOyekOybkOydhCDsgqzsmqnspJFcbiAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZKTtcbiAgICAgICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0IDwgMCkge1xuICAgICAgICAgIC8vIOy5tOuplOudvCDrpqzshozsiqQg7J6s7JqU7LKtIO2an+yImOygnO2VnCDsl4bsnYxcbiAgICAgICAgICB0aGlzLl9fY2FtZXJhUmVzb3VyY2VSZXRyeUNvdW50ICs9IDE7XG4gICAgICAgICAgdGhpcy5fX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTsgLy8g7J6s6reAIO2YuOy2nFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUxpbWl0ID4gdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCArPSAxO1xuICAgICAgICAgICAgdGhpcy5fX3NldENhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKTsgLy8g7J6s6reAIO2YuOy2nFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIHBlcm1pc3Npb25zIHdlcmUgZ3JhbnRlZCwgYnV0IEZhaWxlZCB0byBhY3F1aXJlIENhbWVyYSByZXNvdXJjZXMuJztcbiAgICAgICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDAzJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZS5uYW1lID09PSAnTm90Rm91bmRFcnJvcicpIHtcbiAgICAgICAgLy8g6riw6riw7JeQIOyXsOqysOuQnCDsubTrqZTrnbzqsIAg7JeG7J2MXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdDYW1lcmEgTm90IEZvdW5kJztcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDA0JywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yIE9jY3VyZWQnO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ0U5OTknLCBlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBfX3NldFN0eWxlKGVsLCBzdHlsZSkge1xuICAgIGlmIChlbCAmJiBzdHlsZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihlbC5zdHlsZSwgc3R5bGUpO1xuICAgIH1cbiAgfVxuICBfX2NoYW5nZU9DUlN0YXR1cyh2YWwpIHtcbiAgICBzd2l0Y2ggKHZhbCkge1xuICAgICAgLy8gT0NSXG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuTk9UX1JFQURZOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk5PVF9SRUFEWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuUkVBRFk6XG4gICAgICAgIHRoaXMuX19vY3JTdGF0dXMgPSB0aGlzLk9DUl9TVEFUVVMuUkVBRFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEOlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEX1dJVEhfU1NBOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTUzpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQTpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfRkFJTEVEOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLkRPTkU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX2NoYW5nZVN0YWdlKHZhbCwgZm9yY2VVcGRhdGUgPSBmYWxzZSwgcmVjb2duaXplZEltYWdlID0gbnVsbCkge1xuICAgIGlmICh0aGlzLl9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9PT0gdmFsICYmIGZvcmNlVXBkYXRlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9fY2hhbmdlT0NSU3RhdHVzKHZhbCk7XG4gICAgdGhpcy5fX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPSB2YWw7XG4gICAgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwID0gdmFsO1xuICAgIGNvbnN0IHtcbiAgICAgIGd1aWRlQm94LFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBib3JkZXJXaWR0aDogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS53aWR0aCArICdweCcsXG4gICAgICBib3JkZXJTdHlsZTogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5zdHlsZSxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXMgKyAncHgnLFxuICAgICAgYm9yZGVyQ29sb3I6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGVbdmFsXVxuICAgIH07XG4gICAgaWYgKGd1aWRlQm94KSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHN0eWxlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlKSB7XG4gICAgICBpZiAoISF0aGlzLl9fb3B0aW9ucy5zaG93Q2xpcEZyYW1lKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hc2tCb3hXcmFwPy5xdWVyeVNlbGVjdG9yKCcjbWFza0JveE91dGVyJyk/LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlW3ZhbF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICBjYXB0dXJlQnV0dG9uPy5xdWVyeVNlbGVjdG9yKCcjY2FwdHVyZUJ1dHRvbicpPy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9fb3B0aW9ucy5jYXB0dXJlQnV0dG9uU3R5bGVbJ2Jhc2VfY29sb3InXSk7XG4gICAgfVxuICAgIGNvbnN0IG9jck1vZGUgPSB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPyAnc2VydmVyJyA6ICd3YXNtJztcbiAgICBpZiAodGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVRvcFVJIHx8IHRoaXMuX19vcHRpb25zLnVzZVRvcFVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX3RvcFVJLCAndG9wJywgdGhpcy5fX29wdGlvbnMudXNlVG9wVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX19taWRkbGVVSSwgJ21pZGRsZScsIHRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fYm90dG9tVUksICdib3R0b20nLCB0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MgfHwgdmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSk7XG5cbiAgICAgICAgLy8gRkFJTOyduCDqsr3smrAgNey0iO2bhCDsnpDrj5nsnYQg7LC964ur7J2MXG4gICAgICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVEKSB7XG4gICAgICAgICAgc2V0VGltZW91dCh0aGlzLl9faGlkZVByZXZpZXdVSSwgMzAwMCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICB2aWRlb1xuICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBKSB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX19oaWRlUHJldmlld1VJKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxKTsgLy8gZm9yIFVJIHVwZGF0ZVxuICB9XG5cbiAgX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdJbWFnZVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSByZWNvZ25pemVkSW1hZ2U7XG4gICAgY29uc3QgaW1nU3R5bGUgPSB7XG4gICAgICAnbWF4LXdpZHRoJzogJzcwJScsXG4gICAgICAnbWF4LWhlaWdodCc6ICc2MCUnXG4gICAgfTtcbiAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld0ltYWdlLCBpbWdTdHlsZSk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4J1xuICAgIH0pO1xuICB9XG4gIF9faGlkZVByZXZpZXdVSShjb250ZXh0KSB7XG4gICAgbGV0IF90aGlzXyA9IHRoaXM7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIF90aGlzXyA9IGNvbnRleHQ7XG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdJbWFnZVxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIF90aGlzXy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgfSk7XG4gICAgX3RoaXNfLl9fc2V0U3R5bGUocHJldmlld1VJV3JhcCwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gICAgcHJldmlld0ltYWdlLnNyYyA9ICcnO1xuICB9XG4gIGFzeW5jIF9fZ2V0SW5wdXREZXZpY2VzKCkge1xuICAgIC8vIHRocm93IGVycm9yIGlmIG5hdmlnYXRvci5tZWRpYURldmljZXMgaXMgbm90IHN1cHBvcnRlZFxuICAgIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCduYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgZGV2aWNlcyA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGxldCBjYW1lcmEgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGRldmljZSBvZiBkZXZpY2VzKSB7XG4gICAgICBpZiAoZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0Jykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChkZXZpY2UgaW5zdGFuY2VvZiBJbnB1dERldmljZUluZm8pIHtcbiAgICAgICAgICAgIGlmIChkZXZpY2UuZ2V0Q2FwYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhcCA9IGRldmljZS5nZXRDYXBhYmlsaXRpZXMoKTtcbiAgICAgICAgICAgICAgaWYgKGNhcD8uZmFjaW5nTW9kZT8uaW5jbHVkZXModGhpcy5fX2ZhY2luZ01vZGVDb25zdHJhaW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzVWx0cmFDYW1lcmFSZWcgPSAvdWx0cmF87Jq47Yq46528L2dpO1xuICAgICAgICAgICAgICAgIGlmIChpc1VsdHJhQ2FtZXJhUmVnLnRlc3QoZGV2aWNlLmxhYmVsPy50b0xvd2VyQ2FzZSgpKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FtZXJhLnB1c2goY2FwLmRldmljZUlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlPUyAxNyDrr7jrp4zsnZggY2hyb21lLCBzYWZhcmkg7JeQ7ISc64qUXG4gICAgICAgICAgLy8gSW5wdXREZXZpY2VJbmZvIOqwneyytOqwgCDsl4bslrTshJwgZ2V0Q2FwYWJpbGl0aWVz66W8IO2ZleyduO2VoCDsiJgg7JeG6riwIOuVjOusuOyXkFxuICAgICAgICAgIC8vIGRldmljZSBsYWJlbOunjCDrs7Tqs6Ag7ZuE66m0IOy5tOuplOudvOuhnCDsgqzsmqlcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBpc0JhY2tDYW1lcmFSZWcgPSAvYmFja3ztm4TrqbQvZztcbiAgICAgICAgICAgIGlmIChkZXZpY2UubGFiZWw/Lmxlbmd0aCAmJiBpc0JhY2tDYW1lcmFSZWcudGVzdChkZXZpY2UubGFiZWwpKSB7XG4gICAgICAgICAgICAgIGNhbWVyYS5wdXNoKGRldmljZS5kZXZpY2VJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19kZWJ1ZyhgY2FtZXJhID0gJHtjYW1lcmF9LCBjYW1lcmEubGVuZ3RoID0gJHtjYW1lcmEubGVuZ3RofWApO1xuICAgIHJldHVybiBjYW1lcmE7XG4gIH1cbiAgY2hlY2tVSU9yaWVudGF0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBkZXRlY3Rvci5nZXRVSU9yaWVudGF0aW9uKGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkub2NyKTtcbiAgICBsZXQgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnQgIT09IHRoaXMuX19wcmV2VWlPcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fX3VpT3JpZW50YXRpb24gPSBjdXJyZW50O1xuICAgICAgdGhpcy5fX3ByZXZVaU9yaWVudGF0aW9uID0gY3VycmVudDtcbiAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50LFxuICAgICAgaXNDaGFuZ2VkXG4gICAgfTtcbiAgfVxuICBfX2NsZWFyQ3VzdG9tVUkob2JqKSB7XG4gICAgb2JqLmlubmVySFRNTCA9ICcnO1xuICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgb2JqLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUob2JqLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcbiAgfVxuICBhc3luYyBfX3NldHVwRG9tRWxlbWVudHMoKSB7XG4gICAgbGV0IHtcbiAgICAgIG9jcixcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXMsXG4gICAgICBndWlkZUJveCxcbiAgICAgIHZpZGVvV3JhcCxcbiAgICAgIGd1aWRlQm94V3JhcCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgcHJldmVudFRvRnJlZXplVmlkZW8sXG4gICAgICBjdXN0b21VSVdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvbixcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3VUksXG4gICAgICBwcmV2aWV3SW1hZ2UsXG4gICAgICBzd2l0Y2hVSVdyYXAsXG4gICAgICBzd2l0Y2hVSSxcbiAgICAgIHByZWxvYWRpbmdVSVdyYXAsXG4gICAgICBwcmVsb2FkaW5nVUlcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoIW9jcikgdGhyb3cgbmV3IEVycm9yKCdvY3IgZGl2IGVsZW1lbnQgaXMgbm90IGV4aXN0Jyk7XG4gICAgaWYgKHZpZGVvV3JhcCkgdmlkZW9XcmFwLnJlbW92ZSgpO1xuICAgIGlmIChndWlkZUJveFdyYXApIGd1aWRlQm94V3JhcC5yZW1vdmUoKTtcbiAgICBpZiAodmlkZW8pIHZpZGVvLnJlbW92ZSgpO1xuICAgIGlmIChjYW52YXMpIGNhbnZhcy5yZW1vdmUoKTtcbiAgICBpZiAocm90YXRpb25DYW52YXMpIHJvdGF0aW9uQ2FudmFzLnJlbW92ZSgpO1xuICAgIGlmIChndWlkZUJveCkgZ3VpZGVCb3gucmVtb3ZlKCk7XG4gICAgaWYgKG1hc2tCb3hXcmFwKSBtYXNrQm94V3JhcC5yZW1vdmUoKTtcbiAgICBpZiAocHJldmVudFRvRnJlZXplVmlkZW8pIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLnJlbW92ZSgpO1xuICAgIGlmIChjdXN0b21VSVdyYXApIGN1c3RvbVVJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyDqsIEgdG9wLCBtaWRkbGUsIGJvdHRvbSBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHRvcFVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkodG9wVUkpO1xuICAgIGlmIChtaWRkbGVVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKG1pZGRsZVVJKTtcbiAgICBpZiAoYm90dG9tVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShib3R0b21VSSk7XG4gICAgaWYgKGNhcHR1cmVVSVdyYXApIGNhcHR1cmVVSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8gY2FwdHVyZSBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKGNhcHR1cmVVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShjYXB0dXJlVUkpO1xuICAgIGlmIChwcmV2aWV3VUlXcmFwKSBwcmV2aWV3VUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIHByZXZpZXcgVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChwcmV2aWV3VUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkocHJldmlld1VJKTtcbiAgICBpZiAoc3dpdGNoVUlXcmFwKSBzd2l0Y2hVSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8gc3dpdGNoIFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAoc3dpdGNoVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoc3dpdGNoVUkpO1xuICAgIGlmIChwcmVsb2FkaW5nVUlXcmFwKSBwcmVsb2FkaW5nVUlXcmFwLnJlbW92ZSgpO1xuICAgIGNvbnN0IHJvdGF0aW9uRGVncmVlID0gdGhpcy5fX2dldFJvdGF0aW9uRGVncmVlKCk7XG4gICAgdGhpcy5fX2lzUm90YXRlZDkwb3IyNzAgPSBbOTAsIDI3MF0uaW5jbHVkZXMocm90YXRpb25EZWdyZWUpO1xuICAgIGxldCBvY3JTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKG9jciwgb2NyU3R5bGUpO1xuICAgIGNvbnN0IHdyYXBTdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgLy8gdmVydGljYWwgYWxpZ24gbWlkZGxlXG4gICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG1hcmdpbjogJzAgYXV0bycsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICB9O1xuICAgIHZpZGVvV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZpZGVvV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndmlkZW9XcmFwJyk7XG4gICAgaWYgKHZpZGVvV3JhcCkge1xuICAgICAgd2hpbGUgKHZpZGVvV3JhcC5maXJzdENoaWxkKSB7XG4gICAgICAgIHZpZGVvV3JhcC5yZW1vdmVDaGlsZCh2aWRlb1dyYXAubGFzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlb1dyYXAsIHdyYXBTdHlsZSk7XG4gICAgfVxuICAgIG9jci5hcHBlbmRDaGlsZCh2aWRlb1dyYXApO1xuICAgIG1hc2tCb3hXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ21hc2tCb3hXcmFwJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICBtYXNrQm94V3JhcC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKG1hc2tCb3hXcmFwLCB3cmFwU3R5bGUpO1xuICAgIGxldCBtYXNrX2ZyYW1lID0gdGhpcy5fX29wdGlvbnMubWFza0ZyYW1lU3R5bGUuYmFzZV9jb2xvciArICdmZic7XG4gICAgaWYgKCEhdGhpcy5fX29wdGlvbnMuc2hvd0NsaXBGcmFtZSkge1xuICAgICAgbWFza19mcmFtZSA9IHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlLmNsaXBfZnJhbWUgKyAnNTUnO1xuICAgIH1cbiAgICBtYXNrQm94V3JhcC5pbm5lckhUTUwgPSAnJyArIFwiICA8c3ZnIGlkPSdtYXNrQm94Q29udGFpbmVyJyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPlxcblwiICsgXCIgICAgPG1hc2sgaWQ9J21hc2stcmVjdCc+XFxuXCIgKyBcIiAgICAgIDxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J3doaXRlJz48L3JlY3Q+XFxuXCIgKyBcIiAgICAgIDxzdmcgeD0nNTAlJyB5PSc1MCUnIG92ZXJmbG93PSd2aXNpYmxlJz5cXG5cIiArIFwiICAgICAgICAgIDxyZWN0IGlkPSdtYXNrQm94SW5uZXInXFxuXCIgKyBcIiAgICAgICAgICAgIHdpZHRoPSc0MDAnIGhlaWdodD0nMjYwJ1xcblwiICsgXCIgICAgICAgICAgICB4PSctMjAwJyB5PSctMTMwJ1xcblwiICsgXCIgICAgICAgICAgICByeD0nMTAnIHJ5PScxMCdcXG5cIiArIFwiICAgICAgICAgICAgZmlsbD0nYmxhY2snIHN0cm9rZT0nYmxhY2snPjwvcmVjdD5cXG5cIiArICcgICAgICA8L3N2Zz5cXG4nICsgJyAgICA8L21hc2s+XFxuJyArIFwiICAgIDxyZWN0IGlkPSdtYXNrQm94T3V0ZXInXFxuXCIgKyBcIiAgICAgICAgICB4PScwJyB5PScwJyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJ1xcblwiICsgXCIgICAgICAgICAgZmlsbD0nXCIgKyBtYXNrX2ZyYW1lICsgXCInIG1hc2s9J3VybCgjbWFzay1yZWN0KSc+PC9yZWN0PlxcblwiICsgJyAgPC9zdmc+JztcbiAgICBvY3IuYXBwZW5kQ2hpbGQobWFza0JveFdyYXApO1xuICAgIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndmlkZW8nKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJ3RydWUnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJ3RydWUnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcbiAgICBsZXQgdmlkZW9TdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH07XG4gICAgY29uc3Qgcm90YXRlQ3NzID0gJ3JvdGF0ZSgnICsgcm90YXRpb25EZWdyZWUgKyAnZGVnKSc7XG4gICAgY29uc3QgbWlycm9yQ3NzID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XG4gICAgY29uc3Qgcm90YXRlQW5kTWlycm9yQ3NzID0gbWlycm9yQ3NzICsgJyAnICsgcm90YXRlQ3NzO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgaWYgKHRoaXMuX19nZXRNaXJyb3JNb2RlKCkpIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IHJvdGF0ZUFuZE1pcnJvckNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZUFuZE1pcnJvckNzc1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IHJvdGF0ZUNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZUNzc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fX2dldE1pcnJvck1vZGUoKSkge1xuICAgICAgICB2aWRlb1N0eWxlID0ge1xuICAgICAgICAgIC4uLnZpZGVvU3R5bGUsXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogbWlycm9yQ3NzLFxuICAgICAgICAgIHRyYW5zZm9ybTogbWlycm9yQ3NzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywgdmlkZW9TdHlsZSk7XG4gICAgdmlkZW9XcmFwLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBndWlkZUJveFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBndWlkZUJveFdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2d1aWRlQm94V3JhcCcpO1xuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveFdyYXAsIHdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGd1aWRlQm94V3JhcCk7XG4gICAgZ3VpZGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnZ3VpZGVCb3gnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIGd1aWRlQm94LnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICB9KTtcbiAgICBndWlkZUJveFdyYXAuYXBwZW5kQ2hpbGQoZ3VpZGVCb3gpO1xuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FudmFzJyk7XG4gICAgY29uc3QgY2FudmFzU3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLl9fb3B0aW9ucy5zaG93Q2FudmFzUHJldmlldyA/IHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID8gJ25vbmUnIDogJ2Rpc3BsYXknIDogJ25vbmUnLFxuICAgICAgd2lkdGg6ICcyNSUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgIHRvcDogJzMwcHgnLFxuICAgICAgYm9yZGVyOiAnZ3JlZW4gMnB4IHNvbGlkJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhbnZhcywgY2FudmFzU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIHJvdGF0aW9uQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgcm90YXRpb25DYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3JvdGF0aW9uQ2FudmFzJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHJvdGF0aW9uQ2FudmFzLCB7XG4gICAgICBkaXNwbGF5OiB0aGlzLl9fb3B0aW9ucy5zaG93Q2FudmFzUHJldmlldyA/IHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID8gJ2Rpc3BsYXknIDogJ25vbmUnIDogJ25vbmUnLFxuICAgICAgaGVpZ2h0OiAnMjUlJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgdG9wOiAnMzBweCcsXG4gICAgICBib3JkZXI6ICdibHVlIDJweCBzb2xpZCdcbiAgICB9KTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQocm90YXRpb25DYW52YXMpO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJldmVudFRvRnJlZXplVmlkZW8uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZlbnRUb0ZyZWV6ZVZpZGVvJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZlbnRUb0ZyZWV6ZVZpZGVvLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGJvdHRvbTogJzEwJyxcbiAgICAgIHJpZ2h0OiAnMTAnXG4gICAgfSk7XG4gICAgcHJldmVudFRvRnJlZXplVmlkZW8uaW5uZXJIVE1MID0gJycgKyAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJtYXJnaW46IGF1dG87IGJhY2tncm91bmQ6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87XCIgd2lkdGg9XCIzMnB4XCIgaGVpZ2h0PVwiMzJweFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiPlxcbicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMC41NTU1NTU1NTU1NTU1NTU2c1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzFcIiB2YWx1ZXM9XCIxMDswXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiZmlsbFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cImRpc2NyZXRlXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIiM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDBcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnPC9zdmc+JztcbiAgICBvY3IuYXBwZW5kQ2hpbGQocHJldmVudFRvRnJlZXplVmlkZW8pO1xuICAgIGN1c3RvbVVJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGN1c3RvbVVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY3VzdG9tVUlXcmFwJyk7XG4gICAgY29uc3QgY3VzdG9tVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKGN1c3RvbVVJV3JhcCwgY3VzdG9tVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjdXN0b21VSVdyYXApO1xuXG4gICAgLy8g6rCBIHRvcCwgbWlkZGxlLCBib3R0b20gVUkg7IKs7JqpKHVzZSnsl6zrtoDsmYAg6rSA6rOE7JeG7J20IOyYgeyXreydhCDsnqHquLAg7JyE7ZW0LCBkaXbqsIAg7JeG7Jy866m0IOyDneyEsVxuICAgIC8vIGFkanVzdFN0eWxlKCkg7JeQ7IScIOyEuOu2gOyggeyduCDsgqzsnbTspojsmYAg7JyE7LmY6rCSIOuPmeyggeycvOuhnCDshKTsoJXrkKguXG4gICAgaWYgKCF0b3BVSSkge1xuICAgICAgdG9wVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvcFVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICd0b3BVSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQodG9wVUkpO1xuICAgIGlmICghbWlkZGxlVUkpIHtcbiAgICAgIG1pZGRsZVVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtaWRkbGVVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnbWlkZGxlVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKG1pZGRsZVVJKTtcbiAgICBpZiAoIWJvdHRvbVVJKSB7XG4gICAgICBib3R0b21VSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYm90dG9tVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2JvdHRvbVVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZChib3R0b21VSSk7XG4gICAgY2FwdHVyZVVJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNhcHR1cmVVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhcHR1cmVVSVdyYXAnKTtcbiAgICBjb25zdCBjYXB0dXJlVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY2VudGVyJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIGNhcHR1cmVVSVdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKGNhcHR1cmVVSVdyYXApO1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkpIHtcbiAgICAgIGlmICh0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgfHwgdGhpcy5fX29wdGlvbnMudXNlRm9yY2VDb21wbGV0ZVVJKSB7XG4gICAgICAgIGlmICghY2FwdHVyZVVJKSB7XG4gICAgICAgICAgY2FwdHVyZVVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2FwdHVyZVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlVUknKTtcbiAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FwdHVyZUJ1dHRvbikge1xuICAgICAgICAgIGNhcHR1cmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlQnV0dG9uJyk7XG4gICAgICAgICAgbGV0IGNhcHR1cmVCdXR0b25TcmNTVkcgPSBgYDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uU3JjU1ZHICs9IGA8c3ZnIHdpZHRoPSc4MCcgaGVpZ2h0PSc4MCcgdmlld0JveD0nMCAwIDgwIDgwJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgICA8Y2lyY2xlIGlkPSdjYXB0dXJlQnV0dG9uJyBjeD0nNDAnIGN5PSc0MCcgcj0nMzgnIGZpbGw9JyM1NTU1NTUnIHN0cm9rZT0nI2ZmZmZmZicgc3Ryb2tlLXdpZHRoPSc0Jy8+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uU3JjU1ZHICs9IGA8L3N2Zz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b24uaW5uZXJIVE1MID0gY2FwdHVyZUJ1dHRvblNyY1NWRztcbiAgICAgICAgICBjYXB0dXJlVUkuYXBwZW5kQ2hpbGQoY2FwdHVyZUJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2FwdHVyZVVJV3JhcC5hcHBlbmRDaGlsZChjYXB0dXJlVUkpO1xuICAgICAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgICAgICBjb25zdCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpc18uX19pc1N3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgICAgICAgZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICBfdGhpc18uX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLnNldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICBfdGhpc18uX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpc18uX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmNhcHR1cmVCdXR0b24sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNhcHR1cmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgcHJldmlld1VJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJldmlld1VJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld1VJV3JhcCcpO1xuICAgICAgY29uc3QgcHJldmlld1VJV3JhcFN0eWxlID0ge1xuICAgICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nLFxuICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAwMDBhYSdcbiAgICAgIH07XG4gICAgICB0aGlzLl9fc2V0U3R5bGUocHJldmlld1VJV3JhcCwgcHJldmlld1VJV3JhcFN0eWxlKTtcbiAgICAgIG9jci5hcHBlbmRDaGlsZChwcmV2aWV3VUlXcmFwKTtcbiAgICAgIGlmICghcHJldmlld1VJKSB7XG4gICAgICAgIHByZXZpZXdVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcmV2aWV3VUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdVSScpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSSwge1xuICAgICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIGhlaWdodDogJycsXG4gICAgICAgICdtYXgtd2lkdGgnOiAnOTAlJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiAnOTAlJ1xuICAgICAgfSk7XG4gICAgICBwcmV2aWV3VUlXcmFwLmFwcGVuZENoaWxkKHByZXZpZXdVSSk7XG4gICAgICBpZiAoIXByZXZpZXdJbWFnZSkge1xuICAgICAgICBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3SW1hZ2UnKTtcbiAgICAgICAgcHJldmlld1VJLmFwcGVuZENoaWxkKHByZXZpZXdJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgIHN3aXRjaFVJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3dpdGNoVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdzd2l0Y2hVSVdyYXAnKTtcbiAgICAgIGNvbnN0IHN3aXRjaFVJV3JhcFN0eWxlID0ge1xuICAgICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICcnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJycsXG4gICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgb3ZlcmZsb3c6ICcnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9O1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHN3aXRjaFVJV3JhcCwgc3dpdGNoVUlXcmFwU3R5bGUpO1xuICAgICAgb2NyLmFwcGVuZENoaWxkKHN3aXRjaFVJV3JhcCk7XG4gICAgICBpZiAoIXN3aXRjaFVJKSB7XG4gICAgICAgIHN3aXRjaFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN3aXRjaFVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdzd2l0Y2hVSScpO1xuICAgICAgICBsZXQgc3dpdGNoSFRNTCA9IGBgO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGA8ZGl2IGNsYXNzPSdjdXN0b20tLWxhYmVsIGZsZXgganVzdGlmeS1jZW50ZXIgYWxpZ24tY2VudGVyIGdhcDEwJz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBmb3I9J21hbnVhbC1zd2l0Y2gtd2FzbS10by1zZXJ2ZXItY2hlY2tib3gnPldBU008L2xhYmVsPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPGxhYmVsIGNsYXNzPSdzd2l0Y2gnPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgICA8aW5wdXQgaWQ9J21hbnVhbC1zd2l0Y2gtd2FzbS10by1zZXJ2ZXItY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgICAgPHNwYW4gY2xhc3M9J3NsaWRlciByb3VuZCc+PC9zcGFuPmA7XG4gICAgICAgIHN3aXRjaEhUTUwgKz0gYCAgPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBmb3I9J3ByaW9yaXR5LWZpbmFuY2UtY29odG1sRm9ybGlzdC1jaGVja2JveCc+U2VydmVyPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGA8L2Rpdj5gO1xuICAgICAgICBzd2l0Y2hVSS5pbm5lckhUTUwgPSBzd2l0Y2hIVE1MO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NldFN0eWxlKHN3aXRjaFVJLCB7XG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgfSk7XG4gICAgICBzd2l0Y2hVSVdyYXAuYXBwZW5kQ2hpbGQoc3dpdGNoVUkpO1xuICAgICAgY29uc3Qgc3dpdGNoQ2hlY2tib3ggPSBzd2l0Y2hVSS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXTtcbiAgICAgIGNvbnN0IF90aGlzXyA9IHRoaXM7XG4gICAgICBjb25zdCBfX29uQ2xpY2tTd2l0Y2hVSSA9IGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfdGhpc18uX19pc1N3aXRjaFRvU2VydmVyTW9kZSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICBhd2FpdCBfdGhpc18ucmVzdGFydE9DUihfdGhpc18uX19vY3JUeXBlLCBfdGhpc18uX19vblN1Y2Nlc3MsIF90aGlzXy5fX29uRmFpbHVyZSwgX3RoaXNfLl9fb25JblByb2dyZXNzQ2hhbmdlLCB0cnVlKTtcbiAgICAgIH07XG4gICAgICBzd2l0Y2hDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja1N3aXRjaFVJLCB7XG4gICAgICAgIG9uY2U6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBwcmVsb2FkaW5nVUlXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJlbG9hZGluZ1VJV3JhcCcpO1xuICAgIGNvbnN0IHByZWxvYWRpbmdVSVdyYXBTdHlsZSA9IHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzAwMDAwMGZmJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZWxvYWRpbmdVSVdyYXAsIHByZWxvYWRpbmdVSVdyYXBTdHlsZSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKHByZWxvYWRpbmdVSVdyYXApO1xuICAgIGlmICghcHJlbG9hZGluZ1VJKSB7XG4gICAgICBwcmVsb2FkaW5nVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZWxvYWRpbmdVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJlbG9hZGluZ1VJJyk7XG4gICAgICBwcmVsb2FkaW5nVUkuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0ZXh0LWluZm8nKTtcbiAgICAgIHByZWxvYWRpbmdVSS5pbm5lckhUTUwgPSAnJyArICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImJhY2tncm91bmQ6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87XCIgd2lkdGg9XCIzMnB4XCIgaGVpZ2h0PVwiMzJweFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZFwiPlxcbicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMC41NTU1NTU1NTU1NTU1NTU2c1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzFcIiB2YWx1ZXM9XCIxMDswXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiZmlsbFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cImRpc2NyZXRlXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIiM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDBcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMC41NTU1NTU1NTU1NTU1NTU2c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCI4NFwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjExMTExMTExMTExMTExMTJzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjE2XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuNjY2NjY2NjY2NjY2NjY2NXNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnPC9zdmc+JztcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5wcmVsb2FkaW5nVUlUZXh0TXNnID09PSAnJyB8fCB0aGlzLl9fb3B0aW9ucy5wcmVsb2FkaW5nVUlUZXh0TXNnKSB7XG4gICAgICAgIHByZWxvYWRpbmdVSS5pbm5lckhUTUwgKz0gdGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZWxvYWRpbmdVSSwge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICB9KTtcbiAgICBwcmVsb2FkaW5nVUlXcmFwLmFwcGVuZENoaWxkKHByZWxvYWRpbmdVSSk7XG5cbiAgICAvLyBsb2FkaW5nIFVJIOychOy5mCDsnpDrpqzsnqHqsowg7ZWY6riwIOychO2VtFxuICAgIGF3YWl0IHRoaXMuX19pbml0U3R5bGUoKTtcblxuICAgIC8vIO2ZlOuptOqzvOuPhCDtmITsg4Eg7ZW06rKwXG4gICAgdGhpcy5fX3NldFN0eWxlKG9jciwge1xuICAgICAgZGlzcGxheTogJydcbiAgICB9KTtcbiAgICB0aGlzLl9fb2NyID0gb2NyO1xuICAgIHRoaXMuX19jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5fX3JvdGF0aW9uQ2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgdGhpcy5fX3ZpZGVvID0gdmlkZW87XG4gICAgdGhpcy5fX3ZpZGVvV3JhcCA9IHZpZGVvV3JhcDtcbiAgICB0aGlzLl9fZ3VpZGVCb3ggPSBndWlkZUJveDtcbiAgICB0aGlzLl9fZ3VpZGVCb3hXcmFwID0gZ3VpZGVCb3hXcmFwO1xuICAgIHRoaXMuX19tYXNrQm94V3JhcCA9IG1hc2tCb3hXcmFwO1xuICAgIHRoaXMuX19wcmV2ZW50VG9GcmVlemVWaWRlbyA9IHByZXZlbnRUb0ZyZWV6ZVZpZGVvO1xuICAgIHRoaXMuX19jdXN0b21VSVdyYXAgPSBjdXN0b21VSVdyYXA7XG4gICAgdGhpcy5fX3RvcFVJID0gdG9wVUk7XG4gICAgdGhpcy5fX21pZGRsZVVJID0gbWlkZGxlVUk7XG4gICAgdGhpcy5fX2JvdHRvbVVJID0gYm90dG9tVUk7XG4gICAgdGhpcy5fX2NhcHR1cmVVSVdyYXAgPSBjYXB0dXJlVUlXcmFwO1xuICAgIHRoaXMuX19jYXB0dXJlVUkgPSBjYXB0dXJlVUk7XG4gICAgdGhpcy5fX2NhcHR1cmVCdXR0b24gPSBjYXB0dXJlQnV0dG9uO1xuICAgIHRoaXMuX19wcmV2aWV3VUlXcmFwID0gcHJldmlld1VJV3JhcDtcbiAgICB0aGlzLl9fcHJldmlld1VJID0gcHJldmlld1VJO1xuICAgIHRoaXMuX19wcmV2aWV3SW1hZ2UgPSBwcmV2aWV3SW1hZ2U7XG4gICAgdGhpcy5fX3N3aXRjaFVJV3JhcCA9IHN3aXRjaFVJV3JhcDtcbiAgICB0aGlzLl9fc3dpdGNoVUkgPSBzd2l0Y2hVSTtcbiAgICByZXR1cm4ge1xuICAgICAgb2NyLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXMsXG4gICAgICB2aWRlbyxcbiAgICAgIHZpZGVvV3JhcCxcbiAgICAgIGd1aWRlQm94LFxuICAgICAgZ3VpZGVCb3hXcmFwLFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyxcbiAgICAgIGN1c3RvbVVJV3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uLFxuICAgICAgcHJldmlld1VJV3JhcCxcbiAgICAgIHByZXZpZXdVSSxcbiAgICAgIHByZXZpZXdJbWFnZSxcbiAgICAgIHN3aXRjaFVJV3JhcCxcbiAgICAgIHN3aXRjaFVJXG4gICAgfTtcbiAgfVxuICBfX2JsdXJDYXB0dXJlQnV0dG9uKCkge1xuICAgIHRoaXMuX19zZXRTdHlsZShkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLnZpZGVvLCB7XG4gICAgICBkaXNwbGF5OiAnJ1xuICAgIH0pO1xuICAgIGNvbnN0IHtcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoY2FwdHVyZUJ1dHRvbikge1xuICAgICAgY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAnZmFsc2UnKTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgIGRpc3BsYXk6ICcnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICByZXR1cm4gY2FwdHVyZUJ1dHRvbiA/IGNhcHR1cmVCdXR0b24uZ2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJykgPT09ICd0cnVlJyA6IGZhbHNlO1xuICB9XG4gIGFzeW5jIF9fc2V0dXBWaWRlbyhpc1Bhc3Nwb3J0KSB7XG4gICAgLy8gd2FzbSDsnbjsi53shLHriqUg7LWc7KCB7ZmU65CcIO2VtOyDgeuPhFxuICAgIHRoaXMuX19yZXNvbHV0aW9uV2lkdGggPSAxMDgwO1xuICAgIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0ID0gNzIwO1xuICAgIHRoaXMuX19jYW1TZXRDb21wbGV0ZSA9IGZhbHNlO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpZGVvLFxuICAgICAgY2FudmFzLFxuICAgICAgcm90YXRpb25DYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBsZXQgY2FtZXJhID0gYXdhaXQgdGhpcy5fX2dldElucHV0RGV2aWNlcygpO1xuICAgIC8vIGNvbnNvbGUubG9nKCd2aWRlb0RldmljZXMgOjogJywgY2FtZXJhKVxuXG4gICAgdGhpcy5jaGVja1VJT3JpZW50YXRpb24oKTtcbiAgICBsZXQgY29uc3RyYWludFdpZHRoLCBjb25zdHJhaW50SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEgPT09ICdoaWdoUXVhbGl0eScpIHtcbiAgICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIDog7ZmU7KeIIOyasOyEoFxuICAgICAgLy8gMTkyMHgxMDgw7J20IOqwgOuKpe2VnOqyveyasCDsgqzsmqkg7JWE64uI66m0IDEyODB4NzIwIOyCrOyaqVxuICAgICAgY29uc3RyYWludFdpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTkyMCxcbiAgICAgICAgbWluOiAxMjgwXG4gICAgICB9O1xuICAgICAgY29uc3RyYWludEhlaWdodCA9IHtcbiAgICAgICAgaWRlYWw6IDEwODAsXG4gICAgICAgIG1pbjogNzIwXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyAnY29tcGF0aWJpbGl0eSdcbiAgICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIDog7Zi47ZmY7ISxIOyasOyEoFxuICAgICAgLy8gMTkyMHgxMDgw7J20IOyCrOyaqSDqsIDriqXtlZjrjZTrnbzrj4QgMTI4MHg3MjDsnYQg7IKs7Jqp7ZWY64+E66GdIOqzoOyglVxuICAgICAgLy8g7IKs7JygIDog6rCk65+t7IucIGVudHJ5IOuqqOuNuChB7Iuc66as7KaIIC8gV2lkZSDrqqjrjbgg65OxKeyXkOyEnCAxOTIwIHggMTA4MCDsspjrpqzsi5wg67mE7Jyo7J20IOydtOyDge2VtOynkCjtmYDsrYnsnbTrkKgpXG4gICAgICAvLyDtla3sg4EgMTI4MCB4IDcyMOydhCDsgqzsmqntlZjrj4TroZ0g67OA6rK9XG4gICAgICBjb25zdHJhaW50V2lkdGggPSB7XG4gICAgICAgIGlkZWFsOiAxMjgwXG4gICAgICB9O1xuICAgICAgY29uc3RyYWludEhlaWdodCA9IHtcbiAgICAgICAgaWRlYWw6IDcyMFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgY29uc3RyYWludHMgPSB7XG4gICAgICBhdWRpbzogZmFsc2UsXG4gICAgICB2aWRlbzoge1xuICAgICAgICB6b29tOiB7XG4gICAgICAgICAgaWRlYWw6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZmFjaW5nTW9kZToge1xuICAgICAgICAgIGlkZWFsOiB0aGlzLl9fZmFjaW5nTW9kZUNvbnN0cmFpbnRcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNNb2RlOiB7XG4gICAgICAgICAgaWRlYWw6ICdjb250aW51b3VzJ1xuICAgICAgICB9LFxuICAgICAgICB3aGl0ZUJhbGFuY2VNb2RlOiB7XG4gICAgICAgICAgaWRlYWw6ICdjb250aW51b3VzJ1xuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VJZDogY2FtZXJhLmxlbmd0aCA/IHtcbiAgICAgICAgICBpZGVhbDogY2FtZXJhW2NhbWVyYS5sZW5ndGggLSAxXVxuICAgICAgICB9IDogbnVsbCxcbiAgICAgICAgd2lkdGg6IGNvbnN0cmFpbnRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb25zdHJhaW50SGVpZ2h0XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIOy1nOy0iCDsp4TsnoUg7J207Ja07IScIHZpZGVvRGVpdmNlIOumrOyKpO2KuOulvCDqsIDsoLjsmKwg7IiYIOyXhuycvOuptCxcbiAgICAvLyBnZXRVc2VyTWVkaWHrpbwg7J6E7J2YIO2YuOy2nO2VmOyXrCDqtoztlZzsnYQg67Cb7J2A65KkIOuLpOyLnCDqsIDsoLjsmLRcbiAgICBpZiAoY2FtZXJhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fX2RlYnVnKCdjYW5ub3QgdG8gZ2V0IGNhbWVyYSBkZXZpY2VzLiBzbywgdHJ5IHRvIGdldCBjYW1lcmEgZGV2aWNlcyBhZ2FpbicpO1xuICAgICAgdGhpcy5fX2RlYnVnKGBjb25zdHJhaW50cyA6ICR7SlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpfWApO1xuICAgICAgdGhpcy5fX3N0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbiAgICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICAgICAgY2FtZXJhID0gYXdhaXQgdGhpcy5fX2dldElucHV0RGV2aWNlcygpO1xuICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBjYW1lcmEubGVuZ3RoID8ge1xuICAgICAgICBpZGVhbDogY2FtZXJhW2NhbWVyYS5sZW5ndGggLSAxXVxuICAgICAgfSA6IG51bGw7XG4gICAgfVxuXG4gICAgLy8g6rCk65+t7IucIHdpZGUg65OxIOyggOyCrOyWkSDquLDquLDsl5DshJwgRkhEIO2VtOyDgeuPhCDsubTrqZTrnbwg7IKs7Jqp7IucIO2ZgOytieydtOuQmOuKlCDtmITsg4Eg67Cp7KeAXG4gICAgLy8g7KCA7IKs7JaRIOq4sOq4sCDtjJDri6jquLDspIAgOiDtm4TrqbTsubTrqZTrnbzsnZgg6rCc7IiY6rCAIDHqsJzrnbzripQg6rCA7KCVXG4gICAgaWYgKGNhbWVyYS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX19kZWJ1ZygnbWF5YmUgZGV2aWNlIGlzIGVudHJ5IG1vZGVsIHN1Y2ggYXMgZ2FsYXh5IHdpZGUnKTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLndpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmhlaWdodCA9IHtcbiAgICAgICAgaWRlYWw6IDcyMFxuICAgICAgfTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0IGR1bXB0cmFjayA9IChbYSwgYl0sIHRyYWNrKSA9PlxuICAgICAgLy8gICBgJHthfSR7dHJhY2sua2luZCA9PSAndmlkZW8nID8gJ0NhbWVyYScgOiAnTWljcm9waG9uZSd9ICgke3RyYWNrLnJlYWR5U3RhdGV9KTogJHt0cmFjay5sYWJlbH0ke2J9YDtcblxuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgICAgdGhpcy5fX2RlYnVnKGBjb25zdHJhaW50cyA6ICR7SlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpfWApO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCd2aWRlb1RyYWNrcyA6OiAnLCBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKSk7XG4gICAgICBjb25zdCBzdHJlYW1TZXR0aW5ncyA9IHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoXG4gICAgICAvLyAgICdzdHJlYW1DYXBhYmlsaXRpZXMgOjogJyxcbiAgICAgIC8vICAgc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0Q2FwYWJpbGl0aWVzKClcbiAgICAgIC8vICk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3N0cmVhbSA6OiAnLCBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRDb25zdHJhaW50cygpKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1Zygnc3RyZWFtU2V0dGluZ3MgOjogJywgc3RyZWFtU2V0dGluZ3MpO1xuICAgICAgdGhpcy5fX2RlYnVnKGBzdHJlYW0gd2lkdGggKiBoZWlnaHQgOjogJHtzdHJlYW1TZXR0aW5ncy53aWR0aH0gKiAke3N0cmVhbVNldHRpbmdzLmhlaWdodH1gKTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIHdpZHRoIC8gaGVpZ2h0IDo6ICcgKyBzdHJlYW1TZXR0aW5ncy53aWR0aCAvIHN0cmVhbVNldHRpbmdzLmhlaWdodCk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSBhc3BlY3RSYXRpbyA6OiAnICsgc3RyZWFtU2V0dGluZ3MuYXNwZWN0UmF0aW8pO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gZmFjaW5nTW9kZSA6OiAnICsgc3RyZWFtU2V0dGluZ3MuZmFjaW5nTW9kZSk7XG4gICAgICBbY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgICAgW3JvdGF0aW9uQ2FudmFzLndpZHRoLCByb3RhdGlvbkNhbnZhcy5oZWlnaHRdID0gW3RoaXMuX19yZXNvbHV0aW9uSGVpZ2h0LCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoXTtcbiAgICAgIH1cbiAgICAgIHZpZGVvLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgIHRoaXMuX19zdHJlYW0gPSBzdHJlYW07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19pbml0U3R5bGUoKSB7XG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHtcbiAgICAgIG9jcixcbiAgICAgIGd1aWRlQm94LFxuICAgICAgbWFza0JveFdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcblxuICAgIC8vIOq4sOykgOygleuztFxuICAgIGNvbnN0IGJhc2VXaWR0aCA9IDQwMDtcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gMjYwO1xuICAgIGNvbnN0IHNjYW5uZXJGcmFtZVJhdGlvID0gYmFzZUhlaWdodCAvIGJhc2VXaWR0aDsgLy8g7Iug67aE7KadIOu5hOycqFxuXG4gICAgbGV0IGd1aWRlQm94V2lkdGgsIGd1aWRlQm94SGVpZ2h0O1xuICAgIGxldCBjYWxjT2NyQ2xpZW50V2lkdGggPSBvY3IuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRIZWlnaHQgPSBvY3IuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGJvcmRlcldpZHRoID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS53aWR0aDtcbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLnJhZGl1cztcbiAgICBjb25zdCBndWlkZUJveFJhdGlvQnlXaWR0aCA9IHRoaXMuX19ndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICBjb25zdCB2aWRlb1JhdGlvQnlIZWlnaHQgPSB0aGlzLl9fdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgLy8g7IS466GcIFVJICYmIOyEuOuhnCDruYTrlJTsmKTroZwg6rCE7KO8XG4gICAgICAvLyDqsIDroZwg6riw7KSA7Jy866GcIOqwgOydtOuTnOuwleyKpCDqs4TsgrBcbiAgICAgIGd1aWRlQm94V2lkdGggPSBjYWxjT2NyQ2xpZW50V2lkdGggKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDqsIDroZwgVUkgJiYg6rCA66GcIOu5hOuUlOyYpOuhnCDqsITso7xcbiAgICAgIC8vIOu5hOuUlOyYpOulvCDqsIDroZwgVUnsnZggaGVpZ2h0IOq4sOykgOycvOuhnCDspITsnbTqs6BcbiAgICAgIC8vIOqwgOuhnCBVSSBoZWlnaHQg6riw7KSA7Jy866GcIOu5hOuUlOyYpOydmCB3aWR0aCDqs4TsgrBcbiAgICAgIGd1aWRlQm94SGVpZ2h0ID0gY2FsY09jckNsaWVudEhlaWdodCAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgfVxuICAgIGd1aWRlQm94V2lkdGggKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGd1aWRlQm94SGVpZ2h0ICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94V2lkdGggKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveEhlaWdodCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGlmICh0b3BVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHRvcFVJLCB7XG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWlkZGxlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShtaWRkbGVVSSwge1xuICAgICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJvdHRvbVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoYm90dG9tVUksIHtcbiAgICAgICAgJ3BhZGRpbmctdG9wJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB2aWRlb0lubmVyR2FwID0gMjsgLy8g66+47IS47ZWY6rKMIG1hc2tCb3hJbm5lcuuztOuLpCBndWlkZUJveOqwgCDsnpHsnYDqsoMg67O07KCVXG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICB9KTtcbiAgICBjb25zdCBtYXNrQm94SW5uZXIgPSBtYXNrQm94V3JhcC5xdWVyeVNlbGVjdG9yKCcjbWFza0JveElubmVyJyk7XG4gICAgbGV0IHIgPSBib3JkZXJSYWRpdXMgLSBib3JkZXJXaWR0aCAqIDI7XG4gICAgciA9IHIgPCAwID8gMCA6IHI7XG4gICAgaWYgKCFpc05hTihyZWR1Y2VkR3VpZGVCb3hXaWR0aCkgJiYgIWlzTmFOKHJlZHVjZWRHdWlkZUJveEhlaWdodCkgJiYgIWlzTmFOKGJvcmRlclJhZGl1cykgJiYgIWlzTmFOKGJvcmRlcldpZHRoKSkge1xuICAgICAgY29uc3QgbWFza0JveElubmVyV2lkdGggPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgY29uc3QgbWFza0JveElubmVySGVpZ2h0ID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG1hc2tCb3hJbm5lcldpZHRoICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFza0JveElubmVySGVpZ2h0ICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneCcsIG1hc2tCb3hJbm5lcldpZHRoIC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneScsIG1hc2tCb3hJbm5lckhlaWdodCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J4JywgciArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J5JywgciArICcnKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19hZGp1c3RTdHlsZSgpIHtcbiAgICBjb25zdCBfX2NhbGNHdWlkZUJveENyaXRlcmlhID0gKGEsIGIpID0+IHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9PT0gJ2NhbWVyYVJlc29sdXRpb24nKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdvY3JWaWV3U2l6ZScpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGEsIGIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGEsIGIpOyAvLyBkZWZhdWx0IDogY2FtZXJhUmVzb2x1dGlvblxuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIDA7XG4gICAgY29uc3Qge1xuICAgICAgb2NyLFxuICAgICAgdmlkZW8sXG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b25cbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9KTtcbiAgICBjb25zdCBpc0FsaWVuQmFjayA9IHRoaXMuX19vY3JUeXBlID09PSAnYWxpZW4tYmFjayc7XG5cbiAgICAvLyDquLDspIDsoJXrs7RcbiAgICBjb25zdCBiYXNlV2lkdGggPSBpc0FsaWVuQmFjayA/IDI2MCA6IDQwMDtcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gaXNBbGllbkJhY2sgPyA0MDAgOiAyNjA7XG4gICAgY29uc3Qgc2Nhbm5lckZyYW1lUmF0aW8gPSBiYXNlSGVpZ2h0IC8gYmFzZVdpZHRoOyAvLyDsi6DrtoTspp0g67mE7JyoXG5cbiAgICBsZXQgZ3VpZGVCb3hXaWR0aCwgZ3VpZGVCb3hIZWlnaHQ7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRXaWR0aCA9IG9jci5jbGllbnRXaWR0aDtcbiAgICBsZXQgY2FsY09jckNsaWVudEhlaWdodCA9IG9jci5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBsZXQgY2FsY1ZpZGVvSGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudFdpZHRoID0gdmlkZW8uY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9IHZpZGVvLmNsaWVudEhlaWdodDtcbiAgICBsZXQgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbjtcbiAgICBpZiAoY2FsY1ZpZGVvV2lkdGggPT09IDAgfHwgY2FsY1ZpZGVvSGVpZ2h0ID09PSAwIHx8IGNhbGNWaWRlb0NsaWVudFdpZHRoID09PSAwIHx8IGNhbGNWaWRlb0NsaWVudEhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGg7XG4gICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXM7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbY2FsY1ZpZGVvV2lkdGgsIGNhbGNWaWRlb0hlaWdodF0gPSBbY2FsY1ZpZGVvSGVpZ2h0LCBjYWxjVmlkZW9XaWR0aF07XG4gICAgICBbY2FsY1ZpZGVvQ2xpZW50V2lkdGgsIGNhbGNWaWRlb0NsaWVudEhlaWdodF0gPSBbY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9DbGllbnRXaWR0aF07XG4gICAgICBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uID09PSAncG9ydHJhaXQnID8gJ2xhbmRzY2FwZScgOiAncG9ydHJhaXQnO1xuICAgIH1cbiAgICBsZXQgbmV3VmlkZW9XaWR0aCA9IGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGxldCBuZXdWaWRlb0hlaWdodCA9IGNhbGNWaWRlb0NsaWVudEhlaWdodDtcbiAgICBjb25zdCBndWlkZUJveFJhdGlvQnlXaWR0aCA9IHRoaXMuX19ndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICBjb25zdCB2aWRlb1JhdGlvQnlIZWlnaHQgPSB0aGlzLl9fdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgIGNvbnN0IG5ld1ZpZGVvUmF0aW9CeVdpZHRoID0gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0IC8gY2FsY1ZpZGVvQ2xpZW50V2lkdGg7XG4gICAgY29uc3QgbmV3VmlkZW9SYXRpb0J5SGVpZ2h0ID0gY2FsY1ZpZGVvQ2xpZW50V2lkdGggLyBjYWxjVmlkZW9DbGllbnRIZWlnaHQ7XG4gICAgaWYgKHRoaXMuX191aU9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICAvLyDshLjroZwgVUlcbiAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJ1xuICAgICAgfSk7XG4gICAgICAvLyB2aWRlbyDqsIDroZwg6riw7KSAIDEwMCUg7Jyg7KeAICjrs4Dqsr3sl4bsnYwpXG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOy5tOuplOudvOuPhCDshLjroZxcbiAgICAgICAgLy8g7IS466GcIFVJICYmIOyEuOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7ZmV64yAXG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOy5tOuplOudvOuKlCDqsIDroZxcbiAgICAgICAgLy8g7IS466GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpOulvCDruYTrlJTsmKQg7IS466GcIOq4uOydtOyXkCDrp57stqRcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNWaWRlb0NsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KTtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6rCA66GcIFVJXG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2VuZCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInXG4gICAgICB9KTtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g6rCA66GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g67mE65SU7Jik66W8IOqwgOuhnCBVSeydmCBoZWlnaHQg6riw7KSA7Jy866GcIOykhOydtOqzoFxuICAgICAgICAvLyDqsIDroZwgVUkgaGVpZ2h0IOq4sOykgOycvOuhnCDruYTrlJTsmKTsnZggd2lkdGgg6rOE7IKwXG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk64qUIOyEuOuhnCDquLDspIDsnLzroZwg66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuXG4gICAgICAgIC8vIOu5hOuUlOyYpOulvCDshLjroZwg6riw7KSA7Jy866GcIOuLpOyLnCDrp57stqRcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBndWlkZUJveEhlaWdodDtcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IG5ld1ZpZGVvSGVpZ2h0ICogbmV3VmlkZW9SYXRpb0J5SGVpZ2h0O1xuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCDqsIDroZwg7YGs6riw6rCAIOqwgOuhnCBVSSB3aWR0aCAqIHJhdGlvIOqwkuuztOuLpCDtgazrqbQsXG4gICAgICAgIGlmIChndWlkZUJveFdpZHRoID4gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoKSB7XG4gICAgICAgICAgLy8g6rOE7IKwIOuwqeyLneydhCDrsJTqvrzri6QgKOyCrOycoCA6IOqxsOydmCDsoJXsgqzqsIHtmJXsl5Ag6rCA6rmM7Jq0IOqyveyasCDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnOqwgCDqvYnssKjqsowg65CoLilcbiAgICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuXG4gICAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDtmZXrjIBcbiAgICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g6rCA66GcIFVJICYmIOyEuOuhnCDruYTrlJTsmKRcbiAgICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk7J2YIGhlaWdodCDtgazquLDrpbwgVUnsnZggaGVpZ2h0IOq4sOykgOyXkCDrp57stqRcbiAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG5cbiAgICAgICAgLy8g6rCA7J2065Oc67CV7Iqk7J2YIOqwgOuhnCDtgazquLDqsIAg6rCA66GcIFVJIHdpZHRoICogcmF0aW8g6rCS67O064ukIO2BrOuptCxcbiAgICAgICAgaWYgKGd1aWRlQm94V2lkdGggPiBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGgpIHtcbiAgICAgICAgICAvLyDqs4TsgrAg67Cp7Iud7J2EIOuwlOq+vOuLpCAo7IKs7JygIDog6rGw7J2YIOygleyCrOqwge2YleyXkCDqsIDquYzsmrQg6rK97JqwIOqwgOydtOuTnCDrsJXsiqQg6rCA66Gc6rCAIOq9ieywqOqyjCDrkKguKVxuICAgICAgICAgIGd1aWRlQm94V2lkdGggPSBfX2NhbGNHdWlkZUJveENyaXRlcmlhKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgICAgZ3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveFdpZHRoICogc2Nhbm5lckZyYW1lUmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIOy2leyGjFxuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsY0d1aWRlQm94Q3JpdGVyaWEo7Lm066mU6528IO2VtOyDgeuPhCDshKTsoJUg6riw7KSAKeqwgCBvY3JWaWV3U2l6ZSjtmZTrqbQg7YGs6riwKSDquLDspIDsnbzrlYxcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdvY3JWaWV3U2l6ZScpIHtcbiAgICAgIC8vIGd1aWRlQm94SGVpZ2h0IOydtCBjYWxjT2NyQ2xpZW50SGVpZ2h0IOuztOuLpCDtgbDqsr3smrAo6rCA7J2065Oc67CV7Iqk6rCAIO2ZlOuptOydhCDrhJjslrTqsIDripQg6rK97JqwKSDri6Tsi5wg6rOE7IKwXG4gICAgICBpZiAoZ3VpZGVCb3hIZWlnaHQgPiBjYWxjT2NyQ2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gTWF0aC5taW4oY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuXG4gICAgICAvLyBndWlkZUJveEhlaWdodCDsnbQgY2FsY09jckNsaWVudEhlaWdodCDrs7Tri6Qg7YGw6rK97JqwKOqwgOydtOuTnOuwleyKpOqwgCDtmZTrqbTsnYQg64SY7Ja06rCA64qUIOqyveyasCkg64uk7IucIOqzhOyCsFxuICAgICAgaWYgKGd1aWRlQm94V2lkdGggPiBjYWxjT2NyQ2xpZW50V2lkdGgpIHtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IE1hdGgubWluKGNhbGNPY3JDbGllbnRXaWR0aCwgY2FsY1ZpZGVvV2lkdGgpICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGggPSBNYXRoLm1pbihndWlkZUJveFdpZHRoLCBuZXdWaWRlb1dpZHRoKTtcbiAgICB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodCA9IE1hdGgubWluKGd1aWRlQm94SGVpZ2h0LCBuZXdWaWRlb0hlaWdodCk7XG4gICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICBbbmV3VmlkZW9XaWR0aCwgbmV3VmlkZW9IZWlnaHRdID0gW25ld1ZpZGVvSGVpZ2h0LCBuZXdWaWRlb1dpZHRoXTtcbiAgICB9XG4gICAgZ3VpZGVCb3hXaWR0aCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgZ3VpZGVCb3hIZWlnaHQgKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveFdpZHRoID0gZ3VpZGVCb3hXaWR0aCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGNvbnN0IHJlZHVjZWRHdWlkZUJveEhlaWdodCA9IGd1aWRlQm94SGVpZ2h0ICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgaWYgKHRvcFVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodG9wVUksIHtcbiAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtaWRkbGVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKG1pZGRsZVVJLCB7XG4gICAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICBwYWRkaW5nOiAnMTBweCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYm90dG9tVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShib3R0b21VSSwge1xuICAgICAgICAncGFkZGluZy10b3AnOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgd2lkdGg6IG5ld1ZpZGVvV2lkdGggKyAncHgnXG4gICAgfSk7XG4gICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICBoZWlnaHQ6IG5ld1ZpZGVvSGVpZ2h0ICsgJ3B4J1xuICAgIH0pO1xuICAgIGNvbnN0IHZpZGVvSW5uZXJHYXAgPSAyOyAvLyDrr7jshLjtlZjqsowgbWFza0JveElubmVy67O064ukIGd1aWRlQm946rCAIOyekeydgOqygyDrs7TsoJVcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3gsIHtcbiAgICAgIHdpZHRoOiByZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgIH0pO1xuICAgIGNvbnN0IG1hc2tCb3hJbm5lciA9IG1hc2tCb3hXcmFwLnF1ZXJ5U2VsZWN0b3IoJyNtYXNrQm94SW5uZXInKTtcbiAgICBsZXQgciA9IGJvcmRlclJhZGl1cyAtIGJvcmRlcldpZHRoICogMjtcbiAgICByID0gciA8IDAgPyAwIDogcjtcbiAgICBpZiAoIWlzTmFOKHJlZHVjZWRHdWlkZUJveFdpZHRoKSAmJiAhaXNOYU4ocmVkdWNlZEd1aWRlQm94SGVpZ2h0KSAmJiAhaXNOYU4oYm9yZGVyUmFkaXVzKSAmJiAhaXNOYU4oYm9yZGVyV2lkdGgpKSB7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJXaWR0aCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBjb25zdCBtYXNrQm94SW5uZXJIZWlnaHQgPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgbWFza0JveElubmVyV2lkdGggKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBtYXNrQm94SW5uZXJIZWlnaHQgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd4JywgbWFza0JveElubmVyV2lkdGggLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd5JywgbWFza0JveElubmVySGVpZ2h0IC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncngnLCByICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgncnknLCByICsgJycpO1xuICAgIH1cblxuICAgIC8vIOyImOuPmSDstKzsmIEgVUkg7IKs7JqpXG4gICAgLy8gZmlyc3RDYWxsZWTsnbgg6rK97JqwIOyVhOyngSBjYXB0dXJlVUnqsIAg6re466Ck7KeA7KeAIOyViuyVhCDrrLTsnZjrr7hcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgIGRpc3BsYXk6ICcnXG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyAmJiBib3R0b21VSSAmJiBjYXB0dXJlVUkpIHtcbiAgICAgICAgY29uc3QgY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzID0gdGhpcy5fX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMoYm90dG9tVUkpO1xuICAgICAgICBsZXQgY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQgPSBjYXB0dXJlQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpLmdldEF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XG4gICAgICAgIGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID0gY2FsY0NhcHR1cmVCdXR0b25IZWlnaHQgPT09IDAgPyA4MCA6IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0O1xuICAgICAgICBsZXQgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSA9IGJvdHRvbVVJLmNsaWVudEhlaWdodDtcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBpc05hTihwYXJzZUludChib3R0b21VSS5zdHlsZS5wYWRkaW5nVG9wKSkgPyAwIDogcGFyc2VJbnQoYm90dG9tVUkuc3R5bGUucGFkZGluZ1RvcCk7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gY2FsY1N1bU9mSGVpZ2h0Qm90dG9tVUlDaGlsZE5vZGVzO1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0O1xuICAgICAgICBjb25zdCBiYXNlbGluZSA9IGNhbGNPY3JDbGllbnRIZWlnaHQgLSAoY2FsY09jckNsaWVudEhlaWdodCAvIDIgKyBndWlkZUJveEhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSA+IDAgJiYgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSA8IGJhc2VsaW5lKSB7XG4gICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAnJyxcbiAgICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6IGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gKyAncHgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAncGFkZGluZy1yaWdodCc6ICcxMHB4JyxcbiAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuX19pblByb2dyZXNzU3RlcCwgdHJ1ZSk7XG4gICAgdm9pZCAwO1xuICB9XG4gIF9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2RlcyhvYmopIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqPy5jaGlsZE5vZGVzKSB7XG4gICAgICBzdW0gKz0gaXRlbS5jbGllbnRIZWlnaHQgPyBpdGVtLmNsaWVudEhlaWdodCA6IDA7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH1cbiAgX19jbG9zZUNhbWVyYSgpIHtcbiAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgdGhpcy5zdG9wU2NhbigpO1xuICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICB9XG4gIGFzeW5jIF9fbG9hZFJlc291cmNlcygpIHtcbiAgICB2b2lkIDA7XG4gICAgaWYgKHRoaXMuX19yZXNvdXJjZXNMb2FkZWQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2lzU3VwcG9ydFNpbWQgPSBhd2FpdCBzaW1kKCk7XG4gICAgbGV0IGVudkluZm8gPSAnJztcbiAgICBlbnZJbmZvICs9IGBvcyA6ICR7dGhpcy5fX2RldmljZUluZm8ub3N9XFxuYDtcbiAgICBlbnZJbmZvICs9IGBvc1NpbXBsZSA6ICR7dGhpcy5fX2RldmljZUluZm8ub3NTaW1wbGV9XFxuYDtcbiAgICBlbnZJbmZvICs9IGBpc1N1cHBvcnRXYXNtOiAke3RoaXMuX19pc1N1cHBvcnRXYXNtfVxcbmA7XG4gICAgZW52SW5mbyArPSBgc2ltZCh3YXNtLWZlYXR1cmUtZGV0ZWN0KSA6ICR7dGhpcy5fX2lzU3VwcG9ydFNpbWR9XFxuYDtcbiAgICBpZiAodGhpcy5fX2RldmljZUluZm8ub3NTaW1wbGUgPT09ICdJT1MnIHx8IHRoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlID09PSAnTUFDJykge1xuICAgICAgdGhpcy5fX2lzU3VwcG9ydFNpbWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZW52SW5mbyArPSBgaXNTdXBwb3J0U2ltZChmaW5hbCkgOiAke3RoaXMuX19pc1N1cHBvcnRTaW1kfVxcbmA7XG4gICAgZW52SW5mbyArPSBgVXNlckFnZW50IDogJHtuYXZpZ2F0b3IudXNlckFnZW50fVxcbmA7XG4gICAgdm9pZCAwO1xuICAgIHRoaXMuX19kZWJ1ZyhlbnZJbmZvKTtcbiAgICB3aW5kb3cudXNlYk9DUkVudkluZm8gPSBlbnZJbmZvO1xuICAgIGxldCBzZGtTdXBwb3J0RW52ID0gJ3F1cmFtJztcbiAgICBpZiAodGhpcy5fX2lzU3VwcG9ydFNpbWQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHNka1N1cHBvcnRFbnYgKz0gJ19zaW1kJztcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgICB2b2lkIDA7XG4gICAgd2luZG93LnVzZWJPQ1JFbnZJbmZvID0gZW52SW5mbztcbiAgICB2b2lkIDA7XG4gICAgbGV0IHBvc3RmaXggPSAnJztcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuZm9yY2Vfd2FzbV9yZWxvYWQpIHtcbiAgICAgIC8vIOyYteyFmOydtCDtmZzshLHtmZQg65CY66m0IOyDiOuhnOyatCBXQVNNIOumrOyGjOyKpOulvCDsmpTssq3tlaguXG4gICAgICBwb3N0Zml4ID0gJz92ZXI9JyArIHRoaXMuX19vcHRpb25zLmZvcmNlX3dhc21fcmVsb2FkX2ZsYWc7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoc2RrU3VwcG9ydEVudiArICcuanMnICsgcG9zdGZpeCwgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKTtcbiAgICBsZXQgc3JjID0gYXdhaXQgZmV0Y2godXJsLmhyZWYpLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpLnRoZW4odGV4dCA9PiB7XG4gICAgICBsZXQgcmVnZXggPSAvKC4qKSA9IE1vZHVsZS5jd3JhcC9nbTtcbiAgICAgIGxldCBzb3VyY2UgPSB0ZXh0LnJlcGxhY2UocmVnZXgsICdNb2R1bGUuJDEgPSBNb2R1bGUuY3dyYXAnKTtcblxuICAgICAgLy8gZGF0YShtb2RlbClcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKC9eXFwoZnVuY3Rpb25cXChcXCkgXFx7L20sICd2YXIgY3JlYXRlTW9kZWxEYXRhID0gYXN5bmMgZnVuY3Rpb24oKSB7XFxuJyArICcgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcXG4nKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCcgICBjb25zb2xlLmVycm9yKFwicGFja2FnZSBlcnJvcjpcIiwgZXJyb3IpOycsICcgICByZWplY3QoKTtcXG4nICsgJyAgIGNvbnNvbGUuZXJyb3IoXCJwYWNrYWdlIGVycm9yOlwiLCBlcnJvcik7Jyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnICB9LCBoYW5kbGVFcnJvciknLCAnICByZXNvbHZlKCk7XFxuJyArICcgIH0sIGhhbmRsZUVycm9yKScpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoL15cXH1cXClcXChcXCk7L20sICdcXG4gfSlcXG4nICsgJ307Jyk7XG5cbiAgICAgIC8vIHdhc21cbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKHNka1N1cHBvcnRFbnYgKyAnLndhc20nLCBuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLndhc20nICsgcG9zdGZpeCwgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKS5ocmVmKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKG5ldyBSZWdFeHAoYFJFTU9URV9QQUNLQUdFX0JBU0UgPSBbJ1wiXSR7c2RrU3VwcG9ydEVudn1cXFxcLmRhdGFbXCInXWAsICdnbScpLCBgUkVNT1RFX1BBQ0tBR0VfQkFTRSA9IFwiJHtuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLmRhdGEnICsgcG9zdGZpeCwgdGhpcy5fX29wdGlvbnMucmVzb3VyY2VCYXNlVXJsKS5ocmVmfVwiYCk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnZnVuY3Rpb24gY3JlYXRlV2FzbScsICdhc3luYyBmdW5jdGlvbiBjcmVhdGVXYXNtJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnaW5zdGFudGlhdGVBc3luYygpOycsICdhd2FpdCBpbnN0YW50aWF0ZUFzeW5jKCk7Jyk7XG5cbiAgICAgIC8vIHdhc20gYW5kIGRhdGEobW9kZWwpIGZpbGUg67OR66Cs66GcIGZldGNoIO2VmOq4sCDsnITtlbRcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKCd2YXIgYXNtID0gY3JlYXRlV2FzbSgpOycsICdjb25zb2xlLmxvZyhcImNyZWF0ZSB3YXNtIGFuZCBkYXRhIC0gc3RhcnRcIilcXG4nICsgJ2F3YWl0IChhc3luYyBmdW5jdGlvbigpIHtcXG4nICsgJyAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcXG4nICsgJyAgICB2YXIgaXNDcmVhdGVkV2FzbSA9IGZhbHNlO1xcbicgKyAnICAgIHZhciBpc0NyZWF0ZWREYXRhID0gZmFsc2U7XFxuJyArICcgICAgY3JlYXRlV2FzbSgpLnRoZW4oKCkgPT4ge1xcbicgKyAnICAgICAgaXNDcmVhdGVkV2FzbSA9IHRydWU7XFxuJyArICcgICAgICBpZiAoaXNDcmVhdGVkRGF0YSkgeyByZXNvbHZlKCk7IH1cXG4nICsgJyAgICB9KTtcXG4nICsgJyAgICBjcmVhdGVNb2RlbERhdGEoKS50aGVuKCgpID0+IHtcXG4nICsgJyAgICAgIGlzQ3JlYXRlZERhdGEgPSB0cnVlO1xcbicgKyAnICAgICAgaWYgKGlzQ3JlYXRlZFdhc20pIHsgcmVzb2x2ZSgpOyB9XFxuJyArICcgICAgfSlcXG4nICsgJyAgfSk7XFxuJyArICd9KSgpO1xcbicgKyAnY29uc29sZS5sb2coXCJjcmVhdGUgd2FzbSBhbmQgZGF0YSAtIGVuZFwiKScpO1xuICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9KTtcbiAgICBzcmMgPSBgXG4gICAgKGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgJHtzcmN9XG4gICAgICBNb2R1bGUubGVuZ3RoQnl0ZXNVVEY4ID0gbGVuZ3RoQnl0ZXNVVEY4XG4gICAgICBNb2R1bGUuc3RyaW5nVG9VVEY4ID0gc3RyaW5nVG9VVEY4XG4gICAgICByZXR1cm4gTW9kdWxlXG4gICAgfSkoKVxuICAgICAgICBgO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUgPSBhd2FpdCBldmFsKHNyYyk7XG4gICAgdGhpcy5fX09DUkVuZ2luZS5vblJ1bnRpbWVJbml0aWFsaXplZCA9IGFzeW5jIF8gPT4ge1xuICAgICAgdm9pZCAwO1xuICAgIH07XG4gICAgYXdhaXQgdGhpcy5fX09DUkVuZ2luZS5vblJ1bnRpbWVJbml0aWFsaXplZCgpO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSB0cnVlO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX3N0YXJ0U2Nhbldhc21JbXBsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpO1xuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG4gICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgIHRoaXMuX19hZGRyZXNzID0gMDtcbiAgICAgIHRoaXMuX19wYWdlRW5kID0gZmFsc2U7XG4gICAgICB0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gICAgICB0aGlzLl9fc3NhUmV0cnlDb3VudCA9IDA7XG4gICAgICBjb25zdCBzY2FuID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgaXNEZXRlY3RlZENhcmQgPSBudWxsLFxuICAgICAgICAgICAgaW1nRGF0YSA9IG51bGwsXG4gICAgICAgICAgICBpbWdEYXRhVXJsID0gbnVsbCxcbiAgICAgICAgICAgIG1hc2tJbWFnZSA9IG51bGwsXG4gICAgICAgICAgICBmYWNlSW1hZ2UgPSBudWxsLFxuICAgICAgICAgICAgc3NhUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIHNzYVJlc3VsdExpc3QgPSBbXSxcbiAgICAgICAgICAgIG1hc2tJbmZvID0gbnVsbDtcblxuICAgICAgICAgIC8vIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZShJTl9QUk9HUkVTUy5SRUFEWSk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9fT0NSRW5naW5lWydhc20nXSkgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gVE9ETyA6IOyEpOygle2VoOyImCDsnojqsowg67OA6rK9ICBkZWZhdWx0IOqwkuuPhCDsoJzqs7VcbiAgICAgICAgICBjb25zdCBbcmVzb2x1dGlvbl93LCByZXNvbHV0aW9uX2hdID0gW3RoaXMuX19yZXNvbHV0aW9uV2lkdGgsIHRoaXMuX19yZXNvbHV0aW9uSGVpZ2h0XTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2aWRlb1xuICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgIGlmIChyZXNvbHV0aW9uX3cgPT09IDAgfHwgcmVzb2x1dGlvbl9oID09PSAwKSByZXR1cm47XG4gICAgICAgICAgaWYgKHRoaXMuX19kZXRlY3RlZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZGRyZXNzIGJlZm9yZSAtLS0tLS0tLS0nLCBhZGRyZXNzKTtcbiAgICAgICAgICBpZiAodGhpcy5fX2FkZHJlc3MgPT09IDAgJiYgIXRoaXMuX19wYWdlRW5kICYmIChhd2FpdCB0aGlzLl9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlKHZpZGVvKSkpIHtcbiAgICAgICAgICAgIFt0aGlzLl9fYWRkcmVzcywgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2tdID0gdGhpcy5fX2dldFNjYW5uZXJBZGRyZXNzKHRoaXMuX19vY3JUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9fYWRkcmVzcyB8fCB0aGlzLl9fcGFnZUVuZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX3NsZWVwKDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhZGRyZXNzIGFmdGVyIC0tLS0tLS0tLScsIGFkZHJlc3MpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19vY3JTdGF0dXMgPCB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIC8vIE9DUiDsmYTro4wg7J207KCEIOyDge2DnFxuXG4gICAgICAgICAgICAvLyBjYXJkIG5vdCBkZXRlY3RlZFxuICAgICAgICAgICAgW2lzRGV0ZWN0ZWRDYXJkLCBpbWdEYXRhLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19pc0NhcmRib3hEZXRlY3RlZCh0aGlzLl9fYWRkcmVzcywgMCk7XG4gICAgICAgICAgICBpZiAoIWlzRGV0ZWN0ZWRDYXJkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAgIT09IHRoaXMuSU5fUFJPR1JFU1MuUkVBRFkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5DQVJEX0RFVEVDVF9GQUlMRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfRkFJTEVELCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7IC8vIO2VhOyalO2VnOqwgD9cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FyZCBpcyBkZXRlY3RlZFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuQ0FSRF9ERVRFQ1RfU1VDQ0VTUyk7XG5cbiAgICAgICAgICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICAgICAgICAgIHRoaXMuX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKHRydWUpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTLCBmYWxzZSwgaW1nRGF0YVVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBbb2NyUmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZV0gPSBhd2FpdCB0aGlzLl9fc3RhcnRSZWNvZ25pdGlvbih0aGlzLl9fYWRkcmVzcywgdGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCB0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpLCBpbWdEYXRhLCBpbWdEYXRhVXJsKTtcblxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgICAgICAvLyAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpOyAgICAgICAgLy8g7ZWE7JqU7ZWc6rCAP1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fb2NyU3RhdHVzID49IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUykge1xuICAgICAgICAgICAgLy8gb2NyIOyZhOujjCDsnbTtm4Qg7IOB7YOcXG5cbiAgICAgICAgICAgIC8vIGZhaWx1cmUgY2FzZVxuICAgICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPQ1IgU3RhdHVzIGlzICR7dGhpcy5fX29jclN0YXR1c30sIGJ1dCBvY3JSZXN1bHQgaXMgZmFsc2VgKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FzZVxuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICBpZiAodGhpcy5fX3NzYU1vZGUpIHtcbiAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICAvLyDstZzstIgg7Iuc64+EXG4gICAgICAgICAgICAgIHNzYVJlc3VsdCA9IGF3YWl0IHRoaXMuX19zdGFydFRydXRoKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fYWRkcmVzcyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0ID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ1tFUlJdIFNTQSBNT0RFIGlzIHRydWUuIGJ1dCwgc3NhUmVzdWx0IGlzIG51bGwnKTsgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgICAgICAgc3NhUmVzdWx0TGlzdC5wdXNoKHNzYVJlc3VsdCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXRyeVN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgRkFLRSA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ0ZBS0UnO1xuICAgICAgICAgICAgICAgIGNvbnN0IFJFQUwgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdSRUFMJztcbiAgICAgICAgICAgICAgICBjb25zdCBFTlNFTUJMRSA9IHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSA9PT0gJ0VOU0VNQkxFJztcbiAgICAgICAgICAgICAgICBsZXQgaXNDb21wbGV0ZWQgPSBmYWxzZTsgLy8g67mE64+Z6riwIGZvciDrrLgg65WM66y47JeQIGJyZWFr6rCAIOyViOqxuOumrOuKlCDsnbTsiojroZwg64Sj7J2MXG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc3NhUmV0cnlDb3VudCA9PT0gdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgZXhlY3V0ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NzYVJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgc3NhUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3N0YXJ0VHJ1dGhSZXRyeSh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2FkZHJlc3MsIGl0ZW0pOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdbRVJSXSBTU0EgTU9ERSBpcyB0cnVlLiBidXQsIHNzYVJlc3VsdCBpcyBudWxsJyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgICAgICAgICAgICAgIHNzYVJlc3VsdExpc3QucHVzaChzc2FSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChGQUtFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQuaW5kZXhPZignUkVBTCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoUkVBTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0LmluZGV4T2YoJ0ZBS0UnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKEVOU0VNQkxFKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0cnlXb3JraW5nVGltZSA9IG5ldyBEYXRlKCkgLSByZXRyeVN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICB2b2lkIDA7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hc2tJbmZvKSB7XG4gICAgICAgICAgICAgIG1hc2tJbmZvID0gdGhpcy5fX2dldE1hc2tJbmZvKHRoaXMuX19hZGRyZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgICAgICAgICBuZXdGb3JtYXRcbiAgICAgICAgICAgIH0gPSB1c2ViT0NSV0FTTVBhcnNlci5wYXJzZU9jclJlc3VsdCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX3NzYU1vZGUsIG9jclJlc3VsdCwgc3NhUmVzdWx0LCB0aGlzLl9fc3NhUmV0cnlDb3VudCwgc3NhUmVzdWx0TGlzdCwgdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlLCB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVBpdm90XG4gICAgICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgICAgICAgLy8gdGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGVcbiAgICAgICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IHJldmlld19yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgICAgICAgb2NyX3Jlc3VsdDogbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiBpbWdEYXRhVXJsLFxuICAgICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogbWFza0ltYWdlLFxuICAgICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogZmFjZUltYWdlLFxuICAgICAgICAgICAgICBtYXNrSW5mbzogbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZSk7XG4gICAgICAgICAgICB0aGlzLmVuY3J5cHRSZXN1bHQocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTGVnYWN5Rm9ybWF0KSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2RhdGEgPSBsZWdhY3lGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ0NhcmQgZGV0ZWN0aW9uIGVycm9yJztcbiAgICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJzogJyArIGUubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdm9pZCAwO1xuXG4gICAgICAgICAgLy8gaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnbWVtb3J5JykpIHtcbiAgICAgICAgICAvLyAgIGF3YWl0IHRoaXMuX19yZWNvdmVyeVNjYW4oKTtcbiAgICAgICAgICAvLyAgIHRoaXMuX19yZWNvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX29uRmFpbHVyZVByb2Nlc3MoJ1dBMDAxJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAodGhpcy5fX3JlY292ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5fX3JlY292ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuX19kZXRlY3RlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChzY2FuLCAxKTsgLy8g7J6s6reAXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZXRUaW1lb3V0KHNjYW4sIDEpOyAvLyBVSSDrnpzrjZTrp4EgYmxvY2tpbmcg67Cp7KeAIChzZXRUaW1lb3V0KVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBtYXNrSW1hZ2UsIGZhY2VJbWFnZSwgY29uc3RhbnROdW1iZXIpIHtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZSkge1xuICAgICAgY29uc3QgcmVzaXplUmF0aW8gPSB0aGlzLl9fY3JvcEltYWdlU2l6ZUhlaWdodCAvIHRoaXMuX19jcm9wSW1hZ2VTaXplV2lkdGg7XG4gICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgbWF4V2lkdGg6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCxcbiAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggKiByZXNpemVSYXRpbyxcbiAgICAgICAgY29udmVydFNpemU6IHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUsXG4gICAgICAgIHRhcmdldENvbXByZXNzVm9sdW1lOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIC8vIGN1c3RvbSBvcHRpb25cbiAgICAgIH07XG5cbiAgICAgIHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSA9IGF3YWl0IHRoaXMuX19jb21wcmVzZUJhc2U2NEltYWdlKGltZ0RhdGFVcmwsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG5cbiAgICAgIC8vIG1hc2tpbmcg7J2066+47KeA64qUIHJlc2l6ZSDtlZjrqbQsIG1hc2sg7KKM7ZGc6rCAIOyWtOq4i+uCmOuvgOuhnCDrpqzsgqzsnbTspogg7JWI7ZWY6rOgIOyVley2leunjCDsp4TtlolcbiAgICAgIGNvbnN0IG1hc2tpbmdJbWFnZU9wdGlvbnMgPSB7XG4gICAgICAgIHF1YWxpdHk6IGRlZmF1bHRPcHRpb25zLnF1YWxpdHksXG4gICAgICAgIHRhcmdldENvbXByZXNzVm9sdW1lOiBkZWZhdWx0T3B0aW9ucy50YXJnZXRDb21wcmVzc1ZvbHVtZVxuICAgICAgfTtcbiAgICAgIHJldmlld19yZXN1bHQub2NyX21hc2tpbmdfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShtYXNrSW1hZ2UsIG1hc2tpbmdJbWFnZU9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKTtcbiAgICAgIHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShmYWNlSW1hZ2UsIGRlZmF1bHRPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgfVxuICB9XG4gIF9fcmVxdWVzdEdldEFQSVRva2VuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uY3JlZGVudGlhbDtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLl9fb3B0aW9ucy5hdXRoU2VydmVySW5mby5iYXNlVXJsO1xuICAgICAgZmV0Y2goYCR7YmFzZVVybH0vc2lnbi1pbmAsIHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbCksXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgICAgIC8vIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgLy8gY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBmZXRjaChgJHtiYXNlVXJsfS91c2ViL3Rva2VuYCwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtyZXN1bHQudG9rZW59YFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShqc29uLnRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9fcmVxdWVzdFNlcnZlck9DUihvY3JUeXBlLCBzc2FNb2RlLCBpbWdEYXRhVXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMub2NyU2VydmVyQmFzZVVybDtcbiAgICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9pZGNhcmQtZHJpdmVyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvcGFzc3BvcnQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuLWJhY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL2FsaWVuJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NyZWRpdCBjYXJkIGlzIG5vdCBVbnN1cHBvcnRlZCBTZXJ2ZXIgT0NSJyk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT0NSIHR5cGU6ICR7b2NyVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcGlUb2tlbiA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0R2V0QVBJVG9rZW4oKTtcbiAgICAgICAgY29uc3QgbXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgbXlIZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthcGlUb2tlbn1gKTtcbiAgICAgICAgY29uc3QgcGFyYW0gPSB7XG4gICAgICAgICAgaW1hZ2VfYmFzZTY0OiBpbWdEYXRhVXJsLFxuICAgICAgICAgIG1hc2tfbW9kZTogJ3RydWUnLFxuICAgICAgICAgIGZhY2VfbW9kZTogJ3RydWUnXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9fc3NhTW9kZSkge1xuICAgICAgICAgIHBhcmFtLnNzYV9tb2RlID0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhdyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczogbXlIZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IHJhdyxcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdydcbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2goYmFzZVVybCwgcmVxdWVzdE9wdGlvbnMpLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIF9fc3RhcnRTY2FuU2VydmVySW1wbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgLy8gdGhpcy5fX3NldFBpaUVuY3J5cHRNb2RlKHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKTsgLy8gb2NyIHJlc3VsdCBlbmNyeXB0XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgICB0aGlzLl9fYmx1ckNhcHR1cmVCdXR0b24oKTtcbiAgICAgICAgbGV0IG9jclJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICBzc2FSZXN1bHRMaXN0ID0gW107XG4gICAgICAgIGNvbnN0IF9fb25DbGlja0NhcHR1cmVCdXR0b24gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgLy8g7LqU67KE7Iqk7JeQ7IScIOydtOuvuOyngOulvCDqsIDsoLjsmLRcbiAgICAgICAgICBjb25zdCBbLCBpbWdEYXRhVXJsXSA9IGF3YWl0IHRoaXMuX19jcm9wSW1hZ2VGcm9tVmlkZW8oKTtcbiAgICAgICAgICBpZiAoMSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDsi6TtjKggKOuwnOyDnSDqsIDriqXshLEg7JeG7J2MKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXJ2ZXIgb2NyIOyEseqztVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUywgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgb2NyUmVzdWx0ID0gYXdhaXQgdGhpcy5fX3JlcXVlc3RTZXJ2ZXJPQ1IodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBpbWdEYXRhVXJsKTtcblxuICAgICAgICAgICAgICAvLyBmYWlsdXJlIGNhc2VcbiAgICAgICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfRkFJTEVEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlciBPQ1IgaXMgZmFpbGVkYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNzYSDsi5zrj4Q/XG5cbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FzZVxuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICB2aWRlb1xuICAgICAgICAgICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICB9KTsgLy8gT0NSIOyZhOujjCDsi5zsoJDsl5AgY2FtZXJhIHByZXZpZXcgb2ZmXG5cbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgbGVnYWN5Rm9ybWF0LFxuICAgICAgICAgICAgICBuZXdGb3JtYXQsXG4gICAgICAgICAgICAgIGJhc2U2NEltYWdlUmVzdWx0LFxuICAgICAgICAgICAgICBtYXNrSW5mb1xuICAgICAgICAgICAgfSA9IHVzZWJPQ1JBUElQYXJzZXIucGFyc2VPY3JSZXN1bHQodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBvY3JSZXN1bHQpO1xuICAgICAgICAgICAgbGV0IHJldmlld19yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgICAgICAgb2NyX3Jlc3VsdDogbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBvY3Jfb3JpZ2luX2ltYWdlOiBpbWdEYXRhVXJsLFxuICAgICAgICAgICAgICBvY3JfbWFza2luZ19pbWFnZTogYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9tYXNraW5nX2ltYWdlLFxuICAgICAgICAgICAgICBvY3JfZmFjZV9pbWFnZTogYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLFxuICAgICAgICAgICAgICBtYXNrSW5mbyxcbiAgICAgICAgICAgICAgc3NhX21vZGU6IHRoaXMuX19zc2FNb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfYXBpX3Jlc3BvbnNlID0gb2NyUmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NvbXByZXNzSW1hZ2VzKHJldmlld19yZXN1bHQsIGltZ0RhdGFVcmwsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSwgYmFzZTY0SW1hZ2VSZXN1bHQ/Lm9jcl9mYWNlX2ltYWdlLCAwLjApO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9jclJlc3VsdC5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25TdWNjZXNzUHJvY2VzcyhyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdENvZGUgPSAnU0YwMDEnO1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHRNZXNzYWdlID0gYCR7b2NyUmVzdWx0LnNjYW5uZXJfdHlwZX06JHtvY3JSZXN1bHQ/LnJlc3VsdF9jb2RlfWA7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdERldGFpbCA9IEpTT04uc3RyaW5naWZ5KG9jclJlc3VsdCk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIHJlc3VsdERldGFpbCwgcmVzdWx0TWVzc2FnZSk7IC8vIFFVUkFNIFNlcnZlciBPQ1Ig7JeQ65+sXG5cbiAgICAgICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fX2NhcHR1cmVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnU2VydmVyIE9DUiBFcnJvcic7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UpIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJzogJyArIGUubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICB2b2lkIDA7XG4gICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdTRTAwMScsIGUsIGVycm9yTWVzc2FnZSk7IC8vIFFVUkFNIFNlcnZlciBPQ1Ig7JeQ65+sXG4gICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2VucXVldWVEZXRlY3RlZENhcmRRdWV1ZShpbWdEYXRhLCBpbWdEYXRhVVJMKSB7XG4gICAgLy8gc3NhIHJldHJ5IOyEpOygleydtCDrkJjslrQg7J6I7Jy86rGw64KYLCDsiJjrj5nstKzsmIFVSeulvCDsgqzsmqntlZjripQg6rK97JqwLCBjYXJkIGRldGVjdCDshLHqs7Xsi5wg7J2066+47KeAIOyggOyepVxuICAgIGlmICh0aGlzLl9fc3NhTW9kZSAmJiB0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50ID4gMCB8fCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUkgJiYgdGhpcy5fX21hbnVhbE9DUk1heFJldHJ5Q291bnQgPiAwKSB7XG4gICAgICBsZXQgbGltaXRTYXZlSW1hZ2VDb3VudCA9IE1hdGgubWF4KHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQsIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50KTtcbiAgICAgIGlmICh0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUubGVuZ3RoID09PSBsaW1pdFNhdmVJbWFnZUNvdW50KSB7XG4gICAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlQmFzZTY0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUucHVzaChpbWdEYXRhKTtcbiAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB7XG4gICAgICAgIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5wdXNoKGltZ0RhdGFVUkwpO1xuICAgICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgICB9XG5cbiAgICAgIHZvaWQgMDsgLy8gc2hvdWxkIGJlIHJlbW92ZWRcbiAgICB9XG4gIH1cblxuICBhc3luYyBfX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCkge1xuICAgIC8vIOyduOyLnSDshLHqs7Ug7Iqk7LqUIOujqO2UhCDsooXro4xcbiAgICBpZiAocmV2aWV3X3Jlc3VsdC5zc2FfbW9kZSkge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0EpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTUyk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogJ04xMDAnLFxuICAgICAgICByZXN1bHRfbWVzc2FnZTogJ09LLidcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6ICdzdWNjZXNzJyxcbiAgICAgIHJldmlld19yZXN1bHQ6IHJldmlld19yZXN1bHRcbiAgICB9O1xuICAgIGlmICh0aGlzLl9fb25TdWNjZXNzKSB7XG4gICAgICB0aGlzLl9fb25TdWNjZXNzKHJlc3VsdCk7XG4gICAgICB0aGlzLl9fb25TdWNjZXNzID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdm9pZCAwO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX29uRmFpbHVyZVByb2Nlc3MocmVzdWx0Q29kZSwgZSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgbGV0IGVycm9yRGV0YWlsID0gJyc7XG4gICAgaWYgKGU/LnRvU3RyaW5nKCkpIGVycm9yRGV0YWlsICs9IGUudG9TdHJpbmcoKTtcbiAgICBpZiAoZT8uc3RhY2spIGVycm9yRGV0YWlsICs9IGUuc3RhY2s7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgYXBpX3Jlc3BvbnNlOiB7XG4gICAgICAgIHJlc3VsdF9jb2RlOiByZXN1bHRDb2RlLFxuICAgICAgICByZXN1bHRfbWVzc2FnZTogZXJyb3JNZXNzYWdlXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnZmFpbGVkJyxcbiAgICAgIHJldmlld19yZXN1bHQ6IHtcbiAgICAgICAgb2NyX3R5cGU6IHRoaXMuX19vY3JUeXBlLFxuICAgICAgICBlcnJvcl9kZXRhaWw6IGVycm9yRGV0YWlsXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uRmFpbHVyZSkge1xuICAgICAgdGhpcy5fX29uRmFpbHVyZShyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uRmFpbHVyZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19wcmVsb2FkaW5nV2FzbSgpIHtcbiAgICBjb25zdCBwcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5nZXRQcmVsb2FkaW5nU3RhdHVzKCk7XG4gICAgaWYgKCF0aGlzLmlzUHJlbG9hZGVkKCkgJiYgcHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRCkge1xuICAgICAgdm9pZCAwO1xuICAgICAgYXdhaXQgdGhpcy5wcmVsb2FkaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLlNUQVJURUQpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fd2FpdFByZWxvYWRlZCgpO1xuICAgICAgfSBlbHNlIGlmIChwcmVsb2FkaW5nU3RhdHVzID09PSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLkRPTkUpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhYm5vcm1hbGx5IHByZWxvYWRpbmcgc3RhdHVzLCBwcmVsb2FkZWQ6ICR7dGhpcy5pc1ByZWxvYWRlZCgpfSAvIHByZWxvYWRpbmdTdGF0dXM6ICR7dGhpcy5nZXRQcmVsb2FkaW5nU3RhdHVzKCl9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgLy8gX19zZXRQaWlFbmNyeXB0TW9kZShwaWlFbmNyeXB0TW9kZSkge1xuICAvLyAgIHRoaXMuX19PQ1JFbmdpbmUuc2V0UGlpRW5jcnlwdChwaWlFbmNyeXB0TW9kZSk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19lbmNyeXB0RGV0ZWN0ZWRCYXNlNjQoYWRkcmVzcywgbWFzaywgb2NyX21vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgLy8gICBpZiAoaW1nVHlwZSA9PT0gJ2ZhY2UnKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5lbmNyeXB0QmFzZTY0anBnRGV0ZWN0ZWRQaG90b0Jhc2U2NChhZGRyZXNzKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkRnJhbWVCYXNlNjQoXG4gIC8vICAgICBhZGRyZXNzLFxuICAvLyAgICAgbWFzayxcbiAgLy8gICAgIG9jcl9tb2RlXG4gIC8vICAgKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZFNpemUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jcnlwdGVkSnBnU2l6ZSgpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0RW5jcnlwdGVkQnVmZmVyKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ0J1ZmZlcigpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KGFkZHJlc3MsIG1hc2ssIGltZ01vZGUsIGltZ1R5cGUgPSAnY2FyZCcpIHtcbiAgLy8gICBjb25zdCBlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPSB0aGlzLl9fZW5jcnlwdERldGVjdGVkQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBpbWdNb2RlLFxuICAvLyAgICAgaW1nVHlwZVxuICAvLyAgICk7XG4gIC8vICAgaWYgKGVuY3J5cHREZXRlY3RlZEJhc2U2NCA9PT0gMSkge1xuICAvLyAgICAgY29uc3QganBnU2l6ZSA9IHRoaXMuX19nZXRFbmNyeXB0ZWRTaXplKCk7XG4gIC8vICAgICBjb25zdCBqcGdQb2ludGVyID0gdGhpcy5fX2dldEVuY3J5cHRlZEJ1ZmZlcigpO1xuICAvL1xuICAvLyAgICAgY29uc3QgZW5jcnlwdGVkID0gbmV3IFVpbnQ4QXJyYXkoXG4gIC8vICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuSEVBUDguYnVmZmVyLFxuICAvLyAgICAgICBqcGdQb2ludGVyLFxuICAvLyAgICAgICBqcGdTaXplXG4gIC8vICAgICApO1xuICAvLyAgICAgY29uc3QgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG4gIC8vICAgICBjb25zdCBkZWNvZGVkU3RyaW5nID0gdGV4dERlY29kZXIuZGVjb2RlKGVuY3J5cHRlZCk7XG4gIC8vXG4gIC8vICAgICByZXR1cm4gZGVjb2RlZFN0cmluZztcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuICcnO1xuICAvLyB9XG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gIGFzeW5jIF9fc3RhcnRTY2FuV2FzbSgpIHtcbiAgICB0aGlzLl9fZGVidWcoJ3dhc21fbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIGF3YWl0IHRoaXMuX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpO1xuICAgIGF3YWl0IHRoaXMuX19zdGFydFNjYW5XYXNtSW1wbCgpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBhc3luYyBfX3N0YXJ0U2NhblNlcnZlcigpIHtcbiAgICB0aGlzLl9fZGVidWcoJ3NlcnZlcl9tb2RlJyk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJID0gdHJ1ZTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuU2VydmVySW1wbCgpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBhc3luYyBfX3JlY292ZXJ5U2NhbigpIHtcbiAgICB2b2lkIDA7XG4gICAgdGhpcy5fX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbSgpO1xuICB9XG4gIHN0b3BTY2FuKCkge1xuICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7IC8vIHN3aXRjaCB0byBzZXJ2ZXLsnbzrlYwg6riw7KG0IFdBU00gbG9vcCDqsJXsoJzsooXro4xcbiAgICBjb25zdCB7XG4gICAgICBjYW52YXNcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAoY2FudmFzKSB7XG4gICAgICBjb25zdCBjYW52YXNDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgICB3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWVcbiAgICAgIH0pO1xuICAgICAgY2FudmFzQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cbiAgc3RvcFN0cmVhbSgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQpO1xuICAgIGlmICh0aGlzLl9fc3RyZWFtKSB7XG4gICAgICB0aGlzLl9fc3RyZWFtLnN0b3AgJiYgdGhpcy5fX3N0cmVhbS5zdG9wKCk7XG4gICAgICBsZXQgdHJhY2tzID0gdGhpcy5fX3N0cmVhbS5nZXRUcmFja3MgJiYgdGhpcy5fX3N0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGlmICh0cmFja3MgJiYgdHJhY2tzLmxlbmd0aCkge1xuICAgICAgICB0cmFja3MuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3N0cmVhbSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIOuplOuqqOumrCBhbGxvY2F0aW9uIGZyZWUg7ZWo7IiYICovXG4gIGNsZWFudXAoKSB7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcygpO1xuICAgIHRoaXMuX19kZXN0cm95QnVmZmVyKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lQcmV2SW1hZ2UoKTtcbiAgICB0aGlzLl9fZGVzdHJveVN0cmluZ09uV2FzbUhlYXAoKTtcbiAgfVxuICByZXN0b3JlSW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9fcHJlbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgfVxuICBfX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpIHtcbiAgICBpZiAodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcik7XG4gICAgICB0aGlzLl9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBVc2VCT0NSOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxPQUFPQSxRQUFRLE1BQU0sdUJBQXVCO0FBQzVDLE9BQU9DLGlCQUFpQixNQUFNLG1DQUFtQztBQUNqRSxPQUFPQyxnQkFBZ0IsTUFBTSxrQ0FBa0M7QUFDL0QsU0FBU0MsYUFBYSxFQUFFQyxPQUFPLEVBQUVDLElBQUksRUFBRUMsT0FBTyxRQUFRLGtDQUFrQztBQUN4RixPQUFPQyxTQUFTLE1BQU0seUJBQXlCO0FBQy9DLElBQUlDLFFBQVE7QUFDWixNQUFNQyxPQUFPLENBQUM7RUFvQ1o7O0VBRUE7O0VBdUVpQztFQUNMOztFQU1FO0VBQ0Y7RUFDQzs7RUFLN0I7O0VBcUxBO0VBQ0FDLFdBQVdBLENBQUEsRUFBRztJQUFBQyxlQUFBLHNCQWhUQTtNQUNaQyxJQUFJLEVBQUUsTUFBTTtNQUNaQyxTQUFTLEVBQUUsV0FBVztNQUN0QkMsS0FBSyxFQUFFLE9BQU87TUFDZEMsbUJBQW1CLEVBQUUsZ0JBQWdCO01BQ3JDQyxrQkFBa0IsRUFBRSxlQUFlO01BQ25DQyxzQkFBc0IsRUFBRSx3QkFBd0I7TUFDaERDLHFCQUFxQixFQUFFLHVCQUF1QjtNQUM5Q0MsY0FBYyxFQUFFLFlBQVk7TUFDNUJDLHVCQUF1QixFQUFFLHFCQUFxQjtNQUM5Q0MsV0FBVyxFQUFFLGFBQWE7TUFDMUJDLG9CQUFvQixFQUFFLHNCQUFzQjtNQUM1Q0MsVUFBVSxFQUFFO0lBQ2QsQ0FBQztJQUFBWixlQUFBLHFCQUNZO01BQ1hFLFNBQVMsRUFBRSxDQUFDLENBQUM7TUFDYkMsS0FBSyxFQUFFLENBQUM7TUFDUk8sV0FBVyxFQUFFLENBQUM7TUFDZEcsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUFBYixlQUFBLDRCQUNtQjtNQUNsQmMsV0FBVyxFQUFFLENBQUMsQ0FBQztNQUNmQyxPQUFPLEVBQUUsQ0FBQztNQUNWRixJQUFJLEVBQUU7SUFDUixDQUFDO0lBQUFiLGVBQUEsdUJBQ2M7TUFDYmdCLE9BQU8sRUFBRSxDQUFDO01BQ1ZDLFFBQVEsRUFBRSxDQUFDO01BQ1hoQixJQUFJLEVBQUU7SUFDUixDQUFDO0lBQUFELGVBQUEsNEJBQ21CO01BQ2xCa0IsS0FBSyxFQUFFLENBQUM7TUFDUkMsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUFBbkIsZUFBQSxzQkFLYSxLQUFLO0lBQUFBLGVBQUEsc0JBQ0wsSUFBSTtJQUFBQSxlQUFBLDBCQUNBLEtBQUs7SUFBQUEsZUFBQSwwQkFDTCxLQUFLO0lBQUFBLGVBQUEsd0JBQ1AsS0FBSztJQUFBQSxlQUFBLHNCQUNQLEtBQUs7SUFBQUEsZUFBQSw2QkFDRSxJQUFJLENBQUNvQixpQkFBaUIsQ0FBQ04sV0FBVztJQUFBZCxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQSxvQkFHM0MsS0FBSztJQUFBQSxlQUFBLHNCQUNILElBQUksQ0FBQ3FCLFVBQVUsQ0FBQ25CLFNBQVM7SUFBQUYsZUFBQSxtQ0FDWixFQUFFO0lBQUFBLGVBQUEsZ0NBQ0wsQ0FBQztJQUFBQSxlQUFBLDBCQUNQLENBQUM7SUFBQUEsZUFBQSw4QkFDRyxFQUFFO0lBQUFBLGVBQUEsb0NBQ0ksRUFBRTtJQUFBQSxlQUFBLHNCQUNoQixJQUFJO0lBQUFBLGVBQUEsc0JBQ0osSUFBSTtJQUFBQSxlQUFBLCtCQUNLLElBQUk7SUFBQUEsZUFBQSx3QkFDWCxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLFdBQVcsQ0FBQztJQUFBQSxlQUFBLGtDQUM1SixJQUFJc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQUF0QixlQUFBLGtDQUMvSixJQUFJc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQUF0QixlQUFBLG9CQUM3SyxLQUFLO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUEsb0JBc0JMLENBQUM7SUFBQUEsZUFBQSxxQkFDQSxLQUFLO0lBQUFBLGVBQUEsc0JBQ0osS0FBSztJQUFBQSxlQUFBLG1CQUNSLElBQUk7SUFBQUEsZUFBQSx5QkFDRSxJQUFJO0lBQUFBLGVBQUEsOEJBQ0MsSUFBSTtJQUFBQSxlQUFBLHNCQUNaLElBQUk7SUFBQUEsZUFBQSw2QkFDRyxJQUFJO0lBQUFBLGVBQUEsMkJBQ04sS0FBSztJQUFBQSxlQUFBLDRCQUNKLENBQUM7SUFBQUEsZUFBQSw2QkFDQSxDQUFDO0lBQUFBLGVBQUEsdUJBQ1AsQ0FBQztJQUFBQSxlQUFBLHdCQUNBLENBQUM7SUFBQUEsZUFBQSw0QkFDRyxLQUFLO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBLHFDQUdJLENBQUM7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUEsbUNBR0gsSUFBSTtJQUFBQSxlQUFBLGlDQUNOLGFBQWE7SUFBQUEsZUFBQSwwQkFDcEIsRUFBRTtJQUFBQSxlQUFBLDhCQUNFLEVBQUU7SUFBQUEsZUFBQSw2QkFDSCxFQUFFO0lBQUFBLGVBQUEsa0NBQ0csSUFBSTtJQUFBQSxlQUFBLGtDQUNKLEdBQUc7SUFBQUEsZUFBQSxvQ0FDRCxHQUFHO0lBQUFBLGVBQUEsaUNBQ04sQ0FBQztJQUFBQSxlQUFBO0lBQUFBLGVBQUEsNkJBRUwsS0FBSztJQUFBQSxlQUFBLDJCQUNQLElBQUksQ0FBQ3VCLFdBQVcsQ0FBQ3JCLFNBQVM7SUFBQUYsZUFBQSxtQ0FDbEIsSUFBSSxDQUFDdUIsV0FBVyxDQUFDdEIsSUFBSTtJQUFBRCxlQUFBLHFDQUNuQixLQUFLO0lBQUFBLGVBQUEsaUNBQ1QsR0FBRztJQUFBQSxlQUFBLCtCQUNMLEdBQUc7SUFBQUEsZUFBQSxnQ0FDRixHQUFHO0lBQUFBLGVBQUEsK0JBQ0osQ0FBQztJQUFBQSxlQUFBLGdDQUNBLENBQUM7SUFBQUEsZUFBQSxpQ0FDQSxLQUFLO0lBQUFBLGVBQUEsb0JBR2xCLElBQUl3QixNQUFNLENBQUM7TUFDckI7TUFDQUMsYUFBYSxFQUFFLEtBQUs7TUFDcEI7TUFDQUMsaUJBQWlCLEVBQUUsS0FBSztNQUN4Qjs7TUFFQTtNQUNBO01BQ0FDLGNBQWMsRUFBRSxLQUFLO01BQ3JCO01BQ0FDLGlCQUFpQixFQUFFLEtBQUs7TUFDeEI7TUFDQUMscUJBQXFCLEVBQUUsS0FBSztNQUM1QjtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0FDLGVBQWUsRUFBRSxLQUFLO01BQ3RCO01BQ0FDLFdBQVcsRUFBRSxJQUFJO01BQ2pCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLGdCQUFnQixFQUFFLEtBQUs7TUFDdkI7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsZ0JBQWdCLEVBQUUsS0FBSztNQUN2QjtNQUNBQyx3QkFBd0IsRUFBRSxJQUFJO01BQzlCO01BQ0FDLHlCQUF5QixFQUFFLElBQUksR0FBRyxFQUFFO01BQ3BDOztNQUVBO01BQ0FDLFFBQVEsRUFBRSxJQUFJO01BQ2Q7TUFDQUMsZUFBZSxFQUFFLEtBQUs7TUFDdEI7TUFDQUMsV0FBVyxFQUFFLElBQUk7TUFDakI7TUFDQUMsa0JBQWtCLEVBQUUsSUFBSTtNQUN4QjtNQUNBQyxXQUFXLEVBQUUsSUFBSTtNQUNqQjtNQUNBQyxrQkFBa0IsRUFBRSxLQUFLO01BQ3pCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLFlBQVksRUFBRSxJQUFJO01BQ2xCO01BQ0FDLG1CQUFtQixFQUFFLHNDQUFzQztNQUMzRDtNQUNBQyxnQkFBZ0IsRUFBRTtRQUNoQkMsS0FBSyxFQUFFLENBQUM7UUFDUjtRQUNBQyxNQUFNLEVBQUUsRUFBRTtRQUNWO1FBQ0FDLEtBQUssRUFBRSxPQUFPO1FBQ2Q7O1FBRUE7UUFDQUMsU0FBUyxFQUFFLFNBQVM7UUFDcEI7UUFDQUMsS0FBSyxFQUFFLFNBQVM7UUFDaEI7UUFDQUMsY0FBYyxFQUFFLFNBQVM7UUFDekI7UUFDQUMsYUFBYSxFQUFFLFNBQVM7UUFDeEI7UUFDQUMsc0JBQXNCLEVBQUUsU0FBUztRQUNqQztRQUNBQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDO1FBQ0FDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCO1FBQ0FDLG1CQUFtQixFQUFFLFNBQVM7UUFDOUI7UUFDQUMsV0FBVyxFQUFFLFNBQVM7UUFDdEI7UUFDQUMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQjtRQUNBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO01BQ3hCLENBQUM7O01BRUQ7TUFDQUMsdUJBQXVCLEVBQUUsSUFBSTtNQUM3QjtNQUNBQyxjQUFjLEVBQUU7UUFDZEMsVUFBVSxFQUFFLFNBQVM7UUFDckI7UUFDQUMsVUFBVSxFQUFFLFNBQVM7UUFDckI7O1FBRUE7UUFDQWQsU0FBUyxFQUFFLFNBQVM7UUFDcEI7UUFDQUMsS0FBSyxFQUFFLFNBQVM7UUFDaEI7UUFDQUMsY0FBYyxFQUFFLFNBQVM7UUFDekI7UUFDQUMsYUFBYSxFQUFFLFNBQVM7UUFDeEI7UUFDQUMsc0JBQXNCLEVBQUUsU0FBUztRQUNqQztRQUNBQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDO1FBQ0FDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCO1FBQ0FDLG1CQUFtQixFQUFFLFNBQVM7UUFDOUI7UUFDQUMsV0FBVyxFQUFFLFNBQVM7UUFDdEI7UUFDQUMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQjtRQUNBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO01BQ3hCLENBQUM7O01BRUQ7TUFDQUsseUJBQXlCLEVBQUUsS0FBSztNQUNoQztNQUNBQywyQkFBMkIsRUFBRSxLQUFLO01BQ2xDO01BQ0FDLHVCQUF1QixFQUFFLElBQUk7TUFDN0I7TUFDQUMsa0JBQWtCLEVBQUUsS0FBSztNQUN6Qjs7TUFFQTtNQUNBQyxrQkFBa0IsRUFBRTtRQUNsQkMsWUFBWSxFQUFFLFNBQVM7UUFDdkI7UUFDQU4sVUFBVSxFQUFFLFNBQVMsQ0FBQztNQUN4QixDQUFDOztNQUVETyxlQUFlLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNO01BQ3ZDO01BQ0FDLFdBQVcsRUFBRSxFQUFFO01BQ2ZDLGFBQWEsRUFBRSxFQUFFO01BQ2pCO01BQ0FDLGNBQWMsRUFBRSxDQUFDO01BQ2pCO01BQ0FDLFVBQVUsRUFBRSxLQUFLO01BQ2pCO01BQ0FDLGtDQUFrQyxFQUFFLElBQUk7TUFDeEM7TUFDQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDO01BQ25DOztNQUVBO01BQ0E7TUFDQUMsd0JBQXdCLEVBQUUsYUFBYTtNQUN2Qzs7TUFFQTtNQUNBQyxvQkFBb0IsRUFBRSxrQkFBa0I7TUFDeEM7TUFDQTs7TUFFQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQUMsWUFBWSxFQUFFLFVBQVU7TUFDeEJDLGFBQWEsRUFBRSxHQUFHO01BQ2xCO01BQ0FDLGdCQUFnQixFQUFFLENBQUM7TUFDbkI7O01BRUE7TUFDQUMsYUFBYSxFQUFFLEtBQUs7TUFDcEI7TUFDQUMsaUJBQWlCLEVBQUUsS0FBSztNQUN4QkMsc0JBQXNCLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0lBSUEsSUFBSTVGLFFBQVEsRUFBRSxPQUFPQSxRQUFRO0lBQzdCQSxRQUFRLEdBQUcsSUFBSTtJQUNmLE9BQU9BLFFBQVE7RUFDakI7O0VBRUE7RUFDTTZGLFVBQVVBLENBQUNDLFdBQVcsRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFBQSxPQUFBQyxpQkFBQTtNQUM1QixJQUFJRCxLQUFJLENBQUNFLFdBQVcsRUFBRSxFQUFFO1FBQ3RCLEtBQUssQ0FBQztRQUNOLElBQUlILFdBQVcsRUFBRUEsV0FBVyxFQUFFO01BQ2hDLENBQUMsTUFBTTtRQUNMLEtBQUssQ0FBQztRQUNOQyxLQUFJLENBQUNHLGdCQUFnQixFQUFFO1FBQ3ZCSCxLQUFJLENBQUNJLGtCQUFrQixHQUFHSixLQUFJLENBQUN4RSxpQkFBaUIsQ0FBQ0wsT0FBTztRQUN4RCxNQUFNNkUsS0FBSSxDQUFDSyxlQUFlLEVBQUU7UUFDNUJMLEtBQUksQ0FBQ0ksa0JBQWtCLEdBQUdKLEtBQUksQ0FBQ3hFLGlCQUFpQixDQUFDUCxJQUFJO1FBQ3JEK0UsS0FBSSxDQUFDTSxXQUFXLEdBQUcsSUFBSTtRQUN2QixJQUFJUCxXQUFXLEVBQUVBLFdBQVcsRUFBRTtRQUM5QkMsS0FBSSxDQUFDTyxnQkFBZ0IsRUFBRTtRQUN2QixLQUFLLENBQUM7TUFDUjtJQUFDO0VBQ0g7RUFDQUMsYUFBYUEsQ0FBQSxFQUFHO0lBQ2QsT0FBTyxJQUFJLENBQUNDLGFBQWE7RUFDM0I7RUFDQVAsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osT0FBTyxJQUFJLENBQUNJLFdBQVc7RUFDekI7RUFDQUksbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsT0FBTyxJQUFJLENBQUNOLGtCQUFrQjtFQUNoQztFQUNBTyxhQUFhQSxDQUFBLEVBQUc7SUFDZCxPQUFPLElBQUksQ0FBQ0MsU0FBUyxDQUFDN0UsY0FBYyxJQUFJLElBQUksQ0FBQzZFLFNBQVMsQ0FBQzVFLGlCQUFpQixJQUFJLElBQUksQ0FBQzRFLFNBQVMsQ0FBQzNFLHFCQUFxQjtFQUNsSDtFQUNBNEUsWUFBWUEsQ0FBQSxFQUFHO0lBQ2IsT0FBTyxJQUFJLENBQUNDLFNBQVMsS0FBSyxRQUFRO0VBQ3BDO0VBQ0FYLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQ2pCLElBQU07TUFDSlk7SUFDRixDQUFDLEdBQUd0SCxRQUFRLENBQUN1SCxjQUFjLEVBQUU7SUFDN0IsSUFBSUQsZ0JBQWdCLEVBQUU7TUFDcEJBLGdCQUFnQixDQUFDekQsS0FBSyxDQUFDMkQsT0FBTyxHQUFHLE1BQU07SUFDekM7RUFDRjtFQUNBVixnQkFBZ0JBLENBQUEsRUFBRztJQUNqQixJQUFNO01BQ0pRO0lBQ0YsQ0FBQyxHQUFHdEgsUUFBUSxDQUFDdUgsY0FBYyxFQUFFO0lBQzdCLElBQUlELGdCQUFnQixFQUFFO01BQ3BCQSxnQkFBZ0IsQ0FBQ3pELEtBQUssQ0FBQzJELE9BQU8sR0FBRyxNQUFNO0lBQ3pDO0VBQ0Y7RUFDQUMsYUFBYUEsQ0FBQ0MsYUFBYSxFQUFFO0lBQzNCLElBQUksSUFBSSxDQUFDTixZQUFZLEVBQUUsRUFBRTtNQUN2QjtJQUNGO0lBQ0EsSUFBSSxJQUFJLENBQUNGLGFBQWEsRUFBRSxJQUFJLElBQUksQ0FBQ1MsZUFBZSxFQUFFO01BQ2hELElBQUksSUFBSSxDQUFDUixTQUFTLENBQUM3RSxjQUFjLEVBQUU7UUFDakMsSUFBTXNGLFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDO1FBQzVGOztRQUVBLElBQU1DLFNBQVMsR0FBRztVQUNoQkMsVUFBVSxFQUFFQyxDQUFDLENBQUNDLE9BQU8sQ0FBQ0QsQ0FBQyxDQUFDRSxJQUFJLENBQUNQLGFBQWEsQ0FBQ0ksVUFBVSxFQUFFRixXQUFXLENBQUMsQ0FBQyxDQUFDTSxNQUFNLENBQUMsQ0FBQ0MsR0FBRyxFQUFBQyxJQUFBLEtBQW1CO1lBQUEsSUFBakIsQ0FBQ0MsR0FBRyxFQUFFQyxLQUFLLENBQUMsR0FBQUYsSUFBQTtZQUM1RkQsR0FBRyxDQUFDRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUNFLG1CQUFtQixDQUFDRCxLQUFLLENBQUM7WUFDMUMsT0FBT0gsR0FBRztVQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUNOSyxnQkFBZ0IsRUFBRSxJQUFJLENBQUNELG1CQUFtQixDQUFDYixhQUFhLENBQUNjLGdCQUFnQjtRQUMzRSxDQUFDO1FBQ0RkLGFBQWEsQ0FBQ0ksVUFBVSxHQUFBVyxhQUFBLENBQUFBLGFBQUEsS0FDbkJmLGFBQWEsQ0FBQ0ksVUFBVSxHQUN4QkQsU0FBUyxDQUFDQyxVQUFVLENBQ3hCO1FBQ0RKLGFBQWEsQ0FBQ2MsZ0JBQWdCLEdBQUdYLFNBQVMsQ0FBQ1csZ0JBQWdCO01BQzdELENBQUMsTUFBTTtRQUNMLElBQU1FLFdBQVcsR0FBRyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQzs7UUFFbEw7UUFDQSxJQUFJLElBQUksQ0FBQ3ZCLFNBQVMsQ0FBQzVFLGlCQUFpQixFQUFFO1VBQ3BDLElBQU1zRixVQUFTLEdBQUc7WUFDaEJDLFVBQVUsRUFBRUMsQ0FBQyxDQUFDQyxPQUFPLENBQUNELENBQUMsQ0FBQ1ksSUFBSSxDQUFDakIsYUFBYSxDQUFDSSxVQUFVLEVBQUVZLFdBQVcsQ0FBQyxDQUFDLENBQUNSLE1BQU0sQ0FBQyxDQUFDQyxHQUFHLEVBQUFTLEtBQUEsS0FBbUI7Y0FBQSxJQUFqQixDQUFDUCxHQUFHLEVBQUVDLEtBQUssQ0FBQyxHQUFBTSxLQUFBO2NBQzVGVCxHQUFHLENBQUNFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQ0UsbUJBQW1CLENBQUNELEtBQUssQ0FBQztjQUMxQyxPQUFPSCxHQUFHO1lBQ1osQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ05LLGdCQUFnQixFQUFFLElBQUksQ0FBQ0QsbUJBQW1CLENBQUNiLGFBQWEsQ0FBQ2MsZ0JBQWdCLENBQUM7WUFDMUVLLGlCQUFpQixFQUFFLElBQUksQ0FBQ04sbUJBQW1CLENBQUNiLGFBQWEsQ0FBQ21CLGlCQUFpQixDQUFDO1lBQzVFQyxjQUFjLEVBQUUsSUFBSSxDQUFDUCxtQkFBbUIsQ0FBQ2IsYUFBYSxDQUFDb0IsY0FBYztVQUN2RSxDQUFDO1VBQ0RwQixhQUFhLENBQUNHLFNBQVMsR0FBR0EsVUFBUztRQUNyQyxDQUFDLE1BQU07VUFDTCxJQUFNQSxXQUFTLEdBQUc7WUFDaEJDLFVBQVUsRUFBRUMsQ0FBQyxDQUFDWSxJQUFJLENBQUNqQixhQUFhLENBQUNJLFVBQVUsRUFBRVksV0FBVyxDQUFDO1lBQ3pERixnQkFBZ0IsRUFBRWQsYUFBYSxDQUFDYyxnQkFBZ0I7WUFDaERLLGlCQUFpQixFQUFFbkIsYUFBYSxDQUFDbUIsaUJBQWlCO1lBQ2xEQyxjQUFjLEVBQUVwQixhQUFhLENBQUNvQjtVQUNoQyxDQUFDO1VBQ0RwQixhQUFhLENBQUNxQixpQkFBaUIsR0FBRztZQUNoQ0MsSUFBSSxFQUFFLElBQUksQ0FBQ1QsbUJBQW1CLENBQUNVLElBQUksQ0FBQ0MsU0FBUyxDQUFDckIsV0FBUyxDQUFDLENBQUM7WUFDekRzQixTQUFTLEVBQUVDLElBQUksQ0FBQ0MsR0FBRztVQUNyQixDQUFDO1FBQ0g7TUFDRjtJQUNGO0VBQ0Y7RUFDQUMsWUFBWUEsQ0FBQSxFQUFHO0lBQ2IsT0FBTyxJQUFJLENBQUNDLFdBQVc7RUFDekI7RUFDQUMsSUFBSUEsQ0FBQ0MsUUFBUSxFQUFFO0lBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQ0EsUUFBUSxDQUFDQyxVQUFVLEVBQUUsTUFBTSxJQUFJQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDbkUsSUFBSSxDQUFDQyxTQUFTLEdBQUdILFFBQVEsQ0FBQ0MsVUFBVTtJQUNwQyxJQUFNRyxhQUFhLEdBQUc5QixDQUFDLENBQUMrQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDM0MsU0FBUyxFQUFFc0MsUUFBUSxDQUFDO0lBQzNELElBQUksQ0FBQ00sU0FBUyxDQUFDRixhQUFhLENBQUM7SUFDN0IsS0FBSyxDQUFDO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzlDLGFBQWEsRUFBRSxFQUFFO01BQ3pCLElBQUksQ0FBQ2lELGlCQUFpQixFQUFFO01BQ3hCLElBQUksQ0FBQ0MsWUFBWSxHQUFHakssUUFBUSxDQUFDa0ssWUFBWSxFQUFFO01BQzNDLEtBQUssQ0FBQztNQUNOLElBQUksQ0FBQ3ZDLGVBQWUsR0FBR3hILGFBQWEsRUFBRTtNQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDd0gsZUFBZSxFQUFFO1FBQ3pCLE1BQU0sSUFBSWdDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQztNQUNuRTtNQUNBLElBQUksQ0FBQzNDLGFBQWEsR0FBRyxJQUFJO0lBQzNCO0VBQ0Y7RUFDQStDLFNBQVNBLENBQUNOLFFBQVEsRUFBRTtJQUNsQixJQUFJLENBQUN0QyxTQUFTLEdBQUdzQyxRQUFRO0VBQzNCO0VBQ0FVLFNBQVNBLENBQUEsRUFBRztJQUNWLE9BQU8sSUFBSSxDQUFDaEQsU0FBUztFQUN2QjtFQUNBaUQsVUFBVUEsQ0FBQ0MsSUFBSSxFQUFFO0lBQ2YsT0FBTyxJQUFJLENBQUNDLHVCQUF1QixDQUFDQyxHQUFHLENBQUNGLElBQUksQ0FBQztFQUMvQztFQUNBRyxnQkFBZ0JBLENBQUNDLE1BQU0sRUFBRTtJQUN2QixPQUFPLElBQUksQ0FBQ0MsdUJBQXVCLENBQUNILEdBQUcsQ0FBQ0UsTUFBTSxDQUFDO0VBQ2pEO0VBQ0FFLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQ2pCLE9BQU8sSUFBSSxDQUFDQyxlQUFlO0VBQzdCO0VBQ0FDLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU8sSUFBSSxDQUFDQyxrQkFBa0I7RUFDaEM7RUFDTUMsdUJBQXVCQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxNQUFBO0lBQUEsT0FBQXhFLGlCQUFBO01BQzlCLElBQUl3RSxNQUFJLENBQUM3RCxTQUFTLENBQUNyQywyQkFBMkIsRUFBRTtRQUM5QztRQUNBLE9BQU9rRyxNQUFJLENBQUNDLHNCQUFzQjtNQUNwQyxDQUFDLE1BQU07UUFDTDtRQUNBLElBQUlELE1BQUksQ0FBQzdELFNBQVMsQ0FBQ3RDLHlCQUF5QixFQUFFO1VBQzVDO1VBQ0E7VUFDQSxJQUFNLENBQUNxRyxlQUFlLEVBQUVDLGFBQWEsQ0FBQyxTQUFTL0ssT0FBTyxFQUFFO1VBQ3hENEssTUFBSSxDQUFDSSxPQUFPLENBQUNELGFBQWEsQ0FBQztVQUMzQixPQUFPRCxlQUFlLEdBQUdHLFVBQVUsQ0FBQ0wsTUFBSSxDQUFDN0QsU0FBUyxDQUFDcEMsdUJBQXVCLENBQUM7UUFDN0UsQ0FBQyxNQUFNO1VBQ0w7VUFDQSxPQUFPLEtBQUs7UUFDZDtNQUNGO0lBQUM7RUFDSDtFQUNNdUcsUUFBUUEsQ0FBQ2pCLElBQUksRUFBRWtCLFNBQVMsRUFBRUMsU0FBUyxFQUE2QjtJQUFBLElBQUFDLFVBQUEsR0FBQUMsU0FBQTtNQUFBQyxNQUFBO0lBQUEsT0FBQW5GLGlCQUFBO01BQUEsSUFBM0JvRixrQkFBa0IsR0FBQUgsVUFBQSxDQUFBSSxNQUFBLFFBQUFKLFVBQUEsUUFBQUssU0FBQSxHQUFBTCxVQUFBLE1BQUcsSUFBSTtNQUNsRSxJQUFJLENBQUMsQ0FBQyxDQUFDcEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDa0IsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxTQUFTLEVBQUU7UUFDM0MsS0FBSyxDQUFDO1FBQ047TUFDRjtNQUNBRyxNQUFJLENBQUNWLHNCQUFzQixTQUFTVSxNQUFJLENBQUNaLHVCQUF1QixFQUFFO01BQ2xFWSxNQUFJLENBQUN0RSxTQUFTLEdBQUdnRCxJQUFJO01BQ3JCc0IsTUFBSSxDQUFDSSxTQUFTLEdBQUdKLE1BQUksQ0FBQ3RFLFNBQVMsQ0FBQzJFLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDcERMLE1BQUksQ0FBQ00sV0FBVyxHQUFHVixTQUFTO01BQzVCSSxNQUFJLENBQUNPLFdBQVcsR0FBR1YsU0FBUztNQUM1QkcsTUFBSSxDQUFDUSxvQkFBb0IsR0FBR1Asa0JBQWtCO01BQzlDLElBQUlBLGtCQUFrQixFQUFFO1FBQ3RCLElBQUlELE1BQUksQ0FBQ3hFLFNBQVMsQ0FBQ2xFLFFBQVEsRUFBRTtVQUMzQjBJLE1BQUksQ0FBQ1MsT0FBTyxHQUFHcE0sUUFBUSxDQUFDdUgsY0FBYyxFQUFFLENBQUM4RSxLQUFLO1FBQ2hEO1FBQ0EsSUFBSVYsTUFBSSxDQUFDeEUsU0FBUyxDQUFDaEUsV0FBVyxFQUFFO1VBQzlCd0ksTUFBSSxDQUFDVyxVQUFVLEdBQUd0TSxRQUFRLENBQUN1SCxjQUFjLEVBQUUsQ0FBQ2dGLFFBQVE7UUFDdEQ7UUFDQSxJQUFJWixNQUFJLENBQUN4RSxTQUFTLENBQUM5RCxXQUFXLEVBQUU7VUFDOUJzSSxNQUFJLENBQUNhLFVBQVUsR0FBR3hNLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRSxDQUFDa0YsUUFBUTtRQUN0RDtNQUNGO01BQ0EsTUFBTWQsTUFBSSxDQUFDZSxhQUFhLENBQUNmLE1BQUksQ0FBQ3pKLFdBQVcsQ0FBQ3JCLFNBQVMsQ0FBQztNQUNwRCxJQUFJLENBQUM4SyxNQUFJLENBQUM1RSxhQUFhLEVBQUUsRUFBRTtRQUN6QixNQUFNLElBQUk0QyxLQUFLLENBQUMsa0JBQWtCLENBQUM7TUFDckM7TUFDQSxJQUFJO1FBQ0ZnQyxNQUFJLENBQUNnQixZQUFZLEVBQUU7UUFDbkIsTUFBTWhCLE1BQUksQ0FBQ2lCLGtCQUFrQixFQUFFO1FBQy9CLElBQUlqQixNQUFJLENBQUNWLHNCQUFzQixFQUFFO1VBQy9CO1VBQ0EsSUFBSVUsTUFBSSxDQUFDekUsYUFBYSxFQUFFLElBQUl5RSxNQUFJLENBQUNoRSxlQUFlLEVBQUU7WUFDaEQsTUFBTWdFLE1BQUksQ0FBQ2tCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztVQUNqQzs7VUFFQSxNQUFNbEIsTUFBSSxDQUFDbUIsaUJBQWlCLEVBQUU7UUFDaEMsQ0FBQyxNQUFNO1VBQ0w7VUFDQSxNQUFNbkIsTUFBSSxDQUFDa0IsZ0JBQWdCLEVBQUU7VUFDN0IsTUFBTWxCLE1BQUksQ0FBQ29CLGVBQWUsRUFBRTtRQUM5QjtNQUNGLENBQUMsQ0FBQyxPQUFPQyxDQUFDLEVBQUU7UUFDVixLQUFLLENBQUM7TUFDUixDQUFDLFNBQVM7UUFDUnJCLE1BQUksQ0FBQ3NCLE9BQU8sRUFBRTtNQUNoQjtJQUFDO0VBQ0g7RUFDQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsSUFBSSxDQUFDQyxPQUFPLEVBQUU7SUFDZCxJQUFJLENBQUNDLGFBQWEsRUFBRTtJQUNwQixJQUFJLENBQUNsQixXQUFXLEdBQUcsSUFBSTtJQUN2QixJQUFJLENBQUNDLFdBQVcsR0FBRyxJQUFJO0VBQ3pCO0VBQ0FrQixpQkFBaUJBLENBQUNDLEdBQUcsRUFBRTtJQUNyQixJQUFJLENBQUM5RCxXQUFXLENBQUM2RCxpQkFBaUIsQ0FBQ0MsR0FBRyxDQUFDO0VBQ3pDO0VBQ0FDLE9BQU9BLENBQUNDLFFBQVEsRUFBRTtJQUNoQixPQUFPLElBQUksQ0FBQ2hGLG1CQUFtQixDQUFDZ0YsUUFBUSxDQUFDO0VBQzNDO0VBQ01DLFVBQVVBLENBQUNDLE9BQU8sRUFBRWxDLFNBQVMsRUFBRUMsU0FBUyxFQUFFSSxrQkFBa0IsRUFBd0I7SUFBQSxJQUFBOEIsV0FBQSxHQUFBaEMsU0FBQTtNQUFBaUMsTUFBQTtJQUFBLE9BQUFuSCxpQkFBQTtNQUFBLElBQXRCb0gsWUFBWSxHQUFBRixXQUFBLENBQUE3QixNQUFBLFFBQUE2QixXQUFBLFFBQUE1QixTQUFBLEdBQUE0QixXQUFBLE1BQUcsS0FBSztNQUN0RixJQUFJRSxZQUFZLEVBQUU7UUFDaEIsTUFBTUQsTUFBSSxDQUFDVixPQUFPLEVBQUU7TUFDdEIsQ0FBQyxNQUFNO1FBQ0xVLE1BQUksQ0FBQ1IsYUFBYSxFQUFFO01BQ3RCO01BQ0EsTUFBTVEsTUFBSSxDQUFDckMsUUFBUSxDQUFDbUMsT0FBTyxFQUFFbEMsU0FBUyxFQUFFQyxTQUFTLEVBQUVJLGtCQUFrQixDQUFDO0lBQUM7RUFDekU7O0VBRUE7RUFDTWlDLGVBQWVBLENBQUEsRUFBRztJQUFBLElBQUFDLE1BQUE7SUFBQSxPQUFBdEgsaUJBQUE7TUFDdEIsSUFBSXVILGlCQUFpQixHQUFHLENBQUM7TUFDekIsT0FBTyxJQUFJQyxPQUFPLENBQUNDLE9BQU8sSUFBSTtRQUM1QixJQUFNQyxLQUFLLEdBQUdBLENBQUEsS0FBTTtVQUNsQkMsVUFBVSxlQUFBM0gsaUJBQUEsQ0FBQyxhQUFZO1lBQ3JCLElBQUlzSCxNQUFJLENBQUNySCxXQUFXLEVBQUUsRUFBRTtjQUN0QndILE9BQU8sRUFBRTtZQUNYLENBQUMsTUFBTTtjQUNMRixpQkFBaUIsRUFBRTtjQUNuQixLQUFLLENBQUM7Y0FDTkcsS0FBSyxFQUFFO1lBQ1Q7VUFDRixDQUFDLEdBQUUsR0FBRyxDQUFDO1FBQ1QsQ0FBQztRQUNEQSxLQUFLLEVBQUU7TUFDVCxDQUFDLENBQUM7SUFBQztFQUNMO0VBQ0F2QixZQUFZQSxDQUFBLEVBQUc7SUFDYixJQUFNeUIsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBYUMsTUFBTSxFQUFFO01BQzVDLE9BQU9DLEtBQUssQ0FBQ0MsUUFBUSxDQUFDRixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBR0UsUUFBUSxDQUFDRixNQUFNLENBQUM7SUFDdkQsQ0FBQztJQUNELElBQU1HLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0JBLENBQWFILE1BQU0sRUFBRTtNQUMzQyxPQUFPQyxLQUFLLENBQUNqRCxVQUFVLENBQUNnRCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBR2hELFVBQVUsQ0FBQ2dELE1BQU0sQ0FBQztJQUM5RCxDQUFDO0lBQ0QsSUFBSSxDQUFDbEgsU0FBUyxDQUFDbEIsZ0JBQWdCLEdBQUdtSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUNqSCxTQUFTLENBQUNsQixnQkFBZ0IsQ0FBQztJQUN0RixJQUFJLENBQUNrQixTQUFTLENBQUNuRSx5QkFBeUIsR0FBR29MLG1CQUFtQixDQUFDLElBQUksQ0FBQ2pILFNBQVMsQ0FBQ25FLHlCQUF5QixDQUFDO0lBQ3hHLElBQUksQ0FBQ21FLFNBQVMsQ0FBQ3BFLHdCQUF3QixHQUFHcUwsbUJBQW1CLENBQUMsSUFBSSxDQUFDakgsU0FBUyxDQUFDcEUsd0JBQXdCLENBQUM7SUFDdEcsSUFBSSxDQUFDb0UsU0FBUyxDQUFDcEMsdUJBQXVCLEdBQUd5SixrQkFBa0IsQ0FBQyxJQUFJLENBQUNySCxTQUFTLENBQUNwQyx1QkFBdUIsQ0FBQztFQUNyRztFQUNBaUYsaUJBQWlCQSxDQUFBLEVBQUc7SUFDbEIsSUFBTXlFLE1BQU0sR0FBRyxJQUFJO0lBQ25CLElBQUksa0JBQWtCLENBQUNDLElBQUksQ0FBQ3RKLE1BQU0sQ0FBQ3VKLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO01BQ3JFLElBQU1DLHNCQUFzQixHQUFHQyxFQUFFLElBQUk7UUFDbkMsSUFBSUEsRUFBRSxDQUFDQyxPQUFPLENBQUNuRCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQ3pCa0QsRUFBRSxDQUFDRSxjQUFjLEVBQUU7VUFDbkJGLEVBQUUsQ0FBQ0csd0JBQXdCLEVBQUU7UUFDL0I7TUFDRixDQUFDO01BQ0Q5SixNQUFNLENBQUMrSixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUVMLHNCQUFzQixFQUFFO1FBQzVETSxPQUFPLEVBQUU7TUFDWCxDQUFDLENBQUM7TUFDRmhLLE1BQU0sQ0FBQytKLGdCQUFnQixDQUFDLFdBQVcsRUFBRUwsc0JBQXNCLEVBQUU7UUFDM0RNLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztNQUNGaEssTUFBTSxDQUFDK0osZ0JBQWdCLENBQUMsVUFBVSxFQUFFTCxzQkFBc0IsRUFBRTtRQUMxRE0sT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO0lBQ0o7SUFDQWhLLE1BQU0sQ0FBQ2lLLGNBQWMsR0FBRyxZQUFZO01BQ2xDWixNQUFNLENBQUNhLFNBQVMsR0FBRyxJQUFJO01BQ3ZCYixNQUFNLENBQUN2QixPQUFPLEVBQUU7SUFDbEIsQ0FBQztJQUNELElBQU1xQyxZQUFZO01BQUEsSUFBQUMsS0FBQSxHQUFBaEosaUJBQUEsQ0FBRyxhQUFZO1FBQy9CLElBQUksQ0FBQyxDQUFDLENBQUNpSSxNQUFNLENBQUNwSCxTQUFTLEVBQUU7UUFDekIsSUFBSSxDQUFDb0gsTUFBTSxDQUFDZ0IsMEJBQTBCLEVBQUU7VUFDdENoQixNQUFNLENBQUNnQiwwQkFBMEIsR0FBRyxJQUFJO1VBQ3hDaEIsTUFBTSxDQUFDaUIsdUJBQXVCLEdBQUcsSUFBSTtVQUNyQyxLQUFLLENBQUM7VUFDTmpCLE1BQU0sQ0FBQ2dCLDBCQUEwQixHQUFHLEtBQUs7VUFDekMsTUFBTWhCLE1BQU0sQ0FBQ2pCLFVBQVUsQ0FBQ2lCLE1BQU0sQ0FBQ3BILFNBQVMsRUFBRW9ILE1BQU0sQ0FBQ3hDLFdBQVcsRUFBRXdDLE1BQU0sQ0FBQ3ZDLFdBQVcsRUFBRXVDLE1BQU0sQ0FBQ3RDLG9CQUFvQixDQUFDO1FBQ2hILENBQUMsTUFBTTtVQUNMLEtBQUssQ0FBQztRQUNSO01BQ0YsQ0FBQztNQUFBLGdCQVhLb0QsWUFBWUEsQ0FBQTtRQUFBLE9BQUFDLEtBQUEsQ0FBQUcsS0FBQSxPQUFBakUsU0FBQTtNQUFBO0lBQUEsR0FXakI7SUFDRHRHLE1BQU0sQ0FBQytKLGdCQUFnQixDQUFDLFFBQVEsZUFBQTNJLGlCQUFBLENBQUUsYUFBWTtNQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDaUksTUFBTSxDQUFDaUIsdUJBQXVCLEVBQUU7UUFDckNqQixNQUFNLENBQUNpQix1QkFBdUIsR0FBR3ZCLFVBQVUsQ0FBQ29CLFlBQVksRUFBRWQsTUFBTSxDQUFDbUIsdUJBQXVCLENBQUM7TUFDM0Y7SUFDRixDQUFDLEVBQUM7RUFDSjtFQUNBeEUsT0FBT0EsQ0FBQ3lFLEdBQUcsRUFBRTtJQUNYLElBQUksSUFBSSxDQUFDMUksU0FBUyxDQUFDakIsYUFBYSxFQUFFO01BQ2hDLEtBQUssQ0FBQztJQUNSLENBQUMsTUFBTTtNQUNMLEtBQUssQ0FBQztJQUNSO0VBQ0Y7RUFDQTRKLE9BQU9BLENBQUNDLEVBQUUsRUFBRTtJQUNWLE9BQU8sSUFBSS9CLE9BQU8sQ0FBQ0MsT0FBTyxJQUFJRSxVQUFVLENBQUNGLE9BQU8sRUFBRThCLEVBQUUsQ0FBQyxDQUFDO0VBQ3hEO0VBQ0FDLGNBQWNBLENBQUNDLElBQUksRUFBRTtJQUNuQixPQUFPLElBQUlqQyxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFbEcsQ0FBQyxLQUFLO01BQ2pDLElBQU1tSSxNQUFNLEdBQUcsSUFBSUMsVUFBVSxFQUFFO01BQy9CRCxNQUFNLENBQUNFLFNBQVMsR0FBRyxNQUFNbkMsT0FBTyxDQUFDaUMsTUFBTSxDQUFDRyxNQUFNLENBQUM7TUFDL0NILE1BQU0sQ0FBQ0ksYUFBYSxDQUFDTCxJQUFJLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0VBQ0o7RUFDQU0sY0FBY0EsQ0FBQ0MsTUFBTSxFQUFFO0lBQ3JCO0lBQ0E7SUFDQSxJQUFNQyxVQUFVLEdBQUdDLElBQUksQ0FBQ0YsTUFBTSxDQUFDRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRTdDO0lBQ0EsSUFBTUMsVUFBVSxHQUFHSixNQUFNLENBQUNHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUVuRTtJQUNBLElBQU1FLEVBQUUsR0FBRyxJQUFJQyxXQUFXLENBQUNMLFVBQVUsQ0FBQzVFLE1BQU0sQ0FBQztJQUM3QyxJQUFNa0YsRUFBRSxHQUFHLElBQUlDLFVBQVUsQ0FBQ0gsRUFBRSxDQUFDO0lBQzdCLEtBQUssSUFBSUksQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUixVQUFVLENBQUM1RSxNQUFNLEVBQUVvRixDQUFDLEVBQUUsRUFBRTtNQUMxQ0YsRUFBRSxDQUFDRSxDQUFDLENBQUMsR0FBR1IsVUFBVSxDQUFDUyxVQUFVLENBQUNELENBQUMsQ0FBQztJQUNsQztJQUNBLE9BQU8sSUFBSUUsSUFBSSxDQUFDLENBQUNOLEVBQUUsQ0FBQyxFQUFFO01BQ3BCeEcsSUFBSSxFQUFFdUc7SUFDUixDQUFDLENBQUM7RUFDSjtFQUNNUSxxQkFBcUJBLENBQUNaLE1BQU0sRUFBRWEsT0FBTyxFQUFFQyxjQUFjLEVBQUU7SUFBQSxJQUFBQyxNQUFBO0lBQUEsT0FBQS9LLGlCQUFBO01BQzNELElBQUlnSyxNQUFNLEtBQUssSUFBSSxFQUFFLE9BQU8sSUFBSTtNQUNoQyxJQUFNZ0IsUUFBUSxHQUFHRCxNQUFJLENBQUNoQixjQUFjLENBQUNDLE1BQU0sQ0FBQztNQUM1QyxJQUFNaUIsVUFBVSxTQUFTbFIsU0FBUyxDQUFDbVIsYUFBYSxDQUFDRixRQUFRLEVBQUVILE9BQU8sRUFBRUMsY0FBYyxDQUFDO01BQ25GLElBQU1LLGdCQUFnQixHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBR0osVUFBVSxDQUFDSyxJQUFJLEdBQUdOLFFBQVEsQ0FBQ00sSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLEdBQUc7TUFDeEYsS0FBSyxDQUFDO01BQ04sYUFBYVAsTUFBSSxDQUFDdkIsY0FBYyxDQUFDeUIsVUFBVSxDQUFDO0lBQUM7RUFDL0M7O0VBRUE7RUFDQU0scUJBQXFCQSxDQUFBLEVBQUc7SUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUNuSSxTQUFTLEVBQUU7TUFDckIsTUFBTSxJQUFJRCxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDekM7SUFDQSxJQUFNcUksV0FBVyxHQUFHLElBQUksQ0FBQ3pJLFdBQVcsQ0FBQzBJLGVBQWUsQ0FBQyxJQUFJLENBQUNySSxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQ3hFLElBQUksQ0FBQ3NJLGtCQUFrQixHQUFHLElBQUksQ0FBQzNJLFdBQVcsQ0FBQzRJLE9BQU8sQ0FBQ0gsV0FBVyxDQUFDO0lBQy9ELElBQUksQ0FBQ3pJLFdBQVcsQ0FBQzZJLFlBQVksQ0FBQyxJQUFJLENBQUN4SSxTQUFTLEVBQUUsSUFBSSxDQUFDc0ksa0JBQWtCLEVBQUVGLFdBQVcsQ0FBQztJQUNuRixPQUFPLElBQUksQ0FBQ0Usa0JBQWtCO0VBQ2hDO0VBQ0EzSixtQkFBbUJBLENBQUM4SixTQUFTLEVBQUU7SUFDN0IsSUFBSUMsZ0JBQWdCLEdBQUcsSUFBSTtJQUMzQixJQUFJO01BQ0YsSUFBSSxPQUFPRCxTQUFTLEtBQUssUUFBUSxFQUFFQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQ0UsUUFBUSxFQUFFO01BQ25FLElBQUlGLFNBQVMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFO01BQy9CLElBQUksT0FBT0EsU0FBUyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQ0EsU0FBUyxFQUFFO1FBQ2pELE1BQU0sSUFBSTFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztNQUN2QztNQUNBLElBQU02SSxVQUFVLEdBQUdILFNBQVM7TUFDNUIsSUFBTUwsV0FBVyxHQUFHLElBQUksQ0FBQ3pJLFdBQVcsQ0FBQzBJLGVBQWUsQ0FBQ08sVUFBVSxDQUFDLEdBQUcsQ0FBQztNQUNwRUYsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDL0ksV0FBVyxDQUFDNEksT0FBTyxDQUFDSCxXQUFXLENBQUM7TUFDeEQsSUFBSSxDQUFDekksV0FBVyxDQUFDNkksWUFBWSxDQUFDSSxVQUFVLEVBQUVGLGdCQUFnQixFQUFFTixXQUFXLENBQUM7TUFDeEUsT0FBTyxJQUFJLENBQUN6SSxXQUFXLENBQUM5QixhQUFhLENBQUM2SyxnQkFBZ0IsQ0FBQztJQUN6RCxDQUFDLFNBQVM7TUFDUixJQUFJQSxnQkFBZ0IsRUFBRTtRQUNwQixJQUFJLENBQUMvSSxXQUFXLENBQUNrSixLQUFLLENBQUNILGdCQUFnQixDQUFDO1FBQ3hDQSxnQkFBZ0IsR0FBRyxJQUFJO01BQ3pCO0lBQ0Y7RUFDRjtFQUNNSSxvQkFBb0JBLENBQUNDLFlBQVksRUFBRTtJQUFBLElBQUFDLE1BQUE7SUFBQSxPQUFBcE0saUJBQUE7TUFDdkMsSUFBSXFNLHFCQUFxQixHQUFHLEtBQUs7TUFDakMsSUFBSUMsY0FBYyxHQUFHLFdBQVc7TUFDaEMsSUFBSSxDQUFDRixNQUFJLENBQUNHLGdCQUFnQixFQUFFO1FBQzFCLE9BQU87VUFDTEYscUJBQXFCO1VBQ3JCQztRQUNGLENBQUM7TUFDSDtNQUNBLElBQUlILFlBQVksQ0FBQ0ssVUFBVSxLQUFLLENBQUMsSUFBSUwsWUFBWSxDQUFDTSxXQUFXLEtBQUssQ0FBQyxFQUFFO1FBQ25FLE1BQU1MLE1BQUksQ0FBQ2xHLGFBQWEsQ0FBQ2tHLE1BQUksQ0FBQzFRLFdBQVcsQ0FBQ3JCLFNBQVMsQ0FBQztRQUNwRCxPQUFPO1VBQ0xnUyxxQkFBcUI7VUFDckJDO1FBQ0YsQ0FBQztNQUNIO01BQ0FBLGNBQWMsR0FBR0gsWUFBWSxDQUFDSyxVQUFVLEdBQUcsR0FBRyxHQUFHTCxZQUFZLENBQUNNLFdBQVc7TUFDekUsSUFBSU4sWUFBWSxDQUFDSyxVQUFVLEtBQUssSUFBSSxJQUFJTCxZQUFZLENBQUNNLFdBQVcsS0FBSyxJQUFJLElBQUlOLFlBQVksQ0FBQ0ssVUFBVSxLQUFLLElBQUksSUFBSUwsWUFBWSxDQUFDTSxXQUFXLEtBQUssSUFBSSxFQUFFO1FBQ2xKSixxQkFBcUIsR0FBRyxJQUFJO01BQzlCLENBQUMsTUFBTSxJQUFJRixZQUFZLENBQUNLLFVBQVUsS0FBSyxJQUFJLElBQUlMLFlBQVksQ0FBQ00sV0FBVyxLQUFLLEdBQUcsSUFBSU4sWUFBWSxDQUFDSyxVQUFVLEtBQUssR0FBRyxJQUFJTCxZQUFZLENBQUNNLFdBQVcsS0FBSyxJQUFJLEVBQUU7UUFDdkpKLHFCQUFxQixHQUFHLElBQUk7TUFDOUIsQ0FBQyxNQUFNO1FBQ0xGLFlBQVksQ0FBQ08sU0FBUyxHQUFHLElBQUk7UUFDN0JMLHFCQUFxQixHQUFHLEtBQUs7TUFDL0I7TUFDQUQsTUFBSSxDQUFDTyxZQUFZLEdBQUdSLFlBQVksQ0FBQ0ssVUFBVTtNQUMzQ0osTUFBSSxDQUFDUSxhQUFhLEdBQUdULFlBQVksQ0FBQ00sV0FBVztNQUM3QyxPQUFPO1FBQ0xKLHFCQUFxQjtRQUNyQkM7TUFDRixDQUFDO0lBQUM7RUFDSjtFQUNBTyxtQkFBbUJBLENBQUM1RixPQUFPLEVBQUU7SUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQzZGLGFBQWEsQ0FBQ0MsUUFBUSxDQUFDOUYsT0FBTyxDQUFDLEVBQUUsTUFBTSxJQUFJOUQsS0FBSyxDQUFDLHNCQUFzQixDQUFDO0lBQ2xGLElBQUk7TUFDRixJQUFJNkosT0FBTyxHQUFHLENBQUM7TUFDZixJQUFJQyxlQUFlLEdBQUcsSUFBSTtNQUMxQixJQUFNbkIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDUCxxQkFBcUIsRUFBRTtNQUNyRCxRQUFRdEUsT0FBTztRQUNiO1FBQ0EsS0FBSyxRQUFRO1FBQ2IsS0FBSyxRQUFRO1FBQ2IsS0FBSyxZQUFZO1FBQ2pCLEtBQUssWUFBWTtVQUNmK0YsT0FBTyxHQUFHLElBQUksQ0FBQ2pLLFdBQVcsQ0FBQ21LLGdCQUFnQixDQUFDcEIsZ0JBQWdCLENBQUM7VUFDN0RtQixlQUFlLEdBQUdBLENBQUEsS0FBTSxJQUFJLENBQUNsSyxXQUFXLENBQUNvSyxvQkFBb0IsQ0FBQ0gsT0FBTyxDQUFDO1VBQ3RFO1FBQ0YsS0FBSyxVQUFVO1FBQ2YsS0FBSyxrQkFBa0I7UUFDdkIsS0FBSyxjQUFjO1FBQ25CLEtBQUssc0JBQXNCO1VBQ3pCQSxPQUFPLEdBQUcsSUFBSSxDQUFDakssV0FBVyxDQUFDcUssa0JBQWtCLENBQUN0QixnQkFBZ0IsQ0FBQztVQUMvRG1CLGVBQWUsR0FBR0EsQ0FBQSxLQUFNLElBQUksQ0FBQ2xLLFdBQVcsQ0FBQ3NLLHNCQUFzQixDQUFDTCxPQUFPLENBQUM7VUFDeEU7UUFDRixLQUFLLE9BQU87UUFDWixLQUFLLFlBQVk7UUFDakIsS0FBSyxXQUFXO1VBQ2RBLE9BQU8sR0FBRyxJQUFJLENBQUNqSyxXQUFXLENBQUN1SyxlQUFlLENBQUN4QixnQkFBZ0IsQ0FBQztVQUM1RG1CLGVBQWUsR0FBR0EsQ0FBQSxLQUFNLElBQUksQ0FBQ2xLLFdBQVcsQ0FBQ3dLLG1CQUFtQixDQUFDUCxPQUFPLENBQUM7VUFDckU7UUFDRixLQUFLLFFBQVE7VUFDWEEsT0FBTyxHQUFHLElBQUksQ0FBQ2pLLFdBQVcsQ0FBQ3lLLGdCQUFnQixDQUFDMUIsZ0JBQWdCLENBQUM7VUFDN0RtQixlQUFlLEdBQUdBLENBQUEsS0FBTSxJQUFJLENBQUNsSyxXQUFXLENBQUMwSyxvQkFBb0IsQ0FBQ1QsT0FBTyxDQUFDO1VBQ3RFO1FBQ0Y7VUFDRSxNQUFNLElBQUk3SixLQUFLLENBQUMseUJBQXlCLENBQUM7TUFBQztNQUUvQyxJQUFJLENBQUNKLFdBQVcsQ0FBQ2tKLEtBQUssQ0FBQ0gsZ0JBQWdCLENBQUM7TUFDeEMsSUFBSWtCLE9BQU8sS0FBSyxDQUFDLEVBQUU7UUFDakIsSUFBSSxJQUFJLENBQUNVLHlCQUF5QixLQUFLLElBQUksQ0FBQ0Msc0JBQXNCLEVBQUU7VUFDbEUsTUFBTSxJQUFJeEssS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3RDO1FBQ0EsSUFBSSxDQUFDd0ssc0JBQXNCLEVBQUU7TUFDL0I7TUFDQSxPQUFPLENBQUNYLE9BQU8sRUFBRUMsZUFBZSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxPQUFPekcsQ0FBQyxFQUFFO01BQ1Y7TUFDQSxLQUFLLENBQUM7TUFDTixLQUFLLENBQUM7TUFDTixNQUFNQSxDQUFDO0lBQ1Q7RUFDRjtFQUNBb0gsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQ0MsUUFBUSxFQUFFO01BQ2xCLElBQUksQ0FBQ0EsUUFBUSxHQUFHLElBQUksQ0FBQzlLLFdBQVcsQ0FBQzRJLE9BQU8sQ0FBQyxJQUFJLENBQUNtQyxpQkFBaUIsR0FBRyxJQUFJLENBQUNDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUNoRztJQUNBLElBQUksQ0FBQyxJQUFJLENBQUNDLGNBQWMsRUFBRTtNQUN4QixJQUFJLENBQUNBLGNBQWMsR0FBRyxJQUFJLENBQUNqTCxXQUFXLENBQUM0SSxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3REO0lBQ0EsSUFBSSxJQUFJLENBQUNoTCxTQUFTLENBQUN6RSxXQUFXLEVBQUU7TUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQytSLG1CQUFtQixFQUFFO1FBQzdCLElBQUksQ0FBQ0EsbUJBQW1CLEdBQUcsSUFBSSxDQUFDbEwsV0FBVyxDQUFDNEksT0FBTyxDQUFDLElBQUksQ0FBQztNQUMzRDtJQUNGO0lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQ2tDLFFBQVEsRUFBRSxJQUFJLENBQUNHLGNBQWMsRUFBRSxJQUFJLENBQUNDLG1CQUFtQixDQUFDO0VBQ3ZFO0VBQ01DLGdCQUFnQkEsQ0FBQ2xCLE9BQU8sRUFBRW1CLFFBQVEsRUFBRUMsT0FBTyxFQUFvQjtJQUFBLElBQUFDLFdBQUEsR0FBQW5KLFNBQUE7TUFBQW9KLE1BQUE7SUFBQSxPQUFBdE8saUJBQUE7TUFBQSxJQUFsQnVPLE9BQU8sR0FBQUYsV0FBQSxDQUFBaEosTUFBQSxRQUFBZ0osV0FBQSxRQUFBL0ksU0FBQSxHQUFBK0ksV0FBQSxNQUFHLE1BQU07TUFDakUsSUFBSTtRQUNGLElBQUlFLE9BQU8sS0FBSyxNQUFNLEVBQUU7VUFDdEJELE1BQUksQ0FBQ3ZMLFdBQVcsQ0FBQ3lMLDJCQUEyQixDQUFDeEIsT0FBTyxFQUFFbUIsUUFBUSxFQUFFQyxPQUFPLENBQUM7UUFDMUUsQ0FBQyxNQUFNLElBQUlHLE9BQU8sS0FBSyxNQUFNLEVBQUU7VUFDN0JELE1BQUksQ0FBQ3ZMLFdBQVcsQ0FBQzBMLDJCQUEyQixDQUFDekIsT0FBTyxDQUFDO1FBQ3ZEO1FBQ0EsSUFBTTBCLE9BQU8sR0FBR0osTUFBSSxDQUFDdkwsV0FBVyxDQUFDNEwsaUJBQWlCLEVBQUU7UUFDcEQsSUFBTUMsVUFBVSxHQUFHTixNQUFJLENBQUN2TCxXQUFXLENBQUM4TCxtQkFBbUIsRUFBRTtRQUN6RCxJQUFNQyxVQUFVLEdBQUcsSUFBSXRFLFVBQVUsQ0FBQzhELE1BQUksQ0FBQ3ZMLFdBQVcsQ0FBQ2dNLEtBQUssQ0FBQ0MsTUFBTSxFQUFFSixVQUFVLEVBQUVGLE9BQU8sQ0FBQztRQUNyRixJQUFNN0UsTUFBTSxHQUFHLElBQUlXLFVBQVUsQ0FBQ3NFLFVBQVUsQ0FBQztRQUN6QyxJQUFNckYsSUFBSSxHQUFHLElBQUlrQixJQUFJLENBQUMsQ0FBQ2QsTUFBTSxDQUFDLEVBQUU7VUFDOUJoRyxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7UUFDRixhQUFheUssTUFBSSxDQUFDOUUsY0FBYyxDQUFDQyxJQUFJLENBQUM7TUFDeEMsQ0FBQyxDQUFDLE9BQU9qRCxDQUFDLEVBQUU7UUFDVixLQUFLLENBQUM7UUFDTixNQUFNQSxDQUFDO01BQ1QsQ0FBQyxTQUFTO1FBQ1I4SCxNQUFJLENBQUN2TCxXQUFXLENBQUNrTSxpQkFBaUIsRUFBRTtNQUN0QztJQUFDO0VBQ0g7O0VBRUE7RUFDQUMsZUFBZUEsQ0FBQSxFQUFHO0lBQ2hCLElBQUksSUFBSSxDQUFDckIsUUFBUSxFQUFFO01BQ2pCLElBQUksQ0FBQzlLLFdBQVcsQ0FBQ2tKLEtBQUssQ0FBQyxJQUFJLENBQUM0QixRQUFRLENBQUM7TUFDckMsSUFBSSxDQUFDQSxRQUFRLEdBQUcsSUFBSTtJQUN0QjtJQUNBLElBQUksQ0FBQ3NCLHFCQUFxQixFQUFFO0lBQzVCLElBQUksQ0FBQ0MsNkJBQTZCLEVBQUU7RUFDdEM7RUFDQUQscUJBQXFCQSxDQUFBLEVBQUc7SUFDdEIsSUFBSSxJQUFJLENBQUNuQixjQUFjLEtBQUssSUFBSSxFQUFFO01BQ2hDLElBQUksQ0FBQ2pMLFdBQVcsQ0FBQ2tKLEtBQUssQ0FBQyxJQUFJLENBQUMrQixjQUFjLENBQUM7TUFDM0MsSUFBSSxDQUFDQSxjQUFjLEdBQUcsSUFBSTtJQUM1QjtFQUNGO0VBQ0FvQiw2QkFBNkJBLENBQUEsRUFBRztJQUM5QixJQUFJLElBQUksQ0FBQ25CLG1CQUFtQixLQUFLLElBQUksRUFBRTtNQUNyQyxJQUFJLENBQUNsTCxXQUFXLENBQUNrSixLQUFLLENBQUMsSUFBSSxDQUFDZ0MsbUJBQW1CLENBQUM7TUFDaEQsSUFBSSxDQUFDQSxtQkFBbUIsR0FBRyxJQUFJO0lBQ2pDO0VBQ0Y7O0VBRUE7RUFDQW9CLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQ25CLElBQUksSUFBSSxDQUFDQyxXQUFXLEtBQUssSUFBSSxFQUFFO01BQzdCLElBQUksQ0FBQ3ZNLFdBQVcsQ0FBQ2tKLEtBQUssQ0FBQyxJQUFJLENBQUNxRCxXQUFXLENBQUM7TUFDeEMsSUFBSSxDQUFDQSxXQUFXLEdBQUcsSUFBSTtJQUN6QjtFQUNGOztFQUVBO0VBQ0FDLHlCQUF5QkEsQ0FBQSxFQUFHO0lBQzFCLElBQUksSUFBSSxDQUFDN0Qsa0JBQWtCLEVBQUU7TUFDM0IsSUFBSSxDQUFDM0ksV0FBVyxDQUFDa0osS0FBSyxDQUFDLElBQUksQ0FBQ1Asa0JBQWtCLENBQUM7TUFDL0MsSUFBSSxDQUFDQSxrQkFBa0IsR0FBRyxJQUFJO0lBQ2hDO0VBQ0Y7O0VBRUE7RUFDQThELHVCQUF1QkEsQ0FBQSxFQUFHO0lBQ3hCLElBQUksSUFBSSxDQUFDQyx3QkFBd0IsRUFBRTtNQUNqQyxJQUFJLENBQUNBLHdCQUF3QixFQUFFO01BQy9CLElBQUksQ0FBQ0Esd0JBQXdCLEdBQUcsSUFBSTtJQUN0QztFQUNGO0VBQ01DLDZCQUE2QkEsQ0FBQ3ZELFlBQVksRUFBRTtJQUFBLElBQUF3RCxNQUFBO0lBQUEsT0FBQTNQLGlCQUFBO01BQ2hELElBQU07UUFDSnFNLHFCQUFxQjtRQUNyQkM7TUFDRixDQUFDLFNBQVNxRCxNQUFJLENBQUN6RCxvQkFBb0IsQ0FBQ0MsWUFBWSxDQUFDO01BQ2pELElBQUksQ0FBQ0UscUJBQXFCLEVBQUU7UUFDMUIsSUFBSUMsY0FBYyxLQUFLLFdBQVcsRUFBRTtVQUNsQyxLQUFLLENBQUM7UUFDUjtNQUNGO01BQ0EsT0FBT0QscUJBQXFCO0lBQUM7RUFDL0I7RUFDQXVELG1CQUFtQkEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUNqUCxTQUFTLENBQUMxQixjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHO0VBQzFEO0VBQ0E0USxlQUFlQSxDQUFBLEVBQUc7SUFDaEIsT0FBTyxJQUFJLENBQUNsUCxTQUFTLENBQUN6QixVQUFVO0VBQ2xDO0VBQ000USxvQkFBb0JBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFBQSxPQUFBL1AsaUJBQUE7TUFDM0IsSUFBSSxDQUFDK1AsT0FBSSxDQUFDeEQsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO01BQ3JELElBQUksQ0FBQ3lELGdCQUFnQixFQUFFQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUNGLE9BQUksQ0FBQ2pDLGlCQUFpQixFQUFFaUMsT0FBSSxDQUFDaEMsa0JBQWtCLENBQUM7TUFDNUYsSUFBTTtRQUNKbUMsS0FBSztRQUNMQyxNQUFNO1FBQ05DO01BQ0YsQ0FBQyxHQUFHNVcsUUFBUSxDQUFDdUgsY0FBYyxFQUFFOztNQUU3QjtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTs7TUFFQSxJQUFJc1AsVUFBVSxHQUFHRixNQUFNO01BQ3ZCLElBQUlHLGNBQWMsR0FBR0osS0FBSyxDQUFDMUQsVUFBVTtNQUNyQyxJQUFJK0QsZUFBZSxHQUFHTCxLQUFLLENBQUN6RCxXQUFXO01BQ3ZDLElBQUkrRCxvQkFBb0IsR0FBR04sS0FBSyxDQUFDTyxXQUFXO01BQzVDLElBQUlDLHFCQUFxQixHQUFHUixLQUFLLENBQUNTLFlBQVk7TUFDOUMsSUFBSUMsc0JBQXNCLEdBQUdiLE9BQUksQ0FBQ2Msb0JBQW9CO01BQ3RELElBQUlDLHVCQUF1QixHQUFHZixPQUFJLENBQUNnQixxQkFBcUI7TUFDeEQsSUFBSUMsb0JBQW9CLEdBQUdqQixPQUFJLENBQUN6TCxrQkFBa0I7TUFDbEQsSUFBTTJNLFdBQVcsR0FBR2xCLE9BQUksQ0FBQ2xQLFNBQVMsS0FBSyxZQUFZO01BQ25ELElBQUlrUCxPQUFJLENBQUNtQixrQkFBa0IsRUFBRTtRQUMzQixDQUFDTixzQkFBc0IsRUFBRUUsdUJBQXVCLENBQUMsR0FBRyxDQUFDQSx1QkFBdUIsRUFBRUYsc0JBQXNCLENBQUM7UUFDckcsQ0FBQ1osZ0JBQWdCLEVBQUVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQ0EsZ0JBQWdCLEVBQUVELGdCQUFnQixDQUFDO1FBQzNFSyxVQUFVLEdBQUdELGNBQWM7UUFDM0JZLG9CQUFvQixHQUFHakIsT0FBSSxDQUFDekwsa0JBQWtCLEtBQUssVUFBVSxHQUFHLFdBQVcsR0FBRyxVQUFVO01BQzFGO01BQ0EsSUFBSTZNLGFBQWEsR0FBRyxLQUFLO01BQ3pCLElBQUlDLGNBQWMsR0FBRyxLQUFLO01BQzFCLElBQUlyQixPQUFJLENBQUMzTCxlQUFlLEtBQUssVUFBVSxFQUFFO1FBQ3ZDLElBQUk0TSxvQkFBb0IsS0FBS2pCLE9BQUksQ0FBQzNMLGVBQWUsRUFBRTtVQUNqRDtVQUNBK00sYUFBYSxHQUFHYixjQUFjO1VBQzlCYyxjQUFjLEdBQUdiLGVBQWU7UUFDbEMsQ0FBQyxNQUFNO1VBQ0w7VUFDQWEsY0FBYyxHQUFHYixlQUFlO1FBQ2xDO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBSVMsb0JBQW9CLEtBQUtqQixPQUFJLENBQUMzTCxlQUFlLEVBQUU7VUFDakQ7VUFDQWdOLGNBQWMsR0FBR2IsZUFBZTtRQUNsQyxDQUFDLE1BQU07VUFDTDtVQUNBWSxhQUFhLEdBQUdiLGNBQWM7VUFDOUJjLGNBQWMsR0FBR2IsZUFBZTtRQUNsQztNQUNGO01BQ0EsSUFBSWMsRUFBRSxFQUFFQyxFQUFFO01BQ1YsSUFBTUMsS0FBSyxHQUFHakIsY0FBYyxHQUFHRSxvQkFBb0I7TUFDbkQsSUFBTWdCLE1BQU0sR0FBR3BHLElBQUksQ0FBQ3FHLEdBQUcsQ0FBQ3JHLElBQUksQ0FBQ0MsS0FBSyxDQUFDdUYsc0JBQXNCLEdBQUdXLEtBQUssQ0FBQyxFQUFFSixhQUFhLENBQUM7TUFDbEYsSUFBTU8sT0FBTyxHQUFHdEcsSUFBSSxDQUFDcUcsR0FBRyxDQUFDckcsSUFBSSxDQUFDQyxLQUFLLENBQUN5Rix1QkFBdUIsR0FBR1MsS0FBSyxDQUFDLEVBQUVILGNBQWMsQ0FBQztNQUNyRkMsRUFBRSxHQUFHakcsSUFBSSxDQUFDdUcsR0FBRyxDQUFDdkcsSUFBSSxDQUFDQyxLQUFLLENBQUMsQ0FBQ21GLG9CQUFvQixHQUFHSSxzQkFBc0IsSUFBSSxDQUFDLEdBQUdXLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUN6RkQsRUFBRSxHQUFHbEcsSUFBSSxDQUFDdUcsR0FBRyxDQUFDdkcsSUFBSSxDQUFDQyxLQUFLLENBQUMsQ0FBQ3FGLHFCQUFxQixHQUFHSSx1QkFBdUIsSUFBSSxDQUFDLEdBQUdTLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUMzRixJQUFJTixXQUFXLEVBQUU7UUFDZixDQUFDakIsZ0JBQWdCLEVBQUVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQ0EsZ0JBQWdCLEVBQUVELGdCQUFnQixDQUFDO01BQzdFO01BQ0FLLFVBQVUsQ0FBQ3VCLFlBQVksQ0FBQyxPQUFPLEVBQUU1QixnQkFBZ0IsQ0FBQztNQUNsREssVUFBVSxDQUFDdUIsWUFBWSxDQUFDLFFBQVEsRUFBRTNCLGdCQUFnQixDQUFDO01BQ25ELElBQU00QixXQUFXLEdBQUd4QixVQUFVLENBQUN5QixVQUFVLENBQUMsSUFBSSxFQUFFO1FBQzlDQyxrQkFBa0IsRUFBRTtNQUN0QixDQUFDLENBQUM7TUFDRkYsV0FBVyxDQUFDRyxTQUFTLENBQUM5QixLQUFLLEVBQUVtQixFQUFFLEVBQUVDLEVBQUUsRUFBRUUsTUFBTSxFQUFFRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTFCLGdCQUFnQixFQUFFQyxnQkFBZ0IsQ0FBQztNQUMvRixJQUFJZ0MsT0FBTyxFQUFFQyxVQUFVO01BQ3ZCRCxPQUFPLEdBQUdKLFdBQVcsQ0FBQ00sWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUVuQyxnQkFBZ0IsRUFBRUMsZ0JBQWdCLENBQUM7TUFDNUVpQyxVQUFVLEdBQUc3QixVQUFVLENBQUMrQixTQUFTLENBQUMsWUFBWSxDQUFDO01BQy9DLElBQUluQixXQUFXLEVBQUU7UUFDZixDQUFDZ0IsT0FBTyxFQUFFQyxVQUFVLENBQUMsU0FBU25DLE9BQUksQ0FBQ3NDLFFBQVEsQ0FBQ0osT0FBTyxFQUFFQyxVQUFVLEVBQUUsR0FBRyxDQUFDO01BQ3ZFO01BQ0EsSUFBSW5DLE9BQUksQ0FBQ21CLGtCQUFrQixFQUFFO1FBQzNCLGFBQWFuQixPQUFJLENBQUNzQyxRQUFRLENBQUNKLE9BQU8sRUFBRUMsVUFBVSxFQUFFbkMsT0FBSSxDQUFDSCxtQkFBbUIsRUFBRSxDQUFDO01BQzdFLENBQUMsTUFBTTtRQUNMLE9BQU8sQ0FBQ3FDLE9BQU8sRUFBRUMsVUFBVSxDQUFDO01BQzlCO0lBQUM7RUFDSDtFQUNNRyxRQUFRQSxDQUFDSixPQUFPLEVBQUVDLFVBQVUsRUFBRUksTUFBTSxFQUFFO0lBQUEsT0FBQXRTLGlCQUFBO01BQzFDLE9BQU8sSUFBSXdILE9BQU8sQ0FBQ0MsT0FBTyxJQUFJO1FBQzVCLElBQUk2SyxNQUFNLEtBQUssQ0FBQyxFQUFFO1VBQ2hCN0ssT0FBTyxDQUFDLENBQUN3SyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDO1FBQ0EsSUFBTUssR0FBRyxHQUFHLElBQUlDLEtBQUssRUFBRTtRQUN2QixJQUFNQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNuREosR0FBRyxDQUFDSyxHQUFHLEdBQUdWLFVBQVU7UUFDcEJLLEdBQUcsQ0FBQzVKLGdCQUFnQixDQUFDLE1BQU0sZUFBQTNJLGlCQUFBLENBQUUsYUFBWTtVQUN2QztVQUNBLElBQU02UyxXQUFXLEdBQUdKLFVBQVUsQ0FBQ1gsVUFBVSxDQUFDLElBQUksQ0FBQztVQUMvQ1csVUFBVSxDQUFDcFYsS0FBSyxDQUFDeVYsUUFBUSxHQUFHLFVBQVU7VUFDdEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQy9GLFFBQVEsQ0FBQ3VGLE1BQU0sQ0FBQyxFQUFFO1lBQzlCRyxVQUFVLENBQUN0VixLQUFLLEdBQUdvVixHQUFHLENBQUNRLE1BQU07WUFDN0JOLFVBQVUsQ0FBQ00sTUFBTSxHQUFHUixHQUFHLENBQUNwVixLQUFLO1VBQy9CLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDNFAsUUFBUSxDQUFDdUYsTUFBTSxDQUFDLEVBQUU7WUFDcENHLFVBQVUsQ0FBQ3RWLEtBQUssR0FBR29WLEdBQUcsQ0FBQ3BWLEtBQUs7WUFDNUJzVixVQUFVLENBQUNNLE1BQU0sR0FBR1IsR0FBRyxDQUFDUSxNQUFNO1VBQ2hDO1VBQ0EsSUFBSVQsTUFBTSxLQUFLLEVBQUUsRUFBRU8sV0FBVyxDQUFDRyxTQUFTLENBQUNULEdBQUcsQ0FBQ1EsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSVQsTUFBTSxLQUFLLEdBQUcsRUFBRU8sV0FBVyxDQUFDRyxTQUFTLENBQUNULEdBQUcsQ0FBQ3BWLEtBQUssRUFBRW9WLEdBQUcsQ0FBQ1EsTUFBTSxDQUFDLENBQUMsS0FBSyxJQUFJVCxNQUFNLEtBQUssR0FBRyxFQUFFTyxXQUFXLENBQUNHLFNBQVMsQ0FBQyxDQUFDLEVBQUVULEdBQUcsQ0FBQ3BWLEtBQUssQ0FBQztVQUMxTDBWLFdBQVcsQ0FBQ0ksTUFBTSxDQUFDWCxNQUFNLEdBQUdsSCxJQUFJLENBQUM4SCxFQUFFLEdBQUcsR0FBRyxDQUFDO1VBQzFDTCxXQUFXLENBQUNiLFNBQVMsQ0FBQ08sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7VUFDaEMsSUFBTVksWUFBWSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDcEcsUUFBUSxDQUFDdUYsTUFBTSxDQUFDLEdBQUdPLFdBQVcsQ0FBQ1YsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUVJLEdBQUcsQ0FBQ1EsTUFBTSxFQUFFUixHQUFHLENBQUNwVixLQUFLLENBQUMsR0FBRzBWLFdBQVcsQ0FBQ1YsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUVJLEdBQUcsQ0FBQ3BWLEtBQUssRUFBRW9WLEdBQUcsQ0FBQ1EsTUFBTSxDQUFDO1VBQy9KdEwsT0FBTyxDQUFDLENBQUMwTCxZQUFZLEVBQUVWLFVBQVUsQ0FBQ0wsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7VUFDM0RTLFdBQVcsQ0FBQ08sT0FBTyxFQUFFO1FBQ3ZCLENBQUMsRUFBQztNQUNKLENBQUMsQ0FBQztJQUFDO0VBQ0w7RUFDTUMsbUJBQW1CQSxDQUFDckcsT0FBTyxFQUFnQztJQUFBLElBQUFzRyxXQUFBLEdBQUFwTyxTQUFBO01BQUFxTyxPQUFBO0lBQUEsT0FBQXZULGlCQUFBO01BQUEsSUFBOUJ3VCxPQUFPLEdBQUFGLFdBQUEsQ0FBQWpPLE1BQUEsUUFBQWlPLFdBQUEsUUFBQWhPLFNBQUEsR0FBQWdPLFdBQUEsTUFBRyxDQUFDO01BQUEsSUFBRUcsUUFBUSxHQUFBSCxXQUFBLENBQUFqTyxNQUFBLFFBQUFpTyxXQUFBLFFBQUFoTyxTQUFBLEdBQUFnTyxXQUFBLE1BQUcsSUFBSTtNQUM3RCxJQUFJLENBQUN0RyxPQUFPLElBQUlBLE9BQU8sR0FBRyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7TUFDdEI7TUFDQSxJQUFJO1FBQ0YsSUFBSWlGLE9BQU87UUFDWCxJQUFJQyxVQUFVLEdBQUcsSUFBSTtRQUNyQixJQUFNLENBQUNsRCxNQUFNLENBQUMsR0FBR3VFLE9BQUksQ0FBQzNGLFdBQVcsRUFBRTtRQUNuQyxJQUFJNkYsUUFBUSxLQUFLLElBQUksRUFBRTtVQUNyQnhCLE9BQU8sR0FBR3dCLFFBQVE7UUFDcEIsQ0FBQyxNQUFNO1VBQ0wsQ0FBQ3hCLE9BQU8sRUFBRUMsVUFBVSxDQUFDLFNBQVNxQixPQUFJLENBQUN6RCxvQkFBb0IsRUFBRTtRQUMzRDtRQUNBLElBQUksQ0FBQyxDQUFDLENBQUNtQyxPQUFPLEVBQUU7VUFDZCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUN0QjtRQUNBc0IsT0FBSSxDQUFDeFEsV0FBVyxDQUFDZ00sS0FBSyxDQUFDMkUsR0FBRyxDQUFDekIsT0FBTyxDQUFDelAsSUFBSSxFQUFFd00sTUFBTSxDQUFDO1FBQ2hELElBQUkyRSxHQUFHLEdBQUcsS0FBSztVQUNiQyxLQUFLLEdBQUcsS0FBSztVQUNiQyxRQUFRLEdBQUcsS0FBSztRQUNsQixRQUFRTixPQUFJLENBQUMxUyxTQUFTO1VBQ3BCLEtBQUssUUFBUTtVQUNiLEtBQUssUUFBUTtVQUNiLEtBQUssWUFBWTtVQUNqQixLQUFLLFlBQVk7WUFDZjhTLEdBQUcsR0FBRyxJQUFJO1lBQ1Y7VUFDRixLQUFLLFVBQVU7VUFDZixLQUFLLGNBQWM7VUFDbkIsS0FBSyxrQkFBa0I7VUFDdkIsS0FBSyxzQkFBc0I7WUFDekJFLFFBQVEsR0FBRyxJQUFJO1lBQ2Y7VUFDRixLQUFLLE9BQU87VUFDWixLQUFLLFlBQVk7VUFDakIsS0FBSyxXQUFXO1lBQ2RELEtBQUssR0FBRyxJQUFJO1lBQ1o7VUFDRixLQUFLLFFBQVE7WUFDWDtZQUNBO1VBQ0Y7WUFDRSxNQUFNLElBQUl6USxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFBQztRQUU1QyxJQUFJMEcsTUFBTSxHQUFHLElBQUk7UUFDakIsSUFBSThKLEdBQUcsSUFBSUUsUUFBUSxJQUFJRCxLQUFLLEVBQUU7VUFDNUIvSixNQUFNLEdBQUcwSixPQUFJLENBQUN4USxXQUFXLENBQUMrUSxpQkFBaUIsQ0FBQzlFLE1BQU0sRUFBRXVFLE9BQUksQ0FBQ3pGLGlCQUFpQixFQUFFeUYsT0FBSSxDQUFDeEYsa0JBQWtCLEVBQUVmLE9BQU8sRUFBRTJHLEdBQUcsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLENBQUM7UUFDckksQ0FBQyxNQUFNO1VBQ0xoSyxNQUFNLEdBQUcwSixPQUFJLENBQUN4USxXQUFXLENBQUNnUixhQUFhLENBQUMvRSxNQUFNLEVBQUV1RSxPQUFJLENBQUN6RixpQkFBaUIsRUFBRXlGLE9BQUksQ0FBQ3hGLGtCQUFrQixFQUFFZixPQUFPLEVBQUV3RyxPQUFPLENBQUM7UUFDcEg7O1FBRUE7UUFDQSxPQUFPLENBQUMsQ0FBQyxDQUFDM0osTUFBTSxFQUFFb0ksT0FBTyxFQUFFQyxVQUFVLENBQUM7TUFDeEMsQ0FBQyxDQUFDLE9BQU8xTCxDQUFDLEVBQUU7UUFDVixJQUFNd04sT0FBTyxHQUFHLHlCQUF5QixHQUFHeE4sQ0FBQztRQUM3QyxJQUFJQSxDQUFDLENBQUN1RixRQUFRLEVBQUUsQ0FBQ2dCLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtVQUNuQyxLQUFLLENBQUM7UUFDUixDQUFDLE1BQU07VUFDTCxLQUFLLENBQUM7VUFDTixNQUFNdkcsQ0FBQztRQUNUO01BQ0Y7SUFBQztFQUNIO0VBQ015TixrQkFBa0JBLENBQUNqSCxPQUFPLEVBQUUvRixPQUFPLEVBQUVpTixPQUFPLEVBQUVDLG1CQUFtQixFQUFFbEMsT0FBTyxFQUFFQyxVQUFVLEVBQUU7SUFBQSxJQUFBa0MsT0FBQTtJQUFBLE9BQUFwVSxpQkFBQTtNQUM1RixJQUFJO1FBQ0YsSUFBSWdOLE9BQU8sS0FBSyxJQUFJLEVBQUU7VUFDcEIsT0FBTyxFQUFFO1FBQ1gsQ0FBQyxNQUFNLElBQUlBLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtVQUN6QixPQUFPLHNCQUFzQjtRQUMvQjtRQUNBLElBQUluQixTQUFTLEdBQUcsSUFBSTtRQUNwQixJQUFJLENBQUN1SSxPQUFJLENBQUN0SCxhQUFhLENBQUNDLFFBQVEsQ0FBQzlGLE9BQU8sQ0FBQyxFQUFFLE1BQU0sSUFBSTlELEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUNsRixJQUFNLEdBQUdrUixZQUFZLENBQUMsR0FBR0QsT0FBSSxDQUFDeEcsV0FBVyxFQUFFO1FBQzNDLElBQU0wRyxXQUFXO1VBQUEsSUFBQUMsS0FBQSxHQUFBdlUsaUJBQUEsQ0FBRyxXQUFNbVUsbUJBQW1CLEVBQUk7WUFBQSxJQUFBSyxVQUFBLEVBQUFDLFdBQUE7WUFDL0MsSUFBSU4sbUJBQW1CLEVBQUU7Y0FDdkIsTUFBTUMsT0FBSSxDQUFDZixtQkFBbUIsQ0FBQ3JHLE9BQU8sRUFBRSxDQUFDLEVBQUVpRixPQUFPLENBQUM7WUFDckQ7WUFDQSxRQUFRaEwsT0FBTztjQUNiLEtBQUssUUFBUTtjQUNiLEtBQUssUUFBUTtjQUNiLEtBQUssWUFBWTtjQUNqQixLQUFLLFlBQVk7Z0JBQ2Y0RSxTQUFTLEdBQUd1SSxPQUFJLENBQUNyUixXQUFXLENBQUMyUixVQUFVLENBQUMxSCxPQUFPLEVBQUVxSCxZQUFZLENBQUM7Z0JBQzlEO2NBQ0YsS0FBSyxVQUFVO2NBQ2YsS0FBSyxrQkFBa0I7Y0FDdkIsS0FBSyxjQUFjO2NBQ25CLEtBQUssc0JBQXNCO2dCQUN6QnhJLFNBQVMsR0FBR3VJLE9BQUksQ0FBQ3JSLFdBQVcsQ0FBQzRSLFlBQVksQ0FBQzNILE9BQU8sRUFBRXFILFlBQVksQ0FBQztnQkFDaEU7Y0FDRixLQUFLLE9BQU87Y0FDWixLQUFLLFdBQVc7Z0JBQ2R4SSxTQUFTLEdBQUd1SSxPQUFJLENBQUNyUixXQUFXLENBQUM2UixTQUFTLENBQUM1SCxPQUFPLEVBQUVxSCxZQUFZLENBQUM7Z0JBQzdEO2NBQ0YsS0FBSyxZQUFZO2dCQUNmeEksU0FBUyxHQUFHdUksT0FBSSxDQUFDclIsV0FBVyxDQUFDOFIsYUFBYSxDQUFDN0gsT0FBTyxFQUFFcUgsWUFBWSxDQUFDO2dCQUNqRTtjQUNGLEtBQUssUUFBUTtnQkFDWHhJLFNBQVMsR0FBR3VJLE9BQUksQ0FBQ3JSLFdBQVcsQ0FBQytSLFVBQVUsQ0FBQzlILE9BQU8sRUFBRXFILFlBQVksQ0FBQztnQkFDOUQ7Y0FDRjtnQkFDRSxNQUFNLElBQUlsUixLQUFLLENBQUMseUJBQXlCLENBQUM7WUFBQzs7WUFHL0M7WUFDQSxJQUFJOEQsT0FBTyxLQUFLLFFBQVEsRUFBRTtjQUN4QixJQUFJNEUsU0FBUyxLQUFLLElBQUksSUFBSUEsU0FBUyxLQUFLLEVBQUUsSUFBSUEsU0FBUyxLQUFLLE9BQU8sSUFBSUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDL0YsT0FBTyxLQUFLO2NBQ2QsQ0FBQyxNQUFNO2dCQUNMLE9BQU8sSUFBSTtjQUNiO1lBQ0Y7WUFDQUEsU0FBUyxHQUFHdUksT0FBSSxDQUFDVyxhQUFhLENBQUNsSixTQUFTLENBQUM7WUFDekMsSUFBSSxFQUFBMkksVUFBQSxHQUFBM0ksU0FBUyxjQUFBMkksVUFBQSx1QkFBVEEsVUFBQSxDQUFXUSxRQUFRLE1BQUssV0FBVyxJQUFJLEVBQUFQLFdBQUEsR0FBQTVJLFNBQVMsY0FBQTRJLFdBQUEsdUJBQVRBLFdBQUEsQ0FBV08sUUFBUSxNQUFLLE1BQU0sRUFBRTtjQUN6RSxPQUFPLElBQUk7WUFDYixDQUFDLE1BQU07Y0FDTCxJQUFJYixtQkFBbUIsRUFBRTtnQkFDdkIsSUFBSUMsT0FBSSxDQUFDYSxxQkFBcUIsR0FBR2IsT0FBSSxDQUFDYyx3QkFBd0IsRUFBRTtrQkFDOUQ7a0JBQ0E7a0JBQ0EsSUFBTUMsUUFBUSxHQUFHZixPQUFJLENBQUNhLHFCQUFxQixHQUFHYixPQUFJLENBQUNnQixtQkFBbUIsQ0FBQy9QLE1BQU07a0JBQzdFNE0sT0FBTyxHQUFHbUMsT0FBSSxDQUFDZ0IsbUJBQW1CLENBQUNELFFBQVEsQ0FBQztrQkFDNUNmLE9BQUksQ0FBQ2EscUJBQXFCLEVBQUU7a0JBQzVCLGFBQWFYLFdBQVcsQ0FBQ0gsbUJBQW1CLENBQUM7Z0JBQy9DLENBQUMsTUFBTTtrQkFDTDtrQkFDQUMsT0FBSSxDQUFDYSxxQkFBcUIsR0FBRyxDQUFDO2tCQUM5QmIsT0FBSSxDQUFDeE4saUJBQWlCLENBQUMsS0FBSyxDQUFDO2tCQUM3QndOLE9BQUksQ0FBQ2lCLG1CQUFtQixFQUFFLENBQUMsQ0FBQztrQkFDNUIsTUFBTWpCLE9BQUksQ0FBQ2xPLGFBQWEsQ0FBQ2tPLE9BQUksQ0FBQzFZLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFLEtBQUssRUFBRXdYLFVBQVUsQ0FBQztrQkFDbkZrQyxPQUFJLENBQUNrQixVQUFVLENBQUM5YixRQUFRLENBQUN1SCxjQUFjLEVBQUUsQ0FBQ21QLEtBQUssRUFBRTtvQkFDL0NsUCxPQUFPLEVBQUU7a0JBQ1gsQ0FBQyxDQUFDO2tCQUNGLE9BQU8sS0FBSztnQkFDZDtjQUNGLENBQUMsTUFBTTtnQkFDTCxPQUFPLEtBQUs7Y0FDZDtZQUNGO1VBQ0YsQ0FBQztVQUFBLGdCQWxFS3NULFdBQVdBLENBQUFpQixFQUFBO1lBQUEsT0FBQWhCLEtBQUEsQ0FBQXBMLEtBQUEsT0FBQWpFLFNBQUE7VUFBQTtRQUFBLEdBa0VoQjtRQUNEOztRQUVBLFVBQVVvUCxXQUFXLENBQUNILG1CQUFtQixDQUFDLEVBQUU7VUFDMUMsSUFBTXZULFlBQVksR0FBR3FHLE9BQU8sS0FBSyxRQUFRO1VBQ3pDLElBQUl1TyxlQUFlO1VBQ25CLElBQUk1VSxZQUFZLEVBQUU7WUFDaEI0VSxlQUFlLEdBQUdwQixPQUFJLENBQUNxQixZQUFZLENBQUNyYSxRQUFRO1VBQzlDLENBQUMsTUFBTSxJQUFJZ1osT0FBSSxDQUFDelQsU0FBUyxDQUFDdkUsZ0JBQWdCLEVBQUU7WUFDMUNvWixlQUFlLEdBQUdwQixPQUFJLENBQUNxQixZQUFZLENBQUNyYSxRQUFRO1VBQzlDLENBQUMsTUFBTSxJQUFJZ1osT0FBSSxDQUFDelQsU0FBUyxDQUFDdEUsZUFBZSxFQUFFO1lBQ3pDbVosZUFBZSxHQUFHcEIsT0FBSSxDQUFDcUIsWUFBWSxDQUFDdGEsT0FBTztVQUM3QyxDQUFDLE1BQU07WUFDTHFhLGVBQWUsR0FBR3BCLE9BQUksQ0FBQ3FCLFlBQVksQ0FBQ3JiLElBQUk7VUFDMUM7VUFDQSxJQUFJc2IsV0FBVyxTQUFTdEIsT0FBSSxDQUFDbEcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUVvSCxPQUFJLENBQUN1QixpQkFBaUIsQ0FBQ3RhLEtBQUssRUFBRW1hLGVBQWUsQ0FBQztVQUNyRyxJQUFJSSxTQUFTLEdBQUcsSUFBSTtVQUNwQixJQUFJQyxTQUFTLEdBQUcsSUFBSTtVQUNwQixJQUFJQyxhQUFhO1VBQ2pCLElBQUksQ0FBQ2xWLFlBQVksRUFBRTtZQUNqQixJQUFJd1QsT0FBSSxDQUFDelQsU0FBUyxDQUFDdkUsZ0JBQWdCLEVBQUU7Y0FDbkMwWixhQUFhLEdBQUcxQixPQUFJLENBQUNxQixZQUFZLENBQUNyYSxRQUFRO1lBQzVDLENBQUMsTUFBTTtjQUNMMGEsYUFBYSxHQUFHMUIsT0FBSSxDQUFDcUIsWUFBWSxDQUFDdGEsT0FBTztZQUMzQztZQUNBeWEsU0FBUyxTQUFTeEIsT0FBSSxDQUFDbEcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUVvSCxPQUFJLENBQUN1QixpQkFBaUIsQ0FBQ3JhLElBQUksRUFBRXdhLGFBQWEsQ0FBQztZQUM1RkYsU0FBUyxHQUFHQSxTQUFTLEtBQUssT0FBTyxHQUFHLElBQUksR0FBR0EsU0FBUztZQUNwREMsU0FBUyxHQUFHekIsT0FBSSxDQUFDelQsU0FBUyxDQUFDeEUsWUFBWSxTQUFTaVksT0FBSSxDQUFDbEcsZ0JBQWdCLENBQUNsQixPQUFPLEVBQUUsSUFBSSxFQUFFd0ksZUFBZSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUk7VUFDdEg7VUFDQSxJQUFJdEIsT0FBTyxFQUFFO1lBQ1gsTUFBTUUsT0FBSSxDQUFDbE8sYUFBYSxDQUFDa08sT0FBSSxDQUFDMVksV0FBVyxDQUFDZCx1QkFBdUIsRUFBRSxLQUFLLEVBQUVnYixTQUFTLENBQUM7VUFDdEYsQ0FBQyxNQUFNO1lBQ0wsTUFBTXhCLE9BQUksQ0FBQ2xPLGFBQWEsQ0FBQ2tPLE9BQUksQ0FBQzFZLFdBQVcsQ0FBQ2YsY0FBYyxDQUFDO1VBQzNEOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQSxPQUFPLENBQUNrUixTQUFTLEVBQUU2SixXQUFXLEVBQUVFLFNBQVMsRUFBRUMsU0FBUyxDQUFDO1FBQ3ZELENBQUMsTUFBTTtVQUNMLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDbEM7TUFDRixDQUFDLENBQUMsT0FBT3JQLENBQUMsRUFBRTtRQUNWLEtBQUssQ0FBQztRQUNOLE1BQU1BLENBQUM7TUFDVDtJQUFDO0VBQ0g7RUFDQXVQLFlBQVlBLENBQUM5TyxPQUFPLEVBQUUrRixPQUFPLEVBQUU7SUFDN0IsT0FBTyxJQUFJeEYsT0FBTyxDQUFDLENBQUNDLE9BQU8sRUFBRXVPLE1BQU0sS0FBSztNQUN0QyxJQUFNLEdBQUczQixZQUFZLENBQUMsR0FBRyxJQUFJLENBQUN6RyxXQUFXLEVBQUU7TUFDM0MsSUFBSTNHLE9BQU8sQ0FBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNoQztRQUNBO1FBQ0FtQyxVQUFVLENBQUMsTUFBTTtVQUNmRixPQUFPLENBQUMsSUFBSSxDQUFDMUUsV0FBVyxDQUFDa1QsU0FBUyxDQUFDakosT0FBTyxFQUFFcUgsWUFBWSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNULENBQUMsTUFBTTtRQUNMMkIsTUFBTSxDQUFDLElBQUk3UyxLQUFLLENBQUMsOENBQThDLEdBQUc4RCxPQUFPLENBQUMsQ0FBQztNQUM3RTtJQUNGLENBQUMsQ0FBQztFQUNKO0VBQ0E4TixhQUFhQSxDQUFDbUIsR0FBRyxFQUFFO0lBQ2pCLElBQUlDLEtBQUssR0FBR0QsR0FBRyxDQUFDL0wsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMxQixJQUFJaU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLEtBQUssSUFBSTNMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzBMLEtBQUssQ0FBQzlRLE1BQU0sRUFBRW9GLENBQUMsRUFBRSxFQUFFO01BQ3JDLElBQUk0TCxJQUFJLEdBQUdGLEtBQUssQ0FBQzFMLENBQUMsQ0FBQyxDQUFDTixLQUFLLENBQUMsR0FBRyxDQUFDO01BQzlCLElBQUlrTSxJQUFJLENBQUNoUixNQUFNLEtBQUssQ0FBQyxFQUFFK1EsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0EsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQztJQUNBLE9BQU9ELEdBQUc7RUFDWjtFQUNBRSxhQUFhQSxDQUFDdEosT0FBTyxFQUFFO0lBQ3JCLElBQUlBLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxFQUFFO0lBQ1gsQ0FBQyxNQUFNLElBQUlBLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtNQUN6QixPQUFPLHNCQUFzQjtJQUMvQjtJQUNBLElBQU0sSUFBSXVKLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDM0ksV0FBVyxFQUFFO0lBQ2pELElBQUkvRCxNQUFNLEdBQUcsSUFBSTtJQUNqQkEsTUFBTSxHQUFHLElBQUksQ0FBQzlHLFdBQVcsQ0FBQ3lULFdBQVcsQ0FBQ3hKLE9BQU8sRUFBRXVKLGlCQUFpQixDQUFDO0lBQ2pFLElBQUkxTSxNQUFNLElBQUksSUFBSSxJQUFJQSxNQUFNLEtBQUssRUFBRSxFQUFFO01BQ25DLEtBQUssQ0FBQztJQUNSOztJQUVBOztJQUVBLE9BQU9BLE1BQU0sS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQ2tMLGFBQWEsQ0FBQ2xMLE1BQU0sQ0FBQztFQUM1RDtFQUNNNE0saUJBQWlCQSxDQUFDeFAsT0FBTyxFQUFFK0YsT0FBTyxFQUFFaUYsT0FBTyxFQUFFO0lBQUEsSUFBQXlFLE9BQUE7SUFBQSxPQUFBMVcsaUJBQUE7TUFDakQsTUFBTTBXLE9BQUksQ0FBQ3JELG1CQUFtQixDQUFDckcsT0FBTyxFQUFFLENBQUMsRUFBRWlGLE9BQU8sQ0FBQztNQUNuRDtNQUNBLGFBQWF5RSxPQUFJLENBQUNYLFlBQVksQ0FBQzlPLE9BQU8sRUFBRStGLE9BQU8sQ0FBQztJQUFDO0VBQ25EO0VBQ0EySixpQ0FBaUNBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFDbEMsSUFBSSxDQUFDQyxtQ0FBbUMsRUFBRTtJQUMxQyxJQUFJLENBQUNDLDhCQUE4QixHQUFHblAsVUFBVSxlQUFBM0gsaUJBQUEsQ0FBQyxhQUFZO01BQzNEO01BQ0EsTUFBTTRXLE9BQUksQ0FBQ0cseUJBQXlCLEVBQUU7SUFDeEMsQ0FBQyxHQUFFLElBQUksQ0FBQ3BXLFNBQVMsQ0FBQ3hCLGtDQUFrQyxDQUFDO0VBQ3ZEO0VBQ000WCx5QkFBeUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFBQSxPQUFBaFgsaUJBQUE7TUFDaEMsSUFBSTtRQUNGZ1gsT0FBSSxDQUFDSCxtQ0FBbUMsRUFBRTtRQUMxQyxJQUFNSSxVQUFVLEdBQUdELE9BQUksQ0FBQ25XLFNBQVMsQ0FBQ2tNLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdEQsTUFBTWlLLE9BQUksQ0FBQ0UsWUFBWSxDQUFDRCxVQUFVLENBQUM7UUFDbkMsSUFBTTtVQUNKL0c7UUFDRixDQUFDLEdBQUcxVyxRQUFRLENBQUN1SCxjQUFjLEVBQUU7UUFDN0IsSUFBSW1QLEtBQUssRUFBRTtVQUNUO1VBQ0E7VUFDQTtVQUNBLElBQUksV0FBVyxJQUFJQSxLQUFLLEVBQUU7WUFDeEJBLEtBQUssQ0FBQ3hELFNBQVMsR0FBR3NLLE9BQUksQ0FBQ0csUUFBUTtVQUNqQyxDQUFDLE1BQU07WUFDTDtZQUNBakgsS0FBSyxDQUFDMEMsR0FBRyxHQUFHaFUsTUFBTSxDQUFDd1ksR0FBRyxDQUFDQyxlQUFlLENBQUNMLE9BQUksQ0FBQ0csUUFBUSxDQUFDO1VBQ3ZEO1VBQ0FqSCxLQUFLLENBQUN2SCxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNO1lBQzdDO1lBQ0F1SCxLQUFLLENBQUNvSCxJQUFJLEVBQUU7VUFDZCxDQUFDLENBQUM7VUFDRnBILEtBQUssQ0FBQ3ZILGdCQUFnQixDQUFDLFNBQVMsZUFBQTNJLGlCQUFBLENBQUUsYUFBWTtZQUM1QyxLQUFLLENBQUM7O1lBRU47WUFDQWdYLE9BQUksQ0FBQzFTLGtCQUFrQixHQUFHNEwsS0FBSyxDQUFDMUQsVUFBVSxHQUFHMEQsS0FBSyxDQUFDekQsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsV0FBVztZQUM3RixLQUFLLENBQUM7WUFDTixLQUFLLENBQUM7WUFDTixLQUFLLENBQUM7WUFDTnVLLE9BQUksQ0FBQ3pLLGdCQUFnQixHQUFHLElBQUk7WUFDNUIsTUFBTXlLLE9BQUksQ0FBQ08sYUFBYSxFQUFFO1VBQzVCLENBQUMsRUFBQztVQUNGLE1BQU1QLE9BQUksQ0FBQzlRLGFBQWEsQ0FBQzhRLE9BQUksQ0FBQ3RiLFdBQVcsQ0FBQ3BCLEtBQUssQ0FBQztVQUNoRDRWLEtBQUssQ0FBQ3NILG9CQUFvQixFQUFFO1FBQzlCLENBQUMsTUFBTTtVQUNMLE1BQU1SLE9BQUksQ0FBQzlRLGFBQWEsQ0FBQzhRLE9BQUksQ0FBQ3RiLFdBQVcsQ0FBQ3JCLFNBQVMsQ0FBQztVQUNwRDJjLE9BQUksQ0FBQ3JRLGFBQWEsRUFBRTtRQUN0QjtNQUNGLENBQUMsQ0FBQyxPQUFPSCxDQUFDLEVBQUU7UUFDVixLQUFLLENBQUM7UUFDTixJQUFJQSxDQUFDLENBQUNpUixJQUFJLEtBQUssaUJBQWlCLEVBQUU7VUFDaEMsSUFBTUMsWUFBWSxHQUFHLHlDQUF5QztVQUM5RCxLQUFLLENBQUM7VUFDTixLQUFLLENBQUM7VUFDTlYsT0FBSSxDQUFDVyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUVuUixDQUFDLEVBQUVrUixZQUFZLENBQUM7UUFDbEQsQ0FBQyxNQUFNLElBQUlsUixDQUFDLENBQUNpUixJQUFJLEtBQUssa0JBQWtCLEVBQUU7VUFDeEM7VUFDQSxNQUFNVCxPQUFJLENBQUM5USxhQUFhLENBQUM4USxPQUFJLENBQUN0YixXQUFXLENBQUNyQixTQUFTLENBQUM7VUFDcEQyYyxPQUFJLENBQUNZLFVBQVUsRUFBRTtVQUNqQixJQUFJWixPQUFJLENBQUNyVyxTQUFTLENBQUN2QiwrQkFBK0IsR0FBRyxDQUFDLEVBQUU7WUFDdEQ7WUFDQTRYLE9BQUksQ0FBQ2EsMEJBQTBCLElBQUksQ0FBQztZQUNwQ2IsT0FBSSxDQUFDTCxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7VUFDNUMsQ0FBQyxNQUFNO1lBQ0wsSUFBSUssT0FBSSxDQUFDclcsU0FBUyxDQUFDdkIsK0JBQStCLEdBQUc0WCxPQUFJLENBQUNhLDBCQUEwQixFQUFFO2NBQ3BGYixPQUFJLENBQUNhLDBCQUEwQixJQUFJLENBQUM7Y0FDcENiLE9BQUksQ0FBQ0wsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsTUFBTTtjQUNMLElBQU1lLGFBQVksR0FBRywwRUFBMEU7Y0FDL0ZWLE9BQUksQ0FBQ1csa0JBQWtCLENBQUMsTUFBTSxFQUFFblIsQ0FBQyxFQUFFa1IsYUFBWSxDQUFDO1lBQ2xEO1VBQ0Y7UUFDRixDQUFDLE1BQU0sSUFBSWxSLENBQUMsQ0FBQ2lSLElBQUksS0FBSyxlQUFlLEVBQUU7VUFDckM7VUFDQSxJQUFNQyxjQUFZLEdBQUcsa0JBQWtCO1VBQ3ZDLEtBQUssQ0FBQztVQUNOLEtBQUssQ0FBQztVQUNOVixPQUFJLENBQUNXLGtCQUFrQixDQUFDLE1BQU0sRUFBRW5SLENBQUMsRUFBRWtSLGNBQVksQ0FBQztRQUNsRCxDQUFDLE1BQU07VUFDTCxJQUFNQSxjQUFZLEdBQUcsdUJBQXVCO1VBQzVDLEtBQUssQ0FBQztVQUNOLEtBQUssQ0FBQztVQUNOVixPQUFJLENBQUNXLGtCQUFrQixDQUFDLE1BQU0sRUFBRW5SLENBQUMsRUFBRWtSLGNBQVksQ0FBQztRQUNsRDtNQUNGO0lBQUM7RUFDSDtFQUNBcEMsVUFBVUEsQ0FBQ3dDLEVBQUUsRUFBRXphLEtBQUssRUFBRTtJQUNwQixJQUFJeWEsRUFBRSxJQUFJemEsS0FBSyxFQUFFO01BQ2YxQixNQUFNLENBQUNvYyxNQUFNLENBQUNELEVBQUUsQ0FBQ3phLEtBQUssRUFBRUEsS0FBSyxDQUFDO0lBQ2hDO0VBQ0Y7RUFDQTJhLGlCQUFpQkEsQ0FBQ25SLEdBQUcsRUFBRTtJQUNyQixRQUFRQSxHQUFHO01BQ1Q7TUFDQSxLQUFLLElBQUksQ0FBQ25MLFdBQVcsQ0FBQ3JCLFNBQVM7UUFDN0IsSUFBSSxDQUFDNGQsV0FBVyxHQUFHLElBQUksQ0FBQ3pjLFVBQVUsQ0FBQ25CLFNBQVM7UUFDNUM7TUFDRixLQUFLLElBQUksQ0FBQ3FCLFdBQVcsQ0FBQ3BCLEtBQUs7UUFDekIsSUFBSSxDQUFDMmQsV0FBVyxHQUFHLElBQUksQ0FBQ3pjLFVBQVUsQ0FBQ2xCLEtBQUs7UUFDeEM7TUFDRixLQUFLLElBQUksQ0FBQ29CLFdBQVcsQ0FBQ2YsY0FBYztNQUNwQyxLQUFLLElBQUksQ0FBQ2UsV0FBVyxDQUFDZCx1QkFBdUI7UUFDM0MsSUFBSSxDQUFDcWQsV0FBVyxHQUFHLElBQUksQ0FBQ3pjLFVBQVUsQ0FBQ1gsV0FBVztRQUM5QztNQUNGLEtBQUssSUFBSSxDQUFDYSxXQUFXLENBQUNiLFdBQVc7TUFDakMsS0FBSyxJQUFJLENBQUNhLFdBQVcsQ0FBQ1osb0JBQW9CO01BQzFDLEtBQUssSUFBSSxDQUFDWSxXQUFXLENBQUNYLFVBQVU7UUFDOUIsSUFBSSxDQUFDa2QsV0FBVyxHQUFHLElBQUksQ0FBQ3pjLFVBQVUsQ0FBQ1IsSUFBSTtRQUN2QztJQUFNO0VBRVo7RUFDTWtMLGFBQWFBLENBQUNXLEdBQUcsRUFBK0M7SUFBQSxJQUFBcVIsV0FBQSxHQUFBaFQsU0FBQTtNQUFBaVQsT0FBQTtJQUFBLE9BQUFuWSxpQkFBQTtNQUFBLElBQTdDb1ksV0FBVyxHQUFBRixXQUFBLENBQUE3UyxNQUFBLFFBQUE2UyxXQUFBLFFBQUE1UyxTQUFBLEdBQUE0UyxXQUFBLE1BQUcsS0FBSztNQUFBLElBQUVHLGVBQWUsR0FBQUgsV0FBQSxDQUFBN1MsTUFBQSxRQUFBNlMsV0FBQSxRQUFBNVMsU0FBQSxHQUFBNFMsV0FBQSxNQUFHLElBQUk7TUFDbEUsSUFBSUMsT0FBSSxDQUFDRyx3QkFBd0IsS0FBS3pSLEdBQUcsSUFBSXVSLFdBQVcsS0FBSyxLQUFLLEVBQUU7UUFDbEU7TUFDRjtNQUNBRCxPQUFJLENBQUNILGlCQUFpQixDQUFDblIsR0FBRyxDQUFDO01BQzNCc1IsT0FBSSxDQUFDRyx3QkFBd0IsR0FBR3pSLEdBQUc7TUFDbkNzUixPQUFJLENBQUNJLGdCQUFnQixHQUFHMVIsR0FBRztNQUMzQixJQUFNO1FBQ0oyUixRQUFRO1FBQ1JDLFdBQVc7UUFDWEM7TUFDRixDQUFDLEdBQUdsZixRQUFRLENBQUN1SCxjQUFjLEVBQUU7TUFDN0IsSUFBTTFELEtBQUssR0FBRztRQUNac2IsV0FBVyxFQUFFUixPQUFJLENBQUN4WCxTQUFTLENBQUN6RCxnQkFBZ0IsQ0FBQ0MsS0FBSyxHQUFHLElBQUk7UUFDekR5YixXQUFXLEVBQUVULE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQ3pELGdCQUFnQixDQUFDRyxLQUFLO1FBQ2xEd2IsWUFBWSxFQUFFVixPQUFJLENBQUN4WCxTQUFTLENBQUN6RCxnQkFBZ0IsQ0FBQ0UsTUFBTSxHQUFHLElBQUk7UUFDM0QwYixXQUFXLEVBQUVYLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQ3pELGdCQUFnQixDQUFDMkosR0FBRztNQUNsRCxDQUFDO01BQ0QsSUFBSTJSLFFBQVEsRUFBRTtRQUNaTCxPQUFJLENBQUM3QyxVQUFVLENBQUNrRCxRQUFRLEVBQUVuYixLQUFLLENBQUM7TUFDbEM7TUFDQSxJQUFJOGEsT0FBSSxDQUFDeFgsU0FBUyxDQUFDMUMsdUJBQXVCLEVBQUU7UUFDMUMsSUFBSSxDQUFDLENBQUNrYSxPQUFJLENBQUN4WCxTQUFTLENBQUMvRSxhQUFhLEVBQUU7VUFDbEMsS0FBSyxDQUFDO1FBQ1IsQ0FBQyxNQUFNO1VBQUEsSUFBQW1kLHFCQUFBO1VBQ0xOLFdBQVcsYUFBWEEsV0FBVyx3QkFBQU0scUJBQUEsR0FBWE4sV0FBVyxDQUFFTyxhQUFhLENBQUMsZUFBZSxDQUFDLGNBQUFELHFCQUFBLHVCQUEzQ0EscUJBQUEsQ0FBNkNuSCxZQUFZLENBQUMsTUFBTSxFQUFFdUcsT0FBSSxDQUFDeFgsU0FBUyxDQUFDekMsY0FBYyxDQUFDMkksR0FBRyxDQUFDLENBQUM7UUFDdkc7TUFDRjtNQUNBLElBQUlzUixPQUFJLENBQUN4WCxTQUFTLENBQUMzRCxZQUFZLEVBQUU7UUFBQSxJQUFBaWMscUJBQUE7UUFDL0JQLGFBQWEsYUFBYkEsYUFBYSx3QkFBQU8scUJBQUEsR0FBYlAsYUFBYSxDQUFFTSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsY0FBQUMscUJBQUEsdUJBQTlDQSxxQkFBQSxDQUFnRHJILFlBQVksQ0FBQyxNQUFNLEVBQUV1RyxPQUFJLENBQUN4WCxTQUFTLENBQUNsQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztNQUN2SDtNQUNBLElBQU15YSxPQUFPLEdBQUdmLE9BQUksQ0FBQzFULHNCQUFzQixHQUFHLFFBQVEsR0FBRyxNQUFNO01BQy9ELElBQUkwVCxPQUFJLENBQUN4UyxvQkFBb0IsRUFBRTtRQUM3QixJQUFJd1MsT0FBSSxDQUFDeFgsU0FBUyxDQUFDbEUsUUFBUSxJQUFJMGIsT0FBSSxDQUFDeFgsU0FBUyxDQUFDakUsZUFBZSxFQUFFO1VBQzdEeWIsT0FBSSxDQUFDeFMsb0JBQW9CLENBQUN3VCxJQUFJLENBQUNoQixPQUFJLEVBQUVlLE9BQU8sRUFBRWYsT0FBSSxDQUFDdFgsU0FBUyxFQUFFc1gsT0FBSSxDQUFDSSxnQkFBZ0IsRUFBRUosT0FBSSxDQUFDdlMsT0FBTyxFQUFFLEtBQUssRUFBRXVTLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQ2pFLGVBQWUsRUFBRXliLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQzNELFlBQVksRUFBRW1iLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQzVELFlBQVksRUFBRXNiLGVBQWUsQ0FBQztRQUN0TjtRQUNBLElBQUlGLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQ2hFLFdBQVcsSUFBSXdiLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQy9ELGtCQUFrQixFQUFFO1VBQ25FdWIsT0FBSSxDQUFDeFMsb0JBQW9CLENBQUN3VCxJQUFJLENBQUNoQixPQUFJLEVBQUVlLE9BQU8sRUFBRWYsT0FBSSxDQUFDdFgsU0FBUyxFQUFFc1gsT0FBSSxDQUFDSSxnQkFBZ0IsRUFBRUosT0FBSSxDQUFDclMsVUFBVSxFQUFFLFFBQVEsRUFBRXFTLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQy9ELGtCQUFrQixFQUFFdWIsT0FBSSxDQUFDeFgsU0FBUyxDQUFDM0QsWUFBWSxFQUFFbWIsT0FBSSxDQUFDeFgsU0FBUyxDQUFDNUQsWUFBWSxFQUFFc2IsZUFBZSxDQUFDO1FBQy9OO1FBQ0EsSUFBSUYsT0FBSSxDQUFDeFgsU0FBUyxDQUFDOUQsV0FBVyxJQUFJc2IsT0FBSSxDQUFDeFgsU0FBUyxDQUFDN0Qsa0JBQWtCLEVBQUU7VUFDbkVxYixPQUFJLENBQUN4UyxvQkFBb0IsQ0FBQ3dULElBQUksQ0FBQ2hCLE9BQUksRUFBRWUsT0FBTyxFQUFFZixPQUFJLENBQUN0WCxTQUFTLEVBQUVzWCxPQUFJLENBQUNJLGdCQUFnQixFQUFFSixPQUFJLENBQUNuUyxVQUFVLEVBQUUsUUFBUSxFQUFFbVMsT0FBSSxDQUFDeFgsU0FBUyxDQUFDN0Qsa0JBQWtCLEVBQUVxYixPQUFJLENBQUN4WCxTQUFTLENBQUMzRCxZQUFZLEVBQUVtYixPQUFJLENBQUN4WCxTQUFTLENBQUM1RCxZQUFZLEVBQUVzYixlQUFlLENBQUM7UUFDL047TUFDRjtNQUNBLElBQUl4UixHQUFHLEtBQUtzUixPQUFJLENBQUN6YyxXQUFXLENBQUNqQixzQkFBc0IsSUFBSW9NLEdBQUcsS0FBS3NSLE9BQUksQ0FBQ3pjLFdBQVcsQ0FBQ2hCLHFCQUFxQixFQUFFO1FBQ3JHLElBQUl5ZCxPQUFJLENBQUN4WCxTQUFTLENBQUM1RCxZQUFZLEVBQUU7VUFDL0JvYixPQUFJLENBQUNpQixpQkFBaUIsQ0FBQ2YsZUFBZSxDQUFDOztVQUV2QztVQUNBLElBQUl4UixHQUFHLEtBQUtzUixPQUFJLENBQUN6YyxXQUFXLENBQUNoQixxQkFBcUIsRUFBRTtZQUNsRGlOLFVBQVUsQ0FBQ3dRLE9BQUksQ0FBQ2tCLGVBQWUsRUFBRSxJQUFJLEVBQUVsQixPQUFJLENBQUM7VUFDOUM7UUFDRjtNQUNGO01BQ0EsSUFBSXRSLEdBQUcsS0FBS3NSLE9BQUksQ0FBQ3pjLFdBQVcsQ0FBQ2QsdUJBQXVCLEVBQUU7UUFDcEQsSUFBTTtVQUNKc1Y7UUFDRixDQUFDLEdBQUcxVyxRQUFRLENBQUN1SCxjQUFjLEVBQUU7UUFDN0JvWCxPQUFJLENBQUM3QyxVQUFVLENBQUNwRixLQUFLLEVBQUU7VUFDckJsUCxPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJbVgsT0FBSSxDQUFDeFgsU0FBUyxDQUFDNUQsWUFBWSxFQUFFO1VBQy9Cb2IsT0FBSSxDQUFDaUIsaUJBQWlCLENBQUNmLGVBQWUsQ0FBQztRQUN6QztNQUNGO01BQ0EsSUFBSXhSLEdBQUcsS0FBS3NSLE9BQUksQ0FBQ3pjLFdBQVcsQ0FBQ1osb0JBQW9CLEVBQUU7UUFDakQsSUFBSXFkLE9BQUksQ0FBQ3hYLFNBQVMsQ0FBQzVELFlBQVksRUFBRTtVQUMvQm9iLE9BQUksQ0FBQ2tCLGVBQWUsRUFBRTtRQUN4QjtNQUNGO01BQ0EsTUFBTWxCLE9BQUksQ0FBQzdPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUE7RUFDekI7O0VBRUE4UCxpQkFBaUJBLENBQUNmLGVBQWUsRUFBRTtJQUNqQyxJQUFNO01BQ0ppQixhQUFhO01BQ2JDO0lBQ0YsQ0FBQyxHQUFHL2YsUUFBUSxDQUFDdUgsY0FBYyxFQUFFO0lBQzdCd1ksWUFBWSxDQUFDM0csR0FBRyxHQUFHeUYsZUFBZTtJQUNsQyxJQUFNbUIsUUFBUSxHQUFHO01BQ2YsV0FBVyxFQUFFLEtBQUs7TUFDbEIsWUFBWSxFQUFFO0lBQ2hCLENBQUM7SUFDRCxJQUFJLENBQUNsRSxVQUFVLENBQUNpRSxZQUFZLEVBQUVDLFFBQVEsQ0FBQztJQUN2QyxJQUFJLENBQUNsRSxVQUFVLENBQUNnRSxhQUFhLEVBQUU7TUFDN0J0WSxPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7RUFDSjtFQUNBcVksZUFBZUEsQ0FBQ0ksT0FBTyxFQUFFO0lBQ3ZCLElBQUl4UixNQUFNLEdBQUcsSUFBSTtJQUNqQixJQUFJd1IsT0FBTyxFQUFFO01BQ1h4UixNQUFNLEdBQUd3UixPQUFPO0lBQ2xCO0lBQ0EsSUFBTTtNQUNKdkosS0FBSztNQUNMb0osYUFBYTtNQUNiQztJQUNGLENBQUMsR0FBRy9mLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRTtJQUM3QmtILE1BQU0sQ0FBQ3FOLFVBQVUsQ0FBQ3BGLEtBQUssRUFBRTtNQUN2QmxQLE9BQU8sRUFBRTtJQUNYLENBQUMsQ0FBQztJQUNGaUgsTUFBTSxDQUFDcU4sVUFBVSxDQUFDZ0UsYUFBYSxFQUFFO01BQy9CdFksT0FBTyxFQUFFO0lBQ1gsQ0FBQyxDQUFDO0lBQ0Z1WSxZQUFZLENBQUMzRyxHQUFHLEdBQUcsRUFBRTtFQUN2QjtFQUNNOEcsaUJBQWlCQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQUEsT0FBQTNaLGlCQUFBO01BQ3hCO01BQ0EsSUFBSSxDQUFDbUksU0FBUyxDQUFDeVIsWUFBWSxFQUFFO1FBQzNCLE1BQU0sSUFBSXpXLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQztNQUM1RDtNQUNBLElBQU0wVyxPQUFPLFNBQVMxUixTQUFTLENBQUN5UixZQUFZLENBQUNFLGdCQUFnQixFQUFFO01BQy9ELElBQUlDLE1BQU0sR0FBRyxFQUFFO01BQ2YsS0FBSyxJQUFNQyxNQUFNLElBQUlILE9BQU8sRUFBRTtRQUM1QixJQUFJRyxNQUFNLENBQUNDLElBQUksS0FBSyxZQUFZLEVBQUU7VUFDaEMsSUFBSTtZQUNGLElBQUlELE1BQU0sWUFBWUUsZUFBZSxFQUFFO2NBQ3JDLElBQUlGLE1BQU0sQ0FBQ0csZUFBZSxFQUFFO2dCQUFBLElBQUFDLGVBQUE7Z0JBQzFCLElBQU1DLEdBQUcsR0FBR0wsTUFBTSxDQUFDRyxlQUFlLEVBQUU7Z0JBQ3BDLElBQUlFLEdBQUcsYUFBSEEsR0FBRyxnQkFBQUQsZUFBQSxHQUFIQyxHQUFHLENBQUVDLFVBQVUsY0FBQUYsZUFBQSxlQUFmQSxlQUFBLENBQWlCck4sUUFBUSxDQUFDNE0sT0FBSSxDQUFDWSxzQkFBc0IsQ0FBQyxFQUFFO2tCQUFBLElBQUFDLGFBQUE7a0JBQzFELElBQU1DLGdCQUFnQixHQUFHLGFBQWE7a0JBQ3RDLElBQUlBLGdCQUFnQixDQUFDdlMsSUFBSSxFQUFBc1MsYUFBQSxHQUFDUixNQUFNLENBQUNVLEtBQUssY0FBQUYsYUFBQSx1QkFBWkEsYUFBQSxDQUFjblMsV0FBVyxFQUFFLENBQUMsRUFBRTtrQkFDeEQwUixNQUFNLENBQUNZLElBQUksQ0FBQ04sR0FBRyxDQUFDTyxRQUFRLENBQUM7Z0JBQzNCO2NBQ0Y7WUFDRjtVQUNGLENBQUMsQ0FBQyxPQUFPcFUsQ0FBQyxFQUFFO1lBQ1Y7WUFDQTtZQUNBO1lBQ0EsSUFBSUEsQ0FBQyxZQUFZcVUsY0FBYyxFQUFFO2NBQUEsSUFBQUMsY0FBQTtjQUMvQixJQUFNQyxlQUFlLEdBQUcsVUFBVTtjQUNsQyxJQUFJLENBQUFELGNBQUEsR0FBQWQsTUFBTSxDQUFDVSxLQUFLLGNBQUFJLGNBQUEsZUFBWkEsY0FBQSxDQUFjelYsTUFBTSxJQUFJMFYsZUFBZSxDQUFDN1MsSUFBSSxDQUFDOFIsTUFBTSxDQUFDVSxLQUFLLENBQUMsRUFBRTtnQkFDOURYLE1BQU0sQ0FBQ1ksSUFBSSxDQUFDWCxNQUFNLENBQUNZLFFBQVEsQ0FBQztjQUM5QjtZQUNGO1VBQ0Y7UUFDRjtNQUNGO01BQ0FqQixPQUFJLENBQUMvVSxPQUFPLGFBQUFvVyxNQUFBLENBQWFqQixNQUFNLHdCQUFBaUIsTUFBQSxDQUFxQmpCLE1BQU0sQ0FBQzFVLE1BQU0sRUFBRztNQUNwRSxPQUFPMFUsTUFBTTtJQUFDO0VBQ2hCO0VBQ0FrQixrQkFBa0JBLENBQUEsRUFBRztJQUNuQixJQUFNQyxPQUFPLEdBQUcxaEIsUUFBUSxDQUFDMkssZ0JBQWdCLENBQUMzSyxRQUFRLENBQUN1SCxjQUFjLEVBQUUsQ0FBQ29hLEdBQUcsQ0FBQztJQUN4RSxJQUFJQyxTQUFTLEdBQUcsS0FBSztJQUNyQixJQUFJRixPQUFPLEtBQUssSUFBSSxDQUFDRyxtQkFBbUIsRUFBRTtNQUN4QyxJQUFJLENBQUNqWCxlQUFlLEdBQUc4VyxPQUFPO01BQzlCLElBQUksQ0FBQ0csbUJBQW1CLEdBQUdILE9BQU87TUFDbENFLFNBQVMsR0FBRyxJQUFJO0lBQ2xCO0lBQ0EsT0FBTztNQUNMRixPQUFPO01BQ1BFO0lBQ0YsQ0FBQztFQUNIO0VBQ0FFLGVBQWVBLENBQUNsRixHQUFHLEVBQUU7SUFDbkJBLEdBQUcsQ0FBQ21GLFNBQVMsR0FBRyxFQUFFO0lBQ2xCbkYsR0FBRyxDQUFDb0YsZUFBZSxDQUFDLE9BQU8sQ0FBQztJQUM1QnBGLEdBQUcsQ0FBQ29GLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDNUIsSUFBSSxDQUFDbEcsVUFBVSxDQUFDYyxHQUFHLEVBQUU7TUFDbkJwVixPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7RUFDSjtFQUNNb0Ysa0JBQWtCQSxDQUFBLEVBQUc7SUFBQSxJQUFBcVYsT0FBQTtJQUFBLE9BQUF6YixpQkFBQTtNQUN6QixJQUFJO1FBQ0ZtYixHQUFHO1FBQ0hqTCxLQUFLO1FBQ0xDLE1BQU07UUFDTkMsY0FBYztRQUNkb0ksUUFBUTtRQUNSa0QsU0FBUztRQUNUQyxZQUFZO1FBQ1psRCxXQUFXO1FBQ1htRCxvQkFBb0I7UUFDcEJDLFlBQVk7UUFDWmhXLEtBQUs7UUFDTEUsUUFBUTtRQUNSRSxRQUFRO1FBQ1I2VixhQUFhO1FBQ2JDLFNBQVM7UUFDVHJELGFBQWE7UUFDYlksYUFBYTtRQUNiMEMsU0FBUztRQUNUekMsWUFBWTtRQUNaMEMsWUFBWTtRQUNaQyxRQUFRO1FBQ1JwYixnQkFBZ0I7UUFDaEJxYjtNQUNGLENBQUMsR0FBRzNpQixRQUFRLENBQUN1SCxjQUFjLEVBQUU7TUFDN0IsSUFBSSxDQUFDb2EsR0FBRyxFQUFFLE1BQU0sSUFBSWhZLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztNQUN6RCxJQUFJdVksU0FBUyxFQUFFQSxTQUFTLENBQUNVLE1BQU0sRUFBRTtNQUNqQyxJQUFJVCxZQUFZLEVBQUVBLFlBQVksQ0FBQ1MsTUFBTSxFQUFFO01BQ3ZDLElBQUlsTSxLQUFLLEVBQUVBLEtBQUssQ0FBQ2tNLE1BQU0sRUFBRTtNQUN6QixJQUFJak0sTUFBTSxFQUFFQSxNQUFNLENBQUNpTSxNQUFNLEVBQUU7TUFDM0IsSUFBSWhNLGNBQWMsRUFBRUEsY0FBYyxDQUFDZ00sTUFBTSxFQUFFO01BQzNDLElBQUk1RCxRQUFRLEVBQUVBLFFBQVEsQ0FBQzRELE1BQU0sRUFBRTtNQUMvQixJQUFJM0QsV0FBVyxFQUFFQSxXQUFXLENBQUMyRCxNQUFNLEVBQUU7TUFDckMsSUFBSVIsb0JBQW9CLEVBQUVBLG9CQUFvQixDQUFDUSxNQUFNLEVBQUU7TUFDdkQsSUFBSVAsWUFBWSxFQUFFQSxZQUFZLENBQUNPLE1BQU0sRUFBRTtNQUN2QztNQUNBLElBQUl2VyxLQUFLLElBQUksQ0FBQzRWLE9BQUksQ0FBQzlhLFNBQVMsQ0FBQ2xFLFFBQVEsRUFBRWdmLE9BQUksQ0FBQ0gsZUFBZSxDQUFDelYsS0FBSyxDQUFDO01BQ2xFLElBQUlFLFFBQVEsSUFBSSxDQUFDMFYsT0FBSSxDQUFDOWEsU0FBUyxDQUFDaEUsV0FBVyxFQUFFOGUsT0FBSSxDQUFDSCxlQUFlLENBQUN2VixRQUFRLENBQUM7TUFDM0UsSUFBSUUsUUFBUSxJQUFJLENBQUN3VixPQUFJLENBQUM5YSxTQUFTLENBQUM5RCxXQUFXLEVBQUU0ZSxPQUFJLENBQUNILGVBQWUsQ0FBQ3JWLFFBQVEsQ0FBQztNQUMzRSxJQUFJNlYsYUFBYSxFQUFFQSxhQUFhLENBQUNNLE1BQU0sRUFBRTtNQUN6QztNQUNBLElBQUlMLFNBQVMsSUFBSSxDQUFDTixPQUFJLENBQUM5YSxTQUFTLENBQUMzRCxZQUFZLEVBQUV5ZSxPQUFJLENBQUNILGVBQWUsQ0FBQ1MsU0FBUyxDQUFDO01BQzlFLElBQUl6QyxhQUFhLEVBQUVBLGFBQWEsQ0FBQzhDLE1BQU0sRUFBRTtNQUN6QztNQUNBLElBQUlKLFNBQVMsSUFBSSxDQUFDUCxPQUFJLENBQUM5YSxTQUFTLENBQUM1RCxZQUFZLEVBQUUwZSxPQUFJLENBQUNILGVBQWUsQ0FBQ1UsU0FBUyxDQUFDO01BQzlFLElBQUlDLFlBQVksRUFBRUEsWUFBWSxDQUFDRyxNQUFNLEVBQUU7TUFDdkM7TUFDQSxJQUFJRixRQUFRLElBQUksQ0FBQ1QsT0FBSSxDQUFDOWEsU0FBUyxDQUFDckMsMkJBQTJCLEVBQUVtZCxPQUFJLENBQUNILGVBQWUsQ0FBQ1ksUUFBUSxDQUFDO01BQzNGLElBQUlwYixnQkFBZ0IsRUFBRUEsZ0JBQWdCLENBQUNzYixNQUFNLEVBQUU7TUFDL0MsSUFBTW5kLGNBQWMsR0FBR3djLE9BQUksQ0FBQzdMLG1CQUFtQixFQUFFO01BQ2pENkwsT0FBSSxDQUFDdkssa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUNuRSxRQUFRLENBQUM5TixjQUFjLENBQUM7TUFDNUQsSUFBSW9kLFFBQVEsR0FBRztRQUNibGYsS0FBSyxFQUFFLE1BQU07UUFDYjRWLE1BQU0sRUFBRTtNQUNWLENBQUM7TUFDRDBJLE9BQUksQ0FBQ25HLFVBQVUsQ0FBQzZGLEdBQUcsRUFBRWtCLFFBQVEsQ0FBQztNQUM5QixJQUFNQyxTQUFTLEdBQUc7UUFDaEJ4SixRQUFRLEVBQUUsVUFBVTtRQUNwQjlSLE9BQU8sRUFBRSxNQUFNO1FBQ2Y7UUFDQSxhQUFhLEVBQUUsUUFBUTtRQUN2QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCN0QsS0FBSyxFQUFFLE1BQU07UUFDYjRWLE1BQU0sRUFBRSxNQUFNO1FBQ2R3SixNQUFNLEVBQUUsUUFBUTtRQUNoQkMsUUFBUSxFQUFFO01BQ1osQ0FBQztNQUNEZCxTQUFTLEdBQUdoSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDekMrSSxTQUFTLENBQUM5SixZQUFZLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQztNQUNwRCxJQUFJOEosU0FBUyxFQUFFO1FBQ2IsT0FBT0EsU0FBUyxDQUFDZSxVQUFVLEVBQUU7VUFDM0JmLFNBQVMsQ0FBQ2dCLFdBQVcsQ0FBQ2hCLFNBQVMsQ0FBQ2lCLFNBQVMsQ0FBQztRQUM1QztRQUNBbEIsT0FBSSxDQUFDbkcsVUFBVSxDQUFDb0csU0FBUyxFQUFFWSxTQUFTLENBQUM7TUFDdkM7TUFDQW5CLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ2xCLFNBQVMsQ0FBQztNQUMxQmpELFdBQVcsR0FBRy9GLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMzQzhGLFdBQVcsQ0FBQzdHLFlBQVksQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDO01BQ3hENkcsV0FBVyxDQUFDN0csWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7TUFDeEM2RyxXQUFXLENBQUM3RyxZQUFZLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDO01BQy9ENkosT0FBSSxDQUFDbkcsVUFBVSxDQUFDbUQsV0FBVyxFQUFFNkQsU0FBUyxDQUFDO01BQ3ZDLElBQUlPLFVBQVUsR0FBR3BCLE9BQUksQ0FBQzlhLFNBQVMsQ0FBQ3pDLGNBQWMsQ0FBQ0UsVUFBVSxHQUFHLElBQUk7TUFDaEUsSUFBSSxDQUFDLENBQUNxZCxPQUFJLENBQUM5YSxTQUFTLENBQUMvRSxhQUFhLEVBQUU7UUFDbENpaEIsVUFBVSxHQUFHcEIsT0FBSSxDQUFDOWEsU0FBUyxDQUFDekMsY0FBYyxDQUFDQyxVQUFVLEdBQUcsSUFBSTtNQUM5RDtNQUNBc2EsV0FBVyxDQUFDOEMsU0FBUyxHQUFHLEVBQUUsR0FBRywyR0FBMkcsR0FBRyw2QkFBNkIsR0FBRywrREFBK0QsR0FBRyxrREFBa0QsR0FBRyxxQ0FBcUMsR0FBRyx3Q0FBd0MsR0FBRyxpQ0FBaUMsR0FBRywrQkFBK0IsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLEdBQUcsK0JBQStCLEdBQUcsb0RBQW9ELEdBQUcsa0JBQWtCLEdBQUdzQixVQUFVLEdBQUcsb0NBQW9DLEdBQUcsVUFBVTtNQUNsc0IxQixHQUFHLENBQUN5QixXQUFXLENBQUNuRSxXQUFXLENBQUM7TUFDNUJ2SSxLQUFLLEdBQUd3QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUM7TUFDdkN6QyxLQUFLLENBQUMwQixZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUM1QzFCLEtBQUssQ0FBQzBCLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO01BQ3RDMUIsS0FBSyxDQUFDMEIsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7TUFDbkMxQixLQUFLLENBQUMwQixZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQztNQUN6QyxJQUFJa0wsVUFBVSxHQUFHO1FBQ2ZoSyxRQUFRLEVBQUUsVUFBVTtRQUNwQjNWLEtBQUssRUFBRTtNQUNULENBQUM7TUFDRCxJQUFNNGYsU0FBUyxHQUFHLFNBQVMsR0FBRzlkLGNBQWMsR0FBRyxNQUFNO01BQ3JELElBQU0rZCxTQUFTLEdBQUcsaUJBQWlCO01BQ25DLElBQU1DLGtCQUFrQixHQUFHRCxTQUFTLEdBQUcsR0FBRyxHQUFHRCxTQUFTO01BQ3RELElBQUl0QixPQUFJLENBQUN2SyxrQkFBa0IsRUFBRTtRQUMzQixJQUFJdUssT0FBSSxDQUFDNUwsZUFBZSxFQUFFLEVBQUU7VUFDMUJpTixVQUFVLEdBQUE3YSxhQUFBLENBQUFBLGFBQUEsS0FDTDZhLFVBQVU7WUFDYixtQkFBbUIsRUFBRUcsa0JBQWtCO1lBQ3ZDLGdCQUFnQixFQUFFQSxrQkFBa0I7WUFDcEMsY0FBYyxFQUFFQSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFQSxrQkFBa0I7WUFDbkNDLFNBQVMsRUFBRUQ7VUFBa0IsRUFDOUI7UUFDSCxDQUFDLE1BQU07VUFDTEgsVUFBVSxHQUFBN2EsYUFBQSxDQUFBQSxhQUFBLEtBQ0w2YSxVQUFVO1lBQ2IsbUJBQW1CLEVBQUVDLFNBQVM7WUFDOUIsZ0JBQWdCLEVBQUVBLFNBQVM7WUFDM0IsY0FBYyxFQUFFQSxTQUFTO1lBQ3pCLGVBQWUsRUFBRUEsU0FBUztZQUMxQkcsU0FBUyxFQUFFSDtVQUFTLEVBQ3JCO1FBQ0g7TUFDRixDQUFDLE1BQU07UUFDTCxJQUFJdEIsT0FBSSxDQUFDNUwsZUFBZSxFQUFFLEVBQUU7VUFDMUJpTixVQUFVLEdBQUE3YSxhQUFBLENBQUFBLGFBQUEsS0FDTDZhLFVBQVU7WUFDYixtQkFBbUIsRUFBRUUsU0FBUztZQUM5QixnQkFBZ0IsRUFBRUEsU0FBUztZQUMzQixjQUFjLEVBQUVBLFNBQVM7WUFDekIsZUFBZSxFQUFFQSxTQUFTO1lBQzFCRSxTQUFTLEVBQUVGO1VBQVMsRUFDckI7UUFDSDtNQUNGO01BQ0F2QixPQUFJLENBQUNuRyxVQUFVLENBQUNwRixLQUFLLEVBQUU0TSxVQUFVLENBQUM7TUFDbENwQixTQUFTLENBQUNrQixXQUFXLENBQUMxTSxLQUFLLENBQUM7TUFDNUJ5TCxZQUFZLEdBQUdqSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDNUNnSixZQUFZLENBQUMvSixZQUFZLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQztNQUMxRDZKLE9BQUksQ0FBQ25HLFVBQVUsQ0FBQ3FHLFlBQVksRUFBRVcsU0FBUyxDQUFDO01BQ3hDbkIsR0FBRyxDQUFDeUIsV0FBVyxDQUFDakIsWUFBWSxDQUFDO01BQzdCbkQsUUFBUSxHQUFHOUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3hDNkYsUUFBUSxDQUFDNUcsWUFBWSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7TUFDbEQ0RyxRQUFRLENBQUM1RyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztNQUNyQzRHLFFBQVEsQ0FBQzVHLFlBQVksQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUM7TUFDNUQ2SixPQUFJLENBQUNuRyxVQUFVLENBQUNrRCxRQUFRLEVBQUU7UUFDeEJyYixLQUFLLEVBQUUsTUFBTTtRQUNib2YsTUFBTSxFQUFFLFFBQVE7UUFDaEJ6SixRQUFRLEVBQUU7TUFDWixDQUFDLENBQUM7TUFDRjZJLFlBQVksQ0FBQ2lCLFdBQVcsQ0FBQ3BFLFFBQVEsQ0FBQztNQUNsQ3JJLE1BQU0sR0FBR3VDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUN6Q3hDLE1BQU0sQ0FBQ3lCLFlBQVksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDO01BQzlDLElBQU11TCxXQUFXLEdBQUc7UUFDbEJuYyxPQUFPLEVBQUV5YSxPQUFJLENBQUM5YSxTQUFTLENBQUM5RSxpQkFBaUIsR0FBRzRmLE9BQUksQ0FBQ3ZLLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsTUFBTTtRQUNqRy9ULEtBQUssRUFBRSxLQUFLO1FBQ1oyVixRQUFRLEVBQUUsVUFBVTtRQUNwQnNLLElBQUksRUFBRSxLQUFLO1FBQ1hDLEdBQUcsRUFBRSxNQUFNO1FBQ1hDLE1BQU0sRUFBRTtNQUNWLENBQUM7TUFDRDdCLE9BQUksQ0FBQ25HLFVBQVUsQ0FBQ25GLE1BQU0sRUFBRWdOLFdBQVcsQ0FBQztNQUNwQ2hDLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ3pNLE1BQU0sQ0FBQztNQUN2QkMsY0FBYyxHQUFHc0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO01BQ2pEdkMsY0FBYyxDQUFDd0IsWUFBWSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztNQUM5RDZKLE9BQUksQ0FBQ25HLFVBQVUsQ0FBQ2xGLGNBQWMsRUFBRTtRQUM5QnBQLE9BQU8sRUFBRXlhLE9BQUksQ0FBQzlhLFNBQVMsQ0FBQzlFLGlCQUFpQixHQUFHNGYsT0FBSSxDQUFDdkssa0JBQWtCLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxNQUFNO1FBQ2pHNkIsTUFBTSxFQUFFLEtBQUs7UUFDYkQsUUFBUSxFQUFFLFVBQVU7UUFDcEJ5SyxLQUFLLEVBQUUsS0FBSztRQUNaRixHQUFHLEVBQUUsTUFBTTtRQUNYQyxNQUFNLEVBQUU7TUFDVixDQUFDLENBQUM7TUFDRm5DLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ3hNLGNBQWMsQ0FBQztNQUMvQndMLG9CQUFvQixHQUFHbEosUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3BEaUosb0JBQW9CLENBQUNoSyxZQUFZLENBQUMsZUFBZSxFQUFFLHNCQUFzQixDQUFDO01BQzFFNkosT0FBSSxDQUFDbkcsVUFBVSxDQUFDc0csb0JBQW9CLEVBQUU7UUFDcEM5SSxRQUFRLEVBQUUsVUFBVTtRQUNwQjBLLE1BQU0sRUFBRSxJQUFJO1FBQ1pELEtBQUssRUFBRTtNQUNULENBQUMsQ0FBQztNQUNGM0Isb0JBQW9CLENBQUNMLFNBQVMsR0FBRyxFQUFFLEdBQUcsc1BBQXNQLEdBQUcsc0RBQXNELEdBQUcsbUxBQW1MLEdBQUcsME5BQTBOLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLDZPQUE2TyxHQUFHLGdQQUFnUCxHQUFHLGFBQWEsR0FBRyxzREFBc0QsR0FBRywrUEFBK1AsR0FBRyxrUUFBa1EsR0FBRyxhQUFhLEdBQUcsc0RBQXNELEdBQUcsK1BBQStQLEdBQUcsa1FBQWtRLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLCtQQUErUCxHQUFHLGtRQUFrUSxHQUFHLGFBQWEsR0FBRyxRQUFRO01BQy9oR0osR0FBRyxDQUFDeUIsV0FBVyxDQUFDaEIsb0JBQW9CLENBQUM7TUFDckNDLFlBQVksR0FBR25KLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM1Q2tKLFlBQVksQ0FBQ2pLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO01BQzFELElBQU02TCxpQkFBaUIsR0FBQXhiLGFBQUEsQ0FBQUEsYUFBQSxLQUNsQnFhLFNBQVM7UUFDWixnQkFBZ0IsRUFBRTtNQUFRLEVBQzNCO01BQ0RiLE9BQUksQ0FBQ25HLFVBQVUsQ0FBQ3VHLFlBQVksRUFBRTRCLGlCQUFpQixDQUFDO01BQ2hEdEMsR0FBRyxDQUFDeUIsV0FBVyxDQUFDZixZQUFZLENBQUM7O01BRTdCO01BQ0E7TUFDQSxJQUFJLENBQUNoVyxLQUFLLEVBQUU7UUFDVkEsS0FBSyxHQUFHNk0sUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3JDOU0sS0FBSyxDQUFDK0wsWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7TUFDOUM7TUFDQWlLLFlBQVksQ0FBQ2UsV0FBVyxDQUFDL1csS0FBSyxDQUFDO01BQy9CLElBQUksQ0FBQ0UsUUFBUSxFQUFFO1FBQ2JBLFFBQVEsR0FBRzJNLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN4QzVNLFFBQVEsQ0FBQzZMLFlBQVksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDO01BQ3BEO01BQ0FpSyxZQUFZLENBQUNlLFdBQVcsQ0FBQzdXLFFBQVEsQ0FBQztNQUNsQyxJQUFJLENBQUNFLFFBQVEsRUFBRTtRQUNiQSxRQUFRLEdBQUd5TSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDeEMxTSxRQUFRLENBQUMyTCxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztNQUNwRDtNQUNBaUssWUFBWSxDQUFDZSxXQUFXLENBQUMzVyxRQUFRLENBQUM7TUFDbEM2VixhQUFhLEdBQUdwSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDN0NtSixhQUFhLENBQUNsSyxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztNQUM1RCxJQUFNOEwsa0JBQWtCLEdBQUF6YixhQUFBLENBQUFBLGFBQUEsS0FDbkJxYSxTQUFTO1FBQ1osZ0JBQWdCLEVBQUU7TUFBUSxFQUMzQjtNQUNEYixPQUFJLENBQUNuRyxVQUFVLENBQUN3RyxhQUFhLEVBQUU0QixrQkFBa0IsQ0FBQztNQUNsRHZDLEdBQUcsQ0FBQ3lCLFdBQVcsQ0FBQ2QsYUFBYSxDQUFDO01BQzlCLElBQUlMLE9BQUksQ0FBQzlhLFNBQVMsQ0FBQzNELFlBQVksRUFBRTtRQUMvQixJQUFJeWUsT0FBSSxDQUFDaFgsc0JBQXNCLElBQUlnWCxPQUFJLENBQUM5YSxTQUFTLENBQUNuQyxrQkFBa0IsRUFBRTtVQUNwRSxJQUFJLENBQUN1ZCxTQUFTLEVBQUU7WUFDZEEsU0FBUyxHQUFHckosUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQ3pDb0osU0FBUyxDQUFDbkssWUFBWSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUM7WUFDcEQ2SixPQUFJLENBQUNuRyxVQUFVLENBQUN5RyxTQUFTLEVBQUU7Y0FDekIvYSxPQUFPLEVBQUUsTUFBTTtjQUNmMmMsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDO1VBQ0o7VUFDQSxJQUFJLENBQUNqRixhQUFhLEVBQUU7WUFDbEJBLGFBQWEsR0FBR2hHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUM3QytGLGFBQWEsQ0FBQzlHLFlBQVksQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO1lBQzVELElBQUlnTSxtQkFBbUIsS0FBSztZQUM1QkEsbUJBQW1CLHFHQUFxRztZQUN4SEEsbUJBQW1CLDRHQUE0RztZQUMvSEEsbUJBQW1CLFlBQVk7WUFDL0JsRixhQUFhLENBQUM2QyxTQUFTLEdBQUdxQyxtQkFBbUI7WUFDN0M3QixTQUFTLENBQUNhLFdBQVcsQ0FBQ2xFLGFBQWEsQ0FBQztVQUN0QztVQUNBb0QsYUFBYSxDQUFDYyxXQUFXLENBQUNiLFNBQVMsQ0FBQztVQUNwQyxJQUFNOVQsTUFBTSxHQUFHd1QsT0FBSTtVQUNuQixJQUFNb0Msc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBQSxFQUFlO1lBQ3pDLElBQUk1VixNQUFNLENBQUN4RCxzQkFBc0IsRUFBRTtjQUNqQ2pMLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRSxDQUFDMlgsYUFBYSxDQUFDOUcsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7Y0FDMUUzSixNQUFNLENBQUNxTixVQUFVLENBQUM5YixRQUFRLENBQUN1SCxjQUFjLEVBQUUsQ0FBQzJYLGFBQWEsRUFBRTtnQkFDekQxWCxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUM7WUFDSixDQUFDLE1BQU07Y0FDTHhILFFBQVEsQ0FBQ3VILGNBQWMsRUFBRSxDQUFDMlgsYUFBYSxDQUFDOUcsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7Y0FDMUUzSixNQUFNLENBQUNxTixVQUFVLENBQUM5YixRQUFRLENBQUN1SCxjQUFjLEVBQUUsQ0FBQ21QLEtBQUssRUFBRTtnQkFDakRsUCxPQUFPLEVBQUU7Y0FDWCxDQUFDLENBQUM7Y0FDRmlILE1BQU0sQ0FBQ3FOLFVBQVUsQ0FBQzliLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRSxDQUFDMlgsYUFBYSxFQUFFO2dCQUN6RDFYLE9BQU8sRUFBRTtjQUNYLENBQUMsQ0FBQztZQUNKO1VBQ0YsQ0FBQztVQUNEMFgsYUFBYSxDQUFDL1AsZ0JBQWdCLENBQUMsT0FBTyxFQUFFa1Ysc0JBQXNCLENBQUM7UUFDakU7TUFDRjtNQUNBLElBQUlwQyxPQUFJLENBQUM5YSxTQUFTLENBQUM1RCxZQUFZLEVBQUU7UUFDL0J1YyxhQUFhLEdBQUc1RyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDN0MyRyxhQUFhLENBQUMxSCxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztRQUM1RCxJQUFNa00sa0JBQWtCLEdBQUE3YixhQUFBLENBQUFBLGFBQUEsS0FDbkJxYSxTQUFTO1VBQ1osZ0JBQWdCLEVBQUUsUUFBUTtVQUMxQnRiLE9BQU8sRUFBRSxNQUFNO1VBQ2Ysa0JBQWtCLEVBQUU7UUFBVyxFQUNoQztRQUNEeWEsT0FBSSxDQUFDbkcsVUFBVSxDQUFDZ0UsYUFBYSxFQUFFd0Usa0JBQWtCLENBQUM7UUFDbEQzQyxHQUFHLENBQUN5QixXQUFXLENBQUN0RCxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDMEMsU0FBUyxFQUFFO1VBQ2RBLFNBQVMsR0FBR3RKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUN6Q3FKLFNBQVMsQ0FBQ3BLLFlBQVksQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDO1FBQ3REO1FBQ0E2SixPQUFJLENBQUNuRyxVQUFVLENBQUMwRyxTQUFTLEVBQUEvWixhQUFBLENBQUFBLGFBQUEsS0FDcEJxYSxTQUFTO1VBQ1osZ0JBQWdCLEVBQUUsUUFBUTtVQUMxQm5mLEtBQUssRUFBRSxFQUFFO1VBQ1Q0VixNQUFNLEVBQUUsRUFBRTtVQUNWLFdBQVcsRUFBRSxLQUFLO1VBQ2xCLFlBQVksRUFBRTtRQUFLLEdBQ25CO1FBQ0Z1RyxhQUFhLENBQUNzRCxXQUFXLENBQUNaLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUN6QyxZQUFZLEVBQUU7VUFDakJBLFlBQVksR0FBRzdHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUM1QzRHLFlBQVksQ0FBQzNILFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1VBQzFEb0ssU0FBUyxDQUFDWSxXQUFXLENBQUNyRCxZQUFZLENBQUM7UUFDckM7TUFDRjtNQUNBLElBQUlrQyxPQUFJLENBQUM5YSxTQUFTLENBQUNyQywyQkFBMkIsRUFBRTtRQUM5QzJkLFlBQVksR0FBR3ZKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q3NKLFlBQVksQ0FBQ3JLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1FBQzFELElBQU1tTSxpQkFBaUIsR0FBQTliLGFBQUEsQ0FBQUEsYUFBQSxLQUNsQnFhLFNBQVM7VUFDWixhQUFhLEVBQUUsRUFBRTtVQUNqQixpQkFBaUIsRUFBRSxFQUFFO1VBQ3JCbmYsS0FBSyxFQUFFLEVBQUU7VUFDVHFmLFFBQVEsRUFBRSxFQUFFO1VBQ1osZ0JBQWdCLEVBQUU7UUFBZ0IsRUFDbkM7UUFDRGYsT0FBSSxDQUFDbkcsVUFBVSxDQUFDMkcsWUFBWSxFQUFFOEIsaUJBQWlCLENBQUM7UUFDaEQ1QyxHQUFHLENBQUN5QixXQUFXLENBQUNYLFlBQVksQ0FBQztRQUM3QixJQUFJLENBQUNDLFFBQVEsRUFBRTtVQUNiQSxRQUFRLEdBQUd4SixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7VUFDeEN1SixRQUFRLENBQUN0SyxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztVQUNsRCxJQUFJb00sVUFBVSxLQUFLO1VBQ25CQSxVQUFVLHdFQUF3RTtVQUNsRkEsVUFBVSx1RUFBdUU7VUFDakZBLFVBQVUsOEJBQThCO1VBQ3hDQSxVQUFVLDRFQUE0RTtVQUN0RkEsVUFBVSw0Q0FBNEM7VUFDdERBLFVBQVUsZ0JBQWdCO1VBQzFCQSxVQUFVLDJFQUEyRTtVQUNyRkEsVUFBVSxZQUFZO1VBQ3RCOUIsUUFBUSxDQUFDWCxTQUFTLEdBQUd5QyxVQUFVO1FBQ2pDO1FBQ0F2QyxPQUFJLENBQUNuRyxVQUFVLENBQUM0RyxRQUFRLEVBQUU7VUFDeEJNLFFBQVEsRUFBRTtRQUNaLENBQUMsQ0FBQztRQUNGUCxZQUFZLENBQUNXLFdBQVcsQ0FBQ1YsUUFBUSxDQUFDO1FBQ2xDLElBQU0rQixjQUFjLEdBQUcvQixRQUFRLENBQUNnQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBTWpXLE9BQU0sR0FBR3dULE9BQUk7UUFDbkIsSUFBTTBDLGlCQUFpQjtVQUFBLElBQUFDLE1BQUEsR0FBQXBlLGlCQUFBLENBQUcsV0FBZ0JxZSxLQUFLLEVBQUU7WUFDL0NwVyxPQUFNLENBQUN4RCxzQkFBc0IsR0FBRzRaLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxPQUFPO1lBQ3BELE1BQU10VyxPQUFNLENBQUNqQixVQUFVLENBQUNpQixPQUFNLENBQUNwSCxTQUFTLEVBQUVvSCxPQUFNLENBQUN4QyxXQUFXLEVBQUV3QyxPQUFNLENBQUN2QyxXQUFXLEVBQUV1QyxPQUFNLENBQUN0QyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7VUFDdEgsQ0FBQztVQUFBLGdCQUhLd1ksaUJBQWlCQSxDQUFBSyxHQUFBO1lBQUEsT0FBQUosTUFBQSxDQUFBalYsS0FBQSxPQUFBakUsU0FBQTtVQUFBO1FBQUEsR0FHdEI7UUFDRCtZLGNBQWMsQ0FBQ3RWLGdCQUFnQixDQUFDLE9BQU8sRUFBRXdWLGlCQUFpQixFQUFFO1VBQzFETSxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7TUFDSjtNQUNBM2QsZ0JBQWdCLEdBQUc0UixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDaEQ3UixnQkFBZ0IsQ0FBQzhRLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUM7TUFDbEUsSUFBTThNLHFCQUFxQixHQUFBemMsYUFBQSxDQUFBQSxhQUFBLEtBQ3RCcWEsU0FBUztRQUNaLGdCQUFnQixFQUFFLFFBQVE7UUFDMUJ0YixPQUFPLEVBQUUsTUFBTTtRQUNmLGtCQUFrQixFQUFFO01BQVcsRUFDaEM7TUFDRHlhLE9BQUksQ0FBQ25HLFVBQVUsQ0FBQ3hVLGdCQUFnQixFQUFFNGQscUJBQXFCLENBQUM7TUFDeER2RCxHQUFHLENBQUN5QixXQUFXLENBQUM5YixnQkFBZ0IsQ0FBQztNQUNqQyxJQUFJLENBQUNxYixZQUFZLEVBQUU7UUFDakJBLFlBQVksR0FBR3pKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q3dKLFlBQVksQ0FBQ3ZLLFlBQVksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO1FBQzFEdUssWUFBWSxDQUFDdkssWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7UUFDL0N1SyxZQUFZLENBQUNaLFNBQVMsR0FBRyxFQUFFLEdBQUcsd09BQXdPLEdBQUcsc0RBQXNELEdBQUcsbUxBQW1MLEdBQUcsME5BQTBOLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLDZPQUE2TyxHQUFHLGdQQUFnUCxHQUFHLGFBQWEsR0FBRyxzREFBc0QsR0FBRywrUEFBK1AsR0FBRyxrUUFBa1EsR0FBRyxhQUFhLEdBQUcsc0RBQXNELEdBQUcsK1BBQStQLEdBQUcsa1FBQWtRLEdBQUcsYUFBYSxHQUFHLHNEQUFzRCxHQUFHLCtQQUErUCxHQUFHLGtRQUFrUSxHQUFHLGFBQWEsR0FBRyxRQUFRO1FBQ3pnRyxJQUFJRSxPQUFJLENBQUM5YSxTQUFTLENBQUMxRCxtQkFBbUIsS0FBSyxFQUFFLElBQUl3ZSxPQUFJLENBQUM5YSxTQUFTLENBQUMxRCxtQkFBbUIsRUFBRTtVQUNuRmtmLFlBQVksQ0FBQ1osU0FBUyxJQUFJRSxPQUFJLENBQUM5YSxTQUFTLENBQUMxRCxtQkFBbUI7UUFDOUQ7TUFDRjtNQUNBd2UsT0FBSSxDQUFDbkcsVUFBVSxDQUFDNkcsWUFBWSxFQUFBbGEsYUFBQSxDQUFBQSxhQUFBLEtBQ3ZCcWEsU0FBUztRQUNaLGdCQUFnQixFQUFFO01BQVEsR0FDMUI7TUFDRnhiLGdCQUFnQixDQUFDOGIsV0FBVyxDQUFDVCxZQUFZLENBQUM7O01BRTFDO01BQ0EsTUFBTVYsT0FBSSxDQUFDa0QsV0FBVyxFQUFFOztNQUV4QjtNQUNBbEQsT0FBSSxDQUFDbkcsVUFBVSxDQUFDNkYsR0FBRyxFQUFFO1FBQ25CbmEsT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO01BQ0Z5YSxPQUFJLENBQUNtRCxLQUFLLEdBQUd6RCxHQUFHO01BQ2hCTSxPQUFJLENBQUNvRCxRQUFRLEdBQUcxTyxNQUFNO01BQ3RCc0wsT0FBSSxDQUFDcUQsZ0JBQWdCLEdBQUcxTyxjQUFjO01BQ3RDcUwsT0FBSSxDQUFDc0QsT0FBTyxHQUFHN08sS0FBSztNQUNwQnVMLE9BQUksQ0FBQ3VELFdBQVcsR0FBR3RELFNBQVM7TUFDNUJELE9BQUksQ0FBQ3dELFVBQVUsR0FBR3pHLFFBQVE7TUFDMUJpRCxPQUFJLENBQUN5RCxjQUFjLEdBQUd2RCxZQUFZO01BQ2xDRixPQUFJLENBQUMwRCxhQUFhLEdBQUcxRyxXQUFXO01BQ2hDZ0QsT0FBSSxDQUFDMkQsc0JBQXNCLEdBQUd4RCxvQkFBb0I7TUFDbERILE9BQUksQ0FBQzRELGNBQWMsR0FBR3hELFlBQVk7TUFDbENKLE9BQUksQ0FBQzdWLE9BQU8sR0FBR0MsS0FBSztNQUNwQjRWLE9BQUksQ0FBQzNWLFVBQVUsR0FBR0MsUUFBUTtNQUMxQjBWLE9BQUksQ0FBQ3pWLFVBQVUsR0FBR0MsUUFBUTtNQUMxQndWLE9BQUksQ0FBQzZELGVBQWUsR0FBR3hELGFBQWE7TUFDcENMLE9BQUksQ0FBQzhELFdBQVcsR0FBR3hELFNBQVM7TUFDNUJOLE9BQUksQ0FBQytELGVBQWUsR0FBRzlHLGFBQWE7TUFDcEMrQyxPQUFJLENBQUNnRSxlQUFlLEdBQUduRyxhQUFhO01BQ3BDbUMsT0FBSSxDQUFDaUUsV0FBVyxHQUFHMUQsU0FBUztNQUM1QlAsT0FBSSxDQUFDa0UsY0FBYyxHQUFHcEcsWUFBWTtNQUNsQ2tDLE9BQUksQ0FBQ21FLGNBQWMsR0FBRzNELFlBQVk7TUFDbENSLE9BQUksQ0FBQ29FLFVBQVUsR0FBRzNELFFBQVE7TUFDMUIsT0FBTztRQUNMZixHQUFHO1FBQ0hoTCxNQUFNO1FBQ05DLGNBQWM7UUFDZEYsS0FBSztRQUNMd0wsU0FBUztRQUNUbEQsUUFBUTtRQUNSbUQsWUFBWTtRQUNabEQsV0FBVztRQUNYbUQsb0JBQW9CO1FBQ3BCQyxZQUFZO1FBQ1poVyxLQUFLO1FBQ0xFLFFBQVE7UUFDUkUsUUFBUTtRQUNSNlYsYUFBYTtRQUNiQyxTQUFTO1FBQ1RyRCxhQUFhO1FBQ2JZLGFBQWE7UUFDYjBDLFNBQVM7UUFDVHpDLFlBQVk7UUFDWjBDLFlBQVk7UUFDWkM7TUFDRixDQUFDO0lBQUM7RUFDSjtFQUNBN0csbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEIsSUFBSSxDQUFDQyxVQUFVLENBQUM5YixRQUFRLENBQUN1SCxjQUFjLEVBQUUsQ0FBQ21QLEtBQUssRUFBRTtNQUMvQ2xQLE9BQU8sRUFBRTtJQUNYLENBQUMsQ0FBQztJQUNGLElBQU07TUFDSjBYO0lBQ0YsQ0FBQyxHQUFHbGYsUUFBUSxDQUFDdUgsY0FBYyxFQUFFO0lBQzdCLElBQUkyWCxhQUFhLEVBQUU7TUFDakJBLGFBQWEsQ0FBQzlHLFlBQVksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO01BQ2pELElBQUksQ0FBQzBELFVBQVUsQ0FBQ29ELGFBQWEsRUFBRTtRQUM3QjFYLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztJQUNKO0VBQ0Y7RUFDQThlLHdCQUF3QkEsQ0FBQSxFQUFHO0lBQ3pCLElBQU07TUFDSnBIO0lBQ0YsQ0FBQyxHQUFHbGYsUUFBUSxDQUFDdUgsY0FBYyxFQUFFO0lBQzdCLE9BQU8yWCxhQUFhLEdBQUdBLGFBQWEsQ0FBQ3FILFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxNQUFNLEdBQUcsS0FBSztFQUNwRjtFQUNNN0ksWUFBWUEsQ0FBQ0QsVUFBVSxFQUFFO0lBQUEsSUFBQStJLE9BQUE7SUFBQSxPQUFBaGdCLGlCQUFBO01BQzdCO01BQ0FnZ0IsT0FBSSxDQUFDbFMsaUJBQWlCLEdBQUcsSUFBSTtNQUM3QmtTLE9BQUksQ0FBQ2pTLGtCQUFrQixHQUFHLEdBQUc7TUFDN0JpUyxPQUFJLENBQUN6VCxnQkFBZ0IsR0FBRyxLQUFLO01BQzdCLElBQU07UUFDSjJELEtBQUs7UUFDTEMsTUFBTTtRQUNOQztNQUNGLENBQUMsR0FBRzVXLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRTtNQUM3QixJQUFJZ1osTUFBTSxTQUFTaUcsT0FBSSxDQUFDdEcsaUJBQWlCLEVBQUU7TUFDM0M7O01BRUFzRyxPQUFJLENBQUMvRSxrQkFBa0IsRUFBRTtNQUN6QixJQUFJZ0YsZUFBZSxFQUFFQyxnQkFBZ0I7TUFDckMsSUFBSUYsT0FBSSxDQUFDcmYsU0FBUyxDQUFDdEIsd0JBQXdCLEtBQUssYUFBYSxFQUFFO1FBQzdEO1FBQ0E7UUFDQTRnQixlQUFlLEdBQUc7VUFDaEJFLEtBQUssRUFBRSxJQUFJO1VBQ1gxTyxHQUFHLEVBQUU7UUFDUCxDQUFDO1FBQ0R5TyxnQkFBZ0IsR0FBRztVQUNqQkMsS0FBSyxFQUFFLElBQUk7VUFDWDFPLEdBQUcsRUFBRTtRQUNQLENBQUM7TUFDSCxDQUFDLE1BQU07UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0F3TyxlQUFlLEdBQUc7VUFDaEJFLEtBQUssRUFBRTtRQUNULENBQUM7UUFDREQsZ0JBQWdCLEdBQUc7VUFDakJDLEtBQUssRUFBRTtRQUNULENBQUM7TUFDSDtNQUNBLElBQU1DLFdBQVcsR0FBRztRQUNsQkMsS0FBSyxFQUFFLEtBQUs7UUFDWm5RLEtBQUssRUFBRTtVQUNMb1EsSUFBSSxFQUFFO1lBQ0pILEtBQUssRUFBRTtVQUNULENBQUM7VUFDRDdGLFVBQVUsRUFBRTtZQUNWNkYsS0FBSyxFQUFFSCxPQUFJLENBQUN6RjtVQUNkLENBQUM7VUFDRGdHLFNBQVMsRUFBRTtZQUNUSixLQUFLLEVBQUU7VUFDVCxDQUFDO1VBQ0RLLGdCQUFnQixFQUFFO1lBQ2hCTCxLQUFLLEVBQUU7VUFDVCxDQUFDO1VBQ0R2RixRQUFRLEVBQUViLE1BQU0sQ0FBQzFVLE1BQU0sR0FBRztZQUN4QjhhLEtBQUssRUFBRXBHLE1BQU0sQ0FBQ0EsTUFBTSxDQUFDMVUsTUFBTSxHQUFHLENBQUM7VUFDakMsQ0FBQyxHQUFHLElBQUk7VUFDUmxJLEtBQUssRUFBRThpQixlQUFlO1VBQ3RCbE4sTUFBTSxFQUFFbU47UUFDVjtNQUNGLENBQUM7O01BRUQ7TUFDQTtNQUNBLElBQUluRyxNQUFNLENBQUMxVSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCMmEsT0FBSSxDQUFDcGIsT0FBTyxDQUFDLG1FQUFtRSxDQUFDO1FBQ2pGb2IsT0FBSSxDQUFDcGIsT0FBTyxrQkFBQW9XLE1BQUEsQ0FBa0J2WSxJQUFJLENBQUNDLFNBQVMsQ0FBQzBkLFdBQVcsQ0FBQyxFQUFHO1FBQzVESixPQUFJLENBQUM3SSxRQUFRLFNBQVNoUCxTQUFTLENBQUN5UixZQUFZLENBQUM2RyxZQUFZLENBQUNMLFdBQVcsQ0FBQztRQUN0RUosT0FBSSxDQUFDcEksVUFBVSxFQUFFO1FBQ2pCbUMsTUFBTSxTQUFTaUcsT0FBSSxDQUFDdEcsaUJBQWlCLEVBQUU7UUFDdkMwRyxXQUFXLENBQUNsUSxLQUFLLENBQUMwSyxRQUFRLEdBQUdiLE1BQU0sQ0FBQzFVLE1BQU0sR0FBRztVQUMzQzhhLEtBQUssRUFBRXBHLE1BQU0sQ0FBQ0EsTUFBTSxDQUFDMVUsTUFBTSxHQUFHLENBQUM7UUFDakMsQ0FBQyxHQUFHLElBQUk7TUFDVjs7TUFFQTtNQUNBO01BQ0EsSUFBSTBVLE1BQU0sQ0FBQzFVLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkIyYSxPQUFJLENBQUNwYixPQUFPLENBQUMsaURBQWlELENBQUM7UUFDL0R3YixXQUFXLENBQUNsUSxLQUFLLENBQUMvUyxLQUFLLEdBQUc7VUFDeEJnakIsS0FBSyxFQUFFO1FBQ1QsQ0FBQztRQUNEQyxXQUFXLENBQUNsUSxLQUFLLENBQUM2QyxNQUFNLEdBQUc7VUFDekJvTixLQUFLLEVBQUU7UUFDVCxDQUFDO01BQ0g7TUFDQSxJQUFJO1FBQ0Y7UUFDQTs7UUFFQSxJQUFNTyxNQUFNLFNBQVN2WSxTQUFTLENBQUN5UixZQUFZLENBQUM2RyxZQUFZLENBQUNMLFdBQVcsQ0FBQztRQUNyRUosT0FBSSxDQUFDcGIsT0FBTyxrQkFBQW9XLE1BQUEsQ0FBa0J2WSxJQUFJLENBQUNDLFNBQVMsQ0FBQzBkLFdBQVcsQ0FBQyxFQUFHO1FBQzVEO1FBQ0EsSUFBTU8sY0FBYyxHQUFHRCxNQUFNLENBQUNFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEVBQUU7UUFDL0Q7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0FiLE9BQUksQ0FBQ3BiLE9BQU8sNkJBQUFvVyxNQUFBLENBQTZCMkYsY0FBYyxDQUFDeGpCLEtBQUssU0FBQTZkLE1BQUEsQ0FBTTJGLGNBQWMsQ0FBQzVOLE1BQU0sRUFBRztRQUMzRmlOLE9BQUksQ0FBQ3BiLE9BQU8sQ0FBQywyQkFBMkIsR0FBRytiLGNBQWMsQ0FBQ3hqQixLQUFLLEdBQUd3akIsY0FBYyxDQUFDNU4sTUFBTSxDQUFDO1FBQ3hGaU4sT0FBSSxDQUFDcGIsT0FBTyxDQUFDLHdCQUF3QixHQUFHK2IsY0FBYyxDQUFDRyxXQUFXLENBQUM7UUFDbkVkLE9BQUksQ0FBQ3BiLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRytiLGNBQWMsQ0FBQ3JHLFVBQVUsQ0FBQztRQUNqRSxDQUFDbkssTUFBTSxDQUFDaFQsS0FBSyxFQUFFZ1QsTUFBTSxDQUFDNEMsTUFBTSxDQUFDLEdBQUcsQ0FBQ2lOLE9BQUksQ0FBQ2xTLGlCQUFpQixFQUFFa1MsT0FBSSxDQUFDalMsa0JBQWtCLENBQUM7UUFDakYsSUFBSWlTLE9BQUksQ0FBQzlPLGtCQUFrQixFQUFFO1VBQzNCLENBQUNkLGNBQWMsQ0FBQ2pULEtBQUssRUFBRWlULGNBQWMsQ0FBQzJDLE1BQU0sQ0FBQyxHQUFHLENBQUNpTixPQUFJLENBQUNqUyxrQkFBa0IsRUFBRWlTLE9BQUksQ0FBQ2xTLGlCQUFpQixDQUFDO1FBQ25HO1FBQ0FvQyxLQUFLLENBQUN4RCxTQUFTLEdBQUdnVSxNQUFNO1FBQ3hCVixPQUFJLENBQUM3SSxRQUFRLEdBQUd1SixNQUFNO01BQ3hCLENBQUMsQ0FBQyxPQUFPbGEsQ0FBQyxFQUFFO1FBQ1YsS0FBSyxDQUFDO1FBQ04sTUFBTUEsQ0FBQztNQUNUO0lBQUM7RUFDSDtFQUNNbVksV0FBV0EsQ0FBQSxFQUFHO0lBQUEsSUFBQW9DLE9BQUE7SUFBQSxPQUFBL2dCLGlCQUFBO01BQ2xCLEtBQUssQ0FBQztNQUNOLElBQU07UUFDSm1iLEdBQUc7UUFDSDNDLFFBQVE7UUFDUkMsV0FBVztRQUNYNVMsS0FBSztRQUNMRSxRQUFRO1FBQ1JFLFFBQVE7UUFDUjhWO01BQ0YsQ0FBQyxHQUFHdmlCLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRTtNQUM3QmdnQixPQUFJLENBQUN6TCxVQUFVLENBQUN5RyxTQUFTLEVBQUU7UUFDekIvYSxPQUFPLEVBQUU7TUFDWCxDQUFDLENBQUM7O01BRUY7TUFDQSxJQUFNZ2dCLFNBQVMsR0FBRyxHQUFHO01BQ3JCLElBQU1DLFVBQVUsR0FBRyxHQUFHO01BQ3RCLElBQU1DLGlCQUFpQixHQUFHRCxVQUFVLEdBQUdELFNBQVMsQ0FBQyxDQUFDOztNQUVsRCxJQUFJRyxhQUFhLEVBQUVDLGNBQWM7TUFDakMsSUFBSUMsa0JBQWtCLEdBQUdsRyxHQUFHLENBQUMxSyxXQUFXO01BQ3hDLElBQUk2USxtQkFBbUIsR0FBR25HLEdBQUcsQ0FBQ3hLLFlBQVk7TUFDMUMsSUFBTWdJLFdBQVcsR0FBR29JLE9BQUksQ0FBQ3BnQixTQUFTLENBQUN6RCxnQkFBZ0IsQ0FBQ0MsS0FBSztNQUN6RCxJQUFNMGIsWUFBWSxHQUFHa0ksT0FBSSxDQUFDcGdCLFNBQVMsQ0FBQ3pELGdCQUFnQixDQUFDRSxNQUFNO01BQzNELElBQU1ta0Isb0JBQW9CLEdBQUdSLE9BQUksQ0FBQ1Msc0JBQXNCO01BQ3hELElBQU1DLGtCQUFrQixHQUFHVixPQUFJLENBQUNXLG9CQUFvQjtNQUNwRCxJQUFJWCxPQUFJLENBQUMzYyxlQUFlLEtBQUssVUFBVSxFQUFFO1FBQ3ZDO1FBQ0E7UUFDQStjLGFBQWEsR0FBR0Usa0JBQWtCLEdBQUdFLG9CQUFvQjtRQUN6REgsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjtNQUNwRCxDQUFDLE1BQU07UUFDTDtRQUNBO1FBQ0E7UUFDQUUsY0FBYyxHQUFHRSxtQkFBbUIsR0FBR0csa0JBQWtCO1FBQ3pETixhQUFhLEdBQUdDLGNBQWMsR0FBR0osU0FBUyxHQUFHQyxVQUFVO01BQ3pEO01BQ0FFLGFBQWEsSUFBSXhJLFdBQVcsR0FBRyxDQUFDO01BQ2hDeUksY0FBYyxJQUFJekksV0FBVyxHQUFHLENBQUM7TUFDakMsSUFBTWdKLG9CQUFvQixHQUFHUixhQUFhLEdBQUdKLE9BQUksQ0FBQ2EscUJBQXFCO01BQ3ZFLElBQU1DLHFCQUFxQixHQUFHVCxjQUFjLEdBQUdMLE9BQUksQ0FBQ2EscUJBQXFCO01BQ3pFLElBQUkvYixLQUFLLEVBQUU7UUFDVGtiLE9BQUksQ0FBQ3pMLFVBQVUsQ0FBQ3pQLEtBQUssRUFBRTtVQUNyQixnQkFBZ0IsRUFBRSxNQUFNO1VBQ3hCa04sTUFBTSxFQUFFLENBQUN1TyxtQkFBbUIsR0FBR0YsY0FBYyxJQUFJLENBQUMsR0FBRyxJQUFJO1VBQ3pEcGdCLE9BQU8sRUFBRSxNQUFNO1VBQ2YsZ0JBQWdCLEVBQUU7UUFDcEIsQ0FBQyxDQUFDO01BQ0o7TUFDQSxJQUFJK0UsUUFBUSxFQUFFO1FBQ1pnYixPQUFJLENBQUN6TCxVQUFVLENBQUN2UCxRQUFRLEVBQUU7VUFDeEI1SSxLQUFLLEVBQUV3a0Isb0JBQW9CLEdBQUdoSixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7VUFDcEQ1RixNQUFNLEVBQUU4TyxxQkFBcUIsR0FBR2xKLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSTtVQUN0RDNYLE9BQU8sRUFBRSxNQUFNO1VBQ2YsYUFBYSxFQUFFLFFBQVE7VUFDdkIsaUJBQWlCLEVBQUUsUUFBUTtVQUMzQjhnQixPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7TUFDSjtNQUNBLElBQUk3YixRQUFRLEVBQUU7UUFDWjhhLE9BQUksQ0FBQ3pMLFVBQVUsQ0FBQ3JQLFFBQVEsRUFBRTtVQUN4QixhQUFhLEVBQUUsTUFBTTtVQUNyQjhNLE1BQU0sRUFBRSxDQUFDdU8sbUJBQW1CLEdBQUdGLGNBQWMsSUFBSSxDQUFDLEdBQUcsSUFBSTtVQUN6RHBnQixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0EsSUFBTStnQixhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDekJoQixPQUFJLENBQUN6TCxVQUFVLENBQUNrRCxRQUFRLEVBQUU7UUFDeEJyYixLQUFLLEVBQUV3a0Isb0JBQW9CLEdBQUdJLGFBQWEsR0FBRyxJQUFJO1FBQ2xEaFAsTUFBTSxFQUFFOE8scUJBQXFCLEdBQUdFLGFBQWEsR0FBRyxJQUFJO1FBQ3BEQyxlQUFlLEVBQUU7TUFDbkIsQ0FBQyxDQUFDO01BQ0YsSUFBTUMsWUFBWSxHQUFHeEosV0FBVyxDQUFDTyxhQUFhLENBQUMsZUFBZSxDQUFDO01BQy9ELElBQUlrSixDQUFDLEdBQUdySixZQUFZLEdBQUdGLFdBQVcsR0FBRyxDQUFDO01BQ3RDdUosQ0FBQyxHQUFHQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBR0EsQ0FBQztNQUNqQixJQUFJLENBQUNwYSxLQUFLLENBQUM2WixvQkFBb0IsQ0FBQyxJQUFJLENBQUM3WixLQUFLLENBQUMrWixxQkFBcUIsQ0FBQyxJQUFJLENBQUMvWixLQUFLLENBQUMrUSxZQUFZLENBQUMsSUFBSSxDQUFDL1EsS0FBSyxDQUFDNlEsV0FBVyxDQUFDLEVBQUU7UUFDaEgsSUFBTXdKLGlCQUFpQixHQUFHL1csSUFBSSxDQUFDdUcsR0FBRyxDQUFDZ1Esb0JBQW9CLEdBQUdoSixXQUFXLEdBQUcsQ0FBQyxHQUFHb0osYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM3RixJQUFNSyxrQkFBa0IsR0FBR2hYLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQ2tRLHFCQUFxQixHQUFHbEosV0FBVyxHQUFHLENBQUMsR0FBR29KLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDL0ZFLFlBQVksQ0FBQ3JRLFlBQVksQ0FBQyxPQUFPLEVBQUV1USxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDMURGLFlBQVksQ0FBQ3JRLFlBQVksQ0FBQyxRQUFRLEVBQUV3USxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDNURILFlBQVksQ0FBQ3JRLFlBQVksQ0FBQyxHQUFHLEVBQUV1USxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9ERixZQUFZLENBQUNyUSxZQUFZLENBQUMsR0FBRyxFQUFFd1Esa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRUgsWUFBWSxDQUFDclEsWUFBWSxDQUFDLElBQUksRUFBRXNRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkNELFlBQVksQ0FBQ3JRLFlBQVksQ0FBQyxJQUFJLEVBQUVzUSxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQ3pDO0lBQUM7RUFDSDtFQUNNM0ssYUFBYUEsQ0FBQSxFQUFHO0lBQUEsSUFBQThLLE9BQUE7SUFBQSxPQUFBcmlCLGlCQUFBO01BQ3BCLElBQU1zaUIsc0JBQXNCLEdBQUdBLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxLQUFLO1FBQ3ZDLElBQUlILE9BQUksQ0FBQzFoQixTQUFTLENBQUNyQixvQkFBb0IsS0FBSyxrQkFBa0IsRUFBRTtVQUM5RCxPQUFPOEwsSUFBSSxDQUFDcUcsR0FBRyxDQUFDOFEsQ0FBQyxFQUFFQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxNQUFNLElBQUlILE9BQUksQ0FBQzFoQixTQUFTLENBQUNyQixvQkFBb0IsS0FBSyxhQUFhLEVBQUU7VUFDaEUsT0FBTzhMLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQzRRLENBQUMsRUFBRUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsTUFBTTtVQUNMLE9BQU9wWCxJQUFJLENBQUNxRyxHQUFHLENBQUM4USxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekI7TUFDRixDQUFDOztNQUVELEtBQUssQ0FBQztNQUNOLElBQU07UUFDSnJILEdBQUc7UUFDSGpMLEtBQUs7UUFDTHNJLFFBQVE7UUFDUkMsV0FBVztRQUNYNVMsS0FBSztRQUNMRSxRQUFRO1FBQ1JFLFFBQVE7UUFDUjZWLGFBQWE7UUFDYkMsU0FBUztRQUNUckQ7TUFDRixDQUFDLEdBQUdsZixRQUFRLENBQUN1SCxjQUFjLEVBQUU7TUFDN0JzaEIsT0FBSSxDQUFDL00sVUFBVSxDQUFDeUcsU0FBUyxFQUFFO1FBQ3pCL2EsT0FBTyxFQUFFO01BQ1gsQ0FBQyxDQUFDO01BQ0YsSUFBTWlRLFdBQVcsR0FBR29SLE9BQUksQ0FBQ3hoQixTQUFTLEtBQUssWUFBWTs7TUFFbkQ7TUFDQSxJQUFNbWdCLFNBQVMsR0FBRy9QLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRztNQUN6QyxJQUFNZ1EsVUFBVSxHQUFHaFEsV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHO01BQzFDLElBQU1pUSxpQkFBaUIsR0FBR0QsVUFBVSxHQUFHRCxTQUFTLENBQUMsQ0FBQzs7TUFFbEQsSUFBSUcsYUFBYSxFQUFFQyxjQUFjO01BQ2pDLElBQUlDLGtCQUFrQixHQUFHbEcsR0FBRyxDQUFDMUssV0FBVztNQUN4QyxJQUFJNlEsbUJBQW1CLEdBQUduRyxHQUFHLENBQUN4SyxZQUFZO01BQzFDLElBQUlMLGNBQWMsR0FBR0osS0FBSyxDQUFDMUQsVUFBVTtNQUNyQyxJQUFJK0QsZUFBZSxHQUFHTCxLQUFLLENBQUN6RCxXQUFXO01BQ3ZDLElBQUkrRCxvQkFBb0IsR0FBR04sS0FBSyxDQUFDTyxXQUFXO01BQzVDLElBQUlDLHFCQUFxQixHQUFHUixLQUFLLENBQUNTLFlBQVk7TUFDOUMsSUFBSUssb0JBQW9CLEdBQUdxUixPQUFJLENBQUMvZCxrQkFBa0I7TUFDbEQsSUFBSWdNLGNBQWMsS0FBSyxDQUFDLElBQUlDLGVBQWUsS0FBSyxDQUFDLElBQUlDLG9CQUFvQixLQUFLLENBQUMsSUFBSUUscUJBQXFCLEtBQUssQ0FBQyxFQUFFO1FBQzlHO01BQ0Y7TUFDQSxJQUFNaUksV0FBVyxHQUFHMEosT0FBSSxDQUFDMWhCLFNBQVMsQ0FBQ3pELGdCQUFnQixDQUFDQyxLQUFLO01BQ3pELElBQU0wYixZQUFZLEdBQUd3SixPQUFJLENBQUMxaEIsU0FBUyxDQUFDekQsZ0JBQWdCLENBQUNFLE1BQU07TUFDM0QsSUFBSWlsQixPQUFJLENBQUNuUixrQkFBa0IsRUFBRTtRQUMzQixDQUFDWixjQUFjLEVBQUVDLGVBQWUsQ0FBQyxHQUFHLENBQUNBLGVBQWUsRUFBRUQsY0FBYyxDQUFDO1FBQ3JFLENBQUNFLG9CQUFvQixFQUFFRSxxQkFBcUIsQ0FBQyxHQUFHLENBQUNBLHFCQUFxQixFQUFFRixvQkFBb0IsQ0FBQztRQUM3RlEsb0JBQW9CLEdBQUdxUixPQUFJLENBQUMvZCxrQkFBa0IsS0FBSyxVQUFVLEdBQUcsV0FBVyxHQUFHLFVBQVU7TUFDMUY7TUFDQSxJQUFJbWUsYUFBYSxHQUFHalMsb0JBQW9CO01BQ3hDLElBQUlrUyxjQUFjLEdBQUdoUyxxQkFBcUI7TUFDMUMsSUFBTTZRLG9CQUFvQixHQUFHYyxPQUFJLENBQUNiLHNCQUFzQjtNQUN4RCxJQUFNQyxrQkFBa0IsR0FBR1ksT0FBSSxDQUFDWCxvQkFBb0I7TUFDcEQsSUFBTWlCLG9CQUFvQixHQUFHalMscUJBQXFCLEdBQUdGLG9CQUFvQjtNQUN6RSxJQUFNb1MscUJBQXFCLEdBQUdwUyxvQkFBb0IsR0FBR0UscUJBQXFCO01BQzFFLElBQUkyUixPQUFJLENBQUNqZSxlQUFlLEtBQUssVUFBVSxFQUFFO1FBQ3ZDO1FBQ0FpZSxPQUFJLENBQUMvTSxVQUFVLENBQUN3RyxhQUFhLEVBQUU7VUFDN0IsaUJBQWlCLEVBQUUsUUFBUTtVQUMzQixhQUFhLEVBQUU7UUFDakIsQ0FBQyxDQUFDO1FBQ0Y7UUFDQSxJQUFJOUssb0JBQW9CLEtBQUtxUixPQUFJLENBQUNqZSxlQUFlLEVBQUU7VUFDakQ7VUFDQTtVQUNBO1VBQ0ErYyxhQUFhLEdBQUdtQixzQkFBc0IsQ0FBQ2pCLGtCQUFrQixFQUFFL1EsY0FBYyxDQUFDLEdBQUdpUixvQkFBb0I7VUFDakdILGNBQWMsR0FBR0QsYUFBYSxHQUFHRCxpQkFBaUI7O1VBRWxEO1VBQ0F1QixhQUFhLEdBQUd0QixhQUFhO1VBQzdCdUIsY0FBYyxHQUFHRCxhQUFhLEdBQUdFLG9CQUFvQjtRQUN2RCxDQUFDLE1BQU07VUFDTDtVQUNBO1VBQ0E7VUFDQXZCLGNBQWMsR0FBR2tCLHNCQUFzQixDQUFDNVIscUJBQXFCLEVBQUVILGVBQWUsQ0FBQztVQUMvRTRRLGFBQWEsR0FBR0MsY0FBYyxHQUFHSixTQUFTLEdBQUdDLFVBQVU7UUFDekQ7TUFDRixDQUFDLE1BQU07UUFDTDtRQUNBb0IsT0FBSSxDQUFDL00sVUFBVSxDQUFDd0csYUFBYSxFQUFFO1VBQzdCLGlCQUFpQixFQUFFLEtBQUs7VUFDeEIsYUFBYSxFQUFFO1FBQ2pCLENBQUMsQ0FBQztRQUNGLElBQUk5SyxvQkFBb0IsS0FBS3FSLE9BQUksQ0FBQ2plLGVBQWUsRUFBRTtVQUNqRDtVQUNBO1VBQ0E7O1VBRUE7VUFDQWdkLGNBQWMsR0FBR2tCLHNCQUFzQixDQUFDaEIsbUJBQW1CLEVBQUUvUSxlQUFlLENBQUMsR0FBR2tSLGtCQUFrQjtVQUNsR04sYUFBYSxHQUFHQyxjQUFjLEdBQUdKLFNBQVMsR0FBR0MsVUFBVTs7VUFFdkQ7VUFDQXlCLGNBQWMsR0FBR3RCLGNBQWM7VUFDL0JxQixhQUFhLEdBQUdDLGNBQWMsR0FBR0UscUJBQXFCOztVQUV0RDtVQUNBLElBQUl6QixhQUFhLEdBQUdtQixzQkFBc0IsQ0FBQ2pCLGtCQUFrQixFQUFFL1EsY0FBYyxDQUFDLEdBQUdpUixvQkFBb0IsRUFBRTtZQUNyRztZQUNBSixhQUFhLEdBQUdtQixzQkFBc0IsQ0FBQ2pCLGtCQUFrQixFQUFFL1EsY0FBYyxDQUFDLEdBQUdpUixvQkFBb0I7WUFDakdILGNBQWMsR0FBR0QsYUFBYSxHQUFHRCxpQkFBaUI7O1lBRWxEO1lBQ0F1QixhQUFhLEdBQUd0QixhQUFhO1lBQzdCdUIsY0FBYyxHQUFHRCxhQUFhLEdBQUdFLG9CQUFvQjtVQUN2RDtRQUNGLENBQUMsTUFBTTtVQUNMO1VBQ0E7O1VBRUE7VUFDQXZCLGNBQWMsR0FBR2tCLHNCQUFzQixDQUFDaEIsbUJBQW1CLEVBQUUvUSxlQUFlLENBQUMsR0FBR2tSLGtCQUFrQjtVQUNsR04sYUFBYSxHQUFHQyxjQUFjLEdBQUdKLFNBQVMsR0FBR0MsVUFBVTs7VUFFdkQ7VUFDQSxJQUFJRSxhQUFhLEdBQUdtQixzQkFBc0IsQ0FBQ2pCLGtCQUFrQixFQUFFL1EsY0FBYyxDQUFDLEdBQUdpUixvQkFBb0IsRUFBRTtZQUNyRztZQUNBSixhQUFhLEdBQUdtQixzQkFBc0IsQ0FBQ2pCLGtCQUFrQixFQUFFL1EsY0FBYyxDQUFDLEdBQUdpUixvQkFBb0I7WUFDakdILGNBQWMsR0FBR0QsYUFBYSxHQUFHRCxpQkFBaUI7VUFDcEQ7O1VBRUE7VUFDQXVCLGFBQWEsR0FBR3RCLGFBQWE7VUFDN0J1QixjQUFjLEdBQUdELGFBQWEsR0FBR0Usb0JBQW9CO1FBQ3ZEO01BQ0Y7O01BRUE7TUFDQSxJQUFJTixPQUFJLENBQUMxaEIsU0FBUyxDQUFDckIsb0JBQW9CLEtBQUssYUFBYSxFQUFFO1FBQ3pEO1FBQ0EsSUFBSThoQixjQUFjLEdBQUdFLG1CQUFtQixFQUFFO1VBQ3hDRixjQUFjLEdBQUdoVyxJQUFJLENBQUNxRyxHQUFHLENBQUM2UCxtQkFBbUIsRUFBRS9RLGVBQWUsQ0FBQyxHQUFHa1Isa0JBQWtCO1VBQ3BGTixhQUFhLEdBQUdDLGNBQWMsR0FBR0osU0FBUyxHQUFHQyxVQUFVO1VBQ3ZEd0IsYUFBYSxHQUFHdEIsYUFBYTtVQUM3QnVCLGNBQWMsR0FBR0QsYUFBYSxHQUFHRSxvQkFBb0I7UUFDdkQ7O1FBRUE7UUFDQSxJQUFJeEIsYUFBYSxHQUFHRSxrQkFBa0IsRUFBRTtVQUN0Q0YsYUFBYSxHQUFHL1YsSUFBSSxDQUFDcUcsR0FBRyxDQUFDNFAsa0JBQWtCLEVBQUUvUSxjQUFjLENBQUMsR0FBR2lSLG9CQUFvQjtVQUNuRkgsY0FBYyxHQUFHRCxhQUFhLEdBQUdELGlCQUFpQjtVQUNsRHVCLGFBQWEsR0FBR3RCLGFBQWE7VUFDN0J1QixjQUFjLEdBQUdELGFBQWEsR0FBR0Usb0JBQW9CO1FBQ3ZEO01BQ0Y7TUFDQU4sT0FBSSxDQUFDeFIsb0JBQW9CLEdBQUd6RixJQUFJLENBQUNxRyxHQUFHLENBQUMwUCxhQUFhLEVBQUVzQixhQUFhLENBQUM7TUFDbEVKLE9BQUksQ0FBQ3RSLHFCQUFxQixHQUFHM0YsSUFBSSxDQUFDcUcsR0FBRyxDQUFDMlAsY0FBYyxFQUFFc0IsY0FBYyxDQUFDO01BQ3JFLElBQUlMLE9BQUksQ0FBQ25SLGtCQUFrQixFQUFFO1FBQzNCLENBQUN1UixhQUFhLEVBQUVDLGNBQWMsQ0FBQyxHQUFHLENBQUNBLGNBQWMsRUFBRUQsYUFBYSxDQUFDO01BQ25FO01BQ0F0QixhQUFhLElBQUl4SSxXQUFXLEdBQUcsQ0FBQztNQUNoQ3lJLGNBQWMsSUFBSXpJLFdBQVcsR0FBRyxDQUFDO01BQ2pDLElBQU1nSixvQkFBb0IsR0FBR1IsYUFBYSxHQUFHa0IsT0FBSSxDQUFDVCxxQkFBcUI7TUFDdkUsSUFBTUMscUJBQXFCLEdBQUdULGNBQWMsR0FBR2lCLE9BQUksQ0FBQ1QscUJBQXFCO01BQ3pFLElBQUkvYixLQUFLLEVBQUU7UUFDVHdjLE9BQUksQ0FBQy9NLFVBQVUsQ0FBQ3pQLEtBQUssRUFBRTtVQUNyQixnQkFBZ0IsRUFBRSxNQUFNO1VBQ3hCa04sTUFBTSxFQUFFLENBQUN1TyxtQkFBbUIsR0FBR0YsY0FBYyxJQUFJLENBQUMsR0FBRyxJQUFJO1VBQ3pEcGdCLE9BQU8sRUFBRSxNQUFNO1VBQ2YsZ0JBQWdCLEVBQUU7UUFDcEIsQ0FBQyxDQUFDO01BQ0o7TUFDQSxJQUFJK0UsUUFBUSxFQUFFO1FBQ1pzYyxPQUFJLENBQUMvTSxVQUFVLENBQUN2UCxRQUFRLEVBQUU7VUFDeEI1SSxLQUFLLEVBQUV3a0Isb0JBQW9CLEdBQUdoSixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7VUFDcEQ1RixNQUFNLEVBQUU4TyxxQkFBcUIsR0FBR2xKLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSTtVQUN0RDNYLE9BQU8sRUFBRSxNQUFNO1VBQ2YsYUFBYSxFQUFFLFFBQVE7VUFDdkIsaUJBQWlCLEVBQUUsUUFBUTtVQUMzQjhnQixPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7TUFDSjtNQUNBLElBQUk3YixRQUFRLEVBQUU7UUFDWm9jLE9BQUksQ0FBQy9NLFVBQVUsQ0FBQ3JQLFFBQVEsRUFBRTtVQUN4QixhQUFhLEVBQUUsTUFBTTtVQUNyQjhNLE1BQU0sRUFBRSxDQUFDdU8sbUJBQW1CLEdBQUdGLGNBQWMsSUFBSSxDQUFDLEdBQUcsSUFBSTtVQUN6RHBnQixPQUFPLEVBQUUsTUFBTTtVQUNmLGdCQUFnQixFQUFFO1FBQ3BCLENBQUMsQ0FBQztNQUNKO01BQ0FxaEIsT0FBSSxDQUFDL00sVUFBVSxDQUFDcEYsS0FBSyxFQUFFO1FBQ3JCL1MsS0FBSyxFQUFFc2xCLGFBQWEsR0FBRztNQUN6QixDQUFDLENBQUM7TUFDRkosT0FBSSxDQUFDL00sVUFBVSxDQUFDcEYsS0FBSyxFQUFFO1FBQ3JCNkMsTUFBTSxFQUFFMlAsY0FBYyxHQUFHO01BQzNCLENBQUMsQ0FBQztNQUNGLElBQU1YLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUN6Qk0sT0FBSSxDQUFDL00sVUFBVSxDQUFDa0QsUUFBUSxFQUFFO1FBQ3hCcmIsS0FBSyxFQUFFd2tCLG9CQUFvQixHQUFHSSxhQUFhLEdBQUcsSUFBSTtRQUNsRGhQLE1BQU0sRUFBRThPLHFCQUFxQixHQUFHRSxhQUFhLEdBQUcsSUFBSTtRQUNwREMsZUFBZSxFQUFFO01BQ25CLENBQUMsQ0FBQztNQUNGLElBQU1DLFlBQVksR0FBR3hKLFdBQVcsQ0FBQ08sYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUMvRCxJQUFJa0osQ0FBQyxHQUFHckosWUFBWSxHQUFHRixXQUFXLEdBQUcsQ0FBQztNQUN0Q3VKLENBQUMsR0FBR0EsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUdBLENBQUM7TUFDakIsSUFBSSxDQUFDcGEsS0FBSyxDQUFDNlosb0JBQW9CLENBQUMsSUFBSSxDQUFDN1osS0FBSyxDQUFDK1oscUJBQXFCLENBQUMsSUFBSSxDQUFDL1osS0FBSyxDQUFDK1EsWUFBWSxDQUFDLElBQUksQ0FBQy9RLEtBQUssQ0FBQzZRLFdBQVcsQ0FBQyxFQUFFO1FBQ2hILElBQU13SixpQkFBaUIsR0FBRy9XLElBQUksQ0FBQ3VHLEdBQUcsQ0FBQ2dRLG9CQUFvQixHQUFHaEosV0FBVyxHQUFHLENBQUMsR0FBR29KLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDN0YsSUFBTUssa0JBQWtCLEdBQUdoWCxJQUFJLENBQUN1RyxHQUFHLENBQUNrUSxxQkFBcUIsR0FBR2xKLFdBQVcsR0FBRyxDQUFDLEdBQUdvSixhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQy9GRSxZQUFZLENBQUNyUSxZQUFZLENBQUMsT0FBTyxFQUFFdVEsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzFERixZQUFZLENBQUNyUSxZQUFZLENBQUMsUUFBUSxFQUFFd1Esa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzVESCxZQUFZLENBQUNyUSxZQUFZLENBQUMsR0FBRyxFQUFFdVEsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvREYsWUFBWSxDQUFDclEsWUFBWSxDQUFDLEdBQUcsRUFBRXdRLGtCQUFrQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEVILFlBQVksQ0FBQ3JRLFlBQVksQ0FBQyxJQUFJLEVBQUVzUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDRCxZQUFZLENBQUNyUSxZQUFZLENBQUMsSUFBSSxFQUFFc1EsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUN6Qzs7TUFFQTtNQUNBO01BQ0EsSUFBSUcsT0FBSSxDQUFDMWhCLFNBQVMsQ0FBQzNELFlBQVksRUFBRTtRQUMvQnFsQixPQUFJLENBQUMvTSxVQUFVLENBQUN5RyxTQUFTLEVBQUU7VUFDekIvYSxPQUFPLEVBQUU7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJcWhCLE9BQUksQ0FBQ2plLGVBQWUsS0FBSyxVQUFVLElBQUk2QixRQUFRLElBQUk4VixTQUFTLEVBQUU7VUFDaEUsSUFBTThHLGlDQUFpQyxHQUFHUixPQUFJLENBQUNTLDJCQUEyQixDQUFDN2MsUUFBUSxDQUFDO1VBQ3BGLElBQUk4Yyx1QkFBdUIsR0FBR3JLLGFBQWEsQ0FBQ00sYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDK0csWUFBWSxDQUFDLFFBQVEsQ0FBQztVQUN2RmdELHVCQUF1QixHQUFHQSx1QkFBdUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHQSx1QkFBdUI7VUFDdEYsSUFBSUMsc0JBQXNCLEdBQUcvYyxRQUFRLENBQUMwSyxZQUFZO1VBQ2xEcVMsc0JBQXNCLElBQUlsYixLQUFLLENBQUNDLFFBQVEsQ0FBQzlCLFFBQVEsQ0FBQzVJLEtBQUssQ0FBQzRsQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBR2xiLFFBQVEsQ0FBQzlCLFFBQVEsQ0FBQzVJLEtBQUssQ0FBQzRsQixVQUFVLENBQUM7VUFDOUdELHNCQUFzQixJQUFJSCxpQ0FBaUM7VUFDM0RHLHNCQUFzQixJQUFJRCx1QkFBdUI7VUFDakQsSUFBTUcsUUFBUSxHQUFHNUIsbUJBQW1CLElBQUlBLG1CQUFtQixHQUFHLENBQUMsR0FBR0YsY0FBYyxHQUFHLENBQUMsQ0FBQztVQUNyRixJQUFJNEIsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJQSxzQkFBc0IsR0FBR0UsUUFBUSxFQUFFO1lBQ25FYixPQUFJLENBQUMvTSxVQUFVLENBQUN5RyxTQUFTLEVBQUU7Y0FDekIsZUFBZSxFQUFFLEVBQUU7Y0FDbkIsZ0JBQWdCLEVBQUVpSCxzQkFBc0IsR0FBRztZQUM3QyxDQUFDLENBQUM7VUFDSjtRQUNGLENBQUMsTUFBTTtVQUNMWCxPQUFJLENBQUMvTSxVQUFVLENBQUN5RyxTQUFTLEVBQUU7WUFDekIsZUFBZSxFQUFFLE1BQU07WUFDdkIsZ0JBQWdCLEVBQUU7VUFDcEIsQ0FBQyxDQUFDO1FBQ0o7TUFDRjtNQUNBLE1BQU1zRyxPQUFJLENBQUNuYyxhQUFhLENBQUNtYyxPQUFJLENBQUM5SixnQkFBZ0IsRUFBRSxJQUFJLENBQUM7TUFDckQsS0FBSyxDQUFDO0lBQUM7RUFDVDtFQUNBdUssMkJBQTJCQSxDQUFDMU0sR0FBRyxFQUFFO0lBQy9CLElBQUkrTSxHQUFHLEdBQUcsQ0FBQztJQUNYLEtBQUssSUFBTUMsSUFBSSxJQUFJaE4sR0FBRyxhQUFIQSxHQUFHLHVCQUFIQSxHQUFHLENBQUVpTixVQUFVLEVBQUU7TUFDbENGLEdBQUcsSUFBSUMsSUFBSSxDQUFDelMsWUFBWSxHQUFHeVMsSUFBSSxDQUFDelMsWUFBWSxHQUFHLENBQUM7SUFDbEQ7SUFDQSxPQUFPd1MsR0FBRztFQUNaO0VBQ0F4YyxhQUFhQSxDQUFBLEVBQUc7SUFDZCxJQUFJLENBQUNrUSxtQ0FBbUMsRUFBRTtJQUMxQyxJQUFJLENBQUN5TSxRQUFRLEVBQUU7SUFDZixJQUFJLENBQUMxTCxVQUFVLEVBQUU7RUFDbkI7RUFDTXhYLGVBQWVBLENBQUEsRUFBRztJQUFBLElBQUFtakIsT0FBQTtJQUFBLE9BQUF2akIsaUJBQUE7TUFDdEIsS0FBSyxDQUFDO01BQ04sSUFBSXVqQixPQUFJLENBQUNDLGlCQUFpQixFQUFFO1FBQzFCLEtBQUssQ0FBQztRQUNOO01BQ0Y7TUFDQUQsT0FBSSxDQUFDRSxlQUFlLFNBQVM1cEIsSUFBSSxFQUFFO01BQ25DLElBQUk2cEIsT0FBTyxHQUFHLEVBQUU7TUFDaEJBLE9BQU8sWUFBQTFJLE1BQUEsQ0FBWXVJLE9BQUksQ0FBQzlmLFlBQVksQ0FBQ2tnQixFQUFFLE9BQUk7TUFDM0NELE9BQU8sa0JBQUExSSxNQUFBLENBQWtCdUksT0FBSSxDQUFDOWYsWUFBWSxDQUFDbWdCLFFBQVEsT0FBSTtNQUN2REYsT0FBTyxzQkFBQTFJLE1BQUEsQ0FBc0J1SSxPQUFJLENBQUNwaUIsZUFBZSxPQUFJO01BQ3JEdWlCLE9BQU8sbUNBQUExSSxNQUFBLENBQW1DdUksT0FBSSxDQUFDRSxlQUFlLE9BQUk7TUFDbEUsSUFBSUYsT0FBSSxDQUFDOWYsWUFBWSxDQUFDbWdCLFFBQVEsS0FBSyxLQUFLLElBQUlMLE9BQUksQ0FBQzlmLFlBQVksQ0FBQ21nQixRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ2hGTCxPQUFJLENBQUNFLGVBQWUsR0FBRyxLQUFLO01BQzlCO01BQ0FDLE9BQU8sOEJBQUExSSxNQUFBLENBQThCdUksT0FBSSxDQUFDRSxlQUFlLE9BQUk7TUFDN0RDLE9BQU8sbUJBQUExSSxNQUFBLENBQW1CN1MsU0FBUyxDQUFDQyxTQUFTLE9BQUk7TUFDakQsS0FBSyxDQUFDO01BQ05tYixPQUFJLENBQUMzZSxPQUFPLENBQUM4ZSxPQUFPLENBQUM7TUFDckI5a0IsTUFBTSxDQUFDaWxCLGNBQWMsR0FBR0gsT0FBTztNQUMvQixJQUFJSSxhQUFhLEdBQUcsT0FBTztNQUMzQixJQUFJUCxPQUFJLENBQUNFLGVBQWUsRUFBRTtRQUN4QixLQUFLLENBQUM7UUFDTkssYUFBYSxJQUFJLE9BQU87TUFDMUIsQ0FBQyxNQUFNO1FBQ0wsS0FBSyxDQUFDO01BQ1I7TUFDQSxLQUFLLENBQUM7TUFDTmxsQixNQUFNLENBQUNpbEIsY0FBYyxHQUFHSCxPQUFPO01BQy9CLEtBQUssQ0FBQztNQUNOLElBQUlLLE9BQU8sR0FBRyxFQUFFO01BQ2hCLElBQUlSLE9BQUksQ0FBQzVpQixTQUFTLENBQUNoQixpQkFBaUIsRUFBRTtRQUNwQztRQUNBb2tCLE9BQU8sR0FBRyxPQUFPLEdBQUdSLE9BQUksQ0FBQzVpQixTQUFTLENBQUNmLHNCQUFzQjtNQUMzRDtNQUNBLElBQU1va0IsR0FBRyxHQUFHLElBQUk1TSxHQUFHLENBQUMwTSxhQUFhLEdBQUcsS0FBSyxHQUFHQyxPQUFPLEVBQUVSLE9BQUksQ0FBQzVpQixTQUFTLENBQUNoQyxlQUFlLENBQUM7TUFDcEYsSUFBSWlVLEdBQUcsU0FBU3FSLEtBQUssQ0FBQ0QsR0FBRyxDQUFDRSxJQUFJLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsSUFBSSxFQUFFLENBQUMsQ0FBQ0YsSUFBSSxDQUFDRSxJQUFJLElBQUk7UUFDbkUsSUFBSUMsS0FBSyxHQUFHLHVCQUF1QjtRQUNuQyxJQUFJQyxNQUFNLEdBQUdGLElBQUksQ0FBQ0csT0FBTyxDQUFDRixLQUFLLEVBQUUsMEJBQTBCLENBQUM7O1FBRTVEO1FBQ0FDLE1BQU0sR0FBR0EsTUFBTSxDQUFDQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsNENBQTRDLEdBQUcsMERBQTBELENBQUM7UUFDekpELE1BQU0sR0FBR0EsTUFBTSxDQUFDQyxPQUFPLENBQUMsNENBQTRDLEVBQUUsZ0JBQWdCLEdBQUcsNENBQTRDLENBQUM7UUFDdElELE1BQU0sR0FBR0EsTUFBTSxDQUFDQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUM7UUFDcEZELE1BQU0sR0FBR0EsTUFBTSxDQUFDQyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUM7O1FBRXhEO1FBQ0FELE1BQU0sR0FBR0EsTUFBTSxDQUFDQyxPQUFPLENBQUNWLGFBQWEsR0FBRyxPQUFPLEVBQUUsSUFBSTFNLEdBQUcsQ0FBQzBNLGFBQWEsR0FBRyxPQUFPLEdBQUdDLE9BQU8sRUFBRVIsT0FBSSxDQUFDNWlCLFNBQVMsQ0FBQ2hDLGVBQWUsQ0FBQyxDQUFDdWxCLElBQUksQ0FBQztRQUNqSUssTUFBTSxHQUFHQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxJQUFJQyxNQUFNLCtCQUFBekosTUFBQSxDQUE4QjhJLGFBQWEsbUJBQWUsSUFBSSxDQUFDLDZCQUFBOUksTUFBQSxDQUE0QixJQUFJNUQsR0FBRyxDQUFDME0sYUFBYSxHQUFHLE9BQU8sR0FBR0MsT0FBTyxFQUFFUixPQUFJLENBQUM1aUIsU0FBUyxDQUFDaEMsZUFBZSxDQUFDLENBQUN1bEIsSUFBSSxRQUFJO1FBQ2hOSyxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLHFCQUFxQixFQUFFLDJCQUEyQixDQUFDO1FBQzNFRCxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLHFCQUFxQixFQUFFLDJCQUEyQixDQUFDOztRQUUzRTtRQUNBRCxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLHlCQUF5QixFQUFFLCtDQUErQyxHQUFHLDZCQUE2QixHQUFHLDRDQUE0QyxHQUFHLGtDQUFrQyxHQUFHLGtDQUFrQyxHQUFHLGlDQUFpQyxHQUFHLCtCQUErQixHQUFHLDJDQUEyQyxHQUFHLFdBQVcsR0FBRyxzQ0FBc0MsR0FBRywrQkFBK0IsR0FBRywyQ0FBMkMsR0FBRyxVQUFVLEdBQUcsU0FBUyxHQUFHLFNBQVMsR0FBRywyQ0FBMkMsQ0FBQztRQUMxa0IsT0FBT0QsTUFBTTtNQUNmLENBQUMsQ0FBQztNQUNGM1IsR0FBRyx1Q0FBQW9JLE1BQUEsQ0FFQ3BJLEdBQUcsd0lBS0Y7TUFDTDJRLE9BQUksQ0FBQ3hnQixXQUFXLFNBQVMyaEIsSUFBSSxDQUFDOVIsR0FBRyxDQUFDO01BQ2xDMlEsT0FBSSxDQUFDeGdCLFdBQVcsQ0FBQzRoQixvQkFBb0I7UUFBQSxJQUFBQyxNQUFBLEdBQUE1a0IsaUJBQUEsQ0FBRyxXQUFNdUIsQ0FBQyxFQUFJO1VBQ2pELEtBQUssQ0FBQztRQUNSLENBQUM7UUFBQSxpQkFBQXNqQixHQUFBO1VBQUEsT0FBQUQsTUFBQSxDQUFBemIsS0FBQSxPQUFBakUsU0FBQTtRQUFBO01BQUE7TUFDRCxNQUFNcWUsT0FBSSxDQUFDeGdCLFdBQVcsQ0FBQzRoQixvQkFBb0IsRUFBRTtNQUM3Q3BCLE9BQUksQ0FBQ0MsaUJBQWlCLEdBQUcsSUFBSTtNQUM3QixLQUFLLENBQUM7SUFBQztFQUNUO0VBQ0FzQixtQkFBbUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFDcEIsT0FBTyxJQUFJdmQsT0FBTyxDQUFDLENBQUNDLE9BQU8sRUFBRXVPLE1BQU0sS0FBSztNQUN0QyxJQUFJLENBQUNnUCxVQUFVLEdBQUcsS0FBSztNQUN2QixJQUFJLENBQUNwZSxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7TUFDN0I7TUFDQTtNQUNBO01BQ0EsSUFBSSxDQUFDeU8sbUJBQW1CLEVBQUU7TUFDMUIsSUFBSSxDQUFDNFAsU0FBUyxHQUFHLENBQUM7TUFDbEIsSUFBSSxDQUFDbmMsU0FBUyxHQUFHLEtBQUs7TUFDdEIsSUFBSSxDQUFDbU0scUJBQXFCLEdBQUcsQ0FBQztNQUM5QixJQUFJLENBQUNpUSxlQUFlLEdBQUcsQ0FBQztNQUN4QixJQUFNQyxJQUFJO1FBQUEsSUFBQUMsTUFBQSxHQUFBcGxCLGlCQUFBLENBQUcsYUFBWTtVQUN2QixJQUFJO1lBQ0YsSUFBSTZMLFNBQVMsR0FBRyxJQUFJO2NBQ2xCd1osY0FBYyxHQUFHLElBQUk7Y0FDckJwVCxPQUFPLEdBQUcsSUFBSTtjQUNkQyxVQUFVLEdBQUcsSUFBSTtjQUNqQjBELFNBQVMsR0FBRyxJQUFJO2NBQ2hCQyxTQUFTLEdBQUcsSUFBSTtjQUNoQnlQLFNBQVMsR0FBRyxJQUFJO2NBQ2hCQyxhQUFhLEdBQUcsRUFBRTtjQUNsQkMsUUFBUSxHQUFHLElBQUk7O1lBRWpCO1lBQ0EsSUFBSSxDQUFDVCxPQUFJLENBQUNoaUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFOztZQUU5QjtZQUNBLElBQU0sQ0FBQzBpQixZQUFZLEVBQUVDLFlBQVksQ0FBQyxHQUFHLENBQUNYLE9BQUksQ0FBQ2pYLGlCQUFpQixFQUFFaVgsT0FBSSxDQUFDaFgsa0JBQWtCLENBQUM7WUFDdEYsSUFBTTtjQUNKbUM7WUFDRixDQUFDLEdBQUcxVyxRQUFRLENBQUN1SCxjQUFjLEVBQUU7WUFDN0IsSUFBSTBrQixZQUFZLEtBQUssQ0FBQyxJQUFJQyxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQzlDLElBQUlYLE9BQUksQ0FBQ0MsVUFBVSxFQUFFO2NBQ25CLE1BQU1ELE9BQUksQ0FBQ3piLE9BQU8sQ0FBQyxHQUFHLENBQUM7Y0FDdkI7WUFDRjtZQUNBO1lBQ0EsSUFBSXliLE9BQUksQ0FBQ0UsU0FBUyxLQUFLLENBQUMsSUFBSSxDQUFDRixPQUFJLENBQUNqYyxTQUFTLFdBQVdpYyxPQUFJLENBQUNyViw2QkFBNkIsQ0FBQ1EsS0FBSyxDQUFDLENBQUMsRUFBRTtjQUNoRyxDQUFDNlUsT0FBSSxDQUFDRSxTQUFTLEVBQUVGLE9BQUksQ0FBQ3RWLHdCQUF3QixDQUFDLEdBQUdzVixPQUFJLENBQUNsWSxtQkFBbUIsQ0FBQ2tZLE9BQUksQ0FBQ2xrQixTQUFTLENBQUM7WUFDNUY7WUFDQSxJQUFJLENBQUNra0IsT0FBSSxDQUFDRSxTQUFTLElBQUlGLE9BQUksQ0FBQ2pjLFNBQVMsRUFBRTtjQUNyQyxNQUFNaWMsT0FBSSxDQUFDemIsT0FBTyxDQUFDLEdBQUcsQ0FBQztjQUN2QjtZQUNGO1lBQ0E7O1lBRUEsSUFBSXliLE9BQUksQ0FBQzlNLFdBQVcsR0FBRzhNLE9BQUksQ0FBQ3ZwQixVQUFVLENBQUNYLFdBQVcsRUFBRTtjQUNsRDs7Y0FFQTtjQUNBLENBQUN3cUIsY0FBYyxFQUFFcFQsT0FBTyxFQUFFQyxVQUFVLENBQUMsU0FBUzZTLE9BQUksQ0FBQzFSLG1CQUFtQixDQUFDMFIsT0FBSSxDQUFDRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2NBQ3pGLElBQUksQ0FBQ0ksY0FBYyxFQUFFO2dCQUNuQixJQUFJTixPQUFJLENBQUN4TSxnQkFBZ0IsS0FBS3dNLE9BQUksQ0FBQ3JwQixXQUFXLENBQUNwQixLQUFLLEVBQUU7a0JBQ3BELE1BQU15cUIsT0FBSSxDQUFDN2UsYUFBYSxDQUFDNmUsT0FBSSxDQUFDcnBCLFdBQVcsQ0FBQ2xCLGtCQUFrQixDQUFDO2dCQUMvRDtnQkFDQSxJQUFJdXFCLE9BQUksQ0FBQ2pGLHdCQUF3QixFQUFFLEVBQUU7a0JBQ25DLE1BQU1pRixPQUFJLENBQUM3ZSxhQUFhLENBQUM2ZSxPQUFJLENBQUNycEIsV0FBVyxDQUFDaEIscUJBQXFCLEVBQUUsS0FBSyxFQUFFd1gsVUFBVSxDQUFDO2tCQUNuRjZTLE9BQUksQ0FBQzFQLG1CQUFtQixFQUFFO2tCQUMxQjBQLE9BQUksQ0FBQ25lLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDOztnQkFFQTtjQUNGOztjQUVBO2NBQ0EsTUFBTW1lLE9BQUksQ0FBQzdlLGFBQWEsQ0FBQzZlLE9BQUksQ0FBQ3JwQixXQUFXLENBQUNuQixtQkFBbUIsQ0FBQzs7Y0FFOUQ7Y0FDQXdxQixPQUFJLENBQUNZLDBCQUEwQixDQUFDMVQsT0FBTyxFQUFFQyxVQUFVLENBQUM7Y0FDcEQsSUFBSTZTLE9BQUksQ0FBQ2pGLHdCQUF3QixFQUFFLEVBQUU7Z0JBQ25DaUYsT0FBSSxDQUFDbmUsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2dCQUM1QixNQUFNbWUsT0FBSSxDQUFDN2UsYUFBYSxDQUFDNmUsT0FBSSxDQUFDcnBCLFdBQVcsQ0FBQ2pCLHNCQUFzQixFQUFFLEtBQUssRUFBRXlYLFVBQVUsQ0FBQztjQUN0RjtjQUNBLENBQUNyRyxTQUFTLEVBQUVxRyxVQUFVLEVBQUUwRCxTQUFTLEVBQUVDLFNBQVMsQ0FBQyxTQUFTa1AsT0FBSSxDQUFDOVEsa0JBQWtCLENBQUM4USxPQUFJLENBQUNFLFNBQVMsRUFBRUYsT0FBSSxDQUFDbGtCLFNBQVMsRUFBRWtrQixPQUFJLENBQUN4ZixTQUFTLEVBQUV3ZixPQUFJLENBQUNqRix3QkFBd0IsRUFBRSxFQUFFN04sT0FBTyxFQUFFQyxVQUFVLENBQUM7O2NBRW5MO2NBQ0E7Y0FDQTtjQUNBO1lBQ0Y7O1lBRUEsSUFBSTZTLE9BQUksQ0FBQzlNLFdBQVcsSUFBSThNLE9BQUksQ0FBQ3ZwQixVQUFVLENBQUNYLFdBQVcsRUFBRTtjQUNuRDs7Y0FFQTtjQUNBLElBQUlnUixTQUFTLEtBQUssS0FBSyxFQUFFO2dCQUN2QixNQUFNLElBQUkxSSxLQUFLLGtCQUFBNlgsTUFBQSxDQUFrQitKLE9BQUksQ0FBQzlNLFdBQVcsOEJBQTJCLENBQUMsQ0FBQztjQUNoRjs7Y0FFQTtjQUNBOE0sT0FBSSxDQUFDelAsVUFBVSxDQUFDcEYsS0FBSyxFQUFFO2dCQUNyQmxQLE9BQU8sRUFBRTtjQUNYLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBRUosSUFBSStqQixPQUFJLENBQUN4ZixTQUFTLEVBQUU7Z0JBQ2xCLEtBQUssQ0FBQztnQkFDTjtnQkFDQStmLFNBQVMsU0FBU1AsT0FBSSxDQUFDaFAsWUFBWSxDQUFDZ1AsT0FBSSxDQUFDbGtCLFNBQVMsRUFBRWtrQixPQUFJLENBQUNFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLElBQUlLLFNBQVMsS0FBSyxJQUFJLEVBQUUsTUFBTSxJQUFJbmlCLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLENBQUM7O2dCQUUzRm9pQixhQUFhLENBQUM1SyxJQUFJLENBQUMySyxTQUFTLENBQUM7Z0JBQzdCLElBQUlQLE9BQUksQ0FBQ3BrQixTQUFTLENBQUNsQixnQkFBZ0IsR0FBRyxDQUFDLEVBQUU7a0JBQ3ZDLElBQUltbUIsY0FBYyxHQUFHLElBQUloakIsSUFBSSxFQUFFO2tCQUMvQixJQUFNaWpCLElBQUksR0FBR2QsT0FBSSxDQUFDcGtCLFNBQVMsQ0FBQ3BCLFlBQVksS0FBSyxNQUFNO2tCQUNuRCxJQUFNdW1CLElBQUksR0FBR2YsT0FBSSxDQUFDcGtCLFNBQVMsQ0FBQ3BCLFlBQVksS0FBSyxNQUFNO2tCQUNuRCxJQUFNd21CLFFBQVEsR0FBR2hCLE9BQUksQ0FBQ3BrQixTQUFTLENBQUNwQixZQUFZLEtBQUssVUFBVTtrQkFDM0QsSUFBSXltQixXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7a0JBQUEsSUFBQUMsS0FBQSxhQUFBQSxNQUFBN0MsSUFBQSxFQUVvQjtvQkFDM0MsSUFBSTRDLFdBQVcsRUFBRTtzQkFDZixLQUFLLENBQUMsQ0FBQyxDQUFDO3NCQUFBO29CQUVWO29CQUNBO29CQUNBLElBQUlqQixPQUFJLENBQUNHLGVBQWUsS0FBS0gsT0FBSSxDQUFDcGtCLFNBQVMsQ0FBQ2xCLGdCQUFnQixFQUFFO3NCQUM1RCxLQUFLLENBQUM7c0JBQUM7b0JBRVQ7b0JBQ0EsSUFBTXltQixPQUFPO3NCQUFBLElBQUFDLE1BQUEsR0FBQW5tQixpQkFBQSxDQUFHLGFBQVk7d0JBQzFCK2tCLE9BQUksQ0FBQ0csZUFBZSxFQUFFO3dCQUN0QixLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNSSSxTQUFTLFNBQVNQLE9BQUksQ0FBQ3RPLGlCQUFpQixDQUFDc08sT0FBSSxDQUFDbGtCLFNBQVMsRUFBRWtrQixPQUFJLENBQUNFLFNBQVMsRUFBRTdCLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2hGLElBQUlrQyxTQUFTLEtBQUssSUFBSSxFQUFFLE1BQU0sSUFBSW5pQixLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQyxDQUFDOzt3QkFFM0ZvaUIsYUFBYSxDQUFDNUssSUFBSSxDQUFDMkssU0FBUyxDQUFDO3NCQUMvQixDQUFDO3NCQUFBLGdCQVBLWSxPQUFPQSxDQUFBO3dCQUFBLE9BQUFDLE1BQUEsQ0FBQWhkLEtBQUEsT0FBQWpFLFNBQUE7c0JBQUE7b0JBQUEsR0FPWjtvQkFDRCxJQUFJMmdCLElBQUksRUFBRTtzQkFDUixJQUFJUCxTQUFTLENBQUM5ZixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ2xDLE1BQU0wZ0IsT0FBTyxFQUFFO3NCQUNqQixDQUFDLE1BQU07d0JBQ0xGLFdBQVcsR0FBRyxJQUFJO3NCQUNwQjtvQkFDRjtvQkFDQSxJQUFJRixJQUFJLEVBQUU7c0JBQ1IsSUFBSVIsU0FBUyxDQUFDOWYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUNsQyxNQUFNMGdCLE9BQU8sRUFBRTtzQkFDakIsQ0FBQyxNQUFNO3dCQUNMRixXQUFXLEdBQUcsSUFBSTtzQkFDcEI7b0JBQ0Y7b0JBQ0EsSUFBSUQsUUFBUSxFQUFFO3NCQUNaLE1BQU1HLE9BQU8sRUFBRTtvQkFDakI7a0JBQ0YsQ0FBQztrQkFuQ0QsS0FBSyxJQUFNOUMsSUFBSSxJQUFJMkIsT0FBSSxDQUFDM1AsbUJBQW1CO29CQUFBLElBQUFnUixJQUFBLFVBQUFILEtBQUEsQ0FBQTdDLElBQUE7b0JBQUEsSUFBQWdELElBQUEsY0FHdkM7a0JBQU07a0JBaUNWLElBQU1DLGdCQUFnQixHQUFHLElBQUl6akIsSUFBSSxFQUFFLEdBQUdnakIsY0FBYztrQkFDcEQsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixDQUFDLE1BQU07a0JBQ0wsS0FBSyxDQUFDO2dCQUNSO2NBQ0Y7Y0FDQSxJQUFJYixPQUFJLENBQUNwa0IsU0FBUyxDQUFDekUsV0FBVyxFQUFFO2dCQUM5QnNwQixRQUFRLEdBQUdULE9BQUksQ0FBQ3pPLGFBQWEsQ0FBQ3lPLE9BQUksQ0FBQ0UsU0FBUyxDQUFDO2NBQy9DO2NBQ0EsS0FBSyxDQUFDO2NBQ04sSUFBTTtnQkFDSnFCLFlBQVk7Z0JBQ1pDO2NBQ0YsQ0FBQyxHQUFHOXNCLGlCQUFpQixDQUFDK3NCLGNBQWMsQ0FBQ3pCLE9BQUksQ0FBQ2xrQixTQUFTLEVBQUVra0IsT0FBSSxDQUFDeGYsU0FBUyxFQUFFc0csU0FBUyxFQUFFeVosU0FBUyxFQUFFUCxPQUFJLENBQUNHLGVBQWUsRUFBRUssYUFBYSxFQUFFUixPQUFJLENBQUNwa0IsU0FBUyxDQUFDcEIsWUFBWSxFQUFFd2xCLE9BQUksQ0FBQ3BrQixTQUFTLENBQUNuQjtjQUM1SztjQUNBO2NBQ0E7Y0FBQSxDQUNDOztjQUVELElBQUkwQixhQUFhLEdBQUc7Z0JBQ2xCdWxCLFFBQVEsRUFBRTFCLE9BQUksQ0FBQ2xrQixTQUFTO2dCQUN4QlMsVUFBVSxFQUFFaWxCLFNBQVM7Z0JBQ3JCdmtCLGdCQUFnQixFQUFFa1EsVUFBVTtnQkFDNUI3UCxpQkFBaUIsRUFBRXVULFNBQVM7Z0JBQzVCdFQsY0FBYyxFQUFFdVQsU0FBUztnQkFDekIyUCxRQUFRLEVBQUVBLFFBQVE7Z0JBQ2xCa0IsUUFBUSxFQUFFM0IsT0FBSSxDQUFDeGY7Y0FDakIsQ0FBQztjQUNELE1BQU13ZixPQUFJLENBQUM0QixnQkFBZ0IsQ0FBQ3psQixhQUFhLEVBQUVnUixVQUFVLEVBQUUwRCxTQUFTLEVBQUVDLFNBQVMsQ0FBQztjQUM1RWtQLE9BQUksQ0FBQzlqQixhQUFhLENBQUNDLGFBQWEsQ0FBQztjQUNqQyxJQUFJNmpCLE9BQUksQ0FBQ3BrQixTQUFTLENBQUMxRSxlQUFlLEVBQUU7Z0JBQ2xDaUYsYUFBYSxDQUFDMGxCLFFBQVEsR0FBR04sWUFBWTtjQUN2QztjQUNBLE1BQU12QixPQUFJLENBQUM4QixrQkFBa0IsQ0FBQzNsQixhQUFhLENBQUM7Y0FDNUM2akIsT0FBSSxDQUFDcGUsYUFBYSxFQUFFO2NBQ3BCb2UsT0FBSSxDQUFDQyxVQUFVLEdBQUcsSUFBSTtjQUN0QnZkLE9BQU8sRUFBRTtZQUNYO1VBQ0YsQ0FBQyxDQUFDLE9BQU9qQixDQUFDLEVBQUU7WUFDVixJQUFJa1IsWUFBWSxHQUFHLHNCQUFzQjtZQUN6QyxJQUFJbFIsQ0FBQyxDQUFDd04sT0FBTyxFQUFFO2NBQ2IwRCxZQUFZLElBQUksSUFBSSxHQUFHbFIsQ0FBQyxDQUFDd04sT0FBTztZQUNsQztZQUNBLEtBQUssQ0FBQzs7WUFFTjtZQUNBO1lBQ0E7WUFDQTtZQUNBLE1BQU0rUSxPQUFJLENBQUNwTixrQkFBa0IsQ0FBQyxPQUFPLEVBQUVuUixDQUFDLEVBQUVrUixZQUFZLENBQUM7WUFDdkRxTixPQUFJLENBQUNwZSxhQUFhLEVBQUU7WUFDcEJvZSxPQUFJLENBQUNDLFVBQVUsR0FBRyxJQUFJO1lBQ3RCaFAsTUFBTSxFQUFFO1lBQ1I7VUFDRixDQUFDLFNBQVM7WUFDUixJQUFJK08sT0FBSSxDQUFDK0IsV0FBVyxFQUFFO2NBQ3BCL0IsT0FBSSxDQUFDK0IsV0FBVyxHQUFHLEtBQUs7Y0FDeEI7WUFDRjtZQUNBLElBQUksQ0FBQy9CLE9BQUksQ0FBQ0MsVUFBVSxFQUFFO2NBQ3BCcmQsVUFBVSxDQUFDd2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkI7VUFDRjtRQUNGLENBQUM7UUFBQSxnQkFwTUtBLElBQUlBLENBQUE7VUFBQSxPQUFBQyxNQUFBLENBQUFqYyxLQUFBLE9BQUFqRSxTQUFBO1FBQUE7TUFBQSxHQW9NVDtNQUVEeUMsVUFBVSxDQUFDd2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0VBQ0o7O0VBRU13QixnQkFBZ0JBLENBQUN6bEIsYUFBYSxFQUFFZ1IsVUFBVSxFQUFFMEQsU0FBUyxFQUFFQyxTQUFTLEVBQUUvSyxjQUFjLEVBQUU7SUFBQSxJQUFBaWMsT0FBQTtJQUFBLE9BQUEvbUIsaUJBQUE7TUFDdEYsSUFBSSttQixPQUFJLENBQUNwbUIsU0FBUyxDQUFDckUsZ0JBQWdCLEVBQUU7UUFDbkMsSUFBTTBxQixXQUFXLEdBQUdELE9BQUksQ0FBQ2hXLHFCQUFxQixHQUFHZ1csT0FBSSxDQUFDbFcsb0JBQW9CO1FBQzFFLElBQU1vVyxjQUFjLEdBQUc7VUFDckJDLFFBQVEsRUFBRUgsT0FBSSxDQUFDcG1CLFNBQVMsQ0FBQ3BFLHdCQUF3QjtVQUNqRDRxQixTQUFTLEVBQUVKLE9BQUksQ0FBQ3BtQixTQUFTLENBQUNwRSx3QkFBd0IsR0FBR3lxQixXQUFXO1VBQ2hFSSxXQUFXLEVBQUVMLE9BQUksQ0FBQ3BtQixTQUFTLENBQUNuRSx5QkFBeUI7VUFDckQ2cUIsb0JBQW9CLEVBQUVOLE9BQUksQ0FBQ3BtQixTQUFTLENBQUNuRSx5QkFBeUIsQ0FBQztRQUNqRSxDQUFDOztRQUVEMEUsYUFBYSxDQUFDYyxnQkFBZ0IsU0FBUytrQixPQUFJLENBQUNuYyxxQkFBcUIsQ0FBQ3NILFVBQVUsRUFBRStVLGNBQWMsRUFBRW5jLGNBQWMsQ0FBQzs7UUFFN0c7UUFDQSxJQUFNd2MsbUJBQW1CLEdBQUc7VUFDMUJDLE9BQU8sRUFBRU4sY0FBYyxDQUFDTSxPQUFPO1VBQy9CRixvQkFBb0IsRUFBRUosY0FBYyxDQUFDSTtRQUN2QyxDQUFDO1FBQ0RubUIsYUFBYSxDQUFDbUIsaUJBQWlCLFNBQVMwa0IsT0FBSSxDQUFDbmMscUJBQXFCLENBQUNnTCxTQUFTLEVBQUUwUixtQkFBbUIsRUFBRXhjLGNBQWMsQ0FBQztRQUNsSDVKLGFBQWEsQ0FBQ29CLGNBQWMsU0FBU3lrQixPQUFJLENBQUNuYyxxQkFBcUIsQ0FBQ2lMLFNBQVMsRUFBRW9SLGNBQWMsRUFBRW5jLGNBQWMsQ0FBQztNQUM1RztJQUFDO0VBQ0g7RUFDQTBjLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLE9BQU8sSUFBSWhnQixPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFdU8sTUFBTSxLQUFLO01BQ3RDLElBQU15UixVQUFVLEdBQUcsSUFBSSxDQUFDOW1CLFNBQVMsQ0FBQyttQixjQUFjLENBQUNELFVBQVU7TUFDM0QsSUFBTUUsT0FBTyxHQUFHLElBQUksQ0FBQ2huQixTQUFTLENBQUMrbUIsY0FBYyxDQUFDQyxPQUFPO01BQ3JEMUQsS0FBSyxJQUFBakosTUFBQSxDQUFJMk0sT0FBTyxlQUFZO1FBQzFCQyxJQUFJLEVBQUVubEIsSUFBSSxDQUFDQyxTQUFTLENBQUMra0IsVUFBVSxDQUFDO1FBQ2hDSSxNQUFNLEVBQUU7UUFDUjtRQUNBO01BQ0YsQ0FBQyxDQUFDLENBQUMxRCxJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDMEQsSUFBSSxFQUFFLENBQUMsQ0FBQzNELElBQUksQ0FBQ3RhLE1BQU0sSUFBSTtRQUN4QyxLQUFLLENBQUM7UUFDTm9hLEtBQUssSUFBQWpKLE1BQUEsQ0FBSTJNLE9BQU8sa0JBQWU7VUFDN0JJLE9BQU8sRUFBRTtZQUNQQyxhQUFhLFlBQUFoTixNQUFBLENBQVluUixNQUFNLENBQUNvZSxLQUFLO1VBQ3ZDLENBQUM7VUFDREwsSUFBSSxFQUFFLElBQUk7VUFDVkMsTUFBTSxFQUFFO1FBQ1YsQ0FBQyxDQUFDLENBQUMxRCxJQUFJLENBQUNDLEdBQUcsSUFBSUEsR0FBRyxDQUFDMEQsSUFBSSxFQUFFLENBQUMsQ0FBQzNELElBQUksQ0FBQzJELElBQUksSUFBSTtVQUN0Q3JnQixPQUFPLENBQUNxZ0IsSUFBSSxDQUFDRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxJQUFJO1FBQ2RuUyxNQUFNLENBQUNtUyxHQUFHLENBQUM7TUFDYixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUNBQyxrQkFBa0JBLENBQUNuaEIsT0FBTyxFQUFFaU4sT0FBTyxFQUFFaEMsVUFBVSxFQUFFO0lBQUEsSUFBQW1XLE9BQUE7SUFDL0MsT0FBTyxJQUFJN2dCLE9BQU87TUFBQSxJQUFBOGdCLE1BQUEsR0FBQXRvQixpQkFBQSxDQUFDLFdBQU95SCxPQUFPLEVBQUV1TyxNQUFNLEVBQUs7UUFDNUMsSUFBSTtVQUNGLElBQUkyUixPQUFPLEdBQUdVLE9BQUksQ0FBQzFuQixTQUFTLENBQUM0bkIsZ0JBQWdCO1VBQzdDLFFBQVF0aEIsT0FBTztZQUNiLEtBQUssUUFBUTtZQUNiLEtBQUssUUFBUTtZQUNiLEtBQUssWUFBWTtZQUNqQixLQUFLLFlBQVk7Y0FDZjBnQixPQUFPLElBQUksb0JBQW9CO2NBQy9CO1lBQ0YsS0FBSyxVQUFVO1lBQ2YsS0FBSyxjQUFjO1lBQ25CLEtBQUssa0JBQWtCO1lBQ3ZCLEtBQUssc0JBQXNCO2NBQ3pCQSxPQUFPLElBQUksZUFBZTtjQUMxQjtZQUNGLEtBQUssWUFBWTtjQUNmQSxPQUFPLElBQUksaUJBQWlCO2NBQzVCO1lBQ0YsS0FBSyxPQUFPO1lBQ1osS0FBSyxXQUFXO2NBQ2RBLE9BQU8sSUFBSSxZQUFZO2NBQ3ZCO1lBQ0YsS0FBSyxRQUFRO2NBQ1gsTUFBTSxJQUFJeGtCLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQztZQUM5RDtjQUNFLE1BQU0sSUFBSUEsS0FBSywwQkFBQTZYLE1BQUEsQ0FBMEIvVCxPQUFPLEVBQUc7VUFBQztVQUV4RCxJQUFNdWhCLFFBQVEsU0FBU0gsT0FBSSxDQUFDYixvQkFBb0IsRUFBRTtVQUNsRCxJQUFNaUIsU0FBUyxHQUFHLElBQUlDLE9BQU8sRUFBRTtVQUMvQkQsU0FBUyxDQUFDRSxNQUFNLENBQUMsZUFBZSxZQUFBM04sTUFBQSxDQUFZd04sUUFBUSxFQUFHO1VBQ3ZELElBQU1JLEtBQUssR0FBRztZQUNaQyxZQUFZLEVBQUUzVyxVQUFVO1lBQ3hCNFcsU0FBUyxFQUFFLE1BQU07WUFDakJDLFNBQVMsRUFBRTtVQUNiLENBQUM7VUFDRCxJQUFJVixPQUFJLENBQUM5aUIsU0FBUyxFQUFFO1lBQ2xCcWpCLEtBQUssQ0FBQ2xDLFFBQVEsR0FBRyxNQUFNO1VBQ3pCO1VBQ0EsSUFBTXNDLEdBQUcsR0FBR3ZtQixJQUFJLENBQUNDLFNBQVMsQ0FBQ2ttQixLQUFLLENBQUM7VUFDakMsSUFBTUssY0FBYyxHQUFHO1lBQ3JCcEIsTUFBTSxFQUFFLE1BQU07WUFDZEUsT0FBTyxFQUFFVSxTQUFTO1lBQ2xCYixJQUFJLEVBQUVvQixHQUFHO1lBQ1RFLFFBQVEsRUFBRTtVQUNaLENBQUM7VUFDRGpGLEtBQUssQ0FBQzBELE9BQU8sRUFBRXNCLGNBQWMsQ0FBQyxDQUFDOUUsSUFBSSxDQUFDQyxHQUFHLElBQUlBLEdBQUcsQ0FBQzBELElBQUksRUFBRSxDQUFDLENBQUMzRCxJQUFJLENBQUN0YSxNQUFNLElBQUk7WUFDcEUsS0FBSyxDQUFDO1lBQ05wQyxPQUFPLENBQUNvQyxNQUFNLENBQUM7VUFDakIsQ0FBQyxDQUFDLENBQUNxZSxLQUFLLENBQUMxaEIsQ0FBQyxJQUFJO1lBQ1osTUFBTUEsQ0FBQztVQUNULENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxPQUFPMmhCLEdBQUcsRUFBRTtVQUNaLEtBQUssQ0FBQztVQUNOblMsTUFBTSxDQUFDbVMsR0FBRyxDQUFDO1FBQ2I7TUFDRixDQUFDO01BQUEsaUJBQUFnQixHQUFBLEVBQUFDLEdBQUE7UUFBQSxPQUFBZCxNQUFBLENBQUFuZixLQUFBLE9BQUFqRSxTQUFBO01BQUE7SUFBQSxJQUFDO0VBQ0o7RUFDQW1rQixxQkFBcUJBLENBQUEsRUFBRztJQUFBLElBQUFDLE9BQUE7SUFDdEIsT0FBTyxJQUFJOWhCLE9BQU87TUFBQSxJQUFBK2hCLE1BQUEsR0FBQXZwQixpQkFBQSxDQUFDLFdBQU95SCxPQUFPLEVBQUV1TyxNQUFNLEVBQUs7UUFDNUMsSUFBSTtVQUFBLElBQUF3VCxxQkFBQTtVQUNGO1VBQ0E7VUFDQTtVQUNBRixPQUFJLENBQUNqVSxtQkFBbUIsRUFBRTtVQUMxQixJQUFJeEosU0FBUyxHQUFHLElBQUk7WUFDbEJ5WixTQUFTLEdBQUcsSUFBSTtZQUNoQkMsYUFBYSxHQUFHLEVBQUU7VUFDcEIsSUFBTTFILHNCQUFzQjtZQUFBLElBQUE0TCxNQUFBLEdBQUF6cEIsaUJBQUEsQ0FBRyxhQUFZO2NBQ3pDO2NBQ0EsSUFBTSxHQUFHa1MsVUFBVSxDQUFDLFNBQVNvWCxPQUFJLENBQUN4WixvQkFBb0IsRUFBRTtjQUN4RCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2Q7Y0FBQSxDQUNELE1BQU07Z0JBQ0w7Z0JBQ0EsTUFBTXdaLE9BQUksQ0FBQ3BqQixhQUFhLENBQUNvakIsT0FBSSxDQUFDNXRCLFdBQVcsQ0FBQ2pCLHNCQUFzQixFQUFFLEtBQUssRUFBRXlYLFVBQVUsQ0FBQztnQkFDcEYsSUFBSTtrQkFDRnJHLFNBQVMsU0FBU3lkLE9BQUksQ0FBQ2xCLGtCQUFrQixDQUFDa0IsT0FBSSxDQUFDem9CLFNBQVMsRUFBRXlvQixPQUFJLENBQUMvakIsU0FBUyxFQUFFMk0sVUFBVSxDQUFDOztrQkFFckY7a0JBQ0EsSUFBSXJHLFNBQVMsS0FBSyxLQUFLLEVBQUU7b0JBQ3ZCLE1BQU15ZCxPQUFJLENBQUNwakIsYUFBYSxDQUFDb2pCLE9BQUksQ0FBQzV0QixXQUFXLENBQUNYLFVBQVUsQ0FBQztrQkFDdkQ7Z0JBQ0YsQ0FBQyxDQUFDLE9BQU95TCxDQUFDLEVBQUU7a0JBQ1YsTUFBTSxJQUFJckQsS0FBSyx3QkFBd0I7Z0JBQ3pDOztnQkFFQTs7Z0JBRUE7Z0JBQ0EsSUFBTTtrQkFDSitNO2dCQUNGLENBQUMsR0FBRzFXLFFBQVEsQ0FBQ3VILGNBQWMsRUFBRTtnQkFDN0J1b0IsT0FBSSxDQUFDaFUsVUFBVSxDQUFDcEYsS0FBSyxFQUFFO2tCQUNyQmxQLE9BQU8sRUFBRTtnQkFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFFSixLQUFLLENBQUM7Z0JBQ04sSUFBTTtrQkFDSnNsQixZQUFZO2tCQUNaQyxTQUFTO2tCQUNUbUQsaUJBQWlCO2tCQUNqQmxFO2dCQUNGLENBQUMsR0FBRzlyQixnQkFBZ0IsQ0FBQzhzQixjQUFjLENBQUM4QyxPQUFJLENBQUN6b0IsU0FBUyxFQUFFeW9CLE9BQUksQ0FBQy9qQixTQUFTLEVBQUVzRyxTQUFTLENBQUM7Z0JBQzlFLElBQUkzSyxhQUFhLEdBQUc7a0JBQ2xCdWxCLFFBQVEsRUFBRTZDLE9BQUksQ0FBQ3pvQixTQUFTO2tCQUN4QlMsVUFBVSxFQUFFaWxCLFNBQVM7a0JBQ3JCdmtCLGdCQUFnQixFQUFFa1EsVUFBVTtrQkFDNUI3UCxpQkFBaUIsRUFBRXFuQixpQkFBaUIsYUFBakJBLGlCQUFpQix1QkFBakJBLGlCQUFpQixDQUFFcm5CLGlCQUFpQjtrQkFDdkRDLGNBQWMsRUFBRW9uQixpQkFBaUIsYUFBakJBLGlCQUFpQix1QkFBakJBLGlCQUFpQixDQUFFcG5CLGNBQWM7a0JBQ2pEa2pCLFFBQVE7a0JBQ1JrQixRQUFRLEVBQUU0QyxPQUFJLENBQUMvakI7Z0JBQ2pCLENBQUM7Z0JBQ0QsSUFBSStqQixPQUFJLENBQUNLLFdBQVcsRUFBRTtrQkFDcEJ6b0IsYUFBYSxDQUFDMG9CLGdCQUFnQixHQUFHL2QsU0FBUztnQkFDNUM7Z0JBQ0EsTUFBTXlkLE9BQUksQ0FBQzNDLGdCQUFnQixDQUFDemxCLGFBQWEsRUFBRWdSLFVBQVUsRUFBRXdYLGlCQUFpQixhQUFqQkEsaUJBQWlCLHVCQUFqQkEsaUJBQWlCLENBQUVybkIsaUJBQWlCLEVBQUVxbkIsaUJBQWlCLGFBQWpCQSxpQkFBaUIsdUJBQWpCQSxpQkFBaUIsQ0FBRXBuQixjQUFjLEVBQUUsR0FBRyxDQUFDO2dCQUNwSWduQixPQUFJLENBQUNyb0IsYUFBYSxDQUFDQyxhQUFhLENBQUM7Z0JBQ2pDLElBQUlvb0IsT0FBSSxDQUFDM29CLFNBQVMsQ0FBQzFFLGVBQWUsRUFBRTtrQkFDbENpRixhQUFhLENBQUMwbEIsUUFBUSxHQUFHTixZQUFZO2dCQUN2QztnQkFDQSxJQUFJemEsU0FBUyxDQUFDbUosUUFBUSxLQUFLLElBQUksRUFBRTtrQkFDL0IsTUFBTXNVLE9BQUksQ0FBQ3pDLGtCQUFrQixDQUFDM2xCLGFBQWEsQ0FBQztrQkFDNUNvb0IsT0FBSSxDQUFDM2lCLGFBQWEsRUFBRTtrQkFDcEJjLE9BQU8sRUFBRTtnQkFDWCxDQUFDLE1BQU07a0JBQUEsSUFBQW9pQixXQUFBO2tCQUNMLElBQU1DLFVBQVUsR0FBRyxPQUFPO2tCQUMxQixJQUFNQyxhQUFhLE1BQUEvTyxNQUFBLENBQU1uUCxTQUFTLENBQUNtZSxZQUFZLE9BQUFoUCxNQUFBLEVBQUE2TyxXQUFBLEdBQUloZSxTQUFTLGNBQUFnZSxXQUFBLHVCQUFUQSxXQUFBLENBQVdJLFdBQVcsQ0FBRTtrQkFDM0UsSUFBTUMsWUFBWSxHQUFHem5CLElBQUksQ0FBQ0MsU0FBUyxDQUFDbUosU0FBUyxDQUFDO2tCQUM5QyxNQUFNeWQsT0FBSSxDQUFDM1Isa0JBQWtCLENBQUNtUyxVQUFVLEVBQUVJLFlBQVksRUFBRUgsYUFBYSxDQUFDLENBQUMsQ0FBQzs7a0JBRXhFVCxPQUFJLENBQUMzaUIsYUFBYSxFQUFFO2tCQUNwQnFQLE1BQU0sRUFBRTtnQkFDVjtjQUNGO1lBQ0YsQ0FBQztZQUFBLGdCQW5FSzZILHNCQUFzQkEsQ0FBQTtjQUFBLE9BQUE0TCxNQUFBLENBQUF0Z0IsS0FBQSxPQUFBakUsU0FBQTtZQUFBO1VBQUEsR0FtRTNCO1VBQ0QsQ0FBQXNrQixxQkFBQSxHQUFBRixPQUFJLENBQUM5SixlQUFlLGNBQUFnSyxxQkFBQSx1QkFBcEJBLHFCQUFBLENBQXNCN2dCLGdCQUFnQixDQUFDLE9BQU8sRUFBRWtWLHNCQUFzQixDQUFDO1FBQ3pFLENBQUMsQ0FBQyxPQUFPclgsQ0FBQyxFQUFFO1VBQ1YsSUFBSWtSLFlBQVksR0FBRyxrQkFBa0I7VUFDckMsSUFBSWxSLENBQUMsQ0FBQ3dOLE9BQU8sRUFBRTtZQUNiMEQsWUFBWSxJQUFJLElBQUksR0FBR2xSLENBQUMsQ0FBQ3dOLE9BQU87VUFDbEM7VUFDQSxLQUFLLENBQUM7VUFDTixNQUFNc1YsT0FBSSxDQUFDM1Isa0JBQWtCLENBQUMsT0FBTyxFQUFFblIsQ0FBQyxFQUFFa1IsWUFBWSxDQUFDLENBQUMsQ0FBQztVQUN6RDRSLE9BQUksQ0FBQzNpQixhQUFhLEVBQUU7VUFDcEJxUCxNQUFNLEVBQUU7UUFDVjtNQUNGLENBQUM7TUFBQSxpQkFBQW1VLEdBQUEsRUFBQUMsR0FBQTtRQUFBLE9BQUFiLE1BQUEsQ0FBQXBnQixLQUFBLE9BQUFqRSxTQUFBO01BQUE7SUFBQSxJQUFDO0VBQ0o7RUFDQXlnQiwwQkFBMEJBLENBQUMxVCxPQUFPLEVBQUVvWSxVQUFVLEVBQUU7SUFDOUM7SUFDQSxJQUFJLElBQUksQ0FBQzlrQixTQUFTLElBQUksSUFBSSxDQUFDNUUsU0FBUyxDQUFDbEIsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQ2tCLFNBQVMsQ0FBQzNELFlBQVksSUFBSSxJQUFJLENBQUNrWSx3QkFBd0IsR0FBRyxDQUFDLEVBQUU7TUFDN0gsSUFBSW9WLG1CQUFtQixHQUFHbGYsSUFBSSxDQUFDdUcsR0FBRyxDQUFDLElBQUksQ0FBQ2hSLFNBQVMsQ0FBQ2xCLGdCQUFnQixFQUFFLElBQUksQ0FBQ3lWLHdCQUF3QixDQUFDO01BQ2xHLElBQUksSUFBSSxDQUFDRSxtQkFBbUIsQ0FBQy9QLE1BQU0sS0FBS2lsQixtQkFBbUIsRUFBRTtRQUMzRCxJQUFJLENBQUNsVixtQkFBbUIsQ0FBQ21WLEtBQUssRUFBRTtRQUNoQyxJQUFJLElBQUksQ0FBQ1osV0FBVyxFQUFFLElBQUksQ0FBQ2EseUJBQXlCLENBQUNELEtBQUssRUFBRTtNQUM5RDtNQUNBLElBQUksQ0FBQ25WLG1CQUFtQixDQUFDdUYsSUFBSSxDQUFDMUksT0FBTyxDQUFDO01BQ3RDLElBQUksSUFBSSxDQUFDMFgsV0FBVyxFQUFFO1FBQ3BCLElBQUksQ0FBQ2EseUJBQXlCLENBQUM3UCxJQUFJLENBQUMwUCxVQUFVLENBQUM7UUFDL0MsS0FBSyxDQUFDLENBQUMsQ0FBQztNQUNWOztNQUVBLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDVjtFQUNGOztFQUVNeEQsa0JBQWtCQSxDQUFDM2xCLGFBQWEsRUFBRTtJQUFBLElBQUF1cEIsT0FBQTtJQUFBLE9BQUF6cUIsaUJBQUE7TUFDdEM7TUFDQSxJQUFJa0IsYUFBYSxDQUFDd2xCLFFBQVEsRUFBRTtRQUMxQixNQUFNK0QsT0FBSSxDQUFDdmtCLGFBQWEsQ0FBQ3VrQixPQUFJLENBQUMvdUIsV0FBVyxDQUFDWixvQkFBb0IsQ0FBQztNQUNqRSxDQUFDLE1BQU07UUFDTCxNQUFNMnZCLE9BQUksQ0FBQ3ZrQixhQUFhLENBQUN1a0IsT0FBSSxDQUFDL3VCLFdBQVcsQ0FBQ2IsV0FBVyxDQUFDO01BQ3hEO01BQ0EsSUFBTWdQLE1BQU0sR0FBRztRQUNiNmdCLFlBQVksRUFBRTtVQUNaVCxXQUFXLEVBQUUsTUFBTTtVQUNuQlUsY0FBYyxFQUFFO1FBQ2xCLENBQUM7UUFDRDlnQixNQUFNLEVBQUUsU0FBUztRQUNqQjNJLGFBQWEsRUFBRUE7TUFDakIsQ0FBQztNQUNELElBQUl1cEIsT0FBSSxDQUFDaGxCLFdBQVcsRUFBRTtRQUNwQmdsQixPQUFJLENBQUNobEIsV0FBVyxDQUFDb0UsTUFBTSxDQUFDO1FBQ3hCNGdCLE9BQUksQ0FBQ2hsQixXQUFXLEdBQUcsSUFBSTtNQUN6QixDQUFDLE1BQU07UUFDTCxLQUFLLENBQUM7TUFDUjtJQUFDO0VBQ0g7RUFDTWtTLGtCQUFrQkEsQ0FBQ21TLFVBQVUsRUFBRXRqQixDQUFDLEVBQUVrUixZQUFZLEVBQUU7SUFBQSxJQUFBa1QsT0FBQTtJQUFBLE9BQUE1cUIsaUJBQUE7TUFDcEQsTUFBTTRxQixPQUFJLENBQUMxa0IsYUFBYSxDQUFDMGtCLE9BQUksQ0FBQ2x2QixXQUFXLENBQUNYLFVBQVUsQ0FBQztNQUNyRCxJQUFJOHZCLFdBQVcsR0FBRyxFQUFFO01BQ3BCLElBQUlya0IsQ0FBQyxhQUFEQSxDQUFDLGVBQURBLENBQUMsQ0FBRXVGLFFBQVEsRUFBRSxFQUFFOGUsV0FBVyxJQUFJcmtCLENBQUMsQ0FBQ3VGLFFBQVEsRUFBRTtNQUM5QyxJQUFJdkYsQ0FBQyxhQUFEQSxDQUFDLGVBQURBLENBQUMsQ0FBRXNrQixLQUFLLEVBQUVELFdBQVcsSUFBSXJrQixDQUFDLENBQUNza0IsS0FBSztNQUNwQyxJQUFNamhCLE1BQU0sR0FBRztRQUNiNmdCLFlBQVksRUFBRTtVQUNaVCxXQUFXLEVBQUVILFVBQVU7VUFDdkJhLGNBQWMsRUFBRWpUO1FBQ2xCLENBQUM7UUFDRDdOLE1BQU0sRUFBRSxRQUFRO1FBQ2hCM0ksYUFBYSxFQUFFO1VBQ2J1bEIsUUFBUSxFQUFFbUUsT0FBSSxDQUFDL3BCLFNBQVM7VUFDeEJrcUIsWUFBWSxFQUFFRjtRQUNoQjtNQUNGLENBQUM7TUFDRCxJQUFJRCxPQUFJLENBQUNsbEIsV0FBVyxFQUFFO1FBQ3BCa2xCLE9BQUksQ0FBQ2xsQixXQUFXLENBQUNtRSxNQUFNLENBQUM7UUFDeEIrZ0IsT0FBSSxDQUFDbGxCLFdBQVcsR0FBRyxJQUFJO01BQ3pCLENBQUMsTUFBTTtRQUNMLEtBQUssQ0FBQztNQUNSO0lBQUM7RUFDSDtFQUNNVyxnQkFBZ0JBLENBQUEsRUFBRztJQUFBLElBQUEya0IsT0FBQTtJQUFBLE9BQUFockIsaUJBQUE7TUFDdkIsSUFBTWlyQixnQkFBZ0IsR0FBR0QsT0FBSSxDQUFDdnFCLG1CQUFtQixFQUFFO01BQ25ELElBQUksQ0FBQ3VxQixPQUFJLENBQUMvcUIsV0FBVyxFQUFFLElBQUlnckIsZ0JBQWdCLEtBQUtELE9BQUksQ0FBQ3p2QixpQkFBaUIsQ0FBQ04sV0FBVyxFQUFFO1FBQ2xGLEtBQUssQ0FBQztRQUNOLE1BQU0rdkIsT0FBSSxDQUFDbnJCLFVBQVUsRUFBRTtNQUN6QixDQUFDLE1BQU07UUFDTCxJQUFJb3JCLGdCQUFnQixLQUFLRCxPQUFJLENBQUN6dkIsaUJBQWlCLENBQUNMLE9BQU8sRUFBRTtVQUN2RCxLQUFLLENBQUM7VUFDTixNQUFNOHZCLE9BQUksQ0FBQzNqQixlQUFlLEVBQUU7UUFDOUIsQ0FBQyxNQUFNLElBQUk0akIsZ0JBQWdCLEtBQUtELE9BQUksQ0FBQ3p2QixpQkFBaUIsQ0FBQ1AsSUFBSSxFQUFFO1VBQzNELEtBQUssQ0FBQztRQUNSLENBQUMsTUFBTTtVQUNMLE1BQU0sSUFBSW1JLEtBQUssNkNBQUE2WCxNQUFBLENBQTZDZ1EsT0FBSSxDQUFDL3FCLFdBQVcsRUFBRSwyQkFBQSthLE1BQUEsQ0FBd0JnUSxPQUFJLENBQUN2cUIsbUJBQW1CLEVBQUUsRUFBRztRQUNySTtNQUNGO0lBQUM7RUFDSDs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRU04RixlQUFlQSxDQUFBLEVBQUc7SUFBQSxJQUFBMmtCLE9BQUE7SUFBQSxPQUFBbHJCLGlCQUFBO01BQ3RCa3JCLE9BQUksQ0FBQ3RtQixPQUFPLENBQUMsV0FBVyxDQUFDO01BQ3pCc21CLE9BQUksQ0FBQ3hrQixPQUFPLEVBQUU7TUFDZCxNQUFNd2tCLE9BQUksQ0FBQ25VLHlCQUF5QixFQUFFO01BQ3RDLE1BQU1tVSxPQUFJLENBQUNwRyxtQkFBbUIsRUFBRTtNQUNoQyxLQUFLLENBQUM7SUFBQztFQUNUO0VBQ014ZSxpQkFBaUJBLENBQUEsRUFBRztJQUFBLElBQUE2a0IsT0FBQTtJQUFBLE9BQUFuckIsaUJBQUE7TUFDeEJtckIsT0FBSSxDQUFDdm1CLE9BQU8sQ0FBQyxhQUFhLENBQUM7TUFDM0J1bUIsT0FBSSxDQUFDemtCLE9BQU8sRUFBRTtNQUNkeWtCLE9BQUksQ0FBQ3hxQixTQUFTLENBQUMzRCxZQUFZLEdBQUcsSUFBSTtNQUNsQyxNQUFNbXVCLE9BQUksQ0FBQ3BVLHlCQUF5QixFQUFFO01BQ3RDLE1BQU1vVSxPQUFJLENBQUM5QixxQkFBcUIsRUFBRTtNQUNsQyxLQUFLLENBQUM7SUFBQztFQUNUO0VBQ00rQixjQUFjQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxPQUFBO0lBQUEsT0FBQXJyQixpQkFBQTtNQUNyQixLQUFLLENBQUM7TUFDTnFyQixPQUFJLENBQUM3SCxpQkFBaUIsR0FBRyxLQUFLO01BQzlCNkgsT0FBSSxDQUFDL0gsUUFBUSxFQUFFO01BQ2YsTUFBTStILE9BQUksQ0FBQzlrQixlQUFlLEVBQUU7SUFBQztFQUMvQjtFQUNBK2MsUUFBUUEsQ0FBQSxFQUFHO0lBQ1QsSUFBSSxDQUFDMEIsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hCLElBQU07TUFDSjdVO0lBQ0YsQ0FBQyxHQUFHM1csUUFBUSxDQUFDdUgsY0FBYyxFQUFFO0lBQzdCLElBQUlvUCxNQUFNLEVBQUU7TUFDVixJQUFNbWIsYUFBYSxHQUFHbmIsTUFBTSxDQUFDMkIsVUFBVSxDQUFDLElBQUksRUFBRTtRQUM1Q0Msa0JBQWtCLEVBQUU7TUFDdEIsQ0FBQyxDQUFDO01BQ0Z1WixhQUFhLENBQUNDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFcGIsTUFBTSxDQUFDaFQsS0FBSyxFQUFFZ1QsTUFBTSxDQUFDNEMsTUFBTSxDQUFDO0lBQzVEO0VBQ0Y7RUFDQTZFLFVBQVVBLENBQUEsRUFBRztJQUNYNFQsb0JBQW9CLENBQUMsSUFBSSxDQUFDQyx5QkFBeUIsQ0FBQztJQUNwRCxJQUFJLElBQUksQ0FBQ3RVLFFBQVEsRUFBRTtNQUNqQixJQUFJLENBQUNBLFFBQVEsQ0FBQ3VVLElBQUksSUFBSSxJQUFJLENBQUN2VSxRQUFRLENBQUN1VSxJQUFJLEVBQUU7TUFDMUMsSUFBSUMsTUFBTSxHQUFHLElBQUksQ0FBQ3hVLFFBQVEsQ0FBQ3lVLFNBQVMsSUFBSSxJQUFJLENBQUN6VSxRQUFRLENBQUN5VSxTQUFTLEVBQUU7TUFDakUsS0FBSyxDQUFDO01BQ04sSUFBSUQsTUFBTSxJQUFJQSxNQUFNLENBQUN0bUIsTUFBTSxFQUFFO1FBQzNCc21CLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDQyxLQUFLLElBQUlBLEtBQUssQ0FBQ0osSUFBSSxFQUFFLENBQUM7TUFDdkM7TUFDQSxJQUFJLENBQUN2VSxRQUFRLEdBQUcsSUFBSTtJQUN0QjtFQUNGOztFQUVBO0VBQ0F6USxPQUFPQSxDQUFBLEVBQUc7SUFDUixJQUFJLENBQUM4SSx1QkFBdUIsRUFBRTtJQUM5QixJQUFJLENBQUNOLGVBQWUsRUFBRTtJQUN0QixJQUFJLENBQUNHLGtCQUFrQixFQUFFO0lBQ3pCLElBQUksQ0FBQ0UseUJBQXlCLEVBQUU7RUFDbEM7RUFDQXdjLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2xCLElBQUksQ0FBQ3ZyQixhQUFhLEdBQUcsS0FBSztJQUMxQixJQUFJLENBQUNILFdBQVcsR0FBRyxLQUFLO0lBQ3hCLElBQUksQ0FBQ0Ysa0JBQWtCLEdBQUcsSUFBSSxDQUFDNUUsaUJBQWlCLENBQUNOLFdBQVc7SUFDNUQsSUFBSSxDQUFDdW9CLGlCQUFpQixHQUFHLEtBQUs7RUFDaEM7RUFDQTNNLG1DQUFtQ0EsQ0FBQSxFQUFHO0lBQ3BDLElBQUksSUFBSSxDQUFDQyw4QkFBOEIsRUFBRTtNQUN2Q2tWLFlBQVksQ0FBQyxJQUFJLENBQUNsViw4QkFBOEIsQ0FBQztNQUNqRCxJQUFJLENBQUNBLDhCQUE4QixHQUFHLElBQUk7SUFDNUM7RUFDRjtBQUNGO0FBQ0EsZUFBZTdjLE9BQU8ifQ==
