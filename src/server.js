import 'es6-shim'
import http from 'http'

import App from './App'
import BodyParser from './BodyParser'
import Router from './Router'
import Static from './Static'
import default404 from './default404'

let myApp = new App
let myRouter = new Router

myApp.addMiddleware(new BodyParser)
myApp.addMiddleware(myRouter)
myApp.addMiddleware(new Static('./public'))
myApp.addMiddleware(default404)

http.createServer(myApp.handler).listen(1337)

myRouter.get('/hello', (req, res) => {
	res.end('Hello world!!!')
})

myRouter.post('/', (req, res) => {
	//console.log(req.text)
	res.end(JSON.stringify({value: 'ok'}))
})
