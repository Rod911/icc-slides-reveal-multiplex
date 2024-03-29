(function() {
	var multiplex = Reveal.getConfig().multiplex;
	var socketId = multiplex.id;
	var path = multiplex.path;
	var host = multiplex.host;
	var socket = io.connect(multiplex.url);

	socket.on(multiplex.id, function(message) {
		// ignore data from sockets that aren't ours
		if (message.socketId !== socketId) { return; }
		if (message.path !== path) { return; }
		if (message.path !== path) { return; }
		if (message.host !== host) { return; }
		if( window.location.host === 'localhost:1947' ) return;

		if ( message.state ) {
			Reveal.setState(message.state);
		}
		if ( message.content ) {
			// forward custom events to other plugins
			var event = new CustomEvent('received');
			event.content = message.content;
			document.dispatchEvent( event );
		}
	});

	setTimeout(() => {
		console.log(status);
		status.innerText = "Connected to sync server";
	}, 50);
	setTimeout(() => {
		status.classList.remove("show");
	}, 5000);
}());
