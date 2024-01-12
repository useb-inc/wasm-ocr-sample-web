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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NyLmpzIiwibmFtZXMiOlsiZGV0ZWN0b3IiLCJ1c2ViT0NSV0FTTVBhcnNlciIsInVzZWJPQ1JBUElQYXJzZXIiLCJpc1N1cHBvcnRXYXNtIiwibWVhc3VyZSIsInNpbWQiLCJ0aHJlYWRzIiwiSW1hZ2VVdGlsIiwiaW5zdGFuY2UiLCJVc2VCT0NSIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJOT05FIiwiTk9UX1JFQURZIiwiUkVBRFkiLCJDQVJEX0RFVEVDVF9TVUNDRVNTIiwiQ0FSRF9ERVRFQ1RfRkFJTEVEIiwiTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUyIsIk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCIsIk9DUl9SRUNPR05JWkVEIiwiT0NSX1JFQ09HTklaRURfV0lUSF9TU0EiLCJPQ1JfU1VDQ0VTUyIsIk9DUl9TVUNDRVNTX1dJVEhfU1NBIiwiT0NSX0ZBSUxFRCIsIkRPTkUiLCJOT1RfU1RBUlRFRCIsIlNUQVJURUQiLCJXQVJQSU5HIiwiQ1JPUFBJTkciLCJGQUxTRSIsIlRSVUUiLCJQUkVMT0FESU5HX1NUQVRVUyIsIk9DUl9TVEFUVVMiLCJNYXAiLCJJTl9QUk9HUkVTUyIsIk9iamVjdCIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZUVuY3J5cHRNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VFbmNyeXB0T3ZlcmFsbE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VNYXNrSW5mbyIsInVzZUZhY2VJbWFnZSIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwidXNlVG9wVUkiLCJ1c2VUb3BVSVRleHRNc2ciLCJ1c2VNaWRkbGVVSSIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJIiwidXNlQm90dG9tVUlUZXh0TXNnIiwidXNlUHJldmlld1VJIiwidXNlQ2FwdHVyZVVJIiwicHJlbG9hZGluZ1VJVGV4dE1zZyIsImZyYW1lQm9yZGVyU3R5bGUiLCJ3aWR0aCIsInJhZGl1cyIsInN0eWxlIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3Rfc3VjY2VzcyIsImRldGVjdF9mYWlsZWQiLCJtYW51YWxfY2FwdHVyZV9zdWNjZXNzIiwibWFudWFsX2NhcHR1cmVfZmFpbGVkIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwibWFza0ZyYW1lU3R5bGUiLCJjbGlwX2ZyYW1lIiwiYmFzZV9jb2xvciIsInVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUiLCJ1c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUiLCJzd2l0Y2hUb1NlcnZlclRocmVzaG9sZCIsInVzZUZvcmNlQ29tcGxldGVVSSIsImNhcHR1cmVCdXR0b25TdHlsZSIsInN0cm9rZV9jb2xvciIsInJlc291cmNlQmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGV2aWNlTGFiZWwiLCJ2aWRlb1RhcmdldElkIiwicm90YXRpb25EZWdyZWUiLCJtaXJyb3JNb2RlIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWEiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNzYVJldHJ5VHlwZSIsInNzYVJldHJ5UGl2b3QiLCJzc2FNYXhSZXRyeUNvdW50IiwidXNlRGVidWdBbGVydCIsImZvcmNlX3dhc21fcmVsb2FkIiwiZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZyIsInByZWxvYWRpbmciLCJvblByZWxvYWRlZCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJpc1ByZWxvYWRlZCIsInNob3dPQ1JMb2FkaW5nVUkiLCJfX3ByZWxvYWRpbmdTdGF0dXMiLCJfX2xvYWRSZXNvdXJjZXMiLCJfX3ByZWxvYWRlZCIsImhpZGVPQ1JMb2FkaW5nVUkiLCJpc0luaXRpYWxpemVkIiwiX19pbml0aWFsaXplZCIsImdldFByZWxvYWRpbmdTdGF0dXMiLCJpc0VuY3J5cHRNb2RlIiwiX19vcHRpb25zIiwiaXNDcmVkaXRDYXJkIiwiX19vY3JUeXBlIiwicHJlbG9hZGluZ1VJV3JhcCIsImdldE9DUkVsZW1lbnRzIiwiZGlzcGxheSIsImVuY3J5cHRSZXN1bHQiLCJyZXZpZXdfcmVzdWx0IiwiX19pc1N1cHBvcnRXYXNtIiwiaW5jbHVkZUxpc3QiLCJlbmNyeXB0ZWQiLCJvY3JfcmVzdWx0IiwiXyIsInRvUGFpcnMiLCJwaWNrIiwicmVkdWNlIiwiYWNjIiwiX3JlZiIsImtleSIsInZhbHVlIiwiX19lbmNyeXB0U2NhblJlc3VsdCIsIm9jcl9vcmlnaW5faW1hZ2UiLCJfb2JqZWN0U3ByZWFkIiwiZXhjbHVkZUxpc3QiLCJvbWl0IiwiX3JlZjIiLCJvY3JfbWFza2luZ19pbWFnZSIsIm9jcl9mYWNlX2ltYWdlIiwiZW5jcnlwdGVkX292ZXJhbGwiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJnZXRPQ1JFbmdpbmUiLCJfX09DUkVuZ2luZSIsImluaXQiLCJzZXR0aW5ncyIsImxpY2Vuc2VLZXkiLCJFcnJvciIsIl9fbGljZW5zZSIsIm1lcmdlZE9wdGlvbnMiLCJtZXJnZSIsInNldE9wdGlvbiIsIl9fd2luZG93RXZlbnRCaW5kIiwiX19kZXZpY2VJbmZvIiwiZ2V0T3NWZXJzaW9uIiwiZ2V0T3B0aW9uIiwiZ2V0T2NyVHlwZSIsInR5cGUiLCJfX29jclR5cGVOdW1iZXJUb1N0cmluZyIsImdldCIsImdldE9jclR5cGVOdW1iZXIiLCJzdHJpbmciLCJfX29jclN0cmluZ1RvVHlwZU51bWJlciIsImdldFVJT3JpZW50YXRpb24iLCJfX3VpT3JpZW50YXRpb24iLCJnZXRWaWRlb09yaWVudGF0aW9uIiwiX192aWRlb09yaWVudGF0aW9uIiwiY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUiLCJfdGhpczIiLCJfX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlIiwibGF0ZW5jeVBlcjEwMG1zIiwibWVhc3VyZVJlcG9ydCIsIl9fZGVidWciLCJwYXJzZUZsb2F0Iiwic3RhcnRPQ1IiLCJvblN1Y2Nlc3MiLCJvbkZhaWx1cmUiLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwiX3RoaXMzIiwib25JblByb2dyZXNzQ2hhbmdlIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX19zc2FNb2RlIiwiaW5kZXhPZiIsIl9fb25TdWNjZXNzIiwiX19vbkZhaWx1cmUiLCJfX29uSW5Qcm9ncmVzc0NoYW5nZSIsIl9fdG9wVUkiLCJ0b3BVSSIsIl9fbWlkZGxlVUkiLCJtaWRkbGVVSSIsIl9fYm90dG9tVUkiLCJib3R0b21VSSIsIl9fY2hhbmdlU3RhZ2UiLCJfX3ByZXByb2Nlc3MiLCJfX3NldHVwRG9tRWxlbWVudHMiLCJfX3ByZWxvYWRpbmdXYXNtIiwiX19zdGFydFNjYW5TZXJ2ZXIiLCJfX3N0YXJ0U2Nhbldhc20iLCJlIiwic3RvcE9DUiIsImNsZWFudXAiLCJfX2Nsb3NlQ2FtZXJhIiwic2V0SWdub3JlQ29tcGxldGUiLCJ2YWwiLCJlbmNyeXB0IiwicGxhaW5TdHIiLCJyZXN0YXJ0T0NSIiwib2NyVHlwZSIsIl9hcmd1bWVudHMyIiwiX3RoaXM0IiwiaXNTd2l0Y2hNb2RlIiwiX193YWl0UHJlbG9hZGVkIiwiX3RoaXM1Iiwid2FpdGluZ1JldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNoZWNrIiwic2V0VGltZW91dCIsImNvbnZlcnRUeXBlVG9OdW1iZXIiLCJvcHRpb24iLCJpc05hTiIsInBhcnNlSW50IiwiY29udmVydFR5cGVUb0Zsb2F0IiwiX3RoaXNfIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwic2tpcFRvdWNoQWN0aW9uZm9yWm9vbSIsImV2IiwidG91Y2hlcyIsInByZXZlbnREZWZhdWx0Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJvbmJlZm9yZXVubG9hZCIsIl9fcGFnZUVuZCIsImhhbmRsZVJlc2l6ZSIsIl9yZWY0IiwiX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUiLCJfX3Rocm90dGxpbmdSZXNpemVUaW1lciIsImFwcGx5IiwiX190aHJvdHRsaW5nUmVzaXplRGVsYXkiLCJtc2ciLCJfX3NsZWVwIiwibXMiLCJfX2Jsb2JUb0Jhc2U2NCIsImJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsIl9fYmFzZTY0dG9CbG9iIiwiYmFzZTY0IiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsIm1pbWVTdHJpbmciLCJhYiIsIkFycmF5QnVmZmVyIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwiX19jb21wcmVzZUJhc2U2NEltYWdlIiwib3B0aW9ucyIsImNvbnN0YW50TnVtYmVyIiwiX3RoaXM2IiwiYmxvYkZpbGUiLCJjb21wcmVzc2VkIiwiY29tcHJlc3NJbWFnZSIsImNvbXByZXNzaW9uUmF0aW8iLCJNYXRoIiwicm91bmQiLCJzaXplIiwiX19nZXRTdHJpbmdPbldhc21IZWFwIiwibGVuZ3RoQnl0ZXMiLCJsZW5ndGhCeXRlc1VURjgiLCJfX3N0cmluZ09uV2FzbUhlYXAiLCJfbWFsbG9jIiwic3RyaW5nVG9VVEY4Iiwib2NyUmVzdWx0Iiwic3RyaW5nT25XYXNtSGVhcCIsInRvU3RyaW5nIiwianNvblN0cmluZyIsIl9mcmVlIiwiX19zZXRWaWRlb1Jlc29sdXRpb24iLCJ2aWRlb0VsZW1lbnQiLCJfdGhpczciLCJpc1N1cHBvcnRlZFJlc29sdXRpb24iLCJyZXNvbHV0aW9uVGV4dCIsIl9fY2FtU2V0Q29tcGxldGUiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJzcmNPYmplY3QiLCJfX3ZpZGVvV2lkdGgiLCJfX3ZpZGVvSGVpZ2h0IiwiX19nZXRTY2FubmVyQWRkcmVzcyIsIl9fb2NyVHlwZUxpc3QiLCJpbmNsdWRlcyIsImFkZHJlc3MiLCJkZXN0cm95Q2FsbGJhY2siLCJnZXRJRENhcmRTY2FubmVyIiwiZGVzdHJveUlEQ2FyZFNjYW5uZXIiLCJnZXRQYXNzcG9ydFNjYW5uZXIiLCJkZXN0cm95UGFzc3BvcnRTY2FubmVyIiwiZ2V0QWxpZW5TY2FubmVyIiwiZGVzdHJveUFsaWVuU2Nhbm5lciIsImdldENyZWRpdFNjYW5uZXIiLCJkZXN0cm95Q3JlZGl0U2Nhbm5lciIsIl9fbWF4UmV0cnlDb3VudEdldEFkZHJlc3MiLCJfX3JldHJ5Q291bnRHZXRBZGRyZXNzIiwiX19nZXRCdWZmZXIiLCJfX0J1ZmZlciIsIl9fcmVzb2x1dGlvbldpZHRoIiwiX19yZXNvbHV0aW9uSGVpZ2h0IiwiX19yZXN1bHRCdWZmZXIiLCJfX21hc2tJbmZvUmVzdWx0QnVmIiwiX19nZXRJbWFnZUJhc2U2NCIsIm1hc2tNb2RlIiwiaW1nTW9kZSIsIl9hcmd1bWVudHMzIiwiX3RoaXM4IiwiaW1nVHlwZSIsImVuY29kZUpwZ0RldGVjdGVkRnJhbWVJbWFnZSIsImVuY29kZUpwZ0RldGVjdGVkUGhvdG9JbWFnZSIsImpwZ1NpemUiLCJnZXRFbmNvZGVkSnBnU2l6ZSIsImpwZ1BvaW50ZXIiLCJnZXRFbmNvZGVkSnBnQnVmZmVyIiwicmVzdWx0VmlldyIsIkhFQVA4IiwiYnVmZmVyIiwiZGVzdHJveUVuY29kZWRKcGciLCJfX2Rlc3Ryb3lCdWZmZXIiLCJfX2Rlc3Ryb3lSZXN1bHRCdWZmZXIiLCJfX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlciIsIl9fZGVzdHJveVByZXZJbWFnZSIsIl9fUHJldkltYWdlIiwiX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCIsIl9fZGVzdHJveVNjYW5uZXJBZGRyZXNzIiwiX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrIiwiX19pc1ZpZGVvUmVzb2x1dGlvbkNvbXBhdGlibGUiLCJfdGhpczkiLCJfX2dldFJvdGF0aW9uRGVncmVlIiwiX19nZXRNaXJyb3JNb2RlIiwiX19jcm9wSW1hZ2VGcm9tVmlkZW8iLCJfdGhpczEwIiwiY2FsY1Jlc29sdXRpb25fdyIsImNhbGNSZXNvbHV0aW9uX2giLCJ2aWRlbyIsImNhbnZhcyIsInJvdGF0aW9uQ2FudmFzIiwiY2FsY0NhbnZhcyIsImNhbGNWaWRlb1dpZHRoIiwiY2FsY1ZpZGVvSGVpZ2h0IiwiY2FsY1ZpZGVvQ2xpZW50V2lkdGgiLCJjbGllbnRXaWR0aCIsImNhbGNWaWRlb0NsaWVudEhlaWdodCIsImNsaWVudEhlaWdodCIsImNhbGNDcm9wSW1hZ2VTaXplV2lkdGgiLCJfX2Nyb3BJbWFnZVNpemVXaWR0aCIsImNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0IiwiX19jcm9wSW1hZ2VTaXplSGVpZ2h0IiwiY2FsY1ZpZGVvT3JpZW50YXRpb24iLCJpc0FsaWVuQmFjayIsIl9faXNSb3RhdGVkOTBvcjI3MCIsImNhbGNNYXhTV2lkdGgiLCJjYWxjTWF4U0hlaWdodCIsInN4Iiwic3kiLCJyYXRpbyIsInNXaWR0aCIsIm1pbiIsInNIZWlnaHQiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjYWxjQ29udGV4dCIsImdldENvbnRleHQiLCJ3aWxsUmVhZEZyZXF1ZW50bHkiLCJkcmF3SW1hZ2UiLCJpbWdEYXRhIiwiaW1nRGF0YVVybCIsImdldEltYWdlRGF0YSIsInRvRGF0YVVSTCIsIl9fcm90YXRlIiwiZGVncmVlIiwiaW1nIiwiSW1hZ2UiLCJ0ZW1wQ2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwidGVtcENvbnRleHQiLCJwb3NpdGlvbiIsImhlaWdodCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsIlBJIiwibmV3SW1hZ2VEYXRhIiwicmVzdG9yZSIsIl9faXNDYXJkYm94RGV0ZWN0ZWQiLCJfYXJndW1lbnRzNCIsIl90aGlzMTEiLCJib3hUeXBlIiwicmV0cnlJbWciLCJzZXQiLCJrb3IiLCJhbGllbiIsInBhc3Nwb3J0IiwiZGV0ZWN0X2lkY2FyZF9vcHQiLCJkZXRlY3RfaWRjYXJkIiwibWVzc2FnZSIsIl9fc3RhcnRSZWNvZ25pdGlvbiIsInNzYU1vZGUiLCJpc1NldElnbm9yZUNvbXBsZXRlIiwiX3RoaXMxMiIsInJlc3VsdEJ1ZmZlciIsInJlY29nbml0aW9uIiwiX3JlZjciLCJfb2NyUmVzdWx0IiwiX29jclJlc3VsdDIiLCJzY2FuSURDYXJkIiwic2NhblBhc3Nwb3J0Iiwic2NhbkFsaWVuIiwic2NhbkFsaWVuQmFjayIsInNjYW5DcmVkaXQiLCJfX2NzdlRvT2JqZWN0IiwiY29tcGxldGUiLCJfX21hbnVhbE9DUlJldHJ5Q291bnQiLCJfX21hbnVhbE9DUk1heFJldHJ5Q291bnQiLCJxdWV1ZUlkeCIsIl9fZGV0ZWN0ZWRDYXJkUXVldWUiLCJfX2JsdXJDYXB0dXJlQnV0dG9uIiwiX19zZXRTdHlsZSIsIl94Iiwib2NySW1hZ2VNb2RlIiwiT0NSX0lNR19NT0RFIiwib3JpZ2luSW1hZ2UiLCJPQ1JfSU1HX01BU0tfTU9ERSIsIm1hc2tJbWFnZSIsImZhY2VJbWFnZSIsIl9fc3RhcnRUcnV0aCIsInJlamVjdCIsInNjYW5UcnV0aCIsInN0ciIsInBhaXJzIiwib2JqIiwicGFpciIsIl9fZ2V0TWFza0luZm8iLCJtYXNrSW5mb1Jlc3VsdEJ1ZiIsImdldE1hc2tSZWN0IiwiX19zdGFydFRydXRoUmV0cnkiLCJfdGhpczEzIiwiX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyIiwiX3RoaXMxNCIsIl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyIiwiX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyIiwiX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbiIsIl90aGlzMTUiLCJpc1Bhc3Nwb3J0IiwiX19zZXR1cFZpZGVvIiwiX19zdHJlYW0iLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJwbGF5IiwiX19hZGp1c3RTdHlsZSIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwibmFtZSIsImVycm9yTWVzc2FnZSIsIl9fb25GYWlsdXJlUHJvY2VzcyIsInN0b3BTdHJlYW0iLCJfX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCIsImVsIiwiYXNzaWduIiwiX19jaGFuZ2VPQ1JTdGF0dXMiLCJfX29jclN0YXR1cyIsIl9hcmd1bWVudHM1IiwiX3RoaXMxNiIsImZvcmNlVXBkYXRlIiwicmVjb2duaXplZEltYWdlIiwiX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwIiwiX19pblByb2dyZXNzU3RlcCIsImd1aWRlQm94IiwibWFza0JveFdyYXAiLCJjYXB0dXJlQnV0dG9uIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJTdHlsZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiX21hc2tCb3hXcmFwJHF1ZXJ5U2VsIiwicXVlcnlTZWxlY3RvciIsIl9jYXB0dXJlQnV0dG9uJHF1ZXJ5UyIsIm9jck1vZGUiLCJjYWxsIiwiX191cGRhdGVQcmV2aWV3VUkiLCJfX2hpZGVQcmV2aWV3VUkiLCJwcmV2aWV3VUlXcmFwIiwicHJldmlld0ltYWdlIiwiaW1nU3R5bGUiLCJjb250ZXh0IiwiX19nZXRJbnB1dERldmljZXMiLCJfdGhpczE3IiwibWVkaWFEZXZpY2VzIiwiZGV2aWNlcyIsImVudW1lcmF0ZURldmljZXMiLCJjYW1lcmEiLCJkZXZpY2UiLCJraW5kIiwiSW5wdXREZXZpY2VJbmZvIiwiZ2V0Q2FwYWJpbGl0aWVzIiwiX2NhcCRmYWNpbmdNb2RlIiwiY2FwIiwiZmFjaW5nTW9kZSIsIl9fZmFjaW5nTW9kZUNvbnN0cmFpbnQiLCJfZGV2aWNlJGxhYmVsIiwiaXNVbHRyYUNhbWVyYVJlZyIsImxhYmVsIiwicHVzaCIsImRldmljZUlkIiwiUmVmZXJlbmNlRXJyb3IiLCJfZGV2aWNlJGxhYmVsMiIsImlzQmFja0NhbWVyYVJlZyIsImNvbmNhdCIsImNoZWNrVUlPcmllbnRhdGlvbiIsImN1cnJlbnQiLCJvY3IiLCJpc0NoYW5nZWQiLCJfX3ByZXZVaU9yaWVudGF0aW9uIiwiX19jbGVhckN1c3RvbVVJIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwiX3RoaXMxOCIsInZpZGVvV3JhcCIsImd1aWRlQm94V3JhcCIsInByZXZlbnRUb0ZyZWV6ZVZpZGVvIiwiY3VzdG9tVUlXcmFwIiwiY2FwdHVyZVVJV3JhcCIsImNhcHR1cmVVSSIsInByZXZpZXdVSSIsInN3aXRjaFVJV3JhcCIsInN3aXRjaFVJIiwicHJlbG9hZGluZ1VJIiwicmVtb3ZlIiwib2NyU3R5bGUiLCJ3cmFwU3R5bGUiLCJtYXJnaW4iLCJvdmVyZmxvdyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCIsImFwcGVuZENoaWxkIiwibWFza19mcmFtZSIsInZpZGVvU3R5bGUiLCJyb3RhdGVDc3MiLCJtaXJyb3JDc3MiLCJyb3RhdGVBbmRNaXJyb3JDc3MiLCJ0cmFuc2Zvcm0iLCJjYW52YXNTdHlsZSIsImxlZnQiLCJ0b3AiLCJib3JkZXIiLCJyaWdodCIsImJvdHRvbSIsImN1c3RvbVVJV3JhcFN0eWxlIiwiY2FwdHVyZVVJV3JhcFN0eWxlIiwiY3Vyc29yIiwiY2FwdHVyZUJ1dHRvblNyY1NWRyIsIl9fb25DbGlja0NhcHR1cmVCdXR0b24iLCJwcmV2aWV3VUlXcmFwU3R5bGUiLCJzd2l0Y2hVSVdyYXBTdHlsZSIsInN3aXRjaEhUTUwiLCJzd2l0Y2hDaGVja2JveCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiX19vbkNsaWNrU3dpdGNoVUkiLCJfcmVmMTAiLCJldmVudCIsInRhcmdldCIsImNoZWNrZWQiLCJfeDIiLCJvbmNlIiwicHJlbG9hZGluZ1VJV3JhcFN0eWxlIiwiX19pbml0U3R5bGUiLCJfX29jciIsIl9fY2FudmFzIiwiX19yb3RhdGlvbkNhbnZhcyIsIl9fdmlkZW8iLCJfX3ZpZGVvV3JhcCIsIl9fZ3VpZGVCb3giLCJfX2d1aWRlQm94V3JhcCIsIl9fbWFza0JveFdyYXAiLCJfX3ByZXZlbnRUb0ZyZWV6ZVZpZGVvIiwiX19jdXN0b21VSVdyYXAiLCJfX2NhcHR1cmVVSVdyYXAiLCJfX2NhcHR1cmVVSSIsIl9fY2FwdHVyZUJ1dHRvbiIsIl9fcHJldmlld1VJV3JhcCIsIl9fcHJldmlld1VJIiwiX19wcmV2aWV3SW1hZ2UiLCJfX3N3aXRjaFVJV3JhcCIsIl9fc3dpdGNoVUkiLCJfX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJfdGhpczE5IiwiY29uc3RyYWludFdpZHRoIiwiY29uc3RyYWludEhlaWdodCIsImlkZWFsIiwiY29uc3RyYWludHMiLCJhdWRpbyIsInpvb20iLCJmb2N1c01vZGUiLCJ3aGl0ZUJhbGFuY2VNb2RlIiwiZ2V0VXNlck1lZGlhIiwic3RyZWFtIiwic3RyZWFtU2V0dGluZ3MiLCJnZXRWaWRlb1RyYWNrcyIsImdldFNldHRpbmdzIiwiYXNwZWN0UmF0aW8iLCJfdGhpczIwIiwiYmFzZVdpZHRoIiwiYmFzZUhlaWdodCIsInNjYW5uZXJGcmFtZVJhdGlvIiwiZ3VpZGVCb3hXaWR0aCIsImd1aWRlQm94SGVpZ2h0IiwiY2FsY09jckNsaWVudFdpZHRoIiwiY2FsY09jckNsaWVudEhlaWdodCIsImd1aWRlQm94UmF0aW9CeVdpZHRoIiwiX19ndWlkZUJveFJhdGlvQnlXaWR0aCIsInZpZGVvUmF0aW9CeUhlaWdodCIsIl9fdmlkZW9SYXRpb0J5SGVpZ2h0IiwicmVkdWNlZEd1aWRlQm94V2lkdGgiLCJfX2d1aWRlQm94UmVkdWNlUmF0aW8iLCJyZWR1Y2VkR3VpZGVCb3hIZWlnaHQiLCJwYWRkaW5nIiwidmlkZW9Jbm5lckdhcCIsImJhY2tncm91bmRDb2xvciIsIm1hc2tCb3hJbm5lciIsInIiLCJtYXNrQm94SW5uZXJXaWR0aCIsIm1hc2tCb3hJbm5lckhlaWdodCIsIl90aGlzMjEiLCJfX2NhbGNHdWlkZUJveENyaXRlcmlhIiwiYSIsImIiLCJuZXdWaWRlb1dpZHRoIiwibmV3VmlkZW9IZWlnaHQiLCJuZXdWaWRlb1JhdGlvQnlXaWR0aCIsIm5ld1ZpZGVvUmF0aW9CeUhlaWdodCIsImNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyIsIl9fY2FsY1N1bU9mSGVpZ2h0Q2hpbGROb2RlcyIsImNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0IiwiY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSIsInBhZGRpbmdUb3AiLCJiYXNlbGluZSIsInN1bSIsIml0ZW0iLCJjaGlsZE5vZGVzIiwic3RvcFNjYW4iLCJfdGhpczIyIiwiX19yZXNvdXJjZXNMb2FkZWQiLCJfX2lzU3VwcG9ydFNpbWQiLCJlbnZJbmZvIiwib3MiLCJvc1NpbXBsZSIsInVzZWJPQ1JFbnZJbmZvIiwic2RrU3VwcG9ydEVudiIsInBvc3RmaXgiLCJ1cmwiLCJmZXRjaCIsImhyZWYiLCJ0aGVuIiwicmVzIiwidGV4dCIsInJlZ2V4Iiwic291cmNlIiwicmVwbGFjZSIsIlJlZ0V4cCIsImV2YWwiLCJvblJ1bnRpbWVJbml0aWFsaXplZCIsIl9yZWYxMSIsIl94MyIsIl9fc3RhcnRTY2FuV2FzbUltcGwiLCJfdGhpczIzIiwiX19kZXRlY3RlZCIsIl9fYWRkcmVzcyIsIl9fc3NhUmV0cnlDb3VudCIsInNjYW4iLCJfcmVmMTIiLCJpc0RldGVjdGVkQ2FyZCIsInNzYVJlc3VsdCIsInNzYVJlc3VsdExpc3QiLCJtYXNrSW5mbyIsInJlc29sdXRpb25fdyIsInJlc29sdXRpb25faCIsIl9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlIiwicmV0cnlTdGFydERhdGUiLCJGQUtFIiwiUkVBTCIsIkVOU0VNQkxFIiwiaXNDb21wbGV0ZWQiLCJfbG9vcCIsImV4ZWN1dGUiLCJfcmVmMTMiLCJfcmV0IiwicmV0cnlXb3JraW5nVGltZSIsImxlZ2FjeUZvcm1hdCIsIm5ld0Zvcm1hdCIsInBhcnNlT2NyUmVzdWx0Iiwib2NyX3R5cGUiLCJzc2FfbW9kZSIsIl9fY29tcHJlc3NJbWFnZXMiLCJvY3JfZGF0YSIsIl9fb25TdWNjZXNzUHJvY2VzcyIsIl9fcmVjb3ZlcmVkIiwiX3RoaXMyNCIsInJlc2l6ZVJhdGlvIiwiZGVmYXVsdE9wdGlvbnMiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsImNvbnZlcnRTaXplIiwidGFyZ2V0Q29tcHJlc3NWb2x1bWUiLCJtYXNraW5nSW1hZ2VPcHRpb25zIiwicXVhbGl0eSIsIl9fcmVxdWVzdEdldEFQSVRva2VuIiwiY3JlZGVudGlhbCIsImF1dGhTZXJ2ZXJJbmZvIiwiYmFzZVVybCIsImJvZHkiLCJtZXRob2QiLCJqc29uIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJ0b2tlbiIsImNhdGNoIiwiZXJyIiwiX19yZXF1ZXN0U2VydmVyT0NSIiwiX3RoaXMyNSIsIl9yZWYxNCIsIm9jclNlcnZlckJhc2VVcmwiLCJhcGlUb2tlbiIsIm15SGVhZGVycyIsIkhlYWRlcnMiLCJhcHBlbmQiLCJwYXJhbSIsImltYWdlX2Jhc2U2NCIsIm1hc2tfbW9kZSIsImZhY2VfbW9kZSIsInJhdyIsInJlcXVlc3RPcHRpb25zIiwicmVkaXJlY3QiLCJfeDQiLCJfeDUiLCJfX3N0YXJ0U2NhblNlcnZlckltcGwiLCJfdGhpczI2IiwiX3JlZjE1IiwiX3RoaXMyNiRfX2NhcHR1cmVCdXR0IiwiX3JlZjE2IiwiYmFzZTY0SW1hZ2VSZXN1bHQiLCJfX2RlYnVnTW9kZSIsIm9jcl9hcGlfcmVzcG9uc2UiLCJfb2NyUmVzdWx0MyIsInJlc3VsdENvZGUiLCJyZXN1bHRNZXNzYWdlIiwic2Nhbm5lcl90eXBlIiwicmVzdWx0X2NvZGUiLCJyZXN1bHREZXRhaWwiLCJfeDYiLCJfeDciLCJpbWdEYXRhVVJMIiwibGltaXRTYXZlSW1hZ2VDb3VudCIsInNoaWZ0IiwiX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NCIsIl90aGlzMjciLCJhcGlfcmVzcG9uc2UiLCJyZXN1bHRfbWVzc2FnZSIsIl90aGlzMjgiLCJlcnJvckRldGFpbCIsInN0YWNrIiwiZXJyb3JfZGV0YWlsIiwiX3RoaXMyOSIsInByZWxvYWRpbmdTdGF0dXMiLCJfdGhpczMwIiwiX3RoaXMzMSIsIl9fcmVjb3ZlcnlTY2FuIiwiX3RoaXMzMiIsImNhbnZhc0NvbnRleHQiLCJjbGVhclJlY3QiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIl9fcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQiLCJzdG9wIiwidHJhY2tzIiwiZ2V0VHJhY2tzIiwiZm9yRWFjaCIsInRyYWNrIiwicmVzdG9yZUluaXRpYWxpemUiLCJjbGVhclRpbWVvdXQiXSwic291cmNlcyI6WyJvY3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGdsb2JhbC1tb2R1bGUgKi9cbmltcG9ydCBkZXRlY3RvciBmcm9tICcuL2hlbHBlcnMvZGV0ZWN0b3IuanMnO1xuaW1wb3J0IHVzZWJPQ1JXQVNNUGFyc2VyIGZyb20gJy4vaGVscGVycy91c2ViLW9jci13YXNtLXBhcnNlci5qcyc7XG5pbXBvcnQgdXNlYk9DUkFQSVBhcnNlciBmcm9tICcuL2hlbHBlcnMvdXNlYi1vY3ItYXBpLXBhcnNlci5qcyc7XG5pbXBvcnQgeyBpc1N1cHBvcnRXYXNtLCBtZWFzdXJlLCBzaW1kLCB0aHJlYWRzIH0gZnJvbSAnLi9oZWxwZXJzL3dhc20tZmVhdHVyZS1kZXRlY3QuanMnO1xuaW1wb3J0IEltYWdlVXRpbCBmcm9tICcuL2hlbHBlcnMvaW1hZ2UtdXRpbC5qcyc7XG5sZXQgaW5zdGFuY2U7XG5jbGFzcyBVc2VCT0NSIHtcbiAgSU5fUFJPR1JFU1MgPSB7XG4gICAgTk9ORTogJ25vbmUnLFxuICAgIE5PVF9SRUFEWTogJ25vdF9yZWFkeScsXG4gICAgUkVBRFk6ICdyZWFkeScsXG4gICAgQ0FSRF9ERVRFQ1RfU1VDQ0VTUzogJ2RldGVjdF9zdWNjZXNzJyxcbiAgICBDQVJEX0RFVEVDVF9GQUlMRUQ6ICdkZXRlY3RfZmFpbGVkJyxcbiAgICBNQU5VQUxfQ0FQVFVSRV9TVUNDRVNTOiAnbWFudWFsX2NhcHR1cmVfc3VjY2VzcycsXG4gICAgTUFOVUFMX0NBUFRVUkVfRkFJTEVEOiAnbWFudWFsX2NhcHR1cmVfZmFpbGVkJyxcbiAgICBPQ1JfUkVDT0dOSVpFRDogJ3JlY29nbml6ZWQnLFxuICAgIE9DUl9SRUNPR05JWkVEX1dJVEhfU1NBOiAncmVjb2duaXplZF93aXRoX3NzYScsXG4gICAgT0NSX1NVQ0NFU1M6ICdvY3Jfc3VjY2VzcycsXG4gICAgT0NSX1NVQ0NFU1NfV0lUSF9TU0E6ICdvY3Jfc3VjY2Vzc193aXRoX3NzYScsXG4gICAgT0NSX0ZBSUxFRDogJ29jcl9mYWlsZWQnXG4gIH07XG4gIE9DUl9TVEFUVVMgPSB7XG4gICAgTk9UX1JFQURZOiAtMSxcbiAgICBSRUFEWTogMCxcbiAgICBPQ1JfU1VDQ0VTUzogMSxcbiAgICBET05FOiAyXG4gIH07XG4gIFBSRUxPQURJTkdfU1RBVFVTID0ge1xuICAgIE5PVF9TVEFSVEVEOiAtMSxcbiAgICBTVEFSVEVEOiAwLFxuICAgIERPTkU6IDFcbiAgfTtcbiAgT0NSX0lNR19NT0RFID0ge1xuICAgIFdBUlBJTkc6IDAsXG4gICAgQ1JPUFBJTkc6IDEsXG4gICAgTk9ORTogMlxuICB9O1xuICBPQ1JfSU1HX01BU0tfTU9ERSA9IHtcbiAgICBGQUxTRTogMCxcbiAgICBUUlVFOiAxXG4gIH07XG5cbiAgLyoqIHB1YmxpYyBwcm9wZXJ0aWVzICovXG5cbiAgLyoqIHByaXZhdGUgcHJvcGVydGllcyAqL1xuICBfX2RlYnVnTW9kZSA9IGZhbHNlO1xuICBfX09DUkVuZ2luZSA9IG51bGw7XG4gIF9faXNTdXBwb3J0V2FzbSA9IGZhbHNlO1xuICBfX2lzU3VwcG9ydFNpbWQgPSBmYWxzZTtcbiAgX19pbml0aWFsaXplZCA9IGZhbHNlO1xuICBfX3ByZWxvYWRlZCA9IGZhbHNlO1xuICBfX3ByZWxvYWRpbmdTdGF0dXMgPSB0aGlzLlBSRUxPQURJTkdfU1RBVFVTLk5PVF9TVEFSVEVEO1xuICBfX2xpY2Vuc2U7XG4gIF9fb2NyVHlwZTtcbiAgX19zc2FNb2RlID0gZmFsc2U7XG4gIF9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLk5PVF9SRUFEWTtcbiAgX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID0gMTA7XG4gIF9fbWFudWFsT0NSUmV0cnlDb3VudCA9IDA7XG4gIF9fc3NhUmV0cnlDb3VudCA9IDA7XG4gIF9fZGV0ZWN0ZWRDYXJkUXVldWUgPSBbXTtcbiAgX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NCA9IFtdO1xuICBfX29uU3VjY2VzcyA9IG51bGw7XG4gIF9fb25GYWlsdXJlID0gbnVsbDtcbiAgX19vbkluUHJvZ3Jlc3NDaGFuZ2UgPSBudWxsO1xuICBfX29jclR5cGVMaXN0ID0gWydpZGNhcmQnLCAnZHJpdmVyJywgJ3Bhc3Nwb3J0JywgJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnYWxpZW4nLCAnYWxpZW4tYmFjaycsICdjcmVkaXQnLCAnaWRjYXJkLXNzYScsICdkcml2ZXItc3NhJywgJ3Bhc3Nwb3J0LXNzYScsICdmb3JlaWduLXBhc3Nwb3J0LXNzYScsICdhbGllbi1zc2EnXTtcbiAgX19vY3JUeXBlTnVtYmVyVG9TdHJpbmcgPSBuZXcgTWFwKFtbJzEnLCAnaWRjYXJkJ10sIFsnMicsICdkcml2ZXInXSwgWyczJywgJ3Bhc3Nwb3J0J10sIFsnNCcsICdmb3JlaWduLXBhc3Nwb3J0J10sIFsnNScsICdhbGllbiddLCBbJzUtMScsICdhbGllbiddLCBbJzUtMicsICdhbGllbiddLCBbJzUtMycsICdhbGllbiddXSk7XG4gIF9fb2NyU3RyaW5nVG9UeXBlTnVtYmVyID0gbmV3IE1hcChbWydpZGNhcmQnLCAnMSddLCBbJ2RyaXZlcicsICcyJ10sIFsncGFzc3BvcnQnLCAnMyddLCBbJ2ZvcmVpZ24tcGFzc3BvcnQnLCAnNCddLCBbJ2FsaWVuJywgJzUnXSwgWydhbGllbicsICc1LTEnXSwgWydhbGllbicsICc1LTInXSwgWydhbGllbicsICc1LTMnXV0pO1xuICBfX3BhZ2VFbmQgPSBmYWxzZTtcbiAgX19vY3I7XG4gIF9fY2FudmFzO1xuICBfX3JvdGF0aW9uQ2FudmFzO1xuICBfX3ZpZGVvO1xuICBfX3ZpZGVvV3JhcDtcbiAgX19ndWlkZUJveDtcbiAgX19ndWlkZUJveFdyYXA7XG4gIF9fbWFza0JveFdyYXA7XG4gIF9fcHJldmVudFRvRnJlZXplVmlkZW87XG4gIF9fY3VzdG9tVUlXcmFwO1xuICBfX3RvcFVJO1xuICBfX21pZGRsZVVJO1xuICBfX2JvdHRvbVVJO1xuICBfX3ByZXZpZXdVSVdyYXA7XG4gIF9fcHJldmlld1VJO1xuICBfX3ByZXZpZXdJbWFnZTtcbiAgX19jYXB0dXJlVUlXcmFwO1xuICBfX2NhcHR1cmVVSTtcbiAgX19zd2l0Y2hVSVdyYXA7XG4gIF9fc3dpdGNoVUk7XG4gIF9fY2FwdHVyZUJ1dHRvbjtcbiAgX19hZGRyZXNzID0gMDtcbiAgX19kZXRlY3RlZCA9IGZhbHNlO1xuICBfX3JlY292ZXJlZCA9IGZhbHNlO1xuICBfX0J1ZmZlciA9IG51bGw7XG4gIF9fcmVzdWx0QnVmZmVyID0gbnVsbDtcbiAgX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IG51bGw7XG4gIF9fUHJldkltYWdlID0gbnVsbDtcbiAgX19zdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgX19jYW1TZXRDb21wbGV0ZSA9IGZhbHNlO1xuICBfX3Jlc29sdXRpb25XaWR0aCA9IDA7XG4gIF9fcmVzb2x1dGlvbkhlaWdodCA9IDA7XG4gIF9fdmlkZW9XaWR0aCA9IDA7XG4gIF9fdmlkZW9IZWlnaHQgPSAwO1xuICBfX3Jlc291cmNlc0xvYWRlZCA9IGZhbHNlO1xuICBfX2ludGVydmFsVGltZXI7XG4gIF9fY2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcjtcbiAgX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgPSAwO1xuICBfX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkO1xuICBfX3N0cmVhbTtcbiAgX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrID0gbnVsbDtcbiAgX19mYWNpbmdNb2RlQ29uc3RyYWludCA9ICdlbnZpcm9ubWVudCc7XG4gIF9fdWlPcmllbnRhdGlvbiA9ICcnO1xuICBfX3ByZXZVaU9yaWVudGF0aW9uID0gJyc7XG4gIF9fdmlkZW9PcmllbnRhdGlvbiA9ICcnO1xuICBfX3Rocm90dGxpbmdSZXNpemVUaW1lciA9IG51bGw7XG4gIF9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5ID0gNTAwO1xuICBfX21heFJldHJ5Q291bnRHZXRBZGRyZXNzID0gMzAwOyAvLyDsnoTsi5xcbiAgX19yZXRyeUNvdW50R2V0QWRkcmVzcyA9IDA7IC8vIOyehOyLnFxuICBfX2RldmljZUluZm87XG4gIF9faXNSb3RhdGVkOTBvcjI3MCA9IGZhbHNlO1xuICBfX2luUHJvZ3Jlc3NTdGVwID0gdGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFk7XG4gIF9fcHJldmlvdXNJblByb2dyZXNzU3RlcCA9IHRoaXMuSU5fUFJPR1JFU1MuTk9ORTtcbiAgX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSBmYWxzZTtcbiAgX19ndWlkZUJveFJhdGlvQnlXaWR0aCA9IDEuMDsgLy8g7IiY7KCV67aI6rCAXG4gIF9fdmlkZW9SYXRpb0J5SGVpZ2h0ID0gMC45OyAvLyDsiJjsoJXrtojqsIBcbiAgX19ndWlkZUJveFJlZHVjZVJhdGlvID0gMC44OyAvLyDsiJjsoJXrtojqsIBcbiAgX19jcm9wSW1hZ2VTaXplV2lkdGggPSAwO1xuICBfX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSAwO1xuICBfX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZmFsc2U7XG5cbiAgLyoqIERlZmF1bHQgb3B0aW9ucyAqL1xuICBfX29wdGlvbnMgPSBuZXcgT2JqZWN0KHtcbiAgICAvLyDrlJTrsoTquYUg7Ji17IWYXG4gICAgc2hvd0NsaXBGcmFtZTogZmFsc2UsXG4gICAgLy8gY2lscC1mcmFtZSDrs7TquLBcbiAgICBzaG93Q2FudmFzUHJldmlldzogZmFsc2UsXG4gICAgLy8gY2FudmFzIHByZXZpZXcg67O06riwXG5cbiAgICAvLyDstpzroKUg7Ji17IWYXG4gICAgLy8g7JWU7Zi47ZmUXG4gICAgdXNlRW5jcnlwdE1vZGU6IGZhbHNlLFxuICAgIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKOqwnOyduOqzoOycoOyLneuzhOu2gO2YuCDqtIDroKgg7ZWt66qpIOyVlO2YuO2ZlClcbiAgICB1c2VFbmNyeXB0QWxsTW9kZTogZmFsc2UsXG4gICAgLy8g7JWU7Zi47ZmUIOyggeyaqSAo7KCE7LK0IOyVlO2YuO2ZlCwgZW5jcnlwdCBvYmplY3Qg67OE64+EIOygnOqztSlcbiAgICB1c2VFbmNyeXB0T3ZlcmFsbE1vZGU6IGZhbHNlLFxuICAgIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKG9jciDsnbTrr7jsp4AsIOuniOyKpO2CuSDsnbTrr7jsp4AsIOyWvOq1tOydtOuvuOyngCDtj6ztlagpXG4gICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAvLyB1c2VQaWlFbmNyeXB0TW9kZTogZmFsc2UsIC8vIOyVlO2YuO2ZlCDsoIHsmqkgKHBpaSlcbiAgICAvLyB1c2VQaWlFbmNyeXB0RmFjZTogZmFsc2UsIC8vIOyLoOu2hOymnSDslrzqtbTsgqzsp4Qg7JWU7Zi47ZmUIOyggeyaqSAocGlpKVxuICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgIHVzZUxlZ2FjeUZvcm1hdDogZmFsc2UsXG4gICAgLy8gTGVnYWN5IGZvcm1hdCDsp4Dsm5BcbiAgICB1c2VNYXNrSW5mbzogdHJ1ZSxcbiAgICAvLyDrp4jsiqTtgrkg7KKM7ZGcIOyngOybkFxuICAgIHVzZUZhY2VJbWFnZTogdHJ1ZSxcbiAgICAvLyDsi6DrtoTspp0g64K0IOyWvOq1tCDsgqzsp4RcbiAgICB1c2VJbWFnZVdhcnBpbmc6IGZhbHNlLFxuICAgIC8vIOyLoOu2hOymnSDsnbTrr7jsp4DrpbwgV2FycGluZyjsmZzqs6Eg67O07KCVIO2VoOyngCDsl6zrtoApXG4gICAgdXNlQ29tcHJlc3NJbWFnZTogZmFsc2UsXG4gICAgLy8g7Iug67aE7KadIOydtOuvuOyngOulvCDslZXstpXtlaDsp4Ag7Jes67aAXG4gICAgdXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoOiAxMDgwLFxuICAgIC8vIOydtOuvuOyngCDrpqzsgqzsnbTsp5Ug6rCA66GcIO2VtOyDgeuPhFxuICAgIHVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWU6IDEwMjQgKiA1MCxcbiAgICAvLyDsnbTrr7jsp4Ag7JWV7LaVIOuqqe2RnCDsmqnrn4lcblxuICAgIC8vIFVJIOyEpOyglVxuICAgIHVzZVRvcFVJOiB0cnVlLFxuICAgIC8vIOyDgeuLqCBVSVxuICAgIHVzZVRvcFVJVGV4dE1zZzogZmFsc2UsXG4gICAgLy/sg4Hri6ggVUkgPiBURVhUXG4gICAgdXNlTWlkZGxlVUk6IHRydWUsXG4gICAgLy/spJHri6ggVUlcbiAgICB1c2VNaWRkbGVVSVRleHRNc2c6IHRydWUsXG4gICAgLy8g7KSR64uoIFVJID4gVEVYVFxuICAgIHVzZUJvdHRvbVVJOiB0cnVlLFxuICAgIC8vIO2VmOuLqCBVSVxuICAgIHVzZUJvdHRvbVVJVGV4dE1zZzogZmFsc2UsXG4gICAgLy8g7ZWY64uoIFVJID4gVEVYVFxuICAgIHVzZVByZXZpZXdVSTogdHJ1ZSxcbiAgICAvLyBQcmV2aWV3IFVJXG4gICAgdXNlQ2FwdHVyZVVJOiB0cnVlLFxuICAgIC8vIOy6oeyymOuyhO2KvCBVSVxuICAgIHByZWxvYWRpbmdVSVRleHRNc2c6ICfsi6DrtoTspp3snbjspp0g66qo65OI7J2EIOu2iOufrOyYpOuKlCDspJEg7J6F64uI64ukPGJyIC8+7J6g7Iuc66eMIOq4sOuLpOugpOyjvOyEuOyalCcsXG4gICAgLy8g7J247IudIO2UhOugiOyehCDsmLXshZhcbiAgICBmcmFtZUJvcmRlclN0eWxlOiB7XG4gICAgICB3aWR0aDogNSxcbiAgICAgIC8vIGJvcmRlci13aWR0aFxuICAgICAgcmFkaXVzOiAyMCxcbiAgICAgIC8vIGJvcmRlci1yYWRpdXNcbiAgICAgIHN0eWxlOiAnc29saWQnLFxuICAgICAgLy8gYm9yZGVyLXN0eWxlXG5cbiAgICAgIC8vIOuLqOqzhOuzhCDsnbjsi50g7ZSE66CI7J6EIGJvcmRlciDsg4nsg4FcbiAgICAgIG5vdF9yZWFkeTogJyMwMDAwMDAnLFxuICAgICAgLy8g7Iqk7LqU7KSA67mEIDog6rKA7KCVXG4gICAgICByZWFkeTogJyNiOGI4YjgnLFxuICAgICAgLy8g7Iqk7LqU64yA6riwIDog7ZqM7IOJXG4gICAgICBkZXRlY3Rfc3VjY2VzczogJyM1ZThmZmYnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyEseqztSA6IO2VmOuKmFxuICAgICAgZGV0ZWN0X2ZhaWxlZDogJyM3MjViNjcnLFxuICAgICAgLy8g7Lm065Oc6rKA7LacIOyLpO2MqCA6IOuztOudvFxuICAgICAgbWFudWFsX2NhcHR1cmVfc3VjY2VzczogJyM1ZThmZmYnLFxuICAgICAgLy8g7IiY64+Z7LSs7JiBIOyEseqztSA6IO2VmOuKmFxuICAgICAgbWFudWFsX2NhcHR1cmVfZmFpbGVkOiAnIzcyNWI2NycsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7Iuk7YyoIDog67O06528XG4gICAgICByZWNvZ25pemVkOiAnIzAwM2FjMicsXG4gICAgICAvLyBPQ1LsmYTro4wgOiDtjIzrnpFcbiAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6ICcjMDAzYWMyJyxcbiAgICAgIC8vIOyCrOuzuO2MkOuzhOykkSjsgqzrs7jtjJDrs4QgT04pIDog7YyM656RXG4gICAgICBvY3Jfc3VjY2VzczogJyMxNGIwMGUnLFxuICAgICAgLy8gT0NS7JmE66OMIDog7LSI66GdXG4gICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogJyMxNGIwMGUnLFxuICAgICAgLy8gT0NS7JmE66OMKOyCrOuzuO2MkOuzhCBPTikgOiDstIjroZ1cbiAgICAgIG9jcl9mYWlsZWQ6ICcjRkExMTNEJyAvLyBPQ1Lsi6TtjKggOiDruajqsJVcbiAgICB9LFxuXG4gICAgLy8g66eI7Iqk7YGsIO2UhOugiOyehCBmaWxsIOy7rOufrCDrs4Dqsr0g7IKs7JqpIOyXrOu2gFxuICAgIHVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlOiB0cnVlLFxuICAgIC8vIOuniOyKpO2BrCDtlITroIjsnoQg7Ji17IWYICjsubTrqZTrnbwg67mE65SU7JikIOyYgeyXreyXkOyEnCDsnbjsi50g7ZSE66CI7J6E66eMIOuztOydtOqyjCDtlZjqs6Ag64KY66i47KeA66W8IOuNruyWtOyTsOuKlCDtlITroIjsnoQg7JiB7JetKVxuICAgIG1hc2tGcmFtZVN0eWxlOiB7XG4gICAgICBjbGlwX2ZyYW1lOiAnI2ZmMDBiZicsXG4gICAgICAvLyBjbGlwLWZyYW1lIOyDieyDgSA6IOuUpe2NvO2UjCAo7IiY7KCV67aI6rCAKVxuICAgICAgYmFzZV9jb2xvcjogJyMzMzMzMzMnLFxuICAgICAgLy8gbWFzay1mcmFtZSDsg4nsg4EgOiDri6Ttgazqt7jroIjsnbQgKO2IrOuqheuPhOuKlCDsiJjsoJXrtojqsIAgZmbroZwg6rOg7KCVKVxuXG4gICAgICAvLyDri6jqs4Trs4Qg66eI7Iqk7YGsIO2UhOugiOyehCBmaWxsIOyDieyDgVxuICAgICAgbm90X3JlYWR5OiAnIzMzMzMzMycsXG4gICAgICAvLyDsiqTsupTspIDruYRcbiAgICAgIHJlYWR5OiAnIzMzMzMzMycsXG4gICAgICAvLyDsiqTsupTrjIDquLBcbiAgICAgIGRldGVjdF9zdWNjZXNzOiAnIzIyMjIyMicsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7ISx6rO1XG4gICAgICBkZXRlY3RfZmFpbGVkOiAnIzMzMzMzMycsXG4gICAgICAvLyDsubTrk5zqsoDstpwg7Iuk7YyoXG4gICAgICBtYW51YWxfY2FwdHVyZV9zdWNjZXNzOiAnIzIyMjIyMicsXG4gICAgICAvLyDsiJjrj5nstKzsmIEg7ISx6rO1XG4gICAgICBtYW51YWxfY2FwdHVyZV9mYWlsZWQ6ICcjMzMzMzMzJyxcbiAgICAgIC8vIOyImOuPmey0rOyYgSDsi6TtjKhcbiAgICAgIHJlY29nbml6ZWQ6ICcjMjIyMjIyJyxcbiAgICAgIC8vIE9DUuyZhOujjFxuICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogJyMyMjIyMjInLFxuICAgICAgLy8g7IKs67O47YyQ67OE7KSRKOyCrOuzuO2MkOuzhCBPTilcbiAgICAgIG9jcl9zdWNjZXNzOiAnIzExMTExMScsXG4gICAgICAvL09DUuyZhOujjFxuICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6ICcjMTExMTExJyxcbiAgICAgIC8vIE9DUuyZhOujjCjsgqzrs7jtjJDrs4QgT04pXG4gICAgICBvY3JfZmFpbGVkOiAnIzExMTExMScgLy8gT0NS7Iuk7YyoXG4gICAgfSxcblxuICAgIC8vIOy0rOyYgeyYteyFmFxuICAgIHVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGU6IGZhbHNlLFxuICAgIC8vIOyggOyCrOyWkSDri6jrp5Dsl5DshJwg7ISc67KET0NS66GcIOyekOuPmSDsoITtmZgg6riw64qlXG4gICAgdXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlOiBmYWxzZSxcbiAgICAvLyDsiJjrj5nsnLzroZwg7ISc67KET0NSIOyghO2ZmCDquLDriqUgKOyImOuPmeydtCB0cnVl7J2066m0IOyekOuPmeydgCDrrLTsi5zrkKgpXG4gICAgc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQ6IDIwLjAsXG4gICAgLy8g7J6Q64+Z7KCE7ZmYIOq4sOykgOqwkiAo7ISx64qlIOy4oeygley5mCBtcylcbiAgICB1c2VGb3JjZUNvbXBsZXRlVUk6IGZhbHNlLFxuICAgIC8vIFdBU00g66qo65Oc7J2865WMIOuyhO2KvCDriITrpbzsi5wg7ZW064u5IOyLnOygkOyXkCDqsJXsoJzroZwg7JmE66OMIOyCrOyaqeyXrOu2gFxuXG4gICAgLy8g7IiY64+Z7LSs7JiBIOuyhO2KvCDsmLXshZhcbiAgICBjYXB0dXJlQnV0dG9uU3R5bGU6IHtcbiAgICAgIHN0cm9rZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgLy8g67KE7Yq8IO2FjOuRkOumrChzdHJva2UpIOyDieyDgVxuICAgICAgYmFzZV9jb2xvcjogJyM1ZThmZmYnIC8vIOuyhO2KvCDsg4nsg4FcbiAgICB9LFxuXG4gICAgcmVzb3VyY2VCYXNlVXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgIC8vIHdhc20sIGRhdGEg7YyM7J28IOumrOyGjOyKpCBiYXNlIOqyveuhnCAoQ0ROIOyCrOyaqeyLnCDrs4Dqsr0pXG4gICAgZGV2aWNlTGFiZWw6ICcnLFxuICAgIHZpZGVvVGFyZ2V0SWQ6ICcnLFxuICAgIC8vIOy5tOuplOudvCDshKTsoJVcbiAgICByb3RhdGlvbkRlZ3JlZTogMCxcbiAgICAvLyByb3RhdGlvbi1kZWdyZWUg7Lm066mU65286rCAIO2ajOyghOuQnCDqsIHrj4QgKDkwLCAxOTAsIDI3MClcbiAgICBtaXJyb3JNb2RlOiBmYWxzZSxcbiAgICAvLyBtaXJyb3ItbW9kZSDshYDtlLwg7Lm066mU6528KO2CpOyYpOyKpO2BrCDrk7EpIOyCrOyaqeyLnCDsoozsmrAg67CY7KCEXG4gICAgY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbDogMTAwMCxcbiAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDqsITqsqkobXMpXG4gICAgY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdDogLTEsXG4gICAgLy8g7Lm066mU6528IOumrOyGjOyKpCDsnqzsmpTssq0g7LWc64yAIO2an+yImCwgLTHsnbTrqbQg66y07ZWcIOyerOyalOyyrS5cblxuICAgIC8vIOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVICA6ICdjb21wYXRpYmlsaXR5JyAo7Zi47ZmY7ISxIOyasOyEoCkgfHwgJ2hpZ2hRdWFsaXR5JyAo6rOg7ZmU7KeIIOyasOyEoClcbiAgICAvLyBjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWE6ICdjb21wYXRpYmlsaXR5JywgLy8g7Zi47ZmY7ISxIOyasOyEoCjqtozsnqUsIOuUlO2PtO2KuCkgOiA3MjDsnLzroZwg6rOg7KCVLCDsoIDsgqzslpEg64uo66eQ6riwIO2YuO2ZmOyEsSDsoovsnYxcbiAgICBjYW1lcmFSZXNvbHV0aW9uQ3JpdGVyaWE6ICdoaWdoUXVhbGl0eScsXG4gICAgLy8g6rOg7ZmU7KeIIOyasOyEoCA6IDEwODDsnbQg6rCA64ql7ZWY66m0IDEwODAg67aI6rCA64ql7ZWY66m0IDcyMFxuXG4gICAgLy8g6rCA7J2065OcIOuwleyKpCDshKTsoJUgOiAnY2FtZXJhUmVzb2x1dGlvbicgKOy5tOuplOudvCDtlbTsg4Hrj4QpIHx8ICdvY3JWaWV3U2l6ZScgKG9jciBkaXYg7YGs6riwKVxuICAgIGNhbGNHdWlkZUJveENyaXRlcmlhOiAnY2FtZXJhUmVzb2x1dGlvbicsXG4gICAgLy8g7Lm066mU6528IO2VtOyDgeuPhCDquLDspIAo6raM7J6lLCDrlJTtj7TtirgpIDogNzIweDEyODAg7ZW07IOB64+EKOyEuOuhnOuqqOuTnCkg7J2865WMIG9jciB2aWV3IHdpZHRoIHNpemXqsIAgNzIw67O064ukIO2BsCDqsr3smrAsIOqwgOydtOuTnCDrsJXsiqTrpbwgNzIw7JeQIOunnuy2pCAocHJldmlldyDtmZTrqbQg6rmo7KeQIOyXhuydjClcbiAgICAvLyBjYWxjR3VpZGVCb3hDcml0ZXJpYTogJ29jclZpZXdTaXplJywgLy8g7ZmU66m0IOyCrOydtOymiCDquLDspIAgOiA3MjB4MTI4MCDtlbTsg4Hrj4Qo7IS466Gc66qo65OcKSDsnbzrlYwgb2NyIHZpZXcgd2lkdGggc2l6ZeqwgCA3MjDrs7Tri6Qg7YGw6rK97JqwLCDqsIDsnbTrk5wg67CV7Iqk66W8IG9jciB2aWV3IHdpZHRoIOyCrOyXkOymiOyXkCDrp57stqQgKHByZXZpZXcg7ZmU66m0IOqwleygnOuhnCDripjrpqzquLAg65WM66y47JeQIOuLpOyGjCDquajsp5ApXG5cbiAgICAvLyDsgqzrs7jtjJDrs4QgUkVUUlkg7ISk7KCVXG4gICAgLy8gc3NhUmV0cnlUeXBlXG4gICAgLy8gICAtIFJFQUwgICAgIDog67O47J24KFJFQUwpIOqxsOu2gOycqCAtPiBGYWxzZSBOZWdhdGl2ZSjsi6TsoJzqsJLsnYAgUkVBTOyduOuNsCDsmIjsuKHqsJLsnYAgRkFLReudvOyEnCDti4DrprDqsr3smrAp66W8IOuCruy2lOq4sCDsnITtlbQsXG4gICAgLy8gICAtIEZBS0UgICAgIDog7YOA7J24KEZBS0UpIOyImOudveycqCAtPiBGYWxzZSBQb3NpdGl2ZSjsi6TsoJzqsJLsnYAgRkFLReyduOuNsCDsmIjsuKHqsJLsnYAgUkVBTOydtOudvOyEnCDti4DrprDqsr3smrAp66W8IOuCruy2lOq4sCDsnITtlbRcbiAgICAvLyAgIC0gRU5TRU1CTEUgOiDtj4nqt6Ag7KCI64yA6rCSIC0+IHNzYU1heFJldHJ5Q291bnQg66eM7YG8IOuwmOuztSDsiJjtlontlZjqs6AgZmRfY29uZmlkZW5jZSDsoIjrjIDqsJIg6rCS7J2YIO2Pieq3oOycvOuhnCDtjJDsoJVcbiAgICAvLyBzc2FNYXhSZXRyeUNvdW50IOyEpOyglSDqsJLrp4ztgbwg7J6s7Iuc64+E7ZWY7JesIO2VnOuyiOydtOudvOuPhCDquLDspIDqsJIoUkVBTCDrmJDripQgRkFLRSnsnbQg65yo66m0IOq4sOykgOqwkihSRUFMIOuYkOuKlCBGQUtFKeuhnCDtjJDsoJVcbiAgICBzc2FSZXRyeVR5cGU6ICdFTlNFTUJMRScsXG4gICAgc3NhUmV0cnlQaXZvdDogMC41LFxuICAgIC8vIFJFQUwvRkFLReulvCDtjJDsoJXtlZjripQgZmRfY29uZmlkZW5jZSDquLDspIDqsJIgKHdhc20g67Cw7Y+sIOuyhOyghOyXkCDrlLDrnbwg64uk66aEKSDigLsg7IiY7KCV67aI6rCAXG4gICAgc3NhTWF4UmV0cnlDb3VudDogMCxcbiAgICAvLyDstZzrjIAgUkVUUlkg7ZqM7IiY7ISk7KCVIDDsnbTrqbQg66+47IKs7JqpXG5cbiAgICAvLyB0aGlzLl9fZGVidWcoKeulvCDthrXtlbQg7LCN7J2AIOuplOyLnOyngOulvCBhbGVydOycvOuhnCDrnYTsmrjsp4Ag7Jes67aAXG4gICAgdXNlRGVidWdBbGVydDogZmFsc2UsXG4gICAgLy8gV0FTTSDrpqzshozsiqQg6rCx7IugIOyXrOu2gFxuICAgIGZvcmNlX3dhc21fcmVsb2FkOiBmYWxzZSxcbiAgICBmb3JjZV93YXNtX3JlbG9hZF9mbGFnOiAnJ1xuICB9KTtcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGluc3RhbmNlKSByZXR1cm4gaW5zdGFuY2U7XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8qKiBwdWJsaWMgbWV0aG9kcyAqL1xuICBhc3luYyBwcmVsb2FkaW5nKG9uUHJlbG9hZGVkKSB7XG4gICAgaWYgKHRoaXMuaXNQcmVsb2FkZWQoKSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgaWYgKG9uUHJlbG9hZGVkKSBvblByZWxvYWRlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aGlzLnNob3dPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEO1xuICAgICAgYXdhaXQgdGhpcy5fX2xvYWRSZXNvdXJjZXMoKTtcbiAgICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FO1xuICAgICAgdGhpcy5fX3ByZWxvYWRlZCA9IHRydWU7XG4gICAgICBpZiAob25QcmVsb2FkZWQpIG9uUHJlbG9hZGVkKCk7XG4gICAgICB0aGlzLmhpZGVPQ1JMb2FkaW5nVUkoKTtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgaXNJbml0aWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2luaXRpYWxpemVkO1xuICB9XG4gIGlzUHJlbG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9fcHJlbG9hZGVkO1xuICB9XG4gIGdldFByZWxvYWRpbmdTdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzO1xuICB9XG4gIGlzRW5jcnlwdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRBbGxNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUVuY3J5cHRPdmVyYWxsTW9kZTtcbiAgfVxuICBpc0NyZWRpdENhcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vY3JUeXBlID09PSAnY3JlZGl0JztcbiAgfVxuICBzaG93T0NSTG9hZGluZ1VJKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZWxvYWRpbmdVSVdyYXBcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAocHJlbG9hZGluZ1VJV3JhcCkge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIH1cbiAgfVxuICBoaWRlT0NSTG9hZGluZ1VJKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZWxvYWRpbmdVSVdyYXBcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBpZiAocHJlbG9hZGluZ1VJV3JhcCkge1xuICAgICAgcHJlbG9hZGluZ1VJV3JhcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfVxuICBlbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpIHtcbiAgICBpZiAodGhpcy5pc0NyZWRpdENhcmQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0VuY3J5cHRNb2RlKCkgJiYgdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VFbmNyeXB0TW9kZSkge1xuICAgICAgICBjb25zdCBpbmNsdWRlTGlzdCA9IFsnanVtaW4nLCAnZHJpdmVyX251bWJlcicsICdwYXNzcG9ydF9udW1iZXInLCAncGVyc29uYWxfbnVtYmVyJywgJ21yejInXTtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG5cbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0ge1xuICAgICAgICAgIG9jcl9yZXN1bHQ6IF8udG9QYWlycyhfLnBpY2socmV2aWV3X3Jlc3VsdC5vY3JfcmVzdWx0LCBpbmNsdWRlTGlzdCkpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSwge30pLFxuICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UpXG4gICAgICAgIH07XG4gICAgICAgIHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCA9IHtcbiAgICAgICAgICAuLi5yZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsXG4gICAgICAgICAgLi4uZW5jcnlwdGVkLm9jcl9yZXN1bHRcbiAgICAgICAgfTtcbiAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3Jfb3JpZ2luX2ltYWdlID0gZW5jcnlwdGVkLm9jcl9vcmlnaW5faW1hZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleGNsdWRlTGlzdCA9IFsnY29tcGxldGUnLCAncmVzdWx0X3NjYW5fdHlwZScsICdjb2xvcl9wb2ludCcsICdmb3VuZF9mYWNlJywgJ3NwZWN1bGFyX3JhdGlvJywgJ3N0YXJ0X3RpbWUnLCAnZW5kX3RpbWUnLCAnZmRfY29uZmlkZW5jZScsICdpZF90cnV0aCcsICdpZF90cnV0aF9yZXRyeV9jb3VudCddO1xuXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlRW5jcnlwdEFsbE1vZGUpIHtcbiAgICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSB7XG4gICAgICAgICAgICBvY3JfcmVzdWx0OiBfLnRvUGFpcnMoXy5vbWl0KHJldmlld19yZXN1bHQub2NyX3Jlc3VsdCwgZXhjbHVkZUxpc3QpKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgIGFjY1trZXldID0gdGhpcy5fX2VuY3J5cHRTY2FuUmVzdWx0KHZhbHVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UpLFxuICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChyZXZpZXdfcmVzdWx0Lm9jcl9tYXNraW5nX2ltYWdlKSxcbiAgICAgICAgICAgIG9jcl9mYWNlX2ltYWdlOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQocmV2aWV3X3Jlc3VsdC5vY3JfZmFjZV9pbWFnZSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldmlld19yZXN1bHQuZW5jcnlwdGVkID0gZW5jcnlwdGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGVuY3J5cHRlZCA9IHtcbiAgICAgICAgICAgIG9jcl9yZXN1bHQ6IF8ub21pdChyZXZpZXdfcmVzdWx0Lm9jcl9yZXN1bHQsIGV4Y2x1ZGVMaXN0KSxcbiAgICAgICAgICAgIG9jcl9vcmlnaW5faW1hZ2U6IHJldmlld19yZXN1bHQub2NyX29yaWdpbl9pbWFnZSxcbiAgICAgICAgICAgIG9jcl9tYXNraW5nX2ltYWdlOiByZXZpZXdfcmVzdWx0Lm9jcl9tYXNraW5nX2ltYWdlLFxuICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IHJldmlld19yZXN1bHQub2NyX2ZhY2VfaW1hZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldmlld19yZXN1bHQuZW5jcnlwdGVkX292ZXJhbGwgPSB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLl9fZW5jcnlwdFNjYW5SZXN1bHQoSlNPTi5zdHJpbmdpZnkoZW5jcnlwdGVkKSksXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldE9DUkVuZ2luZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZTtcbiAgfVxuICBpbml0KHNldHRpbmdzKSB7XG4gICAgaWYgKCEhIXNldHRpbmdzLmxpY2Vuc2VLZXkpIHRocm93IG5ldyBFcnJvcignTGljZW5zZSBrZXkgaXMgZW1wdHknKTtcbiAgICB0aGlzLl9fbGljZW5zZSA9IHNldHRpbmdzLmxpY2Vuc2VLZXk7XG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IF8ubWVyZ2Uoe30sIHRoaXMuX19vcHRpb25zLCBzZXR0aW5ncyk7XG4gICAgdGhpcy5zZXRPcHRpb24obWVyZ2VkT3B0aW9ucyk7XG4gICAgdm9pZCAwO1xuICAgIGlmICghdGhpcy5pc0luaXRpYWxpemVkKCkpIHtcbiAgICAgIHRoaXMuX193aW5kb3dFdmVudEJpbmQoKTtcbiAgICAgIHRoaXMuX19kZXZpY2VJbmZvID0gZGV0ZWN0b3IuZ2V0T3NWZXJzaW9uKCk7XG4gICAgICB2b2lkIDA7XG4gICAgICB0aGlzLl9faXNTdXBwb3J0V2FzbSA9IGlzU3VwcG9ydFdhc20oKTtcbiAgICAgIGlmICghdGhpcy5fX2lzU3VwcG9ydFdhc20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3Qgc3VwcG9ydGVkLiBpbiB0aGlzIGJyb3dzZXIuJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBzZXRPcHRpb24oc2V0dGluZ3MpIHtcbiAgICB0aGlzLl9fb3B0aW9ucyA9IHNldHRpbmdzO1xuICB9XG4gIGdldE9wdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fX29wdGlvbnM7XG4gIH1cbiAgZ2V0T2NyVHlwZSh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vY3JUeXBlTnVtYmVyVG9TdHJpbmcuZ2V0KHR5cGUpO1xuICB9XG4gIGdldE9jclR5cGVOdW1iZXIoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vY3JTdHJpbmdUb1R5cGVOdW1iZXIuZ2V0KHN0cmluZyk7XG4gIH1cbiAgZ2V0VUlPcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fX3VpT3JpZW50YXRpb247XG4gIH1cbiAgZ2V0VmlkZW9PcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gIH1cbiAgYXN5bmMgY2hlY2tTd2l0Y2hUb1NlcnZlck1vZGUoKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgLy8g7IiY64+Z7KCE7ZmYIG9uIOydtOuptCDsiJjrj5nsoITtmZgg7Jqw7ISgXG4gICAgICByZXR1cm4gdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDsiJjrj5nsoITtmZggb2ZmIOydtOuptCDsnpDrj5nsoITtmZgg7LK07YGsXG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSkge1xuICAgICAgICAvLyDsnpDrj5nsoITtmZggb27snbzrlYxcbiAgICAgICAgLy8g7ISx64qlIOy4oeygleqwkuydhCDquLDspIDsnLzroZwgV0FTTSBvciBTZXJ2ZXJcbiAgICAgICAgY29uc3QgW2xhdGVuY3lQZXIxMDBtcywgbWVhc3VyZVJlcG9ydF0gPSBhd2FpdCBtZWFzdXJlKCk7XG4gICAgICAgIHRoaXMuX19kZWJ1ZyhtZWFzdXJlUmVwb3J0KTtcbiAgICAgICAgcmV0dXJuIGxhdGVuY3lQZXIxMDBtcyA+IHBhcnNlRmxvYXQodGhpcy5fX29wdGlvbnMuc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g7IiY64+Z7KCE7ZmY64+EIG9mZiwg7J6Q64+Z7KCE7ZmYIG9mZlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIHN0YXJ0T0NSKHR5cGUsIG9uU3VjY2Vzcywgb25GYWlsdXJlLCBvbkluUHJvZ3Jlc3NDaGFuZ2UgPSBudWxsKSB7XG4gICAgaWYgKCEhIXR5cGUgfHwgISEhb25TdWNjZXNzIHx8ICEhIW9uRmFpbHVyZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBhd2FpdCB0aGlzLmNoZWNrU3dpdGNoVG9TZXJ2ZXJNb2RlKCk7XG4gICAgdGhpcy5fX29jclR5cGUgPSB0eXBlO1xuICAgIHRoaXMuX19zc2FNb2RlID0gdGhpcy5fX29jclR5cGUuaW5kZXhPZignLXNzYScpID4gLTE7XG4gICAgdGhpcy5fX29uU3VjY2VzcyA9IG9uU3VjY2VzcztcbiAgICB0aGlzLl9fb25GYWlsdXJlID0gb25GYWlsdXJlO1xuICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UgPSBvbkluUHJvZ3Jlc3NDaGFuZ2U7XG4gICAgaWYgKG9uSW5Qcm9ncmVzc0NoYW5nZSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVRvcFVJKSB7XG4gICAgICAgIHRoaXMuX190b3BVSSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkudG9wVUk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkpIHtcbiAgICAgICAgdGhpcy5fX21pZGRsZVVJID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5taWRkbGVVSTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSkge1xuICAgICAgICB0aGlzLl9fYm90dG9tVUkgPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLmJvdHRvbVVJO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgIGlmICghdGhpcy5pc0luaXRpYWxpemVkKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGluaXRpYWxpemVkIScpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5fX3ByZXByb2Nlc3MoKTtcbiAgICAgIGF3YWl0IHRoaXMuX19zZXR1cERvbUVsZW1lbnRzKCk7XG4gICAgICBpZiAodGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICAgIC8vIHNlcnZlck1vZGVcbiAgICAgICAgaWYgKHRoaXMuaXNFbmNyeXB0TW9kZSgpICYmIHRoaXMuX19pc1N1cHBvcnRXYXNtKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX3ByZWxvYWRpbmdXYXNtKCk7IC8vIOyEnOuyhOuqqOuTnCDsnbTsp4Drp4wg7JWU7Zi47ZmUIO2VmOq4sOychO2VtCB3YXNt7J2EIHByZWxvYWRpbmcg7ZWoXG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuU2VydmVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3YXNtTW9kZVxuICAgICAgICBhd2FpdCB0aGlzLl9fcHJlbG9hZGluZ1dhc20oKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2Nhbldhc20oKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcE9DUigpO1xuICAgIH1cbiAgfVxuICBzdG9wT0NSKCkge1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgIHRoaXMuX19vblN1Y2Nlc3MgPSBudWxsO1xuICAgIHRoaXMuX19vbkZhaWx1cmUgPSBudWxsO1xuICB9XG4gIHNldElnbm9yZUNvbXBsZXRlKHZhbCkge1xuICAgIHRoaXMuX19PQ1JFbmdpbmUuc2V0SWdub3JlQ29tcGxldGUodmFsKTtcbiAgfVxuICBlbmNyeXB0KHBsYWluU3RyKSB7XG4gICAgcmV0dXJuIHRoaXMuX19lbmNyeXB0U2NhblJlc3VsdChwbGFpblN0cik7XG4gIH1cbiAgYXN5bmMgcmVzdGFydE9DUihvY3JUeXBlLCBvblN1Y2Nlc3MsIG9uRmFpbHVyZSwgb25JblByb2dyZXNzQ2hhbmdlLCBpc1N3aXRjaE1vZGUgPSBmYWxzZSkge1xuICAgIGlmIChpc1N3aXRjaE1vZGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcE9DUigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5zdGFydE9DUihvY3JUeXBlLCBvblN1Y2Nlc3MsIG9uRmFpbHVyZSwgb25JblByb2dyZXNzQ2hhbmdlKTtcbiAgfVxuXG4gIC8qKiBwcml2YXRlIG1ldGhvZHMgKi9cbiAgYXN5bmMgX193YWl0UHJlbG9hZGVkKCkge1xuICAgIGxldCB3YWl0aW5nUmV0cnlDb3VudCA9IDA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY2hlY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzUHJlbG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2FpdGluZ1JldHJ5Q291bnQrKztcbiAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgIGNoZWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA1MDApO1xuICAgICAgfTtcbiAgICAgIGNoZWNrKCk7XG4gICAgfSk7XG4gIH1cbiAgX19wcmVwcm9jZXNzKCkge1xuICAgIGNvbnN0IGNvbnZlcnRUeXBlVG9OdW1iZXIgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICByZXR1cm4gaXNOYU4ocGFyc2VJbnQob3B0aW9uKSkgPyAwIDogcGFyc2VJbnQob3B0aW9uKTtcbiAgICB9O1xuICAgIGNvbnN0IGNvbnZlcnRUeXBlVG9GbG9hdCA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc05hTihwYXJzZUZsb2F0KG9wdGlvbikpID8gMjAuMCA6IHBhcnNlRmxvYXQob3B0aW9uKTtcbiAgICB9O1xuICAgIHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQgPSBjb252ZXJ0VHlwZVRvTnVtYmVyKHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQpO1xuICAgIHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUgPSBjb252ZXJ0VHlwZVRvTnVtYmVyKHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhWb2x1bWUpO1xuICAgIHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2VNYXhXaWR0aCA9IGNvbnZlcnRUeXBlVG9OdW1iZXIodGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoKTtcbiAgICB0aGlzLl9fb3B0aW9ucy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZCA9IGNvbnZlcnRUeXBlVG9GbG9hdCh0aGlzLl9fb3B0aW9ucy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZCk7XG4gIH1cbiAgX193aW5kb3dFdmVudEJpbmQoKSB7XG4gICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICBpZiAoL2lwaG9uZXxpcG9kfGlwYWQvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIGNvbnN0IHNraXBUb3VjaEFjdGlvbmZvclpvb20gPSBldiA9PiB7XG4gICAgICAgIGlmIChldi50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBza2lwVG91Y2hBY3Rpb25mb3Jab29tLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHNraXBUb3VjaEFjdGlvbmZvclpvb20sIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpc18uX19wYWdlRW5kID0gdHJ1ZTtcbiAgICAgIF90aGlzXy5jbGVhbnVwKCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISEhX3RoaXNfLl9fb2NyVHlwZSkgcmV0dXJuO1xuICAgICAgaWYgKCFfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUpIHtcbiAgICAgICAgX3RoaXNfLl9faXNJblByb2dyZXNzSGFuZGxlUmVzaXplID0gdHJ1ZTtcbiAgICAgICAgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZVRpbWVyID0gbnVsbDtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBfdGhpc18uX19pc0luUHJvZ3Jlc3NIYW5kbGVSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgX3RoaXNfLnJlc3RhcnRPQ1IoX3RoaXNfLl9fb2NyVHlwZSwgX3RoaXNfLl9fb25TdWNjZXNzLCBfdGhpc18uX19vbkZhaWx1cmUsIF90aGlzXy5fX29uSW5Qcm9ncmVzc0NoYW5nZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEhIV90aGlzXy5fX3Rocm90dGxpbmdSZXNpemVUaW1lcikge1xuICAgICAgICBfdGhpc18uX190aHJvdHRsaW5nUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGhhbmRsZVJlc2l6ZSwgX3RoaXNfLl9fdGhyb3R0bGluZ1Jlc2l6ZURlbGF5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2RlYnVnKG1zZykge1xuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VEZWJ1Z0FsZXJ0KSB7XG4gICAgICB2b2lkIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgX19zbGVlcChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgfVxuICBfX2Jsb2JUb0Jhc2U2NChibG9iKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfKSA9PiB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICB9KTtcbiAgfVxuICBfX2Jhc2U2NHRvQmxvYihiYXNlNjQpIHtcbiAgICAvLyBjb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgIC8vIGRvZXNuJ3QgaGFuZGxlIFVSTEVuY29kZWQgRGF0YVVSSXMgLSBzZWUgU08gYW5zd2VyICM2ODUwMjc2IGZvciBjb2RlIHRoYXQgZG9lcyB0aGlzXG4gICAgY29uc3QgYnl0ZVN0cmluZyA9IGF0b2IoYmFzZTY0LnNwbGl0KCcsJylbMV0pO1xuXG4gICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIGNvbnN0IG1pbWVTdHJpbmcgPSBiYXNlNjQuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlclxuICAgIGNvbnN0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICBjb25zdCBpYSA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEJsb2IoW2FiXSwge1xuICAgICAgdHlwZTogbWltZVN0cmluZ1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIF9fY29tcHJlc2VCYXNlNjRJbWFnZShiYXNlNjQsIG9wdGlvbnMsIGNvbnN0YW50TnVtYmVyKSB7XG4gICAgaWYgKGJhc2U2NCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgYmxvYkZpbGUgPSB0aGlzLl9fYmFzZTY0dG9CbG9iKGJhc2U2NCk7XG4gICAgY29uc3QgY29tcHJlc3NlZCA9IGF3YWl0IEltYWdlVXRpbC5jb21wcmVzc0ltYWdlKGJsb2JGaWxlLCBvcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgY29uc3QgY29tcHJlc3Npb25SYXRpbyA9IE1hdGgucm91bmQoKDEgLSBjb21wcmVzc2VkLnNpemUgLyBibG9iRmlsZS5zaXplKSAqIDEwMDAwKSAvIDEwMDtcbiAgICB2b2lkIDA7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX19ibG9iVG9CYXNlNjQoY29tcHJlc3NlZCk7XG4gIH1cblxuICAvKiog65287J207IS87IqkIO2CpOulvCBoZWFwIOyXkCBhbGxvY2F0aW9uICovXG4gIF9fZ2V0U3RyaW5nT25XYXNtSGVhcCgpIHtcbiAgICBpZiAoISEhdGhpcy5fX2xpY2Vuc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTGljZW5zZSBLZXkgaXMgZW1wdHknKTtcbiAgICB9XG4gICAgY29uc3QgbGVuZ3RoQnl0ZXMgPSB0aGlzLl9fT0NSRW5naW5lLmxlbmd0aEJ5dGVzVVRGOCh0aGlzLl9fbGljZW5zZSkgKyAxO1xuICAgIHRoaXMuX19zdHJpbmdPbldhc21IZWFwID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKGxlbmd0aEJ5dGVzKTtcbiAgICB0aGlzLl9fT0NSRW5naW5lLnN0cmluZ1RvVVRGOCh0aGlzLl9fbGljZW5zZSwgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAsIGxlbmd0aEJ5dGVzKTtcbiAgICByZXR1cm4gdGhpcy5fX3N0cmluZ09uV2FzbUhlYXA7XG4gIH1cbiAgX19lbmNyeXB0U2NhblJlc3VsdChvY3JSZXN1bHQpIHtcbiAgICBsZXQgc3RyaW5nT25XYXNtSGVhcCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2Ygb2NyUmVzdWx0ID09PSAnbnVtYmVyJykgb2NyUmVzdWx0ID0gb2NyUmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICBpZiAob2NyUmVzdWx0ID09PSAnJykgcmV0dXJuICcnO1xuICAgICAgaWYgKHR5cGVvZiBvY3JSZXN1bHQgIT09ICdzdHJpbmcnICYmICEhIW9jclJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29jclJlc3VsdCBpcyBlbXB0eScpO1xuICAgICAgfVxuICAgICAgY29uc3QganNvblN0cmluZyA9IG9jclJlc3VsdDtcbiAgICAgIGNvbnN0IGxlbmd0aEJ5dGVzID0gdGhpcy5fX09DUkVuZ2luZS5sZW5ndGhCeXRlc1VURjgoanNvblN0cmluZykgKyAxO1xuICAgICAgc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19PQ1JFbmdpbmUuX21hbGxvYyhsZW5ndGhCeXRlcyk7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLnN0cmluZ1RvVVRGOChqc29uU3RyaW5nLCBzdHJpbmdPbldhc21IZWFwLCBsZW5ndGhCeXRlcyk7XG4gICAgICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5lbmNyeXB0UmVzdWx0KHN0cmluZ09uV2FzbUhlYXApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoc3RyaW5nT25XYXNtSGVhcCkge1xuICAgICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICBzdHJpbmdPbldhc21IZWFwID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgX19zZXRWaWRlb1Jlc29sdXRpb24odmlkZW9FbGVtZW50KSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgIGxldCByZXNvbHV0aW9uVGV4dCA9ICdub3QgcmVhZHknO1xuICAgIGlmICghdGhpcy5fX2NhbVNldENvbXBsZXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24sXG4gICAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAwKSB7XG4gICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgICByZXNvbHV0aW9uVGV4dFxuICAgICAgfTtcbiAgICB9XG4gICAgcmVzb2x1dGlvblRleHQgPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCArICd4JyArIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodDtcbiAgICBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT09IDEwODAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxOTIwIHx8IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxOTIwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gMTA4MCkge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSAxMjgwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PT0gNzIwIHx8IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID09PSA3MjAgJiYgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0ID09PSAxMjgwKSB7XG4gICAgICBpc1N1cHBvcnRlZFJlc29sdXRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aWRlb0VsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9fdmlkZW9XaWR0aCA9IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoO1xuICAgIHRoaXMuX192aWRlb0hlaWdodCA9IHZpZGVvRWxlbWVudC52aWRlb0hlaWdodDtcbiAgICByZXR1cm4ge1xuICAgICAgaXNTdXBwb3J0ZWRSZXNvbHV0aW9uLFxuICAgICAgcmVzb2x1dGlvblRleHRcbiAgICB9O1xuICB9XG4gIF9fZ2V0U2Nhbm5lckFkZHJlc3Mob2NyVHlwZSkge1xuICAgIGlmICghdGhpcy5fX29jclR5cGVMaXN0LmluY2x1ZGVzKG9jclR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBhZGRyZXNzID0gMDtcbiAgICAgIGxldCBkZXN0cm95Q2FsbGJhY2sgPSBudWxsO1xuICAgICAgY29uc3Qgc3RyaW5nT25XYXNtSGVhcCA9IHRoaXMuX19nZXRTdHJpbmdPbldhc21IZWFwKCk7XG4gICAgICBzd2l0Y2ggKG9jclR5cGUpIHtcbiAgICAgICAgLy8gT0NSXG4gICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRJRENhcmRTY2FubmVyKHN0cmluZ09uV2FzbUhlYXApO1xuICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayA9ICgpID0+IHRoaXMuX19PQ1JFbmdpbmUuZGVzdHJveUlEQ2FyZFNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0JzpcbiAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBhZGRyZXNzID0gdGhpcy5fX09DUkVuZ2luZS5nZXRQYXNzcG9ydFNjYW5uZXIoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICAgICAgZGVzdHJveUNhbGxiYWNrID0gKCkgPT4gdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95UGFzc3BvcnRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgIGFkZHJlc3MgPSB0aGlzLl9fT0NSRW5naW5lLmdldEFsaWVuU2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lBbGllblNjYW5uZXIoYWRkcmVzcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgYWRkcmVzcyA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0Q3JlZGl0U2Nhbm5lcihzdHJpbmdPbldhc21IZWFwKTtcbiAgICAgICAgICBkZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB0aGlzLl9fT0NSRW5naW5lLmRlc3Ryb3lDcmVkaXRTY2FubmVyKGFkZHJlc3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkb2VzIG5vdCBleGlzdHMnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUoc3RyaW5nT25XYXNtSGVhcCk7XG4gICAgICBpZiAoYWRkcmVzcyA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5fX21heFJldHJ5Q291bnRHZXRBZGRyZXNzID09PSB0aGlzLl9fcmV0cnlDb3VudEdldEFkZHJlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIExpY2Vuc2UgS2V5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3JldHJ5Q291bnRHZXRBZGRyZXNzKys7XG4gICAgICB9XG4gICAgICByZXR1cm4gW2FkZHJlc3MsIGRlc3Ryb3lDYWxsYmFja107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVE9ETyA6IExpY2Vuc2UgSXNzdWXsnbgg6rK97JqwIOyXkOufrCDqsJLsnYQg67Cb7JWE7IScIGVycm9yIOuhnOq3uOulvCDssI3snYQg7IiYIOyeiOqyjCDsmpTssq3tlYTsmpQgKOyehOyLnCBO67KIIOydtOyDgSBhZGRyZXNz66W8IOuqu+uwm+ycvOuptCDqsJXsoJwg7JeQ65+sKVxuICAgICAgdm9pZCAwO1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgX19nZXRCdWZmZXIoKSB7XG4gICAgaWYgKCF0aGlzLl9fQnVmZmVyKSB7XG4gICAgICB0aGlzLl9fQnVmZmVyID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKHRoaXMuX19yZXNvbHV0aW9uV2lkdGggKiB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCAqIDQpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX19yZXN1bHRCdWZmZXIpIHtcbiAgICAgIHRoaXMuX19yZXN1bHRCdWZmZXIgPSB0aGlzLl9fT0NSRW5naW5lLl9tYWxsb2MoNDA5Nik7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrSW5mbykge1xuICAgICAgaWYgKCF0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYpIHtcbiAgICAgICAgdGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmID0gdGhpcy5fX09DUkVuZ2luZS5fbWFsbG9jKDQwOTYpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3RoaXMuX19CdWZmZXIsIHRoaXMuX19yZXN1bHRCdWZmZXIsIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1Zl07XG4gIH1cbiAgYXN5bmMgX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCBtYXNrTW9kZSwgaW1nTW9kZSwgaW1nVHlwZSA9ICdjYXJkJykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoaW1nVHlwZSA9PT0gJ2NhcmQnKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZW5jb2RlSnBnRGV0ZWN0ZWRGcmFtZUltYWdlKGFkZHJlc3MsIG1hc2tNb2RlLCBpbWdNb2RlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW1nVHlwZSA9PT0gJ2ZhY2UnKSB7XG4gICAgICAgIHRoaXMuX19PQ1JFbmdpbmUuZW5jb2RlSnBnRGV0ZWN0ZWRQaG90b0ltYWdlKGFkZHJlc3MpO1xuICAgICAgfVxuICAgICAgY29uc3QganBnU2l6ZSA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0RW5jb2RlZEpwZ1NpemUoKTtcbiAgICAgIGNvbnN0IGpwZ1BvaW50ZXIgPSB0aGlzLl9fT0NSRW5naW5lLmdldEVuY29kZWRKcGdCdWZmZXIoKTtcbiAgICAgIGNvbnN0IHJlc3VsdFZpZXcgPSBuZXcgVWludDhBcnJheSh0aGlzLl9fT0NSRW5naW5lLkhFQVA4LmJ1ZmZlciwganBnUG9pbnRlciwganBnU2l6ZSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBuZXcgVWludDhBcnJheShyZXN1bHRWaWV3KTtcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbcmVzdWx0XSwge1xuICAgICAgICB0eXBlOiAnaW1hZ2UvanBlZydcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX19ibG9iVG9CYXNlNjQoYmxvYik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdm9pZCAwO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fX09DUkVuZ2luZS5kZXN0cm95RW5jb2RlZEpwZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGcmVlIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lCdWZmZXIoKSB7XG4gICAgaWYgKHRoaXMuX19CdWZmZXIpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX0J1ZmZlcik7XG4gICAgICB0aGlzLl9fQnVmZmVyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fX2Rlc3Ryb3lSZXN1bHRCdWZmZXIoKTtcbiAgICB0aGlzLl9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCk7XG4gIH1cbiAgX19kZXN0cm95UmVzdWx0QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fcmVzdWx0QnVmZmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLl9mcmVlKHRoaXMuX19yZXN1bHRCdWZmZXIpO1xuICAgICAgdGhpcy5fX3Jlc3VsdEJ1ZmZlciA9IG51bGw7XG4gICAgfVxuICB9XG4gIF9fZGVzdHJveU1hc2tJbmZvUmVzdWx0QnVmZmVyKCkge1xuICAgIGlmICh0aGlzLl9fbWFza0luZm9SZXN1bHRCdWYgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX21hc2tJbmZvUmVzdWx0QnVmKTtcbiAgICAgIHRoaXMuX19tYXNrSW5mb1Jlc3VsdEJ1ZiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZyZWUgUHJldkltYWdlIGJ1ZmZlciAqL1xuICBfX2Rlc3Ryb3lQcmV2SW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuX19QcmV2SW1hZ2UgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX1ByZXZJbWFnZSk7XG4gICAgICB0aGlzLl9fUHJldkltYWdlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogZnJlZSBzdHJpbmcgaGVhcCBidWZmZXIgKi9cbiAgX19kZXN0cm95U3RyaW5nT25XYXNtSGVhcCgpIHtcbiAgICBpZiAodGhpcy5fX3N0cmluZ09uV2FzbUhlYXApIHtcbiAgICAgIHRoaXMuX19PQ1JFbmdpbmUuX2ZyZWUodGhpcy5fX3N0cmluZ09uV2FzbUhlYXApO1xuICAgICAgdGhpcy5fX3N0cmluZ09uV2FzbUhlYXAgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBmcmVlIHNjYW5uZXIgYWRkcmVzcyAqL1xuICBfX2Rlc3Ryb3lTY2FubmVyQWRkcmVzcygpIHtcbiAgICBpZiAodGhpcy5fX2Rlc3Ryb3lTY2FubmVyQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrKCk7XG4gICAgICB0aGlzLl9fZGVzdHJveVNjYW5uZXJDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9faXNWaWRlb1Jlc29sdXRpb25Db21wYXRpYmxlKHZpZGVvRWxlbWVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzU3VwcG9ydGVkUmVzb2x1dGlvbixcbiAgICAgIHJlc29sdXRpb25UZXh0XG4gICAgfSA9IGF3YWl0IHRoaXMuX19zZXRWaWRlb1Jlc29sdXRpb24odmlkZW9FbGVtZW50KTtcbiAgICBpZiAoIWlzU3VwcG9ydGVkUmVzb2x1dGlvbikge1xuICAgICAgaWYgKHJlc29sdXRpb25UZXh0ICE9PSAnbm90IHJlYWR5Jykge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc1N1cHBvcnRlZFJlc29sdXRpb247XG4gIH1cbiAgX19nZXRSb3RhdGlvbkRlZ3JlZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuX19vcHRpb25zLnJvdGF0aW9uRGVncmVlICUgMzYwICsgMzYwKSAlIDM2MDtcbiAgfVxuICBfX2dldE1pcnJvck1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19vcHRpb25zLm1pcnJvck1vZGU7XG4gIH1cbiAgYXN5bmMgX19jcm9wSW1hZ2VGcm9tVmlkZW8oKSB7XG4gICAgaWYgKCF0aGlzLl9fY2FtU2V0Q29tcGxldGUpIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgbGV0IFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgY29uc3Qge1xuICAgICAgdmlkZW8sXG4gICAgICBjYW52YXMsXG4gICAgICByb3RhdGlvbkNhbnZhc1xuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuXG4gICAgLy8gc291cmNlIGltYWdlIChvciB2aWRlbylcbiAgICAvLyDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJNcbiAgICAvLyDilIMgICAgIOKUiiBzeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vIOKUg+KUiOKUiOKUiOKUiCDilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJMg4pSKICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDIHN4ICDilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKIHNIZWlnaHQgICAgICAg4pSDXG4gICAgLy8g4pSDICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAgICAgICAg4pSDICAgICAgICAgICAgICAgZGVzdGluYXRpb24gY2FudmFzXG4gICAgLy8g4pSDICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsg4pSKICAgICAgICAgICAgICAg4pSD4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSTXG4gICAgLy8g4pSDICAgICDilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIggICAgICAgICAgICAgICAgIOKUgyAgICDilIogICAgICAgICAgICAgICAgICAgICAgICAgICDilINcbiAgICAvLyDilIMgICAgICAgICAgIHNXaWR0aCAgICAgICAgICAgICAgICAgICAgICDilIMgICAg4pSKIGR5ICAgICAgICAgICAgICAgICAgICAgICAg4pSDXG4gICAgLy8g4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSbICAgIOKUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUkyDilIogICAgICAgICDilINcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIPilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgIGR4ICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKIGRIZWlnaHQg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICDilIMgICAgICAgICAgICAgICDilIMg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICDilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilJsg4pSKICAgICAgICAg4pSDXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSDICAgICAgICAgICDilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIjilIggICAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUgyAgICAgICAgICAgICAgICAgZFdpZHRoICAgICAgICAgICAgICAgIOKUg1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUm1xuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgZHgsIGR5KVxuICAgIC8vIGRyYXdJbWFnZShpbWFnZSwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpXG4gICAgLy8gZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC9kcmF3SW1hZ2VcblxuICAgIGxldCBjYWxjQ2FudmFzID0gY2FudmFzO1xuICAgIGxldCBjYWxjVmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9IHZpZGVvLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPSB2aWRlby5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNDcm9wSW1hZ2VTaXplV2lkdGggPSB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoO1xuICAgIGxldCBjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCA9IHRoaXMuX19jcm9wSW1hZ2VTaXplSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9PcmllbnRhdGlvbiA9IHRoaXMuX192aWRlb09yaWVudGF0aW9uO1xuICAgIGNvbnN0IGlzQWxpZW5CYWNrID0gdGhpcy5fX29jclR5cGUgPT09ICdhbGllbi1iYWNrJztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIFtjYWxjQ3JvcEltYWdlU2l6ZVdpZHRoLCBjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodF0gPSBbY2FsY0Nyb3BJbWFnZVNpemVIZWlnaHQsIGNhbGNDcm9wSW1hZ2VTaXplV2lkdGhdO1xuICAgICAgW2NhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2hdID0gW2NhbGNSZXNvbHV0aW9uX2gsIGNhbGNSZXNvbHV0aW9uX3ddO1xuICAgICAgY2FsY0NhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgICAgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICB9XG4gICAgbGV0IGNhbGNNYXhTV2lkdGggPSA5OTk5OTtcbiAgICBsZXQgY2FsY01heFNIZWlnaHQgPSA5OTk5OTtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmIChjYWxjVmlkZW9PcmllbnRhdGlvbiA9PT0gdGhpcy5fX3VpT3JpZW50YXRpb24pIHtcbiAgICAgICAgLy8g7IS466GcIFVJIC8g7IS466GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U1dpZHRoID0gY2FsY1ZpZGVvV2lkdGg7XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g7IS466GcIFVJIC8g6rCA66GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U0hlaWdodCA9IGNhbGNWaWRlb0hlaWdodDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDqsIDroZwgVUkgLyDqsIDroZwg7Lm066mU6528XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g6rCA66GcIFVJIC8g7IS466GcIOy5tOuplOudvFxuICAgICAgICBjYWxjTWF4U1dpZHRoID0gY2FsY1ZpZGVvV2lkdGg7XG4gICAgICAgIGNhbGNNYXhTSGVpZ2h0ID0gY2FsY1ZpZGVvSGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3gsIHN5O1xuICAgIGNvbnN0IHJhdGlvID0gY2FsY1ZpZGVvV2lkdGggLyBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBjb25zdCBzV2lkdGggPSBNYXRoLm1pbihNYXRoLnJvdW5kKGNhbGNDcm9wSW1hZ2VTaXplV2lkdGggKiByYXRpbyksIGNhbGNNYXhTV2lkdGgpO1xuICAgIGNvbnN0IHNIZWlnaHQgPSBNYXRoLm1pbihNYXRoLnJvdW5kKGNhbGNDcm9wSW1hZ2VTaXplSGVpZ2h0ICogcmF0aW8pLCBjYWxjTWF4U0hlaWdodCk7XG4gICAgc3ggPSBNYXRoLm1heChNYXRoLnJvdW5kKChjYWxjVmlkZW9DbGllbnRXaWR0aCAtIGNhbGNDcm9wSW1hZ2VTaXplV2lkdGgpIC8gMiAqIHJhdGlvKSwgMCk7XG4gICAgc3kgPSBNYXRoLm1heChNYXRoLnJvdW5kKChjYWxjVmlkZW9DbGllbnRIZWlnaHQgLSBjYWxjQ3JvcEltYWdlU2l6ZUhlaWdodCkgLyAyICogcmF0aW8pLCAwKTtcbiAgICBpZiAoaXNBbGllbkJhY2spIHtcbiAgICAgIFtjYWxjUmVzb2x1dGlvbl93LCBjYWxjUmVzb2x1dGlvbl9oXSA9IFtjYWxjUmVzb2x1dGlvbl9oLCBjYWxjUmVzb2x1dGlvbl93XTtcbiAgICB9XG4gICAgY2FsY0NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgY2FsY1Jlc29sdXRpb25fdyk7XG4gICAgY2FsY0NhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGNvbnN0IGNhbGNDb250ZXh0ID0gY2FsY0NhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgIHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZVxuICAgIH0pO1xuICAgIGNhbGNDb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIDAsIDAsIGNhbGNSZXNvbHV0aW9uX3csIGNhbGNSZXNvbHV0aW9uX2gpO1xuICAgIGxldCBpbWdEYXRhLCBpbWdEYXRhVXJsO1xuICAgIGltZ0RhdGEgPSBjYWxjQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FsY1Jlc29sdXRpb25fdywgY2FsY1Jlc29sdXRpb25faCk7XG4gICAgaW1nRGF0YVVybCA9IGNhbGNDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XG4gICAgaWYgKGlzQWxpZW5CYWNrKSB7XG4gICAgICBbaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fcm90YXRlKGltZ0RhdGEsIGltZ0RhdGFVcmwsIDI3MCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX19yb3RhdGUoaW1nRGF0YSwgaW1nRGF0YVVybCwgdGhpcy5fX2dldFJvdGF0aW9uRGVncmVlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW2ltZ0RhdGEsIGltZ0RhdGFVcmxdO1xuICAgIH1cbiAgfVxuICBhc3luYyBfX3JvdGF0ZShpbWdEYXRhLCBpbWdEYXRhVXJsLCBkZWdyZWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoZGVncmVlID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoW2ltZ0RhdGEsIGltZ0RhdGFVcmxdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgaW1nLnNyYyA9IGltZ0RhdGFVcmw7XG4gICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gY2FudmFzID0gcm90YXRpb25DYW52YXM7XG4gICAgICAgIGNvbnN0IHRlbXBDb250ZXh0ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0ZW1wQ2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgaWYgKFs5MCwgMjcwXS5pbmNsdWRlcyhkZWdyZWUpKSB7XG4gICAgICAgICAgdGVtcENhbnZhcy53aWR0aCA9IGltZy5oZWlnaHQ7XG4gICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBpbWcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoWzAsIDE4MF0uaW5jbHVkZXMoZGVncmVlKSkge1xuICAgICAgICAgIHRlbXBDYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWdyZWUgPT09IDkwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoaW1nLmhlaWdodCwgMCk7ZWxzZSBpZiAoZGVncmVlID09PSAxODApIHRlbXBDb250ZXh0LnRyYW5zbGF0ZShpbWcud2lkdGgsIGltZy5oZWlnaHQpO2Vsc2UgaWYgKGRlZ3JlZSA9PT0gMjcwKSB0ZW1wQ29udGV4dC50cmFuc2xhdGUoMCwgaW1nLndpZHRoKTtcbiAgICAgICAgdGVtcENvbnRleHQucm90YXRlKGRlZ3JlZSAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICB0ZW1wQ29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VEYXRhID0gWzkwLCAyNzBdLmluY2x1ZGVzKGRlZ3JlZSkgPyB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nLmhlaWdodCwgaW1nLndpZHRoKSA6IHRlbXBDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuICAgICAgICByZXNvbHZlKFtuZXdJbWFnZURhdGEsIHRlbXBDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyldKTtcbiAgICAgICAgdGVtcENvbnRleHQucmVzdG9yZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19pc0NhcmRib3hEZXRlY3RlZChhZGRyZXNzLCBib3hUeXBlID0gMCwgcmV0cnlJbWcgPSBudWxsKSB7XG4gICAgaWYgKCFhZGRyZXNzIHx8IGFkZHJlc3MgPCAwKSB7XG4gICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpbWdEYXRhO1xuICAgICAgbGV0IGltZ0RhdGFVcmwgPSBudWxsO1xuICAgICAgY29uc3QgW2J1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBpZiAocmV0cnlJbWcgIT09IG51bGwpIHtcbiAgICAgICAgaW1nRGF0YSA9IHJldHJ5SW1nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW2ltZ0RhdGEsIGltZ0RhdGFVcmxdID0gYXdhaXQgdGhpcy5fX2Nyb3BJbWFnZUZyb21WaWRlbygpO1xuICAgICAgfVxuICAgICAgaWYgKCEhIWltZ0RhdGEpIHtcbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgICB9XG4gICAgICB0aGlzLl9fT0NSRW5naW5lLkhFQVA4LnNldChpbWdEYXRhLmRhdGEsIGJ1ZmZlcik7XG4gICAgICBsZXQga29yID0gZmFsc2UsXG4gICAgICAgIGFsaWVuID0gZmFsc2UsXG4gICAgICAgIHBhc3Nwb3J0ID0gZmFsc2U7XG4gICAgICBzd2l0Y2ggKHRoaXMuX19vY3JUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgIGNhc2UgJ2RyaXZlcic6XG4gICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICBrb3IgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgIGNhc2UgJ3Bhc3Nwb3J0LXNzYSc6XG4gICAgICAgIGNhc2UgJ2ZvcmVpZ24tcGFzc3BvcnQnOlxuICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgcGFzc3BvcnQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhbGllbic6XG4gICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgIGFsaWVuID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3JlZGl0JzpcbiAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBPQ1IgdHlwZScpO1xuICAgICAgfVxuICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICBpZiAoa29yIHx8IHBhc3Nwb3J0IHx8IGFsaWVuKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZGV0ZWN0X2lkY2FyZF9vcHQoYnVmZmVyLCB0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgYWRkcmVzcywga29yLCBhbGllbiwgcGFzc3BvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5kZXRlY3RfaWRjYXJkKGJ1ZmZlciwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHQsIGFkZHJlc3MsIGJveFR5cGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBjb25zb2xlLmxvZygnaXNDYXJkYm94RGV0ZWN0ZWQgcmVzdWx0IC09LS0tLS0nLCByZXN1bHQpXG4gICAgICByZXR1cm4gWyEhcmVzdWx0LCBpbWdEYXRhLCBpbWdEYXRhVXJsXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gJ0NhcmQgZGV0ZWN0aW9uIGVycm9yIDogJyArIGU7XG4gICAgICBpZiAoZS50b1N0cmluZygpLmluY2x1ZGVzKCdtZW1vcnknKSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fc3RhcnRSZWNvZ25pdGlvbihhZGRyZXNzLCBvY3JUeXBlLCBzc2FNb2RlLCBpc1NldElnbm9yZUNvbXBsZXRlLCBpbWdEYXRhLCBpbWdEYXRhVXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChhZGRyZXNzID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAoYWRkcmVzcyA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICdjaGVja1ZhbGlkYXRpb24gRmFpbCc7XG4gICAgICB9XG4gICAgICBsZXQgb2NyUmVzdWx0ID0gbnVsbDtcbiAgICAgIGlmICghdGhpcy5fX29jclR5cGVMaXN0LmluY2x1ZGVzKG9jclR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIE9DUiB0eXBlJyk7XG4gICAgICBjb25zdCBbLCByZXN1bHRCdWZmZXJdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgICAgY29uc3QgcmVjb2duaXRpb24gPSBhc3luYyBpc1NldElnbm9yZUNvbXBsZXRlID0+IHtcbiAgICAgICAgaWYgKGlzU2V0SWdub3JlQ29tcGxldGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQoYWRkcmVzcywgMCwgaW1nRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChvY3JUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaWRjYXJkJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXInOlxuICAgICAgICAgIGNhc2UgJ2lkY2FyZC1zc2EnOlxuICAgICAgICAgIGNhc2UgJ2RyaXZlci1zc2EnOlxuICAgICAgICAgICAgb2NyUmVzdWx0ID0gdGhpcy5fX09DUkVuZ2luZS5zY2FuSURDYXJkKGFkZHJlc3MsIHJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAnZm9yZWlnbi1wYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5QYXNzcG9ydChhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4nOlxuICAgICAgICAgIGNhc2UgJ2FsaWVuLXNzYSc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5BbGllbihhZGRyZXNzLCByZXN1bHRCdWZmZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWxpZW4tYmFjayc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5BbGllbkJhY2soYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NyZWRpdCc6XG4gICAgICAgICAgICBvY3JSZXN1bHQgPSB0aGlzLl9fT0NSRW5naW5lLnNjYW5DcmVkaXQoYWRkcmVzcywgcmVzdWx0QnVmZmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjYW5uZXIgZG9lcyBub3QgZXhpc3RzJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiDsi6DsmqnsubTrk5zripQg7JWE7KeBIGtleTp2YWx1ZSDtmJXtg5zroZwg67OA7ZmYIOyViOuQmOyWtCDsnojsnYxcbiAgICAgICAgaWYgKG9jclR5cGUgPT09ICdjcmVkaXQnKSB7XG4gICAgICAgICAgaWYgKG9jclJlc3VsdCA9PT0gbnVsbCB8fCBvY3JSZXN1bHQgPT09ICcnIHx8IG9jclJlc3VsdCA9PT0gJ2ZhbHNlJyB8fCBvY3JSZXN1bHRbMF0gPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9jclJlc3VsdCA9IHRoaXMuX19jc3ZUb09iamVjdChvY3JSZXN1bHQpO1xuICAgICAgICBpZiAob2NyUmVzdWx0Py5jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgb2NyUmVzdWx0Py5jb21wbGV0ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzU2V0SWdub3JlQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fbWFudWFsT0NSUmV0cnlDb3VudCA8IHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50KSB7XG4gICAgICAgICAgICAgIC8vIGRldGVjdGVkQ2FyZFF1ZXVl7JeQ7IScIO2VnOyepeydhCDqurzrgrTshJwg6rCx7Iug7ZWc64ukLlxuICAgICAgICAgICAgICAvLyDsoIDsnqXrkJjslrTsnojripQg7J2066+47KeA7J2YIOyIq+yekOqwgCByZXRyeSDrs7Tri6Qg7J6R7J2A6rK97JqwIOuMgOu5hO2VmOyXrCAl66W8IOyCrOyaqe2VqFxuICAgICAgICAgICAgICBjb25zdCBxdWV1ZUlkeCA9IHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50ICUgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgaW1nRGF0YSA9IHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZVtxdWV1ZUlkeF07XG4gICAgICAgICAgICAgIHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCByZWNvZ25pdGlvbihpc1NldElnbm9yZUNvbXBsZXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIOyCrOynhCDtlZzsnqXsnLzroZwgT0NSIOyLpO2MqCAocG9wdXAg64K066as6rOgIHNldElnbm9yZUNvbXBsZXRlKGZhbHNlKSDsspjrpqw/XG4gICAgICAgICAgICAgIHRoaXMuX19tYW51YWxPQ1JSZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZShmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpOyAvLyDtjJ3sl4XsnbQg64K066Ck6rCI65WMIOyymOumrOuQmOyngOunjCDrr7jrpqwg7LKY66asXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCwgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgICB0aGlzLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICAvLyBlbmQgb2YgZnVuY3Rpb24gcmVjb2duaXRpb24oKVxuXG4gICAgICBpZiAoYXdhaXQgcmVjb2duaXRpb24oaXNTZXRJZ25vcmVDb21wbGV0ZSkpIHtcbiAgICAgICAgY29uc3QgaXNDcmVkaXRDYXJkID0gb2NyVHlwZSA9PT0gJ2NyZWRpdCc7XG4gICAgICAgIGxldCBvY3JJbWFnZU1vZGU7XG4gICAgICAgIGlmIChpc0NyZWRpdENhcmQpIHtcbiAgICAgICAgICBvY3JJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5DUk9QUElORztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fb3B0aW9ucy51c2VJbWFnZVdhcnBpbmcpIHtcbiAgICAgICAgICBvY3JJbWFnZU1vZGUgPSB0aGlzLk9DUl9JTUdfTU9ERS5XQVJQSU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9jckltYWdlTW9kZSA9IHRoaXMuT0NSX0lNR19NT0RFLk5PTkU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yaWdpbkltYWdlID0gYXdhaXQgdGhpcy5fX2dldEltYWdlQmFzZTY0KGFkZHJlc3MsIHRoaXMuT0NSX0lNR19NQVNLX01PREUuRkFMU0UsIG9jckltYWdlTW9kZSk7XG4gICAgICAgIGxldCBtYXNrSW1hZ2UgPSBudWxsO1xuICAgICAgICBsZXQgZmFjZUltYWdlID0gbnVsbDtcbiAgICAgICAgaWYgKCFpc0NyZWRpdENhcmQpIHtcbiAgICAgICAgICBtYXNrSW1hZ2UgPSBhd2FpdCB0aGlzLl9fZ2V0SW1hZ2VCYXNlNjQoYWRkcmVzcywgdGhpcy5PQ1JfSU1HX01BU0tfTU9ERS5UUlVFLCB0aGlzLk9DUl9JTUdfTU9ERS5XQVJQSU5HKTtcbiAgICAgICAgICBtYXNrSW1hZ2UgPSBtYXNrSW1hZ2UgPT09ICdkYXRhOicgPyBudWxsIDogbWFza0ltYWdlO1xuICAgICAgICAgIGZhY2VJbWFnZSA9IHRoaXMuX19vcHRpb25zLnVzZUZhY2VJbWFnZSA/IGF3YWl0IHRoaXMuX19nZXRJbWFnZUJhc2U2NChhZGRyZXNzLCBudWxsLCBvY3JJbWFnZU1vZGUsICdmYWNlJykgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzc2FNb2RlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0EsIGZhbHNlLCBtYXNrSW1hZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9SRUNPR05JWkVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgIC8vIGlmICghaXNDcmVkaXRDYXJkICYmIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlKSB7XG4gICAgICAgIC8vICAgb3JpZ2luSW1hZ2UgPSB0aGlzLl9fZ2V0UGlpRW5jcnlwdEltYWdlQmFzZTY0KFxuICAgICAgICAvLyAgICAgYWRkcmVzcyxcbiAgICAgICAgLy8gICAgIHRoaXMuT0NSX0lNR19NQVNLX01PREUuRkFMU0UsXG4gICAgICAgIC8vICAgICBvY3JJbWFnZU1vZGVcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdlbmNyeXB0IGJhc2U2NCBpbWFnZScsIHsgb3JpZ2luSW1hZ2UgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaWYgKGZhY2VJbWFnZSAmJiB0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0RmFjZSkge1xuICAgICAgICAvLyAgIGZhY2VJbWFnZSA9IHRoaXMuX19nZXRQaWlFbmNyeXB0SW1hZ2VCYXNlNjQoXG4gICAgICAgIC8vICAgICBhZGRyZXNzLFxuICAgICAgICAvLyAgICAgbnVsbCxcbiAgICAgICAgLy8gICAgIG9jckltYWdlTW9kZSxcbiAgICAgICAgLy8gICAgICdmYWNlJ1xuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2VuY3J5cHQgYmFzZTY0IGZhY2UgaW1hZ2UnLCB7IGZhY2VJbWFnZSB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICAgICAgICByZXR1cm4gW29jclJlc3VsdCwgb3JpZ2luSW1hZ2UsIG1hc2tJbWFnZSwgZmFjZUltYWdlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbZmFsc2UsIG51bGwsIG51bGwsIG51bGxdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIF9fc3RhcnRUcnV0aChvY3JUeXBlLCBhZGRyZXNzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IFssIHJlc3VsdEJ1ZmZlcl0gPSB0aGlzLl9fZ2V0QnVmZmVyKCk7XG4gICAgICBpZiAob2NyVHlwZS5pbmRleE9mKCctc3NhJykgPiAtMSkge1xuICAgICAgICAvLyBUT0RPOiB3b3JrZXLrpbwg7IKs7Jqp7ZWY7JesIOuplOyduChVSSDrnpzrjZTrp4EpIOyKpOugiOuTnOqwgCDrqYjstpTsp4Ag7JWK64+E66GdIOyymOumrCDtlYTsmpQgKO2YhOyerCBsb2FkaW5nIFVJIOudhOyasOuptCDslaDri4jrqZTsnbTshZgg66mI7LakKVxuICAgICAgICAvLyBUT0RPOiBzZXRUaW1lb3V0IOycvOuhnCDrgpjriITrjZTrnbzrj4Qg7Zqo6rO8IOyXhuydjCBzZXRUaW1lb3V0IOyngOyasOqzoCwgd29ya2Vy66GcIOuzgOqyvSDtlYTsmpRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLl9fT0NSRW5naW5lLnNjYW5UcnV0aChhZGRyZXNzLCByZXN1bHRCdWZmZXIpKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1NTQSBNb2RlIGlzIHRydWUuIGJ1dCwgb2NyVHlwZSBpcyBpbnZhbGlkIDogJyArIG9jclR5cGUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX2NzdlRvT2JqZWN0KHN0cikge1xuICAgIGxldCBwYWlycyA9IHN0ci5zcGxpdCgnOycpO1xuICAgIGxldCBvYmogPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc6Jyk7XG4gICAgICBpZiAocGFpci5sZW5ndGggPT09IDIpIG9ialtwYWlyWzBdXSA9IHBhaXJbMV07XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgX19nZXRNYXNrSW5mbyhhZGRyZXNzKSB7XG4gICAgaWYgKGFkZHJlc3MgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoYWRkcmVzcyA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAnY2hlY2tWYWxpZGF0aW9uIEZhaWwnO1xuICAgIH1cbiAgICBjb25zdCBbLCwgbWFza0luZm9SZXN1bHRCdWZdID0gdGhpcy5fX2dldEJ1ZmZlcigpO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIHJlc3VsdCA9IHRoaXMuX19PQ1JFbmdpbmUuZ2V0TWFza1JlY3QoYWRkcmVzcywgbWFza0luZm9SZXN1bHRCdWYpO1xuICAgIGlmIChyZXN1bHQgPT0gbnVsbCB8fCByZXN1bHQgPT09ICcnKSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5fX2Rlc3Ryb3lNYXNrSW5mb1Jlc3VsdEJ1ZmZlcigpO1xuXG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLl9fY3N2VG9PYmplY3QocmVzdWx0KTtcbiAgfVxuICBhc3luYyBfX3N0YXJ0VHJ1dGhSZXRyeShvY3JUeXBlLCBhZGRyZXNzLCBpbWdEYXRhKSB7XG4gICAgYXdhaXQgdGhpcy5fX2lzQ2FyZGJveERldGVjdGVkKGFkZHJlc3MsIDAsIGltZ0RhdGEpO1xuICAgIC8vIGF3YWl0IHRoaXMuX19zdGFydFJlY29nbml0aW9uKGFkZHJlc3MsIG9jclR5cGUsIHRydWUpOyAgICAgIC8vIGZvciDshLHriqXsnYQg7JyE7ZW0IOynhO2WiSBYXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX19zdGFydFRydXRoKG9jclR5cGUsIGFkZHJlc3MpO1xuICB9XG4gIF9fc2V0Q2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpIHtcbiAgICB0aGlzLl9fY2xlYXJDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7XG4gICAgdGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIC8vIDHstIggZGVsYXkg7ZuEIOyLpO2WiVxuICAgICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgfSwgdGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlJbnRlcnZhbCk7XG4gIH1cbiAgYXN5bmMgX19wcm9jZWVkQ2FtZXJhUGVybWlzc2lvbigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgICAgY29uc3QgaXNQYXNzcG9ydCA9IHRoaXMuX19vY3JUeXBlLmluY2x1ZGVzKCdwYXNzcG9ydCcpO1xuICAgICAgYXdhaXQgdGhpcy5fX3NldHVwVmlkZW8oaXNQYXNzcG9ydCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHZpZGVvXG4gICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAvLyBjb25zdCBbdHJhY2tdID0gdGhpcy5fX3N0cmVhbS5nZXRWaWRlb1RyYWNrcygpO1xuICAgICAgICAvLyBjb25zdCBjYXBhYmlsaXR5ID0gdHJhY2suZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGVidWcoJ0NhcmRTY2FuX19pbml0aWFsaXplIGNhcGFiaWxpdHknLCBjYXBhYmlsaXR5KTtcbiAgICAgICAgaWYgKCdzcmNPYmplY3QnIGluIHZpZGVvKSB7XG4gICAgICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gdGhpcy5fX3N0cmVhbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBBdm9pZCB1c2luZyB0aGlzIGluIG5ldyBicm93c2VycywgYXMgaXQgaXMgZ29pbmcgYXdheS5cbiAgICAgICAgICB2aWRlby5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLl9fc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsICgpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmRlYnVnKCdwcm9jZWVkQ2FtZXJhUGVybWlzc2lvbiAtIG9ubG9hZGVkbWV0YWRhdGEnKTtcbiAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHZvaWQgMDtcblxuICAgICAgICAgIC8vIHZpZGVvIGVsZW1lbnQgc3R5bGUg7ISk7KCVXG4gICAgICAgICAgdGhpcy5fX3ZpZGVvT3JpZW50YXRpb24gPSB2aWRlby52aWRlb1dpZHRoIC8gdmlkZW8udmlkZW9IZWlnaHQgPCAxID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHRoaXMuX19jYW1TZXRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fX2FkanVzdFN0eWxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5SRUFEWSk7XG4gICAgICAgIHZpZGVvLndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UodGhpcy5JTl9QUk9HUkVTUy5OT1RfUkVBRFkpO1xuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAoZS5uYW1lID09PSAnTm90QWxsb3dlZEVycm9yJykge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIEFjY2VzcyBQZXJtaXNzaW9uIGlzIG5vdCBhbGxvd2VkJztcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFNDAzJywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5uYW1lID09PSAnTm90UmVhZGFibGVFcnJvcicpIHtcbiAgICAgICAgLy8g64uk66W46rOz7JeQ7IScIOy5tOuplOudvCDsnpDsm5DsnYQg7IKs7Jqp7KSRXG4gICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWSk7XG4gICAgICAgIHRoaXMuc3RvcFN0cmVhbSgpO1xuICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCA8IDApIHtcbiAgICAgICAgICAvLyDsubTrqZTrnbwg66as7IaM7IqkIOyerOyalOyyrSDtmp/siJjsoJztlZwg7JeG7J2MXG4gICAgICAgICAgdGhpcy5fX2NhbWVyYVJlc291cmNlUmV0cnlDb3VudCArPSAxO1xuICAgICAgICAgIHRoaXMuX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7IC8vIOyerOq3gCDtmLjstpxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCA+IHRoaXMuX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX19jYW1lcmFSZXNvdXJjZVJldHJ5Q291bnQgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuX19zZXRDYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKCk7IC8vIOyerOq3gCDtmLjstpxcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ0NhbWVyYSBwZXJtaXNzaW9ucyB3ZXJlIGdyYW50ZWQsIGJ1dCBGYWlsZWQgdG8gYWNxdWlyZSBDYW1lcmEgcmVzb3VyY2VzLic7XG4gICAgICAgICAgICB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnRTQwMycsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XG4gICAgICAgIC8vIOq4sOq4sOyXkCDsl7DqsrDrkJwg7Lm066mU65286rCAIOyXhuydjFxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnQ2FtZXJhIE5vdCBGb3VuZCc7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnRTQwNCcsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnVW5rbm93biBFcnJvciBPY2N1cmVkJztcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICB2b2lkIDA7XG4gICAgICAgIHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdFOTk5JywgZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgX19zZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgICBpZiAoZWwgJiYgc3R5bGUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgX19jaGFuZ2VPQ1JTdGF0dXModmFsKSB7XG4gICAgc3dpdGNoICh2YWwpIHtcbiAgICAgIC8vIE9DUlxuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLk5PVF9SRUFEWTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5OT1RfUkVBRFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLklOX1BST0dSRVNTLlJFQURZOlxuICAgICAgICB0aGlzLl9fb2NyU3RhdHVzID0gdGhpcy5PQ1JfU1RBVFVTLlJFQURZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRDpcbiAgICAgIGNhc2UgdGhpcy5JTl9QUk9HUkVTUy5PQ1JfUkVDT0dOSVpFRF9XSVRIX1NTQTpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5PQ1JfU1VDQ0VTUztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1M6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1NfV0lUSF9TU0E6XG4gICAgICBjYXNlIHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRDpcbiAgICAgICAgdGhpcy5fX29jclN0YXR1cyA9IHRoaXMuT0NSX1NUQVRVUy5ET05FO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19jaGFuZ2VTdGFnZSh2YWwsIGZvcmNlVXBkYXRlID0gZmFsc2UsIHJlY29nbml6ZWRJbWFnZSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5fX3ByZXZpb3VzSW5Qcm9ncmVzc1N0ZXAgPT09IHZhbCAmJiBmb3JjZVVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2NoYW5nZU9DUlN0YXR1cyh2YWwpO1xuICAgIHRoaXMuX19wcmV2aW91c0luUHJvZ3Jlc3NTdGVwID0gdmFsO1xuICAgIHRoaXMuX19pblByb2dyZXNzU3RlcCA9IHZhbDtcbiAgICBjb25zdCB7XG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgY2FwdHVyZUJ1dHRvblxuICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgYm9yZGVyV2lkdGg6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGggKyAncHgnLFxuICAgICAgYm9yZGVyU3R5bGU6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUuc3R5bGUsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlckNvbG9yOiB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlW3ZhbF1cbiAgICB9O1xuICAgIGlmIChndWlkZUJveCkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCBzdHlsZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSkge1xuICAgICAgaWYgKCEhdGhpcy5fX29wdGlvbnMuc2hvd0NsaXBGcmFtZSkge1xuICAgICAgICB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXNrQm94V3JhcD8ucXVlcnlTZWxlY3RvcignI21hc2tCb3hPdXRlcicpPy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZVt2YWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgY2FwdHVyZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcignI2NhcHR1cmVCdXR0b24nKT8uc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fX29wdGlvbnMuY2FwdHVyZUJ1dHRvblN0eWxlWydiYXNlX2NvbG9yJ10pO1xuICAgIH1cbiAgICBjb25zdCBvY3JNb2RlID0gdGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlID8gJ3NlcnZlcicgOiAnd2FzbSc7XG4gICAgaWYgKHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VUb3BVSSB8fCB0aGlzLl9fb3B0aW9ucy51c2VUb3BVSVRleHRNc2cpIHtcbiAgICAgICAgdGhpcy5fX29uSW5Qcm9ncmVzc0NoYW5nZS5jYWxsKHRoaXMsIG9jck1vZGUsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRoaXMuX190b3BVSSwgJ3RvcCcsIHRoaXMuX19vcHRpb25zLnVzZVRvcFVJVGV4dE1zZywgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJLCB0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUksIHJlY29nbml6ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUkgfHwgdGhpcy5fX29wdGlvbnMudXNlTWlkZGxlVUlUZXh0TXNnKSB7XG4gICAgICAgIHRoaXMuX19vbkluUHJvZ3Jlc3NDaGFuZ2UuY2FsbCh0aGlzLCBvY3JNb2RlLCB0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2luUHJvZ3Jlc3NTdGVwLCB0aGlzLl9fbWlkZGxlVUksICdtaWRkbGUnLCB0aGlzLl9fb3B0aW9ucy51c2VNaWRkbGVVSVRleHRNc2csIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSwgdGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJLCByZWNvZ25pemVkSW1hZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJIHx8IHRoaXMuX19vcHRpb25zLnVzZUJvdHRvbVVJVGV4dE1zZykge1xuICAgICAgICB0aGlzLl9fb25JblByb2dyZXNzQ2hhbmdlLmNhbGwodGhpcywgb2NyTW9kZSwgdGhpcy5fX29jclR5cGUsIHRoaXMuX19pblByb2dyZXNzU3RlcCwgdGhpcy5fX2JvdHRvbVVJLCAnYm90dG9tJywgdGhpcy5fX29wdGlvbnMudXNlQm90dG9tVUlUZXh0TXNnLCB0aGlzLl9fb3B0aW9ucy51c2VDYXB0dXJlVUksIHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSwgcmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9TVUNDRVNTIHx8IHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5NQU5VQUxfQ0FQVFVSRV9GQUlMRUQpIHtcbiAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgICAgdGhpcy5fX3VwZGF0ZVByZXZpZXdVSShyZWNvZ25pemVkSW1hZ2UpO1xuXG4gICAgICAgIC8vIEZBSUzsnbgg6rK97JqwIDXstIjtm4Qg7J6Q64+Z7J2EIOywveuLq+ydjFxuICAgICAgICBpZiAodmFsID09PSB0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCkge1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5fX2hpZGVQcmV2aWV3VUksIDMwMDAsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YWwgPT09IHRoaXMuSU5fUFJPR1JFU1MuT0NSX1JFQ09HTklaRURfV0lUSF9TU0EpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdmlkZW9cbiAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlUHJldmlld1VJKSB7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcmV2aWV3VUkocmVjb2duaXplZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhbCA9PT0gdGhpcy5JTl9QUk9HUkVTUy5PQ1JfU1VDQ0VTU19XSVRIX1NTQSkge1xuICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZVByZXZpZXdVSSkge1xuICAgICAgICB0aGlzLl9faGlkZVByZXZpZXdVSSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLl9fc2xlZXAoMSk7IC8vIGZvciBVSSB1cGRhdGVcbiAgfVxuXG4gIF9fdXBkYXRlUHJldmlld1VJKHJlY29nbml6ZWRJbWFnZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVjb2duaXplZEltYWdlO1xuICAgIGNvbnN0IGltZ1N0eWxlID0ge1xuICAgICAgJ21heC13aWR0aCc6ICc3MCUnLFxuICAgICAgJ21heC1oZWlnaHQnOiAnNjAlJ1xuICAgIH07XG4gICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdJbWFnZSwgaW1nU3R5bGUpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUlXcmFwLCB7XG4gICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICB9KTtcbiAgfVxuICBfX2hpZGVQcmV2aWV3VUkoY29udGV4dCkge1xuICAgIGxldCBfdGhpc18gPSB0aGlzO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBfdGhpc18gPSBjb250ZXh0O1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3SW1hZ2VcbiAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICBfdGhpc18uX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0pO1xuICAgIF90aGlzXy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0pO1xuICAgIHByZXZpZXdJbWFnZS5zcmMgPSAnJztcbiAgfVxuICBhc3luYyBfX2dldElucHV0RGV2aWNlcygpIHtcbiAgICAvLyB0aHJvdyBlcnJvciBpZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICBsZXQgY2FtZXJhID0gW107XG4gICAgZm9yIChjb25zdCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgaWYgKGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoZGV2aWNlIGluc3RhbmNlb2YgSW5wdXREZXZpY2VJbmZvKSB7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmdldENhcGFiaWxpdGllcykge1xuICAgICAgICAgICAgICBjb25zdCBjYXAgPSBkZXZpY2UuZ2V0Q2FwYWJpbGl0aWVzKCk7XG4gICAgICAgICAgICAgIGlmIChjYXA/LmZhY2luZ01vZGU/LmluY2x1ZGVzKHRoaXMuX19mYWNpbmdNb2RlQ29uc3RyYWludCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1VsdHJhQ2FtZXJhUmVnID0gL3VsdHJhfOyauO2KuOudvC9naTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbHRyYUNhbWVyYVJlZy50ZXN0KGRldmljZS5sYWJlbD8udG9Mb3dlckNhc2UoKSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhbWVyYS5wdXNoKGNhcC5kZXZpY2VJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpT1MgMTcg66+466eM7J2YIGNocm9tZSwgc2FmYXJpIOyXkOyEnOuKlFxuICAgICAgICAgIC8vIElucHV0RGV2aWNlSW5mbyDqsJ3ssrTqsIAg7JeG7Ja07IScIGdldENhcGFiaWxpdGllc+ulvCDtmZXsnbjtlaAg7IiYIOyXhuq4sCDrlYzrrLjsl5BcbiAgICAgICAgICAvLyBkZXZpY2UgbGFiZWzrp4wg67O06rOgIO2bhOuptCDsubTrqZTrnbzroZwg7IKs7JqpXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgaXNCYWNrQ2FtZXJhUmVnID0gL2JhY2t87ZuE66m0L2c7XG4gICAgICAgICAgICBpZiAoZGV2aWNlLmxhYmVsPy5sZW5ndGggJiYgaXNCYWNrQ2FtZXJhUmVnLnRlc3QoZGV2aWNlLmxhYmVsKSkge1xuICAgICAgICAgICAgICBjYW1lcmEucHVzaChkZXZpY2UuZGV2aWNlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fZGVidWcoYGNhbWVyYSA9ICR7Y2FtZXJhfSwgY2FtZXJhLmxlbmd0aCA9ICR7Y2FtZXJhLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG4gIGNoZWNrVUlPcmllbnRhdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGV0ZWN0b3IuZ2V0VUlPcmllbnRhdGlvbihkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpLm9jcik7XG4gICAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50ICE9PSB0aGlzLl9fcHJldlVpT3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX191aU9yaWVudGF0aW9uID0gY3VycmVudDtcbiAgICAgIHRoaXMuX19wcmV2VWlPcmllbnRhdGlvbiA9IGN1cnJlbnQ7XG4gICAgICBpc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudCxcbiAgICAgIGlzQ2hhbmdlZFxuICAgIH07XG4gIH1cbiAgX19jbGVhckN1c3RvbVVJKG9iaikge1xuICAgIG9iai5pbm5lckhUTUwgPSAnJztcbiAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKG9iaiwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgX19zZXR1cERvbUVsZW1lbnRzKCkge1xuICAgIGxldCB7XG4gICAgICBvY3IsXG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveFdyYXAsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLFxuICAgICAgY3VzdG9tVUlXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJV3JhcCxcbiAgICAgIGNhcHR1cmVVSSxcbiAgICAgIGNhcHR1cmVCdXR0b24sXG4gICAgICBwcmV2aWV3VUlXcmFwLFxuICAgICAgcHJldmlld1VJLFxuICAgICAgcHJldmlld0ltYWdlLFxuICAgICAgc3dpdGNoVUlXcmFwLFxuICAgICAgc3dpdGNoVUksXG4gICAgICBwcmVsb2FkaW5nVUlXcmFwLFxuICAgICAgcHJlbG9hZGluZ1VJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKCFvY3IpIHRocm93IG5ldyBFcnJvcignb2NyIGRpdiBlbGVtZW50IGlzIG5vdCBleGlzdCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHZpZGVvV3JhcC5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3hXcmFwKSBndWlkZUJveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHZpZGVvKSB2aWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY2FudmFzKSBjYW52YXMucmVtb3ZlKCk7XG4gICAgaWYgKHJvdGF0aW9uQ2FudmFzKSByb3RhdGlvbkNhbnZhcy5yZW1vdmUoKTtcbiAgICBpZiAoZ3VpZGVCb3gpIGd1aWRlQm94LnJlbW92ZSgpO1xuICAgIGlmIChtYXNrQm94V3JhcCkgbWFza0JveFdyYXAucmVtb3ZlKCk7XG4gICAgaWYgKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKSBwcmV2ZW50VG9GcmVlemVWaWRlby5yZW1vdmUoKTtcbiAgICBpZiAoY3VzdG9tVUlXcmFwKSBjdXN0b21VSVdyYXAucmVtb3ZlKCk7XG4gICAgLy8g6rCBIHRvcCwgbWlkZGxlLCBib3R0b20gVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmICh0b3BVSSAmJiAhdGhpcy5fX29wdGlvbnMudXNlVG9wVUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHRvcFVJKTtcbiAgICBpZiAobWlkZGxlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZU1pZGRsZVVJKSB0aGlzLl9fY2xlYXJDdXN0b21VSShtaWRkbGVVSSk7XG4gICAgaWYgKGJvdHRvbVVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VCb3R0b21VSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoYm90dG9tVUkpO1xuICAgIGlmIChjYXB0dXJlVUlXcmFwKSBjYXB0dXJlVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIGNhcHR1cmUgVUnrpbwg66+47IKs7Jqp7J28IOqyveyasCDslYjsnZgg64K07Jqp7J2EIOyCreygnFxuICAgIGlmIChjYXB0dXJlVUkgJiYgIXRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkgdGhpcy5fX2NsZWFyQ3VzdG9tVUkoY2FwdHVyZVVJKTtcbiAgICBpZiAocHJldmlld1VJV3JhcCkgcHJldmlld1VJV3JhcC5yZW1vdmUoKTtcbiAgICAvLyBwcmV2aWV3IFVJ66W8IOuvuOyCrOyaqeydvCDqsr3smrAg7JWI7J2YIOuCtOyaqeydhCDsgq3soJxcbiAgICBpZiAocHJldmlld1VJICYmICF0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHRoaXMuX19jbGVhckN1c3RvbVVJKHByZXZpZXdVSSk7XG4gICAgaWYgKHN3aXRjaFVJV3JhcCkgc3dpdGNoVUlXcmFwLnJlbW92ZSgpO1xuICAgIC8vIHN3aXRjaCBVSeulvCDrr7jsgqzsmqnsnbwg6rK97JqwIOyViOydmCDrgrTsmqnsnYQg7IKt7KCcXG4gICAgaWYgKHN3aXRjaFVJICYmICF0aGlzLl9fb3B0aW9ucy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUpIHRoaXMuX19jbGVhckN1c3RvbVVJKHN3aXRjaFVJKTtcbiAgICBpZiAocHJlbG9hZGluZ1VJV3JhcCkgcHJlbG9hZGluZ1VJV3JhcC5yZW1vdmUoKTtcbiAgICBjb25zdCByb3RhdGlvbkRlZ3JlZSA9IHRoaXMuX19nZXRSb3RhdGlvbkRlZ3JlZSgpO1xuICAgIHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwID0gWzkwLCAyNzBdLmluY2x1ZGVzKHJvdGF0aW9uRGVncmVlKTtcbiAgICBsZXQgb2NyU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIG9jclN0eWxlKTtcbiAgICBjb25zdCB3cmFwU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIC8vIHZlcnRpY2FsIGFsaWduIG1pZGRsZVxuICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgfTtcbiAgICB2aWRlb1dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2aWRlb1dyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvV3JhcCcpO1xuICAgIGlmICh2aWRlb1dyYXApIHtcbiAgICAgIHdoaWxlICh2aWRlb1dyYXAuZmlyc3RDaGlsZCkge1xuICAgICAgICB2aWRlb1dyYXAucmVtb3ZlQ2hpbGQodmlkZW9XcmFwLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW9XcmFwLCB3cmFwU3R5bGUpO1xuICAgIH1cbiAgICBvY3IuYXBwZW5kQ2hpbGQodmlkZW9XcmFwKTtcbiAgICBtYXNrQm94V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdtYXNrQm94V3JhcCcpO1xuICAgIG1hc2tCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgbWFza0JveFdyYXAuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShtYXNrQm94V3JhcCwgd3JhcFN0eWxlKTtcbiAgICBsZXQgbWFza19mcmFtZSA9IHRoaXMuX19vcHRpb25zLm1hc2tGcmFtZVN0eWxlLmJhc2VfY29sb3IgKyAnZmYnO1xuICAgIGlmICghIXRoaXMuX19vcHRpb25zLnNob3dDbGlwRnJhbWUpIHtcbiAgICAgIG1hc2tfZnJhbWUgPSB0aGlzLl9fb3B0aW9ucy5tYXNrRnJhbWVTdHlsZS5jbGlwX2ZyYW1lICsgJzU1JztcbiAgICB9XG4gICAgbWFza0JveFdyYXAuaW5uZXJIVE1MID0gJycgKyBcIiAgPHN2ZyBpZD0nbWFza0JveENvbnRhaW5lcicgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5cXG5cIiArIFwiICAgIDxtYXNrIGlkPSdtYXNrLXJlY3QnPlxcblwiICsgXCIgICAgICA8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxcblwiICsgXCIgICAgICA8c3ZnIHg9JzUwJScgeT0nNTAlJyBvdmVyZmxvdz0ndmlzaWJsZSc+XFxuXCIgKyBcIiAgICAgICAgICA8cmVjdCBpZD0nbWFza0JveElubmVyJ1xcblwiICsgXCIgICAgICAgICAgICB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI2MCdcXG5cIiArIFwiICAgICAgICAgICAgeD0nLTIwMCcgeT0nLTEzMCdcXG5cIiArIFwiICAgICAgICAgICAgcng9JzEwJyByeT0nMTAnXFxuXCIgKyBcIiAgICAgICAgICAgIGZpbGw9J2JsYWNrJyBzdHJva2U9J2JsYWNrJz48L3JlY3Q+XFxuXCIgKyAnICAgICAgPC9zdmc+XFxuJyArICcgICAgPC9tYXNrPlxcbicgKyBcIiAgICA8cmVjdCBpZD0nbWFza0JveE91dGVyJ1xcblwiICsgXCIgICAgICAgICAgeD0nMCcgeT0nMCcgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJSdcXG5cIiArIFwiICAgICAgICAgIGZpbGw9J1wiICsgbWFza19mcmFtZSArIFwiJyBtYXNrPSd1cmwoI21hc2stcmVjdCknPjwvcmVjdD5cXG5cIiArICcgIDwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKG1hc2tCb3hXcmFwKTtcbiAgICB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ZpZGVvJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdtdXRlZCcsICd0cnVlJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgbGV0IHZpZGVvU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICB9O1xuICAgIGNvbnN0IHJvdGF0ZUNzcyA9ICdyb3RhdGUoJyArIHJvdGF0aW9uRGVncmVlICsgJ2RlZyknO1xuICAgIGNvbnN0IG1pcnJvckNzcyA9ICdyb3RhdGVZKDE4MGRlZyknO1xuICAgIGNvbnN0IHJvdGF0ZUFuZE1pcnJvckNzcyA9IG1pcnJvckNzcyArICcgJyArIHJvdGF0ZUNzcztcbiAgICBpZiAodGhpcy5fX2lzUm90YXRlZDkwb3IyNzApIHtcbiAgICAgIGlmICh0aGlzLl9fZ2V0TWlycm9yTW9kZSgpKSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQW5kTWlycm9yQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVBbmRNaXJyb3JDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVBbmRNaXJyb3JDc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZGVvU3R5bGUgPSB7XG4gICAgICAgICAgLi4udmlkZW9TdHlsZSxcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogcm90YXRlQ3NzLFxuICAgICAgICAgICctby10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiByb3RhdGVDc3MsXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVDc3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX19nZXRNaXJyb3JNb2RlKCkpIHtcbiAgICAgICAgdmlkZW9TdHlsZSA9IHtcbiAgICAgICAgICAuLi52aWRlb1N0eWxlLFxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiBtaXJyb3JDc3MsXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICAnLW1zLXRyYW5zZm9ybSc6IG1pcnJvckNzcyxcbiAgICAgICAgICB0cmFuc2Zvcm06IG1pcnJvckNzc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHZpZGVvU3R5bGUpO1xuICAgIHZpZGVvV3JhcC5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgZ3VpZGVCb3hXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3VpZGVCb3hXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdndWlkZUJveFdyYXAnKTtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZ3VpZGVCb3hXcmFwLCB3cmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChndWlkZUJveFdyYXApO1xuICAgIGd1aWRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2d1aWRlQm94Jyk7XG4gICAgZ3VpZGVCb3guc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcbiAgICBndWlkZUJveC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSk7XG4gICAgZ3VpZGVCb3hXcmFwLmFwcGVuZENoaWxkKGd1aWRlQm94KTtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdub25lJyA6ICdkaXNwbGF5JyA6ICdub25lJyxcbiAgICAgIHdpZHRoOiAnMjUlJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgbGVmdDogJzBweCcsXG4gICAgICB0b3A6ICczMHB4JyxcbiAgICAgIGJvcmRlcjogJ2dyZWVuIDJweCBzb2xpZCdcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYW52YXMsIGNhbnZhc1N0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICByb3RhdGlvbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHJvdGF0aW9uQ2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdyb3RhdGlvbkNhbnZhcycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShyb3RhdGlvbkNhbnZhcywge1xuICAgICAgZGlzcGxheTogdGhpcy5fX29wdGlvbnMuc2hvd0NhbnZhc1ByZXZpZXcgPyB0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCA/ICdkaXNwbGF5JyA6ICdub25lJyA6ICdub25lJyxcbiAgICAgIGhlaWdodDogJzI1JScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgIHRvcDogJzMwcHgnLFxuICAgICAgYm9yZGVyOiAnYmx1ZSAycHggc29saWQnXG4gICAgfSk7XG4gICAgb2NyLmFwcGVuZENoaWxkKHJvdGF0aW9uQ2FudmFzKTtcbiAgICBwcmV2ZW50VG9GcmVlemVWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2ZW50VG9GcmVlemVWaWRlbycpO1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmV2ZW50VG9GcmVlemVWaWRlbywge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206ICcxMCcsXG4gICAgICByaWdodDogJzEwJ1xuICAgIH0pO1xuICAgIHByZXZlbnRUb0ZyZWV6ZVZpZGVvLmlubmVySFRNTCA9ICcnICsgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjODY4Njg2MDBcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiM4Njg2ODYwMFwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiIzg2ODY4NjAwXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgb2NyLmFwcGVuZENoaWxkKHByZXZlbnRUb0ZyZWV6ZVZpZGVvKTtcbiAgICBjdXN0b21VSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjdXN0b21VSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ2N1c3RvbVVJV3JhcCcpO1xuICAgIGNvbnN0IGN1c3RvbVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjdXN0b21VSVdyYXAsIGN1c3RvbVVJV3JhcFN0eWxlKTtcbiAgICBvY3IuYXBwZW5kQ2hpbGQoY3VzdG9tVUlXcmFwKTtcblxuICAgIC8vIOqwgSB0b3AsIG1pZGRsZSwgYm90dG9tIFVJIOyCrOyaqSh1c2Up7Jes67aA7JmAIOq0gOqzhOyXhuydtCDsmIHsl63snYQg7J6h6riwIOychO2VtCwgZGl26rCAIOyXhuycvOuptCDsg53shLFcbiAgICAvLyBhZGp1c3RTdHlsZSgpIOyXkOyEnCDshLjrtoDsoIHsnbgg7IKs7J207KaI7JmAIOychOy5mOqwkiDrj5nsoIHsnLzroZwg7ISk7KCV65CoLlxuICAgIGlmICghdG9wVUkpIHtcbiAgICAgIHRvcFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAndG9wVUknKTtcbiAgICB9XG4gICAgY3VzdG9tVUlXcmFwLmFwcGVuZENoaWxkKHRvcFVJKTtcbiAgICBpZiAoIW1pZGRsZVVJKSB7XG4gICAgICBtaWRkbGVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbWlkZGxlVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ21pZGRsZVVJJyk7XG4gICAgfVxuICAgIGN1c3RvbVVJV3JhcC5hcHBlbmRDaGlsZChtaWRkbGVVSSk7XG4gICAgaWYgKCFib3R0b21VSSkge1xuICAgICAgYm90dG9tVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJvdHRvbVVJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdib3R0b21VSScpO1xuICAgIH1cbiAgICBjdXN0b21VSVdyYXAuYXBwZW5kQ2hpbGQoYm90dG9tVUkpO1xuICAgIGNhcHR1cmVVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjYXB0dXJlVUlXcmFwLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdjYXB0dXJlVUlXcmFwJyk7XG4gICAgY29uc3QgY2FwdHVyZVVJV3JhcFN0eWxlID0ge1xuICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NlbnRlcidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUlXcmFwLCBjYXB0dXJlVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChjYXB0dXJlVUlXcmFwKTtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJKSB7XG4gICAgICBpZiAodGhpcy5fX2lzU3dpdGNoVG9TZXJ2ZXJNb2RlIHx8IHRoaXMuX19vcHRpb25zLnVzZUZvcmNlQ29tcGxldGVVSSkge1xuICAgICAgICBpZiAoIWNhcHR1cmVVSSkge1xuICAgICAgICAgIGNhcHR1cmVVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNhcHR1cmVVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZVVJJyk7XG4gICAgICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhcHR1cmVCdXR0b24pIHtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnY2FwdHVyZUJ1dHRvbicpO1xuICAgICAgICAgIGxldCBjYXB0dXJlQnV0dG9uU3JjU1ZHID0gYGA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPHN2ZyB3aWR0aD0nODAnIGhlaWdodD0nODAnIHZpZXdCb3g9JzAgMCA4MCA4MCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz5gO1xuICAgICAgICAgIGNhcHR1cmVCdXR0b25TcmNTVkcgKz0gYCAgPGNpcmNsZSBpZD0nY2FwdHVyZUJ1dHRvbicgY3g9JzQwJyBjeT0nNDAnIHI9JzM4JyBmaWxsPScjNTU1NTU1JyBzdHJva2U9JyNmZmZmZmYnIHN0cm9rZS13aWR0aD0nNCcvPmA7XG4gICAgICAgICAgY2FwdHVyZUJ1dHRvblNyY1NWRyArPSBgPC9zdmc+YDtcbiAgICAgICAgICBjYXB0dXJlQnV0dG9uLmlubmVySFRNTCA9IGNhcHR1cmVCdXR0b25TcmNTVkc7XG4gICAgICAgICAgY2FwdHVyZVVJLmFwcGVuZENoaWxkKGNhcHR1cmVCdXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmVVSVdyYXAuYXBwZW5kQ2hpbGQoY2FwdHVyZVVJKTtcbiAgICAgICAgY29uc3QgX3RoaXNfID0gdGhpcztcbiAgICAgICAgY29uc3QgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUpIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCkuY2FwdHVyZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lzLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXNfLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS5jYXB0dXJlQnV0dG9uLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjYXB0dXJlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19vbkNsaWNrQ2FwdHVyZUJ1dHRvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VQcmV2aWV3VUkpIHtcbiAgICAgIHByZXZpZXdVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByZXZpZXdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZXZpZXdVSVdyYXAnKTtcbiAgICAgIGNvbnN0IHByZXZpZXdVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwMDAwYWEnXG4gICAgICB9O1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHByZXZpZXdVSVdyYXAsIHByZXZpZXdVSVdyYXBTdHlsZSk7XG4gICAgICBvY3IuYXBwZW5kQ2hpbGQocHJldmlld1VJV3JhcCk7XG4gICAgICBpZiAoIXByZXZpZXdVSSkge1xuICAgICAgICBwcmV2aWV3VUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJldmlld1VJLnNldEF0dHJpYnV0ZSgnZGF0YS11c2ViLW9jcicsICdwcmV2aWV3VUknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShwcmV2aWV3VUksIHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICAnbWF4LXdpZHRoJzogJzkwJScsXG4gICAgICAgICdtYXgtaGVpZ2h0JzogJzkwJSdcbiAgICAgIH0pO1xuICAgICAgcHJldmlld1VJV3JhcC5hcHBlbmRDaGlsZChwcmV2aWV3VUkpO1xuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2UpIHtcbiAgICAgICAgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAncHJldmlld0ltYWdlJyk7XG4gICAgICAgIHByZXZpZXdVSS5hcHBlbmRDaGlsZChwcmV2aWV3SW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fX29wdGlvbnMudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlKSB7XG4gICAgICBzd2l0Y2hVSVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHN3aXRjaFVJV3JhcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUlXcmFwJyk7XG4gICAgICBjb25zdCBzd2l0Y2hVSVdyYXBTdHlsZSA9IHtcbiAgICAgICAgLi4ud3JhcFN0eWxlLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICcnLFxuICAgICAgICB3aWR0aDogJycsXG4gICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSVdyYXAsIHN3aXRjaFVJV3JhcFN0eWxlKTtcbiAgICAgIG9jci5hcHBlbmRDaGlsZChzd2l0Y2hVSVdyYXApO1xuICAgICAgaWYgKCFzd2l0Y2hVSSkge1xuICAgICAgICBzd2l0Y2hVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzd2l0Y2hVSS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXNlYi1vY3InLCAnc3dpdGNoVUknKTtcbiAgICAgICAgbGV0IHN3aXRjaEhUTUwgPSBgYDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPGRpdiBjbGFzcz0nY3VzdG9tLS1sYWJlbCBmbGV4IGp1c3RpZnktY2VudGVyIGFsaWduLWNlbnRlciBnYXAxMCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94Jz5XQVNNPC9sYWJlbD5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDxsYWJlbCBjbGFzcz0nc3dpdGNoJz5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgICAgPGlucHV0IGlkPSdtYW51YWwtc3dpdGNoLXdhc20tdG8tc2VydmVyLWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCc+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICAgIDxzcGFuIGNsYXNzPSdzbGlkZXIgcm91bmQnPjwvc3Bhbj5gO1xuICAgICAgICBzd2l0Y2hIVE1MICs9IGAgIDwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgICA8bGFiZWwgZm9yPSdwcmlvcml0eS1maW5hbmNlLWNvaHRtbEZvcmxpc3QtY2hlY2tib3gnPlNlcnZlcjwvbGFiZWw+YDtcbiAgICAgICAgc3dpdGNoSFRNTCArPSBgPC9kaXY+YDtcbiAgICAgICAgc3dpdGNoVUkuaW5uZXJIVE1MID0gc3dpdGNoSFRNTDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zZXRTdHlsZShzd2l0Y2hVSSwge1xuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH0pO1xuICAgICAgc3dpdGNoVUlXcmFwLmFwcGVuZENoaWxkKHN3aXRjaFVJKTtcbiAgICAgIGNvbnN0IHN3aXRjaENoZWNrYm94ID0gc3dpdGNoVUkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF07XG4gICAgICBjb25zdCBfdGhpc18gPSB0aGlzO1xuICAgICAgY29uc3QgX19vbkNsaWNrU3dpdGNoVUkgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXNfLl9faXNTd2l0Y2hUb1NlcnZlck1vZGUgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgYXdhaXQgX3RoaXNfLnJlc3RhcnRPQ1IoX3RoaXNfLl9fb2NyVHlwZSwgX3RoaXNfLl9fb25TdWNjZXNzLCBfdGhpc18uX19vbkZhaWx1cmUsIF90aGlzXy5fX29uSW5Qcm9ncmVzc0NoYW5nZSwgdHJ1ZSk7XG4gICAgICB9O1xuICAgICAgc3dpdGNoQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX29uQ2xpY2tTd2l0Y2hVSSwge1xuICAgICAgICBvbmNlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgcHJlbG9hZGluZ1VJV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZWxvYWRpbmdVSVdyYXAuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSVdyYXAnKTtcbiAgICBjb25zdCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUgPSB7XG4gICAgICAuLi53cmFwU3R5bGUsXG4gICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAwMDBmZidcbiAgICB9O1xuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUlXcmFwLCBwcmVsb2FkaW5nVUlXcmFwU3R5bGUpO1xuICAgIG9jci5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUlXcmFwKTtcbiAgICBpZiAoIXByZWxvYWRpbmdVSSkge1xuICAgICAgcHJlbG9hZGluZ1VJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwcmVsb2FkaW5nVUkuc2V0QXR0cmlidXRlKCdkYXRhLXVzZWItb2NyJywgJ3ByZWxvYWRpbmdVSScpO1xuICAgICAgcHJlbG9hZGluZ1VJLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGV4dC1pbmZvJyk7XG4gICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MID0gJycgKyAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvO1wiIHdpZHRoPVwiMzJweFwiIGhlaWdodD1cIjMycHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWRcIj5cXG4nICsgJyAgPGNpcmNsZSBjeD1cIjg0XCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjAuNTU1NTU1NTU1NTU1NTU1NnNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDsxXCIgdmFsdWVzPVwiMTA7MFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMVwiIGJlZ2luPVwiMHNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGxcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJkaXNjcmV0ZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIjODY4Njg2MDA7Izg2ODY4NjAwOyM4Njg2ODYwMDsjODY4Njg2MDA7Izg2ODY4NjAwXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCIwc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIjBzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJyAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIxMFwiIGZpbGw9XCIjZmZmZmZmZmZcIj5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIwOzA7MTA7MTA7MTBcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0wLjU1NTU1NTU1NTU1NTU1NTZzXCI+PC9hbmltYXRlPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJjeFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIGR1cj1cIjIuMjIyMjIyMjIyMjIyMjIyM3NcIiBjYWxjTW9kZT1cInNwbGluZVwiIGtleVRpbWVzPVwiMDswLjI1OzAuNTswLjc1OzFcIiB2YWx1ZXM9XCIxNjsxNjsxNjs1MDs4NFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTAuNTU1NTU1NTU1NTU1NTU1NnNcIj48L2FuaW1hdGU+XFxuJyArICcgIDwvY2lyY2xlPicgKyAnICA8Y2lyY2xlIGN4PVwiODRcIiBjeT1cIjUwXCIgcj1cIjEwXCIgZmlsbD1cIiNmZmZmZmZmZlwiPlxcbicgKyAnICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjA7MDsxMDsxMDsxMFwiIGtleVNwbGluZXM9XCIwIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMTswIDAuNSAwLjUgMVwiIGJlZ2luPVwiLTEuMTExMTExMTExMTExMTExMnNcIj48L2FuaW1hdGU+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImN4XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMi4yMjIyMjIyMjIyMjIyMjIzc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIga2V5VGltZXM9XCIwOzAuMjU7MC41OzAuNzU7MVwiIHZhbHVlcz1cIjE2OzE2OzE2OzUwOzg0XCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS4xMTExMTExMTExMTExMTEyc1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgPC9jaXJjbGU+JyArICcgIDxjaXJjbGUgY3g9XCIxNlwiIGN5PVwiNTBcIiByPVwiMTBcIiBmaWxsPVwiI2ZmZmZmZmZmXCI+XFxuJyArICcgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMDswOzEwOzEwOzEwXCIga2V5U3BsaW5lcz1cIjAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxOzAgMC41IDAuNSAxXCIgYmVnaW49XCItMS42NjY2NjY2NjY2NjY2NjY1c1wiPjwvYW5pbWF0ZT5cXG4nICsgJyAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiY3hcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBkdXI9XCIyLjIyMjIyMjIyMjIyMjIyMjNzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBrZXlUaW1lcz1cIjA7MC4yNTswLjU7MC43NTsxXCIgdmFsdWVzPVwiMTY7MTY7MTY7NTA7ODRcIiBrZXlTcGxpbmVzPVwiMCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDE7MCAwLjUgMC41IDFcIiBiZWdpbj1cIi0xLjY2NjY2NjY2NjY2NjY2NjVzXCI+PC9hbmltYXRlPlxcbicgKyAnICA8L2NpcmNsZT4nICsgJzwvc3ZnPic7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZyA9PT0gJycgfHwgdGhpcy5fX29wdGlvbnMucHJlbG9hZGluZ1VJVGV4dE1zZykge1xuICAgICAgICBwcmVsb2FkaW5nVUkuaW5uZXJIVE1MICs9IHRoaXMuX19vcHRpb25zLnByZWxvYWRpbmdVSVRleHRNc2c7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19zZXRTdHlsZShwcmVsb2FkaW5nVUksIHtcbiAgICAgIC4uLndyYXBTdHlsZSxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfSk7XG4gICAgcHJlbG9hZGluZ1VJV3JhcC5hcHBlbmRDaGlsZChwcmVsb2FkaW5nVUkpO1xuXG4gICAgLy8gbG9hZGluZyBVSSDsnITsuZgg7J6Q66as7J6h6rKMIO2VmOq4sCDsnITtlbRcbiAgICBhd2FpdCB0aGlzLl9faW5pdFN0eWxlKCk7XG5cbiAgICAvLyDtmZTrqbTqs7zrj4Qg7ZiE7IOBIO2VtOqysFxuICAgIHRoaXMuX19zZXRTdHlsZShvY3IsIHtcbiAgICAgIGRpc3BsYXk6ICcnXG4gICAgfSk7XG4gICAgdGhpcy5fX29jciA9IG9jcjtcbiAgICB0aGlzLl9fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuX19yb3RhdGlvbkNhbnZhcyA9IHJvdGF0aW9uQ2FudmFzO1xuICAgIHRoaXMuX192aWRlbyA9IHZpZGVvO1xuICAgIHRoaXMuX192aWRlb1dyYXAgPSB2aWRlb1dyYXA7XG4gICAgdGhpcy5fX2d1aWRlQm94ID0gZ3VpZGVCb3g7XG4gICAgdGhpcy5fX2d1aWRlQm94V3JhcCA9IGd1aWRlQm94V3JhcDtcbiAgICB0aGlzLl9fbWFza0JveFdyYXAgPSBtYXNrQm94V3JhcDtcbiAgICB0aGlzLl9fcHJldmVudFRvRnJlZXplVmlkZW8gPSBwcmV2ZW50VG9GcmVlemVWaWRlbztcbiAgICB0aGlzLl9fY3VzdG9tVUlXcmFwID0gY3VzdG9tVUlXcmFwO1xuICAgIHRoaXMuX190b3BVSSA9IHRvcFVJO1xuICAgIHRoaXMuX19taWRkbGVVSSA9IG1pZGRsZVVJO1xuICAgIHRoaXMuX19ib3R0b21VSSA9IGJvdHRvbVVJO1xuICAgIHRoaXMuX19jYXB0dXJlVUlXcmFwID0gY2FwdHVyZVVJV3JhcDtcbiAgICB0aGlzLl9fY2FwdHVyZVVJID0gY2FwdHVyZVVJO1xuICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uID0gY2FwdHVyZUJ1dHRvbjtcbiAgICB0aGlzLl9fcHJldmlld1VJV3JhcCA9IHByZXZpZXdVSVdyYXA7XG4gICAgdGhpcy5fX3ByZXZpZXdVSSA9IHByZXZpZXdVSTtcbiAgICB0aGlzLl9fcHJldmlld0ltYWdlID0gcHJldmlld0ltYWdlO1xuICAgIHRoaXMuX19zd2l0Y2hVSVdyYXAgPSBzd2l0Y2hVSVdyYXA7XG4gICAgdGhpcy5fX3N3aXRjaFVJID0gc3dpdGNoVUk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9jcixcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzLFxuICAgICAgdmlkZW8sXG4gICAgICB2aWRlb1dyYXAsXG4gICAgICBndWlkZUJveCxcbiAgICAgIGd1aWRlQm94V3JhcCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgcHJldmVudFRvRnJlZXplVmlkZW8sXG4gICAgICBjdXN0b21VSVdyYXAsXG4gICAgICB0b3BVSSxcbiAgICAgIG1pZGRsZVVJLFxuICAgICAgYm90dG9tVUksXG4gICAgICBjYXB0dXJlVUlXcmFwLFxuICAgICAgY2FwdHVyZVVJLFxuICAgICAgY2FwdHVyZUJ1dHRvbixcbiAgICAgIHByZXZpZXdVSVdyYXAsXG4gICAgICBwcmV2aWV3VUksXG4gICAgICBwcmV2aWV3SW1hZ2UsXG4gICAgICBzd2l0Y2hVSVdyYXAsXG4gICAgICBzd2l0Y2hVSVxuICAgIH07XG4gIH1cbiAgX19ibHVyQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9fc2V0U3R5bGUoZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKS52aWRlbywge1xuICAgICAgZGlzcGxheTogJydcbiAgICB9KTtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhcHR1cmVCdXR0b24pIHtcbiAgICAgIGNhcHR1cmVCdXR0b24uc2V0QXR0cmlidXRlKCdpcy1jbGlja2VkJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZUJ1dHRvbiwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIF9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgcmV0dXJuIGNhcHR1cmVCdXR0b24gPyBjYXB0dXJlQnV0dG9uLmdldEF0dHJpYnV0ZSgnaXMtY2xpY2tlZCcpID09PSAndHJ1ZScgOiBmYWxzZTtcbiAgfVxuICBhc3luYyBfX3NldHVwVmlkZW8oaXNQYXNzcG9ydCkge1xuICAgIC8vIHdhc20g7J247Iud7ISx64qlIOy1nOygge2ZlOuQnCDtlbTsg4Hrj4RcbiAgICB0aGlzLl9fcmVzb2x1dGlvbldpZHRoID0gMTA4MDtcbiAgICB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCA9IDcyMDtcbiAgICB0aGlzLl9fY2FtU2V0Q29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCB7XG4gICAgICB2aWRlbyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHJvdGF0aW9uQ2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgbGV0IGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAvLyBjb25zb2xlLmxvZygndmlkZW9EZXZpY2VzIDo6ICcsIGNhbWVyYSlcblxuICAgIHRoaXMuY2hlY2tVSU9yaWVudGF0aW9uKCk7XG4gICAgbGV0IGNvbnN0cmFpbnRXaWR0aCwgY29uc3RyYWludEhlaWdodDtcbiAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhID09PSAnaGlnaFF1YWxpdHknKSB7XG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2ZlOyniCDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDqsIDriqXtlZzqsr3smrAg7IKs7JqpIOyVhOuLiOuptCAxMjgweDcyMCDsgqzsmqlcbiAgICAgIGNvbnN0cmFpbnRXaWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDE5MjAsXG4gICAgICAgIG1pbjogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiAxMDgwLFxuICAgICAgICBtaW46IDcyMFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gJ2NvbXBhdGliaWxpdHknXG4gICAgICAvLyDsubTrqZTrnbwg7ZW07IOB64+EIOyEpOyglSA6IO2YuO2ZmOyEsSDsmrDshKBcbiAgICAgIC8vIDE5MjB4MTA4MOydtCDsgqzsmqkg6rCA64ql7ZWY642U652864+EIDEyODB4NzIw7J2EIOyCrOyaqe2VmOuPhOuhnSDqs6DsoJVcbiAgICAgIC8vIOyCrOycoCA6IOqwpOufreyLnCBlbnRyeSDrqqjrjbgoQeyLnOumrOymiCAvIFdpZGUg66qo6424IOuTsSnsl5DshJwgMTkyMCB4IDEwODAg7LKY66as7IucIOu5hOycqOydtCDsnbTsg4HtlbTsp5Ao7ZmA7K2J7J2065CoKVxuICAgICAgLy8g7ZWt7IOBIDEyODAgeCA3MjDsnYQg7IKs7Jqp7ZWY64+E66GdIOuzgOqyvVxuICAgICAgY29uc3RyYWludFdpZHRoID0ge1xuICAgICAgICBpZGVhbDogMTI4MFxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRIZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbnN0cmFpbnRzID0ge1xuICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgdmlkZW86IHtcbiAgICAgICAgem9vbToge1xuICAgICAgICAgIGlkZWFsOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGZhY2luZ01vZGU6IHtcbiAgICAgICAgICBpZGVhbDogdGhpcy5fX2ZhY2luZ01vZGVDb25zdHJhaW50XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgd2hpdGVCYWxhbmNlTW9kZToge1xuICAgICAgICAgIGlkZWFsOiAnY29udGludW91cydcbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlSWQ6IGNhbWVyYS5sZW5ndGggPyB7XG4gICAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgICAgfSA6IG51bGwsXG4gICAgICAgIHdpZHRoOiBjb25zdHJhaW50V2lkdGgsXG4gICAgICAgIGhlaWdodDogY29uc3RyYWludEhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDstZzstIgg7KeE7J6FIOydtOyWtOyEnCB2aWRlb0RlaXZjZSDrpqzsiqTtirjrpbwg6rCA7KC47JisIOyImCDsl4bsnLzrqbQsXG4gICAgLy8gZ2V0VXNlck1lZGlh66W8IOyehOydmCDtmLjstpztlZjsl6wg6raM7ZWc7J2EIOuwm+ydgOuSpCDri6Tsi5wg6rCA7KC47Ji0XG4gICAgaWYgKGNhbWVyYS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX19kZWJ1ZygnY2Fubm90IHRvIGdldCBjYW1lcmEgZGV2aWNlcy4gc28sIHRyeSB0byBnZXQgY2FtZXJhIGRldmljZXMgYWdhaW4nKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIHRoaXMuX19zdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgICAgIGNhbWVyYSA9IGF3YWl0IHRoaXMuX19nZXRJbnB1dERldmljZXMoKTtcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gY2FtZXJhLmxlbmd0aCA/IHtcbiAgICAgICAgaWRlYWw6IGNhbWVyYVtjYW1lcmEubGVuZ3RoIC0gMV1cbiAgICAgIH0gOiBudWxsO1xuICAgIH1cblxuICAgIC8vIOqwpOufreyLnCB3aWRlIOuTsSDsoIDsgqzslpEg6riw6riw7JeQ7IScIEZIRCDtlbTsg4Hrj4Qg7Lm066mU6528IOyCrOyaqeyLnCDtmYDsrYnsnbTrkJjripQg7ZiE7IOBIOuwqeyngFxuICAgIC8vIOyggOyCrOyWkSDquLDquLAg7YyQ64uo6riw7KSAIDog7ZuE66m07Lm066mU65287J2YIOqwnOyImOqwgCAx6rCc652864qUIOqwgOyglVxuICAgIGlmIChjYW1lcmEubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9fZGVidWcoJ21heWJlIGRldmljZSBpcyBlbnRyeSBtb2RlbCBzdWNoIGFzIGdhbGF4eSB3aWRlJyk7XG4gICAgICBjb25zdHJhaW50cy52aWRlby53aWR0aCA9IHtcbiAgICAgICAgaWRlYWw6IDEyODBcbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cy52aWRlby5oZWlnaHQgPSB7XG4gICAgICAgIGlkZWFsOiA3MjBcbiAgICAgIH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCBkdW1wdHJhY2sgPSAoW2EsIGJdLCB0cmFjaykgPT5cbiAgICAgIC8vICAgYCR7YX0ke3RyYWNrLmtpbmQgPT0gJ3ZpZGVvJyA/ICdDYW1lcmEnIDogJ01pY3JvcGhvbmUnfSAoJHt0cmFjay5yZWFkeVN0YXRlfSk6ICR7dHJhY2subGFiZWx9JHtifWA7XG5cbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbiAgICAgIHRoaXMuX19kZWJ1ZyhgY29uc3RyYWludHMgOiAke0pTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKX1gKTtcbiAgICAgIC8vIHRoaXMuX19kZWJ1ZygndmlkZW9UcmFja3MgOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkpO1xuICAgICAgY29uc3Qgc3RyZWFtU2V0dGluZ3MgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRTZXR0aW5ncygpO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKFxuICAgICAgLy8gICAnc3RyZWFtQ2FwYWJpbGl0aWVzIDo6ICcsXG4gICAgICAvLyAgIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldENhcGFiaWxpdGllcygpXG4gICAgICAvLyApO1xuICAgICAgLy8gdGhpcy5fX2RlYnVnKCdzdHJlYW0gOjogJywgc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0Q29uc3RyYWludHMoKSk7XG4gICAgICAvLyB0aGlzLl9fZGVidWcoJ3N0cmVhbVNldHRpbmdzIDo6ICcsIHN0cmVhbVNldHRpbmdzKTtcbiAgICAgIHRoaXMuX19kZWJ1Zyhgc3RyZWFtIHdpZHRoICogaGVpZ2h0IDo6ICR7c3RyZWFtU2V0dGluZ3Mud2lkdGh9ICogJHtzdHJlYW1TZXR0aW5ncy5oZWlnaHR9YCk7XG4gICAgICB0aGlzLl9fZGVidWcoJ3N0cmVhbSB3aWR0aCAvIGhlaWdodCA6OiAnICsgc3RyZWFtU2V0dGluZ3Mud2lkdGggLyBzdHJlYW1TZXR0aW5ncy5oZWlnaHQpO1xuICAgICAgdGhpcy5fX2RlYnVnKCdzdHJlYW0gYXNwZWN0UmF0aW8gOjogJyArIHN0cmVhbVNldHRpbmdzLmFzcGVjdFJhdGlvKTtcbiAgICAgIHRoaXMuX19kZWJ1Zygnc3RyZWFtIGZhY2luZ01vZGUgOjogJyArIHN0cmVhbVNldHRpbmdzLmZhY2luZ01vZGUpO1xuICAgICAgW2NhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodF0gPSBbdGhpcy5fX3Jlc29sdXRpb25XaWR0aCwgdGhpcy5fX3Jlc29sdXRpb25IZWlnaHRdO1xuICAgICAgaWYgKHRoaXMuX19pc1JvdGF0ZWQ5MG9yMjcwKSB7XG4gICAgICAgIFtyb3RhdGlvbkNhbnZhcy53aWR0aCwgcm90YXRpb25DYW52YXMuaGVpZ2h0XSA9IFt0aGlzLl9fcmVzb2x1dGlvbkhlaWdodCwgdGhpcy5fX3Jlc29sdXRpb25XaWR0aF07XG4gICAgICB9XG4gICAgICB2aWRlby5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICB0aGlzLl9fc3RyZWFtID0gc3RyZWFtO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9faW5pdFN0eWxlKCkge1xuICAgIHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICBvY3IsXG4gICAgICBndWlkZUJveCxcbiAgICAgIG1hc2tCb3hXcmFwLFxuICAgICAgdG9wVUksXG4gICAgICBtaWRkbGVVSSxcbiAgICAgIGJvdHRvbVVJLFxuICAgICAgY2FwdHVyZVVJXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG5cbiAgICAvLyDquLDspIDsoJXrs7RcbiAgICBjb25zdCBiYXNlV2lkdGggPSA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IDI2MDtcbiAgICBjb25zdCBzY2FubmVyRnJhbWVSYXRpbyA9IGJhc2VIZWlnaHQgLyBiYXNlV2lkdGg7IC8vIOyLoOu2hOymnSDruYTsnKhcblxuICAgIGxldCBndWlkZUJveFdpZHRoLCBndWlkZUJveEhlaWdodDtcbiAgICBsZXQgY2FsY09jckNsaWVudFdpZHRoID0gb2NyLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjT2NyQ2xpZW50SGVpZ2h0ID0gb2NyLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUud2lkdGg7XG4gICAgY29uc3QgYm9yZGVyUmFkaXVzID0gdGhpcy5fX29wdGlvbnMuZnJhbWVCb3JkZXJTdHlsZS5yYWRpdXM7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7Jik66GcIOqwhOyjvFxuICAgICAgLy8g6rCA66GcIOq4sOykgOycvOuhnCDqsIDsnbTrk5zrsJXsiqQg6rOE7IKwXG4gICAgICBndWlkZUJveFdpZHRoID0gY2FsY09jckNsaWVudFdpZHRoICogZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6rCA66GcIFVJICYmIOqwgOuhnCDruYTrlJTsmKTroZwg6rCE7KO8XG4gICAgICAvLyDruYTrlJTsmKTrpbwg6rCA66GcIFVJ7J2YIGhlaWdodCDquLDspIDsnLzroZwg7KSE7J206rOgXG4gICAgICAvLyDqsIDroZwgVUkgaGVpZ2h0IOq4sOykgOycvOuhnCDruYTrlJTsmKTsnZggd2lkdGgg6rOE7IKwXG4gICAgICBndWlkZUJveEhlaWdodCA9IGNhbGNPY3JDbGllbnRIZWlnaHQgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuICAgIH1cbiAgICBndWlkZUJveFdpZHRoICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBndWlkZUJveEhlaWdodCArPSBib3JkZXJXaWR0aCAqIDI7XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94V2lkdGggPSBndWlkZUJveFdpZHRoICogdGhpcy5fX2d1aWRlQm94UmVkdWNlUmF0aW87XG4gICAgY29uc3QgcmVkdWNlZEd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQgKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBpZiAodG9wVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZSh0b3BVSSwge1xuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogKGNhbGNPY3JDbGllbnRIZWlnaHQgLSBndWlkZUJveEhlaWdodCkgLyAyICsgJ3B4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUobWlkZGxlVUksIHtcbiAgICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gYm9yZGVyV2lkdGggKiAyICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4J1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChib3R0b21VSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGJvdHRvbVVJLCB7XG4gICAgICAgICdwYWRkaW5nLXRvcCc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmlkZW9Jbm5lckdhcCA9IDI7IC8vIOuvuOyEuO2VmOqyjCBtYXNrQm94SW5uZXLrs7Tri6QgZ3VpZGVCb3jqsIAg7J6R7J2A6rKDIOuztOyglVxuICAgIHRoaXMuX19zZXRTdHlsZShndWlkZUJveCwge1xuICAgICAgd2lkdGg6IHJlZHVjZWRHdWlkZUJveFdpZHRoIC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIHZpZGVvSW5uZXJHYXAgKyAncHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgfSk7XG4gICAgY29uc3QgbWFza0JveElubmVyID0gbWFza0JveFdyYXAucXVlcnlTZWxlY3RvcignI21hc2tCb3hJbm5lcicpO1xuICAgIGxldCByID0gYm9yZGVyUmFkaXVzIC0gYm9yZGVyV2lkdGggKiAyO1xuICAgIHIgPSByIDwgMCA/IDAgOiByO1xuICAgIGlmICghaXNOYU4ocmVkdWNlZEd1aWRlQm94V2lkdGgpICYmICFpc05hTihyZWR1Y2VkR3VpZGVCb3hIZWlnaHQpICYmICFpc05hTihib3JkZXJSYWRpdXMpICYmICFpc05hTihib3JkZXJXaWR0aCkpIHtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lcldpZHRoID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgLSB2aWRlb0lubmVyR2FwLCAwKTtcbiAgICAgIGNvbnN0IG1hc2tCb3hJbm5lckhlaWdodCA9IE1hdGgubWF4KHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBtYXNrQm94SW5uZXJXaWR0aCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hc2tCb3hJbm5lckhlaWdodCArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3gnLCBtYXNrQm94SW5uZXJXaWR0aCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3knLCBtYXNrQm94SW5uZXJIZWlnaHQgLyAyICogLTEgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeCcsIHIgKyAnJyk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCdyeScsIHIgKyAnJyk7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fYWRqdXN0U3R5bGUoKSB7XG4gICAgY29uc3QgX19jYWxjR3VpZGVCb3hDcml0ZXJpYSA9IChhLCBiKSA9PiB7XG4gICAgICBpZiAodGhpcy5fX29wdGlvbnMuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPT09ICdjYW1lcmFSZXNvbHV0aW9uJykge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oYSwgYik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChhLCBiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTsgLy8gZGVmYXVsdCA6IGNhbWVyYVJlc29sdXRpb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCAwO1xuICAgIGNvbnN0IHtcbiAgICAgIG9jcixcbiAgICAgIHZpZGVvLFxuICAgICAgZ3VpZGVCb3gsXG4gICAgICBtYXNrQm94V3JhcCxcbiAgICAgIHRvcFVJLFxuICAgICAgbWlkZGxlVUksXG4gICAgICBib3R0b21VSSxcbiAgICAgIGNhcHR1cmVVSVdyYXAsXG4gICAgICBjYXB0dXJlVUksXG4gICAgICBjYXB0dXJlQnV0dG9uXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSk7XG4gICAgY29uc3QgaXNBbGllbkJhY2sgPSB0aGlzLl9fb2NyVHlwZSA9PT0gJ2FsaWVuLWJhY2snO1xuXG4gICAgLy8g6riw7KSA7KCV67O0XG4gICAgY29uc3QgYmFzZVdpZHRoID0gaXNBbGllbkJhY2sgPyAyNjAgOiA0MDA7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IGlzQWxpZW5CYWNrID8gNDAwIDogMjYwO1xuICAgIGNvbnN0IHNjYW5uZXJGcmFtZVJhdGlvID0gYmFzZUhlaWdodCAvIGJhc2VXaWR0aDsgLy8g7Iug67aE7KadIOu5hOycqFxuXG4gICAgbGV0IGd1aWRlQm94V2lkdGgsIGd1aWRlQm94SGVpZ2h0O1xuICAgIGxldCBjYWxjT2NyQ2xpZW50V2lkdGggPSBvY3IuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNhbGNPY3JDbGllbnRIZWlnaHQgPSBvY3IuY2xpZW50SGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbGV0IGNhbGNWaWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9IHZpZGVvLmNsaWVudFdpZHRoO1xuICAgIGxldCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPSB2aWRlby5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IGNhbGNWaWRlb09yaWVudGF0aW9uID0gdGhpcy5fX3ZpZGVvT3JpZW50YXRpb247XG4gICAgaWYgKGNhbGNWaWRlb1dpZHRoID09PSAwIHx8IGNhbGNWaWRlb0hlaWdodCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRXaWR0aCA9PT0gMCB8fCBjYWxjVmlkZW9DbGllbnRIZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLl9fb3B0aW9ucy5mcmFtZUJvcmRlclN0eWxlLndpZHRoO1xuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoaXMuX19vcHRpb25zLmZyYW1lQm9yZGVyU3R5bGUucmFkaXVzO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW2NhbGNWaWRlb1dpZHRoLCBjYWxjVmlkZW9IZWlnaHRdID0gW2NhbGNWaWRlb0hlaWdodCwgY2FsY1ZpZGVvV2lkdGhdO1xuICAgICAgW2NhbGNWaWRlb0NsaWVudFdpZHRoLCBjYWxjVmlkZW9DbGllbnRIZWlnaHRdID0gW2NhbGNWaWRlb0NsaWVudEhlaWdodCwgY2FsY1ZpZGVvQ2xpZW50V2lkdGhdO1xuICAgICAgY2FsY1ZpZGVvT3JpZW50YXRpb24gPSB0aGlzLl9fdmlkZW9PcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICB9XG4gICAgbGV0IG5ld1ZpZGVvV2lkdGggPSBjYWxjVmlkZW9DbGllbnRXaWR0aDtcbiAgICBsZXQgbmV3VmlkZW9IZWlnaHQgPSBjYWxjVmlkZW9DbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgZ3VpZGVCb3hSYXRpb0J5V2lkdGggPSB0aGlzLl9fZ3VpZGVCb3hSYXRpb0J5V2lkdGg7XG4gICAgY29uc3QgdmlkZW9SYXRpb0J5SGVpZ2h0ID0gdGhpcy5fX3ZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICBjb25zdCBuZXdWaWRlb1JhdGlvQnlXaWR0aCA9IGNhbGNWaWRlb0NsaWVudEhlaWdodCAvIGNhbGNWaWRlb0NsaWVudFdpZHRoO1xuICAgIGNvbnN0IG5ld1ZpZGVvUmF0aW9CeUhlaWdodCA9IGNhbGNWaWRlb0NsaWVudFdpZHRoIC8gY2FsY1ZpZGVvQ2xpZW50SGVpZ2h0O1xuICAgIGlmICh0aGlzLl9fdWlPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgLy8g7IS466GcIFVJXG4gICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJV3JhcCwge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCdcbiAgICAgIH0pO1xuICAgICAgLy8gdmlkZW8g6rCA66GcIOq4sOykgCAxMDAlIOycoOyngCAo67OA6rK97JeG7J2MKVxuICAgICAgaWYgKGNhbGNWaWRlb09yaWVudGF0aW9uID09PSB0aGlzLl9fdWlPcmllbnRhdGlvbikge1xuICAgICAgICAvLyDsubTrqZTrnbzrj4Qg7IS466GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAvLyDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnCDquLDspIDsnLzroZwg67mE65SU7JikIO2ZleuMgFxuICAgICAgICBuZXdWaWRlb1dpZHRoID0gZ3VpZGVCb3hXaWR0aDtcbiAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDsubTrqZTrnbzripQg6rCA66GcXG4gICAgICAgIC8vIOyEuOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqTrpbwg67mE65SU7JikIOyEuOuhnCDquLjsnbTsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjVmlkZW9DbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCk7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOqwgOuhnCBVSVxuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSVdyYXAsIHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdlbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJ1xuICAgICAgfSk7XG4gICAgICBpZiAoY2FsY1ZpZGVvT3JpZW50YXRpb24gPT09IHRoaXMuX191aU9yaWVudGF0aW9uKSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDqsIDroZwg67mE65SU7JikXG4gICAgICAgIC8vIOu5hOuUlOyYpOulvCDqsIDroZwgVUnsnZggaGVpZ2h0IOq4sOykgOycvOuhnCDspITsnbTqs6BcbiAgICAgICAgLy8g6rCA66GcIFVJIGhlaWdodCDquLDspIDsnLzroZwg67mE65SU7Jik7J2YIHdpZHRoIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOuKlCDshLjroZwg6riw7KSA7Jy866GcIOunnuy2pFxuICAgICAgICBndWlkZUJveEhlaWdodCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudEhlaWdodCwgY2FsY1ZpZGVvSGVpZ2h0KSAqIHZpZGVvUmF0aW9CeUhlaWdodDtcbiAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94SGVpZ2h0ICogYmFzZVdpZHRoIC8gYmFzZUhlaWdodDtcblxuICAgICAgICAvLyDruYTrlJTsmKTrpbwg7IS466GcIOq4sOykgOycvOuhnCDri6Tsi5wg66ee7LakXG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gZ3VpZGVCb3hIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBuZXdWaWRlb0hlaWdodCAqIG5ld1ZpZGVvUmF0aW9CeUhlaWdodDtcblxuICAgICAgICAvLyDqsIDsnbTrk5zrsJXsiqTsnZgg6rCA66GcIO2BrOq4sOqwgCDqsIDroZwgVUkgd2lkdGggKiByYXRpbyDqsJLrs7Tri6Qg7YGs66m0LFxuICAgICAgICBpZiAoZ3VpZGVCb3hXaWR0aCA+IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aCkge1xuICAgICAgICAgIC8vIOqzhOyCsCDrsKnsi53snYQg67CU6r6864ukICjsgqzsnKAgOiDqsbDsnZgg7KCV7IKs6rCB7ZiV7JeQIOqwgOq5jOyatCDqsr3smrAg6rCA7J2065OcIOuwleyKpCDqsIDroZzqsIAg6r2J7LCo6rKMIOuQqC4pXG4gICAgICAgICAgZ3VpZGVCb3hXaWR0aCA9IF9fY2FsY0d1aWRlQm94Q3JpdGVyaWEoY2FsY09jckNsaWVudFdpZHRoLCBjYWxjVmlkZW9XaWR0aCkgKiBndWlkZUJveFJhdGlvQnlXaWR0aDtcbiAgICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcblxuICAgICAgICAgIC8vIOqwgOydtOuTnCDrsJXsiqQg6rCA66GcIOq4sOykgOycvOuhnCDruYTrlJTsmKQg7ZmV64yAXG4gICAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgICAgbmV3VmlkZW9IZWlnaHQgPSBuZXdWaWRlb1dpZHRoICogbmV3VmlkZW9SYXRpb0J5V2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOqwgOuhnCBVSSAmJiDshLjroZwg67mE65SU7JikXG4gICAgICAgIC8vIOqwgOuhnCDquLDspIDsnLzroZwg6rCA7J2065Oc67CV7IqkIOqzhOyCsFxuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCBoZWlnaHQg7YGs6riw66W8IFVJ7J2YIGhlaWdodCDquLDspIDsl5Ag66ee7LakXG4gICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50SGVpZ2h0LCBjYWxjVmlkZW9IZWlnaHQpICogdmlkZW9SYXRpb0J5SGVpZ2h0O1xuICAgICAgICBndWlkZUJveFdpZHRoID0gZ3VpZGVCb3hIZWlnaHQgKiBiYXNlV2lkdGggLyBiYXNlSGVpZ2h0O1xuXG4gICAgICAgIC8vIOqwgOydtOuTnOuwleyKpOydmCDqsIDroZwg7YGs6riw6rCAIOqwgOuhnCBVSSB3aWR0aCAqIHJhdGlvIOqwkuuztOuLpCDtgazrqbQsXG4gICAgICAgIGlmIChndWlkZUJveFdpZHRoID4gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoKSB7XG4gICAgICAgICAgLy8g6rOE7IKwIOuwqeyLneydhCDrsJTqvrzri6QgKOyCrOycoCA6IOqxsOydmCDsoJXsgqzqsIHtmJXsl5Ag6rCA6rmM7Jq0IOqyveyasCDqsIDsnbTrk5wg67CV7IqkIOqwgOuhnOqwgCDqvYnssKjqsowg65CoLilcbiAgICAgICAgICBndWlkZUJveFdpZHRoID0gX19jYWxjR3VpZGVCb3hDcml0ZXJpYShjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICAgIGd1aWRlQm94SGVpZ2h0ID0gZ3VpZGVCb3hXaWR0aCAqIHNjYW5uZXJGcmFtZVJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6rCA7J2065OcIOuwleyKpCDqsIDroZwg6riw7KSA7Jy866GcIOu5hOuUlOyYpCDstpXshoxcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGNHdWlkZUJveENyaXRlcmlhKOy5tOuplOudvCDtlbTsg4Hrj4Qg7ISk7KCVIOq4sOykgCnqsIAgb2NyVmlld1NpemUo7ZmU66m0IO2BrOq4sCkg6riw7KSA7J2865WMXG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmNhbGNHdWlkZUJveENyaXRlcmlhID09PSAnb2NyVmlld1NpemUnKSB7XG4gICAgICAvLyBndWlkZUJveEhlaWdodCDsnbQgY2FsY09jckNsaWVudEhlaWdodCDrs7Tri6Qg7YGw6rK97JqwKOqwgOydtOuTnOuwleyKpOqwgCDtmZTrqbTsnYQg64SY7Ja06rCA64qUIOqyveyasCkg64uk7IucIOqzhOyCsFxuICAgICAgaWYgKGd1aWRlQm94SGVpZ2h0ID4gY2FsY09jckNsaWVudEhlaWdodCkge1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IE1hdGgubWluKGNhbGNPY3JDbGllbnRIZWlnaHQsIGNhbGNWaWRlb0hlaWdodCkgKiB2aWRlb1JhdGlvQnlIZWlnaHQ7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBndWlkZUJveEhlaWdodCAqIGJhc2VXaWR0aCAvIGJhc2VIZWlnaHQ7XG4gICAgICAgIG5ld1ZpZGVvV2lkdGggPSBndWlkZUJveFdpZHRoO1xuICAgICAgICBuZXdWaWRlb0hlaWdodCA9IG5ld1ZpZGVvV2lkdGggKiBuZXdWaWRlb1JhdGlvQnlXaWR0aDtcbiAgICAgIH1cblxuICAgICAgLy8gZ3VpZGVCb3hIZWlnaHQg7J20IGNhbGNPY3JDbGllbnRIZWlnaHQg67O064ukIO2BsOqyveyasCjqsIDsnbTrk5zrsJXsiqTqsIAg7ZmU66m07J2EIOuEmOyWtOqwgOuKlCDqsr3smrApIOuLpOyLnCDqs4TsgrBcbiAgICAgIGlmIChndWlkZUJveFdpZHRoID4gY2FsY09jckNsaWVudFdpZHRoKSB7XG4gICAgICAgIGd1aWRlQm94V2lkdGggPSBNYXRoLm1pbihjYWxjT2NyQ2xpZW50V2lkdGgsIGNhbGNWaWRlb1dpZHRoKSAqIGd1aWRlQm94UmF0aW9CeVdpZHRoO1xuICAgICAgICBndWlkZUJveEhlaWdodCA9IGd1aWRlQm94V2lkdGggKiBzY2FubmVyRnJhbWVSYXRpbztcbiAgICAgICAgbmV3VmlkZW9XaWR0aCA9IGd1aWRlQm94V2lkdGg7XG4gICAgICAgIG5ld1ZpZGVvSGVpZ2h0ID0gbmV3VmlkZW9XaWR0aCAqIG5ld1ZpZGVvUmF0aW9CeVdpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoID0gTWF0aC5taW4oZ3VpZGVCb3hXaWR0aCwgbmV3VmlkZW9XaWR0aCk7XG4gICAgdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgPSBNYXRoLm1pbihndWlkZUJveEhlaWdodCwgbmV3VmlkZW9IZWlnaHQpO1xuICAgIGlmICh0aGlzLl9faXNSb3RhdGVkOTBvcjI3MCkge1xuICAgICAgW25ld1ZpZGVvV2lkdGgsIG5ld1ZpZGVvSGVpZ2h0XSA9IFtuZXdWaWRlb0hlaWdodCwgbmV3VmlkZW9XaWR0aF07XG4gICAgfVxuICAgIGd1aWRlQm94V2lkdGggKz0gYm9yZGVyV2lkdGggKiAyO1xuICAgIGd1aWRlQm94SGVpZ2h0ICs9IGJvcmRlcldpZHRoICogMjtcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hXaWR0aCA9IGd1aWRlQm94V2lkdGggKiB0aGlzLl9fZ3VpZGVCb3hSZWR1Y2VSYXRpbztcbiAgICBjb25zdCByZWR1Y2VkR3VpZGVCb3hIZWlnaHQgPSBndWlkZUJveEhlaWdodCAqIHRoaXMuX19ndWlkZUJveFJlZHVjZVJhdGlvO1xuICAgIGlmICh0b3BVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKHRvcFVJLCB7XG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcxMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAoY2FsY09jckNsaWVudEhlaWdodCAtIGd1aWRlQm94SGVpZ2h0KSAvIDIgKyAncHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWlkZGxlVUkpIHtcbiAgICAgIHRoaXMuX19zZXRTdHlsZShtaWRkbGVVSSwge1xuICAgICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSBib3JkZXJXaWR0aCAqIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHJlZHVjZWRHdWlkZUJveEhlaWdodCAtIGJvcmRlcldpZHRoICogMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJvdHRvbVVJKSB7XG4gICAgICB0aGlzLl9fc2V0U3R5bGUoYm90dG9tVUksIHtcbiAgICAgICAgJ3BhZGRpbmctdG9wJzogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6IChjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gZ3VpZGVCb3hIZWlnaHQpIC8gMiArICdweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbidcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9fc2V0U3R5bGUodmlkZW8sIHtcbiAgICAgIHdpZHRoOiBuZXdWaWRlb1dpZHRoICsgJ3B4J1xuICAgIH0pO1xuICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgaGVpZ2h0OiBuZXdWaWRlb0hlaWdodCArICdweCdcbiAgICB9KTtcbiAgICBjb25zdCB2aWRlb0lubmVyR2FwID0gMjsgLy8g66+47IS47ZWY6rKMIG1hc2tCb3hJbm5lcuuztOuLpCBndWlkZUJveOqwgCDsnpHsnYDqsoMg67O07KCVXG4gICAgdGhpcy5fX3NldFN0eWxlKGd1aWRlQm94LCB7XG4gICAgICB3aWR0aDogcmVkdWNlZEd1aWRlQm94V2lkdGggLSB2aWRlb0lubmVyR2FwICsgJ3B4JyxcbiAgICAgIGhlaWdodDogcmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gdmlkZW9Jbm5lckdhcCArICdweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICB9KTtcbiAgICBjb25zdCBtYXNrQm94SW5uZXIgPSBtYXNrQm94V3JhcC5xdWVyeVNlbGVjdG9yKCcjbWFza0JveElubmVyJyk7XG4gICAgbGV0IHIgPSBib3JkZXJSYWRpdXMgLSBib3JkZXJXaWR0aCAqIDI7XG4gICAgciA9IHIgPCAwID8gMCA6IHI7XG4gICAgaWYgKCFpc05hTihyZWR1Y2VkR3VpZGVCb3hXaWR0aCkgJiYgIWlzTmFOKHJlZHVjZWRHdWlkZUJveEhlaWdodCkgJiYgIWlzTmFOKGJvcmRlclJhZGl1cykgJiYgIWlzTmFOKGJvcmRlcldpZHRoKSkge1xuICAgICAgY29uc3QgbWFza0JveElubmVyV2lkdGggPSBNYXRoLm1heChyZWR1Y2VkR3VpZGVCb3hXaWR0aCAtIGJvcmRlcldpZHRoICogMiAtIHZpZGVvSW5uZXJHYXAsIDApO1xuICAgICAgY29uc3QgbWFza0JveElubmVySGVpZ2h0ID0gTWF0aC5tYXgocmVkdWNlZEd1aWRlQm94SGVpZ2h0IC0gYm9yZGVyV2lkdGggKiAyIC0gdmlkZW9Jbm5lckdhcCwgMCk7XG4gICAgICBtYXNrQm94SW5uZXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG1hc2tCb3hJbm5lcldpZHRoICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFza0JveElubmVySGVpZ2h0ICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneCcsIG1hc2tCb3hJbm5lcldpZHRoIC8gMiAqIC0xICsgJycpO1xuICAgICAgbWFza0JveElubmVyLnNldEF0dHJpYnV0ZSgneScsIG1hc2tCb3hJbm5lckhlaWdodCAvIDIgKiAtMSArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J4JywgciArICcnKTtcbiAgICAgIG1hc2tCb3hJbm5lci5zZXRBdHRyaWJ1dGUoJ3J5JywgciArICcnKTtcbiAgICB9XG5cbiAgICAvLyDsiJjrj5kg7LSs7JiBIFVJIOyCrOyaqVxuICAgIC8vIGZpcnN0Q2FsbGVk7J24IOqyveyasCDslYTsp4EgY2FwdHVyZVVJ6rCAIOq3uOugpOyngOyngCDslYrslYQg66y07J2Y66+4XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSkge1xuICAgICAgdGhpcy5fX3NldFN0eWxlKGNhcHR1cmVVSSwge1xuICAgICAgICBkaXNwbGF5OiAnJ1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5fX3VpT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgJiYgYm90dG9tVUkgJiYgY2FwdHVyZVVJKSB7XG4gICAgICAgIGNvbnN0IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcyA9IHRoaXMuX19jYWxjU3VtT2ZIZWlnaHRDaGlsZE5vZGVzKGJvdHRvbVVJKTtcbiAgICAgICAgbGV0IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID0gY2FwdHVyZUJ1dHRvbi5xdWVyeVNlbGVjdG9yKCdzdmcnKS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgICAgICBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodCA9IGNhbGNDYXB0dXJlQnV0dG9uSGVpZ2h0ID09PSAwID8gODAgOiBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgbGV0IGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPSBib3R0b21VSS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gLT0gaXNOYU4ocGFyc2VJbnQoYm90dG9tVUkuc3R5bGUucGFkZGluZ1RvcCkpID8gMCA6IHBhcnNlSW50KGJvdHRvbVVJLnN0eWxlLnBhZGRpbmdUb3ApO1xuICAgICAgICBjYXB0dXJlVUlQYWRkaW5nQm90dG9tIC09IGNhbGNTdW1PZkhlaWdodEJvdHRvbVVJQ2hpbGROb2RlcztcbiAgICAgICAgY2FwdHVyZVVJUGFkZGluZ0JvdHRvbSAtPSBjYWxjQ2FwdHVyZUJ1dHRvbkhlaWdodDtcbiAgICAgICAgY29uc3QgYmFzZWxpbmUgPSBjYWxjT2NyQ2xpZW50SGVpZ2h0IC0gKGNhbGNPY3JDbGllbnRIZWlnaHQgLyAyICsgZ3VpZGVCb3hIZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPiAwICYmIGNhcHR1cmVVSVBhZGRpbmdCb3R0b20gPCBiYXNlbGluZSkge1xuICAgICAgICAgIHRoaXMuX19zZXRTdHlsZShjYXB0dXJlVUksIHtcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJycsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiBjYXB0dXJlVUlQYWRkaW5nQm90dG9tICsgJ3B4J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc2V0U3R5bGUoY2FwdHVyZVVJLCB7XG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAnMTBweCcsXG4gICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJydcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLl9faW5Qcm9ncmVzc1N0ZXAsIHRydWUpO1xuICAgIHZvaWQgMDtcbiAgfVxuICBfX2NhbGNTdW1PZkhlaWdodENoaWxkTm9kZXMob2JqKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaj8uY2hpbGROb2Rlcykge1xuICAgICAgc3VtICs9IGl0ZW0uY2xpZW50SGVpZ2h0ID8gaXRlbS5jbGllbnRIZWlnaHQgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9XG4gIF9fY2xvc2VDYW1lcmEoKSB7XG4gICAgdGhpcy5fX2NsZWFyQ2FtZXJhUGVybWlzc2lvblRpbWVvdXRUaW1lcigpO1xuICAgIHRoaXMuc3RvcFNjYW4oKTtcbiAgICB0aGlzLnN0b3BTdHJlYW0oKTtcbiAgfVxuICBhc3luYyBfX2xvYWRSZXNvdXJjZXMoKSB7XG4gICAgdm9pZCAwO1xuICAgIGlmICh0aGlzLl9fcmVzb3VyY2VzTG9hZGVkKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gYXdhaXQgc2ltZCgpO1xuICAgIGxldCBlbnZJbmZvID0gJyc7XG4gICAgZW52SW5mbyArPSBgb3MgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zfVxcbmA7XG4gICAgZW52SW5mbyArPSBgb3NTaW1wbGUgOiAke3RoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlfVxcbmA7XG4gICAgZW52SW5mbyArPSBgaXNTdXBwb3J0V2FzbTogJHt0aGlzLl9faXNTdXBwb3J0V2FzbX1cXG5gO1xuICAgIGVudkluZm8gKz0gYHNpbWQod2FzbS1mZWF0dXJlLWRldGVjdCkgOiAke3RoaXMuX19pc1N1cHBvcnRTaW1kfVxcbmA7XG4gICAgaWYgKHRoaXMuX19kZXZpY2VJbmZvLm9zU2ltcGxlID09PSAnSU9TJyB8fCB0aGlzLl9fZGV2aWNlSW5mby5vc1NpbXBsZSA9PT0gJ01BQycpIHtcbiAgICAgIHRoaXMuX19pc1N1cHBvcnRTaW1kID0gZmFsc2U7XG4gICAgfVxuICAgIGVudkluZm8gKz0gYGlzU3VwcG9ydFNpbWQoZmluYWwpIDogJHt0aGlzLl9faXNTdXBwb3J0U2ltZH1cXG5gO1xuICAgIGVudkluZm8gKz0gYFVzZXJBZ2VudCA6ICR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cXG5gO1xuICAgIHZvaWQgMDtcbiAgICB0aGlzLl9fZGVidWcoZW52SW5mbyk7XG4gICAgd2luZG93LnVzZWJPQ1JFbnZJbmZvID0gZW52SW5mbztcbiAgICBsZXQgc2RrU3VwcG9ydEVudiA9ICdxdXJhbSc7XG4gICAgaWYgKHRoaXMuX19pc1N1cHBvcnRTaW1kKSB7XG4gICAgICB2b2lkIDA7XG4gICAgICBzZGtTdXBwb3J0RW52ICs9ICdfc2ltZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gICAgdm9pZCAwO1xuICAgIHdpbmRvdy51c2ViT0NSRW52SW5mbyA9IGVudkluZm87XG4gICAgdm9pZCAwO1xuICAgIGxldCBwb3N0Zml4ID0gJyc7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLmZvcmNlX3dhc21fcmVsb2FkKSB7XG4gICAgICAvLyDsmLXshZjsnbQg7Zmc7ISx7ZmUIOuQmOuptCDsg4jroZzsmrQgV0FTTSDrpqzshozsiqTrpbwg7JqU7LKt7ZWoLlxuICAgICAgcG9zdGZpeCA9ICc/dmVyPScgKyB0aGlzLl9fb3B0aW9ucy5mb3JjZV93YXNtX3JlbG9hZF9mbGFnO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHNka1N1cHBvcnRFbnYgKyAnLmpzJyArIHBvc3RmaXgsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCk7XG4gICAgbGV0IHNyYyA9IGF3YWl0IGZldGNoKHVybC5ocmVmKS50aGVuKHJlcyA9PiByZXMudGV4dCgpKS50aGVuKHRleHQgPT4ge1xuICAgICAgbGV0IHJlZ2V4ID0gLyguKikgPSBNb2R1bGUuY3dyYXAvZ207XG4gICAgICBsZXQgc291cmNlID0gdGV4dC5yZXBsYWNlKHJlZ2V4LCAnTW9kdWxlLiQxID0gTW9kdWxlLmN3cmFwJyk7XG5cbiAgICAgIC8vIGRhdGEobW9kZWwpXG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgvXlxcKGZ1bmN0aW9uXFwoXFwpIFxcey9tLCAndmFyIGNyZWF0ZU1vZGVsRGF0YSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xcbicgKyAnIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XFxuJyk7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnICAgY29uc29sZS5lcnJvcihcInBhY2thZ2UgZXJyb3I6XCIsIGVycm9yKTsnLCAnICAgcmVqZWN0KCk7XFxuJyArICcgICBjb25zb2xlLmVycm9yKFwicGFja2FnZSBlcnJvcjpcIiwgZXJyb3IpOycpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJyAgfSwgaGFuZGxlRXJyb3IpJywgJyAgcmVzb2x2ZSgpO1xcbicgKyAnICB9LCBoYW5kbGVFcnJvciknKTtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKC9eXFx9XFwpXFwoXFwpOy9tLCAnXFxuIH0pXFxuJyArICd9OycpO1xuXG4gICAgICAvLyB3YXNtXG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShzZGtTdXBwb3J0RW52ICsgJy53YXNtJywgbmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy53YXNtJyArIHBvc3RmaXgsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZik7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZShuZXcgUmVnRXhwKGBSRU1PVEVfUEFDS0FHRV9CQVNFID0gWydcIl0ke3Nka1N1cHBvcnRFbnZ9XFxcXC5kYXRhW1wiJ11gLCAnZ20nKSwgYFJFTU9URV9QQUNLQUdFX0JBU0UgPSBcIiR7bmV3IFVSTChzZGtTdXBwb3J0RW52ICsgJy5kYXRhJyArIHBvc3RmaXgsIHRoaXMuX19vcHRpb25zLnJlc291cmNlQmFzZVVybCkuaHJlZn1cImApO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ2Z1bmN0aW9uIGNyZWF0ZVdhc20nLCAnYXN5bmMgZnVuY3Rpb24gY3JlYXRlV2FzbScpO1xuICAgICAgc291cmNlID0gc291cmNlLnJlcGxhY2UoJ2luc3RhbnRpYXRlQXN5bmMoKTsnLCAnYXdhaXQgaW5zdGFudGlhdGVBc3luYygpOycpO1xuXG4gICAgICAvLyB3YXNtIGFuZCBkYXRhKG1vZGVsKSBmaWxlIOuzkeugrOuhnCBmZXRjaCDtlZjquLAg7JyE7ZW0XG4gICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgndmFyIGFzbSA9IGNyZWF0ZVdhc20oKTsnLCAnY29uc29sZS5sb2coXCJjcmVhdGUgd2FzbSBhbmQgZGF0YSAtIHN0YXJ0XCIpXFxuJyArICdhd2FpdCAoYXN5bmMgZnVuY3Rpb24oKSB7XFxuJyArICcgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XFxuJyArICcgICAgdmFyIGlzQ3JlYXRlZFdhc20gPSBmYWxzZTtcXG4nICsgJyAgICB2YXIgaXNDcmVhdGVkRGF0YSA9IGZhbHNlO1xcbicgKyAnICAgIGNyZWF0ZVdhc20oKS50aGVuKCgpID0+IHtcXG4nICsgJyAgICAgIGlzQ3JlYXRlZFdhc20gPSB0cnVlO1xcbicgKyAnICAgICAgaWYgKGlzQ3JlYXRlZERhdGEpIHsgcmVzb2x2ZSgpOyB9XFxuJyArICcgICAgfSk7XFxuJyArICcgICAgY3JlYXRlTW9kZWxEYXRhKCkudGhlbigoKSA9PiB7XFxuJyArICcgICAgICBpc0NyZWF0ZWREYXRhID0gdHJ1ZTtcXG4nICsgJyAgICAgIGlmIChpc0NyZWF0ZWRXYXNtKSB7IHJlc29sdmUoKTsgfVxcbicgKyAnICAgIH0pXFxuJyArICcgIH0pO1xcbicgKyAnfSkoKTtcXG4nICsgJ2NvbnNvbGUubG9nKFwiY3JlYXRlIHdhc20gYW5kIGRhdGEgLSBlbmRcIiknKTtcbiAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfSk7XG4gICAgc3JjID0gYFxuICAgIChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICR7c3JjfVxuICAgICAgTW9kdWxlLmxlbmd0aEJ5dGVzVVRGOCA9IGxlbmd0aEJ5dGVzVVRGOFxuICAgICAgTW9kdWxlLnN0cmluZ1RvVVRGOCA9IHN0cmluZ1RvVVRGOFxuICAgICAgcmV0dXJuIE1vZHVsZVxuICAgIH0pKClcbiAgICAgICAgYDtcbiAgICB0aGlzLl9fT0NSRW5naW5lID0gYXdhaXQgZXZhbChzcmMpO1xuICAgIHRoaXMuX19PQ1JFbmdpbmUub25SdW50aW1lSW5pdGlhbGl6ZWQgPSBhc3luYyBfID0+IHtcbiAgICAgIHZvaWQgMDtcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuX19PQ1JFbmdpbmUub25SdW50aW1lSW5pdGlhbGl6ZWQoKTtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gdHJ1ZTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgX19zdGFydFNjYW5XYXNtSW1wbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fX2RldGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTtcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAvLyB0aGlzLl9fc2V0UGlpRW5jcnlwdE1vZGUodGhpcy5fX29wdGlvbnMudXNlUGlpRW5jcnlwdE1vZGUpOyAvLyBvY3IgcmVzdWx0IGVuY3J5cHRcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICB0aGlzLl9fYWRkcmVzcyA9IDA7XG4gICAgICB0aGlzLl9fcGFnZUVuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fX21hbnVhbE9DUlJldHJ5Q291bnQgPSAwO1xuICAgICAgdGhpcy5fX3NzYVJldHJ5Q291bnQgPSAwO1xuICAgICAgY29uc3Qgc2NhbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgb2NyUmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIGlzRGV0ZWN0ZWRDYXJkID0gbnVsbCxcbiAgICAgICAgICAgIGltZ0RhdGEgPSBudWxsLFxuICAgICAgICAgICAgaW1nRGF0YVVybCA9IG51bGwsXG4gICAgICAgICAgICBtYXNrSW1hZ2UgPSBudWxsLFxuICAgICAgICAgICAgZmFjZUltYWdlID0gbnVsbCxcbiAgICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICBzc2FSZXN1bHRMaXN0ID0gW10sXG4gICAgICAgICAgICBtYXNrSW5mbyA9IG51bGw7XG5cbiAgICAgICAgICAvLyBhd2FpdCB0aGlzLl9fY2hhbmdlU3RhZ2UoSU5fUFJPR1JFU1MuUkVBRFkpO1xuICAgICAgICAgIGlmICghdGhpcy5fX09DUkVuZ2luZVsnYXNtJ10pIHJldHVybjtcblxuICAgICAgICAgIC8vIFRPRE8gOiDshKTsoJXtlaDsiJgg7J6I6rKMIOuzgOqyvSAgZGVmYXVsdCDqsJLrj4Qg7KCc6rO1XG4gICAgICAgICAgY29uc3QgW3Jlc29sdXRpb25fdywgcmVzb2x1dGlvbl9oXSA9IFt0aGlzLl9fcmVzb2x1dGlvbldpZHRoLCB0aGlzLl9fcmVzb2x1dGlvbkhlaWdodF07XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICB9ID0gZGV0ZWN0b3IuZ2V0T0NSRWxlbWVudHMoKTtcbiAgICAgICAgICBpZiAocmVzb2x1dGlvbl93ID09PSAwIHx8IHJlc29sdXRpb25faCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgIGlmICh0aGlzLl9fZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkcmVzcyBiZWZvcmUgLS0tLS0tLS0tJywgYWRkcmVzcyk7XG4gICAgICAgICAgaWYgKHRoaXMuX19hZGRyZXNzID09PSAwICYmICF0aGlzLl9fcGFnZUVuZCAmJiAoYXdhaXQgdGhpcy5fX2lzVmlkZW9SZXNvbHV0aW9uQ29tcGF0aWJsZSh2aWRlbykpKSB7XG4gICAgICAgICAgICBbdGhpcy5fX2FkZHJlc3MsIHRoaXMuX19kZXN0cm95U2Nhbm5lckNhbGxiYWNrXSA9IHRoaXMuX19nZXRTY2FubmVyQWRkcmVzcyh0aGlzLl9fb2NyVHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGhpcy5fX2FkZHJlc3MgfHwgdGhpcy5fX3BhZ2VFbmQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19zbGVlcCgxMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkcmVzcyBhZnRlciAtLS0tLS0tLS0nLCBhZGRyZXNzKTtcblxuICAgICAgICAgIGlmICh0aGlzLl9fb2NyU3RhdHVzIDwgdGhpcy5PQ1JfU1RBVFVTLk9DUl9TVUNDRVNTKSB7XG4gICAgICAgICAgICAvLyBPQ1Ig7JmE66OMIOydtOyghCDsg4Htg5xcblxuICAgICAgICAgICAgLy8gY2FyZCBub3QgZGV0ZWN0ZWRcbiAgICAgICAgICAgIFtpc0RldGVjdGVkQ2FyZCwgaW1nRGF0YSwgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9faXNDYXJkYm94RGV0ZWN0ZWQodGhpcy5fX2FkZHJlc3MsIDApO1xuICAgICAgICAgICAgaWYgKCFpc0RldGVjdGVkQ2FyZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fX2luUHJvZ3Jlc3NTdGVwICE9PSB0aGlzLklOX1BST0dSRVNTLlJFQURZKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuQ0FSRF9ERVRFQ1RfRkFJTEVEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX0ZBSUxFRCwgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SWdub3JlQ29tcGxldGUoZmFsc2UpOyAvLyDtlYTsmpTtlZzqsIA/XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhcmQgaXMgZGV0ZWN0ZWRcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLkNBUkRfREVURUNUX1NVQ0NFU1MpO1xuXG4gICAgICAgICAgICAvLyBzc2EgcmV0cnkg7ISk7KCV7J20IOuQmOyWtCDsnojsnLzqsbDrgpgsIOyImOuPmey0rOyYgVVJ66W8IOyCrOyaqe2VmOuKlCDqsr3smrAsIGNhcmQgZGV0ZWN0IOyEseqzteyLnCDsnbTrr7jsp4Ag7KCA7J6lXG4gICAgICAgICAgICB0aGlzLl9fZW5xdWV1ZURldGVjdGVkQ2FyZFF1ZXVlKGltZ0RhdGEsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc0NsaWNrZWRDYXB0dXJlQnV0dG9uKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRJZ25vcmVDb21wbGV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuTUFOVUFMX0NBUFRVUkVfU1VDQ0VTUywgZmFsc2UsIGltZ0RhdGFVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgW29jclJlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2VdID0gYXdhaXQgdGhpcy5fX3N0YXJ0UmVjb2duaXRpb24odGhpcy5fX2FkZHJlc3MsIHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgdGhpcy5fX2lzQ2xpY2tlZENhcHR1cmVCdXR0b24oKSwgaW1nRGF0YSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl9faXNDbGlja2VkQ2FwdHVyZUJ1dHRvbigpKSB7XG4gICAgICAgICAgICAvLyAgIHRoaXMuX19ibHVyQ2FwdHVyZUJ1dHRvbigpO1xuICAgICAgICAgICAgLy8gICB0aGlzLnNldElnbm9yZUNvbXBsZXRlKGZhbHNlKTsgICAgICAgIC8vIO2VhOyalO2VnOqwgD9cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fX29jclN0YXR1cyA+PSB0aGlzLk9DUl9TVEFUVVMuT0NSX1NVQ0NFU1MpIHtcbiAgICAgICAgICAgIC8vIG9jciDsmYTro4wg7J207ZuEIOyDge2DnFxuXG4gICAgICAgICAgICAvLyBmYWlsdXJlIGNhc2VcbiAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT0NSIFN0YXR1cyBpcyAke3RoaXMuX19vY3JTdGF0dXN9LCBidXQgb2NyUmVzdWx0IGlzIGZhbHNlYCk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIHRoaXMuX19zZXRTdHlsZSh2aWRlbywge1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgIH0pOyAvLyBPQ1Ig7JmE66OMIOyLnOygkOyXkCBjYW1lcmEgcHJldmlldyBvZmZcblxuICAgICAgICAgICAgaWYgKHRoaXMuX19zc2FNb2RlKSB7XG4gICAgICAgICAgICAgIHZvaWQgMDtcbiAgICAgICAgICAgICAgLy8g7LWc7LSIIOyLnOuPhFxuICAgICAgICAgICAgICBzc2FSZXN1bHQgPSBhd2FpdCB0aGlzLl9fc3RhcnRUcnV0aCh0aGlzLl9fb2NyVHlwZSwgdGhpcy5fX2FkZHJlc3MpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdbRVJSXSBTU0EgTU9ERSBpcyB0cnVlLiBidXQsIHNzYVJlc3VsdCBpcyBudWxsJyk7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICAgICAgICAgIHNzYVJlc3VsdExpc3QucHVzaChzc2FSZXN1bHQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmV0cnlTdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IEZBS0UgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdGQUtFJztcbiAgICAgICAgICAgICAgICBjb25zdCBSRUFMID0gdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlUeXBlID09PSAnUkVBTCc7XG4gICAgICAgICAgICAgICAgY29uc3QgRU5TRU1CTEUgPSB0aGlzLl9fb3B0aW9ucy5zc2FSZXRyeVR5cGUgPT09ICdFTlNFTUJMRSc7XG4gICAgICAgICAgICAgICAgbGV0IGlzQ29tcGxldGVkID0gZmFsc2U7IC8vIOu5hOuPmeq4sCBmb3Ig66y4IOuVjOusuOyXkCBicmVha+qwgCDslYjqsbjrpqzripQg7J207IqI66GcIOuEo+ydjFxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3NzYVJldHJ5Q291bnQgPT09IHRoaXMuX19vcHRpb25zLnNzYU1heFJldHJ5Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zc2FSZXRyeUNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMDsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHNzYVJlc3VsdCA9IGF3YWl0IHRoaXMuX19zdGFydFRydXRoUmV0cnkodGhpcy5fX29jclR5cGUsIHRoaXMuX19hZGRyZXNzLCBpdGVtKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGlmIChzc2FSZXN1bHQgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignW0VSUl0gU1NBIE1PREUgaXMgdHJ1ZS4gYnV0LCBzc2FSZXN1bHQgaXMgbnVsbCcpOyAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgICAgICAgICAgICAgICBzc2FSZXN1bHRMaXN0LnB1c2goc3NhUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBpZiAoRkFLRSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3NhUmVzdWx0LmluZGV4T2YoJ1JFQUwnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKFJFQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNzYVJlc3VsdC5pbmRleE9mKCdGQUtFJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChFTlNFTUJMRSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBleGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHJ5V29ya2luZ1RpbWUgPSBuZXcgRGF0ZSgpIC0gcmV0cnlTdGFydERhdGU7XG4gICAgICAgICAgICAgICAgdm9pZCAwOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VNYXNrSW5mbykge1xuICAgICAgICAgICAgICBtYXNrSW5mbyA9IHRoaXMuX19nZXRNYXNrSW5mbyh0aGlzLl9fYWRkcmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0XG4gICAgICAgICAgICB9ID0gdXNlYk9DUldBU01QYXJzZXIucGFyc2VPY3JSZXN1bHQodGhpcy5fX29jclR5cGUsIHRoaXMuX19zc2FNb2RlLCBvY3JSZXN1bHQsIHNzYVJlc3VsdCwgdGhpcy5fX3NzYVJldHJ5Q291bnQsIHNzYVJlc3VsdExpc3QsIHRoaXMuX19vcHRpb25zLnNzYVJldHJ5VHlwZSwgdGhpcy5fX29wdGlvbnMuc3NhUmV0cnlQaXZvdFxuICAgICAgICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgICAgICAgIC8vIHRoaXMuX19vcHRpb25zLnVzZVBpaUVuY3J5cHRNb2RlXG4gICAgICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IG1hc2tJbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGZhY2VJbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm86IG1hc2tJbmZvLFxuICAgICAgICAgICAgICBzc2FfbW9kZTogdGhpcy5fX3NzYU1vZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5lbmNyeXB0UmVzdWx0KHJldmlld19yZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUxlZ2FjeUZvcm1hdCkge1xuICAgICAgICAgICAgICByZXZpZXdfcmVzdWx0Lm9jcl9kYXRhID0gbGVnYWN5Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgICAgIHRoaXMuX19kZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICdDYXJkIGRldGVjdGlvbiBlcnJvcic7XG4gICAgICAgICAgaWYgKGUubWVzc2FnZSkge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZvaWQgMDtcblxuICAgICAgICAgIC8vIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ21lbW9yeScpKSB7XG4gICAgICAgICAgLy8gICBhd2FpdCB0aGlzLl9fcmVjb3ZlcnlTY2FuKCk7XG4gICAgICAgICAgLy8gICB0aGlzLl9fcmVjb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX19vbkZhaWx1cmVQcm9jZXNzKCdXQTAwMScsIGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5fX2Nsb3NlQ2FtZXJhKCk7XG4gICAgICAgICAgdGhpcy5fX2RldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19yZWNvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX19yZWNvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9fZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2NhbiwgMSk7IC8vIOyerOq3gFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2V0VGltZW91dChzY2FuLCAxKTsgLy8gVUkg656c642U66eBIGJsb2NraW5nIOuwqeyngCAoc2V0VGltZW91dClcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIF9fY29tcHJlc3NJbWFnZXMocmV2aWV3X3Jlc3VsdCwgaW1nRGF0YVVybCwgbWFza0ltYWdlLCBmYWNlSW1hZ2UsIGNvbnN0YW50TnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX19vcHRpb25zLnVzZUNvbXByZXNzSW1hZ2UpIHtcbiAgICAgIGNvbnN0IHJlc2l6ZVJhdGlvID0gdGhpcy5fX2Nyb3BJbWFnZVNpemVIZWlnaHQgLyB0aGlzLl9fY3JvcEltYWdlU2l6ZVdpZHRoO1xuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIG1heFdpZHRoOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgsXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoICogcmVzaXplUmF0aW8sXG4gICAgICAgIGNvbnZlcnRTaXplOiB0aGlzLl9fb3B0aW9ucy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lLFxuICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogdGhpcy5fX29wdGlvbnMudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSAvLyBjdXN0b20gb3B0aW9uXG4gICAgICB9O1xuXG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9vcmlnaW5faW1hZ2UgPSBhd2FpdCB0aGlzLl9fY29tcHJlc2VCYXNlNjRJbWFnZShpbWdEYXRhVXJsLCBkZWZhdWx0T3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuXG4gICAgICAvLyBtYXNraW5nIOydtOuvuOyngOuKlCByZXNpemUg7ZWY66m0LCBtYXNrIOyijO2RnOqwgCDslrTquIvrgpjrr4DroZwg66as7IKs7J207KaIIOyViO2VmOqzoCDslZXstpXrp4wg7KeE7ZaJXG4gICAgICBjb25zdCBtYXNraW5nSW1hZ2VPcHRpb25zID0ge1xuICAgICAgICBxdWFsaXR5OiBkZWZhdWx0T3B0aW9ucy5xdWFsaXR5LFxuICAgICAgICB0YXJnZXRDb21wcmVzc1ZvbHVtZTogZGVmYXVsdE9wdGlvbnMudGFyZ2V0Q29tcHJlc3NWb2x1bWVcbiAgICAgIH07XG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9tYXNraW5nX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UobWFza0ltYWdlLCBtYXNraW5nSW1hZ2VPcHRpb25zLCBjb25zdGFudE51bWJlcik7XG4gICAgICByZXZpZXdfcmVzdWx0Lm9jcl9mYWNlX2ltYWdlID0gYXdhaXQgdGhpcy5fX2NvbXByZXNlQmFzZTY0SW1hZ2UoZmFjZUltYWdlLCBkZWZhdWx0T3B0aW9ucywgY29uc3RhbnROdW1iZXIpO1xuICAgIH1cbiAgfVxuICBfX3JlcXVlc3RHZXRBUElUb2tlbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY3JlZGVudGlhbCA9IHRoaXMuX19vcHRpb25zLmF1dGhTZXJ2ZXJJbmZvLmNyZWRlbnRpYWw7XG4gICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5fX29wdGlvbnMuYXV0aFNlcnZlckluZm8uYmFzZVVybDtcbiAgICAgIGZldGNoKGAke2Jhc2VVcmx9L3NpZ24taW5gLCB7XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWwpLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgICAgICAvLyBtb2RlOiAnY29ycycsXG4gICAgICAgIC8vIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgZmV0Y2goYCR7YmFzZVVybH0vdXNlYi90b2tlbmAsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiBgQmVhcmVyICR7cmVzdWx0LnRva2VufWBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIHJlc29sdmUoanNvbi50b2tlbik7XG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfX3JlcXVlc3RTZXJ2ZXJPQ1Iob2NyVHlwZSwgc3NhTW9kZSwgaW1nRGF0YVVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgYmFzZVVybCA9IHRoaXMuX19vcHRpb25zLm9jclNlcnZlckJhc2VVcmw7XG4gICAgICAgIHN3aXRjaCAob2NyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2lkY2FyZCc6XG4gICAgICAgICAgY2FzZSAnZHJpdmVyJzpcbiAgICAgICAgICBjYXNlICdpZGNhcmQtc3NhJzpcbiAgICAgICAgICBjYXNlICdkcml2ZXItc3NhJzpcbiAgICAgICAgICAgIGJhc2VVcmwgKz0gJy9vY3IvaWRjYXJkLWRyaXZlcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYXNzcG9ydCc6XG4gICAgICAgICAgY2FzZSAncGFzc3BvcnQtc3NhJzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0JzpcbiAgICAgICAgICBjYXNlICdmb3JlaWduLXBhc3Nwb3J0LXNzYSc6XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcvb2NyL3Bhc3Nwb3J0JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuLWJhY2snOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9hbGllbi1iYWNrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FsaWVuJzpcbiAgICAgICAgICBjYXNlICdhbGllbi1zc2EnOlxuICAgICAgICAgICAgYmFzZVVybCArPSAnL29jci9hbGllbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjcmVkaXQnOlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDcmVkaXQgY2FyZCBpcyBub3QgVW5zdXBwb3J0ZWQgU2VydmVyIE9DUicpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIE9DUiB0eXBlOiAke29jclR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXBpVG9rZW4gPSBhd2FpdCB0aGlzLl9fcmVxdWVzdEdldEFQSVRva2VuKCk7XG4gICAgICAgIGNvbnN0IG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIG15SGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7YXBpVG9rZW59YCk7XG4gICAgICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgICAgIGltYWdlX2Jhc2U2NDogaW1nRGF0YVVybCxcbiAgICAgICAgICBtYXNrX21vZGU6ICd0cnVlJyxcbiAgICAgICAgICBmYWNlX21vZGU6ICd0cnVlJ1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fX3NzYU1vZGUpIHtcbiAgICAgICAgICBwYXJhbS5zc2FfbW9kZSA9ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYXcgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcbiAgICAgICAgICBib2R5OiByYXcsXG4gICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnXG4gICAgICAgIH07XG4gICAgICAgIGZldGNoKGJhc2VVcmwsIHJlcXVlc3RPcHRpb25zKS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgdm9pZCAwO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdm9pZCAwO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfX3N0YXJ0U2NhblNlcnZlckltcGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAgIC8vIHRoaXMuX19zZXRQaWlFbmNyeXB0TW9kZSh0aGlzLl9fb3B0aW9ucy51c2VQaWlFbmNyeXB0TW9kZSk7IC8vIG9jciByZXN1bHQgZW5jcnlwdFxuICAgICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcbiAgICAgICAgdGhpcy5fX2JsdXJDYXB0dXJlQnV0dG9uKCk7XG4gICAgICAgIGxldCBvY3JSZXN1bHQgPSBudWxsLFxuICAgICAgICAgIHNzYVJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgc3NhUmVzdWx0TGlzdCA9IFtdO1xuICAgICAgICBjb25zdCBfX29uQ2xpY2tDYXB0dXJlQnV0dG9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIC8vIOy6lOuyhOyKpOyXkOyEnCDsnbTrr7jsp4Drpbwg6rCA7KC47Ji0XG4gICAgICAgICAgY29uc3QgWywgaW1nRGF0YVVybF0gPSBhd2FpdCB0aGlzLl9fY3JvcEltYWdlRnJvbVZpZGVvKCk7XG4gICAgICAgICAgaWYgKDEgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNlcnZlciBvY3Ig7Iuk7YyoICjrsJzsg50g6rCA64ql7ISxIOyXhuydjClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VydmVyIG9jciDshLHqs7VcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk1BTlVBTF9DQVBUVVJFX1NVQ0NFU1MsIGZhbHNlLCBpbWdEYXRhVXJsKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9jclJlc3VsdCA9IGF3YWl0IHRoaXMuX19yZXF1ZXN0U2VydmVyT0NSKHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgaW1nRGF0YVVybCk7XG5cbiAgICAgICAgICAgICAgLy8gZmFpbHVyZSBjYXNlXG4gICAgICAgICAgICAgIGlmIChvY3JSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX0ZBSUxFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgT0NSIGlzIGZhaWxlZGApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzc2Eg7Iuc64+EP1xuXG4gICAgICAgICAgICAvLyBzdWNjZXNzIGNhc2VcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdmlkZW9cbiAgICAgICAgICAgIH0gPSBkZXRlY3Rvci5nZXRPQ1JFbGVtZW50cygpO1xuICAgICAgICAgICAgdGhpcy5fX3NldFN0eWxlKHZpZGVvLCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgfSk7IC8vIE9DUiDsmYTro4wg7Iuc7KCQ7JeQIGNhbWVyYSBwcmV2aWV3IG9mZlxuXG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIGxlZ2FjeUZvcm1hdCxcbiAgICAgICAgICAgICAgbmV3Rm9ybWF0LFxuICAgICAgICAgICAgICBiYXNlNjRJbWFnZVJlc3VsdCxcbiAgICAgICAgICAgICAgbWFza0luZm9cbiAgICAgICAgICAgIH0gPSB1c2ViT0NSQVBJUGFyc2VyLnBhcnNlT2NyUmVzdWx0KHRoaXMuX19vY3JUeXBlLCB0aGlzLl9fc3NhTW9kZSwgb2NyUmVzdWx0KTtcbiAgICAgICAgICAgIGxldCByZXZpZXdfcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBvY3JfdHlwZTogdGhpcy5fX29jclR5cGUsXG4gICAgICAgICAgICAgIG9jcl9yZXN1bHQ6IG5ld0Zvcm1hdCxcbiAgICAgICAgICAgICAgb2NyX29yaWdpbl9pbWFnZTogaW1nRGF0YVVybCxcbiAgICAgICAgICAgICAgb2NyX21hc2tpbmdfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfbWFza2luZ19pbWFnZSxcbiAgICAgICAgICAgICAgb2NyX2ZhY2VfaW1hZ2U6IGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSxcbiAgICAgICAgICAgICAgbWFza0luZm8sXG4gICAgICAgICAgICAgIHNzYV9tb2RlOiB0aGlzLl9fc3NhTW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZGVidWdNb2RlKSB7XG4gICAgICAgICAgICAgIHJldmlld19yZXN1bHQub2NyX2FwaV9yZXNwb25zZSA9IG9jclJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX19jb21wcmVzc0ltYWdlcyhyZXZpZXdfcmVzdWx0LCBpbWdEYXRhVXJsLCBiYXNlNjRJbWFnZVJlc3VsdD8ub2NyX21hc2tpbmdfaW1hZ2UsIGJhc2U2NEltYWdlUmVzdWx0Py5vY3JfZmFjZV9pbWFnZSwgMC4wKTtcbiAgICAgICAgICAgIHRoaXMuZW5jcnlwdFJlc3VsdChyZXZpZXdfcmVzdWx0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fb3B0aW9ucy51c2VMZWdhY3lGb3JtYXQpIHtcbiAgICAgICAgICAgICAgcmV2aWV3X3Jlc3VsdC5vY3JfZGF0YSA9IGxlZ2FjeUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvY3JSZXN1bHQuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fX29uU3VjY2Vzc1Byb2Nlc3MocmV2aWV3X3Jlc3VsdCk7XG4gICAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHRDb2RlID0gJ1NGMDAxJztcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0TWVzc2FnZSA9IGAke29jclJlc3VsdC5zY2FubmVyX3R5cGV9OiR7b2NyUmVzdWx0Py5yZXN1bHRfY29kZX1gO1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHREZXRhaWwgPSBKU09OLnN0cmluZ2lmeShvY3JSZXN1bHQpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcyhyZXN1bHRDb2RlLCByZXN1bHREZXRhaWwsIHJlc3VsdE1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuXG4gICAgICAgICAgICAgIHRoaXMuX19jbG9zZUNhbWVyYSgpO1xuICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX19jYXB0dXJlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fb25DbGlja0NhcHR1cmVCdXR0b24pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gJ1NlcnZlciBPQ1IgRXJyb3InO1xuICAgICAgICBpZiAoZS5tZXNzYWdlKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlICs9ICc6ICcgKyBlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCAwO1xuICAgICAgICBhd2FpdCB0aGlzLl9fb25GYWlsdXJlUHJvY2VzcygnU0UwMDEnLCBlLCBlcnJvck1lc3NhZ2UpOyAvLyBRVVJBTSBTZXJ2ZXIgT0NSIOyXkOufrFxuICAgICAgICB0aGlzLl9fY2xvc2VDYW1lcmEoKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgX19lbnF1ZXVlRGV0ZWN0ZWRDYXJkUXVldWUoaW1nRGF0YSwgaW1nRGF0YVVSTCkge1xuICAgIC8vIHNzYSByZXRyeSDshKTsoJXsnbQg65CY7Ja0IOyeiOycvOqxsOuCmCwg7IiY64+Z7LSs7JiBVUnrpbwg7IKs7Jqp7ZWY64qUIOqyveyasCwgY2FyZCBkZXRlY3Qg7ISx6rO17IucIOydtOuvuOyngCDsoIDsnqVcbiAgICBpZiAodGhpcy5fX3NzYU1vZGUgJiYgdGhpcy5fX29wdGlvbnMuc3NhTWF4UmV0cnlDb3VudCA+IDAgfHwgdGhpcy5fX29wdGlvbnMudXNlQ2FwdHVyZVVJICYmIHRoaXMuX19tYW51YWxPQ1JNYXhSZXRyeUNvdW50ID4gMCkge1xuICAgICAgbGV0IGxpbWl0U2F2ZUltYWdlQ291bnQgPSBNYXRoLm1heCh0aGlzLl9fb3B0aW9ucy5zc2FNYXhSZXRyeUNvdW50LCB0aGlzLl9fbWFudWFsT0NSTWF4UmV0cnlDb3VudCk7XG4gICAgICBpZiAodGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLmxlbmd0aCA9PT0gbGltaXRTYXZlSW1hZ2VDb3VudCkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKHRoaXMuX19kZWJ1Z01vZGUpIHRoaXMuX19kZXRlY3RlZENhcmRRdWV1ZUJhc2U2NC5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2RldGVjdGVkQ2FyZFF1ZXVlLnB1c2goaW1nRGF0YSk7XG4gICAgICBpZiAodGhpcy5fX2RlYnVnTW9kZSkge1xuICAgICAgICB0aGlzLl9fZGV0ZWN0ZWRDYXJkUXVldWVCYXNlNjQucHVzaChpbWdEYXRhVVJMKTtcbiAgICAgICAgdm9pZCAwOyAvLyBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgfVxuXG4gICAgICB2b2lkIDA7IC8vIHNob3VsZCBiZSByZW1vdmVkXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX19vblN1Y2Nlc3NQcm9jZXNzKHJldmlld19yZXN1bHQpIHtcbiAgICAvLyDsnbjsi50g7ISx6rO1IOyKpOy6lCDro6jtlIQg7KKF66OMXG4gICAgaWYgKHJldmlld19yZXN1bHQuc3NhX21vZGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9TVUNDRVNTX1dJVEhfU1NBKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5fX2NoYW5nZVN0YWdlKHRoaXMuSU5fUFJPR1JFU1MuT0NSX1NVQ0NFU1MpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBhcGlfcmVzcG9uc2U6IHtcbiAgICAgICAgcmVzdWx0X2NvZGU6ICdOMTAwJyxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6ICdPSy4nXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiAnc3VjY2VzcycsXG4gICAgICByZXZpZXdfcmVzdWx0OiByZXZpZXdfcmVzdWx0XG4gICAgfTtcbiAgICBpZiAodGhpcy5fX29uU3VjY2Vzcykge1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgdGhpcy5fX29uU3VjY2VzcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgYXN5bmMgX19vbkZhaWx1cmVQcm9jZXNzKHJlc3VsdENvZGUsIGUsIGVycm9yTWVzc2FnZSkge1xuICAgIGF3YWl0IHRoaXMuX19jaGFuZ2VTdGFnZSh0aGlzLklOX1BST0dSRVNTLk9DUl9GQUlMRUQpO1xuICAgIGxldCBlcnJvckRldGFpbCA9ICcnO1xuICAgIGlmIChlPy50b1N0cmluZygpKSBlcnJvckRldGFpbCArPSBlLnRvU3RyaW5nKCk7XG4gICAgaWYgKGU/LnN0YWNrKSBlcnJvckRldGFpbCArPSBlLnN0YWNrO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGFwaV9yZXNwb25zZToge1xuICAgICAgICByZXN1bHRfY29kZTogcmVzdWx0Q29kZSxcbiAgICAgICAgcmVzdWx0X21lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgfSxcbiAgICAgIHJlc3VsdDogJ2ZhaWxlZCcsXG4gICAgICByZXZpZXdfcmVzdWx0OiB7XG4gICAgICAgIG9jcl90eXBlOiB0aGlzLl9fb2NyVHlwZSxcbiAgICAgICAgZXJyb3JfZGV0YWlsOiBlcnJvckRldGFpbFxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHRoaXMuX19vbkZhaWx1cmUpIHtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUocmVzdWx0KTtcbiAgICAgIHRoaXMuX19vbkZhaWx1cmUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIDA7XG4gICAgfVxuICB9XG4gIGFzeW5jIF9fcHJlbG9hZGluZ1dhc20oKSB7XG4gICAgY29uc3QgcHJlbG9hZGluZ1N0YXR1cyA9IHRoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpO1xuICAgIGlmICghdGhpcy5pc1ByZWxvYWRlZCgpICYmIHByZWxvYWRpbmdTdGF0dXMgPT09IHRoaXMuUFJFTE9BRElOR19TVEFUVVMuTk9UX1NUQVJURUQpIHtcbiAgICAgIHZvaWQgMDtcbiAgICAgIGF3YWl0IHRoaXMucHJlbG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5TVEFSVEVEKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgICAgYXdhaXQgdGhpcy5fX3dhaXRQcmVsb2FkZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAocHJlbG9hZGluZ1N0YXR1cyA9PT0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5ET05FKSB7XG4gICAgICAgIHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgYWJub3JtYWxseSBwcmVsb2FkaW5nIHN0YXR1cywgcHJlbG9hZGVkOiAke3RoaXMuaXNQcmVsb2FkZWQoKX0gLyBwcmVsb2FkaW5nU3RhdHVzOiAke3RoaXMuZ2V0UHJlbG9hZGluZ1N0YXR1cygpfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gIC8vIF9fc2V0UGlpRW5jcnlwdE1vZGUocGlpRW5jcnlwdE1vZGUpIHtcbiAgLy8gICB0aGlzLl9fT0NSRW5naW5lLnNldFBpaUVuY3J5cHQocGlpRW5jcnlwdE1vZGUpO1xuICAvLyB9XG4gIC8vXG4gIC8vIF9fZW5jcnlwdERldGVjdGVkQmFzZTY0KGFkZHJlc3MsIG1hc2ssIG9jcl9tb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgaWYgKGltZ1R5cGUgPT09ICdmYWNlJykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuX19PQ1JFbmdpbmUuZW5jcnlwdEJhc2U2NGpwZ0RldGVjdGVkUGhvdG9CYXNlNjQoYWRkcmVzcyk7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmVuY3J5cHRCYXNlNjRqcGdEZXRlY3RlZEZyYW1lQmFzZTY0KFxuICAvLyAgICAgYWRkcmVzcyxcbiAgLy8gICAgIG1hc2ssXG4gIC8vICAgICBvY3JfbW9kZVxuICAvLyAgICk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gX19nZXRFbmNyeXB0ZWRTaXplKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9fT0NSRW5naW5lLmdldEVuY3J5cHRlZEpwZ1NpemUoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldEVuY3J5cHRlZEJ1ZmZlcigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fX09DUkVuZ2luZS5nZXRFbmNyeXB0ZWRKcGdCdWZmZXIoKTtcbiAgLy8gfVxuICAvL1xuICAvLyBfX2dldFBpaUVuY3J5cHRJbWFnZUJhc2U2NChhZGRyZXNzLCBtYXNrLCBpbWdNb2RlLCBpbWdUeXBlID0gJ2NhcmQnKSB7XG4gIC8vICAgY29uc3QgZW5jcnlwdERldGVjdGVkQmFzZTY0ID0gdGhpcy5fX2VuY3J5cHREZXRlY3RlZEJhc2U2NChcbiAgLy8gICAgIGFkZHJlc3MsXG4gIC8vICAgICBtYXNrLFxuICAvLyAgICAgaW1nTW9kZSxcbiAgLy8gICAgIGltZ1R5cGVcbiAgLy8gICApO1xuICAvLyAgIGlmIChlbmNyeXB0RGV0ZWN0ZWRCYXNlNjQgPT09IDEpIHtcbiAgLy8gICAgIGNvbnN0IGpwZ1NpemUgPSB0aGlzLl9fZ2V0RW5jcnlwdGVkU2l6ZSgpO1xuICAvLyAgICAgY29uc3QganBnUG9pbnRlciA9IHRoaXMuX19nZXRFbmNyeXB0ZWRCdWZmZXIoKTtcbiAgLy9cbiAgLy8gICAgIGNvbnN0IGVuY3J5cHRlZCA9IG5ldyBVaW50OEFycmF5KFxuICAvLyAgICAgICB0aGlzLl9fT0NSRW5naW5lLkhFQVA4LmJ1ZmZlcixcbiAgLy8gICAgICAganBnUG9pbnRlcixcbiAgLy8gICAgICAganBnU2l6ZVxuICAvLyAgICAgKTtcbiAgLy8gICAgIGNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuICAvLyAgICAgY29uc3QgZGVjb2RlZFN0cmluZyA9IHRleHREZWNvZGVyLmRlY29kZShlbmNyeXB0ZWQpO1xuICAvL1xuICAvLyAgICAgcmV0dXJuIGRlY29kZWRTdHJpbmc7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiAnJztcbiAgLy8gfVxuICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICBhc3luYyBfX3N0YXJ0U2Nhbldhc20oKSB7XG4gICAgdGhpcy5fX2RlYnVnKCd3YXNtX21vZGUnKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICBhd2FpdCB0aGlzLl9fcHJvY2VlZENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICBhd2FpdCB0aGlzLl9fc3RhcnRTY2FuV2FzbUltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19zdGFydFNjYW5TZXJ2ZXIoKSB7XG4gICAgdGhpcy5fX2RlYnVnKCdzZXJ2ZXJfbW9kZScpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIHRoaXMuX19vcHRpb25zLnVzZUNhcHR1cmVVSSA9IHRydWU7XG4gICAgYXdhaXQgdGhpcy5fX3Byb2NlZWRDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2NhblNlcnZlckltcGwoKTtcbiAgICB2b2lkIDA7XG4gIH1cbiAgYXN5bmMgX19yZWNvdmVyeVNjYW4oKSB7XG4gICAgdm9pZCAwO1xuICAgIHRoaXMuX19yZXNvdXJjZXNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3BTY2FuKCk7XG4gICAgYXdhaXQgdGhpcy5fX3N0YXJ0U2Nhbldhc20oKTtcbiAgfVxuICBzdG9wU2NhbigpIHtcbiAgICB0aGlzLl9fZGV0ZWN0ZWQgPSB0cnVlOyAvLyBzd2l0Y2ggdG8gc2VydmVy7J2865WMIOq4sOyhtCBXQVNNIGxvb3Ag6rCV7KCc7KKF66OMXG4gICAgY29uc3Qge1xuICAgICAgY2FudmFzXG4gICAgfSA9IGRldGVjdG9yLmdldE9DUkVsZW1lbnRzKCk7XG4gICAgaWYgKGNhbnZhcykge1xuICAgICAgY29uc3QgY2FudmFzQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuICB9XG4gIHN0b3BTdHJlYW0oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fX3JlcXVlc3RBbmltYXRpb25GcmFtZUlkKTtcbiAgICBpZiAodGhpcy5fX3N0cmVhbSkge1xuICAgICAgdGhpcy5fX3N0cmVhbS5zdG9wICYmIHRoaXMuX19zdHJlYW0uc3RvcCgpO1xuICAgICAgbGV0IHRyYWNrcyA9IHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzICYmIHRoaXMuX19zdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICB2b2lkIDA7XG4gICAgICBpZiAodHJhY2tzICYmIHRyYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgdHJhY2tzLmZvckVhY2godHJhY2sgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zdHJlYW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDrqZTrqqjrpqwgYWxsb2NhdGlvbiBmcmVlIO2VqOyImCAqL1xuICBjbGVhbnVwKCkge1xuICAgIHRoaXMuX19kZXN0cm95U2Nhbm5lckFkZHJlc3MoKTtcbiAgICB0aGlzLl9fZGVzdHJveUJ1ZmZlcigpO1xuICAgIHRoaXMuX19kZXN0cm95UHJldkltYWdlKCk7XG4gICAgdGhpcy5fX2Rlc3Ryb3lTdHJpbmdPbldhc21IZWFwKCk7XG4gIH1cbiAgcmVzdG9yZUluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5fX3ByZWxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX19wcmVsb2FkaW5nU3RhdHVzID0gdGhpcy5QUkVMT0FESU5HX1NUQVRVUy5OT1RfU1RBUlRFRDtcbiAgICB0aGlzLl9fcmVzb3VyY2VzTG9hZGVkID0gZmFsc2U7XG4gIH1cbiAgX19jbGVhckNhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIoKSB7XG4gICAgaWYgKHRoaXMuX19jYW1lcmFQZXJtaXNzaW9uVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIpO1xuICAgICAgdGhpcy5fX2NhbWVyYVBlcm1pc3Npb25UaW1lb3V0VGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVXNlQk9DUjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBT0EsUUFBUSxNQUFNLHVCQUF1QjtBQUM1QyxPQUFPQyxpQkFBaUIsTUFBTSxtQ0FBbUM7QUFDakUsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBQy9ELFNBQVNDLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBUSxrQ0FBa0M7QUFDeEYsT0FBT0MsU0FBUyxNQUFNLHlCQUF5QjtBQUMvQyxJQUFJQyxRQUFRO0FBQ1osTUFBTUMsT0FBTyxDQUFDO0VBb0NaOztFQUVBOztFQXVFaUM7RUFDTDs7RUFNRTtFQUNGO0VBQ0M7O0VBSzdCOztFQW1MQTtFQUNBQyxXQUFXQSxDQUFBLEVBQUc7SUFBQUMsZUFBQSxzQkE5U0E7TUFDWkMsSUFBSSxFQUFFLE1BQU07TUFDWkMsU0FBUyxFQUFFLFdBQVc7TUFDdEJDLEtBQUssRUFBRSxPQUFPO01BQ2RDLG1CQUFtQixFQUFFLGdCQUFnQjtNQUNyQ0Msa0JBQWtCLEVB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
