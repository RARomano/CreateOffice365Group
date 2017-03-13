var request = require('request');
var Q = require('q');
var config = require('./config');

// The graph module object.
var graph = {};

graph.createGroup = function (token, displayName, mailEnabled, mailNickname, securityEnabled) {
  var deferred = Q.defer();

  var postData = {
    auth: { bearer: token },
    json: {
      displayName: displayName,
      mailEnabled: mailEnabled,
      mailNickname: mailNickname,
      securityEnabled: securityEnabled,
      groupTypes: [ "Unified" ]
    },
    url: 'https://graph.microsoft.com/beta/groups'
  };

  // Make a request to get all users in the tenant. Use $select to only get
  // necessary values to make the app more performant.
  request.post(postData, function (err, response, body) {
    if (err) {
      deferred.reject(err);
    } else {
      // The value of the body will be an array of all users.
      deferred.resolve(body);
    }
  });

  return deferred.promise;
};

module.exports = graph;