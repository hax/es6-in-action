"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myForm").onsubmit = function (evt) {
    var f = evt.target;
    test(f);
    return false;
  };
});

function http(method, url, _ref) {
  var type = _ref.type;
  var data = _ref.data;
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      return resolve(xhr.response);
    };
    xhr.onerror = reject;
    if (type) xhr.responseType = type;
    xhr.send(data);
  });
}


/*
async function test(f) {
	let result = await http(f.method, f.action, {data: f, type: 'json'})
	alert('result: ' + result.value)
}
*/

function test(f) {
  var result = http(f.method, f.action, { data: new FormData(f), type: "json" });
  result.then(function (result) {
    alert("result: " + result.value);
  });
}