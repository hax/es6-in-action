import Middleware from './Middleware'

export default class App extends Middleware {

	constructor() {
		super()
		this.middlewareList = []
	}

	addMiddleware(middleware) {
		this.middlewareList.push(middleware)
	}

	handle(req, res) {

		let index = 0

		let next = (request, response) => {
			if (index < this.middlewareList.length) {
				this.middlewareList[index++].handle(request, response, next)
			}
		}

		next(req, res)

	}
}
