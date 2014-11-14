"use strict";

var topics = module.parent.require('./topics');

var theme = {};

theme.addPostData = function(params, callback) {
	var tids = params.category.topics.map(function(topic) {
		return topic.tid;
	});

	topics.getMainPosts(tids, params.uid, function(err, mainPosts) {
        mainPosts.forEach(function(post, index) {
            params.category.topics[index].mainPost = post;
        });

        callback(null, params);
    });
};

module.exports = theme;