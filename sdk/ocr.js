function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable */
/* global-module */
import detector from './helpers/detector.js?ver=v1.37.4';
import usebOCRWASMParser from './helpers/useb-ocr-wasm-parser.js?ver=v1.37.4';
import usebOCRAPIParser from './helpers/useb-ocr-api-parser.js?ver=v1.37.4';
import { isSupportWasm, measure, simd } from './helpers/wasm-feature-detect.js?ver=v1.37.4';
import ImageUtil from './helpers/image-util.js?ver=v1.37.4';
var instance;
var OCRRESULT_KEY_SET = new Object({
  IDCARD: new Set(['result_scan_type', 'name', 'jumin', 'issued_date', 'region', 'overseas_resident', 'driver_number', 'driver_serial', 'driver_type', 'aptitude_test_date_start', 'aptitude_test_date_end',
  // 'is_old_format_driver_number',
  // 'birth',

  'color_point', 'found_face', 'found_eye', 'specular_ratio', 'start_time', 'end_time', 'ocr_origin_image', 'ocr_masking_image', 'ocr_face_image']),
  PASSPORT: new Set(['result_scan_type', 'name', 'sur_name', 'given_name', 'passport_type', 'issuing_country', 'passport_number', 'nationality', 'issued_date', 'sex', 'expiry_date', 'personal_number', 'jumin', 'birthday', 'name_kor', 'mrz1', 'mrz2', 'color_point', 'found_face', 'found_eye', 'specular_ratio', 'start_time', 'end_time', 'ocr_origin_image', 'ocr_masking_image', 'ocr_face_image']),
  ALIEN: new Set(['result_scan_type', 'name', 'jumin', 'issued_date', 'nationality', 'visa_type', 'name_kor', 'color_point', 'found_face', 'found_eye', 'specular_ratio', 'start_time', 'end_time', 'ocr_origin_image', 'ocr_masking_image', 'ocr_face_image']),
  VETERAN: new Set(['result_scan_type', 'name', 'jumin', 'issued_date', 'masked_veterans_number', 'found_face', 'found_eye', 'specular_ratio', 'start_time', 'end_time', 'ocr_origin_image', 'ocr_masking_image', 'ocr_face_image'])
});
var OPTION_TEMPLATE = new Object({
  // 디버깅 옵션
  showClipFrame: false,
  // cilp-frame 보기
  showCanvasPreview: false,
  // canvas preview 보기
  useIDNumberValidation: true,
  // 주민번호, 운전면허번호, 외국인등록번호 뒷자리 유효성 검증 사용 여부

  // 출력 옵션
  // 암호화
  // useEncryptModeJSLevel: false, // 암호화 적용 (개인고유식별부호 관련 항목 암호화)
  // useEncryptAllMode: false, // 암호화 적용 (전체 암호화, encrypt object 별도 제공)
  useEncryptValueMode: false,
  useEncryptOverallMode: false,
  // 암호화 적용 (ocr 이미지, 마스킹 이미지, 얼굴이미지 포함)
  useEncryptMode: false,
  // 암호화 적용 (pii)
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
  // 이미지 압축 목표 용량 (kb)
  ocrResultIdcardKeylist: [],
  // 주민증/면허증 평문 결과 출력 키 목록
  encryptedOcrResultIdcardKeylist: [],
  // 주민증/면허증 암호화 결과 출력 키 목록
  ocrResultPassportKeylist: [],
  // 여권 평문 결과 출력 키 목록
  encryptedOcrResultPassportKeylist: [],
  // 여권 암호화 결과 출력 키 목록
  ocrResultAlienKeylist: [],
  // 외국인등록증 평문 결과 출력 키 목록
  encryptedOcrResultAlienKeylist: [],
  // 외국인등록증 암호화 결과 출력 키 목록

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
  switchToServerThreshold: 20,
  // 자동전환 기준값 (성능 측정치 ms)
  useForceCompleteUI: false,
  // WASM 모드일때 버튼 누를시 해당 시점에 강제로 완료 사용여부
  skipServerModeRequestOCR: false,
  // ServerMode일 때 OCR서버 요청 skip 여부

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
  useOriginImageSquareRatio: false,
  // 신분증 원본이미지를 1080x1080 정방형 비율로 사용할지 여부. (default: false)

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
  force_wasm_reload_flag: '',
  wasmResourceTimeout: -1,
  // WASM 리소스 load 시 최대 대기 시간, -1이면 무한 대기.

  // ocr config 설정: 키오스크 등 특정 목적으로 사용되는 경우 config 값 설정, 해당 없는 경우 빈값('')으로 설정
  ocr_config: '',
  ocrServerBaseUrl: 'https://quram.useb.co.kr',
  ocrServerUrlIdcardDriver: '',
  ocrServerUrlPassport: '',
  ocrServerUrlForeignPassport: '',
  ocrServerUrlAlien: '',
  ocrServerUrlAlienBack: '',
  ocrServerUrlVeteran: '',
  ocrServerParseKeyList: [],
  // ServerOCR 응답값에서 ocrResult로 추가할 키 목록
  useFakeImage: false,
  // ServerOCR 신분증 원본이미지 fake 처리 여부
  useRequestCameraBeforeModuleLoad: false // 카메라 권한 요청을 모듈 로드 전에 할지 여부 (기본값 false)
});

function defaultServerOCRPreprocessor(result) {
  return result;
}
export class OCRError extends Error {
  constructor(e, errorCode) {
    super(e);
    _defineProperty(this, "errorCode", void 0);
    _defineProperty(this, "name", void 0);
    this.errorCode = errorCode;
    this.name = (e === null || e === void 0 ? void 0 : e.name) || 'Error';
  }
}
class UseBOCR {
  /** public properties */

  /** private properties */

  // 임시
  // 임시

  // 수정불가
  // 수정불가
  // 수정불가

  // wasm resource 타이머 id
  // wasm resource 타이머 반환값 (Promise)
  // wasm resource timeout 여부

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
    _defineProperty(this, "__EncryptModule", null);
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
    _defineProperty(this, "__onSuccess", null);
    _defineProperty(this, "__onFailure", null);
    _defineProperty(this, "__onInProgressChange", null);
    _defineProperty(this, "__serverOCRPreprocessor", defaultServerOCRPreprocessor.bind(this));
    _defineProperty(this, "__ocrTypeList", ['idcard', 'driver', 'passport', 'foreign-passport', 'alien', 'alien-back', 'veteran', 'credit', 'idcard-ssa', 'driver-ssa', 'passport-ssa', 'foreign-passport-ssa', 'alien-ssa', 'veteran-ssa', 'barcode']);
    _defineProperty(this, "__ocrTypeNumberToString", new Map([['1', 'idcard'], ['2', 'driver'], ['3', 'passport'], ['4', 'foreign-passport'], ['5', 'alien'], ['5-1', 'alien'], ['5-2', 'alien'], ['5-3', 'alien'], ['6', 'alien-back'], ['13', 'veteran']]));
    _defineProperty(this, "__ocrStringToTypeNumber", new Map([['idcard', '1'], ['driver', '2'], ['passport', '3'], ['foreign-passport', '4'], ['alien', '5'], ['alien', '5-1'], ['alien', '5-2'], ['alien', '5-3'], ['alien-back', '6'], ['veteran', '13']]));
    _defineProperty(this, "__ocrResultIdcardKeySet", _.cloneDeep(OCRRESULT_KEY_SET.IDCARD));
    _defineProperty(this, "__ocrResultPassportKeySet", _.cloneDeep(OCRRESULT_KEY_SET.PASSPORT));
    _defineProperty(this, "__ocrResultAlienKeySet", _.cloneDeep(OCRRESULT_KEY_SET.ALIEN));
    _defineProperty(this, "__ocrResultVeteranKeySet", _.cloneDeep(OCRRESULT_KEY_SET.VETERAN));
    _defineProperty(this, "__ocrResultTruthKeySet", new Set(['truth', 'conf']));
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
    _defineProperty(this, "__maxWasmResourceTimeout", 1000 * 60 * 60 * 24);
    _defineProperty(this, "__wasmResourceTimerId", void 0);
    _defineProperty(this, "__wasmResourceTimeoutFn", void 0);
    _defineProperty(this, "__isResourceTimeout", false);
    _defineProperty(this, "__options", _objectSpread({}, OPTION_TEMPLATE));
    if (instance) return instance;
    instance = this;
    return instance;
  }

  /** public methods */
  preloading(onPreloaded) {
    var _this = this;
    return _asyncToGenerator(function* () {
      var preloadingStatus = _this.getPreloadingStatus();
      if (!_this.isPreloaded() && preloadingStatus === _this.PRELOADING_STATUS.NOT_STARTED) {
        void 0;
        yield _this.__preloadingWasm();
        if (onPreloaded) onPreloaded();
      } else {
        if (preloadingStatus === _this.PRELOADING_STATUS.STARTED) {
          void 0;
          yield _this.__waitPreloaded();
        } else if (preloadingStatus === _this.PRELOADING_STATUS.DONE) {
          void 0;
          if (onPreloaded) onPreloaded();
        } else {
          throw new Error("abnormally preloading status, preloaded: ".concat(_this.isPreloaded(), " / preloadingStatus: ").concat(_this.getPreloadingStatus()));
        }
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
    return this.__options.useEncryptMode || this.__options.useEncryptValueMode || this.__options.useEncryptOverallMode;
  }
  isCreditCard() {
    return this.__ocrType === 'credit';
  }
  isBarcode() {
    return this.__ocrType === 'barcode';
  }
  isUsebServerOCR() {
    return this.__options.ocrServerBaseUrl === 'https://quram.useb.co.kr';
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

  // 미사용 : wasm 레벨에서 암호화하여 불필요 해짐
  // encryptResult(review_result) {
  //   if (this.isCreditCard()) {
  //     return;
  //   }
  //
  //   if (this.isEncryptMode() && this.__isSupportWasm) {
  //     // prettier-ignore
  //     if (this.__options.useEncryptModeJSLevel) {
  //       const includeList = ['jumin', 'driver_number', 'passport_number', 'personal_number', 'mrz2'];
  //       const encrypted = {
  //         ocr_result: _.toPairs(_.pick(review_result.ocr_result, includeList)).reduce((acc, [key, value]) => {
  //           acc[key] = this.__encryptScanResult(value);
  //           return acc;
  //         }, {}),
  //         ocr_origin_image: this.__encryptScanResult(review_result.ocr_origin_image),
  //       };
  //
  //       review_result.ocr_result = {
  //         ...review_result.ocr_result,
  //         ...encrypted.ocr_result,
  //       };
  //       review_result.ocr_origin_image = encrypted.ocr_origin_image;
  //     } else if (this.__options.useEncryptAllMode) {
  //       const excludeList = [
  //         'complete',
  //         'result_scan_type',
  //         'color_point',
  //         'found_face',
  //         'specular_ratio',
  //         'start_time',
  //         'end_time',
  //         'fd_confidence',
  //         'id_truth',
  //         'id_truth_retry_count',
  //       ];
  //       const encrypted = {
  //         ocr_result: _.toPairs(_.omit(review_result.ocr_result, excludeList)).reduce((acc, [key, value]) => {
  //           acc[key] = this.__encryptScanResult(value);
  //           return acc;
  //         }, {}),
  //         ocr_origin_image: this.__encryptScanResult(review_result.ocr_origin_image),
  //         ocr_masking_image: this.__encryptScanResult(review_result.ocr_masking_image),
  //         ocr_face_image: this.__encryptScanResult(review_result.ocr_face_image),
  //       };
  //       review_result.encrypted = encrypted;
  //     } else if (this.__options.useEncryptOverallMode) {
  //       const excludeOcrResult = this.__options.encryptedOcrResultIdcardKeylist.includes('all') ? {} : _.omit(review_result.ocr_result, this.__options.encryptedOcrResultIdcardKeylist);
  //       const excludeOcrImage = this.__options.encryptedOcrResultPassportKeylist.includes('all') ? _.omit(review_result, [...this.__ocrResultPassportKeySet]) : _.omit(review_result, this.__options.encryptedOcrResultPassportKeylist);
  //       const encrypted = { ocr_result: excludeOcrResult, ...excludeOcrImage };
  //
  //       review_result.timestamp = Date.now();
  //       review_result.encrypted_overall = this.__encryptScanResult(JSON.stringify(encrypted));
  //     }
  //   }
  // }

  excludeOcrResult(ocr_result, excludeKeylist) {
    return _.omit(ocr_result, excludeKeylist);
  }
  excludeOcrImage(review_result, excludeKeylist) {
    return _.omit(review_result, excludeKeylist);
  }
  getOCREngine() {
    return this.__OCREngine;
  }
  getEncryptEngine() {
    return this.__EncryptModule;
  }
  init(settings) {
    var _settings = _.cloneDeep(settings);
    if (!!!_settings.licenseKey) throw new OCRError('License key is empty', 'WA001');
    this.__license = _settings.licenseKey;
    this.__setOptionResultKeyList(_settings);
    this.__setOptionServerOcrResultKeyList(_settings);
    var mergedOptions = _.merge({}, this.__options, _settings);
    this.setOption(mergedOptions);
    void 0;
    if (!this.isInitialized()) {
      this.__windowEventBind();
      this.__deviceInfo = detector.getOsVersion();
      void 0;
      this.__isSupportWasm = isSupportWasm();
      if (!this.__isSupportWasm) {
        throw new OCRError('WebAssembly is not supported. in this browser.', 'WA005');
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
          if (_this2.__isResourceTimeout) return true;

          // threshold를 0으로 사용할 때 즉시 전환
          if (parseFloat(_this2.__options.switchToServerThreshold) === 0) return true;

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
  __setOptionResultKeyList(settings) {
    var ocrResultKeylistStringToIter = (str, keyIter) => str.toLowerCase().replace(/\s/g, '').split(',').filter(k => keyIter.has(k));
    var ocrResultIdcardKeylist = typeof settings.ocrResultIdcardKeylist === 'string' ? ocrResultKeylistStringToIter(settings.ocrResultIdcardKeylist, this.__ocrResultIdcardKeySet) : [...this.__ocrResultIdcardKeySet];
    var encryptedOcrResultIdcardKeylist = typeof settings.encryptedOcrResultIdcardKeylist === 'string' ? ocrResultKeylistStringToIter(settings.encryptedOcrResultIdcardKeylist, this.__ocrResultIdcardKeySet) : [...this.__ocrResultIdcardKeySet];
    var ocrResultPassportKeylist = typeof settings.ocrResultPassportKeylist === 'string' ? ocrResultKeylistStringToIter(settings.ocrResultPassportKeylist, this.__ocrResultPassportKeySet) : [...this.__ocrResultPassportKeySet];
    var encryptedOcrResultPassportKeylist = typeof settings.encryptedOcrResultPassportKeylist === 'string' ? ocrResultKeylistStringToIter(settings.encryptedOcrResultPassportKeylist, this.__ocrResultPassportKeySet) : [...this.__ocrResultPassportKeySet];
    var ocrResultAlienKeylist = typeof settings.ocrResultAlienKeylist === 'string' ? ocrResultKeylistStringToIter(settings.ocrResultAlienKeylist, this.__ocrResultAlienKeySet) : [...this.__ocrResultAlienKeySet];
    var encryptedOcrResultAlienKeylist = typeof settings.encryptedOcrResultAlienKeylist === 'string' ? ocrResultKeylistStringToIter(settings.encryptedOcrResultAlienKeylist, this.__ocrResultAlienKeySet) : [...this.__ocrResultAlienKeySet];
    var ocrResultVeteranKeylist = typeof settings.ocrResultVeteranKeylist === 'string' ? ocrResultKeylistStringToIter(settings.ocrResultVeteranKeylist, this.__ocrResultVeteranKeySet) : [...this.__ocrResultVeteranKeySet];
    var encryptedOcrResultVeteranKeylist = typeof settings.encryptedOcrResultVeteranKeylist === 'string' ? ocrResultKeylistStringToIter(settings.encryptedOcrResultVeteranKeylist, this.__ocrResultVeteranKeySet) : [...this.__ocrResultVeteranKeySet];
    settings.ocrResultIdcardKeylist = ocrResultIdcardKeylist;
    settings.encryptedOcrResultIdcardKeylist = encryptedOcrResultIdcardKeylist;
    settings.ocrResultPassportKeylist = ocrResultPassportKeylist;
    settings.encryptedOcrResultPassportKeylist = encryptedOcrResultPassportKeylist;
    settings.ocrResultAlienKeylist = ocrResultAlienKeylist;
    settings.encryptedOcrResultAlienKeylist = encryptedOcrResultAlienKeylist;
    settings.ocrResultVeteranKeylist = ocrResultVeteranKeylist;
    settings.encryptedOcrResultVeteranKeylist = encryptedOcrResultVeteranKeylist;
  }
  __setOptionServerOcrResultKeyList(settings) {
    if (!!settings.ocrServerParseKeyList) {
      settings.ocrServerParseKeyList = settings.ocrServerParseKeyList.replace(/\s/g, '').split(',');
    }
  }
  startOCR(type, onSuccess, onFailure) {
    var _arguments = arguments,
      _this3 = this;
    return _asyncToGenerator(function* () {
      var onInProgressChange = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : null;
      var serverOCRPreprocessor = _arguments.length > 4 ? _arguments[4] : undefined;
      if (!!!type || !!!onSuccess || !!!onFailure) {
        void 0;
        return;
      }
      _this3.__isSwitchToServerMode = yield _this3.checkSwitchToServerMode();
      _this3.__ocrType = type;
      _this3.__ssaMode = _this3.__ocrType.indexOf('-ssa') > -1;
      _this3.__onSuccess = onSuccess.bind(_this3);
      _this3.__onFailure = onFailure.bind(_this3);
      _this3.__onInProgressChange = onInProgressChange && typeof onInProgressChange === 'function' ? onInProgressChange.bind(_this3) : null;
      _this3.__serverOCRPreprocessor = serverOCRPreprocessor && typeof serverOCRPreprocessor === 'function' ? serverOCRPreprocessor.bind(_this3) : defaultServerOCRPreprocessor.bind(_this3);
      if (_this3.__onInProgressChange) {
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
        throw new OCRError('Not initialized!', 'WA011');
      }
      try {
        _this3.__preprocess();
        yield _this3.__setupDomElements();

        // 옵션에 따라 카메라 권한 요청과 모듈 로드 순서 분기
        if (_this3.__options.useRequestCameraBeforeModuleLoad) {
          yield _this3.__proceedCameraPermission();
          if (_this3.__isSwitchToServerMode) {
            yield _this3.__startScanServer();
          } else {
            yield _this3.__startScanWasm();
          }
        } else {
          if (_this3.__isSwitchToServerMode) {
            // serverMode
            // TODO : 서버 모드일때 wasm 암호화를 하더라도 JS에서 평문값을 받는순간 메모리에 남기때문의 무의미
            // if (this.isEncryptMode() && this.__isSupportWasm) {
            //   await this.__preloadingWasm(); // 서버모드 이지만 암호화 하기위해 wasm을 preloading 함
            // }
            yield _this3.__startScanServerWithCamera();
          } else {
            yield _this3.__startScanWasmWithCamera();
          }
        }
      } catch (e) {
        if ((e === null || e === void 0 ? void 0 : e.errorCode) === 'SE001') {
          yield _this3.startOCR(type, onSuccess, onFailure, onInProgressChange, serverOCRPreprocessor);
        } else {
          void 0;
        }
      } finally {
        // await this.stopOCR();
      }
    })();
  }
  stopOCR() {
    var _this4 = this;
    return _asyncToGenerator(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve) {
          yield _this4.cleanup();
          _this4.__closeCamera();
          _this4.__onSuccess = null;
          _this4.__onFailure = null;
          resolve();
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }
  setIgnoreComplete(val) {
    this.__OCREngine.setIgnoreComplete(val);
  }

  // 미사용 : wasm 레벨에서 암호화하여 불필요 해짐
  // encrypt(plainStr) {
  //   return this.__encryptScanResult(plainStr);
  // }

  restartOCR(ocrType, onSuccess, onFailure, onInProgressChange, serverOCRPreprocessor) {
    var _arguments2 = arguments,
      _this5 = this;
    return _asyncToGenerator(function* () {
      var isSwitchMode = _arguments2.length > 5 && _arguments2[5] !== undefined ? _arguments2[5] : false;
      if (!_this5.__camSetComplete) {
        void 0;
        return;
      }
      if (isSwitchMode) {
        yield _this5.stopOCR();
      } else {
        _this5.__closeCamera();
      }
      yield _this5.startOCR(ocrType, onSuccess, onFailure, onInProgressChange, serverOCRPreprocessor);
    })();
  }

  /** private methods */
  __waitPreloaded() {
    var _this6 = this;
    return _asyncToGenerator(function* () {
      var waitingRetryCount = 0;
      return new Promise((resolve, reject) => {
        var check = () => {
          var preloadingStatus = _this6.getPreloadingStatus();
          setTimeout( /*#__PURE__*/_asyncToGenerator(function* () {
            if (_this6.isPreloaded()) {
              resolve();
            } else if (!_this6.isPreloaded() && preloadingStatus === _this6.PRELOADING_STATUS.NOT_STARTED) {
              reject(new OCRError('[Network Error] Load to WASM Resource failed with timeout', 'SE001'));
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
    var convertTypeToInteger = function convertTypeToInteger(option, defaultValue) {
      return isNaN(parseInt(option)) ? defaultValue : parseInt(option);
    };
    var convertTypeToFloat = function convertTypeToFloat(option, defaultValue) {
      return isNaN(parseFloat(option)) ? defaultValue : parseFloat(option);
    };
    var convertTypeToBoolean = function convertTypeToBoolean(option, defaultValue) {
      if (typeof option === 'string') {
        return option === 'true' ? true : defaultValue;
      } else {
        return option;
      }
    };
    var getOptionKeyListByType = (targetObj, targetType) => {
      if (targetType === 'boolean') {
        return Object.keys(targetObj).filter(value => {
          return typeof targetObj[value] === targetType;
        });
      } else if (targetType === 'integer') {
        return Object.keys(targetObj).filter(value => {
          return typeof targetObj[value] === 'number' && Number.isInteger(targetObj[value]);
        });
      } else if (targetType === 'float') {
        return Object.keys(targetObj).filter(value => {
          return typeof targetObj[value] === 'number' && !Number.isInteger(targetObj[value]);
        });
      } else {
        return [];
      }
    };

    // boolean type list 가져오기
    var booleanTypeOptions = getOptionKeyListByType(OPTION_TEMPLATE, 'boolean');
    void 0;

    // number type list 가져오기
    var integerTypeOptions = getOptionKeyListByType(OPTION_TEMPLATE, 'integer');
    void 0;

    // float type list 가져오기
    var floatTypeOptions = getOptionKeyListByType(OPTION_TEMPLATE, 'float');
    void 0;

    // boolean type 인 옵션에 string 값이 들어간 경우 boolean 변환 처리
    booleanTypeOptions.forEach(key => {
      this.__options[key] = convertTypeToBoolean(this.__options[key], OPTION_TEMPLATE[key]);
    });

    // integer type 인 옵션에 string 값이 들어간 경우 integer 변환 처리
    integerTypeOptions.forEach(key => {
      this.__options[key] = convertTypeToInteger(this.__options[key], OPTION_TEMPLATE[key]);
    });

    // float type 인 옵션에 string 값이 들어간 경우 float 변환 처리
    floatTypeOptions.forEach(key => {
      this.__options[key] = convertTypeToFloat(this.__options[key], OPTION_TEMPLATE[key]);
    });
    if (this.isEncryptMode() && this.__options.ssaMaxRetryCount > 0) {
      this.__options.ssaMaxRetryCount = 0;
      void 0;
    }
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
      var _ref3 = _asyncToGenerator(function* () {
        if (!!!_this_.__ocrType) return;
        if (!_this_.__isInProgressHandleResize) {
          _this_.__isInProgressHandleResize = true;
          _this_.__throttlingResizeTimer = null;
          void 0;
          _this_.__isInProgressHandleResize = false;
          yield _this_.restartOCR(_this_.__ocrType, _this_.__onSuccess, _this_.__onFailure, _this_.__onInProgressChange, _this_.__serverOCRPreprocessor);
        } else {
          void 0;
        }
      });
      return function handleResize() {
        return _ref3.apply(this, arguments);
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
  __removeMimeType(base64) {
    var mimeType = /data:image\/(?:jpe?g|png|gif|);base64,/i;
    var result = mimeType.exec(base64);
    return result ? base64.slice(result.index + result[0].length) : base64;
  }
  __compressBase64Image(base64, options, constantNumber) {
    var _this7 = this;
    return _asyncToGenerator(function* () {
      if (base64 === null) return null;
      var blobFile = _this7.__base64toBlob(base64);
      var compressed = yield ImageUtil.compressImage(blobFile, options, constantNumber);
      var compressionRatio = Math.round((1 - compressed.size / blobFile.size) * 10000) / 100;
      void 0;
      return yield _this7.__blobToBase64(compressed);
    })();
  }

  /** 라이센스 키를 heap 에 allocation */
  __getStringOnWasmHeap() {
    if (!!!this.__license) {
      throw new OCRError('License Key is empty', 'WA001');
    }
    var lengthBytes = this.__OCREngine.lengthBytesUTF8(this.__license) + 1;
    this.__stringOnWasmHeap = this.__OCREngine._malloc(lengthBytes);
    this.__OCREngine.stringToUTF8(this.__license, this.__stringOnWasmHeap, lengthBytes);
    return this.__stringOnWasmHeap;
  }

  // 미사용 : wasm 레벨에서 암호화하여 불필요 해짐
  // __encryptScanResult(ocrResult) {
  //   let stringOnWasmHeap = null;
  //   try {
  //     if (typeof ocrResult === 'number' || typeof ocrResult === 'boolean') ocrResult = ocrResult.toString();
  //     if (ocrResult === '') return '';
  //     if (typeof ocrResult !== 'string' && !!!ocrResult) {
  //       throw new Error('ocrResult is empty');
  //     }
  //     const jsonString = ocrResult;
  //     const lengthBytes = this.__OCREngine.lengthBytesUTF8(jsonString) + 1;
  //     stringOnWasmHeap = this.__OCREngine._malloc(lengthBytes);
  //     this.__OCREngine.stringToUTF8(jsonString, stringOnWasmHeap, lengthBytes);
  //
  //     return this.__OCREngine.encryptResult(stringOnWasmHeap);
  //   } finally {
  //     if (stringOnWasmHeap) {
  //       this.__OCREngine._free(stringOnWasmHeap);
  //       stringOnWasmHeap = null;
  //     }
  //   }
  // }

  __setVideoResolution(videoElement) {
    var _this8 = this;
    return _asyncToGenerator(function* () {
      var isSupportedResolution = false;
      var resolutionText = 'not ready';
      if (!_this8.__camSetComplete) {
        return {
          isSupportedResolution,
          resolutionText
        };
      }
      if (videoElement.videoWidth === 0 && videoElement.videoHeight === 0) {
        yield _this8.__changeStage(_this8.IN_PROGRESS.NOT_READY);
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
      } else if (videoElement.videoWidth === 1080 && videoElement.videoHeight === 1080 || videoElement.videoWidth === 720 && videoElement.videoHeight === 720) {
        isSupportedResolution = true;
      } else {
        videoElement.srcObject = null;
        isSupportedResolution = false;
      }
      _this8.__videoWidth = videoElement.videoWidth;
      _this8.__videoHeight = videoElement.videoHeight;
      return {
        isSupportedResolution,
        resolutionText
      };
    })();
  }
  __getScannerAddress(ocrType) {
    if (!this.__ocrTypeList.includes(ocrType)) throw new OCRError('Unsupported OCR type', 'WA003');
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
        case 'barcode':
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
        case 'veteran':
        case 'veteran-ssa':
          address = this.__OCREngine.getVeteransScanner(stringOnWasmHeap);
          destroyCallback = () => this.__OCREngine.destroyVeteransScanner(address);
          break;
        case 'credit':
          address = this.__OCREngine.getCreditScanner(stringOnWasmHeap);
          destroyCallback = () => this.__OCREngine.destroyCreditScanner(address);
          break;
        default:
          throw new OCRError('Scanner does not exists', 'WA002');
      }
      if (this.__options.ocr_config !== '') {
        this.__setOcrConfig(this.__options.ocr_config);
        void 0;
      }
      if (address === 0) {
        if (this.__maxRetryCountGetAddress === this.__retryCountGetAddress) {
          throw new OCRError('Wrong License Key', 'WA001');
        }
        this.__retryCountGetAddress++;
      }
      return [address, destroyCallback];
    } catch (e) {
      // TODO : License Issue인 경우 에러 값을 받아서 error 로그를 찍을 수 있게 요청필요 (임시 N번 이상 address를 못받으면 강제 에러)
      void 0;
      if (e.errorCode) {
        throw e;
      }
      throw new OCRError('Cannot find Scanner address : ' + e, 'WA004');
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
  __destroyEncryptedScanResult() {
    if (this.__OCREngine && this.isEncryptMode()) {
      this.__OCREngine.destroyEncryptedResult();
    }
  }
  __setValidation(validation) {
    this.__OCREngine.setNumberValidation(validation);
  }
  __setOcrConfig(config) {
    this.__OCREngine.setConfig(config);
  }
  __getOcrConfig() {
    return this.__OCREngine.getConfig();
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
    if (this.isEncryptMode()) {
      this.__options.rotationDegree = 0;
      void 0;
    }
    return (this.__options.rotationDegree % 360 + 360) % 360;
  }
  __getMirrorMode() {
    return this.__options.mirrorMode;
  }
  __isServerOcrMode() {
    return this.__isSwitchToServerMode;
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
      if (!video) {
        void 0;
        return [null, null, null];
      }

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
      var calcVideoWidth = video.videoWidth || 0;
      var calcVideoHeight = video.videoHeight || 0;
      var calcVideoClientWidth = video.clientWidth || 0;
      var calcVideoClientHeight = video.clientHeight || 0;
      if (calcVideoWidth === 0 || calcVideoHeight === 0) {
        void 0;
        return [null, null, null];
      }
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
      if (_this10.__options.useOriginImageSquareRatio) {
        sx = sy = 0;
        [sWidth, sHeight] = [Math.min(calcVideoWidth, calcResolution_w), Math.min(calcVideoHeight, calcResolution_h)];
      }
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
      var useDataURL = false;
      if (isAlienBack) {
        useDataURL = true;
      } else {
        if (_this10.isEncryptMode() && !_this10.__isServerOcrMode()) {
          void 0;
        } else {
          useDataURL = true;
        }
      }
      imgDataUrl = useDataURL ? calcCanvas.toDataURL('image/jpeg') : '';
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
  __cropFakeImageFromVideo() {
    var _this11 = this;
    return _asyncToGenerator(function* () {
      if (!_this11.__camSetComplete) return [null, null, null];
      var resolutionWidth = 1280;
      var resolutionHeight = 720;
      var [calcResolution_w, calcResolution_h] = [resolutionWidth, resolutionHeight];
      var {
        video,
        canvas,
        rotationCanvas
      } = detector.getOCRElements();
      if (!video) {
        void 0;
        return [null, null, null];
      }

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
      var calcVideoWidth = video.videoWidth || 0;
      var calcVideoHeight = video.videoHeight || 0;
      var calcVideoClientWidth = video.clientWidth || 0;
      var calcVideoClientHeight = video.clientHeight || 0;
      if (calcVideoWidth === 0 || calcVideoHeight === 0) {
        void 0;
        return [null, null, null];
      }
      var calcCropImageSizeWidth = _this11.__cropImageSizeWidth;
      var calcCropImageSizeHeight = _this11.__cropImageSizeHeight;
      var calcVideoOrientation = _this11.__videoOrientation;
      var isAlienBack = _this11.__ocrType === 'alien-back';
      if (_this11.__isRotated90or270) {
        [calcCropImageSizeWidth, calcCropImageSizeHeight] = [calcCropImageSizeHeight, calcCropImageSizeWidth];
        [calcResolution_w, calcResolution_h] = [calcResolution_h, calcResolution_w];
        calcCanvas = rotationCanvas;
        calcVideoOrientation = _this11.__videoOrientation === 'portrait' ? 'landscape' : 'portrait';
      }
      var calcMaxSWidth = 99999;
      var calcMaxSHeight = 99999;
      if (_this11.__uiOrientation === 'portrait') {
        if (calcVideoOrientation === _this11.__uiOrientation) {
          // 세로 UI / 세로 카메라
          calcMaxSWidth = calcVideoWidth;
          calcMaxSHeight = calcVideoHeight;
        } else {
          // 세로 UI / 가로 카메라
          calcMaxSHeight = calcVideoHeight;
        }
      } else {
        if (calcVideoOrientation === _this11.__uiOrientation) {
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
      if (_this11.__options.useOriginImageSquareRatio) {
        sx = sy = 0;
        [sWidth, sHeight] = [Math.min(calcVideoWidth, calcResolution_w), Math.min(calcVideoHeight, calcResolution_h)];
      }
      if (isAlienBack) {
        [calcResolution_w, calcResolution_h] = [calcResolution_h, calcResolution_w];
      }
      var shuffleCanvas = document.createElement('canvas');
      var shuffleContext = shuffleCanvas.getContext('2d');
      shuffleCanvas.setAttribute('width', calcResolution_w);
      shuffleCanvas.setAttribute('height', calcResolution_h);
      shuffleContext.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, calcResolution_w, calcResolution_h);
      var imageData = shuffleContext.getImageData(0, 0, calcResolution_w, calcResolution_h);
      var data = imageData.data;
      calcCanvas.setAttribute('width', calcResolution_h);
      calcCanvas.setAttribute('height', calcResolution_w);
      var calcContext = calcCanvas.getContext('2d');
      var newImageData = calcContext.getImageData(0, 0, calcResolution_h, calcResolution_w);
      var newData = newImageData.data;
      for (var i = 0; i < newData.length; i += 4) {
        newData[i] = data[i]; // R
        newData[i + 1] = data[i + 1]; // G
        newData[i + 2] = data[i + 2]; // B
        newData[i + 3] = data[i + 3]; // A
      }

      calcContext.putImageData(newImageData, 0, 0);
      var imgData = newData;
      var imgDataUrl = calcCanvas.toDataURL('image/png');
      if (isAlienBack) {
        yield _this11.__rotate(imgData, imgDataUrl, 270), _readOnlyError("imgData");
      }
      if (_this11.__isRotated90or270) {
        return yield _this11.__rotate(imgData, imgDataUrl, _this11.__getRotationDegree());
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
    var _arguments3 = arguments,
      _this12 = this;
    return _asyncToGenerator(function* () {
      var boxType = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : 0;
      var retryImg = _arguments3.length > 2 && _arguments3[2] !== undefined ? _arguments3[2] : null;
      if (!address || address < 0) {
        return [false, null];
      }
      try {
        var imgData;
        var imgDataUrl = null;
        var [buffer] = _this12.__getBuffer();
        if (retryImg !== null) {
          imgData = retryImg;
        } else {
          [imgData, imgDataUrl] = yield _this12.__cropImageFromVideo();
        }
        if (!!!imgData) {
          return [false, null];
        }
        _this12.__OCREngine.HEAP8.set(imgData.data, buffer);
        var kor = false,
          alien = false,
          passport = false,
          barcode = false;
        switch (_this12.__ocrType) {
          case 'idcard':
          case 'driver':
          case 'idcard-ssa':
          case 'driver-ssa':
          case 'veteran':
          case 'veteran-ssa':
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
          case 'barcode':
            barcode = true;
            break;
          default:
            throw new OCRError('Unsupported OCR type', 'WA003');
        }
        var result = null;
        if (kor || passport || alien) {
          result = _this12.__OCREngine.detect_idcard_opt(buffer, _this12.__resolutionWidth, _this12.__resolutionHeight, address, kor, alien, passport);
        } else if (barcode) {
          result = _this12.__OCREngine.detect_barcode(buffer, _this12.__resolutionWidth, _this12.__resolutionHeight, address);
        } else {
          result = _this12.__OCREngine.detect_idcard(buffer, _this12.__resolutionWidth, _this12.__resolutionHeight, address, boxType);
        }

        // console.log('isCardboxDetected result -=-----', result)
        return [!!result, imgData, imgDataUrl];
      } catch (e) {
        var message = 'Card detection error : ' + e;
        if (e.toString().includes('memory')) {
          void 0;
        } else {
          void 0;
          if (e.errorCode) {
            throw e;
          }
          throw new OCRError(message, '');
        }
      }
    })();
  }
  __startRecognition(address, ocrType, ssaMode, isSetIgnoreComplete, imgData, imgDataUrl) {
    var _this13 = this;
    return _asyncToGenerator(function* () {
      try {
        if (address === null) {
          return '';
        } else if (address === -1) {
          return 'checkValidation Fail';
        }
        var rawData = null;
        var ocrResult = null;
        if (!_this13.__ocrTypeList.includes(ocrType)) throw new OCRError('Unsupported OCR type', 'WA003');
        var recognition = /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator(function* (isSetIgnoreComplete) {
            var _ocrResult, _ocrResult$ocr_result, _ocrResult2, _ocrResult2$ocr_resul;
            if (isSetIgnoreComplete) {
              yield _this13.__isCardboxDetected(address, 0, imgData);
            }
            switch (ocrType) {
              case 'idcard':
              case 'driver':
              case 'idcard-ssa':
              case 'driver-ssa':
                rawData = _this13.__OCREngine.scanIDCard(address, 0);
                break;
              case 'passport':
              case 'foreign-passport':
              case 'passport-ssa':
              case 'foreign-passport-ssa':
                rawData = _this13.__OCREngine.scanPassport(address, 0);
                break;
              case 'alien':
              case 'alien-ssa':
                rawData = _this13.__OCREngine.scanAlien(address, 0);
                break;
              case 'alien-back':
                rawData = _this13.__OCREngine.scanAlienBack(address, 0);
                break;
              case 'credit':
                rawData = _this13.__OCREngine.scanCredit(address, 0);
                break;
              case 'veteran':
              case 'veteran-ssa':
                rawData = _this13.__OCREngine.scanVeterans(address, 0);
                break;
              case 'barcode':
                rawData = _this13.__OCREngine.scanBarcode(address, 0);
                break;
              default:
                throw new OCRError('Scanner does not exists', 'WA002');
            }

            // TODO: 신용카드는 아직 key:value 형태로 변환 안되어 있음
            if (_this13.isCreditCard()) {
              if (rawData === null || rawData === '' || rawData === 'false' || rawData[0] === 'false') {
                return false;
              } else {
                var {
                  originImage
                } = yield _this13.__getResultImages(ocrType, address);
                ocrResult = {
                  ocr_result: rawData,
                  ocr_origin_image: originImage
                };
                return true;
              }
            } else if (_this13.isBarcode()) {
              if (rawData !== 'complete:false') {
                rawData = _this13.__stringToJson(rawData);
                ocrResult = {
                  ocr_result: rawData
                };
              }
            } else {
              if (rawData !== 'complete:false') {
                rawData = _this13.__stringToJson(rawData);

                // Pii encrypt 일때만 포멧이 다름
                if (_this13.isEncryptMode() && _this13.__options.useEncryptMode) {
                  ocrResult = {
                    ocr_result: rawData,
                    ocr_origin_image: rawData.ocr_origin_image,
                    ocr_masking_image: rawData.ocr_masking_image,
                    ocr_face_image: rawData.ocr_face_image
                  };
                  delete ocrResult.ocr_result.ocr_origin_image;
                  delete ocrResult.ocr_result.ocr_masking_image;
                  delete ocrResult.ocr_result.ocr_face_image;
                } else {
                  var ocrResultTmp = _objectSpread(_objectSpread({}, rawData.ocr_result), rawData);
                  delete ocrResultTmp.ocr_result;
                  ocrResult = {
                    ocr_result: ocrResultTmp,
                    ocr_origin_image: _this13.__ocrImageGuard(ocrResultTmp.ocr_origin_image),
                    ocr_masking_image: _this13.__ocrImageGuard(ocrResultTmp.ocr_masking_image),
                    ocr_face_image: _this13.__ocrImageGuard(ocrResultTmp.ocr_face_image)
                  };
                  delete ocrResult.ocr_result.ocr_origin_image;
                  delete ocrResult.ocr_result.ocr_masking_image;
                  delete ocrResult.ocr_result.ocr_face_image;

                  // valueEncryptMode 일때 포멧 맞춰주기
                  if (_this13.isEncryptMode() && _this13.__options.useEncryptValueMode) {
                    var encryptedOcrResult = _objectSpread({}, ocrResult.ocr_result.encrypted);
                    var encrypted = {
                      ocr_result: encryptedOcrResult,
                      ocr_origin_image: encryptedOcrResult.ocr_origin_image,
                      ocr_masking_image: encryptedOcrResult.ocr_masking_image,
                      ocr_face_image: encryptedOcrResult.ocr_face_image
                    };
                    delete encrypted.ocr_result.ocr_origin_image;
                    delete encrypted.ocr_result.ocr_masking_image;
                    delete encrypted.ocr_result.ocr_face_image;
                    ocrResult.encrypted = encrypted;
                    delete ocrResult.ocr_result.encrypted;
                  } else if (_this13.isEncryptMode() && _this13.__options.useEncryptOverallMode) {
                    ocrResult.encrypted_overall = ocrResult.ocr_result.encrypted_overall;
                    delete ocrResult.ocr_result.encrypted_overall;
                  }
                }

                // overall 인 경우만 timestamp 처리 /
                if (_this13.isEncryptMode() && _this13.__options.useEncryptOverallMode) {
                  ocrResult.timestamp = ocrResult.ocr_result.timestamp;
                  delete ocrResult.ocr_result.timestamp;
                } else {
                  delete ocrResult.ocr_result.timestamp;
                }
              }
            }
            if (((_ocrResult = ocrResult) === null || _ocrResult === void 0 ? void 0 : (_ocrResult$ocr_result = _ocrResult.ocr_result) === null || _ocrResult$ocr_result === void 0 ? void 0 : _ocrResult$ocr_result.complete) !== 'undefined' && ((_ocrResult2 = ocrResult) === null || _ocrResult2 === void 0 ? void 0 : (_ocrResult2$ocr_resul = _ocrResult2.ocr_result) === null || _ocrResult2$ocr_resul === void 0 ? void 0 : _ocrResult2$ocr_resul.complete) === 'true') {
              return true;
            } else {
              if (!isSetIgnoreComplete) return false;
              if (_this13.__manualOCRRetryCount < _this13.__manualOCRMaxRetryCount) {
                // detectedCardQueue에서 한장을 꺼내서 갱신한다.
                // 저장되어있는 이미지의 숫자가 retry 보다 작은경우 대비하여 %를 사용함
                var queueIdx = _this13.__manualOCRRetryCount % _this13.__detectedCardQueue.length;
                imgData = _this13.__detectedCardQueue[queueIdx];
                _this13.__manualOCRRetryCount++;
                return yield recognition(isSetIgnoreComplete);
              } else {
                // 사진 한장으로 OCR 실패 (popup 내리고 setIgnoreComplete(false) 처리?
                _this13.__manualOCRRetryCount = 0;
                _this13.setIgnoreComplete(false);
                _this13.__blurCaptureButton(); // 팝업이 내려갈때 처리되지만 미리 처리
                yield _this13.__changeStage(_this13.IN_PROGRESS.MANUAL_CAPTURE_FAILED, false, imgDataUrl);
                _this13.__setStyle(detector.getOCRElements().video, {
                  display: ''
                });
                return false;
              }
            }
          });
          return function recognition(_x2) {
            return _ref6.apply(this, arguments);
          };
        }();
        // end of function recognition()

        if (yield recognition(isSetIgnoreComplete)) {
          if (ssaMode) {
            yield _this13.__changeStage(_this13.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA, false, ocrResult.ocr_masking_image);
          } else {
            yield _this13.__changeStage(_this13.IN_PROGRESS.OCR_RECOGNIZED);
          }
          return ocrResult;
        } else {
          return false;
        }
      } catch (e) {
        void 0;
        if (e.errorCode) {
          throw e;
        }
        throw new OCRError('Recognition error : ' + e, 'WA006');
      }
    })();
  }
  __getResultImages(ocrType, address) {
    var _this14 = this;
    return _asyncToGenerator(function* () {
      var originImageMode;
      if (_this14.isCreditCard()) {
        originImageMode = _this14.OCR_IMG_MODE.CROPPING;
      } else if (_this14.__options.useImageCropping) {
        originImageMode = _this14.OCR_IMG_MODE.CROPPING;
      } else if (_this14.__options.useImageWarping) {
        originImageMode = _this14.OCR_IMG_MODE.WARPING;
      } else {
        originImageMode = _this14.OCR_IMG_MODE.NONE;
      }
      var originImage;
      if (!_this14.isCreditCard() && _this14.isEncryptMode()) {
        originImage = _this14.__getPiiEncryptImageBase64(address, _this14.OCR_IMG_MASK_MODE.FALSE, originImageMode);
        void 0;
      } else {
        originImage = yield _this14.__getImageBase64(address, _this14.OCR_IMG_MASK_MODE.FALSE, originImageMode);
      }
      var maskImageMode;
      var maskImage = null;
      var faceImage = null;
      if (!_this14.isCreditCard()) {
        if (_this14.__options.useImageCropping) {
          maskImageMode = _this14.OCR_IMG_MODE.CROPPING;
        } else {
          maskImageMode = _this14.OCR_IMG_MODE.WARPING;
        }
        if (_this14.isEncryptMode()) {
          maskImage = _this14.__getPiiEncryptImageBase64(address, _this14.OCR_IMG_MASK_MODE.TRUE, maskImageMode);
          faceImage = _this14.__options.useFaceImage ? _this14.__getPiiEncryptImageBase64(address, null, originImageMode, 'face') : null;
        } else {
          maskImage = yield _this14.__getImageBase64(address, _this14.OCR_IMG_MASK_MODE.TRUE, maskImageMode);
          maskImage = maskImage === 'data:' ? null : maskImage;
          faceImage = _this14.__options.useFaceImage ? yield _this14.__getImageBase64(address, null, originImageMode, 'face') : null;
        }
      }
      return {
        originImage,
        maskImage,
        faceImage
      };
    })();
  }
  __startTruth(ocrType, address) {
    return new Promise((resolve, reject) => {
      var [, resultBuffer] = this.__getBuffer();
      if (ocrType.indexOf('-ssa') > -1) {
        // TODO: worker를 사용하여 메인(UI 랜더링) 스레드가 멈추지 않도록 처리 필요 (현재 loading UI 띄우면 애니메이션 멈춤)
        // TODO: setTimeout 으로 나누더라도 효과 없음 setTimeout 지우고, worker로 변경 필요
        setTimeout(() => {
          var ssaResult = this.__OCREngine.scanTruth(address, resultBuffer);
          resolve(ssaResult);
        }, 500);
        // const ssaResult = this.__OCREngine.scanTruth(address, resultBuffer);
        // console.log('__startTruth', { ssaResult });
        // resolve(ssaResult);
      } else {
        reject(new OCRError("SSA Mode is true. but, ocrType is invalid : ".concat(ocrType), 'SE001'));
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
  __stringToJson(str) {
    var obj = {};
    var keyValuePairs = str.match(/\w+:(?:\([^)]*\)|[^;]*)/g);
    if (keyValuePairs) {
      for (var i = 0; i < keyValuePairs.length; i++) {
        var pair = keyValuePairs[i].split(':');
        var key = pair[0].trim();
        var value = pair.slice(1).join(':').trim();
        if (value.startsWith('(') && value.endsWith(')')) {
          var subStr = value.substring(1, value.length - 1); // 서브 문자열 추출
          var subObj = this.__stringToJson(subStr); // 재귀적으로 서브 오브젝트 변환
          obj[key] = subObj;
        } else {
          obj[key] = value;
        }
      }
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
    var _this15 = this;
    return _asyncToGenerator(function* () {
      yield _this15.__isCardboxDetected(address, 0, imgData);
      // await this.__startRecognition(address, ocrType, true);      // for 성능을 위해 진행 X
      return yield _this15.__startTruth(ocrType, address);
    })();
  }
  __setCameraPermissionTimeoutTimer() {
    var _this16 = this;
    this.__clearCameraPermissionTimeoutTimer();
    this.__cameraPermissionTimeoutTimer = setTimeout( /*#__PURE__*/_asyncToGenerator(function* () {
      // 1초 delay 후 실행
      yield _this16.__proceedCameraPermission();
    }), this.__options.cameraResourceRequestRetryInterval);
  }
  __proceedCameraPermission() {
    var _this17 = this;
    return _asyncToGenerator(function* () {
      try {
        _this17.__clearCameraPermissionTimeoutTimer();

        // useRequestCameraBeforeModuleLoad 기능 사용 시 카메라 요청에서 stage 변경
        if (_this17.__options.useRequestCameraBeforeModuleLoad) {
          yield _this17.__changeStage(_this17.IN_PROGRESS.NOT_READY);
        }
        var isPassport = _this17.__ocrType.includes('passport');
        yield _this17.__setupVideo(isPassport);
        var {
          video
        } = detector.getOCRElements();
        if (video) {
          // const [track] = this.__stream.getVideoTracks();
          // const capability = track.getCapabilities();
          // console.debug('CardScan__initialize capability', capability);
          if ('srcObject' in video) {
            video.srcObject = _this17.__stream;
          } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = window.URL.createObjectURL(_this17.__stream);
          }
          video.addEventListener('loadedmetadata', () => {
            // console.debug('proceedCameraPermission - onloadedmetadata');
            video.play();
          });
          video.addEventListener('canplay', /*#__PURE__*/_asyncToGenerator(function* () {
            void 0;

            // video element style 설정
            _this17.__videoOrientation = video.videoWidth / video.videoHeight < 1 ? 'portrait' : 'landscape';
            void 0;
            void 0;
            void 0;
            _this17.__camSetComplete = true;
            yield _this17.__changeStage(_this17.IN_PROGRESS.READY);
            yield _this17.__adjustStyle();
          }));
          _this17.exitFullscreen(video);
        } else {
          yield _this17.__changeStage(_this17.IN_PROGRESS.NOT_READY);
          _this17.__closeCamera();
        }
      } catch (e) {
        void 0;
        if (e.name === 'NotAllowedError') {
          var errorMessage = 'Camera Access Permission is not allowed';
          void 0;
          void 0;
          _this17.__onFailureProcess('E403', e, errorMessage);
        } else if (e.name === 'NotReadableError') {
          // 다른곳에서 카메라 자원을 사용중
          yield _this17.__changeStage(_this17.IN_PROGRESS.NOT_READY);
          _this17.stopStream();
          if (_this17.__options.cameraResourceRequestRetryLimit < 0) {
            // 카메라 리소스 재요청 횟수제한 없음
            _this17.__cameraResourceRetryCount += 1;
            _this17.__setCameraPermissionTimeoutTimer(); // 재귀 호출
          } else {
            if (_this17.__options.cameraResourceRequestRetryLimit > _this17.__cameraResourceRetryCount) {
              _this17.__cameraResourceRetryCount += 1;
              _this17.__setCameraPermissionTimeoutTimer(); // 재귀 호출
            } else {
              var _errorMessage = 'Camera permissions were granted, but Failed to acquire Camera resources.';
              _this17.__onFailureProcess('E403', e, _errorMessage);
            }
          }
        } else if (e.name === 'NotFoundError') {
          // 기기에 연결된 카메라가 없음
          var _errorMessage2 = 'Camera Not Found';
          void 0;
          void 0;
          _this17.__onFailureProcess('E404', e, _errorMessage2);
        } else if (e.name === 'OverconstrainedError') {
          var _errorMessage3 = "Camera resolution over: ".concat(e.constraint);
          void 0;
          void 0;
          _this17.__onFailureProcess('E400', e, _errorMessage3);
        } else if (e.name === 'UnsupportedError') {
          // navigator.mediaDevices WebAPI가 없음
          var _errorMessage4 = e.message;
          void 0;
          void 0;
          _this17.__onFailureProcess('E400', e, _errorMessage4);
        } else {
          var _errorMessage5 = 'Unknown Error Occured';
          void 0;
          void 0;
          _this17.__onFailureProcess('E999', e, _errorMessage5);
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
    var _arguments4 = arguments,
      _this18 = this;
    return _asyncToGenerator(function* () {
      var forceUpdate = _arguments4.length > 1 && _arguments4[1] !== undefined ? _arguments4[1] : false;
      var recognizedImage = _arguments4.length > 2 && _arguments4[2] !== undefined ? _arguments4[2] : null;
      if (_this18.__previousInProgressStep === val && forceUpdate === false) {
        return;
      }
      _this18.__changeOCRStatus(val);
      _this18.__previousInProgressStep = val;
      _this18.__inProgressStep = val;
      var {
        guideBox,
        maskBoxWrap,
        captureButton
      } = detector.getOCRElements();
      var style = {
        borderWidth: _this18.__options.frameBorderStyle.width + 'px',
        borderStyle: _this18.__options.frameBorderStyle.style,
        borderRadius: _this18.__options.frameBorderStyle.radius + 'px',
        borderColor: _this18.__options.frameBorderStyle[val]
      };
      if (guideBox) {
        _this18.__setStyle(guideBox, style);
      }
      if (_this18.__options.useMaskFrameColorChange) {
        if (!!_this18.__options.showClipFrame) {
          void 0;
        } else {
          var _maskBoxWrap$querySel;
          maskBoxWrap === null || maskBoxWrap === void 0 ? void 0 : (_maskBoxWrap$querySel = maskBoxWrap.querySelector('#maskBoxOuter')) === null || _maskBoxWrap$querySel === void 0 ? void 0 : _maskBoxWrap$querySel.setAttribute('fill', _this18.__options.maskFrameStyle[val]);
        }
      }
      if (_this18.__options.useCaptureUI) {
        var _captureButton$queryS;
        captureButton === null || captureButton === void 0 ? void 0 : (_captureButton$queryS = captureButton.querySelector('#captureButton')) === null || _captureButton$queryS === void 0 ? void 0 : _captureButton$queryS.setAttribute('fill', _this18.__options.captureButtonStyle['base_color']);
      }
      var ocrMode = _this18.__isSwitchToServerMode ? 'server' : 'wasm';
      if (_this18.__onInProgressChange) {
        if (_this18.__options.useTopUI || _this18.__options.useTopUITextMsg) {
          _this18.__onInProgressChange.call(_this18, ocrMode, _this18.__ocrType, _this18.__inProgressStep, _this18.__topUI, 'top', _this18.__options.useTopUITextMsg, _this18.__options.useCaptureUI, _this18.__options.usePreviewUI, recognizedImage);
        }
        if (_this18.__options.useMiddleUI || _this18.__options.useMiddleUITextMsg) {
          _this18.__onInProgressChange.call(_this18, ocrMode, _this18.__ocrType, _this18.__inProgressStep, _this18.__middleUI, 'middle', _this18.__options.useMiddleUITextMsg, _this18.__options.useCaptureUI, _this18.__options.usePreviewUI, recognizedImage);
        }
        if (_this18.__options.useBottomUI || _this18.__options.useBottomUITextMsg) {
          _this18.__onInProgressChange.call(_this18, ocrMode, _this18.__ocrType, _this18.__inProgressStep, _this18.__bottomUI, 'bottom', _this18.__options.useBottomUITextMsg, _this18.__options.useCaptureUI, _this18.__options.usePreviewUI, recognizedImage);
        }
      }
      if (val === _this18.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS || val === _this18.IN_PROGRESS.MANUAL_CAPTURE_FAILED) {
        if (_this18.__options.usePreviewUI) {
          _this18.__updatePreviewUI(recognizedImage);

          // FAIL인 경우 5초후 자동을 창닫음
          if (val === _this18.IN_PROGRESS.MANUAL_CAPTURE_FAILED) {
            setTimeout(_this18.__hidePreviewUI, 3000, _this18);
          }
        }
      }
      if (val === _this18.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA) {
        var {
          video
        } = detector.getOCRElements();
        _this18.__setStyle(video, {
          display: 'none'
        });
        if (_this18.__options.usePreviewUI) {
          _this18.__updatePreviewUI(recognizedImage);
        }
      }
      if (val === _this18.IN_PROGRESS.OCR_SUCCESS_WITH_SSA) {
        if (_this18.__options.usePreviewUI) {
          _this18.__hidePreviewUI();
        }
      }
      yield _this18.__sleep(1); // for UI update
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
  __setResolution(_ref9) {
    var {
      width,
      height
    } = _ref9;
    this.__resolutionWidth = width;
    this.__resolutionHeight = height;
  }
  __getInputDevices() {
    var _this19 = this;
    return _asyncToGenerator(function* () {
      // throw error if navigator.mediaDevices is not supported
      if (!navigator.mediaDevices) {
        var error = new Error('navigator.mediaDevices is not supported');
        error.name = 'UnsupportedError';
        throw new OCRError(error, 'E400');
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
                if (cap !== null && cap !== void 0 && (_cap$facingMode = cap.facingMode) !== null && _cap$facingMode !== void 0 && _cap$facingMode.includes(_this19.__facingModeConstraint)) {
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
      _this19.__debug("camera = ".concat(camera, ", camera.length = ").concat(camera.length));
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
    var _this20 = this;
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
      if (!ocr) throw new OCRError('ocr div element is not exist', 'WA007');
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
      if (topUI && !_this20.__options.useTopUI) _this20.__clearCustomUI(topUI);
      if (middleUI && !_this20.__options.useMiddleUI) _this20.__clearCustomUI(middleUI);
      if (bottomUI && !_this20.__options.useBottomUI) _this20.__clearCustomUI(bottomUI);
      if (captureUIWrap) captureUIWrap.remove();
      // capture UI를 미사용일 경우 안의 내용을 삭제
      if (captureUI && !_this20.__options.useCaptureUI) _this20.__clearCustomUI(captureUI);
      if (previewUIWrap) previewUIWrap.remove();
      // preview UI를 미사용일 경우 안의 내용을 삭제
      if (previewUI && !_this20.__options.usePreviewUI) _this20.__clearCustomUI(previewUI);
      if (switchUIWrap) switchUIWrap.remove();
      // switch UI를 미사용일 경우 안의 내용을 삭제
      if (switchUI && !_this20.__options.useManualSwitchToServerMode) _this20.__clearCustomUI(switchUI);
      if (preloadingUIWrap) preloadingUIWrap.remove();
      var rotationDegree = _this20.__getRotationDegree();
      _this20.__isRotated90or270 = [90, 270].includes(rotationDegree);
      var ocrStyle = {
        width: '100%',
        height: '100%'
      };
      _this20.__setStyle(ocr, ocrStyle);
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
        _this20.__setStyle(videoWrap, wrapStyle);
      }
      ocr.appendChild(videoWrap);
      maskBoxWrap = document.createElement('svg');
      maskBoxWrap.setAttribute('data-useb-ocr', 'maskBoxWrap');
      maskBoxWrap.setAttribute('fill', 'none');
      maskBoxWrap.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      _this20.__setStyle(maskBoxWrap, wrapStyle);
      var mask_frame = _this20.__options.maskFrameStyle.base_color + 'ff';
      if (!!_this20.__options.showClipFrame) {
        mask_frame = _this20.__options.maskFrameStyle.clip_frame + '55';
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
      if (_this20.__isRotated90or270) {
        if (_this20.__getMirrorMode()) {
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
        if (_this20.__getMirrorMode()) {
          videoStyle = _objectSpread(_objectSpread({}, videoStyle), {}, {
            '-webkit-transform': mirrorCss,
            '-moz-transform': mirrorCss,
            '-o-transform': mirrorCss,
            '-ms-transform': mirrorCss,
            transform: mirrorCss
          });
        }
      }
      _this20.__setStyle(video, videoStyle);
      videoWrap.appendChild(video);
      guideBoxWrap = document.createElement('div');
      guideBoxWrap.setAttribute('data-useb-ocr', 'guideBoxWrap');
      _this20.__setStyle(guideBoxWrap, wrapStyle);
      ocr.appendChild(guideBoxWrap);
      guideBox = document.createElement('svg');
      guideBox.setAttribute('data-useb-ocr', 'guideBox');
      guideBox.setAttribute('fill', 'none');
      guideBox.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      _this20.__setStyle(guideBox, {
        width: '100%',
        margin: '0 auto',
        position: 'absolute'
      });
      guideBoxWrap.appendChild(guideBox);
      canvas = document.createElement('canvas');
      canvas.setAttribute('data-useb-ocr', 'canvas');
      var canvasStyle = {
        display: _this20.__options.showCanvasPreview ? _this20.__isRotated90or270 ? 'none' : 'display' : 'none',
        width: '25%',
        position: 'absolute',
        left: '0px',
        top: '30px',
        border: 'green 2px solid'
      };
      _this20.__setStyle(canvas, canvasStyle);
      ocr.appendChild(canvas);
      rotationCanvas = document.createElement('canvas');
      rotationCanvas.setAttribute('data-useb-ocr', 'rotationCanvas');
      _this20.__setStyle(rotationCanvas, {
        display: _this20.__options.showCanvasPreview ? _this20.__isRotated90or270 ? 'display' : 'none' : 'none',
        height: '25%',
        position: 'absolute',
        right: '0px',
        top: '30px',
        border: 'blue 2px solid'
      });
      ocr.appendChild(rotationCanvas);
      preventToFreezeVideo = document.createElement('div');
      preventToFreezeVideo.setAttribute('data-useb-ocr', 'preventToFreezeVideo');
      _this20.__setStyle(preventToFreezeVideo, {
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
      _this20.__setStyle(customUIWrap, customUIWrapStyle);
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
      _this20.__setStyle(captureUIWrap, captureUIWrapStyle);
      ocr.appendChild(captureUIWrap);
      if (_this20.__options.useCaptureUI) {
        if (_this20.__isSwitchToServerMode || _this20.__options.useForceCompleteUI) {
          if (!captureUI) {
            captureUI = document.createElement('div');
            captureUI.setAttribute('data-useb-ocr', 'captureUI');
            _this20.__setStyle(captureUI, {
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
          var _this_ = _this20;
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
          captureButton.addEventListener('click', __onClickCaptureButton, {
            once: true
          });
        }
      }
      if (_this20.__options.usePreviewUI) {
        previewUIWrap = document.createElement('div');
        previewUIWrap.setAttribute('data-useb-ocr', 'previewUIWrap');
        var previewUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
          'flex-direction': 'column',
          display: 'none',
          'background-color': '#000000aa'
        });
        _this20.__setStyle(previewUIWrap, previewUIWrapStyle);
        ocr.appendChild(previewUIWrap);
        if (!previewUI) {
          previewUI = document.createElement('div');
          previewUI.setAttribute('data-useb-ocr', 'previewUI');
        }
        _this20.__setStyle(previewUI, _objectSpread(_objectSpread({}, wrapStyle), {}, {
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
      if (_this20.__options.useManualSwitchToServerMode) {
        switchUIWrap = document.createElement('div');
        switchUIWrap.setAttribute('data-useb-ocr', 'switchUIWrap');
        var switchUIWrapStyle = _objectSpread(_objectSpread({}, wrapStyle), {}, {
          'align-items': '',
          'justify-content': '',
          width: '',
          overflow: '',
          'flex-direction': 'column-reverse',
          'z-index': 1
        });
        _this20.__setStyle(switchUIWrap, switchUIWrapStyle);
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
        _this20.__setStyle(switchUI, {
          overflow: 'hidden'
        });
        switchUIWrap.appendChild(switchUI);
        var switchCheckbox = switchUI.getElementsByTagName('input')[0];
        var _this_2 = _this20;
        var __onClickSwitchUI = /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator(function* (event) {
            _this_2.__isSwitchToServerMode = event.target.checked;
            clearTimeout(this.__requestAnimationFrameId);
            yield _this_2.restartOCR(_this_2.__ocrType, _this_2.__onSuccess, _this_2.__onFailure, _this_2.__onInProgressChange, _this_2.__serverOCRPreprocessor, true);
          });
          return function __onClickSwitchUI(_x3) {
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
      _this20.__setStyle(preloadingUIWrap, preloadingUIWrapStyle);
      ocr.appendChild(preloadingUIWrap);
      if (!preloadingUI) {
        preloadingUI = document.createElement('div');
        preloadingUI.setAttribute('data-useb-ocr', 'preloadingUI');
        preloadingUI.setAttribute('class', 'text-info');
        preloadingUI.innerHTML = '' + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n' + '  <circle cx="84" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="0.5555555555555556s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>\n' + '    <animate attributeName="fill" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#86868600;#86868600;#86868600;#86868600;#86868600" begin="0s"></animate>\n' + '  </circle>' + '  <circle cx="16" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>\n' + '  </circle>' + '  <circle cx="50" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5555555555555556s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5555555555555556s"></animate>\n' + '  </circle>' + '  <circle cx="84" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.1111111111111112s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.1111111111111112s"></animate>\n' + '  </circle>' + '  <circle cx="16" cy="50" r="10" fill="#ffffffff">\n' + '    <animate attributeName="r" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.6666666666666665s"></animate>\n' + '    <animate attributeName="cx" repeatCount="indefinite" dur="2.2222222222222223s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.6666666666666665s"></animate>\n' + '  </circle>' + '</svg>';
        if (_this20.__options.preloadingUITextMsg === '' || _this20.__options.preloadingUITextMsg) {
          preloadingUI.innerHTML += _this20.__options.preloadingUITextMsg;
        }
      }
      _this20.__setStyle(preloadingUI, _objectSpread(_objectSpread({}, wrapStyle), {}, {
        'flex-direction': 'column'
      }));
      preloadingUIWrap.appendChild(preloadingUI);

      // loading UI 위치 자리잡게 하기 위해
      yield _this20.__initStyle();

      // 화면과도 현상 해결
      _this20.__setStyle(ocr, {
        display: ''
      });
      _this20.__ocr = ocr;
      _this20.__canvas = canvas;
      _this20.__rotationCanvas = rotationCanvas;
      _this20.__video = video;
      _this20.__videoWrap = videoWrap;
      _this20.__guideBox = guideBox;
      _this20.__guideBoxWrap = guideBoxWrap;
      _this20.__maskBoxWrap = maskBoxWrap;
      _this20.__preventToFreezeVideo = preventToFreezeVideo;
      _this20.__customUIWrap = customUIWrap;
      _this20.__topUI = topUI;
      _this20.__middleUI = middleUI;
      _this20.__bottomUI = bottomUI;
      _this20.__captureUIWrap = captureUIWrap;
      _this20.__captureUI = captureUI;
      _this20.__captureButton = captureButton;
      _this20.__previewUIWrap = previewUIWrap;
      _this20.__previewUI = previewUI;
      _this20.__previewImage = previewImage;
      _this20.__switchUIWrap = switchUIWrap;
      _this20.__switchUI = switchUI;
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
  exitFullscreen(video) {
    try {
      if (video.exitFullscreen) video.exitFullscreen();else if (video.webkitExitFullscreen) video.webkitExitFullscreen(); //chrome & safari
      else if (video.mozCancelFullScreen) video.mozCancelFullScreen(); // firefox
      else if (video.msExitFullscreen) video.msExitFullscreen(); // IE
      else if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); // default
      else if (document.fullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen(); // chrome & safari
      else if (document.fullscreenElement && document.msExitFullscreen) document.msExitFullscreen(); // IE
    } catch (e) {
      void 0;
    }
  }
  __setupVideo(isPassport) {
    var _this21 = this;
    return _asyncToGenerator(function* () {
      // wasm 인식성능 최적화된 해상도 (1080 x 720)
      // 원본이미지 정방형 비율 사용시 1080 x 1080
      var resolution = _this21.__options.useOriginImageSquareRatio ? {
        width: 1080,
        height: 1080
      } : {
        width: 1080,
        height: 720
      };
      _this21.__setResolution(resolution);
      _this21.__camSetComplete = false;
      var {
        video,
        canvas,
        rotationCanvas
      } = detector.getOCRElements();
      var camera = yield _this21.__getInputDevices();
      // console.log('videoDevices :: ', camera)

      _this21.checkUIOrientation();
      var constraintWidth, constraintHeight;
      if (_this21.__options.cameraResolutionCriteria === 'highQuality') {
        // 카메라 해상도 설정 : 화질 우선
        // 1920 x 1080이 가능한경우 사용 아니면 1280 x 720 사용
        constraintWidth = _this21.__options.useOriginImageSquareRatio ? {
          ideal: 1080,
          min: 720
        } : {
          ideal: 1920,
          min: 1280
        };
        constraintHeight = _this21.__options.useOriginImageSquareRatio ? {
          ideal: 1080,
          min: 720
        } : {
          ideal: 1080,
          min: 720
        };
      } else {
        // 'compatibility'
        // 카메라 해상도 설정 : 호환성 우선
        // 1920x1080이 사용 가능하더라도 1280 x 720을 사용하도록 고정
        // 사유 : 갤럭시 entry 모델(A시리즈 / Wide 모델 등)에서 1920 x 1080 처리시 비율이 이상해짐(홀쭉이됨)
        // 항상 1280 x 720을 사용하도록 변경
        // 원본이미지 정방형 비율 사용하면 720 x 720을 사용하도록 함
        constraintWidth = _this21.__options.useOriginImageSquareRatio ? {
          ideal: 1080
        } : {
          ideal: 1280
        };
        constraintHeight = _this21.__options.useOriginImageSquareRatio ? {
          ideal: 1080
        } : {
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
            ideal: _this21.__facingModeConstraint
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
        _this21.__debug('cannot to get camera devices. so, try to get camera devices again');
        _this21.__debug("constraints : ".concat(JSON.stringify(constraints)));
        _this21.__stream = yield navigator.mediaDevices.getUserMedia(constraints);
        _this21.stopStream();
        camera = yield _this21.__getInputDevices();
        constraints.video.deviceId = camera.length ? {
          ideal: camera[camera.length - 1]
        } : null;
      }

      // 갤럭시 wide 등 저사양 기기에서 FHD 해상도 카메라 사용시 홀쭉이되는 현상 방지
      // 저사양 기기 판단기준 : 후면카메라의 개수가 1개라는 가정
      if (camera.length <= 1) {
        _this21.__debug('maybe device is entry model such as galaxy wide');
        constraints.video.width = _this21.__options.useOriginImageSquareRatio ? {
          ideal: 720
        } : {
          ideal: 1280
        };
        constraints.video.height = _this21.__options.useOriginImageSquareRatio ? {
          ideal: 720
        } : {
          ideal: 720
        };
      }
      try {
        // const dumptrack = ([a, b], track) =>
        //   `${a}${track.kind == 'video' ? 'Camera' : 'Microphone'} (${track.readyState}): ${track.label}${b}`;

        var stream = yield navigator.mediaDevices.getUserMedia(constraints);
        _this21.__debug("constraints : ".concat(JSON.stringify(constraints)));
        // this.__debug('videoTracks :: ', stream.getVideoTracks());
        var streamSettings = stream.getVideoTracks()[0].getSettings();
        // this.__debug(
        //   'streamCapabilities :: ',
        //   stream.getVideoTracks()[0].getCapabilities()
        // );
        // this.__debug('stream :: ', stream.getVideoTracks()[0].getConstraints());
        // this.__debug('streamSettings :: ', streamSettings);
        _this21.__debug("stream width * height :: ".concat(streamSettings.width, " * ").concat(streamSettings.height));
        _this21.__debug('stream width / height :: ' + streamSettings.width / streamSettings.height);
        _this21.__debug('stream aspectRatio :: ' + streamSettings.aspectRatio);
        _this21.__debug('stream facingMode :: ' + streamSettings.facingMode);
        [canvas.width, canvas.height] = [_this21.__resolutionWidth, _this21.__resolutionHeight];
        if (_this21.__isRotated90or270) {
          [rotationCanvas.width, rotationCanvas.height] = [_this21.__resolutionHeight, _this21.__resolutionWidth];
        }
        video.srcObject = stream;
        _this21.__stream = stream;
      } catch (e) {
        void 0;
        throw e;
      }
    })();
  }
  __initStyle() {
    var _this22 = this;
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
      _this22.__setStyle(captureUI, {
        display: 'none'
      });
      _this22.checkUIOrientation();

      // 기준정보
      var baseWidth = 400;
      var baseHeight = 260;
      var scannerFrameRatio = baseHeight / baseWidth; // 신분증 비율

      var guideBoxWidth, guideBoxHeight;
      var calcOcrClientWidth = ocr.clientWidth;
      var calcOcrClientHeight = ocr.clientHeight;
      var borderWidth = _this22.__options.frameBorderStyle.width;
      var borderRadius = _this22.__options.frameBorderStyle.radius;
      var guideBoxRatioByWidth = _this22.__guideBoxRatioByWidth;
      var videoRatioByHeight = _this22.__videoRatioByHeight;
      if (_this22.__uiOrientation === 'portrait') {
        // 세로 UI && 세로 비디오로 간주
        // 가로 기준으로 가이드박스 계산
        guideBoxWidth = calcOcrClientWidth * guideBoxRatioByWidth;
        guideBoxHeight = guideBoxWidth * scannerFrameRatio;
      } else {
        // 가로 UI && 가로 비디오로 간주
        // 비디오를 가로 UI의 height 기준으로 줄이고
        // 가로 UI height 기준으로 비디오의 width 계산
        guideBoxHeight = calcOcrClientHeight * videoRatioByHeight;
        guideBoxWidth = guideBoxHeight / scannerFrameRatio;
      }
      var guideBoxWidthIncludeBorder = guideBoxWidth + borderWidth * 2;
      var guideBoxHeightIncludeBorder = guideBoxHeight + borderWidth * 2;
      var reducedGuideBoxWidth = guideBoxWidthIncludeBorder * _this22.__guideBoxReduceRatio;
      var reducedGuideBoxHeight = guideBoxHeightIncludeBorder * _this22.__guideBoxReduceRatio;
      if (topUI) {
        _this22.__setStyle(topUI, {
          'padding-bottom': '10px',
          height: (calcOcrClientHeight - guideBoxHeightIncludeBorder) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column-reverse'
        });
      }
      if (middleUI) {
        _this22.__setStyle(middleUI, {
          width: reducedGuideBoxWidth - borderWidth * 2 + 'px',
          height: reducedGuideBoxHeight - borderWidth * 2 + 'px',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '10px'
        });
      }
      if (bottomUI) {
        _this22.__setStyle(bottomUI, {
          'padding-top': '10px',
          height: (calcOcrClientHeight - guideBoxHeightIncludeBorder) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column'
        });
      }
      var videoInnerGap = 2; // 미세하게 maskBoxInner보다 guideBox가 작은것 보정
      _this22.__setStyle(guideBox, {
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
    var _this23 = this;
    return _asyncToGenerator(function* () {
      var __calcGuideBoxCriteria = (a, b) => {
        if (_this23.__options.calcGuideBoxCriteria === 'cameraResolution') {
          return Math.min(a, b);
        } else if (_this23.__options.calcGuideBoxCriteria === 'ocrViewSize') {
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
      _this23.__setStyle(captureUI, {
        display: 'none'
      });
      var isAlienBack = _this23.__ocrType === 'alien-back';

      // 기준정보
      var baseWidth = isAlienBack ? 260 : 400;
      var baseHeight = isAlienBack ? 400 : 260;
      var scannerFrameRatio = baseHeight / baseWidth; // 신분증 비율

      var guideBoxWidth, guideBoxHeight;
      var calcOcrClientWidth = ocr.clientWidth;
      var calcOcrClientHeight = ocr.clientHeight;
      var calcVideoWidth = video.videoWidth || 0;
      var calcVideoHeight = video.videoHeight || 0;
      var calcVideoClientWidth = video.clientWidth || 0;
      var calcVideoClientHeight = video.clientHeight || 0;
      var calcVideoOrientation = _this23.__videoOrientation;
      if (calcVideoWidth === 0 || calcVideoHeight === 0 || calcVideoClientWidth === 0 || calcVideoClientHeight === 0) {
        return;
      }
      var borderWidth = _this23.__options.frameBorderStyle.width;
      var borderRadius = _this23.__options.frameBorderStyle.radius;
      if (_this23.__isRotated90or270) {
        [calcVideoWidth, calcVideoHeight] = [calcVideoHeight, calcVideoWidth];
        [calcVideoClientWidth, calcVideoClientHeight] = [calcVideoClientHeight, calcVideoClientWidth];
        calcVideoOrientation = _this23.__videoOrientation === 'portrait' ? 'landscape' : 'portrait';
      }
      var newVideoWidth = calcVideoClientWidth;
      var newVideoHeight = calcVideoClientHeight;
      var guideBoxRatioByWidth = _this23.__guideBoxRatioByWidth; // 너비에 따른 가이드박스 비율, 1
      var videoRatioByHeight = _this23.__videoRatioByHeight; // 높이에 따른 비디오 비율, 0.9
      var newVideoRatioByWidth = calcVideoClientHeight / calcVideoClientWidth; // 비디오 UI 높이/너비
      var newVideoRatioByHeight = calcVideoClientWidth / calcVideoClientHeight; // 비디오 UI 너비/높이

      if (_this23.__uiOrientation === 'portrait') {
        // 세로 UI
        _this23.__setStyle(captureUIWrap, {
          'justify-content': 'center',
          'align-items': 'flex-end'
        });
        // video 가로 기준 100% 유지 (변경없음)
        if (calcVideoOrientation === _this23.__uiOrientation) {
          // 카메라도 세로
          // 세로 UI && 세로 비디오
          if (_this23.__options.useOriginImageSquareRatio) {
            // 신분증 원본이미지 정방형 옵션 사용 시
            // 비디오 너비를 기준으로 가이드박스 너비를 먼저 계산
            if (isAlienBack) {
              guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight);
              guideBoxWidth = guideBoxHeight / scannerFrameRatio;
            } else {
              guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth);
              guideBoxHeight = guideBoxWidth * scannerFrameRatio;
            }
          } else {
            // 기본 동작
            // 가로 기준으로 가이드박스 계산
            guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth;
            guideBoxHeight = guideBoxWidth * scannerFrameRatio;

            // 가이드 박스 가로 기준으로 비디오 확대
            newVideoWidth = guideBoxWidth;
            newVideoHeight = newVideoWidth * newVideoRatioByWidth;
          }
        } else {
          // 카메라는 가로
          // 세로 UI && 가로 비디오
          if (_this23.__options.useOriginImageSquareRatio) {
            // 신분증 원본이미지 정방형 옵션 사용 시
            // 비디오 높이를 기준으로 가이드박스 너비를 먼저 계산
            if (isAlienBack) {
              // 외국인등록증 뒷면은 가이드박스가 세로로 길어야 해서 높이/너비 계산순서를 바꿈
              guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth);
              guideBoxWidth = guideBoxHeight / scannerFrameRatio;
            } else {
              guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientWidth, calcVideoWidth);
              guideBoxHeight = guideBoxWidth * scannerFrameRatio;
            }
          } else {
            // 기본 동작
            // 가이드 박스를 비디오 세로 길이에 맞춤
            guideBoxHeight = __calcGuideBoxCriteria(calcVideoClientHeight, calcVideoHeight);
            guideBoxWidth = guideBoxHeight / scannerFrameRatio;
          }
        }
      } else {
        // 가로 UI
        _this23.__setStyle(captureUIWrap, {
          'justify-content': 'end',
          'align-items': 'center'
        });
        if (calcVideoOrientation === _this23.__uiOrientation) {
          // 가로 UI && 가로 비디오
          // 비디오를 가로 UI의 height 기준으로 줄이고
          // 가로 UI height 기준으로 비디오의 width 계산

          if (_this23.__options.useOriginImageSquareRatio) {
            // 신분증 원본이미지 정방형 옵션 사용 시
            // UI높이를 기준으로 가이드박스 너비를 먼저 계산
            if (isAlienBack) {
              guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight);
              guideBoxWidth = guideBoxHeight / scannerFrameRatio;

              // 비디오를 세로 기준으로 다시 맞춤
              newVideoWidth = guideBoxHeight;
              newVideoHeight = newVideoWidth * newVideoRatioByWidth;
            } else {
              guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight);
              guideBoxHeight = guideBoxWidth * scannerFrameRatio;

              // 비디오를 세로 기준으로 다시 맞춤
              newVideoWidth = guideBoxWidth;
              newVideoHeight = newVideoWidth * newVideoRatioByWidth;
            }
          } else {
            // 기본 동작
            // 가이드박스는 세로 기준으로 맞춤
            guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
            guideBoxWidth = guideBoxHeight / scannerFrameRatio;

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
          }
        } else {
          // 가로 UI && 세로 비디오
          // 가로 기준으로 가이드박스 계산
          if (_this23.__options.useOriginImageSquareRatio) {
            // 신분증 원본이미지 정방형 옵션 사용 시
            // UI높이를 기준으로 가이드박스 너비를 먼저 계산
            guideBoxWidth = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight);
            guideBoxHeight = guideBoxWidth * scannerFrameRatio;

            // 비디오를 세로 기준으로 다시 맞춤
            newVideoWidth = guideBoxWidth;
            newVideoHeight = newVideoWidth * newVideoRatioByWidth;
          } else {
            // 기본 동작
            // 가이드박스의 height 크기를 UI의 height 기준에 맞춤
            guideBoxHeight = __calcGuideBoxCriteria(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
            guideBoxWidth = guideBoxHeight / scannerFrameRatio;

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
      }

      // calcGuideBoxCriteria(카메라 해상도 설정 기준)가 ocrViewSize(화면 크기) 기준일때
      if (_this23.__options.calcGuideBoxCriteria === 'ocrViewSize') {
        // guideBoxHeight 이 calcOcrClientHeight 보다 큰경우(가이드박스가 화면을 넘어가는 경우) 다시 계산
        if (guideBoxHeight > calcOcrClientHeight) {
          if (_this23.__options.useOriginImageSquareRatio) {
            if (isAlienBack) {
              guideBoxHeight = Math.min(_this23.__uiOrientation === 'portrait' ? calcVideoClientHeight : calcOcrClientHeight, calcVideoHeight); // prettier-ignore
              guideBoxWidth = guideBoxHeight / scannerFrameRatio;
              newVideoWidth = guideBoxHeight;
              newVideoHeight = newVideoWidth * newVideoRatioByWidth;
            } else {
              guideBoxWidth = Math.min(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
              guideBoxHeight = guideBoxWidth * scannerFrameRatio;
              newVideoWidth = calcOcrClientHeight;
              newVideoHeight = newVideoWidth * newVideoRatioByWidth;
            }
          } else {
            guideBoxHeight = Math.min(calcOcrClientHeight, calcVideoHeight) * videoRatioByHeight;
            guideBoxWidth = guideBoxHeight / scannerFrameRatio;
            newVideoWidth = guideBoxWidth;
            newVideoHeight = newVideoWidth * newVideoRatioByWidth;
          }
        }

        // guideBoxWidth 이 calcOcrClientWidth 보다 큰경우(가이드박스가 화면을 넘어가는 경우) 다시 계산
        if (guideBoxWidth > calcOcrClientWidth) {
          guideBoxWidth = Math.min(calcOcrClientWidth, calcVideoWidth) * guideBoxRatioByWidth;
          guideBoxHeight = guideBoxWidth * scannerFrameRatio;
          newVideoWidth = guideBoxWidth;
          newVideoHeight = newVideoWidth * newVideoRatioByWidth;
        }
      }
      _this23.__cropImageSizeWidth = Math.min(guideBoxWidth, newVideoWidth);
      _this23.__cropImageSizeHeight = Math.min(guideBoxHeight, newVideoHeight);
      if (_this23.__isRotated90or270) {
        [newVideoWidth, newVideoHeight] = [newVideoHeight, newVideoWidth];
      }
      var guideBoxWidthIncludeBorder = guideBoxWidth + borderWidth * 2;
      var guideBoxHeightIncludeBorder = guideBoxHeight + borderWidth * 2;
      var reducedGuideBoxWidth = guideBoxWidthIncludeBorder * _this23.__guideBoxReduceRatio;
      var reducedGuideBoxHeight = guideBoxHeightIncludeBorder * _this23.__guideBoxReduceRatio;
      if (topUI) {
        _this23.__setStyle(topUI, {
          'padding-bottom': '10px',
          height: (calcOcrClientHeight - guideBoxHeightIncludeBorder) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column-reverse'
        });
      }
      if (middleUI) {
        _this23.__setStyle(middleUI, {
          width: reducedGuideBoxWidth - borderWidth * 2 + 'px',
          height: reducedGuideBoxHeight - borderWidth * 2 + 'px',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '10px'
        });
      }
      if (bottomUI) {
        _this23.__setStyle(bottomUI, {
          'padding-top': '10px',
          height: (calcOcrClientHeight - guideBoxHeightIncludeBorder) / 2 + 'px',
          display: 'flex',
          'flex-direction': 'column'
        });
      }
      _this23.__setStyle(video, {
        width: newVideoWidth + 'px'
      });
      _this23.__setStyle(video, {
        height: newVideoHeight + 'px'
      });
      var videoInnerGap = 2; // 미세하게 maskBoxInner보다 guideBox가 작은것 보정
      _this23.__setStyle(guideBox, {
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
      if (_this23.__options.useCaptureUI) {
        _this23.__setStyle(captureUI, {
          display: ''
        });
        if (_this23.__uiOrientation === 'portrait' && bottomUI && captureUI) {
          var calcSumOfHeightBottomUIChildNodes = _this23.__calcSumOfHeightChildNodes(bottomUI);
          var calcCaptureButtonHeight = captureButton.querySelector('svg').getAttribute('height');
          calcCaptureButtonHeight = calcCaptureButtonHeight === 0 ? 80 : calcCaptureButtonHeight;
          var captureUIPaddingBottom = bottomUI.clientHeight;
          captureUIPaddingBottom -= isNaN(parseInt(bottomUI.style.paddingTop)) ? 0 : parseInt(bottomUI.style.paddingTop);
          captureUIPaddingBottom -= calcSumOfHeightBottomUIChildNodes;
          captureUIPaddingBottom -= calcCaptureButtonHeight;
          var baseline = calcOcrClientHeight - (calcOcrClientHeight / 2 + guideBoxHeightIncludeBorder / 2);
          if (captureUIPaddingBottom > 0 && captureUIPaddingBottom < baseline) {
            _this23.__setStyle(captureUI, {
              'padding-right': '',
              'padding-bottom': captureUIPaddingBottom + 'px'
            });
          }
        } else {
          _this23.__setStyle(captureUI, {
            'padding-right': '10px',
            'padding-bottom': ''
          });
        }
      }
      yield _this23.__changeStage(_this23.__inProgressStep, true);
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
    var _this24 = this;
    return _asyncToGenerator(function* () {
      void 0;
      if (_this24.__resourcesLoaded) {
        void 0;
        return;
      }
      _this24.__isSupportSimd = yield simd();
      var envInfo = '';
      envInfo += "os : ".concat(_this24.__deviceInfo.os, "\n");
      envInfo += "osSimple : ".concat(_this24.__deviceInfo.osSimple, "\n");
      envInfo += "isSupportWasm: ".concat(_this24.__isSupportWasm, "\n");
      envInfo += "simd(wasm-feature-detect) : ".concat(_this24.__isSupportSimd, "\n");
      if (_this24.__deviceInfo.osSimple === 'IOS' || _this24.__deviceInfo.osSimple === 'MAC') {
        _this24.__isSupportSimd = false;
      }
      envInfo += "isSupportSimd(final) : ".concat(_this24.__isSupportSimd, "\n");
      envInfo += "UserAgent : ".concat(navigator.userAgent, "\n");
      void 0;
      _this24.__debug(envInfo);
      window.usebOCREnvInfo = envInfo;
      var sdkSupportEnv = 'quram';
      if (_this24.__isSupportSimd) {
        void 0;
        sdkSupportEnv += '_simd';
      } else {
        void 0;
      }
      void 0;
      window.usebOCREnvInfo = envInfo;
      void 0;
      var postfix = '';
      if (_this24.__options.force_wasm_reload) {
        // 옵션이 활성화 되면 새로운 WASM 리소스를 요청함.
        postfix = '?ver=' + _this24.__options.force_wasm_reload_flag;
      }
      var url = new URL(sdkSupportEnv + '.js' + postfix, _this24.__options.resourceBaseUrl);
      var src = yield fetch(url.href).then(res => res.text()).then(text => {
        var regex = /(.*) = Module.cwrap/gm;
        var source = text.replace(regex, 'Module.$1 = Module.cwrap');

        // data(model)
        source = source.replace(/^\(function\(\) \{/m, 'var createModelData = async function() {\n' + ' return new Promise(async function (resolve, reject) {\n');
        source = source.replace('   console.error("package error:", error);', '   reject();\n' + '   console.error("package error:", error);');
        source = source.replace('  }, handleError)', '  resolve();\n' + '  }, handleError)');
        source = source.replace(/^\}\)\(\);/m, '\n })\n' + '};');

        // wasm
        source = source.replace(sdkSupportEnv + '.wasm', new URL(sdkSupportEnv + '.wasm' + postfix, _this24.__options.resourceBaseUrl).href);
        source = source.replace(new RegExp("REMOTE_PACKAGE_BASE = ['\"]".concat(sdkSupportEnv, "\\.data[\"']"), 'gm'), "REMOTE_PACKAGE_BASE = \"".concat(new URL(sdkSupportEnv + '.data' + postfix, _this24.__options.resourceBaseUrl).href, "\""));
        source = source.replace('function createWasm', 'async function createWasm');
        source = source.replace('instantiateAsync();', 'await instantiateAsync();');

        // wasm and data(model) file 병렬로 fetch 하기 위해
        source = source.replace('var asm = createWasm();', 'console.log("create wasm and data - start")\n' + 'await (async function() {\n' + '  return new Promise(function(resolve) {\n' + '    var isCreatedWasm = false;\n' + '    var isCreatedData = false;\n' + '    createWasm().then(() => {\n' + '      isCreatedWasm = true;\n' + '      if (isCreatedData) { resolve(); }\n' + '    });\n' + '    createModelData().then(() => {\n' + '      isCreatedData = true;\n' + '      if (isCreatedWasm) { resolve(); }\n' + '    })\n' + '  });\n' + '})();\n' + 'console.log("create wasm and data - end")');
        return source;
      });
      src = "\n    return (async function() {\n      ".concat(src, "\n      Module.lengthBytesUTF8 = lengthBytesUTF8\n      Module.stringToUTF8 = stringToUTF8\n      return Module\n    })()\n        ");
      var initializeOCREngine = new Function(src)();
      var useLoadResourceTimeout = _this24.__options.useAutoSwitchToServerMode && _this24.__options.wasmResourceTimeout > -1;
      _this24.__wasmResourceTimeoutFn = _this24.__wasmResourceTimeoutFn ? _this24.__wasmResourceTimeoutFn : _this24.__wasmResourceTimer();
      try {
        _this24.__OCREngine = useLoadResourceTimeout ? yield Promise.race([initializeOCREngine, _this24.__wasmResourceTimeoutFn]) : yield Promise.resolve(initializeOCREngine);
        _this24.__OCREngine.onRuntimeInitialized = /*#__PURE__*/function () {
          var _ref11 = _asyncToGenerator(function* (_) {
            void 0;
          });
          return function (_x4) {
            return _ref11.apply(this, arguments);
          };
        }();
        yield _this24.__OCREngine.onRuntimeInitialized();
        _this24.__resourcesLoaded = true;
        void 0;
      } catch (e) {
        if (e.errorCode === 'SE001') {
          void 0;
          _this24.__isResourceTimeout = true;
        } else {
          void 0;
        }
        throw e;
      }
    })();
  }
  __loadEncryptResource() {
    var _this25 = this;
    return _asyncToGenerator(function* () {
      var resourceBaseUrl = _this25.__options.resourceBaseUrl;
      _this25.__EncryptModule = new AlcheraAES256SDK(resourceBaseUrl);
    })();
  }

  // wasm에서 이미지를 바로 생성할때 base64 인코딩시 prefix가 없는 경우 넣어줌
  __ocrImageGuard(image) {
    var prefix = 'data:image/jpeg;base64,';
    if (image) {
      return image.indexOf(prefix) === 0 ? image : prefix + image;
    } else {
      return null;
    }
  }
  __startScanWasmImpl() {
    var _this26 = this;
    return new Promise((resolve, reject) => {
      this.__detected = false;
      this.setIgnoreComplete(false);
      this.__setupEncryptMode();
      this.__setupResultKeylist();
      this.__setupImageMode();
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
              ssaResult = null,
              ssaResultList = [],
              maskInfo = null;

            // await this.__changeStage(IN_PROGRESS.READY);
            if (!_this26.__OCREngine['asm']) return;

            // TODO : 설정할수 있게 변경  default 값도 제공
            var [resolution_w, resolution_h] = [_this26.__resolutionWidth, _this26.__resolutionHeight];
            var {
              video
            } = detector.getOCRElements();
            if (resolution_w === 0 || resolution_h === 0) return;
            if (_this26.__detected) {
              yield _this26.__sleep(100);
              return;
            }
            // console.log('address before ---------', address);
            if (_this26.__address === 0 && !_this26.__pageEnd && (yield _this26.__isVideoResolutionCompatible(video))) {
              [_this26.__address, _this26.__destroyScannerCallback] = _this26.__getScannerAddress(_this26.__ocrType);
            }
            if (!_this26.__address || _this26.__pageEnd) {
              yield _this26.__sleep(100);
              return;
            }
            // console.log('address after ---------', address);

            if (_this26.__ocrStatus < _this26.OCR_STATUS.OCR_SUCCESS) {
              // OCR 완료 이전 상태

              // card not detected
              [isDetectedCard, imgData, imgDataUrl] = yield _this26.__isCardboxDetected(_this26.__address, 0);
              if (!isDetectedCard) {
                if (_this26.__inProgressStep !== _this26.IN_PROGRESS.READY) {
                  yield _this26.__changeStage(_this26.IN_PROGRESS.CARD_DETECT_FAILED);
                }
                if (_this26.__isClickedCaptureButton()) {
                  yield _this26.__changeStage(_this26.IN_PROGRESS.MANUAL_CAPTURE_FAILED, false, imgDataUrl);
                  _this26.__blurCaptureButton();
                  _this26.setIgnoreComplete(false); // 필요한가?
                }

                return;
              }

              // card is detected
              yield _this26.__changeStage(_this26.IN_PROGRESS.CARD_DETECT_SUCCESS);
              _this26.__setValidation(_this26.__options.useIDNumberValidation);

              // ssa retry 설정이 되어 있으거나, 수동촬영UI를 사용하는 경우, card detect 성공시 이미지 저장
              _this26.__enqueueDetectedCardQueue(imgData);
              if (_this26.__isClickedCaptureButton()) {
                _this26.setIgnoreComplete(true);
                yield _this26.__changeStage(_this26.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS, false, imgDataUrl);
              }
              ocrResult = yield _this26.__startRecognition(_this26.__address, _this26.__ocrType, _this26.__ssaMode, _this26.__isClickedCaptureButton(), imgData, imgDataUrl);

              // if (this.__isClickedCaptureButton()) {
              //   this.__blurCaptureButton();
              //   this.setIgnoreComplete(false);        // 필요한가?
              // }
            }

            if (_this26.__ocrStatus >= _this26.OCR_STATUS.OCR_SUCCESS) {
              // ocr 완료 이후 상태

              // failure case
              if (ocrResult === false) {
                throw new OCRError("OCR Status is ".concat(_this26.__ocrStatus, ", but ocrResult is false"), 'WA008'); // prettier-ignore
              }

              // success case
              _this26.__setStyle(video, {
                display: 'none'
              }); // OCR 완료 시점에 camera preview off

              if (_this26.__ssaMode) {
                void 0;
                // 최초 시도
                ssaResult = yield _this26.__startTruth(_this26.__ocrType, _this26.__address); // prettier-ignore
                if (ssaResult === null) throw new OCRError('SSA MODE is true. but, ssaResult is null', 'WA009'); // prettier-ignore

                ssaResultList.push(ssaResult);
                if (_this26.__options.ssaMaxRetryCount > 0) {
                  var retryStartDate = new Date();
                  var FAKE = _this26.__options.ssaRetryType === 'FAKE';
                  var REAL = _this26.__options.ssaRetryType === 'REAL';
                  var ENSEMBLE = _this26.__options.ssaRetryType === 'ENSEMBLE';
                  var isCompleted = false; // 비동기 for 문 때문에 break가 안걸리는 이슈로 넣음
                  var _loop = function* _loop(item) {
                    if (isCompleted) {
                      void 0; // prettier-ignore
                      return "break";
                    }
                    // prettier-ignore
                    if (_this26.__ssaRetryCount === _this26.__options.ssaMaxRetryCount) {
                      void 0;
                      return "break";
                    }
                    var execute = /*#__PURE__*/function () {
                      var _ref13 = _asyncToGenerator(function* () {
                        _this26.__ssaRetryCount++;
                        void 0; // prettier-ignore
                        ssaResult = yield _this26.__startTruthRetry(_this26.__ocrType, _this26.__address, item); // prettier-ignore
                        if (ssaResult === null) throw new OCRError('SSA MODE is true. but, ssaResult is null', 'WA009'); // prettier-ignore

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
                  for (var item of _this26.__detectedCardQueue) {
                    var _ret = yield* _loop(item);
                    if (_ret === "break") break;
                  }
                  var retryWorkingTime = new Date() - retryStartDate;
                  void 0; // prettier-ignore
                } else {
                  void 0;
                }
              }
              if (_this26.__options.useMaskInfo) {
                maskInfo = _this26.__getMaskInfo(_this26.__address);
              }
              void 0;
              var {
                legacyFormat,
                newFormat
              } = usebOCRWASMParser.parseOcrResult(_this26.__ocrType, _this26.__ssaMode, ocrResult, ssaResult, _this26.__ssaRetryCount, ssaResultList, _this26.__options.ssaRetryType, _this26.__options.ssaRetryPivot);
              var review_result = _objectSpread({
                ocr_type: _this26.__ocrType
              }, newFormat);
              if (!_this26.isCreditCard() && !_this26.isBarcode()) {
                review_result.maskInfo = maskInfo;
                review_result.ssa_mode = _this26.__ssaMode;
              }
              yield _this26.__compressImages(review_result);
              if (_this26.__options.useLegacyFormat) {
                review_result.ocr_data = legacyFormat;
              }
              yield _this26.__onSuccessProcess(review_result);
              _this26.__closeCamera();
              _this26.__detected = true;
              resolve();
            }
          } catch (e) {
            var errorMessage = 'Card scan error';
            if (e.message) {
              errorMessage += ': ' + e.message;
            }
            void 0;

            // if (e.toString().includes('memory')) {
            //   await this.__recoveryScan();
            //   this.__recovered = true;
            // } else {
            var errorCode = e.errorCode || 'WA001';
            yield _this26.__onFailureProcess(errorCode, e, errorMessage);
            _this26.__closeCamera();
            _this26.__detected = true;
            reject();
            // }
          } finally {
            if (_this26.__recovered) {
              _this26.__recovered = false;
              return;
            }
            if (!_this26.__detected) {
              _this26.__requestAnimationFrameId = setTimeout(scan, 1); // 재귀
            }
          }
        });
        return function scan() {
          return _ref12.apply(this, arguments);
        };
      }();
      this.__requestAnimationFrameId = setTimeout(scan, 1); // UI 랜더링 blocking 방지 (setTimeout)
    });
  }

  __compressImages(review_result, constantNumber) {
    var _this27 = this;
    return _asyncToGenerator(function* () {
      if (_this27.isEncryptMode()) {
        void 0;
        return;
      }
      if (_this27.__options.useCompressImage) {
        var resizeRatio = _this27.__cropImageSizeHeight / _this27.__cropImageSizeWidth;
        var defaultOptions = {
          maxWidth: _this27.__options.useCompressImageMaxWidth,
          maxHeight: _this27.__options.useCompressImageMaxWidth * resizeRatio,
          convertSize: _this27.__options.useCompressImageMaxVolume,
          targetCompressVolume: _this27.__options.useCompressImageMaxVolume // custom option
        };

        if (review_result.ocr_origin_image) {
          review_result.ocr_origin_image = yield _this27.__compressBase64Image(review_result.ocr_origin_image, defaultOptions, constantNumber);
        }
        if (review_result.ocr_masking_image) {
          // masking 이미지는 resize 하면, mask 좌표가 어긋나므로 리사이즈 안하고 압축만 진행
          var maskingImageOptions = {
            quality: defaultOptions.quality,
            targetCompressVolume: defaultOptions.targetCompressVolume
          };
          review_result.ocr_masking_image = yield _this27.__compressBase64Image(review_result.ocr_masking_image, maskingImageOptions, constantNumber);
        }
        if (review_result.ocr_face_image) {
          review_result.ocr_face_image = yield _this27.__compressBase64Image(review_result.ocr_face_image, defaultOptions, constantNumber);
        }
      }
    })();
  }
  __requestGetAPIToken() {
    return new Promise((resolve, reject) => {
      if (!this.__options.authServerInfo) {
        throw new OCRError('ServerOCR credential is empty', 'SE001');
      }
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
  __getOcrServerBaseUrl(ocrType) {
    var __makePathname = pathname => {
      if (!pathname) return pathname;
      return pathname.startsWith('/') ? pathname : "/".concat(pathname);
    };
    var baseUrl = new URL(this.__options.ocrServerBaseUrl);
    if (!baseUrl) throw new Error("'ocrServerBaseUrl' is empty.");
    var origin = baseUrl.origin;
    var pathname = baseUrl.pathname;
    switch (ocrType) {
      case 'idcard':
      case 'idcard-ssa':
      case 'driver':
      case 'driver-ssa':
        pathname += this.isUsebServerOCR() ? 'ocr/idcard-driver' : __makePathname(this.__options.ocrServerUrlIdcardDriver);
        break;
      case 'passport':
      case 'passport-ssa':
        pathname += this.isUsebServerOCR() ? 'ocr/passport' : __makePathname(this.__options.ocrServerUrlPassport);
        break;
      case 'foreign-passport':
      case 'foreign-passport-ssa':
        pathname += this.isUsebServerOCR() ? 'ocr/passport' : __makePathname(this.__options.ocrServerUrlForeignPassport);
        break;
      case 'alien-back':
        pathname += this.isUsebServerOCR() ? 'ocr/alien-back' : __makePathname(this.__options.ocrServerUrlAlienBack);
        break;
      case 'alien':
      case 'alien-ssa':
        pathname += this.isUsebServerOCR() ? 'ocr/alien' : __makePathname(this.__options.ocrServerUrlAlien);
        break;
      case 'veteran':
      case 'veteran-ssa':
        pathname += this.isUsebServerOCR() ? 'ocr/veteran' : __makePathname(this.__options.ocrServerUrlVeteran);
        break;
      case 'credit':
        throw new OCRError('Credit card is not Supported Server OCR type', 'SE005');
      default:
        throw new OCRError("Unsupported OCR type: ".concat(ocrType), 'SE005');
    }
    return origin + pathname;
  }
  __createServerOcrParams(_ref14) {
    var _this28 = this;
    return _asyncToGenerator(function* () {
      var {
        ocrType,
        ssaMode,
        encryptMode,
        fakeMode,
        imgDataUrl
      } = _ref14;
      /**
       * TODO: ServerOCR 방식이 SaaS인지 SDK인지
       * - SaaS이면 quram.useb.co.kr 로 호출
       * - useb token 발급필요
       *
       * - SDK방식이면 고객사에서 설정한 각 도메인으로 호출
       * - useb token 발급 불필요
       */

      if (_this28.isUsebServerOCR()) {
        var apiToken = yield _this28.__requestGetAPIToken();
        var myHeaders = new Headers();
        myHeaders.append('Authorization', "Bearer ".concat(apiToken));
        var param = _objectSpread(_objectSpread(_objectSpread({
          ocrType,
          base64jpg: imgDataUrl
        }, ssaMode ? undefined : {
          ssa_mode: 'false'
        }), encryptMode ? {
          useEncryptMode: 'true'
        } : undefined), fakeMode ? {
          fake_image: 'true'
        } : undefined);
        var payload = JSON.stringify(param);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
        };
        return requestOptions;
      } else {
        var formData = new FormData();
        formData.append('ocrType', ocrType);
        formData.append('base64jpg', _this28.__removeMimeType(imgDataUrl));
        if (encryptMode) {
          formData.append('useEncryptMode', true);
        }
        if (fakeMode) {
          formData.append('fake_image', true);
        }
        // formData.append('config', 'org_image');
        // formData.append('config', 'portrait');
        // formData.append('config', 'marked_image');
        // formData.append('config', ssaMode ? 'OCRSSA' : 'OCR');

        var _requestOptions = {
          method: 'POST',
          body: formData,
          redirect: 'follow'
        };
        return _requestOptions;
      }
    })();
  }
  __requestServerOCR(params) {
    var _this29 = this;
    return _asyncToGenerator(function* () {
      return new Promise( /*#__PURE__*/function () {
        var _ref15 = _asyncToGenerator(function* (resolve, reject) {
          try {
            var baseUrl = _this29.__getOcrServerBaseUrl(params.ocrType);
            var requestOptions = yield _this29.__createServerOcrParams(params);
            yield fetch(baseUrl, requestOptions).then(res => res.json()).then(result => {
              void 0;
              resolve(result);
            });
          } catch (err) {
            void 0;
            reject(err);
          }
        });
        return function (_x5, _x6) {
          return _ref15.apply(this, arguments);
        };
      }());
    })();
  }
  __startScanServerImpl() {
    var _this30 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref16 = _asyncToGenerator(function* (resolve, reject) {
        var _this30$__captureButt;
        // TODO: 서버 모드일때 암호화 는 어떻게 ? 지우는게 맞는가? js 레벨로하면 메모리에 남음 서버에서 암호화된값을 내려주는 옵션이 있어야함
        // this.__setPiiEncrypt(this.__options.useEncryptMode); // ocr result encrypt
        // TODO: 서버모드일 때 암호화 사용인 경우 base64 image를 useb_aes256.wasm 으로 암호화 (base64 -> encrypted text)
        // 처리 후 ServerOCR로 전송하기.
        if (_this30.isEncryptMode()) {
          yield _this30.__loadEncryptResource();
        }
        _this30.__blurCaptureButton();
        var __onClickCaptureButton = /*#__PURE__*/function () {
          var _ref17 = _asyncToGenerator(function* () {
            try {
              var ocrResult = null;
              // 캔버스에서 이미지를 가져옴
              var [, originImageDataUrl] = yield _this30.__options.useFakeImage ? _this30.__cropFakeImageFromVideo() : _this30.__cropImageFromVideo();
              var imgDataUrl = _this30.isEncryptMode() ? _this30.__encryptBase64(_this30.__removeMimeType(originImageDataUrl)) : originImageDataUrl;
              if (1 === true) {
                // server ocr 실패 (발생 가능성 없음)
              } else {
                // server ocr 성공
                yield _this30.__changeStage(_this30.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS, false, imgDataUrl);
                if (_this30.__options.skipServerModeRequestOCR) {
                  // Server OCR Request를 skip하는 경우 원본이미지만 반환 후 OCR 종료
                  var _review_result = {
                    ocr_type: _this30.__ocrType,
                    ocr_result: null,
                    ocr_origin_image: imgDataUrl
                  };
                  yield _this30.__onSuccessProcess(_review_result);
                  _this30.__closeCamera();
                  resolve();
                  return;
                }
                try {
                  var params = {
                    ocrType: _this30.__ocrType,
                    ssaMode: _this30.__ssaMode,
                    encryptMode: _this30.isEncryptMode(),
                    fakeMode: _this30.__options.useFakeImage,
                    imgDataUrl
                  };
                  ocrResult = yield _this30.__requestServerOCR(params);

                  // failure case
                  if (ocrResult === false) {
                    yield _this30.__changeStage(_this30.IN_PROGRESS.OCR_FAILED);
                  }
                } catch (e) {
                  throw new OCRError("An Error occured in request Server OCR", 'SE001');
                }

                // ssa 시도?

                // success case
                var {
                  video
                } = detector.getOCRElements();
                _this30.__setStyle(video, {
                  display: 'none'
                }); // OCR 완료 시점에 camera preview off

                _this30.__debug("ocrServerPreprocessor result(before) : ", {
                  ocrResult
                });
                try {
                  ocrResult = _this30.__serverOCRPreprocessor(_.cloneDeep(ocrResult));
                } catch (e) {
                  throw new OCRError("An Error occured in Server OCR Preprocessor", 'SE003');
                }
                _this30.__debug("ocrServerPreprocessor result(after) : ", {
                  ocrResult
                });
                var parsedOcrResult;
                try {
                  parsedOcrResult = usebOCRAPIParser.parseOcrResult(_this30.__ocrType, _this30.__ssaMode, ocrResult, _this30.__options.ocrServerParseKeyList);
                } catch (e) {
                  throw new OCRError("An Error occured in Server OCR Parser", 'SE002');
                }
                var {
                  legacyFormat,
                  newFormat,
                  base64ImageResult,
                  maskInfo
                } = parsedOcrResult;
                var review_result = {
                  ocr_type: _this30.__ocrType,
                  ocr_result: newFormat,
                  ocr_origin_image: imgDataUrl,
                  ocr_masking_image: base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_masking_image,
                  ocr_face_image: base64ImageResult === null || base64ImageResult === void 0 ? void 0 : base64ImageResult.ocr_face_image
                };
                if (!_this30.isCreditCard() && !_this30.isBarcode()) {
                  review_result.maskInfo = maskInfo;
                  review_result.ssa_mode = _this30.__ssaMode;
                }
                if (_this30.__debugMode) {
                  review_result.ocr_api_response = ocrResult;
                }
                try {
                  yield _this30.__compressImages(review_result, 0.0);
                } catch (e) {
                  throw new OCRError("An Error occured in compressImages", 'SE004');
                }

                // TODO: 서버 모드일때 암호화 는 어떻게 ? 지우는게 맞는가? js 레벨로하면 메모리에 남음 서버에서 암호화된값을 내려주는 옵션이 있어야함
                // this.encryptResult(review_result);

                if (_this30.__options.useLegacyFormat) {
                  review_result.ocr_data = legacyFormat;
                }
                if (ocrResult.complete === true) {
                  yield _this30.__onSuccessProcess(review_result);
                  _this30.__closeCamera();
                  resolve();
                } else {
                  var _ocrResult3;
                  var resultCode = 'SF001';
                  var resultMessage = "".concat(ocrResult.scanner_type, ":").concat((_ocrResult3 = ocrResult) === null || _ocrResult3 === void 0 ? void 0 : _ocrResult3.result_code);
                  var resultDetail = JSON.stringify(ocrResult);
                  var error = {
                    errorCode: resultCode,
                    message: resultMessage,
                    stack: resultDetail
                  };
                  yield _this30.__onFailureProcess(resultCode, resultDetail, resultMessage); // QURAM Server OCR 에러

                  _this30.__closeCamera();
                  reject(error);
                }
              }
            } catch (e) {
              var errorMessage = 'Server OCR Error';
              if (e.message) {
                errorMessage += ': ' + e.message;
              }
              void 0;
              var errorCode = e.errorCode || 'SE001';
              yield _this30.__onFailureProcess(errorCode, e, errorMessage); // QURAM Server OCR 에러
              _this30.__closeCamera();
              reject(e);
            }
          });
          return function __onClickCaptureButton() {
            return _ref17.apply(this, arguments);
          };
        }();
        (_this30$__captureButt = _this30.__captureButton) === null || _this30$__captureButt === void 0 ? void 0 : _this30$__captureButt.addEventListener('click', __onClickCaptureButton, {
          once: true
        });
      });
      return function (_x7, _x8) {
        return _ref16.apply(this, arguments);
      };
    }());
  }
  __enqueueDetectedCardQueue(imgData) {
    // ssa retry 설정이 되어 있으거나, 수동촬영UI를 사용하는 경우, card detect 성공시 이미지 저장
    if (this.__ssaMode && this.__options.ssaMaxRetryCount > 0 || this.__options.useCaptureUI && this.__manualOCRMaxRetryCount > 0) {
      var limitSaveImageCount = Math.max(this.__options.ssaMaxRetryCount, this.__manualOCRMaxRetryCount);
      if (this.__detectedCardQueue.length === limitSaveImageCount) {
        this.__detectedCardQueue.shift();
      }
      this.__detectedCardQueue.push(imgData);
      void 0; // should be removed
    }
  }

  __onSuccessProcess(review_result) {
    var _this31 = this;
    return _asyncToGenerator(function* () {
      // 인식 성공 스캔 루프 종료
      if (review_result.ssa_mode) {
        yield _this31.__changeStage(_this31.IN_PROGRESS.OCR_SUCCESS_WITH_SSA);
      } else {
        yield _this31.__changeStage(_this31.IN_PROGRESS.OCR_SUCCESS);
      }
      var result = {
        api_response: {
          result_code: 'N100',
          result_message: 'OK.'
        },
        result: 'success',
        review_result: review_result
      };
      if (_this31.__onSuccess) {
        _this31.__onSuccess(result);
        _this31.__onSuccess = null;
      } else {
        void 0;
      }
    })();
  }
  __onFailureProcess(resultCode, e, errorMessage) {
    var _this32 = this;
    return _asyncToGenerator(function* () {
      yield _this32.__changeStage(_this32.IN_PROGRESS.OCR_FAILED);
      var errorDetail = '';
      if (e !== null && e !== void 0 && e.toString()) errorDetail += e.toString() + '\n';
      if (e !== null && e !== void 0 && e.stack) errorDetail += e.stack + '\n';
      var result = {
        api_response: {
          result_code: resultCode,
          result_message: errorMessage
        },
        result: 'failed',
        review_result: {
          ocr_type: _this32.__ocrType,
          error_detail: errorDetail
        }
      };
      if (_this32.__onFailure) {
        _this32.__onFailure(result);
        _this32.__onFailure = null;
      } else {
        void 0;
      }
    })();
  }
  __preloadingWasm() {
    var _this33 = this;
    return _asyncToGenerator(function* () {
      if (_this33.isPreloaded()) {
        void 0;
      } else {
        try {
          void 0;
          _this33.showOCRLoadingUI();
          _this33.__preloadingStatus = _this33.PRELOADING_STATUS.STARTED;
          yield _this33.__loadResources();
          _this33.__preloadingStatus = _this33.PRELOADING_STATUS.DONE;
          _this33.__preloaded = true;
          _this33.hideOCRLoadingUI();
          void 0;
        } catch (e) {
          if (e.errorCode === 'SE001') {
            _this33.hideOCRLoadingUI();
            _this33.__restoreResourceInitialize();
          }
          throw e;
        }
      }
    })();
  }
  __setupEncryptMode() {
    if (this.isEncryptMode()) {
      if (this.__options.useEncryptMode) {
        this.__setOverallEncrypt(false);
        this.__setPiiEncrypt(true);
        // TODO: ssa 에 대한 암호화 값 제공은 별도 처리하지 않음
        //       추후 id_truth 와 fd_confidence 값 암호화 요청이 있을 경우 대응
      } else if (this.__options.useEncryptOverallMode) {
        this.__setOverallEncrypt(true);
        this.__setPiiEncrypt(false);
      } else if (this.__options.useEncryptValueMode) {
        this.__setOverallEncrypt(false);
        this.__setPiiEncrypt(false);
      }
    } else {
      this.__setOverallEncrypt(false);
      this.__setPiiEncrypt(false);
    }
  }
  __setupPlainResultKeylist() {
    this.__resultIdcardInfo(this.__options.ocrResultIdcardKeylist);
    this.__resultPassportInfo(this.__options.ocrResultPassportKeylist);
    this.__resultAlienInfo(this.__options.ocrResultAlienKeylist);
    if (this.__ssaMode) {
      this.__resultTruthInfo([...this.__ocrResultTruthKeySet]);
    }
  }
  __setupEncryptResultKeylist() {
    this.__encryptIdcardInfo(this.__options.encryptedOcrResultIdcardKeylist);
    this.__encryptPassportInfo(this.__options.encryptedOcrResultPassportKeylist);
    this.__encryptAlienInfo(this.__options.encryptedOcrResultAlienKeylist);
    if (this.__ssaMode) {
      this.__encryptTruthInfo([...this.__ocrResultTruthKeySet]);
    }
  }
  __setupResultKeylist() {
    this.__setupPlainResultKeylist();
    if (this.isEncryptMode() && !this.__options.useEncryptMode) {
      this.__setupEncryptResultKeylist();
    }
  }
  __setupImageMode() {
    var imgMode;
    if (this.isCreditCard()) {
      imgMode = this.OCR_IMG_MODE.CROPPING;
    } else if (this.__options.useImageCropping) {
      imgMode = this.OCR_IMG_MODE.CROPPING;
    } else if (this.__options.useImageWarping) {
      imgMode = this.OCR_IMG_MODE.WARPING;
    } else {
      imgMode = this.OCR_IMG_MODE.NONE;
    }
    this.__setImageResult(imgMode);
  }
  __setPiiEncrypt(piiEncryptMode) {
    this.__OCREngine.setPiiEncrypt(piiEncryptMode);
  }
  __stringArrayToString(stringArray) {
    var retString = null;
    if (stringArray === '') return stringArray;
    if (stringArray === undefined || stringArray === null || stringArray.length === 0) return retString;
    retString = '';
    for (var i = 0; i < stringArray.length; i++) {
      retString += stringArray[i];
      if (i < stringArray.length - 1) {
        retString += ',';
      }
    }
    return retString;
  }
  __resultIdcardInfo(optIdcard) {
    this.__OCREngine.setIdcardResult(this.__stringArrayToString(optIdcard));
  }
  __resultPassportInfo(optPassport) {
    this.__OCREngine.setPassportResult(this.__stringArrayToString(optPassport));
  }
  __resultAlienInfo(optAlien) {
    this.__OCREngine.setAlienResult(this.__stringArrayToString(optAlien));
  }
  __resultTruthInfo(optTruth) {
    this.__OCREngine.setTruthResult(this.__stringArrayToString(optTruth));
  }
  __encryptIdcardInfo(optIdcard) {
    this.__OCREngine.setIdcardEncrypt(this.__stringArrayToString(optIdcard));
  }
  __encryptPassportInfo(optPassport) {
    this.__OCREngine.setPassportEncrypt(this.__stringArrayToString(optPassport));
  }
  __encryptAlienInfo(optAlien) {
    this.__OCREngine.setAlienEncrypt(this.__stringArrayToString(optAlien));
  }
  __encryptTruthInfo(optTruth) {
    this.__OCREngine.setTruthEncrypt(this.__stringArrayToString(optTruth));
  }
  __setOverallEncrypt(val) {
    this.__OCREngine.setOverallEncrypt(val);
  }
  __setImageResult(val) {
    this.__OCREngine.setImageResult(val);
  }

  // TODO : 어디서 사용하는지 확인 필요
  // __setPassportResult(val) {
  //   this.__OCREngine.setPassportResultType(val);
  // }

  // TODO : credit card 에서 사용중이어서 삭제 불가 (wasm 레벨로 변경될 경우 삭제 가능) -- START
  __encryptDetectedBase64(address, mask, ocr_mode) {
    var imgType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'card';
    if (imgType === 'face') {
      return this.__OCREngine.encryptBase64jpgDetectedPhotoBase64(address);
    }
    return this.__OCREngine.encryptBase64jpgDetectedFrameBase64(address, mask, ocr_mode);
  }

  /**
   * @param {string} inputString 평문 string
   * @returns {string} 암호화된 string
   */
  __encryptBase64(inputString) {
    if (typeof inputString === 'number') inputString = inputString.toString();
    if (inputString === '') return '';
    try {
      return this.__EncryptModule.encrypt(inputString);
    } catch (e) {
      void 0;
    }
  }
  /**
   * @param {string} inputString 암호화된 string
   * @returns {string} 복호화된 string
   */
  __decryptBase64(inputString) {
    if (typeof inputString === 'number') inputString = inputString.toString();
    if (inputString === '') return '';
    try {
      return this.__EncryptModule.decrypt(inputString);
    } catch (e) {
      void 0;
    }
  }
  __getEncryptedSize() {
    return this.__OCREngine.getEncryptedJpgSize();
  }
  __getEncryptedBuffer() {
    return this.__OCREngine.getEncryptedJpgBuffer();
  }
  __getPiiEncryptImageBase64(address, mask, imgMode) {
    var imgType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'card';
    var encryptDetectedBase64 = this.__encryptDetectedBase64(address, mask, imgMode, imgType);
    if (encryptDetectedBase64 === 1) {
      var jpgSize = this.__getEncryptedSize();
      var jpgPointer = this.__getEncryptedBuffer();
      var encrypted = new Uint8Array(this.__OCREngine.HEAP8.buffer, jpgPointer, jpgSize);
      var textDecoder = new TextDecoder('utf-8');
      return textDecoder.decode(encrypted);
    } else {
      return '';
    }
  }
  __getImageBase64(address, maskMode, imgMode) {
    var _arguments5 = arguments,
      _this34 = this;
    return _asyncToGenerator(function* () {
      var imgType = _arguments5.length > 3 && _arguments5[3] !== undefined ? _arguments5[3] : 'card';
      try {
        if (imgType === 'card') {
          _this34.__OCREngine.encodeJpgDetectedFrameImage(address, maskMode, imgMode);
        } else if (imgType === 'face') {
          _this34.__OCREngine.encodeJpgDetectedPhotoImage(address);
        }
        var jpgSize = _this34.__OCREngine.getEncodedJpgSize();
        var jpgPointer = _this34.__OCREngine.getEncodedJpgBuffer();
        var resultView = new Uint8Array(_this34.__OCREngine.HEAP8.buffer, jpgPointer, jpgSize);
        var result = new Uint8Array(resultView);
        var blob = new Blob([result], {
          type: 'image/jpeg'
        });
        return yield _this34.__blobToBase64(blob);
      } catch (e) {
        void 0;
        throw new OCRError(e, 'WA010');
      } finally {
        _this34.__OCREngine.destroyEncodedJpg();
      }
    })();
  }
  // TODO : credit card 에서 사용중이어서 삭제 불가 (wasm 레벨로 변경될 경우 삭제 가능) -- END

  __startScanWasm() {
    var _this35 = this;
    return _asyncToGenerator(function* () {
      _this35.__debug('wasm_mode');
      yield _this35.cleanup();

      // useRequestCameraBeforeModuleLoad 기능 사용 시 preloadingUI 표현
      if (_this35.__options.useRequestCameraBeforeModuleLoad) {
        _this35.showOCRLoadingUI();
        yield _this35.preloading();
        _this35.hideOCRLoadingUI();
      } else {
        yield _this35.preloading();
      }
      yield _this35.__startScanWasmImpl();
      void 0;
    })();
  }
  __startScanServer() {
    var _this36 = this;
    return _asyncToGenerator(function* () {
      _this36.__debug('server_mode');
      if (!!_this36.getOCREngine()) yield _this36.cleanup();
      _this36.__options.useCaptureUI = true;
      yield _this36.__startScanServerImpl();
      void 0;
    })();
  }
  __recoveryScan() {
    var _this37 = this;
    return _asyncToGenerator(function* () {
      void 0;
      _this37.__resourcesLoaded = false;
      _this37.stopScan();
      yield _this37.__startScanWasm();
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
    clearTimeout(this.__requestAnimationFrameId);
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
  __wasmResourceTimer() {
    var _this38 = this;
    return _asyncToGenerator(function* () {
      return new Promise((_, reject) => {
        var useLoadResourceTimeout = _this38.__options.useAutoSwitchToServerMode && _this38.__options.wasmResourceTimeout > -1;
        var wasmResourceTimeout = useLoadResourceTimeout ? _this38.__options.wasmResourceTimeout : _this38.__maxWasmResourceTimeout;
        if (!_this38.__wasmResourceTimerId) {
          _this38.__wasmResourceTimerId = setTimeout(() => {
            reject(new OCRError('[Network Error] Load to WASM Resource failed with timeout', 'SE001'));
          }, wasmResourceTimeout);
        }
      });
    })();
  }

  /** 메모리 allocation free 함수 */
  cleanup() {
    var _this39 = this;
    return _asyncToGenerator(function* () {
      _this39.__destroyScannerAddress();
      _this39.__destroyEncryptedScanResult();
      _this39.__destroyBuffer();
      _this39.__destroyPrevImage();
      _this39.__destroyStringOnWasmHeap();
      _this39.__detectedCardQueue = [];
    })();
  }
  restoreInitialize() {
    this.__initialized = false;
    this.__restoreResourceInitialize();
  }
  __restoreResourceInitialize() {
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
  get version() {
    return 'v1.37.4';
  }

  // 기존 동작: 모듈 로드 후 카메라 권한 요청
  __startScanWasmWithCamera() {
    var _this40 = this;
    return _asyncToGenerator(function* () {
      _this40.__debug('wasm_mode');
      yield _this40.cleanup();
      yield _this40.preloading();
      yield _this40.__proceedCameraPermission();
      yield _this40.__startScanWasmImpl();
      void 0;
    })();
  }
  __startScanServerWithCamera() {
    var _this41 = this;
    return _asyncToGenerator(function* () {
      _this41.__debug('server_mode');
      if (!!_this41.getOCREngine()) yield _this41.cleanup();
      _this41.__options.useCaptureUI = true;
      yield _this41.__proceedCameraPermission();
      yield _this41.__startScanServerImpl();
      void 0;
    })();
  }
}
export default UseBOCR;