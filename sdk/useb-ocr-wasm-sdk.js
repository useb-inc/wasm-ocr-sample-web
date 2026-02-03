import UseBOCR from './ocr.js?ver=v1.38.0';

const ocr = new UseBOCR();
let targetOrigin = null;
const PRELOAD_TYPE = {
  PRELOAD_TYPE_BRWOSER: 1,
  PRELOAD_TYPE_WEBVIEW: 2,
};

let preloadType = PRELOAD_TYPE['PRELOAD_TYPE_BRWOSER']; // default;

const messageHandler = async (e) => {
  try {
    const response = e.data ? e.data : e;

    if (targetOrigin !== e.origin) {
      console.info("[WARNING] origin is replaced : '" + targetOrigin + "' -> '" + e.origin + "'");
      targetOrigin = e.origin;
    }
    console.debug('targetOrigin', targetOrigin);

    if (!response) {
      console.info('[INFO] messageHandler() is skipped, cause : response is undefined');
      return;
    }

    if (response.type === 'webpackOk') {
      console.info('[INFO] messageHandler() is skipped, cause : webpackOk type');
      return;
    }

    console.debug('messageHandler()', response);

    let data;

    if (typeof response === 'string' && response !== 'undefined') {
      try {
        data = JSON.parse(decodeURIComponent(atob(response)));
        if (data.preloadType) {
          preloadType = data.preloadType;
        }
      } catch (err) {
        console.debug('[WARNING] parameter parsing error');
        throw new Error('parameter format is invalid');
      }

      if (!!!data.settings) {
        throw new Error('settings info is empty');
      }

      try {
        // document URL이 reload되지 않고 startOCR 중복호출 되었을 때,
        // 자원정리 이슈 방지하여 stopOCR 미리 한번 호출.
        await ocr.stopOCR();
      } catch (e) {
        // nothing to do..
      }

      if (data.preloading) {
        try {
          ocr.init(data.settings);
          await ocr.preloading(onPreloaded);
          return;
        } catch (err) {
          console.debug('[WARNING] preloading error');
          throw new Error(`preloading error`);
        }
      }

      switch (data.ocrType) {
        // OCR
        case 'idcard':
        case 'passport':
        case 'alien':
        case 'alien-back':
        case 'veteran':
        case 'credit':
        // SSA
        case 'idcard-ssa':
        case 'passport-ssa':
        case 'alien-ssa':
        case 'veteran-ssa':
        case 'barcode':
          ocr.init(data.settings);
          await ocr.startOCR(data.ocrType, sendResult, sendResult, onInProgressChange, serverOCRPreprocessor);
          break;
        default:
          new Error('Invalid ocrType');
          break;
      }
    }
  } catch (e) {
    console.error('[usebwasmocr] error', e);
    if (!(e instanceof SyntaxError && e.message.includes('JSON'))) {
      console.error('[usebwasmocr] error code', e.errorCode);
      console.error('[usebwasmocr] error message', e.message);
    }
    sendErrorResult('error', e.message);
  }
};

function serverOCRPreprocessor(result) {
  console.log('serverOCRPreprocessor', { result });
  return result;
}

//ios
window.addEventListener('message', messageHandler);
//android
document.addEventListener('message', messageHandler);
window.usebwasmocrreceive = messageHandler;

function sendErrorResult(result, errorMessage) {
  sendResult({
    result: 'error',
    error_message: errorMessage,
  });
}

function getPlatformInfomation() {
  window.platform.isWebViewIOSReactNative = false;
  window.platform.isWebViewAndroidReactNative = false;
  window.platform.isWebviewIOS = false;
  window.platform.isWebviewAndroid = false;
  window.platform.isWebBrowser = false;

  const agentInfo = window.navigator.userAgent.toLowerCase();
  window.platform.iOS = /iphone|ipod|ipad/.test(agentInfo);
  window.platform.android = /android/i.test(agentInfo);

  window.platform.chromeVer = 0;
  try {
    const chromeVer = parseInt(agentInfo.match(/chrome\/([0-9]*)./)[1]);
    if (!isNaN(chromeVer)) {
      window.platform.chromeVer = chromeVer;
    }
  } catch (e) {
    console.error('getPlatformInfomation() in error : ', e);
  }

  if (window.ReactNativeWebView) {
    // android + react-native cli + webview
    // android + react-native expo + webview
    // iOS + react-native cli + webview
    // iOS + react-native expo + webview
    if (window.platform.iOS) {
      window.platform.isWebViewIOSReactNative = true;
      window.platform.isWebViewAndroidReactNative = false;
    } else {
      window.platform.isWebViewIOSReactNative = false;
      window.platform.isWebViewAndroidReactNative = true;
    }
  } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.usebwasmocr) {
    // iOS + swift + WebView
    window.platform.isWebviewIOS = true;
  } else if (window['usebwasmocr']) {
    // android + webview
    window.platform.isWebviewAndroid = true;
  } else if (window.parent) {
    // web browser + iframe
    window.platform.isWebBrowser = true;
  }
}

window.platform = {};
getPlatformInfomation();

function sendResult(result) {
  console.debug('sendResult', result);
  const returnMessage = btoa(encodeURIComponent(JSON.stringify(result)));
  if (result.preloadType === PRELOAD_TYPE['PRELOAD_TYPE_WEBVIEW'] && result.result === 'preloaded') {
    window.parent.postMessage(returnMessage, targetOrigin);
  } else if (window.platform.isWebViewIOSReactNative || window.platform.isWebViewAndroidReactNative) {
    // android + react-native cli + webview
    // android + react-native expo + webview
    // iOS + react-native cli + webview
    // iOS + react-native expo + webview
    window.ReactNativeWebView.postMessage(returnMessage);
  } else if (window.platform.isWebviewIOS) {
    // iOS + swift + WebView
    window.webkit.messageHandlers.usebwasmocr && window.webkit.messageHandlers.usebwasmocr.postMessage(returnMessage);
  } else if (window.platform.isWebviewAndroid) {
    // android + webview
    window['usebwasmocr'] && window['usebwasmocr']['receive'] && window['usebwasmocr']['receive'](returnMessage);
  } else if (window.platform.isWebBrowser) {
    // web browser + iframe
    window.parent.postMessage(returnMessage, targetOrigin);
  }
}

// function sendResult(result) {
//   console.debug('sendResult', result);
//   const returnMessage = btoa(encodeURIComponent(JSON.stringify(result)));
//   if (window.parent) {
//     // Browser iframe
//     window.parent.postMessage(returnMessage, targetOrigin);
//   }
//
//   if (window.ReactNativeWebView) {
//     // react-native webview
//     window.ReactNativeWebView.postMessage(returnMessage);
//   }
//
//   if (window.webkit && window.webkit.messageHandlers) {
//     // iOS: WKScriptMessageHandler WKScriptMessage name(usebwasmocr)
//     window.webkit.messageHandlers.usebwasmocr && window.webkit.messageHandlers.usebwasmocr.postMessage(returnMessage);
//   } else if (window['usebwasmocr']) {
//     // Android: WebView JavascriptInterface name(usebwasmocr) and JS function(result)
//     window['usebwasmocr'] && window['usebwasmocr']['receive'] && window['usebwasmocr']['receive'](returnMessage);
//   }
// }

function onPreloaded() {
  console.log('ocr-wasm-sdk onPreloaded');
  sendResult({ result: 'preloaded', preloadType });
}
async function __onInProgressChangeWASM(
  ocrMode,
  ocrType,
  inProgress,
  customUI,
  uiPosition,
  useTextMsg,
  useCaptureUI,
  usePreviewUI,
  recognizedImage
) {
  const isCreditCard = ocrType.indexOf('credit') > -1;
  const isBarcode = ocrType.indexOf('barcode') > -1;
  const cardTypeString = isCreditCard ? '신용카드' : isBarcode ? 'USIM 바코드' : '신분증';
  let showLoadingUI = false;
  let showCaptureUI = false;

  // customUI
  if (customUI && useTextMsg) {
    let textMsg = '';
    switch (inProgress) {
      case ocr.IN_PROGRESS.NOT_READY:
        showLoadingUI = true;
        textMsg = `${cardTypeString} 촬영을 위해 카메라를 불러오는 중 입니다.`;
        break;
      case ocr.IN_PROGRESS.READY:
        textMsg = `영역 안에 ${cardTypeString}이(가) 꽉 차도록 위치시키면 자동 촬영됩니다.`;
        break;
      case ocr.IN_PROGRESS.CARD_DETECT_SUCCESS:
        textMsg = `${cardTypeString}이(가) 감지되었습니다. <br/>${cardTypeString} 정보를 자동으로 인식(OCR) 중 입니다.`;
        showCaptureUI = true;
        break;
      case ocr.IN_PROGRESS.CARD_DETECT_FAILED:
        textMsg = `${cardTypeString}이(가) 감지되지 않습니다. <br/>${cardTypeString} 영역 안에 ${cardTypeString}을 위치시켜 주세요.`;
        break;
      case ocr.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS:
        showLoadingUI = true;
        textMsg = `${cardTypeString}이(가) 촬영되었습니다. <br/>${cardTypeString} 정보를 인식(OCR) 중 입니다.`;
        break;
      case ocr.IN_PROGRESS.MANUAL_CAPTURE_FAILED:
        textMsg = `${cardTypeString}이(가) 감지되지 않습니다. <br/>${cardTypeString} 영역 안에 ${cardTypeString}을 위치시킨 후 촬영 버튼을 눌러주세요.`;
        break;
      case ocr.IN_PROGRESS.OCR_RECOGNIZED:
        textMsg = `${cardTypeString}이(가) 정보가 자동으로 인식(OCR) 되었습니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA:
        textMsg = `${cardTypeString}이(가) 정보가 <br/>자동으로 인식(OCR) 되었습니다. <br/>${cardTypeString} 사본(도용) 여부를 <br/>판별 중 입니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_SUCCESS:
        textMsg = `${cardTypeString} 인식이 완료 되었습니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_SUCCESS_WITH_SSA:
        textMsg = `${cardTypeString} 인식 및 사본(도용) 여부 판별이 완료되었습니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_FAILED:
        textMsg = `${cardTypeString} 인식에 실패하였습니다. 다시 시도해주세요.`;
        break;
    }

    let loadingUIHTML;
    let textMsgUI, loadingUI;

    textMsgUI = customUI.querySelector(`#${uiPosition}-ui-text-msg`);
    loadingUI = customUI.querySelector(`#${uiPosition}-ui-loading`);
    loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#FFF')}`;

    if (textMsgUI) {
      textMsgUI.innerHTML = textMsg;
    }

    if (loadingUI) {
      loadingUI.innerHTML = loadingUIHTML;
    }

    // PreviewUI
    if (usePreviewUI) {
      switch (inProgress) {
        case ocr.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS:
          textMsgUI = document.getElementById(`preview-ui-text-msg`);
          loadingUI = document.getElementById(`preview-ui-loading`);
          loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#000')}`;
          textMsg = `<br/>${cardTypeString} 정보 인식(OCR) 중 ...<br/>`;
          break;
        case ocr.IN_PROGRESS.MANUAL_CAPTURE_FAILED:
          textMsgUI = document.getElementById(`preview-ui-text-msg`);
          loadingUI = document.getElementById(`preview-ui-loading`);
          loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#000')}`;
          textMsg = `<br/>${cardTypeString} 감지 실패! 다시 촬영해주세요.<br/>(잠시 후 자동으로 알림이 닫힙니다.)<br/>`;
          break;
        case ocr.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA:
          textMsgUI = document.getElementById(`preview-ui-text-msg`);
          loadingUI = document.getElementById(`preview-ui-loading`);
          loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#000')}`;
          textMsg = `<br/>${cardTypeString} 사본(도용) 여부 판별 중...<br/>`;
          break;
      }

      if (textMsgUI) textMsgUI.innerHTML = textMsg;
      if (loadingUI) loadingUI.innerHTML = loadingUIHTML;
    }

    // captureUI
    if (useCaptureUI) {
      if (showCaptureUI) {
        ocr.__setStyle(ocr.__captureUIWrap, { display: 'flex' });
      } else {
        ocr.__setStyle(ocr.__captureUIWrap, { display: 'none' });
      }
    }

    await ocr.__sleep(1); // for UI update
  }
}

async function __onInProgressChangeServer(
  ocrMode,
  ocrType,
  inProgress,
  customUI,
  uiPosition,
  useTextMsg,
  useCaptureUI,
  usePreviewUI,
  recognizedImage
) {
  const isCreditCard = ocrType.indexOf('credit') > -1;
  const isBarcode = ocrType.indexOf('barcode') > -1;
  const cardTypeString = isCreditCard ? '신용카드' : isBarcode ? 'USIM 바코드' : '신분증';
  let showLoadingUI = false;
  let showCaptureUI = false;

  // customUI
  if (customUI && useTextMsg) {
    let textMsg = '';
    switch (inProgress) {
      case ocr.IN_PROGRESS.NOT_READY:
        showLoadingUI = true;
        textMsg = `${cardTypeString} 촬영을 위해 카메라를 불러오는 중 입니다.`;
        break;
      case ocr.IN_PROGRESS.READY:
        textMsg = `영역 안에 ${cardTypeString}이(가) 꽉 차도록 위치시킨 후 촬영 버튼을 눌러주세요.`;
        showCaptureUI = true;
        break;
      case ocr.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS:
        showLoadingUI = true;
        textMsg = `${cardTypeString}이(가) 촬영되었습니다. <br/>${cardTypeString} 정보를 인식(OCR) 중 입니다.`;
        break;
      case ocr.IN_PROGRESS.MANUAL_CAPTURE_FAILED:
        textMsg = `${cardTypeString}이(가) 감지되지 않습니다. <br/>${cardTypeString} 영역 안에 ${cardTypeString}을 위치시킨 후 촬영 버튼을 눌러주세요.`;
        showCaptureUI = true;
        break;
      case ocr.IN_PROGRESS.OCR_RECOGNIZED:
        textMsg = `${cardTypeString}이(가) 정보가 자동으로 인식(OCR) 되었습니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA:
        textMsg = `${cardTypeString}이(가) 정보가 <br/>자동으로 인식(OCR) 되었습니다. <br/>${cardTypeString} 사본(도용) 여부를 <br/>판별 중 입니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_SUCCESS:
        textMsg = `${cardTypeString} 인식이 완료 되었습니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_SUCCESS_WITH_SSA:
        textMsg = `${cardTypeString} 인식 및 사본(도용) 여부 판별이 완료되었습니다.`;
        break;
      case ocr.IN_PROGRESS.OCR_FAILED:
        textMsg = `${cardTypeString} 인식에 실패하였습니다. 다시 시도해주세요.`;
        break;
    }

    let loadingUIHTML;
    let textMsgUI, loadingUI;

    textMsgUI = customUI.querySelector(`#${uiPosition}-ui-text-msg`);
    loadingUI = customUI.querySelector(`#${uiPosition}-ui-loading`);
    loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#FFF')}`;

    if (textMsgUI) {
      textMsgUI.innerHTML = textMsg;
    }

    if (loadingUI) {
      loadingUI.innerHTML = loadingUIHTML;
    }

    // PreviewUI
    if (usePreviewUI) {
      switch (inProgress) {
        case ocr.IN_PROGRESS.MANUAL_CAPTURE_SUCCESS:
          textMsgUI = document.getElementById(`preview-ui-text-msg`);
          loadingUI = document.getElementById(`preview-ui-loading`);
          loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#000')}`;
          textMsg = `<br/>${cardTypeString} 정보 인식(OCR) 중 ...<br/>`;
          break;
        case ocr.IN_PROGRESS.MANUAL_CAPTURE_FAILED:
          textMsgUI = document.getElementById(`preview-ui-text-msg`);
          loadingUI = document.getElementById(`preview-ui-loading`);
          loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#000')}`;
          textMsg = `<br/>${cardTypeString} 감지 실패! 다시 촬영해주세요.<br/>(잠시 후 자동으로 알림이 닫힙니다.)<br/>`;
          break;
        case ocr.IN_PROGRESS.OCR_RECOGNIZED_WITH_SSA:
          textMsgUI = document.getElementById(`preview-ui-text-msg`);
          loadingUI = document.getElementById(`preview-ui-loading`);
          loadingUIHTML = `${getLoadingUIHTML(uiPosition, showLoadingUI, '#000')}`;
          textMsg = `<br/>${cardTypeString} 사본(도용) 여부 판별 중...<br/>`;
          break;
      }

      if (textMsgUI) textMsgUI.innerHTML = textMsg;
      if (loadingUI) loadingUI.innerHTML = loadingUIHTML;
    }

    // captureUI
    if (useCaptureUI) {
      if (showCaptureUI) {
        ocr.__setStyle(ocr.__captureUIWrap, { display: 'flex' });
      } else {
        ocr.__setStyle(ocr.__captureUIWrap, { display: 'none' });
      }
    }

    await ocr.__sleep(1); // for UI update
  }
}

async function onInProgressChange(
  ocrMode,
  ocrType,
  inProgress,
  customUI,
  uiPosition,
  useTextMsg,
  useCaptureUI,
  usePreviewUI,
  recognizedImage
) {
  if (ocrMode === 'wasm') {
    await __onInProgressChangeWASM.apply(this, arguments);
  } else if (ocrMode === 'server') {
    await __onInProgressChangeServer.apply(this, arguments);
  } else {
    console.error(`invalid ocrMode : ${ocrMode}`);
    return;
  }
}

function getLoadingUIHTML(uiPosition, showLoadingUI, fillColor) {
  return (
    `` +
    `<svg xmlns='http://www.w3.org/2000/svg' id='${uiPosition}-ui-loading' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: none; display: ${
      showLoadingUI ? 'block' : 'none'
    }; shape-rendering: auto;' width='32px' height='32px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>\n` +
    `  <circle cx='84' cy='50' r='10' fill='${fillColor}'>\n` +
    `    <animate attributeName='r' repeatCount='indefinite' dur='0.5555555555555556s' calcMode='spline' keyTimes='0;1' values='10;0' keySplines='0 0.5 0.5 1' begin='0s'></animate>\n` +
    `    <animate attributeName='fill' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='discrete' keyTimes='0;0.25;0.5;0.75;1' values='#86868600;#86868600;#86868600;#86868600;#86868600' begin='0s'></animate>\n` +
    `  </circle>` +
    `  <circle cx='16' cy='50' r='10' fill='${fillColor}'>\n` +
    `    <animate attributeName='r' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='0;0;10;10;10' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='0s'></animate>\n` +
    `    <animate attributeName='cx' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='16;16;16;50;84' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='0s'></animate>\n` +
    `  </circle>` +
    `  <circle cx='50' cy='50' r='10' fill='${fillColor}'>\n` +
    `    <animate attributeName='r' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='0;0;10;10;10' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='-0.5555555555555556s'></animate>\n` +
    `    <animate attributeName='cx' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='16;16;16;50;84' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='-0.5555555555555556s'></animate>\n` +
    `  </circle>` +
    `  <circle cx='84' cy='50' r='10' fill='${fillColor}'>\n` +
    `    <animate attributeName='r' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='0;0;10;10;10' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='-1.1111111111111112s'></animate>\n` +
    `    <animate attributeName='cx' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='16;16;16;50;84' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='-1.1111111111111112s'></animate>\n` +
    `  </circle>` +
    `  <circle cx='16' cy='50' r='10' fill='${fillColor}'>\n` +
    `    <animate attributeName='r' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='0;0;10;10;10' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='-1.6666666666666665s'></animate>\n` +
    `    <animate attributeName='cx' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='16;16;16;50;84' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='-1.6666666666666665s'></animate>\n` +
    `  </circle>\n` +
    `</svg>`
  );
}
