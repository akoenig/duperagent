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

var shmock = require('shmock');

const PORT = 9090;

var mock;

module.exports.boot = function boot () {
    var resource;

    mock = shmock(PORT);

    mock
        .get('/get')
        .query({foo: 'bar'})
        .reply(200, JSON.stringify(['foo', 'bar']));

    mock
        .post('/post')
        .send({foo: 'bar'})
        .query({action: 'insert'})
        .reply(201, JSON.stringify({name: 'André'}));

    mock
        .put('/put')
        .send({foo: 'bar'})
        .reply(200, JSON.stringify({name: 'König'}));

    mock
        .delete('/delete')
        .reply(200, JSON.stringify(''));
};

module.exports.shutdown = function shutdown (callback) {
    mock.close(callback);
};
