import Middleware from './Middleware'

class Default404 extends Middleware {
	handle(req, res) {
		res.writeHead(404)
		res.end('404! ' + 'Not found ' + req.url)
	}
}

export default new Default404()
