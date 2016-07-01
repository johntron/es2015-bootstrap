// Just to prove a point
//import 'style.css';

setContent('#original', '/app.js?original');
setContent('#transpiled', '/app.js');

function setContent(selector, file) {
  window.fetch(file)
    .then((res) => res.text())
    .then((text) => {
      document.querySelector(selector).textContent = text;
    });
}
