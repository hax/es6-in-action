document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('myForm').onsubmit = (evt) => {
		test(evt.target)
		return false
	}

})

function http(method, url, {type, data}) {
	return new Promise((resolve, reject) => {

		let xhr = new XMLHttpRequest
		xhr.open(method, url)
		xhr.onload = () => resolve(xhr.response)
		xhr.onerror = reject
		if (type) xhr.responseType = type
		xhr.send(data)

	})
}


async function test(f) {
	let result = await http(f.method, f.action, {data: new FormData(f), type: 'json'})
	alert('result: ' + result.value)
}

// function test(f) {
// 	let result = http(f.method, f.action, {data: new FormData(f), type: 'json'})
// 	result.then((result) => {
// 		alert('result: ' + result.value)
// 	})
// }
