'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getPlanStatus = undefined;

var getPlanStatus = exports.getPlanStatus = function getPlanStatus(req,res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
            console.log("planStatus");
            console.log("userKey:"+userKey);
            console.log("key_type:"+key_type);
            if(key_type){
                 var responseData ={
                            "name": "AAA",
                            "plans": [],
                            "languageCode": "TH-th",
                            "expireTime": "2019-06-14T08:41:27-07:00",
                            "updateTime":  "2018-06-07T07:41:22-07:00",
                            "operatorBrandName": "AIS",
                            "title": "Prepaid Plan",
                            "subscriberId": "1234567890",
                            "accountInfo": {}
                            }
                        res.status(200).json(responseData);  
            }else{
                   res.sendStatus(400);
            }
           
           
                  
            
          
};