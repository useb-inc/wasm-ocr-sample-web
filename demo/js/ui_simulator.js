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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWlfc2ltdWxhdG9yLmpzIiwibmFtZXMiOlsiaW5zdGFuY2UiLCJVSVNpbXVsYXRvciIsImNvbnN0cnVjdG9yIiwib25DbGlja1N0YXJ0Q2FsbGJhY2siLCJvbkNsaWNrUmVzdGFydENhbGxiYWNrIiwib25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwic3NhUmV0cnlUeXBlIiwiRXJyb3IiLCJfX29uQ2xpY2tTdGFydENhbGxiYWNrIiwiX19vbkNsaWNrUmVzdGFydENhbGxiYWNrIiwiX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2siLCJfX2JpbmRFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fc2F2ZVNldHRpbmdzSGFuZGxlciIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbGxhcHNlZFRvZ2dsZSIsImV2ZW50IiwiX2V2ZW50JHRhcmdldCRpZCIsInRvZ2dsZUVsZW1lbnQiLCJ0YXJnZXQiLCJpZCIsImluY2x1ZGVzIiwicGFyZW50RWxlbWVudCIsInNlY3Rpb24iLCJsYWJlbCIsImNoZXZyb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwiX19zZXR0aW5ncyIsInNzYU1heFJldHJ5Q291bnQiLCJpc05hTiIsInBhcnNlSW50IiwidmFsdWUiLCJzZXRTc2FUeXBlIiwiZWwiLCJ0b2dnbGVDdXN0b21VSSIsInBvc2l0aW9uIiwidXNlVG9wVUkiLCJjaGVja2VkIiwidXNlTWlkZGxlVUkiLCJ1c2VCb3R0b21VSSIsInVzZVByZXZpZXdVSSIsInRleHQiLCJjb25jYXQiLCJjbGljayIsInRvZ2dsZUN1c3RvbVVJVGV4dE1zZyIsInVzZVRvcFVJVGV4dE1zZyIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJVGV4dE1zZyIsInVpIiwidXNlRm9yY2VDb21wbGV0ZVVJIiwidXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSIsInVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSIsInVzZUVuY3J5cHRBbGxNb2RlIiwidXNlRW5jcnlwdE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VJbWFnZVdhcnBpbmciLCJ1c2VDb21wcmVzc0ltYWdlIiwidXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoIiwidXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSIsIm1pcnJvck1vZGUiLCJyb3RhdGlvbkRlZ3JlZSIsImNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSIsImNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5TGltaXQiLCJjYW1lcmFSZXNvdXJjZVJlcXVlc3RSZXRyeUludGVydmFsIiwiY2FsY0d1aWRlQm94Q3JpdGVyaWEiLCJzaG93Q2xpcEZyYW1lIiwic2hvd0NhbnZhc1ByZXZpZXciLCJ1c2VEZWJ1Z0FsZXJ0Iiwic291cmNlIiwic3BsaXQiLCJ1c2VNYXNrRnJhbWVDb2xvckNoYW5nZSIsImFyciIsInNldEF0dHJpYnV0ZSIsImNvbG9yIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJTdHlsZSIsImJvcmRlclJhZGl1cyIsImNvbG9yTm90UmVhZHkiLCJjb2xvclJlYWR5IiwiY29sb3JEZXRlY3RTdWNjZXNzIiwiY29sb3JEZXRlY3RGYWlsZWQiLCJjb2xvck9DUlJlY29nbml6ZWQiLCJjb2xvclN1Y2Nlc3MiLCJjb2xvckZhaWxlZCIsImZyYW1lQm9yZGVyU3R5bGUiLCJfb2JqZWN0U3ByZWFkIiwid2lkdGgiLCJyYWRpdXMiLCJub3RfcmVhZHkiLCJyZWFkeSIsImRldGVjdF9mYWlsZWQiLCJkZXRlY3Rfc3VjY2VzcyIsInJlY29nbml6ZWQiLCJyZWNvZ25pemVkX3dpdGhfc3NhIiwib2NyX2ZhaWxlZCIsIm9jcl9zdWNjZXNzIiwib2NyX3N1Y2Nlc3Nfd2l0aF9zc2EiLCJtYXNrRnJhbWVDb2xvck5vdFJlYWR5IiwibWFza0ZyYW1lQ29sb3JSZWFkeSIsIm1hc2tGcmFtZUNvbG9yRGV0ZWN0U3VjY2VzcyIsIm1hc2tGcmFtZUNvbG9yRGV0ZWN0RmFpbGVkIiwibWFza0ZyYW1lQ29sb3JPQ1JSZWNvZ25pemVkIiwibWFza0ZyYW1lQ29sb3JTdWNjZXNzIiwibWFza0ZyYW1lQ29sb3JGYWlsZWQiLCJtYXNrRnJhbWVDb2xvckJhc2VDb2xvciIsIm1hc2tGcmFtZVN0eWxlIiwiYmFzZV9jb2xvciIsImhlaWdodCIsInJlc29sdXRpb25XaWR0aCIsInJlc29sdXRpb25IZWlnaHQiLCJyZXNvbHV0aW9uRXhwZW5kUmF0aW8iLCJfX3R5cGUiLCJfX29uQ2xpY2tTdGFydCIsIm5vZGVOYW1lIiwidXNlRmFjZUltYWdlIiwiX19vbkNsaWNrUmVzdGFydCIsIl9fc2V0QWN0aXZlQnV0dG9uIiwidHlwZSIsInJlc2V0QnV0dG9uIiwiYnV0dG9ucyIsImJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSJdLCJzb3VyY2VzIjpbImpzL3VpX3NpbXVsYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaW5zdGFuY2U7XG5jbGFzcyBVSVNpbXVsYXRvciB7XG4gIC8qKiBwcml2YXRlIHByb3BlcnRpZXMgKi9cbiAgX19vbkNsaWNrU3RhcnRDYWxsYmFjaztcbiAgX19vbkNsaWNrUmVzdGFydENhbGxiYWNrO1xuICBfX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaztcbiAgX190eXBlO1xuICBfX3NldHRpbmdzID0ge1xuICAgIHNzYVJldHJ5VHlwZTogJ0VOU0VNQkxFJ1xuICB9O1xuXG4gIC8qKiBjb25zdHJ1Y3RvciAqL1xuICBjb25zdHJ1Y3RvcihvbkNsaWNrU3RhcnRDYWxsYmFjaywgb25DbGlja1Jlc3RhcnRDYWxsYmFjaywgb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKSB7XG4gICAgaWYgKCEhIW9uQ2xpY2tTdGFydENhbGxiYWNrIHx8ICEhIW9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25DbGljayBjYWxsYmFjayBmdW5jdGlvbiBwYXJhbWV0ZXIgaXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZSkgcmV0dXJuIGluc3RhbmNlO1xuICAgIGluc3RhbmNlID0gdGhpcztcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0Q2FsbGJhY2sgPSBvbkNsaWNrU3RhcnRDYWxsYmFjaztcbiAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnRDYWxsYmFjayA9IG9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2s7XG4gICAgdGhpcy5fX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjayA9IG9uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaztcbiAgICB0aGlzLl9fYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbiAgX19iaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNldHRpbmdzLXNlY3Rpb24gaW5wdXQnKS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcik7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29uYm9hcmRpbmctc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmctc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgaWYgKHRoaXMuX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24gI3ByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uYm9hcmRpbmctc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbiAucHJldicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZFRvZ2dsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCB0b2dnbGVFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmlkPy5pbmNsdWRlcygndG9nZ2xlJykgPyBldmVudC50YXJnZXQgOiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRvZ2dsZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0b2dnbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgY2hldnJvbiA9IHRvZ2dsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNoZXZyb24nKTtcbiAgICAgICAgLy8gY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgLy8gY29uc3QgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yICsgJyBzcGFuJylcbiAgICAgICAgLy8gY29uc3QgY2hldnJvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IgKyAnIC5jaGV2cm9uJylcbiAgICAgICAgaWYgKHNlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzZWQnKSkge1xuICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1jaGV2cm9uLXVwJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaGV2cm9uLWRvd24nKTtcbiAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdb7KCR6riwXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICBjaGV2cm9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLWNoZXZyb24tZG93bicpO1xuICAgICAgICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZCgnZmEtY2hldnJvbi11cCcpO1xuICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1vtjrzsuZjquLBdJztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R5cGUtdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb2xsYXBzZWRUb2dnbGUpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzLXRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29sbGFwc2VkVG9nZ2xlKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2EtbWF4LXJldHJ5LWNvdW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zc2FNYXhSZXRyeUNvdW50ID0gaXNOYU4ocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpKSA/IDAgOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHNldFNzYVR5cGUgPSBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNzYVJldHJ5VHlwZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2EtdHlwZScpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldFNzYVR5cGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0b2dnbGVDdXN0b21VSSA9IChwb3NpdGlvbiwgZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlVG9wVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWlkZGxlVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQm90dG9tVUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3ByZXZpZXcnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVByZXZpZXdVSSA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1c2UtJHtwb3NpdGlvbn0tdWktdGV4dC1tc2dgKTtcbiAgICAgICAgaWYgKCFldmVudC50YXJnZXQuY2hlY2tlZCAmJiB0ZXh0Py5jaGVja2VkKSB7XG4gICAgICAgICAgdGV4dC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnID0gKHBvc2l0aW9uLCBldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VUb3BVSVRleHRNc2cgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWlkZGxlVUlUZXh0TXNnID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUJvdHRvbVVJVGV4dE1zZyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdWkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlLSR7cG9zaXRpb259LXVpYCk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCAmJiAhdWkuY2hlY2tlZCkge1xuICAgICAgICAgIHVpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXRvcC11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSSgndG9wJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtdG9wLXVpLXRleHQtbXNnJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJVGV4dE1zZygndG9wJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbWlkZGxlLXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJKCdtaWRkbGUnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1taWRkbGUtdWktdGV4dC1tc2cnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnKCdtaWRkbGUnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1ib3R0b20tdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ2JvdHRvbScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWJvdHRvbS11aS10ZXh0LW1zZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSVRleHRNc2coJ2JvdHRvbScsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXByZXZpZXctdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ3ByZXZpZXcnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1mb3JjZS1jb21wbGV0ZS11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRm9yY2VDb21wbGV0ZVVJID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1hdXRvLXN3aXRjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbWFudWFsLXN3aXRjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWFudWFsU3dpdGNoVG9TZXJ2ZXJNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdEFsbE1vZGUgPSAhZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtYWxsLW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LWFsbC1tb2RlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRNb2RlID0gIWUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWVuY3J5cHQtbW9kZS1kaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRW5jcnlwdEFsbE1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIFNUQVJUXG4gICAgICAvLyBkb2N1bWVudFxuICAgICAgLy8gICAuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1waWktZW5jcnlwdC1tb2RlJylcbiAgICAgIC8vICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAvLyAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVBpaUVuY3J5cHRNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgIC8vICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgLy8gICB9KTtcbiAgICAgIC8vXG4gICAgICAvLyBkb2N1bWVudFxuICAgICAgLy8gICAuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1waWktZW5jcnlwdC1mYWNlJylcbiAgICAgIC8vICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAvLyAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVBpaUVuY3J5cHRGYWNlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgIC8vICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIOy2lO2bhCDsnITsl5Ag7KO87ISdIO2SgOyWtOyVvO2VqCAtIEVORFxuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWxlZ2FjeS1mb3JtYXQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUxlZ2FjeUZvcm1hdCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtaW1hZ2Utd2FycGluZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlSW1hZ2VXYXJwaW5nID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1jb21wcmVzcy1pbWFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UtbWF4LXdpZHRoJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VDb21wcmVzc0ltYWdlTWF4V2lkdGggPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1jb21wcmVzcy1pbWFnZS1tYXgtdm9sdW1lJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VDb21wcmVzc0ltYWdlTWF4Vm9sdW1lID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaXJyb3ItbW9kZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MubWlycm9yTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGlvbi1kZWdyZWUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnJvdGF0aW9uRGVncmVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW1lcmEtcmVzb2x1dGlvbi1jcml0ZXJpYScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuY2FtZXJhUmVzb2x1dGlvbkNyaXRlcmlhID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW1lcmEtcmVzb3VyY2UtcmVxdWVzdC1yZXRyeS1saW1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuY2FtZXJhUmVzb3VyY2VSZXF1ZXN0UmV0cnlMaW1pdCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc291cmNlLXJlcXVlc3QtcmV0cnktaW50ZXJ2YWwnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc291cmNlUmVxdWVzdFJldHJ5SW50ZXJ2YWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1aWRlLWJveC1jcml0ZXJpYScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MuY2FsY0d1aWRlQm94Q3JpdGVyaWEgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctY2xpcGJvYXJkJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zaG93Q2xpcEZyYW1lID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctY2FudmFzLXByZXZpZXcnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNob3dDYW52YXNQcmV2aWV3ID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1kZWJ1Zy1hbGVydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlRGVidWdBbGVydCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS52YWx1ZSA9PT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1jdXN0b20nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1jdXN0b20nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS52YWx1ZS5zcGxpdCgneCcpO1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IFtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi13aWR0aCcpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1oZWlnaHQnKV07XG4gICAgICAgICAgW3RhcmdldFswXS52YWx1ZSwgdGFyZ2V0WzFdLnZhbHVlXSA9IFtzb3VyY2VbMF0sIHNvdXJjZVsxXV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1tYXNrLWZyYW1lLWNvbG9yLWNoYW5nZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2UgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWRlZmF1bHQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWRlZmF1bHQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1jdXN0b20nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXJldmVyc2UtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi13aWR0aCcpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1oZWlnaHQnKV07XG4gICAgICAgIFthcnJbMF0udmFsdWUsIGFyclsxXS52YWx1ZV0gPSBbYXJyWzFdLnZhbHVlLCBhcnJbMF0udmFsdWVdOyAvLyBzd2FwXG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLXNldHRpbmdzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLXNldHRpbmdzJyk7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKCdzcGFuJykudGV4dENvbnRlbnQgPSAn7ISk7KCVIOyggeyaqeuQqCc7XG4gICAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKCdpJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgICB0YXJnZXQucXVlcnlTZWxlY3RvcignaScpLnN0eWxlLmNvbG9yID0gJyM1Y2I4NWMnO1xuXG4gICAgICAgIC8vIOyduOyLnSDtlITroIjsnoQg7Iqk7YOA7J28XG4gICAgICAgIGNvbnN0IGJvcmRlcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvcmRlci13aWR0aCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBib3JkZXJTdHlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3JkZXItc3R5bGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgYm9yZGVyUmFkaXVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvcmRlci1yYWRpdXMnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JOb3RSZWFkeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1ub3QtcmVhZHknKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JSZWFkeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1yZWFkeScpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckRldGVjdFN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3ItZGV0ZWN0LXN1Y2Nlc3MnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JEZXRlY3RGYWlsZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3ItZGV0ZWN0LWZhaWxlZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvck9DUlJlY29nbml6ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itb2NyLXJlY29nbml6ZWQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JTdWNjZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXN1Y2Nlc3MnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29sb3JGYWlsZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3ItZmFpbGVkJykudmFsdWU7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5mcmFtZUJvcmRlclN0eWxlID0ge1xuICAgICAgICAgIC4uLnRoaXMuX19zZXR0aW5ncy5mcmFtZUJvcmRlclN0eWxlLFxuICAgICAgICAgIHdpZHRoOiBib3JkZXJXaWR0aCxcbiAgICAgICAgICBzdHlsZTogYm9yZGVyU3R5bGUsXG4gICAgICAgICAgcmFkaXVzOiBib3JkZXJSYWRpdXMsXG4gICAgICAgICAgbm90X3JlYWR5OiBjb2xvck5vdFJlYWR5LFxuICAgICAgICAgIHJlYWR5OiBjb2xvclJlYWR5LFxuICAgICAgICAgIGRldGVjdF9mYWlsZWQ6IGNvbG9yRGV0ZWN0RmFpbGVkLFxuICAgICAgICAgIGRldGVjdF9zdWNjZXNzOiBjb2xvckRldGVjdFN1Y2Nlc3MsXG4gICAgICAgICAgcmVjb2duaXplZDogY29sb3JPQ1JSZWNvZ25pemVkLFxuICAgICAgICAgIHJlY29nbml6ZWRfd2l0aF9zc2E6IGNvbG9yT0NSUmVjb2duaXplZCxcbiAgICAgICAgICBvY3JfZmFpbGVkOiBjb2xvckZhaWxlZCxcbiAgICAgICAgICBvY3Jfc3VjY2VzczogY29sb3JTdWNjZXNzLFxuICAgICAgICAgIG9jcl9zdWNjZXNzX3dpdGhfc3NhOiBjb2xvclN1Y2Nlc3NcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDrp4jsiqTtgrkg7ZSE66CI7J6EIOyKpO2DgOydvFxuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvck5vdFJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3Itbm90LXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yUmVhZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1yZWFkeScpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvckRldGVjdFN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1kZXRlY3Qtc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvckRldGVjdEZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWRldGVjdC1mYWlsZWQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JPQ1JSZWNvZ25pemVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3Itb2NyLXJlY29nbml6ZWQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JTdWNjZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3Itc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvckZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWZhaWxlZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvckJhc2VDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWJhc2UtY29sb3InKS52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLm1hc2tGcmFtZVN0eWxlID0ge1xuICAgICAgICAgIC4uLnRoaXMuX19zZXR0aW5ncy5tYXNrRnJhbWVTdHlsZSxcbiAgICAgICAgICBiYXNlX2NvbG9yOiBtYXNrRnJhbWVDb2xvckJhc2VDb2xvcixcbiAgICAgICAgICBub3RfcmVhZHk6IG1hc2tGcmFtZUNvbG9yTm90UmVhZHksXG4gICAgICAgICAgcmVhZHk6IG1hc2tGcmFtZUNvbG9yUmVhZHksXG4gICAgICAgICAgZGV0ZWN0X2ZhaWxlZDogbWFza0ZyYW1lQ29sb3JEZXRlY3RGYWlsZWQsXG4gICAgICAgICAgZGV0ZWN0X3N1Y2Nlc3M6IG1hc2tGcmFtZUNvbG9yRGV0ZWN0U3VjY2VzcyxcbiAgICAgICAgICByZWNvZ25pemVkOiBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogbWFza0ZyYW1lQ29sb3JPQ1JSZWNvZ25pemVkLFxuICAgICAgICAgIG9jcl9mYWlsZWQ6IG1hc2tGcmFtZUNvbG9yRmFpbGVkLFxuICAgICAgICAgIG9jcl9zdWNjZXNzOiBtYXNrRnJhbWVDb2xvclN1Y2Nlc3MsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6IG1hc2tGcmFtZUNvbG9yU3VjY2Vzc1xuICAgICAgICB9O1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS52YWx1ZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tc2ltdWxhdGlvbi1mcmFtZScpLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tc2ltdWxhdGlvbi1mcmFtZScpLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHJlc29sdXRpb25XaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJykudmFsdWU7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbkhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHJlc29sdXRpb25FeHBlbmRSYXRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWV4cGVuZC1yYXRpbycpLnZhbHVlO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXNpbXVsYXRpb24tZnJhbWUnKS5zdHlsZS53aWR0aCA9IHJlc29sdXRpb25XaWR0aCAqIHJlc29sdXRpb25FeHBlbmRSYXRpbyArICdweCc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tc2ltdWxhdGlvbi1mcmFtZScpLnN0eWxlLmhlaWdodCA9IHJlc29sdXRpb25IZWlnaHQgKiByZXNvbHV0aW9uRXhwZW5kUmF0aW8gKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9fdHlwZSkge1xuICAgICAgICAgIHRoaXMuX19vbkNsaWNrU3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbiAudHlwZS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICAgICAgdGhpcy5fX3R5cGUgPSBlLnRhcmdldC5pZDtcbiAgICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09ICdhbGllbnQtYmFjaycpIHtcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VGYWNlSW1hZ2UgPSBmYWxzZTsgLy8g7Jm46rWt7J2465Ox66Gd7KadIOuSt+uptOydgCDslrzqtbQg7JeG7J2MXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fX29uQ2xpY2tTdGFydCgpO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2ltdWxhdG9yLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2ltdWxhdG9yLXNlY3Rpb24gLnByZXYtYnV0dG9uIHNwYW4nKS50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0X2J0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgX19vbkNsaWNrU3RhcnQoKSB7XG4gICAgLy8gdGhpcy5fX3NldEFjdGl2ZUJ1dHRvbih0aGlzLl9fdHlwZSk7XG4gICAgdGhpcy5fX29uQ2xpY2tTdGFydENhbGxiYWNrKHRoaXMuX190eXBlLCB0aGlzLl9fc2V0dGluZ3MpO1xuICB9XG4gIF9fb25DbGlja1Jlc3RhcnQoKSB7XG4gICAgdGhpcy5fX29uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2soKTtcbiAgfVxuICBfX3NldEFjdGl2ZUJ1dHRvbih0eXBlKSB7XG4gICAgdGhpcy5yZXNldEJ1dHRvbigpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHR5cGUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICB9XG4gIHJlc2V0QnV0dG9uKCkge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgfVxuICBfX3NhdmVTZXR0aW5nc0hhbmRsZXIoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKTtcbiAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIGJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcuZmEtY2hlY2snKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGJ1dHRvbi5xdWVyeVNlbGVjdG9yKCdzcGFuJykudGV4dENvbnRlbnQgPSAn7ISk7KCV7KCB7JqpJztcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVUlTaW11bGF0b3I7Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLFFBQVE7QUFDWixNQUFNQyxXQUFXLENBQUM7RUFDaEI7O0VBU0E7RUFDQUMsV0FBV0EsQ0FBQ0Msb0JBQW9CLEVBQUVDLHNCQUFzQixFQUFFQyw4QkFBOEIsRUFBRTtJQUFBQyxlQUFBO0lBQUFBLGVBQUE7SUFBQUEsZUFBQTtJQUFBQSxlQUFBO0lBQUFBLGVBQUEscUJBTDdFO01BQ1hDLFlBQVksRUFBRTtJQUNoQixDQUFDO0lBSUMsSUFBSSxDQUFDLENBQUMsQ0FBQ0osb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUNDLHNCQUFzQixFQUFFO01BQ3hELE1BQU0sSUFBSUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDO0lBQ3JFO0lBQ0EsSUFBSVIsUUFBUSxFQUFFLE9BQU9BLFFBQVE7SUFDN0JBLFFBQVEsR0FBRyxJQUFJO0lBQ2YsSUFBSSxDQUFDUyxzQkFBc0IsR0FBR04sb0JBQW9CO0lBQ2xELElBQUksQ0FBQ08sd0JB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
