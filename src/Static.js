import Middleware from './Middleware'
import {readFile} from 'fs'

export default class Static extends Middleware {

	constructor(dir) {

		super()
		this.dir = dir

	}

	handle(request, response, next) {

		readFile(this.dir + request.url, function (err, data) {

			if (err) next(request, response)
			else {
				if (request.url.endsWith('.html')) {
					response.writeHead(200, {'Content-Type': 'text/html'})
				}
				response.end(data)
			}

		})
	}

}
