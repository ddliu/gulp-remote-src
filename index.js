var util = require('util');
var es = require('event-stream');
var request = require('request');
var File = require('vinyl');

module.exports = function(urls, options) {
    var doSrc = function(_file, callback) {
        // var file = 
    };

    if (options === undefined) {
        options = {};
    }

    if (typeof options.base !== 'string' ) {
        options.base = '/';
    }

    if (typeof options.stream !== 'boolean') {
        options.stream = true;
    }

    if (!util.isArray(urls)) {
        urls = [urls];
    }

    return es.readArray(urls).pipe(es.map(function(data, cb) {
        var url = options.base + data;
        if (options.stream) {
            var file = new File({
                cwd: '/',
                base: options.base,
                path: url,
                contents: request(url)
            });

            cb(null, file);
        } else {
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var file = new File({
                        cwd: '/',
                        base: options.base,
                        path: url,
                        contents: new Buffer(body)
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