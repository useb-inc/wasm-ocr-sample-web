function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var instance;
class UISimulator {
  /** private properties */

  /** constructor */
  constructor(onClickStartCallback, onClickRestartCallback, onClickStartPreloadingCallback) {
    _defineProperty(this, "__onClickStartCallback", void 0);
    _defineProperty(this, "__onClickRestartCallback", void 0);
    _defineProperty(this, "__onClickStartPreloadingCallback", void 0);
    _defineProperty(this, "__type", void 0);
    _defineProperty(this, "__settings", {
      ssaRetryType: 'ENSEMBLE'
    });
    if (!!!onClickStartCallback || !!!onClickRestartCallback) {
      throw new Error('onClick callback function parameter is not exist');
    }
    if (instance) return instance;
    instance = this;
    this.__onClickStartCallback = onClickStartCallback;
    this.__onClickRestartCallback = onClickRestartCallback;
    this.__onClickStartPreloadingCallback = onClickStartPreloadingCallback;
    this.__bindEventListener();
    return instance;
  }
  __bindEventListener() {
    window.onload = () => {
      document.querySelectorAll('.settings-section input').forEach(input => {
        input.addEventListener('keyup', this.__saveSettingsHandler);
        input.addEventListener('change', this.__saveSettingsHandler);
      });
      document.querySelector('#onboarding-start').addEventListener('click', () => {
        document.querySelector('.onboarding-section').style.display = 'none';
        document.querySelector('#card-select-section').style.display = 'flex';
        if (this.__onClickStartPreloadingCallback) {
          this.__onClickStartPreloadingCallback();
        }
      });
      document.querySelector('#card-select-section #prev').addEventListener('click', function () {
        // document.querySelector('.onboarding-section').style.display = 'flex';
        // document.querySelector('#card-select-section').style.display = 'none';
        location.reload();
      });
      document.querySelector('#simulator-section .prev').addEventListener('click', function () {
        document.querySelector('#card-select-section').style.display = 'flex';
        document.querySelector('#simulator-section').style.display = 'none';
      });
      var collapsedToggle = function collapsedToggle(event) {
        var _event$target$id;
        var toggleElement = (_event$target$id = event.target.id) !== null && _event$target$id !== void 0 && _event$target$id.includes('toggle') ? event.target : event.target.parentElement;
        var section = toggleElement.parentElement;
        var label = toggleElement.querySelector('span');
        var chevron = toggleElement.querySelector('.chevron');
        // const settingsSection = document.querySelector(selector)
        // const label = document.querySelector(selector + ' span')
        // const chevron = document.querySelector(selector + ' .chevron')
        if (section.classList.contains('collapsed')) {
          section.classList.remove('collapsed');
          chevron.classList.remove('fa-chevron-up');
          chevron.classList.add('fa-chevron-down');
          label.textContent = '[접기]';
        } else {
          section.classList.add('collapsed');
          chevron.classList.remove('fa-chevron-down');
          chevron.classList.add('fa-chevron-up');
          label.textContent = '[펼치기]';
        }
      };

      // document.getElementById('type-toggle').addEventListener('click', collapsedToggle);
      document.getElementById('settings-toggle').addEventListener('click', collapsedToggle);
      document.getElementById('ssa-max-retry-count').addEventListener('change', e => {
        this.__settings.ssaMaxRetryCount = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        this.__saveSettingsHandler();
      });
      var setSsaType = e => {
        this.__settings.ssaRetryType = e.target.value;
      };
      document.getElementById('ssa-type').querySelectorAll('input').forEach(el => {
        el.addEventListener('change', setSsaType);
      });
      var toggleCustomUI = (position, event) => {
        switch (position) {
          case 'top':
            this.__settings.useTopUI = event.target.checked;
            break;
          case 'middle':
            this.__settings.useMiddleUI = event.target.checked;
            break;
          case 'bottom':
            this.__settings.useBottomUI = event.target.checked;
            break;
          case 'preview':
            this.__settings.usePreviewUI = event.target.checked;
            break;
        }
        var text = document.getElementById("use-".concat(position, "-ui-text-msg"));
        if (!event.target.checked && text !== null && text !== void 0 && text.checked) {
          text.click();
        }
        this.__saveSettingsHandler();
      };
      var toggleCustomUITextMsg = (position, event) => {
        switch (position) {
          case 'top':
            this.__settings.useTopUITextMsg = event.target.checked;
            break;
          case 'middle':
            this.__settings.useMiddleUITextMsg = event.target.checked;
            break;
          case 'bottom':
            this.__settings.useBottomUITextMsg = event.target.checked;
            break;
        }
        var ui = document.getElementById("use-".concat(position, "-ui"));
        if (event.target.checked && !ui.checked) {
          ui.click();
        }
        this.__saveSettingsHandler();
      };
      document.getElementById('use-top-ui').addEventListener('change', e => {
        toggleCustomUI('top', e);
      });
      document.getElementById('use-top-ui-text-msg').addEventListener('change', e => {
        toggleCustomUITextMsg('top', e);
      });
      document.getElementById('use-middle-ui').addEventListener('change', e => {
        toggleCustomUI('middle', e);
      });
      document.getElementById('use-middle-ui-text-msg').addEventListener('change', e => {
        toggleCustomUITextMsg('middle', e);
      });
      document.getElementById('use-bottom-ui').addEventListener('change', e => {
        toggleCustomUI('bottom', e);
      });
      document.getElementById('use-bottom-ui-text-msg').addEventListener('change', e => {
        toggleCustomUITextMsg('bottom', e);
      });
      document.getElementById('use-preview-ui').addEventListener('change', e => {
        toggleCustomUI('preview', e);
      });
      document.getElementById('use-force-complete-ui').addEventListener('change', e => {
        this.__settings.useForceCompleteUI = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-auto-switch').addEventListener('change', e => {
        this.__settings.useAutoSwitchToServerMode = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('switch-to-server-threshold').addEventListener('change', e => {
        this.__settings.switchToServerThreshold = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-manual-switch').addEventListener('change', e => {
        this.__settings.useManualSwitchToServerMode = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-encrypt-mode').addEventListener('change', e => {
        if (e.target.checked) {
          this.__settings.useEncryptAllMode = !e.target.checked;
          document.getElementById('use-encrypt-all-mode-div').style.display = 'none';
          document.getElementById('use-encrypt-overall-mode-div').style.display = 'none';
        } else {
          document.getElementById('use-encrypt-all-mode-div').style.display = 'block';
          document.getElementById('use-encrypt-overall-mode-div').style.display = 'block';
        }
        this.__settings.useEncryptMode = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-encrypt-all-mode').addEventListener('change', e => {
        if (e.target.checked) {
          this.__settings.useEncryptMode = !e.target.checked;
          document.getElementById('use-encrypt-mode-div').style.display = 'none';
          document.getElementById('use-encrypt-overall-mode-div').style.display = 'none';
        } else {
          document.getElementById('use-encrypt-mode-div').style.display = 'block';
          document.getElementById('use-encrypt-overall-mode-div').style.display = 'block';
        }
        this.__settings.useEncryptAllMode = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-encrypt-overall-mode').addEventListener('change', e => {
        if (e.target.checked) {
          this.__settings.useEncryptOverallMode = !e.target.checked;
          document.getElementById('use-encrypt-mode-div').style.display = 'none';
          document.getElementById('use-encrypt-all-mode-div').style.display = 'none';
          document.getElementById('ocr-result-exclude-keylist-div').style.display = 'flex';
          this.__settings.ocrResultExcludeKeylist = '';
          this.__settings.ocrImageExcludeKeylist = '';
          this.__settings.encryptOcrResultExcludeKeylist = '';
          this.__settings.encryptOcrImageExcludeKeylist = '';
        } else {
          document.getElementById('use-encrypt-mode-div').style.display = 'block';
          document.getElementById('use-encrypt-all-mode-div').style.display = 'block';
          document.getElementById('ocr-result-exclude-keylist-div').style.display = 'none';
          delete this.__settings.ocrResultExcludeKeylist;
          delete this.__settings.ocrImageExcludeKeylist;
          delete this.__settings.encryptOcrResultExcludeKeylist;
          delete this.__settings.encryptOcrImageExcludeKeylist;
        }
        this.__settings.useEncryptOverallMode = e.target.checked;
        this.__saveSettingsHandler();
      });

      // 추후 위에 주석 풀어야함 - START
      // document
      //   .getElementById('use-pii-encrypt-mode')
      //   .addEventListener('change', (e) => {
      //     this.__settings.usePiiEncryptMode = e.target.checked;
      //     this.__saveSettingsHandler();
      //   });
      //
      // document
      //   .getElementById('use-pii-encrypt-face')
      //   .addEventListener('change', (e) => {
      //     this.__settings.usePiiEncryptFace = e.target.checked;
      //     this.__saveSettingsHandler();
      //   });
      // 추후 위에 주석 풀어야함 - END

      document.getElementById('use-legacy-format').addEventListener('change', e => {
        this.__settings.useLegacyFormat = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-image-correction').addEventListener('change', e => {
        if (e.target.value === 'useImageCropping') {
          this.__settings.useImageCropping = true;
          this.__settings.useImageWarping = false;
        } else if (e.target.value === 'useImageWarping') {
          this.__settings.useImageCropping = false;
          this.__settings.useImageWarping = true;
        } else {
          this.__settings.useImageCropping = false;
          this.__settings.useImageWarping = false;
        }
        this.__saveSettingsHandler();
      });
      document.getElementById('use-compress-image').addEventListener('change', e => {
        this.__settings.useCompressImage = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-compress-image-max-width').addEventListener('change', e => {
        this.__settings.useCompressImageMaxWidth = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-compress-image-max-volume').addEventListener('change', e => {
        this.__settings.useCompressImageMaxVolume = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('mirror-mode').addEventListener('change', e => {
        this.__settings.mirrorMode = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('rotation-degree').addEventListener('change', e => {
        this.__settings.rotationDegree = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('camera-resolution-criteria').addEventListener('change', e => {
        this.__settings.cameraResolutionCriteria = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('camera-resource-request-retry-limit').addEventListener('change', e => {
        this.__settings.cameraResourceRequestRetryLimit = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('camera-resource-request-retry-interval').addEventListener('change', e => {
        this.__settings.cameraResourceRequestRetryInterval = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('guide-box-criteria').addEventListener('change', e => {
        this.__settings.calcGuideBoxCriteria = e.target.value;
        this.__saveSettingsHandler();
      });
      document.getElementById('show-clipboard').addEventListener('change', e => {
        this.__settings.showClipFrame = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('show-canvas-preview').addEventListener('change', e => {
        this.__settings.showCanvasPreview = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-debug-alert').addEventListener('change', e => {
        this.__settings.useDebugAlert = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('force_wasm_reload').addEventListener('change', e => {
        this.__settings.force_wasm_reload = e.target.checked;
        if (!e.target.checked) {
          this.__settings.force_wasm_reload_flag = '';
        }
        this.__saveSettingsHandler();
      });
      document.getElementById('force_wasm_reload_flag').addEventListener('change', e => {
        var checked = document.querySelector('#foce_wasm_reload').value;
        this.__settings.force_wasm_reload_flag = checked ? e.target.value : '';
        this.__saveSettingsHandler();
      });
      document.getElementById('resolution-template').addEventListener('change', () => {
        if (document.getElementById('resolution-template').value === 'custom') {
          document.getElementById('resolution-custom').style.display = 'block';
        } else if (document.getElementById('resolution-template').value === 'responsive') {
          document.getElementById('resolution-custom').style.display = 'none';
        } else {
          document.getElementById('resolution-custom').style.display = 'none';
          var source = document.getElementById('resolution-template').value.split('x');
          var target = [document.getElementById('resolution-width'), document.getElementById('resolution-height')];
          [target[0].value, target[1].value] = [source[0], source[1]];
        }
        this.__saveSettingsHandler();
      });
      document.getElementById('use-mask-frame-color-change').addEventListener('change', e => {
        this.__settings.useMaskFrameColorChange = e.target.checked;
        if (e.target.checked) {
          document.getElementById('mask-frame-color-default').style.display = 'none';
          document.getElementById('mask-frame-color-custom').style.display = 'block';
        } else {
          document.getElementById('mask-frame-color-default').style.display = 'block';
          document.getElementById('mask-frame-color-custom').style.display = 'none';
        }
        this.__saveSettingsHandler();
      });
      document.getElementById('resolution-reverse-button').addEventListener('click', () => {
        var arr = [document.getElementById('resolution-width'), document.getElementById('resolution-height')];
        [arr[0].value, arr[1].value] = [arr[1].value, arr[0].value]; // swap
        this.__saveSettingsHandler();
      });
      document.getElementById('save-settings').addEventListener('click', event => {
        var target = document.getElementById('save-settings');
        target.setAttribute('disabled', 'disabled');
        target.querySelector('span').textContent = '설정 적용됨';
        target.querySelector('i').style.display = 'inline-block';
        target.querySelector('i').style.color = '#5cb85c';

        // 인식 프레임 스타일
        var borderWidth = document.getElementById('border-width').value;
        var borderStyle = document.getElementById('border-style').value;
        var borderRadius = document.getElementById('border-radius').value;
        var colorNotReady = document.getElementById('color-not-ready').value;
        var colorReady = document.getElementById('color-ready').value;
        var colorDetectSuccess = document.getElementById('color-detect-success').value;
        var colorDetectFailed = document.getElementById('color-detect-failed').value;
        var colorOCRRecognized = document.getElementById('color-ocr-recognized').value;
        var colorSuccess = document.getElementById('color-success').value;
        var colorFailed = document.getElementById('color-failed').value;
        this.__settings.frameBorderStyle = _objectSpread(_objectSpread({}, this.__settings.frameBorderStyle), {}, {
          width: borderWidth,
          style: borderStyle,
          radius: borderRadius,
          not_ready: colorNotReady,
          ready: colorReady,
          detect_failed: colorDetectFailed,
          detect_success: colorDetectSuccess,
          recognized: colorOCRRecognized,
          recognized_with_ssa: colorOCRRecognized,
          ocr_failed: colorFailed,
          ocr_success: colorSuccess,
          ocr_success_with_ssa: colorSuccess
        });

        // 마스킹 프레임 스타일
        var maskFrameColorNotReady = document.getElementById('mask-frame-color-not-ready').value;
        var maskFrameColorReady = document.getElementById('mask-frame-color-ready').value;
        var maskFrameColorDetectSuccess = document.getElementById('mask-frame-color-detect-success').value;
        var maskFrameColorDetectFailed = document.getElementById('mask-frame-color-detect-failed').value;
        var maskFrameColorOCRRecognized = document.getElementById('mask-frame-color-ocr-recognized').value;
        var maskFrameColorSuccess = document.getElementById('mask-frame-color-success').value;
        var maskFrameColorFailed = document.getElementById('mask-frame-color-failed').value;
        var maskFrameColorBaseColor = document.getElementById('mask-frame-color-base-color').value;
        this.__settings.maskFrameStyle = _objectSpread(_objectSpread({}, this.__settings.maskFrameStyle), {}, {
          base_color: maskFrameColorBaseColor,
          not_ready: maskFrameColorNotReady,
          ready: maskFrameColorReady,
          detect_failed: maskFrameColorDetectFailed,
          detect_success: maskFrameColorDetectSuccess,
          recognized: maskFrameColorOCRRecognized,
          recognized_with_ssa: maskFrameColorOCRRecognized,
          ocr_failed: maskFrameColorFailed,
          ocr_success: maskFrameColorSuccess,
          ocr_success_with_ssa: maskFrameColorSuccess
        });
        if (document.getElementById('resolution-template').value === 'responsive') {
          document.getElementById('resolution-simulation-frame').style.width = '';
          document.getElementById('resolution-simulation-frame').style.height = '';
        } else {
          var resolutionWidth = document.getElementById('resolution-width').value;
          var resolutionHeight = document.getElementById('resolution-height').value;
          var resolutionExpendRatio = document.getElementById('resolution-expend-ratio').value;
          document.getElementById('resolution-simulation-frame').style.width = resolutionWidth * resolutionExpendRatio + 'px';
          document.getElementById('resolution-simulation-frame').style.height = resolutionHeight * resolutionExpendRatio + 'px';
        }
        if (this.__type) {
          this.__onClickStart();
        }
      });
      document.querySelector('#card-select-section .type-button').addEventListener('click', e => {
        if (e.target.nodeName === 'BUTTON') {
          this.__type = e.target.id;
          if (e.target.id === 'alient-back') {
            this.__settings.useFaceImage = false; // 외국인등록증 뒷면은 얼굴 없음
          }

          this.__onClickStart();
          document.querySelector('#card-select-section').style.display = 'none';
          document.querySelector('#simulator-section').style.display = 'block';
          document.querySelector('#simulator-section .prev-button span').textContent = e.target.textContent;
        }
      });
      document.getElementById('restart_btn').addEventListener('click', () => {
        this.__onClickRestart();
      });
      this.__ocrExcludeOptionsSetting();
    };
  }
  __onClickStart() {
    // this.__setActiveButton(this.__type);
    this.__onClickStartCallback(this.__type, this.__settings);
  }
  __onClickRestart() {
    this.__onClickRestartCallback();
  }
  __ocrExcludeOptionsSetting() {
    var ocrResultKeys = [{
      title: '전체',
      value: 'all'
    }, {
      title: '신분증 종류',
      value: 'result_scan_type'
    }, {
      title: '이름',
      value: 'name'
    }, {
      title: '주민등록번호',
      value: 'jumin'
    }, {
      title: '발급일자',
      value: 'issued_date'
    }, {
      title: '발급 행정구역',
      value: 'region'
    }, {
      title: 'color_point',
      value: 'color_point'
    }, {
      title: '신분증 상 얼굴 좌표',
      value: 'found_face'
    }, {
      title: '신분증 상 눈 좌표',
      value: 'found_eye'
    }, {
      title: 'OCR 시작시간',
      value: 'start_time'
    }, {
      title: 'OCR 종료시간',
      value: 'end_time'
    }, {
      title: '생년월일',
      value: 'birth'
    }, {
      title: '해외거주 여부',
      value: 'overseas_resident'
    }, {
      title: '운전면허 번호',
      value: 'driver_number'
    }, {
      title: '운전면허증 시리얼번호',
      value: 'driver_serial'
    }, {
      title: '면허 종류',
      value: 'driver_type'
    }, {
      title: '적성검사 갱신기간 시작일',
      value: 'aptitude_test_date_start'
    }, {
      title: '적성검사 갱신기간 종료일',
      value: 'aptitude_test_date_end'
    }, {
      title: '성',
      value: 'sur_name'
    }, {
      title: '이름 (name과 별도)',
      value: 'given_name'
    }, {
      title: '여권 종류',
      value: 'passport_type'
    }, {
      title: '발급 국가',
      value: 'issuing_country'
    }, {
      title: '여권 번호',
      value: 'passport_number'
    }, {
      title: '국적',
      value: 'nationality'
    }, {
      title: '성별',
      value: 'sex'
    }, {
      title: '여권 만료일',
      value: 'expiry_date'
    }, {
      title: 'personal_number',
      value: 'personal_number'
    }, {
      title: '한글성명',
      value: 'name_kor'
    }, {
      title: '여권 하단 MRZ1',
      value: 'mrz1'
    }, {
      title: '여권 하단 MRZ2',
      value: 'mrz2'
    }, {
      title: '체류자격',
      value: 'visa_type'
    }, {
      title: '사본판별 결과',
      value: 'id_truth'
    }, {
      title: '사본판별 confidence',
      value: 'fd_confidence'
    }, {
      title: '사본판별 재시도 횟수',
      value: 'id_truth_retry_count'
    }];
    var ocrImageKeys = [{
      title: '전체',
      value: 'all'
    }, {
      title: '원본 이미지',
      value: 'ocr_origin_image'
    }, {
      title: '마스킹 이미지',
      value: 'ocr_masking_image'
    }, {
      title: '얼굴 이미지',
      value: 'ocr_face_image'
    }];
    var insertExcludeKeyOptions = (target, keys) => {
      var html = keys.map(key => {
        return "<li>\n                    <input type=\"checkbox\" id=\"".concat(target, "-").concat(key.value, "\" name=\"").concat(target, "-keylist\" value=\"").concat(key.value, "\" />\n                    <label for=\"").concat(target, "-").concat(key.value, "\">").concat(key.value, "</label>\n                  </li>");
      }).join('');
      document.querySelector("ul#".concat(target, "-keylist-wrapper")).insertAdjacentHTML('afterbegin', html);
    };

    // DOM 세팅
    insertExcludeKeyOptions('ocr-result-exclude', ocrResultKeys);
    insertExcludeKeyOptions('ocr-image-exclude', ocrImageKeys);
    insertExcludeKeyOptions('encrypt-ocr-result-exclude', ocrResultKeys);
    insertExcludeKeyOptions('encrypt-ocr-image-exclude', ocrImageKeys);
    var addKeyList = (target, key) => {
      return [...target.split(','), key].filter(v => !!v).join(',');
    };
    var removeKeyList = (target, key) => {
      return target.split(',').filter(t => t !== key).join(',');
    };

    // 이벤트 핸들러 등록
    var excludeKeylistHandler = e => {
      var settingTarget = '';
      // prettier-ignore
      switch (e.target.name) {
        case 'ocr-result-exclude-keylist':
          settingTarget = 'ocrResultExcludeKeylist';
          break;
        case 'ocr-image-exclude-keylist':
          settingTarget = 'ocrImageExcludeKeylist';
          break;
        case 'encrypt-ocr-result-exclude-keylist':
          settingTarget = 'encryptOcrResultExcludeKeylist';
          break;
        case 'encrypt-ocr-image-exclude-keylist':
          settingTarget = 'encryptOcrImageExcludeKeylist';
          break;
      }
      if (e.target.checked) {
        this.__settings[settingTarget] = addKeyList(this.__settings[settingTarget], e.target.value);
      } else {
        this.__settings[settingTarget] = removeKeyList(this.__settings[settingTarget], e.target.value);
      }
      this.__saveSettingsHandler();
    };
    document.querySelectorAll('#ocr-result-exclude-keylist-div input').forEach(input => input.addEventListener('change', excludeKeylistHandler));
  }
  __setActiveButton(type) {
    this.resetButton();
    document.getElementById(type).classList.add('active');
  }
  resetButton() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
  }
  __saveSettingsHandler() {
    var button = document.getElementById('save-settings');
    button.removeAttribute('disabled');
    button.querySelector('.fa-check').style.display = 'none';
    button.querySelector('span').textContent = '설정적용';
  }
}
export default UISimulator;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWlfc2ltdWxhdG9yLmpzIiwibmFtZXMiOlsiaW5zdGFuY2UiLCJVSVNpbXVsYXRvciIsImNvbnN0cnVjdG9yIiwib25DbGlja1N0YXJ0Q2FsbGJhY2siLCJvbkNsaWNrUmVzdGFydENhbGxiYWNrIiwib25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwic3NhUmV0cnlUeXBlIiwiRXJyb3IiLCJfX29uQ2xpY2tTdGFydENhbGxiYWNrIiwiX19vbkNsaWNrUmVzdGFydENhbGxiYWNrIiwiX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2siLCJfX2JpbmRFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fc2F2ZVNldHRpbmdzSGFuZGxlciIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbGxhcHNlZFRvZ2dsZSIsImV2ZW50IiwiX2V2ZW50JHRhcmdldCRpZCIsInRvZ2dsZUVsZW1lbnQiLCJ0YXJnZXQiLCJpZCIsImluY2x1ZGVzIiwicGFyZW50RWxlbWVudCIsInNlY3Rpb24iLCJsYWJlbCIsImNoZXZyb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwiX19zZXR0aW5ncyIsInNzYU1heFJldHJ5Q291bnQiLCJpc05hTiIsInBhcnNlSW50IiwidmFsdWUiLCJzZXRTc2FUeXBlIiwiZWwiLCJ0b2dnbGVDdXN0b21VSSIsInBvc2l0aW9uIiwidXNlVG9wVUkiLCJjaGVja2VkIiwidXNlTWlkZGxlVUkiLCJ1c2VCb3R0b21VSSIsInVzZVByZXZpZXdVSSIsInRleHQiLCJjb25jYXQiLCJjbGljayIsInRvZ2dsZUN1c3RvbVVJVGV4dE1zZyIsInVzZVRvcFVJVGV4dE1zZyIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJVGV4dE1zZyIsInVpIiwidXNlRm9yY2VDb21wbGV0ZVVJIiwidXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSIsInN3aXRjaFRvU2VydmVyVGhyZXNob2xkIiwidXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VFbmNyeXB0TW9kZSIsInVzZUVuY3J5cHRPdmVyYWxsTW9kZSIsIm9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0Iiwib2NySW1hZ2VFeGNsdWRlS2V5bGlzdCIsImVuY3J5cHRPY3JSZXN1bHRFeGNsdWRlS2V5bGlzdCIsImVuY3J5cHRPY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0IiwidXNlTGVnYWN5Rm9ybWF0IiwidXNlSW1hZ2VDcm9wcGluZyIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwibWlycm9yTW9kZSIsInJvdGF0aW9uRGVncmVlIiwiY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZURlYnVnQWxlcnQiLCJmb3JjZV93YXNtX3JlbG9hZCIsImZvcmNlX3dhc21fcmVsb2FkX2ZsYWciLCJzb3VyY2UiLCJzcGxpdCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwiYXJyIiwic2V0QXR0cmlidXRlIiwiY29sb3IiLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiY29sb3JOb3RSZWFkeSIsImNvbG9yUmVhZHkiLCJjb2xvckRldGVjdFN1Y2Nlc3MiLCJjb2xvckRldGVjdEZhaWxlZCIsImNvbG9yT0NSUmVjb2duaXplZCIsImNvbG9yU3VjY2VzcyIsImNvbG9yRmFpbGVkIiwiZnJhbWVCb3JkZXJTdHlsZSIsIl9vYmplY3RTcHJlYWQiLCJ3aWR0aCIsInJhZGl1cyIsIm5vdF9yZWFkeSIsInJlYWR5IiwiZGV0ZWN0X2ZhaWxlZCIsImRldGVjdF9zdWNjZXNzIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3JfZmFpbGVkIiwib2NyX3N1Y2Nlc3MiLCJvY3Jfc3VjY2Vzc193aXRoX3NzYSIsIm1hc2tGcmFtZUNvbG9yTm90UmVhZHkiLCJtYXNrRnJhbWVDb2xvclJlYWR5IiwibWFza0ZyYW1lQ29sb3JEZXRlY3RTdWNjZXNzIiwibWFza0ZyYW1lQ29sb3JEZXRlY3RGYWlsZWQiLCJtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQiLCJtYXNrRnJhbWVDb2xvclN1Y2Nlc3MiLCJtYXNrRnJhbWVDb2xvckZhaWxlZCIsIm1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yIiwibWFza0ZyYW1lU3R5bGUiLCJiYXNlX2NvbG9yIiwiaGVpZ2h0IiwicmVzb2x1dGlvbldpZHRoIiwicmVzb2x1dGlvbkhlaWdodCIsInJlc29sdXRpb25FeHBlbmRSYXRpbyIsIl9fdHlwZSIsIl9fb25DbGlja1N0YXJ0Iiwibm9kZU5hbWUiLCJ1c2VGYWNlSW1hZ2UiLCJfX29uQ2xpY2tSZXN0YXJ0IiwiX19vY3JFeGNsdWRlT3B0aW9uc1NldHRpbmciLCJvY3JSZXN1bHRLZXlzIiwidGl0bGUiLCJvY3JJbWFnZUtleXMiLCJpbnNlcnRFeGNsdWRlS2V5T3B0aW9ucyIsImtleXMiLCJodG1sIiwibWFwIiwia2V5Iiwiam9pbiIsImluc2VydEFkamFjZW50SFRNTCIsImFkZEtleUxpc3QiLCJmaWx0ZXIiLCJ2IiwicmVtb3ZlS2V5TGlzdCIsInQiLCJleGNsdWRlS2V5bGlzdEhhbmRsZXIiLCJzZXR0aW5nVGFyZ2V0IiwibmFtZSIsIl9fc2V0QWN0aXZlQnV0dG9uIiwidHlwZSIsInJlc2V0QnV0dG9uIiwiYnV0dG9ucyIsImJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSJdLCJzb3VyY2VzIjpbImpzL3VpX3NpbXVsYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaW5zdGFuY2U7XG5jbGFzcyBVSVNpbXVsYXRvciB7XG4gIC8qKiBwcml2YXRlIHByb3BlcnRpZXMgKi9cbiAgX19vbkNsaWNrU3RhcnRDYWxsYmFjaztcbiAgX19vbkNsaWNrUmVzdGFydENhbGxiYWNrO1xuICBfX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaztcbiAgX190eXBlO1xuICBfX3NldHRpbmdzID0ge1xuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJ1xuICB9O1xuXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xuICBjb25zdHJ1Y3RvcihvbkNsaWNrU3RhcnRDYWxsYmFjaywgb25DbGlja1Jlc3RhcnRDYWxsYmFjaywgb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKSB7XG4gICAgaWYgKCEhIW9uQ2xpY2tTdGFydENhbGxiYWNrIHx8ICEhIW9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25DbGljayBjYWxsYmFjayBmdW5jdGlvbiBwYXJhbWV0ZXIgaXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZSkgcmV0dXJuIGluc3RhbmNlO1xuICAgIGluc3RhbmNlID0gdGhpcztcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0Q2FsbGJhY2sgPSBvbkNsaWNrU3RhcnRDYWxsYmFjaztcbiAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnRDYWxsYmFjayA9IG9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2s7XG4gICAgdGhpcy5fX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjayA9IG9uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaztcbiAgICB0aGlzLl9fYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbiAgX19iaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNldHRpbmdzLXNlY3Rpb24gaW5wdXQnKS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcik7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29uYm9hcmRpbmctc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmctc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgaWYgKHRoaXMuX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24gI3ByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmctc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbiAucHJldicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZFRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCB0b2dnbGVFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmlkPy5pbmNsdWRlcygndG9nZ2xlJykgPyBldmVudC50YXJnZXQgOiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRvZ2dsZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0b2dnbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgY2hldnJvbiA9IHRvZ2dsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNoZXZyb24nKTtcbiAgICAgICAgLy8gY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgLy8gY29uc3QgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yICsgJyBzcGFuJylcbiAgICAgICAgLy8gY29uc3QgY2hldnJvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IgKyAnIC5jaGV2cm9uJylcbiAgICAgICAgaWYgKHNlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzZWQnKSkge1xuICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1jaGV2cm9uLXVwJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaGV2cm9uLWRvd24nKTtcbiAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdb7KCR6riwXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICBjaGV2cm9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLWNoZXZyb24tZG93bicpO1xuICAgICAgICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZCgnZmEtY2hldnJvbi11cCcpO1xuICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1vtjrzsuZjquLBdJztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R5cGUtdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb2xsYXBzZWRUb2dnbGUpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzLXRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29sbGFwc2VkVG9nZ2xlKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2EtbWF4LXJldHJ5LWNvdW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zc2FNYXhSZXRyeUNvdW50ID0gaXNOYU4ocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpKSA/IDAgOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHNldFNzYVR5cGUgPSBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNzYVJldHJ5VHlwZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2EtdHlwZScpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldFNzYVR5cGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0b2dnbGVDdXN0b21VSSA9IChwb3NpdGlvbiwgZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlVG9wVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWlkZGxlVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQm90dG9tVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3ByZXZpZXcnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVByZXZpZXdVSSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1c2UtJHtwb3NpdGlvbn0tdWktdGV4dC1tc2dgKTtcbiAgICAgICAgaWYgKCFldmVudC50YXJnZXQuY2hlY2tlZCAmJiB0ZXh0Py5jaGVja2VkKSB7XG4gICAgICAgICAgdGV4dC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnID0gKHBvc2l0aW9uLCBldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VUb3BVSVRleHRNc2cgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWlkZGxlVUlUZXh0TXNnID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUJvdHRvbVVJVGV4dE1zZyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdWkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlLSR7cG9zaXRpb259LXVpYCk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCAmJiAhdWkuY2hlY2tlZCkge1xuICAgICAgICAgIHVpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXRvcC11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSSgndG9wJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtdG9wLXVpLXRleHQtbXNnJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJVGV4dE1zZygndG9wJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbWlkZGxlLXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJKCdtaWRkbGUnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1taWRkbGUtdWktdGV4dC1tc2cnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnKCdtaWRkbGUnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1ib3R0b20tdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ2JvdHRvbScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWJvdHRvbS11aS10ZXh0LW1zZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSVRleHRNc2coJ2JvdHRvbScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXByZXZpZXctdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ3ByZXZpZXcnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1mb3JjZS1jb21wbGV0ZS11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRm9yY2VDb21wbGV0ZVVJID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1hdXRvLXN3aXRjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2l0Y2gtdG8tc2VydmVyLXRocmVzaG9sZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1tYW51YWwtc3dpdGNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0QWxsTW9kZSA9ICFlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1hbGwtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1vdmVyYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW92ZXJhbGwtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE1vZGUgPSAhZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1vdmVyYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtb3ZlcmFsbC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0QWxsTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1vdmVyYWxsLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE92ZXJhbGxNb2RlID0gIWUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2NyLXJlc3VsdC1leGNsdWRlLWtleWxpc3QtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3Mub2NyUmVzdWx0RXhjbHVkZUtleWxpc3QgPSAnJztcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3Mub2NySW1hZ2VFeGNsdWRlS2V5bGlzdCA9ICcnO1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy5lbmNyeXB0T2NyUmVzdWx0RXhjbHVkZUtleWxpc3QgPSAnJztcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MuZW5jcnlwdE9jckltYWdlRXhjbHVkZUtleWxpc3QgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29jci1yZXN1bHQtZXhjbHVkZS1rZXlsaXN0LWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX19zZXR0aW5ncy5vY3JSZXN1bHRFeGNsdWRlS2V5bGlzdDtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fX3NldHRpbmdzLm9jckltYWdlRXhjbHVkZUtleWxpc3Q7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX19zZXR0aW5ncy5lbmNyeXB0T2NyUmVzdWx0RXhjbHVkZUtleWxpc3Q7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX19zZXR0aW5ncy5lbmNyeXB0T2NySW1hZ2VFeGNsdWRlS2V5bGlzdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE92ZXJhbGxNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgLy8gZG9jdW1lbnRcbiAgICAgIC8vICAgLmdldEVsZW1lbnRCeUlkKCd1c2UtcGlpLWVuY3J5cHQtbW9kZScpXG4gICAgICAvLyAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuX19zZXR0aW5ncy51c2VQaWlFbmNyeXB0TW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAvLyAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvL1xuICAgICAgLy8gZG9jdW1lbnRcbiAgICAgIC8vICAgLmdldEVsZW1lbnRCeUlkKCd1c2UtcGlpLWVuY3J5cHQtZmFjZScpXG4gICAgICAvLyAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuX19zZXR0aW5ncy51c2VQaWlFbmNyeXB0RmFjZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAvLyAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1sZWdhY3ktZm9ybWF0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VMZWdhY3lGb3JtYXQgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWltYWdlLWNvcnJlY3Rpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAndXNlSW1hZ2VDcm9wcGluZycpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlSW1hZ2VDcm9wcGluZyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlV2FycGluZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAndXNlSW1hZ2VXYXJwaW5nJykge1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VJbWFnZUNyb3BwaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlV2FycGluZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlQ3JvcHBpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlSW1hZ2VXYXJwaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1jb21wcmVzcy1pbWFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UtbWF4LXdpZHRoJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1jb21wcmVzcy1pbWFnZS1tYXgtdm9sdW1lJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaXJyb3ItbW9kZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MubWlycm9yTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGlvbi1kZWdyZWUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnJvdGF0aW9uRGVncmVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW1lcmEtcmVzb2x1dGlvbi1jcml0ZXJpYScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW1lcmEtcmVzb3VyY2UtcmVxdWVzdC1yZXRyeS1saW1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc291cmNlLXJlcXVlc3QtcmV0cnktaW50ZXJ2YWwnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1aWRlLWJveC1jcml0ZXJpYScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctY2xpcGJvYXJkJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zaG93Q2xpcEZyYW1lID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctY2FudmFzLXByZXZpZXcnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNob3dDYW52YXNQcmV2aWV3ID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1kZWJ1Zy1hbGVydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRGVidWdBbGVydCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JjZV93YXNtX3JlbG9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuZm9yY2Vfd2FzbV9yZWxvYWQgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICBpZiAoIWUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MuZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JjZV93YXNtX3JlbG9hZF9mbGFnJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9jZV93YXNtX3JlbG9hZCcpLnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZyA9IGNoZWNrZWQgPyBlLnRhcmdldC52YWx1ZSA6ICcnO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykudmFsdWUgPT09ICdjdXN0b20nKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS52YWx1ZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1jdXN0b20nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykudmFsdWUuc3BsaXQoJ3gnKTtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBbZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24td2lkdGgnKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24taGVpZ2h0JyldO1xuICAgICAgICAgIFt0YXJnZXRbMF0udmFsdWUsIHRhcmdldFsxXS52YWx1ZV0gPSBbc291cmNlWzBdLCBzb3VyY2VbMV1dO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbWFzay1mcmFtZS1jb2xvci1jaGFuZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1kZWZhdWx0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1jdXN0b20nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1kZWZhdWx0Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1yZXZlcnNlLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhcnIgPSBbZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24td2lkdGgnKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24taGVpZ2h0JyldO1xuICAgICAgICBbYXJyWzBdLnZhbHVlLCBhcnJbMV0udmFsdWVdID0gW2FyclsxXS52YWx1ZSwgYXJyWzBdLnZhbHVlXTsgLy8gc3dhcFxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zZXR0aW5ncycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zZXR0aW5ncycpO1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB0YXJnZXQucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gJ+yEpOyglSDsoIHsmqnrkKgnO1xuICAgICAgICB0YXJnZXQucXVlcnlTZWxlY3RvcignaScpLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2knKS5zdHlsZS5jb2xvciA9ICcjNWNiODVjJztcblxuICAgICAgICAvLyDsnbjsi50g7ZSE66CI7J6EIOyKpO2DgOydvFxuICAgICAgICBjb25zdCBib3JkZXJXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3JkZXItd2lkdGgnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgYm9yZGVyU3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXN0eWxlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3JkZXItcmFkaXVzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yTm90UmVhZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itbm90LXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yUmVhZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3ItcmVhZHknKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JEZXRlY3RTdWNjZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLWRldGVjdC1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yRGV0ZWN0RmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLWRldGVjdC1mYWlsZWQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JPQ1JSZWNvZ25pemVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLW9jci1yZWNvZ25pemVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yU3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yRmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLWZhaWxlZCcpLnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuZnJhbWVCb3JkZXJTdHlsZSA9IHtcbiAgICAgICAgICAuLi50aGlzLl9fc2V0dGluZ3MuZnJhbWVCb3JkZXJTdHlsZSxcbiAgICAgICAgICB3aWR0aDogYm9yZGVyV2lkdGgsXG4gICAgICAgICAgc3R5bGU6IGJvcmRlclN0eWxlLFxuICAgICAgICAgIHJhZGl1czogYm9yZGVyUmFkaXVzLFxuICAgICAgICAgIG5vdF9yZWFkeTogY29sb3JOb3RSZWFkeSxcbiAgICAgICAgICByZWFkeTogY29sb3JSZWFkeSxcbiAgICAgICAgICBkZXRlY3RfZmFpbGVkOiBjb2xvckRldGVjdEZhaWxlZCxcbiAgICAgICAgICBkZXRlY3Rfc3VjY2VzczogY29sb3JEZXRlY3RTdWNjZXNzLFxuICAgICAgICAgIHJlY29nbml6ZWQ6IGNvbG9yT0NSUmVjb2duaXplZCxcbiAgICAgICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiBjb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgb2NyX2ZhaWxlZDogY29sb3JGYWlsZWQsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3M6IGNvbG9yU3VjY2VzcyxcbiAgICAgICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogY29sb3JTdWNjZXNzXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8g66eI7Iqk7YK5IO2UhOugiOyehCDsiqTtg4DsnbxcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JOb3RSZWFkeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLW5vdC1yZWFkeScpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvclJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItcmVhZHknKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JEZXRlY3RTdWNjZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGV0ZWN0LXN1Y2Nlc3MnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JEZXRlY3RGYWlsZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1kZXRlY3QtZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yT0NSUmVjb2duaXplZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLW9jci1yZWNvZ25pemVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yU3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLXN1Y2Nlc3MnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JGYWlsZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1mYWlsZWQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JCYXNlQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1iYXNlLWNvbG9yJykudmFsdWU7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5tYXNrRnJhbWVTdHlsZSA9IHtcbiAgICAgICAgICAuLi50aGlzLl9fc2V0dGluZ3MubWFza0ZyYW1lU3R5bGUsXG4gICAgICAgICAgYmFzZV9jb2xvcjogbWFza0ZyYW1lQ29sb3JCYXNlQ29sb3IsXG4gICAgICAgICAgbm90X3JlYWR5OiBtYXNrRnJhbWVDb2xvck5vdFJlYWR5LFxuICAgICAgICAgIHJlYWR5OiBtYXNrRnJhbWVDb2xvclJlYWR5LFxuICAgICAgICAgIGRldGVjdF9mYWlsZWQ6IG1hc2tGcmFtZUNvbG9yRGV0ZWN0RmFpbGVkLFxuICAgICAgICAgIGRldGVjdF9zdWNjZXNzOiBtYXNrRnJhbWVDb2xvckRldGVjdFN1Y2Nlc3MsXG4gICAgICAgICAgcmVjb2duaXplZDogbWFza0ZyYW1lQ29sb3JPQ1JSZWNvZ25pemVkLFxuICAgICAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6IG1hc2tGcmFtZUNvbG9yT0NSUmVjb2duaXplZCxcbiAgICAgICAgICBvY3JfZmFpbGVkOiBtYXNrRnJhbWVDb2xvckZhaWxlZCxcbiAgICAgICAgICBvY3Jfc3VjY2VzczogbWFza0ZyYW1lQ29sb3JTdWNjZXNzLFxuICAgICAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiBtYXNrRnJhbWVDb2xvclN1Y2Nlc3NcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykudmFsdWUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXNpbXVsYXRpb24tZnJhbWUnKS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXNpbXVsYXRpb24tZnJhbWUnKS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXNvbHV0aW9uV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi13aWR0aCcpLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHJlc29sdXRpb25IZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1oZWlnaHQnKS52YWx1ZTtcbiAgICAgICAgICBjb25zdCByZXNvbHV0aW9uRXhwZW5kUmF0aW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1leHBlbmQtcmF0aW8nKS52YWx1ZTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUud2lkdGggPSByZXNvbHV0aW9uV2lkdGggKiByZXNvbHV0aW9uRXhwZW5kUmF0aW8gKyAncHgnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXNpbXVsYXRpb24tZnJhbWUnKS5zdHlsZS5oZWlnaHQgPSByZXNvbHV0aW9uSGVpZ2h0ICogcmVzb2x1dGlvbkV4cGVuZFJhdGlvICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fX3R5cGUpIHtcbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24gLnR5cGUtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgICAgIHRoaXMuX190eXBlID0gZS50YXJnZXQuaWQ7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSAnYWxpZW50LWJhY2snKSB7XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRmFjZUltYWdlID0gZmFsc2U7IC8vIOyZuOq1reyduOuTseuhneymnSDrkrfrqbTsnYAg7Ja86rW0IOyXhuydjFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX19vbkNsaWNrU3RhcnQoKTtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbXVsYXRvci1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbXVsYXRvci1zZWN0aW9uIC5wcmV2LWJ1dHRvbiBzcGFuJykudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydF9idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5fX29uQ2xpY2tSZXN0YXJ0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX19vY3JFeGNsdWRlT3B0aW9uc1NldHRpbmcoKTtcbiAgICB9O1xuICB9XG4gIF9fb25DbGlja1N0YXJ0KCkge1xuICAgIC8vIHRoaXMuX19zZXRBY3RpdmVCdXR0b24odGhpcy5fX3R5cGUpO1xuICAgIHRoaXMuX19vbkNsaWNrU3RhcnRDYWxsYmFjayh0aGlzLl9fdHlwZSwgdGhpcy5fX3NldHRpbmdzKTtcbiAgfVxuICBfX29uQ2xpY2tSZXN0YXJ0KCkge1xuICAgIHRoaXMuX19vbkNsaWNrUmVzdGFydENhbGxiYWNrKCk7XG4gIH1cbiAgX19vY3JFeGNsdWRlT3B0aW9uc1NldHRpbmcoKSB7XG4gICAgY29uc3Qgb2NyUmVzdWx0S2V5cyA9IFt7XG4gICAgICB0aXRsZTogJ+yghOyytCcsXG4gICAgICB2YWx1ZTogJ2FsbCdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yLoOu2hOymnSDsooXrpZgnLFxuICAgICAgdmFsdWU6ICdyZXN1bHRfc2Nhbl90eXBlJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7J2066aEJyxcbiAgICAgIHZhbHVlOiAnbmFtZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yjvOuvvOuTseuhneuyiO2YuCcsXG4gICAgICB2YWx1ZTogJ2p1bWluJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn67Cc6riJ7J287J6QJyxcbiAgICAgIHZhbHVlOiAnaXNzdWVkX2RhdGUnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfrsJzquIkg7ZaJ7KCV6rWs7JetJyxcbiAgICAgIHZhbHVlOiAncmVnaW9uJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAnY29sb3JfcG9pbnQnLFxuICAgICAgdmFsdWU6ICdjb2xvcl9wb2ludCdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yLoOu2hOymnSDsg4Eg7Ja86rW0IOyijO2RnCcsXG4gICAgICB2YWx1ZTogJ2ZvdW5kX2ZhY2UnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsi6DrtoTspp0g7IOBIOuIiCDsooztkZwnLFxuICAgICAgdmFsdWU6ICdmb3VuZF9leWUnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICdPQ1Ig7Iuc7J6R7Iuc6rCEJyxcbiAgICAgIHZhbHVlOiAnc3RhcnRfdGltZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ09DUiDsooXro4zsi5zqsIQnLFxuICAgICAgdmFsdWU6ICdlbmRfdGltZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yDneuFhOyblOydvCcsXG4gICAgICB2YWx1ZTogJ2JpcnRoJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7ZW07Jm46rGw7KO8IOyXrOu2gCcsXG4gICAgICB2YWx1ZTogJ292ZXJzZWFzX3Jlc2lkZW50J1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7Jq07KCE66m07ZeIIOuyiO2YuCcsXG4gICAgICB2YWx1ZTogJ2RyaXZlcl9udW1iZXInXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsmrTsoITrqbTtl4jspp0g7Iuc66as7Ja867KI7Zi4JyxcbiAgICAgIHZhbHVlOiAnZHJpdmVyX3NlcmlhbCdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+uptO2XiCDsooXrpZgnLFxuICAgICAgdmFsdWU6ICdkcml2ZXJfdHlwZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yggeyEseqygOyCrCDqsLHsi6DquLDqsIQg7Iuc7J6R7J28JyxcbiAgICAgIHZhbHVlOiAnYXB0aXR1ZGVfdGVzdF9kYXRlX3N0YXJ0J1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7KCB7ISx6rKA7IKsIOqwseyLoOq4sOqwhCDsooXro4zsnbwnLFxuICAgICAgdmFsdWU6ICdhcHRpdHVkZV90ZXN0X2RhdGVfZW5kJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7ISxJyxcbiAgICAgIHZhbHVlOiAnc3VyX25hbWUnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsnbTrpoQgKG5hbWXqs7wg67OE64+EKScsXG4gICAgICB2YWx1ZTogJ2dpdmVuX25hbWUnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsl6zqtowg7KKF66WYJyxcbiAgICAgIHZhbHVlOiAncGFzc3BvcnRfdHlwZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+uwnOq4iSDqta3qsIAnLFxuICAgICAgdmFsdWU6ICdpc3N1aW5nX2NvdW50cnknXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsl6zqtowg67KI7Zi4JyxcbiAgICAgIHZhbHVlOiAncGFzc3BvcnRfbnVtYmVyJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn6rWt7KCBJyxcbiAgICAgIHZhbHVlOiAnbmF0aW9uYWxpdHknXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfshLHrs4QnLFxuICAgICAgdmFsdWU6ICdzZXgnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsl6zqtowg66eM66OM7J28JyxcbiAgICAgIHZhbHVlOiAnZXhwaXJ5X2RhdGUnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICdwZXJzb25hbF9udW1iZXInLFxuICAgICAgdmFsdWU6ICdwZXJzb25hbF9udW1iZXInXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICftlZzquIDshLHrqoUnLFxuICAgICAgdmFsdWU6ICduYW1lX2tvcidcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yXrOq2jCDtlZjri6ggTVJaMScsXG4gICAgICB2YWx1ZTogJ21yejEnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsl6zqtowg7ZWY64uoIE1SWjInLFxuICAgICAgdmFsdWU6ICdtcnoyJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7LK066WY7J6Q6rKpJyxcbiAgICAgIHZhbHVlOiAndmlzYV90eXBlJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7IKs67O47YyQ67OEIOqysOqzvCcsXG4gICAgICB2YWx1ZTogJ2lkX3RydXRoJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7IKs67O47YyQ67OEIGNvbmZpZGVuY2UnLFxuICAgICAgdmFsdWU6ICdmZF9jb25maWRlbmNlJ1xuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAn7IKs67O47YyQ67OEIOyerOyLnOuPhCDtmp/siJgnLFxuICAgICAgdmFsdWU6ICdpZF90cnV0aF9yZXRyeV9jb3VudCdcbiAgICB9XTtcbiAgICBjb25zdCBvY3JJbWFnZUtleXMgPSBbe1xuICAgICAgdGl0bGU6ICfsoITssrQnLFxuICAgICAgdmFsdWU6ICdhbGwnXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICfsm5Drs7gg7J2066+47KeAJyxcbiAgICAgIHZhbHVlOiAnb2NyX29yaWdpbl9pbWFnZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+uniOyKpO2CuSDsnbTrr7jsp4AnLFxuICAgICAgdmFsdWU6ICdvY3JfbWFza2luZ19pbWFnZSdcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ+yWvOq1tCDsnbTrr7jsp4AnLFxuICAgICAgdmFsdWU6ICdvY3JfZmFjZV9pbWFnZSdcbiAgICB9XTtcbiAgICBjb25zdCBpbnNlcnRFeGNsdWRlS2V5T3B0aW9ucyA9ICh0YXJnZXQsIGtleXMpID0+IHtcbiAgICAgIGNvbnN0IGh0bWwgPSBrZXlzLm1hcChrZXkgPT4ge1xuICAgICAgICByZXR1cm4gYDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHt0YXJnZXR9LSR7a2V5LnZhbHVlfVwiIG5hbWU9XCIke3RhcmdldH0ta2V5bGlzdFwiIHZhbHVlPVwiJHtrZXkudmFsdWV9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7dGFyZ2V0fS0ke2tleS52YWx1ZX1cIj4ke2tleS52YWx1ZX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9saT5gO1xuICAgICAgfSkuam9pbignJyk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGB1bCMke3RhcmdldH0ta2V5bGlzdC13cmFwcGVyYCkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaHRtbCk7XG4gICAgfTtcblxuICAgIC8vIERPTSDshLjtjIVcbiAgICBpbnNlcnRFeGNsdWRlS2V5T3B0aW9ucygnb2NyLXJlc3VsdC1leGNsdWRlJywgb2NyUmVzdWx0S2V5cyk7XG4gICAgaW5zZXJ0RXhjbHVkZUtleU9wdGlvbnMoJ29jci1pbWFnZS1leGNsdWRlJywgb2NySW1hZ2VLZXlzKTtcbiAgICBpbnNlcnRFeGNsdWRlS2V5T3B0aW9ucygnZW5jcnlwdC1vY3ItcmVzdWx0LWV4Y2x1ZGUnLCBvY3JSZXN1bHRLZXlzKTtcbiAgICBpbnNlcnRFeGNsdWRlS2V5T3B0aW9ucygnZW5jcnlwdC1vY3ItaW1hZ2UtZXhjbHVkZScsIG9jckltYWdlS2V5cyk7XG4gICAgY29uc3QgYWRkS2V5TGlzdCA9ICh0YXJnZXQsIGtleSkgPT4ge1xuICAgICAgcmV0dXJuIFsuLi50YXJnZXQuc3BsaXQoJywnKSwga2V5XS5maWx0ZXIodiA9PiAhIXYpLmpvaW4oJywnKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlbW92ZUtleUxpc3QgPSAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgIHJldHVybiB0YXJnZXQuc3BsaXQoJywnKS5maWx0ZXIodCA9PiB0ICE9PSBrZXkpLmpvaW4oJywnKTtcbiAgICB9O1xuXG4gICAgLy8g7J2067Kk7Yq4IO2VuOuTpOufrCDrk7HroZ1cbiAgICBjb25zdCBleGNsdWRlS2V5bGlzdEhhbmRsZXIgPSBlID0+IHtcbiAgICAgIGxldCBzZXR0aW5nVGFyZ2V0ID0gJyc7XG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIHN3aXRjaCAoZS50YXJnZXQubmFtZSkge1xuICAgICAgICBjYXNlICdvY3ItcmVzdWx0LWV4Y2x1ZGUta2V5bGlzdCc6XG4gICAgICAgICAgc2V0dGluZ1RhcmdldCA9ICdvY3JSZXN1bHRFeGNsdWRlS2V5bGlzdCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ29jci1pbWFnZS1leGNsdWRlLWtleWxpc3QnOlxuICAgICAgICAgIHNldHRpbmdUYXJnZXQgPSAnb2NySW1hZ2VFeGNsdWRlS2V5bGlzdCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VuY3J5cHQtb2NyLXJlc3VsdC1leGNsdWRlLWtleWxpc3QnOlxuICAgICAgICAgIHNldHRpbmdUYXJnZXQgPSAnZW5jcnlwdE9jclJlc3VsdEV4Y2x1ZGVLZXlsaXN0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5jcnlwdC1vY3ItaW1hZ2UtZXhjbHVkZS1rZXlsaXN0JzpcbiAgICAgICAgICBzZXR0aW5nVGFyZ2V0ID0gJ2VuY3J5cHRPY3JJbWFnZUV4Y2x1ZGVLZXlsaXN0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5nc1tzZXR0aW5nVGFyZ2V0XSA9IGFkZEtleUxpc3QodGhpcy5fX3NldHRpbmdzW3NldHRpbmdUYXJnZXRdLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Nbc2V0dGluZ1RhcmdldF0gPSByZW1vdmVLZXlMaXN0KHRoaXMuX19zZXR0aW5nc1tzZXR0aW5nVGFyZ2V0XSwgZS50YXJnZXQudmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNvY3ItcmVzdWx0LWV4Y2x1ZGUta2V5bGlzdC1kaXYgaW5wdXQnKS5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGV4Y2x1ZGVLZXlsaXN0SGFuZGxlcikpO1xuICB9XG4gIF9fc2V0QWN0aXZlQnV0dG9uKHR5cGUpIHtcbiAgICB0aGlzLnJlc2V0QnV0dG9uKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHlwZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH1cbiAgcmVzZXRCdXR0b24oKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG4gIF9fc2F2ZVNldHRpbmdzSGFuZGxlcigpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zZXR0aW5ncycpO1xuICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5mYS1jaGVjaycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJXsoIHsmqknO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBVSVNpbXVsYXRvcjsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBUTtBQUNaLE1BQU1DLFdBQVcsQ0FBQztFQUNoQjs7RUFTQTtFQUNBQyxXQUFXQSxDQUFDQyxvQkFB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
