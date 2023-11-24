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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdXRpbC5qcyIsIm5hbWVzIjpbInJlbW92ZURlYnVnV2luIiwiZGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsImlubmVySFRNTCIsInVwZGF0ZURlYnVnV2luIiwiaW5wIiwiZGVidWdfd2luX2NoZWNrYm94IiwiY2hlY2tlZCIsImNsb3NlQnRuIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInByZSIsImFwcGVuZENoaWxkIiwic3ludGF4SGlnaGxpZ2h0IiwianNvbiIsInJlcGxhY2UiLCJtYXRjaCIsImNscyIsInRlc3QiXSwic291cmNlcyI6WyJqcy91dGlsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlbW92ZURlYnVnV2luKCkge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVidWdfd2luJyk7XG4gIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkaXYuaW5uZXJIVE1MID0gJyc7XG59XG5mdW5jdGlvbiB1cGRhdGVEZWJ1Z1dpbihpbnApIHtcbiAgY29uc3QgZGVidWdfd2luX2NoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYnVnX3dpbl9jaGVja2JveCcpO1xuICBpZiAoISEhZGVidWdfd2luX2NoZWNrYm94IHx8ICFkZWJ1Z193aW5fY2hlY2tib3guY2hlY2tlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVidWdfd2luJyk7XG4gIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnRuLmNsYXNzTmFtZSA9ICdjbG9zZUJ0bic7XG4gIGNsb3NlQnRuLmlubmVySFRNTCA9IFwiW0RFQlVHXSBwb3N0TWVzc2FnZSDsiJjsi6AgJm5ic3A7Jm5ic3A7Jm5ic3A7IDxzcGFuIG9uY2xpY2s9J2phdmFzY3JpcHQ6cmVtb3ZlRGVidWdXaW4oKSc+PGI+W1hdPC9iPjwvc3Bhbj5cIjtcbiAgY29uc3QgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gIHByZS5jbGFzc05hbWUgPSAnc3ludGF4SGlnaGxpZ2h0IHBvcHVwU2l6ZSc7XG4gIHByZS5pbm5lckhUTUwgPSBpbnA7XG4gIGRpdi5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gIGRpdi5hcHBlbmRDaGlsZChwcmUpO1xuICBkaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5mdW5jdGlvbiBzeW50YXhIaWdobGlnaHQoanNvbikge1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgbGV0IGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cbi8vIHVudXNlZFxuLy8gYXN5bmMgZnVuY3Rpb24gc2lnbkluKHBhcmFtcykge1xuLy8gICAgIGNvbnN0IHsgY3VzdG9tZXJfaWQsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcGFyYW1zO1xuLy8gICAgIGNvbnN0IFVSTCA9ICdodHRwczovL2t5Yy1hcGkudXNlYi5jby5rci9zaWduLWluJ1xuLy9cbi8vICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChVUkwsIHtcbi8vICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuLy8gICAgICAgICAgICAgY3VzdG9tZXJfaWQ6IE51bWJlcihjdXN0b21lcl9pZCksXG4vLyAgICAgICAgICAgICB1c2VybmFtZSxcbi8vICAgICAgICAgICAgIHBhc3N3b3JkXG4vLyAgICAgICAgIH0pXG4vLyAgICAgfSk7XG4vLyAgICAgcmV0dXJuIGF3YWl0IGF3YWl0IHJlcy5qc29uKCk7XG4vLyB9Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxjQUFjQSxDQUFBLEVBQUc7RUFDeEIsSUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxXQUFXLENBQUM7RUFDaERGLEdBQUcsQ0FBQ0csS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtFQUMxQkosR0FBRyxDQUFDSyxTQUFTLEdBQUcsRUFBRTtBQUNwQjtBQUNBLFNBQVNDLGNBQWNBLENBQUNDLEdBQUcsRUFBRTtFQUMzQixJQUFNQyxrQkFBa0IsR0FBR1AsUUFBUSxDQUFDQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7RUFDeEUsSUFBSSxDQUFDLENBQUMsQ0FBQ00sa0JBQWtCLElBQUksQ0FBQ0Esa0JBQWtCLENBQUNDLE9BQU8sRUFBRTtJQUN4RDtFQUNGO0VBQ0EsSUFBTVQsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxXQUFXLENBQUM7RUFDaEQsSUFBTVEsUUFBUSxHQUFHVCxRQUFRLENBQUNVLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDOUNELFFBQVEsQ0FBQ0UsU0FBUyxHQUFHLFVBQVU7RUFDL0JGLFFBQVEsQ0FBQ0wsU0FBUyxHQUFHLHlHQUF5RztFQUM5SCxJQUFNUSxHQUFHLEdBQUdaLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUN6Q0UsR0FBRyxDQUFDRCxTQUFTLEdBQUcsMkJBQTJCO0VBQzNDQyxHQUFHLENBQUNSLFNBQVMsR0FBR0UsR0FBRztFQUNuQlAsR0FBRyxDQUFDYyxXQUFXLENBQUNKLFFBQVEsQ0FBQztFQUN6QlYsR0FBRyxDQUFDYyxXQUFXLENBQUNELEdBQUcsQ0FBQztFQUNwQmIsR0FBRyxDQUFDRyxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0FBQzdCO0FBQ0EsU0FBU1csZUFBZUEsQ0FBQ0MsSUFBSSxFQUFFO0VBQzdCQSxJQUFJLEdBQUdBLElBQUksQ0FBQ0MsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7RUFDOUUsT0FBT0QsSUFBSSxDQUFDQyxPQUFPLENBQUMsd0dBQXdHLEVBQUUsVUFBVUMsS0FBSyxFQUFFO0lBQzdJLElBQUlDLEdBQUcsR0FBRyxRQUFRO0lBQ2xCLElBQUksSUFBSSxDQUFDQyxJQUFJLENBQUNGLEtBQUssQ0FBQyxFQUFFO01BQ3BCLElBQUksSUFBSSxDQUFDRSxJQUFJLENBQUNGLEtBQUssQ0FBQyxFQUFFO1FBQ3BCQyxHQUFHLEdBQUcsS0FBSztNQUNiLENBQUMsTUFBTTtRQUNMQSxHQUFHLEdBQUcsUUFBUTtNQUNoQjtJQUNGLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQ0MsSUFBSSxDQUFDRixLQUFLLENBQUMsRUFBRTtNQUNuQ0MsR0FBRyxHQUFHLFNBQVM7SUFDakIsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDQyxJQUFJLENBQUNGLEtBQUssQ0FBQyxFQUFFO01BQzdCQyxHQUFHLEdBQUcsTUFBTTtJQUNkO0lBQ0EsT0FBTyxlQUFlLEdBQUdBLEdBQUcsR0FBRyxJQUFJLEdBQUdELEtBQUssR0FBRyxTQUFTO0VBQ3pELENBQUMsQ0FBQztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSJ9
