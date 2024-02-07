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