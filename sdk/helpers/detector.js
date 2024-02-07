/* eslint-disable */

/* global-module */
class Detector {
  /** 브라우저 체크 */
  getBrowserName() {
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf('chrome') !== -1) return 'Chrome';
    if (agt.indexOf('opera') !== -1) return 'Opera';
    if (agt.indexOf('staroffice') !== -1) return 'Star Office';
    if (agt.indexOf('webtv') !== -1) return 'WebTV';
    if (agt.indexOf('beonex') !== -1) return 'Beonex';
    if (agt.indexOf('chimera') !== -1) return 'Chimera';
    if (agt.indexOf('netpositive') !== -1) return 'NetPositive';
    if (agt.indexOf('phoenix') !== -1) return 'Phoenix';
    if (agt.indexOf('firefox') !== -1) return 'Firefox';
    if (agt.indexOf('safari') !== -1) return 'Safari';
    if (agt.indexOf('skipstone') !== -1) return 'SkipStone';
    if (agt.indexOf('netscape') !== -1) return 'Netscape';
    if (agt.indexOf('mozilla/5.0') !== -1) return 'Mozilla';
    if (agt.indexOf('msie') !== -1) {
      var rv = -1;
      if (navigator.appName === 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
      }
      return 'Internet Explorer ' + rv;
    }
  }

  /** User Agent 체크 */
  getOsVersion() {
    var ua = navigator.userAgent;
    var os = 'Unknown OS';
    var osSimple = 'UNKNOWN';
    if (ua.match(/Win(dows )?NT 6\.0/)) {
      os = 'Windows Vista';
      osSimple = 'WIN';
    } else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) {
      os = 'Windows XP';
      osSimple = 'WIN';
    } else {
      if (ua.indexOf('Windows NT 5.1') !== -1 || ua.indexOf('Windows XP') !== -1) {
        os = 'Windows XP';
        osSimple = 'WIN';
      } else if (ua.indexOf('Windows NT 7.0') !== -1 || ua.indexOf('Windows NT 6.1') !== -1) {
        os = 'Windows 7';
        osSimple = 'WIN';
      } else if (ua.indexOf('Windows NT 8.0') !== -1 || ua.indexOf('Windows NT 6.2') !== -1) {
        os = 'Windows 8';
        osSimple = 'WIN';
      } else if (ua.indexOf('Windows NT 8.1') !== -1 || ua.indexOf('Windows NT 6.3') !== -1) {
        os = 'Windows 8.1';
        osSimple = 'WIN';
      } else if (ua.indexOf('Windows NT 10.0') !== -1 || ua.indexOf('Windows NT 6.4') !== -1) {
        os = 'Windows 10';
        osSimple = 'WIN';
      } else if (ua.indexOf('iPad') !== -1 || ua.indexOf('iPhone') !== -1 || ua.indexOf('iPod') !== -1) {
        os = 'Apple iOS';
        osSimple = 'IOS';
      } else if (ua.indexOf('Android') !== -1) {
        os = 'Android OS';
        osSimple = 'ANDROID';
      } else if (ua.match(/Win(dows )?NT( 4\.0)?/)) {
        os = 'Windows NT';
        osSimple = 'WIN';
      } else if (ua.match(/Mac|PPC/)) {
        os = 'Mac OS';
        osSimple = 'MAC';
      } else if (ua.match(/Linux/)) {
        os = 'Linux';
        osSimple = 'LINUX';
      } else if (ua.match(/(Free|Net|Open)BSD/)) {
        os = RegExp.$1 + 'BSD';
      } else if (ua.match(/SunOS/)) {
        os = 'Solaris';
        osSimple = 'SOLARIS';
      }
    }
    return {
      os,
      osSimple
    };
  }

  /** UI Orientation 체크 */
  getUIOrientation(rootUIContainer) {
    return this.getOrientation(rootUIContainer);
  }
  getOrientation(targetElement) {
    var ratio = targetElement.clientWidth / targetElement.clientHeight;
    return ratio < 1 ? 'portrait' : 'landscape';
  }

  /** OCR 인식에 필요한 HTML 요소 추출 함수 */
  getOCRElements() {
    var dataAttribute = 'data-useb-ocr';
    return {
      ocr: document.querySelector("[".concat(dataAttribute, "=\"ocr\"]")),
      video: document.querySelector("[".concat(dataAttribute, "=\"video\"]")),
      canvas: document.querySelector("[".concat(dataAttribute, "=\"canvas\"]")),
      rotationCanvas: document.querySelector("[".concat(dataAttribute, "=\"rotationCanvas\"]")),
      videoWrap: document.querySelector("[".concat(dataAttribute, "=\"videoWrap\"]")),
      guideBoxWrap: document.querySelector("[".concat(dataAttribute, "=\"guideBoxWrap\"]")),
      maskBoxWrap: document.querySelector("[".concat(dataAttribute, "=\"maskBoxWrap\"]")),
      guideBox: document.querySelector("[".concat(dataAttribute, "=\"guideBox\"]")),
      preventToFreezeVideo: document.querySelector("[".concat(dataAttribute, "=\"preventToFreezeVideo\"]")),
      customUIWrap: document.querySelector("[".concat(dataAttribute, "=\"customUIWrap\"]")),
      topUI: document.querySelector("[".concat(dataAttribute, "=\"topUI\"]")),
      middleUI: document.querySelector("[".concat(dataAttribute, "=\"middleUI\"]")),
      bottomUI: document.querySelector("[".concat(dataAttribute, "=\"bottomUI\"]")),
      previewUIWrap: document.querySelector("[".concat(dataAttribute, "=\"previewUIWrap\"]")),
      previewUI: document.querySelector("[".concat(dataAttribute, "=\"previewUI\"]")),
      previewImage: document.querySelector("[".concat(dataAttribute, "=\"previewImage\"]")),
      captureUIWrap: document.querySelector("[".concat(dataAttribute, "=\"captureUIWrap\"]")),
      captureUI: document.querySelector("[".concat(dataAttribute, "=\"captureUI\"]")),
      captureButton: document.querySelector("[".concat(dataAttribute, "=\"captureButton\"]")),
      switchUIWrap: document.querySelector("[".concat(dataAttribute, "=\"switchUIWrap\"]")),
      switchUI: document.querySelector("[".concat(dataAttribute, "=\"switchUI\"]")),
      preloadingUIWrap: document.querySelector("[".concat(dataAttribute, "=\"preloadingUIWrap\"]")),
      preloadingUI: document.querySelector("[".concat(dataAttribute, "=\"preloadingUI\"]"))
    };
  }
}
export default new Detector();