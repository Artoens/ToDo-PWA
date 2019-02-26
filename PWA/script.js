import { html, render } from './node_modules/lit-html/lit-html.js'

document.querySelectorAll('.mdc-text-field').forEach((elem) => {
	new mdc.textField.MDCTextField(elem)
})

const template = todos => {
	return html`
		<div class="outer">
			${todos.map((todo) => {
				return html`
					<div class="todo">
						${todo.value}
					</div>
				`
			})}
		</div>
	`
}

const refresh = () => {
	fetch('http://localhost:3030/todos')
	.then(res => res.json())
	.then(json => {
		render(template(json.todos), document.querySelector('#slot'))
	})
}

const addTodo = msg => fetch('http://localhost:3030/todos', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		value: msg
	})
})

document.getElementById('add-button').addEventListener('click', () => {
	addTodo(document.getElementById('my-text-field').value)
	.then(() => {
		refresh()
	})
	.catch(err => {
		console.log(`POST Error: ${err}`)
	})
})

refresh()
