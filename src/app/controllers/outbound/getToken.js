'use strict';
var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../../utils/constants');

var _aes256 = require('aes256');

var _aes256_2 = _interopRequireDefault(_aes256);

var _base64 = require('base-64');

var _base64_2 = _interopRequireDefault(_base64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getToken = undefined;

var getToken = exports.getToken = function getToken(req,res,next) {
    var header = req.headers;
    var body = req.body;
    var status = null;
    var responseObj = {};
    if( (header['authorization'] && body['grant_type'] && body['scope']) 
        && (header['authorization'].split(' ').length==2) && (Object.keys(req.body).length == 2) ){
            if(header['authorization'].split(' ')[1] == _constants.ENV.X_AOG_KEY_TEST){
                var accessToken = _jsonwebtoken2.default.sign({
                    "key":"Test",
                    "exp":Math.floor(Date.now() / 1000) + 3600,
                    "iat":Math.floor(Date.now() / 1000)
                },_constants.ENV.KEY);
                console.info(`accessToken : ${accessToken}`);
                responseObj = {
                                data:{
                                    "access_token":accessToken,
                                    "token_type":"Basic",
                                    "expires_in":3600,
                                    },
                                status:200
                              };
            }else{
               responseObj = {data:{error:"invalid_client"},status:401};
            }     
    }else{
        responseObj = {data:{error:"invalid_request"},status:400};
    }
    res.set({
             'Content-type': 'application/json;charset=UTF-8',
             'Cache-Control': 'no-store',
             'Pragma':' no-cache'
            });
    res.status(responseObj.status).json(responseObj.data);
};