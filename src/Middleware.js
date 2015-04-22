export default class Middleware {
	handle(request, response, next) {
		if (next) next(request, response)
	}
	get handler() {
		return this.handle.bind(this)
	}
}
