const logger = require('morgan')
const NeDB = require('nedb')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey  = fs.readFileSync(path.join(__dirname, '../PWA/key.pem'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../PWA/cert.pem'), 'utf8')
const credentials = {key: privateKey, cert: certificate}

const todos = new NeDB({
	filename: path.join(__dirname, 'todo.db'),
	autoload: true
})

const app = express()

app.use(logger('dev'))

app.use(bodyParser.json())

app.use('/todos', (req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*")
	console.log("SET CROSS ORIGIN")
	next()
})

app.get('/todos', (req, res) => {
	console.log("GET TODOS")
	todos.find({}).sort({ts: -1}).exec(	
	(err, docs) => {
		if(err) {
			console.log(err)
		}
		
		res.send({
			todos: docs
		})
	})
})

app.options('/todos', (req, res) => {
	res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
	res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
	res.send(200)
})

app.post('/todos', (req, res) => {
	if(req.body) {
		console.log(req.body)
		todos.insert({
			value: req.body.value,
			ts: Date.now()
		}, (err) => {
			if(err) {
				res.send({
					ok: false,
					error: err
				})
			}

			res.send({
				ok: true
			})
		})
	}
	else {
		res.send({
			ok: false,
			error: "No Body Provided"
		})
	}
})

var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

const port = 3030
const httpsPort = 8443

httpServer.listen(port, () => {
	httpsServer.listen(httpsPort, () => {
		console.log(`HTTP Server listening on port ${port}`)
		console.log(`HTTPS Server listening on port ${httpsPort}`)
	})
})


// Start the server.


// app.listen(port, () => {
// 	console.log(`Feathers server listening on port ${port}`)
// })