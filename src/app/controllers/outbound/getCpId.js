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

exports.getCpId = undefined;



var getCpId = exports.getCpId = function getCpId(req,res, next) {
      let app = req.query.app;
            console.info(`appID :${app}`);
           let checkAppID  = app && _constants.APPID.APPIDs.findIndex(element => element===app);
            if(app && checkAppID > -1){
                 //console.info(req.headder);
                 console.info(req.body);
                 var initTime =Math.floor(Date.now() / 1000);
                 var data = `0932780014,${initTime}`;
                 var CPID = _base64_2.default.encode(_aes256_2.default.encrypt(_constants.ENV.KEY,data));
                 console.log("CPID");
                 res.status(200).json({ cpid: CPID ,"ttlSeconds": initTime});
            }else{
                let messageError = (app)?`AppId(${app}) isn't corresponding please check it again`:"without parameter app";
                res.status(200).json({message:messageError});
            }
};