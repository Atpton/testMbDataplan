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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _logger2.default().app;


var checkAcessKey = exports.checkAcessKey = function checkAcessKeys(req,res,next) {
            let accessToken =  req.headers['access_token'];
            if(accessToken){
                 try{
                    var data =_jsonwebtoken2.default.verify(accessToken,_constants.ENV.KEY);
                    console.info(`Access_key is : ${data.key}`);
                    if(data.key === "Test"){
                           next();  
                           return;
                    }
                 }catch(err){
                            console.info(`Error Jwt verify : ${err.message}`);    
                 }
            }
            res.sendStatus(401);
            
};