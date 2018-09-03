'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAcessKey = undefined;

var _constants = require('../../utils/constants');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _logger = require('../../../config/logger');

var _logger2 = _interopRequireDefault(_logger);

var _errors = require('../../utils/errors');

var errors = _interopRequireWildcard(_errors);

var _aes256 = require('aes256');

var _aes256_2 = _interopRequireDefault(_aes256);

var _base64 = require('base-64');

var _base64_2 = _interopRequireDefault(_base64);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _logger2.default().app;




var _checkUserKey =  function _checkUserKey(req,res,next) {
          var userKey = req.params.userKey;
          var key_type = req.query.key_type;
          var status = 401;
          if(key_type && (key_type === 'CPID' || key_type === 'MSISDN')){
              if(key_type === 'MSISDN'){
                 req.query.MSISDN = userKey;
                 next();
                 return;
              }else{
                    try{    
                            var unpackData =_aes256_2.default.decrypt(_constants.ENV.KEY,_base64_2.default.decode(userKey));
                            var spiltData = unpackData.split(',');
                            var timeCpid = spiltData[1];
                            var iatTime = Math.floor(Date.now() / 1000);
                            if(Math.abs(timeCpid-iatTime)<=3600){
                                    req.query.MSISDN = spiltData[0];
                                    next();
                                    return;
                            }else{
                                console.info("Cpid Time expired ");
                            }
                            
                    }catch(err){
                        console.info(err.message);
                    }
              }
          }else{
               status = 400;
          }
         res.sendStatus(status);
};



var checkAcessKey = exports.checkAcessKey = function checkAcessKeys(req,res,next) {
            let accessToken =  req.headers['access_token'];
            var checkUserKey = _checkUserKey.bind(this);
            if(accessToken){
                 try{
                    var data =_jsonwebtoken2.default.verify(accessToken,_constants.ENV.KEY);
                    console.info(`Access_key is : ${data.key}`);
                    if(data.key === "Test"){
                        if(req.params.userKey){
                            checkUserKey(req,res,next);
                        }else{
                            next();
                        }  
                           return;
                    }
                 }catch(err){
                            console.info(`Error Jwt verify : ${err.message}`);    
                 }
            }
            res.sendStatus(401);
            
};