const logger = require('morgan')
const NeDB = require('nedb')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

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

// Start the server.
const port = 3030

app.listen(port, () => {
	console.log(`Feathers server listening on port ${port}`)
})