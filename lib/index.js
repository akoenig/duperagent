/*
 * duperagent
 *
 * Copyright(c) 2015 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var debug = require('debug')('duperagent');
var mandatory = require('mandatory');
var superagent = require('superagent');
var VError = require('verror');

module.exports = function instantiate () {
    var agent = new DuperAgent();

    return {
        get: agent.fireGET.bind(agent),
        post: agent.firePOST.bind(agent),
        put: agent.firePUT.bind(agent),
        del: agent.fireDELETE.bind(agent)
    };
};

function DuperAgent () {}

DuperAgent.prototype.$request = function $request (verb, uri, params, callback) {

    function onResponse (err, res) {
        if (err) {
            debug('Request failed: %s', err.toString());
            return callback(new VError(err, 'failed to communicate with the respective server'));
        }

        if (res.status < 200 || res.status >= 400) {
            debug('Server sent an error response: %d', res.status);

            return callback(new VError('Server sent an error response: %s', res.status));
        }

        if (res.text) {
            try {
                return callback(null, JSON.parse(res.text));
            } catch (err) {
                debug('Response was not parsable: %s', err.toString());
                return callback(new VError(err, 'Unable to parse response body'));
            }
        }

        callback(null);
    }

    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    params.query = params.query || {};

    superagent[verb.toLowerCase()](uri)
        .unset('User-Agent')
        .query(params.query)
        .send(params.body)
        .end(onResponse);
};

DuperAgent.prototype.$validate = function $validate (uri, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    mandatory(uri).is('string', 'Please provide a proper uri');
    mandatory(params).is('object', 'Please provide a proper parameter object');
    mandatory(callback).is('function', 'Please provide a proper callback function');
};

DuperAgent.prototype.fireGET = function fireGET (uri, params, callback) {

    function onResponse (err, body) {
        if (err) {
            return callback(new VError(err, 'failed to perform HTTP GET request'));
        }

        callback(null, body);
    }

    this.$validate(uri, params, callback);

    this.$request('GET', uri, params, onResponse);
};

DuperAgent.prototype.firePOST = function firePOST (uri, params, callback) {
    function onResponse (err, body) {
        if (err) {
            return callback(new VError(err, 'failed to perform HTTP POST request'));
        }

        callback(null, body);
    }

    this.$validate(uri, params, callback);

    this.$request('POST', uri, params, onResponse);
};

DuperAgent.prototype.firePUT = function firePUT (uri, params, callback) {
    function onResponse (err, body) {
        if (err) {
            return callback(new VError(err, 'failed to perform HTTP PUT request'));
        }

        callback(null, body);
    }

    this.$validate(uri, params, callback);

    this.$request('PUT', uri, params, onResponse);
};

DuperAgent.prototype.fireDELETE = function fireDELETE (uri, params, callback) {
    function onResponse (err, body) {
        if (err) {
            return callback(new VError(err, 'failed to perform HTTP DELETE request'));
        }

        callback(null, body);
    }

    this.$validate(uri, params, callback);

    this.$request('DEL', uri, params, onResponse);
};
