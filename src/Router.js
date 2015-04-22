import Middleware from './Middleware'

const TERMINAL = Symbol('terminal')

export default class Router extends Middleware {
	constructor() {
		super()
		this._tree = {}
	}
	get(...args) {
		this.add('GET', ...args)
	}
	post(...args) {
		this.add('POST', ...args)
	}
	put(...args) {
		this.add('PUT', ...args)
	}
	delete(...args) {
		this.add('DELETE', ...args)
	}
	add(method, path, handler) {
		let segments = path.split('/')
		segments[0] = method
		store(this._tree, segments, handler)
	}
	addDefaultHandler(handler) {
		this._defaultHandler = handler
	}
	match(method, path) {
		let segments = path.split('/')
		segments[0] = method
		return retrieve(this._tree, segments)
	}
	handle(request, response, next) {
		let handler = this.match(request.method, request.url)
		if (handler) handler(request, response)
		else next(request, response)
	}
}

function store(node, segments, value) {
	for (let s of segments) {
		if (!(s in node)) node[s] = {}
		node = node[s]
	}
	node[TERMINAL] = value
}

function retrieve(node, segments) {
	for (let s of segments) {
		if (!(s in node)) return undefined
		node = node[s]
	}
	return node[TERMINAL]
}
