var es = require('event-stream');
var request = require('request');
var File = require('vinyl');

module.exports = function(urls, options) {
    var doSrc = function(_file, callback) {
        // var file = 
    };

    return es.map(doSrc);
};