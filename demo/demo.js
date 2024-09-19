import UseBOCR from 'https://ocr.useb.co.kr/ocr.js';

const ocr = new UseBOCR();

/** 아래 정보는 UseB 도메인에서만 동작하는 정보로 테스트를 위해서는 테스트 라이센스 키를 발급받고, TARGET_ORIGIN 과 URL 은 변경해야합니다. */
// const OCR_TARGET_ORIGIN = "*";     // 보안적으로 취약하니 *을 사용하는것은 권장하지 않습니다. (refer : https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#:~:text=serialize%20them%20yourself.-,targetOrigin,-Specifies%20what%20the)
const OCR_TARGET_ORIGIN = 'https://ocr.useb.co.kr';
const OCR_URL = 'https://ocr.useb.co.kr/ocr.html';
const OCR_LICENSE_KEY = 'FPkTCWqzP92aSVViuJanAxoyTQtMy0ylKAMfPYjo/tQklJu7qypi+cl87Te3MLOJZg2a4qxx2PC+IJmDxfS/EX/UIHnO3V3ytrI87Cubja+tYhhGb0susglgvZ+GP+Z8vp8ED3mVBsbUbVNiFVJWQm2BWknNlK6hnntmzHBC75feBQQ75r95mAfZ8iijXTmSOOPcf31EPMU9G3OJaoo/bGACIGw==';
const OCR_RESOURCE_BASE_URL = 'https://ocr.useb.co.kr/';

/** localhost에서 'npm run start'로 실행 시 사용 참고 */
// const OCR_TARGET_ORIGIN = 'https://127.0.0.1:8090'
// const OCR_URL = 'https://127.0.0.1:8090/sdk/ocr.html'
// const OCR_LICENSE_KEY = 'SHOULD BE ENTER LICENSE KEY';
// const OCR_RESOURCE_BASE_URL = 'https://127.0.0.1:8090/sdk/';

/** webstorm에서 'Javascript Debugger' 사용 시 참고 */
// const OCR_TARGET_ORIGIN = 'https://localhost:63342/useb-ocr-wasm-sdk-sample';
// const OCR_URL = 'https://localhost:63342/useb-ocr-wasm-sdk-sample/build/sdk/ocr.html';
// const OCR_LICENSE_KEY = 'SHOULD BE ENTER LICENSE KEY';
// const OCR_RESOURCE_BASE_URL = 'https://localhost:63342/useb-ocr-wasm-sdk-sample/build/sdk/';

const AUTH_SERVER_INFO = {
  credential: {
    customer_id: parseInt('84'),
    username: 'kcuGDPG37Q',
    password: '3uR7Pc2BwMa5D$u',
  },
  baseUrl: 'https://common-api.useb.co.kr',
};
const OCR_SERVER_BASE_URL = 'https://quram.useb.co.kr';

const ocrIframe = document.getElementById('resolution-simulation-frame');
const ocrDefaultSettings = {
  licenseKey: OCR_LICENSE_KEY,
  resourceBaseUrl: OCR_RESOURCE_BASE_URL,
  // preloadingUITextMsg: '신분증인증 모듈을 불러오는 중 입니다 ~~<br />잠시만 기다려주세요 ~~',
};

let preloaded = false;

const onClickStartCallback = async (type, settings) => {
  const setting = {
    ...ocrDefaultSettings,
    ...settings,
    authServerInfo: AUTH_SERVER_INFO,
    ocrServerBaseUrl: OCR_SERVER_BASE_URL,
  };

  try {
    // document URL이 reload되지 않고 startOCR 중복호출 되었을 때,
    // 자원정리 이슈 방지하여 stopOCR 미리 한번 호출.
    ocr.stopOCR();
  } catch (e) {
    // nothing to do..
  }

  switch (type) {
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
      ocr.init(setting);
      await ocr.startOCR(type, sendResult, sendResult, onInProgressChange);
      break;
    default:
      new Error('Invalid ocrType');
      break;
  }
  // console.log('onClickStartCallback');
  // showLoadingUI();
};

const onClickRestartCallback = () => {
  document.getElementById('ocr_result').innerHTML = '';
  document.getElementById('ocr_status').innerHTML = '';

  restartOCR();
};

async function onClickStartPreloadingCallback() {
  const preloading = document.querySelector('#onboarding-use-preloading').checked;
  if (preloading) {
    document.querySelector('section.button-section').style.display = 'flex';
    document.querySelector('#preloading-status-text').value = 'Start';
    ocr.init({ ...ocrDefaultSettings });
    await ocr.preloading(onPreloadedCallback);
  }
}

function onPreloadedCallback() {
  console.debug('[onPreloadedCallback] if you have loading ui, you need to hide it here.');
  document.querySelector('#preloading-status-text').value = 'End';
}

function sendResult(result) {
  // const returnMessage = btoa(encodeURIComponent(JSON.stringify(result)));
  try {
    // const decodedData = decodeURIComponent(atob(event.data));
    console.debug('sendResult', result);
    console.log(result.result + ' 처리 필요');

    let json2 = _.cloneDeep(result);

    if (json2?.review_result) {
      const review_result = json2.review_result;

      if (review_result.ocr_masking_image) {
        review_result.ocr_masking_image = stringShortener(review_result.ocr_masking_image, 50);
      }
      if (review_result.ocr_origin_image) {
        review_result.ocr_origin_image = stringShortener(review_result.ocr_origin_image, 50);
      }
      if (review_result.ocr_face_image) {
        review_result.ocr_face_image = stringShortener(review_result.ocr_face_image, 50);
      }

      if (review_result.encrypted) {
        if (review_result.encrypted.ocr_masking_image) {
          review_result.encrypted.ocr_masking_image = stringShortener(review_result.encrypted.ocr_masking_image, 50);
        }
        if (review_result.encrypted.ocr_origin_image) {
          review_result.encrypted.ocr_origin_image = stringShortener(review_result.encrypted.ocr_origin_image, 50);
        }
        if (review_result.encrypted.ocr_face_image) {
          review_result.encrypted.ocr_face_image = stringShortener(review_result.encrypted.ocr_face_image, 50);
        }
      }

      if (review_result.encrypted_overall) {
        review_result.encrypted_overall = stringShortener(review_result.encrypted_overall, 50);
      }
    }

    const str = JSON.stringify(json2, undefined, 4);
    const strHighlight = syntaxHighlight(str);

    if (result.result === 'success') {
      updateDebugWin(strHighlight);
      updateOCRResult(strHighlight, result);
      updateOCRStatus('OCR이 완료되었습니다.');
    } else if (result.result === 'failed') {
      updateDebugWin(strHighlight);
      updateOCRResult(strHighlight, result);
      updateOCRStatus('OCR이 실패되었습니다.');
    } else {
      // invalid result
    }
  } catch (error) {
    console.log('wrong data', error);
  } finally {
    endOCR();
  }
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

import UISimulator from './js/ui_simulator.js';

const ui_simulator = new UISimulator(onClickStartCallback, onClickRestartCallback, onClickStartPreloadingCallback);

const postMessageListener = (event) => {
  console.debug('message response', event.data); // base64 encoded된 JSON 메시지이므로 decoded해야 함
  console.debug('origin :', event.origin);
  try {
    const decodedData = decodeURIComponent(atob(event.data));
    console.debug('decoded', decodedData);
    const json = JSON.parse(decodedData);
    console.debug('json', json);

    console.log(json.result + ' 처리 필요');

    let json2 = _.cloneDeep(json);

    if (json2?.review_result) {
      const review_result = json2.review_result;

      if (review_result.ocr_masking_image) {
        review_result.ocr_masking_image = review_result.ocr_masking_image.substring(0, 50) + '...생략...';
      }
      if (review_result.ocr_origin_image) {
        review_result.ocr_origin_image = review_result.ocr_origin_image.substring(0, 50) + '...생략...';
      }
      if (review_result.ocr_face_image) {
        review_result.ocr_face_image = review_result.ocr_face_image.substring(0, 50) + '...생략...';
      }
    }

    const str = JSON.stringify(json2, undefined, 4);
    const strHighlight = syntaxHighlight(str);

    if (json.result === 'success') {
      updateDebugWin(strHighlight);
      updateOCRResult(strHighlight, json);
      updateOCRStatus('OCR이 완료되었습니다.');
      endOCR();
    } else if (json.result === 'failed') {
      updateDebugWin(strHighlight);
      updateOCRResult(strHighlight, json);
      updateOCRStatus('OCR이 실패되었습니다.');
      endOCR();
    } else if (json.result === 'preloaded') {
      console.debug('wasm preloaded callback ! need remove loading ui');
      preloaded = true;
      setPreloadingStatus('End');
      hideLoadingUI();
    } else if (json.result === 'error') {
      console.debug('wasm preloaded callback ! need remove loading ui');
      updateOCRStatus(`OCR중 에러가 발생되었습니다 (${json.error_message})`);
      setPreloadingStatus('');
      hideLoadingUI();
      endOCR();
    } else {
      // invalid result
      endOCR();
    }
  } catch (error) {
    console.log('wrong data', error);
  } finally {
    // endOCR();
  }
};

window.addEventListener('message', postMessageListener);

function setPreloadingStatus(status) {
  document.getElementById('preloading-status-text').value = status;
}

function showLoadingUI() {
  document.getElementById('loading-ui').style.display = 'flex';
}

function hideLoadingUI() {
  document.getElementById('loading-ui').style.display = 'none';
}

function showOCRIframeUI() {
  ocrIframe.style.display = 'block';
}
function hideOCRIframeUI() {
  ocrIframe.style.display = 'none';
}

function startOCR() {
  document.getElementById('simulator-section').style.display = 'flex';
  document.getElementById('result-section').style.display = 'none';
}

function endOCR() {
  document.getElementById('simulator-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.querySelector('section.button-section').style.display = 'none';
  document.querySelector('#preloading-status-text').value = '';
  hideLoadingUI();
}

function restartOCR() {
  document.querySelector('#onboarding-section').style.display = 'flex';
  document.querySelector('#simulator-section').style.display = 'none';
  document.querySelector('#result-section').style.display = 'none';

  if (ocr) {
    ocr.cleanup();
    ocr.restoreInitialize();
  }
}

function updateOCRResult(data, json) {
  const OCRResult = document.getElementById('ocr_result');
  OCRResult.innerHTML = '';

  const title1 = document.createElement('h3');
  title1.innerHTML = '<h3 class="custom--headline">최종 결과</h3>';

  const result1 = document.createElement('div');
  result1.className = 'syntaxHighlight bright';
  result1.style.textAlign = 'center';

  const detail = json.review_result;
  let content = '';

  if (detail) {
    let ocr_type_txt = 'N/A';
    if (detail.ocr_type.indexOf('idcard') > -1) {
      ocr_type_txt = '주민등록증/운전면허증';
    } else if (detail.ocr_type.indexOf('passport') > -1) {
      ocr_type_txt = '국내/해외여권';
    } else if (detail.ocr_type.indexOf('alien-back') > -1) {
      ocr_type_txt = '외국인등록증 뒷면';
    } else if (detail.ocr_type.indexOf('alien') > -1) {
      ocr_type_txt = '외국인등록증';
    } else if (detail.ocr_type.indexOf('veteran') > -1) {
      ocr_type_txt = '국가보훈증';
    } else if (detail.ocr_type.indexOf('credit') > -1) {
      ocr_type_txt = '신용카드';
    } else if (detail.ocr_type.indexOf('barcode') > -1) {
      ocr_type_txt = 'USIM 바코드';
    } else if (detail.ocr_type.indexOf('idcard-ssa') > -1) {
      ocr_type_txt += ' + 사본탐지';
    } else {
      ocr_type_txt = 'INVALID_TYPE(' + detail.ocr_type + ')';
    }
    title1.innerHTML +=
      '- OCR 결과 : ' +
      (json.result === 'success' ? "<span style='color:blue'>성공</span>" : "<span style='color:red'>실패</span>") +
      ' </br>';
    title1.innerHTML += '- OCR 종류 : ' + "<span style='color:blue'>" + ocr_type_txt + '</span></br>';
    if (detail.ocr_type.indexOf('-ssa') > -1 && detail.ocr_data?.truth) {
      title1.innerHTML += '- 사본판별 결과 : ' + "<span style='color:blue'>" + detail.ocr_data.truth + '</span></br>';
    }

    if (detail.ocr_type.indexOf('credit') > -1) {
      if (detail.ocr_origin_image) {
        content +=
          "<br/> - 신용카드 원본 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
          detail.ocr_origin_image +
          "' /><br/>";
      }
    } else {
      const piiEncryptMode = document.querySelector('#encrypt-type').value === 'piiEncrypt';

      if (detail.ocr_masking_image) {
        content += piiEncryptMode
          ? '<br/> - 신분증 마스킹 사진<br/>Encrypted'
          : "<br/> - 신분증 마스킹 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
            detail.ocr_masking_image +
            "' /><br/>";
      }
      if (detail.ocr_origin_image) {
        content += piiEncryptMode
          ? '<br/> - 신분증 원본 사진<br/>Encrypted'
          : "<br/> - 신분증 원본 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
            detail.ocr_origin_image +
            "' /><br/>";
      }
      if (detail.ocr_face_image) {
        content += piiEncryptMode
          ? '<br/> - 신분증 얼굴 사진<br/>Encrypted'
          : "<br/> - 신분증의 얼굴 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
            detail.ocr_face_image +
            "' /><br/>";
      }
    }
  }

  result1.innerHTML = content;
  OCRResult.appendChild(title1);
  OCRResult.appendChild(result1);

  const title2 = document.createElement('h3');
  title2.innerHTML = '<h3 class="custom--headline">PostMessage 상세</h3>';

  const result2 = document.createElement('pre');
  result2.className = 'syntaxHighlight bright';
  result2.innerHTML = data;
  OCRResult.appendChild(title2);
  OCRResult.appendChild(result2);
}

function updateOCRStatus(msg) {
  const div = document.getElementById('ocr_status');
  div.innerHTML = msg;
}
