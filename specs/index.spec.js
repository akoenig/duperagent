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

var expect = require('expect.js');

var mock = require('./mock');
var duperagent = require('..')();

describe('DuperAgent', function suite () {

    const ENDPOINT = 'http://localhost:9090';

    beforeEach(mock.boot);
    afterEach(mock.shutdown);

    it('should be able to perform a HTTP GET request', function test (done) {

        var params = {};

        function onResponse (err, result) {
            expect(err).to.be(null);

            expect(result.length).not.to.be(0);

            done();
        }

        params.query = {foo: 'bar'};

        duperagent.get(ENDPOINT + '/get', params, onResponse);
    });

    it('should be able to perform a HTTP POST request', function test (done) {
        var params = {};

        function onResponse (err, result) {
            expect(err).to.be(null);

            expect(result.name).to.be('André');

            done();
        }

        params.query = {action: 'insert'};
        params.body = {foo: 'bar'};

        duperagent.post(ENDPOINT + '/post', params, onResponse);
    });

    it('should be able to perform a HTTP PUT request', function test (done) {
        var params = {};

        function onResponse (err, result) {
            expect(err).to.be(null);

            expect(result.name).to.be('König');

            done();
        }

        params.body = {foo: 'bar'};

        duperagent.put(ENDPOINT + '/put', params, onResponse);
    });

    it('should be able to perform a HTTP DELETE request', function test (done) {
        var params = {};

        function onResponse (err) {
            expect(err).to.be(null);

            done();
        }

        duperagent.del(ENDPOINT + '/delete', params, onResponse);
    });

});
