function removeDebugWin() {
  var div = document.getElementById('debug_win');
  div.style.display = 'none';
  div.innerHTML = '';
}
function updateDebugWin(inp) {
  var debug_win_checkbox = document.getElementById('debug_win_checkbox');
  if (!!!debug_win_checkbox || !debug_win_checkbox.checked) {
    return;
  }
  var div = document.getElementById('debug_win');
  var closeBtn = document.createElement('div');
  closeBtn.className = 'closeBtn';
  closeBtn.innerHTML = "[DEBUG] postMessage 수신 &nbsp;&nbsp;&nbsp; <span onclick='javascript:removeDebugWin()'><b>[X]</b></span>";
  var pre = document.createElement('pre');
  pre.className = 'syntaxHighlight popupSize';
  pre.innerHTML = inp;
  div.appendChild(closeBtn);
  div.appendChild(pre);
  div.style.display = 'block';
}
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

// unused
// async function signIn(params) {
//     const { customer_id, username, password } = params;
//     const URL = 'https://kyc-api.useb.co.kr/sign-in'
//
//     const res = await fetch(URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             customer_id: Number(customer_id),
//             username,
//             password
//         })
//     });
//     return await await res.json();
// }