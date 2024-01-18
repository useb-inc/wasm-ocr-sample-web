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
        } else {
          document.getElementById('use-encrypt-mode-div').style.display = 'block';
          document.getElementById('use-encrypt-all-mode-div').style.display = 'block';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWlfc2ltdWxhdG9yLmpzIiwibmFtZXMiOlsiaW5zdGFuY2UiLCJVSVNpbXVsYXRvciIsImNvbnN0cnVjdG9yIiwib25DbGlja1N0YXJ0Q2FsbGJhY2siLCJvbkNsaWNrUmVzdGFydENhbGxiYWNrIiwib25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwic3NhUmV0cnlUeXBlIiwiRXJyb3IiLCJfX29uQ2xpY2tTdGFydENhbGxiYWNrIiwiX19vbkNsaWNrUmVzdGFydENhbGxiYWNrIiwiX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2siLCJfX2JpbmRFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fc2F2ZVNldHRpbmdzSGFuZGxlciIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbGxhcHNlZFRvZ2dsZSIsImV2ZW50IiwiX2V2ZW50JHRhcmdldCRpZCIsInRvZ2dsZUVsZW1lbnQiLCJ0YXJnZXQiLCJpZCIsImluY2x1ZGVzIiwicGFyZW50RWxlbWVudCIsInNlY3Rpb24iLCJsYWJlbCIsImNoZXZyb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwiX19zZXR0aW5ncyIsInNzYU1heFJldHJ5Q291bnQiLCJpc05hTiIsInBhcnNlSW50IiwidmFsdWUiLCJzZXRTc2FUeXBlIiwiZWwiLCJ0b2dnbGVDdXN0b21VSSIsInBvc2l0aW9uIiwidXNlVG9wVUkiLCJjaGVja2VkIiwidXNlTWlkZGxlVUkiLCJ1c2VCb3R0b21VSSIsInVzZVByZXZpZXdVSSIsInRleHQiLCJjb25jYXQiLCJjbGljayIsInRvZ2dsZUN1c3RvbVVJVGV4dE1zZyIsInVzZVRvcFVJVGV4dE1zZyIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJVGV4dE1zZyIsInVpIiwidXNlRm9yY2VDb21wbGV0ZVVJIiwidXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSIsInN3aXRjaFRvU2VydmVyVGhyZXNob2xkIiwidXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlIiwidXNlRW5jcnlwdEFsbE1vZGUiLCJ1c2VFbmNyeXB0TW9kZSIsInVzZUVuY3J5cHRPdmVyYWxsTW9kZSIsInVzZUxlZ2FjeUZvcm1hdCIsInVzZUltYWdlQ3JvcHBpbmciLCJ1c2VJbWFnZVdhcnBpbmciLCJ1c2VDb21wcmVzc0ltYWdlIiwidXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoIiwidXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSIsIm1pcnJvck1vZGUiLCJyb3RhdGlvbkRlZ3JlZSIsImNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsIiwiY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJzaG93Q2xpcEZyYW1lIiwic2hvd0NhbnZhc1ByZXZpZXciLCJ1c2VEZWJ1Z0FsZXJ0IiwiZm9yY2Vfd2FzbV9yZWxvYWQiLCJmb3JjZV93YXNtX3JlbG9hZF9mbGFnIiwic291cmNlIiwic3BsaXQiLCJ1c2VNYXNrRnJhbWVDb2xvckNoYW5nZSIsImFyciIsInNldEF0dHJpYnV0ZSIsImNvbG9yIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJTdHlsZSIsImJvcmRlclJhZGl1cyIsImNvbG9yTm90UmVhZHkiLCJjb2xvclJlYWR5IiwiY29sb3JEZXRlY3RTdWNjZXNzIiwiY29sb3JEZXRlY3RGYWlsZWQiLCJjb2xvck9DUlJlY29nbml6ZWQiLCJjb2xvclN1Y2Nlc3MiLCJjb2xvckZhaWxlZCIsImZyYW1lQm9yZGVyU3R5bGUiLCJfb2JqZWN0U3ByZWFkIiwid2lkdGgiLCJyYWRpdXMiLCJub3RfcmVhZHkiLCJyZWFkeSIsImRldGVjdF9mYWlsZWQiLCJkZXRlY3Rfc3VjY2VzcyIsInJlY29nbml6ZWQiLCJyZWNvZ25pemVkX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsIm9jcl9zdWNjZXNzIiwib2NyX3N1Y2Nlc3Nfd2l0aF9zc2EiLCJtYXNrRnJhbWVDb2xvck5vdFJlYWR5IiwibWFza0ZyYW1lQ29sb3JSZWFkeSIsIm1hc2tGcmFtZUNvbG9yRGV0ZWN0U3VjY2VzcyIsIm1hc2tGcmFtZUNvbG9yRGV0ZWN0RmFpbGVkIiwibWFza0ZyYW1lQ29sb3JPQ1JSZWNvZ25pemVkIiwibWFza0ZyYW1lQ29sb3JTdWNjZXNzIiwibWFza0ZyYW1lQ29sb3JGYWlsZWQiLCJtYXNrRnJhbWVDb2xvckJhc2VDb2xvciIsIm1hc2tGcmFtZVN0eWxlIiwiYmFzZV9jb2xvciIsImhlaWdodCIsInJlc29sdXRpb25XaWR0aCIsInJlc29sdXRpb25IZWlnaHQiLCJyZXNvbHV0aW9uRXhwZW5kUmF0aW8iLCJfX3R5cGUiLCJfX29uQ2xpY2tTdGFydCIsIm5vZGVOYW1lIiwidXNlRmFjZUltYWdlIiwiX19vbkNsaWNrUmVzdGFydCIsIl9fc2V0QWN0aXZlQnV0dG9uIiwidHlwZSIsInJlc2V0QnV0dG9uIiwiYnV0dG9ucyIsImJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSJdLCJzb3VyY2VzIjpbImpzL3VpX3NpbXVsYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaW5zdGFuY2U7XG5jbGFzcyBVSVNpbXVsYXRvciB7XG4gIC8qKiBwcml2YXRlIHByb3BlcnRpZXMgKi9cbiAgX19vbkNsaWNrU3RhcnRDYWxsYmFjaztcbiAgX19vbkNsaWNrUmVzdGFydENhbGxiYWNrO1xuICBfX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaztcbiAgX190eXBlO1xuICBfX3NldHRpbmdzID0ge1xuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJ1xuICB9O1xuXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xuICBjb25zdHJ1Y3RvcihvbkNsaWNrU3RhcnRDYWxsYmFjaywgb25DbGlja1Jlc3RhcnRDYWxsYmFjaywgb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKSB7XG4gICAgaWYgKCEhIW9uQ2xpY2tTdGFydENhbGxiYWNrIHx8ICEhIW9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25DbGljayBjYWxsYmFjayBmdW5jdGlvbiBwYXJhbWV0ZXIgaXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZSkgcmV0dXJuIGluc3RhbmNlO1xuICAgIGluc3RhbmNlID0gdGhpcztcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0Q2FsbGJhY2sgPSBvbkNsaWNrU3RhcnRDYWxsYmFjaztcbiAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnRDYWxsYmFjayA9IG9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2s7XG4gICAgdGhpcy5fX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjayA9IG9uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaztcbiAgICB0aGlzLl9fYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbiAgX19iaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNldHRpbmdzLXNlY3Rpb24gaW5wdXQnKS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcik7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29uYm9hcmRpbmctc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmctc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgaWYgKHRoaXMuX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24gI3ByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmctc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbiAucHJldicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZFRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCB0b2dnbGVFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmlkPy5pbmNsdWRlcygndG9nZ2xlJykgPyBldmVudC50YXJnZXQgOiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRvZ2dsZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0b2dnbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgY2hldnJvbiA9IHRvZ2dsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNoZXZyb24nKTtcbiAgICAgICAgLy8gY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgLy8gY29uc3QgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yICsgJyBzcGFuJylcbiAgICAgICAgLy8gY29uc3QgY2hldnJvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IgKyAnIC5jaGV2cm9uJylcbiAgICAgICAgaWYgKHNlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzZWQnKSkge1xuICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1jaGV2cm9uLXVwJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaGV2cm9uLWRvd24nKTtcbiAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdb7KCR6riwXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICBjaGV2cm9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLWNoZXZyb24tZG93bicpO1xuICAgICAgICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZCgnZmEtY2hldnJvbi11cCcpO1xuICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1vtjrzsuZjquLBdJztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R5cGUtdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb2xsYXBzZWRUb2dnbGUpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzLXRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29sbGFwc2VkVG9nZ2xlKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2EtbWF4LXJldHJ5LWNvdW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zc2FNYXhSZXRyeUNvdW50ID0gaXNOYU4ocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpKSA/IDAgOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHNldFNzYVR5cGUgPSBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNzYVJldHJ5VHlwZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2EtdHlwZScpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldFNzYVR5cGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0b2dnbGVDdXN0b21VSSA9IChwb3NpdGlvbiwgZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlVG9wVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWlkZGxlVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQm90dG9tVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3ByZXZpZXcnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVByZXZpZXdVSSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1c2UtJHtwb3NpdGlvbn0tdWktdGV4dC1tc2dgKTtcbiAgICAgICAgaWYgKCFldmVudC50YXJnZXQuY2hlY2tlZCAmJiB0ZXh0Py5jaGVja2VkKSB7XG4gICAgICAgICAgdGV4dC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnID0gKHBvc2l0aW9uLCBldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VUb3BVSVRleHRNc2cgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWlkZGxlVUlUZXh0TXNnID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUJvdHRvbVVJVGV4dE1zZyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdWkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlLSR7cG9zaXRpb259LXVpYCk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCAmJiAhdWkuY2hlY2tlZCkge1xuICAgICAgICAgIHVpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXRvcC11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSSgndG9wJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtdG9wLXVpLXRleHQtbXNnJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJVGV4dE1zZygndG9wJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbWlkZGxlLXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJKCdtaWRkbGUnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1taWRkbGUtdWktdGV4dC1tc2cnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnKCdtaWRkbGUnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1ib3R0b20tdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ2JvdHRvbScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWJvdHRvbS11aS10ZXh0LW1zZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSVRleHRNc2coJ2JvdHRvbScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXByZXZpZXctdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ3ByZXZpZXcnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1mb3JjZS1jb21wbGV0ZS11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRm9yY2VDb21wbGV0ZVVJID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1hdXRvLXN3aXRjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2l0Y2gtdG8tc2VydmVyLXRocmVzaG9sZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc3dpdGNoVG9TZXJ2ZXJUaHJlc2hvbGQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1tYW51YWwtc3dpdGNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNYW51YWxTd2l0Y2hUb1NlcnZlck1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0QWxsTW9kZSA9ICFlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1hbGwtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1vdmVyYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW92ZXJhbGwtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE1vZGUgPSAhZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1vdmVyYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtb3ZlcmFsbC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0QWxsTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1vdmVyYWxsLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdE92ZXJhbGxNb2RlID0gIWUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRPdmVyYWxsTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gU1RBUlRcbiAgICAgIC8vIGRvY3VtZW50XG4gICAgICAvLyAgIC5nZXRFbGVtZW50QnlJZCgndXNlLXBpaS1lbmNyeXB0LW1vZGUnKVxuICAgICAgLy8gICAuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIC8vICAgICB0aGlzLl9fc2V0dGluZ3MudXNlUGlpRW5jcnlwdE1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgLy8gICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICAvLyAgIH0pO1xuICAgICAgLy9cbiAgICAgIC8vIGRvY3VtZW50XG4gICAgICAvLyAgIC5nZXRFbGVtZW50QnlJZCgndXNlLXBpaS1lbmNyeXB0LWZhY2UnKVxuICAgICAgLy8gICAuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIC8vICAgICB0aGlzLl9fc2V0dGluZ3MudXNlUGlpRW5jcnlwdEZhY2UgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgLy8gICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICAvLyAgIH0pO1xuICAgICAgLy8g7LaU7ZuEIOychOyXkCDso7zshJ0g7ZKA7Ja07JW87ZWoIC0gRU5EXG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbGVnYWN5LWZvcm1hdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTGVnYWN5Rm9ybWF0ID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1pbWFnZS1jb3JyZWN0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PT0gJ3VzZUltYWdlQ3JvcHBpbmcnKSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlQ3JvcHBpbmcgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VJbWFnZVdhcnBpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC52YWx1ZSA9PT0gJ3VzZUltYWdlV2FycGluZycpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlSW1hZ2VDcm9wcGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VJbWFnZVdhcnBpbmcgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VJbWFnZUNyb3BwaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlV2FycGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUNvbXByZXNzSW1hZ2UgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWNvbXByZXNzLWltYWdlLW1heC13aWR0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UtbWF4LXZvbHVtZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWlycm9yLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLm1pcnJvck1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRpb24tZGVncmVlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5yb3RhdGlvbkRlZ3JlZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc29sdXRpb24tY3JpdGVyaWEnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc291cmNlLXJlcXVlc3QtcmV0cnktbGltaXQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbWVyYS1yZXNvdXJjZS1yZXF1ZXN0LXJldHJ5LWludGVydmFsJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5jYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWlkZS1ib3gtY3JpdGVyaWEnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbGNHdWlkZUJveENyaXRlcmlhID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWNsaXBib2FyZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc2hvd0NsaXBGcmFtZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWNhbnZhcy1wcmV2aWV3JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zaG93Q2FudmFzUHJldmlldyA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZGVidWctYWxlcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZURlYnVnQWxlcnQgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9yY2Vfd2FzbV9yZWxvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZvcmNlX3dhc21fcmVsb2FkID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgaWYgKCFlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZvcmNlX3dhc21fcmVsb2FkX2ZsYWcgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9yY2Vfd2FzbV9yZWxvYWRfZmxhZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBjb25zdCBjaGVja2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvY2Vfd2FzbV9yZWxvYWQnKS52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZvcmNlX3dhc21fcmVsb2FkX2ZsYWcgPSBjaGVja2VkID8gZS50YXJnZXQudmFsdWUgOiAnJztcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAnY3VzdG9tJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykudmFsdWUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlLnNwbGl0KCd4Jyk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpXTtcbiAgICAgICAgICBbdGFyZ2V0WzBdLnZhbHVlLCB0YXJnZXRbMV0udmFsdWVdID0gW3NvdXJjZVswXSwgc291cmNlWzFdXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1hc2stZnJhbWUtY29sb3ItY2hhbmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGVmYXVsdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGVmYXVsdCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tcmV2ZXJzZS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYXJyID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpXTtcbiAgICAgICAgW2FyclswXS52YWx1ZSwgYXJyWzFdLnZhbHVlXSA9IFthcnJbMV0udmFsdWUsIGFyclswXS52YWx1ZV07IC8vIHN3YXBcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKTtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJUg7KCB7Jqp65CoJztcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2knKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKCdpJykuc3R5bGUuY29sb3IgPSAnIzVjYjg1Yyc7XG5cbiAgICAgICAgLy8g7J247IudIO2UhOugiOyehCDsiqTtg4DsnbxcbiAgICAgICAgY29uc3QgYm9yZGVyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXdpZHRoJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGJvcmRlclN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvcmRlci1zdHlsZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBib3JkZXJSYWRpdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXJhZGl1cycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvck5vdFJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLW5vdC1yZWFkeScpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvclJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yRGV0ZWN0U3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1kZXRlY3Qtc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckRldGVjdEZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1kZXRlY3QtZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yT0NSUmVjb2duaXplZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1vY3ItcmVjb2duaXplZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvclN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1mYWlsZWQnKS52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZyYW1lQm9yZGVyU3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fX3NldHRpbmdzLmZyYW1lQm9yZGVyU3R5bGUsXG4gICAgICAgICAgd2lkdGg6IGJvcmRlcldpZHRoLFxuICAgICAgICAgIHN0eWxlOiBib3JkZXJTdHlsZSxcbiAgICAgICAgICByYWRpdXM6IGJvcmRlclJhZGl1cyxcbiAgICAgICAgICBub3RfcmVhZHk6IGNvbG9yTm90UmVhZHksXG4gICAgICAgICAgcmVhZHk6IGNvbG9yUmVhZHksXG4gICAgICAgICAgZGV0ZWN0X2ZhaWxlZDogY29sb3JEZXRlY3RGYWlsZWQsXG4gICAgICAgICAgZGV0ZWN0X3N1Y2Nlc3M6IGNvbG9yRGV0ZWN0U3VjY2VzcyxcbiAgICAgICAgICByZWNvZ25pemVkOiBjb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogY29sb3JPQ1JSZWNvZ25pemVkLFxuICAgICAgICAgIG9jcl9mYWlsZWQ6IGNvbG9yRmFpbGVkLFxuICAgICAgICAgIG9jcl9zdWNjZXNzOiBjb2xvclN1Y2Nlc3MsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6IGNvbG9yU3VjY2Vzc1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOuniOyKpO2CuSDtlITroIjsnoQg7Iqk7YOA7J28XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yTm90UmVhZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1ub3QtcmVhZHknKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JSZWFkeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRGV0ZWN0U3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWRldGVjdC1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRGV0ZWN0RmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGV0ZWN0LWZhaWxlZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1vY3ItcmVjb2duaXplZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvclN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItYmFzZS1jb2xvcicpLnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MubWFza0ZyYW1lU3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fX3NldHRpbmdzLm1hc2tGcmFtZVN0eWxlLFxuICAgICAgICAgIGJhc2VfY29sb3I6IG1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yLFxuICAgICAgICAgIG5vdF9yZWFkeTogbWFza0ZyYW1lQ29sb3JOb3RSZWFkeSxcbiAgICAgICAgICByZWFkeTogbWFza0ZyYW1lQ29sb3JSZWFkeSxcbiAgICAgICAgICBkZXRlY3RfZmFpbGVkOiBtYXNrRnJhbWVDb2xvckRldGVjdEZhaWxlZCxcbiAgICAgICAgICBkZXRlY3Rfc3VjY2VzczogbWFza0ZyYW1lQ29sb3JEZXRlY3RTdWNjZXNzLFxuICAgICAgICAgIHJlY29nbml6ZWQ6IG1hc2tGcmFtZUNvbG9yT0NSUmVjb2duaXplZCxcbiAgICAgICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgb2NyX2ZhaWxlZDogbWFza0ZyYW1lQ29sb3JGYWlsZWQsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3M6IG1hc2tGcmFtZUNvbG9yU3VjY2VzcyxcbiAgICAgICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogbWFza0ZyYW1lQ29sb3JTdWNjZXNzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24td2lkdGgnKS52YWx1ZTtcbiAgICAgICAgICBjb25zdCByZXNvbHV0aW9uSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24taGVpZ2h0JykudmFsdWU7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbkV4cGVuZFJhdGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tZXhwZW5kLXJhdGlvJykudmFsdWU7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tc2ltdWxhdGlvbi1mcmFtZScpLnN0eWxlLndpZHRoID0gcmVzb2x1dGlvbldpZHRoICogcmVzb2x1dGlvbkV4cGVuZFJhdGlvICsgJ3B4JztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUuaGVpZ2h0ID0gcmVzb2x1dGlvbkhlaWdodCAqIHJlc29sdXRpb25FeHBlbmRSYXRpbyArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX190eXBlKSB7XG4gICAgICAgICAgdGhpcy5fX29uQ2xpY2tTdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uIC50eXBlLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICB0aGlzLl9fdHlwZSA9IGUudGFyZ2V0LmlkO1xuICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ2FsaWVudC1iYWNrJykge1xuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUZhY2VJbWFnZSA9IGZhbHNlOyAvLyDsmbjqta3snbjrk7HroZ3spp0g65K366m07J2AIOyWvOq1tCDsl4bsnYxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0KCk7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbiAucHJldi1idXR0b24gc3BhbicpLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnRfYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX19vbkNsaWNrUmVzdGFydCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBfX29uQ2xpY2tTdGFydCgpIHtcbiAgICAvLyB0aGlzLl9fc2V0QWN0aXZlQnV0dG9uKHRoaXMuX190eXBlKTtcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0Q2FsbGJhY2sodGhpcy5fX3R5cGUsIHRoaXMuX19zZXR0aW5ncyk7XG4gIH1cbiAgX19vbkNsaWNrUmVzdGFydCgpIHtcbiAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnRDYWxsYmFjaygpO1xuICB9XG4gIF9fc2V0QWN0aXZlQnV0dG9uKHR5cGUpIHtcbiAgICB0aGlzLnJlc2V0QnV0dG9uKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHlwZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH1cbiAgcmVzZXRCdXR0b24oKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG4gIF9fc2F2ZVNldHRpbmdzSGFuZGxlcigpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zZXR0aW5ncycpO1xuICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5mYS1jaGVjaycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJXsoIHsmqknO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBVSVNpbXVsYXRvcjsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBUTtBQUNaLE1BQU1DLFdBQVcsQ0FBQztFQUNoQjs7RUFTQTtFQUNBQyxXQUFXQSxDQUFDQyxvQkFBb0IsRUFBRUMsc0JBQXNCLEVBQUVDLDhCQUE4QixFQUFFO0lBQUFDLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQSxxQkFMN0U7TUFDWEMsWUFBWSxFQUFFO0lBQ2hCLENBQUM7SUFJQyxJQUFJLENBQUMsQ0FBQyxDQUFDSixvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQ0Msc0JBQXNCLEVBQUU7TUFDeEQsTUFBTSxJQUFJSSxLQUFLLENBQUMsa0RBQWtELENBQUM7SUFDckU7SUFDQSxJQUFJUixRQUFRLEVBQUUsT0FBT0EsUUFBUTtJQUM3QkEsUUFBUSxHQUFHLElBQUk7SUFDZixJQUFJLENBQUNTLHNCQUFzQixHQUFHTixvQkFBb0I7SUFDbEQsSUFBSSxDQUFDTyx3QkFBd0IsR0FBR04sc0JBQXNCO0lBQ3RELElBQUksQ0FBQ08sZ0NBQWdDLEdBQUdOLDhCQUE4QjtJQUN0RSxJQUFJLENBQUNPLG1CQUFtQixFQUFFO0lBQzFCLE9BQU9aLFFBQVE7RUFDakI7RUFDQVksbUJBQW1CQSxDQUFBLEVBQUc7SUFDcEJDLE1BQU0sQ0FBQ0MsTUFBTSxHQUFHLE1BQU07TUFDcEJDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLLElBQUk7UUFDcEVBLEtBQUssQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ0MscUJBQXFCLENBQUM7UUFDM0RGLEtBQUssQ0FBQ0MsZ0JBQWdCLENBQUMsUUFB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
