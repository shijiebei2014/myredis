var socket = io('http://localhost:4000'),
	say_hello = document.querySelector('#say_hello'),
	join_room = document.querySelector('#join_room');


say_hello.addEventListener('click', function (e) {
	var name = document.querySelector('#name')
	socket.emit('say:hello', name.value)
})

join_room.addEventListener('click', function (e) {
	var room = document.querySelector('#room')
	socket.emit('join:room', room.value)	
})

socket.on('say:hello', addLi)
socket.on('join:room', addLi)

function addLi(msg) {
	var messages = document.querySelector('#messages')

	var li = document.createElement('li')
	li.textContent = msg
	messages.appendChild(li)
}
