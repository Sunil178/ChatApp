	var username = "<%-uname%>";

  var socket = io();

  var socket_id;
  socket.on('connect', () => {
      socket_id = socket.id;
  	console.log(socket_id);
  });

  console.log(socket_id);

  socket.emit('setUname', { name: username, socket_id: socket_id });

  $("#sendMessage").on("click", function () {

     var msg = $("#message").val();
     if(msg) {

		$("#chat-body").append('\
							<div class="message me">\
								<div class="text-main">\
									<div class="text-group me">\
										<div class="text me">\
											<p>' + msg + '</p>\
										</div>\
									</div>\
									<span>11:32 AM</span>\
								</div>\
							</div>\
							');

        socket.emit('msg', {message: msg, user: username, socket_id: socket_id});
     }
  });
  socket.on('newmsg', function(data) {
     if(username) {

		$("#chat-body").append('\
					<div class="message">\
						<img class="avatar-md" src="/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar">\
						<div class="text-main">\
							<div class="text-group">\
								<div class="text">\
									<p>' + data.message + '</p>\
								</div>\
							</div>\
							<span>09:46 AM</span>\
						</div>\
					</div>'
					);
     }
  })
