var util = require('util');
var es = require('event-stream');
var request = require('request');
var File = require('vinyl');
var through2 = require('through2');

module.exports = function(urls, options) {
    if (options === undefined) {
        options = {};
    }

    if (typeof options.base !== 'string' ) {
        options.base = '/';
    }

    if (typeof options.buffer !== 'boolean') {
        options.buffer = true;
    }

    if (!util.isArray(urls)) {
        urls = [urls];
    }

    return es.readArray(urls).pipe(es.map(function(data, cb) {
        var url = options.base + data;
        if (!options.buffer) {
            var file = new File({
                cwd: '/',
                base: options.base,
                path: url,
                // request must be piped out once created, or we'll get this error: "You cannot pipe after data has been emitted from the response."
                contents: request(url).pipe(through2()) 
            });

            cb(null, file);
        } else {
            request({
                url: url,
                encoding: null
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var file = new File({
                        cwd: '/',
                        base: options.base,
                        path: url,
                        contents: body
                    });
                    cb(null, file);
                } else {
                    if (!error) {
                        error = new Error("GET " + url + " failed with status code:" + response.statusCode);
                    }
                    cb(error);
                }
            });
        }
    }));
};