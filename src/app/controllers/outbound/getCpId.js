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

exports.getCpId = undefined;



var getCpId = exports.getCpId = function getCpId(req,res, next) {
      let app = req.query.app;
            console.info(`appID :${app}`);
           let checkAppID  = app && _constants.APPID.APPIDs.findIndex(element => element===app);
            if(app && checkAppID > -1){
              var key =_fs2.default.readFileSync('./privatekey/privatekey.key', 'utf8').toString();
                var CPID = _jsonwebtoken2.default.sign({
                    "iss":"dpi-dpa-mobile-dataplan-adapto@sustained-node-213113.iam.gserviceaccount.com",
                    "scope":"https://www.googleapis.com/auth/dataplansharing",
                    "aud":"https://www.googleapis.com/oauth2/v4/token",
                    "exp":Math.floor(Date.now() / 1000) + (60*60),
                    "iat":Math.floor(Date.now() / 1000),
                    "MSISDN":'0932780014'
                },key,{ algorithm: 'RS256' });
                 console.log("CPID");
                 res.status(200).json({ cpid: CPID ,"ttlSeconds": 2592000});
            }else{
                let messageError = (app)?`AppId(${app}) isn't corresponding please check it again`:"without parameter app";
                res.status(200).json({message:messageError});
            }
};