![Version](https://img.shields.io/badge/version-v1.32.0-blue)

# [useB.WASM] (고객사) WEB ↔ ocr sdk 연동 가이드

iframe 연동 없이 WEB페이지 내에서 ocr sdk를 고객사 사용하는 샘플코드입니다.

> ※ iframe 연동 샘플은 아래 샘플을 확인해주세요. <br/> https://github.com/useb-inc/wasm-ocr-sample-iframe

### "샘플 소스" 구성

"샘플 소스" 내 구조 설명

```html
demo/ --> ocr.html 을 iframe 으로 연동하는 데모가 들어있는 폴더입니다.
├── css/
│   └── demo.css
├── img/
│   └── bg_graphic.svg
├── js/
│   ├── ui_simulator.js
│   └── util.js
├── lib/
│   └── lodash.min.js
├── demo.js --> index.html 에서 실행될 샘플 js script 입니다. ocr sdk를 사용하는 script 예제가 포함되어있습니다.
└── index.html --> ocr sdk 관련 옵션을 설정하고 ocr을 로드할 고객사 페이지 샘플 예제입니다.

sdk/
├── css/
│   └── sdk.css
├── helpers/ --> ocr.js 에서 사용되는 유틸 스크립트 입니다.
│   ├── detector.js 
│   └── parser.js
├── lib/
│   └── lodash.min.js
├── ocr.html  --> x
├── useb-ocr-wasm-sdk.js --> x
├── ocr.js --> ocr 인식을 수행하는 라이브러리 wrapper script 입니다.
├── quram.js
├── quram.wasm
└── quram.data
```

| 파일         | 설명                                                                | 비고                                          |
| ------------ | ------------------------------------------------------------------- | --------------------------------------------- |
| index.html   | 예제 html 파일 (ocr.html 모듈을 연동한 샘플 html)                   | web에서 연동하시는 경우, 참고하여 개발에 활용 |
| ocr.js       | 웹어셈블리 용 SDK js 파일                                           | 변경 불필요                                   |
| quram.js     | 웹어셈블리 바이너리와 데이터를 사용할 수 있도록 wrapping 된 js 파일 | 변경 불필요                                   |
| quram.wasm   | 웹어셈블리 바이너리 파일                                            | 변경 불필요                                   |
| quram.data   | 웹어셈블리 데이터 파일                                              | 변경 불필요                                   |
| helpers 폴더 | SDK js 파일에서 사용되는 유틸리티 js 파일 폴더                      | 변경 불필요                                   |

### `index.html` - **oOCR sdk를 로드할** 샘플입니다.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>OCR/SSA WebAssembly Sample</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="./css/demo.css" />

    <script type="text/javascript" src="./js/util.js"></script>
    <script type="text/javascript" src="./lib/lodash.min.js"></script>
    <script type="module" src="./js/ui_simulator.js" async></script>
    <script src="https://kit.fontawesome.com/71d7c8cd6e.js" crossorigin="anonymous"></script>
  </head>

  <body>
    <div id="debug_win" class="debug_win" style="display: none"></div>
    <div
      id="loading-ui"
      class="fullscreen"
      style="
        display: none;
        background: rgba(0, 0, 0, 0.4);
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        color: white;
      "
    >
      LOADING ....
    </div>

    <!-- 온보딩 섹션 -->
    <section id="onboarding-section" class="onboarding-section">
      <div class="onboarding--title">
        <span class="top-ui-logo">
          useB.<b><span style="color: #fff">wasmOCR</span></b>
        </span>
      </div>
      <div class="onboarding--content">
        <div class="option--wrapper">
          <input id="onboarding-use-preloading" type="checkbox" />
          <label for="onboarding-use-preloading">preloading 사용</label>
        </div>
        <button id="onboarding-start" type="button">시작</button>
      </div>
    </section>

    <!-- OCR종류 섹션 -->
    <section id="card-select-section" class="card-select-section" style="display: none">
      ...생략 (index.html 참고)
    </section>

    <!-- Preloading 섹션 -->
    <section class="button-section">
      ...생략 (index.html 참고)
    </section>

    <!-- 시뮬레이터 섹션 -->
    <section id="simulator-section" class="simulator-section customer--section" style="display: none">
      <div class="prev-button">
        <button type="button" class="prev">이전</button>
        <span></span>
      </div>

      <!-- 이미지 스캔 카메라 섹션 -->
      <section class="scan-section">
        ...생략 (index.html 참고)
      </section>

      <!-- 옵션 세팅 섹션 -->
      <section class="settings-section collapsed">
        ...생략 (index.html 참고)
      </section>
    </section>

    <!-- OCR 결과 섹션 -->
    <section id="result-section" class="fullscreen result-section" style="display: none">
      ...생략 (index.html 참고)
    </section>

    <script type="module" src="./demo.js" async></script>
  </body>
</html>

```

큰 분류로 `온보딩 섹션`, `신분증 종류 선택 섹션`, `OCR 섹션`, `OCR 결과 섹션`으로 나뉩니다.

`신분증 종류 선택 섹션`에서 신분증 선택 시 OCR 관련 리소스를 로드하며, `OCR 섹션`에서 카메라가 로드됩니다.

### `demo.js` - **OCR sdk를 연동호출하는** 샘플 js입니다.
- 고객사별 params 설정 기능
  - 예제는 테스트를 위해 “유스비” 인프라에 설치된 OCR 모듈에 대한 라이센스키 정보로 파라미터가 값이 설정되어 있습니다.
```js
/* ocr sdk 리소스를 불러오는 base url입니다. */
const OCR_RESOURCE_BASE_URL = 'https://ocr.useb.co.kr/';
/* 아래 정보는 UseB 도메인에서만 동작하는 라이센스키로서, 테스트를 위해서는 테스트 라이센스 키를 발급받고, OCR_TARGET_ORIGIN 과 OCR_URL 은 변경해야합니다. */
const OCR_LICENSE_KEY = 'FPkTBLFIa/Tn/mCZ5WKPlcuDxyb2bJVPSURXacnhj2d82wm39/tFIjCPpMsiXoPxGbN6G6l5gSLMBfwB6nwgIJZFWX0WlS1Jl49321wADP7yEhxE='
```

<br/>
<br/>

- OCR 모듈 호출 기능
```js
const onClickStartCallback = async (type, settings) => {
  const setting = {
    ...settings,
    licenseKey: OCR_LICENSE_KEY,
    resourceBaseUrl: OCR_RESOURCE_BASE_URL
  };

  switch (type) {
    // OCR
    case 'idcard':
    case 'passport':
    case 'alien':
    case 'alien-back':
    case 'credit':
    // SSA
    case 'idcard-ssa':
    case 'passport-ssa':
    case 'alien-ssa':
      ocr.init(setting);
      await ocr.startOCR(type, sendResult, sendResult, onInProgressChange);
      break;
    default:
      new Error('Invalid ocrType');
      break;
  }
};
```

<br/>
<br/>

- OCR 모듈 Preloading 기능
  - OCR 모듈을 화면에 미리 로드하여 최초 카메라 로드까지 체감시간을 단축할 수 있습니다.
  ```js
  async function onClickStartPreloadingCallback() {
    const preloading = document.querySelector('#onboarding-use-preloading').checked;
    if (preloading) {
      document.querySelector('section.button-section').style.display = 'flex';
      document.querySelector('#preloading-status-text').value = 'Start';
      ocr.init({ ...ocrDefaultSettings });
      await ocr.preloading(onPreloadedCallback);
    }
  }
  ```
  - preloading 기능 사용시 preloading이 완료되면 실행되는 콜백입니다.
  ```js
  function onPreloadedCallback() {
    console.debug('[onPreloadedCallback] if you have loading ui, you need to hide it here.');
    document.querySelector('#preloading-status-text').value = 'End';
  }
  ```


<br/>
<br/>

- OCR 완료 후 result 수신 기능 및 OCR 결과 Parsing 예시
  - result 수신 기능
  ```js
  function sendResult(result) {
    try {
      console.debug('sendResult', result);
      console.log(result.result + ' 처리 필요');

      let json2 = _.cloneDeep(result);

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
  ```

  - 수신된 OCR결과 Parsing 기능
  ```js
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
      } else if (detail.ocr_type.indexOf('credit') > -1) {
        ocr_type_txt = '신용카드';
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
            "' /></b>";
        }
      } else {
        if (detail.ocr_masking_image) {
          content +=
            "<br/> - 신분증 마스킹 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
            detail.ocr_masking_image +
            "' /></b>";
        }

        const encryptMode = document.querySelector('#use-encrypt-mode').checked;

        if (detail.ocr_origin_image) {
          content += encryptMode
            ? '<br/> - 신분증 원본 사진<br/>Encrypted'
            : "<br/> - 신분증 원본 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
              detail.ocr_origin_image +
              "' /></b>";
        }
        if (detail.ocr_face_image) {
          content +=
            "<br/> - 신분증의 얼굴 사진<br/>&nbsp;&nbsp;&nbsp;<img style='max-height:200px;' src='" +
            detail.ocr_face_image +
            "' /></b>";
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
  ```

- 인증 결과(result : success, failed)에 따른 다음 화면 설정 기능
```js
function endOCR() {
  document.getElementById('simulator-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.querySelector('section.button-section').style.display = 'none';
  document.querySelector('#preloading-status-text').value = '';
  hideLoadingUI();
}
```
