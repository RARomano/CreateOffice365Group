var auth = require('./auth');
var graph = require('./graph');
var _ = require('underscore');

// Get an access token for the app.
auth.getAccessToken().then(function (token) {

  graph.createGroup(token, "test group", true, "group-test", false).then(function(response) {
    console.log(response);
  });

}, function (error) {
  console.error('>>> Error getting access token: ' + error);
});