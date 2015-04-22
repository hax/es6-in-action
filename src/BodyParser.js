import Middleware from './Middleware'

import getRawBody from 'raw-body'
import typer from 'media-typer'

export default class BodyParser extends Middleware {

	handle(req, res, next) {
		if (req.method === 'GET') return next(req, res)
		let type = typer.parse(req.headers['content-type'])
		console.log(type)
		getRawBody(req, {
			length: req.headers['content-length'],
			limit: '1mb',
			encoding: type.parameters.charset || 'utf-8'
		}, function (err, string) {
			if (err) return next(req, res)
			req.text = string
			next(req, res)
		})
	}

}
