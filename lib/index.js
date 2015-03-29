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

module.exports = function instantiate () {
    var agent = new DuperAgent();

    return {
        get: agent.fireGET.bind(agent),
        post: agent.firePOST.bind(agent),
        put: agent.firePUT.bind(agent),
        del: agent.fireDELETE.bind(agent)
    }
};

function DuperAgent () {}

DuperAgent.prototype.fireGET = function fireGET () {

};
