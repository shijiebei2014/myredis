var socket = io('http://localhost:4000/myns')
socket.on('say:hello', addLi)

function addLi(msg) {
	var messages = document.querySelector('#messages')

	var li = document.createElement('li')
	li.textContent = msg
	messages.appendChild(li)
}
