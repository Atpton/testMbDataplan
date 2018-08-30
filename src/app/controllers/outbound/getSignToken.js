'use strict';
var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../../utils/constants');
 

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getSignToken = undefined;



var getSignToken = exports.getSignToken = function getSignToken(req,res, next) {
                var privateKey = _fs2.default.readFileSync('./privatekey/privatekey.key').toString();
                var token = _jsonwebtoken2.default.sign({
                    "iss":"dpi-dpa-mobile-dataplan-adapto@sustained-node-213113.iam.gserviceaccount.com",
                    "scope":"https://www.googleapis.com/auth/dataplansharing",
                    "aud":"https://www.googleapis.com/oauth2/v4/token",
                    "exp":Math.floor(Date.now() / 1000) + (60*60),
                    "iat":Math.floor(Date.now() / 1000)
                },privateKey,{ algorithm: 'RS256' });
                 res.status(200).json({ jwtSign: token }); 
};