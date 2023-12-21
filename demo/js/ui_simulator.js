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
        } else {
          document.getElementById('use-encrypt-all-mode-div').style.display = 'block';
        }
        this.__settings.useEncryptMode = e.target.checked;
        this.__saveSettingsHandler();
      });
      document.getElementById('use-encrypt-all-mode').addEventListener('change', e => {
        if (e.target.checked) {
          this.__settings.useEncryptMode = !e.target.checked;
          document.getElementById('use-encrypt-mode-div').style.display = 'none';
        } else {
          document.getElementById('use-encrypt-mode-div').style.display = 'block';
        }
        this.__settings.useEncryptAllMode = e.target.checked;
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
      document.getElementById('use-image-warping').addEventListener('change', e => {
        this.__settings.useImageWarping = e.target.checked;
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
    };
  }
  __onClickStart() {
    // this.__setActiveButton(this.__type);
    this.__onClickStartCallback(this.__type, this.__settings);
  }
  __onClickRestart() {
    this.__onClickRestartCallback();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWlfc2ltdWxhdG9yLmpzIiwibmFtZXMiOlsiaW5zdGFuY2UiLCJVSVNpbXVsYXRvciIsImNvbnN0cnVjdG9yIiwib25DbGlja1N0YXJ0Q2FsbGJhY2siLCJvbkNsaWNrUmVzdGFydENhbGxiYWNrIiwib25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwic3NhUmV0cnlUeXBlIiwiRXJyb3IiLCJfX29uQ2xpY2tTdGFydENhbGxiYWNrIiwiX19vbkNsaWNrUmVzdGFydENhbGxiYWNrIiwiX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2siLCJfX2JpbmRFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fc2F2ZVNldHRpbmdzSGFuZGxlciIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbGxhcHNlZFRvZ2dsZSIsImV2ZW50IiwiX2V2ZW50JHRhcmdldCRpZCIsInRvZ2dsZUVsZW1lbnQiLCJ0YXJnZXQiLCJpZCIsImluY2x1ZGVzIiwicGFyZW50RWxlbWVudCIsInNlY3Rpb24iLCJsYWJlbCIsImNoZXZyb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwiX19zZXR0aW5ncyIsInNzYU1heFJldHJ5Q291bnQiLCJpc05hTiIsInBhcnNlSW50IiwidmFsdWUiLCJzZXRTc2FUeXBlIiwiZWwiLCJ0b2dnbGVDdXN0b21VSSIsInBvc2l0aW9uIiwidXNlVG9wVUkiLCJjaGVja2VkIiwidXNlTWlkZGxlVUkiLCJ1c2VCb3R0b21VSSIsInVzZVByZXZpZXdVSSIsInRleHQiLCJjb25jYXQiLCJjbGljayIsInRvZ2dsZUN1c3RvbVVJVGV4dE1zZyIsInVzZVRvcFVJVGV4dE1zZyIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJVGV4dE1zZyIsInVpIiwidXNlRm9yY2VDb21wbGV0ZVVJIiwidXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSIsInN3aXRjaFRvU2VydmVyVGhyZXNob2xkIiwidXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VFbmNyeXB0TW9kZSIsInVzZUxlZ2FjeUZvcm1hdCIsInVzZUltYWdlV2FycGluZyIsInVzZUNvbXByZXNzSW1hZ2UiLCJ1c2VDb21wcmVzc0ltYWdlTWF4V2lkdGgiLCJ1c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lIiwibWlycm9yTW9kZSIsInJvdGF0aW9uRGVncmVlIiwiY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhIiwiY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwiLCJjYWxjR3VpZGVCb3hDcml0ZXJpYSIsInNob3dDbGlwRnJhbWUiLCJzaG93Q2FudmFzUHJldmlldyIsInVzZURlYnVnQWxlcnQiLCJmb3JjZV93YXNtX3JlbG9hZCIsImZvcmNlX3dhc21fcmVsb2FkX2ZsYWciLCJzb3VyY2UiLCJzcGxpdCIsInVzZU1hc2tGcmFtZUNvbG9yQ2hhbmdlIiwiYXJyIiwic2V0QXR0cmlidXRlIiwiY29sb3IiLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiYm9yZGVyUmFkaXVzIiwiY29sb3JOb3RSZWFkeSIsImNvbG9yUmVhZHkiLCJjb2xvckRldGVjdFN1Y2Nlc3MiLCJjb2xvckRldGVjdEZhaWxlZCIsImNvbG9yT0NSUmVjb2duaXplZCIsImNvbG9yU3VjY2VzcyIsImNvbG9yRmFpbGVkIiwiZnJhbWVCb3JkZXJTdHlsZSIsIl9vYmplY3RTcHJlYWQiLCJ3aWR0aCIsInJhZGl1cyIsIm5vdF9yZWFkeSIsInJlYWR5IiwiZGV0ZWN0X2ZhaWxlZCIsImRldGVjdF9zdWNjZXNzIiwicmVjb2duaXplZCIsInJlY29nbml6ZWRfd2l0aF9zc2EiLCJvY3JfZmFpbGVkIiwib2NyX3N1Y2Nlc3MiLCJvY3Jfc3VjY2Vzc193aXRoX3NzYSIsIm1hc2tGcmFtZUNvbG9yTm90UmVhZHkiLCJtYXNrRnJhbWVDb2xvclJlYWR5IiwibWFza0ZyYW1lQ29sb3JEZXRlY3RTdWNjZXNzIiwibWFza0ZyYW1lQ29sb3JEZXRlY3RGYWlsZWQiLCJtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQiLCJtYXNrRnJhbWVDb2xvclN1Y2Nlc3MiLCJtYXNrRnJhbWVDb2xvckZhaWxlZCIsIm1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yIiwibWFza0ZyYW1lU3R5bGUiLCJiYXNlX2NvbG9yIiwiaGVpZ2h0IiwicmVzb2x1dGlvbldpZHRoIiwicmVzb2x1dGlvbkhlaWdodCIsInJlc29sdXRpb25FeHBlbmRSYXRpbyIsIl9fdHlwZSIsIl9fb25DbGlja1N0YXJ0Iiwibm9kZU5hbWUiLCJ1c2VGYWNlSW1hZ2UiLCJfX29uQ2xpY2tSZXN0YXJ0IiwiX19zZXRBY3RpdmVCdXR0b24iLCJ0eXBlIiwicmVzZXRCdXR0b24iLCJidXR0b25zIiwiYnV0dG9uIiwicmVtb3ZlQXR0cmlidXRlIl0sInNvdXJjZXMiOlsianMvdWlfc2ltdWxhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBpbnN0YW5jZTtcbmNsYXNzIFVJU2ltdWxhdG9yIHtcbiAgLyoqIHByaXZhdGUgcHJvcGVydGllcyAqL1xuICBfX29uQ2xpY2tTdGFydENhbGxiYWNrO1xuICBfX29uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2s7XG4gIF9fb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrO1xuICBfX3R5cGU7XG4gIF9fc2V0dGluZ3MgPSB7XG4gICAgc3NhUmV0cnlUeXBlOiAnRU5TRU1CTEUnXG4gIH07XG5cbiAgLyoqIGNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKG9uQ2xpY2tTdGFydENhbGxiYWNrLCBvbkNsaWNrUmVzdGFydENhbGxiYWNrLCBvbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2spIHtcbiAgICBpZiAoISEhb25DbGlja1N0YXJ0Q2FsbGJhY2sgfHwgISEhb25DbGlja1Jlc3RhcnRDYWxsYmFjaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbkNsaWNrIGNhbGxiYWNrIGZ1bmN0aW9uIHBhcmFtZXRlciBpcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gICAgaWYgKGluc3RhbmNlKSByZXR1cm4gaW5zdGFuY2U7XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuX19vbkNsaWNrU3RhcnRDYWxsYmFjayA9IG9uQ2xpY2tTdGFydENhbGxiYWNrO1xuICAgIHRoaXMuX19vbkNsaWNrUmVzdGFydENhbGxiYWNrID0gb25DbGlja1Jlc3RhcnRDYWxsYmFjaztcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrID0gb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrO1xuICAgIHRoaXMuX19iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuICBfX2JpbmRFdmVudExpc3RlbmVyKCkge1xuICAgIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2V0dGluZ3Mtc2VjdGlvbiBpbnB1dCcpLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKTtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb25ib2FyZGluZy1zdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25ib2FyZGluZy1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBpZiAodGhpcy5fX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbiAjcHJldicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25ib2FyZGluZy1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbXVsYXRvci1zZWN0aW9uIC5wcmV2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbXVsYXRvci1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY29sbGFwc2VkVG9nZ2xlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRvZ2dsZUVsZW1lbnQgPSBldmVudC50YXJnZXQuaWQ/LmluY2x1ZGVzKCd0b2dnbGUnKSA/IGV2ZW50LnRhcmdldCA6IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBzZWN0aW9uID0gdG9nZ2xlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRvZ2dsZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuICAgICAgICBjb25zdCBjaGV2cm9uID0gdG9nZ2xlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2hldnJvbicpO1xuICAgICAgICAvLyBjb25zdCBzZXR0aW5nc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICAvLyBjb25zdCBsYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IgKyAnIHNwYW4nKVxuICAgICAgICAvLyBjb25zdCBjaGV2cm9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciArICcgLmNoZXZyb24nKVxuICAgICAgICBpZiAoc2VjdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNlZCcpKSB7XG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICBjaGV2cm9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLWNoZXZyb24tdXAnKTtcbiAgICAgICAgICBjaGV2cm9uLmNsYXNzTGlzdC5hZGQoJ2ZhLWNoZXZyb24tZG93bicpO1xuICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1vsoJHquLBdJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgIGNoZXZyb24uY2xhc3NMaXN0LnJlbW92ZSgnZmEtY2hldnJvbi1kb3duJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaGV2cm9uLXVwJyk7XG4gICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSAnW+2OvOy5mOq4sF0nO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHlwZS10b2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbGxhcHNlZFRvZ2dsZSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3MtdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb2xsYXBzZWRUb2dnbGUpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NzYS1tYXgtcmV0cnktY291bnQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNzYU1heFJldHJ5Q291bnQgPSBpc05hTihwYXJzZUludChlLnRhcmdldC52YWx1ZSkpID8gMCA6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc2V0U3NhVHlwZSA9IGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc3NhUmV0cnlUeXBlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NzYS10eXBlJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0U3NhVHlwZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHRvZ2dsZUN1c3RvbVVJID0gKHBvc2l0aW9uLCBldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VUb3BVSSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNaWRkbGVVSSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VCb3R0b21VSSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncHJldmlldyc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlUHJldmlld1VJID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZS0ke3Bvc2l0aW9ufS11aS10ZXh0LW1zZ2ApO1xuICAgICAgICBpZiAoIWV2ZW50LnRhcmdldC5jaGVja2VkICYmIHRleHQ/LmNoZWNrZWQpIHtcbiAgICAgICAgICB0ZXh0LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH07XG4gICAgICBjb25zdCB0b2dnbGVDdXN0b21VSVRleHRNc2cgPSAocG9zaXRpb24sIGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVRvcFVJVGV4dE1zZyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNaWRkbGVVSVRleHRNc2cgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQm90dG9tVUlUZXh0TXNnID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1aSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1c2UtJHtwb3NpdGlvbn0tdWlgKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkICYmICF1aS5jaGVja2VkKSB7XG4gICAgICAgICAgdWkuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtdG9wLXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJKCd0b3AnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS10b3AtdWktdGV4dC1tc2cnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnKCd0b3AnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1taWRkbGUtdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ21pZGRsZScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1pZGRsZS11aS10ZXh0LW1zZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSVRleHRNc2coJ21pZGRsZScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWJvdHRvbS11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSSgnYm90dG9tJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtYm90dG9tLXVpLXRleHQtbXNnJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJVGV4dE1zZygnYm90dG9tJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtcHJldmlldy11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSSgncHJldmlldycsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWZvcmNlLWNvbXBsZXRlLXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VGb3JjZUNvbXBsZXRlVUkgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWF1dG8tc3dpdGNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VBdXRvU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3aXRjaC10by1zZXJ2ZXItdGhyZXNob2xkJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zd2l0Y2hUb1NlcnZlclRocmVzaG9sZCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1hbnVhbC1zd2l0Y2gnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1tb2RlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRBbGxNb2RlID0gIWUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LWFsbC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LWFsbC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0TW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1hbGwtbW9kZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0TW9kZSA9ICFlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRBbGxNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgLy8gZG9jdW1lbnRcbiAgICAgIC8vICAgLmdldEVsZW1lbnRCeUlkKCd1c2UtcGlpLWVuY3J5cHQtbW9kZScpXG4gICAgICAvLyAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuX19zZXR0aW5ncy51c2VQaWlFbmNyeXB0TW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAvLyAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvL1xuICAgICAgLy8gZG9jdW1lbnRcbiAgICAgIC8vICAgLmdldEVsZW1lbnRCeUlkKCd1c2UtcGlpLWVuY3J5cHQtZmFjZScpXG4gICAgICAvLyAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuX19zZXR0aW5ncy51c2VQaWlFbmNyeXB0RmFjZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAvLyAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1sZWdhY3ktZm9ybWF0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VMZWdhY3lGb3JtYXQgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWltYWdlLXdhcnBpbmcnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlV2FycGluZyA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUNvbXByZXNzSW1hZ2UgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWNvbXByZXNzLWltYWdlLW1heC13aWR0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UtbWF4LXZvbHVtZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWlycm9yLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLm1pcnJvck1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRpb24tZGVncmVlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5yb3RhdGlvbkRlZ3JlZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc29sdXRpb24tY3JpdGVyaWEnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc291cmNlLXJlcXVlc3QtcmV0cnktbGltaXQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbWVyYS1yZXNvdXJjZS1yZXF1ZXN0LXJldHJ5LWludGVydmFsJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWlkZS1ib3gtY3JpdGVyaWEnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbGNHdWlkZUJveENyaXRlcmlhID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWNsaXBib2FyZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc2hvd0NsaXBGcmFtZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWNhbnZhcy1wcmV2aWV3JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zaG93Q2FudmFzUHJldmlldyA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZGVidWctYWxlcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZURlYnVnQWxlcnQgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9yY2Vfd2FzbV9yZWxvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZvcmNlX3dhc21fcmVsb2FkID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgaWYgKCFlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZvcmNlX3dhc21fcmVsb2FkX2ZsYWcgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBjb25zdCBjaGVja2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvY2Vfd2FzbV9yZWxvYWQnKS52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZvcmNlX3dhc21fcmVsb2FkX2ZsYWcgPSBjaGVja2VkID8gZS50YXJnZXQudmFsdWUgOiAnJztcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAnY3VzdG9tJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykudmFsdWUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlLnNwbGl0KCd4Jyk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpXTtcbiAgICAgICAgICBbdGFyZ2V0WzBdLnZhbHVlLCB0YXJnZXRbMV0udmFsdWVdID0gW3NvdXJjZVswXSwgc291cmNlWzFdXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1hc2stZnJhbWUtY29sb3ItY2hhbmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGVmYXVsdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGVmYXVsdCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tcmV2ZXJzZS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYXJyID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpXTtcbiAgICAgICAgW2FyclswXS52YWx1ZSwgYXJyWzFdLnZhbHVlXSA9IFthcnJbMV0udmFsdWUsIGFyclswXS52YWx1ZV07IC8vIHN3YXBcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKTtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJUg7KCB7Jqp65CoJztcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2knKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKCdpJykuc3R5bGUuY29sb3IgPSAnIzVjYjg1Yyc7XG5cbiAgICAgICAgLy8g7J247IudIO2UhOugiOyehCDsiqTtg4DsnbxcbiAgICAgICAgY29uc3QgYm9yZGVyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXdpZHRoJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGJvcmRlclN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvcmRlci1zdHlsZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBib3JkZXJSYWRpdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXJhZGl1cycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvck5vdFJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLW5vdC1yZWFkeScpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvclJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yRGV0ZWN0U3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1kZXRlY3Qtc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckRldGVjdEZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1kZXRlY3QtZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yT0NSUmVjb2duaXplZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1vY3ItcmVjb2duaXplZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvclN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1mYWlsZWQnKS52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZyYW1lQm9yZGVyU3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fX3NldHRpbmdzLmZyYW1lQm9yZGVyU3R5bGUsXG4gICAgICAgICAgd2lkdGg6IGJvcmRlcldpZHRoLFxuICAgICAgICAgIHN0eWxlOiBib3JkZXJTdHlsZSxcbiAgICAgICAgICByYWRpdXM6IGJvcmRlclJhZGl1cyxcbiAgICAgICAgICBub3RfcmVhZHk6IGNvbG9yTm90UmVhZHksXG4gICAgICAgICAgcmVhZHk6IGNvbG9yUmVhZHksXG4gICAgICAgICAgZGV0ZWN0X2ZhaWxlZDogY29sb3JEZXRlY3RGYWlsZWQsXG4gICAgICAgICAgZGV0ZWN0X3N1Y2Nlc3M6IGNvbG9yRGV0ZWN0U3VjY2VzcyxcbiAgICAgICAgICByZWNvZ25pemVkOiBjb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogY29sb3JPQ1JSZWNvZ25pemVkLFxuICAgICAgICAgIG9jcl9mYWlsZWQ6IGNvbG9yRmFpbGVkLFxuICAgICAgICAgIG9jcl9zdWNjZXNzOiBjb2xvclN1Y2Nlc3MsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6IGNvbG9yU3VjY2Vzc1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOuniOyKpO2CuSDtlITroIjsnoQg7Iqk7YOA7J28XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yTm90UmVhZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1ub3QtcmVhZHknKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JSZWFkeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRGV0ZWN0U3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWRldGVjdC1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRGV0ZWN0RmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGV0ZWN0LWZhaWxlZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1vY3ItcmVjb2duaXplZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvclN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItYmFzZS1jb2xvcicpLnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MubWFza0ZyYW1lU3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fX3NldHRpbmdzLm1hc2tGcmFtZVN0eWxlLFxuICAgICAgICAgIGJhc2VfY29sb3I6IG1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yLFxuICAgICAgICAgIG5vdF9yZWFkeTogbWFza0ZyYW1lQ29sb3JOb3RSZWFkeSxcbiAgICAgICAgICByZWFkeTogbWFza0ZyYW1lQ29sb3JSZWFkeSxcbiAgICAgICAgICBkZXRlY3RfZmFpbGVkOiBtYXNrRnJhbWVDb2xvckRldGVjdEZhaWxlZCxcbiAgICAgICAgICBkZXRlY3Rfc3VjY2VzczogbWFza0ZyYW1lQ29sb3JEZXRlY3RTdWNjZXNzLFxuICAgICAgICAgIHJlY29nbml6ZWQ6IG1hc2tGcmFtZUNvbG9yT0NSUmVjb2duaXplZCxcbiAgICAgICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgb2NyX2ZhaWxlZDogbWFza0ZyYW1lQ29sb3JGYWlsZWQsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3M6IG1hc2tGcmFtZUNvbG9yU3VjY2VzcyxcbiAgICAgICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogbWFza0ZyYW1lQ29sb3JTdWNjZXNzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24td2lkdGgnKS52YWx1ZTtcbiAgICAgICAgICBjb25zdCByZXNvbHV0aW9uSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24taGVpZ2h0JykudmFsdWU7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbkV4cGVuZFJhdGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tZXhwZW5kLXJhdGlvJykudmFsdWU7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tc2ltdWxhdGlvbi1mcmFtZScpLnN0eWxlLndpZHRoID0gcmVzb2x1dGlvbldpZHRoICogcmVzb2x1dGlvbkV4cGVuZFJhdGlvICsgJ3B4JztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUuaGVpZ2h0ID0gcmVzb2x1dGlvbkhlaWdodCAqIHJlc29sdXRpb25FeHBlbmRSYXRpbyArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX190eXBlKSB7XG4gICAgICAgICAgdGhpcy5fX29uQ2xpY2tTdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uIC50eXBlLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICB0aGlzLl9fdHlwZSA9IGUudGFyZ2V0LmlkO1xuICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ2FsaWVudC1iYWNrJykge1xuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUZhY2VJbWFnZSA9IGZhbHNlOyAvLyDsmbjqta3snbjrk7HroZ3spp0g65K366m07J2AIOyWvOq1tCDsl4bsnYxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0KCk7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbiAucHJldi1idXR0b24gc3BhbicpLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnRfYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX19vbkNsaWNrUmVzdGFydCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBfX29uQ2xpY2tTdGFydCgpIHtcbiAgICAvLyB0aGlzLl9fc2V0QWN0aXZlQnV0dG9uKHRoaXMuX190eXBlKTtcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0Q2FsbGJhY2sodGhpcy5fX3R5cGUsIHRoaXMuX19zZXR0aW5ncyk7XG4gIH1cbiAgX19vbkNsaWNrUmVzdGFydCgpIHtcbiAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnRDYWxsYmFjaygpO1xuICB9XG4gIF9fc2V0QWN0aXZlQnV0dG9uKHR5cGUpIHtcbiAgICB0aGlzLnJlc2V0QnV0dG9uKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHlwZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH1cbiAgcmVzZXRCdXR0b24oKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG4gIF9fc2F2ZVNldHRpbmdzSGFuZGxlcigpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zZXR0aW5ncycpO1xuICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5mYS1jaGVjaycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJXsoIHsmqknO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBVSVNpbXVsYXRvcjsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBUTtBQUNaLE1BQU1DLFdBQVcsQ0FBQztFQUNoQjs7RUFTQTtFQUNBQyxXQUFXQSxDQUFDQyxvQkFBb0IsRUFBRUMsc0JBQXNCLEVBQUVDLDhCQUE4QixFQUFFO0lBQUFDLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQSxxQkFMN0U7TUFDWEMsWUFBWSxFQUFFO0lBQ2hCLENBQUM7SUFJQyxJQUFJLENBQUMsQ0FBQyxDQUFDSixvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQ0Msc0JBQXNCLEVBQUU7TUFDeEQsTUFBTSxJQUFJSSxLQUFLLENBQUMsa0RBQWtELENBQUM7SUFDckU7SUFDQSxJQUFJUixRQUFRLEVBQUUsT0FBT0EsUUFBUTtJQUM3QkEsUUFBUSxHQUFHLElBQUk7SUFDZixJQUFJLENBQUNTLHNCQUFzQixHQUFHTixvQkFBb0I7SUFDbEQsSUFBSSxDQUFDTyx3QkFBd0IsR0FBR04sc0JBQXNCO0lB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
