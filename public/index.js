'use strict';

document.addEventListener('DOMContentLoaded', function () {

	document.getElementById('myForm').onsubmit = function (evt) {
		test(evt.target);
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

function test(f) {
	var result;
	return regeneratorRuntime.async(function test$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return http(f.method, f.action, { data: new FormData(f), type: 'json' });

			case 2:
				result = context$1$0.sent;

				alert('result: ' + result.value);

			case 4:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

// function test(f) {
// 	let result = http(f.method, f.action, {data: new FormData(f), type: 'json'})
// 	result.then((result) => {
// 		alert('result: ' + result.value)
// 	})
// }