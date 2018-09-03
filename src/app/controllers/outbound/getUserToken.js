'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getUserToken = undefined;

var _services = require('../../services');

var getUserToken = exports.getUserToken = async function getUserToken(req,res, next) {
         let userKey = req.params.userKey;
         if(userKey){
             var resData = await new _services.GetToken(userKey).request();
             console.log(resData.data);
             res.status(200).json({message:resData.data});
         }else{
              console.log("Error without userKey params");
              res.status(200).json({Error:"without userKey params"});
         }
};