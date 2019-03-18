const NeDB = require('nedb')
const path = require('path')
const todos = new NeDB({
	filename: path.join(__dirname, 'todo.db'),
	autoload: true
})

const msg = process.argv[2]

console.log(msg)

todos.insert({
	value: msg
})