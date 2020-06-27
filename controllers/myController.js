User = require('../database/user.js');
History = require('../database/history.js');

exports.storeUser = (req, res) => {
	var user = new User({
	  name: req.name,
	  socket_id: req.socket_id
	});

	user.save((err, docs) => {
		if (err) return res("failure");
		return res("success");
	});
}

exports.updateUser = (req, res) => {
	User.findOneAndUpdate(
		{
			name: req.name
		},
		{
	  		socket_id: req.socket_id
		},
		{
			new: true
		},
		(err,docs) => {
			if(err) return res("failure");
			return res("success");
		});
}

exports.getUser = (req, res) => {
	User.find({name: req.name}, "name socket_id", (err, docs) => {
		if (err) return res("failure");
		if (docs.length > 0) return res("exist");
		else return res("empty");
	});
}

exports.userExist = (req, res) => {
	User.find({name: req.name}, "name", (err, docs) => {
		if (err) return res("failure");
		if (docs.length > 0) return res("exist");
		else return res("empty");
	});
}

exports.storeHistory = (req, res) => {
	var history = new History(req);

	history.save((err, docs) => {
		if (err) return res("failure");
		return res("success");
	});
}

exports.index = (req, res) => {
	User.find((err, docs) => {
		if(err) res.send("failure");
	res.render('index', {data: docs, uname: req.params.name});
	});
}


exports.findChat = (req, res) => {
	History.find({
		$or:
		[
			{
				from: req.from,
			},
			{
				from: req.to
			}
		]
	},
	)
	.sort({time: 1})
	.exec((err, docs) => {
		if (err) return res("failure");
		return res(docs);
	});
}