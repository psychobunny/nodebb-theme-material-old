"use strict";

var topics = module.parent.require('./topics'),
	posts = module.parent.require('./posts');

var theme = {};

theme.addPostData = function(params, callback) {
	var pids = params.topics.map(function(topic) {
		return topic.teaser ? topic.teaser.pid : topic.mainPid;
	});

	posts.getPostsByPids(pids, params.uid, function(err, postData) {
		if (err) {
			return callback(err);
		}

		topics.addPostData(postData, params.uid, function(err, posts) {
			posts.forEach(function(post, index) {
				params.topics[index].mainPost = post;
			});

			callback(null, params);
		});
	});
};

module.exports = theme;