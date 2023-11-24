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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdWlfc2ltdWxhdG9yLmpzIiwibmFtZXMiOlsiaW5zdGFuY2UiLCJVSVNpbXVsYXRvciIsImNvbnN0cnVjdG9yIiwib25DbGlja1N0YXJ0Q2FsbGJhY2siLCJvbkNsaWNrUmVzdGFydENhbGxiYWNrIiwib25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwic3NhUmV0cnlUeXBlIiwiRXJyb3IiLCJfX29uQ2xpY2tTdGFydENhbGxiYWNrIiwiX19vbkNsaWNrUmVzdGFydENhbGxiYWNrIiwiX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2siLCJfX2JpbmRFdmVudExpc3RlbmVyIiwid2luZG93Iiwib25sb2FkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fc2F2ZVNldHRpbmdzSGFuZGxlciIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbGxhcHNlZFRvZ2dsZSIsImV2ZW50IiwiX2V2ZW50JHRhcmdldCRpZCIsInRvZ2dsZUVsZW1lbnQiLCJ0YXJnZXQiLCJpZCIsImluY2x1ZGVzIiwicGFyZW50RWxlbWVudCIsInNlY3Rpb24iLCJsYWJlbCIsImNoZXZyb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwiX19zZXR0aW5ncyIsInNzYU1heFJldHJ5Q291bnQiLCJpc05hTiIsInBhcnNlSW50IiwidmFsdWUiLCJzZXRTc2FUeXBlIiwiZWwiLCJ0b2dnbGVDdXN0b21VSSIsInBvc2l0aW9uIiwidXNlVG9wVUkiLCJjaGVja2VkIiwidXNlTWlkZGxlVUkiLCJ1c2VCb3R0b21VSSIsInVzZVByZXZpZXdVSSIsInRleHQiLCJjb25jYXQiLCJjbGljayIsInRvZ2dsZUN1c3RvbVVJVGV4dE1zZyIsInVzZVRvcFVJVGV4dE1zZyIsInVzZU1pZGRsZVVJVGV4dE1zZyIsInVzZUJvdHRvbVVJVGV4dE1zZyIsInVpIiwidXNlRm9yY2VDb21wbGV0ZVVJIiwidXNlQXV0b1N3aXRjaFRvU2VydmVyTW9kZSIsInVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSIsInVzZUVuY3J5cHRBbGxNb2RlIiwidXNlRW5jcnlwdE1vZGUiLCJ1c2VMZWdhY3lGb3JtYXQiLCJ1c2VJbWFnZVdhcnBpbmciLCJ1c2VDb21wcmVzc0ltYWdlIiwidXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoIiwidXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSIsIm1pcnJvck1vZGUiLCJyb3RhdGlvbkRlZ3JlZSIsImNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSIsImNhbGNHdWlkZUJveENyaXRlcmlhIiwic2hvd0NsaXBGcmFtZSIsInNob3dDYW52YXNQcmV2aWV3IiwidXNlRGVidWdBbGVydCIsInNvdXJjZSIsInNwbGl0IiwidXNlTWFza0ZyYW1lQ29sb3JDaGFuZ2UiLCJhcnIiLCJzZXRBdHRyaWJ1dGUiLCJjb2xvciIsImJvcmRlcldpZHRoIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJSYWRpdXMiLCJjb2xvck5vdFJlYWR5IiwiY29sb3JSZWFkeSIsImNvbG9yRGV0ZWN0U3VjY2VzcyIsImNvbG9yRGV0ZWN0RmFpbGVkIiwiY29sb3JPQ1JSZWNvZ25pemVkIiwiY29sb3JTdWNjZXNzIiwiY29sb3JGYWlsZWQiLCJmcmFtZUJvcmRlclN0eWxlIiwiX29iamVjdFNwcmVhZCIsIndpZHRoIiwicmFkaXVzIiwibm90X3JlYWR5IiwicmVhZHkiLCJkZXRlY3RfZmFpbGVkIiwiZGV0ZWN0X3N1Y2Nlc3MiLCJyZWNvZ25pemVkIiwicmVjb2duaXplZF93aXRoX3NzYSIsIm9jcl9mYWlsZWQiLCJvY3Jfc3VjY2VzcyIsIm9jcl9zdWNjZXNzX3dpdGhfc3NhIiwibWFza0ZyYW1lQ29sb3JOb3RSZWFkeSIsIm1hc2tGcmFtZUNvbG9yUmVhZHkiLCJtYXNrRnJhbWVDb2xvckRldGVjdFN1Y2Nlc3MiLCJtYXNrRnJhbWVDb2xvckRldGVjdEZhaWxlZCIsIm1hc2tGcmFtZUNvbG9yT0NSUmVjb2duaXplZCIsIm1hc2tGcmFtZUNvbG9yU3VjY2VzcyIsIm1hc2tGcmFtZUNvbG9yRmFpbGVkIiwibWFza0ZyYW1lQ29sb3JCYXNlQ29sb3IiLCJtYXNrRnJhbWVTdHlsZSIsImJhc2VfY29sb3IiLCJoZWlnaHQiLCJyZXNvbHV0aW9uV2lkdGgiLCJyZXNvbHV0aW9uSGVpZ2h0IiwicmVzb2x1dGlvbkV4cGVuZFJhdGlvIiwiX190eXBlIiwiX19vbkNsaWNrU3RhcnQiLCJub2RlTmFtZSIsInVzZUZhY2VJbWFnZSIsIl9fb25DbGlja1Jlc3RhcnQiLCJfX3NldEFjdGl2ZUJ1dHRvbiIsInR5cGUiLCJyZXNldEJ1dHRvbiIsImJ1dHRvbnMiLCJidXR0b24iLCJyZW1vdmVBdHRyaWJ1dGUiXSwic291cmNlcyI6WyJqcy91aV9zaW11bGF0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGluc3RhbmNlO1xuY2xhc3MgVUlTaW11bGF0b3Ige1xuICAvKiogcHJpdmF0ZSBwcm9wZXJ0aWVzICovXG4gIF9fb25DbGlja1N0YXJ0Q2FsbGJhY2s7XG4gIF9fb25DbGlja1Jlc3RhcnRDYWxsYmFjaztcbiAgX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2s7XG4gIF9fdHlwZTtcbiAgX19zZXR0aW5ncyA9IHtcbiAgICBzc2FSZXRyeVR5cGU6ICdFTlNFTUJMRSdcbiAgfTtcblxuICAvKiogY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3Iob25DbGlja1N0YXJ0Q2FsbGJhY2ssIG9uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2ssIG9uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaykge1xuICAgIGlmICghISFvbkNsaWNrU3RhcnRDYWxsYmFjayB8fCAhISFvbkNsaWNrUmVzdGFydENhbGxiYWNrKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uQ2xpY2sgY2FsbGJhY2sgZnVuY3Rpb24gcGFyYW1ldGVyIGlzIG5vdCBleGlzdCcpO1xuICAgIH1cbiAgICBpZiAoaW5zdGFuY2UpIHJldHVybiBpbnN0YW5jZTtcbiAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgdGhpcy5fX29uQ2xpY2tTdGFydENhbGxiYWNrID0gb25DbGlja1N0YXJ0Q2FsbGJhY2s7XG4gICAgdGhpcy5fX29uQ2xpY2tSZXN0YXJ0Q2FsbGJhY2sgPSBvbkNsaWNrUmVzdGFydENhbGxiYWNrO1xuICAgIHRoaXMuX19vbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2sgPSBvbkNsaWNrU3RhcnRQcmVsb2FkaW5nQ2FsbGJhY2s7XG4gICAgdGhpcy5fX2JpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG4gIF9fYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZXR0aW5ncy1zZWN0aW9uIGlucHV0JykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIpO1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvbmJvYXJkaW5nLXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmJvYXJkaW5nLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIGlmICh0aGlzLl9fb25DbGlja1N0YXJ0UHJlbG9hZGluZ0NhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5fX29uQ2xpY2tTdGFydFByZWxvYWRpbmdDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uICNwcmV2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmJvYXJkaW5nLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC1zZWxlY3Qtc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2ltdWxhdG9yLXNlY3Rpb24gLnByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2ltdWxhdG9yLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBjb2xsYXBzZWRUb2dnbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlRWxlbWVudCA9IGV2ZW50LnRhcmdldC5pZD8uaW5jbHVkZXMoJ3RvZ2dsZScpID8gZXZlbnQudGFyZ2V0IDogZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0b2dnbGVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdG9nZ2xlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGNoZXZyb24gPSB0b2dnbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGV2cm9uJyk7XG4gICAgICAgIC8vIGNvbnN0IHNldHRpbmdzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICAgIC8vIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciArICcgc3BhbicpXG4gICAgICAgIC8vIGNvbnN0IGNoZXZyb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yICsgJyAuY2hldnJvbicpXG4gICAgICAgIGlmIChzZWN0aW9uLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2VkJykpIHtcbiAgICAgICAgICBzZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgIGNoZXZyb24uY2xhc3NMaXN0LnJlbW92ZSgnZmEtY2hldnJvbi11cCcpO1xuICAgICAgICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZCgnZmEtY2hldnJvbi1kb3duJyk7XG4gICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSAnW+ygkeq4sF0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29sbGFwc2VkJyk7XG4gICAgICAgICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1jaGV2cm9uLWRvd24nKTtcbiAgICAgICAgICBjaGV2cm9uLmNsYXNzTGlzdC5hZGQoJ2ZhLWNoZXZyb24tdXAnKTtcbiAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdb7Y687LmY6riwXSc7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0eXBlLXRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29sbGFwc2VkVG9nZ2xlKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncy10b2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbGxhcHNlZFRvZ2dsZSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3NhLW1heC1yZXRyeS1jb3VudCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc3NhTWF4UmV0cnlDb3VudCA9IGlzTmFOKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSkgPyAwIDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBzZXRTc2FUeXBlID0gZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5zc2FSZXRyeVR5cGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3NhLXR5cGUnKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRTc2FUeXBlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdG9nZ2xlQ3VzdG9tVUkgPSAocG9zaXRpb24sIGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZVRvcFVJID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZU1pZGRsZVVJID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUJvdHRvbVVJID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwcmV2aWV3JzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VQcmV2aWV3VUkgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlLSR7cG9zaXRpb259LXVpLXRleHQtbXNnYCk7XG4gICAgICAgIGlmICghZXZlbnQudGFyZ2V0LmNoZWNrZWQgJiYgdGV4dD8uY2hlY2tlZCkge1xuICAgICAgICAgIHRleHQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHRvZ2dsZUN1c3RvbVVJVGV4dE1zZyA9IChwb3NpdGlvbiwgZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlVG9wVUlUZXh0TXNnID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaWRkbGUnOlxuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZU1pZGRsZVVJVGV4dE1zZyA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VCb3R0b21VSVRleHRNc2cgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZS0ke3Bvc2l0aW9ufS11aWApO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQgJiYgIXVpLmNoZWNrZWQpIHtcbiAgICAgICAgICB1aS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS10b3AtdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUkoJ3RvcCcsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLXRvcC11aS10ZXh0LW1zZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSVRleHRNc2coJ3RvcCcsIGUpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1pZGRsZS11aScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0b2dnbGVDdXN0b21VSSgnbWlkZGxlJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtbWlkZGxlLXVpLXRleHQtbXNnJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJVGV4dE1zZygnbWlkZGxlJywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtYm90dG9tLXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJKCdib3R0b20nLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1ib3R0b20tdWktdGV4dC1tc2cnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdG9nZ2xlQ3VzdG9tVUlUZXh0TXNnKCdib3R0b20nLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1wcmV2aWV3LXVpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRvZ2dsZUN1c3RvbVVJKCdwcmV2aWV3JywgZSk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZm9yY2UtY29tcGxldGUtdWknKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUZvcmNlQ29tcGxldGVVSSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtYXV0by1zd2l0Y2gnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUF1dG9Td2l0Y2hUb1NlcnZlck1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1hbnVhbC1zd2l0Y2gnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZU1hbnVhbFN3aXRjaFRvU2VydmVyTW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1tb2RlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRBbGxNb2RlID0gIWUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LWFsbC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LWFsbC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0TW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1hbGwtbW9kZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VFbmNyeXB0TW9kZSA9ICFlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtZW5jcnlwdC1tb2RlLWRpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1lbmNyeXB0LW1vZGUtZGl2Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUVuY3J5cHRBbGxNb2RlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBTVEFSVFxuICAgICAgLy8gZG9jdW1lbnRcbiAgICAgIC8vICAgLmdldEVsZW1lbnRCeUlkKCd1c2UtcGlpLWVuY3J5cHQtbW9kZScpXG4gICAgICAvLyAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuX19zZXR0aW5ncy51c2VQaWlFbmNyeXB0TW9kZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAvLyAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvL1xuICAgICAgLy8gZG9jdW1lbnRcbiAgICAgIC8vICAgLmdldEVsZW1lbnRCeUlkKCd1c2UtcGlpLWVuY3J5cHQtZmFjZScpXG4gICAgICAvLyAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuX19zZXR0aW5ncy51c2VQaWlFbmNyeXB0RmFjZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAvLyAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyDstpTtm4Qg7JyE7JeQIOyjvOyEnSDtkoDslrTslbztlaggLSBFTkRcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZS1sZWdhY3ktZm9ybWF0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VMZWdhY3lGb3JtYXQgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWltYWdlLXdhcnBpbmcnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUltYWdlV2FycGluZyA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUNvbXByZXNzSW1hZ2UgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWNvbXByZXNzLWltYWdlLW1heC13aWR0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZU1heFdpZHRoID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuX19zYXZlU2V0dGluZ3NIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2UtY29tcHJlc3MtaW1hZ2UtbWF4LXZvbHVtZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MudXNlQ29tcHJlc3NJbWFnZU1heFZvbHVtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWlycm9yLW1vZGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLm1pcnJvck1vZGUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRpb24tZGVncmVlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5yb3RhdGlvbkRlZ3JlZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FtZXJhLXJlc29sdXRpb24tY3JpdGVyaWEnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmNhbWVyYVJlc29sdXRpb25Dcml0ZXJpYSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3VpZGUtYm94LWNyaXRlcmlhJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy5jYWxjR3VpZGVCb3hDcml0ZXJpYSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1jbGlwYm9hcmQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLnNob3dDbGlwRnJhbWUgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1jYW52YXMtcHJldmlldycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3Muc2hvd0NhbnZhc1ByZXZpZXcgPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLWRlYnVnLWFsZXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VEZWJ1Z0FsZXJ0ID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tdGVtcGxhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAnY3VzdG9tJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXRlbXBsYXRlJykudmFsdWUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlLnNwbGl0KCd4Jyk7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpXTtcbiAgICAgICAgICBbdGFyZ2V0WzBdLnZhbHVlLCB0YXJnZXRbMV0udmFsdWVdID0gW3NvdXJjZVswXSwgc291cmNlWzFdXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2F2ZVNldHRpbmdzSGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlLW1hc2stZnJhbWUtY29sb3ItY2hhbmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHRoaXMuX19zZXR0aW5ncy51c2VNYXNrRnJhbWVDb2xvckNoYW5nZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGVmYXVsdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItY3VzdG9tJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGVmYXVsdCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWN1c3RvbScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tcmV2ZXJzZS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYXJyID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLXdpZHRoJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNvbHV0aW9uLWhlaWdodCcpXTtcbiAgICAgICAgW2FyclswXS52YWx1ZSwgYXJyWzFdLnZhbHVlXSA9IFthcnJbMV0udmFsdWUsIGFyclswXS52YWx1ZV07IC8vIHN3YXBcbiAgICAgICAgdGhpcy5fX3NhdmVTZXR0aW5nc0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtc2V0dGluZ3MnKTtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJUg7KCB7Jqp65CoJztcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2knKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKCdpJykuc3R5bGUuY29sb3IgPSAnIzVjYjg1Yyc7XG5cbiAgICAgICAgLy8g7J247IudIO2UhOugiOyehCDsiqTtg4DsnbxcbiAgICAgICAgY29uc3QgYm9yZGVyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXdpZHRoJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGJvcmRlclN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvcmRlci1zdHlsZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBib3JkZXJSYWRpdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9yZGVyLXJhZGl1cycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvck5vdFJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLW5vdC1yZWFkeScpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvclJlYWR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yRGV0ZWN0U3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1kZXRlY3Qtc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckRldGVjdEZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1kZXRlY3QtZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbG9yT0NSUmVjb2duaXplZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1vY3ItcmVjb2duaXplZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvclN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itc3VjY2VzcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xvckZhaWxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvci1mYWlsZWQnKS52YWx1ZTtcbiAgICAgICAgdGhpcy5fX3NldHRpbmdzLmZyYW1lQm9yZGVyU3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fX3NldHRpbmdzLmZyYW1lQm9yZGVyU3R5bGUsXG4gICAgICAgICAgd2lkdGg6IGJvcmRlcldpZHRoLFxuICAgICAgICAgIHN0eWxlOiBib3JkZXJTdHlsZSxcbiAgICAgICAgICByYWRpdXM6IGJvcmRlclJhZGl1cyxcbiAgICAgICAgICBub3RfcmVhZHk6IGNvbG9yTm90UmVhZHksXG4gICAgICAgICAgcmVhZHk6IGNvbG9yUmVhZHksXG4gICAgICAgICAgZGV0ZWN0X2ZhaWxlZDogY29sb3JEZXRlY3RGYWlsZWQsXG4gICAgICAgICAgZGV0ZWN0X3N1Y2Nlc3M6IGNvbG9yRGV0ZWN0U3VjY2VzcyxcbiAgICAgICAgICByZWNvZ25pemVkOiBjb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgcmVjb2duaXplZF93aXRoX3NzYTogY29sb3JPQ1JSZWNvZ25pemVkLFxuICAgICAgICAgIG9jcl9mYWlsZWQ6IGNvbG9yRmFpbGVkLFxuICAgICAgICAgIG9jcl9zdWNjZXNzOiBjb2xvclN1Y2Nlc3MsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3Nfd2l0aF9zc2E6IGNvbG9yU3VjY2Vzc1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOuniOyKpO2CuSDtlITroIjsnoQg7Iqk7YOA7J28XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yTm90UmVhZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1ub3QtcmVhZHknKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWFza0ZyYW1lQ29sb3JSZWFkeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLXJlYWR5JykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRGV0ZWN0U3VjY2VzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWZyYW1lLWNvbG9yLWRldGVjdC1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRGV0ZWN0RmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZGV0ZWN0LWZhaWxlZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1vY3ItcmVjb2duaXplZCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBtYXNrRnJhbWVDb2xvclN1Y2Nlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFzay1mcmFtZS1jb2xvci1zdWNjZXNzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yRmFpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItZmFpbGVkJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stZnJhbWUtY29sb3ItYmFzZS1jb2xvcicpLnZhbHVlO1xuICAgICAgICB0aGlzLl9fc2V0dGluZ3MubWFza0ZyYW1lU3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fX3NldHRpbmdzLm1hc2tGcmFtZVN0eWxlLFxuICAgICAgICAgIGJhc2VfY29sb3I6IG1hc2tGcmFtZUNvbG9yQmFzZUNvbG9yLFxuICAgICAgICAgIG5vdF9yZWFkeTogbWFza0ZyYW1lQ29sb3JOb3RSZWFkeSxcbiAgICAgICAgICByZWFkeTogbWFza0ZyYW1lQ29sb3JSZWFkeSxcbiAgICAgICAgICBkZXRlY3RfZmFpbGVkOiBtYXNrRnJhbWVDb2xvckRldGVjdEZhaWxlZCxcbiAgICAgICAgICBkZXRlY3Rfc3VjY2VzczogbWFza0ZyYW1lQ29sb3JEZXRlY3RTdWNjZXNzLFxuICAgICAgICAgIHJlY29nbml6ZWQ6IG1hc2tGcmFtZUNvbG9yT0NSUmVjb2duaXplZCxcbiAgICAgICAgICByZWNvZ25pemVkX3dpdGhfc3NhOiBtYXNrRnJhbWVDb2xvck9DUlJlY29nbml6ZWQsXG4gICAgICAgICAgb2NyX2ZhaWxlZDogbWFza0ZyYW1lQ29sb3JGYWlsZWQsXG4gICAgICAgICAgb2NyX3N1Y2Nlc3M6IG1hc2tGcmFtZUNvbG9yU3VjY2VzcyxcbiAgICAgICAgICBvY3Jfc3VjY2Vzc193aXRoX3NzYTogbWFza0ZyYW1lQ29sb3JTdWNjZXNzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi10ZW1wbGF0ZScpLnZhbHVlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24td2lkdGgnKS52YWx1ZTtcbiAgICAgICAgICBjb25zdCByZXNvbHV0aW9uSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24taGVpZ2h0JykudmFsdWU7XG4gICAgICAgICAgY29uc3QgcmVzb2x1dGlvbkV4cGVuZFJhdGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tZXhwZW5kLXJhdGlvJykudmFsdWU7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc29sdXRpb24tc2ltdWxhdGlvbi1mcmFtZScpLnN0eWxlLndpZHRoID0gcmVzb2x1dGlvbldpZHRoICogcmVzb2x1dGlvbkV4cGVuZFJhdGlvICsgJ3B4JztcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzb2x1dGlvbi1zaW11bGF0aW9uLWZyYW1lJykuc3R5bGUuaGVpZ2h0ID0gcmVzb2x1dGlvbkhlaWdodCAqIHJlc29sdXRpb25FeHBlbmRSYXRpbyArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX190eXBlKSB7XG4gICAgICAgICAgdGhpcy5fX29uQ2xpY2tTdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXNlbGVjdC1zZWN0aW9uIC50eXBlLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICB0aGlzLl9fdHlwZSA9IGUudGFyZ2V0LmlkO1xuICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ2FsaWVudC1iYWNrJykge1xuICAgICAgICAgICAgdGhpcy5fX3NldHRpbmdzLnVzZUZhY2VJbWFnZSA9IGZhbHNlOyAvLyDsmbjqta3snbjrk7HroZ3spp0g65K366m07J2AIOyWvOq1tCDsl4bsnYxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9fb25DbGlja1N0YXJ0KCk7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmQtc2VsZWN0LXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW11bGF0b3Itc2VjdGlvbiAucHJldi1idXR0b24gc3BhbicpLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnRfYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX19vbkNsaWNrUmVzdGFydCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBfX29uQ2xpY2tTdGFydCgpIHtcbiAgICAvLyB0aGlzLl9fc2V0QWN0aXZlQnV0dG9uKHRoaXMuX190eXBlKTtcbiAgICB0aGlzLl9fb25DbGlja1N0YXJ0Q2FsbGJhY2sodGhpcy5fX3R5cGUsIHRoaXMuX19zZXR0aW5ncyk7XG4gIH1cbiAgX19vbkNsaWNrUmVzdGFydCgpIHtcbiAgICB0aGlzLl9fb25DbGlja1Jlc3RhcnRDYWxsYmFjaygpO1xuICB9XG4gIF9fc2V0QWN0aXZlQnV0dG9uKHR5cGUpIHtcbiAgICB0aGlzLnJlc2V0QnV0dG9uKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHlwZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH1cbiAgcmVzZXRCdXR0b24oKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9XG4gIF9fc2F2ZVNldHRpbmdzSGFuZGxlcigpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zZXR0aW5ncycpO1xuICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5mYS1jaGVjaycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICfshKTsoJXsoIHsmqknO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBVSVNpbXVsYXRvcjsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBUTtBQUNaLE1BQU1DLFdBQVcsQ0FBQztFQUNoQjs7RUFTQTtF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
