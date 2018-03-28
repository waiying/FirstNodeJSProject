// TEST REMOVE LATER ***
// var socket = io()
// socket.on('message', function(data) {
// 	console.log(data)
// })

// Input handler to track what WASD keys are pressed
var movement = {
	up: false,
	down: false,
	left: false,
	right: false
}

document.addEventListener('keydown', function(event){
	switch (event.keyCode) {
		// each case # is the unicode of the letter
		case 65: // A
			movement.left = true;
			break;
		case 87: // W
			movement.up = true;
			break;
		case 68: // D
			movement.right = true;
			break;
		case 83: // S
			movement.down = true;
			break;
	}
})

document.addEventListener('keyup', function(event){
	switch (event.keyCode) {
		// each case # is the unicode of the letter
		case 65: // A
			movement.left = false;
			break;
		case 87: // W
			movement.up = false;
			break;
		case 68: // D
			movement.right = false;
			break;
		case 83: // S
			movement.down = false;
			break;
	}
})

// client alert server new player joined
var socket = io()
socket.emit('new player');
// client sends its keyboard state to server 60 times in a second
setInterval(function() {
	socket.emit('movement', movement)
}, 1000 / 60)

// draw data onto the canvas for the client every time server emits a 'state' event
var canvas = document.getElementById('canvas')
canvas.width = 800
canvas.height = 600
var context = canvas.getContext('2d')
socket.on('state', function(players) {
	context.clearRect(0, 0, 800, 600) // clear the canvas every time before drawing
	context.fillStyle = 'green'
	// starts drawing green circles for each player
	for (var id in players) {
		var player = players[id]
		context.beginPath()
		context.arc(player.x, player.y, 10, 0, 2*Math.PI)
		context.fill()
	}
})